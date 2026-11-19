# Handoff — the one author of the change

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator, who has
delegated the making of this change to you. Nothing you decide is the human's approval. You do not
ask the human anything: you send a question to the orchestrator in your report, as your method gives.

## Where you work

- Worktree, the root you work from: `the root of the task's worktree`
  (branch `task/dwie-komendy-wlasciciela`, base `23b521a282f6a7f307bebc800b0fd985b2dbb6f8`). Work only
  there; never in the main checkout `the main checkout of the repository`.
- Process pin: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a` (checked equal to the gitlink).
- Your directory for working copies: `.runs/author/` (directly under the ignored `.runs/` of the worktree).
- Your report: `docs/task-cycles/dwie-komendy-wlasciciela/reports/author-report.md` (write it there;
  the name starts with the role, as the cycle requires).

Working copies, word for word from the cycle's rule: An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed.

## Your stage and its boundary

- Method: `.the-way/task-cycle/change/SKILL.md` (the-way's `make-change`). Read it whole. Your variant,
  in the words of its row: "the whole change as the one author". Read a file the method names only
  when the step or variant that names it comes.
- You make the whole change: the code, its tests, the prose places of the task, and the foundation step,
  for which read `.the-way/task-cycle/skill/foundation_step.md` whole, and read the `SKILL.md` of an
  element, at the path that file gives, when you write an entry of that element. You commit as your
  method gives and return before any review. You do not run the product's full gate (`npm test`, or
  any command that runs every test of the repository): the orchestrator runs it. Run only focused
  checks of the files you change, such as `node --test <file>` after the build the repository's
  scripts need, `npx eslint`, `npx prettier --check`, `npx tsc -p tsconfig.server.json --noEmit` and
  `python -B .the-way/elements/common/foundation_check.py`, each recorded with its command and exit code.
- No route/plan: the orchestrator judged that one agent can hold the change. If you meet an open
  design choice, or the change proves too large, return `returned` with a report and no code, as your
  method gives.

## The task

The frozen task, whole: `docs/task-cycles/dwie-komendy-wlasciciela/task-frozen.md` (a copy of the task
document of the author's private backlog, accepted 2026-11-18). Read it whole. Its *To do* items 1–6 are
your work; its *Settlements to record* rows 1 and 2 are the sentences of D-112 and D-430 you write; its
*Questions to settle* are answered and bind you; its *Out of scope* holds.

Notes from the orchestrator's reading of the code, to save you a search (verify them, do not trust them):

- The model to copy is `src/server/account-block.ts` (open with `{ existingOnly: true }`, refuse with
  `isNotAccountDatabase` by exit code 3 and the sentence `noTablesSentence`, advise "run the command
  again" only for `isDatabaseBusy`). The same pattern stands in `src/server/account-backup.ts`.
  Keep every check of a database file in `src/server/database.ts`; the commands hold no SQL of their own.
- `src/server/account-role.ts` and `src/server/account-previous-save.ts` open `new AccountDatabase(path)`
  today and give one sentence for every failure.
- The sentence of item 1 is the one of `account-block.ts`: `LOOP2_DATABASE_PATH names a file that
  exists but holds no account database set up by the server. Nothing changed.`
- Two existing tests use a file that is no SQLite database as "a database that fails" and expect exit
  code 1 and a SQLite error 26: `tests/account-owner.test.mjs` (case "a database file that is no
  database fails with the JSON line of the failure first, and changes nothing", near line 600) and
  `tests/account-storage.test.mjs` (case "a database failure of the previous-save command adds the
  error's kind and code and nothing of its text", near line 3727), both citing D-354. After the change
  such a file gets exit code 3. The cases keep their purpose (the JSON line of a failure first, then the
  sentence, nothing of the error's text, nothing changed): give each a database that fails another way,
  as the pull request that made the same change for the blocking and backup commands did, with a database
  damaged past its first page, and add the new cases of items 1 and 2 (empty file, no SQLite database,
  a database with no schema version: exit code 3 and the sentence, file unchanged; a failure that is
  not a busy database: exit code 1 and a sentence with no advice to run it again; a busy database:
  exit code 1 and the advice). Look at how `tests/account-backup.test.mjs` and the blocking command's
  cases in `tests/account-storage.test.mjs` do it and follow them.
- The five lines of tests that quote D-112 and D-430 and change with the decisions (task *Context*):
  `tests/account-backup.test.mjs` near lines 430 and 469–470, `tests/account-storage.test.mjs` near
  lines 265, 3369 and 3422. The foundation check requires a citation to begin a binding sentence of the
  decision, so they change together with the decisions; run the foundation check after each change.
- The deploy skill exists in two copies, `.claude/skills/loop2-deploy/SKILL.md` and
  `.agents/skills/loop2-deploy/SKILL.md`; both change by item 3, with the same words, and a test of
  `tests/agent_workflow/` may compare them. `references/backup_and_restore.md` in each names the restore
  command that only reads and is not touched.
- Prose places that may repeat the old sentence and that the task did not list (the glossary, the
  guidelines, comments of the two commands' headers, `security-notes.md`, the testing guidelines'
  other rows): search them and fix those that become false, as `foundation_step.md` and the return step
  ask; name each in your report.

## What you read (named by the orchestrator)

Foundation entries, by identifier, in `foundations/decisions.md` (the index the orchestrator wrote is
`.runs/orchestrator/index.md`, which you may read for the binding sentences; open each entry whole
before you change it): D-112 and D-430 (you change them), D-400, D-410, D-137, D-231, D-354, D-360 and
D-114, D-252, D-253, D-425 (the size limit of a function and a file: check
that `database.ts` stays within its exceptions and that you add nothing to a file over the threshold).
The invariant `account-database-schema` and the other invariants whose *Part* names `account-server`,
`agent-workflow` or `product-foundation` or `every` that your change reaches, and those a test you alter
cites by `invariant:`. The glossary entries of the terms you use. The part map entry of `account-server`.

Guidelines, each whole: `guidelines/coding.md`, `guidelines/coding-database-access.md` (you change it, item 5),
`guidelines/testing.md` (you change it, item 6; read it before you write or change any test).

## Answers of step 4

- Trust boundary: yes. The files you touch in `src/server/` take in a file from outside (the file
  `LOOP2_DATABASE_PATH` names). Every review of this cycle is told so and checks crafted input: an
  empty file, a file that is no SQLite database, a SQLite file with no schema version, a newer schema, a
  damaged file, a busy database, a path that is a directory or `:memory:`.
- Irreversible operation: no. You run neither command on any real database, only on temporary files
  your tests make.
- Open design choice: none. Reserved choice: none.
- Author class: `same` as the orchestrator's.

## Reporting

Return the status, your commits, a one-line check result naming what failed or did not run, and the path
of your report. The report holds, as your method gives: **Unread material** and **Searches not found or
unclear** (each `none` or the list), your own-work check (WAY-164) with each command and its exit code,
the weakest-point check, the working copies and that you removed them, and each reach beyond this
handoff. Commit with messages in English; add files by path, never `git add -A`.
