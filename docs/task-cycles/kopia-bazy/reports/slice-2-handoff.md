# Handoff — executor of slice 2, task kopia-bazy

**Delegation.** The owner of this repository started this cycle and delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator in your report; never to the human. Each go-ahead is provisional.

**Worktree.** `C:/Storage/repos/loop2-wt/kopia-bazy`, branch `task/kopia-bazy`, this slice's base `4ced3b96bfb85bf950fa9996f0912f4917de161c`. Work from its root; the pinned the-way is its `.the-way`. No other agent writes in it now.

**Method and variant.** Read `.the-way/task-cycle/change/SKILL.md` whole. You make: a slice, or the retry of a slice. Read a file it names when its step comes.

**Stage and boundary.** Slice 2 of `docs/task-cycles/kopia-bazy/plan.md`, nothing beyond it. Do not touch the server: no `mikrus` tool, no ssh. Do not push. The gate is the orchestrator's: run your slice's focused checks and no full `npm test`.

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
- The check calls `backupTo` and asserts its result as the command relies on it. Read D-222 at `foundations/decisions.md:4149-4178`. The build's plain output may hide what the step prints; report what you see, since spec decision 9 and H5.2 read the release from it.

**Report.** `docs/task-cycles/kopia-bazy/reports/slice-2-report.md`, as your method gives, with **Searches not found or unclear**. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.

## Your section of the plan, word for word

### Slice 2 — The Node.js release check in the image build

- **Goal:** `src/server/account-database-check.ts`, built like the rest of `src/server`, creates a
  temporary database through `AccountDatabase`, writes an account and a saved game state, reads them
  back, makes a backup by the method of Slice 1, opens the backup, reads the same values, removes
  its files, prints the Node.js release it checked and exits 0; any difference or error exits
  non-zero. A `RUN` step of the final stage of `Dockerfile`, after `dist` is copied and after
  `USER node`, runs it, so no image exists without having passed on its own release, and a failure
  fails `docker compose build`. The deployment's exit 7 and the running containers are as they were.
  The Node.js image stays unpinned. Nothing of this slice names the backup script.
- **Change:** `src/server/account-database-check.ts` · `Dockerfile` ·
  `tests/account-database-check.test.mjs` · `tests/invariants/test_account_save_sqlite_upgrade.py` ·
  `foundations/part_map.md`
- **Read:** `docs/task-cycles/kopia-bazy/task-frozen.md:30-30` To do 6 ·
  `docs/task-cycles/kopia-bazy/task-frozen.md:143-143` Questions carried to cycle, first row ·
  `docs/task-cycles/kopia-bazy/task-frozen.md:135-136` Context, the Node.js release ·
  `docs/task-cycles/kopia-bazy/spec.md:33-46` Constraints ·
  `docs/task-cycles/kopia-bazy/spec.md:51-71` 1. How the consistent copy is made ·
  `docs/task-cycles/kopia-bazy/spec.md:177-195` 9. The Node.js release check ·
  `docs/task-cycles/kopia-bazy/spec.md:268-280` 14. Units and their interfaces ·
  `docs/task-cycles/kopia-bazy/spec.md:281-299` 15. Tests ·
  `docs/task-cycles/kopia-bazy/spec.md:358-367` Left to the maker ·
  `foundations/decisions.md:3-15` D-01 · `foundations/decisions.md:305-323` D-15 ·
  `foundations/decisions.md:352-375` D-17 · `foundations/decisions.md:1386-1397` D-73 ·
  `foundations/decisions.md:1531-1542` D-84 · `foundations/decisions.md:1985-1996` D-112 ·
  `foundations/decisions.md:1998-2011` D-114 ·
  `foundations/invariants.md:15-23` account-server-typecheck ·
  `foundations/invariants.md:135-143` loop2-deploy-keeps-running ·
  `foundations/invariants.md:698-706` account-save-sqlite-access ·
  `foundations/environment_facts.md:250-254` node-sqlite-database ·
  Foundation entries rows E2, E13, E17, E22 ·
  `guidelines/coding.md` · `guidelines/coding-database-access.md` · `guidelines/testing.md` ·
  `src/server/account-block.ts` · `src/server/database.ts` ·
  `tests/invariants/loop2_invariant_support.py:430-500` ·
  `tests/invariants/test_account_server_typecheck.py:125-235` ·
  `.the-way/elements/part-map/skill/SKILL.md`
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/**`: a new file there that every image build runs
- **Checks:** start from `npm test -- tests/account-database-check.test.mjs`, failing: on the real
  Node.js the check passes and prints the release, and on a temporary directory that cannot be
  written it exits non-zero. Then `npm test -- tests/invariants/test_account_save_sqlite_upgrade.py`,
  citing `account-save-sqlite-upgrade` and seen failing once: `Dockerfile` as it stands has the step
  in the final stage, after `dist`. Then `npm test -- tests/invariants/test_account_server_typecheck.py`
  · `npm test -- tests/deploy/test_account_storage.py`, a real image build going through the step,
  skipped and reported unchecked where no daemon answers ·
  `python -B .the-way/elements/common/foundation_check.py`, the first test file claimed by
  `account-server` and the second by `deployment` through `the-way-update-part-map`
- **Depends on:** Slice 1 · Foundation entries E2, E13, E17, E22

## Current ranges

These hold where they differ from the plan's. The plan's foundation entries are written and committed on this branch.

- D-01: `foundations/decisions.md:3-16`
- D-15: `foundations/decisions.md:305-325`
- D-17: `foundations/decisions.md:352-376`
- D-73: `foundations/decisions.md:1386-1398`
- D-84: `foundations/decisions.md:1531-1543`
- D-112: `foundations/decisions.md:1985-1997`
- D-114: `foundations/decisions.md:1998-2012`
- account-server-typecheck: `foundations/invariants.md:15-24`
- loop2-deploy-keeps-running: `foundations/invariants.md:135-144`
- account-save-sqlite-access: `foundations/invariants.md:698-707`
- node-sqlite-database: `foundations/environment_facts.md:250-255`
- E2 is D-215: `foundations/decisions.md:3918-3940`
- E13 is account-save-sqlite-upgrade: `foundations/invariants.md:1048-1057`
- E17 is node-sqlite-database: `foundations/environment_facts.md:250-255`
- E22: the part map, `foundations/part_map.md`; already written

## Rows of the plan's *Foundation entries* your *Read* names

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| E2 — "How does the account and save server access SQLite?" | decision, new, projected whole | task *Decisions in play*; spec *Foundation entries* | Slices 1, 2 |
| E13 — `account-save-sqlite-upgrade` | invariant, new, projected whole; check: `tests/invariants/test_account_save_sqlite_upgrade.py` and `tests/account-database-check.test.mjs` | task *Decisions in play*; spec *Foundation entries* | Slice 2 |
| E17 — `node-sqlite-database` | environment fact, changed: `backup()`, its `rate`, its restart under other connections | spec *Foundation entries* | E2, E12, Slices 1, 2 |
| E22 — part map, responsibilities: `account-server` gains the backup command and the release check, `deployment` the backup script and its schedule, `build-tools` the launcher of the restore trial | part map, through `the-way-update-part-map` | spec *Foundation entries*; the `build-tools` sentence is the plan's reading (see *Choices*) | Slices 1, 2, 3, 5 |

## The passages your *Read* names, word for word

#### `task-frozen.md:30-30` To do 6

6. Każde wydanie Node.js wdrażane na serwer ma za sobą sprawdzenie odczytu, zapisu i tworzenia kopii bazy na tym wydaniu (wpis „How does the account and save server access SQLite?”, `account-save-sqlite-upgrade/1`); dziś nic tego nie zapewnia (Context: kod). Sposób wybiera cykl (Questions carried to cycle).

#### `task-frozen.md:143-143` Questions carried to cycle, first row

- Jak dotrzymać zdania „A Node.js release is deployed only after the server's database read, write and backup operations have been checked on that release.” (punkt 6): przypięcie obrazu Node wersją i skrótem, jak `deploy/cloudflared.Dockerfile`, sprawdzenie w skrypcie wdrożenia przed wymianą kontenerów, czy oba — wybór cyklu; zmiana skryptu wdrożenia oznacza ponowną instalację jego kopii przez człowieka (D-16; H5).

#### `task-frozen.md:135-136` Context, the Node.js release

- Wydanie Node.js nie jest dziś przypięte, a wdrożenie go nie sprawdza: ręczne sprawdzenia z zadań 15 i 16 objęły wydanie, które wtedy stało na serwerze, oba etapy obrazu stoją na `FROM node:24-slim` (`Dockerfile:1`, `:14`), a `deploy/loop2-deploy:298` buduje przez `compose build` bez pobierania świeżej bazy.
- Wydanie zależy więc od tego, co akurat leży w pamięci Dockera na hoście; na nowym hoście po awarii będzie to inne wydanie.

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

#### `spec.md:177-195` 9. The Node.js release check

### 9. The Node.js release check (carried row 1; To do 6)

A check in the image build. `src/server/account-database-check.ts`, built like the rest of `src/server`, is run by a `RUN` step in the final stage of `Dockerfile`, after `dist` is copied. It creates a temporary database through `AccountDatabase`, writes an account and a saved game state, reads them back, makes a backup by the method of decision 2, opens the copy, reads the same values, removes its files, prints the Node.js release it checked and exits 0; any difference or error exits non-zero.

No image can exist on the server without having passed on its own Node.js release, by construction:

- A failure fails `docker compose build`, so the deployment ends at exit 7 with the running containers untouched, which `loop2-deploy-keeps-running` already covers.
- A changed base image invalidates the build cache and reruns the check. A cached step means the same base and the same code passed before. On a new host after a disaster the check simply runs on whatever release that host gets.
- The deploy log's build output shows the release.

| Way | Cost | Result |
|---|---|---|
| Pin only, by version and digest | A pin checks nothing: someone must run a check by hand at each bump, and base-image fixes stop until someone bumps | Rejected |
| A check in `deploy/loop2-deploy` before the containers are replaced | One more container on a host without swap, a new allowed `docker run` that `loop2-host-sharing`'s reading forbids, and a reinstall for every change of it | Rejected |
| Both a pin and a check | Reproducible builds, which this sentence does not need, at the price of a pin to maintain | Rejected for now |
| The check in the image build | Unpinned, so H3's image may stand on another 24.x than the server's; the launcher reports the release it ran on | **Chosen** |

Cost if wrong: a new release fails the check on the server and deployments stop at exit 7 until a human pins the last good release. A pin can be added then, in one change.

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
