# Slice 4 report: the instruction of the restore trial, the rhythm and the list "Not tried"

**Status:** done

## Commits

- `9f4d6657` docs: :memo: let the restore trial name its monthly rhythm ..., in both copies (branch `task/serwer-odczyty-i-straznik`, not pushed)

## Files changed

- `.claude/skills/loop2-deploy/references/backup_and_restore.md`: 9 insertions, 4 deletions
- `.agents/skills/loop2-deploy/references/backup_and_restore.md`: 9 insertions, 4 deletions; same bytes, copied with `cp`; `cmp` shows identical

## What changed (three places, nothing else in the file)

1. "Trying a backup on the owner's computer", opening paragraph: added that the owner repeats the trial every month and after each change of the database's schema version or of the saved game's version, and that a trial made before such a change does not cover it (D-234 row 3 wording).
2. "Restoring over the server's database", paragraph "Not tried": added the `( umask 077; … )` subshells of step 2, of step 2 for the old key, and of the secrets file in step 3 of "With no server"; added that these paths stay untried as an accepted cost (D-234).
3. "The log", bullet "A cron that did not start writes nothing": added that the watcher reports a night without a successful send after 26 hours, which covers the case where no run started.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Skill test, named runner | `python -B scripts/test.py tests/agent_workflow/test_loop2_deploy_skill.py` (timeout 600 s, background) | 0 | 5 tests, OK |
| Private paths test, named runner | `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` (timeout 600 s) | 0 | 1 test, OK |

Both named runners finished in about 2 seconds each, so the substitute `python -B -m unittest -v` was not needed and was not run. `npm test` was not run. Checks run one at a time.

## Own-work check (section 3)

- Requirement most likely not met: the new watcher sentence must match what the watcher actually does, and the trial sentence must match D-234 without adding a claim the watcher or the trial does not make.
- Check: read `.claude/skills/loop2-deploy/SKILL.md` lines 198, 305, 336-342 (the watcher's sixth kind) and compare with the new sentences. The 26-hour threshold and the "no successful send" wording agree with SKILL.md. The trial sentence uses D-234's own words (monthly, after each change of schema or saved-game version, a trial before the change does not cover it).
- Result: consistent. No IPv6 literal and no provider host name were added (the skill test's regex checks pass).
- Mutation thought: the prose has no test of its own beyond the byte-identity and banned-literal tests, which is the skill's existing test design; no new test was added, and none was asked for.

## Deviations and mismatches (section 4 and the orchestrator's note)

- The slice says the secrets file's `( umask 077; … )` is in "step 8". In the file it is in **step 3 of "With no server"** (`( umask 077; cat > /etc/loop2/session-secrets )`). Step 8 of "Restoring over the server's database" has no secrets file. I named the subshell by its real place, so the "Not tried" list reads "step 3 of 'With no server'". This is a small path mismatch, adapted in place.
- The slice says to change the sentence "instead of one trial before the change that brings the backups merges". That wording does not appear in this file; the file never stated a trial count. I added the new rhythm as a sentence rather than replacing old wording. Nothing was removed for this item.
- Plan's D-234 range (4906-4933) differs from the current range; I used the handoff's current range 4917-4955.

## Unread material

- `foundations/decisions.md`: D-234 (4917-4955) and D-360 (9087-9101) read whole. D-360 is unchanged here, as the slice says.
- `docs/task-cycles/serwer-odczyty-i-straznik/task.md`: read only the passages named (items 2-8 at lines 30-36, lines 54-66, rows 1-4 at lines 152-158). The rest of the task was not read.
- `plan.md`: not read beyond the handoff's copy of slice 4 (as instructed).
- `.claude/skills/loop2-deploy/references/setup_and_secrets.md`: not read; grep showed its `umask` uses, which this slice does not touch.
- `.the-way/task-cycle/change/SKILL.md` and `slice.md`: read whole.
- `backup_and_restore.md`: read whole (both copies identical before and after).
- `tests/agent_workflow/test_loop2_deploy_skill.py`: read whole.
- `the author's private rule file on git`: read (the user's rule for commits, triggered by a hook on the first commit attempt; the first attempt was blocked by the hook and then repeated unchanged).
- `.the-way/project-level/technology/reserved_choices.md`: not read; no reserved choice arose.

## Searches not found or unclear

- "one trial before the change that brings the backups merges" (the plan's wording of the old rhythm): not found in `backup_and_restore.md`.
- "the secrets file in step 8": not found at step 8; found at step 3 of "With no server" (see deviations).
- "the schedule of the trial" in task.md lines 56-65: read; it settles a manual monthly rhythm, consistent with the edit.
