import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../auth";
import { findRun, reopenRun } from "../../../lib/sheets";
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
    const run = await findRun(shopDate(), type);
    if (!run) {
      return NextResponse.json(
        { error: "There's nothing signed off to correct" },
        { status: 409 },
      );
    }
    if (run.status !== "complete") {
      return NextResponse.json({ ok: true, alreadyOpen: true });
    }

    await reopenRun(run, user, at);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("reopen failed", err);
    return NextResponse.json(
      { error: "Could not unlock the checklist" },
      { status: 502 },
    );
  }
}
