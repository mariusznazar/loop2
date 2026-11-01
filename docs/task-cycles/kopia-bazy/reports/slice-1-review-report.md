FAIL 49bfb74e7ea8b81016fe9c58b40801b1d9e1d2f0

# Review report — slice 1 and the plan's foundation entries, task kopia-bazy

Range: base `95de83b98a5083c516b8fffad3237eaa64cad8d5`, head `49bfb74e7ea8b81016fe9c58b40801b1d9e1d2f0`. `git rev-parse HEAD` in the worktree gave that head. Counts: 4 blocking (all Important), 9 Minor, 3 out of scope (the lines of *Declined to judge*). No Critical finding.

The command itself did what the slice asks in every run I made of it, apart from the signal case of Minor 1. The blocking findings are the gate, what its tests protect, and one citation of the foundation. The foundation entries match their sources apart from the findings below.

## Important (blocking)

### F1. The new Python test fails the repository's Ruff gate

- **Place:** `tests/deploy/test_account_backup_stream.py:29`
- **What is wrong:** the line imports `compose`, which the file never uses, and silences it with `# noqa: F401`. The gate runs Ruff with `--ignore-noqa`, so the comment silences nothing. `guidelines/coding.md:51-56` says so, and its bad example at lines 90-94 is this same pattern.
- **Why it matters:** `tests/quality/test_quality_invariants.py:54` (`ruff-source-rules`) fails, so the full `npm test` that must pass before the request fails on this head.
- **Evidence:** `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache tests/deploy/test_account_backup_stream.py` gives exit 1, `F401`, line 29. The author's report shows exit 0 because its command had neither `--config ruff.toml` nor `--ignore-noqa`.
- **Fix:** remove the line. `tests/deploy/test_account_storage.py:35-36` already imports what it needs for itself, and the comment's "path setup" reason holds nothing in the file.

### F2. No test holds the one-step backup, and the rejected way passes every test

- **Place:** `tests/account-backup.test.mjs:205-259`; `src/server/database.ts:143`, `:608`
- **What is wrong:** spec decision 1 says "The one step is the point of this decision." The plan's goal asks for a backup "whole in one step". The spec's *Left to the maker* and the executor's handoff both say the test guards this by what it asserts of the one step, not by the default's failure to finish. Nothing in the test file asserts anything about steps. The author's report reads that passage as "no test asserts its failure" and stops there.
- **Why it matters:** the task's most deliberate choice can be undone by one edit and the gate stays green. On a server whose disk is slow enough, the backup then restarts under writes; the spec measured a default-`rate` run unfinished after 20 s.
- **Evidence:** in a scratch export of the head, `{ rate: backupRate }` was changed to `{ rate: 100 }`, the spec's rejected default. `npm test -- tests/account-backup.test.mjs` then gave exit 0, 6 of 6, three runs of three.
- **Fix, one way that works:** Node.js calls `progress` once per unfinished step, which the step count shows directly. On a 3005-page database, `rate: 2**31 - 1` gave 0 calls and `rate: 100` gave 30 (`scratchpad/steps.mjs`, node 24.17.0). The method could report that count for a test to assert. This is a test of behaviour and does not depend on the disk.

### F3. The code cites D-217 for a rule D-217 does not hold, and no entry holds it

- **Place:** `src/server/database.ts:138-142`; `foundations/decisions.md:3978-4024`
- **What is wrong:** the comment says the backup is one step "(D-217)". D-217 says nothing of steps, `rate` or how the backup is made. This is a restatement broader than the entry (WAY-263). A search of `foundations/` for `one step`, `VACUUM` and `rate` finds only D-112's migration steps (`:1987`) and an unrelated game "progress rate" (`:1481`).
- **Why it matters:** once `.runs` is gone, an agent reading the citation finds no such rule, and the fact `sqlite-online-backup` gives the risk with no decision about it. Together with F2, nothing outside a code comment holds the choice or its rejected ways.
- **Evidence:** the search above; D-217's text at `foundations/decisions.md:3978-4024`.
- **Fix:** record the choice, with `VACUUM INTO`, the default `rate` and `rate: -1` as rejected ways, and cite that entry. See the judgement of concern 1 below.

### F4. When the backup fails to finish, the test file never ends

- **Place:** `tests/account-backup.test.mjs:218-223`; also `:178-180`, `:219`
- **What is wrong:** `writer.stop()` runs only after `runBackup` resolves. When `runBackup` rejects at its deadline, or an assertion before `stop` throws, nothing stops the writer: `sandbox`'s `t.after` knows only the database handles. The live child and its pipes keep the test process open. `await writer.first` also has no time limit. D-84 requires a time limit with error handling, and cleanup of processes even after failure.
- **Why it matters:** the failure this test exists to catch, a backup that does not finish, hangs the gate instead of failing it.
- **Evidence:** with `{ rate: 1 }` in the scratch export, the test failed at 60 306 ms. The writer process and the run were still alive at 01:48:52, more than 3.5 minutes after that, and the run never ended by itself: I ended the writer by hand (see *Checks*).
- **Fix:** register the writer's stop with the test's cleanup, kill it there, and bound the wait for the first commit.

## Minor

1. **A signal leaves a plain copy of the database behind.** `src/server/account-backup.ts:56-88`. SIGTERM during streaming, in a 512 MiB container on node 24.22.1, left `/tmp/loop2-backup-*/backup.sqlite` at 33 058 816 bytes, and it stayed. The plan says "after every end". I graded it Minor on my own evidence, not on the author's reason: the directory is 0700 and owned by the same user who can read the live database, and a client that dies does not reach the command (see check 8). Handlers would also not cover SIGKILL, out-of-memory or a stopped container; the last I reason from Docker's behaviour and did not run. If the orchestrator reads "every end" literally this rises to Important. A sweep of stale `loop2-backup-*` directories at the start of a run would cover more of these paths than handlers. The author's reason, that handlers cannot be tested on this computer, is not true: the check above ran in a container from this computer.
2. **D-217's memory figure is not the command's.** `foundations/decisions.md:4008-4009` says the command "peaks at 58 MiB". The spec's figure is for the backup step of a separate measurement. The real command, streaming a 33 MB database to a slow reader, peaked at 74 984 KiB, about 73 MiB (VmHWM, 512 MiB container, node 24.22.1). That is still inside the room of about 100 MiB, so the design holds, but the entry should carry the measured number.
3. **D-217 does not say who may run the command.** Spec decision 2 says only a human or the installed script runs it, and only the skill forbids it to agents (Slice 6). D-12 lets an agent read the server, and D-137 holds this limit in the decision for the block command. One clause in D-217 would close this. Concern 1 of the foundation report does not list it. Check it again in the whole-change review.
4. **Concern 1, the host key and the release check's rejected ways.** See the judgement below. They belong to Slices 3 and 2, so they do not block here, but they must be written at the return step at the latest.
5. **`Method: test` before the tests exist.** `foundations/invariants.md`, E13, E14, E15. The template says an invariant whose test is not written reads `review` (WAY-61). The plan mandates this ordering and it becomes true by Slice 3, so it is a defect of the range only. The whole-change review should confirm each has a citing test seen failing once.
6. **`mikrus-pusher-mail` holds two sources.** `foundations/environment_facts.md:364-368`. A wiki page and a script are not pages of one edition (WAY-80, WAY-76), and each changes alone. Settlement row 11 is one row, so splitting needs care that the row's meaning stays. No reader is misled today.
7. **The vanished-reader test does not pin its exit code.** `tests/account-backup.test.mjs:352` asserts non-zero, not 4, while the plan gives each exit its own code and the other tests pin theirs.
8. **A failed cleanup reports the wrong thing.** `src/server/account-backup.ts:85-93`. If `rm` throws after the bytes went out, or after an output failure, the outer catch prints "No backup was made" and exits 1, while a plain copy may remain. The non-zero exit is the safe side; the text is wrong. Found by reading, not run.
9. **The part-map line was written by hand.** `foundations/part_map.md:70`. The plan and `AGENTS.md` route this through `the-way-update-part-map`. The line itself is correct, it claims the right file for the right part, and `foundation_check.py` passes. Name it in the request; nothing needs redoing. D-216's capacity figures are a related note for the human: `:3960` uses 385 accounts, counting the eighth file during a send, while the *Rejected* ways at `:3966` keep the task's 220, 110 and 1000, which do not. The template keeps those costs as the source gave them, so they stay, but they are not comparable with the 385.

## Judgement of the foundation report's concern 1

The recommendation, to leave the three matters out and name them in the request, does not stand, for two reasons. `return_step.md` says the return step writes "a choice that binds after the merge" and "No entry is deferred: one this request does not write is neither proposed nor listed for later." And the recommendation's premise, that the slices' tests hold the behaviour, is false for `rate` (F2).

| Matter | Judgement |
|---|---|
| Decision 1: one step, `VACUUM INTO`, default `rate`, `rate: -1` | Write now: its code is in this range and cites a decision that lacks it (F3) |
| Decision 6: strict host-key check against its own file, `accept-new` and the rest rejected | Write with Slice 3 or at the return step. It is a choice at a trust boundary, and `*Rejected*` exists to stop `accept-new` being proposed again |
| Decision 9: rejected ways of the release check | Write with Slice 2 or at the return step. D-215 stands whole as approved, so this needs an entry of its own |

## The other points the handoff raised

- **3 ms pause and D-112's busy timeout:** no finding. A failed open is a clean exit 1 with empty standard output, and the server's writes are sparse. The test's `during > before` shows commits while the command ran, not inside the step; the fix of F2 covers what matters there.
- **No first failing test:** no finding as such. No test here cites an invariant. The author's four breaks were not repeated by me. The break that was missing is the one F2 describes.
- **Irreversible operations:** prepared only. No test, entry or instruction has an agent replace a backup, restore over the database or change the key. D-216, D-220 and D-13 give them to a human.
- **Crafted input:** nothing found at the arguments or environment. Nine argument shapes refuse before opening, a missing or `:memory:` or directory path gives exit 3, messages are fixed text, and `mkdtemp` makes a private directory.
- **Entries E1 to E22:** the binding sentences of D-214, D-215, `account-save-backup` and `account-save-sqlite-upgrade` match the definition. `copy` reading `backup` in D-214 changes no meaning. Every row of *Settlements to record* keeps its meaning, and the ways the rows' sources keep stand in *Rejected*. The changed invariant test count is zero: no invariant test changed in this range.

## Declined to judge

- A zero-byte file at `LOOP2_DATABASE_PATH` is initialized and backed up as an empty database. It is the same rule as the block command and D-112, and no path on a running server produces one, so I set it aside.
- Strych's host name in the constants block of `deploy/loop2-backup` against this cycle's rule on server names: spec decision 6 settles it and the file belongs to Slice 3.
- `pusher` exiting 0 on an HTTP error: Slice 3's matter, as the foundation report says.

## Checks

| # | Check | Result |
|---|---|---|
| 1 | gate's Ruff command on the new test (F1) | exit 1, **failed** |
| 2 | `python -B .the-way/elements/common/foundation_check.py`, worktree root | exit 0, `0 errors`; `.the-way` commit equals its gitlink |
| 3 | `npm test -- tests/account-backup.test.mjs`, scratch export of the head | exit 0, 6 of 6 |
| 4 | `npm test -- tests/account-storage.test.mjs`, scratch export | exit 0, 51 of 51 |
| 5 | `npm test -- tests/deploy/test_account_backup_stream.py`, scratch export, Docker 29.7.2 | exit 0, ran, not skipped; 1 test, file compared with the head first |
| 6 | The same test loaded as the gate's discovery loads it | 1 case, 0 import failures; loaded, not run this way |
| 7 | `npx eslint --max-warnings 0` and `npx prettier --check` on the three TS/MJS files, scratch export | exit 0 and exit 0 |
| 8 | Probe in a 512 MiB container, node 24.22.1, 33 MB synthetic database: real `docker exec` with the reader gone after 100 000 bytes | client exit 1; at +1, +5, +15 and +30 s no directory and no process left |
| 9 | Same probe: peak memory and SIGTERM | exit 0, 33 058 816 bytes out, peak 74 984 KiB; SIGTERM left the file (Minor 1) |
| 10 | Mutation `rate: 100` | exit 0, three of three: survives (F2) |
| 11 | Mutation `rate: 1` | test fails at 60 s, run never ends (F4) |
| 12 | Step count by `progress`, `scratchpad/steps.mjs` | exit 0; 0 calls against 30 |
| 13 | Node 24.17.0 and 24.22.1 loading `node:sqlite` | no warning on standard error on either |

**Not run:** the full `npm test`, which the method leaves to the cycle; the gate's Ruff over the whole repository (run on the one file only); the discovery run of check 6 end to end; the author's four mutations; a stopped container or SIGKILL during a run; anything on the server or on Strych; shellcheck, as this slice has no Bash.

**A discarded result, and what my checks left behind.**

- A hook blocked one compound command whole, so the restore inside it never ran. An ESLint error and one smoke run on that command's heels came from the `rate: 1` copy, not from the head. Both are discarded. Checks 5 and 7 are reruns, made after comparing the file with the head.
- The reviewed worktree was not changed: still clean, at the head.
- A folder of synthetic data stays at `C:\Users\Mariusz\AppData\Local\Temp\loop2-backup-test-0mPY6j`, left by the hung `rate: 1` run. The hook says deletion outside the project is a human's, so I did not delete it, and it holds no real data.
- The export, the sources and the logs stay in the scratchpad `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\8602360d-b02d-44a0-8dc2-b547067927f8\scratchpad`.
- The probe removed its container and image. A full `npm test`, process 11980, was running on this computer and was not mine; I left it alone, so its result should not be confused with anything here.

## Reaches beyond the dispatch

- `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/coding-database-access.md`: named by the slice; read whole.
- `tests/quality/test_quality_invariants.py`, for the gate's exact Ruff command.
- `.the-way/gate/run_tests.py` and `scripts/test.py`, to see how the gate finds the new file.
- `.the-way/task-cycle/skill/foundation_step.md` and `return_step.md`, to judge concern 1.
- `.the-way/elements/part-map/skill/SKILL.md`, for the hand-written line.
- `spec.md` decisions 5, 6 and 9, for concern 1 and the figures of D-216.
- `foundations/decisions.md`: D-17, D-83, D-84, D-114, D-137, D-163 and line 1481; `foundations/invariants.md`: the four entries of the slice and `loop2-host-sharing`.
- `deploy/loop2-deploy`, lock path and wait; `compose.yaml` and `Dockerfile`, for where `/tmp` lies and which user runs the command.
- Sources read raw on 2026-10-31: Node's `sqlite.md` at the cited commit, SQLite's two pages, Mikrus's two pusher pages and the Strych page, `age.1.ronn`, `rsync.1.md`. The passages I searched for were found. Not read: the Docker, NCSC, better-sqlite3 and Node stability citations, and the archived copies.

## Searches not found or unclear

- `one step`, `VACUUM`, `rate` and the host-key words in `foundations/`: not found as decisions, as F3 and the judgement above say. The search ran with the Grep tool, and it found other known lines, such as `:1987` and `:1481`.
- **SQLite's read-lock sentence** (`backup.html`, section 3): "preventing any other database user from writing". It names no WAL. No test here shows a commit landing inside the step, because the step takes a few milliseconds; the spec's measurement is the only evidence. I found no contradiction, but this stays measured, not tested.
- **The author's "experimental warning" on standard error:** I could not reproduce it on either Node.js release (check 13). `tests/invariants/account_container_support.py:129` still allows for it. Nothing rests on it.
- **Who owns process 11980:** unknown, and I did not look further.
