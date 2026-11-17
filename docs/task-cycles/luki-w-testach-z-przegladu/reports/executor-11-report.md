# Report — executor of slice 11: simulation: catch-up and randomness reach a wolf's attack

**Status:** done

## Commits (base `5824bb05fb69cd7ae58d267e43d668141a82130b`)

- `414aa098` — `tests/sim/catch-up.test.mjs` (+69): new case "a character whose map run meets a wolf's attack ends the catch-up as the open game does, …", marked `// invariant: catch-up-state`.
- `46902928` — `tests/invariants/test_simulation_randomness.py` (+32 −4): new case `test_run_with_a_wolf_attack_calls_no_other_source_of_random_numbers`, a driver step `solveMaps`, the record field `lastCombat`, the docstring's Covers updated.

`git status --short` is empty; `git diff 5824bb05 --stat -- src` shows nothing (the product's source is untouched).

## What was made

- **catch-up.test.mjs.** A loop of Ala alone on Las — głębiej (`forestDeep`, the wolf's map), her map run put at game minute 180 with the attack generator at state 35 (the state `tests/sim/encounters.test.mjs` names as drawing below the 0.01 chance), so the wolf attacks in minute 181 and its combat resolves in 186. The program explores and kicks. The case runs `assertRelation` (the open game minute by minute against `catchUp`: character, loop, chest, team, loops) over 3 minutes (combat under way at the end of the span), 20 minutes (combat resolved, wolf defeated) and, with the body's health at 30, 20 minutes through a death in the combat covered by the resurrection (the report line is also checked: `resurrectionUsed: true`). Preconditions (marked in comments) assert, in the open game, that the combat is under way after 3 minutes, that it began in 181 and resulted after 20, and that the health-30 map run died once with the generation staying 1. No expected value comes from today's run except the minute numbers of the encounter (181 and the run counts), which are preconditions of the case.
- **test_simulation_randomness.py.** A second run in the dynamic driver: new game, character, program (the mixed program with a `kick` rule at its end), `solveMaps ["forest"]` (a new driver step that sets the solved maps, since `KNOWING_GAME_JS` solves only `forestEdge` and `forestDeep` opens after `forest`), `send` to `forestDeep` at real time `1760000000026`, `advanceMinutes 250`. That seed was found by a search of seeds `T..T+39` (a throwaway script) as one whose first attack is at game minute 240, whose combat the character survives and whose wolf is defeated. The case asserts a clean run (every replacement proven to fire, no error, no call), and that the last record holds a `lastCombat` (an attack was met) whose `result` is not null (its combat ended).

## Checks (command → exit code)

- `npm.cmd run build` → 0 (before the experiments; `dist/` is ignored).
- Green, final files:
  - `npm.cmd test -- tests/sim/catch-up.test.mjs` → 0 (34 pass, 0 fail; log `.runs/executor-11/catchup-final.log`)
  - `npm.cmd test -- tests/invariants/test_simulation_randomness.py` → 0 (6 tests OK; log `.runs/executor-11/rand-final.log`)
  - `git status --short -- src` → 0, prints nothing
  - `python -B .the-way/elements/common/foundation_check.py` → 0 ("0 errors"; log `.runs/executor-11/fc.log`); it ran after the three `// decision:` citations (D-140, D-190, D-240) were added, each quotation copied from a sentence that begins in the decision or already cited verbatim in the same file (the D-190 one).
  - `npx.cmd prettier --check tests/sim/catch-up.test.mjs` → 0; `npx.cmd eslint tests/sim/catch-up.test.mjs` → 0; `.runs/quality-venv/Scripts/ruff.exe check tests/invariants/test_simulation_randomness.py` → 0.
- **Seen failing, the simulation broken for a moment, each restored with `git checkout -- <file>` (`git diff --stat -- src` empty after each):**
  1. `run.ts` attack draw → `Math.random()` (`sed`), `npm.cmd test -- tests/sim/catch-up.test.mjs` → 1: the new case fails on its precondition (`undefined !== 181`, the wolf never attacks). (`.runs/executor-11/catchup-red1b.log`.) A first run of this break failed with a `TypeError` on a null, not an assertion; the precondition was changed to read with `?.` so it fails by assertion, and this run is the one reported.
  2. `loop.ts` `advanceLoopRun`: `if (passed > 1) run = { ...run, attackRandom: run.attackRandom + 1 }` (catch-up passes many minutes in one call, the open game one at a time), `npm.cmd test -- tests/sim/catch-up.test.mjs` → 1: the new case fails on "the combat under way: loop" (the relation), and the existing case "a loop of a character with no practice dies on and on…" fails too, as it passes through a span with the attack generator. (`.runs/executor-11/catchup-red2.log`.)
  3. `run.ts` attack draw → `Math.random()`, `npm.cmd test -- tests/invariants/test_simulation_randomness.py` → 1: the new case fails ("driving the simulation raised … Math.random … at finishMinute") and the static scan case fails too (`run.ts names Math.random`). (`.runs/executor-11/rand-red-attack.log`.)
  4. `combat.ts` `resolveCombat`: a `Math.random();` line added, same command → 1: the new case fails ("… at resolveCombat"), and the static scan too. (`.runs/executor-11/rand-red-combat.log`.)
  5. `run.ts` attack draw through a computed name the static scan does not read, `(globalThis as unknown as { Math: { random(): number } })["Math"]["random"]()`, same command → 1: **only** the new case fails ("… Math.random … at finishMinute"); the other five pass, the static scan included. (`.runs/executor-11/rand-red-indirect.log`.) This shows what the new case adds: the existing runs never reach a wolf, so no draw of the attack or the combat was driven before.
- Restore check: after each break `git diff --stat -- src` printed nothing and the final `git status --short -- src` printed nothing; the files were returned by `git checkout -- <file>`, so they are the committed bytes.

## Own-work check (section 3)

The requirement most likely unmet: the check of `simulation-randomness` fails when a draw of the *attack or the combat* comes from another source (To do 10), not only a draw anywhere. Check: breaks 3 and 4 (a draw in the attack and one in the combat) and 5 (a source the static scan misses, shown caught only by the new case) above. For `catch-up-state`: that the relation holds through a span in which the wolf attacks and that a difference between the catch-up and the open game in that span fails: breaks 1 and 2.

## Choices

- **Attack made certain by the preparation of the state (catch-up), by a real seed (randomness).** Catch-up: the map run is set to minute 180 with a generator state known to draw below the chance, as `encounters.test.mjs` does; the alternative, a program that lives to a natural attack, would put a coincidence of seed into a relation test. Randomness: no state is edited, the attack comes from the seeded generator's own draws; the alternative of editing `attackRandom` in the driver would make the check stop looking at the draws of the generator it names. Cost if wrong: the seed `T_WOLF` gives a different attack if the balance data (chance, cooldown, body) changes; the case then fails on its precondition ("the map run met no attack of the wolf"), which names the cause.
- **Driver step `solveMaps` and the field `lastCombat` added in the test's own driver**, not in `KNOWING_GAME_JS` (`tests/invariants/program_fixture.py`), which other invariant tests embed and which is outside this slice's change list.
- **The health-30 death case is in the same test** as the other two spans; a separate test would repeat the preparation. Cost: one longer name.
- No control of "the attack draws follow the seed" was added (the sibling controls for wandering and gathering exist); the slice names only the clean run. A change of the attack draw to a constant would pass the new case, and the existing `attackRandom` tests in `tests/sim/encounters.test.mjs` hold it.

## Plan versus code

No mismatch beyond the ranges the handoff already gave (foundation entries moved a few lines).

## Reaches beyond the handoff

- `src/browser/sim/loop.ts`, `src/browser/sim/run.ts` (the attack branch of `finishMinute`, `stepMinute`), `src/browser/sim/combat.ts` (head of `resolveCombat`), `src/browser/sim/data/maps.ts` (`forestDeep`'s `attackers`) and `src/browser/sim/data/creatures.ts` (`wolf`): read to learn how a loop's map run meets an attack and to place the breaks. Searched `grep attackRandom|activeCombat|attackCooldownStart` in `src/browser/sim`. Why: the handoff names the tests and the foundation, not the source; the source was needed to build the preparation of the state and the breaks.
- `package.json` (grep of the `build` script), `.the-way/task-cycle/change/SKILL.md` and `slice.md` (method), `the author's global rule file scripts.md` and `git.md` (rules of the user's global instructions, before the scripts and the commits).
- `guidelines/testing.md` was read whole in four pages (the first read was cut at the size limit).

## Working copies

- `.runs/executor-11/` (ignored, under the worktree): the throwaway scripts `exp1.mjs` and `exp2.mjs` (the preparation of the state and the search of seeds) were removed. Remaining, with reason (evidence for the checks above): the logs `catchup-green1.log`, `catchup-green2.log`, `catchup-final.log`, `catchup-red1.log`, `catchup-red1b.log`, `catchup-red2.log`, `rand-green1.log`, `rand-final.log`, `rand-red-attack.log`, `rand-red-combat.log`, `rand-red-indirect.log`, `fc.log`, `build.log` is at `.runs/build.log`. No worktree or clone was made.

## Concerns and observations

- Break 2 also turns red an existing case of `catch-up.test.mjs` ("a loop of a character with no practice dies on and on…"), because the catch-up through a span with minute 180 or later draws from the attack generator on Las; it is none of this slice's cases and no change was made to it.
- The gate (`npm.cmd test` without a file) was not run, as the handoff gives it to the orchestrator.

**Unread material:** none (the guideline files, the entries named in the handoff, the two files changed and `tests/sim/encounters.test.mjs:1-120` were read; `tests/sim/encounters.test.mjs` beyond line 120 was not read, the handoff names lines 1-60).

**Searches not found or unclear:** none.
