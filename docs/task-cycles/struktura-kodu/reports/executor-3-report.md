# Report — executor of slice 3 (RuleListView divided under the threshold of a function)

**Status:** done

## Commits

- `2935e093` (author `mariusznn@gmail.com`, checked with `git log -1 --format='%h %ae'`) — `refactor: :recycle: divide RuleListView under the threshold of a function, the drag of rules and groups as the Hook useRuleDrag of the new rule-drag.ts and the drawing of a rule's row, a group's header and a group as components of rule-list.tsx`

## Files changed

- `src/browser/view/rule-list.tsx` — rewritten in place, 659 lines in the file after Prettier (comments and blank lines included), diff of the commit: +350 / −458.
- `src/browser/view/rule-drag.ts` — new, 230 lines, +230.

Nothing else: no style, token, test, guideline or foundation change. The exports of `rule-list.tsx` are the same four as before (`RuleListProps`, `RuleListTarget`, `RuleListHandlers`, `RuleListView`).

## Checks (command, exit code)

| Check | Exit | Result |
|---|---|---|
| `node tests/quality/eslint-size-rules.mjs` | 0 | prints 7 reports (`kitchen-sink.tsx`, `startApp`, `ProgramPanelView`, `createProgramsEntry`, its `build`, `RulePanelView`, `tests/transport.test.mjs`); none in `rule-list.tsx` or `rule-drag.ts` (before the change: `RuleListView` 511). The other seven are other slices' or out-of-scope code. |
| `npm run typecheck` | 0 | no error printed |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view/rule-list.tsx src/browser/view/rule-drag.ts` | 0 | |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore …` (both files) | 0 | After one `--write` (Prettier re-wrapped some lines of my first draft of `rule-list.tsx`); the `--check` ran after it and passed. |
| `npm test -- tests/view/rule-editor.test.mjs` | 0 | 76 pass, 0 fail |
| `npm test -- tests/view/program-panel.test.mjs` | 0 | 60 pass, 0 fail |
| `npm test -- tests/view/rule-signs.test.mjs` | 0 | 6 pass, 0 fail |
| `npm test -- tests/view/run-screen.test.mjs` | 0 | 21 pass, 0 fail |
| `npm test -- tests/view/end-question.test.mjs` | 0 | 17 pass, 0 fail |
| manual check of D-88 in a real browser (Playwright CLI, `npm run local`) | — | described below; run on the changed build and on the base build, outputs identical |

No test was written, changed or weakened (the slice says no test changes; the existing tests pass unchanged). No test failed first, so there is no failing run to record. The full gate was not run (by instruction).

## How I divided the function

The verdict's cut was a hypothesis; I checked it in the code. The own body of `RuleListView` was 94 lines, the rest of the 511 came from closures. The drag cut alone does not suffice: the drag was about 110–130 lines (with its pure helpers), leaving about 380 lines, and `renderRule` (116) and `renderGroup` (127) are nested in it. So I cut as the slice said for that case:

1. **`src/browser/view/rule-drag.ts`**: the Hook `useRuleDrag({ program, root, panelHost, commit })` returns `{ landing, startDrag, dragOver, drop, leave, overPanel, clearDrag }`. It owns the `landing` state, the `dragged` ref and the effect that listens on the page's `dragend` and `drop`. The types `Dragged`, `Landing`, the pure helpers (`orderOf`, `droppedProgram`, `sameLanding`, `inLowerHalf`), a new pure `landingAt(program, what, event, target)` (was a closure over `dragged` and `program`) and a new pure `afterDrop(what, at)` (the focus keys and the move of a drop, was inline in `drop`) went with it. `Landing`, `DropTarget` and `RuleDrag` are exported for the components.
2. **`rule-list.tsx`**: `renderRule` became the component `RuleRow`, `renderGroup` became `GroupSection`, and the header of a group was cut out of it as `GroupHeader`. A tiny `DropLine` component draws the line that stood in a local `line` constant. The rows and groups get one prop `parts` (type `ListParts`: the page's props, the drag, `track`, `seatPanel`, `onOpen` and the edits `move`, `remove`, `add`, `toggleFold`, `removeWholeGroup`), made again at each drawing of `RuleListView`.
3. `RuleListView` keeps what the verdict said stays in the component: `commit`, the `pendingFocus` layout effect, `track`, the edits, the panel host and the portal, rendered last as before.

Hooks and effects (D-267): `useRuleDrag` is called at the top level of `RuleListView`, no early return exists; its effect reads `root` and `clearDrag` and lists both (`[root, clearDrag]`, `clearDrag` a `useCallback` with `[]`), and its cleanup removes both page listeners. The layout effect of the focus is unchanged (`[program]`). The new components call no Hook. The status of `rule-list.tsx` (`do not copy`) is not touched.

Where the verdict's cut did not suffice: the drag Hook alone left `RuleListView` at about 380 lines of code, so the rows and group header as components were needed (the slice's own fallback); nothing further was needed after that — the size run reports nothing for the two files.

## Own-work check

The requirement most likely missed: "no change of what the player sees" in the behaviour the document imitation of the tests cannot show (D-88) — the real drag events, the drop line and the focus after an edit, which pass through the new Hook and the new component boundaries (a row or a section is now a component; the panel `li` and the shared host move through `seatPanel`).

The check: the same scripted run (Playwright CLI, real Chromium, real mouse events, a fresh account at each start of `npm run local`) was run on the base build (`2fc6b1e0`, files put back temporarily into the worktree and restored by `git checkout HEAD --` afterwards) and on the changed build, and the two outputs compared with `diff`: identical (exit 0 for both outputs). The output is kept in `reports/executor-3-manual-check.txt`. The program: group 1 with rules 1–3, group 2 with rule 4, group 3 empty, the panel open on the last added rule and then closed.

What it showed, each identical to before:
- a rule dragged within its group: the line „tu wyląduje” (`li.drop-line` in the list of rules) appears during the drag and a rule dragged to the lower half of the last row moves to the end (`1,2,3` → `1,3,2`); a drop on the same place changes nothing;
- a rule dragged into another group (onto a row of it: `1,3 | 2,4`; onto an empty group's header: it lands in that group), with the focus on the moved rule's row afterwards;
- a rule dragged onto a folded group: the line stands in the folded section during the drag, the rule goes into the group, the focus goes to the header of the folded group (its row is not drawn);
- a group dragged among groups: the group line (a `div.drop-line` among the sections) appears; a group moved to the end (`g1,g2,g3` → `g2,g3,g1`), the focus on its header afterwards; a drop on a place that changes nothing makes no change;
- a drag cancelled with Escape: the line goes away and the program stays as it was (both for a rule and for a group);
- the arrows: the last rule of a group moved down goes to the head of the next group with the focus on its „W dół”, and back up with the focus on its „W górę”;
- „Usuń”: after the first rule of a group the focus is on the „Usuń” of the row now there; after the last rule or the only rule it is on „+ reguła” of that group;
- a click on a row opens the panel (one `.rule-list-panel` under that row).
- the console: only the ordinary 401 for the account request and the 404 for the favicon; no `uncaught` line.

Limit of this check: the scripted pointer path is coarse (a line shown during a drag shifts the layout and can move the pointer to the other half of the row, so some scripted drops landed on the "no change" place); it is a comparison with the base build, not a proof of each landing in isolation. I give it as what it is. Keyboard focus after „Usuń” of a middle row and the arrows are real clicks, not drags.

Mutation in my head, checked against the tests: a missing `removeEventListener` in the Hook's cleanup, or a `[root, clearDrag]` list that omitted a value, is unprotected by any test (D-267 says only review catches it; reviewed by reading); a `ref={seatPanel}` lost from the panel `li` is caught by `rule-editor.test.mjs` (panel seat cases).

## Choices, with the way rejected

- **Components with one `parts` prop instead of about ten props each** (the verdict itself warned of ten props). Rejected: explicit props one by one (long lists copied to three components). Cost if wrong: the `parts` object is made again at each drawing, so every row re-renders at each drawing, as it did before (no memo before either); a reviewer who wants narrower props changes one type.
- **`GroupHeader` separate from `GroupSection`** (the slice allows "a rule's row and a group's header"). Cost: the header recomputes `isFolded`, `isOpen` and `summary` that the section also reads — a three-line duplication.
- **`rule-drag.ts` is `.ts`, not `.tsx`**: it draws nothing. `root` is passed in (the list keeps the ref on its `div`), `panelHost` and `commit` too.
- **Not memoizing** the components or the handlers: no behaviour reason, and it would add dependency lists to keep right.
- Reading the verdict: it suggested `useRuleDrag(program, commit, panelHost)` and "a custom Hook in the same file"; the slice says the new file `rule-drag.ts`, which I followed.

## Reaches beyond the handoff

- `guidelines/styleguide-browser-view.md` lines 609–1175 and the `### Program editor` rule (lines 718–760) were read by a search on `^### ` and a targeted read: the *Read* names the file whole; see Unread material.
- `foundations/part_map.md` (a grep of the `browser-view` section): to see that `src/browser/view/**` already claims the new file. Not needed beyond that.
- `.runs/coding/size-trial-verdict.md` of the main checkout (the plan names "the verdict of the task's Context"; the task points to that file): read its section 1 only.
- `tests/quality/eslint-size-rules.mjs` was run, not read.

## Unread material

- `guidelines/styleguide-browser-view.md`: read lines 1–608 and 718–760 whole; lines 609–717 and 761–1175 (the screens Mapy and Wiedza, the scene, the chronicle, the end window, the list of accounts, plan of a UI change) not read — nothing of them concerns the list of rules, and I changed no style.
- Of the plan's *Read* list I opened none of these in the foundation: `foundations/decisions.md` D-88 and D-36 (read both; D-267 read whole), `foundations/invariants.md` (the 12 entries named in the Read list: browser-view-framework, content-identifiers, browser-view-token-values, browser-view-focus-outline, eslint-source-rules, prettier-source-format, cross-part-imports, rule-state-from-pick, streak-program-change, saved-program-edit, copy-save), and `foundations/glossary.md` (program, program rule, rule group, copy) — not read, because the change moves code without a change of behaviour, content, tokens, imports across parts or saved programs, and the focused tests and the lint cover the rules that bite (framework, focus, format). The decision text D-267 and the guidelines that carry the rest were read.
- `src/browser/view/program-editor.ts`: read only through the imports and the grep of the names the list uses (not whole); it is unchanged.
- The task's *Read* passage `task-frozen.md:24-31`, `63-82`, `92-95`, `107-111`: read whole (the whole file was read once).

## Searches not found or unclear

- None unfound. One mismatch of numbers: the handoff and the task say `RuleListView` has about 511–513 lines of code; the size run measured 511 at the base, as the handoff says.
- `guidelines/coding-browser-module.md` has no row for the new `rule-drag.ts`; the guideline says a file added after the last audit has no row and is no exemplar, and the slice says the table does not change, so I left it. Reported for the orchestrator in case a later slice should list it.

## Working copies

My working directory `.runs/executor-3/` (the scripts of the browser check, the logs of the five tests, the local-start logs and a temporary copy of `rule-drag.ts` while the base build was served) stood in the worktree and was removed (`rm -rf`); `.playwright-cli/` made by the CLI was removed too. The base build was made in the worktree itself (the two files put back and restored by `git checkout HEAD -- …`, `git status` clean afterwards), not in a separate worktree, so no `git worktree` was added. I kept in `reports/` only `executor-3-manual-check.txt` (the output of the browser run on the base build, with the note that the changed build's output is identical). The files that `npm run local` makes by itself (`.runs/local-start/`) are the product's own and stay. The local game was stopped (`npm run local:stop`) and the browser closed. No remainder.
