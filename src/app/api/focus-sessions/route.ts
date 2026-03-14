import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { focusSessions } from "@/db/schema";

// GET /api/focus-sessions - List focus sessions
export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "10");

    const sessions = await db.query.focusSessions.findMany({
      where: (s, { eq }) => eq(s.userId, userId),
      orderBy: (s, { desc }) => [desc(s.startedAt)],
      limit,
    });

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Error fetching focus sessions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/focus-sessions - Create focus session
export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { durationMinutes, tags } = body;

    const [session] = await db.insert(focusSessions).values({
      userId,
      durationMinutes: durationMinutes || 25,
      tags: tags || [],
    }).returning();

    return NextResponse.json({ session });
  } catch (error) {
    console.error("Error creating focus session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
