import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../auth";
import { getChecklist, findRun, getTickState } from "../../../lib/sheets";
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
    const [items, run] = await Promise.all([
      getChecklist(type),
      findRun(date, type),
    ]);
    const ticked = run ? await getTickState(run.runId) : {};

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
