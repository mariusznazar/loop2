FAIL f3194047

# Review of slices 12–14 (D-222 to D-279), range `7fcf907e..f3194047`

Reviewed: the decisions D-222 to D-279 as they stand at `f3194047`, read by `git show f3194047:foundations/decisions.md`, against their state at `7fcf907e` and against the note passages their old *Origin* named, plus the passages those point on to, read in `the private snapshot of the notes (not committed)/vault/`. Of the 58 decisions in the range, 52 named a note and were compared; D-226, D-236, D-237, D-238, D-268 and D-270 already read `Origin: none` and are unchanged in the range.

Which commit changed what (per-decision comparison of each commit with its parent): `303c16dd` changed D-222–D-225, D-227–D-235, D-239, D-240; `f72e08aa` changed D-241–D-258; the merge `5dea4e7c` changed D-262 (binding sentences, *Verification*, part of *Rationale* and *Rejected*: the footer gone) and D-271 (*Verification*: "folded section of credits"); `95a29574` changed nothing in the range; `45d3bdd7` changed D-259–D-267, D-269, D-271–D-279; `f3194047` changed D-264. As the orchestrator said, the merge's changes were not judged. No commit of slices 12–14 touched a binding sentence, *Scope*, *Based on*, *Relations* or *Verification*.

## Important (blocking)

### I-1 — D-247: added text points to "the approved project definition" and carries a process condition (slice 13)

Place: D-247 *Rationale*, last sentence (added), and *Rejected* (old, kept).

- Entry, added: "A bound can be added later, when the game has matured and the approved project definition has to change for another reason."
- Entry, kept: "*Rejected:* a bound of 7 days with the rest lost — a change of the approved project definition, with its readiness gate and the plan checked again, and no task going ahead until they end; another number — the same cost."
- Note (`petla_zarobkowa_loop2.md`, Q7): „Granicę można dodać później, gdy gra dojrzeje i będzie zmieniać definicję z innego powodu.” Not chosen A: „zmiana zatwierdzonej definicji, czyli bramka gotowości i ponowne sprawdzenie planu; do ich końca żadne zadanie nie stanie się gotowe i nie ruszy żaden cykl.”
- Wrong: with *Origin* `none`, "the approved project definition", "its readiness gate" and "the plan" point to private documents no reader can open (WAY-27, which this task applies; To do 1). The condition "has to change for another reason" and the whole cost of way A are steps of the author's process, not something the product gains or pays. Earlier reviews of this cycle graded the same defect Important (review of slices 9–11, Important 3, D-187). This slice added a new instance in its own text.
- Why it matters: the reader of the entry cannot weigh the rejected bound, and the entry's last sentence sends them to a document they cannot see.
- Fix: keep "A bound can be added later, once the game has matured."; write the rejected ways as the game would have them, "a bound of 7 days, the rest lost; a bound of another number", and leave them without a reason, because the note gives only the process reason (the same fix as D-187).

### I-2 — D-243: the accepted cost describes a placement the foundation no longer has (slice 13)

Place: D-243 *Rationale*, added "Accepted with it".

- Entry, added: "Accepted with it: one more button in a long row of buttons, and one click more where the predecessor game stopped the earning loop when a character was sent."
- Note (`petla_zarobkowa_loop2.md`, Q1): „przy każdej mapie rozwiązanej, obok „Wyślij”, stoi przycisk „Puść w pętlę” … Słaby punkt nazwany w pytaniu: kolejny przycisk w długim wierszu.” The row was the character's row in Siedziba, with one „Wyślij” per solved map.
- Wrong: the binding sentence of D-243 puts „Puść w pętlę” "at each character in the section „Kto idzie” of the card of each solved map, beside „Wejdź”". At `f3194047` that place holds two sending buttons per character: `src/browser/view/maps-screen.tsx:243` ("its program and the two sending buttons (D-329)") draws „Wejdź" (`:321`) and „Puść w pętlę" (`:335`). Siedziba no longer holds sending buttons (`karty_i_katalog_map_loop2.md`, To do 8). So "a long row of buttons" is a present-tense cost true only of a layout `main` has since changed. This is the kind of defect the dispatch names. The executor saw the mismatch (slice-13 report, flag 4) and kept the cost "without naming the place". That still states it as true today.
- Fix: drop "one more button in a long row of buttons" and keep "one click more where the predecessor game stopped the earning loop when a character was sent". The *Rejected* way's "several times more to draw" stays, since it concerns the rejected section.

## Minor

### M-1 — D-246: a premise that has lapsed, kept as history (slice 13)

Entry, added: "When this was settled, Siedziba was not on view while a map run stood in the game state, and a player returning to a manual map run reads the report on reaching it." Note (`petla_zarobkowa`, Context): „siedziby nie widać, gdy w stanie gry jest przejście (`src/browser/view/game-view.ts:236`)”; row 26. D-287 now keeps Siedziba usable while a manual map run waits or has ended. The sentence is marked as past and contradicts no binding sentence, so it is not Important. Still, it tells the reader how the decision came about, and it gives a reason without saying that the reason no longer holds. The review of slices 9–11 asked for such layout history to be left out even in the past tense (its Important 2, for D-185). My answer to the slice-13 question 3: drop the sentence. If it is kept, add that D-287 has since put Siedziba within reach during a manual map run.

### M-2 — D-241, D-251, D-269: clauses of process history (slices 13 and 14)

- D-241: "Before earning loops the game state held one map run, with characters not going in parallel, a cost accepted on the ground that map runs would be rebuilt per character". This is the cost an earlier task accepted (`petla_zarobkowa`, Questions carried to cycle, first: „zadanie 11 przyjęło koszt … aż do zadania 18, które i tak przebuduje przejścia na postać”). It reads against this entry's own *Rejected* ("map runs held by character in place of the one manual map run"). Keep "D-56 has a map run name its character by number" and drop the accepted-cost clause.
- D-251: "The mark comes with the earning loop, whose name it can then use on the screen, since before the loop the game would speak of a loop it does not have. Accepted with it: until the loop came, a trial took stock without a word, though there was nothing yet to foresee." Note Q14: „to zadanie, które wnosi pętlę i może użyć jej nazwy z ekranu … do scalenia tego zadania próba bierze zapas bez słowa”. This was which task brings the mark, and a cost of the stretch between two merges. It no longer binds anything (the review of slices 9–11, Minor 6, D-194, is the same kind).
- D-269: "a way that had not been tried when the question was put". It tells how the decision was reached and refers to "the question". Drop "when the question was put" or the whole clause.

### M-3 — D-264: counts of test cases (slice 14)

Entry: "of the cases there, counted over their blocks and so only approximately, 37 of 67 read the inside of the model directly, 44 fired events through its own `.fire`, 41 walked the whole page and 13 did none of these". Note (`logowanie_w_react`, Context): „Z 67 przypadków tego pliku 37 czyta wnętrze modelu wprost, 44 … 41 … 13 …”. The template's prose rule names "how many files, tests or entries of its foundation the product holds" as the count an entry does not name. These are counts of the product's tests at a past commit, so they are such a count, not a measurement of the thing the choice rests on. My answer to the slice-14 question: take the figures out and say "most cases read the model directly, fired its events or walked the whole page". Keep "the cases that walk the page also build the screens still in DOM", which carries the reason.

### M-4 — D-222: the accepted cost of the chosen way for a badly written address is not carried (slice 12)

Note (`reset_hasla`, question 15, A): „Przyjęty koszt: wyjątek od „zawsze to samo zdanie” z pytania 2 i warunek w formularzu oraz na serwerze.” The entry's "Accepted with it" lists five costs but not this one, while the rejected way B keeps its cost ("the same sentence for any text typed — the player waits for a message that cannot come"). The dispatch names this kind of defect. Add: "an exception to the one answer, and the condition held in the form and on the server alike".

### M-5 — D-227 and D-246: a link or a hedge the note does not give (slices 12 and 13)

- D-227: "the message has the sender and form of the confirmation message and goes out with the same mail settings and the same SMTP password, so it reads as coming from the same place". The note (`reset_hasla`, question 7, Source) says „te same ustawienia poczty i to samo hasło SMTP … nie wiążą ponad to, co mówią D-111 i D-13”. That is a fact of configuration, not a reason, and "so it reads as coming from the same place" now hangs on the SMTP password too. Move the settings clause after the reason: "…so it reads as coming from the same place; it goes out with the mail settings and SMTP password of D-111 and D-13".
- D-246: "{m} means two things in the section, which also departs from the predecessor game". The note (Q19, A) hedges: „to wygląda też na odejście od loop”. Write "which also looks like a departure from the predecessor game".

### M-6 — D-228: "the scope the game started with calls for" does not read (slice 12)

Entry: "requiring a backup outside the Mikrus provider from the outset — adds another destination to operate before the scope the game started with calls for protection against provider-wide loss." A fixed starting scope does not later "call for" anything. The definition's words were "before the MVP requires". Write, for example, "…before anything the game holds calls for protection against provider-wide loss".

### M-7 — D-271: a rejected way for the dust, from an onward passage, is lost (slice 14)

The old *Origin* named the projected entry „Where do the scene's pictures come from?” of `definicja_mvp2_loop2.md`. That entry's own *Origin* points on to `zbieranie_jako_widowisko_loop2.md` for the cloud of dust ("TODO: zbieranie_jako_widowisko_loop2.md … the places of their settlements on the cloud of the pack Smoke & Fire"). The note is in the snapshot. Its Q4 lists, beside the three ways the entry carries, way B: „kurz narysowany samym CSS — nowa wartość koloru do pliku tokenów i odejście od D-271”. Its Q8 gives the product reason against smooth CSS shapes: „gładkie kształty CSS obok pikseli rozjeżdżają jeden styl, który D-271 daje jako powód”. The entry's *Rejected* for the dust has no such way. Add "a dust drawn in CSS alone — a new colour value, and smooth shapes beside the pixels break the one style". The executor did not read this note (slice-14 report, Unread material: the dust *Rejected* "does not come from any note named in the Origin").

### M-8 — D-254 and D-255: some costs and gains of rejected options not carried (slice 13)

The executor's claim that every option now has its cost largely holds. A few costs and gains the reports give are missing:
- D-254 (`technologia_obsluga_gry_przez_agenta.md`, part 5): Puppeteer and Cypress download a browser or program at install, as a development dependency also at `npm ci` in the server image; Chrome DevTools MCP's gain, „gotowe narzędzia pomiaru wydajności, przydatne, gdyby trzeba było zmierzyć ekran przejścia przy 16×”; for Playwright MCP, tool descriptions loaded on demand „zmniejsza część kosztu, o którym mówi producent” (the entry says "more tokens" unqualified).
- D-255 (`technologia_dane_do_sprawdzania.md`, section 5): option C's gain, „dowolny stan bazy, także niedostępny przez trasę zapisu”; option D's gain, „czytelny, przejrzany stan”; option I, „Właściciel dziś nie gra, więc jego zapis nie ma tych stanów”.

### M-9 — pointers left in text the slices did not change (edge of the task)

With *Origin* now `none`, these unchanged sentences point to private documents or to tasks: D-232 *Rejected* "the private half only in the note … would leave the note holding the only one"; D-249 *Rejected* "the project definition changes with its gate"; D-273 *Rejected* "the plan records neither its cost nor the human's reason for it … a test at the task that first adds a picture, a change of the answer that the tasks bring no test files, and a change of the plan"; D-274 *Rejected* "a divergence from the project definition's entries" and *Rationale* "takes its look in the task of its screen"; D-276 *Rejected* "of the project definition's entry" (twice); D-277 *Rejected* "the task that builds the menu bar … that task losing its main reason to wait for this one"; D-279 *Rejected* "D-40 joins the divergence from the project definition, and the plan gains one more entry the task that writes that decision has to keep in mind". The review of slices 9–11 graded the same kind Minor (its Minor 7, D-154). The D-247 instance is part of I-1. Rewrite each as the game would have it, or leave the way without a reason where only the process reason exists.

## Declined to judge

- D-262 binding sentences, *Verification* and the footer clauses, and D-271 *Verification*: changed by the merge `5dea4e7c` (main's text), outside the slices.
- `95a29574`: changes no decision of the range; already accepted by another review.
- D-227 binding sentence naming the sender address `loop2@mariusznazar.com`: an unchanged binding sentence and the product's own sender, outside what the task changes.
- D-226, D-236, D-237, D-238, D-268, D-270: unchanged in the range and named no note.

## Executors' and orchestrator's questions — my view

- Slice 12, 1 (D-239, the concept's „Wisi nad nią rewizja”): right to leave out. It is a pending review tied to the concept's own D25, not a reason for this choice. The entry's "come back the next day" already drops "to buy learning".
- Slice 12, 2 (D-233, way B's planning reason): right. „plan musi dołączyć zadanie 17 i ustawić kolejność” is process.
- Slice 12, 3 (D-224/D-225, "the link alone authorises"): right. It belongs to the placement of the form, and D-96's *Rationale* carries it: "A page opened by a password-reset link shows its form even to a player signed in in that browser … since the link itself entitles to the change."
- Slice 12, 4 (the owner's motives in the Technology section): right for these two. D-228's motive („kopia ma przeżyć utratę całego serwera gry. Najpierw sprawdzić … Strych”) is its binding sentence. D-229's „prosty start” is what "avoids another native runtime package and its installation" already says.
- Slice 12, review conditions without dates and "the MVP" replaced: right, consistent with the review of slices 9–11, Minor 1. The D-228 replacement does not read (M-6).
- Slice 13, 1 (reasoning kept that the notes given do not hold): right, kept and not invented. D-254's "a command sent at each tab" and D-255's lacks and risks stand in the approved projected entries of `definicja_mvp2_loop2.md` (lines 1156–1157 and 1171).
- Slice 13, 2 (D-254 "no clock found in their descriptions"): right. Part 4 of the report has „Zegara nie ma w spisie narzędzi” for Chrome DevTools MCP and „Zegara nie znalazłem w opisie” for agent-browser, and the critique says the clock matters only for a return after an absence.
- Slice 13, 3 (D-246's lapsed premise as past): see M-1. Drop it, or say it no longer holds.
- Slice 13, 4 (D-243 "long row"): a defect. See I-2.
- Slice 14, 1 (D-264 counts): take them out. See M-3.
- Slice 14, 2 (D-264 to D-267 and D-269 keep their reasoning, notes add only context): right.
- Slice 14, 3 (D-267 and D-277 gained no text): right for the notes' reasoning. D-277's kept *Rejected* is a process pointer (M-9).
- Orchestrator, defect kinds from earlier ranges: a past state as a present fact — I-2; a chosen option's cost lost while rejected ways keep theirs — M-4; "the definition" or "the task" in added text — I-1, with old instances in M-9; test expectations grounded in a number no entry holds — none found; reasoning the notes point on to — the concept passages behind D-239 and D-240 are carried, the dust passage behind D-271 is not (M-7); a sentence true of a layout `main` has changed — I-2.

## Every decision compared with its passages (52)

Slice 12 (`303c16dd`):
- D-222 — reset_hasla Q2, Q13 (=Q12), Q15 (=Q14), row 3: ways B, C, the form-gone way, the any-text way carried; D-105 „try later” and the typo case added. Q15's accepted cost lost (M-4).
- D-223 — Q3, row 4: cost, review condition, way B carried; D-105's monthly-only premise added. OK.
- D-224 — Q4, row 5: "built as the confirmation link" carried; no way not chosen for the form of the link, so `unknown` stands. OK.
- D-225 — Q4, Q14 (=Q13), rows 8–11 and 13; ekrany_i_menu Q16: costs and ways carried; „Anuluj” to Siedziba and the plan's departure-from-D-96 remark added. OK.
- D-227 — Q7, Q9, rows 16 and 18: Q9 cost and way B carried; settings clause added (M-5).
- D-228 — definicja_mvp entry: equal plus its review condition; "the MVP" rewording unclear (M-6).
- D-229 — definicja_mvp entry: equal plus its review condition. OK.
- D-230 — kopia_bazy Q1, row 1: costs, B, C, D carried; 385 against the note's 440 explained by the entry's own eight-file arithmetic. OK.
- D-231 — Q3, row 2 (and rows 3 and 6 by reach): costs, refiner effects, B, C carried; the new Strych key in D-13 added. OK.
- D-232 — Q4, row 4: costs, gain, B carried ("after the public launch" added). Old "the note" pointer (M-9).
- D-233 — Q5, rows 8 and 9: D's weak points, A, B, C, review ways carried; the H4 trial added without its address. OK.
- D-234 — Q6, row 12: costs, refiner's later-schema cost, B, C carried. OK.
- D-235 — To do 9: past-tense premise on the testing guidelines' table added; true at the head, where `guidelines/testing.md:57` now holds the rule. OK.
- D-239 — koncepcja D22 and §5, definicja_mvp entry: all of D22 carried, its catch-up claim added; the review trigger rightly left out. OK.
- D-240 — koncepcja D23 and §4, definicja_mvp entry: "no server of its own" and "the order of the list becomes a contract" added. D23's "matches uninterrupted play by D19" is carried by D-22 *Rationale* ("The catch-up stands on it …"), which D-240 derives from. OK.

Slice 13 (`f72e08aa`):
- D-241 — petla To do 3, 4, 6, carried question 1: practice kept with the loop added; history clause (M-2).
- D-242 — To do 2, 11, 12, 14, carried question 3: To do 14's resurrection reason and D-04's quote added. OK.
- D-243 — Q1, Q3, rows 1, 2, 5; definicja_mvp2 entry; karty To do 5: costs and the predecessor's behaviour added; stale "long row" (I-2).
- D-244 — Q2, Q20, rows 3, 4; definicja_mvp2 entry; karty Q5: all costs and ways B, C carried. OK.
- D-245 — To do 8, Q5, Q18, row 7: the definition's pay reason, Q18's condition and ways B, C carried. OK.
- D-246 — To do 16, Q6, Q19, Q21, rows 10, 11, 22–24, 26; koncepcja §5: all ways and weak points carried; lapsed premise (M-1); hedge (M-5).
- D-247 — To do 11, 13, Q7, rows 12 and 25: measurement and departure added; pointer and process (I-1).
- D-248 — To do 10, Q8, carried question 5, row 13: browser clock "as in loop" and the name's reason added. OK.
- D-249 — To do 15, Q9, rows 16 and 17: row 16 added; old *Rejected* pointer (M-9).
- D-250 — To do 2, P1, Q17, row 20: the one-`paused` premise added in the past tense. OK.
- D-251 — To do 18, Q14, row 21; definicja_mvp2 entry; karty To do 5: Q14 B reasoning added as task-order history (M-2).
- D-252 — reguly Q1, Q9, Q10, row 1; teksty Q7, row 1: everything already carried. OK.
- D-253 — reguly Q4, row 2; napis Q4, row 2: the place field, the once-only line and the agent's limits added; the `place=` claim true at `src/browser/view/app.ts:73`. OK.
- D-254 — technologia_obsluga_gry_przez_agenta (whole report and critique): rationale and every option carried; a few costs and gains missing (M-8).
- D-255 — technologia_dane_do_sprawdzania (whole report); edytor To do 16 and Context line 24: carried; a few gains missing (M-8).
- D-256 — lokalny_start Q1, row 1: already carried. OK.
- D-257 — Q2, row 2: the code fact and D-111's rejected mode (quoted in the Source) added. OK.
- D-258 — Q3, row 3: already carried. OK.

Slice 14 (`45d3bdd7`, `f3194047`):
- D-259 — logowanie_w_react Q1, S1: already carried. OK.
- D-260 — Q2, S2: already carried. OK.
- D-261 — Q3, S3 (and logowanie_na_tle_gry Q6): "(D-272)" added. OK.
- D-262 — logowanie_w_react Q4, S4; napis Q6 (Q3 by reach), row 5: why the case is written here, the rejected "leave it out", and D-27's footer reason added. OK.
- D-263 — Q „Którym narzędziem…”, S6, Context; plan_mvp2 Open questions: Vite and the lockfile premise added. OK.
- D-264 — carried question 1, Context; technologia_budowanie_ekranow, Konsekwencje/Testy: the trial and jsdom's cost added; counts (M-3).
- D-265 — carried question 2; hierarchia To do 11, Q5, Q5b, row 7; technologia_budowanie_ekranow line 118: the controls' past form and the guidelines' past status added. OK.
- D-266 — carried question 4, Context: the pre-bundle layout added in the past tense. OK.
- D-267 — carried question 5: nothing beyond the entry. OK.
- D-269 — carried question 6, Context: the one constant added; "when the question was put" (M-2).
- D-271 — zakres „Postać w scenie”; rozpoznanie_frajda part 7; definicja_mvp2 entry; scena To do 2: frajda's reasons carried; onward zbieranie Q4 way B lost (M-7).
- D-272 — rozpoznanie_projektant C.2; frajda part 7; definicja_mvp2 entry: frajda's reasons added; the Siedziba band of C.2 rightly not written, since the binding sentence does not have it. OK.
- D-273 — logowanie_na_tle_gry Q3, Q4, C1; plan_mvp2 Open questions: added. The shared copy function is rightly past tense: `scripts/static-files.mjs:32-35` now copies sprites for the application's build only. Old process pointers (M-9).
- D-274 — hierarchia Q1, Q1a, Q1b, row 1; karty Q6: states and the „Wejdź” reason added. Old pointers (M-9).
- D-275 — Q1, Q1a, Q1b, row 2: states added. OK.
- D-276 — Q2, Q2a, Q2c, row 3: states added. Old pointers (M-9).
- D-277 — Q2b, row 4: nothing added. Old process pointer (M-9).
- D-278 — Q4, row 5: measurement at 1280 × 800 added. OK.
- D-279 — Q3b, row 8: D-40 and the note reading added. Old process pointer (M-9).

## Pointers and leaks

All 58 *Origin* fields in the range read `none`. No added text names a note file, a path, a host address, an account, an e-mail address or a secret. "A message … reached the owner's mailbox" (D-233) carries no address. The pointers are in I-1 (added) and M-9 (kept).

## Checks run

- `git -C <worktree> rev-parse HEAD` → `f3194047455e22a6780abd2c604e1aa30f6f5500` when the review began (exit 0). The entries were read only through `git show <commit>:foundations/decisions.md`.
- `git log 7fcf907e..f3194047`, `git log --first-parent`, `git diff --stat 7fcf907e..f3194047` (exit 0).
- `git show <c>:foundations/decisions.md` for `7fcf907e`, `303c16dd`, `f72e08aa`, `5dea4e7c`, `95a29574`, `45d3bdd7`, `f3194047`, split per decision by a scratch Python script, and each commit compared with its parent for D-222 to D-279 (exit 0). Result: the attribution at the top.
- `python -B .the-way/elements/common/foundation_check.py` on a snapshot of `f3194047`: `git archive f3194047`, the pinned the-way `e9a0f926` (the gitlink at `f3194047`, equal to the worktree's `.the-way` HEAD) archived into it, and a scratch git repository with `.the-way` registered as a gitlink, 458 tracked paths as at `f3194047`. Exit 0, "0 errors". A first run without the gitlink exited 1 on `part_map.md:128` (`.the-way` matched no tracked file), which was an artifact of the snapshot.
- `grep -nE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania'` over D-222 to D-279 at `f3194047`: no line (exit 1). `Origin: none` 58 of 58.
- `grep -niE "the definition|project definition|the plan\b|the task\b|the MVP|the note\b|readiness|question was put|the human"` over the range: the hits are sorted into I-1, M-2 and M-9; the remaining hits are product wording ("readiness line", "the human's consent").
- Code facts at `f3194047`, by `git show` / `git grep`: `src/browser/view/maps-screen.tsx` (two sending buttons per character, `:243`, `:321`, `:335`); `scripts/static-files.mjs:32-35`, `scripts/kitchen-sink.mjs:5,32`; `src/browser/view/app.ts:73` (`place=view/app.startFrom`); `guidelines/testing.md:57`.
- Not run: the product's test suite. The change touches only `foundations/decisions.md` text in this range, and the full suite is the cycle's own run.

## Reaches beyond the dispatch

- `foundations/decisions.md` at `f3194047`: D-07, D-22 (whether D-240's lost D19 reason stands elsewhere), D-55, D-56 (D-241's added claim), D-96 *Rationale* (where "the link itself entitles" stands), D-287 (D-246's premise).
- The earlier reviews `review-9-11-report.md`, `findings-9-11.md` and the headings of `review-3-5-report.md` and `review-6-8-report.md`, to grade consistently with this cycle.
- `zbieranie_jako_widowisko_loop2.md` Q4 and Q8 (the onward passage of D-271's projected entry), `plan_mvp2_loop2.md` lines 137–197 and 341 (D-263, D-273, D-271), `edytor_programu_loop2.md` line 24 (D-255's added claim), `definicja_mvp_loop2.md` Technology lines 140–170 (slice 12's question 4).
- The code files under Checks run.

## Unread material

- `docs/task-cycles/martwe-odsylacze-origin/task.md`: not opened. I relied on its passages copied in the handoff.
- Of the executors' *Read* lists, these were not read: `.claude/skills/the-way-record-decision/SKILL.md`, `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `.the-way/elements/decisions/examples.md`, WAY-03 in `.the-way/foundations/decisions.md`, `.the-way/elements/common/way_of_working.md`, `.the-way/task-cycle/skill/foundation_step.md`, and "Foundation entries row 2 (D-362 as changed)". I read the decisions template, `rules.md` and WAY-27 whole, which the handoff names for the rules of an entry.
- Notes, read in part: `reset_hasla` Questions to settle, Context, carried questions, Settlements (Description and Decisions in play unread); `kopia_bazy` lines 36–141 and 186–210; `definicja_mvp_loop2` lines 140–180, 641–710, 895–931, 1373–1412; `koncepcja_projektowa` lines 200–247, 471–540, 778–806; `ekrany_i_menu` question 16 and its *Decisions in play* line; `petla_zarobkowa` lines 18–280 and 345–380 (Human actions and Decisions in play unread); `karty_i_katalog_map` To do 5 and questions 5–6; `definicja_mvp2_loop2` lines 332–362 and 996–1175; `reguly_awarii` questions 1–11 and Settlements; `zadanie_loop2_teksty_rozjechane_z_kodem` question 7 and row 1; `napis_o_awarii` lines 42–131; `technologia_obsluga_gry_przez_agenta` whole; `technologia_dane_do_sprawdzania` whole; `edytor_programu` lines 24, 33, 44–45, 57, 234, 256, 302; `lokalny_start` Q1–Q4 and Settlements; `logowanie_w_react` lines 65–162 and Settlements; `technologia_budowanie_ekranow` lines 110–155; `zadanie_hierarchia_przyciskow_i_karta_logowania` lines 25–140 and Settlements (Context unread); `logowanie_na_tle_gry` lines 51–108 and row C1; `rozpoznanie_frajda` part 7 (lines 217–262); `rozpoznanie_projektant` C.2; `zakres_mvp2` „Postać w scenie”; `scena_z_ludzikiem` To do 1–10; `plan_mvp2_loop2` lines found by grep (137–197, 341); `zbieranie_jako_widowisko` lines found by grep.

## Searches not found or unclear

- `wilk_wbiega_loop2.md`, named beside `zbieranie_jako_widowisko_loop2.md` in the *Origin* of the projected D-271 of `definicja_mvp2_loop2.md`, is not in the snapshot's `MANIFEST.md`. It concerned "the cloud of a scuffle", which D-271's binding sentence at `f3194047` no longer holds, so I judged it outside D-271's present reasoning; it stays unread.
- The handoff calls the defect class "reasoning that the notes point on to the project concept"; for D-271 the onward pointer goes to a task note rather than to the concept. I treated it the same way (M-7).
