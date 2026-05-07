import AdUnit from './AdUnit'

// Slot A — Leaderboard 728×90, posisi bawah hero atas artikel grid
export default function AdLeaderboard() {
  return (
    <div className="flex justify-center py-4">
      <AdUnit
        slot="SLOT_A_LEADERBOARD"
        format="leaderboard"
        style={{ width: 728, maxWidth: '100%' }}
      />
    </div>
  )
}
