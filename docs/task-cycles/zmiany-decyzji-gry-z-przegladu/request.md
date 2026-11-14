**State: ready** — four items in "Fix or let through" wait for your answer; the rest you accept by merging.

## What you will see

The game itself does not change: no screen, no behaviour, no saved game. What changes is the written record of decisions that agents compare their work with. Nine places where the record said something other than the game does, or left out a cost the game pays, now say the right thing:

- A new or removed ordinary action changes the shape of the saved game, so it raises the saved-game version again and discards every older save. The record, the guideline for the saved-game file and the comment next to the version constant all say so now.
- The tab and the filter of the chronicle do not survive a reload of the page; the two decisions on them say so.
- The rule on the streak resets only in a map run that has not ended.
- The campfire is craftable only with the skill "Wytwarzanie ogniska"; the example and the rationale of its decision match the data, and the campfire open to every archetype is recorded as a rejected way to weigh again when a second archetype is designed.
- The line "Wyniesie" appears after the character is switched to another program, not when the plan is edited, since the screen gives no plan edit during a map run.
- In a window narrower than 1074 px the chronicle stands under the whole program, and the decision on that layout now says it is an accepted cost.
- The wording of the decision on a running effect of the scene is smoothed and gets its exception: unless the map run is left or a new one starts.
- The word "loop" in the decisions now means the previous game only; the earning loop is written in full in 26 places, and the glossary says what "loop" is.
- A new decision says which browsers the game supports (current Chrome, Edge and Firefox on a computer; Safari is outside), what the smallest window is (a page area of 1280 × 720 px, not the screen resolution), and how it is checked (the agent's daily checks in Chromium; Firefox and Edge by hand in a real browser).

### Underneath

Everything is text of the foundation, one guideline sentence and a comment: the only line of code touched is the comment above the version constant of the saved game file, which holds the code that reads a document from the server, and no code or value of it changed.

## For you to decide

### Needed from you

none

### Fix or let through

1. The new decision on browsers and the smallest window lists the older decisions that keep their meaning in a narrower or lower window, and the list leaves out two that also define such a window: the one that gives the scene a single size (no second scale for a narrow window), and the one that caps the height of the end-of-run window by the height of the browser window. An agent that reads the list as complete may treat those two as outside it and "fix" a narrow window by scaling the scene. The sentence says in general that a decision that defines the look in such a window keeps its meaning, so both stay protected without being named; the risk is only that the list reads as exhaustive. Adding the two names here costs one correction (one clause and one review of it); making a task costs a later session; letting it through costs nothing today and leaves the list as it is. I recommend adding the names in this request, since the decision was written in this request to end exactly this kind of doubt. Do it in this request, make a task of it, or let it through? (Minor findings, 1)
2. The older decision on how a map is solved says that every change of the program rules sets the streak to zero, without "in a map run that has not ended" — the same gap the invariant had and this request closes. An agent may still "fix" correct code that leaves the streak of a map run that ended in death. It is outside this task, and changing it alters an approved decision beyond what the task carries, so I did not do it. Fixing it later costs one small task; leaving it costs a possible wrong "fix" by a later agent, caught by the test that already covers the ended-run case. I recommend making a task of it. Do it in this request, make a task of it, or let it through? (Findings outside the task's scope, 2)
3. A few smaller leftovers: a test file's opening comment still quotes the old sentence of the streak rule; English comments in the game's code still call the earning loop just "loop", which the glossary now reserves for the previous game; the reason recorded for rejecting Firefox in the playing skill (the WebKit of this computer does not install with the Playwright in use) stands only in the rejected ways of the new decision, with no environment fact behind it. None changes what a player sees; each may mislead a later agent for a moment. One tidy-up task would cover all three; letting them through costs nothing today. I recommend making one task of them. Do it in this request, make a task of it, or let it through? (Findings outside the task's scope, 1, 3 and 5)
4. One invariant that no file of a part may import a file of another part unless allowed still has no named fact it rests on (a bare gap recorded since 2026-11-08). This request does not touch it, and it stays on every request until someone names the fact. Naming it needs you; make a task of it or let it through? I recommend letting it through here, since the review of the foundation already found it. (Findings outside the task's scope, 4)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

5. The new decision on browsers keeps the older decisions about narrow windows in force: it says that a decision that defines the look in a narrower or lower window keeps its meaning there, and that a fault of the look below the smallest window, where no decision defines it, is not fixed. The cycle chose this reading because your answer about the 1000 px window covers only a remark about a look no decision defines; making the new decision prevail over the older ones would change the meaning of two approved decisions beyond what the task carries.
6. The word "loop" in the decision about how a map is solved ("keeping the loop going") now reads "keeping the earning loop going". The source of the sentence is lost, but the sentence stands in a rationale about a program that survives on its own, which is what the earning loop does; the other reading, the previous game, has no sense there.
7. The decisions on the tab and the filter of the chronicle carry the reload in their binding sentences, not only in the rationale, so that a later change is compared with it; the decision on the saved-game version carries the new rule about ordinary actions, which no row of the task carried whole.
8. The new decision on browsers names, as the parts of the repository it binds, the screens and the work of agents (the daily checks), since it binds how an agent checks; its examples are the cycle's own, since the task gave none.
9. The glossary entry for "loop" says it is the previous game and not an earning loop, as the task ordered, although the glossary's own template asks the contrasting term never to contain the term itself. I kept your order.
10. One invariant besides the streak rule changed by a single word: the invariant on practice payment said "the stop of the loop" and now says "the stop of the earning loop", since the glossary entry moves that use.
11. The streak invariant's meaning, in plain words: a change of the program rules, or a switch to another program, zeroes the streak only in a map run that has not ended; the behaviour of the game was already so, and its test, unchanged, passes.

## Cost

About 44 minutes of working time (16 of them waiting for tools and the gate runs), counted to the opening of the request on one model, Claude Sonnet 5.5, in the orchestrator and every agent; about 43 million tokens, 97% of the input read from cache. One author, one review of the whole change that failed on one blocking finding, one fix, one review of the fix that passed; the return step found nothing to correct. The table of stages is in the committed record: `docs/task-cycles/zmiany-decyzji-gry-z-przegladu/stages.md` at the commit named under Record.

## How to merge

Merge with a merge commit, not a squash or a rebase, so that the link to the record by its commit stays valid. The count of merges since the last review of the foundation is 5 of 30; nothing in this request waits for such a review.

<details>
<summary>W języku zadania (po polsku)</summary>

**Stan: gotowe** — cztery pozycje w „Napraw albo przepuść” czekają na twoją odpowiedź; resztę akceptujesz przez scalenie.

## Co zobaczysz

Sama gra się nie zmienia: ani ekran, ani zachowanie, ani zapis gry. Zmienia się spisana księga decyzji, z którą agenci porównują swoją pracę. Dziewięć miejsc, w których księga mówiła co innego niż gra albo pomijała koszt, który gra ponosi, mówi teraz to, co trzeba:

- Każda nowa albo usunięta zwykła czynność zmienia kształt zapisu gry, więc znów podnosi wersję zapisu i odrzuca wszystkie starsze zapisy. Mówi o tym księga, wytyczna do pliku zapisu i komentarz przy stałej wersji.
- Zakładka i filtr kroniki nie przeżywają przeładowania strony; mówią o tym dwie decyzje o nich.
- Reguła o passie zeruje ją tylko w przejściu, które się nie skończyło.
- Ognisko da się wytworzyć tylko z umiejętnością „Wytwarzanie ogniska”; przykład i uzasadnienie jego decyzji pasują do danych, a ognisko otwarte dla każdego archetypu jest zapisane jako odrzucony wariant do ponownego rozważenia przy drugim archetypie.
- Linia „Wyniesie” pojawia się po przełączeniu postaci na inny program, nie przy edycji planu, bo ekran nie daje edycji planu w trakcie przejścia.
- W oknie węższym niż 1074 px kronika stoi pod całym programem, a decyzja o tym układzie nazywa to przyjętym kosztem.
- Brzmienie decyzji o trwającym efekcie sceny jest wygładzone i ma wyjątek: chyba że gracz wyjdzie z przejścia albo zacznie się nowe.
- Słowo „loop” w decyzjach znaczy teraz tylko poprzednią grę; pętla zarobkowa jest zapisana w całości w 26 miejscach, a słownik mówi, czym jest „loop”.
- Nowa decyzja mówi, w jakich przeglądarkach gra ma działać (bieżące Chrome, Edge i Firefox na komputerze; Safari jest poza zbiorem), jakie jest najmniejsze okno (obszar strony 1280 × 720 px, nie rozdzielczość ekranu) i jak to sprawdzać (codzienne sprawdzenia agenta w Chromium, Firefox i Edge ręcznie w prawdziwej przeglądarce).

### Pod spodem

Wszystko to tekst fundamentu, jedno zdanie wytycznej i komentarz: jedyna dotknięta linia kodu to komentarz nad stałą wersji w pliku zapisu gry, który czyta dokument z serwera; żaden kod ani wartość się w nim nie zmieniły.

## Do rozstrzygnięcia

### Potrzebne od ciebie

none

### Napraw albo przepuść

1. Nowa decyzja o przeglądarkach i najmniejszym oknie wylicza starsze decyzje, które w węższym albo niższym oknie zachowują swoje znaczenie, a na liście brakuje dwóch, które też określają takie okno: tej, która nadaje scenie jeden rozmiar (bez drugiej skali dla wąskiego okna), i tej, która ogranicza wysokość okna końca przejścia wysokością okna przeglądarki. Agent, który uzna listę za pełną, może uznać te dwie za spoza niej i „naprawić” wąskie okno skalowaniem sceny. Zdanie mówi ogólnie, że decyzja określająca wygląd w takim oknie zachowuje swoje znaczenie, więc obie są chronione bez nazwania; ryzyko polega tylko na tym, że lista wygląda na wyczerpującą. Dopisanie obu nazw tutaj kosztuje jedną poprawkę (jedna klauzula i jeden przegląd); zadanie kosztuje późniejszą sesję; przepuszczenie nic dziś nie kosztuje i zostawia listę jak jest. Rekomenduję dopisać nazwy w tym PR, bo decyzja powstała w tym PR właśnie po to, żeby kończyć takie wątpliwości. Zrobić to w tym PR, założyć zadanie czy przepuścić? (Drobne uwagi, 1)
2. Starsza decyzja o rozwiązywaniu mapy mówi, że każda zmiana reguł programu zeruje passę, bez „w przejściu, które się nie skończyło” — ta sama luka, którą miał niezmiennik, a ten PR ją zamyka. Agent może nadal „naprawić” poprawny kod, który zostawia passę przejścia zakończonego śmiercią. To poza zadaniem, a zmiana zmienia zatwierdzoną decyzję ponad to, co niesie zadanie, więc jej nie zrobiłem. Poprawienie później kosztuje jedno małe zadanie; zostawienie — możliwe błędne „naprawienie” przez późniejszego agenta, które złapie test, który już pokrywa przypadek zakończonego przejścia. Rekomenduję założyć zadanie. Zrobić to w tym PR, założyć zadanie czy przepuścić? (Uwagi poza zakresem zadania, 2)
3. Kilka drobiazgów: komentarz na początku pliku testu wciąż cytuje stare zdanie reguły o passie; angielskie komentarze w kodzie gry wciąż nazywają pętlę zarobkową po prostu „loop”, które słownik rezerwuje teraz dla poprzedniej gry; powód odrzucenia Firefoksa w skillu grania (WebKit tego komputera nie instaluje się z używanym Playwrightem) stoi tylko w odrzuconych wariantach nowej decyzji, bez faktu środowiska pod spodem. Żaden nie zmienia tego, co widzi gracz; każdy może na chwilę zmylić późniejszego agenta. Jedno zadanie porządkowe obejmie wszystkie trzy; przepuszczenie nic dziś nie kosztuje. Rekomenduję jedno zadanie. Zrobić to w tym PR, założyć zadanie czy przepuścić? (Uwagi poza zakresem zadania, 1, 3 i 5)
4. Jeden niezmiennik — że plik jednej części nie importuje pliku innej, o ile nie wolno — wciąż nie ma wskazanego faktu, na którym stoi (goły brak zapisany od 2026-11-08). Ten PR go nie rusza i będzie stał na każdym PR, dopóki ktoś nie nazwie faktu. Nazwanie go wymaga ciebie; założyć zadanie czy przepuścić? Rekomenduję przepuścić tutaj, bo przegląd fundamentu już to znalazł. (Uwagi poza zakresem zadania, 4)

### Akceptujesz przez scalenie

Scalenie akceptuje te pozycje; jeśli któraś ci nie odpowiada, powiedz która.

5. Nowa decyzja o przeglądarkach zostawia w mocy starsze decyzje o wąskich oknach: mówi, że decyzja określająca wygląd w węższym albo niższym oknie zachowuje tam swoje znaczenie, a usterka wyglądu poniżej najmniejszego okna, której żadna decyzja nie określa, nie jest naprawiana. Cykl wybrał tę wykładnię, bo twoja odpowiedź o oknie 1000 px dotyczy tylko uwagi o wyglądzie, którego żadna decyzja nie określa; gdyby nowa decyzja miała pierwszeństwo przed starszymi, zmieniłaby znaczenie dwóch zatwierdzonych decyzji ponad to, co niesie zadanie.
6. Słowo „loop” w decyzji o rozwiązywaniu mapy („keeping the loop going”) brzmi teraz „keeping the earning loop going”. Źródło zdania zaginęło, ale zdanie stoi w uzasadnieniu o programie, który przeżywa sam, a to robi pętla zarobkowa; druga wykładnia, poprzednia gra, nie ma tam sensu.
7. Decyzje o zakładce i filtrze kroniki niosą przeładowanie w zdaniach wiążących, nie tylko w uzasadnieniu, żeby późniejsza zmiana była z nim porównywana; decyzja o wersji zapisu niesie nową regułę o zwykłych czynnościach, której żaden wiersz zadania nie niósł w całości.
8. Nowa decyzja o przeglądarkach nazywa jako części repozytorium, które wiąże, ekrany i pracę agentów (codzienne sprawdzenia), bo wiąże to, jak agent sprawdza; jej przykłady są własne cyklu, bo zadanie ich nie dało.
9. Hasło „loop” w słowniku mówi, że to poprzednia gra, a nie pętla zarobkowa, jak kazało zadanie, choć szablon słownika prosi, by hasło przeciwstawne nigdy nie zawierało samego terminu. Zostawiłem twoje polecenie.
10. Jeden niezmiennik poza regułą o passie zmienił się o jedno słowo: niezmiennik o wypłacie wprawy mówił „the stop of the loop”, a mówi „the stop of the earning loop”, bo hasło słownika przesuwa to użycie.
11. Znaczenie niezmiennika o passie, po ludzku: zmiana reguł programu albo przełączenie na inny program zeruje passę tylko w przejściu, które się nie skończyło; zachowanie gry było takie od początku, a jego test, bez zmian, przechodzi.

## Koszt

Około 44 minut czasu pracy (16 z nich to czekanie na narzędzia i bramkę), liczone do otwarcia PR na jednym modelu, Claude Sonnet 5.5, w orkiestratorze i w każdym agencie; około 43 mln tokenów, 97% wejścia z pamięci podręcznej. Jeden autor, jeden przegląd całości, który nie przeszedł z jedną uwagą blokującą, jedna poprawka, jeden przegląd poprawki, który przeszedł; krok powrotny nie znalazł nic do poprawienia. Tabela etapów jest w zatwierdzonym zapisie cyklu: `docs/task-cycles/zmiany-decyzji-gry-z-przegladu/stages.md` w commicie z sekcji Record.

## Jak scalić

Scal commitem scalającym, bez squasha i bez rebase, żeby link do zapisu cyklu po jego commicie pozostał ważny. Licznik scaleń od ostatniego przeglądu fundamentu to 5 z 30; nic w tym PR nie czeka na taki przegląd.

</details>

## Technical changes

Four commits on top of the base `5159e8c4`:

- `2e5c2a80` (foundation): edits of nine existing decisions for to-do items 1, 2, 4, 5, 6 and 7; the earning-loop words of 12 decisions (item 8, 25 places); a new glossary entry `loop`; the invariant `streak-program-change`; one word of the invariant `loop-practice-payment`; the new decision D-393 (item 9).
- `285a210c`: one sentence in the rule "Wersja podnoszona razem z kształtem" of `guidelines/coding-saved-game.md` (through the guideline's own form, with D-369 added to its *Decision* field) and the comment above `SAVED_GAME_VERSION` in `src/browser/sim/saved-game.ts` (a comment alone; the file is the trust boundary of the simulation part, and the review confirmed that no code or value changed).
- `3767fd3d`: D-136 *Rationale* "keeping the loop going" → "keeping the earning loop going" (the orchestrator's choice, above).
- `dd0e6cb6` (the fix of the review): D-393 got a third binding sentence that says which decisions keep their meaning below the smallest window, its *Verification* pair was rewritten as changes, D-120 *Rationale* now says the verb makes a campfire "and, in later data, an archetype's goods", and the second paragraph of the saved-game rule names the added or removed ordinary action as the exception.

The return step wrote nothing: no commit. The decision number D-393 was the next free number on the base; another branch merged before this one may take it, so check it at the merge.

## Checks

- The gate `npm test` on the final tree `dd0e6cb6`: exit 0, 558 tests in 4 directories passed, 0 errors; it runs `foundation_check.py`. On the base `5159e8c4` the same gate: exit 0, 558 tests. Nothing failed and nothing was left unchecked; no check failed in one run and passed in another.
- Own-work check of the author (item 8): a count of standalone "loop"/"loops" in the decisions fell from 227 to 202 (25 fewer), each remaining use read in context; the reviewer read all 202 and found none that means the earning loop.
- Focused checks of the author and the reviewers: `foundation_check.py` exit 0; `npx prettier --check` and `npx eslint` on `src/browser/sim/saved-game.ts` exit 0; the test of the streak invariant (`python -B -m unittest test_streak_program_change`) exit 0, 5 tests; `git diff --check` exit 0.
- No screen changed; no screenshot, none expected.
- Form check of this description (`request_check.py`): FORM_CHECK_PENDING.
- Check of private paths on this description: PATHS_CHECK_PENDING.
- On the copy of the record: private paths, image files and the remarks check — COPY_CHECKS_PENDING.
- Remarks check on the original record: `python -B .the-way/task-cycle/remarks_check.py docs/task-cycles/zmiany-decyzji-gry-z-przegladu`, exit 0 after the second run, 12 items, 0 missing.

## Foundation entries

Meaning of each in one English sentence; each is marked by where it comes from.

- D-393 (new) — `row 1`: the game works in the current Chrome, Edge and Firefox on a computer, Safari is outside the set, the smallest supported window is a page area of 1280 × 720 px, and decisions that define the look in a narrower or lower window keep their meaning there.
- Glossary `loop` (new) — `row 2`: "loop" is the previous game, the one loop2 starts from, and not an earning loop.
- Invariant `streak-program-change` — `row 3`: a change of the program rules or rule groups of the copy, and every switch of the program, in a map run that has not ended, sets that map run's streak to zero on every map.
- D-369 — `the cycle's` (to-do item 1, no row carries it): every later change that adds or removes an ordinary action alters the shape of the saved game, raises its version again and discards every older save.
- D-346 and D-383 — to-do item 2: the pick of the tab and the filter of the chronicle does not survive a reload of the page.
- D-120 — item 4: "Wytwórz — ognisko" is open only to an archetype with the predisposition "Wytwarzanie ogniska"; the campfire open to every archetype is a rejected way, to be weighed again at the design of a second archetype.
- D-186 and D-179 — item 5: the line "Wyniesie" appears after a switch of the character to another program, not at an edit of the plan; the shield of the frozen snapshot concerns the simulation and the switch.
- D-311 — item 6: below 1074 px the chronicle stands under the whole program, an accepted cost, below the smallest window of D-393.
- D-367 — item 7: a running effect finishes unless the map run is left or a new one starts, standing where the mage stood or was walking to at the previous reading.
- Twelve decisions (D-93, D-136, D-164, D-189, D-208, D-239, D-241, D-246, D-247, D-251, D-329, D-389) and the changed invariant `loop-practice-payment` — item 8: the full name "earning loop" at 26 places that mean the earning loop; no new meaning.
- No invariant test was altered, no surface changed and no *Violated* mark was set or cleared.

## Minor findings

Minor findings that no fix made:

1. New in the review of the fix, within the task: "the named list in D-393's third sentence (`foundations/decisions.md:9643`) reads as exhaustive but omits D-349 and D-370, which also define a look in a narrower or lower window. Evidence: D-349 binding sentence and *Verification*; D-370 binding sentence 'as tall as its content up to a part of the height of the browser window'. Not Critical or Important because the generic clause 'where no decision defines it' keeps their meaning. Within the task (author-written text); the fix is one clause." (`reports/review-fix-report.md`)

The three Minor findings within the task of the review of the whole change were fixed in `dd0e6cb6`, and the review of the fix passed them.

## Findings outside the task's scope

Each in the reviewer's words (`reports/review-whole-report.md`):

1. "`tests/invariants/test_streak_program_change.py:1-3` still quotes the old sentence of `streak-program-change` in its docstring (author's finding 1). The task changes no test; nothing compares the docstring with the sentence (`foundation_check.py` checks identifiers only). The test itself covers the new wording (ended-run case at its line 34) and passes. Outside the task; the orchestrator may carry it into the fix round since it is one line."
2. "D-136 binding sentence lacks 'has not ended' (`foundations/decisions.md:2845-2855`; author's finding 2). It has the same gap that the invariant had; D-131 says 'the map run in progress'. D-136 is in the task only for one word. Outside the task."
3. "Bare 'loop' meaning the earning loop remains in English comments of code (for example `src/browser/sim/loop.ts:183-216` 'the loop is dropped', 'no loop of that character'). The glossary template's 'A changed meaning' asks the author to rewrite each such use in every tracked English file; item 8 is limited to decisions, and WAY-104 lets the code keep the domain word. Outside the task; a decision on whether to touch code comments belongs to the human."
4. "Glossary `loop`, *Not* carrier `earning loop` (`foundations/glossary.md:223-227`; author's finding 4). The glossary template says what carries a meaning is 'the term of another entry … never one holding the term or its forms'; 'earning loop' holds 'loop'. The task orders this exact carrier, so the entry follows the task and conflicts with the template; `foundation_check.py` passes because it checks that *Not* is present. Outside the task: the choice of another carrier or a template change needs the human. Reported so the conflict is known."
5. "D-393 *Rejected* rests on a statement about a tool ('it did not install with WebKit') while *Based on* is `none`. The environment-facts file holds no fact on it (`grep` found none); the task's *Not chosen* carries the statement and the template makes *Rejected* hold what the source keeps (WAY-134), so the author was right to keep it there. If the tool later installs Firefox the reason falls, which is what an environment fact is for (`the-way-record-environment-fact`). Outside the task."

Item 4 of "Fix or let through" (the invariant with a bare gap) is the one standing descriptive gap of the foundation: `cross-part-imports`, *Rests on* — a bare `TODO` since 2026-11-08 (`foundations/invariants.md:1243`).

## Course of the cycle

- **Task and sources:** the task "zmiany decyzji o grze i ekranach z przeglądu fundamentu" (independent), its nine to-do items and three settlement rows; sources: the foundation at `5159e8c4`, the data of the review of the foundation of 2026-11-13 read at its sections F-1, F-8, F-12, F-19, F-20, F-22, F-27, F-38 and F-40.
- **Process pin:** `55afa8e57aa1b83c77108576a36642722e0dda15`, not moved; the gate on it at the base: exit 0.
- **Spec:** none — no open design choice (every item and row settles its entry).
- **Route:** one author without a plan, class `same`, since one agent holds the change and the wording of binding text across three parts and the replacement of "loop" needs a judgment at each place.
- **Plan:** none.
- **Choices:** 7 other choices in the questions table of the record, `docs/task-cycles/zmiany-decyzji-gry-z-przegladu/cycle.md` at the commit named under Record.
- **Blocking findings left:** none; the one blocking finding of the review of the whole change (D-393 against D-280 and D-389, `foundations/decisions.md:9641-9654`) was fixed in `dd0e6cb6` and passed the review of the fix.
- **Record:** `docs/task-cycles/zmiany-decyzji-gry-z-przegladu/` at the commit RECORD_SHA_PENDING.
