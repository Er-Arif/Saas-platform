from app.billing.providers.base import BillingProvider, CheckoutSession


class CashfreeProvider(BillingProvider):
    provider_name = "cashfree"

    def create_checkout(self, *, amount: int, currency: str, metadata: dict[str, object]) -> CheckoutSession:
        return CheckoutSession(
            provider=self.provider_name,
            reference="cashfree_order_demo",
            amount=amount,
            currency=currency,
            supports_upi=True,
            metadata={**metadata, "checkout_mode": "upi_netbanking_cards"},
        )

    def parse_webhook(self, payload: dict[str, object]) -> dict[str, object]:
        return {
            "provider": self.provider_name,
            "event": payload.get("type", "payment.unknown"),
            "reference": payload.get("data", {}),
        }

