# Executor report — slice 4 — task `paski-parametrow`

**Status:** done

**Commit:** `2cfee2ed` on `task/paski-parametrow` (base `2a0811aa`). One commit, four paths staged by path.

**Files changed (added / removed lines):**
- `src/browser/view/body-row-cells.tsx` — new, 41 / 0. Component `BodyRowCells({ run })` that draws the body row (`div.body-row`: the four `body-cell`s with their values and notes, and the `p.backpack-text`), from `bodyCells` and `backpackText` of `src/browser/view/body-row.ts` and `MAPS[run.mapId]`.
- `src/browser/view/world-area.tsx` — 2 / 25. The body row block is replaced by `<BodyRowCells run={run} />` in the same place (after `NowRows`, before the solved line). Imports: `bodyCells`/`backpackText` and `MAPS` removed (`MAPS` was used only by the body row), `BodyRowCells` added.
- `tests/view/body-row-cells.test.mjs` — new, 310 / 0. Five moved cases (values and danger, the notes at game minute zero, the danger notes and their thresholds, the fire note, the notes after the end of a map run), with the helpers they need (`SENT`, `entry`, `PLAN`, `sent`, `completed`, `died`, `withRun`, `draw`, `notesOf`) and the `// decision:` lines they carry.
- `tests/view/world-area.test.mjs` — 0 / 209. The five cases and the helper `notesOf` are removed; no line added. The remaining 19 cases are untouched (the case of the world area's order from the top stays).

**Checks** (each run from the worktree root, exit code as shown):
- Baseline before any edit: `npm test -- tests/view/world-area.test.mjs` — exit 0, 24 pass, 0 fail.
- `npm test -- tests/view/world-area.test.mjs` after the change — exit 0, 19 pass, 0 fail (run before and after `git add`).
- `npm test -- tests/view/body-row-cells.test.mjs` — exit 0, 5 pass, 0 fail (run before and after `git add`; 19 + 5 = 24, the baseline count).
- `npm run typecheck` — exit 0.
- `npm test -- tests/invariants/test_browser_view_framework.py` — exit 0, 9 tests OK (before and after `git add`).
- `npm test -- tests/quality/test_quality_invariants.py` — exit 0, 8 tests OK (before and after `git add`).
- `npx prettier --check` on the four changed files — exit 0, "All matched files use Prettier code style!".
- Mutation check (own-work, below): `sed` forcing the value class of `body-row-cells.tsx` to `body-value` only, then `npm test -- tests/view/body-row-cells.test.mjs` — exit 1, 4 pass, 1 fail (the case "only the value below its threshold stands in danger ..."). File restored from a copy, then `npm test -- tests/view/body-row-cells.test.mjs` — exit 0, 5 pass, 0 fail. `git status` clean afterwards.

**Not run by me:** the full gate (no bare `npm test`, by the handoff); `python -B .the-way/elements/common/foundation_check.py`; `python -B .the-way/instruction-files/check_instructions.py`; `tests/quality/test_function_and_file_size.py` (size rule D-425: `world-area.tsx` shrinks and the new file is 41 lines, but I did not run the check); `tests/quality/test_node_test_selection.py` (the new test file is run by name, not through the gate's selection). These belong to the orchestrator's gate.

**Own-work check (method section 3):**
- Requirement: the five moved cases keep their assertions and pass; no other case changes; the body row keeps its DOM (`body-row`, `body-cells`, `body-cell`, `body-value` with `danger`, `body-note` with `danger`, `backpack-text`) and its place in the world area.
- Check 1: the moved text in `tests/view/body-row-cells.test.mjs` is byte-identical to `git show HEAD:tests/view/world-area.test.mjs` lines 561–768 (`diff` exit 0). `world-area.test.mjs` has 0 added and 209 removed lines, all in the moved range.
- Check 2: the world-area order case and the rest of the world-area file pass unchanged (19 pass).
- Check 3: mutation of the danger class — caught by the moved case (exit 1), then restored (exit 0). The mutation was the failing run the method asks for; the moved cases are a move with no behaviour change, so test-first does not apply.
- Walkthrough: the change alters no behaviour a user sees (the rendered DOM is the same), so I did not read `walkthrough.md`; no screen changes, so I did not read `ui_check.md`. One sentence each, as the method asks.

**Reaches beyond the dispatch:** none. I read only the files the slice's *Read* names, plus `.the-way/task-cycle/change/SKILL.md` and `slice.md` as the method directs.

**Working copies:** the directory `.runs/executor-4/` (scratch parts of the test file, copy of the original block, a backup of `body-row-cells.tsx` for the mutation, check outputs) — removed with `rm -rf` before this report was written; nothing remains. A baseline output file written at `.runs/executor-4-baseline-world-area.txt` was removed at once. No copy remains to report.

**Choices and adaptations (with the way rejected and the cost if wrong):**
1. Line range: the handoff gives the moved range as 563–772 at base. The body-row cases run from line 561 (the comment of the first moved case) to line 768 (`});`); line 769 is blank and 770–772 is the comment of the paragraph case, which stays. I moved 561–768 (with the blank 769 removed too). Adaptation to the file as it stands; the moved cases are identical to the base text.
2. `BodyRowCells` takes the map run (`{ run: MapRun }`) and looks up its map itself, as `WorldArea` did. Rejected: passing the computed cells from `WorldArea` (keeps the map lookup in the screen, and the component would not own its data). Cost if wrong: none seen; the props type is one field.
3. The moved cases render `BodyRowCells` alone through a local `draw` helper, not `WorldArea` plus the tile table as the old `Screen` did. Assertions unchanged. Rejected: keep rendering `WorldArea` in the new file (it would test the world area again, not the component). Cost: none observed; the world-area test still covers the body row's place through the order case.
4. Helpers are duplicated rather than shared: `SENT`, `entry`, `PLAN`, `sent`, `completed`, `died`, `withRun` appear in both test files, as the plan's "the helpers they need" reads. Rejected: a shared fixture module (a new file outside the slice). Cost: about 60 lines in two files that must change together if the game fixture changes.
5. `guidelines/coding-browser-module.md` has no row for `body-row-cells.tsx`. The guideline's table is the audited list; a file added after the audit has no row and is no model (its rule "Nowy ekran i moduły w DOM"). Not changed by me.
6. `tests/view/world-area.test.mjs` keeps its file-header comment, which still names "the body row with the backpack" among the things it covers; the world area still places the row, so the statement holds. Not edited.

**Unread material:** none. Every file and decision named by the slice's *Read* was read whole at its current range: `src/browser/view/body-row.ts`, `tests/view/page-document.mjs`, `tests/view/game-stylesheets.mjs`, `foundations/decisions.md` D-337 (10966–11078), D-311 (10678–10818), D-407 (4784–4800), `guidelines/styleguide-browser-view.md` (1–1634, in three reads), `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md` (1–510, in two reads), `src/browser/AGENTS.md`; plus the two files to change, whole. The plan's line ranges for D-337, D-311 and D-407 are stale; the handoff's current ranges were used.

**Searches not found or unclear:**
- The plan's line ranges for D-337, D-311, D-407 are stale (noted above; current ranges from the handoff used).
- The plan's range 563–772 for the moved cases is not exact at base (see choice 1).
- `foundations/part_map.md` claims `src/browser/view/**` for the new file (line 10 of that file); I did not check the part map for `tests/view/**`, since the slice's checks do not run `foundation_check`.
- Nothing else unclear.

**Questions:** none. No concern blocks the slice.
