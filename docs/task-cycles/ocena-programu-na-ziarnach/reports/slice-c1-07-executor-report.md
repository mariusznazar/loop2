# Report — executor of slice 7 (correction 1), task `ocena-programu-na-ziarnach`

**Status:** done

## Commits

- `7ba9d74e` test: :white_check_mark: make the page cases of the account screen expect no save for the judging of „Puść w pętlę” … (D-207, D-243)

## Files changed

- `tests/view/account-screen.test.mjs`: +23 / −56.

## What changed and why

The cause of each change is spec Decision 9 (remark 1 of the human): a judging changes no game state, so the store saves nothing for it (D-207: a save follows a change of the game state).

1. Import of `judgeAndRemember` removed; no case depends on it any more.
2. Case „Puść w pętlę”: its judging saves nothing, and the start at the second click (of the table `ACTS`, in the test „each act of the player that changes the game state is saved at once …”): the act is now both clicks (first click, tick of 100 ms, „Puść mimo to”); the expected state is `startLoop(start, …, CLOCK_MS).state` — the state before the judging with the loop started. The one save the case sees is the save of the start. A save made for the judging would make the held request carry a game state without the loop, or add a second request, and the case's deep comparison would fail. The case was renamed to say so.
3. The `afterwards` step of the table's harness (the second click's save waiting behind the first save) is removed: only the case above used it, and its subject — a save of a judging held in flight — no longer exists. The rule "at most one save in flight, a moment sent after the answer" stays tested by `tests/view/game-saver.test.mjs` (case „a moment during a request in flight sends once more, after the answer …”).
4. Test „„Puść w pętlę” puts the character into an earning loop …”: instead of `startLoopOf`, the case clicks by hand: after the first click and the 100 ms tick it asserts `waitingCalls(held)` is `[]` („the judging saves nothing”), then presses „Puść mimo to”. The old pair of assertions (first save without `loops[1]`, then, after the answer, a second save with it) became: one save, holding `loops[1]`; after its answer no save follows. Everything else the case checks (screen, address entries, loop line, disabled buttons, focus, Siedziba's line) stays.
5. `startLoopOf` itself is unchanged: its other users (cases at the former lines 3116 and 3187) count no saves and still pass; the helper's comment says nothing about saves.

Decision quotations: none added or changed; the existing `// decision:` lines of D-207 and D-243 still quote binding sentences as they stand (the foundation check shows no error in this file).

## Checks

- Before: `npm test -- tests/view/account-screen.test.mjs` → exit 1; 132 tests, 130 pass, 2 fail: „each act of the player that changes the game state is saved at once, and one that changes nothing sends nothing” (the case „Puść w pętlę”: expected ["saveGame"], got []) and „„Puść w pętlę” puts the character into an earning loop …” (the first save already held `loops[1]`).
- After: `npm test -- tests/view/account-screen.test.mjs` → exit 0; 132 tests, 132 pass, 0 fail (run again after Prettier).
- `npx prettier --check tests/view/account-screen.test.mjs` → exit 1 before `--write` (the long case name and the destructuring were reformatted), exit 0 after (`--write` then `--check`).
- `npx eslint tests/view/account-screen.test.mjs` → exit 0.
- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` → exit 1, 5 errors, none in `tests/view/account-screen.test.mjs` (the lines shown are in `tests/sim/saved-game-judgings.test.mjs`, a file not changed here: not mine).
- Not run: the full gate (`npm test` with no file), by the handoff.

## Own-work check

Requirement most likely not met: Decision 9 — "the store takes no result from [the judging] and saves nothing for it (it may still take and save the catch-up its reading makes first, as any act)"; the weak point is a case that still passes while a judging does save. Check: the case in the table asserts exactly one `saveGame` after both clicks and deep-equals its game to the start's state with `saveTimeMs`; the test of the card asserts `waitingCalls` is `[]` between the first click and the second, and after the answer to the start's save. Result: both pass (exit 0). Mutation in the head: a judging that saves would give a request with the unchanged state at the first click (the `[]` assertion fails) or a second request (the `[]` after the answer fails). I did not run it on a broken product (Slice 6's code is not mine to break).

## Walkthrough

The change alters no behaviour a user sees: it changes only the expectations of tests of behaviour Slice 6 already changed.

## Reach beyond the handoff

None.

## Choices

- Removed the table's `afterwards` branch instead of keeping it for a future two-step case: it had one user; rejected keeping it as dead code. Cost if wrong: a later two-step case writes it again (a few lines).
- Inlined the two clicks in the card test instead of adding a parameter to `startLoopOf`: the check between the clicks belongs to that one case.

## Unread material

- `foundations/decisions.md` D-207 (3955-4034) and D-243 (8818-8883): read whole.
- "Foundation entries row 1" (the new entry about where the judgings are kept): not read; the change does not touch the cache, and no quotation of it was written.
- `guidelines/coding.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`: not read (a test-only change; the handoff names them, I judged `testing.md` the one that binds).
- `guidelines/testing.md`: read lines 1-359 of 510 (the trust-boundary table, the rules to "Test files in the gate"); the rest is about other matters.
- `tests/view/account-screen.test.mjs` (~360 KB): not read whole, by the handoff; read the table `ACTS` area and its harness (about 2540-2790), the helpers around `startLoopOf`, and the card test (3030-3200).
- Passage of frozen task 162-164: read as copied in the handoff.

## Searches not found or unclear

none

## Working copies

None made beyond temporary output files under `.runs/` (`before.txt`, `after.txt`, `fc.txt`, a copy of the original test for a Prettier comparison), all removed. No directory `.runs/executor-c1-7/` was needed.
