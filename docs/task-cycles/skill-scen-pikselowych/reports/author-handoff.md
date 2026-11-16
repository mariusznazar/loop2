# Handoff to the one author — loop2: skill z gotowymi skryptami do grafiki sceny

You are the one author of this change (agent type `the-way-author`). The person who requested this cycle has delegated every intermediate choice to the orchestrator; no answer you get is that person's approval. Do not stop to ask the human; send your questions to the orchestrator in your return.

## Where you work

- Worktree (your working directory for everything): `the root of the task's worktree`, branch `task/skill-scen-pikselowych`, base `e125db89f913b8c2d7b04d493f5696c96c522ebf`. Commit on this branch only. `.the-way` here is at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the commit the repository pins; `npm ci` and `.runs/quality-venv` are installed.
- Your directory for working copies: `.runs/author/` (under the worktree's ignored `.runs/`).
- Your report: `docs/task-cycles/skill-scen-pikselowych/reports/author-report.md`.
- Commits: explicit paths only (`git add <file> …`), never `git add -A`, `.` or `commit -a`; the message in English, in the form of the repository's own history (`docs: :memo: …`, `feat: …` — read `git log` first). Check `git log --format='%h %ae'` after your first commit.

## Method and variant

Read `.the-way/task-cycle/change/SKILL.md` whole and follow it; its variant for you is "the whole change as the one author". Read a file it names only when the step or variant that names it comes. The foundation step is yours: read `.the-way/task-cycle/skill/foundation_step.md` whole, and each element's `SKILL.md` it names (a decision is `.the-way/elements/decisions/skill/SKILL.md`) when you write an entry of that element. You return before review; you are resumed later for a fix and for the return step.

## The task

The frozen task, read whole: `docs/task-cycles/skill-scen-pikselowych/task.md` (a Polish document; it is the whole source of the required outcome; do not widen it). Its *Project relation* is `independent`, *Human actions* `none`.

Answers of the orchestrator at the start (step 4 of the cycle):

- Trust boundary: no (every file you write is in `agent-workflow` or `product-foundation`). But the scripts read images of packs from outside: each must refuse a malformed, truncated or wrong-sized PNG with a message and a non-zero exit code and write no output file, and a test must show it.
- Irreversible operation: no.
- Open design choice: none. How to make what the task settles is yours to choose and to name in your report, among them the command line of each script and the layout of shared code.
- *Questions carried to cycle* — Pillow or Node: **Node with no new dependency**. The scripts are `.mjs` files that read and write PNG with `node:zlib`, as `tests/view/scene-picture.test.mjs` (around line 764) does and as the `.mjs` scripts of `loop2-play` do. Do not add Pillow, a package or a line to `requirements-quality.*` or `package.json`. If you find that Node cannot do something a script needs, return `questions` rather than add a dependency.
- Settlement row 1 of *Settlements to record* is kind `decision`. The task's *Context* says an agent's working rules stand in the skill, not in the product's decisions (D-254, D-357–D-359 were withdrawn for that reason). Follow `foundation_step.md` for the row: write the entry the row's meaning allows through `elements/decisions/skill/SKILL.md`, or, where the row cannot be held as an entry of the decision log, return `blocked` with that question. Do not add a threshold of colour contrast against a prop to D-271 or to any test; the row says none stands.
- Where the task's *To do* 3 says what the foundation requires of a pack outside the three that D-271 names, read that from the foundation (D-271, the facts of the packs in `foundations/environment_facts.md`, the invariant `sprite-credits`, the external-context table of `foundations/part_map.md`) and state it in the skill; do not write a new pack's entries in this change.

## What to read (selected by the orchestrator; read whole, besides the method files)

- `AGENTS.md` of the worktree, `guidelines/coding.md` and `guidelines/testing.md` whole. No kind file of `guidelines/coding-*.md` matches the work. The part is `agent-workflow` (`foundations/part_map.md`); the scripts and their tests are code and tests of it.
- The pattern: `.claude/skills/loop2-play/` (every file) and `tests/agent_workflow/test_loop2_play_skill.py`, which pins the two copies of a skill byte for byte and tests its script. `tests/agent_workflow/test_tracked_file_private_paths.py` and D-362: no tracked file may name a note or folder outside the repository; a skill file must stand without the task's material.
- Foundation entries by identifier, whole: D-271, D-272, D-273, D-317, D-349, D-316, D-366, D-87, D-362, D-255, D-256, D-258, D-414; of the testing discipline D-73, D-77, D-81, D-83, D-85; the invariants `sprite-credits` and `sprite-file-content`; the glossary terms your text uses. For entries you write, select by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` through the element's skill.
- The sprites: `assets/sprites/` (read only; this change adds and changes no file there).
- The task's material, outside the repository: `the folder of the task's material in the author's private notes` — scripts and frames of tasks 17–20 (Pillow in Python, Node, Playwright). Read it as a source of what each of the six scripts has to do. It is not part of the product: nothing you commit names it, copies its Pillow code or depends on it, and the skill must work from the repository alone (acceptance criterion 2).

## Boundaries

- Do not run the product's full gate (`npm test` with no argument): it is the orchestrator's (step 10). Run the checks of your own work: `npm test -- <file>` for one file (a `*.test.mjs` runs after the build, a `test_*.py` without it), ESLint, Prettier, Ruff as `tests/quality` runs them, and `python -B .the-way/elements/common/foundation_check.py` after a foundation entry.
- Every script has a test that `npm test` reaches (D-83; `tests/quality/test_node_test_selection.py`; the Python runner needs a tracked `test_*.py` in a directory that already has one — `tests/agent_workflow/`). The new skill's two copies (`.claude/skills/<name>/` and `.agents/skills/<name>/`) are byte-identical and a test pins that, as for `loop2-play`; `AGENTS.md` gets a pointer as for `loop2-play`. A new directory of code may need `eslint.config.mjs` and the quality tests' lists extended in the same change (`guidelines/coding.md`, *Linter*); find out by running the checks.
- Expected values of a test come from the foundation, from the task's accepted measurements or from an independent source, never from the output of the script under test (`guidelines/testing.md`, *Where the expected value comes from*). Acceptance criterion 1 gives them for the pictures: `wolf-idle.png` 31 px high and 63 px long, `mage-idle.png` 32 × 25 px. Measure the files of `assets/sprites/` yourself; if a file differs from the criterion, say so in your report and do not bend a script or a test to fit.
- The report states the weakest point of your change and the check you made of it (the cycle's "weakest-point check"); name which sentence of the task each script and each test answers.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## What you return

As `.the-way/task-cycle/change/SKILL.md` gives: status, commits, a one-line check result, the report path; the report holds **Unread material** and **Searches not found or unclear** (each `none` or the items), your own-work check, the reaches beyond this handoff's selection, the questions and concerns, and for each foundation entry you write one sentence of its meaning in English and one in Polish with its mark (`row 1`, `projected` or `the cycle's`). Personal data and secrets stay out of the report.
