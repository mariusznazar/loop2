# Report 14 — slice 4: the browser sends its last-resort line

**Status:** done with concerns (details in "Concerns" below)

**Base:** `563510db37ad30ef0d00814dfcab97e8aeaffe07` · **Branch:** `task/skad-wiem-o-awarii` · **Pin:** `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96` (checked with `git -C .the-way rev-parse HEAD`)

## Commits (on the task branch, not pushed)

- `accf929` feat: :sparkles: send the browser's last-resort line to POST /api/browser-failure once per distinct line
- `7bf49e5` docs: :memo: add the browser's failure report to the responsibility of the part browser-view

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/account-api.ts` | 12 | 0 |
| `src/browser/view/last-resort.ts` | 6 | 0 |
| `src/browser/view/app.ts` | 16 | 1 |
| `tests/account-api.test.mjs` | 118 | 0 |
| `tests/view/uncaught-failure.test.mjs` | 100 | 0 |
| `foundations/part_map.md` | 1 | 1 |

What changed:

- `src/browser/account-api.ts`: one method on the account client, `reportBrowserFailure(kind, code, place)`, which posts `{kind, code, place}` to `/api/browser-failure` through the existing `noContentRequest` (the same `exchange` as the other calls: default time limit, `credentials: same-origin`, `redirect: error`, no `keepalive`). It returns `AccountResult<null>`; a 204 is success, a refusal, a dead connection or any other status is a result.
- `src/browser/view/last-resort.ts`: optional option `onLine?(kind, code, place)`, called inside the existing "not written before" guard, right after `console.error(line)`. The module does no network work. Console line and screen sentence unchanged.
- `src/browser/view/app.ts`: `reportLine` passed as `onLine`. It calls `client.reportBrowserFailure(...).catch(() => undefined)` inside a `try`/`catch`, so a throwing or refusing client cannot become an error of the handler. The result is ignored; a failed send is not repeated.
- The two test files and the part map: see the sections below.

## Test-first runs (the failing run first, then the passing run)

Both new test groups were written before the implementation. For the account client a stub method (returning an `unexpected` failure) was added first so the tests reach their assertions.

1. `npm test -- tests/account-api.test.mjs`, before the implementation (stub only): exit **1**, 2 new tests failed on assertions (`deepStrictEqual` of the stub's `unexpected` failure against `{ok: true, value: null}`, and of `[false, 'unexpected', undefined]` against `[false, 'unreachable', 'network']`). Output: `a temporary file outside the repository`.
2. `npm test -- tests/account-api.test.mjs`, after the implementation: exit **0**, 24 of 24 pass. Output: `…\scratchpad\s4_acc_pass.txt`.
3. `npm test -- tests/view/uncaught-failure.test.mjs`, before the implementation: exit **1**, 2 new tests failed on assertions (`expected [...], got []`: no report sent). The third new test (a throwing or refusing client) already passed at this point, as expected: it guards the call, and the callback did not exist yet. Output: `…\scratchpad\s4_unc_fail.txt`.
4. `npm test -- tests/view/uncaught-failure.test.mjs`, after the implementation: exit **0**, 17 of 17 pass. Output: `…\scratchpad\s4_unc_pass.txt`.

(`…\scratchpad` = `a scratch directory of the orchestrator's session`.)

## Checks (command and exit code)

| Check | Exit | Result |
|---|---|---|
| `npm test -- tests/view/uncaught-failure.test.mjs` (after) | 0 | 17/17 pass |
| `npm test -- tests/account-api.test.mjs` (after) | 0 | 24/24 pass |
| `npm test -- tests/view/page-document.test.mjs` | 0 | 56/56 pass (not named by the slice's first two runs; the slice names it) |
| `npm run typecheck` | 0 | `node scripts/build.mjs --check` passes |
| `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` (the part-map edit) |
| `npx prettier --check src/browser/view/last-resort.ts src/browser/view/app.ts` | 0 | formatted |
| `npx prettier --write` on `src/browser/account-api.ts`, `tests/account-api.test.mjs`, `tests/view/uncaught-failure.test.mjs` | 0 | diffs are additions only; no existing line reformatted |

Not run (not named by the slice): ESLint, the full gate `npm test` without arguments, `tests/http.test.mjs`, `tests/transport.test.mjs`. The orchestrator's gate covers them. Nothing in the slice's *Checks* failed.

### Mutation checks (own work, not part of the named checks)

- Callback moved outside the once-per-line guard in `last-resort.ts`: `npm test -- tests/view/uncaught-failure.test.mjs` exit **1**, 1 failed, 16 passed. Caught by the once-per-line test. Restored; the file was checked against the saved copy before the next run.
- Try/catch removed in `reportLine` (`app.ts`): exit **1**, 3 failed, 14 passed. The existing test doubles have no `reportBrowserFailure` method, so the unguarded call throws there too; the guard is therefore needed for the existing tests, not only for the new one. Restored.

## Own-work check (section 3 of the method)

- Requirement most likely unmet: the server must accept every line the page sends (kind, code and place as the page writes them), or the report is refused silently.
- Check: read `tests/http.test.mjs:4530-4545`, which feeds the route the two real places (`view/last-resort.installLastResort`, `view/account-card.createAccountCard`) and the page's word pattern. Those cases exist from slice 3 and are not run in this slice.
- Showed: covered by the existing slice-3 test, by reading. Not re-run here; the gate runs it.
- Second requirement: one report per distinct line per page load, after the console line. Checked by the new test "each distinct line goes to the account client once per page load, after its console line" (written counts 1 and 2 at the calls), and by the mutation above.

## Reaches beyond the handoff

- `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `guidelines/coding-browser-api-client.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`: these are named in the handoff's *Read*. I read them **after** writing the tests and changing files, not before. Result: the tests comply (literal expected values, the `assert` from `tests/view/page-document.mjs` in the jsdom file, no existing test changed). The styleguide is about screens and states; this change alters no screen, so none of its rules applies. The browser-api-client guideline's "nothing replaces fetch" is discussed under Concerns.
- `.the-way/elements/part-map/skill/SKILL.md` and `.the-way/elements/part-map/skill/write.md`: read to make the part-map edit, which the handoff names as "written through the-way-update-part-map". The repository's own skill entry (`.the-way/.agents/skills/the-way-update-part-map/SKILL.md`) sends me to these files.
- Spec passages and foundation entries named in the handoff, read by line range: spec `35-46`, `72-91`, `185`, `217-225`; `decisions.md` D-252, D-253, D-323, D-347; `invariants.md` `account-client-requests`.
- `scripts/test.py` (to see that `npm test -- <file>` builds first for `.test.mjs` files), `src/browser/view/app.ts` `startApp`, `tests/view/uncaught-failure.test.mjs` helpers, `tests/account-api.test.mjs` harness.
- `a note in the author's notes vault`: read before the commits (explicit paths, English message).
- Each commit: `git add` with explicit paths, message in the repository's `type: :emoji:` style.

## Concerns

1. **`fetch` pass-through in `tests/account-api.test.mjs`.** The slice requires "no keepalive" to be tested on the real local server, but the server cannot see the `keepalive` option. The only way to check it is to see the options the client gives to `fetch`. I wrapped the real `globalThis.fetch` (`withRecordedFetch`): it records the options and passes every call on to the real function, so nothing is substituted. This is a call check on options, not an effect outside the product; `guidelines/testing.md` ("Doubles") prefers checks of visible effects. Kept because the slice and the spec ask for it. The orchestrator decides whether to keep it, or to drop the `keepalive` / `credentials` assertions and rely on review.
2. **Part-map step 4 not run as a show to the human.** `write.md` step 4 is "show the entry". The handoff says "Leaves nothing for the human" and the cycle delegated intermediate choices to the orchestrator, so I did not ask. The sentence is the same kind of one-line change as slice 3's commit `563510d`. The new sentence in `foundations/part_map.md`: "reports to that server each distinct line its last-resort handling writes for an error nothing handled". Flagged so the orchestrator can reject it.
3. **Late reading of the guidelines.** See "Reaches beyond the handoff": the testing and styleguide files were read after the work, not before.
4. **Default time limit not tested.** The slice names "default time limit" as a property of the new method. The new method uses the client's existing `timeoutMs` (the default `15_000` or the test's value); no test asserts the default itself. The existing timeout tests cover the exchange.
5. **Test for `throws`/`refuses` passed before the implementation.** Expected, as explained in the test-first runs; it is a guard test that the implementation must keep passing.

## Choices made

- Method name `reportBrowserFailure`, option name `onLine` (both left to the maker by the spec).
- Callback called after `console.error` (the line is written, then reported), inside the guard, so a line reaches the server once per distinct line per page load.
- The guard in `app.ts` is `try`/`catch` around the call, plus `.catch(() => undefined)` on the returned promise. Rejected alternative: awaiting the result (would make the handler async; the handler is synchronous).
- Two commits (code and tests together, then the part-map sentence), not one, to keep the foundation edit separate.

## Searches not found or unclear

- Looked for an existing test of `keepalive` in `tests/` before writing the account-client check: not found (`grep -rn keepalive tests` gives no match). That is why the fetch pass-through is new.
- Unclear: whether the spec's "default time limit" should be asserted; see Concerns 4.

## Problems observed

- The `scripts/test.py` runner builds `dist/` for `.test.mjs` files, so `node scripts/test-node-file.mjs <file>` run directly fails with a stale build (my first attempt). `npm test -- <file>` is the reliable command.
- The first account-api failing run wrote its output to the system temp folder, not the scratchpad. The file is named in the test-first list above.
