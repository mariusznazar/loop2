# Handoff — one author: Testy loop2 bez stałego portu 3000 i przepięcie the way

## Delegation and boundary

The person who requested this cycle (the product's owner) delegated intermediate choices to the
cycle's orchestrator. You are the **one author without a plan** of a the-way task cycle. Follow the
project skill `the-way-make-change` (read `.the-way/task-cycle/change/` through that skill whole, and
what it names). Your stage: make the whole change with its code, its tests and its foundation step,
commit it on the task branch, run the checks, write your report and **return before review**. Do not
review your own change, open any pull request, push, merge or ask the human; send questions to the
orchestrator by returning `questions`. Never start another stage.

- Worktree: `C:\Storage\repos\loop2-wt\testy-bez-portu-3000` (work only here; reading elsewhere is fine)
- Branch: `task/testy-bez-portu-3000`, base `db3253c826d6b20a349e7b175fd30d0910051c15` (`main`)
- Frozen task: `.runs/task-cycles/testy-bez-portu-3000/task.md` in the worktree — read it **whole**
- Report path: `.runs/task-cycles/testy-bez-portu-3000/reports/01-author-report.md`
- The repository's rules: `AGENTS.md` and `guidelines/coding.md` of the worktree; every test runs with `npm test`
- Commit messages in English, in the repository's style (`git log --oneline -15`); stage files by
  path (`git add <path> …`), never `git add -A`/`.`/`-a`. Never force-push; do not push at all.

## Answers of step 4 (two questions at start)

- Trust boundary: **no**. The change touches tests and their helper (`account-server`,
  `build-tools`), `README.md`, the `.the-way` gitlink with installer-owned files (`agent-workflow`) and
  `foundations/**`; none is a trust boundary of `foundations/part_map.md`. `src/server/**` stays
  unchanged (task, *Out of scope*). If you find you must change `src/server/**`, say so in your
  report: the answer then becomes yes.
- Irreversible operation: **no**.
- Open design choice: none. Where the default-address test lives, whether a start retries once when
  its free port is taken in the short window (task, *Questions to settle* 1, "da się złagodzić jedną
  ponowną próbą startu"), and how the helper hands out the port are choices of how to make what the
  task settles: make them and name each in your report. If you meet a choice the task and the
  foundation do not settle (a foundation entry with more than one way open), return `returned` with
  no code, as `the-way-make-change` gives.

## Order of work

1. **First commit: the pin move** (task, *To do* 5), before any other change. Run the-way's
   installer from a checkout of the-way at `86b78ad`: clone `https://github.com/mariusznazar/the-way.git`
   into the worktree's ignored `.runs/` (for example `.runs/the-way-86b78ad`), check out
   `86b78ad`, then from the worktree root run the preview
   `python -B .runs/the-way-86b78ad/installation/install.py C:/Storage/repos/loop2-wt/testy-bez-portu-3000`
   and then the same with `--apply`, answering `y`. Follow `installation/README.md` § "Moving the pin"
   of that checkout. Commit the gitlink together with everything the installer rewrote (where nothing
   reads differently, the gitlink alone). Verify `git -C .the-way rev-parse HEAD` equals the gitlink
   afterwards. Example of an earlier pin-move commit: `acd2da3` (its subject and body). The cloned
   checkout stays under `.runs/` and is never committed. From here on read the-way's files from
   `.the-way` at `86b78ad`.
2. The test changes of *To do* 1–4, with the foundation step (below).
3. Run `npm test` on the new pin with the changed tests, plus the acceptance checks (below).

## What to read

Foundation entries (ranges in the worktree at the base; the pin move does not touch `foundations/`):

- Decision in play: **D-05** `foundations/decisions.md:94-114`.
- Decisions of the touched parts that bind test and script code: **D-28** `:623-637`, **D-29**
  `:638-652`, **D-30** `:653-665`, **D-32** `:681-695`. Read each whole.
- Invariants the work reaches: **loop2-api-error-route** `foundations/invariants.md:45-54`,
  **loop2-one-serving-process** `:55-64`, **account-server-occupied-address** `:95-104` (its
  *Derives from* cites the test title "exits with an error instead of reporting ready when port 3000
  is occupied" of `tests/startup.test.mjs`), **eslint-source-rules** `:390-399`,
  **ruff-source-rules** `:400-409`, **prettier-source-format** `:420-429`.
- Part map: entries `account-server`, `build-tools`, `agent-workflow`, `product-foundation` of
  `foundations/part_map.md` (the file is short; read it whole).
- Glossary: `foundations/glossary.md` whole, and the-way's `.the-way/foundations/glossary.md`.

Guidelines: `guidelines/coding.md` whole (no kind file applies: none of the touched files is an HTTP
application, browser, simulation or content-data module).

Task context worth starting from (from the task's *Context*): `PORT = 3000` and `port_in_use` in
`tests/invariants/loop2_invariant_support.py`; the first test of `tests/startup.test.mjs` (its second
test already uses `freePort()`); `READY_LINE` in `tests/invariants/test_account_server_occupied_address.py`;
the docstrings of `tests/invariants/test_loop2_api_error_route.py` and
`tests/invariants/test_loop2_one_serving_process.py` (with `PORT_WAIT`, the 300 s wait for port 3000,
which the free port makes unnecessary); `tests/quality/test_invariant_support.py` patches
`port_in_use`; `tests/quality/test_process_observation.py` uses 3000 only as sample data. The server
reads `LOOP2_LISTEN_HOST`/`LOOP2_LISTEN_PORT` in `src/server/main.ts:3-4`.

## Foundation step

Read the paragraph that opens "## Execute, verify and review" of `.the-way/task-cycle/skill/SKILL.md`
(the foundation step) whole and do it with your code, on the task branch:

- Row 1 of the task's *Settlements to record* → a decision, through the project skill
  `the-way-record-decision`.
- Row 2 → an invariant with method `test`, through `the-way-record-invariant`, checked by the
  default-address test (its line `invariant: <identifier>`, as the other invariant tests carry it).
- The citation in the *Derives from* of `account-server-occupied-address` where you change the title
  of the test it cites — through `the-way-record-invariant`.
- A part-map line for each new file git will track — through `the-way-update-part-map`.

Each writer searches the whole foundation once as its skill gives (WAY-33); where a row's settlement
is already stated, tie the row to that entry instead of writing a second one. Keep for the request
one sentence of each entry's meaning **in Polish** (the task document's language). A row whose
meaning cannot hold, or an entry needing a value neither the row nor the work gives, is returned as
`blocked` with the question — never written with another meaning.

## Checks and acceptance

Run and report each with its command and exit code (a claim that tests passed does not count):

- `npm test` from the worktree root on the final head (it runs the build, the Node tests, the-way's
  `gate/run_tests.py` and `foundation_check.py`).
- Acceptance 1: `npm test` passes while another process holds 127.0.0.1:3000 for the whole run (for
  example a small Node or Python listener started before and stopped after).
- Acceptance 2: two `npm test` runs started at the same time in two worktrees both pass. Make the
  second worktree a scratch `git worktree add --detach` at your head inside the task worktree's
  ignored `.runs/`, run `npm ci` there (and `git submodule update --init -- .the-way`), start both runs
  together, then remove the scratch worktree with `git worktree remove`.
- The failing run of the new invariant's test before its code exists, and its passing run, as
  `the-way-make-change` asks for an invariant test.

The base gate of `db3253c` is recorded by the orchestrator in
`.runs/task-cycles/testy-bez-portu-3000/reports/00-base-*.log`. What it found:

- `.runs/quality-venv` is installed in this worktree (ruff 0.17.1, ShellCheck 0.11.0); with it
  `tests/quality` passes on the base. A scratch worktree for acceptance 2 needs its own venv, made the
  same way (`README.md`, Windows section).
- **Failing on the base for this machine:** `tests/invariants/test_loop2_one_serving_process.py`
  errors in setUpClass because `Get-NetTCPConnection -State Listen` (and the CIM class
  `MSFT_NetTCPConnection`) returns no objects at all here, while `netstat -ano -p tcp` lists the
  listeners. That is the machine's, not the task's; do not change how the test observes listeners to
  get round it (outside the task). You change this file's port handling all the same: show what you
  can of it (for example that it builds its server on a free port and fails only at the listener
  query), and name the test as unchecked on this machine in your report. Every other directory of
  `npm test` is expected to pass, so an `npm test` exit 1 whose only failure is this one is the
  expected result — say so with the evidence; `foundation_check.py` is then not reached by the chain,
  so run it on its own as well.

## Return

Write your full report to the report path as `the-way-make-change` gives it, and return: status,
commits, a one-line check result naming what failed or did not run, and the report's path. Name in
the report every reach beyond this handoff (a file or entry you read or changed that it does not
name).
