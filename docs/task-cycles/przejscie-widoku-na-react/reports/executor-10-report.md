# Report — executor of slice 10 (the row of the failure, drawn at the start and shown at the error)

**Status:** done

## Commits

- `9b523357` test: the sentence of the failure stays shown once in the header's row, with one console line, where the root of the waiting screen or of the sentences above the game is taken down by its drawing (D-323, D-407)
- `4437ebd7` refactor: draw the row of the failure once when the page starts, in a root of its own that stays hidden, and let the error only show it (D-323, D-407)

Range `1bffa4e6..4437ebd7`. The worktree is clean (`git status --short` prints nothing).

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/header-rows.tsx` | 45 | 8 |
| `src/browser/view/app.ts` | 14 | 19 |
| `tests/view/uncaught-failure.test.mjs` | 70 | 0 |

(total of the range: 129 insertions, 27 deletions, as `git diff --numstat` gives.) `src/browser/styles.css` is unchanged: `header .failure-line` applies to the host.

## What was made

- `header-rows.tsx`: `createFailureRow()` returns `{ element, show(), dispose() }`. The host is a `div.failure-line`, `hidden`; `ReactFormWarning` with `FAILURE_SENTENCE` is drawn into it synchronously at creation (`flushSync`). `show()` only sets `element.hidden = false`: no React state, no render. `dispose()` unmounts and removes the host. The module doc covers both rows.
- `app.ts`: `startApp` creates the row and appends its host to the header right after the bar's host (`header.append(bar.element, failureRow.element)`); the line of saving is appended later by `draw`, as before, so the order is bar, failure, saving. `onUncaught` calls `failureRow.show()`, then halts the game and tells the card as before. The `failureLine` variable, the `createFormWarning` import and the `FAILURE_SENTENCE` import are gone from `app.ts`, which now imports no DOM form of a shared control. The doc comment of `startApp` says the row is drawn at the start and only shown at the error.
- `tests/view/uncaught-failure.test.mjs`: one new case, a table of two named variants, each in its own page, outside `act`, with the console's warn of React's development build muted as the existing case of the bar's root does:
  - the waiting screen: the client answers `currentAccount` with an `unexpected` failure whose `message` is `{}` (no text), so `askingFailed` gives `WaitingView` a sentence React cannot draw;
  - the sentences above the game: the address carries a confirmation token, `confirmEmail` answers a failure with `message: {}`, then `currentAccount` gives a signed-in account and `loadSavedGame` gives no save; the notice with no text goes to `PageSentence` in `showGame`.
  Each variant asserts, before the error, no sentence shown and no console line; after it, exactly one sentence shown, in the header, `role="alert"`, class `form-warning`, after the menu bar's host, and exactly the one line `uncaught kind=Error code=none place=view/last-resort.installLastResort`. The existing case of the menu bar's root stays untouched.

## Checks (command and exit code)

| Check | Command | Exit |
|---|---|---|
| New case, before the code (see below) | `npm test -- tests/view/uncaught-failure.test.mjs` | 0 (18 tests, 18 pass) |
| Same file after the code | `npm test -- tests/view/uncaught-failure.test.mjs` | 0 (18 pass) |
| | `npm test -- tests/view/account-screen.test.mjs` | 0 (131 pass) |
| | `npm test -- tests/view/previous-save.test.mjs` | 0 (44 pass) |
| | `npm test -- tests/view/owner-panel.test.mjs` | 0 (4 pass) |
| | `npm run typecheck` | 0 |
| | `npx eslint src/browser/view/app.ts src/browser/view/header-rows.tsx tests/view/uncaught-failure.test.mjs` | 0 |
| | `npx prettier --check src/browser/view/app.ts src/browser/view/header-rows.tsx tests/view/uncaught-failure.test.mjs` | 0 |
| Mutation: `show()` made a no-op (restored before commit) | `npm test -- tests/view/uncaught-failure.test.mjs` | 1 (6 failed, among them the new case) |
| Foundation check (known state, not mine) | `python -B .the-way/elements/common/foundation_check.py` | 1 (red until slice 12, as the handoff says; I did not read its output) |

The whole `npm test` was not run (the orchestrator's alone).

**The new case did not fail before the code.** The *Checks* ask for it failing where a variant's root takes the row down, then passing. On the code as it stood, the page built the row by hand with the DOM form of the warning at the error, which does not depend on any root, so the case passes on the old code too (exit 0, 18 passing, with the new case among them). It is a guard of the new design, not a reproduction of a bug of the old one; a failing first run was not possible without breaking the old code on purpose. To see that the case catches the break it is for, I made `show()` do nothing: the new case and five others failed (exit 1), and I restored the code.

## Own-work check (section 3)

- Requirement most likely not met: the sentence of the failure must come once, in `warning`, under the bar beside the line of saving, with no sentence in the header before an error and the header at today's height (spec constraints and Decision 1), and it must come when an error takes down another root.
- Checks: the table case above (two roots taken down, sentence once, one line); the mutation above; and a real browser (`npm run local`, Playwright CLI, an account made through the card).
- What the browser showed: before any error the header held `menu-bar-host`, `failure-line` (hidden, the sentence already in it) and `save-line` (hidden), in that order, and `innerText` of the header had no sentence. After `setTimeout(() => { throw new TypeError(...) }, 0)` run through the console, the failure row was shown, the header read "Loop / Siedziba / Mapy / Programy / Konto / Coś w grze się zepsuło — odśwież stronę.", one sentence stood in the page, and the console held one line `uncaught kind=TypeError code=none place=view/last-resort.installLastResort`. With saving made to fail (the page's `fetch` patched to reject the `PUT`), the line of saving "Nie udało się zapisać postępu. Gra spróbuje ponownie." stood beside it, order bar, failure, saving. I inspected a screenshot of that state (both sentences in `warning`, one under the other under the bar); I kept it nowhere and showed none.
- A screen reader's announcement of the row turning from hidden to shown was **not checked**: no screen reader is available here. It stays assumed, as the spec's Decision 1 says. The accessibility snapshot of the CLI lists the element as an alert, which is not an announcement.

## The four transitions of slice 7 (handoff)

I met none of them. `onUncaught` still halts a standing game and tells a standing card exactly as before; I touched only how the sentence is shown.

## Choices

- `createFailureRow` lives in `header-rows.tsx`, next to `createSaveRow` (the spec leaves one module or two to the maker; the slice names `header-rows.tsx`). Rejected: a module of its own, which would add a file for twelve lines. Cost if wrong: a rename.
- `FailureRow` has a `dispose()` as the slice asks, but `startApp` never calls it: the page has no disposal and lives until the reload, as the bar's `dispose` is not called either. It is there for the shape of the boundary.
- `show()` sets `element.hidden = false` and nothing else, and is idempotent; the hidden state needs no reset because the sentence stays until the page is reloaded (D-323).
- The new case's `decision:` comments quote D-323 and D-407 as the decision text stands in `foundations/decisions.md`.

## Reaches beyond the handoff

- `.claude/skills/loop2-play/SKILL.md` and `.the-way/task-cycle/change/ui_check.md` were read whole; both are named by the handoff's rules or the method (the first by the *Read*, the second by section 3). Not beyond the dispatch.
- Read `foundations/decisions.md:4320-4365` (D-323 and D-407, whole, in the current ranges) to quote the decisions in the case's comments; the handoff names D-323 and D-407 as "Foundation entries rows 5 and 3".
- Read `src/browser/view/waiting-screen.tsx`, `src/browser/view/page-sentences.tsx` and `src/browser/view/controls/react-text-field.tsx` (the `ReactFormWarning` part, by search) to choose the values that make each root fail; the *Read* names the first two by description ("chosen from `waiting-screen.tsx` and `page-sentences.tsx`"), the third was a reach.
- `src/browser/view/email-confirmation.ts`, by search for `message`, to see that a failed confirmation's notice text is the client's `message`.

## Unread material

- `docs/task-cycles/przejscie-widoku-na-react/spec.md`: read lines 28-99 and 173; not read: the rest (Decisions 3-7 other than the line 173 of Decision 7, to-dos).
- `docs/task-cycles/przejscie-widoku-na-react/task.md`: read lines 84-88 only, as named.
- `tests/view/page-document.mjs`: read lines 85-175 (the named 93-166 and a little more); not the rest.
- `src/browser/styles.css`: read lines 40-65 (the named 46-58 and a little more).
- `foundations/decisions.md`: D-253 (`:1739-1788`), D-262 (`:2887-2927`) were **not read** (the slice's *Read* names them; the change did not touch what they give, and D-323 and D-407 were read). `foundations/invariants.md:1228-1236` (`uncaught-failure-game-state`) was **not read**; I read the test that carries it in `uncaught-failure.test.mjs` and left every case of it untouched.
- `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`: read whole (in two parts each). `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`: read whole.
- `src/browser/view/last-resort.ts`: read whole.

## Searches not found or unclear

- The *Checks* ask the new case to fail first "where a variant's root takes the row down": on the old code nothing in the row depended on a root, so there was no such failure (see Checks). The first-failing-run of the method could not be shown; the mutation stands in its place.
- `guidelines/coding-browser-module.md` (rule examples, section "Gra na stronie i odpowiedzi serwera") and `guidelines/styleguide-browser-view.md` still say the row of the failure is the DOM `createFormWarning` or do not mention the new root; `coding-browser-module.md` line 346-356 says "Zdanie o awarii stoi w wierszu pod paskiem menu obok wiersza zapisu" which stays true. Guideline files change only through the maintain skills, so I left them; if the orchestrator wants the guideline to name the root of the failure row, it is for `the-way-maintain-coding-guidelines`.
- `git diff` shows no change to `tests/view/react-controls.test.mjs`, which still calls `createFormWarning` (slice 12 deletes it, per the handoff).

## Working copies

- `.runs/executor-10/` (the game's log and two screenshots): stood under the worktree's `.runs/`; removed.
- `.playwright-cli/` (the CLI's own files) at the worktree root: removed; the browser was closed with `playwright-cli close`, and the game stopped with `npm run local:stop` ("Local starts stopped: 1").
- Run logs `.runs/executor-10-*.log` and the mutation backup: removed.
- No remainder.
