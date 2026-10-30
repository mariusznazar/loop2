FAIL 3bd8f3f897cc5747249480d5fe493d2c16b1ae5a

# Review of the fix — return-step review `FAIL 188b836`, task `zapis-stanu-na-serwerze`

- **Reviewed:** the fix range `188b836..3bd8f3f` — `dbd0fa6` (I-1, guidelines) and `3bd8f3f`
  (I-2, comments in `src/browser/view/game-saver.ts` and a new test in
  `tests/view/game-saver.test.mjs`). `git rev-parse HEAD` = `3bd8f3f897cc…`, the head given.
- **Method:** `.the-way/task-cycle/review/SKILL.md` with `fix.md` (review of a fix).
- **Read:** the findings file `reports/31-return-fix-findings.md`, the fix report
  `reports/31-return-fix-report.md`, `git diff 188b836..3bd8f3f`, `git log 188b836..3bd8f3f`.

## Findings of the findings file

### I-1 — the saved-game guidelines restate D-190 narrower than D-190 reads: **fixed**

- `guidelines/coding-saved-game.md:8-10` and `guidelines/coding.md:18` now read „…albo dokument
  pobrany z serwera lub zachowany w pamięci strony po zapisie, który nie zastał sesji, na stan gry
  lub odmowę.” That is D-190's binding sentence (`foundations/decisions.md:3546-3549`, "a saved game
  state downloaded from the server or kept in the page's memory (D-188)"), and the D-188 condition
  is spelled out.
- `guidelines/coding-saved-game.md:122-125` now adds „dokument zachowany w pamięci strony go nie
  ma, a wczytanie przyjmuje oba.” This is true: `savedDocument` reads `revision` only when it is
  present (`src/browser/sim/saved-game.ts:872-878`), and the kept document is `savedGame(state)`
  with no `revision` (`src/browser/view/game-view.ts:52-55`, `:242-245`).
- Evidence: `git grep -n -E "pobrany z serwera|dokument z serwera" -- guidelines src` finds only
  the two widened lines; `foundation_check.py` 0 errors.
- Approval (WAY-172): the text uses the meaning D-190 now carries. As the fix report says, the
  orchestrator names these guideline lines together with D-190 for the human at the merge.

### I-2 — the saver's comments drop D-184's logout exception: **remains** (new defect in the fix's own words)

The doc of `moment()` (`game-saver.ts:62-65`) is now right: "…at once or after the request in
flight, except when that request is the save before a logout that goes on (D-184)." The new test is
sound (below). The module header that replaced the old sentence is not:

- **Place:** `src/browser/view/game-saver.ts:3-5`: "every moment of saving during one coalesced into
  one more save after its answer, except during the save before a logout that goes on, **after
  which nothing more is sent** (D-184)".
- **What is wrong:** "after which nothing more is sent" is false, and the sentence gives it to
  D-184, which says nothing of the kind. D-184 (`foundations/decisions.md:3327-3330`) drops only
  the moment asked for *during* that request. After the logout save's answer the saver is not
  halted. A later `moment()` sends at once, and the 30-second check keeps sending a changed state
  (`moment()` checks only `disposed`, `halted`, `inFlight`, `:211-215`; the interval is still set,
  `:205`). The page needs that. While `POST /api/logout` is under way the game is still on screen.
  When that request fails, D-97 keeps the game with a warning (`app.ts:339-344`), and the player
  plays on, so saving has to go on.
- **Why it matters:** this is the same thing I-2 was about, the other way round. A file of the
  change restates D-184 more broadly than it reads, which WAY-263 grades Important. An agent who
  takes the header as the saver's contract can make the code match it, for example by halting the
  saver after a logout save that goes on. Then the player whose logout request fails stays in the
  game and saves nothing more, with no sentence in the header (no save fails, none is sent). That is
  progress lost without a word, against D-184 and D-185. No test protects against it. The new test
  disposes the saver right after the answer. The existing logout tests check only that a refusal
  is not *retried* (`:478-495`), not that later moments still send.
- **Evidence:** a scratch test in a separate worktree of `3bd8f3f` (method below): after
  `saveBeforeLogout()` answered `saved`, `game.act(setPace(…, 4))` + `saver.moment()` sent a second
  request, and after its answer a further act + `mock.timers.tick(30_000)` sent a third. It passed
  (exit 0, 18 pass), which shows that something more is sent.
- **Fix:** drop "after which nothing more is sent", or say what is true. For example: "…except a
  moment asked for during the save before a logout that goes on, which is dropped (D-184)". The
  pre-existing inline comment at `:186`, "A logout that goes on takes the game away; only a failed
  one keeps saving.", has the same overstatement. It lies outside the fix diff, so per `fix.md` it
  is only a Minor note here, but the same edit should correct it ("…takes the game away once the
  session ends").

The test this commit adds is sound. At `3bd8f3f` it passes. With the block
`if (outcome.kind !== "failed") { pending = false; return; }` (`game-saver.ts:187-190`) removed, it
fails with `AssertionError: saved: nothing more is sent` (16 pass, 1 fail). It asserts on the
requests actually sent, not on a value it computes itself. Its assertion message "nothing more is
sent" is right within its scope: nothing more after that answer before `dispose()`.

## New findings in the fix diff

- **Important:** the header sentence above (counted under I-2 as remaining, as `fix.md` asks for a
  new Important finding in the fix diff).
- **Minor:** none besides the `:186` note.

## Declined to judge

- The Minor findings m-1 – m-4 of `reports/30-return-review-report.md`: not in the findings file,
  so not fixed (WAY-161). The new test closes m-3.

## Checks

| Check | Result |
|---|---|
| `git rev-parse HEAD` (reviewed worktree) | `3bd8f3f897cc5747249480d5fe493d2c16b1ae5a`, the given head |
| `git log 188b836..3bd8f3f`, `git diff 188b836..3bd8f3f` | 2 commits; 4 files; `game-saver.ts` comment lines only |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) | exit 0, "0 errors" |
| `git grep -n -E "pobrany z serwera\|dokument z serwera" -- guidelines src` | only the two widened lines |
| Separate worktree: `git worktree add --detach <scratchpad>\wt-fix-review 3bd8f3f`, `node_modules` as a junction to the reviewed worktree's | made, then removed with `git worktree remove --force` after the junction was removed; the reviewed worktree's `node_modules` intact |
| `npm test -- tests/view/game-saver.test.mjs` (separate worktree, as committed) | exit 0, 17 pass |
| Same, with `game-saver.ts:187-190` removed | exit 1, the new test fails: `saved: nothing more is sent` (16 pass, 1 fail); file restored with `git checkout` |
| Same, with a scratch test appended (a moment and the 30-second check after the logout's save answered `saved`) | exit 0, 18 pass: both later saves sent, so the header's claim is false; file restored with `git checkout` |
| `npm test -- tests/quality/test_quality_invariants.py` (separate worktree) | exit 1: `test_ruff_source_rules` and `test_shellcheck_source_rules` raised `FileNotFoundError`, because `ruff` and `shellcheck` are not on the path in the scratch worktree. The other 3 (Prettier and ESLint included) passed. The fix touches no Python or shell file, so those two are unverified here, not failed. The fix report has them passing in its own run |
| `git status --short` (reviewed worktree), before and after | clean |

Not run: `npm test` with no argument (the cycle's gate).

## Reaches beyond the dispatch

- `.the-way/task-cycle/review/fix.md`: the method for reviewing a fix.
- `src/browser/view/app.ts:307-345`: whether the game and its saver live on after the logout's
  save, for the header's claim.
- `foundations/decisions.md` D-184 and D-190: to compare the restatements.

## Searches not found or unclear

- None.
