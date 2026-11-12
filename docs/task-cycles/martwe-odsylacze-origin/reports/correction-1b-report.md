# Correction 1, part B - report

**Status:** done with concerns (the concerns are the entries listed under "Left as they are" and the two items under "Problems as observed").

- Base: `381cf47f2f3239d9e87ed0b93dbc4b31ce992438`, branch `task/martwe-odsylacze-origin`, worktree clean at the start.
- Commit: `a166bfeb` (`docs: :memo: state what a rejected way costs, not how the decision was reached, in the rationale and rejected lines of 22 decisions`). Not pushed.
- Files changed: `foundations/decisions.md`, 30 lines added, 31 removed. Only *Rationale* and *Rejected* lines and their continuation lines; no binding sentence, *Verification*, *Relations*, *Based on* or *Origin* touched.
- Foundation step: `the-way-record-decision` followed (read the template, `rules.md`, `way_of_working.md`; every change is an edit of an entry in place, no new number; step 4.3 `foundation_check.py` run after the edits). No question to the human.

## Per decision: old text, new text, passage

1. **D-298 *Rejected*.** Old: "...the button standing beside every program - no cost was kept beside it." New: "...the button standing beside every program." Passage: `edytor_programu_loop2.md` question 17, *Not chosen* c: "'zwiń wszystkie' zawsze - pakiet nie podał kosztu". The note gives no cost, so the way stands with no reason (precedent D-187, D-247).
2. **D-306 *Rejected*.** Old: "...greyed cells out of the keyboard's reach - no cost was kept beside it." New: "...greyed cells out of the keyboard's reach." Passage: same note, question 17, *Not chosen* e: "komórki wyszarzone poza zasięgiem klawiatury - pakiet nie podał kosztu poza samą drogą". No cost, no reason.
3. **D-220 *Rejected*.** Old: "the tests of loop taken as material - about ten points get a question of their own, and the success test of the first scope treats a significant departure from loop as refuting its goal." New: "the tests of loop taken as material." Passage: `rozliczenie_przejsc_loop2.md` W1, *Not chosen* B (the same two reasons: a process step and a project stage). No decision of the foundation states "depart from loop only where better" as a rule of this subject, so I did not rebuild a product reason.
4. **D-362 *Rejected*.** Old: "...in tests in a separate change - the human refused the split of the work into separate tasks; letting a file name a note...". New: "...in tests in a separate change; letting a file name a note...". The only reason was a step of the process. (The task document of the cycle is not in the snapshot, so there is no passage to quote; the clause was the refusal alone.)
5. **D-363 *Rationale*.** Old: "...poorer in that row than the old loop; whether that is a departure for the worse was put to the owner beside the rule that the game departs from the old loop's solutions only where the result is better, never worse, and he took this way; the same rule..." New: "...poorer in that row than the old loop, while the game departs from the old loop's solutions only where the result is better, never worse (D-311); the same rule...". Passage: `koszty_i_stan_ogniska_loop2.md` question 1, *Answer* ("Przyjęty koszt: czytając program, gracz nie widzi cen bez otwarcia panelu - w tym wierszu ubożej niż stary Loop") and its *Source* (the judgement of "gorzej" left to the human). The cost stays; the rule is cited at D-311 *Rationale*, where it is stated.
6. **D-368 *Rejected*.** Old: "...each changed row is new wording and perhaps a new question;" New: "...each changed row is new wording;". Passage: `koniec_przejscia_loop2.md` question 7, *Not chosen* B ("każdy zmieniony wiersz to nowe brzmienie w szkicu i ewentualnie nowe pytanie"); "a new question" is a step of the process, "new wording" is what the way costs.
7. **D-10 *Rejected*.** Old: "replacing the old game's public address - breaks the approved separation;" New: "replacing the old game's public address - breaks the separate public address D-08 gives loop2;". D-08 opened: it says "at a public address different from `kantarion.bieda.it`", so the citation holds.
8. **D-208 (item 4 and search).** *Rationale*: "measured when this was decided, the headquarters..." became "measured, the headquarters..." (the measurement keeps what was measured and under which conditions); "because when this was decided the player could remove no character, no part of the Understanding and no solved map" became "because the player can currently remove no character, ...". *Rejected*: dropped "beside the line of an unconfirmed address, which stood there when this was weighed (D-157 now places it in „Konto”)" (the line is no longer in the header, the reason is gone with it) and "a longer task" became "more work". Check made for the present tense: a search of `src` for a removal of a character found none, and the only deleting button of `src/browser` is „Usuń” of a program; I did not check the Understanding and a solved map in the code (see Problems).
9. **D-265 *Rationale*.** "one task at a time" became "one at a time". The "task" in the binding sentence ("a screen no task has moved to React yet") is not mine to touch.
10. **D-267, D-268.** Opened whole: no "task" and no narration in *Rationale* or *Rejected* (the "human-accepted change of D-29" is the rule of the decision itself). Nothing changed.
11. **D-270 *Rationale*.** "refused until a task lets it in on purpose" became "refused until a change lets it in on purpose" (the next clause already says the way out is a change of the decision).

## Found by the search of the whole log (item 5), fixed

I extracted every *Rationale* and *Rejected* paragraph (about 2,960 lines) and searched them for the phrases of the handoff and for verbs of the human or the owner (chose, asked, wanted, judged, took), "the request", "task", "preview", "scope", "definition", "plan", "approved". Exact phrases of the handoff ("was put to", "the human refused", "no cost was kept", "took this way") now match nothing in the log.

- **D-316 *Rejected*:** "a trace of 20 % was chosen from the preview", "the pair of tints B, C or D of the preview - the pair A was chosen from the preview", "a return in 1 s - 2 s was chosen from the preview" are now "...or with 10 % or 35 % of it; the pair of tints from `#7d9078` to `#f2b33d` at the cover 0.50 and 0.60, from `#8a9a5b` to `#e9b03a` at 0.35 and 0.45, or from `#6a9a78` to `#f5c542` at 0.45 and 0.55; ...; a return in 1 s; ...". Passage: `swit_rosnacy_z_passa_loop2.md` question 3, *Not chosen* (the pairs with their values; "Mariusz nie podał powodu poza zgodą z rekomendacją" for the pairs, the 10 % / 35 % trace and the 1 s return, so no reason is written). Pairs B-D named by values because the letters were names of a preview the reader cannot see.
- **D-366 *Rejected*:** "barely visible in the preview" became "barely visible"; "hand pixel work whose look is seen only at the request" became "...only once it is made".
- **D-373 *Rationale*:** "hand pixel work whose look the human judges only at the request" became "hand pixel work whose look is judged only once it is made" (source: `swit_rosnacy_z_passa_loop2.md` question 8, accepted cost "praca pikselowa, której wygląd Mariusz oceni dopiero przy prośbie o scalenie"). Same wording fixed in **D-271 *Rationale*** ("judged only at the request" -> "judged only once it is made").
- **D-271 *Rationale*:** "the tint layer in the colours the human chose from a preview" became "the tint layer in its own colours".
- **D-349 *Rationale* and *Rejected*:** "what the owner asked for was the width of the program" became "what counts is the width of the program"; ", and the owner judged that it does not solve what the owner wanted solved" removed (the figures before it carry the reason).
- **D-356 *Rationale*:** "The owner wanted failures of the server and of the player's browser both covered, the server weighing more..." became "Failures of the server and of the player's browser are both to be covered, the server weighing more...".
- **D-357 *Rejected*:** "the owner asked why anyone would reach for views of half a year ago if something in the look breaks then" became "no one reaches for views of half a year ago when something in the look breaks then".
- **D-255 *Rejected*:** "the owner, who did not play when this was weighed, has a save without these states" became "the owner has a save without these states".
- **D-233 *Rationale*:** "reached the owner's mailbox when this was weighed" became "reached the owner's mailbox".
- **D-74 *Rationale*, D-76 *Rationale* and *Rejected*, D-351 *Rejected*:** "task" used as the unit that decides ("the task that shows the need", "the first task changing a boundary", "in tasks that change no principle", "leaving it to the task that writes the test") became "change" or "whoever writes the test".

## Checks

- `python -B .the-way/elements/common/foundation_check.py` - exit 0 ("0 errors"), run after the last edit and before the commit.
- `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` - exit 0 ("checked: 444 files, 0 listed").
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- . ':(exclude).the-way'` - no line (D-48's spec path does not match the pattern). The product's gate was not run, as the handoff says.
- Only one *Origin* line of the log is not `none`: D-48's allowed spec path (`foundations/decisions.md:1106`), untouched.

## Own-work check

The requirement most likely not met: a fix of a reason that adds a reason the source does not give. Check: each rewritten rejected way compared with its note. D-298, D-306, D-220, D-362, D-316 (the 10 % / 35 % / 1 s ways) carry no reason now, as the notes give none; D-363 and D-368 keep only the cost the notes name; D-10 cites D-08 whose text I read; D-208's "currently" is checked in the code for characters and programs only. Result: nothing added that a source lacks, except the values of the three tint pairs in D-316, which come from the note and are not a reason.

## Left as they are (item 5), with the reason

- "When this was decided/settled/chosen/weighed" in D-03 (line 49), D-79, D-80, D-96, D-166, D-206, D-213, D-217, D-235, D-263, D-273, D-288, D-289, D-299, D-311, D-323, D-325, D-329, D-334, D-338, D-339, D-347, D-360, D-12 ("the access was chosen while the server held nothing..."): each dates a premise (the state of the code or the world) that the reason or a measurement rests on, not a human act. Dropping the date makes an old state read as current, and checking each against the present code is not a rewording; a person decides whether to rewrite each as a present-tense premise or to drop it.
- "The scope accepted for the first version of the game" as the source of a number or a boundary (D-64, D-66, D-74, D-75, D-145, D-206, D-208 "the scope lets a team hold any number of characters", D-228, D-252): the scope here names what the game contains, the sentence's content; D-64 and D-66 would lose their only stated source for the 15 pieces and for the miss. These are project-stage words used as a source; I left them for a decision of the human on how to name the source.
- "Task" as a product word of the process the product pins: D-359 ("two task cycles in separate worktrees"), D-82 and D-362 ("removed when their task closes"), D-323 ("where a task sets it as a decision of the product" - quotes `guidelines/coding.md`, which says "gdzie ustala go zadanie").
- D-362 *Rejected* still says "the definitions and the concept included" (kinds of the author's documents): generic, names no document; left to avoid a rewrite of a way's wording that the handoff did not assign beyond the refusal clause.
- D-82's "a human's judgement counts once a decision holds it", D-381's clause on a logout answered with no session, D-317, D-387, D-388: reserved by the handoff.
- D-251 *Rejected* "another text, given by the human", D-374 and D-379 *Rejected* "other numbers given by the human instead of the old loop game's data": these are the ways rejected, with no narration of how the decision was reached.
- D-265 *Rationale* "the coding guidelines had marked those modules as ones to copy from": `guidelines/coding.md` holds no such marking today, so the clause is a past state; not in the item list, left for the reviewer to decide.
- "Owner" in D-137, D-223, D-230, D-232-D-234, D-252, D-347, D-355-D-360: the owner of the server, the account or the game as a role of the product, not the narration of a choice.

## Problems as observed

- D-208 (item 8): the claim "the player can currently remove no ... part of the Understanding and no solved map" is not checked in the code (only characters and programs). Guess: still true. Cost if wrong: a stale sentence in an accepted-cost list.
- D-265 (above): a past-state clause in *Rationale* that the guidelines no longer back.

## Reaches beyond the dispatch

None beyond the snapshot notes named above, `guidelines/coding.md` (D-323, D-265), `src/browser` (a search for removal of characters, for D-208) and D-08, D-157, D-311 (cited).

## Unread material

none (the handoff, the remarks, `make-change/SKILL.md`, the `record-decision` skill with `read.md`, `decide_entry.md`, `template.md`, `rules.md`, `way_of_working.md`: whole). Of the snapshot notes I read the passages named above, not the notes whole.

## Searches not found or unclear

- The task document of this cycle is not in the snapshot: no source for the D-362 refusal beyond the text of the entry.
- The wording of the project rule "depart from loop only where the result is better, never worse" stands only in prose (D-311 *Rationale*, D-368 *Rationale*, D-363 now); no binding sentence holds it. Cited at D-311 for D-363.
