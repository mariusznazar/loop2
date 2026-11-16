# Report — slice 16, cycle `drobne-bledy-ekranow`

**Status:** done

## Commits

- `1130a9be` fix: :bug: send the game state at the hidden page and at the 30-second rhythm after a failed save too, in place of the planned retry (base `dc787331`)

## Files changed

- `src/browser/view/game-saver.ts` — +7 / -3: `check` sends where `failures > 0 || read() !== baseline`; the header comment and the doc comment of `check` say so.
- `tests/view/game-saver.test.mjs` — +101 / -2: three new cases (section "after a failed save"), one comment of an existing case corrected.

## The change

`check` (the one function behind both the 30-second rhythm and the hidden page) returned without sending when the state read was the baseline, and a failed save leaves its own state as the baseline. `failures` already counts the failed saves in a row (reset by `saved` and `too-large`, raised by `failed`), so `failures > 0` is exactly "the save last sent failed"; no new variable. `sendNow` already calls `cancelRetry()`, so the send of a check takes the place of the planned retry, and `check` already returns during a request, so one request waits at a time. A save refused as too large is not "failed" (`failures` is 0), so the too-large case (D-208) is unchanged; its existing test still passes.

## Checks

| Check | Command | Exit |
|---|---|---|
| The three new cases seen failing (the hidden page: `sent.length` 1 expected 2; the rhythm: same; the success case: same at its first assertion) | `npm test -- tests/view/game-saver.test.mjs` before the code change | 1 (log: `reports/slice-16-red.log`) |
| game-saver, after the change | `npm test -- tests/view/game-saver.test.mjs` | 0 (23 pass; log `reports/slice-16-game-saver.log`) |
| state-store | `npm test -- tests/view/state-store.test.mjs` | 0 (12 pass) |
| uncaught-failure | `npm test -- tests/view/uncaught-failure.test.mjs` | 0 (19 pass) |
| account-screen | `npm test -- tests/view/account-screen.test.mjs` | 0 (133 pass) |
| eslint | `npx eslint src/browser/view/game-saver.ts` (and `tests/view/game-saver.test.mjs`) | 0 / 0 |
| prettier | `npx prettier --check src/browser/view/game-saver.ts tests/view/game-saver.test.mjs` | 0 |

Not run: the full suite (not mine to run).

## Own-work check

Requirement most likely not met: "the rhythm never sends beside a planned retry" — a check's send must take the place of the planned retry, not add a second request. Check: the case "a tick of the 30-second rhythm after a failed save sends once …" (failure at 29 s, retry planned for 34 s, rhythm at 30 s sends once, nothing at 34 s, the next retry after the second failure waits 10 s). Mutation to prove it: I replaced the `cancelRetry()` call in `sendNow` with a comment for a moment (`npm test -- tests/view/game-saver.test.mjs`, exit 1, 4 failures, among them this case and the hidden-page case), and restored the source (the committed file holds no mutation; verified by `grep -c mutated` = 0 before the commit).

## Choices

- Used `failures > 0` instead of a new flag `lastFailed`: one source of truth, already reset at the right outcomes. Cost if wrong: if `failures` ever gets another meaning, the check follows it; the three cases hold the behaviour.
- Test of the rhythm uses `passing()` with `realMsPerRead = 0` (default) so no change comes after the failure and the send can only come from the failure.

## Questions and concerns

None. D-207 already holds the sentence "or where the save last sent failed" (decisions.md:3724) and its complies/violates lines at the base, so no foundation edit was needed. The plan's slice text and the code agreed; no section-4 adaptation.

## Reaches beyond the handoff

None.

## Unread material

- `guidelines/styleguide-browser-view.md` — not read (the change touches no style, token or screen; only its heading count was taken).
- `foundations/decisions.md` D-97, D-209, D-211, D-323; `foundations/glossary.md:235-239`; the three invariants (`expired-session-unsaved-progress`, `saved-state-http-exchange`, `uncaught-failure-game-state`) — not read; D-207 and D-208 were read whole, and the change touches only what they say.
- `.runs/task-cycles/drobne-bledy-ekranow/task.md` — read only the passages the handoff copied.

## Searches not found or unclear

none

## Working copies

`.runs/slice-16/` (logs and a backup of the source for the mutation run) stood in the worktree; removed. Kept in `reports/`: `slice-16-red.log`, `slice-16-game-saver.log`.
