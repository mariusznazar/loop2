# Handoff — Slice 6 executor, task `potwierdzenie-adresu`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are a fresh executor of one planned slice.
Questions go to the orchestrator, never to the human; you return at your slice's boundary and
start no other slice.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\potwierdzenie-adresu`, branch
  `task/potwierdzenie-adresu`. Process pin `.the-way` at `3aee7d9`. Only you write in this
  worktree while you work.
- Method: `.the-way/task-cycle/change/SKILL.md` (project skill `the-way-make-change`). Read it
  whole; read a file it names (`slice.md`, `ui_check.md` …) only when the step or variant that
  names it comes. Your variant: **"a slice, or the retry of a slice"**.
- Frozen task: `.runs/task-cycles/potwierdzenie-adresu/task.md`; reviewed spec:
  `.runs/task-cycles/potwierdzenie-adresu/spec.md`; plan:
  `.runs/task-cycles/potwierdzenie-adresu/plan.md`. What your slice needs of them is copied below;
  the files are their addresses.
- The product's instructions: `AGENTS.md` in the worktree (read `guidelines/coding.md` before
  changing code, `guidelines/testing.md` before changing tests, and `src/browser/AGENTS.md` when
  working in `src/browser/`). Commit by explicit paths (`git add <path>…`), English messages in
  the repository's style (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`).
  Do not push. Do not run the whole gate (`npm test` without a file); run the focused checks your
  slice names, each as `npm test -- <file>` or the command given, and report each with its command
  and exit code.
- Never deploy, never touch the server, never connect to `outsider.mikr.us` or send real mail
  (D-12; step 4 below).
- Dependencies are installed (`npm ci` ran on the base); the quality tools are in
  `.runs/quality-venv`.

## Answers of step 4

- Trust boundary: **yes** — `src/server/**` (part map, `account-server`): a session-less
  confirmation route, a session route that triggers a send, an outbound SMTP connection with a
  credential read from a file, new startup configuration, a schema step. Crafted input at that
  boundary is checked by every review.
- Irreversible operation: **yes** — schema step 3 of the persistent `loop2_accounts` database on
  the test server, run by the human's deployment (H4) and by the merge (D-11). The cycle prepares
  it and tests it only on temporary databases; it never performs it.

## Answers and settlements the orchestrator gives

- **D-151 is approved by the human** (2026-10-29, "przyjmuję A", recorded on request #37): no test
  reaches Outsider; mail-sending code is tested against a real SMTP server on loopback, routes
  with a stand-in mailer.
- **K1 settled after the spec's review** — copied word for word from the note at the head of
  `spec.md` *Decisions*, which prevails over the spec's Decisions 3, 4 and 12 where they differ:

  > **Settled after review by the orchestrator (2026-10-29, cycle Q2 revised).** The foundation step
  > found that the retire step after `sent` leaves an exception K1 does not allow (a retire that fails
  > after the mail service accepted the message). The cycle changes its own design so that K1 holds
  > whole: **the issue operation stops every earlier unspent link of the same account and purpose in
  > the same transaction that inserts the new row**, before the message is handed to the mailer. There
  > is no separate retire step and no retire failure case. A send that then fails leaves no earlier
  > link working; the player sends again. Where Decisions 3, 4 and 12 below say otherwise ("retire
  > earlier links: after a successful send", "on `sent` retire earlier links", "retiring earlier links
  > throws after the mailer answered `sent`"), this note prevails.

- The foundation entries of this change are written (commits `f545afe`, `06b0385`, `6ec347f`);
  plan rows F1–F33 map to identifiers as `reports/06-foundation-report.md` § "Entries written"
  lists. Changed invariants are ahead of the code until the slices land.
- Checks failing on the base on this machine: `tests/invariants/test_loop2_one_serving_process.py`
  (`Get-NetTCPConnection -State Listen` returns no objects in this environment). It is not a
  check of any slice.

## Base, report and return



- Slice base (recorded before dispatch): `5ab1b5a` (Slice 5 reviewed, PASS). Your commits go on top of it.

- Report path: `.runs/task-cycles/potwierdzenie-adresu/reports/19-slice6-report.md`

- Return only: your status (`done`, `done with concerns`, `questions`, `returned` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path.

- Guideline files to read whole: `guidelines/coding.md`, `guidelines/coding-browser-api-client.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`; and `src/browser/AGENTS.md`.

- The server side is made: `src/server/account-routes.ts` at `5ab1b5a` holds the two routes and the extended bodies your client calls; read their contracts there where the spec passage below leaves a detail.

## Your slice — copied word for word from `plan.md`

### Slice 6 — The browser client's confirmation calls

- **Goal:** `src/browser/account-api.ts` reads a required boolean `emailConfirmed` in every account body (an account without it is `unexpected`); `register` returns the account with the `confirmationMessage` value (`sent`, `limited` or `failed`, anything else `unexpected`); new `confirmEmail(token)` succeeds on 204 only; new `sendConfirmationMessage()` returns the `confirmationMessage` value on 200 only; `invalid-link` and `email-already-confirmed` join the known refusal codes. Requests go to the relative paths with the method and JSON body each route takes, follow no redirect and keep the client's time limit.
- **Change:** `src/browser/account-api.ts` · `tests/account-api.test.mjs`
- **Read:** `.runs/task-cycles/potwierdzenie-adresu/spec.md:195-245` 4. Routes and their contracts ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:378-420` 10. The browser ·
  `.runs/task-cycles/potwierdzenie-adresu/spec.md:348-376` 9. Testing without the real Outsider ·
  plan Foundation entries F2, F3, F19 ·
  `foundations/decisions.md:1996-2009` D-117 · `foundations/decisions.md:1871-1882` D-108 ·
  `foundations/invariants.md:808-816` account-client-requests ·
  `foundations/invariants.md:818-826` account-client-outcomes ·
  `foundations/environment_facts.md:256-260` fetch-same-origin-credentials ·
  `foundations/part_map.md:3-26` browser-view ·
  `src/browser/AGENTS.md` · `guidelines/coding.md` · `guidelines/coding-browser-api-client.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/account-api.test.mjs`, starting from failing cases: an account body without `emailConfirmed` is `unexpected`; each `confirmationMessage` value and an unknown one; `confirmEmail` on 204, 400 `invalid-link` and a 200; `sendConfirmationMessage` on 200, 401 and 409; the paths, methods and bodies sent.
- **Depends on:** Slice 5 · F19

## Current ranges of the foundation entries your *Read* names

The foundation step and earlier slices moved them; these ranges hold, not the plan's. Read each entry whole.

- D-144 — `foundations/decisions.md:2581-2594`
- D-145 — `foundations/decisions.md:2596-2609`
- D-117 — `foundations/decisions.md:1996-2009`
- D-108 — `foundations/decisions.md:1871-1882`
- account-client-requests — `foundations/invariants.md:808-816`
- account-client-outcomes — `foundations/invariants.md:818-826`
- fetch-same-origin-credentials — `foundations/environment_facts.md:256-260`
- browser-view — `foundations/part_map.md:3-26`

## Passage of `spec.md` (`.runs/task-cycles/potwierdzenie-adresu/spec.md:205-256`) — copied word for word

### 4. Routes and their contracts

All new paths join the existing transport and `no-store` gate (`router.all` list) and the JSON
503 of the unconfigured mode; both new routes are `POST` behind `mutationGuards` (D-104).

- `POST /api/email-confirmation` — body exactly `{ "token": <string> }`; no session needed (the
  link alone authorizes, K2), none created; a session cookie, if sent, is handled as on any route.
  Success: 204 after the confirm operation commits. Every token that is malformed, unknown,
  spent, expired, of a blocked account, or of another purpose: 400 with code `invalid-link` and
  message „Odnośnik jest nieważny albo wygasł.” — one answer for all, so it says nothing about
  which. A body of other fields or types: 400 `invalid-request`, as today.
- `POST /api/email-confirmation-message` — body exactly `{}` (as logout); a valid session of an
  unblocked account required, else JSON 401 `unauthenticated` (D-109); the address is always the
  session account's own; no field may name an address or account. An already confirmed account:
  409 with code `email-already-confirmed` and a message; nothing sent. Otherwise the send step
  (below) and 200 with `{ "confirmationMessage": "sent" | "limited" | "failed" }`.
- `POST /api/accounts` — unchanged up to and including the session (D-102 ticket settled as
  today, session stored before success, D-109); then the send step, then 201 with `id`, `email`,
  `emailConfirmed: false` and `confirmationMessage`. When the session cannot be stored the answer
  stays the 503 of today and no message is sent; the player signs in later and resends.
  A refused registration (invalid, duplicate, limited) sends nothing.
- `GET /api/account` and `POST /api/session` — the account body gains `emailConfirmed`
  (boolean); nothing else changes.
- The send step, shared by the two sending routes: create a token, issue its link row with the
  D-105 limits (Decision 1; `limited` ends the step without contacting Outsider), compose the
  message with the link, hand it to the mailer, and on `sent` retire earlier links. It never
  throws to the route; each failure has one outcome:
  - the mailer fails or misses its deadline: `failed` (Decision 6);
  - issuing the row throws (for example `SQLITE_BUSY` after the busy timeout while the owner's
    command holds the write lock, or a disk error): `failed`, and no message is sent, since a
    message whose link has no row could never confirm;
  - retiring earlier links throws after the mailer answered `sent`: `sent` — the message went and
    its link works — and the earlier links stay usable until they expire or are spent by a later
    send, confirmation or block; the step logs one fixed line without any token or address. This
    is the one case where K1's "a new link invalidates earlier ones" is not met, accepted because
    reporting a delivered message as failed would make the player send again into the same
    fault;
  - issuing finds the account blocked (a block committed after the route checked the session,
    Decision 3): at registration `failed`; on the resend route the answer is JSON 401
    `unauthenticated`, as for every request of a blocked account's deleted session (D-137).
  The registration answer is 201 with the account in every one of these cases (To do 1: the
  account is created and the player enters the headquarters whatever the send does).
- A database failure in `POST /api/email-confirmation` is an ordinary server error (500, as today
  from the error handler); the page shows the client's failure message and keeps the fragment,
  so a reload tries again (Decision 2).
- Rejected: limits and failures as error statuses (429, 503) on the resend route while
  registration reports them in a 201 body — two representations of one outcome; the client and
  the header would map both. One `confirmationMessage` value in both bodies, read by one client
  function.
- Cost if wrong: an HTTP-minded reviewer may prefer 429 for `limited`; the change is local to the
  route and the client.

## Passage of `spec.md` (`.runs/task-cycles/potwierdzenie-adresu/spec.md:388-431`) — copied word for word

### 10. The browser — client, header row, confirmation notice

- Client (`src/browser/account-api.ts`): the account gains a required boolean `emailConfirmed`
  (an account body without it is `unexpected`); `register` returns the account and the
  `confirmationMessage` value (`sent`, `limited` or `failed`, else `unexpected`); new
  `confirmEmail(token)` → success on 204 only; new `sendConfirmationMessage()` → the
  `confirmationMessage` value on 200 only; `invalid-link` and `email-already-confirmed` join the
  known refusal codes.
- Header row: a new browser module `src/browser/view/email-status.ts`, placed in the header after
  the title, „Wyloguj” and its warning, on a line of its own (full width), shown only for a
  signed-in player whose address is unconfirmed, on every screen of the game. It holds one
  sentence and the shared button „Wyślij ponownie”. The sentence is „Adres e-mail
  niepotwierdzony.” until a send made in this page ends, then the outcome's sentence replaces it:
  `sent` — „Wysłaliśmy odnośnik potwierdzający na <adres>.” with the account's address;
  `limited` — „Za dużo wiadomości. Spróbuj ponownie za godzinę.”; `failed` — „Nie udało się
  wysłać wiadomości. Spróbuj ponownie później.”; a client failure (no connection, unexpected
  answer) — the client's own message. The button stays beside every sentence. While waiting it is
  disabled and reads „Wysyłanie…” (`setButtonWaiting`), and focus returns to it after the answer.
  Right after registration the row starts with the registration's outcome sentence. On
  `email-already-confirmed` the row disappears. Each request takes the next number and only the
  last answer acts; the row is removed with the game on logout.
- Roles: „Adres e-mail niepotwierdzony.” `text-secondary` (task); „Wysłaliśmy odnośnik
  potwierdzający na <adres>.” `text-secondary` — a note of what happened while the address is
  still unconfirmed, not that something is in order (`positive`, D-39), and not a caution; the
  limit, failure and client-failure sentences `warning` (D-39: something was not carried out).
- Confirmation on load (`src/browser/view/app.ts`): when the fragment holds a token, the page first
  shows „Potwierdzanie adresu…” in `text-secondary` in the place where it shows „Sprawdzanie
  logowania…” (the same meaning: the page waits for the server), sends the confirmation, and only
  then runs the session check, so the header reflects the confirmed state. The result — „Adres
  e-mail potwierdzony.” in `positive` or „Odnośnik jest nieważny albo wygasł.” in `warning`, or the
  client's failure message in `warning` — stands as one sentence above the screen the session
  check leads to (the account forms or the game), and leaves at the next change between forms and
  game. Under SameSite=Strict the navigation from the mail client carries no cookie, but the
  page's own requests do, so the session check sees an existing session.
- Account screen: the registration's `signedIn` passes the outcome on, so the header row starts
  with it; sign-in and reload start with „Adres e-mail niepotwierdzony.”.
- Styles in `src/browser/styles.css` read tokens only; no new token or role.
- Kitchen-sink page: the header row with „Wyślij ponownie” waiting („Wysyłanie…”) and with a
  refusal sentence beside the button (To do 8), with made-up values.
- Rejected: the outcome sentence added after „Adres e-mail niepotwierdzony.” — the task says the
  outcome sentence "stoi tam", in that place; two sentences lengthen a header row shown on every
  screen. `positive` for „Wysłaliśmy…” — would read as "done" while the address is unconfirmed.
- Cost if wrong: one sentence per row versus two is a change local to the row module.

## Passage of `spec.md` (`.runs/task-cycles/potwierdzenie-adresu/spec.md:358-387`) — copied word for word

### 9. Testing without the real Outsider

- The mailer (Decision 6) is tested as an integration test against a real SMTP server on
  loopback, started in the test process from the `smtp-server` package (devDependency at the
  version whose `nodemailer` dependency equals the pinned one; registry latest 3.21.1 depends on
  `nodemailer` 10.2.1), port 0, readiness awaited with a time limit, closed after each case even
  on failure. Cases: a message is submitted only after STARTTLS and authentication with the
  configured login and password; a server that offers or completes no STARTTLS receives no
  message and the outcome is `failed`; a server that stops answering yields `failed` within the
  shortened deadline; a crafted recipient (CR/LF, comma, angle brackets, a second `@`) yields
  `failed` and nothing is submitted; the submitted message has exactly the one recipient, the
  From, To and Subject of K5, a text-only body with the link on its own line; nothing written to
  the console holds the password, the token or the link. The server's certificate is a test
  certificate the case trusts through the mailer's seam; how the test obtains it is left to the
  maker, provided no network is used and verification is not turned off.
- Routes are tested on real HTTP and SQLite (as `tests/http.test.mjs` does) with a stand-in
  mailer that records messages and returns the outcome the case chooses or never answers — the
  route reacts to the outcome; the SMTP operation is proved by the mailer's own tests (D-84).
  The token for confirming is read from the recorded message's link. Among the cases: a block
  committed through a second connection while the stand-in mailer holds its answer spends the
  link, which confirms nothing after unblocking; a block committed before issuing leaves no row
  and sends nothing; a failure to issue the row still answers registration with 201 and
  `failed`.
- The database step and the link operations are tested on real files in
  `tests/account-storage.test.mjs`, the version-2 database written by the test's own schema.
- Startup refusals are tested as today in `tests/startup.test.mjs`.
- Pure browser functions (reading the fragment, the outcome-to-sentence mapping) are unit tests
  under `tests/view/`; the client's new calls go to `tests/account-api.test.mjs`.
- No test reaches the real Outsider; delivery is H4, done by the human.
