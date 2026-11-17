# Handoff — executor of slice 18: flaky: the transport refusal under the helper's fixed deadline

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
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-18-report.md`. Your directory for working copies: `.runs/executor-18/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return, with `git worktree remove --force` then `git worktree prune` for a worktree, and state in the report where each stood and that it was removed.)

## Your slice, copied word for word from the plan

### Slice 18 — flaky: the transport refusal under the helper's fixed deadline

- **Goal:** the cause of the failure of „transport refuses ambiguous proxy metadata before loading
  live sessions” in `tests/transport.test.mjs` — `HTTP deadline exceeded` after 7678 ms against the
  5000 ms of the file's helper of requests, in a full run on `76389bff` (To do 7, fifth test) — is
  established as in Slice 17: at least 30 separate runs of the case, alone and under the load of other
  tests running at the same time, every run counted; the probable cause the task names (a fixed
  deadline of 5 s under the load of a full run) is confirmed or refuted by evidence, and a repair
  lies where the cause lies and gives it as its reason (*Changing an existing test*; D-84's waits with
  a limit); the case then passes at least 30 further separate runs. A cause found in `src/server/`
  changes no file of it: the slice returns `blocked` naming the cause, for a slice with a review of its
  own. Where the failure does not come back, nothing changes and the report gives every attempt and
  says the case needs the orchestrator's 3 full gate runs under load.
- **Change:** `tests/transport.test.mjs`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:33-33` To do 7 ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:38-38` the transport test ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:51-53` Acceptance criteria ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:90-94` question 7 ·
  `foundations/decisions.md:963-977` D-84 · `foundations/decisions.md:1042-1056` D-49 ·
  `foundations/decisions.md:2662-2688` D-110 · `foundations/invariants.md:748-757`
  account-request-transport · `foundations/part_map.md:66-88` account-server · `guidelines/testing.md` ·
  `guidelines/coding.md`
- **Model:** strongest — the cause of a failure seen once has to be found and shown, not guessed.
- **Risk:** none
- **Checks:** `npm.cmd run build` once, then the case alone at least 30 times as
  `node --test --test-name-pattern="transport refuses ambiguous proxy metadata" tests/transport.test.mjs`,
  each a process of its own, counted · the same under load · `npm.cmd test -- tests/transport.test.mjs`
- **Depends on:** Slice 9 (`tests/transport.test.mjs`)

## Passages of the task and the spec your *Read* names, copied word for word

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:33-33 — To do 7

7. Ustalona przyczyna każdego z sześciu testów padających losowo i naprawa testu albo skryptu, w którym leży przyczyna:

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:38-38 — the transport test

   - `tests/transport.test.mjs`, „transport refuses ambiguous proxy metadata before loading live sessions” — `HTTP deadline exceeded` po 7678 ms wobec 5000 ms terminu pomocnika żądań (`tests/transport.test.mjs:135`) w pierwszym pełnym przebiegu na `76389bff` w PR #88, sam w pięciu przebiegach 0,53–0,70 s; prawdopodobna przyczyna to stały termin 5 s pod obciążeniem pełnego przebiegu (loop2#88, „Findings outside the task's scope” 2; dopisane przez doradcę dnia 2026-11-14 za zgodą Mariusza);

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:51-53 — Acceptance criteria

### Acceptance criteria

- Test z punktu 7, którego porażki cykl nie odtworzy w co najmniej 30 osobnych uruchomieniach i 3 pełnych przebiegach bramki pod obciążeniem, zostaje bez zmian, PR opisuje, co próbowano, a na liście zadań zostaje linia na jego następne wystąpienie.

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:90-94 — question 7

- 7. Test padający losowo, którego przyczyny cykl nie odtworzy — kiedy cykl kończy szukanie i co zostawia?
  - Answer: po co najmniej 30 osobnych uruchomieniach i 3 pełnych przebiegach bramki pod obciążeniem; test zostaje bez zmian, PR opisuje próby, na liście zadań zostaje linia na następne wystąpienie (Acceptance criteria).
  - Not chosen:
    - bez progu, do skutku — cykl bez końca na teście, który pada raz na kilka przebiegów
  - Source: doradca dnia w imieniu Mariusza, 2026-11-13: „7 a (30 i 3 zostają)”.


## Entries and files your *Read* names (current ranges in the worktree as it stands now; where a range differs from the plan's, this one holds)

Foundation entries are addressed by their identifier, a decision by its heading `### D-NN`, an invariant, an environment fact, a glossary term or a part by `## <name>`; the range runs to the next heading. Read each whole.

- plan: `foundations/decisions.md:963-977` D-84 -> current: `foundations/decisions.md:963-976` D-84
- plan: `foundations/decisions.md:1042-1056` D-49 -> current: `foundations/decisions.md:1057-1070` D-49
- plan: `foundations/decisions.md:2662-2688` D-110 -> current: `foundations/decisions.md:2677-2702` D-110
- plan: `foundations/invariants.md:748-757` account-request-transport -> current: `foundations/invariants.md:748-756` account-request-transport
- plan: `foundations/part_map.md:66-88` account-server -> current: `foundations/part_map.md:66-88` account-server
- `guidelines/testing.md`
- `guidelines/coding.md`

The guideline files named are each read whole. Where you need something this handoff does not name, reach for it selectively (a foundation entry whole, never a whole file of the foundation) and name each reach in your report.

## Return

As the method's section on returning gives: the status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, the own-work check as the method gives it, each reach beyond this handoff, each working copy, and ends with **Unread material:** (what this handoff names that you did not read whole, with what you read, or `none`) and **Searches not found or unclear:** (each thing you looked for and did not find, or `none`).
