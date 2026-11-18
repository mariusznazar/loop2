# Handoff — executor of slice 1

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; no answer of the orchestrator is that person's approval. You never ask the human: a question goes back to the orchestrator in your report.

## Where

- Worktree (your working directory): `<worktree root>`, branch `task/struktura-kodu`. Slice 1's base is `e1e6b127ce3bf72e0f74f23f4ac4c69d4a032e31` (the commit that wrote the foundation entries); you are the only agent writing in the worktree now. Dependencies are installed (`npm ci` done).
- Process pin: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read it whole; a file it names beside it only when its step comes. Your variant: "a slice, or the retry of a slice". You have no skill tool.
- Stage and boundary: make slice 1 below and nothing else; commit it; return before any review. Slices 2–6 are other agents' work and wait for this one.
- Frozen task: `.runs/task-cycles/struktura-kodu/task-frozen.md`. Plan: `.runs/task-cycles/struktura-kodu/plan.md` (your slice's section is copied below; the other parts only if you need them, selectively).
- Answers of the cycle's step 4: no trust boundary, no irreversible operation, no open design choice, no reserved choice. Slice *Risk*: none.
- Directory for working copies: `.runs/executor-1/`. Report: `.runs/task-cycles/struktura-kodu/reports/executor-1-report.md`.
- Commit rules: explicit paths (`git add <file>…`), never `-A`, `.` or `-a`; messages in English in the repository's style (`type: :emoji: text`); check `git log -1 --format='%h %ae'` after your commit shows the private address. No agent runs the full gate (`npm test` without an argument): focused checks only, `npm test -- <one test file>`.

## The foundation as the cycle has written it (use these identifiers)

- **D-425** — the rule of size of a function and a file (the thresholds, the scope, the two exceptions, the separate ESLint run); `foundations/decisions.md`, search for `### D-425`. Read it whole before you write the configuration; its numbers and exceptions are yours to take from it, not from this handoff.
- **Invariant `function-and-file-size`** (`foundations/invariants.md`, *Violated* `yes`): your main test case cites it with the line `# invariant: function-and-file-size`.
- **D-426** — the gate keeps no tool for unused code; for your guideline text it is not needed.
- The ranges of decisions in the plan's *Read* list come from the base; `foundations/decisions.md` grew by 34 lines at the section end before `## Testing discipline` (about line 822), so every range after it moved: find each decision by its `### D-NNN` heading. `foundations/invariants.md` grew only at its end.
- The report of the agent that wrote the entries: `.runs/task-cycles/struktura-kodu/reports/foundation-entries-report.md` (its Choices explain why D-425's *Relations* reads `derives from D-28` and the standing beside D-29 is in its binding sentences and *Verification*).

## Binding choices of the cycle

- Q1: the set that keeps the invariant violated is, today, `startApp` (`src/browser/view/app.ts`), `createProgramsEntry` with its method `build` (`src/browser/view/programs-entry.ts`) and the file `src/browser/kitchen-sink/kitchen-sink.tsx`, once Slices 2–6 split the other five. `createGameView` is no longer above the limit and must not be named as a violator. No exception is written for any of them and none is split.
- Q3: that set is named in a comment at the marking of the expected failure in the test and in your report — not in the invariant's entry.
- Q4: the rule reaches every file the linter of D-29 lints (application, scripts, tests, the scripts of deployment, the three agent-workflow directories D-29 names, the two root configuration files); the file rule the same files outside `tests/`.
- Choices of the plan (`plan.md`, *Choices*) bind: configuration in `tests/quality/` under a name ESLint does not look up; files and ignores taken from `eslint.config.mjs`; the main case an expected failure plus an unmarked control case on made-up files; the two exceptions as in the plan.
- The plan leaves to you, in code: whether ESLint 10.12's API can limit a run on `eslint.config.mjs` to two rules, and whether it applies a bulk-suppressions file by default (D-29 has the linter run with an empty one of its own). Settle both from the code and the documentation and say how in your report.
- The product's rule that a new test is seen failing before it is seen passing: your main case is seen failing before you mark it as an expected failure; your control case is seen failing against a configuration broken for a moment (restore it, and say so).

## Your slice (copied word for word from `plan.md`)

### Slice 1 — the test of the rule of size, its configuration and the rule in the guidelines

- **Goal:** the rule of size has its test in the product's suite and its rule in the coding
  guidelines (To do 1, 2, 3, 5 and 6). `tests/quality/eslint-size-rules.mjs` runs the product's own
  ESLint apart from the run on `eslint.config.mjs`, applying only the built-in rules
  `max-lines-per-function` and `max-lines`, with blank lines and comments skipped and the lines of
  nested functions counted in the function that holds them, at the thresholds of the decision of
  *Foundation entries* row 1: the function rule on every file the run of `eslint.config.mjs` lints,
  the file rule on the same files except those under `tests/`. It takes those files and ignores
  from `eslint.config.mjs` instead of keeping a list of patterns of its own, lets no
  bulk-suppressions file hide a report (as D-29 gives for the linter's run), and its configuration
  lists the decision's two exceptions and no other: the file rule off for
  `src/browser/sim/saved-game.ts`, and of the function rule only the report of `accountRoutes` in
  `src/server/account-routes.ts` dropped, not those of the other functions of that file. Run from
  the repository root with no argument, it prints every function and every file over a threshold
  with its file, line and size, and decides nothing else, as `tests/quality/eslint-rule-sets.mjs`
  only asks the tool. Its name is none that ESLint looks up as a configuration (`eslint.config.*`),
  so the linter's run and `tests/quality/test_source_tool_scope.py` stay as they are.
  `tests/quality/test_function_and_file_size.py` holds two cases: the case that cites the invariant
  of *Foundation entries* row 2 (`# invariant: <identifier>`) and fails naming every function and
  file over a threshold with its place and size; and a control case, not marked, that runs the same
  configuration on made-up files in a temporary directory — a function and a file one line over
  their thresholds reported, a test file over the file threshold not reported, `accountRoutes` over
  the threshold at the exception's place not reported while another function of that file is — so
  that a run that reports nothing because it is broken cannot pass as the expected failure. The
  first case is seen failing before it is marked, then marked as an expected failure
  (`unittest.expectedFailure`, WAY-51), with a comment at the marking naming the code that keeps it
  failing once this change is finished: today `startApp` (`src/browser/view/app.ts`),
  `createProgramsEntry` and its method `build` (`src/browser/view/programs-entry.ts`) and the file
  `src/browser/kitchen-sink/kitchen-sink.tsx` (cycle choice Q1). Where the first failing run shows,
  beside the four views and the test function Slices 2–6 split, a set other than that one, the
  comment names the set found and the report says so. `guidelines/coding.md` gains the rule
  `### Size of a function and a file` right after `### Logging scope`, in the form of the pinned
  coding template: *Decision* the decision of row 1, *Invariant* that of row 2, *Good* and *Bad*
  written or `none`, and a text that says the thresholds and the exceptions stand in that decision,
  repeats none of them and gives no command that counts sizes; its *Where in code* gains both new
  files. No file outside `tests/quality/` is added, so the part map does not change (To do 6).
- **Change:** `tests/quality/eslint-size-rules.mjs` · `tests/quality/test_function_and_file_size.py`
  · `guidelines/coding.md`
- **Read:** `.runs/task-cycles/struktura-kodu/task-frozen.md:24-31` To do ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:33-61` Questions to settle ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:63-82` Context ·
  `.runs/task-cycles/struktura-kodu/task-frozen.md:92-111` Decisions in play, Settlements to record,
  Out of scope · `.runs/task-cycles/struktura-kodu/cycle.md:53-53` Questions and autonomous choices,
  row Q1 · Foundation entries row 1 · Foundation entries row 2 · `foundations/decisions.md:431-445`
  D-28 · `foundations/decisions.md:446-460` D-29 · `foundations/decisions.md:491-505` D-32 ·
  `foundations/decisions.md:826-840` D-73 · `foundations/decisions.md:886-900` D-77 ·
  `foundations/decisions.md:946-960` D-82 · `foundations/decisions.md:961-975` D-83 ·
  `foundations/invariants.md:408-417` eslint-source-rules · `foundations/invariants.md:418-427`
  ruff-source-rules · `foundations/invariants.md:438-447` prettier-source-format ·
  `foundations/invariants.md:1228-1237` cross-part-imports · `guidelines/testing.md` ·
  `.the-way/product-guidelines/coding/template.md:60-78` Required form ·
  `.the-way/product-guidelines/coding/template.md:232-255` What each section carries, Size of a
  function and a file · `.the-way/elements/invariants/template.md:44-72` Method and test ·
  `.the-way/elements/invariants/template.md:157-165` Violated ·
  `tests/quality/test_quality_invariants.py` · `tests/quality/eslint-rule-sets.mjs` ·
  `tests/quality/test_source_tool_scope.py` · `eslint.config.mjs`
- **Model:** same — the slice joins a rule of the foundation, a quality test of build-tools and a
  rule of agent-workflow's guidelines, and its expected-failure marking needs a control so that it
  cannot hide a broken run.
- **Risk:** none
- **Checks:** `npm test -- tests/quality/test_function_and_file_size.py` before the marking: fails,
  its message naming each function and file over a threshold with its size — the four views,
  `tests/transport.test.mjs` near line 537 and the set of Q1; after the marking: passes, with one
  expected failure and the control case passed; the control case seen failing once against the
  configuration broken for a moment (for example every report of `account-routes.ts` dropped) and
  then restored, each run in the report · `node tests/quality/eslint-size-rules.mjs` ·
  `npm test -- tests/quality/test_source_tool_scope.py` ·
  `npm test -- tests/quality/test_quality_invariants.py` (ESLint, Prettier and Ruff reach the new
  files; it also runs the dependency audit, which needs the network) ·
  `python -B .the-way/elements/common/foundation_check.py` — 0 errors, row 2's invariant cited
- **Depends on:** Foundation entries row 1 · Foundation entries row 2

## What you read

The passages and files the slice's *Read* names, by the ranges above (found again by heading where moved); the guideline files whole as the *Read* names them (`guidelines/coding.md`, `guidelines/testing.md`); selectively anything else you need, and name each reach in your report.

## What you return

As your method gives it: status; your commits; a one-line check result naming what failed or did not run; the report at the path above with each check's command and exit code, your own-work check (the requirement most likely missed), the first failing run of the main case with the set of functions and files it named (and the set the marking's comment names, with a note if they differ from Q1's), **Unread material** (what this handoff or the slice's *Read* names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), your reaches beyond the handoff, and the working copies' line.

Working copies (word for word from the cycle): An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.
