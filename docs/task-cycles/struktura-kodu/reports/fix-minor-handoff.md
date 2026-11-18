# Handoff — the fix of the Minor findings of the review of the whole change

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; no answer of the orchestrator is that person's approval. You never ask the human: a question goes back to the orchestrator in your report.

## Where

- Worktree (your working directory): `<worktree root>`, branch `task/struktura-kodu`. The reviewed head, and the base of your fix, is `11d266bc61b077aa25157d3d5b96f30a21636a88`; your range runs from it. You are the only agent writing in the worktree now. Dependencies are installed.
- Process pin: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole; your variant: "the fix of a review's findings". You have no skill tool.
- Your stage and boundary: fix the findings below, commit, return. A review of your fix follows; you run no full gate.
- Findings file: `.runs/task-cycles/struktura-kodu/reports/whole-review-findings.md` (read it whole; the reviewer's words; eight Minor findings within the task, no blocking finding; each names its place and its fix). The review's full report is `.runs/task-cycles/struktura-kodu/reports/review-whole-report.md` (read what you need: its sections of the slices and of the choices explain the context; the findings stand in the findings file).
- Frozen task: `.runs/task-cycles/struktura-kodu/task-frozen.md`; plan: `.runs/task-cycles/struktura-kodu/plan.md` (selectively).
- Directory for working copies: `.runs/fix-minor/`. Report: `.runs/task-cycles/struktura-kodu/reports/fix-minor-report.md` (its name starts with `fix`, so the harness ban on report-named files does not apply: write it with the Write tool).
- Commit rules: explicit paths (`git add <file>…`), never `-A`, `.` or `-a`; messages in English, repository style (`type: :emoji: text`); check `git log -1 --format='%h %ae'` shows the private address. No agent runs the full gate: focused checks only.

## What to fix, and how

Fix each of the eight findings as the reviewer proposes it, or in a better way that meets the finding; where you hold a finding wrong, say so with evidence in your report instead of fixing it (the reviewer's grade and scope are not yours to change).

- Findings 3, 4, 5, 6 change the text of the decisions D-425 and D-426 in `foundations/decisions.md`: make them by the method of the decision element, i.e. read `.the-way/elements/decisions/skill/SKILL.md` (and the files it names when its step comes) and follow it for a change to an existing entry — the *Rejected* and *Rationale* sentences stay in the form the decisions' template gives; change nothing else of the entries; D-425's meaning, numbers and exceptions stay. Run `python -B .the-way/elements/common/foundation_check.py` afterwards (expected: 0 errors).
- Finding 1 and finding 7 change guideline text: change only the sentence the finding names, in the language of that file (Polish). Finding 7 names `scene-memory.ts` in the styleguide rule of the scene of a map run, in the sentence's own style; nothing else of the styleguide changes.
- Finding 2 changes `tests/quality/eslint-size-rules.mjs` (`lintedPatterns`): throw on both forms the reviewer names. Then check it as the product's rule asks for a changed test: run `npm test -- tests/quality/test_function_and_file_size.py` (it must still pass with its one expected failure); show with a made-up `eslint.config.mjs` entry (in your directory for working copies, not in the repository, or in the control case's made-up tree if the control case can take it — add a control case only if that is small and clean) that each of the two forms now stops the run with an error, and say in your report how you saw it. If you add a case to the test, see it fail before it passes (against the script as it stands before your fix) and say so.
- Finding 8: move the comment onto the function `RunHead` in `src/browser/view/program-panel.tsx`; no code change. Run `node tests/quality/eslint-size-rules.mjs`, `npm run typecheck`, ESLint and Prettier on the changed source files, and `npm test -- tests/view/program-panel.test.mjs`.
- Run `npm test -- tests/quality/test_source_tool_scope.py` and `npm test -- tests/quality/test_quality_invariants.py` if you changed a `.mjs`/`.py` file under `tests/quality/` (the latter runs the dependency audit and needs the network), and ESLint and Prettier (as in D-29 and D-32: `node node_modules/eslint/bin/eslint.js --max-warnings 0 <files>`, `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <files>`) on each changed `.mjs`/`.ts`/`.tsx` file.

## What you return

As your method gives for a fix: status; your commits (several small commits by finding are fine); a one-line check result naming what failed or did not run; the report at the path above with, for each finding, what you did or why you did not, each check's command and exit code, your own-work check (the requirement most likely missed), **Unread material** (what this handoff names that stayed unread or was read in part, or `none`), **Searches not found or unclear** (or `none`), your reaches beyond the handoff, and the working copies' line.

Working copies (word for word from the cycle): An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.
