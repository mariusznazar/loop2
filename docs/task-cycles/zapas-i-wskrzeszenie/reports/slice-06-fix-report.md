Status: done

# Slice 6 fix report — finding I-1 of `reports/findings-s56.md`

Commit `20e6eaab` (fix range from `7e3869c2`). Files: `src/browser/sim/saved-game.ts` (3 / 3), `guidelines/coding-saved-game.md` (1 / 1), `tests/sim/team.test.mjs` (21 / 5).

## I-1 — fixed (I hold it right)

- `src/browser/sim/saved-game.ts`: the settlement `resurrectionUsed` now refuses `usesLeft > BALANCE.resurrectionUses`; the comment says why (a count lowered later refuses only a save with more spent than the new count).
- `guidelines/coding-saved-game.md`: "zostaje ich mniej niż ta liczba" is now "zostaje ich nie więcej niż ta liczba".
- `tests/sim/team.test.mjs`: the variant "uses left in the settlement equal to the data's count" left the refusal table; a new case, "a settlement whose uses left equal the data's count loads, and one above it is refused", holds both sides (equal loads with `usesLeft: 3` kept as it stands; 4 is refused as `shape`). The "above" variant stays in the refusal table too. Reason in a comment: question 15.
- Failing run before the code change (new case with the old `>=`): `npm test -- tests/sim/team.test.mjs` exit 1, 21 pass / 1 fail, the one failing is the new case, at `assert.equal(equal.ok, true)` (`false !== true`). Kept: `reports/slice-06-fix-before-run.txt`.

## Can the game write a settlement with `usesLeft` equal to the count?

No. `teamAfterDeath` in `src/browser/sim/game.ts` writes `usesLeft = BALANCE.resurrectionUses - spent - 1` where `spent` is the spent count after returns, from 0 up; so the largest it writes is count minus 1, and only a count lowered after the save makes a stored settlement equal to (or, below the lowered count, above) it. The load therefore admits equal and refuses above, as question 15 and the plan's "exceed" give. My earlier choice 2 ("refuse equal too", "Wolno odmówić więcej") was wrong against a settled answer of the task; the reviewer is right.

## Residual (the reviewer's, not mine to settle)

Lowering the count by two or more (3 to 1) still refuses a save whose settlement left 2 while the team's spent count is within the new count. Both To do 3 and the "tylko" of question 15 cannot hold in every lowering; a question for the person who settled the task. Not changed here.

## Checks (command, exit code)

- `npm test -- tests/sim/team.test.mjs` exit 0 (22 pass, 0 fail).
- `npm run typecheck` exit 0.
- `npm test -- tests/invariants/test_simulation_isolation.py` exit 0.
- `npm test -- tests/invariants/test_simulation_inputs.py` exit 0.
- `npx prettier --check` on the two changed code files clean.
- Not run: the full gate; Stryker.

## Own-work check

- Requirement: question 15 — a lowered count refuses only a save with more spent than the new count. Check: the new case loads a document of a settled death whose `usesLeft` equals the count and keeps it; the refusal table still refuses 4, -1, 0.5 and a missing `usesLeft`, and the team's own bound (spent above the count) is unchanged and still refused by its variant. All pass.

## Working copies

`.runs/slice-06-fix/` (before/after runs, commit message file) stood in the worktree and is removed. Kept: `reports/slice-06-fix-before-run.txt`.

## Unread material

`reports/review-s56-probe.mjs` and `reports/review-s56-report.md`: not read (the findings file gave the case and the fix). `fix.md` read whole; no other file named by the message was left unread.

## Searches not found or unclear

None not found. Unclear: none beyond the reviewer's residual above.

## Questions and concerns

None for this fix.
