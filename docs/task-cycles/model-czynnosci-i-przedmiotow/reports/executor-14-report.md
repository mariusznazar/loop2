done with concerns

# Executor 14 — the rule panel, the rule's row, „Teraz” and the chronicle show the verb with its target

Base `f8ad4bd332e2cc39956d4e9ac5914a6b64648011`; one commit on `task/model-czynnosci-i-przedmiotow`: `9e9bb706`. The worktree is clean.

The concern: the walk of `walkthrough.md` in the running game was not made (see "Walk"). Everything else of the slice stands.

## Files changed

| File | Added/removed | Part | Why |
|---|---|---|---|
| `src/browser/view/rule-panel.tsx` | +50 / -18 | (1) one-time for the model | A pick in the target field goes to `withActionItem` for any verb that names an item, and the times beside the cells come from one function (`cellTimes`) that reads the verb's data, so a later item of the same sort needs no change here. The closed action field takes `actionFieldValue`. |
| `src/browser/view/rule-list.tsx` | +7 / -1 | (1) one-time for the model | The row's time takes the action's item, so any verb whose time its target gives shows it. |
| `tests/view/item-verb-panel.test.mjs` | +361 / -0 | (1) one-time for the model, mostly | Six cases on the document imitation. They use the bandage for the numbers the decisions give („2 mchy”, „10 min”) and a second item laid over the data (`ITEMS.splint`, taken away after) for the targets, so they show that a second item needs no code. Cases that name the bandage alone are the part (2) of the file. |
| `tests/view/now-lines.test.mjs` | +56 / -2 | (2) the bandage alone | Two rules with the bandage added to the test's program and one case; no code of „Teraz” changed, since `actionSentence` already reads the item. |
| `tests/view/chronicle-entries.test.mjs` | +58 / -1 | (2) the bandage alone | Two cases with the bandage (an added or changed rule, and the start of an action); no code of the chronicle changed. |

No icon, foundation entry or guideline file changed.

## Checks

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/item-verb-panel.test.mjs`, before the code | 1 | the failing run: 5 of 6 cases failed on their assertions (closed field read „Wytwórz”; no time beside the craft cell; a pick of the target committed nothing; no time beside the target or in the row). The case of the pick of actions passed: it holds a behaviour of Slice 13 and guards it. |
| `npm test -- tests/view/item-verb-panel.test.mjs`, after the code | 0 | 6 of 6 pass |
| `npm test -- tests/view/now-lines.test.mjs` | 0 | 10 of 10 pass |
| `npm test -- tests/view/chronicle-entries.test.mjs` | 0 | 15 of 15 pass |
| `npm test -- tests/quality/test_function_and_file_size.py` | 0 | OK |
| `node tests/quality/eslint-size-rules.mjs` | 0 | "0 functions and files over a threshold in 343 files" (D-425 held; `RulePanelView` was not made longer) |
| `npm run typecheck` | 0 | clean |
| ESLint on the five changed files | 0 | no output |
| `npx prettier --check` on the five changed files | 0 | all formatted |
| `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` | 1 | one error only: `tests/view/rule-editor.test.mjs:1528 the quotation stands in no binding sentence of D-290` (Slice 15's). No error comes from a file I changed. I also ran it without the flag: the same one error. |
| `npm test -- tests/view/rule-editor.test.mjs` (read-only, for my own code) | 1 | 75 pass, 1 fails: „the actions stand in the groups Ruch, Zbieranie, Ogień, Żywność i walka…” expects four groups and the pick has five („Wytwarzanie”, from the data of Slices 12-13). It is Slice 15's case (this file); not changed, not made to pass. |
| `npm test -- tests/view/program-panel.test.mjs` and `tests/view/program-editor.test.mjs` | 0 | 60 and 63 pass |

Mutation seen for the two tests whose code already held the behaviour (now-lines, chronicle-entries): I made `actionSentence` in `program-editor.ts` drop the item for a moment; the new case of `now-lines.test.mjs` and the two of `chronicle-entries.test.mjs` failed; I restored the file with `git checkout -- src/browser/view/program-editor.ts` (the file is not in the commit).

## Own-work check

- Requirement most likely unmet: an action field and a time that still read right for every verb that names a resource or nothing (the change of `FieldRow` and `PickGrid` touches every pick). Check: the existing 76 cases of `rule-editor.test.mjs` (the value „Zapal — ognisko (2 patyki, 10 energii natury)” with „5 min”, the times „10 min”, „40 min”, „tura”, none at „Wędruj”, the six-act acceptance case). Result: all pass but the one of Slice 15 named above.
- Second: a time of a „Wytwórz” target that follows the character of the map run. The closed-field case runs also on a game in a map run (`runningGame`); it gives „10 min” for a character with no skills. A character with a skill that changes the minutes of „Wytwórz” is not checked here: `itemTargetTime` (Slice 13) holds that and its case is in `program-editor.test.mjs`.
- Mutations in the head: the time of every cell taken from the held target (caught: the two targets give „10 min” and „15 min”); a time beside the cells of „Opatrz” (caught: none expected); a pick of the target handed to the function of a resource (caught: no commit); the held target committing (caught); the row without the item (caught).

## Walk (`walkthrough.md`)

The change alters what the user sees: the action field of the rule panel, the cells of its target pick, the row of a rule, and the words of „Teraz”, „Potem” and the chronicle. The walk in the running game was **not made**. The handoff says a state check by code and tests is what the plan asks for this slice. Also, to see the panel with the bandage in the running game a player's map run has to gather moss until the bandage is in the Understanding, and that is a long play, not a state the slice builds. So every case is unchecked, with this reason: the rule panel and row on the document imitation (the cases above); the real focus ring, the look and the move of the focus in a real browser stay the browser check's (D-88, D-264). If the orchestrator wants the walk, the way is `.claude/skills/loop2-play/SKILL.md`; I did not start the game. What I did not check: the screen in a real browser; the cell of „Opatrz” and of „Wytwórz” in the pick of actions in a browser. Side observation: none.

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/walkthrough.md` (read whole, section 6 of the method names it) and `.claude/skills/loop2-play/SKILL.md` lines 1-80 (to judge whether the walk can be made).
- `src/browser/view/item-target-pick.ts`, `src/browser/view/now-lines.ts`, `src/browser/view/chronicle-entries.ts` (parts), `tests/view/program-editor.test.mjs` (the cases of Slice 13), `tests/view/chronicle.test.mjs` (the shape of the event), `tests/sim/understanding-fixture.mjs`, `src/browser/sim/data/items.ts` and `actions.ts` (the rows of the bandage, „Wytwórz” and „Opatrz”): to find what Slice 13 left to call (`withActionItem`, `actionFieldValue`, `actionTime(…, item)`, `itemTargetTime`, `namesItem`) and what the existing code of „Teraz” and the chronicle already does. The plan's Change names none of these files; none was changed.
- `foundations/decisions.md`: D-335, D-443 headings only, to pick the quotation of a `decision:` line (D-335 and D-443 were not read whole, see below).

## Choices

- The time beside a cell comes from one function, `cellTimes` in `rule-panel.tsx`, and `PickGrid` gets `timeOf` in place of the whole game state. Rejected: a second branch inside `PickGrid` with the state and the held verb handed in (more props on a function already holding many). Cost if wrong: small, one function.
- `rule-list.tsx` writes `namesItem(each.action) ? each.action.item : undefined` inline, and `rule-panel.tsx` has the same in `itemOf`. Rejected: one exported helper in `program-editor.ts`, which is outside this slice's *Change*. Cost: two lines of repetition; a later slice may fold them.
- The new test file names the bandage's numbers as literals („2 mchy”, „10 min”), as the decisions D-293 and D-363 give them, and takes a second item (`splint`) from a change of the data alone, as `program-editor.test.mjs` does. Cost if the bandage's recipe changes: the literals of five cases change with it.
- `now-lines.test.mjs`: two rules added to the end of the second group of the shared `PROGRAM`, so no existing expectation moved.

## Problems as observed

- `tests/view/rule-editor.test.mjs:1527` fails and `foundation_check` lists `rule-editor.test.mjs:1528` (D-290 quotation): Slice 15's, as the handoff says. Evidence above.
- A hook of the session (`rules-on-demand`) refused my first `python` heredoc and my first `git commit` once each until I had read its rule files; nothing to do with the repository.

## Plan against code

No mismatch: everything the section expects (`withActionItem`, `actionFieldValue`, `actionTime` with an item, `itemTargetTime`, the module of targets) was there. The line `Depends on … Foundation entries rows 6, 7` read as written in D-293 and D-363 in the worktree.

## Unread material

- `foundations/decisions.md` D-443 (only found its heading, line 8155, and used a sentence of it as the quotation: the quotation is the one `program-editor.test.mjs` already holds and the foundation check passes it), D-335 (heading and quotation only; the quotation is the one `now-lines.test.mjs` already held), D-425 (lines 841-859: not opened; the size result is the script's), `foundations/part_map.md:3-32` (not opened; the files changed are the ones the plan names and all stand in `browser-view`).
- `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:36-41` and `spec.md:244-257`: read in the handoff's copy, not opened as files.
- `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`: read whole (the two large ones in pages).
- `tests/view/rule-editor.test.mjs`: read lines 1-170, 1000-1200 and 1480-1739; the rest not read.

## Searches not found or unclear

none

## Working copies

None made: no worktree, clone, script or screenshot. Two scratch output files of `foundation_check` stood directly under `.runs/` and were removed before the commit (`.runs/executor-14-fc.txt`, `.runs/executor-14-fc2.txt`). The directory `.runs/executor-14/` was never created.
