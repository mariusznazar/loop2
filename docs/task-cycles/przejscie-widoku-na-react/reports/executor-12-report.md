# Executor report — slice 12, The DOM forms of the shared controls go

**Status:** done

**Commits** (branch `task/przejscie-widoku-na-react`, range from `6839f5b1`):

- `fb523235` refactor: :recycle: the type SelectOption lives in the React select list, which the two screens that take it import from, so that the DOM select list can go (D-265, D-44)
- `7226e369` refactor: :recycle: the DOM forms of the shared controls and their comparison test go, the React forms staying the one form of each control; the cases that protect a React form live in the shared controls test (D-265, D-44)

No test was written first: the slice names none. No push, no amend, no foundation entry written.

**Check result:** all focused checks of the slice exit 0; the foundation check exits 0 with 0 errors on this branch (see the checks below). The full `npm test` was not run, as the handoff reserves it to the orchestrator.

## Files changed

Commit `fb523235`:

- `src/browser/view/controls/react-select-list.tsx`: +3 −1. The type `SelectOption` is declared here, exported, with its doc comment; the import from `./select-list.js` is gone.
- `src/browser/view/program-panel.tsx`: +4 −2. The two imports from `react-select-list.js` (`ReactSelectList` and the type) become one import, `import { ReactSelectList, type SelectOption } ...`, wrapped over several lines by Prettier.
- `src/browser/view/trip-plan.tsx`: +4 −2. The same merge as in `program-panel.tsx`.

Commit `7226e369` (deletions only):

- `src/browser/view/controls/button.ts`: −120
- `src/browser/view/controls/number-field.ts`: −24
- `src/browser/view/controls/pick-cell.ts`: −66
- `src/browser/view/controls/select-list.ts`: −30
- `src/browser/view/controls/text-field.ts`: −145
- `tests/view/react-controls.test.mjs`: −1335

## Checks

Each run from the worktree root; exit code as the command returned it.

- `npm run typecheck`: exit 0 (after commit `fb523235`, log `.runs/executor-12-typecheck1.log`; and again after the deletion, log `.runs/executor-12-typecheck2.log`).
- `npm test -- tests/invariants/test_application_build_kitchen_sink.py`: exit 0, "Ran 3 tests … OK" (log `.runs/executor-12-t1.log`).
- `npm test -- tests/view/shared-controls.test.mjs`: exit 0, 49 pass, 0 fail (log `.runs/executor-12-t2.log`).
- `npm test -- tests/view/program-panel.test.mjs`: exit 0, 53 pass, 0 fail (log `.runs/executor-12-t3.log`).
- `npm test -- tests/view/trip-plan.test.mjs`: exit 0, 11 pass, 0 fail (log `.runs/executor-12-t4.log`).
- `npm test -- tests/quality/test_node_test_selection.py`: exit 0, "Ran 1 test … OK" (log `.runs/executor-12-t5.log`).
- `git grep -n -e "controls/button" -e "controls/text-field" -e "controls/number-field" -e "controls/pick-cell" -e "controls/select-list" -e "react-controls"`: exit 0, with matches only in `guidelines/coding-browser-module.md` (lines 29–38, 183, 377) and `guidelines/styleguide-browser-view.md` (lines 249–305). No file of code or tests matches. The slice expects exactly this; Slice 13 changes those guideline lines.
- `git grep -n -E "from \"\.{1,2}/(button|text-field|number-field|pick-cell|select-list)\.js\""` outside `guidelines/`: exit 1, no match (no relative import of a deleted file remains).
- `npx eslint src/browser/view/controls/react-select-list.tsx src/browser/view/program-panel.tsx src/browser/view/trip-plan.tsx`: exit 0.
- `npx prettier --check` on the same three files: exit 0, after one `npx prettier --write` on `program-panel.tsx` and `trip-plan.tsx` that only re-wrapped the merged import lines.
- `python -B .the-way/elements/common/foundation_check.py`: exit 0, output "0 errors" (log `.runs/executor-12-foundation.log`). The handoff expected the check to be red on the quoted lines of `tests/view/react-controls.test.mjs` until this slice; the deletion removed them, so the check is green now. I did not touch the guidelines or the foundation to get this result.

## Own-work check (make-change section 3)

- **Requirement most likely unmet:** deleting `tests/view/react-controls.test.mjs` drops a protected behaviour of a React form that has no case in `tests/view/shared-controls.test.mjs`. Slice 11 was to move those cases; the slice says so, but I did not verify it case by case.
- **Check run:** I compared the deleted file's React-form cases against the shared test by grep only, on five points: the waiting submit button with its waiting text `Logowanie…` (both files have it, D-44), `aria-pressed` (24 hits in the shared test), `aria-disabled` (5), `aria-expanded` (3), and the click reaching the handler with a waiting button giving none (both files). Also the select list and the number field's clamp (`select-list` 3 hits, `clamp` 3 hits), and the trip count (`trip` 4 hits). The shared test passes (49/49).
- **What it showed:** no gap on these points. It is not a full case-by-case comparison, and I did not mutate the React forms to see the shared test fail; both are left to the reviewer. The "Wysyłanie…" waiting text has no hit in the shared test; the deleted file did not name it either (its waiting cases use "Logowanie…"), so I did not treat it as a gap.

## Choices made

- The type `SelectOption` is declared in `react-select-list.tsx` with the doc comment of the old declaration, rather than imported from a new shared module. The slice says so; rejected: a separate `select-option.ts` file, which would be a third module for one type.
- In `program-panel.tsx` and `trip-plan.tsx` the type import is merged into the existing import of `ReactSelectList` with an inline `type` modifier, the form `program-panel.tsx` already uses for `GameEvent`. Rejected: keeping a second import line from the same module, which the ESLint setup may flag as a duplicate import. The slice says "nothing else in them changes"; the merge touches only the import block.
- The deletion went into its own commit, after the type move, so each commit keeps every importer resolving.

## Reaches beyond the handoff

- None beyond the *Read* the handoff names. I read the passages of the spec and task at the ranges given (`spec.md:14-22` and `170-190`, `task.md:28-34`), D-265 whole (`foundations/decisions.md:3985-4031`), and the guideline files whole (`guidelines/coding.md`, `coding-browser-module.md`, `styleguide-browser-view.md`, `testing.md`) and `src/browser/AGENTS.md`.
- The guideline files still name the deleted files, as the slice expects; I changed none of them.

## Unread material

- The spec and the task were read in the passages the slice names, with a few lines of context, not whole. The decision log was read only at D-265.
- `guidelines/testing.md` and `guidelines/styleguide-browser-view.md` were read whole, in two and one reads respectively.
- No other item the handoff names was left unread.

## Searches not found or unclear

- Searching for the deleted files' names turned up only the guideline lines listed above, which Slice 13 changes. No other search came back unclear.
- A second grep I first ran with the pattern `text-field\.js` matched `react-text-field.js` imports, a false positive; I re-ran it with the precise pattern (`controls/...`) and the result above stands.

## Working copies

- No working copy was made. The files under `.runs/` in this worktree named `executor-12-*.log` are check logs, kept in the ignored `.runs/` root; none of them is a copy of the repository or a worktree. Nothing needs removal.

## Worktree state

- Clean after the last commit (`git status --short` is empty, no untracked file outside the ignored `.runs/`).
