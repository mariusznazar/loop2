# Handoff — the trial tasks and their tests (the measurement material)

The person who requested this cycle (Mariusz) delegated intermediate choices to the cycle's
orchestrator; nothing you choose is his approval. Questions go to the orchestrator through your
report (`questions` status).

Method: `.the-way\task-cycle\change\SKILL.md`
(the pinned the-way; read it whole, and a file it names when the step that names it comes).
Variant: **the whole change as the one author**. Your "change" is test material that lives on a
branch of the measurement and is never merged into `main`; the method's checks that need product
code apply as far as they fit, and you say in the report where one does not.

Worktree: `the worktree of the trial tasks branch`, branch `trial/tasks`, base
`df0f1256fe7ff85bca7c77f938900d8932168719` (clean, `.the-way` checked out, `node_modules` linked).
Commit only with `git add <path>` of your own paths, messages in English (`test: :white_check_mark:
<what>`). Do not run the full `npm test`.

## What the measurement is

loop2's agents read `guidelines/coding.md` whole before changing code. The measurement checks whether
a **shorter** coding.md makes agents write worse code. For three trial tasks, an agent is given the
task text and the repository with the **old** `guidelines/coding.md` five times and with the
**shortened** one five times; a deterministic test decides each result without reading the code, and
the counts of passes are compared. You write the three tasks, their tests and the means to run a
test. The cycle (not you) creates the run directories, runs the agents and the tests, and writes the
shortened file.

Read: the frozen task
`docs/task-cycles/proba-krotszych-wytycznych/task.md`
(questions 6 and 7 are the design of this part), `guidelines/coding.md` (whole; the old text, the
only version you work from; the sentence numbers below are the units of
`docs/task-cycles/proba-krotszych-wytycznych/reports\inputs-sentences.md`),
`guidelines/testing.md` (whole, because you write tests), `foundations/decisions.md` D-252 and
D-253 (headings `### D-252`, `### D-253`), and the code the tasks touch: `src/server/log-line.ts`,
`src/server/database.ts`, `src/server/account-block.ts`, `src/server/session-store.ts`,
`src/server/main.ts`, `scripts/build.mjs`, and an existing test of the server such as
`tests/account-backup.test.mjs` for how tests load `dist/`.

## The three tasks and the sentences they probe

The shortened file changes only the sentences named here. A task is **discriminating** if an agent
could plausibly break the behaviour that the old sentence guards when it does not have that sentence
in front of it — not a task every agent passes by default. You cannot know which; make the task a
natural piece of loop2 work in which the guarded behaviour is easy to get wrong.

- **T1 — Hiding a failure** (rule `### Hiding a failure`). Old: S055 „Awarii nie zamieniaj ani w
  odpowiedź »wszystko w porządku«, ani w pustą listę.” In the shortened file S055 is replaced by the
  name of the practice, "fail loudly"; S056 (degraded mode only where a task sets it, with a log line)
  stays. Behaviour: when the thing the new code depends on fails, the failure is not turned into an
  empty list or "all fine". Example direction (change freely): a function listing something from the
  account database that fails when the database does.
- **T2 — Secrets and personal data** (rule `### Secrets and personal data`). Old: S064 „Logi nie
  zawierają żadnego sekretu, bez wyjątku, więc identyfikator będący sekretem zostaje poza nimi, nawet
  gdyby stał na liście.”, S065 „Nie zawierają danych osobowych; jedynym wyjątkiem […] są
  identyfikatory z listy `### Logging scope`.”. In the shortened file S064a/S065a become the names
  "never log secrets" and "no personal data in logs", and the derivable consequence of S064 („so an
  identifier that is a secret stays out even if it is on the list”) is removed. S066–S068 stay (an
  error is read by name, code and SQLite `errcode`, never `message` or `stack`; no whole object or
  request body). Behaviour: a new log line (an event, or a failure) for a thing that has a secret
  identifier or a personal value — e.g. an event about a session, whose identifier is a secret —
  carries no secret and no personal value.
- **T3 — Identifiers in log lines** (rule `### Identifiers in log lines`). Old: S060 „Wiersz spoza
  przebiegu sprawy, taki jak wiersz przy starcie procesu albo skryptu budowania, nie niesie żadnego
  identyfikatora.” and S061 „Wiersz obsługi ostatniej szansy nie musi nieść żadnego […]” — both
  removed in the shortened file (they derive from the purpose „identifiers join the events of one
  case”, S057, which stays). Behaviour: a line that belongs to no case (a start or a sweep that
  touches many accounts) carries no `accountId`, while a line of one account's case carries it under
  the listed name.

Do not mention in any prompt the guidelines, the measurement, the rules above or any test. The task
text must read like an ordinary task for a loop2 developer-agent.

## What each task consists of (in `trial-tasks/<id>/` on your branch, tracked)

- `prompt.md` — the full text given to the agent that does the task. It names the file(s) the agent
  creates (`src/server/<name>.ts`) and the exported function(s) with their exact signatures, and
  everything the test needs to call them; it states the dependency the test will make fail or
  inspect. The agent is told nothing about the test. Keep it to a short, natural description
  (one screen).
- `test.mjs` — a `node:test` file. It reads the run directory from the environment variable
  `RUN_DIR`, loads the agent's module from `<RUN_DIR>/dist/server/<name>.js`, drives it (real
  `AccountDatabase` on a temp file where that is natural, a stand-in that throws where the task
  needs a failure — see `guidelines/testing.md` on stand-ins), captures what it writes to
  `console.log`/`console.error` and decides pass/fail by the observable behaviour only: no reading of
  the agent's source. It must be deterministic and not depend on the order or wording of the agent's
  text.
- `reference/<name>.ts` — a solution that a careful agent following the whole old coding.md would
  write; the test passes on it.
- `violating/<name>.ts` — a plausible solution that breaks the behaviour the sentence guards (the
  empty list, the secret in the line, the identifier in the context-free line); the test fails on it.
  If one test probes more than one behaviour, the file has one `test(...)` per behaviour, and
  `violating/` is supplied per behaviour (`violating-<behaviour>/`); the result of a run is its
  per-behaviour passes and the run is a pass only if all pass.
- `README.md` — per task: which sentence the task probes, why the guarded behaviour is easy to get
  wrong, what the test does, and for the test the failure it prevents (as `guidelines/testing.md`
  asks).

And, once, in `trial-tasks/`:

- `run-test.mjs <taskId> <runDir>` — builds the run directory (`node scripts/build.mjs` run with
  `cwd` = `<runDir>`; it must work on a plain copy of the repository without `.git`, with a
  `node_modules` link), then runs `node --test` on that task's `test.mjs` with `RUN_DIR` set, and
  prints one JSON line to stdout: `{"task":"T1","pass":true|false,"behaviours":{"<name>":true|false},"buildFailed":true|false}`.
  A failed build is `pass:false,buildFailed:true`. The exit code of the runner is 0 whenever it could
  decide, 2 when it could not run at all.
- `verify.mjs` — for each task, creates a temporary plain copy of the repository (use
  `git -C <worktree> archive HEAD | tar -x -C <dest>`, with the temp directory under
  `[a run directory of the trial] verify-<id>`; link `node_modules`), copies `reference/<name>.ts`
  to `src/server/<name>.ts`, runs `run-test.mjs` and expects `pass:true`; then the same with each
  violating variant and expects `pass:false` for the behaviour it breaks. It prints a table and exits
  1 if any expectation fails.

The tests run against the agent's own module, so your test must not require the agent to also change
anything else (no wiring into `main.ts`, no change of `database.ts`): the module stands alone and the
task text says so. If a task needs an existing export that is missing from the repository, change the
task, not the repository.

## Checks to run and report (each with command and exit code)

`node trial-tasks/verify.mjs` (expecting exit 0, every reference passing and every violating variant
failing), and your own-work check of the weakest point of each test: that the test cannot pass on an
agent that skipped the behaviour for an unrelated reason (e.g. the module not loading), and that it
cannot fail on a correct solution that words or orders its lines differently from your reference
(write a second, differently written correct solution for each task in `alternative/<name>.ts` and
show the test passes on it too).

## Report

`docs/task-cycles/proba-krotszych-wytycznych/reports\author-2-report.md`,
by the method's report form, with also: the commit, the three prompts quoted whole, and **Searches
not found or unclear**. Return the status, the commit, a one-line check result and the report's path.
