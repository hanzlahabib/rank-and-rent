import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { callLogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { generateVoicemailTwiml } from "@/lib/twilio";

/**
 * Handles call status updates from Twilio (after dial attempt).
 * If owner doesn't answer, redirects to voicemail.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const callSid = formData.get("CallSid") as string;
    const dialCallStatus = formData.get("DialCallStatus") as string;
    const dialCallDuration = formData.get("DialCallDuration") as string;

    console.log("Call status update:", { callSid, dialCallStatus, dialCallDuration });

    // Update call log in DB
    try {
      const statusMap: Record<string, "completed" | "no-answer" | "busy" | "failed"> = {
        completed: "completed",
        "no-answer": "no-answer",
        busy: "busy",
        failed: "failed",
      };

      await db
        .update(callLogs)
        .set({
          status: statusMap[dialCallStatus] || "completed",
          duration: parseInt(dialCallDuration || "0", 10),
        })
        .where(eq(callLogs.twilioCallSid, callSid));
    } catch (dbError) {
      console.warn("Call status DB update failed:", dbError);
    }

    // If owner didn't answer, go to voicemail
    if (dialCallStatus === "no-answer" || dialCallStatus === "busy") {
      const twiml = generateVoicemailTwiml();
      return new NextResponse(twiml, {
        status: 200,
        headers: { "Content-Type": "application/xml" },
      });
    }

    // Call completed normally
    return new NextResponse("<Response></Response>", {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  } catch (error) {
    console.error("Call status webhook error:", error);
    return new NextResponse("<Response></Response>", {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  }
}
