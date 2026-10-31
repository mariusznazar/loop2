# Handoff — executor of Slice 4 — The map-run screen says what the run pays and what the death took, task `rozliczenie-przejsc`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the executor of one slice, a fresh agent.
Your questions go to the orchestrator, never to the human; you return at your slice's boundary.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\rozliczenie-przejsc`, branch
  `task/rozliczenie-przejsc`, head `8737dba`. Process pin `.the-way` at `a8dfe8a`. Pinned quality
  tools stand in `.runs/quality-venv`; `node_modules` is installed.
- Method: `.the-way/task-cycle/change/SKILL.md` in the worktree. Read it whole; read a file it names
  only when the step or variant that names it comes.
- Variant: "a slice, or the retry of a slice".
- Report path: `.runs/task-cycles/rozliczenie-przejsc/reports/15-slice4-report.md`
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

What earlier slices leave you: `deathSettlement` and `solvedMapRun` stand on `GameMapRun`; `settleDeath(state, nowMs)` in `game.ts` makes a settled death. Line numbers of code and tests in the plan have moved; find each place by its name. Beyond your *Checks*, run `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` after `npm run build` and give its command and exit code. For the browser, use the skill `playwright-mcp` through the Skill tool and load the Playwright tools with ToolSearch. The harness file stays under `.runs/task-cycles/rozliczenie-przejsc/`, its copy in the ignored `dist/public/`; keep the screenshots under `.runs/task-cycles/rozliczenie-przejsc/reports/` and name them in your report. Stop the server at the end.

## Your slice, the plan's section word for word (`.runs/task-cycles/rozliczenie-przejsc/plan.md`)

### Slice 4 — The map-run screen says what the run pays and what the death took

- **Goal:** The screens of spec decision 8's first table stand as it gives. `createTripLines` gains two elements and `trip-lines.ts` two pure functions of the state, `tripTexts` staying as it is. The line of To do 6 stands whenever `run.solvedMapRun` is true, under the body row and backpack, above the practice line. The line of To do 18 stands at `deposited`'s place, read from `deathSettlement` alone, its role a class on `.trip-result`, and draws nothing while the settlement is null. A loaded screen is the same screen. No token, role or shared control changes.
- **Change:** `src/browser/view/trip-lines.ts` · `src/browser/view/game-view.ts` ·
  `src/browser/styles.css` · `tests/view/trip.test.mjs`
- **Read:** `.runs/task-cycles/rozliczenie-przejsc/task.md:23-24` To do, items 6 and 7 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:35-35` To do, item 18 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:84-97` Questions to settle, Q6 and Q7 ·
  `.runs/task-cycles/rozliczenie-przejsc/task.md:156-156` Context, the lines of the screen ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:24-45` Constraints ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:185-207` Decisions, 8, the map-run screen ·
  `.runs/task-cycles/rozliczenie-przejsc/spec.md:248-269` Decisions, 10 ·
  rows Row 3 and Row 4 of the plan's Foundation entries, as written ·
  `foundations/decisions.md:57-107` D-04 · `foundations/decisions.md:814-843` D-39, D-40 ·
  `foundations/decisions.md:1206-1220` D-62 · `foundations/decisions.md:1570-1595` D-87, D-88 ·
  `foundations/decisions.md:2166-2201` D-122 · `foundations/decisions.md:2436-2460` D-132 ·
  `foundations/decisions.md:2707-2721` D-147 · `foundations/decisions.md:3281-3306` D-185, D-186 ·
  `foundations/decisions.md:3509-3523` D-201 · `foundations/decisions.md:3828-3865` D-212 ·
  `foundations/invariants.md:458-477` browser-view-token-values, browser-view-focus-outline ·
  `foundations/part_map.md:3-27` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.the-way/task-cycle/change/ui_check.md` · `src/browser/view/status-row.ts` ·
  `src/browser/view/body-row.ts` · `src/browser/tokens.css` · `tests/view/account-screen.test.mjs:1178-1185` a game ended in a death
- **Model:** cheaper
- **Risk:** none
- **Checks:** Start from a failing pure-function table in `tests/view/trip.test.mjs` over the six rows of decision 8's table, a loaded screen included, with To do 7's preview and deposit lines. Then: `npm run typecheck` · `npm test -- tests/view/trip.test.mjs` · `npm test -- tests/view/account-screen.test.mjs` · `npm run build` · `npm test -- tests/invariants/test_browser_view_token_values.py`. State check and screenshot: an ignored harness under `.runs/task-cycles/rozliczenie-przejsc/`, copied into the ignored `dist/public/`, mounts the real `createGameView` with a stub client on states the simulation's functions make, one for each of the six rows and each kind of death, and `python -B -m http.server 8768 --bind 127.0.0.1 --directory dist/public` serves it. Through the `playwright-mcp` skill, read the DOM order and each line's computed role and inspect a screenshot of each state at a desktop width and at 480×900. Report what this shows and that it does not show the way through an account, and stop the server. Where this route fails, report the failed check itself.
- **Depends on:** Slice 1 · Slice 3 · Foundation entries: Row 3 · Row 4

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
| `D-39` | `foundations/decisions.md:825-839` |
| `D-40` | `foundations/decisions.md:840-854` |
| `D-62` | `foundations/decisions.md:1217-1231` |
| `D-87` | `foundations/decisions.md:1581-1593` |
| `D-88` | `foundations/decisions.md:1594-1606` |
| `D-122` | `foundations/decisions.md:2177-2212` |
| `D-132` | `foundations/decisions.md:2447-2471` |
| `D-147` | `foundations/decisions.md:2718-2732` |
| `D-185` | `foundations/decisions.md:3292-3304` |
| `D-186` | `foundations/decisions.md:3305-3317` |
| `D-201` | `foundations/decisions.md:3524-3538` |
| `D-212` | `foundations/decisions.md:3843-3880` |
| `D-215` | `foundations/decisions.md:3925-3940` |
| `D-216` | `foundations/decisions.md:3941-3963` |
| `browser-view-token-values` | `foundations/invariants.md:458-467` |
| `browser-view-focus-outline` | `foundations/invariants.md:468-477` |
| `browser-view` | `foundations/part_map.md:3-27` |

## Passages of the task and the spec, copied word for word

### task.md:23-24 — To do, items 6 and 7

6. Od minuty zero do „Restart” albo „Zakończ” na ekranie ręcznego przejścia mapy rozwiązanej, pod wierszem ciała i plecakiem, nad linią „Wprawa w tym przejściu”, stoi w roli `text-secondary` linia „Mapa jest już rozwiązana: to przejście nic nie płaci i nic nie bierze ze skrzynki.” (pytanie Q6, część a; czas trwania, miejsce i rola to propozycja refinera przyjęta przy cięciu kandydatów, wiersz 3).
7. Na tym ekranie linia „Wyniesie” brzmi „Wyniesie: nic”, gdy migawka listy wynoszenia coś wymienia, linia „Wprawa w tym przejściu” stoi jak przy każdym przejściu, a po domknięciu stoi „Do skrzynki nic nie trafiło.” (pytanie Q6, części b i c; D-185).

### task.md:35-35 — To do, item 18

18. Po śmierci, w miejscu, w którym po domknięciu stoi „Do skrzynki: …” (pod linią odkrycia i akapitem spotkania, nad wierszem ciała), do „Restart” albo „Zakończ”, także po wczytaniu zapisu, stoi linia: po zużyciu wskrzeszenia w `text-secondary` „Wskrzeszenie zużyte: wprawa i wykupione stopnie zostają.”, a gdy wskrzeszenie nie było gotowe, w `danger` „Wskrzeszenie nie było gotowe: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie {n}.” (pytanie Q7; czas trwania i role to propozycja refinera przyjęta przy cięciu kandydatów, wiersz 4).

### task.md:84-97 — Questions to settle, Q6 and Q7

- Q6. Co gracz widzi na ekranie ręcznego przejścia mapy rozwiązanej: czy gra mówi, że przejście nic nie płaci, jak brzmi tam linia „Wyniesie” i czy stoi linia „Wprawa w tym przejściu”?
  - Answer:
    - (a) Gra mówi: stała linia „Mapa jest już rozwiązana: to przejście nic nie płaci i nic nie bierze ze skrzynki.” Przyjęty koszt: linia więcej na ekranie. Pozycja D3 pokazała sam tekst; czas trwania, miejsce i rola to propozycja refinera przyjęta przy cięciu kandydatów (wiersz 3): od minuty zero do „Restart” albo „Zakończ”, pod wierszem ciała i plecakiem, nad linią „Wprawa w tym przejściu”, w roli `text-secondary`.
    - (b) Przy migawce, która coś wymienia, linia brzmi „Wyniesie: nic”. D-186: “During a map run, below the backpack, „Wyniesie: {item} {count}, …” in `text-secondary` gives what completion in that game minute would put in the chest from the frozen bring list, clipped by the backpack, free chest room and the map's exit cap. The line stands when the snapshot lists something or differs from the copy's bring list, reads „Wyniesie: nic” when that transfer is empty, and disappears after death and completion.” Krok agenta, nie cytat: po tym zadaniu takie domknięcie nic nie odkłada, bo “A manual run of a solved map pays nothing.”, więc przeniesienie jest puste.
    - (c) Linia stoi. D-201: “Below the body row the map-run view currently shows a line in the role `text`, „Wprawa w tym przejściu: {umiejętność} +{n} · …”, listing the skills with positive practice gathered in that run. Zero-valued skills and the line at zero are currently absent, and the positive line remains after death and completion until „Restart” or „Zakończ”.” *Verification*, complies: “the same positive practice line retained after death, although the run pays nothing”. *Rationale*: “Accepted with it: the line does not itself distinguish paid practice from practice lost on death.” D-194: “A manual map run holds the practice it gathers separately by character skill”.
  - Not chosen:
    - (a) B — brak linii — gracz może stroić program w przekonaniu, że zarabia.
  - Source: (a) człowiek — Mariusz, 2026-10-30, „przyjmuję wszystko zgodnie z rekomendacjami” (pakiet, pozycja D3, droga A); (b) i (c) cytaty zostawione przez człowieka, te same słowa (pozycje C4 i C5). Fundament przy `95de83b`: D-186 `foundations/decisions.md:3296`; D-194 `:3406`; D-201 `:3511`, `:3517`, `:3521`; definicja (sha256 fda97782458d), linia 1455.
- Q7. Skąd gracz po śmierci wie, co ona zabrała: gdzie, jakim tekstem i w jakiej roli gra mówi o zużytym wskrzeszeniu i o stracie dorobku?
  - Answer: Droga A — osobna linia w miejscu, w którym po domknięciu stoi „Do skrzynki: …” (pod linią odkrycia i akapitem spotkania, nad wierszem ciała), także po wczytaniu zapisu. Po zużyciu wskrzeszenia: „Wskrzeszenie zużyte: wprawa i wykupione stopnie zostają.” Bez gotowego wskrzeszenia, tekstem ostrzegawczym: „Wskrzeszenie nie było gotowe: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie {n}.” Pierwszy tekst nie podaje godzin, bo po wczytaniu zapisu liczba mogłaby być już fałszywa. Przyjęty koszt: stan gry musi pamiętać, jak rozliczono tę śmierć. Pozycja D4 nie pokazała ról ani czasu trwania linii; to propozycja refinera przyjęta przy cięciu kandydatów (wiersz 4): do „Restart” albo „Zakończ”, pierwszy tekst w `text-secondary`, drugi w `danger`.
  - Not chosen:
    - B — to samo w wierszu stanu — bardzo długi wiersz i zmiana przyjętego brzmienia.
    - C — nic na ekranie, tylko siedziba — gracz może dać „Restart”, nie wiedząc, że stracił dorobek.
  - Source: człowiek — Mariusz, 2026-10-30, „przyjmuję wszystko zgodnie z rekomendacjami” (pakiet, pozycja D4, droga A). Materiał: D-62 `foundations/decisions.md:1206`; D-185 `:3281`; D-212 `:3828`; D-39 `:814`; test loop `src/sim/death.test.ts:45`.

### task.md:156-156 — Context, the lines of the screen

- Kod loop2: linia „Wyniesie” i linia „Do skrzynki” powstają w `tripTexts` (`src/browser/view/trip-lines.ts:26`), a kolejność linii ekranu przejścia stoi w `src/browser/view/game-view.ts:223`–`232`.

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

### spec.md:185-207 — Decisions, 8, the map-run screen

### 8. What the screens show

Map-run screen, from the top, in `game-view.ts`; `createTripLines` gains two elements and
`trip-lines.ts` two pure functions of the state, `tripTexts` staying as it is:

| Screen | Above the body row | Below it, in order |
|---|---|---|
| going on, unmarked run | as today | practice line; preview |
| going on, marked run | as today | line of To do 6; practice line; preview, reading nothing |
| completion, unmarked | deposit line | practice line |
| completion, marked | deposit line, reading nothing | line of To do 6; practice line |
| death, unmarked | line of To do 18 | practice line |
| death, marked | line of To do 18 | line of To do 6; practice line |

„Above the body row” keeps today's order: the discovery line and the last-encounter paragraph first,
then the line of the end. A loaded screen is the same screen, read from the same keys.

- The line of To do 6 stands whenever `run.solvedMapRun` is true, from minute zero, on the ends and
  after a load; „Restart” on a solved map starts a run that shows it again. In `text-secondary`.
- The line of To do 18 stands at `deposited`'s place, read from `deathSettlement` alone: `text-secondary`
  for `resurrectionUsed`, `danger` for `progressLost`. A class on the existing `.trip-result`, as
  `.body-value.danger` does, carries the role. It draws nothing while the settlement is null.


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

