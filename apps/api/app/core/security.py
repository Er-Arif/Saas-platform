from datetime import UTC, datetime, timedelta
from typing import Any

import jwt
from argon2 import PasswordHasher

from app.core.config import get_settings

settings = get_settings()
password_hasher = PasswordHasher()


def hash_password(password: str) -> str:
    return password_hasher.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    try:
        return password_hasher.verify(hashed_password, password)
    except Exception:
        return False


def create_token(subject: str, ttl: timedelta, token_type: str, extra: dict[str, Any] | None = None) -> str:
    payload: dict[str, Any] = {
        "sub": subject,
        "type": token_type,
        "iat": datetime.now(UTC),
        "exp": datetime.now(UTC) + ttl,
    }
    if extra:
        payload.update(extra)
    return jwt.encode(payload, settings.secret_key, algorithm="HS256")


def decode_token(token: str) -> dict[str, Any]:
    return jwt.decode(token, settings.secret_key, algorithms=["HS256"])


def create_access_token(user_id: str, organization_id: str) -> str:
    return create_token(
        subject=user_id,
        ttl=timedelta(minutes=settings.access_token_ttl_minutes),
        token_type="access",
        extra={"organization_id": organization_id},
    )


def create_refresh_token(user_id: str, organization_id: str) -> str:
    return create_token(
        subject=user_id,
        ttl=timedelta(days=settings.refresh_token_ttl_days),
        token_type="refresh",
        extra={"organization_id": organization_id},
    )

