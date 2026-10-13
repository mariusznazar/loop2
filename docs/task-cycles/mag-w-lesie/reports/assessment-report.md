# Independent assessment (WAY-10) of commit bec4d25 against 170118680abec6760291df5d13f908c58409f867

Read in full: foundation.diff, all 15 new invariant checks, the support module, the part map, glossary and decision log of the assessed tree, the templates (decisions, invariants, glossary, environment-facts, part-map), common/rules.md, WAY-19/56/69/73/95/97/104. I fetched the two cited sources (game-icons license.txt at the pinned commit; CC BY 3.0 legal code). No verdict is given.

Marks: cut / change / concern only. Paths are relative to the tree/ directory of the material; "decisions.md:N" is a line of tree/foundations/decisions.md.

## Observations

**A1 (cut) Glossary: "game minute" and "character skill".**
Checked WAY-95: an entry is for a word a reader of the field would not read in the entry's meaning. "A game minute is the unit of the simulation's time" (glossary.md:11) gives a reader nothing a reader of the field lacks; its pace is set in D-11, not here. "character skill" (glossary.md:5) appears in one binding sentence only (decisions.md:254, a list of content kinds), in no invariant, check or code, and its definition is the ordinary RPG meaning. Change: delete both entries, or drop "character skills" from D-08.

**A2 (change) WAY-104: bare words the-way holds.**
Glossary of the-way holds "part map", "human action", "invariant test", "open design choice". New foundation text writes the bare last words as domain words: "map" (D-14 heading and binding sentence decisions.md:401-406; D-08 "maps", ":254"; glossary "map run", "at one map", glossary.md:17), "action" (D-10 ":303", D-13 ":377", D-15 ":432"; invariants "an action the character is carrying out"), "choices" (D-04/3 ":202") and "tests of the simulation" (D-12 ":367"). Elsewhere the text correctly says "game map". Change: "game map", "character action" or similar, "player's picks", etc., in all foundation files.

**A3 (change) Words in binding sentences with no definition, or two words for one thing.**
- "free game minute" (D-13, program-rule-pick sentence) is a coined term; the meaning is only in the check's docstring (test_program_rule_pick.py:12). WAY-95: needs an entry, or a rewording ("a game minute with no action in progress").
- D-16 and D-15's examples say "nearest known tile"; the invariants and D-09/D-15 say "revealed". Same thing or not, the text does not say. Unify.
- D-08 says "creatures"/"items"; content-identifiers says "archetype" and "resource"; the data files use archetype/resource. A reader of D-08 cannot map it to the sentence that verifies it. Unify.
- D-12 uses "a restart of a map run" (act) while the glossary says a restart IS a map run (glossary.md:21). One of the two readings is wrong.

**A4 (change) D-04/3 grows a different question (WAY-19).**
Heading "What is the game built with?" now carries two new rules: the simulation is pure functions with real time as argument, and the browser view draws only from game state and changes it only through the simulation. WAY-19: a new rule next to an existing decision is a new question and gets a number; here it forced new wording (flagging D-03 and three invariants). Also *Rejected* (decisions.md:40-44) states a count ("three entries changed") and tells how the decision was reached, which the decisions template forbids (WAY-05/29).

**A5 (change) D-12 against its invariants.**
- D-12 says "generators ... one for each kind of draw"; simulation-randomness says "the generator seeded from the map run's state" (invariants.md, singular). The sentence should say generators, or the decision's per-kind split is contradicted by its own invariant.
- D-12 "draws its map's layout at its start, before the first game minute, in a fixed order" is covered by no listed level-2 item (the level-2 list names new-seed and which generator) and by no invariant. Gap, not necessarily a cut: either list it in Verification or drop it from the binding sentence.

**A6 (change) icon-credits and its facts do not match the sources.**
Checked against the pages I fetched. CC BY 3.0 §4(b)(iv) asks for "a credit identifying the use of the Work in the Adaptation (e.g. 'French translation of the Work by Original Author')". It does not ask to "say how the file differs from its source" (that wording is CC 4.0). Yet D-17 binding sentence, its Rationale ("The licence asks a changed work to say how it was changed", decisions.md:338) and icon-credits (invariants.md, last entry) demand it. The fact cc-by-3-adaptation-credit quotes §4(b)(iv) correctly but supports only "identify the use". Naming "the licence CC BY 3.0" and "its page" are not in the fact either (they come from §4(a) and (b)(iii), which the fact omits). Change: either reword the sentences to what the fact holds, or add the missing source lines to the facts.
Further:
- WAY-73: *Rests on* is for a fact that decides whether a commit makes the sentence true. Every demand is written in the sentence itself, so both facts are only reasons for D-17 and belong in its *Based on* alone. Change: remove *Rests on* from icon-credits (cut).
- game-icons-licence is about the contributor Delapouite only; license.txt marks other contributors "- CC0". D-17 says "SVG files from game-icons.net" without restriction, while icon-credits demands "CC BY 3.0" for every file, so a CC0 icon cannot pass. The check hard-codes AUTHORS (all Delapouite) as written-out values (fine, WAY-69). Concern: D-17 wider than its fact and its check.
- The fact's inference "Delapouite is CC BY, not CC0" rests on the absence of "- CC0" on that line; the quoted lines show only "or CC0 if mentioned below" and the name. Concern: the exception list is not quoted.
- Both facts' source quotes are otherwise faithful (checked).

**A7 (concern only) Level 2 where an invariant can be derived (decisions template: level 2 "only while no invariant can be derived").**
D-17: "kept in assets/icons/ outside the directory the server serves" is a commit-checkable sentence (no icon file under src/server public or dist inputs). D-09: "numbers of stock ... never on the drawing" and "its only interaction is hovering" are checkable. Not wrong today; they are the first candidates for derived invariants.

**A8 (change) Invariant form (WAY-56, WAY-60, WAY-73).**
- Several sentences join two rules with "and"/"or": exploring-reveal (reveals at end / cannot be carried out on a revealed tile), walk-target (moves toward nearest / cannot be carried out where none or standing), simulation-isolation (imports / uses host globals / system time), player-map-run-pace (unpaused / paused), program-rule-pick (picks first / carries out none), map-run-tiles (stock value / no foreign resource). The format guard only counts sentences; WAY-56 asks the independent assessment to judge. Each check does test both halves, so splitting would give 6 more entries; the cheaper route is leaving them and recording the judgment. Mark: concern, with a change if you want strict WAY-56.
- simulation-isolation uses the lists "a global object that the browser or Node.js adds to those of the JavaScript language". Those lists come from outside standards and versions (the check holds LANGUAGE_GLOBALS with `Float16Array`, `Iterator`, `DisposableStack`, i.e. Node-version-dependent, and HOST_GLOBALS). Template: a condition in a document the product neither writes nor pins stands in the sentence and the fact is named in *Rests on*. It says `Rests on: none`. Concern.

**A9 (cut) Duplicated code in the checks.**
Four near-identical JavaScript lexers: `split_source` in test_simulation_randomness.py:67-165, `segments` in test_simulation_isolation.py:111-214, `without_comments` in test_content_identifiers.py:68-151 (same REGEX_AFTER tables). The same 25-line `drive()` + DRIVER is pasted in about ten files (action_in_progress, exploring_reveal, move_reach, program_rule_pick, walk_target, player_map_run_pace, restart_seed, map_run_repeatability, simulation_randomness...). Change: one `lex` helper and one `drive_game(steps)` helper in loop2_invariant_support.py (cut ~500 lines; the support module's stated rule "nothing here computes a value a check expects" is kept). Cost of leaving: any lexer fix has to be made four times; a divergence silently weakens one check.

**A10 (concern only) WAY-69: what the checks compute.**
- walk-target computes the expected nearest tile by an independent Dijkstra over the run's tiles (test_walk_target.py:153-167, 205-223); program-rule-pick computes `expected` from the run (`can_go`, lines 165-185). These are reference implementations of the code under test. Short written-out scenarios exist in program-rule-pick, none in walk-target. Suggest one written-out small case for walk-target.
- content-identifiers and map-run-tiles read their expected values (identifiers, stock per tile) at run time from the data files the sentences are about; WAY-69's own *violates* example is "reads the value it expects, at run time, from the file its invariant is about". Both sentences defer to the data by wording, so the reading is defensible; there is no hard-coded sample (e.g. `forest` has stick stock N).
- map-run-tiles hard-codes SINGLE_TILE_TIMES (test_map_run_tiles.py:52) and asserts that those real times give "exactly one tile". That depends on the current seed mixing and generator; changing either (allowed by every invariant) fails the check though the sentence still holds. Change: re-derive the control or drop that third test.

**A11 (concern only) Checks that test more than the sentence.**
- move-reach adds "the character's tile changes only at the end of a move" (test_move_reach.py:139-143); the sentence says only where a move ends.
- icon-file-content flags malformed XML, `src`, `xml:base`, `@import`, DOCTYPE; sentence: script/foreignObject, `on*`, "reference to anything outside the file". Malformed XML is in no sentence.
- player-map-run-pace relies on carry-over of fractions across inputs (333.5 + 666.5 -> minute 8). The sentence "for each whole real second passed" can be read per input; the reading is only in the docstring. Put "in total" into the sentence or drop the fractional rows.
- restart-seed's control asserts two sends with the same real time give different seeds (CONTROL_STEPS), which is D-12's "new seed" rule that Verification lists as level 2.
- action-in-progress asserts the next activity follows the changed program; map-run-repeatability test 2 asserts restart replays the run; both are covered by other sentences (D-10 second sentence, restart-seed).

**A12 (concern only) Part fields and the part map.**
- map-run-repeatability and simulation-randomness name `Part: every`; the other nine simulation checks name `simulation`. All run the same build. If `every` is deliberate (build-tools, browser-view or the server can change repeatability), then the others also depend on build-tools (`scripts/build.mjs` changes dist/public/sim); if not, `simulation` fits.
- part_map.md: `account-server` and `build-tools` now depend on `simulation`. No server file imports a sim file (grep of src/server); the server "depends on" browser-view the same way (built output). Convention-consistent, but weaker than "from the dependency graph".

**A13 (concern only) Overlapping settlements between decisions.**
D-14 sentence 1 (dimensions, entrance, move cost, resources "stand in the map's data") restates D-08 for maps; D-14 *Relations* names D-12 only. Three decisions (D-10, D-13, D-15) each say when the program picks a rule again. Cheapest: add D-08 and D-13 to the relations or cut the repeated halves.

**A14 (change) Task references left in the checks.**
Docstrings cite "spec § 4.1, § 4.2, § 4.5, § 2 A2" (test_action_in_progress.py:13,22,59; test_map_run_repeatability.py:46; test_simulation_randomness.py:216). No such document is in the tree. After merge these are dangling; the *Origin* fields point into the vault the same way (acceptable for Origin). Change: replace with the data file or invariant the line refers to.

**A15 (concern only) Duplicate coverage.**
tests/sim/purity.test.mjs (75 lines) and tests/view/icons.test.mjs (163 lines) cover the same ground as simulation-inputs/isolation and icon-file-content/credits (about 1,800 lines). WAY-120 question 4: the invariant checks could be the thin ones. Outside the diff you asked about, so noted only.

**A16 (concern only) "trip plan".**
`program` definition holds "a trip plan" (glossary.md:31); nothing else in the foundation, code or tests mentions it. Existing line, but `program rule` now depends on this entry.

**A17 (concern only) D-11 Rationale.**
"the pace at which the predecessor game, loop, runs" is a claim about another product, unsourced in the entry; Origin points into the vault. Not checkable by me; I did not read the vault.

## Checks that find no concern

- Entry form: every new decision has all fields in template order; *Approved by* placeholder as stated; *Rationale for change* used for versions 2+ (D-03/2, D-04/3, D-06/3), *Rationale* for version 1.
- Level-1 lists vs *Derives from*: every invariant named in a decision's *Verification* names that decision in *Derives from*, and every new invariant is named by its decision (D-04: 2; D-06: 3; D-08:1; D-10:1; D-11:1; D-12:3; D-13:1; D-14:1; D-15:2; D-16:1; D-17:2).
- Invariant entries: all five fields present; versions /1; each check cites `invariant: id/1` on every test method including controls; no branch names; no gate values.
- Identifier space: no identifier shared across invariants, facts, parts; no glossary term reads as an identifier with hyphens read as spaces.
- Glossary: alphabetical, fields present, no process words defined again.
- Part map: every new file is claimed by one part; `assets/icons/**` as trust boundary and the `game-icons.net` external row agree with D-17.
- D-03/2 and D-06/3 as version bumps with the stated kinds ("unchanged sentences") are consistent with the template.
- Controls: each check has controls that can fail (checked by reading; none was run).

## Nothing-to-cut statement

Not true here: the entries listed under A1, A6 (*Rests on*), A9 can be cut as stated; the rest need rewording or a recorded judgment.
