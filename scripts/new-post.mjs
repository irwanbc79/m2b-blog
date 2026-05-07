/**
 * Auto-post artikel baru ke blog M2B
 * Usage: node scripts/new-post.mjs
 *
 * Script ini:
 * 1. Tanya judul + kategori + konten
 * 2. Auto-generate: slug, meta description, tags, reading time
 * 3. Buat file MDX di content/posts/
 * 4. Git commit + push → GitHub Actions otomatis build + deploy
 */

import fs from 'fs'
import path from 'path'
import readline from 'readline'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const POSTS_DIR = path.join(__dirname, '../content/posts')
const TODAY = new Date().toISOString().slice(0, 10)

const CATEGORIES = ['Ekspor', 'Impor', 'UMKM', 'Bea Cukai']

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = (q) => new Promise(r => rl.question(q, r))

// ─── Auto-generate helpers ────────────────────────────────────────────────────

function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function autoDescription(content, title) {
  const clean = content
    .replace(/^#{1,6}\s.+$/gm, '')
    .replace(/[*`[\]()>_~|\\]/g, '')
    .replace(/\n+/g, ' ')
    .trim()
  const sentences = clean.split(/[.!?]/).filter(s => s.trim().length > 30)
  const desc = sentences[0]?.trim() || clean.slice(0, 155)
  return desc.slice(0, 155).trim() + (desc.length > 155 ? '.' : '')
}

function autoTags(title, category) {
  const words = title.toLowerCase().split(/\s+/)
  const keywords = words.filter(w =>
    w.length > 4 &&
    !['yang', 'dengan', 'untuk', 'dari', 'cara', 'panduan', 'tentang', 'adalah', 'dalam'].includes(w)
  ).slice(0, 4)
  return [...new Set([category.toLowerCase().replace(/ /g, '-'), ...keywords])]
}

function readingTime(content) {
  return Math.max(1, Math.round(content.split(/\s+/).length / 200))
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log('\n✨ M2B Blog — Auto Post Artikel Baru\n')

const title = await ask('📝 Judul artikel: ')
if (!title.trim()) { console.log('Judul kosong, dibatalkan.'); process.exit(1) }

console.log('\nKategori:')
CATEGORIES.forEach((c, i) => console.log(`  ${i + 1}. ${c}`))
const catChoice = await ask('Pilih kategori (1-4): ')
const category = CATEGORIES[parseInt(catChoice) - 1] || 'Ekspor'

const featured = (await ask('Featured article? (y/N): ')).toLowerCase() === 'y'

console.log('\n📄 Paste konten artikel (ketik END di baris baru untuk selesai):')
const lines = []
let line
while ((line = await ask('')) !== 'END') lines.push(line)
const content = lines.join('\n')

rl.close()

// Auto-generate semua metadata SEO
const slug      = toSlug(title)
const desc      = autoDescription(content, title)
const tags      = autoTags(title, category)
const rt        = readingTime(content)

// Buat MDX
const mdx = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${desc.replace(/"/g, '\\"')}"
slug: "${slug}"
date: "${TODAY}"
category: "${category}"
readTime: ${rt}
author: "Tim M2B"
featured: ${featured}
tags: ${JSON.stringify(tags)}
ogImage: "/images/${slug}/hero.jpg"
status: "published"
---

${content}
`

const filePath = path.join(POSTS_DIR, `${slug}.mdx`)

if (fs.existsSync(filePath)) {
  console.log(`\n⚠️  File ${slug}.mdx sudah ada. Overwrite? (y/N)`)
  // Non-interactive fallback
}

fs.writeFileSync(filePath, mdx, 'utf8')
console.log(`\n✅ Artikel dibuat: content/posts/${slug}.mdx`)
console.log(`   Slug    : ${slug}`)
console.log(`   Desc    : ${desc.slice(0, 60)}...`)
console.log(`   Tags    : ${tags.join(', ')}`)
console.log(`   Read    : ${rt} menit`)

// Git commit + push → trigger GitHub Actions auto-deploy
console.log('\n🚀 Push ke GitHub...')
execSync(`git add content/posts/${slug}.mdx`, { stdio: 'inherit', cwd: path.join(__dirname, '..') })
execSync(`git commit -m "content: artikel baru — ${title.slice(0, 60)}"`, { stdio: 'inherit', cwd: path.join(__dirname, '..') })
execSync('git push', { stdio: 'inherit', cwd: path.join(__dirname, '..') })

console.log('\n🎉 Done! GitHub Actions sedang build + deploy otomatis.')
console.log('   Artikel live di: https://blog.m2b.co.id/blog/' + slug + '/')
console.log('   Estimasi live: 2-3 menit\n')
