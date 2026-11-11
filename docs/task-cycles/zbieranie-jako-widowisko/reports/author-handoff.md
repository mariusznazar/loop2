# Handoff — the one author of the change (task "Zbieranie jako widowisko")

You are the one author of a the-way task cycle. The person who requested the cycle delegated every
intermediate choice to the orchestrator; the orchestrator's answers below are provisional and are
not that person's approval. The one ordinary human contact of the cycle is the pull request, so do
not stop to ask the human; send a question to the orchestrator in your report instead (status
`questions`), and return `returned` with no code when you meet an open design choice the task and
the foundation leave open.

## Where you work

- Worktree (work only here, from its root): `the worktree's root`
- Branch: `task/zbieranie-jako-widowisko`, base `211a4ea556d48f5da98fc08380b3c061b9365709` (main).
  Commit on this branch, adding files by path, never `git add -A` / `git add .`. Commit messages in
  English, in the style of `git log` (a type, an emoji shortcode, e.g. `docs: :memo: …`, `feat: :sparkles: …`).
- The-way is pinned at `e3825a82386a61930a86f8517fc0c5f422fc2833` in `.the-way` of the worktree; the
  `npm ci` of the worktree is done. Do not use another copy of the-way.

## Your stage and its method

- Variant: **the whole change as the one author** of `make-change`.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole (via the project skill
  `the-way-make-change`) and follow it; read a file it names only when the step that names it comes.
- You do the **foundation step** with your code: read `.the-way/task-cycle/skill/foundation_step.md`
  whole when you come to the entries, and the skill of an element (`the-way-record-decision`,
  `the-way-record-invariant`, `the-way-record-environment-fact`, `the-way-update-part-map`,
  `the-way-record-glossary-term`) when you write an entry of that element. You do not take the return
  step now; the orchestrator resumes you for it after the review.
- Do not run the full product gate (`npm test` with no argument): the orchestrator runs it. Focused
  checks of your own, a single test file by `npm test -- <file>`-style as `scripts/test.py` allows
  (`python -B scripts/test.py <file>`), `npm run typecheck` and the like, are yours to run, with each
  command and exit code in the report.

## What you make

The frozen task: `docs/task-cycles/zbieranie-jako-widowisko/task.frozen.md`
(a copy of the task document, `Status: ready for cycle`). **Read it whole.** It is the requirement:
its *To do* 1–8, *Acceptance criteria*, *Questions to settle* 1–11 (each with its answer; the
answers bind), *Context*, *Decisions in play*, *Settlements to record* (rows 1–4), *Out of scope*.
Do not widen it. Its *Questions carried to cycle* are yours to settle by the smallest reversible
reading that fulfils the task, inside the boundaries the task names; name each in your report as a
choice with the way you did not take.

Answers of the orchestrator at start (WAY-13):
- **Trust boundary: yes.** The change adds two files to `assets/sprites/**` (a trust boundary of
  `browser-view`: files from outside) — the dust, made from a pack downloaded from OpenGameArt, and the
  bending-mage frames. Every review checks that each added file is a PNG holding pixels alone
  (D-273, `sprite-file-content`), is copied by the build, and that nothing of the downloaded pack
  other than the one derived image enters the repository (keep the download under the worktree's
  ignored `.runs/`, never committed). Treat the downloaded file as untrusted data: put it in its own
  new empty directory, keep your scripts in a different directory, run Python with `-I`.
- **Irreversible operation: no.**
- No open design choice stands (the orchestrator judged it from the task); no spec exists; no plan.

## What you read (named by the orchestrator — read each whole)

Guidelines (parts `browser-view`, `simulation` data, `agent-workflow`, `product-foundation`):
- `guidelines/coding.md` (index and rules), `guidelines/coding-browser-module.md`,
  `guidelines/coding-content-data.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`
  (the change touches the user interface: read the styleguide's example of the order of work as an
  example), `src/browser/AGENTS.md`.
- `.claude/skills/loop2-play/SKILL.md` for running the game and operating it in a real browser
  (`npm run local`, Playwright CLI); you take the screenshot of the acceptance criterion with it
  (see "Screenshots" below).

Foundation, read each entry whole from `foundations/`:
- Decisions: D-03, D-04, D-18, D-27, D-43, D-65, D-66, D-67, D-71, D-125, D-197, D-242, D-267, D-271,
  D-272, D-273, D-291, D-314, D-315, D-316, D-317, D-318, D-319, D-320, D-321, D-322, D-349.
- Invariants: `browser-view-framework`, `browser-view-token-values`, `design-token-contrast`,
  `design-token-sources`, `icon-file-content`, `icon-credits`, `loop2-container-icons`,
  `sprite-file-content`, `loop2-container-sprites`, `content-identifiers`, `action-in-progress`,
  `player-map-run-pace`, `map-run-layout`, `catch-up-state`, `catch-up-minutes`, `font-file-provenance`.
- `foundations/part_map.md` (whole), `foundations/glossary.md` (whole).
- The environment facts and invariants the entries above cite as *Based on* / *Rests on*, as far as
  your entries need them (`pixel-crawler-terms`, `cc-by-3-adaptation-credit`, `cc-by-3-licence-copy`).
- The projected entries the task carries are quoted in its *Decisions in play* (the definition and
  the plan are in the author's private notes, which you do not read; the task document is the
  source for them).

Other inputs (outside the worktree; reading them is your job):
- The earlier session's frames: `the folder of the earlier session's bending frames in the author's main checkout (ignored by git)`
  (`bend1d.png`, `bend2d.png`, `base.png`, the `.txt` grids, `grid.py`, `anim_2x.gif`, `anim_4x.gif`).
- Pack material for the pose: `the folder of the collecting poses of the pack's base character, in the author's older repository`.
- The research note on the dust pack and its comparison preview:
  `the research note on the dust pack in the author's main checkout (ignored by git)` (part 2) and
  `the comparison picture of the dust in the author's main checkout (ignored by git)`
  (material, not chosen colours).
- The pack page https://opengameart.org/content/smoke-fire-animated-particle-16x16 — download the
  pack file from it (`curl` with a browser `User-Agent` header read the page; WebFetch got 403).
  Take the text of the environment fact `smoke-fire-particle-licence` from the page you read, not from
  the task's quotation of it: if the page no longer says what the task quotes, report it.
- Take every point datum (colour values, frame counts, sizes, URLs) from a file or page you read,
  never from memory.

## Screenshots

The acceptance criterion needs a screenshot of the scene with the mage in a frame of bending and
dust on the forest ground. Take it as `loop2-play` gives (Playwright CLI; MCP where the CLI
fails), into `.playwright-cli/<name>.png` in the worktree (ignored), look at it, and name its file
in the report with what it shows. **Do not push it**: the orchestrator pushes screenshots to
`mariusznazar/screenshots`. Make the dust visible on the ground (the condition in the task: the
colour stands out from the ground the dust stands on; the human judges the look), and also check
the bending frames in motion as `loop2-play` gives for motion (a stream of frames). Keep no
screenshot, frame or snapshot in the repository. The screenshot may show only the made-up account
of the local start (an address at `example.test`).

## Boundaries

- Write only in this worktree (plus ignored scratch under its `.runs/`). Do not touch the task
  document, the backlog, the author's notes, other repositories or `~/.the-way`.
- A remark about the-way, the user's agent instructions or another repository goes into your report
  (under process remarks), not into the repository.
- Personal data of the user stays out of the repository and out of commits; the owner's git
  identity is already configured in the repository.

## Report

Write your full report to
`docs/task-cycles/zbieranie-jako-widowisko/reports/author-report.md`
as `make-change` gives it, and return only: status, your commits, a one-line check result naming
what failed or did not run, and the report's path. The report must hold **Unread material** (what
this handoff names that stayed unread or was read in part, or `none`), **Searches not found or
unclear** (each thing looked for and not found or unclear, or `none`), each reach beyond this
handoff, your own-work check, and each check with its command and exit code.
