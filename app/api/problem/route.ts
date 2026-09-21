import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../auth";
import {
  addTick,
  createRun,
  findRun,
  getChecklist,
} from "../../../lib/sheets";
import { shopDate } from "../../../lib/time";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await auth();
  const user = session?.user?.email;
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  let body: { type?: string; item?: string; note?: string; at?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const type = body.type;
  const item = (body.item ?? "").trim();
  const note = (body.note ?? "").trim().slice(0, 500);
  const at = body.at || new Date().toISOString();

  if (type !== "startup" && type !== "shutdown") {
    return NextResponse.json({ error: "Unknown checklist" }, { status: 400 });
  }
  if (!item) {
    return NextResponse.json({ error: "No item given" }, { status: 400 });
  }
  if (!note) {
    return NextResponse.json(
      { error: "Say what's wrong before saving" },
      { status: 400 },
    );
  }

  try {
    const items = await getChecklist(type);
    if (!items.some((i) => i.item === item)) {
      return NextResponse.json(
        { error: "That item is no longer on the checklist" },
        { status: 409 },
      );
    }

    const date = shopDate();
    let run = await findRun(date, type);
    if (!run) run = await createRun(date, type, user, at);

    await addTick({
      runId: run.runId,
      item,
      action: "problem",
      at,
      user,
      loggedAt: new Date().toISOString(),
      note,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("problem failed", err);
    return NextResponse.json(
      { error: "Could not save that problem" },
      { status: 502 },
    );
  }
}
