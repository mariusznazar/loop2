Status: done with concerns

# Foundation entries, part A: report

Concerns in one line each (details below): D-451's *Relations* keeps a `TODO` for the decision of task 10 that does not exist yet (the request puts it before the human); D-455's *Rejected* reads `none considered` by my reading of the rule on process ways; four rows carry a clause the frozen task's *To do* gives and the row does not (listed under "Parts beyond the rows"); the rule of *To do* 7 that a piece put on in a loop leaves the chest at once has no row and no entry.

## Commits (on `task/wyposazenie-postaci`, by path)

- `97cadd77` — `foundations/glossary.md` (+6): the term `gear`.
- `5360248e` — `foundations/decisions.md` (+184): the new section "Gear of a character" and D-451 to D-462.

Files changed: `foundations/glossary.md` +6 -0, `foundations/decisions.md` +184 -0. Nothing else; no code, no test, no guideline.

## Where the entries stand

- The log is divided into topical sections and no section fitted the gear, so I opened a new one, "Gear of a character", at the end of the log before "Withdrawn identifiers", with its one-sentence description; the request names that section. All twelve decisions stand in it, in the order of the numbers.
- Numbering: the highest number of the log was D-450 (withdrawn numbers: D-80, D-251, D-254, D-357, D-358, D-359, D-361), so F1 is D-451 and F21 to F31 are D-452 to D-462 in the order of the plan's rows.
- The glossary term stands at the end of `foundations/glossary.md`.

| Plan row | Entry | Mark | Section |
|---|---|---|---|
| F1 | D-451 | projected | Gear of a character |
| F2 | glossary term `gear` | projected | glossary |
| F21 | D-452 | row 1 | Gear of a character |
| F22 | D-453 | row 3 | Gear of a character |
| F23 | D-454 | row 8 | Gear of a character |
| F24 | D-455 | row 10 | Gear of a character |
| F25 | D-456 | row 16 | Gear of a character |
| F26 | D-457 | row 18 | Gear of a character |
| F27 | D-458 | row 19 | Gear of a character |
| F28 | D-459 | row 21 | Gear of a character |
| F29 | D-460 | row 28 | Gear of a character |
| F30 | D-461 | row 31 | Gear of a character |
| F31 | D-462 | row 33 | Gear of a character |

## Checks

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after the first write: exit 0, `0 errors` (output kept in `.runs/foundation-A/check1.txt`).
- `python -B .the-way/elements/common/foundation_check.py` (without the switch) after the question and the *Rejected* of D-455 and the heading of D-460 were corrected: exit 0, `0 errors` (`.runs/foundation-A/check2.txt`).
- `python -B .the-way/elements/common/foundation_check.py` after both commits, so with the new files tracked: exit 0, `0 errors`.
- `python -B .the-way/instruction-files/check_instructions.py`: exit 0 (output not kept; run to see that no instruction file broke).
- Own check of the binding sentences (a script of mine, `python -I`): no `will`, `should`, capitals of RFC 2119 or exclamation mark in any binding paragraph of D-451 to D-462; binding word counts 39, 101, 67, 26, 69, 71, 52, 57, 74, 109, 97, 36, every paragraph at most three sentences.
- Not run: the product's gate (`npm test`), by the boundary of the stage. No test exists yet that holds a sentence of the new decisions (no `decision:` line), so the foundation check passes them only through their pairs of examples (below).

## Meaning sentences of each entry (what `request.md` takes)

Each pair "English / Polish" is one sentence.

- **D-451 (F1, projected).** EN: A character has gear apart from its backpack — what it wears, wields and has at hand — and an action that uses a piece of a kind kept piece by piece uses the piece the gear holds. PL: Postać ma wyposażenie osobne od plecaka — to, co ma na sobie, czym się posługuje i co ma pod ręką — i z niego czynność bierze sztukę przedmiotu. (The Polish sentence is the one of the approved definition, word for word.)
- **`gear` (F2, projected).** EN: Gear is what a character wears, wields and has at hand, apart from its backpack, and is not "equipment", which the foundation keeps for what a trip plan takes from the chest into a map run. PL: „Gear” to wyposażenie postaci: to, co ma na sobie, czym się posługuje i co ma pod ręką; słowo „equipment” fundament już zajął dla tego, co plan wyprawy bierze ze skrzynki. (The Polish sentence is the one of the approved definition, word for word.)
- **D-452 (F21, row 1).** EN: The gear belongs to the character and stays at it between map runs, the player puts a piece on from the chest on the screen Postać, and the trip plan of a program holds no gear. PL: Wyposażenie należy do postaci i zostaje przy niej między przejściami, gracz zakłada przedmiot ze skrzynki na ekranie Postać, a plan wyprawy programu wyposażenia nie obejmuje.
- **D-453 (F22, row 3).** EN: The player changes a character's gear outside an unfinished manual map run of that character, at a character in an earning loop too, and there the change acts from its next map run. PL: Gracz zmienia wyposażenie postaci poza niezakończonym ręcznym przejściem tej postaci, także postaci w pętli zarobkowej, a zmiana działa od jej następnego przejścia.
- **D-454 (F23, row 8).** EN: A slot of the gear that nothing fits yet stands on the screen Postać and is empty. PL: Miejsce wyposażenia, do którego nic ze skrzynki nie pasuje, stoi na ekranie Postać i jest puste.
- **D-455 (F24, row 10).** EN: The gear is no backpack: it takes no room of the backpack's cap, is counted by neither „Zapas poniżej” nor the line of the backpack, and none of the actions that take pieces from the backpack takes from it. PL: Wyposażenie nie jest plecakiem: nie liczy się do pułapu plecaka, do warunku „Zapas poniżej” ani do wiersza plecaka, a czynności, które biorą sztuki z plecaka, nie biorą ich z wyposażenia.
- **D-456 (F25, row 16).** EN: The gear has eight slots of one piece each, the stick fits the main hand and the bandage a pocket, and the strike with a stick takes its stick from the main hand alone. PL: Wyposażenie ma osiem miejsc, w każdym jedna sztuka; patyk pasuje do ręki głównej, opatrunek do kieszeni, a cios patykiem bierze patyk tylko z ręki głównej.
- **D-457 (F26, row 18).** EN: An empty slot of the gear stays empty until a rule puts something on it or an action that takes a piece from it is used, and that action then takes a fitting piece from the backpack into the slot and acts at once with no extra time. PL: Puste miejsce wyposażenia zostaje puste, dopóki reguła czegoś do niego nie założy albo postać nie użyje czynności, która bierze przedmiot z tego miejsca; wtedy czynność sama bierze pasującą sztukę z plecaka i od razu działa, bez dodatkowego czasu.
- **D-458 (F27, row 19).** EN: The action „Załóż — {rzecz}”, one for all slots, takes one piece of its item from the backpack into the slot the item fits (a pocket: the first empty one) and puts what the slot held into the backpack. PL: Czynność programu „Załóż — {rzecz}”, jedna dla wszystkich miejsc, bierze jedną sztukę rzeczy z plecaka do miejsca, do którego rzecz pasuje — do kieszeni: do pierwszej pustej — a to, co tam było, odkłada do plecaka.
- **D-459 (F28, row 21).** EN: The condition „Puste — {miejsce}” holds when the place it names holds nothing, „Kieszeń” when at least one pocket is empty. PL: Warunek „Puste — {miejsce}” jest spełniony, gdy wskazane miejsce wyposażenia nic nie trzyma, a „Puste — Kieszeń”, gdy choć jedna kieszeń jest pusta.
- **D-460 (F29, row 28).** EN: At the end of a map run of an earning loop the gear is merged slot by slot — a slot the player changed keeps the player's choice and the piece the map run left there goes to the chest or is lost with a full chest, any other slot takes what the map run left. PL: Gdy gracz zmienił wyposażenie postaci w pętli, a trwające przejście też je zmieniło, po końcu przejścia w miejscu zmienionym przez gracza obowiązuje jego wybór, a sztuka zostawiona tam przez przejście idzie do skrzynki albo, przy pełnej skrzynce, przepada, w pozostałych miejscach zostaje to, co zostawiło przejście.
- **D-461 (F30, row 31).** EN: The player changes the gear by touching the tile of a slot, which opens under it a pick of the fitting items of the chest and „Zdejmij”, and the choice moves a piece between the chest and the slot. PL: Gracz zmienia wyposażenie dotknięciem kafelka miejsca, które otwiera pod spodem wybór w komórkach jak wybór czynności — pasujące przedmioty ze skrzynki z ikoną, nazwą i liczbą sztuk oraz „Zdejmij” — a wybór przekłada sztukę między skrzynką a miejscem.
- **D-462 (F31, row 33).** EN: At a character in an earning loop the tiles show the gear set for its next map run, with the sentence „Postać jest w pętli. Zmiana działa od następnego przejścia.” above them. PL: Przy postaci w pętli kafelki pokazują wyposażenie ustawione na następne przejście, ze zdaniem „Postać jest w pętli. Zmiana działa od następnego przejścia.”

## Parts beyond the rows (marks stay as above; the request may want to show them)

None of these is a pair of examples or a link in *Relations*, and none is invented: each is a clause of the frozen task's *To do* that the row's one-sentence wording leaves out, put in so that the entry can be read alone. Mark and meaning above are the row's.

- D-452: "but for a death that D-190 says takes it" (rows 2 and 27, the exception the row's "stays at it between map runs" would otherwise contradict) and the sentence "The gear goes with the character into every map run, a manual one and one of an earning loop, and comes back with it" (*To do* 2).
- D-456: "each slot being of one place, the three pockets of the place „Kieszeń”" (plan Slice 1 and *To do* 5, bullet on „Puste”); without it D-459 has no word for the target „Kieszeń”.
- D-459: the sentence "A program names a place of the gear only by its kind … and the targets of the condition are the places some item of the data fits, a place gaining its target when the first item starts to fit it" and „Puste — Kieszeń” holding with one empty pocket (*To do* 5, bullet on „Puste”).
- D-460: the second sentence, "A slot counts as changed from the first piece the player puts on it or takes off it, whether or not it holds again the item it held at the start of the map run" (*To do* 7, bullet "Miejsce zmienione przez gracza").
- D-461 and D-462: nothing beyond the rows.

Rule of *To do* 7 with no row and so no entry: "a piece the player puts on at a character in an earning loop leaves the chest at once; one put on and taken off before the end of the map run returns to it at once" (the bullet "Skrzynka przy zmianie w pętli"). It binds Slice 2 and is held by that slice's tests only. If the human wants it in the foundation it is one more sentence of D-453; I did not add it because no row gives it.

## Pairs of examples (kept only until the tests of the slices hold the sentence; not "the cycle's")

Every new decision carries a `tests:` clause naming, in words, what the tests of the slices will hold, and a pair of examples for the part no test holds yet, because no `decision:` line can stand before the tests exist and the foundation check reports a changed or added decision that nothing holds. The return step removes the part each test holds. Word for word:

- **D-451** — complies: a character whose main hand holds a stick and whose backpack holds none, the strike taking the stick from the hand; an action that uses an item kept piece by piece taking the piece the slot of the gear holds. violates: a stick of the main hand counted among the pieces of the backpack's cap; an action that uses an item kept piece by piece and takes from the backpack a piece that a rule of the game, such as the best one, or a program naming a property or a piece, picks, while the gear holds a piece of that item. (The second sentence of D-451 binds only once items are kept piece by piece, which no test can hold before the task that makes them so; that part of the pair stays after the return step.)
- **D-452** — complies: a character whose program is switched keeping the stick of its main hand; an earning loop whose next map run starts with the stick the player put on and nothing more. violates: a list of gear in the trip plan of a program; an earning loop that takes a stick from the chest into an empty hand at the start of a map run.
- **D-453** — complies: a stick put on at a character in an earning loop, the map run going on keeping the gear it started with and the next map run starting with the stick. violates: a change of the gear at the character of a manual map run that waits in a pause; a stick put on at a character in an earning loop that stands in the hand of the map run going on.
- **D-454** — complies: the second hand standing on the screen as the empty tile of a slot with its pale name while no item of the data fits it. violates: a slot left off the screen until the player has an item that fits it.
- **D-455** — complies: a character with a full backpack of 15 pieces and a stick in its main hand, the stick standing outside the cap and staying in the hand when „Zasil — ognisko” takes its fuel. violates: „Zapas poniżej 1 szt. · Patyk” counting the stick of the main hand and so not holding for a character whose only stick lies there.
- **D-456** — complies: a pocket refusing a stick and the main hand refusing a bandage. violates: the strike taking a stick from a pocket; a pocket holding three bandages as a count of pieces in one slot.
- **D-457** — complies: a character entering a map run with an empty main hand and a stick in the backpack, the hand staying empty until the first strike, which takes the stick into it. violates: a stick moved from the backpack into an empty main hand at the entry to a map run, with no action having used it.
- **D-458** — complies: a character with a stick in the hand and another in the backpack, „Załóż — patyk” leaving one stick in the hand and one in the backpack. violates: „Załóż — patyk” that takes a stick from a pocket; an action „Weź do ręki — patyk” beside „Załóż — patyk” for the same item.
- **D-459** — complies: the rule „Puste — Kieszeń” → „Załóż — opatrunek” putting bandages into the pockets one by one until the pockets are full. violates: a condition „Puste — Kieszeń 2”; a condition „Puste — Głowa” offered while no item of the data fits the head.
- **D-460** — complies: a player who changed the main hand of a character in an earning loop while a map run took a bandage into a pocket, the main hand keeping the player's piece and the pocket the bandage. violates: the player's change of one slot putting the whole gear of the map run into the chest; a slot that the player emptied and filled with another stick counted as unchanged.
- **D-461** — complies: a touch of the tile of the slot „Ręka główna” opening a pick with „Patyk” and its number of pieces and, where the hand holds a stick, „Zdejmij”. violates: a drop-down list in the row of each slot; a grid of the chest's items standing under the figure with no choice of the slot.
- **D-462** — complies: a character in an earning loop whose map run going on holds a stick the player took off for the next one, the tile of its main hand standing empty under the sentence. violates: a second row of icons „Teraz w przejściu: …” under the tiles; tiles that show the gear of the map run going on.

*Which slices hold what (for the return step; the entries name the tests in words, no slice number stands in an entry):* D-451, D-455, D-456: Slices 1, 4, 7; D-452: Slices 1, 2, 3; D-453: Slices 2, 19, 20; D-454: Slices 11, 19; D-457: Slice 4; D-458: Slice 7; D-459: Slices 6, 13, 14; D-460: Slice 3; D-461: Slices 11, 20; D-462: Slices 11, 19.

## Fields I could not take from a row, and how I filled them

- **D-451 *Relations*.** The definition left it `TODO`. It reads `derives from D-23 · TODO — the decision "Which items are single pieces with numbers of their own?", expected in the change that makes items single pieces with numbers of their own`. D-23 is the sentence the entry works out (the simulation, not the program, chooses the piece, which F3 narrows by the gear); the `TODO` names the decision the definition projects for that task and the log does not hold. A `TODO` of *Relations* stays on the main branch only through the human, so the request puts it before him; if he prefers `derives from D-23` alone, it is one edit.
- **D-451 *Verification*** was `TODO` in the definition; filled as above (a `tests:` clause and a pair kept until tests hold, not the cycle's).
- **D-455 *Rejected*.** The row's source keeps one way not chosen, "not to record it, leave it to code and tests", which is a way of the process and by `foundation_step.md` stays out. Nothing of the product was weighed, so I wrote `none considered`. The other reading is the phrase `no cost to the product known`; I did not use it because the template gives *Rejected* the forms "ways, `none considered`, `unknown`" and that phrase is no way. Flagged as a judgment.
- **Every *Rejected*** takes the ways the row's source keeps, with their costs, from the answer under *Questions to settle* the row's *Source* names (rows 1, 3, 8, 16, 18, 19, 21, 28, 31, 33); D-451's is the definition's, word for word. *Based on* is `none` and *Origin* is `none` in every entry: no source outside the product, and the whole reasoning stands in the entry.

## Choices

- A new section instead of the end of "How a program runs" or of "Trip plan, chest and items": the twelve entries share one topic, no existing section fits more than a few, and D-23 stays where it is for F3 to narrow. Way rejected: spreading them over four sections. Cost if wrong: a later move of entries between sections, no change of numbers.
- D-451 stands in the same new section though its question is about actions (D-23's topic), so that the gear's entries read together; its *Scope* is `simulation · browser-view` as the definition gives.
- `Scope` of the others by the parts their slices touch: D-452, D-456, D-457, D-458, D-460 `simulation`; D-453, D-455, D-459 `simulation · browser-view`; D-454, D-462 `browser-view`; D-461 `browser-view · simulation`.
- The glossary definition is written as a sentence, "Gear is what a character wears, wields and has at hand, apart from its backpack." The approved text is the same words as a noun phrase; the other entries of the glossary are sentences. *Not* is the approved one: `what a trip plan takes from the chest into a map run — "equipment"`. If the human wants the exact approved wording, drop "Gear is " and lower-case nothing.
- Each decision's *Relations* point only to decisions the entry serves: D-451 (all but itself), D-452 (D-453, D-460, D-461), D-453 (D-460, D-461, D-462), D-443 and D-456 where the entry names targets or slots, D-50, D-64, D-23. No `narrows`: the one collision, D-23's sentence that the simulation chooses the piece, is moved by the row F3 of another part of the foundation step.

## Reaches beyond the handoff

- `.the-way/task-cycle/skill/foundation_step.md` and the skills it names were read as the handoff said. Beyond the handoff's list I read: `.the-way/elements/common/foundation_check.py` (its head, for what a new decision with no test needs: a pair of examples), `.the-way/task-cycle/remarks_check.py` (head, for the report's sections), `.the-way/elements/glossary/examples.md` and the entries `foundation` of the-way's glossary and WAY-03 of the-way's log (examples of the forms), and `the approved project definition in the author's private notes` lines 373-423 for the projected entry's own *Scope*, *Rationale*, *Rejected*, *Relations* and *Verification* fields (the frozen task quotes only some of them; the file lies at the `projects` key of `~/.the-way/locations.json`). Why: F1 and F2 are projected "whole as the human approved it".

## Searches not found or unclear

- none

(Searches that found nothing and mattered, for the reader: the English text of every tracked file for `gear` (a use only in my new text; a hit on `wear` in D-145, "weapon wear", is a different word); the log for "wield", "put on", "pocket", "main hand", "second hand", "slot": only unrelated uses (a previous-save slot, a password gate's slots, "put on distribution terms"); no entry already states any of the rows, so no row is tied to an existing entry.)

Words checked for a second meaning in the English text, with no glossary entry made: "slot" (also a slot of a previous save and of a password gate — each use is a place that holds one thing, which a reader of the field gives it); "tile" (also a tile of a map; each use of the gear's tile is "the tile of a slot" or "the tiles of the gear"); "equipment" (kept for the trip plan, as the glossary term `gear` says; no new entry uses it for the gear); "piece" (already the log's word).

## Unread material

- `docs/task-cycles/wyposazenie-postaci/plan.md` lines 378 to 547 (slices 14 to 24 and the Coverage section) and the slices I read only as far as line 377; I read the whole of *Foundation entries* (7-53), *Choices* (602-619) and Slices 1 to 14 (up to line 377). The handoff named only the slices in my rows' column, which are all within 1 to 20; Slices 15 to 20 were not read (their text lies in the unread range); I wrote the *Verification* of D-454, D-461 and D-462 from the rows and the frozen task.
- `docs/task-cycles/wyposazenie-postaci/task_frozen.md`: read whole.
- `.runs/orchestrator/decision_index.md`: read its first 3000 characters only; I used the log itself for selection (headings, `grep` by number and word) instead of the index.
- Decisions read whole: D-445, D-446, D-447, D-200, D-179 (head and Rationale), D-23 (binding, fields), D-64, D-50, D-443, D-450 (binding), D-145 (binding and fields), D-190 (binding and fields). Not read whole although the handoff's plan names them as touched by other rows: D-183, D-187, D-241 (read the head only), D-287, D-440, D-441, D-199, D-409, D-311 (read the binding paragraphs only), D-380, D-143, D-144, D-140, D-290, D-44; they are changed by the rows F3 to F20, not by mine, and none of my entries edits their sentences.
- Invariants read: `character-team`, `simulation-inputs`, `trip-transfer`, `save-version`, `instrument-game-agreement` (the five the plan names for my rows' slices). The other invariants of the parts `simulation`, `browser-view` and `balance-tools`: not read whole; I searched their texts for "carried", "equipment" and "holds nothing" and found nothing the new entries contradict. The part map: lines 1-70 (the parts `browser-view`, `simulation` and the head of `account-server`) only.
- `.the-way/elements/common/critique/SKILL.md` (a critique is not required for entries a change writes, per `way_of_working.md`): not read.

## Own-work check

- Requirement my entries most likely do not meet: that each decision's binding text carries the row's meaning and no other (the writer never writes a row with another meaning), including the cases where I added a clause of *To do* beyond the row.
- Check: I read each binding paragraph against its row of *Settlements to record* (rows 1, 3, 8, 10, 16, 18, 19, 21, 28, 31, 33) and the answer its *Source* names, clause by clause, and listed every clause the row does not give under "Parts beyond the rows" above; I checked the *Rejected* of each against the answer's *Not chosen* (and the vetoes the row names), so that no way I derived myself entered it; I searched the new text for "equipment" (none: the gear is never called equipment), and ran the script that counts words and the forbidden words (above).
- It showed: eleven entries equal their row's meaning; four of them (D-452, D-456, D-459, D-460) carry a clause beyond the row, each from the frozen task's *To do* and named above; D-455 has no product way to put in *Rejected*; one rule of *To do* 7 has no row (above).

## Working copies

None made except my own files under `.runs/foundation-A/`: `gear_section.md` (the section as I wrote it before inserting; one tile wording in two pairs of examples was changed in the inserted text, so the file differs from the log in those two lines and in the heading of D-460 and *Rejected* of D-455), `check1.txt`, `check2.txt`, `msg1.txt`, `msg2.txt` (commit messages). No worktree and no clone. The directory is ignored by git (`.runs/`) and was left in place with those files, as they are the record of my checks; no copy stands elsewhere.
