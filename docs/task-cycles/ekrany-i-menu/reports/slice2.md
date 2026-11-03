# Slice 2 report — the shared button: the destructive React form and the open state

**Status:** done with concerns

Concern: the handoff asks to start from the failing case of the destructive React form. That case
passes before the change, because `ReactButton` passes `kind` straight into the class list, and
`.mjs` tests are not type-checked. The failing cases before the change are the two `aria-expanded`
cases and the `setButtonExpanded` case. The type of `kind` is widened in the change itself. The
destructive cases stay in the test as guards: a React form that dropped `kind` would fail them
(mutant 2 below).

## Commits

- `893d26c` feat: :sparkles: add the destructive kind and the open state to the shared button in both forms

## What changed and why

| File | Lines (added / removed) | Change |
|---|---|---|
| `src/browser/view/controls/button.ts` | +18 / 0 | `ButtonOptions.expanded?: boolean`; `createButton` sets `aria-expanded` when `expanded` is given; new exported `setButtonExpanded(element, expanded)`, which sets `aria-expanded` as `setButtonSelected` sets `aria-pressed`. No class is added, so the open state has no look of its own. |
| `src/browser/view/controls/react-button.tsx` | +14 / -2 | `ReactButtonKind` gains `"destructive"` (D-44, D-265: same class as the DOM form); new prop `expanded?: boolean`, rendered as `aria-expanded={expanded}`. React omits the attribute when the value is `undefined` and writes `"true"` / `"false"` for booleans. |
| `tests/view/react-controls.test.mjs` | +104 / 0 | Cases: destructive button in both forms (with literal class `button destructive` and `type="button"`); destructive button with an accessible name; `expanded` true and false in both forms, with literal `aria-expanded` values; no `expanded` gives no `aria-expanded` in either form; `setButtonExpanded` on the DOM form matches React `expanded: true`. |

The kitchen-sink page is unchanged, as the plan says. No CSS changed. No screen uses the new kind or
the open state yet.

## Checks (command and exit code)

Before the change:

- `npm test -- tests/view/react-controls.test.mjs` exit 1. Failing: `a button with aria-expanded true …` (`expected "true", got null`), `… aria-expanded false …` (`expected "false", got null`), `setButtonExpanded is not defined` (in the case of the DOM open state). The destructive cases passed (see the status concern). Run log: `…\scratchpad\s2_run1.txt`
- `npm run typecheck` exit 0.

After the change:

- `npm test -- tests/view/react-controls.test.mjs` exit 0 (35 tests, 35 pass, 0 fail). Log: `…\scratchpad\s2_run2.txt`
- `npm run typecheck` exit 0.
- `npm test -- tests/quality/test_quality_invariants.py` exit 0 (5 tests, OK). Log: `…\scratchpad\s2_quality.txt`
- `npx prettier --check` on the three changed files exit 0 (the quality test covers the same scope).

Not run, and why: the full gate `npm test` (no file argument), which the handoff forbids for the
executor; `foundation_check.py`, which the slice's *Checks* does not name.

## Own-work check

Requirement most likely missed: the open state must be written as the value given, `"false"` included,
and absent when left out. A React form that treats `false` as "no value" would pass the `true` case
and fail the `false` case only.

Check: mutant 1 in the worktree, `aria-expanded={expanded ? expanded : undefined}`, so `false` is
dropped. `npm test -- tests/view/react-controls.test.mjs` exit 1, with `a button with aria-expanded
false is the same element in both forms` failing. Restored; `cmp` against the saved copy: identical.

Second check: mutant 2 in the worktree, dropping `kind` from the class list when it is
`destructive`. Exit 1, with `a destructive button is the same element in both forms` and `a
destructive button with an accessible name …` failing. Restored; identical.

No failed check passed on a re-run, so no pair of runs is needed.

## Screen check

Not applicable. The slice changes no screen: no screen draws the destructive React form or the open
state yet, and `aria-expanded` is not visible. The walk through the real browser is the
orchestrator's, when the screens that use these forms are built.

## Reaches beyond the handoff

- `guidelines/coding.md`, read whole (15 KB).
- `guidelines/testing.md`, read in two passes: the first ~26 KB whole; the second pass skipped the
  rows of the trust-boundary table that name server routes (`| Gracz …`, `| Odwiedzający …`, `| Każdy …`).
  Those rows concern the account server, not this slice.
- `guidelines/coding-browser-module.md`, read in two parts: the first 12 KB and the last 9 KB, which
  is effectively the whole file (13.3 KB). The middle part was not read.
- `guidelines/styleguide-browser-view.md`, read whole (27.7 KB).
- `src/browser/AGENTS.md`, read whole.
- `tests/view/page-document.mjs`, the first 80 lines only (the rest is the harness, not changed).
- `tests/quality/test_quality_invariants.py`, the first 60 lines; `scripts/test.py` and the start of
  `scripts/build.mjs` (to see how a single test file builds `dist/` first).
- `src/browser/styles.css` and the call sites of `kind: "destructive"` (grep only), to confirm the
  class `.button.destructive` exists (line 160) and that no React screen uses the kind yet.

## Mismatches of plan and code

None structural. The plan's *Read* list is the handoff's list and was followed. The plan's *Change*
list names the three files; only those changed.

## Choices made

- `setButtonExpanded` is a separate export, as the plan asks for the DOM form; `createButton` takes
  the same value as an option. Rejected: the option only, since a button already on the page could
  not then be given its state. Cost if wrong: none seen.
- The React form renders `aria-expanded={expanded}` directly and lets React write the boolean as a
  string. Rejected: a conditional string, which duplicates React's rule for `aria-*` values.
- The `ReactButtonKind` union lists `"destructive"` first, in alphabetical order.

## Searches not found or unclear

- None not found. `.button.destructive` is in `src/browser/styles.css:160`.
- Unclear: whether the `expanded` prop should also take a `null` value, as `waitingText` does. The
  plan says "given true or false" and "left out", so `null` is not handled; it would be a type error.
- Unclear: the test file's `react-controls.test.mjs` count (35) includes the six new cases; the
  first run showed the same total because the cases were already in the file.
