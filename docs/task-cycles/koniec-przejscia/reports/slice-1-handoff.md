# Handoff — slice 1 of the task koniec-przejscia

You make one slice of a planned change. Work from the worktree  (branch `task/koniec-przejscia`; run every command from its root, never touch the main checkout `a repository on the author's disk`). Another agent reviews it afterwards; the cycle's orchestrator runs the product's gate, you do not.

## Delegation

The human who requested this cycle delegated intermediate choices to the orchestrator; your questions go to it in your report (status `questions` or `blocked`). Nothing you decide is the human's approval.

## Method and variant

Read whole `.the-way/task-cycle/change/SKILL.md`. Your variant is "a slice, or the retry of a slice": read `.the-way/task-cycle/change/slice.md` for how to read the plan and the task. Read `.the-way/task-cycle/change/ui_check.md` when you alter what a screen shows (section 3), and the other files that `SKILL.md` names only when the step that names them comes.

## Stage and boundary

Stage: slice 1 of the plan; boundary: the slice's own goal and its files (*Change*). The base of the slice is `c730482` (`git rev-parse HEAD`). Commit your work on this branch by path (never `git add -A`), commit messages in English in the form of the repository's history. Report path: `docs/task-cycles/koniec-przejscia/reports/slice-1-report.md`.

## Answers of the cycle's start

- Trust boundary: yes — `src/browser/sim/saved-game.ts` is a trust boundary of the part `simulation`.
- Irreversible operation: no.
- No spec; no move of the pin.
- Checks failing on the base (before any change): `tests/account-mail.test.mjs:350` "a server that stops answering yields failed within the shortened deadline and loses the connection" failed in one whole run and passes alone (a timing-dependent test, not yours); two tests of `tests/quality` failed only because the worktree had no `.runs/quality-venv` (now present). Everything else passed. Do not run the gate.
- The foundation entries of the task are written (commits `e0fd091`, `c730482`): the plan's "(new)" entry is D-362 and the changed decisions are in the tree as you read them now.

## Your slice, copied word for word from the plan

### Slice 1 — A manual map run keeps its record of the end, and the save is version 4

- **Goal:** A manual map run keeps, from its start to its end and through the saved document, what the end of the map run needs, and the document is version 4. In `src/browser/sim/types.ts` the type `GameMapRun` gains three fields: `longestStreak` (the greatest value `streak` held at the end of a game minute of this map run; at least `streak`, at most `minute`), `minutesByAction` (the game minutes of the map run by what the character was doing, a record over a closed list — the kinds of the data's ordinary actions (those of the type `Action` that are not combat-only), `wait` and `combat`; each game minute passed counts once, to what the character was doing at its start — `combat` while a fight goes on, else its current activity's action kind or `wait` — so the counts sum to `minute`, the game minute of a death and of a completion included) and `enteredWith` (the entries `{item, count}` of the backpack the send gave the character, in the order of the data's items, none with count 0; bound when the map run starts and again at „Restart”, kept unchanged to the end, in the saved document and back). A new file `src/browser/sim/run-record.ts` holds the pure functions that give a record its start from the entry backpack and give its next value from the map run before a game minute and after it; `startRun` in `src/browser/sim/game.ts` binds the record, `advanceMinutes` updates it after every game minute it passes and carries it into the map run it returns, and `restart`, `end`, `settleDeath` and the editing functions leave it as they find it. Earning loops (the plain `MapRun`) keep none of it and `src/browser/sim/run.ts` is not changed. `SAVED_GAME_VERSION` rises from 3 to 4 in `src/browser/sim/saved-game.ts` (D-206), the document of the load reads the three fields strictly under `guidelines/coding-saved-game.md` — every key present and no foreign one, the keys of `minutesByAction` from the closed list, counts safe whole numbers, the sum equal to `minute`, `longestStreak` inside its bounds, `enteredWith` read as the lists `tripList` reads with an item of the data and a count from 1 — and a document of version 3 is refused whole as `version`. A map run that ended in death or a completion loads back whole with the three fields (To do 10). The list of the fields a `GameMapRun` adds to a `MapRun` in `tests/sim/loop.test.mjs` gets the three. The change touches the trust boundary of the part, so it gets a review of its own.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/run-record.ts` · `src/browser/sim/game.ts` · `src/browser/sim/saved-game.ts` · `tests/sim/run-record.test.mjs` · `tests/sim/saved-game.test.mjs` · `tests/sim/loop.test.mjs`
- **Read:** `docs/task-cycles/koniec-przejscia/task.md:33-33` To do · `docs/task-cycles/koniec-przejscia/task.md:39-40` To do · `docs/task-cycles/koniec-przejscia/task.md:43-43` To do · `docs/task-cycles/koniec-przejscia/task.md:73-78` Question 4 · `docs/task-cycles/koniec-przejscia/task.md:86-88` Question 6 · `docs/task-cycles/koniec-przejscia/task.md:139-143` Questions carried to cycle · `docs/task-cycles/koniec-przejscia/task.md:165-167` Decisions in play, D-135 · `docs/task-cycles/koniec-przejscia/task.md:226-226` Settlements to record, row 5 · `foundations/decisions.md:1397-1410` D-71 · `foundations/decisions.md:2589-2606` D-135 · `foundations/decisions.md:2608-2635` D-136 · `foundations/decisions.md:3297-3310` D-179 · `foundations/decisions.md:3431-3444` D-189 · `foundations/decisions.md:3446-3459` D-190 · `foundations/decisions.md:3717-3741` D-206 · `foundations/decisions.md:3743-3803` D-207 · `foundations/decisions.md:3805-3823` D-208 · `foundations/decisions.md:3929-3967` D-212 · `foundations/decisions.md:3969-4003` D-213 · `foundations/decisions.md:4005-4021` D-214 · `foundations/decisions.md:4124-4150` D-221 · `foundations/decisions.md:7460-7499` D-339 · `foundations/decisions.md:7742-7786` D-348 · row (new) — What does the end of a map run explain? · row D-135 · row D-212 · `foundations/part_map.md:30-60` simulation · `foundations/invariants.md:165-174` map-run-repeatability · `foundations/invariants.md:214-234` simulation-isolation, simulation-inputs · `foundations/invariants.md:409-417` eslint-source-rules · `foundations/invariants.md:439-447` prettier-source-format · `foundations/invariants.md:529-537` minute-span-split · `foundations/invariants.md:959-967` trip-transfer · `foundations/invariants.md:1029-1037` save-version · `foundations/invariants.md:1039-1047` solved-map-manual-run · `foundations/invariants.md:1059-1067` death-settled-once · `foundations/invariants.md:1139-1147` catch-up-state · `foundations/glossary.md:18-23` map run · `foundations/glossary.md:130-134` manual map run · `foundations/glossary.md:136-140` completion · `foundations/glossary.md:149-154` streak · `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/coding-saved-game.md` · `guidelines/testing.md` · `src/browser/sim/run.ts:63-102` · `src/browser/sim/run.ts:355-418` · `src/browser/sim/run.ts:517-785` · `src/browser/sim/trip.ts` · `src/browser/sim/data/actions.ts:1-48` · `src/browser/sim/data/balance.ts` · `tests/sim/streak.test.mjs` · `tests/sim/program-fixture.mjs`
- **Model:** same — a strict reader at a trust boundary and a counting that must agree with the span-split invariant, both without an example to copy
- **Risk:** trust boundary — src/browser/sim/saved-game.ts
- **Checks:** The failing tests are written first: `tests/sim/run-record.test.mjs` (the longest streak stays after a loss of the streak by cold and by a change of the program; the minutes by kind sum to `minute` and put a fight in `combat` and a wait in `wait`; the record is the same however a span is split into calls; `enteredWith` is what the send took from the chest and what a run of a solved map took from nowhere, and again at „Restart”) and the new cases of `tests/sim/saved-game.test.mjs` (the document of version 4 with the three fields loads back from a map run that goes on, one that died and one that completed; a missing, foreign, mistyped or out-of-range field, a key outside the closed list, a sum other than `minute`, a `longestStreak` below `streak` or above `minute`, a repeated or unknown item in `enteredWith` are each refused as `shape`; the document of version 3 is refused as `version`). Then `npm test -- tests/sim/run-record.test.mjs` · `npm test -- tests/sim/saved-game.test.mjs` · `npm test -- tests/sim/loop.test.mjs` · `npm test -- tests/sim/death.test.mjs` · `npm test -- tests/sim/time.test.mjs` · `npm test -- tests/sim/catch-up.test.mjs` · `npm test -- tests/invariants/test_minute_span_split.py` · `npm test -- tests/invariants/test_map_run_repeatability.py` · `npm test -- tests/invariants/test_simulation_isolation.py` · `npm test -- tests/invariants/test_simulation_inputs.py` · `npm test -- tests/invariants/test_content_identifiers.py` · `npm run typecheck` · `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/sim tests/sim` · `node node_modules/prettier/bin/prettier.cjs --check src/browser/sim tests/sim`
- **Depends on:** Foundation entries rows D-135 · D-212 · Row 5

## Current ranges of the foundation entries named in *Read*

The foundation step wrote entries after the plan, so the ranges in the *Read* above moved; the current ones hold. Read each whole, its identifier is its address.

- D-71: foundations/decisions.md:1405-1418
- D-135: foundations/decisions.md:2621-2636
- D-136: foundations/decisions.md:2638-2665
- D-179: foundations/decisions.md:3327-3340
- D-189: foundations/decisions.md:3461-3474
- D-190: foundations/decisions.md:3476-3489
- D-206: foundations/decisions.md:3747-3771
- D-207: foundations/decisions.md:3773-3833
- D-208: foundations/decisions.md:3835-3853
- D-212: foundations/decisions.md:3959-4010
- D-213: foundations/decisions.md:4012-4046
- D-214: foundations/decisions.md:4048-4064
- D-221: foundations/decisions.md:4170-4196
- D-339: foundations/decisions.md:7529-7568
- D-348: foundations/decisions.md:7811-7855
- the plan's row (new) is D-362: foundations/decisions.md:8149-8162
- the plan's row D-135: the entry as written, foundations/decisions.md:2621-2636
- the plan's row D-212: the entry as written, foundations/decisions.md:3959-4010

## Passages of the task named in *Read*, copied word for word

#### task.md:33-33 To do

5. Przejście pamięta najdłuższą passę, jaką osiągnęło, a okno pokazuje ją pod tytułem wobec warunku mapy, jako „najdłuższa passa” z liczbami i paskiem w postaci paska celu z nagłówka (D-133), np. „najdłuższa passa 116/480” (D-135 w brzmieniu definicji).

#### task.md:39-40 To do

   - „Na co poszedł czas” — jeden pasek z legendą i procentami: każda czynność postaci z udziałem co najmniej 8% dostaje własny kawałek, najwyżej pięć, drobniejsze idą do „reszta”; „Idź”, „Idź — ognisko” i „Wędruj” łączą się w „W drodze”, czekanie stoi jako „Czeka”, a walka jako „Walka” (pytanie 7, wiersz e).
   - „Wyprawa i teren” — wiersze „weszła z” (przedmioty, z którymi postać weszła na mapę, albo „pustym plecakiem”), „odsłonięto {n} z {m} kafelków” i „w drodze {n} min” (pytanie 7, wiersz f).

#### task.md:43-43 To do

10. Zapis gry podnosi wersję raz, z 3 na 4, razem z nowymi polami stanu przejścia, których potrzebuje okno końca przejścia, tak żeby po wczytaniu wróciło całe poza „Ostatnimi minutami” (pytania 4 i 6); zapis innej wersji gra odrzuca w całości (D-206).

#### task.md:73-78 Question 4

- Pytanie 4. Co z końca przejścia stoi po wczytaniu zapisu gry (odświeżenie strony, nowe logowanie, inne urządzenie), skoro kronika, z której biorą się „Ostatnie minuty”, żyje w pamięci strony i po wczytaniu zaczyna się od akapitu ostatniego starcia (D-339)?
  - Answer: Wszystko poza „Ostatnimi minutami” wraca po wczytaniu ze stanu gry; „Ostatnie minuty” biorą się z kroniki, więc po wczytaniu pokazują to, co ona ma — zwykle nic, a sekcja wtedy nie stoi. D-338 i D-339 bez zmian, zapis rośnie o kilka liczb. Odpowiedź stoi na węższym odczycie D-212 w definicji: „with its screen after its end” to ekran końca, a nie każda jego sekcja, więc nie zmienia definicji.
  - Not chosen:
    - B. Stan gry trzyma też cztery ostatnie wpisy przed końcem, więc po wczytaniu koniec jest cały — wpisy kroniki powstają w widoku ze zdarzeń (D-348), więc symulacja musiałaby sama składać te teksty albo widok wpisywać je do stanu gry; zmienia D-339; więcej do zbudowania i sprawdzenia.
    - C. Po wczytaniu stoi tylko to, co dziś (zdanie o wskrzeszeniu i „Do skrzynki”) — po odświeżeniu znika najdłuższa passa i całe „dlaczego”, choć zadanie i tak podnosi wersję zapisu, a pole passy, które D-135 trzyma w stanie gry, nie byłoby po wczytaniu nigdzie pokazane.
  - Source: Mariusz, 2026-11-11: „A” — przedstawione z rekomendacją A przy węższym odczycie D-212. Materiał: D-212 w definicji („one that ended in a completion or in the character's death comes back with its screen after its end”), D-216 w definicji („until „Restart” or „Zakończ” and after a load too”), D-135 w definicji, D-339 w fundamencie przy f672c7b. Odczyt D-212 ma linię w planie (Change log, 2026-11-11, „zadanie 16 dołącza do wiersza D-212”, plan sha256 791422f7…).

#### task.md:86-88 Question 6

- Pytanie 6. Czy to zadanie podnosi wersję zapisu gry?
  - Answer: Tak, raz, w swojej zmianie: „liczby nie ustalamy z góry: każde zadanie, które zmienia kształt stanu gry, podbija wersję raz w swojej zmianie; pewne jest zadanie 16, zadanie 15 podbija, jeśli kronika wejdzie do zapisu, a zadania 9 i 25 mogą podbić; utratą zapisu przy podbiciu projekt na razie się nie przejmuje”. Zadanie 15 wersji nie podniosło, bo kronika żyje w pamięci strony (D-339), więc zapis jest dziś w wersji 3 (`src/browser/sim/saved-game.ts:75`, f672c7b).
  - Source: `plan_mvp2_loop2.md`, Open questions, „Ile razy projekt podbija wersję zapisu i w których zadaniach?” (human, 2026-11-01); D-135 w definicji, *Rationale*: „Accepted with it: one more field in the game state and a bump of the version of the save.”

#### task.md:139-143 Questions carried to cycle

- Jaką szerokość i najwyższą wysokość ma okno końca przejścia w oknach przeglądarki od 1280 × 720 i w jednej kolumnie poniżej 1074 px, zanim jego sekcje zaczną się przewijać?
- Jak okno przyjmuje fokus klawiatury, jak się po nim chodzi i dokąd fokus wraca po „✕” albo Escape?
- Gdzie w części „dlaczego” stoi akapit ostatniego starcia względem „Ostatnich minut” i „Nie zadziałały ani razu”?
- Jakie pola stanu przejścia i jakie liczenie dają najdłuższą passę, czas według czynności i to, z czym postać weszła na mapę, tak żeby zostały po wczytaniu zapisu?
- Którymi rolami i wartościami z pliku tokenów stoją kawałki paska czasu i tło za oknem; wartość, której plik tokenów nie ma, wchodzi tylko ze źródłem ustalonym z człowiekiem (`src/browser/AGENTS.md`), a bez człowieka cykl ją nazywa w raporcie.

#### task.md:165-167 Decisions in play, D-135

- D-135 — Does the game show the longest streak of a map run?
  - Fundament przy f672c7b: „The game does not show today the longest streak that a map run has reached, during the map run or after its end.”
  - Definicja: „A map run keeps the longest streak it reached, and the end of the map run shows it against the map's condition.” *Rationale*: „Accepted with it: one more field in the game state and a bump of the version of the save.”

#### task.md:226-226 Settlements to record, row 5

| 5 | Po wczytaniu zapisu okno końca przejścia wraca ze stanu gry całe poza „Ostatnimi minutami”, które biorą się z kroniki i pokazują to, co ona ma. | decision | Pytanie 4 | które pola końca wejdą do stanu gry i zapisu, czy wpisy kroniki wejdą do zapisu |

## Report

Write the full report to the report path as `.the-way/task-cycle/change/SKILL.md` section 6 gives: status, files changed with line counts and commits, each check with its command and exit code (the failing run of each test written first included), the own-work check (requirement, check, what it showed), each reach beyond the dispatch, **Unread material:** and **Searches not found or unclear:** (each `none` if so), every choice with the way rejected and its cost if wrong, and problems as observed. Return to the orchestrator only the status, the commits, a one-line check result naming what failed or did not run, and the report path.
