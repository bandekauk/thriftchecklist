/**
 * Google Sheets access with no SDK.
 *
 * The googleapis package is a Node library and doesn't run reliably on
 * Cloudflare's workerd runtime, so this talks to the Sheets REST API
 * directly and signs the service-account JWT with Web Crypto. Works
 * unchanged on Cloudflare, Vercel and Node.
 */

export type ChecklistItem = {
  item: string;
  required: boolean;
};

export type Run = {
  rowIndex: number; // 1-based row in the Runs sheet
  runId: string;
  date: string;
  type: string;
  startedBy: string;
  startedAt: string;
  completedAt: string;
  completedBy: string;
  status: string; // open | complete | complete-with-problems
};

export type TickAction =
  | "ticked"
  | "unticked"
  | "problem"
  | "signed-off"
  | "reopened";

export type TickEvent = {
  runId: string;
  item: string;
  action: TickAction;
  at: string; // when it actually happened (client clock, may be offline)
  user: string;
  loggedAt: string; // when the server received it
  note?: string; // what's wrong, for a problem
};

const SHEETS = {
  checklist: "Checklist",
  runs: "Runs",
  ticks: "Ticks",
} as const;

const SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const TOKEN_URL = "https://oauth2.googleapis.com/token";
const API = "https://sheets.googleapis.com/v4/spreadsheets";

/* ------------------------------------------------------------------ *
 * Service-account auth
 * ------------------------------------------------------------------ */

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let bin = "";
  for (let i = 0; i < arr.length; i++) bin += String.fromCharCode(arr[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlText(text: string): string {
  return b64url(new TextEncoder().encode(text));
}

function pemToBytes(pem: string): ArrayBuffer {
  const body = pem
    .replace(/\\n/g, "\n")
    .replace(/-----BEGIN [^-]+-----/, "")
    .replace(/-----END [^-]+-----/, "")
    .replace(/\s+/g, "");
  const bin = atob(body);
  const buf = new ArrayBuffer(bin.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < bin.length; i++) view[i] = bin.charCodeAt(i);
  return buf;
}

let signingKey: CryptoKey | null = null;

async function getSigningKey(): Promise<CryptoKey> {
  if (signingKey) return signingKey;
  const pem = process.env.GOOGLE_PRIVATE_KEY;
  if (!pem) throw new Error("Missing GOOGLE_PRIVATE_KEY");
  const bytes = pemToBytes(pem);
  signingKey = await crypto.subtle.importKey(
    "pkcs8",
    bytes,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return signingKey;
}

let token: { value: string; expiresAt: number } | null = null;

async function accessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  // 60s of slack so a token never expires mid-request.
  if (token && token.expiresAt - 60 > now) return token.value;

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  if (!email) throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_EMAIL");

  const header = b64urlText(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64urlText(
    JSON.stringify({
      iss: email,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsigned = `${header}.${claim}`;

  const sig = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    await getSigningKey(),
    new TextEncoder().encode(unsigned),
  );
  const assertion = `${unsigned}.${b64url(sig)}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!res.ok) {
    throw new Error(`Token request failed (${res.status}): ${await res.text()}`);
  }

  const data = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };
  token = {
    value: data.access_token,
    expiresAt: now + (data.expires_in ?? 3600),
  };
  return token.value;
}

/* ------------------------------------------------------------------ *
 * Sheets REST
 * ------------------------------------------------------------------ */

function sheetId(): string {
  const id = process.env.GOOGLE_SHEET_ID;
  if (!id) throw new Error("Missing GOOGLE_SHEET_ID");
  return id;
}

async function call(
  path: string,
  init: RequestInit = {},
): Promise<Record<string, unknown>> {
  const res = await fetch(`${API}/${sheetId()}/${path}`, {
    ...init,
    headers: {
      ...(init.headers as Record<string, string> | undefined),
      Authorization: `Bearer ${await accessToken()}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`Sheets ${res.status}: ${await res.text()}`);
  }
  return (await res.json()) as Record<string, unknown>;
}

async function read(range: string): Promise<string[][]> {
  const data = await call(`values/${encodeURIComponent(range)}`);
  return ((data.values as string[][]) ?? []).map((r) => r ?? []);
}

/**
 * Append a row at a known position.
 *
 * Google's :append endpoint guesses where the "table" in a range ends, and
 * a stray note or blank row makes it guess wrong — it will happily start
 * writing into the wrong columns and then keep doing so. Instead: find the
 * first genuinely empty row by reading column A, and write there explicitly.
 */
async function append(
  tab: string,
  lastColumn: string,
  row: (string | number)[],
) {
  const col = await read(`${tab}!A:A`);
  let next = col.length + 1; // col[0] is sheet row 1
  if (next < 2) next = 2; // never overwrite the header
  await write(`${tab}!A${next}:${lastColumn}${next}`, row);
}

async function write(range: string, row: (string | number)[]) {
  await call(`values/${encodeURIComponent(range)}?valueInputOption=RAW`, {
    method: "PUT",
    body: JSON.stringify({ values: [row] }),
  });
}

/* ------------------------------------------------------------------ *
 * Domain operations
 * ------------------------------------------------------------------ */

/** Checklist definition lives in the sheet, so it can be edited without a deploy. */
export async function getChecklist(type: string): Promise<ChecklistItem[]> {
  const all = await read(`${SHEETS.checklist}!A:D`);
  const rows = all.slice(1); // drop the header row
  return rows
    .filter((r) => (r[0] ?? "").trim().toLowerCase() === type)
    .sort((a, b) => Number(a[1] ?? 0) - Number(b[1] ?? 0))
    .map((r) => ({
      item: (r[2] ?? "").trim(),
      required: String(r[3] ?? "")
        .trim()
        .toLowerCase() !== "false",
    }))
    .filter((i) => i.item.length > 0);
}

function parseRun(row: string[], rowIndex: number): Run {
  return {
    rowIndex,
    runId: row[0] ?? "",
    date: row[1] ?? "",
    type: row[2] ?? "",
    startedBy: row[3] ?? "",
    startedAt: row[4] ?? "",
    completedAt: row[5] ?? "",
    completedBy: row[6] ?? "",
    status: row[7] ?? "open",
  };
}

/**
 * One run per shop per day per type — whoever starts the opening, anyone
 * can finish it. Individual ticks still record who did them.
 */
export async function findRun(date: string, type: string): Promise<Run | null> {
  const rows = await read(`${SHEETS.runs}!A:H`);
  // rows[0] is the header; rows[i] is sheet row i + 1.
  for (let i = rows.length - 1; i >= 1; i--) {
    const run = parseRun(rows[i], i + 1);
    if (run.date === date && run.type === type) return run;
  }
  return null;
}

/** Both of a day's runs in one read, keyed by type. */
export async function findRunsForDate(
  date: string,
): Promise<Record<string, Run>> {
  const rows = await read(`${SHEETS.runs}!A:H`);
  const out: Record<string, Run> = {};
  for (let i = 1; i < rows.length; i++) {
    const run = parseRun(rows[i], i + 1);
    if (run.date === date && run.type) out[run.type] = run;
  }
  return out;
}

export async function createRun(
  date: string,
  type: string,
  user: string,
  startedAt: string,
): Promise<Run> {
  const runId = `${date}-${type}-${Math.random().toString(36).slice(2, 8)}`;
  await append(SHEETS.runs, "H", [
    runId,
    date,
    type,
    user,
    startedAt,
    "",
    "",
    "open",
  ]);
  const created = await findRun(date, type);
  if (!created) {
    throw new Error(
      "Wrote a run to the Runs sheet but could not read it back — " +
        "check the tab is named Runs and its headers are in row 1.",
    );
  }
  return created;
}

/**
 * Find a run's real sheet row by its id rather than trusting an array
 * offset — blank or note rows above the data would otherwise shift it.
 */
async function findRunRow(runId: string): Promise<number> {
  const col = await read(`${SHEETS.runs}!A:A`);
  for (let i = col.length - 1; i >= 0; i--) {
    if ((col[i]?.[0] ?? "") === runId) return i + 1; // col[0] is sheet row 1
  }
  return -1;
}

export async function completeRun(
  run: Run,
  user: string,
  at: string,
  status: "complete" | "complete-with-problems" = "complete",
) {
  const row = await findRunRow(run.runId);
  if (row < 2) {
    throw new Error(`Could not find run ${run.runId} in the Runs sheet`);
  }
  await write(`${SHEETS.runs}!F${row}:H${row}`, [at, user, status]);
  // The Runs row only ever shows the latest sign-off. Recording the event
  // here means a later correction can't erase that this one happened.
  await addTick({
    runId: run.runId,
    item: "",
    action: "signed-off",
    at,
    user,
    loggedAt: new Date().toISOString(),
  });
}

/**
 * Unlock a signed-off run so a mistake can be corrected. Nothing is deleted:
 * the reopening is recorded, and the original sign-off stays in the event log.
 */
export async function reopenRun(run: Run, user: string, at: string) {
  const row = await findRunRow(run.runId);
  if (row < 2) {
    throw new Error(`Could not find run ${run.runId} in the Runs sheet`);
  }
  await write(`${SHEETS.runs}!F${row}:H${row}`, ["", "", "open"]);
  await addTick({
    runId: run.runId,
    item: "",
    action: "reopened",
    at,
    user,
    loggedAt: new Date().toISOString(),
  });
}

export async function addTick(e: TickEvent) {
  await append(SHEETS.ticks, "G", [
    e.runId,
    e.item,
    e.action,
    e.at,
    e.user,
    e.loggedAt,
    e.note ?? "",
  ]);
}

export type ItemState = {
  state: "ticked" | "problem";
  at: string;
  user: string;
  note: string;
};

/**
 * The Ticks sheet is append-only, so current state is the last event
 * recorded for each item. Unticking never deletes history.
 */
export async function getTickState(
  runId: string,
): Promise<Record<string, ItemState>> {
  const all = await read(`${SHEETS.ticks}!A:G`);
  const rows = all.slice(1); // drop the header row
  const state: Record<string, ItemState> = {};
  for (const r of rows) {
    if ((r[0] ?? "") !== runId) continue;
    const item = r[1] ?? "";
    const action = r[2] ?? "ticked";
    // signed-off and reopened are run-level events, not item state
    if (!item) continue;
    if (action === "unticked") {
      delete state[item];
    } else if (action === "ticked" || action === "problem") {
      state[item] = {
        state: action === "problem" ? "problem" : "ticked",
        at: r[3] ?? "",
        user: r[4] ?? "",
        note: r[6] ?? "",
      };
    }
  }
  return state;
}
