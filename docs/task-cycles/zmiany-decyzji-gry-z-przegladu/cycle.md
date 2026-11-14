# Cycle record — loop2: zmiany decyzji o grze i ekranach z przeglądu fundamentu

- Task source: the task's note in the author's private backlog notes, `updated: 2026-11-13`, frozen as `task.md` beside this record
- Task relation: independent
- Product repository: mariusznazar/loop2
- Process pin: `55afa8e57aa1b83c77108576a36642722e0dda15` (the gitlink of `.the-way`, unchanged by the task)
- Target branch and base: main, `5159e8c475a5faa77529020a51b21e271c695132` (origin/main after fetch; the local main checkout stood 17 commits behind and was left as it is)
- Task branch: task/zmiany-decyzji-gry-z-przegladu (worktree the task's worktree, the repository's root)
- Status: request open

## Two questions at start

- Trust boundary: yes — the part map names `src/browser/sim/saved-game.ts` as the trust boundary of `simulation` (a saved game document taken in from the server and the page's memory). The change touches that file only in the comment above `SAVED_GAME_VERSION` (to-do item 1). Every code review was told so and checked that the change to this file is a comment alone: no code, no value, no behaviour of the loading of a crafted document changes. No other trust boundary file is touched (`guidelines/**` and `foundations/**` are no boundary). The review of the whole change confirmed the diff of the file is a comment alone.
- Irreversible operation: no — the change is wording of foundation entries, one guideline sentence and one comment; nothing is deployed, migrated or deleted.

## Spec and execution route

- Open design choice at start: none — every to-do item gives the entry, the passage and the new meaning (items 1–9); the three rows of *Settlements to record* settle the invariant (row 3), the glossary entry (row 2) and the new decision (row 1, with its two answered questions and their *Not chosen*); the wording of each is the author's (WAY-134). The four *Questions to settle* are answered with a source in the task. The new decision's *Rejected* takes the ways the task's questions record as not chosen (screen resolution; Firefox added to the playing skill) and the F-40 variant "no entry".
- Reserved choice: none — no language, framework, library, store of data, login or place to run is chosen; the decision names the browsers the game supports.
- Execution route and reason: one author without a plan — nine entries of the foundation, one guideline sentence and one comment in one place of the repository; no code behaviour changes; one agent holds all of it. Class `same` as the orchestrator's (not the default `cheaper`): the change is binding wording of ten decisions, an invariant, a glossary entry, a new decision and a guideline across three parts (`product-foundation`, `simulation`, `agent-workflow`), and the replacement of "loop" in decisions needs a judgment at each place (earning loop, previous game, or another sense), which a cheaper class mis-reads more often than it saves.
- Author: one author, class `same`, harness model `claude-sonnet-5-5`, agent `general-purpose`; resumed three times — for the repair of its report and the D-136 choice (Q4), for the fix of the review's findings (class `same`, the one author's class), and for the return step; never replaced.
- Plan: none on the one-author route
- Discarded attempt: none
- Slices returned too large: none
- Agent waiting: Claude Code; the first author dispatch and the first review were foreground-launched agent calls reported by completion notification; resumed agents reported by completion notification; the orchestrator yielded the turn while one agent or the gate ran. No timeout or interruption occurred.
- Whole-change review: a fresh reviewer (`general-purpose`, `claude-sonnet-5-5`, class `same`), range `5159e8c4..3767fd3d` (3 commits), report `reports/review-whole-report.md`, first line `FAIL 3767fd3d15f3c1c8efc65987fe3817f6d9240a7c`; changed files with added and removed lines at that head: `foundations/decisions.md` 51/37, `foundations/glossary.md` 6/0, `foundations/invariants.md` 2/2, `guidelines/coding-saved-game.md` 2/2, `src/browser/sim/saved-game.ts` 3/1. Coverage: every to-do item 1–9, rows 1–3, the four answered questions and *Out of scope* were checked one by one in its "Verdict on the task" table; source fidelity checked against the base's code; the diff of the trust-boundary file confirmed a comment alone; it read 38 of 393 decisions whole and 355 by title, named D-288 and D-349 as unread and bearing on its finding, and the fix review read them whole. One blocking finding (D-393 against D-280 and D-389), three Minor within the task, five Minor outside the task. After the fix, the same reviewer: `PASS dd0e6cb6e8380d42066276c2fb19e8ae5dbbc9c4` (`reports/review-fix-report.md`), one new Minor.
- Review rounds:
  - findings `reports/findings-1.md`: range `5159e8c4..3767fd3d`, report `reports/review-whole-report.md`; blocking: D-393 collides with D-280 and D-389 and sits next to D-288 and D-349, no precedence recorded (Important); Minor within the task fixed with it: the guideline's second paragraph, D-120 *Rationale*, D-393 *Verification*; fix `dd0e6cb6` on the one author's class (`same`), report `reports/fix-report.md`; review of the fix by the same reviewer, `PASS dd0e6cb6`, no blocking finding remained, one new Minor (D-393's named list omits D-349 and D-370).
- Weakest-point checks: author — requirement "item 8 changes every bare loop that means the earning loop, and nothing else"; check: a count of standalone `loop`/`loops` before and after (227 → 202, 25 fewer) and a reading of each remaining use by context; showed 25 places in 12 decisions changed, one place (D-136) unclear and later decided by the orchestrator (Q4); stated in `reports/author-report.md`. The whole-change reviewer sampled all 202 remaining candidates in context and read the changed hunks: none of the remaining means the earning loop, none changed means the previous game.

## Slices

| Slice | Base | Class, executor and model | Risk | Head | Mechanical check and retry | Review, fix and review of the fix |
|---|---|---|---|---|---|---|

One-author route: no slices.

## Events

| Time | Stage | Actor and model | Handoff, skill and inputs | Output or full report | Short result and next step |
|---|---|---|---|---|---|
| 1 | Start | orchestrator, claude-sonnet-5-5 | task `task.md`; `.the-way` gitlink `55afa8e5` equals checkout HEAD | worktree and branch from `5159e8c4` | task read: ready for cycle, Human actions none, independent; quotes of every *Decisions in play* entry still stand on the base |
| 2 | Base gate | orchestrator | `npm test` on the base | `reports/base-gate.log` | exit 0, 558 tests passed; no check failing on the base |
| 3 | Author dispatch | orchestrator → author, claude-sonnet-5-5 (class `same`) | `make-change`, "the whole change as the one author"; `reports/author-handoff.md` | `reports/author-report.md` | status `done`; commits `2e5c2a80`, `285a210c`; foundation check exit 0 |
| 4 | Author report | author | `reports/author-report.md`; commits `2e5c2a80`, `285a210c` | status `done`; foundation check exit 0; lacks **Unread material**; D-136 left unclear | report returned for repair of the missing section (WAY-326); D-136 decided (Q4); author resumed |
| 5 | Author resumed, report repaired | author | D-136 and missing section | commit `3767fd3d`; report now holds Unread material; mechanical check passed (clean tree, 3 commits, files = task's, `.ts` diff comment only, sections present) | autonomous choice Q5: the invariants named only as Verification and the other sections of the review note unread by the author bear on nothing it judged (changes are wording of decisions it read whole); the whole-change reviewer selects its own foundation; next: whole-change review |
| 6 | Whole-change review dispatch | orchestrator → reviewer, claude-sonnet-5-5 (class `same`) | `review-change`, "the whole change"; `reports/review-whole-handoff.md`; range `5159e8c4..3767fd3d` | `reports/review-whole-report.md` | foreground dispatch |
| 7 | Whole-change review returned | reviewer | `reports/review-whole-report.md` | `FAIL 3767fd3d`; blocking 1, Minor within task 3, Minor outside the task 5; trust boundary confirmed comment alone; Unread material and Searches present | findings file `reports/findings-1.md`; fix handoff `reports/fix-handoff.md`; precedence choice Q6; author resumed for the one fix |
| 8 | Fix and review of the fix | author (resumed, class `same`); reviewer (resumed) | `reports/findings-1.md`, `reports/fix-handoff.md`; range `3767fd3d..dd0e6cb6` | `reports/fix-report.md`, `reports/review-fix-report.md` | fix commit `dd0e6cb6`; review of the fix `PASS dd0e6cb6`; one new Minor (D-393's named list omits D-349 and D-370) goes to the request's list; next: return step |
| 9 | Return step | author (resumed, class `same`) | `reports/return-handoff.md`, `.the-way/task-cycle/skill/return_step.md` | `reports/return-report.md` | status `done`, `no commit`; Unread material and Searches (`none`) present; nothing to correct or write; no review of the return step (no commit) |
| 10 | Reconciliation with the target branch | orchestrator | `git fetch`; `origin/main` is `5159e8c4`, an ancestor of HEAD | none | no merge and no review of a merge needed |
| 11 | Final gate | orchestrator | `npm test` on `dd0e6cb6` | `reports/final-gate.log` | exit 0, 558 tests passed |
| 12 | Request | orchestrator | `request.md`, `stages.md`, remarks check | see *Request handoff* | request opened as described there |

## Questions and autonomous choices

| ID | Question and source | Answer or choice | Evidence | Alternative rejected | Cost if wrong | Used by |
|---|---|---|---|---|---|---|
| Q1 | Branch base: the local `main` stands 17 commits behind `origin/main` | base on `origin/main` (`5159e8c4`), the current target | `git fetch`; `git status -sb` showed `behind 17` | base on local main `6ab6a32b` | the branch would lack 17 merged commits, among them changes to `foundations/decisions.md` | branch |
| Q2 | Does the cycle need a spec? | no | task *Questions to settle* all answered; rows 1–3 settle the entries | write a spec | a spec of a settled change costs more than the change | route |
| Q3 | Class of the author | `same` (sonnet) | see *Execution route* | `cheaper` (haiku) | a mis-read "loop" in a decision, or a mis-worded binding sentence, found by review and fixed once | author |
| Q4 | D-136 *Rationale* "Las teaches keeping the loop going": earning loop or the previous game? (author's unclear place) | earning loop; change to "keeping the earning loop going" | the sentence follows "a map checks whether a program survives on its own"; the earning loop is what a surviving program keeps going; the other reading (the previous game) has no sense with "teaches keeping … going"; the whole-change reviewer accepted it | leave it, which after the new glossary term would read as the previous game | one word, found by review | author resume; commit `3767fd3d` |
| Q5 | The author's report listed unread material: the invariants named only as *Verification* of changed decisions, the other sections of the review note, D-213 | no further reading by the author | the changes are wording of decisions the author read whole; the whole-change reviewer selects its own foundation and read the invariants it needed | resume the author to read them | a wording error in a changed decision would stand until the review, which reads them | review |
| Q6 | D-393 collides with D-280 and D-389 (windows narrower than 1280 × 720): which prevails? (review finding 1) | D-393 states that decisions defining the look in a narrower or lower window keep their meaning there; a fault of the look below the smallest window where no decision defines it is not fixed | task row 1 answers only the remark about a window with no defining decision; D-280 and D-389 name windows of 1000 and 400 px as their own examples; the reviewer's first recommended answer; passages of the task that give the outcome: "każda uwaga o Safari i o wąskim oknie zostaje bez miary" (row 1's source) and "czy uwaga o Safari albo o oknie 1000 px jest błędem do naprawy i jak mierzyć okno" (what the cycle would otherwise guess) | D-393 prevailing over D-280 and D-389 (`narrows`) — changes the meaning of two approved decisions beyond what the task carries (WAY-30) | the human reads D-393 at the request and may widen or narrow it; one decision to edit | fix `dd0e6cb6` |
| Q7 | Fix of the review's Minor finding that the named list in D-393's third sentence omits D-349 and D-370 (new in the review of the fix) | not fixed in this request; listed | rule: a Minor finding that is new after the fix does not block and goes to the request's list (WAY-162) | a second fix round | the list reads as exhaustive until the human decides; the clause "where no decision defines it" already protects both decisions | request |

## Artifacts

| Kind | Path or commit | Author or agent | Review result |
|---|---|---|---|
| Frozen task | `docs/task-cycles/zmiany-decyzji-gry-z-przegladu/task.md` | orchestrator | — |
| Decisions, glossary, invariant, D-393 | commit `2e5c2a80` | author | judged by the whole-change review |
| Guideline sentence and the comment above `SAVED_GAME_VERSION` | commit `285a210c` | author | judged by the whole-change review |
| D-136 word | commit `3767fd3d` | author | judged by the whole-change review |
| Fix of the review's findings | commit `dd0e6cb6` | author | `PASS dd0e6cb6` |
| Return step | no commit | author | none needed (no commit) |
| Reports | `reports/author-report.md`, `reports/fix-report.md`, `reports/return-report.md`, `reports/review-whole-report.md`, `reports/review-fix-report.md`, handoffs `reports/*-handoff.md`, findings `reports/findings-1.md`, gate logs `reports/base-gate.log`, `reports/final-gate.log` | agents, orchestrator | — |

## Verification

| Command or manual check | Actor, commit and environment | Exit code and result | Failed or unchecked |
|---|---|---|---|
| `npm test` on the base alone (`reports/base-gate.log`) | orchestrator, `5159e8c4`, worktree after `npm ci` and the quality venv | exit 0; 558 tests in 4 directories passed, 0 errors; includes `foundation_check.py` | none failing on the base; nothing unchecked |
| `python -B .the-way/elements/common/foundation_check.py` (with and without `--skip-test-citations`) | author, `2e5c2a80` and after | exit 0, 0 errors | none |
| `npx prettier --check src/browser/sim/saved-game.ts`; `npx eslint src/browser/sim/saved-game.ts` | author, `285a210c` | exit 0; exit 0 | none |
| `python -B -m unittest test_streak_program_change` (in `tests/invariants/`) | author, `2e5c2a80`; reviewer, `3767fd3d` | exit 0, 5 tests OK | none |
| `git diff --check`; `foundation_check.py` | fix author `dd0e6cb6`; reviewer of the fix | exit 0; exit 0, 0 errors | none |
| `npm test` on the final tree (`reports/final-gate.log`) | orchestrator, `dd0e6cb6` | exit 0; 558 tests in 4 directories passed, 0 errors; includes `foundation_check.py` | none failed; nothing unchecked; no check left to the human |
| `python -B .the-way/task-cycle/review_reminder.py origin/main` | orchestrator | exit 0; `tag: foundation-review/2026-11-13`, `merges: 5`, `threshold: 30`, `reminder: no` | none |
| Tests of `loop-practice-payment` (`tests/sim/loop.test.mjs`) | not run separately by the author | covered by the gate | none |
| `python -B .the-way/task-cycle/remarks_check.py docs/task-cycles/zmiany-decyzji-gry-z-przegladu` (original) | orchestrator | 2 runs: exit 1 listing 12 items, then exit 0 after they were appended to the process remarks word for word | none |
| `python -B .the-way/task-cycle/private_paths_check.py docs/task-cycles/zmiany-decyzji-gry-z-przegladu` (copy) | orchestrator | 3 runs: exit 1 listing 23 places before the cleaning, then exit 0, exit 0 | none |
| `python -B .the-way/task-cycle/image_files_check.py docs/task-cycles/zmiany-decyzji-gry-z-przegladu` (copy) | orchestrator | 2 runs: exit 0, exit 0 | none |
| `python -B .the-way/task-cycle/remarks_check.py docs/task-cycles/zmiany-decyzji-gry-z-przegladu` (copy) | orchestrator | 2 runs: exit 0, exit 0; 12 items, 0 missing | none |
| `python -B .the-way/task-cycle/request_check.py` and `private_paths_check.py` on the description | orchestrator | exit 0 and exit 0, 1 run each before the record's link; checked again after it | none |

For no invariant test the change writes or alters: no test was written or changed. No screen changed; no screenshot.

## Return step

- Foundation compared with code: the entries the change writes or changes (D-369, D-346, D-383, D-120, D-186, D-179, D-311, D-367, D-136, D-393, the glossary entry `loop`, the invariants `streak-program-change` and `loop-practice-payment`, the places of item 8), those the task names and the part-map entries of `product-foundation`, `simulation` and `agent-workflow`, compared with the code by the author; nothing no longer matched (`reports/return-report.md`)
- Decisions written or changed: D-369, D-346, D-383, D-120, D-186, D-179, D-311, D-367, D-393 (new), and the earning-loop words of D-93, D-136, D-164, D-189, D-208, D-239, D-241, D-246, D-247, D-251, D-329, D-389
- Invariants written or changed: `streak-program-change` (row 3 of the task); `loop-practice-payment` (one word, "the earning loop", moved by the glossary entry `loop`)
- Environment facts: none (the claim that the WebKit of the computer does not install with the Playwright in use stands in D-393 *Rejected* only; the return step found no source the template accepts)
- Glossary terms: `loop` (row 2)
- Part-map changes: none
- Projected entries written whole or in part: none
- Rows of *Settlements to record* written: row 1 — D-393; row 2 — glossary `loop`; row 3 — invariant `streak-program-change`

## Request handoff

- Request URL and status: https://github.com/mariusznazar/loop2/pull/94 — opened as a draft; marked ready after the record's commits are pushed and the description is filled in
- Description: `request.md` beside this record, written by `task-cycle/skill/request_template.md`; the form check `python -B .the-way/task-cycle/request_check.py docs/task-cycles/zmiany-decyzji-gry-z-przegladu/request.md --task docs/task-cycles/zmiany-decyzji-gry-z-przegladu/task.md`, last exit 0, 1 run before the record's link; written and checked after this commit for the final description
- Writes to the task's backlog entry: the request link `[url::https://github.com/mariusznazar/loop2/pull/94]` added to the task's line after its estimate; its status `[/]` left as it is, since only the human's merge makes the task done
- Process remarks on the-way:
  - Author report, docs/task-cycles/zmiany-decyzji-gry-z-przegladu/reports/author-report.md: D-136's "the loop going": unclear to me; the orchestrator decided it (changed).
  - Author report, docs/task-cycles/zmiany-decyzji-gry-z-przegladu/reports/author-report.md: The note names `D-62:1391`, `D-311:7436`, `D-189:3690` etc. by line; I re-found each by text. All places F-38 names stand on the base. F-38's "ok. 10 places in ok. 8 decisions" was a rough count: the real count is 25 places in 12 decisions (the review counted only the short "the loop"; the task asks for "loops" as well).
  - Author report, docs/task-cycles/zmiany-decyzji-gry-z-przegladu/reports/author-report.md: The *Based on* of D-393: the fact that the WebKit of the agents' computer is too old for the installed Playwright is a statement about the tools; I put it only into *Rejected* (as the task's *Not chosen* keeps it) and left *Based on* `none`, since the environment facts hold no fact about WebKit (`grep` on `foundations/environment_facts.md` for `webkit`/`chromium`: no entry).
  - Author report, docs/task-cycles/zmiany-decyzji-gry-z-przegladu/reports/author-report.md: A test or script that compares a test's docstring with the sentence of its invariant: none found (`foundation_check.py` only checks identifiers).
  - Fix and review of the fix, docs/task-cycles/zmiany-decyzji-gry-z-przegladu/reports/fix-report.md: None unclear. One judgment is open to the reviewer: D-370 is not named (see above).
  - Fix and review of the fix, docs/task-cycles/zmiany-decyzji-gry-z-przegladu/reports/fix-report.md: A search for other decisions whose binding sentence defines a narrower or a lower window was not repeated beyond the nine the handoff and the finding name; the reviewer's own search is the other source.
  - Fix and review of the fix, docs/task-cycles/zmiany-decyzji-gry-z-przegladu/reports/review-fix-report.md: A search of the decisions for other binding sentences that define a narrower or lower window, beyond D-280, D-282, D-311, D-389, D-349 and D-370, was not repeated; from the first review, D-278 (login card at 1280 × 800, above the line) and D-316/D-322 (no window) were skimmed, not read whole. None unclear otherwise.
  - Whole-change review returned, docs/task-cycles/zmiany-decyzji-gry-z-przegladu/reports/review-whole-report.md: "Chromium for the agent's daily checks": no file of the repository names the engine of Playwright CLI/MCP (`.claude/skills/loop2-play/SKILL.md`, `.playwright/cli.config.json`, D-254, `foundations/environment_facts.md`: `grep` for chromium/webkit/firefox gave no hit). The claim stands on the task's Q2 answer only.
  - Whole-change review returned, docs/task-cycles/zmiany-decyzji-gry-z-przegladu/reports/review-whole-report.md: `WebKit` and `Playwright` in `foundations/environment_facts.md`: no entry (also reported by the author).
  - Whole-change review returned, docs/task-cycles/zmiany-decyzji-gry-z-przegladu/reports/review-whole-report.md: The origin of "keeping the loop going" in D-136: `git log -S` finds only `7e3aa5e8` (text moved) and `3767fd3d`; the meaning stays an inference.
  - Whole-change review returned, docs/task-cycles/zmiany-decyzji-gry-z-przegladu/reports/review-whole-report.md: A test or script that compares a test docstring with the sentence of its invariant: none found.
  - Whole-change review returned, docs/task-cycles/zmiany-decyzji-gry-z-przegladu/reports/review-whole-report.md: The author counts 25 places in 12 decisions plus D-136 (26 in 13); I counted the changed hunks of the diff (26 places) and did not recount the base. The F-38 "about 10 places in about 8 decisions" was a rough count of the review, as the author says.
