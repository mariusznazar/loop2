# Slice 1 report — schema version 3 and the store of emailed links

- **Status:** done
- **Commit:** `589f4d7` feat: :sparkles: add schema version 3 with email confirmation and the store of emailed links (on top of `6ec347f`; slice base `7a633a7`)

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/server/database.ts` | 177 | 6 |
| `src/server/account-block.ts` | 3 | 3 |
| `tests/account-storage.test.mjs` | 525 | 9 |

## What was made

- Schema step 3, appended after step 2 (steps 1 and 2 untouched): `accounts.email_confirmed_at INTEGER` (nullable, null for every moved account); STRICT table `emailed_links (token_digest TEXT PK, account_id → accounts(id) ON DELETE CASCADE, purpose CHECK IN ('email-confirmation','password-reset'), created_at, expires_at, spent CHECK IN (0,1))`, indexes `emailed_links_account`, `emailed_links_created`.
- `Account` carries `emailConfirmed`; the stored-account read validates the time as null or a safe integer.
- `issueLink(request, limits)` → `issued | limited | blocked`: one `BEGIN IMMEDIATE` transaction reads the block, counts rows created within the window (all, and the account's), and only for an unblocked account below both limits stops every unspent link of the same account and purpose and inserts the new row. Unknown account throws.
- `confirmEmailAddress(digest)` → `confirmed | invalid`: one transaction; usable = purpose `email-confirmation`, unspent, `expires_at > now`, account not blocked (read in the same transaction); sets the time only if null and stops every unspent confirmation link of the account. A refusal changes nothing.
- `blockAccount` also stops every link of the account (both purposes) in its existing transaction; `unblockAccount` unchanged (restores none).
- `pruneExpiredLinks()` deletes up to 1000 rows that are both expired and at least one hour old; run at opening and by the periodic timer beside the session prune.
- `account-block.ts`: report lines now say the account's emailed links no longer work / stay ended; behaviour, exit codes and refusals unchanged.

## Checks

| Command | Exit | Note |
|---|---|---|
| `npm test -- tests/account-storage.test.mjs` (stubs, no schema step) | 1 | failing run: the version-1 and version-2 moves fail on `2 !== 3`, the failing step-3 case on "Missing expected exception", link cases on their assertions (some on `no such table`) |
| same, after schema step 3, methods still stubs | 1 | migration cases pass; every link case fails on its assertion (`0 !== 30`, missing exception, missing row) |
| same, after implementation | 0 | 43/43 |
| same, `blockAccount`'s link stop disabled for a moment | 1 | `unblock-restores-no-link` cases fail on `0 !== 1` (second-connection case and owner's-command case); code restored |
| same, block reads in `issueLink` and `confirmEmailAddress` disabled for a moment | 1 | the version-2 case, the blocked-confirmation case and the second-connection case fail on their assertions; code restored |
| `npm test -- tests/account-storage.test.mjs` (final, committed code) | 0 | 44/44 |
| `npm test -- tests/http.test.mjs` | 0 | 25/25, unchanged |
| `npm test -- tests/startup.test.mjs` | 0 | 12/12, unchanged |
| `npx eslint --max-warnings 0` on the three files | 0 | |
| `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore` on the three files | 0 | |
| `npm run typecheck` | 0 | |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |

Not run: the whole gate (`npm test` without a file) — not this slice's to run (WAY-160). The quality Python tests (`tests/quality/`) were not run as files; ESLint and Prettier were run directly on the changed files instead.

## Tests written (each names the break it catches)

- Version-2 database written by the test's own schema (7a633a7's step 1 + step 2, one blocked account) opens as version 3 with every account, blocked state and session kept and every account unconfirmed; it then issues, refuses a blocked account and confirms, all outlasting a reopen.
- A failing step 3 (pre-existing `emailed_links`) leaves version 2, the rows unchanged and `accounts` without the new column (the ALTER rolled back).
- Account limit: three issued within the hour, fourth `limited`, records nothing and stops no link; at exactly one hour after the first it no longer counts (boundary `created_at > now - window`).
- Both purposes share the account limit; thirty across accounts refuse the thirty-first until the hour passes; the count survives close and reopen (`account-message-limits`, "also across a restart").
- Issue refuses a window above the one-hour record age, zero lifetime, zero limit and an unknown account, recording nothing.
- Confirm: once only; stops the account's other confirmation links (a second unspent one written directly, since issuing cannot produce it) but not its reset link; unknown, reset-purpose and empty digests change nothing; works at `expiry - 1`, not at `expiry`; a later issue stops the earlier link at once, before any send, so a failed send leaves no earlier link; a blocked account's link refuses even when the block did not stop it.
- Block through a second connection stops links of both purposes issued before it, confirms nothing after unblocking; a block before an issue records nothing; a new link after unblocking works.
- The owner's command, in its own process, stops the account's links and its unblock brings none back.
- Cleanup: expired links younger than an hour are kept and still count; expired-and-hour-old ones go, unexpired ones stay; batches of 1000 at prune, at opening and by the timer.
- Changed existing tests, with reasons: the newer-version case moves from 3 to 4 (3 is now known); the version-1 move now expects version 3 and `emailConfirmed: false` (the current version moved; the version-1 database still passes through steps 2 and 3 with its rows intact).

## Own-work check (section 3)

- **Requirement most likely unmet:** "a block committed through a second connection spends a link issued before it" for the real path — the owner's command in its own process, whose opening also prunes links by the real clock. My second-connection case runs in-process with a fixed clock, and with the fixture's fixed time the command's prune would delete the rows, making a confirm return `invalid` for the wrong reason.
- **Check:** a test running `dist/server/account-block.js block|unblock` against a database whose server connection uses the real clock, asserting the rows are spent (not gone) and confirm nothing after unblocking.
- **Showed:** passes on the code; fails on `0 !== 1` with `blockAccount`'s link stop disabled.

## Reaches beyond the dispatch

- `foundations/decisions.md:2581` D-144 (whole) — the `email-confirmation-link` invariant derives from it; it settles one refusal for every bad token and that a confirmation stops every other confirmation link.
- `.runs/task-cycles/potwierdzenie-adresu/spec.md:130-145` Decision 2 — for the form of the digest the methods take (SHA-256, base64url, 43 characters), which decides the key column's type (`TEXT`).
- `spec.md`/`plan.md` searched for "digest" to find the above; plan row at `plan.md:383` confirmed Slice 1's tests compute digests themselves.

## Choices made

- **Lifetime, not expiry, as the argument:** `issueLink` takes `lifetimeMs` and computes `expires_at = created_at + lifetime` from the database's own clock, so D-143's "from the moment it is recorded" holds with one clock. Rejected: passing `expiresAt` from the route's clock — two clocks could disagree. Cost if wrong: Slice 5 passes a lifetime instead of a time.
- **One-hour record age as a database constant (`linkRecordAgeMs`)**, from D-112's "emailed links both expired and older than one hour". `issueLink` refuses a window longer than it, so pruning can never remove a row a window still counts. Rejected: a pruning option or a policy import — the plan keeps policy constants out of this slice. Cost if wrong: a later longer window throws instead of silently undercounting.
- **Window boundary:** a row counts while `created_at > now - window`; it is prunable when `created_at <= now - 1 h` and `expires_at <= now`. So a row exactly one hour old no longer counts and may go, and the two conditions never overlap.
- **Unknown account in `issueLink` throws** (the route treats a throwing issue as a failed send, spec Decision 4). Rejected: an outcome `blocked` — it would misreport.
- **Cleanup error text** changed from "Session cleanup failed" to "Account database cleanup failed", since the timer now prunes links too; no test or code depends on the text.
- Plan and code agreed; no adaptation of `slice.md` § "When the plan and the code disagree" was needed.

## Problems observed

- The first version-2 fixture inserted the version-1 rows after the step-2 ALTER (`table accounts has 5 columns but 4 values were supplied`); fixed by writing the rows before the ALTER, as a moved test-server database holds them. Test setup only.
- `boundedInteger`'s refusal message reads "Invalid database timing option" also for a bad limit; harmless (never shown to a player), noted for the reviewer.
- A Bash heredoc holding a long Python edit failed on quoting; the edit was run from a scratchpad file instead. No effect on the result.
