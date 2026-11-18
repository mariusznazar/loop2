# Handoff — the fix of a review's findings (the one author, resumed)

## Delegation

As in your first handoff (`reports/author-handoff.md`): the person who requested this cycle delegated intermediate choices to the orchestrator; nothing the orchestrator answers is that person's approval; ask the human nothing.

## What you make

- Variant: "the fix of a review's findings", method `.the-way/task-cycle/change/SKILL.md`; read `.the-way/task-cycle/change/fix.md` and follow it.
- Findings file (the reviewer's words, cut by the orchestrator): `reports/whole-review-findings.md` — blocking findings I-1 and I-2 (both within the task), then Minor findings M-1, M-2 and M-3 within the task. The full review is `reports/review-whole-report.md` (first line `FAIL b76678a7766a49940567952cc008592898dd0731`), for the evidence behind a finding; you read its parts only where a finding needs them.
- Worktree: `the root of the task's worktree`, branch `task/cztery-usterki-recenzji`. The fix's range runs from the reviewed head `b76678a7`.
- Your directory for working copies: `.runs/author/` (the same as before). The report: `.runs/task-cycles/cztery-usterki-recenzji/reports/fix-report.md`.
- Commit explicitly by paths; no `git add -A`; messages in English in the form of the repository's commits. Do not push. Do not run the product's full gate. Run the focused checks of what you change again, each with command and exit code in the report.

## The orchestrator's choices where the findings leave a way open (autonomous, recorded)

- I-1: take way (a) of the reviewer: qualify the sentences so they say what the code does — the blocking command of D-137 and the backup command of D-231 never set up a new database and refuse a file in which the server set up no tables; the commands of D-400 and D-410 (`account-role`, `account-previous-save`) still set one up in a file that holds none. Change D-112 (third paragraph, *Rationale*, and the first paragraph's "under the same rules" so that it is no longer contradicted), the comment at `src/server/database.ts:211`, both copies of the skill (`.claude/skills/loop2-deploy/SKILL.md`, `.agents/skills/loop2-deploy/SKILL.md`, which stay identical) and every other place you find that restates the broad sentence (search for it; name the places in the report). Do not give the two other commands `existingOnly`: that is the follow-up task the request will list. Check that D-430 and D-231 agree with the new wording. D-112 is changed through the decisions skill's method as before (`foundation_step.md`, `elements/decisions/skill/SKILL.md`).
- I-2: take way (a): a second sentence for exit 3 that names the case — e.g. "LOOP2_DATABASE_PATH names a file that holds no account database. Nothing changed." for the blocking command and "… Nothing was written." for the backup command (choose the exact words, in the style of the existing sentences), used only for the refused file, while the missing file keeps its present sentence and the same exit code 3; the tests assert the new sentence for the empty file, the non-SQLite file and the foreign SQLite file (and the missing file keeps its own sentence assertion), the skill's exit-3 clause and the backup reference name the case, and D-112's *Rejected* clause then stays true — reread it against the code. The nightly backup script reads no sentence and no code number; keep that true.
- M-1, M-3: as the findings say. M-2: of the reviewer's two ways, prefer one sentence back that says what the two environment facts hold (the application handed both kinds of message to the mail service without a failure; arrival is the person's observation), written from those facts and not from memory, provided it contradicts nothing in point 7 of the frozen task and keeps `foundation_check.py` at 0 errors; if it does not fit, take the other way and say why. Add nothing the task does not give.
- Not yours to fix: M-4 and O-1 are outside the task's scope (the reviewer's grade; the orchestrator moves no finding).

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

As the fix method gives it: the report at the path above, your status, your commits (the fix's range from `b76678a7`), a one-line check result, each finding and how it was fixed (or the evidence if you hold one wrong), **Unread material** and **Searches not found or unclear** (or `none`), and the checks with command and exit code. A finding you hold wrong is answered with evidence, never silently skipped.
