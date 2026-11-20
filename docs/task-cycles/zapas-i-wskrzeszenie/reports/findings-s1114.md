# Findings of the grouped review of slices 11-14 (blocking finding, in the reviewer's words)

Review report: `reports/review-s1114-report.md`, first line `FAIL 25223337030f132619d0acda080146fc41d67e00`. The blocking finding comes from slice 13.

## Findings

### Important

**I-1 — slice 13. The two-deaths case of the clock runs on a team state that the game never holds and the load refuses, and asserts a clock moment that only that state gives.**

- Place: `tests/view/clock.test.mjs:610` (`const both = withUses(practised(practised(twoCharacters(), 1), 2), 2);`),
  with the helper `withUses(state, spent, nextReturnMs = null)` at `tests/view/clock.test.mjs:219-229`, and the
  assertion at `tests/view/clock.test.mjs:629-632`
  (`handed.team.resurrectionNextReturnAtMs === T0 + LOOP_MINUTE_MS + RENEWAL_MS`).
- What is wrong: the case sets two uses spent with no moment of the next return (`resurrectionNextReturnAtMs: null`).
  The load refuses exactly that shape (`src/browser/sim/saved-game.ts:510`:
  `if ((nextValue === null) !== (spent === 0)) refuse();`), and no function of the game makes it: a death
  that spends a use of a full stock starts the clock, and a death with the clock running leaves it as it runs
  (`src/browser/sim/game.ts:643-650`, `nextReturnMs ?? momentAfter(nowMs, renewalMs())`; D-190 as Slice 1
  wrote it). On this impossible state, Ola's earning-loop death, which takes the last use, falls into the
  `?? momentAfter(...)` branch and *starts* the clock at its own moment, and the case asserts that moment. In
  every state the game can hold with two uses spent, the clock already runs from an earlier death and the
  death that takes the last use does not move it. So the asserted value is a behaviour that D-190 gives in no
  reachable state, and the case's quotation of D-242 („and the clock of the returns runs from the moment of
  the death that started it”) is shown on a death that, in the game, never starts the clock.
- Why it matters: the slice's goal is that every case "reads the uses as Slice 6 made them"; this one reads a
  shape Slice 6 forbids. The assertion would not catch a regression of the rule it seems to show: with the
  impossible fixture, a bug that restarted the clock at every death gives the same value, so the case passes
  for a reason other than the rule. A reader of the case learns a false rule (the death that takes the last
  use starts the clock). The order of the two deaths, which the case exists for, is still shown by the
  generation assertions (`:633-647`), so the fix is small: give the fixture a moment that the game could hold,
  for example `withUses(..., 2, T0 + 2 * HOUR)` (any moment after the reading), and assert that the death
  leaves that moment as it was (D-190, D-240: a death with the clock running does not move it), or drop the
  moment assertion. The default `nextReturnMs = null` of `withUses` invites the same mistake for any `spent`
  above zero; a helper that requires the moment when `spent > 0` closes that.
- Evidence: in a scratch worktree of the head (`.runs/review-s1114/wt`), with only line 610 changed to
  `withUses(practised(practised(twoCharacters(), 1), 2), 2, T0 + 2 * 3_600_000)`,
  `npm test -- tests/view/clock.test.mjs` exits 1: 26 pass, 1 fail, this case, at the moment assertion,
  `actual: 1760007200000` (the moment the fixture set, left as it was), `expected: 1760014460000`. The
  generation assertions before it held.
- Contradiction: no — the product code follows D-190; the defect is a test fixture outside the states the
  game and its load admit, and an expected value that holds only there.

