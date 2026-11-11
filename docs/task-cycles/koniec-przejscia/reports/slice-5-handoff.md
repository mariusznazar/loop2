# Handoff — slice 5 of the task koniec-przejscia

You make one slice of a planned change. Work from the worktree  (branch `task/koniec-przejscia`; run every command from its root, never touch the main checkout `a repository on the author's disk`). Another agent reviews it afterwards; the cycle's orchestrator runs the product's gate, you do not.

## Delegation

The human who requested this cycle delegated intermediate choices to the orchestrator; your questions go to it in your report (status `questions` or `blocked`). Nothing you decide is the human's approval.

## Method and variant

Read whole `.the-way/task-cycle/change/SKILL.md`. Your variant is "a slice, or the retry of a slice": read `.the-way/task-cycle/change/slice.md` for how to read the plan and the task. Read `.the-way/task-cycle/change/ui_check.md` when you alter what a screen shows (section 3), and the other files that `SKILL.md` names only when the step that names them comes.

## Stage and boundary

Stage: slice 5 of the plan; boundary: the slice's own goal and its files (*Change*). The base of the slice is `35c03cd` (`git rev-parse HEAD`). Commit your work on this branch by path (never `git add -A`), commit messages in English in the form of the repository's history. Report path: `docs/task-cycles/koniec-przejscia/reports/slice-5-report.md`.

## Answers of the cycle's start

- Trust boundary: yes — `src/browser/sim/saved-game.ts` is a trust boundary of the part `simulation`.
- Irreversible operation: no.
- No spec; no move of the pin.
- Checks failing on the base (before any change): `tests/account-mail.test.mjs:350` "a server that stops answering yields failed within the shortened deadline and loses the connection" failed in one whole run and passes alone (a timing-dependent test, not yours); two tests of `tests/quality` failed only because the worktree had no `.runs/quality-venv` (now present). Everything else passed. Do not run the gate.
- The foundation entries of the task are written (commits `e0fd091`, `c730482`): the plan's "(new)" entry is D-362 and the changed decisions are in the tree as you read them now.

## Your slice, copied word for word from the plan

### Slice 5 — The lines of the end leave the world area, the band yields to the window

- **Goal:** After the end of a map run the world area draws, from the top, the scene, „Teraz” and „Potem”, the body row with the backpack and the lines under them, the drawing of the map and the line of a tile, and no longer the line „Do skrzynki: …” or „Do skrzynki nic nie trafiło.” and no line of how a death was settled; the functions that wrote them leave `src/browser/view/trip-lines.ts` with the part of `tripTexts` that gave the deposit (the preview line stays) and the rule `.trip-result.danger` of `src/browser/styles.css` goes if nothing uses it. The band of a discovery is not drawn once the map run has ended, in death or a completion, since the window names that discovery (D-122): `src/browser/view/discovery-band.tsx` draws nothing for an ended map run and stops leaving out „Wznów” by case, since the band no longer stands there. The cases of the three test files that checked the old lines and the old band at the end are replaced by the cases of Slices 2 to 4 that check the same texts in the window, each with the requirement that moved them as its reason (To do 3, row 6).
- **Change:** `src/browser/view/world-area.tsx` · `src/browser/view/trip-lines.ts` · `src/browser/view/discovery-band.tsx` · `src/browser/styles.css` · `tests/view/world-area.test.mjs` · `tests/view/trip.test.mjs` · `tests/view/discovery-band.test.mjs`
- **Read:** `docs/task-cycles/koniec-przejscia/task.md:31-31` To do · `docs/task-cycles/koniec-przejscia/task.md:42-42` To do · `docs/task-cycles/koniec-przejscia/task.md:79-85` Question 5 · `docs/task-cycles/koniec-przejscia/task.md:116-121` Question 12 · `docs/task-cycles/koniec-przejscia/task.md:151-176` Decisions in play, Zadanie zapisuje w całości · `docs/task-cycles/koniec-przejscia/task.md:178-189` Decisions in play, Zadanie urzeczywistnia część · `docs/task-cycles/koniec-przejscia/task.md:208-208` Decisions in play, D-215 · `foundations/decisions.md:2223-2266` D-122 · `foundations/decisions.md:2589-2606` D-135 · `foundations/decisions.md:3379-3390` D-185 · `foundations/decisions.md:3611-3624` D-201 · `foundations/decisions.md:4023-4037` D-215 · `foundations/decisions.md:4039-4059` D-216 · `foundations/decisions.md:6734-6805` D-311 · `foundations/decisions.md:6848-6886` D-313 · row D-122 · row D-185 · row D-216 · row D-311 · row Row 6 · `foundations/part_map.md:3-28` browser-view · `foundations/invariants.md:409-417` eslint-source-rules · `foundations/invariants.md:439-447` prettier-source-format · `foundations/invariants.md:459-497` browser-view-token-values, browser-view-focus-outline, design-token-contrast, design-token-sources · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` · `src/browser/view/now-rows.tsx` · `src/browser/view/end-question.tsx`
- **Model:** cheaper — a removal and a change of a condition, with the replacement already in Slices 2 to 4
- **Risk:** none
- **Checks:** The cases are changed first, each against its requirement: `tests/view/world-area.test.mjs` (the world area stands from the top as the Goal says, after a death and after a completion alike), `tests/view/trip.test.mjs` (the preview line and the solved-map line stay; the deposit and the settlement are no more in the world area's lines), `tests/view/discovery-band.test.mjs` (no band for an ended map run, the band with „Wznów” for a map run that goes on). Then `npm test -- tests/view/world-area.test.mjs` · `npm test -- tests/view/trip.test.mjs` · `npm test -- tests/view/discovery-band.test.mjs` · `npm test -- tests/view/run-screen.test.mjs` · `npm test -- tests/view/end-window-game.test.mjs` · `npm test -- tests/invariants/test_browser_view_token_values.py` · `npm run typecheck` · `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view tests/view` · `node node_modules/prettier/bin/prettier.cjs --check src/browser/view src/browser/styles.css tests/view`
- **Depends on:** Slice 4 · Foundation entries rows D-122, D-185, D-216, D-311, Row 6

## Current ranges of the foundation entries named in *Read*

The foundation step wrote entries after the plan, so the ranges in the *Read* above moved; the current ones hold. Read each whole, its identifier is its address.

- D-122: foundations/decisions.md:2231-2286
- D-135: foundations/decisions.md:2621-2636
- D-185: foundations/decisions.md:3409-3420
- D-201: foundations/decisions.md:3641-3654
- D-215: foundations/decisions.md:4066-4080
- D-216: foundations/decisions.md:4082-4105
- D-311: foundations/decisions.md:6780-6866
- D-313: foundations/decisions.md:6909-6955
- the plan's row D-122: the entry as written, foundations/decisions.md:2231-2286
- the plan's row D-185: the entry as written, foundations/decisions.md:3409-3420
- the plan's row D-216: the entry as written, foundations/decisions.md:4082-4105
- the plan's row D-311: the entry as written, foundations/decisions.md:6780-6866

## Passages of the task named in *Read*, copied word for word

#### task.md:31-31 To do

3. Linie „Do skrzynki: …” i zdanie o wskrzeszeniu schodzą z obszaru świata do okna końca przejścia, a obszar świata ma od góry scenę, „Teraz” i „Potem”, wiersz ciała z plecakiem i liniami pod nimi, rysunek mapy i linię kafelka (D-185, D-216, D-311 w brzmieniu definicji).

#### task.md:42-42 To do

9. Gdy przejście kończy się rozwiązaniem albo śmiercią postaci w minucie gry odkrycia, okno końca przejścia nazywa to odkrycie w części o tym, co się stało, tekstem pasa odkrycia w roli `discovery`, z przyciskiem „Dodaj regułę z tym”, który zamyka okno i robi to, co ten przycisk w pasie (D-313): dodaje regułę i otwiera panel reguły pod jej wierszem; pas odkrycia przy takim końcu nie stoi (pytania 5 i 12; pytanie 1, szczegół f).

#### task.md:79-85 Question 5

- Pytanie 5. Gdy przejście kończy się rozwiązaniem w minucie gry odkrycia, czy koniec przejścia sam nazywa to odkrycie, czy dalej stoi pas odkrycia bez „Wznów”?
  - Answer: Koniec przejścia sam nazywa odkrycie — to mówi już zatwierdzona definicja: „Where the map run ends in a completion in the game minute of a discovery, the end of the map run takes the place of the pause and names that discovery until „Restart” or „Zakończ”.”, z odrzuconym „the end of a map run with no word of the discovery made in its game minute”. Reszta (A1): odkrycie nazywa tylko okno końca przejścia, w części „co się stało”, tekstem pasa w roli `discovery` z „Dodaj regułę z tym”; pas przy rozwiązaniu nie stoi, więc zmienia się obecne zdanie i sprawdzenie D-122 („the band of that discovery gone from the screen after the completion before „Restart” or „Zakończ”” jest dziś naruszeniem). Co robi „Dodaj regułę z tym” w oknie: pytanie 1, szczegół f. Śmierć w minucie odkrycia: pytanie 12.
  - Not chosen:
    - B. Pas odkrycia zostaje jak dziś, bez „Wznów”, a koniec odkrycia nie powtarza — zdanie definicji „the end of the map run … names that discovery” nie byłoby prawdą, więc to zmiana zatwierdzonej definicji przez jej bramkę.
    - A2. Koniec nazywa odkrycie, a pas bez „Wznów” stoi dalej nad programem — to samo odkrycie stoi na ekranie dwa razy; czyta wąsko zdanie „the end of the map run takes the place of the pause”, a przy szerszym odczycie idzie wbrew niemu i wymaga bramki definicji.
    - A3. Jak A1, ale bez „Dodaj regułę z tym” w końcu — po rozwiązaniu gracz dodaje regułę z odkrycia tylko zwykłym edytorem.
  - Source: definicja `definicja_mvp2_loop2.md`, D-122, statement i *Rejected* (zatwierdzona 2026-11-11, odcisk 2d919ee3; zdania bez zmian od odcisku 9c70a12b); Mariusz, 2026-11-11: „A1”.

#### task.md:116-121 Question 12

- Pytanie 12. Gdy postać umiera w minucie gry odkrycia, czy okno końca nazywa to odkrycie tak jak przy rozwiązaniu (pytanie 5, droga A1), czy pas odkrycia stoi pod oknem jak dziś?
  - Answer: Jak przy rozwiązaniu: okno końca przejścia nazywa odkrycie w części „co się stało”, z „Dodaj regułę z tym”, a pas nie stoi. Koszt przyjęty: D-122 dostaje zdanie o śmierci, którego zatwierdzone zdanie definicji nie ma (mówi tylko o rozwiązaniu), więc plan ma linię dla odpowiedzi szerszej niż zatwierdzone zdanie. Pytanie jest wspólne dla zadań 16 i 19; zadanie 19 kopiuje tę odpowiedź.
  - Not chosen:
    - B. Pas stoi pod oknem jak dziś, a okno odkrycia nie nazywa — po śmierci gracz dowiaduje się o odkryciu dopiero po zamknięciu okna; dwa końce zachowują się różnie.
    - C. Okno nazywa odkrycie i pas też stoi — to samo odkrycie dwa razy na ekranie; przy rozwiązaniu ten układ odrzucony (A2 pytania 5).
  - Source: Mariusz, 2026-11-11: „tak jak rekomendujesz” — przedstawione z rekomendacją A. Materiał: definicja, D-122 (odcisk 2d919ee3): „Where the map run ends in a completion in the game minute of a discovery, the end of the map run takes the place of the pause and names that discovery until „Restart” or „Zakończ”.”; kod: pas odkrycia pomija „Wznów”, „once the map run has ended, in death or a completion, where nothing is left to go on to; the band then stands until „Restart” or „Zakończ”” (`src/browser/view/discovery-band.tsx:28-31`, 211a4ea). Linia w planie: Change log, 2026-11-11, „dopisek wobec projektowanego D-122: gdy postać umiera w minucie gry odkrycia, okno końca przejścia nazywa to odkrycie tak jak przy rozwiązaniu” (plan sha256 791422f7…).

#### task.md:151-176 Decisions in play, Zadanie zapisuje w całości

### Zadanie zapisuje w całości

- (new) — What does the end of a map run explain? (definicja, Projected foundation changes): „The end of a map run answers, in this order, what happened, what it cost or gave, why, and what next: its cause, the longest streak against the map's condition, what it paid or took, its last minutes, the rules that never fired, the share of time by action, the trip and the terrain, and the way on. The buttons stand in sight while the sections scroll.” *Rejected*: „one line above the terrain and the buttons „Restart” and „Zakończ” — a defeat teaches nothing and a win opens with „Do skrzynki nic nie trafiło””.
  - Plan, Change log, 2026-11-11: dopisek wobec tego wpisu — szczegóły sekcji z pytań 7 i 8, szersze niż zdanie definicji, które wymienia tylko sekcje; zadanie zapisuje wpis z tym dopiskiem.
- D-62 — What does the screen show, and what can the player do, after a character's death?
  - Fundament przy f672c7b: „After a character's death the screen stays on the state of the game minute of death and time stands still for that map run, and the player has „Restart”, which starts the map run again with the same seed from game minute zero, and „Zakończ”, which returns to the screen D-53 gives. After a character's death the pace buttons are gone together with „Pauza”.”
  - Definicja: „After a character's death the screen stays on the state of the game minute of death and time stands still for that map run, the end of the map run stands on the screen in the place that task 16 of the MVP2 plan, koniec-przejscia, settles, and the player has „Restart”, which starts the map run again with the same seed from game minute zero, and „Zakończ”, which returns to the screen D-53 gives. After a character's death the pace buttons are gone together with „Pauza”.”
  - Miejsce, które ustala to zadanie: okno końca przejścia nad ekranem przejścia (pytanie 1).
- D-122 — What does a map run do, and what does the player see, when something is discovered?
  - Fundament przy f672c7b, w brzmieniu przejściowym zadania 14: „When something is discovered in a map run the player starts, the map run stops in the same pause as after „Pauza”: the clock in the header reads „Minuta {game minute} (pauza)”, and the player goes on with „Wznów”. A band in the role `discovery` above the program names what was discovered and the program rule the game wrote, the discoveries of one game minute in one band, with „Dodaj regułę z tym” and „Wznów”, whose „Wznów” goes on as the „Wznów” of the header does, and it stands until the player goes on, the scene keeping its colours, and what it named enters the chronicle. Where the map run ends in a completion in the game minute of a discovery, the screen after the completion takes the place of the pause, and the band stands, with no „Wznów”, until „Restart” or „Zakończ”.”
  - Definicja: „When something is discovered in a map run the player starts, the map run stops in the same pause as after „Pauza”, and the player goes on with „Wznów”. A band in the role `discovery` above the program names what was discovered and the program rule the game wrote, the discoveries of one game minute in one band, with „Dodaj regułę z tym” and „Wznów”, and it stands until the player goes on, the scene keeping its colours, and what it named enters the chronicle. Where the map run ends in a completion in the game minute of a discovery, the end of the map run takes the place of the pause and names that discovery until „Restart” or „Zakończ”.”
  - Zmiana, którą zadanie robi w obecnym wpisie (pytanie 5, droga A1): pas odkrycia przy rozwiązaniu nie stoi, a odkrycie tej minuty nazywa okno końca przejścia z „Dodaj regułę z tym”; sprawdzenie wpisu, które dziś każe pasowi stać do „Restart” albo „Zakończ”, zmienia się z nim.
  - Dopisek (pytanie 12; plan, Change log, 2026-11-11, „dopisek wobec projektowanego D-122”): to samo przy śmierci postaci w minucie gry odkrycia — szerzej niż zatwierdzone zdanie, które mówi tylko o rozwiązaniu.
  - Zdanie *Rationale* „Accepted with it: a stop at a discovery cannot be told apart in the game state from the player's pause” nie jest prawdą wobec kodu (Context); zadanie je poprawia.
- D-135 — Does the game show the longest streak of a map run?
  - Fundament przy f672c7b: „The game does not show today the longest streak that a map run has reached, during the map run or after its end.”
  - Definicja: „A map run keeps the longest streak it reached, and the end of the map run shows it against the map's condition.” *Rationale*: „Accepted with it: one more field in the game state and a bump of the version of the save.”
- D-147 — What record of an encounter does the player read?
  - Fundament przy f672c7b: „From an attack the map run keeps its last encounter's facts and shows a wrapping paragraph in `text` as an entry of the chronicle in the game minute of the attack, which adds the turns while the encounter lasts: […] The paragraph stands through „Wznów”, editing, a load of the saved game state and the frozen death or completion screen until another attack replaces it as the last one or „Restart” or „Zakończ” removes its map run; […]”
  - Definicja: „From an attack the map run keeps its last encounter's facts and shows a wrapping paragraph as an entry of the chronicle and at the end of the map run: […]”; plan, Change log, 2026-11-06: zadanie 16 pisze wpis dalej, a „starcie stoi w kronice jednym akapitem tam, gdzie się zaczęło”. W oknie końca przejścia akapit stoi tylko we własnej sekcji, poza „Ostatnimi minutami” (pytanie 8).
- D-185 — Where does the player read what completion deposited?
  - Fundament przy f672c7b: „After completion the line „Do skrzynki: {item} {count}, …” or „Do skrzynki nic nie trafiło.” in `text-secondary` stands in the world area of the screen of a map run, under the scene and above the body row and backpack, until „Restart” or „Zakończ”.”
  - Definicja: „After completion the line „Do skrzynki: {item} {count}, …” or „Do skrzynki nic nie trafiło.” in `text-secondary` stands in the section of the end of the map run saying what it gave, until „Restart” or „Zakończ”.”
- D-216 — Where does the player read what a character's death took?
  - Fundament przy f672c7b: „After a character's death, at the place of the line „Do skrzynki: …”, until „Restart” or „Zakończ” and after a load too, a line stands: „Wskrzeszenie zużyte: wprawa i wykupione stopnie zostają.” in `text-secondary` when the death used up a resurrection, and „Wskrzeszenie nie było gotowe: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie {n}.” in `danger` when no resurrection was ready.”
  - Definicja: „After a character's death, in the section of the end of the map run saying what it cost, until „Restart” or „Zakończ” and after a load too, a line stands: „Wskrzeszenie zużyte: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Następne wskrzeszenie po 8 godzinach czasu realnego.” in `text-secondary` when the death used up a resurrection, the hours coming from the balance data, and „Wskrzeszenie nie było gotowe: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie {n}.” in `danger` when no resurrection was ready.”

#### task.md:178-189 Decisions in play, Zadanie urzeczywistnia część

### Zadanie urzeczywistnia część, a resztę pisze inne zadanie

- (new) — How is the screen of a map run laid out?, w fundamencie D-311 (pisze zadanie 14, zrobione); zadanie dopisuje do niego okno końca przejścia nad ekranem, pasek menu z wierszem ostrzeżeń nad oknem, zamknięcie okna, gdy staje pytanie „Zapisać, odrzucić, wrócić?”, i przycisk „Koniec przejścia” w nagłówku, i zdejmuje linie końca z obszaru świata (plan, Change log, 2026-11-06 i 2026-11-11, „dopisek wobec wpisu „(new) — How is the screen of a map run laid out?””; pytania 1, 2, 9 i 10). Część o otwieraniu okna dopiero po efekcie końca zmienia potem zadanie 19 (plan, Change log, 2026-11-11, „zadanie 19 dołącza do wiersza”).
  - Definicja: „The world holds, from the top, the scene, „Teraz” and „Potem”, the body row with the minutes each need lasts, the backpack, the drawing of the map and the line of a tile under it. The header holds the character, the map, the clock, a bar of the solving condition with its numbers, and the pace.”
  - Fundament przy f672c7b: „The world holds, from the top, the scene, „Teraz” and „Potem”, the line of the end of the map run (D-185, D-216), the body row with the minutes each need lasts, with the backpack and the lines below them, the drawing of the map and the line of a tile under it. The header holds the character's name, the map's name, the clock, a bar of the solving condition with its numbers (D-133), „Pauza” or „Wznów”, the pace, „Restart”, the warning of a cut trip plan and „Zakończ”.” „Restart”, ostrzeżenie i „Zakończ” zostają w nagłówku (pytanie 2).
- D-132 — What does the screen show, and what can the player do, after a completion? (pisze zadanie 18)
  - Definicja (odcisk 2d919ee3): „After a completion the screen stays on the state of the game minute of the completion and time stands still for that map run, and the end of the map run stands, in the place that task 16 of the MVP2 plan, koniec-przejscia, settles, under the title „{mapa} rozwiązana”, such as „Las rozwiązany”, in the role `positive`, the light of the scene in full gold. „Pauza” and the pace buttons are gone, and the player has „Restart” and „Zakończ” as after a character's death, and the way to a map it opened.”
  - Fundament przy f672c7b: „After a completion the screen stays on the state of the game minute of the completion and time stands still for that map run, and „Teraz” reads the map's completion text, in Las „Las rozwiązany” and in Las — głębiej „Las — głębiej rozwiązany”, in the role `positive`, the clock in the header standing at that game minute, such as „Minuta 480”. „Pauza” and the pace buttons are gone, and the player has „Restart” and „Zakończ” as after a character's death.”
  - Zadanie czyni prawdziwym okno końca przejścia pod tytułem rozwiązania i drogę do otwartej mapy (pytania 1 i 3); światło sceny w pełnym złocie, które okno przykrywa, a „✕” odsłania, robi zadanie 18.
- D-212 — How does a manual map run come back from a loaded saved game state? (pisze zadanie 4, zrobione; zadanie 16 dołącza do wiersza — plan, Change log, 2026-11-11, „zadanie 16 dołącza do wiersza D-212”)
  - Fundament przy 211a4ea i definicja, to samo zdanie: „[…] one that ended in a completion or in the character's death comes back with its screen after its end, with „Restart”, „Zakończ” and the copy open to editing as D-62, D-132 and D-173 give, and the screen the page opens on is the one D-96 gives. […]”
  - Zadanie czyni prawdziwym powrót okna końca przejścia po wczytaniu: okno otwiera się znowu (pytanie 1, szczegół e), wszystko poza „Ostatnimi minutami” wraca ze stanu gry, a „Ostatnie minuty” biorą z kroniki to, co ona ma (pytanie 4, węższy odczyt zdania, bez zmiany definicji).

#### task.md:208-208 Decisions in play, D-215

- D-215 — „On the screen of a manual run of a solved map, from game minute zero until „Restart” or „Zakończ”, below the body row and the backpack and above the line „Wprawa w tym przejściu”, the line „Mapa jest już rozwiązana: to przejście nic nie płaci i nic nie bierze ze skrzynki.” stands in `text-secondary`.”

## Binding answers of the orchestrator

The plan was written before slices 1 to 4 were made. They are made (the last is commit `35c03cd`); where the plan's ranges or wording differ from the code as it stands, the code as it stands holds. Read `src/browser/view/run-screen.tsx` and `src/browser/view/game-view.ts` where they draw the window and the discovery band, `src/browser/view/end-window.tsx` and `src/browser/view/end-window-lines.ts` (the window now draws „Do skrzynki: …”, the death lines and the discovery, so the world area must no longer draw them), and the slice-4 report `docs/task-cycles/koniec-przejscia/reports/slice-4-report.md` (its "What I made" and "Problems as observed").

Binding notes of the orchestrator:

1. The band of a discovery is today drawn above the program by `src/browser/view/discovery-band.tsx`; slice 4 left it standing at an end (hidden under the covered areas while the window is open, shown after „✕”). Your slice removes it for an ended map run, as the plan says: nothing draws it once the map run has ended, in death or a completion; the window names the discovery. A map run that goes on keeps the band with „Wznów”.
2. The functions of `src/browser/view/trip-lines.ts` that wrote the deposit line and the death lines leave with their tests only where nothing else uses them: search the whole `src/browser/` and `tests/` for each name before you delete it (slice 2 made `itemList` exported and the window's lines call into this file). A rule of `src/browser/styles.css` that no element uses any more goes; a class the window uses stays.
3. Tests that checked the old lines and the old band at the end are replaced by tests of the new facts, each with the requirement that moved it as its reason (To do 3, row 6); do not weaken an assertion.
4. You do not need to run a real browser; the orchestrator's final real-browser check covers the world area without the lines. Say in your report that you did not.
5. `foundations/` is not yours; do not touch it.

## Report

Write the full report to the report path as `.the-way/task-cycle/change/SKILL.md` section 6 gives: status, files changed with line counts and commits, each check with its command and exit code (the failing run of each test written first included), the own-work check (requirement, check, what it showed), each reach beyond the dispatch, **Unread material:** and **Searches not found or unclear:** (each `none` if so), every choice with the way rejected and its cost if wrong, and problems as observed. Return to the orchestrator only the status, the commits, a one-line check result naming what failed or did not run, and the report path.
