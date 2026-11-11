# Handoff — review of the whole change, task koniec-przejscia

You review the whole change of one task as an agent that did not make any of it. Read-only: change nothing in the worktree ``, its index or branch; run checks that need files changed in a separate worktree of the head commit under `.runs/` of that worktree (ignored) and remove it afterwards. Never touch the main checkout `a repository on the author's disk`. Do the whole review yourself, dispatch nobody.

## Method

Read whole `.the-way/task-cycle/review/SKILL.md` and `.the-way/task-cycle/review/whole_change.md` and follow them. You alone select your own foundation and guidelines: by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` for the parts the change touches (`browser-view`, `simulation`, and `agent-workflow` for the guideline files and `product-foundation` for the entries), and the guidelines by `.the-way/product-guidelines/reading.md`, each guideline file whole. Count the decisions you read whole and by title as the skill's section 1 gives. The pin of the-way is not moved by this task.

## What is reviewed

- Range: base `211a4ea556d48f5da98fc08380b3c061b9365709` to head `6de72dbb` (confirm `git rev-parse HEAD` is `6de72dbb…`; compute the diff yourself: `git diff 211a4ea..6de72dbb`, `git log 211a4ea..6de72dbb`).
- Report path: `docs/task-cycles/koniec-przejscia/reports/whole-review-report.md` (first line `PASS <head sha>` or `FAIL <head sha>`).
- The frozen task, read whole: `docs/task-cycles/koniec-przejscia/task.md` (a task of the plan `plan_mvp2_loop2.md`, item 16, `Status: ready for cycle`). The plan, read whole: `docs/task-cycles/koniec-przejscia/plan.md` (7 slices; no spec was written: no open design choice). Check the change against the whole task: every item of *To do* (1–13), every row 1–7 of *Settlements to record* and every projected entry named in *Decisions in play*, met by the commits; nothing taken from the task's sources altered or invented.
- Task's own words on the questions carried to the cycle (its section *Questions carried to cycle*) are answered in the plan's *Choices*; judge those choices.

## Answers of the cycle's start (told to every review)

- Trust boundary: **yes** — `src/browser/sim/saved-game.ts` (part `simulation`). The change raises the save version from 3 to 4 and adds strict reading of three new fields; check crafted input at that boundary (the slice review of slice 1 did it once; do not take its word).
- Irreversible operation: no.
- Checks failing on the base: `tests/account-mail.test.mjs:350` (timing-dependent: failed in a whole run, passes alone) and two `tests/quality` tests that failed only for a missing `.runs/quality-venv` in a new worktree (present now); `prettier --check` failed on the base for `guidelines/styleguide-browser-view.md`, `guidelines/coding-simulation-module.md` and `guidelines/coding-browser-module.md` (table alignment), which slices 6 and 7 made pass. The orchestrator runs the product's gate after this review; do not run it.

## The slices, their ranges, and which had a review of its own

| Slice | Range | Review |
|---|---|---|
| Foundation entries (D-362 new, D-53, D-62, D-122, D-132, D-135, D-147, D-173, D-185, D-212, D-216, D-311, D-313 changed) | `211a4ea..c730482` (commits `e0fd091`, `c730482`) | covered by slice 1's review (its range starts at the base); report `reports/foundation-report.md` |
| 1 — the record of the end in the simulation, save version 4 | `c730482..d7ac8a9` (`41abf1f`, `d7ac8a9`) | **yes**, PASS `d7ac8a9`, report `reports/slice-1-review-report.md`; its Minor and out-of-scope findings are listed below |
| 2 — texts of the window, last minutes of the chronicle | `d7ac8a9..e759559` | **none**; executor report `reports/slice-2-report.md` |
| 3 — the window as a component | `e759559..f4b0fee` (`5485e51`, `f4b0fee`) | **none**; `reports/slice-3-report.md` |
| 4 — the window on the screen and in the game view | `f4b0fee..35c03cd` | **none**; `reports/slice-4-report.md` |
| 5 — the lines of the end leave the world area, the band yields | `35c03cd..87558d2` | **none**; `reports/slice-5-report.md` |
| 6 — styleguide rule | `87558d2..01e6c26` | **none**; `reports/slice-6-report.md` |
| 7 — coding guideline tables | `01e6c26..6de72db` | **none**; `reports/slice-7-report.md` |

You judge every slice without a review of its own as section 2 of the skill judges a slice, its executor's own-work check included; this review is the only one it gets. Name for each blocking finding the slice (its number and commit) it comes from, or that it spans slices, or that it comes from none (a gap of the plan or the foundation entries). Executors' reports are claims to verify, not evidence.

## Mismatches the mechanical checks passed on (judge each)

- Files changed beyond a slice's *Change* list: slice 1: `tests/sim/encounters.test.mjs`, `tests/sim/skills.test.mjs`, `stryker.config.json`, and (commit `d7ac8a9`, authorized by the orchestrator after the version bump broke them) `tests/view/account-screen.test.mjs`, `tests/view/trip.test.mjs`; slice 4: `tests/view/account-screen.test.mjs`; slice 5: `tests/view/end-question.test.mjs`.
- Slice 5: `tripTexts` in `src/browser/view/trip-lines.ts` keeps its deposit branch (the window's `endCostLine` reads it), where the plan says it leaves; only `deathSettlementLine` left. The executor reports that no test checks the window's settlement text after a load (`tests/view/trip.test.mjs` now compares `run.deathSettlement`).
- Slices 6 and 7: Prettier realigned the Roles table of the styleguide (28 lines) and about 60 lines of the browser table of `guidelines/coding-browser-module.md` and 17 of the simulation table; two emphasis markers in the prose of the browser file changed from `*…*` to `_…_` — whitespace and markup only, demanded by `prettier --check` which failed on the base.
- Slice 7's report names a gap: `src/browser/view/end-window-lines.ts:47-49` writes three action identifiers (`"walkTo"`, `"walkToCampfire"`, `"wander"`) in a view file, while the browser rule "Nazwy treści z danych" and its invariant `content-identifiers` cover maps, resources and archetypes only. Judge whether it is a finding of this change.

## Gaps of reading the executors reported (judge each; resume nobody)

- Slice 2's executor did not read whole `foundations/invariants.md` entries `browser-view-framework`, `eslint-source-rules`, `prettier-source-format`, `rule-state-from-pick`, the glossary entries and the part-map entry; it read `tests/view/chronicle.test.mjs` in part (it appended two tests).
- Slice 3's executor opened D-53 and D-93 only as the entries quote them; slice 5's did not read D-362; slice 6's did not open D-208, D-323, D-45, D-279, D-46, `run-screen.tsx` and `game-view.ts`; slice 7's read none of the decisions (none needed by its rows).
- Unchecked in a real browser by every executor: a completion played to the end by a real program (a composed state stood in), the window with the row of warnings under the menu bar standing; slice 4's executor checked everything else with the real menu bar, no screenshot kept.

## Other things to judge

- **The covered screen is hidden, not layered** (plan *Choices* row 7; orchestrator's answer): while the window stands, the header and the three areas of the screen are `hidden` and the window is an ordinary block under the menu bar. Task Question 1 says the window "covers the screen with its header" and "pod oknem scena zostaje ze światłem w pełnym złocie, a ✕ ją odsłania". Judge whether hiding meets the task and the foundation entries (D-362, D-311).
- **D-362's wording against the code**: the sentence names the discovery before the longest streak, the plan and the task put the streak first under the title; the code follows the plan. D-362's heading question differs from the projected entry's ("What does the end-of-run window say, and how does it open and close?" against "What does the end of a map run explain?"), and D-132's text says "the completion text of the map from its data" where the definition says „{mapa} rozwiązana”. The orchestrator will align D-362's order in the return step; grade each departure of an entry from the code or the task as WAY-263 gives.
- The bar of time's pieces differ only by position, gap and length, because the token file holds no series of fills; the rule of the styleguide and the report of slice 3 name it as open for the human; no value was added to `src/browser/tokens.css`. Judge that this is a correct handling of `src/browser/AGENTS.md`.
- Screenshots: none is kept or published by any executor; the orchestrator takes the ones that go to the request.

## Findings of the slice review of slice 1 to grade as findings of this review

Grade each of these as a finding of this review (Minor findings within the task are fixed before the request; say where one lies outside the task). From `reports/slice-1-review-report.md`:

1. (Minor) `src/browser/sim/saved-game.ts:997`, the `record` reader: the load does not demand the data's item order for `enteredWith`, which the type comment and the slice's Goal state for what the game writes; a document with another order loads.
2. (Minor) the same reader: `enteredWith` counts are bounded only by "a safe integer from 1", not by what the character could carry; `Number.MAX_SAFE_INTEGER` loads.
3. (Minor) `tests/sim/run-record.test.mjs:196-241`: the fight test's expected counts partly repeat the product's rule.
4. (Out of scope) D-339's Verification and Rationale say "the saved game state keeping its version", which may now read as stale after the bump.
5. (Out of scope, from its Declined to judge) the shared reader admits `-0`; already the case before the range.

## Report

Write the full report as `SKILL.md` section 4 and `whole_change.md` give: first line `PASS <sha>` or `FAIL <sha>`; findings by grade with place, reasoning, evidence, and for each blocking finding its slice; each Minor finding with its place in the code and its own words and a note where it lies outside the task; **Declined to judge**; each check you ran with command and exit code; each reach beyond the dispatch; **Unread material:** opening with the counts of decisions read whole and by title, and **Searches not found or unclear:**. Name every changed invariant test. Return to the orchestrator only the first line, the counts of blocking, Minor and out-of-scope findings, a one-line check result and the report path.
