# Report — executor of slice 40 (rule groups and program rules in the program editor)

**Status:** done with concerns

The concerns: (1) the plan's *Change* names `tests/view/chronicle-entries.test.mjs`, and I added no line there (reason below); most of the lines stand in `tests/view/rule-editor.test.mjs` and `tests/view/program-panel.test.mjs`, which the *Change* does not name (item 5 of "Work of every slice"); (2) one test title says more than its assertions (D-295, below).

## Commits

Range `8ee64e3850dd9dfa33b9338411847ddc337a199d..fd716ca2`, author `mariusznn@gmail.com` (as earlier commits of the branch):

- `9c4d637b` test: :white_check_mark: mark the tests that hold the sentences of the decisions on numbering rule groups and program rules, … with lines decision:
- `fd716ca2` docs: :memo: name the tests of D-292, D-293, D-294, D-295, D-296, D-297, D-298, D-299, D-300, D-301, D-303, D-304 and D-305, drop the pair of D-292, D-293, D-296, D-297, D-301 and D-303, …, and rewrite the pair of D-294, D-295, D-298, D-299, D-300, D-304 and D-305 …

Files changed: `foundations/decisions.md` +63 −48 · `tests/view/rule-editor.test.mjs` +22 · `tests/view/program-editor.test.mjs` +6 · `tests/view/program-panel.test.mjs` +3. No test code, name or assertion changed; no mention of a decision number removed.

Files beyond the *Change* (item 5): `tests/view/rule-editor.test.mjs` and `tests/view/program-panel.test.mjs` (part browser-view; `guidelines/styleguide-browser-view.md` was already in my *Read* and read whole). Each was run on its own (below).

## Checks (command — exit code)

- `python -B .the-way/elements/common/foundation_check.py` at the base — 0 (`0 errors`; it lists no decision `held by nothing`).
- `python -B .the-way/elements/common/foundation_check.py` after the change — 0 (`0 errors`; none of D-292…D-305 listed `held by nothing`).
- Positive control of that check: one quotation broken on purpose (D-301 at `tests/view/rule-editor.test.mjs:306`, „no program rule” → „no rules”), check run — 1 (`the quotation stands in no binding sentence of D-301`, `1 error`); file restored with `git checkout -- tests/view/rule-editor.test.mjs`, check run again — 0. So the 0 above checks the quotations.
- `npm test -- tests/view/program-editor.test.mjs` — 0 (57 pass, 0 fail).
- `npm test -- tests/view/rule-editor.test.mjs` — 0 (75 pass, 0 fail).
- `npm test -- tests/view/program-panel.test.mjs` — 0 (53 pass, 0 fail).
- `npm test -- tests/view/chronicle-entries.test.mjs` — 0 (13 pass, 0 fail; file unchanged, run because the slice's *Checks* name it).
- `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore tests/view/program-editor.test.mjs tests/view/rule-editor.test.mjs tests/view/program-panel.test.mjs` — 0.
- `git diff -U0 8ee64e38 -- foundations/decisions.md`, read: 14 hunks, all in the *Verification* fields of D-292…D-305 (none in D-302); a filter of the changed lines for anything that is not `- **Verification:**` or an indented continuation line printed nothing.
- Not run: the full `npm test` (the cycle's gate, not the slice's). `test_ruff_source_rules` and `test_shellcheck_source_rules` fail at the base with `FileNotFoundError` (handoff); I did not run them.

## Own-work check

- Requirement most likely missed: a quotation that does not stand at the start of a binding sentence, given the Polish quotation marks („”) and arrows in these sentences. Check: the positive control above — the script does check each quotation against the entry, it failed on a broken one, and passes on all of mine.
- Second: "only *Verification* changes". Check: the diff filter above — no other line of the log changed.

## Rows of item 6

Paths are as at `fd716ca2`. `invariants:` — none of these decisions names one, so no part is held by an invariant.

| Decision | Held by tests (whole / part) — `path:line` case | Held by nothing | *Verification* |
|---|---|---|---|
| D-292 | Whole: `tests/view/program-editor.test.mjs:1583` "a rule is numbered by its group and its place in it, a group by its place in the program" (groupNumber 1→„2”, ruleNumber →„2.1”); `tests/view/rule-editor.test.mjs:179` "a header shows its number, name, condition and number of rules, and a row its number, sentence and time" (header „1”, rows „1.2”, „2.1”) | nothing | pair removed |
| D-293 | Whole: `tests/view/program-editor.test.mjs:1437` "the time of one execution: minutes from the data, „tura” in combat, a movement's step in a map run and nothing outside one"; `tests/view/rule-editor.test.mjs:180` (same case as 179; row „10 min”); `tests/view/rule-editor.test.mjs:250` "the time of one execution: minutes, „tura” in combat, nothing for a move outside a map run and the map's step in one" (row); `tests/view/rule-editor.test.mjs:1494` "the actions stand in the groups Ruch, Zbieranie, Ogień, Żywność i walka, each with its icon and the time of one execution beside it" (panel cells: 10 min, 40 min, tura, none for „Wędruj”); `tests/view/rule-editor.test.mjs:1584` "the value shown for the action field is its name with its price, and the time of one execution stands beside it" (panel field, 5 min) | nothing. Note: a movement's step during a map run is checked in the row and in the computation, not in the panel; the panel takes the same time, so I judged the sentence held whole | pair removed |
| D-294 | Part: `tests/view/program-panel.test.mjs:481` "a group folded on one screen stays folded on the other for the same program, the copy's folding is its own, and a new memory forgets" (one page memory shared by Programy and the screen of a map run; a new memory starts unfolded); `tests/view/program-panel.test.mjs:533` "a fold made on one panel redraws the other at once, with no update of its own" | that a reload forgets the folding (nothing stops it from being kept in the browser's storage: a new jsdom page also has empty storage), and that the saved game state does not hold it | pair rewritten |
| D-295 | Part: `tests/view/rule-editor.test.mjs:584` "a folded group shows its header alone, with name, condition and number of rules" (asserts name and „2 reguły” only); `tests/view/rule-editor.test.mjs:702` "a rule dropped on a folded group lands at its end, the line stands under the header and the group stays folded" (whole second clause); `tests/view/program-editor.test.mjs:1751` "a rule dropped on a folded group, which shows no rule to go before, lands at the group's end" | the condition shown by a folded group's header | pair rewritten |
| D-296 | Whole: `tests/view/rule-editor.test.mjs:340` "a click on a row asks to open that rule, on a header that group, and a click on a button in the row asks nothing"; `tests/view/program-panel.test.mjs:317` "the rule panel opens from a row and from a header under it (${mode}), takes the focus, and „✕” and Escape give it back to the row" (both screens; panel under the header with „Nazwa grupy”); `tests/view/rule-editor.test.mjs:1649` "the panel of a group holds its name and its condition with its number and target, and no action"; `tests/view/rule-editor.test.mjs:381` "a row has „↑”, „↓” and the destructive „Usuń”, and a header has no arrows" („✕” in the header) | nothing | pair removed |
| D-297 | Whole: `tests/view/program-editor.test.mjs:935` "rule edits preserve other groups, group boundaries and identities"; `tests/view/program-editor.test.mjs:1651` "the arrows are off only on the program's first and last rule, a group's edge being no end"; `tests/view/program-editor.test.mjs:1677` "„↓” on the last rule of a group makes it the first of the next, „↑” on the first the last of the previous; an empty group takes it too"; `tests/view/rule-editor.test.mjs:399` "the arrows are off only at the ends of the program: „↑” on the first rule and „↓” on the last"; `tests/view/rule-editor.test.mjs:413` "„↑” on the first rule of a group moves it to the end of the previous group"; part: `tests/view/rule-editor.test.mjs:868` "after „↓” across a group border the focus stands on the moved rule's „↓” in its new group" and `:887` "after „↑” across a group border …" (the rule lands in the other group; place not asserted) | nothing | pair removed |
| D-298 | Part: `tests/view/rule-editor.test.mjs:610` "„zwiń wszystkie” and „rozwiń wszystkie” stand only beside more than one group, every group unfolded at the start" (folds all, unfolds all, absent with one group) | that it is a plain shared button (not underlined text) | pair rewritten |
| D-299 | Part: `tests/view/rule-editor.test.mjs:1607` "the conditions stand in two columns in their sections, parted by a line, with no names; no search, no row „ostatnio” and no current value" (panel open on the condition field only) | the picks of actions and targets | pair rewritten |
| D-300 | Part: `tests/view/rule-editor.test.mjs:1608` (same case; no „teraz” in the panel open on conditions, game with no map run) | a rule's row, and the panel during a map run | pair rewritten |
| D-301 | Whole: `tests/view/rule-editor.test.mjs:306` "an empty group says „Pusta grupa — przepuszcza dalej.” and a group with rules does not" | nothing | pair removed |
| D-303 | Whole: `tests/view/rule-editor.test.mjs:485` "„Usuń” of a rule and „✕” of a group delete at once, with no question" (the edit is handed over at the click, so no question came in between) | nothing | pair removed |
| D-304 | Part: `tests/view/rule-editor.test.mjs:540` "„+ dodaj grupę” appends an empty group with the next number"; `tests/view/rule-editor.test.mjs:558` "the buttons of an old „Dodaj regułę”, „Dodaj grupę” and the arrows of a group are gone" | where the button stands: under the groups, at the foot of the list | pair rewritten |
| D-305 | Part: `tests/view/rule-editor.test.mjs:295` "the list shows no ⊘, no „N reguł nie zadziała” and no amber „0×”" (no „⊘”, no „nie zadziała”, no element with the class `warning`, all counts 0) | an amber „0×” made by a style of the count itself (the rule list's own CSS rules use `var(--warning)` without the `.warning` class, e.g. `.rule-reason`, so the class check does not catch it — R4) | pair rewritten |

## Pairs I rewrote (for the human to accept at the merge)

None added. Seven rewritten; each now covers only the part no test holds:

- **D-294** — complies: a group folded on Programy unfolded after a reload; a save of the game state carrying nothing of folding · violates: folding kept in the browser's storage; a field of folding in the saved game state. (Intro: "For the folding going with a reload and staying out of the saved game state, …")
- **D-295** — complies: a folded group under „Temperatura poniżej 35” showing that condition in its header beside its name and „3 reguły” · violates: the condition left out of the header of a folded group.
- **D-298** — complies: the button made with the shared button beside a program of two groups · violates: „zwiń wszystkie” drawn as underlined text. (Intro: "For the button being a plain button, …")
- **D-299** — complies: the pick of actions of a game with every action discovered standing whole without scrolling, with no field above its cells · violates: a search field above the cells of the actions; a row „ostatnio” above the grid of targets.
- **D-300** — complies: „Zapas poniżej 8 · Patyk” with nothing beside it during a map run, in its row and in the rule panel · violates: „teraz 3” beside a condition in a rule's row, or in the rule panel during a map run.
- **D-304** — complies: „+ dodaj grupę” at the foot of the list, under the last rule group, also when that group is folded · violates: „+ dodaj grupę” above the rule groups, or on one line with „+ reguła” of the last group.
- **D-305** — complies: a rule that has not fired in the map run showing „Wykonano 0×” as any count does · violates: a style rule of the count giving „Wykonano 0×” the colour `warning`.

## Choices, with the way rejected

- **No line in `tests/view/chronicle-entries.test.mjs`**, though the *Change* names it. Its cases check chronicle entries built from hand-written copies („Przesunięto regułę 1.3 na 2.1”). D-292's sentence is about what the program editor shows, and D-297's about what an arrow does. If the editor numbered rules across the whole program, or „↓” did something else, these cases would still pass. The comments citing D-292 and D-297 (lines 1, 4, 123) stay as they are. Rejected: marking them because they use the same numbers — that would be a mention, not a hold. Cost if wrong: two decisions would miss a test that holds them, but both are held in whole elsewhere anyway.
- **Incidental use not marked.** A case that only clicks „+ dodaj grupę” or reads a heading such as „Reguła 1.2” to find its target (e.g. `tests/view/rule-editor.test.mjs:461`, `:940`, `tests/view/program-panel.test.mjs:414`, `tests/view/account-screen.test.mjs:2328`) gets no line. This follows how earlier slices treated D-124. Rejected: a line at every case that would break with the sentence — dozens of lines that tell a reviewer nothing.
- **Quotation length shows the part held.** When a case holds only the first clause, the quotation stops there; it runs to the end when the case holds the end too (e.g. D-297 "„↑” is disabled only …" only at the cases about disabled arrows).
- **D-305 judged as held in part, not whole** (R4): the test checks for the class `warning` and does not hold "no amber" as such.

## Problems and remarks

- **Title says more than the test checks** (seen, not a decision wording issue under R3): `tests/view/rule-editor.test.mjs:583` "a folded group shows its header alone, with name, condition and number of rules" asserts the name and the number of rules, but not the condition. So D-295's "its condition" keeps a pair. I changed nothing in the test, as the task requires.
- R3 remarks on decision wording: none. The wording of D-292…D-305 agrees with the code I read (`src/browser/view/rule-list.tsx:600-751`).

## Reaches beyond the dispatch

- `src/browser/view/rule-list.tsx:600-751` and `src/browser/styles.css` (grep for `warning`, lines around 1105-1121) — to see how the folded header and the „+ dodaj grupę” button are built and how amber is applied, for the D-295, D-304 and D-305 judgments.
- `tests/view/rule-editor.test.mjs`, `tests/view/program-panel.test.mjs`, `tests/view/run-screen.test.mjs:670-729`, `tests/view/account-screen.test.mjs:2310-2349` — candidate tests found by content search.
- `.the-way/elements/common/foundation_check.py` (grep for `decision:`) — to confirm it checks quotations, before the positive control.
- `the author's git rules, outside the repository` — the user's rule file before committing.

## Working copies

- `.runs/executor-40/` (test logs and exit codes of the four focused runs) — removed before returning. A first capture of the base check was written by mistake to `.runs/fc-base-40.txt` and removed at once. No worktree or clone was made.

## Unread material

- `tests/view/program-editor.test.mjs` (≈1770 lines): read lines 1-160, 926-1004, 1425-1464, 1570-1765, plus a grep of every test name and every decision line. Not read whole, as the handoff asks for big test files.
- `tests/view/rule-editor.test.mjs` (≈2000 lines): read 1-628, 680-704, 850-1131, 1472-1681, plus a grep of all test names. Not read whole; what I skipped covers drag, focus and panel-placement cases, judged by title as not about my decisions.
- `tests/view/program-panel.test.mjs` (≈1850 lines): read 1-215 and 300-549, plus a grep of test names and folding terms.
- `.the-way/elements/decisions/template.md`: read 105-264 (the plan's ranges 111-127, 162-166, 220-260 included).
- `.the-way/elements/decisions/skill/SKILL.md`: read whole; did not follow `read.md` and `decide_entry.md`. Those cover writing a new entry; here only *Verification* changes, which the "Draft" section covers.
- Everything else the dispatch names was read whole.

## Searches not found or unclear

- No test for where „+ dodaj grupę” stands (searched `dodaj grupę` across `tests/`).
- No test for a „teraz” or current value during a map run, in a row or in the panel (searched `teraz`, `rule-condition` across `tests/view`).
- No test for folding kept out of browser storage or the saved game state (searched `createFolding`, `folding`, `Zwiń grupę`, `rule-list-rules` across `tests/`).
- No test checks what kind of button „zwiń wszystkie” is (only its text).
- Run with no flag, `foundation_check.py` printed only `0 errors`, no list of decisions `held by nothing`. Since none of mine has nothing holding it, this does not affect the slice.
