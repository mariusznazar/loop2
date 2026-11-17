# Handoff — review of slice 17

You review one slice of a plan for the task cycle `implement-task` as an agent that did not make it (`review-change`).

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human.
- Worktree: `the repository's root`, branch `task/luki-w-testach-z-przegladu`. **Range to review: `8ac7ca4e..4bfc33cd`** (compute `git diff 8ac7ca4e..4bfc33cd` and `git log 8ac7ca4e..4bfc33cd` yourself; confirm `git rev-parse HEAD` is a descendant of `4bfc33cd` — the branch holds later commits of other slices above this range, which are not yours; if the slice has a fix commit above them it is named in the executor's report). Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), variant: **a planned slice**. Read it whole, and a file it names only when its step comes. You have no skill tool.
- Read-only: you write only your report, you change no tracked file; a break you want to try goes into a working copy of your own, never the worktree's tracked files.
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/review-slice-17-report.md`; its first line is `PASS 4bfc33cd` or `FAIL 4bfc33cd` as the method says. Your directory for working copies: `.runs/review-slice-17/`.
- Risk of this slice: the slice's *Risk* names a trust boundary (see its section below): check crafted input and the boundary as the method says. A slice that changes tests only, and no file of a boundary, is judged for what its tests show of the boundary.
- The executor's report is `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-17-report.md`: a set of claims to verify, not evidence.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return and state in the report where each stood and that it was removed.)

The slice's section, the passages of the task and the entries the executor was given follow word for word (the selection of its executor; judge the slice against the passages of the task, not the plan alone).

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

As the method's section on returning gives: the first line of your report (`PASS <sha>` or `FAIL <sha>`), graded findings, the checks you ran with their commands and exit codes, and the report path. The report ends with **Unread material:** and **Searches not found or unclear:** (each `none` where so).
