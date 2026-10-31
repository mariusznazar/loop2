# Handoff — executor of slice 4, task kopia-bazy

**Delegation.** The owner of this repository started this cycle and delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator in your report; never to the human. Each go-ahead is provisional.

**Worktree.** `C:/Storage/repos/loop2-wt/kopia-bazy`, branch `task/kopia-bazy`, this slice's base `0d18e4d158e31c80145f981ead4402c01dfe38e6`. Work from its root; the pinned the-way is its `.the-way`. No other agent writes in it now.

**Method and variant.** Read `.the-way/task-cycle/change/SKILL.md` whole. You make: a slice, or the retry of a slice. Read a file it names when its step comes.

**Stage and boundary.** Slice 4 of `docs/task-cycles/kopia-bazy/plan.md`, nothing beyond it. Do not touch the server: no `mikrus` tool, no ssh. Do not push. The gate is the orchestrator's: run your slice's focused checks and no full `npm test`.

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
- This script is what the automation's key runs. The comparison only warns: every other stage, exit code and order of `deploy/loop2-deploy` stay as they are.
- Run ShellCheck on `deploy/loop2-deploy` by the gate's own command, and `npm test -- <file>` for each file of your *Checks*, one by one.
- The fixture of `tests/deploy/deploy_script_support.py` carries the three pairs from the repository's own files, so every deployment test sees no warning unless it asks for one.

**Report.** `docs/task-cycles/kopia-bazy/reports/slice-4-report.md`, as your method gives, with **Searches not found or unclear**. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.

## Your section of the plan, word for word

### Slice 4 — Three installed copies compared at each deployment

- **Goal:** `compare_installed_script` in `deploy/loop2-deploy` compares three pairs instead of one:
  the installed deploy script, the installed `/usr/local/bin/loop2-backup` and the installed
  `/etc/cron.d/loop2-backup`, each with its source at the deployed commit (`deploy/loop2-deploy`,
  `deploy/loop2-backup`, `deploy/loop2-backup.cron`). A difference, an unreadable installed copy or a
  commit without the source only warns, in the same words of kind, and the run goes on. Nothing else
  of the deployment changes. The new paths stand in the constants block.
- **Change:** `deploy/loop2-deploy` · `tests/deploy/deploy_script_support.py` ·
  `tests/deploy/test_loop2_deploy_build.py`
- **Read:** `docs/task-cycles/kopia-bazy/spec.md:33-46` Constraints ·
  `docs/task-cycles/kopia-bazy/spec.md:196-201` 10. Comparing the installed copies ·
  `docs/task-cycles/kopia-bazy/spec.md:268-280` 14. Units and their interfaces ·
  `docs/task-cycles/kopia-bazy/spec.md:281-299` 15. Tests ·
  `docs/task-cycles/kopia-bazy/spec.md:358-367` Left to the maker ·
  `foundations/decisions.md:305-323` D-15 · `foundations/decisions.md:326-350` D-16 ·
  `foundations/decisions.md:352-375` D-17 · `foundations/decisions.md:1386-1397` D-73 ·
  `foundations/decisions.md:1531-1542` D-84 ·
  `foundations/invariants.md:125-133` loop2-deploy-trigger-input ·
  `foundations/invariants.md:135-143` loop2-deploy-keeps-running ·
  `foundations/invariants.md:155-163` loop2-host-sharing ·
  `foundations/invariants.md:428-436` shellcheck-source-rules ·
  Foundation entries row E4 · `guidelines/coding.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** trust boundary — `deploy/**`: the script the automation's key runs
- **Checks:** start from a failing case in `npm test -- tests/deploy/test_loop2_deploy_build.py`: each
  of the two new pairs, differing, warns and the deployment goes on; all three equal gives no
  warning. `deployable_commit` and `install` of the fixture now carry the three pairs from the
  repository's own files. A commit without the sources warns for each pair; the change of
  `test_commit_without_the_script_warns_then_fails_the_build_with_7` follows *Changing an existing
  test*, its reason being spec decision 10. Then each of `npm test -- tests/deploy/test_loop2_deploy_switch.py`
  · `npm test -- tests/deploy/test_loop2_deploy_commit.py` · `npm test -- tests/deploy/test_loop2_deploy_input.py`
  · `npm test -- tests/invariants/test_loop2_deploy_keeps_running.py` ·
  `npm test -- tests/invariants/test_loop2_deploy_trigger_input.py` ·
  `npm test -- tests/invariants/test_loop2_host_sharing.py` ·
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 3, whose two files the fixture commits · Foundation entries E4

## Current ranges

These hold where they differ from the plan's. The plan's foundation entries are written and committed on this branch.

- D-15: `foundations/decisions.md:305-325`
- D-16: `foundations/decisions.md:326-351`
- D-17: `foundations/decisions.md:352-376`
- D-73: `foundations/decisions.md:1386-1398`
- D-84: `foundations/decisions.md:1531-1543`
- loop2-deploy-trigger-input: `foundations/invariants.md:125-134`
- loop2-deploy-keeps-running: `foundations/invariants.md:135-144`
- loop2-host-sharing: `foundations/invariants.md:155-164`
- shellcheck-source-rules: `foundations/invariants.md:428-437`
- E4 is D-217: `foundations/decisions.md:3978-4024`

## Rows of the plan's *Foundation entries* your *Read* names

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| E4 — where the backup runs | decision, new | Settlements row 2; spec decisions 3, 8, 10; names D-10's *Rejected* as reversed for this case and leaves D-10 unchanged | Slices 1, 3, 4, 6 |

## The passages your *Read* names, word for word

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

#### `spec.md:196-201` 10. Comparing the installed copies

### 10. Comparing the installed copies (carried row 10)

Yes. `compare_installed_script` in `deploy/loop2-deploy` compares three pairs instead of one: the deploy script, the backup script and the schedule, each with its source at the deployed commit. It only warns, in the same words of kind, so the warning reaches the Actions log.

This is what makes the accepted drift of question 3 visible. It costs one reinstall of `loop2-deploy` in H5. Warnings are expected between H5 and H2 and after a rollback to a commit from before this change; the skill says so, and decision 13 says what else that rollback does. Rejected: no comparison — the drift D-10 rejected for the tunnel would stay invisible.

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
