from dataclasses import dataclass


@dataclass
class CheckoutSession:
    provider: str
    reference: str
    amount: int
    currency: str
    supports_upi: bool
    metadata: dict[str, object]


class BillingProvider:
    provider_name = "base"

    def create_checkout(self, *, amount: int, currency: str, metadata: dict[str, object]) -> CheckoutSession:
        raise NotImplementedError

    def parse_webhook(self, payload: dict[str, object]) -> dict[str, object]:
        raise NotImplementedError

