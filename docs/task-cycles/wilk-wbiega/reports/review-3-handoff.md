# Handoff — review of the return step's commits, task wilk-wbiega

## Where and what

- Worktree (read-only for you; work from its root, change nothing in it):
  `the task's worktree`, branch `task/wilk-wbiega`. Run any check in a separate checkout
  of the head under `.runs/` (deleted when you finish; dependencies as the README gives, `.the-way` populated).
- Method: `.the-way/task-cycle/review/SKILL.md`, read whole; the review is "the return step's commits"
  (its section 2 gives how the return step's commits are judged: against the task and the foundation
  entries the return step writes or corrects).
- Range: `66b814d1469632c429cd2d3f23864780053304ae` (the head the fix passed its review at) to
  `f20b21b76162f30209b38fdfde81ead25a1dec6d`, one commit, `foundations/decisions.md` only, +15 −7. The code
  did not change in this range; judge the entries against the code at `f20b21b7`.
- The return step's report: `docs/task-cycles/wilk-wbiega/reports/return-report.md` (a claim, not evidence).
- Report: `docs/task-cycles/wilk-wbiega/reports/review-3-report.md`; first line `PASS <sha>` or `FAIL <sha>`
  (or `questions`).
- Trust boundary: the cycle's change touches `assets/sprites/**`, but no file of it is in this range; say if
  that stays true. No operation that cannot be undone.

## What the return step did, and what you judge

It compared the entries the change wrote or changed with the code after the fix of round 1 (the scene now keeps
the wolf's effects in a slot of its own, so a reading carrying the end of a gathering and an attack shows both
effects; the run in counts only while the scene is going or paused by the player, so a death or a completion
within the 300 ms of the run in leaves the wolf standing beside the mage) and corrected three entries:
**D-316**, **D-317** and **D-367**. Judge:
1. Each corrected sentence is **true of the code at `f20b21b7`** (verify in `src/browser/view/scene.tsx`,
   `scene-picture.ts`, `src/browser/sim/data/scene.ts` and the tests; do not take the report's word).
2. The three entries do not contradict each other or D-322, D-311, D-319, D-366 and the other entries of the
   scene's effects; no sentence an entry had before the range was lost beyond what the correction replaces.
3. The entries state the present and their reasoning: no origin, no pointer to a note, to the predecessor's
   private repository, no task name or question number; the form of an entry as
   `.the-way/elements/decisions/template.md` and `.the-way/elements/common/rules.md` give it (read them).
4. The report's claim that no other entry, invariant, fact, glossary term or part-map row needs a change, and
   that rows 1–9 of the task's *Settlements to record* are carried (1 → D-271; 2, 5, 6 → D-316; 3, 4 → D-317;
   7 → D-322; 8 → `lpc-wolf-licence`; 9 → `sprite-credits`). Check that each row's content is in the entry named.
5. `python -B .the-way/elements/common/foundation_check.py` in the checkout of the head.

## The entries you read whole (selected by the orchestrator)

D-316, D-317, D-322, D-367, D-311, D-366, D-271, D-148 and D-319 as they stand at `f20b21b7`, and the invariant
`sprite-credits` and the fact `lpc-wolf-licence`. No guideline file of the product bears on a range of
`foundations/decisions.md` alone beyond what `.the-way/elements/common/rules.md` and the decision template give.

## Passages of the frozen task (`docs/task-cycles/wilk-wbiega/task.md`, word for word)

*To do* 1–4:

1. Przy napaści wilk wbiega z prawego brzegu kadru i staje tuż obok maga, twarzą do niego — po prawej, a gdy mag stoi przy prawym brzegu, po lewej; mag obraca się ku wilkowi. Bieg jest efektem zwykłego zdarzenia: trwa najwyżej 300 ms przy każdym tempie, a zaległy przepada i wilk stoi od razu na swoim miejscu — tak samo po wczytaniu stanu w minutach starcia i pod systemowym ustawieniem ograniczenia ruchu (pytania Q2, „Co w scenie jest efektem zwykłego zdarzenia” i „Co pokazuje scena przy ograniczeniu ruchu”).
2. Przez wszystkie minuty starcia scena pokazuje szamotaninę: wilk obok maga w pętli klatek gryzienia, mag w klatkach bezczynności, a między nimi mały kłąb kurzu z paczki Smoke & Fire Animated Particle [16x16] przekolorowanej na kolory sceny, w takcie sceny, bez błysków; pod ograniczeniem ruchu klatki stoją (pytania Q3 i „Co pokazuje scena przy ograniczeniu ruchu”).
3. Na końcu starcia scena pokazuje jego wynik efektem zwykłego zdarzenia: pokonany wilk pada w klatkach śmierci i znika, gdy efekt się kończy; wilk, który odchodzi, odbiega biegiem za brzeg kadru, z którego przyszedł; po śmierci maga w walce wilk zostaje nieruchomo obok niego w klatce bezczynności; przy rozwiązaniu mapy w trakcie starcia, które zostawia starcie bez wyniku, wilk zostaje nieruchomo tam, gdzie stoi. Zaległy efekt wyniku przepada i wilka po prostu nie ma, a pod ograniczeniem ruchu wynik to nieruchomy obraz najwyżej na 300 ms (pytania Q4 i „Co pokazuje scena przy ograniczeniu ruchu”).
4. Przy pierwszej napaści w grze, gdy ręczne przejście staje na odkryciu wilka, wilk stoi już obok maga — bieg jest pominięty jak po wczytaniu stanu — a szamotanina rusza po „Wznów” (pytanie Q5).

*Settlements to record*, rows 1–9 header and rows 2–7 (rows 1, 8 and 9 stand in the file):

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Gra bierze wilka z paczki LPC Wolf na licencji CC BY 3.0. | decision | *Questions to settle*, Q1 (drogi nie wybrane pod nim) — wybór człowieka między pokazanymi drogami; części wiersza wzmianki niesie wiersz 9 | którą z pięciu licencji strony przyjąć |
| 2 | Wilk wbiega z prawego brzegu kadru i staje obok maga, twarzą do niego — po prawej, a gdy mag stoi przy prawym brzegu, po lewej — a mag obraca się ku niemu. | decision | *Questions to settle*, Q2 — wybór człowieka | skąd wilk wbiega, po której stronie maga staje i czy mag się obraca |
| 3 | Efektem zwykłego zdarzenia jest krótki znak jednego zdarzenia przy postaci albo w części sceny — lot ikony, kurz, wbiegnięcie wilka, wynik walki — do 300 ms; efektem nie jest trwające zajęcie postaci, takie jak schylanie przez całe zbieranie i szamotanina przez całe starcie, ani stan całej sceny, bo zajęcie trwa tyle co czynność, a stan zmienia się w tempie ustalonym dla niego. | decision | *Questions to settle*, „Co w scenie jest efektem zwykłego zdarzenia” — wybór człowieka; poszerza wpis „(new) — How long do the scene's effects last?”, który zapisuje to zadanie (plan, *Change log*, 2026-11-11) | czy szamotanina, bieg wilka i jego wynik podlegają limitowi 300 ms i przepadaniu zaległych, i co wpisać do wpisu o efektach poza jego projektowanym brzmieniem |
| 4 | Pod systemowym ustawieniem ograniczenia ruchu klatki stoją, ruch z miejsca na miejsce i zmiana stanu sceny pokazują od razu swój koniec, krótki efekt zwykłego zdarzenia pojawia się nieruchomo na swoim miejscu najwyżej na 300 ms i znika, a efekt chwili, gdy czas stoi, pokazuje od razu swój ostatni obraz. | decision | *Questions to settle*, „Co pokazuje scena przy systemowym ustawieniu ograniczenia ruchu?” i „Kto zapisuje w fundamencie całą zasadę ograniczenia ruchu” — wybory człowieka; poszerza wpis „(new) — How long do the scene's effects last?” (plan, *Change log*, 2026-11-11) | czy pod tym ustawieniem pokazać wynik walki, a wilka postawić od razu czy dać mu wbiec, i co zapisać o zasadzie poza częścią wilka |
| 5 | W minutach starcia wilk gryzie w pętli obok maga, mag stoi w klatkach bezczynności, a między nimi kłębi się mały obłok kurzu z paczki Smoke & Fire Animated Particle [16x16], bez błysków. | decision | *Questions to settle*, Q3 — wybór człowieka | z jakich klatek i obrazków złożyć szamotaninę i czy wolno w niej błyskać |
| 6 | Pokonany wilk pada w klatkach śmierci i znika, wilk, który odchodzi, odbiega za brzeg kadru, z którego przyszedł, po śmierci maga wilk stoi nieruchomo obok niego w klatce bezczynności, a przy rozwiązaniu mapy w trakcie starcia stoi nieruchomo tam, gdzie był; pokonany albo odchodzący wilk znika ze sceny. | decision | *Questions to settle*, Q4 — wybór człowieka | co scena pokazuje przy każdym z czterech końców starcia i czy martwy wilk zostaje w scenie |
| 7 | Przy zatrzymaniu na odkryciu przy pierwszej napaści wilk stoi już obok maga, bez biegu, a szamotanina rusza po „Wznów”. | decision | *Questions to settle*, Q5 — wybór człowieka | czy bieg wilka grać przy zatrzymanym czasie, odłożyć do wznowienia, czy pominąć |

Return: the report's first line, its path, changed files with line counts, and a one-line check result. No
secrets, no personal data, no screenshots or diffs copied into the report; name commits and `file:line`.
