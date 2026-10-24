
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
- Slice 5 (dfe814a) added `src/browser/sim/character.ts` (a new character's traits from the data;
  the backpack's count and cap) and put the traits and the backpack in `MapRun.character`;
  `newMapRun` and `stepMinute` keep their arguments, a new one optional.
- Slice 6 (cc0669d) added `src/browser/sim/world.ts` (what burns, its warmth, renewal) and the map
  run's campfires and burning items in `types.ts`: a campfire is `{ at, minutesLeft }`, 0 meaning
  extinguished — a crafted, never-lit campfire also stands at 0; burning sticks are `burningItems`
  keyed by `item`, so no code names the stick.
- `guidelines/coding-simulation-module.md` and `guidelines/coding-content-data.md` list no row for
  the new files; by the pinned template a file added after the audit takes no row until the
  guidelines are refreshed — not a gap of your slice.
- Slice 7 (006616f) added the action kind `gather` (data `actions.ts`, `program.ts`, `run.ts`,
  `game.ts`), the gathering stream in `random.ts`, and the editor's offer of it in
  `program-editor.ts`. Its status text in the data is „Zbiera”; `status-row.ts` appends the target's
  name for „Idź” only, so the status row reads „Minuta N · Zbiera” until Slice 11, whose goal makes
  every action that takes a target show its name.
- Slice 8 (612404f) added the action kinds of the campfire, the burning stick, eating and „Idź —
  ognisko” (`actions.ts`, `program.ts`, `run.ts`, `game.ts`, `program-editor.ts`) and `eatenBody`
  in `body.ts` (eating's satiety, rounded and capped like the body minute).
- `tests/invariants/test_walk_feasibility.py` fails from Slice 6 on (renewal at minute 120 gives a
  zeroed tile its piece back); Slice 13 adapts it. Do not treat that failure as yours.
- Slice 9 (ab1558b) added the five new condition kinds with their numbers' ranges and steps
  (`conditions.ts`, `program.ts`, `game.ts`, `program-editor.ts`); labels „Zostało mniej niż N min
  — ognisko” and „Z dala od — ognisko”.
- Slice 10 (6981b7f) added `assets/icons/campfire.svg` (Lorc, "Campfire icon"), the campfire's
  `icon` and `iconTitle` in `src/browser/sim/data/campfire.ts`, its credit in `credits.ts` and its
  footer line in `footer.ts`; its review passed.

Files your slice needs beyond its *Read* (made by earlier slices): `src/browser/sim/character.ts`
(the backpack's count and cap), `src/browser/sim/body.ts`, `src/browser/sim/data/items.ts`,
`src/browser/sim/data/balance.ts` (thresholds), `src/browser/sim/data/actions.ts` (status texts), and
`src/browser/sim/types.ts`, `src/browser/sim/game.ts` (the death in the map run's state; `restart`,
`end`), as they stand now.

From Slice 7's report: the status row today reads „Minuta N · Zbiera” — `status-row.ts` appends the
target's name for „Idź” only. Your goal's sentence "followed by the target's name where the action
takes one" covers „Zbierz — <zasób>” and the other new kinds that take a target.
