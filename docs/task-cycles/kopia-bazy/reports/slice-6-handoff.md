# Handoff — executor of slice 6, task kopia-bazy

**Delegation.** The owner of this repository started this cycle and delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator in your report; never to the human. Each go-ahead is provisional.

**Worktree.** `C:/Storage/repos/loop2-wt/kopia-bazy`, branch `task/kopia-bazy`, this slice's base `46614c6e6cbbaef8f062b94fa596d6f4ad279d2a`. Work from its root; the pinned the-way is its `.the-way`. No other agent writes in it now.

**Method and variant.** Read `.the-way/task-cycle/change/SKILL.md` whole. You make: a slice, or the retry of a slice. Read a file it names when its step comes.

**Stage and boundary.** Slice 6 of `docs/task-cycles/kopia-bazy/plan.md`, nothing beyond it. Do not touch the server: no `mikrus` tool, no ssh. Do not push. The gate is the orchestrator's: run your slice's focused checks and no full `npm test`.

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
- Facts the earlier slices found, for the skill's readings; each is checked against the files, which win:
  - `rsync`'s exit values, as read from its manual: 11 file I/O, 12 protocol stream, 23 partial transfer, 30 input timeout. 124 and 137 come from `timeout`. The manual lists no 255; a real run gave `rsync exit 255` when `ssh` exited 255, so a refused login or a changed host key reads as 255.
  - A logged size near 200 bytes is an empty backup: real `age` makes a valid file of that size from no input, and it would replace that weekday's file. The skill says so.
  - The release check's line stands in `/var/log/loop2-deploy.log`, on every first build of a commit; a human running `loop2-deploy <head>` does not see it on the terminal, and a repeat of the same commit prints none. H5.2 reads it there.
  - The notice arrives with the subject `kopia bazy loop2 nieudana`, as `pusher` turns underscores into spaces, and the text `Kopia bazy loop2 nie udała się.`. H2.6 also shows whether `ł` and `ę` arrive whole.
  - The restore trial: `<password> | node scripts/restore-trial.mjs --image <image> --database <decrypted file> --marker <text> --email <address>`; exit 0 PASS, 1 FAIL judged, 2 refused, 3 could not run to a verdict, 4 a container or volume could not be removed, 130 interrupted. A terminal as standard input is refused. A non-ASCII password may be altered by the console code page, so the skill tells the owner how to pass it, and to keep the test account's password ASCII. The owner's computer runs PowerShell: give that form, and keep the password out of the shell's history.
  - A hand run of the send proves access only; the skill says it reuses one fixed file name.
- Take the names of stages and exit codes from `deploy/loop2-backup` and `src/server/account-backup.ts`, never from the plan.
- The skill stays the language it is written in. Keep `SKILL.md` as short as its role, and put the procedures in the new reference.
- Every procedure that changes the server is a human's: no instruction has an agent install, run the backup, restore, change a key, make the hand run of the send, or list Strych. The agent's lists in `SKILL.md` say what it may read: a bounded tail of the log, `stat` of the two new files, `cmp` of the installed copies.
- Both copies stay byte-identical at your commit.

**Report.** `docs/task-cycles/kopia-bazy/reports/slice-6-report.md`, as your method gives, with **Searches not found or unclear**. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.

## Your section of the plan, word for word

### Slice 6 — The loop2-deploy skill

- **Goal:** both copies of the skill, byte-identical, describe all of the above. A new
  `references/backup_and_restore.md` holds every item of spec decision 13's list. `SKILL.md` gains its
  resource table rows, its agent lists and a description that names backups, and it and
  `references/troubleshooting.md` read exit 7 with the release check's failure. The sentences at
  `references/setup_and_secrets.md:299`–`300` and `references/troubleshooting.md:101`–`102` and
  `:128`–`129` stop saying that nothing copies the database off the server. The skill names no Mikrus
  host or address, web pages included: it points to the constants block of `deploy/loop2-backup` and
  names Mikrus's pages in words. Every procedure is a human's: no instruction has an agent install,
  run the backup, restore, change a key, make the hand run of the send, or list Strych.
  `tests/agent_workflow/test_loop2_deploy_skill.py` gains the new file in its list and keeps its
  pattern.
- **Change:** `.claude/skills/loop2-deploy/SKILL.md` ·
  `.claude/skills/loop2-deploy/references/backup_and_restore.md` ·
  `.claude/skills/loop2-deploy/references/setup_and_secrets.md` ·
  `.claude/skills/loop2-deploy/references/troubleshooting.md` · `.agents/skills/loop2-deploy/SKILL.md` ·
  `.agents/skills/loop2-deploy/references/backup_and_restore.md` ·
  `.agents/skills/loop2-deploy/references/setup_and_secrets.md` ·
  `.agents/skills/loop2-deploy/references/troubleshooting.md` ·
  `tests/agent_workflow/test_loop2_deploy_skill.py`
- **Read:** `docs/task-cycles/kopia-bazy/task-frozen.md:31-33` To do 7 ·
  `docs/task-cycles/kopia-bazy/task-frozen.md:137-138` Context, what a restore undoes ·
  `docs/task-cycles/kopia-bazy/task-frozen.md:157-161` Human actions ·
  `docs/task-cycles/kopia-bazy/task-frozen.md:201-202` Settlements to record, rows 6 and 7 ·
  `docs/task-cycles/kopia-bazy/spec.md:6-11` Intent ·
  `docs/task-cycles/kopia-bazy/spec.md:47-50` Decisions, the two words ·
  `docs/task-cycles/kopia-bazy/spec.md:72-87` 2. The operator command ·
  `docs/task-cycles/kopia-bazy/spec.md:97-114` 4. Encryption ·
  `docs/task-cycles/kopia-bazy/spec.md:115-123` 5. Compression, capacity ·
  `docs/task-cycles/kopia-bazy/spec.md:124-132` 6. Sending, access and the host key ·
  `docs/task-cycles/kopia-bazy/spec.md:133-155` 7. How older copies go ·
  `docs/task-cycles/kopia-bazy/spec.md:156-176` 8. Hour, deployment, log, notice ·
  `docs/task-cycles/kopia-bazy/spec.md:177-195` 9. The Node.js release check ·
  `docs/task-cycles/kopia-bazy/spec.md:196-201` 10. Comparing the installed copies ·
  `docs/task-cycles/kopia-bazy/spec.md:202-224` 11. What is installed, from where, in what order ·
  `docs/task-cycles/kopia-bazy/spec.md:225-247` 12. The restore trial ·
  `docs/task-cycles/kopia-bazy/spec.md:248-267` 13. The skill ·
  `foundations/decisions.md:253-271` D-12 · `foundations/decisions.md:273-286` D-13 ·
  `foundations/decisions.md:305-323` D-15 · `foundations/decisions.md:326-350` D-16 ·
  `foundations/decisions.md:352-375` D-17 · `foundations/decisions.md:2549-2562` D-137 ·
  `foundations/decisions.md:3724-3766` D-209 ·
  Foundation entries rows E1, E3, E4, E5, E6, E7, E9, E12 ·
  `guidelines/coding.md` · `guidelines/testing.md` · the files Slices 1 to 5 made, by name:
  src/server/account-backup.ts, deploy/loop2-backup, deploy/loop2-backup.cron and
  scripts/restore-trial.mjs, for the names of stages, exit codes and arguments
- **Model:** cheaper
- **Risk:** cannot be undone — the skill holds the human's procedures for restoring over the server's
  database and for changing the encryption key; the slice only writes them, and no instruction of an
  agent performs them
- **Checks:** `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`, its list of files
  extended first, so that both copies, the new file included, stay byte-identical and hold neither
  an IPv6 address nor a Mikrus server name and the description stays short and safe
- **Depends on:** Slice 1 · Slice 2 · Slice 3 · Slice 4 · Slice 5 · Foundation entries E1, E3, E4,
  E5, E6, E7, E9, E12

## Current ranges

These hold where they differ from the plan's. The plan's foundation entries are written and committed on this branch.

- D-12: `foundations/decisions.md:253-272`
- D-13: `foundations/decisions.md:273-288`
- D-15: `foundations/decisions.md:305-325`
- D-16: `foundations/decisions.md:326-351`
- D-17: `foundations/decisions.md:352-376`
- D-137: `foundations/decisions.md:2549-2563`
- D-209: `foundations/decisions.md:3724-3767`
- E1 is D-214: `foundations/decisions.md:3892-3917`
- E3 is D-216: `foundations/decisions.md:3941-3977`
- E4 is D-217: `foundations/decisions.md:3978-4024`
- E5 is D-218: `foundations/decisions.md:4025-4061`
- E6 is D-219: `foundations/decisions.md:4062-4098`
- E7 is D-220: `foundations/decisions.md:4099-4126`
- E9 is D-13: `foundations/decisions.md:273-288`
- E12 is account-save-backup: `foundations/invariants.md:1038-1047`

## Rows of the plan's *Foundation entries* your *Read* names

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| E1 — "Which failure does the database backup survive?" | decision, new, projected whole | task *Decisions in play*; spec *Foundation entries* | Slices 1, 3, 5, 6 |
| E3 — how often a backup is made and how many stay | decision, new | Settlements row 1; spec decision 7 | Slices 3, 6 |
| E4 — where the backup runs | decision, new | Settlements row 2; spec decisions 3, 8, 10; names D-10's *Rejected* as reversed for this case and leaves D-10 unchanged | Slices 1, 3, 4, 6 |
| E5 — how the backup is encrypted | decision, new | Settlements row 4; spec decisions 4, 5 | Slices 3, 6 |
| E6 — how the owner learns of a failed backup | decision, new | Settlements rows 8 and 9; spec decision 8 | Slices 3, 6 |
| E7 — what a checked restore means | decision, new | Settlements row 12; spec decision 12 | Slices 5, 6 |
| E9 — D-13 | decision, changed | Settlements rows 6 and 7; spec *Foundation entries* | Slices 3, 6 |
| E12 — `account-save-backup` | invariant, new, projected whole, *Violated: yes*; check: method `review`, the human's H2 and H3, no test and no expected-failure marking | task *Decisions in play*; spec *Foundation entries* | Slice 6 |

## The passages your *Read* names, word for word

#### `task-frozen.md:31-33` To do 7

7. Skill wdrożenia `loop2-deploy` (`.claude/skills/loop2-deploy/` i jego kopia w `.agents/skills/loop2-deploy/`) mówi, gdzie leżą kopie, gdzie leżą nowe klucze, jak zmienić klucz szyfrujący, jak zainstalować skrypt i harmonogram, co agent wolno czytać o kopiach, jak odtworzyć bazę (liczba kroków, kto je robi, co odtworzenie cofa), także gdy serwera już nie ma, i jak czytać wynik kopii (WAY-139).
   - O kluczu do Strychu skill mówi, że żadne źródło nie podaje, czy da się go wymienić (pytanie 9).
   - Zdania, które przestają być prawdą, zmieniają się w tej samej zmianie: `references/setup_and_secrets.md:299`–`300` oraz `references/troubleshooting.md:101`–`102` i `:128`–`129`.

#### `task-frozen.md:137-138` Context, what a restore undoes

- Odtworzenie cofa stan do chwili kopii: przeglądarka z otwartą grą ma numer zapisu wyższy niż serwer, więc jej zapis dostaje odmowę i wczytuje zapis z kopii ze zdaniem „Gra została zapisana w innej przeglądarce. Wczytano ten zapis.” (D-209).
- Blokady kont, hasła i wylogowania z czasu po kopii znikają razem z nią.

#### `task-frozen.md:157-161` Human actions

- H1. Aktywacja Strychu w panelu Mikrusa, kopia klucza `/backup_key` w prywatnej notatce (pytanie 9) i próba: mały plik z serwera gry na `strych.mikr.us` i pobranie go na inne urządzenie tą kopią klucza; wynik w pytaniach 2 i 9 — before the cycle, done
- H4. Próbna wiadomość: człowiek uruchamia na serwerze `echo test | pusher test_kopii` i sprawdza, że wiadomość doszła i na jaki adres; wynik w pytaniu 5 — before the cycle, done
- H5. Wdrożenie kodu gałęzi przed scaleniem: człowiek uruchamia na serwerze zainstalowany skrypt wdrożenia `loop2-deploy` z numerem ostatniego commitu gałęzi (D-15), a gdy gałąź zmienia `deploy/loop2-deploy`, najpierw instaluje na nowo jego kopię (D-16), bo polecenie kopii trafia na serwer dopiero z kodem tego zadania, a H2 i H3 go potrzebują; od tego wdrożenia do scalenia zadania 17 trwa okno z pytania 10 — in the cycle, przed H2 i H3
- H2. Instalacja na serwerze tego, czego wdrożenie samo nie robi: skrypt kopii, harmonogram, dostęp skryptu do Strychu i klucz szyfrujący z kopią w prywatnej notatce — in the cycle
- H3. Próba odtworzenia z pytania 6 na kopii zrobionej przez kod cyklu, przed scaleniem — in the cycle

#### `task-frozen.md:201-202` Settlements to record, rows 6 and 7

| 6 | Klucz szyfrujący jest sekretem serwera: leży poza checkoutem, ma kopię w prywatnej notatce, a zmienia go człowiek; zmienia D-13, wpis o tym, gdzie leżą sekrety serwera. | decision | pytanie 4 (A; Mariusz, 2026-10-30, pozycja D11 pakietu rundy: „Klucz ma kopię w Twojej prywatnej notatce”), *Not chosen* tam; propozycja refinera: „leży poza checkoutem”, „zmienia go człowiek” i zmiana D-13, wszystko za D-13: “human rotation replaces the file and private copy”, przyjęta z wierszem (pozycja 17-K4 pakietu rundy; Mariusz, 2026-10-30, „wiersze przyjmuję”) | Czy klucz szyfrujący wchodzi do D-13 i kto go wymienia. |
| 7 | Klucz do Strychu `/backup_key` ma kopię w prywatnej notatce; zmienia D-13, wpis o tym, gdzie leżą sekrety serwera. | decision | pytanie 9 (A; Mariusz, 2026-10-30, pozycja 17-Q9 pakietu rundy), *Not chosen* tam. O wymianie tego klucza wiersz nie mówi, bo żadne źródło nie podaje, czy da się go wymienić. | Czym sięgnąć po kopie po utracie serwera gry. |

#### `spec.md:6-11` Intent

## Intent

The account database exists in one place. This change makes a completed, consistent copy of it leave the game server every night, encrypted, for Mikrus Strych, keeps seven such copies there, tells the owner when a night's copy fails, proves once that a copy can be restored without the old server, and makes every Node.js release that reaches the server pass a check of the database's read, write and backup operations first.

The change only prepares. A human installs the script and the schedule, and from then on the schedule a human installed is what replaces a seven-day-old copy on Strych. The change holds no deletion command, restores nothing over the server's database and changes no key: a restore and a key change stay a human's documented steps.

#### `spec.md:47-50` Decisions, the two words

## Decisions

Two words used below. A **weekday file** is one of seven fixed file names on Strych, one per day of the week, so a night's copy replaces the copy made seven days earlier. The **backup script** is the host script `deploy/loop2-backup`, installed as `/usr/local/bin/loop2-backup`.

#### `spec.md:72-87` 2. The operator command

### 2. The operator command (settlement 3; carried row 3)

`src/server/account-backup.ts`, run as `node dist/server/account-backup.js` in the `loop2` container, follows the pattern of `account-block.ts`: it opens the existing file of `LOOP2_DATABASE_PATH` with `AccountDatabase`, never creating one.

It needs exactly one fixed word, `--to-standard-output`. Without that word, or with anything else, it refuses with the usage exit code and prints nothing to standard output, before it opens the database. So the bare command, the likeliest slip, shows no player's data on any screen.

Given the word, it backs up into a private temporary directory in the container's own `/tmp`, closes the database, writes the finished file to standard output and removes the directory, also after a failure. Standard output carries the copy's bytes and nothing else; messages go to standard error and hold no database error, path of a player's data or address.

Exit 0 means the whole file was written. Every other exit means the output is not a copy: distinct codes for a database failure, wrong arguments and no database file, as in `account-block.ts`.

There is no refusal for a terminal. Inside the container the command sees a terminal only under `docker exec -t`, so such a check would stop only a person who typed both `-t` and the word, who has already asked for the output. The script never uses `-t`. The skill warns that the word sends every address and password hash to wherever standard output points.

`AccountDatabase` gains one method that makes the backup at a given path; no SQL and no `node:sqlite` import stand outside `database.ts`.

Only a human or the installed backup script runs the command; the skill forbids it to agents.

#### `spec.md:97-114` 4. Encryption

### 4. Encryption (carried row 4; settlements 4, 5, 6)

`age`, in the backup script's pipe on the host, with an identity file used as a symmetric key: encrypting and decrypting with the same one secret file. The age manual documents this use.

- The key is `/etc/loop2/backup-encryption-key`, owner root, group root, mode 0400, made by `age-keygen` in H2, with a copy in the private note. It stays outside the checkout, in no Compose secret and in no container.
- `age` exits 0 only for a whole input, and its files cannot be altered without the decryption failing, which matters on a shared server. The server, Ubuntu 22.04, does not have it installed, and its `apt` offers the candidate `1.0.0-1ubuntu0.1` (read 2026-10-30), a package that holds `age-keygen` too; the owner's Windows computer has it through `winget`.

Ways weighed:

| Way | Why it lost |
|---|---|
| `age` key pair, public half on the server, private half only in the note | Stronger against a thief of the server, who however reads the live database anyway. Settlement 6 says the key is a secret lying on the server, with a copy; this way has no such secret, and the note would hold the only copy. |
| `gpg --symmetric` with a passphrase file | Needs no install on the owner's computer (Git for Windows has it), but it wants several flags to run without a person, keeps a home directory and may start a background agent on a host with no swap. |
| `openssl enc` | Probably installed, but it authenticates nothing: a changed file decrypts to rubbish without an error. |
| Node's `crypto` inside the command | No install at all and no plain bytes leave the container, but it is our own file format and it brings the key into the game container. |

Cost if wrong: one more package on two machines, in exchange for two short commands. Losing the key loses every copy, as question 4 accepted.

#### `spec.md:115-123` 5. Compression, capacity

### 5. Compression, capacity (carried row 5; the first added question)

No compression. A copy on Strych is the database file plus `age`'s small overhead.

- Why: To do 2 needs seven copies in 200 MB, and the database measures 114.8 kB today. Uncompressed, the bound of the task's *Context* stands as it is: accounts times copies of about 3000 at the full limit of 64 KiB. Compression is one more pipe stage and one more restore step for room nothing needs yet, and it gives no guarantee, since it depends on content. It can be added later without touching the keys or the weekday files.
- Rejected: `gzip` in the pipe — cheap and worth doing the day a copy nears the limit, not before. `zstd` — one more package.
- The capacity sentence: in H3 the owner takes S, the size in bytes of the encrypted file he fetched from Strych, and writes the sum 7 × S ≤ 200 000 000 into the request's record. Bytes of that file, not of the database, and 200 MB taken in decimal as the smaller reading. If it fails, the cycle stops at the blocked request and returns to question 2.
- What the sum alone misses: `rsync` writes the new file beside the old one before replacing it, so eight copies stand on Strych for the length of a transfer. A night whose eighth copy does not fit fails cleanly: the old file stays and `pusher` fires. The real limit per copy is therefore 25 MB, about 385 accounts at the full limit against the 440 of question 1. The skill states this number, and the log records each night's size.

#### `spec.md:124-132` 6. Sending, access and the host key

### 6. Sending, access and the host key (carried rows 5 and 6)

`rsync` over `ssh`, as H1 proved, into the home directory on `strych.mikr.us`, whole-file, with a bounded connection and input timeout, keeping the file's time. `rsnappush` is rejected: it is not installed, deletes nothing, and its saving does not apply to a file that changes daily.

- **Login.** The constants block of `deploy/loop2-backup` names only the host `strych.mikr.us`. Root's `~/.ssh/config` entry for that host, the form Strych's documentation gives, supplies the login and `IdentityFile /backup_key`. Root's file holds no such entry today (read 2026-10-30), so H2.3 writes it, with the login from the private note. This keeps the login out of the repository (D-13).
- **Host key.** The script forces batch mode and strict host-key checking against the file `/etc/loop2/strych-known-hosts`. H2 fills that file from `ssh-keyscan`, keeping the line whose fingerprint equals the one the human compared in H1, `SHA256:3WieS14O9NRnaiL5imCQfMugcVExGOoPqZEMhUD/LZk`, which is no secret. A changed host key then fails the send and fires `pusher`.
- Rejected: `accept-new` — trusts whatever answers first on a shared server's name. Disabling the check — sends past any impostor. Root's default `known_hosts` — it holds lines for the host from H1 (read 2026-10-30), but what stands there is what H1 happened to answer, while the design's own file holds only the line compared with the fingerprint.
- Cost if wrong: a legitimate key change at Mikrus stops the copies with a message each night, until a human repeats the check.

#### `spec.md:133-155` 7. How older copies go

### 7. How older copies go (carried row 7; the trust boundary)

Seven weekday files `loop2-accounts-<1..7>.sqlite.age`, the number being the day of the week by the UTC date of the run. Each night replaces that day's file. Nothing is deleted by a command and Strych's listing is never read, so the shared server supplies no name to act on.

`rsync`'s default writes a temporary file beside the target and moves it into place when complete, and removes a partial file when interrupted, so a failed send leaves the seven-day-old copy standing.

Ways weighed:

| Way | Why it lost |
|---|---|
| Dated names, then delete what a remote listing shows as old | Takes names from a shared server's answer into a deleting command. Deletion on Strych is undocumented and H1 did not try it. |
| `rsync --delete` with a name filter | The same power, and it needs seven copies kept on the game server or a trick of empty files. |
| Dated names, deleting the one name computed as seven days old | No listing, but deletion is still untried, and one missed night strands a file for good. |
| Writing over the file in place | No eighth copy, but a failed send destroys that copy and leaves a broken file with the newest date. |

Consequences:

- A failed night keeps the older copy in its weekday file, so seven copies still stand. One of them is then 14 days old, which costs nothing.
- "Which is the newest" is answered by the file's time, or by the log on the server while one exists.
- A hand run during the day replaces that day's file; the copy is simply fresher.
- **Reading of settlement 10.** Its "usuwanie starych kopii" has no separate step in this design: the send also replaces the oldest copy, so a failed replacement is a failed send, and that failure calls `pusher`. The row's meaning stands, that no failed step stays silent. The wording is the writer's, and it names no step that does not exist (see *Foundation entries*).
- **Untried fact.** Overwriting a file on Strych has not been tried, since H1 sent one file. H2 tries it with a second run. If Strych refuses, retention has no way left and the cycle returns to question 2, as the refinement's note on deletion already foresees.

#### `spec.md:156-176` 8. Hour, deployment, log, notice

### 8. Hour, deployment, log, notice (carried rows 8 and 9; settlements 8, 9, 10)

**Hour.** 03:17 by the server's clock, daily, as root. The server's clock read CET, +0100, on 2026-10-30, so that is night. The minute avoids the round hours other users of a shared server pick. If the server's zone follows summer time, the hour is neither skipped nor repeated at Poland's clock changes (cron's manual: a job in a skipped hour runs soon after, a job in a repeated hour does not run twice).

**A deployment at that hour.** The script takes the deployment's own lock, `/run/loop2-deploy.lock`, with the deployment's own wait of 900 seconds, for the container and encryption step only, and releases it before sending. That file is root-owned with mode 640 (read 2026-10-30), so a backup run by root opens it. The two never overlap: a deployment waits out a backup's seconds, and a backup waits out a deployment. A backup that outwaits 900 seconds is a failed night with a message, and the next night repairs it. Rejected: no lock — a replaced container fails the copy, a false alarm for a normal event.

**The script's steps**, each bounded in time so a hung tool cannot end in silence, each result logged:

1. Check that the encryption key can be read.
2. Take the lock.
3. Stream the command's output, asked for by its fixed word, through `age` into one file in a private temporary directory on the host. Only a ciphertext ever rests there, and the directory is removed at the end. The host's temporary filesystem has about 19 GB free (read 2026-10-30).
4. Release the lock.
5. Only if every stage of the pipe exited 0 and the file is not empty, log the weekday file and the ciphertext's size, on every attempt, before anything is sent.
6. Send.

**The log** is `/var/log/loop2-backup.log`: each attempt's start and its end, the weekday file and size of each ciphertext made, and the stage and exit code of a failure, so a night that fails at the send holds its size beside the exit code. The error text of `docker`, `age` and `flock` goes to this file alone, as in `deploy/loop2-deploy`. It holds no player data and no access value. It answers carried row 9: a cron that did not start writes nothing, which the skill says plainly.

**The send's error text reaches no file.** For the send step the log holds the stage and `rsync`'s exit code, and the script discards the error text of `ssh` and `rsync` in every run. A refused login prints the login, which is an access value (D-13), and an agent may read this log. A human who needs the reason makes a hand run of the send, in a private terminal: `rsync` of a small file with the script's options, as the skill gives it. The text stays on that screen, and an agent never makes this run. A passing hand run proves access only: a small file fits where the eighth copy does not, so a failed send with a passing hand run and a logged size near 25 MB means Strych has no room for the eighth copy.

**The notice.** One handler at the script's exit: any non-zero end, from any cause, calls `pusher` once with a fixed subject and fixed text saying only that the copy failed. No tool's output is piped into it, and no step's name (settlement 9). A failing `pusher` is logged.

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

#### `spec.md:196-201` 10. Comparing the installed copies

### 10. Comparing the installed copies (carried row 10)

Yes. `compare_installed_script` in `deploy/loop2-deploy` compares three pairs instead of one: the deploy script, the backup script and the schedule, each with its source at the deployed commit. It only warns, in the same words of kind, so the warning reaches the Actions log.

This is what makes the accepted drift of question 3 visible. It costs one reinstall of `loop2-deploy` in H5. Warnings are expected between H5 and H2 and after a rollback to a commit from before this change; the skill says so, and decision 13 says what else that rollback does. Rejected: no comparison — the drift D-10 rejected for the tunnel would stay invisible.

#### `spec.md:202-224` 11. What is installed, from where, in what order

### 11. What is installed, from where, in what order (the second added question)

All sources come from the exact branch head, by the skill's existing procedure: `git show <sha>:<path>` into a temporary file, `bash -n` where it is a script, then `install`.

| Step | Who and where | What | Source | What shows it worked |
|---|---|---|---|---|
| H5.1 | human, server | Reinstall `/usr/local/bin/loop2-deploy`, root 0755 | `deploy/loop2-deploy` at the head | `cmp` |
| H5.2 | human, server | `loop2-deploy <head>` with `SSH_ORIGINAL_COMMAND` unset | the head | log ends with `deployed`; the build output shows the check's release; warnings about the two absent copies are expected. The no-merge window opens here |
| H2.1 | human, server | `apt install age` | the server's `apt`, candidate `1.0.0-1ubuntu0.1` | `age --version` |
| H2.2 | human, server | `age-keygen` into `/etc/loop2/backup-encryption-key`, root:root 0400; copy into the private note | — | `stat` |
| H2.3 | human, server | Write root's `~/.ssh/config` entry for Strych's host, which is absent today; fill `/etc/loop2/strych-known-hosts`, root 0644 | the host from the constants block of `deploy/loop2-backup`; the login from the private note; the fingerprint in decision 6 | `ssh-keygen -lf` shows that fingerprint |
| H2.4 | human, server | Install `/usr/local/bin/loop2-backup`, root 0755 | `deploy/loop2-backup` at the head | `cmp` |
| H2.4a | human, browser | In the test account on the public game, give a character or a program a name to recognise, wait for the automatic save, then reload the page. This comes before every run whose copy H3 may use, and the name is written down for H3 | — | the name is back after the reload, which shows the save finished |
| H2.5 | human, server | Run it by hand, then again | the installed copy | log shows success twice with the same weekday file. The second run is the overwrite trial of decision 7 |
| H2.6 | human, server | One deliberate failure: move the key file aside, run, move it back | the installed copy | the message arrives, the log shows the stage, the weekday file on Strych is unchanged |
| H2.7 | human, server | Install `/etc/cron.d/loop2-backup`, root 0644 | `deploy/loop2-backup.cron` at the head; the installed name has no dot, as cron requires | see below |
| H2.8 | human, server | Next morning, read the log for a run at 03:17 | — | the only proof that the host's cron runs this file |
| H3 | owner, his computer | Decision 12 | the same commit | PASS and the capacity sum |

H2.8 costs the one night question 10 named as the human's wish. This spec recommends it: the cron service is active and `/etc/cron.d` exists (read 2026-10-30), but whether a file there really starts stays H2.8's to show, and a schedule that never starts is exactly the silence settlement 8 accepts. It stays the human's choice; left out, it is reported as unchecked, never as passed.

If the request is abandoned after H2, the human removes `/etc/cron.d/loop2-backup`, or a message comes every night. Rolling back needs no data step, as no schema changes.

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

#### `spec.md:248-267` 13. The skill

### 13. The skill (To do 7)

A new reference, `references/backup_and_restore.md`, in both copies of the skill, byte-identical, with `SKILL.md`'s resource table and agent lists updated and its description naming backups. No file of the skill names a Mikrus host or address, web pages included: `tests/agent_workflow/test_loop2_deploy_skill.py` keeps its pattern and only gains the new file in its list. Where the skill needs Strych's host, it points to the constants block of `deploy/loop2-backup`, which the repository still answers on the day the server is gone. Mikrus's pages are named in words.

The reference holds:

- Where copies lie, and where each new key and file lies.
- The steps of decision 11, as the procedure for installing and reinstalling.
- Changing the encryption key: a new key, the old one kept in the note until all seven weekday files have been replaced since the change, because older copies still need it. Seven nights are not enough where a night failed: the log shows which files were replaced.
- That no source says whether the Strych key can be replaced.
- How to read the log and what each failed stage means, including the 25 MB limit per copy, and that a cron that did not start writes nothing.
- The hand run of the send of decision 8, for the reason of a failed send, with a warning that its text may show the login and stays out of notes, requests and logs, and with the sentence that a passing hand run proves access only, so a failed send with a passing hand run and a logged size near 25 MB means Strych has no room for the eighth copy.
- That the command's fixed word sends every address and password hash to standard output, so it is used only as the script uses it.
- That after a rollback to a commit from before this change the nightly run fails and a message comes each night. That is a true alarm, as no copy is made until a commit with the command is deployed again.
- What an agent may read: a bounded tail of the log, `stat` of the two new files, and `cmp` of the installed copies. What it may not do: read key contents, run the backup script or the command, make the hand run of the send, fetch or open a copy, or list Strych with the owner's key.
- Restoring: on the owner's computer as in decision 12, and over the server's database as a counted human procedure. Stop `app`; replace the file in the volume with owner uid 1000 and remove the `-wal` and `-shm` beside it; start by deploying the running commit; check. With no server: provision first, then the same.
- What a restore undoes: everything after the copy, including accounts, saves, blocks, password changes and logouts. An open browser then gets the sentence of D-209. A copy newer than the running code's schema is refused until a commit that knows it is deployed. The server procedure has never been tried.

The sentences at `references/setup_and_secrets.md:299`–`300` and `references/troubleshooting.md:101`–`102` and `:128`–`129` change in the same change. `SKILL.md` and `troubleshooting.md` also read exit 7 with the check's failure, and D-15 stays true: a restore is a separate path, not a rollback.
