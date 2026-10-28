# Handoff — designer of the spec, task `rozwiazanie-lasu`

## Delegation

The person who requested this cycle (the product's owner) has delegated every intermediate choice of
the cycle to its orchestrator. Send your questions to the orchestrator, never to the human; the
orchestrator's answers are not the human's approval.

## Where and how

- Worktree: `C:\Storage\repos\loop2-wt\rozwiazanie-lasu` — work from its root. Branch
  `task/rozwiazanie-lasu`; base `main` at `6540e4c`; head `c0c51a0` (the task branch's first
  commit, which moved the-way pin from `574a37b` to `3aee7d9`; nothing else changed).
- Method: `.the-way/task-cycle/spec/SKILL.md` (pinned the-way, `3aee7d9`). Read it whole; read a
  file it names, `design.md` beside it included, only when the step that names it comes.
- Stage: **designer** — write the spec. Boundary: the spec. Write no plan and no code, commit
  nothing, change no file outside the two paths below.
- Spec path: `.runs/task-cycles/rozwiazanie-lasu/spec.md`
- Report path: `.runs/task-cycles/rozwiazanie-lasu/reports/05-designer-report.md`
- Frozen task: `.runs/task-cycles/rozwiazanie-lasu/task.md` (copy of
  `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\_zadania\rozwiazanie_lasu_loop2.md`,
  accepted 2026-10-28). Read it whole.

## Answers of step 4

- Trust boundary: no — the change touches none of the part map's trust boundaries.
- Irreversible operation: no.
- Open design choice: yes — the five items of the task's section *Questions carried to cycle*,
  copied here word for word:

> - Gdzie stoi wybrane tempo — w stanie gry czy w widoku — tak, by D-04 („[…] changes the game state only through functions of the simulation, to which it passes the player's choices and the passing of real time.”) dalej opisywał, jak czas realny wchodzi do symulacji, a tempo zostawało przez „Zakończ” i kolejne wysłanie (pytanie 4).
> - Jaki kształt ma warunek rozwiązania w wierszu danych mapy, tak by zadanie 8 dopisało do niego pokonane napaści i mapę otwierającą bez przebudowy.
> - Skąd bierze się napis po domknięciu — „Las rozwiązany” w Lesie — tak, by mapa dopisana później, także o nazwie rodzaju żeńskiego albo nijakiego, dostała poprawną formę: cały napis w danych mapy albo wzór z nazwą mapy; człowiek ustalił napis Lasu (pytanie 6), formy dla innych map nie ustalał.
> - Jak przejście przechowuje passę i domknięcie, a stan gry — mapy rozwiązane, tak by niezmienniki `minute-span-split` w nowym brzmieniu z końcem przejścia (pytanie 14, wiersz 13 *Settlements to record*) i `map-run-repeatability` dalej obowiązywały.
> - Czy przy odkryciu przepada też niepełna reszta czasu realnego przeniesiona z wcześniejszych przekazań, jak przy śmierci (`src/browser/sim/game.ts:361`–`362`, loop2 `9a5f360`: “Where the character dies, time stops there and nothing carries over.”) — wiersz O4 dokumentu zadania 6 i wiersz 4 *Settlements to record* mówią tylko o reszcie czasu przekazanego w tym samym wywołaniu; gracz różnicy nie widzi, bo reszta jest krótsza niż 1/tempo sekundy realnej, ale test niezmiennika `player-map-run-pace` ją ustala.

  The rows of *Settlements to record* and the projected entries the task carries are settled; the
  spec takes them as given and does not reopen them. Line numbers the task cites at loop2 `9a5f360`
  may have moved in the current code (`6540e4c`); read the code as it stands.

## What to read

Of the foundation (`foundations/`), each entry whole, by identifier:

- Decisions: D-04, D-18, D-20, D-21, D-22, D-23, D-24, D-26, D-34, D-35, D-36, D-39, D-44, D-53,
  D-55, D-56, D-60, D-61, D-62, D-71, D-73, D-75, D-80, D-82, D-84, D-88, D-90, D-92, D-93, D-118,
  D-121, D-122, D-123, D-126, D-128.
- Invariants: `player-map-run-pace`, `minute-span-split`, `map-run-repeatability`,
  `simulation-randomness`, `restart-seed`, `action-in-progress`, `simulation-isolation`,
  `simulation-inputs`, `content-identifiers`, `program-rule-pick`, `program-closed-lists`,
  `character-team`.
- Part map: the entries `simulation` and `browser-view` of `foundations/part_map.md`.
- Glossary (`foundations/glossary.md`, short — read whole) and the-way's glossary at
  `.the-way/foundations/glossary.md` for the-way's own terms you meet.

Guideline files, each whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`,
`guidelines/coding-browser-module.md`, `guidelines/coding-content-data.md`,
`guidelines/styleguide-browser-view.md`, `guidelines/testing.md`.

Of the task's sources: the frozen task carries every passage it relies on; read the definition
`C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md` only for a passage
the task names and does not quote. The loop repository (`C:\Storage\repos\loop`) may be read only
in `src/sim/data/` and its tests, as the task's *Context* says.

The code the choices depend on: `src/browser/sim/**` (notably `game.ts`, `types.ts`,
`data/maps.ts`, `data/balance.ts`) and `src/browser/view/**` (notably `clock.ts`,
`status-row.ts`, `headquarters.ts`, `app.ts`), and the tests under `tests/sim/`, `tests/view/` and
`tests/invariants/` that cover the invariants above.

## Report

Write your full report to the report path as the method gives it, and return only your status
(`questions` or `done`), the spec path and the report path.
