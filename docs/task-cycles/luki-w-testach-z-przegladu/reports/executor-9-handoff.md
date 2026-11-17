# Handoff — executor of slice 9: the guards of state-changing requests: a route left off their lists fails the test

You make one slice of a plan for the task cycle `implement-task`; another agent reviews the whole change with `review-change`.

## Delegation and place

- The human who asked for this cycle has delegated intermediate choices to the orchestrator. Never treat an answer as the human's approval. Ask no human; send a question to the orchestrator in your report with the status `questions`, and a missing fact or permission with `blocked`.
- Worktree (work only from its root): `the repository's root`, branch `task/luki-w-testach-z-przegladu`. **Base of this slice: `4f75e190fe824fc420f15df6eaa7d087fb7ea018`** (the range of your commits starts here). Pinned the-way: `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`. The worktree has `node_modules` (installed from the lockfile) and `.runs/quality-venv` (ruff, shellcheck), made by the orchestrator; `dist/` is built only where the slice's checks say `npm.cmd run build`.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"** — read `.the-way/task-cycle/change/slice.md` as the `SKILL.md` gives. Read the `SKILL.md` whole, and a file it names only when its step comes. You have no skill tool: a skill a file names by its name alone is the `SKILL.md` whose frontmatter `name:` is that name, read as a file under `.the-way`.
- Class of model: same as the orchestrator's class (Sonnet 5.5).
- Trust boundary answer of the cycle: yes (the files the part map names as boundaries, among them `src/server/**`, `src/browser/sim/saved-game.ts`, `deploy/**`, `assets/sprites/**`); irreversible operation: no. Where your slice's *Risk* names a boundary the review of it checks crafted input there.
- You never run the product's gate (`npm.cmd test` without a file, `python -B .the-way/task-cycle/gate_times.py`): it is the orchestrator's alone. The focused checks your slice names you run, each with its command and exit code in your report.
- Commits: messages in English in the form of the existing ones (`git log -8 --format=%s`); `git add` by path, never `-A` or `.`; commit your work in your slice's range; leave the worktree clean (`git status --short` empty) when you return. Where you change a file temporarily to see a test fail, restore it byte for byte (`git checkout -- <file>` or `git diff` empty) before you commit, and say so in the report.
- Report path: `.runs/task-cycles/luki-w-testach-z-przegladu/reports/executor-9-report.md`. Your directory for working copies: `.runs/executor-9/`.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository.

(Remove each copy before you return, with `git worktree remove --force` then `git worktree prune` for a worktree, and state in the report where each stood and that it was removed.)

## Your slice, copied word for word from the plan

### Slice 9 — the guards of state-changing requests: a route left off their lists fails the test

- **Goal:** `tests/transport.test.mjs` holds a case, citing `account-mutation-request-guards`, that
  reads from the application `createApp` builds every route it answers with a method other than GET
  and HEAD and fails, naming each, for a route no guard case lists: the eight routes of „refused
  state-changing requests change no account or session and do no password work”, the save route and
  the reset route of their own cases in this file, and the four POST routes of the owner panel guarded
  in `tests/owner-routes.test.mjs` (To do 4). It is seen failing once with a made-up state-changing
  route added to `src/server/account-routes.ts` for a moment and removed byte for byte.
- **Change:** `tests/transport.test.mjs`
- **Read:** `.runs/task-cycles/luki-w-testach-z-przegladu/task.md:30-30` To do 4 ·
  `foundations/invariants.md:728-747` owner-panel-authorization, account-mutation-request-guards ·
  `foundations/decisions.md:2564-2584` D-104 · `src/server/app.ts` · `src/server/account-routes.ts:40-70`
  the paths · `src/server/account-routes.ts:405-445` the router · `src/server/owner-routes.ts` ·
  `tests/owner-routes.test.mjs:954-1066` the owner routes' guard case · `foundations/glossary.md:99-109`
  unit test, integration test · `foundations/part_map.md:66-88` account-server · `guidelines/testing.md` ·
  `guidelines/coding.md`
- **Model:** same — it reads the routes of the application from the test and shows the case red on a
  route added for a moment.
- **Risk:** none
- **Checks:** `npm.cmd test -- tests/transport.test.mjs` (red with the made-up route, green removed) ·
  `npm.cmd test -- tests/owner-routes.test.mjs` · `git status --short -- src` shows nothing
- **Depends on:** none

## Passages of the task and the spec your *Read* names, copied word for word

### .runs/task-cycles/luki-w-testach-z-przegladu/task.md:30-30 — To do 4

4. Test strażników żądania w `tests/transport.test.mjs` pada, gdy aplikacja ma trasę zmieniającą stan spoza jego listy (raport stanu, próba 3, #6).


## Entries and files your *Read* names (current ranges in the worktree as it stands now; where a range differs from the plan's, this one holds)

Foundation entries are addressed by their identifier, a decision by its heading `### D-NN`, an invariant, an environment fact, a glossary term or a part by `## <name>`; the range runs to the next heading. Read each whole.

- plan: `foundations/invariants.md:728-747` owner-panel-authorization, account-mutation-request-guards -> current: `foundations/invariants.md:728-736` owner-panel-authorization; `foundations/invariants.md:738-746` account-mutation-request-guards
- plan: `foundations/decisions.md:2564-2584` D-104 -> current: `foundations/decisions.md:2579-2598` D-104
- `src/server/app.ts`
- `src/server/account-routes.ts:40-70` the paths
- `src/server/account-routes.ts:405-445` the router
- `src/server/owner-routes.ts`
- `tests/owner-routes.test.mjs:954-1066` the owner routes' guard case
- plan: `foundations/glossary.md:99-109` unit test, integration test -> current: `foundations/glossary.md:99-103` unit test; `foundations/glossary.md:105-109` integration test
- plan: `foundations/part_map.md:66-88` account-server -> current: `foundations/part_map.md:66-88` account-server
- `guidelines/testing.md`
- `guidelines/coding.md`

The guideline files named are each read whole. Where you need something this handoff does not name, reach for it selectively (a foundation entry whole, never a whole file of the foundation) and name each reach in your report.

## Return

As the method's section on returning gives: the status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds each check with its command and exit code, the own-work check as the method gives it, each reach beyond this handoff, each working copy, and ends with **Unread material:** (what this handoff names that you did not read whole, with what you read, or `none`) and **Searches not found or unclear:** (each thing you looked for and did not find, or `none`).
