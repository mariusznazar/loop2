PASS 49ca438716acfd277a43583e3680091de76210b0

# Review of the fix — `wskrzeszenie-wspolne`

Range of the fix: `77dd1194d5e32f4a627b7c9419df6335d1e83ace..49ca438716acfd277a43583e3680091de76210b0`, three commits: `5e37eab6`, `d88b362f`, `49ca4387`. `git rev-parse HEAD` in the worktree gave the head above. The fix changes 6 files (+71 / −11): `foundations/decisions.md`, `tests/sim/catch-up.test.mjs`, `tests/sim/completion.test.mjs`, `tests/view/clock.test.mjs`, `tests/view/trip.test.mjs` and `tests/view/world-area.test.mjs`. It changes no product code under `src/`.

Bound: the findings file `reports/findings-whole-review.md` (I-1 blocking, M-1 to M-5 Minor within the task), as `.the-way/task-cycle/review/fix.md` gives.

Counts: blocking findings that remain: 0. Minor findings that remain: 0. New findings in the fix diff: 0 blocking, 0 Minor. Out-of-scope notes: 0.

## Findings

**I-1 — fixed.**
- **Fixtures repaired.** Both `sent` fixtures (`tests/view/world-area.test.mjs:48-79`, `tests/view/trip.test.mjs:37-59`) now give the character one practice in each skill, so `died`'s moment again selects the settlement.
- **Preconditions added.** Each named case now asserts its settlement kind:
  - `world-area.test.mjs:258-259`: `progressLost` for „Dead, the resurrection not ready”;
  - `world-area.test.mjs:444-446`: `resurrectionUsed` for „a death that used a resurrection …”;
  - `trip.test.mjs:418-425`: `resurrectionUsed` and `progressLost` before the load round-trip.
- **Guard widened.** The world-area guard no longer looks only for the capitalised word „Wskrzeszenie”. It now tests `/skrzeszeni/i`, which matches „Wskrzeszenie” and „wskrzeszenia”.
- **New no-practice case.** A death of a character with no practice, with the resurrection ready or not, is shown to give `noPractice`, and the guard `/skrzeszeni|wprawy/i` holds for it.

Evidence, from a scratch worktree of the head:
- The fixed tests pass.
- With the world-area fixture's practice turned off (`practice = false` by default), 2 tests fail: „the world area stands from the top …” and „a death that used a resurrection shows no line …”.
- With the trip fixture's practice turned off, 1 test fails: „a death not yet settled has no settlement record …”.

So the tests now fail exactly when the fixture stops giving the deaths their names claim.

**M-1 — fixed.** `foundations/decisions.md:3716`, the third sentence of D-190, now reads „a death of a character with practice with none ready stops its earning loop”. It agrees with the exception in the first sentence and with `src/browser/sim/loop.ts:316-330`. `foundation_check.py` reports 0 errors.

**M-2 — fixed.** In `tests/view/clock.test.mjs`, `jump(LOOP_MINUTE_MS - 1000 + 1)` puts the reading one millisecond after the loop's minute moment. The test name and its comment say „earlier than the reading”. The expectation now follows from „the earlier death takes it” (To do 4), not from a tie convention.

Evidence: with `src/browser/view/clock.ts` of `e291e8d2` (the manual death settled first) put back and rebuilt in the scratch worktree, `node --test tests/view/clock.test.mjs` exited 1: this test failed and 26 passed.

**M-3 — fixed.** The assertion on the `line` helper is gone from `tests/sim/catch-up.test.mjs` (the hunk at `:853-856`). The `deepEqual` against the product's report still stands.

**M-4 — fixed.** `tests/sim/completion.test.mjs:535` now carries `// invariant: resurrection-renewal` on „the completion of a map the account had solved before renews nothing, whatever the resurrection”. That test asserts the clause „and no later completion of it”: the same very state is returned, and the moment of readiness is unchanged.

**M-5 — fixed (performed).** The fix report records a check in a real browser by the `loop2-play` route, with three screenshots outside the product's repository. They are in `mariusznazar/screenshots`, commit `7f459bb98de2bc005baa5ae106990b8b0e343e87`, under `loop2/wskrzeszenie-wspolne/`. I fetched the three files at that commit (read-only, `gh api`) and looked at them:
- **`kto-idzie-odliczanie.png` (1280 px):** „Wskrzeszenie drużyny za 7 godz. 59 min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” in red (`danger`) on one line, under „Ala” and above „Program:”.
- **`kto-idzie-odliczanie-waski-ekran.png` (600 px):** the same line wraps to two lines, with no overlap or clipping of „Program:”, „Wejdzie: nic” or „Wejdź”.
- **`okno-konca-odnowienie.png`:** „Do skrzynki nic nie trafiło.” and below it „Wskrzeszenie odnowione: pierwsze rozwiązanie tej mapy.” in the same grey (`text-secondary`) and the same spacing, before „Na co poszedł czas”. „Restart”, „Zakończ” and „Otwarte: Las — głębiej →” stand at the bottom.

The window's state was composed rather than reached by a 480-minute real play, as the fix report says. The step from a real reading to the renewal is covered by `tests/view/clock.test.mjs`. No screenshot file is among the commits of the fix (WAY-316).

## The fix diff itself

- **No product code changed.** The fix touches tests and one sentence of D-190 only.
- **Trust boundary.** Nothing in the fix reaches `src/browser/sim/saved-game.ts`. The trip test's load round-trip goes through `loadSavedGame`, but it now covers more settlement kinds, not fewer. The trust-boundary judgement of the review of the whole change stands.
- **Practice added to the world-area and trip fixtures.** I checked that this weakens no other test in those files: all 31 tests of the two files pass, and the earlier change already gave a practised character to the other files the same way. The other tests of the two files (trip lists, body notes, deposits, the drawing) do not depend on the character's practice. Practice 1 reaches no level, so no repertoire or rank changes.
- **The new guard `/skrzeszeni|wprawy/i`** cannot pass by accident: on the head it passes with the noPractice death on the screen, and it would match the line „Postać nie miała jeszcze wprawy, więc śmierć nie zużyła wskrzeszenia drużyny.” if that line stood in the world area.
- **M-1's wording** changes no rule. It restores the exception the sentence had dropped.

No new Critical, Important or Minor finding.

## Declined to judge

none

## Checks run

| Command / method | Result |
|---|---|
| `git worktree add --detach <scratchpad>/rv2 49ca4387…` + junction to the worktree's `node_modules` (removed afterwards; the reviewed worktree untouched, `git status` empty) | ok |
| `npm run typecheck` (scratch worktree) | exit 0 |
| `npm run build` (scratch worktree) | exit 0 |
| `node --test tests/view/trip.test.mjs tests/view/world-area.test.mjs tests/view/clock.test.mjs tests/sim/catch-up.test.mjs tests/sim/completion.test.mjs` | exit 0; 118 tests, 118 pass, 0 fail |
| `npx eslint` on the five changed test files | exit 0 |
| `npx prettier --check` on the five changed test files | exit 0 |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree, read-only; `.the-way` at the recorded gitlink) | exit 0, `0 errors` |
| M-2 check: `clock.ts` of `e291e8d2` put back, rebuilt, `node --test tests/view/clock.test.mjs` | exit 1: the repaired test fails, 26 pass. Restored afterwards. |
| I-1 check: the world-area fixture without practice, `node --test tests/view/world-area.test.mjs tests/view/trip.test.mjs` | exit 1: 2 world-area tests fail. Restored afterwards. |
| I-1 check: the trip fixture without practice, `node --test tests/view/trip.test.mjs` | exit 1: 1 test fails. Restored afterwards. |
| M-5: `gh api … contents/loop2/wskrzeszenie-wspolne/<file>.png?ref=7f459bb9…` for the three screenshots, saved to the scratchpad and viewed | all three present, showing what the fix report says |

Not run: `npm test` (by instruction).

## Reaches beyond the dispatch

- The screenshots repository named in the fix report, read-only. M-5 is about appearance, and only the pictures can show it.

## Unread material

- **Decisions:** no decision is changed by the fix besides D-190, which I read whole in the review of the whole change. I read its changed sentence again whole on the new head. Counts carried over from that review: 29 decisions read whole and 2 opened in part, 305 by title only. No decision with a bearing on the fix stayed unread.
- **Guidelines:** `guidelines/testing.md` was read whole in the review of the whole change. It is unchanged in this range, and its rules on changing an existing test and preconditions apply to the fix.
- Otherwise none.

## Searches not found or unclear

none
