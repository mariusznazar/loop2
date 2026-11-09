# Handoff - review of the return step's commits (`review-change`)

## Delegation

The human who requested this cycle delegated every intermediate choice to the orchestrator; nothing here is the human's approval. You did not make this change. You alone grade and scope your findings.
You are read-only with regard to tracked files; leave no temporary edit behind (a temporary checkout goes under `.runs/` and is removed again). You never ask the human. Finish all your own background work before you return.

## What you review

- Worktree: `the root of the repository`, branch `task/porzadki-z-uwag-pr`. Pinned process: `.the-way` at `294af7fde45323ac1851c014a03071a97fc38d96`.
- The return step's commits, range `60d4047..dada2f2` (compute it yourself: `git diff 60d4047..dada2f2`, `git log 60d4047..dada2f2`; confirm `git rev-parse HEAD` is `dada2f2`). They change `foundations/environment_facts.md` (three new facts: `docker-compose-down-volumes`, `docker-volume-prune-scope`, `docker-system-prune-volumes`) and `foundations/invariants.md` (the *Rests on* of `account-save-durable-storage` names them).
- Method: read `.the-way/task-cycle/review/SKILL.md` whole. For the return step's commits section 2 applies "against the task and the foundation entries the return step writes or corrects"; read `.the-way/task-cycle/skill/return_step.md` and the environment-fact element (`.the-way/elements/environment_facts/`, its template, rules and examples; the project skill `the-way-record-environment-fact`) to judge the form.
- The agent's report (claims to verify, not evidence): `.runs/task-cycles/porzadki-z-uwag-pr/reports/return-step-report.md`. The task, read whole: `.runs/task-cycles/porzadki-z-uwag-pr/task.md` (its item 28 is the reason for the facts). The source the facts rest on, as the orchestrator fetched it: `.runs/task-cycles/porzadki-z-uwag-pr/reports/05-docker-docs-excerpts.md`; its public URLs may be fetched again by you (no login; a generic client name; no personal data in any request).
- The cycle's answers at start: trust boundary - yes (not touched by these commits); irreversible operation - no.
- Full report: `.runs/task-cycles/porzadki-z-uwag-pr/reports/return-review.md`; its first line `PASS dada2f2` or `FAIL dada2f2`.

## Questions to compute, beside the full scope of the review

- Does each sentence of each new fact say only what its quoted source passage says (read the passage at the URL and the pinned commit the entry cites; check the 12 quoted passages the agent reports against the pages), and does any sentence say more, in particular about a Docker Engine version?
- Is each fact one the template allows (a fact about something outside the product that an entry rests on), with a *Source* in the form the rules give, and do the three names follow the naming of the other facts? Does the `foundation_check.py` pass (run it)?
- The agent named the three facts in the *Rests on* of the invariant `account-save-durable-storage`. Is that link right (what does that invariant rest on, and does the skill text it concerns bear on it), or is it a link the facts' rules do not call for? Does the change to `foundations/invariants.md` alter anything else?
- The agent did not correct D-253 (it says "handling" and the launcher `scripts/measure-passwords.mjs` has no handler of its own), and did not touch the skill row `backup_and_restore.md` exit table (an observation). Do you hold either wrong, with evidence?

## What to return

The report's first line, then graded findings (blocking, Minor; each with place and own words; say where a Minor lies outside the task), the checks you ran as command and exit code, reaches beyond the handoff, and **Searches not found or unclear**. Return to the orchestrator only the first line, a one-line check result and the report path.
