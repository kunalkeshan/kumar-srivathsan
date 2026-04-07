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

function extractImageUrl(item: RSSItem): string | null {
  return item.enclosure?.url ?? item["media:content"]?.$?.url ?? null
}

function parseDate(dateString?: string): string {
  if (!dateString) return new Date().toISOString()
  try {
    return new Date(dateString).toISOString()
  } catch {
    return new Date().toISOString()
  }
}

export async function getSubstackPosts(limit = 6): Promise<SubstackPost[]> {
  const rawUrl = process.env.SUBSTACK_URL
  if (!rawUrl) return []

  const substackUrl = rawUrl.trim().replace(/\/$/, "")

  try {
    const feedUrl = `${substackUrl}/feed`
    const res = await fetch(feedUrl, { next: { revalidate: 3600 } })
    if (!res.ok) return []

    const xml = await res.text()
    const feed = await parser.parseString(xml)

    return feed.items.slice(0, limit).map((item): SubstackPost => ({
      title: item.title ?? "Untitled",
      link: item.link ?? substackUrl,
      pubDate: parseDate(item.pubDate),
      excerpt: item.contentSnippet ?? "",
      author: item.creator ?? "",
      imageUrl: extractImageUrl(item),
    }))
  } catch {
    return []
  }
}
