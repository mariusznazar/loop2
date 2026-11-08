---
title: "loop2: próba skrócenia wytycznych kodu — to, co model zna, jedną nazwą, decyzje projektu zostają"
status: draft
created: 2026-11-08T14:15
updated: 2026-11-08
tags: [zadanie]
related: "the Loop project note"
---

## Po co to

- **Jak jest dziś:** Ogólny plik wytycznych kodu loop2, `guidelines/coding.md`, ma 361 linii. Agent cyklu czyta go w całości przed każdą zmianą kodu. Część zdań opisuje praktyki, które model zna z treningu pod ogólnie przyjętą nazwą. Część wylicza przypadki, które agent wyprowadziłby sam z celu reguły. Część wylicza, które pliki już spełniają regułę. Nikt nie sprawdził, czy bez nich agenci pisaliby kod tak samo.
- **Kto to odczuwa:** agent każdego etapu cyklu loop2, który ten plik czyta, i Mariusz, który chce wiedzieć, czy krótszy plik byłby przestrzegany równie dobrze. Wynik tej próby jest materiałem dla zadania w the way, które ma rozstrzygnąć, czy wytyczne wszystkich produktów skraca się tą metodą.
- **Co jeśli nic:** W loop2 nic się nie psuje, bo recenzja w cyklu łapie odstępstwa od wytycznych. Zadanie w the way zostaje bez dowodu i nie może zapaść jego decyzja.

# loop2: próba skrócenia wytycznych kodu — to, co model zna, jedną nazwą, decyzje projektu zostają

Status: ready for cycle
Project relation: independent

## Description

### Need

- `guidelines/coding.md` ma 361 linii (`wc -l`, loop2 `01b26d5`, 2026-11-08), a każdy agent cyklu loop2, który pisze, planuje albo recenzuje zmianę kodu, czyta go w całości (WAY-213).
- Według Mariusza część zdań pliku opisuje praktyki znane modelowi pod ogólnie przyjętą nazwą, część wylicza przypadki wynikające z celu reguły, a część wylicza, co już spełnia regułę; nikt nie sprawdził, czy bez nich agenci pisaliby kod tak samo.
- Zadanie the way `zadanie_proba_krotszych_wytycznych_produktu.md` (w `Notes/Projects/(P) Proces pracy nad produktem/_zadania/`) ma rozstrzygnąć, czy wytyczne produktów skraca się metodą czterech grup zdań, i czeka w swoim pytaniu 2 na wynik tej próby.

### To do

1. Na gałęzi próby, której się nie scala, cały `guidelines/coding.md` zostaje przerobiony według klasyfikacji jego zdań na pięć grup, którą dwóch agentów cyklu robi niezależnie, dzieląc zdanie mieszane na człony i ustalając z historii git pochodzenie każdego przypadku wyprowadzalnego (pytania 1, 3, 4 i 5):
   - znana praktyka — zdanie opisuje coś, co model zna pod ogólnie przyjętą nazwą, np. „Awarii nie zamieniaj ani w odpowiedź »wszystko w porządku«, ani w pustą listę” (`coding.md:190`), praktyka znana jako „fail loudly”; na gałęzi zastępuje je nazwa (pytanie 2);
   - decyzja projektu — zdanie niesie wybór, który zapadł w loop2 i którego żadna znana nazwa nie przekaże, np. „z błędu czytaj tylko jego nazwę i kod oraz numer `errcode` SQLite, nigdy `message` ani `stack`” (`coding.md:237-238`); zostaje;
   - przypadek wyprowadzalny z celu — reguła podaje cel, a potem wylicza przypadki, które z niego wynikają, np. „Wiersz spoza przebiegu sprawy […] nie niesie żadnego identyfikatora” (`coding.md:209-211`); zdejmuje się go tylko wtedy, gdy nie powstał dlatego, że agent go z celu nie wyprowadził;
   - spis stanu — zdanie wylicza, co już spełnia regułę, np. „`account-database-check`, `measure-passwords`, `deploy/loop2-backup` i `scripts/restore-trial.mjs` już ją mają” (`coding.md:175-177`); wychodzi z reguły;
   - powtórzenie decyzji albo konfiguracji — zdanie powtarza decyzję nazwaną w polu *Decision* reguły albo wartość z pliku konfiguracji, np. „Ruff 0.17.1 […]: 393 reguły z domyślnego zestawu 407 reguł bez preview blokują” (`coding.md:51-53`); wychodzi z reguły, a zostaje to, co autor kodu ma zrobić (pytanie 3).
2. Na każdą z 2–3 reguł, których zdania przeróbka zamienia na nazwę praktyki albo z których zdejmuje przypadki wyprowadzalne z celu, powstaje małe zadanie próbne, które ją wywołuje, i test, który rozstrzyga wynik bez czytania kodu; reguły wybiera cykl z wyniku klasyfikacji (pytania 4 i 6).
3. Agent robi każde zadanie próbne pięć razy ze starym `coding.md` i pięć razy ze skróconym, a request pokazuje liczbę przejść testu na każdym z plików (pytania 6 i 7).
4. Request jest zablokowanym szkicem i pokazuje liczby przejść testu na każdym z plików, tabelę klasyfikacji z zaznaczonymi zdaniami, przy których dwaj agenci się różnią, oraz zmienione znaczenia zdań własnych loop2 do zatwierdzenia (pytanie 4).
5. Request niesie na `main` loop2 tylko skrócenia zdań własnych loop2 z grup przypadku wyprowadzalnego z celu, spisu stanu i powtórzenia decyzji albo konfiguracji; zdania własne loop2 opisujące znaną praktykę zostają bez zmian (pytanie 2), a zdania przepisane z szablonu wytycznych kodu the way zostają w `coding.md` bez zmian. Mariusz scala go, znając liczby przejść, a przy wyniku gorszym na skróconym pliku nie scala albo scala tylko to, co nie zmienia znaczenia (pytanie 1).

### Questions to settle

- Pytanie 1: które części `guidelines/coding.md` obejmuje próba — także zdania sekcji o awariach i logach przepisane z szablonu the way, których skrócenie jest odstępstwem od szablonu i zmienia D-252?
  - Answer: pomiar biegnie na gałęzi z całym skróconym plikiem, także ze zdaniami przepisanymi z szablonu the way. Po dobrym wyniku do `main` loop2 wchodzą tylko skrócone zdania własne loop2; zdania przepisane z szablonu wytycznych kodu the way zostają w loop2 bez zmian i dochodzą do niego dopiero przez zmianę szablonu w the way i przesunięcie przypiętego `.the-way`, więc D-252 dalej „departs from none”.
  - Not chosen:
    - przeróbka scalona na `main` loop2 z odstępstwem w D-252 od szablonu, a kolejne cykle na nowym pliku — Mariusz: „nie podoba mi się odchodzenie od szablonu”;
    - cały skrócony plik wchodzi do loop2 razem z wynikiem — wymaga zmiany D-252 na odstępstwo od szablonu (WAY-173); powód Mariusza jak wyżej;
    - gałąź w całości do kosza, a scalone zadania loop2 powtarza się na obu plikach i porównuje ich kod — wynik zależy od oceny kodu, której Mariusz nie da („to jest tak abstrakcyjne i tak niedeterministyczne, że nie jestem w stanie tego sensownie ocenić”, zadanie the way, pytanie 3), a zdania spisu stanu, które nie zmieniają znaczenia, zostają w pliku bez powodu;
    - odstępstwo na `main` nazwane jako próba i kończące się decyzją zadania the way — loop2 zmienia się dwa razy (odstępstwo, potem powrót albo nowy szablon), a cykle na nowym pliku nie mają z czym się porównać;
    - najpierw zmiana szablonu the way, potem próba w loop2 po przesunięciu pinu — decyzje the way, z których korzysta każdy produkt, zmieniają się przed dowodem, a przy złym wyniku trzeba je cofać;
    - zdania z szablonu zostają słowo w słowo, klasyfikuje się tylko to, co loop2 dopisało — znane praktyki i przypadki wyprowadzalne z celu prawie nie mają sprawdzianu.
  - Source: Mariusz, 2026-11-08: „niby A, ale nie podoba mi się odchodzenie od szablonu, to chyba lepiej by było zmodyfikować szablon nie?”, potem „a nie da się tej próby zrobić na jakimś durnym przykładzie, który i tak poleci do kosza na branchach dedykowanych dla próby?”, potem „tak, gałąź do kosza z powtórzeniem scalonych zadań”; granica scalania: Mariusz, 2026-11-08: „ok zróbmy połączenie” — w doprecyzowaniu zadania the way (`Notes/Projects/(P) Proces pracy nad produktem/_zadania/zadanie_proba_krotszych_wytycznych_produktu.md`, pytanie 6), na zderzenie odpowiedzi „gałąź do kosza” z odpowiedzią tamtego pytania 6, że krótszy plik wchodzi do loop2 razem z wynikiem, przy połączeniu zaproponowanym w tym doprecyzowaniu.
- Pytanie 2: czy nazwa znanej praktyki zastępuje zdanie, czy stoi obok niego, skoro praktyka spoza produktu wiąże go tylko decyzją, która nazywa, co z niej przyjęto (WAY-100)?
  - Answer: nazwa zastępuje zdanie tylko na gałęzi próby. Na `main` loop2 zdania własne loop2, które opisują znaną praktykę, zostają bez zmian; ze zdań własnych loop2 wchodzą tam tylko skrócenia z grup przypadku wyprowadzalnego z celu, spisu stanu i powtórzenia decyzji albo konfiguracji, więc próba nie wnosi do loop2 nowej decyzji o praktyce spoza produktu. Słaby punkt przyjęty z tą drogą: na `main` kilka zdań zostaje dłuższych, niż mogłoby być.
  - Not chosen:
    - na `main` nazwa zastępuje zdanie razem z nową decyzją loop2, która mówi, co z praktyki przyjęto — nowa decyzja na kilka zdań, którą przy złym wyniku zadania the way trzeba wycofać;
    - na `main` nazwa stoi obok skróconego zdania — nazwa dalej przywołuje praktykę bez decyzji, która mówi, co z niej przyjęto (WAY-100), a plik prawie się nie skraca.
  - Source: Mariusz, 2026-11-08: „A” — na pytanie „A, B czy C?”, przy drodze A, której słabość nazwano: na `main` kilka zdań zostaje dłuższych, niż mogłoby być.
- Pytanie 3: co z treścią, która powtarza wartości z plików konfiguracji (wersje narzędzi, „393 reguły z domyślnego zestawu 407”) albo powtarza binding sentences decyzji D-29–D-33 — piąta grupa, rozszerzenie spisu stanu czy decyzja projektu?
  - Answer: piąta grupa, „powtórzenie decyzji albo konfiguracji”: zdanie, które powtarza decyzję nazwaną w polu *Decision* reguły albo wartość z pliku konfiguracji, wychodzi z reguły; zostaje to, co autor kodu ma zrobić, np. „Naprawiaj zgłoszenie w pliku, zamiast wyciszać blokującą regułę” (`coding.md:67`) i „nowy skrypt Bash dopisz do listy w `tests/quality/test_quality_invariants.py`” (`coding.md:61-62`). Zdjęcie takiego zdania nie zmienia znaczenia, bo niesie je decyzja (WAY-172). Słaby punkt przyjęty z tą drogą: agent, który chce znać wersję albo flagę, czyta decyzję albo konfigurację.
  - Not chosen:
    - zaliczyć takie zdania do spisu stanu — skutek w pliku ten sam, ale zadanie the way dostaje fałszywy obraz, że cztery grupy wystarczyły, a granica spisu stanu się rozmywa;
    - traktować je jak decyzję projektu, która zostaje — reguły lintera, formatera i audytu się nie skracają, a próba na `main` sprowadza się do kilku zdań spisu stanu.
  - Source: Mariusz, 2026-11-08: „A” — na pytanie „A, B czy C?”, przy drodze A, której słabość nazwano: agent, który chce znać wersję albo flagę, zagląda do decyzji albo konfiguracji.
- Pytanie 4: kto klasyfikuje zdania i kiedy — w doprecyzowaniu, tak aby ten dokument niósł zatwierdzone zmienione znaczenia (WAY-172), czy w cyklu, ze zmienionymi znaczeniami zatwierdzanymi na zablokowanym szkicu requestu?
  - Answer: w cyklu, jednorazowo na potrzeby tej próby: dwóch agentów cyklu klasyfikuje zdania niezależnie, a cykl wybiera z wyniku 2–3 reguły do próby kontrolnej. Request jest zablokowanym szkicem i pokazuje razem liczby przejść testu, tabelę klasyfikacji z zaznaczonymi zdaniami, przy których agenci się różnią, i zmienione znaczenia zdań własnych loop2; Mariusz rozstrzyga rozbieżności i zatwierdza zmienione znaczenia na nim (WAY-172). Czy metoda tak działa na stałe, rozstrzyga zadanie the way.
  - Not chosen:
    - klasyfikacja w doprecyzowaniu przez dwóch agentów, z tabelą w tym dokumencie — doprecyzowanie się wydłuża, dokument rośnie o tabelę rzędu 100 wierszy, a Mariusz decyduje o skróceniu, zanim zna liczby z pomiaru;
    - klasyfikacja w cyklu przez jednego agenta — o jeden przebieg taniej, ale nie widać, czy klasyfikacja jest powtarzalna, i zadanie the way zostaje bez tej odpowiedzi.
  - Source: Mariusz, 2026-11-08: „B ale to rozumiem jednorazowo tak?” — na pytanie „która droga, A, B czy C?”, potwierdzone odpowiedzią, że dwóch klasyfikatorów to wariant tej próby, a o metodzie na stałe rozstrzyga zadanie the way.
- Pytanie 5: jak klasyfikować zdanie, które zaczyna się praktyką, a kończy decyzją, i po czym poznać, że przypadek wyprowadzalny powstał, bo agent go z celu nie wyprowadził?
  - Answer: zdanie mieszane klasyfikator dzieli na człony i każdy zalicza do grupy osobno; np. w `coding.md:190-193` pierwsze zdanie („Awarii nie zamieniaj […]”) to znana praktyka, a drugie („Tryb zdegradowany […] zawsze zostawia wiersz w logach”) to decyzja projektu, która zostaje. Pochodzenie przypadku wyprowadzalnego klasyfikator ustala z historii: `git log -S "<fragment zdania>" -- guidelines/coding.md` daje commit, który dodał zdanie, a zapis cyklu tego zadania, dodany i usunięty z drzewa w historii loop2, mówi, czy przypadek dopisano po błędzie agenta. Przypadek, który zapis cyklu albo uwaga recenzji wiąże z błędem agenta, zostaje; przypadek o nieustalonym pochodzeniu na gałęzi się zdejmuje, a na `main` zostaje i w tabeli klasyfikacji ma oznaczenie „pochodzenie nieznane”. Słaby punkt przyjęty z tą drogą: tabela ma więcej wierszy niż plik zdań, każdy taki przypadek kosztuje kilka przeszukań historii, a skrócenie na `main` jest mniejsze.
  - Source: Mariusz, 2026-11-08: „tak, obie” — na pytanie „przyjmujesz obie propozycje?”, przy propozycjach, których koszt nazwano: więcej wierszy tabeli, przeszukania historii i mniejsze skrócenie na `main`.
- Pytanie 6: czym mierzy się próbę i gdzie biegnie pomiar?
  - Answer: próba kontrolna na 2–3 regułach, których zdania przeróbka zamienia na nazwę praktyki albo z których zdejmuje przypadki wyprowadzalne z celu. Na każdą regułę powstaje małe zadanie, które ją wywołuje, i test, który rozstrzyga wynik bez czytania kodu (np. baza nie odpowiada, więc odpowiedź jest błędem, a nie pustą listą, a wiersz awarii nie niesie `message`). Agent robi każde zadanie kilka razy ze starym plikiem i kilka razy z nowym; wynikiem jest liczba przejść testu na starym i na nowym pliku. Nie liczy się cykli loop2 po przeróbce. Próba kontrolna biegnie w tym zadaniu loop2: obejmuje ono klasyfikację, krótszy plik, 2–3 zadania próbne z testami i przebiegi agenta ze starym i nowym plikiem, a jego request pokazuje liczby przejść. Słabe punkty przyjęte z tą drogą: sprawdzone są tylko reguły, dla których napisano zadanie, i tylko dzisiejszy model; zadanie loop2 staje się eksperymentem, a jego cykl sam wymyśla, jak uruchamiać agenta wielokrotnie.
  - Not chosen:
    - ocena Mariusza przy scalaniu requestów loop2 po przeróbce — Mariusz, 2026-11-08: „to jest tak abstrakcyjne i tak niedeterministyczne, że nie jestem w stanie tego sensownie ocenić”;
    - dodatkowa recenzja każdego requestu loop2 ze starą wersją pliku — jedna sesja na request; zgłoszeń, których nie ma, nikt nie odsiewa, a bez punktu wyjścia liczba odstępstw nic nie mówi; reguły o awariach i logach rusza mało zmian, więc pięć requestów zbiera się tygodniami;
    - ta sama recenzja z rozstrzyganiem przez Mariusza i punktem wyjścia sprzed przeróbki — rozstrzyganie wymaga osądu kodu, którego Mariusz nie da (powód jak przy pierwszej drodze);
    - bez pomiaru, z decyzją obejmującą tylko spis stanu i wartości przepisane z konfiguracji — tanio, ale bez odpowiedzi, czy nazwa praktyki zastępuje zdanie;
    - krótszy plik wchodzi najpierw, próba kontrolna jako trzecie zadanie loop2 — krótszy plik działa we wszystkich cyklach loop2, zanim ktoś sprawdzi, że nie szkodzi, i dochodzi jeden dokument zadania więcej;
    - próbę kontrolną robi Mariusz poza cyklem, na krótszym pliku z gałęzi — zadania próbne i testy powstają bez recenzji cyklu, a czas Mariusza idzie na kilkanaście przebiegów.
  - Source: zadanie the way `Notes/Projects/(P) Proces pracy nad produktem/_zadania/zadanie_proba_krotszych_wytycznych_produktu.md`, pytania 3 i 6, 2026-11-08: Mariusz, „tak, próba kontrolna na 2–3 regułach” — na pytanie, czy wynik w postaci „test przeszedł 5 z 5 razy ze starym plikiem i 3 z 5 z nowym” byłby czymś, na czym da się oprzeć decyzję; Mariusz, „A” — na pytanie, gdzie biegnie próba kontrolna, przy drodze, której słabość nazwano: cykl sam wymyśla, jak uruchamiać agenta wielokrotnie.
- Pytanie 7: ile przebiegów agenta na każdy plik przypada na jedno zadanie próbne?
  - Answer: pięć ze starym `coding.md` i pięć ze skróconym, czyli 20–30 przebiegów przy 2–3 zadaniach próbnych.
  - Not chosen:
    - trzy na plik — wynik „3 z 3 wobec 2 z 3” nic nie rozstrzyga, bo jedna wpadka to szum;
    - dziesięć na plik — dwa razy drożej; opłaca się dopiero przy remisie na granicy przy pięciu.
  - Source: Mariusz, 2026-11-08: „tak” — na pytanie „przyjmujesz 5 przebiegów na plik i pominięcie zbiórki narzędzi i audytu?”.
- Pytanie 8: czy doprecyzowanie przechodzi kroki skilla `the-way-maintain-coding-guidelines` przewidziane dla odświeżenia wytycznych — zbiór startowy stałych kontroli z badaniem, próbne uruchomienie narzędzi i audyt rodzajów kodu?
  - Answer: nie. Zadanie nie zmienia żadnej stałej kontroli ani rodzaju kodu, tylko tekst `coding.md`, więc z tego skilla stosuje się tylko zatwierdzanie zmienionych znaczeń przez dokument zadania albo request (WAY-172) i pokazywanie wyborów przez ich skutek. Brak w skillu trybu „przepisz tekst wytycznych bez zmiany kontroli” jest znaleziskiem dla zadania the way.
  - Not chosen:
    - przejść kroki odświeżenia w całości — próba narzędzi i audyt całego kodu loop2 to godziny pracy, które nic nie dają tej próbie.
  - Source: Mariusz, 2026-11-08: „tak” — na to samo pytanie co pytanie 7.

## Context

- Zadanie wydzielono 2026-11-08 z zadania the way o krótszych wytycznych; Mariusz wybrał tam podział na próbę w loop2 i decyzję w the way (tamten dokument, pytanie 1).
- Zdania sekcji o awariach i logach (`coding.md:155-268`) to w większości tłumaczenie szablonu `.the-way/product-guidelines/coding/template.md:184-215`; szablon każe produktowi dać przy każdej regule tekst o tym, jak ją stosować: „each rule's bullet gives what the product's text says of how to apply it” (`template.md:182`).
- Zdania własne loop2 w tej sekcji — m.in. `writeFailure`, `ReasonedFailure`, procesy z `installLastResort`, pola wiersza w Node.js, numer `errcode` SQLite — nie stoją w szablonie.
- Przykładowe zdanie spisu stanu (`coding.md:175-177`) powtarza binding sentence D-253: „`account-database-check`, `measure-passwords`, `deploy/loop2-backup` and `scripts/restore-trial.mjs` already have a last-resort handling of their own”.
- Reguły lintera, formatera i audytu zależności (`coding.md:30-153`) w dużej części powtarzają D-29–D-33 razem z wersjami narzędzi i flagami, a przykłady reguł Ruffa (`coding.md:270-348`) uzasadniają czternaście reguł, które D-30 zostawia jako przykłady.
- Decyzje the way, które wiążą formę wytycznych loop2 przez przypięty `.the-way`: WAY-168 — reguła „names by identifier the decision of the product's log that carries its choice and says what to do and how”, a jej uzasadnienie stoi w decyzji; WAY-171 — wymagana forma pliku, a `## Where in code` „copies no value” z plików, które wskazuje; WAY-172 — „A new or changed meaning of a product's guidelines is a decision of the product's log, new or changed”, zatwierdzana w dokumencie zadania albo na zablokowanym szkicu requestu; WAY-173 — produkt odchodzi od reguły szablonu „only by a decision of its log that gives the reason”; WAY-100 — praktyka spoza produktu wiąże go „only through a decision that names what is adopted, where it applies, and why”.
- Pełny zapis sesji, w której powstało zadanie, wygasa ok. 2026-12-08: `a file in the user's agent settings directory`.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- D-28 — „Loop2 adopts the coding-guideline templates of its pinned the-way, while deferring automatic formatting of Python and Bash and separate exemplars for building, deployment, entry points, HTML and CSS; […]”.
- D-29 — „Every application, script and test TypeScript and JavaScript file of browser-view, simulation, account-server and build-tools passes local pinned ESLint 10.12.0 run with `--max-warnings 0` on `eslint.config.mjs`, […]. Changing the rule set takes a human-accepted change of this decision.”
- D-30 — „Every `.py` and `.pyi` file Ruff finds […] passes local pinned Ruff 0.17.1 run with `--config ruff.toml --ignore-noqa`, […]: the remaining 393 rules block and these fourteen rules remain examples. […]”
- D-31 — „Every standalone Bash script in the code parts, extensionless scripts included, passes local pinned ShellCheck 0.11.0 run on it by name with `--norc --shell=bash --extended-analysis=true` […]”.
- D-32 — „All application, script and test TypeScript and JavaScript […] and browser HTML and CSS pass `--check` of local pinned Prettier 3.9.10 run with `--no-config --no-editorconfig --ignore-path .gitignore` […]”.
- D-33 — „The dependency audit passes without a network request where `package-lock.json` equals its version at {fork-point}, and otherwise fails on each advisory of low, moderate, high or critical severity […]”.
- D-252 — „Loop2 adopts all six rules on failures and logs of the coding template of its pinned the-way and departs from none of them. A log line of its Node.js code is one JSON object on one line, written through `console` with no library and under fixed field names, while its Bash scripts keep their own text and a line in the browser's console is plain text. […]”
- D-253 — „Each process that touches the data of accounts — the server, `account-block` and `account-backup` — has one last-resort handler of its own, which writes the kind, the code and the place of what no code handled, because the runtime's default print could quote values. […]”

## Settlements to record

Candidates: 5 shown, 0 accepted — 2026-11-08

none

## Out of scope

- Skrócenie na `main` loop2 zdań przepisanych z szablonu wytycznych kodu the way, zmiana D-252 i zmiana szablonu (pytanie 1; zadanie the way, pytanie 5).
- Pozostałe pliki `guidelines/` loop2 i szablony wytycznych w `.the-way`.
