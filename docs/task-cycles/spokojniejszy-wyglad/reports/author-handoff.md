# Handoff — the one author, the whole change

## Delegation

You are the one author of the task cycle `spokojniejszy-wyglad` of the product loop2. The person who
requested this cycle has delegated intermediate choices to the orchestrator, who answers your
questions; none of those answers is the human's approval. The human reviews the pull request, not
the steps. Do not seek the human's approval and do not start another stage.

## What you make

Your variant of `make-change`: **the whole change as the one author**. Method:
`.the-way/task-cycle/change/SKILL.md` (read it whole; read a file it names only when the step or
variant that names it comes). You make the code, the tests, the foundation entries the task carries
(the foundation step) and the guideline edits, and return before review.

## Where you work

- Worktree (work from its root, the process root is its `.the-way`, pinned `52f8164a354ee1a704af0d58add2f3be8e4f0247`):
  `the worktree's root`
- Branch: `task/spokojniejszy-wyglad`; base commit `3b7e4930e3193376416f569e3b9cae1c31caa780`
  (main after PR #78). Commit on this branch. Do not push, do not merge, do not open a request.
- Dependencies are installed (`node_modules`, `.runs/quality-venv`). Do not run `npm install` or
  `npm ci`.
- The ignored directory `.runs/` holds the cycle record; you never read `cycle.md`. Do not commit
  anything under `.runs/`.
- Commits: messages in English in the repository's form, `<type>: :<gitmoji>: <what changed>`
  (for example `refactor: :recycle: ...`, `docs: :memo: ...`, `fix: :bug: ...`); add files by their
  paths, never `git add -A`, `git add .` or `git commit -a`.

## The task

The frozen task, read whole (it is the whole requirement; its quotations and settlements bind), by
its path from the worktree's root: `.runs/task-cycles/spokojniejszy-wyglad/task.md`

Its approval: accepted by the human 2026-11-11 with the readiness gate passed. No spec and no plan
exist for this task (no open design choice; one author without a plan).

## Answers of step 4 of the cycle

- Trust boundary: **no.** The part map's trust boundary of `browser-view` is `assets/icons/**`,
  `assets/fonts/**` and `assets/sprites/**`; the task changes no file in them — the icon files stay
  as they are and are only drawn as masks. If you find you must change a file in them, stop and
  return with `questions`.
- Irreversible operation: **no.**
- Open design choice: **none** by the orchestrator's reading. How a mask is drawn inside the SVG
  terrain drawing is a choice of how to make what the task settles ("drawn as a mask in
  `text-strong`", D-43 exempting the geometry of the terrain drawing). If you meet a choice the task
  and the foundation leave open and that is more than that, return `returned` with no code, as
  `make-change` section "return without code" gives.
- Reserved choice: none; if the work needs a library, language, store of data, login or a place to
  run, return.
- Checks failing on the base: **none** — `npm test` on the base `3b7e4930` ended with exit code 0
  (544 tests in 4 directories, foundation check included).

## What you read

Foundation entries, each whole (`###` heading in `foundations/decisions.md` to the next heading, `##`
in the other files): decisions D-27, D-40, D-41, D-43, D-45, D-47, D-70, D-262, D-291; invariants
`icon-credits`, `icon-file-content`, `browser-view-token-values`, `browser-view-focus-outline`;
the part-map entries of `browser-view`, `product-foundation` and `agent-workflow` in
`foundations/part_map.md`. Select further entries yourself as "Reading the foundation" in
`.the-way/elements/common/way_of_working.md` and as the skill of the element you write gives it
(the decisions whose *Scope* names `browser-view`, that concern icons, credits, the footer, the
waiting screens, the kitchen-sink page, the terrain drawing); where you reach for something this
list does not name, name the reach in your report.

Guideline files, each whole:
`guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`,
`guidelines/testing.md`, `src/browser/AGENTS.md`.

Foundation step: `.the-way/task-cycle/skill/foundation_step.md` (read whole), and the skill of each
element you write: `the-way-record-decision` (D-27, D-40, D-43, D-47, D-262),
`the-way-record-invariant` (`icon-credits`). The task's *Decisions in play* and *Settlements to
record* state what each entry becomes; the part-map and glossary changes only where the change
leaves an entry untrue (`the-way-update-part-map`, `the-way-record-glossary-term`). Guideline edits
of *To do* item 10 go through `guidelines/styleguide-browser-view.md` itself as the task gives; read
`.the-way/` skill `the-way-maintain-styleguide` only if its method is needed to edit it (name the
reach).

For the change to the user interface read `.claude/skills/loop2-play/SKILL.md`, and the-way's
`task-cycle/change/ui_check.md` where `make-change` names it, since the change touches screens. Run
the game and look at the states you change (a Siedziba with its folded credits section, the login
card, a waiting screen, the Mapy card and table of revealed tiles, the trip plan line, the map
drawing with an icon of stock 0, the kitchen-sink page); inspect the screenshots and keep them
nowhere in the repository — record where they lay only as the method gives.

## Not yours

- Do not run the product's full gate (`npm test`); the orchestrator runs it. Run the focused checks
  of what you change (tests of `tests/view/**`, the invariant tests you touch, the type check
  `npm run typecheck`, the foundation check
  `python -B .the-way/elements/common/foundation_check.py`) and record each with its command and
  exit code.
- The rows of the task's *Out of scope*, and the credit rows of the packs of tasks 17 and 20: you move
  only the rows you find in the footer when you start, as *To do* item 2 says. State in your report
  what you found there.

## Your report

Write the full report to
`.runs/task-cycles/spokojniejszy-wyglad/reports/author-report.md` as `make-change` gives it, with its
own-work check, **Unread material** and **Searches not found or unclear** (each `none` where
none), and return its path, your status, your commits, a one-line check result naming what failed or
did not run, and your questions. Where the report names a finding for a foundation or process
file outside the product, put it in the report, not in the code.
