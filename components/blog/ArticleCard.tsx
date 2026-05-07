import Link from 'next/link'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import CategoryBadge from '@/components/ui/CategoryBadge'
import ReadingTime from '@/components/ui/ReadingTime'
import type { Post } from '@/lib/posts'

interface Props {
  post: Post
  variant?: 'default' | 'featured' | 'side'
}

export default function ArticleCard({ post, variant = 'default' }: Props) {
  const dateStr = post.date
    ? format(new Date(post.date), 'd MMM yyyy', { locale: id })
    : ''

  if (variant === 'featured') {
    return (
      <Link href={`/blog/${post.slug}`} className="block no-underline group h-full">
        <div
          className="h-full min-h-[440px] rounded-[24px] p-6 flex flex-col justify-end relative overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(11,17,32,0.22)]"
          style={{ background: '#0B1120', boxShadow: '0 4px 24px rgba(11,17,32,0.18)' }}
        >
          <div
            className="absolute inset-0 opacity-30 rounded-[24px]"
            style={{ background: 'radial-gradient(ellipse at 30% 20%, oklch(72% 0.14 82deg), transparent 60%)' }}
          />
          <div className="relative z-10 flex flex-col gap-3">
            <CategoryBadge category={post.category} />
            <h2
              className="font-extrabold text-cream leading-tight"
              style={{ fontSize: 26, letterSpacing: '-0.3px', lineHeight: 1.28 }}
            >
              {post.title}
            </h2>
            <p className="text-[13.5px] text-cream/60 line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center gap-3 text-cream/50 text-[12px] mt-1">
              <span>{dateStr}</span>
              <span>·</span>
              <ReadingTime minutes={post.readTime} className="text-cream/50" />
            </div>
            <div
              className="mt-2 self-start flex items-center gap-2 px-3 py-1.5 rounded-[20px] text-[12px] font-bold transition-all duration-150 group-hover:gap-3"
              style={{ background: 'oklch(72% 0.14 82deg)', color: '#0B1120' }}
            >
              Baca Selengkapnya
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (variant === 'side') {
    return (
      <Link href={`/blog/${post.slug}`} className="block no-underline group">
        <div className="rounded-[16px] p-4 flex flex-col gap-2 transition-all duration-200 border border-cream-dark hover:border-transparent hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(11,17,32,0.10)] bg-warm-white">
          <CategoryBadge category={post.category} size="sm" />
          <h3
            className="font-bold text-navy leading-snug"
            style={{ fontSize: 14.5, lineHeight: 1.35 }}
          >
            {post.title}
          </h3>
          <div className="flex items-center gap-2 text-[11.5px] text-text-soft">
            <span>{dateStr}</span>
            <span>·</span>
            <ReadingTime minutes={post.readTime} className="text-[11.5px]" />
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="block no-underline group">
      <article className="rounded-[16px] p-5 flex flex-col gap-3 transition-all duration-200 border border-cream-dark hover:border-transparent hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(11,17,32,0.10)] bg-warm-white h-full">
        <div
          className="w-full rounded-[12px] flex items-center justify-center text-cream/30 text-[11px] font-bold uppercase tracking-wider"
          style={{ height: 140, background: '#162035' }}
        >
          {post.category}
        </div>

        <CategoryBadge category={post.category} size="sm" />

        <h3
          className="font-bold text-navy leading-snug flex-1"
          style={{ fontSize: 16, lineHeight: 1.38 }}
        >
          {post.title}
        </h3>

        <p className="text-[13px] text-text-mid line-clamp-2">{post.excerpt}</p>

        <div className="flex items-center justify-between mt-auto pt-1">
          <div className="flex items-center gap-2 text-[11.5px] text-text-soft">
            <span>{dateStr}</span>
            <span>·</span>
            <ReadingTime minutes={post.readTime} className="text-[11.5px]" />
          </div>
          <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150 bg-cream-dark group-hover:bg-navy">
            <svg
              width="13" height="13" viewBox="0 0 13 13" fill="none"
              className="text-text-mid group-hover:text-cream transition-colors"
            >
              <path d="M2 6.5h9M7.5 3l3.5 3.5L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}
