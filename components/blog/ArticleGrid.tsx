'use client'
import { useState, useMemo } from 'react'
import ArticleCard from './ArticleCard'
import AdInFeed from '@/components/ads/AdInFeed'
import type { Post } from '@/lib/posts'
import { CATEGORIES } from '@/lib/categories'

const PAGE_SIZE = 9

interface Props {
  posts: Post[]
  initialCategory?: string
}

export default function ArticleGrid({ posts, initialCategory = 'Semua' }: Props) {
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (activeCategory === 'Semua') return posts
    return posts.filter(p => p.category === activeCategory)
  }, [posts, activeCategory])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice(0, page * PAGE_SIZE)

  function selectCategory(cat: string) {
    setActiveCategory(cat)
    setPage(1)
  }

  return (
    <div>
      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => selectCategory(cat)}
            className={`px-4 py-1.5 rounded-[20px] text-[13px] font-semibold transition-all duration-150 border ${
              activeCategory === cat
                ? 'bg-navy text-cream border-navy'
                : 'bg-transparent text-text-mid border-cream-dark hover:border-navy/30 hover:text-navy'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article grid with in-feed ads */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-text-soft">
          Belum ada artikel di kategori ini.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((post, i) => (
              <>
                <ArticleCard key={post.slug} post={post} />
                {/* In-feed ad every 3 articles (after index 2, 5, 8...) */}
                {(i + 1) % 3 === 0 && i < paginated.length - 1 && (
                  <AdInFeed key={`ad-${i}`} />
                )}
              </>
            ))}
          </div>

          {page < totalPages && (
            <div className="text-center mt-10">
              <button
                onClick={() => setPage(p => p + 1)}
                className="px-6 py-2.5 rounded-[20px] border-2 border-navy text-navy font-semibold text-[14px] hover:bg-navy hover:text-cream transition-all duration-150"
              >
                Muat Lebih Banyak
              </button>
              <p className="text-[12px] text-text-soft mt-2">
                Menampilkan {paginated.length} dari {filtered.length} artikel
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
