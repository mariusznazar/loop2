# Report — spec design, task `blokada-konta`

Status: done
Spec: `.runs/task-cycles/blokada-konta/spec.md`

## Questions sent and their answers

None. Each of the four carried questions is a design choice the cycle delegated to the spec, and
each has a way that fulfils the task without widening it. The smaller choices no source fixes
were settled as the smallest reversible readings and written down in the spec, so the
orchestrator and the reviewer can overturn them:

- HTTP status of the blocked-login refusal: 403 with the new code `account-blocked`
  (Decision 3). Reversible: one status in the route and one entry in the client's code list.
- The command's verbs, output and file: English `block` / `unblock`,
  `src/server/account-block.ts`, like `src/server/measure-passwords.ts` and the English deploy
  skill. The task's `zablokuj` was an illustration in the question's material (Decision 4).
- The command reports "already blocked" / "was not blocked" beside the two outcomes To do 1
  names, and exits 0 when the account ends in the requested state (Decision 4).
- The command never creates a database: a missing file at `LOOP2_DATABASE_PATH` is an error
  (Decision 4).
- The command reads only `LOOP2_DATABASE_PATH`, not the session secret (Decision 4).

## Ways weighed and why the rejected ones lost

1. **Migration from version 1.** Chosen: one ordered list of steps for new and existing
   databases, inside the existing `BEGIN IMMEDIATE` transaction, with steps never edited once
   deployed. Rejected: creating the latest schema directly beside separate upgrade steps (two
   definitions that must agree, and they can drift); rebuilding tables at every version (moves
   every row and holds the lock longer for a change that only adds a column).
2. **Session invalidation.** Chosen: delete the account's session rows in the same transaction
   that sets the blocked state, guard the session insert by the account's state in the same
   statement, and treat a blocked account as no account in `sessionAccount`. SQLite allows one
   writer at a time, so a login in progress stores its session either before the block (then the
   block deletes it) or after it (then the guard stores nothing); unblocking has no rows to
   revive. Rejected: marking rows invalid (every read, renewal and cleanup must respect the mark,
   and unblocking must never clear it); a per-account session generation (new columns and a
   comparison on every read for what deletion already gives); deletion without the guard (the
   login race the task names would store a session after the block).
3. **Attempt thresholds.** Chosen: a blocked login with the correct password is settled by
   `release()` — neither a failure nor a success — as D-102 already treats a capacity refusal; a
   wrong password still `fail()`s; an existing email lock still refuses first. Rejected: counting
   it as a failure (after five tries the address locks and the player sees „Za dużo prób…”
   instead of To do 4's message; it spends the shared IP budget); counting it as a success (it
   would clear the failure history on a refused login, so interleaved guesses never lock).
4. **The command's access to the database.** Chosen: a separate process opening its own
   `AccountDatabase` on the same file, under the same opening rules, with D-112 reworded to
   admit that short-lived second connection. Rejected: an owner-only HTTP route on the running
   server (a new route inside the trust boundary that must be proven unreachable through the
   tunnel and guarded by a secret); a signal or a watched file (a new channel into the server with
   no outcome to report to the owner).

## The four checks

1. Placeholders, `TBD`, empty sections: none found.
2. Contradictions: the first draft fixed the foundation method (`test`) of the projected
   invariants, which is the foundation step's to word; reworded to "checked by a test of this
   change". No other contradiction between sections, with the task or with the foundation as the
   spec proposes to change it. Two foundation texts contradict the task as it stands and the spec
   names their change: D-100 ("An unsuccessful credential login shows „Nieprawidłowy adres e-mail
   lub hasło.”") and D-112 ("opens one application-owned SQLite connection", "initializes
   version 1"). One existing test must change because its unknown version, 2, becomes known
   (*Constraints*).
3. Scope: one change — the migration exists only to carry the blocked state, and the command,
   the routes and the client serve the same feature. It divides naturally into slices if the plan
   wants them: database and migration; routes and browser client; command; skill and guidelines.
   It is not several independent changes.
4. Requirements read two ways, and the reading chosen: "the command says whether it blocked the
   account" — outcomes and exit codes fixed in Decision 4; "a session of a blocked account gives
   no access" — fixed as no stored row plus a check at authorization (Decision 2); the login race
   — fixed as no session, answered either 403 or 503 (Decision 2, *Left to the maker*).

## Reaches beyond the dispatch

- `src/server/configuration.ts` and `src/server/app.ts` — whole; to see how the database is opened
  at startup, which error a failed open reports, and that the session middleware runs on static
  requests too.
- `src/browser/view/account-screen.ts`, lines 140–195 — to confirm a refusal's message goes to the
  login form's warning without regard to status, so no screen change is needed.
- `tsconfig.server.json`, `package.json` (scripts) — that a new `src/server/*.ts` file is built to
  `dist/server/`.
- `tests/deploy/test_account_storage.py` (docstring and the replacement case),
  `tests/invariants/test_account_server_express_http.py` (lines 100–130),
  `tests/agent_workflow/test_loop2_deploy_skill.py` (test names) — to see which tests read
  `src/server/` or require the two skill copies to be byte-identical.
- `tests/startup.test.mjs` — search for `schema` only; it uses version 99 for the unknown schema,
  so it stays valid.
- `foundations/glossary.md` — headings and a search for "block"/"lock"; no existing term.
- `foundations/invariants.md` — `loop2-one-serving-process` (whether a second entry point in the
  container conflicts: it does not, the command listens on nothing); the entries printed beside
  the requested ones (`player-self-registration`, `player-password-login`,
  `email-verification-nonblocking`, `account-save-sqlite-access`, `loop2-shared-public-origin`,
  `account-request-transport`, `account-startup-configuration`) were read whole as they came with
  the range.
- `foundations/decisions.md` — D-98, D-105, D-108, D-113 came whole with the range read for the
  requested entries.
- The project definition in the vault was not searched; the task's quotations sufficed.
