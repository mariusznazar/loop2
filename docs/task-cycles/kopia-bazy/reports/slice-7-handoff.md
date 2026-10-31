# Handoff — executor of slice 7, task kopia-bazy

**Delegation.** The owner of this repository started this cycle and delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator in your report; never to the human. Each go-ahead is provisional.

**Worktree.** `C:/Storage/repos/loop2-wt/kopia-bazy`, branch `task/kopia-bazy`, this slice's base `db739297d05da0733f8aebcad3b1abbcc1edd899`. Work from its root; the pinned the-way is its `.the-way`. No other agent writes in it now.

**Method and variant.** Read `.the-way/task-cycle/change/SKILL.md` whole. You make: a slice, or the retry of a slice. Read a file it names when its step comes.

**Stage and boundary.** Slice 7 of `docs/task-cycles/kopia-bazy/plan.md`, nothing beyond it. Do not touch the server: no `mikrus` tool, no ssh. Do not push. The gate is the orchestrator's: run your slice's focused checks and no full `npm test`.

**Answers of step 4.**
- Trust boundary: yes — `src/server/**`, `deploy/**`, the new keys, Strych's listing included. Crafted input at that boundary is checked.
- Irreversible operation: yes — replacing older backups on Strych, restoring over the server's database, changing the encryption key. The change only prepares them; a human performs them.

**Bound by this cycle.**
- The word for this thing in new code, tests and text is "backup"; `copy` is a game term of the glossary (`foundations/glossary.md:175`).
- Repository files, logs and requests hold no server name, login, port or address.
- Commit messages in English in the repository's form, `git add` by path, never `-A`.
- A check you report carries its command and exit code. Docker's engine answers on this computer (29.7.2), and `.runs/quality-venv` holds the pinned tools.
- Run Ruff, ESLint, Prettier and ShellCheck on what you change by the gate's own commands, from `tests/quality/test_quality_invariants.py`: Ruff with `--config ruff.toml --ignore-noqa --no-fix --no-cache`. A `# noqa` silences nothing.
- Where the plan's *Checks* start from a failing test, write that test before the code and name its failing run. An invariant's test is seen failing once.
- A test that waits has a time limit, and it stops its processes after a failure too (D-84): a failure must end the run, never hang it. Check the expected behaviour by what the test asserts, and break the code once to see the test catch it, restoring the code before you commit.
- A part-map change follows `.the-way/elements/part-map/skill/SKILL.md`, read from the worktree; name in your report that you applied it yourself.
- `AccountDatabase.backupTo(path)` makes one backup and returns the steps it took; D-222 holds why one step.
- The guideline is Polish; keep it so. It stays Polish in tone and in its form of rules.
- No new invariant marks the command's refusal: the `src/server/` row names its test case and its decision, as the boundary already has its marked refusal tests (the orchestrator's answer; the review of the whole change may raise it).
- The new test files: `tests/account-backup.test.mjs`, `tests/account-database-check.test.mjs`, `tests/account-database-check-standin.mjs`, `tests/deploy/test_account_backup_stream.py`, `tests/deploy/test_loop2_backup.py`, `tests/deploy/backup_script_support.py`, `tests/deploy/test_restore_trial.py`, `tests/invariants/test_account_save_sqlite_upgrade.py`, `tests/invariants/test_account_save_backup_encrypted.py`, `tests/invariants/test_account_save_backup_failure_notice.py`. Name their cases as they stand in the files.
- The cycle never asks the human about the guideline here: the changed meaning goes to the human through the request, so give it in one Polish sentence in your report.
- D-221 holds the departure; D-73 already lists it.

**Report.** `docs/task-cycles/kopia-bazy/reports/slice-7-report.md`, as your method gives, with **Searches not found or unclear**. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.

## Your section of the plan, word for word

### Slice 7 — The testing guideline

- **Goal:** `guidelines/testing.md`, changed through `the-way-maintain-testing-guidelines` and in its
  own language, knows the code that talks to Strych and `pusher`. The row at line 56 gains the
  answer of spec decision 15: no test reaches them, the script's reactions are shown with stand-ins
  that prove reactions and not delivery, and a human checks the real contact when the way of talking
  to them changes. The count of departures at line 10 takes the decision of row E8, and the rule's
  *Decision* field names it. The trust-boundary rows of `src/server/` and `deploy/` name the
  command's refusals and the script's refusal to send with the test cases that show them. The
  recipes' files and *Where in code* name the new test files. Its meaning goes to the human through
  the request (WAY-172), and the executor's report gives the changed meaning in one sentence for that.
- **Change:** `guidelines/testing.md`
- **Read:** `docs/task-cycles/kopia-bazy/task-frozen.md:37-37` To do 9 ·
  `docs/task-cycles/kopia-bazy/spec.md:281-299` 15. Tests ·
  `docs/task-cycles/kopia-bazy/spec.md:304-357` Foundation entries ·
  `foundations/decisions.md:1386-1397` D-73 · `foundations/decisions.md:1466-1477` D-79 ·
  `foundations/decisions.md:1531-1542` D-84 · `foundations/decisions.md:2937-2950` D-163 ·
  Foundation entries rows E8, E11, E13, E14, E15 · `guidelines/coding.md` ·
  `.the-way/product-guidelines/testing/SKILL.md` · `.the-way/product-guidelines/testing/template.md`
  · the test files Slices 1, 2, 3 and 5 made, by name: tests/account-backup.test.mjs,
  tests/account-database-check.test.mjs, tests/deploy/test_account_backup_stream.py,
  tests/deploy/test_loop2_backup.py, tests/invariants/test_account_save_sqlite_upgrade.py,
  tests/invariants/test_account_save_backup_encrypted.py,
  tests/invariants/test_account_save_backup_failure_notice.py and tests/deploy/test_restore_trial.py,
  for the names of their cases
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`, every identifier and invariant
  the guideline names resolving
- **Depends on:** Slice 1 · Slice 2 · Slice 3 · Slice 5 · Foundation entries E8, E11, E13, E14, E15

## Current ranges

These hold where they differ from the plan's. The plan's foundation entries are written and committed on this branch.

- D-73: `foundations/decisions.md:1386-1398`
- D-79: `foundations/decisions.md:1466-1478`
- D-84: `foundations/decisions.md:1531-1543`
- D-163: `foundations/decisions.md:2937-2951`
- E8 is D-221: `foundations/decisions.md:4127-4148`
- E11 is D-73: `foundations/decisions.md:1386-1398`
- E13 is account-save-sqlite-upgrade: `foundations/invariants.md:1048-1057`
- E14 is account-save-backup-encrypted: `foundations/invariants.md:1058-1067`
- E15 is account-save-backup-failure-notice: `foundations/invariants.md:1068-1077`

## Rows of the plan's *Foundation entries* your *Read* names

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| E8 — how the code that talks to Strych and `pusher` is tested | decision, new | spec *Foundation entries* and decision 15 | Slices 3, 7 |
| E11 — D-73 | decision, changed: its list of departures gains E8 | spec *Foundation entries* | Slice 7 |
| E13 — `account-save-sqlite-upgrade` | invariant, new, projected whole; check: `tests/invariants/test_account_save_sqlite_upgrade.py` and `tests/account-database-check.test.mjs` | task *Decisions in play*; spec *Foundation entries* | Slice 2 |
| E14 — `account-save-backup-encrypted`, the identifier proposed | invariant, new; check: `tests/invariants/test_account_save_backup_encrypted.py` | Settlements row 5; spec *Foundation entries* | Slice 3 |
| E15 — `account-save-backup-failure-notice`, the identifier proposed | invariant, new; check: `tests/invariants/test_account_save_backup_failure_notice.py`; names no step that does not exist, as spec decision 7 reads the row | Settlements row 10; spec decision 7 and *Foundation entries* | Slice 3 |

## The passages your *Read* names, word for word

#### `task-frozen.md:37-37` To do 9

9. Tabela „Czy kod rozmawia z cudzą usługą?” w `guidelines/testing.md:56` zna dziś rejestr npm i SMTP Outsidera; dostaje zasadę dla kodu rozmawiającego ze Strychem i z usługą `pusher`, przez skill `the-way-maintain-testing-guidelines`, a jej znaczenie zatwierdza człowiek (WAY-172).

#### `spec.md:281-299` 15. Tests

### 15. Tests (To do 9 and the two questions of step 4)

- **The command**, integration on real SQLite files, with a separate writer process running: the copy finishes, opens and holds what was committed before it started, also a row only in the write-ahead log. Without the fixed word, and with any other argument, it refuses with empty standard output and without opening the database. Every refusal changes nothing. A missing file creates nothing. Nothing is left in the temporary directory.
- **The check**, on the real Node.js: passes. On a temporary directory that cannot be written: fails non-zero. A test of `Dockerfile` as it stands: the step stands in the final stage, after `dist`.
- **The script**, through the same kind of seam as `tests/deploy/deploy_script_support.py`, with stand-ins for `docker`, `age`, `rsync`, `flock`, `pusher` and `date`:
  - order of steps, and `docker exec` called with the command's fixed word and without `-t`;
  - each failing step, a stopped container among them, gives exactly one `pusher` call with the fixed text;
  - a marker fed as the database reaches neither `pusher`, nor the log, nor `rsync`;
  - a sentinel login printed on the `rsync` stand-in's standard error, with a failing exit, is absent from the log and from the notice, while the log holds the stage, that exit code and the ciphertext's size;
  - a failing or absent key or `age` means `rsync` never runs;
  - `rsync` gets no deleting option and one of exactly seven names over a week;
  - no remote listing is requested;
  - the host-key options stand.
- **The comparison**, the three pairs, warning only.
- **The launcher**, its refusals without Docker; its run where a daemon answers, otherwise skipped and reported unchecked.
- **A container smoke test**, in the shape of `tests/deploy/test_account_storage.py`: the bytes of `docker exec` open as the database. Docker's engine answers on this computer, so it runs in the gate here; on a machine where no daemon answers it skips and reports itself unchecked.
- **The testing guideline.** A new row answer for Strych and `pusher`: no test reaches them; the script's reactions are shown with stand-ins, which prove reactions and not delivery; the real contact is checked by a human when the way of talking to them changes. Its meaning needs the human's approval (WAY-172). Every new test of an invariant cites it and has been seen failing once.
- **The irreversible operations** are prepared only: no test, script or skill instruction of an agent performs them.

#### `spec.md:304-357` Foundation entries

## Foundation entries

The foundation step or the return step writes these, as `.the-way/task-cycle/skill/foundation_step.md` gives. Of a row of *Settlements to record*, the meaning is the row's and the wording the writer's. A projected entry stands whole as approved.

**Decisions, new:**

- "Which failure does the database backup survive?" — the projected entry. A completed, consistent copy stands outside the host; Strych is the place when it passes. Scope: account-server, deployment, agent-workflow.
- "How does the account and save server access SQLite?" — the projected entry. `node:sqlite` only, and a release deploys only after the check; realized by the image-build check. Scope: account-server, build-tools, deployment.
- How often a copy is made and how many stay — settlement 1 with the weekday files, and no deletion command or remote listing.
- Where the copy runs — settlement 2 with the stream through `docker exec`, the shared lock, the hour and the comparison of the three pairs. It names D-10's *Rejected* as the reasoning reversed for this case and leaves D-10 unchanged.
- How the copy is encrypted — settlement 4, `age` with an identity file, no compression.
- How the owner learns of a failed copy — settlements 8 and 9, the gap and its review before the public launch of accounts, and the log, which holds no access value.
- What a checked restore means — settlement 12.
- How the code that talks to Strych and `pusher` is tested — the departure from the testing template, like D-163.

**Decisions, changed:**

- D-13 — adds the encryption key's path, owner, mode and private copy, adds `/backup_key` with its private copy, and says no container receives either. Rotation for the encryption key, with no consumer to recreate. Settlements 6 and 7.
- D-112 — the backup command opens a short connection beside the server's under the same rules. Settlement 3.
- D-73 — its list of departures gains the new testing decision.

**Unchanged, checked:** D-10, D-15, D-16, D-17, `loop2-host-sharing`.

**Invariants, new:**

- `account-save-backup` — the projected sentence. Method `review`, since it speaks of the state of a running server and no cheap test can see it; H2 and H3 are its evidence, so no test carries an expected-failure marking. Rests on the new SQLite fact. Part account-server · deployment.
  - It is recorded with *Violated: yes*, because its sentence is false from its recording until the human's H2 and H3.
  - The mark is cleared only after those checks, by a later commit on this branch that changes that one field, as commit e95a8b1 did in the previous cycle. That commit changes no code, so the code H5 deployed and H3 tried is the code that merges. A left-out H2.8 does not hold the mark back: it stays reported as unchecked.
  - The request names the mark, set and cleared, under *What the foundation puts in front of the human at the merge* (`.the-way/task-cycle/record_template.md:169`–`171`), where the human accepts it at the merge.
- `account-save-sqlite-upgrade` — the projected sentence. Method `test`: every deployed image passes through the checked build step. Rests on `node-sqlite-database`. Part account-server · deployment.
- An invariant for settlement 5 — a copy does not leave the server unencrypted. Method `test`. Rests on the `age` fact. Part deployment.
- An invariant for settlement 10 — every failed step ends in `pusher`. Its words name no step that does not exist: they cover the send, which also replaces the oldest copy, so a failed replacement is a failed send. Method `test`. Rests on the `pusher` fact. Part deployment.

**Invariants, changed:** `account-save-sqlite-access` — *Derives from* moves from the definition's passage to the new SQLite decision.

**Environment facts:**

- `node-sqlite-database`, changed — adds `backup()`, its `rate` and its restart under other connections.
- New: SQLite's Online Backup API — a snapshot, restarted by other connections, and N pages per step.
- New: settlement 11's `pusher` fact.
- New: `age` — an identity file used with `-e`, whole-input exit, no unauthenticated output.
- Strych's own facts stay in the decision's *Based on*, since the human rejected a separate fact for them (K11).

**Part map**, through `the-way-update-part-map`:

- `account-server` — responsibility gains the backup command and the check; the new test file is claimed.
- `deployment` — responsibility gains the backup script and schedule; new invariant test files are claimed.
- `build-tools` — keeps `scripts/**`.
- *External context* gains Mikrus Strych and the `pusher` service, both directions, untrusted.

**Guidelines:** `guidelines/testing.md` through `the-way-maintain-testing-guidelines` — the row at line 56, the count of departures at line 10, and the trust-boundary rows of `src/server/` (the command's refusals) and `deploy/` (the script's refusal to send). `guidelines/coding-database-access.md` stays true as it stands.

**Glossary:** none.
