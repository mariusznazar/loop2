# Slice 4 report

**Status:** done with concerns

## Files
- `src/browser/account-api.ts` (+161/-6): `loadSavedGame()`, `saveGame()`, types `SavedGame`, `SavedGameSubmission`, `SaveOutcome`, constant `maxSaveBodyBytes`; three new codes in `refusalCodes`; `exchange` now takes the body string, a PUT method and a `keepalive` flag (`saveGame` passes true).
- `tests/account-api.test.mjs` (+298): both methods on the real local server.

## Checks
- `npm test -- tests/account-api.test.mjs`: before the code, exit 1 (methods missing, TypeError, so not yet an assertion failure); after, exit 0.
- Own-work mutation (the "never sent" requirement): measured by character count instead of UTF-8 bytes, the case "a save body over 65 536 bytes is never sent and comes back too large" failed on its assertion; code restored, exit 0 again.
- `npm test -- tests/quality/test_quality_invariants.py`: exit 0.
- Not run: whole gate (per handoff).

## Concerns / choices
- `keepalive: true` cannot be observed by a Node server on the wire, so no test pins it; a mutation that drops it is not caught by a test (review reading only).
- 401 maps to signed-out by status alone (spec: "signed out (401)"); 409 and 413 need the known code, else they come back as failed/refused.
- Success body of save: exactly `{ revision }` with a positive safe integer; load value is `SavedGame | null` (the `save` as received).
- Size is measured on `JSON.stringify({version, basedOn, game})` with TextEncoder.
- Reach beyond dispatch: `src/server/account-routes.ts` lines ~375-410 (status and code of refusals), to match the server contract.

## Searches not found or unclear
none
