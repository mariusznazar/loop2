# Handoff — spec designer, task `rozliczenie-przejsc`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **designer** of the spec, a fresh
agent. Your questions go to the orchestrator, never to the human; you return before any plan,
slice or code.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\rozliczenie-przejsc`, branch
  `task/rozliczenie-przejsc`, head = base `95de83b` (`main`). Process pin `.the-way` at `a8dfe8a`,
  not moved by this task.
- Method: `.the-way/task-cycle/spec/SKILL.md` in the worktree. Read it whole; read a file it names
  (`design.md` beside it included) only when the step or variant that names it comes.
- Variant: you write the spec (designer).
- Frozen task: `.runs/task-cycles/rozliczenie-przejsc/task.md` — read it whole, 254 lines; the Read
  tool shows it in two pages. Its *Questions to settle*, *Context*, *Decisions in play* and
  *Settlements to record* hold the answers the human gave and the entries the design rests on.
- Spec path: `.runs/task-cycles/rozliczenie-przejsc/spec.md`
- Report path: `.runs/task-cycles/rozliczenie-przejsc/reports/01-spec-design-report.md`
- The product's instructions: `AGENTS.md` in the worktree, and `src/browser/AGENTS.md`. Do not
  commit; the spec stays in the ignored `.runs/`. Do not run the product's gate (`npm test`); it is
  the orchestrator's.
- Reading loop's code and tests at `C:\Storage\repos\loop`, commit `cdc7c0d`, is allowed where the
  task cites them. Nothing is written outside the worktree.

## Answers of step 4

- Trust boundary: **yes**. The part map names `src/browser/sim/saved-game.ts` as the trust boundary
  of `simulation`. The change adds new fields to the game state, so that file reads them out of a
  document from outside: a forged or malformed value must be refused whole. Every code review of
  the cycle checks crafted input there.
- Irreversible operation: **yes**. Raising `SAVED_GAME_VERSION` (To do 21) makes the game discard
  every older saved game state in full at load (D-206) once the merge deploys `main` (D-11). The
  human accepted that cost in the task (Q4, *Context*). The cycle only prepares the raised number
  and performs nothing on the server; the human performs it by merging.

## The open design choice

The task's section *Questions carried to cycle* leaves these open (quoted word for word from the
frozen task):

> - Jak chwila realna śmierci z zegara przeglądarki (pytanie Q11) trafia do symulacji, skoro `passRealTime` dostaje dziś sam upływ czasu, a D-04 i niezmiennik `simulation-isolation` każą podawać czas realny jako argument; rozliczenie nie może zmienić wyniku `minute-span-split`.
> - Jak siedziba poznaje, czy wskrzeszenie jest już gotowe, i odświeża czas z pytania Q8, skoro widok rysuje grę „only from the game state and the game's content data” (D-04), a chwila bieżąca nie stoi w stanie gry.
> - Gdzie przejście trzyma to, że nie płaci, skoro po domknięciu, które rozwiązało mapę, lista rozwiązanych map już ją ma, a ekran po tym domknięciu i linie z pytania Q6 muszą dalej mówić o tym przejściu.
> - Gdzie stan gry trzyma, jak rozliczono śmierć, skoro linia z pytania Q7 i numer pokolenia w jej tekście mają przeżyć wczytanie zapisu.

The first two reach D-04. Whether D-04 changes, or stays with an answer that keeps it true, is
yours to weigh; a foundation entry the design needs beyond those the task carries is written out
in the spec for the foundation step. Beside these four, the spec gives the design that the task's
*To do* items and *Settlements to record* rows 1–12 rest on where they leave the mechanism open —
among others:

- how a game minute's completion and death settle against the run's start-time mark in
  `advanceMinutes`, once, and how the settlement cannot run twice (rows 9–10, To do 12, 16) — a
  load of a saved game state on the screen after death does not go through it;
- what a restart takes from the team after a death that took everything, since `startRun` reads
  the skills from the run it replaces and `programOf` computes the repertoire from them (task,
  *Context*, kod loop2), while a restart otherwise keeps the skills it started with (D-200: "a run
  keeps the skills with which it starts") and To do 17 keeps the retained screen as it was;
- what a run takes on a start of a solved map (To do 5): `takeTrip` with no chest, the trip's
  line „Plan wyprawy wejdzie przycięty…” (D-188) and the entry cap unchanged;
- the lines of the map-run screen (To do 6, 7, 18) in `tripTexts`, `game-view.ts` and their order,
  on a run whose map is solved at start, a run on an unsolved map, and a retained run after load;
- the headquarters lines (To do 19, 20) in `renderTeam`, what refreshes them and at what rhythm
  (the human accepted "siedziba musi odświeżać się z upływem czasu"), and how a game-state-free
  moment reaches a view that draws only from the game state and the content data;
- what the clock passes on each tick and how it stays one source for death and for the
  headquarters; the moment comes from the browser's clock (Q11), which may go backwards;
- the shape change of the game state and the load check in `saved-game.ts` with the raised
  `SAVED_GAME_VERSION` (To do 21), under `guidelines/coding-saved-game.md`; a save timing change
  is not expected, and if the design needs one, D-207 is in the reading;
- the balance data entry for the 480 minutes (To do 9), its validation under
  `guidelines/coding-content-data.md`;
- what `foundation_check.py` and the task's *Settlements to record* need of the entries: which
  rows become which entries, and which existing decisions, invariants and glossary terms change
  (To do 22 names D-189, D-190, D-194, `trip-transfer`, `trip-run-end`, `solved-map-manual-run`,
  and the two parts of projected entries). Decisions the cycle writes get their next free
  numbers; the task's *Scope* words come from the part map;
- the wording rule of Q9 for the rows of *Settlements to record*;
- where the invariants of rows 9 and 10 are tested (`guidelines/testing.md`).

Do not reopen an answer of *Questions to settle*: each is the human's. Where a word of an answer
turns out not to fit the code, return `questions`.

## What to read

Read the frozen task whole, then:

- Foundation (`foundations/decisions.md`, each decision whole, by its heading): D-04, D-07, D-18,
  D-39, D-40, D-53, D-55, D-56, D-61, D-62, D-71, D-96, D-118, D-119, D-122, D-132, D-173, D-179,
  D-183, D-185, D-186, D-187, D-188, D-189, D-190, D-191, D-192, D-194, D-196, D-199, D-200, D-201,
  D-206, D-207, D-208, D-211, D-212, D-213.
- `foundations/invariants.md`, each whole: `simulation-isolation`, `simulation-inputs`,
  `map-run-repeatability`, `restart-seed`, `minute-span-split`, `character-team`, `trip-transfer`,
  `trip-run-end`, `save-version`, and those their tests or your design reach.
- `foundations/glossary.md`: `manual map run`, `completion`, `solved map`, `map run restart`,
  `practice`. `foundations/part_map.md`: the entries `simulation`, `browser-view`.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`,
  `guidelines/coding-saved-game.md`, `guidelines/coding-content-data.md`,
  `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`,
  `guidelines/testing.md`.
- Code: `src/browser/sim/game.ts`, `run.ts`, `trip.ts`, `skills.ts`, `types.ts`, `saved-game.ts`,
  `data/balance.ts`; `src/browser/view/clock.ts`, `app.ts`, `game-saver.ts`, `game-view.ts`,
  `trip-lines.ts`, `headquarters.ts`, `character-skills.ts`, and the tests in `tests/sim/`
  (`trip.test.mjs`, `skills.test.mjs`, `saved-game.test.mjs`, `time.test.mjs`) and `tests/view/`
  that these reach.

The definition `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md`
(sha256 `fda97782458d…`), lines 1452–1462, 1503–1510 and 2178–2181, holds the projected entries;
the frozen task quotes the parts it needs.
