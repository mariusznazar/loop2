FAIL

# Report — reviewer of the spec, task kopia-bazy

Status: done
Spec reviewed: `docs/task-cycles/kopia-bazy/spec.md`, as it stood at 23:31 on 2026-10-30

Check result: three findings need a change to the spec and one is low; the designer's two probes were rerun and agree with the spec; not run: anything in Docker (engine off), `npm test` and `foundation_check.py` (no code yet), anything on the server or on Strych, with `age`, `rsync` or `ssh`.

The design holds as a whole. The eleven carried rows and the two added questions are all answered, every To do, every settlement and H5, H2, H3 have a place, and no finding reopens a decision of the spec. Each finding below is a local correction.

## Findings

### 1. The skill may not name Strych's host, and the spec needs it to — guess, contradiction with an existing test

What goes wrong: the maker writes the new reference as decision 13 asks, adds it to the test's file list as he must, and the test fails on the host name.

- `tests/agent_workflow/test_loop2_deploy_skill.py:14` — `MIKRUS_NAME` matches `\bmikr\.us\b`, so `strych.mikr.us` and `push.mikr.us` match.
- `tests/agent_workflow/test_loop2_deploy_skill.py:45`–`46` — both skill copies must hold exactly the files of `FILES`, so `references/backup_and_restore.md` has to join that list.
- `tests/agent_workflow/test_loop2_deploy_skill.py:67`–`71` — every file of `FILES` is checked against that pattern.
- A search of both skill copies finds no `mikr.us` today. Even Outsider's host stands in the skill only as "Outsider's SMTP server".
- `spec.md:242` and `spec.md:243` — the reference says where the copies lie and carries the steps of decision 11, among them `spec.md:203`, "root's `~/.ssh/config` entry for `strych.mikr.us`".
- `spec.md:343` leaves to the maker only tests "that read `Dockerfile` or `deploy/loop2-deploy`", and only "their lists extended". This test reads neither, and the change it needs is to a pattern, not to a list.

Question: does the skill write the host, or point to where it stands?

- Way A: the skill says "the host in the constants block of `deploy/loop2-backup`" and the test stays. Cost: one indirection for the human, also on the day the server is gone, though the repository still answers it.
- Way B: the pattern is narrowed so a shared Mikrus host passes and a server name still fails. Cost: a weakened check, which *Changing an existing test* allows only with a cause in the requirement, and which the spec must then name.
- If the spec stays silent, the maker either loosens a check that protects access values to get a green test, or writes a skill that cannot say where the copies lie.

Recommendation: way A. It changes no test, and `deploy/loop2-backup` holds the host anyway (`spec.md:121`).

### 2. The backup log can hold the Strych login, against D-13 and the spec's own constraint — contradiction

What goes wrong: the maker sends `ssh`'s and `rsync`'s error text to the log, as the spec says, and a refused login writes an access value into a log an agent is allowed to read.

- `spec.md:37` — "Credentials never stand in a repository file, argument, log or environment. The Strych login is an access value".
- D-13, *Verification*, violates: "an access or credential value in a workflow, script, skill, request, command argument, log or container environment". D-13 names the server's name and its SSH user as access values.
- Strych's page (https://wiki.mikr.us/strych_backupy/) gives the entry as `user basia100`, to be replaced by the user's own username. So the login has the form of the server's name, which is the very value D-13 names.
- `spec.md:164` — "Tools' own error text goes to this file alone, as in `deploy/loop2-deploy`."
- OpenSSH's refusal begins with `login@host:`. This comes from knowledge of OpenSSH, not from a run here.
- `spec.md:247` — an agent may read a bounded tail of this log.
- `spec.md:273` — the test keeps a database marker out of the log, and nothing keeps the login out.

The deployment's own log is no precedent for accepting this: `SKILL.md:72`–`73` warns that SSH errors may reveal access values, because they can.

Question: does the error text of `ssh` and `rsync` reach the log? The answer changes the script and adds a case to its test.

- Way A: for the send step the log holds the stage and `rsync`'s exit code, and its error text goes nowhere. Cost: a human diagnosing a failed send repeats the send by hand to see the reason.
- Way B: the text stays in the log and the spec says the log may hold an access value, so an agent reports only the stage and exit code. Cost: the sentence at `spec.md:37` has to change, and D-13's *Verification* then has an exception to record.

Recommendation: way A, with a test in which the `rsync` stand-in prints a sentinel login on standard error and the sentinel is absent from the log. `spec.md:164` keeps its sentence for the other tools.

### 3. The terminal refusal does not protect against the slip it names — behaviour the design cannot deliver

What goes wrong: the maker builds and tests a refusal that fires only for `docker exec -t`. A person running the command in its documented form still gets the database on his screen, and the skill may repeat a promise that does not hold.

- `spec.md:76` — "It refuses to run when standard output is a terminal, so a person cannot print the accounts to a screen by a slip".
- `.claude/skills/loop2-deploy/SKILL.md:190` — the pattern this command follows has no `-t`: `docker exec loop2 node dist/server/account-block.js block <email>`.
- Without `-t`, Docker gives the process in the container no terminal. It sees a stream, whatever the human's own shell is attached to. So the check inside the container cannot see the human's terminal. This is Docker's documented meaning of `-t`, not a run here, as the engine is off.
- `spec.md:274`–`:276` test the script, and `spec.md:268` tests the command, in neither case through `docker exec`.

Question: what really stops the slip?

- Way A: the command needs one fixed word, say `--to-standard-output`, and without it refuses and prints nothing. Cost: `spec.md:74`, "It takes no argument", changes, and the script and one test carry the word. Gain: the bare command, the likeliest slip, is safe in every form.
- Way B: keep the refusal for the `-t` case, drop "so a person cannot print the accounts to a screen by a slip", and let the skill warn. Cost: no code beyond the spec as it stands, and the slip stays possible for a human, whom the skill already trusts with a shell on the server.

Recommendation: way A. The output is every address and password hash, and the cost is one constant.

### 4. The marker has no place in the human's procedure — low, a step the procedure drops

What goes wrong: `spec.md:243` makes decision 11's table the procedure of the skill, and `spec.md:225`–`232` give the owner's order. Neither holds the marker, which `spec.md:221` requires "before the copy is made". Those eight steps all start after the copy exists. A human who follows the table reaches H3 with a copy that has no marker, and the launcher says FAIL. Repairing it costs a new hand run, or one more night if he wants a scheduled copy, inside the no-merge window while tasks 14, 18 and 21 wait.

Fix: one row in the table of decision 11, before the run whose copy H3 will use, saying who gives the name and that the automatic save has to finish first.

## Readings the designer asked to have checked

| # | Reading | Verdict |
|---|---|---|
| 1 | Settlement 10 lists a deletion step the design lacks | Accepted. A failed replacement is a failed send, so no failed step stays silent. The two sentences `spec.md:146` and `spec.md:286` pull apart a little: one gives the words to the foundation step, the other says the approved words stand. The orchestrator should say which wins for this row, so the invariant does not name a step that does not exist. |
| 2 | Overwriting on Strych is untried; H2.5 tries it | Accepted. The second run writes the same weekday file with a new time, so `rsync` really sends it. |
| 3 | H2.8 stays the human's choice | Accepted; matches question 10. |
| 4 | Eight copies during a transfer, limit 25 MB, about 385 accounts | Accepted; the sums are right (200 / 8, 25 / 0.065, 200 / 7 / 0.065). The human accepted 440, so the handoff to him should carry 385. |
| 5 | H2.6, a deliberate failure | Accepted. It adds a check, not behaviour. |
| 6 | `scripts/restore-trial.mjs` | Accepted, under the added question of what a human needs for H3. `src/server/configuration.ts:176`–`181` and `src/server/transport.ts:46`–`50` confirm a browser cannot log in, and `tests/deploy/test_account_storage.py:49`–`69` is a working model of the launcher's requests. |
| 7 | `account-save-backup` has Method `review` | Accepted. `account-save-durable-storage` is the same kind of sentence with the same Method. |

## Checked and sound

- **Decision 1.** The rerun on Node.js 24.17.0 gave: one step finished in 413 ms, integrity `ok`, peak 56 MiB, writer's longest commit 13 ms; default `rate` not finished after 20 s, 1259 restarts seen, peak 58 MiB, writer's longest commit 67 ms. A row held only in the write-ahead log and `user_version` were present after the file alone was moved. `rate: -1` was accepted.
- **Decision 4.** age 1.0.0's manual has the identity-file use and "exit 0 if and only if encryption or decryption are succesful for the full length of the input". Age cannot know its input was cut off upstream, but `spec.md:161` requires every stage of the pipe to exit 0, so a cut stream is not sent.
- **Decision 6.** Strych's page gives `Host strych.mikr.us` with a user and `IdentityFile /backup_key`, and no port, so naming only the host works and `ssh-keyscan` on the default port fits.
- **Decision 9.** No reader of `Dockerfile` refuses a `RUN` in the last stage. A failed build ends at exit 7 at `deploy/loop2-deploy:302`. `up` runs `--no-build`, so no path deploys around the check. The test of `loop2-host-sharing` does forbid `docker run`, as the way table says.
- **Decision 10.** `compare_installed_script` only logs. `spec.md:191`'s warnings reach the Actions log through `log`.
- **Step 4's answers.** Strych's listing is never read, so it supplies no name. The change performs no deletion by command, no restore and no key change. A human installs the schedule that replaces a copy, and the spec's *Intent* says so.
- **D-10, D-15, D-16, D-17, `loop2-host-sharing`.** Unchanged, as the spec says. D-13, D-112 and D-73 are the ones that change.
- **Settlements 1–12.** Each has its entry under *Foundation entries*.

## Below the bar, for the orchestrator

- `account-save-backup` is false from the moment it is recorded until H2. The cycle before this one marked such an invariant violated and cleared the mark after the human's check (commit e95a8b1). The spec is silent, and `the-way-record-invariant` covers the case, so this needs no change to the spec, only attention at the foundation step.
- After a rollback to a commit from before this change, the nightly run fails and a message comes each night. That is a true alarm, but `spec.md:191` names only the deployment's warning for that case, so the skill should say it too.

## Reaches

- `docs/task-cycles/kopia-bazy/cycle.md`, whole — the state of the cycle and the two questions of step 4.
- `tests/agent_workflow/test_loop2_deploy_skill.py`, whole — what a new reference file meets (finding 1).
- `tests/deploy/deploy_script_support.py`, lines 1–150 — whether the test seam the spec names fits the new script.
- `tests/quality/test_quality_invariants.py`, lines 15–40, `tests/invariants/loop2_invariant_support.py`, lines 505–545, `tests/invariants/test_account_server_typecheck.py`, lines 205–225, and a search of `tests/` for `Dockerfile`, `dist/server` and `RUN` — whether anything refuses the new `RUN` step or script.
- `scripts/measure-passwords.mjs`, lines 1–60, `.gitattributes`, `.dockerignore` — the launcher's model, line endings, and what the image build can see.
- `src/server/configuration.ts`, `src/server/account-routes.ts`, `src/server/transport.ts`, by search — whether a browser can log in to a local image.
- `src/browser/`, by search for renaming — whether a human can give the marker: a program can be renamed.
- `definicja_mvp_loop2.md`, lines 1929–1965, by search — the projected invariants' fields. Their `Part: every` is the form every projected invariant has, so setting the real parts is no change of a settled word.
- `C:\Storage\repos\loop2\.runs\project-refinement\kopia-bazy.md`, by search on Strych words — how H1 ran. Some long lines were cut from the results.
- `https://wiki.mikr.us/strych_backupy/` and `https://raw.githubusercontent.com/FiloSottile/age/v1.0.0/doc/age.1.ronn`, read 2026-10-30 — the SSH entry, and age's exit and identity sentences. Both came through a summarizing fetch tool, so they are no reading of the source for a fact's quotation.
- `C:\Storage\The Brain\The Brain\.ai\rules\scripts.md` — the user's rule. I read it late, after three read-only Python heredocs had run; they read files only, so no result depends on it.
- The designer's three probe files, copied to the session's scratchpad and run there, so nothing was written under `.runs/` but this report.

No `mikrus` tool, no ssh, no change to the spec, no code, no commit, no foundation entry.

**Searches not found or unclear:**

- Whether D-13's word "log" covers a log that stays on the server: its text sets no limit, and the deployment's log already takes tool output. Finding 2 reads it as covering, because the spec's own constraint says so.
- The text OpenSSH prints on a refused login, and the behaviour of `docker exec` without `-t`: both from knowledge and documentation, not observed here.
- What Strych does at its 200 MB limit: still no source, as the designer reports; `spec.md:115` rests on a non-zero exit of `rsync`, which no trial covers.
- Whether `/run/loop2-deploy.lock`, if the backup script creates it first as root, can still be opened by the deployment: `setup_and_secrets.md:11`–`14` allows a non-root run account, while its measuring section calls root the shell the deployment is run from. The server was not read. If the run account is root there is nothing to do.
- `.the-way/elements/invariants/template.md` was not read: reading 7 was judged from the entry of `account-save-durable-storage`.
