import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";

/**
 * Handles inbound SMS to the Twilio tracking number.
 * Creates a lead from the SMS sender.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const from = formData.get("From") as string;
    const body = formData.get("Body") as string;
    const messageSid = formData.get("MessageSid") as string;

    console.log("Inbound SMS:", { from, body, messageSid });

    // Save as lead
    try {
      await db.insert(leads).values({
        siteSlug: "henderson-ev-charger",
        name: "SMS Inquiry",
        email: "unknown@sms.tracking",
        phone: from,
        message: body,
        source: "sms",
      });
    } catch (dbError) {
      console.warn("SMS lead DB save failed:", dbError);
    }

    // Auto-reply TwiML
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>Thanks for reaching out to Henderson EV Charger Pros! We'll get back to you within 30 minutes. For immediate help, call (702) 555-0134.</Message>
</Response>`;

    return new NextResponse(twiml, {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("SMS webhook error:", error);
    return new NextResponse("<Response></Response>", {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  }
}
