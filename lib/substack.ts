import Parser from "rss-parser"

import type { SubstackPost } from "@/types/substack"

type RSSItem = {
  title?: string
  link?: string
  pubDate?: string
  contentSnippet?: string
  creator?: string
  enclosure?: { url?: string }
  "media:content"?: { $?: { url?: string } }
}

// Created once at module scope — not per request
const parser = new Parser<Record<string, unknown>, RSSItem>({
  customFields: {
    item: [["media:content", "media:content"]],
  },
})

export async function getSubstackPosts(limit = 6): Promise<SubstackPost[]> {
  const substackUrl = process.env.SUBSTACK_URL
  if (!substackUrl) return []

  try {
    const feedUrl = `${substackUrl}/feed`
    const res = await fetch(feedUrl, { next: { revalidate: 3600 } })
    if (!res.ok) return []

    const xml = await res.text()
    const feed = await parser.parseString(xml)

    return feed.items.slice(0, limit).map((item): SubstackPost => {
      const imageUrl =
        item.enclosure?.url ?? item["media:content"]?.$?.url ?? null

      let pubDate = new Date().toISOString()
      if (item.pubDate) {
        try {
          pubDate = new Date(item.pubDate).toISOString()
        } catch {
          // keep the fallback
        }
      }

      return {
        title: item.title ?? "Untitled",
        link: item.link ?? substackUrl,
        pubDate,
        excerpt: item.contentSnippet ?? "",
        author: item.creator ?? "",
        imageUrl,
      }
    })
  } catch {
    return []
  }
}
