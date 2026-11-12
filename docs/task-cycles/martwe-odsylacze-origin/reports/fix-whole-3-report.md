# Report — fix of the review of the whole change, part 3 (D-310, D-324 to D-326, D-338, D-359, D-362 to D-365, D-368, D-369, D-374, D-379, D-380, D-48)

**Status:** done.

- Base: `58600416c4ffb7e39978d9f6c815e97c6bfd350b` (worktree clean at start).
- Commit: `e6816817` on `task/martwe-odsylacze-origin`, not pushed. One file: `foundations/decisions.md` (19 insertions, 20 deletions). Only *Rationale* and *Rejected* lines, and D-48's *Origin* line.
- Skill: I did the steps of `the-way-record-decision` (read the skill, `read.md`, `decide_entry.md` and the template sections on *Rationale*, *Rejected* and *Origin*; decided each entry is an edit of an existing one and no binding sentence changes; drafted from the head, the foundation and the snapshot notes; wrote with the editor tool; ran the check). One exception, stated honestly: the closing periods of D-374 and D-379 *Rejected* were added with one `sed` line (identical result to an edit); every other change is an Edit-tool edit.

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py` -> exit 0, "0 errors".
- `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` -> exit 0, "444 files, 0 listed".
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- . ':(exclude).the-way'` -> exit 1 (no line; D-48's spec path does not match the pattern).
- Gate not run; no focused test applies (prose only).

## Per finding (old -> new)

**I-1 for the three decisions whose *Origin* was `none`**
- D-359 *Rationale*: "which is known from the owner's notes and was not checked" -> "; this was not checked". The hypothesis (the client gives the directory a session started in as its workspace root) stays; the environment fact `playwright-mcp-persistent-profile` ties profiles to "the MCP client's workspace root", and I found no source in the snapshot for the claim about the client, so it stays a hypothesis.
- D-364 *Rejected*: "the gap the report of the reconnaissance names the largest" -> "the longest stretch of nothing to see that a review of the scene's liveliness found". Verified in `rozpoznanie_frajda.md` finding 3 ("Największa luka jest przy 1×": 10 s of gathering at 1×).
- D-365 *Rejected*: ", and leaving the words of the approved definition, „the icon flies”, is a change of the definition" removed; the product reasons of that way (a new cut-out picture for each resource, the pack holds none of fibre) stay. The source's only other reason was a step of the process.

**Minor 1 (D-374, D-379 *Rejected*).** The way read "other numbers given by the human instead of the old loop game's data" with no reason and, in both, no closing period. The source (`wprawa_i_drzewa_loop2.md` Q8) keeps no cost ("Odrzucone: B — inne liczby podane przez człowieka"), so the way stays with no reason, as D-247; I added the closing period to both.

**Minor 2 (D-380, D-310 *Rejected*).** Old: "the reasons written by the cycle itself and judged by the human at the merge — corrections are a round of remarks before the merge, which the tasks that follow wait for; a table with the rows the human chooses to correct — the human corrected no row." Both reasons are steps of the process (the source `stan_i_powod_przy_regule_loop2.md` Q4 B and C). New in both: "the reasons written by the author of the work itself and judged only when the work is merged; a table with corrections of chosen rows." Ways with no reason.

**Minor 9 (D-368).** "it does not cover the whole screen as the end of loop does" -> "it does not cover the whole page as the end of the old Loop does" (D-370's wording; source Q9: "okno nie zasłania całego ekranu jak w starym Loop", where "ekran" is the page). D-62 and D-132 (the other places the finding names) are below D-280 and were fixed by an earlier part; I checked that both already read "page" (lines 1387 and 2740 of `foundations/decisions.md` at this commit).

**Minor 10 (D-369).** "and a save lost at a rise of the version was not counted as a cost when the choice was made" -> "which discards a saved game state of the older version, the player's programs in it included (D-206)" (D-206 read; the wording is that of D-135).

**Minor 11 (D-368).** "in the minutes of the game that are hardest" -> "in the stretch from the fifth to the thirtieth minute of play that a review of the game found the hardest" (`rozpoznanie_weteran.md`, proposal 8: minutes 5–30 of play, real time).

**Minor 12 (D-368, D-369; D-216 was in part 2).** D-368 "Before the window the end of a manual map run was one line below „Teraz” and „Potem” …, and the screen did not say …" -> "One line of the end, below „Teraz” and „Potem” in the world area, does not say …". D-369 "When the choice was made the game state held the counters … (D-93) … and held none of the three" -> "The game state holds the counters … (D-93) …, so the record adds only the three." Checked D-93 (it holds the counters "Wykonano {n}×") and that `rule-count`-style counters exist at the head through D-93's entry; I did not search the code beyond that.

**Minor 15 (D-368).** Added the human's first reason for a window: "The end holds much to read, and a window gives it room, at the cost of hiding the screen it covers." (source `koniec_przejscia_loop2.md` Q1: "tam jest sporo informacji … będzie zasłaniać"). The cost was already in the accepted costs ("the window hides the scene while it stands").

**Minor 17 (D-324).** Added: "„Wznów” and „Restart” close it as „Wróć” does and then do their own work, as the band of a discovery goes at „Wznów” (D-122)." (note Q7; D-338 and D-122 confirm the band goes at „Wznów”).

**Minor 18 (D-325).** The veteran's review is now named once, in the first mention, with the full content: "a review of the game from the point of view of a veteran of idle games (2026-10-31) found that the player does not know how much game lies ahead, learns the demands of a map through a death, and has no goal longer than the current map; it proposed a catalogue of maps with empty places and a card of demands as the one cheap answer, at a medium cost: a new screen, though the data and the calculations already existed." The second mention is replaced by "of what the review proposed, only the card of demands is taken here", which agrees with the *Rejected* way on empty places. Checked against `rozpoznanie_weteran.md` proposal 5 (the proposal is the catalogue with empty places and the card together).

**Minor 19 (D-326).** "Measured on 2026-10-31 … before it was merged" + ", on Las and with programs tuned by the person measuring" (`rozpoznanie_weteran.md`, "Skąd liczby": programs written and tuned by the author of the measurement; the 168 h/58 figure at its line 101 is for Las).

**Minor 20 (D-338).** "and a place for the chronicle to be settled (D-339)" -> "; where the chronicle lives had to be settled, which D-339 did" (the review's own suggested form; the cost is a cost of the time of the choice and D-339 has paid it).

**Minor 21 (D-363).** "When this was decided an agent playing …" -> "In a trial of 2026-10-31 an agent playing …" (`rozpoznanie_nowy_gracz.md`, created and updated 2026-10-31; the entry says two sentences later that the reason at a rule (D-310) already tells what is missing). "the row of a rule keeps the narrow column of the program" -> "the row of a rule does not grow" (the note's own statement); "in the narrow column of the program" removed from *Rejected*, because at the head D-349 and D-288 give the program column 526 px at 1280 px and 622 px at 1344 px (computed, as they say), so "narrow" is not something I can verify at the head; the 208–304 px of the note belong to the older layout and are not carried. "it departs from the example „Wytwórz — ognisko (6 patyków)” and reads as a list" -> "it reads as a list" (the circular clause removed).

**Minor 33 (D-48 *Origin*).** "the names of the tokens other than the roles were chosen by the cycle, not by an answer of the human: Decision 1 of the spec in `docs/task-cycles/styleguide-loop2/spec.md` at commit b0c4d44" -> "Decision 1 of the spec in `docs/task-cycles/styleguide-loop2/spec.md` at commit b0c4d44". Verified: `git show b0c4d44:docs/task-cycles/styleguide-loop2/spec.md` has "### 1. The token file is `src/browser/tokens.css`" with the naming rule, and the template allows "a file at a fixed commit" as an *Origin*. The pointer is kept; the narration is dropped. No decision other than D-48 has a spec pointer.

**Minor 34 (D-362 *Rejected*).** The two "keep it unchanged" ways that answered two earlier wordings:
- "keeping the earlier rule that a file may name a note and the folder it lies in — it is the rule this decision reverses; correcting that earlier rule in a separate change" -> "letting a file name a note and the folder it lies in — a reader of the repository cannot open the note, and the notes that a decision or a test pointed to are removed when their task closes; correcting that rule in a separate change". The reason is the one D-362's own *Rationale* gives.
- "leaving this decision unchanged — it would list only `projects` and `tasks`, so an agent reading it would take `task-rules` for an entry outside the rules of loop2, and the next review of the foundation would have to find and fix the mismatch" -> "listing only the entries `projects` and `tasks` — an agent reading it would take `task-rules` for an entry outside the rules of loop2, and the mismatch would wait for the next review of the foundation to be found and fixed".
Both are now ways of the product, not descriptions of the change. The remaining ways of D-362 (the three paths only, clearing only the *Origin* fields, the separate changes, moving documents) I left as they are; the one "the human refused the split of the work into separate tasks" is a reason of the process and "the definitions and the concept included" names the notes by kind; neither is in my assigned findings.

## Contested

none.

## Not changed, and why

- The handoff's range "D-280 to D-386" holds no finding assigned to me beyond the list above; findings 22–26 for D-280–D-347 were done in part 2 and I did not redo them.
- Process wording I saw in assigned entries but outside the assigned findings, left for the orchestrator: D-363 *Rationale* "whether that is a departure for the worse was put to the owner beside the rule … and he took this way" (tells how the decision was reached); D-325 *Rationale* "When this was decided, nothing in the game but the sentence …" (a premise, undated; correct as a time statement); D-362 *Rejected* "the human refused the split of the work into separate tasks".
- D-324 and D-338 carry no *Review when*; none was assigned.

## Own-work check

Requirement most likely not met: a sentence that says something untrue of the head, or a pointer to a note, task, plan or definition. Check: for each present-tense sentence I added I read the head (D-93, D-206, D-122, D-339, D-370, D-349 and D-288 figures) or dated it ("In a trial of 2026-10-31", "Measured on 2026-10-31"); the private-name grep finds no line; `foundation_check.py` 0 errors; `git diff` of the commit shows no changed line except *Rationale*, *Rejected* and D-48 *Origin*.

## Unread material

- `elements/common/way_of_working.md` and `rules.md`: not read this run (the template's *Rationale*, *Rejected*, *Origin* and recovered-decisions sections were).
- Notes read in part only, by grep for the passages: `wprawa_i_drzewa_loop2.md` (Q8), `stan_i_powod_przy_regule_loop2.md` (Q4), `koniec_przejscia_loop2.md` (Q1, Q9, Q10), `rozpoznanie_weteran.md` (proposals 5 and 8, "Skąd liczby"), `rozpoznanie_frajda.md` (finding 3), `zbieranie_jako_widowisko_loop2.md` (questions 2 and 3), `zadanie_loop2_lokalizacje_poza_repozytorium.md` (questions 1–3), `koszty_i_stan_ogniska_loop2.md` (Q at line 43).
- Reviews 18-20 (M1–M6) and 35 (M1–M7) read in the lines of the findings I fixed.

## Searches not found or unclear

- The source of the D-359 claim "the client of the agent gives the directory a session started in as its workspace root, which is known from the owner's notes": not found in the snapshot; it stays a hypothesis marked "not checked".
- Whether the counters of D-93 exist in the code at the head: I relied on D-93 (a decision in force) and did not read the code.
