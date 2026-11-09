# Slice 3 report: a browser that breaks off its request body is refused, not logged as a failure

**Status:** done

**Worktree:** `the root of the repository`, branch `task/porzadki-z-uwag-pr`
**Base and start:** `2a58095` (start HEAD `2a58095`, `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`)

## Commit

- `6d18fb2` `fix: :bug: refuse a request whose body the browser breaks off as a refused body, with no failure line`

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/server/app.ts` | 3 | 1 |
| `tests/http.test.mjs` | 41 | 0 |

The change in `app.ts`: `request.aborted` (the error body-parser 2.4.0 raises when the client stops sending a body, `node_modules/raw-body/index.js:245`–`:250`, status 400, type `request.aborted`) joins the 400 group of the error handler. Its status is now 400, so the existing `if (status === 500)` branch writes no failure line, and the response is the same `Invalid request body` answer as a refused body.

## Test first

New case in `tests/http.test.mjs`: "a browser that breaks off sending a request body is refused and leaves no failure line" (D-353). It opens a real HTTP request to `/api/session` with valid proxy headers, the right Origin and JSON content type, `Content-Length: 64`, writes a partial body, waits until the server has received the request (`'request'` event on the server, so the case cannot pass by never reaching the handler), destroys the client, waits for the connection count to reach 0, asserts no failure line, then checks that `GET /api/account` still answers 401.

- Red, on the base code, before the `app.ts` change: `npm test -- tests/http.test.mjs`, exit code **1**. The failing assertion: `no failure line for a break-off`, with the actual line `{"failure":"request","kind":"BadRequestError","code":"ECONNABORTED","place":"app.errors"}`. The failure comes from the aborted path itself, which shows the request reached the handler.
- Green, after the change: `npm test -- tests/http.test.mjs`, exit code **0**: 74 tests, 74 pass, 0 fail.

## Checks run

| Command | Exit code | Result |
|---|---|---|
| `npm test -- tests/http.test.mjs` (before the `app.ts` change) | 1 | the new case fails as above; the other 73 pass |
| `npm test -- tests/http.test.mjs` (after) | 0 | 74 of 74 pass |
| `npm test -- tests/transport.test.mjs` (after) | 0 | 10 of 10 pass |
| `npx prettier --check src/server/app.ts tests/http.test.mjs` (after `prettier --write` on the test file) | 0 | all files use Prettier style |

Not run: the full `npm test` (not allowed for this slice, and the cycle runs it before the request); the Python foundation check `python -B .the-way/elements/common/foundation_check.py` (not in this slice's *Checks*).

Logs are in the scratchpad: `a temporary file outside the repository (slice3-red.log)`, `...\scratchpad\slice3-green.log`, `...\scratchpad\slice3-transport.log`.

## Own-work check

- **Requirement most likely not met:** "gets the answer a refused body gets ... where the connection still takes one" (slice Goal). The status 400 is the requirement that could be missed.
- **Check written and run:** the new case checks the absence of the failure line and that the server answers afterwards. It does **not** check the 400 status: a break-off closes the client's socket, so the response cannot reach the client. The status mapping was reviewed by reading the code, not by a run.
- **What it showed:** no failure line after the break-off on the new code; the failure line on the base code.
- Invariant tests: none changed. The trust-boundary case of `src/server/**` (the parsing of a crafted body) is unchanged; the change only adds one error type to the 400 group.

## Reaches beyond the handoff

- `guidelines/testing.md` and `...\guidelines\coding.md` read whole (the skill's testing rule and the handoff named them).
- `node_modules/body-parser` and `node_modules/raw-body/index.js`, read for the error type of a broken body (confirms `request.aborted`, status 400).
- `tests/transport.test.mjs`: searched for `aborted`, `destroy`, raw requests; not read whole (the slice's check runs it; it passed).
- `the author's private rules note on git`, read before the commit (the user's global instruction).
- `ui_check.md` read; not applicable (no screen changes).

## Choices

- **Map `request.aborted` to 400 in the existing group, not a separate branch.** The alternative was a separate `if` that skips the write. The group version keeps the same answer and the same `status === 500` guard, so no line is written. Cost if wrong: none seen; a future error type with the same name would also be treated as a refusal, which is the intent.
- **Destroy the client rather than half-close.** Destroy sends a FIN with no unread data on the client, so the server receives the partial body before the close. Cost: the case does not observe a response, which is why the status is unchecked (see the own-work check).

## Adaptations of the plan

- None structural. The plan's line range `src/server/app.ts:84`–`:118` matches the current error handler (lines 84–118 before the change). The handoff's `:90`–`:106` for the task's item 9 matches the 500 mapping region.

## Searches not found or unclear

- How a broken connection could carry the 400 answer to a client: not found. Node's server closes the socket on a client FIN, so the answer cannot be sent; the report does not claim it is observed.
- `project-level/technology/reserved_choices.md`: not read; no technology choice was needed.
- Whether the new case's wait-for-arrival could be stronger: the server's `'request'` event only proves the headers arrived. The partial body may not have been read yet when the client closes. In practice the failing run on the base shows the aborted path runs, so the case is not vacuous; a case that exercises the body read itself would need a hook inside body-parser, which the fixture does not have.

## Mismatch with the plan or the handoff

- None in the checks. The handoff's "`npm test -- tests/http.test.mjs`" check was run as written.
- D-353 has two parts: the break-off (this slice) and the blocked-account session write (not in this slice). Only the break-off part is implemented here.
