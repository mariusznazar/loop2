# Handoff — executor of slice 6 ("panel właściciela")

## Delegation and place

The person who requested this cycle has delegated intermediate choices to the orchestrator of `implement-task`; nothing here is that person's approval, and you never ask the human. A question goes to the orchestrator in your report (status `questions`); a missing fact or permission returns `blocked`; an open design choice the task, the plan and the foundation leave open returns `returned` with no code, as `make-change` gives.

- Worktree (work only from its root): `the task's worktree` — branch `task/panel-wlasciciela`. Your slice's base: `175d6d42` (the head when you were dispatched). Commit on this branch, by explicit paths (`git add <path>…`, never `-A`, `.` or `commit -a`), in English, in the form of the repository's earlier commits (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`); never force-push, never rewrite history.
- Method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole; variant **"a slice, or the retry of a slice"**. A file it names, one beside it included, you read only when the step or variant that names it comes. You have no skill tool: a skill the method or your slice names by its name is the `SKILL.md` whose frontmatter `name:` is that name, read as a file (the project skills stand in `.claude/skills/the-way-*/SKILL.md`).
- Frozen task (read the passages your slice's *Read* names; the whole where you need it): `.runs/task-cycles/panel-wlasciciela/task-frozen.md`. Plan: `.runs/task-cycles/panel-wlasciciela/plan.md` — your slice's section is copied below word for word, and what the plan's other sections hold for you is in the *Read* line. No spec.
- Answers of step 4: **trust boundary: yes** for the change as a whole (the owner routes and the role command are inside `account-server`'s trust boundary); **irreversible operation: no** (you run no command on a server and no real account is touched). This slice's *Risk*: none
- Class of model: `cheaper`.
- Your directory for working copies: `.runs/executor-6/`. Your report: `.runs/task-cycles/panel-wlasciciela/reports/executor-6-report.md`.
- You run the focused checks your slice's *Checks* names, each with its command and exit code in the report. You never run the product's gate (bare `npm test` with no file); the orchestrator runs it.

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Names the plan uses, settled by the foundation step (already committed, head `175d6d42`)

- "the new decision on the role" = **D-410** (the role of an account); "the new decision on the screen of the list" = **D-411**; "the glossary term "owner"" = `foundations/glossary.md:272-277`. Read the ones your slice's *Read* names, each whole.
- The plan's ranges of decisions are those of the base `b1904c5b`; the file has grown. **Use these current ranges** where they differ from the plan's (find each by its heading `### D-nnn`):

| Decision | Current range |
|---|---|
| D-44 | `foundations/decisions.md:1098-1112` |
| D-280 | `foundations/decisions.md:7296-7365` |
| D-281 | `foundations/decisions.md:7366-7411` |
| D-402 | `foundations/decisions.md:10732-10746` |
| D-410 | `foundations/decisions.md:10894-10910` |
| D-411 | `foundations/decisions.md:10911-10936` |

- Orchestrator's choices that bind you: **A1** — each entry of the list of accounts carries a fourth field, the role (`role`: `player` or `owner`), beside the email address, the blocked state and the previous-save privilege; the screen uses it only to show the role and to leave out „Zablokuj” at an owner's row. **A2** — the foundation step has already brought the comment lines `// decision: D-nnn "…"` of D-112, D-253 and D-354 into line (`tests/account-backup.test.mjs`, `tests/account-storage.test.mjs`, `tests/startup.test.mjs`); you change no such line unless your slice's text says so, and `python -B .the-way/elements/common/foundation_check.py` must stay at `0 errors`.
- A line of a test `// decision: D-nnn "quoted sentence"` quotes a sentence of that decision as it stands in `foundations/decisions.md`; a test you write that holds a sentence of a decision carries such a line, per `guidelines/testing.md`.
- **Checks beyond your slice's *Checks* (a finding of slice 1's review found the plan's list lacks them):** before each commit run `npx prettier --check <every .ts, .tsx, .mjs and .css file you changed>` and `npx eslint <every .ts, .tsx and .mjs file you changed>`; the gate's tests `test_prettier_source_format` and the ESLint test fail otherwise (`guidelines/coding.md`, rule *Formatter*). Format with `npx prettier --write <file>`, no option added, and check the diff changed only your lines. Give each command and exit code in the report.
- Names in the code: the account's role in `src/browser/view/app.ts` is named `role`, never `owner` (that file's variable `owner` names the account that owns the game being built).

## Notes for this slice

- Slices 1–5 are done (head `175d6d42`). This slice has no review of its own; the review of the whole change compares the guideline you write with `.the-way/product-guidelines/template.md` and the styleguide template (`.the-way/product-guidelines/styleguide/template.md`, where it exists) and judges the screens of slices 7–10 against it — write rules a reviewer can check against a rendered screen.
- The skill `the-way-maintain-styleguide` is built to lead a refinement with the human. Here its work is bounded by the plan's Goal and the task's To do 7: you read its `SKILL.md` and the files it names (as a file; you have no skill tool) for the *form* of a rule (what a rule holds, how an exemplar and a role are named), and you write only what the Goal lists; you ask no human and add no token, no shared control and no new state of one. Where the skill requires a decision the Goal and the foundation do not settle, say so in the report as a question and write the smallest rule the foundation (D-411, D-280, D-281, D-44, D-402) already supports.
- Do not run a script that rewrites the styleguide wholesale; edit it by hand in the places the Goal lists. Quote no text of the task or the plan in the styleguide: its rules stand on their own.
- Your slice has no code, so the added *Checks* of prettier and eslint do not apply; the plan's checks do (`foundation_check.py`, the private-paths test).

## Your slice (copied word for word from `.runs/task-cycles/panel-wlasciciela/plan.md`)

### Slice 6 — The styleguide describes the owner's screen, link and destructive button

- **Goal:** `guidelines/styleguide-browser-view.md`, through the project skill `the-way-maintain-styleguide` (read `.claude/skills/the-way-maintain-styleguide/SKILL.md` and the files it names), describes: the screen of the list of accounts at `#/konta` (rows with the address, the blocked state, the privilege and the role, the four buttons of each row, the roles of the roles table that each text takes in their existing meanings and no new role or value, the confirmation of „Zablokuj” with what it says, no „Zablokuj” at an owner's account, the empty and the failed list); the link „Panel właściciela” in the menu „Konto” of an owner, first after the address and before the buttons, an ordinary link of the menu and no item of the bar, so that the bar is the same for a player and an owner; and „Zablokuj” in the list of destructive buttons of the rule *States of shared controls* (neutral at rest, text in `danger` under the pointer and at the focus, disabled and keeping its text while it waits for the server). It follows the order of work of the styleguide's example for a change that adds no token, no shared control and no state of one: it writes the rules before the screen is made, and Slices 7 to 10 are judged against them.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `.claude/skills/the-way-maintain-styleguide/SKILL.md` · `foundations/decisions.md:7278-7340` D-280 · `foundations/decisions.md:7342-7382` D-281 · `foundations/decisions.md:1098-1111` D-44 · `foundations/decisions.md:10702-10715` D-402 · `.runs/task-cycles/panel-wlasciciela/task-frozen.md:29-38` To do · the new decision on the screen of the list · the glossary term "owner"
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` · `npm test -- tests/agent_workflow/test_tracked_file_private_paths.py`
- **Depends on:** the foundation entries D-280 · D-281 · the new decision on the screen of the list

## What the report holds

As `make-change` gives it for a slice: the status, the commits, each check with its command and exit code, the own-work check, the weakest point of your work and the check of it, **Reach beyond the handoff**, **Working copies**, **Unread material** (what your *Read* names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each `none` where it is).
