# test ของ T-03: จองคิวสำเร็จ
# AC-BKG-01 (FR-BKG-04)
from app.db.models import Booking, Slot
from tests.conftest import AUTH


def test_AC_BKG_01(client, make_slot):
    """AC-BKG-01: ยืนยันตัวตนแล้ว และช่วง 09.00 น. มีที่นั่งว่าง จองแล้วต้องสำเร็จ"""
    slot = make_slot(start="09:00", remaining=1)

    res = client.post("/bookings", json={"slot_id": slot.id}, headers=AUTH)

    assert res.status_code == 201


def test_AC_BKG_01_successful_booking(client, make_slot, db):
    """AC-BKG-01: เมื่อยืนยันตัวตนแล้วและมีที่นั่งว่าง 1 ที่ ต้องบันทึกและลดที่นั่งเหลือเป็น 0"""
    # Given
    slot = make_slot(start="09:00", remaining=1)

    # When
    res = client.post("/bookings", json={"slot_id": slot.id}, headers=AUTH)

    # Then
    assert res.status_code == 201
    payload = res.json()
    assert payload["queue_no"]
    assert payload["slot_id"] == slot.id
    assert db.get(Slot, slot.id).remaining == 0
    assert db.query(Booking).filter_by(slot_id=slot.id).count() == 1


def test_AC_BKG_01_last_available_slot(client, make_slot, db):
    """AC-BKG-01: ช่วงค่าสุดท้ายที่มี 1 ที่ เมื่อจองก็ต้องลดเหลือ 0 และมีการบันทึกครบ"""
    # Given
    slot = make_slot(start="09:00", remaining=1, capacity=1)

    # When
    res = client.post("/bookings", json={"slot_id": slot.id}, headers=AUTH)

    # Then
    assert res.status_code == 201
    payload = res.json()
    assert payload["queue_no"] == "A001"
    assert db.get(Slot, slot.id).remaining == 0
    assert db.query(Booking).filter_by(slot_id=slot.id).count() == 1


def test_AC_BKG_01_unverified_user_cannot_book(client, make_slot, db):
    """AC-BKG-01: ผู้ใช้ที่ยังไม่ได้ยืนยันตัวตนต้องปฏิเสธการจองและไม่บันทึก"""
    # Given
    slot = make_slot(start="09:00", remaining=1)

    # When
    res = client.post("/bookings", json={"slot_id": slot.id}, headers={})

    # Then
    assert res.status_code == 401
    assert db.get(Slot, slot.id).remaining == 1
    assert db.query(Booking).filter_by(slot_id=slot.id).count() == 0
