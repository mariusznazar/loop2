---
title: "loop2: automatyczne formatowanie plików Python i Bash, dziś odłożone w wytycznych kodowania"
status: draft
created: 2026-11-16T09:22
updated: 2026-11-19
tags: [zadanie]
related: "the project note in the author's backlog"
---

# loop2: automatyczne formatowanie plików Python i Bash, dziś odłożone w wytycznych kodowania

Status: ready for cycle
Project relation: independent
Defect introduced by: none

## Description

### Need

- Kod Pythona i Basha loop2 nie ma automatycznego formatowania: wszystkie 109 plików `.py` i wszystkie 3 skrypty Bash w `deploy/` mają inny układ, niż ustawiłby formater, a układ każdego pliku zależy od agenta, który go pisał.
- Wytyczne kodowania mówią wprost, że formatowanie Pythona i Basha jest odłożone (D-28); TypeScript i JavaScript formatuje Prettier i pilnuje tego test (D-32).
- Odczuwają to agenci piszący skrypty i testy w Pythonie i Bashu: przegląd nie ma wzorca układu, do którego porównałby plik, a zaległość rośnie z każdym nowym plikiem.
- Skill `loop2-balance` podaje dwie różne wartości czasu, który budowanie gry dokłada do każdego wywołania instrumentu balansu: „a few seconds” w akapicie pod poleceniem npm i „about a second” w sekcji `## Timing`.

### To do

1. Ustawić w `ruff.toml` formater ruffa 0.17.1 dla Pythona: szerokość linii 100, reszta ustawień formatera domyślna, pliki Markdown wyłączone z formatowania, tak by formater czytał tylko pliki `.py` (i `.pyi`), które linter D-30 czyta z `ruff.toml`.
2. Dopisać shfmt do pliku narzędzi jakości: `shfmt-py==4.2.0` w `requirements-quality.in` i w `requirements-quality.txt` z sumami kontrolnymi wszystkich pięciu wydanych kół, jak każe tamtejsze zdanie „Include every published wheel; no source builds or runtime dependencies are required.”, tak by test jakości stawiał go w `.runs/quality-venv` razem z ruffem i ShellCheckiem (D-424).
3. Przeformatować raz cały kod: każdy plik `.py`, który czyta ruff z `ruff.toml`, i trzy skrypty z listy `BASH_SCRIPTS` w `tests/quality/test_quality_invariants.py` (shfmt z ustawieniami `-i 2 -bn -ci -ln bash`) — w jednym osobnym commicie bez żadnej innej zmiany (WAY-205), a hash tego commita zapisać w nowym pliku `.git-blame-ignore-revs` w katalogu głównym repozytorium.
4. Dodać niezmiennik formatu Pythona — każdy plik `.py`, który ruff czyta z `ruff.toml`, stoi tak, jak zostawia go `ruff format` 0.17.1 z tymi ustawieniami, i nie ma w nim komentarza `fmt: off`, `fmt: on`, `fmt: skip`, `yapf: disable` ani `yapf: enable` — i niezmiennik formatu Basha — każdy skrypt z listy testu ShellChecka stoi tak, jak zostawia go shfmt 3.14.1 z `-i 2 -bn -ci -ln bash` — z testami w `tests/quality/test_quality_invariants.py` obok `test_prettier_source_format`, każdy widziany raz jako porażka (WAY-08); komunikat porażki podaje polecenie, które formatuje pliki.
5. W `guidelines/coding.md` sekcja `### Formatter` dostaje nowe decyzje i niezmienniki z dobrym i złym przykładem w Pythonie i w Bashu, jak daje reguła *Formatter* szablonu wytycznych kodu (`.the-way/product-guidelines/coding/template.md`), a zdanie „Automatyczne formatowanie Python i Bash pozostaje odłożone.” w sekcji „Odłożone rodzaje i formatowanie” znika; `### Where in code` wymienia `.git-blame-ignore-revs`.
6. Zdania o środowisku `.runs/quality-venv` „of Ruff and ShellCheck” mówią też o shfmt: w `AGENTS.md` (akapit, który zaczyna się od „Every test of this repository runs with `npm test`”, przez `maintain-instruction-files`) i w `README.md` (zdanie „once the environment of Ruff and ShellCheck described below stands”, akapit „Ruff and ShellCheck need Python 3.9 or newer” i akapit sprawdzania wersji „Ruff must report `ruff 0.17.1`”, który dostaje wersję shfmt); zdanie `README.md` „Python and Bash are not formatted automatically.” znika, a `README.md` mówi, jak sformatować pliki i jak `git blame` lokalnie pomija commit z `.git-blame-ignore-revs`; komentarze `# decision: D-424 "…"`, które cytują zmieniane zdanie D-424 w `tests/quality/test_quality_environment.py` i `tests/quality/test_quality_invariants.py`, cytują je w nowym brzmieniu.
7. Przez `update-part-map` dać plik `.git-blame-ignore-revs` części `build-tools`, która trzyma `.gitattributes` i `.gitignore`.
8. W skillu `loop2-balance` zostawić jedną wartość czasu budowania gry przy każdym wywołaniu, „about two seconds”, w obu miejscach: akapit pod blokiem `npm run --silent balance -- <command> [flags]`, który zaczyna się od „The npm script builds the whole game first”, i sekcja `## Timing`, zdanie „Each call also builds the game, so a short measurement costs about a second more.”; w obu kopiach skilla, `.claude/skills/loop2-balance/SKILL.md` i `.agents/skills/loop2-balance/SKILL.md`, które dziś są identyczne.

### Questions to settle

- Jaką wartość czasu budowania gry podaje skill `loop2-balance`?
  - Answer: „about two seconds” w obu miejscach i w obu kopiach skilla; zmierzone 2026-11-19 (*Context*).
  - Source: doradca dnia w imieniu Mariusza, 2026-11-19, „Drobiazg loop2-balance („about two seconds” w obu miejscach i obu kopiach) — w porządku.”
- Czy kod Pythona loop2 dostaje automatyczne formatowanie, i na jakich ustawieniach?
  - Answer: tak — w całości tak jak the way 2026-11-19: formater ruffa (`ruff format`) w wersji 0.17.1, którą `ruff.toml` już przypina, szerokość linii 100, reszta ustawień domyślnych, tylko pliki `.py` (bez przykładów Pythona w plikach Markdown), komentarze `fmt: off`, `fmt: on` i `fmt: skip` zakazane; powód: „ten sam układ w obu produktach, agenci piszą w obu”.
  - Not chosen:
    - szerokość 88, domyślna ruffa — przybywa netto 7 275 linii zamiast 4 641, a oba produkty mają inny układ;
    - szerokość 120 — najmniej zmian (netto +2 349), ale układ inny niż w the way;
    - zostawić formatowanie Pythona odłożone (D-28) — układ dalej zależy od agenta.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-19, „1 tak”; liczby z próby `ruff format` 0.17.1 przy `23b521a2` (*Context*)
- Jakie wcięcie mają skrypty Bash po formatowaniu?
  - Answer: dwie spacje, jak dziś.
  - Not chosen:
    - tabulatory, domyślne ustawienie shfmt — 1 634 zmienione linie diffu w trzech skryptach zamiast 176.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-19, „Bash: wcięcie dwóch spacji jak dziś”
- Czym formatować skrypty Bash?
  - Answer: shfmt z paczki PyPI `shfmt-py` 4.2.0 (shfmt 3.14.1), dopisany do tego samego pliku narzędzi co ruff i ShellCheck (`requirements-quality.in` i `requirements-quality.txt`), sprawdzający te same skrypty, które test ShellChecka wymienia z nazwy (a); „ryzyko jednego opiekuna akceptowalne przy przypiętej wersji”.
  - Not chosen:
    - wtyczka shfmt do Prettiera z npm (b) — starszy silnik shfmt, a wzorce plików Prettiera musiałyby objąć skrypty bez rozszerzenia, choć dziś test tych wzorców pilnuje tylko TS i JS;
    - beautysh (c) — nie rozumie składni Basha (autor podaje ok. 99% skryptów bez błędu) i dokłada trzy pakiety zależności;
    - nic, formatowanie Basha zostaje odłożone (d) — układ trzech skryptów dalej zależy od autora, a reguła dla Pythona i Basha się rozjeżdża.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-19, „4 a”; raport `.runs/coding/bash-formatter.md` po krytyce
- Jakie ustawienia shfmt poza wcięciem dwóch spacji?
  - Answer: (a) wcięcie dwóch spacji, `&&` i `||` na początku przeniesionej linii, wcięte gałęzie `case` i jawnie Bash jako język (`-i 2 -bn -ci -ln bash`); jawne ustawienia wyłączają czytanie `.editorconfig`, więc wynik nie zależy od komputera; zmienia się 122 linie diffu.
  - Not chosen:
    - samo wcięcie dwóch spacji, reszta domyślna (b) — operatory wędrują na koniec linii, gałęzie `case` się spłaszczają, 176 zmienionych linii, układ odchodzi od dzisiejszego zwyczaju skryptów.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-19, „5 a — ustawienia zgodne z dzisiejszym zwyczajem skryptów (operatory na początku linii, wcięte case, jawny Bash, bez .editorconfig)”
- Czy zakaz komentarzy wyłączających formater Pythona obejmuje też `# yapf: disable` i `# yapf: enable`?
  - Answer: tak (a) — ruff traktuje je tak samo jak `fmt: off` / `fmt: on`, więc bez tego zakaz dałoby się obejść drugą nazwą tego samego wyłącznika.
  - Not chosen:
    - zakaz tylko `fmt: off` / `fmt: on` / `fmt: skip`, jak w the way (b) — obejście przez `yapf:` łapie tylko przegląd zmiany.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-19, „6 a”
- Czy to zadanie przechodzi pełną procedurę rozszerzenia wytycznych kodowania the way — próbę całego zestawu lintera i audyt wszystkich 11 rodzajów kodu?
  - Answer: nie (a) — doprecyzowanie ustala tylko sprawy formatera; audyt rodzajów kodu i ponowna próba zestawu lintera nie mają związku z formatowaniem, a linter i rodzaje kodu działają i to zadanie ich nie zmienia.
  - Not chosen:
    - pełna procedura (b) — kilka dodatkowych agentów i godzina lub dwie pracy, z wynikiem prawdopodobnie bez związku z formatowaniem, a dokument zadania urasta o listę spraw z audytu.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-19, „2 a — tylko sprawy formatera; odstępstwo od litery procedury zapisz jako decyzję doradcy w imieniu Mariusza”
- Czy commit samego przeformatowania trafia do pliku `.git-blame-ignore-revs`?
  - Answer: tak (a), jak w the way — przeformatowanie idzie osobnym commitem bez żadnej innej zmiany, a jego hash trafia do nowego pliku `.git-blame-ignore-revs` w katalogu głównym repozytorium.
  - Not chosen:
    - nie (b) — `git blame` przy niemal każdej linii Pythona wskazuje commit formatowania, a prawdziwego autora szuka się ręcznie przed tym commitem.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-19, „3 a — jak w the way”

## Context

- Pomiary 2026-11-19 przy commicie `23b521a2`, na kopii plików poza repozytorium; repozytorium zostało nietknięte.
- Python, `ruff format` 0.17.1 (wersja, którą przypina `ruff.toml`), 109 plików `.py`: każdy plik zmieniłby się przy każdej szerokości linii; przy szerokości 88 (domyślnej) +11 777 / −4 502 linii (netto +7 275), przy 100 +8 356 / −3 715 (netto +4 641), przy 120 +5 993 / −3 644 (netto +2 349).
- Dziś 635 z 27 676 linii Pythona ma ponad 100 znaków, a 316 ponad 120 — to głównie długie komentarze `# decision: D-… "…"` z cytatem decyzji, których formater nie łamie.
- Formater przy każdej szerokości rozkłada wywołania, których argumenty dziś stoją wyrównane pod nawiasem, na jeden argument w linii; stąd przyrost linii, a nie z samej szerokości (ten sam wniosek co w zadaniu the way).
- Cudzysłowy niczego nie zmieniają: kod loop2 już używa podwójnych (przy zachowaniu cudzysłowów diff mniejszy o 28 linii).
- `ruff format` 0.17.1 formatuje domyślnie także bloki kodu Pythona w plikach Markdown (sprawdzone na pliku próbnym poza repozytorium), więc reguła „tylko pliki `.py`” wymaga ustawienia; dziś `ruff format --check` na 83 plikach Markdown repozytorium nie znajduje niczego do zmiany.
- `ruff format` 0.17.1 traktuje komentarze `# yapf: disable` / `# yapf: enable` tak jak `fmt: off` / `fmt: on` (sprawdzone na pliku próbnym); dziś w plikach `.py` loop2 nie stoi żaden komentarz `fmt:` ani `yapf:`.
- Szerokość linii ruffa czyta też reguła lintera SIM401 z zestawu D-30 (milknie, gdy jej podpowiedź nie mieści się w szerokości); `ruff check` z `ruff.toml` daje dziś zero zgłoszeń zarówno przy 88, jak i przy 100.
- Wersja docelowa Pythona nie zmienia wyniku: diff `ruff format` przy szerokości 100 jest identyczny z `--target-version py39` i bez niego.
- Żadna reguła ruffa nie zabrania komentarzy `fmt:`; RUF028 z zestawu D-30 zgłasza tylko taki komentarz, który nie działa (raport badania niżej), więc zakaz trzyma test.
- `ruff format --check` kończy się kodem 0, gdy nie ma czego zmienić, 1, gdy plik zmieniłby się, i 2 przy błędzie ustawień; nie zna `--ignore-noqa` (raport badania niżej).
- Reguła rozmiaru D-425 obejmuje tylko pliki, które sprawdza ESLint, więc przyrost linii Pythona nie przesuwa żadnego progu.
- Ani fundament, ani wytyczne, ani skille nie wskazują miejsc w plikach `.py` ani w skryptach `deploy/` numerem linii.
- Bash, shfmt 3.14.1 z paczki PyPI `shfmt-py` 4.2.0 (pięć kół: Windows x86_64, Linux x86_64 i aarch64, macOS x86_64 i arm64, bez zależności — pokrywa każdą platformę, dla której `shellcheck-py` 0.11.0.1 ma koło): ustawienia domyślne wcinają tabulatorami i zmieniają 1 634 linii diffu w trzech skryptach; z wcięciem dwóch spacji (`-i 2`, jak dziś) 176; z `-i 2 -ci -bn` 122.
- Zmiany shfmt przy wcięciu dwóch spacji to głównie spacje w wyrażeniach arytmetycznych (`(( $# != 0 ))` → `(($# != 0))`) i miejsce `&&` przy łamaniu linii.
- Końce linii: skrypty `deploy/**` mają LF z `.gitattributes` („deploy/** text eol=lf”); pliki `.py` nie mają reguły końców linii, a domyślne `line-ending = "auto"` ruffa przepuszcza 9 plików `.py`, które w kopii roboczej na Windowsie stoją z CRLF (w indeksie LF).
- Wyniki próby: `.runs/coding/trial-ruff-format-88.diff`, `-100.diff`, `-120.diff`, `trial-shfmt-i2.diff`, `trial-shfmt-i2-bn-ci.diff` (ustawienia przyjęte); raporty badania po krytyce: `python-formatter.md` i `bash-formatter.md` w tym samym katalogu; przegląd decyzji zostawionych wykonawcy: `.runs/decisions-list/zadanie_loop2_formatowanie_python_i_bash.md`.
- Czas budowania gry zmierzony 2026-11-19 na kopii repozytorium: `node scripts/build.mjs` 3,3 s przy pierwszym uruchomieniu, potem 2,0 / 1,96 / 1,94 s.
- Formatowanie loop2 idzie razem z formatowaniem the way (the author's note of the task of the-way on code order, formatting, linter and size): Mariusz 2026-11-16 w rozmowie z doradcą dnia („3 b”), a the way przyjęło 2026-11-19 `ruff format` z szerokością 100 i resztą ustawień domyślnych, tylko pliki `.py`, zakaz komentarzy `fmt: off`/`fmt: on`/`fmt: skip` i przeformatowanie osobnym commitem w `.git-blame-ignore-revs`.
- Notatka zadania: cyklu nie zaczynać, gdy w loop2 są otwarte inne gałęzie zadań — przeformatowanie koliduje z każdą z nich. 2026-11-19 trwa cykl `task/dwie-komendy-wlasciciela`.
- Pozycja 8 *To do* to drobiazg z inboxu, dopisany do tego zadania przez doradcę dnia 2026-11-19 zamiast osobnego cyklu.

## Questions carried to cycle

- Szerokość linii ruffa czyta też reguła SIM401 lintera (D-30); dziś przy 88 i przy 100 `ruff check` nie zgłasza niczego — cykl sprawdza to jeszcze raz po przeformatowaniu i wybiera, czy szerokość 100 obejmuje też linter.
- Jak test zakazu komentarzy znajduje pliki `.py` — tak samo jak ruff z `ruff.toml`, z tymi samymi wyłączeniami.
- Polecenie, którym autor zmiany formatuje pliki (bezpośrednie wywołanie narzędzi albo skrypt npm), i co dokładnie podaje komunikat porażki.

## Human actions

none

## Decisions in play

- **D-28** — zadanie ją zmienia: formatowanie Pythona i Basha przestaje być odłożone (odpowiedzi na pytania o formatowanie Pythona i o formater Basha). Dziś: „Loop2 adopts the coding-guideline templates of its pinned the-way, while deferring automatic formatting of Python and Bash and separate exemplars for building, deployment, entry points, HTML and CSS”. Jej *Verification* dziś liczy jako naruszenie „automatic Python formatting […] introduced without a new decision”, *Rationale* mówi „additional formatters add work without an established benefit”, a *Rejected* odrzuca „automatic formatting for every language”; zmiana obejmuje te miejsca, a odłożone wzorce budowania, wdrożenia, punktów uruchomienia, HTML i CSS zostają.
- **D-30** — formater czyta ten sam `ruff.toml`, którego zestaw reguł D-30 opisuje i którego zmiana zestawu wymaga zmiany D-30: „Every `.py` and `.pyi` file Ruff finds in browser-view, simulation, account-server, build-tools, deployment, agent-workflow and test-helpers passes local pinned Ruff 0.17.1 run with `--config ruff.toml --ignore-noqa`, where `ruff.toml` requires that version, turns preview off, excludes the submodule and temporary work results and selects the complete default nonpreview set minus […]: the remaining 393 rules block and these fourteen rules remain examples. The explicit configuration file holds for every file whatever other Ruff configuration stands in the repository, and no suppression comment takes effect.”
- **D-31** — skrypty Bash, które czyta ShellCheck, wymienia z nazwy test: „Every standalone Bash script in the code parts, extensionless scripts included, passes local pinned ShellCheck 0.11.0 run on it by name with `--norc --shell=bash --extended-analysis=true` […] review keeps a new script from going unnamed and a `# shellcheck` directive that disables a check or changes the set out of the scripts.”
- **D-32** — wzór reguły formatera dla kodu webowego; jej *Rejected* odrzuca dziś „Python and Bash formatting now — adds tools and unmeasured rewrites beyond the accepted scope”, a to zadanie mierzy te przeróbki i wprowadza formatowanie. Zdanie wiążące się nie zmienia: „All application, script and test TypeScript and JavaScript in browser-view, simulation, account-server, build-tools, balance-tools and deployment and browser HTML and CSS pass `--check` of local pinned Prettier 3.9.10 run with `--no-config --no-editorconfig --ignore-path .gitignore` […] review keeps `prettier-ignore` comments out of covered code.”
- **D-424** — zadanie ją zmienia: środowisko `.runs/quality-venv` obejmuje też shfmt (odpowiedź na pytanie „Czym formatować skrypty Bash?”). Dziś: „the test of the quality checks makes the environment `.runs/quality-venv` of Ruff and ShellCheck whenever it is absent, half made or not at the versions `requirements-quality.txt` pins, by installing that file with `pip install --require-hashes`”.
- **WAY-205** (przypięte the way) — „A formatter enters a product by one reformatting of the whole of its code in the task that brings the formatter.” Jej *Verification*: „the task that brings a formatter reformats every file of the product once, and the formatter's invariant holds from that commit”.

## Settlements to record

Candidates: 8 shown, 6 accepted — 2026-11-19

| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Każdy plik `.py` i `.pyi`, który ruff czyta z `ruff.toml`, stoi tak, jak zostawia go `ruff format` 0.17.1 z szerokością linii 100 i resztą ustawień domyślnych, a pliki Markdown formater pomija. | decision | pytanie „Czy kod Pythona loop2 dostaje automatyczne formatowanie, i na jakich ustawieniach?” | szerokość linii (domyślne 88 daje inny układ niż the way) i czy formater rusza bloki Pythona w Markdown, co ruff robi domyślnie |
| 2 | W plikach `.py`, które obejmuje formater, nie stoi komentarz `fmt: off`, `fmt: on`, `fmt: skip`, `yapf: disable` ani `yapf: enable`, a test formatera na nim pada. | decision | pytania o ustawienia Pythona („zakaz fmt: off/on/skip”) i „Czy zakaz komentarzy wyłączających formater Pythona obejmuje też `# yapf: disable` i `# yapf: enable`?” | test, który przepuszcza plik z takim komentarzem, bo `ruff format --check` go respektuje |
| 3 | Skrypty Bash, które test ShellChecka wymienia z nazwy, stoją tak, jak zostawia je shfmt 3.14.1 z paczki `shfmt-py` 4.2.0 z ustawieniami `-i 2 -bn -ci -ln bash`. | decision | pytania „Czym formatować skrypty Bash?”, „Jakie wcięcie mają skrypty Bash po formatowaniu?” i „Jakie ustawienia shfmt poza wcięciem dwóch spacji?” | narzędzie, sposób jego instalacji i ustawienia (domyślne tabulatory przestawiłyby całe skrypty) |
| 4 | Loop2 nie odkłada już automatycznego formatowania Pythona i Basha. | sentence of D-28 | pytania o formatowanie Pythona i „Czym formatować skrypty Bash?” (droga „zostaje odłożone” odrzucona) | czy zostawić w D-28 zdanie o odłożeniu obok nowych decyzji, czy je zmienić |
| 5 | Środowisko `.runs/quality-venv`, które stawia test jakości, obejmuje ruff, ShellCheck i shfmt. | sentence of D-424 | pytanie „Czym formatować skrypty Bash?” („w tym samym pliku narzędzi co ruff i ShellCheck”) | czy shfmt instalować przez to samo środowisko i czy test sprawdza jego wersję tak jak ruffa i ShellChecka |
| 6 | Commit, który tylko przeformatowuje kod, idzie osobno, bez innej zmiany, a jego hash trafia do `.git-blame-ignore-revs` — także przy kolejnych przeformatowaniach, np. po podniesieniu wersji ruffa albo shfmt. | guidelines: coding | pytanie „Czy commit samego przeformatowania trafia do pliku `.git-blame-ignore-revs`?” i doradca dnia w imieniu Mariusza, 2026-11-19, „7 a — wiersz 6 przyjęty”; nie wybrany: wiersz odrzucony (b) — `.git-blame-ignore-revs` zostaje jednorazowym zapisem tego zadania, a przyszły cykl, który przeformatuje kod przy podniesieniu wersji, miesza przeformatowanie ze zmianą i `git blame` znów wskazuje ten commit jako autora tysięcy linii | przyszły cykl, który podnosi wersję formatera, miesza przeformatowanie ze zmianą kodu i nie dopisuje commita do `.git-blame-ignore-revs` |

## Out of scope

- Ponowna próba zestawu reguł lintera i audyt rodzajów kodu, których procedura rozszerzenia wytycznych kodowania the way wymaga (odpowiedź na pytanie o zakres procedury).
