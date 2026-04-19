from dataclasses import asdict, dataclass

from app.billing.providers import CashfreeProvider, RazorpayProvider


@dataclass
class GstBreakdown:
    subtotal: int
    cgst_amount: int
    sgst_amount: int
    igst_amount: int
    total_tax: int
    grand_total: int


def calculate_gst(subtotal: int, tax_rate_percent: int = 18, interstate: bool = False) -> GstBreakdown:
    total_tax = round(subtotal * tax_rate_percent / 100)
    if interstate:
      return GstBreakdown(
          subtotal=subtotal,
          cgst_amount=0,
          sgst_amount=0,
          igst_amount=total_tax,
          total_tax=total_tax,
          grand_total=subtotal + total_tax,
      )
    half = total_tax // 2
    return GstBreakdown(
        subtotal=subtotal,
        cgst_amount=half,
        sgst_amount=total_tax - half,
        igst_amount=0,
        total_tax=total_tax,
        grand_total=subtotal + total_tax,
    )


def list_billing_providers() -> list[dict[str, object]]:
    return [
        {"provider": "razorpay", "supports_upi": True, "supports_gst": True, "status": "primary"},
        {"provider": "cashfree", "supports_upi": True, "supports_gst": True, "status": "optional"},
    ]


def create_checkout(provider: str, amount: int, currency: str, metadata: dict[str, object]) -> dict[str, object]:
    registry = {
        "razorpay": RazorpayProvider(),
        "cashfree": CashfreeProvider(),
    }
    checkout = registry[provider].create_checkout(amount=amount, currency=currency, metadata=metadata)
    return asdict(checkout)


def parse_webhook(provider: str, payload: dict[str, object]) -> dict[str, object]:
    registry = {
        "razorpay": RazorpayProvider(),
        "cashfree": CashfreeProvider(),
    }
    return registry[provider].parse_webhook(payload)
