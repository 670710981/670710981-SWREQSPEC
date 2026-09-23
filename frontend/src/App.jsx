import { api } from './api/client'
import SlotPicker from './pages/SlotPicker'

// ประกอบหน้าจอเลือกช่วงเวลาจองตาม FR-BKG-01 และ FR-BKG-06
export default function App({ apiClient = api }) {
  return <SlotPicker apiClient={apiClient} />
}
