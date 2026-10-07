# RTM: จองคิวตรวจสุขภาพ (Booking)
อ้างอิง: spec.md Draft v2 | tasks.md | test-cases.md
สร้างด้วย /verify เมื่อ 2569-10-07 09.05 | test: 7 ผ่าน 0 ไม่ผ่าน

## 1. ตามรอยไปข้างหน้า (requirement ไป โค้ด ไป test)
| ID | AC | task | โค้ด (ไฟล์: ฟังก์ชัน) | test (ผล) | สถานะ |
|---|---|---|---|---|---|
| FR-BKG-01 | AC-BKG-05 (ตรวจเฉพาะ p95 ไม่ได้ตรวจช่วง 30 วัน) | T-02 เสร็จ | backend/app/slots/service.py: list_available_slots; backend/app/slots/router.py: get_slots | test_AC_BKG_05 ผ่าน แต่ไม่ตรวจขอบเขต 30 วัน | ช่องโหว่ |
| FR-BKG-02 | AC-BKG-02 | T-04 พร้อมทำ | ยังไม่พบการกันจองซ้ำรายวัน | ยังไม่มี test_AC_BKG_02 | ยังไม่ถึง |
| FR-BKG-03 | AC-BKG-03 | T-05 พร้อมทำ | backend/app/booking/router.py: create_booking ยังไม่เสนอช่วงใกล้เคียงเมื่อเต็ม | ยังไม่มี test_AC_BKG_03 | ยังไม่ถึง |
| FR-BKG-04 | AC-BKG-01 | T-03 เสร็จ; T-06 รอ Q-02 | backend/app/booking/service.py: create_booking, next_queue_no; backend/app/booking/router.py: create_booking; ไม่มีหน้า BookingResult | test_AC_BKG_01, test_AC_BKG_01_successful_booking, test_AC_BKG_01_last_available_slot ผ่าน; ไม่ตรวจการแสดงบนหน้าจอ และชื่อไม่ตรงกับ TC ที่อนุมัติ | ช่องโหว่ |
| FR-BKG-05 | AC-BKG-04 | T-07 พร้อมทำ | ยังไม่พบระบบส่งข้อความหรือคิวส่งซ้ำ | ยังไม่มี test_AC_BKG_04 | ยังไม่ถึง |
| FR-BKG-06 | ไม่มี AC | T-02 เสร็จ; T-10 พร้อมทำ | backend/app/slots/service.py: list_available_slots กรอง package_code; UI เปลี่ยนแพ็กเกจยังไม่มี | ไม่มี test ตรวจการเปลี่ยนแพ็กเกจ | ช่องโหว่ |
| NFR-PERF-01 | AC-BKG-05 | T-02 เสร็จ | backend/app/slots/router.py: get_slots; backend/app/slots/service.py: list_available_slots | test_AC_BKG_05 ผ่าน แต่ยิงคำขอเรียงลำดับ ไม่ได้จำลองผู้ใช้พร้อมกัน 200 คน | ช่องโหว่ |
| NFR-SEC-01 | ไม่มี AC | ไม่มี task เฉพาะ | ไม่พบการตั้งค่า TLS ใน backend หรือ frontend | ไม่มี test ตรวจ TLS 1.2 ขึ้นไป | ช่องโหว่ |
| NFR-REL-02 | AC-BKG-04 | T-07 พร้อมทำ | ยังไม่พบคิวหรือกลไกส่งซ้ำ | ยังไม่มี test_AC_BKG_04 | ยังไม่ถึง |
| NFR-USE-01 | ไม่มี AC | ไม่พบ task สำหรับการทดสอบผู้ใช้ | ยังไม่มี workflow จองครบเส้นทางบนหน้าจอ | ไม่มี test หรือผลการทดสอบกับอาสาสมัคร 10 คน | ช่องโหว่ |
| CON-TECH-01 | ไม่มี AC | T-01 เสร็จ | backend/app/config.py: DATABASE_URL; backend/app/db/session.py: engine | test_T01_tables_created และ test_T01_no_national_id ผ่านบน SQLite; ไม่มีการตรวจการเชื่อมต่อ PostgreSQL | ช่องโหว่ |
| DOM-PDPA-01 | AC-BKG-06 | T-08 พร้อมทำ | มีโมเดล AuditLog ใน backend/app/db/models.py แต่ไม่พบ middleware/การเขียน log | ยังไม่มี test_AC_BKG_06 | ยังไม่ถึง |
| IF-IDP-01 | ไม่มี AC ตรง (AC-BKG-01 กำหนดผู้ใช้ยืนยันตัวตนแล้ว) | T-03 เสร็จ | backend/app/auth/idp.py: get_verified_hn ตรวจเพียง prefix จำลอง ไม่พบการตรวจสอบกับ IdP จริง | test_AC_BKG_01_unverified_user_cannot_book ผ่านเฉพาะการขาด header; ไม่ยืนยันการตรวจ token กับ IdP | ช่องโหว่ |
| IF-HIS-01 | ไม่มี AC | T-01 เสร็จ; T-09 พร้อมทำ | backend/app/db/models.py: Booking เก็บ hn และไม่มี national_id; ไม่พบ HIS lookup; backend/app/booking/router.py รับและ log national_id | test_T01_no_national_id ผ่านเรื่อง schema เท่านั้น | ช่องโหว่ |
| IF-NOT-01 | AC-BKG-04 | T-07 พร้อมทำ | ยังไม่พบการส่งข้อความแบบ asynchronous | ยังไม่มี test_AC_BKG_04 | ยังไม่ถึง |

**ผล test ที่รัน:** `cd backend && pytest -v` — 7 passed, 0 failed, 1 deprecation warning. Frontend มีเพียง `setup.test.jsx` ซึ่งเป็น smoke test ของโครงเริ่มต้น ไม่ใช่ test ของ AC; ตามคำสั่ง /verify จึงไม่รัน npm test.

**ความครอบคลุม AC / test-cases:** AC-BKG-01 มี 3 test case สถานะ “ใช้ได้” แต่ไม่มี test ชื่อ `test_TC_BKG_01_1_successful_booking`, `test_TC_BKG_01_2_last_available_slot`, `test_TC_BKG_01_3_unverified_user_cannot_book` และไม่มี vitest ตรวจส่วน “แสดงหมายเลขคิว” ตาม Then. AC-BKG-02 ถึง AC-BKG-06 ยังไม่มี test ในโค้ด โดย task ที่เกี่ยวข้องยังไม่เสร็จ ยกเว้น AC-BKG-05 ที่มี test แล้ว.

## 2. ตามรอยย้อนกลับ (โค้ด ไป requirement)
| โค้ด (ไฟล์: ฟังก์ชัน หรือ endpoint) | อ้าง ID | ตรงกับข้อความใน spec ไหม | หมายเหตุ |
|---|---|---|---|
| backend/app/main.py: lifespan, app, include_router | CON-TECH-01, FR-BKG-01, FR-BKG-04 | บางส่วน | สร้างตารางและรวม router; ไม่มี audit middleware |
| backend/app/slots/router.py: GET /slots, get_slots | FR-BKG-01, FR-BKG-06 | ไม่ครบ | ส่งช่วงว่างและจำนวนคงเหลือ แต่ขอบเขตวันมาจาก service ซึ่งกำหนด 14 วัน |
| backend/app/slots/service.py: list_available_slots | FR-BKG-01, FR-BKG-06, ASM-01 | ไม่ตรงทั้งหมด | กรองแพ็กเกจ/ที่นั่ง แต่ DAYS_AHEAD=14 ไม่ตรง “ภายใน 30 วันข้างหน้า” |
| backend/app/booking/router.py: POST /bookings, BookingRequest | FR-BKG-04, FR-BKG-03, IF-IDP-01, IF-HIS-01 | ไม่ครบ | สร้าง booking พื้นฐาน; ไม่จัดการแนะนำช่วงเวลาเต็ม; มีฟิลด์ national_id ใน request โดยไม่ใช่ GET /patients/lookup ตาม plan |
| backend/app/booking/router.py: DELETE /bookings/{booking_id}, cancel_booking | ไม่มี; ขัดกับ Out of scope UC-02 | ไม่ตรง | เพิ่ม endpoint ยกเลิกคิว ทั้งที่ spec ระบุยกเลิก/เลื่อนคิวเป็น Out of scope |
| backend/app/booking/router.py: logger.info ใน create_booking | IF-HIS-01 | ไม่ตรง | เขียนค่า national_id ที่รับมาใน request ลง log โดยไม่จำเป็น |
| backend/app/booking/service.py: create_booking | FR-BKG-04, FR-BKG-03 | ไม่ครบ | บันทึกและตัดที่นั่ง; ตรวจเต็มด้วย `remaining < 0` ทำให้ค่า 0 ผ่านและลดเป็น -1 ได้ จึงไม่ป้องกันกรณีเต็ม |
| backend/app/booking/service.py: next_queue_no | FR-BKG-04, Q-02 | ไม่ตรง | กำหนดรูปแบบ `A001` และเริ่มนับใหม่รายวัน ทั้งที่ Q-02 ยังเปิดอยู่ |
| backend/app/booking/service.py: cancel_booking | ไม่มี; ขัดกับ Out of scope UC-02 | ไม่ตรง | คืนที่นั่งและเปลี่ยนสถานะเป็น CANCELLED |
| backend/app/auth/idp.py: get_verified_hn | IF-IDP-01 | ไม่ครบ | ตรวจ prefix แบบจำลองและดึง HN จาก header; ไม่ตรวจผลกับระบบ IdP |
| backend/app/db/models.py: Slot, Booking, AuditLog | FR-BKG-01, FR-BKG-02, FR-BKG-04, FR-BKG-06, DOM-PDPA-01, IF-HIS-01 | บางส่วน | มีโครงตารางและไม่เก็บ national_id ใน Booking; AuditLog ยังไม่มีโค้ดบันทึก; queue_no nullable ตาม Q-02 |
| backend/app/db/migrations/001_init.py: upgrade | CON-TECH-01, DOM-PDPA-01, IF-HIS-01 | บางส่วน | สร้าง schema แต่ test ใช้ SQLite ไม่ใช่ PostgreSQL |
| backend/app/config.py: DATABASE_URL; backend/app/db/session.py: engine, get_db | CON-TECH-01 | บางส่วน | รองรับ DATABASE_URL แต่ค่าเริ่มต้นเป็น SQLite; ยังไม่มีหลักฐานตรวจ PostgreSQL runtime |
| frontend/src/api/client.js: getSlots, createBooking | FR-BKG-01, FR-BKG-04, FR-BKG-06 | บางส่วน | มี client เรียก API แต่ไม่มี UI ที่ใช้ client; ไม่พบการยืนยันตัวตนใน request |
| frontend/src/App.jsx: App | ไม่มี FR ที่ทำงานครบ | ไม่ตรง/ยังไม่เสร็จ | เป็นเพียงหน้า placeholder; ไม่มี flow จองและแสดงผล |
| frontend/src/main.jsx: createRoot | — | เป็นโครงเริ่มต้น | จุดเริ่มหน้าเว็บ ไม่มีพฤติกรรม requirement |
| frontend/src/index.css | — | ไม่เกี่ยวกับ requirement โดยตรง | นำเข้า Tailwind เท่านั้น |
| backend/tests/conftest.py: db, client, make_slot | ใช้ประกอบ AC-BKG-01, AC-BKG-05 | บางส่วน | fixture จำลอง HN ผ่าน token prefix และฐานข้อมูล SQLite |
| backend/tests/test_AC_BKG_01.py: test_AC_BKG_01 และ test ใหม่ 3 ตัว | AC-BKG-01 | ไม่ครบ | test เดิมตรวจเพียง 201; test ใหม่ตรวจ response/database บางส่วน แต่ไม่ตรวจ UI และไม่ได้ใช้ชื่อ test ตาม test-cases.md |
| backend/tests/test_AC_BKG_05.py: test_AC_BKG_05 | AC-BKG-05, NFR-PERF-01 | ไม่ครบ | วัด 200 request แบบ sequential ไม่ใช่ 200 concurrent users |
| backend/tests/test_T01_schema.py: test_T01_tables_created, test_T01_no_national_id | CON-TECH-01, DOM-PDPA-01, IF-HIS-01 | บางส่วน | ยืนยันชื่อ table และไม่มี national_id ใน schema เท่านั้น |
| frontend/src/__tests__/setup.test.jsx: โครงหน้าจอเปิดได้ | ไม่มี AC | ตรงกับ setup test เท่านั้น | ตรวจข้อความ placeholder ไม่ได้ตรวจ booking requirement |

## 3. ข้อค้นพบ
ชนิด: AC ไม่มี test / test อ่อน / โค้ดไม่มี FR / FR ไม่มี AC / เดา Q-xx / ละเมิด Constraint / ตัวเลขไม่ตรง spec / อ้าง ID ผิดเรื่อง
ทีมตัดสิน: แก้โค้ด / แก้ spec / เพิ่ม Q-xx / ไม่ใช่ปัญหา (พร้อมเหตุผล 1 บรรทัด)

| F-ID | ชนิด | อยู่ที่ | ขัดกับ | รายละเอียด | ทีมตัดสิน |
|---|---|---|---|---|---|
| F-01 | ละเมิด Constraint | backend/app/booking/router.py: get_verified_hn และ backend/app/auth/idp.py: get_verified_hn | IF-IDP-01 | การยืนยันตัวตนเป็นการตรวจ prefix จำลอง ไม่ได้ตรวจผลยืนยันตัวตนจากระบบ IdP; ผู้ส่ง header ที่ขึ้นต้นด้วย prefix สามารถระบุ HN เองได้ | |
| F-02 | ละเมิด Constraint | backend/app/booking/router.py: BookingRequest, create_booking logger | IF-HIS-01 | รับ national_id ที่ POST /bookings และเขียนค่าลง log ทั้งที่ plan กำหนด lookup ผ่าน HIS และภายในระบบอ้างอิงด้วย HN; ข้อมูลอ่อนไหวถูก log โดยไม่จำเป็น | |
| F-03 | ตัวเลขไม่ตรง spec | backend/app/booking/service.py: create_booking | FR-BKG-03 | เมื่อ remaining เท่ากับ 0 เงื่อนไข `remaining < 0` ยังอนุญาตให้จอง ลด remaining เป็น -1 และตอบสำเร็จ แทนการแจ้งเต็มและไม่สร้างรายการจอง | |
| F-04 | ตัวเลขไม่ตรง spec | backend/app/slots/service.py: DAYS_AHEAD, list_available_slots | FR-BKG-01 | กำหนดช่วงค้นหา 14 วัน ขณะที่ spec กำหนดแสดงช่วงเวลาภายใน 30 วันข้างหน้า | |
| F-05 | เดา Q-xx | backend/app/booking/service.py: next_queue_no | Q-02, FR-BKG-04 | กำหนดรูปแบบ A001 และการเริ่มนับใหม่ทุกวัน ทั้งที่ Q-02 ยังไม่มีคำตอบ; plan ข้อ 1 และ 8 ระบุว่ายังไม่สร้างการออกเลขจนกว่าจะได้คำตอบ | |
| F-06 | โค้ดไม่มี FR | backend/app/booking/router.py: DELETE /bookings/{booking_id}; backend/app/booking/service.py: cancel_booking | Out of scope: ยกเลิก/เลื่อนคิว (UC-02) | มี endpoint ยกเลิก booking คืนที่นั่งและตั้งสถานะ CANCELLED ทั้งที่ spec ระบุเรื่องนี้เป็น Out of scope | |
| F-07 | test อ่อน | backend/tests/test_AC_BKG_01.py และ frontend/src/__tests__/ | AC-BKG-01, FR-BKG-04 | Then ระบุให้ “แสดงหมายเลขคิว” แต่ไม่มี UI booking result หรือ vitest assert การแสดงผล; ชื่อ test ใหม่ไม่ตรงกับชื่อ test ที่ระบุในแถวสถานะ “ใช้ได้” | |
| F-08 | test อ่อน | backend/tests/test_AC_BKG_05.py: test_AC_BKG_05 | AC-BKG-05, NFR-PERF-01 | 200 คำขอถูกเรียกทีละคำขอใน loop จึงไม่วัด p95 เมื่อมีผู้ใช้พร้อมกัน 200 คนตาม NFR | |
| F-09 | FR ไม่มี AC | specs/001-booking/spec.md: FR-BKG-01, FR-BKG-06 | FR-BKG-01, FR-BKG-06 | AC-BKG-05 ทดสอบเฉพาะ performance ไม่ตรวจช่วง 30 วันหรือแสดงจำนวนที่นั่งตาม FR-BKG-01; FR-BKG-06 ไม่มี AC เลย | |
| F-10 | AC ไม่มี test | specs/001-booking/spec.md: NFR-PERF-01, NFR-SEC-01, NFR-USE-01; tasks.md | NFR-PERF-01, NFR-SEC-01, NFR-USE-01 | NFR-SEC-01 ไม่มี task/test สำหรับยืนยัน TLS 1.2+; NFR-USE-01 ไม่มี task หรือผลทดสอบกับผู้ใช้ใหม่ 8 ใน 10 คน; performance test ไม่จำลอง concurrency ตามเกณฑ์ | |
| F-11 | ละเมิด Constraint | backend/app/config.py: DATABASE_URL; backend/tests/test_T01_schema.py | CON-TECH-01 | ค่าเริ่มต้น runtime เป็น SQLite และหลักฐาน test ตรวจ schema บน SQLite เท่านั้น; ไม่พบการตรวจว่าการ deploy จริงใช้ PostgreSQL ตาม constraint | |

## 4. แก้แล้ว
| F-ID | แก้อย่างไร | รู้ได้อย่างไร |
|---|---|---|
