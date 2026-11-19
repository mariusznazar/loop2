# Report - executor-2, slice 2, task `podzial-trzech-miejsc`

**Status:** done

**Commit:** `7a16a73c` on `task/podzial-trzech-miejsc` (base `9885485c`).

## Files changed
- `src/browser/view/page-places.ts` - new, +266.
- `src/browser/view/app.ts` - +19 / -221 (the file now 612 lines of source; `startApp` 449 -> 371 lines of code).
- `guidelines/coding-browser-module.md` - +11 / -8 (five passages; no row added to "Files of this kind").

## What was done
`page-places.ts` holds the types `PageState`, `GamePage`, `Logout`, `Reset` (exported), `barPropsOf`, `sameBarProps`, `NAME_ALONE`, `NO_SENTENCES` (module-private), and the factory `createPagePlaces({ root, client, waiting, onLogout, onRetry })`. The factory builds, in the old order, the header with the bar and the hidden row of the failure, `main`, the sentences root and the waiting screen; it holds `state`, `drawnBar`, `drawnSentences` and has `release`, `mainContent`, `drawMain`, `draw`, `change`, `gameOf` inside. It returns `{ header, main, failureRow, shown, gameOf, change }`. `startApp` reads the current value through `shown()` (a snapshot `const state = shown()` where the old code read `state` more than once in one function, `const current = shown()` where it already had that local). `startApp` still appends `places.header, places.main` to the root last, and still calls `screen-address`, `email-confirmation` and `password-reset` exactly where it did. The three call sites of the trust boundary were not touched.

## Checks (command, exit code)
Baseline on the unchanged tree (before any move): the six view tests passed - account-screen 133, login-card-focus 6, owner-panel 4, previous-save 46, uncaught-failure 19, menu-bar 32; `node tests/quality/eslint-size-rules.mjs` named `startApp` 449, `createProgramsEntry` 245 and `build` 225 (kitchen-sink no longer, slice 1).

After the change (final tree = commit):
- `npm run typecheck` - 0
- `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view/app.ts src/browser/view/page-places.ts` - 0 (first run failed, see below)
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore ...` - 0
- `npm test -- tests/view/account-screen.test.mjs` 0 (133 pass) · `login-card-focus` 0 (6) · `owner-panel` 0 (4) · `previous-save` 0 (46) · `uncaught-failure` 0 (19) · `menu-bar` 0 (32). Same counts as baseline; no test file touched.
- `node tests/quality/eslint-size-rules.mjs` - names `startApp` at app.ts:149 with 371 lines (fewer than 449), `createProgramsEntry` and `build` as at the base, nothing of `page-places.ts`, no new place.
- `python -B .the-way/elements/common/foundation_check.py` - 0 ("0 errors"); the new file is claimed by the part map.

The failing run: the first eslint run exited 1 with `@typescript-eslint/unbound-method` three times (the type `PagePlaces` declared `shown`, `gameOf`, `change` as methods and `app.ts` destructured them). I changed the three declarations to property-function form (`shown: () => PageState;` etc.), no rule relaxed; the rerun above exited 0. Prettier (--write, with the check's own flags) reformatted my first drafts before the final check.

Not run: the product's full gate (`npm test` with no path) - the orchestrator's. No mismatch between the handoff's *Checks* and the method.

## Own-work check (section 3)
Requirement most likely missed: "the order of the elements in the document, the moment each root is drawn and the order of the steps of `change` stay as they are" (the existing tests cover it only in part). Check: a throwaway script (`.runs/executor-2/check-order.mjs`, removed) started the page on the jsdom harness of `tests/view/page-document.mjs` with a client whose requests never answer and printed the structure of the root. Result: `header(div.menu-bar-host, div.failure-line[hidden]) | main.app-main(div.page-sentences, section.session-check)` - bar, hidden row of the failure, then the sentences root and the waiting screen, which is the order the old code built. The steps of `change` (release, assign, draw; inside `draw` header/main hidden, `drawMain`, save line, card append, waiting update, sentences, bar, retry focus) were moved verbatim, in order.

## Choices and adaptations
- The factory also takes `root` (the plan's list does not name it): `draw` appends the card to the page's root, so the places need it. Rejected: returning the card's placement to `startApp` (it would split `draw` and change the order of steps). Cost if wrong: none for behaviour.
- The factory takes `waiting` (the first waiting state) instead of a constant: `CHECKING_SESSION` stays in `app.ts`, where `leaveGame` and `waitForServer` also use it; both the first state and the waiting screen start from this one object (before, two equal literals; both are read-only values).
- The accessor of the current value is named `shown` (not `current`), because `startApp` has many locals named `current`.
- The plan says the factory gives the page "the waiting screen's focus of its retry where the page needs it": the page does not need it - `focusRetry` is only called inside `draw`, so the factory does not expose it. Small mismatch, adapted.
- Prose of the guideline: five passages say that `createPagePlaces` in `page-places.ts` (called from `startApp`) builds the header, `main`, the bar and the waiting screen and that `change` comes from it (rule "Nowy ekran i moduły w DOM", examples "Pasek menu w Reactcie", "Kontrolki i ich aktualizacja", "Gra na stronie i odpowiedzi serwera" - two sentences). The sentence that values outliving a change of kind stand in `startApp` stays true and was not changed. A few lines of the guideline are longer than the old wrapping (Markdown is not checked by Prettier here).
- `startApp` stays over the threshold (371), as the plan expected; the mark and comment of `test_no_function_and_no_file_is_over_a_threshold` untouched.
- The comment above `startApp` was not changed (still true: "one function" for `change`).

## Reaches beyond the dispatch
none.

## Unread material
- `guidelines/styleguide-browser-view.md` - not read (1174 lines; a move without change of what is shown; no style rule bears on it).
- `foundations/decisions.md` D-265 - read the first paragraphs only (to the *Scope* line); D-262 - first two paragraphs; D-280, D-286 - not read; D-381, D-323, D-407, D-425 - read whole (D-381 and D-323 as the handoff gave them).
- `foundations/invariants.md` entries (function-and-file-size, uncaught-failure-game-state, eslint-source-rules, prettier-source-format) - not read; the checks they stand for were run (eslint, prettier, size run, uncaught-failure test).
- `foundations/part_map.md:3-32` - not read; `foundation_check.py` passed.
- `src/browser/view/menu-bar.tsx`, `game-view.ts`, `account-card.tsx`, `page-sentences.tsx`, `header-rows.tsx` - read only the exports (`grep export`); `waiting-screen.tsx` whole.
- Task passages: `task-frozen.md` read whole.

## Searches not found or unclear
- none that blocked the work. (The foundation step "Questions carried to cycle" of the task - how to split - is settled by the plan; nothing searched.)

## Working copies
`.runs/executor-2/` in the worktree held `baseline.txt`, `after.txt` and `check-order.mjs`; it was removed before I returned. No other copy was made.
