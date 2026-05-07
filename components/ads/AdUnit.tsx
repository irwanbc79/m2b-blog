'use client'
import { useEffect, useRef } from 'react'

interface AdUnitProps {
  slot: string
  format?: 'auto' | 'rectangle' | 'leaderboard' | 'vertical' | 'fluid'
  style?: React.CSSProperties
  className?: string
  fullWidthResponsive?: boolean
}

export default function AdUnit({
  slot,
  format = 'auto',
  style,
  className = '',
  fullWidthResponsive = true,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null)
  const pushed = useRef(false)

  useEffect(() => {
    if (pushed.current) return
    pushed.current = true
    try {
      // @ts-expect-error adsbygoogle is injected by Google
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {}
  }, [])

  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-5616961797801657'

  return (
    <div className={className} style={style}>
      <p className="text-[10px] text-center text-text-soft mb-1">Iklan</p>
      <ins
        ref={adRef}
        className="adsbygoogle block"
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  )
}
