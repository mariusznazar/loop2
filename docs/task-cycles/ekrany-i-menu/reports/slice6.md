# Slice 6 — The list of programs in React

**Status:** done
**Branch:** `task/ekrany-i-menu`
**Commits:** `6dc4819` feat: :sparkles: add the list of programs in React with its actions and its name field (parent `edb2862`)
**Worktree:** `C:/Storage/repos/loop2-wt/ekrany-i-menu`

## What changed and why

| File | Change | Lines |
|---|---|---|
| `src/browser/view/program-list.tsx` | new: `createProgramList` (boundary, D-36) and `ProgramListView` | +203 |
| `tests/view/program-list.test.mjs` | new: 10 cases on the jsdom harness (`page-document.mjs`, D-264) | +201 |
| `src/browser/view/program-panel.ts` | `NAME_MESSAGES` now exported, nothing else | +1 −1 |
| `src/browser/styles.css` | the list's item look: `.program-list-items`, `.program-list-item`, `[aria-current="page"]`, hover | +29 |

- The list draws the player's programs in list order. Each is an `<a>` to `screenAddress({ kind: "program", programId })`, that is `#/programy/{n}` by the program's number, not its place (D-165).
- The chosen program (from `chosenId`) gets `aria-current="page"`. Nothing else is marked.
- Actions: „Nowy program” calls `onCreate`. „Zmień nazwę” opens the field „Nazwa programu” for the chosen program with its current name, and a second press closes it without a call. „Usuń” is the destructive `ReactButton` of the chosen program; it is disabled while the list holds one program (D-167).
- The name field uses `programName(programs, text, chosenId)` from `sim/programs.ts`, so the chosen program's own name is not counted as taken. A refusal shows `NAME_MESSAGES[reason]` as the field's error (D-169). „Zapisz” hands the raw text to `onRename` only when the rule takes it, then closes the field and focuses „Zmień nazwę”.
- The field leaves when `chosenId` changes (D-166 names the field as the program's own).
- Look: the item rules use tokens only (`text`, `text-strong`, `selected`, `highlight`, `--bar-width`, `--space-2xs`, `--space-s`). The action row and the name row reuse the existing classes `program-actions` and `program-name` from the program panel, so the two look the same.

Rejected alternatives:
- Focusing the field in the click handler: the field does not exist yet at that moment. I used `useLayoutEffect` keyed on the field's state, as `account-card.tsx` does for focus.
- Resetting the field through an effect when the chosen program changes: D-267 keeps effects for synchronising with systems outside React. I used the React pattern of adjusting state during render instead.
- Storing the error message in state: it is computed from the text on each render, so it cannot go stale.
- Disabling „Zapisz” while the name is refused: the DOM panel leaves it enabled and ignores the click, so I did the same.

## Checks

Each run was made from the worktree root. Exit codes are from the shell.

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/program-list.test.mjs` (red, stub `createProgramList` that draws nothing) | 1 | Failed on assertions: the first case `expected [...] got []`; the „Usuń” case first failed with a TypeError, so I added `assert.ok` for the button and reran (exit 1, `Usuń stands beside the one program: expected a true value, got undefined`). Output: `…\scratchpad\s6_red2.txt` |
| `npm test -- tests/view/program-list.test.mjs` (green) | 0 | 10 of 10 pass |
| `npm test -- tests/view/program-panel.test.mjs` | 0 | 22 of 22 pass (after exporting `NAME_MESSAGES`) |
| `npm run typecheck` | 0 | pass |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | pass |
| `npm test -- tests/quality/test_quality_invariants.py` (first run) | 1 | `test_prettier_source_format`: prettier warned about the two new files |
| `node_modules/.bin/prettier --no-config --no-editorconfig --write` on the two new files, then `--check` on all four changed files | 0 | formatted |
| `npm test -- tests/quality/test_quality_invariants.py` (after formatting) | 0 | 5 of 5 pass |
| `npm test -- tests/view/program-list.test.mjs` after the own-name mutation (see below) | 1 | the mutant failed as expected; restored, see below |
| restore of the mutated line, checked with `grep -n "programName(programs" src/browser/view/program-list.tsx` | 0 | line 90 back to `programName(programs, naming.value, naming.programId)`; no test rerun after the restore, the last green run of the list test is the one before the mutation (exit 0) |

Not run:
- The full gate `npm test` without a file argument: the handoff reserves it for the orchestrator.
- `python -B .the-way/elements/common/foundation_check.py`: the slice's Checks do not name it.
- The screenshot check of the running product: see the ui_check section.

## Own-work check

- **Requirement most likely missed:** a program keeps its own name when it is renamed, letter case changed. The name rule must exclude the program's own number. Without that, „Las nocą” renamed to „las nocą” is refused as taken.
- **Check:** case „a chosen program keeps its own name, letter case changed, without a refusal” in `tests/view/program-list.test.mjs`. It types „las nocą” for program 3 and expects no message and `onRename(3, "las nocą")`.
- **Result:** passes on the committed code. Mutation: `programName(programs, naming.value, naming.programId)` changed to `programName(programs, naming.value)`. The case failed (exit 1, `✖ a chosen program keeps its own name, letter case changed, without a refusal`). The file was restored from a copy, and `git status` shows it identical to the commit.

## ui_check

- The list is not placed on any page in this slice (Slice 10 places it, per the handoff), so the settled route in `.claude/skills/loop2-play/SKILL.md` has no screen to show. I did not read that skill.
- **Screenshot: unchecked.** Reason: the component is not reachable on the page yet.
- The states checked in code instead: the chosen item's `aria-current`, „Usuń” disabled beside one program, the name field's error message in its error state (`.input-field-message`, styled `warning` at `src/browser/styles.css:383`), and the field leaving when another program is chosen.

## Reaches beyond the handoff

- `src/browser/view/screen-address.ts`: read whole. The link address comes from `screenAddress`, and I needed to confirm the `program` kind writes `#/programy/{n}`.
- `src/browser/view/program-panel.ts`: read lines 1–130, 170–300 and 330–400. The first three read the messages and the name rule, the second the name field's behaviour, the third the rename, delete and save handlers that the list copies.
- `src/browser/view/menu-bar.tsx` and `src/browser/view/character-screen.tsx`: read as boundaries to mirror. The handoff named them.
- `tests/view/character-screen.test.mjs` lines 1–110 and `tests/view/menu-bar.test.mjs` lines 1–40: harness use. The handoff named the files, I read only the headers.
- `tests/view/page-document.mjs`: read the exports and the first 215 lines (named in the handoff).
- `src/browser/styles.css` lines 75–200, 530–600 and 1000–1090: existing menu, program and screen styles, to match tokens and class names.
- `guidelines/styleguide-browser-view.md`: read whole (named), in three pieces.

## Mismatches of plan and code

- None that change the slice's shape. The plan's Change list is what I changed.
- Class name: the DOM program panel already uses `program-list` for its select row (`program-panel.ts`, and `.program-list` at `styles.css:538`). I did not reuse that name. The new list uses `program-list-view`, `program-list-items` and `program-list-item`. Slice 10 should keep these apart when both render on the same page.
- The plan's trust boundary answer is "no". The list never reads the address fragment. It only writes links from numbers, so no crafted-fragment test was needed.

## Searches not found or unclear

- Whether the list's states belong on the kitchen-sink page. The styleguide's kitchen-sink rule lists shared controls and the menu parts, not the list of programs, and the list is a screen part, not a shared control. I did not add it to the kitchen-sink page. Decision for the orchestrator.
- Whether Enter in the name field should save. The DOM panel does nothing on Enter, since there is no form. The React list matches it. The spec does not say.
- The name rule's refusal messages are shown from `NAME_MESSAGES` as the spec requires. The test asserts the literal text (`Program o tej nazwie już istnieje.`, `Wpisz nazwę programu.`), not the imported constant.
- No searches came up empty for anything the slice needed.
