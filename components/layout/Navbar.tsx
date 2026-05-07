'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { CATEGORIES } from '@/lib/categories'

const NAV_CATS = CATEGORIES.filter(c => c !== 'Semua')

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 bg-warm-white border-b border-cream-dark"
      style={{ height: 64, boxShadow: 'var(--shadow-navbar)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-1 no-underline">
          <span className="text-[22px] font-extrabold tracking-tight text-navy font-heading">
            M<span style={{ color: 'oklch(72% 0.14 82deg)' }}>2</span>B
          </span>
          <span className="text-[13px] font-semibold text-text-mid ml-2 hidden sm:block">
            Blog
          </span>
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {['Semua', ...NAV_CATS].map((cat) => {
            const href = cat === 'Semua' ? '/' : `/category/${cat.toLowerCase().replace(/ /g, '-')}`
            const active = cat === 'Semua' ? pathname === '/' : pathname.startsWith(`/category/${cat.toLowerCase().replace(/ /g, '-')}`)
            return (
              <Link
                key={cat}
                href={href}
                className={`px-3 py-1 rounded-[20px] text-[13px] font-semibold transition-all duration-150 no-underline ${
                  active
                    ? 'bg-navy text-cream'
                    : 'text-text-mid hover:bg-cream-dark hover:text-navy'
                }`}
              >
                {cat}
              </Link>
            )
          })}
          <span className="w-px h-4 bg-cream-dark mx-1" />
          {[
            { label: 'Arsip', href: '/archive' },
            { label: 'Tags', href: '/tags' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1 rounded-[20px] text-[13px] font-semibold transition-all duration-150 no-underline ${
                pathname === item.href
                  ? 'bg-navy text-cream'
                  : 'text-text-mid hover:bg-cream-dark hover:text-navy'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA — desktop */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href="https://wa.me/6281263027818"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-[20px] text-[13px] font-bold no-underline transition-all duration-150"
            style={{
              background: 'oklch(72% 0.14 82deg)',
              color: '#0B1120',
            }}
          >
            Konsultasi Gratis
          </a>
        </div>

        {/* Hamburger — mobile */}
        <button
          className="lg:hidden p-2 text-navy"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {menuOpen ? (
              <>
                <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-warm-white border-t border-cream-dark px-6 py-4 flex flex-col gap-2">
          {['Semua', ...NAV_CATS].map((cat) => {
            const href = cat === 'Semua' ? '/' : `/category/${cat.toLowerCase().replace(/ /g, '-')}`
            return (
              <Link key={cat} href={href} onClick={() => setMenuOpen(false)}
                className="py-2 text-[14px] font-semibold text-text-main hover:text-navy no-underline">
                {cat}
              </Link>
            )
          })}
          <div className="h-px bg-cream-dark my-1" />
          <Link href="/archive" onClick={() => setMenuOpen(false)}
            className="py-2 text-[14px] font-semibold text-text-main hover:text-navy no-underline">
            Arsip Artikel
          </Link>
          <Link href="/tags" onClick={() => setMenuOpen(false)}
            className="py-2 text-[14px] font-semibold text-text-main hover:text-navy no-underline">
            Semua Tags
          </Link>
          <a
            href="https://wa.me/6281263027818"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-4 py-2 rounded-[20px] text-center text-[13px] font-bold no-underline"
            style={{ background: 'oklch(72% 0.14 82deg)', color: '#0B1120' }}
          >
            Konsultasi Gratis
          </a>
        </div>
      )}
    </header>
  )
}
