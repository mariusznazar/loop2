# Report — plan's *Foundation entries*, task `petla-zarobkowa`

**Status:** `done with concerns`

No code was written. No question goes to the human: no row's meaning failed to hold, no value was
missing, and no two decisions collided with no precedence recorded. The concerns are at the end.

## Files and commits

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 529 | 87 |
| `foundations/invariants.md` | 42 | 2 |
| `foundations/glossary.md` | 18 | 0 |

- Commit `96d7b45` on `task/petla-zarobkowa`, address `the owner's address`, base `4ed8fcd`. Not pushed.
- The pin `.the-way` stays at `a8dfe8a`. The part map and the environment facts did not change.

## Checks

| Command | Exit code | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py`, after the commit | 0 | `0 errors` |

Not run: `npm test`, as the handoff gives; the gate is the orchestrator's. No test was written, so no
invariant's test has been seen failing: the four new invariants read *Method* `review` until Slices 2
and 3 set `test` (WAY-61).

## Own-work check

The requirement this work most likely missed: projected wording kept in full, since the entries were
retyped and D-189 had to be cut to the template's sentences. The check was a one-off script outside
the worktree that compared each projected entry of `definicja_mvp_loop2.md`, sha256
`fda97782458df932…`, with the log word by word, ignoring punctuation and case.

| Entry | Binding | *Rationale* | *Rejected* |
|---|---|---|---|
| D-222, D-223, D-164, D-189 | identical | identical | identical |
| D-22 | identical; the sentence of row 9 added after it | identical; one sentence on row 9 added | identical; the two ways of spec section 5 added |
| D-190 | row 8's words and task 14's sentences added | task 14's first sentence stands | identical |
| `catch-up-state`, `earning loop`, `catch-up` | identical | | |

The run first showed that D-190's *Rationale* lacked the projected sentence "Rebuilding goes through
work: …", which task 14 had left out. An earning loop makes it true, so I restored it.

The same script checked:

- Links both ways for the five invariants and their decisions: nothing missing. A hit for D-179 not
  listing `trip-run-end` stood before this change, and I left it.
- The words `only`, `never`, `always` and `without` in D-226 to D-234 and in the three row invariants,
  outside Polish quotes: none. `alone` was removed from two places.
- The sentence count: D-208 had reached four, and is three after a semicolon.

Checks of the handoff's instructions, made by reading the entries:

- The D-207 clause narrowed to "with its map run paused and no earning loop passing".
- D-194 no longer holds the accepted cost.
- D-229 says a stopped line names no practice, in keeping with `practice` `{}` (Q13, plan *Choices*).
- `trip-run-end` keeps `test`.

A second search of the added lines found the bare words `step` and `check`, which keep the-way's
meaning in a product (WAY-104). I rewrote them.

## Rows and entries

Every row of 1 to 26 stands in an entry; none was found already stated, so none is tied to an older
entry.

| Rows | Entry |
|---|---|
| 1, 2, 5 | D-226 |
| 3, 4 | D-227, D-93 |
| 6 | D-200 |
| 7 | D-228, D-183 |
| 8 | D-190 |
| 9 | D-22 |
| 10, 11, 22, 23, 24, 26 | D-229 |
| 12, 25 | D-230 |
| 13 | D-231, `save time` |
| 14 | `catch-up-minutes` |
| 15 | `catch-up-death-moment` |
| 16 | D-232, D-71 |
| 17 | `loop-run-knowledge` |
| 18 | D-207 |
| 19 | D-208 |
| 20 | D-233, D-62, D-132 |
| 21 | D-234 |

## One sentence of each entry's meaning, for the request (WAY-114)

New decisions:

- D-222: Pętla idzie tylko na mapie rozwiązanej, minuta gry na minutę realną, poza regulatorem prędkości, a każde jej przejście jest osobnym przejściem, po którym od razu startuje następne.
- D-223: Doliczanie rusza po powrocie gracza i bierze postacie po kolei, każdą do końca, a postacie stykają się tylko na granicach przejść.
- D-224: Stan gry trzyma pętle obok jednego ręcznego przejścia, po numerze postaci, każdą z treścią programu z jej startu, a przejście pętli w każdym stanie gry trwa.
- D-225: Pętle idą datą przeglądarki na jednym zegarze pętli poza stanem gry, każda minuta ma własną chwilę realną, a przy otwartej grze postacie idą minuta po minucie w kolejności listy.
- D-226: Gracz puszcza pętlę przyciskiem „Puść w pętlę” przy mapie rozwiązanej, start liczy się dla listy „Program:” jak wysłanie, a przy postaci w pętli „Wyślij” i „Puść w pętlę” są dziś nieczynne.
- D-227: Trwającą pętlę widać jako jedną linię w wierszu postaci z przyciskiem „Zatrzymaj”, jej mapy gra dziś nie otwiera, a jej start nie rusza liczników po ręcznym przejściu.
- D-228: „Zatrzymaj” działa od razu: plecak przerwanego przejścia przepada, wprawa wchodzi do umiejętności, a w wierszu do następnego wysłania lub puszczenia stoi linia „Pętla zatrzymana”.
- D-229: Po powrocie gracz czyta w siedzibie sekcję „Gdy cię nie było”, która leży w stanie gry, sumuje kolejne powroty, zamyka się jednym „Zamknij” i przyjmuje też pętle stojące przy otwartej grze.
- D-230: Doliczanie liczy dziś wszystkie opuszczone minuty, bez górnej granicy, i rusza po każdym z czterech wczytań, jako osobny krok po wczytaniu.
- D-231: Chwila zapisu pochodzi z zegara przeglądarki, leży w stanie gry i jest wpisywana w drodze do dokumentu, więc nie zmienia stanu gry trzymanego przez widok.
- D-232: Przejście pętli dziś niczego nie odkrywa, czas nie staje, gra nie dopisuje reguły, a gracz odkrywa to w ręcznym przejściu.
- D-233: Pauza ręcznego przejścia, zatrzymanie przy odkryciu i ekran po końcu trzymają tylko to przejście, a pętle innych postaci idą dalej.
- D-234: Przy mapie rozwiązanej, gdy pozycja listy „Zabierz” po przycięciu przekracza zapas w skrzynce, pod „Wyślij” stoi w `warning` oznaczenie, że pętla tego zapasu nie dostanie.

Changed decisions:

- D-22: Doprowadzony do wpisu projektowanego: generator na każdy rodzaj losowania, ziarno kolejnego przejścia pętli z losowania poprzedniego, a pierwsze przejście pętli bierze nowe ziarno.
- D-44: „Zatrzymaj” dołącza do przycisków niszczących.
- D-62: „Czas stoi” po śmierci dotyczy tego przejścia.
- D-71: Zdanie o odkryciach dotyczy ręcznego przejścia; kolejność minuty obowiązuje też przejście pętli.
- D-93: Licznik zadziałań reguł obejmuje ręczne przejście.
- D-132: „Czas stoi” po domknięciu dotyczy tego przejścia.
- D-164: Kopię wykonuje też pętla, a zapisana zmiana programu działa od następnego startu pętli, nigdy w pętli już idącej.
- D-183: Zatrzymanie pętli kończy przejście tak samo: jego niesione przedmioty przepadają.
- D-189: Doprowadzony do wpisu projektowanego: co płaci przejście pętli, wprawa zbierana przy pętli i wchodząca przy zatrzymaniu oraz oznaczenie na liście map.
- D-190: Śmierć bez gotowego wskrzeszenia zabiera też wprawę zebraną przy pętli i zatrzymuje pętlę.
- D-194: Z uzasadnienia znika przyjęty koszt stanu sprzed pętli.
- D-200: „Kup” działa przy postaci w pętli, a stopień działa od następnego przejścia tej pętli.
- D-207: Rytm 30 sekund dotyczy ręcznego przejścia, „Puść w pętlę”, „Zatrzymaj” i „Zamknij” zapisują, wynik, który zakończył przejścia pętli, daje jeden zapis, a chwila zapisu nie jest zmianą stanu gry.
- D-208: Nowe brzmienie linii o za dużym stanie gry, a gra dziś nie ogranicza liczby pętli.
- D-209 (poza planem, tylko uzasadnienie): Karta, która przegrała, milczy do czynności gracza tylko wtedy, gdy nie idzie żadna pętla.

Invariants:

- `catch-up-state`: Postać, do której skrzynki nie sięga inne przejście, ma po doliczaniu ten sam stan co po grze bez przerwy.
- `catch-up-minutes`: Doliczanie przerabia pełne minuty od chwili zapisu, reszta czeka, a zegar cofnięty daje zero minut, niczego nie zabiera i zegar pętli rusza od teraz.
- `catch-up-death-moment`: Śmierć w k-tej doliczanej minucie rozlicza się k minut realnych po chwili zapisu.
- `loop-run-knowledge`: Przejście pętli zostawia dziś Zrozumienie i programy gracza takie, jakie zastało.
- `trip-run-end`: Zatrzymanie pętli zwraca do skrzynki tyle samo co śmierć, „Zakończ” i „Restart”: nic.

Glossary:

- `earning loop`: Ciąg przejść jednej postaci na jednej mapie, z których gracz nie uruchamia każdego z osobna.
- `catch-up`: Przeliczenie minut gry, które minęły, gdy gra była zamknięta.
- `save time`: Chwila zegara przeglądarki, w której zapisano stan gry, trzymana w stanie gry; nie to samo co „moment of saving” z D-207, czyli okazja do wysłania zapisu.

## `trip-run-end`: the wording before and after

- At `4ed8fcd`: "Death, ending or restarting an unfinished map run returns none of its carried items to the chest, while completion deposits …".
- Now: "Death, ending or restarting an unfinished map run, or stopping the earning loop it belongs to, returns none of its carried items to the chest, while completion deposits …".
- *Derives from* gains D-228. Tests citing it: `tests/sim/trip.test.mjs:275`, `:366`, `:685`. Each stays true of the new wording; none exercises a stop, which Slice 2 adds.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| D-133, D-171, D-186, D-196, D-201 | `foundations/decisions.md` | The search of the whole foundation for sentences on "during a map run", which an earning loop's map run could make false |
| D-04, D-07, D-18, D-21, D-39, D-42, D-53, D-55, D-56, D-96, D-118, D-119, D-122, D-123, D-168, D-170, D-179, D-188, D-206, D-209, D-211, D-212, D-214, D-219, D-221 | same | Links, and the task's *Decisions in play* |
| `.runs/…/plan.md:516-577`, `reports/02-spec-review-report.md`, `cycle.md` | run files | The plan's *Choices*, the review's notes, and how the cycle reads the task |
| `src/browser/sim/random.ts:1-16`, `src/browser/sim/data/balance.ts`, by grep | product code | Whether D-22's "attacks, gathering" hold today, and the four generators |
| `definicja_mvp_loop2.md:1039-1046` | vault | The end of the *Rejected* of "Who owns a program?", which the handoff's range stops short of |
| `.the-way/foundations/glossary.md`, headings | pin | The words of the process (WAY-104) |

## Searches not found or unclear

- The handoff says "13 changed decisions" and lists 14 numbers; the plan's rows hold the same 14. I wrote all 14.
- The decision log has no list of withdrawn numbers, and D-222 was free.
- The word "save time" had no use in tracked files before this change.
- `moment of saving` stands in D-207 and D-208 only in the meaning the glossary's *Not* gives.

## Choices, each with the way rejected and its cost if wrong

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| D-189's six projected sentences joined by semicolons into three, every word kept | Six sentences, against the template's one to three | None to the meaning; a reader sees semicolons the definition lacks |
| D-189's heading becomes the projected question | Keeping "Which current runs take equipment and pay loot?", which no longer covers practice | One heading changed; nothing refers to the old one |
| D-22's *Rationale* and *Rejected* taken whole from the definition, replacing the shorter wording | The shorter wording kept with additions | "Draws in combat, when they come" returns, a sentence of the approved entry |
| D-229 holds spec section 11's reading of two lines for one character, next to the row's "one line for each character" | The row's words alone | A later reader takes a second line of a character for a fault; the review accepted this reading |
| *Rejected* of D-207, D-231, D-224, D-225 and D-22 holds the ways the reviewed spec rejected, beside the rows' *Not chosen* | The rows' *Not chosen* alone. The template's rule for rows bars ways the writer derives, and these are the spec's | A reviewer may hold that a row's *Rejected* takes its row's source alone; the two can be cut out with no change of meaning |
| D-233's *Rejected* takes Q17's way alone; P1's ways are about moving a manual map run, and stand in D-212 | Copying P1's ways | None to the meaning |
| D-194's *Rejected* left as it stands, its "until the earning loop comes" included | Dropping it; To do 19 names the accepted cost alone | An old way stays on the page, harmless, since it was weighed and refused |
| `loop-run-knowledge` reads "currently", as the row's „dziś” and rule P4 give | The bare present tense | One word |
| D-223, D-222 *Scope*: `simulation · browser-view`; D-224, D-232: `simulation` | Others | A change misses an entry; the check passes either way |

## Concerns

1. **Two changes the plan does not list, both from the search of the whole foundation.** Neither moves a row's meaning. Please check them at the review of Slice 1.
   - D-227 reads `narrows D-133 · D-171 · D-186 · D-196 · D-201`: those five say "during a map run" of the map-run view and the program panel, which an earning loop's run does not open.
   - D-209's *Rationale* gains "with no earning loop passing", or its sentence stops being true after To do 17 (spec section 10).
2. **D-22 now reads "the map's layout", where it read "the game map's layout".** The handoff keeps projected wording in full, while WAY-104 asks for a qualifier, since "map" is the last word of the-way's "part map". The log already mixes both forms: D-179 and D-189 use the bare word. I kept the handoff's rule. Restoring "game" is one word at two places if the review prefers it.
3. **D-223 and D-230 have nearly the same question.** The plan and the spec name both, and D-223 keeps its approved wording, so I followed them. A later search of the log finds two entries for "when".
4. **`catch-up`'s definition says "while the game was closed", and D-230 runs it after a save lost to another browser's**, where the tab stayed open. The definition is projected and row 25 was accepted, so I left both. The word's meaning there is a shade wider than its definition.
5. **The sentence in `src/browser/view/game-saver.ts:16` and `tests/view/game-saver.test.mjs:228`, and the destructive-button sentence in `guidelines/styleguide-browser-view.md:198`, stay behind the entries until Slices 4 and 5**, as the plan gives.
6. **`trip-run-end` reads *Method* `test` while no test covers its new clause until Slice 2**, as the handoff gives.

## Problems

None observed. The first run of the edit script stopped on an *Origin* that matched twice, before writing anything; a longer match fixed it.
