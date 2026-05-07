import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function SidebarCategories() {
  const posts = getAllPosts()
  const counts: Record<string, number> = {}
  posts.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1 })
  const categories = Object.entries(counts).sort((a, b) => b[1] - a[1])

  const CAT_COLORS: Record<string, string> = {
    'Ekspor': 'oklch(55% 0.18 145deg)',
    'Impor': 'oklch(50% 0.18 230deg)',
    'UMKM': 'oklch(55% 0.18 30deg)',
    'Bea Cukai': 'oklch(50% 0.18 310deg)',
  }

  return (
    <div className="mb-6">
      <h3 className="text-[12px] font-bold text-text-soft uppercase tracking-wider mb-4">Kategori</h3>
      <ul className="space-y-1.5">
        {categories.map(([cat, count]) => (
          <li key={cat}>
            <Link
              href={`/category/${cat.toLowerCase().replace(/ /g, '-')}`}
              className="flex items-center justify-between px-3 py-2 rounded-[8px] no-underline group transition-all duration-150 hover:bg-cream-dark"
            >
              <span className="flex items-center gap-2 text-[13px] font-medium text-text-main group-hover:text-navy transition-colors">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: CAT_COLORS[cat] || '#8891AA' }}
                />
                {cat}
              </span>
              <span className="text-[11.5px] font-bold text-text-soft bg-cream px-2 py-0.5 rounded-full group-hover:bg-cream-dark">
                {count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
