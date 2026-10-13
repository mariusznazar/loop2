### Slice 8 — page shell, sending and run controls

- **Goal:** the page shows the header „Loop”, two columns and the footer with the icon credits; the
  map column shows the send panel („Mag żywiołów”, „Mapa: Las”, „Wyślij”) while no map run exists,
  and during a run the status row „Minuta {minute} · {activity}” with „ (pauza)” while paused and
  the buttons „Pauza”/„Wznów”, „Restart”, „Zakończ”; `view/app.ts` holds the one game state and
  replaces it only with what a simulation function returns; `view/clock.ts` passes elapsed real
  time to `passRealTime` every 200 ms and `Date.now()` to `send`; the status text comes from a
  pure function the test checks.
- **Change:** `src/browser/main.ts` · `src/browser/index.html` · `src/browser/view/app.ts` ·
  `src/browser/view/clock.ts` · `src/browser/view/send-panel.ts` ·
  `src/browser/view/status-row.ts` · `src/browser/view/footer.ts` ·
  `tests/view/status-row.test.mjs`
- **Read:** `.runs/task-cycles/mag-w-lesie/spec.md` · `.runs/task-cycles/mag-w-lesie/task.md` ·
  `foundations/decisions.md` · `tests/invariants/test_browser_view_framework.py` ·
  `tests/http.test.mjs`
- **Also reads (made by earlier slices, not measured):** `src/browser/sim/game.ts`,
  `src/browser/sim/types.ts`, `src/browser/sim/data/*.ts`, `src/browser/view/credits.ts`
- **Checks:** the failing test first: `tests/view/status-row.test.mjs` (status text for each
  activity kind from `actions.ts` and `resources.ts`, the wait text „Czeka — żadna reguła nie
  pasuje”, the pause suffix); then `npm run typecheck`; `npm test` (count grew;
  `tests/http.test.mjs` still finds `/main.js`); the invariant tests as in Slice 5; in the running
  product, `npm run dev` and http://127.0.0.1:3000: „Wyślij” starts a run, the minute grows by
  one a second, „Pauza” stops it and „Wznów” resumes, „Restart” returns to minute 0, „Zakończ”
  returns to the send panel, the footer shows the four credits, the console holds no error.
- **Depends on:** Slice 5 · Slice 6 · foundation step 2 (part map) · D-04 new version ·
  D-03 new version · Row 2 · Row 4 ·
  term `game minute` · term `map run`

