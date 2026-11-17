# Report — executor of slice 14: the account server's default address under a fully configured start

**Status:** done with concerns (one concern about D-49, below; the slice itself is made as the plan and To do 9 give it)

## Commits (range starts at base `4377e4f36d26b1a8a2b4ee1790bc7a2a92a757f2`)

- `dbba14992ad04ea0cb6d8efff95c7590020336f0` — `test: :white_check_mark: add the case of a fully configured valid start without the listen variables to the check of account-server-default-address, seen failing with the server's default port changed for a moment and restored byte for byte`

## Files changed

- `tests/invariants/test_account_server_default_address.py` — +49 / −9. The body of the existing case moved, with no change of behaviour, into a helper `assert_default_address(environment)`; the existing case calls it with the environment it always had (`NODE_ENV=test`, no listen variable, no account setting). The new case `test_fully_configured_server_without_listen_variables_takes_127_0_0_1_3000`, with `# invariant: account-server-default-address`, writes a session secret file (two distinct random 32-byte base64url keys) and an SMTP password file in a temporary directory, sets all nine account settings valid (database path in that directory, origin `https://game.example.test:8443`, proxy mode `cloudflare-tunnel`, mail settings), `NODE_ENV=production`, neither `LOOP2_LISTEN_HOST` nor `LOOP2_LISTEN_PORT`, and expects what the first case expects (the readiness line on `127.0.0.1:3000`, or a non-zero exit naming `127.0.0.1:3000` with `EADDRINUSE`). The module docstring now names both cases and what it does not cover.
- No file under `src` changed (see the checks).

## Checks (command, exit code)

| Check | Command | Exit |
|---|---|---|
| Green before the break | `npm.cmd test -- tests/invariants/test_account_server_default_address.py` (output `.runs/executor-14/green1.txt`: `Ran 2 tests`, `OK`) | 0 |
| **Seen failing**, with `src/server/main.ts` changed for a moment: `?? "3000"` to `?? "3001"` | `npm.cmd test -- tests/invariants/test_account_server_default_address.py` (output `.runs/executor-14/red.txt`) | 1 |
| Restored byte for byte | `git checkout -- src/server/main.ts`, exit 0; `git status --short` then showed only the test file; `git diff --stat -- src` empty | 0 |
| Green after the restore (this is the command that later shows it passing) | `npm.cmd test -- tests/invariants/test_account_server_default_address.py` (output `.runs/executor-14/green2.txt`: `Ran 2 tests`, `OK`) | 0 |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` — `0 errors` | 0 |
| Ruff on the file | `.runs/quality-venv/Scripts/ruff.exe check tests/invariants/test_account_server_default_address.py` — `All checks passed!` | 0 |
| The slice's second check | `git status --short -- src` shows nothing | (empty) |
| After the commit | `git status --short` empty | (empty) |

The failing run: both cases failed, each with `Regex didn't match: '(?m)^Loop: http://127\.0\.0\.1:3000$' not found in 'Loop: http://127.0.0.1:3001\n' : the server reported ready on another address` — the assertion failing for the expected reason. The failure of the new case shows that the fully configured start reached its listening step and printed its readiness line, so its settings were accepted.

I did not run the product's gate (`npm.cmd test` without a file) or `gate_times.py`.

## Own-work check (section 3)

- **Requirement most likely not met:** To do 9 asks for a start that is *fully configured and valid*. The risk is a case that silently takes the unconfigured path, or one whose settings the server refuses, and so proves the default address only for the first case again (or fails for another reason).
- **Check:** the new case sets `NODE_ENV=production`, where `readAccountConfiguration` (`src/server/configuration.ts:170`) refuses an unconfigured start, so the configured path must run; and the red run above shows the server of that case printing `Loop: http://127.0.0.1:3001` under the changed default. A refused setting would give a non-zero exit with no readiness line and no `EADDRINUSE`, which the case treats as a failure.
- **Showed:** the settings are accepted (readiness line printed) and the case fails on the default address alone, as the slice requires. I did not add a separate case in which one setting is invalid; `tests/startup.test.mjs` holds the refusals, and the docstring says this case does not cover them.

## Mutation in my head

A default host changed (for example `0.0.0.0`) fails the readiness regex; a default port changed fails it (seen); an exit 0 without readiness fails `assertNotEqual`; a start that hangs fails the `START_WAIT` assertion. A case that takes `NODE_ENV=test` with all settings (non-production) would run the same path except for the proxy-mode rule; not covered, not required by To do 9.

## Concern: D-49 and a second test without the listen variables

`foundations/decisions.md:1057-1070` D-49 reads "The one exception is a single test of the default address" and lists as violating "a second test that starts the server without `LOOP2_LISTEN_HOST` and `LOOP2_LISTEN_PORT`". The slice and To do 9 ask for exactly a second case in the same file that does that. I made the case as the plan says (the file is the single test of the default address, the invariant has two cases, as D-111's text says "wholly unconfigured non-production and fully configured valid startup"), and I did not touch the foundation. The orchestrator or the reviewer may want D-49's wording to say "the checks of the default address", through `the-way-record-decision`; if D-49 is read strictly, the slice breaks it. Cost if left: a reviewer reading D-49 strictly flags the second case; the occupied port 3000 cannot make the case fail either way, since it passes whether or not the address is free.

## Choices

- A shared helper for both cases instead of a copy of the body: the loop of waiting and the three assertions stay in one place, so the two cases cannot drift apart. Rejected: a copy in the second method (drift) and a `subTest` in one method (one case could hide another's failure, and the plan asks for a second case).
- `NODE_ENV=production` for the new case: it is the one environment where all settings are required, so "fully configured valid startup" is the production start. Rejected: `NODE_ENV=test` with all settings (it would also pass if the server ignored the settings).
- Random keys for the secret file: the file's content is test input, not an expected value; the test does not read it back.

## Reaches beyond the handoff

- `src/server/main.ts` (whole) and `src/server/configuration.ts:150-230`: to see where the default address comes from and what `NODE_ENV` changes, and for the break. Reason: the slice's break had to name the line.
- `.the-way/task-cycle/change/slice.md` (read as the `SKILL.md` names it).
- `plan.md` and `task.md` grep for "D-49 / default address" in `.runs/task-cycles/luki-w-testach-z-przegladu/` — to see whether the plan settled the D-49 wording; it names D-49 only in the *Read* of this slice and another.

## Working copies

None made. The files `.runs/executor-14/{green1,red,green2,foundation,ruff}.txt` hold the outputs of the checks; the directory is ignored by git and stays.

## Unread material

None. (`guidelines/testing.md` read whole in two pages; `tests/startup.test.mjs` read at the ranges the handoff gives, lines 42-108 and 459-498; the loop2_invariant_support.py read at lines 1-300 as the handoff gives.)

## Searches not found or unclear

- Whether the plan or the spec settles the wording of D-49 against a second case: not found (see the concern). Everything else: none.
