# Handoff — executor of slice 20: flaky: the backup's trapped signal named by its exit code

You make one slice of a plan for the task cycle `implement-task`; another agent reviews the whole change with `review-change`.

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human; send a question to the orchestrator in your report with the status `questions`, and a missing fact or permission with `blocked`.
- Worktree (work only from its root): `the repository's root`, branch `task/luki-w-testach-z-przegladu`. **Base of this slice: `4bfc33cd70b9b1b779338c45e1a8ef541d7f2744`** (the range of your commits starts here). Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. The worktree has `node_modules` (installed from the lockfile) and `.runs/quality-venv` (ruff, shellcheck), made by the orchestrator; `dist/` is built only where the slice's checks say `npm.cmd run build`.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"** — read `.the-way/task-cycle/change/slice.md` as the `SKILL.md` gives. Read the `SKILL.md` whole, and a file it names only when its step comes. You have no skill tool: a skill a file names by its name alone is the `SKILL.md` whose frontmatter `name:` is that name, read as a file under `.the-way`.
- Class of model: the strongest class the human allows (Opus; never `fable`).
- Trust boundary answer of the cycle: yes (the files the part map names as boundaries, among them `src/server/**`, `src/browser/sim/saved-game.ts`, `deploy/**`, `assets/sprites/**`); irreversible operation: no. Where your slice's *Risk* names a boundary the review of it checks crafted input there.
- You never run the product's gate (`npm.cmd test` without a file, `python -B .the-way/task-cycle/gate_times.py`): it is the orchestrator's alone. The focused checks your slice names you run, each with its command and exit code in your report.
- Citations: where you add or change an `// invariant: <id>` or `// decision: D-NN "..."` comment, run `python -B .the-way/elements/common/foundation_check.py` before you commit and put its command and exit code in the report; a quotation after `decision:` must be a passage that begins a sentence of the decision's text, word for word (an earlier slice failed that check, unnoticed until the orchestrator ran it). Where the check reports an error that your change did not cause, name it and the file and line.
- Commits: messages in English in the form of the existing ones (`git log -8 --format=%s`); `git add` by path, never `-A` or `.`; commit your work in your slice's range; leave the worktree clean (`git status --short` empty) when you return. Where you change a file temporarily to see a test fail, restore it byte for byte (`git checkout -- <file>` or `git diff` empty) before you commit, and say so in the report.
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-20-report.md`. Your directory for working copies: `.runs/executor-20/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return, with `git worktree remove --force` then `git worktree prune` for a worktree, and state in the report where each stood and that it was removed.)

## Your slice, copied word for word from the plan

### Slice 20 — flaky: the backup's trapped signal named by its exit code

- **Goal:** the cause of the failure of
  `EveryFailedEndCallsPusher.test_a_signal_with_a_trap_is_named_by_its_exit_code_in_the_log_too` in
  `tests/invariants/test_account_save_backup_failure_notice.py` — "0 != 130", once on an unchanged
  base in loop2#87 (To do 7, third test; its log as in Slice 19) — is established as in Slice 17, with
  at least 30 separate runs of the case under Git's bash, alone and under load, every run counted, and
  repaired where the cause lies: the case, the support of the backup's stand-ins or the backup script
  `deploy/loop2-backup`; the case then passes at least 30 further separate runs, and the other cases of
  the file and `tests/invariants/test_account_save_backup_encrypted.py` still pass. Where the failure
  does not come back, nothing changes and the report gives every attempt and says the case needs the
  orchestrator's 3 full gate runs under load.
- **Change:** `tests/invariants/test_account_save_backup_failure_notice.py` ·
  `tests/deploy/backup_script_support.py` · `deploy/loop2-backup`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:33-36` To do 7, the backup ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:51-53` Acceptance criteria ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:90-94` question 7 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:113-116` Context ·
  `foundations/decisions.md:2266-2326` D-233 · `foundations/decisions.md:2378-2404` D-235 ·
  `foundations/invariants.md:1118-1137` account-save-backup-encrypted, account-save-backup-failure-notice ·
  `foundations/environment_facts.md:492-497` mikrus-pusher-mail · `foundations/part_map.md:153-188`
  deployment · `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** strongest — the cause of a failure seen once on an unchanged base has to be found and
  shown, not guessed.
- **Risk:** trust boundary — `deploy/**` (`deploy/loop2-backup`, where the cause lies there)
- **Checks:** the case alone at least 30 times, each a process of its own, through a runner in the
  executor's directory under `.runs/` that adds the paths `scripts/test.py` adds, counted · the same
  under load · `npm.cmd test -- tests/invariants/test_account_save_backup_failure_notice.py` ·
  `npm.cmd test -- tests/invariants/test_account_save_backup_encrypted.py`
- **Depends on:** Slice 16 (`tests/invariants/test_account_save_backup_failure_notice.py`,
  `tests/deploy/backup_script_support.py`)

## Passages of the task and the spec your *Read* names, copied word for word

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:33-36 — To do 7, the backup

7. Ustalona przyczyna każdego z sześciu testów padających losowo i naprawa testu albo skryptu, w którym leży przyczyna:
   - `tests/account-mail.test.mjs`, „a server that stops answering yields failed within the shortened deadline and loses the connection” — 1 na 3 pełne przebiegi w PR #79 (loop2#79-7);
   - `test_loop2_watch` `TheWindow.test_a_clock_that_stands_still_reads_no_window` — raz na niezmienionej bazie w PR #87 (loop2#87-2);
   - `test_account_save_backup_failure_notice` `EveryFailedEndCallsPusher.test_a_signal_with_a_trap_is_named_by_its_exit_code_in_the_log_too [INT]` — raz na niezmienionej bazie w PR #87, „0 != 130” (loop2#87-2);

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:51-53 — Acceptance criteria

### Acceptance criteria

- Test z punktu 7, którego porażki cykl nie odtworzy w co najmniej 30 osobnych uruchomieniach i 3 pełnych przebiegach bramki pod obciążeniem, zostaje bez zmian, PR opisuje, co próbowano, a na liście zadań zostaje linia na jego następne wystąpienie.

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:90-94 — question 7

- 7. Test padający losowo, którego przyczyny cykl nie odtworzy — kiedy cykl kończy szukanie i co zostawia?
  - Answer: po co najmniej 30 osobnych uruchomieniach i 3 pełnych przebiegach bramki pod obciążeniem; test zostaje bez zmian, PR opisuje próby, na liście zadań zostaje linia na następne wystąpienie (Acceptance criteria).
  - Not chosen:
    - bez progu, do skutku — cykl bez końca na teście, który pada raz na kilka przebiegów
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „7 a (30 i 3 zostają)”.

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:113-116 — Context

- Dane przeglądu: the note of the foundation review of 2026-11-13 in the author's notes, sekcje „G-6”, „F-13”, „F-14”, „F-30”, „2. Słabe punkty” (wiersze „test sięga węziej niż zdanie”, testy bez basha z Gita, `player-opaque-session-cookie`, mapa części) i „Sprawdzenia do zamówienia” (wiersze 17, 18, 20).
- Numery linii w danych przeglądu są z commita `1b0c8ad4`; po nim PR #88 zmienił m.in. `tests/sim/catch-up.test.mjs` i `tests/sim/saved-game.test.mjs`, więc miejsca szuka się po nazwie przypadku.
- Nazwy dwóch testów z loop2#87-2 pochodzą z dziennika bramki w zapisie cyklu: `git show 4955a906:docs/task-cycles/oboz-w-siedzibie/base-gate.log`, ok. linii 2509–2580.
- Pliki w `assets/sprites/` leżą płasko, bez katalogów paczek; dziś test `tests/view/icons.test.mjs` przypina dwie linie paczek (`PACK_LINES`: kurz i wilk).


## Entries and files your *Read* names (current ranges in the worktree as it stands now; where a range differs from the plan's, this one holds)

Foundation entries are addressed by their identifier, a decision by its heading `### D-NN`, an invariant, an environment fact, a glossary term or a part by `## <name>`; the range runs to the next heading. Read each whole.

- plan: `foundations/decisions.md:2266-2326` D-233 -> current: `foundations/decisions.md:2281-2340` D-233
- plan: `foundations/decisions.md:2378-2404` D-235 -> current: `foundations/decisions.md:2393-2418` D-235
- plan: `foundations/invariants.md:1118-1137` account-save-backup-encrypted, account-save-backup-failure-notice -> current: `foundations/invariants.md:1108-1116` account-save-backup-encrypted; `foundations/invariants.md:1118-1126` account-save-backup-failure-notice
- plan: `foundations/environment_facts.md:492-497` mikrus-pusher-mail -> current: `foundations/environment_facts.md:492-496` mikrus-pusher-mail
- plan: `foundations/part_map.md:153-188` deployment -> current: `foundations/part_map.md:153-188` deployment
- `guidelines/testing.md`
- `guidelines/coding.md`

The guideline files named are each read whole. Where you need something this handoff does not name, reach for it selectively (a foundation entry whole, never a whole file of the foundation) and name each reach in your report.

## Return

As the method's section on returning gives: the status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, the own-work check as the method gives it, each reach beyond this handoff, each working copy, and ends with **Unread material:** (what this handoff names that you did not read whole, with what you read, or `none`) and **Searches not found or unclear:** (each thing you looked for and did not find, or `none`).

## A reach of slice 19 for you, from the orchestrator (read the source before you rely on it)

Executor 19 (`.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-19-report.md`, section "Cause", point 5) found that the gate run of loop2#87 which failed your slice's case also held a second silent stand-in in the *watcher's* test: a stand-in process that left no record and ran none of its lines, with no output. It reports, in that same gate log (`git show 4955a906:docs/task-cycles/oboz-w-siedzibie/base-gate.log`, lines 2552-2576), that in your case the `docker` stand-in of the backup also left no record and did not send its signal, while its `timeout … docker exec` stage still read status 0. It also reports that gate run being about 45% slower than its two neighbours. This is its reading of a log, not a result of yours: check it against the log and the code yourself, and say in your report whether it holds, holds in part or not. Its probe of starting a stand-in (alone and under 24 loops of process starts) found no bad start, and its 150 runs of the watcher's case under five kinds of load all passed; the kinds of load it used are listed in its report and may be reused as a starting point, not a limit.
