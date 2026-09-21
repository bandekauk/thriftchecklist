import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../auth";
import {
  getChecklist,
  findRunsForDate,
  getTickState,
} from "../../../lib/sheets";
import { shopDate } from "../../../lib/time";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const type = req.nextUrl.searchParams.get("type") ?? "startup";
  if (type !== "startup" && type !== "shutdown") {
    return NextResponse.json({ error: "Unknown checklist" }, { status: 400 });
  }

  const date = shopDate();

  try {
    const [items, runs] = await Promise.all([
      getChecklist(type),
      findRunsForDate(date),
    ]);
    const run = runs[type] ?? null;
    const ticked = run ? await getTickState(run.runId) : {};

    // Both days' runs go back, so the tabs can show what's already done.
    const summarise = (t: string) => {
      const r = runs[t];
      if (!r) return null;
      return {
        status: r.status,
        startedBy: r.startedBy,
        startedAt: r.startedAt,
        completedBy: r.completedBy,
        completedAt: r.completedAt,
      };
    };

    return NextResponse.json({
      user: session.user.email,
      name: session.user.name ?? session.user.email,
      date,
      type,
      items,
      run: run
        ? {
            runId: run.runId,
            startedBy: run.startedBy,
            startedAt: run.startedAt,
            completedAt: run.completedAt,
            completedBy: run.completedBy,
            status: run.status,
          }
        : null,
      summary: {
        startup: summarise("startup"),
        shutdown: summarise("shutdown"),
      },
      ticked,
    });
  } catch (err) {
    console.error("state failed", err);
    return NextResponse.json(
      { error: "Could not reach the log" },
      { status: 502 },
    );
  }
}
