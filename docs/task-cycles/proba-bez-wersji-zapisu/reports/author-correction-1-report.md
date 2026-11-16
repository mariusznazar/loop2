# Author correction 1 report — proba-bez-wersji-zapisu

**Status:** done

## Remark as made, and how

Item 1 (step 7 of "Restoring over the server's database" points to the marker "written down at install", stale after the hint): in both copies of `backup_and_restore.md` (line 495) the phrase `and written down then` is now `and written down last`, so the sentence reads "The marker is the name given to a character or a program in the test account in step 8 of "Installing and reinstalling" and written down last." That mirrors step 5 of the trial ("the marker name written down last, as in the install step 8"). Nothing else changed. Items 2–4 are accepted, nothing to change.

## Commit

`18835d28` ("docs: :memo: point step 7 of restoring over the server's database to the marker written down last, as step 5 of the trial does (D-234)"), on top of `b794b27e`. Files: both copies of `backup_and_restore.md`, 1 line each; `cmp` of the copies: identical.

## Checks (exit codes, no pipe, output redirected to files)

- `python -B -m unittest tests.agent_workflow.test_loop2_deploy_skill` — exit 0, 5 tests, OK.
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`.
- Not run: `npm test`.

## Own-work check

`git grep -n "written down then\|written down at install"` — no hit (exit 1) after the change; before it, the two hits were line 495 of each copy. The paragraph "Not proven by this trial …" and the paragraph on the version in "Restoring" are untouched (the diff holds only line 495 of each copy).

## Reaches

None.

## Unread material

none (the handoff and the remarks were read whole).

## Searches not found or unclear

none

## Working copies

`.runs/author/` held the correction script and the redirected outputs; removed; `git status` is clean.
