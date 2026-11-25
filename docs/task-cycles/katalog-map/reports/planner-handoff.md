# Handoff — planner of the task `katalog-map`

You are the planner of a task cycle of the-way, dispatched by the orchestrator of `implement-task`.
The person who requested the cycle has delegated intermediate choices to the orchestrator; nothing
you are told is the human's approval. You never ask the human; questions go back to the orchestrator.

- Worktree (work from its root, never from the main checkout): `the task's worktree`
- Method of your stage: `.the-way/task-cycle/plan/SKILL.md` (`plan-task`). Read it whole; read a file it
  names only when the step that names it comes.
- Stage and boundary: write the plan and its size report, return before any slice is made. No code, no test,
  no foundation entry.
- Plan path: `.runs/task-cycles/katalog-map/plan.md`; size report: `.runs/task-cycles/katalog-map/plan-size.md`.
- Frozen task (read whole): `.runs/task-cycles/katalog-map/task.md` (task slug `katalog-map`; its original is a
  note in the author's private vault, a copy of it is this file). There is no spec.
- Your directory for working copies: `.runs/planner/`
- Report path: `.runs/task-cycles/katalog-map/reports/planner-report.md`. The report file is the input of the
  cycle's scripts (`task-cycle/remarks_check.py` reads it), the case that Claude Code's refusal of files named
  `report…` leaves open. Its first line is your status; it holds **Unread material** and
  **Searches not found or unclear** (each `none` or the items).
- `cycle.md` and the other files of `.runs/task-cycles/katalog-map/` (other agents' handoffs, reports,
  findings) are not yours to read unless this handoff names them.

## Answers of step 4 (the cycle's two questions)

- Trust boundary: no network boundary. It touches `src/browser/view/judging-cache.ts` (trust boundary of
  `browser-view`: reads lasting storage) and adds sprite files under `assets/sprites/**` (files from outside).
  Mark a slice *Risk: trust boundary* where it changes `judging-cache.ts` or adds the pack's files; those get a
  review of their own.
- Irreversible operation: no.
- Execution route: planned slices. Open design choice: none found by the orchestrator; the choices that remain
  (visual form of the catalog, storage key/shape of the record, how the judging reports the creature's damage)
  are how-to-make choices the task leaves to the cycle (Q1 part 2) — make them in the plan and list them under *Choices*.
  If you find a real open design choice, return it instead of a plan.
- The full test gate (`npm test`) is NOT run by any agent and not by the cycle until the orchestrator's final
  gate; the plan's *Checks* name focused checks only (e.g. one node test file, one invariant test, `tsc`
  configurations, balance instrument commands), no run of the gate.

## What you read

Foundation (orchestrator's selection; the index file below was written by `decision_index.py` for the parts
simulation, browser-view and balance-tools, the sections *Maps*, *Screen Mapy and Siedziba*, *Balance
measurement*, *Judging a program*, *Scene*, *Combat*, plus the decisions the task names):
- `.runs/orchestrator/index.md` (index of the selection; open whole in `foundations/decisions.md` the entries the
  change changes: D-438, D-325, D-331, D-134, D-149, D-24, D-327, D-440, D-441, D-271, D-18, D-429, D-136, D-388).
- `foundations/part_map.md` whole; `foundations/glossary.md` entry `wall`; invariants
  `first-exploration-discovery`, `content-identifiers`, `instrument-game-agreement`,
  `balance-instrument-file-writes`, `judging-cache-reading`, `sprite-file-content`, `sprite-credits`,
  `loop2-container-sprites`, `function-and-file-size`, `first-map-stock`, `first-map-balance`,
  `solved-map-manual-run`, `map-run-repeatability`, `save-version`.
- Foundation entries the task names and that do not exist yet — "(new) How may a map differ from the map that
  opens it?", "(new) Which numbers of a map are requirements of the game?" — are written by the foundation step
  (see below), not by you.

Guidelines (each whole): `guidelines/coding.md`, `guidelines/coding-simulation-module.md`,
`guidelines/coding-browser-module.md`, `guidelines/coding-content-data.md`,
`guidelines/coding-balance-instrument.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`
(with its order-of-work example), `src/browser/AGENTS.md`. Skills the slices will use, to be named in the *Read*
of the slices they serve: `.claude/skills/loop2-balance/SKILL.md`, `.claude/skills/loop2-scene-art/SKILL.md`,
`.claude/skills/loop2-play/SKILL.md`.

Sources outside the repository that the task names and that slices need (a slice's *Read* names them by path
so its executor reads them; they are read-only and lie outside the product): the old game's repository
`the old game's repository`, branch `feat/archetypes` — read it with `git -C the old game's repository show
feat/archetypes:<path>` (do not check out): `src/sim/data/maps.ts` (`forestLair`, `LAIR_RESOURCES`),
`src/sim/data/creatures.ts` (`bear`), `src/components/probe/MapCatalog.tsx`, `src/components/probe/mapFacts.ts`,
`docs/superpowers/specs/2026-09-07-mapy-katalog-i-strona-design.md` (chapters 2–5). The old game's screenshots
of 31 October (`loop_02_mapy.png`, `loop_03_mapa_skraj.png`) lie in the author's notes folder
`the author's folder of the old Loop's screenshots` (look there if the plan needs them).

## What the plan has to cover

Every item of *To do* 1–9, every row of *Settlements to record* 1–6, the four projected entries of *Decisions in
play* ("(new)" ×2, D-438, glossary `wall`) plus the settled edits of D-325, D-331, D-134, D-24, D-327, D-440,
D-441, D-271 and the rationale edits of D-18 and D-429, and the acceptance criterion. Foundation entries are
written only through the project skills `the-way-record-decision`, `the-way-record-invariant`,
`the-way-record-glossary-term`, `the-way-update-part-map`, `the-way-record-environment-fact` (read as files
`.claude/skills/the-way-*/SKILL.md` → they point at `.the-way/elements/*/SKILL.md`); list them in the plan's
*Foundation entries*, which one agent writes before slice 1. The new pack's licence fact (environment fact) and
the part map's External context row for it belong there. The balance measurement (task To do 6) is a *step of
the cycle after the data slice*, run with `npm run balance -- progression` (see `loop2-balance` skill) — plan it
as the check of the slice that adds the two maps, with its ordered stop rule from To do 6 (if the check shows
Matecznik is solved by any program, the executor returns `blocked`; if wataha fails its gate, change its numbers
as To do 1 says). Screenshots (To do 8) are made by the slice that builds the screen, as `change/ui_check.md`
of the-way and `loop2-play` give; they are shown in the request, never committed.

Cut slices so each fits one agent and one review; order them so that each slice leaves the product consistent
(its focused tests pass), with the tests that the plan leaves failing at a base named. Natural seams to
consider (yours to judge): data model (region in map data, bear creature, the two maps, their `solvingText`,
overlay/tests/skill alignment) → judging records bear damage → record storage and its reading → catalog screen
(regions, rows, search, three views, phone layout) → card/liner for Matecznik with the number → scene art for
the bear (new pack, credits, mapping) → measurement and screenshots → styleguide section. Mark *Model* per slice
with reasons for any class other than `cheaper`; mark *Risk* as above.

Return per the method: status, commits (none), one-line check result (the size script's), the report path,
questions/concerns, **Unread material**, **Searches not found or unclear**.

## Working copies (the first paragraph of the cycle's rule, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.
