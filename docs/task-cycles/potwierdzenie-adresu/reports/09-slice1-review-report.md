PASS 589f4d7

# Review — Slice 1 of `potwierdzenie-adresu` (range `7a633a7..589f4d7`)

Reviewed: the foundation entries of commits `f545afe`, `06b0385`, `6ec347f` and the slice's code,
commit `589f4d7` (`src/server/database.ts`, `src/server/account-block.ts`,
`tests/account-storage.test.mjs`). `git rev-parse HEAD` in the worktree is
`589f4d7107942a177994eaab14f2a6e767db4f9b`, the head given.

Counts: blocking 0 · Minor 3 · out of scope 0 (Declined to judge: 4 lines).

## Findings

### Critical

None.

### Important

None.

### Minor

**m1 — "set the confirmation time only if still null" has no test** —
`src/server/database.ts:448-455` (`UPDATE accounts SET email_confirmed_at = ? WHERE id = ? AND
email_confirmed_at IS NULL`). Spec Decision 3 (`spec.md:257-260`): "set the account's
confirmation time if still null". Dropping `AND email_confirmed_at IS NULL` (probe M9 below)
leaves all 44 cases passing. It can only matter when an unspent confirmation link exists for an
already confirmed account, which `issueLink` allows (the 409 for a confirmed account is the
route's, Slice 5) — for example, a resend that has passed the route's check while a confirmation
commits. The effect would be a later confirmation time, with `emailConfirmed` unchanged. That
makes it polish, not a defect a player sees. A fix would be one assertion: issue a second
confirmation link after confirming (through `issueLink`), confirm it, and check that
`email_confirmed_at` stays at the first time.

**m2 — `guidelines/testing.md:10-11` now contradicts D-73 within this range** — commit `06b0385`
makes D-73 list "D-74, D-75, D-76, D-77, D-78, D-79 and D-151" (`foundations/decisions.md`, D-73),
but `guidelines/testing.md:10-11` still says „jego sześć odstępstw to D-74, D-75, D-76, D-77, D-78
i D-79”. The foundation writer flagged this under Concerns (`reports/06-foundation-report.md:199-201`).
Slice 10's *Goal* (`plan.md:312`) lists the foreign-service row and the route rows but not this
line, and `foundation_check.py` passes with the mismatch, so nothing mechanical catches it. It
belongs to the task (To do 13) and to Slice 10, not to this slice's code, so it does not block
here. Recommended: the orchestrator adds "the count of D-73's departures at lines 10–11 and the
*Decision* list of «Choosing the level»" to Slice 10's dispatch.

**m3 — misleading refusal text for a bad limit** — `src/server/database.ts:98-103, 374-377`:
`issueLink` validates `windowMs`, `total` and `perAccount` with `boundedInteger`, whose error is
"Invalid database timing option". The executor named this already. It is never shown to a player
(a throwing issue becomes `failed`, spec Decision 4). It only misleads whoever reads a stack trace.

## Judged and found sound (the claims most likely to be false, checked first)

- **The issue-versus-block race across connections.** `issueLink` and `blockAccount` each run in
  one `BEGIN IMMEDIATE` transaction (`database.ts:177-188`). In WAL that takes the write lock and
  reads the latest commit. The block is read inside the insert's transaction
  (`database.ts:380-384`), so the two serialize: block first → `blocked`, nothing recorded; issue
  first → the block's `UPDATE emailed_links SET spent = 1 WHERE account_id = ?`
  (`database.ts:345-347`) spends the new row. Both orders are tested through a second connection
  (`tests/account-storage.test.mjs`, "a block committed through another connection…") and through
  the owner's command in its own process ("the owner's command stops every emailed link…").
  `confirmEmailAddress` reads `accounts.blocked = 0` in the same statement and transaction.
- **Hostile input at `src/server/**`.** Every value goes in as a bound parameter, including the
  digest, account id, purpose and times. The only interpolation is the constant
  `PRAGMA user_version = ${currentVersion}`. A purpose outside the two is refused by the CHECK. A
  digest collision on the primary key throws and rolls back, together with the stop of earlier
  links. An empty or unknown digest yields `invalid` and changes nothing (tested).
- **The operation that cannot be undone only prepares.** Step 3 is appended and steps 1 and 2 are
  byte-identical (diff). Nothing in the range touches `deploy/`, `compose.yaml` or the server. The
  move is tested on temporary files from a version-2 database written by the test's own schema,
  with one blocked account. Every account, its blocked state, every session and every value is
  kept, every account is unconfirmed, and the data outlasts a reopen. A failing step 3 rolls back
  the `ALTER` as well (the column list is asserted). The version-1 database also moves through
  steps 2 and 3. `INTEGER` is a valid type of a STRICT table, and a nullable added column needs no
  default.
- **K1 as the orchestrator settled it (way B).** Earlier unspent links of the same account and
  purpose are stopped in the inserting transaction, only after the limit and block checks. A
  `limited` outcome stops nothing (tested, and probe M13). Other accounts and the other purpose
  are untouched (probe M3).
- **The limits.** The count covers every row created within the window, of both purposes, spent
  or not (probe M17). Admission is strictly below both limits (M7, M8). The window is half-open
  at one hour (M2). The count survives a reopen. Pruning needs both `expires_at <= now` and
  `created_at <= now - 1 h`, and `issueLink` refuses a window longer than that hour (M14), so
  pruning never readmits a counted message. The prune runs in batches of 1000, at opening and on
  the timer (M16).
- **Foundation entries against the task, the projection and the spec.** D-143 matches K1 with
  the orchestrator's way B, and its *Rejected* records the alternative. D-147 = K9. D-148 and the
  D-137 change = K10 and To do 16. D-149 = spec Decision 1. D-112 = spec Decision 3 as amended,
  and its text says what the code does (version 3, the column "unset until it is", the link table,
  the indexes, the prune, the block spending links, the issue reading the block and stopping
  earlier links). D-144 = K2 and spec Decision 2. D-145 = K3, To do 6 and question 8. D-146 = K5
  and To do 2. D-44 = K4. D-111 = K6 and spec Decision 7. D-13 and D-17 = K7 and spec Decision 8.
  D-140, D-141 and D-142 hold the confirmation part of the gate-approved projections, word for word
  where carried. `account-email-via-outsider` and `account-email-nodemailer-starttls` are the
  projections narrowed to confirmation. `mikrus-outsider-mail` has the projected sentence and
  quotes. D-151 = the human's answer to question 1 (approved 2026-10-29, request #37 per the
  handoff). Every *Verification* ↔ *Derives from* pair among the new and changed entries is
  reciprocal (`account-message-limits` ↔ D-105 and D-149; `email-confirmation-link` ↔ D-143, D-144
  and D-148; `unblock-restores-no-link` ↔ D-137 and D-148; the two Outsider invariants ↔ D-141 and
  D-142; `player-password-login` and `email-verification-nonblocking` ↔ D-140). Invariants with
  method `test` whose tests come in later slices are ahead of the code, as the handoff allows.
- **Tests carrying invariant markers.** `account-message-limits`, `email-confirmation-link` and
  `unblock-restores-no-link` are new. **Changed invariant tests** (marked
  `account-database-schema`/`account-schema-lifecycle`): "schema reopen preserves… rejects a newer
  version" moves the unknown version from 3 to 4, and "a version-1 database opens as version 3…"
  now expects version 3 and `emailConfirmed: false`. Both changes give their reason in a comment
  (version 3 is now known; the test server may still be at version 1), as „Changing an existing
  test” asks.
- **The block command.** Only its report lines changed. Exit codes and refusals are unchanged.
  The deploy skill (`.claude/skills/loop2-deploy/SKILL.md:140`) describes the block without links;
  plan F9 gives that to Slice 9.

## Declined to judge

- The 409 for an already confirmed account and the send step's outcomes: the routes are Slice 5
  (spec Decision 4); this slice takes no position.
- The changed D-109, `account-session-authorization`, `account-client-outcomes` and
  `loop2-host-sharing` being ahead of the code: Slices 5, 6 and 9 make them true, as the handoff
  allows.
- A rollback of code across step 3 on the test server (main's code refuses a version-3 database
  after H4 deploys the branch): D-112's *Rationale* already accepts this. It is the deployment's
  concern, not this slice's code.
- The window boundary (a message exactly one hour old no longer counts): it is a reading of D-105's
  "per hour" that D-149 and the tests state consistently, not a defect.

## Checks run

All in a separate worktree of the head commit
(`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\8920f01f-a1b3-457e-b488-3f70c8b0c5f7\scratchpad\rv-589f4d7`,
detached at `589f4d7`, `node_modules` joined to the reviewed worktree's), unless noted.

| Check | Exit | Result |
|---|---|---|
| `npm test -- tests/account-storage.test.mjs` | 0 | 44/44 |
| `npm test -- tests/http.test.mjs` (file unchanged in the range) | 0 | 25/25 |
| `npm test -- tests/startup.test.mjs` (file unchanged in the range) | 0 | 12/12 |
| `npx eslint --max-warnings 0` on the three changed files | 0 | |
| `npx prettier --check --no-config --no-editorconfig --ignore-path .gitignore` on the three files | 0 | |
| `npm run typecheck` | 0 | |
| `python -B .the-way/elements/common/foundation_check.py`, run in the reviewed worktree (read-only: it writes only a temporary attributes file; `git status` clean afterwards) | 0 | 0 errors |
| `python -B mutate.py` (scratchpad): 17 single mutations of `src/server/database.ts`, each followed by `npm test -- tests/account-storage.test.mjs`, file restored after each | — | 16 killed (exit 1), 1 survived (M9, finding m1); log `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\8920f01f-a1b3-457e-b488-3f70c8b0c5f7\scratchpad\mutations.log` |

Mutations killed: M1 expiry `>`→`>=`; M2 window `>`→`>=`; M3 the issue stops both purposes; M4
the confirmation spends both purposes; M5 the confirmation accepts any purpose; M6 the prune
ignores record age; M7/M8 limits `>=`→`>`; M10 the block spends only confirmation links; M11 the
issue ignores the block; M12 the confirmation ignores the block; M13 earlier links stopped before
the limit check; M14 the window is not capped at the record age; M15 the new column defaults to
confirmed; M16 no prune at opening; M17 the count covers only unspent rows. Survived: M9 (the
confirmation overwrites the time).

Not run: the full gate (`npm test` without a file), which is the orchestrator's; the quality
Python tests as files (ESLint and Prettier were run directly instead).

## Reaches beyond the dispatch

- `.runs/task-cycles/potwierdzenie-adresu/spec.md:96-107` (the orchestrator's note at the head
  of *Decisions*), `:130-155` (Decision 2, the digest form), `:205-260` (Decision 4, where the
  route's 409 and outcomes sit), `:276-357` (Decisions 6–8) and `:460-535` (*Foundation entries*) —
  to judge the fidelity of D-111, D-13, D-144, D-146 and the entries list, which the handoff says
  this review judges.
- `.runs/task-cycles/potwierdzenie-adresu/plan.md:7-48` (rows F1–F33) and `:310-333` (Slice 10) —
  the rows the foundation entries implement, and whether Slice 10 covers m2.
- `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md:240-340, 1755-1785,
  2365-2378` — the gate-approved projections behind D-140–D-142, the two Outsider invariants and
  `mikrus-outsider-mail`, to check the partial entries word for word.
- `src/server/account-routes.ts` (grep for `Account` and response bodies) — to confirm that the new
  `emailConfirmed` field leaks into no response before Slice 5 (bodies pick `id` and `email`).
- `.the-way/elements/common/foundation_check.py:515-545` — to confirm the check writes nothing into
  the reviewed worktree before running it there.
- `foundations/decisions.md` D-01 heading — the target of D-142's "derives from D-01".
