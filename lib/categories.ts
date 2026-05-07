export const CATEGORIES = ['Semua', 'Ekspor', 'Impor', 'UMKM', 'Bea Cukai'] as const
export type Category = (typeof CATEGORIES)[number]
export type ContentCategory = Exclude<Category, 'Semua'>

export const CATEGORY_COLORS: Record<ContentCategory, { text: string; bg: string }> = {
  'Ekspor':    { text: 'oklch(55% 0.18 145deg)', bg: 'oklch(93% 0.06 145deg)' },
  'Impor':     { text: 'oklch(50% 0.18 230deg)', bg: 'oklch(93% 0.06 230deg)' },
  'UMKM':      { text: 'oklch(55% 0.18 30deg)',  bg: 'oklch(93% 0.06 30deg)'  },
  'Bea Cukai': { text: 'oklch(50% 0.18 310deg)', bg: 'oklch(93% 0.06 310deg)' },
}

export const TICKER_ITEMS = [
  '🚢 Update logistik ekspor-impor Indonesia 2026',
  '📦 Regulasi bea cukai terbaru — wajib tahu',
  '💼 Strategi UKM masuk pasar ekspor global',
  '🌏 Peluang ekspor ke Timur Tengah & ASEAN',
  '📋 Panduan lengkap dokumen ekspor impor',
  '💰 Hemat biaya logistik hingga 40%',
  '🏆 M2B — Konsultan logistik terpercaya sejak 2014',
]

export const BLOG_STATS = [
  { value: '150+', label: 'Artikel Ekspor-Impor' },
  { value: '50K+', label: 'Pembaca per Bulan' },
  { value: '4.9★', label: 'Rating Google' },
  { value: '10+', label: 'Tahun Pengalaman' },
  { value: '500+', label: 'UKM Terbimbing' },
]
