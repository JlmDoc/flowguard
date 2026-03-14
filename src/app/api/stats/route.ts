import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { snapshots, focusSessions, interrupts } from "@/db/schema";
import { and, eq, gte, lte, sql } from "drizzle-orm";

// GET /api/stats - Get daily stats
export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const dateStr = searchParams.get("date") || new Date().toISOString().split("T")[0];
    const date = new Date(dateStr);
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);

    // Get snapshot count
    const snapshotCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(snapshots)
      .where(
        and(
          eq(snapshots.userId, userId),
          gte(snapshots.createdAt, date),
          lte(snapshots.createdAt, nextDay)
        )
      );

    // Get focus time
    const focusTime = await db
      .select({ total: sql<number>`sum(${focusSessions.durationMinutes})` })
      .from(focusSessions)
      .where(
        and(
          eq(focusSessions.userId, userId),
          gte(focusSessions.startedAt, date),
          lte(focusSessions.startedAt, nextDay)
        )
      );

    // Get interrupt count
    const interruptCount = await db
      .select({ count: sql<number>`count(*)` })
      .from(interrupts)
      .where(
        and(
          eq(interrupts.userId, userId),
          gte(interrupts.occurredAt, date),
          lte(interrupts.occurredAt, nextDay)
        )
      );

    return NextResponse.json({
      date: dateStr,
      snapshotCount: Number(snapshotCount[0]?.count || 0),
      totalFocusMinutes: Number(focusTime[0]?.total || 0),
      interruptCount: Number(interruptCount[0]?.count || 0),
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
