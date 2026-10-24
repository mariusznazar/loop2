
## What earlier slices made (read as they stand now)

- Slice 3 (7a273ae) added the content data files `src/browser/sim/data/items.ts`,
  `src/browser/sim/data/campfire.ts`, `src/browser/sim/data/traits.ts` and numbers in
  `src/browser/sim/data/balance.ts`, `src/browser/sim/data/maps.ts`.
- Slice 4 (46ec64d) added `src/browser/sim/body.ts` and put the character's body on the map run as
  `MapRun.body` — not inside `MapRun.character`, since `tests/sim/actions.test.mjs:115` compares
  `character` across minutes; the program's view of the run (`RunView`) does not carry the body yet
  (Slice 9 adds what conditions read). When a span reaches death `passRealTime` drops the leftover
  part of a real second (`realMsCarry` = 0). `mapRunEnded` is still given at „Zakończ” and
  „Restart”, not at death.

Files your slice needs beyond its *Read* (made by earlier slices): `src/browser/sim/data/traits.ts`,
`src/browser/sim/data/items.ts`, `src/browser/sim/body.ts`, `src/browser/sim/run.ts` and
`src/browser/sim/types.ts` as they stand now.
