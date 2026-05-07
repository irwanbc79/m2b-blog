import { BLOG_STATS } from '@/lib/categories'

export default function StatsBanner() {
  return (
    <div className="bg-navy py-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {BLOG_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl font-extrabold mb-1"
                style={{ color: 'oklch(72% 0.14 82deg)' }}
              >
                {stat.value}
              </div>
              <div className="text-[12px] text-cream/70 uppercase tracking-wide font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
