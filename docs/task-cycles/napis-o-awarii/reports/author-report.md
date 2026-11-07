# Author report — task `napis-o-awarii`

**Status:** done with concerns (concerns listed below; none blocks).

## Commits (branch `task/napis-o-awarii`, base `5694146`)

- `cbe0a66` feat: handle an error no code of the game handled (code and tests, items 1–5)
- `af2cfae` docs: record D-323, D-253 change, D-262 addendum, the HTML fact, the invariant; coding guidelines (items 7 and rows 1–5)
- `bd1971d` docs: the loop2-play skill paragraph (item 6), both copies

## Files changed (added / removed lines)

- `src/browser/view/last-resort.ts` +87 (new): `installLastResort`, `errorWords`, `FAILURE_SENTENCE`
- `src/browser/view/app.ts` +40 −11; `account-card.tsx` +76 −7; `game-view.ts` +17 −3; `src/browser/styles.css` +11 −4
- `tests/view/uncaught-failure.test.mjs` +790 (new); `tests/view/page-document.mjs` +1 −1; `tests/view/page-document.test.mjs` +16
- `foundations/decisions.md` +53 −17; `environment_facts.md` +6; `invariants.md` +10
- `guidelines/coding.md` +6 −3; `guidelines/coding-browser-module.md` +17 −5
- `.claude/skills/loop2-play/SKILL.md` +18; `.agents/skills/loop2-play/SKILL.md` +18 (the twin that `tests/agent_workflow/test_loop2_play_skill.py` holds equal)

## What was made

1. `installLastResort({ target: window, onUncaught })` (called at the top of `startApp`) listens to `error` and `unhandledrejection`, cancels the event, writes `uncaught kind=… code=… place=view/last-resort.installLastResort` once per distinct line (a `Set`), and tells the page. Kind and code go through the same word filter as the existing `saved-game-load` line (now shared: `errorWords`; `recordLoadFailure` uses it, its output unchanged).
2. Sentence „Coś w grze się zepsuło — odśwież stronę.” in `warning` (the `form-warning` control, no new shared control): header row created at the first error, right after the bar and so above the line of saving (`bar.element.after`); in the card, inside the form's section under the submit button where a refusal's sentence stands (React context `FailedContext`, `AccountCard.fail()`); a card built after the error starts with it (`failed` option); when React takes the card down, `createRoot(element, { onUncaughtError })` replaces the element's children with a panel (`account-card-failure`, styled like the card) holding the sentence alone, and calls `onUncaught`, which the page turns into `lastResort.report(error, "view/account-card.createAccountCard")`.
3. `GameView.halt()`: the store (`GameStore.apply`) rejects every later result; the clock is disposed, so the saver's `read()` and `keep()` make no reading. A game built after the error is halted at once (`showGame`). Saving goes on unchanged (D-207/D-208/D-97).
4. Items 5 (foreseen failures keep their own sentence): no code needed; tested.
5. Foundation: D-323 (row 1, new), D-253 edited in place (row 2; scope now includes `browser-view`, *Based on* gains the fact), environment fact `html-exception-reporting` (row 3), invariant `uncaught-failure-game-state` (row 4), D-262 third sentence (row 5). `foundation_check.py`: 0 errors.
6. `guidelines/coding.md` `### Recording a failure`: the sentence "gdzie tej obsługi jeszcze nie ma" replaced by the statement that the browser has the handler (rule's *Decision* gains D-253); `coding-browser-module.md`: row for `last-resort.ts` (`copy`) and updated examples.
7. `loop2-play` SKILL.md: section "Read the console" (`playwright-cli console [error]`, the line, browser entries about failed requests are no failure).

Per-entry meaning (English / Polish), marked per the foundation step:
- D-323 (`row 1`): after an error nothing handled, the game state stops changing until reload, saving goes on with the last whole state, and the sentence stands once in `warning` in the three places. / Po błędzie, którego nic nie obsłużyło, stan gry przestaje się zmieniać do odświeżenia, zapis idzie dalej z ostatnim całym stanem, a zdanie stoi raz w `warning` w trzech miejscach.
- D-253 change (`row 2`): the page has a last-resort handler too, which cancels the event and writes one plain-text line without text or stack. / Strona też ma obsługę ostatniej szansy: anuluje zdarzenie i pisze jeden wiersz bez treści i stosu.
- `html-exception-reporting` (`row 3`): the HTML Standard lets the user agent report to a developer console only when the page did not cancel the event. / Standard HTML pozwala przeglądarce zapisać błąd w konsoli tylko wtedy, gdy strona nie anulowała zdarzenia.
- `uncaught-failure-game-state` (`row 4`): after such an error the page's game state does not change and every save sends the state from before it. / Po takim błędzie stan gry w pamięci strony się nie zmienia, a każdy zapis wysyła stan sprzed błędu.
- D-262 addendum (`row 5`): the sentence alone in the card's place when React takes the card down. / Samo zdanie w miejscu karty, gdy React ją zdejmie.

## Checks (command → exit code)

- Invariant test seen failing, then passing: `npm test -- tests/view/uncaught-failure.test.mjs` → **1** before the code was wired (`last-resort.ts` present, unused; the invariant case failed at "the clock no longer ticks: expected 1, got 2", i.e. the game kept running after the error; all 11 cases then failed on assertions); after the code → **0** (12 cases).
- `npm test -- tests/view/{uncaught-failure,account-screen,page-document,menu-bar,game-saver,clock}.test.mjs` → 0 each (12, 126, 56, 28, 20, 23 passing); `react-controls`, `email-confirmation` → 0 (earlier, before the card moved into the form; account-screen and the rest re-run after).
- `npm test -- tests/invariants/test_browser_view_{token_values,framework,focus_outline}.py`, `tests/quality/test_node_test_selection.py` → 0; `python -B -m unittest tests/agent_workflow/test_loop2_play_skill.py` → 0.
- `npm run typecheck` → 0; `node node_modules/eslint/bin/eslint.js --max-warnings 0 --suppressions-location <empty {}> src tests/view` → 0; `prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser tests/view` → 0.
- `python -B .the-way/elements/common/foundation_check.py` → 0 errors. `check_instructions.py .` → 0 errors, 78 warnings (same count as on the base).
- Not run: the full `npm test` (the orchestrator's); `tests/quality/test_quality_invariants.py` whole-repo lint (ran eslint and prettier on the touched trees instead); ruff/shellcheck (no Python or Bash changed).

## Mutation check (own work)

Each mutant applied, built, focused file run, restored (script `.runs/mutate.py`, not tracked): apply ignoring halt; halt keeping the clock; no `preventDefault` on `error`, and on `unhandledrejection`; no dedupe; no `game.halt()`; new game not halted; `card.fail()` without redraw; failure sentence outside the form; card-down without the sentence; new card not failed; page not told of the card; two header lines; no listener — all killed. Two mutants survived and were removed as code: the `if (!halted)` guards in `read()`/`keep()` (equivalent: `halt()` disposes the clock, so `flush()` is a no-op) and an `if (failed) return` guard in `onUncaught` (idempotent). 

## Requirement most likely unmet, and its check

"The sentence in the card stands where the refusal's sentence stands" — the first build put it after the whole form section (below „Nie pamiętam hasła”); the real-browser screenshot showed it, I moved it into the form under the button (`assertUnderTheButton` tests it). Also "one sentence whatever the number of errors" (tests: three errors, one element; mutant "two header lines" killed).

## Manual check in a real browser (`loop2-play`, `npm run local`, Playwright CLI) — evidence only here

Method: `playwright-cli eval` of `setTimeout(() => { throw new TypeError('secret-value-in-message') }, 0)`, `playwright-cli console`, `screenshot`, each screenshot opened and inspected.
- Console after the throw: `[ERROR] uncaught kind=TypeError code=none place=view/last-resort.installLastResort @ …/main.js:8` and no browser entry `Uncaught TypeError …`; the message text appeared nowhere. An unhandled rejection of a `RangeError` gave `kind=RangeError` the same way.
- Card screen: sentence in orange (`warning`) in the card under the form (first build: below the exit link; moved).
- Game screen (account made, character sent, map run at „Minuta 13”): sentence in the row under the menu bar; 5 s later still „Minuta 13”; clicking „4×” and „Pauza” changed nothing (no „(pauza)”); 33 s later (30 s save check) reload gave „Minuta 13 … (pauza)” — the state from before the error was saved; after the reload no sentence.
- Waiting screen (the account request delayed 6 s through `page.route`): the sentence stands under the bar, above „Sprawdzanie logowania…”.
- React taking the card down: reproduced by replacing `Node.prototype.removeChild` with a throwing function, then switching the card's tab: the card was replaced by a panel with the sentence alone, console line `…place=view/account-card.createAccountCard`. (A first attempt that replaced `setAttribute` also broke the page's own fail panel; irrelevant to production.)
No evidence kept in the repository (`.playwright-cli/` removed).

## Choices (way rejected, cost if wrong)

- Where the handler is installed: at the top of `startApp`, on the global `window`, so every jsdom case has its own listener. Rejected: `main.ts` (tests would not exercise it; the page needs the halt hook anyway). Cost if wrong: small move.
- Other eight React roots keep the default `onUncaughtError`: React's default calls `reportError` (a window `error` event), which the listener catches; only the card root needed its own handling (it must put the sentence in its place). Verified in jsdom with the menu-bar root (test "an error in the drawing of a root …"). Rejected: an option on every root. Cost: none seen; in React's development build inside `act` an uncaught error is held until `act` ends, so tests of this path run outside `act` (documented in the test).
- Header sentence element created lazily at the first error (not always present, hidden): an existing test (`a failed save shows its line under the menu bar`) asserts the header's children are exactly `[bar, save-line]`; I did not change an existing test. Rejected: always-present hidden element.
- `halt()` stops the clock by `dispose()` rather than guarding every read — fewer unprotected branches.
- Failure panel for a card taken down uses a distinct class `account-card-failure` sharing the card's panel rule (so the text stands on a solid panel over the backdrop, per the stylesheet's own rule that every text stands on its panel), instead of bare text on the picture. Reading of D-262 "alone": nothing but the sentence in the panel.
- Place strings: `view/last-resort.installLastResort` for the window path, `view/account-card.createAccountCard` for the card root (the place that handled it).
- The invariant's test is a Node test in `tests/view/` citing `// invariant: uncaught-failure-game-state`, not a Python test under `tests/invariants/` as the handoff guessed: browser-view invariants of this kind (`expired-session-unsaved-progress`) already stand in `tests/view/account-screen.test.mjs`, the cheap test needs jsdom, and `tests/view/**` is already in the part map. Rejected: a Python wrapper that runs Node.
- Part map: no change. All new files lie under `src/browser/view/**` and `tests/view/**`, which `browser-view` already claims; `foundation_check.py` reports 0 errors. Glossary: no new term (no word used in another meaning).
- Item 5 is not written into D-323's binding sentences (no row carries it); it stands in D-208, D-96, D-213 as before, and in the test "a failure the game foresees keeps its own sentence alone". D-323's *Verification* names the contrary as a violation only for a failed save.

## Reach beyond the handoff

- `guidelines/coding-browser-module.md` (a coding guideline of the part, rows and examples for the new module); read whole as the handoff listed.
- `.agents/skills/loop2-play/SKILL.md` (the twin `test_loop2_play_skill.py` requires equal to the `.claude` copy).
- `src/browser/styles.css` (two selectors extended; no value added).
- `.the-way/product-guidelines/template.md` and `coding/template.md`, `.the-way/elements/{decisions,invariants,environment-facts}/…`, `.the-way/instruction-files/{SKILL,placing,kind_skill}.md` (the skills' own files). Foundation entries read by search rather than whole: D-96, D-208, D-252, D-253, D-262 whole; the other decisions of the handoff list only where a grep hit them (not read whole: D-62, D-122, D-132, D-173, D-203, D-204, D-211, D-259, D-261, D-264, D-265, D-286). The invariant list and `node-uncaught-default-print` read as the handoff said.
- Skill `the-way-maintain-instruction-files` invoked as asked; its entry point said to stop when a product has its own copy, and this product has none in `.claude/skills`, so I followed the pinned `.the-way/instruction-files/SKILL.md` directly.
- The step of the foundation steps "critique before collective review" (a fresh agent) was not run: the handoff forbids dispatching agents; the reviewer of the change reads the entries.

## Mismatches in the task's *Context* against the worktree (`5694146`)

None found for the cited lines (`clock.ts:60,84–100`, `app.ts:77,159–165,363–364`, `account-card.tsx:645`, `menu-bar.tsx:310`, `GameStore.apply`, `game-saver.ts:33`). The React lines cited are from `react-dom-client.production.js`; the development build (what the tests run) differs: inside `act` it keeps an uncaught error until `act` ends and also writes a `console.warn` for the default handler.

## Searches not found or unclear

- No existing environment fact for React's behaviour that an uncaught render error unmounts the root and reaches `onUncaughtError`; D-323 has *Based on* `none` although the card-down branch rests on it. Not in the task's rows; candidate for the human (a fact of React 19.3.1 with a source in its repository).
- The handoff says the new invariant test goes "under `tests/invariants/`"; unclear whether that was a requirement or a guess (see Choices).
- `the-way-maintain-coding-guidelines` is a refinement skill (leads the human); the cycle's author edits guideline files by its templates. I followed `product-guidelines/template.md` and `coding/template.md`.

## Concerns

- A window `error` event is also fired by React for a *recoverable* error (default `onRecoverableError` uses the same path) and by the browser for a few benign cases (a cross-origin "Script error."); each would show the sentence and stop the game. This is the false-alarm risk the definition accepted ("may show with no fault"); D-323's *Rationale* marks it a hypothesis. The game uses no `ResizeObserver`.
- After a break the saver's 30-second check can still send once if the state changed after the last save; that is the intended "last whole state".
- The sentence is a `role="alert"`; a screen reader announces it when it appears (same control as the refusal sentences).
- The development-build `console.warn` from React appears in the output of the test that crashes a menu-bar root (muted and counted in that test).
