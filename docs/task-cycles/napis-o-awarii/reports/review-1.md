FAIL bd1971decef013bd2a5bd5f6a8f9ac21343b6fff

# Review of the whole change — task `napis-o-awarii`

Variant: the whole change. Range `5694146..bd1971decef013bd2a5bd5f6a8f9ac21343b6fff` (commits `cbe0a66`, `af2cfae`, `bd1971d`; 15 files, +1166 −51), computed with `git diff 5694146..HEAD` and `git log 5694146..HEAD`; `git rev-parse HEAD` = `bd1971decef013bd2a5bd5f6a8f9ac21343b6fff`, as given. `.the-way` at `61c72fb6347649a9bd61a71f0d2695f2e91e8b6a`, equal to the gitlink. Route: one author, no plan, no spec; so no slice had a review of its own, and every finding below comes from no slice.

Counts: blocking 1 (Important), Minor 7, out of scope 0.

## Findings

### Important (blocking)

**I-1. A game built after the error still takes a simulation result and saves a state the error came before — against To do 3, row 4 (invariant `uncaught-failure-game-state`) and D-323, which this change writes.**

- Place: `src/browser/view/app.ts:376`–`:389` (`showGame`: `createGameView(...)`, then `if (failed) view.halt();`) with `src/browser/view/game-view.ts:606` (`clock.catchUp()` as the last step of `createGameView`) and `:243`–`:261` (`store.apply`, which calls `saver.moment()` when a result ended a map run of a loop).
- What is wrong: `halt()` runs only after `createGameView` returns, and by then the catch-up of D-247 has gone through `store.apply` unhalted. A game built after the error — after „Wyloguj” and a new sign-in, after a sign-in from the card, after a save that found no session (D-211), or when the error came on the waiting screen before the first game — so takes the catch-up's result. Where that result ends a map run of an earning loop, the saver sends the changed state at once (D-207). The task says the store "odrzuca każdy kolejny wynik symulacji … aż gracz odświeży stronę" (To do 3). The invariant this change writes says "the game state held in the page changes no more until the page is reloaded, and every save the page sends carries the game state as it stood before the error". D-323's first binding sentence says the same. The author's report says "A game built after the error is halted at once", and that is true only after its catch-up.
- Why it matters: the change's own invariant and decision say something its code does not do (WAY-263: Important). The case the decision warns of is real on this path: a broken catch-up or loop code runs again at every game built after the error.
- Evidence: a scratch test I wrote outside the worktree (`C:\Users\Mariusz\AppData\Local\Temp\claude\c7b90770d5ecab56\4038ac73-063e-411e-86b4-870359648570\scratchpad\catchup-after-error.test.mjs`). It starts the page, reports a `TypeError` to the window on the waiting screen, answers the account, and loads a save of Ala in an earning loop one game minute from the end of its map run (the `loopingAla(true)` state of `tests/view/account-screen.test.mjs:2056`), saved one real minute before the clock. Result: `node --test catchup-after-error.test.mjs` → exit 0, output `SCRATCH {"savesAfterError":1,"sentDiffersFromLoaded":true}`. One save request goes after the error, and its `game` differs from the loaded one. The change's own test "the sentence stays until the page is reloaded: … a game built after it both show it, the game taking no change" (`tests/view/uncaught-failure.test.mjs:580`) loads `passing()`, which has no earning loop. Its catch-up changes nothing, so the test cannot catch this.
- What fixing it needs: a choice, because D-247 says "It runs on its own after each load of a saved game state: after a sign-in, after a reload …, after a sign-in to the same account with the state kept in the page's memory (D-211)". For a game built after the error, D-247 and D-323 collide, and no precedence is recorded. Three ways out, each with its cost:
  - (a) Build no game after the error, so a sign-in after it stops at the waiting screen with the sentence. D-247 then has no load to catch up after, and the invariant holds. Cost: a player who signs in after the error sees no game until a reload, which the sentence already asks for.
  - (b) Narrow D-323 and the invariant to the game standing at the error, letting a game built later catch up and then halt. Cost: a meaning wider than rows 1 and 4, so the human has to accept it.
  - (c) Halt before the catch-up. Do not take this way: the halted game's saver stamps the clock's start moment as the save time (`withSaveTime(state, options.moment())`, `src/browser/view/game-saver.ts:138`) on a state not caught up. The next load then catches up only from that later moment, and the earning loops lose the minutes between.
  Which way to take is the orchestrator's call, with the human where (b) is taken.

### Minor

**M-1. The panel of a card React took down builds by hand the tree of the shared control `createFormWarning`, in the exemplar file of the kind.**
Place: `src/browser/view/account-card.tsx:671`–`:680` (`createFailureCard`: `document.createElement("p")`, `className = "form-warning"`, `role="alert"`). D-44 has screens build their controls from `src/browser/view/controls/`. `guidelines/coding-browser-module.md` (rule *Nowy ekran i moduły w DOM*, Bad: "Nowy ekran buduje elementy przez `document.createElement`") and its example text name `createFormWarning` from `text-field.ts` as the DOM form of this sentence. Because the panel stands outside React, the DOM form of the shared control is the right tool: `createFormWarning()` then `.set(FAILURE_SENTENCE)`, as `app.ts:227`–`:228` already does for the header line. Effect: a later change to the shared control misses this copy, and `tests/view/react-controls.test.mjs` does not compare it. The copy sits in `account-card.tsx`, the exemplar of D-36, which later screens copy.

**M-2. `last-resort.ts` gets a row with the status `copy` in `guidelines/coding-browser-module.md:44`, which no audit gave it and the task did not ask for.**
The coding template says "a file added after that audit takes no row until the guidelines are refreshed or extended" (WAY-200, `.the-way/product-guidelines/coding/template.md:228`–`:229`). To do 7 asks only to correct the sentence of `### Recording a failure`. The status `copy` tells later work to imitate the file. That is low risk for a module this small, but the status is a judgment of an audit through `maintain-coding-guidelines`. Either drop the row, or name it in the request as a status for the human to accept.

**M-3. `LastResort.remove()` is unused code.**
Place: `src/browser/view/last-resort.ts:48`–`:49`, `:82`–`:85`. Neither the page (`app.ts` keeps `lastResort` for `report` alone) nor any test calls it. The task did not ask for it, and nothing protects it.

**M-4. Two assertions of the change's tests pin implementation details rather than the behaviour the requirement fixes (`guidelines/testing.md`, *Behaviour, not implementation*).**
- `tests/view/uncaught-failure.test.mjs:380`–`:384` counts live `setInterval` timers ("the clock no longer ticks"). The requirement is that the state does not change and that a save reads no clock. A correct implementation that kept its interval but read nothing would fail this check. The same test's later checks (no save after a tick and after acts; „Wyloguj” sending `sentBefore.game`) already protect the behaviour.
- `tests/view/uncaught-failure.test.mjs:720` asserts that React's development build calls `console.warn` exactly once. That is the behaviour of a dependency, and a React update can change it without any change of the product.

**M-5. D-323 records no precedence over decisions whose sentences describe a game that goes on.**
D-323's *Relations* reads only `derives from D-252`. Some decisions say what the player can do or what the game does, and after the error that is no longer true: D-62, D-122, D-132 and D-173 („Restart”, „Wznów”, „Zakończ”), D-283 (leaving the screen pauses), D-211 ("After a sign-in to the same account the game sends that state and goes on from it") and D-247 (I-1). The task's accepted reading in its answer to question 1 covers the sentences of the definition at lines 196, 556, 631, 691, 841, 916 and 1218 as describing a game that works. D-211 and D-247 are not among them. The decision template has the prevailing decision name the other as `narrows` (WAY-25). Without that, an agent comparing a change with D-211 or D-247 meets a collision with no precedence recorded. This is graded Minor because the task's reading covers most of these decisions; D-247 is part of I-1.

**M-6. When the uncaught error comes from the saver's own synchronous code, saving stops for good and „Wyloguj” waits forever, so D-323's "saving goes on as D-207, D-208 and D-97 give it" overstates.**
Place: `src/browser/view/game-saver.ts:131`–`:141`. `sendNow` sets `inFlight = true` before `read()`, `withSaveTime` and `savedGame`. If one of these throws, no answer ever comes. Every later `moment()` only sets `pending`, `check()` returns at `inFlight`, and `saveBeforeLogout()` waits for a request that never ends, so the menu stays at „Wylogowywanie…”. The task assumed such an error "wraca przy każdej chwili zapisu" (question 4). This is pre-existing behaviour of the saver, which this change does not touch, but D-323 now claims the opposite. I reasoned this from the code and did not run it. Either clear `inFlight` when `sendNow` throws, or leave it to a later task and name it.

**M-7. The styleguide still says a form puts one sentence in `warning` under its button.**
Place: `guidelines/styleguide-browser-view.md:222` ("Formularz stawia pod swoim przyciskiem jedno zdanie w `warning`"). After the change, a card form can hold the refusal's sentence and „Coś w grze się zepsuło — odśwież stronę.” one under the other (`account-card.tsx:283`–`:284`), as the task wants ("tam gdzie stoi zdanie odmowy"). The rule does not name the second sentence, so a later review of the browser view may flag correct code. The task did not ask for a styleguide change, so it is enough to name this.

## Coverage of the task

- To do 1: catching on every screen. Met. The window listener catches errors on game, waiting and card screens. The card root has its own `onUncaughtError`, and other roots reach the window through React's default `reportError`. Tests: `uncaught-failure.test.mjs:534`, `:560`, `:695`, `:725`, `:757`.
- To do 2: the sentence, its role, its places, once. Met. The header row sits above the save line, the card sentence under the button inside the form, and the panel alone in the card's place. Tests: `:496`, `:534`, `:560`, `:757`.
- To do 3: not met for a game built after the error (I-1). Met for the game standing at the error (invariant test `:339`).
- To do 4: the event is cancelled, one plain line, deduplicated, no text or stack. Met. Tests: `:429`, `:475`. I confirmed both by a mutant (below).
- To do 5: foreseen failures keep their own sentence alone. Met; test `:631`.
- To do 6: the `loop2-play` paragraph. Met in both copies, which are identical (`diff` → no output); `tests/agent_workflow/test_loop2_play_skill.py` passes.
- To do 7: the sentence of `guidelines/coding.md` `### Recording a failure` now says the browser has the handler. Met. The rule's *Decision* gains D-253, which is correct, since D-253 now carries the browser. M-2 is a separate addition.
- Row 1 → D-323. Its binding sentences say what the row says. Beyond the row's words, they add that the save is read without a new reading of the clock (To do 3 and the answer to question 1) and that the page writes its line as D-253 gives it; both have sources in the task. *Rejected* takes the *Not chosen* of questions 1, 2 and 3 and nothing derived. *Rationale* carries the definition's risk as a hypothesis. The code departs from it in I-1.
- Row 2 → D-253, edited in place, within three binding sentences. *Scope* gains `browser-view`, *Based on* gains `html-exception-reporting`, *Rejected* gains the *Not chosen* of question 4, and *Origin* gains the task. The meaning is the row's.
- Row 3 → `html-exception-reporting`. I checked each quoted passage against `https://raw.githubusercontent.com/whatwg/html/5fcc2318395821db61e353705e6368ad9a000af5/source` (fetched to the scratchpad). "Let notHandled be true.", the firing of `error` with `cancelable` true, "If notHandled is true:", "Otherwise, the user agent may report exception to a developer console.", the firing of `unhandledrejection`, and "If notCanceled is true, then the user agent may report p.[[PromiseResult]] to a developer console." all stand there, with the markup stripped. The fact's sentence ("only after … was not cancelled") is a fair reading of the steps' structure. The "Otherwise" of the quote refers to a global that is not a dedicated worker, which does not change the reading for a page.
- Row 4 → `uncaught-failure-game-state`: one sentence, *Method* `test`, *Derives from* D-323, which names it in *Verification*. The test cites it at `tests/view/uncaught-failure.test.mjs:334`. This is the invariant test this change adds; it changes no existing invariant test. The code does not keep it for games built after the error (I-1).
- Row 5 → D-262. The added sentence is the row's sentence word for word, followed by "(D-323)". *Verification* gains a matching complies example, and *Origin* gains the task. The reference adds no meaning.
- The six questions: the answers to 1–6 are carried into the code and the entries as above. The answer to 4 (no `message`/`stack`) holds: `errorWords` reads only `name` and `code` through the word filter (`last-resort.ts:26`–`:32`).

## The decisions the author did not read whole

D-62, D-122, D-132, D-173, D-203, D-204, D-211, D-259, D-261, D-264, D-265 and D-286, read whole here. Results:
- D-62, D-122, D-132 and D-173: the buttons do nothing after the error. The task's accepted reading covers them (M-5).
- D-203: kept.
- D-204: untouched.
- D-211: "goes on from it" is not true after the error (M-5).
- D-259 and D-261: kept; the failure sentence stands in the form, not above the switch.
- D-264: the harness passes the product's new `uncaught ` line and still fails on any other `console.error` (`page-document.mjs:33`, test `page-document.test.mjs:538`).
- D-265: M-1.
- D-286: kept; the header line is not above the game.

## Declined to judge

- False alarms from React's default `onRecoverableError` and from a cross-origin "Script error." event, which show the sentence and stop the game: the definition accepted that risk ("may show with no fault"), and D-323's *Rationale* marks it a hypothesis.
- An error thrown while a result is drawn inside `store.apply`, after `state = result.state`: the state kept is a whole result of the simulation. I did not treat it as a violation of "the last whole game state from before the error".
- D-323's *Based on* `none`, although its last clause concerns React taking the card down: the binding sentence is conditional ("where React takes the card down"), and no row of the task carries a fact about React. The author named the missing fact; whether to add one is the human's choice.
- That item 7 was written by the templates rather than through the skill `the-way-maintain-coding-guidelines`: a process question; the result matches `product-guidelines/template.md` and `coding/template.md`.
- The kitchen-sink page is not updated: the change adds no shared control, state or role.

## Checks run

- `python -B .the-way/elements/common/foundation_check.py` → exit 0, "0 errors".
- `npm run typecheck` → exit 0.
- `npm test -- tests/view/uncaught-failure.test.mjs` → exit 0, 12 of 12 pass.
- `npm test -- tests/view/account-screen.test.mjs` → exit 0, 126 of 126 pass.
- `npm test -- tests/view/page-document.test.mjs` → exit 0, 56 of 56 pass.
- `python -B -m unittest tests/agent_workflow/test_loop2_play_skill.py` → exit 0, 8 tests.
- `node node_modules/eslint/bin/eslint.js --max-warnings 0 --suppressions-location <empty {} in the scratchpad>` on the seven changed TS/JS files → exit 0.
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` on the changed TS/JS/CSS files → exit 0.
- `diff .claude/skills/loop2-play/SKILL.md .agents/skills/loop2-play/SKILL.md` → no difference.
- Mutants, run in a detached scratch worktree of the head (`git worktree add --detach`, `node_modules` joined by a junction, removed afterwards; the reviewed worktree is untouched and clean):
  - `halted ||` removed from `store.apply` → `npm test -- tests/view/uncaught-failure.test.mjs` exit 1; the invariant test, the "act of the player" test and the "game built after it" test fail.
  - `event.preventDefault()` removed from the `error` listener → exit 1; the "cancelled" test and the React-root test fail.
- Scratch test for I-1: `node --test catchup-after-error.test.mjs` in the scratchpad → exit 0, output `{"savesAfterError":1,"sentDiffersFromLoaded":true}`.
- Verification of the fact's quotes: `curl` of the pinned WHATWG source → exit 0, and the passages were found as listed above.
- Appearance (WAY-219, WAY-220): checked in code only. The header line uses `.form-warning` (`warning`) with the sizing of the save line, the card sentence uses `ReactFormWarning` in the form under the submit button, and the panel of a card taken down shares the card's panel rule (`panel` background with `text`, `divider` border) over the backdrop. The author's report describes screenshots inspected in a real browser, but none was kept. I ran no real browser, so the rendered appearance is unverified by me. I found no appearance defect with an effect on the user beyond M-7.
- Not run: the full `npm test` (the orchestrator's gate); `tests/quality/test_quality_invariants.py` (eslint and prettier ran on the touched files instead); `npm test -- tests/view/menu-bar.test.mjs` and the other view files the author ran.

## Reach beyond the handoff

- `.the-way/elements/decisions/template.md` and `.the-way/elements/invariants/template.md` (lines 1–120), to judge the entries' form, *Relations*, *Based on* and the invariant test.
- `.the-way/product-guidelines/coding/template.md:200`–`:249`, for the status of a row in *Files of this kind* (M-2).
- `.the-way/foundations/decisions.md` WAY-219 and WAY-220 (their binding sentences), for the appearance criteria.
- The decisions D-36, D-44, D-209, D-210, D-247, D-283 and D-284, and the invariants `expired-session-unsaved-progress`, `catch-up-minutes`, `catch-up-state`, `saved-state-http-exchange` and `account-client-outcomes`, each read whole, because the change's reach (catch-up at build, saving, the card's controls) touches them.
- `src/browser/view/clock.ts`, `src/browser/view/game-saver.ts`, `src/browser/view/controls/text-field.ts:106`–`:118` and `react-text-field.tsx:101`–`:107`, and `tests/view/account-screen.test.mjs:2056`–`:2089` (the `loopingAla` state and the catch-up save test), as callers and contracts of the change.
- The WHATWG HTML source at the commit the fact cites, to check the fact's quotes.

## Searches not found or unclear

- My own selection of the foundation: 134 decisions name `browser-view` in *Scope*. I read whole those of *Decisions in play*, the twelve the author did not read whole, and those listed under *Reach*. I did not read the other browser-view decisions whole (the program editor, the scene, combat, trips and the like), judging by their questions that the change does not reach them. That part of the selection is unverified.
- No test of the change covers a game built after the error from a save whose catch-up changes the state (I-1).
- No screenshot is kept from the author's real-browser check. WAY-219 asks the report to record "the screenshot evidence where obtained", and the report holds only a description. It is unclear whether a description counts.
- No environment fact for React's behaviour that an uncaught render error takes the root down and reaches `onUncaughtError` or `reportError`, as the author noted.
- Unclear whether a cycle's author may add a row to *Files of this kind* outside an audit (M-2, WAY-200).
- Unclear whether the invariant's "the game state held in the page" covers a game built after the error. I read it as covering it, because To do 3 says the store rejects every later result "aż gracz odświeży stronę" and the change's own test builds such a game and claims it takes no change.
