# M2B Blog — Next.js

## Project
Blog ekspor-impor & logistik untuk PT. Mora Multi Berkah (m2b.co.id)
URL: https://blog.m2b.co.id
Framework: Next.js 16 + TypeScript + Tailwind CSS v4
Content: MDX files di content/posts/

## Stack
- Next.js 16 (App Router)
- Tailwind CSS v4 (config via @theme in globals.css — TIDAK ADA tailwind.config.js)
- next-mdx-remote/rsc untuk render MDX (server component)
- gray-matter + reading-time untuk parse frontmatter
- next-sitemap untuk sitemap otomatis

## Deploy
- Platform: Vercel (gratis)
- Domain: blog.m2b.co.id (CNAME → cname.vercel-dns.com)
- GitHub: https://github.com/irwanbc79/m2b-blog
- Auto-deploy: setiap push ke branch main

## AdSense
- Publisher ID: ca-pub-5616961797801657
- Slots yang perlu didaftarkan di AdSense dashboard:
  - SLOT_A_LEADERBOARD (728×90, bawah hero)
  - SLOT_B_INARTICLE_TOP (580×250, atas konten artikel)
  - SLOT_C_INARTICLE_MID (580×250, tengah artikel)
  - SLOT_D_SIDEBAR (300×600, sticky sidebar)
  - SLOT_E_INFEED (fluid, tiap 3 kartu)

## Design Tokens
Semua di app/globals.css dalam @theme block:
- Navy: #0B1120 | Cream: #F8F5EE | Gold: oklch(72% 0.14 82deg)
- Font Heading: Plus Jakarta Sans | Font Body: Lora

## Env Variables
- NEXT_PUBLIC_SITE_URL=https://blog.m2b.co.id
- NEXT_PUBLIC_ADSENSE_ID=ca-pub-5616961797801657
- NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX ← isi dengan GA4 ID yang benar

## Menambah Artikel
Buat file baru: content/posts/nama-slug.mdx
Frontmatter wajib: title, description, slug, date, category, author, featured, tags, ogImage, status

## Kategori Valid
Ekspor | Impor | UMKM | Bea Cukai

## Rules
- JANGAN ubah tailwind.config.js (tidak ada — Tailwind v4 config di globals.css)
- URL slug harus sama dengan WordPress lama untuk SEO preservation
- Test lokal: npm run dev → http://localhost:3000
