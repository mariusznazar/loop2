# Handoff - executor of slice 3 (`make-change`)

You are the executor of one slice of a planned change in a the-way task cycle. The person who
requested the cycle has delegated intermediate choices to the orchestrator; send your questions to
the orchestrator (status `questions`), never to the human.

- Worktree (work from its root, on its branch): `the root of the worktree`, branch `task/poprawki-brzmienia-fundamentu`. Slice base (the head when you start): `d60ad606573cf40e7a309fa89990a4f69d6ddb99`. Commit your work on this branch; no other agent writes in the worktree while you work.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` - read it whole; your variant is "a slice, or the retry of a slice". Read a file it names only when the step or variant that names the file comes.
- Stage and boundary: make slice 3 of the plan below and nothing else, commit it, and return. Do not run the product's full gate (`npm test` without a file); focused checks named in the slice's *Checks* only. Do not touch the plan, the record or other slices' files.
- Frozen task: `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md`. Plan: `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md` (the section of your slice and the rules are copied below, word for word; the plan holds the rest). No spec exists.
- Class and model of this executor: `cheaper` (haiku).
- Answers of step 4: trust boundary - no (no file of this change is on a *Trust boundary* line of `foundations/part_map.md`); irreversible operation - no.
- Directory for your working copies: `.runs/executor-3/` (directly under `.runs/` of the worktree).
- Report path: `.runs/task-cycles/poprawki-brzmienia-fundamentu/reports/executor-3-report.md`.
- Guidelines: read whole the guideline files the slice's *Read* names. Read `AGENTS.md` of the worktree.
- Dependencies are installed in the worktree (`npm ci` was run). The Python quality environment `.runs/quality-venv` may be missing: where a check needs it, report the check as not run, never as passed.
- How to read the foundation: the files `foundations/decisions.md` (about 11 400 lines) and `foundations/invariants.md` are never opened whole. Read the entries by the ranges below (current at this slice's base, they hold over the plan's) and find a quotation or an identifier with `git grep -n`.
- What the earlier slices changed stands in the branch's commits since the base `f66ae6eb34de0b68099caf1a19f4ff368b332372`; read `git log --oneline f66ae6eb..HEAD` where the slice depends on one.

## Working copies (word for word from the cycle's rule)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Current ranges of the foundation entries named in the slice's *Read*

- `foundations/decisions.md:7530-7573` D-23
- `foundations/decisions.md:6519-6541` D-144
- `foundations/invariants.md` action-in-progress: 187-197
- `foundations/invariants.md` program-rule-pick: 248-263
- `foundations/invariants.md` copy-save: 848-857
- `foundations/invariants.md` program-world-reference: 386-396
- `foundations/invariants.md` minute-span-split: 528-537
- `foundations/invariants.md` map-run-repeatability: 165-175
- `foundations/invariants.md` restart-seed: 309-318

## Rules for every slice (copied from the plan)

## Rules for every slice

These rules bind the agent of each slice beside its own section.

1. The task's line numbers are from an older commit. Find each wording by its quotation, never by
   its line number. A quoted wording that no longer stands, or a change that is already made, is
   reported with what stands now and is not forced. Where the entry the task names is withdrawn,
   apply the change to its successor (the table "Withdrawn identifiers" of its file names it) only
   where the same defect stands there, and report it.
2. Every change to `foundations/**` follows the `SKILL.md` of that entry's element (its `read.md`,
   `decide_entry.md`, `draft.md` or `write.md` when the step that names them comes), with
   `.the-way/elements/common/way_of_working.md` and `.the-way/elements/common/rules.md`. The task
   settles each wording and the human accepted every wording it carries; write it as the task
   gives it. A question for the human, or an edit that would change what an entry binds beyond the
   task, is returned to the orchestrator with the status `blocked`; never ask the human.
3. After each entry is written run `python -B .the-way/elements/common/foundation_check.py
   --skip-test-citations`, and at the slice's end `python -B
   .the-way/elements/common/foundation_check.py`; both end with `0 errors` (the base does). A line
   `listed:` is no error; report each one.
4. Where a reworded binding sentence of a decision breaks a quotation of a line `decision: D-<n>
   "…"` in a test (the foundation check reports it), change that quotation in this slice to the
   same span of the new sentence. Find those lines with `git grep -n 'decision: D-<n> "'`; edit
   them in place without reading the test files whole. Where such a line stands in a file that is
   not in this slice's *Change*, stop and return to the orchestrator.
5. No `invariant:` line is added or changed (another task carries them); the game's behaviour does
   not change; the constant `DEPLOYMENT_MEMORY_LIMIT` keeps its name; no entry binds anything
   new, except the three wordings the human chose for D-231, D-232 and D-380.
6. Report, for each item of the slice: made, already made (what stands), or not standing (what
   stands instead).
7. Never open `foundations/decisions.md`, `foundations/invariants.md` or a large test file whole;
   read the ranges named in *Read* and find quotations with `git grep`.

## Your slice (copied from the plan)

### Slice 3 — Comments of the simulation tests

- **Goal:** The comments of To do 7.1, 7.3, 7.4, 7.6 and 7.12 hold: no comment of these tests
  points to a line number of a foundation file (7.1 may already be made; report what stands); the
  repeated line of the comment over `traceChunks` in `tests/sim/encounters.test.mjs` is gone
  (7.1 for `:727` and 7.12 name it); the docstrings of `test_action_in_progress.py` and
  `test_program_rule_pick.py` quote the invariant's present sentence and name in "Does NOT cover"
  what the test does not check; `test_copy_save.py` says that a switch zeroes the streak with the
  beaten attacks and the rule counts; `COMPARES_STOCK` in `test_program_world_reference.py` holds
  `"itemBelow"` beside `"hereBelow"` and its comment says both. No assertion changes.
- **Change:** `tests/sim/encounters.test.mjs` · `tests/sim/combat.test.mjs` ·
  `tests/sim/program-counts.test.mjs` · `tests/invariants/test_action_in_progress.py` ·
  `tests/invariants/test_program_rule_pick.py` · `tests/invariants/test_copy_save.py` ·
  `tests/invariants/test_program_world_reference.py`
- **Read:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` Rules for every slice ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:72-78` To do 7.1–7.6 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:84-84` To do 7.12 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:192-196` Out of scope ·
  `guidelines/coding.md` · `guidelines/testing.md` ·
  `foundations/invariants.md:187-196` action-in-progress ·
  `foundations/invariants.md:248-262` program-rule-pick · `foundations/invariants.md:848-856` copy-save ·
  `foundations/invariants.md:386-395` program-world-reference ·
  `foundations/invariants.md:528-536` minute-span-split ·
  `foundations/invariants.md:165-174` map-run-repeatability · `foundations/invariants.md:309-317` restart-seed ·
  `foundations/decisions.md:7530-7572` D-23 · `foundations/decisions.md:6519-6540` D-144 ·
  `foundations/glossary.md:168-184` beaten attack, combat turn, copy ·
  `src/browser/sim/programs.ts:740-810`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/encounters.test.mjs`, `npm test -- tests/sim/combat.test.mjs`,
  `npm test -- tests/sim/program-counts.test.mjs`, then `npm test -- <file>` for each of the four
  Python files; `npx prettier --check tests/sim/encounters.test.mjs tests/sim/combat.test.mjs
  tests/sim/program-counts.test.mjs`; `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml`
  on the four Python files where that environment stands, otherwise reported unchecked.
- **Depends on:** none

## What to return

As `make-change` gives: status, commits (SHAs), a one-line check result naming what failed or did not run, the report path; in the report each item of the slice as made / already made (what stands) / not standing (what stands instead), your own-work check, each check with its command and exit code, **Unread material**, **Searches not found or unclear**, each reach beyond this handoff, your working copies.
