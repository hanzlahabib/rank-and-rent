import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { sendLeadSmsNotification } from "@/lib/twilio";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message, siteId, source } = body;

    if (!name || !email || !phone || !siteId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("New lead received:", { name, email, phone, service, siteId });

    // Save to database
    let savedLead = null;
    try {
      const [inserted] = await db
        .insert(leads)
        .values({
          siteSlug: siteId,
          name,
          email,
          phone,
          service: service || null,
          message: message || null,
          source: source || "form",
        })
        .returning();
      savedLead = inserted;
      console.log("Lead saved to DB:", savedLead.id);
    } catch (dbError) {
      // DB not connected yet — log and continue (don't block the lead)
      console.warn("DB save failed (continuing without DB):", dbError);
    }

    // Send SMS notification via Twilio
    try {
      const smsResult = await sendLeadSmsNotification({
        name,
        phone,
        email,
        service: service || "General inquiry",
        siteSlug: siteId,
        message,
      });
      console.log("SMS notification sent:", smsResult.sid);
    } catch (smsError) {
      // Twilio not configured yet — log and continue
      console.warn("SMS notification failed (continuing):", smsError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Lead captured successfully",
        leadId: savedLead?.id || null,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
