import { TICKER_ITEMS, type TickerItem } from '@/lib/categories'

function TickerSegment({ item }: { item: TickerItem }) {
  const isPromo = item.variant === 'promo'

  const inner = (
    <span className="inline-flex items-center gap-2">
      <span className={isPromo ? 'text-cream' : 'text-cream/70'}>{item.text}</span>
      {item.cta && (
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide"
          style={{
            background: 'oklch(72% 0.14 82deg)',
            color: '#0B1120',
          }}
        >
          {item.cta}
        </span>
      )}
    </span>
  )

  const wrapClass = `inline-flex items-center gap-3 px-8 shrink-0 ${
    isPromo ? 'font-semibold' : 'font-normal'
  }`

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${wrapClass} hover:opacity-80 transition-opacity no-underline`}
      >
        {inner}
        <span className="text-cream/20 select-none">·</span>
      </a>
    )
  }

  return (
    <span className={wrapClass}>
      {inner}
      <span className="text-cream/20 select-none">·</span>
    </span>
  )
}

export default function TickerBar() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div
      className="w-full overflow-hidden bg-navy select-none"
      style={{ height: 38 }}
      aria-label="Info & promo terbaru M2B"
    >
      <div className="ticker-track flex items-center h-full whitespace-nowrap text-[12.5px]">
        {doubled.map((item, i) => (
          <TickerSegment key={i} item={item} />
        ))}
      </div>
    </div>
  )
}
