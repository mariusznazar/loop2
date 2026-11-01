# Report — fix of the review of correction 2, task kopia-bazy

**Status:** done

- **R1 fixed.** Step 8 of "Trying a backup on the owner's computer" has `Set-Location ..` after the two `icacls` lines and before `Remove-Item`, a sentence why, and a line for `True`: the folder still holds the plain database and the keys; read the error, leave the folder, remove it again before going on.
- **R2 fixed as bound.** Step 4 reads `docker build --build-arg LOOP2_COMMIT=<sha> -t <image> <path of the clean checkout>` and says to stay in the private folder; step 5's launcher path was already whole.

**Walk** (Windows PowerShell 5.1, scratch folder in the session scratchpad `...\scratchpad\c2f-walk`, scratch files, no `docker` or `age`): private folder; key files made read-only with `icacls`; byte check printed `SQLite format 3`; a checkout folder beside the private folder, location still in the private folder; rights given back; `Set-Location ..`; `Remove-Item -Recurse -Force`; `Test-Path` printed `False`. Script exit 0. The `docker build` and launcher themselves did not run.

**Checks:** `diff -r` of the two skill copies exit 0; `npm test -- tests/agent_workflow/test_loop2_deploy_skill.py` exit 0; `python -B .the-way/elements/common/foundation_check.py` exit 0. Not run: the full `npm test`.

**Searches not found or unclear:** none.
