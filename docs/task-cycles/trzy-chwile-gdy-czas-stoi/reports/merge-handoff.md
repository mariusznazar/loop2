# Handoff — a correction for the human's remarks: resolve the conflicts with the target branch

You are the author of the change, resumed for a correction. Same delegation and rules as in
`reports/author-handoff.md`, with one change to the git rules: **you conclude the merge in progress with a
merge commit** (never a rebase; no push of anything anywhere; do not run the product's full gate — the
orchestrator runs it).

- Method and variant: `.the-way/task-cycle/change/SKILL.md`, **a correction for the human's remarks**.
- The human's remark (2026-11-12, in the session that leads the cycle, after merging another task first
  because it was large): „prośba o rozwiązanie konfliktów”. Pull request 84 conflicts with `main`.

## The state you start from

- Worktree `the task's worktree`, branch `task/trzy-chwile-gdy-czas-stoi`, head
  `dc42ad8e` (the tree of `23e22246`, reviewed, gated).
- **A merge of `origin/main` (`eb7cf5d8`) is in progress and uncommitted** (`git merge --no-ff --no-commit`).
  `main` gained 143 changed files from pull request 85 (a task that moved the reasoning of the decisions into
  the entries and dropped their private origins; it also renumbered its own decisions to D-374…D-388, renamed
  comments and test titles to name decisions instead of tasks, notes and specs, and added D-387 and D-388 and
  the rule on names of unreachable notes and repositories). The pin `.the-way` is the same on both sides
  (`55afa8e5`); verify that `git ls-files --stage -- .the-way` still equals `git -C .the-way rev-parse HEAD`.
- Five files conflict, 14 hunks: `foundations/decisions.md` (7), `guidelines/styleguide-browser-view.md` (2),
  `src/browser/styles.css` (2), `src/browser/tokens.css` (1), `tests/view/end-window-game.test.mjs` (2). Files
  touched by both sides that merged by themselves (`src/browser/view/scene.tsx`, `scene-picture.ts`,
  `game-view.ts`, `world-area.tsx`, `run-screen.tsx`, `src/browser/sim/data/scene.ts`, the scene tests and
  others) are yours to check too: a clean textual merge can hold a wrong meaning.

## How to resolve

1. **Both sides' intent stays.** What this task changes (the three effects and every entry, guideline and
   test of it, as the frozen task `.runs/task-cycles/trzy-chwile-gdy-czas-stoi/task.md` requires and as the
   last reviews left it) and what pull request 85 changed (its rewriting of the entries, its renaming of
   comments and titles, its new decisions, its new rule on names). Where both rewrote the same entry (D-322,
   D-311, D-271, D-315, D-39, D-42, D-371 are the ones this task touched; main may have rewritten any of them),
   take **main's form** of the entry — its sentences, its *Rationale* and *Rejected* as the game has them, its
   *Origin* — and carry this task's meaning into it, in main's style. Do not restore reasoning main dropped;
   do not drop what this task's settlements require (*Settlements to record* rows 1–7 of the frozen task).
2. **The rules main wrote apply to what this task added.** Read the entries and files that main's pull request
   brought in about how comments, test titles, token sources, *Origin* and *Rationale* are written (the
   decisions on no task names, no notes and no private repositories; the invariant on names; D-82 and the
   testing guidelines' departures; the styleguide's value sources) and bring this task's added text in line:
   for example the `Source:` comments in `src/browser/tokens.css` that name the task, the comments in
   `styles.css` and the tests, the *Origin* line of D-322 that names vault documents, the styleguide text. Keep
   the facts they state (the human chose the colours on 2026-11-12, accepting the proposal; the pixel
   addresses); change only how they are worded and what they point to.
3. **Entries that main changed and this task cites.** D-317 now carries the WCAG 2.3.1 text in its *Based on*;
   this task's D-42 has the fourth criterion and its fact `wcag-three-flashes` in `foundations/environment_facts.md`.
   Make them agree and keep one source for the criterion (do not duplicate, do not drop what D-42's
   settlement row requires). Record in the report each such reconciliation.
4. Where resolving needs a decision the foundation and the task do not settle, or changes what an approved
   decision of main says beyond carrying this task's meaning, return `questions` without committing.
5. Conclude with the merge commit (message in English, naming what was kept from each side). Then run the
   checks the merge touches: `foundation_check.py`; the invariant tests on names and on token sources,
   contrast and values; `npx prettier --check` and `npx eslint` on the files you changed; the view tests of the
   scene and of the end window (`tests/view/scene.test.mjs`, `scene-picture.test.mjs`,
   `scene-frost-contrast.test.mjs`, `end-window-game.test.mjs`); `npm run typecheck`. The machine ran short of
   memory once in this cycle: run these one command after another, not in parallel.

## Report

`reports/merge-report.md` in `.runs/task-cycles/trzy-chwile-gdy-czas-stoi/`: status; the merge commit and any
further commit; for each conflicted file how each hunk was resolved and what was kept from each side; the
files that merged by themselves and that you checked, with what you found; every reconciliation of item 3 and
every re-wording of item 2; the commands and exit codes of your checks; your own-work check; **Unread
material**; **Searches not found or unclear** (`none` is an answer). No secrets, no screenshots, no diffs
copied.
