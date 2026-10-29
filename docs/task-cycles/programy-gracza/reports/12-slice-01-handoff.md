# Slice 1 handoff — programy-gracza

Work from the worktree root `C:/Storage/repos/loop2-wt/programy-gracza`, branch `task/programy-gracza`. Slice base, written in the record before this dispatch: `7ed5cc0` (the foundation step's head; the task's base is `4bfb9623e9310220e335377df7fbb4c9ad413406`). Pinned process `3aee7d958835cc19b95519f4d21b37538b78e3e1`, gitlink and checkout equal.

Delegation: the user invoked `the-way-implement-task` and delegated intermediate choices to the orchestrator. Your method: read `.the-way/task-cycle/change/SKILL.md` whole (entry point `.claude/skills/the-way-make-change/SKILL.md`); your variant, in the words of its row: **"a slice, or the retry of a slice"**. Read a file the method names only when the step or variant naming it comes (the UI check file when you check the screen). Stage: this slice only — make the slice's *Change*, run its *Checks*, commit by path (`git add <path>`, English messages like the repository's, e.g. `feat: :sparkles: …`, `test: :test_tube: …`), and return; do not start Slice 2. Do not run the gate (`npm test` with no arguments) — the focused `npm test -- <file>` checks of your slice are yours. Questions go to the orchestrator in your report, never to the human. Do not read `cycle.md`. Do not change foundation files: the foundation step wrote them in `7ed5cc0`.

Two questions at start: trust boundary — no; irreversible operation — no.

Quality tools: before `tests/quality/...` checks, put the worktree's pinned tools first on PATH: `export PATH="$PWD/.runs/quality-venv/Scripts:$PATH"` (Git Bash) — the venv is installed from `requirements-quality.txt`. Dependencies are installed (`npm ci` done).

Report at `.runs/task-cycles/programy-gracza/reports/13-slice-01-report.md`, as your method gives: each check with its command and exit code, the failing first case and its passing run, the UI states inspected with their evidence and each state left unchecked, every reach beyond your *Read*. Return status, commits, a one-line check result naming what failed or did not run, and the report path.

Known baseline: on the task's base `npm test` already fails one setup in `tests/invariants/test_loop2_one_serving_process.py` (`Get-NetTCPConnection` finds no listener on this machine); not your slice's concern. The plan expects other test files that read the game state's one program to stay red after this slice until Slices 2 and 3 migrate them; they are not your checks, but list in your report which ones you saw red, if any you ran.

## The slice's section of the plan, copied word for word from `.runs/task-cycles/programy-gracza/plan.md` (heading „Slice 1 — the copy of a manual map run and the player's programs in the game state”)

### Slice 1 — the copy of a manual map run and the player's programs in the game state

- **Goal:** The game state holds the player's programs in place of the one program, and a manual
  map run carries out a copy of one of them.
  - The game state holds the list of the player's programs in the order they were created, each
    with its number, its name and its content of today's shape, and the next number to give. A new
    game holds program 1, „Program”, with the empty rule group „Program” under „Zawsze”, and the
    next number 2 (To do 1; F17).
  - The game state holds the three records of spec decision 4 — per character number the program
    picked on its headquarters row, per character number the program it used last, and the
    game-wide program with which a character last entered a map — and the program the firing
    counts stand beside after „Zakończ”. Every record names a program by its number.
  - The game state's map run holds the record of its copy: the copied content the simulation
    carries out, the number of its program — or none, with the name the program had when it was
    deleted — and its base, the content of its program as the copy was taken from it or last saved
    into it (spec decision 3). The record is a field of the game state's map run, of a type that
    extends the map run of `src/browser/sim/run.ts`, so `newMapRun` and the functions of a minute
    keep their signatures (*Choices*).
  - A new simulation module, `src/browser/sim/programs.ts`, owns the list and the records: finding
    a program by number, and the program of a headquarters row in spec decision 4's order — the
    pick, the character's program used last, the game-wide program entered with last, the first
    program of the list, each only while it is on the list.
  - `send` takes a program number beside the map and the character; where it is absent, it sends
    with the row's program of that character (*Choices*). It refuses a number not on the list. The
    copy and its base are that program's content; the character's program used last and the
    game-wide program entered with last become it, and the character's pick is cleared; every
    count of the copy's rules starts at zero.
  - The simulation carries out the copy reduced to the character's repertoire, as `programOf`
    reduces the one program today.
  - `setProgram` within a map run is the edit of the copy, unchanged in effect: checked against
    the run's map, counts reconciled, and the streak and the beaten attacks of a map run not ended
    set to zero where the copy after the edit differs from the copy before it, also in a pause; the
    copy's program stays as it was (To do 7). Outside a map run `setProgram` edits, checked as a
    program outside a map run is checked today, the program decision 4 gives a character with no
    pick and no program used last: the game-wide program entered with last, or else the first of
    the list (*Choices*).
  - „Restart” builds the new map run with the copy record of the map run it replaces, as it is,
    unsaved changes included, and starts every count from zero (To do 6).
  - „Zakończ” drops the map run and its copy. The counts are reconciled against the copy's program:
    a rule of that program keeps the count of the copy's rule of the same identity where the two
    have the same condition and action, and stands at „0×” otherwise; that program becomes the one
    the counts stand beside. Where the copy's program is gone, the counts are cleared (To do 10,
    spec decision 6).
  - At the first chill the rule „Zawsze → Eksploruj” goes, each by `withFirstChillRule` on its own
    content, into the copy, into its base and into the copy's program where that program is on the
    list, and into no other program; the streak stays (To do 11).
  - The program editor's `update` takes the program to show and its counts, in place of reading
    them from the game state. Until Slice 6 the game view shows the copy with its counts during a
    map run, and otherwise the program that `setProgram` edits outside a map run, with counts where
    they stand beside it, so the game plays as before on that program.
  - The tests of the send, „Restart”, „Zakończ”, the first chill and the counts —
    `tests/sim/flow.test.mjs`, `tests/sim/discovery.test.mjs` and `tests/sim/program-counts.test.mjs`
    — change with the behaviour, each changed expectation naming its To do as
    `guidelines/testing.md`, “Changing an existing test”, asks. The other test files that read the
    one program of the game state stay red until Slices 2 and 3 migrate them; they are not this
    slice's checks.
  - `src/browser/sim/programs.ts` joins the table “Files of this kind” of
    `guidelines/coding-simulation-module.md` as a row of status `copy`.
- **Change:** `guidelines/coding-simulation-module.md` · `src/browser/sim/types.ts` · `src/browser/sim/game.ts` · `src/browser/sim/programs.ts` ·
  `src/browser/view/program-editor.ts` · `src/browser/view/game-view.ts` · `tests/sim/copy.test.mjs` ·
  `tests/sim/flow.test.mjs` · `tests/sim/discovery.test.mjs` · `tests/sim/program-counts.test.mjs`
- **Read:** `.runs/task-cycles/programy-gracza/task.md:14-27` To do ·
  `.runs/task-cycles/programy-gracza/task.md:101-105` Questions carried to cycle ·
  `.runs/task-cycles/programy-gracza/task.md:160-181` Settlements to record ·
  `.runs/task-cycles/programy-gracza/spec.md:29-48` Constraints ·
  `.runs/task-cycles/programy-gracza/spec.md:52-70` 1. A program is told apart by a number given when it is created ·
  `.runs/task-cycles/programy-gracza/spec.md:84-122` 3. The copy belongs to the map run, 4. The game's records of which program a character goes with ·
  `.runs/task-cycles/programy-gracza/spec.md:124-155` 5. Operations of the simulation, 6. Firing counts follow the copy ·
  `.runs/task-cycles/programy-gracza/spec.md:189-196` Units and their interfaces ·
  `.runs/task-cycles/programy-gracza/spec.md:235-242` Left to the maker ·
  `.runs/task-cycles/programy-gracza/plan.md:576-588` Choices ·
  Foundation entries F5 · F10 · F11 · F13 · F17 · F18 · F20 · F21 · F23 · F24 ·
  `foundations/decisions.md:57-92` D-04 · `foundations/decisions.md:401-414` D-20 ·
  `foundations/decisions.md:450-510` D-22 · D-23 · `foundations/decisions.md:733-761` D-35 · D-36 ·
  `foundations/decisions.md:1083-1108` D-56 · `foundations/decisions.md:1185-1198` D-62 ·
  `foundations/decisions.md:1573-1666` D-90 · D-91 · D-92 · D-93 ·
  `foundations/decisions.md:2032-2056` D-119 · `foundations/decisions.md:2148-2169` D-123 ·
  `foundations/decisions.md:2213-2261` D-126 · D-127 · `foundations/decisions.md:2338-2388` D-131 · D-132 ·
  `foundations/decisions.md:2450-2475` D-136 · `foundations/decisions.md:2575-2588` D-143 ·
  `foundations/invariants.md:165-196` map-run-repeatability · simulation-randomness · action-in-progress ·
  `foundations/invariants.md:214-262` simulation-isolation · simulation-inputs · program-rule-pick ·
  `foundations/invariants.md:309-317` restart-seed · `foundations/invariants.md:364-373` program-closed-lists ·
  `foundations/invariants.md:528-536` minute-span-split · `foundations/invariants.md:828-836` streak-program-change ·
  `foundations/part_map.md:3-56` browser-view · simulation ·
  `foundations/glossary.md:18-30` map run · program · `foundations/glossary.md:65-71` map run restart ·
  `foundations/glossary.md:131-155` manual map run · completion · solved map · streak ·
  `foundations/glossary.md:163-167` beaten attack ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/run.ts` · `src/browser/sim/understanding.ts` · `src/browser/view/clock.ts` ·
  `tests/sim/program-fixture.mjs` · `tests/sim/understanding-fixture.mjs` ·
  `tests/invariants/test_streak_program_change.py`
- **Model:** same — it sets the shapes of the game state, the map run and the editor's input that
  every later slice builds on, across the parts `simulation` and `browser-view`.
- **Risk:** none
- **Checks:** first a failing case in `tests/sim/copy.test.mjs`: an edit during a map run leaves
  program 1 as it was while the map run carries out the edited copy. Then `npm run typecheck` ·
  `npm test -- tests/sim/copy.test.mjs` · `npm test -- tests/sim/flow.test.mjs` ·
  `npm test -- tests/sim/discovery.test.mjs` · `npm test -- tests/sim/program-counts.test.mjs` ·
  `npm test -- tests/sim/streak.test.mjs` · `npm test -- tests/sim/team.test.mjs` ·
  `npm test -- tests/invariants/test_restart_seed.py` ·
  `npm test -- tests/invariants/test_map_run_repeatability.py` ·
  `npm test -- tests/invariants/test_action_in_progress.py` ·
  `npm test -- tests/invariants/test_streak_program_change.py` ·
  `npm test -- tests/invariants/test_minute_span_split.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`. By hand in a real browser (D-75, D-88):
  `npm run dev` in the worktree, the account requests answered by an intercepted session as in the
  earlier cycle; send a character, edit the program during the map run, „Restart”, „Zakończ” and
  send again, and inspect by screenshot that the edit acts in the map run and survives „Restart”,
  and that after „Zakończ” the editor shows program 1 without the edit, with the counts and „0×”
  beside the edited rule. Name in the report each state left unchecked.
- **Depends on:** F5 · F10 · F11 · F13 · F17 · F18 · F20 · F21 · F23 · F24


## Current ranges of the *Read* (the worktree at `7ed5cc0`; where they differ from the plan's, these hold)

- Frozen task and spec: the plan's ranges hold (`task.md:14-27`, `:101-105`, `:160-181`; `spec.md:29-48`, `:52-70`, `:84-122`, `:124-155`, `:189-196`, `:235-242`).
- Plan's *Choices*: `.runs/task-cycles/programy-gracza/plan.md:581-593` (heading „Choices”).
- Foundation entries the foundation step wrote, for the plan's F-names: F5 → D-158 `foundations/decisions.md:2831-2845`; F10 → D-161 `:2876-2890` and D-93 `:1632-1679`; F11 and F24 → D-123 `:2160-2192`; F13 → glossary `copy` `foundations/glossary.md:175-179`; F17 → D-153 `:2756-2770`; F18 → D-152 `:2741-2755`; F20 → invariant `streak-program-change` `foundations/invariants.md:828-837`; F21 → D-131 `:2360-2393`; F23 → D-93 `:1632-1679`.
- Other decisions: D-04 `:57-93`; D-20 `:401-415`; D-22 · D-23 `:450-511`; D-35 · D-36 `:733-762`; D-56 `:1083-1109`; D-62 `:1185-1199`; D-90 · D-91 · D-92 · D-93 `:1573-1679`; D-119 `:2044-2069`; D-123 `:2160-2192`; D-126 · D-127 `:2235-2284`; D-131 · D-132 `:2360-2418`; D-136 `:2479-2507`; D-143 `:2606-2620`.
- Invariants: map-run-repeatability · simulation-randomness · action-in-progress `foundations/invariants.md:165-197`; simulation-isolation · simulation-inputs `:214-235`; program-rule-pick `:248-263`; restart-seed `:309-318`; program-closed-lists `:364-374`; minute-span-split `:528-537`; streak-program-change `:828-837`.
- Part map `foundations/part_map.md:3-56`; glossary ranges as the plan gives (unchanged before line 175).
- Guidelines whole and code files as the plan's *Read* names.

The foundation step's report, for what each new entry says: `.runs/task-cycles/programy-gracza/reports/11-foundation-report.md`.
