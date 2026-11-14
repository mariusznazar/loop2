**State: ready** — corrected for your remarks; nothing waits for your answer, and merging accepts the items under "You accept by merging".

## What you will see

A new game now gives the player the action „Eksploruj” from the first second. In the program editor of a new game „Eksploruj” can be picked at once, and „+ reguła” is never greyed out: it adds a rule at the end of its group, opens the rule's panel on the condition, and the rule reads „Zawsze → Eksploruj” until the player picks something else. A character whose program says „Zawsze → Eksploruj” starts exploring in the first game minute and finishes its first exploration, which is its first discovery, by game minute 20 on every map; a test now pins that.

The first chill, which used to bring „Eksploruj”, now brings only the action „Wędruj” and the condition „Temperatura poniżej”; the rest of the chain of discoveries is as it was, on every map. The skill tree „Eksploracja” now comes with the first finished exploration, and the band of that discovery names the tree beside what the exploration revealed. At the first chill the game still writes „Zawsze → Eksploruj” into the program, but only where the program has no rule with „Eksploruj” yet; where the player added one, the game adds nothing, and the band and the chronicle say „Gra dopisała regułę…” only where it did (with one limit, item 1). The button „Dodaj regułę z tym” in the band of the first chill now adds „Zawsze → Wędruj”.

A saved game made before this change, in a game where no character has yet been chilled in a manual run, has no „Eksploruj” among the things the player knows. The game refuses it as damaged and starts anew under the sentence „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.”, as you chose; the version of the saved game does not change.

On Skraj lasu, the program of 21 rules in 5 groups that your measuring note holds solves the map on 289 of 300 seeds from an account with nothing discovered, against 290 from an account with everything discovered. You accepted 289 for now, to be revised in the balance work; the test requires at least 289.

### Underneath

The data now says that nothing reveals „Eksploruj”, and a new game's Understanding is read from the data; sixteen existing test files moved their expectations from „Eksploruj” at the first chill to „Eksploruj” at the start. The foundation gains one decision on the refusal of a save, one on the accepted figure and two invariants, and six entries are rewritten or corrected.

## For you to decide

### Needed from you

none

### Fix or let through

none

### You accept by merging

Merging accepts these items; if one does not suit you, say which.

1. The band of the first chill says „Gra dopisała regułę…” by one test: it is left out when the record of the map run already holds a minute of exploring, which means a rule of the player's own has run. A saved game keeps no note of who wrote a rule, and adding a note changes the shape of the save and so raises its version, which throws away every earlier save — the price you refused for „Eksploruj” itself. Two cases go wrong. A rule „Zawsze → Eksploruj” the player added that has not run by the first chill (added in the last minutes, or placed in a group whose condition the game does not know yet) is named as the game's. And where the player deleted every „Eksploruj” rule the character had run before the first chill, the rule the game wrote goes unnamed. The entry now says exactly this, instead of promising more than the game does. The exact way, a note in the save and version 7, I did not take, for the price above. (Foundation entries)
2. The test of the first pass asserts at least 289 of the 300 seeds, one constant, as you decided, and prints the other account's count without asserting it; the invariant and a new decision say the same figure and that it is to be revised in the balance work. The wording you gave the task was "at least as many as the account with everything discovered", and with the measurement one seed short that no longer holds; if you meant the relative form, one line of the test and the two entries change. (Foundation entries)
3. Entries the cycle wrote that you did not see at the task, each repeated in "In your language": the example in the entry on how a minute of a map run takes effect, which still said that the first chill brings „Eksploruj”, now says the chill brings „Wędruj” and „Temperatura poniżej” and that the game writes the rule where the copy has none; the example of „Dodaj regułę z tym” at the first chill now says it adds „Zawsze → Wędruj”; the entry on how the band names the written rule says what the game does (item 1), and the entry on the chronicle follows it; and the new decision records your acceptance of 289 of 300, in your words: "wynik 289 z 300 jest na ten moment w porządku", to be revised in the balance work. (Foundation entries)
4. Tests and invariants: two new invariants, the first discovery by game minute 20 on every map and the first pass at 289 of 300, both marked as met; the comments of two Python tests of invariants now say that a new game knows „Zawsze” and „Eksploruj” instead of nothing, their numbers unchanged; the expectations of sixteen simulation and view test files moved to „Eksploruj” at the start; and the small function that decided when „+ reguła” was greyed out is removed together with its tests, since nothing uses it now and other tests of the editor pin the same choices. The mutation analysis of the changed ranges found no real gap. (Foundation entries, Checks)
5. Choices of the cycle beyond the task: the test takes its seeds the way the balance test of the first map does, 300 consecutive moments, and its program was copied by me from your measuring note into the test, with no note named in the repository; the decision on the first discovery lists the two new invariants among its checks, which the approved definition left blank, because the entry template asks a decision to name the invariants that derive from it, and I narrowed the two invariants' "derives from" lines so every pair names itself both ways. The other way, leaving the line blank, would have left the two invariants unnamed by any decision. (Foundation entries)

## Cost

About 1 hour 17 minutes of working time across the stages (25 minutes of it waiting for tools), by an author and reviewers, all on the same model as the orchestrator, Claude Sonnet 5.5, with about 142 million tokens counted, nearly all read from a cache; plus four runs of the whole gate of about 29, 23, 28 and 25 minutes, which the table of stages does not count (the first failed, see Checks). One round of review with one fix and the review of that fix, one fix of a gate failure with its review, the mutation analysis, and one correction for your remarks with its review. The table of stages: https://github.com/mariusznazar/loop2/blob/RECORD_SHA/docs/task-cycles/pierwsza-akcja-od-startu/stages.md

## How to merge

Merge with a merge commit that keeps the commits, since the link to the record survives only then; the repository's earlier requests were merged that way.

<details>
<summary>W Twoim języku</summary>

**Stan: gotowe** — poprawione według Twoich uwag; nic nie czeka na Twoją odpowiedź, a scalenie przyjmuje pozycje z „Przyjmujesz przez scalenie”.

## Co zobaczysz

Nowa gra daje teraz graczowi czynność „Eksploruj” od pierwszej sekundy. W edytorze programu nowej gry „Eksploruj” można wybrać od razu, a „+ reguła” nigdy nie jest wyszarzone: dodaje regułę na końcu swojej grupy, otwiera jej panel na warunku, a reguła brzmi „Zawsze → Eksploruj”, dopóki gracz nie wybierze czegoś innego. Postać, której program mówi „Zawsze → Eksploruj”, zaczyna eksplorować w pierwszej minucie gry i kończy pierwszą eksplorację, czyli swoje pierwsze odkrycie, najpóźniej w 20. minucie gry na każdej mapie; pilnuje tego test.

Pierwsze wychłodzenie, które dawniej przynosiło „Eksploruj”, przynosi teraz tylko czynność „Wędruj” i warunek „Temperatura poniżej”; reszta łańcucha odkryć jest bez zmian, na każdej mapie. Drzewo umiejętności „Eksploracja” wchodzi teraz z pierwszą skończoną eksploracją, a pas tego odkrycia nazywa je obok tego, co eksploracja odsłoniła. Przy pierwszym wychłodzeniu gra dalej dopisuje „Zawsze → Eksploruj” do programu, ale tylko gdy program nie ma jeszcze reguły z „Eksploruj”; gdy gracz sam ją dodał, gra nie dopisuje nic, a pas i kronika mówią „Gra dopisała regułę…” tylko wtedy, gdy ją dopisała (z jednym ograniczeniem, pozycja 1). Przycisk „Dodaj regułę z tym” w pasie pierwszego wychłodzenia dodaje teraz „Zawsze → Wędruj”.

Zapis gry sprzed tej zmiany, w grze, w której żadna postać nie została jeszcze wychłodzona w ręcznym przejściu, nie ma „Eksploruj” wśród rzeczy, które gracz zna. Gra odrzuca go jako uszkodzony i zaczyna od nowa ze zdaniem „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.”, jak wybrałeś; wersja zapisu się nie zmienia.

Na Skraju lasu program z 21 reguł w 5 grupach z Twojej notatki z pomiarami rozwiązuje mapę na 289 z 300 ziaren z konta bez odkryć, wobec 290 z konta ze wszystkim odkrytym. Przyjąłeś 289 na teraz, do rewizji przy pracy nad balansem; test wymaga co najmniej 289.

### Pod spodem

Dane mówią teraz, że nic nie odsłania „Eksploruj”, a Zrozumienie nowej gry czyta się z danych; szesnaście istniejących plików testów przeniosło oczekiwania z „Eksploruj” przy pierwszym wychłodzeniu na „Eksploruj” na starcie. Fundament dostaje jedną decyzję o odmowie zapisu, jedną o przyjętej liczbie i dwa niezmienniki, a sześć wpisów jest przepisanych albo poprawionych.

## Do rozstrzygnięcia

### Potrzebne od Ciebie

none

### Napraw albo przepuść

none

### Przyjmujesz przez scalenie

Scalenie przyjmuje te pozycje; jeśli któraś Ci nie odpowiada, powiedz która.

1. Pas pierwszego wychłodzenia mówi „Gra dopisała regułę…” według jednego testu: zdanie jest pomijane, gdy zapis przejścia ma już minutę eksplorowania, co znaczy, że reguła gracza się wykonała. Zapis gry nie trzyma notatki o tym, kto napisał regułę, a dodanie notatki zmienia kształt zapisu i podnosi jego wersję, co wyrzuca każdy wcześniejszy zapis — cenę, której nie chciałeś dla samego „Eksploruj”. Dwa przypadki są błędne. Reguła „Zawsze → Eksploruj”, którą gracz dodał, a która nie wykonała się do pierwszego wychłodzenia (dodana w ostatnich minutach albo w grupie, której warunku gra jeszcze nie zna), jest nazwana regułą gry. A gdy gracz usunął każdą regułę „Eksploruj”, którą postać wykonała przed pierwszym wychłodzeniem, reguła dopisana przez grę zostaje bez nazwy. Wpis mówi teraz dokładnie to, zamiast obiecywać więcej, niż gra robi. Dokładnej drogi, notatki w zapisie i wersji 7, nie wybrałem z powodu ceny powyżej. (Foundation entries)
2. Test pierwszego przejścia sprawdza co najmniej 289 z 300 ziaren, jedna stała, jak zdecydowałeś, i wypisuje liczbę drugiego konta, nie sprawdzając jej; niezmiennik i nowa decyzja mówią tę samą liczbę i że ma być rewidowana przy pracy nad balansem. Zadanie brzmiało „co najmniej tylu, co konto ze wszystkim odkrytym”, a przy pomiarze o jedno ziarno krótszym to już nie zachodzi; jeśli chodziło Ci o postać względną, zmieni się jedna linia testu i dwa wpisy. (Foundation entries)
3. Wpisy, które cykl napisał, a których nie widziałeś przy zadaniu, każdy powtórzony tu: przykład we wpisie o kolejności minuty przejścia, który mówił jeszcze, że pierwsze wychłodzenie przynosi „Eksploruj”, mówi teraz, że wychłodzenie przynosi „Wędruj” i „Temperatura poniżej”, a regułę gra dopisuje, gdy kopia jej nie ma; przykład „Dodaj regułę z tym” przy pierwszym wychłodzeniu mówi teraz, że dodaje „Zawsze → Wędruj”; wpis o tym, jak pas nazywa dopisaną regułę, mówi, co gra robi (pozycja 1), a wpis o kronice za nim idzie; nowa decyzja zapisuje Twoje przyjęcie 289 z 300 Twoimi słowami: „wynik 289 z 300 jest na ten moment w porządku”, do rewizji przy pracy nad balansem. (Foundation entries)
4. Testy i niezmienniki: dwa nowe niezmienniki, pierwsze odkrycie do 20. minuty gry na każdej mapie i pierwsze przejście przy 289 z 300, oba oznaczone jako spełnione; komentarze dwóch testów niezmienników w Pythonie mówią teraz, że nowa gra zna „Zawsze” i „Eksploruj”, a nie nic, liczby bez zmian; oczekiwania szesnastu plików testów symulacji i widoku przeniesiono na „Eksploruj” na starcie; a mała funkcja, która rozstrzygała, kiedy „+ reguła” jest wyszarzone, jest usunięta razem ze swoimi testami, bo nic jej już nie używa, a inne testy edytora pilnują tych samych wyborów. Analiza mutacji zmienionych zakresów nie znalazła prawdziwej luki. (Foundation entries, Checks)
5. Wybory cyklu poza treścią zadania: test bierze ziarna tak jak test balansu pierwszej mapy, 300 kolejnych chwil, a jego program przepisałem z Twojej notatki z pomiarami do testu, bez nazywania notatki w repozytorium; decyzja o pierwszym odkryciu wymienia dwa nowe niezmienniki wśród swoich sprawdzeń, co zatwierdzona definicja zostawiła puste, bo szablon wpisu każe decyzji nazwać niezmienniki, które z niej wynikają, a linie „wynika z” obu niezmienników zwęziłem, by każda para nazywała się wzajemnie. Druga droga, zostawienie linii pustej, zostawiłaby oba niezmienniki bez nazwania przez jakąkolwiek decyzję. (Foundation entries)

## Koszt

Około 1 godziny 17 minut czasu pracy w etapach (25 minut z tego to oczekiwanie na narzędzia), przez autora i recenzentów, wszystkich na tym samym modelu co orkiestrator, Claude Sonnet 5.5, z około 142 milionami policzonych tokenów, prawie wszystkie z pamięci podręcznej; do tego cztery przebiegi całej bramki, po około 29, 23, 28 i 25 minut, których tabela etapów nie liczy (pierwszy się nie powiódł, zob. Checks). Jedna runda przeglądu z jedną poprawką i przeglądem poprawki, jedna poprawka porażki bramki z przeglądem, analiza mutacji i jedna korekta według Twoich uwag z przeglądem. Tabela etapów: https://github.com/mariusznazar/loop2/blob/RECORD_SHA/docs/task-cycles/pierwsza-akcja-od-startu/stages.md

## Jak scalić

Scal commitem scalającym, który zachowuje commity, bo link do zapisu przeżywa tylko wtedy; wcześniejsze prośby tego repozytorium scalano tak.

</details>

## Technical changes

Six commits of the change on the base `e6a95a9b` (the head of main when the cycle began), the merge of main, and the pair of the record:

- `831f3c67` makes the data say that nothing reveals „Eksploruj” (`src/browser/sim/data/actions.ts`), makes `newUnderstanding()` read from the data what nothing reveals, so a new game holds „Zawsze” and „Eksploruj” (`src/browser/sim/understanding.ts`), lets a skill carry its own revealing event (`src/browser/sim/data/skills.ts`) so the tree „Eksploracja” enters with the first finished exploration, and makes `advanceMinutes` write „Zawsze → Eksploruj” at the first chill only where the copy holds no rule with „Eksploruj” (`src/browser/sim/game.ts`). `chillRuleGroupName` reads `run.minutesByAction.explore > 0` to leave the band's sentence out (item 5). `loadSavedGame` refuses a document whose Understanding lacks what a new game holds, as `shape`, with the version still 6 (`src/browser/sim/saved-game.ts`). „+ reguła” is never disabled (`src/browser/view/rule-list.tsx`), and `offeredActionKinds` and its tests are removed (`src/browser/view/program-editor.ts`). Moved expectations in 8 simulation and 8 view tests, the wording of two Python invariant tests, and the new test of the first discovery in `tests/sim/discovery.test.mjs`.
- `1ee2a9f8` adds `tests/sim/new-account-first-pass.test.mjs`: the program of 21 rules in 5 groups, the first 300 seeds of the balance test of the first map, the new account against the account with everything discovered.
- `17d83018` writes the foundation entries and corrections of the task.
- `d925d5ca` is the fix of the whole-change review's findings and of its Minor findings within the task: it rewords the entry on the band to what the code does and follows it in the entry on the chronicle, drops an unfitting check line from the new decision on the refusal of a save, narrows the "derives from" of the two invariants, writes the new decision on the accepted figure, and changes the first-pass test to assert 289.
- `e6ac95cd` lists the new test in the mutation test selection of `stryker.config.json` (the gate had failed on it).
- `c62c48df`, the correction for your remarks: the three small wording points — the title of the first-pass test no longer repeats 289, the clause of the entry on the band ends after its reference without saying the game wrote none, and the example of the entry on the accepted figure no longer carries the other account's 290; `foundations/decisions.md` and `tests/sim/new-account-first-pass.test.mjs` only.
- `5b6ec9cb`, the merge of main (request #97, 29 commits: the failure watcher's sixth kind and the readings of the test server) into the branch: no conflict, none of the files of this change touched, and the numbers D-403 and D-404 stayed free.

## Checks

- The whole gate, `npm test`: first run on `d925d5ca`, exit 1 — in `tests/quality`, `test_ruff_source_rules` and `test_shellcheck_source_rules` with `FileNotFoundError`, because a new worktree has no `.runs/quality-venv` (installed as `README.md` gives, ruff 0.17.1 and ShellCheck 0.11.0; the failure is of the environment, not of the change), and `test_every_simulation_test_except_source_rules_is_listed`, the fault of the change (the new test missing from `stryker.config.json`); the check of the foundation did not run, since the gate stops at the first failing stage. Second run on `e6ac95cd`, the tree of this request: exit 0, build, Node tests, 562 Python tests in 4 directories, `0 errors` of the foundation check. The failures of the first run were not measured on the base: the two environment failures arise in any new worktree and the third arises only with the new file. No check of the final run failed or was left unrun except the real-browser look, which you let through.
- The whole gate again after your remarks: third run on `c62c48df`, the corrected tree, exit 0 (562 Python tests); fourth run on `5b6ec9cb`, the tree of this request, main merged in, exit 0 — build, Node tests, 584 Python tests in 4 directories, `0 errors` of the foundation check, no check failed or left unrun. The merge touched none of the code the cycle reviewed, so no review of the merge was dispatched; the gate on the merged tree stands in its place.
- Own-work checks. The author saw the new tests fail for the expected reason before they passed (the first-discovery test with the exploration set to 25 minutes: 6 failing tests; the refusal of a save with the check taken out: the crafted-document test failed) and ran the changed simulation and view test files, typecheck, ESLint and Prettier, all exit 0. The author's own check of the band's sentence reproduced the wrong case of item 5.
- The mutation analysis, run by the reviewer on the changed ranges of `game.ts`, `saved-game.ts` and `understanding.ts` (`actions.ts` and `skills.ts` gave no mutants, not explained): exit 0, 112 mutants, 92 killed, 20 survived, none a real gap (11 equivalent, 7 killed by view tests that the tool's test list does not run, 2 not worth a test).
- Crafted input at the trust boundary `src/browser/sim/saved-game.ts`: reviewed; a document with no „Eksploruj”, no action, „Eksploruj” named twice, the list of actions of a wrong type or missing, „Eksploruj” without „Zawsze”, or a key added beside the lists is refused whole as `shape`; the refusal only grew and no key is filled in.
- User interface: unchecked in a real browser, which you let through; jsdom tests cover the enabled „+ reguła” and the text of the band; no screenshot was taken, and none is shown.
- Form check of this description: `python -B .the-way/task-cycle/request_check.py docs/task-cycles/pierwsza-akcja-od-startu/request.md --task docs/task-cycles/pierwsza-akcja-od-startu/task.frozen.md`, FORM_RUNS. Check of private paths on this description: `python -B .the-way/task-cycle/private_paths_check.py docs/task-cycles/pierwsza-akcja-od-startu/request.md`, PRIV_RUNS.
- The copy of the record, `docs/task-cycles/pierwsza-akcja-od-startu/`, was cleaned by one rewriting and checked: COPY_RUNS
- The process remarks check: REMARKS_RUNS

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
- D-312, the cycle's: the band leaves the written-rule sentence out where the record of the map run holds a minute of exploring, which a rule of the player's own has been carried out to give; its reasoning names the two cases the record cannot tell apart. D-345, the cycle's: follows D-312.
- D-71 and D-313, the cycle's: the examples of the first chill corrected (the chill discovers „Wędruj” and „Temperatura poniżej”; the button adds „Zawsze → Wędruj”).
- Invariant tests altered: none in a way that weakens a check; `tests/invariants/test_player_map_run_pace.py` and `tests/invariants/test_minute_span_split.py` changed in wording only. No surface changed. No *Violated* mark set or cleared.
- A gap that stands in the foundation and was not touched (you let it through): the invariant `cross-part-imports` has a bare `TODO` in its *Rests on* since 8 November 2026.

## Minor findings

The three Minor findings of the review of the fix (the number 289 in the title of the first-pass test, the clause of the entry on the band, the example of the entry on the accepted figure) were fixed in the correction for your remarks and its review passed with no finding.

From the review of the whole change, within the task and not fixed (you let it through, with the screens not looked at in a real browser):

1. "**M3. The author's UI check was not performed (WAY-219; `task-cycle/change/ui_check.md`).** The change alters what two screens show (the button „+ reguła” enabled from the first second, „Eksploruj” in the editor from the start, the band of the first exploration with two trees). The author's report: "the manual check in a browser (optional, not made)"; jsdom tests cover the enabled state. I did not run the game either (no browser, no local HTTPS start; the handoff forbids heavy runs), so the real-browser appearance of the enabled button and of the band is unverified by anyone. Effect on the user is small (the change removes a disabled state and adds a name to a band; no new component or style), so Minor; the orchestrator may want the check before the request."

From the mutation analysis, behaviour not worth a test (no finding): "501 `?.` removed (`revealedBy.kind`): behaviour not worth fixing, reason given. It matters only for a held discovery that names „Eksploruj”, which has no `revealedBy` now; […] Only a saved game of version 6 made before the change and saved while paused at the first chill can hold one, and the code is right for it (the `?.` is there for it); no test loads such a state […] A regression test is optional; I do not ask for one." (`src/browser/sim/understanding.ts:501`)

## Findings outside the task's scope

- "**M4. Comment layout in `src/browser/sim/game.ts:690-700`.** The docstring of `advanceMinutes` was edited in place and one line now runs to about 150 characters ("each by `withFirstChillRule` on its own content, and no other program, and the pick that ends the minute is made from the copy and the Understanding as they"); prettier does not wrap comments and passes. Cosmetic; outside the task."
- "**M5. `tests/sim/new-account-first-pass.test.mjs` duplicates `FIRST_REAL_MS` of `tests/sim/first-map-balance.test.mjs`** (the author's choice C1: a constant of one line, no shared fixture). Outside the task; nothing to do now."

## Course of the cycle

- **Task and sources:** the task "Pierwsza akcja od startu" of the plan of the project MVP2 loop2 (item 10), accepted 2026-11-13; sources: the approved project definition (fingerprint e6c61098) and the plan. Task 9, the first map, is merged and in the base.
- **Process pin:** `55afa8e57aa1b83c77108576a36642722e0dda15`, not moved.
- **Spec:** none; the orchestrator found no open design choice (the questions Q1–Q7 and the three rows of settlements settle the entries).
- **Route:** one author without a plan, class `same` as the orchestrator's (Sonnet 5.5); it did the foundation entries with its code and returned `done with concerns`; it was resumed for the fix, the return step and the gate fix. After your remarks (comment https://github.com/mariusznazar/loop2/pull/98#issuecomment-6878308098) it was resumed for the correction, which ran on the branch as it stood, with no reset: base `5daa2b85`, correction `c62c48df`, reviewed `PASS`, then main was merged in (`5b6ec9cb`) and the gate run again.
- **Plan:** none.
- **Choices:** 7 choices beyond the task's binding answers (C1 to C7, the human's decision of the figure among them), in the questions table of the record. Your answers to the request's first four items: item 2 fixed in the correction; items 1, 3 and 4 let through, so the unchecked screens, the incomplete reading of the whole-change review (10 of 337 decisions read whole, the rest searched by the change's words) and the placeholder in `cross-part-imports` stand as they were.
- **Blocking findings left:** none. The one blocking finding of the whole-change review (an entry that promised more than the code does) was fixed in `d925d5ca` and its review passed.
- **Record:** https://github.com/mariusznazar/loop2/blob/RECORD_SHA/docs/task-cycles/pierwsza-akcja-od-startu/cycle.md
