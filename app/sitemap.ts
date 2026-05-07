import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { CATEGORIES } from '@/lib/categories'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.m2b.co.id'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const postEntries: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: post.featured ? 0.9 : 0.7,
  }))

  const categoryEntries: MetadataRoute.Sitemap = CATEGORIES
    .filter(c => c !== 'Semua')
    .map(cat => ({
      url: `${SITE_URL}/category/${cat.toLowerCase().replace(/ /g, '-')}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...categoryEntries,
    ...postEntries,
  ]
}
