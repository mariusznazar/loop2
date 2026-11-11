---
title: "loop2: miejsca z dysku Mariusza przenieść z plików repozytorium do pliku lokalizacji ~/.the-way/locations.json"
status: draft
created: 2026-11-08T15:55
updated: 2026-11-09
tags: [zadanie]
related: the project note of Loop in the author's notes
---

# loop2: miejsca z dysku Mariusza przenieść z plików repozytorium do pliku lokalizacji ~/.the-way/locations.json

Status: ready for cycle
Project relation: independent

## Description

### Need

- Sekcja „Backlog” w `AGENTS.md` loop2 podaje trzy pełne ścieżki na dysku Mariusza: do katalogu projektu Loop w notatkach, do listy zadań i do rulebooka Obsidiana (`AGENTS.md:3-5` na `2fe922c`).
- Repozytorium loop2 jest publiczne, więc każdy widzi, jak wygląda dysk Mariusza i jak nazywają się jego notatki; Mariusz tego nie chce.
- the way przeniósł już swoje takie miejsca do pliku `~/.the-way/locations.json` (WAY-320, PR #92 the way); jeśli loop2 zostanie, dwa repozytoria wskazują backlog na dwa różne sposoby, a agent w loop2 dalej czyta ścieżkę wprost z repozytorium.
- Ścieżki bezwzględne stoją w loop2 nie tylko w `AGENTS.md`: skrypt the way do wykrywania ścieżek (`task-cycle/private_paths_check.py` na `f238e4f`), uruchomiony 2026-11-09 na każdym pliku śledzonym loop2 (`2fe922c`), wypisał ich dziewięć: `AGENTS.md:3`, `:4`, `:5`, `foundations/decisions.md:1546` (D-82), `foundations/invariants.md:955` (*Derives from* niezmiennika `action-duration-minimum`), `guidelines/testing.md:91`, `:93`, `:94` oraz `tests/view/scene-picture.test.mjs:34`, ścieżkę do pliku starego repozytorium Loop na dysku Mariusza.

### To do

1. Sekcja „Backlog” w `AGENTS.md` wskazuje katalog projektu Loop pozycją `projects` pod `loop2`, a listę zadań pozycją `tasks` pod `loop2` w pliku lokalizacji `~/.the-way/locations.json`, w postaci, którą daje `project-level/backlog_place.md` the way, i mówi, że gdy pliku albo pozycji brakuje, agent pyta człowieka.
2. Linia sekcji „Backlog” o przestawieniu zadania na Ready zachowuje samo polecenie, a rulebook notatek Mariusza nazywa słowami, bez ścieżki, jak `AGENTS.md` the way.
3. D-82 wskazuje dokumenty zadań i definicję MVP przez miejsce, które nazywa pozycja `projects` pod `loop2`, zamiast ścieżki bezwzględnej; jej sens się nie zmienia.
4. `guidelines/testing.md` (linie 91–94 na `2fe922c`) wskazuje te same dokumenty tak samo jak D-82, bez ścieżki bezwzględnej.
5. *Derives from* niezmiennika `action-duration-minimum` nazywa notatkę `wprawa_i_drzewa_loop2.md` bez ścieżki bezwzględnej, w postaci, w jakiej inne wpisy fundamentu nazywają notatki (pytanie 2).
6. Komentarz w `tests/view/scene-picture.test.mjs:34` nazywa plik sceny starego repozytorium Loop bez ścieżki na dysku.
7. Zestaw testów loop2 dostaje test plików śledzonych, który daje produktom the way (pytanie 3), w sposób, który ustali tamto zadanie the way; po zmianach 1–6 test przechodzi.

### Questions to settle

- Pytanie 1: które ścieżki bezwzględne z plików śledzonych loop2 zadanie usuwa — tylko trzy z sekcji „Backlog” w `AGENTS.md`, czy wszystkie dziewięć, które wypisał skrypt the way?
  - Answer: wszystkie dziewięć — trzy w `AGENTS.md`, D-82, *Derives from* niezmiennika `action-duration-minimum`, trzy w `guidelines/testing.md` i komentarz w `tests/view/scene-picture.test.mjs:34`; po zadaniu w plikach śledzonych loop2 nie zostaje ścieżka bezwzględna.
  - Not chosen:
    - tylko trzy ścieżki z `AGENTS.md` — sześć ścieżek dalej pokazuje układ dysku i nazwy notatek, a D-82 i wytyczne testów wskazują katalog projektu ścieżką, gdy `AGENTS.md` już pozycją pliku lokalizacji.
  - Source: Mariusz, 2026-11-09: „wszystkie dziewięć” — na pytanie „Czy zadanie ma usunąć tylko trzy ścieżki z `AGENTS.md`, czy wszystkie dziewięć?”
- Pytanie 2: czy zadanie usuwa też nazwy prywatnych notatek i ich katalogów, które stoją bez ścieżki bezwzględnej — w liniach *Origin* i *Derives from* fundamentu (np. „przewodnik_testow_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania)”, 305 linii w `foundations/decisions.md`), w komentarzach testów i w wytycznych?
  - Answer: zostają bez zmian; publiczne zostają nazwy plików notatek i fragment ich układu (`Notes/Projects/(P) Loop/_zadania`), nie ścieżka na dysku, tak jak w the way, którego WAY-320 i skrypt `private_paths_check.py` zabraniają tylko ścieżek bezwzględnych i linków `[[...]]`.
  - Not chosen:
    - fragment `Notes/Projects/(P) Loop` zamieniony na odwołanie do pozycji `projects` pod `loop2` — około 310 zmienionych linii, z nich 298 w polach *Origin* fundamentu, do przejrzenia, i nowa reguła, jak przyszłe wpisy piszą *Origin*;
    - nazwy notatek usunięte całkiem — decyzje tracą wskazanie na swoje uzasadnienie i agent nie dotrze do źródła także na komputerze Mariusza.
  - Source: Mariusz, 2026-11-09: „zostawiamy bez zmian” — na pytanie „Czy zadanie zostawia te około 310 linii bez zmian, czy zamienia w nich układ notatek na odwołanie do pozycji `projects`?”
- Pytanie 3: czy loop2 dostaje własny test, który nie przepuszcza ścieżki bezwzględnej w pliku śledzonym?
  - Answer: tak, ale nie własnym wzorcem: zadanie czeka, aż the way poprawi skrypt `private_paths_check.py` tak, by link `[[...]]` sprawdzał tylko w plikach Markdown, a za ścieżkę nie brał sekwencji w napisach (`s:\n`, `\d\d:\d\d`), i da produktom test plików śledzonych; loop2 bierze ten test z the way, bez wyjątków na fałszywe trafienia.
  - Not chosen:
    - test samych ścieżek w loop2 od razu, z wyjątkami na fałszywe trafienia (A) — wyjątki łatają słabość the way i trzeba je potem zdjąć, inaczej przepuszczają prawdziwą ścieżkę w tych liniach;
    - test w loop2 od razu i poprawka w the way równolegle (C) — ta sama praca dwa razy;
    - test ścieżek i linków w loop2 — lista wyjątków na około 40 plików testów i kodu, do której trzeba dopisywać każdy nowy test z tablicą w tablicy;
    - bez testu — następną ścieżkę wyłapie tylko przegląd, a ostatnia weszła przez przegląd 2026-11-06 (`73564b5`).
  - Source: Mariusz, 2026-11-09: „nie spieszy mi się, więc najpierw mogę zrobić the way, żeby nie dublować pracy / to jest dla mnie ważne często - nie dublować pracy” — na pytanie „Którą drogę wybierasz: A, B czy C?”
  - Czeka na: zadanie the way „the way: sprawdzanie ścieżek prywatnych bez fałszywych trafień w kodzie i test plików śledzonych dla produktów” (`zadanie_the_way_wzorce_sciezek_w_kodzie.md` w `_zadania` projektu „Proces pracy nad produktem”).
- Pytanie 4: czy to zadanie przesuwa przypięcie `.the-way` na wersję zawierającą WAY-320, czy przesuwa je osobny commit przed cyklem?
  - Answer: zadanie nie przesuwa przypięcia; przed startem cyklu przypięcie `.the-way` jest już na wersji, która zawiera WAY-320 i zadanie the way z pytania 3.
  - Source: Mariusz, 2026-11-09: „zadanie oczywiście będzie zakładać, że loop2 ma być przepięte na aktualny the way” oraz „załóż że będzie zrobione zanim uruchomię cykl zadania”.

## Context

- Reguła the way, którą loop2 przenosi, to WAY-320 na `foundations` `f238e4f` (`foundations/decisions.md:10218`): „A user's places on their own disk that lie outside every repository, such as the place of a product's tasks and the place of its projects, are kept in one file, `~/.the-way/locations.json`, found at that place for every user and through no environment variable: a JSON object whose keys are repository names, each holding entries by name, such as `tasks` and `projects`, whose values are paths on the user's disk. No file the repository tracks holds an absolute path or a note link, other than the files that the invariant `tracked-file-private-paths` names, which write example paths in order to find or to test them; a file that points to such a place names its entry in the locations file.”
- WAY-320 wiąże repozytorium the way; fundament loop2 nie ma dziś decyzji o tym, gdzie stoi backlog ani o ścieżkach w plikach śledzonych.
- Jak skille the way czytają pozycję pliku lokalizacji, mówi `project-level/backlog_place.md` the way na `f238e4f`: linia `Tasks` albo `Projects` w sekcji `## Backlog` nazywa pozycję „the entry `tasks` under <nazwa produktu>”, a ścieżka z pliku nie trafia do żadnego pliku repozytorium, zapisu cyklu, requestu ani raportu.
- WAY-320 i `backlog_place.md` weszły do the way w PR #92; przypięta 2026-11-09 wersja the way w loop2, `294af7f`, ich nie zawiera.
- the way rozstrzygnął linię o rulebooku tak, że zostaje samo polecenie, a rulebook jest nazwany słowami („as the author's rules for agent tasks in his notes give”, `AGENTS.md` the way na `f238e4f`).
- Historia gita zachowuje usunięte ścieżki; WAY-320 przyjmuje to w uzasadnieniu („the history keeps it after the file is corrected”).
- Co ustalono w the way i dlaczego, z odrzuconymi drogami: notatka zadania the way „the way: miejsca spoza repozytorium w pliku ~/.the-way/locations.json zamiast ścieżek w plikach repozytorium” w `_zadania` projektu „Proces pracy nad produktem”; jej kopia zostaje w zapisie cyklu w repozytorium the way.

## Questions carried to cycle

none

## Human actions

- Dopisanie do `~/.the-way/locations.json` pozycji `projects` (katalog projektu Loop w notatkach) i `tasks` (lista zadań Loop) pod kluczem `loop2` — before the cycle, done

## Decisions in play

- D-82 — „Test expectations may come from the loop2 foundation, accepted task documents in `the folder that the entry `projects` under `loop2` in the locations file names, ` and its `_zadania/` directory in state ready for cycle or completed, and the approved `definicja_mvp_loop2.md` there. The draft `koncepcja_projektowa.md` is a source only in a passage quoted by an accepted document; a test comment locating a documentary expectation names its file and line.” (`foundations/decisions.md:1546` na `2fe922c`)

## Settlements to record

Candidates: 4 shown, 2 accepted — 2026-11-09

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Miejsca na dysku Mariusza poza repozytorium — katalog projektu Loop i listę zadań — loop2 wskazuje pozycjami `projects` i `tasks` pod `loop2` w `~/.the-way/locations.json`, a żaden plik śledzony loop2 nie zawiera ścieżki bezwzględnej; plik może nazwać notatkę i jej katalog w notatkach (np. `Notes/Projects/(P) Loop/_zadania`), bez ścieżki na dysku. | decision | pytania 1 i 2 | czy loop2 w ogóle zapisuje tę regułę we własnym fundamencie (WAY-320 wiąże tylko the way), i czy następny wpis albo komentarz może znów podać ścieżkę, jak D-82 i test z `73564b5`, albo czy musi usuwać nazwy notatek z pól *Origin* |
| 2 | Żaden plik śledzony przez git w loop2 nie zawiera ścieżki bezwzględnej ani linku do notatki w postaci, którą wykrywa test plików śledzonych z the way, poza plikami, które z natury piszą przykładowe ścieżki, wymienionymi w teście. | invariant | pytanie 3; utrzymane wobec „Przeciw: kolejny test do utrzymania w produkcie.” z pierwotnej notatki zadania — Mariusz, 2026-11-09: „tak” | czy test z the way cytuje niezmiennik loop2, jakie ma brzmienie i *Part* (`every`), i czy wyjątki stoją w zdaniu niezmiennika |

## Out of scope

- Usunięcie ścieżek z historii gita.
