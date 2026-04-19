from fastapi import APIRouter, Body

from app.services.billing import calculate_gst, create_checkout, list_billing_providers, parse_webhook

router = APIRouter()


@router.get("/providers")
def providers() -> list[dict[str, object]]:
    return list_billing_providers()


@router.get("/gst-preview")
def gst_preview(subtotal: int = 100000, interstate: bool = False) -> dict[str, int]:
    breakdown = calculate_gst(subtotal=subtotal, interstate=interstate)
    return {
        "subtotal": breakdown.subtotal,
        "cgst_amount": breakdown.cgst_amount,
        "sgst_amount": breakdown.sgst_amount,
        "igst_amount": breakdown.igst_amount,
        "total_tax": breakdown.total_tax,
        "grand_total": breakdown.grand_total,
    }


@router.post("/checkout/{provider}")
def checkout(provider: str, payload: dict[str, object] = Body(default_factory=dict)) -> dict[str, object]:
    if provider not in {"razorpay", "cashfree"}:
        return {"message": "Unsupported provider"}
    amount = int(payload.get("amount", 59900))
    currency = str(payload.get("currency", "INR"))
    metadata = {
        "organization_id": payload.get("organization_id"),
        "supports_upi": True,
        "gst_invoice": True,
    }
    return create_checkout(provider=provider, amount=amount, currency=currency, metadata=metadata)


@router.post("/webhooks/{provider}")
def webhook(provider: str, payload: dict[str, object] = Body(default_factory=dict)) -> dict[str, object]:
    if provider not in {"razorpay", "cashfree"}:
        return {"message": "Unsupported provider"}
    return parse_webhook(provider=provider, payload=payload)
