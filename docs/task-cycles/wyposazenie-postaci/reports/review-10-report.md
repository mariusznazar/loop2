FAIL 8f896859e4d1767c36995d1ea95b01affbf94f39

# Review-10 — Slice 10: a gear change the player makes erases the character's remembered judgings

Range `75df8a09..8f896859` (one commit, `8f896859`), variant: a planned slice. `git rev-parse HEAD` in the worktree was `8f896859e4d1767c36995d1ea95b01affbf94f39`, the head given. `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f`, the pinned commit.

## Blocking findings

### Important 1 — the new test file imports Node's assertion module beside the jsdom harness, so the gate's test of `document-test-memory-limit` fails

- Place: `tests/view/judging-cache-gear.test.mjs:10` (`import assert from "node:assert/strict";`) with `tests/view/judging-cache-gear.test.mjs:17` (`import { inAct, press, withPage } from "./page-document.mjs";`).
- What is wrong: the file builds the screen Mapy on jsdom through `tests/view/page-document.mjs` and takes `assert` from `node:assert/strict`. The invariant `document-test-memory-limit` (`foundations/invariants.md:1198-1206`) says "a test file that imports it imports no assertion module of Node", and D-268 says such a file "takes from it an `assert` ... never `node:assert`". The rule "Tests on a document imitation" of `guidelines/testing.md:326-342` says the same, and that the harness is imported "przed wszystkim innym"; the file imports it eighth, after the modules of `dist/` that load React.
- Why it matters: the repository's own guard fails, so the one command `npm test` fails on this head; and the guard exists because Node's `assert` writes a whole element into its message when a comparison on an element fails, which can take the machine's memory.
- Evidence: `npm test -- tests/view/memory-limit.test.mjs` on the head: exit 1, 36 pass, 1 fail — `the tree holds no file that goes round the harness of a document imitation`, actual `[ 'tests/view/judging-cache-gear.test.mjs imports an assertion module of Node beside the harness' ]`. Output kept at `docs/task-cycles/wyposazenie-postaci/reports/review-10-memory-limit-run.txt`. The executor did not open `guidelines/testing.md` (its **Unread material**) and did not run this test, which is outside the slice's *Checks*.
- Fix: make `import { assert, inAct, press, withPage } from "./page-document.mjs";` the file's first import and drop `node:assert/strict`, as `tests/view/maps-record.test.mjs:10` and `tests/view/maps-screen.test.mjs:8` do; the harness's `assert` has `equal`, `notEqual`, `deepEqual` and `ok`, which are all the file uses.

Contradiction: yes — invariant `document-test-memory-limit` (D-268)

## Minor findings

### Minor 1 — four crafted counts pass by the equality at reading, not by the form check they are named for

- Place: `tests/view/judging-cache.test.mjs:496-519` (the cases of `BAD_VALUES` "a count of gear changes below 0", "with a fraction", "that is a text", "that is null"), against `src/browser/view/judging-cache.ts:211`.
- What is wrong: each case opens and reads at the loaded game's count 0. `read` returns null for these values even without the form check, because `-1`, `0.5`, `"0"` and `null` are never `=== 0`, and the opening keeps them because none of them is `> 0`. So these four cases would pass with the form check loosened.
- Evidence: a probe changed `!isCount(held.gearChanges, 0)` into `!isCount(held.gearChanges, -1000)`, which admits a negative count as the form the cache writes; `npm test -- tests/view/judging-cache.test.mjs` stayed at exit 0, 117 pass, the case "a count of gear changes below 0" among them. Patch and output: `docs/task-cycles/wyposazenie-postaci/reports/review-10-probe-negative-count.patch` and `docs/task-cycles/wyposazenie-postaci/reports/review-10-probe-negative-count-run.txt`. The cases "true", "past the safe integers" and "too large for a number" do catch the removal of the check, because the opening would remove them (`true > 0`, `2^53 > 0`, `Infinity > 0`), so the line is not unguarded.
- Why Minor: no behaviour a player sees changes — a negative or fractional count never equals a count the game gives, so such a value never stands. The invariant `judging-cache-reading` wants a value of another form read as none and left in place, which still holds. A case that read the crafted value against a game state that holds the same number, for example `loaded({ gearChanges: -1 })`, would tell the form check apart.

### Minor 2 — the trust-boundary row of `guidelines/testing.md` for `src/browser/view/judging-cache.ts` no longer describes the cases

- Place: `guidelines/testing.md:178`.
- What is wrong: the row lists the cases of `judging-cache-reading` as "obiekt bez któregoś z pięciu pól" and names no count of gear changes, no value of version 2 and no case in `tests/view/judging-cache-gear.test.mjs`. The value now has six fields, `BAD_VALUES` holds nine crafted counts and the version-2 value, and two cases of the new file carry `// invariant: judging-cache-reading` (`tests/view/judging-cache-gear.test.mjs:230`, `:300`).
- Why Minor: nothing breaks, and the foundation check reports nothing about it. But a reviewer who looks for the direct checks of this boundary through the guideline is sent to "five fields" and misses the new file. No slice of the plan has `guidelines/testing.md` in its *Change* (the orchestrator's choice: a slice of its own, or the whole change's return step, through `the-way-maintain-testing-guidelines`).

### Minor 3 — the game state is an optional parameter of `read` and `remember`

- Place: `src/browser/view/judging-cache.ts:52`, `:59` (type) and `:516`, `:528` (`state = opening.state`).
- What is wrong: a caller that leaves the state out compares and stores against the game the page loaded, which is stale after any gear change. Today the one caller, `src/browser/view/maps-entry.ts:59` and `:154`, passes the state each time. The executor named this choice and its cost.
- Why Minor: there is no defect today; the type checker would catch a future omission only if the parameter were required. Making it required costs about 100 call sites in tests outside the slice.

## Out of scope

none

## Declined to judge

- Whether the count rises only for the player's changes on the screen Postać and stays the same for a refill, a „Załóż” in a map run, an earning loop's return and a death of a character with no practice — this belongs to the simulation, Slices 1–3 and 7–8 (D-463, first paragraph). This slice only reads the count.

## Against the task, the plan and the foundation

- *To do* 9 and row 6 of *Settlements to record*, D-440 (paragraph on gear), D-463: the stored value holds `gearChanges` of the character in the state the judging read (`maps-entry.ts:151-154` passes `read`, the state inside the act). `read` gives the record only while the count in the state at hand equals it (`judging-cache.ts:521-526`), and the screen passes `store.get()` at each draw (`maps-entry.ts:59`). The value stays in storage. Every map of the character is reached through the triple's character, and no other character is affected (gear test "a change of the gear of a character takes its judgings on every map and no other character's"). The entry test runs through the real simulation `putOnPiece`/`takeOffPiece`, the real entry and the real cache, and shows the mark going out after a take-off and standing again after a new judging.
- D-463, second paragraph: `KEY_PREFIX` is `loop2-judging-3|`; a value of the six-field form only; a version-2 value under its key is neither read, written nor removed at an opening of either kind (gear test at `:230`); a five-field value under the version-3 key reads as none and stays. The opening removes a value whose count stands above its character's (`judging-cache.ts:417-421`), also where the program is gone, and leaves equal and below.
- D-441 and `judging-cache-reading`: refusals stay whole and throw nothing. The count is checked as a safe integer from 0 in `readValue`. A crafted count — missing, of another type, negative, fractional, past the safe integers, `1e400` — reads as none and stays (the 117 cases pass, with Minor 1 on what four of them prove). The `__proto__`/`constructor` cases were rewritten for six fields and still refuse. `gearChangesOf` reads an array with `find`, so no key reaches a prototype. `MAX_VALUE_LENGTH` still bounds the parse.
- The record of the simulation (`src/browser/sim/judging-record.ts`) is untouched, as the slice says.
- File outside the slice's *Change*: `tests/view/judging-cache-record.test.mjs` — its version-2 key literal of a judging became version 3, and two hand-written judging values got `gearChanges: 0`. This is required by the version bump, the reason lies in the data, and no assertion was weakened. Within the Goal.
- Changed invariant tests: the `BAD_VALUES` cases of `tests/view/judging-cache.test.mjs` (marked `judging-cache-reading`) changed from five to six fields and gained ten crafted values. Two cases marked `judging-cache-reading` were added in `tests/view/judging-cache-gear.test.mjs`.
- Code made only to pass a test: none found.
- Reserved choice: none taken.

## Against the guidelines

- `guidelines/coding.md`: ESLint and Prettier are clean on the five files. The size rule (D-425): the size run reports 0 functions and files over a threshold in 373 files.
- `guidelines/coding-browser-module.md`: no rule reached (no Hook, Effect, control or screen changes); no content name is written into the view.
- `src/browser/AGENTS.md`: no token value touched.
- `guidelines/testing.md`: "Tests on a document imitation" is broken (Important 1). "Where the expected value comes from" and "Test inputs and expected values": values are written by hand, and counts come from the case. "Changing an existing test": the changed literals have their cause in the version bump of D-463. "Trust boundaries": the row is stale (Minor 2). "Mutation testing": `browser-view` has not joined StrykerJS, so the author checks in their head; the executor listed the mutations it considered. "Test files in the gate": the new file runs through `npm test -- tests/view/judging-cache-gear.test.mjs` (12 pass).
- The rule the handoff names, "New tests in new files, listed where the part adopts mutation testing": not found in the product's guidelines or in the pinned the-way (see **Searches**). The new cases of the slice's rest are in a new file, as the plan asked. The crafted counts stayed in `tests/view/judging-cache.test.mjs`, as the plan asked, and `browser-view` is not in `stryker.config.json`.

## The executor's report and walk

- Own-work check: it names the screen as the weakest point and checks it through the entry on jsdom with the real simulation. That fits, and the test would catch a stale state passed to `remember` or `read`. It missed the guard on its own test file, which it would have found by reading `guidelines/testing.md`.
- Walk: the executor says the change alters what Mapy shows, which agrees with the change. It gives a reason for skipping a browser check (no new control or layout; the screen Postać that makes the change belongs to another slice). The cases follow D-463.
- "Files outside the slice's *Change*": one, judged above.

## Checks run

All were run in a worktree of `8f896859` at `.runs/review-10/head`, with `node_modules` and `.the-way` linked to the reviewed worktree's.

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/memory-limit.test.mjs` | 1 | 36 pass, 1 fail (Important 1) |
| `npm test -- tests/view/judging-cache-gear.test.mjs` | 0 | 12 pass |
| `npm test -- tests/view/judging-cache.test.mjs` | 0 | 117 pass |
| `npm test -- tests/view/judging-cache-record.test.mjs` | 0 | 70 pass |
| `npm test -- tests/view/judging-cache-page.test.mjs` | 0 | 6 pass |
| `npm test -- tests/view/maps-record.test.mjs` | 0 | 10 pass |
| `npm test -- tests/view/maps-screen.test.mjs` | 0 | 51 pass |
| `npm run typecheck` | 0 | clean |
| `npx eslint` on the five files | 0 | clean |
| `npx prettier --check` on the five files | 0 | clean |
| `node tests/quality/eslint-size-rules.mjs` | 0 | "0 functions and files over a threshold in 373 files" |
| `python -B .the-way/elements/common/foundation_check.py` | 1 | 2 errors, both known: `tests/view/character-screen.test.mjs:134` (D-446) and `:400` (D-445); none from this slice |
| probe: `isCount(held.gearChanges, -1000)` then `npm test -- tests/view/judging-cache.test.mjs` | 0 | 117 pass, so the mutation survived (Minor 1); reverted |

The full suite was not run; it is the cycle's own run before the request.

## Reach beyond the dispatch

- `foundations/invariants.md:1198-1206` `document-test-memory-limit` and `tests/view/memory-limit.test.mjs` (guard `refusals`, lines 55-75): the new file imports both the harness and `node:assert`, and `guidelines/testing.md` names this invariant.
- `tests/view/page-document.mjs:217-237` (`assert` export): to confirm the fix has the methods the file uses.
- `tests/view/maps-record.test.mjs`, `tests/view/maps-screen.test.mjs` (imports): the file convention.
- `foundations/decisions.md:854-858` D-425 and `tests/quality/eslint-size-rules.mjs`: the size rule's thresholds.
- `guidelines/styleguide-browser-view.md:1029-1061` (the judging and the remembered mark on Mapy): to check that the slice changes no rule of the mark's appearance.
- `docs/task-cycles/wyposazenie-postaci/plan.md` (list of slices and their *Change*): whether a later slice changes `guidelines/testing.md`. None does.

## Working copies

- `.runs/review-10/head`, a detached worktree of `8f896859`, with junctions to `node_modules` and `.the-way`. The junctions were removed first, then `git worktree remove --force` and `git worktree prune`. The directory `.runs/review-10/` was removed. Nothing remains.
- Kept in `reports/`: `review-10-memory-limit-run.txt`, `review-10-probe-negative-count.patch`, `review-10-probe-negative-count-run.txt`.

## Unread material

- `guidelines/styleguide-browser-view.md` was not read whole (164 KB). I read its passage on the judging and the remembered mark on Mapy (lines 1029-1061) and searched it for D-440, D-441, D-463, `judging-cache`, `maps-entry`. The slice changes no appearance, layout or control.
- `docs/task-cycles/wyposazenie-postaci/task_frozen.md` was read at lines 1-141 and 255-274; the slice names lines 47 and 265, which are among them.
- The part map's browser-view entry (`foundations/part_map.md:3-32`) was not opened. The handoff gave the trust boundaries this slice touches, and the slice changes no file's part.
- Everything else the dispatch names was read whole: D-440, D-441, D-463, `judging-cache-reading`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`, the slice, the executor's report and the full diff.

## Searches not found or unclear

- The rule "New tests in new files, listed where the part adopts mutation testing", named in the handoff, was not found. Searched for "New tests in new files" in the worktree outside `.runs/` and in `.the-way`, with no match. The closest rules are "Mutation testing" and "Test files in the gate" of `guidelines/testing.md`.
