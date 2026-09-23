import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import SlotPicker from '../pages/SlotPicker'

const slots = [
  { id: 1, slot_date: '2026-09-24', start_time: '09:00:00', remaining: 2 },
  { id: 2, slot_date: '2026-09-25', start_time: '13:30:00', remaining: 1 },
]

describe('SlotPicker', () => {
  it('แสดงวัน เวลา และที่นั่งคงเหลือจาก API จำลองภายใน 30 วัน', async () => {
    const apiClient = { getSlots: vi.fn().mockResolvedValue({ slots }) }

    render(<SlotPicker apiClient={apiClient} />)

    expect(await screen.findByText('09:00 น.')).toBeTruthy()
    expect(screen.getAllByText('ที่นั่งคงเหลือ')).toHaveLength(2)
    expect(screen.getByText('2')).toBeTruthy()
    expect(apiClient.getSlots).toHaveBeenCalledWith(
      expect.objectContaining({ packageCode: 'ทั่วไป' }),
    )
  })

  it('โหลดช่วงเวลาใหม่เมื่อเปลี่ยนแพ็กเกจ', async () => {
    const apiClient = {
      getSlots: vi
        .fn()
        .mockResolvedValueOnce({ slots })
        .mockResolvedValueOnce({
          slots: [{ id: 3, slot_date: '2026-09-26', start_time: '10:00:00', remaining: 4 }],
        }),
    }

    render(<SlotPicker apiClient={apiClient} />)
    await screen.findByText('09:00 น.')

    const packageSelect = screen.getByLabelText('แพ็กเกจ')
    fireEvent.change(packageSelect, { target: { value: 'ผู้บริหาร' } })

    await waitFor(() => expect(apiClient.getSlots).toHaveBeenCalledTimes(2))
    expect(apiClient.getSlots).toHaveBeenLastCalledWith(
      expect.objectContaining({ packageCode: 'ผู้บริหาร' }),
    )
    expect(await screen.findByText('10:00 น.')).toBeTruthy()
  })
})