PASS 0a41bd058c99181fb05b8e49ecfa5a7b01e9e8ab

# Review 1 — slice 1, the remembered judging holds the fingerprint of the content it judged

Range `ed70970ab7a3215b8fe48b0178973483ad54d26b..0a41bd058c99181fb05b8e49ecfa5a7b01e9e8ab` (one commit, `0a41bd05`). `git rev-parse HEAD` gave `0a41bd058c99181fb05b8e49ecfa5a7b01e9e8ab`; `.the-way` stands on the pinned `19e5774aed6d1d628042e23deccc110ed9f112c0`.

Blocking findings: 0. Minor: 5. Out of scope: 0 (Declined to judge: 4 lines).

## What was checked against the task

- *To do* 15 / spec Decision 5 unit 1: `contentFingerprint` (`src/browser/sim/judging-record.ts:74-90`) hashes the canonical text of `[program.groups, program.tripPlan]`, with the keys of every object sorted, arrays kept in order, strings JSON-quoted and the identity counters left out. That is the same pair `contentDiffers` compares (`src/browser/sim/programs.ts:379-384`). The canonical text is injective over the content types (`src/browser/sim/types.ts:28-78`: no `null`, no lists of numbers, strings quoted, keys quoted). So the fingerprint can match for different contents only through a hash collision. It uses no clock, no random number and no host global (`test_simulation_isolation.py` passes). It is stable across a save and a load, because the content types have no optional or undefined fields.
- Unit 2: `recordOfJudging` takes the fingerprint of the triple's program in the state it read (`:125`). `markOfRecord` adds the fingerprint equality to the conditions it already had (`:168`).
- Unit 3: the key prefix is `loop2-judging-2|` (`src/browser/view/judging-cache.ts:44`), and `fingerprint` is the fifth field. Its check is `isContentFingerprint` (`/^[0-9a-f]{16}$/`; JavaScript's `$` does not match before a trailing line end, and a test covers that case). The tidying at opening only touches keys under the version-2 account prefix, so values of version 1 are neither read, written nor removed. `isAboveLoaded` has the same body as before.
- Unit 4: the new comment of `isAboveLoaded` (`judging-cache.ts:258-267`) says what spec Decision 5 unit 4 says, nearly word for word, and the wrong sentence is gone. A new test pins the behaviour the comment now describes.
- Trust boundary (`judging-cache.ts`): the crafted fingerprints in `BAD_VALUES` (missing; `null`, a number, a list, an object, a boolean; empty, 15, 17 and 1000 digits, capital letters, `g`, a sign, white space, a line end, `0x`) all read as none and throw nothing. Under that check the value cannot be prototype-polluted (`hasOnlyFields` uses own names, as before). Nothing of a stored value enters the game state.
- `guidelines/testing.md`: only the row of `src/browser/view/judging-cache.ts` changed. It says "five fields", names the fingerprint cases and the version-1 case as the test file holds them, and names the new removal case. Every case title the row adds exists in the test file.
- Tests of the fingerprint take their expectation from whether `editProgram` / `saveCopyIntoProgram` / `advanceMinutes` raise the content revision (D-442), not from the function's own output. They do not call the fingerprint code to compute the expected value.
- No reserved choice is taken. No screenshot is in the range. No file is over the size threshold.

## Findings

### Critical

none

### Important

none

### Minor

1. **The comment overstates the strength of the hash** — `src/browser/sim/judging-record.ts:71-72` ("two different contents meet in it with a chance of about one in 2^64").
   - **What is wrong:** both lane multipliers are ≡ 1 mod 4 (`2654435761` = 0x9E3779B1, `1597334677` = 0x5F356495), and both seeds are ≡ 3 mod 4 (`0xdeadbeef`, `0x41c6ce57`). So before the final mix, the low two bits of the two lanes are the same function of the input: the XOR of the units' low two bits. The final mix is a bijection, so the output carries at most 62 bits.
   - **Evidence:** a probe over 100,000 texts found the low two bits of the lanes equal in 100,000 of 100,000, and the low three bits equal in 50,522.
   - **Why it matters:** the spec's bound of one in 2^52 is still met on the same "behaves as random" footing that the author's report states. But the sentence in the code claims four times more than the function gives. A reader who later weighs a shorter form, or another use, starts from the wrong number.
   - **Fix:** say "about one in 2^62", or drop the figure.

2. **Two properties of the fingerprint's form and injectivity have no test** — `src/browser/sim/judging-record.ts:59` and `:64`. These are survivors of the StrykerJS run that `guidelines/testing.md` "Mutation testing" asks of the reviewer, classified below.
   - **Real gap: string quoting (`:59`).** The mutants `typeof value === "string" ? … : …` → `false ? …`, `!==` and `""` all survive. No test fails if strings are written unquoted. But quoting is what keeps the canonical text injective over the one free text in the content, the group name. With strings unquoted, a group named `x,"rules":[]},{"condition":{"kind":always},"id":2,"name":y` gives the same text as two groups `x` and `y`.
   - **Real gap: padding of the hex words (`:64`).** `padStart(8, "0")` → `padStart(8, "")` survives. Without padding, about one fingerprint in eight would be shorter than 16 digits. `isContentFingerprint` would then refuse its stored value at the next reading, and the judging would vanish at a reload. Only the one content in the form test is checked against `/^[0-9a-f]{16}$/`.
   - **Equivalent or not worth a test:** `:50` (`Array.isArray` → `false`; arrays then go through the object branch with their indices as keys, still injective for these types), `:51` and `:57` (`join("")`; values are quoted strings or objects, and the content has no lists of numbers), `:52` (`value !== null` → `true`; the content types hold no `null`), `:78` (`<=`; a constant extra step, so the hash stays deterministic), and `:114`, `:119` (the text of an Error message).
   - **Grade:** Minor, because the code is right; what is missing is the assertion that holds it.

3. **One crafted-fingerprint case is refused by the length cap, not by the fingerprint check** — `tests/view/judging-cache.test.mjs:445`, the case "a fingerprint of a thousand digits".
   - **What is wrong:** the whole value is 1,097 characters. `MAX_VALUE_LENGTH` (`src/browser/view/judging-cache.ts:48`) is 1,024, so `readValue` returns none before it reaches the fingerprint check. The case would pass with no fingerprint check at all. The author's own mutation list confirms this: the case is not among the nine that failed with the form check reduced to `typeof … === "string"`.
   - **Why it matters:** the row of `guidelines/testing.md` lists "z … tysiącem cyfr" among the fingerprint forms the test refuses. The requirement still holds: the value reads as none, the 17-digit case covers a fingerprint that is too long, and `tests/sim/judging-record.test.mjs` checks `isContentFingerprint` directly on 16,000 digits. But the case does not test what its name says.
   - **Fix:** use a length under the cap, for example 900 digits (a value of 997 characters).

4. **An old test name still reads as the sentence the task called wrong** — `tests/view/judging-cache.test.mjs:882`, "a value of a triple whose character or program the loaded game once gave and no longer holds, or one that is no value of the cache's, is not removed by the above check".
   - **What is wrong:** after unit 4, the correct statement is that such a triple *is* removed where the side the loaded game still holds stands above. The new test at `:905` pins exactly that. The old test passes only because its values sit at or below the held side.
   - **Why it matters:** its name says the general sentence that *To do* 15 and spec Decision 5 unit 4 call untrue, next to a test that says the opposite.
   - **Fix:** rename it to what it checks, for example "… whose held character or program does not stand above it …".

5. **A muddled and redundant case name** — `tests/view/judging-cache.test.mjs:464`, "a fingerprint of the form beside a value of version 1, which has none".
   - **What is wrong:** the value has no fingerprint at all. The generated title ("a stored value that is a fingerprint of the form beside a value of version 1, which has none reads as none …") does not say that, and the case repeats "a value without fingerprint".

## The author's report, checked

- **Own-work check:** it names the requirement where the change is weakest (equal and different exactly as D-442 lists, and the collision bound), and its checks reach that requirement. Its statement that the bound is unproven for a non-cryptographic hash stands. Minor 1 refines the figure.
- **Walk:** the report says the slice "alters no behaviour a user sees by itself". That is not quite so. In the running product at this head, `maps-screen.tsx:368` already reads the version-2 cache through `markOfRecord`. So every judging a browser stored under version 1 stops showing beside „Program:” until it is judged again. D-441 accepts this ("a key of another version is neither read, written nor removed"). No finding, but the walk judgment should name it.
- **Mutation and coverage claims:** consistent with my Stryker run (107 killed, 1 timeout, 12 survived; 90.00 % on lines 48–172).

## Declined to judge

- The `foundation_check.py` errors at `tests/sim/data.test.mjs:206`, `tests/view/program-editor.test.mjs:1058`, `tests/view/rule-editor.test.mjs:1528` (quotations of D-290) and `foundations/invariants.md:236` (`content-identifiers`). They come from the foundation step's commit `ed70970a`, outside this range, and from files later slices own.
- `tests/view/maps-screen.test.mjs` and `tests/sim/judging.test.mjs`. The section says they fail until Slices 2 and 3; I did not run them.
- `NaN` or `Infinity` in a program's content, where `sameData` and the fingerprint would disagree. The content types and the editor give finite numbers only; it is outside the task.
- Whether D-441's Verification sentence "for the fingerprint of the content until tests of it stand, an agent compares …" should now change, since tests of it stand. That is the foundation step's entry, not this slice's files.

## Checks run

- `npm test -- tests/sim/judging-record.test.mjs`: exit 0 (14 tests).
- `npm test -- tests/view/judging-cache.test.mjs`: exit 0 (107 tests).
- `npm test -- tests/view/judging-cache-page.test.mjs`: exit 0 (6 tests).
- `npm test -- tests/invariants/test_simulation_isolation.py`: exit 0 (5 tests).
- `npm run typecheck`: exit 0.
- `node_modules/.bin/eslint` on the four changed code and test files: exit 0.
- `node_modules/.bin/prettier --check` on the same four files: exit 0 ("All matched files use Prettier code style!").
- `node tests/quality/eslint-size-rules.mjs`: exit 0 ("0 functions and files over a threshold in 338 files").
- `python -B .the-way/elements/common/foundation_check.py`: exit 1, 3 errors plus one listed item, none in this slice's files (see Declined to judge).
- StrykerJS: `node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.review.json`, exit 0. It ran in a detached worktree of the head, with `mutate` set to `src/browser/sim/judging-record.ts:48-172` and only `tests/sim/judging-record.test.mjs` as its test file. The project's config could not be used: it runs `tests/sim/judging.test.mjs`, which fails at this head by plan (Slice 3), and that would stop the initial test run. Result: 107 killed, 1 timeout, 12 survived, 0 no coverage; the survivors are classified in Minor 2.
- A probe script run with `node` against the built `dist/browser/sim/judging-record.js`, exit 0. It showed:
  - the shared low bits of the lanes (Minor 1);
  - the length of the 1000-digit value (Minor 3);
  - `-0`/`0` giving the same fingerprint, and `"1"`/`1`, `null`/`"null"`, and an undefined field versus none giving different ones;
  - keys of the trip plan in another order giving the same fingerprint;
  - 200,000 pairs of texts differing by two case flips with no lane and no full collision.
- Not run: the full `npm test`, which the handoff forbids; it is the cycle's own run.

## Reaches beyond the handoff

- `src/browser/sim/types.ts:20-79`: the content types (`Condition`, `Action`, `RuleGroup`, `TripPlan`), to judge whether the canonical text is injective and whether Stryker survivors are equivalent.
- `stryker.config.json` and `package.json`: to run the mutation testing that `guidelines/testing.md` asks of the reviewer.
- `tests/view/judging-cache-page.test.mjs`: its test names and its reload path, to see whether a remembered judging is shown again after a load.
- The callers of `markOfRecord`, `recordOfJudging` and `JudgingRecord` in `src/` and `tests/`, found by search: `src/browser/sim/judging.ts:110`, `src/browser/view/maps-screen.tsx:368`, `tests/view/maps-screen.test.mjs:145`, `tests/sim/judging.test.mjs:476`.
- `the author's global rules for scripts` and `git.md`: the author's rules, which the session instructions and a hook required before a script and a worktree.

## Working copies

- `.runs/review-1/` held the logs of the checks, the probe script `probe.mjs` and the Stryker log.
- `.runs/review-1/wt/` was a detached worktree of `0a41bd05`. Its `node_modules` was a junction to the reviewed worktree's `node_modules`, and it held a config `stryker.review.json`.
- Removal:
  - the junction was removed first, as a link only (`rmdir` without `/s`; the reviewed worktree's `node_modules` was checked present afterwards);
  - then the worktree, with `git worktree remove --force` and `git worktree prune` (both exit 0);
  - then the directory `.runs/review-1/`, with `rm -rf` on its full path (exit 0).
- `git worktree list` no longer shows the copy, `ls .runs` shows no `review-1`, and `git status` of the reviewed worktree is clean. Nothing remains.
- The `dist/` that `npm test` built in the reviewed worktree is the product's own output.

## Unread material

none. The passages, foundation entries, guideline files and `src/browser/AGENTS.md` the handoff names were read whole, `guidelines/styleguide-browser-view.md` among them. Of `src/browser/sim/programs.ts`, I read the named ranges (`sameData` at 309–320, `contentDiffers` at 374–386) with their surroundings (295–400), not the whole file. The rest of that file is not touched by the slice.

## Searches not found or unclear

- Whether the game's content can hold `null`, an undefined field or a list of numbers: not found in `src/browser/sim/types.ts`, so I take it that it cannot. The probe and the mutants were judged on that.
