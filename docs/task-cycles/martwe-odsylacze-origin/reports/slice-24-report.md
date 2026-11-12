# Slice 24 report — simulation invariant tests and simulation code point to no note

**Status:** done with concerns (one wrong decision number found and corrected, see Concerns)

**Slice base:** `18093f00699a42e5cd16c7faef20f54d2db731d1` (HEAD matched; worktree clean at start).
**Commit:** `838593b4` on `task/martwe-odsylacze-origin`.

## Files changed (8 files, +23 / -26)

Only comments and docstrings. No decision was written: every piece of information a pointer stood for is
held by an existing decision, or the comment says it itself. `foundations/decisions.md` is unchanged, so
`the-way-record-decision` was not used.

## Per changed line: old pointer -> outcome -> entry

| File:line (old) | Old pointer | Outcome | Entry |
|---|---|---|---|
| `src/browser/sim/trip.ts:37` | "(To do 5, item 4)" | removed (D-189 and D-214, already named in the next sentence, hold the rule) | D-189, D-214 |
| `src/browser/sim/data/balance.ts:40` | "(loop `balance.ts:125`)" (old Loop file) | entry named | D-219 (the browser's clock counts the renewal of a resurrection) |
| `tests/invariants/test_action_in_progress.py:19` | "this reading follows accepted task przewodnik_testow_loop2.md, Q7a" | removed (the sentence before it already says the rule index and the activity representation are not requirements) | none needed |
| `tests/invariants/test_minute_span_split.py:37-38` | "the task "odkrywanie", Context, the vault file `odkrywanie_loop2.md`, line 99, D-82" | entry named | D-121 (first chill in game minute 84; D-82 was a wrong reference there) |
| `tests/invariants/test_minute_span_split.py:49, 151` | "(D-80)" for the solving condition of Las | entry named (corrected) | D-133, D-136 (see Concerns) |
| `tests/invariants/test_player_map_run_pace.py:36-38` | "(the task "odkrywanie", Context: minute 83 at 35,008 degrees, minute 84 at 34,984)" | entry named; the two temperatures dropped (derived, not needed) | D-121 |
| `tests/invariants/test_player_map_run_pace.py:45` | "D-80" for the solving condition of Las | entry named (corrected) | D-133, D-136 |
| `tests/invariants/test_player_map_run_pace.py:167-169` | "the task "odkrywanie", Context, line 99 of the vault file `odkrywanie_loop2.md`, D-82" | entry named | D-121 (84), D-123 (the rule the first chill writes) |
| `tests/invariants/test_player_map_run_pace.py:195-196` | "The task "rozwiazanie-lasu", To do 1 and 2" | removed (the comment now states the rule itself, which is the invariant `player-map-run-pace`'s own sentence) | invariant `player-map-run-pace` (already cited in the docstring) |
| `tests/invariants/test_program_world_reference.py:30` | "the task's grouped program" | entry named | D-90 |
| `tests/invariants/test_program_world_reference.py:279` | "D-90 and the task plan" | removed ("the task plan" is a pointer; D-90 does not state the ids, so D-90 was not kept there) | none needed |
| `tests/invariants/test_streak_program_change.py:16-17` | "task `rozwiazanie-lasu`, question 9 and row 6 of its settlements" | entry named | D-131 |
| `tests/invariants/test_streak_program_change.py:23` | "task `programy-gracza`, To do 7" | entry named | D-164 |
| `tests/invariants/test_streak_program_change.py:28` | "To do 12;" | removed (the sentence quoted next to it is the invariant's and D-131's) | D-131 |
| `tests/invariants/test_streak_program_change.py:44` | "(task 18)" | removed | none needed |
| `tests/sim/completion.test.mjs:3-5` | "the task "rozwiazanie-lasu", To do 5 and 7 and Questions to settle 6, 8, 15 and 17 (task.md lines 19-22, ...)"; "(D-80)" | entry named: D-136, D-71, D-132, D-134, D-93, D-122 and D-133; each one checked against the test's expectations (completion rule and rest of the minute: D-71, D-136; screen after: D-132; solved map stays solved after a death: D-134; counts after completion: D-93; completion in the minute of a discovery: D-122) | D-71, D-93, D-122, D-132, D-133, D-134, D-136 |

I checked the claims of the old note passages (rozwiazanie_lasu To do 5, 7, Q6, Q8, Q15, Q17; przewodnik_testow Q7a;
read from the snapshot) against the foundation; each is held by the decisions named above, so no new
decision was needed.

## Checks (command, exit code)

- `npm test -- tests/sim/completion.test.mjs` — exit 0 (19 tests pass).
- `npm test -- tests/invariants/test_action_in_progress.py` — exit 0 (2 tests).
- `npm test -- tests/invariants/test_minute_span_split.py` — exit 0 (9 tests).
- `npm test -- tests/invariants/test_player_map_run_pace.py` — exit 0 (9 tests).
- `npm test -- tests/invariants/test_program_world_reference.py` — exit 0 (3 tests).
- `npm test -- tests/invariants/test_streak_program_change.py` — exit 0 (5 tests).
- `npm run typecheck` — exit 0.
- `node node_modules/eslint/bin/eslint.js --max-warnings 0 tests/sim/completion.test.mjs src/browser/sim/trip.ts src/browser/sim/data/balance.ts` — exit 0.
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig` on the same three files — exit 0.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0 (0 errors).
- Extra: `the quality environment of the worktree (not committed)/Scripts/ruff.exe check` on the five Python tests — exit 0.
- S1 grep — no line, exit 1. S2 grep — no line, exit 1 (after the edits; before them it printed the 14 hits above).
- S3 grep — remaining hits are only the word `plan` as the name of the `TripPlan` variable/parameter in `src/browser/sim/trip.ts` (lines 20, 26, 43, 48, 50, 58, 66, 81, 86, 87, 98, 103, 129, 131, 140) and the data kind `trip-plan` in `tests/invariants/test_program_world_reference.py:197-198`; none points to a document. The one hit that did (`:279`, "the task plan") was fixed.
- A wider grep of the eight files for `vault|note|concept|definition|MVP|old loop|predecessor|.md|sha256|settlement|cycle` finds only the "loop clock" of `balance.ts:9` (the game's earning loop).
- Own-work check: the requirement most likely missed is a pointer that names no file or number (e.g. "the task's grouped program", "the task plan", "(task 18)"). I searched for these by reading all eight files whole (the two TS files only in the part that holds comments; see Unread) and by the S2 and wider greps; the three found that way were fixed.

## Concerns

- **Wrong decision number found.** Three tests/comments cited "D-80" as the source of "the solving condition of Las is a streak of 480". In the foundation D-80 is "What establishes a game-balance expectation?", which does not hold it. The decisions that do are D-136 (how a map is solved; the condition stands in the map's data) and D-133 (the sentence "Las — 480 minut …"). I replaced D-80 with those in `tests/sim/completion.test.mjs`, `test_minute_span_split.py` (twice) and `test_player_map_run_pace.py`. The 480 itself is held by a decision only as the text of D-133 and in the verification of D-71, D-132, D-133; no decision states "Las: streak 480" as its main sentence. If the orchestrator wants it stated as a rule, that is a new decision (not written; the slice's Goal allows it only for information the code needs that the foundation lacks, and the data file `maps.ts` holds the number).
- `test_minute_span_split.py:37` pointed to D-82 for the minute of the first chill; D-82 is the rule about test sources, so it was replaced by D-121, not kept.
- The temperatures of minute 83 and 84 (35,008 and 34,984 degrees) were dropped: they are derived from the cooling rate and the Las temperature in the data; the foundation holds the minute (84) only.

## Reaches beyond the dispatch

- `foundations/invariants.md`: read whole the entries `action-in-progress`, `player-map-run-pace`, `minute-span-split`, `streak-program-change`, `program-world-reference` (the orchestrator's addition).
- `foundations/decisions.md`: D-57, D-58, D-71, D-82, D-90, D-93, D-121, D-122 (part), D-123, D-131, D-132, D-134, D-136, D-164, D-189, D-190 (part), D-214, D-219 read to check what each holds. Reason: find what each pointer's information stands in.
- Snapshot: `vault/rozwiazanie_lasu_loop2.md` (To do 1-8, Q 6-9, 12-17) and `vault/przewodnik_testow_loop2.md` (Q7a lines). Reason: to confirm the foundation holds what the comments pointed to.

## Unread material

- `.claude/skills/the-way-record-decision/SKILL.md`, `.the-way/elements/decisions/**`, `.the-way/elements/common/rules.md`, `way_of_working.md`, `.the-way/task-cycle/skill/foundation_step.md`: not read; no decision was written, so the skill was not run.
- `guidelines/testing.md`, `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-content-data.md`, `src/browser/AGENTS.md`: not read; the change touches comments only.
- `part_map.md` entry of the part: not read, same reason.
- `src/browser/sim/trip.ts` was read lines 1-60, `src/browser/sim/data/balance.ts` lines 1-56 (whole); the comment hits of both are in those lines (grep over the whole files finds no other).
- `.the-way/task-cycle/change/slice.md` and `SKILL.md`: read whole.
- Task passages of the handoff: read as copied in the handoff; the files `task.md` and `plan.md` themselves were not opened.

## Searches not found or unclear

- None found missing. Unclear: whether a decision should state "Las is solved by a streak of 480" as its own sentence (see Concerns, first item).
