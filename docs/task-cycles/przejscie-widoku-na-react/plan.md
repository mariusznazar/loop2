# Plan — loop2: dokończyć przejście widoku na React

- Task: `docs/task-cycles/przejscie-widoku-na-react/task.md`
- Spec: `docs/task-cycles/przejscie-widoku-na-react/spec.md`
- Base: `d850f76063c1f7a302b89d0b89e1fca72682be6d`

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| 1. D-269, changed: the kitchen-sink page is bundled by the build step of `scripts/kitchen-sink.mjs`, never by its lines that serve files, and shows each shared control in its React form; beside it the cycle's precision, its *Based on* (`browser-bare-import-resolution`) weighed | decision | settlement row 1 (question 1 a); spec, Foundation entries | Slices 1, 2, 13 |
| 2. D-265, changed: one form of each shared control, a React component in `src/browser/view/controls/`; the panel in place of a card React took down, built outside React (D-323), takes the tag, class and role of the warning sentence from one constant the React component reads; the comparison test goes and *Verification* names the test of the React forms | decision | settlement row 2 (question 3 b; question 1 a for the comparison test); spec, Foundation entries | Slices 5, 11, 12, 13 |
| 3. D-407, changed: the start page keeps roots of its own — the header's bar, the waiting screen and the rows of sentences — shaped as the game's screens are, none shared, no single root over the view; the cycle's precision written apart: the rows of sentences are three roots (the row of the failure, the row of saving, the sentences above the game), and the row of the failure holds nothing else, is drawn when the page starts and is shown by the page at the error without a render (the foundation step may put this precision in D-323 instead) | decision | settlement row 3 (question 2 a); spec, Decisions 1 and 2, Foundation entries | Slices 6, 8, 9, 10, 13 |
| 4. D-03, changed: its exception "except the waiting screens of D-262, which `src/browser/view/app.ts` builds" goes (the cycle's precision, following settlement row 3 and To do 2) | decision | spec, Foundation entries | Slices 8, 13 |
| 5. D-323, changed: the waiting screen at which a sign-in after the error stays shows the sentence alone, without „Sprawdzanie logowania…” (the cycle's precision, carrying To do 4, loop2#62-5) | decision | spec, Foundation entries | Slices 8, 10 |
| 6. D-44, *Verification* changed: "in both its forms" of the shared button becomes its React form (the cycle's precision, following settlement row 2) | decision | spec, Foundation entries | Slices 11, 12 |
| 7. D-275, *Verification* changed: "in both forms" becomes the React form (the cycle's precision, following settlement row 2) | decision | spec, Foundation entries | Slices 11, 12 |
| 8. D-276, *Verification* changed: "in both forms of the shared button" becomes its React form (the cycle's precision, following settlement row 2) | decision | spec, Foundation entries | Slices 11, 12 |
| 9. D-381, rationale refreshed: "the page around the card is built another way than the card" stops being true; the statement holds (the cycle's precision, following To do 2) | decision | spec, Foundation entries | Slices 8, 9 |

No invariant, part map entry or glossary term is written: the spec searched them and leaves them unchanged. Each new file falls under `src/browser/view/**`, `src/browser/kitchen-sink/**` or `tests/view/**` of `browser-view`.

## Slices

### Slice 1 — The kitchen-sink page bundled by its build step

- **Goal:** `npm run kitchen-sink` and `npm run kitchen-sink -- --build-only` build the kitchen-sink page as the game is built. The build step of `scripts/kitchen-sink.mjs` compiles the page's modules with `tsc -p tsconfig.kitchen-sink.json` into a staging directory inside `dist/kitchen-sink/`, bundles the staged entry module with esbuild into `dist/kitchen-sink/kitchen-sink/kitchen-sink.js` — one ES module for the browser at the game's language level (`es2022`, as `scripts/build.mjs` sets it), not minified, with `process.env.NODE_ENV` defined as `"development"` (React's development build; a browser has no `process`) — removes the staging directory, and then copies `index.html`, `kitchen-sink.css` and the static files as today. `tsconfig.kitchen-sink.json` takes both the `.ts` and the `.tsx` files of `src/browser/kitchen-sink/` and emits into the staging directory; whether that directory is set in the file or on the command line, its name, and whether esbuild writes a source map are the maker's choice. After a build, `dist/kitchen-sink/` holds only the page, the files it held besides the compiled modules today, and the one bundle — no compiled module. The page itself does not change in this slice: it still draws the DOM forms, now from the bundle. This is a trust boundary of the part `build-tools`: the constants `out` and `host`, the block that starts the server when `--build-only` is absent, and `openInBrowser` stay exactly as they stand; the command writes nothing outside `dist/kitchen-sink/`, a failed run included, and copies nothing from `assets/sprites/`. `scripts/build.mjs`, `scripts/static-files.mjs`, `package.json`, `src/browser/kitchen-sink/index.html`, `tsconfig.browser.json` and the invariant test do not change. No test is written or changed: the positive control of `tests/invariants/test_application_build_kitchen_sink.py` runs the new build step and checks that nothing is written outside `dist/kitchen-sink/`. Every test stays green after this slice. Open the page once in a real browser with `npm run kitchen-sink` (how a browser is operated on this computer stands in `.claude/skills/loop2-play/SKILL.md`): it draws as before and its console holds no error.
- **Change:** `scripts/kitchen-sink.mjs` · `tsconfig.kitchen-sink.json`
- **Read:** `docs/task-cycles/przejscie-widoku-na-react/spec.md:14-14` Goals and non-goals, goal 1 ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:32-48` Constraints ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:123-141` Decision 4 — How the kitchen-sink page is bundled ·
  `docs/task-cycles/przejscie-widoku-na-react/task.md:27-27` To do, item 1 ·
  `scripts/build.mjs` · `scripts/static-files.mjs` · `tests/invariants/test_application_build_kitchen_sink.py` ·
  `README.md:31-35` the two commands that build and run the server ·
  `.claude/skills/loop2-play/SKILL.md` ·
  `guidelines/coding.md` ·
  `foundations/decisions.md:4555-4568` D-45 · `foundations/decisions.md:841-854` D-76 ·
  `foundations/decisions.md:354-372` D-263 · `foundations/decisions.md:374-408` D-266 ·
  `foundations/decisions.md:4745-4776` D-273 · Foundation entries row 1 (D-269) ·
  `foundations/invariants.md:498-506` application-build-kitchen-sink ·
  `foundations/invariants.md:568-576` preview-server-access ·
  `foundations/part_map.md:87-121` build-tools
- **Model:** same — a script at a trust boundary of the part `build-tools`; a wrong build step breaks the page and the invariant test, and the slice has its own review
- **Risk:** trust boundary — `scripts/kitchen-sink.mjs` of `build-tools` (the preview server): its review aims at crafted request paths at the preview server and at the lines that serve files staying as they stand
- **Checks:** `npm test -- tests/invariants/test_application_build_kitchen_sink.py` · `npm run kitchen-sink -- --build-only`, then a listing of `dist/kitchen-sink/` showing no compiled module and no staging directory · `npx eslint scripts/kitchen-sink.mjs` · `npx prettier --check scripts/kitchen-sink.mjs tsconfig.kitchen-sink.json` · the page opened in a real browser
- **Depends on:** Foundation entries row 1

### Slice 2 — The kitchen-sink page drawn in React

- **Goal:** The kitchen-sink page is `src/browser/kitchen-sink/kitchen-sink.tsx`, which replaces `kitchen-sink.ts` (deleted). It is one React root on a host element the module appends to the body, never on the body itself, drawing every section of today — each shared control in its seven states or with the reason a state does not apply, the forms waiting and refused, the form „Nie pamiętam hasła” with the answer to its request, the part of the menu „Konto” for an unconfirmed address with „Wyślij ponownie” waiting and its refusal, every role and the tile samples — from the React forms of `src/browser/view/controls/react-*.tsx` and in JSX, with made-up values and never a game state. The page marker stays set on the body, and the module keeps exporting `PAGE_MARKER` (the invariant test imports it from `./kitchen-sink/kitchen-sink.js`). Beyond this entry module the page imports only modules the game uses; all code only the page needs stays in it. Hover and focus, which the page cannot hold, are forced by the sample's class on an element wrapping the control, not on the control's own element; `kitchen-sink.css` points its sample rules at the control inside the wrapper and keeps exactly one rule that sets an outline, with exactly two selectors, `:focus-visible` and the focus sample's selector. The shared controls get no prop for the page and do not change. A controlled field on the page gets a change handler or keeps its value in the sample's state, so that React reports nothing when the page loads. The page shows what the game draws: the number field has no hint (the DOM form's „liczba” goes), and „Przycisk wybrany w grupie” is `ReactButton` with `selected`. The empty state of the number field: right after the page's root is first drawn, synchronously, the entry module's own code — outside React, not in an Effect — takes that sample's input through the field's existing `inputRef` and types an empty text into it the way the test harness types (the input's native value setter, then a bubbling `input` event), so the field holds an empty draft; a comment in the module states this technique and why it stands there. Follow the styleguide's example "Plan of a user-interface change". No test is written or changed: the page's drawing has no test, and its compile is run by the invariant test's positive control. Every test stays green after this slice. In a real browser (`npm run kitchen-sink`; `.claude/skills/loop2-play/SKILL.md` says how a browser is operated here): every section and state draws as the styleguide's rule "States of shared controls" gives, the forced hover and focus samples look as the game draws those states, the empty number-field sample shows an empty field, and the console holds no report of React.
- **Change:** `src/browser/kitchen-sink/kitchen-sink.ts` · `src/browser/kitchen-sink/kitchen-sink.tsx` · `src/browser/kitchen-sink/kitchen-sink.css`
- **Read:** `docs/task-cycles/przejscie-widoku-na-react/spec.md:14-14` Goals and non-goals, goal 1 ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:23-30` Goals and non-goals, non-goals ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:32-48` Constraints ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:143-150` Decision 5 — The kitchen-sink page in React ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:152-165` Decision 6 — The empty state of the number field on the page ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:200-205` Settlements of the cycle after the spec's review ·
  `src/browser/view/controls/react-button.tsx` · `src/browser/view/controls/react-text-field.tsx` ·
  `src/browser/view/controls/react-number-field.tsx` · `src/browser/view/controls/react-pick-cell.tsx` ·
  `src/browser/view/controls/react-select-list.tsx` · `src/browser/view/menu-bar.tsx` ·
  `src/browser/view/email-status.ts` · `src/browser/view/account-rules.ts` ·
  `src/browser/kitchen-sink/index.html` · `tsconfig.kitchen-sink.json` ·
  `tests/view/page-document.mjs:150-166` typeInto ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` ·
  `foundations/decisions.md:4540-4553` D-44 · `foundations/decisions.md:4555-4568` D-45 ·
  `foundations/decisions.md:4585-4598` D-47 · `foundations/decisions.md:3088-3099` D-157 ·
  `foundations/decisions.md:4778-4822` D-274 · `foundations/decisions.md:8889-8928` D-289 ·
  `foundations/decisions.md:4525-4538` D-43 · `foundations/decisions.md:4036-4063` D-267 ·
  Foundation entries row 1 (D-269) · Foundation entries row 2 (D-265) ·
  Foundation entries row 7 (D-275) · Foundation entries row 8 (D-276) ·
  `foundations/invariants.md:498-506` application-build-kitchen-sink ·
  `foundations/invariants.md:468-476` browser-view-focus-outline ·
  `foundations/invariants.md:458-466` browser-view-token-values ·
  `foundations/invariants.md:35-43` browser-view-framework
- **Model:** same — an 833-line page rewritten in React with the forced states, the focus-outline invariant and a check in a real browser; a mistake shows only to the developer who opens the page
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_application_build_kitchen_sink.py` · `npm test -- tests/invariants/test_browser_view_focus_outline.py` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm test -- tests/invariants/test_browser_view_framework.py` · `npx eslint src/browser/kitchen-sink/kitchen-sink.tsx` · `npx prettier --check src/browser/kitchen-sink/kitchen-sink.tsx src/browser/kitchen-sink/kitchen-sink.css` · the page checked in a real browser
- **Depends on:** Slice 1

### Slice 3 — The account screen's tests read the page by what is shown

- **Goal:** In `tests/view/account-screen.test.mjs`, the four assertions that read the page's element structure are rewritten to keep what they protect without taking a sentence for a direct child of `<header>` or `<main>`, so that they pass on the tree as it stands now and after the start page is drawn in roots of its own (Slices 6, 8, 9 and 10: each sentence then stands in a host element the page places, and `<header>` holds the hidden host of the row of the failure from the start, between the bar and the line of saving). Expected values stay written out in each case:
  - today at line 3386, `form-warning` on the element `save-line`: the sentence the shown line of saving holds carries `form-warning` — today the line itself, later an element inside it. It protects the line's sentence in the role `warning` (D-208).
  - today at lines 3391–3395, the header's children read as `[false, true]` for `save-line`: read over the header's shown children, which are the bar first and the line of saving after it. It protects the bar first and the line of saving under it (D-208, D-280); a hidden host is no part of what the player sees. The check that the line is no part of the menu „Konto” stays as it is.
  - today at lines 1325–1327, the notice's parent taken as `<main>`, the notice its first child and that parent holding the game: the notice is the first shown sentence of `<main>` and stands before the game's element in the document's order, the game shown. It protects the sentence above the game's first screen (D-156, D-286).
  - today at lines 3340–3350, `main.children` read as confirmation, refusal and game: the shown sentences of `<main>` and the game's element (class `game-view`), in that order of the document — the confirmation, the refusal with `page-notice`, the game. It protects the confirmation above the sentence of a refused load, both above the game (D-96, D-156).
  Assertions that read a sentence's place among the children of its own parent, such as at line 1712, keep passing in a host of sentences and do not change. The clicks on „Spróbuj ponownie” sent through the harness's `fire` outside `act` (today at lines 550, 1397, 1995, 2034, 2055 and 3284) go through the harness's `press`, since the button becomes a React control and D-264 has a test of a screen in React click through `press`; no assertion changes with them. The comment before the case "the page's sentence stands in the card above the switch, …" (today at line 5841) names "the roles of createConfirmationNotice", a function Slice 9 removes; it names the roles of the page's sentence instead. The ground of each changed assertion, under the testing guidelines' rule "Changing an existing test": To do 2 and settlement 3 (question 2 a) draw the start page in roots of their own, each in a host the page places, and the spec's Decision 1 keeps the host of the row of the failure in the header from the start, hidden; so a sentence is no longer a direct child of `<header>` or `<main>`, and those parents hold hosts the player does not see. No product code changes. Every test stays green after this slice, this file included on the tree as it stands. The file has about 6 500 lines and need not be read whole: its imports and helpers (lines 1–260, among them `all`, `childrenOf`, `byClass`, `shown`, `buttonNamed`, `gameShown`), `noticeOf` (about line 1272), `saveLine` and `pageNotices` (about lines 2080–2090), and the cases around each line named above are what the work touches.
- **Change:** `tests/view/account-screen.test.mjs`
- **Read:** `docs/task-cycles/przejscie-widoku-na-react/spec.md:52-58` Decision 1 — Where the sentence of the failure stands in the header ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:68-82` Decision 2 — The roots of the start page and their order ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:176-189` Decision 7 — Tests, existing tests that change ·
  `tests/view/page-document.mjs:93-166` withPage, inAct, fire, press, settle, typeInto ·
  `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `foundations/decisions.md:3649-3675` D-208 · `foundations/decisions.md:3061-3086` D-156 ·
  `foundations/decisions.md:4299-4318` D-286 · `foundations/decisions.md:2717-2730` D-96 ·
  `foundations/decisions.md:1211-1270` D-264
- **Model:** strongest — the slice reads more than the limit (the size script counts `tests/view/account-screen.test.mjs`, 344 238 characters, whole); the work in it is four assertions, six clicks and one comment, and a wrong rewrite fails in a later slice, so the class is the one that holds the largest context
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` on the tree as it stands
- **Depends on:** none

### Slice 4 — Two assertions of the uncaught-failure test check behaviour

- **Goal:** In `tests/view/uncaught-failure.test.mjs` the two assertions of loop2#62-10 (finding M-4 of the merged request #62) go. In the case "after an error nothing handled, in the clock's own reading, the game state stays as it was and every save sends the state from before the error", the assertion "the clock no longer ticks" — the count of live intervals after the error, today lines 399–403 — is removed, and with it the count of intervals before the error ("precondition: the game runs", today lines 381–385), which prepares only that assertion; the case's later steps — a tick after the error that throws nothing, no save after time and acts, the save at „Wyloguj” with the state from before the error — stay and protect the behaviour. The maker may make "a tick after the error reads no clock" an explicit assertion of that case, its expected value written out. In the case "an error in the drawing of a root of the game reaches the page through the window", the count of `console.warn` calls (today line 942) is removed; the mock that keeps React's own warning out of the output stays, and the page's console line and the sentence in the header stay asserted. Ground, under the testing guidelines' rules "Changing an existing test" and "Behaviour, not implementation": To do 7 — a correct implementation that kept its interval and read nothing would fail the first, and the second counts a dependency's behaviour. Every other assertion of the file stays, the count of live intervals in `assertWaitingWithSentence` included. No product code changes. Every test stays green after this slice.
- **Change:** `tests/view/uncaught-failure.test.mjs`
- **Read:** `docs/task-cycles/przejscie-widoku-na-react/spec.md:20-20` Goals and non-goals, goal 7 ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:180-181` Decision 7 — Tests, the two assertions of To do 7 ·
  `docs/task-cycles/przejscie-widoku-na-react/task.md:33-33` To do, item 7 ·
  `tests/view/page-document.mjs:93-166` withPage, inAct, fire, press, settle, typeInto ·
  `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `foundations/decisions.md:1739-1788` D-253 · Foundation entries row 5 (D-323) ·
  `foundations/invariants.md:1228-1236` uncaught-failure-game-state
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/uncaught-failure.test.mjs` · `npx eslint tests/view/uncaught-failure.test.mjs`
- **Depends on:** none

### Slice 5 — The panel of a card taken down reads the warning sentence's constant

- **Goal:** `src/browser/view/controls/react-text-field.tsx` gains one exported constant holding the tag, the class and the role of the warning sentence under a form (`p`, `form-warning`, `alert`; its name is the maker's), which `ReactFormWarning` reads for its element. `createFailureCard` in `src/browser/view/account-card.tsx` stays built by hand outside React (D-323 unchanged) and takes the tag, class and role of its sentence from that constant. Nothing the player sees changes; the panel keeps its class `account-card-failure`, and the card root's `onUncaughtError` stays as it is. Test first: in `tests/view/uncaught-failure.test.mjs`, the case "a card that React takes down after an error is replaced by the sentence alone in its place, and the page hears of the error" gains assertions, their values written out, that the panel's sentence carries the class `form-warning` and the role `alert`. Ground: To do 6 (loop2#62-7, finding M-1 of request #62) requires the panel to carry the shared warning's tree. Every test stays green after this slice.
- **Change:** `src/browser/view/controls/react-text-field.tsx` · `src/browser/view/account-card.tsx` · `tests/view/uncaught-failure.test.mjs`
- **Read:** `docs/task-cycles/przejscie-widoku-na-react/spec.md:19-19` Goals and non-goals, goal 6 ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:32-48` Constraints ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:174-174` Decision 7 — Tests, To do 6 ·
  `docs/task-cycles/przejscie-widoku-na-react/task.md:32-32` To do, item 6 ·
  `docs/task-cycles/przejscie-widoku-na-react/task.md:49-54` Questions to settle, question 3 ·
  `tests/view/page-document.mjs:93-166` withPage, inAct, fire, press, settle, typeInto ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `foundations/decisions.md:2887-2927` D-262 · `foundations/decisions.md:534-547` D-36 ·
  Foundation entries row 2 (D-265) · Foundation entries row 5 (D-323)
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/uncaught-failure.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` · `npm run typecheck` · `npx eslint src/browser/view/controls/react-text-field.tsx src/browser/view/account-card.tsx tests/view/uncaught-failure.test.mjs` · `npx prettier --check src/browser/view/controls/react-text-field.tsx src/browser/view/account-card.tsx tests/view/uncaught-failure.test.mjs`
- **Depends on:** Slice 4

### Slice 6 — The saver's sentence as a value, drawn by the row of saving

- **Goal:** The line of saving is drawn by a React root of its own.
  - `src/browser/view/game-saver.ts` builds no element and no longer imports `createFormWarning`: in place of `element` its interface gives the sentence of saving it stands for, or null, and a way to subscribe to its changes that returns the unsubscribing. The sentence changes only at creation and in the continuation of a save's answer, never inside React's work. Its sentences, and when each stands, stay exactly as today.
  - `src/browser/view/state-store.ts` passes those two through in place of `saveLine`.
  - A new module `src/browser/view/header-rows.tsx` holds the row of saving: a factory after the shape of `createMenuBar` in `menu-bar.tsx` — an element of its own for the page to place (the host, with the class `save-line`, hidden while the sentence is null), a first render that is synchronous, a synchronous render (`flushSync`) at each change of the sentence, and a disposal that unsubscribes and unmounts — drawing the shared `ReactFormWarning`. Slice 10 adds the row of the failure to this module.
  - `src/browser/view/game-view.ts` creates the row of saving from the store's sentence and subscription, keeps `saveLine: HTMLElement` in its interface — now the row's host, which the page places under the bar as today — and unmounts the row in `dispose()`.
  - `src/browser/view/app.ts` does not change in this slice; its `classList.add("save-line")` on the host does nothing new and goes in Slice 9. `src/browser/styles.css` does not change: `header .save-line` now applies to the host, and `.form-warning` has no margin, so the header keeps today's box with and without the sentence; if the check in a real browser shows otherwise, stop and report it to the orchestrator.
  Test: `sentenceOf` in `tests/view/game-saver.test.mjs` reads the saver's sentence value instead of its element, every expected sentence staying as written; the case's hand-made document model may lose what only the element needed. Ground: the saver builds no element (To do 2). No new case: `account-screen.test.mjs` (its `saveLine` helper and the assertions Slice 3 rewrote) and `previous-save.test.mjs` read the line after answers. Every test stays green after this slice, among them those of the game saver, the state store, the previous save, the account screen, the uncaught failure, the chronicle of the game, the end question and the end window of the game. In a real browser (`.claude/skills/loop2-play/SKILL.md`): the header with no sentence keeps its height, and, where a failed save can be brought about on the local start (for one, with the local server stopped while a game is open), its sentence shows under the bar as before.
- **Change:** `src/browser/view/game-saver.ts` · `src/browser/view/state-store.ts` · `src/browser/view/game-view.ts` · `src/browser/view/header-rows.tsx` · `tests/view/game-saver.test.mjs`
- **Read:** `docs/task-cycles/przejscie-widoku-na-react/spec.md:15-15` Goals and non-goals, goal 2 ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:32-48` Constraints ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:68-97` Decision 2 — The roots of the start page and their order ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:172-172` Decision 7 — Tests, the row of saving's host ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:188-188` Decision 7 — Tests, sentenceOf ·
  `src/browser/view/menu-bar.tsx` · `src/browser/view/controls/react-text-field.tsx` ·
  `src/browser/styles.css:46-58` the line of saving and the line of a failure ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` ·
  `foundations/decisions.md:3580-3647` D-207 · `foundations/decisions.md:3649-3675` D-208 ·
  `foundations/decisions.md:3677-3722` D-209 · `foundations/decisions.md:3724-3757` D-210 ·
  `foundations/decisions.md:2732-2755` D-97 · `foundations/decisions.md:534-547` D-36 ·
  Foundation entries row 3 (D-407)
- **Model:** same — the saver's interface changes across three modules and a new React root; a mistake shows only in the order of the saver's outcomes the tests hold in part
- **Risk:** none
- **Checks:** `npm test -- tests/view/game-saver.test.mjs` · `npm test -- tests/view/state-store.test.mjs` · `npm test -- tests/view/previous-save.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/uncaught-failure.test.mjs` · `npm test -- tests/view/chronicle-game.test.mjs` · `npm test -- tests/view/end-question.test.mjs` · `npm test -- tests/view/end-window-game.test.mjs` · `npm run typecheck` · `npx eslint` and `npx prettier --check` on the changed files · the check in a real browser
- **Depends on:** Slice 3 · Foundation entries row 3

### Slice 7 — The page's state as one value

- **Goal:** In `startApp` of `src/browser/view/app.ts`, the page's state is one value of three kinds, held by `startApp` and changed only through one function that takes the next value, disposes the card or the game the next value no longer holds, and draws every place of the start page from it — in this slice still the elements the page builds by hand today, so that nothing the player sees changes:
  - checking — the waiting screen, header shown, no card, no game; its data one of: asking, with „Sprawdzanie logowania…” or „Potwierdzanie adresu…”; refused, with the sentence of a failed request or of a load that met an error of the code and „Spróbuj ponownie” at rest, focus moved to „Spróbuj ponownie” at every entry, a refusal after retrying included, as `askingFailed` does today; retrying, „Spróbuj ponownie” waiting as „Sprawdzanie…” with no sentence, lasting through every request until the waiting screen is left, as today once a refusal was shown; stopped, the state the page takes where it would build a game after an error nothing handled — drawn in this slice exactly as today's page draws that moment, with „Sprawdzanie logowania…” (Slice 8 draws it empty);
  - card — the card that stands, header and main hidden (D-262);
  - game — the game view, the account it belongs to, the place the game last told or none yet, the page's sentences above the first screen, the outcome of the registration's message the bar starts with, the logout (idle, with the sentence of an uncertain end or none; saving, while the save before the logout waits; ending, while the request that ends the session waits, with the saver's outcome held for after its answer or none) and the reset (idle; waiting, with the saver's outcome held for after its answer or none). The bar is drawn from this kind alone: the game's name alone in the other kinds or where no place is known yet; „Wyloguj” waiting while the logout is not idle, unavailable while the reset waits.
  Values that outlive a change of kind stay apart: `pendingNotice`, `pendingMessage`, `kept`, `entry`, `afterConflict`, `latest`, `failed` and the line of the failure. The order and the numbering of the page's requests (`latest`) and every behaviour the page has today stay as they are (D-96, D-97, D-209, D-211, D-225, D-261, D-286, D-323, D-402), a reset that succeeds while a logout waits included. The state and its pure helpers stay in `app.ts`. No test changes; every test stays green after this slice, among them those of the account screen, the uncaught failure, the previous save, the owner panel and the menu bar.
- **Change:** `src/browser/view/app.ts`
- **Read:** `docs/task-cycles/przejscie-widoku-na-react/spec.md:16-16` Goals and non-goals, goal 3 ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:32-48` Constraints ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:99-121` Decision 3 — The one value of the page's state ·
  `docs/task-cycles/przejscie-widoku-na-react/task.md:29-29` To do, item 3 ·
  `src/browser/view/game-view.ts:36-124` GameEntry, GameViewOptions, GameView ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/AGENTS.md` ·
  `foundations/decisions.md:2717-2730` D-96 · `foundations/decisions.md:2732-2755` D-97 ·
  `foundations/decisions.md:3677-3722` D-209 · `foundations/decisions.md:3759-3799` D-211 ·
  `foundations/decisions.md:3295-3333` D-225 · `foundations/decisions.md:2863-2885` D-261 ·
  `foundations/decisions.md:2887-2927` D-262 · `foundations/decisions.md:4299-4318` D-286 ·
  `foundations/decisions.md:3925-3938` D-402 · Foundation entries row 5 (D-323)
- **Model:** same — it rewrites every transition of the page, whose orderings (a logout and a reset under way, outcomes deferred and held, late answers) the existing tests hold only in part
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/uncaught-failure.test.mjs` · `npm test -- tests/view/previous-save.test.mjs` · `npm test -- tests/view/owner-panel.test.mjs` · `npm test -- tests/view/menu-bar.test.mjs` · `npm run typecheck` · `npx eslint src/browser/view/app.ts` · `npx prettier --check src/browser/view/app.ts`
- **Depends on:** none

### Slice 8 — The waiting screen in a React root, alone after an error

- **Goal:** A new module `src/browser/view/waiting-screen.tsx` holds the waiting screen: a factory, after the shape of `createMenuBar` in `menu-bar.tsx`, taking the page's handler of „Spróbuj ponownie” and returning its element, an update with the waiting screen's data of the page's state (Slice 7), a call that moves focus to „Spróbuj ponownie”, and a disposal; its first render is synchronous and each update renders synchronously (`flushSync`). It draws, on an element with the class `session-check` that stands in every state of the waiting screen: „Sprawdzanie logowania…” or „Potwierdzanie adresu…” in `session-check-text` while asking; the shared `ReactFormWarning` with the sentence when refused; „Spróbuj ponownie” as `ReactButton`, the same element between refused and retrying, waiting with the text „Sprawdzanie…” while retrying; and nothing at all — no text, no button — in the state stopped. `app.ts` creates this root's host in `<main>` and draws it from the page's state, moving focus to „Spróbuj ponownie” at each entry into refused; the session check's hand-built elements go from `app.ts`, with its uses of `createButton`, `setButtonWaiting` and the check's `createFormWarning`. The state stopped now shows the sentence of the failure alone (To do 4): after an error nothing handled, the page's refusal to build a game enters stopped, while „Sprawdzanie logowania…” and „Potwierdzanie adresu…” still stand while the page really asks the server, after an error too. A root of the start page renders synchronously only from an event handler or from the continuation of an answer, never from inside React's rendering or commit; `onUncaught` renders no root. `src/browser/styles.css` does not change: its `.session-check` rules apply to the drawn element; if the check in a real browser shows a box other than today's, stop and report it to the orchestrator. Test first: in `tests/view/uncaught-failure.test.mjs`, `assertWaitingWithSentence` gains, with values written out, that „Sprawdzanie logowania…” is not shown and that the waiting screen's root draws no text, so the sentence of the failure in the header is the only sentence the player reads; its count of live intervals stays. Ground: To do 4 (loop2#62-5; finding 8 of request #62) and the change of D-323 (Foundation entries row 5). Every test stays green after this slice, the clicks on „Spróbuj ponownie” in the account screen's tests going through `press` since Slice 3. In a real browser (`.claude/skills/loop2-play/SKILL.md`): the waiting screen at a reload, and, where the local start can refuse the check (for one, with its server stopped), the warning with „Spróbuj ponownie” focused and its waiting text after a click.
- **Change:** `src/browser/view/app.ts` · `src/browser/view/waiting-screen.tsx` · `tests/view/uncaught-failure.test.mjs`
- **Read:** `docs/task-cycles/przejscie-widoku-na-react/spec.md:15-17` Goals and non-goals, goals 2 to 4 ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:32-48` Constraints ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:68-97` Decision 2 — The roots of the start page and their order ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:99-114` Decision 3 — The one value of the page's state ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:179-179` Decision 7 — Tests, assertWaitingWithSentence ·
  `docs/task-cycles/przejscie-widoku-na-react/task.md:28-30` To do, items 2 to 4 ·
  `src/browser/view/menu-bar.tsx` · `src/browser/view/controls/react-button.tsx` ·
  `src/browser/view/controls/react-text-field.tsx` ·
  `tests/view/page-document.mjs:93-166` withPage, inAct, fire, press, settle, typeInto ·
  `src/browser/styles.css:646-660` the session check ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` ·
  `foundations/decisions.md:2717-2730` D-96 · `foundations/decisions.md:2887-2927` D-262 ·
  `foundations/decisions.md:1211-1270` D-264 · `foundations/decisions.md:534-547` D-36 ·
  Foundation entries row 4 (D-03) · Foundation entries row 5 (D-323) ·
  Foundation entries row 3 (D-407) · Foundation entries row 9 (D-381) ·
  `foundations/invariants.md:1228-1236` uncaught-failure-game-state
- **Model:** same — a new React root with focus, a synchronous render and the rule that no root renders inside React's work; the existing tests hold the page's transitions only in part
- **Risk:** none
- **Checks:** first `npm test -- tests/view/uncaught-failure.test.mjs` failing on the new assertions, then passing · `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/previous-save.test.mjs` · `npm test -- tests/view/owner-panel.test.mjs` · `npm run typecheck` · `npx eslint` and `npx prettier --check` on the changed files · the check in a real browser
- **Depends on:** Slice 3 · Slice 5 · Slice 7 · Foundation entries rows 3, 4, 5

### Slice 9 — The sentences above the game in a React root

- **Goal:** A new module `src/browser/view/page-sentences.tsx` holds the one component of a page sentence — a confirmation-style sentence in its role, `positive` drawn with `role="status"` and `warning` with `role="alert"`, each with the class `confirmation-notice` and its role's class, or the sentence of a refused load in `page-notice` with `role="alert"` — which `src/browser/view/account-card.tsx` imports in place of its own `PageSentence`, so the card's sentence keeps its look and place; and a factory, after the shape of `createMenuBar`, returning its element, an update with the list of sentences, and a disposal, its first render and each update synchronous. `app.ts` mounts this root in a host of its own in `<main>`, before the game's element, and draws it from the game kind's sentences; they leave at the game's first change of screen (D-286) and at a change between the card and the game (D-261), as today. `createConfirmationNotice` goes from `src/browser/view/email-confirmation.ts`, whose pure functions and `browserAddress` stay; `createPageNotice` goes from `app.ts`, and so does the `classList.add("save-line")` on the saver's host, which the row of saving sets itself since Slice 6. `src/browser/styles.css` does not change: the notices keep their own margins inside a block host; if the check in a real browser shows a box other than today's, stop and report it to the orchestrator. No test changes: the assertions of the account screen's tests that Slice 3 rewrote, and its cases of the page's sentences, hold the behaviour. Every test stays green after this slice. In a real browser (`.claude/skills/loop2-play/SKILL.md`): a sentence above the first screen that the local start can bring about — for one, the sentence after „Zacznij od zera” for an account with the previous-save privilege, where the local start can grant it — stands above Siedziba and leaves at the first change of screen; where no such sentence can be brought about, the report names that check as left to the reviewer.
- **Change:** `src/browser/view/app.ts` · `src/browser/view/page-sentences.tsx` · `src/browser/view/account-card.tsx` · `src/browser/view/email-confirmation.ts`
- **Read:** `docs/task-cycles/przejscie-widoku-na-react/spec.md:15-15` Goals and non-goals, goal 2 ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:32-48` Constraints ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:68-97` Decision 2 — The roots of the start page and their order ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:109-114` Decision 3 — The one value of the page's state, the game kind ·
  `src/browser/view/menu-bar.tsx` ·
  `src/browser/styles.css:176-209` the page's sentences and the place of the screen ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` ·
  `foundations/decisions.md:3061-3086` D-156 · `foundations/decisions.md:4299-4318` D-286 ·
  `foundations/decisions.md:2863-2885` D-261 · `foundations/decisions.md:2717-2730` D-96 ·
  `foundations/decisions.md:3295-3333` D-225 · `foundations/decisions.md:3925-3938` D-402 ·
  `foundations/decisions.md:534-547` D-36 ·
  Foundation entries row 3 (D-407) · Foundation entries row 9 (D-381)
- **Model:** same — the sentences above the game leave at a change of screen and at a change between card and game (D-286, D-261), shared with the card's component
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/uncaught-failure.test.mjs` · `npm test -- tests/view/previous-save.test.mjs` · `npm test -- tests/view/owner-panel.test.mjs` · `npm test -- tests/view/email-confirmation.test.mjs` · `npm run typecheck` · `npx eslint` and `npx prettier --check` on the changed files · the check in a real browser
- **Depends on:** Slice 5 · Slice 6 · Slice 8 · Foundation entries row 3

### Slice 10 — The row of the failure, drawn at the start and shown at the error

- **Goal:** `src/browser/view/header-rows.tsx` (created by Slice 6) gains the row of the failure: a factory returning a host with the class `failure-line`, hidden, into which it draws synchronously at creation the shared `ReactFormWarning` with `FAILURE_SENTENCE` of `last-resort.ts`; a `show()` that only removes `hidden` from the host, setting no React state and rendering nothing, so it works from inside React's work; and a disposal. `startApp` creates it when the page starts and places its host in the header right after the menu bar's host and before the line of saving; `onUncaught` calls `show()` in place of building the line by hand, then halts the game and tells the card as today. The last `createFormWarning` goes from `app.ts`, which then imports no DOM form of a shared control. The sentence stands once, in `warning`, under the bar, beside the line of saving; in the card and in the card's place nothing changes. `src/browser/styles.css` does not change: `header .failure-line` applies to the host. Test first: one case in `tests/view/uncaught-failure.test.mjs`, a table of named variants of a start-page root whose drawing fails, each leaving the sentence shown once in the header's row and one console line written — the waiting screen (the client's sentence of a failed check is no text) and the sentences above the game (the sentence of a confirmation is no text, for a signed-in player); the values that make a root fail are the maker's, each failing the drawing of that root alone, chosen from `waiting-screen.tsx` and `page-sentences.tsx` as Slices 8 and 9 wrote them. The existing case of the menu bar's root taken down stays. Ground: the task's question carried to the cycle and the spec's Decision 1. Every test stays green after this slice. In a real browser (`.claude/skills/loop2-play/SKILL.md`): no sentence in the header before an error; an error thrown from a timer of the page (for one, through the browser's console) shows the sentence once under the bar, the line of saving staying beside it. Whether a screen reader announces the row that turns from hidden to shown is assumed, not checked: the report says whether it could be checked.
- **Change:** `src/browser/view/app.ts` · `src/browser/view/header-rows.tsx` · `tests/view/uncaught-failure.test.mjs`
- **Read:** `docs/task-cycles/przejscie-widoku-na-react/spec.md:52-66` Decision 1 — Where the sentence of the failure stands in the header ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:68-97` Decision 2 — The roots of the start page and their order ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:32-48` Constraints ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:173-173` Decision 7 — Tests, the failure row against any root ·
  `docs/task-cycles/przejscie-widoku-na-react/task.md:86-88` Questions carried to cycle ·
  `src/browser/view/last-resort.ts` ·
  `tests/view/page-document.mjs:93-166` withPage, inAct, fire, press, settle, typeInto ·
  `src/browser/styles.css:46-58` the line of saving and the line of a failure ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-play/SKILL.md` ·
  `foundations/decisions.md:1739-1788` D-253 · `foundations/decisions.md:2887-2927` D-262 ·
  Foundation entries row 5 (D-323) · Foundation entries row 3 (D-407) ·
  `foundations/invariants.md:1228-1236` uncaught-failure-game-state
- **Model:** same — the one choice of the cycle's design (D-323, the row drawn at the start and shown at the error) and a case that takes down other roots
- **Risk:** none
- **Checks:** first `npm test -- tests/view/uncaught-failure.test.mjs` with the new case failing where a variant's root takes the row down, then passing · `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/previous-save.test.mjs` · `npm test -- tests/view/owner-panel.test.mjs` · `npm run typecheck` · `npx eslint` and `npx prettier --check` on the changed files · the check in a real browser
- **Depends on:** Slice 6 · Slice 8 · Slice 9 · Foundation entries rows 3, 5

### Slice 11 — The React forms of the shared controls stand on a test of their own

- **Goal:** A new file `tests/view/shared-controls.test.mjs`, on the harness (`tests/view/page-document.mjs` imported before anything else, its `assert` used), receives from `tests/view/react-controls.test.mjs` each case or assertion that protects a behaviour or an attribute of the React form that a decision names, rewritten on the React form alone with the expected values written out: the submit button and its waiting text, disabled and busy (D-44); the kinds `positive`, `main` (type `button`, its class), `secondary` (D-275) and `tab` with `aria-pressed` (D-276); `aria-expanded` given and not given; a click reaching the handler and a waiting button giving none; a field's error message pointed at by its input; a typed value reaching the handler of a controlled field; a choice in a select list reaching the handler, the list keeping the screen's value; a greyed pick cell `aria-disabled`, not `disabled`, giving no pick (D-288, D-289); the number field keeping its typed text through renders, taking a new value only without focus, committing the clamped number, and committing by the screen's rule, the trip count rule included (D-395). The reviewer checks that each *Verification* line naming "both forms" (D-44, D-275, D-276) still has a case on the React form. The comments of the five `react-*.tsx` files that name a DOM form, a DOM function such as `setButtonWaiting` or the comparison test — each file's header, and lines such as the waiting prop's comment in `react-button.tsx` and the change comment in `react-number-field.tsx` — describe the React form alone and name its test, `tests/view/shared-controls.test.mjs`, in words that stay true once the DOM forms go; no code of these files changes. `react-controls.test.mjs` stays in this slice. Every test stays green after this slice, the new file entering `npm test`.
- **Change:** `tests/view/shared-controls.test.mjs` · `src/browser/view/controls/react-button.tsx` · `src/browser/view/controls/react-text-field.tsx` · `src/browser/view/controls/react-number-field.tsx` · `src/browser/view/controls/react-pick-cell.tsx` · `src/browser/view/controls/react-select-list.tsx`
- **Read:** `docs/task-cycles/przejscie-widoku-na-react/spec.md:18-18` Goals and non-goals, goal 5 ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:171-171` Decision 7 — Tests, the React forms' behaviour and attributes ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:178-178` Decision 7 — Tests, react-controls.test.mjs deleted ·
  `tests/view/react-controls.test.mjs` · `tests/view/page-document.mjs` ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `foundations/decisions.md:8577-8651` D-288 · `foundations/decisions.md:8889-8928` D-289 ·
  `foundations/decisions.md:4335-4348` D-395 · Foundation entries row 6 (D-44) ·
  Foundation entries row 7 (D-275) · Foundation entries row 8 (D-276) · Foundation entries row 2 (D-265)
- **Model:** same — a new test file receives the cases that protect behaviours from a 1335-line file, each rewritten on the React form with its values written out
- **Risk:** none
- **Checks:** `npm test -- tests/view/shared-controls.test.mjs` · `npm test -- tests/view/react-controls.test.mjs` · `npm test -- tests/quality/test_node_test_selection.py` · `npx eslint` and `npx prettier --check` on the changed files
- **Depends on:** Slice 5 · Foundation entries rows 2, 6, 7, 8

### Slice 12 — The DOM forms of the shared controls go

- **Goal:** `src/browser/view/controls/button.ts`, `text-field.ts`, `number-field.ts`, `pick-cell.ts` and `select-list.ts` and `tests/view/react-controls.test.mjs` are deleted. The type `SelectOption` moves into `src/browser/view/controls/react-select-list.tsx`, exported, and `program-panel.tsx` and `trip-plan.tsx` import it from there; nothing else in them changes. No import of a deleted file stays anywhere in the repository (a search for each file's name finds only the guidelines, which Slice 13 changes). The React forms' element trees, classes, attributes and props, and the names `react-*.tsx`, stay. Ground for deleting the test, under the testing guidelines' rule "Changing an existing test": settlement 2 changes D-265, whose comparison of the two forms was this file's requirement; its cases that protect the React form moved to `tests/view/shared-controls.test.mjs` in Slice 11. Every test stays green after this slice.
- **Change:** `src/browser/view/controls/button.ts` · `src/browser/view/controls/text-field.ts` · `src/browser/view/controls/number-field.ts` · `src/browser/view/controls/pick-cell.ts` · `src/browser/view/controls/select-list.ts` · `tests/view/react-controls.test.mjs` · `src/browser/view/controls/react-select-list.tsx` · `src/browser/view/program-panel.tsx` · `src/browser/view/trip-plan.tsx`
- **Read:** `docs/task-cycles/przejscie-widoku-na-react/spec.md:18-18` Goals and non-goals, goal 5 ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:178-178` Decision 7 — Tests, react-controls.test.mjs deleted ·
  `docs/task-cycles/przejscie-widoku-na-react/task.md:31-31` To do, item 5 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · Foundation entries row 2 (D-265)
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm run typecheck` · `npm test -- tests/invariants/test_application_build_kitchen_sink.py` · `npm test -- tests/view/shared-controls.test.mjs` · `npm test -- tests/view/program-panel.test.mjs` · `npm test -- tests/view/trip-plan.test.mjs` · `npm test -- tests/quality/test_node_test_selection.py` · `git grep -n -e "controls/button" -e "controls/text-field" -e "controls/number-field" -e "controls/pick-cell" -e "controls/select-list" -e "react-controls"` finding no file of code or tests · `npx eslint` and `npx prettier --check` on the changed files that remain
- **Depends on:** Slice 2 · Slice 6 · Slice 10 · Slice 11

### Slice 13 — The guidelines follow the change

- **Goal:** `guidelines/coding-browser-module.md` and `guidelines/styleguide-browser-view.md` describe the state after the change, without its history. The product writes guideline files only through `the-way-maintain-coding-guidelines` and `the-way-maintain-styleguide`; with no skill tool, read their files by path, `.the-way/product-guidelines/coding/SKILL.md` and `.the-way/product-guidelines/styleguide/SKILL.md`: their tables give the cycle's author the writing of the guideline files after `.the-way/product-guidelines/template.md` and the template of the discipline, each rule citing its decision, and never a meaning the task did not settle. Every meaning here is settled by the task (questions 1 to 4) and Foundation entries rows 1 to 8; a meaning beyond them is a question for the orchestrator, never a line written. In `coding-browser-module.md`: the rule "Wspólna kontrolka w dwóch postaciach" becomes the rule of one React form in `src/browser/view/controls/`, the constant of the warning sentence that the panel of a card taken down reads outside React, and the test of the React forms, `tests/view/shared-controls.test.mjs`; "Nowy ekran i moduły w DOM" says that no screen is built through the DOM APIs, that the page builds only the places roots mount in and the panel of a card taken down, and keeps its rule on `do not copy` files and their pure functions; "Strona wszystkich stanów bez Reacta" becomes the page bundled by the build step of its script and drawing the React forms; the example "Kontrolki w DOM i ich aktualizacja" describes the waiting screen's root, its update and the focus of „Spróbuj ponownie”, and the React controls' waiting props; the example "Gra na stronie i odpowiedzi serwera" describes the page's one value and the roots of the start page, the row of the failure included; the table "Files of this kind" loses the rows of the five deleted files and gives the new files no row, and no status changes (question 4 a); *Where in code* names `tests/view/shared-controls.test.mjs` in place of the deleted test; beside these, the sentence of the rule "TypeScript i DOM" that a screen not moved yet stays in the DOM APIs, and "Granicą między stroną w DOM a ekranem" in the example of the card. In `styleguide-browser-view.md`: "The kitchen-sink page" says the page shows each shared control in its React form, the menu's part made from the React forms, its last paragraph on code only the page needs staying as it stands; in "States of shared controls", the paragraph on the DOM and React forms and the paths of the DOM forms in the list of controls that depart from the states; in "Main button, secondary action and tab", the DOM calls named beside the React props. The fenced good and bad examples of both files do not change. Read the code each passage describes as it then stands: `src/browser/view/app.ts`, and the new `src/browser/view/waiting-screen.tsx`, `src/browser/view/header-rows.tsx`, `src/browser/view/page-sentences.tsx` and `src/browser/kitchen-sink/kitchen-sink.tsx`, each as far as a passage needs it. No code or test changes.
- **Change:** `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md`
- **Read:** `docs/task-cycles/przejscie-widoku-na-react/spec.md:21-21` Goals and non-goals, goal 8 ·
  `docs/task-cycles/przejscie-widoku-na-react/spec.md:193-198` Decision 8 — What the guidelines say after the change ·
  `docs/task-cycles/przejscie-widoku-na-react/task.md:34-34` To do, item 8 ·
  `docs/task-cycles/przejscie-widoku-na-react/task.md:55-60` Questions to settle, question 4 ·
  `.the-way/product-guidelines/coding/SKILL.md` · `.the-way/product-guidelines/styleguide/SKILL.md` ·
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/coding/template.md` ·
  `.the-way/product-guidelines/styleguide/template.md` ·
  `src/browser/view/app.ts` · `guidelines/coding.md` · `src/browser/AGENTS.md` ·
  `foundations/decisions.md:534-547` D-36 ·
  Foundation entries row 1 (D-269) · Foundation entries row 2 (D-265) · Foundation entries row 3 (D-407) ·
  Foundation entries row 4 (D-03) · Foundation entries row 5 (D-323) · Foundation entries row 6 (D-44) ·
  Foundation entries row 7 (D-275) · Foundation entries row 8 (D-276)
- **Model:** same — it writes meanings into two guideline files from the task's settlements, read from the maintenance skills' files, with no skill tool
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` · `npx prettier --check guidelines/coding-browser-module.md guidelines/styleguide-browser-view.md` · a search of both files finding no path of a deleted file and no name of a DOM function of a shared control
- **Depends on:** Slices 1 to 12 · Foundation entries rows 1 to 8

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Outcome: a shared control is written once, the view builds its page one way (Need, the line's goal) | Slices 2, 6, 8, 9, 10, 12 · entries rows 1, 2 |
| To do 1 — the kitchen-sink page bundled as the game is, every shared control in its React form, in today's states | Slices 1, 2 · entry row 1 |
| To do 2 — the start page, the line of saving and the sentence of a confirmation drawn in React, in roots of their own, the same texts, roles, places and focus | Slices 3 (tests), 6, 8, 9, 10 · entries rows 3, 4, 9 |
| To do 3 — the page's state one value; values that outlive a change kept apart | Slice 7 |
| To do 4 — after an error nothing handled the waiting screen of a sign-in shows the sentence alone | Slice 8 · entry row 5 |
| To do 5 — the DOM forms and the comparison test go; `SelectOption` stays available | Slices 11, 12 · entries rows 2, 6, 7, 8 |
| To do 6 — the panel in place of a card React took down built outside React from one constant shared with the React warning | Slice 5 · entry row 2 |
| To do 7 — two assertions of the uncaught-failure test check behaviour | Slice 4 |
| To do 8 — the guidelines follow the change | Slice 13 |
| Settlement row 1 — the kitchen-sink page bundled, React forms on it (D-269) | entry row 1 · Slices 1, 2 |
| Settlement row 2 — one form of each shared control; the panel's constant (D-265) | entry row 2 · Slices 5, 11, 12 |
| Settlement row 3 — separate roots for the start page (D-407) | entry row 3 · Slices 6, 8, 9, 10 |
| Question carried to the cycle — where the sentence of the failure stands so that no root's error takes it down | Slice 10 · entry row 3 |
| Spec, Decision 7: the account screen's four structural assertions and its `fire` clicks | Slice 3 |
| Spec, Decision 7: `sentenceOf` of the saver's test | Slice 6 |
| Spec, Decision 7: `assertWaitingWithSentence` | Slice 8 |
| Spec, Decision 7: the panel's class and role in the case of a card taken down | Slice 5 |
| Spec, Decision 7: the case of the failure row against any root | Slice 10 |
| Spec, Decision 7: the new test of the React forms and the deleted comparison test | Slices 11, 12 |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The kitchen-sink page is bundled in a slice of its own (Slice 1), the page still drawing the DOM forms, before its rewrite in React (Slice 2) | one slice for the build step and the page | none to the product; had it been one slice, the review of the trust boundary would read an 833-line rewrite beside it |
| The four structural assertions and the `fire` clicks of `account-screen.test.mjs` are rewritten first, in one slice (Slice 3), to pass on the base and after the roots | each assertion rewritten in the slice whose change breaks it | an assertion rewritten to hold on the base fails after a root slice; that slice returns, and the fix is one more pass over a 344 000-character file |
| The page's state becomes one value in a slice of its own, with nothing the player sees changed, before any root of the start page (Slice 7) | the state and the roots in one slice | a broken transition shows only in Slice 8 or later; the reviewer of Slice 7 has the existing tests alone to judge it |
| To do 4 is made with the waiting screen's root (Slice 8), not in the state slice, which draws the state stopped as today | To do 4 in Slice 7 | none to the product; Slice 7 would need the testing guidelines and the test file too |
| The row of the failure comes last among the start page's roots (Slice 10), so that its case can take down the roots of Slices 8 and 9 | the row first, its case extended later | none; the row of the failure stands as today's hand-built line until Slice 10 |
| Both warning rows in one module, `src/browser/view/header-rows.tsx` (the spec leaves one module or two to the maker) | a module for each row | a module to split later; nothing the player sees |
| The names of the new files are settled here — `header-rows.tsx`, `waiting-screen.tsx`, `page-sentences.tsx`, `kitchen-sink.tsx`, `tests/view/shared-controls.test.mjs` (the spec leaves them to the maker) | names left to each slice's executor | a later slice's *Change* names a file an earlier slice called otherwise; the orchestrator renames it in the handoff |
| The page's state and its pure helpers stay in `app.ts` (the spec leaves it to the maker) | a module of their own | `app.ts` stays long; moving them later is a refactor of one file |
| `src/browser/styles.css` changes in no slice: `header .save-line, header .failure-line` apply to the hosts, `.form-warning` has no margin, the notices keep their margins inside a block host, `.session-check` applies to the drawn element | a slice that adjusts the stylesheet | the executor of Slice 6, 8 or 9 sees another box in a real browser and returns; a slice for the stylesheet is added, which reads its 95 000 characters |
| To do 7 is a slice of its own with no code (Slice 4) | folded into a slice that changes code | none |
| The header comments of the `react-*.tsx` files are rewritten with the new test (Slice 11), in words true before and after the DOM forms go; the deletion slice (Slice 12) moves `SelectOption` | the comments changed in the deletion slice | none to the product; one deletion slice would change 13 files, over the limit of 10 |
| The guidelines change in the last slice, after the code they describe, read from the maintenance skills' files and the templates of the-way | each slice changing the guidelines it touches | for a few slices the guidelines describe the state before the change; no check reads them against the code |
</content>
</invoke>
