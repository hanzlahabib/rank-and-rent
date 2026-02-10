import { NextRequest, NextResponse } from "next/server";
import { generateOutboundPitchTwiml } from "@/lib/twilio";

/**
 * Returns TwiML for the outbound pitch call.
 * Twilio fetches this URL when the outbound call connects.
 */
export async function POST(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name") || "there";
  const siteSlug = request.nextUrl.searchParams.get("site") || "henderson-ev-charger";

  const twiml = generateOutboundPitchTwiml(name, siteSlug);

  return new NextResponse(twiml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  });
}

// Twilio may also use GET
export async function GET(request: NextRequest) {
  return POST(request);
}
