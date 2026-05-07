import Link from 'next/link'

const CATEGORIES_LINKS = [
  { label: 'Ekspor', href: '/category/ekspor' },
  { label: 'Impor', href: '/category/impor' },
  { label: 'UMKM', href: '/category/umkm' },
  { label: 'Bea Cukai', href: '/category/bea-cukai' },
]

const POPULAR_LINKS = [
  { label: 'Cara Hemat Biaya Ekspor', href: '/blog/cara-hemat-biaya-ekspor-impor-strategi-logistik' },
  { label: 'Checklist Dokumen Ekspor', href: '/blog/checklist-dokumen-ekspor-umkm-timur-tengah' },
  { label: 'Panduan Bea Cukai 2026', href: '/blog/panduan-bea-cukai-2026' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-cream/70 mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="text-[22px] font-extrabold text-cream mb-3 font-heading">
              M<span style={{ color: 'oklch(72% 0.14 82deg)' }}>2</span>B Blog
            </div>
            <p className="text-[13px] leading-relaxed mb-4">
              Panduan ekspor-impor, logistik, dan bea cukai untuk UKM dan perusahaan Indonesia.
            </p>
            <a
              href="https://wa.me/6281263027818"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 rounded-[20px] text-[13px] font-bold no-underline"
              style={{ background: 'oklch(72% 0.14 82deg)', color: '#0B1120' }}
            >
              WhatsApp Kami
            </a>
          </div>

          {/* Kategori */}
          <div>
            <div className="text-[13px] font-bold text-cream uppercase tracking-wider mb-4">
              Kategori
            </div>
            <ul className="space-y-2">
              {CATEGORIES_LINKS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] hover:text-cream transition-colors no-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Jelajahi */}
          <div>
            <div className="text-[13px] font-bold text-cream uppercase tracking-wider mb-4">
              Jelajahi
            </div>
            <ul className="space-y-2">
              {POPULAR_LINKS.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] hover:text-cream transition-colors no-underline leading-snug block">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li><Link href="/archive" className="text-[13px] hover:text-cream transition-colors no-underline">📅 Arsip Artikel</Link></li>
              <li><Link href="/tags" className="text-[13px] hover:text-cream transition-colors no-underline">🏷 Semua Tags</Link></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <div className="text-[13px] font-bold text-cream uppercase tracking-wider mb-4">
              Kontak
            </div>
            <ul className="space-y-2 text-[13px]">
              <li>
                <a href="https://m2b.co.id" target="_blank" rel="noopener noreferrer" className="hover:text-cream no-underline">
                  🌐 m2b.co.id
                </a>
              </li>
              <li>
                <a href="https://wa.me/6281263027818" target="_blank" rel="noopener noreferrer" className="hover:text-cream no-underline">
                  💬 +62 812-6302-7818
                </a>
              </li>
              <li>
                <a href="https://ebook.m2b.co.id" target="_blank" rel="noopener noreferrer" className="hover:text-cream no-underline">
                  📚 E-Book Ekspor-Impor
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-[12px]">
          <span>© {new Date().getFullYear()} PT. Mora Multi Berkah. Hak Cipta Dilindungi.</span>
          <div className="flex gap-4">
            <Link href="/sitemap.xml" className="hover:text-cream no-underline">Sitemap</Link>
            <a href="https://m2b.co.id" className="hover:text-cream no-underline">Website Utama</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
