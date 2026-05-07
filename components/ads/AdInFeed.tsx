import AdUnit from './AdUnit'

// Slot E — In-Feed, tiap 3 kartu artikel
export default function AdInFeed() {
  return (
    <div className="col-span-full">
      <AdUnit
        slot="2440316331"
        format="fluid"
        style={{ minHeight: 120, width: '100%' }}
      />
    </div>
  )
}
