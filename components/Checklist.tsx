"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { shopTime, shopDate, shopDateLabel } from "../lib/time";
import { nameOf } from "../lib/name";

type Item = { item: string; required: boolean };

type ItemState = {
  state: "ticked" | "problem";
  at: string;
  user: string;
  note: string;
};

type Ticked = Record<string, ItemState>;

type Run = {
  runId: string;
  startedBy: string;
  startedAt: string;
  completedAt: string;
  completedBy: string;
  status: string;
} | null;

type RunSummary = {
  status: string;
  startedBy: string;
  startedAt: string;
  completedBy: string;
  completedAt: string;
} | null;

type ChecklistType = "startup" | "shutdown";

type State = {
  user: string;
  date: string;
  type: ChecklistType;
  items: Item[];
  run: Run;
  ticked: Ticked;
  summary?: { startup: RunSummary; shutdown: RunSummary };
};

type Pending = {
  id: string;
  kind: "tick" | "problem" | "complete" | "reopen";
  type: ChecklistType;
  item?: string;
  action?: "ticked" | "unticked";
  note?: string;
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

function endpointFor(kind: Pending["kind"]): string {
  switch (kind) {
    case "tick":
      return "/api/tick";
    case "problem":
      return "/api/problem";
    case "complete":
      return "/api/complete";
    default:
      return "/api/reopen";
  }
}

/** Layer un-sent queued events back over whatever the server returned. */
function withPending(base: State, pending: Pending[]): State {
  const ticked: Ticked = { ...base.ticked };
  for (const job of pending) {
    if (job.type !== base.type || !job.item) continue;
    if (job.kind === "problem") {
      ticked[job.item] = {
        state: "problem",
        at: job.at,
        user: base.user,
        note: job.note ?? "",
      };
    } else if (job.kind === "tick") {
      if (job.action === "unticked") delete ticked[job.item];
      else
        ticked[job.item] = {
          state: "ticked",
          at: job.at,
          user: base.user,
          note: "",
        };
    }
  }
  return { ...base, ticked };
}

function uid(prefix: string) {
  return `${new Date().toISOString()}-${prefix}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
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
  const [confirmingUnlock, setConfirmingUnlock] = useState(false);
  const [reporting, setReporting] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const flushing = useRef(false);

  useEffect(() => {
    setQueue(loadQueue());
  }, []);

  const refresh = useCallback(async (t: ChecklistType) => {
    try {
      const res = await fetch(`/api/state?type=${t}`, { cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const data: State = await res.json();
      setState(withPending(data, loadQueue()));
      setError((e) => (e && e.startsWith("Can't reach the log") ? null : e));
    } catch {
      setError(
        "Can't reach the log right now. Ticks are being held on this phone.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setConfirmingUnlock(false);
    setReporting(null);
    refresh(type);
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

  // Send what's held on the device, oldest first, stopping at the first
  // failure so the order of events is preserved. Each job is removed as it
  // lands, read fresh — a tap made mid-flush must never be overwritten.
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
          res = await fetch(endpointFor(job.kind), {
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

  const isComplete = Boolean(state?.run?.status?.startsWith("complete"));

  function toggle(item: Item) {
    if (!state || isComplete) return;
    const current = state.ticked[item.item];
    const clearing = current?.state === "ticked";
    const at = new Date().toISOString();

    setState((s) => {
      if (!s) return s;
      const ticked = { ...s.ticked };
      if (clearing) delete ticked[item.item];
      else
        ticked[item.item] = {
          state: "ticked",
          at,
          user: s.user,
          note: "",
        };
      return { ...s, ticked };
    });

    enqueue({
      id: uid("tick"),
      kind: "tick",
      type,
      item: item.item,
      action: clearing ? "unticked" : "ticked",
      at,
    });
  }

  function saveProblem(item: string) {
    const text = note.trim();
    if (!state || !text) return;
    const at = new Date().toISOString();

    setState((s) =>
      s
        ? {
            ...s,
            ticked: {
              ...s.ticked,
              [item]: { state: "problem", at, user: s.user, note: text },
            },
          }
        : s,
    );

    setReporting(null);
    setNote("");
    enqueue({ id: uid("problem"), kind: "problem", type, item, note: text, at });
  }

  function complete() {
    if (!state) return;
    const at = new Date().toISOString();
    setState((s) =>
      s
        ? {
            ...s,
            run: s.run ? { ...s.run, status: "complete", completedAt: at } : s.run,
          }
        : s,
    );
    enqueue({ id: uid("complete"), kind: "complete", type, at });
  }

  function reopen() {
    if (!state) return;
    const at = new Date().toISOString();
    setConfirmingUnlock(false);
    setState((s) =>
      s
        ? {
            ...s,
            run: s.run
              ? { ...s.run, status: "open", completedAt: "", completedBy: "" }
              : s.run,
          }
        : s,
    );
    enqueue({ id: uid("reopen"), kind: "reopen", type, at });
  }

  const items = state?.items ?? [];
  const ticked = state?.ticked ?? {};
  const doneCount = items.filter((i) => ticked[i.item]).length;
  const problems = items.filter((i) => ticked[i.item]?.state === "problem");
  const outstanding = items.filter((i) => i.required && !ticked[i.item]);
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
        {(["startup", "shutdown"] as ChecklistType[]).map((t) => {
          const sum = state?.summary?.[t] ?? null;
          const label = t === "startup" ? "Opening" : "Closing";
          const tabNote = sum?.status?.startsWith("complete")
            ? `Done ${shopTime(sum.completedAt)}`
            : sum
              ? "In progress"
              : "Not started";
          return (
            <button
              key={t}
              type="button"
              aria-pressed={type === t}
              onClick={() => setType(t)}
            >
              {label}
              <span className="tab-note">{tabNote}</span>
            </button>
          );
        })}
      </nav>

      {state && state.date !== shopDate() && (
        <p className="strip" data-tone="error">
          This is {shopDateLabel(state.date)}, not today. Reload before ticking
          anything.
        </p>
      )}

      {queue.length > 0 && (
        <p className="strip">
          {queue.length} {queue.length === 1 ? "change" : "changes"} waiting to
          save. They&rsquo;ll go through when you&rsquo;re back on signal.
        </p>
      )}

      {error && (
        <p className="strip" data-tone="error">
          {error}
        </p>
      )}

      {isComplete && (
        <p className="strip" data-tone="done">
          Signed off by {nameOf(state?.run?.completedBy ?? "")} at{" "}
          {shopTime(state?.run?.completedAt ?? "")}. It&rsquo;s locked — if
          something needs correcting, use the button at the bottom.
        </p>
      )}

      {loading ? (
        <p className="loading">Loading today&rsquo;s checklist…</p>
      ) : (
        <ul className="list">
          {items.map((i) => {
            const t = ticked[i.item];
            const flagged = t?.state === "problem";
            return (
              <li
                className="item"
                key={i.item}
                data-done={Boolean(t)}
                data-problem={flagged}
              >
                <div className="item-row">
                  <button
                    type="button"
                    className="item-main"
                    onClick={() => toggle(i)}
                    aria-pressed={t?.state === "ticked"}
                    disabled={isComplete}
                  >
                    <span className="box" aria-hidden="true" />
                    <span className="label">
                      {i.item}
                      {!i.required && !t && (
                        <span className="optional">If needed</span>
                      )}
                      {flagged && <span className="note">{t.note}</span>}
                    </span>
                    {t && (
                      <span className="stamp">
                        <span>{shopTime(t.at)}</span>
                        <span>{nameOf(t.user)}</span>
                      </span>
                    )}
                  </button>

                  {!isComplete && (
                    <button
                      type="button"
                      className="flag"
                      aria-label={
                        flagged
                          ? `Change the problem on ${i.item}`
                          : `Report a problem with ${i.item}`
                      }
                      onClick={() => {
                        setReporting(reporting === i.item ? null : i.item);
                        setNote(t?.note ?? "");
                      }}
                    >
                      {flagged ? "Edit" : "Problem"}
                    </button>
                  )}
                </div>

                {reporting === i.item && (
                  <div className="report">
                    <label htmlFor={`note-${i.item}`}>
                      What&rsquo;s wrong? This is recorded with your name and
                      the time.
                    </label>
                    <textarea
                      id={`note-${i.item}`}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={3}
                      placeholder="e.g. panel showing a fault on zone 2"
                    />
                    <div className="confirm-actions">
                      <button
                        type="button"
                        className="ghost"
                        onClick={() => saveProblem(i.item)}
                        disabled={!note.trim()}
                      >
                        Save problem
                      </button>
                      <button
                        type="button"
                        className="ghost"
                        onClick={() => {
                          setReporting(null);
                          setNote("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <footer className="footer">
        {isComplete ? (
          <>
            <p className="done-note">
              {type === "startup" ? "Opening" : "Closing"} logged by{" "}
              {nameOf(state?.run?.completedBy ?? "")}.{" "}
              {type === "startup"
                ? "Closing is on the other tab."
                : "Opening is on the other tab."}
            </p>
            {confirmingUnlock ? (
              <div className="confirm">
                <p>
                  Unlocking is recorded in the log, along with anything you
                  change and who changed it. The original sign-off stays.
                </p>
                <div className="confirm-actions">
                  <button type="button" className="ghost" onClick={reopen}>
                    Unlock it
                  </button>
                  <button
                    type="button"
                    className="ghost"
                    onClick={() => setConfirmingUnlock(false)}
                  >
                    Leave it
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="correction"
                onClick={() => setConfirmingUnlock(true)}
              >
                Something&rsquo;s wrong — record a correction
              </button>
            )}
          </>
        ) : (
          <>
            {problems.length > 0 && (
              <p className="problem-count">
                {problems.length}{" "}
                {problems.length === 1 ? "problem" : "problems"} reported.
                Signing off records them.
              </p>
            )}
            <button
              type="button"
              className="action"
              data-problems={problems.length > 0}
              onClick={complete}
              disabled={outstanding.length > 0 || items.length === 0}
            >
              {outstanding.length > 0
                ? `${outstanding.length} still to do`
                : problems.length > 0
                  ? `Sign off with ${problems.length} ${
                      problems.length === 1 ? "problem" : "problems"
                    }`
                  : type === "startup"
                    ? "Open the shop"
                    : "Close the shop"}
            </button>
          </>
        )}
      </footer>
    </div>
  );
}
