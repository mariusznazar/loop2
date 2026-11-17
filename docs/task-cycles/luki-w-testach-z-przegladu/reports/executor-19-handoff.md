# Handoff — executor of slice 19: flaky: the failure watcher's window under a clock that stands still

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
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-19-report.md`. Your directory for working copies: `.runs/executor-19/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return, with `git worktree remove --force` then `git worktree prune` for a worktree, and state in the report where each stood and that it was removed.)

## Your slice, copied word for word from the plan

### Slice 19 — flaky: the failure watcher's window under a clock that stands still

- **Goal:** the cause of the failure of `TheWindow.test_a_clock_that_stands_still_reads_no_window` in
  `tests/deploy/test_loop2_watch.py` — once on an unchanged base in loop2#87 (To do 7, second test;
  its log stands in `git show 4955a906:docs/task-cycles/oboz-w-siedzibie/base-gate.log`, about lines
  2509–2580) — is established as in Slice 17, with at least 30 separate runs of the case, alone and
  under load, every run counted, and repaired where the cause lies: the case, the support of the
  watcher's stand-ins or the watcher `deploy/loop2-watch`; the case then passes at least 30 further
  separate runs, and `tests/deploy/test_loop2_watch_message.py` still passes. Where the failure does not
  come back, nothing changes and the report gives every attempt and says the case needs the
  orchestrator's 3 full gate runs under load.
- **Change:** `tests/deploy/test_loop2_watch.py` · `tests/deploy/watch_script_support.py` ·
  `deploy/loop2-watch`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:33-35` To do 7, the watcher ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:51-53` Acceptance criteria ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:90-94` question 7 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:113-116` Context ·
  `foundations/decisions.md:2058-2076` D-356 · `foundations/decisions.md:2378-2404` D-235 ·
  `foundations/invariants.md:1258-1267` failure-watcher-message · `foundations/environment_facts.md:492-497`
  mikrus-pusher-mail · `foundations/part_map.md:153-188` deployment · `guidelines/testing.md` ·
  `guidelines/coding.md`
- **Model:** strongest — the cause of a failure seen once on an unchanged base has to be found and
  shown, not guessed.
- **Risk:** trust boundary — `deploy/**` (`deploy/loop2-watch`, where the cause lies there)
- **Checks:** the case alone at least 30 times, each a process of its own, through a runner in the
  executor's directory under `.runs/` that adds the paths `scripts/test.py` adds, counted · the same
  under load · `npm.cmd test -- tests/deploy/test_loop2_watch.py` ·
  `npm.cmd test -- tests/deploy/test_loop2_watch_message.py`
- **Depends on:** Slice 16 (`tests/deploy/watch_script_support.py`)

## Passages of the task and the spec your *Read* names, copied word for word

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:33-35 — To do 7, the watcher

7. Ustalona przyczyna każdego z sześciu testów padających losowo i naprawa testu albo skryptu, w którym leży przyczyna:
   - `tests/account-mail.test.mjs`, „a server that stops answering yields failed within the shortened deadline and loses the connection” — 1 na 3 pełne przebiegi w PR #79 (loop2#79-7);
   - `test_loop2_watch` `TheWindow.test_a_clock_that_stands_still_reads_no_window` — raz na niezmienionej bazie w PR #87 (loop2#87-2);

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

- plan: `foundations/decisions.md:2058-2076` D-356 -> current: `foundations/decisions.md:2073-2086` D-356
- plan: `foundations/decisions.md:2378-2404` D-235 -> current: `foundations/decisions.md:2393-2418` D-235
- plan: `foundations/invariants.md:1258-1267` failure-watcher-message -> current: `foundations/invariants.md:1248-1256` failure-watcher-message
- plan: `foundations/environment_facts.md:492-497` mikrus-pusher-mail -> current: `foundations/environment_facts.md:492-496` mikrus-pusher-mail
- plan: `foundations/part_map.md:153-188` deployment -> current: `foundations/part_map.md:153-188` deployment
- `guidelines/testing.md`
- `guidelines/coding.md`

The guideline files named are each read whole. Where you need something this handoff does not name, reach for it selectively (a foundation entry whole, never a whole file of the foundation) and name each reach in your report.

## Return

As the method's section on returning gives: the status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, the own-work check as the method gives it, each reach beyond this handoff, each working copy, and ends with **Unread material:** (what this handoff names that you did not read whole, with what you read, or `none`) and **Searches not found or unclear:** (each thing you looked for and did not find, or `none`).
