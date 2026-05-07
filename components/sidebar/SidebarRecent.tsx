import Link from 'next/link'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import type { Post } from '@/lib/posts'
import CategoryBadge from '@/components/ui/CategoryBadge'

interface Props {
  posts: Post[]
  title?: string
}

export default function SidebarRecent({ posts, title = 'Artikel Terbaru' }: Props) {
  return (
    <div className="mb-6">
      <h3 className="text-[12px] font-bold text-text-soft uppercase tracking-wider mb-4">{title}</h3>
      <ul className="space-y-4">
        {posts.slice(0, 5).map(post => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block no-underline">
              <CategoryBadge category={post.category} size="sm" />
              <p className="text-[13.5px] font-semibold text-navy leading-snug mt-1 group-hover:text-text-mid transition-colors line-clamp-2">
                {post.title}
              </p>
              <p className="text-[11.5px] text-text-soft mt-0.5">
                {post.date ? format(new Date(post.date), 'd MMM yyyy', { locale: id }) : ''}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
