import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  description: string
  date: string
  category: string
  readTime: number
  author: string
  featured: boolean
  tags: string[]
  ogImage: string
  content: string
  excerpt: string
  status: string
}

function parsePost(slug: string): Post | null {
  try {
    const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
    const mdPath  = path.join(postsDirectory, `${slug}.md`)
    const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)
    const stats = readingTime(content)
    const title = data.title || ''
    const excerpt = content
      .replace(/^#{1,6}\s.+$/gm, '')       // hapus headings
      .replace(/[*`[\]()>_~|\\]/g, '')     // hapus markdown syntax
      .replace(/!\[.*?\]/g, '')             // hapus image syntax
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 30 && !l.startsWith(title.slice(0, 20)))  // skip baris yang duplikat judul
      .join(' ')
      .slice(0, 180)
      .trim() + '...'

    return {
      slug: data.slug || slug,
      title,
      description: data.description || excerpt,
      date: data.date || '',
      category: data.category || 'Umum',
      readTime: Math.ceil(stats.minutes),
      author: data.author || 'Tim M2B',
      featured: data.featured || false,
      tags: data.tags || [],
      ogImage: data.ogImage || '/images/default-og.jpg',
      content,
      excerpt,
      status: data.status || 'published',
    }
  } catch {
    return null
  }
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return []
  const files = fs.readdirSync(postsDirectory)
  return files
    .filter(f => f.endsWith('.mdx') || f.endsWith('.md'))
    .map(f => parsePost(f.replace(/\.(mdx|md)$/, '')))
    .filter((p): p is Post => p !== null && p.status === 'published')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | null {
  return parsePost(slug)
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(
    p => p.category.toLowerCase() === category.toLowerCase()
  )
}

export function getFeaturedPosts(limit = 4): Post[] {
  return getAllPosts().filter(p => p.featured).slice(0, limit)
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return getAllPosts()
    .filter(p => p.slug !== post.slug && (
      p.category === post.category ||
      p.tags.some(t => post.tags.includes(t))
    ))
    .slice(0, limit)
}
