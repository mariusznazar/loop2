# Report — executor of slice 6 (the saver's sentence as a value, drawn by the row of saving)

**Status:** done

## Commits and files

One commit, range start `f0e6eea9cbb0c7499045336d85b6ad21cd6995b0`:

- `51f26f01` `refactor: :recycle: give the saver's sentence as a value and draw the line of saving in a React root of its own (D-407, D-208)`

| File | Added / removed |
|---|---|
| `src/browser/view/game-saver.ts` | +31 / −12 |
| `src/browser/view/state-store.ts` | +6 / −3 |
| `src/browser/view/game-view.ts` | +9 / −3 |
| `src/browser/view/header-rows.tsx` (new) | +60 / 0 |
| `tests/view/game-saver.test.mjs` | +3 / −18 |

Total of the commit: 109 insertions, 36 deletions. The worktree is clean (`git status --short` empty).

## What was done

- `game-saver.ts`: builds no element and no longer imports `createFormWarning`. Its interface has `sentence(): string | null` and `subscribe(listener): () => void` in place of `element`. The sentence is held in a local `let`, changes only at creation (`afterConflict` gives the conflict sentence) and in the continuation of a save's answer (the former `warning.set(...)` calls, each replaced by `setSentence(...)` at the same place and in the same order), and the listeners are called only when the sentence really changes. `dispose()` clears the listeners. Every sentence and the moment it stands are as before.
- `state-store.ts`: `saveLine` is replaced by `saveSentence()` and `subscribeSaveSentence(listener)`, passed through to the saver.
- `header-rows.tsx` (new): `createSaveRow({ sentence, subscribe })`, the shape of `createMenuBar`. It makes its own host `div.save-line`, sets `hidden` on the host while the sentence is null, renders `ReactFormWarning` with `flushSync` at creation and at each change, and `dispose()` unsubscribes, unmounts and removes the host. A change after `dispose()` draws nothing. Slice 10 can add the row of the failure to this module.
- `game-view.ts`: creates the row from the store's two functions, `saveLine` of its interface is the row's host, and `dispose()` calls `saveRow.dispose()` in place of `store.saveLine.remove()`.
- `tests/view/game-saver.test.mjs`: `sentenceOf` reads `saver.sentence()`; the hand-made `FakeElement` and `fakeDocument.createElement` are removed (only the element needed them). Every expected sentence is as written. Ground: the saver builds no element (To do 2, Decision 7).
- `app.ts` and `styles.css` are untouched, as the slice says.

## Checks (command and exit code)

| Check | Result |
|---|---|
| `npm test -- tests/view/game-saver.test.mjs` after the test change, before the code (red) | exit 1 — 41 failing lines, every case on `TypeError: document.createElement is not a function` raised in `createFormWarning` called by the old `createGameSaver`: the saver still built its element, which the changed hand-made document no longer has |
| `npm test -- tests/view/game-saver.test.mjs` after the code | exit 0, 20 tests, 20 pass |
| `npm test -- tests/view/state-store.test.mjs` | exit 0, 12 pass |
| `npm test -- tests/view/previous-save.test.mjs` | exit 0, 44 pass |
| `npm test -- tests/view/account-screen.test.mjs` | exit 0, 131 pass |
| `npm test -- tests/view/uncaught-failure.test.mjs` | exit 0, 17 pass |
| `npm test -- tests/view/chronicle-game.test.mjs` | exit 0, 4 pass |
| `npm test -- tests/view/end-question.test.mjs` | exit 0, 17 pass |
| `npm test -- tests/view/end-window-game.test.mjs` | exit 0, 27 pass |
| `npm run typecheck` | exit 0 |
| `npx eslint` on the five changed files | exit 0 |
| `npx prettier --check` on the five changed files | exit 0 |
| The check in a real browser | done, below |

Not run: the product's whole `npm test` (the orchestrator's alone); `python -B .the-way/elements/common/foundation_check.py` (not asked for in the slice's *Checks*; red on this branch until slice 12 by the handoff, and the slice changes no foundation text and no guideline).

The red and the green run were two runs of the same command, one before and one after the code of the commit; the red run was made with the test change uncommitted, so no red commit stands in the history (a commit of the test alone would leave the gate red, and the slice names no test first as its own commit).

## Own-work check

- **Requirement most likely unmet:** the task's requirement that the header with no sentence keeps today's box, and that the sentence of a failed save still shows under the bar as before, now that the sentence stands in a `div` host and not in the element with the class `form-warning` itself (the hidden host must not leave a margin, and the host must not change the width or margin of the sentence).
- **Check:** the game run in a real browser (`npm run local`, Playwright CLI, an account with a made-up address at `example.test`), reading the header's geometry in the page; the failed save was brought about by aborting the `PUT /api/saved-game` request of the page with `page.route` (the local server was left running; a stop of it would have ended the HTTPS proxy too), then unrouted.
- **What it showed:**
  - Signed in, no sentence: header height 40.1875 px, equal to the bar's; the child `div.save-line` has `hidden=true`, computed `display: none`, height 0, and holds `<p class="form-warning" role="alert" hidden>`.
  - After „Załóż” of a character with the save aborted: the host shows, `display: block`, width 1248 px as the bar, height 18.1875 px, text „Nie udało się zapisać postępu. Gra spróbuje ponownie.”, holding `<p class="form-warning" role="alert">`; header height 66.375 px = bar 40.1875 + sentence 18.1875 + the `--space-s` bottom margin. I inspected a screenshot: the sentence stands under the bar in the warning colour, above the camp; it is kept nowhere and was not shown to the human (the foundation settles no place for it, the slice asks for none).
  - After unrouting, the retry (5 s) cleared it: host hidden, header 40.1875 px again.
  - The console held no line beginning `uncaught` or `saved-game-load`; the four errors were the 401 of the account request before sign-in, the 404 of the favicon and two `net::ERR_FAILED` of the aborted save requests.
  - The margin of the host is `header .save-line` (`0 auto var(--space-s)`, width 100%, max 1344 px), and the sentence inside has `.form-warning` margin 0, so the box is the one the element had when it carried both classes. `styles.css` needed no change.
- **Mutations in the head:** a host that stays visible when the sentence is null leaves a margin and fails `account-screen.test.mjs` (`saveLine(root)` is not null while it says nothing); a listener not called, or a sentence not read at the first render, fails the cases that read the line after an answer or after a conflict (`account-screen.test.mjs`, `previous-save.test.mjs`); a `setSentence` that notifies on an equal sentence changes nothing visible; a missing unsubscribing at `dispose()` leaves a listener the saver clears at its own `dispose()` and a guarded `draw`, and no test sees it (nothing visible; recorded as a gap, not protected).

## Reaches beyond the handoff

- `.the-way/task-cycle/change/slice.md` (named by `SKILL.md` section 1) and `.the-way/task-cycle/change/ui_check.md` (named by section 3), read whole.
- Lines 625–650 of `src/browser/styles.css` (the `.form-warning` rule) to check the box of the host against the old element; the handoff names lines 46–58 only.
- `tests/view/account-screen.test.mjs` lines 2095–2115 (the `saveLine` helper) and `tests/view/previous-save.test.mjs` lines 670–715 (reads `view.saveLine.textContent`, which the host still gives), to be sure the existing tests read the new host.

## Unread material

- The handoff's *Read* names `foundations/decisions.md` D-207 and D-209 whole, D-208, D-210 whole, D-97 and D-36 whole: all read whole. D-407 read whole.
- `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`: read whole (the first two in two reads).
- `spec.md:15-15`, `32-48`, `68-97`, `172-172`, `188-188`: read (I read lines 10–99 and 168–191, which include them).
- `menu-bar.tsx`, `controls/react-text-field.tsx`, `src/browser/AGENTS.md`, `.claude/skills/loop2-play/SKILL.md`: read whole.
- None left unread or read in part.

## Searches not found or unclear

- None. One thing recorded: `guidelines/coding-browser-module.md`'s table "Files of this kind" has no row for `header-rows.tsx` (a new file); the table's statuses are not to change in this change (spec, To do 8), and the slice's list of changes names no guideline, so I added nothing. Whether a check (the part map or the foundation check) wants a row is not known to me, since I did not run the foundation check; the orchestrator or slice 13 sees it.

## Choices made

- **Names of the saver's interface:** `sentence()` and `subscribe(listener)`; the store's `saveSentence()` and `subscribeSaveSentence(listener)`. Rejected: a read-only property `sentence` (the value changes, so a property would be a getter; a function is the plainer shape for a value read at each draw). Cost if wrong: a rename inside three modules.
- **No call to the listeners for an unchanged sentence.** Rejected: calling at every `setSentence`, which would render the same tree again at each successful save with no sentence. Cost if wrong: none the player sees; a test that expected a call at an equal value would fail, and none does.
- **Host hidden by the row itself** (`element.hidden`, set in `draw()` before the render), not by the page. Rejected: leaving the hiding to `ReactFormWarning`'s inner `hidden`, which would leave the host's bottom margin in the header while there is no sentence. Cost if wrong: a header 8 px taller with no sentence; the browser check measured the height equal to the bar's.
- **`createSaveRow` takes the two functions** (`sentence`, `subscribe`) and not the store or the saver, so the module knows neither; `game-view.ts` passes the store's.

## Adaptations of the plan to the code

- None structural. `GameSaver.element` and `StateStore.saveLine` were both replaced as the plan says; `GameView.saveLine` stays `HTMLElement`.

## Problems observed

- None.

## Working copies

- `.runs/executor-6/` (logs of the checks, a screenshot): removed. Findings are in this report.
- `.playwright-cli/` (the Playwright CLI's files): removed; the browser was closed with `playwright-cli close` and `npm run local:stop` (answer: `Local starts stopped: 1`). The database of the start stays under `.runs/local-start/`, which the product's own tool makes and removes at a later start.
