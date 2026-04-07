export type SubstackPost = {
  title: string
  link: string
  pubDate: string // ISO datetime string
  excerpt: string // plain text (from RSS contentSnippet)
  author: string
  imageUrl: string | null
}
