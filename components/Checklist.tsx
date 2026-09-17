"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { shopTime } from "../lib/time";
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

  const refresh = useCallback(async (t: ChecklistType) => {
    try {
      const res = await fetch(`/api/state?type=${t}`, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data: State = await res.json();
      setState(data);
      setError(null);
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

  // Send anything held on the device, oldest first, stopping at the first failure
  // so the order of events is preserved.
  const flush = useCallback(async () => {
    if (flushing.current) return;
    const current = loadQueue();
    if (current.length === 0) return;
    flushing.current = true;

    let remaining = [...current];
    try {
      while (remaining.length > 0) {
        const job = remaining[0];
        const url = job.kind === "tick" ? "/api/tick" : "/api/complete";
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(job),
        });
        if (res.status >= 500 || res.status === 0) break; // server down, retry later
        if (res.status === 401) {
          setError("Signed out. Sign in again to save what's held on this phone.");
          break;
        }
        // 2xx, or a 4xx we can't fix by retrying — drop it either way.
        remaining = remaining.slice(1);
        saveQueue(remaining);
      }
    } catch {
      // offline — keep the queue for next time
    } finally {
      saveQueue(remaining);
      setQueue(remaining);
      flushing.current = false;
      if (remaining.length === 0) {
        setError(null);
        await refresh(type);
      }
    }
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
      id: `${at}-${item.item}`,
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
    enqueue({ id: `${at}-complete`, kind: "complete", type, at });
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
          <span className="who">{firstName}</span>
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
