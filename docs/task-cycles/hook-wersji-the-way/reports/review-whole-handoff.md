# Handoff — review of the whole change (task `hook-wersji-the-way`)

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator. Nobody
is available for questions during your review: questions go to the orchestrator in your report
(first line `questions`). Your first line is `PASS <sha>` or `FAIL <sha>` with the head you reviewed.

## Where you work

- Worktree (your working directory; start every command from its root): `the task's worktree (the repository root)`, branch `task/hook-wersji-the-way`. You are read-only: you change no tracked file and make no commit.
- Your directory for working copies: `.runs/review-whole/` (directly under the ignored `.runs/` of the worktree).
- Report path: `.runs/task-cycles/hook-wersji-the-way/reports/review-whole-report.md`.

## Method and what is reviewed

Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`). Read it whole; read a file it names
(`whole_change.md` among them) only when the step that names it comes. Your variant: **the review of
the whole change**, which you alone select your own foundation and guidelines for, by the method it
gives.

- Range: base `3b48f89f8a3f7a3f306e7a72a68d7e0dff3942fa` to head `6c528d80` (one commit by the one author; the author's report `.runs/task-cycles/hook-wersji-the-way/reports/author-report.md`, status `done`). The author's route: one author without a plan, no spec (no open design choice).
- Frozen task, read whole: `.runs/task-cycles/hook-wersji-the-way/task.md` (its body line `Status: ready for cycle` is authoritative; the frontmatter `status: draft` is the note's own and stale). Settlement row 1 of *Settlements to record* is the foundation entry the change owes (it is written as D-414 with the fact `claude-code-session-start-hook-output`); check it item by item against the *To do* list and *Questions to settle*: coverage of every item, source fidelity (the entry's sentence must say what the row says, no more and no less), and anything the author added that the task does not ask for.
- The author's choices are in its report under *Choices*; the orchestrator's autonomous choices already given to the author: language Node (`.mjs`), stored as question Q1 of the cycle (reasons: `engines.node`, the same command on three systems, a precedent in `.claude/skills/loop2-play/*.mjs`).

## Answers of the two questions at start

- Trust boundary: no (the part map names only `.github/workflows/tests.yml` for agent-workflow). Note for your review, not a named boundary: a hook in `.claude/settings.json` runs on a reader's machine whenever the repository is opened in Claude Code, so check that the script runs nothing but read-only `git` commands on fixed arguments, passes no value read from the repository into a shell, and cannot be made to run other code by a crafted `.gitmodules`, a crafted gitlink or a crafted `.the-way` directory (a `.the-way` that is a symlink or holds its own `.git` file is an input worth a thought).
- Irreversible operation: no.

## Things to check beyond the method's list (selection of the orchestrator; your own selection by the method comes first)

- The three systems: the command line of the hook in `.claude/settings.json` (exec form with `args` and `${CLAUDE_PROJECT_DIR}`), the script's own paths, line endings and the tests' use of temporary directories on Windows and on Linux (the test runs on Linux in CI: `.github/workflows/tests.yml`). Look for anything that works on Windows only.
- Silence on agreement; the content of the warning (both commit values and the repair command from `AGENTS.md`), reach to agent and to human, no blocking (exit code 0 on every path).
- The author's finding that a session started in a subdirectory does not run the hook (Claude Code reads the root `.claude/settings.json` only for a session started in the root): judge whether D-414's *Rationale* and the `AGENTS.md` sentence state that honestly and whether the task's *To do* 1 and 3 are still met as the task intends.
- Prior-art and part-map fit: that the new directory `.claude/hooks/` and the test file belong to agent-workflow by the part map, that no quality check silently skips the new JavaScript file (the author found D-29's scope does not name agent-workflow; judge whether that leaves the change compliant and whether a hole worth a finding exists — as a finding of its grade, not as a fix).
- D-362 (no absolute path of this disk in a tracked file) and D-252 (what a command prints is no log line) in the new files; the tracked-file private-path invariant.
- The environment fact the author added although the handoff named none (`claude-code-session-start-hook-output`): judge its source and wording by the environment-facts element, as an entry the human has not yet accepted.

## Gaps the orchestrator carries (from the author's *Unread material*)

The author did not open the invariants of the part nor the glossary entries, and read D-252 and D-351 in part. You select by the method and read your own selection; the invariants and glossary of the touched part `agent-workflow` are in your reading, not the author's.

## Models and boundary

You run as a the-way-stage agent on the strongest class. Do not run the full gate (the orchestrator runs it): run the focused checks you need (`python -B scripts/test.py <one test file>`, linters directly). You may run the hook against a fixture repository you build under `.runs/review-whole/` (never in the system's temporary directory). Return at your boundary: first line, graded findings with `file:line` anchors and the slice they come from (none: one author), the checks you ran with command and exit code, and the counts the method asks for.

## Report

Write the full report to the report path. It holds, besides what the method gives: **Unread material** (what this handoff names, or for you your own selection, that stayed unread or was read in part, or `none`), **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), and your working copies (where each stood and that it was removed, or the remainder).

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed.
