# Handoff — review of slice 4, task `edytor-programu`

## Delegation
The person who requested this cycle delegated every intermediate choice to the orchestrator of `implement-task`. You never ask the human. You are read-only: change no file of the worktree, commit nothing.

## Where you work
- Worktree (work from its root): `C:/Storage/repos/loop2-wt/edytor-programu`, branch `task/edytor-programu`.
- Method: read in full `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`); read its other files only when the step or variant naming them comes. You review **a planned slice**, slice 4.
- Range to review: `9a8c4e2..ad60b00` (one commit, the slice's base to its head).
- Report: `docs/task-cycles/edytor-programu/reports/report-review-4.md` (if your tool refuses the file, return the whole report as text). Its first line is `PASS <sha>` or `FAIL <sha>`.

## What you review against
- The slice's handoff as its executor got it, which holds the slice's section of the plan, the task passages and the foundation entries it read: `docs/task-cycles/edytor-programu/reports/handoff-slice-4.md` (the executor's selection). The frozen task is `docs/task-cycles/edytor-programu/task.frozen.md` and the plan `docs/task-cycles/edytor-programu/plan.md` — read what you need of them; select your own foundation and guidelines by the parts the change touches (browser-view, simulation).
- The executor's report: `docs/task-cycles/edytor-programu/reports/report-slice-4.md`.
- The change touches a trust boundary: **yes** — `assets/icons/**` (five SVG files from game-icons.net, files from outside). Check crafted input at that boundary: the content of each icon file (nothing but the allowed elements and attributes, no script, no external reference, no data a viewer could execute), that each file is the source's shape and not something else, its credit, and the invariants `icon-file-content`, `icon-credits`, `loop2-container-icons`.
- No operation that cannot be undone.
- Mechanical check's mismatch, passed to you as information: the executor changed one file outside the slice's *Change* list — `tests/sim/data.test.mjs` — to keep tests true after the change (see its report). Judge whether that is justified and whether any assertion was weakened.
- The base gate fails on `tests/quality` for two tests (`test_ruff_source_rules`, `test_shellcheck_source_rules`) because ruff and shellcheck are not installed on this computer: that is the base's state, not the slice's.
- The foundation entries D-288..D-307 and the changed ones are written (commits 4a6fe50, 18e2afa, 083b347). Two of the five icons are not by Delapouite or Lorc: `logging` is by Skoll and `dodge` by Felbrigg (see `game-icons-licence` in `foundations/environment_facts.md`): check each credit and `AUTHORS` name them. Slice 3 (commit 9a8c4e2, PASS) is the model of how icon files are taken and prepared; its report is `reports/report-slice-3.md`.
- The executor notes dead guards in `src/browser/view/footer.ts` (`actionIcons()` checks `icon === undefined` and `iconTitle === undefined`, unreachable now both fields are required) — outside the slice's *Change* list; judge whether it matters.
- Verify the source yourself where you can: the executor says the five files equal the game-icons/icons repository at commit `82d948812bfe3f269ef8f731dcdb07b08160edc4` with the background path removed and the fill changed to `#f4f4f5` (like the existing five). You may fetch `https://raw.githubusercontent.com/game-icons/icons/82d948812bfe3f269ef8f731dcdb07b08160edc4/<author>/<name>.svg` into a directory outside the worktree and compare.

## Report
Per your method: first line `PASS <sha>` or `FAIL <sha>`, graded findings (each with place and reason), the checks you ran with command and exit code (read-only commands only; do not run the full gate), what you checked at the trust boundary, **Searches not found or unclear:** or `none`. Return only: the first line, a one-line check result, and the report path.
