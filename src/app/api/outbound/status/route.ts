import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { callLogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * Handles outbound call status updates from Twilio.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const callSid = formData.get("CallSid") as string;
    const callStatus = formData.get("CallStatus") as string;
    const callDuration = formData.get("CallDuration") as string;

    console.log("Outbound call status:", { callSid, callStatus, callDuration });

    try {
      const statusMap: Record<string, "completed" | "no-answer" | "busy" | "failed" | "in-progress" | "ringing"> = {
        completed: "completed",
        "no-answer": "no-answer",
        busy: "busy",
        failed: "failed",
        "in-progress": "in-progress",
        ringing: "ringing",
      };

      await db
        .update(callLogs)
        .set({
          status: statusMap[callStatus] || "completed",
          duration: parseInt(callDuration || "0", 10),
        })
        .where(eq(callLogs.twilioCallSid, callSid));
    } catch (dbError) {
      console.warn("Outbound status DB update failed:", dbError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Outbound status error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
