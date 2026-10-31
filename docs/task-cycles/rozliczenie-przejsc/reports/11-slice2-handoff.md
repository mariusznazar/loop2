# Handoff — executor of Slice 2 — A character has a generation and a resurrection, task `rozliczenie-przejsc`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the executor of one slice, a fresh agent.
Your questions go to the orchestrator, never to the human; you return at your slice's boundary.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\rozliczenie-przejsc`, branch
  `task/rozliczenie-przejsc`, head `de432c6`. Process pin `.the-way` at `a8dfe8a`. Pinned quality
  tools stand in `.runs/quality-venv`; `node_modules` is installed.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes.
- Variant: "a slice, or the retry of a slice".
- Report path: `.runs/task-cycles/rozliczenie-przejsc/reports/11-slice2-report.md`
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

What an earlier slice taught: the review of Slice 1 found ten red cases in `tests/view/account-screen.test.mjs`, a file outside that slice's *Change*, because it held its own copy of the version. Beyond your *Checks*, run `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` after `npm run build`, give its command and exit code, and where a test outside your *Change* needs a new key, fix it, name it and report the reach. `SAVED_GAME_VERSION` is already 2; the load's rules of Slice 1 stand.

## Your slice, the plan's section word for word (`.runs/task-cycles/rozliczenie-przejsc/plan.md`)

### Slice 2 — A character has a generation and a resurrection

- **Goal:** `Character` holds `generation`, 1 at creation, and `resurrectionReadyAtMs`, 0 at creation; `RunCharacter` gains nothing. `BALANCE.resurrectionRenewalRealMinutes` is 480. `resurrectionReady(character, nowMs)`, exported from `game.ts`, is the one comparison and is true from the moment of readiness on, that moment included. The load reads both keys strictly as spec decision 9 gives, and every document this slice's game saves loads back. The version stays 2: no saved game state of that version exists anywhere, as the comment over the document in the test says.
- **Change:** `src/browser/sim/data/balance.ts` · `src/browser/sim/types.ts` ·
  `src/browser/sim/game.ts` · `src/browser/sim/saved-game.ts` · `tests/sim/data.test.mjs` ·
  `tests/sim/team.test.mjs` · `tests/sim/saved-game.test.mjs` · `tests/sim/death.test.mjs` ·
  `stryker.config.json`
- **Read:** `.runs/task-cycles/rozliczenie-przejsc/task.md:25-26` To do, items 8 and 9 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:29-29` To do, item 12 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:43-47` Questions to settle, W1 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:111-113` Questions to settle, Q10 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:135-153` Context, the table of loop ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:24-45` Constraints ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:83-95` Decisions, 3 ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:229-269` Decisions, 9 and 10 ·
  rows Row 8, Row 9, Row 11 and Row 12 of the plan's Foundation entries, as written ·
  `foundations/decisions.md:57-107` D-04 · `foundations/decisions.md:377-395` D-18 ·
  `foundations/decisions.md:1104-1130` D-56 · `foundations/decisions.md:1716-1730` D-94 ·
  `foundations/decisions.md:3346-3358` D-190 · `foundations/decisions.md:3374-3388` D-192 ·
  `foundations/decisions.md:3615-3640` D-206 · `foundations/decisions.md:3828-3890` D-212, D-213 ·
  `foundations/invariants.md:214-235` simulation-isolation, simulation-inputs ·
  `foundations/invariants.md:518-527` character-team ·
  `foundations/invariants.md:598-607` mutation-test-selection ·
  `foundations/invariants.md:1028-1037` save-version ·
  `foundations/part_map.md:28-59` simulation · `foundations/part_map.md:79-110` build-tools ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/coding-content-data.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  loop at commit cdc7c0d, outside this repository (C:/Storage/repos/loop, read with git show):
  src/sim/death.test.ts:77-81, src/sim/data/balance.ts:125, src/sim/roster.test.ts:18 and
  src/sim/sim.test.ts:2002-2003
- **Model:** cheaper
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts` reads `Character.generation` and `Character.resurrectionReadyAtMs`
- **Checks:** Start from failing cases: a new `tests/sim/death.test.mjs`, listed in `stryker.config.json`, with `resurrectionReady` before, at and after the moment under `// invariant: resurrection-renewal` (To do 12), and `tests/sim/data.test.mjs` pinning 480 and citing loop (To do 9). Expected values that change: `tests/sim/team.test.mjs:53` (To do 8). In `tests/sim/saved-game.test.mjs` both documents' characters gain the keys, rewritten at version 2 under the exception the comment at `:29`–`:38` already states; the rows of decision 9 for these keys join `CRAFTED`, and a load case admits a moment below zero. Then: `npm run typecheck` · `npm test -- tests/sim/death.test.mjs` · `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/team.test.mjs` · `npm test -- tests/sim/saved-game.test.mjs` · `npm run build` · `npm test -- tests/quality/test_mutation_test_selection.py` · `npm test -- tests/quality/test_node_test_selection.py` · `npm test -- tests/invariants/test_character_team.py` · `npm test -- tests/invariants/test_simulation_inputs.py` · `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 1 · Foundation entries: Row 8 · Row 9 · Row 11 · Row 12

The foundation entries were written in commit `0363149`, so the ranges of the plan's *Read* have
moved: the current ones stand under *Current ranges* below and they hold. Rows of the plan's
*Foundation entries* name these entries: D-189, D-190, D-179, D-04, D-03, `trip-transfer` and
`trip-run-end` changed; Row 1 is D-214, Row 2 D-194, Row 3 D-215, Row 4 D-216, Row 5 D-217, Row 6
D-218, Row 7 D-219, Row 8 D-220, Row 9 `resurrection-renewal`, Row 10 `death-settled-once`, Row 11
`resurrection`, Row 12 `generation number`.

## Current ranges

| Entry | Range now |
|---|---|
| `D-04` | `foundations/decisions.md:57-118` |
| `D-18` | `foundations/decisions.md:388-406` |
| `D-56` | `foundations/decisions.md:1115-1141` |
| `D-94` | `foundations/decisions.md:1727-1741` |
| `D-190` | `foundations/decisions.md:3359-3373` |
| `D-192` | `foundations/decisions.md:3389-3403` |
| `D-206` | `foundations/decisions.md:3630-3655` |
| `D-212` | `foundations/decisions.md:3843-3880` |
| `D-213` | `foundations/decisions.md:3881-3906` |
| `D-220` | `foundations/decisions.md:4021-4035` |
| `resurrection-renewal` | `foundations/invariants.md:1048-1057` |
| `resurrection` | `foundations/glossary.md:206-211` |
| `generation number` | `foundations/glossary.md:212-217` |
| `simulation-isolation` | `foundations/invariants.md:214-225` |
| `simulation-inputs` | `foundations/invariants.md:226-235` |
| `character-team` | `foundations/invariants.md:518-527` |
| `mutation-test-selection` | `foundations/invariants.md:598-607` |
| `save-version` | `foundations/invariants.md:1028-1037` |
| `simulation` | `foundations/part_map.md:28-59` |
| `build-tools` | `foundations/part_map.md:79-110` |

## Passages of the task and the spec, copied word for word

### task.md:25-26 — To do, items 8 and 9

8. Każda postać ma numer pokolenia, 1 dla nowej postaci, i jedno wskrzeszenie, gotowe od założenia postaci (pytanie W1).
9. Czas odnowienia wskrzeszenia stoi w danych balansu: 480 minut realnych (pytanie Q10).

### task.md:29-29 — To do, item 12

12. Wskrzeszenie jest gotowe także dokładnie w chwili swojej gotowości (pytanie W1).

### task.md:43-47 — Questions to settle, W1

- W1. Czy testy loop wiążą to zadanie tak jak liczby z jego danych?
  - Answer: Tak: dla zadań gry 14 i 18 testy loop rozstrzygają to, co pokrywają, a odejście od nich jest nazwaną decyzją. W tym zadaniu wchodzą w ten sposób wiersze tabeli zachowań w *Context*, między innymi: zużyte wskrzeszenie wraca 8 godzin po śmierci, a śmierć bez gotowego wskrzeszenia nie przesuwa tej chwili. Przyjęty koszt: wchodzą też zachowania, których nikt świadomie nie wybierał.
  - Not chosen:
    - B — testy są tylko materiałem — około dziesięciu punktów dostaje własne pytanie, a definicja traktuje znaczące odejście od loop jako obalenie celu.
  - Source: człowiek — Mariusz, 2026-10-30, „przyjmuję wszystko zgodnie z rekomendacjami” (pakiet rundy zadań 14, 17, 18 i 21, pozycja W1, droga A), zapisane w planie `plan_mvp_loop2.md` (sha256 7eb77bdd1418), dziennik zmian, linia 300. Definicja, linia 72, daje testy jako wejście.

### task.md:111-113 — Questions to settle, Q10

- Q10. Skąd biorą się liczby tego zadania?
  - Answer: Liczby z danych loop są przyjętym wymaganiem tam, gdzie loop je ma; refiner pokazuje ich tabelę do wglądu i pyta tylko o to, czego loop nie rozstrzyga. Tabela stoi w *Context*.
  - Source: człowiek — Mariusz, 2026-10-29, „przyjmuję wszystkie według rekomendacji”, zapisane w planie `plan_mvp_loop2.md` (sha256 7eb77bdd1418), dziennik zmian, linia 277.

### task.md:135-153 — Context, the table of loop

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

### spec.md:83-95 — Decisions, 3

### 3. A character holds its generation and the moment its resurrection is ready

`Character` gains `generation: number`, 1 at creation, and `resurrectionReadyAtMs: number`, 0 at
creation (To do 8; loop `readyAtMs: 0`). `RunCharacter` gains nothing. `BALANCE` gains
`resurrectionRenewalRealMinutes: 480` (To do 9, D-18; loop `src/sim/data/balance.ts:125`).

`resurrectionReady(character, nowMs)`, exported from `game.ts`, is the one comparison: true from the
moment of readiness on, that moment included (To do 12). The view and the settlement both call it.

The number is a plain value of the typed `BALANCE`, pinned by a data test. Neither the guideline of
content data nor the load has a check for it, and none is added: a stored moment says nothing of
the renewal it came from, and a changed renewal applies to the next death.


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

