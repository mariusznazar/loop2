# Spec — loop2: dokończyć przejście widoku na React

- Task: `docs/task-cycles/przejscie-widoku-na-react/task.md`
- Open choice: where the sentence „Coś w grze się zepsuło — odśwież stronę.” stands once the start page is drawn by React in roots of its own, so that an error in any root does not take it down (the task's *Questions carried to cycle*); beside it, the shape of the one value of the page's state in `startApp` (To do 3), the roots of the start page and their order (To do 2, settlement 3), and the way `scripts/kitchen-sink.mjs` bundles the page (To do 1, settlement 1).

## Intent

The browser view builds its screens two ways at once: the game's screens are React components, while the start page of `src/browser/view/app.ts`, the line of saving of `game-saver.ts` and the sentence of an address confirmation of `email-confirmation.ts` build elements through the DOM APIs. So every shared control lives twice in `src/browser/view/controls/`, a 1335-line test keeps the two alike, and the kitchen-sink page shows the DOM forms the player never gets. This change draws the start page in React, in roots of its own, makes the page's state one value, gives each shared control its one React form, deletes the DOM forms and the comparison test, and bundles the kitchen-sink page so that it shows the React forms. The player sees the same texts, roles, places and focus as today, except that after an error nothing handled the waiting screen at which a sign-in stays shows the sentence of the failure alone (loop2#62-5).

## Goals and non-goals

Goals — the eight items of *To do*, each with where it shows in the code and what stays untouched:

1. **The kitchen-sink page bundled, React forms on it.** Shows in `scripts/kitchen-sink.mjs` (its build lines only), `tsconfig.kitchen-sink.json`, `src/browser/kitchen-sink/kitchen-sink.ts` (rewritten as a `.tsx` module), `src/browser/kitchen-sink/kitchen-sink.css` (the selectors of the forced hover and focus samples) and `src/browser/view/controls/react-number-field.tsx` (one optional prop, Decision 6). Untouched: the lines of `scripts/kitchen-sink.mjs` that serve files and open the browser, `src/browser/kitchen-sink/index.html` (the script path stays `/kitchen-sink/kitchen-sink.js`), `scripts/build.mjs`, `scripts/static-files.mjs`, `package.json`, `tests/invariants/test_application_build_kitchen_sink.py`.
2. **The start page drawn in React, in roots of its own.** Shows in `app.ts`, in new `.tsx` modules of `src/browser/view/` for the waiting screen, the page's sentences above the game and the two warning rows of the header (Decision 2), in `game-saver.ts`, `state-store.ts` and `game-view.ts` (the line of saving as a value and its root), in `account-card.tsx` (its page sentence component moves to the shared module of the page's sentences) and in `email-confirmation.ts` (`createConfirmationNotice` goes; its pure functions and `browserAddress` stay). Untouched: `menu-bar.tsx`, `screen-registry.ts`, every game screen and entry, `last-resort.ts`, `main.ts`, `src/browser/index.html`; in `src/browser/styles.css` only what is needed so the new hosts of the rows keep today's box (Constraints).
3. **The page's state one value.** Shows in `app.ts` alone (Decision 3). Untouched: the order and the numbering of the page's requests (`latest`), and every behaviour of D-96, D-97, D-209, D-211, D-225, D-261, D-286, D-323 and D-402 the page has today.
4. **After an error nothing handled, the waiting screen of a sign-in shows the sentence alone.** Shows in the waiting screen's state `stopped` (Decision 3) and in the page's refusal to build a game after the error. Untouched: „Sprawdzanie logowania…” and „Potwierdzanie adresu…” while the page really asks the server, also after an error.
5. **The DOM forms of the shared controls and the comparison test go.** `button.ts`, `text-field.ts`, `number-field.ts`, `pick-cell.ts`, `select-list.ts` in `src/browser/view/controls/` are deleted; the type `SelectOption` moves into `react-select-list.tsx`, and `program-panel.tsx` and `trip-plan.tsx` import it from there. `tests/view/react-controls.test.mjs` is deleted and its cases that protect a behaviour or an attribute of the React form move to a new test file (Decision 5). Untouched: the React forms' element trees, classes and attributes (except the one prop of Decision 6), the file names `react-*.tsx`.
6. **The panel in place of a card React took down reads the warning sentence's tag, class and role from one constant.** Shows in `react-text-field.tsx` (the constant, read by `ReactFormWarning`) and in `createFailureCard` of `account-card.tsx`, which stays built by hand outside React. Untouched: D-323, the panel's class `account-card-failure` and the card root's `onUncaughtError`.
7. **Two assertions of `tests/view/uncaught-failure.test.mjs` test behaviour.** The two of loop2#62-10, which the merged request #62 names as its finding M-4 (`git show 905c1ab8:docs/task-cycles/napis-o-awarii/request.md`, *Minor findings* 4): the count of live intervals asserted as „the clock no longer ticks” (today lines 399–403) and the count of `console.warn` calls of React's development build (today line 942). Untouched: every other assertion of the file, except the precondition that prepares only the first of the two and what Decision 7 changes or adds for To do 4, To do 6 and the carried question.
8. **The guidelines follow the change.** Shows in `guidelines/coding-browser-module.md` and `guidelines/styleguide-browser-view.md` (Decision 8). Untouched: the statuses of the table "Files of this kind" (question 4 a).

Non-goals:

- The split of `src/browser/styles.css`, the methods `setQuestion` and `setWindow`, the statuses of the table of files and loop2#62-4 (the task's *Out of scope*).
- One React root over the start page or over the view (settlement 3 and question 2: separate roots).
- Renaming `react-*.tsx` files or their components now that the prefix names no second form; it would touch every importing screen for no behaviour.
- A hint in the number field's empty state: the React number field has none today, the DOM form had one; the page shows what the game draws (see the report's observations).
- Drawing the real menu „Konto” on the kitchen-sink page: its unconfirmed part with „Wyślij ponownie” waiting is internal state of the menu, so the page keeps drawing that part itself, now from the React forms.
- A refusal test for the preview server: a change of how the kitchen-sink page is built does not change that boundary (D-76).

## Constraints

- **Settlements of the task bind.** 1: the page bundled as the game is and showing each shared control in its React form, by a change of the build step of `scripts/kitchen-sink.mjs`, never of its lines that serve files (D-269 as changed, D-76). 2: one form of each shared control; the panel of a card taken down built outside React from one constant shared with the React warning component (D-265 as changed, D-323 unchanged). 3: separate roots for the start page — the header, the waiting screen and the rows of sentences — shaped as the game's screens are (D-407).
- **D-323 unchanged in what the player reads**: the sentence once, in `warning`, in the row under the menu bar on every screen with the header, in the card under its form, and alone in the card's place where React takes the card down; no game built after the error.
- **D-262**: the card alone on its screen; the waiting screens with the header and no card. **D-381**: the card created, focused and closed by the page as today, closing only from its handlers and on each way to the game or a waiting screen. **D-286, D-261**: the page's sentences above the game leave at the first change of screen; the sentence in the card stays through its states.
- **The trust boundary `scripts/kitchen-sink.mjs` (part `build-tools`)**: the constants `out` and `host`, the block that starts the server when `--build-only` is absent and `openInBrowser` stay as they stand; the page's command writes nothing outside `dist/kitchen-sink/` and copies nothing from `assets/sprites/` (D-273, README line 35). The invariant `preview-server-access` stays checked by review (D-76).
- **D-266 for the game, D-263**: esbuild is the one bundler; `scripts/build.mjs` does not change. The kitchen-sink page follows the game's shape: the compiler type-checks and emits modules, the bundler joins the emitted modules.
- **D-45, invariant `application-build-kitchen-sink`**: nothing `npm run build` writes holds the page; `tsconfig.browser.json` keeps excluding `src/browser/kitchen-sink/`. The invariant test's positive control expects the page's marker in `dist/kitchen-sink/index.html` and `dist/kitchen-sink/kitchen-sink/kitchen-sink.js`.
- **D-47, invariant `browser-view-focus-outline`**: `kitchen-sink.css` keeps one outline rule with exactly two selectors, `:focus-visible` and the page's focus-sample selector.
- **D-395**: a shared control imports no module of a screen and takes a screen's rule from that screen.
- **Rendering discipline of the existing roots** (`menu-bar.tsx`, `account-card.tsx`, D-381): a root of the start page draws synchronously (`flushSync`) when the page changes its state from an event handler or from the continuation of an answer, never from inside React's rendering or commit. The page's `onUncaught` can be called from inside React's work (the card's `onUncaughtError`; React's default report of an error in a root, fired at the window during React's commit), so it renders no root synchronously.
- **The test harness** (`tests/view/page-document.mjs`, D-264) fails a case on any `console.error` of React's development build, an update outside `act` included, and on any `console.error` but the game's own lines.
- **Classes the stylesheet and the tests read stay on elements of the same meaning**: `session-check`, `session-check-text`, `confirmation-notice` with `positive`/`warning`, `page-notice`, `save-line`, `failure-line`, `form-warning`, `app-main`, `account-card-screen`, `account-card-failure`, `menu-bar-host`. An element with `save-line` or `failure-line` is hidden while its row says nothing and holds the sentence when it does, and the header with no sentence keeps today's height.
- **Testing guidelines**: a removed or changed assertion names its ground in the data or a requirement ("Changing an existing test"); assertions test behaviour ("Behaviour, not implementation"); expected values are written out in the case.
- **AGENTS.md**: guideline files change only through `the-way-maintain-coding-guidelines` and `the-way-maintain-styleguide`; foundation entries only through the record skills.
- **The code as it stands, with the reasons of its shape**: the DOM forms exist because screens moved to React one at a time (D-265, rationale: "the screens move to React one at a time, so for a while both kinds stand on one page and have to look alike"); the kitchen-sink page holds no React because its command bundled nothing (D-269, rejected: "a changed script at a trust boundary, a second bundle and a second set of samples for nothing the comparison of the two forms leaves open"); the panel of a card taken down stands outside React because "React takes the sentence down with the card" (D-323, rationale). The descriptions of the commits that brought this code (`cbe0a663`, `73b0563a`, `c0337587`) hold their titles only; the merged request #62 describes where the sentence stands and that the header row was a DOM element, with no further reason. No reason is supplied here beyond these.

## Decisions

### Decision 1 — Where the sentence of the failure stands in the header

**Chosen: a root of its own for the row of the failure, holding nothing but the shared warning sentence, drawn once when the page starts, in a host element that stays hidden; at the error the page only shows the host, rendering nothing.**

- The page creates, in `startApp`, a host with the class `failure-line`, placed in the header right after the menu bar's host and before the line of saving, and draws into it, synchronously at the start, `ReactFormWarning` with the sentence of `last-resort.ts`. The host is hidden.
- `onUncaught` shows the host (it sets no React state, so it works from inside React's work and needs no render). It then halts the game and tells the card, as today.
- Why the requirement holds: an error in another root takes down that root only; the row's root never renders again after the start, so no later error can take it down, React's own work included; showing it is one attribute of an element the page owns. Its sentence stands once, in `warning`, under the bar, beside the line of saving; in the card and in the card's place nothing changes.

Ways rejected:

- **The row rendered by its root at the error.** The sentence would come only when React next works: a call to `flushSync` from inside React's commit is refused by React with a `console.error` (which the harness counts as a failure), so the render is scheduled, comes after the error, and depends on React still working after it. The existing cases that read the row right after the error outside `act` would wait for a scheduler turn. Cost if this were chosen wrongly: a row that may not come, flaky tests.
- **The row built by hand outside React from the shared constant, as the panel of the card is.** Robust, synchronous, one builder for both places. But To do 2 lists the row of the failure among what React draws, in separate roots; this way would need that item changed.
- **The row inside the bar's root or the saver's root.** An error in that root takes the sentence down with it; it fails the requirement outright.

Cost if Decision 1 is wrong: the one open risk is a screen reader announcing an alert that turns from hidden to shown, where today it announces an element inserted with its text. That it does is assumed, not checked here; the change's check in a real browser, or the reviewer, confirms it. If it fails, the host can be shown and the sentence's text set in the same moment by keeping the text out until the error — at the price of a render at the error, which Decision 1 avoids.

### Decision 2 — The roots of the start page and their order

The page keeps building, through the DOM APIs, only the places roots mount in: the `<header>` and `<main class="app-main">` it hides and shows (D-262), and the host of each root it creates. No text, control or sentence of the start page is built by hand, except the panel in place of a card React took down (To do 6).

In the order they stand in the page:

| Place | Root | Draws | Lives |
|---|---|---|---|
| header | menu bar (`menu-bar.tsx`, unchanged) | the game's name alone, or the bar of the game | the page |
| header | row of the failure (new) | the sentence of the failure, once (Decision 1) | the page |
| header | row of saving (new) | the saver's sentence, hidden while there is none | the game |
| main | waiting screen (new) | the waiting screen's state (Decision 3) | the page |
| main | sentences above the game (new) | the page's sentences above the first screen | the page |
| main | the game (`game-view.ts`, unchanged) | the game's screens, each in its roots | the game |
| body | the card (`account-card.tsx`, unchanged) | the card, or the panel in its place | each card |

Units and interfaces (the factory shape of `createMenuBar`: an element of its own for the page to place, a first render that is synchronous, an update that renders synchronously, a disposal):

- **Waiting screen** — a module `.tsx` in `src/browser/view/` with a factory taking the page's handler of „Spróbuj ponownie”; it returns its element (with the class `session-check` on what it draws), an update with the waiting screen's state of Decision 3, a call that moves focus to „Spróbuj ponownie”, and a disposal. It draws „Sprawdzanie logowania…” or „Potwierdzanie adresu…” in `session-check-text`, the warning with the shared `ReactFormWarning`, and „Spróbuj ponownie” with `ReactButton`, reading „Sprawdzanie…” while it waits. The button stays the same element between refused and retrying. Depends on the shared controls.
- **Sentences above the game** — a module `.tsx` with the one component of a page sentence, which `account-card.tsx` imports in place of its own `PageSentence`, and a factory returning its element, an update with the list of sentences (each a confirmation-style sentence in its role — `positive` drawn with `role="status"`, `warning` with `role="alert"` and the class `confirmation-notice` — or the sentence of a refused load in `page-notice` with `role="alert"`), and a disposal. It replaces `createConfirmationNotice` and the page's `createPageNotice`.
- **The two warning rows** — one module `.tsx` or two (the maker's choice) with: the row of the failure (Decision 1: host `failure-line`, drawn at creation, `show()`), and the row of saving (host `save-line`, hidden while its sentence is null; drawn anew synchronously at each change of the sentence; a disposal that unmounts it). Both draw the shared `ReactFormWarning`.
- **The saver's sentence as a value** — `game-saver.ts` builds no element: in place of `element` it gives the sentence it stands for (or null) and a way to subscribe to its changes. The sentence changes only in the continuation of a save's answer and at creation, never inside React's work, so the row of saving may render synchronously on each change. `state-store.ts` passes the two through in place of `saveLine`. `game-view.ts` creates the row of saving from them, keeps `saveLine: HTMLElement` in its interface (the row's host, for the page to place, as today), and unmounts the row in `dispose()`.

Ways rejected:

- **One root for the skeleton of the page** (header, waiting screen, card) — question 2 b, rejected by the task; an error in it takes the row of the failure down with the skeleton.
- **The waiting screen and the sentences above the game in one root** — fewer roots, but an error in the drawing of a sentence above the game (its text comes from the server's answer) would take down the waiting screen's place too; settlement 3 lists them apart.
- **The rows of sentences read through `useSyncExternalStore`** — idiomatic for memory several screens share (D-407), but each row has one reader, and its update would come in a microtask after the answer instead of with it; the existing roots of the page use the update-and-`flushSync` shape.

Cost if Decision 2 is wrong: more roots than needed costs a few hosts and nothing the player sees; a root merged wrongly lets one error take down more than it should, which the new case of Decision 7 is there to catch.

### Decision 3 — The one value of the page's state

**Chosen: one value of three kinds, held by `startApp` and changed only through one function that takes the next value, disposes the card or the game the next value no longer holds, and draws every root and place of the start page from it.**

- **checking** — the waiting screen, header shown, no card, no game. Its data is what the waiting screen shows, one of:
  - asking, with its text: „Sprawdzanie logowania…” or „Potwierdzanie adresu…”;
  - refused, with the sentence of a failed request or of a load that met an error of the code, and „Spróbuj ponownie” at rest, focused when it appears;
  - retrying: „Spróbuj ponownie” waiting as „Sprawdzanie…”, no sentence; it lasts through every request until the waiting screen is left, as today once a refusal was shown;
  - stopped: nothing — the state the page takes where it would build a game after an error nothing handled (To do 4); the sentence of the failure stands in its row in the header.
- **card** — the card that stands; header and main hidden (D-262).
- **game** — the game view, the account it belongs to, the place the game last told (or none yet), the page's sentences above the first screen, the outcome of the registration's message the bar starts with, the logout, and the reset:
  - the logout is idle (with the sentence of an uncertain end, or none), saving (the save before the logout waits), or ending (the request that ends the session waits, with the saver's outcome held for after its answer, or none);
  - the reset is idle, or waiting (with the saver's outcome held for after its answer, or none).
  The bar is drawn from this kind alone: the game's name alone in the other kinds or where no place is known yet; „Wyloguj” waiting while the logout is not idle, unavailable while the reset waits.

Values that outlive a change of kind stay apart, as To do 3 allows: `pendingNotice`, `pendingMessage`, `kept`, `entry`, `afterConflict`, `latest`, `failed`, and the row of the failure.

Ways rejected:

- **The logout as a kind of its own** — the task names it among the page's states, but the game stands and acts during it and a reset can succeed during it (today's code handles that: "A reset that succeeded meanwhile built a new game"); a separate kind would repeat the game's data and turn a reset during a logout into a move between kinds. It is a field of the game kind instead, which keeps it in the one value.
- **Keeping the separate variables and adding checks** — the combinations that answer no state of the page (a waiting logout with no game) stay writable; To do 3 asks for the one value.

Cost if Decision 3 is wrong: a transition written differently from today's breaks one of the existing cases of `tests/view/account-screen.test.mjs`, `uncaught-failure.test.mjs`, `previous-save.test.mjs` or `owner-panel.test.mjs`, which together hold the page's behaviour; none is weakened by this change.

### Decision 4 — How the kitchen-sink page is bundled

**Chosen: the build step of `scripts/kitchen-sink.mjs` compiles the page's modules with `tsc -p tsconfig.kitchen-sink.json` into a staging directory inside `dist/kitchen-sink/`, bundles the staged entry with esbuild into `dist/kitchen-sink/kitchen-sink/kitchen-sink.js`, and removes the staging directory; it then copies `index.html`, `kitchen-sink.css` and the static files as today.**

- `tsconfig.kitchen-sink.json` takes the `.tsx` files of `src/browser/kitchen-sink/` and emits into the staging directory.
- The bundle: one ES module for the browser at the game's language level, React's **development** build (the bundle defines `process.env.NODE_ENV` as `"development"`, which the bundle must define, since a browser has no `process`), not minified. The page is a developer's tool; React's development build reports a misused control in the console.
- The served directory then holds only the page, its stylesheets, the static files and the one bundle, as `dist/public/` holds for the game (D-266's reasoning). The path of the bundle is the one `index.html` and the invariant test already name, so neither changes.
- The serving lines are not touched.

Ways rejected:

- **`tsc --noEmit` and esbuild reading the sources** — one directory fewer, but two compilers of the same files, the shape D-266 rejects for the game; the task asks for the page bundled "as the game is".
- **The compiler's output left in `dist/kitchen-sink/` beside the bundle** — the preview server would serve modules no browser loads, each with a bare import it cannot resolve.
- **A staging directory outside `dist/kitchen-sink/`** — the invariant test's positive control fails on any file written outside `dist/kitchen-sink/` that is left behind, and a failed run would leave one.
- **React's production build, minified** — smaller, silent; nothing on a local page needs the size.

Cost if Decision 4 is wrong: a build step to rearrange in one script; the boundary does not move either way.

**Review of the trust boundary:** the review of the change (the stage `review-change`) checks, on the diff of `scripts/kitchen-sink.mjs`, that only its build lines changed and that `out`, `host`, the server block and `openInBrowser` stand as before, so that the preview server still serves only `dist/kitchen-sink/` and only on 127.0.0.1 (`preview-server-access`, D-76, the testing guidelines' row for `scripts/kitchen-sink.mjs`); and that the page's command copies nothing from `assets/sprites/` (D-273). That the command writes nothing outside `dist/kitchen-sink/` stays tested by `test_page_command_builds_the_page_with_its_marker`.

### Decision 5 — The kitchen-sink page in React

- The page is one React root on a host element the module appends to the body (never on the body itself), drawing every section of today — controls in their seven states, the forms waiting and refused, the unconfirmed part of the menu „Konto”, the roles and the tiles — from the React forms and in JSX. The page marker stays set on the body.
- Hover and focus, which the page cannot hold, are forced by the sample's class on an element wrapping the control, not on the control's own element; `kitchen-sink.css` points its sample rules at the control inside the wrapper. The shared controls get no class prop for the page.
- Controlled fields on the page get a change handler or keep their value in the sample's state, so that React reports nothing when the page loads.
- The page shows what the game draws: the number field has no hint (the DOM form's „liczba” goes), and „Przycisk wybrany w grupie” is the React button with `selected`.

Ways rejected for the forced states: a class prop on every shared control (a control's interface grown for a page); classes added to React's elements by hand after the render (the page writes into elements React owns).

### Decision 6 — The empty state of the number field on the page

**Chosen: `ReactNumberField` takes one optional prop, a text it starts with in place of its number, shown and handled as text the player typed; only the kitchen-sink page gives it, with an empty text.**

The React field shows `String(value)` unless a draft stands, and a draft exists only after the player types, so no prop draws the empty state the styleguide requires the page to show (D-45: each state or the reason it does not apply; the state applies — a player who clears the field sees it).

Ways rejected: the page dispatching an `input` event through the native value setter after mounting the sample (no change of the control, but test-harness technique in product code, which a change of React's event handling would break silently); `value={NaN}` (relies on the browser emptying an invalid number); the reason „Nie dotyczy” (untrue, the state applies).

Cost if wrong: one prop no screen uses; removing it later is a one-line change of the page.

### Decision 7 — Tests

New or moved cases:

- **The React forms' behaviour and attributes** — a new file `tests/view/shared-controls.test.mjs` (name the maker's choice), on the harness, receiving from `react-controls.test.mjs` each case or assertion that protects a behaviour or an attribute of the React form a decision names, rewritten on the React form alone with the expected values written out: the submit button and its waiting text, disabled and busy (D-44); the kinds `positive`, `main` (type `button`, class), `secondary` (D-275) and `tab` with `aria-pressed` (D-276); `aria-expanded` given and not given; a click reaching the handler and a waiting button giving none; a field's error message pointed at by its input; a typed value reaching the handler of a controlled field; a choice in a select list reaching the handler, the list keeping the screen's value; a greyed pick cell `aria-disabled`, not `disabled`, giving no pick (D-288, D-289); the number field keeping its typed text through renders, taking a new value only without focus, committing the clamped number, and committing by the screen's rule, the trip count rule included (D-395). Plus one case for Decision 6: a field given a starting text shows it and commits nothing until the player acts.
- **The row of saving's host** — no new case: `account-screen.test.mjs` (its `saveLine` helper) and `previous-save.test.mjs` already read the line after answers.
- **The failure row against any root** — one case in `uncaught-failure.test.mjs`, a table of named variants of a start-page root whose drawing fails, each leaving the sentence shown once in the header's row and one console line written: the waiting screen (the client's sentence of a failed check is no text) and the sentences above the game (the sentence of a confirmation is no text, for a signed-in player). The values that make a root fail are the maker's, as long as each fails the drawing of that root alone. The existing case of the menu bar's root taken down stays.
- **To do 6** — the case "a card that React takes down after an error is replaced by the sentence alone in its place, and the page hears of the error" gains the panel sentence's class `form-warning` and role `alert`, written out. Ground: To do 6 (loop2#62-7, finding M-1 of request #62) requires the panel to carry the shared warning's tree.

Existing tests that change, and their ground:

- **`tests/view/react-controls.test.mjs` deleted.** Its cases that compare the two forms go with the DOM forms; ground: settlement 2 changes D-265, whose comparison of the two forms was this file's requirement. Its other cases move (above). The reviewer checks that each *Verification* line naming "both forms" (D-44, D-275, D-276) still has a case on the React form.
- **`assertWaitingWithSentence` in `uncaught-failure.test.mjs`** gains: „Sprawdzanie logowania…” is not shown, and the waiting screen's root draws no text, so the row of the failure in the header is the only sentence the player reads. Ground: To do 4 (loop2#62-5; finding 8 of request #62) and the precision of D-323 (Foundation entries). Its count of live intervals stays: To do 7 names two assertions, and this is neither.
- **„the clock no longer ticks”** (the count of live intervals after the error) is removed, with the count of intervals before the error marked as its precondition, which prepares only that assertion. Ground: To do 7, finding M-4 of request #62, the rule "Behaviour, not implementation": a correct implementation that kept its interval and read nothing would fail it; the case's later steps — a tick after the error that throws nothing, no save after time and acts, the save at „Wyloguj” with the state from before the error — protect the behaviour. The maker may make "a tick after the error reads no clock" an explicit assertion.
- **The count of `console.warn` calls** in "an error in the drawing of a root of the game reaches the page through the window" is removed; the mock that keeps React's warning out of the output stays. Ground: To do 7, M-4: a dependency's behaviour. The page's line and the sentence in the header stay asserted.
- **`sentenceOf` in `tests/view/game-saver.test.mjs`** reads the saver's sentence value instead of its element. Ground: the saver builds no element (To do 2); every expected sentence stays as written.
- **Clicks on „Spróbuj ponownie” outside `act`** in `account-screen.test.mjs` (today through `fire` at lines 550, 1397, 1995, 2034, 2055, 3284): where the harness reports React's warning of an update outside `act`, the click goes through `press` or inside `act`. Ground: the button becomes a React control, and D-264 has a test of a screen in React click through `press`. No assertion changes.

No invariant test changes. The kitchen-sink page's drawing has no test, as today; its build is run by the invariant test's positive control, and the maker looks at the page in a real browser.

### Decision 8 — What the guidelines say after the change

Through `the-way-maintain-coding-guidelines` and `the-way-maintain-styleguide`, describing the state after the change, without history:

- `coding-browser-module.md`: the rule "Wspólna kontrolka w dwóch postaciach" becomes the rule of one React form in `src/browser/view/controls/`, the constant of the warning sentence for the panel built outside React, and the test of the React forms; "Nowy ekran i moduły w DOM" says that no screen is built through the DOM APIs, that the page builds only the places roots mount in and the panel of a card taken down, and keeps the rule on `do not copy` files and their pure functions; "Strona wszystkich stanów bez Reacta" becomes the page bundled by the build step of its script, drawing the React forms; the example "Kontrolki w DOM i ich aktualizacja" describes the waiting screen's root, its update and the focus of „Spróbuj ponownie”, and the React controls' waiting props; the example "Gra na stronie i odpowiedzi serwera" describes the page's one value and the roots of Decision 2, the row of the failure included; the table loses the five deleted files' rows, the new files get none; *Where in code* names the new test file. Following the same change, though To do 8 does not list them: the sentence of the rule "TypeScript i DOM" that a screen not moved yet stays in the DOM APIs, and "Granicą między stroną w DOM a ekranem" in the example of the card.
- `styleguide-browser-view.md`: "The kitchen-sink page" says the page shows each shared control in its React form, the menu's part made from the React forms. Following the same change: in "States of shared controls" the paragraph on the DOM and React forms and the paths of the DOM forms in the list of deviating controls; in "Main button, secondary action and tab" the DOM calls named beside the React props.

## Foundation entries

Written or changed by the change; the foundation step words them:

- **D-265, decision, changed** (settlement 2): each shared control has one form, a React component in `src/browser/view/controls/`; the panel in place of a card React took down, built outside React (D-323), takes the tag, classes and role of the warning sentence from one constant the React component reads; the comparison test goes and its *Verification* names the test of the React forms.
- **D-269, decision, changed** (settlement 1): the kitchen-sink page is bundled by the build step of `scripts/kitchen-sink.mjs`, never by its lines that serve files, and shows each shared control in its React form; its *Based on* (`browser-bare-import-resolution`) to be weighed.
- **D-407, decision, changed** (settlement 3): the start page keeps roots of its own — the menu bar, the row of the failure, the row of saving, the waiting screen and the sentences above the game — beside the screens' roots, none shared, no single root over the view; the question of one root, which D-407 left open until the view is wholly in React, is answered. With it, the cycle's answer to the carried question: the row of the failure is a root holding nothing else, drawn when the page starts and shown by the page at the error without a render (D-323 is where the foundation step may put this instead).
- **D-03, decision, changed**: its exception "except the waiting screens of D-262, which `src/browser/view/app.ts` builds" goes; the waiting screens are React components too.
- **D-323, decision, changed (the cycle's precision)**: the waiting screen at which a sign-in after the error stays shows the sentence alone, without „Sprawdzanie logowania…” (loop2#62-5).
- **D-44, D-275, D-276, decisions, *Verification* changed**: "in both its forms" / "in both forms" of the shared button become its React form.
- **D-381, decision, rationale to refresh**: "the page around the card is built another way than the card" stops being true; the decision's statement holds.

Searched and left unchanged: D-45, D-47, D-76, D-262 (the sentence stays outside React in the card's place), D-264, D-273, D-286; the invariants `browser-view-framework`, `application-build-kitchen-sink`, `preview-server-access`, `browser-view-focus-outline`, `uncaught-failure-game-state`; the part map (every new file falls under `src/browser/view/**` or `tests/view/**` of `browser-view`; `tsconfig.kitchen-sink.json` and `scripts/kitchen-sink.mjs` stay in `build-tools`); the glossary (no term of this change has an entry).

## Left to the maker

- The names of the new modules, factories, the constant of the warning sentence, the prop of Decision 6, the staging directory and the new test file.
- Whether the two warning rows share one module; whether the page's state and its pure helpers live in `app.ts` or in a module of their own.
- How the hosts of `save-line` and `failure-line` and the sentence in them split today's one element's box in `styles.css`, as long as the look with and without a sentence stays.
- Whether `kitchen-sink.tsx` stays one module or splits, and the sample rule the page gives its number field.
- Whether the compiler's output directory for the page is set in `tsconfig.kitchen-sink.json` or on the command line, and whether esbuild writes a source map.
- The order of the work and its slices: the plan.
