# Handoff — the return step, task `edytor-programu`

## Delegation
The person who requested this cycle delegated every intermediate choice to the orchestrator of `implement-task`. You never ask the human; a question the foundation step allows goes back as status `blocked` (see the file named below). Your go-ahead is provisional; the human accepts the entries by merging the request.

## Where you work
- Worktree (work from its root): `C:/Storage/repos/loop2-wt/edytor-programu`, branch `task/edytor-programu`, head `a504688` (the reviewed change, gate run on it). Task base `6fec0ea`. Commit on this branch; push nothing.
- Pinned process: `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
- Stage: **the return step** (not a row of `make-change`'s table: your stage is named by its file). Read in full `.the-way/task-cycle/skill/return_step.md` and `.the-way/task-cycle/skill/foundation_step.md`, and the project skill of an element when you write an entry of that element (`the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-record-environment-fact`, `the-way-update-part-map`).
- Report: `docs/task-cycles/edytor-programu/reports/report-return-step.md` (if your tool refuses the file, return the whole report as text).
- Commit by paths with `git add <paths>` only; messages in English in the repository's form (`git log --oneline -8`); do not run the product's full gate.

## What the return step compares
The entries the change writes or changes (rows E1–E37 of the plan's *Foundation entries*: D-288 to D-307, and the changed D-03, D-27, D-39, D-43, D-44, D-91, D-93, D-124, D-166, D-180, D-196, D-245, D-255, D-282, `icon-credits`, `game-icons-licence`, the 11 `game-icons-*-title` facts), those the task names (`docs/task-cycles/edytor-programu/task.frozen.md`, *Decisions in play*), and those the search of the foundation finds, and the part map of the touched parts (browser-view, simulation, agent-workflow, product-foundation) — each against the code at the head and the diff `6fec0ea..a504688`. Correct, in the same change, whatever no longer matches. The plan is `docs/task-cycles/edytor-programu/plan.md` (its *Foundation entries* table and *Choices*), the cycle's autonomous choices Q1–Q10 and P1–P28 are in `docs/task-cycles/edytor-programu/cycle.md`, the review of the whole change is `docs/task-cycles/edytor-programu/reports/report-review-whole.md`.

## Candidates the orchestrator noticed (judge each; do not assume it is a mismatch)
- D-297 (and its *Verification*) says the arrows are disabled only on the program's first and last rule; the code moves a rule across an empty group at the program's edge and the arrow stays active there (`src/browser/view/program-editor.ts` `ruleArrows`/`moveRule`; case "an empty group takes it too" in `tests/view/program-editor.test.mjs`).
- D-289 *Verification* names a greyed cell with no reason as a violation; the code shows a held value that no reason fits chosen and greyed with no reason (Q7).
- D-304 says „+ dodaj grupę” stands beside „+ reguła”; the code puts it in the footer under the groups (`src/browser/view/rule-list.tsx`).
- D-306 and D-294: leaving the number field confirms the number and opens no next field; the folding memory keys the copy as „copy” (so folds of one copy carry to another). Compare each with its entry's words.
- The examples of D-288 and D-306 write „patyk” in lower case, where the task's criterion and the code write „Patyk” (target names shown capitalised in sentences); D-293 time rules; D-291 one icon per action.
- The Programy screen now has a third area (the rule panel) and breakpoints (1100 px, 720 px) in `src/browser/styles.css`; D-282 says each column is an area of its own that a narrower layout can rearrange; compare, and the part map's description of browser-view.
- The trip count rule of D-181 now stands on the shared React number field (`rule="trip"`); D-44 (shared controls) and D-265 (two forms of a shared control).
- Anything else you find by the search of the whole foundation for the words the change moved: the DOM editor is gone (`createProgramEditor`, `createTripEditor`, group arrows, „Dodaj regułę”, „Dodaj grupę”), the rule list, rule panel, trip plan and program panel are React.

## Bounds (binding)
- You write a foundation entry only through its element's skill; you never change the meaning of an approved decision beyond what the task and its sources carry (WAY-30). Where the code and an entry disagree and the right fix is a change of the entry's meaning or of the code, you do NOT choose: return the question with status `blocked`, with the entry, the code, the options and your recommendation — the orchestrator puts it in the request for the human. Where only the wording of an *example*, a *Verification* illustration or a stale comment-level statement is wrong and the entry's rule stays, correct it.
- You change no code, no test and no guideline file; review findings of the request are no foundation entries; no entry is deferred or "proposed for later".
- An invariant only for a rule the task, a decision or the human sets.
- Keep for the request one sentence (Polish) of the meaning of each entry you write or change, with its identifier.

## Report
Status (`done`, `done with concerns`, `questions`, `blocked`), your commits, per entry compared what no longer matched and its correction, or none (the *Return step* block of the record needs: foundation compared with code; decisions written or changed; invariants; environment facts; glossary terms; part-map changes; projected entries written whole or in part; rows of *Settlements to record* written), the checks you ran with command and exit code (at least `python -B .the-way/elements/common/foundation_check.py`), each reach beyond this handoff, **Searches not found or unclear:** or `none`, and questions with a recommendation. Return only: status, commits, a one-line check result naming what failed or did not run, and the report path.
