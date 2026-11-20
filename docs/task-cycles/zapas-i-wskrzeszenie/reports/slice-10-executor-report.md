Status: done with concerns

Slice 10 of `zapas-i-wskrzeszenie`, executor report, second pass (the coordinator's answers to the first pass's questions applied). Base `b0353afa`. Commits on `task/zapas-i-wskrzeszenie`: `55a35a33` (the slice), `ab0e44ba` (the overlay-based precondition tests).

Check result: all nine focused checks exit 0 and the foundation check exits 1 with 9 errors, all in `tests/view/*` (stand by the plan), none in a file of this slice.

## Answers applied

1. **Precondition kept, with an overlay.** `balance/overlay.mjs` lays the instrument's data tables in memory. `resurrectionRenewalRealMinutes` set to `1e9` makes the spent start's first return fall beyond any run, so no spent use returns in it. The loop's clock start (`balance/loop.mjs`, `startState`) reads that value at call time, so the spent start writes the far moment; the game's `RENEWAL_MS` is frozen at load (`src/browser/sim/game.ts:76`), but it only spaces returns after the first, and none happens. Probe (seeds 1-20, checkpoints 2, 8, 24, programs `forestLoopWithStock`, `forestBest`, `forestDeepBest`, practice 80 and 300): the full and spent starts differ for every program at 8 and 24 hours (stopped shares 10, 30, 5 %). The precondition is in `tests/balance/check-map.test.mjs` (the row's loop case) and in `tests/balance/cli.test.mjs` (the loop-command case, `withNoReturn` helper). Both are run under the overlay.
   - Mutation checks: flipping `resurrectionReady: true` to `false` in `balance/check-map.mjs` makes `check-map.test.mjs` fail with `AssertionError: Expected values to be strictly equal` (exit 1); inverting the `--no-resurrection` read in `balance/cli.mjs` makes `cli.test.mjs` fail the same way (exit 1). Both files were restored and match the committed versions.
2. **`dueAttempt` kept exported; the public path does not reach the boundary.** Probe (seeds 1-12, `edge-daily-best` with `days: 6`, overlays of the stock 1, 2, 3 and renewal `1e9`): spent uses occur in only two seeds (2 and 3), one use each, and the attempts run the same under every stock; no campaign reached one left before a second death, nor zero left with an attempt waiting. `playCampaign` records no count of uses, so the boundary cannot be asserted from its log. Guideline check: `guidelines/coding-balance-instrument.md` has no rule against an export for a test; the instrument already exports internals for its tests (`earnedPoints` from `balance/loop.mjs`, `programsOf`, `playCampaign`). Accepted by that precedent.
   - Mutation check: making the due check ignore `needResurrection` (`(true ||`) in `balance/campaign.mjs` fails the campaign case with `AssertionError: all three uses spent` (exit 1); restored.
3. **The four cases carrying `decision: D-428` lines** (for the return step to write D-428's `tests:` clause):
   - `tests/balance/loop.test.mjs`: "a loop that starts with the resurrection ready starts with its full stock of three uses"; "a loop with the resurrection not ready starts with every use spent, and the first use returns four hours after the loop's start".
   - `tests/balance/campaign.test.mjs`: "a player who waits for the resurrection tries its next map while one use is left, and waits when every use is spent".
   - `tests/balance/check-map.test.mjs`: "the earning loop of a row starts with the full number of uses of the resurrection, which changes its balance for this program and these seeds".
   - `tests/balance/cli.test.mjs`: "a loop command gives the readings the loop gives for the same flags, and --practice and --no-resurrection reach the loop".

## Files changed

- Commit `55a35a33` (10 files, +107 −15): `balance/loop.mjs`, `balance/campaign.mjs`, `balance/check-map.mjs`, `balance/cli.mjs`, `.claude/skills/loop2-balance/SKILL.md`, `.agents/skills/loop2-balance/SKILL.md`, `tests/balance/loop.test.mjs`, `tests/balance/campaign.test.mjs`, `tests/balance/check-map.test.mjs`, `tests/balance/cli.test.mjs`.
  - `loop.mjs`: `startState` with `resurrectionReady` false sets `resurrectionUsesSpent` to `BALANCE.resurrectionUses` and `resurrectionNextReturnAtMs` to the loop start plus the renewal (replaces the removed `resurrectionReadyAtMs`).
  - `campaign.mjs`: `dueAttempt` exported; a header line on `needResurrection`.
  - `check-map.mjs`: header comment only.
  - `cli.mjs`: usage line now "the loop starts with every use of the team's resurrection spent, the uses returning as in the game".
  - Both skill copies: the same sentence and the check-map column text; `cmp` shows them identical.
- Commit `ab0e44ba` (2 files): `tests/balance/check-map.test.mjs` and `tests/balance/cli.test.mjs`. The overlay helper `withNoReturn` (in `check-map.test.mjs` and `cli.test.mjs`); `cli.test.mjs` also imports `applyOverlay`.

## Checks (after both commits, `npm test -- <file>` exit codes)

- `tests/balance/loop.test.mjs`: 0
- `tests/balance/check-map.test.mjs`: 0
- `tests/balance/cli.test.mjs`: 0
- `tests/balance/campaign.test.mjs`: 0
- `tests/balance/agreement.test.mjs`: 0
- `tests/balance/progression.test.mjs`: 0
- `tests/invariants/test_balance_instrument_file_writes.py`: 0
- `tests/invariants/test_balance_instrument_repeatability.py`: 0
- `tests/agent_workflow/test_loop2_balance_skill.py`: 0
- `python -B .the-way/elements/common/foundation_check.py`: 1, 9 errors, all `tests/view/*` (account-screen, clock, maps-screen, trip; quotations of D-189, D-190, D-242). No error for a file of this slice.
- Before the first pass's fix, the loop case failed (`actual: { usesLeft: 3, nextReturnMs: null }, expected: { usesLeft: 0, nextReturnMs: 1760014400000 }`); the campaign case passed on its first run and is checked by the mutation above.
- Not run: the full `npm test` (forbidden by the handoff).

## Own-work check

- Requirement: the loop and map check start with the full count; `--no-resurrection` starts with all spent, clock at the loop start; one use back after one renewal; a campaign player waiting for the resurrection tries with one use left.
- Checks: the loop case (catches a wrong start, a wrong clock, an off-by-one at the renewal); the campaign case (its boundary, by the mutation); the check-map and cli cases under the overlay (catch a wiring inversion, by the mutations).
- Result: all pass; the mutants fail as expected.

## Concerns

- The overlay makes the first return far away, but the game's renewal constant is frozen at load (`game.ts:76`). Any test that lets a second return happen under this overlay would read the frozen spacing. The current tests do not, but the limit is real and the skill `balance/overlay` describes it.
- Observed in the campaign probe (seed 2, stock 1, `forest` attempted twice, one use spent): consistent with the second try being the one that spent the use, but I did not trace it step by step.

## Reaches beyond the dispatch

- Read `balance/overlay.mjs` whole and `src/browser/sim/game.ts` lines 70-131 and 370-400 (already reported in pass one); read `guidelines/coding-balance-instrument.md` whole (pass one).
- Ran probes in a temporary directory under `.runs/slice-10-executor/` (now removed).

## Working copies

- `.runs/slice-10-executor/` held the check script, logs and three probe scripts. It is removed (`ls` confirms). The logs of the first pass's failing runs are in `reports/slice-10-check-map-run.txt` and `reports/slice-10-cli-run.txt`.
- No git worktree was made.

## Unread material

- `.runs/task-cycles/zapas-i-wskrzeszenie/task.md`: only the passages copied in the handoff (items 3-5, questions 11-12, the Context line). Not read: the rest, including questions 3-6, 15, 16.
- `src/browser/sim/data/balance.ts`: lines 30-50 only.
- `foundations/decisions.md` D-438 (cited by D-190) and D-18 (cited by D-428's rationale): not read.
- `foundations/glossary.md` term `resurrection`: not read.
- `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`: not in this slice's Read list; not read.

## Searches not found or unclear

- `resurrectionReadyAtMs` still appears in `tests/sim/saved-game.test.mjs`, `tests/sim/team.test.mjs` and nine `tests/view/*` files. Outside this slice's Change; not touched; not checked whether they fail.
- A boundary case (exactly one use left, a campaign that reaches it through the public `playCampaign`): not found in 12 seeds with the overlays tried.
- Whether the frozen renewal constant in `game.ts` can be reached by any overlay after the first return: not searched beyond the reading above.
