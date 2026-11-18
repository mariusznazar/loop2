# Handoff — review of the commits of the return step

## Delegation

The person who requested this cycle delegated intermediate choices to the orchestrator. You are a fresh reviewer that made none of the change and did not review it before. Ask the human nothing; return questions to the orchestrator. You are read-only: you change no tracked file and make no commit.

## What you review

- Stage: the review of the return step's commits, method `.the-way/task-cycle/review/SKILL.md` (section 2 gives how the return step's commits are reviewed: against the task and the foundation entries the return step writes or corrects). Read the `SKILL.md` whole; a file it names only when its step comes. The return step's own method is `.the-way/task-cycle/skill/return_step.md` (read it, it is short).
- Worktree (work only from its root): `the root of the task's worktree`, branch `task/cztery-usterki-recenzji`.
- Range: base `f775999a` (the head of the change that passed its reviews) to head `11a0f28d`. One commit, `11a0f28d`, one line of `foundations/decisions.md` (the *Based on* of D-431). Compute `git diff f775999a..11a0f28d` and `git log f775999a..11a0f28d` yourself; confirm `git rev-parse HEAD` is `11a0f28d`. The whole change for context: `be8eea82..11a0f28d` — you review only the return step's range.
- Return step report (claims to verify, not evidence): `reports/return-step-report.md` (it says it compared D-112, D-231, D-430, D-431, D-153 and the invariant `account-database-schema` with the code at `f775999a`, found them in agreement, searched the foundation once and found nothing else to correct, and made one correction: D-431's *Based on* now quotes the Node.js 24 documentation page for the channel `net.server.socket`; it wrote no environment fact, glossary term or part-map entry).
- Frozen task (read whole): `.runs/task-cycles/cztery-usterki-recenzji/task-frozen.md` (rows 1-4 of *Settlements to record*; D-431 is row 3's entry).
- Entries you read whole, each from its heading to the next heading of any level: D-431, D-229 (the same kind of risk, for `node:sqlite`, as a model of how a risk and its source are recorded), D-255 to D-258 as far as they bear on the local start, and the decisions template `.the-way/elements/decisions/template.md` with `.the-way/elements/common/rules.md` for what *Based on* and its citations may hold (a citation names its place, its passage and the date read; an environment fact is the place for a source outside the product that other entries rest on). Judge whether quoting the page in *Based on*, and writing no environment fact, is right here, and whether the quotation is faithful to what the page says: the page is `https://nodejs.org/docs/latest-v24.x/api/diagnostics_channel.html`; the return step read it on 2026-11-18 and says its subsection `net.server.socket` states "Stability: 1 - Experimental". You may read the page yourself through the fetch tool you have, if you have one; where you cannot, say so under **Searches not found or unclear** and judge by form.
- Run `python -B .the-way/elements/common/foundation_check.py` (read-only) and name its exit code.
- Do not run the product's full gate (`npm test` with no file argument).

## Known context, not yours to judge again

The change itself was reviewed: the review of the whole change gave `FAIL b76678a7` (blocking I-1, I-2 within the task; Minor M-1 to M-3 within the task; M-4 outside; O-1 out of scope), the fix `ec7004e1` and `f775999a` was reviewed `PASS f775999a` with one new Minor finding N-1 (the sentence that the role and previous-save commands "still set up a new database in a file that holds none" in D-112's third paragraph, both skill copies and the comment at `src/server/database.ts:213-214` is false for a file that is no SQLite database at all). N-1 stands on the request's list; the return step left it by the cycle's instruction. Do not report N-1 or the earlier findings again as new ones; report a finding only if it is in the return step's range or the return step's claim that nothing else needed correction is false (name the entry and what it says against the code).

## Answers of step 4

Trust boundary: yes (the whole change touches `src/server/**` and `scripts/local-start.mjs`); the return step's own range touches only `foundations/decisions.md`. Irreversible operation: no.

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

Your directory for working copies: `.runs/review-return/`. Your report: `.runs/task-cycles/cztery-usterki-recenzji/reports/review-return-report.md`; its first line `PASS <sha>` or `FAIL <sha>`.

## What you return

The report's first line, its path, the graded findings in short (each within or outside the task), your checks with command and exit code, **Unread material** and **Searches not found or unclear** (or `none`).
