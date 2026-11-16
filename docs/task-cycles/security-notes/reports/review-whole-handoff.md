# Handoff to the reviewer of the whole change — task `security-notes`

You review a change you did not make, in a task cycle of the-way. The person who requested the cycle has delegated every intermediate choice to the orchestrator; you ask the orchestrator, never the human. You are read-only: you change no tracked file.

## Where you work and what you review

- Worktree: the root of the repository you start in (branch `task/security-notes`).
- Range to review: `b88ef2b148090e7abb89e90255de17e0f66dda1b..705be3a5f1f37a1f5ee7b2abccece9d33c6ce8e0` — one commit, `705be3a5`, by the one author. Changed files: `security-notes.md` (new, +36), `README.md` (+44 −42, translation into English with one added line), `foundations/part_map.md` (+1: `security-notes.md` added to the *Files* of the part `agent-workflow`).
- The pinned the-way is `.the-way/` of this worktree, at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Your directory for working copies: `.runs/review-whole/`.
- Report: write it to `.runs/task-cycles/security-notes/reports/review-whole-report.md`; its first line is `PASS <sha>` or `FAIL <sha>` (or `questions`).

## Method and variant

Read `.the-way/task-cycle/review/SKILL.md` whole and follow it; your variant is the review of the whole change, so read `.the-way/task-cycle/review/whole_change.md` as it names. Read a file the method names only when the step that names it comes. You have no skill tool; read every method as a file. You select your own foundation entries and guidelines by the parts of the change, as that method gives.

## What you judge against

- The frozen task: `.runs/task-cycles/security-notes/task.md` — read whole. Judge every item of *To do* (1–5), the *Acceptance criterion*, the answers 1–6 of *Questions to settle* (they bind), *Context* and *Out of scope*. This is a task whose artefact is generated from a source (the trial protocol, as the task restates it): every statement of the new file about the trial, the permissions and the places of secrets must trace to the task or to a file of the repository it links to; a statement that traces to neither is a finding of source fidelity.
- Answers of step 4 of the cycle: trust boundary — no; irreversible operation — no; open design choice — none; route — one author, no plan. The part of the map for the file was a question carried to the cycle; the orchestrator chose `agent-workflow` (record: `Q2` of the cycle, which you do not read; the choice is stated here in full).
- Reconciliation with the sources, made by the orchestrator on 2026-11-16 with `gh api` (read only): the ruleset `main` is active on the default branch, its rules are `deletion`, `non_fast_forward` and `pull_request` (allowed merge method `merge` only, required approving review count 0), its list of bypass actors is empty; secret scanning and push protection of the repository are `enabled`.
- The author's report: `.runs/task-cycles/security-notes/reports/author-report.md` (status `done`; checks: `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` exit 0, `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` exit 0; the full gate and `check_instructions.py` on its own were not run by the author — the full gate is the orchestrator's and has not run yet).
- The part map and the foundation entries of the touched parts, selected by you; at least D-12, D-13, D-362, D-412 and the invariants `tracked-file-private-paths` and `tracked-file-private-names` bear on the new file.
- Guidelines: the change holds no product code or test; read `guidelines/coding.md` or `guidelines/testing.md` only if you find that the change reaches what they govern.

## Points the task and the product make binding that need a check by reading, not by a test

- The acceptance criterion says the file states no value of any token, the decoy token of the trial included, and no host name of the decoy file. Check the whole file, and the README line that was added.
- The two invariants of D-362 (no absolute path on a disk, no link to a private note, no name of a private note or folder, no file of an unreachable repository): the first is a test, the second is checked by review — it is yours. Also the answers 3 (the company of the author's professional work is not named), 4 (the file says nothing about who merges a pull request) and 5 (the planted instructions are rendered in the author's own words, with no verbatim quote).
- Every link target of the new file and of the README exists in the repository at the reviewed head, and the anchor `#agent-or-human` of the deploy skill matches a heading.
- The README: compare it with `git show b88ef2b148090e7abb89e90255de17e0f66dda1b:README.md` section by section: the same content and structure, nothing dropped or added except the one line linking to `security-notes.md`, every command, file name, identifier and link intact, and the strings of the game's screens quoted as the screen shows them. The README states facts about the product that the foundation holds (for example D-390 and D-413 in its test paragraph): check the translation did not change one.
- The part map line: the file belongs to the part by the part map's rules for assigning files; `python -B .the-way/elements/common/foundation_check.py` must show no file claimed by no part.
- Words of the file that its reader cannot read without a dictionary or that name a thing the reader does not have in front of them (the author's rule on plain language): judge them as findings of appearance, with the grade the method gives.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

Your directory for working copies is `.runs/review-whole/`.

## Report

Return the report's first line, its path and a one-line check result naming what failed or did not run. The report holds every check you ran with its command and exit code, your findings with their grades and where each lies, the number of decisions you read whole and by title only, **Unread material** and **Searches not found or unclear** (each `none` where it is none). Do not run the product's full gate: it is the orchestrator's.
