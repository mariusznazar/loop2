# Handoff - agent of the fix of the whole-change review (`make-change`)

You fix the findings of the review of the whole change of a the-way task cycle. The person who
requested the cycle has delegated intermediate choices to the orchestrator; send questions to the
orchestrator (status `questions`), never to the human.

- Worktree (work from its root, on its branch): `the root of the worktree`, branch `task/poprawki-brzmienia-fundamentu`. Head when you start (the reviewed head): `bcc35f33f571f890626affedb9d430d5cc6a7a39`. Commit your fix on this branch; the fix's range runs from the reviewed head.
- Method: `.the-way/task-cycle/change/SKILL.md` - read it whole; your variant is "the fix of a review's findings". Read a file it names only when the step or variant that names it comes.
- Findings file (read whole, it holds the orchestrator's instructions for each finding): `.runs/task-cycles/poprawki-brzmienia-fundamentu/reports/whole-review-findings.md`. The reviewer's whole report: `.runs/task-cycles/poprawki-brzmienia-fundamentu/reports/review-whole-report.md` (read it where a finding needs its evidence).
- Frozen task: `.runs/task-cycles/poprawki-brzmienia-fundamentu/task.md`; plan: `.runs/task-cycles/poprawki-brzmienia-fundamentu/plan.md` (the rules for every slice are copied below). The slices' reports stand beside the findings file in `reports/executor-<n>-report.md`.
- Stage and boundary: fix the findings of the findings file as its orchestrator's instructions say and nothing else; do not run the product's full gate (`npm test` without a file); run the checks that your changes affect.
- Class and model: `same` (Sonnet). Answers of step 4: trust boundary - no; irreversible operation - no.
- Directory for your working copies: `.runs/fix/` (directly under `.runs/` of the worktree). Report path: `.runs/task-cycles/poprawki-brzmienia-fundamentu/reports/fix-report.md`.
- Guidelines to read whole: `AGENTS.md` of the worktree, `guidelines/coding.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`, `guidelines/styleguide-browser-view.md` (you edit comments in `src/browser/` and a heading of this file), `guidelines/coding-browser-module.md`. Element skills for the entries you write: `.the-way/elements/decisions/skill/SKILL.md`, `.the-way/elements/environment-facts/skill/SKILL.md` and the files they name when the step comes (`.the-way/elements/common/rules.md`, `way_of_working.md`).
- Dependencies are installed; `.runs/quality-venv` is missing: a ruff check you cannot run is reported as not run, never passed. Docker may answer; a test needing it that cannot run is reported as not run.
- Never open `foundations/decisions.md` or `foundations/invariants.md` whole: find the entries by `git grep -n` and read their ranges.
- Choices already taken that you must keep: the picture band is "the picture band"; the task's wording of the `reading` term, of `narrowed by D-265` in D-03 and of D-322's sentences stays (except the added "(D-317, D-319)").

## Working copies (word for word from the cycle's rule)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Rules for every slice (copied from the plan; they bind you too, where they fit a fix)

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

## What to return

As `make-change` gives: status, commits (SHAs), a one-line check result naming what failed or did not run, the report path; in the report each finding as fixed / not changed (and why, with the orchestrator's instruction it follows) / returned, your own-work check, each check with its command and exit code, **Unread material**, **Searches not found or unclear**, reaches beyond this handoff, working copies.
