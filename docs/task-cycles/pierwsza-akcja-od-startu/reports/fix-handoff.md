# Handoff — the fix of a review's findings, task pierwsza-akcja-od-startu

You are the one author, resumed. Work only in the worktree `the root of the task's worktree`, branch `task/pierwsza-akcja-od-startu`, reviewed head `17d830188d8469a55518eefa1ab313e5cd41b08f`. Method: `.the-way/task-cycle/change/SKILL.md`, variant **the fix of a review's findings**; read the file it names for a fix when that step comes.

## Findings

The findings file is `reports/findings-1.md` (full path: `docs/task-cycles/pierwsza-akcja-od-startu/reports/findings-1.md` in the worktree): the review's blocking finding F1 and its Minor findings within the task M1, M2, M3, in the reviewer's words. The whole review is in `reports/review-whole-report.md`; read the passage of a finding there if you need its evidence.

## What to do with each (the orchestrator's choices)

- **F1** — reword D-312 so its binding sentence and its *Verification* "violates" example say what the code does: the band and the chronicle leave the sentence out where the record of the map run holds a minute of exploring (the player's rule has been carried out), and say in the *Rationale* that a player's own rule not yet carried out is still named as the game's, and that the game's rule goes unnamed where the player deleted a rule that had run. The first of the reviewer's two ways. No code change. Check that D-345 and any other entry that quotes D-312's sentence still agree.
- **M1** — drop the `invariants: save-version` line from D-403's *Verification* and keep its pair of examples (the reviewer's first way).
- **M2** — narrow the *Derives from* of `first-exploration-discovery` and `new-account-first-pass` to D-121 alone, the entry whose *Verification* names them (the reviewer's first way); do not edit D-118, D-397 or D-398, which are outside this fix. Say in the entry of each invariant nothing more than the template asks.
- **M3** — **do not run the real-browser check in this fix.** The human's day advisor holds the full test gate and the heavy local runs until a start signal, and a local start of the game is such a run. Leave M3 unfixed and say so in your report; the orchestrator lists it as unchecked in the request.

## Rules that stay

- Do not change the test of item 8 or its threshold, the invariant `new-account-first-pass`'s `Violated` field, or any code: the failing measurement (289 of 300 against 290) goes to the human as it stands.
- Run no full gate (`npm test` with no argument) and no mutation analysis. After the edits run once `python -B .the-way/elements/common/foundation_check.py` as your own check (it is quick) and report it as yours; `npm test tests/sim/discovery.test.mjs` is allowed if a test cites D-312's wording.
- Commit on the task branch only, by explicit paths, English message in the repository's form, never push, never touch `docs/task-cycles/`. Write entries through the skills of their elements, reading each whole this time (`.claude/skills/the-way-record-decision/SKILL.md` and `.claude/skills/the-way-record-invariant/SKILL.md` and what they name for an edit).

## Report

Write the report of the fix to `docs/task-cycles/pierwsza-akcja-od-startu/reports/fix-report.md` in the form `make-change` gives for a fix (each finding: fixed, or answered with evidence; every check as command and exit code; **Unread material**; **Searches not found or unclear**; own-work check; commits). Return status, commits, a one-line check result and the report's path.
