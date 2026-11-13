# Fix report — Minor findings of the review of the whole change

**Status:** done

**Commit:** one, on top of the reviewed head `8d211cbe`: see `git log -1` of the branch (message: "test: :white_check_mark: require git's text attribute on beside eol=lf in the LF test, and say in coding.md that the scope is the one of D-29 and D-32"). Files: `tests/quality/test_source_tool_scope.py` (+7 / -4 lines), `guidelines/coding.md` (+5 / -6). No foundation file changed.

## Finding 1 — LF test reads only `eol` (fixed)

`git_attributes` now asks `git check-attr -z text eol` and returns the values by (path, attribute); `test_gitattributes_keeps_lf_for_every_scope_file` requires `eol` to be `lf` and `text` to be `set` or `auto`, so `-text` (which stops git's line-ending conversion) no longer passes. Every scope file today has `text eol=lf`, so `text` is `set`.

Checks:
- Real tree: `python -B scripts/test.py tests/quality/test_source_tool_scope.py` → exit 0 (4 tests OK).
- The reviewer's mutation: appended `tests/transport.test.mjs -text` to `.gitattributes` in this worktree, same command → exit 1, "files that .gitattributes does not keep at LF: tests/transport.test.mjs"; the line was removed again before the commit (`git status` showed only my two files).

## Finding 2 — `guidelines/coding.md` names the five parts (fixed)

Section "Linter": "każdy plik TS/JS części z zakresu D-29" in place of the list of five parts; section "Formatter": "każdy plik TS/JS części z zakresu D-32; pilnuje ich ten sam test". A change of the scope now changes D-29, D-32 and their invariants, not this file. I also reflowed the Linter paragraph after the edit and dropped the second "według D-29" there, which the new phrase made redundant.

## Other checks (command, exit code)
- `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache tests/quality` → 0.
- `python -B .the-way/elements/common/foundation_check.py` → 0, "0 errors" (guidelines changed).
- `python -B scripts/test.py tests/quality/test_quality_invariants.py` → 0 (shares nothing new, run for safety).
- ESLint and Prettier: the changed file is Python and a Markdown guideline, neither is in their scope; not run on them. Full `npm test`: not run (the orchestrator's).

## Own-work check
Requirement most likely unmet: the fix keeps the test working on the real tree and still catches the `-text` mutation — shown above (exit 0 real tree, exit 1 mutation). Expectation `text in (set, auto)` is not a reproduced pattern syntax: git answers.

Problem observed while fixing: a first write of the file through a shell heredoc turned the `"\0"` literals into real NUL bytes (git then showed the file as binary). Found by `git diff --stat` ("Bin"), repaired by replacing the NULs with backslash-zero; the committed diff is plain text (`git diff` shows `"\0"` as before).

## Unread material
none beyond the earlier report; I read the handoff, the findings file and `.the-way/task-cycle/change/fix.md` whole. I did not read `reports/review-whole-report.md` (the findings file holds the reviewer's words).

## Searches not found or unclear
none
