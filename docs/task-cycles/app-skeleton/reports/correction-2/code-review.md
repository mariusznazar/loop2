# Code review, correction 2 (range 0b96e9e..3af85d1)

Ran once each: `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/review.jsonl` (31 tests, OK, 43 s; both new invariants recorded pass per test with their `invariant:` ids) and `npm test` (5/5 pass). Port 3000 was free before and after. I also probed a started `dist/server/main.js` by hand with curl and killed only that process.

## Critical
None.

## Important

1. `tests/invariants/test_application_build_output.py:195-204` (`test_each_configuration_rejects_source_only_the_other_accepts`) asserts only `code != 0`. The sentence says the configurations stay apart; the test would also pass if the build failed for any unrelated reason (missing tool, config typo, a type error elsewhere), so it can pass without the property holding. Fix: also assert the build output names the probe file (`invariant_check_build_probe.ts`) and the missing symbol as a literal (`process` for the browser case, `document` for the server case), or the TypeScript error code written out as a literal.

## Minor

1. `tests/invariants/test_loop2_one_serving_process.py:178-184` (`test_api_requests_are_answered`) accepts any status 100-599. A server answering `/api/...` with the game's HTML (the very thing loop2-api-error-route forbids) passes here. This is declared in the docstring and covered by the other invariant, so it is not a defect; it only proves "an HTTP answer arrives". Keep the docstring wording as is.
2. WAY-69: the files the game test expects (`dist/public/*`) and their bytes come from the build at run time, not written out. The code the invariant is about (serving) does not compute them, so this is within the rule; the test fails loudly if there is no HTML or JS file. Writing `index.html` and `main.js` as literals would make it stricter (a build that silently emitted fewer files would still pass).
3. `test_loop2_one_serving_process.py:60` `PORT_WAIT = 300`: the check can sit 5 minutes behind a foreign holder of port 3000 before failing loudly. It is bounded and documented, but a gate with a shorter outer timeout would cut it off with no message. Also `tests/startup.test.mjs` binds 3000 itself, so `npm test` and the invariant run must not run in parallel (no check guards that).
4. `src/server/main.ts:3` binds `127.0.0.1` only. README says local use, so it is consistent, but D-05 speaks of "the container", where a loopback-only server is unreachable from outside. Not a defect of the skeleton; the deployment task must make host configurable or change it.
5. `src/server/app.ts`: Express sends `X-Powered-By: Express` (`app.disable('x-powered-by')` would remove the fingerprint). No security consequence at this stage.

## Verified clean
- Server (trust boundary src/server/**), probed live: `/.git/config`, `/index.html/`, `/main.js.map`, `//api/x`, `/api%2fx` give plain 404 without stack or path text; `/%E0%A4%A` (malformed encoding) gives a 404 page with no stack; `/api/%E0%A4%A` and `/API/x` give the JSON 404; POST to an unknown path gives "Cannot POST /x" only. Traversal variants are covered by `tests/http.test.mjs` and pass. `/api`, `/api/`, `/api/...` all answered by JSON 404 before static (matches README). Startup error handler prints code and message only, exits non-zero, and `listening` log is not printed on failure. D-07: the server computes nothing of the game.
- Checks against their sentences: loop2-one-serving-process/1 is tested on all four parts of the sentence (built game, `/api/` requests, one process via listener and descendants, Express 5 via installed major and the `router` debug lines; Express 4's `express:router` cannot match the regex). Inputs (API paths, DEBUG env, expected major 5) and the build-output probe sources, markers, config and directory names are literals; nothing is computed by the code under test. Deterministic apart from the port wait; every wait has a deadline; cleanup is correct (server tree killed, port release verified, temp copies and junctions removed also on failure paths). Citations use `# invariant: <id>/1` inside each test function, and the record shows one verdict per test (WAY-65).
- Foundation diff vs checks: no contradiction. `Derives from` ids for D-05 and D-06 match the Verification lines (D-05 names both loop2-one-serving-process and loop2-api-error-route; both have checks). Hashes `@e11aec4d`, `@094e6fa7` not recomputed by me.

## Verdict
Ready with fixes (Important 1; the Minor items are optional).
