FAIL f27079574b735db808938191b8e77667457fa3df

# Review of slice 7 of `zapas-i-wskrzeszenie` — the tests of the load hold the shape of version 8

Range `20e6eaab..f2707957` (one commit, `tests/sim/saved-game.test.mjs` only, +202 / -57). `git rev-parse HEAD` gave `f27079574b735db808938191b8e77667457fa3df`, the head given. Variant: a planned slice whose *Risk* names a trust boundary (`src/browser/sim/saved-game.ts`). `saved-game.ts` is not changed by the range; the load of Slice 6 was judged through the slice's cases, my mutants and my own hostile documents.

Counts: blocking 1 (Important), Minor 2, out of scope 1 (the second Minor).

## Findings

### Important

**I1. `tests/sim/saved-game.test.mjs:2474` — a `decision:` line the foundation check refuses: the D-179 quotation does not begin a sentence.**

```
  // decision: D-179 "at a completion only what that list names goes to the chest"
```

`python -B .the-way/elements/common/foundation_check.py` (exit 1, 74 errors) reports for this file exactly one error: `tests/sim/saved-game.test.mjs:2474: the quotation does not begin a sentence of `D-179``. The sentence of D-179 (`foundations/decisions.md:8352`) begins "The trip plan is a field of the program, both its lists are bound at the start of a map run — …"; the quotation is its tail. The one command runs the foundation check, so the gate fails on this file whatever the later slices do; the handoff asked that the check report none for this file. All the other `decision:` lines of the file, those of the altered cases included (D-190 twice, D-386, D-206, D-213), pass the check, which matches each against a binding sentence of the foundation as it stands now.

The line does not come from this range: `git blame` gives commit `814cb8b1` ("let the load admit the deposit of a completed run of a solved map …", an earlier slice of this task), and the base of the task `46cfec71` has no D-179 quotation in the file. It lies within the task and in the file this slice changes, and no later slice of the plan's *Change* that I know of reaches it, so I grade it here. The fix is one line: quote D-179 from the start of its sentence (as `tests/sim/trip.test.mjs:153` does, "The trip plan is a field of the program") or quote the whole sentence.

Contradiction: no

### Minor

**M1. `tests/sim/saved-game.test.mjs:3269-3273` — the marked completion's expectation pins today's eating to 2 berries instead of holding D-189's relation.**

```
  // D-189: a marked run brings its loot out to the chest as any run does, its bring list clipped to
  // what the character still carries; only its practice is not paid. Of the three berries taken from
  // the chest, the character carries two at the completion.
  assert.equal(doneMarked.run.character.backpack.berry, 2);
  assert.deepEqual(doneMarked.run.deposited, [{ item: "berry", count: 2 }]);
```

The change of the old expectation `[]` has its reason in the foundation (D-189 now: "A manual map run of a map already solved takes its equipment from the chest and brings its loot out to it as every other map run does (D-179)"), so it is no hidden fix (`guidelines/testing.md`, "Changing an existing test"). The value 2 itself is the program's output of one play (the executor's concern 3): if the eating of the four game minutes changes, the precondition fails though the rule under test holds. D-189 gives an independent expectation that this test already has at hand: the unmarked completion `done` is the same play with the mark the only difference, so `assert.deepEqual(doneMarked.run.deposited, done.run.deposited)` holds the rule "as every other map run does" without a number from today's run. I added that assertion in my working copy and the file passed (run M0 below), so the marked deposit does equal the unmarked one today. Minor: the assertion is right now and fails loudly, not silently, when the play changes.

**M2 (out of scope for this slice; within the task). D-386 still names the old moment.** `foundations/decisions.md:4233`: "A moment of real time that the game state stores, the save time and the moment the account's resurrection is ready, is a safe integer of milliseconds of any sign …", and its *Verification* "a save time and the team's moment of readiness at zero or below zero loading". The state no longer holds a moment of readiness; it holds the moment the next use returns (`types.ts:425-438`). The test at `tests/sim/saved-game.test.mjs:1021-1029` and the comment at `:2747-2748` apply D-386 to "the team's moment of the next return", which is the reasonable reading, and the quotation is word for word as D-386 stands, so the slice does what its goal asks ("quotes it as it stands now"). D-386 is not in the plan's table of foundation entries, so no slice rewrites it. Named for the review of the whole change; no change is asked of this slice.

## The handoff's points, judged

- **The document of version 8, every optional branch filled, loading into the state it describes:** `DOCUMENT` (`:710-721`) is version 7's game with the team holding `resurrectionUsesSpent: 2` and `resurrectionNextReturnAtMs: 1760000028800000`; `HEADQUARTERS` (`:728-786`) holds the empty branch (0 and `null`). "a document of the current version loads into the state it describes" passes for both, and "the current version is the one the document of the current version is written with" ties `SAVED_GAME_VERSION` to 8. A death settlement with `usesLeft` cannot stand in `DOCUMENT`, whose run goes on; the branch is held by `dead()` in "a map run that ended comes back as it ended" and the new case for uses left 0 to 3. Holds.
- **Version 7 kept and refused as another version:** `DOCUMENT_V7` (`:686-703`) is kept unchanged under a new name, and the new case "the document of version 7 is refused as version, whatever its game holds" (`:1146-1158`) refuses it alone and with the version 8 team beside the number 7, and asserts `SAVED_GAME_VERSION === DOCUMENT_V7.version + 1`, the pair `guidelines/coding-saved-game.md` asks the review to check. The other-version tests moved from 8 to 7 and 9. Holds.
- **Each crafted refusal is a real case that fails when its check is broken:** see the mutation runs below. With the crafted test made to go through every case, each mutant of a bound is caught by exactly the cases named for it, so no case is refused for another reason than its name: count of uses spent fractional / below 0 / text / none / NaN / infinite / above 3 / beyond safe integers; moment with none spent (also 0 with 0), missing with some spent, fractional / text / NaN / infinite / beyond / below the safe integers; the old key beside and instead of the new keys (refused by the strict keys of `fields`); a settlement without `usesLeft`, at 4, 10, -1, 1.5, "2", null, 2^53, and on a run going on. StrykerJS on `saved-game.ts:500-516` and `:828-853`: 43 mutants, 39 killed, 4 timed out, 0 survived. Holds.
- **The `decision:` / `invariant:` lines of the altered cases word for word as the foundation stands:** the foundation check accepts every one of them (see I1 for the one line of the file it refuses, from an earlier commit). The new cases carry `// invariant: save-version`, as the trust-boundary row of `guidelines/testing.md` names this file's refusals. Holds.
- **The marked completion (old line ~3128):** expects what D-189 gives, not only what one run printed, in its deposit; the backpack count is the one value from a run (M1).
- **No test comment points outside the foundation:** I searched the file for "task", "slice" and "question": no hit. The comments of the range cite D-numbers only. Holds.
- **Everything else the file held left unchanged:** the diff touches only the version documents, the version tests, `dead()`, the readiness case renamed to the new moment, the crafted cases of the team and the settlement, one D-386 comment, `deathUnready` / `usedUp`, and the expectations of the simulation-made state test (the death's `usesLeft: 2` and the marked deposit). The removed `assert.equal(SAVED_GAME_VERSION, DOCUMENT_V6.version + 1)` moved to the version 7 test as the guideline's pair requires; the seven crafted moment-of-readiness cases were replaced one for one by the moment-of-next-return cases. Nothing else was weakened.

## The executor's concerns, judged

1. **The load checks a death's `usesLeft` only against the data's count, not against the team's spent count — allowed.** Question 15 and To do 3 of the task ask exactly that check ("a wczytanie sprawdza ją wobec liczby użyć w danych gry"), and `guidelines/coding-saved-game.md` ("zostaje ich nie więcej niż ta liczba") says the same. A cross-check would be unsound: the state holds the team's uses as they stood when a death or a first solving last settled (`types.ts:425-432`), so a later death of another character at an earning loop, after returns, changes the spent count while the manual run's settlement stands (for example a manual death leaving 0 at T, then a loop death at T + 2 x 240 min leaves the team at 2 spent). "Wolno odmówić więcej" permits a stricter check; it does not require one.
2. **A `resurrectionUsed` settlement on a character with no practice is admitted — not judged (see Declined to judge).**
3. **The marked completion's `berry` 2 from one run — Minor, M1.**
4. **`dead()` defaulting to `usesLeft: 0` — allowed.** The default with the team at 2 spent is a state the game reaches (see concern 1), and its doc comment says how it was chosen.

## Declined to judge

- A `resurrectionUsed` settlement on a character with no practice, which the game writes as `noPractice` (executor's concern 2): the load admitted it at version 7 too, neither the slice's list nor question 15 asks for it, and the guideline makes a stricter refusal optional; outside this slice and the task's settlements.
- `types.ts:286-291` says a death's uses left run "from 0 up to one below the data's count" while the load admits up to the count: written by Slice 6 and its fix `20e6eaab` (D-190), outside this range; the two agree, the comment speaking of what the game writes.

## Checks

| Check | Command or method | Exit | Result |
|---|---|---|---|
| Slice's check 1 | `npm test -- tests/sim/saved-game.test.mjs` (reviewed worktree, head) | 0 | 44 pass, 0 fail |
| Slice's check 2 | `npm test -- tests/sim/team.test.mjs` | 0 | 22 pass, 0 fail |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 1 | 74 errors; for `tests/sim/saved-game.test.mjs` one, line 2474 (I1); the rest in test files of later slices (`catch-up`, `death`, `loop`, `completion`, `data`, `view/*`) |
| Mutation run 1 | 16 hand-made mutants of the two bounds, the moment's agreement and the number checks of `resurrectionUses` and `SETTLEMENTS.resurrectionUsed`, one at a time, `npm test -- tests/sim/saved-game.test.mjs` each | 1 each | every mutant killed; `spent >= 3` and `usesLeft >= 3` killed by the edge cases (all three spent loads; uses left 3 loads) |
| Mutation run 2 | the same with the crafted test of my copy going through every case and writing each admitted one, plus M0, the source as committed, with the added assertion `doneMarked.run.deposited` equals `done.run.deposited` | M0: 0; others: 1 | M0 passes (the marked deposit equals the unmarked); each mutant admits exactly the crafted cases named for its check; kept as `.runs/task-cycles/zapas-i-wskrzeszenie/reports/review-s07-mutants.txt` |
| StrykerJS | `node node_modules/@stryker-mutator/core/bin/stryker.js run stryker-review-s7.json`, a copy of `stryker.config.json` with `mutate` `src/browser/sim/saved-game.ts:500-516` and `:828-853` and the test files `saved-game` and `team` only | 0 | 43 mutants: 39 killed, 4 timeout, 0 survived, 0 no coverage |
| Hostile documents | my probe, `node review-s07-probe.mjs <worktree> <out>` on the head's build: 43 documents of version 8 beside the slice's cases and the earlier reviewer's probe (-0 counts and moments, text, boxed numbers, BigInt, lists and objects as a moment, an inherited moment, getters, a symbol key, an own `__proto__` key, the old key at `null`, keys reordered, MAX/MIN safe moments, `usesLeft` on `noPractice` and `progressLost`, a kind with a space, an inherited or getter `usesLeft`) and the game's own death round-tripping through JSON | 0 | 0 bad of 44: every hostile one refused as `shape` with no throw, every admissible one admitted, the round trip deep-equal; kept as `.runs/task-cycles/zapas-i-wskrzeszenie/reports/review-s07-probe.mjs` |
| Comments pointing outside the foundation | Grep of the file for `question`, `task`, `slice` | — | no hit |

Not run: the full `npm test` and `check_instructions.py` (the cycle's own run before the request).

## Reaches beyond the dispatch

- `foundations/decisions.md`, D-189 (`:8532-8551`) whole: to judge the marked completion's expectation (M1); D-179's first paragraph (`:8350-8352`): to judge the foundation check's error (I1).
- `git blame -L 2472,2476 tests/sim/saved-game.test.mjs` and `git show 46cfec71:` / `20e6eaab:` of the same file: to place the origin of I1.
- The rest of `tests/sim/saved-game.test.mjs` in ranges (`1-54`, `676-1015`, `2348-2364`, `3020-3306`) and the earlier reviewer's probe `.runs/task-cycles/zapas-i-wskrzeszenie/reports/review-s56-fix-probe.mjs` (named by the handoff): to avoid repeating its cases.
- `stryker.config.json`: to restrict the mutation run to the two test files that pass at this head.

## Working copies

- `.runs/review-s7/` held: a git worktree of `f2707957` at `.runs/review-s7/wt` with a directory junction `node_modules` to the reviewed worktree's `node_modules`, the mutation scripts, the probe, the Stryker configuration copy, its sandbox and report under the worktree, and the foundation check's output. The junction was removed first with `rmdir` (the linked `node_modules` stayed intact), then `git worktree remove --force` and `git worktree prune`, then the directory by its full path. All removed; `git worktree list` no longer shows it, and the reviewed worktree's `git status` is clean.
- Kept beside this report: `review-s07-probe.mjs` (my probe) and `review-s07-mutants.txt` (mutation run 2's output).

## Unread material

- `guidelines/testing.md`: read whole in two pages.
- `tests/sim/saved-game.test.mjs` (3306 lines): read the diff whole and the ranges named above; the rest not read (unchanged by the range).
- `.runs/task-cycles/zapas-i-wskrzeszenie/task.md` and `plan.md` beyond the passages the handoff copies: not opened (no passage sent me to them).
- Everything else the handoff names was read whole: `guidelines/coding.md`, `guidelines/coding-saved-game.md`, `src/browser/sim/types.ts`, `src/browser/sim/data/balance.ts`, `src/browser/sim/saved-game.ts`, D-190, D-214, D-206, D-386, `save-version`, `solved-map-manual-run`, `foundations/part_map.md` simulation, the executor's report.

## Searches not found or unclear

- The foundation check's error for this file, which the handoff expected none of: found one (I1), from commit `814cb8b1`, outside the range.
- A later slice of the plan that changes `tests/sim/saved-game.test.mjs` and would carry the fix of I1: not known to me (the plan's other slices are not mine to read); unclear.
- A slice of the plan that rewrites D-386 for the new moment: none in the plan's table of foundation entries (M2).
