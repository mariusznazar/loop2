# Handoff — executor of slice 11 ("panel właściciela")

## Delegation and place

The person who requested this cycle has delegated intermediate choices to the orchestrator of `implement-task`; nothing here is that person's approval, and you never ask the human. A question goes to the orchestrator in your report (status `questions`); a missing fact or permission returns `blocked`; an open design choice the task, the plan and the foundation leave open returns `returned` with no code, as `make-change` gives.

- Worktree (work only from its root): `the task's worktree` — branch `task/panel-wlasciciela`. Your slice's base: `3e3e4f3f` (the head when you were dispatched). Commit on this branch, by explicit paths (`git add <path>…`, never `-A`, `.` or `commit -a`), in English, in the form of the repository's earlier commits (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`); never force-push, never rewrite history.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole; variant **"a slice, or the retry of a slice"**. A file it names, one beside it included, you read only when the step or variant that names it comes. You have no skill tool: a skill the method or your slice names by its name is the `SKILL.md` whose frontmatter `name:` is that name, read as a file (the project skills stand in `.claude/skills/the-way-*/SKILL.md`).
- Frozen task (read the passages your slice's *Read* names; the whole where you need it): `.runs/task-cycles/panel-wlasciciela/task-frozen.md`. Plan: `.runs/task-cycles/panel-wlasciciela/plan.md` — your slice's section is copied below word for word, and what the plan's other sections hold for you is in the *Read* line. No spec.
- Answers of step 4: **trust boundary: yes** for the change as a whole (the owner routes and the role command are inside `account-server`'s trust boundary); **irreversible operation: no** (you run no command on a server and no real account is touched). This slice's *Risk*: none
- Class of model: `cheaper`.
- Your directory for working copies: `.runs/executor-11/`. Your report: `.runs/task-cycles/panel-wlasciciela/reports/executor-11-report.md`.
- You run the focused checks your slice's *Checks* names, each with its command and exit code in the report. You never run the product's gate (bare `npm test` with no file); the orchestrator runs it.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Names the plan uses, settled by the foundation step (already committed, head `3e3e4f3f`)

- "the new decision on the role" = **D-410** (the role of an account); "the new decision on the screen of the list" = **D-411**; "the glossary term "owner"" = `foundations/glossary.md:272-277`. Read the ones your slice's *Read* names, each whole.
- The plan's ranges of decisions are those of the base `b1904c5b`; the file has grown. **Use these current ranges** where they differ from the plan's (find each by its heading `### D-nnn`):

| Decision | Current range |
|---|---|
| D-12 | `foundations/decisions.md:358-377` |
| D-137 | `foundations/decisions.md:3082-3103` |
| D-400 | `foundations/decisions.md:10700-10716` |
| D-410 | `foundations/decisions.md:10894-10910` |
| D-411 | `foundations/decisions.md:10911-10936` |

- Orchestrator's choices that bind you: **A1** — each entry of the list of accounts carries a fourth field, the role (`role`: `player` or `owner`), beside the email address, the blocked state and the previous-save privilege; the screen uses it only to show the role and to leave out „Zablokuj” at an owner's row. **A2** — the foundation step has already brought the comment lines `// decision: D-nnn "…"` of D-112, D-253 and D-354 into line (`tests/account-backup.test.mjs`, `tests/account-storage.test.mjs`, `tests/startup.test.mjs`); you change no such line unless your slice's text says so, and `python -B .the-way/elements/common/foundation_check.py` must stay at `0 errors`.
- A line of a test `// decision: D-nnn "quoted sentence"` quotes a sentence of that decision as it stands in `foundations/decisions.md`; a test you write that holds a sentence of a decision carries such a line, per `guidelines/testing.md`.
- **Checks beyond your slice's *Checks* (a finding of slice 1's review found the plan's list lacks them):** before each commit run `npx prettier --check <every .ts, .tsx, .mjs and .css file you changed>` and `npx eslint <every .ts, .tsx and .mjs file you changed>`; the gate's tests `test_prettier_source_format` and the ESLint test fail otherwise (`guidelines/coding.md`, rule *Formatter*). Format with `npx prettier --write <file>`, no option added, and check the diff changed only your lines. Give each command and exit code in the report.
- Names in the code: the account's role in `src/browser/view/app.ts` is named `role`, never `owner` (that file's variable `owner` names the account that owns the game being built).

## Notes for this slice

- Slices 1–10 are done (head `3e3e4f3f`). The command is in `src/server/account-role.ts` (slice 3): read it for the usage `node dist/server/account-role.js owner|player <email>`, its exit codes and the sentences of its outcomes, and `tests/account-owner.test.mjs` for the events; the panel's routes are in `src/server/owner-routes.ts`; the screen's behaviour is in the styleguide's rule "The list of accounts" and decision D-411 (read D-410 and D-411 whole as well; the foundation step wrote them). The skill must say only what these files and decisions say.
- **Amendment A7 (orchestrator's, recorded): this slice's *Change* also includes the two copies of `references/troubleshooting.md`** (`.claude/skills/loop2-deploy/references/troubleshooting.md` and `.agents/skills/loop2-deploy/references/troubleshooting.md`), for one thing only: after slice 1 the current schema version is 6, and the sentences there that say the current code writes schema version 5 (lines ~116-120 and ~136-147, found by the review of slice 1) are false; make them true, the way they speak of versions 3, 4 and 5 now, and change nothing else in those files. The plan's sentence "No file under `references/` changes" does not stand. Keep the two copies in step with each other, byte for byte where the test of `tests/agent_workflow/test_loop2_deploy_skill.py` requires it.
- Do not put a real address, key or name of a person in the skill; use `<address>` placeholders (the human's own account is "the human's own account"). The test `tests/agent_workflow/test_tracked_file_private_paths.py` runs on your files.
- Say plainly in the skill, in the rollback section, what a return to an older commit meets after schema version 6, in the manner of the paragraphs on versions 3, 4 and 5; and in the human's first steps after deployment: give the owner role to their own account with the command, then look for „Panel właściciela” in the menu „Konto”.
- Plan *Checks* name the skill test and the private-paths test only; also run `python -B .the-way/elements/common/foundation_check.py` (exit code in the report), and run each check in the foreground with a time limit (`timeout 300 …`), never in the background without one.

## Your slice (copied word for word from `.runs/task-cycles/panel-wlasciciela/plan.md`)

### Slice 11 — The `loop2-deploy` skill describes the panel, the role command and when to use the commands

- **Goal:** the two copies of the skill, `.claude/skills/loop2-deploy/SKILL.md` and `.agents/skills/loop2-deploy/SKILL.md`, stay byte for byte the same (the test `tests/agent_workflow/test_loop2_deploy_skill.py` checks it, and the frontmatter description stays one line under 400 characters without `: ` and ` #`) and say: the owner panel (what an owner sees, that it blocks, unblocks, grants and revokes from the game, that it never blocks an account with the owner role, that its changes reach the container log as the events the commands write and so the dump without the human's wrapper); the role command (usage, exit codes, the reports and events as `src/server/account-role.ts` of Slice 3 has them; the section follows the shape of "The previous-save privilege" including the wrapper that appends the event lines to `/var/log/loop2-app.log`; only a human runs it, D-12; that after the first deployment of this change the human gives the owner role to the human's own account with it and checks that „Panel właściciela” stands in the menu „Konto”); when to reach for `account-block` and `account-previous-save` (the emergency way: the panel does not work, or the owner's account is blocked or not an owner yet, or an owner's account is to be blocked, which the panel refuses); and, in "Rollback", the schema version 6 that a return to an older commit meets as a refusal to start until a commit that knows it is deployed, in the manner of the paragraphs on versions 3, 4 and 5. The description in the frontmatter names the panel and the role command. No file under `references/` changes.
- **Change:** `.claude/skills/loop2-deploy/SKILL.md` · `.agents/skills/loop2-deploy/SKILL.md`
- **Read:** `guidelines/coding.md` · `src/server/account-block.ts` · `src/server/account-previous-save.ts` · `tests/agent_workflow/test_loop2_deploy_skill.py` · `foundations/decisions.md:3074-3092` D-137 · `foundations/decisions.md:10672-10685` D-400 · `foundations/decisions.md:358-376` D-12 · `.runs/task-cycles/panel-wlasciciela/task-frozen.md:29-38` To do · `.runs/task-cycles/panel-wlasciciela/task-frozen.md:97-99` Human actions · the new decision on the role · the glossary term "owner"
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` · `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py`
- **Depends on:** Slice 3 · Slice 4 · the foundation entries D-137 · D-400

## What the report holds

As `make-change` gives it for a slice: the status, the commits, each check with its command and exit code, the own-work check, the weakest point of your work and the check of it, **Reach beyond the handoff**, **Working copies**, **Unread material** (what your *Read* names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each `none` where it is).
