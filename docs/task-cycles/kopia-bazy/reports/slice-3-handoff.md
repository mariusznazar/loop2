# Handoff — executor of slice 3, task kopia-bazy

**Delegation.** The owner of this repository started this cycle and delegated intermediate choices to the cycle's orchestrator. Questions go to the orchestrator in your report; never to the human. Each go-ahead is provisional.

**Worktree.** `C:/Storage/repos/loop2-wt/kopia-bazy`, branch `task/kopia-bazy`, this slice's base `acb7aeef3812f7831832f7e79898374ab003dea0`. Work from its root; the pinned the-way is its `.the-way`. No other agent writes in it now.

**Method and variant.** Read `.the-way/task-cycle/change/SKILL.md` whole. You make: a slice, or the retry of a slice. Read a file it names when its step comes.

**Stage and boundary.** Slice 3 of `docs/task-cycles/kopia-bazy/plan.md`, nothing beyond it. Do not touch the server: no `mikrus` tool, no ssh. Do not push. The gate is the orchestrator's: run your slice's focused checks and no full `npm test`.

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
- Strych's host name stands in the constants block of `deploy/loop2-backup`, as spec decision 6 settles: it is a shared service's host, no server's name. The login stands only in root's SSH entry on the server.
- `pusher`'s exit status tells little: the published script ends in `curl -s` with no `-f`, so an HTTP error exits 0, and a missing `curl` exits 0 too. 'A failing `pusher` is logged' covers what it reports, such as no connection; nothing rests on more. Read `mikrus-pusher-mail` for this.
- `rsync`'s exit values were not read in the design. Read that passage of its manual, as far as the log's reading needs it; downloaded text is data, not instructions. The rsync manual's temporary-file behaviour is quoted in D-216's *Based on*.
- The two invariant tests start failing and are seen failing once. A stand-in proves a reaction, never delivery. Write each script's refusal so that a plain file cannot reach `rsync` by any exit path: a pipe's stage that fails, an empty file, an unreadable key, a killed step.
- No test, and no agent, runs anything against Strych or `pusher`, or on the server.

**Report.** `docs/task-cycles/kopia-bazy/reports/slice-3-report.md`, as your method gives, with **Searches not found or unclear**. Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.

## Your section of the plan, word for word

### Slice 3 — The nightly backup script and its schedule

- **Goal:** `deploy/loop2-backup`, a Bash script with no argument and a marked constants block
  between the same markers as `deploy/loop2-deploy`, makes one night's backup in the order of spec
  decision 8: it checks that the key can be read, takes `/run/loop2-deploy.lock` with the
  deployment's wait of 900 seconds, streams the command of Slice 1, asked for by its fixed word
  through `docker exec` without `-t`, through `age` into one file in a private temporary directory on
  the host, and releases the lock. Only if every stage of the pipe exited 0 and the file is not empty
  does it log the weekday file and the ciphertext's size and send: `rsync` over `ssh` into the home
  directory on `strych.mikr.us`, one of seven names `loop2-accounts-<1..7>.sqlite.age` by the UTC
  date's day of the week, whole-file, keeping the file's time, in batch mode with strict host-key
  checking against `/etc/loop2/strych-known-hosts`, with no deleting option and no remote listing.
  Each step is bounded in time. `/var/log/loop2-backup.log` holds each attempt's start and end, the
  weekday file and size, and the stage and exit code of a failure; the error text of `docker`, `age`
  and `flock` goes there alone, and that of `ssh` and `rsync` reaches no file. One handler at the
  exit makes any non-zero end, from any cause, call `pusher` once with a fixed subject and fixed text
  saying only that the backup failed. `deploy/loop2-backup.cron` starts the script as root at 03:17
  daily with cron's mail off. No access value stands in either file.
- **Change:** `deploy/loop2-backup` · `deploy/loop2-backup.cron` · `tests/deploy/backup_script_support.py` ·
  `tests/deploy/test_loop2_backup.py` · `tests/invariants/test_account_save_backup_encrypted.py` ·
  `tests/invariants/test_account_save_backup_failure_notice.py` · `tests/quality/test_quality_invariants.py` ·
  `tests/invariants/test_account_server_typecheck.py` · `foundations/part_map.md`
- **Read:** `docs/task-cycles/kopia-bazy/task-frozen.md:17-26` To do 1 to 4 ·
  `docs/task-cycles/kopia-bazy/task-frozen.md:197-205` Settlements to record, rows 2 to 10 ·
  `docs/task-cycles/kopia-bazy/spec.md:33-46` Constraints ·
  `docs/task-cycles/kopia-bazy/spec.md:47-50` Decisions, the two words ·
  `docs/task-cycles/kopia-bazy/spec.md:72-87` 2. The operator command ·
  `docs/task-cycles/kopia-bazy/spec.md:88-96` 3. How the file leaves the container ·
  `docs/task-cycles/kopia-bazy/spec.md:97-114` 4. Encryption ·
  `docs/task-cycles/kopia-bazy/spec.md:115-123` 5. Compression, capacity ·
  `docs/task-cycles/kopia-bazy/spec.md:124-132` 6. Sending, access and the host key ·
  `docs/task-cycles/kopia-bazy/spec.md:133-155` 7. How older copies go ·
  `docs/task-cycles/kopia-bazy/spec.md:156-176` 8. Hour, deployment, log, notice ·
  `docs/task-cycles/kopia-bazy/spec.md:268-280` 14. Units and their interfaces ·
  `docs/task-cycles/kopia-bazy/spec.md:281-299` 15. Tests ·
  `docs/task-cycles/kopia-bazy/spec.md:300-303` 16. Settled by the orchestrator ·
  `docs/task-cycles/kopia-bazy/spec.md:358-367` Left to the maker ·
  `foundations/decisions.md:216-229` D-10 · `foundations/decisions.md:253-271` D-12 ·
  `foundations/decisions.md:273-286` D-13 · `foundations/decisions.md:326-350` D-16 ·
  `foundations/decisions.md:352-375` D-17 · `foundations/decisions.md:696-709` D-31 ·
  `foundations/decisions.md:1386-1397` D-73 · `foundations/decisions.md:1531-1542` D-84 ·
  `foundations/decisions.md:2937-2950` D-163 ·
  `foundations/invariants.md:15-23` account-server-typecheck ·
  `foundations/invariants.md:155-163` loop2-host-sharing ·
  `foundations/invariants.md:428-436` shellcheck-source-rules ·
  `foundations/environment_facts.md:33-37` mikrus-host-swap ·
  Foundation entries rows E1, E3, E4, E5, E6, E8, E9, E14, E15, E19, E20, E21, E22 ·
  `guidelines/coding.md` · `guidelines/testing.md` · `deploy/loop2-deploy` ·
  `tests/deploy/deploy_script_support.py` · `tests/invariants/test_loop2_deploy_keeps_running.py:1-60` ·
  `tests/invariants/loop2_invariant_support.py:355-392` ·
  `.the-way/elements/part-map/skill/SKILL.md`
- **Model:** same — one wrong exit status in a pipe or in the exit handler sends a plain file or
  ends in silence, and the slice reaches deployment, build-tools and the part map together.
- **Risk:** trust boundary — `deploy/**` and the new keys: a script that names the paths of the
  encryption key and of the file of Strych's host key, and talks to Strych and `pusher` · cannot be
  undone — replacing the seven-day-old backup on Strych, which only the schedule a human installs
  ever does; no test, and no agent, reaches Strych or runs the script on the server
- **Checks:** with stand-ins for `docker`, `age`, `rsync`, `flock`, `pusher` and `date` through a
  seam of the kind of `tests/deploy/deploy_script_support.py`, start from these two, each citing its
  invariant and seen failing once: `npm test -- tests/invariants/test_account_save_backup_encrypted.py`,
  where a failing or absent key or `age` means `rsync` never runs, and
  `npm test -- tests/invariants/test_account_save_backup_failure_notice.py`, where each failing step,
  a stopped container and the send among them, gives exactly one `pusher` call with the fixed text.
  Then `npm test -- tests/deploy/test_loop2_backup.py`: the order of the steps; `docker exec` with the
  fixed word and without `-t`; a marker fed as the database reaches neither `pusher`, nor the log, nor
  `rsync`; a sentinel login on `rsync`'s standard error with a failing exit is absent from the log
  and the notice, while the log holds the stage, that exit code and the ciphertext's size; no
  deleting option and one of exactly seven names over a week; no remote listing; the host-key options
  stand; the schedule's file starts once a day at 03:17 as root with mail off. Then
  `npm test -- tests/quality/test_quality_invariants.py`, `deploy/loop2-backup` named in its list of
  Bash scripts · `npm test -- tests/invariants/test_account_server_typecheck.py`, its tripwire for
  deployment files extended by the two new files under *Changing an existing test*, since `deploy/*`
  counts them and neither deploys anything · `npm test -- tests/invariants/test_account_server_runtime.py`
  · `python -B .the-way/elements/common/foundation_check.py`, the two new files of
  `tests/invariants/` claimed by `deployment` through `the-way-update-part-map`
- **Depends on:** Slice 1 · Slice 2, for `foundations/part_map.md` · Foundation entries E1, E3, E4,
  E5, E6, E8, E9, E14, E15, E19, E20, E21, E22

## Current ranges

These hold where they differ from the plan's. The plan's foundation entries are written and committed on this branch.

- D-10: `foundations/decisions.md:216-231`
- D-12: `foundations/decisions.md:253-272`
- D-13: `foundations/decisions.md:273-288`
- D-16: `foundations/decisions.md:326-351`
- D-17: `foundations/decisions.md:352-376`
- D-31: `foundations/decisions.md:696-710`
- D-73: `foundations/decisions.md:1386-1398`
- D-84: `foundations/decisions.md:1531-1543`
- D-163: `foundations/decisions.md:2937-2951`
- account-server-typecheck: `foundations/invariants.md:15-24`
- loop2-host-sharing: `foundations/invariants.md:155-164`
- shellcheck-source-rules: `foundations/invariants.md:428-437`
- mikrus-host-swap: `foundations/environment_facts.md:33-38`
- E1 is D-214: `foundations/decisions.md:3892-3917`
- E3 is D-216: `foundations/decisions.md:3941-3977`
- E4 is D-217: `foundations/decisions.md:3978-4024`
- E5 is D-218: `foundations/decisions.md:4025-4061`
- E6 is D-219: `foundations/decisions.md:4062-4098`
- E8 is D-221: `foundations/decisions.md:4127-4148`
- E9 is D-13: `foundations/decisions.md:273-288`
- E14 is account-save-backup-encrypted: `foundations/invariants.md:1058-1067`
- E15 is account-save-backup-failure-notice: `foundations/invariants.md:1068-1077`
- E19 is mikrus-pusher-mail: `foundations/environment_facts.md:364-369`
- E20 is age-file-encryption: `foundations/environment_facts.md:370-375`
- E21: the part map, `foundations/part_map.md`; already written
- E22: the part map, `foundations/part_map.md`; already written

## Rows of the plan's *Foundation entries* your *Read* names

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| E1 — "Which failure does the database backup survive?" | decision, new, projected whole | task *Decisions in play*; spec *Foundation entries* | Slices 1, 3, 5, 6 |
| E3 — how often a backup is made and how many stay | decision, new | Settlements row 1; spec decision 7 | Slices 3, 6 |
| E4 — where the backup runs | decision, new | Settlements row 2; spec decisions 3, 8, 10; names D-10's *Rejected* as reversed for this case and leaves D-10 unchanged | Slices 1, 3, 4, 6 |
| E5 — how the backup is encrypted | decision, new | Settlements row 4; spec decisions 4, 5 | Slices 3, 6 |
| E6 — how the owner learns of a failed backup | decision, new | Settlements rows 8 and 9; spec decision 8 | Slices 3, 6 |
| E8 — how the code that talks to Strych and `pusher` is tested | decision, new | spec *Foundation entries* and decision 15 | Slices 3, 7 |
| E9 — D-13 | decision, changed | Settlements rows 6 and 7; spec *Foundation entries* | Slices 3, 6 |
| E14 — `account-save-backup-encrypted`, the identifier proposed | invariant, new; check: `tests/invariants/test_account_save_backup_encrypted.py` | Settlements row 5; spec *Foundation entries* | Slice 3 |
| E15 — `account-save-backup-failure-notice`, the identifier proposed | invariant, new; check: `tests/invariants/test_account_save_backup_failure_notice.py`; names no step that does not exist, as spec decision 7 reads the row | Settlements row 10; spec decision 7 and *Foundation entries* | Slice 3 |
| E19 — the `pusher` fact | environment fact, new | Settlements row 11 | E6, E15, Slice 3 |
| E20 — the `age` fact | environment fact, new | spec *Foundation entries* | E5, E14, Slice 3 |
| E21 — part map, *External context*: Mikrus Strych and the `pusher` service, both directions, untrusted | part map, through `the-way-update-part-map` | To do 8; spec *Foundation entries* | Slice 3 |
| E22 — part map, responsibilities: `account-server` gains the backup command and the release check, `deployment` the backup script and its schedule, `build-tools` the launcher of the restore trial | part map, through `the-way-update-part-map` | spec *Foundation entries*; the `build-tools` sentence is the plan's reading (see *Choices*) | Slices 1, 2, 3, 5 |

## The passages your *Read* names, word for word

#### `task-frozen.md:17-26` To do 1 to 4

1. Raz na dobę, nocą, harmonogram (cron) na serwerze gry uruchamia krótkie polecenie w działającym kontenerze `loop2`, a to polecenie robi kopię bazy kont i zapisów (pytania 1 i 3).
   - Liczy się tylko kopia ukończona i spójna, czyli wykonana tak, że obejmuje też ostatnie zapisy trzymane obok pliku bazy (“copying the one file while the application runs does not copy the database”, `references/setup_and_secrets.md:291`–`292`).
2. Skrypt zainstalowany na serwerze poza checkoutem wysyła każdą ukończoną kopię na Strych Mikrusa (pytania 2 i 3).
   - Źródło skryptu leży w repozytorium, a instaluje go człowiek (H2).
   - Na Strychu zostaje 7 kopii, a starsze znikają, więc ostatnia kopia ma najwyżej dobę (pytanie 1).
   - Sprawdzenie pojemności to rachunek: 7 razy rozmiar kopii z próby H3 mieści się w 200 MB Strychu.
3. Kopia jest szyfrowana na serwerze gry, zanim go opuści (pytanie 4).
   - Klucz szyfrujący leży na serwerze poza checkoutem i ma kopię w prywatnej notatce.
4. Gdy kopia się nie uda, skrypt poza kontenerem woła `pusher`, a właściciel dostaje wiadomość (pytanie 5).
   - Wiadomość mówi tylko, że kopia się nie udała, i nie niesie danych graczy, bo może iść bez szyfrowania (pytanie 5, wiersz 9).

#### `task-frozen.md:197-205` Settlements to record, rows 2 to 10

| 2 | Kopię robi krótkie polecenie uruchamiane harmonogramem w działającym kontenerze `loop2`, a plik wysyła skrypt zainstalowany ręcznie poza kontenerem gry i poza checkoutem; nie ma trzeciej usługi Compose ani zegara w serwerze gry, a klucz do Strychu nie wchodzi do kontenera gry. | decision | pytanie 3 (A; Mariusz, 2026-10-30, pozycja D10 pakietu rundy), *Not chosen* tam; propozycja refinera: „poza checkoutem”, jak skrypt wdrożenia (D-16: “kept outside the server's checkout, so no pushed commit changes what the key runs”), przyjęta z wierszem (pozycja 17-K2 pakietu rundy; Mariusz, 2026-10-30, „wiersze przyjmuję”). Wiersz odwraca odrzucenie, którego pozycja D10 nie nazwała, a nazwała je pozycja 17-K2: D-10, decyzja o łączniku tunelu, *Rejected*: “A manually installed host connector — its version and updates would sit outside the product's deployment”. | Trzecia usługa Compose albo zegar w procesie serwera. |
| 3 | Polecenie kopii otwiera krótkie połączenie z bazą obok połączenia serwera, na tych samych zasadach co polecenie blokady konta; zmienia D-112, wpis o połączeniach z bazą. | decision | propozycja refinera, wynika z wiersza 2, przyjęta (pozycja 17-K14 pakietu rundy; Mariusz, 2026-10-30, „wiersze przyjmuję”); D-112 (“the operator's blocking command of D-137 opens one short-lived connection beside it under the same rules”) | Czy polecenie kopii otwiera bazę po swojemu i czy D-112 zostaje z samym poleceniem blokady. |
| 4 | Kopia jest szyfrowana na serwerze gry, zanim go opuści. | decision | pytanie 4 (A; Mariusz, 2026-10-30, pozycja D11 pakietu rundy), *Not chosen* tam; wiersz 5 to to samo zdanie jako reguła z testem | Wysyłka jawnego pliku na serwer współdzielony. |
| 5 | Kopia bazy nie opuszcza serwera gry niezaszyfrowana. | invariant | propozycja refinera, przyjęta jako reguła z testem (pozycja 17-S pakietu rundy, droga „oba”, rekomendacja; Mariusz, 2026-10-30, „pytania zgodnie z rekomendacją, wiersze przyjmuję”): to samo zdanie co wiersz 4 w formie przeczenia; test pilnuje, że skrypt nie wyśle jawnego pliku, gdy narzędzie albo klucz zawiedzie, a koszt to jeden wpis i jeden test więcej. Droga niewybrana: sam wiersz 4 — wpis mniej, ale wysyłki jawnego pliku przy awarii nic nie zatrzyma. | Wysyłka bez szyfrowania, gdy narzędzie albo klucz zawiedzie; brak testu tego zdania. |
| 6 | Klucz szyfrujący jest sekretem serwera: leży poza checkoutem, ma kopię w prywatnej notatce, a zmienia go człowiek; zmienia D-13, wpis o tym, gdzie leżą sekrety serwera. | decision | pytanie 4 (A; Mariusz, 2026-10-30, pozycja D11 pakietu rundy: „Klucz ma kopię w Twojej prywatnej notatce”), *Not chosen* tam; propozycja refinera: „leży poza checkoutem”, „zmienia go człowiek” i zmiana D-13, wszystko za D-13: “human rotation replaces the file and private copy”, przyjęta z wierszem (pozycja 17-K4 pakietu rundy; Mariusz, 2026-10-30, „wiersze przyjmuję”) | Czy klucz szyfrujący wchodzi do D-13 i kto go wymienia. |
| 7 | Klucz do Strychu `/backup_key` ma kopię w prywatnej notatce; zmienia D-13, wpis o tym, gdzie leżą sekrety serwera. | decision | pytanie 9 (A; Mariusz, 2026-10-30, pozycja 17-Q9 pakietu rundy), *Not chosen* tam. O wymianie tego klucza wiersz nie mówi, bo żadne źródło nie podaje, czy da się go wymienić. | Czym sięgnąć po kopie po utracie serwera gry. |
| 8 | Gdy kopia się nie uda, skrypt poza kontenerem woła `pusher`, a właściciel dostaje wiadomość; harmonogram, który się nie uruchomił, i cały serwer, który leży, zostają bez powiadomienia, a doręczenie zależy od push.mikr.us; tę lukę przeglądamy przed publicznym uruchomieniem kont, czyli zanim właściciel poda adres gry innym graczom. | decision | pytanie 5 (D; Mariusz, 2026-10-30, „bierzemy D”, pozycja D12 pakietu rundy), *Not chosen* tam. Zdanie o przeglądzie: pytanie przeciw temu wyborowi, pozycja 17-P pakietu rundy, droga C, rekomendacja (Mariusz, 2026-10-30, „pytania zgodnie z rekomendacją, wiersze przyjmuję”): decyzja dostaje zapisany warunek powrotu „przed publicznym uruchomieniem kont”, kosztem jednego zdania; to tylko przypomnienie: nic nie blokuje uruchomienia, a do tej chwili cisza zostaje. Kotwice pytania: `account-save-backup/1` i wiersz 1, „ostatnia ma najwyżej dobę”, bo zatrzymany harmonogram przestaje spełniać oba zdania, a cisza wygląda tak samo jak „wszystko działa”. Drogi niewybrane: A — droga D bez zapisanego przeglądu — zatrzymany harmonogram niczego nie zapisze, więc wyjdzie to dopiero, gdy ktoś zajrzy na Strych i zobaczy starą kopię, albo przy awarii; koszt zerowy, a zdanie o przeglądzie zostaje tylko w dokumencie zadania. B — dodatkowo raz w tygodniu wiadomość o udanej kopii — lukę poznać po braku wiadomości, a tego łatwo nie zauważyć; koszt: warunek w skrypcie, a limitów `pusher` nie znamy. | Sam dziennik, poczta przez Outsidera albo zewnętrzna usługa. |
| 9 | Wiadomość `pusher` mówi tylko, że kopia się nie udała, i nie niesie danych graczy, bo może iść bez szyfrowania. | decision | pakiet przy drodze D (pozycja D12): „Treść to samo „kopia się nie udała”, bez danych graczy.”; propozycja refinera: trwała reguła zamiast opisu, przyjęta (pozycja 17-K15 pakietu rundy; Mariusz, 2026-10-30, „wiersze przyjmuję”) | Wysłanie wyniku polecenia wzorcem z dokumentacji `polecenie \| pusher`. |
| 10 | Każdy nieudany krok skryptu kopii — polecenie w kontenerze, także gdy kontener nie działa, szyfrowanie, wysyłka, usuwanie starych kopii — kończy się wywołaniem `pusher`. | invariant | propozycja refinera: nowy niezmiennik i zakres kroków, przyjęta (pozycja 17-K8 pakietu rundy; Mariusz, 2026-10-30, „wiersze przyjmuję”); podstawa to pytanie 5 (D), a „także gdy kontener nie działa” stoi w tabeli pakietu przy drodze D | Które awarie dostają powiadomienie, np. sama nieudana wysyłka. |

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

#### `spec.md:88-96` 3. How the file leaves the container

### 3. How the file leaves the container (carried row 3)

Through `docker exec`'s standard output, read by the backup script. The temporary copy lies in the container's writable layer for the seconds of the run. On the host the plain database exists only in the pipe, never on the disk.

- Rejected: a file in `/app/data` fetched by `docker cp` — a plain copy in the persistent volume, left there by any failure, and three commands to fail.
- Rejected: a new bind mount or a volume mount in a helper container — changes D-17.
- Measured: 8 MiB of every byte value passed through `docker exec` without a terminal with its SHA-256 unchanged, in a pipe from Git's bash on this computer. Docker's engine answers here, so the smoke test of decision 15 keeps this true in the gate, and H3 proves it on the real path.
- Cost if wrong: a damaged stream fails `age`'s decryption or the database's opening at a restore, which is why H3 runs before the merge.

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

#### `spec.md:300-303` 16. Settled by the orchestrator

### 16. Settled by the orchestrator after the review of the revision

The one finding left after the revision: a failed send on a full Strych logged no size, and the hand run of a small file passed. Settled as step 6 of the cycle settles a question, by the reviewer's fix, the smallest reversible reading: decision 8 logs the ciphertext's size before every send, says what a passing hand run proves, and decision 15's test holds it. No decision is reopened. Rejected: keeping `rsync`'s text in the log — breaks D-13's *Verification*. Cost if wrong: one log line. Also settled: the entry's real parts stand in place of the definition's `Part: every`, as the entry of `account-save-sqlite-access` from the same definition does; the meaning of a projected invariant is unchanged by naming them.

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
