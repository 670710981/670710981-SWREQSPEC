# Prompt log

บันทึกทุกครั้งที่ใช้ AI กับ repo นี้ เขียนต่อท้ายเรื่อย ๆ ไม่ต้องลบของเก่า

---

## 2569-09-16 คำสั่ง: /plan

- เครื่องมือ: Copilot ใน Codespaces
- ไฟล์: specs/001-booking/spec.md (Draft v1)
- ผลลัพธ์: specs/001-booking/plan.md
- Constraint ที่ AI ยังไม่ได้ใช้: ไม่มี ทุก Constraint ถูกระบุในตารางตรวจของ plan.md
- สิ่งที่ AI บอกว่าอยากเดาแต่ไม่ได้เดา:
  - เกณฑ์และขอบเขตของ “ช่วงเวลาใกล้เคียง” ตาม Q-01
  - กติกาการรีเซ็ตหรือการนับต่อเนื่องของหมายเลขคิวตาม Q-02
- หมายเหตุ: spec.md ยังเป็น Draft v1 และ Open Questions ยังไม่ได้รับคำตอบ จึงทำเครื่องหมายส่วนที่เกี่ยวข้องเป็นงานที่ยังไม่สร้าง

---

## 2569-09-23 คำสั่ง: /tasks specs-/001-booking/spec.md

- เครื่องมือ: Copilot ใน Codespaces
- ไฟล์: `specs/001-booking/spec.md`, `specs/001-booking/plan.md`
- ผลลัพธ์: `specs/001-booking/tasks.md` มี 18 tasks เรียงตามการพึ่งพา พร้อมตารางตรวจ AC และ Constraint ครบทุก ID
- งานที่รอ Open Question: T-08, T-09, T-15, T-16, T-17 และ T-18 รอ Q-02 เรื่องรูปแบบและวิธีออกหมายเลขคิว
- หมายเหตุ: ยังไม่เริ่มทำ task ใด ๆ และไม่เดาคำตอบของ Q-02

---

## 2569-09-23 คำสั่ง: /implement T-01 specs/001-booking/tasks.md

- ไฟล์ที่สร้างหรือแก้: `backend/app/db/models.py`, `backend/app/db/session.py`, `backend/app/db/migrations/001_init.py`, `backend/tests/conftest.py`, `specs/001-booking/tasks.md`
- ผล test: SQLite smoke test ผ่าน สร้างตาราง `slots`, `bookings`, `audit_logs` ครบ และยืนยันว่า `bookings` ไม่มี `national_id`; `pytest --collect-only -q` ไม่พบ test จึงจบด้วย code 5
- Constraint ที่ทำให้เป็นจริง: `CON-TECH-01` รองรับ engine ผ่าน `DATABASE_URL` และ migration; `DOM-PDPA-01` มีตาราง `audit_logs` พร้อมผู้เข้าถึง เวลา และ HN; `IF-HIS-01` โมเดล `bookings` เก็บ `hn` และไม่มี `national_id`
- สิ่งที่เกือบต้องเดา: รูปแบบและวิธีออก `queue_no` ยังติด `Q-02` จึงเก็บคอลัมน์เป็น nullable และไม่กำหนดวิธีออกเลข

---

## 2569-09-23 คำสั่ง: /implement T-13 specs/001-booking/tasks.md

- ไฟล์ที่สร้างหรือแก้: `frontend/src/pages/SlotPicker.jsx`, `frontend/src/App.jsx`, `frontend/src/api/client.js`, `frontend/src/__tests__/SlotPicker.test.jsx`, `specs/001-booking/tasks.md`
- ผล test: `npm test -- --run src/__tests__/SlotPicker.test.jsx` ผ่าน 2 tests ใน 1 test file
- Constraint ที่เกี่ยวข้อง: ไม่มี Constraint โดยตรง; หน้าจอใช้ API จำลองตาม plan และรองรับ FR-BKG-01, FR-BKG-06, ASM-02
- สิ่งที่เกือบต้องเดา: รูปแบบ response ของ `GET /slots` plan ระบุเป็นรายการช่วงเวลา จึงรองรับทั้ง array และ `{ slots: [...] }` เพื่อใช้กับ API จำลอง โดยไม่ได้กำหนดกติกาใหม่