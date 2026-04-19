from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import create_access_token, create_refresh_token, hash_password, verify_password
from app.models.identity import AuthAuditLog, Organization, OrganizationMembership, User, UserProfile
from app.schemas.auth import LoginRequest, SignupRequest, TokenResponse

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
    audit = AuthAuditLog(user_id=user.id, organization_id=organization.id, action="signup")
    db.add_all([organization, user, profile, membership, audit])
    db.commit()
    db.refresh(user)
    db.refresh(organization)
    return TokenResponse(
        access_token=create_access_token(str(user.id), str(organization.id)),
        refresh_token=create_refresh_token(str(user.id), str(organization.id)),
    )


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
    return TokenResponse(
        access_token=create_access_token(str(user.id), str(membership.organization_id)),
        refresh_token=create_refresh_token(str(user.id), str(membership.organization_id)),
    )

