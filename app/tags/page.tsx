import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllTags, getAllPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Semua Tags | Blog M2B',
  description: 'Jelajahi artikel ekspor-impor, logistik, dan bea cukai berdasarkan topik dan kata kunci di Blog M2B.',
}

export default function TagsPage() {
  const tags = getAllTags()
  const total = getAllPosts().length
  const maxCount = tags[0]?.count || 1

  return (
    <div className="max-w-[860px] mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <Link href="/" className="inline-flex items-center gap-1.5 text-[12.5px] text-text-soft hover:text-navy no-underline mb-6 transition-colors">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Kembali
        </Link>
        <h1 className="text-[34px] font-extrabold text-navy tracking-tight mb-2">Tags</h1>
        <p className="text-text-mid text-[15px]">{tags.length} tag dari {total} artikel.</p>
      </div>

      {/* Tag cloud — size by frequency */}
      <div className="flex flex-wrap gap-3">
        {tags.map(({ tag, count }) => {
          const ratio = count / maxCount
          const size = 11 + ratio * 10
          const weight = ratio > 0.5 ? 700 : 500
          const opacity = 0.5 + ratio * 0.5
          return (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[20px] no-underline transition-all duration-150 border border-cream-dark hover:bg-navy hover:text-cream hover:border-navy bg-warm-white"
              style={{ fontSize: size, fontWeight: weight, color: `rgba(26,31,46,${opacity})` }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="shrink-0 opacity-50">
                <path d="M1 5.5L5.5 1 10 5.5 5.5 10 1 5.5z" stroke="currentColor" strokeWidth="1.2"/>
                <circle cx="7" cy="3.5" r="1" fill="currentColor"/>
              </svg>
              {tag}
              <span className="text-[10px] font-normal opacity-50 ml-0.5">{count}</span>
            </Link>
          )
        })}
      </div>

      {/* Divider */}
      <div className="mt-12 pt-8 border-t border-cream-dark">
        <p className="text-[13px] text-text-soft text-center">
          Tidak menemukan topik yang dicari?{' '}
          <Link href="/archive" className="text-navy font-semibold no-underline hover:underline">
            Lihat Semua Arsip →
          </Link>
        </p>
      </div>
    </div>
  )
}
