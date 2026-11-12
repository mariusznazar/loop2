FAIL b1af8dd4fee111444c5157992a53874211645462

# Review of the whole change — task/martwe-odsylacze-origin

- Range: `git diff origin/main..HEAD` (`origin/main` = `20bcc58d`, head `b1af8dd4`, confirmed by `git rev-parse HEAD`); 65 commits of the branch not on `main`, 143 files. The `.the-way` gitlink equals `main`'s (`55afa8e5`), so the request carries no pin change.
- Read: the method (`.the-way/task-cycle/review/SKILL.md`, `whole_change.md`), the handoff, `task.md` whole, `plan.md` (Foundation entries, Slices 1–2 and 21–41, Coverage, Choices, orchestrator's review), `cycle.md` (slices table, questions Q1–Q9), `whole-change-slices-table.md`, `foundation-entries-report.md`, `slice-21-report.md`, the Minor/out-of-scope sections of every review report the handoff lists.
- Reviewer: did the whole review alone, dispatched no agent, changed no tracked file, ran no test file in the worktree (see Checks). Scratch files: `the session scratchpad\rw\`.

## Critical

none

## Important (blocking)

### I-1 — Decision prose still points, by description, to documents kept in the author's notes

The invariant this change writes (`foundations/invariants.md`, `tracked-file-private-names`: "A file git tracks points to a place the author keeps outside the repository only by naming the entry `projects`, `tasks` or `task-rules` … and names no note …") and D-362 as changed ("No file git tracks names a note the author keeps outside the repository …") are not met by these sentences at the head. Each names a project definition, the project plan, a report, a design review, a question of a task document or the owner's notes as a reason or an authority, a thing no reader of the repository can open. The task's question 1 answer (B) puts every such pointer in tracked files in scope; with *Origin* now `none`, these are the only places the entries point anywhere. By WAY-263 (the change's files do what an entry it writes forbids) this is Important.

Text added or rewritten by the branch:
- D-40 *Rejected*: "the change would add another departure from the entries approved before it" (slice 4, `cc0c6eec`; review 3-5 M-5).
- D-76 *Rejected*: "against the human's answer that they bring no test files, and a change of the project's plan" (slice 6, `c0e12bc5`; review 6-8 M-4).
- D-176 and D-177 *Rejected*: "other numbers, or other answers to the points of the question about the numbers of nature energy" (slice 10, `59b06238`; review 9-11 Minor 5).
- D-274 *Rationale*: "as a design review of the screens of loop names it" (slice 14, `f3194047`).
- D-04 *Rejected*: "the approved sentence of D-147" and D-147 *Rejected*: "a limit on the entries makes untrue the sentence on the chronicle" (slices 3 and 8/35; review 3-5 M-4, review 6-8 M-12).

Older text kept in decisions the slices rewrote:
- D-154: "SMTP credentials stay outside the definition." (slice 9; review 9-11 Minor 7).
- D-232 *Rejected*: "the private half only in the note … would leave the note holding the only one" (slice 12).
- D-249 *Rejected*: "so the project definition changes with its gate" (slice 13).
- D-273 *Rejected*: "the plan records neither its cost nor the human's reason for it … and a change of the plan" (slice 14).
- D-274 *Rejected*: "a divergence from the project definition's entries"; *Rationale*: "takes its look in the task of its screen" (slice 14).
- D-276 *Rejected*: "changes of D-96, D-259 and of the project definition's entry" (twice) (slice 14).
- D-277 *Rejected*: "the task that builds the menu bar … that task losing its main reason to wait for this one" (slice 14).
- D-279 *Rejected*: "D-40 joins the divergence from the project definition, and the plan gains one more entry the task that writes that decision has to keep in mind" (slice 14).

Text of decisions whose *Origin* was already `none` at the base, which no slice was given (a gap of the plan):
- D-359 *Rationale*: "which is known from the owner's notes and was not checked".
- D-364 *Rejected*: "the gap the report of the reconnaissance names the largest".
- D-365 *Rejected*: "leaving the words of the approved definition, „the icon flies”, is a change of the definition".

Slices: spans 3, 4, 6, 8, 9, 10, 12, 13, 14 and 35, plus the plan's gap for D-359, D-364 and D-365. Earlier reviews graded the kept text Minor "at the edge of the task" (review 12-14 M-9, review 9-11 Minor 7). The whole change writes the invariant that forbids it, so I do not hold to that grade. Fix: write each reason as the game would have it, or leave the way with no reason where the only reason was a step of the process (the D-187 and D-247 precedent). Name what a design review or a report found, not the document.

### I-2 — Tests pin game numbers that no entry of the foundation holds, after the pointer that said where they came from was removed

- `tests/sim/data.test.mjs:247`, title: "the body starts at its caps, with the rates and thresholds written here". It asserts `coolingPerDegreeBelow: 0.002`, `satietyLossPerMinute: 0.6`, `chilledBelow: 35.0`, `starvingBelow: 30`, `healthLossChilled: 0.35`, `healthLossStarving: 0.35`, `healthRegain: 0.05` and `gatherChance` 0.7. The old title was "… the rates and thresholds are the task's".
- `tests/sim/data.test.mjs:16`, title: "the map Las has its size, entrance, step and resources" (4 × 4, entrance (1,1), step 5, densities, stocks, renewals). `:31` does the same for Las — głębiej. The old titles said "of the task" / "the task's map data".
- `tests/sim/body.test.mjs:22`: "Every expected number below is worked out by hand from the numbers written here". It was "from the task's numbers".
- `tests/sim/campfire.test.mjs:21-25`: "Every number below is written out by hand: crafting lasts 20 game minutes and uses 6 sticks, lighting a campfire 5 minutes and 2 sticks and gives it 60 minutes of burning …, eating … one berry, which gives 25 satiety". It was "written out by hand from the task".
- A search of `foundations/decisions.md` for 0.002, 0.024, the 4 × 4 grid and the 0.35/0.05 rates finds no decision that holds them.

What is wrong: D-82 as this change writes it says "What a test needs of the requirement it checks stands in the foundation", and D-80 says "Current parameters or the simulation's current result are not themselves evidence of correctness". The removed pointer carried the one fact the code needs: these numbers are an agreed requirement (the human accepted the old game's numbers as the requirement). Without it, the tests now present the data's current values as their own expectation ("written here"), which D-80 forbids. To do 5 says that information the code needs and the foundation lacks moves into the foundation. The cycle did that for the curves and prices of the skills (D-379), the ranges of conditions (D-376) and nature energy (D-377), but not for the body, the gathering, the campfire, eating or the two maps. The executor raised it (`slice-21-report.md`, concern 1), and it was left to the orchestrator.

Slice: 21 (`3a4a8090`), with the same pattern in the campfire numbers of slice 22's files. Fix: a decision of the cycle like D-379 that states which numbers of the body, the gathering, the campfire, eating and the maps Las and Las — głębiej are accepted requirements (they come from the old game's data, which the human accepted). Name it in these comments and titles.

### I-3 — The testing guidelines and D-82 now depart from the-way's testing template without the departure being recorded, so D-73 is no longer true

- Template (`.the-way/product-guidelines/testing/template.md:146-154`, WAY-232): "The expected value of every test comes from one of: those documents; a relation the code under test does not compute; a crash counted as a failure; a human's judgement. … Where a test's name does not show the source of a value, a comment in the test names it, by the line of the document or by the human and the date".
- `guidelines/testing.md:90-97` at the head (slice 1) drops the comment rule. It now says "Komentarz, który niesie informację ważną dla kodu, przenosi ją do fundamentu; komentarz bez takiej informacji się nie pisze … Komentarz testu nie wskazuje dokumentu spoza fundamentu." D-82's binding sentence says "The expectation of a test comes from the loop2 foundation", which also drops a relation, a crash and a human's judgement as sources.
- D-73 still says "Loop2 adopts the testing-guideline template of its pinned the-way in full, with only the departures of D-74, D-75, D-76, D-77, D-78, D-79, D-163, D-235 and D-273". `guidelines/testing.md:10-11` still says "jego dziewięć odstępstw to D-74, …, D-273".
- The same file contradicts itself at `guidelines/testing.md:84`: "Oczekiwanie pochodzi z uzgodnionego dokumentu, niezależnej zależności, awarii liczonej jako niepowodzenie lub jawnej oceny człowieka". This is the template's four sources, against D-82's "from the foundation".

Why it matters: an agent that reads D-73 takes the template's comment rule as binding and looks for it in the guidelines, which no longer say it. The guidelines also give two different rules for where an expectation comes from. This is a requirement the task mandates (question 1a, "komentarz wskazujący źródło oczekiwania nie jest potrzebny"). The defect is that the departure is unrecorded, not the choice itself. Slices: the Foundation entries step (`ccc03bcf`, D-82) and slice 1 (`7a92118b`). Fix: either record D-82 as the tenth departure (in D-73's binding sentence and `guidelines/testing.md:10-11`, with the human's reason), or keep the template's rule in the foundation's terms. For example: an expectation comes from the foundation, a relation the code does not compute, a crash or a human's dated judgement, and where the name does not show it, a comment names the entry by its identifier. Either way, align `guidelines/testing.md:84` with it.

## Minor — within the task (for the findings file of the fix)

Each is graded as a finding of this review. Where a finding comes from an earlier review, its source is given. Items that earlier reviews raised but the head no longer shows are not repeated (see "Earlier Minor findings no longer shown").

1. D-374 *Rejected* and D-379 *Rejected*: "other numbers given by the human instead of the old loop game's data". The way has no cost or reason after it, and D-374's entry has no closing period. The template's *Rejected* is a way with its cost, or `unknown`. The source note keeps no cost (Q8, "Odrzucone: B — inne liczby podane przez człowieka"), so write it as a way with no reason, as D-247 does.
2. D-380 *Rejected* (and D-310's, from which it is copied): "the reasons written by the cycle itself and judged by the human at the merge — corrections are a round of remarks before the merge …; a table with the rows the human chooses to correct — the human corrected no row." The second "reason" tells how the decision was reached (template line 65, WAY-05). Review 15-17 M6 raised it for D-310. Reword in product terms or leave without a reason.
3. D-381 binding sentence: "after a logout the server answers with no session". The executor says this came from the test, not from the old spec (`cycle.md`, slice 26). A cycle decision that freezes what a test asserts is the evidence D-80 rejects. Put this clause before the human explicitly at the request.
4. `guidelines/styleguide-browser-view.md:333-334`: "Źródło wartości ustalone z Mariuszem dla loop2, z jednym rodzajem dołożonym później:". Two kinds below it were added later (the `--bar-width` kind of 2026-11-02 and the scene kind of 2026-11-11). Review merge-2 M-4 routed this to slice 40, and it was not fixed (slices 2 and 40).
5. `src/browser/styles.css:1900`: "The player's pause greys the whole scene with the value the old Loop gave a paused scene". `tests/view/scene.test.mjs:350`: "The two values are the old Loop's (D-322, D-316)." This is the same unverifiable claim slice 37 removed from the styleguide because the old game's file is not in the snapshot (`cycle.md`, slice 31). The comments should state the values as D-322 and D-316 give them (slices 28, 31, 37).
6. D-82 *Verification*: "violates: a test comment that names a task document, a note or the copy of a task document in the record of a task cycle, with a line, as the source of the expected value". The words "with a line" narrow the example below the binding sentence, which forbids the pointer with or without a line (Foundation entries step).
7. Question 9 of the cycle (pointers to specs, plans and slices of earlier cycle records go) is held by no entry for comments that are not test comments. D-82 covers test comments only. The invariant names notes, folders, paths and the old game's files, not cycle records, which stay in loop2's history. The sweeps of slices 31–33 and 36–40 therefore rest on an autonomous choice the foundation does not record. Put it before the human, or widen D-362 or the invariant.
8. D-132 *Rejected* ("no „Teraz” after the end of a map run — when the choice was made the end had no place of its own, and the player would have read nowhere why the map run ended") and D-147 *Rejected* ("… while the end had no place of its own the first left the player nowhere to read why the map run ended …"). Both carry the same two ways, worded as history (template line 140; review merge-2 M-3; slices 35 and 41).
9. D-132 *Rationale* (slice 41), D-62, D-368: "it does not cover the whole screen as the end of loop does", against D-370's "The window covers the whole screen". Review 35 M1 and O1. D-370 itself says "does not cover the whole page".
10. D-369 *Rationale*: "a save lost at a rise of the version was not counted as a cost when the choice was made" (review 35 M3).
11. D-368 *Rationale*: "in the minutes of the game that are hardest" reads as game minutes and loses the figure 5–30 (review 35 M2).
12. Narrations of the time of the choice: D-122 "the game had when the choice was made"; D-216 "though the earlier wording said"; D-368 "Before the window the end …"; D-369 "When the choice was made the game state held …" (review 35 M4).
13. D-173 lost "it hides the screen" for the rejected question in a window (review 35 M5). D-173 lost the accepted cost "one sentence more in the question" (review 9-11 Minor 3).
14. D-122 lacks the cost the discovery note gives: real time past the game minute of a discovery is lost (review 35 M6).
15. D-368 lost the human's first reason for a window: the end holds much to read (review 35 M7).
16. D-185 *Rejected*: "a line directly under the status row" (a row the screen no longer has). D-216 *Rejected*: "the same in the status row, which the header then held" (review fix-35 M1, M2).
17. D-324: the reason "Wznów" and "Restart" close the question (as the band of a discovery goes at "Wznów", D-122) is not carried (review 18-20 M1).
18. D-325: the veteran's report is named twice and reads against the decision (review 18-20 M2).
19. D-326: "Measured on 2026-10-31 … 58 with a full one" is missing "on Las, with programs tuned by the person measuring" (review 18-20 M3).
20. D-338: "Accepted with it: texts to write for the events, … and a place for the chronicle to be settled (D-339)", a cost D-339 has already paid (review 18-20 M4).
21. D-363 *Rationale*: "When this was decided an agent playing in the role of a new player …" is misdated. "the narrow column of the program" may be untrue at the head. *Rejected*: "departs from the example" is circular (review 18-20 M5, M6; review fix-18-20 note).
22. D-347 *Rationale*: "so a real map run holds more entries. The chronicle of one map run fits the limit …" generalizes a measurement (review fix-18-20 m1).
23. D-280 lost "about 190 px". D-282 "In a review of what the game was to grow into, only the scene forced …" lost "of the sketched screens". D-284 "No sentence says directly …" tells the derivation (review 15-17 M1–M3).
24. Process words: D-288 "what the project is judged by" and "keyboard handling of its own in the largest task"; D-299 "with the content of a later project"; D-309 "the approved sentence of D-308 gets an exception"; D-316 "a piece of a scene showing the character's tile, left out of the project, would enter it" (review 15-17 M5).
25. D-317 rests on WCAG 2.2 criterion 2.3.1 ("87,296 pixels") while its *Based on* reads `none` (review 15-17 M8).
26. Small losses: D-311 way C "w niskim oknie poniżej dolnej krawędzi", way A width; D-317 trial "an order-of-magnitude example"; D-320 "a fraction of a second" for 0.06 s at 16× (review 15-17 M9). D-311 *Rejected* "about as much width" with no second term, "(D-370)" after "a way back to it", and "it took about 150 px" with an unclear subject (review fix-15-17 M1–M3).
27. D-246 *Rationale*: "When this was settled, Siedziba was not on view while a map run stood …", a lapsed premise (review 12-14 M-1). D-241 "Before earning loops the game state held one map run …", D-251 history clause, D-269 "when the question was put" (M-2). D-264 "37 of 67" counts of tests (M-3). D-222 lacks Q15's accepted cost (M-4). D-227 "so it reads as coming from the same place" hangs on the SMTP password, and D-246's hedge is lost (M-5). D-254 and D-255 omit some costs and gains (M-8).
28. D-152, D-153, D-154 dropped the projected entries' *Review when* that D-202, D-205, D-206 and D-228 carry (review 9-11 Minor 1). D-180 keeps a reason that is now moot (Minor 2). D-166 lost the P1 cost and the gain of way B (Minor 4). D-194 "Accepted with it, for the time before the earning loop …" and D-186 "asks for" postponed work (Minor 6).
29. D-189: "the earning loop need not be closed" reads against the binding sentence; "(D-239, D-129)" should cite D-21; "Measured when every completion still paid" does not name the game measured. D-191 "the weaker character skills stay at the first level" states a tendency as fact. D-190 "the design points …". D-179 "because carrying in costs" reverses the source's "so that"; D-179 and D-191 say "no longer" (review fix-9-11 1–6).
30. D-80 "no settled place where it is written" and "The price is named" (review 6-8 M-1). D-83 "names some test files one by one" is stale (M-2). D-85 "more tests to the task" (M-3). D-89's pass-through reasoning is cited from `guidelines/testing.md:368` as D-73 (M-5). D-120 restates the editor's offer without D-196 (M-6). D-122, D-133, D-298, D-306: "no cost was kept" tells how the decision was reached (M-7). D-124 lost the 84 game minutes (M-8). D-136 lost "a solved map can be a place of work, and the chain of maps branches" (M-9; also found in my nested-pointer spot check). D-138 lost its condition of revisiting (M-10). D-140 "the mage's Rozbłysk … Iskra" and the old game's measurements read as loop2's; D-118 "putting out a fire saves a forest" (M-11). D-147 lost the estimate of 50–60 bytes an entry (M-12).
31. D-03 lacks the note's numbers for the rejected options (lit-html one package, Mithril 29 packages with esbuild, etc.) and the decisive reason for React over Preact. D-03's sentence "the two checks … have to be widened to the file type of the new screens" holds for one check only. D-04 "the function that passes a game minute and the sweep of the clock know neither" mistranslates "przemiatanie zegara nie znają", and D-04 lost way B1 (review 3-5 M-1–M-4, review fix-3-5 N-2).
32. D-07 "The MVP accepts that cost"; D-51, D-52, D-54, D-55 "a choice for the needs of the MVP, open to a change"; D-55 "The rule holds for the whole MVP" (review 3-5 M-7). D-55 "until the map runs are rebuilt around the character" reads as a cost that ends (M-8).
33. D-48 *Origin* keeps the spec at `b0c4d44`. This is allowed, but it adds no reasoning the entry lacks, and its prefix "were chosen by the cycle, not by an answer of the human" tells how the decision was reached (review 3-5 M-10).
34. D-362 *Rejected* holds two "keep it unchanged" ways that answer two different earlier wordings, and both describe the change (review merge-1 M-1).
35. `src/server/account-routes.ts:472-473` cites D-112 and D-210 for the revision check, whose rule is D-209 (review 39, Minor 1; trust-boundary file, comment only).

## Minor — outside the task's scope

- `src/server/account-routes.ts:355-356`: "a limit leaves no trace beyond the count (D-222)". The count is D-105 and D-161 (review 39, Minor 2; a line the change did not touch).
- `tests/sim/combat.test.mjs:184,222`, `tests/sim/encounters.test.mjs:415,624,727,762`, `tests/sim/program-counts.test.mjs:17`: "Sources: foundations/decisions.md:476 (D-23), :2590 (D-144)" and similar. These are line numbers into the foundation files that no longer point at those entries; the growth of `decisions.md` in this change moved them further. They are `main`'s text and point inside the repository.
- D-13 binding sentences: "the owner's private note" as the place of secrets. This is a binding sentence the task leaves alone; it names no note by name. It is listed so the human sees it against `tracked-file-private-names`.
- D-84 binding sentence: "takes these waiting and cleanup rules when that helper changes", an obligation already met (review fix-6-8 O-1).
- The order D-111, D-113, D-112, D-114 of headings in `foundations/decisions.md` is `main`'s.

## Earlier Minor findings no longer shown at the head (not repeated)

- review 3-5 M-6 (D-43 filler) and M-9 (D-40 badge cost).
- review 12-14 M-6 (D-228 wording) and M-7 (D-271 dust drawn in CSS, carried by slice 41).
- review 15-17 M4 (an executor's reasoning, not text), M5's D-320 clause, M7 (D-315) and the out-of-scope D-349 "a program too narrow".
- review 18-20 / fix m2 "reach the log of the game's server by D-356" (wording no longer present).
- review fix-6-8 M-2 (the rank numbers now stand in D-379).
- review merge-2 M-1 and M-2 (reports in `.runs/`, not tracked files).

## Declined to judge

- Binding sentences, *Scope*, *Based on*, *Relations* and *Verification* of the 300 rewritten decisions: the task does not change them (beyond D-82 and D-362). Earlier slice reviews and the orchestrator's `declcheck.py` confirmed nothing before *Rationale* changed except *Origin*. I did not repeat that per decision.
- `main`'s new decisions D-372, D-373 and the code of `main`'s task `swit-rosnacy-z-passa`: outside the branch's change except for the comment edits of slice 40.
- Whether the Pixel Crawler document on the file-sharing drive still says the four quoted points: I confirmed the itch.io page and its "Terms" link to the same Drive URL, but did not open the PDF. Point 5 of the public document, found by the executor (a credit for a saxophone solo), leaves "ask for no credit" standing for this game. Recorded as unverified, not judged.

## Coverage of the task

| Item | Evidence | State |
|---|---|---|
| To do 1 — every decision whose *Origin* named a note carries its reasoning, *Origin* `none` or allowed | `declog.py` over the head: 386 headings, 1–386 contiguous and unique, no broken *Relations*; only D-48's *Origin* is not `none` (loop2 spec at `b0c4d44`, allowed). 45 decisions sampled across slices 3–20, 35 and 41 (old *Origin* and old/new *Rationale*/*Rejected* read). Note passages compared for D-58, D-105, D-125, D-168, D-209, D-223, D-285, D-295, D-303, D-331, D-345, D-374, D-378 | met, except I-1 (descriptive pointers) and the Minor losses above |
| To do 2 — the same for non-task documents; none moves into the repository | nested-pointer spot check of D-04, D-07, D-23, D-50, D-93, D-118, D-119, D-120, D-136, D-140 against the concept's D10, D14, D15, D16–D17, D18, D23, D37, D38–D41, D49–D50: one loss (D-136, the D27/D28 extension, Minor 30). The MVP2 definition's entries have *Origin* `TODO`, so they carry no onward pointer. No document added to the repository | met with Minor 30 |
| To do 3 / settlement row 1 — D-82 | D-82 at the head (read whole) | met; I-3 and Minor 6 |
| To do 4 / settlement row 2 — D-362 | first sentence kept (with `main`'s `task-rules`); second sentence replaced | met; Minor 34 |
| Settlement row 3 — the invariant `tracked-file-private-names` | invariant present, *Method* review, *Derives from* D-362 | written, but violated at the head (I-1); Minor 7 |
| To do 5 — comments: information to the foundation, or the comment goes | S1 exit 1 over the repository; S2 only generic words; S3 only product terms; D-375–D-386 written | not met for the game numbers of I-2 |
| To do 6 — testing guidelines agree with D-82 | `guidelines/testing.md:90-97` | met in wording; I-3 (`:84`, template) |
| To do 7 — styleguide and tokens name no task or note; source kinds changed; dates | diffs of both files; dates checked against the note (Q10, Q11, Q19: 2026-10-20; scene preview: 2026-11-11) | met; Minor 4 |
| To do 8 — `action-duration-minimum` derives from a decision | *Derives from* D-374; D-374 traced to the skills note's Q8 and row 7 | met; Minor 1 |
| To do 9 — `pixel-crawler-terms` *Source* reachable | the public itch.io page and its Terms link confirmed by fetch (2026-11-12) | met (PDF quotes unverified) |
| To do 10 — entries through the recording skills | not checkable from commits; reports claim it (slice 3 said it edited directly) | claimed |
| Questions 1–5 | 1 (B): I-1 open; 1a: I-2 and I-3; 2: D-362; 3: no document moved; 4: one request; 5: kinds changed | as above |

## The new decisions of the cycle

D-374 (formerly D-368) and D-375 to D-386 are the cycle's own; no row of *Settlements to record* carries them. Each is in the template's shape with *Origin* `none`. They trace to: the skills note (D-374, D-379); the old campfire spec in loop2's history (D-376); the Płomyk and campfire notes (D-377, D-378, checked: "do zadania 9 zapalanie jest darmowe, więc Las jest łatwiejszy"); the old specs in loop2's history (D-381, D-382, D-386); the chronicle note (D-383); D-167/D-170 alone (D-384, *Rejected* `unknown`); the campfire spec and note (D-385). I found no claim the sources do not give, except D-381's logout clause (Minor 3). The cycle record's *Return step* still reads `pending`. The request must list all thirteen as decisions of the cycle for the human's acceptance, and D-383 as a widening D-346 could have carried.

## Checks run

| Check | Command or method | Result |
|---|---|---|
| Head | `git rev-parse HEAD` | `b1af8dd4…`, as handed over |
| Pin | `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way`; `git diff origin/main..HEAD -- .the-way` | both `55afa8e5`, no diff |
| Comment-only, JS/TS/CSS (118 files) | `node scratchpad/rw/cmp.mjs <repo> origin/main HEAD` (esbuild `minifyWhitespace`, `legalComments: none`; CSS with comments stripped) | exit 0; 110 SAME, 8 DIFF only in test titles (below) |
| Comment-only, Python (20 files) | `python -I -B scratchpad/rw/astcmp.py <repo> origin/main HEAD` (AST without docstrings) | exit 0, ALL SAME; no `invariant:` line changed |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | exit 0, 0 errors |
| Private paths | `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` | exit 0, 444 files, 0 listed |
| S1 (the plan's pattern plus `Scene\.tsx|sprites\.tsx`) over the repository without `.the-way` and `.runs` | `git grep -nIE '<S1>' -- . ':(exclude).the-way' ':(exclude).runs'` | exit 1, no line |
| S2 over the repository | `git grep -nIE '<S2>' -- . …` | exit 0, 25 lines: generic "a task"/"the task" in decisions, skills and a cron man page quote; none names a task document |
| S3 and a wider search (`spec`, `plan`, `slice N`, `the note`, `the definition`, `reconnaissance`, …) over `src tests scripts guidelines AGENTS.md` | `git grep -nIiE …` | only product terms (trip plan, the note under a value, the variable `spec`) |
| Process words in the decision log | `scratchpad/rw/procwords.txt` (231 hits, each marked as `main`'s line or the branch's) | basis of I-1 |
| Decision log | `python -I -B scratchpad/rw/declog.py <repo> HEAD` | 386, contiguous, unique, no broken relation, no reference above D-386; D-112 out of order (`main`'s) |
| Renumbered citations | all citations of D-372…D-386 in `src`, `tests`, `guidelines` read in context (≈90) | each cites what the decision says |
| Cited decisions | `python -I -B scratchpad/rw/cites.py … 9` (every 9th of 754 added lines citing a decision: 84 lines) read against each decision's binding sentence | all hold; weak ones: "10 nature energy (D-177)" and Las's 480 (D-133/D-136) rest on *Rationale* or examples, not binding sentences — part of I-2's gap |
| Personal data in added lines | e-mail, URL, path, host scan of the 2980 added lines | no e-mail, no disk path; hosts: kantarion.bieda.it (public game), itch.io, web.archive.org, drive.google.com, push.mikr.us (already in `main`) |
| Pixel Crawler source | WebFetch of the itch.io page | page by anokolisa, "Terms" link = the Drive URL in the fact |
| Tests | not run: the change is comment, docstring and title only by the two comparisons above; the full suite is the cycle's own run | — |

Test titles changed (only the title string differs):
- `tests/sim/campfire.test.mjs`: "…with the task's labels and minutes" → "…with their labels and minutes"
- `tests/sim/data.test.mjs`: six titles — Las ("…its size, entrance, step and resources"), Las — głębiej ("…its map data…"), the body ("…with the rates and thresholds written here"), the cooling ("…: 0.002 × (37 − 25)"), the skills ("…the listed pairs…"), the solving condition ("…Las's is a streak of 480")
- `tests/sim/rule-signs.test.mjs`: "…the reason of its row in D-380"
- `tests/sim/skills.test.mjs`: "all cumulative thresholds of D-379 …"
- `tests/view/away-report.test.mjs`: "…the wordings of D-246"
- `tests/view/program-editor.test.mjs`: two titles, "…in the order of D-290…"
- `tests/view/scene-frost-contrast.test.mjs`: "…reads a measured 3.21:1…"
- `tests/view/status-row.test.mjs`: "…is the example of D-122"

Each named decision holds what the title says (D-290's order, D-122's example "Odkryto: Idź, Zbierz, Patyk, Jagoda …", D-246's wordings, D-379's thresholds, D-380's rows).

## Slices judged by this review alone

- **Foundation entries (`ccc03bcf`):** the entries are coherent with each other, with `AGENTS.md`'s backlog lines and with `main`'s `task-rules`. Findings: I-3, Minor 6, Minor 7. Own-work check (a grep for pointer words over the added lines): it fits pointers, but it missed the template comparison (I-3).
- **Slice 1 (`7a92118b`):** I-3. `:84` was left as "no other meaning changes", which leaves two rules. Own-work check: a forbidden-words grep, which could not catch I-3.
- **Slice 2 (`4605f7e2`):** the dates are right and the kinds changed as the task asks. Minor 4. Own-work check: a grep, adequate.
- **Slices 21–34, 36–40:** comment-only confirmed. Citations sampled. I-2 (slice 21, 22). Minor 5 (28, 31, 37). The slice 21 executor's own-work check named the concern I-2 raises.
- **Slice 41 (`b1af8dd4`):** D-132, D-271 and D-316 carry the moved reasoning and `main`'s, consistent with D-373 ("cut down by hand"). Minor 8 and 9.
- **Correction `9c65ad24` of `tracked-file-private-names`:** now has D-362's qualification (through the entries). Its "names no note" is the basis of I-1.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md` (*Rejected*, *Origin*, prose rules): to grade Minor 1, 2 and 12.
- `.the-way/product-guidelines/testing/template.md:146-154`: WAY-170 comparison for I-3.
- D-73, D-80, D-82, D-362, D-374 to D-386, D-290, D-122 (example) and D-373: read whole for I-2, I-3 and the titles.
- The concept's D10, D14–D18, D23, D37–D41, D49–D50, MVP and MVP2 definition entries, `styleguide_loop2.md` Q10/Q11/Q19 Sources, `ognisko_i_jedzenie_loop2.md` Q6/Q8, `plomyk_loop2.md`, `wprawa_i_drzewa_loop2.md` Q8 and row 7, `reset_hasla_loop2.md` Q2/Q3, `zapis_stanu_na_serwerze_loop2.md` Q3/Q16, `ekrany_i_menu_loop2.md` Q11, `karty_i_katalog_map_loop2.md` Q8, `kronika_z_filtrami_loop2.md` Q9, `edytor_programu_loop2.md` Q6: the source comparisons.
- The public itch.io page of Pixel Crawler: To do 9.

## Unread material

- Decisions: 17 read whole (D-73, D-80, D-82, D-362, D-374 to D-386); about 80 read in their *Rationale* and *Rejected*, with the old text at `83ba52b2` or `4660e14a` (the 45-decision sample, the 10 nested checks, the I-1 and Minor sources); the rest, about 290, by title or by search hit only.
- Not read: `.the-way/elements/common/way_of_working.md` ("Reading the foundation") and `.the-way/product-guidelines/reading.md`, so the selection was made by the handoff's points, not by those rules.
- `guidelines/testing.md`: lines 1–40, 76–100 and 362–376 only. `guidelines/styleguide-browser-view.md`: its diff and lines 330–355 and 698–705 only. `guidelines/coding.md`: not read.
- `foundations/part_map.md` and `foundations/glossary.md`: not read. Invariants: `tracked-file-private-names` and `action-duration-minimum` read whole; others not.
- The slice reports of slices 1, 2, 22–34 and 36–41 were not read; I used the cycle record's summaries of them. `slice-21-report.md` and `foundation-entries-report.md` were read whole.
- The Pixel Crawler terms PDF on the file-sharing drive was not opened.
- No test file was run.

## Searches not found or unclear

- No decision holds the body's rates, the gathering chance, the campfire's and eating's numbers, or the map data of Las and Las — głębiej (I-2).
- No entry records question 9 of the cycle (cycle-record pointers in non-test comments) (Minor 7).
- Unclear whether "MVP" ("the needs of the MVP", "The MVP accepts that cost") is a pointer to the definition or a name of a stage of the product; graded Minor (32), as review 3-5 did.
- The archive copy at web.archive.org (2026-10-16) and the Drive document were not opened, so the four quoted points are taken from the executor's report.
