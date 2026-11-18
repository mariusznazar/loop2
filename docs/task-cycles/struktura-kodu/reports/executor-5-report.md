# Executor report — slice 5: ProgramPanelView divided under the threshold of a function

Status: **done**

## Commits

- `d7493a85` — `refactor: :recycle: divide ProgramPanelView under the threshold of a function, the head of a map run's copy with its name field as the component RunHead and the head of Programy as ProgramsHead of program-panel.tsx`, branch `task/struktura-kodu`, on base `e0cd12e5`. Author address shown by `git log -1 --format='%h %ae'`: the private address of the repository's user.

## Files changed

- `src/browser/view/program-panel.tsx`: +233 / −133 (one file; a reformat by the repository's Prettier options is included in that count).

## Checks

Each command with its exit code. Base = `e0cd12e5`, measured before any edit; changed = `d7493a85`.

| Command | Base | Changed |
|---|---|---|
| `node tests/quality/eslint-size-rules.mjs` | exit 0; reports `ProgramPanelView` at `program-panel.tsx:397`, 293 lines (plus five reports outside this slice) | exit 0; no report for `program-panel.tsx`; the five reports outside this slice remain (`kitchen-sink.tsx:956` file 890, `app.ts:248` `startApp` 449, `programs-entry.ts:81`, `programs-entry.ts:102`, `tests/transport.test.mjs:537`) |
| `npm run typecheck` | not run on base | exit 0 |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 src/browser/view/program-panel.tsx` | not run on base | exit 0 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/view/program-panel.tsx` | not run on base | exit 0 |
| `npm test -- tests/view/program-panel.test.mjs` | not run on base | exit 0 (60 of 60 pass) |
| `npm test -- tests/view/rule-signs.test.mjs` | not run on base | exit 0 (6 of 6) |
| `npm test -- tests/view/run-screen.test.mjs` | not run on base | exit 0 (21 of 21) |
| `npm test -- tests/view/end-question.test.mjs` | not run on base | exit 0 (17 of 17) |
| `npm test -- tests/view/previous-save.test.mjs` | not run on base | exit 0 (46 of 46) |
| `git diff -U0 \| grep "^[-+]export"` | — | no export line changed |
| Manual check in a real browser (D-88), steps in the next section | run | run, same result as base |

No test was written or changed; no style, token or test file was touched. The full suite was not run (the handoff forbids it for agents).

## Manual check in a real browser (D-88)

Run with Playwright CLI 0.1.22 (`playwright-cli`), following `.claude/skills/loop2-play/SKILL.md`. Each build got its own `npm run local` start and a new account at a made-up `example.test` address. The same composed state (`compose-state.mjs`) was sent on both. No Playwright MCP was used. No screenshot was taken or kept; `.playwright-cli/` was deleted after the run.

Steps and what the page showed, identical on the base build and on the changed build unless noted:

1. Mapy → „Skraj lasu” → „Wejdź: Agent” opens the screen of the map run; the list „Program:” starts on „Kopia w przejściu”, heading „Kopia: Program”.
2. „+ reguła” makes a change: the sentence „Niezapisane zmiany w kopii.” shows, and the rule panel opens under the new row.
3. Close the panel (× ), then „Zapisz jako nowy program”: the name field opens with the suggestion „Program 2” and takes the focus. Name typed „Kopia testowa”, „Zapisz”: message „Zapisano kopię jako nowy program „Kopia testowa””, heading „Kopia: Kopia testowa”, unsaved sentence gone, focus on the list „Program:” (base and changed).
4. Another „+ reguła”, then „Zapisz w programie”: message „Zapisano kopię w programie „Kopia testowa”” (base and changed). Focus after this step was recorded on the changed build only.
5. Another change, then „Zakończ”: the question „Zapisać, odrzucić, wrócić?” with „Zapisz”, „Odrzuć”, „Wróć” appears above the copy heading, with „Niezapisane zmiany w kopii.” (base and changed).
6. „Wróć” closes the question; picking „Program” on the list shows „Przełącz postać na ten program”; clicking it: „Przełączono postać na program „Program””, heading „Kopia: Program”, focus on the list (base and changed).
7. Programy → „Kopia testowa” → „Zmień nazwę” opens the name field with the old name; typed „Kopia zmieniona”, „Zapisz”: the heading and the list show the new name, focus on „Zmień nazwę” (base and changed).
8. „Usuń” with one program left: the button becomes disabled and the focus lands on the program panel's section, not on a control (base and changed; the same as before the change, pre-existing).
9. Two „Nowy program”, then „Usuń” with two programs left (button stays enabled): focus lands on the program panel's section again (base and changed; pre-existing).
10. Console on the changed build: 0 messages, no line starting `uncaught` or `saved-game-load`. On the base build the console was not read at the end; its first load showed the expected entries only (recorded in the session, not re-read).

What the check does not cover: a Tab walk through the whole screen, keyboard use of the list beyond the focus points above, the real mail step (not part of the screens), and the rule panel's own inputs beyond opening and closing it. "The copy renamed" in the slice's list: the page has no rename for the copy (the rename button is only for a saved program), so step 3 (save as a new program under a typed name) is the copy's rename I checked.

## How I divided the function

The verdict's cut was the head of the screen of a map run (the old `runHead`) as its own component, `RunHead`, in the same file. After that cut `ProgramPanelView` was still 203 lines, three over the threshold. So I cut once more: the head of the screen Programy (the sentence about a waiting map run and the saved program's name) became `ProgramsHead`, also in the same file. After the second cut the rule's run reports nothing for `program-panel.tsx`, and `ProgramPanelView` is under 200 lines by that run. I did not count its exact lines separately.

What stays in `ProgramPanelView`: the hooks (state, refs, `useSyncExternalStore`, the layout effect that moves the focus), the derivation of what is shown, the handlers that open, save, rename, delete and close (`openName`, `toggleRename`, `toggleSaveNew`, `saveName`, `changeName`, `remove`, `closePanel`), the rule panel and the rule list.

What moved, and how it is passed:

- `RunHead` gets the state, the list's value, `switchTo` (the id of the saved program the switch button goes to, or `null`), `copyShown`, `unsaved`, `endQuestion`, `naming`, `refusal`, `actions`, the four refs (`list`, `renameButton`, `deleteButton`, `nameInput`) and the handlers (`onRename`, `onSaveNew`, `onSaveName`, `onRemove`, `onNameChange`). It derives `owner` and `lacks` itself, since only its JSX used them.
- `ProgramsHead` gets `state` and `shown`, and derives the saved program it names itself.
- Neither component has a hook, and neither has an effect. The refs stay owned by `ProgramPanelView`, because its layout effect reads `nameInput` and the focus lines of the handlers read the others.

## Own-work check

Requirement most likely missed: moving buttons into a child component can break the focus that the parent's layout effect and the handlers set after a commit (the rule of hooks and effects, D-267, and the focus rule, D-88). Check: the browser walk above, steps 3, 6, 7, 8, 9, on both builds, comparing where the focus lands after each action. Result: the same on both builds at every point compared; no focus lost that the base build kept. The focus after the delete actions lands on the section, on both builds (a pre-existing gap, not introduced here). No check failed, so no rerun was needed.

## Choices

1. Refs passed down as props (`RefObject` props), not moved into `RunHead`. The layout effect in `ProgramPanelView` reads `nameInput`; moving the refs would have split that effect. Cost if wrong: none seen; the existing pattern (`buttonRef`, `selectRef`, `inputRef`) is the same.
2. `switchTo` derived in the parent as an id or `null`, instead of passing `switchStands` plus `shown`. The button's text and handler read the same id as before. Equivalent to the old condition.
3. `onNameChange` is `changeName` in the parent, which calls `setNaming({ ...naming, value })` only while the field is open. The old inline closure had the same guard implicitly (the field renders only when `naming` is set).
4. Prop named `value`, not `key`, since React reserves `key`.
5. The second cut (`ProgramsHead`) was needed; the alternative of moving the handlers into `RunHead` was rejected because the focus logic of the parent depends on them and on `nameInput`.

## Reaches beyond the handoff

- Read decision headings by Grep and the entry text by Read: `D-425` (`foundations/decisions.md:822`), `D-36` (`:551`), `D-267` (`:4268`), `D-88` (`:1055`), plus `D-89` only in passing (the same range).
- Read `foundations/invariants.md` ranges for the invariants named by the slice, and the whole section `function-and-file-size` (`:1408`), which the handoff did not name.
- Read `guidelines/styleguide-browser-view.md` whole (1175 lines, in two reads), because the slice's *Read* names it.
- Read the decision headings `D-417` to `D-420` only as they are cited by the play skill (`foundations/decisions.md:1523`, `:1589`, `:1604`, `:1619`); their text was not read in full.
- Ran `npm run local` twice, `playwright-cli` for the browser work, and `npm run local:stop` after each run.
- The first `git commit` was held once by the rules hook, which showed the git rules; the commit was retried with the same content.

## Unread material

- `.runs/task-cycles/struktura-kodu/plan.md`: not opened; the handoff copies slice 5 word for word, and the *Read* rows "Foundation entries row 1/row 2" are not in the handoff text, so those two rows were not read.
- `guidelines/testing.md`: not read; I wrote and changed no test.
- `task-cycle/change/ui_check.md`: not read; the change does not alter what a screen shows.
- `project-level/technology/reserved_choices.md`: not read; the work needed no language, framework or store to be chosen.
- `foundations/part_map.md`: not read; no file of a part was added or moved.
- `foundations/glossary.md`: read only lines 25-30 (`program`) and 180-184 (`copy`), not the entries as wholes beyond those lines; the entries end at the next `##` heading, which I did not reach.
- `foundations/decisions.md` `D-417` to `D-420`: headings only (see Reaches).

## Searches not found or unclear

- `Grep` for `^### (program|copy)\b` in `foundations/glossary.md` found nothing: the glossary uses `## program` and `## copy` headings. Found by line range instead.
- The handoff's line ranges in the decisions and invariants had moved (the cycle's note said so); found by heading. For example `D-267` is at `:4268` (plan said 4234), `D-88` at `:1055` (plan said 1021).
- The slice says "the copy renamed"; the page has no rename for the copy (see the manual check), so I read it as the save-as name, and say so there.
- A Bash `grep` for `^### D-36$` returned nothing, because the headings carry an em dash after the number; the Grep tool with a prefix match worked.

## Working copies

- No git worktree or clone was made. The `npm run local` starts used `.runs/local-start/` (the product's own database, kept until the next start by its design) and their ports; both starts were stopped with `npm run local:stop`.
- `.playwright-cli/` (session snapshots, console logs, the composed state, the state-sending script): created during the browser check, removed after it.
- `.runs/executor-5/` (working directory of this stage: build and test logs of the two runs, the typecheck, eslint, prettier and size logs): removed at the end of the stage, after this report was written; nothing in it is needed by the report, which holds the commands and exit codes.
