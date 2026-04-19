from datetime import UTC, datetime, timedelta

from sqlalchemy.orm import Session

from app.core.config import get_settings
from app.core.security import create_access_token, create_refresh_token, hash_token
from app.models.identity import AuthAuditLog, OrganizationMembership, RefreshToken, User

settings = get_settings()
ADMIN_ROLES = {"super_admin", "admin", "billing_admin", "support_agent", "product_manager", "service_manager"}


def issue_tokens(db: Session, user: User, membership: OrganizationMembership) -> dict[str, str]:
    access_token = create_access_token(str(user.id), str(membership.organization_id))
    refresh_token = create_refresh_token(str(user.id), str(membership.organization_id))
    refresh_record = RefreshToken(
        user_id=user.id,
        organization_id=membership.organization_id,
        token_hash=hash_token(refresh_token),
        expires_at=(datetime.now(UTC) + timedelta(days=settings.refresh_token_ttl_days)).isoformat(),
    )
    db.add(refresh_record)
    db.add(AuthAuditLog(user_id=user.id, organization_id=membership.organization_id, action="token_issued"))
    db.commit()
    return {"access_token": access_token, "refresh_token": refresh_token}
