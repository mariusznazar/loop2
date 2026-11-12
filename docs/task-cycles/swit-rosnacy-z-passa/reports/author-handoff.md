# Handoff — the one author of the task "swit-rosnacy-z-passa"

You are the one author of a the-way task cycle. The person who requested the cycle has delegated
intermediate choices to the orchestrator and to you; the human reviews the pull request, not your
steps. Do not ask the human anything: questions go to the orchestrator in your report, with
status `questions`.

## Where you work

- Worktree (work from its root): `the task's worktree`
- Branch: `task/swit-rosnacy-z-passa`, base commit `7846213c25675b2c084e4587cd1ffb09316ef486`
- Process pin: `.the-way` at `55afa8e57aa1b83c77108576a36642722e0dda15` (the gitlink; checked)
- Your method: `.the-way/.claude/skills/the-way-make-change/SKILL.md` — read it whole; read a file it
  names only when the step or variant that names it comes. Your variant: **the whole change as the
  one author**.
- The foundation step (the foundation entries the task carries) is yours, together with your code:
  read `.the-way/task-cycle/skill/foundation_step.md` whole when you come to it. The return step
  is not part of this dispatch; the orchestrator resumes you for it.
- Read `AGENTS.md` and `src/browser/AGENTS.md` of the product. Commit with `git add <paths>` by path,
  never `-A` or `.`; commit messages in English in the form of the repository's history
  (`type: :emoji: text`). The product's gate is the orchestrator's: do not run the full `npm test`
  yourself; run single files, as `npm test -- <file>` gives, and `npm run typecheck`.
- Full report: `docs/task-cycles/swit-rosnacy-z-passa/reports/author-report.md` (that path is
  ignored by git; write the report there as your method gives it, with **Unread material** and
  **Searches not found or unclear** sections, and each check with its command and exit code).

## The task

- Frozen task, read **whole**: `docs/task-cycles/swit-rosnacy-z-passa/task.md` (original: the
  author's backlog, accepted 2026-11-11). Its *Status* is `ready for cycle`; *Human actions*: none.
- No spec and no plan exist: the cycle found no open design choice. The four *Questions carried to
  cycle* are choices of how to make what the task settles: make them, name each in your report with
  the option you rejected, and record the visible ones (the ragged edge of the frost, the layer
  order) in the styleguide where the task's item 8 puts them.
- Route: one author without a plan. If the change proves too large for one agent, return `returned`
  with no code and say where the size lies; the orchestrator discards and plans.

## Answers of the two questions at start

- **Trust boundary: yes.** `assets/sprites/**` of the part browser-view is a trust boundary and you
  add one PNG there (the smaller flame). The file holds pixels alone (`sprite-file-content`, D-271,
  D-273), is built into `dist/public/sprites/` and served at `/sprites/<file name>` with the same
  bytes (`loop2-container-sprites`). Say in your report how you made the file and checked its
  content; every review will check crafted input at this boundary.
- **Irreversible operation: no.**

## What to read (selected by the orchestrator)

Parts the change touches: `browser-view` (`src/browser/view/**`, `src/browser/styles.css`,
`src/browser/tokens.css`, `assets/sprites/**`, `tests/view/**`, the invariant tests of the part),
`simulation` (`src/browser/sim/data/scene.ts` and any test of it), `product-foundation`
(`foundations/**`, the entries you write) and `agent-workflow` (`guidelines/styleguide-browser-view.md`).

- Guideline files, each whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`,
  `guidelines/coding-content-data.md`, `guidelines/styleguide-browser-view.md`,
  `guidelines/testing.md`. Use `the-way-maintain-styleguide` (`.claude/skills/the-way-maintain-styleguide/`)
  for the changes of the styleguide the task's item 8 names; it is the route for that file.
- Decisions of `foundations/decisions.md`, each whole from its heading to the next: **D-315, D-132,
  D-316, D-271, D-317, D-314, D-319, D-320, D-322, D-349, D-43, D-48, D-38, D-39, D-42, D-131, D-133,
  D-341, D-68, D-69, D-70, D-122, D-250, D-273, D-272, D-311, D-318, D-321, D-357, D-358, D-364, D-366**.
  Those of the first nine and the first line of *Decisions in play* of the task are the ones you
  write or whose part you write; the others you read to keep.
- Invariants of `foundations/invariants.md`: `sprite-file-content`, `browser-view-token-values`,
  `design-token-sources`, `loop2-container-sprites`, `design-token-contrast`,
  `browser-view-focus-outline`, `sprite-credits` where it exists; read the tests that cite them
  when you change what they cover.
- Glossary entries: `streak`, `completion`, `extinguished campfire`, and of the-way's glossary at
  the pin the terms your entries use.
- Part map entries of the four parts above.
- Source code you will certainly meet: `src/browser/view/scene-picture.ts`, `scene.tsx`,
  `run-screen.tsx`, `src/browser/sim/data/scene.ts`, `campfire.ts`, `balance.ts`, `maps.ts`,
  `src/browser/sim/types.ts` (streak), `src/browser/sim/body.ts`, `tests/view/scene*.test.mjs`.
- The running game for the look of the result: `.claude/skills/loop2-play/SKILL.md`; the screenshot
  route: D-357 and D-358 and the styleguide's rule on UI checks (`change/ui_check.md` of the pin).
  A screenshot is kept nowhere in the record; the request shows it by the route the foundation
  settles. The task's acceptance criterion is Mariusz's judgement of the smaller flame on a
  screenshot of the scene in the request: make the screenshot of the scene with the smaller flame
  (and of the frost and the tint at several streaks) so the orchestrator can show it.

## Environment notes

- Dependencies are installed (`npm ci`); the quality venv `.runs/quality-venv` is set up, so
  `npm test -- tests/quality/test_quality_invariants.py` runs.
- Checks already failing on the base: none.
- The hand-made flame PNG is pixel work: derive it from the frames of `assets/sprites/fire.png`
  (128 × 32 px, four frames of 32 × 32, colours of the Pixel Crawler pack only, the same number of
  frames and the same beat as today, the same stones), reduced by hand — no fractional scale
  (D-349) and no new colours. Write it with a script kept in `.runs/` (not committed) and say how.
  Mariusz judges the look at the request; make it read as the same fire, smaller.
- Values of appearance enter `src/browser/tokens.css` only with the source the task gives for each:
  "wybór Mariusza z podglądu, wariant A" with this task's name and the date 2026-11-11
  (`design-token-sources`, D-43, D-48). No colour or number-built colour in TypeScript.

## What you return

Status `done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`, your commits,
the one-line check result, the report path, your questions and concerns, **Unread material** and
**Searches not found or unclear**. Your own-work check (WAY-164) is part of the report. Commit
everything before you return; leave the worktree clean.
