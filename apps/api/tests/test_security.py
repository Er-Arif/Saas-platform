from app.core.security import create_access_token, decode_token, hash_token


def test_access_token_contains_subject():
    token = create_access_token("user-1", "org-1")
    payload = decode_token(token)
    assert payload["sub"] == "user-1"
    assert payload["organization_id"] == "org-1"


def test_hash_token_is_deterministic():
    assert hash_token("demo") == hash_token("demo")

