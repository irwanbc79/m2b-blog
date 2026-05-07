import type { Metadata } from 'next'
import Link from 'next/link'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { getArchiveGroups, getAllPosts } from '@/lib/posts'
import CategoryBadge from '@/components/ui/CategoryBadge'

export const metadata: Metadata = {
  title: 'Arsip Artikel | Blog M2B',
  description: 'Semua artikel ekspor-impor, logistik, dan bea cukai di Blog M2B diurutkan berdasarkan tanggal terbit.',
}

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

export default function ArchivePage() {
  const groups = getArchiveGroups()
  const total = getAllPosts().length

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
        <h1 className="text-[34px] font-extrabold text-navy tracking-tight mb-2">Arsip Artikel</h1>
        <p className="text-text-mid text-[15px]">
          {total} artikel tersedia, diurutkan dari yang terbaru.
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-10">
        {groups.map(group => (
          <section key={`${group.year}-${group.monthIndex}`}>
            {/* Month heading */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-bold text-text-soft uppercase tracking-wider">
                  {group.year}
                </span>
                <span className="text-[20px] font-extrabold text-navy leading-tight">
                  {MONTH_NAMES[group.monthIndex]}
                </span>
              </div>
              <div className="flex-1 h-px bg-cream-dark" />
              <span className="text-[12px] text-text-soft font-medium shrink-0">
                {group.posts.length} artikel
              </span>
            </div>

            {/* Articles in this month */}
            <ul className="space-y-3 pl-2">
              {group.posts.map(post => (
                <li key={post.slug} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 group">
                  <time className="shrink-0 text-[12px] text-text-soft font-mono pt-0.5 w-[70px]">
                    {post.date ? format(new Date(post.date), 'd MMM', { locale: id }) : ''}
                  </time>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block text-[14.5px] font-semibold text-navy no-underline group-hover:text-text-mid transition-colors leading-snug"
                    >
                      {post.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <CategoryBadge category={post.category} size="sm" />
                      <span className="text-[11px] text-text-soft">{post.readTime} menit baca</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
