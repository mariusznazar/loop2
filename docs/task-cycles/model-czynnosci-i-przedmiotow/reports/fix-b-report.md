done with concerns

# Fix B report — the tests and the comments (Important 1, Minor 2, 3, 4, 5, 6, 7, 8, 9, 12, 13)

Commit: `3a5548f15fdae665407a6954943d4324bf819fa1` (on `task/model-czynnosci-i-przedmiotow`, base `109b2417d3d9c425a43b11c3fd70b6dea411fe30`). One commit; worktree clean after it.

Concern: Minor 8 is contested (see below); one stale wording in `guidelines/testing.md` (outside my boundary) follows from the fix of Minor 4.

## Files changed (added/removed lines from `git diff --stat`, 11 files, 184+/47-)

- `src/browser/sim/judging-record.ts` (1/1, comment), `src/browser/view/credit-lines.ts` (2/2, comment)
- `tests/balance/agreement.test.mjs` 11, `tests/balance/trace.test.mjs` 11, `tests/sim/action-targets.test.mjs` 38, `tests/sim/craft-and-tend.test.mjs` +43, `tests/sim/judging-record.test.mjs` +50, `tests/view/item-verb-panel.test.mjs` 54, `tests/view/judging-cache.test.mjs` 6, `tests/view/program-editor.test.mjs` 7, `tests/view/rule-editor.test.mjs` 5.

## Findings

### Important 1 — fixed

- `tests/view/item-verb-panel.test.mjs`: `ACTIONS` imported; constants `RECIPE = ITEMS.bandage.recipe`, `MAKING_PRICE` (built from `recipe.uses`: each piece's count and a shape of the three forms `name|few|many` of `ITEMS[item]`, joined by `", "` as `priceText` joins), `CRAFT_FIELD`, `CRAFT_CELL` (regexps), `MAKING_TIME = ${RECIPE.minutes} min`, `TEND_TIME = ${ACTIONS.tend.minutes} min`. `cellNamed` takes a string or a RegExp. All eleven literals (`2 mchy`, `10 min`) replaced; the splint rows (the test's own laid item: 3 sticks, 15 min) and „Opatrunek (1 opatrunek)” (one piece of the bandage, not named preliminary by the task) stay as they were. Assertions changed from `assert.equal` to `assert.match` where the price is by shape; a missing cell now fails with a message (`assert.ok(bandage, …)`) rather than a TypeError.
- `tests/view/program-editor.test.mjs`: `actionTime(state, "tend"[, "bandage"])` expected `` `${ACTIONS.tend.minutes} min` `` (`ACTIONS` was already imported).
- `tests/view/rule-editor.test.mjs`: `ACTIONS` imported; `timeOf("Opatrz")` expected `` `${ACTIONS.tend.minutes} min` ``; the data-file comment now names only „Zbierz” and „Obchód”.
- Other literals found by the search of `git diff aff09e98 HEAD -U0 -- tests` and removed the same way: `tests/sim/action-targets.test.mjs` (`sentWithMoss`: chest of 2 moss, trip plan `{moss, 2}`, precondition `backpack.moss === 2`) now built from `ITEMS.bandage.recipe.uses` (`BANDAGE_USES`, `BANDAGE_PIECES`); `tests/balance/agreement.test.mjs` and `tests/balance/trace.test.mjs` (`itemBelow("moss", 2)`, the gathering threshold that equals the recipe's moss) now `MOSS_FOR_BANDAGE` / `moss` read from the recipe. Left as they are, with the reason: `now-lines.test.mjs` `minutesLeft: 4, minutes: 10` and „zostało 4 z 10 min” (input handed to a formatter, no data read), `saved-game.test.mjs` `minutesByAction` numbers (a crafted document, no bandage number), `program-editor.test.mjs` `actionTime(.., "gather", ..) === "10 min"` (the gather's own 10 minutes), tests of the items laid by the tests themselves.
- Check that shows it: with the data changed for a moment (`items.ts` bandage recipe `count: 5`, `minutes: 7`; `actions.ts` tend `minutes: 12`; restored after) the six files `item-verb-panel`, `program-editor`, `rule-editor`, `action-targets`, `agreement`, `trace` all exit 0, so the numbers are changeable by data alone. A test still fails when the shown text is wrong: the shape holds the data's count and a form of the item's name, and the times are exact strings.

### Minor 2 — fixed
`judging-record.ts:72` now „about one in 2^62”. Comment only. Typecheck and `judging-record.test.mjs` exit 0.

### Minor 3 — fixed
Two tests added in `tests/sim/judging-record.test.mjs` (both with D-441's changed sentence as `decision:`): „two contents whose group names, put together without their quotes, read as the same text have each a fingerprint of its own” (one group whose name holds the end of a group and the start of the next vs the two groups it reads as, unquoted) and „the fingerprint of every content is its whole sixteen digits, one whose two words start with a zero included” (4000 contents, with preconditions that some fingerprint starts with 0 in each word, all match `/^[0-9a-f]{16}$/`).
Seen failing by the mutations the review named: `String(value)` in place of the quoting at `judging-record.ts:59` fails the first test (`npm test -- tests/sim/judging-record.test.mjs` exit 1, before the code was restored; an earlier version of the case, with the literal of the condition still quoted, did not fail — corrected to the unquoted text of the condition, then failed); `.padStart(8, "0")` removed at `:64` fails the second (exit 1). Both restored; the file passes (exit 0).

### Minor 4, 5, 6 — fixed (renames and one value)
- `judging-cache.test.mjs:445`: „a fingerprint of nine hundred digits”, `"0".repeat(900)`; the stored value is 997 characters, under `MAX_VALUE_LENGTH` 1 024. Seen: with the fingerprint regex of `isContentFingerprint` loosened for a moment to `/^[0-9a-f]+$/`, the case „… of nine hundred digits reads as none” fails, alongside those of fifteen and seventeen digits (`npm test -- tests/view/judging-cache.test.mjs` exit 1); restored, exit 0.
- `:882` now „a value whose character or program the loaded game once gave and no longer holds is kept where the side the game still holds is at or above it, and so is a value or a key of no form of the cache's” (read from the case and from `isAboveLoaded`: the keys name a character or program the game once gave, with the value's other side not above the held one, plus malformed value and keys).
- `:464` now „a value of exactly the four fields version 1 held”. Note: this value is identical to the generated case „a value without fingerprint” (VALID minus `fingerprint`), so the case is a duplicate; the handoff said rename only, so it stays and is named for what it holds.

### Minor 7 — fixed
`tests/sim/action-targets.test.mjs`: `named` removed; the refusal is still asserted by `instanceof ProgramCheckError`, and the message must name the value (`String(item)`) only where it is a non-empty string or a number (`namedInRefusal`); the `""` case no longer asserts the vacuous `includes("")`. File passes (exit 0). I did not mutate the message to see the assertion fail.

### Minor 8 — contested
Evidence: `tests/sim/saved-game.test.mjs` „Opatrz fractional” sets `tend = 4.5` and `gather = 55.5`. In `src/browser/sim/saved-game.ts` (`record`, lines ~1056-1078) every count goes through `count()` (an integer from 0) and the sum must equal `run.minute` (212, an integer). A document in which only `tend` is fractional has a non-integer sum, so it is also refused by the sum; to keep the sum, another count must be fractional, and that one is refused by `count()` itself. No document is refused only for the fraction of „Opatrz” while the sum holds, so the isolation the finding asks (adjusting another count so that the sum holds) cannot be made; the reviewer's own note says the same. The fraction check of `tend` is observable only through a mutation that truncates or rounds `tend` (for such a mutation, `tend = 4.5, gather = 56` would be caught), which is a different case. The case is unchanged; it goes to the request's list. The same structure stands in the existing cases for `explore`/`wander` (lines ~2145-2146).

### Minor 9 — fixed
`credit-lines.ts:51-53` comment now „the items (the resources among them), then the campfire …”. Comment only.

### Minor 12 — fixed
Two tests added in `tests/sim/craft-and-tend.test.mjs`:
- „„Wytwórz” of a recipe of two pieces where either piece is gone by its end changes nothing and takes nothing, the piece still held included”: the existing laid item `SPLINT` (stick 3, moss 1, laid on `ITEMS` and removed by `withRows`), the numbers from its recipe; the whole recipe makes it (control), and each of three states lacking a piece (second piece gone; first piece gone; first piece one short) leaves the backpack as it was and adds no practice. Seen: `recipe.uses.some(...)` → `every(...)` at `run.ts:338` makes it fail (exit 1), restored.
- „„Opatrz” where the backpack holds no piece of its target at its end changes nothing and gives nothing back”: a run with an empty backpack and health 50, carrying „Opatrz”; the backpack stays as it was, no negative count, health only the minute's own 50.05. Seen: `backpack[action.item] < 1` replaced by `false` at `run.ts:355-356` makes it fail (exit 1), restored. Its `decision:` is D-145's first sentence (the closest sentence; no sentence holds the empty-backpack end itself).

### Minor 13 — fixed
Second `decision:` line added to the case at the former `:520`: D-363 `"The rule panel shows beside an action what it costs, read from the game's data, in brackets after the action's name"`, the start of D-363's first binding sentence as `foundations/decisions.md:9969` holds it (the form the other tests of the file already quote); the first line kept. The foundation check passes (exit 0).

## Checks (command → exit code)

- `npm test -- tests/view/item-verb-panel.test.mjs` 0; `…/program-editor.test.mjs` 0; `…/rule-editor.test.mjs` 0; `…/judging-cache.test.mjs` 0; `…/icons.test.mjs` 0 (covers the code of the credit-lines comment); `tests/sim/action-targets.test.mjs` 0; `tests/sim/craft-and-tend.test.mjs` 0; `tests/sim/judging-record.test.mjs` 0; `tests/balance/agreement.test.mjs` 0; `tests/balance/trace.test.mjs` 0 (each run after Prettier, on the final files)
- Failing runs (mutations, restored after each): `judging-record.ts:59` unquoted → `judging-record.test.mjs` exit 1; `:64` no padding → exit 1; fingerprint regex loosened → `judging-cache.test.mjs` exit 1; `run.ts:338` `every` → `craft-and-tend.test.mjs` exit 1; `run.ts:355` `false` → exit 1
- `npx prettier --write` on the changed files (only `tests/balance/trace.test.mjs` reformatted); `npx eslint <changed files>` exit 0
- `npm run typecheck` exit 0
- `node tests/quality/eslint-size-rules.mjs` exit 0 („0 functions and files over a threshold in 343 files”)
- `python -B .the-way/elements/common/foundation_check.py` exit 0 („0 errors”)
- Not run (by the handoff): `npm test` with no argument, the whole of the tests.

## Own-work check
Requirement most likely unmet: *To do* 2 and 4 — the bandage's numbers change by data alone. Check: data changed for a moment (count 5, minutes 7, tend 12 minutes) and the six changed files above run: all exit 0. The source files were restored (`git status` clean after the commit).

## Reaches beyond the handoff
- `guidelines/testing.md:178` (the row of `judging-cache.ts`) lists the case of a fingerprint „z tysiącem cyfr”; the case now has nine hundred digits (Minor 4). Not changed: a guideline is outside this fix's boundary. The foundation check passes. Suggest the return step reword it („z dziewięciuset cyframi”).
- Read for the work of the findings beyond the files named: `src/browser/view/item-target-pick.ts` (`priceText`, to join the price shape as the game does), `src/browser/view/program-editor.ts` (`actionTime`, `actionPriceText`), `src/browser/sim/programs.ts` (`shown`), `src/browser/sim/saved-game.ts` (`record`, `count`), `src/browser/view/judging-cache.ts` (`isAboveLoaded`, `MAX_VALUE_LENGTH`), `foundations/decisions.md` D-363 (lines 9967-9990 only, the entry whole), and `guidelines/coding.md`, `guidelines/testing.md` whole (the second in two reads, for its rules). `.the-way/task-cycle/change/SKILL.md` and `fix.md` whole.

## Unread material
- `reports/review-whole-report.md` and `reports/foundation-report.md`: not read (the findings file held the reviewer's words; nothing needed them).
- `guidelines/testing.md` lines 208-509: read the headings of the rest by search, and lines 326-375; not read whole (they concern trust-boundary rows of other parts, mutation, flaky tests and recipes).
- Decision entries D-82, D-142, D-145 were not read whole: I used the quotations the tests already hold; D-363 read whole.

## Searches not found or unclear
- none (the quotation of D-363 was found; the finding's „first binding sentence” start is quoted as the other tests of the file quote it).

## Choices
- Price by shape (count and the three forms of the name) rather than a computed Polish plural form, as `program-editor.test.mjs` already does; cost if wrong: a wrong plural form of a recipe's piece would pass these panel tests (the forms have their own test in `program-editor.test.mjs`, line ~1832).
- `sentWithMoss` keeps its name though it now carries the recipe's pieces; renaming was not asked.

## Working copies
`.runs/fix-b/` in the worktree (`.runs/fix-b`): backups of `items.ts`, `actions.ts`, `judging-record.ts`, `run.ts` before the mutations, the range diff, test outputs and the commit message; removed before return (deleted by its full path; `.runs/` no longer holds it; no remainder).
