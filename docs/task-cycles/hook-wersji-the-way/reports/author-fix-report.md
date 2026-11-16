# Author fix report — task `hook-wersji-the-way`, round 1

## Status

`done`

## Commits

- `9e28dc99` — `fix: :bug: make the hook ... say that its check could not run ... (D-414)` (one commit on `task/hook-wersji-the-way`, after the reviewed head `6c528d80`; not pushed).

Files: `.claude/hooks/the-way-pin-check.mjs` (rewritten, about 170 lines), `tests/agent_workflow/test_the_way_pin_hook.py` (+3 tests, 2 edits), `foundations/decisions.md` (D-414 edited in place), `foundations/environment_facts.md` (one fact changed, one added).

## Each finding

| Finding | Result | Where / how |
|---|---|---|
| **I-1** (blocking) | fixed | Script: `git()` now returns the output or the failure, never `null`. `pinnedCommit` tells apart: no `.git` in the root (not a repository) → silent; git missing (`ENOENT`) → silent; `ls-files` finds no gitlink → silent; any other failure of `ls-files` in a repository (damaged index, `safe.directory`, timeout) → a warning "the check of .the-way could not run", with the first line of git's own message as the reason and the repair command. An exception of the script itself is caught at the top and printed as the same warning with "the hook failed: <reason>"; only where printing that fails too does it end silent. Exit code 0 on every path. D-414: new second paragraph of the binding sentences, *Verification* (tests clause and the *violates* example), *Rationale*. Tests below. |
| **M-1** | fixed | Header of the script now says "so that a hook run from a working directory other than the root checks the same repository"; the test is `test_a_hook_run_from_a_directory_other_than_the_root_checks_the_same_repository` (it still runs the hook from a subdirectory). |
| **M-2** | fixed | D-414 *Rationale*: "so the human decides what follows it, while the rule of the agent instructions to stop on a mismatch stays in force". |
| **M-3** | fixed | D-414 *Rationale*: "PowerShell is not installed on Linux and macOS by default". |
| **M-4** | fixed | Fact `claude-code-session-start-hook-output`: passages now name the fields — § Hook input and output "To surface a message to the user on any platform, return systemMessage in JSON output." · § SessionStart decision control "String added to Claude’s context at the start of the conversation, before the first prompt." · § Add context for Claude "The additionalContext field passes a string from your hook into Claude’s context window." The apostrophe is the typographic one of the page as a reader sees it (bytes `e2 80 99` in the live HTML), not the `'` of the markdown file. All passages checked present, word for word, in the live HTML and in the archived capture `20261113161817`. |
| **M-5** | fixed | New fact `claude-code-hook-exec-form` (four passages of § Exec form and shell form and § Reference scripts by path, same checks); D-414 *Based on* now names both facts. |
| **M-6** | fixed | `cls.addClassCleanup(shutil.rmtree, cls.base, onexc=make_writable_then_remove)` right after `mkdtemp`; `tearDownClass` removed. |
| **M-7** | fixed (reworded, not contested) | D-252's *Rationale* and other decisions use "the owner" for the person, but the glossary entry `owner` is an account role, so I used "the human who owns the repository" in D-414 *Rejected* (two places). |

## Foundation entries (the foundation step)

| Entry | Mark | EN | PL |
|---|---|---|---|
| D-414 (edited in place) | `row 1` for the entry; the new second paragraph is `the cycle's` | The hook also warns, with the reason and the repair command, where the check cannot run because git fails inside the repository or the hook fails, still exits 0, and is silent only where git is missing or nothing is pinned. | Hook ostrzega też, z przyczyną i poleceniem naprawy, gdy sprawdzenie nie może się wykonać, bo git zawodzi w repo albo zawodzi sam hook; nadal kończy się kodem 0 i milczy tylko wtedy, gdy nie ma gita albo repo niczego nie przypina. |
| `claude-code-session-start-hook-output` (changed passages) | `the cycle's` | as in round 0, passages now name the fields. | j.w., cytaty nazywają pola. |
| `claude-code-hook-exec-form` (new) | `the cycle's` | A command hook given `args` starts `command`, resolved on `PATH`, with no shell, `${CLAUDE_PROJECT_DIR}` substituted into `command` and each `args` element, and `node` with a script path works on every platform. | Hook z `args` uruchamia `command` bez powłoki, z podstawieniem `${CLAUDE_PROJECT_DIR}` w `command` i w każdym elemencie `args`; `node` ze ścieżką skryptu działa na każdym systemie. |

The behaviour the second paragraph gives is not in row 1: row 1 says "ostrzega ... gdy ... nie jest zainicjowany", nothing on failures of the check. It follows `guidelines/coding.md` § Hiding a failure, so I wrote it as the cycle's own entry for the human to accept at the merge. I wrote it through `elements/decisions/skill` (read again: `SKILL.md`, `read.md`, `decide_entry.md`, the template) and `elements/environment-facts/skill`, in the same change as the code. The decision's quotes in the tests (`decision: D-414 "..."`) are checked by `foundation_check.py` (0 errors).

## The `git` timeout and `safe.directory`: decision

The same "could not run" warning covers both. A timeout ends `execFileSync` with `ETIMEDOUT` and its reason reads "git did not answer in 15 seconds"; a `safe.directory` refusal ends with exit 128 and the line git prints ("detected dubious ownership ..."), which becomes the reason. Both are failures of `git` inside a repository, so no new branch is needed. Not tested separately: the damaged index test goes down the same path (exit 128 with stderr); a timeout cannot be provoked without a stand-in for git, which would replace the thing under test. Also added: the git variables of the caller that pick a repository (`GIT_DIR`, `GIT_WORK_TREE`, `GIT_INDEX_FILE`, `GIT_COMMON_DIR`) are removed from the child's environment, because the reviewer's list named `GIT_DIR`; with it set, the old code read the pin and the checkout from another repository (the test shows it).

## Checks (command, exit code)

Test-first (the three new tests, run on the old script, `6c528d80`):

| Run | Command | Result |
|---|---|---|
| failing run, old script | `python -B scripts/test.py tests/agent_workflow/test_the_way_pin_hook.py` | `FAILED (failures=1, errors=2)`: `test_a_repository_whose_git_fails_...` (ERROR: no output, JSON of empty text), `test_a_hook_that_fails_itself_...` (ERROR, same), `test_a_git_directory_variable_of_the_caller_...` (FAIL: warned with another repository's commit); the runner printed no exit code in my filter, the status was non-zero |
| passing run, new script | same command | `Ran 10 tests ... OK`, exit 0 (also after the last edit) |

Mutations of the new code (each restored; the script then `diff`ed identical to the saved copy):

| Mutation | Test that fails |
|---|---|
| the `.git` existence check of `pinnedCommit` removed | `test_where_the_repository_pins_nothing_...` ("no repository at all") |
| git missing (`ENOENT`) no longer silent | `test_with_no_git_...` |
| the print of the warning in the `catch` of the script removed | `test_a_hook_that_fails_itself_...` |
| the removal of the git variables removed | `test_a_git_directory_variable_...` |
| `if (pinned.problem) return null;` | `test_a_repository_whose_git_fails_...` |

Other checks, all after the last edit unless noted:

| Check | Command | Exit |
|---|---|---|
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0 (0 errors) |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 (0 errors, 143 warnings as before) |
| Ruff | `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache tests/agent_workflow` | 0 |
| Prettier | `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig .claude/hooks/the-way-pin-check.mjs` | 0 |
| ESLint | `node node_modules/eslint/bin/eslint.js --max-warnings 0 .claude` | 0 |
| Private paths | `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` | 0 |
| Cross-part imports | `python -B scripts/test.py tests/invariants/test_cross_part_imports.py` | 0 |

Not run: the full gate (by the handoff), the dependency audit, Linux and macOS (CI on Linux runs the tests). The last small edit (the wording "Once git works here again") ran the hook test file and ESLint only.

## Own-work check

- **Requirement most likely unmet:** the blocking finding I-1 itself, in the real Claude Code and not only in my tests: a repository whose `git` fails must give a warning the session shows.
- **Check:** a fixture repository (real submodule, checkout one commit back, committed hook and settings copied in, `.git/index` damaged) in `.runs/author/e2e`; `claude -p ... --setting-sources project --output-format stream-json --verbose --include-hook-events` from its root. **Showed:** `hook_response`, the JSON with `systemMessage` "the-way: the check of .the-way could not run, so it is not known whether it is at the pinned commit. / Why: fatal: .git/index: index file smaller than expected / Repair: git submodule update --init -- .the-way" and an `additionalContext`; outcome success, exit 0 (the same fixture, with a healthy index, gave the mismatch warning in round 0). After that run I changed only the label of the repair line ("Once git works here again: ..."), because a repair by `git submodule update` does not repair a damaged index; tests cover it by the repair command text, not by the label.

## Weakest point

The reason in the warning is git's own first line (limited to 200 characters), so it can carry a path of this disk into the screen and the agent's context — never into a tracked file; and a failure with an empty message gets "unknown failure". Check: the warning of the real run above, and `reasonOf` reads only `stderr` or `message`. Second: a `git` that hangs delays the start of the session by up to 15 seconds twice at worst (two calls), because the hook runs in the background but the first response waits for it. Third, as in round 0: only sessions started in the repository root run the hook.

## Foundation read that round 0 left open

Read now: D-252 whole (its *Rationale* and the rest of its *Verification*), D-351 whole, the 21 invariants whose *Part* is `every` or names agent-workflow (selected by a script reading `foundations/invariants.md`, not by `decision_index.py`), the glossary entry `owner`. What bore on the work: D-252's rule that a failure is never turned into "all is well" supports I-1 and the new paragraph (D-252 also says what a command prints to whoever ran it is no log line, which keeps the hook's output outside the log machinery, as the handoff said); `owner` gave M-7; `cross-part-imports`, `tracked-file-private-paths` (and `-names`), `ruff-source-rules`, `node-test-selection` hold for the change (the first, second and fourth ran green; the script imports builtins only; no `*.test.mjs` was added). `cross-part-imports` has *Rests on* `TODO` — a matter of the foundation that is not mine. No change followed from the others.

## Reaches beyond the handoff

- Prompted by `GIT_DIR` in the reviewer's list: the removal of the git variables of the caller (new test).
- Four small web reads: the live HTML page `https://code.claude.com/docs/en/hooks`, the markdown file of it and the archived capture, to check the passages of the facts; the finding that the HTML has the typographic apostrophe.
- `git add -N .` run once by mistake of habit before the checks: nothing was untracked, so nothing changed in the index; later commits were by explicit paths.

## Unread material

- D-84/D-85/D-73-family: read in round 0, not reread. `guidelines/coding.md` § Hiding a failure: read in round 0 as part of the whole file.
- The reviewer's full report (`review-whole-report.md`): not opened; the findings file sufficed, no finding was contested.
- The glossary: only `owner` read, not the entries of the other terms the change uses (`unit test`, `integration test` are named in D-81, no term of the change is new). 
- Otherwise none.

## Searches not found or unclear

- Whether the exec form works on a Claude Code older than 2.1.325: the docs give no version in what I read.
- Whether a passage must use the apostrophe of the rendered page or the source markdown: the template says "as a reader sees it", so I took the rendered one.

## Working copies

All stood in `.runs/author/` and were removed: `e2e/` (fixture), `fixture.py`, `hook.new` (backup for the mutation runs), `inv.txt` (extract of invariants), `docs/` (fetched pages and passage checks). `.runs/author/` is empty. The `__pycache__` that the runner leaves under `tests/agent_workflow/` was removed after each run. The test's own temporary folder (system temp) is removed by the class cleanup.
