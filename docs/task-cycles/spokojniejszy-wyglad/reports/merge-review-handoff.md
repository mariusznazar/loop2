# Handoff — review of the reconciliation with the target branch

You review, as an agent that did not make the change, the merge commit `ce465a2a` that merges
`origin/main` (01418389, PR #77 of the task `zbieranie-jako-widowisko`, task 17) into the task branch.
Read-only; change no tracked file, commit nothing, run no full `npm test`.

Method: `review-change`, by `.the-way/task-cycle/review/SKILL.md` (read whole). Your variant is the review
of the reconciliation with the target branch (the merge): what it reads is the dispatch's selection
below, as for any review other than the whole change's. Worktree (work from its root; process root is its
`.the-way`, pinned `52f8164a354ee1a704af0d58add2f3be8e4f0247`): `the worktree's root`.

## Range

First parent (the reviewed task branch, whole change `PASS` and its fix `PASS`):
`1355b9106713cdc3f162bc53b2b6255dca82e982`; second parent (the target branch): `01418389…`
(`git rev-parse ce465a2a^2`); merge head `ce465a2a` — confirm `git rev-parse HEAD` first, expanding the
short form. Compute the diffs yourself: `git diff 1355b910..ce465a2a` (what the merge changes on the task
side), `git diff 01418389..ce465a2a` (what the task adds on the target's side) and
`git diff --cc ce465a2a` for the conflicts' resolution. The author's report of the resolution:
`.runs/task-cycles/spokojniejszy-wyglad/reports/merge-report.md` (claims to verify, not evidence).

## The question

Do the two sides still hold together? The task (frozen, read whole:
`.runs/task-cycles/spokojniejszy-wyglad/task.md`, *To do* 1–10) takes the footer of credits off every screen and
puts one folded section of credits last on Siedziba and on the login card. Its *To do* 2 says word for word:
"Wiersze wzmianek o paczkach obrazków — o paczce z wilkiem, którą przynosi zadanie 20, i o paczce Smoke & Fire
Animated Particle [16x16], którą przynosi zadanie 17 — stoją tam, gdzie D-27 stawia wzmianki w chwili cyklu
danego zadania. Jeśli któreś z tych zadań wejdzie przed tym zadaniem, to zadanie przenosi jego wiersz ze
stopki do sekcji w Siedzibie razem z resztą wzmianek; jeśli wejdzie po nim, dopisuje swój wiersz od razu do
zwiniętych sekcji w Siedzibie i na karcie logowania." Task 17 reached `origin/main` first, so its pack row had to
move from its footer line into the sections. Check that it did on both screens, with its text and links as task 17
wrote them, and that nothing in code, tests, foundation or guidelines still speaks of a footer or breaks.

Foundation entries the merge brought in that bear on the parts the change touches (name which you read): decisions
D-271 (the pictures of the scene and where their credit stands), D-316, D-364, D-365, D-366, D-367; the
invariant `sprite-credits`; the environment fact `smoke-fire-particle-licence`; the part-map line for the pack
Smoke & Fire in the external context; the changes of `guidelines/styleguide-browser-view.md` on both sides.
Also D-27, D-40, D-43, D-47, D-262, `icon-credits` as the task changed them. The change's answers of
step 4: trust boundary no; irreversible operation no.

Checks: you may run focused checks on a scratch copy outside the worktree or on the worktree leaving it clean.
`git status --short` must stay empty.

## Your report

`.runs/task-cycles/spokojniejszy-wyglad/reports/merge-review-report.md`, first line `PASS <sha>` or
`FAIL <sha>`, graded findings (only the Critical and Important block), changed files with line counts of the
range `1355b910..ce465a2a`, your checks with command and exit code, **Unread material** and
**Searches not found or unclear** (`none` where none). Return the first line, a one-line check result, the path
and your questions.
