# Planner report — edytor-programu

Saved by the orchestrator from the planner's returned text: the planner's tool refused to write this file ("Subagents should return findings as text"). The words below are the planner's.

- **Status:** done with concerns
- **Plan:** `C:\Storage\repos\loop2-wt\edytor-programu\.runs\task-cycles\edytor-programu\plan.md` (14 slices, 39 foundation-entry rows)
- **Check:** `slice_size.py` exit 0, all 14 slices fit (`plan-size.md`). Not run, as the handoff ordered: `npm test`, `npm run build`, `foundation_check.py` and every focused check in the slices. No tracked file changed.

## Step 2 — open or reserved design choice
- **Reserved choice:** none. Drag stays on the browser's own drag (D-270), the icons come from game-icons.net (D-27), and no library is needed.
- **Open design choice:** none. The plan settles each open "how" and lists it under *Choices*: the groups of the pick are held in the data; cells carry the data's full labels; action icons are drawn with a CSS mask; one folding memory per page, shared by both panels; the rule panel reaches the map-run screen through a React portal; the React number field keeps its own draft text; what the folded trip-plan line holds; the agent's example script (Slice 2).

## Size checks
- The first run found the program-panel slice too large (≈254k tokens). The trip plan was split into a slice of its own and the slices renumbered.
- The final run: everything fits. The largest are Slice 12 ≈236k and Slice 13 ≈228k.

## Order compared with the styleguide's example
This change adds no library and no token value, so the example's first two steps are empty. The order is: styleguide text; agent-composed game state; icons; pure offer; shared controls with their kitchen-sink samples; destructive look; rule list, rule panel, trip plan; program panel; placement on both screens; coding guidelines. The one departure is that the styleguide text comes before any code, so the components are built to a written look.

## Concerns
1. **Styleguide skill.** To do items 12–13 route the styleguide entries "through `the-way-maintain-styleguide`". That skill's own table (`.the-way/product-guidelines/styleguide/SKILL.md:34-37`) says it never writes the styleguide's file and that in the cycle the author writes it from the templates. Slice 1's Goal names the skill, as the handoff asked, and says to write the file that way.
2. **D-282 already exists.** The projected "(new) — What do the screens leave room for…" has stood as D-282 since task 4, without its rule-panel part. Row E2 changes D-282 rather than creating a second entry.
3. **D-196 becomes untrue (row E37).** Its *Verification* says „Obchód” is "absent outside a run", but after this change it stands greyed with its reason (`foundations/decisions.md:3481`). The task does not list D-196.
4. **Slices 12 and 13 are near the reading limit.** On top of the counted size, both read uncounted files that earlier slices make, roughly 30–60k tokens more. Most of their reading is `tests/view/account-screen.test.mjs` (229k characters), which both slices change and the script counts whole.
5. **Icons split across Slices 3 and 4** only because of the ten-file limit. The action's icon field is optional between those two slices.
6. **Network and Docker.** The icon files come from game-icons/icons at `ICON_SOURCE_COMMIT`, and the foundation step reads the titles from game-icons.net; neither was checked to be reachable. `test_loop2_container_icons.py` likely needs Docker.
7. **Looks chosen by the plan, not by Mariusz.** He first sees these in Slice 12's screenshots: the folded plan line shows each position's icon and its count; Programy shows the program's name as a heading; cells carry the full labels; a rule's delete button reads „Usuń”, while „✕” belongs to the group header.
8. **Temporary states between slices.** Between Slices 12 and 13, the rule panel on the map-run screen sits beside the rows, and the old DOM editor code stays unused. Slices 9–11 build components that are on no screen yet, so their screenshots are marked unchecked with that reason.
9. **Slice 2 has no permanent test of the composition.** Its check is a real run with `npm run local`.
10. **Nine of D-268's ten jsdom test files.** This leaves room for one more file before D-268 reopens, which tasks 11 and 6 may need.
11. **"Four new controls".** The handoff says four; the task gives three (the pick cell, React forms of the select list and the number field). The plan follows the task.
12. **Slice 14 has no task item.** Without it, the *Files of this kind* table in `guidelines/coding-browser-module.md` would name `program-panel.ts` after that file is gone. The slice gives the new React files the status `copy`, as task 4's React files have.

## Guidelines missing or uncertain
- `guidelines/styleguide-browser-view.md` has no entry for the pick cell and no look for the editor. Its lines 102–103 ("icon colour stands in the file") become untrue for mask-drawn icons. Slice 1 writes all three.
- `guidelines/coding-browser-module.md`: no example of a React part drawn into a DOM screen through a portal, or of a React component nested in another React screen part; its rule on new files speaks only of DOM files, so it does not say where a new React file's row goes.
- `guidelines/testing.md` says nothing about native drag on jsdom. Whether jsdom supports `DataTransfer` was not checked; real drag is left to the real-browser check (D-88).
- `guidelines/coding-content-data.md` does not say whether presentation fields (icon, pick group) belong in the data. The plan puts them there, by D-18 and the existing `icon`/`iconTitle` fields in `resources.ts`.
- Which guidelines the slices that edit only guideline files (Slices 1 and 14) must read is uncertain under `product-guidelines/reading.md`.
- ESLint and Prettier coverage of `.claude/skills/**/*.mjs` was not checked.

## Reaches beyond the handoff
- Task 4's cycle record, through `git show 1d7b1c6:docs/task-cycles/ekrany-i-menu/plan.md` and `…/reports/planner.md` — the form an accepted plan of this product used.
- The approved definition `C:\Storage\The Brain\The Brain\Notes\Projects\(P) Loop\definicja_mvp2_loop2.md` lines 209–278, and a search for the headings of the entries the task carries — the projected wording of D-282 and of the rule-writing entry.
- Old Loop: `C:\Storage\repos\loop\src\sim\data\activities.ts` lines 25–56 at cdc7c0d and the file list of `C:\Storage\repos\loop\public\icons\` — the icon-to-action mapping of To do item 15.
- Pinned `.the-way`: `product-guidelines/styleguide/SKILL.md` (1–60), `product-guidelines/reading.md`, `elements/common/foundation_check.py` (485–554; it does not check *Files of this kind*), `task-cycle/slice_size.py`, `task-cycle/change/ui_check.md`.
- Product code and tests beyond the handoff's list: `understanding.ts`, `skills.ts`, `credits.ts`, `credits-section.tsx`, `footer.ts`, the action, condition, item, resource and map data files; tests `icons.test.mjs`, `test_icon_credits.py`, `test_loop2_play_skill.py`, `trip.test.mjs`; parts of `account-screen.test.mjs`, `kitchen-sink.ts`, `styles.css`.
- Foundation entries read whole beyond the handoff's list: D-196, D-269, D-282; invariants at `foundations/invariants.md:236-395` and `:1189-1197`.

## Searches not found or unclear
- Cell names: To do item 4 lists short names („Zapas”, „Tu leży”), while the acceptance criterion clicks „Zapas poniżej”. Plan choice: the data's full labels.
- „nie ma go na tej mapie” and backpack items: unclear whether it greys the backpack items of „Zapas poniżej”, which today bind to no map (`program-editor.ts:196-204`). Plan choice: it greys only the map's resources.
- The folded plan line: what it holds beyond icons is not stated.
- The program's name on Programy: the panel does not draw it today, but the task implies it.
- A rule's delete label is not stated.
- The "two test files" of question 9's cost: no test checks the destructive colour today, so which files were meant was not found.
- Not checked: whether the 11 icons exist at `ICON_SOURCE_COMMIT`, and whether their authors are only Delapouite and Lorc; whether `test_loop2_container_icons.py` runs without Docker; jsdom drag support; the-way's own glossary.
- Line drift: none. The task cites `20d804b` and the base is `6fec0ea`, but the DOM part of `program-editor.ts` still starts at line 534.

## Open questions, with proposed answers
1. Does the foundation step correct D-196's *Verification* (E37)? Yes. Under WAY-126 the merged foundation must not say „Obchód” is absent outside a run while the editor shows it greyed (`foundations/decisions.md:3481`). Bears on Slices 5 and 10.
2. Is the projected "What do the screens leave room for…" written as a change of D-282 (E2)? Yes. D-282 has the exact title, and `plan_mvp2_loop2.md` line 45 assigns the writing to this task. Bears on Slices 10, 12 and 13.
3. Do the cells carry the full labels? Yes, as the acceptance criterion needs (task lines 32 and 51). Bears on Slices 5 and 10.

None of these blocks Slices 1–4.
