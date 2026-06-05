export const CATEGORIES = ['Semua', 'Ekspor', 'Impor', 'UMKM', 'Bea Cukai'] as const
export type Category = (typeof CATEGORIES)[number]
export type ContentCategory = Exclude<Category, 'Semua'>

export const CATEGORY_COLORS: Record<ContentCategory, { text: string; bg: string }> = {
  'Ekspor':    { text: 'oklch(55% 0.18 145deg)', bg: 'oklch(93% 0.06 145deg)' },
  'Impor':     { text: 'oklch(50% 0.18 230deg)', bg: 'oklch(93% 0.06 230deg)' },
  'UMKM':      { text: 'oklch(55% 0.18 30deg)',  bg: 'oklch(93% 0.06 30deg)'  },
  'Bea Cukai': { text: 'oklch(50% 0.18 310deg)', bg: 'oklch(93% 0.06 310deg)' },
}

export interface TickerItem {
  text: string
  cta?: string
  href?: string
  variant?: 'promo' | 'info'
}

export const TICKER_ITEMS: TickerItem[] = [
  {
    text: '🚀 GRATIS! E-Book Panduan Ekspor Impor Lengkap untuk UKM Indonesia.',
    cta: 'Ambil Sekarang →',
    href: 'https://wa.me/6281263027818?text=Halo%20M2B%2C%20saya%20mau%20E-Book%20panduan%20ekspor%20gratis',
    variant: 'promo',
  },
  {
    text: '📦 Update regulasi bea cukai 2026 — pastikan bisnis Anda tetap compliant.',
    variant: 'info',
  },
  {
    text: '🧮 Toolkit Interaktif: Kalkulator CIF + Panduan Incoterms + Checklist Dokumen.',
    cta: 'Akses Gratis →',
    href: 'https://wa.me/6281263027818?text=Halo%20M2B%2C%20minta%20toolkit%20ekspor%20gratis',
    variant: 'promo',
  },
  {
    text: '🌏 Peluang ekspor ke Timur Tengah & ASEAN 2026 — baca analisis terbaru.',
    variant: 'info',
  },
  {
    text: '💬 Struggling with export-import paperwork & compliance? Konsultasi GRATIS!',
    cta: 'Chat WA Sekarang →',
    href: 'https://wa.me/6281263027818',
    variant: 'promo',
  },
  {
    text: '🏆 M2B — Konsultan logistik & kepabeanan terpercaya sejak 2014.',
    variant: 'info',
  },
]

export const BLOG_STATS = [
  { value: '150+', label: 'Artikel Ekspor-Impor' },
  { value: '50K+', label: 'Pembaca per Bulan' },
  { value: '4.9★', label: 'Rating Google' },
  { value: '10+', label: 'Tahun Pengalaman' },
  { value: '500+', label: 'UKM Terbimbing' },
]
