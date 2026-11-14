**State: ready** — four items under "Fix or let through" wait for your answer, and none of them blocks the merge.

## What you will see

A new game now gives the player the action „Eksploruj” from the first second. In the program editor of a new game „Eksploruj” can be picked at once, and „+ reguła” is never greyed out: it adds a rule at the end of its group, opens the rule's panel on the condition, and the rule reads „Zawsze → Eksploruj” until the player picks something else. A character whose program says „Zawsze → Eksploruj” starts exploring in the first game minute and finishes its first exploration, which is its first discovery, by game minute 20 on every map; a test now pins that.

The first chill, which used to bring „Eksploruj”, now brings only the action „Wędruj” and the condition „Temperatura poniżej”; the rest of the chain of discoveries is as it was, on every map. The skill tree „Eksploracja” now comes with the first finished exploration, and the band of that discovery names the tree beside what the exploration revealed. At the first chill the game still writes „Zawsze → Eksploruj” into the program, but only where the program has no rule with „Eksploruj” yet; where the player added one, the game adds nothing, and the band and the chronicle say „Gra dopisała regułę…” only where it did (with one limit, item 5). The button „Dodaj regułę z tym” in the band of the first chill now adds „Zawsze → Wędruj”.

A saved game made before this change, in a game where no character has yet been chilled in a manual run, has no „Eksploruj” among the things the player knows. The game refuses it as damaged and starts anew under the sentence „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.”, as you chose; the version of the saved game does not change.

On Skraj lasu, the program of 21 rules in 5 groups that your measuring note holds solves the map on 289 of 300 seeds from an account with nothing discovered, against 290 from an account with everything discovered. You accepted 289 for now, to be revised in the balance work; the test requires at least 289.

### Underneath

The data now says that nothing reveals „Eksploruj”, and a new game's Understanding is read from the data; sixteen existing test files moved their expectations from „Eksploruj” at the first chill to „Eksploruj” at the start. The foundation gains one decision on the refusal of a save, one on the accepted figure and two invariants, and six entries are rewritten or corrected.

## For you to decide

### Needed from you

none

### Fix or let through

1. Nobody has looked at the changed screens in a real browser: the editor of a new game with „Eksploruj” and an enabled „+ reguła”, and the band of the first exploration with two trees. If something looks wrong there, you would see it when you play, not before. The tests cover the enabled button and the text of the band on a simulated page, and the change draws no new component or style. Looking now costs a local start of the game and one more session; letting it through costs nothing today. I recommend letting it through, since you are about to play it. Look in this request, make a task of it, or let it through? (Checks)
2. Three small wording points remained after the last review, none of which changes what the game does: the title of the first-pass test repeats the number 289 that also stands as a constant, so a later revision of the figure would leave a false title; one clause of the entry on the band says the game wrote no rule whenever the player's own rule has run, which is wrong in the one case where the player deleted such a rule; and an example in the entry on the accepted figure carries the other account's 290, which may go stale. Whoever revises the balance meets them first, and each is a one-line change. I recommend letting them through, since the balance work will touch the same lines. Fix them in this request (one fix and one review), make a task of them, or let them through? (Minor findings, 1–3)
3. The review of the whole change did not run through all the decisions it selected by title: it read 10 decisions whole and 10 in part of the 337 decisions that name the two parts the change touches, and searched the rest by the words of the change instead. Three agents' searches, the author's, the reviewer's and the return step's, found no sentence still saying the old thing; a sentence that says it in other words would not be found. Reading the rest costs a fresh reviewer's pass over about 320 titles; letting it through costs the chance of one stale sentence. I recommend letting it through. Have a fresh reviewer read the rest in this request, or let it through? (Course of the cycle, Whole-change review)
4. The foundation holds an old gap that this request did not touch and cannot close: the rule that no part of the code imports another part, except as the part map allows, names no fact it rests on, and has had a bare placeholder since 8 November. Only you can name that fact. Make a task of it, or let it through? (Foundation entries)

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

5. The band of the first chill says „Gra dopisała regułę…” by one test: it is left out when the record of the map run already holds a minute of exploring, which means a rule of the player's own has run. A saved game keeps no note of who wrote a rule, and adding a note changes the shape of the save and so raises its version, which throws away every earlier save — the price you refused for „Eksploruj” itself. Two cases go wrong. A rule „Zawsze → Eksploruj” the player added that has not run by the first chill (added in the last minutes, or placed in a group whose condition the game does not know yet) is named as the game's. And where the player deleted every „Eksploruj” rule the character had run before the first chill, the rule the game wrote goes unnamed. The entry now says exactly this, instead of promising more than the game does. The exact way, a note in the save and version 7, I did not take, for the price above. (Foundation entries)
6. The test of the first pass asserts at least 289 of the 300 seeds, one constant, as you decided, and prints the other account's count without asserting it; the invariant and a new decision say the same figure and that it is to be revised in the balance work. The wording you gave the task was "at least as many as the account with everything discovered", and with the measurement one seed short that no longer holds; if you meant the relative form, one line of the test and the two entries change. (Foundation entries)
7. Entries the cycle wrote that you did not see at the task, each repeated in "In your language": the example in the entry on how a minute of a map run takes effect, which still said that the first chill brings „Eksploruj”, now says the chill brings „Wędruj” and „Temperatura poniżej” and that the game writes the rule where the copy has none; the example of „Dodaj regułę z tym” at the first chill now says it adds „Zawsze → Wędruj”; the entry on how the band names the written rule says what the game does (item 5), and the entry on the chronicle follows it; and the new decision records your acceptance of 289 of 300, in your words: "wynik 289 z 300 jest na ten moment w porządku", to be revised in the balance work. (Foundation entries)
8. Tests and invariants: two new invariants, the first discovery by game minute 20 on every map and the first pass at 289 of 300, both marked as met; the comments of two Python tests of invariants now say that a new game knows „Zawsze” and „Eksploruj” instead of nothing, their numbers unchanged; the expectations of sixteen simulation and view test files moved to „Eksploruj” at the start; and the small function that decided when „+ reguła” was greyed out is removed together with its tests, since nothing uses it now and other tests of the editor pin the same choices. The mutation analysis of the changed ranges found no real gap. (Foundation entries, Checks)
9. Choices of the cycle beyond the task: the test takes its seeds the way the balance test of the first map does, 300 consecutive moments, and its program was copied by me from your measuring note into the test, with no note named in the repository; the decision on the first discovery lists the two new invariants among its checks, which the approved definition left blank, because the entry template asks a decision to name the invariants that derive from it, and I narrowed the two invariants' "derives from" lines so every pair names itself both ways. The other way, leaving the line blank, would have left the two invariants unnamed by any decision. (Foundation entries)

## Cost

About 1 hour 7 minutes of working time across the stages (23 minutes of it waiting for tools), by an author and reviewers, all on the same model as the orchestrator, Claude Sonnet 5.5, with about 118 million tokens counted, nearly all read from a cache; plus two runs of the whole gate of about 29 and 23 minutes, which the table of stages does not count (the first failed, see Checks). One round of review with one fix and the review of that fix, one fix of a gate failure with its review, and the mutation analysis. The table of stages: RECORD_LINK/stages.md

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record survives only then; the repository's earlier requests were merged that way.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — cztery pozycje w „Napraw albo przepuść” czekają na Twoją odpowiedź, żadna nie blokuje scalenia.

## Co zobaczysz

Nowa gra daje teraz graczowi czynność „Eksploruj” od pierwszej sekundy. W edytorze programu nowej gry „Eksploruj” można wybrać od razu, a „+ reguła” nigdy nie jest wyszarzone: dodaje regułę na końcu swojej grupy, otwiera jej panel na warunku, a reguła brzmi „Zawsze → Eksploruj”, dopóki gracz nie wybierze czegoś innego. Postać, której program mówi „Zawsze → Eksploruj”, zaczyna eksplorować w pierwszej minucie gry i kończy pierwszą eksplorację, czyli swoje pierwsze odkrycie, najpóźniej w 20. minucie gry na każdej mapie; pilnuje tego test.

Pierwsze wychłodzenie, które dawniej przynosiło „Eksploruj”, przynosi teraz tylko czynność „Wędruj” i warunek „Temperatura poniżej”; reszta łańcucha odkryć jest bez zmian, na każdej mapie. Drzewo umiejętności „Eksploracja” wchodzi teraz z pierwszą skończoną eksploracją, a pas tego odkrycia nazywa je obok tego, co eksploracja odsłoniła. Przy pierwszym wychłodzeniu gra dalej dopisuje „Zawsze → Eksploruj” do programu, ale tylko gdy program nie ma jeszcze reguły z „Eksploruj”; gdy gracz sam ją dodał, gra nie dopisuje nic, a pas i kronika mówią „Gra dopisała regułę…” tylko wtedy, gdy ją dopisała (z jednym ograniczeniem, pozycja 5). Przycisk „Dodaj regułę z tym” w pasie pierwszego wychłodzenia dodaje teraz „Zawsze → Wędruj”.

Zapis gry sprzed tej zmiany, w grze, w której żadna postać nie została jeszcze wychłodzona w ręcznym przejściu, nie ma „Eksploruj” wśród rzeczy, które gracz zna. Gra odrzuca go jako uszkodzony i zaczyna od nowa ze zdaniem „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.”, jak wybrałeś; wersja zapisu się nie zmienia.

Na Skraju lasu program z 21 reguł w 5 grupach z Twojej notatki z pomiarami rozwiązuje mapę na 289 z 300 ziaren z konta bez odkryć, wobec 290 z konta ze wszystkim odkrytym. Przyjąłeś 289 na teraz, do rewizji przy pracy nad balansem; test wymaga co najmniej 289.

### Pod spodem

Dane mówią teraz, że nic nie odsłania „Eksploruj”, a Zrozumienie nowej gry czyta się z danych; szesnaście istniejących plików testów przeniosło oczekiwania z „Eksploruj” przy pierwszym wychłodzeniu na „Eksploruj” na starcie. Fundament dostaje jedną decyzję o odmowie zapisu, jedną o przyjętej liczbie i dwa niezmienniki, a sześć wpisów jest przepisanych albo poprawionych.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

none

### Napraw albo przepuść

1. Nikt nie obejrzał zmienionych ekranów w prawdziwej przeglądarce: edytora nowej gry z „Eksploruj” i włączonym „+ reguła” oraz pasa pierwszej eksploracji z dwoma drzewami. Gdyby coś tam wyglądało źle, zobaczysz to, grając, a nie wcześniej. Testy pokrywają włączony przycisk i tekst pasa na symulowanej stronie, a zmiana nie rysuje nowego komponentu ani stylu. Obejrzenie teraz kosztuje lokalny start gry i jeszcze jedną sesję; przepuszczenie nie kosztuje dziś nic. Polecam przepuścić, bo i tak zaraz w to zagrasz. Obejrzeć w tej prośbie, zrobić z tego zadanie, czy przepuścić? (Checks)
2. Po ostatnim przeglądzie zostały trzy drobne uwagi do sformułowań, żadna nie zmienia tego, co robi gra: tytuł testu pierwszego przejścia powtarza liczbę 289, która stoi też jako stała, więc późniejsza rewizja liczby zostawiłaby fałszywy tytuł; jedno zdanie wpisu o pasie mówi, że gra nic nie dopisała, ilekroć reguła gracza już się wykonała, co jest nieprawdą w jednym przypadku, gdy gracz usunął taką regułę; a przykład we wpisie o przyjętej liczbie niesie 290 z drugiego konta, które może się zestarzeć. Napotka je ten, kto będzie rewidował balans, a każda to zmiana jednej linii. Polecam przepuścić, bo praca nad balansem i tak dotknie tych samych linii. Poprawić w tej prośbie (jedna poprawka i jeden przegląd), zrobić z tego zadanie, czy przepuścić? (Minor findings, 1–3)
3. Przegląd całej zmiany nie przeszedł po tytułach wszystkich wybranych decyzji: przeczytał w całości 10 i w części 10 z 337 decyzji, które nazywają dwie części dotknięte zmianą, a resztę przeszukał po słowach zmiany. Przeszukania trzech agentów, autora, recenzenta i kroku powrotnego, nie znalazły zdania, które nadal mówi po staremu; zdanie mówiące to samo innymi słowami nie zostałoby znalezione. Przeczytanie reszty kosztuje przebieg świeżego recenzenta po około 320 tytułach; przepuszczenie kosztuje ryzyko jednego nieaktualnego zdania. Polecam przepuścić. Dać resztę do przeczytania świeżemu recenzentowi w tej prośbie, czy przepuścić? (Course of the cycle, Whole-change review)
4. Fundament ma starą lukę, której ta prośba nie ruszała i nie może zamknąć: reguła, że żadna część kodu nie importuje innej, poza tym, na co pozwala mapa części, nie nazywa faktu, na którym stoi, i od 8 listopada ma pusty znacznik. Fakt może nazwać tylko Ty. Zrobić z tego zadanie, czy przepuścić? (Foundation entries)

### Przyjmujesz przez scalenie

Scalenie przyjmuje te pozycje; jeśli któraś Ci nie odpowiada, powiedz która.

5. Pas pierwszego wychłodzenia mówi „Gra dopisała regułę…” według jednego testu: zdanie jest pomijane, gdy zapis przejścia ma już minutę eksplorowania, co znaczy, że reguła gracza się wykonała. Zapis gry nie trzyma notatki o tym, kto napisał regułę, a dodanie notatki zmienia kształt zapisu i podnosi jego wersję, co wyrzuca każdy wcześniejszy zapis — cenę, której nie chciałeś dla samego „Eksploruj”. Dwa przypadki są błędne. Reguła „Zawsze → Eksploruj”, którą gracz dodał, a która nie wykonała się do pierwszego wychłodzenia (dodana w ostatnich minutach albo w grupie, której warunku gra jeszcze nie zna), jest nazwana regułą gry. A gdy gracz usunął każdą regułę „Eksploruj”, którą postać wykonała przed pierwszym wychłodzeniem, reguła dopisana przez grę zostaje bez nazwy. Wpis mówi teraz dokładnie to, zamiast obiecywać więcej, niż gra robi. Dokładnej drogi, notatki w zapisie i wersji 7, nie wybrałem z powodu ceny powyżej. (Foundation entries)
6. Test pierwszego przejścia sprawdza co najmniej 289 z 300 ziaren, jedna stała, jak zdecydowałeś, i wypisuje liczbę drugiego konta, nie sprawdzając jej; niezmiennik i nowa decyzja mówią tę samą liczbę i że ma być rewidowana przy pracy nad balansem. Zadanie brzmiało „co najmniej tylu, co konto ze wszystkim odkrytym”, a przy pomiarze o jedno ziarno krótszym to już nie zachodzi; jeśli chodziło Ci o postać względną, zmieni się jedna linia testu i dwa wpisy. (Foundation entries)
7. Wpisy, które cykl napisał, a których nie widziałeś przy zadaniu, każdy powtórzony tu: przykład we wpisie o kolejności minuty przejścia, który mówił jeszcze, że pierwsze wychłodzenie przynosi „Eksploruj”, mówi teraz, że wychłodzenie przynosi „Wędruj” i „Temperatura poniżej”, a regułę gra dopisuje, gdy kopia jej nie ma; przykład „Dodaj regułę z tym” przy pierwszym wychłodzeniu mówi teraz, że dodaje „Zawsze → Wędruj”; wpis o tym, jak pas nazywa dopisaną regułę, mówi, co gra robi (pozycja 5), a wpis o kronice za nim idzie; nowa decyzja zapisuje Twoje przyjęcie 289 z 300 Twoimi słowami: „wynik 289 z 300 jest na ten moment w porządku”, do rewizji przy pracy nad balansem. (Foundation entries)
8. Testy i niezmienniki: dwa nowe niezmienniki, pierwsze odkrycie do 20. minuty gry na każdej mapie i pierwsze przejście przy 289 z 300, oba oznaczone jako spełnione; komentarze dwóch testów niezmienników w Pythonie mówią teraz, że nowa gra zna „Zawsze” i „Eksploruj”, a nie nic, liczby bez zmian; oczekiwania szesnastu plików testów symulacji i widoku przeniesiono na „Eksploruj” na starcie; a mała funkcja, która rozstrzygała, kiedy „+ reguła” jest wyszarzone, jest usunięta razem ze swoimi testami, bo nic jej już nie używa, a inne testy edytora pilnują tych samych wyborów. Analiza mutacji zmienionych zakresów nie znalazła prawdziwej luki. (Foundation entries, Checks)
9. Wybory cyklu poza treścią zadania: test bierze ziarna tak jak test balansu pierwszej mapy, 300 kolejnych chwil, a jego program przepisałem z Twojej notatki z pomiarami do testu, bez nazywania notatki w repozytorium; decyzja o pierwszym odkryciu wymienia dwa nowe niezmienniki wśród swoich sprawdzeń, co zatwierdzona definicja zostawiła puste, bo szablon wpisu każe decyzji nazwać niezmienniki, które z niej wynikają, a linie „wynika z” obu niezmienników zwęziłem, by każda para nazywała się wzajemnie. Druga droga, zostawienie linii pustej, zostawiłaby oba niezmienniki bez nazwania przez jakąkolwiek decyzję. (Foundation entries)

## Koszt

Około 1 godziny 7 minut czasu pracy w etapach (23 minuty z tego to oczekiwanie na narzędzia), przez autora i recenzentów, wszystkich na tym samym modelu co orkiestrator, Claude Sonnet 5.5, z około 118 milionami policzonych tokenów, prawie wszystkie z pamięci podręcznej; do tego dwa przebiegi całej bramki, po około 29 i 23 minuty, których tabela etapów nie liczy (pierwszy się nie powiódł, zob. Checks). Jedna runda przeglądu z jedną poprawką i przeglądem poprawki, jedna poprawka porażki bramki z przeglądem i analiza mutacji. Tabela etapów: RECORD_LINK/stages.md

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo link do zapisu przeżywa tylko wtedy; wcześniejsze prośby tego repozytorium scalano tak.

</details>

## Technical changes

Five commits on the base `e6a95a9b` (the head of main when the cycle began; main has not moved since):

- `831f3c67` makes the data say that nothing reveals „Eksploruj” (`src/browser/sim/data/actions.ts`), makes `newUnderstanding()` read from the data what nothing reveals, so a new game holds „Zawsze” and „Eksploruj” (`src/browser/sim/understanding.ts`), lets a skill carry its own revealing event (`src/browser/sim/data/skills.ts`) so the tree „Eksploracja” enters with the first finished exploration, and makes `advanceMinutes` write „Zawsze → Eksploruj” at the first chill only where the copy holds no rule with „Eksploruj” (`src/browser/sim/game.ts`). `chillRuleGroupName` reads `run.minutesByAction.explore > 0` to leave the band's sentence out (item 5). `loadSavedGame` refuses a document whose Understanding lacks what a new game holds, as `shape`, with the version still 6 (`src/browser/sim/saved-game.ts`). „+ reguła” is never disabled (`src/browser/view/rule-list.tsx`), and `offeredActionKinds` and its tests are removed (`src/browser/view/program-editor.ts`). Moved expectations in 8 simulation and 8 view tests, the wording of two Python invariant tests, and the new test of the first discovery in `tests/sim/discovery.test.mjs`.
- `1ee2a9f8` adds `tests/sim/new-account-first-pass.test.mjs`: the program of 21 rules in 5 groups, the first 300 seeds of the balance test of the first map, the new account against the account with everything discovered.
- `17d83018` writes the foundation entries and corrections of the task.
- `d925d5ca` is the fix of the whole-change review's findings and of its Minor findings within the task: it rewords the entry on the band to what the code does and follows it in the entry on the chronicle, drops an unfitting check line from the new decision on the refusal of a save, narrows the "derives from" of the two invariants, writes the new decision on the accepted figure, and changes the first-pass test to assert 289.
- `e6ac95cd` lists the new test in the mutation test selection of `stryker.config.json` (the gate had failed on it).
- No merge commit: main did not move during the cycle.

## Checks

- The whole gate, `npm test`: first run on `d925d5ca`, exit 1 — in `tests/quality`, `test_ruff_source_rules` and `test_shellcheck_source_rules` with `FileNotFoundError`, because a new worktree has no `.runs/quality-venv` (installed as `README.md` gives, ruff 0.17.1 and ShellCheck 0.11.0; the failure is of the environment, not of the change), and `test_every_simulation_test_except_source_rules_is_listed`, the fault of the change (the new test missing from `stryker.config.json`); the check of the foundation did not run, since the gate stops at the first failing stage. Second run on `e6ac95cd`, the tree of this request: exit 0, build, Node tests, 562 Python tests in 4 directories, `0 errors` of the foundation check. The failures of the first run were not measured on the base: the two environment failures arise in any new worktree and the third arises only with the new file. No check of the final run failed or was left unrun except the real-browser look (item 1).
- Own-work checks. The author saw the new tests fail for the expected reason before they passed (the first-discovery test with the exploration set to 25 minutes: 6 failing tests; the refusal of a save with the check taken out: the crafted-document test failed) and ran the changed simulation and view test files, typecheck, ESLint and Prettier, all exit 0. The author's own check of the band's sentence reproduced the wrong case of item 5.
- The mutation analysis, run by the reviewer on the changed ranges of `game.ts`, `saved-game.ts` and `understanding.ts` (`actions.ts` and `skills.ts` gave no mutants, not explained): exit 0, 112 mutants, 92 killed, 20 survived, none a real gap (11 equivalent, 7 killed by view tests that the tool's test list does not run, 2 not worth a test).
- Crafted input at the trust boundary `src/browser/sim/saved-game.ts`: reviewed; a document with no „Eksploruj”, no action, „Eksploruj” named twice, the list of actions of a wrong type or missing, „Eksploruj” without „Zawsze”, or a key added beside the lists is refused whole as `shape`; the refusal only grew and no key is filled in.
- User interface: unchecked in a real browser; jsdom tests cover the enabled „+ reguła” and the text of the band; no screenshot was taken, and none is shown (item 1).
- Form check of this description: `python -B .the-way/task-cycle/request_check.py docs/task-cycles/pierwsza-akcja-od-startu/request.md --task docs/task-cycles/pierwsza-akcja-od-startu/task.frozen.md`, FORM_RUNS. Check of private paths on this description: `python -B .the-way/task-cycle/private_paths_check.py docs/task-cycles/pierwsza-akcja-od-startu/request.md`, PRIV_RUNS.
- The copy of the record, `docs/task-cycles/pierwsza-akcja-od-startu/`, was cleaned by one rewriting and checked: COPY_RUNS
- The process remarks check on the original and on the copy: REMARKS_RUNS

## Foundation entries

- D-118, projected: a new game's Understanding holds „Zawsze” and „Eksploruj”, and everything else is discovered in play.
- D-121, projected: a new game holds „Eksploruj”; the first chill brings „Wędruj” and „Temperatura poniżej”; the rest of the chain is as it was; its checks name the two new invariants and its example of the first chill is corrected.
- D-123, projected: the game writes „Zawsze → Eksploruj” at the first chill only where the copy holds no rule „Eksploruj”.
- D-124, projected: „+ reguła” adds a rule at the end of its group, opens its panel on the condition, and is never disabled; the example of the disabled button is corrected.
- D-128, projected: what the Understanding holds from the start, an action as well as a condition, has no revealing event in the data.
- D-195, projected: a tree whose first action the Understanding holds from the start enters with the first finished action of that skill.
- Glossary „Understanding”, projected: it holds „Zawsze” and „Eksploruj” from the start of a new game.
- D-403, row 2: the load refuses a saved game state whose Understanding lacks „Zawsze” or „Eksploruj” as a shape the game does not admit, and the version of the saved game stays.
- `first-exploration-discovery`, row 1: a character of a new game whose program holds „Zawsze → Eksploruj” from the entrance makes its first discovery by game minute 20, on every map. `Violated: no`.
- `new-account-first-pass`, row 3: on Skraj lasu, a program of 21 rules in 5 groups that its test names solves the map on at least 289 of 300 seeds from a game of an account with nothing discovered. `Violated: no`.
- D-404, the cycle's (the human's decision of 2026-11-14): the first pass of a new account on Skraj lasu is accepted at 289 of the 300 seeds for now, and revised when the balance is worked on.
- D-312, the cycle's: the band leaves the written-rule sentence out where the record of the map run holds a minute of exploring; it says what that costs. D-345, the cycle's: follows D-312.
- D-71 and D-313, the cycle's: the examples of the first chill corrected (the chill discovers „Wędruj” and „Temperatura poniżej”; the button adds „Zawsze → Wędruj”).
- Invariant tests altered: none in a way that weakens a check; `tests/invariants/test_player_map_run_pace.py` and `tests/invariants/test_minute_span_split.py` changed in wording only. No surface changed. No *Violated* mark set or cleared.
- A gap that stands in the foundation and was not touched (item 4): the invariant `cross-part-imports` has a bare `TODO` in its *Rests on* since 8 November 2026.

## Minor findings

Minor findings of the review of the fix (`reports/review-fix-report.md`), none fixed, none blocking:

1. "**The number stands twice in the test.** `tests/sim/new-account-first-pass.test.mjs:145` has "…at least 289 of the 300 named seeds" in the test's title, beside `ACCEPTED_SEEDS = 289` at line 27; the addendum asked for the number once. A revision of the constant would leave the title false. Fix: take the number out of the title ("…on at least the accepted number of the 300 named seeds")."
2. "**D-312's binding sentence says "and so the game wrote none" of the record that holds a minute of exploring.** In the accepted case where the player deleted every carried-out rule „Eksploruj”, the record holds a minute of exploring although the game did write a rule; the *Rationale* says so, the clause "and so the game wrote none" does not. Read as a cause of the omission it overstates by that one case; the omission itself matches the code. Fix: end the clause after "(D-123)" without "and so the game wrote none"."
3. "**D-404's "complies" example carries the measurement of the other account (290).** After the balance work it may go stale with the figure; harmless, since the entry says the figure is to be revised."

From the review of the whole change, within the task and not fixed (the orchestrator's choice, item 1):

4. "**M3. The author's UI check was not performed (WAY-219; `task-cycle/change/ui_check.md`).** The change alters what two screens show (the button „+ reguła” enabled from the first second, „Eksploruj” in the editor from the start, the band of the first exploration with two trees). The author's report: "the manual check in a browser (optional, not made)"; jsdom tests cover the enabled state. I did not run the game either (no browser, no local HTTPS start; the handoff forbids heavy runs), so the real-browser appearance of the enabled button and of the band is unverified by anyone. Effect on the user is small (the change removes a disabled state and adds a name to a band; no new component or style), so Minor; the orchestrator may want the check before the request."

From the mutation analysis, behaviour not worth a test (no finding): "501 `?.` removed (`revealedBy.kind`): behaviour not worth fixing, reason given. It matters only for a held discovery that names „Eksploruj”, which has no `revealedBy` now; […] Only a saved game of version 6 made before the change and saved while paused at the first chill can hold one, and the code is right for it (the `?.` is there for it); no test loads such a state […] A regression test is optional; I do not ask for one." (`src/browser/sim/understanding.ts:501`)

## Findings outside the task's scope

- "**M4. Comment layout in `src/browser/sim/game.ts:690-700`.** The docstring of `advanceMinutes` was edited in place and one line now runs to about 150 characters ("each by `withFirstChillRule` on its own content, and no other program, and the pick that ends the minute is made from the copy and the Understanding as they"); prettier does not wrap comments and passes. Cosmetic; outside the task."
- "**M5. `tests/sim/new-account-first-pass.test.mjs` duplicates `FIRST_REAL_MS` of `tests/sim/first-map-balance.test.mjs`** (the author's choice C1: a constant of one line, no shared fixture). Outside the task; nothing to do now."

## Course of the cycle

- **Task and sources:** the task "Pierwsza akcja od startu" of the plan of the project MVP2 loop2 (item 10), accepted 2026-11-13; sources: the approved project definition (fingerprint e6c61098) and the plan. Task 9, the first map, is merged and in the base.
- **Process pin:** `55afa8e57aa1b83c77108576a36642722e0dda15`, not moved.
- **Spec:** none; the orchestrator found no open design choice (the questions Q1–Q7 and the three rows of settlements settle the entries).
- **Route:** one author without a plan, class `same` as the orchestrator's (Sonnet 5.5); it did the foundation entries with its code and returned `done with concerns`; it was resumed for the fix, the return step and the gate fix.
- **Plan:** none.
- **Choices:** 7 choices beyond the task's binding answers (C1 to C7, the human's decision of the figure among them), in the questions table of the record.
- **Blocking findings left:** none. The one blocking finding of the whole-change review (an entry that promised more than the code does) was fixed in `d925d5ca` and its review passed.
- **Record:** RECORD_LINK/cycle.md
