# Handoff — executor of slice 2 ("panel właściciela")

## Delegation and place

The person who requested this cycle has delegated intermediate choices to the orchestrator of `implement-task`; nothing here is that person's approval, and you never ask the human. A question goes to the orchestrator in your report (status `questions`); a missing fact or permission returns `blocked`; an open design choice the task, the plan and the foundation leave open returns `returned` with no code, as `make-change` gives.

- Worktree (work only from its root): `the task's worktree` — branch `task/panel-wlasciciela`. Your slice's base: `6e1eeef7` (the head when you were dispatched). Commit on this branch, by explicit paths (`git add <path>…`, never `-A`, `.` or `commit -a`), in English, in the form of the repository's earlier commits (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`); never force-push, never rewrite history.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole; variant **"a slice, or the retry of a slice"**. A file it names, one beside it included, you read only when the step or variant that names it comes. You have no skill tool: a skill the method or your slice names by its name is the `SKILL.md` whose frontmatter `name:` is that name, read as a file (the project skills stand in `.claude/skills/the-way-*/SKILL.md`).
- Frozen task (read the passages your slice's *Read* names; the whole where you need it): `.runs/task-cycles/panel-wlasciciela/task-frozen.md`. Plan: `.runs/task-cycles/panel-wlasciciela/plan.md` — your slice's section is copied below word for word, and what the plan's other sections hold for you is in the *Read* line. No spec.
- Answers of step 4: **trust boundary: yes** for the change as a whole (the owner routes and the role command are inside `account-server`'s trust boundary); **irreversible operation: no** (you run no command on a server and no real account is touched). This slice's *Risk*: trust boundary — `src/server/**` (`account-server`: the blocking and the role of accounts)
- Class of model: `cheaper`.
- Your directory for working copies: `.runs/executor-2/`. Your report: `.runs/task-cycles/panel-wlasciciela/reports/executor-2-report.md`.
- You run the focused checks your slice's *Checks* names, each with its command and exit code in the report. You never run the product's gate (bare `npm test` with no file); the orchestrator runs it.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Names the plan uses, settled by the foundation step (already committed, head `6e1eeef7`)

- "the new decision on the role" = **D-410** (the role of an account); "the new decision on the screen of the list" = **D-411**; "the glossary term "owner"" = `foundations/glossary.md:272-277`. Read the ones your slice's *Read* names, each whole.
- The plan's ranges of decisions are those of the base `b1904c5b`; the file has grown. **Use these current ranges** where they differ from the plan's (find each by its heading `### D-nnn`):

| Decision | Current range |
|---|---|
| D-112 | `foundations/decisions.md:2365-2379` |
| D-137 | `foundations/decisions.md:3082-3103` |
| D-202 | `foundations/decisions.md:4381-4410` |
| D-400 | `foundations/decisions.md:10700-10716` |
| D-410 | `foundations/decisions.md:10894-10910` |
| D-411 | `foundations/decisions.md:10911-10936` |

- Orchestrator's choices that bind you: **A1** — each entry of the list of accounts carries a fourth field, the role (`role`: `player` or `owner`), beside the email address, the blocked state and the previous-save privilege; the screen uses it only to show the role and to leave out „Zablokuj” at an owner's row. **A2** — the foundation step has already brought the comment lines `// decision: D-nnn "…"` of D-112, D-253 and D-354 into line (`tests/account-backup.test.mjs`, `tests/account-storage.test.mjs`, `tests/startup.test.mjs`); you change no such line unless your slice's text says so, and `python -B .the-way/elements/common/foundation_check.py` must stay at `0 errors`.
- A line of a test `// decision: D-nnn "quoted sentence"` quotes a sentence of that decision as it stands in `foundations/decisions.md`; a test you write that holds a sentence of a decision carries such a line, per `guidelines/testing.md`.
- **Checks beyond your slice's *Checks* (a finding of slice 1's review found the plan's list lacks them):** before each commit run `npx prettier --check <every .ts, .tsx, .mjs and .css file you changed>` and `npx eslint <every .ts, .tsx and .mjs file you changed>`; the gate's tests `test_prettier_source_format` and the ESLint test fail otherwise (`guidelines/coding.md`, rule *Formatter*). Format with `npx prettier --write <file>`, no option added, and check the diff changed only your lines. Give each command and exit code in the report.
- Names in the code: the account's role in `src/browser/view/app.ts` is named `role`, never `owner` (that file's variable `owner` names the account that owns the game being built).


## Your slice (copied word for word from `.runs/task-cycles/panel-wlasciciela/plan.md`)

### Slice 2 — Database operations of the panel

- **Goal:** `AccountDatabase` has three more operations, each by an email address normalized as at login, and the file `tests/account-owner.test.mjs` (new) tests them on real SQLite files, written first. (a) A list of every account, sorted by address ascending, each entry holding the address, the role, the blocked state and the previous-save privilege and nothing else of the account. (b) A change of role by address, one write in one transaction, answering `made-owner`, `already-owner`, `made-player`, `already-player` or `unknown`, ending no session and stopping no link. (c) A block for the panel: the same marking, deletion of the sessions and stopping of the links in one transaction as `blockAccount`, but the transaction reads the account's role and, for an owner, changes nothing and answers a refusal of its own (`owner`), also when the role was set by a second connection just before; its other answers are those of `blockAccount`. `blockAccount`, `unblockAccount` and `setPreviousSavePrivilege` stay as they are, since the commands use them and the commands stay unchanged. The tests cover: the sort, the four fields, a block of a player ending its sessions and stopping its links and nothing of another account, a block of an owner changing nothing (also the owner's own sessions and links), the role change by a second connection committed before the block, each outcome of the role change, and that the role change leaves block state, privilege, sessions and saved games as they were. The new test file is added to *Files* of `account-server` in `foundations/part_map.md` through the project skill `the-way-update-part-map` (read `.claude/skills/the-way-update-part-map/SKILL.md`).
- **Change:** `src/server/database.ts` · `tests/account-owner.test.mjs` · `foundations/part_map.md`
- **Read:** `guidelines/coding.md` · `guidelines/coding-database-access.md` · `guidelines/testing.md` · `foundations/decisions.md:3074-3092` D-137 · `foundations/decisions.md:2357-2370` D-112 · `foundations/decisions.md:10672-10685` D-400 · `foundations/decisions.md:4371-4395` D-202 · `foundations/invariants.md:858-866` blocked-account-access · `foundations/invariants.md:868-877` player-server-session · `foundations/invariants.md:878-887` unblock-restores-no-session · `foundations/invariants.md:898-907` unblock-restores-no-link · `tests/account-storage.test.mjs:1-136` · `tests/account-storage.test.mjs:2022-2070` · `.claude/skills/the-way-update-part-map/SKILL.md` · `.runs/task-cycles/panel-wlasciciela/task-frozen.md:29-38` To do · the new decision on the role · the new decision on the screen of the list
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/**` (`account-server`: the blocking and the role of accounts)
- **Checks:** `npm run typecheck` · `npm test -- tests/account-owner.test.mjs` · `npm test -- tests/account-storage.test.mjs` · `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 1 · the foundation entries D-137 · D-400 · the new decision on the screen of the list

## What the report holds

As `make-change` gives it for a slice: the status, the commits, each check with its command and exit code, the own-work check, the weakest point of your work and the check of it, **Reach beyond the handoff**, **Working copies**, **Unread material** (what your *Read* names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each `none` where it is).
