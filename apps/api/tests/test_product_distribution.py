from app.services.product_distribution import create_download_token, is_version_newer, parse_download_token


def test_version_comparison_detects_newer_release():
    assert is_version_newer("3.1.9", "3.2.0") is True
    assert is_version_newer("3.2.0", "3.2.0") is False
    assert is_version_newer(None, "1.0.0") is True


def test_download_token_roundtrip():
    token = create_download_token(
        file_id="11111111-1111-1111-1111-111111111111",
        license_id="22222222-2222-2222-2222-222222222222",
        machine_fingerprint="fingerprint-demo",
    )
    payload = parse_download_token(token)
    assert payload["file_id"] == "11111111-1111-1111-1111-111111111111"
    assert payload["license_id"] == "22222222-2222-2222-2222-222222222222"
    assert payload["machine_fingerprint"] == "fingerprint-demo"
