# Handoff — a correction for the human's remarks, task pierwsza-akcja-od-startu

You are the one author, resumed. Work only in the worktree `the root of the task's worktree`, branch `task/pierwsza-akcja-od-startu`, head `5daa2b8519ecb6545c31a3020b758e8868ff13e3` (the code head is `e6ac95cd`; the two commits above it add and remove the record's copy under `docs/task-cycles/`). The request is https://github.com/mariusznazar/loop2/pull/98. Main has not moved, so no merge came in.

Method: `.the-way/task-cycle/change/SKILL.md`, variant **a correction for the human's remarks**; read the file it names for a correction when that step comes. The remarks bind; they are no findings file.

## The remarks (the human's day advisor in the human's name; comment 6878308098 on the request, quoted)

> **Fix or let through:**
> - **2. Fix in this request.** "Three small wording points remained after the last review, none of which changes what the game does: the title of the first-pass test repeats the number 289 that also stands as a constant, so a later revision of the figure would leave a false title; one clause of the entry on the band says the game wrote no rule whenever the player's own rule has run, which is wrong in the one case where the player deleted such a rule; and an example in the entry on the accepted figure carries the other account's 290, which may go stale." Fix all three: the clause of the entry on the band is a binding sentence that is false in one case the game reaches, and agents read it as true; the other two are one line each and cost nothing extra in the same fix.
>
> **Let through:** 1 (screens not looked at in a real browser), 3 (the reading of the whole-change review) and 4 (the placeholder in `cross-part-imports`): nothing to do for them.

## The three points, in the reviewer's words (`reports/review-fix-report.md`, "New findings in the fix diff")

1. **The number stands twice in the test.** `tests/sim/new-account-first-pass.test.mjs:145` has "…at least 289 of the 300 named seeds" in the test's title, beside `ACCEPTED_SEEDS = 289` at line 27; the addendum asked for the number once. A revision of the constant would leave the title false. Fix: take the number out of the title ("…on at least the accepted number of the 300 named seeds").
2. **D-312's binding sentence says "and so the game wrote none" of the record that holds a minute of exploring.** In the accepted case where the player deleted every carried-out rule „Eksploruj”, the record holds a minute of exploring although the game did write a rule; the *Rationale* says so, the clause "and so the game wrote none" does not. Read as a cause of the omission it overstates by that one case; the omission itself matches the code. Fix: end the clause after "(D-123)" without "and so the game wrote none".
3. **D-404's "complies" example carries the measurement of the other account (290).** After the balance work it may go stale with the figure; harmless, since the entry says the figure is to be revised.

## What to do

- Make the three fixes. For point 2, the binding sentence of D-312 must be true for every state the game reaches, so read the sentence whole with its *Verification* examples and *Rationale* and make them agree (the examples must not call a true case a violation); D-345 quotes D-312, so check it still agrees. Edit the entries through `.claude/skills/the-way-record-decision/SKILL.md` (read it whole). For point 3, take the figure 290 out of the example, keeping the example's meaning; check whether other text of the foundation or tests quotes it.
- Only the entries and the title these remarks touch. Do not touch the code, the threshold or the figure 289, or anything else.
- **Repeat the return step for what the remarks touch**, in your report: compare D-312, D-345, D-404 and the invariant `new-account-first-pass` as they now stand with the code and with each other (`.the-way/task-cycle/skill/return_step.md`, read whole); name what matches and what you corrected. A foundation entry is written only if the comparison finds one that is missing; the remarks ask for none.
- Checks: `npm test tests/sim/new-account-first-pass.test.mjs` (one file; run `npm run build` first only if the test needs it, as `scripts/test.py` gives), `npx prettier --check` and `npx eslint` on the changed test file, `python -B .the-way/elements/common/foundation_check.py` as your own check. **No full gate**: the human's day advisor holds it until a start signal, and another session's gate is running on this machine now; no mutation analysis; no real-browser run.
- Commit on the task branch by explicit paths, English message in the repository's form, no push, nothing under `docs/task-cycles/`.

## Report

`docs/task-cycles/pierwsza-akcja-od-startu/reports/correction-1-report.md`: each of the three points fixed or answered with evidence; the return-step comparison with its items (Foundation compared with code · Decisions written or changed · Invariants · Environment facts · Glossary terms · Part-map changes · Projected entries · Rows of settlements); each check as command and exit code; **Unread material**; **Searches not found or unclear**; own-work check; the commit. Return status, commit, one-line check result and the report's path.
