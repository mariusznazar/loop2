# Handoff - executor of slice 9 (`make-change`)

You are the executor of one slice of a planned change in a the-way task cycle. The person who
requested the cycle has delegated intermediate choices to the orchestrator; send your questions to
the orchestrator (status `questions`), never to the human.

- Worktree (work from its root, on its branch): `the root of the worktree`, branch `task/poprawki-brzmienia-fundamentu`. Slice base (the head when you start): `c753bc5e906342397a15e5e0da2c6cd5c4c7952d`. Commit your work on this branch; no other agent writes in the worktree while you work.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` - read it whole; your variant is "a slice, or the retry of a slice". Read a file it names only when the step or variant that names the file comes.
- Stage and boundary: make slice 9 of the plan below and nothing else, commit it, and return. Do not run the product's full gate (`npm test` without a file); focused checks named in the slice's *Checks* only. Do not touch the plan, the record or other slices' files.
- Frozen task: `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md`. Plan: `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md` (the section of your slice and the rules are copied below, word for word; the plan holds the rest). No spec exists.
- Class and model of this executor: `same` (sonnet).
- Answers of step 4: trust boundary - no (no file of this change is on a *Trust boundary* line of `foundations/part_map.md`); irreversible operation - no.
- Directory for your working copies: `.runs/executor-9/` (directly under `.runs/` of the worktree).
- Report path: `.runs/task-cycles/poprawki-brzmienia-fundamentu/reports/executor-9-report.md`.
- Guidelines: read whole the guideline files the slice's *Read* names. Read `AGENTS.md` of the worktree.
- Dependencies are installed in the worktree (`npm ci` was run). The Python quality environment `.runs/quality-venv` may be missing: where a check needs it, report the check as not run, never as passed.
- How to read the foundation: the files `foundations/decisions.md` (about 11 400 lines) and `foundations/invariants.md` are never opened whole. Read the entries by the ranges below (current at this slice's base, they hold over the plan's) and find a quotation or an identifier with `git grep -n`.
- What the earlier slices changed stands in the branch's commits since the base `f66ae6eb34de0b68099caf1a19f4ff368b332372`; read `git log --oneline f66ae6eb..HEAD` where the slice depends on one.

## Working copies (word for word from the cycle's rule)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Current ranges of the foundation entries named in the slice's *Read*

- `foundations/decisions.md:7113-7145` D-119
- `foundations/decisions.md:7958-7975` D-170
- `foundations/decisions.md:8302-8323` D-189
- `foundations/decisions.md:8789-8814` D-251
- `foundations/decisions.md:9344-9422` D-308
- `foundations/decisions.md:9423-9459` D-309
- `foundations/decisions.md:9460-9495` D-310
- `foundations/decisions.md:10161-10193` D-335
- `foundations/decisions.md:10599-10639` D-342
- `foundations/decisions.md:1938-1998` D-347
- `foundations/decisions.md:10786-10798` D-382
- `foundations/decisions.md:6378-6418` D-373
- `foundations/decisions.md:7041-7067` D-379
- `foundations/decisions.md:7824-7838` D-380
- `foundations/decisions.md:8073-8092` D-384

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

### Slice 9 — Decisions of the game, its programs and the chronicle

- **Goal:** D-119, D-170, D-189 (its binding sentence may already say the card of a map; its
  *Rationale* still speaks of the list of maps), D-310, D-335, D-342, D-347, D-373, D-380 (the
  human's wording, *Relations* and *Rationale*) and D-384 say what *Decisions in play* gives them.
  The quotation of D-170 in `tests/view/maps-screen.test.mjs` follows the new sentence (rule 4).
- **Change:** `foundations/decisions.md` · `tests/view/maps-screen.test.mjs`
- **Read:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` Rules for every slice ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:26-26` To do 1 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:98-102` Questions to settle (wordings accepted) ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:149-149` D-119 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:151-151` D-170 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:154-154` D-189 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:167-167` D-310 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:172-174` D-335 to D-347 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:180-184` D-373 to D-384, decisions read ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:192-196` Out of scope ·
  `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` ·
  `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` ·
  `.the-way/elements/decisions/examples.md` · `.the-way/elements/common/rules.md` ·
  `.the-way/elements/common/way_of_working.md` · `guidelines/coding.md` · `guidelines/testing.md` ·
  `guidelines/styleguide-browser-view.md` ·
  `foundations/decisions.md:7110-7141` D-119 · `foundations/decisions.md:7955-7971` D-170 ·
  `foundations/decisions.md:8299-8319` D-189 · `foundations/decisions.md:8786-8810` D-251 ·
  `foundations/decisions.md:9341-9418` D-308 · `foundations/decisions.md:9420-9455` D-309 ·
  `foundations/decisions.md:9457-9491` D-310 · `foundations/decisions.md:10158-10189` D-335 ·
  `foundations/decisions.md:10596-10635` D-342 · `foundations/decisions.md:1938-1997` D-347 ·
  `foundations/decisions.md:10783-10794` D-382 · `foundations/decisions.md:6375-6414` D-373 ·
  `foundations/decisions.md:7038-7063` D-379 · `foundations/decisions.md:7821-7834` D-380 ·
  `foundations/decisions.md:8070-8088` D-384 · `src/browser/view/maps-screen.tsx:300-325` ·
  `src/browser/sim/program.ts:270-300` · `src/browser/sim/data/actions.ts:140-155` ·
  `src/browser/view/chronicle-entries.ts:225-255`
- **Model:** same — D-380 takes the human's wording of its *Relations* and *Rationale*, which must
  keep what D-308, D-309 and D-310 bind.
- **Risk:** none
- **Checks:** the foundation check as rule 3 gives; `npm test -- tests/view/maps-screen.test.mjs`;
  `npx prettier --check tests/view/maps-screen.test.mjs`.
- **Depends on:** Slice 8

## What to return

As `make-change` gives: status, commits (SHAs), a one-line check result naming what failed or did not run, the report path; in the report each item of the slice as made / already made (what stands) / not standing (what stands instead), your own-work check, each check with its command and exit code, **Unread material**, **Searches not found or unclear**, each reach beyond this handoff, your working copies.
