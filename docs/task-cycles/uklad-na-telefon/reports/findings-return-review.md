# Findings of the review of the return step (for the fix)

Source: `reports/review-return-report.md`, review of the range `83acc083..c254ba21`, `FAIL c254ba21a6c126e849d998d7e3e20a966b3cfeeb`. The blocking finding is copied from the reviewer's report word for word, with the reviewer's mark of a contradiction with the settlements. The Minor findings of a review of the return step are not fixed (they go to the request's list); they are not in this file.

## Blocking finding

### Important

**1. D-325 (and D-331) left saying "on the left / on the right" for Mapy, the very contradiction the step corrected in D-166** - `foundations/decisions.md:10130` (D-325), `foundations/decisions.md:10141-10142` (its pair), `foundations/decisions.md:10264` (D-331).

What is wrong: D-325's binding sentence reads "The screen Mapy holds on the left the list of the maps open to the player, and on the right a card of the picked map ..."; its pair's complies example is "the screen Mapy at `#/mapy/forest` with the list of the open maps on the left, and on the right the card of Las". D-331 reads "Under `#/mapy`, before the player picks a map, „Wybierz mapę z listy.” stands on the right in `text-secondary`." In the phone layout the code stacks Mapy into one column: `src/browser/styles.css:258-264` gives `.screen.maps-screen` `grid-template-columns: 1fr` under `@media (width < 1280px)`, and `src/browser/view/maps-screen.tsx:691-695` puts `maps-list-area` before `maps-card-area`, so at 360 px the card and the sentence stand under the list, not on its right. D-325's sentence is false in the phone layout exactly as D-166's was.

Why it matters: the return step "compares with the code ... those its own search finds ... and corrects in the same change whatever no longer matches (WAY-11)" (`.the-way/task-cycle/skill/return_step.md`). The step itself judged that this kind of sentence must be corrected: its report says of D-166 "its binding sentence contradicted the code" and "the cost of leaving it is a decision that reads false at 360 px". The same holds for D-325, a screen the task names in item 2 ("Mapy z listą map i kartą mapy"). The step's search used words such as "narrow", "720", "1074", "hover" and did not reach "on the left"; D-325 and D-331 are not in its list of entries read. A later task that designs Mapy in both layouts (task items 12 and 17-21 of the plan wait on this one) reads D-325 as binding a two-column Mapy at every width.

Evidence: `grep -n -i "holds on the left\|on the left the\|stands on the right" foundations/decisions.md` finds 8317 (D-166, corrected) and 10130 (D-325) and 10264 (D-331), not corrected; the CSS and markup lines above. D-416 (Wiedza, "left area"/"right area") already has its phone-layout complies example ("in the phone layout the two areas of the screen standing one under the other") and needs nothing. D-311 (line 10548) already says "in the computer layout".

Fix: give D-325 the clause D-166 got (the card standing under the list in the phone layout, D-282, D-396) and its pair the computer-layout / phone-layout split; give D-331's "on the right" the same qualification (or "in the card's area"). Check that the lines `decision:` quoting D-325 and D-331 still quote a prefix.

Contradiction: yes - D-325 (and D-331): the code of the change at a page area under 1280 px stands the list and the card one under the other, against D-325's "on the left ... on the right" and D-331's "stands on the right".
