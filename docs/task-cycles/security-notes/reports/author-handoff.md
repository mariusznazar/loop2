# Handoff to the one author — task `security-notes`

You are the one author of a change without a plan, in a task cycle of the-way. The person who requested the cycle has delegated every intermediate choice to the orchestrator; you ask the orchestrator, never the human, and you never label an answer as the human's approval.

## Where you work

- Worktree: the root of the repository you start in (branch `task/security-notes`, base `b88ef2b1`, the merge of request #138 into `origin/main`). Work only there. Your own working copies, if any, go to `.runs/author/` directly under the worktree's `.runs/`.
- The pinned the-way is `.the-way/` of this worktree, at `bfb2e109735b5fff98802b8be0ff3c43c799262a` (the gitlink matches). Read it from this worktree only.
- Dependencies are installed in the worktree (`npm ci`, `.runs/quality-venv`) once the orchestrator's background install ends; if a focused check fails because they are missing, say so in your report and do not install anything else.
- Report: write it to `.runs/task-cycles/security-notes/reports/author-report.md`.

## Method and variant

Read `.the-way/task-cycle/change/SKILL.md` whole and follow it. Your variant is its row "the whole change as the one author". Read a file it names only when the step or variant that names it comes. The foundation step is `.the-way/task-cycle/skill/foundation_step.md`; read it whole, and the `SKILL.md` of an element (path given in that file) when you write an entry of that element. You have no skill tool: every method is read as a file.

## The task

The frozen task is `.runs/task-cycles/security-notes/task.md`. Read it whole. It is the only source of every fact the files you write state about the trial of 14.11.2026, the agent's permissions and the places of secrets; where it is silent, write `TODO` and name the gap in your report, never a value from memory (the author's rule on the source of an artefact). Its status is `ready for cycle`, its *Human actions* is `none`, its *Settlements to record* is `none`.

The change: a new file `security-notes.md` in the repository's root, written in English; `README.md` translated whole into English with one line added that links to `security-notes.md`; the part-map line the new file needs.

## Answers of step 4 the orchestrator gives you

- Trust boundary touched: no. Irreversible operation: no.
- Open design choice: none. Route: one author, no spec, no plan.
- *Questions carried to cycle* of the task (which part of the map the file belongs to): the orchestrator chooses `agent-workflow` — the task names it as the nearest part, and `AGENTS.md` and `CLAUDE.md`, the other root files that tell how agents work here, stand in its *Files*. Write the line through `elements/part-map/skill/SKILL.md` of the pinned the-way, as `foundation_step.md` gives. Whether the part's responsibility sentence must change to cover the file is for that skill's rules to decide; name your reading in the report.
- Reconciliation with the sources since the task was accepted (orchestrator, 2026-11-16, `gh api` read-only on the repository `mariusznazar/loop2`): the ruleset `main` is active on the default branch with the rules `deletion`, `non_fast_forward` and `pull_request` (allowed merge method `merge` only, required approving review count 0) and an empty list of bypass actors; secret scanning and its push protection are `enabled`. This is what the task says, so the task's sentences about the ruleset and the scan stand. The task's sentence that the plain file does not say who merges stands too (question 4).
- `origin/main` moved since the task was written (the pin of the-way, the decision log divided into sections, D-412 and D-413 about CI and secret scanning). Read the decision log by the section headings it now has; `python -B .the-way/elements/common/decision_index.py --decision <number> --output <file>` writes one decision into a file in your own working directory, or read the entry in `foundations/decisions.md` by its heading.

## What you read, selected by the orchestrator

- Foundation: the decisions D-12, D-13, D-362 and D-412 whole (each from its heading to the next heading of `foundations/decisions.md`); the invariants `tracked-file-private-paths` and `tracked-file-private-names` whole; `foundations/part_map.md` whole; `foundations/glossary.md` whole (short); any entry these link to that you need.
- Files that hold the facts the new file points to: `.agents/skills/loop2-deploy/SKILL.md` (its section "Agent or human") and `.agents/skills/loop2-deploy/references/setup_and_secrets.md`; `tests/agent_workflow/test_tracked_file_private_paths.py`; `README.md`; `AGENTS.md`.
- Guidelines: the change is no product code and no test, so `guidelines/coding.md` and `guidelines/testing.md` do not bind it. If you find that a test is warranted, return with the reason instead of writing one: the task asks for none.
- You may link only to files that exist in the repository and that a reader without access to the author's disk can open. Check each link target exists.

## What the files must and must not say

All of it is in the task; read its *Description*, *Acceptance criteria*, *Questions to settle* (the numbered answers 1–6 bind), *Context* and *Out of scope*. In short, as hard edges to check your work against:

- `security-notes.md`: English; its first sentence says that the file gathers the subject of the security of the work with agents in one place and that the files it points to are the source of truth; permissions part — a few sentences with links; secrets part — one sentence and a link to `.agents/skills/loop2-deploy/references/setup_and_secrets.md`, not repeating its content; the trial of 14.11.2026 — a full short description of the event with its date, written as a record of what happened and not of a state; the planted instructions rendered in your own words with no verbatim quote (answer 5); no statement about who merges a pull request (answer 4); the company the author works for is not named (answer 3).
- The file states no value of any token, the decoy token of the trial included, and no host name from the decoy file (acceptance criterion). It also holds no absolute path on a disk, no link in double square brackets, no name of a private note or of the folder of notes, and names no file of a repository its readers cannot reach (D-362, the two invariants); the tracked-file test of private paths must pass on both files.
- The file does not repeat the content of `setup_and_secrets.md` and does not claim more than its sources do: for the server it says what D-12 says, that the limit to reading is an agreement and not an enforced boundary, with the link to the section "Agent or human" of the deploy skill.
- `README.md`: the whole text translated, the same content and structure, nothing dropped or added except the one line linking to `security-notes.md`. Strings of the game's screens that the Polish text quotes (button and menu labels and the like) stay as the screen shows them, in quotation marks, with their English meaning beside them where a reader needs it; identifiers, commands, file names and links stay as they are.
- Do not write a skill, change a permission, a setting of GitHub or the server, or any file outside the change (task *Out of scope*).

## Foundation entries and the return step

*Settlements to record* is `none`, so the only entry you expect to write is the part-map line. Write no decision, invariant, glossary term or environment fact unless `foundation_step.md` makes you; if it does, say why in the report. Run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after the entry as the foundation step gives, and the focused check `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py` (one test file, not the full gate; the full gate is the orchestrator's and you never run it).

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

Your directory for working copies is `.runs/author/`.

## Commits and report

Commit on the task branch with explicit `git add <path> <path>` (never `git add -A`, `git add .` or `git commit -a`); messages in English in the style of the repository's log (`git log -10 --format=%s`), naming the decisions they concern in parentheses where one applies. Return the status, your commits, a one-line check result naming what failed or did not run, and the report's path. The report holds every check with its command and exit code, your own-work check, **Unread material** and **Searches not found or unclear** (each `none` where it is none), and the meaning of any entry you wrote as `foundation_step.md` gives.
