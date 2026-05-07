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

export interface ArchiveGroup {
  year: number
  monthIndex: number
  posts: Post[]
}

export interface TOCItem {
  id: string
  text: string
  level: number
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
      .replace(/^#{1,6}\s.+$/gm, '')
      .replace(/[*`[\]()>_~|\\]/g, '')
      .replace(/!\[.*?\]/g, '')
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length > 30 && !l.startsWith(title.slice(0, 20)))
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

export function getAllTags(): { tag: string; count: number }[] {
  const posts = getAllPosts()
  const tagCount: Record<string, number> = {}
  posts.forEach(p => p.tags.forEach(t => {
    tagCount[t] = (tagCount[t] || 0) + 1
  }))
  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter(p =>
    p.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  )
}

export function getArchiveGroups(): ArchiveGroup[] {
  const posts = getAllPosts()
  const map = new Map<string, ArchiveGroup>()
  posts.forEach(p => {
    const d = new Date(p.date)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    if (!map.has(key)) {
      map.set(key, { year: d.getFullYear(), monthIndex: d.getMonth(), posts: [] })
    }
    map.get(key)!.posts.push(p)
  })
  return Array.from(map.values())
    .sort((a, b) => b.year - a.year || b.monthIndex - a.monthIndex)
}

export function extractTOC(content: string): TOCItem[] {
  const regex = /^(#{2,3})\s+(.+)$/gm
  const items: TOCItem[] = []
  let match
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].replace(/[*`[\]()_~]/g, '').trim()
    const id = text.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
    items.push({ id, text, level })
  }
  return items
}
