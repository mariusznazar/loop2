# Blocking findings — review of slice 1 and the foundation entries, in the reviewer's words

From `reports/slice-1-review-report.md`, head `49bfb74e7ea8b81016fe9c58b40801b1d9e1d2f0`.

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

## The reviewer's judgement that F3 cites

The recommendation, to leave the three matters out and name them in the request, does not stand, for two reasons. `return_step.md` says the return step writes "a choice that binds after the merge" and "No entry is deferred: one this request does not write is neither proposed nor listed for later." And the recommendation's premise, that the slices' tests hold the behaviour, is false for `rate` (F2).

| Matter | Judgement |
|---|---|
| Decision 1: one step, `VACUUM INTO`, default `rate`, `rate: -1` | Write now: its code is in this range and cites a decision that lacks it (F3) |
| Decision 6: strict host-key check against its own file, `accept-new` and the rest rejected | Write with Slice 3 or at the return step. It is a choice at a trust boundary, and `*Rejected*` exists to stop `accept-new` being proposed again |
| Decision 9: rejected ways of the release check | Write with Slice 2 or at the return step. D-215 stands whole as approved, so this needs an entry of its own |
