# Slice 11 report — A failed password measurement says which docker step failed and why

**Status:** done with concerns (two questions for the orchestrator, below).

**Worktree:** `the root of the repository`, branch `task/porzadki-z-uwag-pr`.
**Base:** `098a708`. **Commit:** `2e884d1` (one commit, explicit paths).

## Files changed

| File | Added | Removed |
|---|---|---|
| `scripts/measure-passwords.mjs` | 51 | 8 |
| `tests/password-measurement.test.mjs` | 42 | 0 |
| `.claude/skills/loop2-deploy/references/setup_and_secrets.md` | 9 | 0 |
| `.agents/skills/loop2-deploy/references/setup_and_secrets.md` | 9 | 0 |

The two skill copies were made byte-identical with `cp` from the `.claude` copy; `cmp` reports them the same.

## What changed

- **Launcher (`scripts/measure-passwords.mjs`).** A failed docker step now appears in the report's problem text with its exit status: `the image cannot be inspected: docker image inspect exited with status 1`; `the measurement container did not start: docker run exited with status N`; `the measurement could not be waited for: docker wait exited with status N`. A step that gave no exit status (spawn failure, or a timeout on `wait`) reads `gave no exit status`. A `wait` that times out keeps the old text `the measurement did not finish within 300 s`.
- Docker's own error text for a failed step is collected in a new `stderr` field of the report. `reportForFile(report)` removes that field, and the command line uses it for the JSON written to standard output. The command line prints the `stderr` lines to standard error before the JSON, so the last line on standard output is still `PASS` or `FAIL: …`.
- **Test (`tests/password-measurement.test.mjs`).** `fakeDocker` takes a `failing` option (status and stderr per docker subcommand). A new case runs three failures (`image inspect` status 1, `run` status 125, `wait` status 1) through `measure`. It asserts the step and status appear in the problems, that the text is in `report.stderr`, and that the text is absent from `JSON.stringify(reportForFile(report))`.
- **Skill (both copies, `references/setup_and_secrets.md`).** A new sub-bullet under "1, last line `FAIL: ...`" explains the step names, that docker's text is in the terminal and not in the file, the three usual causes (SSH login refused, no permission on the Docker socket, daemon does not hold the image), that a human fixes the cause (D-12), and that the terminal text is not copied into a request (D-13). The causes are described in general terms; the exact docker wording is not quoted.

## Test-first sequence

1. Added the new test case, the `failing` option of `fakeDocker`, and the import of `reportForFile`. Added `reportForFile` as a stub that returns its argument, so the test reaches its assertion instead of stopping on a missing export.
2. Ran `npm test -- tests/password-measurement.test.mjs` on the base code: **exit 1**. The failure is the expected assertion: `image inspect: the image cannot be inspected` (the problem text does not name the step).
3. Implemented the launcher change.
4. Ran the same command: **exit 0**, 12 pass, 0 fail.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| New case, on the base | `npm test -- tests/password-measurement.test.mjs` (stub and test, launcher unchanged) | 1 | failed on the expected assertion |
| Password measurement, after the change | `npm test -- tests/password-measurement.test.mjs` | 0 | 12 pass, 0 fail |
| Skill copies, the slice's check | `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` | 0 | 5 tests OK |
| Skill copies, direct run | `python -B tests/agent_workflow/test_loop2_deploy_skill.py` | 0 | 5 tests OK |
| Format of the two code files (after one line wrap of the test) | `npx prettier --check scripts/measure-passwords.mjs tests/password-measurement.test.mjs` | 0 | all use Prettier style (the first run gave 1, on one line of the test, now fixed) |
| Lint of the two code files | `npx eslint scripts/measure-passwords.mjs tests/password-measurement.test.mjs` | 0 | no findings |

**Not run:** the full gate `npm test` without arguments (not run, per the handoff); `python -B .the-way/elements/common/foundation_check.py` (not in this slice's checks, so it is unchecked here); the ui check (no screen changed).

## Own-work check

- **Requirement most likely not met:** docker's own text must never reach the report file, while the step and its exit status must reach it. A leak would be a message in `problems` or a field of the printed report.
- **Check written and run:** the new test case, for three steps, asserts both halves on `reportForFile(report)` and on `report.stderr`. Run: exit 0 after the change.
- **End-to-end check on the command line:** `node scripts/measure-passwords.mjs --image no-such-image --commit 0123456789abcdef0123456789abcdef01234567 --memory 512m > cli-out.txt 2> cli-err.txt` (in the scratchpad). **Exit 1.** Last stdout line: `FAIL: the image cannot be inspected: docker image inspect exited with status 1`. Standard error holds one line, `docker image inspect: failed to connect to the docker API …` (this machine's Docker Desktop daemon is not running). `grep -c spawnSync` on the stdout file: 0.
- **Invariant test:** none of the slice's tests is an invariant test, so no mutation or changed invariant test. No mutation run.

## Reaches beyond the handoff

- `src/server/measure-passwords.ts`, grep for `LastResort|uncaught|unhandled|process.on`: no match (see the finding below).
- `scripts/restore-trial.mjs:356` and `:359` also write `the image cannot be inspected` through `notRun`. Not changed: another script, outside this slice.
- Read whole before the edit: `scripts/measure-passwords.mjs`, `tests/password-measurement.test.mjs`, `guidelines/coding.md`, `guidelines/testing.md` (in parts, as the tool returned them), `tests/agent_workflow/test_loop2_deploy_skill.py`, the decisions D-12, D-13, D-113, D-253, D-352–D-354 and the invariant `player-argon2-deployment-check` as the handoff lists them.
- **Process gap:** the skill reference `setup_and_secrets.md` was read at lines 340–430 and searched by grep for the wording I changed, not read whole before the edit, as the handoff's "Read every file you change whole" requires. Its other sections do not name the measurement's messages (grep for `cannot be inspected`, `did not start`, `did not finish`, `terminal`, `standard error` found no other conflict in the skill).

## Choices

1. **Docker's text goes to a `stderr` field and then to standard error.** Rejected: putting the text into `problems`, which is written to the file. Cost if wrong: a server name over `DOCKER_HOST=ssh://` lands in a file copied into a request (D-13). Rejected also: printing from inside `measure`. Cost: `measure` would do I/O, and the test could not check the separation through `measure` alone.
2. **Only the three steps the slice names are named (`image inspect`, `run`, `wait`).** Rejected: naming every docker call. Cost if wrong: see question 2 below.
3. **Timeout of `wait` keeps its old text; any other failed `wait` gets the new one.** Rejected: one text for both. Cost if wrong: a daemon error reads as a timeout. (`spawnSync` gives status `null` on a timeout.)
4. **The old phrase `the image cannot be inspected` is kept as the prefix of the new problem text.** Cost if wrong: none found; `restore-trial.mjs` keeps its own text.

## Adaptations of the plan to the code

- The plan's line references to the launcher do not match the base exactly: the docker helper is at lines 80–91 (the plan says `:89`–`:99`), the measure function at 190 and following, the run and wait calls at 236–250, and the FAIL print at 285 as the plan says. The references point to the same code, so I adapted to the code without changing any value.
- The skill's list of failures at `setup_and_secrets.md:405`–`:416` matches the base (the `FAIL` bullet and the `2` bullet).

## Questions for the orchestrator

1. **D-253 names `measure-passwords` as having a last-resort handler of its own. The code has none.** `scripts/measure-passwords.mjs` and `src/server/measure-passwords.ts` contain no `installLastResort`, `uncaughtException` or `process.on`. My recommendation: leave this slice as it is (the slice does not touch that), and let the cycle decide whether D-253 is corrected or the entrypoint gets a handler. Cost if left: D-253's claim and the code disagree; a later agent may trust the claim. Cost if a handler is added: one more change in a later slice.
2. **Should the container-level docker calls (`docker inspect` of the measurement container, `docker logs`, `docker kill`, `docker rm`) also name their step and status?** My recommendation: no, not in this slice; the task names three steps. Cost if left: a failure of the container's inspection still reads `the measurement container could not be inspected`, with no docker text on the terminal.

## Not verified

- The exact docker wording for SSH login refused, socket permission and missing image: no SSH host or running daemon is reachable from this machine, so the skill text describes the causes only.
