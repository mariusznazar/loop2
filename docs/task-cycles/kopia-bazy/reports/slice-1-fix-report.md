# Fix report — review of slice 1, task kopia-bazy

**Status:** done with concerns. F1 to F4 are fixed and none is contested. The concerns are the four under *Concerns for the orchestrator*; none blocks the slice.

**Commits** on `task/kopia-bazy`, from `49bfb74` to `4ced3b9`, not pushed:

| Commit | Message | Holds |
|---|---|---|
| `8dcc581` | docs: record how the consistent database backup is made, in one step through backup() | F3, the entry |
| `828628e` | test: hold the one-step backup by its step count, and stop the writer and bound its waits after a failure | F2, F4, F3's comment |
| `4ced3b9` | fix: remove the unused import the Ruff gate refuses from the backup stream test | F1 |

**Files changed** (added, removed): `foundations/decisions.md` +31 -0 · `src/server/database.ts` +14 -6 · `tests/account-backup.test.mjs` +60 -8 · `tests/deploy/test_account_backup_stream.py` +0 -1.

## The findings

### F1 — fixed

Removed the line that imported `compose`. The first import of the file is unchanged, so the path setup the comment claimed changes nothing.

| Check | Result |
|---|---|
| `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache tests/deploy/test_account_backup_stream.py` | exit 0 |
| The same command on `.`, as the gate runs it | exit 0 |
| `npm test -- tests/deploy/test_account_backup_stream.py` | exit 0, 1 test, ran against Docker 29.7.2, 98 s |
| Load only, `unittest.TestLoader().discover(os.path.abspath('tests/deploy'), pattern='test_*.py')` from the root, as the gate's discovery calls it | exit 0, 67 cases, 0 import errors, this test among them |

### F2 — fixed

`AccountDatabase.backupTo` now returns the steps the backup took, counted from `progress`: one, plus one for each step that left pages to go. The command ignores the number and stays silent on a good run.

The new test "a backup takes one step, where the default rate takes many on the same database" asserts `steps === 1`. Its precondition backs up the same database at the default rate, counted by `progress`, and requires more than one step. So the one step cannot come from a small file, and nothing rests on the disk.

| Check | Result |
|---|---|
| `npm test -- tests/account-backup.test.mjs`, on the fix | exit 0, 7 of 7 |
| Same, with `rate: 100` in `src/server/database.ts` | exit 1, three runs of three: `actual: 31, expected: 1`, in this test alone; the other 6 pass |

The writer test still passed under `rate: 100` on this disk, which is the finding's own point. The mutation was restored, and `git diff` and a search for the `rate:` line showed `rate: backupRate` before the commit.

### F3 — fixed

Recorded **D-222 — How is the consistent database backup made?**, `foundations/decisions.md:4149-4178`, through the steps of `the-way-record-decision`, read from `.the-way/elements/`. Scope `account-server`. D-217 is unchanged. The comment at `src/server/database.ts:141` now cites D-222.

**Meaning in Polish:** Polecenie kopii robi kopię bazy funkcją `backup()` modułu `node:sqlite`, całą w jednym kroku, bo `rate` przekracza każdą liczbę stron bazy, więc zapis z innego połączenia nie ma kiedy jej zrestartować.

The reason rests on what one step avoids. The 1.5 s and 20 s measurements stand only in the *Rejected* line of the default `rate`, with where each was made. `VACUUM INTO`, the default `rate` and `rate: -1` are its rejected ways, with their reasons from spec decision 1.

| Check | Result |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, `0 errors`, also after the last code change |
| `git -C .the-way rev-parse HEAD` | `a8dfe8a…`, equal to the gitlink |
| Search of `foundations/*.md` for `one step`, `VACUUM`, `rate`, `backupTo`, `D-217`, `D-215` and `sqlite-online-backup`, before writing | no entry answers this question; D-222 was free in the log and on `main` |

The entry was not shown to a human: the handoff bounds its content and the human accepts it at the merge. No fresh agent critiqued it, because this method forbids dispatching one.

### F4 — fixed

The sandbox's cleanup now kills every writer first, then closes the connections and removes the directory. Hooks run in registration order, so a hook of the writer's own would have run after the removal. `first` rejects after 30 s, or at once if the writer ends before its first commit. `stop()` kills the writer after 30 s; the finding did not name that wait, but it had no limit either.

Each run below was restored before the commit.

| Mutation, then `npm test -- tests/account-backup.test.mjs` | Result |
|---|---|
| `rate: 1` | exit 1, ended by itself in 65 s (02:00:45 to 02:01:50); the writer test failed at `backup command deadline`; 0 writer or command processes left (`Get-CimInstance Win32_Process`), and no new temporary directory |
| A writer that never commits | exit 1, ended in 33 s, `the writer made no commit in time` |
| A writer that ends at once | exit 1, ended in 3 s, `the writer ended before its first commit` |
| A writer that ignores `stop` | exit 1, ended in 33 s, fails at `the writer met no busy error`, `actual: null` |

## Other checks

| Check | Result |
|---|---|
| `npm test -- tests/account-backup.test.mjs`, final tree | exit 0, 7 of 7 |
| `npm test -- tests/account-storage.test.mjs` | exit 0, 51 of 51 |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 --suppressions-location <an empty file> .` | exit 0 |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore` with the gate's seven patterns | exit 0 |
| The same options on `tests/account-backup.test.mjs`, `src/server/database.ts`, `src/server/account-backup.ts` | exit 0 |

**Not run:** the full `npm test`, which is the orchestrator's. Shellcheck, as nothing here touches Bash. Nothing on the server or on Strych.

## Own-work check

- **Requirement most likely unmet:** that the count stays one beside a real writer, on the image's own Node.js release. The review measured 24.17.0 without a writer, and the new test runs without one, so that its precondition's default-`rate` backup cannot be restarted.
- **Check:** one-off script `C:\Users\Mariusz\AppData\Local\Temp\claude\C--Storage-repos-loop2\8602360d-b02d-44a0-8dc2-b547067927f8\scratchpad\one-step-beside-writer.mjs`, importing the built `dist/server/database.js`: 20 backups of a database of 1500 accounts of 6 KiB, beside a separate process committing with full synchronization.
- **Result:** on the host, `node <script> <dist>`, 24.17.0: exit 0, twenty counts of 1. In `docker run --rm --pull never --memory 512m … node:24-slim`, 24.22.1: exit 0, twenty counts of 1.
- **Limit:** this is a one-off, not a standing test. Also, a `rate` above the seeded database's pages but below a larger database's page count would pass the new test.

## Choices, with the way rejected and the cost if wrong

- **`steps` counts only calls with `remainingPages > 0`.** Rejected: counting every call. Node's documentation says `progress` is called "after each backup step", while the review measured 0 calls for one step. Filtering gives the same count under either reading. Cost if wrong: one condition no mutation here exercises.
- **The method reports and does not enforce.** Rejected: throwing when `steps > 1`. The handoff asks for a count for a test to assert. Cost if wrong: a release that splits the step stays unseen until the gate runs on it.
- **The new test has no writer.** Rejected: running it beside the writer, because the default-`rate` precondition could then fail to finish, which would rest on the disk. The one-off above covers the writer.
- **Origin of D-222 is `none`.** The reasoning stands in the entry, and the spec under `.runs/` goes when the task closes, so the template forbids pointing there. The task note holds only the carried question, not the reasoning.
- **`sqlite-wal-concurrency` stands in *Based on*.** Rejected: leaving it to D-112. The one-step choice keeps writers running only because of it, as the slice's handoff says.
- **D-222 derives from D-217 too**, since its binding sentence names that decision's command.

## Concerns for the orchestrator

1. **An invariant for one step.** The template's test asks "can you point to a commit on which the sentence is false?", and `rate: 100` is such a commit, so the one-step sentence could carry an invariant. The handoff binds one decision, so I wrote none: the new test cites no invariant, and D-222's *Verification* is the pair of examples. If you want one, it goes through `the-way-record-invariant`, and the test gains its `invariant:` line. I recommend leaving it: the test already fails on the rejected way, and the entry costs more than it adds.
2. **Two rejected ways of spec decision 1 are not in D-222.** Copying the three files, and a `sqlite3` tool. The handoff named three ways, and I kept to them. Their absence costs little: `.claude/skills/loop2-deploy/references/setup_and_secrets.md:291-292` already warns about copying the file.
3. **The gate's Prettier command does not cover `tests/account-backup.test.mjs`.** `PRETTIER_PATTERNS` in `tests/quality/test_quality_invariants.py:17-20` holds `tests/{http,startup}.test.mjs` and the `sim`, `view` and `quality` directories. I checked the file directly as well. It is not this fix's to change; the test file's format stays unchecked by the gate.
4. **`progress` has no fact behind it.** `node-sqlite-database` does not cite it, and the count rests on it. If a release stopped calling it, `steps` would read 1 at any `rate`; the new test's precondition would then fail, which is why it is there. I wrote no fact, as the handoff gives none. Whether the fact gains that passage is the return step's call.

## Reaches beyond the dispatch

- `foundations/decisions.md`: D-214, D-216, D-218, D-219, D-221 and the log's end, for the entry's form and neighbours, as the skill's step 1 gives.
- `.the-way/foundations/decisions.md`: WAY-03, the element's example.
- `foundations/invariants.md:1038-1056`, for what rests on `sqlite-online-backup`.
- `foundations/glossary.md`, for `backup`, `step` and `copy`.
- `tests/quality/test_quality_invariants.py`, as the handoff asks; `.the-way/gate/run_tests.py:30-48`, for the discovery call; `tests/deploy/test_account_storage.py:1-60`.
- `node_modules/@types/node/sqlite.d.ts:1031-1092`, for the signature and text of `progress`.
- `C:\Storage\The Brain\The Brain\.ai\rules\git.md` and `scripts.md`, by the user's instructions.

## Searches not found or unclear

- **Node's `progress` text against behaviour:** the types' text says "after each backup step", the measurement shows no call for the step that finishes. Handled as under *Choices*; I did not read Node's source.
- **A withdrawn list in the decision log:** none found, so D-222 is the next free number. `git grep D-222 main` found nothing.
- **Whether "names no … count" in the template covers measurements in *Rationale* and *Rejected*:** unclear. D-216 and D-217 hold such numbers, so I took it to mean counts of files and tests, and kept the two measurements.
- **Who left `loop2-backup-test-tWJUjM` and `-UjIoCG` in `C:\Users\Mariusz\AppData\Local\Temp`:** unknown. Both date from 01:27:39, before this work, each with `accounts.sqlite` and no `tmp` directory. That looks like a removal that failed partway; this is a guess, not verified. None of my 9 runs of the test file left a directory, the `rate: 1` run included. `-0mPY6j` is the reviewer's. I removed none of them: the review says deletion outside the project is a human's, and I did not try it.

## Problems observed

None in the code. `runBackup` rejects at its deadline without waiting for the killed child to close, so a removal could in principle meet a file still held on Windows. It did not happen in the one `rate: 1` run, and I changed nothing there.
