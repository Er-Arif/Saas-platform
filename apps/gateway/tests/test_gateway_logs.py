from gateway.main import REQUEST_LOGS, SERVICE_REGISTRY


def test_service_registry_contains_auth():
    assert "auth" in SERVICE_REGISTRY
    assert SERVICE_REGISTRY["auth"]["rate_limit_per_minute"] == 600


def test_request_logs_buffer_available():
    assert isinstance(REQUEST_LOGS, list)

