PASS 814cb8b17fa65351c179a2436256cd3ff21cdd4c

# Review of slice 2 of `zapas-i-wskrzeszenie`: the load admits what a completed run of a solved map brought out

- Range: `f30dffb7..814cb8b1`, one commit, `src/browser/sim/saved-game.ts` and `tests/sim/saved-game.test.mjs`. `git rev-parse HEAD` in the worktree gave `814cb8b17fa65351c179a2436256cd3ff21cdd4c`, the head given.
- Variant: a planned slice (its *Risk* names the trust boundary `src/browser/sim/saved-game.ts`).
- Counts: blocking 0, Minor 1, out of scope 0.

## What the change does

`deposited` in `src/browser/sim/saved-game.ts:772-792` loses its `marked` parameter and the one line `if (marked && put.length > 0) refuse();`. Every other check stays, in the same order: a `null` deposit exactly where there is no completion (`saved-game.ts:777-781`), the list read by `tripList` (an item of the data, each at most once, a safe count from 1), and each entry found in the frozen bring plan at or after the previous entry's place with a count at most the planned one (`saved-game.ts:783-790`). The call in `mapRun` (`saved-game.ts:1064`) drops the mark. The doc comment of `deposited` (`saved-game.ts:767-771`) now says that a manual run of a solved map completes by the same rule (D-189). `SAVED_GAME_VERSION` stays 7 (`saved-game.ts:82`); the shape is unchanged.

In the test file the `CRAFTED` entry "a deposit at the completion of a marked run" is removed and a new case, `tests/sim/saved-game.test.mjs:2329-2368`, loads a marked completion depositing the planned counts (berry 5, stick 20) and refuses as `shape` a marked deposit above its planned count (berry 6), of an item the frozen bring plan lacks (moss 1) and out of the bring plan's order (stick 4, berry 2).

## Judgment against the task, the foundation and the guidelines

- Task, To do 2 and Question 1 (`task.md:27-30`, `:39-44`): at a completion a manual run of a solved map brings to the chest what the frozen „Wynieś” list names, cut as at every other completion. The load is the part this slice owns; it now admits exactly that and nothing beyond it. The game itself does not yet make such a state (`src/browser/sim/trip.ts:117` still returns `[]` for a marked run); that is Slice 3's by the plan, and admitting the state first is what D-386 needs for Slice 3 not to write a save its own load discards.
- D-189 (as written by Slice 1): "A manual map run of a map already solved takes its equipment from the chest and brings its loot out to it as every other map run does (D-179)". The load's rule for a marked completion is now the rule of every completion; nothing in the change restates it more broadly.
- D-214: the mark still binds as before; `saved-game.ts:1058` (a completion needs its map among the solved maps; a run going on holds the mark exactly when its map is solved) is untouched.
- D-386: the load admits every state the game makes — a superset is allowed, and the only newly admitted documents are marked completions whose deposit obeys the rule of D-179.
- D-206, invariant `save-version`: the shape does not change, so the version stays; the document of the test is not rewritten.
- Invariants `simulation-isolation`, `simulation-inputs`: no import or write added; `deposited` still returns the new list `tripList` built.
- Invariant `trip-run-end` (after Slice 1: "completion deposits the frozen bring list's clipped contents"): the load's check no longer carries the dropped exception "on a manual run of a solved map nothing".
- Invariant `solved-map-manual-run` (after Slice 1: "adds no practice to any character skill"): the load still requires `completionSettlement` to be null on a marked completion (`saved-game.ts:1071-1074`), unchanged.
- `guidelines/coding-saved-game.md`, "Odmowa zamiast wyjątku" ("Wolno odmówić więcej, niewolno mniej"): see the trust-boundary walk below; the change refuses less only where D-189 now requires it.
- `guidelines/coding-saved-game.md`, "Plan wyprawy i skrzynia": "`deposited` jest `null` dokładnie wtedy, gdy przebieg nie ma ukończenia, a przy ukończeniu jego pozycje idą w kolejności `bringPlan`, każda najwyżej w zaplanowanej liczności (D-179, D-189)" — the guideline already states the rule without an exception for a marked run, and the code now agrees with it.
- `guidelines/coding.md`, size of a function and a file: the change only removes lines from `saved-game.ts`, which stands over the threshold already; nothing is added to it.
- `guidelines/testing.md`, "Changing an existing test": the removed `CRAFTED` entry has its reason on the side of the requirement — D-189 as changed by Slice 1 — quoted by a `decision:` line of the new case, and the behaviour it protected (refusal of a marked deposit) is replaced by the case that now protects the admitted rule and its three limits. "Where the expected value comes from": the expected values are the document's own frozen bring plan (berry 5, stick 20, `saved-game.test.mjs:444-447`) and the rule of D-179; the product computes none of them. The `decision:` quotes of D-189 and D-179 match the entries word for word.

## The trust boundary: a crafted document of a completed run of a solved map

Walked against the code at the head, each case named with what refuses it:

- Entry not of the bring plan: `bringPlan.findIndex` gives −1, refused (`saved-game.ts:788`); the new case asserts it for a marked run (moss 1).
- Entries in another order: the search starts at `from`, past the previous entry's place, so an earlier item is not found, refused; the new case asserts it (stick 4, berry 2).
- A count above the planned one: refused (`saved-game.ts:788`); the new case asserts it at plan + 1 (berry 6).
- A count of 0, negative, fractional, non-finite, beyond the safe integers, as text; an item twice; an item off the data; a list with a hole; a value that is no list: refused by `tripList`, which reads every deposit whatever the mark; the existing `CRAFTED` entries (for example "a deposit of 0 pieces", `saved-game.test.mjs:1510`) cover that path, which no longer depends on the mark.
- A deposit on a run that did not complete, marked or not: `if (!completed) refuse()` (`saved-game.ts:781`), unchanged and independent of the mark; `CRAFTED` "a deposit before a completion" (`saved-game.test.mjs:1478`).
- A completion with no deposit, marked: refused (`saved-game.ts:778`); `CRAFTED` "a marked completion without its deposit" (`saved-game.test.mjs:1537`) still stands.
- A marked completion on a map not among the solved maps: refused by `saved-game.ts:1058`, unchanged.
- A marked completion that holds a completion settlement: refused, since `completionSettlement` must be null where `solvedMapRun` is set (`saved-game.ts:1071-1074`), unchanged.
- A deposit on a run not marked: was and stays admitted by the same rule.
- A death with a deposit: a death leaves `completion` null, so a non-null deposit is refused, unchanged.

Consumers of a now-admitted crafted document: `src/browser/view/trip-lines.ts:80-87` prints `run.deposited` at a completion whatever the mark, which is the D-185 line To do 2 asks for after such a completion; no other reader of `deposited` assumes `[]` for a marked run (search of `src/` for `solvedMapRun|\.deposited`).

Everything the load refused before and the change does not allow is still refused: the diff removes one refusal and no other line of a check.

## Findings

### Critical

none

### Important

none

### Minor

1. `tests/sim/saved-game.test.mjs:2332` — the new case carries `// invariant: solved-map-manual-run`, while that invariant now says only that such a run "adds no practice to any character skill" (`foundations/invariants.md:1060`) and the case checks nothing of practice; it checks the load's rule for the deposit. The invariant's method is `test`, its check the cases that cite it, so a reader who follows the citation finds a case that would stay green were the practice rule broken. The plan asked for the invariant as the reason of the change (the clause "leaves the chest as it was" was removed from it by Slice 1), which explains the citation, and the case beside it at `saved-game.test.mjs:924` cites the same invariant for the mark alone, so this follows the file's habit. It costs nothing today; were it fixed, the reason could stand in the comment and the invariant line move to a case that holds it, or `trip-run-end`, whose dropped exception this case does check, be named too. Polish.

## Declined to judge

- The comments of `src/browser/sim/types.ts:333` and `:336-339` that still say a marked run deposits `[]`/nothing: Slice 3's by the plan, as the dispatch says.
- `src/browser/sim/trip.ts:117` (`tripLoot` returning `[]` for a marked run) and the game-made state "the completion of a marked run, its deposit empty" with its precondition `assert.deepEqual(doneMarked.run.deposited, [])` (`tests/sim/saved-game.test.mjs:3040`, `:3128`): the game's behaviour of bringing items out is Slice 3's.
- The saved shape of the team's resurrection and its checks (the dispatch's step-4 answer on counts, moments and uses): no line of this range touches it; it belongs to the slice that changes the shape (Slice 6 by the plan's Goal of this slice).

## Checks run

- `npm test -- tests/sim/saved-game.test.mjs` in the reviewed worktree at `814cb8b1`: exit 0, tests 41, pass 41, fail 0.
- The same command in my worktree of the base `f30dffb7` with the head's `tests/sim/saved-game.test.mjs` copied in: exit 1, tests 41, pass 40, fail 1 — the new case "a completion of a marked run depositing its planned counts loads, and a deposit beyond them is refused as shape", actual `{ ok: false, reason: 'shape' }`. The new case fails on the base and passes at the head.
- StrykerJS, as `guidelines/testing.md` "Mutation testing" gives, on the changed function: `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/saved-game.ts:772-792"` in my worktree at `814cb8b1`: exit 0, 33 mutants, 33 killed (28 by `saved-game.test.mjs`), 0 survived, 0 without coverage.
- `npx prettier --check src/browser/sim/saved-game.ts tests/sim/saved-game.test.mjs`: exit 0. `npx eslint` on the same two files: exit 0.
- Not run: the full `npm test`, `foundation_check.py`, `check_instructions.py` and the size test `tests/quality/test_function_and_file_size.py` — the full gate is the cycle's own run before the request; the size rule was judged by reading the diff (lines only removed from `saved-game.ts`).

## Reaches beyond the dispatch

- `foundations/decisions.md` D-179 (heading at line 8350), read whole: the new case quotes it by a `decision:` line, and the rule of every completion the slice extends is its.
- `git show 46cfec71:foundations/invariants.md`, the entries `solved-map-manual-run` and `trip-run-end` at the plan's base: to see which clause Slice 1 removed, for the judgment of the cited invariant (Minor 1).
- `src/browser/view/trip-lines.ts:60-107` and a search of `src/` for `solvedMapRun|\.deposited`: the readers of a now-admitted deposit on a marked run, for the trust-boundary walk.
- `foundations/part_map.md:33-64` (simulation) read; it names `saved-game.ts` a trust boundary.

## Working copies

- `.runs/review-s02/base`: a detached worktree, first of `f30dffb7` (with the head's test file), then of `814cb8b1` for the mutation run, with a junction `node_modules` to the reviewed worktree's dependencies. The junction was removed first (the real `node_modules` checked present afterwards), then the worktree with `git worktree remove --force` and `git worktree prune`.
- `.runs/review-s02/` with the logs `head.log`, `base.log`, `stryker.log` (and Stryker's `.stryker-tmp` and `.runs/stryker/` inside the worktree): removed with the directory; the report states their results, so none is kept in `reports/`. Nothing remains.

## Unread material

- `guidelines/testing.md` read whole in two ranges (1-214, 215-509).
- `src/browser/sim/types.ts`: read in part, lines 300-359 (`GameMapRun`), the part the change reaches; not whole.
- `.runs/task-cycles/zapas-i-wskrzeszenie/task.md` and `plan.md`: read only through the passages the handoff copies.
- `src/browser/sim/saved-game.ts` and `tests/sim/saved-game.test.mjs`: read by ranges around the change and its callers (`saved-game.ts:700-820`, `:1000-1139`; test `:436-455`, `:795-965`, `:1460-1580`, `:2300-2368`, `:3000-3139`), not whole.

## Searches not found or unclear

- `Grep` of `saved-game.ts` for `deposits nothing|nothing from the chest|empty deposit|marked|its deposit empty|takes nothing`: no match — no comment of the file still says a marked run deposits nothing.
- `cmd //c mklink /J` from Git Bash failed with "Invalid switch"; the junction was made with PowerShell `New-Item -ItemType Junction` instead.
- The first `npm test` at the head failed to start only because my log directory did not exist yet; rerun after creating it.
