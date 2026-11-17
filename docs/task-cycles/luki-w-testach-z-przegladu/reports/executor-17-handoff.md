# Handoff — executor of slice 17: flaky: the mailer's shortened deadline

You make one slice of a plan for the task cycle `implement-task`; another agent reviews the whole change with `review-change`.

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human; send a question to the orchestrator in your report with the status `questions`, and a missing fact or permission with `blocked`.
- Worktree (work only from its root): `the repository's root`, branch `task/luki-w-testach-z-przegladu`. **Base of this slice: `8ac7ca4e2134bd3720eb2fb38a4b8bef45f9147f`** (the range of your commits starts here). Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. The worktree has `node_modules` (installed from the lockfile) and `.runs/quality-venv` (ruff, shellcheck), made by the orchestrator; `dist/` is built only where the slice's checks say `npm.cmd run build`.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"** — read `.the-way/task-cycle/change/slice.md` as the `SKILL.md` gives. Read the `SKILL.md` whole, and a file it names only when its step comes. You have no skill tool: a skill a file names by its name alone is the `SKILL.md` whose frontmatter `name:` is that name, read as a file under `.the-way`.
- Class of model: the strongest class the human allows (Opus; never `fable`).
- Trust boundary answer of the cycle: yes (the files the part map names as boundaries, among them `src/server/**`, `src/browser/sim/saved-game.ts`, `deploy/**`, `assets/sprites/**`); irreversible operation: no. Where your slice's *Risk* names a boundary the review of it checks crafted input there.
- You never run the product's gate (`npm.cmd test` without a file, `python -B .the-way/task-cycle/gate_times.py`): it is the orchestrator's alone. The focused checks your slice names you run, each with its command and exit code in your report.
- Citations: where you add or change an `// invariant: <id>` or `// decision: D-NN "..."` comment, run `python -B .the-way/elements/common/foundation_check.py` before you commit and put its command and exit code in the report; a quotation after `decision:` must be a passage that begins a sentence of the decision's text, word for word (an earlier slice failed that check, unnoticed until the orchestrator ran it). Where the check reports an error that your change did not cause, name it and the file and line.
- Commits: messages in English in the form of the existing ones (`git log -8 --format=%s`); `git add` by path, never `-A` or `.`; commit your work in your slice's range; leave the worktree clean (`git status --short` empty) when you return. Where you change a file temporarily to see a test fail, restore it byte for byte (`git checkout -- <file>` or `git diff` empty) before you commit, and say so in the report.
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-17-report.md`. Your directory for working copies: `.runs/executor-17/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return, with `git worktree remove --force` then `git worktree prune` for a worktree, and state in the report where each stood and that it was removed.)

## Your slice, copied word for word from the plan

### Slice 17 — flaky: the mailer's shortened deadline

- **Goal:** the cause of the failure of „a server that stops answering yields failed within the
  shortened deadline and loses the connection” in `tests/account-mail.test.mjs` (To do 7, first
  test; one full run in three in loop2#79) is established, not guessed: the case runs at least 30
  times in separate processes, alone and with the computer under the load of other tests running at
  the same time, every run counted; the cause found is shown by its evidence (the run that failed,
  what it measured, a reproduction that fails on purpose) and repaired where it lies — the case's own
  waiting, or the mailer's handling of its deadline in `src/server/account-mail.ts` — and the case
  then passes at least 30 further separate runs. A repair gives its cause as the reason of every
  changed wait or limit (*Changing an existing test*); no limit is lengthened without one. Where the
  failure does not come back, the slice changes no file and its report gives every attempt — count,
  conditions, results — and says the case needs the orchestrator's 3 full gate runs under load
  (acceptance criterion).
- **Change:** `tests/account-mail.test.mjs` · `src/server/account-mail.ts`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:33-34` To do 7, the mailer ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:51-53` Acceptance criteria ·
  `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:90-94` question 7 ·
  `foundations/decisions.md:3297-3326` D-162, D-163 · `foundations/decisions.md:3178-3190` D-154 ·
  `foundations/decisions.md:963-977` D-84 · `foundations/invariants.md:938-947`
  account-email-nodemailer-starttls · `foundations/environment_facts.md:444-449` nodemailer-require-tls ·
  `guidelines/coding-mail-sending.md` · `foundations/part_map.md:66-88` account-server ·
  `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** strongest — the cause of a failure seen once in three full runs has to be found and
  shown, not guessed.
- **Risk:** trust boundary — `src/server/**` (`src/server/account-mail.ts`, where the cause lies there)
- **Checks:** `npm.cmd run build` once, then the case alone at least 30 times as
  `node --test --test-name-pattern="a server that stops answering" tests/account-mail.test.mjs`, each
  a process of its own, with the count of passes and failures in the report · the same under load ·
  `npm.cmd test -- tests/account-mail.test.mjs`
- **Depends on:** none

## Passages of the task and the spec your *Read* names, copied word for word

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:33-34 — To do 7, the mailer

7. Ustalona przyczyna każdego z sześciu testów padających losowo i naprawa testu albo skryptu, w którym leży przyczyna:
   - `tests/account-mail.test.mjs`, „a server that stops answering yields failed within the shortened deadline and loses the connection” — 1 na 3 pełne przebiegi w PR #79 (loop2#79-7);

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

- plan: `foundations/decisions.md:3297-3326` D-162, D-163 -> current: `foundations/decisions.md:3312-3325` D-162; `foundations/decisions.md:3327-3340` D-163
- plan: `foundations/decisions.md:3178-3190` D-154 -> current: `foundations/decisions.md:3193-3204` D-154
- plan: `foundations/decisions.md:963-977` D-84 -> current: `foundations/decisions.md:963-976` D-84
- plan: `foundations/invariants.md:938-947` account-email-nodemailer-starttls -> current: `foundations/invariants.md:928-936` account-email-nodemailer-starttls
- plan: `foundations/environment_facts.md:444-449` nodemailer-require-tls -> current: `foundations/environment_facts.md:444-448` nodemailer-require-tls
- `guidelines/coding-mail-sending.md`
- plan: `foundations/part_map.md:66-88` account-server -> current: `foundations/part_map.md:66-88` account-server
- `guidelines/testing.md`
- `guidelines/coding.md`

The guideline files named are each read whole. Where you need something this handoff does not name, reach for it selectively (a foundation entry whole, never a whole file of the foundation) and name each reach in your report.

## Return

As the method's section on returning gives: the status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, the own-work check as the method gives it, each reach beyond this handoff, each working copy, and ends with **Unread material:** (what this handoff names that you did not read whole, with what you read, or `none`) and **Searches not found or unclear:** (each thing you looked for and did not find, or `none`).
