PASS fd716ca20e4353422396e571d91ae6b354774aa7

# Review of the whole change — testy-wskazuja-zdania-decyzji

- Range: `394ca859caa5d8316eafdb33145f243ddf5c3bac..fd716ca20e4353422396e571d91ae6b354774aa7` (`git rev-parse HEAD` in the worktree gives the head; 88 commits, every subject `test:` or `docs:`).
- Changed files I worked from (`git diff --stat` and `python -B .the-way/task-cycle/change_file_sizes.py <base> <head>`): 147 files, +6429 −1674. `foundations/decisions.md` 9929 → 10873 lines (+944); 146 test files (100 `.mjs`, 46 `.py`), each grown only by comment lines — 3811 added lines, 0 removed, every one of the form `// decision: D-NN "<quotation>"` or `# decision: D-NN "<quotation>"`. The pin `.the-way` did not move (`ec7929d`). No screenshot file among the commits.
- Counts: 0 Critical, 0 Important, 5 Minor (all within the task), 0 out of scope. No blocking finding.

## Findings

### Critical

none

### Important

none

### Minor

**M1 — a `decision:` line the slice knew to be false was kept.** `tests/view/screen-registry.test.mjs:293` (case at line 296, „the address gets the fragment with a new entry, in place of the current one or not at all”) carries `decision: D-408 "No function the game view shares between its screens names the new screen"`. The line stood at the base. The executor of slice 16 judged that the case does not hold the sentence: it asserts only which address calls (`go`, `replace`, none) the registry makes for the mode asked, and a registry that named a screen in a branch of its own would still pass it. I agree with that judgment after reading the case. The executor kept the line because plan item 3 says to “report one whose test does not”. Removing it was within the task: the task is about lines that tell whether a test guards a sentence. The out-of-scope bullet forbids removing number mentions only from tests that get no `decision:` line, and this case gets a D-281 line in the same change. The cost is small. One marker in 3831 tells a reviewer that the address modes guard D-408, which is the false signal the task exists to remove. Fix: delete that one line. Slice 16, commit `fdf9ee38` (the line was kept there). The plan's item 3 shares the cause, because it allows reporting but not removal.

**M2 — D-103's *Verification* now points nowhere for its password gate.** `foundations/decisions.md:2170` (D-103). At the base the pair covered the gate of sentence 3 („a full password gate refuses immediately …” / „independent unbounded hash pools …”). The change removed those examples because the invariant `password-operation-gate` holds the gate. That invariant derives from D-103 (`foundations/invariants.md:658-664`), but D-103's `invariants:` clause does not name it, and the task freezes that clause. The `tests:` clause also says nothing of the gate. An agent comparing a change with D-103 therefore finds sentence 3's gate in none of the three places. This does not weaken the protection: the invariant's test still fails on a broken gate. Executor 8 reported it (`reports/executor-8-report.md:20-24`, `:448`). Two fixes are possible: (a) name `password-operation-gate` in D-103's `invariants:`, a departure from *To do* 2 bullet 2 that the human accepts at the merge; or (b) keep one pair line for the gate. I recommend (a), because it is what the template asks. A mechanical cross-check of all 403 decisions (derived invariants against those named) found four more mismatches, all present at the base: D-04, D-179 and D-190 each miss one derived invariant, D-108 misses `account-client-requests`, and D-113 and D-377 name invariants that do not derive from them. In none of those four did the change remove pair content that only the unnamed invariant held. I read D-04, D-179 and D-190 for this. Slice 8, commit `199cd6e0`.

**M3 — D-386's `tests:` clause lists `endLoopRun` as a fourth function.** `foundations/decisions.md:10402`. Ruling on handoff question 5a: the line at `tests/sim/loop.test.mjs:877` (the case at 876, „taking an end reads the moment only when there is an end to settle, and the moment must be a safe integer”) may stay. `endLoopRun` (`src/browser/sim/loop.ts:373-394`) settles the death of an earning loop's map run at the given moment, as a manual death is settled, and stores the team's moment of readiness. That makes it a function that settles a death, and the sentence's first clause covers it (a stored moment is a safe integer). The clause, however, reads „the function that stamps a save time, the one that settles a death, the one that settles a first completion and the end of a map run of an earning loop refusing a moment that is no safe integer”. That presents the loop's end as a fourth function beside the three D-386 names, which is broader than the sentence. Fix: word it as part of „the one that settles a death” (for example „the ones that settle a death, of a manual map run and of an earning loop's map run”). Executor 31 raised it (`reports/executor-31-report.md`, concern 2). Slice 31.

**M4 — D-153's pair still introduces itself as covering the whole decision.** `foundations/decisions.md:3405-3406`. The field now has `tests:` beside `invariants:`, but the pair still opens „An agent compares the launch with the decision:”. The template's form for a pair beside tests is „… with the part no invariant and no test holds”. The pair's content is right (only the real delivery test), so a reader is not misled about what it covers. Only the introduction is out of form. It is the only field the change touched that kept a whole-decision introduction beside `tests:` or `invariants:`, found by a script over every *Verification*. Slice 10.

**M5 — many quotations run to the end of long sentences at cases that hold one clause.** Examples: `tests/view/account-screen.test.mjs:6018` quotes D-381's whole second sentence (to „never while it is being drawn.”) at a case that holds only its last clause. `tests/sim/loop.test.mjs:877` quotes all of D-386's second sentence. Of the 3811 added lines, 1704 are over 200 characters, 435 over 400, and the longest is 1116. Ruling on handoff question 4: this does not mislead in a way that changes a verdict. The template makes the quotation identify a sentence by its start, and it lets the quotation run to the end. The `tests:` clause says which part is held, and in every clause I read it matches the lines. Where executors stopped quotations early (executor 21's choice 4, for example „Making a campfire lasts 20 game minutes and uses 6 sticks”), the line reads better. No guideline sets a length for comments: `guidelines/coding.md` has no such rule, `ruff.toml` selects no E501, and Prettier leaves comments as they are. This is a note on readability, with no fix required.

## Rulings on the handoff's questions

- **5a (`endLoopRun`):** keep the line; reword the clause (M3).
- **5b (pre-existing lines that do not hold):** the D-408 line at `screen-registry.test.mjs:293` was kept and reported. It should have been removed (M1). The other ten D-408 lines and the two D-409 lines at the base hold what their clauses name. I read the cases at 261, 296, 312, 332 and 349. They run the registry on entries the test writes and fail where it builds, shows or draws a screen other than through its entry.
- **5c (D-153, D-108, D-103, D-113, D-397):** only D-103 changed for the worse because of the change (M2). D-108 is untouched. Its missing `account-client-requests` was missing at the base, its field has no pair, and its review invariant restates both sentences. D-113's extra names were at the base. D-153 is right in content (M4 is form only). D-397 names its two derived invariants, and its tests hold the sentence.
- **R1:** sound. It mirrors the template's “a sentence so held gets no invariant derived from the decision”. It was applied consistently where I looked: D-102 (lines only for the 429 sentence), D-116 (the invariant's settle-once part left unquoted), and D-117 (lines only where the cases go beyond `account-client-outcomes`, to the save, previous-save and report routes). Its one weak spot is a derived invariant that the field does not name (M2).
- **R2:** sound. The template requires it. It was applied in D-30, D-83, D-393, D-406, D-06 and D-111.
- **R3:** sound. I found no stale wording the executors missed that changes a verdict.
- **R4:** sound. Where a decision names the element and the role, the role went to `tests:` (D-185 „in `text-secondary`”). Where the tests check only „not `danger`”, the role stays in the pair (D-217, D-215, D-181).
- **Placement:** 3600 of the 3831 lines are the first lines of a test body. My script counted 229 as “above”, but most of those are lines followed by a `for` loop or a helper call inside the body. The lines that truly stand above `test(` are in `screen-registry.test.mjs` and `state-store.test.mjs`, where they follow the lines standing there at the base. Each file is consistent within itself. Departing from the plan's “directly above” costs nothing: the foundation check accepts both, and in Python the lines sit after the `# invariant:` lines.
- **Number mentions kept beside lines:** consistent with the answer to the task's carried question. No comment was removed (0 removed lines).
- **Partial reading by executors:** in the sample I found no wrong judgment that traces to it.
- **Observation, not a finding:** the bar for “holds” differs between slices. Executor 21 marked a case only where the sentence is its subject (choice 1). Slices 20 and 31 marked every case that would fail (D-394: two lines at each of 23 cases that call `actionFeasible`; D-386: every case whose own assertion is that a game state loads back). Both bars keep the `tests:` clauses true. The difference shows only in how many lines a decision gets.

## What I sampled

1. **Pairs removed (107):** 33 decisions sampled, covering all 28 slices that removed a pair. D-14 (5), D-229 (6), D-102 (8), D-158 (10), D-381 and D-157 (13), D-281 (17), D-283 (18), D-388 (19), D-71 (20), D-387 (21), D-377 (22), D-70 (23), D-121, D-126 and D-127 (24), D-133 (25), D-142 (26), D-164 (27), D-189 (28), D-195 (29), D-190 (30), D-206 (31), D-240 (32), D-243 (33), D-335 (34), D-324 and D-369 (35), D-367 (36), D-313 and D-341 (38), D-363 (39), D-293 (40). For each I compared the binding sentences, clause by clause, with the base pair, the head field, the names of every cited case and the invariants named or derived. For D-102, D-126, D-127, D-189 and D-229 I read the invariants' statements. Every removal was sound: what the dropped pair spoke of is held by a cited case or a derived invariant.
2. **Many-line and borderline lines:** 19 decisions. D-394, D-18, D-77, D-116, D-117, D-28, D-31, D-386, D-381, D-281, D-408, D-71, D-190, D-164, D-121, D-388, D-387, D-133, D-142. I read the case names of every line. I read the bodies of these cases: `tests/sim/data.test.mjs:17,62,779`, `tests/deploy/test_loop2_deploy_build.py:273`, `tests/view/screen-registry.test.mjs:255-375`, `tests/view/chronicle.test.mjs:504`, `tests/view/account-screen.test.mjs:6017,6054`, `tests/http.test.mjs:1577,1626`, `tests/sim/loop.test.mjs:858,876`, `tests/view/program-editor.test.mjs:1150`, `tests/sim/flow.test.mjs:69`, `tests/view/clock.test.mjs:537`, `tests/sim/actions.test.mjs:94`, `tests/sim/encounters.test.mjs:669`, `tests/quality/test_test_gate.py:37-80`, `tests/account-api.test.mjs:284`. Each holds what its line quotes, at least in part. The exception is M1. Two holds are weak but defensible: `clock.test.mjs:537` for D-190 asserts only that the loop went on, and `data.test.mjs:779` for D-18 shows the step read from the map row it was given.
3. **Pairs added or rewritten:** 28 decisions. Added: D-30, D-83, D-393, D-406, D-73, D-81, D-89, D-181, D-217, D-215, D-160, D-113, D-03. Rewritten: D-06, D-49, D-253, D-355, D-222, D-252, D-111, D-207, D-401, D-271, D-372, D-18, D-77, D-103, D-386, D-408, D-04. Each pair speaks only of the part its field leaves unheld. Each `violates:` is code or guidelines going against an entry that stays as it is, and none replaces a decision. The reservation is D-30's `complies:`, which describes a change of the set made together with a human-accepted change of the decision. It keeps the third sentence („Changing that set takes a human-accepted change of this decision”), so it complies.
4. **Decisions held by nothing at the head (false negatives):** 8 decisions. D-12, D-278, D-279, D-360, D-392, D-396, D-34, plus D-185. I searched for D-278 („15%”, „15vh”, „0.15” under `tests/view`) and D-392 (memory terms in `tests/quality/test_docker_gate.py`) and found no holding test.
5. **Quotations and `tests:` clauses:** in every field read above, the clause speaks in words, with no path or test name, and is true of the lines that exist. A script found 16 clauses that hold a decision number (D-98, D-105 and others) or a time such as „03:17”. Those are cross-references or content of the decision, not test numbers.
6. **Unchanged fields:** D-31 (its pair speaks only of the review part of the ShellCheck rule).

## Against the task

- *To do* 1 (pin to `f4af75d`): met at the base. `git merge-base --is-ancestor f4af75d… ec7929d…` exits 0, with 18 commits between. Moving the pin would downgrade it, and the change leaves `.the-way` as it was. I judge this a sound reconciliation of a source that changed after the task was written. It should be named in the request.
- *To do* 2: all 403 decisions stand in exactly one slice. An independent recount shows that for every decision with lines `decision:` the field has a `tests:` clause, and the other way round. The kinds at the head match the orchestrator's: inv 12, inv+tests 34, inv+tests+pair 80, tests+pair 149, pair 30, tests 87, inv+pair 11. There are 107 pairs removed, 31 added and 3831 lines. The task's examples (D-176 held by `tests/sim/body.test.mjs` with no number cited) are marked.
- *To do* 3 (strongest model): stated in every slice's *Model*. This cannot be checked from the commits.
- Acceptance: `foundation_check.py` exits 0 with `0 errors` and lists no decision as held by nothing. Every entry is equal to its base text outside *Verification*, and the withdrawn list is unchanged (my own recount script).
- Out of scope: no test, invariant or binding sentence changed and no mention was removed. M1 asks for one line to be removed, which is within scope as reasoned there.
- Carried question (mentions beside lines): answered by keeping them. Consistent.
- *Settlements to record*: none. *Decisions in play*: D-73 and D-82. A `decision:` line is a comment that names a foundation entry, so it agrees with D-82 and with `guidelines/testing.md` „Where the expected value comes from”. D-73's new pair agrees with the pinned template.

## The structure of the code the change leaves

`guidelines/coding.md` has no rule `### Size of a function and a file`, so there is no size test to run in base and head worktrees. My only material is the sizes the script gave: every test file grew by comment lines only, 1 to 330 lines per file. No function's code changed, no code lost its user, and no name stopped being true. No finding.

## Declined to judge

- Whether the request's description lists every test change with a `decision:` line, as the request template asks (task context): that belongs to the request step, not this range.
- Whether the full gate passes: that is the orchestrator's run after this review.
- The remarks R3 that the executors listed for the human, beyond those bearing on M2 and M3: their truth against the code is the human's list.
- The executors' own-work checks other than those of slices 8, 16, 21 and 31: I sampled judgments instead of re-reading each check (see Unread material).

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, one line `0 errors`, no `listed:` or `held by nothing` line (run twice).
- `python -B .the-way/task-cycle/change_file_sizes.py 394ca859… fd716ca2…` — exit 0.
- `python -B .runs/review-whole/diffcheck.py <base> <head> …` (my script: `git diff -U0` outside the log) — exit 0. Result: 3811 added lines, 0 removed, 0 not comments, 0 not of the `decision:` form, 2942 over 100 characters.
- `python -B .runs/review-whole/recount.py` (my script: entries compared outside *Verification*, kinds, lines) — exit 0. Result: 403/403 entries, none differs outside *Verification*, withdrawn list equal, counts as given above.
- `python -B .runs/review-whole/inv_names.py` (derived invariants against named ones) — exit 0. Output as in M2.
- `python -B .runs/review-whole/form.py` and `intro.py` (form of every *Verification*: field order, clause order, pair indentation, pair introductions) — exit 0. Field order, clause order and pair indentation all regular. Introduction finding: M4.
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <the 100 changed .mjs files>` — exit 0.
- `python -B -c "import ast…"` over the 46 changed `.py` files — exit 0, all parse.
- `git merge-base --is-ancestor f4af75d… ec7929d…` in `.the-way` — exit 0. `git rev-list --count` gives 18.
- Not run: Ruff, because the worktree has no local copy (`ruff` is not on the path either), so `ruff-source-rules` on the changed `.py` files is unverified. The added lines are comments, and the rule set has no length rule. Also not run: the focused tests of the changed files. Each `npm test -- <file>` builds the game into the reviewed worktree, which my method forbids changing. The change is comments only, which the parse and Prettier checks confirm, every executor reports its focused runs with exit 0, and the full gate follows.

## Reaches beyond the dispatch

- `src/browser/sim/loop.ts:373-394` and the `export function` lines of `src/browser/sim/game.ts`: to rule on question 5a.
- `foundations/invariants.md`: the entries `program-rule-pick`, `account-save-sqlite-access`, `account-save-sqlite-upgrade`, `account-attempt-limits`, `account-attempt-tracking`, `password-operation-gate`, `loop2-shared-public-origin`, `account-client-requests`, `account-client-outcomes`, `account-email-via-outsider`, `first-map-stock`, `first-map-balance`, `solved-map-manual-run`, `trip-run-end`, `loop-practice-payment`, `trip-transfer`, `catch-up-state`, `minute-span-split` and `nature-energy-range`: to judge which part a decision's invariants hold.
- `.the-way/elements/decisions/template.md:105-260`: the form of *Verification* and of binding sentences.
- `.the-way/elements/common/way_of_working.md:58-100`: the selection method.
- The executors' reports of slices 8, 16, 17, 21 and 31 (parts named under Unread material): to read their own flags.

## Working copies

- `.runs/review-whole/` held my scripts (`diffcheck.py`, `sample_prep.py`, `show.py`, `placement.py`, `inv.py`, `inv_names.py`, `form.py`, `intro.py`, `recount.py`) and their outputs. It was removed before I returned. I made no worktree or clone.
- My first run of `change_file_sizes.py` wrote its output by mistake to `a file in the main checkout's ignored working directory`, in the main checkout's ignored `.runs/`. I moved it into my directory at once (`Test-Path` then gave `False`), and it was removed with that directory. No tracked file of the main checkout or of the reviewed worktree was touched.

## Unread material

- Decisions of my selection: the change touches every part, so all 403 decisions are in the selection. 0 were read whole in the method's sense, with *Rationale* and *Rejected*. The script compared those fields of all 403 with the base and found them unchanged. I read the binding sentences and the *Verification* at base and head of 81 decisions (D-03, D-04, D-06, D-12, D-14, D-18, D-28, D-30, D-31, D-34, D-49, D-70, D-71, D-73, D-77, D-78, D-81, D-83, D-89, D-102, D-103, D-108, D-111, D-113, D-116, D-117, D-121, D-126, D-127, D-133, D-142, D-153, D-157, D-158, D-160, D-164, D-179, D-181, D-185, D-189, D-190, D-195, D-206, D-207, D-215, D-217, D-222, D-229, D-240, D-243, D-252, D-253, D-271, D-278, D-279, D-281, D-283, D-293, D-313, D-324, D-335, D-341, D-355, D-360, D-363, D-367, D-369, D-372, D-377, D-381, D-386, D-387, D-388, D-392, D-393, D-394, D-396, D-397, D-401, D-406, D-408). For D-73 and D-82 I read the whole entry except the long *Rationale* line. For six more (D-97, D-112, D-139, D-173, D-208, D-212) I read only their lines and the start of their `tests:` clauses. D-82 I read as an entry apart from its *Rationale*. The other 315 I read by title only, all 403 titles skimmed. None of those titles pointed to a bearing on a comment-only change beyond D-73, D-78 and D-82, which I opened.
- Guidelines: `guidelines/coding.md` and `guidelines/testing.md` were read whole. `guidelines/styleguide-browser-view.md` (80 KB) was not read: the change adds only comment lines to the view's tests and changes nothing the styleguide governs (look, states, controls). The kind guidelines `guidelines/coding-*.md` were not read, because no product code changed.
- Invariants: only the entries named under Reaches were read, not every invariant whose *Part* names a touched part.
- Part map: read whole. Glossary (`foundations/glossary.md`): not read.
- Plan: read whole for lines 1-96 and 477-505 (the header, *Foundation entries*, *Work of every slice*, slices 1-2, *Coverage*, *Choices*). Slices 3-40 were read through their *Goal* lines only, with a script mapping each decision to its slice.
- Executors' reports: none of the 41 was read whole. I read parts of executor-16 (lines 85-119), executor-17 (1-20), executor-21 (226-263), executor-31 (170-195) and executor-8 (14-33), plus searches across all reports for `endLoopRun`, `D-408`, `password-operation-gate`, `borderline`, `doubtful` and similar words. The per-decision tables of the other reports were not read. I judged their decisions from the log and the tests directly.
- The orchestrator's `cycle.md` and the planner's report were not read.

## Searches not found or unclear

- A test that holds D-278 (the card's top edge at 15%): searched `15%`, `15vh`, `0.15` in `tests/view` — none found. That agrees with its kept pair.
- A test that holds D-392 (no memory threshold): searched `memory`, `MemAvailable` and `free_mem` in `tests/quality/test_docker_gate.py` — none found. That agrees with its kept pair.
- The rule `### Size of a function and a file` in `guidelines/`: not found, so no size test exists.
- A local Ruff: not found in the worktree or on the path.
- Unclear: whether D-386's „the function that settles a death” was meant to cover `endLoopRun`. Ruled in M3 as covered in substance, with a rewording.
