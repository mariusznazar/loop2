# Handoff — spec designer, task `petla-zarobkowa`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You are the **designer** of the spec, a fresh
agent. Your questions go to the orchestrator, never to the human; you return before any plan,
slice or code.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\petla-zarobkowa`, branch
  `task/petla-zarobkowa`, head = base `4ed8fcd` (`main`). Process pin `.the-way` at `a8dfe8a`, not
  moved by this task.
- Method: `.the-way/task-cycle/spec/SKILL.md` in the worktree. Read it whole; read a file it names
  (`design.md` beside it included) only when the step or variant that names it comes.
- Variant: you write the spec (designer).
- Frozen task: `.runs/task-cycles/petla-zarobkowa/task.md` — read it whole, 385 lines; the Read tool
  shows it in two pages. Its *Questions to settle*, *Context*, *Decisions in play* and *Settlements
  to record* hold the answers the human gave and the entries the design rests on. Line numbers it
  cites in loop2 code are at `95de83b`; `main` has moved to `4ed8fcd` (task 14 merged), so correct
  them against the worktree.
- Spec path: `.runs/task-cycles/petla-zarobkowa/spec.md`
- Report path: `.runs/task-cycles/petla-zarobkowa/reports/01-spec-design-report.md`
- The product's instructions: `AGENTS.md` in the worktree, and `src/browser/AGENTS.md`. Do not
  commit; the spec stays in the ignored `.runs/`. Do not run the product's gate (`npm test`); it is
  the orchestrator's.
- Reading loop's data and tests at `C:\Storage\repos\loop`, commit `cdc7c0d`, is allowed where the
  task cites them; the definition allows data files and tests, not its engine or interface.
  Nothing is written outside the worktree.

## Answers of step 4

- Trust boundary: **yes**. The part map names `src/browser/sim/saved-game.ts` as the trust boundary
  of `simulation`. The change adds new fields to the game state, so that file reads them out of a
  document from outside: a forged or malformed value must be refused whole. Every code review of
  the cycle checks crafted input there.
- Irreversible operation: **yes**. Raising `SAVED_GAME_VERSION` (To do 10) makes the game discard
  every older saved game state in full at load (D-206) once the merge deploys `main` (D-11). The
  human accepted that cost in the task. The cycle only prepares the raised number and performs
  nothing on the server; the human performs it by merging.

## The open design choice

The task's section *Questions carried to cycle* leaves these open (quoted word for word from the
frozen task):

> - Jak stan gry trzyma przejścia wielu postaci obok jednego ręcznego przejścia: zadanie 11 przyjęło koszt „postacie nie chodzą równolegle aż do zadania 18, które i tak przebuduje przejścia na postać” ([zamrożony opis zadania 11](https://github.com/mariusznazar/loop2/blob/d1d35ac74758abf70ad7875b072ad7d22ce848aa/docs/task-cycles/siedziba-i-druzyna/task.md), pytanie 5), a D-56 mówi, że przejście wskazuje postać jej numerem.
> - Którym generatorem przejście pętli losuje ziarno następnego: D-22 daje jeden generator na rodzaj losowania, a dziś są cztery (`src/browser/sim/random.ts`, `Stream`).
> - Jak zegar widoku przekazuje symulacji czas pętli, tak by pętla szła zegarem świata także przy ukrytej karcie i uśpionym komputerze (definicja: “one game minute per real minute”; `src/browser/view/clock.ts`).
> - Ile zapisów wysyła doliczanie: D-207 każe zapisywać po końcu przejścia, a doliczanie kończy naraz wiele przejść.
> - Jak porównanie „od ostatniego wysłanego zapisu” z D-207 traktuje chwilę zapisu, która zmienia się przy każdym zapisie: D-207, *Verification*: “a tab that has just loaded a saved game state with its map run paused sending nothing until the player acts in it”.

Beside these five, the spec gives the design that the task's *To do* items and *Settlements to
record* rows rest on where they leave the mechanism open — among others:

- the shape of an earning loop in the game state and what `GameState.run`, `paused` and the code
  that reads them become; what the pure functions of game time take and return so that a manual
  run's pause and its screen after its end stop that run and no loop (To do 2, row 20, D-62, D-132),
  and so that `minute-span-split` and `map-run-repeatability` hold for a loop's run;
- how a loop's run is computed by the code a manual run uses, with what differs named: no
  discovery, no pause and no game-written rule (To do 15, rows 16–17), no rule counters (row 4),
  no pay on the manual path, seed from the run before (To do 4), trip plan bound anew at each run
  against the chest (To do 5), the skills at each run's start including a rank bought during the
  loop (To do 9, Q4), a rule in `run.ts` or `game.ts` that assumes the one run;
- the settlement of a loop's completion and of its death: the practice gathered at the loop, what a
  covered death leaves and what an uncovered death takes (To do 6, 7, Q13), the once-only settling
  D-221 and `death-settled-once` require, the resurrection renewed on the real moment a catch-up
  minute carries (To do 14, row 15, D-219), and what stands in the chest and the character after;
- what `catch-up-state/1` needs in order to be true, and where the live game can differ: how the
  live loop of several characters orders the same minute against the chest compared with the
  catch-up taking them one at a time (To do 12), in the invariant's wording;
- the catch-up as a step of its own after a load (To do 11, 13, D-212, row 25): its pure function,
  its argument of real time, the whole minutes and the rest under a minute, the clock turned back,
  and the four places of loading in the view; a run that stands paused or on its end screen stays;
- the save time (To do 10, row 13): when it is written, where it stands in the game state, and how
  the loop's clock and the save time relate after a load, without `saved-game.ts` taking real time
  (the guidelines forbid it); what passes in the tab between saves;
- the report (To do 16, rows 10, 11, 22–24, 26): its state, how each character's change in the
  chest, practice and minutes add up across returns, the titles and lines, the map of a loop that
  stopped while the game was open, and where it reaches the headquarters view; the stopped line
  (To do 8, row 7, Q18); the row's line of a loop (To do 9, row 3); the mark on the list of maps
  (To do 18, row 21); disabled „Wyślij” and „Puść w pętlę”; a character's other row controls;
- D-207's list of the player's changes and the rhythm of saving after this change (To do 17, row
  18), D-208's line (row 19), and the size limit;
- the shape change and the load check in `saved-game.ts` with the raised `SAVED_GAME_VERSION`
  (To do 10), under `guidelines/coding-saved-game.md`, cross-field conditions included;
- the balance data entry for the loop's pace (To do 2), its validation under
  `guidelines/coding-content-data.md`;
- what the foundation needs: which rows become which entries, which existing decisions, invariants
  and glossary terms change (*Decisions in play*, To do 19, among them the D-194 cost to remove,
  and `trip-run-end` with its test), and any entry the design needs beyond those the task carries,
  written out in the spec for the foundation step. Decisions the cycle writes get their next free
  numbers; *Scope* words come from the part map. The wording rule P4 applies to rows of
  *Settlements to record*; projected entries keep their wording;
- where the invariants of rows 14, 15, 17 and `catch-up-state/1` are tested (`guidelines/testing.md`);
- the natural cuts of the change, for the judgement of its route after the spec's review.

Do not reopen an answer of *Questions to settle*: each is the human's. Where a word of an answer
turns out not to fit the code, return `questions`.

## What to read

Read the frozen task whole, then:

- Foundation (`foundations/decisions.md`, each decision whole, from its heading to the next): D-04,
  D-07, D-11, D-18, D-21, D-22, D-39, D-50, D-53, D-54, D-55, D-56, D-61, D-62, D-71, D-93, D-96,
  D-104, D-118, D-119, D-122, D-123, D-132, D-164, D-168, D-170, D-173, D-179, D-183, D-187, D-188,
  D-189, D-190, D-191, D-193, D-194, D-199, D-200, D-201, D-204, D-206, D-207, D-208, D-209, D-211,
  D-212, D-213, D-214, D-215, D-216, D-217, D-218, D-219, D-220, D-221.
- `foundations/invariants.md`, each whole: `map-run-repeatability`, `simulation-randomness`,
  `minute-span-split`, `player-map-run-pace`, `simulation-isolation`, `simulation-inputs`,
  `restart-seed`, `save-version`, `trip-transfer`, `trip-run-end`, `trip-plan-progress`,
  `saved-program-edit`, `character-team`, `solved-map-manual-run`, `resurrection-renewal`,
  `death-settled-once`, `streak-program-change`, and those their tests or your design reach.
- `foundations/glossary.md`: `manual map run`, `completion`, `solved map`, `map run restart`,
  `practice`, and any term of the resurrection. `foundations/part_map.md`: the entries `simulation`,
  `browser-view`.
- Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-simulation-module.md`,
  `guidelines/coding-saved-game.md`, `guidelines/coding-content-data.md`,
  `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`,
  `guidelines/testing.md`.
- Code: `src/browser/sim/game.ts`, `run.ts`, `trip.ts`, `skills.ts`, `types.ts`, `random.ts`,
  `saved-game.ts`, `data/balance.ts`; `src/browser/view/clock.ts`, `app.ts`, `game-saver.ts`,
  `game-view.ts`, `headquarters.ts`, `trip-lines.ts`, `character-skills.ts`, and the tests in
  `tests/sim/` and `tests/view/` these reach.
- Loop's tests the task cites, for what they settle under answer P6 (`src/sim/loop.test.ts`,
  `src/sim/sim.test.ts`, `src/sim/chest.test.ts`, `src/sim/report.test.ts`, `src/sim/policy.test.ts`,
  `src/sim/death.test.ts`), at the lines it names.

The definition `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp_loop2.md`
(sha256 `fda97782458d…`) holds the projected entries; the frozen task quotes the parts it needs.
