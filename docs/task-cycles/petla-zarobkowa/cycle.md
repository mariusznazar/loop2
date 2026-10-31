# Cycle record — Pętla zarobkowa na mapie rozwiązanej i doliczanie czasu nieobecności

- Task source: `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\petla_zarobkowa_loop2.md`,
  accepted by the human 2026-10-30 ("akceptuję"; plan change log 2026-10-30, version sha256
  `e18889bb68bc…`); the file at the cycle's start has sha256 `880d3f38463b…` and differs from the
  accepted version only in its line `Status:` (`waiting for human` → `ready for cycle`; checked by
  replacing that line back, which gives `e18889bb68bc`); frozen copy [task.md](task.md)
- Task relation: plan item — `plan_mvp_loop2.md`, task 18 `petla-zarobkowa`; depends on 14, 16
- Product repository: `C:\Storage\repos\loop2`; worktree `C:\Storage\repos\loop2-wt\petla-zarobkowa`
- Process pin: `a8dfe8ac62885e88bc8f463e93ab16b621d48e92`
- Target branch and base: `main` at `4ed8fcd31bae90e4505d253663b56fb4443f45a2`
- Task branch: `task/petla-zarobkowa` (created with `--no-track` from `origin/main`)
- Status: request open

## Plan member check

- Definition `definicja_mvp_loop2.md`: `Status: approved 2026-10-29`, sha256 `fda97782458d…` — the
  version the task cites. Holds.
- Plan `plan_mvp_loop2.md`: `Status: handed over 2026-10-28`; row 18 state `ready for cycle`,
  goal, dependencies and In scope (8, 20) as the task states them.
- Depends on 16 `zapis-stanu-na-serwerze`: plan `done`, PR #43 merged 2026-10-30.
- Depends on 14 `rozliczenie-przejsc`: the plan's row still reads `ready for cycle` (a label behind
  the delivery), but the delivering evidence stands: PR #44 merged 2026-10-31T07:54:58Z as `4ed8fcd`,
  on `origin/main`, its record in commit `a8d3990`; the task's line in `_tasks_active.md` reads done.
  The stale plan label is the lead's to reconcile; this cycle does not write the plan.
- Merge window of task 17 `kopia-bazy` (plan change log 2026-10-30): from the manual deployment of
  17's branch to its merge nothing else merges to `main`. It binds the merge, the human's step;
  PR #46 is an open blocked draft. No effect on the cycle; named in the request.

## Two questions at start

- Trust boundary: yes — the part map names `src/browser/sim/saved-game.ts` as the trust boundary of
  `simulation`. The task changes the shape of the game state (To do 10, loops, report, stopped
  line), so that file reads new fields out of a document from outside. Every code review checks
  crafted input there: a document with a forged or malformed earning loop, save time, report or
  stopped line is refused whole. `assets/icons/**` and `assets/fonts/**` are not touched.
- Irreversible operation: yes — raising `SAVED_GAME_VERSION` (To do 10) makes the game discard every
  older saved game state in full at load (D-206) once the merge deploys `main` (D-11). The human
  accepted that cost (task, *Context*, D-206; Q15). The cycle only prepares the raised number,
  performs nothing on the server, and the human performs it by merging. Every code review checks
  that the change only prepares it. No blocked draft: the merge is the human's decision at the
  request and the task document places no action in the cycle (*Human actions*: none).

The cycle prepares an irreversible operation and never performs it; preparing the code for it does
not authorize running it.

## Spec and execution route

- Open design choice at start: yes (WAY-135). *Questions carried to cycle* leave five ways open that
  no row of *Settlements to record* and no projected entry settles, and they reach D-04, D-56, D-22
  and D-207: how the game state holds several characters' map runs beside the one manual map run;
  which generator draws the next seed; how the view's clock passes a loop's time with a hidden tab
  and a sleeping computer; how many saves the catch-up sends; how D-207's comparison treats a save
  time that changes at every save. An agent would design foundation entries itself, so a spec.
- Execution route and reason: planned slices, judged again after the reviewed spec (PASS, 0 findings).
  19 *To do* items, 26 rows of *Settlements to record*, some 30 foundation entries, a new simulation
  module and a large change across `simulation` and `browser-view`; the spec's section 17 finds
  three dependent cuts that one agent could not hold comfortably.
- Author: none, planned route; executors stand in *Slices*.
- Plan: six slices after *Foundation entries*; `plan-size.md` exit 0, all `fits` (Slices 1 and 5 at
  the ten-file limit). A slice needing an eleventh file returns rather than grows. Reopening
  `saved-game.ts` after Slice 1 needs a review of its own (trust boundary).
- Discarded attempt: none
- Slices returned too large: none
- Agent waiting: Claude Code background `Agent` calls, each reporting by completion notification;
  the orchestrator yields the turn when only that result remains.
- Whole-change review: fresh agent, Opus 5.5, `review-change`; range `4ed8fcd..34417de`, first line
  `PASS 34417de`, [reports/14-whole-review-report.md](reports/14-whole-review-report.md); 33 files,
  +5911 −239; every To do, row and projected entry covered, source fidelity by script (22 of 22 Polish
  texts); no blocking finding. Plan review evidence in *Events*.
- Review rounds: none
- Weakest-point checks:
  - Foundation entries: projected wording kept in full; a word comparison with the definition;
    restored one sentence of D-190's *Rationale* (`reports/04-foundation-report.md`).
  - Slice 1: every condition of spec section 13 refused by a guard of its own; 41 breaks, 39 caught,
    the other two explained (`reports/05-slice1-report.md`).
  - Slice 2: the repertoire from the run's skills, and every state with a loop loading back; a test
    with the rank on either character, and a load of every state over 520 minutes
    (`reports/09-slice2-report.md`).
  - Slice 3: a death at the k-th minute's own moment; a mutation settling at the reading failed three
    tests; every report state loads back (`reports/10-slice3-report.md`).
  - Slice 4: one save per result and minutes never passed twice; the account-screen tests and the
    nested flush test showed the expected values (`reports/11-slice4-report.md`).
  - Slice 5: a deposit must not rebuild the rows; red first, green after the chest left `teamKey`
    (`reports/12-slice5-report.md`).
  - Slice 6: focus after „Zamknij”; a test, and a browser check that it lands on the heading
    (`reports/13-slice6-report.md`).
  - Return step: a sentence of the log no link joins; every binding part of D-01 to D-221 read, a
    script over their phrases; found D-121, D-143, D-166, D-174, D-198
    (`reports/16-return-step-report.md`).

## Slices

| Slice | Base | Class, executor and model | Risk | Head | Mechanical check and retry | Review, fix and review of the fix |
|---|---|---|---|---|---|---|
| Foundation entries | `4ed8fcd` | fresh agent, same class, Opus 5.5 | none | `96d7b45` | clean; `foundations/` only; check with command and exit code | judged with slice 1's review |
| 1 | `4ed8fcd` | same, fresh agent, Opus 5.5 | trust boundary, irreversible | `3f99110` | clean; files equal *Change*; checks with commands and exit codes | `FAIL bc8eaec` (I-1), fix `3f99110`, `PASS 3f99110`; Minor M-1, M-2, M-3 in `reports/06-slice1-review-report.md` |
| 2 | `3f99110` | cheaper, fresh agent, Sonnet 5.5 | none | `5791fd7` | clean; files equal *Change*; tests-first order not kept, passed to the review | judged by the whole-change review |
| 3 | `5791fd7` | cheaper, fresh agent, Sonnet 5.5 | none | `ca55922` | clean; files equal *Change*; four stub-satisfied cases passed to the review | judged by the whole-change review |
| 4 | `ca55922` | cheaper, fresh agent, Sonnet 5.5 | none | `b1302fa` | clean; files equal *Change*; mismatches passed to the review | judged by the whole-change review |
| 5 | `b1302fa` | cheaper, fresh agent, Sonnet 5.5 | none | `395b6f3` | clean; files equal *Change*; concerns passed to the review | judged by the whole-change review |
| 6 | `395b6f3` | cheaper, fresh agent, Sonnet 5.5 | none | `34417de` | clean; files equal *Change*; concerns passed to the review | judged by the whole-change review |

## Events

| Time | Stage | Actor and model | Handoff, skill and inputs | Output or full report | Short result and next step |
|---|---|---|---|---|---|
| 2026-10-31 | start | orchestrator, Opus 5.5 | `implement-task` at pin `a8dfe8a`; task accepted 2026-10-30 | this record, `task.md` | plan member check holds; worktree from `origin/main` `4ed8fcd`; base gate started |
| 2026-10-31 | base checks | orchestrator, Opus 5.5 | `npm test`; quality tools installed | `reports/00-base-gate.log`, `reports/00-base-quality.log` | no check fails on the base once the quality tools stand |
| 2026-10-31 | spec, designer | fresh `general-purpose` agent, Opus 5.5 (inherited) | [reports/01-spec-design-handoff.md](reports/01-spec-design-handoff.md), `write-spec` | `spec.md`, `reports/01-spec-design-report.md` | `done`, no questions; four spec checks passed; 423-line spec; design-born entries beyond the task's list named; concerns in the report |
| 2026-10-31 | spec, review | fresh `general-purpose` agent, Opus 5.5 (inherited) | [reports/02-spec-review-handoff.md](reports/02-spec-review-handoff.md), `write-spec` | `reports/02-spec-review-report.md` | `PASS`, 0 findings; `foundation_check.py` on the base exit 0 (its run); three notes for the plan, the foundation step and the maker, passed on in the next handoff. Stale count corrected: the spec has 520 lines, the handoff's 423 was a count that skipped blank lines; the task 384 |
| 2026-10-31 | route, judged again | orchestrator, Opus 5.5 | spec section 17, task | this record | planned slices: 19 *To do* items, 26 rows, some 30 foundation entries, a new module, the view; the spec says one agent cannot hold both cuts |
| 2026-10-31 | plan | fresh `general-purpose` agent, Opus 5.5 (inherited) | [reports/03-plan-handoff.md](reports/03-plan-handoff.md), `plan-task` | `plan.md`, `plan-size.md`, `reports/03-plan-report.md` | `done with concerns`; six slices, `slice_size.py` exit 0, all fit, Slices 1 and 5 at ten files |
| 2026-10-31 | plan, orchestrator's review | orchestrator, Opus 5.5 | plan, size report, task | `plan.md` edited; `plan-size.md` rewritten, exit 0 | provisional go-ahead. Coverage: every To do, all 26 rows and every projected entry stand in *Coverage*; no code in the plan; checks use commands that exist (`npm test -- <file>`, `npm run typecheck`). *Read* added: D-118, D-122 to Slice 2, D-219 to Slice 4. Concern 5 acted on: `simulation-inputs` on frozen inputs added to Slice 3's *Checks*. *Model*: `same` on Slice 1 with its reason, others default. *Risk*: Slice 1 trust boundary and irreversible, others none; *Checks* name no gate run |
| 2026-10-31 | foundation entries | fresh `general-purpose` agent, Opus 5.5 (inherited; the entries change approved decisions and carry projected wording) | [reports/04-foundation-handoff.md](reports/04-foundation-handoff.md), `make-change`, `foundation_step.md`; base `4ed8fcd` | `reports/04-foundation-report.md` | `done with concerns`; commit `96d7b45`; `foundation_check.py` exit 0; D-222–D-234, 14 changed decisions plus D-209's *Rationale* and D-227's `narrows`, 4 invariants, `trip-run-end`, 3 terms; every row 1–26 in an entry, no question for the human. Concerns go to Slice 1's review |
| 2026-10-31 | slice 1 | fresh `general-purpose` agent, class `same`, Opus 5.5 | [reports/05-slice1-handoff.md](reports/05-slice1-handoff.md), `make-change`, base `4ed8fcd`, head at dispatch `96d7b45` | `reports/05-slice1-report.md` | `done with concerns`; commit `bc8eaec`; all focused checks exit 0; gate and `foundation_check.py` not run by it. Mechanical check: clean worktree, non-empty range, files equal *Change*, each check with command and exit code |
| 2026-10-31 | slice 1, review | fresh `general-purpose` agent, Opus 5.5 | [reports/06-slice1-review-handoff.md](reports/06-slice1-review-handoff.md), `review-change`, range `4ed8fcd..bc8eaec` | `reports/06-slice1-review-report.md` | `FAIL bc8eaec`: one Important (I-1, a negative save time written and refused); three Minor; all foundation entries and crafted input held; Stryker 122 of 127, survivors no gaps |
| 2026-10-31 | slice 1, fix | the executor of Slice 1, resumed, class `same`, Opus 5.5 | [reports/07-slice1-fix-findings.md](reports/07-slice1-fix-findings.md), `make-change` variant "the fix of a review's findings", fix range from `bc8eaec`; spec section 13 settled to any sign | `reports/07-slice1-fix-report.md` | `done`; commit `3f99110`; affected checks exit 0 |
| 2026-10-31 | slice 1, review of the fix | the reviewer of Slice 1, resumed, Opus 5.5 | `review-change`, fix range `bc8eaec..3f99110`, `reports/07-slice1-fix-report.md` | `reports/08-slice1-fix-review-report.md` | `PASS 3f99110`; negative save times load; the old reader put back fails 2 of 25 tests; Slice 1's Minor findings M-1, M-2, M-3 kept for the whole-change review |
| 2026-10-31 | slice 2 | fresh `general-purpose` agent, class `cheaper`, Sonnet 5.5 | [reports/09-slice2-handoff.md](reports/09-slice2-handoff.md), `make-change`, base `3f99110` | `reports/09-slice2-report.md` | `done`; commits `aed7f2c`, `5791fd7`; focused checks exit 0. Mechanical check: clean, non-empty, files equal *Change*, checks with commands and exit codes. Mismatch passed to the whole-change review: tests-first order not kept, made up with a red run on stubs and mutations of the real code |
| 2026-10-31 | slice 3 | fresh `general-purpose` agent, class `cheaper`, Sonnet 5.5 | [reports/10-slice3-handoff.md](reports/10-slice3-handoff.md), `make-change`, base `5791fd7` | `reports/10-slice3-report.md` | `done`; commits `6498bc5`, `ca55922`; focused checks exit 0 after one fixed quality failure. Mechanical check: clean, non-empty, files equal *Change*, checks with commands and exit codes. Passed to the whole-change review: four cases satisfied by the red stub were not seen failing |
| 2026-10-31 | correction of stale ranges | orchestrator, Opus 5.5 | `plan.md` | `plan.md` | the settlement of I-1 added one line to `spec.md` at 351, so the plan's citations after it stood one line short; handoffs 09 and 10 dropped the last line of each later passage (section 14 "the definition). Reading the number from the data leaves no 60 in code."; section 15 "`headquarters.ts`, `trip-lines.ts`: section 12. `app.ts` does not change."; section 16 "Tests of loop this spec departs from are named in the task; the rest are taken as cases."). No effect on those slices' scope; the whole-change review checks the no-literal-60 point. Plan's citations shifted by one |
| 2026-10-31 | slice 4 | fresh `general-purpose` agent, class `cheaper`, Sonnet 5.5 | [reports/11-slice4-handoff.md](reports/11-slice4-handoff.md), `make-change`, base `ca55922` | `reports/11-slice4-report.md` | `done`; commit `b1302fa`; five checks exit 0 after one fixed format failure. Mechanical check: clean, non-empty, files equal *Change*, checks with commands and exit codes. Passed to the whole-change review: `account-screen` tests written after the code, red by mutation; `guidelines/testing.md` read in part only |
| 2026-10-31 | slice 5 | fresh `general-purpose` agent, class `cheaper`, Sonnet 5.5 | [reports/12-slice5-handoff.md](reports/12-slice5-handoff.md), `make-change`, base `b1302fa` | `reports/12-slice5-report.md` | `done with concerns`; commit `395b6f3`; six checks exit 0. Mechanical check: clean, non-empty, files equal *Change*, checks with commands and exit codes, no server left. Passed to the whole-change review: two ACTS cases not seen red alone; after „Zatrzymaj” focus falls to the body; browser check on a harness, with four states unchecked |
| 2026-10-31 | slice 6 | fresh `general-purpose` agent, class `cheaper`, Sonnet 5.5 | [reports/13-slice6-handoff.md](reports/13-slice6-handoff.md), `make-change`, base `395b6f3` | `reports/13-slice6-report.md` | `done with concerns`; commit `34417de`; focused checks and `foundation_check.py` exit 0. Mechanical check: clean, non-empty, files equal *Change*, checks with commands and exit codes, no server left. Concerns passed to the whole-change review |
| 2026-10-31 | whole-change review | fresh `general-purpose` agent, Opus 5.5 | [reports/14-whole-review-handoff.md](reports/14-whole-review-handoff.md), `review-change`, range `4ed8fcd..34417de` | `reports/14-whole-review-report.md` | `PASS 34417de`; 0 Critical, 0 Important, 9 Minor (M-1 to M-9), each kept for the request; Stryker 326 killed and 5 timed out of 362, 1 real gap (M-5). Its limit: most decisions of the touched parts not read |
| 2026-10-31 | gate | orchestrator, Opus 5.5 | `npm test`, `foundation_check.py` on `34417de` | `reports/15-gate.log` | both exit 0 |
| 2026-10-31 | return step | fresh `general-purpose` agent, Opus 5.5 | [reports/16-return-step-handoff.md](reports/16-return-step-handoff.md), `make-change`, `return_step.md`, `foundation_step.md` | `reports/16-return-step-report.md` | `done with concerns`; commit `42784ca`, four files, no code; `foundation_check.py` exit 0; `origin/main` still `4ed8fcd`, an ancestor |
| 2026-10-31 | return step, review | fresh `general-purpose` agent, Opus 5.5 | [reports/17-return-review-handoff.md](reports/17-return-review-handoff.md), `review-change`, range `34417de..42784ca` | `reports/17-return-review-report.md` | `PASS 42784ca`; 0 blocking, 4 Minor (m-1 to m-4), kept for the request |
| 2026-10-31 | gate on the final tree | orchestrator, Opus 5.5 | `npm test`, `foundation_check.py` on `42784ca` | `reports/18-gate-final.log` | both exit 0; Node 1076 of 1076, 0 skipped; 315 Python tests in 4 directories, none skipped; `0 errors` |
| 2026-10-31 | reconciliation | orchestrator, Opus 5.5 | `git fetch origin` | `origin/main` is `4ed8fcd`, an ancestor of the branch | no merge needed, no review of a merge |
| 2026-10-31 | request | orchestrator, Opus 5.5 | `git push -u origin task/petla-zarobkowa`, `gh pr create --draft` | PR #47 | draft opened; record committed and removed; description written; marked ready |

## Questions and autonomous choices

| ID | Question and source | Answer or choice | Evidence | Alternative rejected | Cost if wrong | Used by |
|---|---|---|---|---|---|---|
| C1 | Plan *Choices*: first cut into three slices | as the plan's *Choices* | spec section 17 | one slice for the cut | three agents; a seam in `loop.ts` | plan |
| C2 | Plan *Choices*: document and stamping in one slice | as the plan | spec review note 1 | stamping left to the view | larger trust-boundary slice | Slice 1 |
| C3 | Plan *Choices*: shape whole in Slice 1 | as the plan | spec section 13 | reader beside the mechanics | Slice 1's file reopened with its own review | Slices 1–3 |
| C4 | Plan *Choices*: `trip.ts` with the mark in Slice 5 | as the plan | `tripLoot`, `takeTrip` | `trip.ts` in the first cut | none to behaviour | Slice 5 |
| C5 | Plan *Choices*: balance entry with `loopSpan` | as the plan | spec section 14 | first simulation slice | none to behaviour | Slice 3 |
| C6 | Plan *Choices*: two new test files | as the plan | spec section 16 | one file | shared fixture | Slices 2, 3 |
| C7 | Plan *Choices*: the view's cut in three slices | as the plan | spec section 17 | one slice | `game-view.ts` changes three times | Slices 4–6 |
| C8 | Plan *Choices*: page behaviour tested in `tests/view/account-screen.test.mjs` | as the plan | existing document model | new test file | the file grows | Slices 4–6 |
| C9 | Plan *Choices*: a stopped loop's line keeps `practice` `{}` | as the plan | Q13, loop `chest.test.ts:550`, load refuses non-positive counts | the gain kept up to the stop | none the player sees | Slice 3, the report's entry |
| C10 | Plan *Choices*: new invariants read *Method* `review` until their test | as the plan | WAY-61 | `test` from the start | one line in two slices; mechanical checks expect the file | Slices 2, 3 |
| C11 | Plan *Choices*: no sentence for `guidelines/coding-saved-game.md` | as the plan | spec, *Left to the maker* | an eleventh file in Slice 1 | return step may add it | Slice 1 |
| C12 | Plan *Choices*: styleguide sentence with the button | as the plan | D-44 | in the entries' step | none | Slice 5 |
| C13 | Plan *Choices*: default class on Slices 2–6 | as the plan | WAY-229 | a higher class for Slice 3 | a retry one class higher | Slices 2–6 |
| C16 | Designer's nine ways weighed and six readings picked | as `reports/01-spec-design-report.md`, *Ways weighed*, *Readings picked* | spec, its review `PASS` | each row's rejected way | each row's | spec |
| C17 | Foundation agent's nine choices (D-189's sentences, D-22's *Rationale*, D-229's two lines, *Rejected* holding the spec's ways, and others) | as `reports/04-foundation-report.md`, *Choices* | Slice 1's review found no fault in them | each row's rejected way | each row's | Foundation entries |
| C18 | Slice 1's executor's eight choices (`plainMapRun`, `lostGeneration`, `characterKey`, names, test document, `Date.now` mock, and others) | as `reports/05-slice1-report.md`, *Choices* | Slice 1's review | each row's | each row's | Slice 1 |
| C19 | Slice 2's executor's nine choices (signatures, `LoopAdvance`, `nextSeed`, `characterAfterDeath`, and others) | as `reports/09-slice2-report.md`, *Choices* | whole-change review | each row's | each row's | Slice 2 |
| C20 | Slice 3's executor's nine choices (`closeAwayReport` a `GameResult`, `RangeError` always, a death's minute counted, the stop's generation, and others) | as `reports/10-slice3-report.md`, *Choices* | whole-change review | each row's | each row's | Slice 3 |
| C21 | Slice 4's executor's four choices (`runPasses` required, `catchUp()` a reading, and others) | as `reports/11-slice4-report.md`, *Choices* | whole-change review | each row's | each row's | Slice 4 |
| C22 | Slice 5's executor's choices („Puść w pętlę” created at solved maps only; `stoppedLoopLine`'s filter) | as `reports/12-slice5-report.md`, *Concerns / choices* | whole-change review | hiding the button | nil | Slice 5 |
| C23 | Slice 6's executor's five choices (focus to the „Drużyna” heading, plain „Zamknij”, and others) | as `reports/13-slice6-report.md`, *Choices* | whole-change review | the row's program list for focus | a one-line move | Slice 6 |
| C24 | Return step's five choices (focus stays a choice, `catch-up` keeps its wording, D-208's number replaced, and others) | as `reports/16-return-step-report.md`, *Choices* | return step's review | each row's | each row's | Return step |
| C25 | Whether the screenshots of Slice 5 stand in the cycle | they do not; M-7 listed, and the whole-change reviewer's own inspection recorded | `reports/14-whole-review-report.md` | a new browser run for the record alone | none to behaviour | request |
| C15 | Spec section 13 "from 0 up" against the review's I-1 | `saveTimeMs` a safe integer of any sign, null refused; written into the spec | I-1; `tests/sim/death.test.mjs` "a moment below zero settles as any other"; D-07 | clamping in the saver and `keep()`: against D-231 | a forged negative moment gives a long catch-up, which a forged 0 gives too | fix of Slice 1 |
| C14 | Class of the foundation entries' agent, which the plan does not set | same as the orchestrator: the entries change approved decisions and carry projected wording | previous cycle's practice | cheaper | none but cost | Foundation entries |

## Artifacts

| Kind | Path or commit | Author or agent | Review result |
|---|---|---|---|
| Frozen task | [task.md](task.md) | copied by the orchestrator | accepted by the human 2026-10-30 |

## Verification

| Command or manual check | Actor, commit and environment | Exit code and result | Failed or unchecked |
|---|---|---|---|
| Base: `npm test` | orchestrator, `4ed8fcd`, fresh worktree after `npm ci`, Docker available | 1 — build passed, Python: tests/quality FAILED (errors=2), other directories OK; 315 test files/dirs line: `315 tests in 4 directories; failed: tests/quality (exit code 1)`; log `reports/00-base-gate.log` | `test_ruff_source_rules`, `test_shellcheck_source_rules`: `FileNotFoundError`, `.runs/quality-venv` absent from the fresh worktree |
| Gate on the final tree: `npm test`, then `python -B .the-way/elements/common/foundation_check.py` | orchestrator, `42784ca`, Docker available | 0 and 0 — Node 1076 of 1076, 0 skipped; `315 tests in 4 directories; every directory passed`; `0 errors`; log `reports/18-gate-final.log` | none. Unchecked: the whole game against the real account server (a real reload, a crafted version 3 document over HTTP), Tab all the way to „Zatrzymaj” |
| UI, Slices 5 and 6, and the whole-change review | executors and reviewer, Chromium by Playwright over the real view from crafted and loaded states, a harness in `.runs/harness/` | not applicable — row without a loop, row in a loop at 480 px, line after „Zatrzymaj”, mark, section with each title, stopped and other lines, full chest, section after „Zakończ”, mouse click on „Zamknij”, focus after it; screenshots `reports/shots6/` for the report, Slice 5's not kept (M-7), the row inspected again by the reviewer; favicon the only console error | real server and a real reload unchecked |
| Gate: `npm test`, then `python -B .the-way/elements/common/foundation_check.py` | orchestrator, `34417de`, Docker available | 0 and 0 — Node 1076 of 1076, 0 skipped; `315 tests in 4 directories; every directory passed`; `0 errors`; log `reports/15-gate.log` | none |
| Base: pinned quality tools installed as README.md gives (ruff 0.17.1, shellcheck 0.11.0), then `python -B scripts/test.py tests/quality/test_quality_invariants.py` | orchestrator, `4ed8fcd` | 0 — 5 tests OK; log `reports/00-base-quality.log` | none: the two errors came from the fresh worktree's missing tools, not from the code. No check fails on the base. |

## Return step

- Foundation compared with code: the entries the change writes or changes, those the task names and
  a search of D-01 to D-221 by binding parts, and the part map of `simulation` and `browser-view`.
  What no longer matched and its correction: D-229 ("a death stopped"), D-208 (12 and 10 loops), D-232
  (`narrows` D-121, D-143, D-198), D-227 (`narrows` D-166, D-174), `guidelines/coding-saved-game.md`
  (*Przebieg mapy po wczytaniu*). Commit `42784ca`, review `PASS 42784ca` with 4 Minor.
- Decisions written or changed: D-208, D-227, D-229, D-232 (their wording or relations)
- Invariants written or changed: `catch-up-minutes` (one name, no change of meaning)
- Environment facts: none
- Glossary terms: `loop clock` (new)
- Part-map changes: none
- Projected entries written whole or in part: none beyond the foundation step's
- Rows of *Settlements to record* written: none beyond the foundation step's

## Request handoff

- Request URL and status: https://github.com/mariusznazar/loop2/pull/47, ready for review
- Cycle and its reasons: spec for five open design choices; planned slices, six after the foundation
  entries, for the size of the change; whole-change review `PASS`, 0 blocking
- Process pin: `a8dfe8a`, not moved
- What this request settles: the meaning sentences in `reports/04-foundation-report.md` and
  `reports/16-return-step-report.md`, repeated in the request's description
- What the foundation puts in front of the human at the merge: invariant tests altered:
  `save-version`, `resurrection-renewal`, `death-settled-once`, `expired-session-unsaved-progress`.
  Surfaces altered: none. *Violated* marks: none set or cleared
- Checks: `npm test` exit 0, `foundation_check.py` exit 0 on `42784ca`; unchecked named under
  *Verification*
- Human actions the request waits for: none
- Questions: none
- Review findings listed: M-1 to M-9 of `reports/14-whole-review-report.md`, m-1 to m-4 of
  `reports/17-return-review-report.md`; outside the scope: none marked; no check outside the task's
  parts failed and passed again
- Blocked by review: none
- Choices within the request: 25 rows, see *Questions and autonomous choices*
- Writes to the task's backlog entry: the request link and its state in `_tasks_active.md`
- Process remarks on the-way: [process-remarks.md](process-remarks.md), each stage's searches word for
  word
