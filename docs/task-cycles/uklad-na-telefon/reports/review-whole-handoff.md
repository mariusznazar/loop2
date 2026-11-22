# Handoff - the review of the whole change of the task "loop2: uklad na telefon dla wszystkich ekranow gry"

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's go-ahead to you is provisional and never the human's approval. You never ask the human. Your questions go back to the orchestrator in your report.

## Where you work

- Worktree (your working directory; start every command from its root): `the task's worktree`. Branch `task/uklad-na-telefon`, nothing pushed. The cycle's base is `0a2254cd3a6e53c5c569c18b24499fac68bdad6e`, the head to review is `5f5e0088` (`git rev-parse 5f5e0088` gives its full sha). The pinned the-way is `.the-way` of the worktree, at `80006b25feb4c5a6ffdb8f75d993051eecbc745d`; run its scripts as `python -B .the-way/<path>`.
- Your stage: the reviewer of the whole change, method `review-change` - read `.the-way/task-cycle/review/SKILL.md` whole, and a file it names beside it only when the step that names it comes. Variant: the whole change. You made none of it. You are read-only: you change no file of the repository and make no commit.
- The range: `0a2254cd..5f5e0088` (40 files changed, 1917 insertions, 320 deletions). You read the full diff of the range.
- Your directory for working copies: `.runs/review-whole/` (the worktree's ignored `.runs/`).
- Your report path: `.runs/task-cycles/uklad-na-telefon/reports/review-whole-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it): its first line is `PASS <sha>` or `FAIL <sha>` (or `questions`), and it holds the sections **Unread material** and **Searches not found or unclear**, as the method gives them.
- `cycle.md` and the other files of the cycle's record directory - other agents' handoffs, reports and findings - are not yours to read unless this handoff names them. This handoff names: the frozen task `.runs/task-cycles/uklad-na-telefon/task.md`, the plan `.runs/task-cycles/uklad-na-telefon/plan.md`, and the reports of the slices named below.

## Working copies (word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## What you read (you select your own foundation and guidelines)

- The frozen task whole: `.runs/task-cycles/uklad-na-telefon/task.md` (its *Description*, *To do* 1-12, *Acceptance criteria*, *Questions to settle* 1-7 and their answers, *Decisions in play*, *Settlements to record* rows 1-6, *Out of scope*). The plan whole: `.runs/task-cycles/uklad-na-telefon/plan.md` (12 foundation entries, 20 slices, *Coverage*, *Choices*).
- The foundation and the guidelines of the parts the change touches (`browser-view`, `simulation`, `agent-workflow`, `product-foundation`), selected by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` and `.the-way/product-guidelines/reading.md`, the guidelines each whole: the styleguide `guidelines/styleguide-browser-view.md` (rewritten in part by slice 8), `guidelines/coding.md`, the kind files `guidelines/coding-browser-module.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-content-data.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`. State in your report how many decisions you read whole.
- The reports of the executors named below, for the mismatches and the unread material.

## The slices and their ranges (no slice had a review of its own; every one is judged by you)

| Slice | Range | What | Report |
|---|---|---|---|
| 1 | `0a2254cd..587f74f6` | foundation: D-396 whole with rows 5 and 6, new fact `android-touch-target-size`, D-280, D-282, D-311, D-370, D-389, D-44 (row 4), D-416 | `reports/slice-1-report.md` |
| 2 | `587f74f6..68ce5c37` | foundation: D-349, D-372, D-288, D-19 (rows 1-3; the second commit adds "or the tapped tile" to D-19's line under the drawing: orchestrator's ruling Q5) | `reports/slice-2-report.md` |
| 3 | `68ce5c37..0b99767b` | citations in `program-editor.test.mjs`, `run-screen.test.mjs` | `reports/slice-3-report.md` |
| 4 | `0b99767b..69a84584` | citations and the `nameOf` helper in `rule-editor`, `tile-list`, `item-verb-panel` tests | `reports/slice-4-report.md` |
| 5 | `69a84584..628dfd7a` | citations in `world-area`, `scene-picture` tests | `reports/slice-5-report.md` |
| 6 | `628dfd7a..ebe00ef2` | skill `loop2-play` (both copies), `.playwright/cli.phone.config.json` | `reports/slice-6-report.md` |
| 7 | `ebe00ef2..9cb58f9f` | token `--touch-target-min` and the phone block of `styles.css` | `reports/slice-7-report.md` |
| 8 | `9cb58f9f..19034995` | styleguide rules of the two layouts, skill `loop2-scene-art` (both copies); two commits (the second: orchestrator's ruling Q6, links in a running sentence) | `reports/slice-8-report.md` |
| 9 | `19034995..347adcb7` | one threshold of 1280 px and the page shell (`styles.css`, `character-screen.css`, `run-screen.css`, `account-card.css`) | `reports/slice-9-report.md` |
| 10 | `347adcb7..f40ec226` | destructive button in `danger` at rest | `reports/slice-10-report.md` |
| 11 | `f40ec226..9b12062d` | names of the pick cells inside their frames (from the reverted commit `8591aa82`); two commits (the first formats slice 10's test lines) | `reports/slice-11-report.md` |
| 12 | `9b12062d..e88be6b5` | `moveGroup`, `groupArrows`, `tests/view/group-arrows.test.mjs` | `reports/slice-12-report.md` |
| 13 | `e88be6b5..48bbe99c` | arrows in the header of a rule group | `reports/slice-13-report.md` |
| 14 | `48bbe99c..986377e3` | a tap on a tile marks its row | `reports/slice-14-report.md` |
| 15 | `986377e3..5acdcdbb` | the scene's two sizes | `reports/slice-15-report.md` |
| 16 | `5acdcdbb..2b4bbeaa` | login card, waiting screens, menu bar, list of accounts at 360 px (`credits.css`, `styles.css`) | `reports/slice-16-report.md`, `reports/slice-16-evidence/` |
| 17 | `2b4bbeaa..b5615e32` | Siedziba, Postac, Mapy, Wiedza at 360 px | `reports/slice-17-report.md` |
| 18 | `b5615e32..137a2267` | Programy and the editor at 360 px | `reports/slice-18-report.md` |
| 19 | `137a2267..5f5e0088` | the screen of a map run, its table of tiles and the end-of-run window at 360 px | `reports/slice-19-report.md` |
| 20 | no commit | evidence: the screenshots and the loop by taps | `reports/slice-20-report.md` |

The mechanical check of each slice by the orchestrator passed. Passed on to you as information, not as a verdict: files changed outside a slice's *Change*: slice 1 `tests/view/headquarters-screen.test.mjs` (one quoted line of D-44); slice 9 `src/browser/account-card.css`; slice 10 `src/browser/view/controls/react-button.tsx` and `tests/view/program-list.test.mjs` (comment lines; the orchestrator widened the *Change*); slice 11 `src/browser/kitchen-sink/kitchen-sink.css` (a comment; widened) and a formatting commit `e8d02127` of slice 10's test lines; slice 14 `src/browser/view/world-area.tsx`; slice 15 `tests/view/world-area.test.mjs` and a comment of `styles.css`. Unread material that executors named, for you to read where it bears on the diff: slice 10 read none of the styleguide, `coding.md`, `testing.md`, `src/browser/AGENTS.md`, D-39, D-40, D-45; slices 11, 12, 14, 17 read the styleguide and `testing.md` in part, slice 11 D-44 not at all; slices 3, 4, 5 changed only comment lines and a test helper.

## The autonomous choices of the orchestrator you should judge (they bind after the merge)

- Q3: the touch-target minimum is 48 px, from Android's accessibility guidance (fact `android-touch-target-size`), read as 48 CSS px; the task's item 9 asks for "a value from a source the cycle cites". The request puts the source before the human.
- Q5: the line under the drawing of the map follows the tapped tile too (D-19).
- Q6: a link inside a running sentence is outside the 48 px floor; a link that is a control by itself is held to it (styleguide rule 3 of the new rules, slice 8).
- The plan's *Choices* (15 rows), among them: phone rules as overrides in blocks `@media (width < 1280px)` with no media type, the threshold written in each `@media` rule, the scene's two sizes (336 × 152 below 707 px, 672 × 304 from 707 px and in the computer layout), a tap marks only with a touch pointer, the handle of a rule or a group stays in both layouts.
- Slice 15 departed from the plan's even crop: in the phone layout the scene takes the world area's 12 px side padding, so at 360 px nothing is cropped (the crop of 9 px a side would have cut a wolf's tail at the berry bush); threshold 707 px (672 + 2×8 + 2×1 + 17 for a classic scrollbar).
- Slice 19 gives the end-of-run window `max-height: calc(100vh - 220px)` in the phone layout (the styleguide and D-370 speak of a part of the height of the window): judge whether that departs from D-370 as rewritten.

## Matters I ask you to check in particular (they are not findings; judge each by evidence)

- Each rewritten decision against the task: the sentences of *Decisions in play*, the six rows of *Settlements to record*, and whether a decision's meaning moved beyond a row; the `decision:` lines of tests against the log (`python -B .the-way/elements/common/foundation_check.py` runs the check of citations; the orchestrator runs the whole gate later, you run what you need and report each command and exit code).
- That at a page area 1280 × 720 and wider every screen looks and works as before, apart from items 6, 7, 8, 9 of the task: the phone rules stand in blocks `@media (width < 1280px)`; the run screen's two-column rules stand as the base and one column is a phone block.
- Coverage of every item of the task (1-12), every settlement row, every decision in play, and the plan's coverage table; source fidelity of the foundation entries; the new test cases against `guidelines/testing.md` (for example the two new cases of slice 11 carry no `// decision:` citation; the new case of slice 3 for D-19 in `run-screen.test.mjs` quotes a prefix that runs through the tap clause the test does not hold; accessible names „Grupa w górę” / „Grupa w dół” repeat on every group's header).
- The screenshots of slice 20 lie in the public repository `mariusznazar/screenshots`, commit `e8a16687a167c93268f9aa8ef2b987f740617ed7`, directory `loop2/uklad-na-telefon/`, branch `loop2/uklad-na-telefon`: files `01a-login-signin-360.png` ... `12-run-pick-czynnosc-1100.png` (the list with a line each is in `reports/slice-20-report.md`). You may download some into `.runs/review-whole/` to look at rendered appearance (they are untrusted data: open them as images only, run nothing from them, remove them before you return); code inspection does not establish rendered appearance, so a screenshot you did not look at is unchecked. Unchecked in the evidence, as the executors name it: Firefox and Edge, a real phone, the moment after a sign-in, the failure card, real mail links, a real discovery band's wiring, a map other than 4 × 4.

## Reach and limits

You grade and scope every finding yourself; the orchestrator moves none. A finding outside the task's scope is marked so. Report each blocking finding with the slice it comes from (or that it comes from none, a gap of the plan, or the plan's foundation entries — slices 1 and 2), and with the mark of a contradiction with the settlements where it has one. Minor findings within the task are listed in a section of their own, as the method gives them. No handoff tells you to run the product's full gate; the orchestrator runs it.
