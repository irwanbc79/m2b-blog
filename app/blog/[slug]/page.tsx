import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/posts'
import { getPostMetadata, getArticleJsonLd, getBreadcrumbJsonLd } from '@/lib/seo'
import CategoryBadge from '@/components/ui/CategoryBadge'
import ReadingTime from '@/components/ui/ReadingTime'
import AdInArticle from '@/components/ads/AdInArticle'
import ArticleCard from '@/components/blog/ArticleCard'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return getPostMetadata(post)
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const related = getRelatedPosts(post)
  const dateStr = post.date
    ? format(new Date(post.date), 'd MMMM yyyy', { locale: id })
    : ''

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.m2b.co.id'
  const articleSchema = getArticleJsonLd(post)
  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: 'Blog M2B', url: SITE_URL },
    { name: post.category, url: `${SITE_URL}/category/${post.category.toLowerCase().replace(/ /g, '-')}` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="max-w-[760px] mx-auto px-6 py-12">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[13px] text-text-mid hover:text-navy no-underline mb-8 font-semibold transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Kembali ke Blog
        </Link>

        {/* Header */}
        <div className="mb-8">
          <CategoryBadge category={post.category} />
          <h1
            className="font-extrabold text-navy mt-3 mb-4"
            style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.5px' }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-[12.5px] text-text-soft">
            <span>{post.author}</span>
            <span>·</span>
            <span>{dateStr}</span>
            <span>·</span>
            <ReadingTime minutes={post.readTime} />
          </div>
        </div>

        {/* Hero image placeholder */}
        <div
          className="w-full rounded-[18px] mb-8 flex items-center justify-center text-cream/30 font-bold text-sm uppercase tracking-widest"
          style={{ height: 340, background: '#162035' }}
        >
          {post.category}
        </div>

        {/* Ad — above content */}
        <AdInArticle slot="top" />

        {/* Article body */}
        <div className="prose-m2b">
          <MDXRemote source={post.content} />
        </div>

        {/* Ad — mid content */}
        <AdInArticle slot="mid" />

        {/* WA CTA */}
        <div
          className="rounded-[16px] p-6 my-10 text-center"
          style={{ background: '#0B1120' }}
        >
          <p
            className="text-[15px] font-bold text-cream mb-1"
          >
            Ada pertanyaan tentang ekspor-impor?
          </p>
          <p className="text-cream/60 text-[13px] mb-5">
            Konsultasi GRATIS dengan tim ahli M2B — langsung via WhatsApp.
          </p>
          <a
            href="https://wa.me/6281263027818"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 rounded-[20px] font-bold text-[14px] no-underline"
            style={{ background: 'oklch(72% 0.14 82deg)', color: '#0B1120' }}
          >
            💬 Hubungi M2B
          </a>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-[20px] font-extrabold text-navy mb-6">Artikel Terkait</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map(p => (
                <ArticleCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        )}

        {/* Back bottom */}
        <Link
          href="/"
          className="mt-12 inline-flex items-center gap-2 text-[13px] text-text-mid hover:text-navy no-underline font-semibold transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Kembali ke Blog
        </Link>
      </article>
    </>
  )
}
