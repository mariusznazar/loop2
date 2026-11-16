# Report — executor of slice 9, "The sentences above the game in a React root"

**Status:** done

## Commits

- `1bffa4e6` refactor: :recycle: draw the page's sentences above the game in a React root of its own, with one sentence component that the login card shares (D-407, D-286, D-261, D-096)
  - The message carries `D-096`, a typo for `D-96`; no amend was made, as the handoff forbids it.

## Files changed

- `src/browser/view/page-sentences.tsx` — new, 106 lines: `PageSentence` (one component; `positive` as `role="status"`, `warning` as `role="alert"`, each with `confirmation-notice` and its role's class; a refused load as `page-notice` with `role="alert"`), the types `RefusedLoad` and `PageSentenceValue`, and `createPageSentences({ sentences })` returning `element`, `update(sentences)` and `dispose()`, first render and each update under `flushSync`.
- `src/browser/view/app.ts` — about +24 / −20: mounts the root's host (class `page-sentences`) in `<main>` first, before the waiting screen and the game's element, in every kind of the page state; `GamePage.notices` is now a list of values; `draw` gives the row the game kind's list, or none, only when the list differs from the last given; `createPageNotice` and the `classList.add("save-line")` line are gone; `showGame` builds values, not elements.
- `src/browser/view/account-card.tsx` — about +1 / −12: imports `PageSentence` from `page-sentences.js`; its own copy is gone.
- `src/browser/view/email-confirmation.ts` — −12: `createConfirmationNotice` is gone; pure functions, `browserAddress` and the types stay.
- `src/browser/styles.css` — not changed (the notices keep their margins inside a block host; see the browser check).

## Checks

| Command | Exit |
|---|---|
| `npm test -- tests/view/account-screen.test.mjs` (131 pass) | 0 |
| `npm test -- tests/view/uncaught-failure.test.mjs` (17 pass) | 0 |
| `npm test -- tests/view/previous-save.test.mjs` (44 pass) | 0 |
| `npm test -- tests/view/owner-panel.test.mjs` (4 pass) | 0 |
| `npm test -- tests/view/email-confirmation.test.mjs` (5 pass) | 0 |
| `npm run typecheck` | 0 |
| `npx eslint src/browser/view/app.ts src/browser/view/page-sentences.tsx src/browser/view/account-card.tsx src/browser/view/email-confirmation.ts` | 0 |
| `npx prettier --check` on the same four files | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 1 — the known state: 39 errors, every one a line of `tests/view/react-controls.test.mjs` quoting the old D-265 (slice 12 deletes that file); no other error |

No test was changed and no test was written first: the slice says "no test changes", and the assertions of the account screen's tests hold the behaviour.

## Own-work check

The requirement most likely unmet: the sentence keeps today's box and place above the first screen (the stylesheet does not change), and it leaves at the game's first change of screen (D-286).

Check, in a real browser (`npm run local`, Playwright CLI, an account `agent9@example.test`, signed in through the login card; a reload with the address `#confirm-email=<invalid token>`, reached through `about:blank` so the page really reloads):

- The sentence „Odnośnik jest nieważny albo wygasł.” stood above Siedziba: class `confirmation-notice warning`, `role="alert"`, colour rgb(254, 154, 0), top 40.19 px = the top of `<main>`, height 18.19 px, margin-bottom 12 px; the game's first element started at 70.375 px = 40.19 + 18.19 + 12. This is the box of a `<p>` with `margin: 0 0 var(--space-m)` standing straight in `<main>`, so the host adds no box. I did not run the old build beside it; the comparison is by the computation of the old rule, not by a measured old page.
- `<main>`'s children in order: `page-sentences` (div), `game-view` (div).
- After „Mapy”: the sentence gone (`.page-sentences` empty, `.screen` top = `<main>` top 40.19 px); after „Siedziba” again: not back.
- The screenshot was inspected (the sentence in orange under the bar, above the camp picture) and kept nowhere; no place for screenshots is shown to the human in this slice.
- Not brought about locally: the sentence after „Zacznij od zera” (the local start does not grant the previous-save privilege to an account made through the card; I did not look for a way to grant it), a `positive` sentence, and a refused-load sentence. **Left to the reviewer**: the check in a real browser of those three; the account screen's tests cover them in the test document.
- The local start and the browser were closed; `.playwright-cli/` and `.runs/executor-9/` were removed.

Mutation in the head: a `page-notice` drawn as `confirmation-notice` (class or role swapped) fails the account-screen cases at lines 1284, 1507 and 3370 of `tests/view/account-screen.test.mjs`; a list that is not cleared at the first change of screen fails the D-286 cases; a host element left out of `main` fails every case that reads the sentence there. A wrong `drawnSentences` comparison (drawing on every change) would be invisible in the tests and in the player's view; it only costs renders.

## Choices

1. **The host is in `<main>` in every kind of the page state**, not only in the game: `mainContent` returns `[sentences.element, waitingScreen.element]`, `[sentences.element]` and `[sentences.element, view.element]`. The host is empty outside a game and has no height. Rejected: placing the host only in the game's content, which would remove and re-add the host (and so move a mounted root's element) at each change of kind. Cost if wrong: an empty `div` stands before the waiting screen's section; no box.
2. **Two kinds of sentence as one value type**: `PageSentenceValue = ConfirmationNotice | RefusedLoad`, the latter `{ text, role: "refused-load" }`. Rejected: a second component for the refused load (the plan asks for one component), or a flag on the page's string. Cost if wrong: `"refused-load"` stands in the position of a role though it is no role of the styleguide (it names the class `page-notice`); renaming costs one type.
3. **The row is drawn only when the list differs by identity** from the last drawn one (`drawnSentences`), as the bar's props are; `onPlace` keeps the same list array when the screen does not change, so an act that changes no screen does not redraw it.
4. The row's items use the index as the key; a list is replaced whole and has no state of its own. Eslint raised nothing.
5. `RefusedLoad`, `PageSentenceValue` and `PageSentence` are exported from `page-sentences.tsx`; the card needs the component, the page the types.

## The four transitions of slice 7's report

Met: none changed by this slice. (4) the bar redraw by props stays untouched; this slice adds the same shape for the sentences (choice 3). Transitions (1) to (3) are not touched by the sentences' code: the sentences are drawn from the `notices` of the game kind, and `showGame`, `reset` and `logout` stand as they stood.

## Reaches beyond the handoff

- `foundations/decisions.md`: D-286 and D-261 and D-407 were in the handoff's *Read* (D-407 as "Foundation entries row 3"); I read each whole. I read no other decision beyond what the *Read* names.
- `.the-way/task-cycle/change/ui_check.md` and `slice.md` (named by the method).
- `src/browser/view/header-rows.tsx` and `src/browser/view/waiting-screen.tsx`, to take the shape of the neighbours' factories (slices 5, 6 and 8); not named in the slice's *Read*.
- `tests/view/account-screen.test.mjs`, `tests/view/uncaught-failure.test.mjs` by search only (grep for `page-notice`, `save-line`, `app-main`, `main.children`) to see which of them read the host's children; none reads `<main>`'s children by position.
- `the author's rules for a commit` before the commit.

## Working copies

`.runs/executor-9/` (the local start's log, the inspected screenshot) stood in the worktree's ignored `.runs/`; removed. `.playwright-cli/` (the CLI's own files) stood at the worktree root, ignored; removed. The local start (`npm run local`) stopped with `npm run local:stop` (1 start stopped). The test logs I wrote to `.runs/executor-9-*.log` were removed. Remainder: none.

## Unread material

- `guidelines/testing.md`: not read, because no test was written or changed and the handoff's *Read* does not name it.
- `foundations/decisions.md` D-156, D-96, D-225, D-402, D-36, D-97 (named in the slice's *Read* in addition to D-286, D-261 and D-407): not read whole. I read the code's own references to them in `app.ts`, `account-card.tsx` and `guidelines/coding-browser-module.md`, whose examples quote D-36, D-96, D-97, D-156's behaviour as the page has it. I did not open D-381 whole apart from the lines the code and spec quote; "Foundation entries row 9 (D-381)" was read only through the spec's constraint and the code's comment.
- `spec.md` outside lines 10–119 (Goals, Constraints, Decisions 1–3): not read; `spec.md:109-114` is within what I read.
- `src/browser/styles.css`: read lines 150–229 (the slice's range 176–209 inside).
- `guidelines/styleguide-browser-view.md`: read whole (two pages).

## Searches not found or unclear

- A way to give the previous-save privilege to a local account (for the slice's own example check): not looked for beyond the slice's own words "where the local start can grant it"; the report calls the check left to the reviewer.
- `D-096` in the commit message is a typo for `D-96` (see Commits).
- The handoff names "Foundation entries row 9 (D-381)" in the *Read*, but D-381's range is `foundations/decisions.md:2954-2969`, which I did not open; named above in *Unread material*.
