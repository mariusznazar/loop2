# Executor report — slice 4: two assertions of the uncaught-failure test check behaviour

**Status:** done with concerns (see Unread material: the styleguide was read in part only, which I judge not to bear on a test-only change)

## Commits

- `fc00bda6` — `test: :white_check_mark: drop the timer count and the React warning count from the uncaught failure's assertions, and check that a tick after the error reads no clock (D-323, D-253)`

Range: `6cbdc8b7..fc00bda6` (one commit). No push, no amend, no foundation entry written.

## Files changed

- `tests/view/uncaught-failure.test.mjs` — 8 insertions, 14 deletions (`git diff --stat 6cbdc8b7 HEAD`).

What changed, against the slice:

1. Case "after an error nothing handled, in the clock's own reading, …": removed the precondition `intervals.size === GAME_INTERVALS` ("precondition: the game runs") and the assertion `intervals.size === GAME_INTERVALS - 1` ("the clock no longer ticks"). The case's destructuring became `({ root })`. The constant `GAME_INTERVALS` (now unused, which eslint reported) is deleted.
2. The same case, the tick after the error, is now an explicit check (the optional change the slice allowed): the tick runs in a try/catch, as the case already does for the reading that fails, and `assert.equal(tickError, null, "a tick after the error reads no clock")`. `assert.doesNotThrow` is not in the page-document `assert` helper, so the first attempt failed (see checks).
3. Case "an error in the drawing of a root of the game reaches the page through the window": removed `assert.equal(warning.mock.callCount(), 1)`. The `console.warn` mock stays (it keeps React's warning out of the output), and so do the page's console line and the header sentence assertions.

Every other assertion of the file stays, including the live-interval count inside `assertWaitingWithSentence`.

## Checks

Each run was made from the worktree root.

| Check | Command | Exit code | Result |
|---|---|---|---|
| Baseline, before any edit | `npm test -- tests/view/uncaught-failure.test.mjs` | 0 | 17 pass, 0 fail |
| First run after edits (failing) | `npm test -- tests/view/uncaught-failure.test.mjs` | 1 | Case 1 failed: `TypeError: assert.doesNotThrow is not a function` at the new line (the `assert` of `page-document.mjs` lacks it) |
| Lint after first edits (failing) | `npx eslint tests/view/uncaught-failure.test.mjs` | 1 | `'GAME_INTERVALS' is assigned a value but never used` (no-unused-vars) |
| Focused test after the fix | `npm test -- tests/view/uncaught-failure.test.mjs` | 0 | 17 pass, 0 fail, 0 skipped |
| Lint after the fix | `npx eslint tests/view/uncaught-failure.test.mjs` | 0 | clean |
| Formatting | `npx prettier --check tests/view/uncaught-failure.test.mjs` | 0 | "All matched files use Prettier code style!" |
| Typecheck | `npm run typecheck` | 0 | `node scripts/build.mjs --check` passed |

The one command `npm test` (no argument) was not run: the handoff reserves it for the orchestrator. The foundation check was not run; the handoff says it is red on this branch until slice 12, and it is not my check.

Each test's first run is green (the baseline), so no test was seen failing as a new test. The first failing run above is my own mistake in the edit, fixed before the commit.

## Own-work check (make-change section 3)

- **Requirement this change most likely does not meet:** the case must still protect "after an error nothing handled, the game state stays as it was": a tick after the error that reads the game's clock, or a save after time passes, would change the state.
- **Check:** the remaining case steps (the tick after the error, the "Pauza" and "4×" presses, the save at "Wyloguj" with `basedOn: 6` and the state from before the error) and the new explicit tick check. A tick that reads the clock throws the faulty reading's TypeError, which the try/catch now records as a failed assertion instead of an escaped exception.
- **Showed:** the focused run passes on the unchanged product code, which the slice requires.
- **Not run:** a deliberate break in the product code (a clock that reads after the error) to watch the case fail. I did not do it: the slice says no product code changes, and the testing guideline's "seen failing once" rule is for new invariant tests, not a removal. So I have not re-seen the case fail after the edit. This is the main gap of the check.

## Changed invariant test, named

- `uncaught-failure-game-state` (the test "after an error nothing handled, in the clock's own reading, the game state stays as it was and every save sends the state from before the error") — assertions removed as above, one explicit check added. Its other steps are unchanged.

## Choices

- The explicit tick check uses try/catch and `assert.equal(tickError, null, …)`, not `doesNotThrow`, because the page-document `assert` helper does not provide `doesNotThrow`. Way rejected: importing `node:assert` — the testing guideline (D-264) forbids it in a jsdom helper's file, since comparing an element through it can exhaust memory.
- The removed `GAME_INTERVALS` constant: kept no alias. Cost if wrong: none; no other reader in the file.

## Unread material

- `guidelines/styleguide-browser-view.md` — read only its "When to read" section and its heading list (lines 1–12 and the headings), not whole. The handoff lists it because `tests/view/**` is part of `browser-view` (`foundations/part_map.md`). The change touches no visual rule, no role, no class and no attribute, so I judged its rules do not bear on it; the orchestrator may want a full read on the record.
- `src/browser/AGENTS.md` and `.claude/skills/loop2-play/SKILL.md` — not read; the handoff names them only for `src/browser/` work and for running the game, and neither applies.
- `foundations/decisions.md` and `foundations/invariants.md` — read only the entries named in the handoff (D-253 lines 1739–1788, D-323 lines 4320–4333, invariant `uncaught-failure-game-state` lines 1228–1236).
- `docs/task-cycles/przejscie-widoku-na-react/spec.md` — read lines 18–21 (goal 7) and 170–189 (Decision 7's test items, including the sections of To do 7); not the whole spec.
- `docs/task-cycles/przejscie-widoku-na-react/task.md` — read lines 31–34 (To do 7 and its neighbours) only.
- `tests/view/page-document.mjs` — read lines 93–166 as the handoff names.
- `guidelines/coding.md` and `guidelines/testing.md` — read whole (testing.md in two reads, 1–336 and 337–487).

## Searches not found or unclear

- `doesNotThrow` — looked for it in the page-document `assert` helper; not there. Confirmed by the failing run. Resolved by try/catch.
- The handoff says the `console.warn` count is at line 942 and the clock assertions at 399–403; both matched the file as read, so there was nothing unclear.
- none otherwise.

## Reaches beyond the handoff

- Read the whole of `guidelines/testing.md` and `guidelines/coding.md` (the handoff asks for them whole, so this is in scope; listed for the record).
- Ran `npm run typecheck` (the handoff does not list it; it is among the focused checks the slice's Checks name only in part). Harmless: `scripts/build.mjs --check`.
- Read the part map (`foundations/part_map.md`, first 20 lines) to confirm `tests/view/**` belongs to `browser-view`.

## Working copies

None made. The scratch logs I wrote into `.runs/` during the checks were removed (`.runs/executor-4-test.log`, `.runs/executor-4-typecheck.log`). The worktree is clean (`git status --short` empty after the commit).

## Problems observed

- none in the product. The test file's header comment ("the clock still reading") remains accurate: a clock that still reads after the error is still caught, now by the explicit tick check.
