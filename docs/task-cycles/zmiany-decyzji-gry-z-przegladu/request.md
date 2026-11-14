**State: ready** — corrected for your remarks; nothing waits for your answer, and what you accept by merging is listed below.

## What you will see

The game itself does not change: no screen, no behaviour, no saved game. What changes is the written record of decisions that agents compare their work with. Nine places where the record said something other than the game does, or left out a cost the game pays, now say the right thing:

- A new or removed ordinary action changes the shape of the saved game, so it raises the saved-game version again and discards every older save. The record, the guideline for the saved-game file and the comment next to the version constant all say so now.
- The tab and the filter of the chronicle do not survive a reload of the page; the two decisions on them say so.
- The rule on the streak resets only in a map run that has not ended; the invariant and, as you asked, the older decision on how a map is solved say it the same way.
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

none

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

1. The new decision on browsers keeps the older decisions about narrow windows in force: it says that a decision that defines the look in a narrower or lower window keeps its meaning there, and that a fault of the look below the smallest window, where no decision defines it, is not fixed. The cycle chose this reading because your answer about the 1000 px window covers only a remark about a look no decision defines; making the new decision prevail over the older ones would change the meaning of two approved decisions beyond what the task carries.
2. The word "loop" in the decision about how a map is solved ("keeping the loop going") now reads "keeping the earning loop going". The source of the sentence is lost, but the sentence stands in a rationale about a program that survives on its own, which is what the earning loop does; the other reading, the previous game, has no sense there.
3. The decisions on the tab and the filter of the chronicle carry the reload in their binding sentences, not only in the rationale, so that a later change is compared with it; the decision on the saved-game version carries the new rule about ordinary actions, which no row of the task carried whole.
4. The new decision on browsers names, as the parts of the repository it binds, the screens and the work of agents (the daily checks), since it binds how an agent checks; its examples are the cycle's own, since the task gave none.
5. The glossary entry for "loop" says it is the previous game and not an earning loop, as the task ordered, although the glossary's own template asks the contrasting term never to contain the term itself. I kept your order.
6. One invariant besides the streak rule changed by a single word: the invariant on practice payment said "the stop of the loop" and now says "the stop of the earning loop", since the glossary entry moves that use.
7. The streak invariant's meaning, in plain words: a change of the program rules, or a switch to another program, zeroes the streak only in a map run that has not ended; the behaviour of the game was already so, and its test, unchanged, passes.
8. The target branch moved while the cycle ran and took the number the new decision on browsers had been given, so the cycle merged the target into this branch and gave the new decision the next free number; a fresh reviewer checked the merge and found nothing. If another task merges first and takes that number too, it has to be changed once more.
9. The older decision on how a map is solved now says "in a map run that has not ended" next to the streak rule, as you asked, and "during that map run" for the switch to another program; that is the wording of the invariant and of the decision it follows, no more, and the rest of the decision is as it was. The new decision on browsers now names six older decisions that keep their meaning in a narrower or lower window, among them the two the earlier list left out.

## Cost

About 61 minutes of working time (22 of them waiting for tools and the gate runs), counted to the rewriting of the description after your remarks, on one model, Claude Sonnet 5.5, in the orchestrator and every agent; about 74 million tokens, 97% of the input read from cache. One author, one review of the whole change that failed on one blocking finding, one fix, one review of the fix that passed; the return step found nothing to correct; then one merge of the target branch, which had moved, and one review of that merge that passed; then one correction for your remarks, its review, a repeated return step that found nothing, and a new run of the gate. The table of stages is in the committed record: `docs/task-cycles/zmiany-decyzji-gry-z-przegladu/stages.md` at the commit named under Record.

## How to merge

Merge with a merge commit, not a squash or a rebase, so that the link to the record by its commit stays valid. The count of merges since the last review of the foundation is 5 of 30; nothing in this request waits for such a review.

<details>
<summary>W języku zadania (po polsku)</summary>

**Stan: gotowe** — poprawione według twoich uwag; nic nie czeka na twoją odpowiedź, a to, co akceptujesz przez scalenie, stoi niżej.

## Co zobaczysz

Sama gra się nie zmienia: ani ekran, ani zachowanie, ani zapis gry. Zmienia się spisana księga decyzji, z którą agenci porównują swoją pracę. Dziewięć miejsc, w których księga mówiła co innego niż gra albo pomijała koszt, który gra ponosi, mówi teraz to, co trzeba:

- Każda nowa albo usunięta zwykła czynność zmienia kształt zapisu gry, więc znów podnosi wersję zapisu i odrzuca wszystkie starsze zapisy. Mówi o tym księga, wytyczna do pliku zapisu i komentarz przy stałej wersji.
- Zakładka i filtr kroniki nie przeżywają przeładowania strony; mówią o tym dwie decyzje o nich.
- Reguła o passie zeruje ją tylko w przejściu, które się nie skończyło; mówi tak niezmiennik i, jak prosiłeś, starsza decyzja o rozwiązywaniu mapy.
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

none

### Akceptujesz przez scalenie

Scalenie akceptuje te pozycje; jeśli któraś ci nie odpowiada, powiedz która.

1. Nowa decyzja o przeglądarkach zostawia w mocy starsze decyzje o wąskich oknach: mówi, że decyzja określająca wygląd w węższym albo niższym oknie zachowuje tam swoje znaczenie, a usterka wyglądu poniżej najmniejszego okna, której żadna decyzja nie określa, nie jest naprawiana. Cykl wybrał tę wykładnię, bo twoja odpowiedź o oknie 1000 px dotyczy tylko uwagi o wyglądzie, którego żadna decyzja nie określa; gdyby nowa decyzja miała pierwszeństwo przed starszymi, zmieniłaby znaczenie dwóch zatwierdzonych decyzji ponad to, co niesie zadanie.
2. Słowo „loop” w decyzji o rozwiązywaniu mapy („keeping the loop going”) brzmi teraz „keeping the earning loop going”. Źródło zdania zaginęło, ale zdanie stoi w uzasadnieniu o programie, który przeżywa sam, a to robi pętla zarobkowa; druga wykładnia, poprzednia gra, nie ma tam sensu.
3. Decyzje o zakładce i filtrze kroniki niosą przeładowanie w zdaniach wiążących, nie tylko w uzasadnieniu, żeby późniejsza zmiana była z nim porównywana; decyzja o wersji zapisu niesie nową regułę o zwykłych czynnościach, której żaden wiersz zadania nie niósł w całości.
4. Nowa decyzja o przeglądarkach nazywa jako części repozytorium, które wiąże, ekrany i pracę agentów (codzienne sprawdzenia), bo wiąże to, jak agent sprawdza; jej przykłady są własne cyklu, bo zadanie ich nie dało.
5. Hasło „loop” w słowniku mówi, że to poprzednia gra, a nie pętla zarobkowa, jak kazało zadanie, choć szablon słownika prosi, by hasło przeciwstawne nigdy nie zawierało samego terminu. Zostawiłem twoje polecenie.
6. Jeden niezmiennik poza regułą o passie zmienił się o jedno słowo: niezmiennik o wypłacie wprawy mówił „the stop of the loop”, a mówi „the stop of the earning loop”, bo hasło słownika przesuwa to użycie.
7. Znaczenie niezmiennika o passie, po ludzku: zmiana reguł programu albo przełączenie na inny program zeruje passę tylko w przejściu, które się nie skończyło; zachowanie gry było takie od początku, a jego test, bez zmian, przechodzi.
8. Gałąź docelowa ruszyła się w trakcie cyklu i zajęła numer, który dostała nowa decyzja o przeglądarkach, więc cykl scalił ją z tą gałęzią i nadał nowej decyzji następny wolny numer; świeży recenzent sprawdził scalenie i nic nie znalazł. Jeśli inne zadanie scali się wcześniej i zajmie ten numer, trzeba go będzie zmienić jeszcze raz.
9. Starsza decyzja o rozwiązywaniu mapy mówi teraz „w przejściu, które się nie skończyło” przy regule o passie, jak prosiłeś, i „w trakcie tego przejścia” przy przełączeniu na inny program; to brzmienie niezmiennika i decyzji, za którą idzie, nic więcej, a reszta decyzji została jak była. Nowa decyzja o przeglądarkach nazywa teraz sześć starszych decyzji, które w węższym albo niższym oknie zachowują swoje znaczenie, w tym dwie, których brakowało na wcześniejszej liście.

## Koszt

Około 61 minut czasu pracy (22 z nich to czekanie na narzędzia i bramkę), liczone do przepisania opisu po twoich uwagach na jednym modelu, Claude Sonnet 5.5, w orkiestratorze i w każdym agencie; około 74 mln tokenów, 97% wejścia z pamięci podręcznej. Jeden autor, jeden przegląd całości, który nie przeszedł z jedną uwagą blokującą, jedna poprawka, jeden przegląd poprawki, który przeszedł; krok powrotny nie znalazł nic do poprawienia; potem jedno scalenie gałęzi docelowej, która się ruszyła, i jeden przegląd tego scalenia, który przeszedł; potem jedna poprawka według twoich uwag, jej przegląd, powtórzony krok powrotny, który nic nie znalazł, i nowe uruchomienie bramki. Tabela etapów jest w zatwierdzonym zapisie cyklu: `docs/task-cycles/zmiany-decyzji-gry-z-przegladu/stages.md` w commicie z sekcji Record.

## Jak scalić

Scal commitem scalającym, bez squasha i bez rebase, żeby link do zapisu cyklu po jego commicie pozostał ważny. Licznik scaleń od ostatniego przeglądu fundamentu to 5 z 30; nic w tym PR nie czeka na taki przegląd.

</details>

## Technical changes

Six commits on top of the base `5159e8c4` (and a merge of the target):

- `2e5c2a80` (foundation): edits of nine existing decisions for to-do items 1, 2, 4, 5, 6 and 7; the earning-loop words of 12 decisions (item 8, 25 places); a new glossary entry `loop`; the invariant `streak-program-change`; one word of the invariant `loop-practice-payment`; the new decision D-396 (item 9).
- `285a210c`: one sentence in the rule "Wersja podnoszona razem z kształtem" of `guidelines/coding-saved-game.md` (through the guideline's own form, with D-369 added to its *Decision* field) and the comment above `SAVED_GAME_VERSION` in `src/browser/sim/saved-game.ts` (a comment alone; the file is the trust boundary of the simulation part, and the review confirmed that no code or value changed).
- `3767fd3d`: D-136 *Rationale* "keeping the loop going" → "keeping the earning loop going" (the orchestrator's choice, above).
- `dd0e6cb6` (the fix of the review): D-396 got a third binding sentence that says which decisions keep their meaning below the smallest window, its *Verification* pair was rewritten as changes, D-120 *Rationale* now says the verb makes a campfire "and, in later data, an archetype's goods", and the second paragraph of the saved-game rule names the added or removed ordinary action as the exception.

The return step wrote nothing: no commit.
- `39f3daa7` (the correction for your remarks): the new decision on browsers names D-349 and D-370 in its third binding sentence (remark 1); the older decision on how a map is solved gets "in a map run that has not ended" and "during that map run" in its binding sentence, the invariant's wording (remark 2). Remarks 3 and 4 asked for no change in this request. It was reviewed (`PASS 39f3daa7`, no finding), and the return step was repeated for the two entries and found nothing to correct; no reset of the branch was needed.
- `23634ee9` (merge) and `c9365b7e`: the target branch took the pull request of another task meanwhile, with decisions D-393, D-394 and D-395, so the new decision, written as D-393, now has the number D-396. The merge kept every decision of the target as it stands and put ours after them; the renumbering changed the heading and one clause of the decision on the window layout. A fresh reviewer reviewed the merge and the renumbering and found nothing (`PASS c9365b7e`). The reviews and the reports written before that commit call the decision D-393. Another branch merged before this one may take D-396 too: check it at the merge.

## Checks

- The gate `npm test` on the final corrected tree `39f3daa7`: exit 0, 562 tests in 4 directories passed, 0 errors; it runs `foundation_check.py`. Before the correction, on the merged tree `c9365b7e`: exit 0, 562 tests; before the merge, on `dd0e6cb6`: exit 0, 558 tests; on the base `5159e8c4`: exit 0, 558 tests. Nothing failed in any run. Nothing failed and nothing was left unchecked; no check failed in one run and passed in another.
- Own-work check of the author (item 8): a count of standalone "loop"/"loops" in the decisions fell from 227 to 202 (25 fewer), each remaining use read in context; the reviewer read all 202 and found none that means the earning loop.
- Focused checks of the author and the reviewers: `foundation_check.py` exit 0; `npx prettier --check` and `npx eslint` on `src/browser/sim/saved-game.ts` exit 0; the test of the streak invariant (`python -B -m unittest test_streak_program_change`) exit 0, 5 tests; `git diff --check` exit 0.
- No screen changed; no screenshot, none expected.
- Form check of this description: `python -B .the-way/task-cycle/request_check.py docs/task-cycles/zmiany-decyzji-gry-z-przegladu/request.md --task docs/task-cycles/zmiany-decyzji-gry-z-przegladu/task.md`, last run exit 0; run before the record's link, after the merge, after the second record's link and after the correction.
- Check of private paths on this description: `python -B .the-way/task-cycle/private_paths_check.py docs/task-cycles/zmiany-decyzji-gry-z-przegladu/request.md`, last run exit 0.
- On the copy of the record, last runs: `python -B .the-way/task-cycle/private_paths_check.py docs/task-cycles/zmiany-decyzji-gry-z-przegladu` exit 0 on each of the three copies of the record (the first run listed 23 places before the first copy was cleaned); `python -B .the-way/task-cycle/image_files_check.py docs/task-cycles/zmiany-decyzji-gry-z-przegladu` exit 0 on each copy; `python -B .the-way/task-cycle/remarks_check.py docs/task-cycles/zmiany-decyzji-gry-z-przegladu` exit 0 on each copy.
- Remarks check on the original record: `python -B .the-way/task-cycle/remarks_check.py docs/task-cycles/zmiany-decyzji-gry-z-przegladu`, exit 0 after the second run, 12 items, 0 missing.

## Foundation entries

Meaning of each in one English sentence; each is marked by where it comes from.

- D-396 (new) — `row 1`: the game works in the current Chrome, Edge and Firefox on a computer, Safari is outside the set, the smallest supported window is a page area of 1280 × 720 px, and decisions that define the look in a narrower or lower window keep their meaning there.
- Glossary `loop` (new) — `row 2`: "loop" is the previous game, the one loop2 starts from, and not an earning loop.
- Invariant `streak-program-change` — `row 3`: a change of the program rules or rule groups of the copy, and every switch of the program, in a map run that has not ended, sets that map run's streak to zero on every map.
- D-369 — `the cycle's` (to-do item 1, no row carries it): every later change that adds or removes an ordinary action alters the shape of the saved game, raises its version again and discards every older save.
- D-346 and D-383 — to-do item 2: the pick of the tab and the filter of the chronicle does not survive a reload of the page.
- D-120 — item 4: "Wytwórz — ognisko" is open only to an archetype with the predisposition "Wytwarzanie ogniska"; the campfire open to every archetype is a rejected way, to be weighed again at the design of a second archetype.
- D-186 and D-179 — item 5: the line "Wyniesie" appears after a switch of the character to another program, not at an edit of the plan; the shield of the frozen snapshot concerns the simulation and the switch.
- D-311 — item 6: below 1074 px the chronicle stands under the whole program, an accepted cost, below the smallest window of D-396.
- D-367 — item 7: a running effect finishes unless the map run is left or a new one starts, standing where the mage stood or was walking to at the previous reading.
- Twelve decisions (D-93, D-136, D-164, D-189, D-208, D-239, D-241, D-246, D-247, D-251, D-329, D-389) and the changed invariant `loop-practice-payment` — item 8: the full name "earning loop" at 26 places that mean the earning loop; no new meaning.
- No invariant test was altered, no surface changed and no *Violated* mark was set or cleared.

## Minor findings

Minor findings that no fix made:

Reviewers called the new decision D-393 (it is now D-396).

None. The one Minor finding left after the fix — that the list of named decisions in the new decision on browsers omitted D-349 and D-370 — was fixed by the correction at your remark 1 (`39f3daa7`, `PASS 39f3daa7`). The three Minor findings within the task of the review of the whole change were fixed in `dd0e6cb6`.

## Findings outside the task's scope

Each in the reviewer's words (`reports/review-whole-report.md`), where D-393 is the decision now numbered D-396. Finding 2 was fixed by the correction at your remark 2; findings 1, 3 and 5 are the three leftovers you made one task of; finding 4 you let through, as the gap under the cross-part import invariant is already in the foundation review's findings.

1. "`tests/invariants/test_streak_program_change.py:1-3` still quotes the old sentence of `streak-program-change` in its docstring (author's finding 1). The task changes no test; nothing compares the docstring with the sentence (`foundation_check.py` checks identifiers only). The test itself covers the new wording (ended-run case at its line 34) and passes. Outside the task; the orchestrator may carry it into the fix round since it is one line."
2. "D-136 binding sentence lacks 'has not ended' (`foundations/decisions.md:2845-2855`; author's finding 2). It has the same gap that the invariant had; D-131 says 'the map run in progress'. D-136 is in the task only for one word. Outside the task."
3. "Bare 'loop' meaning the earning loop remains in English comments of code (for example `src/browser/sim/loop.ts:183-216` 'the loop is dropped', 'no loop of that character'). The glossary template's 'A changed meaning' asks the author to rewrite each such use in every tracked English file; item 8 is limited to decisions, and WAY-104 lets the code keep the domain word. Outside the task; a decision on whether to touch code comments belongs to the human."
4. "Glossary `loop`, *Not* carrier `earning loop` (`foundations/glossary.md:223-227`; author's finding 4). The glossary template says what carries a meaning is 'the term of another entry … never one holding the term or its forms'; 'earning loop' holds 'loop'. The task orders this exact carrier, so the entry follows the task and conflicts with the template; `foundation_check.py` passes because it checks that *Not* is present. Outside the task: the choice of another carrier or a template change needs the human. Reported so the conflict is known."
5. "D-393 *Rejected* rests on a statement about a tool ('it did not install with WebKit') while *Based on* is `none`. The environment-facts file holds no fact on it (`grep` found none); the task's *Not chosen* carries the statement and the template makes *Rejected* hold what the source keeps (WAY-134), so the author was right to keep it there. If the tool later installs Firefox the reason falls, which is what an environment fact is for (`the-way-record-environment-fact`). Outside the task."

The invariant with a bare gap that you let through is the one standing descriptive gap of the foundation: `cross-part-imports`, *Rests on* — a bare `TODO` since 2026-11-08 (`foundations/invariants.md:1243`).

## Course of the cycle

- **Task and sources:** the task "zmiany decyzji o grze i ekranach z przeglądu fundamentu" (independent), its nine to-do items and three settlement rows; sources: the foundation at `5159e8c4`, the data of the review of the foundation of 2026-11-13 read at its sections F-1, F-8, F-12, F-19, F-20, F-22, F-27, F-38 and F-40.
- **Process pin:** `55afa8e57aa1b83c77108576a36642722e0dda15`, not moved; the gate on it at the base: exit 0.
- **Spec:** none — no open design choice (every item and row settles its entry).
- **Route:** one author without a plan, class `same`, since one agent holds the change and the wording of binding text across three parts and the replacement of "loop" needs a judgment at each place. Corrected once for the human's remarks (https://github.com/mariusznazar/loop2/pull/94#issuecomment-6871475220; kept in the record as the remarks of the correction): the one author, resumed, made the correction on the branch and no reset to a base was needed.
- **Plan:** none.
- **Choices:** 8 other choices in the questions table of the record, `docs/task-cycles/zmiany-decyzji-gry-z-przegladu/cycle.md` at the commit named under Record.
- **Blocking findings left:** none; the one blocking finding of the review of the whole change (D-396 against D-280 and D-389, `foundations/decisions.md:9641-9654`) was fixed in `dd0e6cb6` and passed the review of the fix.
- **Record:** the third copy, made after the correction for your remarks (the earlier copies, `d1db5196` and `8a058922`, stay in history); `docs/task-cycles/zmiany-decyzji-gry-z-przegladu/` at the commit `RECORD3_SHA`: https://github.com/mariusznazar/loop2/tree/RECORD3_SHA/docs/task-cycles/zmiany-decyzji-gry-z-przegladu .
