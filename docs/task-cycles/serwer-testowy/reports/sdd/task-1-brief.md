### Slice 1 — listen address from the environment

- **Goal:** `src/server/main.ts` takes its listen host and port from `LOOP2_LISTEN_HOST` and
  `LOOP2_LISTEN_PORT`, defaulting to `127.0.0.1` and `3000` when unset; a port that is not an
  integer from 1 to 65535 (an empty value included) makes the process exit non-zero with a message
  naming the value and no readiness line; the readiness line and the occupied-address error name
  the address actually used. README (Polish) gains one line naming both variables, and its last
  sentence says the skeleton is deployed to the test server through the container and the
  `loop2-deploy` skill. `src/server/app.ts` is unchanged.
- **Change:** `src/server/main.ts` · `tests/startup.test.mjs` · `README.md`
- **Read:** `task-frozen.md` · `spec.md`
  `src/server/app.ts` · `package.json` · `foundations/invariants.md`
  `tests/invariants/test_account_server_occupied_address.py`
  `tests/invariants/loop2_invariant_support.py:212-293`
- **Checks:** first, new tests in `tests/startup.test.mjs`, failing: the variables set to a free
  port on `127.0.0.1` give a readiness line naming that address; `0`, `65536`, `abc`, `3000x` and
  an empty value each give a non-zero exit, a message naming the value and no readiness line. Then
  `npm test` (the unchanged occupied-port test on the default address included), and afterwards,
  never at the same time as `npm test` (both use port 3000),
  `python -B .the-way/gate/run_tests.py tests/invariants`: every check that passed at the base
  still passes; checks the foundation step added for files no slice has made yet fail as expected.
- **Depends on:** none

