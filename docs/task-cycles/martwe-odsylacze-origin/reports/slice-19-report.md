# Slice 19 report — reasoning of D-334 to D-349 into the entries

Status: done with concerns (concerns are the questions at the end; none blocks the slice).
Slice base: `ce206f62296264c7e3d2cfe0489149ee193d1a19` (HEAD at start, worktree clean).
Commit: see the last line of this file.

## Steps of `the-way-record-decision` done, for each of the 16 entries

1. Read: `read.md` (the existing entry read whole; log numbers inspected; D-132, D-224, D-253, D-288, D-311, D-323, D-355, D-356 read at the head, not from the plan).
2. Decide what the entry is: an existing entry changed in place (no new question, no new number); the plan test passes (they bind after the change merges); the search found no collision.
3. Draft: only *Rationale*, *Rejected* and *Origin* lines (and their continuations); every added clause traced below.
4. Write: edits of `foundations/decisions.md` with the editor tool; `foundation_check.py` run after the write.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors" (run without `--skip-test-citations`).
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md` — no line between D-334 and D-349 (lines 7921 to the heading of D-350).
- `git diff ce206f62 -- foundations/decisions.md` read whole: every changed line is an *Origin*, *Rationale* or *Rejected* line, or a continuation of one, of D-334 to D-349. Binding sentences, *Scope*, *Based on*, *Relations* and *Verification* untouched.

## One line per decision: what moved, from which passage

Notes read from the snapshot; "onward" = passages these notes point to.

- D-334 — *Origin* none. From teraz_i_potem To do 1, Q1 (not chosen A: note for D-39/D-40; not chosen C: "least work", "worse than loop"), Q9 (accepted cost: the completion sentence stands twice; not chosen B and C reworded as the premise of the time), Q14. Checked at head: D-132 puts the same sentence as the title of the end window. zadanie_proporcje Decisions in play: only the wording of this *Rejected*, already adjusted by the earlier task; nothing more.
- D-335 — *Origin* none. From teraz_i_potem Q2 (warning colour "as in loop", row drawn after the end in loop). Nothing else the note holds was missing.
- D-336 — *Origin* none. From Q3 (accepted cost: two buttons with focus and test).
- D-337 — *Origin* none. From Q6 and To do 4 (loop's order without the wrap note, which loop2 has no field for; note on the colour roles for the rejected bars C).
- D-338 — *Origin* none. From definicja_mvp2 projected entry (already carried); kronika Need (events returned but unkept; the new-player quotes on streak and discovery line); zakres "Kierunek" (loop's views are the minimum) with kronika Context (loop's filters, loop did not note streak loss); rozpoznanie_projektant proposal 8 cost (texts, events of program changes, place of the chronicle -> accepted costs). Onward read: rozpoznanie_nowy_gracz section 2 point 4 and moment 20 and proposal 7.
- D-339 — *Origin* none; no text added, the entry already carried Q1 whole (see question 2 below).
- D-340 — *Origin* none. From Q2 Source (loop noted the start of an action and a wait).
- D-341 — *Origin* none. From Q3 not chosen C (the new player: at 391 only 89 minutes to the win).
- D-342 — *Origin* none; no text added, Q4 already carried whole.
- D-343 — *Origin* none; no text added, Q7 a-e already carried whole (D-311 still rejects "03:32" at the head).
- D-344 — *Origin* none. From Q8 not chosen A + Source (new player moment 20: guessed the fire from the table, wrote it as hypothesis); "cheaper" from A.
- D-345 — *Origin* none; no text added, Q9 already carried whole.
- D-346 — *Origin* none; no text added, Q6 already carried whole.
- D-347 — *Origin* none. From technologia_zapis_dzialania_gry: "how it reports today" (premise in the past tense), options 1-4 "Granice" (lacks of the chosen options), options 7 and 8 (Sentry: region, plan, default collection, page address with fragment against D-224, marked as a reading not a trial; GlitchTip memory without swap; Bugsink unsettled), options 9 and 10 (save read as document; recount in Node). From zadanie_skad_wiem_o_awarii: row 3 and Technology "Changes: D-347" confirmed that the entry now reads "running in the browser"; the server route, the watcher and the server log are in D-355/D-356 and were not repeated. From definicja_mvp2 projected entry: "Today an exception stops the game without a word".
- D-348 — *Origin* none. From kronika Questions carried to cycle 1 and 2 with Context (no events of loss, program change, fire out; program handed to the simulation returned an empty list; shape of the game state could not change, Q1).
- D-349 — *Origin* none. From proporcje Need and Q1 (control question: the aim was the width of the program, not the ratio; loop's scene 336 × 152), answer D and the proposal of the owner (in-place editing needed anyway, no need to shrink), not chosen A (figures 510/606 vs 526/622, verdict quoted in substance), B (174/270, each new line wraps further), C (342 px with three columns added), the large/small variant (already there). Figures 526/622/174/270 checked against D-288 at the head; 510, 606 and 342 only in the note.

Onward passages read: for every note, its Source lines pointing to the definition (quoted passages were in the note), the zakres Kierunek, the research of the designer (proposal 8), the new-player report, the reconnaissance material description. The project concept `koncepcja_projektowa.md` is not named by any Origin of these 16 decisions and was only grepped for the chronicle; nothing more was carried from it. Old-loop code files (the chronicle, the "Teraz" row) are not in the snapshot; their content is quoted inside the notes, and no file name is carried.

## Questions for the orchestrator

1. D-349, rejected way A (scene 336 × 152): the note's own figures give the program 510 px and 606 px for A against 526 px and 622 px for the chosen way, nearly equal. The only reason the note gives against A is the owner's verdict ("this too is a task that does not solve what I want to solve") and, for D, his proposal that in-place editing needed anyway for narrow windows removes the need to shrink the scene. I carried both as the note states them and did not write "a program too narrow to write in". If the wording "hardly less" is too strong a statement of the figures, the clause can be cut to the verdict alone.
2. D-339: the entry says the size of the chronicle "was never measured, estimated at 50 to 60 bytes an entry and several hundred entries". The research report named by D-347's Origin (technologia_zapis_dzialania_gry, option 2) did measure 30 runs of Las with a ready program: median 48 entries, maximum 102, about 8.0 KB on average and 13.4 KB at most as raw JSON, without the player's changes and streak losses. D-339's Origin does not name that report, so I changed nothing in D-339, but its "never measured" and "several hundred entries" sit against this measurement. Decide whether D-339 should carry the measurement (a measurement may stand with its conditions) and soften the claim.
3. D-348: its Origin passage holds two questions without answers; the answer text in the entry is the cycle's own. I added only the premise of the question from the note's Context. Nothing of the existing Rationale could be traced to the note beyond that, and I left it untouched.
4. Layout reasoning of the screen (the area with tabs under the world; the cost "in a low window the chronicle starts below the lower edge"; not chosen W2 and W3) belongs to D-311, which is not in this slice; I read D-311 at the head and it already carries them.
5. D-347 *Rejected* now holds "the save of the game read as a document" and "the map run counted again in Node": ways the research weighed and did not take, each with the limit it gives; the research gives no verdict, the binding sentence only excludes them by omission. Remove them if the orchestrator reads WAY-134 as admitting only ways with an explicit verdict. The server's output and the server's own route for reports (rejected in the definition) were not carried: D-355/D-356 took them.

## Unread material

none of the Origin passages; koncepcja_projektowa.md only grepped (not named by any of the 16 Origins). The handoff's Read list: `.runs/.../task.md` passages were read from the copy in the handoff, not from the file; `foundations/decisions.md:7312-7840` (old range) read at the current range 7921-8449.

## Searches not found or unclear

- "NG7" in rozpoznanie_nowy_gracz.md by name: not found by that label; read as proposal 7 (the journal of the run).
- The old-loop files for the chronicle and the "Teraz" row: not in the snapshot; no question, their content is in the notes.

Commit: 0f13b944 (docs: move the reasoning of D-334 to D-349 into the entries and drop their private origins).
