# Slice 7 handoff — programy-gracza

Work from the worktree root `C:/Storage/repos/loop2-wt/programy-gracza`, branch `task/programy-gracza`. Slice base, written in the record before this dispatch: `004c085` (Slice 6's head). Pinned process `3aee7d958835cc19b95519f4d21b37538b78e3e1`.

Delegation: the user invoked `the-way-implement-task` and delegated intermediate choices to the orchestrator. Your method: read `.the-way/task-cycle/change/SKILL.md` whole (entry point `.claude/skills/the-way-make-change/SKILL.md`); your variant, in the words of its row: **"a slice, or the retry of a slice"**. Read a file the method names only when the step or variant naming it comes (its UI check file when you check the screen). This change touches a user interface: read the styleguide's example of the order of work (`guidelines/styleguide-browser-view.md`, "Plan of a user-interface change") as an example. Stage: this slice only — make its *Change*, run its *Checks*, commit by path (`git add <path>`, English messages like the repository's: `feat: :sparkles: …`, `fix: :bug: …`, `test: :test_tube: …`, `docs: :memo: …`), and return; do not start Slice 8. Do not run the gate (`npm test` with no arguments). Questions go to the orchestrator in your report, never to the human. Do not read `cycle.md`. Change no foundation file; the styleguide is in your *Change*.

Two questions at start: trust boundary — no; irreversible operation — no.

Quality tools: before `tests/quality/...` checks, put the pinned tools first on PATH: `export PATH="$PWD/.runs/quality-venv/Scripts:$PATH"` (Git Bash).

Browser check: as Slice 6 did — `LOOP2_LISTEN_PORT=<free port> npm run dev` in the worktree; Playwright intercepts only `**/api/account` with a 200 JSON made-up account (no real account, no server write); console checked; server stopped by its PID afterwards; the route is in `reports/23-slice-06-report.md` lines 92–101. Drive the screen by real mouse clicks and keyboard (`click`, `press`), not by `selectOption` alone where focus matters. Keep screenshots in `.runs/task-cycles/programy-gracza/reports/` named `26-slice-07-<nn>-<state>.png`, and leave the main checkout `C:/Storage/repos/loop2` clean.

**An orchestrator's ruling (autonomous choice C15), from Slice 6's report `reports/23-slice-06-report.md` lines 131–150:** text typed into an editor field and not yet committed lands in the newly shown program when the panel switches what it shows while focus stays in that field (a removed focused input fires `change`). Your slice adds controls that change what the panel shows — the switch button shows the copy again. Apply the fix the report proposes: in the panel's `show()` (`src/browser/view/program-panel.ts`), before switching, blur the active element when the editor's element contains it, so the pending text commits to the program it was typed into; add `contains` to the test's document model and a case in `tests/view/program-panel.test.mjs` that fails without the fix (typed, uncommitted text in the copy's editor, the shown program changed without moving focus: the text lands in the copy, not the newly shown program).

Report at `.runs/task-cycles/programy-gracza/reports/25-slice-07-report.md`: each check with its command and exit code, the first failing case and its passing run, the fix's failing case and its passing run, the UI states inspected with their screenshots and each state left unchecked, every reach beyond your *Read*. Return status, commits, a one-line check result naming what failed or did not run, and the report path.

## What earlier slices built

The simulation's operations live in `src/browser/sim/programs.ts` (Slices 4 and 5): `copyHasUnsavedChanges`, `programHasChangesCopyLacks`, `saveCopyIntoProgram`, `saveCopyAsNewProgram`, `discardCopyChanges`, `switchProgram`, the name rule and `suggestedProgramName`-style helper — read `programs.ts` whole for the exact names (Slice 5's report `reports/22-slice-05-report.md` lines 14–18). Slice 6 (`18a2def`, `004c085`) built `src/browser/view/program-panel.ts` with the list, „Nowy program”, „Zmień nazwę”, „Usuń”, the name field and which program is shown; read its report `reports/23-slice-06-report.md` lines 25–39 and 154–161 for its API and choices (`update(state, events)`, the name field built for reuse by „Zapisz jako nowy program”).

## The slice's section of the plan, copied word for word from `.runs/task-cycles/programy-gracza/plan.md` (heading „Slice 7 — the controls of the copy in the program panel”)

### Slice 7 — the controls of the copy in the program panel

- **Goal:** While the program panel of Slice 6 shows the copy, during a map run and on its screens
  after a death and after a completion until „Restart” or „Zakończ”, it shows (spec decision 7,
  “When the copy is shown” and “The switch button”):
  - the heading „Kopia: {name}”, the name of the copy's program, or once it is gone the name it had
    (To do 8; F6);
  - under it, in `warning`, „Niezapisane zmiany w kopii.” while the copy has unsaved changes, by the
    measure of Slice 5;
  - „Zapisz w programie”, „Zapisz jako nowy program” and the destructive „Porzuć zmiany”, active
    while the copy has unsaved changes and inactive otherwise; „Zapisz w programie” and „Porzuć
    zmiany” are absent once the copy's program is gone (To do 3, 8; F3, F7);
  - beside the save buttons, in `warning`, „Program {name} ma zmiany, których nie ma w tej kopii —
    zapis w programie je zastąpi.” while the copy's program has changes the copy lacks, whether or
    not the copy has unsaved changes; „Zapisz w programie” saves at once, and the line goes (To do
    9; F8);
  - „Zapisz jako nowy program” shows the name field of Slice 6 already holding the first free name
    as its value, which the player may keep or change, and „Zapisz”; after the save the panel still
    shows the copy, now belonging to the new program (To do 8; F6);
  - during a map run not ended in death or a completion, while a saved program other than the
    program the copy belongs to is shown, the destructive button „Przełącz postać na ten program”
    under the list; a click switches and shows the copy again. It is absent beside the program the
    copy belongs to, so after „Zapisz jako nowy program” it stands beside the program the copy was
    taken from and not beside the new one, and absent on the screens after a death and after a
    completion (To do 12; F14, F16).
  The game view turns each button into its simulation call of Slice 5, after `clock.flush()`. The
  styleguide's list of destructive buttons (`guidelines/styleguide-browser-view.md:193-197`, in
  “States of shared controls”) gains „Porzuć zmiany” and „Przełącz postać na ten program”, as F22
  words D-44. The panel's states are tested on the hand-made document model.
- **Change:** `src/browser/view/program-panel.ts` · `src/browser/view/game-view.ts` · `src/browser/styles.css` ·
  `guidelines/styleguide-browser-view.md` · `tests/view/program-panel.test.mjs`
- **Read:** `.runs/task-cycles/programy-gracza/task.md:18-27` To do, items 3 and 6–12 ·
  `.runs/task-cycles/programy-gracza/task.md:160-181` Settlements to record ·
  `.runs/task-cycles/programy-gracza/spec.md:157-183` 7. The program panel ·
  Foundation entries F3 · F6 · F7 · F8 · F10 · F13 · F14 · F16 · F22 ·
  `foundations/decisions.md:748-761` D-36 · `foundations/decisions.md:778-851` D-38 · D-39 · D-40 · D-41 · D-42 ·
  `foundations/decisions.md:868-881` D-44 · `foundations/decisions.md:913-926` D-47 · `foundations/decisions.md:1185-1198` D-62 ·
  `foundations/decisions.md:1376-1387` D-75 · `foundations/decisions.md:1547-1558` D-88 ·
  `foundations/decisions.md:2365-2388` D-132 ·
  `foundations/invariants.md:468-476` browser-view-focus-outline ·
  `foundations/part_map.md:3-26` browser-view ·
  `foundations/glossary.md:18-30` map run · program · `foundations/glossary.md:137-141` completion ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/game.ts` · `src/browser/view/controls/button.ts` ·
  `src/browser/view/controls/text-field.ts` · `src/browser/tokens.css`
- **Model:** cheaper
- **Risk:** none
- **Checks:** first a failing case in `tests/view/program-panel.test.mjs`: after an edit of the copy
  the line „Niezapisane zmiany w kopii.” stands and the three buttons are active. Then
  `npm run typecheck` · `npm test -- tests/view/program-panel.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py` ·
  `npm test -- tests/invariants/test_browser_view_focus_outline.py` ·
  `npm test -- tests/quality/test_quality_invariants.py` ·
  `python -B .the-way/elements/common/foundation_check.py`. By hand in a real browser (D-75, D-88):
  `npm run dev` in the worktree, the account requests answered by an intercepted session as in the
  earlier cycle; inspect by screenshot the copy with no unsaved changes (no line, buttons inactive)
  and with them (line, buttons active); the line of a changed program with and without unsaved
  changes, and gone after „Zapisz w programie”; „Zapisz jako nowy program” with „Program 2” in the
  field, the heading after it, and the switch button beside the first program and not beside the
  new one; „Porzuć zmiany”; a copy whose program was deleted; a switch, with the streak at zero in
  the status row and the counts at „0×”; the screens after a death and after a completion of Las,
  the buttons working and no switch button; „Zakończ” with unsaved changes; the first-chill rule
  leaving no line. The text of the two destructive buttons is checked in `danger`. Name in the
  report each state left unchecked, such as a completion of Las — głębiej.
- **Depends on:** Slice 5 · Slice 6 · F3 · F6 · F7 · F8 · F14 · F16 · F22


## Current ranges of the *Read* (worktree at `004c085`; where they differ from the plan's, these hold)

- Frozen task and spec: the plan's ranges hold.
- Foundation entries, for the plan's F-names: F3 → D-156 `foundations/decisions.md:2801-2815`; F6 → D-159 `:2846-2860`; F7, F16, F22 → D-44 `:868-882`; F8 → D-160 `:2861-2875`; F10 → D-161 `:2876-2890` and D-93 `:1632-1679`; F13 → glossary `copy` `foundations/glossary.md:175-179`; F14 → D-162 `:2891-2904`.
- Other decisions: D-36 `:748-762`; D-38 · D-39 · D-40 · D-41 · D-42 `:778-852`; D-44 `:868-882`; D-47 `:913-927`; D-62 `:1185-1199`; D-75 `:1376-1388`; D-88 `:1547-1559`; D-132 `:2394-2418`.
- Invariants: browser-view-focus-outline `foundations/invariants.md:468-477`.
- Part map browser-view `foundations/part_map.md:3-27`; glossary `:18-30`, `:137-142` completion.
- The styleguide's list of destructive buttons: `guidelines/styleguide-browser-view.md:193-197` as the plan gives (unchanged).
- Code: `src/browser/sim/programs.ts` (beyond the plan's *Read*), `types.ts`, `game.ts`; `src/browser/view/program-panel.ts`, `game-view.ts`, `program-editor.ts`; `tests/view/program-panel.test.mjs`; the controls the plan names. Guidelines whole as the plan names.
