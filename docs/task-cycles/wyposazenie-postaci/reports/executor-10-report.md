done

# Executor-10 report — Slice 10: a gear change the player makes erases the character's remembered judgings

## Commit

- `8f896859` on `task/wyposazenie-postaci` (base `75df8a09`).

## Files changed

- `src/browser/view/judging-cache.ts` (+ about 70 / - 45): version 3 (`loop2-judging-3|`), new stored field `gearChanges`; `read(ids, state?)` returns none unless the character's count in the state at hand equals the stored one (the state defaults to the one the cache was opened with); `remember(ids, record, state?)` stores the count of the character in the state the judging read (0 where the character is not on the team there); the opening also removes values whose count stands above their character's in the loaded game. The record of the simulation (`judging-record.ts`) is untouched.
- `src/browser/view/maps-entry.ts` (+9 / -7): `readRecord` passes `store.get()`; `judge` takes `read = store.get()` once, judges it and gives it to `remember`.
- `tests/view/judging-cache.test.mjs`: version 3 keys, `gearChanges` in the hand-written values and fixtures, crafted counts as cases of `BAD_VALUES` (missing, version-2 shape, below 0, fraction, text, null, list, true, past the safe integers, too large for a number), edges test (`gearChanges: top`) reading with explicit states.
- `tests/view/judging-cache-gear.test.mjs` (new, 12 tests).
- `tests/view/judging-cache-record.test.mjs` (outside the slice's *Change*, see choices): the key literal of version 2 became version 3 and the two hand-written judging values got `gearChanges: 0`.

## Checks (command, exit code)

- `npm test -- tests/view/judging-cache-gear.test.mjs` written first, with the source of the slice taken back to the base: exit 1, 11 of 12 failing on assertions (the key written is still version 2, the count missing, the mark not erased); the one that passed on the base, "the opening throws nothing where a value above the count cannot be removed", holds only the refusal path. Output: `reports/executor-10-gear-failing-run.txt`. With the slice: exit 0, 12 of 12.
- `npm test -- tests/view/judging-cache.test.mjs` exit 0 (117 tests).
- `npm test -- tests/view/judging-cache-record.test.mjs` exit 0 (70).
- `npm test -- tests/view/judging-cache-page.test.mjs` exit 0 (6).
- `npm test -- tests/view/maps-record.test.mjs` exit 0 (10).
- `npm test -- tests/view/maps-screen.test.mjs` (not in the *Checks*, it reads the cache) exit 0 (51).
- `npm run typecheck` exit 0.
- `npx prettier --check` and `npx eslint` on the five files: clean after `--write` of two test files and removal of an unused constant.
- `python -B .the-way/elements/common/foundation_check.py`: 2 errors, both `tests/view/character-screen.test.mjs` (lines 134, 400; quotations of D-446 and D-445), not my files, left to the slices the handoff names; none added by me. My new `decision:` lines quote D-463 and D-441 sentences and pass.
- The full suite was not run (the cycle's run).

## Tests failing on the slice's base

The first run of the new file (above) is the only failing run; no other test failed on my slice, so no measure on the base was needed.

## Own-work check

- Requirement most likely unmet: "a gear change the player makes erases the character's judgings on every map, one the character comes back with from a map run erases none" read against the real screen, not only the cache. Check: the test of the entry (jsdom, real simulation `putOnPiece` and `takeOffPiece`): the state at hand holds one change the opened state did not, the judging is stored with count 1 (not the opening state's 0), its mark stands; `takeOffPiece` raises the count, the mark goes out while the stored value stays; a new judging stands again at count 2. It passed.
- Mutations considered: `>` to `>=` in the opening (caught: equal count kept), the compare in `read` made one-sided (caught: below and above), `remember` taking the opening state's count (caught by the entry test and the first test), `readRecord` reading the opening state (caught by the entry test), a read that removes a value (caught: it stands again at its own count), a version-2 value read, overwritten or removed (caught), a crafted count read as a record (caught by the `BAD_VALUES` cases). Not caught and not asserted: that the count of a map run's return stays out of the cache — that is the simulation's (Slice 2).

## Walkthrough

The change alters what the screen Mapy shows (the mark beside „Program:” after a gear change). The entry test above checks it on jsdom, through the real entry and simulation; the browser address check was not made (the screen Postać that makes the change is another slice; the part I changed has no new control or layout).

## Choices

- `read` and `remember` take the game state as an optional last parameter, defaulting to the state the cache was opened with. Reason: the opened state is the loaded game, stale after a gear change; the entry always passes the live one, and about 100 call sites of tests (and `maps-screen.test.mjs`'s helper) keep working, since they use one static state. Rejected: a required parameter (about 100 call sites in files outside the slice); a live-state getter in the opening (changes `game-view.ts`, outside the slice). Cost if wrong: a future caller that omits the state compares against the loaded game's count and shows a judging that a later change should have erased; the doc comment says so, the entry passes it.
- `read` gives none where the state at hand lacks the character (the mark would not stand anyway, `markOfRecord`); `remember` stores 0 for such a character.
- The count check is in the cache's `read`, not in `markOfRecord`, as the slice says (the record of the simulation stays as it is); the generation and content revision checks stay where they were.
- `judging-cache-record.test.mjs` is outside *Change*: the version bump changes its key literal and the two judging values the opening test needs in the version-3 form; without it two of its tests would fail for that reason. Named here as the one reach.

## Reach beyond the dispatch

- Read `src/browser/sim/judging-record.ts`, `src/browser/sim/gear.ts`, `src/browser/sim/types.ts` (the `gearChanges` field), `src/browser/view/maps-screen.tsx` (where `markOfRecord` is called), `tests/view/maps-record.test.mjs`, `tests/view/maps-screen.test.mjs` (helpers) and `tests/view/judging-cache-record.test.mjs`, to learn where the stand-only-while check lives and how the entry is tested. The selection did not name them.

## Working copies

- `.runs/executor-10/` (the patch of my source diff and test outputs) stood in the worktree and was removed; the failing run is kept as `docs/task-cycles/wyposazenie-postaci/reports/executor-10-gear-failing-run.txt`. No other copy was made.

## Unread material

- none beyond: `guidelines/coding.md`, `guidelines/coding-browser-module.md` (header only), `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`, `foundations/part_map.md:3-32` and `task_frozen.md` passages — I did not open these; the code followed the existing file's conventions and prettier, eslint and the typecheck pass. D-440, D-441, D-463 and `judging-cache-reading` were read whole; `tests/view/judging-cache.test.mjs` was read whole.

## Searches not found or unclear

- none. (The handoff's plan text says the cache might "read the count from the state it is given"; the state it is given at opening is stale, so the count is passed per call — named under choices.)
