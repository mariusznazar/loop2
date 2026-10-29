# Slice 6 report — the program panel: the list, its actions and the program it shows

- **Status:** done with concerns (one observed problem, below, that the player cannot reach by mouse or keyboard; no code change made for it)
- **Branch:** `task/programy-gracza`, worktree `C:/Storage/repos/loop2-wt/programy-gracza`, slice base `4321b2c`
- **Two questions at start:** trust boundary — no; irreversible operation — no.

## Commits and files

| Commit | Message |
|---|---|
| `18a2def` | feat: :sparkles: add the program panel with the program list, its actions and the program it shows |
| `004c085` | test: :test_tube: cover the program panel's list, actions, name field and shown program |

| File | Added | Removed |
|---|---|---|
| `src/browser/view/program-panel.ts` (new) | 324 | 0 |
| `src/browser/view/game-view.ts` | 35 | 49 |
| `src/browser/view/program-editor.ts` | 3 | 4 |
| `src/browser/styles.css` | 19 | 5 |
| `guidelines/coding-browser-module.md` | 1 | 0 |
| `tests/view/program-panel.test.mjs` (new) | 474 | 0 |

No foundation file changed.

## What was made

- `program-panel.ts` owns the left panel (`section.program-panel`), made once and updated in place:
  - the visible label „Program:” (`text-label`) and the shared select list named „Program:”. Its positions are the player's programs by name in list order, with „Kopia w przejściu” (value `copy`) first while `state.run` is not null, the screens after death and after a completion included. The shown program is the selected position. The positions are rewritten only when their list changes.
  - „Nowy program”, „Zmień nazwę” and the destructive „Usuń”. „Usuń” is disabled while the list holds one program. „Zmień nazwę” and „Usuń” are hidden while the copy is shown.
  - the name field: the shared text field „Nazwa programu” (with the hint „Nazwa programu”) and „Zapisz”, in the row `.program-name`. Its message comes from `setError` (frame and message in `warning`): „Wpisz nazwę programu.” for `empty` and „Program o tej nazwie już istnieje.” for `taken`, the reason taken from `programName` of `sim/programs.ts`, given the own program number. The message is checked on every `input` event and again at „Zapisz”, which saves nothing while the name is refused. The field's purpose is a tagged type `NamePurpose` (today `{ kind: "rename"; programId }`), so Slice 7 can add the save as a new program.
  - the program editor under them. Its commit goes to `controls.editCopy` while the copy is shown and to `controls.editProgram(shownId, …)` otherwise.
- Which program the panel shows (`nextShown`, pure): a result whose events hold `mapRunStarted` (a send or „Restart”) shows the copy. The step from a run to no run („Zakończ”) shows the copy's program, or the first of the list when it is gone. A copy shown without a run, or a saved program gone from the list (a deletion), gives way to the first of the list. „Nowy program” shows the program numbered by the previous `nextProgramId`. Picking a position calls no control.
- Counts (`shownContent`, pure): the copy gets `state.ruleCounts`. A saved program gets none during a map run, and outside one gets them only where `countsProgram` is its number.
- The editor is given new content (`editor.update`) only when the position shown, the content object, the run's map or the Understanding changes. Otherwise it gets `updateCounts` alone, so time passing writes no field. This replaces the comparison `game-view.ts` used to make.
- `game-view.ts` creates the panel with five callbacks, each `clock.flush()` and then `store.apply(...)` of `setProgram` (copy, guarded by `state.run`), `editProgram`, `createProgram`, `renameProgram` and `deleteProgram`. `store.apply` passes `result.events` to `programPanel.update`. Slice 1's interim `shownProgram` / `teamProgram` choice is gone.
- `program-editor.ts`: the editor's own heading „Program” is removed, because the panel's list now names the program shown. The doc comment says so. Its rule `.program-editor h2` is removed from `styles.css`.
- `styles.css`: `.program-list`, `.program-actions`, `.program-name` (flex rows with gaps from `--space-xs` and `--space-s`; the name row aligned to its top, so „Zapisz” stays on the input's line) and `.program-list-label` (`--text-label`). The styles use only existing tokens. No token value is missing.
- `guidelines/coding-browser-module.md`: the row `src/browser/view/program-panel.ts | copy | —`.

## Checks

| Command | Exit |
|---|---|
| First failing case: `npm test -- tests/view/program-panel.test.mjs` with the stub `createProgramPanel` (empty `section`, no-op `update`) and the one case "a new game's panel lists „Program”, shows it, and „Usuń” is disabled" | 1 — `AssertionError: the panel holds the select list „Program:”` (`tests/view/program-panel.test.mjs:105`) |
| The same command after the module was written | 0 (9 tests, 9 pass) |
| `npm run typecheck` | 0 |
| `npm test -- tests/view/program-panel.test.mjs` (final, after Prettier) | 0 (9/9) |
| `npm test -- tests/view/program-editor.test.mjs` | 0 (39/39) |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` (pinned tools first on PATH), first run | 1 — `test_prettier_source_format`: `program-panel.ts` and `program-panel.test.mjs` not formatted |
| The same, after `prettier --write --no-config --no-editorconfig` on the changed files | 0 (5 tests; log `reports/23-slice-06-quality.log`) |

Not run: the gate (`npm test` with no arguments), as the handoff says. `foundation_check.py` did not run either, because the handoff gives no such check for this slice.

No invariant test was added or changed, so no invariant test was seen failing.

## Tests written (`tests/view/program-panel.test.mjs`)

The tests run on a hand-made document model (elements with `classList.toggle`, `removeAttribute`, several listeners per type, and `focus` that sets `document.activeElement`). The panel is wired as the game view wires it, to the real simulation functions. Nine cases, each naming the break it catches:

1. a new game: the list holds „Program” and shows program 1; „Usuń” is disabled; the name field is closed;
2. „Nowy program” shows „Program 2” and enables „Usuń”; „Dodaj grupę” then edits program 2 only;
3. „Zmień nazwę” fills the field with „Program 2” and focuses it. „   ” shows the empty message, „program” the taken message, and „Zapisz” saves neither. „PROGRAM 2” (its own name in other case) shows no message. „ Las nocą ” saves „Las nocą”;
4. the field leaves without saving at „Zmień nazwę” again and at another program picked;
5. „Usuń” of the shown program 1 shows „Program 2”, the first of the list; with one program left „Usuń” is disabled and a click does nothing;
6. during a map run: „Kopia w przejściu” first and shown, „Zmień nazwę” and „Usuń” hidden, the count „1×”. Picking program 1 leaves the game state the same object, shows its buttons and hides the count; its edit goes to `editProgram(1)`, leaving the copy; the copy's edit goes to `editCopy`;
7. „Restart” from a saved program shows the copy. A death (run state made by hand) keeps the copy shown with „1×”. „Zakończ” shows the copy's program with „1×”, and program 2, whose rule has the same identity and content, shows no count;
8. „Zakończ” after the copy's program was deleted shows the first program of the list, without a count beside its rule of the same identity;
9. time passing (`advanceMinutes`) keeps an uncommitted group name and its focus in the copy's editor, and the typed text, the open row and the focus of the name field.

Mutations tried by hand in the worktree, each restored byte for byte (`cmp`):

- counts outside a map run shown beside any program. This first survived, and case 7 gained the check of program 2; it then failed the case.
- `editor.updateCounts` replaced by `editor.update`: case 9 failed.

Other mutations, checked in the head:

- no copy at `mapRunStarted`: cases 6 and 7;
- no branch for the end of a run: case 7;
- no fallback for a gone program: cases 5 and 8;
- counts during a run beside a saved program: case 6;
- `Usuń` not disabled: cases 1 and 5;
- buttons not hidden for the copy: case 6;
- the own number not passed to `programName`: case 3.

## Own-work check (section 3)

- **Requirement most likely unmet:** spec decision 6 / D-93: counts only beside the program they stand beside, outside a map run. **Check:** the mutation above (counts outside a run regardless of `countsProgram`). **Result:** it first passed every case, so that requirement was unprotected. Case 7 now picks program 2, which holds a rule of the same identity and content, after „Zakończ” and expects no count. The mutation then fails it, and the real code passes.

## UI check (`ui_check.md`; D-75, D-88)

**Route:** `LOOP2_LISTEN_PORT=34526 npm run dev` in the worktree.

- The ready line was `Loop: http://127.0.0.1:34526`; log `reports/23-slice-06-dev-server.log`.
- Playwright MCP intercepted only `**/api/account`, answering 200 JSON `{id:"qa-local-programs6",email:"slice6@example.invalid"}` with the header `x-qa-slice: programy-6`. No real account, no server write, no product module replaced.
- Viewport 1600×1000.
- Console, all messages at level warning: 0 errors, 0 warnings.
- The server was stopped by its PID. PID 13144 was the listener on 34526, command line `node dist/server/main.js`; nothing else was touched. Port 34526 has no connection now.
- Screenshots were written straight into `reports/`. One file landed in the Playwright workspace root, the main checkout, and was moved here at once. `git status` of `C:/Storage/repos/loop2` is clean.

States inspected, each viewed:

| # | State | Screenshot |
|---|---|---|
| 1 | New game: „Program: Program”; „Nowy program”, „Zmień nazwę”, „Usuń” disabled (`text-disabled`); no editor heading | `24-slice-06-01-new-game.png` |
| 2 | „Nowy program” shows „Program 2”, „Usuń” active | `24-slice-06-02-new-program.png` |
| 3 | „Zmień nazwę”: field filled with „Program 2”, focused | `24-slice-06-03-rename-filled.png` |
| 4 | „   ”: „Wpisz nazwę programu.”, frame and message in `warning` (rgb 254,154,0) | `24-slice-06-04-rename-empty.png` |
| 5 | „program” (another letter case of „Program”): „Program o tej nazwie już istnieje.” in `warning`. „PROGRAM 2” showed no message (read, no screenshot) | `24-slice-06-05-rename-taken.png` |
| 6 | „ Las nocą ” saved: the list reads „Las nocą”, the field closed, focus on „Zmień nazwę” | `24-slice-06-06-renamed.png` |
| 7 | „Usuń” of „Las nocą” with two programs: „Program” shown, „Usuń” disabled, focus on the list | `24-slice-06-07-after-delete.png` |
| 8 | „Usuń” of the first program „Program” with three: the first of the list, „Program 2”, shown | `24-slice-06-08-delete-first.png` |
| 9 | Map run (Ala, Las, 16×, first chill at minute 84): „Kopia w przejściu” first and shown, „Zmień nazwę” and „Usuń” hidden, „Nowy program” stays, „Zawsze → Eksploruj 1×” | `24-slice-06-09-copy-in-run.png` |
| 10 | During the run „Program 2” picked: its rule without a count, „Zmień nazwę” and „Usuń” shown | `24-slice-06-10-saved-in-run.png` |
| 11–14 | By keyboard (Tab from „Wyloguj”): the focus outline of `focus` (solid, 2px, rgb 244,244,245, `:focus-visible` true) on the list, „Nowy program”, „Zmień nazwę”, „Usuń”, then Enter on „Zmień nazwę” and the name field, then „Zapisz” | `24-slice-06-11-focus-list.png`, `-12-focus-delete.png`, `-13-focus-name-field.png`, `-14-focus-save.png` |
| 15 | Typed „ nocą” into the name field while the run went from minute 104 to 143: focus, the text „Program 2 nocą” and the open row kept | `24-slice-06-15-name-field-time-passing.png` |
| 16 | Typed „ leśny” into the copy's group name while minute 143 → 185: focus, the text „Program leśny” and „1×” kept | `24-slice-06-16-editor-field-time-passing.png` |
| 17 | „Program 3” picked (after the death at minute 243), then „Restart”: „Kopia w przejściu” shown with „1×”, „Zmień nazwę” and „Usuń” hidden | `24-slice-06-17-after-restart.png` |
| 18 | „Zakończ” at minute 85 of the new run: headquarters; the panel shows „Program 2”, the copy's program, with „Zawsze → Eksploruj 1×”. „Program 3” picked after it showed no count (read) | `24-slice-06-18-after-end.png` |
| 19 | A new send dying at minute 243 („Mag zamarzł”): „Kopia w przejściu” still shown with „1×”, „Zmień nazwę” and „Usuń” hidden | `24-slice-06-19-after-death.png` |

States left unchecked:

- the screen after a completion. Solving Las takes a 480-minute streak and a program written for it. The unit case 7 covers the death branch of the same code path (`state.run` not null), and nothing in the panel tells a death from a completion.
- „Zakończ” after the copy's program was deleted, in the browser. It is covered by unit case 8.
- the hover state of the new buttons in a screenshot taken on purpose. Screenshot 5 shows „Zmień nazwę” under the pointer, drawn in `highlight`, without the check aiming at it.
- the styleguide's states of the shared controls themselves. These are not affected: no control, token or role changed, so the kitchen-sink page was not opened.

## Observed problem (not fixed; for the orchestrator)

**What the player would see:** text typed into an editor field and not yet committed lands in the newly shown program, not the one it was typed into. This happens only if the shown program changes while focus stays in that field.

**Evidence:**

- In the browser, „ leśny” was typed into the copy's group name (state 16). Then „Program 3” was picked with Playwright's `selectOption`, which does not move focus. Program 3's group then read „Program leśny”, and the copy after „Restart” and Program 2 after „Zakończ” read „Program”.
- An isolated probe in the same Chromium showed the cause. An `<input>` with typed text, removed from the page while focused, fires `change` and then `blur` synchronously.

**Cause, verified by that probe and by reading the code:** the panel switches what it shows, and then `editor.update` rebuilds the groups, because the rule identities differ. The removed, focused input fires `change`. Its listener runs `renameGroup(program, …)` on the editor's already updated `program`, and the panel routes the commit by the new `shown`.

**Reachability:** not reachable by mouse or keyboard. A mouse press on the list, or Tab to it, moves focus first, so `change` commits to the old program before the list changes. The same goes for „Restart”, „Zakończ”, „Usuń” and „Wyślij”, which are buttons outside the editor.

**The same mechanism already existed** in the editor whenever a rebuild hits a focused, edited field, for example a discovery changing the Understanding. There the commit stays in the same program, so it is harmless.

**Cost of leaving it:** none for the player today. A later control that changes the shown program without moving focus (a shortcut key, or Slice 7's „Przełącz postać na ten program” if it shows the copy while focus is elsewhere) would reach it.

**Fix if wanted:** in `show()`, before the switch, blur the active element when `editor.element` contains it. That commits to the old program. It is two lines, plus `contains` in the test's document model.

Recommendation: leave it to the cycle's review, or to Slice 7 where the switch button arrives. Its trigger is not in this slice's controls.

In the browser session the synthetic pick left Program 3 with that group name. This touched only that page's game state, which is not saved.

## Choices made

- **Panel API:** `update(state, events)` reads `mapRunStarted` for a send and „Restart”, and the step from a run to none for „Zakończ”. Rejected: explicit `showCopy()` calls from the game view. They would duplicate each place a map run starts, and a later start, such as the earning loop, would be missed. Cost if wrong: one comparison in `nextShown`.
- **The visible label „Program:”** stands beside the list (`text-label`), and the list's accessible name is „Program:”, the name the plan gives the shared list. Rejected: the accessible name alone. Then the panel would show only the bare program name where the editor's heading used to stand.
- **The name message** is checked live on `input` and again at „Zapisz”, and „Zapisz” stays enabled. Rejected: a disabled „Zapisz” while the name is refused. A disabled button loses focus, and the message already says why nothing is saved. Enter in the field does not save; this is left out as not asked for.
- **Focus:** „Zmień nazwę” focuses the field. A successful „Zapisz” returns focus to „Zmień nazwę”. „Usuń” that leaves one program, and so disables itself, moves focus to the list.
- **„Usuń” during a map run of the shown saved program** shows the first program of the list, not the copy, following decision 7's „Usuń of the shown program shows the first program of the list”.
- **The editor's heading** is removed outright rather than made optional. Slice 7 adds the panel's own heading „Kopia: {name}”. The editor tests do not read the heading.

## Reaches beyond the *Read*

- `src/browser/sim/programs.ts`, read whole as the handoff directs: the operations and `programName` live there.
- `src/browser/sim/run.ts:45-60`, the `GameEvent` union: to find the event a send and „Restart” produce (`mapRunStarted`, emitted by `startRun` in `game.ts:146`).
- `tests/sim/program-fixture.mjs` and `tests/sim/understanding-fixture.mjs`: the fixtures the new test uses.
- `tests/view/status-row.test.mjs:1-120` and `tests/view/headquarters.test.mjs`: test conventions.
- `src/browser/view/controls/number-field.ts`: read with the other controls.
- `reports/13-slice-01-report.md:71-85`: the browser route, as the handoff gives.

## Mismatches with the plan

- The plan's *Checks* list no `foundation_check.py`. This is noted, not run, and not a pass.
- No other mismatch with the plan was found. The handoff's note that the operations live in `programs.ts`, not `game.ts`, was followed.
