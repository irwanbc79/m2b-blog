interface Props {
  minutes: number
  className?: string
}

export default function ReadingTime({ minutes, className = '' }: Props) {
  return (
    <span className={`text-[12.5px] text-text-soft ${className}`}>
      {minutes} mnt baca
    </span>
  )
}
