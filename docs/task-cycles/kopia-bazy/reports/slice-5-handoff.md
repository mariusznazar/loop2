# Handoff — executor of slice 5, task kopia-bazy

**Delegation.** The owner of this repository started this cycle and delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator in your report; never to the human. Each go-ahead is provisional.

**Worktree.** `C:/Storage/repos/loop2-wt/kopia-bazy`, branch `task/kopia-bazy`, this slice's base `f451316fbe85cabf173a1c726becf3a9d431cca1`. Work from its root; the pinned the-way is its `.the-way`. No other agent writes in it now.

**Method and variant.** Read `.the-way/task-cycle/change/SKILL.md` whole. You make: a slice, or the retry of a slice. Read a file it names when its step comes.

**Stage and boundary.** Slice 5 of `docs/task-cycles/kopia-bazy/plan.md`, nothing beyond it. Do not touch the server: no `mikrus` tool, no ssh. Do not push. The gate is the orchestrator's: run your slice's focused checks and no full `npm test`.

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
- The owner runs this script once on his computer, Windows, in PowerShell or Git's bash, on a real decrypted database holding addresses and password hashes. It must leave no container, no volume and no temporary file, also after a failure and on Ctrl+C, and print none of them. The script holds no secret of the server: the session key and the SMTP password it passes are synthetic and made per run.
- Its `docker` calls start a container, so check how `tests/invariants/test_loop2_host_sharing.py` and `test_account_server_typecheck.py` read `scripts/`; run both.
- Say in your report the exact command the owner runs and its exit codes: the skill of the next slice quotes them.

**Report.** `docs/task-cycles/kopia-bazy/reports/slice-5-report.md`, as your method gives, with **Searches not found or unclear**. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.

## Your section of the plan, word for word

### Slice 5 — The launcher of the restore trial

- **Goal:** `scripts/restore-trial.mjs`, Node.js built-ins only, run by the owner on his computer,
  takes the built image, the decrypted database file, a marker text and the test account's address
  as arguments and the password on standard input, never as an argument. It starts one container
  from the image on a fresh temporary volume holding that file, on a synthetic session key and SMTP
  password file, with the production settings of `compose.yaml`. Through the server's HTTP port, from
  inside the container, with Cloudflare's headers, it logs in and reads `GET /api/saved-game`. It
  prints the Node.js release, the login's status, the save's revision, whether the marker stands in
  the saved game state, and PASS or FAIL, with an exit code that says which. It prints no game text,
  no address and no password, sends no mail, and removes its container and volumes after every end,
  a failure included.
- **Change:** `scripts/restore-trial.mjs` · `tests/deploy/test_restore_trial.py`
- **Read:** `docs/task-cycles/kopia-bazy/task-frozen.md:27-29` To do 5 ·
  `docs/task-cycles/kopia-bazy/task-frozen.md:207-207` Settlements to record, row 12 ·
  `docs/task-cycles/kopia-bazy/spec.md:33-46` Constraints ·
  `docs/task-cycles/kopia-bazy/spec.md:214-214` 11, step H2.4a ·
  `docs/task-cycles/kopia-bazy/spec.md:225-247` 12. The restore trial ·
  `docs/task-cycles/kopia-bazy/spec.md:268-280` 14. Units and their interfaces ·
  `docs/task-cycles/kopia-bazy/spec.md:281-299` 15. Tests ·
  `docs/task-cycles/kopia-bazy/spec.md:358-367` Left to the maker ·
  `foundations/decisions.md:1386-1397` D-73 · `foundations/decisions.md:1531-1542` D-84 ·
  `foundations/decisions.md:964-977` D-49 · `foundations/decisions.md:1944-1957` D-110 ·
  `foundations/decisions.md:1959-1970` D-111 ·
  `foundations/invariants.md:748-756` account-startup-configuration ·
  Foundation entries rows E1, E7, E22 · `guidelines/coding.md` · `guidelines/testing.md` ·
  `scripts/measure-passwords.mjs` · `compose.yaml` · `tests/deploy/test_account_storage.py` ·
  `tests/invariants/account_container_support.py`
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from `npm test -- tests/deploy/test_restore_trial.py`, failing: its refusals run
  without Docker, a password given as an argument among them; its run, where a daemon answers,
  otherwise skipped and reported unchecked, takes a database the test makes with a synthetic account
  and a saved game state holding a marker, and gives PASS, FAIL on a wrong password and FAIL on an
  absent marker, with neither address, password nor game text in the output and no container or
  volume left. Then `npm test -- tests/quality/test_quality_invariants.py` for ESLint and Prettier on
  `scripts/**`
- **Depends on:** Slice 2, whose image it runs · Foundation entries E1, E7, E22

## Current ranges

These hold where they differ from the plan's. The plan's foundation entries are written and committed on this branch.

- D-73: `foundations/decisions.md:1386-1398`
- D-84: `foundations/decisions.md:1531-1543`
- D-49: `foundations/decisions.md:964-978`
- D-110: `foundations/decisions.md:1944-1958`
- D-111: `foundations/decisions.md:1959-1971`
- account-startup-configuration: `foundations/invariants.md:748-757`
- E1 is D-214: `foundations/decisions.md:3892-3917`
- E7 is D-220: `foundations/decisions.md:4099-4126`
- E22: the part map, `foundations/part_map.md`; already written

## Rows of the plan's *Foundation entries* your *Read* names

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| E1 — "Which failure does the database backup survive?" | decision, new, projected whole | task *Decisions in play*; spec *Foundation entries* | Slices 1, 3, 5, 6 |
| E7 — what a checked restore means | decision, new | Settlements row 12; spec decision 12 | Slices 5, 6 |
| E22 — part map, responsibilities: `account-server` gains the backup command and the release check, `deployment` the backup script and its schedule, `build-tools` the launcher of the restore trial | part map, through `the-way-update-part-map` | spec *Foundation entries*; the `build-tools` sentence is the plan's reading (see *Choices*) | Slices 1, 2, 3, 5 |

## The passages your *Read* names, word for word

#### `task-frozen.md:27-29` To do 5

5. Odtworzenie z kopii jest sprawdzone bez starego serwera gry (definicja, linia 110: „pozwoli odtworzyć go bez starego serwera gry”) na komputerze właściciela, raz, przed scaleniem (pytanie 6, H3).
   - Próba to pobranie kopii z miejsca docelowego, odszyfrowanie, uruchomienie tego samego commitu na tej kopii, zalogowanie kontem testowym, sprawdzenie, że zapis stanu gry wrócił, i usunięcie kopii z komputera.
   - Gdy próba zawiedzie albo kopie się nie zmieszczą, cykl staje na zablokowanym requeście i wraca do pytania 2.

#### `task-frozen.md:207-207` Settlements to record, row 12

| 12 | Sprawdzone odtworzenie znaczy: na komputerze właściciela, raz, przed scaleniem, pobranie kopii z miejsca docelowego, odszyfrowanie, uruchomienie tego samego commitu na tej kopii, zalogowanie kontem testowym, sprawdzenie, że zapis stanu gry wrócił, i usunięcie kopii z komputera; nie obejmuje budowy nowego serwera. | decision | pytanie 6 (A; Mariusz, 2026-10-30, pozycja D13 pakietu rundy), *Not chosen* tam | Co wystarcza za dowód: otwarcie pliku czy pełna odbudowa. |

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

#### `spec.md:214-214` 11, step H2.4a

| H2.4a | human, browser | In the test account on the public game, give a character or a program a name to recognise, wait for the automatic save, then reload the page. This comes before every run whose copy H3 may use, and the name is written down for H3 | — | the name is back after the reload, which shows the save finished |

#### `spec.md:225-247` 12. The restore trial

### 12. The restore trial (To do 5, H3, settlement 12)

`scripts/restore-trial.mjs`, a launcher on the model of `scripts/measure-passwords.mjs`, with Node.js built-ins only, run by the owner on his computer. It takes the built image, the decrypted database file and a marker text as arguments, and the test account's address; the password comes on standard input, never as an argument.

It starts one container from the image on a fresh temporary volume holding that file and on a synthetic session key and SMTP password file, with the production settings of `compose.yaml`. Through the server's HTTP port, from inside the container with Cloudflare's headers as `tests/deploy/test_account_storage.py` sends them, it logs in and reads `GET /api/saved-game`. It prints the Node.js release, the login's status, the save's revision, whether the marker stands in the saved game state, and PASS or FAIL. It removes the container and volumes, also after a failure. It prints no game text, no address and no password. It sends no mail, since login sends none.

The marker is the name of step H2.4a, which the human gives a character or a program in the test account before the copy is made; saved game states hold both as text. This shows "that exact change is back", not merely that some save exists.

The owner's order:

1. Turn on the Docker engine and install `age`.
2. Make a temporary Strych key from the note, as in H1, and fetch the weekday files with `scp`, keeping their times.
3. Take the newest and write down its size.
4. Decrypt it with the key from the note.
5. Build the image from a clean checkout of the same commit.
6. Run the launcher.
7. Write the sum of decision 5 and the launcher's report into the request's record.
8. Remove the copies, the decrypted file and both temporary keys.

- Rejected: a sequence of commands in the skill alone — about ten Docker commands in PowerShell, an inline client and a password to keep out of arguments, never run before H3. A typo there costs a correction inside the no-merge window, while tasks 14, 18 and 21 wait.
- Rejected: a browser — the login cannot work on a local image (see *Constraints*).
- Not proven by this trial, and said so in the skill: building a new server, restoring over a live volume, copies of later schema versions.

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
