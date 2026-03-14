import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { snapshots } from "@/db/schema";

// GET /api/snapshots - List snapshots
export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "10");

    const userSnapshots = await db.query.snapshots.findMany({
      where: (s, { eq }) => eq(s.userId, userId),
      orderBy: (s, { desc }) => [desc(s.createdAt)],
      limit,
    });

    return NextResponse.json({ snapshots: userSnapshots });
  } catch (error) {
    console.error("Error fetching snapshots:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/snapshots - Create snapshot
export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, note, browserTabs, vscodeFiles, tags } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const [snapshot] = await db.insert(snapshots).values({
      userId,
      title,
      note,
      browserTabs: browserTabs || [],
      vscodeFiles: vscodeFiles || [],
      tags: tags || [],
    }).returning();

    return NextResponse.json({ snapshot });
  } catch (error) {
    console.error("Error creating snapshot:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
