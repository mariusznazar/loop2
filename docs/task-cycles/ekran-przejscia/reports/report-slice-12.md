# Report: Slice 12, the guidelines follow the change

(Saved by the orchestrator from the executor's returned text: the harness refused the executor's own write.)

- **Status:** done
- **Commit:** `1057f7d` (base `ebce3d3`), not pushed.
- **Check result:** nothing failed; the full `npm test` not run (the cycle's gate). Foundation entries D-36, D-265, D-267, D-269 and D-03 not read (see Searches).

## Files changed
- `guidelines/coding-browser-module.md`: 19 insertions, 10 deletions.
- `src/browser/styles.css`: 34 deletions.
- `guidelines/styleguide-browser-view.md` unchanged: nothing in it made untrue.

## What was done
1. Table *Files of this kind*: rows added in alphabetical order, each `copy` and `—` (answer Q4): `discovery-band.tsx`, `discovery-rule.ts`, `run-header.tsx`, `run-screen.tsx`, `terrain-drawing.tsx`, `tile-table.tsx`, `world-area.tsx`; rows `run-screen.ts` and `terrain-panel.ts` removed.
2. Example „Kontrolki w DOM i ich aktualizacja” now stands on `src/browser/view/headquarters.ts`; its first paragraph rewritten; `## Where in code` lists `headquarters.ts` instead of `status-row.ts`.
3. Stylesheet: removed `.status-row`, `.status-text`, `.status-text.positive`, `.discovery-text`, `.terrain-panel` with their comments, after `git grep` over `src`, `tests`, `scripts` showed only the stylesheet used them (other matches were import paths of `status-row.js`); no `@media` block or selector list named only them; `.rule-panel-host` stays.

## Why `headquarters.ts` for the example
- `document.createElement` counts: `headquarters.ts` 24, `away-report.ts` 5, `app.ts` 5, `game-view.ts` 4, `footer.ts` 4, `email-confirmation.ts` 1; the rest none.
- It makes the name field and „Załóż” once; `update` sets `disabled` on „Wyślij” and „Puść w pętlę”; `setLine` writes text and visibility only where they differ; the team list rebuilt only when the team, solved maps or programs' numbers and names change; name field and button keep focus; actions through `HeadquartersControls`; stays in DOM (`game-view.ts:279` calls `createHeadquarters`).
- Rejected: `status-row.ts` (only pure functions and a type now); `program-editor.ts` (builds no elements); `away-report.ts`, `footer.ts` (smaller, no updating buttons where focus matters). Cost if wrong: a later task moving the headquarters to React moves the example again.

## Guidelines checked for passages made untrue (WAY-172)
- `coding-browser-module.md` whole: no rule or other example names the removed modules or says where the rule panel or the status row stands; „Wspólna kontrolka w dwóch postaciach” and „Nowy ekran i moduły w DOM” stay true.
- `coding.md` whole: nothing about the run screen, status row, terrain panel or rule panel.
- `testing.md`, all 454 lines, in parts with `sed`: nothing about the screen of a map run or the removed modules; no line past 200 exceeds the 3000-character cut.
- `styleguide-browser-view.md` whole: never says where the rule panel, status row or tile table stands; `link-highlight` mentions „wiersz listy odsłoniętych kafelków” — still true. Left unchanged on purpose: the *Bad* line of „The kitchen-sink page”, „Strona rysuje panel terenu ze stanu gry złożonego ręcznie” — „panel terenu” is still the foundation's name (D-19, D-125, D-45 at `foundations/decisions.md:938`).

## Checks (command and exit code)
| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| script comparing the table's rows with `git ls-files -- src/browser/view`: 48 tracked, 48 rows, no difference | 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 (4 OK) |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 (5 OK) |
| `git grep -n -E "createTerrainPanel\|createTileListView\|terrain-panel" -- src tests` | 1 (no match) |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig src/browser/styles.css` | 0 |

No test written (prose and dead CSS only).

## Own-work check (WAY-164)
- Most likely missed: the table lists exactly the files git tracks, and no class still in use removed. Check: the table-versus-`git ls-files` script, the pre-removal `git grep` of the five classes, `foundation_check.py`, the token-values test. All passed.

## Reaches beyond the handoff
`src/browser/view/status-row.ts` whole; `src/browser/view/tile-table.tsx:1-80`; a grep of `src/browser/view/game-view.ts`; `src/browser/styles.css:1295-1470`; `task.md:1-80`; `.the-way/task-cycle/change/slice.md`.

## Concerns and notes
- Statuses left: `status-row.ts`, `tile-list.ts`, `trip-lines.ts`, `combat-line.ts` stay `do not copy`; no new status settled; „Nowy ekran i moduły w DOM” allows importing such pure functions.
- `discovery-rule.ts`: a `.ts` file with status `copy` (Q4); the sentence on `copy` in „Nowy ekran i moduły w DOM” concerns `controls/` only; no rule changed.
- No trust boundary touched.

## Searches not found or unclear
- Foundation entries not read: D-36, D-265, D-267, D-269, D-03, nor `foundations/decisions.md`; `.the-way/product-guidelines/coding/SKILL.md:1-60` not read (`coding/template.md` and `product-guidelines/template.md` read whole). No rule or decision citation changed; the *Decision* column keeps the table's values (`D-36` on the exemplar, `—` elsewhere). A gap in the read; D-36 still designating `account-card.tsx` not re-checked.
- No other DOM module that builds buttons once and updates them in place than `headquarters.ts`.
- `foundations/glossary.md` not checked for „panel terenu”.
