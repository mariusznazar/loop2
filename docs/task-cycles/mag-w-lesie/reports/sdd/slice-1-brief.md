### Slice 1 — content data and state types

- **Goal:** the map Las, its four resources, the three actions, the two conditions, the archetype
  „Mag żywiołów” and the pace stand in `src/browser/sim/data/` with the numbers of task item 1 and
  spec § 4.2, the id types are derived from the data, the state types of spec § 4.1 exist, and
  `npm test` runs `tests/sim/*.test.mjs`.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/data/maps.ts` ·
  `src/browser/sim/data/resources.ts` · `src/browser/sim/data/actions.ts` ·
  `src/browser/sim/data/conditions.ts` · `src/browser/sim/data/archetypes.ts` ·
  `src/browser/sim/data/balance.ts` · `tests/sim/data.test.mjs` · `package.json`
- **Read:** `.runs/task-cycles/mag-w-lesie/task.md` · `.runs/task-cycles/mag-w-lesie/spec.md` ·
  `foundations/decisions.md` · `foundations/glossary.md` · `tsconfig.browser.json` ·
  `tests/http.test.mjs`
- **Reads outside the repository:** loop's `src/sim/data/maps.ts` (map `forest`), `activities.ts`,
  `conditions.ts`, `balance.ts`, `items.ts` under `C:\Storage\repos\loop`, to confirm the numbers
  spec § 4.2 transcribes; nothing else of loop's `src`.
- **Checks:** the failing test first: `tests/sim/data.test.mjs` (Las numbers equal task item 1;
  resource order stick, berry, moss, fiber; explore 20; `hereBelow` default 1, range 0–50, step 1;
  pace 1); then `npm run typecheck`; `npm test` (its count of tests includes the data tests);
  `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`
  (all pass except the two new checks, which may fail until Slice 5).
- **Depends on:** "Where does the game's content live?" · Row 4 · term `program rule`

