'use client'
import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = scrollHeight - clientHeight
      setProgress(total > 0 ? (scrollTop / total) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full z-[60] h-[3px] bg-transparent pointer-events-none">
      <div
        className="h-full transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%`, background: 'oklch(72% 0.14 82deg)' }}
      />
    </div>
  )
}
