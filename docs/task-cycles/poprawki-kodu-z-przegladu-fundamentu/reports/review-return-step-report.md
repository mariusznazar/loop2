PASS 1d03bdeca3bdd07692f53015c9d4b65da6f86e73

# Review of the return step

Range `e384f7934ac3735171ce79d604a2740b5f8f6b46..1d03bdec`, one commit `1d03bdec`; `git rev-parse HEAD` gives `1d03bdeca3bdd07692f53015c9d4b65da6f86e73`, the head given. The diff (`git diff e384f793..1d03bdec`) changes two lines of the `tests:` clause of D-208's *Verification* in `foundations/decisions.md:3817-3818`: "retried at that rhythm" becomes "retried after the first wait of that rhythm, 5 real seconds".

## The judgement asked for

1. **Does the changed clause say what the cases of a save that threw before its request left check?** Yes, with a small shortfall (M-1). The two cases are `tests/view/game-saver.test.mjs:908-940` and `:944-967`, each run over the four ways of `BREAKS` (`:861-894`): the read throws, the clock's moment throws, the client throws, the client's promise is rejected. Clause by clause:
   - "showing the sentence of a failed save": `:918` asserts `RETRYING`; `:954` asserts `LOGOUT_FAILED`, which the earlier part of the same clause names as "the sentence D-97 gives there" after a failed save before a logout. Holds.
   - "retried after the first wait of that rhythm, 5 real seconds": `:923-927` checks nothing sent at 4 999 ms and one send at 5 000 ms. No case goes to the 10, 20 or 30 s waits, so the old "retried at that rhythm" claimed more than the tests hold, and the correction is right. The code gives the first wait as `RETRY_MS[0] = 5_000` (`src/browser/view/game-saver.ts:32`, `:146`) after `failures += 1` (`:229`), reached through `notSent` -> `answered({ kind: "failed" })` (`:180-181`).
   - "sendable again after it": `:933-934` (a moment sends at once after the retry) and `:957-959` (a second save before a logout sends its own request). Holds. The `inFlight` flag is cleared in `answered` (`:210`), which `notSent` reaches.
   - "its error left unhandled for D-323": `:937` and `:964` assert exactly `[BROKEN]` taken as an unhandled rejection; the code rethrows it in a microtask with no handler (`:182-184`). Holds.
   - Nothing in the clause goes beyond the tests.
2. **Do the `decision:` quotations of the tests still match?** Yes. `python -B .the-way/elements/common/foundation_check.py`, exit 0, output `0 errors`. The commit changes only a *Verification* clause, which no `decision:` line quotes. The quotations of D-208, D-97 and D-323 in the two cases (`:909-910`, `:945-946`) begin binding sentences that are unchanged.
3. **Is anything else in the change's entries still stale against the code?** In the foundation, no. I compared D-208 (the binding paragraph `:3801-3803`, *Verification*, *Rejected*), D-97 (`:2863-2887`), D-323 (`:4493-4506`), the D-389 hunk, and the glossary `headquarters` / `at the camp` (`foundations/glossary.md:91-95`) with `game-saver.ts`, with `logOut` in `src/browser/view/app.ts:690-715` (on a `failed` report it sets the logout back to `idle`, so „Wyloguj” works again), and with `atCamp` in `src/browser/view/camp-picture.ts:59-66`. They agree. One stale comment in a test, outside the foundation and outside this range, is M-2.

## Findings

### Critical

none

### Important

none

### Minor

- **M-1 — the corrected clause states less than the cases hold** (`foundations/decisions.md:3815-3818`). The first case also checks two more things. At `:925-928` the retry sends the game state of its own time, made after the failure: `submissionOf(game.state, 3)` after `game.act(setPace(...))`. At `:929-930` the sentence goes when the retry succeeds. The clause names neither. For the ordinary retries the same clause says "each with the game state of its moment … until a save succeeds and the sentence goes". The cost of the gap is small: an agent that reads only this clause takes those two points of the throwing case as unchecked, and compares them by hand where a test already holds them. Nothing reads wrongly. A possible wording: "…retried after the first wait of that rhythm, 5 real seconds, with the game state of its moment, the sentence going when it succeeds, sendable again after it, and its error left unhandled for D-323." This is within the task (To do 2, settlement row 1). Minor, so it does not block.
- **M-2 — stale comment of the test's table of breaks** (`tests/view/game-saver.test.mjs:857-859`). The comment says each way "has `breaks(), mend()`". The entries of `BREAKS` (`:861-894`) have `extra` or `client`, and the mending is `flaw.broken = false` in the cases (`:922`, `:957`). A reader looks for two functions that do not exist. It comes from `b87424d0`, outside this range. The return step compares the foundation, not test comments, so it is not that step's miss. It is still within the task's change, so I name it here for the request. Minor, outside this range.

### Out of scope

M-2 lies outside the reviewed range, as said above. The fix review's N-1 and the question about the word "camp" of the picture band are known and go to the request, as the handoff gives. I did not judge them again.

## Declined to judge

- The ordinary retry rhythm of 10, 20 and 30 s and its tests (`:268-330`): no commit of this range touches them, and earlier reviews of the change cover them.
- The D-323 handling in `last-resort.ts`, `app.ts` and `account-card.tsx`: the task (*Out of scope*) gives it to another task.

## Checks

| Check | Result |
|---|---|
| `git rev-parse HEAD` | `1d03bdeca3bdd07692f53015c9d4b65da6f86e73`, the head given |
| `git show 1d03bdec` / `git log e384f793..1d03bdec` | one commit, one file, 2+/2- in D-208 *Verification* |
| `python -B .the-way/elements/common/foundation_check.py` (from the worktree root) | exit 0, `0 errors` |
| Manual: the clause compared line by line with `game-saver.test.mjs:832-967` and `game-saver.ts:145-251` | matches; M-1 is the only gap |
| Manual: a search of the worktree (without `.runs/`) for `at that rhythm`, `before its request leaves`, `before the request leaves` | no other copy of the old wording; uses only in D-97, D-208, D-323 and the test, all consistent |
| Focused test `game-saver.test.mjs` | not run. The range changes no code and no test, so a run cannot tell this commit apart from its base. A run would also need a build into the reviewed worktree (`scripts/test.py:71-73`). The full gate was not run, as the handoff says. |

## Reaches beyond the dispatch

- `src/browser/view/app.ts:690-715` (`logOut`): to check D-97's claim that „Wyloguj” works again after a `failed` report.
- `src/browser/view/camp-picture.ts:55-75` and `foundations/glossary.md:91-95`: to check D-389 and the glossary against `atCamp`. The handoff asks whether anything in the change's entries is stale.
- `git diff e7b3d071..HEAD -- foundations/`: to see every entry the whole change writes, not only this commit.
- `scripts/test.py` (grep of how node tests run): to decide whether a focused run was possible without changing the worktree.

## Working copies

`.runs/review-return-step/fc.txt` holds the output of the foundation check. It is removed after this report; the empty directory `.runs/review-return-step/` remains.

## Unread material

- D-208 and D-323 read whole. D-97 read whole.
- D-389 read as its diff hunk only, plus `atCamp`.
- `game-saver.test.mjs` read at `:825-984` and by a grep of its `decision:` lines and its throw cases, not whole.
- `game-saver.ts` read whole.
- `task.md` read whole. The return step's report read whole.
- `review-whole-report.md` and `review-fix-1-report.md` not read; the handoff gives them for context only.

## Searches not found or unclear

none
