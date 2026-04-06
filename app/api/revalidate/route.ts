import { revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"
import { assertValue } from "@/lib/utils"
import {
  createCollectionTag,
  createDocumentTag,
} from "@/sanity/lib/cache-tags"

const webhookSecret = assertValue(
  process.env.SANITY_WEBHOOK_SECRET,
  "Missing environment variable: SANITY_WEBHOOK_SECRET"
)

type WebhookBody = {
  _type: string
  /** String or `{ current: string }` depending on webhook projection. */
  slug?: string | { current?: string }
}

function normalizeWebhookSlug(
  slug: WebhookBody["slug"]
): string | undefined {
  if (slug == null) return undefined
  if (typeof slug === "string" && slug.length > 0) return slug
  if (typeof slug === "object" && slug && typeof slug.current === "string") {
    return slug.current
  }
  return undefined
}

export async function POST(req: NextRequest) {
  const { body, isValidSignature } = await parseBody<WebhookBody>(
    req,
    webhookSecret
  )

  if (!isValidSignature) {
    return new NextResponse(JSON.stringify({ message: "Invalid signature" }), {
      status: 401,
    })
  }

  if (!body) {
    return new NextResponse(JSON.stringify({ message: "Bad request" }), {
      status: 400,
    })
  }

  if (body._type === "siteConfig") {
    revalidateTag(createCollectionTag("siteConfig"), "max")
    return NextResponse.json({ revalidated: true, type: "siteConfig" })
  }

  if (body._type === "destination") {
    revalidateTag(createCollectionTag("destination"), "max")
    return NextResponse.json({ revalidated: true, type: "destination" })
  }

  if (body._type === "routesConfig") {
    revalidateTag(createCollectionTag("routesConfig"), "max")
    return NextResponse.json({ revalidated: true, type: "routesConfig" })
  }

  if (body._type === "manual") {
    revalidateTag(createCollectionTag("manual"), "max")
    return NextResponse.json({ revalidated: true, type: "manual" })
  }

  if (body._type === "legal") {
    revalidateTag(createCollectionTag("legal"), "max")
    revalidateTag(createCollectionTag("siteConfig"), "max")
    const slug = normalizeWebhookSlug(body.slug)
    if (slug) {
      revalidateTag(createDocumentTag("legal", slug), "max")
    }
    return NextResponse.json({ revalidated: true, type: "legal" })
  }

  return NextResponse.json({
    revalidated: false,
    message: "Unknown document type",
  })
}
