import { TICKER_ITEMS } from '@/lib/categories'

export default function TickerBar() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div
      className="w-full overflow-hidden bg-navy text-cream/80 select-none"
      style={{ height: 37 }}
      aria-hidden="true"
    >
      <div className="ticker-track flex items-center h-full whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="text-[12.5px] px-8">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
