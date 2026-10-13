### Slice 9 — the program editor

- **Goal:** the program panel, always visible, edits one ordered list of rules with conditions
  „Zawsze” and „Tu leży mniej niż N <zasób>” and actions „Eksploruj”, „Wędruj” and „Idź — <zasób>”
  chosen from lists read from data, with „↑”, „↓”, „Usuń” and „Dodaj regułę”; each edit commits a
  whole new program through `setProgram` on `change`, numbers rounded and clamped to the data's
  range and kept when invalid; focus stays on the edited control and returns after structural
  edits; the commit rules are pure functions the test checks.
- **Change:** `src/browser/view/program-editor.ts` · `src/browser/view/app.ts` ·
  `src/browser/index.html` · `tests/view/program-editor.test.mjs`
- **Read:** `.runs/task-cycles/mag-w-lesie/spec.md` · `.runs/task-cycles/mag-w-lesie/task.md` ·
  `foundations/decisions.md` · `foundations/glossary.md`
- **Also reads (made by earlier slices, not measured):** `src/browser/sim/game.ts`,
  `src/browser/sim/types.ts`, `src/browser/sim/data/*.ts`, `src/browser/view/app.ts`,
  `src/browser/index.html`
- **Checks:** the failing test first: `tests/view/program-editor.test.mjs` (the number field's
  commit rule — empty or not a number keeps the previous value, else rounded and clamped to the
  data's range; switching to a kind that names a resource takes the map's first resource and the
  data's default N; „Dodaj regułę” appends „Zawsze → Eksploruj”; every built program passes
  `setProgram`); then `npm run typecheck`; `npm test` (count grew); the invariant tests as in
  Slice 5; in the running product: a program written before „Wyślij” drives the run (the status
  row shows „Eksploruje”, then „Wędruje” or „Idzie po: …”), typing „12” in the number field keeps
  focus and commits 12, an edit during a 20-minute exploration changes the status only after it
  ends, the program stays after „Restart” and „Zakończ”.
- **Depends on:** Slice 8 · D-04 new version · term `program rule` · Row 3

