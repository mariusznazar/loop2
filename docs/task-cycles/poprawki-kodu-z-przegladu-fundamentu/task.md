---
title: "loop2: cztery poprawki kodu i nazw z przeglądu fundamentu"
status: draft
created: 2026-11-13
updated: 2026-11-13
tags: [zadanie]
related: "the Loop project note in the author's backlog"
---

# loop2: cztery poprawki kodu i nazw z przeglądu fundamentu

Status: ready for cycle
Project relation: independent

## Description

### Need

- Przegląd fundamentu z 13.11.2026 znalazł dwa miejsca, w których kod łamie wpis fundamentu, i dwie nazwy, które wprowadzają w błąd.
- Gracz, któremu błąd wyleci z kodu zapisu przed wysłaniem żądania, traci zapisywanie do odświeżenia strony, a „Wyloguj” wisi na „Wylogowywanie…”.
- Postać zmarła w minucie odkrycia stoi w symulacji „w pauzie” wbrew niezmiennikowi `player-map-run-pace` i D-122; dziś gracz tego nie widzi, przyszły element ekranu, który sprawdzi pauzę przed śmiercią, to pokaże, a test tego nie złapie.
- Słowo „Siedziba” znaczy dziś i ekran, i miejsce postaci poza przejściem i pętlą — grozi narysowaniem w obozie postaci, która jest w przejściu.
- Token koloru iskier sceny `--scene-speck-bronze` nazwany kolorem łamie D-48 i stanie się precedensem.
- Decyzje zapadły w przeglądzie; propozycje stoją w the note of the review of the foundation of 2026-11-13 in the author's backlog, sekcja 1.

### To do

1. F-11 — przejście, które skończyło się śmiercią w minucie odkrycia, nie stoi w pauzie: tak jak przy ukończeniu, odkrycie zostaje w stanie gry (okno końca przejścia je nazywa, D-122), a pauzy nie ma (dziś `src/browser/sim/game.ts:827` omija pauzę tylko przy ukończeniu). Test niezmiennika `tests/invariants/test_player_map_run_pace.py` dostaje scenariusz ze śmiercią w minucie pierwszego wychłodzenia (minuta 84), a jego opis traci wyłączenie „real time passed to a map run ended in the character's death” i odsyłacz do `minute-span-split` w punkcie „until it ends”.
2. F-26, część kodu (uwaga loop2#62-4) — wyjątek z kodu zapisu przed wysłaniem żądania (`src/browser/view/game-saver.ts`, `sendNow`: odczyt stanu, `withSaveTime`, `savedGame`, a także odrzucenie obietnicy `saveGame` przed wysłaniem) nie zatrzymuje zapisu na stałe i nie zostawia „Wyloguj” na „Wylogowywanie…”: liczy się jak nieudany zapis — zdanie D-208 „Nie udało się zapisać postępu. Gra spróbuje ponownie.” (przy zapisie przed wylogowaniem zdanie D-97 „Nie udało się zapisać postępu. Spróbuj wylogować się ponownie.”), ponowne próby w rytmie D-208, a wylogowanie dostaje porażkę, więc „Wyloguj” znów działa; sam błąd dalej trafia do obsługi D-323. Przypadki testu w `tests/view/game-saver.test.mjs`: zwykły zapis i zapis przed wylogowaniem.
3. F-26, część wpisu — D-323 dostaje jedno zdanie pierwszeństwa: po błędzie, którego nie obsłużył żaden kod gry, każda decyzja o grze, która idzie dalej, ustępuje D-323.
4. F-32 — hasło słownika `headquarters` dostaje *Not*: „Siedziba” nie nazywa miejsca, w którym stoi postać; to miejsce — postacie, które nie są ani w ręcznym przejściu, ani w pętli zarobkowej — nazywa się „at the camp” / „w obozie”. Przepisane zostają wszystkie użycia „Siedziby” w tym drugim znaczeniu: D-389 (`foundations/decisions.md:9509` „the characters that are in Siedziba”), `guidelines/styleguide-browser-view.md:804` i `:811`, komentarze `src/browser/view/camp-picture.ts:25,60,62`, `camp.tsx:4,70`, `headquarters.tsx:4`, `src/browser/sim/data/scene.ts:310`, nazwy i komentarze testów `tests/view/camp-picture.test.mjs:31,33,47,60`, oraz funkcja `inSiedziba` (`camp-picture.ts:64`, użycie `:71`) dostaje nazwę od nowego słowa.
5. F-39 — token `--scene-speck-bronze` i odcień `bronze` oraz `--scene-speck-ember` i odcień `ember` dostają nazwy roli w efekcie: `--scene-speck-bright` / `bright` (dziś `ember`, kontrast 4,2:1) i `--scene-speck-faint` / `faint` (dziś `bronze`, 3,3:1): `src/browser/tokens.css:92-93`, `src/browser/styles.css:2403-2408`, typ `SceneSpeckShade` z jego komentarzem („the name of a colour of the scene's palette”) i 12 wpisów danych w `src/browser/sim/data/scene.ts:249-271`, test `tests/view/scene-picture.test.mjs:1204`. Wartość koloru i jej źródło w komentarzu tokenu zostają.

### Questions to settle

- Co gracz widzi, gdy kod zapisu rzuci wyjątek, zanim żądanie wyjdzie?
  - Answer: wyjątek liczy się jak nieudany zapis — zdanie D-208 (przy wylogowaniu zdanie D-97), ponowne próby po 5, 10 i 20 s, wylogowanie zgłasza porażkę i „Wyloguj” znów działa; błąd i tak trafia do D-323, więc gra staje, a ponowna próba wysyła ostatni stan sprzed błędu. Zmienia D-208 i D-97.
  - Not chosen:
    - tylko zdjąć blokadę, bez zdania o nieudanym zapisie i bez ponownych prób — najmniej kodu i D-208 bez zmian, ale gracz nie wie, że ostatni zapis nie poszedł, a stan idzie dopiero przy „Wyloguj” albo po ukryciu karty.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13, słowa: „1 a, 2 a, 3 a”
- Jak się nazywają oba odcienie iskier po zmianie nazwy?
  - Answer: `bright` i `faint` — zmieniają się oba, tokeny `--scene-speck-bright` i `--scene-speck-faint`, nazwy od roli w efekcie, jak `--scene-tint-cool` i `--scene-tint-warm`.
  - Not chosen:
    - `ember` zostaje, `bronze` → `cinder` — najmniejsza zmiana, ale obie nazwy dalej brzmią jak kolory i nic nie mówią o roli.
    - `ember` zostaje, `bronze` → `faint` — najmniejsza zmiana z nazwą roli, ale para niespójna: jedna od rzeczy, druga od roli.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13, słowa: „1 a, 2 a, 3 a”
- Które zadanie poprawia opis testu `tests/invariants/test_player_map_run_pace.py:50-51` — to, czy the task note on the wording of the foundation in the author's backlog (jego punkt 5 w opisach testów)?
  - Answer: to zadanie; punkt 5 wykreślony z the task note on the wording of the foundation in the author's backlog w tej samej sesji.
  - Not chosen:
    - tamto zadanie — opis testu mówiłby „śmierci nie sprawdzam”, choć scenariusz tego zadania ją sprawdza, aż do scalenia tamtego.
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13, słowa: „1 a, 2 a, 3 a”

## Context

- Dane przeglądu: the note of the review of the foundation of 2026-11-13 in the author's backlog — F-11, F-26, F-32, F-39 i uwaga loop2#62-4; decyzje z 13.11.2026 podjął doradca dnia z upoważnienia Mariusza.
- Kod czytany przy commicie `fc00c406` (scalenie PR #88).
- F-11: `src/browser/sim/understanding.ts:274-276` dopisuje pierwsze wychłodzenie przed `if (after.death) return found;`, więc śmierć w minucie pierwszego wychłodzenia daje dziś martwą postać z `paused: true`; widok sprawdza śmierć przed pauzą (`status-row.ts:20`, `scene-picture.ts:201`).
- F-26: w `sendNow` `inFlight = true` stoi przed `read()`, `withSaveTime(...)` i `savedGame(...)`, a `inFlight = false` tylko w `answered` (`game-saver.ts:167`); `.then` nie ma obsługi odrzucenia. Przy wylogowaniu `saveBeforeLogout` zostawia nierozwiązaną obietnicę, a `logOut` w `src/browser/view/app.ts:525-540` zostaje z `logoutWaiting = true`, więc kolejne „Wyloguj” nic nie robi.
- F-26: błąd, który wyleci z `sendNow` dalej, łapie `src/browser/view/last-resort.ts` (zdarzenia `error` i `unhandledrejection`) i uruchamia tryb D-323.
- F-26: ścieżkę D-323 w `app.ts` i `account-card.tsx` przepisuje zadanie the task note on moving the view to React in the author's backlog (grupa G-2 przeglądu); to zadanie zmienia D-323 tylko zdaniem pierwszeństwa, żeby wpis zmieniać raz.
- F-32: D-330 i inne decyzje mówią „a character in Siedziba” o postaci na liście ekranu Siedziba — to znaczenie ekranu, zostaje.
- F-39: tokeny sceny nazywają się już według roli w efekcie (`--scene-tint-cool`, `--scene-tint-warm`, `--scene-frost-fill`), a `--scene-speck-ember` ma kontrast 4,2:1, `--scene-speck-bronze` 3,3:1 wobec śniegu polany (komentarze `src/browser/tokens.css:92-93`).

## Questions carried to cycle

none

## Human actions

none

## Decisions in play

- `player-map-run-pace` (`foundations/invariants.md:198`), kod poprawiany do wpisu, wpis bez zmiany: „…and a game minute in which something is discovered leaves the map run paused unless the map run ends in it, the real time passed in the same call beyond that game minute moving it on by no game minute.”
- D-122 (`foundations/decisions.md:2376`), bez zmiany: „Where the map run ends in a completion or a character's death in the game minute of a discovery, the end-of-run window (D-368) takes the place of the pause and names that discovery in its part about what happened, with the text of the band in the role `discovery` and with „Dodaj regułę z tym”, until „Restart” or „Zakończ”, and the band does not stand.”
- D-323 (`foundations/decisions.md:8030`), zmieniana — dostaje zdanie, że po błędzie każda decyzja o grze, która idzie dalej, ustępuje D-323; obecne zdanie wiążące: „After an error that no code of the game handled, an exception or a rejected promise, the game state held in the page changes no more until the page is reloaded, and saving goes on as D-207, D-208 and D-97 give it, sending the last whole game state from before the error, which it reads without a new reading of the clock; …”
- D-207 (`foundations/decisions.md:4012`), bez zmiany: „…the browser has at most one save request in flight, each sent with `keepalive`, and a moment of saving during one is sent after its answer, unless that request is the save before a logout that goes on…”
- D-208 (`foundations/decisions.md:4076`), zmieniana — wyjątek z kodu zapisu, zanim żądanie wyjdzie, liczy się jak nieudany zapis (pytanie 1); obecne zdanie: „When one fails, the header line under the menu bar shows „Nie udało się zapisać postępu. Gra spróbuje ponownie.” in `warning`, or, once the save before a logout has failed, the sentence D-97 gives for that failure, and the game retries the save after 5, 10 and 20 real seconds and then every 30 real seconds…”
- D-97 (`foundations/decisions.md:1953`), zmieniana — zapis przed wylogowaniem, który padł na wyjątku z kodu zapisu przed wysłaniem żądania, zatrzymuje wylogowanie tak jak brak połączenia (pytanie 1); obecne zdanie: „When that save fails for want of a connection or by an error of the server, logout does not happen and the game stays with „Nie udało się zapisać postępu. Spróbuj wylogować się ponownie.” in `warning`…”
- D-389 (`foundations/decisions.md:9503`), zmieniana — „the characters that are in Siedziba” staje się „the characters at the camp”, znaczenie bez zmiany: „…with a burning campfire in the middle, the chest and the characters that are in Siedziba, … The characters that stand in it are those that are neither in a manual map run, going, paused or ended and waiting for „Restart” or „Zakończ”, nor in an earning loop…”
- D-330 (`foundations/decisions.md:8135`), bez zmiany (znaczenie ekranu): „…no button at a character in Siedziba leads to the screen Mapy.”
- D-48 (`foundations/decisions.md:1096`), bez zmiany, kod poprawiany do wpisu: „…every other value of appearance is a custom property named by what it is for, never by its colour or by its number alone.”
- Słownik `headquarters` (`foundations/glossary.md:87`), zmieniany — dostaje *Not*: „The headquarters is the screen Siedziba, which shows the player's team with its characters and its chest. — **Not:** none”

## Settlements to record

Candidates: 6 shown, 2 accepted — 2026-11-13

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Wyjątek z kodu zapisu, zanim żądanie wyjdzie, liczy się jak nieudany zapis: zdanie D-208, a przy wylogowaniu zdanie D-97, ponowne próby i wylogowanie zatrzymane; błąd dalej idzie do D-323 (zmienia D-208 i D-97). | decision | pytanie 1 w *Questions to settle* (wybór człowieka) | czy wyjątek przed wysłaniem pokazuje zdanie nieudanego zapisu i uruchamia ponowne próby, czy tylko zdejmuje blokadę |
| 2 | Postać jest „at the camp” / „w obozie”, gdy nie jest ani w ręcznym przejściu (idącym, w pauzie albo skończonym i czekającym na „Restart” lub „Zakończ”), ani w pętli zarobkowej; „Siedziba” nazywa tylko ekran. | glossary term | To do 4; decyzja F-32 w the note of the review of the foundation of 2026-11-13 in the author's backlog | czy nowe słowo dostaje własne hasło słownika, czy żyje tylko w *Not* hasła `headquarters` i w D-389 |

## Out of scope

- Ścieżka po nieobsłużonym błędzie w `app.ts` i `account-card.tsx` (D-323) — niesie ją the task note on moving the view to React in the author's backlog.
- Pozostałe opisy i znaczniki testów z sekcji 4 przeglądu — niesie je the task note on the wording of the foundation in the author's backlog.
- Użycia „Siedziby” w znaczeniu ekranu, w tym D-330.
