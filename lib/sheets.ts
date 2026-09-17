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
  status: "open" | "complete";
};

export type TickEvent = {
  runId: string;
  item: string;
  action: "ticked" | "unticked";
  at: string; // when it actually happened (client clock, may be offline)
  user: string;
  loggedAt: string; // when the server received it
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

async function append(range: string, row: (string | number)[]) {
  await call(
    `values/${encodeURIComponent(range)}:append` +
      `?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    { method: "POST", body: JSON.stringify({ values: [row] }) },
  );
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
  const rows = await read(`${SHEETS.checklist}!A2:D`);
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
    status: (row[7] as Run["status"]) ?? "open",
  };
}

/**
 * One run per shop per day per type — whoever starts the opening, anyone
 * can finish it. Individual ticks still record who did them.
 */
export async function findRun(date: string, type: string): Promise<Run | null> {
  const rows = await read(`${SHEETS.runs}!A2:H`);
  for (let i = rows.length - 1; i >= 0; i--) {
    const run = parseRun(rows[i], i + 2);
    if (run.date === date && run.type === type) return run;
  }
  return null;
}

export async function createRun(
  date: string,
  type: string,
  user: string,
  startedAt: string,
): Promise<Run> {
  const runId = `${date}-${type}-${Math.random().toString(36).slice(2, 8)}`;
  await append(`${SHEETS.runs}!A:H`, [
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
  if (created) return created;
  return {
    rowIndex: -1,
    runId,
    date,
    type,
    startedBy: user,
    startedAt,
    completedAt: "",
    completedBy: "",
    status: "open",
  };
}

export async function completeRun(run: Run, user: string, at: string) {
  if (run.rowIndex < 0) return;
  await write(`${SHEETS.runs}!F${run.rowIndex}:H${run.rowIndex}`, [
    at,
    user,
    "complete",
  ]);
}

export async function addTick(e: TickEvent) {
  await append(`${SHEETS.ticks}!A:F`, [
    e.runId,
    e.item,
    e.action,
    e.at,
    e.user,
    e.loggedAt,
  ]);
}

/**
 * The Ticks sheet is append-only, so current state is the last event
 * recorded for each item. Unticking never deletes history.
 */
export async function getTickState(
  runId: string,
): Promise<Record<string, { at: string; user: string }>> {
  const rows = await read(`${SHEETS.ticks}!A2:F`);
  const state: Record<string, { at: string; user: string }> = {};
  for (const r of rows) {
    if ((r[0] ?? "") !== runId) continue;
    const item = r[1] ?? "";
    const action = r[2] ?? "ticked";
    if (action === "unticked") delete state[item];
    else state[item] = { at: r[3] ?? "", user: r[4] ?? "" };
  }
  return state;
}
