import { useEffect, useState } from 'react'

const DEFAULT_PACKAGE = 'ทั่วไป'

function normaliseSlots(response) {
  return Array.isArray(response) ? response : response?.slots ?? []
}

function formatDate(value) {
  return new Intl.DateTimeFormat('th-TH', {
    dateStyle: 'medium',
    timeZone: 'Asia/Bangkok',
  }).format(new Date(`${value}T00:00:00+07:00`))
}

function formatTime(value) {
  return String(value).slice(0, 5)
}

// แสดงช่วงเวลาว่างและโหลดข้อมูลใหม่เมื่อเปลี่ยนแพ็กเกจตาม FR-BKG-01 และ FR-BKG-06
export default function SlotPicker({ apiClient }) {
  const [packageCode, setPackageCode] = useState(DEFAULT_PACKAGE)
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')

    const dateFrom = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Bangkok',
    }).format(new Date())

    apiClient
      .getSlots({ dateFrom, packageCode })
      .then((response) => {
        if (active) setSlots(normaliseSlots(response))
      })
      .catch(() => {
        if (active) setError('ไม่สามารถโหลดช่วงเวลาว่างได้')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [apiClient, packageCode])

  return (
    <section className="mx-auto max-w-3xl p-6">
      <header className="border-b border-slate-200 pb-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
          จองคิวตรวจสุขภาพ
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">เลือกแพ็กเกจและช่วงเวลา</h1>
        <p className="mt-2 text-slate-600">ช่วงเวลาที่แสดงอยู่ภายใน 30 วันข้างหน้า</p>
      </header>

      <label className="mt-6 block max-w-sm text-sm font-semibold text-slate-700" htmlFor="package">
        แพ็กเกจ
        <select
          id="package"
          value={packageCode}
          onChange={(event) => setPackageCode(event.target.value)}
          className="mt-2 block w-full rounded border border-slate-300 bg-white px-3 py-2 text-base font-normal text-slate-900"
        >
          <option value="ทั่วไป">ตรวจสุขภาพทั่วไป</option>
          <option value="ผู้บริหาร">ตรวจสุขภาพผู้บริหาร</option>
        </select>
      </label>

      <div className="mt-8" aria-live="polite">
        {loading && <p className="text-slate-600">กำลังโหลดช่วงเวลาว่าง...</p>}
        {error && <p className="text-red-700">{error}</p>}
        {!loading && !error && slots.length === 0 && (
          <p className="text-slate-600">ยังไม่มีช่วงเวลาว่างสำหรับแพ็กเกจนี้</p>
        )}
        {!loading && !error && slots.length > 0 && (
          <ul className="space-y-3" aria-label="ช่วงเวลาว่าง">
            {slots.map((slot) => (
              <li key={slot.id} className="flex items-center justify-between border border-slate-200 p-4">
                <div>
                  <p className="font-semibold text-slate-900">{formatDate(slot.slot_date)}</p>
                  <p className="mt-1 text-lg text-slate-700">{formatTime(slot.start_time)} น.</p>
                </div>
                <p className="text-right text-sm text-slate-600">
                  ที่นั่งคงเหลือ
                  <strong className="mt-1 block text-xl text-teal-700">{slot.remaining}</strong>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}