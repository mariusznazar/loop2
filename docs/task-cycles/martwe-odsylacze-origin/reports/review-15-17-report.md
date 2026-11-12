FAIL 769f5e244db91bb8f120746e6d5327426958fcd7

# Review of slices 15–17 — reasoning of D-280 to D-322 into the entries

Range `f3194047..769f5e24` (commits `1f8e1bb2`, `cdf5ee15` slice 15; `a732d90d` fix of D-243/D-247, accepted elsewhere and not judged; `3ba0db45` slice 16; `769f5e24` slice 17). Entries read only from `git show 769f5e24:foundations/decisions.md` and `git show f3194047:foundations/decisions.md`; line numbers below are those of `foundations/decisions.md` at `769f5e24`. Notes read from `the private snapshot of the notes (not committed)/vault/`.

Blocking: 6 Important (all in slice 17's decisions, two of them on kept text the slice left standing). Minor: 9. Out of scope: 1.

## Important

### I1 — D-311 *Rejected*: an invented reason, contradicted by the note's own numbers, and "the change" as a reason (slice 17)

Place: `foundations/decisions.md:7389-7390`.

Entry: „the scene shrunk to its size in loop with the split of the widths unchanged — it does not solve what the change is for, a program too narrow to write in (D-349).”

Note (`zadanie_proporcje_sceny_i_programu_loop2.md`, Q1, Not chosen A): „Scena 336 × 152, reszta podziału bez zmian (program 510 px w oknie 1280 px, 606 px przy treści 1344 px) — „A teraz to też jest zadanie, które nie rozwiązuje tego co chcę rozwiązać”.” Chosen D gives „526 px w oknie 1280 px i 622 px przy treści 1344 px”; Need: „celem jest szerokość programu, nie sam stosunek sceny do programu, bo w oryginalnym Loop scena ma 336 × 152 px, a tu zostaje dwa razy większa”; row 3: „nie musimy zmniejszać sceny”.

What is wrong: the way was not rejected for leaving the program narrow — by the note it gives the program 510/606 px, within 16 px of the chosen 526/622 (and wider than loop's ~470 px at 1280, Context). The note's reason is that the human wanted the program wide *without* shrinking the scene. „a program too narrow to write in” is invented (copied from D-349, which carries the same error, see Out of scope), and „what the change is for” is a process reference to the task. Fix: „…unchanged — it would give the program about as much width (510 px in a window 1280 px wide, 606 px at 1344 px) only by halving the scene, while the aim was a program as wide as in loop with the scene kept at its size (D-349)”, or drop the way here and leave it to D-288/D-349, which already reject it.

### I2 — D-311 *Rationale*: a light the scene does not have, attributed to D-132, which does not give it (slice 17)

Place: `foundations/decisions.md:7339-7341`.

Entry: „„✕” uncovers the scene, which keeps under the window the light that D-132 gives a solved map.”

Note (`koniec_przejscia_loop2.md`, Q1 Answer): „Pod oknem scena zostaje ze światłem w pełnym złocie po rozwiązaniu, które D-132 w definicji każe pokazać, a „✕” ją odsłania, więc droga nie zmienia definicji.” Same note, *Out of scope*: „Światło sceny w pełnym złocie po rozwiązaniu i efekty śmierci i rozwiązania w scenie — zadania 18 i 19”.

What is wrong: the light belongs to the project definition's D-132, not the foundation's. D-132 at `769f5e24` says nothing of light or dawn (read whole), and no code at `769f5e24` draws a night or a dawn (`git grep -i "night|dawn|noc|świt" 769f5e24 -- src/browser` prints nothing; D-315 itself now says „the scene has no night until that layer is built”). The sentence states as present a light that neither the linked entry nor the game has, and the note's reason behind it („więc droga nie zmienia definicji”) is process. Fix: drop the clause after „„✕” uncovers the scene”, or, if the reason is wanted, say „so the scene, where a solving is to be shown (D-315), is one click away”.

### I3 — D-311 accepted cost written as present though it has been built (slice 17)

Place: `foundations/decisions.md:7346-7347`.

Entry: „…until the player opens it with „Koniec przejścia”; the keyboard handling, Escape and the return to the window are to build.”

Note (`koniec_przejscia_loop2.md`, Q1): „Koszty, które człowiek przyjął: okno zasłania scenę, D-311 dostaje zdanie o oknie, a klawiatura, Escape i powrót do okna są do zbudowania.”

What is wrong: this was the cost of work to be done when the task was refined; D-311's own binding sentence at `:7284` says „„✕” in it and Escape pressed in it (D-370) close it and uncover the screen, it opens again at every entry on the screen of an ended map run”. A note's statement about a past state written as a present fact of the log — the kind the handoff names. Fix: either drop it or state the lasting cost: „the window needs keyboard handling of its own, Escape included, and a way back to it (D-370)”.

### I4 — D-311 *Rejected*: two ways kept without the reasons the named passage gives (slice 17)

Place: `foundations/decisions.md:7354-7355`.

Entry: „the needs below two drawings of one place, as in loop; the trip plan under the editor during a map run;” — no reason after either.

Note (`rozpoznanie_projektant.md`, A.2, which D-311's old *Origin* named): „Potrzeby i cel stoją nisko | Ciepło i sytość zaczynają się na wysokości około 590 px, passa na 650 px, drobnym drukiem i z paskiem 4 px” and „Dwa rysunki tego samego miejsca | Scena i siatka zajmują razem około 320 px, zanim padnie pierwsza liczba”. For the trip plan, A.3 (same report): „Plan wyprawy stoi w Programach i jako podsumowanie na karcie mapy, nie na ekranie przejścia: tak było w starym Loop, a dziś w loop2 zajmuje około 150 px pod edytorem w trakcie gry”; the foundation's D-180 already rejects it with „it takes the space of what the player watches”.

What is lost: the reasons and the measured figures for two rejected ways — the failure this task exists to remove. Fix: „the needs below two drawings of one place, as in loop — the scene and the grid took about 320 px before the first number, the needs began about 590 px down and the streak about 650 px, in small print with a 4 px bar; the trip plan under the editor during a map run — it took about 150 px of what the player watches (D-180)”.

### I5 — D-312 and D-313 keep reasons that rest on "the definition" (slice 17, kept text)

Places: `foundations/decisions.md:7428` and `:7475-7476`.

Entries: D-312 „no sentence about the rule — a departure from the project's definition”; D-313 „the button left for later — a departure from the approved wording”.

Note (`ekran_przejscia_loop2.md`): Q6 Not chosen „bez zdania do zadania 10 — odejście od definicji”; Q5 Not chosen „przycisk później — odejście od zatwierdzonego brzmienia i wskazanie zadania”. The definition's sentence is quoted in the same sources: D-122 „names what was discovered and the program rule the game wrote” (Q6) and „with „Dodaj regułę z tym” and „Wznów”” (Q5).

What is wrong: both reasons point to a document no reader can open (WAY-27, *violates*: „a rationale rests on „as in our other product” without saying what was seen”), which this task removes elsewhere. The slices changed both entries and left these clauses. Fix: say what the departure would lose, from the foundation: D-312 „no sentence about the rule — the band would not name the program rule the game wrote, which D-122 has it name”; D-313 „the button left for later — the band would lack the button D-122 gives it”.

### I6 — D-316 *Rationale*: "the concept of the game" as the authority (slice 17)

Place: `foundations/decisions.md:7550-7551`.

Entry: „The concept of the game has drawn the scene from the state of the run alone, with positions and animations in CSS and no loop of rendering.”

Notes: `koncepcja_projektowa.md` §7: „scena 2D ze sprite'ów, rysowana wyłącznie ze stanu runu. Bez silnika graficznego — pozycje i animacje to CSS, nie pętla renderowania.”; `rozpoznanie_frajda.md` §9: „Kilkanaście obiektów nie uzasadnia pętli, a koncepcja wprost mówi „pozycje i animacje to CSS, nie pętla renderowania””.

What is wrong: the sentence gives no reason beyond the binding sentence, which already says the same; it only adds that an unreachable document said so — a pointer by name to the project concept (handoff, point 4). The reason the concept points to (few objects, frajda §9) is already in the first sentence. Fix: delete the sentence.

## Minor

- **M1 — D-280 *Rejected* lost two details of the named passage** (slice 15, `:6448-6450`). Entry: „the width of the content changing between screens, as in loop — the logo and the menu jump; … the skill trees shown on two screens, as in loop;”. Note (`rozpoznanie_projektant.md`, A.2): „Logo i menu przesuwają się o około 190 px przy przejściu z Siedziby do Programów” and „Drzewa umiejętności są na dwóch ekranach | Te same wiersze na Postaci i w Wiedzy”. Lost: the ~190 px and the reason for the skill trees (the same rows twice). Fix: „— the logo and the menu jump by about 190 px”; „— the same rows on Postać and in Wiedza”.
- **M2 — D-282 lost the qualification of the review it cites** (slice 15, `:6532`). Entry: „In a review of what the game was to grow into, only the scene forced a screen to be rebuilt with no condition”. Note (`rozpoznanie_projektant.md`, D): „Ocena dotyczy ekranów zbudowanych według szkiców z A i B, nie dzisiejszego układu.”; `zakres_mvp2_loop2.md`: „Oceny „przebudowa czy dopisanie” dotyczą szkiców ekranów, nie zbudowanych ekranów.” Fix: „In a review of the sketched screens against what the game was to grow into…”.
- **M3 — D-284 *Rationale* tells how the answer was derived** (slice 15, `:6578-6580`). Entry: „No sentence says directly what a return does; the answer follows from the sentence on leaving, which pauses the map run, and the sentence on one pause, in which the player goes on with „Wznów”.” Note (`ekrany_i_menu_loop2.md`, Q10 Source): „Krok: żadne zdanie nie mówi wprost o powrocie, odpowiedź wynika ze złożenia zdania o wyjściu i zdania o jednej pauzie.” This is the derivation step of the refinement; the template's *Rationale* „does not tell how the decision was reached” (WAY-05, WAY-29). Fix: „A return finds the map run in the pause leaving put it in (D-283), and from that pause the player goes on with „Wznów” (D-122).”
- **M4 — D-288: the executor's reason for not carrying the figures of the smaller scene is false** (slice 15, `:6730-6731`; executor question 1). The note's 510/606 px reproduce exactly: halving the scene frees 336 px of the 706 px world area, and 174 + 336 = 510, 270 + 336 = 606. D-288 points this way to D-349, which is acceptable; the figures belong with the way's reasons, in D-349 (see Out of scope) and in D-311 (I1). D-288's own clause „what was wanted was the width of the program as in loop, not a smaller scene” is faithful to the note.
- **M5 — process words kept or added** (slices 15–17). D-288 `:6702` „what the project is judged by” and `:6728` „keyboard handling of its own in the largest task” (kept); D-299 `:6986` „with the content of a later project” (added; note: „wraca z treścią Projektu 2”); D-309 `:7235` „the approved sentence of D-308 gets an exception” (kept); D-316 `:7563` „a piece of a scene showing the character's tile, left out of the project, would enter it” (kept; note: „kawałek wyłączonej pozycji F7 … wchodzi do projektu”); D-320 `:7698-7699` „an icon that the work on combat may not leave” (kept). Each names a stage or a piece of work of the process; the readable content is „once the game's content outgrows the pick”, „a sketch that shows the character's tile”, „D-308 would need an exception”, „that later work on combat may drop”.
- **M6 — D-310 *Rejected* is a list of process ways** (slice 17, kept, `:7265-7267`). Entry: „the reasons written by the cycle itself and judged by the human at the merge — corrections are a round of remarks before the merge, which the tasks that follow wait for; a table with the rows the human chooses to correct — the human corrected no row.” Faithful to the note (Q4 Not chosen B and C), and WAY-134 has *Rejected* keep the ways the source keeps, but both ways are about who words the reasons and the second „reason” tells how the decision was reached (WAY-05/WAY-29; handoff point 5). Question to the orchestrator: keep (WAY-134) or reword in product terms (e.g. „reasons worded case by case as each action is built — the form and order of the reasons settled only after the tasks that need them”).
- **M7 — D-315: a statement of the build state** (slice 17, `:7520-7521`). Added: „The night is a layer over the picture, and the scene has no night until that layer is built.” Note (`ekran_przejscia_loop2.md`, Q2): „noc to warstwa nad kadrem, którą dokłada zadanie 18; do zadania 18 scena nie ma nocy.” True at `769f5e24` (no night code), but it becomes false the moment the layer is built without anyone touching D-315; the kept sentence before it („the solving of a map gives a full dawn”) already states the design as present. Fix: drop „and the scene has no night until that layer is built”.
- **M8 — D-317 now rests on a public source its *Based on* does not name** (slice 17, `:7586-7588`, *Based on* `none` at `:7573`). Added: „the criterion 2.3.1 of WCAG 2.2 forbids more than three flashes a second unless less than 87,296 pixels flash, and the scene at twice its picture, 672 × 304 px, has 204,288”. Figures match the note (`rozpoznanie_frajda.md` §5) and 672 × 304 = 204,288. The template has *Based on* name every outside source a decision rests on (WAY-90), with the address, the passage and the date read; the slice could not change *Based on*. Question to the orchestrator: add the W3C page to *Based on* (or an environment fact) through `the-way-record-decision`, or leave.
- **M9 — small losses in carried ways and measurements** (slice 17). D-311 `:7381-7382` „a third tab „Koniec” in the area under the world — the chronicle hides behind the tab…” — note C also gives „w niskim oknie poniżej dolnej krawędzi”; D-311 `:7373-7377` way A — note gives the width of one column, „okno węższe niż 1074 px”; D-317 `:7591-7593` trial — note: „Program „sensowny” jest mój, nie gracza, i wygrał Las tylko w 10 z 20 prób, więc to przykład rzędu wielkości”, entry drops that it is an order-of-magnitude example; D-320 `:7694` „Waiting lasts a fraction of a second at the fastest pace” — note: „przy 16× czekanie trwa 0,06 s”.

## Out of scope

- **D-349 (slice 19)**: its *Rejected* „the scene at 336 × 152 px with the split of widths unchanged — it does not solve what the change is for, a program too narrow to write in” contradicts the note's figures (510/606 px against 526/622 px) and names „the change”; D-311's copy of it is I1. Recommend that slice 19 carry the figures and the note's reason (the scene kept at its size) there.

## The executors' questions, judged

- Slice 15, Q1 (D-288 figures): the executor's premise is wrong — the figures reproduce (M4). Carry them where the way is rejected with its reasons, D-349; D-288 may keep pointing to D-349. D-349's „a program too narrow” is wrong (Out of scope).
- Slice 15, Q2 (ways describing a superseded interim state or the working process; the icon cost about two ways of drawing): leaving them out is right. Edytor Q3 is about where the panel stood until a later layout, the „bez decyzji” ways are process, and the two ways of drawing icons are gone at `main` (every icon is a mask since the merge of `spokojniejszy-wyglad`).
- Slice 16, Q1 (the copy header „według szkicu — zmiana dwóch decyzji poza tym zadaniem”): leaving it unplaced is right. Its only reason is process scope, and the decisions that hold the copy header (D-171, D-172) have *Origin* `none` already, outside this task.
- Slice 16, Q2 (D-299 *Verification* in the present tense): no change needed. The past-tense premise is right; the *Verification* is a complying example, not a claim of fact, and a binding sentence or field was out of the slice's reach.
- Slice 16, Q3/concern 1 (clauses the entries already had and no note repeats, D-293, D-294, D-296, D-297): keep; none looks wrong.
- Slice 16 onward passages read from the main checkout's `.runs/project-refinement`: acceptable, since nothing was taken from them; they are no source an entry may rest on.
- Slice 17, Q1 (the table of 18 refusal wordings of D-310): right not to put binding content in prose. The table is needed by `tests/sim/rule-signs.test.mjs`, whose comments point to „the table of question 4” (`:3`, `:88`, `:90`); slice 23's goal and *Change* already cover writing the needed decision and renaming that test, so the gap is planned, not lost.
- Slice 17, Q2 (two rejected ways in D-312 not in the note): keep; they are an earlier writer's, product-relevant and not wrong.
- Slice 17, Q3 (the end lines in the right area; every attack in the chronicle): right to leave out — the first is a scheduling reason for an area that no longer exists, the second belongs to D-147.

## Comparison, decision by decision (43 of 43 compared against their note passages)

Each line: old *Origin* passages read → result.

- D-280 — ekrany Q2, Q7, Q9, Q11 + rows; karty To do 1, Q7; projektant A.3, A.4; zakres; definition entry → carried; M1.
- D-281 — ekrany Q8; karty To do 2, Q9, Q10; projektant A.4; zakres; definition entry → carried (Q9 held by D-332).
- D-282 — zakres „Decyzje o układzie”; projektant D, D.1; proporcje To do 2–3, Decisions in play → carried; M2.
- D-283 — projektant A.4 rule 2 → carried.
- D-284 — ekrany Q10, row 14 → carried; M3.
- D-285 — ekrany Q11 points 2–3, rows 7–8 → carried (cost and both ways already present).
- D-286 — ekrany Q12, row 10 → carried.
- D-287 — ekrany To do 8, Q3, row 1; karty To do 5, Q3 → carried; code facts checked at `769f5e24` (`game.ts:447`, `skills.ts:151`, `loop.ts:100`).
- D-288 — zakres P2; projektant B.3; research „Pisanie”; definition entry; edytor To do 1–8; proporcje To do 1, 3, Q1, Q3, row 1 → carried, nothing invented found; 526/622 px agree with `src/browser/styles.css:242-250` at `769f5e24`; M4, M5.
- D-289 — edytor To do 5, Q1, Q16, row 1, Revision → carried.
- D-290 — edytor To do 4, Q2, row 2 → carried.
- D-291 — edytor To do 15, Q5, row 3; teraz rows 1–2 → carried; leaving out the stale two-ways cost is right.
- D-292 — edytor Q6, row 4 → carried.
- D-293 — edytor Q6, Q17a, row 5 → carried.
- D-294 — edytor To do 6, Q6, Q17b, row 6, Context → carried.
- D-295 — edytor Q6, row 7 → carried.
- D-296 — edytor Q6, row 8 → carried.
- D-297 — edytor Q6, Q17d, row 9 → carried.
- D-298 — edytor Q6, Q17c, row 10 → carried.
- D-299 — edytor Q6, row 11 → carried; M5.
- D-300 — edytor Q6, row 12 → carried.
- D-301 — edytor Q6, row 13 → carried.
- D-302 — edytor Q6, row 14 → carried.
- D-303 — edytor Q6, row 15 → carried.
- D-304 — edytor Q6, Revision, row 16 → carried.
- D-305 — edytor Q6, row 17 → carried; D-308 reference correct.
- D-306 — edytor To do 4, Acceptance criteria, Q7, Q17e, row 18 → carried.
- D-307 — edytor Q11, row 19 → carried.
- D-308 — stan Need, To do 1–6, 8, 10, Q A, C, D, E, F, 5, 7, 8; definition entry; research „Rozumienie” → carried; code fact „an attack ends the action under way” checked (`run.ts:765`).
- D-309 — stan To do 6, Q3, row 3, Context → carried; M5.
- D-310 — stan To do 4–5, Q4, row 4 → carried; M6; table: see questions.
- D-311 — zakres P1, P6, Kierunek; projektant A.2, B.1, B.2; definition entry; ekran_przejscia To do 1–5, Q3, Q4, row 1; teraz To do 1–4, 6, Q10, Q11, Q13; kronika To do 6, 8, Q5, Q6, Q11; proporcje To do 1–2, Q1, Q2, Q6, row 2; koniec To do 1–3, 8, Q1, Q2, Q9, Q10, rows 1, 2, 4 → I1, I2, I3, I4, M9; the rest carried.
- D-312 — ekran_przejscia To do 7, Q6, row 5 → I5.
- D-313 — ekran_przejscia To do 7, Q5, Q10, row 4; koniec To do 1, 9, Q1f, Q5, Q12, row 6 → carried; I5.
- D-314 — ekran_przejscia To do 6, Q2, row 2 → carried.
- D-315 — ekran_przejscia To do 6, Q2, row 3 → M7.
- D-316 — scena To do 4, 5, 7, Q3, row 3, Context; zakres F1, F3, F4, F6, F9; frajda proposals 1, 7 and §9; koncepcja §7 → I6, M5; D-03's risk quoted correctly (D-03 read).
- D-317 — scena To do 10; zakres F2, F5; frajda §4, §5 → M8, M9; WCAG figures match the note.
- D-318 — scena To do 3, Q2, row 2 → carried.
- D-319 — scena To do 5, 10, Q4, row 4, Context → carried.
- D-320 — scena To do 6, 10, Q4, 5, 6, 12, 13, rows 5, 6, 9 → carried; M5, M9.
- D-321 — scena To do 11, Q8, row 7 → carried.
- D-322 — scena To do 8, 9, Q1, Q7, rows 1, 8 → carried.

Shape: every *Origin* of D-280 to D-322 reads `none`; no *Origin* names a note; no host, account, e-mail, secret or disk path entered the range.

## Declined to judge

- `a732d90d` (D-243 and D-247): accepted by another review, outside the decisions listed for this one.
- D-349 beyond the one observation under Out of scope: slice 19's decision.
- Whether slice 23 writes the decision that the rule-signs test needs: that is slice 23's review; checked only that its plan covers it.

## Checks run

- `git rev-parse HEAD` in the reviewed worktree — `769f5e24` at the start (exit 0); later `a16b3443` (the other agent's commit), so everything was read from `769f5e24`.
- `git log --oneline f3194047..769f5e24` and `git diff --stat f3194047..769f5e24` — exit 0; one file changed, `foundations/decisions.md`; `git diff --stat f3194047..769f5e24 -- . ':!foundations/decisions.md'` prints nothing.
- Per-slice diffs `git diff f3194047..cdf5ee15`, `a732d90d..3ba0db45`, `3ba0db45..769f5e24 -- foundations/decisions.md` — exit 0, read whole.
- A script over `git show` of both commits comparing, for D-280 to D-322, everything before *Rationale* with the *Origin* line left out (`python -I split.py old.md new.md`, in my scratch directory) — exit 0, 43 of 43 the same.
- `python -B .the-way/elements/common/foundation_check.py <worktree>` on a detached scratch worktree of `769f5e24` (`git worktree add --detach`, removed afterwards) — exit 0, „0 errors”.
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|research_|Notes/Projects|_zadania' 769f5e24 -- foundations/decisions.md` filtered to lines 6403–7755 — no line.
- `git grep -n -i "night|dawn|noc\b|świt" 769f5e24 -- src/browser` — exit 1, no line (for I2, M7).
- D-132, D-03, D-42, D-39, D-349 read at `769f5e24` (for I1, I2, I6, M8).
- `git grep` of `state.run` in `src/browser/sim/game.ts`, `skills.ts`, `loop.ts` and of `current: null` in `run.ts` at `769f5e24` — the code facts of D-287 and D-308 hold.
- `git grep` at `769f5e24` of the refusal wordings in `src/browser/sim/program.ts` and `tests/sim/rule-signs.test.mjs` — the test points to „the table of question 4” (for slice 17's question 1).
- Arithmetic: 174 + 336 = 510, 270 + 336 = 606 (M4); 672 × 304 = 204,288 (M8).
- `npm test` not run: the change touches only `foundations/decisions.md`; the cycle runs the full suite before the request.

## Reaches beyond the dispatch

- D-132, D-03, D-42, D-39 and D-349 in `foundations/decisions.md` at `769f5e24` — to check entries the added sentences cite.
- `src/browser/styles.css` comment at `:242-250`, `src/browser/sim/game.ts`, `skills.ts`, `loop.ts`, `run.ts`, and the source tree for night/dawn, at `769f5e24` — to check present-tense facts the added text states.
- `tests/sim/rule-signs.test.mjs` and `plan.md` slice 23 — to judge slice 17's question about the table of D-310.
- `definicja_mvp2_loop2.md` lines 160–290 (the projected entries named by D-280, D-281, D-282, D-288, D-308, D-311) and `koncepcja_projektowa.md` §7.

## Unread material

- `rozpoznanie_projektant.md`: read lines 15–217 and 283–496; part C (219–282) unread — named by none of the range.
- `research_edytor_programu_wow.md`: read lines 1–150 („Pisanie” whole, „Rozumienie” whole); the rest unread — named by none of the range.
- `rozpoznanie_frajda.md`: read lines 131–430 (§4–§11); §1–§3 (15–130) unread — the *Origin* fields named parts 5, 8 and 9, and §4 only through §5.
- `definicja_mvp2_loop2.md`: read lines 160–290 only.
- `koncepcja_projektowa.md`: read §7 (1151–1175) only.
- `karty_i_katalog_map_loop2.md`: read lines 1–170 (Need, To do, Acceptance criteria, Questions to settle, part of Context); the rest of Context, *Decisions in play* and *Settlements to record* unread — the *Origin* fields named only To do and questions.
- `teraz_i_potem_loop2.md`: read lines 17–133 and 216–237; *Context* and *Decisions in play* (134–215) unread.
- `kronika_z_filtrami_loop2.md`: read To do 6 and 8 and questions 5, 6, 11 and 12; Need, Context, *Decisions in play* and *Settlements to record* unread — *Decisions in play* was named by D-311's *Origin*.
- `koniec_przejscia_loop2.md`: read lines 15–124 and *Settlements to record* to the end; *Context* and *Decisions in play* unread.
- `ekran_przejscia_loop2.md`: read lines 14–253 (all but the front matter).
- Whole: `ekrany_i_menu_loop2.md`, `edytor_programu_loop2.md`, `stan_i_powod_przy_regule_loop2.md`, `scena_z_ludzikiem_loop2.md` (from line 15), `zadanie_proporcje_sceny_i_programu_loop2.md`, `zakres_mvp2_loop2.md`.
- `.the-way/elements/common/rules.md`, `.the-way/elements/decisions/template.md`, WAY-27 and `task-cycle/review/SKILL.md`: read whole.

## Searches not found or unclear

- `rozpoznanie_nowy_gracz.md` (NG4, behind D-308's projected entry): not in the snapshot; not needed for the comparison.
- The round packages and refinement conversations the notes quote (`round-4-7-package*.md`, `.runs/project-refinement/*.md`): not in the snapshot, not read.
- The W3C page behind D-317's figures: not opened; the figures were checked against the note only.
