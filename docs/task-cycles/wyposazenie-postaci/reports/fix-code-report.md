**Status:** done with concerns

# Fix of the whole-change review's findings, part 1 (code and tests) — report

Worktree `the task's worktree`, branch `task/wyposazenie-postaci`, from head `db955ab0` to `2766ad25`. Method: `.the-way/task-cycle/change/SKILL.md`, variant "the fix of a review's findings" (`fix.md`). Findings file: `reports/findings-whole-code.md`.

The concerns are for the foundation step that comes after me, not for the code. Details are in section "For the foundation step".

## Commits

| Commit | What |
|---|---|
| `d0f3c817` | test: balance findings 2 and 3 (`tests/balance/gear.test.mjs`, `tests/balance/check-map.test.mjs`) |
| `5b81b23b` | refactor: Minor 2 and Minor 15 (`teamAfterDeath` runGear required; judging cache `read`/`remember` state required), with Minor 13's test |
| `5d6513db` | fix: Minor 1 (pick cell word order), with Minor 11's and Minor 12's tests |
| `2766ad25` | fix: finding 1 (gear acts in an earning loop) |

Finding 1 was the first commit I meant to make. A hook stopped that first `git commit` call, which then ran last. The commits do not depend on each other, so the order does not matter.

Files changed (`git diff --numstat db955ab0..2766ad25`, added / removed):

- `src/browser/sim/game.ts` 2 / 3
- `src/browser/sim/gear.ts` 44 / 13
- `src/browser/view/character-gear.tsx` 1 / 1
- `src/browser/view/judging-cache.ts` 6 / 7
- `tests/balance/check-map.test.mjs` 35 / 24
- `tests/balance/gear.test.mjs` 0 / 12
- `tests/sim/gear-acts.test.mjs` 65 / 0
- `tests/sim/gear-combat.test.mjs` 21 / 0
- `tests/sim/gear-transfer.test.mjs` 121 / 6
- `tests/sim/loop.test.mjs` 19 / 6
- `tests/sim/saved-game.test.mjs` 8 / 1
- `tests/sim/team.test.mjs` 7 / 1
- `tests/view/character-gear-pick.test.mjs` 5 / 5
- `tests/view/judging-cache-gear.test.mjs` 10 / 11
- `tests/view/judging-cache-page.test.mjs` 12 / 3
- `tests/view/judging-cache-record.test.mjs` 13 / 3
- `tests/view/judging-cache.test.mjs` 34 / 3
- `tests/view/maps-screen.test.mjs` 11 / 4

## Checks run (command and exit code)

All checks ran from the worktree root, after `node scripts/build.mjs` (exit 0 each time).

1. Failing run before the fix of finding 1 (tests written first): `node --test tests/sim/gear-acts.test.mjs tests/sim/gear-transfer.test.mjs` exited **1**. The new cases failed for the expected reason, for example "an empty chest: actual { stick: 1 }, expected {}", and the conservation test failed with "stick in the hand, 0 in the chest, off, a completion: actual 2, expected 1".
2. The same command after the fix exited **0**: 44 tests, 44 passed.
3. The reviewer's probe (`reports/review-whole-probes/probe-gear-duplication.mjs`, with its imports re-pointed) after the fix: `node .runs/fix-code/probe-gear-duplication.mjs` exited 0.
   - Case 1 ends with chest 1 and gear 0: one stick, which is all there was.
   - Case 2 ends with chest 1 and gear 1: two sticks, which is all there were.
   - Before the fix the reviewer saw 2 and 3.
4. Finding 3, the check-map case:
   - `node --test --test-name-pattern="the earning loop of a row starts with the gear" tests/balance/check-map.test.mjs` exited **0**.
   - On a mutant I made, with `gear,` removed from the `loopBalance({...})` call in `measureRow` (`balance/check-map.mjs`), the same command exited **1** with an `AssertionError` on the loop columns.
   - I restored the file with `git checkout -- balance/check-map.mjs` and the same command exited 0 again.
5. Finding 2: `node --test tests/balance/gear.test.mjs` exited **0**, 8 of 8 passed.
6. Minor 13 (a new test, marked `// invariant: judging-cache-reading`):
   - Mutant: the check `!isCount(held.gearChanges, 0)` removed from `readValue` in `src/browser/view/judging-cache.ts`. `node --test --test-name-pattern="no whole number from 0 reads as none even" tests/view/judging-cache.test.mjs` exited **1** with "below 0".
   - I restored the code by hand, rebuilt, and `node --test tests/view/judging-cache.test.mjs tests/sim/gear-combat.test.mjs` exited **0**, 126 of 126 passed.
7. Minor 11 (a new test):
   - Mutant: `held === null &&` removed from `combatPiece` in `src/browser/sim/program.ts`. `node --test --test-name-pattern="a hand holding another item" tests/sim/gear-combat.test.mjs` exited **1**.
   - I restored the file with `git checkout -- src/browser/sim/program.ts`. The rerun is the one in item 6, exit 0.
8. Minor 12 (a new case in a test marked `// invariant: save-version`):
   - Mutant: `exchange()` in `src/browser/sim/saved-game.ts` reads `characterAction` without the null branch. `node --test --test-name-pattern="a document at the edges of what the gear admits loads" tests/sim/saved-game.test.mjs` exited **1** with "a combat turn with no action of the character".
   - I restored the file with `git checkout -- src/browser/sim/saved-game.ts` and `node --test tests/sim/saved-game.test.mjs` exited **0**, 49 of 49 passed.
9. Focused tests of everything I touched, run with `node --test` on 23 files (`tests/sim/` gear-acts, gear-transfer, gear-combat, gear-combat-wear, gear-state, loop, team, saved-game, combat; `tests/view/` character-gear-pick, character-gear, judging-cache, judging-cache-gear, judging-cache-page, judging-cache-record, maps-screen, maps-record; `tests/balance/` gear, check-map, loop, cli, campaign, agreement), exited **0**: 569 tests, 569 passed.
10. `node --test tests/sim/rules.test.mjs` exited **0**, 6 of 6 passed.
11. `node node_modules/prettier/bin/prettier.cjs --write <the changed files>` exited 0. It reformatted only `tests/sim/gear-transfer.test.mjs`.
12. `node node_modules/eslint/bin/eslint.js <the changed files>` exited **0**.
13. `node tests/quality/eslint-size-rules.mjs` exited 0: "0 functions and files over a threshold in 382 files".
14. `python -B .the-way/elements/common/foundation_check.py` exited **0**: "0 errors".

### Not run

- The product's gate, `npm test` with no file. My boundary forbids it.
- I did not run the quality tests of Prettier and ShellCheck as test files. Instead I ran Prettier and ESLint directly on the changed files (items 11 and 12).

## Per finding

### Finding 1 (Critical) — fixed

**What changed.** `src/browser/sim/gear.ts` gets a new predicate, `heldByLoopRun(state, character, slot)`. It is true at a character in an earning loop for a slot not in `changedSlots`: such a slot holds the piece the map run going on entered with. The three acts use it:

- `putOnPiece` does not put that held piece into the chest.
- `takeOffPiece` puts it into no chest and does not refuse with `chestFull` for it.
- `gearPick` gives `takeOff: null` for such a slot at a full chest.

A piece the player put on during the loop sits in a slot that is already changed. It still returns to the chest at once and still needs room there: `chestFull` applies to it as before. The doc comments of the three acts now say so.

**Tests.**

- `tests/sim/gear-transfer.test.mjs`: the case at the former lines 369–390 now expects the task's outcome.
  - Two sticks in all: one in the hand, which the map run going on holds, and one in the chest.
  - After „Zdejmij” the chest still holds 1 (a precondition). After the completion it holds 2, and the gear holds no stick.
  - Emptied and then filled again from the chest: the hand holds the player's stick and the chest gets the map run's stick, so 1 in the chest. Before the fix, one stick became two.
- New in `tests/sim/gear-transfer.test.mjs`:
  - the exchange over the map run's stick: the hand keeps the player's stick and the map run's stick reaches the chest at the end;
  - a death with no use left after a take-off or an exchange, both with practice and without: the map run's stick is lost and the player's own stays. This is what the task's question 16 and D-190 give;
  - a conservation test over 2 starting hands × 3 chest counts × 4 ends × 15 sequences of up to three acts („on”/„off”), each also stopped with „Zatrzymaj”. It checks that the sticks of the chest and the hand stay the same, but for a death that takes the gear, which loses exactly the stick the map run entered with. The expected value is a relation computed from the case's inputs, not by the code under test.
- New in `tests/sim/gear-acts.test.mjs`:
  - a take-off in a loop of the map run's piece, at an empty chest and at a full one: no refusal, nothing into the chest, and the pick's `takeOff` is null;
  - a put-on over the map run's piece, with the next exchange returning the player's piece at once;
  - a piece put on in the loop that needs room to come off (`chestFull`, also in the pick).

**How the chest's room is counted for the take-off that now puts nothing in the chest.** My choice: that take-off needs no room at the act and is never refused with „skrzynka pełna”. The map run's piece reaches the chest only through the merge at the end of the map run, and the merge counts the room then. Where the chest is full at that moment, the piece is lost, as D-460 and the task's question 14, point 8 settle and accept ("sztuka może przepaść przy pełnej skrzynce").

- Way rejected: refusing the take-off at a full chest, as a reservation of room. It would refuse an act that moves nothing into the chest. It would also guarantee nothing, since loot and other characters' map runs fill the chest before the end.
- Cost if wrong: a player who takes the map run's stick off while the chest is full loses that stick at the end. Only the chronicle tells them, as D-460's rationale accepts.

**Other choices.**

- I keyed "the map run holds this piece" on the slot being unchanged in an earning loop. I did not compare the character's piece with the gear of `loop.run`. The task defines a changed slot by the use of its tile, not by a difference (*To do* 7). D-241 says the map run of a loop is always going on, and the merge and `startLoop` clear `changedSlots` at each start, so at an unchanged slot the character's piece is the map run's entry piece.
- Way rejected: comparing with `loop.run.character.gear`. That gear changes during the map run (a strike's refill, „Załóż”), so it no longer says which piece the player owns.
- Cost if wrong: none found. The conservation test and my own-work check over two map runs (below) found no case that makes or loses a stick.

### Finding 2 (Important) — fixed

`tests/balance/gear.test.mjs` no longer lists `loop … --gear mainHand=stick` among the refused flags. The cause lies in the requirement: *To do* 13 asks for the gear in all modes of the instrument, and the plan's *Choices* give `loop` the flag `--gear`. The positive case, that `loop` takes the flag and names the gear in its header, already stands in `tests/balance/loop.test.mjs` ("the loop command takes the flag --gear and names the gear in its header"), so I added none. The file now passes 8 of 8 (check 5).

### Finding 3 (Important) — fixed

The case in `tests/balance/check-map.test.mjs` now measures `forestDeepBest` on `forestDeep` with loop seeds 1–4 for 12 hours.

- A precondition shows that the loop's columns differ with `mainHand=stick` and with no gear. My probe gave deaths of 0 % against 40 %.
- The row's three loop columns must then equal those of `loopBalance` with the stick.
- The mutant without `gear` in `measureRow`'s loop call fails it (check 4). I kept the mutant's output in `reports/fix-code-probes/checkmap-mutant.txt`.
- The case no longer uses `withNoReturn`: both the row and the expected loop start with `resurrectionReady: true` and the same balance data.

### Minor 1 — fixed

`src/browser/view/character-gear.tsx:120` now writes `${count} × ${ITEMS[item].name}` („2 × patyk”), the game's word order of D-363 and D-380. The five expectations in `tests/view/character-gear-pick.test.mjs` change with it. The cause lies in the convention, as the finding says. The styleguide's rule „The screen Postać” fixes no word order, so it needs no change.

### Minor 2 — fixed

`teamAfterDeath` in `src/browser/sim/game.ts` takes `runGear: Gear` with no default, and its doc comment no longer speaks of "the character's own where none is given". Both callers in `src/` already pass it, and the type check of the build passed. The tests that left it out now pass the character's gear, which is what the default gave, so their meaning is unchanged: `tests/sim/loop.test.mjs` (the purity case, „what a death does to the team…”, „a character with no practice…”) and `tests/sim/team.test.mjs` (`dies`).

### Minor 3 — no change

The finding itself asks for none: it follows the task's words and needs the task's owner.

### Minor 11 — fixed (a test)

New in `tests/sim/gear-combat.test.mjs`: a main hand holding another item, a bandage standing in for an item the data do not yet fit to the hand, with two sticks in the backpack.

- The strike's bar is `blocked`.
- The first action is the kick.
- No refill happens, the hand keeps the bandage and the backpack keeps both sticks.
- Mutant: check 7.

I did not assert the reason of the strike in this state; see "For the foundation step".

### Minor 12 — fixed (a test)

- In `tests/sim/saved-game.test.mjs`, the crafted case „a refill mark on an exchange with no action of the character” now first sets `characterAction: null` on that exchange and then the mark. So it edits a turn with no action of the character, as its name says.
- A new edge case, „a combat turn with no action of the character”, in „a document at the edges of what the gear admits loads” shows that such a turn alone loads, so the crafted case is refused for the mark. Mutant: check 8.

### Minor 13 — fixed (a test)

New in `tests/view/judging-cache.test.mjs`, marked `// invariant: judging-cache-reading`: „a stored count of gear changes that is no whole number from 0 reads as none even against a game whose character holds that very value”.

- It reads each of the four crafted counts (−1, 0.5, "0", null) against a game state whose Ala holds the same value.
- So the equality at reading would let it through, and only the form check refuses it.
- The value stays in the storage.
- Mutant: check 6.

The old table entries stay as they were.

### Minor 15 — fixed

`read(ids, state: GameState)` and `remember(ids, record, state: GameState)` in `src/browser/view/judging-cache.ts` are now required, with no fallback to `opening.state`, and the doc comments lose the sentence about it. The one caller in `src/`, `src/browser/view/maps-entry.ts`, already passes both, and the build's type check passed.

In the tests:

- The helpers that open a cache bind the opened game for a case that gives no state: `open` in `tests/view/judging-cache.test.mjs`, `tests/view/judging-cache-record.test.mjs` and `tests/view/judging-cache-gear.test.mjs`, `cacheOf` in `tests/view/judging-cache-page.test.mjs`, and `cacheOn` in `tests/view/maps-screen.test.mjs`. The case's game stays explicit and the real cache gets a state at every call.
- In `tests/view/maps-screen.test.mjs`, `propsOf` now reads with the drawn `state`, as the entry does.
- I removed the case „where no state is given the state the cache was opened with is the one the judging read and the one at hand” from `tests/view/judging-cache-gear.test.mjs`. The behaviour it held is gone by this finding, so the cause lies in the requirement of the fix.

Choice:

- Way rejected: editing about 100 call sites one by one in the five test files. That is a larger diff of the trust boundary's tests for the same effect.
- Cost if wrong: the tests' helpers still default to the opened state. A test that meant to show a stale state would have to pass one, as the gear-count tests already do.

### Minor 16 — no change

The finding is noted only for completeness and asks for none.

## Own-work check

The requirement my work most likely does not meet: *To do* 7, „Skrzynka przy zmianie w pętli”, across more than one map run. After the merge clears the changed slots, the next map run holds the merged piece, and an act on it must again count as an act on the map run's piece.

The check is `reports/fix-code-probes/own-check-two-runs.mjs`. It covers:

- 3 chest counts × 2 starting hands × 4 kinds of the second end (a covered death, a death with a use left, two deaths with none left);
- 6 sequences of acts before the first end (a completion);
- 6 sequences before the second end (a death).

It checks that the sticks of the chest and the hand stay the same but for the stick the second map run entered with at a death that takes the gear. It ran from `.runs/fix-code/` with `node .runs/fix-code/own-check-two-runs.mjs` and exited 0: "checked 1728, failed 0". The output is in `reports/fix-code-probes/own-check-two-runs.out.txt`.

## Working copies

- `.runs/fix-code/` held:
  - `probe-checkmap-gear.mjs`, my probe for a program and map whose loop columns a stick changes;
  - `probe-gear-duplication.mjs`, the reviewer's probe with its imports re-pointed;
  - `own-check-two-runs.mjs`;
  - `checkmap-mutant.txt`, `focused.txt` and `size.txt`.
- I removed it with `Remove-Item -Recurse -Force ".runs/fix-code"`. `Test-Path` then gave False.
- Kept beside this report, in `reports/fix-code-probes/`:
  - `probe-gear-duplication.mjs` and its output `probe-gear-duplication.out.txt`;
  - `own-check-two-runs.mjs` and its output `own-check-two-runs.out.txt`;
  - `checkmap-mutant.txt`.
- To rerun the two scripts, put them two levels under the worktree root, as `.runs/fix-code/` was: their imports are `../../dist/...` and `../../tests/sim/...`.
- I made no worktree or clone. The mutants of checks 4, 6, 7 and 8 were edits in this worktree, each restored before the next step.

## For the foundation step

These need a foundation entry or a sentence, which is not mine to write.

1. **The chest rule of *To do* 7 stands in no entry.** The finding said so too. I suggest a sentence in D-460 or D-461: "At a character in an earning loop, a piece that the map run going on holds in a slot the player has not changed reaches the chest only at the end of that map run; the act that takes it off or exchanges it puts it into no chest and needs no room there, while a piece the player put on during the loop returns to the chest at once."
   - D-461's sentence „Choosing an item moves one piece of it from the chest into the slot and the piece the slot held back into the chest, and „Zdejmij” moves the piece of the slot into the chest.” is now inexact for such a slot.
   - My new tests carry only D-453's sentence as `decision:`. Once the sentence stands, they should quote it.
2. **The strike in a main hand that holds another item.** When the hand holds an item other than the stick and a stick lies in the backpack, the code's reason is „brakuje 1 × patyk”. D-380 reads that the strike is short of a thing only where the stick lies neither in the hand nor in the backpack. The state cannot be reached today (only the stick fits the hand), so I asserted the bar and the outcome, not the reason.
3. **The testing guidelines' table of trust boundaries** (`guidelines/testing.md`, row `src/browser/view/judging-cache.ts`) lists the cases of `judging-cache-reading` by name. The new case „a stored count of gear changes that is no whole number from 0 reads as none even against a game whose character holds that very value” could join it.
4. **The conservation of pieces across a loop's gear acts** is no invariant today. `trip-transfer` covers the take list and the bring list only. The new conservation test carries no invariant mark.

## Reaches beyond the dispatch

- `foundations/decisions.md`, a search for the sentence of D-441 that the existing `judging-cache-reading` tests quote („A value of another form, …”). I wanted to quote it in the new Minor 13 test; one match.
- `foundations/decisions.md`, a search confirming that the sentences of D-457 and D-456 I quote in the Minor 11 test stand verbatim.
- `src/browser/sim/combat.ts` and `src/browser/sim/program.ts` (`combatPiece`, `combatRefusal`, `wielding`), for Minor 11.
- `src/browser/sim/saved-game.ts` (`exchange`, `characterAction`), for Minor 12.
- `tests/sim/reference-programs.mjs`, to choose a program for finding 3.
- `scripts/build.mjs`, to confirm the build type-checks.
- `tests/quality/eslint-size-rules.mjs`, for the size rule.
- `.the-way/task-cycle/remarks_check.py`, for the form of this report.

## Unread material

- `guidelines/styleguide-browser-view.md`: I read its list of headings and the rule „The screen Postać” whole (lines 1116–1214), and searched the whole file for the word order of a count. I did not read the other rules: Minor 1 changes one text, which no other rule speaks of.
- `guidelines/coding-browser-module.md`: not read.
- `.claude/skills/loop2-balance/SKILL.md` and its twin: not read. I changed no file of `balance/` (the mutant of check 4 was restored) and ran no measurement through the skill's commands, only the instrument's functions in tests.
- D-183, D-190, D-200, D-241, D-363 and D-380: read whole, each to its next heading.
  - D-190: I read lines 6424–6448, which cover its statement and its *Verification* up to the gear part. I did not read the rest of its *Verification* list and its rationale.
  - D-241: I read its statement and the start of its *Verification* (lines 9015–9034), not its rationale.
- D-452, D-453, D-455, D-460, D-462 and D-463: read whole.
- The invariants `trip-transfer`, `trip-run-end`, `death-settled-once`, `catch-up-state` and `instrument-game-agreement`: read whole.
- `docs/task-cycles/wyposazenie-postaci/plan.md`: not read, though the handoff names the sections of Slices 2, 3, 21 and 22 and *Choices*. The findings file and the frozen task held what I needed. The finding quotes the plan's text for Slice 2, and the code and tests the slices wrote were at hand.
- `docs/task-cycles/wyposazenie-postaci/task_frozen.md`: read lines 30–159 (*To do* 3–15 and the answers to questions 1–15, among them 5, 13 and 14) and 255–289 (*Settlements to record*).

## Searches not found or unclear

- For the chest rule of *To do* 7 in `foundations/decisions.md` (D-453, D-460, D-461, D-462): not found, as the finding says. See "For the foundation step", item 1.
- D-380's sentence on the strike's reason does not settle the reason where the main hand holds another item and the backpack a stick; unclear for that state. See item 2.
- For an existing positive test that a turn with no action of the character loads in the current version, which the Minor 12 finding mentions ("Another test still guards the empty turn"): I did not find which test it means. I added the edge case named in Minor 12.
