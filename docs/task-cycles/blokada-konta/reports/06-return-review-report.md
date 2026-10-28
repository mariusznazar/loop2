FAIL cb271909768908cde616d9f49d97d4fe776a0a67

# Review of the return step — task `blokada-konta`

- Reviewed: the return step's commits, range `81cb7c6..cb27190` (one commit, `cb27190`), as
  section 2 of `.the-way/task-cycle/review/SKILL.md` gives, against the frozen task
  (`.runs/task-cycles/blokada-konta/task.md`) and the entries the return step writes or corrects:
  the new environment fact `sqlite-wal-concurrency`, D-112's *Based on*, the `account-server`
  entry of `foundations/part_map.md`.
- `git rev-parse HEAD` = `cb271909768908cde616d9f49d97d4fe776a0a67`, the head given; worktree
  clean before and after the review.
- Counts: blocking 1 (Important), Minor 0, out of scope 0.

## Findings

### Critical

None.

### Important

**1. `account-session-storage` does not rest on `sqlite-wal-concurrency`, although its clause
"stores no session for a blocked account" holds against the operator's second connection only
because SQLite lets one writer at a time write** — `foundations/invariants.md:776`–`:784`
(*Rests on:* `express-session-store-contract · node-sqlite-database ·
express-session-cookie-lifecycle · cookie-serialization-validation`). Within the task.

- What is wrong: the return step wrote the fact for the claim of D-112's rationale that "a block
  committed while a login is in progress either deletes the session that login stored or makes
  its write store nothing" (`foundations/decisions.md:1927`). D-112's *Verification* names
  `account-session-storage` as the invariant that checks the clause carrying that claim ("a
  session write for a blocked account stores nothing", `foundations/decisions.md:1919`), and the
  invariant states it as "stores no session for a blocked account". In the code at `81cb7c6` the
  clause is made true by one guarded autocommit statement in the server's connection
  (`src/server/database.ts`, `writeSession`, the `INSERT … WHERE NOT EXISTS (SELECT 1 FROM
  accounts WHERE id = ? AND blocked = 1)` with its comment "a block committed by another
  connection either precedes it and stores nothing or follows it and deletes what it stored"),
  racing the block that `src/server/account-block.ts` commits through a second connection
  (`blockAccount`, `BEGIN IMMEDIATE`, update and delete, commit). The guard decides the outcome
  only because the two writes cannot overlap: were two writers allowed at once on their own
  snapshots, the guarded insert could read "not blocked" while the block's `DELETE` misses the
  new row, and a session of a blocked account would be stored. So whether a commit makes the
  invariant's sentence true depends on the condition the new fact holds — exactly what
  `.the-way/elements/environment-facts/template.md`, "Which facts are written", asks an
  invariant's *Rests on* to name (WAY-73).
- The return step's report claims the opposite: "No invariant rests on the fact.
  `blocked-account-access` and `unblock-restores-no-session` hold through the guard and the
  authorization check whatever the interleaving, so no invariant's *Rests on* gains it."
  (`reports/05-return-step-report.md:37`–`:39`). Its reasoning covers only those two invariants,
  and for them I agree: `blocked-account-access` holds through `sessionAccount()` refusing a
  blocked account (`src/server/account-routes.ts:53`) whatever was stored, and
  `unblock-restores-no-session` speaks only of sessions removed by the block. It never considers
  `account-session-storage`, the invariant D-112 names for the very clause the fact was written
  for. The author should also judge `player-server-session` (`foundations/invariants.md:836`):
  its "invalidates that record on … account blocking" would be false for a record a concurrent
  login stored after the block's delete, so the same condition may decide it too.
- Why it matters: the foundation is to say what the code rests on. A later change of the fact —
  or of the store, the journal mode or the connections that write the database (tasks 20, 16 and
  21 add schema versions to this same database) — reaches the invariants through their *Rests
  on* (WAY-33); with the fact named only by D-112, the invariant whose test protects the race
  outcome is not reached directly, and the report's sentence leaves a false claim in the cycle's
  record. Its tests do not cover the cross-connection case either (the `account-session-storage`
  test "a session write for a blocked account stores nothing, also under an identifier it held",
  `tests/account-storage.test.mjs:392`, blocks through the same connection), so nothing else in
  the repository shows the dependence.
- Evidence: the lines quoted above; the source passage itself ("since there is only one WAL
  file, there can only be one writer at a time", verified below).
- Fix expected in the return step's commits: add `sqlite-wal-concurrency` to the *Rests on* of
  `account-session-storage` (and of `player-server-session`, if the author finds its sentence
  depends on it as argued), or state in the report why the invariant's truth does not depend on
  it; correct the report's sentence either way. No test changes are needed for it.

### Minor

None.

## What was checked and found matching

- **`sqlite-wal-concurrency` form** (`foundations/environment_facts.md:316`–`:320`): one sentence,
  present tense, no word moving with the date; identifier names the subject, not a value or
  edition; *Source* in the form for a page without editions — page address, archived copy with
  its date, place, passage word for word, date read. The sentence says no more than the passage
  ("can run at the same time" / "only one writer at a time"); "of one database" adds nothing the
  page does not mean. Placed before *Withdrawn identifiers*.
- **Source verified myself**: the live page and the cited capture
  (`https://web.archive.org/web/20261027035005id_/https://www.sqlite.org/wal.html`) are
  byte-identical (42143 bytes); the capture answers 200 with `memento-datetime: Tue, 27 Oct 2026
  03:50:05 GMT`. The quoted passage stands word for word in one `<p>` directly under
  `<h2 id="concurrency"><span>2.2. </span>Concurrency</h2>`, after markup is dropped and
  whitespace collapsed. CDX shows five captures 2026-10-06 … 2026-10-27, all digest
  `BMMBAST52QBCT3G27YZSFVBMDBSIKL2T`, the newest the one cited; the newest capture predates the
  cycle's refinement (2026-10-28), so it is an existing capture, not one made for the entry.
- **D-112 *Based on*** (`foundations/decisions.md:1922`): the rationale's two claims —
  the command's connection "waits out the server's short transactions within the busy timeout"
  and the block/login race outcome — rest on one writer at a time (this fact) and on the busy
  timeout (`node-sqlite-database`); both are now named. D-112's sentences are unchanged in the
  range, and the code matches them as the whole review found.
- **D-129** (`foundations/decisions.md:2263`), *Based on:* none: its rationale's "waiting at most
  the bounded busy timeout for its write" is a stated cost; were the fact untrue (writers not
  serialized), the cost would shrink and the decision would not be called into question, so it
  need not name the fact.
- **Part map, `account-server`** (`foundations/part_map.md:59`): the responsibility sentence now
  names the operator's command; true of `src/server/account-block.ts` at `81cb7c6`, which lies
  under *Files* `src/server/**` and inside *Trust boundary* `src/server/**`. One sentence, binding
  part only changed. No other part's entry needs a change: `deployment` and `agent-workflow`
  responsibilities already cover the image and the `loop2-deploy` skill text; the operator is not
  a new external partner (the command runs in the container the trusted Mikrus host holds).
- **Diff scope**: only the three named files under `foundations/`; no code or test changed, so no
  invariant test changed.

## Declined to judge

None.

## Checks

| Check | Result |
|---|---|
| `git rev-parse HEAD` | `cb27190…`, the head given |
| `git log 81cb7c6..cb27190`, `git diff 81cb7c6..cb27190` | one commit, three files, as dispatched |
| `python -B .the-way/elements/common/foundation_check.py` (at `cb27190`) | exit 0, "0 errors" |
| `curl -sS -L https://www.sqlite.org/wal.html` and of the capture in its `id_` form | exit 0 both; files identical (`cmp`) |
| `curl -sS -I` of the capture | 200, `memento-datetime: Tue, 27 Oct 2026 03:50:05 GMT` |
| CDX query `…/cdx/search/cdx?url=www.sqlite.org/wal.html&output=json&filter=statuscode:200&limit=-5` | exit 0, five captures, one digest |
| `python -I` passage search (markup dropped, whitespace collapsed, per `<p>`) in both files | passage found in paragraph 11 of each, under § 2.2. Concurrency |
| Manual: `writeSession`, `blockAccount`, `transaction`, journal-mode setup of `src/server/database.ts` and `sessionAccount()` of `src/server/account-routes.ts` at `81cb7c6` | as described in finding 1 and above |

Not run: any test file — the range changes only `foundations/`, and no test reads it besides
`foundation_check.py`; the full suite is the cycle's own run.

## Reaches beyond the dispatch

- `.the-way/task-cycle/skill/return_step.md` — what the return step must write, to judge
  completeness.
- `.the-way/elements/environment-facts/template.md` — the form and *Rests on* rule (WAY-73) the
  fact is judged against.
- `.the-way/elements/part-map/template.md`, form of an entry and "The binding part" — to judge the
  part-map edit.
- `foundations/decisions.md`, D-112, D-129, D-130, D-131 whole — the entries resting on or near
  the fact.
- `foundations/invariants.md`, entries `blocked-account-access`, `unblock-restores-no-session`,
  `account-session-storage`, `player-server-session`, `account-schema-lifecycle`,
  `account-database-schema` whole — to check which invariant's *Rests on* the fact belongs in.
- `foundations/environment_facts.md`, `node-sqlite-database` — the fact D-112 already named.
- `foundations/part_map.md`, entries `deployment`, `agent-workflow`, External context — other
  parts the change touched.
- `tests/account-storage.test.mjs:355`–`:410` — the tests citing `account-session-storage` and
  `unblock-restores-no-session`, to see whether the cross-connection case is covered.
- `https://www.sqlite.org/wal.html`, its capture and the CDX index — the fact's source.
