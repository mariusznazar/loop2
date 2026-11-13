# Handoff — review of the whole change, task oboz-w-siedzibie

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator. You are
an agent that did not make the change. You review; you change nothing (read-only). Questions go to
the orchestrator in your report (first line `questions`). Never label an answer as the human's
approval.

## Where you work

- Worktree (read from its root): `the old game's repository on the author's disk2-wt\oboz-w-siedzibie`; branch
  `task/oboz-w-siedzibie`. Dependencies are installed; `.the-way` is at the pin
  `55afa8e57aa1b83c77108576a36642722e0dda15`.
- Method: `.the-way/task-cycle/review/SKILL.md` — read it whole; read a file it names only when the
  step or variant that names it comes.
- Variant: the whole change (the one author, no plan, no slices).
- Range to review: base `2b4d760c517a8b399b2d9b80f77531455e32d11c` to head
  `07fd0de35e07ea03bb4e8e706ce221f54be0b801`: four commits `e05f7b2b`,
  `10ba53b6`, `68fe6248`, `07fd0de3`; 17 files, +799 −85.

## The task and the author's report

- Frozen task (read it whole; judge the change against it, every To do item, every row of
  *Settlements to record*, and every carried projected entry): `docs/task-cycles/oboz-w-siedzibie/task.md`.
- The author's full report: `docs/task-cycles/oboz-w-siedzibie/reports/author-report.md`. It is
  evidence to check, never a verdict; its claims of tests, pixel comparisons and browser checks you
  may rerun or re-derive.
- No spec and no plan: the task leaves no open design choice and one agent made the change.
- The return step (comparing the foundation with the code) has NOT run yet: it comes after your
  review. Do not fail the change for a foundation entry that the return step is to correct, but do
  report one that is wrong.

## Answers of step 4 (tell these to your review)

- Trust boundary: **yes** — `assets/sprites/**` of `browser-view` is a trust boundary and the change
  adds `assets/sprites/chest.png` and `assets/sprites/camp-clearing.png`. Check crafted input at that
  boundary as the method gives: that each file is a PNG holding pixels alone (`sprite-file-content`,
  D-271), that its pixels are pack pixels moved (the author says 0 of 546 and 0 of 32 256 pixels differ
  from the pack's sheets — judge what you can from the repository; the pack's copy lies in a private
  repository of the human on this disk which you may read but never quote), and that the build copies it
  with the same bytes (`loop2-container-sprites`).
- Irreversible operation: **no**; the change only draws, adds files and edits the repository.
- Reserved choice: none. Open design choice: none.
- Screenshots: five lie, git-ignored, under `the author's ignored directory of screenshots (pushed to the screenshots repository, branch loop2/oboz-w-siedzibie)/`; you may view
  them. The composition, the clearing and the numbers are the human's to judge at the request (Q3 of the
  task); say what you see, grade only what breaks the task's text or a rule.

## What the orchestrator knows and gives you

- Gate on the base: run 1 (no quality environment) failed 4 tests; run 2 with the environment passed
  everything (542 tests, `foundation_check.py` 0 errors). The orchestrator runs the product's gate on
  the reviewed change itself (step 10); you run focused checks you need and report each with command
  and exit code. A check that did not run is unchecked, not passed.
- The author could not run `tests/invariants/test_loop2_container_sprites.py` (it skips without a
  Docker daemon here) — name in your report whether the invariant `loop2-container-sprites` is checked
  by anything that ran, and what the full gate will do with that test on this computer.
- The author's own **Unread material**: decisions D-363, D-365, D-368, D-369, D-370, D-371 and the
  decisions of the touched parts not named by the handoff were not read whole; the facts other than
  `pixel-crawler-terms`; part-map entries other than browser-view and simulation. You select your own
  foundation and guidelines by "Reading the foundation" in `.the-way/elements/common/way_of_working.md`
  (the reviewer's reading: whole for decisions that concern the change's topic, the rest by title; state
  in your report how many you read whole and how many by title only) and the guideline files of the parts
  the change touches (`guidelines/coding.md`, the kind files its index selects — at least
  `coding-browser-module.md` and `coding-content-data.md` — `guidelines/testing.md`,
  `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`).
- Things the author chose that you should judge, among the rest: the band as a sibling above the panel;
  the layout with the fire at the exact middle, the chest to its right and the characters wrapping
  with hidden overflow; the DOM cap of 9; `PICTURE_PIXEL` shared with the scene and a touch of
  `world-area.tsx`; D-389 as a new number with scope `browser-view` alone; D-272's waiting fields
  left as the foundation has them; the README line; no entry of the file table of
  `guidelines/coding-browser-module.md` for the two new view files (the author asks whether one is
  needed — say whether the guideline requires it); the heading `Siedziba` now 112 px lower.
- Task items that deserve particular checking: To do 2 (the screen redraws at every change of the manual
  run, and the camp changes at „Wejdź”, „Puść w pętlę”, „Zatrzymaj” and „Zakończ”, character of a
  manual run in every state — running, paused, finished waiting for „Restart”/„Zakończ”); To do 3
  (reduced motion, no drawing loop, nothing flashes); To do 4 (no text, no click or key, hidden from
  readers); To do 5 (one still chest, no credit row; the pack needs no mention); To do 6 (the sections
  keep wording and order); To do 7 (the styleguide rule and the token rule's list; no new role, token
  value or role meaning; no colour or length in the camp's files outside `tokens.css` — see
  `src/browser/AGENTS.md`); To do 8 and rows 1 and 2 of *Settlements to record* (D-272 in the projected
  wording keeping every sentence the entry has now; the one new decision; D-271 changed; the invariant
  changed and its test).

## Report

Write your full report to `docs/task-cycles/oboz-w-siedzibie/reports/review-1-report.md`, its first
line `PASS <sha>`, `FAIL <sha>` or `questions` as your method gives, then your findings graded as the
method gives, with `file:line` anchors, the checks you ran with command and exit code, what you could not
check, **Unread material** (what this handoff names that stayed unread or was read in part, or
`none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or
`none`). Secrets and personal data stay out; no screenshots or diffs copied into it.
