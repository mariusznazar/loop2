# Spec — Logowanie jako jedna karta, pierwszy ekran gry zbudowany w React

- Task: `.runs/task-cycles/logowanie-w-react/task.md`
- Open choice: the task's six *Questions carried to cycle*: what replaces the hand-made document model in tests; how the shared controls exist in a React screen while other screens keep them in DOM, and what the kitchen-sink page shows; how `app.ts`, which stays in DOM, mounts and unmounts the card; where the per-module compilation output stands once the browser's code is bundled; whether a tool guards React's rules; whether the kitchen-sink page stands up without a change of `scripts/kitchen-sink.mjs`.

Evidence stands in `.runs/task-cycles/logowanie-w-react/reports/spec-designer.md`, section *Trials*. The trial is a throwaway copy of the base with a working spike of the card, under `.runs/task-cycles/logowanie-w-react/spec-trials/react-card/`; it is evidence, not the change, and no code of it is to be copied as a model.

## Intent

A signed-out visitor stops seeing two forms and five rows of credits, and sees one card that says what the game is. Underneath, the card is the first screen in React, so this change also lays down what every later screen stands on: how the browser's code is built and bundled, what a test of a React screen runs on, how a control exists in both worlds, and how a page still in DOM holds a React screen. The behaviour of every form stays as it is today.

## Goals and non-goals

Goals:

- The card, its four states and everything the task's *To do* lists.
- `npm run build` writes per-module output for tests and one bundle for the browser; `npm run typecheck` reads `.tsx`; the image builds as before.
- Every case of `tests/view/account-screen.test.mjs` keeps protecting what it protects, on a document that React can draw on.
- The guards that pick files by extension read `.tsx`; the framework guard speaks of React and still fails on any other library.
- No test file under `tests/` on jsdom can take the machine's memory down with it, whichever assertion goes wrong, and a failing one names its case. A throwaway file on jsdom outside `tests/` takes the same limit by a written rule, which no mechanism can enforce on it (decision 11).

Non-goals:

- No picture behind the card (task 3), no folding of the footer's credits (task 24), no other screen in React (tasks 4, 5, 6, 13).
- No React form of the destructive button, the select list or the number field: the card uses none of them.
- No change of `eslint.config.mjs`'s rule set, no real-browser test (D-75, D-88), no change of `scripts/kitchen-sink.mjs`, `tsconfig.kitchen-sink.json`, `Dockerfile`, `.dockerignore` or `stryker.config.json`.
- No move of other test files off their own stand-ins: `tests/view/*.test.mjs` other than `account-screen.test.mjs`, `tests/view/icons.test.mjs:124` and `tests/invariants/test_icon_credits.py:82` keep theirs, changing only the path they import.
- No source map, no compression on the server, no change of the server's public directory.

## Constraints

- The task's *To do*, *Acceptance criteria*, eleven answered questions and six rows of *Settlements to record* are settled. Lines it cites moved on the base: `showForms` is at `src/browser/view/app.ts:268`, `root.append(header, main, createFooter());` at `:445`, the title „Loop” at `:134`, the README step of `npm run build` at `README.md:25` and the sentence „sees the forms again” at `.claude/skills/loop2-deploy/SKILL.md:225`. The runner counts 69 cases in `tests/view/account-screen.test.mjs`, where the task says 67.
- D-44 (screens build on the shared controls of `src/browser/view/controls/`), D-45 (nothing `npm run build` writes holds the kitchen-sink page), D-47 (one focus rule), D-43 (no value in place of a token; a width in `px` is a layout dimension and allowed), D-18 and D-96 (the sentence from the game's data), D-04 (the view changes the game state only through the simulation), D-98 and D-99 (the field rules), D-222 and D-225 (the forms' endings), D-97 and D-211 (the ways back to the card).
- D-29: the rule set does not change without a human-accepted change of that decision. D-33: every new package goes through the audit. D-75 and D-88: real events and focus stay a manual check, now joined by an agent's check in a real browser (D-254).
- `src/browser/AGENTS.md`: a value the token file does not hold enters it only with a source settled with the human. Without a human the card uses the tokens that exist, and a missing value is named in the report, never chosen.
- `guidelines/coding.md` and `guidelines/coding-content-data.md` for the new data file, `guidelines/styleguide-browser-view.md` for every file of the part.
- The machine runs other sessions: commit limit 59.8 GB, RAM 31.8 GB, 26 to 27 GB of commit in use while this was measured. No test on jsdom in which a comparison on an element can fail runs before the watchdog of decision 9 stands; after that, a throwaway file on jsdom starts it itself (decision 11).
- The trust boundary `package-lock.json`: the lockfile is written on Windows and the image is built on Linux, so it must carry `@esbuild/linux-x64`. `scripts/kitchen-sink.mjs` is left untouched, and question 7 of the task forbids its serving lines in any case.

## Decisions

### 1. Tests of a React screen run on jsdom 30.1.3

`tests/view/account-screen.test.mjs` loses its hand-made model and runs on jsdom, a development dependency pinned exactly. React throws on the hand-made model, so that model cannot stay.

Both ready-made imitations carried the page. The 69 cases of the base, unchanged in their bodies, ran on each through a thin adapter; 6 cases of the spike ran the React card inside the page still in DOM, with Node's mocked timers:

| Measured | jsdom 30.1.3 | happy-dom 21.0.4 |
|---|---|---|
| The 69 cases on today's DOM page | 68 pass | 68 pass, only after the test writes `Option` itself: `window.Option` is missing, and `createSelectList` calls `new Option`, so 44 cases failed without it |
| Time of the 69 cases (hand-made model: 0.4 s) | 3.0 s | 1.9 s |
| The spike's cases: card, sign-in, game in DOM, logout, reset form | all pass | all pass |
| React's warnings about `flushSync` or about unmounting | none | none |
| Packages it brings | 37 | 9 |
| Entries in the lockfile with React and esbuild | 576 | 549 |
| New advisories under D-33 | none | none |
| `getComputedStyle` honours `hidden` | yes | no |

The one failing case on both is a spy of the model's own (its stand-in `textContent` starts undefined), a matter of seeding it.

Chosen: jsdom, because it leaves the product's own call `new Option` unreplaced, where happy-dom needs a browser constructor written by the test, against the guideline's „Nie zastępuj mechanizmu”, and on a path 44 of the 69 cases walk. Rejected: happy-dom — faster by a second and 27 lockfile entries lighter, which is what jsdom costs. Rejected: extending the hand-made model until React runs on it — a browser imitation of our own to keep, where a ready one runs the same cases. Rejected: real-browser tests — D-75 and D-88 defer them. Cost if wrong: only the test harness of one file changes, since both imitations ran the same cases.

The harness is one new module, `tests/view/page-document.mjs` (no `.test.mjs`, so `node-test-selection` is untouched). It does what the trial showed to be needed:

- **It stands before React.** The test file imports it first, so that `window` exists when `react-dom` loads. Measured: with `window` installed after `react-dom`, a controlled field's `onChange` never fires; installed before, it does. Nothing fails loudly.
- **A fresh window per case**, as `onPage` gives a fresh document now, so a game left undisposed cannot answer another case's `visibilitychange`.
- **A control that becomes disabled loses focus.** Neither imitation does this and neither lets `blur()` do it; the model did. Measured: with the code that returns focus removed, the case still passes without this rule, and fails with it. It is kept as a rule of the harness, which watches `disabled` and moves focus to an element outside `body`.
- **No comparison on an element reaches Node's failure message.** A failing `assert.equal` on two rendered elements grew by about 2 GB/s at the end of another session's measurement on this machine, and that session names this spec's own trial, which ran such a comparison, the most likely cause of the low-memory errors of 12:52 to 13:00 that took down agent sessions. `--max-old-space-size=2048` did not stop the growth, and `timeout` stops it too late: 60 s at that rate is over 100 GB against a commit limit of 59.8 GB. Tests on jsdom therefore run under a watchdog that kills their process above a set memory limit (decision 9), and they take `assert` from this harness (decision 10). Node builds the message itself, by `inspect` with `depth: 1000`, `customInspect: false` and `getters: true`, before anything is thrown, so a `util.inspect.custom` on an element cannot shorten it. Why a rendered element explodes and a plain one does not was read without running a failing comparison: a plain jsdom element has no own enumerable key, so `inspect` stops at once, and a rendered one has five, among them `__reactFiber$…`, through which a walk following what `inspect` follows met 1,000,000 paths, the walk's budget, over only 253 distinct objects. `inspect` remembers only the current path (`ctx.seen`), so it writes an object out again for each path that reaches it, and its one brake, `ctx.budget`, counts per level of indentation. One failing comparison on a rendered element was then run once, under two caps: it confirms that the thread of decision 9 stops the growth, and it does not confirm this reading of why the memory grows.
- **React's work is awaited through `act`**, so `settle` wraps it; the flag `IS_REACT_ACT_ENVIRONMENT` stands in the harness; a mount that happens outside `act` is wrapped too, the only warning the trial met.
- **Typing goes through the input's native value setter and a bubbling `input` event**, the way React sees a change.
- **A report of React's development build through `console.error` fails the case.** Tests run React's development build, which reports hooks called in another order, missing keys and a field that changes from controlled to uncontrolled. Lines the product writes itself (`saved-game-load …`) are told apart.

What jsdom does not prove stays with a person and an agent: pressing Enter in a field does not send a form, a click on a label does not move focus, and nothing computes layout. Measured for Enter and the label on both imitations.

### 2. A shared control exists in two forms, one element tree

The card's controls are React components in `src/browser/view/controls/`, beside the DOM functions, drawing the same elements with the same classes and attributes. `styles.css` stays the one place of the look. Other screens keep the DOM functions unchanged. D-44 holds: the screens build on the shared controls of that directory, of which a control now has a form for each kind of screen until its last DOM screen moves.

- `src/browser/view/controls/react-button.tsx`: the button, with the kinds the card needs, plain and selected in its group; `submit`; a waiting text that stands for `setButtonWaiting`; `aria-pressed` and `aria-busy` as the DOM form sets them.
- `src/browser/view/controls/react-text-field.tsx`: the text field and the password field, with a visible label, an error message and the attributes the DOM forms set; the form's warning and note.
- A `.tsx` file cannot share its stem with a `.ts` file beside it: both would compile to one `.js`. Hence the prefix.

A new test, `tests/view/react-controls.test.mjs`, keeps the two forms alike: for each kind and state the card uses, it draws both and compares tag, attributes and text, with ids compared by what they point at and the input's `value` attribute left out (React writes it, it is no part of the look). Measured: the comparison gives „same” for a submit, selected and waiting button; the field's only difference is that `value`.

Rejected: wrapping the DOM functions in a React component (the report's „owinięte elementy”) — one implementation, but fields become uncontrolled, the card's state lives in elements, `setButtonWaiting` runs in effects, and this is what D-36 would then hold up as the exemplar every later screen copies. Rejected: moving the controls to React and mounting them in DOM screens — a React root for each control in 12 modules, a render that is not synchronous under `setButtonWaiting`, and it moves screens this task leaves in DOM. Rejected: a shared function of class names under both forms — it touches the DOM controls for what the comparison test already catches. Cost: the two forms exist until tasks 4, 5, 6 and 13 finish, and a new attribute is written twice; the test fails until both agree.

### 3. `app.ts` holds the card as it holds the game: an object it creates and disposes

`src/browser/view/account-card.tsx` exports, beside the components, one plain function that `app.ts` calls without any JSX:

- `createAccountCard(options)` returns `{ element, focus(), dispose() }`, the shape of `createGameView`. The options: the client, the page's one sentence (`ConfirmationNotice | null`), `signedIn(account, message)`, and, for a page opened by a reset link, `reset: { token, address, finished(ending) } | null`.
- It creates its own host element and root and renders synchronously with `flushSync`, so that when the function returns the card is in the element. This keeps every transition of the page synchronous, leaves no frame with an empty screen and lets `focus()` follow placement as `accountScreen.focus()` does today.
- `focus()` moves focus to the first field; the page calls it where it calls `accountScreen.focus()` today, after a confirmed logout and after a password was set. No other opening of the card moves focus.
- `dispose()` unmounts the root and removes the element. An answer still awaited is then ignored.
- A new root for each opening: nothing typed survives between openings, since no state outlives `dispose()`, where a root kept for the page's life would need a reset of its own.

In `app.ts`:

- The card element stands in `root` beside `header`, `main` and the footer, never inside `main`. While it stands those three are `hidden` (`[hidden]` in `styles.css` is `display: none !important`, so the header's `display: flex` cannot override it). The footer is kept in a constant.
- One function closes the card and shows the page, and every screen that is no card goes through it: the waiting screen, „Potwierdzanie adresu…”, the failed load and the game, four of the six places of `main.replaceChildren` today. Leaving the card therefore has one way out and no path can forget it. Sign-in is covered, since `enter` leads to `showGame` or `waitForServer`; „Anuluj” and a refused link are covered, since `checkSession` starts with `waitForServer`.
- One function places a card, closing any card before it: `showForms` and `showReset`, the other two places. A set password reaches `showForms` from the reset card, so the old card is disposed and a new one opens with the sentence.
- `showForms` passes one sentence, `sentence` or the pending notice. They cannot both stand: a non-null `sentence` comes only from a running game, and `showGame` has already taken the pending notice. A sentence in `warning` with `role="alert"`, a positive one with `role="status"`, as `createConfirmationNotice` gives them. `createPageNotice` stays for the refused save above the game.

The card calls `signedIn` and `finished` from an event handler or the continuation of an answer, never from render or an effect. Measured: disposing inside React's own click, as „Anuluj” does, gives no warning.

Rejected: `root.replaceChildren` for the card's screen — it removes the `<script>` from `body` and rebuilds the order by hand. Rejected: one root kept for the page's life with `render(null)` — a reset of state to keep right for nothing gained. Rejected: the card kept mounted and hidden — a typed password would stay in the page behind the game. Rejected: an asynchronous `root.render` — every caller then has to wait for the card, and the empty frame is possible. Rejected: JSX in `app.ts` — it stays a DOM module. Cost: `flushSync` is React's last resort, used here once, at the one boundary between the DOM page and a React screen; it goes when `app.ts` moves.

### 4. Per-module output moves to `dist/browser/`; `dist/public/` holds only what the server hands out

- `tsconfig.browser.json`: `outDir` becomes `dist/browser`, `jsx` becomes `react-jsx`, `include` adds `src/browser/**/*.tsx`; the exclusion of `src/browser/kitchen-sink/**` stays.
- `scripts/build.mjs`: without `--check`, after both compilations, it bundles `dist/browser/main.js` with esbuild into `dist/public/main.js`, then copies the HTML and the static files as today. It first removes `dist/public/` and `dist/browser/`, since a module left from an earlier build would be served or imported silently.
- The bundle: ES module, for the browser, target ES2022, minified, `process.env.NODE_ENV` defined as `"production"` (esbuild would otherwise leave React in development mode), esbuild's default keeping the licence comments. `src/browser/index.html` does not change.
- esbuild takes the compiler's output, not the sources, so the code tests import is the code that is bundled, and one compiler alone reads `.ts` and `.tsx`.
- React and react-dom stand in `dependencies`, exactly pinned, since they reach the player, as D-03's „runtime dependencies” reads; esbuild, `@types/react`, `@types/react-dom` and jsdom in `devDependencies`. The image's `node_modules` keeps about 8 MB it does not run.

Measured: 58 modules of 382,894 bytes become one file of 357,727 bytes minified, React and the spike included, 112,179 by gzip, 929,736 unminified; none of the listed frameworks' markers but `__REACT_DEVTOOLS_GLOBAL_HOOK__`; no import specifier left; no `process.env`; 5 licence comments; bundling in under a second. The lockfile written on Windows holds 26 esbuild platform packages, `@esbuild/linux-x64` among them. So minifying pays for itself: the page weighs less than today, and the task's 218 KB does not arrive.

Each thing the handoff asked to check:

| What | Rests on the layout? | What changes |
|---|---|---|
| `browser-view-framework` | yes | `BUILT_PAGE` stays and now reads the bundle, which still must import nothing. In the test `.tsx` leaves the foreign formats and joins the TypeScript ones; `react`, `react-dom` and their subpaths leave the forbidden names and the two React markers leave `FRAMEWORK_MARKERS`, since `__REACT_DEVTOOLS_GLOBAL_HOOK__` stands in the bundle. Every other framework's name and marker stays, so the test still fails on another library. |
| `application-build-output` | yes | Test: `dist/public` becomes `dist/browser` in `CONFIGURATIONS`; `.tsx` in `EMITTED_EXTENSION` with its control; a new case for the bundle. The sentence gains the bundling. |
| `application-build-layout` | yes, stays true: `dist/browser` and `dist/server` are distinct | Only the test above. |
| `application-package-layout` | no | `.tsx` in `SOURCE_EXTENSIONS`, with its control. |
| `application-build-kitchen-sink` | partly | The search stands over all of `dist`, so it holds. Literal at `tests/invariants/test_application_build_kitchen_sink.py:110`: `dist/public/kitchen-sink/…` becomes `dist/browser/kitchen-sink/…`. |
| `mutation-test-selection` | no | The selection reads names. `stryker.config.json` does not change: its `buildCommand` compiles `tsconfig.browser.json` wherever that writes, and `tests/sim/*` import the new path. |
| `node-test-selection` | no | `scripts/test.py` and `test-node-file.mjs` do not change. |
| `stryker.config.json` | no | See above. `.stryker-tmp` stands inside the repository, so `react` resolves from the parent directory when the build runs, before the link to `node_modules` is made. Seen in a run stopped at the dry run; mutants not run, see *Left to the maker*. |

Path literals, counted: `dist/public/sim`, `/view` and `/account-api` stand on 282 lines of 78 test files, 54 Node and 24 Python, and become `dist/browser/…`. Three constants change with them, in `test_application_build_output.py`, `test_icon_credits.py` and `test_terrain_drawing_numbers.py`. Three stay, as they mean what is served: `BUILT_PAGE` in `test_browser_view_framework.py` and `test_loop2_api_error_route.py`, `BUILT_GAME` in `test_loop2_one_serving_process.py`. So do `tests/http.test.mjs:26` and `:30`, which now read the bundle. A literal missed fails loudly: the module is not found.

Rejected: keeping `tsc`'s output in `dist/public/` and the bundle beside it under another name — no line of a test changes, but the server hands out 58 modules no browser loads, each with an unresolvable `react`, against D-06's „bundles … into the files the server hands out”, and `test_built_page_loads_only_its_own_code_and_no_framework` needs a hole for them, which is the guard item 13 keeps. Rejected: moving what the server serves instead, so `dist/public` keeps the modules — the name then lies, and the server, `public-file-access`, README and the HTTP tests move for it. Rejected: esbuild reading the sources — a second compiler of the same files, and tests would not import what ships. Rejected: tests importing the bundle — they import single modules. Cost: a mechanical diff across 78 files in the request, the price of one clear rule of what `dist/public` is.

### 5. No tool guards React's rules: the guideline and review do

`eslint.config.mjs` keeps its rule set (D-29), so `eslint-plugin-react-hooks` does not enter. `guidelines/coding-browser-module.md` gains the rules of hooks and of effects, and review keeps them.

What already reaches a `.tsx` file: `tsc` in strict mode; ESLint with `recommendedTypeChecked`, whose patterns and typed programs already take `.tsx` (measured: it runs on the spike's two `.tsx` files with no change of the configuration and no report); Prettier, whose patterns take `.tsx`; and, from decision 1, a report of React's development build failing a test, which catches a changed order of hooks on any path a case walks.

Rejected: adding the plugin — a human-accepted change of D-29 that this cycle cannot make alone, and the task does not ask for it. Rejected: a check written by the product — D-29 rejects those for the same reason. Cost if wrong: a dependency array left incomplete passes everything and shows as a stale value. Return condition: a defect of React's rules that passed tests and review reopens D-29 for the human. The cycle may name this choice in the request, for the human to overturn.

### 6. The kitchen-sink page stands up unchanged and shows what it shows today

Yes, `scripts/kitchen-sink.mjs` needs no change. Measured on the spike: with `RESET_REQUESTED_SENTENCE` in a module without React, the script byte for byte as on the base, the page builds, its compiled modules hold no bare import, and in a real Chromium it opens with all five sections and all ten form samples and no error but a missing favicon.

- `src/browser/kitchen-sink/kitchen-sink.ts` changes one import line; its form samples stay DOM. The page keeps showing every control and every form state D-44 and D-45 name; `tsconfig.kitchen-sink.json` does not change.
- The React forms do not stand on the page: decision 2's test keeps them the same element tree as the DOM samples the page shows, and the look lives in `styles.css`, which the page loads.
- The two buttons of the switch are the button selected in its group, a row the page has. The folded credits are no shared control (D-44 lists six), and the card's layout is no control, so nothing new goes on the page.
- The page's modules hold no React while the script does not bundle: a module it imports must not reach a `.tsx` file. `guidelines/coding-browser-module.md` says so. The first task that needs React on the page changes the script's build step, not its serving lines.

Rejected: bundling the page and drawing the real React forms on it — the page would show the card's real forms, at the price of a changed trust-boundary script, a second bundle and a second form of samples, for nothing the comparison test leaves open. Cost if wrong: a later task that lets a React module into the page's imports finds a blank page when it opens it.

### 7. The units of the change

| Unit | Does | Used by, and depends on |
|---|---|---|
| `src/browser/sim/data/about.ts` (new) | The game's name and its one sentence. | Read by the card and by `app.ts`'s header. Imports nothing. A file of kind `content-data`. |
| `src/browser/view/account-rules.ts` (new) | Pure and without React or DOM: `addressProblem`, `passwordProblems`, `registrationProblems`, `RegistrationField`, `RESET_REQUESTED_SENTENCE`. | The card, the kitchen-sink page and tests. |
| `src/browser/view/password-reset.ts` (kept) | Loses `createResetScreen`; keeps `readResetToken`, `ResetEnding`, `ResetOutcome` and `resetOutcome`. | `app.ts`, the card, `tests/view/password-reset.test.mjs`, unchanged. |
| `src/browser/view/account-screen.ts` (deleted) | Goes with `accountForm` and `createAccountScreen`. | In `src/` only `password-reset.ts` and `app.ts` use them, both changed. |
| `src/browser/view/account-card.tsx` (new) | The card and its four states, and `createAccountCard`. The exemplar of D-36. | `app.ts`. Depends on the client, the two units above, the React controls, `credits-section.tsx`. |
| `src/browser/view/credits-section.tsx` (new) | The folded credits, drawn from `footerCredits()` of `footer.ts`, so the content is the footer's. | The card, today. |
| `src/browser/view/controls/react-button.tsx`, `react-text-field.tsx` (new) | Decision 2. | The card. |
| `src/browser/view/app.ts` (changed) | Decision 3; the header reads the name from `about.ts`. | `main.ts`, unchanged, so `src/browser/*.tsx` does not enter the part map (question 10). |
| `src/browser/styles.css` (changed) | Rules of the card's screen and the card, on existing tokens; the rules of the two forms side by side go. | The card and `app.ts`. |
| `tests/view/memory-limit.mjs` (new, first) | Decision 9: `startMemoryLimit({ limitBytes, intervalMs })`, with the limit's value as its default. | `tests/view/page-document.mjs` and its test. Node's `worker_threads` and nothing else. |
| `tests/view/memory-limit.test.mjs`, `memory-limit-child.mjs` (new, second) | Decision 9's proof, and the guard of decision 10. | The gate. |
| `tests/view/page-document.mjs`, `tests/view/react-controls.test.mjs` (new, after those) | Decisions 1, 2 and 10. | `tests/view/account-screen.test.mjs` and the gate. |

The order among these is a requirement: the watchdog and its test stand and pass before the first test on jsdom runs, and the harness's `assert` before the first case is moved onto it.

The credits' test: `tests/view/icons.test.mjs` and `tests/invariants/test_icon_credits.py` keep their stand-ins for `createFooter`, which stays in DOM, and read the card's section through `renderToStaticMarkup`, which needs no document. Measured: the section renders so with `document` undefined, and `createFooter` renders on jsdom, so task 24 can drop either stand-in. The script `test_icon_credits.py` writes to a temporary directory has to reach `react` and `react-dom/server` from the built copy, not from where the script stands.

Every case of `tests/view/account-screen.test.mjs` is accounted for by name in the maker's report: moved with only its harness changed, or changed in its expectation with the item of *To do* or the answer that changes it, or, for `createAccountScreen`'s own cases such as „reset from outside …”, replaced by the case that protects the same behaviour through `createAccountCard` (`guidelines/testing.md`, *Changing an existing test*). `tests/view/password-reset.test.mjs:4` loses its mention of the hand-made model.

### 8. Readings the task leaves open

- **The switch** is two buttons selected in their group. Pressing the button of the state already shown does nothing: nothing is cleared, focus does not move. To do 4 speaks of switching.
- **The lock.** „Blokada całej karty” locks every field and button of the card, the switch and „Nie pamiętam hasła” included, as `lock` does today. The folded credits stay usable: they send nothing, and their links open in a new tab.
- **One form waits at a time** is held in a ref, set before the request leaves, not in state alone, since state shows only after a commit.
- **Focus goes back after the commit that unlocks**, since a disabled control cannot take it. The origin is the control of the form the player sent it from, or the submit button, as today.
- **The folded credits** are a native `<details>` with `<summary>` „Autorzy grafiki”: one click, the keyboard, and the one focus rule of D-47, with no state and no script. They stand last in the card in all four states, and stay open or closed across a change of state, since they are not remounted.
- **The order in the card:** the name (`h1`), the sentence, the page's sentence, then the switch or the state's heading (`h2`), the form with its message under it, the exit button, the credits. The header being hidden, there is one `h1`.
- **The fields keep everything they have today:** `autocomplete` tokens, hints, `inputmode="email"` and `spellcheck` off on the address, `noValidate` on the form, no trimming of a password.
- **Controlled fields.** The card's state holds what is typed, so that clearing is a change of state and the request reads the state.
- **The width** is a layout dimension of about 400 px, within the sketch's 380–420 px; the sketch is material, and the value stands in `styles.css`.

### 9. A test on jsdom runs under a memory limit inside its own process

`tests/view/page-document.mjs` starts, as its first act, a limit of 2 GiB on the process of the test file. A worker thread of that process reads the process's memory every 100 ms; above the limit it writes one sentence straight to the standard error and kills the process with `SIGKILL`. The thread is the point: a failing comparison blocks the main thread in one synchronous call, so no timer there would run, and the thread's timers are out of reach of the cases' mocked timers.

**The runs it covers.** Every run of a test file under `tests/`, by one means: the limit comes with the harness, and the guard of decision 10 refuses a file that reaches jsdom any other way. A file outside `tests/` is decision 11. So `npm test`, `npm test -- <file>` through `scripts/test-node-file.mjs` and a direct `node --test` are alike, the last of which the guidelines do not name but an agent can type. `scripts/test.py` and `scripts/test-node-file.mjs` do not change.

**How it reads memory.** `process.memoryUsage.rss()`, the working set on Windows and the resident set on Linux. One call, the same on both, with no branch by system, no new package and so nothing for `reserved_choices.md`. The trial ran on Windows only; the permanent test runs wherever the gate does, and `README.md` gives the Linux install.

**The process tree of the ruling.** The tree such a file kills is one process: a test on jsdom is a unit test, which by the glossary starts no process. Above it the runner stays alive, so the other files finish and the run reports. Nothing here sums a tree, so nothing measures the whole stage.

**The limit and its source.** Measured on a clean copy of the base, under a cap: the full Node stage of 1167 tests took 63.5 s, with a peak of 1.17 GB private and 1.68 GB of working set over a tree of up to 25 processes, and 0.21 GB in the largest single process. A process on jsdom walking the page 80 times, a fresh window each time and no assertion, peaked at 0.39 GB. So 2 GiB stands above the whole stage's peak, five times above a file on jsdom, and at a thirtieth of the commit limit. With a reading every 100 ms the real growth passed the limit by 0.32 GB, and it moves in steps, one reading of 586 MB in 128 ms, so count about 0.5 GB past the limit. Files on jsdom run side by side, so several going wrong at once add up, at about 2.5 GB each: 2 files today, and the 33 GB of commit free while this was measured holds 13 of them. That sum is why the limit stands low rather than at the free commit.

**What a person reads.** The sentence names the limit, the memory reached, the file by `process.argv[1]`, the likely cause and what to look for. Measured at a limit of 1 GiB and about 2 GB/s, on a main thread stuck in one synchronous stretch under mocked timers, in a script that stops itself at 3.5 GB:

| Run | Result |
|---|---|
| Direct, 3 times | Killed at a reading of 1027 to 1044 MB, in 0.6 s, exit 1 |
| `node --test` with a second, quiet file | The sentence, `✖` on the killed file, the second file passes, exit 1 |
| `scripts/test-node-file.mjs` | The sentence, `✖` on the file, exit 1, with „No test executed in the selected file.” after it |
| A real failing `assert.equal` on a rendered element on jsdom, once, limit 1 GiB, under `node --test`, with an outer cap of 3 GB proved first | Killed at a reading of 1345 MB, about 2.1 s after the comparison began; peak tree 1.295 GB; outer cap never fired; the runner stayed at 21 MB; `✖`, exit 1 |

So a kill reads as a failed file and a failed run, never as a pass, and the sentence says it was no flaky test. In a full gate that sentence stands far above the closing lines, which say only `'test failed'` at `:1:1`, so its wording tells a reader to look for it. What it cannot give is the case: the file's report dies with it, which is the reason for decision 10. The one run says nothing of the growth above 1.3 GB or at the limit of 2 GiB.

**The proof.** `tests/view/memory-limit.test.mjs` is an integration test, since it starts processes, and its child `memory-limit-child.mjs` allocates on a stuck main thread at a low limit, stopping itself far below anything that matters. It shows that a growing child is killed, reports the limit, the file and the cause and never reaches its own stop; that this reads as a failure through both `node --test` and `scripts/test-node-file.mjs`; and, as the control, that a child under the limit ends well. The proof runs inside `node --test`, so it clears `NODE_TEST_CONTEXT` for its children, and on both routes it asserts the sentence as well as the exit code: with that variable inherited, the second route exits 1 with no child started and nothing killed, and the first exits 0 with nothing run (measured from inside a test). It can fail in a second, with no failing comparison on an element.

**Stryker.** `tap.testFiles` holds no file of `tests/view/` today and `mutate` is `src/browser/sim/**/*.ts`, so it needs nothing now, and it fails no test on jsdom. A later task that adds a file on jsdom gets the limit with the harness, and has to do three things: read a kill apart from a killed mutant, since a process killed by the limit reads to Stryker as a failed test; count `concurrency: 4` in the sum above; and keep `tap.testFiles`'s selection guard (`mutation-test-selection`) true.

Ways weighed:

- **A supervisor over the stage** reading the tree from outside, which is what the ruling's words first suggest. It counts private bytes, sees every test file and can kill all of a tree. It needs a reader per system (`Get-CimInstance Win32_Process` here, `/proc` on Linux), at about 0.25 s a reading in a PowerShell kept open, so well past the limit, against about 0.5 GB for the thread; a wrapper in `scripts/test.py` and in `scripts/test-node-file.mjs`, with a direct `node --test` still bare; and a sum of the tree it cannot pin on one file. It lost on those, though it stays the way to go if tests other than those on jsdom ever need this.
- **A limit from the system:** a Windows job object needs native code or a new package, and `ulimit` and cgroups hold only on Linux.
- **`--max-old-space-size`:** measured by the session, it did not stop the growth.
- **`timeout`:** it reads time, and 60 s at that rate is over 100 GB.
- **The same thread preloaded into every test process by `NODE_OPTIONS`:** it covers tests the requirement does not name and misses a direct run. It is the way to widen this one.

Cost if wrong: the reading is a working set, which a machine short of RAM can trim below the commit, so under heavy pressure the kill can come late; at 2 GiB against 31.8 GB of RAM that takes a machine already in trouble. Stand-ins of other files have no limit: nobody has measured a failing comparison on them, and they hold no React. A file that truly needs more than 2 GiB fails loudly and raises the constant in a change that measures it. Return condition: more than about ten files on jsdom, or memory running away in a test that is not on jsdom, reopens the sum and the supervisor.

### 10. Tests on jsdom take `assert` from the harness; a guard refuses `node:assert` there

The harness exports an `assert` with the seven methods `tests/view/account-screen.test.mjs` uses: `equal`, `notEqual`, `deepEqual`, `ok`, `match`, `doesNotMatch` and `fail`, each taking a message as Node's does, since about 200 calls pass one. None builds Node's message and none puts a value on the error: each compares, then throws a plain error with a short description, an element by its tag and class. A guard in `tests/view/memory-limit.test.mjs` reads the test files and fails where a file other than `page-document.mjs` imports `jsdom` or `happy-dom`, statically or by a dynamic `import(...)`, and where a file that imports the harness imports `assert`, `node:assert` or `node:assert/strict`. `t.assert` of a test's context and a helper module that holds its own `node:assert` go round the guard: `guidelines/testing.md` says a helper on jsdom takes `assert` from the harness, and the thread answers the rest, at the cost of a killed file with no case named.

- `equal` and `notEqual` are `Object.is`, so a comparison on elements is safe and fails with its case's name. The 291 `assert.equal` of that file can stay as written where their expectation stands, which also keeps the port's diff small.
- `deepEqual` takes plain data alone, and refuses an element anywhere in either value, found by a walk of arrays and plain objects that enters nothing else. `util.isDeepStrictEqual` is safe behind that door and not without it: read in Node's source, its record of cycles is also kept along the path (`internal/util/comparisons`, `handleCycles`), so it can walk the same graph as `inspect`. Not run. A case with elements in a `deepEqual` compares names or identities instead: `assert.deepEqual(forms(root), {})` passes as it stands while no form is shown, and `assert.deepEqual(order, [logout, line, row])` at `tests/view/account-screen.test.mjs:2982` becomes one `equal` for each place, which keeps its identity.
- `assert.equal(a, b, message)` of Node was not trusted either: a message spares the building only in the loose `equal`, since `node:assert/strict` builds the diff even with a message (read in Node 24.17.0, not run), and the error still carries `actual` and `expected` to the runner, and what the runner does with them was not run.

This takes the place of the convention the trial began with, a helper remembered at each comparison, which the first lapse breaks. It joins the watchdog and replaces none of it: this keeps a failure small and names its case, and the watchdog answers everything this does not foresee. With the watchdog alone, a lapse costs a killed file with no case named out of 69, and the 19 focus comparisons alone are 19 chances of it. With this alone, something unforeseen repeats the crash.

Rejected: the watchdog with the rule as a convention — safe, but a failing focus case then reports only that its file died. Rejected: Node's `assert` with a message at each call — a rule to remember, and unproved. Cost: about forty lines of an assertion module with a worse printed diff than Node's, for plain data too, and a guard. Its own failing cases, on rendered elements, run only under the watchdog.

### 11. Settled by the orchestrator after the review of the revision

The review of the revision returned `FAIL` with two findings, in `reports/spec-revision-review.md`, and found the design sound. A revision gets one review, so these stand here as the orchestrator's settlement, unreviewed, and the review of the whole change judges them with the code.

- **A throwaway file on jsdom.** The run named as the most likely cause of the crash was a file under `.runs/` with a harness of its own, which the limit and the guard do not reach, and no way weighed reaches it. So it takes a rule, written in `guidelines/testing.md`: a file outside `tests/` that loads jsdom or happy-dom imports `tests/view/memory-limit.mjs` first and calls `startMemoryLimit` before it loads the imitation, and before that module stands no such file runs a comparison on an element that can fail. Rejected: leaving it to memory — that is how the crash came. Rejected: a preload by `NODE_OPTIONS` — it reaches only a run that sets it. Cost if wrong: an agent that skips the rule can repeat the crash; its handoff repeats the rule throughout this cycle. The two trial files holding such a comparison on a rendered element were deleted.
- **The proof cannot pass empty.** Decision 9's proof clears `NODE_TEST_CONTEXT` for its children and asserts the sentence on both routes.
- **The review's corrections of fact** stand in place: decision 1 on what the capped run confirms, decision 4's Stryker row, decision 9's figures, decision 10's guard and its methods' message.

## Foundation entries

Written by the task, whole:

- **D-03** (decision, changed): the browser view is built in TypeScript with React, its screens `.tsx` components, with no other UI framework.
- **D-06** (decision, changed): the build compiles both configurations and bundles the browser's code, React included, into the files the server hands out.
- **D-36** (decision, changed): the exemplar of `browser-module` is `src/browser/view/account-card.tsx`.
- **browser-view-framework** (invariant, changed): the view renders with React and browser APIs, with no other UI framework.

Written by the task, in part:

- **D-96** (decision, changed): the card, without the picture. The projected wording supersedes only that part: the clause on a load that meets an error of the code (D-213), which entered the log after the projection was written, stays, and so does „headquarters”, which task 4 writes.
- **D-27** (decision, changed): the folded section on the login card; the footer stays until task 24.
- **icon-credits** (invariant, changed): the credits stand in the card's section as well as in the footer until task 24.

From *Settlements to record*:

- **S1–S4** (decisions, new or into D-96): the state the card opens on and what stands above its fields; what the switch clears; where the page's sentence stands; waiting screens outside the card. The third leaves the words „above the account forms” of D-97, D-156, D-160, D-211 and D-225 standing and says where that now is.
- **S5** (into D-76): only a change of the boundary's principle ends the exception; a change of how the page is built is none. It enters though `scripts/kitchen-sink.mjs` does not change.
- **S6** (decision, new or into D-06): esbuild bundles the browser's code.

From this spec:

- **Decision, new:** tests of a screen in React run on jsdom, and only those files leave their stand-ins; it says what the harness keeps and carries decision 1's rejected ways.
- **D-88** (decision, changed): a ready-made document imitation, like a hand-made model, proves no real events, focus or rendering.
- **Decision, new (relates to D-44):** a shared control has a React form and a DOM form of one element tree until its last DOM screen moves, and a test keeps them alike.
- **Decision, new (relates to D-06):** per-module output stands in `dist/browser/`, and `dist/public/` holds only what the server hands out, the bundle made from that output.
- **Decision, new (relates to D-29):** no tool guards React's rules, with its return condition.
- **application-build-output** (invariant, changed): building also bundles the browser's code into the file the page loads.
- **Decision, new:** a test on jsdom runs under a memory limit of 2 GiB in its own process, and takes `assert` from the harness, with the ways rejected in decisions 9 and 10 and the return condition. D-77 stands: this limits one process's memory, not the time of a whole run.
- **Invariant, new** (working name `document-test-memory-limit`, method test): under `tests/` only the harness loads a document imitation, a file that uses it imports no `node:assert`, and above the limit its process is killed and the run fails with a sentence saying so.
- **Environment fact, new** (working name `node-assert-failure-inspect`): Node 24.17.0 builds the message of a failing assertion by `inspect` with the options decision 1 gives, so a later Node can make decision 10 needless or change it.

No entry: `application-build-layout`, `application-package-layout`, `application-build-kitchen-sink`, `preview-server-access`, `eslint-source-rules` and the part map keep their words: no file `src/browser/*.tsx` comes (question 10), and `tests/view/**` already claims the new test files. No glossary term.

Guidelines, by the routes the task gives: `guidelines/testing.md` by `the-way-maintain-testing-guidelines` (items 15 and 18, and with them the memory limit: the row `browser-view`, the recipe `unit test`, the harness's `assert`, the rule of decision 11 for a throwaway file, and `tests/view/memory-limit.test.mjs` in the recipe `integration test`), `guidelines/coding-browser-module.md` by `the-way-maintain-coding-guidelines` (item 16, with decisions 2, 5 and 6), and there too the row of `about.ts` in `guidelines/coding-content-data.md`.

## Left to the maker

- The order of the work, which the plan settles, with one thing fixed: the watchdog and its test come first, before any test on jsdom (decision 7). After that, decision 1 can be proved before any React enters: the port of the 69 cases ran on the DOM page in the trial.
- The wording of the limit's sentence, and how `tests/view/memory-limit.test.mjs` bounds its own waiting.
- The state's shape in the card (one reducer or several states), the division of its components within the file, the names of its props and of the harness's helpers, as long as the interfaces above hold.
- The rules of the card in `styles.css`, on existing tokens.
- How the bundle's case in `test_application_build_output.py` proves bundling, and the wording of each control case of To do 14. On the token guard, a `.tsx` control flags a colour in a `style` attribute; measured, the reader needs only the extension.
- How `tests/view/page-document.mjs` tells the product's console lines from React's.
- Running what the trial did not: the image (`Dockerfile`), Stryker on `src/browser/sim/data/about.ts`, which the review of a changed file of `simulation` does anyway, and the full gate.
