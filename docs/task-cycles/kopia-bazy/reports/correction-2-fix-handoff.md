# Handoff — fix of the review of correction 2, task kopia-bazy

You make: the fix of a review's findings. Read `.the-way/task-cycle/change/SKILL.md` again for that variant, and `.the-way/task-cycle/change/fix.md`.

**Findings.** R1 and R2 of `docs/task-cycles/kopia-bazy/reports/correction-2-review-report.md`, section *Blocking findings*. Fix those two; its Minor is not yours.

**Bound answers.**
- R2: the build of step 4 names the checkout's path and stays in the private folder, so nothing moves: `docker build --build-arg LOOP2_COMMIT=<sha> -t <image> <path of the clean checkout>`. Step 5's launcher path stays whole. If you hold the reviewer's fix better, say why.
- R1: as the finding gives: `Set-Location ..` after the two `icacls` lines and before `Remove-Item`, and one line for what a `True` means: the folder still holds the plain database and the keys, so read the error, leave the folder, and remove it again before going on.

**Checks.** Walk steps 4 to 8 in Windows PowerShell 5.1 on scratch files in a scratch folder in your own scratch space, as far as they run without `docker` and `age`, and say that the removal ended with `False`. `python -B .the-way/elements/common/foundation_check.py`; `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py`; `diff -r` of the two skill copies; each with its command and exit code. Both copies stay byte-identical. Do not touch the server. Do not push. A commit message in English in the repository's form; `git add` by path.

**Report.** `docs/task-cycles/kopia-bazy/reports/correction-2-fix-report.md`: each finding as fixed with the check that shows it, or contested with the evidence, and **Searches not found or unclear**.

**Return.** Your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
