# Slice 1 report

Status: DONE. Commit: see `git log` (feat: read the account server listen address from the environment).

RED: new tests in tests/startup.test.mjs failed before the change (server ignored the variables; spawnSync ETIMEDOUT).
GREEN: `npm test` 11 pass, 0 fail (unchanged occupied-port test included).
Invariant gate: 51 run, 18 fail; all failures are checks for Dockerfile, compose, deploy script and workflow
that no slice has made yet (none concerns the occupied-address check, which passes).

Choices: invalid port exits via process.exit(1) with stderr naming the JSON-quoted value; port must match /^\d+$/ and be 1..65535.
IPv6 host: readiness line unchanged (no brackets). README: listen-address sentence and last sentence updated (Polish).
