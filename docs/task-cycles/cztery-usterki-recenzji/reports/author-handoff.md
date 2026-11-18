# Handoff — the one author, the whole change

## Delegation

The person who requested this cycle delegated intermediate choices to the orchestrator; nothing the orchestrator answers here is that person's approval. The human reviews the pull request at the end, not intermediate steps. Do not ask the human anything; return questions to the orchestrator.

## Where you work

- Worktree (work only from its root): `the root of the task's worktree`, branch `task/cztery-usterki-recenzji`, base `be8eea82` (`origin/main`). `.the-way` is at the pinned commit `bfb2e109735b5fff98802b8be0ff3c43c799262a`; dependencies are installed (`npm ci` done).
- Your directory for working copies: `.runs/author/` (directly under the ignored `.runs/` of the worktree).
- Your report: `.runs/task-cycles/cztery-usterki-recenzji/reports/author-report.md`.
- Commit explicitly by paths (`git add <path> ...`), never `git add -A`, `.` or `commit -a`. Commit messages in English, in the form of the existing commits of the repository (`type: :emoji: sentence`). Do not push. Code, identifiers, docstrings and comments in English; what the code prints or inserts into the product keeps its language (the commands' messages are English today, the game's texts Polish).

## Your stage and its boundary

- Stage: the whole change as the one author. Method: `.the-way/task-cycle/change/SKILL.md`, variant "the whole change as the one author". Read that `SKILL.md` whole; read a file it names only when its step or variant comes.
- You make: the code and its tests (points 1-6 of *To do*), the foundation entries the task carries (point 7 and the *Settlements to record*), as `.the-way/task-cycle/skill/foundation_step.md` gives — read it whole, and the `SKILL.md` of an element at the path it gives when you write an entry of that element. Foundation entries are written only through the project skills of the-way for their elements, read as files (you have no skill tool): the decision log through `.the-way/elements/decisions/skill/SKILL.md`, invariants through `.the-way/elements/invariants/skill/SKILL.md`, the glossary through `.the-way/elements/glossary/skill/SKILL.md`, the part map through `.the-way/elements/part-map/skill/SKILL.md`, environment facts through `.the-way/elements/environment-facts/skill/SKILL.md`.
- You return before any review. You do not run the product's full gate (`npm test`): its run is the orchestrator's, and it waits for a signal of the human's adviser. Run the focused checks of what you change (the test files of the commands, of the database, of the local start, of the skill copies, `python -B .the-way/elements/common/foundation_check.py` for the foundation, and the quality tests that bear on the files you touch), each with its command and exit code in the report.
- The cycle will resume you later for the fix of review findings and for the return step (`.the-way/task-cycle/skill/return_step.md`); do not start the return step now.

## The frozen task (read whole)

`.runs/task-cycles/cztery-usterki-recenzji/task-frozen.md`. Status `ready for cycle`, `Project relation: independent`, *Questions carried to cycle* none, *Human actions* none, *Out of scope* none. Its rows 1-4 of *Settlements to record* are accepted; you write them whole through the elements' skills (rows 1-3 decisions, row 4 an invariant).

## Answers of step 4 (the cycle's)

- Trust boundary: yes. `src/server/**` and `scripts/local-start.mjs` are trust boundaries in the part map; your change touches `src/server/account-block.ts`, `src/server/account-backup.ts`, `src/server/database.ts` and `scripts/local-start.mjs`. Every code review will check crafted input there (a crafted file given as the database path: empty, not SQLite, a foreign SQLite database without the schema version, a newer schema, a locked or corrupt file; a port taken by another program). Write tests for those inputs.
- Irreversible operation: no. You never run the blocking or the backup command against any real database of the test server, never deploy and never touch the server.
- Open design choice: none. Where you meet one, return `returned` with a report and no code (WAY-135). How to refuse a newer schema before the journal mode changes, while keeping the race safety that the version is read in the transaction that sets up or moves the database (task *Context*, last bullet), is a choice of how to make what D-112 settles: make it and name it in the report.
- Reserved choice: none.
- Checks the move of the pin carried: none (the pin did not move).

## Foundation entries to read by identifier (each whole; an entry runs from its heading to the next heading of any level)

Decisions of the task's *Decisions in play*: D-112, D-137, D-139, D-231, D-255, D-153. Related decisions of the parts the change touches: D-102, D-100 (the login message), D-160, D-228, D-236, D-256, D-257, D-258, D-405 (stages of the gate; for the one command only), D-410. An index of the decisions of the touched parts and sections, with their binding sentences and headings, lies in `.runs/orch/index.md` (59 KB; open whole only the decisions the work changes, goes against or whose binding sentences leave open what you have to do, as "Reading the foundation" in `.the-way/elements/common/way_of_working.md` gives). The invariants whose *Part* names `account-server`, `build-tools` or `agent-workflow` that bear on the files you change — among them `account-schema-lifecycle` (row 4) and the invariants the tests you alter cite by their lines `invariant:` and `decision:`. The glossary entries of the terms you use. Parts touched (by the part map `foundations/part_map.md`): account-server (`src/server/**`, `tests/account-*.test.mjs`, `tests/startup.test.mjs`, …), build-tools (`scripts/local-start.mjs`, `tests/invariants/test_local_start_access.py`, …), agent-workflow (`.claude/**`, `.agents/**`), product-foundation (`foundations/**`).

## Guidelines to read whole (the orchestrator selected them)

`guidelines/coding.md`, `guidelines/coding-database-access.md` (the commands keep no SQL of their own: every check of the database belongs to `src/server/database.ts`), `guidelines/testing.md`. No other kind row of the index matches (`scripts/local-start.mjs` has no kind of its own; the general file rules).

## Passages of the task and sources that bear on the work

- Point 7 of *To do* (D-153) with its source words of Mariusz, and the finding of the orchestrator: the grep for a switch that turns public recovery off found none (questions table Q1 of the cycle, restated here): no variable of `process.env`, setting, `compose.yaml` or `deploy/` file names recovery or password reset or switches it; the card has „Nie pamiętam hasła” (`src/browser/view/account-card.tsx`). Repeat that check yourself and report what you searched and found; if you find something that turns recovery off, return `blocked`/`returned` with the finding rather than changing the game or the server.
- D-153's *Rationale* carries sentences about the delivery test that point 7 replaces; the task gives the replacement text's content (what Mariusz did, on what mailbox, both message types arrived and their links worked, the source words, the missing date of the reset-password attempt, the removal of the sentence that no entry shows arrival at an external inbox, recovery enabled by Mariusz's decision of 2026-11-18). Take the words from the frozen task, add no fact the task does not give, and name the missing date as unknown. The *Verification* clause of D-153 that "is checked by no test" must be corrected too where it follows from the removed sentence.
- The two copies of the skill: `.claude/skills/loop2-deploy/SKILL.md` and `.agents/skills/loop2-deploy/SKILL.md` stay identical (a test holds that); the sentence at lines 419-420 and the descriptions of the blocking command and of the backup command change as points 1 and 6 say.
- The nightly backup script `deploy/loop2-backup` treats every non-zero exit of the backup command as a failure and does not depend on the code numbers; read it to be sure your change keeps that so.

## Working copies (the first paragraph of "Working copies" of `.the-way/task-cycle/skill/SKILL.md`, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
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

## What you return

Write the full report to the report path as the method gives it, and return to the orchestrator: your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, the report path, your questions and concerns, each reach beyond this handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), and your own-work check (WAY-164) with its command and exit code. A check you report carries its command and exit code. Secrets and personal data stay out of the report; the author's personal notes and the vault are not part of this repository and stay unread.
