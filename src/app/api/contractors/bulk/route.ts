import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contractors } from "@/lib/db/schema";

/**
 * POST /api/contractors/bulk — Bulk add contractors from a list.
 * Body: { contractors: [{ name, phone, siteSlug, businessName?, email?, notes? }] }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contractors: contractorList } = body;

    if (!Array.isArray(contractorList) || contractorList.length === 0) {
      return NextResponse.json(
        { error: "contractors array is required" },
        { status: 400 }
      );
    }

    const values = contractorList.map(
      (c: { name: string; phone: string; siteSlug: string; businessName?: string; email?: string; notes?: string }) => ({
        name: c.name,
        businessName: c.businessName || null,
        phone: c.phone,
        email: c.email || null,
        siteSlug: c.siteSlug,
        notes: c.notes || null,
      })
    );

    const inserted = await db.insert(contractors).values(values).returning();

    return NextResponse.json(
      { success: true, count: inserted.length },
      { status: 201 }
    );
  } catch (error) {
    console.error("Bulk contractor create error:", error);
    return NextResponse.json(
      { error: "Failed to bulk create contractors" },
      { status: 500 }
    );
  }
}
