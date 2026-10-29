# Slice 6 handoff — programy-gracza

Work from the worktree root `C:/Storage/repos/loop2-wt/programy-gracza`, branch `task/programy-gracza`. Slice base, written in the record before this dispatch: `4321b2c` (Slice 5's head). Pinned process `3aee7d958835cc19b95519f4d21b37538b78e3e1`.

Delegation: the user invoked `the-way-implement-task` and delegated intermediate choices to the orchestrator. Your method: read `.the-way/task-cycle/change/SKILL.md` whole (entry point `.claude/skills/the-way-make-change/SKILL.md`); your variant, in the words of its row: **"a slice, or the retry of a slice"**. Read a file the method names only when the step or variant naming it comes (its UI check file when you check the screen). This change touches a user interface: read the styleguide's example of the order of work (`guidelines/styleguide-browser-view.md`, "Plan of a user-interface change") as an example. Stage: this slice only — make its *Change*, run its *Checks*, commit by path (`git add <path>`, English messages like the repository's: `feat: :sparkles: …`, `test: :test_tube: …`), and return; do not start Slice 7. Do not run the gate (`npm test` with no arguments). Questions go to the orchestrator in your report, never to the human. Do not read `cycle.md`. Change no foundation file.

Two questions at start: trust boundary — no; irreversible operation — no.

Quality tools: before `tests/quality/...` checks, put the pinned tools first on PATH: `export PATH="$PWD/.runs/quality-venv/Scripts:$PATH"` (Git Bash).

Browser check: Slice 1 ran `LOOP2_LISTEN_PORT=<free port> npm run dev` in the worktree and, with Playwright, intercepted only `**/api/account` with a 200 JSON made-up account (no real account, no server write), console checked, server stopped by its PID afterwards; its report `reports/13-slice-01-report.md` lines 71–85 describe the route. Keep screenshots in `.runs/task-cycles/programy-gracza/reports/` named `24-slice-06-<nn>-<state>.png`, and leave the main checkout `C:/Storage/repos/loop2` clean.

Report at `.runs/task-cycles/programy-gracza/reports/23-slice-06-report.md`: each check with its command and exit code, the first failing case and its passing run, the UI states inspected with their screenshots and each state left unchecked, every reach beyond your *Read*. Return status, commits, a one-line check result naming what failed or did not run, and the report path.

## What earlier slices built

Slice 1 (its report `reports/13-slice-01-report.md`, lines 30–33, quoted):

- `types.ts`: `ProgramId`, `SavedProgram`, `ProgramCopy` (`program`, `programId | null`, `deletedName | null`, `base`), `GameMapRun = MapRun & { copy }`. `GameState` loses `program` and gains `programs`, `nextProgramId`, `pickedPrograms`, `lastUsedPrograms` (both `Partial<Record<CharacterId, ProgramId>>`), `lastEnteredProgram`, `countsProgram`; `run` is `GameMapRun | null`. `run.ts`'s `MapRun`, `newMapRun` and the minute functions are unchanged.
- `programs.ts` (new, row of status `copy` in the guideline's table): `FIRST_PROGRAM_NAME`, `emptyProgram`, `programById`, `teamProgram` (entered with last while on the list, else the first), `rowProgram` (pick → used last → `teamProgram`, each only while on the list), `withProgramContent`.
- `game.ts`: `newGame` holds program 1 „Program” with the empty group, next number 2. `send` takes an optional `programId`; absent → `rowProgram`; a number not on the list throws; copy and base = the program's content; sets used last and entered with last, clears the character's pick; counts start at zero. `setProgram` in a map run edits the copy (checked against the run's map, counts reconciled against the copy, streak and beaten attacks zeroed where the copy differs and the run has not ended); outside a map run it edits `teamProgram`, reconciling counts only where `countsProgram` is that program. `restart` passes the copy record as it is. `end` reconciles counts against the copy's program and sets `countsProgram`, or clears both where the copy's program is gone. The first chill writes `withFirstChillRule` into the copy, its base and the copy's program while on the list. `reconcileCounts(counts, previous, next)` and `programOf(state, program, characterId)` take explicit inputs.
- View: `ProgramEditor.update(state, program, counts)`. `game-view.ts` shows the copy with its counts during a map run, otherwise `teamProgram` with counts only where `countsProgram` is its number.

Slice 4 (`c908faf`, `bf7e827`) and Slice 5 (`99763ab`, `f58675c`, `4321b2c`) put the operations in `src/browser/sim/programs.ts`, not in `game.ts`: the name rule, the suggested name, create, rename, delete, `editProgram` (a saved program by number), the row's pick (Slice 4, report `reports/20-slice-04-report.md`); the measures `copyHasUnsavedChanges`, `programHasChangesCopyLacks` and `saveCopyIntoProgram`, `saveCopyAsNewProgram`, `discardCopyChanges`, `switchProgram` (Slice 5, report `reports/22-slice-05-report.md` lines 14–18). `checkProgram`, `reconcileCounts`, `sameData` now live in `programs.ts` too. Read `programs.ts` whole for the exact names and signatures; your panel calls these through the game view, each after `clock.flush()`.

## The slice's section of the plan, copied word for word from `.runs/task-cycles/programy-gracza/plan.md` (heading „Slice 6 — the program panel: the list, its actions and the program it shows”)

### Slice 6 — the program panel: the list, its actions and the program it shows

- **Goal:** A new browser module, `src/browser/view/program-panel.ts`, owns the left panel and
  holds as view state which program it shows (spec decision 7, without the controls of the copy,
  which Slice 7 adds):
  - at the top the shared select list named „Program:”, its positions the names of the player's
    programs in list order, the shown program's name being what it shows; during a map run
    „Kopia w przejściu” stands first. Picking a position shows that program and changes no game
    state (To do 2; F1);
  - „Nowy program”, „Zmień nazwę” and the destructive „Usuń”, from the shared controls. „Usuń” is
    disabled while the list holds one program. While the copy is shown, „Zmień nazwę” and „Usuń”
    are hidden and „Nowy program” stays. „Nowy program” shows the new program; „Usuń” of the shown
    program shows the first program of the list; „Zmień nazwę” shows the name field filled with the
    current name, and „Zapisz” (To do 3; F2);
  - the name field: the shared text field named „Nazwa programu”, with its message under it in
    `warning` — „Wpisz nazwę programu.” for a name empty once trimmed, „Program o tej nazwie już
    istnieje.” for a name another program has — the reason taken from the simulation's name rule
    of Slice 4. It is built so that Slice 7 can use it for „Zapisz jako nowy program”. It leaves the
    panel without saving when the player shows another program or picks the same action again, and
    no cancel button is added (To do 4; F4);
  - the program editor under the list edits the shown program: the copy through `setProgram`, a
    saved program through the edit of a saved program of Slice 4. Counts show only where spec
    decision 6 puts them: during a map run, its screens after death and after a completion
    included, beside the copy's rules only; outside a map run, beside the program the counts stand
    beside only (F23);
  - which program the panel shows: at a new game program 1; at a send and at „Restart” the copy; at
    „Zakończ” the copy's program, or the first program of the list where it is gone (To do 10; F10).
  The panel builds its controls once and updates them in place, so a field being typed into keeps
  its focus while time passes (D-36); the editor's own heading gives way to the panel's list where
  the two would repeat. The game view creates the panel with callbacks it turns into simulation
  calls, each after `clock.flush()`, as the editor's commit is today, and replaces Slice 1's
  interim choice of what the editor shows. Styles read only the design tokens; a value the token
  file lacks is named in the report, never chosen (`src/browser/AGENTS.md`). The panel's states are
  tested on the hand-made document model, as `tests/view/program-editor.test.mjs` models one.
  `src/browser/view/program-panel.ts` joins the table “Files of this kind” of
  `guidelines/coding-browser-module.md` as a row of status `copy`.
- **Change:** `src/browser/view/program-panel.ts` · `src/browser/view/game-view.ts` ·
  `src/browser/view/program-editor.ts` · `src/browser/styles.css` · `tests/view/program-panel.test.mjs` ·
  `guidelines/coding-browser-module.md`
- **Read:** `.runs/task-cycles/programy-gracza/task.md:16-27` To do ·
  `.runs/task-cycles/programy-gracza/task.md:160-181` Settlements to record ·
  `.runs/task-cycles/programy-gracza/spec.md:72-82` 2. The player's program list ·
  `.runs/task-cycles/programy-gracza/spec.md:148-183` 6. Firing counts follow the copy, 7. The program panel ·
  `.runs/task-cycles/programy-gracza/spec.md:189-196` Units and their interfaces ·
  `.runs/task-cycles/programy-gracza/spec.md:235-242` Left to the maker ·
  Foundation entries F1 · F2 · F4 · F9 · F10 · F13 · F17 · F23 ·
  `foundations/decisions.md:57-92` D-04 · `foundations/decisions.md:748-761` D-36 ·
  `foundations/decisions.md:778-851` D-38 · D-39 · D-40 · D-41 · D-42 ·
  `foundations/decisions.md:868-881` D-44 · `foundations/decisions.md:913-926` D-47 ·
  `foundations/decisions.md:1376-1387` D-75 · `foundations/decisions.md:1547-1558` D-88 ·
  `foundations/decisions.md:1632-1666` D-93 · `foundations/decisions.md:2032-2056` D-119 ·
  `foundations/invariants.md:35-43` browser-view-framework · `foundations/invariants.md:468-476` browser-view-focus-outline ·
  `foundations/part_map.md:3-26` browser-view ·
  `foundations/glossary.md:18-30` map run · program · `foundations/glossary.md:131-135` manual map run ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/game.ts` · `src/browser/view/status-row.ts` ·
  `src/browser/view/clock.ts` · `src/browser/view/controls/button.ts` ·
  `src/browser/view/controls/select-list.ts` · `src/browser/view/controls/text-field.ts` ·
  `src/browser/tokens.css` · `tests/view/program-editor.test.mjs`
- **Model:** same — it replaces how the game view feeds the editor and wires the operations of
  Slices 1 and 4 into the panel, the screen every later view slice extends.
- **Risk:** none
- **Checks:** first a failing case in `tests/view/program-panel.test.mjs`: a new game's panel lists
  „Program” and „Usuń” is disabled. Then `npm run typecheck` ·
  `npm test -- tests/view/program-panel.test.mjs` · `npm test -- tests/view/program-editor.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/invariants/test_browser_view_framework.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`. By hand in a real browser (D-75, D-88):
  `npm run dev` in the worktree, the account requests answered by an intercepted session as in the
  earlier cycle; inspect by screenshot a new game's panel; „Nowy program” showing „Program 2”; „Zmień
  nazwę” with the filled field and each of its two messages, „program” in another letter case
  included; „Usuń” disabled with one program and the first program shown after a deletion; during
  a map run „Kopia w przejściu” first, „Zmień nazwę” and „Usuń” hidden with the copy shown, a saved
  program shown without counts; after „Zakończ” the copy's program with its counts; and by keyboard
  the focus outline on each new control and the focus kept in the name field and in an editor
  field while time passes. Name in the report each state left unchecked.
- **Depends on:** Slice 2 · Slice 4 · F1 · F2 · F4 · F10 · F23


## Current ranges of the *Read* (worktree at `4321b2c`; where they differ from the plan's, these hold)

- Frozen task and spec: the plan's ranges hold.
- Foundation entries, for the plan's F-names: F1 → D-154 `foundations/decisions.md:2771-2785`; F2 → D-155 `:2786-2800`; F4 → D-157 `:2816-2830`; F9 → invariant `saved-program-edit` `foundations/invariants.md:838-847`; F10 → D-161 `:2876-2890` and D-93 `:1632-1679`; F13 → glossary `copy` `foundations/glossary.md:175-179`; F17 → D-153 `:2756-2770`; F23 → D-93 `:1632-1679`.
- Other decisions: D-04 `:57-93`; D-36 `:748-762`; D-38 · D-39 · D-40 · D-41 · D-42 `:778-852`; D-44 `:868-882`; D-47 `:913-927`; D-75 `:1376-1388`; D-88 `:1547-1559`; D-93 `:1632-1679`; D-119 `:2044-2069`.
- Invariants: browser-view-framework `foundations/invariants.md:35-44`; browser-view-focus-outline `:468-477`.
- Part map browser-view `foundations/part_map.md:3-27`; glossary `:18-30`, `:131-136`.
- Code: `src/browser/sim/programs.ts` (beyond the plan's *Read*: the operations live there), `types.ts`, `game.ts` whole as Slice 5 left them; the view files the plan names. Guidelines whole as the plan names.
