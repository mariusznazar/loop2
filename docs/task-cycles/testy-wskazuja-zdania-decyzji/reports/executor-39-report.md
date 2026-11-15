# Executor 39 — report

**Status:** done with concerns (the concerns are judgments for the reviewer to weigh, listed under "Concerns"; nothing is left unjudged).

## Commits (range from 83850d6c54b2f50853b0dec34e0cdf962ce00a2c)

- `783e87d3` test: :white_check_mark: mark the tests that hold the sentences of the decisions on „+ reguła”, writing a program rule, … with lines decision:
- `8ee64e38` docs: :memo: name the tests of D-124, D-288, D-289, D-290, D-291, D-302, D-306, D-350 and D-363, drop the pair of D-124, D-289, D-290, D-302, D-350 and D-363, … and rewrite the pair of D-288, D-291 and D-306 …
- Author address: `mariusznn@gmail.com` (`git log -2 --format='%h %ae'`).

## Files changed (added / removed lines)

| File | + | − |
|---|---|---|
| foundations/decisions.md | 60 | 59 |
| tests/view/rule-editor.test.mjs | 63 | 0 |
| tests/view/program-editor.test.mjs | 39 | 0 |
| tests/view/program-panel.test.mjs | 16 | 0 |
| tests/view/now-lines.test.mjs | 2 | 0 |
| tests/view/scene.test.mjs | 1 | 0 |
| tests/view/icons.test.mjs | 1 | 0 |
| tests/view/account-screen.test.mjs | 1 | 0 |
| tests/view/run-screen.test.mjs | 1 | 0 |
| tests/sim/data.test.mjs | 2 | 0 |
| tests/sim/campfire.test.mjs | 1 | 0 |

Files reached beyond the slice's *Change* (item 5), one line each:
- `tests/view/program-panel.test.mjs` — 9 cases hold sentences of D-124, D-288, D-302, D-306, D-350.
- `tests/view/now-lines.test.mjs` — the rows „Teraz” and „Potem” hold D-291.
- `tests/view/scene.test.mjs` — the badge over the mage's head holds D-291.
- `tests/view/icons.test.mjs` — every action of the data names an icon, D-291.
- `tests/view/account-screen.test.mjs` — the panel on Programy under its header, D-288.
- `tests/view/run-screen.test.mjs` — the panel on the screen of a map run under its header, D-288.
- `tests/sim/data.test.mjs` — the group of each action and the section of each condition, D-290.
- `tests/sim/campfire.test.mjs` — the price function's pieces and first item of a use, D-363.

Each line stands inside the case, as the first lines of its body after any line `decision:` already there, in the form earlier slices used; no test's code, name or assertion changed, no mention of a decision number was removed (the comments `// D-306: …`, `// D-289; …`, `// D-302.` stay where they stood).

## Checks (command and exit code)

- `python -B .the-way/elements/common/foundation_check.py` → exit 0, `0 errors`, no decision listed as `held by nothing` (run on the working tree and again on `8ee64e38`).
- Seen failing once: one quotation of D-291 in `tests/view/now-lines.test.mjs` changed to "Each action has two icons…" → the same command exit 1, `tests/view/now-lines.test.mjs:54` and `:155`: "the quotation stands in no binding sentence of `D-291`", `2 errors`; file restored from a copy, diff then showed only the two intended lines.
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` on all ten changed `.mjs` files → exit 0.
- `npm test -- tests/view/rule-editor.test.mjs` → 0; `npm test -- tests/view/program-editor.test.mjs` → 0; `npm test -- tests/view/program-panel.test.mjs` → 0; `npm test -- tests/view/now-lines.test.mjs` → 0; `npm test -- tests/view/scene.test.mjs` → 0; `npm test -- tests/view/icons.test.mjs` → 0; `npm test -- tests/view/account-screen.test.mjs` → 0; `npm test -- tests/view/run-screen.test.mjs` → 0; `npm test -- tests/sim/data.test.mjs` → 0; `npm test -- tests/sim/campfire.test.mjs` → 0. All runs finished before I returned.
- `git diff -U0 83850d6c -- foundations/decisions.md`, read: nine hunks, each inside the *Verification* field of D-124, D-288, D-289, D-290, D-291, D-302, D-306, D-350 or D-363; no heading, binding sentence, other field, *Rationale* or *Rejected* changed.
- Not run: the full `npm test` (the cycle's run, not a slice's, as the method gives). `test_ruff_source_rules` and `test_shellcheck_source_rules` fail at the base with `FileNotFoundError` (per the handoff); I did not run them.

## Own-work check

- Requirement most likely missed: "every test that holds a sentence carries a line `decision:`" — a case outside the files I read case by case that holds a sentence of mine.
- Check: a search of all of `tests/` for the screen texts and functions of the sentences („Zmiana zeruje”, „gałąź niewykupiona”, „nie znasz jeszcze celu”, „nie ma go na tej mapie”, „wybierzesz w przejściu”, „tu wyląduje”, „patyków)”, „energii natury”, „Zbieranie”, `two-columns`, „+ reguła”, `actionPriceText`, `actionPrice(`), then each file not yet judged read at the hit.
- Result: four more files hit: `tests/sim/rule-signs.test.mjs:492` (the reason at a rule's row, D-310, not the pick), `tests/view/discovery-rule.test.mjs:286` (D-313's rule), `tests/view/status-row.test.mjs:245` and `tests/sim/saved-game.test.mjs:200` and `tests/view/account-screen.test.mjs:2402` (the word „Zbieranie” as a tree or a program name). None holds a sentence of my decisions; no line added.
- The second risk, quotations that do not stand in the binding sentences: the script I used checked every quotation against the binding sentences (found, at a sentence start, ≥3 words, no `"`) before writing, and the foundation check passed; its negative run above shows the check reads the lines.

## Rows of the decisions (item 6)

Sentence keys: D-288 S1 „One program editor…”, S2 „A rule's row reads as a sentence…”, S3 „Rules move by a handle…”; D-289 S1 „The pick of the rule panel holds nothing undiscovered…”, S2 „While the game holds no map run…”; D-290 S1 „The pick of the rule panel sets the actions…”, S2 „It sets the conditions…”; D-306 S1 „A click on a program rule's row…”, S2 „In the grid of a field…”, S3 „After the last field…”; D-350 S1 „A rule panel open on a rule whose rule group is folded…”, S2 „Folding or unfolding that group…”; D-363 S1 „The rule panel shows beside an action…”, S2 „The pieces an action uses up…”, S3 „During a map run the price follows…”. Paths below are `path:line` of the case's `test(` line after the commits. No invariant derives from any of these nine decisions (none has `invariants:`; no entry of the invariants file names them).

| Decision | Held in whole by tests | Held in part by tests | By invariants | By nothing | Verification became |
|---|---|---|---|---|---|
| D-124 | the one sentence, jointly: `tests/view/rule-editor.test.mjs:489` „„+ reguła” adds „Zawsze → Eksploruj” at the end of its group and asks to open its panel”; `tests/view/rule-editor.test.mjs:507` „„+ reguła” is never disabled, …”; `tests/view/program-editor.test.mjs:412` „„Dodaj regułę” appends a fresh „Zawsze → Eksploruj” …”; `tests/view/program-editor.test.mjs:931` „rule edits preserve other groups, group boundaries and identities”; `tests/view/program-panel.test.mjs:414` „„+ reguła” adds the rule and opens its panel on the condition” (the condition as the field opened: the opening asks no field, and `tests/view/rule-editor.test.mjs` „the panel opens on the condition …”, a D-306 line, shows such an opening stands on the condition) | — | none | none | pair removed, `tests:` added |
| D-288 | S1: `tests/view/program-panel.test.mjs:312` „the rule panel opens from a row and from a header under it (${mode}) …” (both screens). S3: rule-editor „a row has „↑”, „↓” …” ,„the arrows are off only at the ends …”, „„↑” on the first rule of a group …”, „a „↓” inside a group swaps …”, „„↑” and „↓” hand the identity …”, „the drop of a rule hands the identity …”, „the buttons of an old „Dodaj regułę” …”, „only the handle is draggable …”, „the drop line stands once …”, „a rule dropped between groups …”, „the lower half of a row …”, „a rule dropped on a folded group …”, „a rule dragged over its own place …”, „the line is gone after a cancelled drag …”, „a drag that ends where the list does not see it …”, „a group dragged by its handle shows the line …”, „a group dragged to the lower half …”, „a group dragged over one of its rows …”, „a group dragged by its handle can be dropped on a folded group …”, „a rule or a group dragged over the panel …”; program-editor „native drop targets place a rule …”, „„↑” and „↓” swap a rule …”, „rule edits preserve other groups …”, „the arrows are off only on the program's first and last rule …”, „„↓” on the last rule of a group makes it …”, „a rule group is dropped before another group …”, „a rule dropped on a folded group …” | S2: row as a sentence — rule-editor „a header shows its number, name, condition …”, „the action's icon stands in a mask …”, program-editor „a row reads as a sentence …”; panel in place on both screens, no column — rule-editor „a list given a panel draws it right after the open row …”, „… after the open header …”, „no panel is drawn without one handed over …”, „a panel closed and opened again …”, program-panel `:312`, „opening a rule, and then a rule of another group …”, `tests/view/account-screen.test.mjs` „on Programy the list and the editor are the two areas …”, `tests/view/run-screen.test.mjs` „an open rule panel stands in the program under its header …”; each pick moves on, cells, two columns, keyboard, greyed with reason — rule-editor „the acceptance criterion …”, „each pick changes the rule at once …”, „in a grid the arrow keys move …”, „each reason stands beside its greyed cell …”, „the conditions stand in two columns …”, „the panel of a group holds its name …”, program-editor „the field after a pick follows the order …” | none | in S2, the cells of actions and targets reached by the keyboard (only the conditions' grid is driven by keys in a test) | pair rewritten for that part, `tests:` added |
| D-289 | S1: program-editor „the offer is the repertoire …”, „target lists follow the Understanding's items …”, „a section holds only what the Understanding holds …”, „a branch action known and not bought stands greyed …”, „„Idź”, „Zbierz”, „Obchód”, „Tu leży mniej niż” and „Zapas poniżej” with no target …”, „a known resource the map of the map run lacks …”, „a target is picked from the resources of the Understanding alone …”, „a value the rule holds outside the pick …”, „the offer follows the character of the map run …”, „a „Obchód” with no target to name …”; rule-editor „in a grid the arrow keys move …”, „each reason stands beside its greyed cell …”. S2: program-editor „the resource lists offer the resources …”, „the actions of the pick stand in four named groups …” (combat outside combat), „a known resource the map of the map run lacks …”, „a value the rule holds outside the pick …”; rule-editor „a value the rule holds outside the pick stands chosen and greyed …” (and another pick changes it) | — | none | none | pair removed, `tests:` added |
| D-290 | S1: rule-editor „the actions stand in the groups Ruch, Zbieranie, Ogień, Żywność i walka …”; program-editor „the actions of the pick stand in four named groups …”; `tests/sim/data.test.mjs` „each action names its group and each condition its section and place in the pick” (in part: the data's groups). S2: rule-editor „the conditions stand in two columns …”, „in a grid the arrow keys move …”; program-editor „the conditions of the pick stand in four sections …”; data.test (in part: sections and places) | — | none | none | pair removed, `tests:` added |
| D-291 | — | the one sentence: rule-editor „the action's icon stands in a mask …” (the row, „Eksploruj”), „the actions stand in the groups … each with its icon …” (a cell has an icon); `tests/view/now-lines.test.mjs` „Teraz names an action under way with the icon of the action …”, „Potem names the rule that wins with its icon …” (the action's icon for „Zbierz — Patyk”, not the target's); `tests/view/scene.test.mjs` „the badge over the mage holds the icon of the action …”; `tests/view/icons.test.mjs` „each action of the data names an icon …” | none | the icon in a rule's row whose action has a target; the icon in a cell of the pick being its action's own, a greyed cell included | pair rewritten for that part, `tests:` added |
| D-302 | the one sentence: rule-editor „the panel of the copy says „Zmiana zeruje passę tego przejścia.” …”; program-panel „the rule panel of the copy says „Zmiana zeruje passę tego przejścia.” …” | — | none | none | pair removed, `tests:` added |
| D-306 | S2: rule-editor „in a grid the arrow keys move …”. S3: rule-editor „the acceptance criterion …”, „each pick changes the rule at once …”, „„✕” and Escape ask to close the panel …”, „opening another rule shows that rule on its condition”; program-panel `:312`, „with a saved program shown on the list „Program:” …”, „opening a rule, and then a rule of another group …” | S1 (all but „leaving the field confirms the number”): rule-editor „a click on a row asks to open that rule …”, „the acceptance criterion …”, „a number typed in the panel keeps its text …”, „the fields of a rule stand in the order …”, „the panel opens on the condition …”, „each pick changes the rule at once …”, „opening another rule …”; program-editor „the fields of a rule: the number only …”, „the field after a pick follows the order …”; program-panel `:312`, „Enter in the number field is consumed …”, „opening a rule, and then a rule of another group …” | none | in S1, the number confirmed by leaving its field | pair rewritten for that part, `tests:` added |
| D-350 | S1: rule-editor „the panel of a rule in a folded group …”, „the panel is the same element wherever the list puts it …”; program-panel „a rule open in a group that gets folded …”, „folding and unfolding the group of the open rule …”. S2: rule-editor „the panel is the same element …”; program-panel „a rule open in a group that gets folded …”, „folding and unfolding …”, „„zwiń wszystkie” and „rozwiń wszystkie” leave the focus …” | — | none | none | pair removed, `tests:` added |
| D-363 | S1: rule-editor „the actions stand in the groups …”, „the price stands in the name of each action cell …”, „the value shown for the action field …”; program-editor „the actions of the pick stand in four named groups …”, „a cell of the action pick carries its price …”. S2: rule-editor „the actions stand in the groups …”, „the price stands in the name …”; program-editor „the price of an action: the pieces …”, „an action that uses up nothing has no price …”, „a name takes the form of its count …”, „the nature energy takes the form …”, „every resource of the data has the forms …”, „the actions of the pick stand in four named groups …”; `tests/sim/campfire.test.mjs` „the price of an action names the pieces it uses up …” (in part: the items and the first of a use). S3: program-editor „the price follows the character of the map run …”, „a cell of the action pick carries its price …” | — | none | none | pair removed, `tests:` added |

## Pairs added or rewritten (for the human to accept at the merge)

- D-288 (rewritten), for the cells of actions and targets reached by the keyboard:
  - complies: the arrow keys moving among the cells of the action and of its target as they do among the conditions
  - violates: the cells of the actions reached by the mouse alone
- D-291 (rewritten), for the icon of a rule's row whose action has a target and the icon in a cell of the pick being its action's own:
  - complies: the icon of „Zbierz” in the row „Zapas poniżej 8 · Patyk → Zbierz — Patyk” and in the cell „Zbierz”, a greyed cell keeping its icon
  - violates: the icon of a stick in the row of „Zbierz — Patyk”; a cell drawing an icon other than its action's; a greyed cell drawn with no icon while a cell that may be picked has one
- D-306 (rewritten), for the number confirmed by leaving its field:
  - complies: 8 typed into the number field of the panel and the focus moved to the cell „Patyk” with the mouse, the rule then holding 8
  - violates: a number typed and left with no Enter dropped, the rule keeping the number it held

No pair was added to a decision that had none (all nine had one at the base).

## Remarks on the log's wording (R3; nothing of it changed)

- D-124: the base pair's violating example „„+ reguła” adding a program rule whose action the Understanding does not hold” goes against `tests/view/rule-editor.test.mjs` „„+ reguła” is never disabled, in a new game or in a game whose Understanding holds no action, and adds its rule there”, which requires exactly that addition („Zawsze → Eksploruj” with no action in the Understanding). The binding sentence („never disabled”) agrees with the test; the example said more than the sentence. The pair is gone now, so the contradiction leaves the log with it, but *Rejected* still lists „a rule added whose action the Understanding does not hold” as rejected — the human may want to see that the test keeps that case reachable for a state no game reaches.
- D-306: the sentence names „leaving the field” as a way to confirm the number; only the shared number field's own control test (`tests/view/react-controls.test.mjs` „a number field commits the clamped number when left after typing …”, a D-265 control case) shows it, not the panel. I did not mark that control case (see Concerns).

## Concerns (judgments the reviewer may weigh)

1. Breadth of marking. I marked every case that would fail if the code broke the part of the sentence it checks, also where another case already holds the same part (e.g. the D-348 cases of moves that also assert the moved order, for D-288 S3; the D-196/D-120 case of the branch reasons, for D-289 S1). This gives D-288 S3 27 marked cases. The plan's rule is "every test that holds a sentence"; I followed it rather than pick a representative.
2. Cases judged as not holding, with the reason, so the reviewer can disagree:
   - `tests/view/rule-editor.test.mjs` „the number field is selected when the focus goes to it …” — cites D-306, but holds a means to the six acts of the *Rationale*, no binding sentence.
   - `tests/view/rule-editor.test.mjs` „Enter and Space on a row or a header ask to open it …” — D-306 names a click; keys are no part of the sentence.
   - `tests/view/rule-editor.test.mjs` „groups do not move by the keyboard …” — the absence of a keyboard way for groups is accepted in D-288's *Rationale*, not stated in a binding sentence.
   - `tests/view/rule-editor.test.mjs` „a drag that is none of the list's …”, „a click, a key and a drag over the panel reach no handler …”, „the item that holds the panel … is no list item …” — none of the sentences.
   - `tests/view/react-controls.test.mjs` pick-cell cases (`:843`–`:1001`) — control tests of D-265 that draw whatever icon and reason they are given; they do not hold that a cell shows its action's icon or its reason (R4's reasoning). The number-field case „commits the clamped number when left after typing” likewise left unmarked for D-306.
   - `tests/view/program-editor.test.mjs` „every action names a group and every condition a section of the data …” — checks the data's shape, not which group; the groups themselves are held by the data and pick cases.
   - `tests/view/program-panel.test.mjs` „the offer of Programy follows the character of the map run …” — D-196's repertoire; it does not read the greyed cell or its reason.
   - The data snapshots of `tests/sim/data.test.mjs` „actions carry their labels …” and „combat actions carry …” — they pin icon names as values, not that each action has one icon (held by the icons case).
3. D-288 S2 is one long sentence; I let the quotation stop where the part a case holds ends (three lengths: the row; the row and the placement; the whole sentence for the picks, cells and greyed cells), as the template allows a quotation that stops early.

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/slice.md` whole (named by the method for a slice).
- `.runs/task-cycles/testy-wskazuja-zdania-decyzji/task-frozen.md` read whole rather than lines 30-42 and 99-104 only — one read of a short file; nothing beyond the named passages changed my work.
- `tests/view/program-panel.test.mjs`, `now-lines.test.mjs`, `scene.test.mjs`, `icons.test.mjs`, `account-screen.test.mjs` (`:4565-4620`), `run-screen.test.mjs` (`:355-420`), `react-controls.test.mjs` (`:837-1002`), `discovery-rule.test.mjs` (`:280-300`), `tests/sim/data.test.mjs` (`:108-260`), `tests/sim/campfire.test.mjs` (`:728-800`), `tests/sim/rule-signs.test.mjs` (`:470-500`), `tests/view/icons.test.mjs` (`:170-300`) — by line range and case, to find the tests that hold the sentences (item 2 asks for the search by content).
- The previous slice's diff (`git show 83850d6c`, `git show dd7c3f91`, in part) for the form of the lines and of *Verification*.
- `grep` of `foundations/invariants.md` (through a search of all files outside the log for the nine numbers): no invariant names them.

## Working copies

- `.runs/executor-39/` under the worktree held the insertion script `insert_lines.py`, its check output, the foundation-check outputs, the focused test outputs and one backup copy of `tests/view/now-lines.test.mjs` for the negative check. Removed (`rm -rf .runs/executor-39`); `.runs/` then held only `task-cycles/`. Nothing of it is needed by this report.

## Unread material

- `guidelines/testing.md`: lines 1-352 read; 353-477 (the rest of the recipes) not read.
- `guidelines/coding.md`: read whole.
- `guidelines/styleguide-browser-view.md`: not read beyond the search hits for the nine numbers (`:195`, `:307-318`, `:594-607`, `:635-649`); the slice changes only comments in tests, which the style guide's look rules do not touch.
- `foundations/glossary.md`: not read.
- `foundations/part_map.md`: read only the lines that name test files (search for `tests/`), to know the parts of the files reached.
- `.the-way/elements/decisions/template.md`: read 105-264 (covers 111-127, 162-166 and 220-260).
- `.the-way/elements/decisions/skill/SKILL.md`: read whole.
- `foundations/decisions.md`: the nine entries, D-73 and D-82 read whole at their current ranges; D-303, D-304, D-305 seen in passing between them.
- Test files: `tests/view/rule-editor.test.mjs` and `tests/view/program-editor.test.mjs` read in ranges covering every case judged; in program-editor, the number-field cases (`:290-410`), the condition and action switching cases (`:461-640`), „focus after a structural edit” and „every program the editor builds passes setProgram” (`:783-923`) were judged by name only, as none concerns my sentences. In rule-editor, the focus-after-edit cases (`:827-950`) and the folding cases (`:556-604`, D-295's) were judged by name and a read of the folding cases.

## Searches not found or unclear

- No test drives the keyboard through the cells of the action or target grid, nor checks the icon file of a cell or of the row of an action with a target — hence the pairs of D-288 and D-291.
- No test of the rule panel shows the number confirmed by leaving the field — hence the pair of D-306.
- The handoff's base fact of 23 decisions `held by nothing`: at this base the check lists none at all, mine included; nothing to read there.
