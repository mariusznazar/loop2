Status: done with concerns (two small adaptations and one tightening beyond the plan's wording, named below; nothing blocks)

# Slice 6 executor report — the team's resurrection has uses

## Commit

- `7e3869c2` feat: :sparkles: give the team's resurrection uses that return one at a time on one clock ... (D-190, D-220, D-240), on base `fc64661c`.

## Files changed (added / removed lines)

| File | + / - |
|---|---|
| `src/browser/sim/types.ts` | 16 / 10 |
| `src/browser/sim/data/balance.ts` | 6 / 3 |
| `src/browser/sim/game.ts` | 80 / 32 |
| `src/browser/sim/saved-game.ts` | 37 / 9 |
| `tests/sim/team.test.mjs` | 496 / 3 |
| `guidelines/coding-saved-game.md` | 3 / 1 |

## The shape and the names I chose

- `Team` now holds `resurrectionUsesSpent: number` (the uses spent and not yet returned) and `resurrectionNextReturnAtMs: number | null` (stands exactly while the count is above 0). `resurrectionReadyAtMs` is gone.
- Data: `BALANCE.resurrectionUses: 3`; `BALANCE.resurrectionRenewalRealMinutes: 240` (key kept, now for one use).
- `DeathSettlement` `resurrectionUsed` gained `usesLeft: number`.
- `game.ts`: a private `usesAt(team, nowMs)` counts the uses whose moment has come (moment included; a closed form, not a loop) and gives the spent count and the next moment as they stand; `resurrectionReady` (a use left at the moment) and `resurrectionAt` (same name, same result type `{ usesLeft, nextReturnMs }` as Slice 5; its parameter widened from `Team` to the two resurrection fields) read through it; `teamAfterDeath`, `settleCompletion`, `newGame` follow the new rules. `settleDeath` needed no code change (it calls `teamAfterDeath`).
- Names for Slice 10 (the instrument's `startState` in `balance/loop.mjs` still writes the old field and is Slice 10's): to start a loop with uses spent, write `resurrectionUsesSpent` and `resurrectionNextReturnAtMs` (a moment is required when the count is above 0).

## Rules as built (what the tests check)

- Uses that returned up to a moment, that moment included, count before a death or a first solving is settled at it.
- Death of a character with practice, a use left: spend one; stock full (after counting returns) starts the clock at `nowMs + renewal`; clock running leaves its moment as it runs; settlement holds `usesLeft`.
- Death at none left: takes everything as before; the uses and the moment are not touched. Character with no practice: the very `team` comes back, no use spent.
- Each use returns the renewal after the clock started or after the use before it (`next + k * renewal`), the clock stops when none is spent.
- First solving of an unsolved map: returns one while the stock is not full, leaves the moment running, stops it when the stock fills; a full stock (also one that is full because uses returned up to that moment) is found and left as stored; a solving of a solved-marked run returns nothing.
- D-240: a death settled later, at an earlier real moment, finds the clock an earlier-settled death started and leaves it (falls out of the rules; tested).

## Trust boundary (`saved-game.ts`)

- `SAVED_GAME_VERSION` 7 to 8.
- The team is read with exactly the keys `characters`, `chest`, `resurrectionUsesSpent`, `resurrectionNextReturnAtMs`. The count is a safe integer from 0 up and at most `BALANCE.resurrectionUses`; the moment is `null` exactly when the count is 0, otherwise any safe integer (D-386: no clock compared). The old key is refused as a foreign/missing key.
- The settlement `resurrectionUsed` is read with keys `kind`, `usesLeft`; `usesLeft` is a safe integer from 0 up and **below** the data's count (see choice 2).
- `guidelines/coding-saved-game.md`: the list of what the load checks against the data gains the count of uses of the resurrection (with the two limits above).

## Checks run (command, exit code)

All from the worktree root `the root of the task's worktree`.

- First, the failing run on the base (my `src/` and `guidelines/` changes taken off, the new `tests/sim/team.test.mjs` on): `npm test -- tests/sim/team.test.mjs` exit 1; 14 of the 21 cases failed, every one at an assertion (e.g. `undefined !== 0` for `resurrectionUsesSpent`, `Missing expected exception (RangeError)`, `ok: true` for a document with the old key beside the new ones). Output kept: `.runs/task-cycles/zapas-i-wskrzeszenie/reports/slice-06-executor-base-run.txt`. The failing cases include every case that cites the invariant `resurrection-renewal` (invariant seen failing once, then passing below).
- With the change: `npm test -- tests/sim/team.test.mjs` exit 0 (21 pass, 0 fail). One earlier run with the change had exit 1 (a case of mine: my fixture for a first solving left `deposited: null`, a state the load refuses, and one case called `end(...)` without `.state`; both are faults of the test's fixtures, fixed in the test, no code change).
- `npm run typecheck` exit 0.
- `npm test -- tests/invariants/test_simulation_isolation.py` exit 0.
- `npm test -- tests/invariants/test_simulation_inputs.py` exit 0.
- Extra, not in the slice's Checks: `node tests/quality/eslint-size-rules.mjs` (nothing over a threshold, `game.ts` stays under 800 lines of code); `npx eslint src/browser/sim tests/sim/team.test.mjs` no output; `npx prettier --check` clean after `--write` on `game.ts` and the test; `python -B .the-way/elements/common/foundation_check.py` exit 1 with 75 lines, none in `tests/sim/team.test.mjs` or the files I changed (all are `decision:` quotes of other slices' test files); my `decision:` lines (D-190, D-220, D-240, D-386) pass the quote check.
- Not run: the full gate (`npm test` bare), per the handoff; the Stryker mutation tool (its initial run needs the whole `tests/sim` green, which it is not until slices 7-9; the reviewer runs it); `npm test -- tests/sim/saved-game.test.mjs`, `death`, `completion`, `flow`, `data`, `catch-up`, `loop`, `tests/balance/*`, `tests/view/*` (not mine; they fail until their slices, as the handoff says).

## Own-work check (section 3)

- Requirement most likely not met: the rule of D-240 / question 3 in the order of the catch-up, i.e. that the real `catchUp` of `loop.ts` goes through the new rules with two characters (a death settled later in the list finds the clock an earlier one started), and that its result loads back. The unit cases use `teamAfterDeath` at hand-set moments; `loop.ts` is Slice 9's and has no case yet.
- Check: a throwaway script (removed) built two characters with practice in earning loops, saved at a moment, and ran `catchUp` three days later. Result: no throw; the team ended with 3 uses spent and a next moment standing; Ola (second on the list) stopped at generation 2 after the last use was gone, Ala (first) kept her loop with covered deaths; `resurrectionAt` at the read moment gave `usesLeft: 0` and the same next moment; the result loaded back from its saved document (`ok: true`). It shows the rules run through the existing `loop.ts` unchanged; the values are not an expectation of any test.
- Second requirement at risk: a document the game makes must load (D-386). Tested for a new game, deaths spending the first and the last use, a death with none left, a first solving returning and one filling the stock, a moment below zero, and a state after `end`; and the clock at the largest safe integer.

## Mutations considered (in the head)

`next > nowMs` to `>=` (caught: the moment-included cases), `1 + floor` to `floor` (caught: return at exactly the moment), `momentAfter(next, back * renewal)` wrong (caught by the three successive returns), `?? momentAfter(...)` (caught: start of the clock), `spent === 1 ? null` (caught: filled stock), the load's `!== (spent === 0)` in each direction (caught), `spent > uses`, `usesLeft >= uses` (caught by the equal and above cases). No tool was run on them (see above).

## Choices (with the way rejected and cost if wrong)

1. **Lazy storage of the returns.** The state holds the uses as they stood when a death or a first solving last settled; a use whose moment passed since is counted by `usesAt` at each reading and written normalized only when a death spends a use or a solving returns one. Rejected: a function that normalizes the stock at every reading (the view reads on every tick and would have to write state). Cost if wrong: a stored state may carry a moment in the past (e.g. after a solving that found the stock full through returns, the team stays as stored); every reader must go through `resurrectionAt` / `resurrectionReady`, which Slice 5 made the one door for the view; the instrument and Slice 9 must use them too.
2. **The load refuses `usesLeft` equal to the data's count, not only above it.** The plan says "exceed the data's count"; a death that spends a use leaves at most count minus 1, so equal is a state the game never makes (the guidelines allow refusing more). Rejected: `<=` count. Cost if wrong: a later test (Slice 7) that expects `usesLeft` equal to the count to load would fail; I wrote the case "equal to the data's count" as refused in `team.test.mjs`, so a disagreement shows at once. The guideline text I wrote says the same.
3. **Safe-integer guard on stored moments.** `momentAfter` makes a result that is no safe integer a `RangeError` (a death at the largest safe integer would otherwise store a moment the load refuses, against D-386). A death at `MAX_SAFE_INTEGER - renewal` is accepted and loads back. Rejected: no guard (an unreachable state in real play, but it breaks D-386's sentence for crafted input to the settling functions). Cost if wrong: a function that now throws where it did not at moments within one renewal of 2^53; the clock of a browser is about 1.7e12.
4. **`resurrectionAt` / `resurrectionReady` take `Pick<Team, the two fields>`** (the old `resurrectionReady` already took a Pick; `resurrectionAt` took a `Team`). Compatible with the view and the instrument; no view or instrument file changed.
5. **Round-trip fixture for a first solving.** The completed run is made by hand in `tests/sim/team.test.mjs` (Las among the solved maps, `completion: { minute: 0 }`, `deposited: []`), as `death.test.mjs` makes its completed run by hand, since solving Las for real takes the game far beyond a unit case.
6. **The refusal table is in `tests/sim/team.test.mjs`** (one case, 17 crafted variants). The plan gives the load's refusal tests to Slice 7; I added a compact one here because the slice builds the refusals and the plan accepts that the load has no test between Slices 6 and 7. Slice 7 may keep or drop duplicates.

## Plan and code: small mismatches

- The plan's "Change" list has no place for the doc comments of `loop.ts` and `end-window-lines.ts` that still speak of "ready"/"eight hours"; they are Slice 9's and Slice 14's. `end-window-lines.ts` reads `BALANCE.resurrectionRenewalRealMinutes / 60`, now 4, so the old window text reads "po 4 godzinach" until Slice 14 replaces it (compiles; its view test fails until then).
- The `// invariant:` and `decision:` lines in `death.test.mjs`, `completion.test.mjs`, `catch-up.test.mjs` etc. still quote Slice-1-changed sentences; the foundation check lists them (not mine).

## Walkthrough (`walkthrough.md`)

Not read in full and no walk made: the change alters the rules of the simulation and the shape of the saved game, and no screen or output a user sees changes by itself in this slice (the view lines read through `resurrectionAt` are Slice 12's). One sentence why: the rules are checked at the level of the simulation by the cases above, and the lines that show them are other slices'. (I did not open `walkthrough.md`; if the orchestrator reads "behaviour a user sees" more widely — for example the end window's hours now reading 4 — that is Slice 14's.)

## Reach beyond the dispatch

- `foundations/decisions.md` D-190, D-216, D-217, D-218, D-219, D-220, D-221, D-240, D-386 (D-216..D-218 and D-221 beyond the named D-219/D-220/D-221 range's start: read to see the settlement's wording and the view's text; D-216/D-217 to know what the settlement's `usesLeft` is for). Invariants `resurrection-renewal`, `save-version`, `death-settled-once`, `catch-up-state` read by heading. `tests/sim/death.test.mjs` lines 1-600 read for the fixtures; `plan.md` lines around 240-250, 265-285, 318-326, 418-426, 665-675 read for names other slices expect (`resurrectionReady`, `resurrectionLine`, the key `resurrectionRenewalRealMinutes`, the size remark of `game.ts`).
- The selection missed: nothing needed beyond that; `tests/sim/catch-up.test.mjs` (lines 1-60 only) read to build the throwaway catch-up check.

## Working copies

`.runs/slice-06-executor/` (a patch of my source changes, the run outputs, a throwaway script, the commit message file) stood in the worktree and is removed, in full. Kept beside this report: `.runs/task-cycles/zapas-i-wskrzeszenie/reports/slice-06-executor-base-run.txt` (the failing run on base).

## Unread material

- `foundations/part_map.md:33-64` and `:139-157` (simulation, agent-workflow): not read; the files changed are the ones the slice's Change names and I changed no file's part.
- `foundations/decisions.md` D-386 and D-240 read whole by range; D-219-D-221 whole; D-190 whole; `foundations/invariants.md` ranges by heading: whole for the four named.
- `task.md` passages copied into the handoff were read there; the file itself was not opened.
- `guidelines/testing.md` read whole in two parts (the Trust boundaries table row for `saved-game.ts` read in full).
- `.the-way/task-cycle/change/walkthrough.md` and `ui_check.md` not read (see Walkthrough).

## Searches not found or unclear

- None not found.
- Unclear: the slice says the `decision:` lines of D-220 "quote the sentence as Slice 1 left it"; I quoted the whole of it with its final period. The check passes.
- Unclear: whether a refusal of `usesLeft` equal to the data's count is wanted (choice 2).

## Questions and concerns

- Concern: `balance/loop.mjs` `startState` and `balance/check-map.mjs` still write/read the old field (Slice 10); the instrument runs but a start with the resurrection spent sets a field no longer in the shape until then. `npm run typecheck` does not see it.
- Concern for Slice 9: `loop.ts` comments still say "ready"; `takeEnd` works through `teamAfterDeath` unchanged.
