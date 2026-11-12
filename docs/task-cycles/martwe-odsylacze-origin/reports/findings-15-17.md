# Findings of the review of slices 15–17 (blocking, in the reviewer's words)

Source: `reports/review-15-17-report.md`, first line `FAIL 769f5e24`. Reviewed range `f3194047..769f5e24`.

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

