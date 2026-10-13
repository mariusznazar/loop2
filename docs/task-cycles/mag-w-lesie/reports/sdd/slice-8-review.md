### Spec Compliance

- ✅ Spec compliant. Each item in the brief's *Change* list has its hunk. Checked against the brief, task items 2/3/7/8, spec § 3, § 5, § 8, Q5, Q7, D-03/2, D-04/3, D-08/1 and S2:
  - Page: header „Loop” (`src/browser/view/app.ts:119-122`). Two columns: program panel on the left, map column on the right (`app.ts:124-137`). Footer (`app.ts:175`). Styles sit inline in `index.html` (C6).
  - One `GameState` lives in `app.ts:117`. It is replaced only in `store.apply(result)`, from a `GameResult` (`app.ts:139-146`). Every caller passes the return value of a simulation function (`app.ts:155`, `159`, `163`; `clock.ts:213`, `220`). The view draws only from that state (`app.ts:169-173`).
  - Clock: `setInterval` every 200 ms reads `performance.now()` and passes the elapsed ms to `passRealTime` (`clock.ts:208-215`). `send` gets `Date.now()` (`clock.ts:220`).
  - Send panel: the archetype name and `Mapa: ${MAPS[id].name}` come from data, with the button „Wyślij” (`send-panel.ts:322-327`). The data holds `elementalMage: { name: 'Mag żywiołów' }`, so there is one ready character and no creation screen (task item 2).
  - Status row: `statusText` builds „Minuta {minute} · {activity}” (`status-row.ts:356-358`). The activity text comes from `ACTIONS[kind].status`. walkTo gives „Idzie po: {RESOURCES[id].name}”. The wait gives „Czeka — żadna reguła nie pasuje”. „ (pauza)” is appended while paused. The buttons „Pauza”/„Wznów”, „Restart”, „Zakończ” are at `status-row.ts:383-391` and `403-404`. The row stands above the terrain panel (`app.ts:166`, task item 7).
  - Run controls follow § 8: `send` is called only without a run (`app.ts:150`), `restart`/`end` only with one (`app.ts:159`, `163`). Restart, end and a new seed per send come from the simulation (`game.ts:115-129`), which covers task item 3.
  - Footer: „{resource name}: {author}, game-icons.net, CC BY 3.0”, with links to the icon's page and to the licence (`footer.ts:277-286`). Author, URL and licence come from `credits.ts`.
  - S2: view code holds no map, resource or archetype id or name. `sendTargets` and `footerCredits` iterate the data keys (`send-panel.ts:304-308`, `footer.ts:246-259`).
- ⚠️ Cannot verify from the diff:
  - Everything in a real browser: layout, the console holding no error, link targets. The cycle allows no browser automation. The controller should list these as unchecked in the request.
  - Spec § 7 asks for a `README.md` update. It is outside this slice's *Change*, as the report says. The controller must assign it to a later slice.
  - The test, typecheck and invariant results the report claims (130 pass, 44 invariant tests OK). I did not re-run them.

### Strengths

- Time handling is correct across pause and resume.
  - Risk I named: time spent paused, or time before a send, gets counted into the run.
  - What I checked: `passRealTime`, `setPaused`, `send`, `restart` and `end` in `src/browser/sim/game.ts:108-151`.
  - Why it holds: every tick advances `previous` even while paused (`clock.ts:209-213`), and `passRealTime` throws that time away. The flush before every player action (`app.ts:154`, `158`, `162`; `clock.ts:219`) credits real time up to the click to the right state. Paused time is never billed at resume, and pre-send time never leaks into the new run. `realMsCarry` survives a pause, and `restart`/`end`/`send` reset it.
- Hidden-tab time counts (Q7), because elapsed time is measured with `performance.now()` differences, not counted in ticks (`clock.ts:210-211`).
- No timer leaks and no duplicated listeners. One `setInterval` runs per `startApp`, and `main.ts` calls it once. The status-row and send-panel elements and their listeners are built once (`status-row.ts:393-395`, `send-panel.ts:328`). Updates happen in place and write only when a value changed (`status-row.ts:402-404`), so a focused „Pauza” keeps its focus across ticks.
- `[hidden] { display: none !important; }` (`index.html:30`) stops later `display` rules from overriding `hidden`.
- `statusText` is a pure, small function. The tests drive it through real simulation calls (`send`, `advanceMinutes`, `setPaused`). Only the walkTo case uses a built-by-hand activity (`status-row.test.mjs:433-436`), because minute 0 cannot reach walkTo. That test checks every resource from data, plus one literal (`'patyk'`) as an anchor.

### Issues

#### Critical (Must Fix)

None.

#### Important (Should Fix)

None.

#### Minor (Nice to Have)

1. `src/browser/view/footer.ts:261-267`: footer links open in the same tab.
   - What's wrong: the credit links have no `target="_blank"`, so clicking one leaves the page. Nothing is saved (spec § 13), so the player loses the run in progress and the program. `rel="noopener noreferrer"` only has an effect together with `target="_blank"`, which suggests the new tab was intended.
   - Fix: add `anchor.target = '_blank'`.
2. `src/browser/view/app.ts:141-145` with `src/browser/sim/game.ts:149`: the map column is redrawn five times a second.
   - What's wrong: while a run is going, every 200 ms tick returns a new state object, because `realMsCarry` changes. So `renderMapColumn` runs 5 times a second, while the visible minute changes once a second.
   - Why it matters: it costs nothing today, since `status-row.ts:402-404` writes only when a value changed. It will matter in Slice 10: the terrain panel and tile list must be cheap to redraw at that rate, or skip the redraw when `state.run` is unchanged, and hover (the only state the view keeps itself) must survive the redraw.
   - Fix: when dispatching Slice 10, tell it about this. Comparing `result.state.run` with the previous `state.run` is enough.
3. `src/browser/view/app.ts:170-171`: keyboard focus is lost when a panel hides.
   - What's wrong: „Wyślij” hides the send panel and „Zakończ” hides the run panel. In both cases the focused button disappears and focus falls back to `body`. A keyboard player has to tab from the top of the page.
   - Why only Minor: the spec does not require focus handling here.
   - Fix: focus „Pauza” after a send and „Wyślij” after an end.
4. Two pure functions have no committed test: `src/browser/view/footer.ts:246-259` (`footerCredits`) and `src/browser/view/send-panel.ts:304-308` (`sendTargets`). Only the report's throwaway scripts ran them.
   - Why it matters: `footerCredits` throws on a resource icon with no credit (`footer.ts:250`). It runs at `app.ts:175`, after the clock has started at `app.ts:147`. A missing credit would therefore show an empty page with a running timer, and no test would catch it before the browser.
   - Fix: add a short test that each resource yields one credit line with author, source URL and the licence from `credits.ts`.

### Assessment

**Task quality:** Approved

**Reasoning:** The slice matches the brief and spec § 3/§ 5/§ 8. The one game state changes only through simulation results, and the clock's elapsed-time handling around pause, resume, send, restart and end is correct. The remaining items are small: footer links leave the page and lose the run, a redraw-rate note for Slice 10, keyboard focus after a panel hides, and no committed test for two small pure helpers.
