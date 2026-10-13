# Slice 1 review (c8a4b3b..b9400ed)

### Spec Compliance
- ✅ Spec compliant. main.ts:3-11 reads both variables with the required defaults and rejects non-integer, out-of-range and empty ports (exit 1, message with JSON-quoted value, before listen, so no readiness line); readiness (main.ts:16) and the error line (main.ts:20) use the actual host and port. app.ts untouched. README: variables line and the last sentence match the brief (Polish). No server name, SSH data or IPv6 address in the diff; no deploy/** change, so no WAY-48 cases apply.
- ⚠️ Not verifiable from the diff: the full `tests/invariants` run (report claims 51 run, 18 fail, all for files no slice made yet). I did not re-run it.

### Strengths
- `/^\d+$/` before `Number` rejects `3000x`, whitespace, signs, hex, `1e3` (ASCII-only `\d`, no `u` flag).
- Tests: valid-address test spawns the real built entry point and asserts the exact readiness line; the five invalid values each assert non-zero exit, value named in stderr, no readiness line. Unchanged occupied-port test kept.

### Deliberate break (account-server-occupied-address/1)
- Break, from the sentence (scratch copy of the worktree outside the repo, git-initialised so the support code can list files): in the `error` handler of main.ts, print the readiness line `Loop: http://${host}:${port}` and set `process.exitCode = 0`.
- Command: `python -B tests/invariants/test_account_server_occupied_address.py` in the copy (the gate runner takes a directory only; the single file was run directly).
- Result: the check FAILED at `self.assertNotEqual(result.returncode, 0)` ("0 == 0"). The normal-launch control before it passed. Check is effective. Worktree untouched; scratch copy left in the session scratchpad (`brk2`).

### Issues
#### Critical
none
#### Important
none
#### Minor
- src/server/main.ts:3 — `LOOP2_LISTEN_HOST=""` is kept by `??` and passed to `listen(port, "")`; Node treats an empty host as "all interfaces", so an accidentally empty variable (e.g. unset compose substitution) would expose the server publicly instead of failing or using 127.0.0.1. Consider `||` or rejecting empty host. Not required by the brief.
- src/server/main.ts:16 — IPv6 host gives `http://::1:3000` (no brackets); the implementer chose this deliberately, and the invariant/brief only say "the address actually used". Fine unless a later slice parses the line.
- tests/startup.test.mjs — no test for the occupied-address error naming a non-default address (main.ts:20); covered only by reading.

### Assessment
**Task quality:** Approved
**Reasoning:** Small, correct change matching the brief, with real behaviour tests; the invariant check catches a deliberate violation. Only the empty-host exposure is worth a decision.
