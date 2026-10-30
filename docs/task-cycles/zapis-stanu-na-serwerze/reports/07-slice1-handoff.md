# Handoff — Slice 1 executor, task `zapis-stanu-na-serwerze`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **executor of Slice 1**, a fresh
agent. Your questions go to the orchestrator, never to the human; you return at the end of your
slice and start no other.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\zapis-stanu-na-serwerze`, branch
  `task/zapis-stanu-na-serwerze`. Slice base `dce2970`; the branch head when you start is `fb1ef9d`
  (the plan's *Foundation entries*, written by another agent). Process pin `.the-way` at `a8dfe8a`.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it
  names only when the step or variant that names it comes. Variant: "a slice, or the retry of a
  slice".
- Class: `strongest` (plan, *Model*).
- Frozen task, spec and plan: `.runs/task-cycles/zapis-stanu-na-serwerze/task.md`, `spec.md`,
  `plan.md` — read the passages copied below; open a file for more only where your work needs it,
  and name that reach in your report.
- Report path: `.runs/task-cycles/zapis-stanu-na-serwerze/reports/07-slice1-report.md`
- The product's instructions: `AGENTS.md` (read `guidelines/coding.md` before changing product
  code and `guidelines/testing.md` before writing tests). Commit on the task branch by path, English
  messages in the form of the existing commits. Run only your slice's focused checks, each reported
  with its command and exit code; do not run the whole gate (`npm test` with no argument).

## Answers of step 4

- Trust boundary: **yes** — and your slice is on it: `src/browser/sim/saved-game.ts` takes a saved
  game state that comes from outside the simulation (the server returns what a browser sent, and a
  crafted request can put anything there within 64 KiB). It must refuse a crafted or malformed
  document whole and never throw: wrong shapes, missing and extra keys, `__proto__` and other
  prototype keys, non-finite, unsafe and huge numbers, values off closed lists, identifiers absent
  from the data, broken references, wrong tile counts and deep nesting. Your slice gets a review of
  its own aimed at that.
- Irreversible operation: **yes** for the cycle (schema step 3 → 4 on the test server's database,
  Slice 2), not in your slice.

## Foundation entries written before you

The plan's *Foundation entries* stand in `fb1ef9d`: plan rows 1–30 and 32–34, as decisions D-179
to D-190 and changes of D-04, D-07, D-96, D-97, D-104, D-109, D-112 and D-156, invariants and
environment facts. Row 35 (the part map's `simulation` *Trust boundary* naming
`src/browser/sim/saved-game.ts`) is yours, through `the-way-update-part-map`, as your section says.
Row 6 is D-183, row 14 D-189, row 16 D-04, row 20 D-190, row 25 `save-version`.

## Your section of the plan (copied word for word from plan.md)

### Slice 1 — The simulation's saved-game document and load

- **Goal:** `src/browser/sim/saved-game.ts`, the first file of the new kind `saved-game`, holds
  what spec decisions 2 and 5 give: the constant of the current version of the shape, starting at
  1; a pure function from a game state to the saved document `{ version, game }`, sharing nothing
  the state could later change; and a function from an unknown value to either a game state or a
  refusal with the reason `version`, `archetype` or `shape`, in decision 5's order, that never
  throws, changes nothing passed to it, admits nothing less strict than decision 5's floor (keys
  exactly, own keys only, `__proto__` included; finite and safe integers; closed lists; identifiers
  present in the data; programs through the existing program check; references the simulation
  follows; the tile count of the map's layout), builds the state field by field as a `GameState`
  so a change of the type fails the type check, returns a map run that goes on paused at its game
  minute, pace and carried real time, and an ended one as it ended, and lets no real time or time
  away into the load. `tests/sim/saved-game.test.mjs` holds the written-out document of the current
  version that fills every optional branch decision 2 lists, with its map run written paused,
  asserting that it loads into the state it describes and that the constant equals the version
  written beside it; documents of another version, of a character whose archetype the data lacks,
  and crafted shapes (a missing and an extra key, `__proto__`, a non-finite and an unsafe number, a
  value off a closed list, an identifier absent from the data, a broken reference, a wrong tile
  count, a running map run coming back paused and an ended one unchanged, an argument left
  unchanged), each refused whole and marked `invariant: save-version`; the refusal test is seen
  failing once. `stryker.config.json` lists the new test file. The part map's `simulation` entry
  names the file under *Trust boundary* (Foundation entries row 35), written through
  `the-way-update-part-map`.
- **Change:** `src/browser/sim/saved-game.ts` · `tests/sim/saved-game.test.mjs` ·
  `stryker.config.json` · `foundations/part_map.md`
- **Read:** `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:23-24` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:29-30` To do ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:89-94` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:101-106` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:176-180` Questions to settle ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:297-299` Settlements to record ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:23-49` Goals and non-goals ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:51-77` Constraints ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:114-141` 2. Where the version stands and what forces its bump ·
  `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:188-226` 5. The simulation's load function and its counterpart (new kind saved-game) ·
  Foundation entries row 6 · Foundation entries row 14 · Foundation entries row 16 ·
  Foundation entries row 20 · Foundation entries row 25 · Foundation entries row 35 ·
  `foundations/decisions.md:57-92` D-04 · `foundations/decisions.md:356-373` D-18 ·
  `foundations/decisions.md:416-448` D-21 · `foundations/decisions.md:632-645` D-28 ·
  `foundations/decisions.md:733-746` D-35 · `foundations/decisions.md:979-996` D-51 ·
  `foundations/decisions.md:1063-1081` D-55 · `foundations/decisions.md:1083-1108` D-56 ·
  `foundations/decisions.md:1185-1198` D-62 · `foundations/decisions.md:1608-1624` D-91 ·
  `foundations/decisions.md:2334-2356` D-129 · `foundations/decisions.md:2414-2437` D-132 ·
  `foundations/decisions.md:2931-2944` D-164 · `foundations/decisions.md:2946-2959` D-165 ·
  `foundations/decisions.md:2976-2989` D-167 · `foundations/decisions.md:2991-3004` D-168 ·
  `foundations/decisions.md:3036-3049` D-171 · `foundations/decisions.md:3066-3079` D-173 ·
  `foundations/decisions.md:3096-3114` D-175 · `foundations/decisions.md:3116-3134` D-176 ·
  `foundations/invariants.md:214-224` simulation-isolation ·
  `foundations/invariants.md:226-234` simulation-inputs ·
  `foundations/invariants.md:236-246` content-identifiers ·
  `foundations/invariants.md:518-526` character-team ·
  `foundations/invariants.md:165-174` map-run-repeatability ·
  `foundations/invariants.md:198-212` player-map-run-pace ·
  `foundations/invariants.md:848-856` copy-save · `foundations/invariants.md:838-846` saved-program-edit ·
  `foundations/invariants.md:364-373` program-closed-lists ·
  `foundations/invariants.md:386-395` program-world-reference ·
  `foundations/invariants.md:397-406` map-run-layout ·
  `foundations/invariants.md:938-946` nature-energy-range ·
  `foundations/glossary.md:12-16` game minute · `foundations/glossary.md:18-23` map run ·
  `foundations/glossary.md:25-30` program · `foundations/glossary.md:87-92` headquarters ·
  `foundations/glossary.md:112-116` archetype · `foundations/glossary.md:118-123` Understanding ·
  `foundations/glossary.md:131-135` manual map run · `foundations/glossary.md:137-141` completion ·
  `foundations/glossary.md:175-179` copy · `.the-way/foundations/glossary.md:163-167` exemplar ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/game.ts` · `src/browser/sim/programs.ts` ·
  `src/browser/sim/program.ts` · `src/browser/sim/run.ts` · `src/browser/sim/layout.ts` ·
  `src/browser/sim/understanding.ts` · `src/browser/sim/character.ts` · `src/browser/sim/body.ts` ·
  `src/browser/sim/combat.ts` · `src/browser/sim/world.ts` · `src/browser/sim/hex.ts` ·
  `src/browser/sim/data/actions.ts` · `src/browser/sim/data/archetypes.ts` ·
  `src/browser/sim/data/balance.ts` · `src/browser/sim/data/campfire.ts` ·
  `src/browser/sim/data/conditions.ts` · `src/browser/sim/data/creatures.ts` ·
  `src/browser/sim/data/items.ts` · `src/browser/sim/data/maps.ts` ·
  `src/browser/sim/data/resources.ts` · `src/browser/sim/data/revelations.ts` ·
  `src/browser/sim/data/skills.ts` · `src/browser/sim/data/traits.ts` ·
  `tests/sim/traits.test.mjs` · `tests/sim/purity.test.mjs` · `tests/sim/time.test.mjs` ·
  `tests/sim/program-fixture.mjs` · `tests/sim/understanding-fixture.mjs` ·
  `tests/quality/test_mutation_test_selection.py`
- **Model:** strongest — the strict load of the whole game state is the change's largest
  trust-boundary code; the spec gives only its floor, and judging which crafted inputs it must
  refuse needs design.
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`, the file this slice adds to the
  simulation's *Trust boundary*
- **Checks:** `npm test -- tests/sim/saved-game.test.mjs` (its case "a document of the current
  version loads into the state it describes" written first, failing) ·
  `npm test -- tests/sim/purity.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm test -- tests/quality/test_quality_invariants.py` ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Foundation entries rows 6, 14, 16, 20, 25

## Current ranges of the foundation entries your *Read* names

The foundation step (`fb1ef9d`) and earlier slices moved entries; these ranges, taken from the worktree as it stands at your base, hold where they differ from the plan's. Read each entry whole.

- plan row 6 → `foundations/decisions.md:3291-3315` D-183 — What happens to a saved game state of another version?
- plan row 14 → `foundations/decisions.md:3500-3536` D-189 — How does a manual map run come back from a loaded saved game state?
- plan row 16 → `foundations/decisions.md:57-103` D-04 — What is the game built with?
- plan row 20 → `foundations/decisions.md:3538-3562` D-190 — Which file is the exemplar for saved-game code?
- plan row 25 → `foundations/invariants.md:988-996` save-version
- plan row 35 → `foundations/part_map.md:28-58` simulation
- `foundations/decisions.md:57-103` D-04 — What is the game built with?
- `foundations/decisions.md:374-391` D-18 — Where does the game's content live?
- `foundations/decisions.md:434-466` D-21 — How does time pass in a map run the player starts?
- `foundations/decisions.md:650-663` D-28 — Which coding-guideline discipline does loop2 adopt?
- `foundations/decisions.md:751-764` D-35 — Which file is the exemplar for simulation modules?
- `foundations/decisions.md:997-1014` D-51 — What team does a new game start with?
- `foundations/decisions.md:1082-1100` D-55 — How many manual map runs go on at a time?
- `foundations/decisions.md:1102-1127` D-56 — How does the game state tell one character from another?
- `foundations/decisions.md:1204-1217` D-62 — What does the screen show, and what can the player do, after a character's death?
- `foundations/decisions.md:1627-1643` D-91 — What program does a new game start with?
- `foundations/decisions.md:2355-2377` D-129 — How long does the pace the player picks stay?
- `foundations/decisions.md:2435-2458` D-132 — What does the screen show, and what can the player do, after a completion?
- `foundations/decisions.md:2951-2964` D-164 — Who owns a program?
- `foundations/decisions.md:2966-2979` D-165 — How does the game state tell one program from another?
- `foundations/decisions.md:2996-3009` D-167 — What can the player do with the list of programs?
- `foundations/decisions.md:3011-3024` D-168 — What becomes of a map run whose copy's program the player deletes?
- `foundations/decisions.md:3056-3069` D-171 — How does the program panel show the copy and its unsaved changes?
- `foundations/decisions.md:3086-3099` D-173 — What can the player do with the copy after a map run ends?
- `foundations/decisions.md:3116-3134` D-175 — What does a mage pay for spells with?
- `foundations/decisions.md:3136-3154` D-176 — With how much nature energy does a mage start a map run?
- `foundations/invariants.md:214-224` simulation-isolation
- `foundations/invariants.md:226-234` simulation-inputs
- `foundations/invariants.md:236-246` content-identifiers
- `foundations/invariants.md:518-526` character-team
- `foundations/invariants.md:165-174` map-run-repeatability
- `foundations/invariants.md:198-212` player-map-run-pace
- `foundations/invariants.md:848-856` copy-save
- `foundations/invariants.md:838-846` saved-program-edit
- `foundations/invariants.md:364-373` program-closed-lists
- `foundations/invariants.md:386-395` program-world-reference
- `foundations/invariants.md:397-406` map-run-layout
- `foundations/invariants.md:938-946` nature-energy-range
- `foundations/glossary.md:12-16` game minute
- `foundations/glossary.md:18-23` map run
- `foundations/glossary.md:25-30` program
- `foundations/glossary.md:87-92` headquarters
- `foundations/glossary.md:112-116` archetype
- `foundations/glossary.md:118-123` Understanding
- `foundations/glossary.md:131-135` manual map run
- `foundations/glossary.md:137-141` completion
- `foundations/glossary.md:175-179` copy
- `.the-way/foundations/glossary.md:163-167` exemplar

## Other files your *Read* names (each whole unless a range is given)

- `guidelines/coding.md`
- `guidelines/coding-simulation-module.md`
- `guidelines/testing.md`
- `src/browser/sim/types.ts`
- `src/browser/sim/game.ts`
- `src/browser/sim/programs.ts`
- `src/browser/sim/program.ts`
- `src/browser/sim/run.ts`
- `src/browser/sim/layout.ts`
- `src/browser/sim/understanding.ts`
- `src/browser/sim/character.ts`
- `src/browser/sim/body.ts`
- `src/browser/sim/combat.ts`
- `src/browser/sim/world.ts`
- `src/browser/sim/hex.ts`
- `src/browser/sim/data/actions.ts`
- `src/browser/sim/data/archetypes.ts`
- `src/browser/sim/data/balance.ts`
- `src/browser/sim/data/campfire.ts`
- `src/browser/sim/data/conditions.ts`
- `src/browser/sim/data/creatures.ts`
- `src/browser/sim/data/items.ts`
- `src/browser/sim/data/maps.ts`
- `src/browser/sim/data/resources.ts`
- `src/browser/sim/data/revelations.ts`
- `src/browser/sim/data/skills.ts`
- `src/browser/sim/data/traits.ts`
- `tests/sim/traits.test.mjs`
- `tests/sim/purity.test.mjs`
- `tests/sim/time.test.mjs`
- `tests/sim/program-fixture.mjs`
- `tests/sim/understanding-fixture.mjs`
- `tests/quality/test_mutation_test_selection.py`

## Passages of the task, spec and plan your *Read* names (copied word for word)

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:23-24` To do

5. Zapis niesie numer wersji swojego kształtu, a gra wczytuje w całości tylko zapis o bieżącej wersji; zapis każdej innej wersji, zapis, którego postać ma archetyp nieobecny w danych, i zapis o złym kształcie gra odrzuca w całości, razem z programami gracza, i zaczyna dla gracza grę od nowa (wpis projektowany „What happens to a saved game state of another version?”, `save-version/1`; pytanie 10). Po odrzuceniu zapisu innej wersji albo z archetypem spoza danych gracz widzi jednorazowe zdanie w roli `warning`: „Zapis pochodził z innej wersji gry i nie dał się wczytać. Zaczynasz od nowa.” (pytanie 7); po odrzuceniu zapisu o złym kształcie widzi w tym samym miejscu, tak samo jednorazowo, własne zdanie w roli `warning`: „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.” (pytanie 21). Serwer odrzuca zapis o wersji niższej niż wersja zapisu, który już trzyma, a stara karta pokazuje wtedy w roli `warning` „Gra została zaktualizowana. Odśwież stronę.” i przestaje zapisywać (pytanie 4).
6. Po zalogowaniu i po przeładowaniu strony z ważną sesją — także w innej przeglądarce niż ta, w której gracz grał — gra wczytuje zapis konta; konto bez zapisu zaczyna nową grę z pustą drużyną i pustą grupą „Program” (D-51, D-91). Gra powstaje dopiero, gdy serwer odda zapis albo powie, że go nie ma; brak odpowiedzi albo odpowiedź niepewna daje ostrzeżenie i „Spróbuj ponownie”, jak przy sprawdzaniu sesji (D-96) — nigdy nową grę (pytanie 7). Wczytane trwające ręczne przejście wraca w minucie zapisu, zatrzymane pauzą, z tempem z zapisu, a gracz rusza je przyciskiem „Wznów”; czas od zapisu do wczytania go nie przesuwa (pytanie 8; wobec wpisów o doliczaniu, które zapisze zadanie 18 — pytanie 15, droga B: doliczanie rusza od stanu wczytanego, a kod tego zadania niczego nie dolicza). Wczytane przejście zakończone domknięciem albo śmiercią postaci, którego ekranu gracz nie zamknął, wraca na ekran po swoim końcu — z „Restart” i „Zakończ” i z kopią programu, którą gracz dalej edytuje i zapisuje, aż wybierze jedno z nich (D-62, D-132, D-173 bez zmian; pytanie 23, droga A). Gracz, w którego zapisie jest ręczne przejście, trafia po zalogowaniu i po przeładowaniu strony z ważną sesją do tego przejścia: trwające wraca zatrzymane pauzą, a zakończone — na ekran po swoim końcu; tak mówi punkt 4 zakresu definicji i wpis projektowany D-96, który zapisuje cykl (pytania 20, 22 i 23). Wynik potwierdzenia adresu z odnośnika stoi u zalogowanego gracza nad grą, na jakimkolwiek ekranie się ona otwiera — także na przejściu z zapisu (wpis projektowany D-156, który zapisuje cykl; pytanie 22).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:29-30` To do

11. Wczytanie przechodzi przez funkcję symulacji, która dostaje zapis z serwera i oddaje stan gry albo odmowę (inna wersja, archetyp spoza danych, zły kształt); cykl zmienia zdanie wiążące D-04 tak, że obok wyborów gracza i upływu czasu stoi w nim zapis stanu gry, który przeglądarka pobrała z serwera (pytanie 10).
12. Pierwszy plik kodu zapisu gry — plik symulacji, który zamienia zapis pobrany z serwera na stan gry albo odmowę (punkt 11) — zostaje wzorcem nowego rodzaju kodu, z wytycznymi rodzaju i wierszem w indeksie `guidelines/coding.md`, przez skill `the-way-maintain-coding-guidelines` (D-28: “session, saved-game and mail exemplars are selected with their first implementations”; WAY-216). Plik leży w symulacji, więc granicę nowego rodzaju wobec `simulation-module` („Przed dodaniem lub zmianą modułu symulacji w `src/browser/sim/`, poza danymi treści gry”) ustala jego wytyczna, jak przy rodzaju `content-data`; nowe znaczenie wytycznych zatwierdza człowiek (WAY-172). Zdanie „Wzorzec zapisu gry powstanie przy pierwszej implementacji” w `guidelines/coding.md` (§ „Odłożone rodzaje i formatowanie”) zmienia się w tej samej zmianie.

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:89-94` Questions to settle

- 8. Co gracz widzi po wczytaniu zapisu, w którym trwa ręczne przejście mapy, i czy czas od zapisu do wczytania przesuwa to przejście? (Q8; dotyczy też zadania 18)
  - Answer: droga A: przejście wraca w minucie zapisu, zatrzymane pauzą, z tempem z zapisu; czas nieobecności go nie przesuwa — ani teraz, ani po zadaniu 18; gracz rusza je przyciskiem „Wznów”. Przyjęty koszt: jedno kliknięcie po każdym wczytaniu z trwającym przejściem. Ta odpowiedź wiąże też zadanie 18, które zapisuje wpisy o doliczaniu — jak zapisać ją wobec ich brzmienia w definicji: pytanie 15.
  - Not chosen:
    - B — przejście wraca dokładnie w stanie z zapisu, biegnie dalej, jeśli biegło; czas nieobecności go nie przesuwa — gracz logujący się na innym urządzeniu może przegapić odkrycie, napaść albo śmierć postaci w pierwszych sekundach.
    - C — od zadania 18 doliczanie przesuwa też trwające ręczne przejście o czas nieobecności (w jakim tempie — do ustalenia w zadaniu 18), a do tego czasu przejście wraca jak w A — przejście, które gracz rozwiązuje jak zagadkę i ogląda (uzasadnienie D-21: “so the player still watches the program act”), domyka się albo kończy śmiercią postaci pod jego nieobecność; przy 1× zamknięcie karty na 8 minut kończy przejście Lasu; zadanie 18 dostaje dodatkowy wymóg.
  - Source: Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji” — rekomendacja A pytania Q8, w pakiecie jako D8 (tura 9).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:101-106` Questions to settle

- 10. Czy wczytanie zapisanego stanu gry po zalogowaniu, które zastępuje bieżący stan gry, mieści się w decyzji o tym, z czego gra jest zbudowana, a jeśli nie, jak je zapisać? (Q10; pytanie otwarte planu przypisane temu zadaniu, postawione wobec obecnego brzmienia D-04)
  - Answer: droga A: wczytanie przechodzi przez funkcję symulacji, która dostaje zapis z serwera i oddaje stan gry albo odmowę (inna wersja, archetyp spoza danych, zły kształt); zdanie wiążące D-04 dostaje obok wyborów gracza i upływu czasu „zapis stanu gry, który przeglądarka pobrała z serwera”. Przyjęty koszt: D-04 zmienia się w cyklu; symulacja dostaje funkcję czytającą niezaufane dane bez sięgania poza siebie (niezmiennik `simulation-isolation`).
  - Not chosen:
    - B — D-04 bez zmian, a wczytanie uznajemy za wybór gracza (zalogowanie) — naciągnięte czytanie: następny czytelnik może wziąć wczytanie za złamanie D-04.
    - C — widok zastępuje stan gry wczytanym zapisem sam, a D-04 dostaje wyjątek — stan gry zmienia się w dwóch miejscach; wbrew przykładowi złamania D-04.
  - Source: Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji” — rekomendacja A pytania Q10, w pakiecie jako D10 (tura 9).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:176-180` Questions to settle

- 23. Dokąd trafia po zalogowaniu i przeładowaniu gracz, w którego zapisie stoi ręczne przejście już zakończone — domknięciem albo śmiercią postaci — którego ekranu gracz jeszcze nie zamknął przyciskiem „Restart” ani „Zakończ”? (Q23; obserwacja W1 krytyki bramki definicji, tura 23)
  - Answer: droga A: gracz wraca na ekran po końcu przejścia, jak go zostawił; zdanie zakresu (`definicja_mvp_loop2.md`, linia 31) brzmi „Zalogowany gracz trafia do siedziby, a gdy w jego zapisie jest ręczne przejście — do tego przejścia: trwające wraca zatrzymane pauzą, a zakończone domknięciem albo śmiercią postaci — na ekran po swoim końcu.”; D-62, D-132 i D-173 zostają bez zmian. Przyjęty koszt: zdanie zakresu odchodzi od dosłownego brzmienia odpowiedzi na pytanie 20 (sens dla przejścia trwającego bez zmian); zmiana D-96 szersza o ten przypadek; To do 6 i wiersz 8 obejmują przejście zakończone.
  - Not chosen:
    - B — zdanie zakresu zostaje, a wczytanie zamyka zakończone przejście tak jak „Zakończ”: gracz trafia do siedziby — projektowane zmiany trzech decyzji, D-62, D-132 i D-173, w tej samej bramce, ze zgodą człowieka na każdą; kod zamykający przejście przy wczytaniu; po każdym przeładowaniu po śmierci albo domknięciu gracz traci niezapisane zmiany kopii (bez linii „Niezapisane zmiany w kopii.”, która dziś ostrzega przed „Zakończ”) i możliwość „Restart” na tym samym ziarnie.
  - Source: Mariusz, 2026-10-29, „przyjmuję propozycje” — ta sama odpowiedź (tura 25 rozmowy refinementu; drogi w brzmieniu tury 24); definicja zmieniona tak w turze 26 (sha256 fda97782458d).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/task.md:297-299` Settlements to record

| 8 | Wczytane trwające ręczne przejście wraca w minucie zapisu, zatrzymane pauzą, z tempem z zapisu, a gracz rusza je przyciskiem „Wznów”; czas nieobecności go nie przesuwa — ani teraz, ani po zadaniu 18; wczytane przejście zakończone domknięciem albo śmiercią postaci wraca na ekran po swoim końcu. | decision | pytanie 8 (A; Mariusz, 2026-10-29); pytanie 15 (B; Mariusz, 2026-10-29) — wiersz w całości, razem z „ani po zadaniu 18”, bez kolizji z niezmiennikiem projektowanym `catch-up-state/1` i wpisem projektowanym „When and how is the time away computed?”, które zapisuje zadanie 18: doliczanie rusza od stanu wczytanego, z tym przejściem na pauzie, a pauza ręcznego przejścia nie zatrzymuje pętli zarobkowych innych postaci (pytanie otwarte planu dla zadania 18); pytanie 23 (A; Mariusz, 2026-10-29) — przejście zakończone, D-62, D-132 i D-173 bez zmian; to, gdzie gracz ląduje po zalogowaniu i przeładowaniu (pytania 20 i 23), mówi wpis projektowany D-96 spod *Decisions in play*, więc wiersz tego nie powtarza (pytanie 22, droga B); przy tym wpisie cykl poprawia uzasadnienie D-53 — “the headquarters stands above the screen of a map run as the screen the game opens on” → “the headquarters stands above the screen of a map run as the screen the game opens on when the saved game state holds no manual map run” (uwaga N5 krytyki bramki definicji, tura 23; materiał zgody, punkt 5, tura 24) | czy wczytane przejście biegnie od razu, czy stoi na pauzie, czy wczytanie zamyka przejście zakończone i — w zadaniu 18 — czy doliczanie przesuwa trwające ręczne przejście |
| 9 | Trasa zapisu przyjmuje treść do 64 KiB, inne trasy zostają przy 16 KiB, a serwer przechowuje najwyżej 64 KiB zapisu na gracza. | decision | pytanie 9 (B; Mariusz, 2026-10-29); zmienia D-104 (“an application/json body with at most 16 KiB” dla każdej trasy zmieniającej stan); niezmiennik `account-mutation-request-guards` nie podaje liczby („oversized”), więc czy obejmuje trasę zapisu („account route”) i jaki rozmiar jest dla niej „oversized”, ustala cykl | czy trasa zapisu bierze limit 16 KiB z D-104 (i trafi na niego z programami gracza), czy inny, i ile serwer trzyma na gracza |
| 10 | Wczytanie przechodzi przez funkcję symulacji, która dostaje zapis z serwera i oddaje stan gry albo odmowę (inna wersja, archetyp spoza danych, zły kształt); zdanie wiążące D-04 dostaje obok wyborów gracza i upływu czasu „zapis stanu gry, który przeglądarka pobrała z serwera”. | decision | pytanie 10 (A; Mariusz, 2026-10-29); zmienia D-04: “changes the game state only through functions of the simulation, to which it passes the player's choices and the passing of real time”; przy tej zmianie cykl ocenia też drugie zdanie D-04 (“pure functions that take a game state and a span of game minutes …”) wobec funkcji wczytania (Context) | czy widok zastępuje stan gry wczytanym zapisem sam (wbrew przykładowi złamania D-04), czy przez funkcję symulacji, i jak to zapisać w D-04 |

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:23-49` Goals and non-goals

## Goals and non-goals

Goals:

- A saved game state per account, stored in `loop2_accounts` in schema version 4, read and replaced
  only by that account's valid session (To do 1, 3).
- Two routes and their client methods, a version number of the shape carried beside the game, a
  revision number the server gives each accepted save (To do 2, 4, 5, 8).
- One simulation function that turns a downloaded document into a game state or a refusal, and its
  counterpart that turns a game state into the document (To do 11, 12).
- The browser's save mechanism: the moments of saving, one request at a time, retry, the header
  sentence, conflict, outdated tab, too large, expired session with the state kept in page memory,
  logout that saves first (To do 7–10).
- The order in which the page builds the game: session, then the saved game state, then the game,
  landing on a manual map run where the state holds one (To do 6).
- The foundation entries, the new kind `saved-game` with its exemplar and guidelines, and the deploy
  skill's text (To do 12–15).

Non-goals:

- No moment of saving in the document (`savedAtMs`) and no catch-up: task 18 adds both (Out of
  scope). The document holds the version and the game state, nothing else.
- No migration of a saved game state between versions: another version is discarded whole.
- No copy of saved game states in browser storage (`localStorage`, `sessionStorage`, IndexedDB).
- No `navigator.sendBeacon`, no new shared control, no "Zapisano o …" line, no button „Zapisz”.
- No deletion of a saved game state on blocking; no saved-at column, no history of saves.
- No change of D-62, D-132, D-173, D-137, D-139.

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:51-77` Constraints

## Constraints

- The task's answers 1–23 and rows 1–10 fix every sentence the player sees, its role and the
  behaviour at each outcome; this spec does not reopen them.
- D-04 (state changed only through the simulation), D-07 (the server computes nothing of the game),
  D-96, D-97, D-101 (several browsers signed in at once), D-104 (Origin and JSON body guard),
  D-108 (relative `/api/` paths), D-109 (the session alone authorizes; a supplied identifier grants
  nothing — its closed lists of what a session authorizes and of the routes that answer JSON 401
  change in this change to take the save routes, see *Foundation entries*), D-112 (one step per schema version, appended, never edited; refuse a newer schema),
  D-117 (client: relative paths, no redirect, typed failure, time limit, no state of its own),
  D-137 (blocking deletes sessions), D-12 (no agent changes the server).
- Invariants `simulation-isolation` and `simulation-inputs` bind the new simulation file; the file
  must not import from outside `src/browser/sim/` nor change its argument.
- `src/server/**` is a trust boundary; the saved game state the server returns is untrusted for the
  simulation (step 4 answer of the handoff). Both places refuse crafted input.
- Environment: the Fetch Standard caps the bodies of all in-flight `keepalive` requests of a page at
  64 kibibytes together — "If the sum of contentLength and inflightKeepaliveBytes is greater than
  64 kibibytes, then return a network error." (whatwg/fetch `fetch.bs`, commit e9460d1b22ea, §
  HTTP-network-or-cache fetch); MDN: a transition to `hidden` "is the last event that's reliably
  observable by the page" (mdn/content `files/en-us/web/api/document/visibilitychange_event/index.md`,
  commit 9a0e5c1cfa8d). Both read 2026-10-29.
- Code as it stands (dce2970): `GameState` is plain JSON-able data (`src/browser/sim/types.ts:279`);
  `checkProgram` already checks an unknown value as a program (`src/browser/sim/programs.ts:196`);
  `createGameView()` always starts from `newGame()` (`src/browser/view/game-view.ts:47`); the page
  builds the game right after `GET /api/account` (`src/browser/view/app.ts:87`); `mutationGuards`
  fixes the body limit at 16 KiB for every route it guards (`src/server/transport.ts:82`); the
  router's transport check covers every path of its `paths` table (`src/server/account-routes.ts`).

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:114-141` 2. Where the version stands and what forces its bump

### 2. Where the version stands and what forces its bump

- The simulation file `src/browser/sim/saved-game.ts` holds the constant of the current version of
  the shape, starting at 1. The browser sends it as `version` beside `game`; the server stores it in
  its own column and compares only that integer (D-07, row 4).
- The load function (decision 5) builds the game state field by field as a value of the
  `GameState` type, so a field added to or removed from `GameState` or a type it reaches fails the
  type check until the load function changes; it refuses every missing or extra key.
- A test of the new kind holds, written out in the test, one saved document of the current version
  that fills every optional branch (a map run with a campfire, a burning item, a combat record, a
  copy whose program was deleted, a discovery held, counts beside a program; its map run written
  paused, so the load's pause changes nothing in it) and asserts that it loads into the state it
  describes and that the constant equals the version written beside it. A
  shape change makes the strict load refuse that document, so the test turns red; the kind's
  guideline rule says the document is rewritten only together with a raised version, and review
  checks the pair. The documents of earlier versions stay in the test, each refused as another
  version.
- Content data whose identifiers a type enumerates in full belong to the shape: today only
  `Backpack` (`Record<ItemId, number>`) does, so a new item of the data raises the version. An
  identifier that a type holds as a member of a list (map, resource, creature, action and condition
  kinds) is checked against the data at load.

Rejected: review alone — a missed bump is found only when a player's save fails to load or, worse,
loads into a state the rules do not describe; a digest of the source text of `types.ts` pinned in a
test — every comment edit trips it, and data-derived key types escape it; a declarative schema whose
digest is pinned per version — mechanical end to end, but a schema interpreter with typed unions is
a larger piece of code than the rest of the change. Cost if wrong: a bump is still a human act at
review; the red test makes the shape change visible, not the bump automatic.

#### `.runs/task-cycles/zapis-stanu-na-serwerze/spec.md:188-226` 5. The simulation's load function and its counterpart (new kind saved-game)

### 5. The simulation's load function and its counterpart (new kind `saved-game`)

Unit `src/browser/sim/saved-game.ts`, the first file and exemplar of kind `saved-game`:

- The version constant (decision 2).
- A function from a game state to the saved document `{ version, game }`, pure, sharing nothing it
  could later change with the state passed.
- A function from an unknown value (the `save` object the client hands over, or the document kept
  in page memory) to either a game state or a refusal with one of three reasons, `version`,
  `archetype`, `shape`. It never throws and changes nothing passed to it. In order: not an object
  with an integer `version` → `shape`; a version other than the current one → `version`; a team
  whose characters list is readable and names an archetype absent from the data → `archetype`;
  anything else that the state's types, closed lists and data do not admit → `shape`.
- What "admit" covers: every key present and no other (own keys only, `__proto__` included);
  numbers finite and safe integers where the type is an identity, a count or a minute; enumerated
  values on their closed lists (pace on the data's paces, condition and action kinds, death causes);
  identifiers of maps, resources, items, creatures and the campfire present in the data; programs
  through the existing program check; the references the simulation follows existing — the map
  run's character in the team, the copy's program on the list or null with its deleted name,
  identities below their next counters and unique, picks and programs used last naming listed
  programs; the map run's tiles of the number its map's layout gives. The maker may refuse more,
  never less.
- A map run that goes on (no death, no completion) comes back paused, at the game minute, pace and
  carried real time of the document; an ended one comes back as it ended, so the view shows its
  screen after the end with „Restart” and „Zakończ” and its copy open to editing (D-62, D-132,
  D-173 unchanged). Nothing advances it: no real time and no time away enters the load (answer 8,
  answer 15 B).
- The boundary with `simulation-module`: the new kind's guideline claims `src/browser/sim/saved-game.ts`
  (the file that turns a downloaded document into a game state or a refusal, and back); the
  `simulation-module` guideline's *When to read* excludes it as it excludes content data, and the
  index row in `guidelines/coding.md` names the new kind. The sentence „Wzorzec zapisu gry powstanie
  przy pierwszej implementacji” changes in the same change. The guideline's rules: simulation
  isolation, unchanged arguments, a refusal instead of a throw for every crafted input, and the
  version bump with the shape (decision 2). The new meaning goes to the human through
  `the-way-maintain-coding-guidelines` (WAY-172).

Rejected: load in the view, which replaces the state itself — the violation example of D-04; a
lenient load that fills missing keys — a migration by another name, against "discarded in full";
the load putting a running map run on pause in the view — the pause is a rule of the game state.
