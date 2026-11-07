# Slice 3 report - the main look of the shared button outside a form

**Status:** done

## Commits

- `00b807c` feat: :sparkles: add the kind main of the shared button for the main look outside a form (one commit; base `284641e`; worktree clean after it)

## Files changed (added / removed lines)

- `src/browser/view/controls/button.ts` 8 / 5 - `ButtonKind` gains `"main"`; `createButton` adds the class `main`; the type stays `button` unless `submit` is set.
- `src/browser/view/controls/react-button.tsx` 4 / 3 - `ReactButtonKind` gains `"main"`; the class list already carries `kind`, so the class `main` comes with it; the type stays `button`.
- `src/browser/styles.css` 13 / 9 - `.button.main` joins `.button[type="submit"]` in the one rule of the main look and `.button.main:disabled` joins `.button[type="submit"]:disabled`; no declaration and no value added (D-274 as rewritten, D-43, D-279: frame in `currentColor`).
- `tests/view/react-controls.test.mjs` 36 / 0 - two cases: the kind at rest and the kind disabled, each comparing the two forms.
- `src/browser/kitchen-sink/kitchen-sink.ts` 9 / 2 - a new row "Przycisk główny poza formularzem" (DOM form, `createButton("Wejdź", { kind: "main" })`) beside the row "Przycisk główny"; its loading state is given as not applying, with a reason; the doc comments name the kind. No React is imported (D-269).

## Checks (command, exit code)

- `npm test -- tests/view/react-controls.test.mjs`, case written first, before the code: exit 1. Both new cases failed on their assertions for the expected reason: `expected "button main", got "button"` (the DOM form had no class `main`), and the tree comparison of the locked case showed class `button` in the DOM form against `button main` in the React form. After the code: exit 0.
- `npm test -- tests/view/react-controls.test.mjs`: exit 0
- `npm test -- tests/invariants/test_browser_view_token_values.py`: exit 0
- `npm test -- tests/invariants/test_browser_view_focus_outline.py`: exit 0
- `npm test -- tests/invariants/test_application_build_kitchen_sink.py`: exit 0
- `npm run typecheck`: exit 0
- `npm test -- tests/quality/test_quality_invariants.py` (ESLint, Prettier, Ruff, ShellCheck): exit 0
- `npx prettier --check --no-config --no-editorconfig` on the five changed files: exit 0
- `npm run kitchen-sink`, page looked at with `playwright-cli` (see the state check below): ran, page served, looked at, stopped.
- Not run: full `npm test` (the orchestrator's gate); `foundation_check.py` (not in my slice's checks).
- The three invariant tests were not changed by this slice and no invariant file was touched; each already passes on the code before and after, so I did not break the code to see them fail (the slice adds no new invariant test; the failing test written first is the case of the kind).

## State check of the control

- Component: the shared button, kind `main` (DOM form `createButton`, React form `ReactButton`, one element `<button type="button" class="button main">`).
- States drawn: default, hover (sample class `sample-hover`), visible focus (sample class `sample-focus`), disabled; error and empty marked as not applying by the existing reasons of the page; loading marked as not applying with the new reason (the button sends no form; a locked one looks as every disabled button).
- Method: `npm run kitchen-sink` served the page on a local port; `playwright-cli open`, `eval` reading `getComputedStyle` of the buttons of the rows "Przycisk główny" (type submit) and "Przycisk główny poza formularzem" (kind main) in the four states, and a screenshot of the table.
- Evidence (computed values, rows compared state by state):
  - default: both `rgb(244, 244, 245)` text, weight 500, border 1px solid `rgb(244, 244, 245)`, background transparent;
  - hover: same, background `rgb(39, 39, 42)` (`highlight`) for both;
  - focus: same text, weight and border, outline solid `rgb(244, 244, 245)` for both;
  - disabled: both text `rgb(82, 82, 92)` (`text-disabled`), weight 400, border `rgb(113, 113, 123)` (`control-border`).
  - The plain button of the row "Przycisk" differs (text `rgb(212, 212, 216)`, weight 400, border `control-border`) - the main look is visibly distinct.
  - The screenshot shows "Wejdź" in the main look in the new row, identical to "Zaloguj się" in each state. Console: one error, the 404 of `favicon.ico`, ordinary; no `uncaught` line.
  - The screenshot was a working file and was deleted with `.playwright-cli/`; it is not kept in the repository.

## Own-work check (WAY-164)

- Requirement most likely not met: "draws `.button.main` with the main look ... from the same declarations, with no new value", at all four states, including disabled, where the order and the specificity of the rules could let `.button:disabled` or `.button:hover` override the main rule.
- Check: the computed styles above, read in a real browser from the two rows in the four states, plus `test_browser_view_token_values.py` (no value written in place of a token). Result: every property read is equal between the submit button and the kind `main` in every state, and the token test passes. The selector was added to the existing rules, so no declaration is repeated.
- Mutations thought through: removing `classList.add("main")` fails both cases (class assertion and tree comparison); setting the type to `submit` for the kind fails the `type` assertion of both forms; a class set only by the React form or only by the DOM form fails the tree comparison; dropping `.button.main:disabled` from the stylesheet is caught only by the browser reading (computed styles), not by a test, since jsdom draws no cascade - the guideline "Not tested on purpose" (D-87, D-88) leaves looks to the browser check, which was done.

## Reaches beyond the handoff

- None beyond the handoff's *Read*, apart from reading `scripts/kitchen-sink.mjs` output (the served address) by running it, and `tests/view/react-controls.test.mjs` / the five files of *Change* whole.

## Searches not found or unclear

- none

## Choices

- The kitchen-sink loading cell of the new row holds the reason "Nie dotyczy: na serwer czeka tylko przycisk, który wysyła formularz; ten przycisk nie wysyła formularza, a wyłączony wygląda jak każdy wyłączony (D-274)." Rejected: a waiting sample - the kind `main` has no waiting text and the styleguide ties loading to the button that sends a form to a server. Cost if wrong: one cell of one row.
- The row is named "Przycisk główny poza formularzem" and stands directly after "Przycisk główny" (the handoff: "beside its main button of a form"). Cost if wrong: renaming one label.
- No change to `ReactButton` beyond the type: its class list already joins `kind`, so the class `main` needs no new line; the test pins the class and the type in both forms.
- Test names are in English like the neighbouring cases of the file.

## Questions and concerns

- No questions. A note for the review: the styleguide (`guidelines/styleguide-browser-view.md`, rule "Main button, secondary action and tab") already gives the wording `createButton(text, { kind: "main" })` / `<ReactButton kind="main">`, class `main`, so the code agrees with it; `guidelines/coding-browser-module.md` mentions the `ReactButton` props `kind, waitingText, selected, submit` without listing the kinds, so it needed no change.
