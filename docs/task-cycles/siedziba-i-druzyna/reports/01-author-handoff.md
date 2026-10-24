# Handoff — one author, task cycle `siedziba-i-druzyna`

## Delegation

Mariusz (the product's owner) started this task cycle with `/the-way-implement-task` on the task
below and delegated the cycle's intermediate choices to its orchestrator. You are the one author of
the change. Questions go to the orchestrator in your report, never to the human. The human reviews
the request, not intermediate steps.

## Where you work

- Worktree: `C:\Storage\repos\loop2-wt\siedziba-i-druzyna` — work only there. Branch
  `task/siedziba-i-druzyna`, base `a945cf1d4c62e8cdac222a7de47277c08a77b2c5` (`origin/main`).
  Commit on this branch; do not push, do not open a request, do not merge, do not touch `main` or
  another worktree.
- `.the-way` is checked out at the pinned `86b78ad`. `npm ci` has run and `.runs/quality-venv` is
  installed as `README.md` gives.
- Run every check from the worktree root. The product's one command is `npm test`; it ends with
  `python -B .the-way/elements/common/foundation_check.py`.
- Known failure on this machine, already on the base: `tests/invariants/test_loop2_one_serving_process.py`
  setUpClass fails because `Get-NetTCPConnection` returns no objects here; container tests skip
  without a Docker daemon. These are not yours to fix; name them as failing/unchecked. The
  orchestrator's base gate log is `.runs/task-cycles/siedziba-i-druzyna/reports/00-base-gate.log`.
- Console output on this machine is in the ANSI code page: write Polish text you need to read to a
  UTF-8 file, not to stdout. Keep the line endings of files you rewrite by script.

## Method and stage

- Method: the project skill `the-way-make-change` (`.claude/skills/the-way-make-change/SKILL.md` in
  the worktree, which reads the pinned `.the-way/task-cycle/change/...`). Read it whole, with what
  it names, and follow it as the **one author of a change without a plan**.
- Stage boundary: make the code, its tests and the foundation step, commit, write your report, and
  return before review. Do not start the review, the return step or the request. The orchestrator
  keeps you for the fix and the return step.
- Foundation step: read whole the paragraph that opens "## Execute, verify and review" in
  `.the-way/task-cycle/skill/SKILL.md` (the paragraph starting „The foundation step writes the
  entries the task carries”, before step 9) and the bullet **One author.** of step 9, and the
  element skills they name. Write each entry through its project skill: `the-way-record-decision`,
  `the-way-record-invariant`, `the-way-record-glossary-term`, `the-way-update-part-map` (and
  `the-way-record-environment-fact` where one is needed). Never use a personal skill of those names
  without the `the-way-` prefix. Where the change touches a user interface, read the styleguide's
  example of the order of work as an example (WAY-213).
- Report: write your full report to
  `C:\Storage\repos\loop2-wt\siedziba-i-druzyna\.runs\task-cycles\siedziba-i-druzyna\reports\01-author-report.md`
  as `make-change` gives it; keep logs you cite beside it as `reports/01-author-*.log`. Return a
  short message: status, commits, a one-line check result naming what failed or did not run, and
  the report's path. Every check in the report carries its command and exit code. For each
  foundation entry you write, keep in the report one sentence of its meaning in Polish (the task
  document's language) for the request.

## The task

- Frozen task (read it whole): `C:\Storage\repos\loop2-wt\siedziba-i-druzyna\.runs\task-cycles\siedziba-i-druzyna\task.md`
  (copy of `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\siedziba_i_druzyna_loop2.md`,
  accepted 2026-10-24).
- Relation: plan item — task 11 `siedziba-i-druzyna` of `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\plan_mvp_loop2.md`.
  Write only the projected entries the plan assigns to task 11: `character-team/1` whole, and the
  part of „(new) — Whose is the chest?” the task's *Decisions in play* names. The rest of that
  decision (the cap and „uses its chest”) belongs to task 13; do not write it, and do not leave it
  as a TODO for later inside the entry beyond what the element's template allows.
- Projected entries, as the definition's readiness gate approved them — read these passages of
  `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md`:
  - „#### (new) — Whose is the chest?”, lines 1508–1537;
  - „#### character-team/1”, lines 2118–2127;
  - for context of the entries the task touches but does not write: „#### (new) — What describes a
    character?” from line 1131 to the next `####` heading; „#### (new) — Who owns a program?” from
    line 986 to the next `####`; „#### (new) — When and how is the time away computed?” from line
    881 to the next `####`.
  The definition lets tasks read from the old repository `C:\Storage\repos\loop` only its data files
  (`src/sim/data/`) and tests; never read loop's engine or interface code.

## Answers of the cycle's start (step 4)

- Trust boundary: **no**. The change touches `simulation`, `browser-view` and `product-foundation`;
  none of their files the task needs is a trust boundary of the part map. If you find you need a
  file under `assets/icons/**`, `assets/fonts/**` or another boundary of the part map, stop and
  return `questions` before changing it.
- Irreversible operation: **no**.
- Open design choice: **none**. Every entry is settled by the task's *Settlements to record* rows
  1–6 and its projected entries; the rest are ways of making it (how the state names a character and
  links the map run to it, names of modules and functions, the screen's layout within the
  styleguide, which test proves `character-team/1`) — make them and name each in your report.
  Should you meet a choice the task and the foundation leave open, return `returned` with no code,
  as `make-change` gives.
- Route: one author without a plan. If the change proves too large for you, return `returned` with
  where the size lies.
- Carried question (task, *Questions carried to cycle*): task 4 `ognisko-i-jedzenie` is **not
  merged** at this cycle's start (no branch on `origin`). By *To do* 6, the game has no carrying
  capacity in this change; add none. Task 4's cycle adds the trait to the team's character.
- Wording of decisions from MVP choices: keep the principle the task's *Context* quotes — an entry
  built from an MVP choice says what the game does now, begins „In the MVP” (in English, the
  foundation's language), and holds no words such as „only”, „never”, „always”, „without” or others
  that exclude an alternative.

## What to read of the foundation

Read each entry whole, from its heading to the next heading.

- Decisions — the task's *Decisions in play*: D-03, D-04, D-18, D-21, D-22, D-39, D-44. Decisions
  whose *Scope* names `simulation` or `browser-view`: D-06, D-19, D-20, D-23, D-24, D-25, D-26, D-27,
  D-28, D-29, D-30, D-31, D-32, D-34, D-35, D-36, D-38, D-40, D-41, D-42, D-43, D-45, D-46, D-47,
  D-48.
- Invariants of `simulation`, `browser-view` or `every` that the change reaches: `map-run-repeatability`,
  `simulation-randomness`, `simulation-isolation`, `simulation-inputs`, `content-identifiers`,
  `restart-seed`, `map-run-layout`, `player-map-run-pace`, `program-world-reference`,
  `program-closed-lists`, `browser-view-framework`, `browser-view-token-values`,
  `browser-view-focus-outline`, `design-token-contrast`, `design-token-sources`,
  `eslint-source-rules`, `prettier-source-format`, `application-build-output`,
  `application-package-layout`, `application-build-layout`; and every invariant whose test your
  change alters (by its line `invariant: <identifier>`).
- Part map: `foundations/part_map.md` — the entries `simulation`, `browser-view`,
  `product-foundation`. A file you add needs its part-map line where no glob already claims it.
- Glossary: `foundations/glossary.md` (short — read whole) and the-way's glossary at the pinned
  commit, `.the-way/foundations/glossary.md`, for the terms you use.

## Guidelines (read each whole)

- `guidelines/coding.md`
- `guidelines/coding-simulation-module.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/AGENTS.md`
- `guidelines/coding-content-data.md` only if you change a file under `src/browser/sim/data/`.

## Code the task points at (base `a945cf1`)

`src/browser/sim/types.ts:56`, `:63`–`72`; `src/browser/sim/game.ts:148`, `:175`;
`src/browser/view/send-panel.ts:10`; `src/browser/view/app.ts`;
`src/browser/view/controls/text-field.ts`; `src/browser/sim/data/archetypes.ts:6`;
`src/browser/sim/data/maps.ts:24`.

## Your report must also name

- each reach beyond this handoff (a file, an entry or a guideline you read or changed that it does
  not name), and why;
- the weakest point of your change, the check you made of it and what it showed;
- the user-interface states you checked (empty team, team with characters, the empty-name warning,
  the headquarters replaced by the map-run screen and back after „Zakończ”, the skrzynka marked
  empty) and how you inspected the rendered screen, with screenshot evidence by the styleguide's
  settled way, or a note that no settled way exists or that it failed, with what happened;
- for an invariant test you write, its failing run and its passing run.
