# Handoff — executor of Slice 5 — The headquarters shows the resurrection and the generation, task `rozliczenie-przejsc`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the executor of one slice, a fresh agent.
Your questions go to the orchestrator, never to the human; you return at your slice's boundary.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\rozliczenie-przejsc`, branch
  `task/rozliczenie-przejsc`, head `3eb2a8d`. Process pin `.the-way` at `a8dfe8a`. Pinned quality
  tools stand in `.runs/quality-venv`; `node_modules` is installed.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes.
- Variant: "a slice, or the retry of a slice".
- Report path: `.runs/task-cycles/rozliczenie-przejsc/reports/16-slice5-report.md`
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

What earlier slices leave you: `clock.ts` reads `Date.now()` once on each flush for `settleDeath` and `send`; `resurrectionReady(character, nowMs)` stands in `game.ts`. Line numbers of code and tests in the plan have moved; find each place by its name. Beyond your *Checks*, run `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` after `npm run build` and give its command and exit code. For the browser, use the skill `playwright-mcp` through the Skill tool and load the Playwright tools with ToolSearch; Slice 4 left a harness under `.runs/task-cycles/rozliczenie-przejsc/`, whose report `reports/15-slice4-report.md` says how it runs. Keep the screenshots under `.runs/task-cycles/rozliczenie-przejsc/reports/` as `s5-<state>-<width>.png`, open and inspect each one yourself, say which you opened, and stop the server at the end.

## Your slice, the plan's section word for word (`.runs/task-cycles/rozliczenie-przejsc/plan.md`)

### Slice 5 — The headquarters shows the resurrection and the generation

- **Goal:** Each row of the headquarters shows the label of To do 20 from generation 2 up, and the resurrection line of To do 19 on a row of its own under the name and archetype, above „Program:”, as spec decision 8 gives. The pure functions `generationLabel` and `resurrectionLine` give the text and role; `generation` enters `teamKey`. `Clock` gives the moment of its latest reading, read at the start too, and a call after each flush tells the view a reading was made; `Headquarters.update(state, nowMs)` draws the line with the rest, and a second method rewrites these lines alone on every tick while the headquarters shows, writing an element only when its text or role changed. No game state changes and nothing is saved by a tick. The doc comment of `createGameView` stops saying the view draws only from the state.
- **Change:** `src/browser/view/clock.ts` · `src/browser/view/headquarters.ts` ·
  `src/browser/view/game-view.ts` · `src/browser/styles.css` · `tests/view/clock.test.mjs` ·
  `tests/view/headquarters.test.mjs` · `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/rozliczenie-przejsc/task.md:30-30` To do, item 13 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:36-37` To do, items 19 and 20 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:98-107` Questions to settle, Q8 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:114-123` Questions to settle, Q11 and Q12 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:157-157` Context, the headquarters' row ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:24-45` Constraints ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:161-184` Decisions, 7 ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:208-228` Decisions, 8, the headquarters ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:248-269` Decisions, 10 ·
  rows Row 5, Row 6, Row 7, Row 12, D-04 and D-03 of the plan's Foundation entries, as written ·
  `foundations/decisions.md:39-107` D-03, D-04 · `foundations/decisions.md:814-843` D-39, D-40 ·
  `foundations/decisions.md:1084-1130` D-55, D-56 · `foundations/decisions.md:1570-1595` D-87, D-88 ·
  `foundations/decisions.md:3479-3508` D-199, D-200 · `foundations/decisions.md:3641-3684` D-207 ·
  `foundations/invariants.md:458-477` browser-view-token-values, browser-view-focus-outline ·
  `foundations/part_map.md:3-27` browser-view · `foundations/glossary.md:87-93` headquarters ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.the-way/task-cycle/change/ui_check.md` · `src/browser/view/status-row.ts` ·
  `src/browser/view/character-skills.ts` · `src/browser/tokens.css`
- **Model:** cheaper
- **Risk:** none
- **Checks:** Start from failing cases in `tests/view/headquarters.test.mjs`: Q12's three examples, the moment of readiness, a clock set back, the label at 1 and 2. In `tests/view/clock.test.mjs`: the moment read at the start and after each flush, the call after each flush, none after `dispose`. In `tests/view/account-screen.test.mjs`: a case that follows a clock tick to the rewritten line and sees no save. Then: `npm run typecheck` · `npm test -- tests/view/headquarters.test.mjs` · `npm test -- tests/view/clock.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` · `npm test -- tests/view/game-saver.test.mjs` · `npm run build` · `npm test -- tests/invariants/test_browser_view_token_values.py`. State check and screenshot by the harness route of Slice 4: a ready line, a line with hours, one below an hour, one that turns ready within a tick, a character at generation 1 and at 2, at a desktop width and at 480×900, then stop the server. Where this route fails, report the failed check itself.
- **Depends on:** Slice 2 · Slice 3 · Slice 4 · Foundation entries: Row 5 · Row 6 · Row 7 · Row 12 · D-04 · D-03

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
| `D-03` | `foundations/decisions.md:39-56` |
| `D-39` | `foundations/decisions.md:825-839` |
| `D-40` | `foundations/decisions.md:840-854` |
| `D-55` | `foundations/decisions.md:1095-1114` |
| `D-56` | `foundations/decisions.md:1115-1141` |
| `D-87` | `foundations/decisions.md:1581-1593` |
| `D-88` | `foundations/decisions.md:1594-1606` |
| `D-199` | `foundations/decisions.md:3494-3508` |
| `D-200` | `foundations/decisions.md:3509-3523` |
| `D-207` | `foundations/decisions.md:3656-3699` |
| `D-217` | `foundations/decisions.md:3964-3985` |
| `D-218` | `foundations/decisions.md:3986-4002` |
| `D-219` | `foundations/decisions.md:4003-4020` |
| `generation number` | `foundations/glossary.md:212-217` |
| `browser-view-token-values` | `foundations/invariants.md:458-467` |
| `browser-view-focus-outline` | `foundations/invariants.md:468-477` |
| `headquarters` | `foundations/glossary.md:87-93` |
| `browser-view` | `foundations/part_map.md:3-27` |

## Passages of the task and the spec, copied word for word

### task.md:30-30 — To do, item 13

13. Czas odnowienia liczy zegar przeglądarki, więc nie zależy od tempa i biegnie także wtedy, gdy gra jest zamknięta (pytanie Q11).

### task.md:36-37 — To do, items 19 and 20

19. Siedziba pokazuje przy każdej postaci od jej założenia w `text-secondary` „Wskrzeszenie gotowe”, a gdy nie jest gotowe, w `danger` „Wskrzeszenie za {g} godz. {m} min — śmierć zabierze wprawę i wykupione stopnie”, poniżej godziny „za {m} min”, z minutami zaokrąglonymi w górę do pełnej minuty przed podziałem na godziny i minuty (pytania Q8, część a, i Q12; role to propozycja refinera przyjęta przy cięciu kandydatów, wiersz 5).
20. Siedziba pokazuje przy imieniu postaci „pokolenie {n}” od numeru 2 w górę (pytanie Q8, część b; to, że numer stoi w siedzibie, to propozycja refinera przyjęta przy cięciu kandydatów, wiersz 6).

### task.md:98-107 — Questions to settle, Q8

- Q8. Co siedziba pokazuje przy postaci: czy i kiedy stan wskrzeszenia, jakim tekstem, oraz czy i jak numer pokolenia?
  - Answer:
    - (a) Droga A — linia przy każdej postaci od jej założenia: „Wskrzeszenie gotowe”, a gdy nie jest gotowe, ostrzegawczo „Wskrzeszenie za {g} godz. {m} min — śmierć zabierze wprawę i wykupione stopnie”. Przyjęty koszt: siedziba musi odświeżać się z upływem czasu. Pozycja D5 nie pokazała ról ani brzmienia czasu poniżej godziny i zaokrąglenia minut: role `text-secondary` i `danger` to propozycja refinera przyjęta przy cięciu kandydatów (wiersz 5), a czas rozstrzyga Q12.
    - (b) Droga A — przy imieniu „pokolenie {n}”, od numeru 2. Przyjęty koszt: numer rośnie też przy strojeniu Lasu. Pozycja D6 nie nazwała ekranu; siedziba to propozycja refinera przyjęta przy cięciu kandydatów (wiersz 6). To nazwane odejście od napisu „postać nr 2” z testu loop (`src/sim/death.test.ts:58`; pytanie W1), które pokazała droga C.
  - Not chosen:
    - (a) B — ta linia dopiero po pierwszej śmierci — gracz poznaje stawkę, gdy już ją zapłacił.
    - (a) C — samo „gotowe” albo „niegotowe” — gracz nie wie, ile czekać, a kodu prawie nie ubywa.
    - (b) B — to samo od numeru 1 — stały napis, który nic nie mówi, zanim postać umrze.
    - (b) C — „postać nr {n}”, jak w testach loop — myli się z wewnętrznym numerem postaci, tym z D-56.
  - Source: człowiek — Mariusz, 2026-10-30, „przyjmuję wszystko zgodnie z rekomendacjami” (pakiet, pozycje D5 i D6, w obu droga A). Materiał: definicja, linia 1506; D-199 `foundations/decisions.md:3479`; D-39 `:814`; D-56 `:1104`; test loop `src/sim/death.test.ts:58`.

### task.md:114-123 — Questions to settle, Q11 and Q12

- Q11. Czyim zegarem liczy się odnowienie wskrzeszenia: przeglądarki czy serwera?
  - Answer: Zegarem przeglądarki, jak w loop, tym samym, którym zadanie 18 liczy chwilę zapisu. Przyjęty koszt: zły zegar urządzenia skraca albo wydłuża odnowienie, a gracz może oszukać, zmieniając zegar, co D-07 przyjmuje dla własnego postępu.
  - Not chosen:
    - B — zegar serwera — nowa wersja bazy kont z krokiem człowieka na serwerze, zmiana dwóch decyzji, a otwarta karta i tak idzie zegarem przeglądarki, więc w grze byłyby dwa zegary.
  - Source: człowiek — Mariusz, 2026-10-30, „przyjmuję rekomendacje” (pakiet, pozycja D21, droga A). Pytanie kanoniczne dla zadań 14 i 18: rozmowa zadania 18, Q8. Materiał: D-04 `foundations/decisions.md:57`; D-07 `:149`.
- Q12. Jak siedziba podaje czas do gotowości wskrzeszenia, gdy nie jest to równa liczba minut i gdy zostało mniej niż godzina?
  - Answer: Droga A — najpierw zaokrąglenie w górę do pełnej minuty, potem podział na godziny i minuty: 7 godz. 59 min 30 s daje „za 8 godz. 0 min”, 59 min 30 s daje „za 1 godz. 0 min”, a równo 59 min daje „za 59 min”. Poniżej godziny stoi samo „za {m} min”, a minuty idą w górę, żeby gra nie podała czasu krótszego niż naprawdę. Przyjęty koszt: napis mówi o pełnej godzinie, choć brakuje do niej kilkudziesięciu sekund, a bywa w nim „0 min”.
  - Not chosen:
    - B — najpierw podział, potem zaokrąglenie samych minut, co daje „za 7 godz. 60 min” i „za 60 min” — przez minutę w każdej godzinie napis pokazuje 60 minut, co wygląda na błąd gry.
  - Source: człowiek — Mariusz, 2026-10-30, „pytania zgodnie z rekomendacją, wiersze przyjmuję” (drugi pakiet, pozycja 14-Q12, droga A). Testy loop tego nie pokrywają, więc pytanie W1 tego nie rozstrzyga: 25 plików testów przeszukanych po `godz`, `min`, `Wskrzesz`, `zaokr` i `readyAtMs` daje czas gotowości (`src/sim/death.test.ts:42`), a żadnego napisu z czasem do gotowości.

### task.md:157-157 — Context, the headquarters' row

- Kod loop2: wiersz postaci w siedzibie buduje `renderTeam` (`src/browser/view/headquarters.ts:183`–`244`), a linia przycięcia planu stoi przy każdej mapie tego wiersza (`:228`–`236`).

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

### spec.md:161-184 — Decisions, 7

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


### spec.md:208-228 — Decisions, 8, the headquarters

Headquarters, in `headquarters.ts`, each row:

- `generationLabel(generation)`, a pure function, gives the label of To do 20 from 2 up and nothing
  at 1; a span right after the name, in `text-secondary`, the role of the archetype beside it. No
  source names this role; D-40 gives notes this one. `generation` enters `teamKey`, so the row
  rebuilds.
- `resurrectionLine(character, nowMs)`, a pure function, gives the text and whether it is `danger`
  (To do 19). It rounds the time left up to whole minutes, then divides. Below 60 minutes the hours
  drop out of the time phrase and the rest of the sentence stands, the warning after the dash
  included. So 30 seconds left reads as one minute, and a clock set back reads as more than 8 hours.
- The line stands on a row of its own under the name and archetype, above „Program:”.
- `Headquarters.update(state, nowMs)` draws it with the rest, and a second method rewrites these
  lines alone, writing an element only when its text or role changed.

Rhythm: on every clock tick, 200 ms, while the headquarters shows; no game state changes, so nothing
is saved and `store.apply` is not involved. A line changes at most once a minute, and the change to
ready shows within a tick, with no second timer.

Rejected: one line element shared by the death and the deposit — a role to reset and a name that
fits neither; the time left kept in a per-row timer — see decision 7.


### spec.md:248-269 — Decisions, 10

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

