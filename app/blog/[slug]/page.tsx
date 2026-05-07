import { notFound } from 'next/navigation'
import Link from 'next/link'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug, getRelatedPosts, extractTOC } from '@/lib/posts'
import { getPostMetadata, getArticleJsonLd, getBreadcrumbJsonLd } from '@/lib/seo'
import { getMDXComponents } from '@/lib/mdx-components'
import CategoryBadge from '@/components/ui/CategoryBadge'
import ReadingTime from '@/components/ui/ReadingTime'
import AdInArticle from '@/components/ads/AdInArticle'
import AdSidebar from '@/components/ads/AdSidebar'
import ArticleCard from '@/components/blog/ArticleCard'
import TableOfContents from '@/components/blog/TableOfContents'
import ShareButtons from '@/components/blog/ShareButtons'
import AuthorBox from '@/components/blog/AuthorBox'
import Comments from '@/components/blog/Comments'
import ReadingProgress from '@/components/blog/ReadingProgress'

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
  const toc = extractTOC(post.content)
  const dateStr = post.date
    ? format(new Date(post.date), 'd MMMM yyyy', { locale: id })
    : ''

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.m2b.co.id'
  const articleUrl = `${SITE_URL}/blog/${post.slug}`

  const articleSchema = getArticleJsonLd(post)
  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: 'Blog M2B', url: SITE_URL },
    { name: post.category, url: `${SITE_URL}/category/${post.category.toLowerCase().replace(/ /g, '-')}` },
    { name: post.title, url: articleUrl },
  ])

  return (
    <>
      <ReadingProgress />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-[1120px] mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[12px] text-text-soft mb-8 flex-wrap">
          <Link href="/" className="hover:text-navy no-underline transition-colors">Blog M2B</Link>
          <span>/</span>
          <Link
            href={`/category/${post.category.toLowerCase().replace(/ /g, '-')}`}
            className="hover:text-navy no-underline transition-colors"
          >
            {post.category}
          </Link>
          <span>/</span>
          <span className="text-text-main line-clamp-1">{post.title}</span>
        </nav>

        {/* Article header — full width, centered */}
        <header className="max-w-[760px] mx-auto mb-8">
          <CategoryBadge category={post.category} />
          <h1
            className="font-extrabold text-navy mt-3 mb-5 leading-tight"
            style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-0.5px' }}
          >
            {post.title}
          </h1>

          <p className="text-[16px] text-text-mid leading-relaxed mb-5">{post.description}</p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 text-[12.5px] text-text-soft pb-5 border-b border-cream-dark">
            <div className="flex items-center gap-1.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-cream text-[11px] font-bold shrink-0"
                style={{ background: '#162035' }}
              >
                {post.author.charAt(0)}
              </div>
              <span className="font-medium text-text-main">{post.author}</span>
            </div>
            <span>·</span>
            <time dateTime={post.date}>{dateStr}</time>
            <span>·</span>
            <ReadingTime minutes={post.readTime} />
            {post.tags.length > 0 && (
              <>
                <span>·</span>
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map(tag => (
                    <Link
                      key={tag}
                      href={`/tags/${encodeURIComponent(tag)}`}
                      className="px-2 py-0.5 rounded-[10px] text-[11px] font-medium no-underline bg-cream-dark text-text-mid hover:bg-navy hover:text-cream transition-all"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>

        {/* Hero image */}
        <div className="max-w-[760px] mx-auto mb-8">
          <div
            className="w-full rounded-[18px] flex items-center justify-center relative overflow-hidden"
            style={{ height: 300, background: '#0B1120' }}
          >
            <div
              className="absolute inset-0 opacity-20"
              style={{ background: 'radial-gradient(ellipse at 30% 50%, oklch(72% 0.14 82deg), transparent 65%)' }}
            />
            <span className="relative text-cream/30 font-bold text-sm uppercase tracking-[4px]">
              {post.category}
            </span>
          </div>
        </div>

        {/* TOC mobile — before content */}
        <div className="max-w-[760px] mx-auto">
          <TableOfContents items={toc} />
        </div>

        {/* Two-column: content + TOC sidebar */}
        <div className="flex gap-14 items-start">
          {/* Main content */}
          <article className="min-w-0 flex-1 max-w-[760px] mx-auto">
            {/* Ad above content */}
            <AdInArticle slot="top" />

            {/* Article body */}
            <div className="prose-m2b">
              <MDXRemote source={post.content} components={getMDXComponents()} />
            </div>

            {/* Ad mid content */}
            <AdInArticle slot="mid" />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-8 pt-6 border-t border-cream-dark">
                <span className="text-[12px] font-bold text-text-soft uppercase tracking-wider">Tags:</span>
                {post.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="px-3 py-1 rounded-[20px] text-[12px] font-medium no-underline bg-cream border border-cream-dark text-text-mid hover:bg-navy hover:text-cream hover:border-navy transition-all duration-150"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Share buttons */}
            <ShareButtons url={articleUrl} title={post.title} />

            {/* Author box */}
            <AuthorBox author={post.author} date={dateStr} readTime={post.readTime} />

            {/* WA CTA */}
            <div
              className="rounded-[16px] p-6 my-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              style={{ background: '#0B1120' }}
            >
              <div>
                <p className="text-[15px] font-bold text-cream mb-1">Ada pertanyaan tentang ekspor-impor?</p>
                <p className="text-cream/60 text-[13px]">Konsultasi GRATIS dengan tim ahli M2B.</p>
              </div>
              <a
                href="https://wa.me/6281263027818"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-[20px] font-bold text-[14px] no-underline hover:opacity-90 transition-opacity"
                style={{ background: 'oklch(72% 0.14 82deg)', color: '#0B1120' }}
              >
                💬 Hubungi M2B
              </a>
            </div>

            {/* Comments */}
            <Comments slug={post.slug} />
          </article>

          {/* TOC + Ad sidebar — desktop only */}
          <aside className="hidden xl:flex flex-col gap-6 w-[220px] shrink-0 sticky top-[88px]">
            <TableOfContents items={toc} />
            <div className="mt-4">
              <AdSidebar />
            </div>
          </aside>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-cream-dark">
            <h2 className="text-[22px] font-extrabold text-navy mb-6 tracking-tight">Artikel Terkait</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map(p => (
                <ArticleCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}

        {/* Back */}
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-text-mid hover:text-navy no-underline font-semibold transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Kembali ke Blog
          </Link>
        </div>
      </div>
    </>
  )
}
