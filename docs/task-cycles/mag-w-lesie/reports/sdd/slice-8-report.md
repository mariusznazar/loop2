# Slice 8 report — page shell, sending and run controls

Status: DONE · commit `986eda3` on `task/mag-w-lesie` (author <the owner's private address>)

## Implemented

- `src/browser/index.html` — keeps `<script type="module" src="/main.js"></script>` unchanged; adds the inline `<style>` (spec C6): two-column grid (stacks below 720 px), panels, status row, footer, `[hidden] { display: none !important; }`.
- `src/browser/main.ts` — only `startApp(document.body)`; the only module that starts the page.
- `src/browser/view/app.ts` — `startApp(root)`: builds header „Loop”, `<main class="columns">` with the left `section.program-panel` (empty place for Slice 9's editor) and the right `section.map-column` (send panel; run panel = status row + empty `div.terrain-panel`, the place for Slice 10), and the footer. Holds the one `GameState` (`let state = newGame()`); a `GameStore { get, apply(result) }` replaces it only with `result.state` from a simulation call and re-renders the map column only when the reference changed. Buttons call `send` (through the clock), `setPaused(state, !state.paused)`, `restart`, `end`; each first flushes the clock (see below) and checks the screen state (`send` only without a run, `restart`/`end` only with one — spec § 8).
- `src/browser/view/clock.ts` — `startClock(store)`: `setInterval` every 200 ms reads `performance.now()` and passes the elapsed ms since its previous reading to `passRealTime`; `send(ids)` passes `Date.now()` to `send`; `flush()` passes the time elapsed up to now. Hidden-tab time counts (measured, not counted in ticks — Q7).
- `src/browser/view/send-panel.ts` — `sendTargets()` (pure: every archetype × every map in data order; today one) and `createSendPanel(onSend)`: archetype name from `ARCHETYPES`, `Mapa: ${MAPS[id].name}`, button „Wyślij”. No id or name written in code.
- `src/browser/view/status-row.ts` — pure `statusText(run, paused)` → „Minuta {minute} · {activity}”, activity = `ACTIONS[kind].status`, for walkTo `${ACTIONS.walkTo.status}: ${RESOURCES[id].name}`, or „Czeka — żadna reguła nie pasuje”; „ (pauza)” appended while paused. `createStatusRow(controls)` builds the text and buttons „Pauza”/„Wznów”, „Restart”, „Zakończ” once and updates them in place (a button keeps focus across ticks).
- `src/browser/view/footer.ts` — pure `footerCredits()` (per resource in data order, its icon's credit from `credits.ts`) and `createFooter()`: „{resource name}: {author}, game-icons.net, CC BY 3.0” with „game-icons.net” linking the icon's source page and „CC BY 3.0” the licence.
- `tests/view/status-row.test.mjs` — 6 tests.

Design choice worth naming: before every player action the app flushes the clock, so real time up to the click is passed to the run before the action applies. Without it, up to 200 ms of time before a resume would count as running time, and up to 200 ms before a send would go to the new run. Cost: one extra `passRealTime` call per click.

## Tests and results

- `npm run typecheck`: clean.
- `npm test`: **130 pass, 0 fail** (was 124 before the slice; +6 from `tests/view/status-row.test.mjs`). `tests/http.test.mjs` still finds `/main.js` (its test passes). `tests/sim/rules.test.mjs` S2 scan over `src/browser/view/**` passes (no content id or name in view code).
- Invariant gate `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`: **44 tests OK** (run after the final change; no port-3000 failure occurred).
- Part map guard `format_guard.py foundations/part_map.md --base 1701186…`: 0 errors, 0 warnings, 1 unchecked (dependency graph — no command reports it). No foundation file changed.

## TDD evidence

- RED 1: test written first; `node --test tests/view/status-row.test.mjs` → `ERR_MODULE_NOT_FOUND` for `dist/public/view/status-row.js`.
- RED 2: stub `statusText` returning `''` → 6/6 fail on assertions (e.g. `actual: ''`, `expected: 'Minuta 0 · Eksploruje'`; `expected: 'Minuta 0 · Idzie po: patyk'`; `expected: 'Minuta 0 · Czeka — żadna reguła nie pasuje'`).
- GREEN: real implementation → 6/6 pass; full suite 130/130.
- Refactor (status row no longer keeps its own `paused` copy; the app decides pause/resume from the one state): suite still 130/130, fake-DOM wiring output identical.
- Mutation check: wrong separator, missing „: ” before the resource name, wrong status source, missing or always-present suffix, wrong minute — each fails at least one test.

## HTTP checks (running product)

Port 3000 was free. `npm run dev` in the background, then:
- `/` 200 `text/html`, holds the `<script type="module" src="/main.js">` tag; `/main.js` 200 `text/javascript` (imports `startApp`); `/view/app.js`, `/view/clock.js`, `/view/status-row.js`, `/view/send-panel.js`, `/view/footer.js`, `/view/credits.js`, `/sim/game.js` 200 `text/javascript`; `/icons/wood-stick.svg`, `/icons/berry-bush.svg`, `/icons/fern.svg`, `/icons/flax.svg` 200 `image/svg+xml`, start with `<svg xmlns=…`.
- Crawl of the module graph from `/main.js` over HTTP: 19 modules, all 200.
- Server stopped afterwards (port 3000 free again).

Extra checks without a browser (scratch scripts, not committed):
- Node run of the pure parts and the app's call sequence: footer lines „patyk / jagoda / mech / włókno: Delapouite, game-icons.net, CC BY 3.0” with source and licence URLs; one send target; send → „Minuta 0”, 3 s of 200 ms ticks → „Minuta 3”, paused 2 s → „Minuta 3 … (pauza)”, resumed 1 s → „Minuta 4”, restart → „Minuta 0”, end → no run.
- `startApp` run in Node against a minimal stand-in `document` with controlled `performance.now`/`setInterval`: page = header, main.columns, footer; h1 „Loop”; one 200 ms timer; send panel text „Mag żywiołów / Mapa: Las / Wyślij”, run panel hidden; footer four credits, 8 links; „Wyślij” hides the send panel and shows „Minuta 0 · Czeka — żadna reguła nie pasuje” (empty program — the editor is Slice 9); +3 s → Minuta 3; „Pauza” + 2 s → Minuta 3 „(pauza)”, button reads „Wznów”; „Wznów” + 1 s → Minuta 4; „Restart” → Minuta 0, +2 s → Minuta 2; „Zakończ” → send panel back; sending again → Minuta 0.

## Unchecked in-browser checks (no browser automation in this cycle)

All brief checks at http://127.0.0.1:3000 in a real browser remain unchecked: that the page renders the header, two columns and footer as styled; that „Wyślij” starts a run and the minute grows by one per real second; „Pauza”/„Wznów”; „Restart” to minute 0; „Zakończ” back to the send panel; the footer's four credits with working links; and that the console holds no error. The fake-DOM run above covers the wiring logic, not real DOM behaviour, layout or the console.

## Files changed

- `C:\Storage\repos\loop2-mag-w-lesie\src\browser\index.html`
- `C:\Storage\repos\loop2-mag-w-lesie\src\browser\main.ts`
- `C:\Storage\repos\loop2-mag-w-lesie\src\browser\view\app.ts`
- `C:\Storage\repos\loop2-mag-w-lesie\src\browser\view\clock.ts`
- `C:\Storage\repos\loop2-mag-w-lesie\src\browser\view\send-panel.ts`
- `C:\Storage\repos\loop2-mag-w-lesie\src\browser\view\status-row.ts`
- `C:\Storage\repos\loop2-mag-w-lesie\src\browser\view\footer.ts`
- `C:\Storage\repos\loop2-mag-w-lesie\tests\view\status-row.test.mjs`

## Self-review

- D-04/3: one `GameState` in `app.ts`; every change goes through `store.apply(<simulation result>)`; draws only from it. The status row no longer keeps any copy of game state (fixed during self-review).
- D-03/2 and `browser-view-framework/1`: DOM APIs only, no framework; the invariant passes.
- D-08/1 and S2: every map, archetype and resource name comes from data; the S2 scan passes.
- D-11/1: 1 game minute per real second through `passRealTime`, with pause and resume controls.
- Q5: pause lives in the game state through `setPaused`; a restarted or new run starts running (the simulation sets it).
- Q7: hidden-tab time counts (elapsed `performance.now()` difference), no cap.
- View modules touch the DOM only inside functions; importing `status-row.js`, `footer.js`, `send-panel.js` in Node works (shown by the test and the scratch runs).
- Spec § 8: the view calls `send` only without a run and `restart`/`end` only with one.

## Concerns

- `README.md` still says „Strona ma być pusta” (spec § 7 requires an update). It is not in this slice's *Change*, so I left it; a later slice or the orchestrator has to carry it.
- The program panel is an empty bordered box until Slice 9. A run sent now has no rules, so its status shows „Czeka — żadna reguła nie pasuje” — correct for an empty program.
- The send panel shows one entry per archetype × map from the data (today exactly one). With several maps, Slice 9's „map shown in the send panel” would need a choice; `sendTargets()[0]` serves today's data.
