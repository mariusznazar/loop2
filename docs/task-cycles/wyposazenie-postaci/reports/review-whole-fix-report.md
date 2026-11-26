PASS 556f5a7d8171843b6e60abbdd35f1bedc349f7ee

# Review of the fix of the whole-change findings — task `wyposazenie-postaci`

- Range: `db955ab0..556f5a7d`, five commits. Code: `d0f3c817`, `5b81b23b`, `5d6513db`, `2766ad25`. Foundation: `556f5a7d`.
- `git rev-parse HEAD` = `556f5a7d8171843b6e60abbdd35f1bedc349f7ee`, the head given. The pin is unchanged at `6ed3cb36…`.
- Method: `.the-way/task-cycle/review/SKILL.md`, variant "the fix of earlier findings" (`fix.md`).
- Read: both findings files, `reports/findings-whole-code.md` and `reports/findings-whole-foundation.md`; both fix reports, `reports/fix-code-report.md` and `reports/fix-foundation-report.md`; and the fix diff in full for `src/` and the foundation and guideline files.
- Of the tests, I read the diffs of `gear-transfer`, `check-map` and `gear.test`, and the test names and fix-report claims for the others.
- Result: every blocking finding is fixed. Each Minor within the task is fixed or left with a reason that stands. The fix brings no new Critical or Important finding, and one new Minor (below).

## Blocking findings

### 1. Critical — gear acts in an earning loop made pieces out of nothing: **fixed**

- **Change:** `src/browser/sim/gear.ts` adds `heldByLoopRun`, which is true at a character in an earning loop for a slot not yet changed. Such a slot holds the piece the map run going on entered with. Three things now treat that piece as the map run's:
  - `putOnPiece` no longer returns it to the chest.
  - `takeOffPiece` puts it into no chest and no longer refuses with „skrzynka pełna” for it.
  - `gearPick` gives `takeOff: null` for it.
- **Why it is right:**
  - The predicate is exact. At the start of a loop and at each merge, the changed slots are cleared and the unchanged slots equal the map run's starting gear (`startLoop`, `teamAtRunEnd`). So an unchanged slot always holds the running map run's piece.
  - A piece the player put on during the loop sits in a slot that is then changed, so it still returns at once and still needs room (*To do* 7).
- **Probe on a build of `556f5a7d`:** `reports/review-whole-probes/probe-gear-conservation-fix.mjs`, my earlier probe plus three cases. Output in `probe-gear-conservation-fix.out.txt`; exit 0.

| Case | Before the fix | After the fix | Right by the task |
|---|---|---|---|
| 1 — take-off of the run's stick, then completion | chest 2 | chest 1, gear 0 | yes |
| 2 — exchange over the run's stick | 3 sticks | chest 1, gear 1 (2 sticks) | yes |
| 3 — take-off, then a death with no use left | not probed | 0 sticks in all | yes (D-190 with *To do* 6/7) |
| 4 — a stick put on in the loop, then taken off | not probed | chest 2 at once | yes |
| 5 — the run's stick taken off at a chest of 59 of 60 | not probed | no refusal; at the merge the stick goes into the one free place | yes (D-460) |

- **Tests:** `tests/sim/gear-transfer.test.mjs` now expects the task's outcome where the old case asserted the duplicate. It adds:
  - the exchange case;
  - a death with no use left, after a take-off and after an exchange, with practice and without;
  - a conservation test: 2 hands × 3 chests × 4 ends × 15 act sequences, each also stopped with „Zatrzymaj”. Its expected count is computed from the case's inputs, not from the code.
- `tests/sim/gear-acts.test.mjs` covers the take-off at an empty chest and at a full one.
- The fix report's failing-first run shows the new cases failing on the old code for the right reason.

### 2. Important — `tests/balance/gear.test.mjs` failed at the head: **fixed**

The case that expected `loop` to refuse `--gear` is removed. The command now takes the flag, as *To do* 13 and the plan give. The file passes: 8 of 8 per the fix report, and it is within the 457 passes of my run below.

### 3. Important — the check-map case could not fail: **fixed**

The case now runs Las — głębiej with `forestDeepBest`, where a stick in the hand changes the fight.
- A precondition asserts that the loop's columns differ with and without the stick.
- It then asserts that the row's columns equal those of the loop started with the stick.

My mutant on a worktree of the head removed `gear,` from the `loopBalance` call in `measureRow`. The case then exited 1, with 0 pass and 1 fail (`reports/review-whole-probes/checkmap-mutant-fix.txt`). The file was restored with `git checkout`.

## Minor findings of the findings files

| # | Finding | Status |
|---|---|---|
| 1 | pick cell word order | **fixed**: `${count} × ${name}`, test expectations changed with it |
| 2 | `teamAfterDeath` optional gear | **fixed**: required; the build's type check passes; tests pass the character's gear, as the default did |
| 3 | tile's accessible name lacks the slot | **not changed**, reason accepted: the finding follows the task's words and needs the task's owner |
| 11 | no test that only an empty hand refills | **fixed**: a new case in `gear-combat.test.mjs` with a hand holding another item; the fix report's mutant on `combatPiece` fails it |
| 12 | no empty combat turn in the saved-game document | **fixed**: the crafted case edits a turn with no action, and an edge case loads such a turn; the fix report's mutant fails it |
| 13 | crafted counts passing by equality | **fixed**: a new case reads each crafted count against a character holding that same value; the fix report's mutant on `isCount(held.gearChanges, 0)` fails it |
| 15 | optional state in `read`/`remember` | **fixed**: required; the one `src/` caller already passes it; tests updated |
| 16 | `undiscoveredPart` label | **not changed**, reason accepted: the finding asked for none |
| 4 | D-380 first paragraph | **fixed in part**, accepted: qualified, not dropped. The first list now ends „…the lack of a stick for „Uderz — patyk” being as the third paragraph gives it”. Dropping the strike would break six `decision:` quotations of tests. The qualification removes the wrong reading, which was the finding's point. |
| 5 | glossary „combat turn” | **fixed**: "no feasible rule whose action it can carry out in combat (D-140, D-146)" |
| 6 | D-463 *Rejected* „unknown” | **fixed** as asked; see the new Minor below |
| 7 | D-441 does not point to D-463 | **fixed in part**, accepted: a pointer in D-441's *Rationale*. *Relations* point only from the dependent entry, and D-441's binding sentences are at their word limit. |
| 8 | D-456 wording | **fixed in part**, accepted: a sentence of its own, "An item whose data name no place fits no slot.", and the matching *Verification* part. The quoted sentence stays, since tests cite it. |
| 9 | `coding-content-data.md` table | **fixed**: a row for `data/gear.ts` |
| 10 | `coding-saved-game.md` version rule | **fixed**: names the slots of `Gear` and the number of pockets |
| 14 | `testing.md:178` | **fixed**: six fields, the fields of versions 1 and 2 named |

## New Minor finding in the fix diff

1. `foundations/decisions.md`, D-463 *Rejected* (around line 12895). It now names the plan's rejected way, as my Minor 6 asked. But `.the-way/elements/decisions/template.md:106` gives the *Rejected* of a decision marked `the cycle's` as `unknown`, unless a statement of the human names the ways weighed. D-463 is the cycle's: plan F32, which the request puts before the human. Yet its *Origin* reads `none` and the entry carries no mark of being the cycle's. Either the entry gets its mark and *Rejected* goes back to `unknown`, or it stays as now. My Minor 6 did not weigh that rule, and the fix report flags it as a question to the orchestrator. The content agrees with the code, so this is Minor (WAY-364) and blocks nothing. It is within the task.

## Declined to judge

- none

## Checks run

| Command or method | Where | Exit / result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | reviewed worktree at `556f5a7d` | 0; "0 errors" |
| `python -B .the-way/instruction-files/check_instructions.py` | reviewed worktree | 0; "0 error, 0 warn, 121 info" |
| `node scripts/build.mjs` (type check included) | worktree of `556f5a7d` | 0 |
| `node tests/quality/eslint-size-rules.mjs` | worktree of `556f5a7d` | 0; "0 functions and files over a threshold in 382 files" |
| `node tests/sim/probe-gear-duplication.mjs`, then the extended `probe-gear-conservation-fix.mjs` | worktree of `556f5a7d` | 0; pieces conserved (table above) |
| `node --test` on `tests/sim/{gear-transfer,gear-acts,gear-combat,loop,team,saved-game}`, `tests/balance/{gear,check-map}`, `tests/view/{judging-cache,judging-cache-gear,judging-cache-page,judging-cache-record,character-gear-pick,maps-screen}` | worktree of `556f5a7d` | 0; 457 pass, 0 fail (`reports/review-whole-probes/fix-focused.txt`) |
| the check-map mutant (gear dropped from `loopBalance` in `measureRow`) | worktree of `556f5a7d` | 1; the case fails, as it should |

Not run:
- The whole gate (`npm test`), which is the cycle's own run.
- Stryker, too long for this review. I relied on the fix report's hand mutants for Minors 11, 12 and 13 and checked one of my own (finding 3).

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md:104-107`: to judge the fix's note on D-463's *Rejected* (the new Minor).
- `startLoop` and `teamAtRunEnd` in `src/browser/sim/loop.ts` and `gear.ts` at the fix head: to confirm that an unchanged slot of a looping character always holds the running map run's starting piece, which `heldByLoopRun` assumes.

## Working copies

- The worktree of `556f5a7d` stood at `.runs/review-whole/head`, with `.the-way` at the pin and a junction to the reviewed worktree's `node_modules`.
- I removed the junction with `rmdir`; the target still holds its 268 entries. I then removed the worktree with `git worktree remove --force` and ran `git worktree prune`.
- `.runs/review-whole/` is removed.
- Kept in `reports/review-whole-probes/`: `probe-gear-conservation-fix.mjs` and its `.out.txt`, `checkmap-mutant-fix.txt`, `fix-focused.txt`.
- The reviewed worktree is clean at `556f5a7d`.

## Unread material

- In the fix diff, the test files `tests/sim/{loop,team,saved-game,gear-combat}.test.mjs` and `tests/view/{judging-cache*,character-gear-pick,maps-screen}.test.mjs` were not read line by line. I ran them and read the fix report's account of each.
- I read the foundation and guideline diff as a word diff. I did not reread D-380, D-441 and D-456 whole beyond their changed sentences.

## Searches not found or unclear

- Whether D-463 should carry the mark of a decision of the cycle. The plan calls F32 the cycle's, but the entry holds `Origin: none` and no such mark. This is unclear; see the new Minor.
