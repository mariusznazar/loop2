**Status: done with concerns**

# Slice 13 report: arrows in the header of a rule group

## Commits

- `48bbe99c` on branch `task/uklad-na-telefon` (base `e88be6b5`), author `the author's private address` from the conditional git config of the account (per the git rule). Not pushed.

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/rule-list.tsx` | 48 | 5 |
| `tests/view/rule-editor.test.mjs` | 95 | 8 |

The removed lines in the test file are only the old assertions of the two header cases and the keyboard case's old name and check, all replaced by the D-288 versions.

## What the change does

- `GroupHeader` (in `rule-list.tsx`) draws „↑” and „↓” as shared `ReactButton`s, labelled „Grupa w górę” and „Grupa w dół”, disabled by `groupArrows(program, groupIndex)` from Slice 12. They stand before the fold button and the „✕”, in every layout; a folded group keeps them.
- `RuleListView` gains `moveGroupAt(index, offset)`: it calls `moveGroup`, commits the whole new program and hands `{ kind: "group", groupId }` as the move hint, with focus keys `group:<id>:up|down|open` so focus stays on the arrow the player pressed.
- Test changes in `tests/view/rule-editor.test.mjs`: the case "a row has „↑”, „↓” and the destructive „Usuń”, and a header has no arrows" now asserts the header holds „↑”, „↓” and „✕”. The case "the buttons of an old „Dodaj regułę”… and the arrows of a group are gone" now asserts the labelled arrows exist. The keyboard case is renamed "arrow keys on a header commit nothing; a group moves by its „↑” and „↓” buttons" and keeps its assertion. Five new cases: the header's arrows and their names; the state at the first, last and a single group, and in a folded group; „↓” and „↑” on a header commit the swapped program with the group hint.

## Checks (command and exit code)

Logs are in `.runs/slice-13`.

| Check | Run | Exit | Result | Log |
|---|---|---|---|---|
| `npm test -- tests/view/rule-editor.test.mjs` | before the change (tests written first) | 1 | 80 cases, 74 pass, **6 fail**: the 5 new cases and the modified header case | `slice-13-red.log` |
| `npm test -- tests/view/rule-editor.test.mjs` | after the change | 0 | 80 of 80 pass | `slice-13-green2.log` |
| `npm test -- tests/view/program-panel.test.mjs` | after the change | 0 | 60 of 60 pass | `slice-13-panel.log` |
| `npm test -- tests/quality/test_function_and_file_size.py` | first run | 0 | 2 tests OK | `slice-13-size.log` |
| `npm test -- tests/quality/test_function_and_file_size.py` | rerun after formatting | 0 | 2 tests OK | `slice-13-size2.log` |
| `npm test -- tests/quality/test_quality_invariants.py` | first run | 1 | `test_prettier_source_format` failed on `tests/view/rule-editor.test.mjs` (my lines) | `slice-13-quality.log` |
| `node node_modules/prettier/bin/prettier.cjs --write` on the two changed files, then `--check` | fix | 0 | "All matched files use Prettier code style!" | none |
| `npm test -- tests/quality/test_quality_invariants.py` | rerun | 0 | 8 tests OK | `slice-13-quality2.log` |
| `python -B .the-way/elements/common/foundation_check.py` | first run | 1 | 7 citations `the quotation does not begin a sentence of D-288` (my new citations quoted mid-sentence) | `slice-13-foundation.log` (overwritten) |
| `python -B .the-way/elements/common/foundation_check.py` | after the citation fix | 0 | "0 errors" | `slice-13-foundation.log` |

Not run, by the handoff's boundary: the full gate `npm test` with no argument; the browser walk and the screenshot (see the own-work check).

**One-line check result:** the five named checks pass (rule-editor 80 of 80, program-panel 60 of 60, size, quality invariants, foundation 0 errors) after two fixes of my own; the full gate is not run; the browser walk and screenshot are not performed.

## Own-work check (SKILL section 3)

- Requirement: D-288 — the header of every rule group carries „↑” and „↓” in both layouts, one place at a time, off on the first group for „↑” and on the last for „↓”, the edit handed as a move with the group's identity; the handle stays for the mouse.
- Check: the new and changed cases in `rule-editor.test.mjs` (states at first, middle, last and single group, folded header, edits and hints), with the red run before the change and the green run after it.
- Result: the arrows are missing before the change (red, 5 new cases fail on the missing buttons); present, with the right states and hints after it (green).
- A mutation check was not run (no mutation tool; I reasoned that flipping `groupArrows` would fail the state cases).
- Not checked here: how the header lays out with the arrows at 360 px (Slice 18's, per the handoff), and any real-browser rendering of the arrows. jsdom does not apply the layout (styleguide, "Two layouts and one threshold between them").

## Walkthrough and screenshot (walkthrough.md, ui_check.md)

- This change alters what the user sees (header arrows), so both methods apply. Neither was performed. The reason is in the handoff: the slice's *Checks* name only the test commands, and the handoff's boundary is to run only those. I read both methods and did not read `.claude/skills/loop2-play/SKILL.md`, the product's route to the running game. No screenshot exists, so none is shown and none is kept.

## Choices (with the way rejected and the cost if wrong)

1. Labels „Grupa w górę” and „Grupa w dół” for the group arrows. The first is the label that commit `2bf7d427` gave the group arrows before (found with `git log -S`); the second I chose to match it. Rejected: „W górę grupy”, which would read differently from the rule arrows' „W górę”. Cost if wrong: an accessible name, changed in one line; the tests read the names.
2. Header order: handle, number, name, condition, size, count, then „↑”, „↓”, the fold button and „✕”. Rejected: arrows after „✕”. Cost if wrong: layout only, which is Slice 18's.
3. The move function `moveGroupAt` sits in `RuleListView`, not in `GroupHeader`, while the arrow buttons sit in `GroupHeader`. The handoff asked for the header's arrows in the header's component; the edit, the commit and the focus keys belong to the list, which is the only place that commits. Rejected: a separate module for the move, a new file. Cost if wrong: `RuleListView` grows by about 13 lines; the size test passes (under 200).
4. The keyboard case: arrow keys on the header element itself still commit nothing; the group moves by Tab to its own „↑” or „↓” and Enter. This reads D-288's "in their header … the keyboard reaches them" as the buttons. Cost if wrong: the case's assertion is the only thing to change.

## Adaptations of section 4 and changed invariant tests

None. No invariant test changed (the slice writes none).

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `ui_check.md`, `walkthrough.md`: read whole, as the method names them.
- `src/browser/view/program-editor.ts`: lines 250–335 only (the rule and group arrow helpers).
- `src/browser/view/chronicle-entries.ts`: grep of `MoveHint` (line 48).
- `src/browser/view/controls/react-button.tsx`: grep of the props (`label`, `disabled`, `buttonRef`, `expanded`, `kind`).
- `git log -S "Grupa w górę"`: history, for the old label.
- `the author's rule file "git" of the instruction set`: read before the commit, as the user's instructions name it; a hook showed it and blocked the first commit call, the retry followed it.

## Working copies

- No worktree, clone or screenshot made.
- `.runs/slice-13/` holds the nine check logs listed above; these are check outputs that the report cites, not working copies, and they remain there for the orchestrator to remove.
- The commit-message file I used (`.runs/slice-13/commit-message.txt`) was removed after the commit.

## Unread material

- `.claude/skills/loop2-play/SKILL.md`: not read; the browser walk and the screenshot route. Reason: not performed (see above).
- `tests/view/group-arrows.test.mjs`: not read; named by the handoff's note 4 as holding Slice 12's tests. Reason: I used Slice 12's functions as read in `program-editor.ts` and did not need their tests.
- `tests/view/program-panel.test.mjs`: run only, not read whole (60 cases pass). Its arrow references were grepped (lines 867–905, 1989–2018), which concern rule rows, not headers.
- `src/browser/view/rule-drag.ts`: not read; the drag is unchanged by this slice.
- `src/browser/view/program-editor.ts`: read 250–335 only.
- `tests/view/rule-editor.test.mjs`: read 1–170, 380–420, 555–590 and the edited cases; the other 1,800 lines not read, since the slice's cases are the only ones it changes.
- `src/browser/view/controls/react-button.tsx`: props by grep and lines 1–73 only.
- All else named by the handoff was read whole: the five guideline files (`styleguide-browser-view.md` in three pages, `testing.md` in two), `src/browser/AGENTS.md`, D-288 (9341–9423), D-292, D-295, D-297, D-44 (5082–5098), D-425 (841–859), `foundations/glossary.md` 52–65, and `task.md` 33–36.

## Searches not found or unclear

- The accessible names of a group's arrows: no decision or styleguide passage names them. Searched: D-288, D-297, the styleguide's "Program editor" rule, and the git history of the old label. The "w dół" twin is not verified in history. Unclear; see Choice 1.
- The place the product's foundation settles for screenshots (`ui_check.md`): not searched, since no screenshot was made.
- The product's skill for the browser walk (`loop2-play`): not searched beyond its name in `AGENTS.md`, since the walk was not performed.

## Questions and concerns

1. **The browser walk and the screenshot are not done.** Options: (a) run them now through `loop2-play` (I would read that skill first; it adds a browser session and the Playwright tools); (b) defer to Slice 18, which checks this header at 360 px in a browser anyway, and to Slice 20. My recommendation is (b): the header's look in a browser is the layout question Slice 18 owns, and running the walk here would check the same header twice. The cost of (b): a desktop-layout fault in the arrows (for example, overlap in the header at 1280 px) would show up one slice later, not here. Which do you choose?
2. **Labels.** Do you accept „Grupa w górę” and „Grupa w dół” as the accessible names (Choice 1)? Cost of a change: one line and the tests' names.
3. **Keyboard reading.** Do you accept that the keyboard reaches a group's move through its own buttons, with arrow keys on the header itself doing nothing (Choice 4)? I read D-288 that way; the handoff's "the keyboard can reach" would be unmet if a key on the header were meant to move a group.
