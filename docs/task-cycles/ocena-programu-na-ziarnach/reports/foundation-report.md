# Report — the agent of the plan's Foundation entries, task `ocena-programu-na-ziarnach`

**Status:** `done with concerns`

## Files changed and commits

- `foundations/decisions.md` — +188 −32 (two new decisions in a new section „Judging a program”, placed after „Balance measurement” and before the list of withdrawn numbers; edits of D-22, D-190, D-241, D-243, D-246, D-325, D-329)
- `foundations/glossary.md` — +12 −0 (terms `judging` and `loop record`, appended at the end)
- Commit `a65b8fa4` on `task/ocena-programu-na-ziarnach` (parent `c36e2739`): `docs: :card_file_box: record the judging of a program on twelve fixed seeds and what the game remembers of it (D-439, D-440), start an earning loop after a judging anew (D-243), show the judging in „Kto idzie” and on the screen Mapy (D-329, D-325), hold the loop record in the earning loop and its report line (D-241, D-246), give D-22 the seeds of a judging, correct the rationale of D-190, and add the terms judging and loop record`. Files added by path; author address checked (`mariusznn@gmail.com`).

## Checks

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` — exit 1, 7 errors, run before the commit and again after it, same result. Every error is a line `decision: D-243` whose quotation no longer stands in D-243, because the first sentence of D-243 changed (see "Quoted passages" below):
  - `tests/sim/loop.test.mjs:237`, `:304`
  - `tests/view/account-screen.test.mjs:2683`, `:2807`, `:2975`
  - `tests/view/maps-screen.test.mjs:494`, `:700`
  No other error; no length error (paragraph and entry limits of WAY-05 hold for every decision changed or added); no "nothing holds it" error for D-439 and D-440. No line listed in the second kind names a decision I touched. Full output kept at `.runs/task-cycles/ocena-programu-na-ziarnach/reports/foundation-check-output.txt`.
- Not run: the product's gate (`npm test`) — not mine, as the handoff says; the check without `--skip-test-citations` — the handoff forbids it.

## Own-work check

- Requirement most likely missed: "every changed decision keeps word for word each passage a test quotes in a line `decision:`". Check: the foundation check above, which compares every `decision:` quotation with the binding sentences. Result: every quotation of D-22, D-241, D-246, D-325 and D-329 still stands; only the seven quotations of the first sentence of D-243 broke, by design.
- Second check: `git grep` for `decision: D-(243|329|325|241|246|22)` listed every quoted passage before I wrote (6 decisions, 21 distinct quotations); I wrote each change as a sentence or paragraph of its own, or as words inside a sentence after the quoted prefix, except D-243.

## Quoted passages

- **D-243 changed a quoted passage.** Old first sentence ended "…takes the program of that character's list „Program:” and acts at once on the click"; the new meaning makes "acts at once on the click" untrue for a program that loses on some seed, so it now reads "…, and takes the program of that character's list „Program:”, which its click first judges anew (D-439)." Test files quoting the old passage, for the slices that change them (plan: Slices 11 and 12): `tests/sim/loop.test.mjs` (lines 237, 304), `tests/view/account-screen.test.mjs` (lines 2683, 2807, 2975), `tests/view/maps-screen.test.mjs` (lines 494, 700). A shortened quotation such as "The player starts an earning loop with „Puść w pętlę”, which stands at each character in the section „Kto idzie” of the card of each solved map, beside „Wejdź”" stands in the new sentence. The two other quoted sentences of D-243 ("For that list the start counts as a send…", "At a character in an earning loop…") are unchanged.
- D-241: kept every quoted passage; the loop record is a new sentence between the two quoted ones. The plan expected Slice 5 might have to follow a quotation; it does not need to.
- D-246: kept; the loop record is a third paragraph. D-325, D-329, D-22: kept; changes are words after the quoted prefix (D-325, D-329) or a new paragraph (D-22, D-329).

## Entries

Each with one sentence of meaning in English and in Polish, and its mark.

1. **D-439 — How does the game judge a program before an earning loop?** (new) — mark `the cycle's`. Paragraph 1 is the projected entry word for word; paragraph 2 holds the sentences of rows 1, 2 and 3; *Rationale* and *Rejected* are the projected entry's, followed by the reasons, costs and ways not chosen of Questions 3, 4 and 9 (the sources of rows 1–3). Marked `the cycle's` because no row and no projected entry carries the whole entry (the projected entry plus three rows), and because *Verification*, which the projected entry left `TODO`, holds a pair I added (kept until the tests of Slices 3, 7, 10 and 11 hold the sentences). *Relations* (also `TODO` in the definition): `derives from D-18 · derives from D-179 · derives from D-409`. *Rejected* holds the ways the human weighed, not `unknown`, since the human's own statements name them.
   - EN: The game runs a character's program on twelve fixed seeds of a map, on any map open to the player and at any character, with what the earning loop would take from the chest, and shows each seed as solved, a death with cause and minute, or undecided at a cap of game minutes from the data; it takes nothing, pays nothing, settles no death and discovers nothing.
   - PL: Gra puszcza program postaci na dwunastu stałych ziarnach mapy, na każdej mapie, na którą gracz może wejść, i przy każdej postaci, z tym, co pętla wzięłaby ze skrzynki, i pokazuje każde ziarno jako rozwiązane, śmierć z przyczyną i minutą albo bez rozstrzygnięcia po pułapie minut z danych gry; nic nie bierze, nic nie płaci, nie rozlicza śmierci i nic nie odkrywa.
2. **D-440 — What does the game remember of a judging, and what stands beside the list „Program:”?** (new) — mark `row 4`. *Relations:* `derives from D-439 · derives from D-165`. *Rejected* from Questions 2 and 15 (the row's sources); Question 8's ways not chosen are ways of the process and stay out.
   - EN: The saved game keeps the last judging of each character, program and map — twelve seed results and the equipment taken — and beside „Program:” stands „szczelny: 12 z 12” or „{n} z 12”, with a note and no badge when the chest holds less than the judging took; a change of the program's rules, groups or trip plan erases its judgings, and a death that takes all practice erases all the character's judgings.
   - PL: Zapis gry trzyma ostatnią ocenę każdej trójki postać, program i mapa — dwanaście wyników ziaren i wzięte wyposażenie — a przy „Program:” stoi „szczelny: 12 z 12” albo „{n} z 12”, z dopiskiem i bez odznaki, gdy w skrzynce jest mniej, niż ocena wzięła; zmiana reguł, grup albo planu wyprawy kasuje oceny programu, a śmierć zabierająca całą wprawę kasuje wszystkie oceny postaci.
3. **D-243 — How does the player start an earning loop?** (changed) — mark `row 5`. New second paragraph; *Rationale* and *Rejected* gain the costs and ways not chosen of Questions 1 (a, c) and 14 (a, c).
   - EN: „Puść w pętlę” first judges the program anew with what the earning loop would take now; the earning loop starts at once when all twelve seeds are solved or the result equals the one standing under the character from the button of a judging, and otherwise the result stands, a warning stands above the button, the button reads „Puść mimo to” and a second click starts it.
   - PL: „Puść w pętlę” najpierw ocenia program od nowa z tym, co pętla dostałaby teraz; pętla rusza od razu, gdy wszystkie dwanaście ziaren jest rozwiązanych albo wynik jest taki sam jak ten pod postacią z przycisku oceny, a inaczej wynik staje pod postacią, nad przyciskiem staje ostrzeżenie, przycisk mówi „Puść mimo to”, a pętlę puszcza drugie kliknięcie.
4. **D-329 — What stands at each character in the section „Kto idzie”, and in what order?** (changed) — mark `row 6`. The first sentence gains the remembered judging beside „Program:”, the warning of unsolved seeds above „Puść w pętlę”, the button of a judging beside the buttons and the result under them; a new second paragraph gives the button's texts, the result's texts and how long it stands. *Rationale* gains a sentence and the cost of the word „ziarno” from Question 8.
   - EN: At each character stand also the remembered judging beside „Program:”, the button „Oceń na 12 ziarnach” („Oceniam…” while counting) beside „Wejdź” and „Puść w pętlę”, and under them the result — heading, twelve seed lines and the sentence that the judging costs nothing — until another program is picked, a new judging or leaving the card.
   - PL: Przy każdej postaci stoją też zapamiętana ocena przy „Program:”, przycisk „Oceń na 12 ziarnach” („Oceniam…” w trakcie liczenia) obok „Wejdź” i „Puść w pętlę”, a pod nimi wynik — nagłówek, dwanaście wierszy ziaren i zdanie, że ocena nic nie kosztuje — do zmiany programu, ponownej oceny albo wyjścia z karty.
5. **D-325 — What does the screen Mapy show?** (changed) — mark `row 7`. *Rejected* gains Question 1's way d (judging on the screen of a map run), *Rationale* one sentence.
   - EN: The section „Kto idzie” of the card of a map holds the judging of the characters' programs too.
   - PL: Część „Kto idzie” karty mapy niesie też ocenę programu postaci.
6. **D-241 — How does the game state hold earning loops?** (changed) — mark `row 8`. *Rationale* and *Rejected* gain Question 7's cost and ways b, c, d.
   - EN: Each earning loop also holds the number of map runs completed in a row with no death, which a death that does not stop the loop sets back to zero, and the largest such number, its loop record.
   - PL: Każda pętla trzyma też liczbę przejść domkniętych z rzędu bez śmierci, którą śmierć niezatrzymująca pętli zeruje, i największą taką liczbę, rekord pętli.
7. **D-246 — What does the player read after being away?** (changed) — mark `row 9`. New third paragraph; *Rationale* and *Rejected* gain Question 7's cost and ways.
   - EN: The line of a character whose earning loop goes on ends with its loop record as plain text, „ · najdłużej bez śmierci: {n} przejść z rzędu” with its declension, read from the loop at each drawing and absent at zero.
   - PL: Wiersz postaci, której pętla trwa, kończy się zwykłym tekstem jej rekordu, „ · najdłużej bez śmierci: {n} przejść z rzędu” z odmianą, czytanym z pętli przy każdym rysowaniu i nieobecnym przy zerze.
8. **D-22 — Where does the simulation's randomness come from?** (a paragraph added) — mark `row 10`. *Rationale* gains one sentence; *Rejected* unchanged (the row's source keeps no way).
   - EN: A judging runs on the twelve fixed seeds of its map, the same each time, and takes no new seed.
   - PL: Ocena biegnie na dwunastu stałych ziarnach swojej mapy, tych samych za każdym razem, i nie bierze nowego ziarna.
9. **D-190 — What does a character's death take?** (rationale corrected, in the wording task 24 left) — mark `row 11`. The sentence "the game has no sweeping over many seeds, … when none of its uses is left. A sweep over many seeds can help assess the risk…" now reads "a judging of a program on twelve fixed seeds of a map (D-439) shows at no cost where the program loses before the earning loop, but it covers its twelve seeds alone, so an earning loop on other seeds may still cost the character all its practice when none of its uses is left. A judging can help assess the risk on the seeds it checks, but no result of it promises that a program is safe on every seed." Binding sentences unchanged.
   - EN: The rationale of D-190 no longer says the game has no judging over many seeds; it says the judging covers only its twelve seeds.
   - PL: Uzasadnienie D-190 nie mówi już, że gra nie ma oceny na wielu ziarnach; mówi, że ocena obejmuje tylko swoje dwanaście ziaren.
10. **judging** (glossary, new) — mark `row 12`. *Not:* none (the three other uses of "judging" in tracked English text — `foundations/decisions.md` lines 1624 (an agent judging motion), 4293 (D-401's rationale) and 11653 (D-415's example), as they stood before this change, and one test title in `tests/password-measurement.test.mjs:408` — use the field's meaning of assessing).
    - EN: A judging is twelve runs of one character's program on the twelve fixed seeds of one map, which are no map run of the character and can each end at a cap of game minutes.
    - PL: Ocena to dwanaście przejść jednego programu postaci na dwunastu stałych ziarnach jednej mapy, które nie są przejściem postaci i każde może skończyć się na pułapie minut gry.
11. **loop record** (glossary, new) — mark `row 13`. *Not:* none (no use in tracked files before this change).
    - EN: A loop record is the largest number of map runs of one earning loop completed in a row with no death, counted from its start and gone with it.
    - PL: Rekord pętli to największa liczba przejść jednej pętli zarobkowej domkniętych z rzędu bez śmierci, liczona od jej startu i znikająca razem z nią.

Clauses taken from the accepted task beyond the row's own words, named for the reviewer: D-246 "stands nowhere where it is zero" (To do 7); D-241 "a death that does not stop the earning loop sets back to zero" (the row's "bez śmierci", with To do 7's death of a character with no practice); D-243 "takes what the earning loop would take from the chest at that moment" (Question 1's answer); D-329 "judges the program of the character's list „Program:” on the map of the card" (Question 1's answer); D-440 "A judging, the one „Puść w pętlę” runs included (D-243), replaces the judging remembered…" (Question 1's answer: "nowa ocena zastępuje zapamiętaną") and "„12 z 12” standing in its place" (To do 6). I did not write the rest of To do 6 (rename erases nothing, deletion, the load's refusal, cap or map data changes, a covered death and a rank purchase erasing nothing) into D-440, because row 4 does not carry it; it stays in the task for the slices.

## Added pairs, word for word

All are pairs for the part no test holds yet; each stays until a test of a later slice holds its sentence, and the return step removes the part the test holds.

- **D-22**, lead "For the seeds of a judging, an agent compares a change with the part no invariant and no test holds:"
  - complies: two judgings of one program of one character on Las, with one chest, giving the same twelve lines, their runs taking the same twelve seeds of the map
  - violates: a judging that draws a new seed for its runs, or takes the seeds from the seed of the character's last map run
- **D-241**, lead "For the map runs completed in a row and the loop record, an agent compares a change with the part no invariant and no test holds:"
  - complies: an earning loop that completes three map runs, loses one to a death a use of the resurrection covers and completes two more holding 2 in a row and a loop record of 3, in the open game and in the catch-up alike
  - violates: a death a use of the resurrection covers leaving the number in a row as it was; a loop record that stays with the character after its earning loop stops
- **D-243**, lead "For the judging that „Puść w pętlę” runs first, an agent compares a change with the part no test holds:"
  - complies: on Las, a click of „Puść w pętlę” at a program that solves all twelve seeds starting the earning loop at once; at a program that dies on two seeds the result under the character, „Na 2 z 12 ziaren program mapy nie rozwiązuje.” above the button, „Puść mimo to” on it and the earning loop started by the second click; at a program whose result with two deaths stands under the character from „Oceń na 12 ziarnach”, a click that gives the same twelve lines starting the earning loop at once
  - violates: „Puść w pętlę” starting an earning loop on the first click at a program that dies on some seed while no result with the same lines stands under the character; „Puść w pętlę” starting from a result that stands under the character without judging the program again
- **D-246**, items added to its existing pair (lead now "…, for a later earning loop of a character whose earning loop „Zatrzymaj” stopped, and for the loop record at the end of a line, …"):
  - complies (added): „Ola: 240 min · skrzynka: jagoda +12 · najdłużej bez śmierci: 3 przejścia z rzędu” for an earning loop whose loop record is 3, the number following the earning loop at each drawing of the section
  - violates (added): the loop record in `positive` or beside the record of an earlier earning loop; „ · najdłużej bez śmierci: 0 przejść z rzędu”; the loop record at the end of a line of an earning loop a death stopped
- **D-325**, items added to its existing pair (lead now "…, and for the judging of a program in „Kto idzie”, …"):
  - complies (added): „Oceń na 12 ziarnach” at each character of „Kto idzie”, on a solved map and on one not yet solved
  - violates (added): the judging of a program started only from the screen of a map run
- **D-329**, items added to its existing pair (lead now "…, and for the button of a judging, its result and the judging remembered beside „Program:”, …"):
  - complies (added): „Oceń na 12 ziarnach” beside „Wejdź” at each character on a solved map and on one not yet solved, reading „Oceniam…” while it counts; under the character „Ocena na 12 ziarnach: 10 z 12 rozwiązanych”, twelve lines „Ziarno {i}: …” and the sentence that the judging costs nothing, gone when another program is picked on the list
  - violates (added): the result of a judging still standing after another program is picked on the list; the result of a judging standing at another character than the one judged
- **D-439**, lead "an agent compares a change with the decision:"
  - complies: a judging of a program on Las giving twelve lines, and the same twelve at the next judging with the same chest and character; a run that neither completes nor dies by game minute 4000 ending undecided and counted as unsolved, and one that completes or dies in game minute 4000 counted as solved or as a death; after the judging the chest, the character's practice and ranks, the uses of the resurrection, the Understanding and the program as they were, also at a character in an earning loop; the take list „jagoda 10” with 4 berries in the chest entering each of the twelve runs with 4 berries; „Oceń na 12 ziarnach” acting on a map not yet solved
  - violates: a judging that takes items from the chest or pays practice; a death in a judging that uses up a use of the resurrection; a judging that writes a discovery into the Understanding or a rule into the program; a judging refused on a map not yet solved or at a character in an earning loop; the cap of game minutes written as a number in the code of the simulation or of the view
- **D-440**, lead "an agent compares a change with the decision:"
  - complies: a judging of the program „Ostrożny” of the character Ola on Las that solved all twelve seeds showing „szczelny: 12 z 12” beside the list while it shows „Ostrożny”, and nothing beside the list while it shows another program; the same after a load; after the chest lost the berries the judging took, „12 z 12” with „oceniono z zapasem, którego dziś nie ma w skrzynce” and no badge, and with more berries than it took the badge as it was; an edit of a rule of „Ostrożny”, and a death of Ola with no use of the resurrection left, each leaving no judging remembered for it
  - violates: the cause or the game minute of a line kept in the saved game state; the badge still standing after the chest lost what the judging took; a judging remembered for a program and a map with no character; a judging of Ola kept after the death that took her practice

## Choices, with the way rejected

- **No `tests:` clause in D-439 and D-440 yet.** The orchestrator's remark (c) allowed naming the test files the slices will write; the decisions' template and `elements/decisions/skill/SKILL.md` step 3 give the clause only "once their lines `decision:` stand" and forbid paths in it, and for a sentence a later slice's test will hold they give a pair for now. I followed the template. The return step writes the `tests:` clauses from the `decision:` lines of `tests/sim/judging.test.mjs`, `tests/sim/saved-game-judgings.test.mjs` and `tests/view/maps-screen.test.mjs`. Cost if wrong: none to the product; one more edit at the return step.
- **D-243's quoted passage changed rather than kept with a condition after it.** Keeping "…and acts at once on the click" and appending "where…" would keep seven test lines valid while their quotation, read alone, says what is no longer true; the plan already assigns Slices 11 and 12 to those tests. Cost if wrong: seven quotations to shorten, which the plan schedules anyway.
- **New section „Judging a program”** at the end of the log, rather than the end of „Earning loop and time away”, whose sentence covers how an earning loop runs and the time away, not a judging. The request names that section.
- **D-439's Rejected placement of Question 1's way d** in D-325 (where the judging stands on the screens) rather than in D-439; Question 1's ways a and c in D-243; Question 7's ways in both D-241 and D-246, as both rows name Question 7 as their source.
- **Words.** The judging's runs are called "runs", never "map runs", so the glossary's `map run` keeps its meaning; "the cap of game minutes" is always qualified, apart from the map's "entry cap".

## Concerns and findings for the orchestrator

1. **D-165 lists the records of the game state that name a program** ("the program the copy of a map run belongs to, the program a character used last, the program picked for a character, the program with which a character last entered a map and the program the firing counts stand beside after „Zakończ”"); a remembered judging is a new such record and is not on the list. D-440 links it by `derives from D-165`; whether D-165's list gains the judging is outside my handoff — a change of D-165 by its skill, or leaving the list as examples.
2. **D-243's `tests:` clause** still describes the present tests ("starting the earning loop at once on the click with the program…"); it describes those tests truly until Slices 11 and 12 change them, and the return step rewrites it.
3. **An edge no source settles:** what „Puść mimo to” does when, between the two clicks, the player picks another program (the result under the character goes, D-329) or the chest changes. Row 5 says only that the second click starts the earning loop. The slices of the screen (10, 11) will meet it; I wrote nothing about it.
4. **D-251 is withdrawn** (remark a). No entry I wrote cites it. To do 10 of the task names "jak ostrzeżenie D-251" for the role of the note on the stock: the styleguide slice (9) must not cite D-251; the role `warning` stands in the styleguide's table of roles.
5. **D-439 is marked `the cycle's`** by the letter of `foundation_step.md` (no single row or projected entry carries it whole, and its *Verification* was `TODO` in the definition); every binding sentence of it comes from the approved projected entry or from accepted rows 1–3, so the request can put it before the human with that said.

## Reaches beyond the handoff

- `foundations/part_map.md`, first 150 lines (entries of `browser-view`, `simulation`, `account-server`, `build-tools`, `balance-tools`, `agent-workflow`) — to name the touched parts for the index, as "Reading the foundation" step 1 gives.
- `foundations/invariants.md`, `foundations/environment_facts.md`: searched only, for "new seed", „Puść w pętlę”, „Kto idzie”, "sweep", "judg", "twelve" — the step-2 search of the whole foundation; one hit (an invariant on Skraj lasu's measurement), not touching the entries.
- Decisions opened whole beyond *Decisions in play*: D-04's rationale lines and D-24 (both mention a sweep over many seeds — still true, of the balance instrument), D-55, D-135, D-239, D-240, D-242, D-244, D-245, D-247–D-250, D-274, D-287, D-327, D-328, D-330–D-333, D-389, D-438 — found by the search or by sharing the sections I wrote in. None needed a change; D-287 and D-274 agree with the button of a judging (an act the simulation allows, a plain button).
- `a note in the author's private notes` — the user's instructions require it before a commit.

## Working copies

- `.runs/foundation/` held the index of decisions (`sections.md`, `index.md`, from `decision_index.py`), two outputs of the foundation check and the commit message file. Removed (`rm -rf` by full path) before returning; the second check output is kept as `.runs/task-cycles/ocena-programu-na-ziarnach/reports/foundation-check-output.txt`. No remainder.

## Unread material

- `foundations/decisions.md`: not read whole, by the method — read the index of the selection (80 decisions in full: the sections „Earning loop and time away”, „Screen Mapy and Siedziba”, „Trip plan, chest and items”, „Team, body, death and resurrection”, „Saving the game state and the previous save”, „Balance measurement”, plus the decisions of *Decisions in play*; 275 by heading, all headings run through) and the entries listed above whole.
- `foundations/invariants.md`: the invariants whose *Part* names `simulation` or `browser-view` were not read whole (way of working, "Reading the foundation" step 3); searched by words only. The plan writes no invariant, and no invariant names a decision I changed in a way the change alters, but I did not verify each invariant's *Derives from* against D-243.
- the-way's `foundations/decisions.md` WAY-03 (the example decision): read its binding sentences and *Verification* (about 20 lines), not its *Rationale* and *Rejected*.
- the-way's `foundations/glossary.md`: headings read, and the two example entries `invariant` and `foundation`; other entries not read.
- `.the-way/elements/common/projected_mode.md` and the skills' `projected.md`: not read — not projected mode.

## Searches not found or unclear

- `decision_index.py --decision D-251` stops with "no decision D-251": D-251 is withdrawn (remark a); expected.
- "judging" in tracked English text outside `.the-way`: four uses, all in the field's meaning of assessing; "loop record": none.
- The handoff's plan table names Slice 5 for D-241 and Slice 13 for D-246 as depending on them, and its paragraph says Slices 5, 11 and 12 name test files whose quotations follow; only Slices 11 and 12 have a quotation to follow (D-243); D-241's quotations hold unchanged.
