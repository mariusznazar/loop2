---
title: "loop2: drobne poprawki po PR-ach #92–#94 i narzędzia jakości w świeżym katalogu"
status: draft
created: 2026-11-14T11:55
updated: 2026-11-14
tags: [zadanie]
related: "the author's note of the project"
---

## Po co to

- **Jak jest dziś:** Trzy scalone zmiany gry z nocy 13→14.11 (PR-y #92, #93 i #94) zostawiły drobiazgi poza swoim zakresem: zaniżony koszt odrzuconego wariantu zapisu gry w jednej decyzji, domyślny przedmiot w warunku „Zapas poniżej” wybierany przez miejsce w danych gry, nieaktualny komentarz testu, słowo „loop” w komentarzach w znaczeniu, które słownik gry rezerwuje dla poprzedniej gry, i powód odrzucenia Firefoksa bez zapisanego faktu. Niezależnie od nich świeży katalog zadania nie ma dwóch narzędzi kontroli jakości (stylu Pythona i skryptów powłoki), więc pierwszy, ok. 40-minutowy przebieg testów cyklu kończy się dwoma błędami, które nie są błędami kodu.
- **Kto to odczuwa:** agent, który opiera decyzję na liczbie, komentarzu albo powodzie z dokumentów gry; prowadzący cyklu loop2 w świeżym katalogu; gracz tylko przy domyślnym przedmiocie, i to dopiero, gdy na początku danych gry stanie nowy przedmiot.
- **Co jeśli nic:** w grze dziś nic się nie psuje. Przy pierwszym nowym przedmiocie na początku danych padną testy edytora bez rozstrzygnięcia, czy to usterka; agent może „naprawić” działający kod według starego komentarza; każdy cykl w świeżym katalogu trafia na dwa fałszywe błędy kontroli jakości, a prowadzący, który uzna je za zastane, przepuści prawdziwy błąd stylu.

# loop2: drobne poprawki po PR-ach #92–#94 i narzędzia jakości w świeżym katalogu

Status: ready for cycle
Project relation: independent

## Description

### Need

- Pozycja 1 (z PR #92): decyzja D-207 („Kiedy gra zapisuje stan gry na serwerze?”) podaje jako koszt odrzuconego zapisu co 30 minut gry „16 saves of about 80 KB together”, czyli ok. 5 KB na zapis, a pomiar daje ok. 9,8 KB na zapis i ok. 157 KB razem (*Context*); kto przy kolejnej zmianie zapisu gry przeczyta D-207, weźmie 80 KB za prawdziwy koszt.
- Ta sama decyzja dwa razy nazywa 480 minut gry całym przejściem Lasu, choć 480 minut to najkrótsze przejście, które Las rozwiązuje, a przejście bywa dłuższe (*Context*).
- Pozycja 2 (z PR #93): gdy gracz zmienia warunek reguły na „Zapas poniżej”, edytor wpisuje pierwszy znany przedmiot w kolejności danych gry, dziś Patyk; o domyślnym przedmiocie decyduje miejsce w pliku danych, a nie decyzja o grze, i nowy przedmiot na początku danych zmieni to, co widzi gracz, oraz wywróci testy edytora.
- Pozycja 3 (z PR #94): komentarz na początku `tests/invariants/test_streak_program_change.py` cytuje starą, szerszą wersję niezmiennika `streak-program-change`, bez zastrzeżenia „in a map run that has not ended”; agent może wziąć go za regułę.
- Słownik gry mówi, że „loop” to poprzednia gra, a pętla zarobkowa to „earning loop”, a angielskie teksty repozytorium wciąż nazywają pętlę zarobkową samym „loop”.
- D-396 („In which browsers and from which window size does the game have to work?”) odrzuca Firefoksa w sposobie, w jaki agent gra w grę, m.in. dlatego, że „it did not install with WebKit”, bez wpisu o fakcie środowiska; zdanie jest przy tym nieścisłe: WebKit jest zainstalowany, tylko w starszym wydaniu, niż oczekuje Playwright (*Context*).
- Pozycja 4 (sprawa AIR-651 z ai-review): świeży katalog zadania nie ma środowiska `.runs/quality-venv` z Ruffem i ShellCheckiem, README każe je założyć osobnym krokiem, a reguły dla agentów o nim milczą, więc pierwszy pełny przebieg testów kończy się błędami `ruff` i `shellcheck`, które nie są błędami kodu.

### To do

1. D-207, *Rejected*: wariant zapisu co 30 minut gry zostaje odrzucony, a zdanie o jego koszcie podaje zamiast „16 saves of about 80 KB together” do 16 zapisów po około 9,8 KB, razem około 157 KB w półminucie Lasu przy 16×, mierzonych tak jak rozmiary zapisu w D-208 (pytania 1 i 2).
2. D-207, *Rationale*: zdanie „up to 480 at 16×, a whole map run of Las from the sending of the character” nie nazywa 480 minut gry całym przejściem Lasu — to najkrótsze przejście, które Las rozwiązuje, a przejście może trwać dłużej; granica 480 minut gry przy 16× zostaje (pytanie 3).
3. D-207, *Rejected*: w wariancie zapisu bez rytmu w trakcie ręcznego przejścia zdanie „up to 8 real minutes at 1× (the whole 480 game minutes of Las), up to half a real minute at 16×” nie podaje 480 minut gry jako całego przejścia Lasu ani 8 minut i pół minuty jako górnej granicy utraty, skoro przejście Lasu może trwać dłużej niż 480 minut gry (pytanie 3).
4. Nowy warunek „Zapas poniżej” startuje z Patykiem, zapisanym jawnie w danych gry jako jego domyślny przedmiot, a dopóki postać nie zna patyka, z pierwszym znanym przedmiotem w kolejności danych; przedmiot dopisany na początek danych nie zmienia domyślnego przedmiotu (pytania 4 i 5).
5. Komentarz na początku `tests/invariants/test_streak_program_change.py` cytuje bieżące brzmienie niezmiennika `streak-program-change`; logika testu się nie zmienia.
6. Angielski tekst plików śledzonych przez git, który mówi „loop” o pętli zarobkowej — komentarze, docstringi i nazwy przypadków testowych — mówi „earning loop”; nazwy w kodzie (plik `loop.ts`, `loopRunEnded` i podobne), „loop clock”, „loop2” i „loop” w innym znaczeniu zostają (pytanie 6).
7. `foundations/environment_facts.md` ma fakt o wydaniach Firefoksa i WebKitu dla Playwrighta zainstalowanych na tym komputerze wobec tych, których oczekuje Playwright CLI, ze źródłem w postaci odczytu na tym komputerze; D-396 w *Based on* go nazywa, a jej *Rejected* mówi zamiast „it did not install with WebKit”, że zainstalowane wydania są starsze, niż oczekuje Playwright CLI (pytanie 7).
8. Gdy w katalogu repozytorium brak gotowego środowiska `.runs/quality-venv`, test jakości zakłada je sam z `requirements-quality.txt` (`pip install --require-hashes`) przed pierwszą kontrolą, a gdy instalacja się nie uda, pada z jednym komunikatem, że środowiska nie udało się założyć, z poleceniem z README (pytania 8 i 9).
9. `AGENTS.md` mówi jednym zdaniem, że świeży katalog dostaje to środowisko przy pierwszym przebiegu testów i czego to wymaga.
10. README, sekcja „Narzędzia kontroli kodu”, mówi, kiedy środowisko powstaje samo; zdanie, że kontrole działają „bez pobierania narzędzi podczas sprawdzania”, przestaje temu przeczyć.
11. D-153, *Rationale*: zdanie „wiadomość potwierdzająca jest nierozstrzygnięta” zastępuje wynik testu Mariusza z 2026-11-14 (wiadomość potwierdzająca nowe konto dotarła do zewnętrznej skrzynki, odnośnik z niej potwierdził adres) jako uwaga z datą; gdy log gry z serwera (odczyt dozwolony przez skill `loop2-deploy`, sekcja „Account mail”, tylko linie, bez adresów i identyfikatorów kont) ma linie `link-issued` i `message-sent` z `linkPurpose` potwierdzenia adresu z tego dnia, wynik staje się faktem środowiska z poleceniem, wydrukiem i datą, a D-153 go nazywa w *Based on*.
12. Polecenia odczytu logu dla agenta w `.claude/skills/loop2-deploy/SKILL.md` (sekcje „How an agent reads it” i „Where the game's log lies”: `grep -F -m 50`, `grep -n -F -m 20`, `zgrep -F -m 50`, także w tabeli zrzutów i w kopii `.agents`) zwracają najnowsze trafienia, nie najstarsze — tą samą metodą, którą krok 8 odtwarzania w `references/backup_and_restore.md` dostał w loop2#148 (agent szukający awarii widzi dziś najpierw stare awarie) (loop2#148, *Fix or let through* 1; dopisane przez doradcę dnia 2026-11-17).

### Acceptance criteria

- Środowisko założone do połowy (przerwana instalacja) nie jest brane za gotowe: następny przebieg je naprawia albo kończy się komunikatem z pytania 9, a nie błędem `ruff` ani `shellcheck`.
- Gdy środowisko już stoi z przypiętymi wersjami, przebieg testów niczego nie pobiera.

### Questions to settle

- 1. Czy odrzucenie wariantu „zapis co 30 minut gry” w D-207 zostaje przy zmierzonej liczbie?
  - Answer: a — zostaje, zmienia się tylko liczba; zmierzony koszt jest wyższy, więc wzmacnia odrzucenie.
  - Not chosen:
    - b. Wariant wraca do rozważenia — pomiar nie daje powodu, wariant wypadł drożej, nie taniej.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „1 a, 2 a, 3 a”
- 2. W jakiej postaci liczba wchodzi do D-207?
  - Answer: a — „do 16 zapisów po około 9,8 KB, razem około 157 KB”, z odwołaniem do założeń pomiaru z D-208; liczba na zapis wiąże zdanie z D-208, a „po” zamyka drogę do odczytu 80 KB jako rozmiaru jednego zapisu.
  - Not chosen:
    - b. Tylko suma („16 zapisów, razem około 157 KB”) — krócej, ale błędny odczyt zostaje możliwy.
    - c. Suma z rozrzutem z przejściami zakończonymi śmiercią (87,5–158,7 KB) — wierniej, ale to szczegół, którego nikt przy tej decyzji nie użyje.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „1 a, 2 a, 3 a”
- 3. Czy zadanie poprawia też zdania D-207, które mówią, że 480 minut gry to całe przejście Lasu?
  - Answer: a — tak, w tym samym zadaniu, oba zdania, i opis zmiany nazywa to w zakresie.
  - Not chosen:
    - b. Osobne zadanie przez `/park` — czysty zakres, ale drugi pełny cykl dla dwóch zdań.
    - c. Zostawić — odczyt „pół minuty przy 16× to całe przejście” zostaje fałszywy dla przejść dłuższych niż 480 minut.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „1 a, 2 a, 3 a — oba nieścisłe zdania o 480 minutach poprawiasz w tym samym zadaniu i nazywasz to w zakresie”
- 4. Który przedmiot jest domyślny w nowym warunku „Zapas poniżej” i jak gra to zapisuje?
  - Answer: a — Patyk, zapisany jawnie w danych gry jako domyślny przedmiot tego warunku, obok jego domyślnej liczby 8 (D-376); dopóki postać nie zna patyka, edytor bierze pierwszy znany przedmiot w kolejności danych. Gracz nie widzi zmiany, a nowy przedmiot w danych niczego nie przestawia.
  - Not chosen:
    - b. Kolejność danych zostaje regułą — bez zmiany w grze, ale z wyjątkiem od reguły „Test inputs and expected values” w `guidelines/testing.md`.
    - c. Jagoda jako jawny domyślny przedmiot — koszt jak w a, ale gracz widzi zmianę, a przykłady w decyzjach mówią „Zapas poniżej 8 · Patyk”.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „4 a, 5 a, 6 c, 7 a, 8 a, 9 a”
- 5. Czy to samo rozstrzygnięcie obejmuje domyślne zasoby „Tu leży mniej niż”, „Idź” i „Zbierz”, dziś też pierwsze w kolejności danych?
  - Answer: a — nie, tylko „Zapas poniżej”; kolejność zasobów w obrębie mapy jest wyborem jej danych, a resztę ewentualnie zrobi osobne zadanie.
  - Not chosen:
    - b. Wszystkie cztery — spójnie, ale więcej kodu i testów edytora w tym samym cyklu.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „4 a, 5 a, 6 c, 7 a, 8 a, 9 a”
- 6. Które angielskie teksty przechodzą z „loop” na „earning loop”?
  - Answer: c — cały angielski tekst plików śledzonych przez git, który mówi „loop” o pętli zarobkowej: komentarze, docstringi i nazwy przypadków testowych, w `src/`, testach i skryptach; nazwy w kodzie (`loop.ts`, `loopRunEnded` i podobne) zostają; tak spełnia się reguła słownika (WAY-97).
  - Not chosen:
    - a. Tylko komentarze w `src/` — najmniej pracy, ale łamie regułę słownika i zostawia ok. 180 użyć w testach.
    - b. Komentarze w `src/` i w testach, bez nazw przypadków testowych — reguła słownika dalej niespełniona dla nazw.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „4 a, 5 a, 6 c, 7 a, 8 a, 9 a”
- 7. Co dzieje się z powodem odrzucenia Firefoksa w D-396?
  - Answer: a — cykl zapisuje fakt środowiska z odczytu na tym komputerze: jakie wydania Firefoksa i WebKitu dla Playwrighta są zainstalowane i jakich oczekuje Playwright CLI; D-396 w *Based on* powołuje się na ten fakt, a jej *Rejected* mówi zamiast „it did not install with WebKit”, że zainstalowane wydania są starsze, niż oczekuje Playwright CLI, więc Firefox wymagałby najpierw instalacji.
  - Not chosen:
    - b. Tylko poprawić zdanie i zostawić powód „the work grows” — taniej, ale ginie informacja.
    - c. Zostawić jak jest — nieścisłe zdanie zostaje w decyzji.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „4 a, 5 a, 6 c, 7 a, 8 a, 9 a”
- 8. Gdzie środowisko narzędzi jakości powstaje samo?
  - Answer: a — w samym teście jakości (`tests/quality/test_quality_invariants.py`), przed pierwszą kontrolą, więc działa i w pełnym `npm test`, i przy uruchomieniu samego tego pliku.
  - Not chosen:
    - b. Krok w `scripts/test.py` przed pełną bramką — nie działa, gdy ktoś puszcza sam plik testu jakości.
    - c. `postinstall` przy `npm ci` — `Dockerfile` też robi `npm ci`, więc budowa obrazu zakładałaby pythonowe środowisko.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „4 a, 5 a, 6 c, 7 a, 8 a, 9 a”
- 9. Co się dzieje, gdy środowiska nie da się założyć (brak sieci, brak Pythona 3.9+, brak pasującego pliku wheel)?
  - Answer: a — test pada z jednym wyraźnym komunikatem, że nie udało się założyć `.runs/quality-venv`, z poleceniem z README, zamiast błędu `ruff` czy `shellcheck`.
  - Not chosen:
    - b. Pominięcie kontroli — kontrola, która nie biegła, nie jest zaliczeniem, a test mówi „nothing is skipped”.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-14: „4 a, 5 a, 6 c, 7 a, 8 a, 9 a”

## Context

- Repozytorium: the author's main checkout of the repository; stan sprawdzony na `main` `e6a95a9b` (2026-11-14).
- Pozycja 11 — dopisana 2026-11-14 przez doradcę dnia po teście Mariusza (zastępuje zadanie `zadanie_test_dostarczenia_wiadomosci_potwierdzajacej_loop2`). Wynik, słowami Mariusza: „sprawdziłem i odebrałem teraz - odnośnik zadziałał”; godziny, nadawcy i tego, czy szedł przez rejestrację, czy ponowne wysłanie, Mariusz nie podał. Brak w D-153 opisuje rekord cyklu loop2#97 (`cf9dfde5`, `docs/task-cycles/serwer-odczyty-i-straznik/reports/slice-11-report.md`).
- Pozycja 1 — źródło uwagi: PR #92 (https://github.com/mariusznazar/loop2/pull/92), sekcja „Findings outside the task's scope” opisu; recenzent wskazał, że D-207 liczy się na rozmiarze zapisu z czasu, gdy D-208 podawała 6 150 B.
- Pozycja 1 — zapis cyklu PR #92: commit `2339df63`, katalog `docs/task-cycles/pomiary-z-przegladu-fundamentu/` (z `main` usunięty commitem `30d6c016`); liczby D-208 pochodzą z pomiaru z 13.11.2026 opisanego w loop2: pomiary pod decyzje z przeglądu fundamentu — pamięć testów (D-268), waga strony, rozmiar kroniki i zapisu, czas nadrabiania, warunek powrotu D-75, *Context*, wiersze „Zapis gry”.
- Pozycja 1 — pomiar z 2026-11-14 na `main` `6ab6a32b`, w osobnym worktree po `npm ci` i `npm run build`; kod `src/` i `tests/sim/` identyczny jak w `origin/main` `5159e8c4`. Skrypt i surowe wyniki leżały w scratchpadzie sesji; liczby niżej są ich jedynym trwałym zapisem.
- Pozycja 1 — założenia pomiaru, te same co w D-208 dla pojedynczego zapisu: bajty UTF-8 ciała `{version, basedOn, game}`, które wysyła `src/browser/account-api.ts:377`, z dokumentu `savedGame` po `withSaveTime`; gra znająca wszystko (`newKnowingGame` z `tests/sim/understanding-fixture.mjs`); siedziba z jedną postacią i jednym programem, ręczne przejście z kopią programu i jej podstawą; żadnej pętli zarobkowej i pusty raport nieobecności. Założenia D-208 o „jednym wspólnym programie, bez ręcznego przejścia” dotyczą liczenia pętli zarobkowych i tu nie mają zastosowania.
- Pozycja 1 — przebieg: Las, program 17 reguł `SURVIVING` z `tests/sim/loop.test.mjs`, tempo 16, 30 ziaren (wysłanie w kolejnych sekundach od `1 760 000 800 000` ms), zapis co 30 minut gry przez pierwsze 480 minut gry; przy śmierci jeden zapis po rozliczeniu śmierci i koniec.
- Pozycja 1 — wynik, pojedynczy zapis: od 9 669 do 9 949 B (425 zapisów), mediana w minucie 30 9 739 B, w minucie 480 9 871 B; kontrola zgodności z D-208: mediana w minucie 300 9 827 B wobec 9 838 B z pomiaru z 13.11.
- Pozycja 1 — wynik, półminuta: 17 z 30 postaci przeżyło 480 minut i wysłało 16 zapisów, razem od 156 195 do 158 668 B, mediana 157 230 B; 13 zginęło wcześniej i wysłało 12 albo 9 zapisów, razem ok. 117 KB albo 87,5 KB; żadna nie rozwiązała Lasu w tych 480 minutach.
- Pozycja 1 — Las rozwiązuje się passą 480 minut bez utraty zdrowia od zimna i głodu (`src/browser/sim/data/maps.ts:74`), a pomiar kroniki z 13.11 notował przejścia Lasu do minuty 1670 (mediana).
- Pozycja 2 — źródło: doradca dnia w imieniu Mariusza, 2026-11-14, w uwagach do PR #93 (https://github.com/mariusznazar/loop2/pull/93): „Which item the editor offers first is a game decision — do not change it in this request; the task gets recorded separately.”
- Pozycja 2 — kod na `e6a95a9b`: `offeredItems` (`src/browser/view/program-editor.ts:172`) zwraca znane przedmioty plecaka w kolejności `ITEMS` z `src/browser/sim/data/items.ts:31` (dziś stick, berry, moss, fiber); `newCondition` (`program-editor.ts:356`, przypadek `itemBelow` w linii 369) bierze `items[0]`, a `withConditionKind` (`program-editor.ts:418`) przekazuje mu tę listę.
- Pozycja 2 — ten sam wzór dla zasobów: `newCondition` dla „Tu leży mniej niż” bierze `resources[0]` (`program-editor.ts:366`), a `withActionKind` dla „Idź” i „Zbierz” też `resources[0]` (`program-editor.ts:450`); `offeredResources` (`program-editor.ts:183`) układa zasoby w kolejności list map, a poza przejściem w kolejności map z `Object.values(MAPS)`.
- Pozycja 2 — D-376 trzyma liczby, od których warunek startuje („„Zapas poniżej” and „Tu leży mniej niż” from 0 to 50 pieces, with 8 and 1”), w wierszu warunku w danych gry (D-18); o przedmiocie nie mówi.
- Pozycja 2 — testy, które padają przy nowym przedmiocie na początku danych (próba z wymyślonym przedmiotem w PR #93): `tests/view/rule-editor.test.mjs` (przypadek akceptacyjny „Zapas poniżej 8 · Patyk…”, linia 1063, i sprawdzenie w linii 197), przypadek w `tests/view/program-editor.test.mjs` wypisujący oferowane przedmioty (ok. linii 1208); `tests/sim/world.test.mjs:24` bierze patyk i jagodę po pozycji z listy zasobów mapy (`const [stick, berry] = forest.resources.map(...)`), a `:25` przedmiot do rozpalenia po właściwości.
- Pozycja 2 — reguła „Test inputs and expected values” w `guidelines/testing.md`: „Dane gry, których dotyczy test — mapę, przedmiot, stworzenie — wybieraj po identyfikatorze, nigdy po miejscu w danych gry, bo nowy wpis w danych nie może zmienić tego, czego test dotyczy.”
- Pozycja 2 — do doczytania: zapis cyklu w commicie `dfafc63b8e019970c5a6bdd943fa4141f3fcda90`, `docs/task-cycles/porzadki-przed-pierwsza-mapa/reports/review-whole-report.md`, sekcja „Out of scope — for the human”, punkt O1, oraz `reports/author-report.md`, sekcja „Criterion 2 trial” (dziesięć padających przypadków, każdy czytany osobno).
- Pozycja 3 — źródło: komentarz do PR #94 (https://github.com/mariusznazar/loop2/pull/94#issuecomment-6871475220, pozycja 3); trzy pozostałości to uwagi 4, 7 i 8 (Minor) przeglądu całości w `git show 9a39c936:docs/task-cycles/zmiany-decyzji-gry-z-przegladu/reports/review-whole-report.md`.
- Pozycja 3 — nagłówek testu (`tests/invariants/test_streak_program_change.py:1-3`): „A change of the program rules or rule groups of the copy a map run carries out, and every switch of the character to another program during the map run, to one holding the same rules included, sets the streak of that map run to zero, on every map.”; niezmiennik w `foundations/invariants.md:830`: „A change, in a map run that has not ended, of the program rules or rule groups of the copy it carries out, and every switch of the character to another program during that map run, to one holding the same rules included, sets the streak of that map run to zero, on every map.”
- Pozycja 3 — słownik (`foundations/glossary.md`): „The loop is the predecessor game, the game that loop2 starts from.” z *Not*: „a succession of map runs that one character makes on one map without the player starting each — earning loop”; hasło `loop clock` („The loop clock is the date, kept by the browser view apart from the game state, up to which the whole game minutes of the earning loops have been counted.”) jest osobnym terminem i zostaje.
- Pozycja 3 — reguła szablonu słownika the-way (`.the-way/elements/glossary/template.md`, „A changed meaning”, WAY-97): autor zmiany znaczenia przeszukuje angielski tekst każdego pliku śledzonego przez git i przepisuje każde użycie, którego znaczenie przesuwa nowa definicja.
- Pozycja 3 — przybliżona skala z grepa na `e6a95a9b` (z fałszywymi trafieniami, np. „loop2”): ok. 150 linii komentarzy z samym „loop” w `src/`, `tests/` i `scripts/` (ok. 40 w `src/`, reszta w testach, najwięcej `tests/sim/loop.test.mjs` 33, `src/browser/sim/loop.ts` 21, `tests/sim/catch-up.test.mjs` 16) i ok. 72 nazwy przypadków testowych (`test("…loop…")`).
- Pozycja 3 — D-396 *Rejected*: „Firefox added to the way an agent plays the game in a browser — the work grows, and it is not known whether the tool installs with Firefox on this computer (it did not install with WebKit)”; *Based on*: `none`; `foundations/environment_facts.md` nie ma wpisu o WebKicie ani wydaniach przeglądarek Playwrighta.
- Pozycja 3 — odczyt na tym komputerze, 2026-11-14: katalog `%LOCALAPPDATA%\ms-playwright` ma `firefox-1532` i `webkit-2311`, a Playwright CLI 0.1.22 (`@playwright/cli` zainstalowany globalnie) w `node_modules/playwright-core/browsers.json` oczekuje firefox `1553` i webkit `2368`. Przegląd całości PR „spokojniejszy-wygląd” (`git show 84515a4d:docs/task-cycles/spokojniejszy-wyglad/reports/whole-review-report.md:174`): „the installed WebKit build (2311) refuses the installed Playwright (needs 2368): "Unknown setting: PushAPIEnabled"”.
- Pozycja 4 — źródło: sprawa AIR-651 z ai-review (2026-11-14), przyjęta przez Mariusza w wariancie „poprawka po stronie loop2, nie w the-way”.
- Pozycja 4 — kontrole uruchamia `tests/quality/test_quality_invariants.py`: ścieżki narzędzi z `.runs/quality-venv` (`venv_tool`, linia 26), docstring klasy: „A tool that reports a break or cannot run exits other than 0, and the test fails with its output; nothing is skipped.”; `npm test` to `python -B scripts/test.py`, który w pełnej bramce buduje, puszcza testy Node, `.the-way/gate/run_tests.py` i `foundation_check.py`, a z jednym plikiem `test_*.py` uruchamia tylko ten plik.
- Pozycja 4 — README, sekcja „Narzędzia kontroli kodu” (`README.md:32-60`): polecenia instalacji dla Windows i Linuksa, Ruff 0.17.1 i ShellCheck 0.11.0, „Kontrole kodu uruchamia `npm test` przez `tests/quality/test_quality_invariants.py`, wprost z lokalnych kopii w `node_modules` i `.runs/quality-venv`, bez pobierania narzędzi podczas sprawdzania.” D-30 i D-31 mówią o „local pinned” Ruffie i ShellChecku; żadna decyzja nie mówi, skąd bierze się środowisko.
- Pozycja 4 — `Dockerfile:4` uruchamia `npm ci`, więc krok w `postinstall` biegłby też przy budowie obrazu.
- Pozycja 4 — ślady: PR #77 (zadanie „zbieranie-jako-widowisko”, 2026-11-11), zapis cyklu `docs/task-cycles/zbieranie-jako-widowisko/cycle.md:128-129` i `:172` w commicie `45a51b3ae5d04d1ad430c31f18c8408fc1240924`: pełne testy na stanie wyjściowym ok. 40 min, błędy `ruff` i `shellcheck` z braku `.runs/quality-venv`; PR #72 (2026-11-09): uwaga „ruff niezainstalowany lokalnie”.
- Pozycja 4 — odrzucone przy przyjęciu sprawy: zdanie w skillu cyklu the-way (`task-cycle/skill/SKILL.md:155-157`), żeby katalog zadania dostawał „every local tool its rules or README name” — skill już każe iść za regułami produktu, luka leży w regułach loop2, a takie zdanie agent zastosowałby za szeroko.
- Pełny zapis sesji pozycji 2 (wygasa ~2027-02-12, 3,2 MB): prywatny plik autora poza repozytorium; nie czytać surowego, tylko po prywatnym skrypcie autora do czytania zapisów sesji.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- D-207 — *Rejected*: „the same moments with a save every 30 game minutes while a map run passes instead of every 30 real seconds — the same as every 30 real seconds at 1×, but at 16× a request every less than 2 real seconds, 16 saves of about 80 KB together in the half minute of Las, while closing the tab takes at most 30 game minutes at every pace.” Zmiana: *To do* 1.
- D-207 — *Rationale*: „a closed tab takes at most the last 30 real seconds of a manual map run — 30 game minutes at 1×, up to 480 at 16×, a whole map run of Las from the sending of the character”; *Rejected*: „closing the tab in the middle of one takes it back to the sending of the character: up to 8 real minutes at 1× (the whole 480 game minutes of Las), up to half a real minute at 16×”. Zmiana: *To do* 2 i 3.
- D-208 — *Rationale* (bez zmian, źródło założeń pomiaru): „measured as the bytes in UTF-8 that the game sends to the server, in a game that already knew everything, so that no discovery was made in it, the headquarters with one character came to 3 202 bytes and a map run of Las at game minute 300 to a median of 9 838 bytes, of „Las — głębiej” to a median of 12 402, each with the copy of the program and its basis”.
- D-376 — „A condition that takes a number accepts it from a minimum to a maximum, both included, on a step counted from the minimum, … „Zapas poniżej” and „Tu leży mniej niż” from 0 to 50 pieces, with 8 and 1; …”; *Rationale*: „Each condition's numbers stand in its row of the game's data (D-18), so a new condition names its own”. Zmiana (pytanie 4 a): warunek „Zapas poniżej” startuje też z jawnym przedmiotem, Patykiem, a dopóki postać go nie zna, z pierwszym znanym przedmiotem w kolejności danych — w D-376 albo w decyzji, która z niej wynika; wybór miejsca należy do cyklu.
- D-396 — *Rejected*: „Firefox added to the way an agent plays the game in a browser — the work grows, and it is not known whether the tool installs with Firefox on this computer (it did not install with WebKit)”; *Based on*: `none`. Zmiana (pytanie 7 a): *Based on* nazywa fakt środowiska z *To do* 7, a *Rejected* mówi, że zainstalowane wydania Firefoksa i WebKitu są starsze, niż oczekuje Playwright CLI, więc Firefox wymagałby najpierw instalacji.
- D-30 — „Every `.py` and `.pyi` file Ruff finds in … passes local pinned Ruff 0.17.1 run with `--config ruff.toml --ignore-noqa` …”; D-31 — „Every standalone Bash script in the code parts … passes local pinned ShellCheck 0.11.0 …”. Bez zmian: zadanie zmienia tylko to, skąd środowisko się bierze.

## Settlements to record

Candidates: 10 shown, 6 accepted — 2026-11-14

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Odrzucenie zapisu co 30 minut gry zostaje, a D-207 podaje jego zmierzony koszt: do 16 zapisów po około 9,8 KB, razem około 157 KB w półminucie Lasu przy 16×, z założeniami pomiaru z D-208. | decision | pytania 1 i 2 w *Questions to settle* (wybór doradcy dnia w imieniu Mariusza) | czy ruszać samo odrzucenie i w jakiej postaci — sumy, liczby na zapis czy rozrzutu — wpisać liczbę |
| 2 | D-207 nie nazywa 480 minut gry całym przejściem Lasu: to najkrótsze przejście, które Las rozwiązuje, a przejście może trwać dłużej. | decision | pytanie 3 w *Questions to settle* (wybór doradcy dnia w imieniu Mariusza) | czy zostawić „a whole map run of Las” i „up to 8 real minutes at 1×” jako górną granicę utraty |
| 3 | Nowy warunek „Zapas poniżej” startuje z Patykiem, zapisanym jawnie w danych gry jako jego domyślny przedmiot; dopóki postać nie zna patyka, z pierwszym znanym przedmiotem w kolejności danych. | decision | pytanie 4 w *Questions to settle* (wybór doradcy dnia w imieniu Mariusza) | który przedmiot jest domyślny, czy kolejność danych zostaje regułą i co, gdy postać nie zna domyślnego przedmiotu |
| 4 | Zainstalowane na tym komputerze wydania Firefoksa i WebKitu dla Playwrighta są starsze, niż oczekuje Playwright CLI, którym agent gra w grę — z odczytu na tym komputerze. | environment fact | pytanie 7 w *Questions to settle* (wybór doradcy dnia w imieniu Mariusza) | czy w ogóle pisać fakt i z jakiego źródła, skoro dotąd stał tylko w *Rejected* D-396 |
| 5 | D-396 odrzuca Firefoksa w sposobie, w jaki agent gra w grę, bo praca rośnie, a zainstalowane wydanie Firefoksa jest starsze, niż oczekuje Playwright CLI, więc wymagałoby najpierw instalacji; *Based on* nazywa fakt z wiersza 4. | decision | pytanie 7 w *Questions to settle* (wybór doradcy dnia w imieniu Mariusza) | czy zostawić „it did not install with WebKit” i `Based on: none` |
| 6 | Brakujące środowisko narzędzi jakości `.runs/quality-venv` zakłada sam test jakości przed pierwszą kontrolą; gdy instalacja się nie uda, test pada z jednym komunikatem z poleceniem z README i nigdy nie pomija kontroli. | decision | pytania 8 i 9 w *Questions to settle* (wybór doradcy dnia w imieniu Mariusza) | gdzie zakładać środowisko (test, krok bramki, `postinstall`) i czy bez sieci pominąć kontrole |

## Out of scope

- D-208, D-04, D-147, D-247 i D-268 — ich liczby wprowadził scalony PR #92.
- Zmiana chwil zapisu w grze — pozycja 1 poprawia tylko zdania decyzji, kod zapisu zostaje.
- Domyślny zasób w „Tu leży mniej niż”, „Idź” i „Zbierz” — zostaje pierwszy w kolejności list map (pytanie 5).
- Nazwy w kodzie z „loop” (plik `loop.ts`, `loopRunEnded` i podobne) — to kontrakt, nie tekst.
- Logika testu passy poza komentarzem w nagłówku; niezmiennik `cross-part-imports` (jego brak jest w uwagach przeglądu fundamentu) i zawartość PR #94.
- Skill cyklu the-way, przypięte wersje narzędzi i `requirements-quality.txt`.
