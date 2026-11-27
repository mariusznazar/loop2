done with concerns

# Executor-11 report — Slice 11: the styleguide's rules for the gear

## Commits

- `2c53300a` — `docs: :memo:` the styleguide's rule for the screen Postać holds the section „Wyposażenie” …; one file, `guidelines/styleguide-browser-view.md`, +98 / −20 lines. Slice base `90ff1100`.

## What the change holds

In `guidelines/styleguide-browser-view.md`:

- Rule "The screen Postać": the *Decision* list gets D-454, D-461, D-462, D-288, D-289, D-291 (D-445, D-446, D-287 and D-44 stood there already); *Good* and *Bad* rewritten for the new layout. The old bullet "Lewy obszar, u góry: ludzik" and "Obok ludzika (D-446)" are changed: the name, generation/archetype line and resurrection line stand at the top of the left area apart from the figure (F14), the figure stands in the section at twice the band's size (F15). New bullets: the section „Wyposażenie” (heading in `text-label`, always present from the creation of the character, in the phone layout above „Umiejętności” because the left area stands over the right) with the two sentences (the earning loop's one above the tiles, D-462; the unfinished manual map run's one under the heading with the tiles disabled, D-287); the figure; the eight square tiles and their roles; the pick under the tiles (heading „{miejsce}: {rzecz}” / „{miejsce}: nic”, pick cells with item icon, name and pieces in the chest, „Zdejmij” with no icon, a greyed cell with its reason, the sentence of an empty pick); the tile as a shared control and the touch target of the phone layout.
- Rule "States of shared controls": D-461 in *Decision*; the tile is a new entry among the controls that depart from the list of states (default, hover, visible focus, selected, disabled, empty applying; error and loading not applying, with reasons); one clause added to the rule's *Good*.
- Rule "The body row of a map run": the line of gear under the backpack line (D-311, D-455), its four forms from D-311; D-455 in *Decision*; *Good* and *Bad* extended.
- No role, token value or meaning of a role was added; the table `## Roles` is untouched.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (after `git add` of the file) | 1 | 2 errors, both `decision:` lines of `tests/view/character-screen.test.mjs` (lines 134 and 400, quoting D-446 and D-445) — the kind Slice 18 clears. Not mine: the same 2 errors appear with the file at its base content (run with the base file restored, exit 1, same 2 lines). No error names the styleguide. The handoff counted 14; 2 stand now. |
| `rg -U "Wyposażenie" guidelines/styleguide-browser-view.md -c` | 0 | 9 lines match |
| `npx prettier --check guidelines/styleguide-browser-view.md` | 1 | Informational: prettier's reformatting would rewrite the table of roles too; the file is not in the quality test's `PRETTIER_PATTERNS` (`tests/quality/test_quality_invariants.py:18-26`) and `guidelines/coding.md` / `guidelines/testing.md` warn the same way, so I left the file as written (prettier's `--write` was run once and reverted before the commit; the diff holds only my text). |

The full suite and `npm test` were not run (boundary). Tests that fail on the slice base: none were run on it — the slice changes no code, and no test reads the styleguide; the foundation check's 2 errors are the same on the base (above).

## Own-work check

- Requirement most likely unmet: "No new role, token value or meaning of a role" (Goal) against roles chosen for the tile. Check: every role named in the new text is a row of the table `## Roles` and is used in its meaning — `text-label` (pale name of a slot: name of a field), `text-strong` (item icon with no text beside it, heading of the pick), `text-secondary` (sentences, reasons), `text-disabled` (disabled tile), `selected` (chosen tile frame), `control-border`, `highlight` (hover). Found: one place where the use extends a list rather than a meaning — see concern 1.
- Second check: each item of the Goal against the text — section under the frame headed as „Umiejętności” ✓, phone layout above „Umiejętności” ✓, figure twice the size in the middle ✓, name/line/resurrection at the top ✓, square tiles with icon or pale name ✓, chosen tile framed as a chosen pick cell ✓, the pick with its headings, „Zdejmij” with no icon, greyed cell with reason ✓, the two sentences ✓, touch target ✓, the tile as a shared control ✓, Decision list (F14 D-446, F15 D-445, F16 D-287, F20 D-44, F23 D-454, F30 D-461, F31 D-462) ✓, Good/Bad ✓, the tile in "States of shared controls" ✓, the gear line in "The body row of a map run" ✓.
- `walkthrough.md` / `ui_check.md`: not read; the slice changes a guidelines file and no behaviour or screen a user sees (the screens come in Slices 15–20). Walk: alters none.

## Choices (the way rejected, cost if wrong)

1. Item icon on a tile in `text-strong` (D-43's "where no text stands beside it"). Rejected: `text`. Cost: Slice 16's CSS and tests change one colour.
2. Pale name of an empty slot in `text-label` — "pale" comes from the role, no opacity. Rejected: `text-disabled` (says "cannot be used now", but an empty slot can be chosen) and `text-secondary` (a note). Cost as above.
3. Chosen tile: frame in `selected` only, content keeps its role (so a chosen empty slot keeps its pale name). Rejected: content to `text-strong` as a chosen pick cell has — a chosen empty slot would look filled.
4. Tile state "empty" is read as applying: an empty slot is the tile with the pale name, like an empty field with a hint in `text-label`. Rejected: marking empty as not applying. Slice 17's page then shows the pale-name tile as that state.
5. The heading of the pick „{miejsce}: {rzecz}” in `text-strong`; the pieces number beside an item's name in the role of the name (`text`). Rejected: the number in `text-secondary`. Cost: one rule line.
6. Touching another tile moves the choice to it (one chosen at a time) — the task says only that a second touch of the chosen tile closes the pick.
7. Pick cells' columns left to the screen's stylesheet; the rule only requires that texts break within the cell and nothing scrolls sideways.

## Concerns

1. The table `## Roles` row of `text-strong` and D-40 name the icons that stand in `text-strong` with no text beside them (head badge, flying icon, map icons, discovery plaque). The tile's item icon is one more such place; I did not extend the table or D-40 (the slice forbids a new meaning, and the meaning — "a name or value looked at first" — holds it). If the reviewer reads the enumeration as closed, D-40 and the table row need the tile icon added in a foundation step.
2. A tile holding an item has the item's name as its accessible name (task, Slice 16's Goal) and no slot name, so a screen reader hears „patyk” with no „Ręka główna”; the pick's heading names the slot after the tile is chosen. I did not settle it in the text.
3. The gear line of the screen of a map run: I wrote "the same text, role and size as the backpack line" without naming the role — the backpack line's CSS (`.backpack-text` in `src/browser/run-screen.css:692`) sets none, it inherits.

## Reaches beyond the dispatch

- `.the-way/product-guidelines/styleguide/template.md` (read whole): the method file `SKILL.md` names it for the writer of the file; for the required form and the fields of a rule.
- `foundations/decisions.md` D-451–D-460, D-463 (read whole): to cite decisions correctly and check what the gear is (D-455, D-454).
- `src/browser/run-screen.css:685-695`: to check the role of the backpack line.
- `docs/task-cycles/wyposazenie-postaci/plan.md` Slices 15–20 and the Choices table (grepped, then read the slices' Goals): to keep the rule consistent with the controls the later slices build.
- `tests/quality/test_quality_invariants.py:18-26` and a grep for the styleguide's file name in the repo: to learn whether a test reads the file (none does but the foundation check).

## Working copies

- `.runs/executor-11/` (copies of the file for the prettier and base comparison) and `.runs/executor-11-fc.txt` stood in the worktree's ignored `.runs/`; removed by full path before returning. No worktree or clone was made.

## Unread material

- `guidelines/coding.md` and `guidelines/testing.md` (named in the slice's *Read*): not read whole — the slice changes no code and no test; I grepped `coding.md` for rules about the styleguide / guidelines files and found none that bear on a prose file.
- `foundations/decisions.md` D-38 and D-40 read; D-199, D-288, D-289, D-290, D-291, D-396 cited from the styleguide's own text and the task, not re-read in the log.
- `foundations/part_map.md:140-158` read; nothing in it changes for this slice.
- `task_frozen.md` lines 38–62, 102–111, 155–170, 256–289 read; line 112 onward of that block only as far as shown.
- Walkthrough and ui_check files: not read (see own-work check).

## Searches not found or unclear

- none — except that the handoff states 14 foundation-check errors and 2 stand now (earlier slices evidently cleared 12); unclear which slices, not needed.
