# Handoff — executor of slice 5

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; no answer of the orchestrator is that person's approval. You never ask the human: a question goes back to the orchestrator in your report.

## Where

- Worktree (your working directory): `<worktree root>`, branch `task/struktura-kodu`. Slice 5's base is `e0cd12e5`; you are the only agent writing in the worktree now. Dependencies are installed (`npm ci` done).
- Process pin: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read it whole; a file it names beside it only when its step comes. Your variant: "a slice, or the retry of a slice". You have no skill tool.
- Stage and boundary: make slice 5 below and nothing else; commit it; return before any review. The other slices are other agents' work.
- Frozen task: `.runs/task-cycles/struktura-kodu/task-frozen.md`. Plan: `.runs/task-cycles/struktura-kodu/plan.md` (your slice's section is copied below; the other parts only if you need them, selectively).
- Answers of the cycle's step 4: no trust boundary, no irreversible operation, no open design choice, no reserved choice. Slice *Risk*: none. Class of your model: `cheaper`.
- Directory for working copies: `.runs/executor-5/`. Report: `.runs/task-cycles/struktura-kodu/reports/executor-5-report.md`.
- Commit rules: explicit paths (`git add <file>…`), never `-A`, `.` or `-a`; messages in English in the repository's style (`type: :emoji: text`, e.g. `refactor: :recycle: …`); check `git log -1 --format='%h %ae'` after your commit shows the private address. No agent runs the full gate (`npm test` without an argument): focused checks only, `npm test -- <one test file>`.

## The foundation as the cycle has written it

- **D-425** (`foundations/decisions.md`, heading `### D-425`) is the rule of size of a function and a file your slice brings code under; **invariant `function-and-file-size`** is marked violated; its test is `tests/quality/test_function_and_file_size.py` and the rule's own run is `node tests/quality/eslint-size-rules.mjs` (from the repository root; no argument; prints each function and file over a threshold with its place and size, exit 0). Measure with that run, not with another counter.
- The ranges of decisions in the plan's *Read* list come from the base `a3d913da`; `foundations/decisions.md` grew by 34 lines before `## Testing discipline` (about line 822), so every range after it moved: find each decision by its `### D-NNN` heading. `foundations/invariants.md` grew only at its end; `guidelines/coding.md` gained the rule `### Size of a function and a file` after `### Logging scope` (read it whole: it holds the rule that a change adding to an over-threshold function begins with a move without change of behaviour).
- Out of scope for every slice: `src/browser/view/game-view.ts`, `src/browser/view/app.ts`, `src/browser/view/programs-entry.ts`, `src/browser/kitchen-sink/kitchen-sink.tsx`, stylesheets, `src/browser/view/trip-plan.tsx`; no exception and no change to the rule's configuration. What the player sees does not change.

## Your slice (copied word for word from `plan.md`)

### Slice 5 — ProgramPanelView divided under the threshold of a function

- **Goal:** `ProgramPanelView` in `src/browser/view/program-panel.tsx` (about 293 lines of code
  from line 397) is divided so that no function of that file and no new function is over 200 lines
  of code, with no change of what the player sees and of what the module exports (To do 4). Start
  from the verdict of the task's *Context* as a hypothesis to check in the code: the header of the
  map run's copy with its name field — today the value `runHead` built in the component — a
  component of its own in the same file, taking what it shows and the handlers it calls as props.
  Hooks stay at the top level of a component or of a custom Hook, and an effect keeps every value it
  reads among its dependencies (D-267). `program-panel.tsx` stays at or under 800 lines of code. No
  style, token or test changes. Where the verdict's cut does not bring every part under the
  threshold, the agent cuts further inside this file and says how in its report.
- **Change:** `src/browser/view/program-panel.tsx`
- **Read:** `.runs/task-cycles/struktura-kodu/task-frozen.md:24-31` To do ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:63-82` Context ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:92-95` Decisions in play ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:107-111` Out of scope · Foundation entries row 1 ·
  Foundation entries row 2 · `foundations/decisions.md:551-565` D-36 ·
  `foundations/decisions.md:4234-4262` D-267 · `foundations/decisions.md:1021-1035` D-88 ·
  `foundations/invariants.md:35-44` browser-view-framework · `foundations/invariants.md:236-247`
  content-identifiers · `foundations/invariants.md:458-467` browser-view-token-values ·
  `foundations/invariants.md:468-477` browser-view-focus-outline ·
  `foundations/invariants.md:408-417` eslint-source-rules · `foundations/invariants.md:438-447`
  prettier-source-format · `foundations/invariants.md:1228-1237` cross-part-imports ·
  `foundations/invariants.md:1208-1217` rule-state-from-pick · `foundations/invariants.md:828-837`
  streak-program-change · `foundations/invariants.md:838-847` saved-program-edit ·
  `foundations/invariants.md:848-857` copy-save · `foundations/glossary.md:25-30` program ·
  `foundations/glossary.md:180-184` copy · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `node tests/quality/eslint-size-rules.mjs` — no report in `program-panel.tsx` ·
  `npm run typecheck` · `node node_modules/eslint/bin/eslint.js --max-warnings 0
  src/browser/view/program-panel.tsx` · `node node_modules/prettier/bin/prettier.cjs --check
  --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/program-panel.tsx` ·
  `npm test -- tests/view/program-panel.test.mjs` · `npm test -- tests/view/rule-signs.test.mjs` ·
  `npm test -- tests/view/run-screen.test.mjs` · `npm test -- tests/view/end-question.test.mjs` ·
  `npm test -- tests/view/previous-save.test.mjs` · the manual check of D-88 in a real browser by
  `.claude/skills/loop2-play/SKILL.md`: on the screen of a map run, the copy renamed, saved in the
  program and as a new program, its unsaved changes shown, the question „Zapisać, odrzucić, wrócić?”
  and the switch of the character to another program; on the screen Programy, a program renamed
  and deleted, each with the keyboard's focus as before the change; described in the report, no
  screenshot kept
- **Depends on:** Slice 1

## What you read

The passages and files the slice's *Read* names, by the ranges above (found again by heading where moved); the guideline files whole as the *Read* names them; selectively anything else you need, and name each reach in your report. Read **every** item of the *Read* list that you can use; where you leave one unread, say which in **Unread material**.

## The manual check in a real browser (where the slice's *Checks* name it)

Run it by `.claude/skills/loop2-play/SKILL.md` (read that skill whole first): Playwright CLI, and Playwright MCP only where the CLI fails and only from your own session in this worktree (D-420). Show the result in words; keep no screenshot in the repository or the record (nothing the player sees changes). A check you could not run is reported as unchecked with the reason, never as passed.

## What you return

As your method gives it: status; your commits; a one-line check result naming what failed or did not run; the report at the path above with each check's command and exit code, your own-work check (the requirement most likely missed), how you divided the function and where the verdict's cut did not suffice, **Unread material** (what this handoff or the slice's *Read* names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), your reaches beyond the handoff, and the working copies' line.

Working copies (word for word from the cycle): An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.
