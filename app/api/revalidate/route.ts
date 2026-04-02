import { revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"
import { createCollectionTag } from "@/sanity/lib/cache-tags"

export async function POST(req: NextRequest) {
  const { body, isValidSignature } = await parseBody<{ _type: string }>(
    req,
    process.env.SANITY_WEBHOOK_SECRET
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

  return NextResponse.json({
    revalidated: false,
    message: "Unknown document type",
  })
}
