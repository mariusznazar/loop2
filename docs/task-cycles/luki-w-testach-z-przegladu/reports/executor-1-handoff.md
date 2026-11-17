# Handoff — executor of slice 1: the start and the container's replacement cite the invariants that stay

You make one slice of a plan for the task cycle `implement-task`; another agent reviews the whole change with `review-change`.

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human; send a question to the orchestrator in your report with the status `questions`, and a missing fact or permission with `blocked`.
- Worktree (work only from its root): `the repository's root`, branch `task/luki-w-testach-z-przegladu`. **Base of this slice: `8b32706d1cedef554e63199d2d6e195893e4e979`** (the range of your commits starts here). Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. The worktree has `node_modules` (installed from the lockfile) and `.runs/quality-venv` (ruff, shellcheck), made by the orchestrator; `dist/` is built only where the slice's checks say `npm.cmd run build`.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"** — read `.the-way/task-cycle/change/slice.md` as the `SKILL.md` gives. Read the `SKILL.md` whole, and a file it names only when its step comes. You have no skill tool: a skill a file names by its name alone is the `SKILL.md` whose frontmatter `name:` is that name, read as a file under `.the-way`.
- Class of model: same as the orchestrator's class (Sonnet 5.5).
- Trust boundary answer of the cycle: yes (the files the part map names as boundaries, among them `src/server/**`, `src/browser/sim/saved-game.ts`, `deploy/**`, `assets/sprites/**`); irreversible operation: no. Where your slice's *Risk* names a boundary the review of it checks crafted input there.
- You never run the product's gate (`npm.cmd test` without a file, `python -B .the-way/task-cycle/gate_times.py`): it is the orchestrator's alone. The focused checks your slice names you run, each with its command and exit code in your report.
- Commits: messages in English in the form of the existing ones (`git log -8 --format=%s`); `git add` by path, never `-A` or `.`; commit your work in your slice's range; leave the worktree clean (`git status --short` empty) when you return. Where you change a file temporarily to see a test fail, restore it byte for byte (`git checkout -- <file>` or `git diff` empty) before you commit, and say so in the report.
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-1-report.md`. Your directory for working copies: `.runs/executor-1/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return, with `git worktree remove --force` then `git worktree prune` for a worktree, and state in the report where each stood and that it was removed.)

## Your slice, copied word for word from the plan

### Slice 1 — the start and the container's replacement cite the invariants that stay

- **Goal:** the case „configured startup refuses unknown schema and unavailable database before
  readiness” of `tests/startup.test.mjs` cites `account-database-schema` in place of
  `account-schema-lifecycle`, and the case `test_replaced_container_keeps_accounts_and_sessions` of
  `tests/deploy/test_account_storage.py` cites `account-save-durable-storage` in its place (To do 11
  and 12), whose *Method* the *Foundation entries* set to `test`. Each case is seen failing once
  against the code it checks broken for a moment — for example the start's reading of the schema
  version in `src/server/database.ts` made to pass an unknown version, and the database path that
  `compose.yaml` gives the `app` service moved outside its volume — and restored byte for byte; the
  report names each break, its command and its red output. The docstring of
  `tests/deploy/test_account_storage.py`, which says `account-save-durable-storage` is checked by
  review and left out, is brought in line with the citation. No product code changes in the slice's
  commits, and `foundations/invariants.md` is not touched here (Slice 2 rewords and withdraws).
- **Change:** `tests/startup.test.mjs` · `tests/deploy/test_account_storage.py`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:43-44` To do 11 and 12 ·
  `foundations/invariants.md:768-787` account-schema-lifecycle, account-database-schema ·
  `foundations/invariants.md:688-697` account-save-durable-storage ·
  `foundations/decisions.md:2715-2731` D-112 (its *Verification* as the row of *Foundation entries*
  changes it) · `foundations/decisions.md:2689-2714` D-111 · `foundations/decisions.md:3658-3686` D-205 ·
  `foundations/decisions.md:1776-1801` D-17 · `foundations/decisions.md:1350-1366` D-390 ·
  `foundations/environment_facts.md:366-371` node-sqlite-database ·
  `foundations/environment_facts.md:420-425` docker-volume-lifecycle ·
  `foundations/environment_facts.md:744-761` docker-compose-down-volumes, docker-volume-prune-scope,
  docker-system-prune-volumes · `foundations/part_map.md:66-88` account-server ·
  `foundations/part_map.md:153-188` deployment · `src/server/database.ts` · `compose.yaml` ·
  `guidelines/testing.md` · `guidelines/coding.md`
- **Model:** same — two citations moved, each case seen failing against code broken for a moment and
  restored exactly, one of them in a container.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/startup.test.mjs` ·
  `npm.cmd test -- tests/deploy/test_account_storage.py` (it needs a Docker daemon, which
  `scripts/test.py` asks of `docker_gate`; where none answers, report it not run) ·
  `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` passes ·
  `git status --short -- src compose.yaml Dockerfile deploy` shows nothing
- **Depends on:** Foundation entries (D-112's *Verification*, account-save-durable-storage's *Method*)

## Passages of the task and the spec your *Read* names, copied word for word

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:43-44 — To do 11 and 12

11. F-14 — metoda `test` i znaczniki w testach, które je sprawdzają, dla `player-express-session-sqlite-store`, `player-self-registration`, `player-password-login`, `email-verification-nonblocking`, `account-save-durable-storage` (znacznik z `tests/deploy/test_account_storage.py`, przypadek `test_replaced_container_keeps_accounts_and_sessions`, przepięty z `account-schema-lifecycle`) i `loop2-shared-public-origin` (powołanie w testach `account-client-requests`).
12. F-30 — `account-schema-lifecycle` wycofany do *Withdrawn identifiers*; `account-database-schema` mówi też „before readiness” i o linkach z maili; znaczniki w `tests/account-storage.test.mjs` przepięte na `account-database-schema`; *Verification* D-112 bez `account-schema-lifecycle`.


## Entries and files your *Read* names (current ranges in the worktree as it stands now; where a range differs from the plan's, this one holds)

Foundation entries are addressed by their identifier, a decision by its heading `### D-NN`, an invariant, an environment fact, a glossary term or a part by `## <name>`; the range runs to the next heading. Read each whole.

- plan: `foundations/invariants.md:768-787` account-schema-lifecycle, account-database-schema -> current: `foundations/invariants.md:768-776` account-schema-lifecycle; `foundations/invariants.md:778-786` account-database-schema
- plan: `foundations/invariants.md:688-697` account-save-durable-storage -> current: `foundations/invariants.md:688-696` account-save-durable-storage
- plan: `foundations/decisions.md:2715-2731` D-112 (its *Verification* as the row of *Foundation entries*   changes it) -> current: `foundations/decisions.md:2730-2745` D-112
- plan: `foundations/decisions.md:2689-2714` D-111 -> current: `foundations/decisions.md:2704-2728` D-111
- plan: `foundations/decisions.md:3658-3686` D-205 -> current: `foundations/decisions.md:3673-3700` D-205
- plan: `foundations/decisions.md:1776-1801` D-17 -> current: `foundations/decisions.md:1791-1815` D-17
- plan: `foundations/decisions.md:1350-1366` D-390 -> current: `foundations/decisions.md:1365-1380` D-390
- plan: `foundations/environment_facts.md:366-371` node-sqlite-database -> current: `foundations/environment_facts.md:366-370` node-sqlite-database
- plan: `foundations/environment_facts.md:420-425` docker-volume-lifecycle -> current: `foundations/environment_facts.md:420-424` docker-volume-lifecycle
- plan: `foundations/environment_facts.md:744-761` docker-compose-down-volumes, docker-volume-prune-scope,   docker-system-prune-volumes -> current: `foundations/environment_facts.md:744-748` docker-compose-down-volumes; `foundations/environment_facts.md:750-754` docker-volume-prune-scope; `foundations/environment_facts.md:756-760` docker-system-prune-volumes
- plan: `foundations/part_map.md:66-88` account-server -> current: `foundations/part_map.md:66-88` account-server
- plan: `foundations/part_map.md:153-188` deployment -> current: `foundations/part_map.md:153-188` deployment
- `src/server/database.ts`
- `compose.yaml`
- `guidelines/testing.md`
- `guidelines/coding.md`

The guideline files named are each read whole. Where you need something this handoff does not name, reach for it selectively (a foundation entry whole, never a whole file of the foundation) and name each reach in your report.

## Return

As the method's section on returning gives: the status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, the own-work check as the method gives it, each reach beyond this handoff, each working copy, and ends with **Unread material:** (what this handoff names that you did not read whole, with what you read, or `none`) and **Searches not found or unclear:** (each thing you looked for and did not find, or `none`).
