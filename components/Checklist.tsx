"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { shopTime, shopDate, shopDateLabel } from "../lib/time";
import { nameOf } from "../lib/name";

type Item = { item: string; required: boolean };
type Ticked = Record<string, { at: string; user: string }>;
type Run = {
  runId: string;
  startedBy: string;
  startedAt: string;
  completedAt: string;
  completedBy: string;
  status: string;
} | null;

type State = {
  user: string;
  date: string;
  type: ChecklistType;
  items: Item[];
  run: Run;
  ticked: Ticked;
};

type ChecklistType = "startup" | "shutdown";

type Pending = {
  id: string;
  kind: "tick" | "complete";
  type: ChecklistType;
  item?: string;
  action?: "ticked" | "unticked";
  at: string;
};

const QUEUE_KEY = "shift-log-queue-v1";

function loadQueue(): Pending[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(QUEUE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveQueue(q: Pending[]) {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(q));
  } catch {
    /* storage full or blocked — the in-memory queue still works this session */
  }
}

/** Layer un-sent queued ticks back over whatever the server returned. */
function withPending(base: State, pending: Pending[]): State {
  const ticked = { ...base.ticked };
  for (const job of pending) {
    if (job.kind !== "tick" || job.type !== base.type || !job.item) continue;
    if (job.action === "unticked") delete ticked[job.item];
    else ticked[job.item] = { at: job.at, user: base.user };
  }
  return { ...base, ticked };
}

export default function Checklist({
  initialType,
  firstName,
  signOutAction,
}: {
  initialType: ChecklistType;
  firstName: string;
  signOutAction: () => Promise<void>;
}) {
  const [type, setType] = useState<ChecklistType>(initialType);
  const [state, setState] = useState<State | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [queue, setQueue] = useState<Pending[]>([]);
  const flushing = useRef(false);

  useEffect(() => {
    setQueue(loadQueue());
  }, []);

  // Server state is the base; anything still queued on this phone is layered
  // back on top, so a tick that hasn't been sent yet never disappears.
  const refresh = useCallback(async (t: ChecklistType) => {
    try {
      const res = await fetch(`/api/state?type=${t}`, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data: State = await res.json();
      setState(withPending(data, loadQueue()));
      setError((e) =>
        e && e.startsWith("Can't reach the log") ? null : e,
      );
    } catch {
      setError("Can't reach the log right now. Ticks are being held on this phone.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh(type);
  }, [type, refresh]);

  // Send what's held on the device, oldest first, stopping at the first
  // failure so the order of events is preserved. Each job is removed from
  // the queue as it lands, read fresh each time — a tick made mid-flush
  // must never be overwritten by a stale snapshot.
  const flush = useCallback(async () => {
    if (flushing.current) return;
    if (loadQueue().length === 0) return;
    flushing.current = true;

    try {
      for (;;) {
        const pending = loadQueue();
        if (pending.length === 0) break;
        const job = pending[0];

        let res: Response;
        try {
          res = await fetch(job.kind === "tick" ? "/api/tick" : "/api/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(job),
          });
        } catch {
          break; // offline — keep everything for next time
        }

        if (res.status >= 500) break; // server down, retry later
        if (res.status === 401) {
          setError("Signed out. Sign in again to save what's held on this phone.");
          break;
        }

        // A 4xx won't fix itself on retry, so drop the job — but say why,
        // rather than letting the screen quietly revert.
        if (!res.ok) {
          let message = `That didn't save (error ${res.status}).`;
          try {
            const body = (await res.json()) as { error?: string };
            if (body?.error) message = body.error;
          } catch {
            /* no JSON body — keep the generic message */
          }
          setError(message);
        }

        const after = loadQueue().filter((j) => j.id !== job.id);
        saveQueue(after);
        setQueue(after);
      }
    } finally {
      flushing.current = false;
      if (loadQueue().length === 0) await refresh(type);
    }
  }, [type, refresh]);

  // A phone asleep since last night wakes on yesterday's data — re-check on focus.
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh(type);
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("focus", onVisible);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("focus", onVisible);
    };
  }, [type, refresh]);

  useEffect(() => {
    flush();
    const onOnline = () => flush();
    window.addEventListener("online", onOnline);
    const timer = setInterval(flush, 15000);
    return () => {
      window.removeEventListener("online", onOnline);
      clearInterval(timer);
    };
  }, [flush]);

  function enqueue(job: Pending) {
    const next = [...loadQueue(), job];
    saveQueue(next);
    setQueue(next);
    flush();
  }

  function toggle(item: Item) {
    if (!state) return;
    if (state.run?.status === "complete") return;

    const done = Boolean(state.ticked[item.item]);
    const at = new Date().toISOString();

    // Optimistic — the tick lands instantly even on a bad connection.
    setState((s) => {
      if (!s) return s;
      const ticked = { ...s.ticked };
      if (done) delete ticked[item.item];
      else ticked[item.item] = { at, user: s.user };
      return { ...s, ticked };
    });

    enqueue({
      id: `${at}-${Math.random().toString(36).slice(2, 8)}`,
      kind: "tick",
      type,
      item: item.item,
      action: done ? "unticked" : "ticked",
      at,
    });
  }

  function complete() {
    if (!state) return;
    const at = new Date().toISOString();
    setState((s) =>
      s
        ? { ...s, run: s.run ? { ...s.run, status: "complete", completedAt: at } : s.run }
        : s,
    );
    enqueue({
      id: `${at}-complete-${Math.random().toString(36).slice(2, 8)}`,
      kind: "complete",
      type,
      at,
    });
  }

  const items = state?.items ?? [];
  const ticked = state?.ticked ?? {};
  const doneCount = items.filter((i) => ticked[i.item]).length;
  const outstanding = items.filter((i) => i.required && !ticked[i.item]);
  const isComplete = state?.run?.status === "complete";
  const progress = items.length ? (doneCount / items.length) * 100 : 0;

  const heading = isComplete
    ? type === "startup"
      ? "Shop is open"
      : "Shop is closed"
    : doneCount === 0
      ? type === "startup"
        ? "Shop not opened yet"
        : "Shop not closed yet"
      : type === "startup"
        ? "Opening in progress"
        : "Closing in progress";

  const detail = isComplete
    ? `Signed off at ${shopTime(state?.run?.completedAt ?? "")}`
    : state?.run?.startedAt
      ? `Started ${shopTime(state.run.startedAt)} · ${doneCount} of ${items.length} done`
      : `${items.length} things to check`;

  return (
    <div className="app" data-mode={type}>
      <header className="header">
        <div className="header-top">
          <span className="who">
            {firstName} · {shopDateLabel(state?.date ?? "")}
          </span>
          <form action={signOutAction}>
            <button type="submit" className="signout">
              Sign out
            </button>
          </form>
        </div>
        <h1 className="state">{heading}</h1>
        <p className="state-detail">{detail}</p>
        <div className="progress">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <nav className="switch">
        <button
          type="button"
          aria-pressed={type === "startup"}
          onClick={() => setType("startup")}
        >
          Opening
        </button>
        <button
          type="button"
          aria-pressed={type === "shutdown"}
          onClick={() => setType("shutdown")}
        >
          Closing
        </button>
      </nav>

      {state && state.date !== shopDate() && (
        <p className="strip" data-tone="error">
          This is {shopDateLabel(state.date)}, not today. Pull down to reload
          before ticking anything.
        </p>
      )}
      {queue.length > 0 && (
        <p className="strip">
          {queue.length} {queue.length === 1 ? "tick" : "ticks"} waiting to save.
          They&rsquo;ll go through when you&rsquo;re back on signal.
        </p>
      )}
      {error && (
        <p className="strip" data-tone="error">
          {error}
        </p>
      )}

      {loading ? (
        <p className="loading">Loading today&rsquo;s checklist…</p>
      ) : (
        <ul className="list">
          {items.map((i) => {
            const t = ticked[i.item];
            return (
              <li className="item" key={i.item} data-done={Boolean(t)}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  aria-pressed={Boolean(t)}
                  disabled={isComplete}
                >
                  <span className="box" aria-hidden="true" />
                  <span className="label">
                    {i.item}
                    {!i.required && <span className="optional">If needed</span>}
                  </span>
                  {t && (
                    <span className="stamp">
                      <span>{shopTime(t.at)}</span>
                      <span>{nameOf(t.user)}</span>
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <footer className="footer">
        {isComplete ? (
          <p className="done-note">
            {type === "startup" ? "Opening" : "Closing"} logged for today.
          </p>
        ) : (
          <button
            type="button"
            className="action"
            onClick={complete}
            disabled={outstanding.length > 0 || items.length === 0}
          >
            {outstanding.length > 0
              ? `${outstanding.length} still to do`
              : type === "startup"
                ? "Open the shop"
                : "Close the shop"}
          </button>
        )}
      </footer>
    </div>
  );
}
