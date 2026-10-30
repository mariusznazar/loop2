# Fix report — whole-change review `FAIL ae0d7e2`, finding I-1

- **Status:** done
- **Base:** `ae0d7e2` · **Commit:** `582e9be` (`tests/view/account-screen.test.mjs`, +236 −0)
- **Method:** `.the-way/task-cycle/change/SKILL.md`, the fix of a review's findings (`fix.md`)

## I-1 — Twelve of the player's acts can lose their moment of saving with every test green: fixed

I accept the finding. The code was right, but no test protected the wiring. My Slice 6 report had
left it to review. No product code changes in this fix.

**How:** one table-driven case in `tests/view/account-screen.test.mjs`: „each act of the player
that changes the game state is saved at once, and one that changes nothing sends nothing”. For each
of 16 acts it builds the page from a save at revision 4 and makes the act once on the page, by a
click, by typing into a field or by picking on a list. It then asserts that exactly one `saveGame`
call is waiting, that the call is based on revision 4, and that it carries that act's state.

The 16 acts are those of D-184 and decision 6's list:
- program-panel acts: an edit of a program, an edit of the copy, „Nowy program”, „Zmień nazwę”,
  „Usuń”, „Zapisz w programie”, „Zapisz jako nowy program”, „Porzuć zmiany”, „Przełącz postać na
  ten program”;
- headquarters acts: creating a character, the pick on a headquarters row, sending;
- status-row acts: „Restart”, „Zakończ”, „Wznów”, a pace.

How the expected state is set:
- **Acts that stand for one simulation call:** the expected state is the result of that call on the
  start state. The code under test is the view's wiring, not the simulation.
- **Editor edits:** the case checks the trait the act sets, one group more in the program edited,
  and that the rest is unchanged.
- **Sending:** the case checks the map and the character. The send takes the real date, so the seed
  is not the case's to write.

Starts:
- headquarters acts start with two programs on the list;
- copy acts start with a paused map run whose copy was edited;
- „Restart”, „Zakończ”, switching and the copy edit start with a paused map run. A paused run
  suffices for the copy edit: the handler needs `state.run`, not a running clock. The reviewer asked
  for a running one, and that is not needed.

`performance.now` is held at 0 for the case, so the saver's read, which flushes the clock, carries
no real time into a map run that „Restart” or „Wznów” sets going.

The second part of the case covers an act whose result leaves the state unchanged: the pause
without a map run, which `setPaused` returns unchanged. It sends nothing.

**The check that shows it:** a script in the session scratchpad
(`C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\57822f85-5994-4aa0-ab30-2463555a5fde\scratchpad\mutate_acts.py`)
applied 17 breaks to `src/browser/view/game-view.ts` one at a time, ran
`npm test -- tests/view/account-screen.test.mjs` for each, and restored the file afterwards. The
working tree was clean apart from the test file after the run.

Every break gave **exit 1**, and the new case failed in each:

| Break in `game-view.ts` | Exit |
|---|---|
| `act(setProgram(…))` → `store.apply(…)` (edit of the copy) | 1 |
| `act(editProgram(…))` → `store.apply(…)` | 1 |
| `act(createProgram(…))` → `store.apply(…)` | 1 |
| `act(renameProgram(…))` → `store.apply(…)` | 1 |
| `act(deleteProgram(…))` → `store.apply(…)` | 1 |
| `act(saveCopyIntoProgram(…))` → `store.apply(…)` | 1 |
| `act(saveCopyAsNewProgram(…))` → `store.apply(…)` | 1 |
| `act(discardCopyChanges(…))` → `store.apply(…)` | 1 |
| `act(switchProgram(…))` → `store.apply(…)` | 1 |
| `act(createCharacter(…))` → `store.apply(…)` | 1 |
| `act(pickProgram(…))` → `store.apply(…)` | 1 |
| `act(setPaused(…))` → `store.apply(…)` | 1 (also the death case) |
| `act(setPace(…))` → `store.apply(…)` | 1 (also six earlier cases) |
| `act(restart(…))` → `store.apply(…)` | 1 |
| `act(end(…))` → `store.apply(…)` | 1 |
| the moment after `clock.send` removed | 1 |
| `act()` saving without comparing the state (`state !== before` dropped) | 1 (the unchanged-act part) |

While I wrote the case, two runs failed on the case's own expectations, not on the code. First, the
send check read `run.characterId`, while the field is `run.character.id`. Second, „Restart” carried
real time into `realMsCarry`, which the held `performance.now` now prevents. Both runs were
`npm test -- tests/view/account-screen.test.mjs`, exit 1.

## Checks

| Command | Exit |
|---|---|
| `npm test -- tests/view/account-screen.test.mjs` | 0 (35 pass) |
| `npm test -- tests/view/game-saver.test.mjs` | 0 (16 pass) |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 (ESLint and Prettier over the changed test) |

Not run: `npm test` with no argument and `foundation_check.py`. Both belong to the cycle's gate,
not to this fix.

## Searches not found or unclear

- I found no act on the page whose result is the same state object other than the pause without a
  map run. `renameProgram` to the same name, `pickProgram` of the program already picked and
  `setPace` of the pace in force each return a new state object, so the view saves them. The saved
  game state does not differ, so the save is harmless, but it is a request more. The case does not
  pin that behaviour, and I leave it to the cycle whether it matters.
- The case finds the unlabelled pause button by its empty text inside `.status-row`. Without a map
  run the status row never labels it, so the selector rests on that detail.
