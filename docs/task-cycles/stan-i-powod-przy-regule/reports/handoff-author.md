# Handoff — the one author of the task „Stan i powód przy regule w ręcznym przejściu”

## Delegation

The human who requested this cycle (Mariusz) has delegated every intermediate choice to the
orchestrator and will review only the finished pull request. You do not ask the human anything and
you never present an answer as the human's approval. Write all code, comments and commit messages
in English; the strings the game shows stay Polish, exactly as the task gives them.

## Your stage

You are the one author of the whole change, without a plan: the code, its tests, the foundation
entries the task carries (the foundation step) and the own-work check — and you return before the
review. Your variant of the method is **the whole change as the one author**. The return step comes
later, as a resumption of you, with its own handoff.

- Worktree (work only here): `C:\Storage\repos\loop2-wt\stan-i-powod-przy-regule`, branch
  `task/stan-i-powod-przy-regule`, base `18fca47bc1b099ff8a5fbe9d688fabf201b7759f`.
- Process pin: `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048` in that worktree. Work from
  the worktree root. Use the project skills with the `the-way-` prefix, never an unprefixed one.
- Method of your stage: read `.the-way/task-cycle/change/SKILL.md` whole and follow it; read a file
  it names when the step or variant that names it comes.
- Foundation step: read `.the-way/task-cycle/skill/foundation_step.md` whole when you reach the
  foundation entries; write each entry only through the project skills
  `the-way-record-decision`, `the-way-record-invariant`, `the-way-record-glossary-term`,
  `the-way-update-part-map`, `the-way-record-environment-fact`, and the styleguide only through
  `the-way-maintain-styleguide`. The skill of an element is read whole when you write an entry of it.
- The product's gate (`npm test` in full, and `python -B .the-way/elements/common/foundation_check.py`)
  is the orchestrator's run (WAY-160). You run focused checks of your own and report each with its
  command and exit code.
- `npm ci` and the quality virtual environment (`.runs/quality-venv`) are installed in the worktree.

## What to read

The frozen task, whole: `C:\Storage\repos\loop2-wt\stan-i-powod-przy-regule\docs\task-cycles\stan-i-powod-przy-regule\task.md`
(a copy of `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\stan_i_powod_przy_regule_loop2.md`).
Read in the vault, if you need them, the plan `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\plan_mvp2_loop2.md`
(*Projected entries*, *Open questions*, the change log lines of 2026-11-03 about this task) and the
definition `definicja_mvp2_loop2.md` beside it (the entry „What state does a program rule show during
a map run?” and *Projected foundation changes*). The task's own *Decisions in play* quotes what you
need of them.

Foundation entries of the product (`foundations/`), each read whole:

- Decisions: D-23, D-39, D-40, D-41, D-42, D-43, D-45, D-48, D-62, D-92, D-93, D-126, D-127, D-132,
  D-140, D-141, D-151, D-171, D-173, D-174, D-279, D-288, D-289, D-290, D-300, D-302, D-305, D-306,
  and the decisions their *Relations* and *Based on* lead you to as far as the work needs them.
  Do a search of the decision log by the *Scope* lines `simulation` and `browser-view` for what
  these miss.
- Invariants: `program-rule-pick`, `program-closed-lists`, `browser-view-token-values`,
  `design-token-contrast`, `design-token-sources`, `application-build-kitchen-sink`, and every
  invariant whose test your change alters.
- The part map and the glossary (both short) whole.

Guidelines of the product, each whole:

- `guidelines/coding.md` (read its kind index), `guidelines/coding-browser-module.md` (new or changed
  files of `src/browser/view/`), `guidelines/coding-simulation-module.md` (changed files of
  `src/browser/sim/` other than data and `saved-game.ts`), `guidelines/styleguide-browser-view.md`
  (every change of a file of the part `browser-view`), `guidelines/testing.md` (writing and changing
  tests), and `src/browser/AGENTS.md`.
- Where your change reaches a part or kind these do not cover (a file of `src/browser/sim/data/`,
  of `src/browser/kitchen-sink/`, a script), read that part's guidelines yourself and name the reach
  in your report.

## Answers of the two questions at start

- Touches a trust boundary: **no**.
- Holds an operation that cannot be undone: **no**.
- Open design choice at start: **none** — see below how to treat what you may meet. Route: one
  author without a plan.

## Facts the orchestrator found, to take into account

1. The task cites code at commit 20d804b (for example the old row at
   `src/browser/view/program-editor.ts:867-925`). Task 5 `edytor-programu` (PR #56) has since
   replaced the program editor with the rule panel and the new rule list; your base is the merged
   code. Find the row of a rule and of a rule group in the code of your base and put the signs there.
   Where the new editor and the task disagree in a way that changes what the task asks (a
   background, a bar, a layout, a counter), name it in your report; do not widen the task.
2. D-305 forbids „⊘”, „N reguł nie zadziała” and an amber „0×” at a rule; the task's backgrounds, bars
   and reasons do not break it.
3. The task's *To do* 9 and 10 say what the styleguide and the foundation receive. Names and text
   that the task does not give (the name of the dark-bar role, the exact test names) you choose by
   the product's rules (D-48 for token names) and name in the report.
4. The base's tests were being run by the orchestrator while this handoff was written; the checks
   already failing on the base, if any, are listed in the message that dispatched you.

## Boundaries

- Open design choice: if you meet a design choice that the task, the foundation and the guidelines
  leave open and that is not a choice of how to make what they settle, return `returned` with the
  report and no code (the choice, where it shows, the ways open, what you found). A choice of how to
  make what is settled is yours: make it and name it in the report.
- If the change proves too large for one agent, return `returned` with where the size lies.
- A reserved choice (language, framework, library, data store, login, place to run) is not yours to
  settle: return `reserved`.
- A missing fact or permission: `blocked`.
- Do not change the shape of the saved game or its version (the task says so). Do not touch
  `.the-way`. Do not run the product's gate. Do not merge, push or open a request.
- Commits: English messages in the repository's style (`type: :emoji: message`, see `git log`); add
  files by path (`git add <path> …`), never `git add -A`, `git add .` or `git commit -a`. Commit
  your work in the worktree on the task branch; leave the worktree clean.

## Report

Write your full report to
`C:\Storage\repos\loop2-wt\stan-i-powod-przy-regule\docs\task-cycles\stan-i-powod-przy-regule\reports\report-author.md`
as your method gives it, and return only: your status, your commits, a one-line check result naming
what failed or did not run, and the report's path. In the report: each check with its command and
exit code; the reaches beyond this handoff; the state check and screenshot evidence for the user
interface states the change draws (the task's states: winning, running, the three bars, the reasons,
the open row, the row under the pointer, after-the-end screen), by the settled route of the
product's guidelines — if there is none or it fails, say so; the places where the base differs from
the task's references; the choices you made; and **Searches not found or unclear** (each thing
looked for and not found or unclear, or `none`).
