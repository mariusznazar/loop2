FAIL 3e8fb3ef2e2c446f2fb248a5a53aa3c366ddd820

# Review of the return step's commits — `podzial-sterownika-widoku`

- Range: `4f62fec5af761084a7aa832b077958d735edaad0..3e8fb3ef2e2c446f2fb248a5a53aa3c366ddd820`, one commit `3e8fb3ef` ("name the tests that hold part of D-408 and D-409 by lines decision: and the clause tests: …"). `git rev-parse HEAD` in the worktree is `3e8fb3ef2e2c446f2fb248a5a53aa3c366ddd820`, as given. Pinned `.the-way` at `ec7929d02164c8754f0236d93db52624688967e6`, equal to the gitlink.
- Diff: `foundations/decisions.md` (D-408 and D-409 *Verification* only), one comment line added to `tests/view/screen-registry.test.mjs:320` and one to `tests/view/state-store.test.mjs:156`. No binding sentence, *Rationale* or *Rejected* changed; D-407 untouched.
- Counts: blocking 1 (Important), Minor 2, out of scope 0.

## Findings

### Important

1. **D-408's clause `tests:` names six behaviours, but only one test carries the line `decision: D-408`; the other tests the clause describes carry none.**
   - Place: `foundations/decisions.md:9897` (the clause) against `tests/view/screen-registry.test.mjs:320` (the only line), and the unmarked tests at `tests/view/screen-registry.test.mjs:129` (refuses a table that leaves a kind without an entry), `:169` and `:189` (shows), `:302` (draws after a reading of the clock), `:380` (focuses), `:410` (takes down).
   - What is wrong: the clause reads "tests: that the registry, made from a table of entries it knows nothing of, shows, draws after a result and after a reading of the clock, focuses and takes down the screens through those entries alone, and refuses a table that leaves a kind of screen without an entry." The one test marked with the line is "a result is drawn on every living instance in table order, with the events of the call" — it holds only "draws after a result". The decision template at the pinned commit binds the link to each test: "A test that holds a sentence of the decision carries beside it a line `decision:` … The line stands at the test that holds the sentence" and "the lines `decision:` find the tests, so the clause is no second copy of the link" (`.the-way/elements/decisions/template.md:225-237`). the-way's own log follows it: `decision: WAY-12` stands at 9 tests, `WAY-03` at 10, `WAY-375` at 9.
   - Why it matters: the clause is true of the test file, not of the tests the lines mark, so the clause restates what the linked test holds more broadly (WAY-263). A reader who finds D-408's tests the way the template says, by the line, finds one test about drawing results and either takes it to hold the whole clause or concludes that showing, focusing, taking down and the refusal are held by no test. A later change that removes or weakens the refusal test (`:129`) or the focus test (`:380`) touches a test that, by its file, guards no decision, and nothing in the foundation or the check signals that D-408 lost part of its verification. The return step's whole purpose was this link, so it is within the task.
   - Evidence: `git grep -n "decision: D-408"` finds one line (`tests/view/screen-registry.test.mjs:320`); reading the file whole shows the six behaviours held by the tests listed above, each with no line. `foundation_check.py` cannot catch this: it checks only the quotation of each line and that a decision is held by something.
   - Fix I recommend: put the same line `// decision: D-408 "No function the game view shares between its screens names the new screen"` above the `// Catches` comment of each test that holds a part the clause names (at least `:129`, `:169`, `:189`, `:302`, `:380`, `:410`; optionally the other `show` tests at `:221`, `:235`, `:254`, `:287`). These are comment lines, so no test case changes. The other way, narrowing the clause to "draws after a result" and moving the rest into the pair of examples, throws away verification the tests really give.

### Minor

2. **D-409: the test of an act without catch-up holds the store's side of the second sentence, but neither carries the line nor appears in the clause.**
   - Place: `tests/view/state-store.test.mjs:175-189` ("an act without catch-up reads no clock and passes no time"); `foundations/decisions.md:9912-9913`.
   - What: D-409's second sentence reads "A new character and the purchase of a branch rank do not catch up time." The test proves that the store's `actWithoutCatchUp` reads no clock and passes no time. It does not prove that creating a character and buying a rank go through it, so the complies example "a new character created with no reading of the clock before it" is still needed. The clause could add "and that its act without catch-up reads no clock", with a line `decision: D-409 "A new character and the purchase of a branch rank do not catch up time"` at that test.
   - Why Minor: nothing is overclaimed, and the pair still sends an agent to check it. It is broader coverage the template asks for ("names … the tests that hold its sentences"), not a wrong statement.

3. **D-408's clause says "through those entries alone", which the tests do not hold.**
   - Place: `foundations/decisions.md:9897`.
   - What: the tests run the registry on a table of plain-object entries with the existing kinds. A branch in `src/browser/view/screen-registry.ts` for a kind no test entry uses (for example a future `knowledge`) would pass all 13 tests. So the tests show that the registry works through any table of entries, not that it does so through them *alone*. The violates example ("or that the registry shows, draws, focuses or takes down by a branch written for it") correctly covers that gap, so an agent is still sent to check. The two halves of the field overlap where they should split.
   - Why Minor: a wording departure. The pair keeps the check in place; I cite no reading that leads a reviewer astray in practice. Dropping "alone" from the clause would make the split exact.

## What holds

- Both quotations begin at the start of a sentence of the binding sentences, hold at least three words and no `"`, and stand in the binding sentences: D-408's quotation is the second sentence's start (`foundations/decisions.md:9892`), D-409's the first sentence up to "before the act runs" (`:9907`). A changed quotation in a scratch copy makes the check report an error (below).
- D-409's clause, "that the store reads the clock and passes the time elapsed to the simulation before the body of an act runs", is exactly what the marked test at `tests/view/state-store.test.mjs:156-173` proves (`readings.count` 1, `seen` 1, the reading's result taken before the body). The pair keeps the part no test holds — acts written outside the store, and a second clock reading — and it does not duplicate the clause.
- D-408's pair keeps the parts no test holds: the shared functions of `game-view.ts` and the one line of the table. A read of `src/browser/view/game-view.ts:185-275` finds no branch per screen kind outside the table (the `switch` there is on `options.entry`, how the page was opened), and `screen-registry.ts:180` holds the one `"run"` branch the rationale names.
- No existing test case changed. The range adds only two comment lines to the tests. Both test files are new on this branch (`d01611f6`, `8b68ec28`), so the criterion "every existing test passes with no change in its file" is not reached either way.
- Form: each *Verification* follows the template — `tests:` in words with no path or test name, then "An agent compares a change with the part no test holds:" with its pair. *Rationale* and *Rejected* are kept whole.
- D-407 keeps its pair and no test. That matches the author's claim that no test holds it; I found no `decision: D-407` line (`git grep`).

## Declined to judge

- The binding sentences, *Rationale* and *Rejected* of D-407, D-408 and D-409: the return step did not change them, and the whole-change and fix reviews judged them (PASS).
- Whether the run entry, written over eight lines of the table in `src/browser/view/game-view.ts:223-230`, is "one line of the table" as D-408's sentence says. The sentence speaks of a new screen's entry, and the return step did not touch it.
- The author's decision not to record the closed list of what each entry may import as a decision, since it belongs in the guidelines: the return step wrote nothing there, and the whole-change review covered the guideline.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` in the reviewed worktree — exit 0, `0 errors`; the remaining lines are notices that decisions are "held by nothing", none of them D-406 to D-409.
- `npm.cmd test tests/view/screen-registry.test.mjs` — exit 0, 13 tests, 13 pass.
- `npm.cmd test tests/view/state-store.test.mjs` — exit 0, 12 tests, 12 pass.
- Negative control (scratch worktree of `3e8fb3ef`): the quotation of `decision: D-408` changed from "names the new screen" to "names a new screen", then `python -B <reviewed worktree>/.the-way/elements/common/foundation_check.py` run from the scratch root — exit 1, `tests/view/screen-registry.test.mjs:320: the quotation stands in no binding sentence of D-408`, `1 error`. The check therefore really reads the line.
- `git status --short` in the reviewed worktree before and after — empty; HEAD unchanged.
- Not run: the full gate (outside this review, as the handoff says); ESLint and Prettier on the two test files (the change adds only comment lines; the author reports them at 0).

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md`, read whole: the form of the line `decision:`, the clause `tests:` and the pair of examples, the standard the handoff names ("the way the decisions' template … hold[s] them").
- `git grep "decision: WAY-"` in `.the-way`: how the-way's own log places the line, one per test that holds the sentence. This is the evidence for finding 1.
- `git grep "decision: D-"` in the product: the precedent in this repository (D-406, with one line for a one-test clause).
- `src/browser/view/game-view.ts:185-275` and a grep of `src/browser/view/screen-registry.ts` for kind literals: to check that the part of D-408 left to the pair is not held by any test and agrees with the code.
- `guidelines/testing.md`, searched for "decision" and "invariant:": to see whether the product's test guidelines add a rule for these lines (they do not).

## Working copies

- `.runs/review-return/wt`, a detached worktree of `3e8fb3ef`, used for the negative control; removed with `git worktree remove --force`, the directory `.runs/review-return/` deleted, `git worktree prune` run. Nothing remains. `npm.cmd test <file>` rebuilt the ignored `dist/` in the reviewed worktree, as the test command always does; no tracked file changed.

## Unread material

- `reports/review-whole-report.md` and `reports/review-fix-report.md` (context only): searched for D-407 to D-409, `decision:` and `tests:`, and the matching lines read; not read whole.
- `guidelines/testing.md`: searched only, not read whole. The handoff names no guideline file, and the range adds no test code.
- The frozen task, the author's return-step report, the review skill, the template, D-407 to D-409 and both test files: read whole.

## Searches not found or unclear

- `decision: D-407` in the product's tracked files: not found, which agrees with D-407's pair-only *Verification*.
- A rule in `guidelines/testing.md` on `decision:` lines: not found.
- Unclear: the template says "The line stands at the test that holds the sentence" in the singular. I read it, together with "A test that holds a sentence … carries beside it a line" and the-way's own practice, as one line for each test that holds a part. If the orchestrator reads it as one line for each decision, finding 1 drops to Minor (the clause would still be broader than the marked test).
