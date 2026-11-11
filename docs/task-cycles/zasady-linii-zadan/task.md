---
title: "loop2: zasady linii zadań brać z rulebooka przez wpis task-rules w pliku lokalizacji, zamiast powtarzać je w AGENTS.md"
status: draft
created: 2026-11-11T23:00
updated: 2026-11-11
tags: [zadanie]
related: "the project note of the author's Loop project"
---

# loop2: zasady linii zadań brać z rulebooka przez wpis task-rules w pliku lokalizacji, zamiast powtarzać je w AGENTS.md

Status: ready for cycle
Project relation: independent

## Description

### Need

- Sekcja `## Backlog` w `AGENTS.md` loop2 sama powtarza jedną z zasad linii zadań z rulebooka vaultu: gdy dokument zadania pierwszy raz dochodzi do `ready for cycle`, linię przestawia się na Ready, `[/]`, i zdejmuje z niej datę (`AGENTS.md:5` na `01418389`).
- Statusu nowej linii ani formy zależności między zadaniami ta sekcja nie podaje.
- the way od PR #102 (`e9a0f92` na `foundations`) bierze status nowej linii, jej przejście na gotową i formę zależności z zasad samego miejsca zadań, a sekcja `## Backlog` produktu wskazuje je linią `Task rules`, która nazywa wpis `task-rules` pliku lokalizacji `~/.the-way/locations.json` pod nazwą produktu (`project-level/backlog_place.md` i `project-level/task_line.md` na `e9a0f92`).
- Bez tej linii agent the way w loop2 nie znajdzie zasad linii zadań i za każdym razem zapyta o nie Mariusza, a zasada powtórzona w `AGENTS.md` rozjedzie się z rulebookiem przy jego pierwszej zmianie.

### To do

1. Przypięcie `.the-way` w loop2 przechodzi na `e9a0f92`, pierwszym commitem gałęzi zadania, razem z tym, co przepisze instalator the way (pytanie 1).
2. W sekcji `## Backlog` w `AGENTS.md` loop2 linię o przestawianiu linii zadania na Ready zastępuje linia `Task rules`, która nazywa wpis `task-rules` pod `loop2` w tym samym pliku lokalizacji, w brzmieniu tej linii w `AGENTS.md` the way na `e9a0f92`, z `loop2` w miejscu `the-way`.
3. D-362 wymienia wśród wpisów pod `loop2` w pliku lokalizacji, obok `projects` i `tasks`, wpis `task-rules`, który wskazuje zasady linii zadań w notatkach Mariusza (pytanie 2).

### Questions to settle

- Pytanie 1: czy przesunięcie przypięcia `.the-way` na wersję z PR #102 the way jest częścią zadania, czy osobnym commitem przed cyklem?
  - Answer: częścią zadania — pierwszy commit gałęzi zadania przypina najnowszą wersję the way z 2026-11-11, `e9a0f92` (scalenie PR #102 na `foundations`).
  - Not chosen:
    - osobny commit przesuwający przypięcie na `main` loop2 przed cyklem — jeden commit i push poza requestem, po którym wszystkie cykle loop2 idą nowym procesem.
  - Source: Mariusz, 2026-11-11: „może po prostu przypnij najnowszą obecnie wersję the way jako pierwszy commit” — na pytanie „Czy mam zrobić `git pull` na `main` loop2, przesunąć pin na `e9a0f92` jednym commitem i wypchnąć go, a potem wrócić do doprecyzowania zadania?”
- Pytanie 2: czy D-362 ma wymienić wpis `task-rules` obok wpisów `projects` i `tasks`?
  - Answer: tak; cykl dopisuje `task-rules` do D-362, a loop2 nie dostaje osobnej decyzji o tym, skąd pochodzą zasady linii zadań.
  - Not chosen:
    - D-362 bez zmian — decyzja mówi po zadaniu nieprawdę („which are the entries `projects` and `tasks`”), agent czytający fundament bierze `task-rules` za wpis spoza zasad loop2, a najbliższy przegląd fundamentu wykazuje rozjazd do naprawy;
    - osobna decyzja loop2, że zasady linii zadań pochodzą z rulebooka — powtarza regułę, którą the way trzyma u siebie (WAY-107 the way), i daje dwa miejsca do utrzymania.
  - Source: Mariusz, 2026-11-11: „tak” — na pytania „Czy cykl ma dopisać wpis `task-rules` do D-362?” i „Dopisać teraz?” (wpis w pliku lokalizacji), zadane razem.

## Context

- Linia, którą `AGENTS.md` the way na `e9a0f92` ma w sekcji `## Backlog` w miejscu zdania o przestawianiu linii na Ready: „Task rules: the entry `task-rules` under `the-way` in the same locations file. It names the author's rules for a task's line: its status when new, its move to ready, its dependencies. A missing entry or file is handled as for the tasks.”
- Rulebook vaultu, sekcja „Zadania agentowe”, mówi to samo co dzisiejsze zdanie w `AGENTS.md` loop2: zadanie zapisane przez `/park` stoi w `[>]` z datą, a gdy jego dokument pierwszy raz dochodzi do `ready for cycle`, agent przestawia linię na `[/]` i zdejmuje datę; dla zadań loop2 nic się więc w praktyce nie zmienia.
- Instalator the way przy przesunięciu przypięcia przepisuje swój blok w `AGENTS.md` loop2 i skille `the-way-*` w `.claude/skills/` i `.agents/skills/`; skrypty the way w testach loop2 pochodzą potem z nowej wersji i mogą inaczej ocenić te same pliki (`installation/README.md` the way, sekcja „Moving the pin”).
- Ścieżka do rulebooka nie trafia do żadnego pliku repozytorium loop2: pilnuje tego niezmiennik `tracked-file-private-paths`.
- Skąd zadanie: zadanie the way „the way: przy prowadzeniu projektu każde zadanie ma dostawać linię w backlogu produktu z właściwym statusem” (`zadanie_the_way_linia_backlogu_przy_prowadzeniu_projektu.md` w `_zadania` projektu „Proces pracy nad produktem”), pytania 3 i 5; scalone w PR #102 the way.
- Request loop2 #76, który przeniósł miejsca projektów i zadań do pliku lokalizacji, jest scalony (2026-11-11).

## Questions carried to cycle

none

## Human actions

- Dopisać w pliku lokalizacji `~/.the-way/locations.json`, pod `loop2`, wpis `task-rules` ze ścieżką do rulebooka vaultu, tą samą, którą ma wpis `task-rules` pod `the-way` — before the cycle, done (2026-11-11, wpis dopisany przez agenta na zgodę Mariusza: „tak”)

## Decisions in play

- D-362 — „loop2 names a place on the author's disk outside the repository, such as the folder of its projects in the notes and the list of its tasks, by the entry that stands for it under `loop2` in the locations file `~/.the-way/locations.json`, which are the entries `projects` and `tasks`, and no file git tracks holds an absolute path on that disk. A file may name a note and the folder it lies in within the notes, such as `Notes/Projects/(P) Loop/_zadania`, without a path on the disk.” (`foundations/decisions.md:8103` na `01418389`) — zadanie zmienia tę decyzję (pytanie 2): wpisy pod `loop2` to `projects`, `tasks` i `task-rules`, a ten ostatni wskazuje zasady linii zadań w notatkach Mariusza.

## Settlements to record

Candidates: 3 shown, 1 accepted — 2026-11-11

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | D-362 wymienia wpis `task-rules` pod `loop2` obok `projects` i `tasks`; loop2 nie dostaje osobnej decyzji o tym, skąd pochodzą zasady linii zadań. | decision | pytanie 2 (zmienia D-362) | czy ruszać D-362, gdy zmienia się tylko `AGENTS.md`, i czy pisać w fundamencie loop2 własną regułę o zasadach linii |

## Out of scope

- Zmiana linii `Projects` i `Tasks` w sekcji `## Backlog`.
- Zmiana treści rulebooka vaultu.
