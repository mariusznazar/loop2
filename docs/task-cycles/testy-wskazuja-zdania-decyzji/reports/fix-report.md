# Report — the fix of the Minor findings of the review of the whole change

**Status:** done

## Commits and files

Range `fd716ca20e4353422396e571d91ae6b354774aa7..69b7facc`:

- `bf65200c` test: :white_check_mark: drop the D-408 line from the case of the address modes, which holds no sentence of D-408
- `69b7facc` docs: :memo: name password-operation-gate in the invariants of D-103, introduce the pair of D-153 for the part no invariant and no test holds, and word the end of a loop run in the tests of D-386 as settling a death

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 3 | 3 |
| `tests/view/screen-registry.test.mjs` | 0 | 1 |

## Each finding

- **M1 — fixed.** Deleted the line `// decision: D-408 "No function the game view shares between its screens names the new screen"` above the case „the address gets the fragment with a new entry, in place of the current one or not at all” (`tests/view/screen-registry.test.mjs`, formerly line 293); the D-281 line of that case stays. I checked the finding first: the case asserts only the address calls `go` / `replace` / none for the mode asked, and D-408's `tests:` clause (`foundations/decisions.md:10841`) names showing, drawing, focusing, taking down and refusing a table, not writing an address. So the case holds no part of D-408 the clause names, and the finding holds. D-408 keeps 12 lines in the file (`grep -c 'decision: D-408 '` → 12), so the decision is still held, and the foundation check reports no decision held by nothing.
- **M2 — fixed by the orchestrator's way (a).** D-103's clause now reads `invariants: account-attempt-limits · account-attempt-tracking · password-operation-gate.` (`foundations/decisions.md:2170`). The rest of the field is unchanged, and the pair lines for the gate were not restored. Check: the invariants whose *Derives from* names D-103 in `foundations/invariants.md` are exactly `password-operation-gate`, `account-attempt-limits` and `account-attempt-tracking`, which are the three the clause now names. No other decision's `invariants:` was touched. This departs from the task's *To do* 2 bullet 2, and the request must name it for the human to accept at the merge (the orchestrator's ruling).
- **M3 — fixed.** D-386's `tests:` clause (`foundations/decisions.md:10402`) now reads „the function that stamps a save time, the ones that settle a death, of a manual map run and of an earning loop's map run, and the one that settles a first completion refusing a moment that is no safe integer with a RangeError”. Check: `endLoopRun` (`src/browser/sim/loop.ts:373-394`) settles the death of a loop run at `nowMs` „as a manual one is”. It also returns the state unchanged without reading `nowMs` when the run goes on, and the clause's later part („the settling of a death … returning the very game state … where there is nothing to settle”) now covers that too. That matches the case at `tests/sim/loop.test.mjs:876`. One thing I note without changing it: that case also asserts a RangeError for an ended loop run that completed (line 886). The clause does not name that, and D-386's sentence does not reach it; it adds no false claim.
- **M4 — fixed.** D-153's pair now opens „An agent compares the launch with the part no invariant and no test holds:” (`foundations/decisions.md:3406`). I kept „the launch” from the original, because the pair compares an act of deployment (enabling recovery), not a code change. I changed only the part the finding names. Way rejected: „a change”, the log's usual word. If the reviewer reads „the launch” as out of form, the cost is a one-word follow-up.
- **M5 — no fix asked;** no quotation changed.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` → exit 0, output `0 errors`, and no line `held by nothing`. The script prints that phrase at `.the-way/elements/common/foundation_check.py:736`, so its absence is meaningful.
- `npm test -- tests/view/screen-registry.test.mjs` → exit 0; 13 tests, 13 pass, 0 fail, 0 skipped.
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore tests/view/screen-registry.test.mjs` → exit 0, „All matched files use Prettier code style!”.
- `git diff -U0 fd716ca20e4353422396e571d91ae6b354774aa7` (run before committing; the commits hold the same content, `git diff --numstat fd716ca2 HEAD` → 3/3 and 0/1) → exit 0. Read: three hunks in `foundations/decisions.md`, at 2170 (D-103 *Verification*), 3406 (D-153 *Verification*) and 10402 (D-386 *Verification*), and one hunk in the test file, the single deleted line. Nothing else.
- My first runs of the foundation check and the test file wrote their logs into `.runs/fix-minor/`, which did not exist yet. Both redirections failed (exit 1, „No such file or directory”) before any check ran. After `mkdir -p` I ran both again; the results above are from the second runs. The Prettier run in that same first call did run, and passed.
- Not run: the full suite, `npm test` with no argument. It is the cycle's run before the request (method section 3; the handoff names none).

## Own-work check

- Requirement most likely missed: that D-103's `invariants:` clause names exactly the invariants deriving from it, no more and no fewer. Since I edited D-153 and D-386 too, I ran the same check for them, so that the change leaves no invariant unnamed. Check: an `awk` pass over `foundations/invariants.md` listed, for each of D-103, D-153 and D-386, the invariants whose *Derives from* names it. Result: D-103 → password-operation-gate, account-attempt-limits, account-attempt-tracking (all three now named); D-153 → account-email-via-outsider (named); D-386 → none (the field has no `invariants:`). It matches.
- Second check: that removing the M1 line leaves D-408 held and leaves the D-281 line in place. `grep -c 'decision: D-408 '` → 12 and `grep -c 'decision: D-281 '` → 2 in the file, and the foundation check reports nothing held by nothing.

## Reaches beyond the dispatch

- `foundations/invariants.md`, the entry `password-operation-gate` and the *Derives from* lines that name D-103 / D-153 / D-386. Why: to verify M2's premise and the own-work check.
- `foundations/decisions.md`, D-408 whole. Why: to test M1 against its `tests:` clause.
- `src/browser/sim/loop.ts:355-394` (`endLoopRun`) and `tests/sim/loop.test.mjs:870-909`. Why: to verify M3.
- `reports/executor-16-report.md`, only its lines about D-408, found by search. Why: M1's evidence.
- `guidelines/testing.md` and `guidelines/coding.md`, whole, because the repository's `AGENTS.md` requires them before changing a test.

## Working copies

`.runs/fix-minor/` (in the worktree) held only the two log files of the check runs (`foundation.log`, `npm-test.log`). Their results are quoted above, and the directory was removed (`rm -rf .runs/fix-minor`). I made no worktree, clone or script file.

## Choices

- M4: I kept „the launch” rather than „a change” (see above).
- M2: `password-operation-gate` is appended after the two existing identifiers, so their order stays as it was.
- The D-103 line is now longer than the wrapped lines around it. I did not re-wrap the field, so that the diff stays the one line M2 asks for.

## Unread material

- `.the-way/elements/decisions/template.md`: only the section „Verification” (lines 220-261), which is what the handoff asks for.
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/reports/review-whole-report.md`: not read. The findings file quotes it, and I checked each finding directly against the code and the log.
- `task-frozen.md`, `plan.md` („Work of every slice”), and `executor-8-report.md`, `executor-10-report.md`, `executor-10b-report.md`, `executor-31-report.md`: not read. The handoff names them for the method and the findings' evidence. I verified each finding from the code and the foundation instead. `executor-16-report.md` was read only in its D-408 lines.
- `.the-way/elements/decisions/skill/SKILL.md` names `read.md`, `decide_entry.md` and `elements/common/way_of_working.md` for its steps. I did not read them, because the handoff asks only for SKILL.md whole and the template's „Verification”, and the edits change no entry beyond its *Verification* wording.

## Searches not found or unclear

- `.runs/fix-minor/` did not exist when the work started. I created it (see Checks).
- Otherwise none.
