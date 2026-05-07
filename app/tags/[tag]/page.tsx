import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllTags, getPostsByTag } from '@/lib/posts'
import ArticleCard from '@/components/blog/ArticleCard'

interface Props {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag: encodeURIComponent(tag) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  return {
    title: `#${decoded} | Blog M2B`,
    description: `Artikel bertopik "${decoded}" — panduan ekspor-impor, logistik, dan bea cukai dari Blog M2B.`,
  }
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const decoded = decodeURIComponent(tag)
  const posts = getPostsByTag(decoded)

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/tags"
          className="inline-flex items-center gap-1.5 text-[12.5px] text-text-soft hover:text-navy no-underline mb-5 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 3L5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Semua Tags
        </Link>
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-[20px] text-[15px] font-bold"
            style={{ background: '#0B1120', color: 'oklch(72% 0.14 82deg)' }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1 6.5L6.5 1 12 6.5 6.5 12 1 6.5z" stroke="currentColor" strokeWidth="1.3"/>
              <circle cx="8.5" cy="4" r="1.2" fill="currentColor"/>
            </svg>
            #{decoded}
          </span>
          <h1 className="text-[28px] font-extrabold text-navy tracking-tight">
            {posts.length} artikel
          </h1>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-text-soft">
          <p className="text-lg font-semibold mb-2">Belum ada artikel dengan tag ini.</p>
          <Link href="/" className="text-navy font-semibold no-underline hover:underline">
            Kembali ke Beranda →
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
