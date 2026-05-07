import ArticleCard from './ArticleCard'
import type { Post } from '@/lib/posts'

interface Props {
  featured: Post
  sidePosts: Post[]
}

export default function HeroSection({ featured, sidePosts }: Props) {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-14">
      <div
        className="grid gap-8"
        style={{ gridTemplateColumns: '1fr 380px' }}
      >
        {/* Featured large card */}
        <ArticleCard post={featured} variant="featured" />

        {/* Side stack */}
        <div className="flex flex-col gap-4">
          {sidePosts.slice(0, 3).map(post => (
            <ArticleCard key={post.slug} post={post} variant="side" />
          ))}
        </div>
      </div>
    </section>
  )
}
