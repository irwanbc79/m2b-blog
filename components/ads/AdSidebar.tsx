import AdUnit from './AdUnit'

// Slot D — Sidebar 300×600 sticky
export default function AdSidebar() {
  return (
    <AdUnit
      slot="SLOT_D_SIDEBAR"
      format="vertical"
      style={{ width: 300, minHeight: 600 }}
    />
  )
}
