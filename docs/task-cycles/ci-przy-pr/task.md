---
title: "loop2: GitHub Actions uruchamia jedno polecenie testów (npm test) na każdej prośbie o scalenie do main, z .the-way na przypiętym commicie, plus skan sekretów — scalone przed 28.11"
status: draft
created: 2026-11-14T17:55
updated: 2026-11-15
tags: [zadanie]
related: "the project note of the Loop project"
---

# loop2: GitHub Actions uruchamia jedno polecenie testów (npm test) na każdej prośbie o scalenie do main, z .the-way na przypiętym commicie, plus skan sekretów — scalone przed 28.11

Status: ready for cycle
Project relation: independent
Defect introduced by: none

## Description

### Need

- Testy loop2 biegną dziś tylko na komputerze, na którym zrobiono zmianę; na GitHubie nic ich nie uruchamia przy prośbie o scalenie.
- Mariusz scala prośby, nie widząc wyniku testów policzonego poza maszyną, na której zmianę zrobiono.
- Sprawdzający projekt zaliczeniowy kursu AI Tech Leaders wymagają CI przy każdym pull requeście (build, testy jednostkowe, co najmniej jeden test integracyjny albo E2E), a skan sekretów i zależności w CI wymieniają jako mile widziany; zgłoszenie 28.11.2026.
- the way (PR #127, scalony 2026-11-14) zapisał zasadę, że jedno polecenie testów produktu biegnie w CI na każdej prośbie o scalenie, z `.the-way` na przypiętym commicie, a jego wynik jest wymaganym sprawdzeniem z prawem obejścia dla właściciela; plik CI pisze produkt sam.

### To do

1. Przypięty commit `.the-way` przesunięty na commit gałęzi `foundations` the way, który zawiera scalenie PR #127 (`209d5a0`) albo późniejszy, instalatorem the way, jako pierwszy commit gałęzi zadania (`.the-way/installation/README.md`, sekcja „Moving the pin”); blok the way w `AGENTS.md` przepisuje przy tym instalator. Gdy przypięty commit stoi już na `foundations` z `209d5a0` albo nowszym — na przykład po zadaniu loop2 o podziale dziennika decyzji na tematy, które też zaczyna od tego przesunięcia — ten krok odpada.
2. `npm test` bez argumentów uruchamia też `python -B .the-way/instruction-files/check_instructions.py`, jako ostatni etap, po kontroli fundamentu; błąd skryptu zatrzymuje testy, ostrzeżenie nie. Opis `npm test` w `README.md` (sekcja „Praca lokalna i sprawdzenie”, akapit zaczynający się od „`npm test` to jedno polecenie wszystkich testów”) wymienia ten etap.
3. loop2 ma plik konfiguracji GitHub Actions, który na każdej prośbie o scalenie do `main` uruchamia na Linuksie `npm test` i spełnia pięć punktów opisu „Run the one command in CI” w `.the-way/installation/README.md` przesuniętego commitu: zdarzenie `pull_request`, nigdy `pull_request_target`; jedno polecenie testów i żadne inne polecenie sprawdzające obok; `.the-way` na commicie z gitlinka (`submodules: true`); Python z `.the-way/.python-version`; pełna historia (`fetch-depth: 0`) i `refs/remotes/origin/HEAD` wskazujące `main`. Zadanie CI ma stałą nazwę, bo regułę wymaganego sprawdzenia ustawia się po nazwie.
4. Test, który w CI na Linuksie pada z powodu środowiska testu — ścieżki, brakujące narzędzie, założenie Windowsa — cykl poprawia w tym zadaniu. Gdy test na Linuksie wykrywa błąd gry albo wdrożenia, cykl staje i pyta Mariusza.

### Acceptance criteria

- Przebieg CI na prośbie o scalenie tego zadania kończy się powodzeniem, zanim prośba trafi do Mariusza.
- Ten przebieg wykonuje testy wymagające demona Dockera, zamiast je pominąć.

### Questions to settle

- Czy dla „skanowania sekretów w CI” z listy kursu wystarczy wbudowany skan GitHuba (Secret Protection z blokadą pushu, włączone 14.11.2026), czy loop2 dokłada skaner w CI?
  - Answer: Wystarczy wbudowany skan GitHuba; w CI nic nie dokładamy, a opis skanu wchodzi do `security-notes.md` w zadaniu o tym pliku.
  - Not chosen:
    - osobny workflow ze skanerem (np. gitleaks) — drugi plik CI, obce narzędzie pobierane przy każdym przebiegu i odstępstwo od zasady the way, że obok jednego polecenia testów nie stoi w CI inne polecenie sprawdzające
    - skaner jako test w `npm test` — dokłada narzędzie do instalacji lokalnej i powtarza to, co GitHub robi już na całej historii repo
  - Source: doradca dnia w imieniu Mariusza, 2026-11-15: „1 a”; pytanie postawione na podstawie notatki zadania z 2026-11-14: „Agent dokłada skaner w CI tylko wtedy, gdy wbudowany nie wystarczy; w refinacji rozstrzygnąć, czy dla wymagania kursu »skanowanie sekretów w CI« wystarczy opisać wbudowany skan.”
- Co cykl robi z testem, który w CI na Linuksie padnie?
  - Answer: Poprawia każdą porażkę, która wynika ze środowiska testu (ścieżki, brakujące narzędzie, założenie Windowsa); gdy test na Linuksie wykrywa prawdziwy błąd gry albo wdrożenia, cykl staje i pyta Mariusza.
  - Not chosen:
    - jak w the way: mała poprawka w cyklu, większa wydzielona jako uwaga w opisie PR-a — CI może wejść na `main` czerwone, każdy kolejny PR jest wtedy czerwony, a wymaganego sprawdzenia nie da się włączyć
    - każda poprawka w cyklu bez względu na wielkość — duża poprawka zagraża terminowi 28.11 bez pytania Mariusza
  - Source: doradca dnia w imieniu Mariusza, 2026-11-15: „2 a”; pytanie z notatki zadania z 2026-11-14, „Otwarte wątki / decyzje”: „poprawka w tym zadaniu, gdy mała, albo wydzielona — rozstrzygnąć w refinacji, z oglądu pierwszego przebiegu.”
- W którym miejscu kolejności etapów `npm test` staje `check_instructions.py`?
  - Answer: Na końcu, po kontroli fundamentu.
  - Not chosen:
    - na początku, przed budową — wynik w kilka sekund, ale kontrole the way stoją w dwóch miejscach kolejności
  - Source: doradca dnia w imieniu Mariusza, 2026-11-15: „3 a”; D-405 w `foundations/decisions.md` loop2 (commit `394ca859`) ustala dziś kolejność: budowa, testy Node, katalogi testów Pythona, kontrola fundamentu.
- Kto i jak ustawia na `main` wymagane sprawdzenie CI z prawem obejścia dla właściciela?
  - Answer: Mariusz sam, jako czynność człowieka po pierwszym zielonym przebiegu CI: osobny ruleset tylko z wymaganym sprawdzeniem i z wyjątkiem dla roli „Repository admin”, tak jak w the way przy PR #127 (ruleset `foundations_tests`); obecny ruleset `main` zostaje bez wyjątków. Cykl tylko opisuje ten ruleset w opisie PR-a i czyta go po ustawieniu.
  - Not chosen:
    - reguła i wyjątek dopisane do obecnego rulesetu `main` — właściciel mógłby wtedy obejść także zakaz force pusha i scalanie tylko przez PR
    - wymagane sprawdzenie bez prawa obejścia — awaria GitHub Actions blokuje każde scalenie, dopóki Mariusz nie wyłączy reguły; odstępstwo od zasady the way
  - Source: doradca dnia w imieniu Mariusza, 2026-11-15: „4 a — z jedną zmianą w 4: osobny ruleset z wymaganym sprawdzeniem ustawia Mariusz sam jako Human action po pierwszym zielonym przebiegu CI (tak zrobił w the way przy #127, ruleset foundations_tests), cykl tylko opisuje go w PR-ze i czyta po ustawieniu.”
- Czy test wymagający Dockera pomija się na każdym komputerze bez Docker Desktop, czy tylko tam, gdzie demon Dockera nie odpowiada? Zdanie D-390 „On a computer with no Docker Desktop, such as one running Linux or a container in a cloud, the test is skipped at once” pozwala na oba odczytania, a maszyna GitHuba z Linuksem nie ma Docker Desktop, ale ma odpowiadający demon.
  - Answer: Test pomija się tylko wtedy, gdy demon nie odpowiada; w CI testy wymagające Dockera biegną, a cykl doprecyzowuje zdanie D-390.
  - Not chosen:
    - test pomijany zawsze na komputerze bez Docker Desktop — CI krótsze, ale testy kontenerów dalej biegną tylko na komputerze Mariusza, a w logu CI widać je jako pominięte; cykl musiałby zmienić kod, który dziś uruchamia te testy przy odpowiadającym demonie
  - Source: doradca dnia w imieniu Mariusza, 2026-11-15: „5 a”; zachowanie dzisiejszego kodu: `scripts/docker_gate.py`, docstring modułu, „Where none answers and there is no Docker Desktop to start, the test is skipped at once.” (commit `394ca859`)

## Context

- Zadanie the way, z którego bierze się zasada i opis pliku CI: `a private note of the author`; scalone jako PR #127 the way 2026-11-14 (`209d5a0` na `foundations`).
- loop2 przypina the way na `ec7929d` (PR #125 the way), który nie zawiera PR #127: brak w nim opisu „Run the one command in CI” i zdania instalatora o CI; między przypiętym commitem a `origin/foundations` (`bfb2e10`) jest 163 commity (odczyt 2026-11-15).
- `foundation_check.py` z `bfb2e10` uruchomiony na loop2 `394ca859` zgłasza 0 błędów; `check_instructions.py` z `bfb2e10` zgłasza 0 błędów, 130 ostrzeżeń `dead-path` (ścieżki serwera w `.agents/skills/loop2-deploy/SKILL.md`) i 7 informacji (odczyt 2026-11-15).
- Instalator na `bfb2e10` wpisuje do bloku `AGENTS.md` zdanie, że jedno polecenie uruchamia `foundation_check.py` i `check_instructions.py`, a tam, gdzie repozytorium ma plik CI, CI uruchamia je na każdej prośbie o scalenie (`installation/install.py`, funkcja `product_guidance`).
- `npm test` to `python -B scripts/test.py`: budowa, testy Node, `.the-way/gate/run_tests.py`, `foundation_check.py`; nie uruchamia `check_instructions.py` (`scripts/test.py`, funkcja `main`).
- `npm test` wymaga Pythona 3.14 jako `python`, zainicjowanego submodułu `.the-way`, środowiska `.runs/quality-venv` z `requirements-quality.txt` (Ruff, ShellCheck) i — gdy zmiana dotyka `package-lock.json` — dostępu do rejestru npm (`README.md`, sekcje „Narzędzia kontroli kodu” i „Praca lokalna i sprawdzenie”).
- Dziś kod pomija test wymagający demona Dockera od razu tylko wtedy, gdy demon nie odpowiada i nie ma Docker Desktop do uruchomienia (`scripts/docker_gate.py`); na maszynie GitHuba z Linuksem demon odpowiada, więc te testy tam biegną.
- loop2 ma dwa workflow: `.github/workflows/deploy.yml` (wdrożenie po pushu na `main`, D-11) i `.github/workflows/check-address.yml` (co 5 minut sprawdza publiczny adres); żaden nie uruchamia testów.
- `main` chroni od 2026-11-14 ruleset `main`: pusta lista wyjątków, zakaz usunięcia i force pusha, scalenie tylko przez PR, 0 wymaganych zatwierdzeń, metoda `merge`; GitHub pozwala wybrać jako wymagane tylko sprawdzenie, które raz już się uruchomiło.
- Wbudowany skan sekretów (Secret Protection) i blokada pushu są w loop2 włączone od 2026-11-14 (API GitHuba, `security_and_analysis`); alerty Dependabota też; `scripts/audit_dependencies.py` biegnie w `npm test` przy zmianie `package-lock.json`.
- Wymagania kursu, punkt 8 i „Mile widziane”: `a private note of the author`, sekcja „Co musi mieć projekt”; notatka nadrzędna: `a private note of the author`.

## Questions carried to cycle

none

## Human actions

- Po pierwszym zielonym przebiegu CI założyć w loop2 osobny ruleset dla `main` z regułą „Require status checks to pass” i sprawdzeniem CI tego zadania, z wyjątkiem dla roli „Repository admin”; ruleset `main` zostaje bez wyjątków — in the cycle
- Włączyć w loop2 wbudowany skan sekretów (Secret Protection) i blokadę pushu — before the cycle, done

## Decisions in play

- **D-77** — „`npm test` without arguments runs the full gate; `npm test -- <test file>` accepts exactly one test file and runs only it, building the game first for Node but not for Python, without other tests or the foundation check. A focused run with no executed test or a file that is not a test fails, and only the full gate suffices before a request. There is no configuration file limiting the whole run; a whole-run limit is reconsidered on a concrete problem with diagnosis time or a hanging run, while new or changed tests still bound their own waiting.” Zadanie zmienia jej *Verification*: pełna bramka uruchamia też `check_instructions.py`, a przebieg jednego pliku go nie uruchamia, tak jak kontroli fundamentu.
- **D-405** — „The full gate runs its stages one after another: the build, the Node tests, the directories of Python tests and the foundation check, in this order, and ends at the first stage that fails. The Node tests do not run at the same time as the directories of Python tests.” Zadanie dopisuje do kolejności piąty etap: `check_instructions.py` po kontroli fundamentu (pytanie „W którym miejscu kolejności etapów…”).
- **D-390** — „A test of the gate that needs a Docker daemon, finding none answering on a computer that has Docker Desktop, starts Docker Desktop and waits until a daemon answers, for at most 3 minutes, in a run of the whole gate and in a run of one test file alike. […] On a computer with no Docker Desktop, such as one running Linux or a container in a cloud, the test is skipped at once, with a message that says what stays unchecked.” Zadanie doprecyzowuje to zdanie: test pomija się od razu tylko tam, gdzie demon Dockera nie odpowiada i nie ma Docker Desktop do uruchomienia; na komputerze bez Docker Desktop z odpowiadającym demonem, jak maszyna GitHuba z Linuksem, test biegnie (pytanie „Czy test wymagający Dockera pomija się…”).
- **D-11** — „The deploy branch is `main`: a push to `main`, the merge of a pull request included, reaches the test server without anyone starting it by hand, deployed itself or within a later commit of `main` that contains it.” Zadanie jej nie zmienia: CI biegnie na prośbie o scalenie, przed pushem na `main`, a plik wdrożenia zostaje bez zmian.

## Settlements to record

Candidates: 6 shown, 4 accepted — 2026-11-15

| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Skanem sekretów loop2 jest wbudowany skan GitHuba z blokadą pushu; CI nie dokłada skanera. | decision | Questions to settle — pytanie „Czy dla »skanowania sekretów w CI«…” (wybór Mariusza; *Not chosen* tam) | czy do pliku CI dołożyć skaner (np. gitleaks), skoro kurs wymienia „skanowanie sekretów w CI” |
| 2 | `check_instructions.py` jest ostatnim etapem pełnej bramki, po kontroli fundamentu. | sentence of D-405 | Questions to settle — pytanie „W którym miejscu kolejności etapów…” (wybór Mariusza; *Not chosen* tam) | miejsce nowego etapu w kolejności D-405 |
| 3 | CI loop2 biegnie na Linuksie, bo tam odpowiada demon Dockera i biegną testy kontenerów; ścieżki Windowsa sprawdza lokalna bramka. | data or code: plik CI loop2, komentarz przy wyborze systemu | To do, punkt 3; przyjęte przez doradcę dnia w imieniu Mariusza, 2026-11-15: „6 a”; nie wybrano: wiersz odrzucony — wybór Linuksa i tak stoi w punkcie 3, a powód zostaje tylko w historii | system maszyny CI — Windows, na którym GitHub nie uruchamia kontenerów Linuksa, albo oba naraz |
| 4 | Test wymagający Dockera pomija się od razu tylko tam, gdzie demon Dockera nie odpowiada i nie ma Docker Desktop do uruchomienia; przy odpowiadającym demonie bez Docker Desktop, jak w CI na Linuksie, test biegnie. | sentence of D-390 | Questions to settle — pytanie „Czy test wymagający Dockera pomija się…” (wybór Mariusza; *Not chosen* tam) | czy testy wymagające Dockera biegną w CI, czy są tam pomijane |

## Out of scope

- Opis wbudowanego skanu sekretów w `security-notes.md` — zadanie `a private note of the author`.
- Sprawdzenie, czy CI może zastąpić lokalną bramkę cyklu — osobne zadanie the way po 28.11.2026: `a private note of the author`.
