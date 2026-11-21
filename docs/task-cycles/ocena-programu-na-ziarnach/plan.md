# Plan — Ocena programu na dwunastu stałych ziarnach mapy przed puszczeniem pętli (correction 1: the remembered judgings leave the saved game; remarks 3 and 4)

- Task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`
- Spec: `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md`
- Base: 4e4a104b (the head of `task/ocena-programu-na-ziarnach` with the first run's code; the task branch starts from c36e2739883002af2b959b787eb0880b748fd7e5)

The human's remarks of correction 1 stand in
`.runs/task-cycles/ocena-programu-na-ziarnach/reports/correction-1-remarks.md`: remark 1 (line 3) is
designed by the spec; remark 3 (line 5) and remark 4 (line 6) are planned here; remarks 2 and 5 need no
work.

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| (new) — Where does the game keep the last judging of each character, program and map? (the judgings remembered in the browser's lasting storage, one entry per triple under the account and the game; the kinds of the twelve results, the equipment, the program's content revision and the character's generation; standing only while the program is on the list at that revision and the character on the team at that generation; an unreadable value shows nothing, a refused storage keeps a judging for the open page, a game built after a refused save shows none its browser cached, another device or cleared data none until the next judging; the saved game holds no judging; *Rationale* and *Rejected* from spec Decisions 2–8 and 11; relations to D-440, D-04, D-211, D-07, D-206) | decision (new) | spec, *Foundation entries* (new decision); remark 1 | Slice 4, Slice 5, Slice 6, Slice 8, Slice 9 |
| The content revision of a program (0 when a program is made — created, saved from a copy as new, pulled from a previous save, the first program of a new game — and one higher at each save after which its rules, rule groups with their order or trip plan differ, never at a rename); the foundation step judges whether it is a sentence of D-165, of the new decision or an entry of its own, named apart from the revision of a save (D-209) | decision (new or a sentence of D-165) | spec, *Foundation entries* (content revision); spec Decision 2 | Slice 1, Slice 2, Slice 3, Slice 4 |
| D-440 — What does the game remember of a judging, and what stands beside the list „Program:”? | decision (changed: first paragraph, third paragraph through the revision and the generation, *Rationale*, tests clause) | spec, *Foundation entries* (D-440 changed) | Slice 2, Slice 4, Slice 6, Slice 9, Slice 10 |
| D-04 — What is the game built with? (the view also draws from the judgings remembered in the browser's lasting storage; the game state stores the moment the game was made, which names the game) | decision (changed) | spec, *Foundation entries* (D-04 changed) | Slice 1, Slice 5, Slice 8 |
| D-386 — Which game states does the load of a saved game state admit? (the moment the game was made is a stored moment of any sign; a program's content revision any safe integer from 0) | decision (changed) | spec, *Foundation entries* (D-386 changed) | Slice 1, Slice 2 |
| D-165 — How does the game state tell one program from another? (the judging the browser remembers names its program by its number; and the content revision, if the foundation step places it here) | decision (changed) | spec, *Foundation entries* (D-165 changed) | Slice 1, Slice 4, Slice 9 |
| D-401 — How does an account with the privilege pull the programs of its previous save? (an item of a version-9 save has exactly `id`, `name`, `program` and the content revision, an item of an earlier version the three keys, a pulled program starts at revision 0; the *Rejected* clause on „the items had one shape in every version” corrected); D-209 and D-402 changed the same way where they name those keys | decision (changed) | spec, Decisions 11.1 | Slice 3 |
| D-206 — What happens to a saved game state of another version? (the judgings remembered in the browser are no part of the saved game state, and a game started anew shows none of the discarded game's judgings); the foundation step judges whether D-402 needs the same sentence for „Zacznij od zera” and D-209 the sentence that a game built after a refused save shows none of the judgings its browser cached for it | decision (changed) | spec, *Foundation entries* (D-206 changed) | Slice 8, Slice 9 |
| previous-save-programs-reader (from version 9 on an item's keys are exactly `id`, `name`, `program` and the content revision, before it exactly the three) | invariant (changed) | spec, *Foundation entries* (invariant changed); Decisions 11.1 | Slice 3 |
| (new) — a value under the keys of the judging cache gives a judging only in the form the cache writes, for the account and the game its key names, and no value read from the browser's storage throws out of the cache; *Method*: test; *Part*: browser-view; derives from the new decision of row 1; check: `tests/view/judging-cache.test.mjs`, written in Slice 5, its refusal seen failing once; until then the foundation step runs `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` as WAY-321 exempts | invariant (new) | spec, *Foundation entries* (new invariant) | Slice 5 |
| browser-view — `src/browser/view/judging-cache.ts` under *Trust boundary* | part map (changed) | spec, *Foundation entries* (part map) | Slice 5, which adds the file and writes this change itself through `the-way-update-part-map` (plan-task: the part map's change for a file the change adds belongs to the slice that adds it) |
| the moment the game was made; the content revision of a program | glossary (judged by the foundation step: an entry beside „save time”, and one that keeps the content revision apart from the revision of a save, or none) | spec, *Foundation entries* (glossary) | Slice 1, Slice 3 |
| D-287 — What do Siedziba, the screen Postać and the screen Mapy allow, and say, while a manual map run waits or has ended? (wherever the sentence under the inactive buttons of a row stands, it is a link to the screen of the one open manual map run, `#/postac/{n}/przejscie`) | decision (changed: a sentence added) | the human's remark 3 (`reports/correction-1-remarks.md:5`) | Slice 11 |

The foundation step writes the rows above before Slice 1, except the part map's row, which Slice 5
writes. The row of D-287 stands only if the orchestrator keeps Slice 11 (see the report: the menu bar
held „Wróć do przejścia” at the base `c36e2739`); without it neither the row nor Slice 11 is made.

Every changed decision keeps word for word each passage of it that a test quotes in a line
`decision:`, taking its change as a sentence of its own or as words after the quoted passage, where
the new meaning allows; a quoted passage the new meaning makes untrue is changed, and the slice that
changes the test file holding the quotation makes it follow. The passages that can stay are those of
D-04 (quoted in `tests/invariants/test_browser_view_framework.py`), D-206 and D-209 (quoted in
`tests/account-storage.test.mjs`, `tests/http.test.mjs`, `tests/transport.test.mjs`,
`tests/view/game-saver.test.mjs`, `tests/view/account-screen.test.mjs`,
`tests/view/previous-save.test.mjs`, `tests/sim/previous-programs.test.mjs`,
`tests/sim/saved-game.test.mjs`), D-402 (`tests/account-api.test.mjs`, `tests/view/program-list.test.mjs`,
`tests/view/uncaught-failure.test.mjs` and the files above), D-386 (its two sentences quoted in
`tests/sim/catch-up.test.mjs`, `completion.test.mjs`, `death.test.mjs`, `discovery.test.mjs`,
`loop.test.mjs`, `loop-record.test.mjs`, `program-list.test.mjs`, `team.test.mjs`,
`saved-game.test.mjs`), D-165's sentences „Each program of the player carries a number …” and „Each
record of the game state that names a program …” (`copy.test.mjs`, `copy-actions.test.mjs`,
`program-list.test.mjs`), D-287's (`tests/view/maps-screen.test.mjs`, `character-screen.test.mjs`,
`team-lines.test.mjs`, `account-screen.test.mjs`), and of D-440 its second paragraph and the sentence
„A judging, the one „Puść w pętlę” runs included (D-243), replaces the judging remembered for its
character, program and map.” (`tests/view/judging-lines.test.mjs`, `tests/view/maps-screen.test.mjs`).
The passages that change are D-440's first sentence „The saved game state holds the last judging …”
(quoted in `tests/sim/judging-record.test.mjs`, `tests/sim/saved-game.test.mjs` and
`tests/sim/saved-game-judgings.test.mjs`: Slices 4, 2 and 9 follow them, the last by removing the
file), D-165's sentence „A judging the game remembers for a character, a program and a map (D-440)
names its program by that number too.” (quoted in `tests/sim/saved-game-judgings.test.mjs`, removed
in Slice 9) and D-401's sentence on the keys of an item (quoted in
`tests/sim/previous-programs.test.mjs` and `tests/view/previous-save.test.mjs`: Slice 3 follows
them). Where the foundation step cannot keep another quoted passage, it names the test file in its
report, and the orchestrator adds that file to the slice that touches the entry's part.

`guidelines/testing.md`, rule „Trust boundaries”, follows in two slices: Slice 3 rewrites the row of
`src/browser/sim/previous-programs.ts` (its new cases, and remark 4), and Slice 5 adds the row of the
cache's module with its invariant and decision.

## Slices

### Slice 1 — a content revision for each saved program and the moment the game was made, in the simulation and its load

- **Goal:** each program of the player's list carries a content revision, a whole number from 0, as
  a field of the saved program (`SavedProgram` in `types.ts`) beside its number, name and content, not
  of the content (`Program`), named apart from the revision of a save of D-209 (the name is yours,
  e.g. `contentRevision`). It is 0 for the first program of `newGame`, for a program `createProgram`
  makes, for a copy `saveCopyAsNewProgram` saves as new and for each program `appendPrograms` appends
  (D-401). It rises by one in `withProgramSaved` of `programs.ts` — the one function every write of
  content into a listed program passes through, so `editProgram`, `saveCopyIntoProgram`, `setProgram`
  of `game.ts` and the first-chill rule of `advanceMinutes` (D-123) raise it with no code of their
  own — at a save after which the program's rule groups with their order or its trip plan differ
  from before, compared as plain data by `sameData` of `programs.ts` (so the order in which an
  object's keys were made changes nothing), the counters `nextGroupId` and `nextRuleId` left out; it
  never rises at a rename, at a save that changes none of them, at a pick, a switch, a send, a
  deletion of another program or the start of an earning loop, and `renameProgram` and every other
  function that copies a saved program keep it as it is. `withProgramSaved` keeps giving the programs
  and the first run's judgings as today (Slice 9 takes the judgings out). The game state also holds
  the real moment the game was made (a field of `GameState`, name yours, e.g. `madeAtMs`):
  `newGame` takes it as an optional argument and stores it, 0 where none is given (the tests and the
  balance instrument; the page passes the clock's reading in Slice 8); no function of the simulation
  reads it or reads a clock (D-04, `simulation-isolation`). The save writes both fields, and the
  strict load of `saved-game.ts` (`guidelines/coding-saved-game.md`, „Ścisłe wczytanie”) reads an
  item of the list as exactly `id`, `name`, `program` and the revision, the revision a safe integer
  from 0, and the moment as a safe integer of any sign compared with no clock (D-386), built from new
  values; nothing at the load compares the revision with anything. The version is not raised: it is
  9 and not deployed (spec Goal 1). The failing tests come first, in a new file
  `tests/sim/content-revision.test.mjs`, which `stryker.config.json` lists: the cases of spec
  Decision 10, first item — 0 for each made program; one rise for an edit, a save of the copy into
  its program and `setProgram` that change a rule, add or remove one, swap two rules or two groups,
  change a group's condition or change the take or bring list; one rise for the first-chill rule;
  two for A→B→A; none for a rename, an edit or a save of the copy that changes none of the three (also
  with the keys of the objects made in another order), a change of the identity counters alone and a
  deletion of another program — and a new game holding the moment it is made with. The cases of
  `tests/sim/program-list.test.mjs`, `tests/sim/copy.test.mjs` and `tests/sim/copy-actions.test.mjs`
  that expect a saved program as exactly a number, a name and a content follow with the revision,
  with this change as their reason (`guidelines/testing.md`, „Changing an existing test”); a trial on
  the base found these cases: copy-actions.test.mjs:213, copy.test.mjs:62 and :241,
  program-list.test.mjs:89, :264, :510 and :527. A line `decision:` of these files that quotes a
  passage of D-165 or D-386 the Foundation entries changed follows the new passage.
  `tests/sim/saved-game.test.mjs` turns red here, since its document of version 9 lacks the two
  fields: do not change or run it; Slice 2, made next, rewrites it.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/programs.ts` · `src/browser/sim/game.ts` ·
  `src/browser/sim/saved-game.ts` · `tests/sim/content-revision.test.mjs` ·
  `tests/sim/program-list.test.mjs` · `tests/sim/copy.test.mjs` · `tests/sim/copy-actions.test.mjs` ·
  `stryker.config.json`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:11-28` Goals and non-goals ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:66-107` Decisions 2 and 3 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:126-136` Decision 6 (simulation) ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:170-172` Decision 10 ·
  Foundation entries row 2 · Foundation entries row 4 · Foundation entries row 5 · Foundation
  entries row 6 · Foundation entries row 12 · `foundations/decisions.md:7533-7571` D-123 ·
  `foundations/decisions.md:659-702` D-213 ·
  `foundations/invariants.md:1048-1056` save-version · `foundations/invariants.md:214-224`
  simulation-isolation · `foundations/invariants.md:226-234` simulation-inputs ·
  `foundations/invariants.md:858-866` saved-program-edit · `foundations/glossary.md:25-30` program ·
  `foundations/glossary.md:180-184` copy · `foundations/part_map.md:33-64` simulation ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — the content revision is the core of the correction's check, and the slice
  changes the strict load at a trust boundary.
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/content-revision.test.mjs` (written first, failing) ·
  `npm test -- tests/sim/program-list.test.mjs` · `npm test -- tests/sim/copy.test.mjs` ·
  `npm test -- tests/sim/copy-actions.test.mjs` · `npm test -- tests/sim/death.test.mjs` ·
  `npm test -- tests/sim/loop.test.mjs` · `npm test -- tests/sim/catch-up.test.mjs` ·
  `npm test -- tests/sim/loop-record.test.mjs` · `npm test -- tests/sim/discovery.test.mjs` ·
  `npm test -- tests/sim/previous-programs.test.mjs` ·
  `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/invariants/test_saved_program_edit.py` ·
  `npm test -- tests/invariants/test_copy_save.py`
- **Depends on:** Foundation entries row 2 · row 4 · row 5 · row 6

### Slice 2 — the document of version 9 holds the revision and the moment

- **Goal:** the document of the current version in `tests/sim/saved-game.test.mjs` holds the content
  revision of each program — programs of revision 0 and above — and the moment the game was made,
  and loads whole into the game state it describes; it is rewritten without a raise of the version,
  with the comment over it that `guidelines/coding-saved-game.md`, „Wersja podnoszona razem z
  kształtem”, asks for (no saved game state of version 9 exists anywhere, since the change has not
  reached a server). The document of version 8 is still refused as version. New cases of the trust
  boundary `save-version`, built from the document changed at one place: a program's revision
  refused as shape where it is missing, below 0, not a whole number and beyond the safe integers;
  the moment admitted at zero, below zero and far ahead, and refused as shape where it is missing,
  no integer and beyond the safe integers (spec Decision 10, third item). The first run's judgings
  stay in the document for now (Slice 10 takes them out). Every line `decision:` of the file that
  quotes a passage the Foundation entries changed — D-440's first sentence among them — follows the
  new passage. The code of the load is Slice 1's: read `src/browser/sim/saved-game.ts` as it stands
  after Slice 1; where a case fails because of the load, stop and report it rather than change the
  load.
- **Change:** `tests/sim/saved-game.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:66-70` Decision 2 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:95-99` Decision 3 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:172-172` Decision 10 · Foundation entries
  row 2 · Foundation entries row 3 · Foundation entries row 5 · Foundation entries row 8 ·
  `foundations/decisions.md:659-702` D-213 · `foundations/decisions.md:10703-10724` D-369 ·
  `foundations/invariants.md:1048-1056` save-version · `guidelines/coding.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md` · `src/browser/sim/saved-game.ts` ·
  `src/browser/sim/types.ts:85-100` · `src/browser/sim/types.ts:480-546`
- **Model:** same — the slice writes the direct refusal cases of the trust boundary `save-version`
  for the two new fields.
- **Risk:** none
- **Checks:** `npm test -- tests/sim/saved-game.test.mjs` (the new refusal cases seen failing once
  with the reading of each field taken out of a scratch copy of the load) ·
  `npm test -- tests/sim/saved-game-judgings.test.mjs` ·
  `python -B .the-way/elements/common/foundation_check.py` (its report names no stale quotation of
  `tests/sim/saved-game.test.mjs`)
- **Depends on:** Slice 1 · Foundation entries row 3 · row 5

### Slice 3 — the reader of a previous save knows the revision, and the guideline names no highest version

- **Goal:** the previous-save reader `src/browser/sim/previous-programs.ts` (trust boundary
  `previous-save-programs-reader`) reads an item of a document of version 9 or above only where its
  keys are exactly `id`, `name`, `program` and the content revision Slice 1 named, and one of a
  version from 1 to 8 only where they are exactly `id`, `name` and `program`; the revision's value,
  like the id's, is neither read nor checked, since the pull makes a new program of revision 0
  (`appendPrograms`, Slice 1); every other item is skipped and named, and the reading still throws for
  no value a document can hold (D-401 as the Foundation entries changed it, the changed invariant).
  The failing cases come first in `tests/sim/previous-programs.test.mjs`: a version-9 document's
  programs read with their revision key and pulled at revision 0; an item of a version-9 document
  without the revision key, and one of a version from 1 to 8 with it, skipped and named; the case
  „an item with a key besides id, name and program is skipped and named, and the others go on”
  follows the changed invariant. The title of the case that today reads „a document of each version
  from 1 to 9, the current one included, gives its programs in order, a program without a trip plan
  skipped and named” names no highest version number, so that it does not go stale at the next raise
  (remark 4, `reports/correction-1-remarks.md:6`), and what the case checks stays. In
  `guidelines/testing.md`, rule „Trust boundaries”, the row of `src/browser/sim/previous-programs.ts`
  (line 177 at the base) names the renamed case and the new cases by their titles, with no highest
  version number, written as `.the-way/product-guidelines/testing/template.md` gives the rule. The
  lines `decision:` of `tests/sim/previous-programs.test.mjs` and `tests/view/previous-save.test.mjs`
  that quote D-401's sentence on the keys of an item follow its new wording; nothing else of
  `tests/view/previous-save.test.mjs` changes.
- **Change:** `src/browser/sim/previous-programs.ts` · `tests/sim/previous-programs.test.mjs` ·
  `tests/view/previous-save.test.mjs` · `guidelines/testing.md`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/reports/correction-1-remarks.md:6-6`
  remark 4 · `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:130-130` Decision 6 (S1) ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:173-173` Decision 10 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:179-183` Decision 11 · Foundation entries
  row 2 · Foundation entries row 7 · Foundation entries row 9 · `foundations/invariants.md:1048-1056`
  save-version · `foundations/part_map.md:33-64` simulation ·
  `.the-way/product-guidelines/testing/template.md:180-200` · `guidelines/coding.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/AGENTS.md` · `src/browser/sim/types.ts:85-100`
- **Model:** same — the slice changes a reader at a trust boundary and its direct refusal cases.
- **Risk:** trust boundary — `src/browser/sim/previous-programs.ts`
- **Checks:** `npm test -- tests/sim/previous-programs.test.mjs` (the new cases written first,
  failing) · `npm test -- tests/view/previous-save.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `python -B .the-way/elements/common/foundation_check.py` (its report names no stale quotation of
  the two test files and no fault of `guidelines/testing.md`)
- **Depends on:** Slice 1 · Foundation entries row 7 · row 9

### Slice 4 — the record of a judging, the mark from it, and an act that leaves the game state as it was

- **Goal:** three pure functions of the simulation, beside the first run's, which stay until Slice 9.
  In `src/browser/sim/judging-record.ts`, which imports neither `game.ts` nor `judging.ts`: the record
  of a judging (spec Decision 6, S2) — from the game state the judging read, the triple of a character,
  a program and a map, and the judging, what the cache stores: the kind of each of the twelve results,
  the equipment as the judging took it, the content revision of the triple's program in that state
  and the character's generation number in that state; its type stands in this module beside
  `JudgingMark` and `JudgingIds`. The mark from a record (S3) — from the game state at hand, the triple
  and a record or none: the mark beside „Program:” as `JudgingMark` gives it (the count solved, all
  twelve, the note on the stock where the chest holds less of an item than the record took, the
  badge), or none where no record is given or it does not stand: it stands only where the character of
  the triple is on the team with the stored generation, the program of the triple is on the list with
  the stored revision, and the stored results number as many as the data's judging seeds (spec
  Decision 2, „The check”). Its name is your own while the first run's `judgingMark` still stands. In
  `src/browser/sim/judging.ts`: the act of a judging — the judging `judgeOnSeeds` gives and its record,
  both from the one state it read, the game state left the very state it got; whether it answers as a
  `GameResult` is yours. The failing tests come first: in `tests/sim/judging-record.test.mjs` the
  cases of spec Decision 10, second item — the record holding the revision and the generation of the
  state the judging read; the mark none for no record; none for a record whose program is deleted,
  whose character is not on the team, whose generation is below the character's after a death with
  `progressLost` in a manual map run, an earning loop and the catch-up, and whose revision differs,
  A→B→A included; standing after a covered death, a death with no practice, a bought rank and a
  rename; the stock cases (less in the chest gives the note and no badge, more leaves the mark) — and
  in `tests/sim/judging.test.mjs` the act leaving the game state the very state it got, with its
  judging the one `judgeOnSeeds` gives. The first run's cases of the file stay until Slice 9 removes
  what they cover; a line `decision:` of either file that quotes a passage of D-440 or D-165 the
  Foundation entries changed follows the new passage. Read `src/browser/sim/types.ts` as Slice 1 left
  it (the revision of a saved program).
- **Change:** `src/browser/sim/judging-record.ts` · `src/browser/sim/judging.ts` ·
  `tests/sim/judging-record.test.mjs` · `tests/sim/judging.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:36-36` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:119-124` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:66-93` Decision 2 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:126-136` Decision 6 (simulation) ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:162-164` Decision 9 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:171-171` Decision 10 · Foundation entries
  row 1 · Foundation entries row 2 · Foundation entries row 3 · Foundation entries row 6 ·
  `foundations/decisions.md:11809-11834` D-439 · `foundations/decisions.md:6218-6249` D-190 ·
  `foundations/decisions.md:6334-6354` D-218 · `foundations/decisions.md:9115-9128` D-409 ·
  `foundations/invariants.md:226-234` simulation-inputs · `foundations/invariants.md:214-224`
  simulation-isolation · `foundations/glossary.md:308-312` judging ·
  `foundations/glossary.md:217-221` generation number · `foundations/part_map.md:33-64` simulation ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/AGENTS.md` · `src/browser/sim/types.ts` · `src/browser/sim/game.ts:640-724` · `src/browser/sim/loop.ts:295-411`
- **Model:** same — the check at reading is the core of the correction: every erasing of the task
  becomes a comparison here, and a wrong one shows a badge that lies.
- **Risk:** none
- **Checks:** `npm test -- tests/sim/judging-record.test.mjs` (the new cases written first, failing) ·
  `npm test -- tests/sim/judging.test.mjs` · `npm test -- tests/sim/death.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py`
- **Depends on:** Slice 1 · Foundation entries row 1 · row 2 · row 3

### Slice 5 — the judging cache, a module of the view at a trust boundary

- **Goal:** a new module `src/browser/view/judging-cache.ts`, the one file that knows the stored form
  of a cached judging (spec Decisions 4, 5, 6 V1, 7, 8, 11.2 and 11.3). It is opened for one
  account's id (`Account.id`, never the email), one game's moment (Slice 1's field), the game state it
  is opened with, whether the game was built after a refused save (D-209), and a storage given to it
  or none — it reaches no `window` itself. It offers reading the record of a triple (the record or
  none) and remembering the record of a triple; the record is the type of Slice 4. One entry of the
  storage per triple: the key a fixed prefix naming the cache of loop2 and the version 1 of its stored
  form, then the account's id, the game's moment, the character's number, the program's number and
  the map's identifier, in that order, with a separator none of them holds; the value a JSON object of
  exactly four fields — the twelve results as one text of one letter per seed, in the order of the
  data's seeds; the equipment as item and count pairs; the content revision; the generation. Reading
  ignores, never throwing and leaving the value where it is: a value longer than a fixed bound,
  unparsed; one that is no JSON, has another field or misses one, has results of another length or
  letter, an item the data lack or named twice, a count that is no safe integer from 1, a revision
  that is no safe integer from 0, a generation that is no safe integer from 1; it builds new values
  and never gives an object the parse made, a `__proto__` or `constructor` key included. Keys of
  another version of the form are neither read, written nor removed. A storage refused at opening
  makes the cache live in the page's memory; a refused write keeps the triple in the page's memory and
  removes the triple's stored value where it can; a triple held in the page's memory is read from it,
  any other from the storage, so a later write that succeeds takes it out of memory; every exception
  of the storage is caught inside. At opening, best effort, it removes this account's entries under
  another game's moment and, after a refused save, this game's entries too; it leaves other accounts'
  entries; and for the game it is opened with it drops this game's entries whose revision or
  generation stands above that state's own (spec Decision 11.3). No comment, case title or sentence
  claims that the refused-save path closes more than the page that builds a game after another
  browser saved first (spec Decision 11.2). The failing tests come first, in a new file
  `tests/view/judging-cache.test.mjs` marked with the new invariant (Foundation entries row 10), its
  refusal seen failing once: the cases of spec Decision 10, fifth item, with stand-in storages — a
  map-backed one, one whose writes throw, one whose every call throws, and none — and the cases of
  Decision 11.3 (an entry above by revision dropped, above by generation dropped, equal or below
  kept). The part map follows through the project skill `the-way-update-part-map`, read as the file
  named in *Read*: the module under *Trust boundary* of `browser-view`. `guidelines/testing.md`, rule
  „Trust boundaries”, gets a row for the module naming its invariant and its refusal cases, and the
  rule's *Decision* and *Invariant* lists the new decision and the new invariant, written as
  `.the-way/product-guidelines/testing/template.md` gives the rule. Read
  `src/browser/sim/judging-record.ts` as Slice 4 left it.
- **Change:** `src/browser/view/judging-cache.ts` · `tests/view/judging-cache.test.mjs` ·
  `foundations/part_map.md` · `guidelines/testing.md`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:7-47` Intent, Goals and non-goals,
  Constraints · `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:95-124` Decisions 3, 4 and 5 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:138-140` Decision 6 (V1) ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:149-160` Decisions 7 and 8 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:174-177` Decision 10 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:179-185` Decision 11 · Foundation entries
  row 1 · Foundation entries row 10 · Foundation entries row 11 · `foundations/decisions.md:4128-4168`
  D-211 · `foundations/decisions.md:4046-4091` D-209 · `foundations/decisions.md:644-657` D-117 ·
  `foundations/invariants.md:1248-1256` cross-part-imports · `foundations/invariants.md:1198-1206`
  document-test-memory-limit · `foundations/part_map.md:3-31` browser-view ·
  `.the-way/elements/part-map/skill/SKILL.md` · `.the-way/product-guidelines/testing/template.md:180-200`
  · `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `src/browser/account-api.ts:1-20`
  · `src/browser/sim/types.ts:360-400`
- **Model:** same — a new trust boundary that reads values anyone with the browser can write.
- **Risk:** trust boundary — `src/browser/view/judging-cache.ts` (the part map names it in this slice)
- **Checks:** `npm test -- tests/view/judging-cache.test.mjs` (written first, failing; the refusal
  seen failing once) · `npm test -- tests/invariants/test_cross_part_imports.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `python -B .the-way/elements/common/foundation_check.py` (the module claimed as a trust boundary of
  `browser-view`, the new invariant cited by its test, no fault of `guidelines/testing.md`)
- **Depends on:** Slice 3 · Slice 4 · Foundation entries row 1 · row 10

### Slice 6 — the screen Mapy reads the marks from the cache and the judging is remembered there

- **Goal:** the entry of the screen Mapy, `src/browser/view/maps-entry.ts`, takes a judging cache of
  Slice 5 as an option — optional until Slice 8 makes the game view give it; with none, nothing is
  remembered and no mark stands. Its `judge` control runs Slice 4's act through `store.act`, which
  catches up time first (D-409), and inside the same act body, before the screen's one draw after the
  act, gives the record to the cache, unless the store has halted (`store.halted()`, D-323), when
  nothing is remembered; the act takes no result into the store, so a judging saves nothing of its
  own (spec Decision 9). „Puść w pętlę” judges through the same control, so its judging replaces the
  cached one too (D-440). The entry gives the screen a way to read the record of a triple from the
  cache. The screen, `src/browser/view/maps-screen.tsx`, draws in each row of „Kto idzie” the mark
  Slice 4's function gives from the state it is drawn with and the record of its character, the
  program its list shows and the card's map, read at each draw (a tab shows another tab's judging at
  its next draw, spec Decision 7); what stands under the character — the result of a judging, the
  waiting second click — is unchanged, and the first run's `judgingMark` and `state.judgings` are no
  longer read. The failing tests come first, in `tests/view/maps-screen.test.mjs`, with the cache built
  on a stand-in storage the case gives (spec Decision 10, sixth item): the cases that stand today for
  the badge, „{n} z 12”, the note on the stock and the mark following the list's pick keep their
  expectations; a judging remembered and shown again by a screen built anew on the same storage; no
  mark on an empty storage until a judging; no mark for the same triple under another account or
  another game's moment; no mark after an edit that changes the program's content, also after the
  content is changed back; nothing remembered after the store halted. The cases that build
  `judgings` into the game state or use `judgeAndRemember` follow this change, with the remark 1 of
  the human and the new decision as their reason (`guidelines/testing.md`, „Changing an existing
  test”); a line `decision:` quoting a passage of D-440 the Foundation entries changed follows it.
  `tests/view/account-screen.test.mjs` turns red here where it counts the save of a judging: do not
  change or run it; Slice 7, made next, follows it. Read `src/browser/sim/judging-record.ts`,
  `src/browser/sim/judging.ts` and `src/browser/view/judging-cache.ts` as Slices 4 and 5 left them.
- **Change:** `src/browser/view/maps-entry.ts` · `src/browser/view/maps-screen.tsx` ·
  `tests/view/maps-screen.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:138-145` Decision 6 (view) ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:149-154` Decision 7 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:162-164` Decision 9 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:175-175` Decision 10 · Foundation entries
  row 1 · Foundation entries row 3 · `foundations/decisions.md:9115-9128` D-409 ·
  `foundations/decisions.md:4710-4727` D-323 · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `src/browser/view/state-store.ts:56-104`
- **Model:** same — the switch of the screen from the game state to the cache, inside the act and the
  one draw after it, is the correction's view at its core.
- **Risk:** none
- **Checks:** `npm test -- tests/view/maps-screen.test.mjs` (the new cases written first, failing) ·
  `npm test -- tests/view/judging-lines.test.mjs` · `npm test -- tests/view/uncaught-failure.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py` ·
  `npm test -- tests/invariants/test_cross_part_imports.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py`
- **Depends on:** Slice 4 · Slice 5 · Foundation entries row 1 · row 3

### Slice 7 — the page tests of the account screen follow a judging that saves nothing

- **Goal:** the cases of `tests/view/account-screen.test.mjs` that expect a save of a judging — the
  act of „Puść w pętlę” at its first click, its second click „Puść mimo to” waiting behind the save of
  the first, the helper `startLoopOf` — follow spec Decision 9: a judging changes no game state, so
  the store saves nothing for it; the saves a case expects are the ones of the catch-up its reading
  makes, where it makes one, and of the start of the earning loop; the import of `judgeAndRemember`
  and the expected states built with it go, the expected state after a judging being the state before
  it. The reason of each change is remark 1 of the human and the new decision (`guidelines/testing.md`,
  „Changing an existing test”). What else a case checks stays; a line `decision:` quoting a passage
  the Foundation entries changed follows it. The file is about 360 KB: find its cases by search
  („judgeAndRemember”, „Puść w pętlę”, „Puść mimo to”, `startLoopOf`, „saveGame”) rather than
  reading it whole.
- **Change:** `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:162-164` Decision 9 · Foundation
  entries row 1 · `foundations/decisions.md:3934-4012` D-207 · `foundations/decisions.md:8769-8833`
  D-243 · `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/AGENTS.md`
- **Model:** same — the cases stand in a file of 360 KB that the agent reaches by search, and each
  changed expectation needs its reason.
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs`
- **Depends on:** Slice 6

### Slice 8 — the page makes each new game at the clock's moment and gives the game view the cache

- **Goal:** every path of the page that makes a new game passes the clock's moment to `newGame`
  (spec Decision 3): an account with no saved game state (`app.ts`, `loadGame`), a load refused as
  another version, as an archetype the data lack or as shape (`startFrom` in `app.ts`) and the reset
  of D-402 (`page-game-acts.ts`); the conflict reload that finds no save goes through the first. A
  loaded game keeps its moment. The page gives the game view the signed-in account's id beside the
  role and the previous-save privilege it gives today. `createGameView` in `game-view.ts` reaches
  `window.localStorage` inside a guard, since reaching it can throw, and opens the judging cache of
  Slice 5 with that storage or none, the account's id, the moment of the game it is built with, that
  game state and its `afterConflict`; it gives the cache to the entry of the screen Mapy, whose option
  becomes required. No other file of the page reaches the browser's storage. The failing tests come
  first, in a new file `tests/view/judging-cache-page.test.mjs`, built on the page as
  `tests/view/uncaught-failure.test.mjs` and `tests/view/previous-save.test.mjs` build it: a new game
  made by each path above carrying the clock's moment, also the reset; a reload of a saved game naming
  the same game; a game built after a refused save showing no mark its browser had cached for it; a
  mark cached under another account or another game's moment not shown. In
  `tests/view/uncaught-failure.test.mjs` the press of „Oceń na 12 ziarnach” after an error nothing
  handled leaves the browser's storage as it was. The other callers of `createGameView` in the tests
  (`chronicle-game`, `end-question`, `end-window-game`, `previous-save`, `account-screen`) run
  unchanged. Read `src/browser/view/judging-cache.ts` and `src/browser/view/maps-entry.ts` as Slices 5
  and 6 left them.
- **Change:** `src/browser/view/app.ts` · `src/browser/view/page-game-acts.ts` ·
  `src/browser/view/game-view.ts` · `src/browser/view/maps-entry.ts` ·
  `tests/view/judging-cache-page.test.mjs` · `tests/view/uncaught-failure.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:95-107` Decision 3 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:138-145` Decision 6 (view) ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:149-154` Decision 7 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:174-175` Decision 10 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:179-184` Decision 11 · Foundation entries
  row 1 · Foundation entries row 4 · Foundation entries row 8 · `foundations/decisions.md:4046-4091`
  D-209 · `foundations/decisions.md:4296-4311` D-402 · `foundations/decisions.md:4710-4727` D-323 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `tests/view/previous-save.test.mjs:37-160`
- **Model:** same — four paths of the page make games, and the one reach of the browser's storage
  stands here.
- **Risk:** none
- **Checks:** `npm test -- tests/view/judging-cache-page.test.mjs` (written first, failing) ·
  `npm test -- tests/view/uncaught-failure.test.mjs` · `npm test -- tests/view/maps-screen.test.mjs`
  · `npm test -- tests/view/previous-save.test.mjs` · `npm test -- tests/view/chronicle-game.test.mjs`
  · `npm test -- tests/view/end-question.test.mjs` · `npm test -- tests/view/end-window-game.test.mjs`
  · `npm test -- tests/invariants/test_cross_part_imports.py`
- **Depends on:** Slice 1 · Slice 5 · Slice 6 · Foundation entries row 4 · row 8

### Slice 9 — the first run's remembered judgings leave the game state, the simulation and the save

- **Goal:** what commits `bae893e2` and `3218a620` added for judgings remembered in the game state
  goes, as spec Decision 6, „Goes away”, lists it: `GameState.judgings` and `judgings: {}` of `newGame`;
  the types `RememberedJudging` and `RememberedJudgings`; `rememberedOf`, `withRememberedJudging`, the
  first run's `judgingMark`, `judgingsWithoutProgram`, `judgingsWithoutCharacter`, `judgingsAfterSave`
  and `judgingsAfterDeath` of `judging-record.ts`; `judgeAndRemember` of `judging.ts`; the judgings half
  of `withProgramSaved`, which gives the list of programs alone again, its callers (`editProgram`,
  `saveCopyIntoProgram`, `setProgram`, the first-chill write of `advanceMinutes`) taking the list as
  before `3218a620`, the revision of Slice 1 kept; the removal of judgings in `deleteProgram`; the
  erasing in `settleDeath` and in `takeEnd` of `loop.ts`; and in `saved-game.ts` the reading of
  `judgings` (`rememberedJudging`, `rememberedJudgings`, `"judgings"` among the game's keys, and the
  seed kinds there if nothing else reads them). The death functions and `deleteProgram` go back to
  what they did before `3218a620` (`git show 3218a620`), keeping every other change made since; the
  record, the mark and the act of Slice 4 stay. `tests/sim/saved-game-judgings.test.mjs` loses its
  reason and goes, with its entry in `stryker.config.json`; the cases of
  `tests/sim/judging-record.test.mjs` that cover what goes are removed, with remark 1 of the human as
  their reason, and those of Slice 4 stay. No file of the view still reads what goes (Slices 6 and 7
  took it out); a search of `src/` and `tests/` for each removed name finds none outside
  `tests/sim/saved-game.test.mjs`. `tests/sim/saved-game.test.mjs` turns red here, since its document
  holds `judgings`: do not change or run it; Slice 10, made next, rewrites it.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/game.ts` · `src/browser/sim/programs.ts`
  · `src/browser/sim/loop.ts` · `src/browser/sim/judging.ts` · `src/browser/sim/judging-record.ts` ·
  `src/browser/sim/saved-game.ts` · `tests/sim/judging-record.test.mjs` ·
  `tests/sim/saved-game-judgings.test.mjs` · `stryker.config.json`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:126-136` Decision 6 (simulation) ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:37-37` Constraints ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:45-45` Constraints · Foundation entries row 1
  · Foundation entries row 3 · Foundation entries row 6 · `foundations/decisions.md:6218-6249` D-190 ·
  `foundations/decisions.md:659-702` D-213 ·
  `foundations/invariants.md:1048-1056` save-version · `foundations/invariants.md:226-234`
  simulation-inputs · `foundations/invariants.md:1078-1086` death-settled-once ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — removal across five files of the simulation and the strict load, which must give
  back the behaviour from before `3218a620` while keeping every later change.
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/judging-record.test.mjs` · `npm test -- tests/sim/judging.test.mjs`
  · `npm test -- tests/sim/content-revision.test.mjs` · `npm test -- tests/sim/program-list.test.mjs`
  · `npm test -- tests/sim/copy.test.mjs` · `npm test -- tests/sim/copy-actions.test.mjs` ·
  `npm test -- tests/sim/death.test.mjs` · `npm test -- tests/sim/loop.test.mjs` ·
  `npm test -- tests/sim/catch-up.test.mjs` · `npm test -- tests/sim/loop-record.test.mjs` ·
  `npm test -- tests/view/maps-screen.test.mjs` ·
  `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_saved_program_edit.py` ·
  `npm test -- tests/invariants/test_copy_save.py`
- **Depends on:** Slice 1 · Slice 4 · Slice 6 · Slice 7 · Slice 8 · Foundation entries row 1 · row 3

### Slice 10 — the document of version 9 holds no judging

- **Goal:** the document of the current version in `tests/sim/saved-game.test.mjs` holds no
  `judgings` and loads whole into the game state it describes, still with the content revisions and
  the moment Slice 2 gave it, rewritten without a raise of the version under the comment Slice 2
  wrote; the cases of the first run that built remembered judgings through the document go, with
  remark 1 of the human as their reason; a document holding a `judgings` key is refused as shape (spec
  Decision 10, third item). A line `decision:` of the file that quotes a passage the Foundation
  entries changed follows it. The code of the load is Slice 9's: where a case fails because of the
  load, stop and report it rather than change the load.
- **Change:** `tests/sim/saved-game.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:172-172` Decision 10 · Foundation
  entries row 1 · Foundation entries row 3 · `foundations/decisions.md:659-702` D-213 ·
  `foundations/invariants.md:1048-1056` save-version · `guidelines/coding.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md` · `src/browser/sim/saved-game.ts` ·
  `src/browser/sim/types.ts:480-546`
- **Model:** same — the slice writes a direct refusal case of the trust boundary `save-version`.
- **Risk:** none
- **Checks:** `npm test -- tests/sim/saved-game.test.mjs` (the case of the refused `judgings` key seen
  failing once against a scratch copy of the load that still reads it) ·
  `python -B .the-way/elements/common/foundation_check.py` (its report names no stale quotation)
- **Depends on:** Slice 2 · Slice 9

### Slice 11 — the sentence of an open manual map run leads back to it

- **Goal:** first check the base of the first run: `git show c36e2739:src/browser/view/maps-screen.tsx`
  — whether the row of a character in „Kto idzie” held a link to the screen of its open manual map
  run, near the sentence of `runWaitingSentence`. The planner found none in the row there (the sentence
  stood in a plain paragraph, `maps-who-run-note`), while the menu bar held „Wróć do przejścia · {mapa}
  · minuta {m}” to that screen (D-280); the orchestrator keeps this slice only where it settles that
  the remark's link is the one in the row. Where the check finds such a link in the row, change
  nothing, and report that it stood before the change and the walk did not find it. Where it finds
  none: in every row of the card where the sentence stands (the one open manual map run has one screen, so the target is the same in each row; the orchestrator's answer to the planner's question 2), the sentence
  „Przejście na mapie {mapa} jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.” is a
  link to the screen of that map run, the address `screenAddress` of `screen-address.ts` gives for
  `{ kind: "run", characterId }` (`#/postac/{n}/przejscie`, D-281); its text stays `runWaitingSentence`'s (D-287, as the
  Foundation entries changed it). The link keeps the sentence's role, `text-secondary`, and takes
  the look the styleguide gives a link of the screen (the name of a character in „Kto idzie” is
  one); in `guidelines/styleguide-browser-view.md`, rule „The screen Mapy”, the line of the sentence
  of D-287 says that it is a link to the screen of that map run, in the
  same role — no role, value or meaning of a role changes. The failing case comes first in
  `tests/view/maps-screen.test.mjs`: while a manual map run waits and after it ended, every row that holds the sentence
  holds it as a link to that screen, and after
  „Zakończ” none. Read `src/browser/view/maps-screen.tsx` as Slice 6 left it.
- **Change:** `src/browser/view/maps-screen.tsx` · `tests/view/maps-screen.test.mjs` ·
  `guidelines/styleguide-browser-view.md`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/reports/correction-1-remarks.md:5-5`
  remark 3 · `.runs/task-cycles/ocena-programu-na-ziarnach/reports/walk-report.md:65-65` side
  observation 2 · Foundation entries row 13 · `foundations/decisions.md:4497-4567` D-280 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/screen-address.ts:141-162` · `src/browser/view/team-lines.ts:15-22`
- **Model:** same — raised from `cheaper` by the orchestrator: the first run's `cheaper` executor read little of what its handoff named
- **Risk:** none
- **Checks:** `npm test -- tests/view/maps-screen.test.mjs` (the new case written first, failing) ·
  `npm test -- tests/view/team-lines.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py`
- **Depends on:** Slice 6 · Foundation entries row 13

### Slice 12 — the balance instrument makes its games at a fixed moment

- **Goal:** `balance/engine.mjs` (line 94 at the base) and `balance/campaign.mjs` (line 169) pass a
  fixed number, 0, as the moment the game was made where they call `newGame`, never the clock
  (`balance-instrument-repeatability`); no measurement reads it, and every case of `tests/balance/`
  runs unchanged. The number stands where each file makes its game; whether it is one named constant
  shared through the engine is decided by `guidelines/coding-balance-instrument.md`, „Jedno miejsce
  wspólnej rzeczy”.
- **Change:** `balance/engine.mjs` · `balance/campaign.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:95-99` Decision 3 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:147-147` Decision 6 (balance) · Foundation
  entries row 4 · `foundations/decisions.md:889-902` D-437 · `foundations/invariants.md:1458-1466`
  balance-instrument-repeatability · `foundations/part_map.md:127-137` balance-tools ·
  `guidelines/coding.md` · `guidelines/coding-balance-instrument.md` · `guidelines/testing.md`
- **Model:** same — raised from `cheaper` by the orchestrator: the first run's `cheaper` executor read little of what its handoff named
- **Risk:** none
- **Checks:** `npm test -- tests/balance/engine.test.mjs` · `npm test -- tests/balance/campaign.test.mjs`
  · `npm test -- tests/balance/agreement.test.mjs` ·
  `npm test -- tests/invariants/test_balance_instrument_repeatability.py`
- **Depends on:** Slice 1 · Foundation entries row 4

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Remark 1 — the remembered judgings leave the saved game sent to the server and become a cache in the browser | Foundation entries rows 1, 3, 8 · Slices 5, 6, 8, 9, 10 |
| Remark 1 — the shape of the behaviour stays: the last judging per character–program–map, twelve results and the equipment, the badge and the note on the stock | Slice 4 (record, mark) · Slice 5 (stored form) · Slice 6 (mark on the screen) |
| Remark 1 — erasing at a change of rules, groups or trip plan (A→B→A included, on every device), at a death that takes practice, at the deletion of a program; kept through a rename, a save changing none of them, a covered death, a death with no practice, a bought rank | Slice 1 (revision) · Slice 4 (the check at reading) · Slice 6 (screen case after a change and back) |
| Remark 1 — the key tells the account and the game apart (a reset, a discarded save) | Slice 1 (the moment in the game state) · Slice 5 (key, removal of older games) · Slice 8 (the clock's moment on each page path, the game view opening the cache for the account) |
| Remark 1 — the saved shape returns to one with no judgings; the version rises only for another change of shape (the loop record) | Slices 9 and 10 (version stays 9) · Slices 1 and 2 (the revision and the moment ride the same raise) |
| Remark 1 — accepted cost: another device or cleared data show no badge until the next judging | Foundation entries row 1 · Slice 6 (empty storage case) |
| Remark 1 — the fallback when an entry forbids state outside the server's save | spec Decision 1: no entry forbids it; the fallback is not made |
| Spec Goal 1 — no judging in the saved game; version 9; the revision and the moment in it | Slices 1, 2, 9, 10 |
| Spec Goal 2 — the last judging per triple in `localStorage`, shown beside „Program:” with the note | Slices 5, 6, 8 |
| Spec Goal 3 — erased in effect by the changes named; no function of the simulation reaches the cache | Slices 1, 4 · Slice 5 (cache in the view only) |
| Spec Goal 4 — no judging of another account or another game | Slice 5 · Slice 8 |
| Spec Goal 5 — corrupt, foreign, oversized values, a full or refused storage never break the page | Slice 5 · Foundation entries row 10 |
| Spec Goal 6 — no storage in the simulation; one module of the view; no hash | Slice 5 · Slice 8 · Slice 1 (counter) |
| Spec Decision 2 — content revision and the check at reading | Slices 1, 4 · Foundation entries row 2 |
| Spec Decision 3 — the moment the game was made, on every page path; the balance instrument's fixed moment | Slices 1, 8, 12 |
| Spec Decisions 4, 5, 7, 8 — the stored form, its failures, tabs and devices, what stays | Slice 5 · Slice 6 (read at each draw) |
| Spec Decision 6 — where the code lives (S1–S3, the act, the moment, what goes, what stays, V1, V2, the game view, the entry, the screen, the page, the instrument) | Slices 1, 4, 5, 6, 8, 9, 12 |
| Spec Decision 9 — a judging saves nothing of its own | Slice 6 · Slice 7 |
| Spec Decision 10 — the checks | Slice 1 (revision) · Slice 4 (record, mark, act) · Slices 2 and 10 (saved game) · Slice 3 (previous save) · Slice 5 (cache) · Slice 6 (screen) · Slices 7 and 8 (page: saves, moment, refused save, halted page) · Slice 12 (instrument) · each slice's invariant checks |
| Spec Decision 11.1 — D-401 changed, its quotations followed, the invariant agreeing | Foundation entries rows 7, 9 · Slice 3 |
| Spec Decision 11.2 — no claim beyond what the refused-save path closes | Slice 5 · Foundation entries row 1 |
| Spec Decision 11.3 — entries above the loaded game's revision or generation dropped at opening | Slice 5 · Slice 8 (opened with the loaded state) |
| Spec *Foundation entries* | Foundation entries rows 1–12 |
| Remark 3 — the sentence „Wróć do niego i je zakończ” (or a part) a link to the screen of the open manual map run; the check of the base first | Slice 11 · Foundation entries row 13 (both subject to the orchestrator's answer on the menu bar's link) |
| Remark 4 — the title of the trust-boundary case of `tests/sim/previous-programs.test.mjs` and `guidelines/testing.md:177` name no highest version | Slice 3 |
| Remarks 2 and 5 — no work | none |
| Task *To do* 6 as remark 1 changes it („w zapisie” becomes the browser's cache); every other item of the task stands as the first run made it | Slices 1–10 for *To do* 6; the rest is unchanged |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| `newGame` takes the moment as an optional argument and makes the game at 0 where none is given; the page passes the clock on each path, and a case of the page per path holds it (Slice 8) | a required argument — 237 calls in 73 test files change, beyond any slice; a function of the page that stamps the moment on a new game — a second way to make a game, which a later path can bypass in the same way | a page path that forgets the argument makes the account's games at moment 0, so a judging of an old game shows in a new one; Slice 8's case of that path fails |
| The new view module, its test and the page's test file named here: `src/browser/view/judging-cache.ts`, `tests/view/judging-cache.test.mjs`, `tests/view/judging-cache-page.test.mjs`; the revision's cases in `tests/sim/content-revision.test.mjs` | the names left to the maker, as the spec allows — the plan's *Change* has to name each file | a rename in a later change |
| The view switches to the cache (Slice 6) before the first run's judgings leave the simulation (Slice 9), so `GameState.judgings` stays, written by nothing, through Slices 6 to 8 | the removal first — the screen and the entry read `state.judgings` and `judgeAndRemember`, so the removal would need an interim screen with no mark and its tests rewritten twice | none beyond three slices with a dead field |
| The document of `tests/sim/saved-game.test.mjs` is rewritten twice, for the revision and the moment (Slice 2, right after Slice 1) and for the judgings' removal (Slice 10, right after Slice 9); the file is red only between each pair | one rewrite after Slice 9 — red through seven slices; one slice holding the load, the simulation's files and the test (about 380 000 characters before the guidelines) — beyond a slice | the file of about 63 000 estimated tokens is read twice |
| The entry's cache option is optional from Slice 6 to Slice 8, so the real page shows no mark and remembers nothing between them | the game view and the page in Slice 6 — the account's id has to come from `app.ts`, beyond that slice's size | three slices in which the running game shows no mark; the whole change has them |
| The page's new cases (moment per path, refused save, another account or game) in a new file built on the page as `uncaught-failure.test.mjs` builds it, not in `tests/view/account-screen.test.mjs` as spec Decision 10 lists | the account screen's file — about 144 000 estimated tokens alone, so the page slice could not hold it and its cases would come after the code they check | a second file that builds the page; a later move of the cases |
| Slice 7 alone changes `tests/view/account-screen.test.mjs` and stays too large for the size script (the file alone is about 144 000 estimated tokens), as the first run's Slice 12 did | splitting it — no slice can change part of one file; moving its judging cases to another file still changes it | an executor that reads by search may miss a case; the slice's check runs the whole file |
| The record's type stands in `judging-record.ts` beside `JudgingMark` and `JudgingIds` | in `types.ts` — one more file read whole in Slice 4 | a move of one type |
| The part map's row and the guideline's row for the cache are written in Slice 5, which adds the module | in the foundation step before Slice 1 — the module's file does not exist then, and plan-task gives the part map's change for an added file to the slice that adds it | none |
| Remark 4 is made in Slice 3, which changes the reader's cases and their row in `guidelines/testing.md` anyway | a slice of its own — the same two files read again | none |
| Remark 3: the whole sentence is the link, in the row of the run's own character alone, as the handoff scopes it | the words „Wróć do niego i je zakończ” alone as the link — the sentence of `team-lines.ts` split into parts and its test changed, which Slice 11's size does not hold; the link in every row, since the sentence stands under each character | a long link on the card; a later change to link only the words, or every row |
| The moment of the balance instrument is 0, passed where each file makes its game (Slice 12), though `newGame` gives 0 with no argument | no change of the instrument — the spec asks the instrument to pass a fixed moment | none |
