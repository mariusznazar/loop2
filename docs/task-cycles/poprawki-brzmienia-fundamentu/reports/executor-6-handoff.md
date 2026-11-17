# Handoff - executor of slice 6 (`make-change`)

You are the executor of one slice of a planned change in a the-way task cycle. The person who
requested the cycle has delegated intermediate choices to the orchestrator; send your questions to
the orchestrator (status `questions`), never to the human.

- Worktree (work from its root, on its branch): `the root of the worktree`, branch `task/poprawki-brzmienia-fundamentu`. Slice base (the head when you start): `192e9096da22c2a471bc3c721a5794cc0705b52e`. Commit your work on this branch; no other agent writes in the worktree while you work.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` - read it whole; your variant is "a slice, or the retry of a slice". Read a file it names only when the step or variant that names the file comes.
- Stage and boundary: make slice 6 of the plan below and nothing else, commit it, and return. Do not run the product's full gate (`npm test` without a file); focused checks named in the slice's *Checks* only. Do not touch the plan, the record or other slices' files.
- Frozen task: `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md`. Plan: `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md` (the section of your slice and the rules are copied below, word for word; the plan holds the rest). No spec exists.
- Class and model of this executor: `same` (sonnet).
- Answers of step 4: trust boundary - no (no file of this change is on a *Trust boundary* line of `foundations/part_map.md`); irreversible operation - no.
- Directory for your working copies: `.runs/executor-6/` (directly under `.runs/` of the worktree).
- Report path: `.runs/task-cycles/poprawki-brzmienia-fundamentu/reports/executor-6-report.md`.
- Guidelines: read whole the guideline files the slice's *Read* names. Read `AGENTS.md` of the worktree.
- Dependencies are installed in the worktree (`npm ci` was run). The Python quality environment `.runs/quality-venv` may be missing: where a check needs it, report the check as not run, never as passed.
- How to read the foundation: the files `foundations/decisions.md` (about 11 400 lines) and `foundations/invariants.md` are never opened whole. Read the entries by the ranges below (current at this slice's base, they hold over the plan's) and find a quotation or an identifier with `git grep -n`.
- What the earlier slices changed stands in the branch's commits since the base `f66ae6eb34de0b68099caf1a19f4ff368b332372`; read `git log --oneline f66ae6eb..HEAD` where the slice depends on one.

## Working copies (word for word from the cycle's rule)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Current ranges of the foundation entries named in the slice's *Read*

- `foundations/decisions.md:1791-1816` D-17
- `foundations/decisions.md:2168-2238` D-231
- `foundations/decisions.md:2239-2280` D-232
- `foundations/decisions.md:2420-2455` D-236
- `foundations/decisions.md:1887-1937` D-253
- `foundations/decisions.md:1102-1169` D-255
- `foundations/decisions.md:2058-2072` D-355
- `foundations/decisions.md:2073-2087` D-356
- `foundations/invariants.md` loop2-deploy-keeps-running: 135-144; loop2-application-port: 145-154
- `foundations/invariants.md` account-save-backup-encrypted: 1108-1117

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

### Slice 6 — Decisions of the server, its deployment and its backup

- **Goal:** D-17, D-231 (the human's wording), D-232 (the human's wording, its *Verification*
  included), D-236, D-253, D-255, D-355 and D-356 say what *Decisions in play* gives them. The
  quotations of D-17 and D-232 that the new sentences break follow them (rule 4; at the base they
  stand in the four test files of *Change* named for them). The test docstrings hold To do 7.7
  ("containers"), 7.8 (the docstring of `test_loop2_application_port.py` opens with the
  invariant's sentence, then says the file checks the side of the sources) and 7.11 ("the human"
  at the notice's wording in `tests/deploy/test_loop2_backup.py`; the quotations of D-233 there
  stay).
- **Change:** `foundations/decisions.md` · `tests/deploy/test_loop2_deploy_switch.py` ·
  `tests/invariants/test_loop2_host_sharing.py` · `tests/deploy/test_loop2_backup.py` ·
  `tests/invariants/test_account_save_backup_encrypted.py` ·
  `tests/invariants/test_loop2_deploy_keeps_running.py` ·
  `tests/invariants/test_loop2_application_port.py`
- **Read:** `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md:18-48` Rules for every slice ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:26-26` To do 1 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:79-80` To do 7.7–7.8 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:83-83` To do 7.11 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:136-136` D-17 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:158-162` D-231 to D-255 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:175-176` D-355, D-356 ·
  `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md:192-196` Out of scope ·
  `.the-way/elements/decisions/skill/SKILL.md` · `.the-way/elements/decisions/skill/read.md` ·
  `.the-way/elements/decisions/skill/decide_entry.md` · `.the-way/elements/decisions/template.md` ·
  `.the-way/elements/decisions/examples.md` · `.the-way/elements/common/rules.md` ·
  `.the-way/elements/common/way_of_working.md` · `guidelines/coding.md` · `guidelines/testing.md` ·
  `foundations/glossary.md` ·
  `foundations/decisions.md:1791-1815` D-17 · `foundations/decisions.md:2168-2237` D-231 ·
  `foundations/decisions.md:2239-2279` D-232 · `foundations/decisions.md:2420-2454` D-236 ·
  `foundations/decisions.md:1887-1936` D-253 · `foundations/decisions.md:1102-1168` D-255 ·
  `foundations/decisions.md:2058-2071` D-355 · `foundations/decisions.md:2073-2086` D-356 ·
  `foundations/invariants.md:135-153` loop2-deploy-keeps-running, loop2-application-port ·
  `foundations/invariants.md:1108-1116` account-save-backup-encrypted ·
  `deploy/loop2-deploy:26-45` · `src/server/account-backup.ts` · `src/server/database.ts:150-175` ·
  `src/server/database.ts:915-935` · `tests/invariants/test_account_server_typecheck.py:20-45` ·
  `.agents/skills/loop2-deploy/references/backup_and_restore.md`
- **Model:** same — D-231 and D-232 take the human's wordings, which must keep what each binds and
  name the leftover of a failed clean-up exactly as the code leaves it.
- **Risk:** none
- **Checks:** the foundation check as rule 3 gives; `npm test -- <file>` for each of the six test
  files of *Change*; `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml` on them where
  that environment stands, otherwise reported unchecked.
- **Depends on:** Slice 5

## What to return

As `make-change` gives: status, commits (SHAs), a one-line check result naming what failed or did not run, the report path; in the report each item of the slice as made / already made (what stands) / not standing (what stands instead), your own-work check, each check with its command and exit code, **Unread material**, **Searches not found or unclear**, each reach beyond this handoff, your working copies.
