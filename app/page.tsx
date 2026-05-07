import { getAllPosts, getFeaturedPosts } from '@/lib/posts'
import HeroSection from '@/components/blog/HeroSection'
import ArticleGrid from '@/components/blog/ArticleGrid'
import StatsBanner from '@/components/ui/StatsBanner'
import AdLeaderboard from '@/components/ads/AdLeaderboard'
import AdSidebar from '@/components/ads/AdSidebar'

export default function HomePage() {
  const allPosts = getAllPosts()
  const featured = getFeaturedPosts(1)[0] || allPosts[0]
  const sidePosts = allPosts.filter(p => p.slug !== featured?.slug).slice(0, 3)

  if (!featured) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-20 text-center text-text-soft">
        <p className="text-xl font-semibold mb-2">Blog sedang disiapkan</p>
        <p>Artikel ekspor-impor akan segera hadir.</p>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <HeroSection featured={featured} sidePosts={sidePosts} />

      {/* Stats */}
      <StatsBanner />

      {/* Leaderboard ad */}
      <div className="bg-cream py-2">
        <div className="max-w-[1200px] mx-auto px-6">
          <AdLeaderboard />
        </div>
      </div>

      {/* Main content + sidebar */}
      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <div
          className="grid gap-10 lg:grid-cols-[1fr_300px]"
        >
          {/* Article grid */}
          <div>
            <h2 className="text-[22px] font-extrabold text-navy mb-6 tracking-tight">
              Semua Artikel
            </h2>
            <ArticleGrid posts={allPosts} />
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky" style={{ top: 88 }}>
              <AdSidebar />
            </div>
          </aside>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-navy py-14">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-[28px] font-extrabold text-cream mb-3 leading-tight">
            Butuh Bantuan Ekspor-Impor?
          </h2>
          <p className="text-cream/70 mb-8 max-w-lg mx-auto text-[15px]">
            Tim M2B siap memberikan konsultasi GRATIS dan solusi logistik yang tepat untuk bisnis Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/6281263027818"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-[20px] font-bold text-[15px] no-underline transition-all duration-150 hover:opacity-90"
              style={{ background: 'oklch(72% 0.14 82deg)', color: '#0B1120' }}
            >
              💬 Konsultasi via WhatsApp
            </a>
            <a
              href="https://ebook.m2b.co.id"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-[20px] font-bold text-[15px] no-underline border-2 border-cream/30 text-cream hover:border-cream/60 transition-all duration-150"
            >
              📚 Beli E-Book
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
