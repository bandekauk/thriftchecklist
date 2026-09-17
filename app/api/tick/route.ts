import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../auth";
import { addTick, createRun, findRun, getChecklist } from "../../../lib/sheets";
import { shopDate } from "../../../lib/time";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user?.email;
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  let body: {
    type?: string;
    item?: string;
    action?: string;
    at?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const type = body.type;
  const item = (body.item ?? "").trim();
  const action = body.action === "unticked" ? "unticked" : "ticked";
  const at = body.at || new Date().toISOString();

  if (type !== "startup" && type !== "shutdown") {
    return NextResponse.json({ error: "Unknown checklist" }, { status: 400 });
  }
  if (!item) {
    return NextResponse.json({ error: "No item given" }, { status: 400 });
  }

  try {
    // Reject anything not on the current checklist, so a stale phone
    // can't write items that no longer exist.
    const items = await getChecklist(type);
    if (!items.some((i) => i.item === item)) {
      return NextResponse.json(
        { error: "That item is no longer on the checklist" },
        { status: 409 },
      );
    }

    const date = shopDate();
    let run = await findRun(date, type);
    // First tick of the day opens the run — no separate start button.
    if (!run) run = await createRun(date, type, user, at);

    await addTick({
      runId: run.runId,
      item,
      action,
      at,
      user,
      loggedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, runId: run.runId });
  } catch (err) {
    console.error("tick failed", err);
    return NextResponse.json(
      { error: "Could not save that tick" },
      { status: 502 },
    );
  }
}
