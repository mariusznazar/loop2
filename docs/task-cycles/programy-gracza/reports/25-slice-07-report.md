# Slice 7 report — the controls of the copy in the program panel

**Status:** done with concerns (the concerns are the states left unchecked below).

**Commits** (base `004c085`): `753011f` feat (panel, game view, styles, styleguide) · `45290f6` test · `5e5a844` fix (spacing of the switch button, found in the browser check).

**Files:** `src/browser/view/program-panel.ts` (+~165), `src/browser/view/game-view.ts` (+20), `src/browser/styles.css` (+~35), `guidelines/styleguide-browser-view.md` (destructive list gains „Porzuć zmiany” and „Przełącz postać na ten program”), `tests/view/program-panel.test.mjs` (+~330).

## Checks

| Check | Exit |
|---|---|
| first failing case (heading, line and three active buttons after an edit): `npm test -- tests/view/program-panel.test.mjs` before the code | 1 (AssertionError: `[]` vs `["Kopia: Program"]`) |
| same command after the code | 0 (21 cases) |
| fix case (pending text lands in the copy) without the blur in `show()` | 1 (AssertionError: copy's group name `"Program"`, expected `"Wpisane w kopii"`) |
| same case with the fix | 0 |
| `npm run typecheck` | 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 |
| `npm test -- tests/quality/test_quality_invariants.py` (pinned tools first on PATH) | 0 |
| `python -B .the-way/elements/common/foundation_check.py` | 0 (0 errors) |

All re-run after the last commit, all 0. The gate (`npm test` with no arguments) was not run, as directed.

## Own-work check

Requirement most likely unmet: the copy's program's changed-line must show also with no unsaved changes, and "Zapisz jako nowy program" must stay available for a copy whose program is gone. Cases: "the line of a changed program stands with and without unsaved changes…" and "a copy whose program was deleted…". Both pass. Case "switch button … after „Zapisz jako nowy program”" covers F14/F16.

## UI check (D-75, D-88)

Route: `LOOP2_LISTEN_PORT=34527 npm run dev` in the worktree (restarted once after the CSS fix); Playwright intercepted only `**/api/account` (200, made-up account, header `x-qa-slice: programy-7`). Viewport 1600×1000. Console, level warning: 0 errors, 0 warnings. Server stopped by PID (22776 first, then 40712; both `node dist/server/main.js`, nothing else touched); no listener on 34527; main checkout `C:/Storage/repos/loop2` clean. Log: `26-slice-07-dev-server.log`. Screenshots are `26-slice-07-<nn>-….png` in this directory.

Inspected (screenshots; I viewed 02, 03, 06, 08 and 17 as images, the others I read as text from the page and saved):

- 01 copy with no unsaved changes: no line, three buttons off (`text-disabled` rgb 82,82,92)
- 02 copy after an edit: line in `warning` (rgb 254,154,0), buttons on; „Porzuć zmiany” in `danger` (rgb 255,100,103)
- 03 changed program with unsaved changes: both lines; 05 changed program without unsaved changes: only the program line, buttons off
- 04 after „Zapisz w programie”: lines gone
- 06 „Zapisz jako nowy program”: field holds „Program 3” (Program 2 already existed in that session); 07 heading „Kopia: Program 3”; 08 switch button beside „Program”; 09 none beside the new program
- 10 „Porzuć zmiany”; 11–12 switch to Program 2: heading „Kopia: Program 2”, focus on the list
- 13 copy whose program was deleted: „Kopia: Program 2”, only „Zapisz jako nowy program”, active
- 14–15 „Zakończ” with unsaved changes: headquarters, panel shows the first program, no copy section
- 16 first-chill rule entered at minute 84: no line; 17–18 switch to Program 2 and back to Program: switch button seen in 17 (spacing fixed by `5e5a844`); counts „0×” (read) in 18
- 19–20 screen after death (minute 243): line, „Zapisz w programie”, „Zapisz jako nowy program”, „Porzuć zmiany” work; no switch button (read: count 0)

Unchecked:

- a completion of Las — głębiej (480-minute streak needs a program written for it); the death screen runs the same branch (`mapRunEnded`) and a unit case covers death
- the streak going from above 0 to 0 at a switch, in the browser: the streak was already 0 in the run I switched in (a program change had zeroed it); the simulation's own tests cover the zeroing, and the panel only calls `switchProgram`
- „Program 2” as the suggested name in the field in the browser: Program 2 existed in those sessions, so the field read „Program 3”; unit case covers „Program 2”
- hover and keyboard focus of the new buttons in a screenshot (they are the shared button, unchanged)
- the kitchen-sink page: no shared control, token or role changed

## Choices

- Save-new reuses the one name field and row; the same click again closes it. Rejected: a second field. Cost if wrong: one more element.
- Focus after „Zapisz w programie”, „Porzuć zmiany”, a save as new and the switch goes to the list (the buttons turn off or vanish). Rejected: leaving it to the browser.
- A name field open for „Zapisz jako nowy program” closes when the copy loses its unsaved changes (otherwise the save would throw).
- `show()` blurs the active element when the editor contains it (C15 ruling), via `document.activeElement` and `contains` without `instanceof HTMLElement`, so the Node test model works. The blur sits in `show()` only, as ruled; `update()` does not blur. The test model gained `contains`, `blur` and a `change` on removal of a focused field with changed text.
- Class `program-switch` on the switch button (margin below), added after the screenshot showed it touching the actions row.

## Reaches beyond the *Read*

- `src/browser/sim/run.ts` (`mapRunEnded`, one function): to know a map run has ended.
- `src/browser/view/program-editor.ts` (lines 621–740, 1030–1081): for the editor's `change` listener and rebuild, needed for the fix case.
- `guidelines/styleguide-browser-view.md:295-302` and `scripts/test.py` head, as named by the handoff and to know the test command builds first.

## Mismatches

- The plan's *Checks* say „Program 2” in the field; in a session that already has Program 2 it is „Program 3” (first free name, per the rule). Not a defect.
