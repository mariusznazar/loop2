---
title: "loop2: repozytorium przestaje odsyłać do vaultu i prywatnego repozytorium Loop — uzasadnienia i wymagania do fundamentu"
status: draft
created: 2026-11-11T10:05
updated: 2026-11-11
tags: [zadanie]
related: "(P) Loop"
---

# loop2: repozytorium przestaje odsyłać do vaultu i prywatnego repozytorium Loop — uzasadnienia i wymagania do fundamentu

Status: ready for cycle
Project relation: independent

## Description

### Need

- Repozytorium loop2 jest publiczne, a jego pliki odsyłają do miejsc, do których czytelnik nie sięga: notatek z vaultu Mariusza i prywatnego repozytorium starego Loopa.
- Na 362 decyzje w `foundations/decisions.md` 301 wskazuje w *Origin* notatkę z vaultu (dokumenty zadań, definicje MVP i MVP2, koncepcję projektową, dokumenty rozpoznania), a 61 ma `none` (loop2 `952fbd0`).
- Te 301 wpisów wskazuje razem 54 różne notatki; 38 z nich już nie istnieje, bo rulebook każe kasować notatkę zadania po jego domknięciu, więc 365 z 508 wskazań prowadzi donikąd (stan vaultu 2026-11-11); wszystkie 38 są w historii gita vaultu (sprawdzone 2026-11-11 dla każdej).
- D-82 każe testom brać oczekiwania z dokumentów zadań i definicji MVP w vaulcie, a komentarzowi testu wskazywać plik i linię, więc około 45 linii w 26 plikach poza decyzjami nazywa notatki z vaultu: komentarze testów (np. `// odkrywanie_loop2.md:21` w `tests/sim/data.test.mjs`), `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/tokens.css` i *Derives from* niezmiennika `action-duration-minimum`.
- Komentarz testu wskazuje notatkę także tam, gdzie fundament już niesie to samo wymaganie: wiersz `odkrywanie_loop2.md:21` mówi to, co D-121; część wymagań sprawdzanych przez testy (np. „Wędruj” woli nieodkryty sąsiedni kafelek, `tests/sim/actions.test.mjs:181`; zakres 0–100 warunku „Energia natury poniżej”, `tests/sim/conditions.test.mjs:298`) jest tylko w notatkach.
- D-362 pozwala wprost, by plik nazywał notatkę i jej katalog w notatkach.
- Komentarze w `src/browser/styles.css`, `tests/view/scene-picture.test.mjs` i `tests/view/scene.test.mjs` oraz *Source* faktu `pixel-crawler-terms` odsyłają do plików repozytorium starego Loopa, które jest prywatne (GitHub, sprawdzone 2026-11-11).
- Agent w loop2, który chce zrozumieć, dlaczego decyzja zapadła albo skąd test bierze oczekiwanie, dostaje nazwę pliku, którego nie ma albo do którego nie sięga; Mariusz, wracając do decyzji po miesiącach, znajduje uzasadnienie tylko w skasowanej notatce.
- Bez tego zadania nowe wpisy przestaną wskazywać vault, ale stare zostaną, coraz więcej z nich martwych, a D-82 i D-362 pozwalają nowym testom i wpisom dopisywać kolejne.

### To do

1. Każda decyzja, której *Origin* wskazuje notatkę z vaultu, ma w *Rationale* i *Rejected* całe uzasadnienie, jakie ta notatka niesie dla tej decyzji, a jej *Origin* czyta `none` albo wskazuje tylko to, co the way tam dopuszcza (np. plik repozytorium loop2 na ustalonym commicie). Treść skasowanej notatki bierze się z historii gita vaultu (`git log --all -- "*<nazwa>"`, potem `git show <commit>^:<ścieżka>`).
2. Punkt 1 obejmuje tak samo dokumenty wskazywane w *Origin*, które nie są dokumentami zadań i dalej istnieją (definicje MVP i MVP2, koncepcja projektowa, zakres i plan MVP2, dokumenty rozpoznania i technologii, research edytora programu, `mag_w_lesie_loop2.md`, `serwer_testowy_loop2.md`); żaden z nich nie przechodzi do repozytorium (pytanie 3).
3. D-82 mówi, że oczekiwania testów pochodzą z fundamentu; nie wskazuje dokumentów zadań, definicji MVP ani koncepcji projektowej (pytanie 1a).
4. D-362 nie pozwala już plikowi nazywać notatki i jej katalogu w notatkach; jej pierwsze zdanie, o pozycjach pliku lokalizacji i braku ścieżek bezwzględnych, zostaje (pytanie 2).
5. Każdy komentarz w testach i kodzie, który wskazuje notatkę z vaultu albo plik prywatnego repozytorium starego Loopa: informacja ważna dla kodu, której fundament nie niesie, przechodzi do fundamentu; komentarz, który nie niesie istotnej informacji, znika (pytanie 1a).
6. `guidelines/testing.md` (akapit o dokumentach źródłowych i komentarzu wskazującym plik i linię, linie 90–102 na `952fbd0`) mówi to samo co nowa D-82: oczekiwanie testu pochodzi z fundamentu, a komentarz nie wskazuje dokumentu spoza repozytorium; innych znaczeń wytycznych testów zadanie nie zmienia.
7. `guidelines/styleguide-browser-view.md:333-335` i nagłówek `src/browser/tokens.css:1-7` nie wskazują notatki `styleguide_loop2.md`; to, co z niej ważne, stoi w fundamencie albo w samym przewodniku stylu. Komentarze `Source:` w `src/browser/tokens.css` (55 z 63 kończy wskazanie „(the task, Q…)”) zachowują swoje źródło — stronę gry loop z datą odczytu albo próg z D-42 — bez wskazania notatki; komentarz `Source:` przy każdej deklaracji zostaje, bo wymaga go niezmiennik `design-token-sources`. Lista rodzajów źródła w przewodniku stylu (`guidelines/styleguide-browser-view.md:336-352` na `952fbd0`) nie nazywa zadania: „wybór Mariusza z tego podglądu, z nazwą zadania i datą wyboru” staje się wyborem Mariusza z podglądu z datą wyboru, a „ustalenie zadania” — wyborem Mariusza z datą; komentarze `Source:` tych rodzajów w `src/browser/tokens.css` idą za tym (pytanie 6).
8. *Derives from* niezmiennika `action-duration-minimum` nie wskazuje notatki `wprawa_i_drzewa_loop2.md`, tylko decyzję fundamentu; dziś żadna decyzja nie niesie zdania, z którego niezmiennik wynika („Akcja skrócona gałęziami trwa co najmniej jedną minutę gry.”, wiersz 7 *Settlements to record* tamtej notatki), więc cykl zapisuje je jako decyzję.
9. *Source* faktu `pixel-crawler-terms` wskazuje warunki paczki Pixel Crawler w miejscu, do którego czytelnik sięga; gdy takiego nie ma, cykl pyta Mariusza.
10. Zmiany wpisów fundamentu idą skillami zapisu the way (`the-way-record-decision`, `the-way-record-invariant`, `the-way-record-environment-fact`), nie ręczną edycją.

### Questions to settle

- Pytanie 1: Czy zadanie obejmuje tylko pola *Origin* decyzji, czy wszystkie wskazania notatek z vaultu w repozytorium — także D-82, która każe testom brać oczekiwania z dokumentów zadań w vaulcie, komentarze testów, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/tokens.css` i *Derives from* niezmiennika `action-duration-minimum`?
  - Answer: wszystkie wskazania notatek z vaultu w plikach śledzonych loop2, w jednym zadaniu (B).
  - Not chosen:
    - A. tylko *Origin* — D-82 dalej każe nowym testom pisać komentarze z nazwą notatki, martwych wskazań w testach przybywa, WAY-27 zostaje złamane w ~25 plikach;
    - C. tutaj tylko *Origin*, D-82 i komentarze osobnym zadaniem — Mariusz: „kurde co Wy macie z tymi osobnymi zadaniami”.
  - Source: Mariusz, 2026-11-11: „B” — na pytanie „czy to zadanie obejmuje tylko pola *Origin* decyzji, czy wszystkie wskazania notatek z vaultu w repozytorium?”
- Pytanie 1a: Skąd po zmianie D-82 testy biorą oczekiwania i co mówi komentarz testu, który dziś wskazuje notatkę zadania (np. `// odkrywanie_loop2.md:21` w `tests/sim/data.test.mjs`)?
  - Answer: oczekiwania testów pochodzą z fundamentu. Komentarz, który niesie informację ważną dla kodu, przechodzi do fundamentu; komentarz, który nie niesie istotnej informacji, znika — kod ma być zrozumiały sam, a komentarz wskazujący źródło oczekiwania nie jest potrzebny.
  - Not chosen:
    - A. komentarz wskazuje kopię dokumentu zadania w zapisie cyklu w historii gita loop2 (`docs/task-cycles/<nazwa>/task.md:<linia> at <commit>`) — Mariusz: „przecież po to mamy fundament, decyzje, niezmienniki a odsyłamy do zadań?”;
    - B. komentarz sam streszcza wymaganie, bez wskazania — nikt nie sprawdzi, czy streszczenie jest wierne;
    - zostawić jak jest — testy wskazują notatki, które znikają po zamknięciu zadania.
  - Source: Mariusz, 2026-11-11: „kod powinien być napisany tak, żeby sam był zrozumiały - jeśli komentarz // odkrywanie_loop2.md:21 ma przekazywać jakąś informację ważną dla kodu to powinien być w fundamencie, jeśli nie niesie żadnej istotnej informacji, to nie potrzebujemy takiego gówna wcale” oraz „dla 2+2=4 zapisywalibyśmy w takim przypadku że źródłem jest funkcja w oprogramowaniu kalkulatora?”
  - Uwaga: zmienia D-82, która odrzuciła „Foundation alone — forces every expected number into a decision”, i akapit `guidelines/testing.md:90-102` o dokumentach źródłowych i komentarzu wskazującym plik i linię.
- Pytanie 2: Co z regułą zadania „loop2: miejsca z dysku Mariusza przenieść z plików repozytorium do pliku lokalizacji ~/.the-way/locations.json”, że nazwy notatek i ich katalogów zostają w plikach śledzonych (jego odpowiedź na pytanie 2 z 2026-11-09 i wiersz 1 *Settlements to record*)?
  - Answer: ta reguła ustępuje pytaniom 1 i 1a tego zadania (A). Mariusz wybrał 2026-11-11 wchłonięcie tamtego zadania; w trakcie tego doprecyzowania tamto zadanie przeszło jednak swój cykl i weszło do loop2 (PR #76, `952fbd0`), z regułą zapisaną jako drugie zdanie D-362, więc z wyboru zostaje zmiana D-362 (punkt 4 *To do*), a reszta tamtego zadania jest zrobiona.
  - Not chosen:
    - B. zostawić tamto zadanie osobno i je poprawić — dwa cykle kolejno ruszają `AGENTS.md`, D-82 i wytyczne testów;
    - C. zostawić tamto zadanie bez zmian — jego cykl zapisze decyzję „plik może nazwać notatkę”, którą to zadanie odwraca.
  - Source: Mariusz, 2026-11-11: „A” — na pytanie „co robimy z zadaniem o ścieżkach?”; PR #76 loop2, scalony 2026-11-11.
- Pytanie 3: Co z 15 dokumentami wskazywanymi w *Origin*, które nie są dokumentami zadań i dalej istnieją — definicje MVP i MVP2, koncepcja projektowa, zakres i plan MVP2, dokumenty rozpoznania i technologii, research edytora programu, `mag_w_lesie_loop2.md`, `serwer_testowy_loop2.md`?
  - Answer: opisać we wpisach, tak jak notatki zadań (A): to, co dokument wnosi do decyzji, przechodzi do *Rationale* i *Rejected*, a *Origin* czyta `none`; żaden dokument z vaultu nie przechodzi do repozytorium.
  - Not chosen:
    - B. dokumenty rozpoznania i technologii przenieść do repozytorium (np. `docs/research/`) i wskazywać w *Origin* — robocze notatki badawcze stają się publiczne, a w repozytorium powstaje drugi zbiór dokumentów obok fundamentu;
    - C. przenieść wszystko, także definicje i koncepcję — publiczne repozytorium dostaje warsztat Mariusza i drugie źródło prawdy obok fundamentu.
  - Source: Mariusz, 2026-11-11: „A” — na pytanie „Którą drogę wybierasz?” o dokumenty, które dalej istnieją.
- Pytanie 4: Jedna zmiana czy kilka partiami?
  - Answer: jedno zadanie i jeden request (A); podział pracy na części, np. według notatki źródłowej, zostaje planowi cyklu.
  - Not chosen:
    - B. kilka zadań według grup notatek (np. MVP1, MVP2, serwer i konta, reszta z D-82 i testami) — mniejsze requesty, ale tyle pełnych cykli, ile grup.
  - Source: Mariusz, 2026-11-11: „A” — na pytanie „Którą drogę wybierasz?” o jedną zmianę albo kilka.
- Pytanie 5: Czy źródło wartości w pliku tokenów może nazywać zadanie — rodzaje „wybór Mariusza z tego podglądu, z nazwą zadania i datą wyboru” i „ustalenie zadania” w `guidelines/styleguide-browser-view.md:344-351`?
  - Answer: nie (A): źródło mówi tylko, skąd wartość pochodzi — strona gry loop z datą odczytu, próg z D-42, wybór Mariusza z podglądu z datą; „ustalenie zadania” staje się wyborem Mariusza z datą.
  - Not chosen:
    - B. nazwa zadania z datą zostaje, znika tylko wskazanie numerów pytań „(the task, Q9)” — komentarz dalej odsyła do zadania, do którego czytelnik nie sięga.
  - Source: Mariusz, 2026-11-11: „A” — na pytanie „czy źródło wartości w pliku tokenów może nazywać zadanie?”

## Context

- Przypięcie `.the-way` w loop2 stoi od PR #76 na `52f8164`, które zawiera nową regułę *Origin* (the way PR #97, `024f486`).
- Reguła pola w szablonie decyzji the way (`.the-way/elements/decisions/template.md`, sekcja „Origin”, `52f8164`): „*Origin* points to where the full reasoning lives: a research document, a design document, a merge request, a ticket, or a file at a fixed commit — never to anything deleted when its task closes. When the whole reasoning is in the entry, it is `none`. Documents go in *Origin*; *Based on* names sources about the world. The task a decision was made in is not recorded, and a task document is never named in *Origin*, wherever the product keeps its tasks: the place of tasks is where work is found, never a source an entry points to (WAY-27). What it holds of the reasoning goes into the entry's *Rationale* and *Rejected*; *Origin* then reads `none`.”
- WAY-27 the way: „Nothing in this repository points to a source outside it that its readers cannot reach: every entry carries its whole reasoning, and what is seen only in such a source is described in the entry instead of being pointed to.”; jego *Verification* podaje jako naruszenie „*Origin* points to a private note”.
- Jedna decyzja (`foundations/decisions.md:998`) wskazuje w *Origin* obok notatki także plik `docs/task-cycles/styleguide-loop2/spec.md` na commicie `b0c4d44` repozytorium loop2 — to jest „file at a fixed commit”, które reguła dopuszcza.
- Notatki `zadanie_odtwarzanie_bazy_z_kopii_loop2.md` (2 wskazania) i `zadanie_loop2_lokalizacje_poza_repozytorium.md` (*Origin* D-362) jeszcze istnieją, ale ich zadania zamknięto 2026-11-11, więc znikną jak pozostałe.
- Cykl kopiuje dokument zadania do zapisu `docs/task-cycles/<nazwa>/task.md` w loop2; kopia znika z drzewa przy zamknięciu cyklu, ale zostaje w historii gita — takie kopie ma ponad 40 cykli (sprawdzone 2026-11-11).
- Niezmiennik `tracked-file-private-paths` (z PR #76) łapie tylko ścieżki bezwzględne i, w plikach Markdown, linki `…`; nazwy notatek w rodzaju `plomyk_loop2.md` przepuszcza.
- Historia gita loop2 zachowuje usunięte nazwy notatek.

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- D-82 — „Test expectations may come from the loop2 foundation, accepted task documents in the folder that the entry `projects` under `loop2` in the locations file names, and in its `_zadania/` directory in state ready for cycle or completed, and the approved `definicja_mvp_loop2.md` there. The draft `koncepcja_projektowa.md` is a source only in a passage quoted by an accepted document; a test comment locating a documentary expectation names its file and line.” (`foundations/decisions.md:1546` na `952fbd0`). Zmiana, którą robi zadanie (pytanie 1a): oczekiwania testów pochodzą z fundamentu; informacja ważna dla kodu stoi w fundamencie, a komentarz testu nie wskazuje źródła oczekiwania. Jej *Rejected* „Foundation alone — forces every expected number into a decision” przestaje być drogą odrzuconą.
- D-362 — „loop2 names a place on the author's disk outside the repository, such as the folder of its projects in the notes and the list of its tasks, by the entry that stands for it under `loop2` in the locations file `~/.the-way/locations.json`, which are the entries `projects` and `tasks`, and no file git tracks holds an absolute path on that disk. A file may name a note and the folder it lies in within the notes, such as `Notes/Projects/(P) Loop/_zadania`, without a path on the disk.” (`foundations/decisions.md:8080` na `952fbd0`). Zmiana, którą robi zadanie (pytania 1, 1a i 2): drugie zdanie znika — żaden plik śledzony nie nazywa notatki ani jej katalogu w notatkach; *Rejected* D-362 „removing the names of the notes altogether — decisions lose the pointer to their reasoning […]” przestaje być drogą odrzuconą, bo uzasadnienie przechodzi do wpisów.
- D-80 — „A test of a game parameter, such as survival time, progress rate or map difficulty, may check calculations on concrete numbers, but takes its expectation from an agreed requirement. Current parameters or the simulation's current result are not themselves evidence of correctness.” (`foundations/decisions.md:1520`). Zadanie nie zmienia jej brzmienia; po zmianie D-82 uzgodnione wymaganie to wpis fundamentu.
- 301 decyzji, których *Origin* wskazuje notatkę z vaultu (`grep -n "in the vault" foundations/decisions.md` w liniach `- **Origin:**` na `952fbd0`): zadanie nie zmienia ich zdań wiążących, tylko *Rationale*, *Rejected* i *Origin*; przeniesienie uzasadnienia nie zmienia znaczenia decyzji.

## Settlements to record

Candidates: 7 shown, 3 accepted — 2026-11-11

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Oczekiwania testów pochodzą z fundamentu; komentarz, który niesie informację ważną dla kodu, przechodzi do fundamentu, a komentarz bez istotnej informacji znika — kod ma być zrozumiały sam (zmienia D-82). | decision | pytanie 1a | czy nowy test może dalej wskazać dokument zadania albo kopię zadania w zapisie cyklu jako źródło oczekiwania, i co D-82 mówi po zmianie |
| 2 | Żaden plik śledzony loop2 nie odsyła do miejsca, do którego czytelnik publicznego repozytorium nie sięga — notatki z vaultu Mariusza, ścieżki na jego dysku ani pliku prywatnego repozytorium; co ważne, stoi w fundamencie (zmienia D-362). | decision | pytania 1, 2 i 3 | czy następny wpis albo komentarz może znów nazwać notatkę z vaultu albo plik starego Loopa, jak dziś pozwala drugie zdanie D-362 |
| 3 | Żaden plik śledzony loop2 nie nazywa notatki z vaultu Mariusza ani pliku prywatnego repozytorium starego Loopa; sprawdza to agent przy przeglądzie zmiany (metoda `review`), bo niezmiennik `tracked-file-private-paths` łapie tylko ścieżki bezwzględne i linki `…`. | invariant | wyprowadzony z wiersza 2 i z działania `tracked_private_paths_check.py`; Mariusz, 2026-11-11: „przyjmuję tak jak rekomendujesz” | czy przegląd zmiany w ogóle sprawdza nowe komentarze w rodzaju `// plomyk_loop2.md:22`, które `tracked-file-private-paths` przepuszcza |

## Out of scope

- Usunięcie nazw notatek z historii gita loop2.
