PASS 9e28dc9998b8eca7d5549c25423a7dc6ba15458d

# Review of the fix — task `hook-wersji-the-way`, round 1

Range: `6c528d80bde0510622265c5d5993049fb84b990c` to `9e28dc99` (one commit, the one author). `git rev-parse HEAD` in the worktree is `9e28dc9998b8eca7d5549c25423a7dc6ba15458d`, the head given. The findings file `reports/review-whole-findings.md` holds I-1 and M-1 to M-7; I read it, the fixer's report `reports/author-fix-report.md` and `git diff 6c528d80..9e28dc99` (4 files; line counts in the sizes check below).

Counts: findings of the file fixed 8 of 8, remaining 0; new findings in the fix: 0 Critical, 0 Important, 1 Minor (within the task). Blocking: 0. Out of scope: 0 new (O-1 of round 0 stays untouched, as the handoff gives).

## Each finding of the findings file

| Finding | Verdict | Evidence on `9e28dc99` |
|---|---|---|
| **I-1** — a failure of the check shown as agreement | **fixed** | `git()` (`.claude/hooks/the-way-pin-check.mjs:30-45`) returns `{ output }` or `{ failure }`; `pinnedCommit` (`:61-75`) is silent only with no `.git` at the root, with git missing (`ENOENT`) or with no gitlink, and returns `{ problem }` for any other failure of `ls-files`; `answer()` turns a problem into `unableWarning` (`:120-138`); the top-level `catch` (`:158-165`) prints the same warning with "the hook failed: <reason>". My fixture run, the same case as in round 0 (mismatch + damaged `.git/index`), now gives `systemMessage` "the-way: the check of .the-way could not run, … Why: fatal: .git/index: index file smaller than expected …" and an `additionalContext`, exit 0. A `git` on `PATH` that is another program and fails also gives that warning, exit 0. A fault injected into `JSON.stringify` by `node --import` gives "Why: the hook failed: injected failure", exit 0, which shows the top-level `catch` is the path taken. New tests: `test_a_repository_whose_git_fails_warns_that_the_check_could_not_run`, `test_a_hook_that_fails_itself_warns_that_the_check_could_not_run`. |
| **M-1** — header and test name about subdirectory sessions | **fixed** | `the-way-pin-check.mjs:10-11` "so that a hook run from a working directory other than the root checks the same repository"; the test is renamed `test_a_hook_run_from_a_directory_other_than_the_root_checks_the_same_repository`. |
| **M-2** — misattribution to the agent instructions | **fixed** | `foundations/decisions.md:10971`: "so the human decides what follows it, while the rule of the agent instructions to stop on a mismatch stays in force". This agrees with `AGENTS.md` and with questions 2 and 5 of the task. |
| **M-3** — "PowerShell runs on Windows alone" | **fixed** | `decisions.md:10971`: "PowerShell is not installed on Linux and macOS by default". |
| **M-4** — the fact's passages do not show the field names | **fixed** | `foundations/environment_facts.md:864-868`. All three passages name the field or appear in its row. I verified each word for word, by a script that reads the passages from the file itself, against the live rendered page and against the archived capture `20261113161817`: all found in both. The two passages with "Claude’s" carry the typographic apostrophe of the rendered page, and the markdown file has a straight one, so those two are found in the HTML copies only. That is right by the template, which says "the page's text as a reader sees it". The sections exist: § Hook input and output, § SessionStart decision control, § Add context for Claude. The sentence ("surfaces a message", "of that JSON's `hookSpecificOutput`") says no more than the passages. |
| **M-5** — no fact for the exec form | **fixed** | New fact `claude-code-hook-exec-form` (`environment_facts.md:870-874`), named in D-414 *Based on* (`decisions.md:10963`). Its four passages were verified the same way and found in the live HTML, the archived capture and the markdown. They stand in § Exec form and shell form, the note there about `node.exe` included, and in § Reference scripts by path. The sentence says no more than the passages: no shell; resolution on `PATH`; `${CLAUDE_PROJECT_DIR}` is a path placeholder, substituted into `command` and each `args` element; `node` plus a script path works on every platform. The identifier names the subject, not a value. |
| **M-6** — temporary folder leaks when the set-up fails | **fixed** | `tests/agent_workflow/test_the_way_pin_hook.py:76`, `cls.addClassCleanup(shutil.rmtree, cls.base, onexc=make_writable_then_remove)` right after `mkdtemp`; `tearDownClass` removed. A class cleanup runs even when `setUpClass` raises. |
| **M-7** — "the owner" in D-414 | **fixed** | `decisions.md:10972`: "the human who owns the repository", in both places. |

## What the fix added beyond the findings

**(a) The second paragraph of D-414** (`decisions.md:10961`)
- It faithfully states what the hook now does. Where the check cannot run, the hook warns both ways with the reason and the repair command and exits 0. It stays silent where git is missing or nothing is pinned.
- The paragraph is necessary. `guidelines/coding.md` § Hiding a failure allows a degraded mode only where a product decision settles it, and the silence where git is missing is such a mode.
- *Verification* adds the matching tests clause and a *violates* example. The *Rationale* gives the reason ("a check that cannot run is no agreement, and silence is how the hook shows agreement"), and the reason is sound.
- The paragraph is not in row 1 of the task's *Settlements to record*, and neither are the two facts. **The request has to flag all three entries as the cycle's own, for the human to accept at the merge:**
  - the second paragraph of D-414 and its *Verification* and *Rationale* additions;
  - the fact `claude-code-session-start-hook-output`, from round 0;
  - the fact `claude-code-hook-exec-form`.
- One wording point, N-1 below.

**(b) The caller's `GIT_*` variables removed from git's environment** (`the-way-pin-check.mjs:20-27,31-32`)
- The change is correct and limited. It removes `GIT_DIR`, `GIT_WORK_TREE`, `GIT_INDEX_FILE` and `GIT_COMMON_DIR`, which pick a repository and would make `-C` read another one. Other variables pass through.
- Fixture: with `GIT_DIR` set to the submodule's own repository and a mismatch in place, the hook gave the right warning, with the pinned commit read from the root repository, and exit 0.
- New test: `test_a_git_directory_variable_of_the_caller_does_not_send_the_check_to_another_repository`. It fails without the removal: the old code warns with another repository's commit. I traced this by reading the code; the author ran it as a mutation.

**(c) The two facts** — verified word for word, above (M-4, M-5).

**(d) Can the "could not run" warning leak anything or disturb a session?**
- The reason is the first non-empty line of git's stderr or of the error's message, limited to 200 characters, or a fixed sentence for a timeout. It is JSON-escaped by `JSON.stringify`, and goes only to the screen and to the agent's context, never to a tracked file or a log. D-362 and the invariant `tracked-file-private-paths` concern tracked files. D-252 says what a command prints to whoever ran it is no log line.
- It can carry a path of this disk, for example in git's "dubious ownership" line. That is the user's own path shown to the user, and nothing stores it.
- git's stderr is captured (`stdio: [..., "pipe"]`), so nothing reaches Claude Code's stderr.
- The warning only informs and never blocks: no `continue` field, exit 0. On a successful run git's stderr is dropped.

**(e) Exit code 0 on every path** — I ran the hook on a fixture of my own (a repository pinning a real submodule). All exits were 0:

| Case | Output |
|---|---|
| agreement | silent |
| mismatch | mismatch warning |
| damaged index | could-not-run warning |
| another program as `git` on `PATH` | could-not-run warning |
| no `git` on `PATH` | silent |
| `GIT_DIR` of another repository | correct mismatch warning |
| `.the-way` without `.git` | warning "not initialized or unreadable" |
| `.the-way/.git` pointing nowhere | same warning |
| root without `.git` | silent |
| fault injected into the script | could-not-run warning, "the hook failed: injected failure" |

A failure before the script runs at all ends with exit 1. I made one with a module given to `--import` that throws at load. A real equivalent is a Node too old to parse the file. Such a failure is outside the script and, per the docs, a non-blocking hook error. No path of the script itself ends otherwise. This is a note, not a finding.

## New findings in the fix

### Minor (within the task; not blocking)

**N-1 — D-414's second paragraph says the hook "prints nothing only where git is missing or the repository pins nothing", and gives no reason for an unreadable checkout.**
`foundations/decisions.md:10961`.

Taken literally, "only" leaves out the agreement case, where the first paragraph (`:10959`) has the hook print nothing. The two paragraphs stand together and the first is explicit, so a reader is unlikely to take the second as overriding it; for that reason this is Minor, not a WAY-263 departure.

Separately, the paragraph's "git fails inside the repository … with the reason" can be read to cover git failing on the `.the-way` checkout too. For that case the code (`the-way-pin-check.mjs:79-87`) gives the mismatch warning, "Checked out: not initialized or unreadable", with both values and the repair command but no reason. That is visible and harmless, but the entry and the code say it differently.

A wording like the following would close both points: "Apart from agreement, it prints nothing only where git is missing or the repository pins nothing; a checkout of `.the-way` that git cannot read is warned of as one that is not initialized."

## Declined to judge

- A Node.js runtime too old to load the hook, which fails before the script runs and ends with exit 1 as a non-blocking hook error: this is outside the fix diff and outside the task's systems requirement, which `engines.node` covers.

## Checks run

| Check | Command or method | Result |
|---|---|---|
| Head | `git rev-parse HEAD` | `9e28dc9998b8eca7d5549c25423a7dc6ba15458d` |
| Fix diff | `git log --oneline 6c528d80..9e28dc99`, `git diff 6c528d80bde0510622265c5d5993049fb84b990c..9e28dc99` | one commit, 4 files |
| Hook tests | `python -B scripts/test.py tests/agent_workflow/test_the_way_pin_hook.py` | exit 0, 10 tests OK (Windows) |
| Private paths invariant | `python -B scripts/test.py tests/agent_workflow/test_tracked_file_private_paths.py` | exit 0 |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | exit 0, 0 errors (the tests' `decision: D-414 "…"` quotes included) |
| Ruff | `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache tests/agent_workflow/test_the_way_pin_hook.py` | exit 0 |
| Prettier | `node node_modules/prettier/bin/prettier.cjs --check --no-config .claude/hooks/the-way-pin-check.mjs` | exit 0 |
| ESLint (repository config; no rules apply, O-1) | `node node_modules/eslint/bin/eslint.js --max-warnings 0 .claude/hooks/the-way-pin-check.mjs` | exit 0 |
| File sizes | `python -B .the-way/task-cycle/change_file_sizes.py 6c528d80… 9e28dc99` | exit 0; hook 89 → 167 lines, test 193 → 233, decisions +2, facts +6; no size rule in `guidelines/coding.md` |
| Line endings | `git ls-files --eol` on the hook and the test | `i/lf w/lf` |
| Fact passages | `python -I .runs/review-fix/passages.py foundations/environment_facts.md …` against `curl` copies of the live HTML, the archived capture `20261113161817` (`id_`) and the markdown | exit 0; all 7 passages found in the live HTML and the archive; the 5 without a typographic apostrophe found in the markdown too; all 5 section headings present |
| Fixture run of every path | manual, Git Bash, under `.runs/review-fix/fixture/` (cases in (e)) | all exits 0, outputs as listed |

Not run: the full gate (the orchestrator's), Linux and macOS (CI on Linux runs the test file), a real Claude Code session (the author reports one for the could-not-run case).

## Reaches beyond the dispatch

- The Claude Code hooks page (live HTML, markdown) and its archived capture, fetched by `curl` into my working directory, to verify the passages of the two facts (handoff item (c)).

## Working copies

`.runs/review-fix/` held:
- the downloaded pages (`live.html`, `archived.html`, `live.md`);
- the passage-check script `passages.py` and its output `passages.txt`;
- the fixture `fixture/` (a submodule origin, a repository, a copy of `node.exe` as `fakebin/git.exe`, an empty `nobin/`, two fault modules).

All removed: the directory no longer exists. Nothing stood elsewhere. Remainder: none.

## Unread material

- The decisions read whole this round are only those the fix changed: D-414 on the new head, its whole entry from the fix diff and the surrounding lines. My round-0 selection stands, as the handoff says: 10 of the 49 decisions of my index read whole, with D-252 read in part (binding sentences, *Scope*, *Based on*).
- The two facts were read whole.
- No guideline file changed. `guidelines/coding.md` and `guidelines/testing.md` were read whole in round 0 and not reread.
- The fixer's report and the findings file were read whole.

## Searches not found or unclear

- No statement in the docs of the minimum Claude Code version that knows `args`. The fact is dated by its reading, so it needs none. The author found none either.
