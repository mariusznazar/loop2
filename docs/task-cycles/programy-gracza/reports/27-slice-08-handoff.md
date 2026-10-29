# Slice 8 handoff — programy-gracza

Work from the worktree root `C:/Storage/repos/loop2-wt/programy-gracza`, branch `task/programy-gracza`. Slice base, written in the record before this dispatch: `5e5a844` (Slice 7's head). Pinned process `3aee7d958835cc19b95519f4d21b37538b78e3e1`.

Delegation: the user invoked `the-way-implement-task` and delegated intermediate choices to the orchestrator. Your method: read `.the-way/task-cycle/change/SKILL.md` whole (entry point `.claude/skills/the-way-make-change/SKILL.md`); your variant, in the words of its row: **"a slice, or the retry of a slice"**. Read a file the method names only when the step or variant naming it comes (its UI check file when you check the screen). This change touches a user interface: read the styleguide's example of the order of work (`guidelines/styleguide-browser-view.md`, "Plan of a user-interface change") as an example. Stage: this slice only — make its *Change*, run its *Checks*, commit by path (`git add <path>`, English messages like the repository's: `feat: :sparkles: …`, `test: :test_tube: …`), and return. Do not run the gate (`npm test` with no arguments). Questions go to the orchestrator in your report, never to the human. Do not read `cycle.md`. Change no foundation file.

Two questions at start: trust boundary — no; irreversible operation — no.

Quality tools: before `tests/quality/...` checks, put the pinned tools first on PATH: `export PATH="$PWD/.runs/quality-venv/Scripts:$PATH"` (Git Bash).

Browser check: as Slices 6 and 7 did — `LOOP2_LISTEN_PORT=<free port> npm run dev` in the worktree; Playwright intercepts only `**/api/account` with a 200 JSON made-up account (no real account, no server write); console checked; server stopped by its PID afterwards; route in `reports/23-slice-06-report.md` lines 92–101. Drive the screen by real clicks and keys. Keep screenshots in `.runs/task-cycles/programy-gracza/reports/` named `28-slice-08-<nn>-<state>.png`, and leave the main checkout `C:/Storage/repos/loop2` clean. The plan's state „two maps open” needs Las solved (a 480-minute streak); if you cannot reach it in reasonable time, name it unchecked and cover „one list per row whatever the number of maps” by the pure function's test.

Report at `.runs/task-cycles/programy-gracza/reports/27-slice-08-report.md`: each check with its command and exit code, the first failing case and its passing run, the UI states inspected with their screenshots and each state left unchecked, every reach beyond your *Read*. Return status, commits, a one-line check result naming what failed or did not run, and the report path.

## What earlier slices built

The simulation (Slices 1, 4, 5): `send(state, { …, programId? })` in `src/browser/sim/game.ts` (absent → the row's program); `rowProgram`, `teamProgram` and the row's pick operation in `src/browser/sim/programs.ts` (read it whole for exact names; Slice 4's report `reports/20-slice-04-report.md`). The program panel (Slices 6 and 7) lives in `src/browser/view/program-panel.ts`; the game view wires it in `src/browser/view/game-view.ts`.

## The slice's section of the plan, copied word for word from `.runs/task-cycles/programy-gracza/plan.md` (heading „Slice 8 — the program of each headquarters row”)

### Slice 8 — the program of each headquarters row

- **Goal:** Each character's row of the headquarters gets, beside „Mapa: …” and „Wyślij”, one
  shared select list named „Program:” — one per row whatever the number of maps — its positions
  the names of the player's programs in list order, showing the row's program of spec decision 4
  as the simulation gives it. A pick calls the simulation's pick of Slice 4. „Wyślij” sends with
  the program the row shows: the headquarters passes its number, and the clock's send carries it
  to the simulation's `send`. The rows are rebuilt when the programs or their names change, as
  they are today when the team or the solved maps change (To do 5; F5, spec decision 8). The row's
  list is tested through a pure function of its positions and its shown program, as the
  headquarters' other pure parts are tested.
- **Change:** `src/browser/view/headquarters.ts` · `src/browser/view/game-view.ts` · `src/browser/view/clock.ts` ·
  `src/browser/styles.css` · `tests/view/headquarters.test.mjs` · `tests/view/clock.test.mjs`
- **Read:** `.runs/task-cycles/programy-gracza/task.md:20-20` To do, item 5 ·
  `.runs/task-cycles/programy-gracza/task.md:170-170` Settlements to record, row 5 ·
  `.runs/task-cycles/programy-gracza/spec.md:112-122` 4. The game's records of which program a character goes with ·
  `.runs/task-cycles/programy-gracza/spec.md:185-196` 8. The headquarters row, Units and their interfaces ·
  `.runs/task-cycles/programy-gracza/plan.md:576-588` Choices ·
  Foundation entries F5 · F13 · F17 ·
  `foundations/decisions.md:748-761` D-36 · `foundations/decisions.md:868-881` D-44 ·
  `foundations/decisions.md:1022-1081` D-53 · D-54 · D-55 · `foundations/decisions.md:1376-1387` D-75 ·
  `foundations/decisions.md:1547-1558` D-88 · `foundations/decisions.md:2665-2678` D-149 ·
  `foundations/part_map.md:3-26` browser-view · `foundations/glossary.md:87-92` headquarters ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/game.ts` · `src/browser/view/controls/select-list.ts` ·
  `src/browser/tokens.css`
- **Model:** cheaper
- **Risk:** none
- **Checks:** first a failing case in `tests/view/headquarters.test.mjs`: the row of a character that
  has not gone shows the first program of the list. Then `npm run typecheck` ·
  `npm test -- tests/view/headquarters.test.mjs` · `npm test -- tests/view/clock.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`. By hand in a real browser (D-75, D-88):
  `npm run dev` in the worktree, the account requests answered by an intercepted session as in the
  earlier cycle; inspect by screenshot two characters' rows with one list each and two maps open;
  a character that has not gone showing the program entered with last; a pick kept after creating
  another character and used by „Wyślij”; a switched character's row showing the program it was
  switched to; a deleted default falling back; the focus outline on the list. Name in the report
  each state left unchecked.
- **Depends on:** Slice 4 · Slice 7 · F5 · F17


## Current ranges of the *Read* (worktree at `5e5a844`; where they differ from the plan's, these hold)

- Frozen task and spec: the plan's ranges hold.
- Plan's *Choices*: `.runs/task-cycles/programy-gracza/plan.md:581-593`.
- Foundation entries, for the plan's F-names: F5 → D-158 `foundations/decisions.md:2831-2845`; F13 → glossary `copy` `foundations/glossary.md:175-179`; F17 → D-153 `:2756-2770`.
- Other decisions: D-36 `:748-762`; D-44 `:868-882`; D-53 · D-54 · D-55 `:1022-1082`; D-75 `:1376-1388`; D-88 `:1547-1559`; D-149 `:2696-2710`.
- Part map browser-view `foundations/part_map.md:3-27`; glossary headquarters `:87-93`.
- Code: `src/browser/sim/programs.ts` (beyond the plan's *Read*), `types.ts`, `game.ts`; the view files of your *Change*; `src/browser/view/controls/select-list.ts`; `src/browser/tokens.css`. Guidelines whole as the plan names.
