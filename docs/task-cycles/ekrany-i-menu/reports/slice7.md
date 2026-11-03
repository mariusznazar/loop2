# Report — slice 7, The page under the menu bar

**Status:** done with concerns (the concerns are listed under *Problems observed*; none blocks the slice).

**Commit:** `ff62598` on `task/ekrany-i-menu` (base of the slice `6dc4819`). No uncommitted tracked change.

## What changed and why

Files (added/removed lines from `git show --stat`; 450 added, 560 removed in all):

| File | Lines |
|---|---|
| `src/browser/view/app.ts` | 106 changed |
| `src/browser/view/email-status.ts` | 89 changed (DOM row removed) |
| `tests/view/email-status.test.mjs` | 324 changed (DOM cases removed) |
| `tests/view/account-screen.test.mjs` | 326 changed |
| `src/browser/kitchen-sink/kitchen-sink.ts` | 89 changed |
| `src/browser/kitchen-sink/kitchen-sink.css` | 14 changed |
| `src/browser/styles.css` | 62 changed |
| `src/browser/view/menu-bar.tsx` | not changed (see *Choices made*) |

- `app.ts`: the header holds `createMenuBar(...)` in place of the `<h1>` title, `Wyloguj` and the
  row of `email-status.ts`. `NAME_ALONE` props (account `null`) stand on every waiting screen, so
  the bar holds the name alone (D-262, row 6); over the game `drawBar()` gives the bar the account,
  `screen: { kind: "headquarters" }`, no return entry (until Slice 8), `registrationMessage` (the
  message of the registration, `barMessage`) and `logout: { waiting, sentence }`. The page still
  runs the logout (`logOut()`, saving first, the deferral of the saver's outcomes unchanged); it
  sets `logoutWaiting` and, after a logout of uncertain outcome, `logoutSentence`, and redraws the
  bar. A failed save before a logout stays in `saveLine` under the bar (D-97, D-208); `dropGame()`
  resets the logout state and sets the bar back to the name alone, so a new player gets a closed
  menu of their own. `saveLine` is appended to the header after the bar.
- `email-status.ts`: only the pure sentences (`Sentence`, `UNCONFIRMED_SENTENCE`, `messageSentence`);
  `createEmailStatus` and `EmailStatus` are gone, and with them the imports of the shared button.
- `styles.css`: `.app-main` and `footer` are at most 1344 px and the full width of a narrower
  window (D-280, D-43 layout dimension); `header .save-line` is as wide as the content; the header's
  flex layout and the `.email-status*` rules are removed.
- `kitchen-sink.ts` / `.css`: the section of the header row is now the part of the menu „Konto” for
  an unconfirmed address, built from `createButton` / `setButtonWaiting` and `messageSentence` /
  `UNCONFIRMED_SENTENCE` with the `account-menu*` classes, in three samples (waiting, at the limit,
  after a failed sending); it imports no `.tsx` file; its heading says „bez Reacta” and the module's
  comment says why (D-269).
- Tests: see *Tests*.

## Tests

- `tests/view/email-status.test.mjs` keeps the case of the sentences and adds two small cases on
  the sentences (the address is interpolated; `UNCONFIRMED_SENTENCE` is in `text-secondary`). It
  drops the seven cases of the DOM row; the file's header comment names the reason: the cases of
  `tests/view/menu-bar.test.mjs` carry that behaviour (lines 378, 395, 413, 469, 509, 564 and 245
  of that file: the sentence and button of an unconfirmed address, the registration's outcome, the
  waiting send, a failure of the client, an address already confirmed, an answer after dispose).
- `tests/view/account-screen.test.mjs`, each change with its reason in a comment or in the name:
  - helpers `accountButton`, `openMenu`, `logoutOf`, `menuSentences`, `assertNameAloneOnBar`;
  - every `Wyloguj` case opens the menu „Konto” first and presses through `inAct` (the menu is
    closed until opened, and an update outside `act` fails a case);
  - the vacuous `!shown(buttonNamed(root, "Wyloguj"))` checks became `assertNameAloneOnBar` (bar
    holds the name alone, no „Konto”);
  - the cases of the unconfirmed address go through the menu: closed menu shows nothing and the
    closed bar's text is only the name, the items and „Konto”; open menu holds address, sentence,
    „Wyślij ponownie”, „Wyloguj” in that order; the registration outcome starts the sentence; a
    send waits, the menu stays open after the answer, focus returns to the button; sign-in again
    gives one closed menu;
  - the uncertain logout case: the sentence is in the open menu in `warning`, no alert in the
    header, „Wyloguj” usable with focus, a new request clears the sentence while it waits;
  - the failed save: the line stands as the second child of the header after the bar host, outside
    `.account-menu`, with the menu closed; the failed save before a logout leaves the menu with no
    sentence;
  - a new case: the header holds the bar — the name alone on the session check, the warning with a
    retry and the wait for the saved game state, then the items „Siedziba” `#/` and „Programy”
    `#/programy`, Siedziba `aria-current`, no title in the header, „Konto” closed;
  - the two cases that replace `globalThis.performance` with `{ now }` give the stand-in
    `measure` and `clearMeasures` (`handClock`): React's development build calls them while the
    bar renders;
  - the click on „8×” in the case of the logout under way is pressed through `act` and the case
    asserts that it closes the open menu (a click outside closes it, D-285);
  - the case on the resurrection line expected the wording before `edb2862` (see *Problems*); its
    two expectations now carry „czasu realnego”, the wording of D-217.

## Checks (command and exit code)

Red before the code (`npm test -- tests/view/account-screen.test.mjs`, the tests changed and the
page not): exit 1, 23 failures, each for the expected reason (no „Konto” on the bar: `the bar holds
„Konto”: expected a true value, got undefined`, and the name-alone bar missing).

After the code, run again at the end (the commit's tree):

| Command | Exit |
|---|---|
| `npx prettier --no-config --no-editorconfig --ignore-path .gitignore --check src/browser tests/view` | 0 |
| `npm test -- tests/view/account-screen.test.mjs` | 0 (101 pass) |
| `npm test -- tests/view/email-status.test.mjs` | 0 (3 pass) |
| `npm test -- tests/view/menu-bar.test.mjs` | 0 (28 pass) |
| `node scripts/kitchen-sink.mjs --build-only` | 0 |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 |
| `npm run typecheck` | 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 |

Invariant test seen failing once: `npm test -- tests/invariants/test_browser_view_token_values.py`
exit 1 on my first heading of the kitchen-sink section (a literal that held the word „Menu”, which
the test reads as a system colour: `kitchen-sink.ts: line 497: in a literal: the colour Menu`); after
the heading was reworded without the word, the same command exit 0. This is a failure of my own
first draft, not of an invariant's test written first.

Not run: the full `npm test` and `foundation_check.py` (the orchestrator's gate, as the handoff
says). The plan's *Checks* name no full-suite command, so no mismatch there.

## Screenshot of the running product (ui_check)

Done through the settled route (`npm run local`, Playwright CLI, an account through the login
card, then `npm run local:stop` and `playwright-cli close`; `.playwright-cli/` deleted):
- At 1920×900 over the game: the bar at the top (name, „Siedziba” marked with the line, „Programy”,
  „Konto” at the right edge), the content and the footer both starting where the bar starts and no
  wider than 1344 px; the open menu holds the address, the registration's outcome „Nie udało się
  wysłać wiadomości. Spróbuj ponownie później.” in `warning`, „Wyślij ponownie” and „Wyloguj”
  (the mail failure of a local start is expected, as the skill says).
- „Wyślij ponownie” answered and the menu stayed open with the sentence; „Wyloguj” returned the
  login card.
- The kitchen-sink page (static copy of `dist/kitchen-sink` on a local port): the three samples of
  the part of the menu; the first draft overflowed the sample panel (`width: max-content` of the
  real block), fixed in `kitchen-sink.css` and seen again.
- Not checked by screenshot: a window narrower than 1344 px (the width of the content there), the
  states of hover and focus of the bar, the page while `Wyloguj` waits.

## The own-work check (section 3)

- **Requirement most likely missed:** the sentence of an uncertain logout has to stand in the
  *open* menu and the menu must not close by itself (To do 9, D-285), while the sentence of a
  *failed save* before a logout has to stand under the bar and not in the menu (To do 10, D-97,
  D-208); and the two must not mix after a retry.
- **Check:** the cases „a logout whose outcome is uncertain keeps the game with its sentence in the
  open menu „Konto”…” (the menu open after the answer, `menuSentences` equal to the client's
  message, role `warning`, no alert in the header, focus on „Wyloguj”, a new request clears the
  sentence while it waits) and „„Wyloguj” saves first and goes on, stays or ends each way its
  save's outcome gives” (the failed save: `saveLine` holds „Nie udało się zapisać postępu. Spróbuj
  wylogować się ponownie.”, `menuSentences` is empty, the menu open, focus on „Wyloguj”).
- **What it showed:** both pass (account-screen: exit 0). The same check also caught a React
  warning the first run missed: a click outside the open menu, fired without `act`, is a state
  update outside `act` (that case now presses through `act` and asserts the menu closes).

Mutations I considered and the case that catches each: `logoutSentence` not cleared at a new
request (the new-request case); `dropGame` not resetting `logoutWaiting` (the sign-in-again cases
would show a waiting button); the registration message not given to the bar (the three-outcome
case); `drawBar` giving `screen: null` (the `aria-current` case); `saveLine` appended into the
menu (the header-order case); the line of saving shown only with the menu open (the case asserts
it shows with the menu closed). Not caught by any case: `max-width: 1344px` of `.app-main` and of
`footer` (jsdom computes no layout; guidelines/testing.md leaves exact layouts to the browser
check, which the screenshot above did).

## Choices made beyond the plan

1. **Footer at the same width.** `footer` got `width: 100%; max-width: 1344px; margin: auto`, the
   same as `.app-main`: otherwise its line and credits start at the window's edge while the
   content starts at the bar's. Rejected: leaving the footer full width. Cost if wrong: one rule in
   `styles.css`.
2. **`header` flex layout removed.** The header is a plain block now; `header h1` stays for the
   kitchen-sink page's own title. Cost if wrong: none seen (the screenshot shows the bar and the
   line of saving as intended).
3. **`menu-bar.tsx` not changed.** The slice's *Change* names it, but nothing in the page's use of
   it needed a change: the page passes through the name-alone state between players, so the
   menu's state never outlives a player, and the bar's own focus return after a waiting logout
   already exists. Rejected: keying the menu by account id (not needed by any path of the page).
4. **Kitchen-sink sample structure.** The part holds the address, the sentence and „Wyślij
   ponownie” (no „Wyloguj”, because the styleguide rule names the part for an unconfirmed address
   with the button and the sentence), inside `.account-menu-block` made static and as wide as the
   sample (`.menu-sample` rule in `kitchen-sink.css`). Heading: „„Konto” z niepotwierdzonym
   adresem: część z postaci DOM kontrolek, bez Reacta” — the word „menu” cannot stand in a
   literal of the page (`browser-view-token-values` reads it as a system colour).
5. **Pre-existing stale case fixed.** See *Problems observed* 1.

## Reaches beyond the handoff

- No reach in the foundation beyond the entries and passages the handoff names.
- `src/browser/view/headquarters.ts` (grep and `git show edb2862 -- ...headquarters.ts`), to find
  why a case of `account-screen.test.mjs` failed at the base; `git log -S"czasu realnego"`.
- `tests/view/clock.test.mjs` (grep only) for the other `performance` replacement; it renders no
  React, so it is left.
- `node_modules/react-dom/cjs/react-dom-client.development.js:18640-18660` and `:28165-28180`, to
  learn why `{ now }` as `performance` broke React's render (it calls `performance.measure`).
- `.claude/skills/loop2-play/SKILL.md`, whole, for the screenshot route (named in the handoff).
- `tests/view/menu-bar.test.mjs` (whole listing of case names and lines 1-125), to map the dropped
  cases of `email-status.test.mjs` to the cases that carry them.

## Mismatches of plan and code

- None structural. The plan names `menu-bar.tsx` in *Change*; it needed no change (choice 3).
- The plan's statement that the cases of `account-screen.test.mjs` change "about the header,
  „Wyloguj” and the row of an unconfirmed address" was not the whole of it: the page now renders
  React at every signed-in screen, so two cases that stand in for `performance` and a case that
  clicks outside an open menu also had to change (see *Tests*).

## Problems observed

1. **A red case at the slice's base.** `npm test -- tests/view/account-screen.test.mjs` at
   `6dc4819` (run with my changes stashed) exits 1 with one failing case: „a clock tick rewrites
   the resurrection line of the headquarters…”, expected `Wskrzeszenie za 1 godz. 0 min — śmierć
   zabierze wprawę i wykupione stopnie`, got `… za 1 godz. 0 min czasu realnego — …`. Verified
   cause: `edb2862` (Slice 5) changed `resurrectionLine` in `headquarters.ts` to the wording of
   D-217 and updated `tests/view/headquarters.test.mjs` but not this file's two expectations
   (lines of `Wskrzeszenie za 1 godz. 0 min` and `Wskrzeszenie za 59 min`). I changed those two
   expectations to the D-217 wording (decision text at `foundations/decisions.md:4001`), because
   the file is in my *Change* and the focused check of the slice could not pass otherwise.
2. **Cost of D-285 on the uncertain logout (not a defect of the code, a consequence worth
   knowing).** The sentence of an uncertain logout stands in the menu only. The menu stays open
   while „Wyloguj” waits, so the player reads it, unless they click outside during the wait (that
   closes the menu, by D-285); then the sentence waits in the closed menu until they open „Konto”.
   Before the change the warning stood in the header at all times. D-285 names the same cost for
   „Wyślij ponownie”; no change made.
3. `guidelines/coding-browser-module.md` still lists `src/browser/view/email-status.ts` as
   `do not copy`; the file builds no DOM now. Not in this slice's files; left for the orchestrator
   to decide.

## Searches not found or unclear

- None unresolved. (The handoff's line ranges of the foundation matched the files; every entry it
  named was found.)
