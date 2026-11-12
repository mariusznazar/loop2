# Findings of the review of slices 12–14 (blocking, in the reviewer's words)

Source: `reports/review-12-14-report.md`, first line `FAIL f3194047`. Reviewed range `7fcf907e..f3194047`.

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

