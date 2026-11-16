# Executor report — slice 5 (the panel of a card taken down reads the warning sentence's constant)

**Status:** done

**Worktree:** `the task's worktree`, branch `task/przejscie-widoku-na-react`. Range `fc00bda6..HEAD`. The worktree is clean after the work. Nothing was pushed.

## Commits

1. `4a0c516b` test: the panel of a card taken down carries the class `form-warning` and the role `alert` of its sentence (D-323, D-265). Changed: `tests/view/uncaught-failure.test.mjs` (+10, -0).
2. `f0e6eea9` refactor: read the tag, class and role of the panel's warning sentence from the constant that the React sentence reads (D-265, D-323). Changed: `src/browser/view/controls/react-text-field.tsx` (+18, -2) and `src/browser/view/account-card.tsx` (+4, -3).

## What changed

- `react-text-field.tsx`: new exported constant `FORM_WARNING = { tag: "p", className: "form-warning", role: "alert" } as const`. `ReactFormWarning` renders its element from the constant (`Tag`, `className`, `role`). Its rendered output is unchanged.
- `account-card.tsx`: `createFailureCard` builds its sentence with `document.createElement(FORM_WARNING.tag)` and sets the class and role from the constant. It stays built by hand outside React. The panel class `account-card-failure`, `onUncaughtError` and the D-323 wording are untouched.
- The test case "a card that React takes down after an error is replaced by the sentence alone in its place, and the page hears of the error" gained two assertions with the values written out: the panel's `p` carries the class `form-warning` and the role `alert`.

## Checks (command, exit code)

- `npm test -- tests/view/uncaught-failure.test.mjs`: exit 0, 17 of 17 pass (after the change).
- `npm test -- tests/view/account-screen.test.mjs`: exit 0, 131 of 131 pass.
- `npm test -- tests/view/react-controls.test.mjs`: exit 0, 56 of 56 pass. Not in the slice's *Checks*; run because it renders `ReactFormWarning`, which changed.
- `npm run typecheck`: exit 0.
- `npx eslint src/browser/view/controls/react-text-field.tsx src/browser/view/account-card.tsx tests/view/uncaught-failure.test.mjs`: exit 0.
- `npx prettier --check src/browser/view/controls/react-text-field.tsx src/browser/view/account-card.tsx tests/view/uncaught-failure.test.mjs`: exit 0.
- `python -B .the-way/elements/common/foundation_check.py`: exit 1, the known red state of this branch until slice 12. All 39 errors are in `tests/view/react-controls.test.mjs` (lines quoting the old sentence of D-265). Nothing else is reported. Not touched, as the handoff says.
- Not run: `npm test` with no argument (the orchestrator's alone, per the handoff).

## Test first: what the run showed

- The new assertions pass on the code as it stood. `createFailureCard` already set the class and role by hand, so this is a characterization, not a red-first case. I did not fake a red run for it.
- To show the assertion can fail, I changed the panel's class in `account-card.tsx` to `warning-x` in the worktree and ran `npm test -- tests/view/uncaught-failure.test.mjs`: exit 1, the case failed with "the panel's sentence carries the class form-warning: expected a true value, got false". I restored the file with `git checkout --` before committing; the restore is confirmed by the clean status and by the passing runs above.

## Own-work check (section 3)

- Requirement most likely unmet: the panel's sentence stops being the same tag, class and role as before, or the React sentence stops rendering `p.form-warning[role=alert]`.
- Checks: the new assertions (tag `p` via the `querySelectorAll("p")` lookup, class, role) in `uncaught-failure`; the existing `react-controls` cases for the React sentence; the mutant above, which the class assertion caught.
- Result: all pass after the change; the mutant fails as expected.

## Choices

- Constant name `FORM_WARNING` (the maker's name, per the slice). The tag is a plain string literal read through `Tag` in JSX, not a separate element type. Rejected: keeping `<p>` literal in `ReactFormWarning` and only the class and role in the constant. Cost if wrong: the tag could drift from the panel's tag, which the slice names as part of the constant.
- The new assertions are added as a separate test commit before the code commit, as the slice asks ("test first"). Since they pass on the old code, the ordering does not produce a red run; see above.

## Reaches beyond the handoff

- Read `.the-way/task-cycle/change/SKILL.md` and `slice.md` (the method and the slice reading).
- Read `guidelines/coding.md`, `coding-browser-module.md`, `styleguide-browser-view.md`, `testing.md` and `src/browser/AGENTS.md` whole, as the handoff names; the two large ones in two parts each.
- Read `tests/view/page-document.mjs` lines 93-166, as the slice's *Read* names.
- Read `foundations/decisions.md` at the current ranges for D-262, D-36, D-265 and D-323, plus the spec and task passages the slice names.
- Ran the foundation check (see above) to name its known state.
- Looked at `src/browser/view/controls/text-field.ts:108`, which has its own DOM `form-warning` sentence (`createFormWarning`). It is outside this slice and was left as it is.

## Unread material

- `docs/task-cycles/przejscie-widoku-na-react/task.md` and `spec.md`: read only the passages the slice names, as the handoff asks.
- `foundations/decisions.md`: only the ranges the slice names. The Foundation entries row 2 (D-265) and row 5 (D-323) were read as they stand in the file at the current ranges.
- `ui_check.md`: not read. The slice changes no visible output (the handoff's *Goal* says nothing the player sees changes), so the rule that triggers its reading does not apply.
- Nothing else of the named material was left unread.

## Searches not found or unclear

- None that changed the work. The grep for `FORM_WARNING` and `form-warning` under `src/browser/view` found the two expected sites in the panel and React warning, and the DOM sentence in `text-field.ts`, which is out of scope.

## Working copies

- None made. The only temporary file was a mutation of `account-card.tsx` in the worktree, restored with `git checkout --`. Scratch logs under `.runs/` (the ignored directory) were removed by name.

## Questions

- None.

## Concerns

- The new assertions are characterization of existing behaviour: they pass before the change, so they guard the slice's requirement rather than drive it. Stated above; the orchestrator may want this noted in the cycle record.
