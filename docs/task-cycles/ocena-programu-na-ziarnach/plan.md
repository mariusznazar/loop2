# Plan — Ocena programu na dwunastu stałych ziarnach mapy przed puszczeniem pętli, z wynikiem ziarno po ziarnie

- Task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`
- Spec: none
- Base: c36e2739883002af2b959b787eb0880b748fd7e5

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| (new) — How does the game judge a program before an earning loop? — with its *Relations* and *Verification*, which the definition leaves `TODO`, and the sentences of rows 1, 2 and 3 | decision (new) | projected entry of the definition carried in *Decisions in play* ("Realized by 2", "Written by 2"); rows 1, 2, 3 | Slice 3, Slice 7, Slice 10, Slice 11 |
| What the game remembers of a judging and when a program has the badge | decision (new) | row 4 | Slice 4, Slice 6, Slice 7, Slice 10 |
| D-243 — How does the player start an earning loop? | decision (change of its sentence) | row 5 | Slice 11, Slice 12 |
| D-329 — What stands at each character in the section „Kto idzie”, and in what order? | decision (change of its sentence) | row 6 | Slice 10 |
| D-325 — What does the screen Mapy show? | decision (change of its sentence) | row 7 | Slice 10 |
| D-241 — How does the game state hold earning loops? | decision (change of its sentence) | row 8 | Slice 5, Slice 6 |
| D-246 — What does the player read after being away? | decision (change of its sentence) | row 9 | Slice 13 |
| D-22 — Where does the simulation's randomness come from? | decision (a sentence added) | row 10 | Slice 3 |
| D-190 — What does a character's death take? — the sentence of its *Rationale* that says the game has no sweeping over many seeds | decision (rationale corrected, in the wording task 24 left) | row 11 | none |
| judging | glossary term (new) | row 12 | Slice 3, Slice 7 |
| loop record | glossary term (new) | row 13 | Slice 5, Slice 13 |

Every changed decision keeps word for word each passage of it that a test quotes in a line
`decision:`, taking its change as a sentence of its own or as words after the quoted passage, where
the new meaning allows it; a quoted passage the new meaning makes untrue is changed, and the slice
that changes the test file holding the quotation makes the quotation follow (Slices 5, 11 and 12
name theirs). The part map's entry of `test-helpers` follows in Slice 2, which adds its file; the
styleguide follows in Slice 9. No invariant is written.

## Slices

### Slice 1 — the local start's test takes a port that cannot collide

- **Goal:** the case `test_a_start_on_its_way_up_is_not_taken_for_ended` of
  `tests/invariants/test_local_start_access.py` no longer fails at random with
  `Error: listen EADDRINUSE: address already in use 127.0.0.1:<port>`: find from the test and from
  `scripts/local-start.mjs` where the port of the collision comes from and how two starts can meet
  on it, and make the test take its ports so that no collision can happen — a port the system
  names free at the moment of the start, as D-49 gives for the tests that start a server — without
  changing what any case of the file checks (no control case and no expected value changes,
  `guidelines/testing.md`, "Changing an existing test"). State in the report, for the request, where
  the collision came from. If the fix needs a change of `scripts/local-start.mjs` (a trust boundary
  of `build-tools`) rather than of the test, change nothing there and return with the cause and the
  change it would need. The register `tests/flaky-tests.md` holds no entry of this case, so nothing
  is removed from it. No file of the game changes.
- **Change:** `tests/invariants/test_local_start_access.py`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:52-52` To do ·
  `guidelines/coding.md` · `guidelines/testing.md` · `foundations/decisions.md:1167-1181` D-49 ·
  `foundations/decisions.md:1697-1709` D-431 · `foundations/decisions.md:1280-1306` D-256 ·
  `foundations/decisions.md:1148-1162` D-432 · `foundations/invariants.md:1188-1197`
  local-start-access · `foundations/part_map.md:90-125` build-tools · `scripts/local-start.mjs` ·
  `tests/invariants/loop2_invariant_support.py` · `tests/flaky-tests.md`
- **Model:** same — the cause of a collision that shows only at random in CI has to be found by
  diagnosis before the fix, which no pattern gives.
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_local_start_access.py`; the case alone run several
  times in a row with `python -B -m unittest` from `tests/invariants`, as a diagnosis of the
  collision (`guidelines/testing.md`, "Flaky tests"), with each run's result in the report.
- **Depends on:** none

### Slice 2 — one cutting of source text in the part test-helpers

- **Goal:** the four copies of the code that cuts TypeScript and JavaScript source into code,
  comments, strings, template text and regular expressions — `segments`, `without_comments` and
  `code_only` in `tests/invariants/test_simulation_isolation.py`; `split_source` in
  `tests/invariants/test_simulation_randomness.py`; `without_comments` in
  `tests/invariants/test_content_identifiers.py`; `segments`, `code_only` and `string_values` in
  `tests/invariants/balance_source_scan.py`, each with `REGEX_AFTER` and `REGEX_AFTER_WORDS` —
  become one code in a new file of the part `test-helpers`, `tests/invariants/source_lexer.py`,
  and none of the four files keeps a cutting of its own. The shared code gives each of the five
  tests that use a copy today (`test_simulation_isolation.py`, `test_simulation_randomness.py`,
  `test_content_identifiers.py`, and through `balance_source_scan.py`
  `test_balance_instrument_file_writes.py` and `test_balance_instrument_repeatability.py`) what its
  copy gives it today or more — `split_source` takes the escape off a string, `string_values` gives
  a string raw, and the `without_comments` of `test_content_identifiers.py` leaves the strings in
  the text — so no test stops seeing a form it sees today; where one sees more, the report says
  which and what, for the request. No control case and no expected value of the five tests changes
  (`guidelines/testing.md`, "Changing an existing test"). The cuttings of another shape stay as they
  are (task, *Context*: `code_only` of `test_browser_view_framework.py`, `literal_texts` and the CSS
  cutting of `test_browser_view_token_values.py`, `script_tokens` of `test_cross_part_imports.py`,
  `scan_to` of `test_design_token_sources.py`, `splitSource` of `tests/sim/rules.test.mjs`). The
  part map follows through the project skill `the-way-update-part-map` (read as the file named in
  *Read*): the description of `test-helpers` says it also cuts source text, and its *Files* list the
  new file. No file of the game changes.
- **Change:** `tests/invariants/source_lexer.py` · `tests/invariants/test_simulation_isolation.py` ·
  `tests/invariants/test_simulation_randomness.py` · `tests/invariants/test_content_identifiers.py` ·
  `tests/invariants/balance_source_scan.py` · `foundations/part_map.md`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:51-51` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:164-168` Context ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:237-241` Out of scope ·
  `guidelines/coding.md` · `guidelines/testing.md` · `foundations/part_map.md:204-212` test-helpers ·
  `foundations/part_map.md:33-64` simulation · `foundations/part_map.md:127-137` balance-tools ·
  `foundations/decisions.md:704-753` D-351 · `foundations/invariants.md:1248-1257`
  cross-part-imports · `foundations/invariants.md:214-225` simulation-isolation ·
  `foundations/invariants.md:176-186` simulation-randomness · `foundations/invariants.md:236-247`
  content-identifiers · `foundations/invariants.md:1448-1457` balance-instrument-file-writes ·
  `foundations/invariants.md:1458-1467` balance-instrument-repeatability ·
  `.the-way/elements/part-map/skill/SKILL.md` ·
  `tests/invariants/test_balance_instrument_file_writes.py` ·
  `tests/invariants/test_balance_instrument_repeatability.py` ·
  `tests/invariants/loop2_invariant_support.py`
- **Model:** same — four copies that differ in details have to become one code without any of five
  tests seeing less, which needs a careful comparison rather than a pattern.
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/invariants/test_simulation_randomness.py` ·
  `npm test -- tests/invariants/test_content_identifiers.py` ·
  `npm test -- tests/invariants/test_balance_instrument_file_writes.py` ·
  `npm test -- tests/invariants/test_balance_instrument_repeatability.py` ·
  `npm test -- tests/invariants/test_cross_part_imports.py` ·
  `python -B .the-way/elements/common/foundation_check.py` (the new file claimed by
  `test-helpers`).
- **Depends on:** none

### Slice 3 — the simulation judges a program on the twelve seeds

- **Goal:** the game's data holds, in `src/browser/sim/data/balance.ts` beside each other, the cap
  of game minutes of a judging, 4000, and its twelve seeds, the numbers 1 to 12. `types.ts` holds the
  result of one seed — solved; a death with its cause (`DeathCause`) and game minute; undecided — and
  the result of a judging: the twelve results in the order of the seeds and what the judging took
  from the chest on entry. A new module `src/browser/sim/judging.ts` exports a pure function that
  judges the program of the player's list numbered by its argument, for a character of the team, on
  a map the player may enter (`canSendMap`): for each seed it starts a map run of that map from that
  seed with the character's skills and traits as they stand, the program reduced to the
  character's repertoire as an earning loop's map run reduces it (`programOf`, as `beginRun` in
  `loop.ts` calls it), and a backpack of the take list clipped by what lies in the chest, the
  character's carrying capacity and the map's entry cap, taking nothing (`sendTake`); all twelve
  start with the same equipment. Each map run passes game minute by game minute (`stepMinute`) until
  it ends or reaches the cap; a map run that solves the map or dies exactly in the game minute of the
  cap counts as solved or as a death, and only one still going in that minute is undecided — as
  `runOnce` in `balance/engine.mjs` stops a run. The function changes nothing it is given (D-04,
  `simulation-inputs`), draws no seed, discovers nothing and writes no rule into any program (D-249
  as for an earning loop; task Q9), touches no chest, character, program, manual map run or earning
  loop, and reads no clock. A character in an earning loop or in the manual map run can be judged.
  It refuses a character, program or map it cannot judge in the way the simulation refuses such
  arguments elsewhere. The failing test comes first, in a new file `tests/sim/judging.test.mjs`,
  with expected values from the foundation and from relations the code does not compute
  (`guidelines/testing.md`, "Where the expected value comes from"): the state equal before and after,
  the twelve seeds of the data, the cap's edge, a death's cause and minute, the clipped equipment
  with the chest untouched. `game.ts` does not grow: the judging lives in its own module (D-425,
  `game.ts` stands at about 725 lines of code of 800).
- **Change:** `src/browser/sim/data/balance.ts` · `src/browser/sim/types.ts` ·
  `src/browser/sim/judging.ts` · `tests/sim/judging.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:31-33` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:77-89` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:108-112` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:145-149` Context ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:154-155` Context ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:223-225` Settlements to record ·
  Foundation entries row 1 · Foundation entries row 8 · Foundation entries row 10 ·
  `foundations/decisions.md:5469-5512` D-22 · `foundations/decisions.md:290-315` D-18 ·
  `foundations/decisions.md:253-289` D-07 · `foundations/decisions.md:8977-9004` D-249 ·
  `foundations/decisions.md:8368-8383` D-179 · `foundations/decisions.md:8550-8570` D-189 ·
  `foundations/decisions.md:8651-8689` D-241 · `foundations/invariants.md:165-175`
  map-run-repeatability · `foundations/invariants.md:176-186` simulation-randomness ·
  `foundations/invariants.md:214-225` simulation-isolation · `foundations/invariants.md:226-235`
  simulation-inputs · `foundations/invariants.md:978-987` trip-transfer ·
  `foundations/invariants.md:1178-1187` loop-run-knowledge · `foundations/glossary.md:18-24` map
  run · `foundations/glossary.md:142-147` completion · `foundations/part_map.md:33-64` simulation ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-content-data.md` · `guidelines/testing.md` · `src/browser/sim/run.ts` ·
  `src/browser/sim/trip.ts` · `src/browser/sim/loop.ts:57-89` · `src/browser/sim/game.ts:140-200` ·
  `balance/engine.mjs:200-257` · `tests/sim/reference-programs.mjs` ·
  `tests/sim/program-fixture.mjs`
- **Model:** same — raised from `cheaper` by the orchestrator: the judging is the core function every later slice stands on, and it has to equal the earning loop's map run in what it takes and leaves (a wrong reading is found only by the later slices); reason recorded in the cycle's questions table
- **Risk:** none
- **Checks:** `npm test -- tests/sim/judging.test.mjs` (written first, failing) ·
  `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/random.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/invariants/test_simulation_randomness.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py`
- **Depends on:** Foundation entries row 1 · row 8 · row 10

### Slice 4 — the game state holds the remembered judgings and the save carries them

- **Goal:** `GameState` holds the last judging of each triple of a character, a program and a map,
  as the decision of Foundation entries row 2 gives: the twelve results of the seeds, each solved, a
  death or undecided, with no cause and no minute, and what the judging took from the chest on
  entry; a new game holds none (`newGame` in `game.ts`, the only change there). The save writes them
  and the load reads them strictly (`guidelines/coding-saved-game.md`): it refuses as `shape` a
  remembered judging that names a character, a program or a map the game state or the data does
  not hold (D-56, D-165, D-206), holds other than twelve results or a result of another kind, an
  item the data lacks or a count that is no safe integer from 1, a missing or foreign key, and
  throws for no value a document can hold. The cap of the data and the map's data are not compared:
  their change erases no remembered judging (task, *To do* 6). The version is not raised here:
  Slice 6 raises it together with the document of `tests/sim/saved-game.test.mjs`, which until then
  is refused as of another shape (`guidelines/coding-saved-game.md`, "Wersja podnoszona razem z
  kształtem"); that file is not run here. The failing tests come first, in a new file
  `tests/sim/saved-game-judgings.test.mjs`: a game state with remembered judgings goes through the
  save and the load whole, and crafted documents of the current version, built from such a save and
  changed at one place, are refused whole as `shape` without a throw. `game.ts` takes one line; the
  rest stands in `saved-game.ts` (D-425 excepts that file whole).
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/game.ts` ·
  `src/browser/sim/saved-game.ts` · `tests/sim/saved-game-judgings.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:36-36` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:63-71` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:158-159` Context ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:226-226` Settlements to record ·
  Foundation entries row 1 · Foundation entries row 2 · `foundations/decisions.md:3889-3933` D-206
  · `foundations/decisions.md:4232-4248` D-386 · `foundations/decisions.md:659-703` D-213 ·
  `foundations/decisions.md:8111-8127` D-165 · `foundations/decisions.md:6083-6108` D-56 ·
  `foundations/decisions.md:825-843` D-425 · `foundations/invariants.md:1048-1057` save-version ·
  `foundations/invariants.md:226-235` simulation-inputs · `foundations/part_map.md:33-64`
  simulation · `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md` ·
  `tests/sim/saved-game.test.mjs:1-120`
- **Model:** same — the strict load at a trust boundary must refuse every crafted form of the new
  record and admit every one the game makes (D-386).
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/saved-game-judgings.test.mjs` (written first, failing) ·
  `npm test -- tests/sim/judging.test.mjs` · `npm test -- tests/sim/previous-programs.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_inputs.py`
- **Depends on:** Slice 3 · Foundation entries row 2

### Slice 5 — an earning loop counts its loop record, and the save carries it

- **Goal:** each earning loop holds, as the change of D-241 (Foundation entries row 6) gives, the
  run of successive completed map runs without a death since its start and the longest such run:
  both 0 at the start of the earning loop; a completion adds one to the run and raises the longest
  to it where it is greater; a death covered by the resurrection and the death of a character with
  no practice, after which the earning loop goes on (D-190), start the run anew; a stop ends the
  counting, and the counts go with the earning loop. The counting stands where `takeEnd` of
  `loop.ts` deals with an end, so the open game and the catch-up count alike. The save writes both
  counts and the load reads them strictly: whole numbers from 0, the run not above the longest, a
  missing or foreign key refused as `shape`; the version is not raised here (Slice 6). The failing
  tests come first, in a new file `tests/sim/loop-record.test.mjs`, the save's part of them built
  from a save of a game state as Slice 4's `tests/sim/saved-game-judgings.test.mjs` builds its
  documents; `tests/sim/loop.test.mjs` follows where it lists the keys of an earning loop (its case
  "the first map run of an earning loop goes on the program of its row …") and where a line
  `decision:` of it quotes a passage of D-241 or D-243 the Foundation entries changed; no other case
  of it changes. `tests/sim/saved-game.test.mjs` is not run here; it waits for Slice 6.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/loop.ts` ·
  `src/browser/sim/saved-game.ts` · `tests/sim/loop.test.mjs` · `tests/sim/loop-record.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:37-37` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:95-101` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:157-158` Context ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:230-230` Settlements to record ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:235-235` Settlements to record ·
  Foundation entries row 6 · Foundation entries row 11 · Foundation entries row 3 ·
  `foundations/decisions.md:8651-8689` D-241 · `foundations/decisions.md:6210-6242` D-190 ·
  `foundations/decisions.md:6389-6426` D-221 · `foundations/decisions.md:8620-8650` D-240 ·
  `foundations/decisions.md:8791-8828` D-245 · `foundations/decisions.md:3889-3933` D-206 ·
  `foundations/decisions.md:4232-4248` D-386 · `foundations/invariants.md:1048-1057` save-version
  · `foundations/invariants.md:1148-1157` catch-up-state · `foundations/invariants.md:1328-1337`
  loop-practice-payment · `foundations/invariants.md:1078-1087` death-settled-once ·
  `foundations/glossary.md:223-228` earning loop · `foundations/glossary.md:142-147` completion ·
  `foundations/glossary.md:211-216` resurrection · `guidelines/coding.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/coding-saved-game.md` ·
  `guidelines/testing.md` · `tests/sim/saved-game.test.mjs:1-120`
- **Model:** cheaper
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/loop-record.test.mjs` (written first, failing) ·
  `npm test -- tests/sim/loop.test.mjs` · `npm test -- tests/sim/catch-up.test.mjs` ·
  `npm test -- tests/sim/saved-game-judgings.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_inputs.py`
- **Depends on:** Slice 4 · Foundation entries row 6

### Slice 6 — the saved document of the new version, and the room the judgings take

- **Goal:** `SAVED_GAME_VERSION` rises by one, once, for both changes of the shape (Slices 4 and
  5), together with the document of `tests/sim/saved-game.test.mjs`
  (`guidelines/coding-saved-game.md`, "Wersja podnoszona razem z kształtem"): the document of the
  current version is rewritten in the new shape and fills each new branch — remembered judgings of
  more than one character, program and map, with a take list and each kind of result, and an
  earning loop whose two counts stand above 0 with the run below the longest — and loads into the
  game state it describes; the document of the version before is kept and refused as another
  version, as the documents before it are; the cases of the trust boundary that file holds
  (`guidelines/testing.md`, "Trust boundaries", the row of `src/browser/sim/saved-game.ts`) reach
  the new places through the document, and a crafted remembered judging and crafted counts are
  refused whole as `shape`. Then the room: with a script in the directory for working copies the
  handoff names (removed before return), measure the length of the saved document of a game state
  with remembered judgings for every triple of 5 characters, 20 programs and 3 maps, and of 5, 20
  and 10 maps, against the limit of 64 KiB (65 536, D-104, D-207); write in the report the bytes of
  one remembered judging, the totals and the share of the limit, for the request. The measure changes
  no code; where it shows the limit within reach, the report says so as a finding.
- **Change:** `src/browser/sim/saved-game.ts` · `tests/sim/saved-game.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:36-37` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:158-159` Context ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:226-226` Settlements to record ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:230-230` Settlements to record ·
  Foundation entries row 2 · Foundation entries row 6 · `foundations/decisions.md:3889-3933` D-206
  · `foundations/decisions.md:659-703` D-213 · `foundations/decisions.md:4232-4248` D-386 ·
  `foundations/decisions.md:3934-4013` D-207 · `foundations/decisions.md:2707-2729` D-104 ·
  `foundations/invariants.md:1048-1057` save-version · `guidelines/coding.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md` · `src/browser/sim/types.ts`
- **Model:** cheaper
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/saved-game.test.mjs` · `npm test -- tests/sim/previous-programs.test.mjs`
  · `npm test -- tests/sim/saved-game-judgings.test.mjs` ·
  `npm test -- tests/sim/loop-record.test.mjs` · the measuring script, by its command in the report.
- **Depends on:** Slice 4 · Slice 5

### Slice 7 — judging as an act of the player, the mark at the list, and what erases a remembered judging

- **Goal:** `src/browser/sim/judging.ts` gains the act of a judging: one call of the simulation
  that judges as Slice 3's function does and gives back the twelve results with cause and minute and
  the game state in which that judging replaces the remembered one of its triple, nothing else
  changing — not the pick of the list „Program:”, the program used last or the one a character last
  entered a map with (D-170, D-243: a judging is no send), not the last seed, the chest or anything
  of a character. A new module `src/browser/sim/judging-record.ts`, which imports neither `game.ts`
  nor `judging.ts` so that both may import it, holds the remembered judgings' pure functions: the
  mark of a program at a character on a map — the count solved, whether all twelve, and whether the
  chest still holds each item at the count the judging took (more in the chest leaves the mark as it
  is; less makes the note stand and the badge go) — and the erasing. A save of a program whose rules,
  groups with their order, or trip plan come out different erases its remembered judgings, wherever
  the simulation writes new content into a program of the list (`setProgram` in `game.ts`, and in
  `programs.ts` each function that saves content into a listed program, the copy's save included); a
  rename erases nothing; deleting a program removes its remembered judgings. A death that takes the
  character's practice and ranks because no use of the resurrection is left (`progressLost`) erases
  all remembered judgings of that character, on every map, in a manual map run (`settleDeath`) and in
  an earning loop (`takeEnd` of `loop.ts`, so the catch-up too); a covered death, a death of a
  character with no practice and a bought rank erase nothing. The failing tests come first, in a new
  file `tests/sim/judging-record.test.mjs`. `game.ts` stays under 800 lines of code (D-425): what
  it calls stands in `judging-record.ts`. Read `src/browser/sim/judging.ts`, which Slice 3 wrote.
- **Change:** `src/browser/sim/judging.ts` · `src/browser/sim/judging-record.ts` ·
  `src/browser/sim/game.ts` · `src/browser/sim/programs.ts` · `src/browser/sim/loop.ts` ·
  `tests/sim/judging-record.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:32-36` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:63-71` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:119-124` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:223-226` Settlements to record ·
  Foundation entries row 1 · Foundation entries row 2 · `foundations/decisions.md:8111-8127` D-165
  · `foundations/decisions.md:8151-8169` D-167 · `foundations/decisions.md:8170-8186` D-168 ·
  `foundations/decisions.md:8204-8221` D-170 · `foundations/decisions.md:8741-8768` D-243 ·
  `foundations/decisions.md:6210-6242` D-190 · `foundations/decisions.md:6389-6426` D-221 ·
  `foundations/decisions.md:9032-9046` D-409 · `foundations/decisions.md:825-843` D-425 ·
  `foundations/invariants.md:226-235` simulation-inputs · `foundations/invariants.md:1078-1087`
  death-settled-once · `foundations/invariants.md:1178-1187` loop-run-knowledge ·
  `foundations/glossary.md:25-31` program · `foundations/glossary.md:180-185` copy ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/trip.ts`
- **Model:** same — raised from `cheaper` by the orchestrator: the erasing has to be hooked into every place the simulation writes content into a listed program and into both death settlements; a missed place is found only by a reviewer; reason recorded in the cycle's questions table
- **Risk:** none
- **Checks:** `npm test -- tests/sim/judging-record.test.mjs` (written first, failing) ·
  `npm test -- tests/sim/judging.test.mjs` · `npm test -- tests/sim/death.test.mjs` ·
  `npm test -- tests/sim/loop.test.mjs` · `npm test -- tests/sim/catch-up.test.mjs` ·
  `npm test -- tests/sim/program-list.test.mjs` · `npm test -- tests/sim/copy.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_saved_program_edit.py`
- **Depends on:** Slice 3 · Slice 4 · Slice 5 · Foundation entries row 2

### Slice 8 — the balance instrument takes its default cap from the built game

- **Goal:** `DEFAULT_CAP_MINUTES` of `balance/engine.mjs` is the cap of a judging that Slice 3 put
  into the game's data, read from the built game (`dist/browser/sim/data/balance.js`), in place of the
  instrument's own 4000 (`guidelines/coding-balance-instrument.md`, "Liczba gry" and "Jedno
  miejsce wspólnej rzeczy"); `balance/trace.mjs` and `balance/campaign.mjs` go on importing it from
  the engine, unchanged. The file's opening comment stays true. The instrument's tests pass as they
  are; a test of `tests/balance/engine.test.mjs` that the change makes untrue follows only with its
  reason (`guidelines/testing.md`, "Changing an existing test").
- **Change:** `balance/engine.mjs` · `tests/balance/engine.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:50-50` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:125-127` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:147-149` Context ·
  `foundations/decisions.md:889-903` D-437 · `foundations/decisions.md:11664-11678` D-427 ·
  `foundations/decisions.md:11679-11695` D-428 · `foundations/decisions.md:290-315` D-18 ·
  `foundations/invariants.md:1438-1447` instrument-game-agreement ·
  `foundations/invariants.md:1458-1467` balance-instrument-repeatability ·
  `foundations/part_map.md:127-137` balance-tools · `guidelines/coding.md` ·
  `guidelines/coding-balance-instrument.md` · `guidelines/testing.md` · `balance/trace.mjs` ·
  `balance/campaign.mjs:1-140` · `src/browser/sim/data/balance.ts` ·
  `tests/balance/agreement.test.mjs` · `tests/balance/cli.test.mjs:100-140`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/balance/engine.test.mjs` · `npm test -- tests/balance/agreement.test.mjs`
  · `npm test -- tests/balance/trace.test.mjs` · `npm test -- tests/balance/campaign.test.mjs` ·
  `npm test -- tests/balance/cli.test.mjs` ·
  `npm test -- tests/invariants/test_balance_instrument_repeatability.py` ·
  `npm test -- tests/invariants/test_cross_part_imports.py`
- **Depends on:** Slice 3

### Slice 9 — the styleguide gives the roles of the judging on the screen Mapy

- **Goal:** `guidelines/styleguide-browser-view.md` follows the change through the project skill
  `the-way-maintain-styleguide` (read as the file named in *Read*, in its orchestrated mode, asking
  no human): the rule "The screen Mapy", or a new rule beside it, gives the roles of the parts of a
  judging — the heading of the result in `text-strong`, a solved row in `positive`, a row of a death
  in `danger`, an undecided row in `warning`, the sentence under the rows in `text-secondary`, the
  badge „szczelny: 12 z 12” in `positive`, „{n} z 12” in `text`, the note of the stock in `warning`
  as the warning of D-251 stood (task 24 withdrew D-251, so the rule names it as no decision it rests
  on), the sentence before the second click of „Puść w pętlę” in
  `warning`; the button of a judging and „Puść w pętlę”, also as „Puść mimo to”, are plain shared
  buttons — and the rule's *Decision* names the new decisions and the changed ones it rests on. The
  rule "States of shared controls" gives loading also to the button of a judging, disabled with
  „Oceniam…” while it computes, though it waits for no server. Every role stands in its meaning of
  the table Roles, so no decision of a role changes and the table stays; the kitchen-sink page needs
  no new sample, since the plain button's loading state stands there.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:38-45` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:49-49` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:102-107` Questions to settle ·
  Foundation entries row 1 · Foundation entries row 2 · Foundation entries row 3 · Foundation
  entries row 4 · `.the-way/product-guidelines/styleguide/SKILL.md` ·
  `foundations/decisions.md:4895-4909` D-38 · `foundations/decisions.md:4910-4930` D-39 ·
  `foundations/decisions.md:4931-4947` D-40 · `foundations/decisions.md:4993-5009` D-44 ·
  `foundations/decisions.md:5237-5282` D-274 · `foundations/decisions.md:9819-9837` D-326 ·
  `foundations/part_map.md:3-31` browser-view · `foundations/part_map.md:139-157` agent-workflow
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` (the form of the guidelines
  and the decisions their rules name).
- **Depends on:** Foundation entries row 1 · row 2 · row 3 · row 4

### Slice 10 — the button of a judging and its result in „Kto idzie”

- **Goal:** at each character of „Kto idzie”, on each map of the list — solved or not, beside
  „Wejdź” — stands the plain shared button „Oceń na 12 ziarnach”, active also at a character in an
  earning loop or in the manual map run, going, waiting or ended (D-287 leaves it active). Its click
  draws the button disabled with „Oceniam…” first, and only then makes one call of Slice 7's act of
  a judging through the store of the game state, whose `act` catches up time before it (D-409), with
  the program the character's list „Program:” shows and the map of the card; the pick and the
  program used last stay (D-170). The result unfolds under that character: „Ocena na 12 ziarnach:
  {n} z 12 rozwiązanych”, the twelve rows „Ziarno {i}: rozwiązane”, „Ziarno {i}: mag zamarzł w {m}.
  minucie”, „Ziarno {i}: mag umarł z głodu w {m}. minucie”, „Ziarno {i}: mag zginął w walce w {m}.
  minucie”, „Ziarno {i}: bez rozstrzygnięcia po {pułap} minutach” ({pułap} from the game's data) and
  under them „Ocena nic nie kosztuje: nie bierze ze skrzynki, nic nie płaci, a śmierć w niej nie
  zabiera wprawy ani wskrzeszenia.”, in the roles the styleguide gives (Slice 9); the result lives
  only in the screen's own state (D-407), and stands until another program is picked on that
  character's list, a new judging, or the player leaves the card — another map of the list, another
  screen, a reload. At the list „Program:” stands the mark of the remembered judging of the program
  the list shows (Slice 7's mark): „szczelny: 12 z 12”, or „{n} z 12”, with „oceniono z zapasem,
  którego dziś nie ma w skrzynce” where the chest lacks what the judging took, then with no badge,
  „12 z 12” standing with the note; no mark where that program has no remembered judging, and none
  on other screens. The texts stand in a pure module `src/browser/view/judging-lines.ts`, the result
  under the character in `src/browser/view/judging-result.tsx`, its look in
  `src/browser/maps-screen.css` through tokens; names of maps and items come from the data
  (`content-identifiers`). The focus does not fall to the page when the button turns disabled and
  back (styleguide, "Focus does not fall to the page"). „Puść w pętlę” is not changed here (Slice
  11). The failing tests come first: `tests/view/judging-lines.test.mjs` for the texts and cases of
  `tests/view/maps-screen.test.mjs` for the button, the waiting state drawn before the result, the
  result's life and the mark; a case of that file that the new button makes untrue follows only with
  its reason, and a line `decision:` quoting a passage of D-329 or D-325 the Foundation entries
  changed follows the new passage. Read `src/browser/sim/judging.ts` and
  `src/browser/sim/judging-record.ts`, which Slices 3 and 7 wrote.
- **Change:** `src/browser/view/maps-screen.tsx` · `src/browser/view/maps-entry.ts` ·
  `src/browser/view/judging-lines.ts` · `src/browser/view/judging-result.tsx` ·
  `src/browser/maps-screen.css` · `tests/view/maps-screen.test.mjs` ·
  `tests/view/judging-lines.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:33-45` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:56-76` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:155-161` Context ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:223-229` Settlements to record ·
  Foundation entries row 1 · Foundation entries row 2 · Foundation entries row 4 · Foundation
  entries row 5 · `foundations/decisions.md:9885-9905` D-329 · `foundations/decisions.md:9798-9818`
  D-325 · `foundations/decisions.md:8204-8221` D-170 · `foundations/decisions.md:9032-9046` D-409 ·
  `foundations/decisions.md:4744-4760` D-407 · `foundations/decisions.md:3934-4013` D-207 ·
  `foundations/decisions.md:6304-6325` D-217 · `foundations/decisions.md:8769-8790` D-244 · `foundations/decisions.md:4993-5009` D-44 ·
  `foundations/decisions.md:10149-10184` D-287 · `foundations/decisions.md:290-315` D-18 ·
  `foundations/invariants.md:236-247` content-identifiers · `foundations/invariants.md:478-487`
  browser-view-token-values · `foundations/part_map.md:3-31` browser-view · `guidelines/coding.md`
  · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `src/browser/view/state-store.ts` ·
  `src/browser/view/trip-lines.ts` · `src/browser/view/now-lines.ts` ·
  `src/browser/view/counted-name.ts` · `src/browser/sim/data/balance.ts`
- **Model:** same — a screen state that draws the waiting button before one synchronous call of the
  simulation, and a result that lives with the card, need care with React's drawing and the focus.
- **Risk:** none
- **Checks:** `npm test -- tests/view/judging-lines.test.mjs` (written first, failing) ·
  `npm test -- tests/view/maps-screen.test.mjs` · `npm test -- tests/view/shared-controls.test.mjs`
  · `npm test -- tests/view/screen-registry.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_framework.py`
- **Depends on:** Slice 7 · Slice 9 · Foundation entries row 4 · row 5

### Slice 11 — „Puść w pętlę” judges the program anew first

- **Goal:** „Puść w pętlę”, at each character of the card of a solved map, first judges the program
  of the list anew through the same act of a judging and the store (Slice 10's way), with what the
  earning loop would get from the chest at that moment, keeping its own text while it computes. With
  all twelve seeds solved the earning loop starts at once, as today (the start counts as a send,
  D-243). Otherwise the result stands under the character, above the button stands „Na {k} z 12
  ziaren program mapy nie rozwiązuje.” in `warning`, the button reads „Puść mimo to”, and only its
  second click starts the earning loop. The new judging replaces the remembered one. Where a result
  with a failure stands already under the character from the button of a judging, „Puść w pętlę”
  judges anew too: a result the same as the one standing — each of the twelve seeds with the same row
  — starts the earning loop at once; a different one replaces it and waits for the second click
  (task Q14). The waiting second click goes with what makes the result go (another program, a new
  judging, leaving the card). „Pętla nic nie zarobi do skrzynki” stays beside the button and the
  button still acts (D-326). The failing tests come first, in `tests/view/maps-screen.test.mjs` and
  `tests/view/judging-lines.test.mjs`; each case of `tests/view/maps-screen.test.mjs` and
  `tests/view/uncaught-failure.test.mjs` that clicks „Puść w pętlę” follows the new behaviour with its
  reason, the change of D-243, and nothing else of it changes; a line `decision:` quoting a passage of
  D-243 the Foundation entries changed follows the new passage.
- **Change:** `src/browser/view/maps-screen.tsx` · `src/browser/view/maps-entry.ts` ·
  `src/browser/view/judging-lines.ts` · `src/browser/view/judging-result.tsx` ·
  `src/browser/maps-screen.css` · `tests/view/maps-screen.test.mjs` ·
  `tests/view/judging-lines.test.mjs` · `tests/view/uncaught-failure.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:34-35` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:44-44` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:56-62` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:113-118` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:227-227` Settlements to record ·
  Foundation entries row 1 · Foundation entries row 3 · `foundations/decisions.md:8741-8768` D-243
  · `foundations/decisions.md:9819-9837` D-326 · `foundations/decisions.md:8590-8619` D-239 ·
  `foundations/decisions.md:8204-8221` D-170 · `foundations/decisions.md:9032-9046` D-409 · `foundations/decisions.md:3934-4013` D-207 ·
  `foundations/part_map.md:3-31` browser-view · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `src/browser/view/state-store.ts`
- **Model:** same — the two clicks, the comparison with a result that stands and what clears the
  waiting second click make a small state machine across clicks and readings of the clock.
- **Risk:** none
- **Checks:** `npm test -- tests/view/maps-screen.test.mjs` (its new cases written first, failing) ·
  `npm test -- tests/view/judging-lines.test.mjs` · `npm test -- tests/view/uncaught-failure.test.mjs`
  · `npm test -- tests/view/state-store.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py`
- **Depends on:** Slice 10 · Foundation entries row 3

### Slice 12 — the page tests of the account screen follow the judging

- **Goal:** the cases of `tests/view/account-screen.test.mjs` that click „Puść w pętlę” or count the
  controls of a character in „Kto idzie” follow the button of a judging (Slice 10) and the judging
  first of „Puść w pętlę” (Slice 11): a case that expects the earning loop to start at once gives the
  character a program that solves all twelve seeds of the map, or clicks „Puść mimo to”, whichever
  keeps what the case checks, with the change of D-243 as the reason (`guidelines/testing.md`,
  "Changing an existing test"); the saves a case expects follow the save that a judging, a change of
  the game state, makes (D-207); a line `decision:` quoting a passage of D-243, D-329 or D-325 that
  the Foundation entries changed follows the new passage. Nothing else of the file changes. The file
  is about 350 KB: find its cases by search ("Puść w pętlę", "Kto idzie", `whoOf`, `solvedAla`)
  rather than reading it whole.
- **Change:** `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:34-35` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:227-228` Settlements to record ·
  Foundation entries row 3 · Foundation entries row 4 · `foundations/decisions.md:8741-8768` D-243
  · `foundations/decisions.md:3934-4013` D-207 · `guidelines/coding.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md`
- **Model:** same — the cases stand in a file of 350 KB that the agent reaches by search, and each
  change of an existing case needs its reason.
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` ·
  `python -B .the-way/elements/common/foundation_check.py` (the quotations of the tests)
- **Depends on:** Slice 11

### Slice 13 — the loop record in the report „Gdy cię nie było”

- **Goal:** the line of a character in the report „Gdy cię nie było” whose earning loop went on ends
  with „ · najdłużej bez śmierci: {n} przejść z rzędu” in plain text, in the line's own role, with no
  mark and no comparison, the noun declined by `countedName` („1 przejście”, „3 przejścia”, „5
  przejść”); {n} is the longest run of the character's earning loop (Slice 5), read from the earning
  loop whenever the section is drawn, as the practice waiting is (D-246); at 0, on a line an earning
  loop a death stopped holds, and where the character has no earning loop, the line has none. The
  failing tests come first, in `tests/view/away-report.test.mjs`; a line `decision:` quoting a
  passage of D-246 the Foundation entries changed follows the new passage.
- **Change:** `src/browser/view/away-report.ts` · `tests/view/away-report.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:37-37` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:45-45` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:95-101` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:231-231` Settlements to record ·
  Foundation entries row 7 · Foundation entries row 11 · `foundations/decisions.md:8829-8904` D-246
  · `foundations/decisions.md:8651-8689` D-241 · `foundations/part_map.md:3-31` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/counted-name.ts` · `src/browser/view/headquarters.tsx` ·
  `src/browser/sim/types.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/away-report.test.mjs` (its new cases written first, failing) ·
  `npm test -- tests/view/headquarters-screen.test.mjs` · `npm test -- tests/view/counted-name.test.mjs`
- **Depends on:** Slice 5 · Foundation entries row 7

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Required outcome: the judging of a program on twelve fixed seeds before an earning loop, at no cost to the character, read seed by seed; the badge counted on those seeds; the loop record in the report as information | Slices 3–13 · Foundation entries rows 1–13 |
| *To do* 1 — twelve seeds 1–12 and the cap 4000 in the game's data; the cap rule as `runOnce` | Slice 3 |
| *To do* 2 — the judging is no map run of the character; equipment as the loop would get it; nothing discovered | Slice 3 · Slice 7 (the act changes nothing else) |
| *To do* 3 — twelve rows, three kinds, undecided not solved | Slice 3 (results) · Slice 10 (rows) |
| *To do* 4 — the button at each character on every enterable map, the result's life, through the store, „Oceniam…” | Slice 10 · Slice 7 (the act) |
| *To do* 5 — „Puść w pętlę” judges first, the second click, the same-result rule | Slice 11 · Slice 12 |
| *To do* 6 — remembered judgings, the badge and „{n} z 12”, the stock note, erasing on program save, delete and death without resurrection, load refusals, the 64 KiB check | Slice 4 · Slice 6 (version, document, the room measured) · Slice 7 (mark, erasing) · Slice 10 (mark on screen) |
| *To do* 7 — the loop record counted in the earning loop and shown in the report | Slice 5 · Slice 13 |
| *To do* 8 — the texts word for word | Slice 10 · Slice 11 · Slice 13 |
| *To do* 9 — the foundation entries | Foundation entries rows 1–13 |
| *To do* 10 — the styleguide | Slice 9 |
| *To do* 11 — the instrument's default cap from the built game | Slice 8 |
| *To do* 12 — one cutting of source text in `test-helpers`, the part map following | Slice 2 |
| *To do* 13 — the local start's test without a port collision | Slice 1 |
| Row 1 — where a judging may run | Foundation entries row 1 · Slice 10 |
| Row 2 — the equipment of a judging | Foundation entries row 1 · Slice 3 |
| Row 3 — a judging discovers nothing | Foundation entries row 1 · Slice 3 |
| Row 4 — what the game remembers, the badge, the note, the erasing | Foundation entries row 2 · Slices 4, 6, 7, 10 |
| Row 5 — D-243 | Foundation entries row 3 · Slices 11, 12 |
| Row 6 — D-329 | Foundation entries row 4 · Slice 10 |
| Row 7 — D-325 | Foundation entries row 5 · Slice 10 |
| Row 8 — D-241 | Foundation entries row 6 · Slice 5 |
| Row 9 — D-246 | Foundation entries row 7 · Slice 13 |
| Row 10 — D-22 | Foundation entries row 8 · Slice 3 |
| Row 11 — D-190's rationale | Foundation entries row 9 |
| Row 12 — glossary „judging” | Foundation entries row 10 |
| Row 13 — glossary „loop record” | Foundation entries row 11 · Slice 5 |
| Projected entry „(new) — How does the game judge a program before an earning loop?” with *Relations* and *Verification* | Foundation entries row 1 · Slices 3, 7, 10, 11 |
| Orchestrator's remark (b): the room of remembered judgings against 64 KiB | Slice 6 |
| Orchestrator's remark (c): the Python slices apart from the game | Slices 1 and 2, which touch no file of the game |
| Answers of step 4: the trust boundary `src/browser/sim/saved-game.ts` | Slices 4, 5 and 6 marked `trust boundary`; no slice touches `src/browser/sim/previous-programs.ts` |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The judging lives in modules of its own, `src/browser/sim/judging.ts` (running the seeds, the act) and `src/browser/sim/judging-record.ts` (mark, erasing), the second importing neither `game.ts` nor `judging.ts` so that `game.ts`, `programs.ts` and `loop.ts` can call it | the judging in `game.ts` — that file stands at about 725 lines of code of the 800 of D-425, and `judging.ts` imports `game.ts` (`programOf`), so the erasing there would make a cycle of imports | a later move of a few functions between the two modules |
| The cap and the twelve seeds as one entry of `BALANCE` in `src/browser/sim/data/balance.ts` | a data file of their own — a new row in the content-data guidelines' table and one more import for the instrument | a move of two numbers to another file |
| A remembered judging keeps each seed's kind — solved, death, undecided — with no cause and no minute, and the clipped take list | a bare count or a yes/no per seed — the task says "twelve results of the seeds"; the cause and minute — the task keeps them on screen only | a change of the saved shape, one more raise of the version |
| Changed decisions keep word for word each passage a test quotes, adding to it where the new meaning allows | rewriting the quoted sentences — some 20 test files quote D-241, D-246, D-22, D-329 and D-243, and a rewrite breaks their quotations in files no slice otherwise touches | where a writer cannot keep a quoted passage, a test file outside every slice's *Change* needs its quotation changed, found by the foundation check of the gate |
| The new shape of the saved game is made in three slices — remembered judgings (Slice 4), the two counts of the loop record (Slice 5), and one raise of the version with the document of `tests/sim/saved-game.test.mjs` (Slice 6) — so `tests/sim/saved-game.test.mjs` fails from Slice 4 until Slice 6, while Slices 4 and 5 test their load in new files | one slice for the whole shape — with `saved-game.test.mjs` (about 58 000 tokens to read), `game.ts`, `loop.ts` and `loop.test.mjs` it reads about 185 000 tokens, over the limit of 150 000 | a red test file between three consecutive slices, which no slice's check runs; the review of Slice 6 sees the version and the document as the pair the guidelines want |
| The room of the remembered judgings is measured once, by a script in Slice 6's directory for working copies, and reported | a lasting test of a size — no foundation entry sets how many characters, programs and maps a save must hold, so its expected value would have no source (`guidelines/testing.md`, "Where the expected value comes from") | a later growth of the saved shape is not caught by a test, only by the refused save of D-208 |
| The loop record's tests in a new file `tests/sim/loop-record.test.mjs`; `tests/sim/loop.test.mjs` changes only where it lists the keys of an earning loop | the new cases in `tests/sim/loop.test.mjs` — the same edit, no size saved, but its cases on the record spread among those of the loop | none worth naming |
| The cutting of source text in a new file `tests/invariants/source_lexer.py` of `test-helpers`, covered by the control cases of the five tests that use it | inside `tests/invariants/loop2_invariant_support.py` — a file of 1 184 lines that runs commands and reads files; a test file of its own for the lexer — the five tests' control cases already see each form | a later move of the code into the support file |
| The texts of the judging in a pure module `src/browser/view/judging-lines.ts` and its result in `src/browser/view/judging-result.tsx`, both imported by `maps-screen.tsx` | everything in `maps-screen.tsx` — a 466-line file whose `CharacterRow` would grow toward the 200 lines of a function of D-425 | a later move back |
| The result rows and the waiting second click live in the screen's own React state (D-407), cleared by a pick of another program, a new judging or leaving the card | in the game state — the task keeps cause and minute out of the save | none; the task settles it |
| No new sample on the kitchen-sink page | a sample of the button of a judging in its loading state — the plain button's loading state stands there already, and the button is no new control | a reviewer asks for the sample, a small addition |
| The account screen's page tests in a slice of their own (Slice 12) after the two view slices | inside Slice 11 — the file alone counts about 141 000 tokens | none beyond the slice's size, which is a concern of the report |
| The two Python slices first, apart from the game | after the game — no slice of the game depends on them, so the order costs nothing either way | none |
