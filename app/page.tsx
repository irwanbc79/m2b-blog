import { getAllPosts, getFeaturedPosts } from '@/lib/posts'
import HeroSection from '@/components/blog/HeroSection'
import ArticleGrid from '@/components/blog/ArticleGrid'
import StatsBanner from '@/components/ui/StatsBanner'
import AdLeaderboard from '@/components/ads/AdLeaderboard'
import AdSidebar from '@/components/ads/AdSidebar'
import SidebarRecent from '@/components/sidebar/SidebarRecent'
import SidebarCategories from '@/components/sidebar/SidebarCategories'
import SidebarTags from '@/components/sidebar/SidebarTags'

export default function HomePage() {
  const allPosts = getAllPosts()
  const featured = getFeaturedPosts(1)[0] || allPosts[0]
  const sidePosts = allPosts.filter(p => p.slug !== featured?.slug).slice(0, 3)
  const recentPosts = allPosts.slice(0, 5)

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
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          {/* Article grid */}
          <div>
            <h2 className="text-[22px] font-extrabold text-navy mb-6 tracking-tight">
              Semua Artikel
            </h2>
            <ArticleGrid posts={allPosts} />
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky flex flex-col gap-0" style={{ top: 88 }}>
              {/* Ad */}
              <div className="mb-6">
                <AdSidebar />
              </div>

              {/* Divider */}
              <div className="h-px bg-cream-dark mb-6" />

              {/* Recent posts */}
              <SidebarRecent posts={recentPosts} />

              <div className="h-px bg-cream-dark mb-6" />

              {/* Categories */}
              <SidebarCategories />

              <div className="h-px bg-cream-dark mb-6" />

              {/* Tags cloud */}
              <SidebarTags />

              <div className="h-px bg-cream-dark mb-6" />

              {/* Archive + Tags links */}
              <div className="flex flex-col gap-2">
                <a
                  href="/archive"
                  className="flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] font-medium text-text-main hover:bg-cream-dark no-underline transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M4 1v2M10 1v2M1 6h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    Arsip Artikel
                  </span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a
                  href="/tags"
                  className="flex items-center justify-between px-3 py-2 rounded-[8px] text-[13px] font-medium text-text-main hover:bg-cream-dark no-underline transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 7L7 1l6 6-6 6-6-6z" stroke="currentColor" strokeWidth="1.2"/>
                      <circle cx="9" cy="4.5" r="1.2" fill="currentColor"/>
                    </svg>
                    Semua Tags
                  </span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
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
