# Handoff — the one author of the change (task `hook-wersji-the-way`)

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator. Nobody
is available for questions during your work: questions go to the orchestrator in your report
(status `questions`), who answers from the task, its sources and the foundation. No answer of the
orchestrator is the human's approval.

## Where you work

- Worktree (your working directory; start every command from its root): `the task's worktree (the repository root)`, branch `task/hook-wersji-the-way`, base commit `3b48f89f8a3f7a3f306e7a72a68d7e0dff3942fa` (`origin/main`). Work only there; never in the main checkout `the main checkout of the repository`.
- Your directory for working copies: `.runs/author/` (directly under the ignored `.runs/` of the worktree).
- Report path: `.runs/task-cycles/hook-wersji-the-way/reports/author-report.md`.
- Dependencies are installed in the worktree (`node_modules`, the quality venv `.runs/quality-venv`) — if `node_modules` is still missing when you start, wait: `.runs/npm-ci.log` ends with `venv exit 0` when the installation is done; do not install anything yourself.

## Method and variant

Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`). Read it whole; read a file it names
only when the step or variant that names it comes. Your variant, in the words of its row: **"the
whole change as the one author"**. You are the one author of a change without a plan and without a
spec (no open design choice was found), and you do the foundation step with your code: read
`.the-way/task-cycle/skill/foundation_step.md` whole, and the `SKILL.md` of an element, at the path
it gives, when you write an entry of that element. Write foundation entries only through the
project skills' methods named in `AGENTS.md` (`the-way-record-decision` and the others: you have no
skill tool, so read each skill's file by path as `foundation_step.md` gives). Return before review;
the orchestrator keeps you for the fix and for the return step (`.the-way/task-cycle/skill/return_step.md`,
named again in its own handoff).

Where the cycle's commits are concerned: commit by explicit paths (`git add <path>…`, never `git add -A`, `.` or `commit -a`), messages in English in the form of the repository's existing commits (`type: :emoji: sentence`, see `git log`), no `--no-verify`. Do not push. Do not run the full gate (`npm test` with no argument, or `python scripts/test.py` with no argument): the orchestrator runs it. Focused checks are yours: `python -B scripts/test.py <one test file>` runs exactly one test file; the linters of the repository are run by the quality tests (`tests/quality/`), and you run the ones your change reaches.

## The task (frozen)

Read whole: `.runs/task-cycles/hook-wersji-the-way/task.md`. Its body line `Status: ready for cycle` is authoritative (the note's frontmatter `status: draft` is stale). Frozen from the note dated 2026-11-14. It is copied here, so the full text is the file's; the *To do* items are the required outcome:

1. `.claude/settings.json` with a `SessionStart` hook.
2. The hook compares the commit the submodule `.the-way` stands on with the commit the repository records for it (`git ls-files --stage -- .the-way`); on a mismatch or an uninitialized submodule it warns, giving both values and the repair command from `AGENTS.md` (`git submodule update --init -- .the-way`); when they agree it prints nothing.
3. The warning reaches the agent (the session's context) and the human (a short message on the screen).
4. The hook blocks nothing.
5. It works on Windows, Linux and macOS.
6. `AGENTS.md` gets one sentence outside the block `<!-- the-way:begin -->` … `<!-- the-way:end -->` (it says that Claude Code sessions get a warning at start when `.the-way` stands on another commit than the pinned one, and that the rule to stop work on a mismatch stays in force). Note: this repository's `AGENTS.md` may not hold those markers yet; read it and place the sentence where the task's intent holds (outside any block the-way's installer rewrites) — do not add the markers.

Acceptance criterion: the change is merged before 2026-11-28 (not yours to check).

Out of scope: Codex sessions; blocking anything.

Settlement row 1 of the task's *Settlements to record* is to be recorded as a decision in `foundations/decisions.md`, through the method of `the-way-record-decision`, together with what the foundation step gives for the code you write (part map: `.claude/**` and `tests/agent_workflow/**` already belong to `agent-workflow`; add a file to a line of the part map only if the foundation check or the part map's rules require it).

## Autonomous choices the orchestrator already made (use them; return `returned` only for a real open design choice)

- **Language:** Node, one `.mjs` file under `.claude/hooks/` (name of your choosing, descriptive, e.g. `the-way-pin-check.mjs`), started by the hook command as `node <path>`. Reasons: `package.json` `engines.node` is `^24.15.0`, so every machine that runs the repository's tests has Node; the command `node` is spelled the same on all three systems; `.claude/skills/loop2-play/*.mjs` is a precedent in agent-workflow, tested from `tests/agent_workflow/` by a Python test that runs `node` (`tests/agent_workflow/test_loop2_play_skill.py`). Rejected: Bash, PowerShell, Python (the command name differs between systems). Mind where the existing quality checks reach: `eslint.config.mjs` lists the directories it checks, D-29's scope does not name agent-workflow, `tests/quality/test_source_tool_scope.py` and `guidelines/coding.md` ("Linter") say what a new directory of code must do — read them and do what they require, in the same change; if the requirement is a change of D-29's scope or of the set of rules (which the foundation reserves to a human-accepted change), return `returned` or `questions` rather than make it.
- **Hook output form and the command line of the hook:** verify against the current Claude Code documentation (a `SessionStart` hook: the JSON a hook prints to stdout with `systemMessage` for the human and `hookSpecificOutput.additionalContext` for the agent, exit codes, how the project directory is reached — `$CLAUDE_PROJECT_DIR` — whether the command runs under Git Bash or PowerShell on Windows, and that a session started in a subdirectory still finds the repository root). Use a fetch/search tool or the `claude-code-guide` agent if your tools allow; record what you used and what it said in the report. Never put an absolute path of this disk in a tracked file (D-362). A session that does not start from the repository root, a `.the-way` that is empty (an uninitialized submodule in a worktree: `git -C .the-way rev-parse HEAD` then returns the repository's own commit, not an error — compare through the submodule's own root, e.g. `git -C .the-way rev-parse --show-toplevel` versus the repository root, or read the gitlink and the checkout in a way that cannot mistake the parent repository for the submodule), a missing `git`, a missing `.gitmodules` entry: each must end in a warning or in silence with exit code 0, never in a failing hook that disturbs the session. The hook never blocks.
- D-252 (logs): the hook's output is what a command prints to whoever ran it, not a log line; do not route it through the log machinery.

## Foundation and guidelines you read (by identifier, each whole)

Decisions of the task's *Decisions in play*: **D-252**, **D-362**. Decisions whose *Scope* names agent-workflow and that bear on code, tests and gate of this part: **D-28, D-30, D-31, D-73, D-77, D-78, D-81, D-82, D-83, D-84, D-85, D-351, D-412, D-413**, and D-29 (it does not name agent-workflow; read it for the question above). Select further entries as "Reading the foundation" in `.the-way/elements/common/way_of_working.md` gives, for the part `agent-workflow` (decisions by *Scope*, invariants whose *Part* names agent-workflow or `every`, the entries they link), and the glossary entries of the terms you use. You write the foundation entries as `foundation_step.md` gives. The part map entry `agent-workflow` is `foundations/part_map.md` lines 123–140.

Guidelines, each whole: `guidelines/coding.md` (no kind row of `guidelines/coding-*.md` matches this change), `guidelines/testing.md`. The change touches no user interface.

The two questions at start (`no` and `no`): the change touches no trust boundary that the part map names (the part map names only `.github/workflows/tests.yml` for agent-workflow) and holds no irreversible operation. Note for your own care and for the reviewers: a hook in `.claude/settings.json` is executed on a reader's machine when the repository is opened in Claude Code, so the script must run nothing but read-only `git` commands on fixed arguments and must pass no value read from the repository into a shell.

## Boundary

You write the code, its tests (a Python `unittest` test file under `tests/agent_workflow/`, as the existing ones there, calling the script with `node` in a temporary clone/worktree directory made under your `.runs/author/` — never in the system's temporary directory), the sentence in `AGENTS.md` and the foundation entries. You do not push, do not open a request, do not run the full gate, and do not begin the return step. Return at your boundary: status, commits, a one-line check result naming what failed or did not run, and the path of your report.

## Report

Write the full report to the report path. It holds: status; commits; each check you ran with its command and exit code; the own-work check that `make-change` requires; the weakest point of the change and the check of it; each reach beyond this handoff; **Unread material** (what this handoff names that stayed unread or was read in part, or `none`); **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`); and your working copies (where each stood and that it was removed, or the remainder).

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
