**Status:** done with concerns (concerns: stale neighbours found and left alone, see "Questions and concerns"; no blocking question)

# Report - executor of slice 1, task `zapas-i-wskrzeszenie`

## Commit and files

- Commit `3647bb19` on `task/zapas-i-wskrzeszenie` (base `46cfec71`): `docs: :card_file_box: state the rules of the stock and the resurrection with uses in the foundation, the new decision on the player's absence (D-438)`. Committed by path (`git add` of the three files); the author address of the commit is the private one, as the repository's remote requires.
- `foundations/decisions.md`: +61 / -47 (diffstat of the file, 108 lines changed)
- `foundations/invariants.md`: +4 / -4
- `foundations/glossary.md`: +2 / -2
- No code, no test, no file outside the slice's *Change*.

## Entries, one sentence each in English and in the task document's language, and the mark

All entries below are marks `row n` where the row of "Settlements to record" carries them, `projected` for the new decision's binding sentence, rationale and rejected, `the cycle's` for what the cycle adds.

- **D-438 (new, "May the progression require the player's absence?")** - number D-438 is the next free one (the log holds D-1..D-437, the withdrawn list ends at D-361); placed at the end of the section "Maps: their content, time and solving". EN: the progression never requires the player's absence; each next map is solvable with what the maps before it gave. PL: postęp nie wymaga nieobecności gracza; każdą kolejną mapę da się przejść tym, co dały wcześniejsze. Mark: `projected` (binding sentence, *Rationale*, *Rejected*, word for word from the task's "Zadanie zapisuje"); *Relations* `none` and *Verification* are `the cycle's` (the projected entry left both `TODO`). *Based on* `none`, *Origin* `none`, *Scope* `simulation`; the projected "Meaning (pl)" line is not part of the entry form and is not written.
- **D-189** (rows 1; To do 1, 2, 7): EN: a manual run of a solved map takes its equipment from the chest, brings its loot out to it like every other map run and pays no practice; every run pays loot only on completion. PL: ręczne przejście mapy rozwiązanej bierze zapas ze skrzynki, wynosi do niej łup jak każde przejście i nie płaci wprawy. Mark `row 1`. The sentence of equipment from nowhere and of the mark under „Wejdź” with D-251 is gone; *Relations* gained `derives from D-438`; *Rationale* and *Rejected* no longer give the try from nowhere as the rule (the old *Rejected* item "a trial cut by the chest's contents" is removed, it is now the rule). Added to *Rejected* from the answers to questions 1 and 9 of the task ("Not chosen"): a run of a solved map that also pays practice; a thing always at the wall itself; time as the only way to the next supply, each with the cost the task keeps.
- **D-179** (To do 1): EN: the exception for a manual run of a solved map is gone from the sentence and from the rationale. PL: znika wyjątek dla ręcznego przejścia mapy rozwiązanej. Mark `row 1`.
- **D-214** (To do 1): EN: a restart after the completion that solved the map takes its equipment from the chest and pays no practice. PL: taki „Restart" bierze zapas ze skrzynki i nie płaci wprawy. Mark `row 1`.
- **D-190** (rows 2, 3, 4; To do 3): EN: the account's resurrection has uses and the return time of one use in the balance data (3 and 4 hours to start), is numbers of the account and no item; a death of a character with practice uses up one use while any is left; used uses return one at a time on one clock; a first completion of a new map returns one use while the stock is not full. PL: wskrzeszenie konta ma użycia i czas odnowienia jednego użycia w danych gry, na start 3 i 4 godziny; zużyte wracają po kolei na jednym zegarze; pierwsze rozwiązanie nowej mapy przywraca jedno użycie, póki zapas nie jest pełny. Marks `row 2`, `row 3`, `row 4`. The long single paragraph (it was over the limits) is now three paragraphs: the death, the resurrection with its uses, the return of the used uses; the rest of the binding sentence is kept word for word where the meaning allows. *Verification* names "3 uses and 4 hours" instead of "480 real minutes"; *Relations* gained `derives from D-438` (`narrows D-189` kept). The *Rationale* gained the calculation of question 4 (58% of sittings, 12 hours) marked as a calculation and as lines of the data to correct in task 6 of the plan; *Rejected* gained the ways of questions 2-5 with their costs. The sentence of the *Rationale* about the lack of a sweep over many seeds is kept except for the phrase "when its resurrection is not ready" -> "when none of its uses is left" (slice 2 corrects the rest).
- **D-220** (row 5): EN: a new game has the account's resurrection with its full number of uses. PL: nowa gra zaczyna z pełnym zapasem użyć. Mark `row 5`.
- **D-240** (To do 3): EN: the death of each character finds the uses and the clock of the returns as the characters earlier on the list left them, also when it died earlier in real time; a clock started by a death settled earlier does not move back. PL: śmierć każdej postaci zastaje użycia i zegar takie, jakie zostawiły postacie wyżej na liście; zegar puszczony wcześniej nie cofa się. Mark: carried by "Decisions in play" (D-240) and To do 3, no row of the settlements names it.
- **D-242** (To do 3): EN: of two deaths for the account's last use the earlier in real time takes it, and the clock of the returns runs from the moment of the death that started it. PL: o ostatnie użycie wygrywa śmierć wcześniejsza w czasie realnym, a zegar powrotów biegnie od chwili tej śmierci. Same mark as D-240.
- **D-428** (row 10): EN: *Verification* says the earning loop starts with the full number of uses. PL: pętla startuje z pełną liczbą użyć. Mark `row 10`.
- **`solved-map-manual-run`**: EN: a manual run of a solved map adds no practice. PL: takie przejście nie dodaje wprawy. **`trip-transfer`** and **`trip-run-end`**: EN: the exception for a manual run of a solved map is gone. PL: wyjątek znika. **`resurrection-renewal`**: EN: the resurrection holds a number of uses; the death that uses up a use of a full stock sets the moment of the next return, a later death leaves it, at that moment one use returns and the moment moves on by the renewal time while the stock is not full, the first completion of a new map returns one use while the stock is not full, a death with no use left or of a character with no practice leaves the uses and the moment, and a moment equal to the moment of return counts as returned. PL: wskrzeszenie ma użycia, wracają po kolei na jednym zegarze, pierwsze rozwiązanie nowej mapy przywraca jedno. Mark `row 3`/`row 4` (rows' meaning, wording mine). Identifiers, *Method* `test`, *Part* and *Derives from* unchanged.
- **Glossary `resurrection`** (row 9): EN: a resurrection is what the account has, one for all its characters, with a number of uses, one of which a death of a character with practice uses up while any is left; a single use is not a resurrection. PL: drużyna ma jedno wskrzeszenie, które ma użycia; pojedynczego użycia nie nazywa się wskrzeszeniem. Mark `row 9`. *Not* now reads `one of its uses — "use"` (it was `none`); this *Not* line is my wording of row 9 and so part of the row.

The only pair of examples I wrote is the one of D-438 (`the cycle's`, below); no pair is kept only until a test holds a sentence.

### Pair of examples of D-438, word for word, for the description to quote under the entry (`the cycle's`)

- complies: a new map whose requirement of practice, items and equipment is met by what the first solutions and the manual runs of the maps before it gave, a measurement of the balance instrument showing it with the best reference program and no earning loop
- violates: a new map whose requirement is met only by what an earning loop gathers over hours of real time; a requirement of pace counted in days

## Choice: *Verification* of D-438

I chose **an agent compares a change with the decision** (the pair above), and **no test of the balance instrument**, no invariant.
- Way rejected: a test of the balance instrument that holds the sentence. The sentence says each next map can be solved with what the maps before it gave; a test of that runs a measurement over seeds of the maps (the 500 seeds of three maps the task keeps out of the gate), or pins the 20% share, which the answer to question 7 does not make a requirement of later maps. A test of the instrument that does not run the measurement (its table, its labels) holds D-428, not this sentence.
- Cost if wrong: a later task adds a map that only the earning loop gets past and no check fails; only the reviewer's comparison, and the measurement the cycle of that task runs by the pair's first line, stand in the way. If a cheap test later appears (for instance a measurement on few seeds with the share named by that task), the entry takes the `tests:` clause then.

## Checks

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` -> exit 1, "86 errors". Nothing reported in `foundations/` as an error. Every line is either a `decision:` line of a test file quoting a sentence I rewrote (82 lines) or the "listed" line of an invariant I reworded whose citing tests did not change (4 lines; none is an error of the entry). The same output before the commit and after it. Lines by file (the file, then the decision and the lines):
  - `tests/sim/catch-up.test.mjs`: D-190: 506,684,711,712,941,942,966,967,986,1011,1012,1033; D-240: 627,655,945; D-242: 563,604,628,969
  - `tests/sim/completion.test.mjs`: D-190: 553,586; D-214: 585
  - `tests/sim/data.test.mjs`: D-190: 429
  - `tests/sim/death.test.mjs`: D-189: 308; D-190: 121,142,143,157,180,200,272,309,327,449,461,507,508,559,580,581,611,612,649; D-220: 108,122,130
  - `tests/sim/loop.test.mjs`: D-189: 760,941,1058,1115,1389; D-190: 761,762,803,804,842,843,1101,1132,1133,1326,1327,1368,1390
  - `tests/sim/run-record.test.mjs`: D-189: 329
  - `tests/sim/team.test.mjs`: D-220: 59
  - `tests/sim/trip.test.mjs`: D-189: 72,73,363,585,619,643,798,809,821; D-214: 71,662
  - `tests/view/account-screen.test.mjs`: D-189: 3130
  - `tests/view/clock.test.mjs`: D-190: 320,392,538,581,582; D-242: 585
  - `tests/view/maps-screen.test.mjs`: D-189: 749
  - `tests/view/trip.test.mjs`: D-189: 175
  - invariants listed (`foundations/invariants.md`): `trip-transfer` (cited by `tests/sim/catch-up.test.mjs`, `loop.test.mjs`, `trip.test.mjs`), `trip-run-end` (same three), `solved-map-manual-run` (`tests/sim/saved-game.test.mjs`, `trip.test.mjs`), `resurrection-renewal` (`tests/sim/catch-up.test.mjs`, `completion.test.mjs`, `death.test.mjs`, `loop.test.mjs`, `tests/view/character-screen.test.mjs`, `clock.test.mjs`, `team-lines.test.mjs`).
  - Of the sentences the tests quote, these stayed word for word and report nothing: D-179's two quoted sentences, the second sentence of D-189 (loot reaches the chest on completion; practice of the earning loop), D-242's first two sentences, D-240's first, D-428's three.
  - The lines in tests that quote D-190, D-189, D-214, D-220, D-240, D-242 are the plan's later slices' (2, 3, 5-9, 12, 13) to rewrite; none was touched here.
- The full gate (`npm test` bare) and the full `foundation_check.py` without the skip switch did not run: not mine (handoff, section 3 of the method). The `check_instructions.py` did not run either.
- A test written first, an invariant's test seen failing: none; the slice has no code and no test (the invariants' tests are Slices 2, 3, 6-9).

## Own-work check (WAY-164)

- Requirement most likely not met: To do 7 and the slice's rule "keep each sentence the task does not change word for word, and keep the start of a sentence you reword where its meaning allows, since tests quote sentences by their `decision:` lines", and the limits of the-way on a rewritten decision (a paragraph of at most three sentences and 300 words, 600 in all), D-190 having been over them.
- Check: the foundation check above reports no limit error for D-189, D-190, D-240, D-242 or any entry of `foundations/`; and by the list of the quotes in the tests (made with a script over the tracked test files, saved under my working copies and removed) the sentences that stayed unchanged are not reported (listed above), while every reported quote is of a sentence the task changes (D-189 sentence 1 and 3, D-190 sentences 1-3, D-214 sentence 2, D-220, D-240 and D-242 the last sentence, D-189 and D-190 are the longest). Result: no sentence the task leaves alone is reported. The sentence-1 starts are kept as far as the meaning allows ("A manual map run that first solves its map pays practice", "A character's death takes what it carried and pays nothing of its map run; when", "Characters meet only ... finds").
- A second check: grep of the three files for "from nowhere", "takes nothing from the chest", "D-251", "resurrection ready", "ready resurrection": what remains is in entries outside the slice (listed below) and in a historical clause of D-220's rationale.

## Reach beyond the dispatch

None beyond the handoff's *Read* except: `foundations/decisions.md` read by search for the next free number (D-437 the highest, withdrawn up to D-361), `git grep`/`grep` of `resurrection`, `D-189`, `from nowhere` in `foundations/` (to find neighbours), the sentences of D-218, D-251 and D-217 beside D-190. D-216 and D-217 were read in part (the wording of the lines) as they were next to D-190; they are Slice 11's.

## Questions and concerns (no blocking question)

Entries I found stale and did not change; each is for the orchestrator to place in a slice or leave:

1. `D-386` (`foundations/decisions.md`, section "Saving the game state ..."): "the moment the account's resurrection is ready" in its binding sentence and in what it holds; after Slice 5 the state stores the moment of the next return of a use, present only while some use is used up. Not changed (handoff). Recommend Slice 5 or the return step rewords it with the stored shape (task question 15).
2. Glossary `generation number`: "because no resurrection is ready" -> should read "because no use of the resurrection is left". Not changed (handoff).
3. `D-194` (*Rejected*): "while a manual run of a solved map is to pay nothing (D-189)" - after this change it pays no practice but brings loot out. Its sentence is right and unchanged. Recommend Slice 3 or the return step changes "pay nothing" to "pay no practice".
4. `D-251` (to be withdrawn by Slice 11): still stands; its heading is referenced by nobody now in D-189. `D-215` (Slice 11): heading and sentence say the run "pays and takes nothing". `D-216`, `D-217`, `D-329` Slice 11.
5. Decisions that use "ready"/"renewal" of the resurrection in the old meaning and outside my list, found by search: `D-216`'s *Verification* and sentence (Slice 11); `D-217` (Slice 11); the text "a death with no resurrection ready takes what waits with the rest" in the decision on the earning loop's gathered practice (`foundations/decisions.md`, line 8661 as the file stands now); `D-239`'s *Verification* "a death a resurrection covers" (still true: a use covers a death); `D-04`'s *Verification* "the moment a resurrection is ready" (generic, still true as a moment of return); `D-246` "wskrzeszenie zużyte" (kept by the task). None was changed. Recommend leaving all but the first (line 8661) as they are, and rewording "a death with no resurrection ready" to "a death with no use of the resurrection left" with the next slice that touches the earning loop's practice.
6. D-190 claims in its *Rationale* a calculation of 58% / 12 hours; I took them from the answer to question 4 without recomputing the 58% (the task's own figure), only checked that 3 uses at a share of 25% match 1 - 0.75^3 = 58%. A 12 hours full stock follows from 3 x 4 hours.
7. In `resurrection-renewal` the sentence became long; it is still one sentence and holds only what the task's To do 3 and the answers to questions 3 and 5 give. If the reviewer finds it two rules, the split would give a new identifier (not done: handoff names the identifier).
8. The glossary rule "A changed meaning" asks that every use of the word whose meaning moves be rewritten in the same change; the uses are in decisions outside my list (items 4 and 5) and in the guidelines and code, which later slices change; I named them instead.

## Working copies

- `.runs/slice-01-executor` held a script that listed the `decision:` quotations of the tracked test files and its outputs, a diff dump and the check output; removed (see the last line of this report) before I returned.

## Unread material

- Handoff: read whole in two parts. `foundations/decisions.md:5420-5992` (the section) read in part: the heading and the first entries of the section, D-214, D-215, D-404 and the end of the section; `foundations/part_map.md:33-64`, `127-137`, `159-165` not read (no part of the slice's three files is in doubt: `Scope` of D-438 is `simulation`, which the other entries of the slice carry). `.the-way/elements/glossary/examples.md`, `elements/invariants/examples.md` and WAY-03 of the-way's log read; the entries those example files name besides WAY-03 (the invariants `instruction-file-imports`, `gate-exit-code`, `script-imports`, ...; the glossary terms `invariant`, `foundation`) not read. `.the-way/elements/common/projected_mode.md` and the files of the part map skill not read (not the step that names them). The task's lines 129-141 (Needs, To do items already copied in the handoff) read from the handoff copy, not from `task.md` itself. D-219, D-221 read whole; D-386 read whole; D-428, D-240, D-242, D-220, D-190, D-189, D-179, D-214 read whole. `foundations/glossary.md:302-306` (`wall`) and `foundations/invariants.md:1148-1157` (`catch-up-state`), `death-settled-once` read in the ranges; `wall` not read at all.
- The sentence of `.the-way/task-cycle/skill/foundation_step.md` was read whole; the "critique before collective review" step is not applicable (a change's entries are no such set).

## Searches not found or unclear

- The task names D-251's reference in D-189 and "D-329 *Verification*"; D-329 is Slice 11's and I did not search it.
- The plan says the new decision may go in the section "Maps: their content, time and solving"; no section of the log is closer to a progression principle, but the section's own sentence ("What a map is made of and its numbers, how time and pace pass in a map run, and how a map is solved and opens the next one") speaks of solving, not of a principle; I used it as the handoff proposes.
- Unclear: the task's To do 3 sentence "śmierć każdej postaci zastaje liczbę użyć i zegar takie, jakie zostawiły postacie wyżej na liście, także gdy zginęła wcześniej w czasie realnym" - I read it as the catch-up order only (D-240), and D-242 takes only the open game's order in real time; if "także gdy zginęła wcześniej" was meant to apply in the open game too, D-242's sentence would be wrong; I think not (D-242 says the earlier in real time takes it in the open game).
- Not found: a higher decision this one serves (searched the log for "absence", "while away", the top-level decisions D-01..D-09): *Relations* `none`.
