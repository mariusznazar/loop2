PASS 017c86035d4e38acc0245f944bb34c7b42836c93

# Review of the fix — return step, task `blokada-konta`

- Reviewed: the fix range `cb27190..017c860` (one commit, `017c860`, `foundations/invariants.md`
  +2/−2), as the review of a fix (`.the-way/task-cycle/review/SKILL.md` and `fix.md`), against
  the findings file `reports/07-return-fix-findings.md` (finding 1 of
  `reports/06-return-review-report.md`, copied word for word) and the fix report
  `reports/07-return-fix-report.md`.
- `git rev-parse HEAD` = `017c86035d4e38acc0245f944bb34c7b42836c93`, the head given; worktree
  clean before and after the review.
- Counts: blocking 0, Minor 0, out of scope 0.

## Findings of the findings file

**1. `account-session-storage` does not rest on `sqlite-wal-concurrency` — fixed.**
`foundations/invariants.md:781` now reads *Rests on:* `express-session-store-contract ·
node-sqlite-database · express-session-cookie-lifecycle · cookie-serialization-validation ·
sqlite-wal-concurrency`. The author also added the fact to `player-server-session`
(`foundations/invariants.md:841`: `node-sqlite-database · sqlite-wal-concurrency`), as the
finding asked them to judge; the reasoning given — a record a concurrent login stored after the
block's delete would be left uninvalidated, an interleaving excluded only by one writer at a time
— matches the code at `81cb7c6` (`writeSession`'s guarded insert and `blockAccount`'s
`BEGIN IMMEDIATE` transaction in `src/server/database.ts`). `blocked-account-access` and
`unblock-restores-no-session` stay without the fact, as my review agreed. The report's false
sentence is corrected in `reports/05-return-step-report.md`, item 1, marked as corrected by
`017c860`.

No finding contested.

## What the fix itself might have broken

Nothing found. The diff changes two *Rests on* fields only — no sentence, *Method*, *Derives
from*, *Part* or *Violated* — so no citing test is reached by a new wording and no decision's
*Verification* changes. The fact is now named by D-112's *Based on* and by two invariants' *Rests
on*, which keeps it standing (WAY-73); `foundation_check.py` resolves every name.

## Declined to judge

None.

## Checks

| Check | Result |
|---|---|
| `git rev-parse HEAD` | `017c860…`, the head given |
| `git log cb27190..017c860`, `git diff cb27190..017c860` | one commit, two lines of `foundations/invariants.md` |
| `python -B .the-way/elements/common/foundation_check.py` (at `017c860`) | exit 0, "0 errors" |
| `grep -rn sqlite-wal-concurrency foundations/` | the fact at `environment_facts.md:316`; named by `decisions.md:1922`, `invariants.md:781`, `invariants.md:841` |
| Manual: `reports/05-return-step-report.md` item 1 | corrected sentence present, marked as corrected by `017c860` |

Not run: any test file — the range changes only two *Rests on* fields, which no test reads
besides `foundation_check.py`; the full suite is the cycle's own run.

## Reaches beyond the dispatch

- `reports/05-return-step-report.md`, item 1 — to confirm the correction of the false claim the
  finding named.
