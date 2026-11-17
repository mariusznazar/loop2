# Handoff — executor of slice 22: flaky: the built image's icons when Docker could not begin the build

You make one slice of a plan for the task cycle `implement-task`; another agent reviews the whole change with `review-change`.

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human; send a question to the orchestrator in your report with the status `questions`, and a missing fact or permission with `blocked`.
- Worktree (work only from its root): `the repository's root`, branch `task/luki-w-testach-z-przegladu`. **Base of this slice: `74e5365c62267d3e3b7f076f99c316aff13cab90`** (the range of your commits starts here). Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. The worktree has `node_modules` (installed from the lockfile) and `.runs/quality-venv` (ruff, shellcheck), made by the orchestrator; `dist/` is built only where the slice's checks say `npm.cmd run build`.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"** — read `.the-way/task-cycle/change/slice.md` as the `SKILL.md` gives. Read the `SKILL.md` whole, and a file it names only when its step comes. You have no skill tool: a skill a file names by its name alone is the `SKILL.md` whose frontmatter `name:` is that name, read as a file under `.the-way`.
- Class of model: the strongest class the human allows (Opus; never `fable`).
- Trust boundary answer of the cycle: yes (the files the part map names as boundaries, among them `src/server/**`, `src/browser/sim/saved-game.ts`, `deploy/**`, `assets/sprites/**`); irreversible operation: no. Where your slice's *Risk* names a boundary the review of it checks crafted input there.
- You never run the product's gate (`npm.cmd test` without a file, `python -B .the-way/task-cycle/gate_times.py`): it is the orchestrator's alone. The focused checks your slice names you run, each with its command and exit code in your report.
- Citations: where you add or change an `// invariant: <id>` or `// decision: D-NN "..."` comment, run `python -B .the-way/elements/common/foundation_check.py` before you commit and put its command and exit code in the report; a quotation after `decision:` must be a passage that begins a sentence of the decision's text, word for word (an earlier slice failed that check, unnoticed until the orchestrator ran it). Where the check reports an error that your change did not cause, name it and the file and line.
- Commits: messages in English in the form of the existing ones (`git log -8 --format=%s`); `git add` by path, never `-A` or `.`; commit your work in your slice's range; leave the worktree clean (`git status --short` empty) when you return. Where you change a file temporarily to see a test fail, restore it byte for byte (`git checkout -- <file>` or `git diff` empty) before you commit, and say so in the report.
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-22-report.md`. Your directory for working copies: `.runs/executor-22/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return, with `git worktree remove --force` then `git worktree prune` for a worktree, and state in the report where each stood and that it was removed.)

## Your slice, copied word for word from the plan

### Slice 22 — flaky: the built image's icons when Docker could not begin the build

- **Goal:** the cause of the failure of `test_built_image_serves_every_icon_and_the_page` in
  `tests/deploy/test_loop2_image_icons.py` — Docker did not begin the build because its settings file
  was held by another process while a second full run of the tests ran at the same time (To do 7,
  sixth test) — is established as in Slice 17: at least 30 separate runs of the file, and runs of two
  focused runs of it at the same time from a stopped Docker Desktop, every run counted (a Docker
  daemon through `docker_gate`; where none answers, reported not run); the repair lies where the cause
  lies — the case, or the start of Docker Desktop in `scripts/docker_gate.py` with its test
  `tests/quality/test_docker_gate.py` — and the file then passes at least 30 further separate runs. A
  repair that changes what D-390, D-391, D-392 or D-406 say returns `blocked` naming it. A cause in
  Docker Desktop alone, which no file of the repository can answer, leaves every file unchanged, and
  the report says so with its evidence and that the case needs the orchestrator's 3 full gate runs
  under load.
- **Change:** `tests/deploy/test_loop2_image_icons.py` · `scripts/docker_gate.py` ·
  `tests/quality/test_docker_gate.py`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:33-33` To do 7 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:39-39` the image test ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:51-53` Acceptance criteria ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:90-99` questions 7 and 8 ·
  `foundations/decisions.md:1350-1396` D-390, D-391, D-392 · `foundations/decisions.md:1412-1426` D-406 ·
  `foundations/invariants.md:1308-1317` gate-docker-start-waits-once · `foundations/invariants.md:343-353`
  loop2-container-icons · `foundations/environment_facts.md:804-809` docker-desktop-start-detach ·
  `foundations/environment_facts.md:888-893` windows-file-lock-release-at-process-end ·
  `tests/quality/docker_standin.py` · `foundations/part_map.md:90-124` build-tools ·
  `foundations/part_map.md:153-188` deployment · `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** strongest — the cause of a failure seen once between two runs at the same time has to be
  found and shown, not guessed.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/deploy/test_loop2_image_icons.py` at least 30 times, each a
  process of its own, counted, and in pairs at the same time · `npm.cmd test -- tests/quality/test_docker_gate.py`
- **Depends on:** none

## Passages of the task and the spec your *Read* names, copied word for word

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:33-33 — To do 7

7. Ustalona przyczyna każdego z sześciu testów padających losowo i naprawa testu albo skryptu, w którym leży przyczyna:

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:39-39 — the image test

   - `test_built_image_serves_every_icon_and_the_page` — Docker nie zaczął budowy obrazu, bo jego plik ustawień był zajęty przez inny proces; w tym samym czasie biegł drugi pełny przebieg testów; sam przechodzi (3,6 s); na Linuksie w CI zielony (loop2#136, „Fix or let through” 1; dopisane przez doradcę dnia 2026-11-16).

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:51-53 — Acceptance criteria

### Acceptance criteria

- Test z punktu 7, którego porażki cykl nie odtworzy w co najmniej 30 osobnych uruchomieniach i 3 pełnych przebiegach bramki pod obciążeniem, zostaje bez zmian, PR opisuje, co próbowano, a na liście zadań zostaje linia na jego następne wystąpienie.

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:90-99 — questions 7 and 8

- 7. Test padający losowo, którego przyczyny cykl nie odtworzy — kiedy cykl kończy szukanie i co zostawia?
  - Answer: po co najmniej 30 osobnych uruchomieniach i 3 pełnych przebiegach bramki pod obciążeniem; test zostaje bez zmian, PR opisuje próby, na liście zadań zostaje linia na następne wystąpienie (Acceptance criteria).
  - Not chosen:
    - bez progu, do skutku — cykl bez końca na teście, który pada raz na kilka przebiegów
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „7 a (30 i 3 zostają)”.
- 8. Czekać na scalenie PR #89 (testy same włączają Dockera), który zmienia te same pliki testów kontenera?
  - Answer: czekać; linia zadania ma zależność od zadania linii 63.
  - Not chosen:
    - bez czekania — konflikty w `tests/deploy/test_account_storage.py` i pliku testu kontenera, a do diagnozy testu kontenera trzeba ręcznie włączać Dockera
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „8 a”.


## Entries and files your *Read* names (current ranges in the worktree as it stands now; where a range differs from the plan's, this one holds)

Foundation entries are addressed by their identifier, a decision by its heading `### D-NN`, an invariant, an environment fact, a glossary term or a part by `## <name>`; the range runs to the next heading. Read each whole.

- plan: `foundations/decisions.md:1350-1396` D-390, D-391, D-392 -> current: `foundations/decisions.md:1365-1380` D-390; `foundations/decisions.md:1382-1395` D-391; `foundations/decisions.md:1397-1410` D-392
- plan: `foundations/decisions.md:1412-1426` D-406 -> current: `foundations/decisions.md:1427-1440` D-406
- plan: `foundations/invariants.md:1308-1317` gate-docker-start-waits-once -> current: `foundations/invariants.md:1298-1306` gate-docker-start-waits-once
- plan: `foundations/invariants.md:343-353` loop2-container-icons -> current: `foundations/invariants.md:343-352` loop2-container-icons
- plan: `foundations/environment_facts.md:804-809` docker-desktop-start-detach -> current: `foundations/environment_facts.md:804-808` docker-desktop-start-detach
- plan: `foundations/environment_facts.md:888-893` windows-file-lock-release-at-process-end -> current: `foundations/environment_facts.md:888-892` windows-file-lock-release-at-process-end
- `tests/quality/docker_standin.py`
- plan: `foundations/part_map.md:90-124` build-tools -> current: `foundations/part_map.md:90-124` build-tools
- plan: `foundations/part_map.md:153-188` deployment -> current: `foundations/part_map.md:153-188` deployment
- `guidelines/testing.md`
- `guidelines/coding.md`

The guideline files named are each read whole. Where you need something this handoff does not name, reach for it selectively (a foundation entry whole, never a whole file of the foundation) and name each reach in your report.

## Return

As the method's section on returning gives: the status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, the own-work check as the method gives it, each reach beyond this handoff, each working copy, and ends with **Unread material:** (what this handoff names that you did not read whole, with what you read, or `none`) and **Searches not found or unclear:** (each thing you looked for and did not find, or `none`).
