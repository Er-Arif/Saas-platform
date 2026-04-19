from fastapi import APIRouter

router = APIRouter()


@router.get("/providers")
def providers() -> list[dict[str, object]]:
    return [
        {"provider": "razorpay", "supports_upi": True, "supports_gst": True},
        {"provider": "cashfree", "supports_upi": True, "supports_gst": True},
    ]

