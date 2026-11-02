# Handoff — one author, reguly-awarii-i-logow

The person who requested this cycle delegated intermediate choices to the cycle's orchestrator. Send
questions to the orchestrator; never ask the human, never start the next stage.

- **Worktree (work only here, from its root):** `C:\Storage\repos\loop2-wt\reguly-awarii-i-logow`
- **Branch:** `task/reguly-awarii-i-logow`; **base:** `54b2b7831cfb08c8e2d3eda8bfaf87b9a4205470`; **pin:** `f45ca40`
- **Method:** read `.the-way/task-cycle/change/SKILL.md` whole, variant **"the whole change as the one author"**. Read a file it names only when the step that names it comes.
- **Foundation step:** with your code; read `.the-way/task-cycle/skill/foundation_step.md` whole, and the skill of an element when you write an entry of it. Use the project skills `the-way-record-decision`, never a personal skill of another name.
- **Stage and boundary:** make the whole change, the entries and the code, then return before review. The gate is the orchestrator's; run your focused checks with `npm test -- <one file>` or the method's way.
- **Frozen task, read whole:** `.runs/task-cycles/reguly-awarii-i-logow/task.md`
- **Report path:** `.runs/task-cycles/reguly-awarii-i-logow/reports/02-author-report.md`

## Step 4 answers

- Trust boundary: **yes** — `src/server/**` and `src/browser/sim/saved-game.ts`. Crafted input there must not change what a log line means or holds, and a crafted saved document stays a refusal.
- Irreversible operation: **no**.
- Open design choice: **none**. Whether the load's unexpected error reaches the view as a thrown error or as a third result is yours to make and name; row 3's meaning binds, the wording of D-213 is yours.
- Route: one author, class `same`.

## What to read

Foundation entries, each whole, from `foundations/decisions.md` and `foundations/invariants.md`:

- Decisions: D-04, D-28, D-96, D-97, D-111, D-137, D-139, D-152, D-156, D-160, D-162, D-204, D-206, D-207, D-209, D-211, D-213, D-222, D-224, D-227, D-229, D-231, D-233.
- Invariants: save-version, simulation-isolation, simulation-inputs, expired-session-unsaved-progress, account-startup-configuration, blocked-account-access, account-save-backup, account-save-backup-failure-notice, account-server-occupied-address, email-confirmation-link, password-reset-verified-email.
- The part map's entries of account-server, simulation, browser-view, agent-workflow, product-foundation.

Guidelines, each whole: `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/coding-http-application.md`, `guidelines/coding-database-access.md`, `guidelines/coding-mail-sending.md`, `guidelines/coding-saved-game.md`, `guidelines/coding-browser-module.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-content-data.md`, `guidelines/styleguide-browser-view.md`; also `src/browser/AGENTS.md`.

The template of the six rules: `.the-way/product-guidelines/coding/template.md`, whole, with `.the-way/product-guidelines/template.md`.

Sources the task cites, ignored by git and so outside the worktree; read by absolute path:

- `C:\Storage\repos\loop2\.runs\coding\failure-rules-proposals.md`, `C:\Storage\repos\loop2\.runs\coding\failure-rules-critique-verdict.md`
- `C:\Storage\repos\loop2\.runs\coding\audit-server.md`, `audit-browser.md`, `audit-simulation.md` beside them, where a place of the task needs more than the task says.

## Answers already given

- **Files of question 14.** The 16, 6 and 8 are every `.ts` of `src/browser/view/**` (controls included), of `src/browser/sim/data/`, and of `src/browser/sim/` apart from `saved-game.ts`, that the kind's table lacks. `git ls-files` gives exactly those counts: 27−11, 12−6, 16−8.
- **Field names of a line.** `event` or `failure`, `kind`, `code`, `place`, and the listed identifier `accountId`; a further field of a line, such as `linkPurpose`, is a field and no item of the list (proposals P2, verdict line 7).

## Questions to work out, beside the whole scope

These add to the task; they do not narrow it.

1. The load has two callers of `startFrom` in `src/browser/view/app.ts`: the save downloaded from the server and the state kept in page memory (D-211). After an unexpected error and „Spróbuj ponownie”, is the player's save or kept state still there, in both? What does a retry repeat, and does anything save at that moment?
2. Does the rule „Nic tajnego w dzienniku” in `guidelines/coding-mail-sending.md` still hold once „unknown” goes, in its *Good* as well as in the example „Dziennik porażki”?
3. D-96 says what the player sees of a discarded save. Does row 3's outcome need a change there too, or is it covered by what the search of the foundation finds for D-213?
4. Does anything read the exact text the commands print today: a test, or `deploy/loop2-backup`, which lives on the server as a copy this change does not reach?
5. The original error's message may quote values. Which fields of a thrown error does the line read, and can a crafted request or saved document make any of them hold what the rule on secrets forbids?

The task can be wrong. If a place, a count or a value in it does not pass your own check, say so in the report rather than bending the code to it. If a row of *Settlements to record* cannot hold, return the question as the foundation step gives.

Write code, identifiers and comments in English; the guidelines of this repository stay in Polish, and decisions in English, as their files stand. Commit messages are in English, in the form of the repository's log; stage by explicit paths, never `git add -A`.
