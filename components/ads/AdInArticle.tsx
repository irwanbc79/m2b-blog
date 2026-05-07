import AdUnit from './AdUnit'

interface Props {
  slot?: 'top' | 'mid'
}

// Slot B (top) & Slot C (mid) — In-Article 580×250
export default function AdInArticle({ slot = 'top' }: Props) {
  const slotId = slot === 'top' ? 'SLOT_B_INARTICLE_TOP' : 'SLOT_C_INARTICLE_MID'
  return (
    <div className="my-8 flex justify-center">
      <AdUnit
        slot={slotId}
        format="rectangle"
        style={{ maxWidth: 580, width: '100%' }}
      />
    </div>
  )
}
