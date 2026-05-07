interface Props {
  author: string
  date: string
  readTime: number
}

const AUTHOR_BIOS: Record<string, string> = {
  'Tim M2B': 'Tim ahli ekspor-impor PT. Mora Multi Berkah dengan pengalaman lebih dari 10 tahun di bidang logistik, bea cukai, dan perdagangan internasional.',
}

export default function AuthorBox({ author, date, readTime }: Props) {
  const bio = AUTHOR_BIOS[author] || `Penulis konten ekspor-impor dan logistik di Blog M2B.`

  return (
    <div className="flex items-start gap-4 p-5 rounded-[14px] bg-cream border border-cream-dark mt-10">
      {/* Avatar */}
      <div
        className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-cream font-extrabold text-[16px]"
        style={{ background: '#0B1120' }}
      >
        {author.charAt(0)}
      </div>
      <div>
        <p className="text-[13px] font-bold text-navy">{author}</p>
        <p className="text-[12px] text-text-soft mb-1">{date} · {readTime} menit baca</p>
        <p className="text-[12.5px] text-text-mid leading-relaxed">{bio}</p>
      </div>
    </div>
  )
}
