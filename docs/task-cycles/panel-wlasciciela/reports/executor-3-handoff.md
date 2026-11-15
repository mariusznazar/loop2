# Handoff — executor of slice 3 ("panel właściciela")

## Delegation and place

The person who requested this cycle has delegated intermediate choices to the orchestrator of `implement-task`; nothing here is that person's approval, and you never ask the human. A question goes to the orchestrator in your report (status `questions`); a missing fact or permission returns `blocked`; an open design choice the task, the plan and the foundation leave open returns `returned` with no code, as `make-change` gives.

- Worktree (work only from its root): `the task's worktree` — branch `task/panel-wlasciciela`. Your slice's base: `dec8f39b` (the head when you were dispatched). Commit on this branch, by explicit paths (`git add <path>…`, never `-A`, `.` or `commit -a`), in English, in the form of the repository's earlier commits (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`); never force-push, never rewrite history.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole; variant **"a slice, or the retry of a slice"**. A file it names, one beside it included, you read only when the step or variant that names it comes. You have no skill tool: a skill the method or your slice names by its name is the `SKILL.md` whose frontmatter `name:` is that name, read as a file (the project skills stand in `.claude/skills/the-way-*/SKILL.md`).
- Frozen task (read the passages your slice's *Read* names; the whole where you need it): `.runs/task-cycles/panel-wlasciciela/task-frozen.md`. Plan: `.runs/task-cycles/panel-wlasciciela/plan.md` — your slice's section is copied below word for word, and what the plan's other sections hold for you is in the *Read* line. No spec.
- Answers of step 4: **trust boundary: yes** for the change as a whole (the owner routes and the role command are inside `account-server`'s trust boundary); **irreversible operation: no** (you run no command on a server and no real account is touched). This slice's *Risk*: trust boundary — `src/server/**` (`account-server`: a command that changes the role of an account, which only a human runs, D-12)
- Class of model: `cheaper`.
- Your directory for working copies: `.runs/executor-3/`. Your report: `.runs/task-cycles/panel-wlasciciela/reports/executor-3-report.md`.
- You run the focused checks your slice's *Checks* names, each with its command and exit code in the report. You never run the product's gate (bare `npm test` with no file); the orchestrator runs it.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Names the plan uses, settled by the foundation step (already committed, head `dec8f39b`)

- "the new decision on the role" = **D-410** (the role of an account); "the new decision on the screen of the list" = **D-411**; "the glossary term "owner"" = `foundations/glossary.md:272-277`. Read the ones your slice's *Read* names, each whole.
- The plan's ranges of decisions are those of the base `b1904c5b`; the file has grown. **Use these current ranges** where they differ from the plan's (find each by its heading `### D-nnn`):

| Decision | Current range |
|---|---|
| D-12 | `foundations/decisions.md:358-377` |
| D-112 | `foundations/decisions.md:2365-2379` |
| D-137 | `foundations/decisions.md:3082-3103` |
| D-252 | `foundations/decisions.md:6248-6318` |
| D-253 | `foundations/decisions.md:6319-6369` |
| D-354 | `foundations/decisions.md:9886-9912` |
| D-400 | `foundations/decisions.md:10700-10716` |
| D-410 | `foundations/decisions.md:10894-10910` |
| D-411 | `foundations/decisions.md:10911-10936` |

- Orchestrator's choices that bind you: **A1** — each entry of the list of accounts carries a fourth field, the role (`role`: `player` or `owner`), beside the email address, the blocked state and the previous-save privilege; the screen uses it only to show the role and to leave out „Zablokuj” at an owner's row. **A2** — the foundation step has already brought the comment lines `// decision: D-nnn "…"` of D-112, D-253 and D-354 into line (`tests/account-backup.test.mjs`, `tests/account-storage.test.mjs`, `tests/startup.test.mjs`); you change no such line unless your slice's text says so, and `python -B .the-way/elements/common/foundation_check.py` must stay at `0 errors`.
- A line of a test `// decision: D-nnn "quoted sentence"` quotes a sentence of that decision as it stands in `foundations/decisions.md`; a test you write that holds a sentence of a decision carries such a line, per `guidelines/testing.md`.
- **Checks beyond your slice's *Checks* (a finding of slice 1's review found the plan's list lacks them):** before each commit run `npx prettier --check <every .ts, .tsx, .mjs and .css file you changed>` and `npx eslint <every .ts, .tsx and .mjs file you changed>`; the gate's tests `test_prettier_source_format` and the ESLint test fail otherwise (`guidelines/coding.md`, rule *Formatter*). Format with `npx prettier --write <file>`, no option added, and check the diff changed only your lines. Give each command and exit code in the report.
- Names in the code: the account's role in `src/browser/view/app.ts` is named `role`, never `owner` (that file's variable `owner` names the account that owns the game being built).

## Notes for this slice

- Slice 2 is done: `src/server/database.ts` has `listAccounts`, `setAccountRole` (outcomes `made-owner`, `already-owner`, `made-player`, `already-player`, `unknown`) and `blockForPanel`; read their signatures and tests in `src/server/database.ts` and `tests/account-owner.test.mjs` (the file you extend). Use `setAccountRole` for the command; do not change `database.ts`.
- The *Change* names `guidelines/coding.md` for the two new events in its `### Logging scope`: the project skill `the-way-maintain-coding-guidelines` leads such work with the human in refinement; here the rule of D-252 holds ("an agent adds alone an item that fits this principle, an identifier of a thing included"), so you add the two event names yourself, read that skill's file as the plan says for its form, and change nothing else in the guidelines.

## Your slice (copied word for word from `.runs/task-cycles/panel-wlasciciela/plan.md`)

### Slice 3 — The command that gives and takes the role

- **Goal:** `src/server/account-role.ts` (new) is the command `node dist/server/account-role.js owner|player <email address>`, made on the pattern of `account-previous-save.ts` and `account-block.ts` in everything that is not the operation: the address normalized as at login; the usage line and `Nothing changed.` on wrong arguments (exit 2), on no existing database file (exit 3), on an unknown address (exit 4), on a database that cannot be opened or changed (exit 1, the JSON line of the failure first); its own last-resort handler named `account-role`; one sentence for each of the four outcomes of the role change of Slice 2 (made owner, already owner, made player, already player); one JSON line of an event with the account's number and no address after a change only, the events `account-owner-granted` and `account-owner-revoked`, which are added to the list of the business events in `### Logging scope` of `guidelines/coding.md` (edit through the project skill `the-way-maintain-coding-guidelines`, read `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md`). Tests, written first, in `tests/account-owner.test.mjs` by the pattern of the tests of `account-previous-save` in `tests/account-storage.test.mjs`: each outcome and its exit code beside an open connection, usage error, unknown address and unusable database changing nothing and creating no file, the event lines, the failure line. The test of the unchanged commands (task To do 8): `account-block` blocks and unblocks, and `account-previous-save` grants and revokes, an account whose role is owner, with the reports and effects they have for a player, and a command refused or failed changes nothing as before. The lines `// decision: D-112 …` and `// decision: D-253 …` in `tests/startup.test.mjs` quote the wording of those decisions as the foundation step wrote it. No other file of the server changes, and neither `account-block.ts` nor `account-previous-save.ts`.
- **Change:** `src/server/account-role.ts` · `tests/account-owner.test.mjs` · `guidelines/coding.md` · `tests/startup.test.mjs`
- **Read:** `guidelines/testing.md` · `src/server/account-block.ts` · `src/server/account-previous-save.ts` · `src/server/log-line.ts` · `foundations/decisions.md:3074-3092` D-137 · `foundations/decisions.md:10672-10685` D-400 · `foundations/decisions.md:6234-6299` D-252 · `foundations/decisions.md:6301-6350` D-253 · `foundations/decisions.md:9858-9883` D-354 · `foundations/decisions.md:2357-2370` D-112 · `tests/account-storage.test.mjs:2720-2780` · `tests/account-storage.test.mjs:3072-3320` · `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md` · `.runs/task-cycles/panel-wlasciciela/task-frozen.md:29-38` To do · the new decision on the role · the glossary term "owner"
- **Model:** cheaper
- **Risk:** trust boundary — `src/server/**` (`account-server`: a command that changes the role of an account, which only a human runs, D-12)
- **Checks:** `npm run typecheck` · `npm test -- tests/account-owner.test.mjs` · `npm test -- tests/account-storage.test.mjs` · `npm test -- tests/startup.test.mjs` · `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 2 · the foundation entries D-252 · D-253 · D-354 · the new decision on the role

## What the report holds

As `make-change` gives it for a slice: the status, the commits, each check with its command and exit code, the own-work check, the weakest point of your work and the check of it, **Reach beyond the handoff**, **Working copies**, **Unread material** (what your *Read* names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each `none` where it is).
