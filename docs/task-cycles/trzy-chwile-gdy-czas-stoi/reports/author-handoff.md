# Handoff — the one author, task trzy-chwile-gdy-czas-stoi

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator. You make
the choices of how to make what the task and the foundation settle, and name each one in your report;
the orchestrator enters them in the questions table. Never label an answer as the human's approval.
You never ask the human anything; questions go to the orchestrator in your report (status `questions`).

## Where you work

- Worktree (work from its root, write nowhere else): `the task's worktree`
- Branch `task/trzy-chwile-gdy-czas-stoi`, base commit `20bcc58df073ab5d5ead7c6f04cd136117da08bd`
  (`origin/main`). Dependencies are installed (`npm ci`), the quality environment is
  `.runs/quality-venv` (README, "quality environment"). `.the-way` is at the pin
  `55afa8e57aa1b83c77108576a36642722e0dda15`.
- Checks already failing on the base: the base gate result is in
  `.runs/task-cycles/trzy-chwile-gdy-czas-stoi/base-gate.log` (the orchestrator tells you below if
  anything failed there; read that file's last lines before you claim a failing check is yours).

## Method and variant

- Method: `.the-way/task-cycle/change/SKILL.md` — read it whole. Read a file it names only when the
  step or variant that names it comes.
- Variant: "the whole change as the one author".
- Stage and boundary: you make the whole change — code, tests, the foundation entries the task
  carries (the foundation step, `task-cycle/skill/foundation_step.md` in the pinned the-way, read it
  whole when you reach that step; the skill of an element when you write an entry of that element),
  README and the styleguide part. You return before review. The return step comes later, when the
  orchestrator resumes you; do not do it now. Do not run the product's full gate (`npm test` whole):
  the orchestrator runs it. Run the focused checks of what you touch and report each with its command
  and exit code.
- Do not push. Commit on the task branch, `git add` by path, messages in English as the existing
  commits write them.

## The task

- Frozen task (read it whole; it is your requirement): `.runs/task-cycles/trzy-chwile-gdy-czas-stoi/task.md`
  (sha256 `a6fbd62ce01e…`, from the human's note, accepted 2026-11-11, plan item `trzy-chwile-gdy-czas-stoi`
  of `plan_mvp2_loop2.md`). Its *Human actions* is `none`.
- Dependency task 18 (`swit-rosnacy-z-passa`) is merged (PR #83, `origin/main` `20bcc58d`): the tint
  layer, the smaller flame and the frost are on the base. Build on them; they are not yours to change
  except where the task says (D-322, D-311 sentence about the window, the sentence of D-271 which task
  18 wrote and this task keeps or, if it does not fit the specks, changes).

## Answers of step 4

- Trust boundary: **yes** — `assets/sprites/**` of `browser-view` is a trust boundary and the change adds
  one PNG there (the death sheet, cut from a file of the Pixel Crawler pack outside the repository).
  Every review of this cycle is told so. You verify yourself that: the file holds pixels alone and is a
  PNG (`sprite-file-content`, D-271); its pixels are the source sheet's pixels moved into the 64 × 64 px
  frames the scene draws the mage in (compare pixel by pixel against the source and say how); the build
  copies it to `/sprites/<file name>` with the same bytes (`loop2-container-sprites`); the licence
  fact `pixel-crawler-terms` and the README line 26 list stay true.
- Irreversible operation: **no**. The change draws from game state, adds a file and edits the repository.
- Open design choice at start: **none**. The four *Questions carried to cycle* of the task are choices of
  how to make what the foundation settles (the scene keeps its previous reading and the events of the
  call, D-04 and D-316; durations and places of motion are rules of the stylesheet with their source in
  a comment, styleguide "No value in place of a design token"; D-317; D-272 and D-321). **You make them**
  by the smallest reversible reading that fulfils the task and name each in your report with the option
  you rejected and its cost if wrong. If a choice proves to be a design choice the foundation leaves
  open with several ways that change an entry, return `returned` without code (WAY-135).
- Reserved choice: none (no language, framework, library, store, login or place to run is chosen).

## What you read (selected by the orchestrator)

Foundation entries, each read whole (the range from its heading to the next heading, with *Rationale*
and *Rejected*): the *Decisions in play* of the task — D-42, D-317, D-271, `loop2-container-sprites`,
D-39, D-311, D-122, D-62, D-132, D-315, D-316, D-319, D-320, D-321, D-322, D-272, D-314, D-349, D-43,
`sprite-file-content`, `design-token-contrast` — as they stand **now in `foundations/`** (task 18 changed
several of them after the task was written; the task's quotations are of `211a4ea`). Then, by "Reading
the foundation" in `.the-way/elements/common/way_of_working.md`, the other decisions whose *Scope* names a
part you touch (`browser-view`, `simulation`, `product-foundation`, `agent-workflow`, `build-tools`),
the invariants of those parts, the part map entries of those parts, and the glossary terms your words
use. Name in your report every part or file you reached that this handoff did not cover.

Guideline files, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`,
`guidelines/coding-content-data.md` (the file `src/browser/sim/data/scene.ts` is game data),
`guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, and `src/browser/AGENTS.md`.
Also `guidelines/coding-simulation-module.md` only if you change a module of `src/browser/sim/` that is
not data.

Playbooks: `.claude/skills/loop2-play/SKILL.md` to run the game and see the three moments in a real
browser (required: motion and the states of the scene are checked in the running game, not by code
inspection); `.the-way/task-cycle/change/ui_check.md` when you reach the check of the user interface.
A screenshot is kept nowhere in the repository and its record; say where it lies (the route the
foundation settles for screenshots) or that it was inspected and kept nowhere.

Styleguide: the task's point 13 is written through the project skill `the-way-maintain-styleguide`; the
decision/invariant/glossary/environment-fact/part-map entries only through the project skills
`the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`,
`the-way-record-environment-fact`, `the-way-update-part-map` — never a personal skill of the same name.

## Things to settle in your reading, and what the orchestrator needs in the report

1. The acceptance criteria are the human's to judge at the request: the colours no source fixes — the
   cold layer after a death from cold and the specks of light — are **proposed** by you, shown on
   screenshots of the real game (the request description uses them), and chosen by the human at the
   request. Give each as a value with its source: the specks' colours from pixels of a named image of
   the packs of the scene (D-271's sentence, question 8 and 13 of the task), the cold layer's colour as a
   design token whose source line is marked as proposed pending the human's choice (`src/browser/AGENTS.md`,
   pattern `src/browser/tokens.css:40`). Make the cold layer's timing (together with the fall or at once,
   inside D-317) and the colours easy to change in one place each, since the human may ask for another
   after seeing the game. Distinguish the cold layer from the cool grey-green tint at streak 0 and show
   that in the check you run.
2. Flashing (D-42, 2.3.1, D-317): no effect lights or darkens the whole area of the scene for a moment;
   say in the report how you checked that for each of the three effects (frames over time, not one
   image), and which frames or states you looked at.
3. The three moments are at stop: the fire and the mage stand as at every stop apart from the effect
   itself (point 4 of *To do*, question 12). Under the system's setting for reduced motion, and on a scene
   drawn again on the same moment, the last image of the effect stands at once (points 5 and 6).
4. The end-of-run window of task 16 opens after the effect of a death or a completion, and at once where
   the scene shows the last image at once (point 7). Find it in the code; check both orders in a test.
5. A map run ending in the game minute of a discovery shows only the end effect (point 8).
6. Tests: write them by `guidelines/testing.md`; run the focused ones you touch (`npm test -- <file>`
   as the README gives) and report each with command and exit code. A check that fails for a reason of
   the base is named, not hidden.

## Report

Write your full report to `.runs/task-cycles/trzy-chwile-gdy-czas-stoi/reports/author-report.md` and return
status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), commits, a
one-line check result, and the report's path. The report holds, besides what your method gives: the
choices you made (with the option rejected and cost if wrong), your own-work check, your weakest-point
checks, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`),
and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
No secrets, no personal data, no screenshots or diffs copied into it; name commits.
