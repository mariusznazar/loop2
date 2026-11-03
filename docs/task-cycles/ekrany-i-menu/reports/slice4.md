# Slice 4 report — The menu bar in React

**Status:** done with concerns (the concerns are the unchecked screenshot and two points under *Choices made*/*Mismatches*, none blocks).

## Commits

- `240d639` feat: :sparkles: add the menu bar in React with the menu „Konto”, its keyboard and the request for another confirmation message (branch `task/ekrany-i-menu`, from `fa6b322`; not pushed; no uncommitted tracked change).

## Files changed

| File | Added / removed |
|---|---|
| `src/browser/view/menu-bar.tsx` (new) | 335 / 0 |
| `tests/view/menu-bar.test.mjs` (new) | 672 / 0 |
| `src/browser/styles.css` | 103 / 0 |

## What changed and why

`src/browser/view/menu-bar.tsx` — the boundary `createMenuBar({ client, onLogout, props })` built after `createAccountCard` (D-36): its own element (`div.menu-bar-host`), synchronous first render through `flushSync`, `update(props)` (draws anew through the same root; ignored after `dispose`), `dispose()`.

- `MenuBarProps` (the page gives it whole on each `update`): `account` (null = waiting screen, the bar holds the name alone), `screen` (the item is read through Slice 3's `markedMenuItem`; null marks none), `returnEntry` (Slice 3's `ReturnEntry`; null = no link), `registrationMessage` (read when the player's menu first stands), `logout: { waiting, sentence }` (the page runs the logout, D-97).
- Over the game: name (`span.menu-bar-name`), `a.menu-bar-item` links „Siedziba” `#/` and „Programy” `#/programy` (addresses from `screenAddress`, no icons), the marked one with `aria-current="page"`, the return link with the page's text and address, then the menu „Konto” at the right.
- Menu „Konto” (`AccountMenu`): `ReactButton` `Konto` with `expanded`; the open block (`div.account-menu-block`) holds the address, for an unconfirmed address the sentence (`messageSentence` / `UNCONFIRMED_SENTENCE` from `email-status.ts`, left unchanged) above „Wyślij ponownie” (waits as „Wysyłanie…”), and „Wyloguj” (plain `ReactButton`, waits as „Wylogowywanie…” from `logout.waiting`, the page's sentence under it in `warning`).
- The bar sends „Wyślij ponownie” through `client.sendConfirmationMessage`, numbered (`latest`), only the last answer acts, a leaving menu takes a number too; `email-already-confirmed` removes sentence and button; focus returns to „Wyślij ponownie” after an answer (to „Konto” after the confirmed answer, see *Choices made*).
- Opening: click (Enter and Space are the native button's own click). Closing: Escape, a click outside the menu, a second click on „Konto”, focus on „Konto” each time. The document's `keydown` and `click` listeners stand in one `useEffect([open])` with cleanup (D-267). The menu stays open while „Wyloguj”/„Wyślij ponownie” waits and after the answer. No arrow keys.
- After „Wyloguj” finishes waiting and the bar still stands (uncertain logout), focus returns to „Wyloguj” (the old header did the same).

`src/browser/styles.css` — `.menu-bar*`, `.account-menu*` rules from the styleguide rule *Menu bar, the menu „Konto” and the list of programs*, tokens only: items drawn as tabs (text `text-label`; marked `text-strong` + emphasis weight + `selected` line of `--bar-width` at the bottom; hover `highlight` with the role of the text kept), block on `panel`/`text` with `divider` frame, sentence `text-secondary` / `warning`, bar `max-width: 1344px` (layout dimension, D-43).

`tests/view/menu-bar.test.mjs` — 28 cases on jsdom through `page-document.mjs` (D-264).

## Checks (command, exit code)

Failing runs first (test first, with a stub of `menu-bar.tsx` that had a „Konto” toggle and a „Wyślij ponownie” that closed the menu on the answer, no Escape):

- `npm test -- tests/view/menu-bar.test.mjs` against the stub — exit 1; `Escape closes the menu and focus lands on „Konto”` failed at its assertion (`expected false, got true`, `menu-bar.test.mjs:259` at that time) and `the menu stays open after the answer to „Wyślij ponownie” until the player closes it` failed at its assertion (`expected true, got false`, line 436 at that time). (An earlier stub with no „Konto” button stopped on a missing element; replaced so that the cases reach assertions.)

After the implementation (final state, commit `240d639`):

- `npm test -- tests/view/menu-bar.test.mjs` — exit 0 (28 pass).
- `npm run typecheck` — exit 0.
- `npm test -- tests/invariants/test_browser_view_token_values.py` — exit 0 (failed once, exit 1, on `aria-label="Menu główne"`: the scan reads the word `Menu` as a system colour; changed the label to `Nawigacja`, then exit 0).
- `npm test -- tests/invariants/test_browser_view_focus_outline.py` — exit 0.
- `npm test -- tests/invariants/test_browser_view_framework.py` — exit 0.
- `npm test -- tests/invariants/test_content_identifiers.py` — exit 0.
- `npm test -- tests/quality/test_quality_invariants.py` — exit 0 (failed once, exit 1, on ESLint `no-undef` for `document` in the new test; took `document` from `withPage`'s argument, then exit 0).
- `npx prettier --no-config --no-editorconfig --ignore-path .gitignore --check` on the three files — exit 0.

Not run: `npm test` without an argument (the full gate) and `foundation_check.py` — not named by the slice (orchestrator's).
Screenshot of the running product: **unchecked** — the bar is not wired into the page until Slice 7, so no route of `loop2-play` reaches it; the states are checked in code (styleguide states of the items, menu and buttons are in the CSS and the test cases). The orchestrator's walk through the real browser must cover: real Enter/Space on „Konto”, Tab order, focus ring on the items and the menu's controls, the block's position under „Konto” and over the content, `z-index`, and that a click on an item of the bar moves focus to „Konto” (see *Choices made*).

## Own-work check

Requirement most likely missed: D-285 — focus returns to „Konto” on every closing way, and the menu stays open while „Wyloguj”/„Wyślij ponownie” waits and after the answer (the part of the task the document imitation hides). Checks: the two cases that failed first (above); the closing cases for Escape, a click outside, a click on an item of the bar and a second click (the last with focus moved away first, as a browser that does not focus a button on click leaves it); the open-through-wait cases; plus three deliberate breaks of the code, each caught: removing the focus call on closing (3 cases failed), removing the `keydown` listener cleanup (1 case: a closed menu took focus on Escape), disabling the focus return after „Wyloguj” (1 case). Code restored after each break (committed code is the unbroken one).

Mutations thought through and not caught by a test: the `latest.current += 1` cleanup and the `sendingNow` guard have no behaviour a test can see (a state update on an unmounted menu does nothing, and React does not call `onClick` of a disabled button), so they stay as defence the spec asks for (numbered sendings, only the last answer acts).

## Choices made (beyond the handoff's rulings)

- **Focus on every closing way, as D-285 says**, also on a click outside: a click on a link of the bar or on a field elsewhere moves focus to „Konto”. Rejected: focus to „Konto” only for Escape and the second click (the examples D-285 gives) — D-285's sentence names all three ways. Cost if wrong: a click on a text field elsewhere on the page, while the menu is open, loses the field's focus. Only the real browser shows how it feels.
- **After the server answers `email-already-confirmed`** the sentence and button are gone and the disabled button had the focus; focus goes to „Konto” (menu still open) instead of falling to the page. Nothing in the task says; rejected: leaving focus lost (as the old row did). Cost if wrong: one focus move more.
- **An answer that comes while the menu is closed** is kept and shown when the menu is opened again; it takes no focus (focus moves only while the menu stands open).
- **The name is a `span`**, not a heading; **the bar is a `nav` with `aria-label="Nawigacja"`** over the game, a plain `div` on a waiting screen. Name size `--font-size-heading` (the styleguide gives no size). The word `Menu` is avoided in the label because of the token-values scan.
- **The bar is `width: 100%; max-width: 1344px; margin: 0 auto`** so its name and „Konto” align with the content under it. The content-width rule itself (the 1344 px of the content under the bar) is not written here: the slice's *Change* names no screen shell, so Slice 7 (the page) owns it; no unused rule left behind.
- **Item layout:** the items stand in `.menu-bar-items` after the name; „Konto” sits at the right with `margin-left: auto`. The item hover and marked look use the tab look (D-276) with a `padding` in tokens, `text-decoration: none`.
- **Block placement:** `position: absolute; top: 100%; right: 0; z-index: 1` under „Konto”; `width: max-content`, `max-width: calc(100vw - 2 * var(--space-l))`. Not seen in a browser.
- **`registrationMessage` is a prop read at the first stand of a player's menu**, not an option: the bar may stand across sign-outs, and a sign-out (`account: null`) unmounts the menu so a new player starts with a closed menu and no sentence of the one before (tested).

## Reaches beyond the handoff

- `src/browser/view/app.ts:105-200, 395-450` (read): to see what the page's old „Wyloguj” does after an uncertain logout, to read "the sentence after an uncertain logout" as `client.logout()`'s failure message, and the focus calls the old header made.
- `src/browser/styles.css:1-270` and `tests/view/account-screen.test.mjs:1-125` (read): the existing tab/button rules to reuse and the jsdom helpers' use (`press`, `inAct` for creating and disposing).
- `foundations/decisions.md:5709-5735` D-275 (read): its example „Wyloguj” in „Konto” kept a plain button.
- `tests/invariants/test_browser_view_token_values.py` (grep for `z-index`): to check that a unitless `z-index` is not flagged; the run then passed.

## Mismatches of plan and code

- The styleguide rule *The kitchen-sink page* (and D-157's verification) speak of a part of the menu „Konto” for an unconfirmed address on the kitchen-sink page. The slice's *Change* names no file of `src/browser/kitchen-sink/`, and D-269/`coding-browser-module.md` forbid a `.tsx` module on that page; I did not touch it. A later slice (or the task's kitchen-sink row) has to build that sample from the DOM forms of the controls, with the classes `account-menu*` this slice's CSS gives.
- Small: the plan says „Wyloguj” is "a plain shared button"; `ReactButton` without a `kind` is the plain one, so no change to Slice 2 was needed.

## Searches not found or unclear

- The sentence the page gives "after an uncertain logout" (plan text) — read as `logoutWarning` of the old header (`client.logout()` failure message), shown by the bar in the menu next to „Wyloguj”; the save-failure warning of D-97/D-208 stays with the page under the bar (styleguide), not passed to this bar. Unclear: whether the page's `logout.sentence` might also have to carry that second sentence; I read the styleguide and the task as saying no.
- The size and position of the name, the block and the bar's items are not stated by the styleguide beyond the orchestrator's layout ruling (see *Choices made*).
- No file shows the width of the content under the bar yet (1344 px, D-280); expected in Slice 7.
