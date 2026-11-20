---
title: "loop2: słowo „key” zamiast „entry” dla nazwy w pliku lokalizacji — AGENTS.md, D-362 i niezmiennik tracked-file-private-names — po przesunięciu przypiętego the way"
status: ready for cycle
created: 2026-11-20
updated: 2026-11-20
tags:
  - loop2
  - the-way
related:
  - the project note of Loop in the author's notes
---

# loop2: słowo „key” zamiast „entry” dla nazwy w pliku lokalizacji — AGENTS.md, D-362 i niezmiennik tracked-file-private-names — po przesunięciu przypiętego the way

Status: ready for cycle
Project relation: independent
Defect introduced by: none

## Description

### Need

- loop2 przypina the way na 19e5774a (scalenie PR loop2#162), które nazywa nazwę w pliku lokalizacji `~/.the-way/locations.json` „key” („the key `tasks` under `the-way`”), a słowo „entry” zostawia wyłącznie dla wpisu fundamentu.
- Sekcja `## Backlog` w `AGENTS.md` loop2, decyzja D-362 i niezmiennik `tracked-file-private-names` mówią o tej samej nazwie „the entry”, więc agent czytający je obok reguł the way dostaje jedno słowo w dwóch znaczeniach — a D-362 używa go w obu znaczeniach w jednym wpisie.

### To do

1. W sekcji `## Backlog` w `AGENTS.md` loop2 trzy linie zaczynające się od „- Projects: the entry `projects`”, „- Tasks: the entry `tasks`” i „- Task rules: the entry `task-rules`” (wskazówka: linie 3–5) mówią „key” / „keys” wszędzie tam, gdzie dziś stoi „entry” w znaczeniu nazwy pod `loop2` w pliku lokalizacji — także w zdaniach „The folder the entry names…”, „The list of tasks the entry names…”, „Where the file or the entry is missing…”, „…offers to add the entry to the file” i „A missing entry or file is handled as for the tasks.”; reszta brzmienia bez zmian.
2. Decyzja D-362 („How does loop2 point to places outside the repository that its readers cannot reach?”, `foundations/decisions.md`) mówi „key” / „keys” wszędzie tam, gdzie „entry” / „entries” znaczy nazwę pod `loop2` w pliku lokalizacji — w zdaniu wiążącym („by the entry that stands for it under `loop2`”, „which are the entries `projects`, `tasks` and `task-rules`”), w *Rationale* („The name of an entry carries the pointer without the path, and the value of the entry lies in the user's own file of places” → „The name of a key carries the pointer without the path, and the value of the key lies in the user's own file of places”) i w *Rejected* („while the backlog section points by an entry”, „listing only the entries `projects` and `tasks`”, „would take `task-rules` for an entry outside the rules of loop2”); zmiana to podmiana samego słowa (z przedimkiem), bez przebudowy zdań; „entry” w znaczeniu wpisu fundamentu, jak w *Rationale* („finds the reasoning where it stands in the entry”) i w *Verification* („a comment, an entry or a guideline…”, „an entry or a comment that leaves out…”), zostaje; sens decyzji bez zmian.
3. Niezmiennik `tracked-file-private-names` (`foundations/invariants.md`) mówi „by naming the key `projects`, `tasks` or `task-rules` under `loop2`” w miejsce „by naming the entry…”; sens bez zmian.

### Questions to settle

- 1. Kto i kiedy zmienia nagłówek `## Gate record` na `## Approval record` w dwóch zatwierdzonych definicjach loop2 (`definicja_mvp_loop2.md`, `definicja_mvp2_loop2.md` w folderze projektu Loop), skoro leżą one w notatkach autora poza repozytorium loop2, a cykl zadania pisze tylko w repozytorium produktu?
  - Answer: agent prowadzący doprecyzowanie zmienia oba nagłówki od razu, przed akceptacją dokumentu, i zapisuje wynik kontroli; cykl obejmuje tylko repozytorium — zrobione 2026-11-20 (zob. *Context*).
  - Not chosen:
    - człowiek zmienia nagłówki w trakcie cyklu, przy prośbie o scalenie — PR stoi jako zablokowany szkic, a do tego czasu oba projekty nie przechodzą kontroli
    - człowiek zmienia nagłówki przed cyklem — zadanie czeka na dwie linie zmienione ręcznie
  - Source: doradca dnia w imieniu Mariusza, 2026-11-20: „1 a — zmień teraz sam nagłówek ## Gate record na ## Approval record w obu definicjach (definicja_mvp_loop2.md, definicja_mvp2_loop2.md), sprawdź readiness_check.py i plan_check.py na oryginałach (nothing found, odciski bez zmian) i zapisz w dokumencie jako zrobione przed cyklem z wynikiem kontroli; cykl obejmuje tylko repozytorium. Uzasadnienie: zmiana mechaniczna, wymuszona przypięciem, które Mariusz zatwierdził (loop2#162); bez niej każdy agent w MVP i MVP2 staje na błędzie kontroli.”
- 2. Czy przemianowanie „entry” → „key” obejmuje też fundament loop2 — decyzję D-362 i niezmiennik `tracked-file-private-names` — który mówi o tej samej nazwie w pliku lokalizacji słowem „entry”?
  - Answer: tak — D-362 (zdanie wiążące, uzasadnienie, odrzucone warianty) i niezmiennik `tracked-file-private-names`: „entry” w znaczeniu klucza pliku lokalizacji → „key”, sens bez zmian, przez skille zapisu decyzji i niezmiennika; w *Verification* D-362 „entry” w znaczeniu wpisu fundamentu zostaje.
  - Not chosen:
    - tylko trzy linie `AGENTS.md`, jak w linii zadania — dziś nic nie kosztuje, ale `AGENTS.md` mówi „key”, a fundament „entry” o tym samym, i najbliższy przegląd fundamentu zamieni ten rozjazd w osobne zadanie
  - Source: doradca dnia w imieniu Mariusza, 2026-11-20: „2 a — zadanie obejmuje też D-362 (zdanie wiążące, uzasadnienie, odrzucone warianty) i niezmiennik tracked-file-private-names: entry w znaczeniu klucza pliku lokalizacji → key, sens bez zmian, przez skille zapisu decyzji i niezmiennika; w Verification D-362 entry w znaczeniu wpisu fundamentu zostaje. (…) Uzasadnienie: rozjazd AGENTS.md i fundamentu to sprzeczność, którą następny przegląd zamieni w osobne zadanie — taniej w tym samym cyklu.”; `foundations/decisions.md:755` i `foundations/invariants.md:1300` przy ba67f045.

## Context

- Zadanie wynika ze zmiany the way o dwóch znaczeniach słowa „gate” (zadanie the way o identyfikatorze `the-way-dwa-znaczenia-gate`, zrobione); jej prośba o scalenie mówi, że produkt przesuwający przypiętą wersję zmienia w zatwierdzonych definicjach `## Gate record` na `## Approval record`, a w sekcji `## Backlog` swojego `AGENTS.md` „the entry `tasks` under …” i podobne na „the key …”.
- Przesunięcie przypiętej wersji zrobił PR loop2#162 (scalony 2026-11-20); to zadanie domyka jego skutki.
- Nagłówki obu definicji zmienione 2026-11-20 przed cyklem (pytanie 1): `definicja_mvp_loop2.md` i `definicja_mvp2_loop2.md` w folderze projektu Loop mają `## Approval record`, po jednej linii zmiany w każdej.
- Kontrola po zmianie, przy loop2 ba67f045 i the way 19e5774a: `readiness_check.py` na obu definicjach i `plan_check.py` na `plan_mvp_loop2.md` i `plan_mvp2_loop2.md` — każda „nothing found”; odciski bez zmian: 934f56c6 (MVP) i e6c61098 (MVP2), w zapisie zatwierdzenia definicji i w nagłówku planu.
- Odcisk definicji liczy się od linii `## Goal` do linii `## Approval record` bez niej (`.the-way/project-level/readiness_check.py`, docstring koło linii 351), więc sama zmiana nagłówka go nie zmienia.
- Słownik przypiętego the way (`.the-way/foundations/glossary.md`, hasło „entry”): „An entry is the text, under one or more headings of its own, that a file of the foundation holds about one thing it records.”
- `AGENTS.md` należy do części `agent-workflow`, a `foundations/**` do części `product-foundation` (`foundations/part_map.md`); zadanie nie pisze kodu ani testów, więc żaden plik wytycznych nie ma tu zastosowania.
- Niezmiennik `tracked-file-private-names` ma *Method* `review`, więc żaden test go nie cytuje; D-362 nie trzyma żaden test liniami `decision:`.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- D-362 — How does loop2 point to places outside the repository that its readers cannot reach? (`foundations/decisions.md`, wskazówka: linia 753): „loop2 names a place on the author's disk outside the repository, such as the folder of its projects in the notes, the list of its tasks and the rules of a task's line, by the entry that stands for it under `loop2` in the locations file `~/.the-way/locations.json`, which are the entries `projects`, `tasks` and `task-rules`, and no file git tracks holds an absolute path on that disk. No file git tracks names a note the author keeps outside the repository or the folder it lies in, or a file of a repository its readers cannot reach, such as the private repository of the old loop game; what a reader needs of such a source stands in the foundation or in the file itself.” — zmiana, którą robi zadanie (pytanie 2): „entry” / „entries” w znaczeniu nazwy pod `loop2` w pliku lokalizacji → „key” / „keys” w zdaniu wiążącym, *Rationale* i *Rejected*; sens bez zmian; „entry” w znaczeniu wpisu fundamentu zostaje.
- Niezmiennik `tracked-file-private-names` (`foundations/invariants.md`, wyprowadzony z D-362 i D-13): „A file git tracks points to a place the author keeps outside the repository only by naming the entry `projects`, `tasks` or `task-rules` under `loop2` in the locations file `~/.the-way/locations.json` or by referring to the operator's private note of secrets (D-13) without that note's name and path, and names no note, no folder of notes, no path on the author's disk and no file of the private repository of the old loop game.” — zmiana, którą robi zadanie (pytanie 2): „the entry” → „the key”; sens bez zmian.

## Settlements to record

Candidates: 3 shown, 1 accepted — 2026-11-20

| # | Settlement | Goes to | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | W fundamencie loop2 nazwa pod `loop2` w pliku lokalizacji to „key”, a „entry” w D-362 zostaje tylko w znaczeniu wpisu fundamentu (wybór człowieka) | sentence of D-362 | pytanie 2 | które „entry” w D-362 zmienić — np. czy także „an entry” w *Verification* albo czy zostawić *Rationale* i *Rejected* w starym brzmieniu |

## Out of scope

- „Entry” w każdym innym znaczeniu niż nazwa w pliku lokalizacji — wpis fundamentu, wpis kroniki gry, wejście ekranu w kodzie widoku — zostaje.
