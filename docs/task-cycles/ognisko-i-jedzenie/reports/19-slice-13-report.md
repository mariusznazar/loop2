# Report — executor of Slice 13, cycle `ognisko-i-jedzenie`

- **Status:** done
- **Branch / base:** `task/ognisko-i-jedzenie`, slice base `8c7db070d3d7aff132e3f3e45d3e017eaccc38d6`
- **Commit:** `c8260e6f3cda1a22a7fc83adfdfba85df99f8b3b` — test: add the acceptance test and the
  invariant test minute-span-split, and bring the invariant tests to the closed list as it stands

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| `tests/sim/acceptance.test.mjs` (new) | 140 | 0 |
| `tests/invariants/test_minute_span_split.py` (new) | 394 | 0 |
| `foundations/part_map.md` (F24) | 1 | 0 |
| `tests/invariants/test_map_run_repeatability.py` | 35 | 5 |
| `tests/invariants/test_simulation_inputs.py` | 115 | 20 |
| `tests/invariants/test_simulation_randomness.py` | 75 | 11 |
| `tests/invariants/test_walk_feasibility.py` | 13 | 4 |

No product code changed.

## (a) The acceptance test — the program and the seed

- **Seed:** the send with real time `1760000800000` (`ALIVE_REAL_MS`), which takes the seed
  `1946377216` (`ALIVE_SEED`); both named in the test, the test asserts the seed.
- **Program** (`ACCEPTANCE_PROGRAM`, 17 rules, every condition kind and every action kind of the
  closed list as this task leaves it, „Zawsze”, „Eksploruj”, „Wędruj”, „Idź — <zasób>” and „Tu leży
  mniej niż” included):
  1. Sytość poniżej 35 % → Zjedz — jagoda
  2. Temperatura poniżej 36 °C → Zapal — ognisko
  3. Temperatura poniżej 36,5 °C → Zasil — ognisko
  4. Temperatura poniżej 35,2 °C → Idź — ognisko
  5. Zostało mniej niż 1 min — ognisko → Wytwórz — ognisko
  6. Zapas poniżej 1 szt. jagoda → Zbierz — jagoda
  7. Zapas poniżej 1 szt. jagoda → Idź — jagoda
  8. Tu leży mniej niż 1 szt. jagoda → Eksploruj
  9. Zapas poniżej 1 szt. jagoda → Wędruj
  10. Zapas poniżej 8 szt. patyk → Zbierz — patyk
  11. Zapas poniżej 8 szt. patyk → Idź — patyk
  12. Temperatura poniżej 36 °C → Zapal — patyk
  13. Zawsze → Eksploruj
  14. Z dala od — ognisko → Idź — ognisko
  15. Zawsze → Zbierz — patyk
  16. Zawsze → Zbierz — jagoda
  17. Zawsze → Wędruj
- On that seed the mage is alive at minute 480 with health 63.6; it gathered, ate 9 berries, built
  one campfire, lit it 3 times and fed it twice. The same program lives 480 minutes on 27 of the 40
  real times `1760000000000 + i × 100000`, i = 0..39, that I tried.
- The empty program dies in minute 243 of cold on the same seed; the test asserts it and the
  comment works it out by hand (chilled from 84, starving from 117, 88.45 at 116, 0.25 at 242).

## (b) Invariant `minute-span-split` and F24

`tests/invariants/test_minute_span_split.py` drives the built `game.js` like
`test_map_run_repeatability.py`. Scenarios: ALIVE (the acceptance program, 480 minutes),
DIES_IDLE (the empty program, 300 minutes, dies in 243), DIES_BUSY (the acceptance program sent at
`1760000000000`, 400 minutes; it gathers, eats, builds a campfire and dies of cold in 347). Each
split — one call; calls of 2, of 1 then 2, of 3, 7 and 60 minutes; growing calls 1, 2, 3, 5, 8, …;
`passRealTime` in uneven whole seconds; `passRealTime` in 1500 ms pieces — is compared with one
minute a call after every call: the whole state at the minute reached and the events, in order, of
the minutes since the previous call. Further tests: a dead character stays dead and gives no events
in every split; controls (the comparison flags a changed state, an event left out, swapped, added,
a changed carry; the splits end a call at every minute of each span; the scenarios are what they
claim). Each test cites `invariant: minute-span-split`.

F24 written through the pinned skill `the-way-update-part-map`: the part `simulation` gains
`tests/invariants/test_minute_span_split.py` in *Files*; its sentence, *Depends on* and *Trust
boundary* unchanged. Meaning: the new invariant test belongs to the simulation it tests. The search
of the foundation found only the invariant `minute-span-split` (*Part:* simulation), consistent;
nothing follows from the entry.

## (c), (d)

- `test_map_run_repeatability.py`: P1 is the acceptance program (every condition and action kind);
  P2 now eats, gathers sticks, goes to sticks, wanders and explores. The scenario stays at 236 game
  minutes (docstring now says "fewer than 240"); the run gathers 3 times, explores 4, walks 11.
- `test_simulation_inputs.py`: the scenario program is the acceptance program, sent at
  `1760000800000` for 240 minutes, so the states hold a crafted and a lit campfire; conditions of
  every kind and actions of every kind; streams `layout`, `wander`, `gather`; copies of runs with a
  stick burning on the character's tile (1 and 3 minutes left), a body one minute from death and a
  dead character; the table gains `body.js`, `character.js`, `world.js` and the program helpers
  `conditionNumber`, `onStep`, `itemFor`, `campfireTarget`, called with chosen inputs.
- `test_simulation_randomness.py`: MIXED is the acceptance program (every action); the driver also
  records the backpack and `gatherRandom`; a new control: with MIXED the gathering generator's
  state moves on, the same real time gives the same gatherings, another real time other ones.
- `test_walk_feasibility.py` (d): the ZERO cases take a free minute that is no whole multiple of the
  resource's renewal time on Las (`RENEW_MINUTES` literal: stick 30, berry 40, moss 60, fiber 60);
  docstring says why.

## Checks (command — exit code)

Run from `C:\Storage\repos\loop2-wt\ognisko-i-jedzenie`.

| Check | Exit |
|---|---|
| `npm run build` | 0 |
| `node --test tests/sim/acceptance.test.mjs` (4 tests pass) | 0 |
| `python -B -m unittest discover -s tests/invariants -p test_minute_span_split.py` — break 1 (in `game.ts` `advanceMinutes`, `events.push(...stepped.events)` replaced by `events.splice(0, events.length, ...stepped.events)`: a span keeps only its last minute's events): 28 failures | 1 |
| same — break 2 (`if (run.death) break;` removed from `advanceMinutes` and `if (run.death) return …` from `stepMinute`: a span does not stop at death): 13 failures, all DIES_* splits | 1 |
| same — after both breaks restored with `git checkout --` (5 tests) | 0 |
| `python -B -m unittest discover -s tests/invariants -p test_map_run_repeatability.py` | 0 |
| `python -B -m unittest discover -s tests/invariants -p test_simulation_inputs.py` | 0 |
| `python -B -m unittest discover -s tests/invariants -p test_simulation_randomness.py` (5 tests) | 0 |
| `python -B -m unittest discover -s tests/invariants -p test_walk_feasibility.py` — at the base, before the change: `zero here did not come about at minute 120` (berry) | 1 |
| same — after the change | 0 |
| `python -B .the-way/elements/common/foundation_check.py` (0 errors) | 0 |
| `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier` (2 tests) | 0 |
| `node --test "tests/sim/*.test.mjs"` (200 pass, 0 fail) — tests of the code the slice reads | 0 |

Not run: the Ruff check of the changed Python files — Ruff is not installed on this machine. The
full `npm test` is the cycle's run, not mine.

## Own-work check

- Requirement most likely unmet: "at every game minute" — a split that ends calls only at some
  minutes leaves the others unchecked. Check: `test_control_the_splits_end_a_call_at_every_minute`
  asserts that the splits other than one minute a call together end a call at every minute 1..last
  of each scenario. It passes.
- Second: that the extended `simulation-inputs` driver actually reaches the new modules. Check: a
  temporary mutation in `world.ts` `worldMinute` (assigning `world.burningItems` when a burning
  item ends). With burning sticks of 2 minutes left the test still passed (exit 0) — the mutation
  went unseen; I changed the copies to sticks of 1 and 3 minutes left, after which the mutation
  failed the test (exit 1), and the restored code passes (exit 0).

## Reaches beyond the dispatch

- `src/browser/sim/types.ts`, `body.ts`, `world.ts`, `character.ts`, `data/maps.ts`,
  `data/items.ts`, `data/campfire.ts`, `data/balance.ts` — read to write the programs and the inputs
  of the tests (shape of the run's state, renewal times, item uses).
- `.the-way/elements/part-map/template.md`, `examples.md`, `elements/common/rules.md`,
  `way_of_working.md` and the-way's own entry `decisions` — read as the skill `update-part-map`
  requires.

## Choices made, the way rejected, cost if wrong

- One acceptance program, reused as the "every kind" program of the three invariant tests (written
  out in each, with a comment naming the acceptance test). Rejected: separate made-up programs per
  test. Cost if wrong: the programs drift apart when one is edited; each is still checked by its own
  test.
- The 1500 ms split compares the state less `realMsCarry` (carry of real time not yet a game minute
  belongs to the split); every other split compares the whole state. Rejected: no fractional split
  (leaves the browser's real use uncovered). Cost if wrong: a bug living only in the carry would not
  show there; the whole-second split still compares it.
- `RENEW_MINUTES` written as a literal of Las's data in `test_walk_feasibility.py`. Rejected:
  reading `maps.js` in the driver. Cost if wrong: a change of the renewal times makes the ZERO case
  fail loudly, never pass silently.
- `test_simulation_inputs.py`: `T` is now `1760000800000` and `MINUTES` 240 (was 170) so the states
  hold a campfire. The plan named only the program and the streams; the new table entries and run
  copies are additions within "still proving their sentence".
- The randomness test gains a gathering control; the plan named only the program.

## Observations

- On the named seed the mage never leaves its tile after minute 25 (the tile holds sticks and
  berries); the acceptance holds on that layout's luck — as Q12 noted, one seed says little.
- The program's feeding happens right after each lighting (the rule "Temperatura poniżej 36,5 °C →
  Zasil — ognisko" holds while the character is still cold); it is how this program feeds, not a
  defect.
- Known failing on the base, not met here: `test_loop2_one_serving_process.py`, Ruff and ShellCheck
  tests (not run by me).
