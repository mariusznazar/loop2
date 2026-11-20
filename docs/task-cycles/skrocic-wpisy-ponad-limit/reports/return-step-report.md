# Return step report — skrocic-wpisy-ponad-limit

## Status

`done`. Nothing no longer matches; **the step returns no commit**. The head stays `d5e02cd0`; the working tree is clean.

## Commits

none.

## Checks

| Check | Command | Exit |
|---|---|---|
| foundation check, test citations included, at head `d5e02cd0` | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| the full gate | `npm test` | not run (the orchestrator's) |

## What the return step compared and found

- **Entries the change writes or changes** (D-435, D-436, D-112, the 19 divided entries, D-100, D-115, D-226, D-410, D-430, the invariants `account-session-storage`, `password-reset-link`, `password-reset-ends-sessions`) against the code: the change moves sentences and renames references and changes no behaviour or code, so the code still does what each entry says; the foundation check finds every quotation of a test line in the binding sentences of its decision, every invariant named in a *Verification* derived from that decision and every part and fact named. Nothing to correct.
- **Pair of examples:** D-112 and D-436 carry a pair; the parts they hold (a schema step added at the end of the list, a transaction not held across hashing, a later command that opens only where the server has set up tables) are held by no test, and the tests the pair would otherwise repeat already stand in each *Verification* clause `tests:` (they came with the entries from D-112). No part to remove.
- **(a) D-114 *Relations*:** left as `derives from D-28 · derives from D-112`. Rule applied: the return step corrects what no longer matches the code, and the binding sentences of D-114 (connection, schema initialization, bound values, disposal) rest on D-112 sentences that stayed in D-112; the cleanup timer is named only in its *Verification* clause `tests:`, which is no binding sentence. Nothing of D-114 became false, so no edit (the reviewer made no finding of it either).
- **(b) Part map:** `foundations/decisions.md` belongs to `product-foundation` by `foundations/**` (`foundations/part_map.md:160`); no file was added, removed or moved by the change (27 files changed from the base, all existing), and the entries of `account-server`, `deployment` and the part of the touched tests name no decision number (`grep D-112|D-435|D-436` in `part_map.md`: no match). Nothing to correct.
- **(c) Glossary and environment facts:** the change used no word in a meaning that WAY-95 gives an entry (the glossary holds no entry for paragraph, binding sentence or question; "part of a question" is the template's own wording), and rests on no source outside the product that the foundation does not hold (the facts `express-session-regenerated-session-saved-again`, `node-sqlite-database`, `sqlite-wal-concurrency` already stand and are named by the entries as before). No entry written.
- **Settlements to record / choices that bind after the merge:** the task's *Settlements to record* is `none`; the choices of the change (which sentence a test holds, the order of *Relations*, lower-case first item of *Rejected*) bind nothing after the merge beyond what the entries say, so no entry is written for them.

## Settlements written and their places

none written.

## Concerns

None new. The reviewer's judgment on D-114 stays as decided above.

## Reach beyond the handoff

None. Read for this step: `.the-way/task-cycle/skill/return_step.md` whole; `foundation_step.md` was read whole in the first turn; `foundations/part_map.md` by search (line 160 and the three decision numbers), `foundations/glossary.md` by search for paragraph, binding sentence and question.

## Unread material

- `reports/review-whole-report.md` and `reports/review-fix-1-report.md` (named by the handoff as the place of the findings): not read; the findings of the fix were read in `fix-1-findings.md`, and the handoff states both reviews passed.
- The part map and glossary were read by search, not whole (they are not short enough to read whole for a comparison of this size).

## Searches not found or unclear

none.

## Working copies

None made in this step; `.runs/author/` does not exist.
