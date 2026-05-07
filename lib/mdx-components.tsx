import type { MDXComponents } from 'mdx/types'

function slugify(text: string): string {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function getMDXComponents(): MDXComponents {
  return {
    h2: ({ children }) => {
      const id = slugify(String(children))
      return <h2 id={id}>{children}</h2>
    },
    h3: ({ children }) => {
      const id = slugify(String(children))
      return <h3 id={id}>{children}</h3>
    },
    h4: ({ children }) => {
      const id = slugify(String(children))
      return <h4 id={id}>{children}</h4>
    },
  }
}
