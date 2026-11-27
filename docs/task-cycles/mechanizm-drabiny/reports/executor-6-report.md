done

# Report of the executor of slice 6

## Result in one line

The three rungs pass the check with the numbers of Slice 1; no number of `maps.ts` changed. Both conditions hold in the second table of the full run (each rung `Can be solved` yes, `Harder than the opener` yes), and the invariant `first-exploration-discovery` holds. Only the two skill copies changed.

## Commits and files

- `c27e6e53` docs: the balance instrument's skill states the time of the full progression run over every map on seeds 1-500, measured once (D-438, D-448)
  - `.claude/skills/loop2-balance/SKILL.md` (+3 -1) and `.agents/skills/loop2-balance/SKILL.md` (+3 -1); byte-identical (`cmp` exit 0). Only the last sentence of the section "Timing" changed: "The full run over every map on seeds 1-500 was not timed." became "The full run over every map on seeds 1-500, with all the reference programs, took about 4 minutes 27 seconds of wall-clock time, the build included, measured once with the `time` command, with nothing else running."
- `src/browser/sim/data/maps.ts`: unchanged (no rung failed, so no number or sentence needed a change).

## Measurements (each with its result)

Reference programs: the instrument lists 24 (the handoff says 23); all were measured.

1. Narrowed run, to see whether the Slice 1 numbers pass before touching them:
   `npm run --silent balance -- progression --maps forestDeep,forestDeep2,forestDeep3,forestDeep4 --seeds 1-100 --out .runs/executor-6/narrow1.md` (exit 0, 1 min 0.7 s; kept in `reports/executor-6-narrow-1.md`). Second table: Las — głębiej 91 %, yes, harder than Las; Las — głębiej II 87 %, yes, harder; III 75 %, yes, harder; IV 59 %, yes, harder.
2. The one full run: `time npm run --silent balance -- progression --out .runs/task-cycles/mechanizm-drabiny/reports/executor-6-progression-full.md` (every map, every program, seeds 1-500 by default, no earning loop), exit 0, `real 4m27.207s`, one instrument process alone on the machine (my own tests ran only after it). Result kept as the instrument wrote it in `reports/executor-6-progression-full.md` (207 lines). Second table:

| Map | Best share (seeds 1-500) | Can be solved | Opener | Opener's best share | Best share with the opener's character | Harder than the opener |
|---|---|---|---|---|---|---|
| Skraj lasu | 97.4 % | yes | — | — | — | — |
| Las | 99.4 % | yes | Skraj lasu | 97.4 % | 71.8 % | yes |
| Las — głębiej | 91.8 % | yes | Las | 99.4 % | 91.8 % | yes |
| Las — wataha | 46.4 % | yes | Las — głębiej | 91.8 % | 46.4 % | yes |
| Las — głębiej II | 88.4 % | yes | Las — głębiej | 91.8 % | 88.4 % | yes |
| Las — głębiej III | 78.8 % | yes | Las — głębiej II | 88.4 % | 78.8 % | yes |
| Las — głębiej IV | 65.4 % | yes | Las — głębiej III | 78.8 % | 65.4 % | yes |
| Las — matecznik | 0 % | no | Las — wataha | 46.4 % | 0 % | yes |

Las — matecznik reads "no" as D-438's exception allows (no program solves a seed of it); it is not a rung of this slice.

Rungs that failed the check: none, so no first numbers to name and nothing changed or tuned. Provisional numbers of Slice 1 stay: streak 600/660/720, beaten attacks 3/4/5, wolf cooldown 150/120/100, wolf chance 0.01/0.012/0.014. The hand-written sentences already agree with them and were not touched. Note for the request's description: the first table of the file uses the labels `P1`...`P24`, no program identifiers; the programs and key to the labels stayed in the instrument and I wrote none into the report.

## Checks (command, exit code)

- `npm run --silent balance -- progression --out ...executor-6-progression-full.md`: exit 0, second table above shows each rung solvable and harder.
- `npm test -- tests/sim/data.test.mjs`: exit 0, 58 pass, 0 fail.
- `npm test -- tests/sim/discovery.test.mjs`: exit 0, 50 pass, 0 fail; the case "a character of a new game whose program holds Zawsze → Eksploruj from the entrance makes the first discovery by game minute 20, on every map" passes (the invariant `first-exploration-discovery`, over every map of the data, the rungs included).
- `npm test -- tests/sim/map-card.test.mjs`: exit 0, 11 pass, 0 fail.
- `npm run typecheck`: exit 0.
- Not run, as the handoff says: the full `npm test` and the foundation check run by the one command (the advisor's signal). `python -B .the-way/elements/common/foundation_check.py` was not run by me either.
- Tests failing on the slice's base: none failed, so no measure on the base was needed.

## Own-work check

Requirement most likely unmet: the check is made on the data of the branch with seeds 1-500 and every program, so that a narrowed run on 100 seeds does not pass a rung that the full run fails (plan Choices). Check: the one full run on 500 seeds, `--maps` unnarrowed; it showed each rung solvable and harder than its opener by the measure with the opener's character (88.4, 78.8 and 65.4 against 91.8, 88.4 and 78.8). The margin of the weakest pair is 3.4 points (II against głębiej, 88.4 vs 91.8) on 500 seeds; the full run decides, as the plan says. A second requirement: the card and the data tests still agree with the numbers: `data.test.mjs` and `map-card.test.mjs` pass.

## Walkthrough

The slice changes no behaviour a user sees in the running product: it changed no code or data, only a sentence of two skill files for agents; the numbers of the rungs stay as Slice 1 left them.

## Foundation entries

No entry of the foundation becomes untrue through my change. The skill's sentence on timing is the only text I changed.

## Trust boundary / irreversible operations

None of either.

## Reaches beyond the dispatch

- Read passages of the foundation named by the handoff only; additionally read whole `D-24` (`foundations/decisions.md:5684`) and `D-136` (`:6001`), named by the handoff, and `guidelines/coding.md`, `guidelines/coding-content-data.md`. No other reach.

## Working copies

`.runs/executor-6/` of the worktree (narrowed output, tests' logs, timing file) stood at `.runs/executor-6/` and was removed. Kept in `reports/`: `executor-6-narrow-1.md` and `executor-6-progression-full.md`. No worktree or clone was made.

## Choices

- Did not tune any number, though a narrowed run was the only possible way to learn whether the check needs it: the rungs pass, and D-449 / *Out of scope* forbid tuning beyond the order and the solving. Way rejected: moving the rungs further apart for more margin; cost if wrong: none now, a later task 16 may use other numbers.
- Wrote the timing sentence with "about 4 minutes 27 seconds" and the note "with nothing else running", since the number varies with the machine; way rejected: a rounded "about 4.5 minutes" (less exact than the measured value).

## Unread material

none (all files of the Read list were read whole or by the ranges the handoff gave: `plan.md:123-139`, `task_frozen.md` lines 28, 32-33, 87-95, 169-174, D-438, D-448, D-449, D-142, D-327, D-428, D-429, D-464-D-466, D-24, D-136, the invariant, both guidelines, the skill and `maps.ts`). The tests' files themselves I ran but did not read.

## Searches not found or unclear

- The handoff says "all 23 reference programs"; the instrument lists 24 (`P1`..`P24`). No effect on the result.
- In the file of the full run the sentence under the first table runs on one line and lists "Skraj lasu: no manual run, the stock not gathered in full": expected (the first map has no map before it, as the skill says).
