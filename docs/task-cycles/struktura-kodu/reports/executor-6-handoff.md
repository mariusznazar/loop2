# Handoff — executor of slice 6

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; no answer of the orchestrator is that person's approval. You never ask the human: a question goes back to the orchestrator in your report.

## Where

- Worktree (your working directory): `<worktree root>`, branch `task/struktura-kodu`. Slice 6's base is `d7493a85`; you are the only agent writing in the worktree now. Dependencies are installed (`npm ci` done).
- Process pin: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read it whole; a file it names beside it only when its step comes. Your variant: "a slice, or the retry of a slice". You have no skill tool.
- Stage and boundary: make slice 6 below and nothing else; commit it; return before any review. The other slices are other agents' work.
- Frozen task: `.runs/task-cycles/struktura-kodu/task-frozen.md`. Plan: `.runs/task-cycles/struktura-kodu/plan.md` (your slice's section is copied below; the other parts only if you need them, selectively).
- Answers of the cycle's step 4: no trust boundary, no irreversible operation, no open design choice, no reserved choice. Slice *Risk*: none. Class of your model: `cheaper`.
- Directory for working copies: `.runs/executor-6/`. Report: `.runs/task-cycles/struktura-kodu/reports/executor-6-report.md`.
- Commit rules: explicit paths (`git add <file>…`), never `-A`, `.` or `-a`; messages in English in the repository's style (`type: :emoji: text`, e.g. `refactor: :recycle: …`); check `git log -1 --format='%h %ae'` after your commit shows the private address. No agent runs the full gate (`npm test` without an argument): focused checks only, `npm test -- <one test file>`.

## The foundation as the cycle has written it

- **D-425** (`foundations/decisions.md`, heading `### D-425`) is the rule of size of a function and a file your slice brings code under; **invariant `function-and-file-size`** is marked violated; its test is `tests/quality/test_function_and_file_size.py` and the rule's own run is `node tests/quality/eslint-size-rules.mjs` (from the repository root; no argument; prints each function and file over a threshold with its place and size, exit 0). Measure with that run, not with another counter.
- The ranges of decisions in the plan's *Read* list come from the base `a3d913da`; `foundations/decisions.md` grew by 34 lines before `## Testing discipline` (about line 822), so every range after it moved: find each decision by its `### D-NNN` heading. `foundations/invariants.md` grew only at its end; `guidelines/coding.md` gained the rule `### Size of a function and a file` after `### Logging scope` (read it whole: it holds the rule that a change adding to an over-threshold function begins with a move without change of behaviour).
- Out of scope for every slice: `src/browser/view/game-view.ts`, `src/browser/view/app.ts`, `src/browser/view/programs-entry.ts`, `src/browser/kitchen-sink/kitchen-sink.tsx`, stylesheets, `src/browser/view/trip-plan.tsx`; no exception and no change to the rule's configuration. What the player sees does not change.

## Your slice (copied word for word from `plan.md`)

### Slice 6 — the function of a transport test divided under the threshold

- **Goal:** the case „refused state-changing requests change no account or session and do no
  password work” of `tests/transport.test.mjs`, whose function begins near line 537 and holds about
  238 lines of code (the task's line 517 has moved), is divided so that no function of the file is
  over 200 lines of code (To do 4): for example the preparation of the accounts, links and routes,
  the table of refused variants and the controls with every guard satisfied moved into functions of
  the file. The case keeps its name, which `guidelines/testing.md` cites in its *Trust boundaries*,
  its line `invariant: account-mutation-request-guards` and its decision line, and every route,
  variant, assertion and message as they stand: nothing it proves is weakened, dropped or skipped
  (`guidelines/testing.md`, rule Changing an existing test). The changed case is seen failing once
  against a guard of the account server broken for a moment — for example the check of the Origin
  for one route — and that file is restored byte for byte; the report names the break, the command
  and the failure. No file under `src/` changes in the slice's commits.
- **Change:** `tests/transport.test.mjs`
- **Read:** `.runs/task-cycles/struktura-kodu/task-frozen.md:24-31` To do ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:63-82` Context · Foundation entries row 1 ·
  Foundation entries row 2 · `foundations/decisions.md:826-840` D-73 ·
  `foundations/decisions.md:901-915` D-78 · `foundations/decisions.md:946-960` D-82 ·
  `foundations/decisions.md:976-990` D-84 · `foundations/invariants.md:738-747`
  account-mutation-request-guards · `foundations/invariants.md:408-417` eslint-source-rules ·
  `foundations/invariants.md:438-447` prettier-source-format · `guidelines/coding.md` ·
  `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/transport.test.mjs` — fails with the guard broken, naming the route
  and the variant, and passes once it is restored · `node tests/quality/eslint-size-rules.mjs` — no
  report of a function in `tests/transport.test.mjs` · `node node_modules/eslint/bin/eslint.js
  --max-warnings 0 tests/transport.test.mjs` · `node node_modules/prettier/bin/prettier.cjs --check
  --no-config --no-editorconfig --ignore-path .gitignore tests/transport.test.mjs` ·
  `git diff --stat a3d913dac87160f56b194ce863c60145a551765a -- src` — empty
- **Depends on:** Slice 1

## What you read

The passages and files the slice's *Read* names, by the ranges above (found again by heading where moved); the guideline files whole as the *Read* names them; selectively anything else you need, and name each reach in your report. Read **every** item of the *Read* list that you can use; where you leave one unread, say which in **Unread material**.

## The manual check in a real browser (where the slice's *Checks* name it)

Run it by `.claude/skills/loop2-play/SKILL.md` (read that skill whole first): Playwright CLI, and Playwright MCP only where the CLI fails and only from your own session in this worktree (D-420). Show the result in words; keep no screenshot in the repository or the record (nothing the player sees changes). A check you could not run is reported as unchecked with the reason, never as passed.

## What you return

As your method gives it: status; your commits; a one-line check result naming what failed or did not run; the report at the path above with each check's command and exit code, your own-work check (the requirement most likely missed), how you divided the function and where the verdict's cut did not suffice, **Unread material** (what this handoff or the slice's *Read* names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), your reaches beyond the handoff, and the working copies' line.

Working copies (word for word from the cycle): An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.
