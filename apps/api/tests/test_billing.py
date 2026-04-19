from app.services.billing import calculate_gst


def test_gst_intrastate_split():
    breakdown = calculate_gst(subtotal=100000, interstate=False)
    assert breakdown.total_tax == 18000
    assert breakdown.cgst_amount == 9000
    assert breakdown.sgst_amount == 9000
    assert breakdown.igst_amount == 0


def test_gst_interstate_igst():
    breakdown = calculate_gst(subtotal=100000, interstate=True)
    assert breakdown.total_tax == 18000
    assert breakdown.igst_amount == 18000
    assert breakdown.cgst_amount == 0
    assert breakdown.sgst_amount == 0

