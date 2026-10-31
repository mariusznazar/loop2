# Handoff — executor of slice 1, task kopia-bazy

**Delegation.** The owner of this repository started this cycle and delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator in your report; never to the human. Each go-ahead is provisional.

**Worktree.** `C:/Storage/repos/loop2-wt/kopia-bazy`, branch `task/kopia-bazy`, this slice's base `b7dd37de082d71d966fa6280ec9cc36509881ee9`. Work from its root; the pinned the-way is its `.the-way`. No other agent writes in it now.

**Method and variant.** Read `.the-way/task-cycle/change/SKILL.md` whole. You make: a slice, or the retry of a slice. Read a file it names when its step comes.

**Stage and boundary.** Slice 1 of `docs/task-cycles/kopia-bazy/plan.md`, nothing beyond it. Do not touch the server: no `mikrus` tool, no ssh. Do not push. The gate is the orchestrator's: run your slice's focused checks and no full `npm test`.

**Answers of step 4.**
- Trust boundary: yes — `src/server/**`, `deploy/**`, the new keys, Strych's listing included. Crafted input at that boundary is checked.
- Irreversible operation: yes — replacing older backups on Strych, restoring over the server's database, changing the encryption key. The change only prepares them; a human performs them.

**Bound by this cycle.**
- The word for this thing in new code, tests and text is "backup"; `copy` is a game term of the glossary (`foundations/glossary.md:175`).
- Repository files, logs and requests hold no server name, login, port or address.
- Commit messages in English in the repository's form, `git add` by path, never `-A`.
- A check you report carries its command and exit code. Docker's engine answers on this computer (29.7.2), and `.runs/quality-venv` holds the pinned tools.
- SQLite's page says copying all in one call holds a read-lock that keeps writers out; the database runs in WAL mode, where readers and a writer run together (`sqlite-wal-concurrency`), and the design's measurement shows a separate writer committing through the step. Your test with a separate writer process is what holds this: if it fails, stop and report. Whether a default-`rate` backup finishes depends on the disk, so assert what the one step does, not the default's failure.

**Report.** `docs/task-cycles/kopia-bazy/reports/slice-1-report.md`, as your method gives, with **Searches not found or unclear**. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.

## Your section of the plan, word for word

### Slice 1 — The backup command

- **Goal:** `node dist/server/account-backup.js --to-standard-output`, run beside the server, writes
  one consistent backup of the existing database of `LOOP2_DATABASE_PATH` to standard output and
  nothing else there. Without that one word, or with anything else, it refuses with the usage exit
  code before it opens the database and prints nothing to standard output. A missing file creates
  nothing. `AccountDatabase` has one method that makes a backup at a given path, whole in one step,
  by a positive whole `rate` above any page count; no SQL and no `node:sqlite` import stand outside
  `src/server/database.ts`. The command backs up into a private temporary directory, closes the
  database, streams the finished file out without holding it in memory, and removes the directory
  after every end, a failure and a reader that goes away included. Exit 0 comes only after the last
  byte is out; every other exit has its own code, as in `src/server/account-block.ts`. Messages go
  to standard error and hold no database error, path of a player's data or address.
- **Change:** `src/server/database.ts` · `src/server/account-backup.ts` ·
  `tests/account-backup.test.mjs` · `tests/deploy/test_account_backup_stream.py` ·
  `foundations/part_map.md`
- **Read:** `docs/task-cycles/kopia-bazy/task-frozen.md:17-18` To do 1 ·
  `docs/task-cycles/kopia-bazy/task-frozen.md:198-198` Settlements to record, row 3 ·
  `docs/task-cycles/kopia-bazy/spec.md:33-46` Constraints ·
  `docs/task-cycles/kopia-bazy/spec.md:51-71` 1. How the consistent copy is made ·
  `docs/task-cycles/kopia-bazy/spec.md:72-87` 2. The operator command ·
  `docs/task-cycles/kopia-bazy/spec.md:88-96` 3. How the file leaves the container ·
  `docs/task-cycles/kopia-bazy/spec.md:268-280` 14. Units and their interfaces ·
  `docs/task-cycles/kopia-bazy/spec.md:281-299` 15. Tests ·
  `docs/task-cycles/kopia-bazy/spec.md:358-367` Left to the maker ·
  `foundations/decisions.md:3-15` D-01 · `foundations/decisions.md:352-375` D-17 ·
  `foundations/decisions.md:1386-1397` D-73 · `foundations/decisions.md:1492-1503` D-81 ·
  `foundations/decisions.md:1518-1529` D-83 · `foundations/decisions.md:1531-1542` D-84 ·
  `foundations/decisions.md:1985-1996` D-112 · `foundations/decisions.md:1998-2011` D-114 ·
  `foundations/decisions.md:2549-2562` D-137 · `foundations/decisions.md:3594-3613` D-205 ·
  `foundations/invariants.md:688-696` account-save-durable-storage ·
  `foundations/invariants.md:698-706` account-save-sqlite-access ·
  `foundations/invariants.md:758-766` account-schema-lifecycle ·
  `foundations/invariants.md:768-776` account-database-schema ·
  `foundations/environment_facts.md:33-37` mikrus-host-swap ·
  `foundations/environment_facts.md:250-254` node-sqlite-database ·
  `foundations/environment_facts.md:316-320` sqlite-wal-concurrency ·
  Foundation entries rows E1, E2, E4, E10, E17, E18, E22 ·
  `guidelines/coding.md` · `guidelines/coding-database-access.md` · `guidelines/testing.md` ·
  `src/server/account-block.ts` · `tests/account-storage.test.mjs:1751-1795` ·
  `tests/deploy/test_account_storage.py` · `tests/invariants/account_container_support.py` ·
  `.the-way/elements/part-map/skill/SKILL.md`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/**`: a new command that puts every address and password hash
  on standard output
- **Checks:** start from `npm test -- tests/account-backup.test.mjs`, failing: on real SQLite files,
  with a separate writer process running, the backup finishes, opens and holds what was committed
  before it started, a row only in the write-ahead log included; a backup larger than a pipe's
  buffer arrives whole; a reader that goes away gives a non-zero exit; the refusals print nothing
  and do not open the database; a missing file creates nothing; nothing stays in the temporary
  directory. Then `npm test -- tests/account-storage.test.mjs` ·
  `npm test -- tests/deploy/test_account_backup_stream.py`, the bytes of `docker exec` without a
  terminal opening as the database, skipped and reported unchecked where no daemon answers ·
  `python -B .the-way/elements/common/foundation_check.py`, `tests/account-backup.test.mjs` claimed
  by `account-server` through `the-way-update-part-map`
- **Depends on:** Foundation entries E1, E2, E4, E10, E17, E18, E22

## Current ranges

These hold where they differ from the plan's. The plan's foundation entries are written and committed on this branch.

- D-01: `foundations/decisions.md:3-16`
- D-17: `foundations/decisions.md:352-376`
- D-73: `foundations/decisions.md:1386-1398`
- D-81: `foundations/decisions.md:1492-1504`
- D-83: `foundations/decisions.md:1518-1530`
- D-84: `foundations/decisions.md:1531-1543`
- D-112: `foundations/decisions.md:1985-1997`
- D-114: `foundations/decisions.md:1998-2012`
- D-137: `foundations/decisions.md:2549-2563`
- D-205: `foundations/decisions.md:3594-3614`
- account-save-durable-storage: `foundations/invariants.md:688-697`
- account-save-sqlite-access: `foundations/invariants.md:698-707`
- account-schema-lifecycle: `foundations/invariants.md:758-767`
- account-database-schema: `foundations/invariants.md:768-777`
- mikrus-host-swap: `foundations/environment_facts.md:33-38`
- node-sqlite-database: `foundations/environment_facts.md:250-255`
- sqlite-wal-concurrency: `foundations/environment_facts.md:316-321`
- E1 is D-214: `foundations/decisions.md:3892-3917`
- E2 is D-215: `foundations/decisions.md:3918-3940`
- E4 is D-217: `foundations/decisions.md:3978-4024`
- E10 is D-112: `foundations/decisions.md:1985-1997`
- E17 is node-sqlite-database: `foundations/environment_facts.md:250-255`
- E18 is sqlite-online-backup: `foundations/environment_facts.md:358-363`
- E22: the part map, `foundations/part_map.md`; already written

## Rows of the plan's *Foundation entries* your *Read* names

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| E1 — "Which failure does the database backup survive?" | decision, new, projected whole | task *Decisions in play*; spec *Foundation entries* | Slices 1, 3, 5, 6 |
| E2 — "How does the account and save server access SQLite?" | decision, new, projected whole | task *Decisions in play*; spec *Foundation entries* | Slices 1, 2 |
| E4 — where the backup runs | decision, new | Settlements row 2; spec decisions 3, 8, 10; names D-10's *Rejected* as reversed for this case and leaves D-10 unchanged | Slices 1, 3, 4, 6 |
| E10 — D-112 | decision, changed | Settlements row 3; spec *Foundation entries* | Slice 1 |
| E17 — `node-sqlite-database` | environment fact, changed: `backup()`, its `rate`, its restart under other connections | spec *Foundation entries* | E2, E12, Slices 1, 2 |
| E18 — SQLite's Online Backup API | environment fact, new | spec *Foundation entries* | E12, Slice 1 |
| E22 — part map, responsibilities: `account-server` gains the backup command and the release check, `deployment` the backup script and its schedule, `build-tools` the launcher of the restore trial | part map, through `the-way-update-part-map` | spec *Foundation entries*; the `build-tools` sentence is the plan's reading (see *Choices*) | Slices 1, 2, 3, 5 |

## The passages your *Read* names, word for word

#### `task-frozen.md:17-18` To do 1

1. Raz na dobę, nocą, harmonogram (cron) na serwerze gry uruchamia krótkie polecenie w działającym kontenerze `loop2`, a to polecenie robi kopię bazy kont i zapisów (pytania 1 i 3).
   - Liczy się tylko kopia ukończona i spójna, czyli wykonana tak, że obejmuje też ostatnie zapisy trzymane obok pliku bazy (“copying the one file while the application runs does not copy the database”, `references/setup_and_secrets.md:291`–`292`).

#### `task-frozen.md:198-198` Settlements to record, row 3

| 3 | Polecenie kopii otwiera krótkie połączenie z bazą obok połączenia serwera, na tych samych zasadach co polecenie blokady konta; zmienia D-112, wpis o połączeniach z bazą. | decision | propozycja refinera, wynika z wiersza 2, przyjęta (pozycja 17-K14 pakietu rundy; Mariusz, 2026-10-30, „wiersze przyjmuję”); D-112 (“the operator's blocking command of D-137 opens one short-lived connection beside it under the same rules”) | Czy polecenie kopii otwiera bazę po swojemu i czy D-112 zostaje z samym poleceniem blokady. |

#### `spec.md:33-46` Constraints

## Constraints

- **Task.** Everything under *Questions to settle*, *Settlements to record* and *Decisions in play* is settled; this spec designs inside it.
- **D-12.** Every change on the server but an automated deployment is a human's. Agents read only.
- **D-13.** Credentials never stand in a repository file, argument, log or environment. The Strych login is an access value: no repository file holds it.
- **D-16, D-15.** Installed copies are a human's; a deployment only warns about a difference, because a refusal would stop rollbacks.
- **D-17, `loop2-host-sharing`.** The application alone mounts `loop2_accounts`. A deployment changes nothing it did not change before.
- **D-112, D-114.** A short connection beside the server's opens through `AccountDatabase`; SQL and connection ownership stay in `src/server/database.ts`.
- **`loop2-deploy-keeps-running`.** A failure before the new containers start leaves the running ones in service.
- **Memory.** The container's limit is 512 MiB, the password work stays under 409 MiB, and the host has no swap (`mikrus-host-swap`), so the command has about 100 MiB of room. Measured in a container limited to 512 MiB, on the image's own Node.js, its backup step peaks at 58 MiB (decision 1).
- **`shellcheck-source-rules`.** Each new Bash script joins the test's list, without silencing directives. `deploy/**` is already LF by `.gitattributes`.
- **D-73, D-84, D-163.** Failures are shown on real files; a stand-in proves only the reaction to it; no test reaches a foreign service.
- **Code as it stands.** `NODE_ENV=production` in the image forces `LOOP2_PROXY_MODE=cloudflare-tunnel`, and the session cookie is `__Host-` and `Secure`, so a browser on the owner's computer cannot log in to a locally run image. Requests need Cloudflare's headers, as `tests/deploy/test_account_storage.py` sends them.

#### `spec.md:51-71` 1. How the consistent copy is made

### 1. How the consistent copy is made (carried row 2)

`backup()` of `node:sqlite`, through the connection the command opens, copying the whole database in one step by a `rate` above any page count.

The one step is the point of this decision. The documentation says writes from another connection restart a backup, and SQLite warns that such a backup "may never run to completion". Measured on a 66 MB database, with a separate process committing in WAL mode with full synchronization, on this computer and in a container of `node:24-slim` limited to 512 MiB, the database lying on a bind mount of the Windows disk:

| Where, Node.js | `rate` | Result | Restarts seen | Peak memory of the process | The writer |
|---|---|---|---|---|---|
| this computer, 24.17.0 | default, 100 | not finished after 20 s | 1337 | 55 MiB | longest commit 118 ms |
| this computer, 24.17.0 | above the page count | finished in 0.37 s, integrity check `ok` | 0 | 54 MiB | longest commit 9 ms, no busy error |
| container, 24.22.1 | default, 100 | not finished after 20 s | 18 | 62 MiB | longest commit 48 ms |
| container, 24.22.1 | above the page count | finished in 6.1 s, integrity check `ok` | 0 | 58 MiB | longest commit 394 ms, no busy error, under the 1000 ms busy timeout |

The container's times are those of the bind mount, not of the server's Docker volume; only the memory is what this table gives for the server. Restarts follow the disk's speed: on an anonymous Docker volume, in the same limited container, one step took 485 ms with no restart and the writer's longest commit at 55 ms, and the default `rate` took 1.5 s with 70 restarts, integrity check `ok`. So "the default `rate` does not finish" is no general fact and reaches no foundation entry; what decides here is that one step has no restart to suffer. A second measurement, on both releases, showed the one target file is whole on its own: a row held only in the source's write-ahead log, and `user_version`, were present after the file alone was moved and opened, and no `-wal` file stood beside it.

- Rejected: `VACUUM INTO` — would also finish beside a writer, but it is a second operation beside the one the projected decision and its source name (the Online Backup API), and it rewrites the file rather than copying it. It is the fallback if one-step backup ever fails.
- Rejected: the default `rate` — measured above.
- Rejected: `rate: -1` — the documentation says "positive", 24.17.0 accepted it, and 24.22.1, the release of the local `node:24-slim`, refuses it with `ERR_OUT_OF_RANGE`. The `rate` is therefore a positive whole number above any page count.
- Rejected: copying the three files — not consistent. A `sqlite3` tool — not in the image and not `node:sqlite`.
- Cost if wrong: a Node.js release refuses that `rate`. The check of decision 9 fails the build, exit 7, with the running game untouched.

#### `spec.md:72-87` 2. The operator command

### 2. The operator command (settlement 3; carried row 3)

`src/server/account-backup.ts`, run as `node dist/server/account-backup.js` in the `loop2` container, follows the pattern of `account-block.ts`: it opens the existing file of `LOOP2_DATABASE_PATH` with `AccountDatabase`, never creating one.

It needs exactly one fixed word, `--to-standard-output`. Without that word, or with anything else, it refuses with the usage exit code and prints nothing to standard output, before it opens the database. So the bare command, the likeliest slip, shows no player's data on any screen.

Given the word, it backs up into a private temporary directory in the container's own `/tmp`, closes the database, writes the finished file to standard output and removes the directory, also after a failure. Standard output carries the copy's bytes and nothing else; messages go to standard error and hold no database error, path of a player's data or address.

Exit 0 means the whole file was written. Every other exit means the output is not a copy: distinct codes for a database failure, wrong arguments and no database file, as in `account-block.ts`.

There is no refusal for a terminal. Inside the container the command sees a terminal only under `docker exec -t`, so such a check would stop only a person who typed both `-t` and the word, who has already asked for the output. The script never uses `-t`. The skill warns that the word sends every address and password hash to wherever standard output points.

`AccountDatabase` gains one method that makes the backup at a given path; no SQL and no `node:sqlite` import stand outside `database.ts`.

Only a human or the installed backup script runs the command; the skill forbids it to agents.

#### `spec.md:88-96` 3. How the file leaves the container

### 3. How the file leaves the container (carried row 3)

Through `docker exec`'s standard output, read by the backup script. The temporary copy lies in the container's writable layer for the seconds of the run. On the host the plain database exists only in the pipe, never on the disk.

- Rejected: a file in `/app/data` fetched by `docker cp` — a plain copy in the persistent volume, left there by any failure, and three commands to fail.
- Rejected: a new bind mount or a volume mount in a helper container — changes D-17.
- Measured: 8 MiB of every byte value passed through `docker exec` without a terminal with its SHA-256 unchanged, in a pipe from Git's bash on this computer. Docker's engine answers here, so the smoke test of decision 15 keeps this true in the gate, and H3 proves it on the real path.
- Cost if wrong: a damaged stream fails `age`'s decryption or the database's opening at a restore, which is why H3 runs before the merge.

#### `spec.md:268-280` 14. Units and their interfaces

### 14. Units and their interfaces

| Unit | Does one thing | Used by | Depends on |
|---|---|---|---|
| `AccountDatabase` backup method | Makes one consistent copy at a path, whole in one step | units below | `node:sqlite` |
| `src/server/account-backup.ts` | Given its one fixed word, writes one copy to standard output, or fails with a code; without the word, refuses and prints nothing | the backup script, a human | `AccountDatabase`, `LOOP2_DATABASE_PATH` |
| `src/server/account-database-check.ts` | Checks read, write and backup on the running release; exit code | `Dockerfile` | `AccountDatabase` |
| `deploy/loop2-backup` | One night's copy: lock, stream, encrypt, send, log, notice. No argument. A constants block between the same markers as `deploy/loop2-deploy` | cron, a human | `docker`, `age`, `rsync`, `ssh`, `flock`, `pusher`, the two files in `/etc/loop2`, root's SSH entry |
| `deploy/loop2-backup.cron` | Starts the script nightly as root, with cron's mail off | cron | the installed script |
| `compare_installed_script` in `deploy/loop2-deploy` | Warns about three pairs of copies | the deployment | `cmp` |
| `scripts/restore-trial.mjs` | Proves one decrypted file logs in and holds the save | the owner | `docker`, a built image |
| `references/backup_and_restore.md` | The human's procedures and the agent's limits | humans, agents | all above |

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

#### `spec.md:358-367` Left to the maker

## Left to the maker

- Names and numbers of exit codes and stage names, and the bounds of each step's time.
- The fixed subject and text of the notice, within settlement 9.
- Whether the backup script's test seam shares code with `deploy_script_support.py`.
- Text of the deployment's warnings.
- How the launcher brings the file into the temporary volume, and its waiting.
- The size of the writer's load in the command's test. Whether a default-`rate` backup finishes under it depends on the disk, so the test guards decision 1 by what it asserts of the one step, not by the default's failure to finish.
- Which existing tests that read `Dockerfile` or `deploy/loop2-deploy` need their lists extended; each such change follows *Changing an existing test*. `tests/agent_workflow/test_loop2_deploy_skill.py` gains the new file in its list, and its pattern stays.
- Division into slices. To do 6 stands apart from the backup except for the one method both use.
