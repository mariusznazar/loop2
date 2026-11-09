# Handoff - Slice 12 (executor, `make-change`)
## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator; nothing here is the human's approval.
You never ask the human. A question comes back to the orchestrator in your report, with your recommended answer.
The plan and the task can be wrong: if a value, a line number or a sentence in them does not pass your own reckoning,
say so in the report instead of fitting the code to it.

## Where you work

- Worktree (work from its root): `the root of the repository`, branch `task/porzadki-z-uwag-pr`. No other checkout of the product.
- The slice's base: `2e884d1`. The head you start from: `2e884d1`. Your range runs from `2e884d1`.
- Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`, checked out in the worktree.
- Class of model the orchestrator set for this slice: same (sonnet).
- The foundation step is done: decisions D-352, D-353, D-354 were added at the end of `foundations/decisions.md`, the rule "Recording a failure" of `guidelines/coding.md` was extended,
  and the line of D-254 was wrapped (every decision after D-254 moved one line down against the ranges the plan gives; the identifier is the address, the range only its size at the base).

## Your stage and its boundary

- You make: **a slice, or the retry of a slice** - Slice 12 of the plan, below. Method: read `.the-way/task-cycle/change/SKILL.md` whole and `.the-way/task-cycle/change/slice.md` whole;
  read `.the-way/task-cycle/change/ui_check.md` before you finish a change that alters what a screen shows.
- You do not open the whole plan or the whole task: your section of the plan and the passages below are your reading, besides the files and entries named in *Read*.
  The passages of the task bind where your section says less.
- Do the work yourself; dispatch no subagent. Run only the focused checks of the slice's *Checks*; **never run the product's gate (`npm test` without arguments)**, also if a text below names it - report that as a mismatch.
- Commit your work with explicit paths (`git add <path> ...`, never `git add -A`); commit messages in English in the form of the repository's earlier commits (`<type>: :emoji: <what>`, see `git log`). Never return an uncommitted change.
- A temporary defect you put in the code to see a test fail is taken out again before you commit; the report records the failing run and the passing run, each as a command and an exit code.
- Trust boundary: the cycle's answer at start is *yes* (`src/server/**`, `src/browser/sim/saved-game.ts`, `scripts/local-start.mjs`): where your slice touches them, a crafted input at that boundary is part of your own-work check.
- Irreversible operation: none; the cycle prepares and never performs one.
- Privacy: no secret, password or personal data in your report, and none in any file you write.
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/slice-12-report.md`.

## Foundation entries and guidelines

Read each entry named in the slice's *Read* below whole, by its identifier, in `foundations/decisions.md`, `foundations/invariants.md`, `foundations/glossary.md`, `foundations/part_map.md`, `foundations/environment_facts.md`
(a decision runs from its `###` heading to the next heading). Read each guideline file named whole. Read every file you change whole before you change it.
For D-352, D-353, D-354: whole, at the end of `foundations/decisions.md`.

## Your section of the plan (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/plan.md`, heading "Slice 12")

### Slice 12 — The deploy and play skills say what is true, in both copies

- **Goal:** text of the skills changes, each file in `.claude/skills/` and its twin in
  `.agents/skills/` byte for byte alike (To do 22–24 and 26–31). (22) The three steps named "H1" of
  `references/setup_and_secrets.md` (today `:41`, `:230`, `:309`) get different names: the tunnel's
  H1–H5 keep theirs; the mail's steps (today H1–H4, `:230`–`:276`) and the saved-game steps (today
  H1 and H2, `:309`, `:340`) get names of their own, and every reference to them follows —
  `SKILL.md` (today `:144`, `:176`, `:207`, `:261`, `:266`) and `references/troubleshooting.md`
  (today `:27`, `:29`, `:123`, `:127`) — while the tunnel's references, `backup_and_restore.md` and
  the backup's "H2" in `tests/invariants/test_account_save_backup_encrypted.py` stay (see *Choices*).
  (23) The sentence "the game has no save button; it saves itself after each change" (today `:337`)
  no longer contradicts the program panel's buttons „Zapisz w programie”, „Zapisz jako nowy program”
  and „Zapisz”: it speaks of the game state, which the game saves by itself (D-207). (24) Line 35 of
  `.claude/skills/loop2-play/SKILL.md` (127 characters) is wrapped as its neighbours, no word changed.
  (26) The section on measuring says how to find and remove a measuring container
  `loop2-password-measure-<random>` left by an interrupted measurement or a lost connection (the
  launcher removes it only in its `finally`), for the human to run on the server; nothing runs it.
  (27) The section gives the extra load of the measurement as about a dozen seconds on the server
  (a dozen or so, „kilkanaście”, as the task gives), not "a few seconds" (today `:422`–`:423`).
  (28) The skill names as removing the accounts' volume only the Docker commands that remove it
  (today `:295`–`:296` names `docker compose down`, `docker system prune --volumes` and `docker volume
  prune`): what each removes is taken from Docker's documentation, read and cited with its commit or
  date in the report, never from memory, and where it depends on the Docker Engine's version, which
  the repository does not record for the server, the text says so. (29) `SKILL.md`'s "What it prints"
  of the block command (today `:231`) says that wrong arguments print the usage line and "Nothing
  changed." (`src/server/account-block.ts:39`–`:40`). (30) The description of `unblock` (today
  `:229`–`:230`) says that the emailed links the block stopped stay stopped and the player asks for a
  new one (D-137, D-160). (31) The block that writes the mail's password (today `:244`–`:256`), pasted
  into a terminal without bracketed paste, cannot take the next pasted line as the password: nothing
  that is to be pasted follows the command that reads the password within one paste. The section
  "Blocking a player account" of `SKILL.md` is read as it stands at the slice's base, since another
  task changes it too.
- **Change:** `.claude/skills/loop2-deploy/SKILL.md` · `.agents/skills/loop2-deploy/SKILL.md` ·
  `.claude/skills/loop2-deploy/references/setup_and_secrets.md` ·
  `.agents/skills/loop2-deploy/references/setup_and_secrets.md` ·
  `.claude/skills/loop2-deploy/references/troubleshooting.md` ·
  `.agents/skills/loop2-deploy/references/troubleshooting.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `.agents/skills/loop2-play/SKILL.md`
- **Read:** `.runs/task-cycles/porzadki-z-uwag-pr/task.md:23-25` Need, the fifth to seventh points ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:65-67` To do, items 22 to 24 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:69-77` To do, items 25 to 31 ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:89-93` Questions to settle, the seven remarks ·
  `.runs/task-cycles/porzadki-z-uwag-pr/task.md:111-118` Context ·
  `.runs/task-cycles/porzadki-z-uwag-pr/plan.md:537-550` Choices ·
  `foundations/decisions.md:271-289` D-12 · `foundations/decisions.md:291-304` D-13 ·
  `foundations/decisions.md:370-393` D-17 · `foundations/decisions.md:2635-2648` D-137 ·
  `foundations/decisions.md:2984-2995` D-160 · `foundations/decisions.md:3741-3801` D-207 ·
  `foundations/decisions.md:5201-5228` D-254 ·
  `foundations/invariants.md:879-888` unblock-restores-no-session ·
  `foundations/invariants.md:899-908` unblock-restores-no-link ·
  `foundations/environment_facts.md:370-375` docker-volume-lifecycle ·
  `foundations/part_map.md:118-133` agent-workflow ·
  `foundations/glossary.md:32-44` deployment, test server · `foundations/glossary.md:156-160` blocked account ·
  `src/server/account-block.ts` · `scripts/measure-passwords.mjs:190-260` ·
  `src/browser/view/program-panel.tsx:540-580` · `compose.yaml` ·
  `.claude/skills/loop2-deploy/references/backup_and_restore.md:320-330` ·
  `tests/agent_workflow/test_loop2_deploy_skill.py` · `tests/agent_workflow/test_loop2_play_skill.py`
- **Model:** same — the orchestrator raised it from `cheaper`: it states the effect of commands that remove data (item 28) and changes the block that writes a mail password (item 31)
- **Risk:** none
- **Checks:** `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` ·
  `npm test -- tests/agent_workflow/test_loop2_play_skill.py`; for (31), the old and the new block
  each fed once to `bash` through standard input followed by a further line, as an unbracketed paste
  feeds a terminal, with `/etc/loop2` replaced by a temporary directory, the report saying what the
  password became and where a run without root stopped
- **Depends on:** Slice 11

## The plan's Choices (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/plan.md`, heading "Choices")

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| To do 4 gets no slice: the orchestrator's base run shows the class running and passing, so the task's condition does not hold | a slice that rewrites the class's PowerShell preparation anyway | the class could stop running again on another state of the machine, and only a reader of the gate's output would see it, as before |
| Slice 2 keeps the non-zero exit code `account-backup` gives today when its cleanup fails, and changes only the failure's name and the operator's sentence | exit 0 after a whole backup — the nightly script would send it, but the plain copy left in the container's `/tmp` would reach the owner by no notice; a new exit code of its own — the skill's table of the command's codes in `backup_and_restore.md` changes in two copies for a rare case whose sentence, in the backup log, already says which | one night's backup is not sent each time only the cleanup fails; the owner learns it from the notice and the log |
| Slice 4 tells the block apart where the session write learns it, carried from the database to the error handler of the session callback | reading the account's blocked state again after the write failed — a second query, and an unblock in between turns a block's refusal back into a failure line | a cause wrongly read as the block hides a real failure of the session write |
| Items 9, 10 and 17 are three slices in a chain over `src/server/app.ts` and `tests/http.test.mjs`, after Slice 1 | one slice of all three — a reviewer judges a change of behaviour, a second one and a gap of tests at once | three reviews of a trust boundary instead of one |
| Item 15 joins the simulation's test slice (Slice 9), though it guards `loop.ts`, not the load | a slice of its own | none beyond a larger review of Slice 9 |
| Slice 8 observes what the client hands the real `fetch` and lets it reach the file's real local server | a stand-in for `fetch` — against the example "Test na prawdziwym lokalnym serwerze" of `guidelines/coding-browser-api-client.md` | a wrapper that changes the request would test the wrapper; the review checks that it passes the call on unchanged |
| Slice 10 reloads through the `PageAddress` the page already gets, which gains the reload | `location.reload()` called in `game-view.ts` — no test of the view can see it | one more member of a type every fake address of the tests implements |
| Slice 11 sends docker's own error text to standard error, which stays in the terminal, and puts in the report only the docker step and its exit status | docker's text in the report — the report is copied into the request, and docker's message over `DOCKER_HOST=ssh://…` can carry the server's name or address, which D-13 keeps out of requests | Mariusz has to read the terminal, not only the file, to see the reason |
| Slice 12 keeps the tunnel's H1–H5 and renames the mail's and the saved-game's steps | renaming all three families — the tunnel's names stand also in `backup_and_restore.md`, in `troubleshooting.md`'s section on abandoning the request and in further places, so more files and more references to miss | the tunnel's steps keep a name as generic as before |
| The 5-second `timeout` of `refusedStart` (`tests/startup.test.mjs:95`) stays as it is, though several cases use it (the orchestrator's answer to the planner's open question) | raising it with item 2 — the task and the review row name only the occupied-port case, and nobody has seen `refusedStart` fail | a later load failure of another case of the same file, to be a remark of a later task |
| Slice 12 changes the text of the measuring section only for items 26 and 27 and leaves the launcher without a signal handler | a signal handler in `scripts/measure-passwords.mjs` that removes the container — the task asks the skill to say how, and a killed terminal or lost connection runs no handler anyway | none |

## Passages of the task your *Read* names (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/task.md`, lines as given)

### `task.md:23-25`

- Skill wdrożenia ma zdania, przez które Mariusz albo agent źle odczyta instrukcję: trzy kroki o jednej nazwie, „nie ma przycisku zapisu” obok przycisków „Zapisz…”, pomiar haseł bez przyczyny porażki i bez sprzątania, polecenia usuwające wolumen, wynik polecenia blokady, linki po odblokowaniu (loop2#043-14, 043-16, 032-11, 032-12, 032-17, 032-4, 036-2, 037-1).
- Blok zapisu hasła poczty ze skilla, wklejony w terminal bez wklejania nawiasowego, zapisuje jako hasło następną wklejoną linię, `stat -c '%U %g %a' "$f"`, bez żadnego błędu (loop2#037-13; wniosek z tekstu bloku, nie próbowany w terminalu).
- Dwie linie fundamentu i skilla do grania są niezawinięte (loop2#050-10, 050-11).

### `task.md:65-67`

22. Trzy różne kroki o nazwie „H1” w `.claude/skills/loop2-deploy/references/setup_and_secrets.md` (`:41`, `:230`, `:309`) mają różne nazwy, w obu kopiach skilla (loop2#043-14).
23. Zdanie „the game has no save button; it saves itself after each change” (`setup_and_secrets.md:337`) nie przeczy przyciskom „Zapisz w programie”, „Zapisz jako nowy program” i „Zapisz” panelu programu (loop2#043-16).
24. Linia D-254 w `foundations/decisions.md` (dziś `:5226`, 138 znaków) i linia 35 `.claude/skills/loop2-play/SKILL.md` (127 znaków) są zawinięte jak sąsiednie, bez zmiany treści, w obu kopiach skilla (loop2#050-10, 050-11).

### `task.md:69-77`

Skill wdrożenia (pytanie „Czy siedem uwag o skillu wdrożenia…”), w obu kopiach skilla:

25. Po nieudanym pomiarze haseł na serwerze Mariusz wie, czy zawiodło logowanie SSH, uprawnienia Dockera czy sam obraz, a nie widzi tylko „the image cannot be inspected” (loop2#032-11; `scripts/measure-passwords.mjs:89`, `:94`, `:197`, `:285`; lista porażek w `setup_and_secrets.md:405`–`:416`).
26. Skill mówi, jak znaleźć i usunąć kontener pomiaru `loop2-password-measure-<random>`, który został po przerwanym pomiarze albo zerwanym połączeniu (loop2#032-12; `setup_and_secrets.md:420`–`:421`; sprzątanie tylko w `finally`, `scripts/measure-passwords.mjs:251`–`:252`).
27. Skill podaje czas dodatkowego obciążenia serwera przy pomiarze haseł zgodny z pomiarem na serwerze — kilkanaście sekund — a nie „a few seconds” (loop2#032-17; `setup_and_secrets.md:422`–`:423`).
28. Skill wymienia jako usuwające wolumen z kontami tylko te polecenia Dockera, które go naprawdę usuwają (loop2#032-4; `setup_and_secrets.md:295`–`:296`).
29. Skill mówi, co wypisuje polecenie blokady konta przy błędnych argumentach (loop2#036-2; `.claude/skills/loop2-deploy/SKILL.md:231` „One line…” wobec `src/server/account-block.ts:39`–`:40`).
30. Opis odblokowania konta w skillu mówi, że linki z maili zatrzymane blokadą dalej nie działają i gracz prosi o nowe (loop2#037-1; `SKILL.md:229`–`:230`; D-137, D-160).
31. Blok zapisu hasła poczty (`setup_and_secrets.md:244`–`:256`) wklejony w terminal bez wklejania nawiasowego nie zapisuje jako hasła kolejnej wklejonej linii (loop2#037-13).

### `task.md:89-93`

- Czy siedem uwag o skillu wdrożenia z sekcji „Zostawić” (loop2#032-11, 032-12, 032-17, 032-4, 036-2, 037-1, 037-13) wchodzi do zadania, choć wstęp sekcji „Zadanie 2” je zapowiada, a tabela ich nie ma?
  - Answer: tak, wchodzą — pozycje 25–31.
  - Not chosen:
    - zostają w „Zostawić”, a poprawia się tylko wstęp sekcji — zadanie zamyka się na 26 pozycjach, a zostaje przypadkowe hasło poczty przy wklejaniu bloku (037-13) i sześć zdań skilla, które mylą się w niegroźny sposób
  - Source: Mariusz, 2026-11-08: „tak, niech wejdą”

### `task.md:111-118`

- Źródło pozycji: `the author's private note of the remarks of the first foundation review`, sekcja „Zadanie 2 (loop2): porządki z realnym ryzykiem”; kolumna „Słowa recenzenta” niesie brzmienie uwagi z opisu PR-a.
- Pozycje 25–31 pochodzą z sekcji „Zostawić” tego samego pliku, choć wstęp sekcji „Zadanie 2” je zapowiada; przy 032-4 sprawdzający zanotował „Nie sprawdzałem zachowania Dockera; opieram się na znanej semantyce `down -v`”, a skill wymienia trzy polecenia; czas kilkunastu sekund przy 032-17 pochodzi z uwagi recenzenta, kod go nie zawiera.
- Mariusz wybrał jedno zadanie zamiast podziału na pięć (testy niestabilne, zapis awarii, testy wczytywania, link z maila, teksty) — „wolę jedno zadanie” (2026-11-08).
- Ponowne sprawdzenie 2026-11-08 na `72287c2`: pliki kodu i testów pozycji 1–20 nie zmieniły się od `5694146`; mutantów nie uruchamiano ponownie.
- loop2#037-9 zmieniło się od przeglądu: zapis sesji na końcu odpowiedzi nadal pada (`src/server/database.ts:355` „Session cannot be replaced” przy zablokowanym koncie), ale dziś zostawia jeden wiersz `{"failure":"session",…,"place":"app.sessions"}` bez śladu stosu (`src/server/app.ts:60`–`:71`), a odpowiedź 201 dochodzi cała; ciasteczko wskazuje sesję, której baza nie ma. Prześledzone w kodzie, nie uruchomione.
- loop2#038-2: oba polecenia PowerShella, których używa przygotowanie klasy (`Get-NetTCPConnection -State Listen`, `Get-CimInstance Win32_Process`), zwracają 2026-11-08 wiersze z kodem 0; samego pliku nie uruchomiono, bo buduje grę.
- Numery linii w kolumnie „Stan dziś” źródła przesunęły się: 050-21 to `:120`, 050-9 to `:467`–`:470`, reguła „raz” to `guidelines/coding.md:123`–`:124`; numery w tym dokumencie są z `72287c2`.
- Zadanie `the note of another task in the author's backlog` (gotowe do cyklu) zmienia, dokąd trafiają wiersze JSON polecenia `account-block`, i dopisuje sekcję do `.claude/skills/loop2-deploy/SKILL.md`; pozycje 29 i 30 zmieniają ten sam plik, w sekcji o blokowaniu kont.

## Docker documentation excerpts for item 28 (word for word; address: `.runs/task-cycles/porzadki-z-uwag-pr/reports/05-docker-docs-excerpts.md`)

Fetched by the orchestrator, because the foundation's fact `docker-volume-lifecycle` does not cover the effect of `prune` and `down`. The Docker Engine version on the test server is recorded nowhere in the product; write only what these versions document and say which, and do not claim more.

# Docker documentation excerpts for item 28 (fetched by the orchestrator, 2026-11-09, verbatim)

Fetched without login, generic client name. Sources are tagged releases of the public repositories; the Docker Engine version installed on the test server is NOT recorded anywhere in the product, so the skill text must not claim more than these versions document.

## `docker volume prune` — https://raw.githubusercontent.com/docker/cli/v27.3.1/docs/reference/commandline/volume_prune.md (docker/cli tag v27.3.1) lines 1-40
```
# volume prune

<!---MARKER_GEN_START-->
Remove unused local volumes

### Options

| Name                          | Type     | Default | Description                                        |
|:------------------------------|:---------|:--------|:---------------------------------------------------|
| [`-a`](#all), [`--all`](#all) | `bool`   |         | Remove all unused volumes, not just anonymous ones |
| [`--filter`](#filter)         | `filter` |         | Provide filter values (e.g. `label=<label>`)       |
| `-f`, `--force`               | `bool`   |         | Do not prompt for confirmation                     |


<!---MARKER_GEN_END-->

## Description

Remove all unused local volumes. Unused local volumes are those which are not
referenced by any containers. By default, it only removes anonymous volumes.

## Examples

```console
$ docker volume prune

WARNING! This will remove anonymous local volumes not used by at least one container.
Are you sure you want to continue? [y/N] y
Deleted Volumes:
07c7bdf3e34ab76d921894c2b834f073721fccfbbcba792aa7648e3a7a664c2e
my-named-vol

Total reclaimed space: 36 B
```

### <a name="all"></a> Filtering (--all, -a)

Use the `--all` flag to prune both unused anonymous and named volumes.

### <a name="filter"></a> Filtering (--filter)
```

## `docker system prune` — https://raw.githubusercontent.com/docker/cli/v27.3.1/docs/reference/commandline/system_prune.md (docker/cli tag v27.3.1) lines 1-65
```
# system prune

<!---MARKER_GEN_START-->
Remove unused data

### Options

| Name                  | Type     | Default | Description                                        |
|:----------------------|:---------|:--------|:---------------------------------------------------|
| `-a`, `--all`         | `bool`   |         | Remove all unused images not just dangling ones    |
| [`--filter`](#filter) | `filter` |         | Provide filter values (e.g. `label=<key>=<value>`) |
| `-f`, `--force`       | `bool`   |         | Do not prompt for confirmation                     |
| `--volumes`           | `bool`   |         | Prune anonymous volumes                            |


<!---MARKER_GEN_END-->

## Description

Remove all unused containers, networks, images (both dangling and unused),
and optionally, volumes.

## Examples

```console
$ docker system prune

WARNING! This will remove:
        - all stopped containers
        - all networks not used by at least one container
        - all dangling images
        - unused build cache
Are you sure you want to continue? [y/N] y

Deleted Containers:
f44f9b81948b3919590d5f79a680d8378f1139b41952e219830a33027c80c867
792776e68ac9d75bce4092bc1b5cc17b779bc926ab04f4185aec9bf1c0d4641f

Deleted Networks:
network1
network2

Deleted Images:
untagged: hello-world@sha256:f3b3b28a45160805bb16542c9531888519430e9e6d6ffc09d72261b0d26ff74f
deleted: sha256:1815c82652c03bfd8644afda26fb184f2ed891d921b20a0703b46768f9755c57
deleted: sha256:45761469c965421a92a69cc50e92c01e0cfa94fe026cdd1233445ea00e96289a

Total reclaimed space: 1.84kB
```

By default, volumes aren't removed to prevent important data from being
deleted if there is currently no container using the volume. Use the `--volumes`
flag when running the command to prune anonymous volumes as well:

```console
$ docker system prune -a --volumes

WARNING! This will remove:
        - all stopped containers
        - all networks not used by at least one container
        - all anonymous volumes not used by at least one container
        - all images without at least one container associated to them
        - all build cache
Are you sure you want to continue? [y/N] y

```

## `docker compose down` — https://raw.githubusercontent.com/docker/compose/v2.29.7/docs/reference/compose_down.md (docker/compose tag v2.29.7) lines 1-30
```
# docker compose down

<!---MARKER_GEN_START-->
Stops containers and removes containers, networks, volumes, and images created by `up`.

By default, the only things removed are:

- Containers for services defined in the Compose file.
- Networks defined in the networks section of the Compose file.
- The default network, if one is used.

Networks and volumes defined as external are never removed.

Anonymous volumes are not removed by default. However, as they don’t have a stable name, they are not automatically
mounted by a subsequent `up`. For data that needs to persist between updates, use explicit paths as bind mounts or
named volumes.

### Options

| Name               | Type     | Default | Description                                                                                                             |
|:-------------------|:---------|:--------|:------------------------------------------------------------------------------------------------------------------------|
| `--dry-run`        | `bool`   |         | Execute command in dry run mode                                                                                         |
| `--remove-orphans` | `bool`   |         | Remove containers for services not defined in the Compose file                                                          |
| `--rmi`            | `string` |         | Remove images used by services. "local" remove only images that don't have a custom tag ("local"\|"all")                |
| `-t`, `--timeout`  | `int`    | `0`     | Specify a shutdown timeout in seconds                                                                                   |
| `-v`, `--volumes`  | `bool`   |         | Remove named volumes declared in the "volumes" section of the Compose file and anonymous volumes attached to containers |


<!---MARKER_GEN_END-->

```

## What to return

Status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), the commits, a one-line check result naming what failed or did not run,
and the report path. The report holds what `make-change` section 6 gives: the files changed with added and removed line counts, each check as its command and exit code
(the failing run of each test written first included), the own-work check (the requirement most likely not met, the check written and run, what it showed),
each reach beyond this handoff (what, where, why), each choice with the way rejected and its cost if wrong, each adaptation of the plan to the code, and
**Searches not found or unclear** - each thing you looked for and did not find, or that was unclear, wherever it arose, or `none`.
Where the work needs a choice the task and the foundation do not settle, return `returned` with no code; where a fact or permission is missing, `blocked`.
