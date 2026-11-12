# Report — fix of the review of the whole change, part 2 (D-152 to D-279 and the listed later decisions)

**Status:** done with concerns (the handoff contradicts itself on D-280 and above; see Choices).

- Base: `03541eae7adfd491078043f899ee14d447c89080` (worktree clean at start).
- Commit: `58600416` on `task/martwe-odsylacze-origin`, not pushed. One file: `foundations/decisions.md` (101 insertions, 106 deletions). Only *Rationale* and *Rejected* lines, plus the one *Based on* line of D-317 (finding 25 assigns it).
- Skill: I did the steps of `the-way-record-decision` (read the template, `read.md` and `decide_entry.md`; decided each entry is an edit of an existing one; drafted from the head and the snapshot notes; wrote with the editor tool; ran the check). No binding sentence, *Verification*, *Relations* or *Origin* line changed.

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py` -> exit 0, "0 errors".
- `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` -> exit 0, "444 files, 0 listed".
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- . ':(exclude).the-way'` -> exit 1 (no line).
- Gate not run; no focused test applies (prose only).

## Per finding (old -> new, entry)

**I-1**
- D-154: "SMTP credentials stay outside the definition" -> "outside the repository (D-13)"; D-13 holds `/etc/loop2/smtp-password` outside the checkout.
- D-176, D-177 *Rejected*: "other numbers, or other answers to the points of the question about the numbers of nature energy ..." -> "a cap, a start, a price, a rate or a threshold of nature energy other than the predecessor game's, chosen one by one instead of its numbers taken together" (the reviewer's wording of Minor 5).
- D-232 *Rejected*: "private half only in the note ... leave the note holding the only one" -> "private half only off [the server] ... leave that one copy holding the only private half".
- D-249 *Rejected*: "so the project definition changes with its gate" removed; the product reason "`catch-up-state` stops being true" stays.
- D-273 *Rejected*: "the plan records neither its cost nor the human's reason ... a change of the plan" removed; the way "a permanent refusal test ..." stays with no reason (the note gives only the process); the second way keeps "a test with the first picture added". *Rationale*: "the tasks that add the scene's pictures bring no test files" -> "a further picture of the scene brings no test file".
- D-274 *Rationale*: "as a design review of the screens of loop names it" removed; "takes its look in the task of its screen" -> "from the decision of its screen". *Rejected*: "a divergence from the project definition's entries" removed.
- D-276 *Rejected* (two places): "and of the project definition's entry" removed. Also "a task that needs them adds them" -> "a screen that needs them adds them".
- D-277 *Rejected*: "the task that builds the menu bar settling the mark ... that task losing its main reason to wait" -> "the mark settled later, once the menu bar can be seen — a second conversation about the look".
- D-279 *Rejected*: "D-40 joins the divergence from the project definition, and the plan gains one more entry ..." removed; the way "a change of D-40" stays with no reason (D-187 and D-247 precedent).

**Minor 13 (D-173).** Added to *Rejected* "it hides the screen, the copy included" for the window way, and to "Accepted with it" "one sentence more in the question in the rare case where the program the copy belongs to holds changes the copy lacks" (note `pytanie_przy_zakoncz`, Q3 A cost; the D-172 line is that sentence).

**Minor 28.**
- D-152, D-153, D-154: the review condition of each projected entry carried as the last sentence of *Rationale*, without the check-by date ("The choice is to be looked at again if ...", as D-202 words it). Conditions read from the definition's three entries.
- D-180: the clause "when the same editor was to serve the copy ..., a plan there could not be corrected" removed; the way stays with no reason. The entry itself accepts "the plan of the copy is not changed during a map run", so the clause had lost its meaning.
- D-166: added the P1 cost "Programy did not lack width when this was chosen (2026-11-08), so opening the panel in place there gains it no width" (dated as the premise of the choice, not as a claim about the head) and the gain of the rejected way "though a fix would then work from every place".
- D-194: the "Accepted with it, for the time before the earning loop entered the game ..." clause removed (a transitional stretch that has ended). Also removed from *Rejected* "it is also a change of the goal of the work and of its plan, ... and this decision changed twice" (a pointer to the plan; process). The last way (the payment and the loop in one push) kept as it was.
- D-186: "this gives early a part of what a clear showing of the trip plan ... asks for" -> "this gives a part of what a panel showing clearly which trip plan is in force in the map run going on would give".

**Minor 29.**
- D-189: "need not be closed to take the day's pay" -> "the map run in progress need not reach its completion for its practice to be paid"; "(D-239, D-129)" -> "(D-239, D-21)" (D-21 holds one game minute per real second times the pace); "Measured when every completion still paid" -> "Measured in the predecessor game, when ...".
- D-191: "stay at the first level" -> "tend to stay"; "no longer only the solution" -> "not only the solution".
- D-190: "which the design gives as the place where a program is lost at no cost" -> "the place where a program could be lost at no cost"; "the design points to a later direction, not built, in which ..." -> "a later direction, not built, is a death that brings a character of other predispositions, the reset then being a new run ...".
- D-179: "because carrying in costs" -> "so that carrying in costs" (the source's direction); "is no longer a pure repetition" -> "is not a pure repetition".

**Minor 16.** D-185 *Rejected*: "a line directly under the status row" -> "the line standing first, ahead of the other lines of the end" (the same reason, "a win opens with what did not come", which D-368 *Rejected* gives for its own option). D-216 *Rejected*: "the same in the status row, which the header then held" -> "the same in the header". D-216 *Rationale* (Minor 12): "though the earlier wording said that practice stays" removed.

**Minor 27.** D-246: sentence "When this was settled, Siedziba was not on view while a map run stood ..." removed (the lapsed premise; the binding sentence already says the player reads the report on reaching Siedziba); "which also departs from the predecessor game" -> "which also looks like a departure from". D-241: the accepted-cost history clause removed, "D-56 has a map run name its character by number" kept. D-251: history clause and "until the loop came, a trial took stock without a word" removed; I also removed "its cost was not named" after "another text, given by the human" (it tells how the decision was reached, as in D-122). D-269: "a way that had not been tried when the question was put" removed. D-264: the counts 37 of 67 / 44 / 41 / 13 -> "most of the cases there read the inside of the model directly, fired events through its own `.fire` or walked the whole page". D-222: added the cost "an address badly written is an exception to the one answer, and its condition is held in the form and on the server alike". D-227: "so it reads as coming from the same place" now follows the sender and form only; the mail settings and SMTP password clause comes after, with D-111 and D-13. D-254: added the Playwright MCP cost qualified (descriptions load on demand), the Chrome DevTools MCP gain (ready performance tools), the Puppeteer and Cypress install downloads. D-255: added the gains of writing into the database (any state, also one the save route cannot reach) and of ready files (readable, reviewed), and the owner's save without these states. All from `technologia_obsluga_gry_przez_agenta.md` and `technologia_dane_do_sprawdzania.md`, dated 2026-11-01. I wrote the Puppeteer/Cypress cost without the file name `Dockerfile:4` because the template keeps file names out of *Rationale* and *Rejected*; checked that the head's `Dockerfile` runs `npm ci` in the build stage.

**Minor 22, 23, 24, 25, 26 (decisions above D-279, see Choices).**
- D-347 *Rationale*: "so a real map run holds more entries. The chronicle ... fits" -> "so a map run with such changes or losses holds more entries. By that measurement the chronicle ... fits".
- D-280 *Rejected*: added "by about 190 px between Siedziba and Programy" and "the same rows on Postać and in Wiedza". D-282: "In a review of the sketched screens against what the game was to grow into". D-284: derivation sentence replaced by "A return finds the map run in the pause that leaving put it in (D-283), and from that pause the player goes on with „Wznów” (D-122)."
- D-288: "Writing a program without grimacing is what the project is judged by, and" removed (the evidence of the complaints stays); "keyboard handling of its own in the largest task" -> "... and one sentence more in the decision" (the note's wording). D-299: "come back with the content of a later project, once that content outgrows the pick" -> "should the game's content outgrow the pick, both may be called for again". D-309: "the approved sentence of D-308 gets an exception" -> "D-308 would need an exception". D-316 (named in finding 24 but not in the handoff list): "left out of the project, would enter it" -> "it would bring in a piece of a scene showing the character's tile, as a sketch of the scene does". D-320: "an icon that the work on combat may not leave" -> "that later work on combat may drop"; "a fraction of a second" -> "0.06 s at the fastest pace (16×)" (the frajda table: 0,06 s at 16×).
- D-311: way C "in a low window it stands under the lower edge" added; way A "in one column (a window narrower than 1074 px)" added (1074 px checked at `src/browser/styles.css:279`); "about as much width" now has its second term (the 526 and 622 px of this layout, as D-288 and D-349 give them) and "the aim was" -> "the aim is"; "split of the widths of three columns unchanged"; "(D-370)" -> "(D-370, D-371)"; "it took about 150 px" -> "in this game it took about 150 px ..., where loop keeps the plan on Programy"; "whole screen" -> "whole page" (as D-370).
- D-317: *Based on* `none` -> WCAG 2.2 criterion 2.3.1 and the "general flash and red flash thresholds" definition, address, place, passages quoted word for word and read 2026-11-12 (I fetched the page; the 341 x 256 rectangle is the source, the product 87,296 is arithmetic, so the *Rationale* now names both). Trial caveat added: the program won Las in 10 of 20 tries, so the figure is an example of an order of magnitude.

## Not changed, and why

- Minor 17 (D-324), 21, 1, 2, 9-12 for D-368/D-369 and D-122's remaining items: next parts or already done in part 1.
- Minor 13 as "D-173 lost 'which the foundation avoided'": not carried; no longer true (D-368 is a window).
- D-228 M-6 ("the scope the game started with calls for") and D-271 M-7 of review 12-14: not in the numbered findings' list for Minor 27 (M-1 to M-5 and M-8), so not touched.
- Unassigned occurrences of "task" in prose of D-265, D-267, D-268, D-270 and D-208 ("when this was weighed") found by a sweep: not in any finding, left. For the orchestrator.

## Choices and their cost if wrong

- **Contradiction in the handoff.** Its list assigns me Minor 22, 23, 24, 25 and 26, whose decisions are D-280 and above (D-347, D-280, D-282, D-284, D-288... D-320), while its last sentence says not to touch decisions above D-279. The part 3 handoff lists D-280 to D-386 but none of those findings, so nobody else would fix them. I followed the explicit list. Cost if wrong: part 3 will see changed text in six or seven decisions it owns; the changes are small and in the commit `58600416`, which can be reverted by path hunk.
- D-194, D-251, D-276, D-273: I also removed small process clauses next to the named ones (plan, "task", "its cost was not named"). Cost if wrong: a reviewer may call this growth beyond the finding; each is one clause.
- D-317 *Based on*: written inline, not as an environment fact, because the foundation file `environment_facts.md` holds WCAG criteria 1.4.3, 1.4.11 and 2.4.7 as environment facts; adding 2.3.1 as a fact would go through `the-way-record-environment-fact` and the orchestrator may prefer that. Cost if wrong: the citation is a second place for a WCAG source.
- D-185 *Rejected*: "the line standing first" is my reading of "directly under the status row" (the first line of the old screen). Cost if wrong: the way is described slightly differently from the note; the reason is the note's.

## Own-work check

Requirement most likely not met: no sentence says something untrue of the head, and none names a note, task, plan or definition. Checks: for each present-tense addition I read the head (Dockerfile `npm ci`, `styles.css:279` 1074 px, D-13, D-21, D-111, D-283, D-368, D-370, D-371, D-349 figures) or dated it (2026-11-08 for Programy width, 2026-11-01 for the readings, "when this was chosen"); the private-name grep finds no line; `foundation_check.py` 0 errors; a diff scan shows no changed field line except D-317 *Based on*.

## Unread material

- `elements/common/way_of_working.md` and `rules.md` beyond the template: not read this run (read in part 1's report); `examples.md` read in part.
- Notes read in part only, by grep for the passages: `definicja_mvp_loop2.md` (Review when lines of three entries), `plan_wyprawy_loop2.md` (Q8), `pytanie_przy_zakoncz_loop2.md` (Q3), `zadanie_proporcje_sceny_i_programu_loop2.md` (Q3), `logowanie_na_tle_gry_loop2.md` (Q4), `koniec_przejscia_loop2.md` (Q1 A/C lines), `rozpoznanie_frajda.md` (lines 138, 147-150), technology notes (tables). Entries D-152 to D-279 not named by a finding were not read whole (swept by grep).
- The text of review 18-20 M1-M6 and of review 15-17 I-items (already fixed by earlier slices) was read only for the lines I touched.

## Searches not found or unclear

- Whether D-228's and D-271's Minor items (review 12-14 M-6, M-7) belong to this fix: unclear (not in the handoff's list).
- Which of loop and this game the 150 px of D-311 belongs to, beyond the note's "dziś w loop2": I wrote "in this game" and dated nothing; the note is 2026-11-08.
- The previous review's items for D-173 "which the foundation avoided" and "a new kind of element": judged no longer true; not carried.
