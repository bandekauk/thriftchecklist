import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../auth";
import { completeRun, findRun, getChecklist, getTickState } from "../../../lib/sheets";
import { shopDate } from "../../../lib/time";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user?.email;
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  let body: { type?: string; at?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const type = body.type;
  const at = body.at || new Date().toISOString();
  if (type !== "startup" && type !== "shutdown") {
    return NextResponse.json({ error: "Unknown checklist" }, { status: 400 });
  }

  try {
    const date = shopDate();
    const run = await findRun(date, type);
    if (!run) {
      return NextResponse.json(
        { error: "Nothing has been ticked yet" },
        { status: 409 },
      );
    }
    if (run.status === "complete") {
      return NextResponse.json({ ok: true, alreadyComplete: true });
    }

    // Server-side check so the button can't be bypassed.
    const [items, ticked] = await Promise.all([
      getChecklist(type),
      getTickState(run.runId),
    ]);
    const missing = items.filter((i) => i.required && !ticked[i.item]);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: "Some required items are still outstanding", missing },
        { status: 409 },
      );
    }

    await completeRun(run, user, at);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("complete failed", err);
    return NextResponse.json(
      { error: "Could not close off the checklist" },
      { status: 502 },
    );
  }
}
