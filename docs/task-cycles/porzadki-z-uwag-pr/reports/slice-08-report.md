# Slice 8 report: a test shows that a save of the game state is sent with `keepalive`

**Status:** done

**Worktree:** `the root of the repository`, branch `task/porzadki-z-uwag-pr`
**Base:** `ee5c375` (start head `ee5c375`)
**Commit:** `378259f` test: :white_check_mark: observe that a save of the game state is sent with keepalive, on the call the real fetch receives and on the local server

## Files changed

| File | Added | Removed |
|---|---|---|
| `tests/account-api.test.mjs` | 29 | 0 |

No product file changed in the commit. `src/browser/account-api.ts` was edited once for the defect run and restored before the passing run; `git status` shows it clean afterwards.

## The test

`saveGame hands the real fetch a PUT with keepalive and the server gets that request`, appended at the end of the file, with the comment "Decision D-207" above it.

- Wraps `globalThis.fetch` with a function that records `(input, init)` and calls the real fetch with the same arguments, unchanged. The wrapper is restored in a `finally`.
- Asserts, against literals and not against the code under test: the outcome is `{ kind: "saved", revision: 8 }` (precondition: the request was fully sent); the client handed exactly one call with input `/api/saved-game`, method `PUT`, and `keepalive` `true`; the local server saw exactly one request, `PUT /api/saved-game`.
- The file's existing `// invariant:` lines are not added: no invariant in `foundations/invariants.md` names `keepalive` (see "Searches not found or unclear").

## Checks

1. Defect run (command and exit code):
   - Temporary defect: `src/browser/account-api.ts`, the `exchange(...)` call in `saveGame`, last argument `true` changed to `false`.
   - Command: `npm test -- tests/account-api.test.mjs`, exit **1**.
   - Result: 22 pass, 1 fail. The failing test is the new one; it stops at its `keepalive` assertion: `false !== true` (`tests\account-api.test.mjs:903`). Log: `.../scratchpad/s8-defect.log`.
2. Defect taken out again: `true` restored in `src/browser/account-api.ts`; `git status` clean except the test file.
3. Passing run: `npm test -- tests/account-api.test.mjs`, exit **0**, `tests 23, pass 23, fail 0`. Log: `.../scratchpad/s8-pass.log`.
4. `npx prettier --check tests/account-api.test.mjs`, exit 0 (focused, on the changed file).
5. `npx eslint tests/account-api.test.mjs`, exit 0 (focused, on the changed file).

Not run: `npm test` without arguments (not run, by the handoff). The foundation check (`foundation_check.py`) was not run by this slice; it is the cycle's concern before the request.

## Own-work check

- **Requirement most likely not met:** the task's acceptance criterion ("each test added from items 11–19 was seen once failing on the code with the defect it catches"), and the plan's "observes what the client hands the real fetch and still sends the request to the real local server, replacing nothing".
- **Check written and run:** the defect run above (`true` to `false` at the call), which showed the test failing on the `keepalive` assertion, exit 1, then the passing run, exit 0.
- **Second concern checked:** the wrapper must not change the request. The server still received the PUT, and the outcome is the real `saved` with revision 8, so the wrapper passed the call on unchanged.
- **Trust boundary:** not touched; this slice changes only a test.

## Reaches beyond the handoff

- `.the-way/task-cycle/change/SKILL.md` and `slice.md`, whole, as the handoff names.
- `guidelines/coding.md`, `coding-browser-api-client.md`, `testing.md`, `src\browser\AGENTS.md`, `foundations\part_map.md:3-28`, `foundations\invariants.md:809-818` and `:1019-1028`, `foundations\decisions.md` D-117, D-204, D-207 and D-352 to D-354 (whole, at the end of the file): all as the handoff names. Only the browser-view entry of the part map was read, not the whole file.
- `foundations/decisions.md` grep for `keepalive` (search of the foundation, to see whether an invariant covers it).
- `the author's private rules note on git`, read before the commit as the user's instructions require. Its rules were followed: English message in the repo's form, explicit path in `git add`. The author address is the one the rule gives for the `mariusznazar` remote; nothing to change.
- `.the-way\task-cycle\change\ui_check.md` not read: the change does not alter what a screen shows.

## Choices

- **Observe through a recording wrapper around `globalThis.fetch`, which forwards the call unchanged**, rather than through a stand-in. Way rejected: a stand-in `fetch` (against the guideline's example "Test na prawdziwym lokalnym serwerze"). Cost if wrong: a wrapper that changed the call would test itself; the wrapper here only records and forwards, and the server-side assertion catches a request that did not arrive.
- **Expected value `true` written as a literal** from D-207, not read from the code. Way rejected: asserting the code's own argument. Cost if wrong: none known.
- **No `// invariant:` line on the new test.** Way rejected: inventing an invariant for `keepalive`. Cost if wrong: the test is not listed under an invariant in the file's own convention; a later invariant on the save's delivery would need a comment added.

## Adaptations of the plan to the code

- None. The line range `src/browser/account-api.ts:376`–`:382` matches the code (the `exchange` call with `true` is at lines 376–382). The `task.md:48-48` and `task.md:83-85` passages match the handoff.

## Searches not found or unclear

- **No invariant names `keepalive`.** `grep keepalive foundations/` finds it only in D-207 (lines 3752–3786), in its Verification (complies and violates lines), and in `environment_facts.md` `fetch-keepalive-body-quota` (lines 412–416), which is about the 64 KiB quota, not the choice of `keepalive` at the save call. The plan's Slice 8 names no invariant. Question for the orchestrator: should D-207's `keepalive` be given an invariant (for example for the `saveGame` call), or does the decision's Verification stand alone? Recommended answer: leave it as the decision; the test cites D-207 and no invariant is invented here.
- The handoff said the Choices table of the plan starts at `plan.md:537-550`; the table I read (from line ~537) matches the handoff's copy.
