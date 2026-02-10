import { NextRequest, NextResponse } from "next/server";
import { generateInboundCallTwiml } from "@/lib/twilio";
import { db } from "@/lib/db";
import { leads, callLogs } from "@/lib/db/schema";

/**
 * Twilio Voice webhook — handles inbound calls to tracking number.
 * Returns TwiML to greet caller and forward to owner.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const callSid = formData.get("CallSid") as string;
    const from = formData.get("From") as string;
    const to = formData.get("To") as string;
    const callStatus = formData.get("CallStatus") as string;

    const siteSlug = request.nextUrl.searchParams.get("site") || "henderson-ev-charger";

    console.log("Inbound call:", { callSid, from, to, callStatus, siteSlug });

    // Log the call to DB
    try {
      await db.insert(callLogs).values({
        siteSlug,
        twilioCallSid: callSid,
        direction: "inbound",
        from,
        to,
        status: "initiated",
      });
    } catch (dbError) {
      console.warn("Call log DB save failed:", dbError);
    }

    // Create a lead from the inbound call
    try {
      await db.insert(leads).values({
        siteSlug,
        name: "Phone Caller",
        email: "unknown@call.tracking",
        phone: from,
        source: "call",
        twilioCallSid: callSid,
      });
    } catch (dbError) {
      console.warn("Lead from call DB save failed:", dbError);
    }

    // Return TwiML response
    const twiml = generateInboundCallTwiml(siteSlug);

    return new NextResponse(twiml, {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Voice webhook error:", error);
    return new NextResponse("<Response><Say>An error occurred.</Say></Response>", {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  }
}
