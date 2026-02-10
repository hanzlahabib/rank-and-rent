import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { callLogs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * Handles recording status callbacks from Twilio.
 * Stores the recording URL for playback in dashboard.
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const callSid = formData.get("CallSid") as string;
    const recordingUrl = formData.get("RecordingUrl") as string;
    const recordingStatus = formData.get("RecordingStatus") as string;

    console.log("Recording callback:", { callSid, recordingUrl, recordingStatus });

    if (recordingStatus === "completed" && recordingUrl) {
      try {
        await db
          .update(callLogs)
          .set({ recordingUrl: `${recordingUrl}.mp3` })
          .where(eq(callLogs.twilioCallSid, callSid));
      } catch (dbError) {
        console.warn("Recording URL DB save failed:", dbError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Recording webhook error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
