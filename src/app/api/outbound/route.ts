import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contractors, callLogs } from "@/lib/db/schema";
import { initiateOutboundCall } from "@/lib/twilio";
import { eq } from "drizzle-orm";

/**
 * POST /api/outbound — Initiate outbound calls to contractors.
 * Body: { contractorId?: string, siteSlug: string }
 * If contractorId provided, calls that specific contractor.
 * If not, calls the next un-contacted contractor in the list.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contractorId, siteSlug } = body;

    if (!siteSlug) {
      return NextResponse.json({ error: "siteSlug required" }, { status: 400 });
    }

    let contractor;

    if (contractorId) {
      // Call specific contractor
      const results = await db
        .select()
        .from(contractors)
        .where(eq(contractors.id, contractorId))
        .limit(1);
      contractor = results[0];
    } else {
      // Get next prospect that hasn't been contacted
      const results = await db
        .select()
        .from(contractors)
        .where(eq(contractors.status, "prospect"))
        .limit(1);
      contractor = results[0];
    }

    if (!contractor) {
      return NextResponse.json(
        { error: "No contractors available to call" },
        { status: 404 }
      );
    }

    // Initiate the call
    const result = await initiateOutboundCall(
      contractor.phone,
      contractor.name,
      siteSlug
    );

    // Log the outbound call
    try {
      await db.insert(callLogs).values({
        siteSlug,
        twilioCallSid: result.callSid,
        direction: "outbound",
        from: process.env.TWILIO_PHONE_NUMBER || "",
        to: contractor.phone,
        status: "initiated",
      });
    } catch (dbError) {
      console.warn("Outbound call log failed:", dbError);
    }

    // Update contractor status
    try {
      await db
        .update(contractors)
        .set({
          status: "contacted",
          lastContactedAt: new Date(),
        })
        .where(eq(contractors.id, contractor.id));
    } catch (dbError) {
      console.warn("Contractor status update failed:", dbError);
    }

    return NextResponse.json({
      success: true,
      callSid: result.callSid,
      contractor: {
        id: contractor.id,
        name: contractor.name,
        phone: contractor.phone,
      },
    });
  } catch (error) {
    console.error("Outbound call error:", error);
    return NextResponse.json(
      { error: "Failed to initiate call" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/outbound — List all contractors and their status.
 */
export async function GET(request: NextRequest) {
  try {
    const siteSlug = request.nextUrl.searchParams.get("site") || "henderson-ev-charger";

    const results = await db
      .select()
      .from(contractors)
      .where(eq(contractors.siteSlug, siteSlug));

    return NextResponse.json({ contractors: results });
  } catch (error) {
    console.error("Contractor list error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contractors" },
      { status: 500 }
    );
  }
}
