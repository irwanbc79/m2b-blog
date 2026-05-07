import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostsByCategory, getAllPosts } from '@/lib/posts'
import ArticleGrid from '@/components/blog/ArticleGrid'
import AdSidebar from '@/components/ads/AdSidebar'
import { CATEGORIES, type ContentCategory } from '@/lib/categories'

interface Props {
  params: Promise<{ category: string }>
}

function slugToCategory(slug: string): ContentCategory | null {
  const map: Record<string, ContentCategory> = {
    'ekspor':    'Ekspor',
    'impor':     'Impor',
    'umkm':      'UMKM',
    'bea-cukai': 'Bea Cukai',
  }
  return map[slug] || null
}

export async function generateStaticParams() {
  return CATEGORIES
    .filter(c => c !== 'Semua')
    .map(c => ({ category: c.toLowerCase().replace(/ /g, '-') }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params
  const cat = slugToCategory(slug)
  if (!cat) return {}
  return {
    title: `Artikel ${cat} | Blog M2B`,
    description: `Kumpulan artikel tentang ${cat} dari tim ahli M2B — panduan praktis untuk UKM dan perusahaan Indonesia.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params
  const cat = slugToCategory(slug)
  if (!cat) notFound()

  const posts = getPostsByCategory(cat)
  const allPosts = getAllPosts()

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="text-[12px] text-text-soft uppercase tracking-wider mb-2">Kategori</div>
        <h1 className="text-[32px] font-extrabold text-navy mb-2">{cat}</h1>
        <p className="text-text-mid">
          {posts.length} artikel tentang {cat}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <div>
          <ArticleGrid posts={posts.length > 0 ? posts : allPosts} initialCategory={posts.length > 0 ? cat : 'Semua'} />
        </div>

        <aside className="hidden lg:block">
          <div className="sticky" style={{ top: 88 }}>
            <AdSidebar />
          </div>
        </aside>
      </div>
    </div>
  )
}
