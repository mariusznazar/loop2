# Handoff — executor of slice 1 ("panel właściciela")

## Delegation and place

The person who requested this cycle has delegated intermediate choices to the orchestrator of `implement-task`; nothing here is that person's approval, and you never ask the human. A question goes to the orchestrator in your report (status `questions`); a missing fact or permission returns `blocked`; an open design choice the task, the plan and the foundation leave open returns `returned` with no code, as `make-change` gives.

- Worktree (work only from its root): `the task's worktree` — branch `task/panel-wlasciciela`. Your slice's base: `1d833c7e` (the head when you were dispatched). Commit on this branch, by explicit paths (`git add <path>…`, never `-A`, `.` or `commit -a`), in English, in the form of the repository's earlier commits (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`); never force-push, never rewrite history.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole; variant **"a slice, or the retry of a slice"**. A file it names, one beside it included, you read only when the step or variant that names it comes. You have no skill tool: a skill the method or your slice names by its name is the `SKILL.md` whose frontmatter `name:` is that name, read as a file (the project skills stand in `.claude/skills/the-way-*/SKILL.md`).
- Frozen task (read the passages your slice's *Read* names; the whole where you need it): `.runs/task-cycles/panel-wlasciciela/task-frozen.md`. Plan: `.runs/task-cycles/panel-wlasciciela/plan.md` — your slice's section is copied below word for word, and what the plan's other sections hold for you is in the *Read* line. No spec.
- Answers of step 4: **trust boundary: yes** for the change as a whole (the owner routes and the role command are inside `account-server`'s trust boundary); **irreversible operation: no** (you run no command on a server and no real account is touched). This slice's *Risk*: trust boundary — `src/server/**` (`account-server`: the account database and its schema)
- Class of model: `cheaper`.
- Your directory for working copies: `.runs/executor-1/`. Your report: `.runs/task-cycles/panel-wlasciciela/reports/executor-1-report.md`.
- You run the focused checks your slice's *Checks* names, each with its command and exit code in the report. You never run the product's gate (bare `npm test` with no file); the orchestrator runs it.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Names the plan uses, settled by the foundation step (already committed, head `1d833c7e`)

- "the new decision on the role" = **D-410** (the role of an account); "the new decision on the screen of the list" = **D-411**; "the glossary term "owner"" = `foundations/glossary.md:272-277`. Read the ones your slice's *Read* names, each whole.
- The plan's ranges of decisions are those of the base `b1904c5b`; the file has grown. **Use these current ranges** where they differ from the plan's (find each by its heading `### D-nnn`):

| Decision | Current range |
|---|---|
| D-112 | `foundations/decisions.md:2365-2379` |
| D-202 | `foundations/decisions.md:4381-4410` |
| D-253 | `foundations/decisions.md:6319-6369` |
| D-354 | `foundations/decisions.md:9886-9912` |
| D-410 | `foundations/decisions.md:10894-10910` |
| D-411 | `foundations/decisions.md:10911-10936` |

- Orchestrator's choices that bind you: **A1** — each entry of the list of accounts carries a fourth field, the role (`role`: `player` or `owner`), beside the email address, the blocked state and the previous-save privilege; the screen uses it only to show the role and to leave out „Zablokuj” at an owner's row. **A2** — the foundation step has already brought the comment lines `// decision: D-nnn "…"` of D-112, D-253 and D-354 into line (`tests/account-backup.test.mjs`, `tests/account-storage.test.mjs`, `tests/startup.test.mjs`); you change no such line unless your slice's text says so, and `python -B .the-way/elements/common/foundation_check.py` must stay at `0 errors`.
- A line of a test `// decision: D-nnn "quoted sentence"` quotes a sentence of that decision as it stands in `foundations/decisions.md`; a test you write that holds a sentence of a decision carries such a line, per `guidelines/testing.md`.
- Names in the code: the account's role in `src/browser/view/app.ts` is named `role`, never `owner` (that file's variable `owner` names the account that owns the game being built).

## Notes for this slice

- Your slice's check of quotations stays at `0 errors` because the foundation step already changed the comment lines that quote D-112, D-253 and D-354; read `foundations/decisions.md` D-112 as it stands now, which says current version 6.
- The review of this slice also covers the foundation entries the foundation step wrote (base `b1904c5b`, head `1d833c7e`); the report of that agent is `.runs/task-cycles/panel-wlasciciela/reports/foundation-report.md`, which the reviewer reads, not you.


## Your slice (copied word for word from `.runs/task-cycles/panel-wlasciciela/plan.md`)

### Slice 1 — The role on the account: schema version 6

- **Goal:** the account database has the role. One schema step is added at the end of the list, never an edit of a step that ran: it adds to `accounts` a column for the role with the values `player` and `owner`, default and value of every existing account `player`. `Account` has a field `role`, `createAccount` returns a `player`, the read of a stored account refuses an unknown role value like it refuses any other unknown stored value. The current version is 6, so every assertion of a test that names version 5 as the current one names 6, the test that writes a database "of a newer version" to see it refused writes one above 6, and the titles that name version 5 name 6. A test written first: a database of version 5 written by the test with its own schema, with a blocked account, a confirmed one, one with the previous-save privilege, sessions, emailed links, a saved game and a previous save, opens as version 6 with every row and value kept and every account a `player`; a failing step 6 leaves the version-5 database as it was, rows and columns; a new account is a `player`. The lines `// decision: D-112 …`, `// decision: D-253 …` and `// decision: D-354 …` in `tests/account-storage.test.mjs` and `tests/account-backup.test.mjs` quote the wording of those decisions as the foundation step wrote it. The command `account-block` and `account-previous-save` and every other method change in no way.
- **Change:** `src/server/database.ts` · `tests/account-storage.test.mjs` · `tests/account-backup.test.mjs` · `tests/deploy/test_account_backup_stream.py`
- **Read:** `guidelines/coding.md` · `guidelines/coding-database-access.md` · `guidelines/testing.md` · `foundations/decisions.md:2357-2370` D-112 · `foundations/decisions.md:4371-4395` D-202 · `foundations/decisions.md:6301-6350` D-253 · `foundations/decisions.md:9858-9883` D-354 · `foundations/invariants.md:758-766` account-schema-lifecycle · `foundations/invariants.md:768-776` account-database-schema · `foundations/invariants.md:608-617` player-self-registration · `.runs/task-cycles/panel-wlasciciela/task-frozen.md:29-31` To do · the new decision on the role · the glossary term "owner"
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/**` (`account-server`: the account database and its schema)
- **Checks:** `npm run typecheck` · `npm test -- tests/account-storage.test.mjs` · `npm test -- tests/account-backup.test.mjs` · `npm test -- tests/deploy/test_account_backup_stream.py` · `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** the foundation entries D-112 · D-202 · D-253 · D-354 · the new decision on the role

## What the report holds

As `make-change` gives it for a slice: the status, the commits, each check with its command and exit code, the own-work check, the weakest point of your work and the check of it, **Reach beyond the handoff**, **Working copies**, **Unread material** (what your *Read* names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each `none` where it is).
