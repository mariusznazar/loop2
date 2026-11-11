# Slice 7 report — the tables of the coding guidelines know the new files

**Status:** done with concerns (the concerns are the choices and the named gap below; no question for the orchestrator)

**Branch:** `task/koniec-przejscia` · **Base:** `01e6c26` · **Commit:** `6de72dbb` (`docs: :memo: list the files the end-of-run window and the run record add in the tables of the simulation and browser coding guidelines, each as copy`)

## Files changed

| File | Added | Removed | Commit |
|---|---|---|---|
| `guidelines/coding-simulation-module.md` | 20 | 19 | `6de72dbb` |
| `guidelines/coding-browser-module.md` | 66 | 64 | `6de72dbb` |

Most of these lines are the padding of the two tables, which the formatter's check requires (see choice 3). The new rows:

- `guidelines/coding-simulation-module.md`, *Files of this kind*: `src/browser/sim/run-record.ts` · `copy` · `—` (placed before `run.ts`).
- `guidelines/coding-browser-module.md`, *Files of this kind*: `src/browser/view/end-window-lines.ts` · `copy` · `—` and `src/browser/view/end-window.tsx` · `copy` · `—` (placed after `email-status.ts`).

No rule, example, *Where in code* entry or exemplar changed in either file.

## Checks

| Check | Command | Exit | When |
|---|---|---|---|
| Foundation check, base | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) | before the change |
| Prettier, base | `node node_modules/prettier/bin/prettier.cjs --check guidelines/coding-simulation-module.md guidelines/coding-browser-module.md` | 1 (both files flagged) | before the change |
| Foundation check, after | same as above | 0 (`0 errors`) | after the change |
| Prettier, after | same as above | 0 ("All matched files use Prettier code style!") | after the change |

- No test was written: the change is table rows and formatting, so there is no failing test to show first.
- Not run: `npm test` and the full gate, as the handoff says. Not run: no other test; the change touches no code.
- The foundation check passes on the base too, so it does not check that the rows are right. The own-work check below covers that.

## Own-work check

- **Requirement:** item 13 of `task.md` — the two tables hold the three files this task added, each with its status, and the file's check passes.
- **Check:** `grep` for the three paths in the two tables, the two checks above, and a grep of the three new files for DOM and clock use (`document`, `createElement`, `Date.`, `setTimeout`, `window.`), which would make a status other than `copy` likely.
- **Showed:** each path is in its table once, with status `copy`; both checks pass after the change. The grep of the three files finds no DOM API and no clock. Each status is judged below.

## Status of each file, with its reason

- `src/browser/sim/run-record.ts` · `copy`. Pure simulation module: it imports only data and types, builds new records and does not write to its arguments, and reads no clock. It is a model for a new simulation module.
- `src/browser/view/end-window-lines.ts` · `copy`. Pure text module (`.ts`, no DOM). Its imports include functions from `do not copy` files (`combat-line.ts`, `trip-lines.ts`, `status-row.ts`, `program-editor.ts`, `now-lines.ts`). D-265 allows importing pure functions from those files, and I found none of them touching the DOM. Rejected: `do not copy` for it; cost if wrong is small (a new text module would be built on it rather than on an older one).
- `src/browser/view/end-window.tsx` · `copy`. A React component: hooks at the top level before any early return (D-267), one `useEffect` with an empty dependency list that only focuses a ref, no DOM element built by hand, text only from `end-window-lines.ts`. Its imports from `do not copy` files are pure functions, as above. Rejected: `do not copy` for it; cost if wrong is the same as above.

## Choices

1. **Status `copy` for all three files.** Rejected: `do not copy` for the two view files because they import from `do not copy` modules. D-265 allows the import of pure functions, so this is not a break. Cost if wrong: a future view module copies a pattern it should not.
2. **Row positions.** Rows follow the byte order of the paths used by the existing tables (`-` before `.`): `run-record.ts` before `run.ts`; `end-window-lines.ts` before `end-window.tsx`, both after `email-status.ts`. Cost if wrong: none; the order is only for reading.
3. **Formatter-driven reformat.** The check requires Prettier to pass. Before the change, the tables were unpadded and Prettier flagged both files. Prettier therefore padded every table row (about 60 lines of the browser table, 17 of the simulation table) and normalised two emphasis markers in prose in `guidelines/coding-browser-module.md`: `*Nowy ekran i moduły w DOM*` became `_Nowy ekran i moduły w DOM_` (in the rule text, the line that ends "(reguła ...)"), and `*Files of this kind*` became `_Files of this kind_` (in the paragraph of the rule "Nowy ekran i moduły w DOM"). Rejected: leaving the tables unpadded, which would fail the handoff's check. Cost: a wider diff; no meaning changed. The two prose markers are the only change outside the tables.

## Reach beyond the dispatch

- `the-way` skill `product-guidelines/coding/SKILL.md`, `recognize.md`, `kinds.md`, `settle.md`, `hand_back.md`, `task_document.md`, and the coding template's *Files of this kind* and *status* sections (`product-guidelines/coding/template.md`, the `## Files of this kind` item). Read to follow the skill's steps for the route of one kind, and to take the status meanings (`exemplar`, `copy`, `do not copy`). `kinds.md` says `do not copy` is for a file that breaks a rule the product holds or the task settles, and `copy` for every other file of the kind.
- `tests/invariants/test_content_identifiers.py` lines 1-60, to see which identifiers the content rule covers (see the named gap below).
- `guidelines/coding-saved-game.md` lines 1-80 only (the dispatch lists the file; I did not need the rest, since no saved-game file changed).
- `foundations/part_map.md` lines 3-60 (the dispatch's range).
- `.the-way/product-guidelines/coding/SKILL.md` is the skill's own file; read whole.

## Unread material

- `product-guidelines/template.md` (the general template): the skill's step 4 says to read it in full; I did not. I took the status meanings from the coding template and `kinds.md`, which the handoff's route of one kind needs. Nothing in the change depends on the general template.
- `guidelines/coding-saved-game.md`: read lines 1-80 of its total, not the rest (see above).
- `product-guidelines/starting_set.md`, `research.md`, `trial_run.md`, `audit_end.md`, `new_tools.md`, `project-level/technology/reserved_choices.md`: not read. The route of one kind has no step 2, no trial run and no audit, and no new tool is chosen, so these do not apply to this change.
- `docs/task-cycles/koniec-przejscia/task.md`: not opened; the dispatch copies line 46.
- `.the-way/task-cycle/change/ui_check.md`: not read; the change alters no screen.
- Foundation entries of the task (D-362 and the others): not read; the dispatch names none, and the "Current ranges" section of the handoff is empty.

## Searches not found or unclear

- The handoff's "Current ranges of the foundation entries" section is empty, so I have no range for the decision entries. It did not affect the change, since none of the rows depends on a decision entry.
- The handoff says the tables are read with "what each status means, as the file says". The meanings are in the coding template and in `kinds.md`, not in the two tables. Found and used.
- Nothing else was unclear.

## Gap found (named, not decided)

The browser rule *Nazwy treści z danych* (`guidelines/coding-browser-module.md`, the rule with invariant `content-identifiers`) and its test cover maps, resources and archetypes only. `src/browser/view/end-window-lines.ts` lines 47-49 write three action identifiers in a view file: `"walkTo"`, `"walkToCampfire"`, `"wander"` (the list of kinds the walk joins). No rule or test is broken as written, so the status stays `copy`. Whether the rule should also cover action identifiers is a decision for the human; I did not add a rule. Cost if left: a future view file may copy this literal list without a check. Orchestrator to decide whether it becomes a question of the task.

## Problems as observed

- The base prettier check failed before the change, so the handoff's check was not passing on the base (as the handoff's check line implies it should after the change).
- The foundation check passed before and after; it does not check the table contents.
- The hand-back step of the skill (`hand_back.md`, step 5, back to `refine-task` step 4) was not run: it belongs to the refinement that the orchestrator leads, not to a cycle slice. The task document was not written. The orchestrator owns those steps.
