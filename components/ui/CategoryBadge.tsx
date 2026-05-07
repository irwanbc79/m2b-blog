import { CATEGORY_COLORS, type ContentCategory } from '@/lib/categories'

interface Props {
  category: string
  size?: 'sm' | 'md'
}

export default function CategoryBadge({ category, size = 'md' }: Props) {
  const colors = CATEGORY_COLORS[category as ContentCategory]
  const style = colors
    ? { color: colors.text, backgroundColor: colors.bg }
    : { color: '#4A5270', backgroundColor: '#EDE8DF' }

  const cls = size === 'sm'
    ? 'text-[10px] px-2 py-0.5 rounded-[10px]'
    : 'text-[11px] px-3 py-1 rounded-[12px]'

  return (
    <span
      className={`${cls} font-bold uppercase tracking-[0.08em] inline-block`}
      style={style}
    >
      {category}
    </span>
  )
}
