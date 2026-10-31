# Handoff — executor of Slice 3 — A death is settled once, on the browser's clock, task `rozliczenie-przejsc`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the executor of one slice, a fresh agent.
Your questions go to the orchestrator, never to the human; you return at your slice's boundary.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\rozliczenie-przejsc`, branch
  `task/rozliczenie-przejsc`, head `8949515`. Process pin `.the-way` at `a8dfe8a`. Pinned quality
  tools stand in `.runs/quality-venv`; `node_modules` is installed.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes.
- Variant: "a slice, or the retry of a slice".
- Report path: `.runs/task-cycles/rozliczenie-przejsc/reports/13-slice3-report.md`
- Do not run the product's gate (`npm test` with no file argument); it is the orchestrator's. Each
  check you report carries its command and exit code. Commands of the plan's *Checks* in the form
  `npm test -- <file>` run that one file.
- Before writing any script read `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md`.
- Code is written in English; texts the game shows stay in Polish, word for word from the task.

## Git

Commit on the task branch, in the worktree, by explicit paths (never `git add -A`, `.` or
`commit -a`). Messages in English in the form of the repository's commits, for instance
`feat: :sparkles: …`, `test: :white_check_mark: …`, `fix: :bug: …`. Do not push. Check that the
commits' address is `mariusznn@gmail.com` (`git log -1 --format='%h %ae'`). `.runs/` is ignored and
stays out of commits. Leave the worktree clean.

## Answers of step 4

- Trust boundary: **yes**. The part map names `src/browser/sim/saved-game.ts` as the trust boundary
  of `simulation`. A forged or malformed value in a document from outside must refuse it whole.
- Irreversible operation: **yes**. Raising `SAVED_GAME_VERSION` makes the game discard every older
  saved game state in full at load (D-206) once the merge deploys `main` (D-11). The cycle only
  prepares the raised number and performs nothing on the server; the human performs it by merging.

What earlier slices taught: the review of Slice 1 found ten red cases in `tests/view/account-screen.test.mjs` from a change outside that slice's list. Beyond your *Checks*, run `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` after `npm run build`, give its command and exit code, and name any test outside your *Change* you touch. A test that saves a death made by `advanceMinutes` and loads it back goes through `settleDeath` first. `resurrectionReady` and `BALANCE.resurrectionRenewalRealMinutes` stand from Slice 2; `tests/sim/death.test.mjs` exists. Should this slice prove too large, the plan's report names `restart` (spec decision 6) as its seam; return as your method gives.

## Your slice, the plan's section word for word (`.runs/task-cycles/rozliczenie-przejsc/plan.md`)

### Slice 3 — A death is settled once, on the browser's clock

- **Goal:** `GameMapRun` holds `deathSettlement`, null until settled. `settleDeath(state, nowMs)` of `game.ts` settles a death as spec decisions 4 and 5 give and returns the very state it got where there is nothing to settle. `restart` takes the skills, for the run and for its repertoire alike, from the team's character after a `progressLost` settlement and from the run it replaces otherwise (decision 6). `clock.ts` reads `Date.now()` once on each flush and uses that one reading for `settleDeath` and for `send`, and on each reading hands the store one result: the events of `passRealTime` with the settled state, so the store, the saver and the screen never see a death unsettled. `advanceMinutes` and `passRealTime` keep their signatures. The load reads `deathSettlement` as decision 9 gives, which refuses a death unsettled; the version stays 2. The doc comment of `passRealTime` stops calling it the only way real time enters.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/game.ts` ·
  `src/browser/sim/saved-game.ts` · `src/browser/view/clock.ts` · `tests/sim/death.test.mjs` ·
  `tests/sim/saved-game.test.mjs` · `tests/view/clock.test.mjs` ·
  `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/rozliczenie-przejsc/task.md:27-34` To do, items 10–17 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:43-47` Questions to settle, W1 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:63-72` Questions to settle, Q3 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:114-118` Questions to settle, Q11 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:135-155` Context, the table of loop and the code ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:24-45` Constraints ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:83-184` Decisions, 3 to 7 ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:229-269` Decisions, 9 and 10 ·
  rows D-190, Row 7, Row 9, Row 10, Row 11, Row 12 and D-04 of the plan's Foundation entries, as
  written ·
  `foundations/decisions.md:57-107` D-04 · `foundations/decisions.md:1084-1103` D-55 ·
  `foundations/decisions.md:1191-1220` D-61, D-62 · `foundations/decisions.md:1356-1370` D-71 ·
  `foundations/decisions.md:1746-1760` D-96 · `foundations/decisions.md:2082-2107` D-119 ·
  `foundations/decisions.md:2436-2460` D-132 · `foundations/decisions.md:3087-3101` D-173 ·
  `foundations/decisions.md:3346-3373` D-190, D-191 · `foundations/decisions.md:3404-3418` D-194 ·
  `foundations/decisions.md:3434-3448` D-196 · `foundations/decisions.md:3494-3508` D-200 ·
  `foundations/decisions.md:3615-3684` D-206, D-207 ·
  `foundations/decisions.md:3828-3890` D-212, D-213 ·
  `foundations/invariants.md:165-175` map-run-repeatability ·
  `foundations/invariants.md:198-235` player-map-run-pace, simulation-isolation, simulation-inputs ·
  `foundations/invariants.md:309-318` restart-seed ·
  `foundations/invariants.md:518-537` character-team, minute-span-split ·
  `foundations/invariants.md:958-977` trip-transfer, trip-run-end ·
  `foundations/invariants.md:1028-1037` save-version ·
  `foundations/part_map.md:3-59` browser-view, simulation ·
  `foundations/glossary.md:65-72` map run restart · `foundations/glossary.md:118-130` Understanding,
  repertoire · `foundations/glossary.md:181-186` practice ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/skills.ts` · `src/browser/view/game-view.ts:101-180` the store and the saver ·
  `src/browser/view/game-saver.ts` · `tests/sim/skills.test.mjs:284-302` a restart keeps its skills ·
  `tests/sim/trip.test.mjs:95-116` the practice of a run after its completion ·
  `tests/invariants/test_minute_span_split.py` ·
  loop at commit cdc7c0d, outside this repository (C:/Storage/repos/loop, read with git show):
  src/sim/death.test.ts and src/sim/death.ts
- **Model:** same — one reading of the clock has to reach both the simulation and the view, and every test that saves a death made by `advanceMinutes` changes with it
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts` reads `deathSettlement`, a closed list with a number
- **Checks:** Start from failing cases in `tests/sim/death.test.mjs` for To do 10–17 under `// invariant: resurrection-renewal` and `// invariant: death-settled-once`, row 10's load case as spec decision 10 gives, and a `Restart` after a wiping death that drops a branch action from the run and keeps it in the Understanding. In `tests/view/clock.test.mjs`, with `Date` mocked: one reading on each flush, the same reading for `settleDeath` and `send`, one result to the store. Expected values and helpers that change: in `tests/sim/saved-game.test.mjs` the document gains the key, rewritten at version 2 under the same exception; the case at `:547` holds a settlement; the crafted deaths at `:766` and `:865` hold a valid settlement, so each stays refused for the reason its name gives; „a death in combat” at `:1271` passes through `settleDeath`; the rows of decision 9 for this key join `CRAFTED`. In `tests/view/account-screen.test.mjs` the helper at `:1179` settles before saving, and the case at `:1546` gains an assertion that the death is saved settled. Then: `npm run typecheck` · `npm test -- tests/sim/death.test.mjs` · `npm test -- tests/sim/saved-game.test.mjs` · `npm test -- tests/sim/skills.test.mjs` · `npm test -- tests/sim/trip.test.mjs` · `npm test -- tests/view/clock.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/game-saver.test.mjs` · `npm run build` · `npm test -- tests/invariants/test_minute_span_split.py`, its file unchanged · `npm test -- tests/invariants/test_restart_seed.py` · `npm test -- tests/invariants/test_simulation_inputs.py` · `npm test -- tests/invariants/test_simulation_isolation.py` · `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 2 · Foundation entries: D-190 · Row 7 · Row 9 · Row 10 · Row 11 · Row 12 · D-04

The foundation entries were written in commit `0363149`, so the ranges of the plan's *Read* have
moved: the current ones stand under *Current ranges* below and they hold. Rows of the plan's
*Foundation entries* name these entries: D-189, D-190, D-179, D-04, D-03, `trip-transfer` and
`trip-run-end` changed; Row 1 is D-214, Row 2 D-194, Row 3 D-215, Row 4 D-216, Row 5 D-217, Row 6
D-218, Row 7 D-219, Row 8 D-220, Row 9 `resurrection-renewal`, Row 10 `death-settled-once`, Row 11
`resurrection`, Row 12 `generation number`.

## Current ranges

| Entry | Range now |
|---|---|
| `D-190` | `foundations/decisions.md:3359-3373` |
| `D-04` | `foundations/decisions.md:57-118` |
| `D-55` | `foundations/decisions.md:1095-1114` |
| `D-61` | `foundations/decisions.md:1202-1216` |
| `D-62` | `foundations/decisions.md:1217-1231` |
| `D-71` | `foundations/decisions.md:1367-1381` |
| `D-96` | `foundations/decisions.md:1757-1771` |
| `D-119` | `foundations/decisions.md:2093-2118` |
| `D-132` | `foundations/decisions.md:2447-2471` |
| `D-173` | `foundations/decisions.md:3098-3112` |
| `D-191` | `foundations/decisions.md:3374-3388` |
| `D-194` | `foundations/decisions.md:3419-3433` |
| `D-196` | `foundations/decisions.md:3449-3463` |
| `D-200` | `foundations/decisions.md:3509-3523` |
| `D-206` | `foundations/decisions.md:3630-3655` |
| `D-207` | `foundations/decisions.md:3656-3699` |
| `D-212` | `foundations/decisions.md:3843-3880` |
| `D-213` | `foundations/decisions.md:3881-3906` |
| `D-219` | `foundations/decisions.md:4003-4020` |
| `resurrection-renewal` | `foundations/invariants.md:1048-1057` |
| `death-settled-once` | `foundations/invariants.md:1058-1075` |
| `resurrection` | `foundations/glossary.md:206-211` |
| `generation number` | `foundations/glossary.md:212-217` |
| `map-run-repeatability` | `foundations/invariants.md:165-175` |
| `player-map-run-pace` | `foundations/invariants.md:198-213` |
| `simulation-isolation` | `foundations/invariants.md:214-225` |
| `simulation-inputs` | `foundations/invariants.md:226-235` |
| `restart-seed` | `foundations/invariants.md:309-318` |
| `character-team` | `foundations/invariants.md:518-527` |
| `minute-span-split` | `foundations/invariants.md:528-537` |
| `trip-transfer` | `foundations/invariants.md:958-967` |
| `trip-run-end` | `foundations/invariants.md:968-977` |
| `save-version` | `foundations/invariants.md:1028-1037` |
| `map run restart` | `foundations/glossary.md:65-72` |
| `Understanding` | `foundations/glossary.md:118-124` |
| `repertoire` | `foundations/glossary.md:125-130` |
| `practice` | `foundations/glossary.md:181-186` |
| `browser-view` | `foundations/part_map.md:3-27` |
| `simulation` | `foundations/part_map.md:28-59` |

## Passages of the task and the spec, copied word for word

### task.md:27-34 — To do, items 10–17

10. Śmierć przy gotowym wskrzeszeniu zużywa je: wskrzeszenie będzie znowu gotowe w chwili realnej śmierci powiększonej o czas odnowienia, a wprawa, wykupione stopnie i numer pokolenia zostają (pytania Q3 i W1).
11. Śmierć bez gotowego wskrzeszenia zabiera całą wprawę i każdy wykupiony stopień postaci, a jej numer pokolenia rośnie o jeden; imię, archetyp i miejsce w drużynie zostają, a chwila gotowości wskrzeszenia się nie przesuwa (pytania Q3 i W1).
12. Wskrzeszenie jest gotowe także dokładnie w chwili swojej gotowości (pytanie W1).
13. Czas odnowienia liczy zegar przeglądarki, więc nie zależy od tempa i biegnie także wtedy, gdy gra jest zamknięta (pytanie Q11).
14. Każda śmierć, także przy gotowym wskrzeszeniu i także w ręcznym przejściu mapy rozwiązanej, kończy przejście, zabiera to, co postać niosła, i nie płaci niczym z przejścia (D-61, D-190, D-194; pytania Q1 i Q3).
15. Programy, skrzynka, Zrozumienie i rozwiązane mapy przeżywają każdą śmierć (wpis „What does a character's death take?”).
16. Śmierć rozlicza się raz, w minucie śmierci, więc wczytanie zapisu na ekranie po śmierci nie rozlicza jej drugi raz (pytanie W1; test loop `src/sim/death.test.ts:83`–`87`).
17. Zachowane na ekranie przejście zostaje, jakie było (D-200), a „Restart” po śmierci bez gotowego wskrzeszenia startuje z postacią już bez wprawy i stopni.

### task.md:43-47 — Questions to settle, W1

- W1. Czy testy loop wiążą to zadanie tak jak liczby z jego danych?
  - Answer: Tak: dla zadań gry 14 i 18 testy loop rozstrzygają to, co pokrywają, a odejście od nich jest nazwaną decyzją. W tym zadaniu wchodzą w ten sposób wiersze tabeli zachowań w *Context*, między innymi: zużyte wskrzeszenie wraca 8 godzin po śmierci, a śmierć bez gotowego wskrzeszenia nie przesuwa tej chwili. Przyjęty koszt: wchodzą też zachowania, których nikt świadomie nie wybierał.
  - Not chosen:
    - B — testy są tylko materiałem — około dziesięciu punktów dostaje własne pytanie, a definicja traktuje znaczące odejście od loop jako obalenie celu.
  - Source: człowiek — Mariusz, 2026-10-30, „przyjmuję wszystko zgodnie z rekomendacjami” (pakiet rundy zadań 14, 17, 18 i 21, pozycja W1, droga A), zapisane w planie `plan_mvp_loop2.md` (sha256 7eb77bdd1418), dziennik zmian, linia 300. Definicja, linia 72, daje testy jako wejście.

### task.md:63-72 — Questions to settle, Q3

- Q3. Czy gotowe wskrzeszenie ratuje przejście, czy przejście kończy się śmiercią jak dziś, a wskrzeszenie chroni wprawę, stopnie i numer pokolenia?
  - Answer: Gotowe wskrzeszenie nie ratuje przejścia: przejście kończy się śmiercią jak dziś, postać traci to, co niosła, a przejście nie płaci niczym. Wskrzeszenie chroni przed tym, co śmierć zabiera „też”: całą wprawą, każdym wykupionym stopniem i wzrostem numeru pokolenia. Samo się przy tym zużywa.
    - Definicja, „(new) — What does a character's death take?”: “A character's death takes what it carried and pays nothing of its map run; when the character has no resurrection ready, it also takes all its practice and every rank of branch it bought, and the character's generation number grows by one, its archetype unchanged. The programs, the chest, the Understanding and the solved maps survive every death. Each character has one resurrection, used up by a death and renewed after a span of real time set in the balance data, eight hours to start, and a death without one stops the character's earning loop.”
    - D-61: “A character dies in the game minute in which its health reaches zero, also during the character's action in progress, and the map run then ends in death with its cause.”
    - Definicja, „(new) — What pays, and what takes from the chest?”: “a run that ends in death pays neither loot nor practice”.
    - Definicja, „(new) — How fast does the earning loop go?”, dla zadania 18: “Each map run of an earning loop is a map run of its own, followed at once by the next as long as the earning loop goes on.”
    - Ta sama odpowiedź wiąże zadanie 18, jego pytanie Q16.
    - Rozjazd, którego pozycja C3 nie pokazała, pokazał człowiekowi drugi pakiet, a człowiek go nie poprawił: definicja, In scope, linia 44, mówi „śmierć zabiera postać”, co czytane dosłownie sięga szerzej niż cytat wyżej, więc to zdanie czyta się przez ten cytat.
    - Cel planu, wiersz 14, po zmianie z 2026-10-30 zgadza się z tą odpowiedzią (plan, dziennik zmian, linia 303).
  - Source: cytat zostawiony przez człowieka — Mariusz, 2026-10-30, „przyjmuję wszystko zgodnie z rekomendacjami” (pakiet, pozycja C3). Definicja (sha256 fda97782458d), linie 44, 1456, 1376–1377, 1505–1510. Fundament przy `95de83b`: D-61 `foundations/decisions.md:1193`. Plan (sha256 7eb77bdd1418), wiersz 14, linia 23, i dziennik zmian, linia 303.

### task.md:114-118 — Questions to settle, Q11

- Q11. Czyim zegarem liczy się odnowienie wskrzeszenia: przeglądarki czy serwera?
  - Answer: Zegarem przeglądarki, jak w loop, tym samym, którym zadanie 18 liczy chwilę zapisu. Przyjęty koszt: zły zegar urządzenia skraca albo wydłuża odnowienie, a gracz może oszukać, zmieniając zegar, co D-07 przyjmuje dla własnego postępu.
  - Not chosen:
    - B — zegar serwera — nowa wersja bazy kont z krokiem człowieka na serwerze, zmiana dwóch decyzji, a otwarta karta i tak idzie zegarem przeglądarki, więc w grze byłyby dwa zegary.
  - Source: człowiek — Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet, pozycja D21, droga A). Pytanie kanoniczne dla zadań 14 i 18: rozmowa zadania 18, Q8. Materiał: D-04 `foundations/decisions.md:57`; D-07 `:149`.

### task.md:135-155 — Context, the table of loop and the code

- Liczby i zachowania z danych i testów loop (`C:\Storage\repos\loop`, commit `cdc7c0d`), które wiążą to zadanie (pytania Q10 i W1):

| Co | Wartość w loop | Gdzie |
|---|---|---|
| czas odnowienia wskrzeszenia | 480 minut realnych | `src/sim/data/balance.ts:125` |
| numer pokolenia nowej postaci | 1 | `src/sim/roster.test.ts:18`, `src/sim/sim.test.ts:2003` |
| wskrzeszenie nowej postaci | gotowe (`readyAtMs: 0`) | `src/sim/sim.test.ts:2002` |
| chwila gotowości po zużyciu | chwila śmierci + czas odnowienia | `src/sim/death.test.ts:42` |
| śmierć bez gotowego wskrzeszenia | chwila gotowości bez zmiany, numer pokolenia + 1, umiejętności od zera | `src/sim/death.test.ts:48`–`59` |
| chwila równa gotowości | liczy się jako gotowe | `src/sim/death.test.ts:77`–`81` |
| drugie rozliczenie tej samej śmierci | nic nie zmienia | `src/sim/death.test.ts:83`–`87` |
| co przeżywa wyzerowanie | skrzynka, rozwiązane mapy, Zrozumienie, programy, tożsamość postaci | `src/sim/death.test.ts:61`–`75` |
| archetyp przy wyzerowaniu | zostaje | `src/sim/death.test.ts:98`–`111` |
| czynność z wykupionej gałęzi po wyzerowaniu | zostaje w Zrozumieniu, wypada z repertuaru | `src/sim/death.test.ts:113`–`127` |
| wyposażenie ręcznego przejścia mapy rozwiązanej | wchodzi także to, czego nie ma w skrzynce; udźwig dalej przycina; skrzynka nietknięta | `src/sim/chest.test.ts:316`–`338` |
| przejście na mapie rozwiązanej | to, czy nie płaci, zapada na starcie | `src/sim/chest.test.ts:358`–`367`, `src/sim/skills.test.ts:470`–`480` |
| powtórne ręczne domknięcie | nie odkłada nic, wprawa nie wchodzi do umiejętności, a zostaje przy przejściu | `src/sim/chest.test.ts:407`–`419`, `src/sim/skills.test.ts:454`–`468` |

- Testy loop niosą też napisy „Wskrzeszenie zużyte” (`src/sim/death.test.ts:45`), które zostaje na początku tekstu z pytania Q7, i „postać nr 2” (`:58`), od którego pytanie Q8 odchodzi jako od nazwanej decyzji.
- Kod loop2 (`95de83b`): „Restart” bierze umiejętności z przejścia, które zastępuje, nie z postaci drużyny (`startRun`, `src/browser/sim/game.ts:147`–`149`), a repertuar liczy z tych samych umiejętności (`programOf`, `:118`), więc bez zmiany „Restart” po wyzerowaniu oddałby przejściu wykupione stopnie.
- Kod loop2: zegar czyta `performance.now()` i podaje symulacji upływ czasu, a `Date.now()` tylko przy wysłaniu postaci (`src/browser/view/clock.ts:37`–`52`).

### spec.md:24-45 — Constraints

## Constraints

- The human's answers in *Questions to settle* are closed. W1 binds the tests of loop named in
  *Context*; the departure from „postać nr 2” is named in Q8.
- D-04: real time enters the simulation as an argument; `simulation-isolation` holds, and
  `src/browser/view/clock.ts` stays the one place that reads a clock.
- `minute-span-split`: the states and events of a span stay independent of how it is split, and the
  check of that invariant stays as it is.
- D-207: the 30-second check and the hidden page send a state that changed since the last save, and
  a tab that has just loaded sends nothing until the player acts. The saver finds a change by the
  identity of the state, so the passing of real time at the headquarters may not make a new state.
- D-212, `coding-saved-game.md`: no real time enters the load, and nothing settles at the load.
- D-200, test `tests/sim/skills.test.mjs:284`: a restart keeps the skills of the run it replaces.
  Test `tests/sim/trip.test.mjs:95` pins the same for the practice of a run after its completion.
- D-55: one manual map run at a time, so a map becomes solved through the run on the screen alone.
- Trust boundary: `src/browser/sim/saved-game.ts`. Each new value is read strictly, and a forged or
  malformed one refuses the document whole, as `shape`. Every code review of the cycle checks
  crafted input there.
- Irreversible: raising `SAVED_GAME_VERSION` discards every older saved game state once the merge
  deploys `main` (D-206, D-11; accepted in Q4 and *Context*). The cycle prepares the number and
  performs nothing on the server.
- `foundations/` is written through the project skills, in the foundation step.

### spec.md:83-184 — Decisions, 3 to 7

### 3. A character holds its generation and the moment its resurrection is ready

`Character` gains `generation: number`, 1 at creation, and `resurrectionReadyAtMs: number`, 0 at
creation (To do 8; loop `readyAtMs: 0`). `RunCharacter` gains nothing. `BALANCE` gains
`resurrectionRenewalRealMinutes: 480` (To do 9, D-18; loop `src/sim/data/balance.ts:125`).

`resurrectionReady(character, nowMs)`, exported from `game.ts`, is the one comparison: true from the
moment of readiness on, that moment included (To do 12). The view and the settlement both call it.

The number is a plain value of the typed `BALANCE`, pinned by a data test. Neither the guideline of
content data nor the load has a check for it, and none is added: a stored moment says nothing of
the renewal it came from, and a changed renewal applies to the next death.

### 4. A death is settled by its own function, beside the passing of game time (first open question)

`settleDeath(state, nowMs): GameResult` in `game.ts`, the function loop has under the same name
(`src/sim/death.ts`), called by whoever knows real time:

- With no run, a run with no death, or a death already settled, it returns the very state it got,
  without reading `nowMs`. Otherwise a `nowMs` that is no safe integer is a `RangeError`.
- With a ready resurrection: `resurrectionReadyAtMs` becomes `nowMs` plus the renewal in
  milliseconds; practice, ranks and generation stay (To do 10).
- Without one: `skills` become `newSkills` of the archetype's predispositions, `generation` grows by
  one, `resurrectionReadyAtMs` stays (To do 11). The name, archetype and place in the team stay.
- Both set the run's settlement of decision 5. The chest, programs, Understanding and solved maps
  are out of its reach (To do 15). The run's own skills stay (To do 17, D-200).
- The mark of decision 1 plays no part: a death on a marked run costs the same (Q1, To do 14).

`advanceMinutes` and `passRealTime` keep their signatures, and neither settles a death, so
`minute-span-split` compares what it compared before. `clock.ts` composes the two:
on each reading it passes the elapsed time to `passRealTime`, gives the state returned to
`settleDeath` with the same reading, and hands the store one result, the events of `passRealTime`
with the settled state. So the store, the saver and the screen never see a death unsettled, and
the game minute of death and its settlement are one step of the clock (To do 16). `settleDeath`
returns the same state on an unchanged game, so `store.apply` stays silent as it does today.

A death unsettled is a value of `advanceMinutes` and `passRealTime` alone. The load refuses it
(decision 9), so a saved game state cannot carry a death past its settlement.

Rejected:

- The moment as a third argument of `advanceMinutes` — about 200 lines of tests across 30 files and
  Python invariant checks take a value that means nothing to them, or a default fake moment, which
  hides a caller that forgot it; and D-04 gives functions that pass game time a span of game minutes.
- The moment as a third argument of `passRealTime` alone, settling there —
  `tests/invariants/test_minute_span_split.py` compares `passRealTime` splits with an `advanceMinutes`
  reference at the minute of death, and they would differ, or the check would change.
- The current reading kept in the game state — see decision 7.

Cost if wrong: task 18's catch-up has to call `settleDeath` itself with a computed moment, as loop
does. A later caller of `advanceMinutes` that forgets it saves a death the next load refuses, which
discards that game state, so its review has to look for that call.

### 5. The run holds how its death was settled (fourth open question)

`GameMapRun` gains `deathSettlement: DeathSettlement | null`, null until settled, beside `deposited`,
which does the same for a completion. `DeathSettlement` is `{ kind: "resurrectionUsed" }` or
`{ kind: "progressLost"; generation: number }`, the second holding the number the line of Q7 names
(To do 18). This key is also what makes the settlement run once: `settleDeath` is called on every
reading, a retained death included, and a loaded screen after death passes through it unchanged.

Rejected: the number read from the team's character — it could move under a retained screen once
other map runs exist, and the line would then name a later number; the sentence kept in the state —
its words belong to the view; the moment of death stored instead — the line reads no time (Q7).

### 6. „Restart” after a death that took everything starts from the team

`restart` takes the skills from the team's character when the run it replaces holds a
`progressLost` settlement, and from that run in every other case, as today. The same skills give
the repertoire in `programOf`, so a branch action drops out of the new run and stays in the
Understanding and in the copy (loop `death.test.ts:113`–`127`). A new run starts with no settlement
(To do 17).

Rejected: every restart reads the team — the expected values of the two tests in *Constraints*
change with no requirement behind them, D-200's sentence is about a run keeping its skills, and only
this case needs the difference; the retained run's skills wiped along with the team — against
To do 17 and D-200's *Verification*. Cost if wrong: one condition in `restart`.

### 7. One reading of the browser's clock, with the current reading staying out of the game state (second open question)

`clock.ts` reads `Date.now()` once on each flush, beside `performance.now()`, and uses that one
reading for `settleDeath` and for `send`. Elapsed time stays measured by `performance.now()`, so a
wall clock that jumps changes no pace. Clock contract adds: the moment of its latest reading, read
at the start too, and a call after each flush that tells the view a reading was made.

A clock that goes backwards, forwards or below zero needs no handling: the moment is a safe integer
of any sign, stored as it comes, and the view shows what the arithmetic gives (Q11 accepts the
cost). The renewal runs while the game is closed because the state holds a moment, not a countdown
(To do 13).

D-04 changes: the view draws the game from the game state, the content data and this moment, and
D-03, which repeats the sentence, follows. See *Foundation entries*. A moment the game state stores
of an event, as `resurrectionReadyAtMs` is, stands apart from this: it is written once, at the event.

Rejected: the current reading stored in the game state on every reading, which keeps D-04's
sentence — each tick makes a new state, so the saver sends a save every 30 real seconds at an idle
headquarters and after a load, against D-207, and a stale moment enters the saved document; a sim
function that takes the moment and returns text to draw — D-04's sentence stays false in substance,
with content in the simulation; a second timer in the headquarters — a second reader of the clock.

Cost if wrong: one clause of D-04 and of D-03 to write back, and no change of the saved document.


### spec.md:229-269 — Decisions, 9 and 10

### 9. The saved document

`SAVED_GAME_VERSION` becomes 2; the document of version 1 stays in `tests/sim/saved-game.test.mjs`
and is refused as `version` (To do 21, `coding-saved-game.md`). `savedGame` needs no change.

The load reads, strictly, in `saved-game.ts`:

| Key | Admits |
|---|---|
| `Character.generation` | an identity, from 1 up |
| `Character.resurrectionReadyAtMs` | a safe integer of any sign (decision 7); no check against any clock |
| `solvedMapRun` | a boolean; a run with no completion has it equal to whether `solvedMaps` holds the map; a run with a completion requires the map in `solvedMaps` |
| `deposited` | as today, and `[]` at a completion of a marked run |
| `deathSettlement` | null exactly when the run has no death; a closed list of kinds, each with exactly its keys; a `generation` from 2 up to the current generation of the run's character |

`solvedMaps` is read before the run. `Records` gains what these checks need. No key is filled in.
The equality of the `solvedMapRun` row rests on D-55; task 18 may relax it for runs of an earning
loop. A forged far-future moment is admitted: it costs its own player alone (D-07).

### 10. Tests

| What | Where | Marker and source |
|---|---|---|
| rows 9, 10; To do 10–17; `Restart` after wiping | new `tests/sim/death.test.mjs`, listed in `stryker.config.json` | `// invariant: resurrection-renewal`, `// invariant: death-settled-once`; loop `death.test.ts`. Row 10's load case: `loadSavedGame(savedGame(state))` on a settled death, then `settleDeath` at a later moment, change nothing |
| To do 1–5, 14 | `tests/sim/trip.test.mjs` | `// invariant: solved-map-manual-run`, `trip-transfer`, `trip-run-end`; loop `chest.test.ts`, `skills.test.ts`, with its lines |
| To do 9 | `tests/sim/data.test.mjs` | the number 480, citing loop |
| the load | `tests/sim/saved-game.test.mjs` | the document of version 2 fills each branch; each row of decision 9 joins the table of crafted documents under `// invariant: save-version` |
| To do 6, 7, 18 | `tests/view/trip.test.mjs` | a pure-function table of the screens of decision 8, a loaded one included |
| To do 19, 20, Q12 | `tests/view/headquarters.test.mjs` | Q12's three examples, the moment of readiness, a clock set back, the label at 1 and 2 |
| one reading; settled state to the store; hook after a flush | `tests/view/clock.test.mjs` | mocked `Date` |
| death saved settled | `tests/view/account-screen.test.mjs:1546` | an added assertion |

Tests whose expectations change, each by requirement, among them: `tests/sim/skills.test.mjs:537`
(To do 2; its run holds no mark, so that case still pays, and its name stops being true),
`tests/sim/trip.test.mjs:109` (To do 3, 5: that restart stops taking from the chest),
`tests/sim/trip.test.mjs:333` (To do 5: its run starts on a solved map and takes from the chest),
`tests/sim/trip.test.mjs:361` (To do 3, 5: its restart follows a completion),
`tests/sim/team.test.mjs:53` (To do 8), and the helpers that save a death made by
`advanceMinutes`, such as `tests/view/account-screen.test.mjs:1179`, which call `settleDeath` before
saving. `tests/invariants/test_minute_span_split.py` stays as it is.

