import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contractors } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import twilio from "twilio";

/**
 * Handles contractor response to the outbound pitch call.
 * Press 1 = interested → connect to owner
 * Press 2 = not interested → mark as rejected
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const digits = formData.get("Digits") as string;
    const contractorName = request.nextUrl.searchParams.get("name") || "there";
    const siteSlug = request.nextUrl.searchParams.get("site") || "henderson-ev-charger";

    const VoiceResponse = twilio.twiml.VoiceResponse;
    const response = new VoiceResponse();

    if (digits === "1") {
      // Contractor is interested — connect them to the owner
      response.say(
        { voice: "Polly.Matthew" },
        "Great! Let me connect you with our team right now."
      );

      const dial = response.dial({
        callerId: process.env.TWILIO_PHONE_NUMBER,
        timeout: 30,
      });
      dial.number(process.env.OWNER_PHONE_NUMBER || "");

      // Update contractor status to interested
      try {
        const results = await db
          .select()
          .from(contractors)
          .where(
            and(
              eq(contractors.siteSlug, siteSlug),
              eq(contractors.status, "contacted")
            )
          )
          .limit(1);

        if (results[0]) {
          await db
            .update(contractors)
            .set({ status: "interested" })
            .where(eq(contractors.id, results[0].id));
        }
      } catch (dbError) {
        console.warn("Contractor interest update failed:", dbError);
      }
    } else {
      // Not interested
      response.say(
        { voice: "Polly.Matthew" },
        "No problem. Thank you for your time. Have a great day!"
      );

      // Update contractor status to rejected
      try {
        const results = await db
          .select()
          .from(contractors)
          .where(
            and(
              eq(contractors.siteSlug, siteSlug),
              eq(contractors.status, "contacted")
            )
          )
          .limit(1);

        if (results[0]) {
          await db
            .update(contractors)
            .set({
              status: "rejected",
              notes: "Declined via automated call",
            })
            .where(eq(contractors.id, results[0].id));
        }
      } catch (dbError) {
        console.warn("Contractor rejection update failed:", dbError);
      }
    }

    return new NextResponse(response.toString(), {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Outbound response error:", error);
    return new NextResponse("<Response><Say>An error occurred.</Say></Response>", {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  }
}
