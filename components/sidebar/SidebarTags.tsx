import Link from 'next/link'
import { getAllTags } from '@/lib/posts'

export default function SidebarTags() {
  const tags = getAllTags().slice(0, 30)
  if (tags.length === 0) return null

  return (
    <div className="mb-6">
      <h3 className="text-[12px] font-bold text-text-soft uppercase tracking-wider mb-4">Tags Populer</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${encodeURIComponent(tag)}`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[20px] text-[11.5px] font-medium no-underline transition-all duration-150 bg-cream hover:bg-navy hover:text-cream text-text-mid border border-cream-dark hover:border-navy"
          >
            #{tag}
            <span className="text-[10px] opacity-60">{count}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
