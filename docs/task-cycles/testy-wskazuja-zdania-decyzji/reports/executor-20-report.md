# Report — executor of slice 20 (content, map, time, randomness and program basics)

## Status

done with concerns

## Commits

- `c8263d98` test: lines `decision:` at the tests (author mariusznn@gmail.com, checked with `git log -1 --format=%ae`)
- `d1d58bb9` docs: the *Verification* fields of the 13 decisions

Range: `a237a7821e4b8c911b36cb41a73e7ce93dae838c..d1d58bb9`.

## Files changed

- `foundations/decisions.md`: +68 -68
- `tests/invariants/test_action_in_progress.py`: +1 -0
- `tests/sim/actions.test.mjs`: +16 -0
- `tests/sim/body.test.mjs`: +6 -0
- `tests/sim/campfire.test.mjs`: +27 -0
- `tests/sim/combat.test.mjs`: +4 -0
- `tests/sim/completion.test.mjs`: +3 -0
- `tests/sim/data.test.mjs`: +2 -0
- `tests/sim/discovery.test.mjs`: +4 -0
- `tests/sim/encounters.test.mjs`: +23 -0
- `tests/sim/flow.test.mjs`: +6 -0
- `tests/sim/gather.test.mjs`: +17 -0
- `tests/sim/hex.test.mjs`: +1 -0
- `tests/sim/layout.test.mjs`: +9 -0
- `tests/sim/loop.test.mjs`: +4 -0
- `tests/sim/program-counts.test.mjs`: +3 -0
- `tests/sim/program.test.mjs`: +7 -0
- `tests/sim/random.test.mjs`: +4 -0
- `tests/sim/rule-signs.test.mjs`: +2 -0
- `tests/sim/run-record.test.mjs`: +1 -0
- `tests/sim/skills.test.mjs`: +6 -0
- `tests/sim/streak.test.mjs`: +2 -0
- `tests/sim/time.test.mjs`: +5 -0
- `tests/sim/trip.test.mjs`: +7 -0
- `tests/sim/world.test.mjs`: +5 -0
- `tests/view/body-row.test.mjs`: +1 -0
- `tests/view/end-window.test.mjs`: +1 -0
- `tests/view/map-lines.test.mjs`: +5 -0
- `tests/view/program-editor.test.mjs`: +4 -0
- `tests/view/run-header.test.mjs`: +6 -0
- `tests/view/trip.test.mjs`: +3 -0

## Checks run

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`; none of D-18, D-20, D-21, D-22, D-23, D-24, D-25, D-26, D-71, D-90, D-91, D-92, D-394 listed as held by nothing (run after the last edit, before the commits).
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <the 28 changed .mjs files>` — exit 0, all files in Prettier style.
- `git diff -U0 a237a782 -- foundations/decisions.md`, read: every hunk inside the *Verification* field of one of my decisions (see Own-work check).
- One run per file, each after the edits (33 runs, all exit 0):
- `npm test -- tests/invariants/test_action_in_progress.py`` — exit 0
- `npm test -- tests/sim/actions.test.mjs`` — exit 0
- `npm test -- tests/sim/body.test.mjs`` — exit 0
- `npm test -- tests/sim/campfire.test.mjs`` — exit 0
- `npm test -- tests/sim/combat.test.mjs`` — exit 0
- `npm test -- tests/sim/completion.test.mjs`` — exit 0
- `npm test -- tests/sim/data.test.mjs`` — exit 0
- `npm test -- tests/sim/discovery.test.mjs`` — exit 0
- `npm test -- tests/sim/encounters.test.mjs`` — exit 0
- `npm test -- tests/sim/flow.test.mjs`` — exit 0
- `npm test -- tests/sim/gather.test.mjs`` — exit 0
- `npm test -- tests/sim/hex.test.mjs`` — exit 0
- `npm test -- tests/sim/layout.test.mjs`` — exit 0
- `npm test -- tests/sim/loop.test.mjs`` — exit 0
- `npm test -- tests/sim/program-counts.test.mjs`` — exit 0
- `npm test -- tests/sim/program.test.mjs`` — exit 0
- `npm test -- tests/sim/random.test.mjs`` — exit 0
- `npm test -- tests/sim/rule-signs.test.mjs`` — exit 0
- `npm test -- tests/sim/run-record.test.mjs`` — exit 0
- `npm test -- tests/sim/skills.test.mjs`` — exit 0
- `npm test -- tests/sim/streak.test.mjs`` — exit 0
- `npm test -- tests/sim/time.test.mjs`` — exit 0
- `npm test -- tests/sim/trip.test.mjs`` — exit 0
- `npm test -- tests/sim/world.test.mjs`` — exit 0
- `npm test -- tests/view/body-row.test.mjs`` — exit 0
- `npm test -- tests/view/end-window.test.mjs`` — exit 0
- `npm test -- tests/view/map-lines.test.mjs`` — exit 0
- `npm test -- tests/view/program-editor.test.mjs`` — exit 0
- `npm test -- tests/view/run-header.test.mjs`` — exit 0
- `npm test -- tests/view/trip.test.mjs`` — exit 0
- `npm test -- tests/sim/rules.test.mjs`` — exit 0
- `npm test -- tests/invariants/test_simulation_randomness.py`` — exit 0
- `npm test -- tests/invariants/test_program_world_reference.py`` — exit 0
- Not run: the full gate `npm test` without a file — the cycle's, not the slice's (handoff and method). The two quality tests failing at the base were therefore not run.

## Own-work check

- Requirement most likely missed: a quotation of a line `decision:` that does not stand in the binding sentences (many lines were inserted by script, several quoting long sentences with dashes and Polish quotation marks), which the plan's check would pass silently if the foundation check did not read the lines.
- Check: one quotation of D-22 in `tests/sim/random.test.mjs` broken on purpose (`seeded by the seed saved` -> `seeded by a seed kept`), `python -B .the-way/elements/common/foundation_check.py` run, the file restored.
- Result: exit 1, `tests/sim/random.test.mjs:49: the quotation stands in no binding sentence of D-22`, `1 error`; after the restore the check gives `0 errors`, exit 0, and `git diff --stat` of the file shows only the 4 added lines. So every quotation of the slice is checked by the script, and all of them stand.
- Second requirement: nothing outside the *Verification* fields of my decisions changed in the log. `git diff -U0 a237a782 -- foundations/decisions.md` gives 15 hunks, at lines 494, 554, 573, 617, 662, 668, 671, 703, 736, 766, 1583, 1853, 1871, 1891 and 10060 of the base, each inside the *Verification* field of D-18, D-20, D-21, D-22, D-23 (three hunks), D-24, D-25, D-26, D-71, D-90, D-91, D-92 and D-394.

## The decisions, one row each

The `path:line` of each line `decision:` is in the appendix at the end, generated from the files (the line is that of the test case's `test(`/`def`).

| Decision | Held in whole or in part by tests | Held by invariants | Held by nothing | *Verification* became |
|---|---|---|---|---|
| D-18 | S1 in part: the simulation and the view taking a map's step, ambient temperature, solving requirements, caps, resource densities, times to renew and an attacker's chance from the map row they are given — `tests/sim/{body,completion,data,layout,trip,world}.test.mjs`, `tests/view/{map-lines,trip,end-window,run-header,body-row}.test.mjs` (24 cases) | content-identifiers: S1 for the ids and names of maps, resources and archetypes | the numbers of items, creatures and character skills standing in data; S2 (a map, item or creature added by data alone) | pair rewritten (its lead names only the part nothing holds; examples kept) |
| D-20 | S1 first clause (attack interrupts, action lost): `encounters.test.mjs` 3 cases; S2 whole: `flow`, `time`, `actions`, `encounters` (2), `combat` (1) cases and `test_action_in_progress.py::test_actions_last_their_full_duration_through_program_changes` | action-in-progress: S1 second clause | none | tests clause added (it had no pair) |
| D-21 | S1 the paces and the pause/resume: `time` (2), `flow` (2), `data` (1), `run-header` (5); S2 whole: `time` 229, `flow` 183 (the pause at a discovery included) | player-map-run-pace: S1 the rate | a way to move a map run other than its pace and pause (a jump to the result or back) | pair rewritten |
| D-22 | S1 one generator per kind, layout drawn in fixed order: `random` (4), `gather` (2), `encounters` 571, `layout` (2); S2 a send taking a new seed (`flow`), loop seeds from a draw (`loop` 3); S3 (`loop` 1) | map-run-repeatability, simulation-randomness (seeded from the state), restart-seed (restart keeps seed), map-run-layout | none | pair removed |
| D-23 | S2 in part (groups one level deep): `program` 294; S3 in part (eat's item dropped): `campfire` „the program check takes the six actions…” | program-rule-pick, action-in-progress (S1), program-closed-lists (S2 closed list) | conditions never written as expressions; no manual action by the player; the fuel a campfire takes | pair rewritten |
| D-24 | S1 in part (hexagons, dimensions, step, entrance fixed or drawn, no renewal time): `hex` 52, `layout` (3), `world` 230; S3: `layout` (2) | map-run-tiles: S2, S3 bounds | the attacking creatures and how often they attack standing in the map's data | pair rewritten |
| D-25 | S1: `actions` (2), `campfire` 442; S2 brings no item, gathering only on a revealed tile and as much as lies: `actions` 111, `gather` (5) | exploring-reveal, move-reach | none | pair removed |
| D-26 | S1 campfire part: `campfire` 419; S2 campfire part: `campfire` (3); S3: `campfire` „Wytwórz” feasibility, `world` 150 | walk-target, walk-feasibility (resources), program-world-reference | none | pair removed |
| D-71 | S1, S2 and S3 in parts that together cover the sentences: `encounters` (14), `campfire` (6), `body` (4), `world` (2), `discovery` (4), `completion` 81, `time` 124, `streak` (2), `run-record` 214 | minute-span-split, nature-energy-range | none, by my judgment (see Concerns) | pair removed |
| D-90 | the sentence whole: `program` (3), `program-editor` (4) | — | none | pair removed |
| D-91 | whole: `program` 179; in part: `flow` 48 | — | none | pair removed |
| D-92 | whole: `program-counts` (3), `encounters` (3), `combat` (3) | — | none | pair removed |
| D-394 | both sentences whole: every case of the simulation tests that calls `actionFeasible` — `program` 148, `actions` (6), `gather` (5), `campfire` (7), `skills` (3), `rule-signs` 93 | — | none | pair removed |

Files with no change though the plan's *Change* names them: `tests/sim/rules.test.mjs` (S1 and S2 are the tests of the invariants simulation-randomness and content-identifiers and check only what those state — R1), `tests/invariants/test_simulation_randomness.py` and `tests/invariants/test_program_world_reference.py` (tests of invariants derived from D-22 and D-26 that check only what the invariants state — R1).

Files reached beyond the slice's *Change* (item 5), each run on its own: `tests/sim/actions.test.mjs`, `tests/sim/body.test.mjs`, `tests/sim/campfire.test.mjs`, `tests/sim/combat.test.mjs`, `tests/sim/completion.test.mjs`, `tests/sim/data.test.mjs`, `tests/sim/discovery.test.mjs`, `tests/sim/encounters.test.mjs`, `tests/sim/gather.test.mjs`, `tests/sim/hex.test.mjs`, `tests/sim/loop.test.mjs`, `tests/sim/program-counts.test.mjs`, `tests/sim/rule-signs.test.mjs`, `tests/sim/run-record.test.mjs`, `tests/sim/skills.test.mjs`, `tests/sim/streak.test.mjs`, `tests/sim/trip.test.mjs`, `tests/sim/world.test.mjs`; browser-view, after reading `guidelines/styleguide-browser-view.md` whole: `tests/view/body-row.test.mjs`, `tests/view/end-window.test.mjs`, `tests/view/map-lines.test.mjs`, `tests/view/program-editor.test.mjs`, `tests/view/run-header.test.mjs`, `tests/view/trip.test.mjs`.

## Pairs added or rewritten (for the human to accept at the merge)

Removed: D-22, D-25, D-26, D-71, D-90, D-91, D-92, D-394. Added: none. Rewritten:

- D-18 — "For the numbers of items, creatures and character skills and for what a change of data alone adds, an agent compares a change with the part no invariant and no test holds:
  - complies: a new creature added as a row of the creatures' data, which the simulation reads
  - violates: a wolf's damage written as a number in the combat code"
- D-21 — "For a way to move a map run other than its pace and its pause, an agent compares a change with the part no invariant and no test holds:
  - complies: a map run at 16× passing sixteen game minutes, one after another, in one real second
  - violates: a control that takes a map run straight to its result or back to an earlier game minute"
- D-23 — "For a condition written as an expression, since a sentence of this decision naming what a kind of condition may take would also bind which kinds the closed list holds, which this decision leaves open, for a way of the player to carry out a character's action by hand and for the fuel a campfire takes, an agent compares a change with the part no invariant and no test holds:
  - complies: a condition picker listing the conditions of the closed list, each with the resource and the whole number it takes; a condition on the character's temperature taking 36.5, a number with tenths, from a number field of the picker
  - violates: a text field taking a condition as an expression; a kind of condition added to the closed list that takes a formula as text; a button that makes the character eat now; a program rule naming which stick to burn"
- D-24 — "For the attacking creatures and how often they attack standing in the map's data, an agent compares a change with the part no invariant and no test holds:
  - complies: a new game map added as a row of the game maps' data, with the wolf and its chance per game minute among its attackers
  - violates: the wolf's chance per game minute of attacking written as a number in the code of attacks"

## Choices, with the way rejected

- D-394: every test case of the simulation that calls `actionFeasible` carries both lines of D-394 (27 cases), since removing the function fails each of them. Rejected: marking only one case per file — the rule asks a line at every test that holds the sentence. Cost if wrong: 54 lines of comment noise; the human may prefer the decision kept with its pair instead.
- D-18: tests that hand the simulation or the view a map row with one number changed and expect the result to follow that number hold S1 for that number (a constant in code would fail them), so they carry D-18 (24 cases, view tests included). Rejected: holding D-18 by the invariant alone and keeping the pair whole. Cost if wrong: lines the reviewer may judge as mere use of a parameter.
- D-21 in the view: the header tests of „Pauza”/„Wznów” and of the five pace buttons hold the player's pause/resume and the pick among the five paces; the sim tests hold S2. Rejected: leaving the view out, which would keep the player's control under the pair.
- D-20 S2 and D-90/D-92: tests of invariants derived from other decisions (program-rule-pick from D-23) were judged against D-20 and D-92, whose own *Verification* names no such invariant, so they carry D-20/D-92 lines where they hold those sentences (R1 applies only to invariants derived from the decision itself).
- The line stands as the first line in the test's body, as earlier slices put it (e.g. `tests/sim/layout.test.mjs` from slice 19), not above the `test(` call where the lines `invariant:` of JavaScript files stand.
- The run-header case „the header reads … with no action of the character” was not marked for D-23's "the player has no way to carry out a character's action by hand": it checks the header's contents (D-311), and would catch a manual-action button only in the header; I judged it too narrow and kept that part under the pair. A reviewer may judge it a partial hold.

## Concerns

- D-71 lost its pair: by my reading every clause of its three sentences is held by at least one marked case (listed in its new *Verification*). The weakest links are "health changes for cold and hunger or recovers" (held through the body step's loss and its cause after cooling and the fall of satiety, `tests/sim/body.test.mjs`, and `tests/sim/streak.test.mjs`) and "an attack tried again after those turns" (held through the cooldown starting at the end of combat, `tests/sim/encounters.test.mjs` „cooldown starts at combat end E…”). If the reviewer finds a clause unheld, a pair for that clause goes back.
- D-22's sentence "the map run draws its map's layout at its start, before the first game minute" is held by the layout tests on `drawLayout` and by map-run-layout; no test checks that `newMapRun` calls it before minute 0 rather than lazily. I judged it held.
- The base-failing `test_ruff_source_rules` and `test_shellcheck_source_rules` are in the full gate, which I did not run (not mine to run).

## R3 — wording of a decision against the code or tests

- D-23's *Verification* lead speaks of "a sentence of this decision naming what a kind of condition may take" — unchanged by me; I kept it word for word in the rewritten lead.
- D-394 says "the game does not call it": not checked by me against `src/`; no change.
- D-71 says "the game having no combat spell today" in its *Rationale* ("today" in a rationale) — not a binding sentence, no change.

## Reaches beyond the dispatch

- `the author's rules on writing scripts, outside the repository` (the user's rule before writing a script) — read after the first insertion script, before the rest; the files' LF endings were kept (`git ls-files --eol` shows `i/lf w/lf`).
- `.the-way/task-cycle/change/slice.md` — the method's row for a slice names it.
- Test files outside the *Change*, listed above, read by case and range for item 5.

## Working copies

- `.runs/executor-20/` (under the worktree's ignored `.runs/`): `files.txt`, `results.txt`, one log per test run, `listing.tsv`; and `.runs/executor-20-fc.txt` (output of the foundation check). All of it removed before return (see the last line of this report).
- The quotation broken for the own-work check was restored in place; no copy of it remains.

## Unread material

- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/task-frozen.md`: read whole (more than the passages named).
- `foundations/invariants.md`: the named invariants read by heading; content-identifiers, action-in-progress, player-map-run-pace, map-run-repeatability, simulation-randomness, restart-seed, map-run-layout, program-rule-pick, program-closed-lists, map-run-tiles, exploring-reveal, move-reach, walk-target, walk-feasibility, program-world-reference, minute-span-split, nature-energy-range all read whole.
- Test files of the *Change* read whole except `tests/sim/rules.test.mjs` (read 1-40 and 150-374: the scans and every case) and the two Python invariant files (`test_simulation_randomness.py` 1-60 and 440-514; `test_program_world_reference.py` 1-60 and 255-344; `test_action_in_progress.py` 1-60 and 170-214): every test case of these files was read.
- Other test files read only by the cases named in the appendix and their neighbours.

## Searches not found or unclear

- A test that no condition can be written as an expression, or that the player has no control carrying out an action by hand (D-23): none found.
- A test that the simulation takes an attacker's chance or a creature's or an item's numbers from data (a varied creature or attacker row given to the attack or combat code): none found.
- A test of the fuel a feeding takes (D-23 S3): none found; only eat's item field.
- `npm test` output files are the product's own; none left outside `.runs/`.

## Appendix — lines `decision:` added, by decision (`path:line` of the case, case name, start of the quotation)

- D-18 — `tests/sim/body.test.mjs:473` — a map that does not cool the body below the threshold gives no minutes until chilled — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/sim/body.test.mjs:570` — a map at the body's starting temperature gives not cooling, and fire is read before it — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/sim/completion.test.mjs:274` — solving requirements present in data are all required and absent ones are ignored — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/sim/completion.test.mjs:342` — a requirement the data of the map leaves out is not given, and the other one stands alone — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/sim/data.test.mjs:730` — an activity of 0 minutes from faulty data still finishes in the next minute — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/sim/layout.test.mjs:128` — the minimum guarantee places a resource nobody drew — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/sim/layout.test.mjs:148` — a resource of zero density is never placed — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/sim/trip.test.mjs:205` — entry caps, including zero, affect equipment independently of exit caps — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/sim/trip.test.mjs:225` — exit spends chest room and map capacity in snapshot order, with partial rows — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/sim/trip.test.mjs:260` — warnings compare desired pieces and carrying capacity to the map, ignoring stock — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/sim/trip.test.mjs:403` — zero map entry cap still allows gathering, and completion clips that minute's gathered loot — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/sim/trip.test.mjs:585` — takeFromNowhere clips the take list by capacity and the entry cap of the map and reads nothing else — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/sim/trip.test.mjs:609` — clippedTake lists the take entries cut by capacity and the entry cap in list order, a partial row included, and keeps the plan — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/sim/trip.test.mjs:750` — sendTake at an unsolved map is cut by the map's entry cap of 4 before the chest's stock — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/sim/world.test.mjs:231` — a resource whose map data gives no time to renew does not renew, while the others renew — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/view/body-row.test.mjs:218` — on a map that does not cool the body the note under temperature reads „nie stygnie” — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/view/end-window.test.mjs:591` — the warning of a cut trip plan stands between „Restart” and „Zakończ”, from the copy's take list — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/view/map-lines.test.mjs:100` — a step above the usual costs more, one below costs less, the note standing apart, and a map that does not cool leaves the minutes out — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/view/map-lines.test.mjs:127` — each resource gives its name, the tiles that hold it, its stock and its renewal — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/view/map-lines.test.mjs:176` — a resource that does not renew says so apart, in warning, in place of its renewal — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/view/map-lines.test.mjs:212` — the chance is written with a decimal comma and at most one decimal, and the mean gap rounds — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/view/map-lines.test.mjs:232` — the entry and exit caps stand apart, each in warning; a zero cap counts; no cap gives no line — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/view/run-header.test.mjs:342` — the warning of a cut trip plan follows the current copy's take list — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/view/trip.test.mjs:149` — map warning appears below desired load and backpack capacity, including a zero map cap — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/view/trip.test.mjs:165` — the mark shows at a solved map when a take entry cut by capacity and the entry cap exceeds the chest, and only then — "The game's content — game maps, items, creatures, character …"
- D-18 — `tests/view/trip.test.mjs:267` — the enter line gives what a send takes, cut by the chest, the capacity and the entry cap — "The game's content — game maps, items, creatures, character …"
- D-20 — `tests/invariants/test_action_in_progress.py:175` — test_actions_last_their_full_duration_through_program_changes — "The program chooses again at the next free game minute"…"
- D-20 — `tests/sim/actions.test.mjs:170` — the next activity is chosen in the finishing minute by the program current then — "The program chooses again at the next free game minute"…"
- D-20 — `tests/sim/combat.test.mjs:144` — character health conditions are checked after the creature's strike — "The program chooses again at the next free game minute, and …"
- D-20 — `tests/sim/encounters.test.mjs:150` — an action ending in attack minute lands, while an interrupted move leaves no target or later movement — "An attack interrupts the character's action still in progres…"
- D-20 — `tests/sim/encounters.test.mjs:237` — a lighting interrupted by an attack takes neither its sticks nor its nature energy — "An attack interrupts the character's action still in progres…"
- D-20 — `tests/sim/encounters.test.mjs:303` — M+5 starts ordinary work immediately, counts every combat action once and still shows combat — "The program chooses again at the next free game minute, and …"
- D-20 — `tests/sim/encounters.test.mjs:329` — editing during the wait preserves encounter state and resolves with the newly written program — "The program chooses again at the next free game minute, and …"
- D-20 — `tests/sim/encounters.test.mjs:54` — an eligible attack interrupts a long exploration before it finishes — "An attack interrupts the character's action still in progres…"
- D-20 — `tests/sim/flow.test.mjs:94` — a program edit during a 20-minute exploration does not interrupt it and applies at minute 20 — "The program chooses again at the next free game minute"…"
- D-20 — `tests/sim/time.test.mjs:125` — passing real time gives the events of the minutes it covers, in order — "The program chooses again at the next free game minute"…"
- D-21 — `tests/sim/data.test.mjs:382` — the archetype and the pace are in data — "A map run the player starts passes at one game minute per re…"
- D-21 — `tests/sim/flow.test.mjs:186` — setPace sets the pace and nothing else, with a map run or without — "A map run the player starts passes at one game minute per re…"
- D-21 — `tests/sim/flow.test.mjs:186` — setPace sets the pace and nothing else, with a map run or without — "Picking a pace while the map run is paused, the pause at a d…"
- D-21 — `tests/sim/flow.test.mjs:204` — setPace throws on a pace outside the list of paces and leaves the game as it was — "A map run the player starts passes at one game minute per re…"
- D-21 — `tests/sim/time.test.mjs:189` — each pace of the data gives its multiple of a game minute per real second — "A map run the player starts passes at one game minute per re…"
- D-21 — `tests/sim/time.test.mjs:233` — a pace chosen while paused changes only the pace, and the run stands until resumed — "Picking a pace while the map run is paused, the pause at a d…"
- D-21 — `tests/sim/time.test.mjs:76` — after a resume time goes on from where the pause held it — "A map run the player starts passes at one game minute per re…"
- D-21 — `tests/view/run-header.test.mjs:110` — the header reads the character's name, the map's name, the clock, the bar of the solving condition, „Pauza”, the paces, „Restart” and „Zakończ”, in that order, with no action of the character — "A map run the player starts passes at one game minute per re…"
- D-21 — `tests/view/run-header.test.mjs:157` — the clock reads the game minute, „ (pauza)” after it while paused, and „Wznów” takes the place of „Pauza” — "A map run the player starts passes at one game minute per re…"
- D-21 — `tests/view/run-header.test.mjs:170` — the buttons ask for what they say: the pause, the restart and the end — "A map run the player starts passes at one game minute per re…"
- D-21 — `tests/view/run-header.test.mjs:200` — the header shows five pace buttons, 1× to 16×, with the one of the state's pace selected — "A map run the player starts passes at one game minute per re…"
- D-21 — `tests/view/run-header.test.mjs:224` — a click on a pace button asks for that pace; the buttons stay while paused and go with death — "A map run the player starts passes at one game minute per re…"
- D-22 — `tests/sim/encounters.test.mjs:592` — two different ordinary programs on a shared seed meet their first attack in the same minute — "Every random draw of the simulation comes from generators se…"
- D-22 — `tests/sim/flow.test.mjs:165` — the next send after Zakończ takes a new seed from the later real time — "A restart of a map run keeps its seed, any other map run out…"
- D-22 — `tests/sim/gather.test.mjs:165` — a map run starts its gathering generator from its seed, apart from the other streams — "Every random draw of the simulation comes from generators se…"
- D-22 — `tests/sim/gather.test.mjs:276` — the wander stream gives the same draws with and without gathering — "Every random draw of the simulation comes from generators se…"
- D-22 — `tests/sim/layout.test.mjs:170` — golden values: the layout stream of seed 1, mixSeed(1, 1000) and the stocks of Las for seed 1 — "Every random draw of the simulation comes from generators se…"
- D-22 — `tests/sim/layout.test.mjs:72` — Las — głębiej draws its entrance from every row-major tile after resources — "Every random draw of the simulation comes from generators se…"
- D-22 — `tests/sim/loop.test.mjs:227` — the first map run of a loop goes on the program of its row, from the seed a send takes, and the loop holds the content of the program and nothing of its copy — "The first map run of an earning loop, with none before it, t…"
- D-22 — `tests/sim/loop.test.mjs:658` — a completion deposits the bring list's clipped loot, counts the map run, adds its practice to the loop and starts the next map run in the same step — "A restart of a map run keeps its seed, any other map run out…"
- D-22 — `tests/sim/loop.test.mjs:707` — the seeds of the successive map runs of a loop follow the draw of the fifth generator, and the last seed is not touched after the start — "A restart of a map run keeps its seed, any other map run out…"
- D-22 — `tests/sim/loop.test.mjs:726` — a death with a resurrection ready is settled at the moment given: used up, nothing paid, the carried items gone, the loop going on at its next map run — "A restart of a map run keeps its seed, any other map run out…"
- D-22 — `tests/sim/random.test.mjs:111` — the next seed is the first draw of the fifth stream of the seed, as a uint32 — "Every random draw of the simulation comes from generators se…"
- D-22 — `tests/sim/random.test.mjs:48` — streams of one seed differ — "Every random draw of the simulation comes from generators se…"
- D-22 — `tests/sim/random.test.mjs:79` — adding the fifth stream changes no state of the four streams before it — "Every random draw of the simulation comes from generators se…"
- D-22 — `tests/sim/random.test.mjs:99` — the fifth stream starts from the seed at a state of its own, none of the other four's — "Every random draw of the simulation comes from generators se…"
- D-23 — `tests/sim/campfire.test.mjs:537` — the program check takes the six actions before sending and during a map run — "Which piece of an item an action uses — which fuel goes into…"
- D-23 — `tests/sim/program.test.mjs:299` — program identities are unique positive integers below the next identity counters — "Conditions are chosen from a closed list, never written as e…"
- D-24 — `tests/sim/hex.test.mjs:52` — a tile inside the grid has six neighbours, the corner (0,0) has two, in tile-list order — "A map is a grid of hexagonal tiles"…"
- D-24 — `tests/sim/layout.test.mjs:110` — the same seed gives the same tiles, another seed other tiles — "Which tile gets what is drawn by the map run from its seed, …"
- D-24 — `tests/sim/layout.test.mjs:148` — a resource of zero density is never placed — "Which tile gets what is drawn by the map run from its seed, …"
- D-24 — `tests/sim/layout.test.mjs:15` — tiles are row-major, unrevealed, with the map step cost — "A map is a grid of hexagonal tiles whose dimensions, entranc…"
- D-24 — `tests/sim/layout.test.mjs:59` — the entrance is the fixed one and lies on the map — "A map is a grid of hexagonal tiles whose dimensions, entranc…"
- D-24 — `tests/sim/layout.test.mjs:72` — Las — głębiej draws its entrance from every row-major tile after resources — "A map is a grid of hexagonal tiles whose dimensions, entranc…"
- D-24 — `tests/sim/world.test.mjs:231` — a resource whose map data gives no time to renew does not renew, while the others renew — "A map is a grid of hexagonal tiles whose dimensions, entranc…"
- D-25 — `tests/sim/actions.test.mjs:113` — explore takes 20 minutes, reveals the tile and brings nothing — "Exploring reveals the tile the character stands on, cannot b…"
- D-25 — `tests/sim/actions.test.mjs:286` — a step lasts the target tile stepMinutes and moves the character at its end — "A move onto a neighbouring tile is an ordinary action of the…"
- D-25 — `tests/sim/actions.test.mjs:399` — walking by program reaches the stock step by step and stays there — "A move onto a neighbouring tile is an ordinary action of the…"
- D-25 — `tests/sim/campfire.test.mjs:456` — „Idź — ognisko” walks to a far campfire step by step and stays there — "A move onto a neighbouring tile is an ordinary action of the…"
- D-25 — `tests/sim/gather.test.mjs:109` — „Zbierz” is feasible on a revealed tile holding the resource, with room in the backpack — "Exploring reveals the tile the character stands on, cannot b…"
- D-25 — `tests/sim/gather.test.mjs:119` — „Zbierz” is not feasible on a tile not revealed — "Exploring reveals the tile the character stands on, cannot b…"
- D-25 — `tests/sim/gather.test.mjs:127` — „Zbierz” is not feasible on a tile without the resource or with 0 of it — "Exploring reveals the tile the character stands on, cannot b…"
- D-25 — `tests/sim/gather.test.mjs:240` — a tile gathered to 0 pieces keeps the key of its resource — "Exploring reveals the tile the character stands on, cannot b…"
- D-25 — `tests/sim/gather.test.mjs:255` — a gathering takes no more than lies on the tile, nor beyond the backpack's cap, at its end — "Exploring reveals the tile the character stands on, cannot b…"
- D-26 — `tests/sim/campfire.test.mjs:169` — „Wytwórz — ognisko” is feasible on a revealed tile without a campfire, with 6 sticks — "A tile holds at most one campfire, which warms only that til…"
- D-26 — `tests/sim/campfire.test.mjs:432` — „Idź — ognisko” takes one move toward the nearest campfire, in the minutes of the tile it enters — "A program points at a thing of the world only as the nearest…"
- D-26 — `tests/sim/campfire.test.mjs:456` — „Idź — ognisko” walks to a far campfire step by step and stays there — "An action of the character that goes to a thing of the world…"
- D-26 — `tests/sim/campfire.test.mjs:474` — „Idź — ognisko” cannot be carried out where there is no campfire or on a campfire's tile — "An action of the character that goes to a thing of the world…"
- D-26 — `tests/sim/campfire.test.mjs:500` — „Idź — ognisko” is passed over on a campfire's tile, and the next program rule is picked — "An action of the character that goes to a thing of the world…"
- D-26 — `tests/sim/world.test.mjs:150` — a campfire and a stick on another tile do not warm, and burn down there — "A tile holds at most one campfire, which warms only that til…"
- D-71 — `tests/sim/body.test.mjs:124` — death falls during an action in progress, which gives no activityFinished — "Outside combat a game minute takes effect in this order"…"
- D-71 — `tests/sim/body.test.mjs:291` — the body step reports a loss only when the character is chilled or starving after it — "Outside combat a game minute takes effect in this order"…"
- D-71 — `tests/sim/body.test.mjs:308` — the body step names the cause of its loss from the same reading: cold, hunger, both, or none — "Outside combat a game minute takes effect in this order"…"
- D-71 — `tests/sim/body.test.mjs:343` — nature energy comes back by 0.5 in a game minute whose satiety after its fall is 60 or above — "Outside combat a game minute takes effect in this order"…"
- D-71 — `tests/sim/campfire.test.mjs:327` — a campfire lit in minute m warms from minute m + 1 for 60 minutes and uses 2 sticks — "Outside combat a game minute takes effect in this order"…"
- D-71 — `tests/sim/campfire.test.mjs:375` — a stick lit in minute m burns on the tile, warms in minutes m + 1 to m + 3 and is used — "Outside combat a game minute takes effect in this order"…"
- D-71 — `tests/sim/campfire.test.mjs:517` — the action ending in the minute of death takes no effect — "Outside combat a game minute takes effect in this order"…"
- D-71 — `tests/sim/campfire.test.mjs:663` — a mage with full nature energy who finishes a lighting has 90 after that minute — "Outside combat a game minute takes effect in this order"…"
- D-71 — `tests/sim/campfire.test.mjs:803` — a campfire going out in a minute of an encounter gives its event too — "In each game minute of combat the body and the nature energy…"
- D-71 — `tests/sim/campfire.test.mjs:829` — the minute of a death gives no event, and the campfire keeps its minutes — "Outside combat a game minute takes effect in this order"…"
- D-71 — `tests/sim/completion.test.mjs:81` — a map run with a streak of 479 completes at the end of the next game minute without a loss, with the rest of that minute taken effect and no program rule picked — "Outside combat a game minute takes effect in this order"…"
- D-71 — `tests/sim/discovery.test.mjs:128` — a new game sent with its one empty group waits until the minute of the first chill, which learns Wędruj and Temperatura poniżej, writes Zawsze → Eksploruj into the group Program and starts exploring in that minute — "Discoveries of a manual map run enter the Understanding wher…"
- D-71 — `tests/sim/discovery.test.mjs:569` — a gathering ending in the minute of the character's death reveals nothing, and the same gathering without death does — "Outside combat a game minute takes effect in this order"…"
- D-71 — `tests/sim/discovery.test.mjs:591` — the first chill in the minute of death still reveals what the body step reveals — "Discoveries of a manual map run enter the Understanding wher…"
- D-71 — `tests/sim/discovery.test.mjs:737` — a span of minutes of a new game sent, given 100, ends at the minute of the first chill, paused, holding what the chill revealed, and called again goes on — "Discoveries of a manual map run enter the Understanding wher…"
- D-71 — `tests/sim/encounters.test.mjs:150` — an action ending in attack minute lands, while an interrupted move leaves no target or later movement — "Outside combat a game minute takes effect in this order"…"
- D-71 — `tests/sim/encounters.test.mjs:185` — five combat minutes freeze needs and recovery while fire, renewal and streak advance once each — "In each game minute of combat the body and the nature energy…"
- D-71 — `tests/sim/encounters.test.mjs:219` — nature energy stands through the five combat minutes and comes back after them — "In each game minute of combat the body and the nature energy…"
- D-71 — `tests/sim/encounters.test.mjs:265` — each waiting minute M+1 through M+4 can complete without turns or an invented result — "In each game minute of combat the body and the nature energy…"
- D-71 — `tests/sim/encounters.test.mjs:284` — combat death in M+5 wins over completion and keeps the streak — "In each game minute of combat the body and the nature energy…"
- D-71 — `tests/sim/encounters.test.mjs:303` — M+5 starts ordinary work immediately, counts every combat action once and still shows combat — "In each game minute of combat the body and the nature energy…"
- D-71 — `tests/sim/encounters.test.mjs:407` — a creature-only discovery pauses before turns and does not write a combat rule — "Discoveries of a manual map run enter the Understanding wher…"
- D-71 — `tests/sim/encounters.test.mjs:464` — an ending exploration and first wolf produce one catalog-ordered discovery — "Discoveries of a manual map run enter the Understanding wher…"
- D-71 — `tests/sim/encounters.test.mjs:464` — an ending exploration and first wolf produce one catalog-ordered discovery — "Outside combat a game minute takes effect in this order"…"
- D-71 — `tests/sim/encounters.test.mjs:502` — first chill and attack in one minute keep the automatic exploration rule but never start it during combat — "Discoveries of a manual map run enter the Understanding wher…"
- D-71 — `tests/sim/encounters.test.mjs:502` — first chill and attack in one minute keep the automatic exploration rule but never start it during combat — "Outside combat a game minute takes effect in this order"…"
- D-71 — `tests/sim/encounters.test.mjs:54` — an eligible attack interrupts a long exploration before it finishes — "Outside combat a game minute takes effect in this order"…"
- D-71 — `tests/sim/encounters.test.mjs:621` — M+5 counts the second defeated attack before checking both map requirements — "In each game minute of combat the body and the nature energy…"
- D-71 — `tests/sim/encounters.test.mjs:96` — cooldown starts at combat end E and protects E+180, but not E+181 — "In each game minute of combat the body and the nature energy…"
- D-71 — `tests/sim/run-record.test.mjs:214` — the minutes of a fight count to the fight, the minute of the attack to what the character was doing, and the last minute of a death in the fight too — "In each game minute of combat the body and the nature energy…"
- D-71 — `tests/sim/streak.test.mjs:180` — a game minute of an encounter reports no loss, the streak growing in it — "In each game minute of combat the body and the nature energy…"
- D-71 — `tests/sim/streak.test.mjs:72` — a game minute of loss to hunger sets the streak to 0 — "Outside combat a game minute takes effect in this order"…"
- D-71 — `tests/sim/time.test.mjs:125` — passing real time gives the events of the minutes it covers, in order — "Outside combat a game minute takes effect in this order"…"
- D-71 — `tests/sim/world.test.mjs:276` — in the minute of death nothing burns down and no tile renews — "Outside combat a game minute takes effect in this order"…"
- D-71 — `tests/sim/world.test.mjs:306` — an exploring that ends in a minute of renewal reveals its tile and keeps the renewal — "Outside combat a game minute takes effect in this order"…"
- D-90 — `tests/sim/program.test.mjs:181` — a new game starts with one empty Program group under always — "A program holds an ordered list of rule groups, and every pr…"
- D-90 — `tests/sim/program.test.mjs:198` — group order skips false, empty and infeasible groups and then takes the first qualifying rule — "A program holds an ordered list of rule groups"…"
- D-90 — `tests/sim/program.test.mjs:299` — program identities are unique positive integers below the next identity counters — "A program holds an ordered list of rule groups, and every pr…"
- D-90 — `tests/view/program-editor.test.mjs:129` — groups append with monotonic numbers through rename and deletion, including the last group — "A program holds an ordered list of rule groups, and every pr…"
- D-90 — `tests/view/program-editor.test.mjs:1621` — „↓” on the last rule of a group makes it the first of the next, „↑” on the first the last of the previous; an empty group takes it too — "A program holds an ordered list of rule groups, and every pr…"
- D-90 — `tests/view/program-editor.test.mjs:230` — native drop targets place a rule before the target after removal, or append to a group — "A program holds an ordered list of rule groups, and every pr…"
- D-90 — `tests/view/program-editor.test.mjs:918` — rule edits preserve other groups, group boundaries and identities — "A program holds an ordered list of rule groups, and every pr…"
- D-91 — `tests/sim/flow.test.mjs:48` — a new game has one empty program, a team with no character and an empty chest, no map run, the initial seed and no pause — "A new game starts with one empty rule group named „Program”,…"
- D-91 — `tests/sim/program.test.mjs:181` — a new game starts with one empty Program group under always — "A new game starts with one empty rule group named „Program”,…"
- D-92 — `tests/sim/combat.test.mjs:115` — a stick strike without a stick is skipped in favor of the next combat rule — "One firing of a program rule is the start of its action, so …"
- D-92 — `tests/sim/combat.test.mjs:144` — character health conditions are checked after the creature's strike — "One firing of a program rule is the start of its action, so …"
- D-92 — `tests/sim/combat.test.mjs:158` — combat checks group conditions in order against post-strike health — "One firing of a program rule is the start of its action, so …"
- D-92 — `tests/sim/encounters.test.mjs:303` — M+5 starts ordinary work immediately, counts every combat action once and still shows combat — "One firing of a program rule is the start of its action, so …"
- D-92 — `tests/sim/encounters.test.mjs:363` — combat filters unavailable actions and group conditions through the current repertoire — "One firing of a program rule is the start of its action, so …"
- D-92 — `tests/sim/encounters.test.mjs:536` — a departed creature starts cooldown but adds no defeated attack — "One firing of a program rule is the start of its action, so …"
- D-92 — `tests/sim/program-counts.test.mjs:107` — pause and death retain counts, including an action interrupted by death — "One firing of a program rule is the start of its action, so …"
- D-92 — `tests/sim/program-counts.test.mjs:60` — minute zero counts once; a multi-minute action, its finish and later waits add nothing — "One firing of a program rule is the start of its action, so …"
- D-92 — `tests/sim/program-counts.test.mjs:94` — later starts count and each restart or new send resets before the minute-zero choice — "One firing of a program rule is the start of its action, so …"
- D-394 — `tests/sim/actions.test.mjs:157` — explore is not feasible on a revealed tile, so the next choice is a wait — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/actions.test.mjs:157` — explore is not feasible on a revealed tile, so the next choice is a wait — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/actions.test.mjs:276` — Wędruj is not feasible with no neighbour on the map — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/actions.test.mjs:276` — Wędruj is not feasible with no neighbour on the map — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/actions.test.mjs:332` — Idź targets the nearest revealed tile with stock and gives the first step — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/actions.test.mjs:332` — Idź targets the nearest revealed tile with stock and gives the first step — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/actions.test.mjs:364` — Idź is not feasible with no known tile in stock — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/actions.test.mjs:364` — Idź is not feasible with no known tile in stock — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/actions.test.mjs:388` — Idź is not feasible standing on the target — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/actions.test.mjs:388` — Idź is not feasible standing on the target — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/actions.test.mjs:94` — combat actions cannot be selected as ordinary map activities — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/actions.test.mjs:94` — combat actions cannot be selected as ordinary map activities — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/campfire.test.mjs:169` — „Wytwórz — ognisko” is feasible on a revealed tile without a campfire, with 6 sticks — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/campfire.test.mjs:169` — „Wytwórz — ognisko” is feasible on a revealed tile without a campfire, with 6 sticks — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/campfire.test.mjs:200` — „Zapal — ognisko” is feasible at a campfire here that is not burning, with 2 sticks — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/campfire.test.mjs:200` — „Zapal — ognisko” is feasible at a campfire here that is not burning, with 2 sticks — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/campfire.test.mjs:233` — „Zapal — patyk” is feasible on a revealed tile with a stick, and nowhere else — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/campfire.test.mjs:233` — „Zapal — patyk” is feasible on a revealed tile with a stick, and nowhere else — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/campfire.test.mjs:254` — „Zasil — ognisko” is feasible at a burning campfire here, with a piece of fuel — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/campfire.test.mjs:254` — „Zasil — ognisko” is feasible at a burning campfire here, with a piece of fuel — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/campfire.test.mjs:277` — „Zjedz — jagoda” is feasible with a piece of food, and not without — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/campfire.test.mjs:277` — „Zjedz — jagoda” is feasible with a piece of food, and not without — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/campfire.test.mjs:474` — „Idź — ognisko” cannot be carried out where there is no campfire or on a campfire's tile — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/campfire.test.mjs:474` — „Idź — ognisko” cannot be carried out where there is no campfire or on a campfire's tile — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/campfire.test.mjs:571` — Płomyk can be cast with nature energy reaching its price of 10, and not with less — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/campfire.test.mjs:571` — Płomyk can be cast with nature energy reaching its price of 10, and not with less — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/gather.test.mjs:109` — „Zbierz” is feasible on a revealed tile holding the resource, with room in the backpack — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/gather.test.mjs:109` — „Zbierz” is feasible on a revealed tile holding the resource, with room in the backpack — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/gather.test.mjs:119` — „Zbierz” is not feasible on a tile not revealed — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/gather.test.mjs:119` — „Zbierz” is not feasible on a tile not revealed — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/gather.test.mjs:127` — „Zbierz” is not feasible on a tile without the resource or with 0 of it — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/gather.test.mjs:127` — „Zbierz” is not feasible on a tile without the resource or with 0 of it — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/gather.test.mjs:138` — „Zbierz” is not feasible with a full backpack of 15 pieces of any items — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/gather.test.mjs:138` — „Zbierz” is not feasible with a full backpack of 15 pieces of any items — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/gather.test.mjs:240` — a tile gathered to 0 pieces keeps the key of its resource — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/gather.test.mjs:240` — a tile gathered to 0 pieces keeps the key of its resource — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/program.test.mjs:148` — feasibility and choice do not draw from the wander generator — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/program.test.mjs:148` — feasibility and choice do not draw from the wander generator — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/rule-signs.test.mjs:93` — each refusal of an action gives the reason of its row in D-380 — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/rule-signs.test.mjs:93` — each refusal of an action gives the reason of its row in D-380 — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/skills.test.mjs:321` — practice appears at the effect minute, once for all tiles of Zwiad, and never on an already revealed tile — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/skills.test.mjs:321` — practice appears at the effect minute, once for all tiles of Zwiad, and never on an already revealed tile — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/skills.test.mjs:376` — Obchód is guaranteed, lasts 40 minutes, takes at most 12, available stock and free space, and leaves random stream alone — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/skills.test.mjs:376` — Obchód is guaranteed, lasts 40 minutes, takes at most 12, available stock and free space, and leaves random stream alone — "The simulation keeps `actionFeasible`, the function that tel…"
- D-394 — `tests/sim/skills.test.mjs:410` — clean flame needs no stick but still costs ten energy; item lighting still needs its piece — "A clean-up does not remove it because the game has no caller…"
- D-394 — `tests/sim/skills.test.mjs:410` — clean flame needs no stick but still costs ten energy; item lighting still needs its piece — "The simulation keeps `actionFeasible`, the function that tel…"

Total lines `decision:` added for the slice's decisions: 185 (the number of added lines in `git diff --stat` of the test commit).


## Removal of working copies

`.runs/executor-20/` and `.runs/executor-20-fc.txt` were removed with `Remove-Item -Recurse -Force` before return; the appendix above carries what the report needed of them.
