import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contractors } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

/**
 * GET /api/contractors?site=henderson-ev-charger
 * List all contractors for a site.
 */
export async function GET(request: NextRequest) {
  try {
    const siteSlug =
      request.nextUrl.searchParams.get("site") || "henderson-ev-charger";

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

/**
 * POST /api/contractors — Add a contractor to the prospect list.
 * Body: { name, businessName?, phone, email?, siteSlug, notes? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, businessName, phone, email, siteSlug, notes } = body;

    if (!name || !phone || !siteSlug) {
      return NextResponse.json(
        { error: "name, phone, and siteSlug are required" },
        { status: 400 }
      );
    }

    const [inserted] = await db
      .insert(contractors)
      .values({
        name,
        businessName: businessName || null,
        phone,
        email: email || null,
        siteSlug,
        notes: notes || null,
      })
      .returning();

    return NextResponse.json({ contractor: inserted }, { status: 201 });
  } catch (error) {
    console.error("Contractor create error:", error);
    return NextResponse.json(
      { error: "Failed to create contractor" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/contractors/bulk — Bulk add contractors.
 * Body: { contractors: [{ name, phone, siteSlug, ... }] }
 */
