import type { Metadata } from 'next'
import type { Post } from './posts'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.m2b.co.id'
const SITE_NAME = 'Blog M2B'
const DEFAULT_OG = '/images/og-default.jpg'

export function getBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} — Logistik & Ekspor-Impor Indonesia`,
      template: `%s | ${SITE_NAME}`,
    },
    description: 'Panduan lengkap ekspor impor, logistik, dan bea cukai untuk UKM dan perusahaan Indonesia.',
    openGraph: {
      type: 'website',
      locale: 'id_ID',
      url: SITE_URL,
      siteName: SITE_NAME,
      images: [{ url: DEFAULT_OG, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' },
    },
    alternates: {
      canonical: SITE_URL,
      types: { 'application/rss+xml': `${SITE_URL}/feed.xml` },
    },
  }
}

export function getPostMetadata(post: Post): Metadata {
  const url = `${SITE_URL}/blog/${post.slug}`
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.ogImage],
    },
    alternates: { canonical: url },
  }
}

export function getArticleJsonLd(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Organization', name: 'M2B', url: 'https://m2b.co.id' },
    publisher: {
      '@type': 'Organization',
      name: 'M2B',
      url: 'https://m2b.co.id',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.png` },
    },
    datePublished: post.date,
    dateModified: post.date,
    image: post.ogImage,
    url: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.tags.join(', '),
    articleSection: post.category,
    inLanguage: 'id-ID',
  }
}

export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
