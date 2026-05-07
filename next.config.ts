import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: 'export',      // generate static HTML — bisa hosting di mana saja
  trailingSlash: true,   // /blog/slug/ — kompatibel dengan Hostinger static hosting
  images: {
    unoptimized: true,   // static export tidak support next/image optimization
  },
}

export default nextConfig
