# Author fix report — proba-bez-wersji-zapisu

**Status:** done

## Commits

- `509961a1` — fixes M1 and M2 (range from `ca90b465`).

Files: `foundations/decisions.md` (1 line), both copies of `backup_and_restore.md` (2 lines each, byte-identical, checked with `cmp`).

## Findings

- **M1 fixed.** The hint now reads "…give a new marker as in step 8 of "Installing and reinstalling", let the game save it, write it down, and take the backup for the trial from a night after that." I also changed the placeholder of step 5 to `<the marker name written down last, as in the install step 8>`, as the reviewer offered: after a change of `SAVED_GAME_VERSION` the marker written down in the install step is the old one, and "last" names the new one. Nothing else in step 5 changed.
- **M2 fixed.** D-234's Rationale now says "already lost at the first load after its deployment", in the reviewer's wording. No other change to D-234; the binding sentence is untouched.

## Checks (command, exit code, no pipe; output redirected to files under `.runs/author/`)

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors` (full run, citations of tests included).
- `python -B -m unittest tests.agent_workflow.test_loop2_deploy_skill` — exit 0, 5 tests, OK (includes the byte-identity of the copies).
- Not run: `npm test`; `tests.deploy.test_restore_trial` and `check_instructions.py` (the fix touches no test file and no line of a skill with a path).

## Own-work check

- Requirement most likely wrong: the copies stay byte-identical and the placeholder of step 5 no longer points at the old marker. Check: `cmp` of the two copies (same), the deploy skill test (OK), `git grep "written down in the install step\|marker name written"` shows the one changed line in each copy and no other place with the old placeholder.

## Reaches

None beyond the handoff and the findings file.

## Unread material

none (the handoff and the findings file were read whole; the foundation entries of the first pass were read then).

## Searches not found or unclear

none

## Working copies

`.runs/author/` held the fix script and the redirected outputs of the checks; removed; `git status` is clean.
