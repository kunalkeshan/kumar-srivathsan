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
  slug?: string
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
    if (body.slug) {
      revalidateTag(createDocumentTag("legal", body.slug), "max")
    }
    return NextResponse.json({ revalidated: true, type: "legal" })
  }

  return NextResponse.json({
    revalidated: false,
    message: "Unknown document type",
  })
}
