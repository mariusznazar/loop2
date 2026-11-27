done with concerns

Slice 12 is committed as 778ea803. The browser walk and the screenshot check were not performed (the slice's Goal assigns the browser check to Slice 15); some guideline files were read after the code was written, see Unread material.

# Executor-12 report — Slice 12: the words of the gear on the screen of a map run

## Commits

- `778ea803` feat: the screen of a map run and its chronicle say „Zakłada {rzecz}” for „Załóż” (branch `task/wyposazenie-postaci`, base `2c53300a`). Committed by path, working tree clean after it.

## Files changed (from the base)

| File | Added | Removed |
|---|---|---|
| `src/browser/view/now-lines.ts` | 13 | 1 |
| `src/browser/view/chronicle-entries.ts` | 3 | 3 |
| `src/browser/view/combat-line.ts` | 8 | 0 |
| `src/browser/view/scene-picture.ts` | 4 | 1 |
| `tests/view/gear-words.test.mjs` (new) | 183 | 0 |
| total | 210 | 6 |

What changed:
- `now-lines.ts`: new exported `startWords(action)`: for `equip` it returns `ACTIONS.equip.status` + `ITEMS[item].name` („Zakłada patyk”), otherwise `actionSentence(action)`. The „Teraz” row for an action uses it. „Potem” is unchanged (still „Załóż — Opatrunek”).
- `chronicle-entries.ts`: the chronicle entry of an `activityStarted` rule uses `startWords`; the `actionSentence` import is dropped there because nothing else in the file used it.
- `combat-line.ts`: in `actionText`, a character action with `refill: true` first pushes `Mag ${GEAR_PLACES.mainHand.refill}` (“Mag bierze patyk z plecaka do ręki”), before the element of the character's action; an `equip` action pushes `Mag zakłada {item}` with no creature health, since it deals no damage.
- `scene-picture.ts`: `"equip"` added to `USES_BACKPACK`, so a gathering ending in the same reading as „Załóż” shows no scene effect (D-367).

## Checks (command and exit code)

- `npm test -- tests/view/gear-words.test.mjs` before the source change (test written first, on the base): exit 1, 5 of 5 tests failing on assertions (the equip words absent, the scene effect shown). Output in `.runs/executor-12/first-run.txt`.
- `npm test -- tests/view/gear-words.test.mjs` after the change: exit 0, pass 5, fail 0 (run twice; the second after prettier formatting of the file: exit 0, pass 5).
- `npm test -- tests/view/now-lines.test.mjs`: exit 0, pass 12, fail 0.
- `npm test -- tests/view/chronicle-entries.test.mjs`: exit 0, pass 15, fail 0.
- `npm test -- tests/view/combat-line.test.mjs`: exit 0, pass 2, fail 0.
- `npm test -- tests/view/scene-picture.test.mjs`: exit 0, pass 78, fail 0.
- `npm test -- tests/invariants/test_content_identifiers.py`: exit 0 (the runner prints no pass count).
- `npm run typecheck`: exit 0.
- Extra, the method's and the guidelines' checks: `npm test -- tests/quality/test_function_and_file_size.py`: exit 0, 2 tests OK (the size rule; `actionText` grew by 8 lines and still passes). `npx prettier --check` on the five changed files: exit 0 after `prettier --write` on the new test file (before, it warned on that file only).
- `python -B .the-way/elements/common/foundation_check.py`: exit 1, 2 errors, both of the known kind in `tests/view/character-screen.test.mjs` (lines 134 and 400, quoting D-446 and D-445). Neither is in a file of this slice; the count is down from the 14 the handoff recorded, as other slices repair them. I did not add any error: the new test file quotes D-147 and D-367 sentences that the check accepts.
- Not run: the whole suite (`npm test` without a file), as the boundary says; the walkthrough of `walkthrough.md` and the screenshot of `ui_check.md` (see Own-work check).

## Tests that fail on the base

- `tests/view/gear-words.test.mjs`: all 5 fail on the base (the written-first run, exit 1). The other focused tests passed after the change, so none fails after my change that passed on the base.

## Own-work check (SKILL.md section 3)

- Requirement: „Teraz” and the chronicle write „Zakłada {rzecz}” from the data (not from a typed string) and the refill is its own element before the strike. Check: `gear-words.test.mjs` cases 1–4, which assert the exact sentences of the row, the chronicle entry, the turn without creature health, and the refill element before the strike. Result: all pass after the change.
- Requirement: the scene treats „Załóż” as taking from the backpack, so a same-reading gathering gives no effect. Check: case 5 (a control hit shows an effect; the same reading with `equip` shows none). Result: pass. Mutation considered: removing `"equip"` from `USES_BACKPACK` makes case 5 fail (that was the base's failure).
- Walkthrough (`walkthrough.md`): this change does alter what a user sees, so the walk applies. Not performed: the slice's *Goal* says the check of these words in a real browser is Slice 15's, and I did not run the product. Verdict for the walk: unchecked, reason as given. The orchestrator should decide whether Slice 15 covers it or the walk is run here.
- Screenshot (`ui_check.md`): not made, for the same reason; no screenshot was taken, so none is kept.

## Choices made

- `startWords` lives in `now-lines.ts` beside `actionSentence`-using row code, and the chronicle imports it there (chronicle already imports `deathText` and `WAIT_TEXT` from `now-lines.ts`). Rejected: putting it in `program-editor.ts`, which would also change „Potem” or make a second import path for one function.
- The refill text is read from `GEAR_PLACES.mainHand.refill` (the place of `WIELDING_SLOT`); rejected a literal string, per the data-driven requirement.
- The `equip` line in a turn omits creature health (the action deals no damage, so the health the other lines show would be the creature's unchanged value; a line without it avoids implying a hit).
- Test case 5 quotes D-367 in a `decision:` line; the D-458 quote I first wrote was dropped, since no test asserts a sentence of D-458.

## Working copies

- None made as a worktree or clone. Output logs of the checks are in `.runs/executor-12/` (the first-run output, the per-check outputs, the foundation and prettier outputs). They are not working copies of a commit; they stay for the record and are ignored by git.

## Unread material

- `foundations/part_map.md` (browser-view, 3–32): not read.
- `foundations/decisions.md` D-147 (7084–7115) and D-367 (12434–12445): read only in their first sentences via a search, not whole.
- `guidelines/styleguide-browser-view.md` (1974 lines): not read. The slice's changes are words, no screen layout, so I judged it unneeded for this change, but the method names it for a browser-view file.
- `guidelines/coding-browser-module.md`: not read; the slice names it.
- `guidelines/testing.md`: read after writing the test, through its headings and the unit-test recipe only. The new test follows the recipe (named behaviour, data written out, the fixtures the scene test uses), but I did not read the whole file before writing.
- `guidelines/coding.md` and `src/browser/AGENTS.md`: read whole only after the commit, not before the edits as the AGENTS.md rule asks. Reading them then found no rule the change breaks (the size rule was checked, see Checks); the gap is in the order, not in the result.
- `docs/task-cycles/wyposazenie-postaci/plan.md` (Slice 12 section): not opened; the handoff copy was used.
- `task_frozen.md` lines 30, 34 and 279: read (the rows of the *To do* and the Settlements table near those lines).

## Searches not found or unclear

- none

## Scope notes

- The test in `tests/view/gear-words.test.mjs` imports the fixtures `tests/sim/program-fixture.mjs` and `tests/sim/understanding-fixture.mjs`, as `scene-picture.test.mjs` does; these are test helpers, not product code.
- The ITEMS key for the stick is `stick`, and for the bandage `bandage`, as the data shows (`src/browser/sim/data/items.ts`).
