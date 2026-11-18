# Handoff — the one author of the change (stage `author`)

## Delegation

The human who requested this cycle has delegated intermediate choices to the orchestrator; there is no
human contact until the request. Never seek human approval. Questions go to the orchestrator in your
return (status `questions`); a choice of how to make what the task and the foundation settle is yours,
named in your report.

## Where you work

- Worktree (the product root, work from it): `the root of the worktree`, branch `task/testy-padajace-losowo`, base `659b1e0255cd66d4768469191f408d9d266081a3` (`origin/main`). `.the-way` is at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the commit the gitlink records.
- Your directory for working copies: `.runs/author/` (directly under the ignored `.runs/` of the worktree). Your report: `.runs/task-cycles/testy-padajace-losowo/reports/author-report.md`.
- The worktree has no `node_modules`; run `npm ci` in it before a Node test (`tests/transport.test.mjs`). Python tests of `tests/deploy/` need no Node install. `.runs/quality-venv` is made at the first `npm test` and is not yours to make unless a focused run of yours needs it.
- Commit on the branch with `git add <path> <path>…`, never `git add -A`, `git add .` or `git commit -a`. Commit messages in English, in the form of the existing commits (`type: :emoji: sentence`). Do not push.

## Method and variant

Read `.the-way/task-cycle/change/SKILL.md` whole and follow it, in the variant "the whole change as the one author". Read a file it names (one beside it included) only when the step or variant that names it comes. Do not call a skill; every method is read as a file. The foundation step you do with your code: read `.the-way/task-cycle/skill/foundation_step.md` whole, and the `SKILL.md` of an element, at the path that file gives, when you write an entry of it (decision: `.the-way/elements/decisions/skill/SKILL.md`; part map: `.the-way/elements/part-map/skill/SKILL.md`). For the sentence of `guidelines/testing.md` read `.the-way/product-guidelines/testing/SKILL.md` (the-way's method for changing a product's testing guidelines) before you change that file, and follow what it requires of a change to those guidelines in a cycle.

## The task

The frozen task is `.runs/task-cycles/testy-padajace-losowo/task-frozen.md` (read it whole; it is the whole task: *Description*, *Questions to settle*, *Context*, *Settlements to record*, *Out of scope*). Status `ready for cycle`, `Project relation: independent`. Its *To do* has five points; its *Settlements to record* has one row (the register of the tests that fail at random, goes to a decision). There is no spec and no plan.

Answers of step 4 of the cycle:

- Trust boundary: no. Every review of the cycle is told so; nothing of the change reaches a file of a part's *Trust boundary* list.
- Irreversible operation: no.
- Open design choice at start: none. The limit of the "logs *" variant is the one value you measure.

Boundaries of your stage: make the change, the foundation entries and the own-work check, and return. Do not run the product's full gate (`npm test` without arguments); the gate is the orchestrator's. Focused runs of your own tests and checks are yours (`npm test -- <one test file>` runs one file; D-77). Do not start the next stage, and do not touch what the task's *Out of scope* lists.

## What to read (selected by the orchestrator)

- Foundation entries, each whole, by identifier in `foundations/decisions.md`: D-73, D-77 (named by the task's *Decisions in play*), D-356 (the decision the test of point 1 holds by its line `decision:`), D-83, D-425 (a function limit of 200 lines reaches the tests; check the function you change against it), D-82. The index of the selected decisions is `.runs/task-cycles/testy-padajace-losowo/index.md` (binding sentences and *Scope*, for the other decisions of the parts: deployment, account-server, agent-workflow, product-foundation); open whole only those the work changes or whose sentence leaves open what you have to do.
- Part map: `foundations/part_map.md`, whole (short). The part of `tests/flaky-tests.md` is agent-workflow (the task says so; `tests/agent_workflow/**` and `guidelines/**` are claimed by it, and `tests/*.md` by none). A glossary entry or an invariant is not asked for; if the search of the whole foundation that the foundation step requires finds one the register touches (for instance a word the register uses in another meaning than the glossary gives), write it by the way of working.
- Guidelines, each whole: `guidelines/coding.md` and `guidelines/testing.md`. The register is written in Polish by the task; code, comments and commit messages are in English.
- Files you change: `tests/deploy/test_loop2_watch.py` (the test `TheDockerCommands.test_a_docker_that_never_answers_is_cut_off_and_read_as_down`, line 1170), `tests/transport.test.mjs` (the helper `send`, line 106, with its timer at line 134), `tests/flaky-tests.md` (new), `guidelines/testing.md` (chapter *Flaky tests*, line 303), `foundations/part_map.md`, `foundations/decisions.md`. Read the support module `tests/deploy/watch_script_support.py`, `tests/deploy/backup_script_support.py` (`RUN_TIMEOUT`, line 62) and `deploy/loop2-watch` (read only; it stays unchanged) to the extent you need them.

## Where the load and the register content come from

- The acceptance criterion of the task names the load of the report of executor 19 of the earlier cycle. Read it: `git show 28ab60c9:docs/task-cycles/luki-w-testach-z-przegladu/reports/executor-19-report.md`. The scripts it used (`spinners.sh`, `forkload.sh`, `fileload.sh`, `series.sh`) are not in the repository; write your own load in `.runs/author/` to the report's description: 6 loops each running after one another the whole files `tests/deploy/test_loop2_watch.py`, `tests/deploy/test_loop2_backup.py`, `tests/invariants/test_account_save_backup_failure_notice.py` and `tests/deploy/test_loop2_watch_message.py`, together with 40 spinning node processes (2 per logical processor), and run the variant "logs *" in 30 separate runs, each in a process of its own and counted. The criterion: all 30 pass, and no run reaches the 45 s limit of one script run (`RUN_TIMEOUT`). Choose the value of the limit (some seconds) by measurement under that load and keep the measured numbers in your report. Stop every load you start and confirm it ended (the report of executor 19 shows what was left running; its node count must be back to what it was). The test case before your change must be seen failing or at least be shown to carry the old 1 s limit; a 'before' series is welcome but not required, and its cost is not worth hours of the machine.
- The content of the four register entries is the task's *Context* (the entries a, b, c, d), nothing more. Write names of tests and error messages word for word as the *Context* gives them. Take no number, name or condition from memory. Where the *Context* is silent on a thing the entry form asks for, name it as not established; do not close it. If you want a fact that only the earlier cycle's reports hold (`git show 28ab60c9:docs/task-cycles/luki-w-testach-z-przegladu/reports/executor-18-report.md`, `…-19-…`, `…-20-…`), read it there and quote it, naming that you did.
- The register's common rule from the *Context* ("keep the whole record of the failed run, because in the cases b and c the only clue was a trace in the record of one failed run") goes into the register.

## Working copies (word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## What the report holds

As `make-change` gives it, with its status, commits, the one-line check result (command and exit code of every check that ran; what failed or did not run), **Unread material**, **Searches not found or unclear**, the own-work check, and for each foundation entry one sentence of its meaning in English and one in Polish, marked `row 1`, `projected` or `the cycle's`. Put the measured series of the load (limit tried, runs, passes, longest run) into the report.

## Privacy

Keep out of the report and of the register any secret, and any personal data of a user; the task has none.
