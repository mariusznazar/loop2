# Handoff — the return step (the one author, resumed)

## Delegation

As in your first handoff (`reports/author-handoff.md`): the person who requested this cycle delegated intermediate choices to the orchestrator; ask the human nothing; return questions to the orchestrator.

## What you make

- Stage: the return step, step 11 of the cycle. Read `.the-way/task-cycle/skill/return_step.md` whole and `.the-way/task-cycle/skill/foundation_step.md` whole (the return step writes as the foundation step writes), and the `SKILL.md` of an element at the path the latter gives when you write an entry of that element. Method: `.the-way/task-cycle/change/SKILL.md` — the return step takes none of its variant rows, as the cycle gives it.
- Worktree: `the root of the task's worktree`, branch `task/cztery-usterki-recenzji`, head now `f775999a` (the reviewed and passed fix). Task base `be8eea82`. The change's whole range: `be8eea82..f775999a`.
- Your directory for working copies: `.runs/author/` (the same). Your report: `.runs/task-cycles/cztery-usterki-recenzji/reports/return-step-report.md`.
- Commit explicitly by paths; no `git add -A`; messages in English in the repository's form; do not push; do not run the product's full gate. Run `python -B .the-way/elements/common/foundation_check.py` (without the skip switch) and any focused check your edits need, each with command and exit code in the report. Where you commit nothing, say so.

## What the return step compares

- The entries the change wrote or changed, each against the code at `f775999a`: D-112, D-231, D-430, D-431, D-153 and the invariant `account-database-schema`; the entries the task names (*Decisions in play*: D-112, D-137, D-139, D-231, D-255, D-153); and the part map of the touched parts (`account-server`, `build-tools`, `agent-workflow`, `product-foundation`) — do their responsibilities, files and trust boundaries still describe the code, the tests the change added included.
- The search of the whole foundation, once (way_of_working.md, "2. Search the foundation"): other entries that state the behaviour the change altered — a command that opens "under the same rules", an advice "run the command again", the opening of a database file, "only an existing database file", the readiness of the local start and its announced address (D-255 to D-258), the exit codes of the blocking and the backup commands (D-137, D-231, D-400, D-410, D-228, D-236, D-360), and the text of the skill that those entries quote. Read each entry the search finds whole; correct what no longer matches, in this change, through the element's skill.
- Settlements: rows 1-4 of *Settlements to record* of the frozen task were written whole by the foundation step (D-112 and D-231 for row 1, D-430 for row 2, D-431 for row 3, `account-database-schema` for row 4; row 4's invariant is named `account-schema-lifecycle` in the task, a withdrawn identifier merged into `account-database-schema`). Confirm each row's place in the report's section "Rows of *Settlements to record* written". Where a decision the change wrote carries a pair of examples and a test holds a part of its sentence, apply the rule of `return_step.md` (the clause `tests:`, a pair only for the part no test holds).
- Entry-by-test links: for each decision or invariant the change wrote or corrected, check that the tests carry their `decision:` / `invariant:` lines as the testing guidelines and the foundation check require.

## What the cycle has already settled and you must not redo

- The review of the whole change gave `FAIL b76678a7`; its findings I-1, I-2, M-1, M-2, M-3 were fixed in `ec7004e1` and `f775999a`, and the review of that fix gave `PASS f775999a` with one new Minor finding N-1 (within the task): the sentence "the role and previous-save commands still set up a new database in a file that holds none" in D-112's third paragraph, in both copies of the skill (`SKILL.md:556-557`) and in the comment at `src/server/database.ts:213-214` is true for an empty file or a SQLite file with no schema version, but not for a file that is no SQLite database at all (there `account-role.js` stops with exit 1, SQLite error 26, and leaves the file unchanged). A Minor finding of a fix review is not fixed in this cycle; it goes to the request's list. Do not correct N-1 in this step and do not report it as your own finding; where your comparison meets that sentence, say that it is N-1.
- `guidelines/coding-database-access.md` and the commands `account-role` and `account-previous-save` are outside the task's scope (the reviewer's grades M-4 and O-1); leave them.
- Written foundation entries stay in the English of the foundation (the guidelines files are in Polish; do not touch them in this step).

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

The report at the path above in the form the record's *Return step* section gives (foundation compared with code; decisions, invariants, environment facts, glossary terms, part-map changes written or changed; projected entries; rows of *Settlements to record* written), your status, your commits (or that you made none), a one-line check result, **Unread material** and **Searches not found or unclear** (or `none`), and the checks with command and exit code.
