# Shift Log

Opening and closing checklists for shop staff. They sign in with a personal
Google account on their phone, tick items as they work through the shift, and
every tick lands in a private Google Sheet with a name and a timestamp.

Staff never get access to the Sheet itself — the app writes to it through a
service account, so the log can't be edited after the fact by the people
creating it.

---

## 1. The Google Sheet

Create a new sheet. Add three tabs, named exactly:

### `Checklist`

| A (type) | B (order) | C (item) | D (required) |
| --- | --- | --- | --- |
| startup | 1 | Unlock front door and disable alarm | TRUE |
| startup | 2 | Fire alarm showing normal | TRUE |
| startup | 3 | Main roller shutter open and chain locked away | TRUE |
| startup | 4 | Front fire door open and held by electromagnet | TRUE |
| startup | 5 | Lights on | TRUE |
| startup | 6 | Till float counted and logged | TRUE |
| startup | 7 | Security camera display on and showing all cameras | TRUE |
| startup | 8 | Fire exits clear | TRUE |
| shutdown | 1 | Card machine end-of-day report | TRUE |
| shutdown | 2 | Till cashed up and cash in safe | TRUE |
| shutdown | 3 | All plug sockets off excluding server / internet switch | TRUE |
| shutdown | 4 | Heaters off | TRUE |
| shutdown | 5 | Waste out, no bins left inside | FALSE |
| shutdown | 6 | Fire exits shut | TRUE |
| shutdown | 7 | Lights off, alarm set, front door locked | TRUE |

Row 1 is headers. Edit this tab any time — the app reads it live, no deploy
needed. `required` = `FALSE` makes an item optional, so it won't block sign-off.

### `Runs`

Headers in row 1, in this order:

`run_id | date | type | started_by | started_at | completed_at | completed_by | status`

### `Ticks`

Headers in row 1, in this order:

`run_id | item | action | at | user | logged_at`

Leave both empty below the header. The app fills them in.

---

## 2. Service account (so the app can write to the Sheet)

1. Go to console.cloud.google.com and create a project.
2. APIs & Services → Library → enable **Google Sheets API**.
3. APIs & Services → Credentials → Create credentials → **Service account**.
   Name it `shift-log`. Skip the optional role steps.
4. Open the service account → Keys → Add key → Create new key → **JSON**.
   It downloads a file. Keep it safe; you can't download it twice.
5. Open your Sheet → Share → paste the service account's email
   (`shift-log@yourproject.iam.gserviceaccount.com`) → give it **Editor**.

---

## 3. OAuth client (so staff can sign in)

1. Same project → APIs & Services → **OAuth consent screen**.
   - User type: **External**
   - Fill in app name, your support email, developer email
   - Scopes: leave the defaults (email, profile)
   - Under **Audience**, keep it in Testing and add each staff Gmail as a
     test user, or click **Publish app**. See the note in section 6.
2. Credentials → Create credentials → **OAuth client ID** → Web application.
   - Authorised JavaScript origins: `https://yourapp.vercel.app`
   - Authorised redirect URIs:
     `https://yourapp.vercel.app/api/auth/callback/google`
   - For local dev also add `http://localhost:3000` and
     `http://localhost:3000/api/auth/callback/google`
3. Copy the client ID and secret.

---

## 4. Environment variables

Copy `.env.example` to `.env.local` for local dev, and add the same values in
Vercel under Settings → Environment Variables.

```
AUTH_SECRET=                     # npx auth secret
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
ALLOWED_EMAILS=you@gmail.com,staff1@gmail.com,staff2@gmail.com
GOOGLE_SHEET_ID=                 # the long id in the sheet URL
GOOGLE_SERVICE_ACCOUNT_EMAIL=    # from the JSON key
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

`GOOGLE_PRIVATE_KEY` is the fiddly one. Copy the `private_key` value out of the
JSON file exactly as it appears — with the `\n` sequences intact — and wrap it
in double quotes. The app converts them back to real line breaks.

`ALLOWED_EMAILS` is the whole access control. Adding or removing a member of
staff means editing this variable and redeploying. Anyone not on the list gets
bounced at the Google callback with a message telling them to ask you.

---

## 5. Run and deploy

```bash
npm install
npm run dev          # http://localhost:3000
```

### Cloudflare Workers (the configured default)

The app talks to the Sheets REST API directly and signs its service-account
JWT with Web Crypto, so there is no Node-only SDK to trip over workerd.
`open-next.config.ts` and `wrangler.jsonc` are already in the repo.

```bash
npx wrangler login
```

Cloudflare doesn't read `.env` at deploy time, so push each value in as a
secret:

```bash
npx wrangler secret put AUTH_SECRET
npx wrangler secret put AUTH_GOOGLE_ID
npx wrangler secret put AUTH_GOOGLE_SECRET
npx wrangler secret put ALLOWED_EMAILS
npx wrangler secret put GOOGLE_SHEET_ID
npx wrangler secret put GOOGLE_SERVICE_ACCOUNT_EMAIL
npx wrangler secret put GOOGLE_PRIVATE_KEY
```

Each command prompts for the value. For `GOOGLE_PRIVATE_KEY`, paste the
`private_key` string from the service-account JSON exactly as it appears
there, `\n` sequences and all, with no surrounding quotes.

Then:

```bash
npm run preview      # runs the built worker locally
npm run deploy       # builds and ships it
```

Wrangler prints the deployed URL (`https://shift-log.<subdomain>.workers.dev`).
Put that into the OAuth client's authorised origins and redirect URI, then
run `npm run deploy` again.

A custom domain goes on under Workers & Pages → shift-log → Settings →
Domains & Routes.

### Vercel instead

Push to GitHub, import the repo, paste the same variables into Settings →
Environment Variables, deploy, then update the OAuth redirect URI to the
real domain. Nothing in the code needs changing — the Cloudflare files are
simply ignored.

---

## 6. Getting it onto their phones

Send each person the URL. Then:

- **iPhone**: open in Safari (not Chrome), Share → Add to Home Screen.
- **Android**: open in Chrome, menu → Add to Home screen / Install app.

It then opens fullscreen with its own icon, no browser chrome.

**One thing to know about the consent screen.** While the OAuth app is in
Testing mode, sessions expire after 7 days and staff have to sign in again.
Publishing the app removes that. Because you only use the basic email and
profile scopes, publishing does not require Google's verification review —
staff will see an "unverified app" warning once and can continue past it.

---

## How it behaves

- **One run per shop per day per checklist.** If one person starts the opening
  and another finishes it, that's one run — but each tick records who did it.
- **First tick opens the run.** No separate start button.
- **The log is append-only.** Unticking writes an `unticked` event rather than
  deleting the original, so the Sheet shows what really happened.
- **Ticks survive a dead signal.** They queue on the phone and send when the
  connection returns, stamped with the time they were actually made.
- **Sign-off is checked server-side.** The "Open the shop" button can't be
  bypassed while required items are outstanding.

## Reviewing the log

The useful query is the `Runs` tab filtered to `status = open` — those are
shifts where somebody started a checklist and never finished it. Sort by date
and it's your daily exception report.
