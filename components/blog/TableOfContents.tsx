'use client'
import { useEffect, useState } from 'react'
import type { TOCItem } from '@/lib/posts'

interface Props {
  items: TOCItem[]
}

export default function TableOfContents({ items }: Props) {
  const [active, setActive] = useState<string>('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (items.length === 0) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-80px 0px -70% 0px' }
    )
    items.forEach(item => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [items])

  if (items.length < 2) return null

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <nav className="hidden xl:block sticky top-[88px] w-[220px] shrink-0">
        <p className="text-[11px] font-bold text-text-soft uppercase tracking-wider mb-3">
          Daftar Isi
        </p>
        <ul className="space-y-1">
          {items.map(item => (
            <li key={item.id} style={{ paddingLeft: item.level === 3 ? 12 : 0 }}>
              <a
                href={`#${item.id}`}
                className={`block text-[12.5px] leading-snug py-1 px-2 rounded-[6px] no-underline transition-all duration-150 ${
                  active === item.id
                    ? 'text-navy font-semibold bg-cream-dark'
                    : 'text-text-soft hover:text-navy hover:bg-cream'
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: collapsible */}
      <div className="xl:hidden mb-8 border border-cream-dark rounded-[12px] overflow-hidden">
        <button
          onClick={() => setOpen(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3 bg-cream text-[13px] font-bold text-navy"
        >
          <span className="flex items-center gap-2">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 3h11M2 7h7M2 11h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Daftar Isi ({items.length} bagian)
          </span>
          <svg
            width="14" height="14" viewBox="0 0 14 14" fill="none"
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          >
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {open && (
          <ul className="px-4 py-3 space-y-1 bg-warm-white">
            {items.map(item => (
              <li key={item.id} style={{ paddingLeft: item.level === 3 ? 12 : 0 }}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="block text-[13px] py-1 text-text-mid hover:text-navy no-underline transition-colors"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
