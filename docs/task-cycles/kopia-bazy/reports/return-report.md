# Report — the return step, task kopia-bazy

**Status:** `done with concerns`. All seven owed items are written and no raw reading contradicts the change. The two concerns are under *Problems as observed*: my reading of the foundation falls short of the method, and the cron manual advises against the directory the schedule uses.

Worktree `C:\Storage\repos\loop2-wt\kopia-bazy`, branch `task/kopia-bazy`, head `687495a9735ef1138ad99941daf140be51cb6ca3`, range `eb4ece0..687495a`. Not pushed. `.the-way` at `a8dfe8ac`, the commit its gitlink records.

## Commits and files

| Commit | What |
|---|---|
| `45d795c` | `cron-d-file-rules`; D-217: *Based on*, *violates*, the memory figure, the sentence on changes |
| `86e4199` | `node-sqlite-database`: `progress`; D-222: two rejected ways |
| `a8426ac` | D-223, `docker-build-cache-invalidation`; `account-save-sqlite-upgrade`: *Rests on*; D-222: the release check now named by D-223 |
| `b25bde1` | D-224, `openssh-strict-host-key-checking`, `openssh-option-order` |
| `687495a` | D-223 and D-224: wording — where the login stays, and qualified "check" |

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 79 | 13 |
| `foundations/environment_facts.md` | 26 | 2 |
| `foundations/invariants.md` | 1 | 1 |

No code, test, skill or guideline changed. H5 has not run, so nothing here moves what it will deploy.

## Entries written or changed

Ranges are lines at `687495a`.

| Identifier | Range | Kind | Meaning |
|---|---|---|---|
| D-223 | `foundations/decisions.md:4194-4224` | decision, new | Sprawdzenie wydania Node.js to krok budowy obrazu, który na własnym wydaniu obrazu zapisuje i czyta dane, robi kopię zapasową jednym krokiem i czyta ją z powrotem, a porażka przerywa budowę; obraz Node.js zostaje nieprzypięty, co odrzuca samo przypięcie, sprawdzenie w skrypcie wdrożenia i oba naraz. |
| D-224 | `foundations/decisions.md:4226-4253` | decision, new | Skrypt kopii wysyła plik na Strych przez `rsync` po `ssh`, bez pytań i ze ścisłym sprawdzaniem klucza hosta wyłącznie względem `/etc/loop2/strych-known-hosts`, pliku, który wypełnia człowiek linią o porównanym odcisku; zmieniony klucz hosta oznacza nieudaną wysyłkę do czasu ponownego porównania, a `rsnappush`, `accept-new`, wyłączone sprawdzanie i domyślny plik roota są odrzucone. |
| D-217 | `foundations/decisions.md:3978-4035` | decision, changed | Znaczenie wiążące bez zmian; poprawione uzasadnienie: 58 MiB to sam krok kopii, całe polecenie zajmuje około 73 MiB, otwarcie bazy usuwa tylko to, co serwer i tak usuwa co minutę, a harmonogramu nie wolno zainstalować pod nazwą z kropką. |
| D-222 | `foundations/decisions.md:4161-4192` | decision, changed | Znaczenie wiążące bez zmian; wśród odrzuconych dróg stoją teraz także kopiowanie trzech plików bazy i narzędzie `sqlite3`, a uzasadnienie wskazuje sprawdzenie wydania z D-223. |
| `cron-d-file-rules` | `foundations/environment_facts.md:376-380` | fact, new | Plik w `/etc/cron.d` musi należeć do roota, nie może być zapisywalny dla grupy ani innych, podaje użytkownika zadania, a jego nazwa składa się tylko z liter, cyfr, podkreśleń i myślników, więc nie może zawierać kropek. |
| `docker-build-cache-invalidation` | `foundations/environment_facts.md:382-386` | fact, new | Budowa Dockera sprawdza obraz bazowy i kolejne instrukcje względem pamięci podręcznej, a po pierwszym niedopasowaniu żadna dalsza instrukcja z tej pamięci nie korzysta. |
| `openssh-strict-host-key-checking` | `foundations/environment_facts.md:388-392` | fact, new | OpenSSH 8.9p1 przy `StrictHostKeyChecking yes` nigdy sam nie dopisuje kluczy hostów i odmawia połączenia, gdy klucz się zmienił, `accept-new` dopisuje nowe klucze sam, `no` przepuszcza też zmienione, a `BatchMode yes` wyłącza pytania o potwierdzenie klucza. |
| `openssh-option-order` | `foundations/environment_facts.md:394-398` | fact, new | `ssh` bierze pierwszą uzyskaną wartość każdego parametru, a opcje wiersza poleceń czyta przed plikami konfiguracji. |
| `node-sqlite-database` | `foundations/environment_facts.md:250-254` | fact, changed | Fakt mówi teraz także, że `backup()` wywołuje opcjonalną funkcję `progress` po każdym kroku kopii, podając pozostałe i wszystkie strony. |
| `account-save-sqlite-upgrade` | `foundations/invariants.md:1048-1056` | invariant, changed: *Rests on* only | Zdanie bez zmian; niezmiennik opiera się teraz także na regule pamięci podręcznej Dockera, bo tylko dzięki niej krok wzięty z tej pamięci znaczy, że to samo wydanie i ten sam kod już przeszły sprawdzenie. |

## Record — *Return step*

- **Foundation compared with code:** the entries the change writes or changes (D-13, D-73, D-112, D-214 to D-222, the four invariants, `account-save-sqlite-access`, `node-sqlite-database`, `sqlite-online-backup`, `mikrus-pusher-mail`, `age-file-encryption`) and those the task names (D-10, D-12, D-15, D-16, D-17, D-104, D-137, D-205, D-209) against `deploy/loop2-backup`, `deploy/loop2-backup.cron`, `deploy/loop2-deploy`, `src/server/account-backup.ts`, `src/server/account-database-check.ts`, `src/server/database.ts`, `Dockerfile`; the part map of the touched parts read whole; D-104 and D-209 not reread whole (see *Problems*). What no longer matched, each corrected:
  - D-217's "peaks at 58 MiB" was the backup step's; the whole command measured about 73 MiB (74 984 KiB, `reports/slice-1-review-report.md:46`). Not re-measured here.
  - D-217's "Running the command changes nothing on the server" against the pruning at `src/server/database.ts:176-177`.
  - D-222's "the check of D-215" now names D-223.
  - The rest matched: the 03:17 schedule, the 900-second lock wait in both scripts, the host-key options at `deploy/loop2-backup:233`, `backupRate`, the seven weekday names, the three compared pairs, the log's fields.
- **Decisions written or changed:** D-223 and D-224 new; D-217 and D-222 changed.
- **Invariants written or changed:** none new. `account-save-sqlite-upgrade` changed in *Rests on* only, the rule set by D-215. `account-save-backup` keeps *Violated: yes*.
- **Environment facts:** new `cron-d-file-rules`, `docker-build-cache-invalidation`, `openssh-strict-host-key-checking`, `openssh-option-order`; `node-sqlite-database` changed for `progress`. Strych's documentation for `IdentityFile /backup_key` stands in D-224's *Based on*, since the human rejected a fact of its own for Strych (spec, *Foundation entries*).
- **Glossary terms:** none. `copy` as a game term: none of my added lines uses the noun for a backup, and D-222's "copying the database's three files" is the ordinary verb, a meaning a reader of the field gives it, as the plan's question 1 and the foundation step settled. `copy` for the backup in `src/server/account-database-check.ts:69-73` is the whole review's Minor 12, which stays out. "Weekday file" is defined in D-216 and misleads no reader of the field.
- **Part-map changes:** none. The responsibilities, the claims and *External context* written in the cycle still match; `foundation_check.py` shows every file claimed.
- **Projected entries written whole or in part:** none in this step. D-214, D-215, `account-save-backup` and `account-save-sqlite-upgrade` stand whole: a script compared their sentences with the task's *Decisions in play*, all equal.
- **Rows of *Settlements to record* written:** none in this step, none missed. Where each stands: 1 D-216 · 2 D-217 · 3 D-112 · 4 D-218 · 5 `account-save-backup-encrypted` · 6 D-13 · 7 D-13 · 8 D-219 · 9 D-219 · 10 `account-save-backup-failure-notice` · 11 `mikrus-pusher-mail` · 12 D-220. Every entry of the plan's E1 to E21 is present at this head, by a script; E22's responsibilities I read in the part map.

## The seven owed items

| # | Item | Done in |
|---|---|---|
| 1 | Spec decision 6, host key | D-224, with its three rejected ways and `rsnappush`, which no entry held either |
| 2 | Spec decision 9, rejected ways | D-223; D-215 untouched |
| 3 | D-222's two ways | D-222 *Rejected* |
| 4 | D-217's figure and sentence | D-217 *Rationale* |
| 5 | Cron's rule on a dot | `cron-d-file-rules`, named in D-217's *Based on*, with a *violates* example so the fact has a reader |
| 6 | `progress` of `backup()` | `node-sqlite-database`; D-223 names that fact, since its step count rests on it |
| 7 | Other sources | Below |

Item 7, source by source:

| Source | Answer |
|---|---|
| Docker's build cache, for "a cached build step has passed" | Not held. New fact, in D-223 and in the invariant's *Rests on* |
| `ssh`'s host-key rules and option order, for `deploy/loop2-backup:233` | Not held. Two new facts |
| Strych's page, for root's SSH entry | Held for other passages; D-224 quotes `IdentityFile /backup_key` |
| Cloudflare's headers in the launcher | Held: `cloudflare-client-address`, `cloudflare-forwarded-protocol` |
| A volume outliving its container, why the launcher cleans up | Held: `docker-volume-lifecycle` |
| `rsync` keeping the old file | Held in D-216's *Based on* |
| `age`, `pusher` | Held |
| `docker exec`'s exit status and clean bytes without a terminal | No passage found; see *Searches* |
| `flock`, GNU `timeout`, `date +%u`, `stat`, `mktemp`, `rsync`'s other flags, cron's `MAILTO` | No fact. Each is ordinary tool behaviour that fails loudly into the notice, or changes nothing a decision rests on |

## Checks

| Command | Result |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` at `687495a` | exit 0, 0 errors; also 0 after each commit |
| A script comparing each new fact's passages with the raw download | all found: 3 cron, 4 Docker, 5 and 3 OpenSSH, 2 new Node.js |
| The same on the Node.js fact's older passages | one false miss, the link markup of "busy timeout" at line 178; the text stands |
| The same on one cron passage | a false miss from my handling of the roff macro; found word for word in the rendered manual page of the same package version |
| Projected sentences against the task | all four equal |
| `version.h` at the OpenSSH commit | `OpenSSH_8.9`, `p1`, as the sentence says |

Not run: the full `npm test`, the orchestrator's gate, as the handoff says; no focused test, since no code, test or guideline changed. H5, H2, H3 and anything on the server or Strych: not allowed here, and none was read.

## Own-work check

- **Requirement most likely missed:** a binding or sourced sentence saying more than its source, or a forbidden value in an entry. **Check:** the passage script above, then a script over the added lines of `eb4ece0..687495a`. **Result:** no Strych host name, server name, address, port or fingerprint outside document addresses; D-223 and D-224 hold two binding sentences each, no *should*, *will* or capitalized keyword, no bare "check", and no noun `copy`.
- The check also caught my own draft: quoting fragments in `openssh-strict-host-key-checking` lost "will never automatically add host keys", and I had put the key to Strych in root's configuration, against D-13. Both corrected before the head.

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| D-224 answers how the script reaches Strych, `rsync` and `rsnappush` included | An entry on the host key alone — `rsnappush`'s rejection would stand in no entry | One entry a little wider than item 1 |
| D-223's *Verification* holds a pair, not the invariant | Naming `account-save-sqlite-upgrade` — its *Derives from* would have to change on a projected entry | The check of the decision reads through D-215 |
| Added `docker-build-cache-invalidation` to the invariant's *Rests on* | Keeping it in D-223 alone — the template names every fact deciding whether a commit makes the sentence true, and the definition left *Rests on* to the cycle | One link to drop, if the orchestrator reads the projected entry as closed to links |
| Two OpenSSH facts | One — the template asks for two where the sentences are about different things | One more entry to keep |
| The cron source is Ubuntu's tagged tree, `applied/3.0pl1-137ubuntu3` | The manual-page site, which moves to newer text | None seen: its text agrees |
| Origin `none` on D-223 and D-224, as D-222 | The task's note — it holds the question, not the reasoning, and `.runs` may not be cited | None |
| Kept `D-215` in the code's comments | Moving them to D-223 — they stay true, and this step changes no code | None |

## Reaches beyond the dispatch

- `.the-way/foundations/glossary.md`: its terms, for the words needing a qualifier ("check", "step").
- `reports/slice-1-review-report.md:46`: the source of the 73 MiB.
- `reports/10-plan-report.md`, `11-foundation-handoff.md`, `12-foundation-report.md`: how `copy` was settled.
- The owner's rule files `git.md`, `scripts.md`, `search.md`, `knowledge_artifacts.md`, before commits and scripts.
- `.claude/skills/loop2-deploy/references/backup_and_restore.md:96-122`, and `SKILL.md`, to keep D-223 true to "the first build of a commit shows the release".
- Raw reads of 2026-10-31, kept in the scratchpad and treated as data: the Node.js doc, `ssh_config.5`, `version.h`, Docker's two cache pages, Docker's `exec` reference, the Ubuntu cron source and manual page, Strych's page, the archive's capture index.

## Searches not found or unclear

- **`docker exec`'s exit status.** Docker's reference for the command (`docker/cli`, `docs/reference/commandline/container_exec.md`, branch master, read for this search only) states neither that it returns the command's status nor that output without `-t` stays byte for byte. The script's "whole file" rests on both. `tests/deploy/test_account_backup_stream.py` runs the real thing for the bytes, and H3 holds the real path. No fact written: there is no passage to cite.
- **`docker rm --force` of an absent name.** Not read; only 29.7.2 is shown (the fix review's note 4). No entry rests on it, and the failure is a loud exit 4.
- **Node.js accepting `rate` 2^31 − 1.** The documentation says only "Positive number". The code comment's "a 32-bit integer" has no passage. D-223's build step fails the build if that stops holding, so no fact.
- **crontab(5), for `MAILTO=""`.** Not read; nothing an entry says rests on it.
- **Which Ubuntu the server runs.** Taken from `mikrus-host-swap` and the spec, not re-read on the server. `cron-d-file-rules` names the package of Ubuntu 22.04.
- **Whether `/etc/cron.d` really starts this file on that host.** No source can say; it stays H2.8's.

## Problems as observed

1. **My reading falls short of "Reading the foundation", step 2.** Of the decisions whose *Scope* names `deployment`, `account-server` or `agent-workflow`, I read 55 whole, all of `deployment` among them, and 39 not: D-01, D-02, D-06, D-07, D-29, D-37, D-38, D-86, D-96 to D-102, D-104, D-105, D-109, D-113 to D-116, D-138, D-139, D-152, D-154 to D-157, D-159 to D-163, D-202, D-204, D-209, D-210, D-213. They cover HTTP, sessions, passwords, mail and the like. In their place I searched the whole foundation for what my entries touch: pins and digests, build cache, base image, `node:24`, `ssh`, cron, schedule, known hosts, `rsnappush`. Of the 62 invariants whose *Part* reaches these parts, I read the ones this change wrote or linked, and the others by name. If that is not enough, the search of the foundation has to be repeated for those entries.
2. **The cron manual advises against the directory the schedule uses.** Its NOTES say: "In general, the system administrator should not use /etc/cron.d/, but use the standard system crontab /etc/crontab." I did not stop: the same manual documents the directory and its rules, so this is advice, not a contradiction of what the change rests on. The sentence of `cron-d-file-rules` does not repeat it. Leaving it costs nothing today, and a file of its own is what the deployment can compare. A reader who wants the other way would edit a shared system file. It reaches the orchestrator as a thing to name, not a question that blocks.
3. **A guard refused one command of mine.** `pretooluse-guard.sh` stopped a Bash command with the message that it accessed credentials outside the scope of the work. The cause is a guess: its search pattern named the SSH directory. The command read only downloaded pages. I did not work around it: I dropped that pattern and read the two pages whole with Read. No credential was touched.
4. **Strych's documentation itself recommends `rsnappush`.** D-224 rejects it for this case; that is the spec's reasoning, not a conflict with the page.
