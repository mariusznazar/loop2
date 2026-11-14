PASS f9263c0726712a219e09cfe03a7b448c7f7cd42a

# Review of the fix of the Minor findings — zasieg-lintera-i-formatera

Variant: the review of the fix of a review's findings (`task-cycle/review/fix.md`). Range `8d211cbe..f9263c07`, one commit; `git rev-parse HEAD` = `f9263c0726712a219e09cfe03a7b448c7f7cd42a`, as given. The reviewed worktree was not changed (status clean after my checks).

Counts: blocking 0, new Minor 0, new out-of-scope 0. Both Minor findings fixed.

## Changed files (`git diff --numstat 8d211cbe..HEAD`)

| File | Added / removed |
|---|---|
| `guidelines/coding.md` | +5 / -6 |
| `tests/quality/test_source_tool_scope.py` | +10 / -7 |

(The fix report says +7 / -4 for the test file; git counts +10 / -7. The difference is only the author's count, not the files.) Both files are plain text: git shows counts, not `-`, and a read of the committed blobs finds 0 NUL bytes and 0 CRLF in each.

## Findings of the findings file

1. **LF test reads only `eol` — fixed.** `git_attributes` now asks `git check-attr -z text eol` and returns values by (path, attribute); the test requires `eol` = `lf` and `text` = `set` or `auto`. Evidence below: my own mutation (an added `tests/transport.test.mjs -text` line) now fails the test and names that file; before the fix it passed.
2. **`guidelines/coding.md` lists the five parts — fixed.** "Linter": "każdy plik TS/JS części z zakresu D-29"; "Formatter": "każdy plik TS/JS części z zakresu D-32; pilnuje ich ten sam test". The scope is no longer listed in the guideline; a change of the scope touches D-29, D-32 and their invariants only. The rule's *Decision* field still names D-29 and D-32, so the references stay resolvable (`foundation_check.py` exit 0). The paragraph still tells the author what to do ("nowy katalog z kodem dopisz do konfiguracji w tej samej zmianie").

## Inspection of the fix diff for what it broke

No new Critical, Important or Minor finding. The reflow of the Linter paragraph and the dropped second "według D-29" lose no meaning. The test change keeps `-z` parsing of `check-attr` (three fields per record, now keyed by (path, attribute)); with two attributes requested the stride of 3 still holds and the dict has no collisions. Note, not a finding: the test is now stricter than git itself for the case "`eol=lf` with `text` unspecified" (git treats that as text); it fails there (checked, below). That agrees with the repository's one convention (`text eol=lf` on every line of `.gitattributes`) and with the fix report's reasoning, so it is the safe direction.

## Checks (scratch detached worktree of HEAD under the session scratchpad, `node_modules` joined by a junction, both removed afterwards)

1. `python -B scripts/test.py tests/quality/test_source_tool_scope.py` on HEAD — exit 0, 4 tests OK.
2. Same, after appending `tests/transport.test.mjs -text` to `.gitattributes` (my mutation 8 of the first review) — exit 1, `test_gitattributes_keeps_lf_for_every_scope_file` fails and names `tests/transport.test.mjs`.
3. Same, after appending `tests/transport.test.mjs text=auto` — exit 0 (accepted, as written in the fix).
4. Same, after turning the line `tests/**/*.mjs text eol=lf` into `tests/**/*.mjs eol=lf` — exit 1, the LF test names the `tests/*.mjs` files (the stricter case above).
5. Same, after deleting the line `tests/**/*.mjs text eol=lf` — exit 1, named (the earlier mutation 7 still caught).
6. `python -B -m unittest discover -s tests/quality -p "test_source_tool_scope.py"` — exit 0 (via `| tail`; the output is "Ran 4 tests ... OK"), the gate's discovery route.
7. `ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache tests/quality` (pinned Ruff of the worktree's venv, run in the scratch tree) — "All checks passed!" (exit 0).
8. `python -B .the-way/elements/common/foundation_check.py` in the reviewed worktree (read-only) — "0 errors", exit 0.

Not run: the full `npm test` (the orchestrator's). ESLint and Prettier on the two changed files: the Python file and the Markdown guideline are outside their scope, so there is nothing to run.

## Declined to judge

none (nothing of this fix goes beyond the task; the notes of my first report on the withdrawn invariant row and `README.md:60` stay as they were, outside the fix diff).

## Reaches beyond the dispatch

none. I read `fix.md` as the handoff says, the findings file, the fix report, the fix diff, and the two committed files' blobs for NUL bytes.

## Unread material

none. The frozen task and my first report were already read whole; the fix touches no decision, so no decision was re-read or skimmed in this review (counts of section 1 do not apply to a review of a fix).

## Searches not found or unclear

none
