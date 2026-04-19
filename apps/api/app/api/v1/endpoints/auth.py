from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user, require_organization_membership
from app.core.security import decode_token, hash_password, hash_token, verify_password
from app.models.identity import AuthAuditLog, Organization, OrganizationMembership, RefreshToken, User, UserProfile
from app.schemas.auth import LoginRequest, RefreshRequest, SignupRequest, TokenResponse, UserContextResponse
from app.schemas.common import MessageResponse
from app.services.auth import issue_tokens

router = APIRouter()


@router.post("/signup", response_model=TokenResponse)
def signup(payload: SignupRequest, db: Session = Depends(get_db)) -> TokenResponse:
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists")

    organization_slug = payload.organization_name.lower().replace(" ", "-")
    organization = Organization(name=payload.organization_name, slug=organization_slug)
    user = User(email=payload.email, password_hash=hash_password(payload.password))
    profile = UserProfile(user=user, full_name=payload.full_name)
    membership = OrganizationMembership(user=user, organization=organization, is_owner=True)
    db.add_all([organization, user, profile, membership])
    db.commit()
    db.refresh(user)
    db.refresh(organization)
    db.add(AuthAuditLog(user_id=user.id, organization_id=organization.id, action="signup"))
    db.commit()
    tokens = issue_tokens(db, user, membership)
    return TokenResponse(**tokens)


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)) -> TokenResponse:
    user = db.query(User).filter(User.email == payload.email).first()
    if user is None or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    membership = (
        db.query(OrganizationMembership)
        .filter(OrganizationMembership.user_id == user.id, OrganizationMembership.is_active.is_(True))
        .first()
    )
    if membership is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No active organization")

    db.add(AuthAuditLog(user_id=user.id, organization_id=membership.organization_id, action="login"))
    db.commit()
    return TokenResponse(**issue_tokens(db, user, membership))


@router.post("/refresh", response_model=TokenResponse)
def refresh(payload: RefreshRequest, db: Session = Depends(get_db)) -> TokenResponse:
    token_record = db.query(RefreshToken).filter(RefreshToken.token_hash == hash_token(payload.refresh_token)).first()
    if token_record is None or token_record.revoked_at is not None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    payload_data = decode_token(payload.refresh_token)
    user = db.get(User, payload_data["sub"])
    membership = (
        db.query(OrganizationMembership)
        .filter(
            OrganizationMembership.user_id == user.id,
            OrganizationMembership.organization_id == token_record.organization_id,
            OrganizationMembership.is_active.is_(True),
        )
        .first()
    )
    if membership is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No active organization")
    token_record.revoked_at = "rotated"
    db.add(AuthAuditLog(user_id=user.id, organization_id=membership.organization_id, action="refresh"))
    db.commit()
    return TokenResponse(**issue_tokens(db, user, membership))


@router.post("/logout", response_model=MessageResponse)
def logout(payload: RefreshRequest, db: Session = Depends(get_db)) -> MessageResponse:
    token_record = db.query(RefreshToken).filter(RefreshToken.token_hash == hash_token(payload.refresh_token)).first()
    if token_record:
        token_record.revoked_at = "revoked"
        db.commit()
    return MessageResponse(message="Logged out")


@router.post("/forgot-password", response_model=MessageResponse)
def forgot_password() -> MessageResponse:
    return MessageResponse(message="Password reset delivery is wired for future email integration.")


@router.get("/me", response_model=UserContextResponse)
def me(
    current_user: User = Depends(get_current_user),
    membership: OrganizationMembership = Depends(require_organization_membership),
) -> UserContextResponse:
    return UserContextResponse(
        user_id=str(current_user.id),
        email=current_user.email,
        organization_id=str(membership.organization_id),
    )
