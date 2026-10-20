# Product slice 3 — test-server resource cleanup

Status: DONE_WITH_CONCERNS at the author boundary: planned code complete, with Docker checks
unchecked and generated-bytecode cleanup rejected by automatic approval review. Root owns review.

Worktree: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`, branch `task/coding-guidelines`.
Input HEAD: `b0e3d4f93889cf7b4ffa5405cf386a8640885c03`.
Final commit: `fc7445a540c0beb524ea821cd30d9c25a3ce0e92`, range `b0e3d4f..fc7445a`.
The pinned checkout and gitlink both resolve to `d829e3aa6242a9b8901274531dd82fd5c7d87628`.
Authority: frozen [task](../task.md), [npm amendment](../amendment-npm12.md), authoritative
[plan](../plan.md), task-3-brief and [author contract](author-contract.md).
No invariant sentence or frozen check method changed; no subagents, push, merge or deployment.

## Selection and inputs

Read product AGENTS.md/CLAUDE.md, the whole task and amendment, whole S3 plan entry/brief and
applicable execution constraints, author contract, pinned foundation-reading and guideline-reading
methods, complete part map, complete current Scope/Part fields, selected whole entries and linked
facts, product glossary and pinned glossary. Read Superpowers 6.4.1 test-driven-development,
writing-good-tests.md and implementer-prompt.md, and the user's code-review playbook after reading
the Obsidian rulebook. External material was read only as method/source input.

Touched parts: **build-tools**, via `tests/invariants/loop2_invariant_support.py` and
`tests/quality/**`; **deployment**, via the unused import in `tests/deploy/test_loop2_deploy_build.py`.
Complete current Scope inspection selects D-01/1, D-02/1, D-03/2, D-04/3, D-05/3, D-06/3,
D-08/1 through D-17/1, D-27/1 and D-28/1 through D-33/1. Those entries were read whole, with
linked D-07/1 and D-22/1 also read; there is no missing expected Scope match. Whole invariant
Part fields, `every` included, were inspected; the complete invariants file was read to cover
the broad support consumer surface. Foundation keyword search across all five files covered
server/process/log/cleanup/Python/Ruff, and alternate resource and observation concerns. It found
the same assignments/rules and no additional foundation meaning needing change. Current relevant
Ruff rule and release fact are `ruff-source-rules/1` and `ruff-default-rules/1`; adopted policy
stays 393 blocking rules with the exact fourteen deferred examples, no inline suppression.

Guideline selection remains **none under the creation-task exception**: `guidelines/` is absent.
D-28 defers test/build/deployment exemplars and automatic Python/Bash formatting. The encompassing
task creates general coding guidelines later; this slice adds no new kind or exemplar. Actual
changed paths at return still have these same assignments, so selection does not expand.
Read the two original process/API invariant files for the interface; F6 already removed their
accepted findings. Accepted independent-method correction report supplied interface limits only.

Runtime versions observed: Python **3.14.3**, Node **24.17.0**, default PATH npm **11.13.0**,
local Ruff **0.17.1**. Accepted task audit npm remains **12.2.1** by amendment; this slice neither
runs the audit nor changes its local pin. The source suite uses existing product npm commands.

## Implementation, choices and costs

- Move both log acquisitions and process creation inside initialization's existing exception
  cleanup. `_server_logs` uses ordinary `with open` for the two handles; an instance ExitStack
  holds that context until `stop`. The pair context closes stdout if stderr acquisition fails;
  the constructor removes its log directory even before a process exists. Closing the logs at
  constructor return would break live output; manually juggling optional handles preserves the
  original SIM115 diagnostics and adds independent ownership paths. The small generator context
  adds one helper while keeping acquisition/unwind in Python's standard context machinery.
- Initialize `process` to `None`, and let stop skip process termination until one was acquired.
  ExitStack closes every acquired log even when process cleanup raises; then existing directory
  removal and port checks run. A live server retains writable, flushable logs until stop.
- Reject a nonzero CIM observation before parsing any stdout, including plausible process rows.
  Main-process taskkill runs in `finally` even when enumeration fails or times out; final process
  waiting/fallback killing also runs in `finally`. On a successful observation, known descendant
  termination remains unchanged. Ignoring observation errors could consume partial rows or skip
  cleanup; swallowing them would conceal an unverified process tree. Errors still propagate.
- Remove only the remaining accepted unused `sys` and `os` imports from the assigned files.
  No reader/parser, invariant assertion or deployment behavior was otherwise changed.
- Keep real file handles/directories and native child processes in tests. Mock only failure
  injection and the readiness/process-observation boundary; assert closed handles, removed
  directories, actual process exit and preservation of an unrelated live child.

Source changes: [support](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/tests/invariants/loop2_invariant_support.py),
[deployment test](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/tests/deploy/test_loop2_deploy_build.py), and
[new resource tests](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/tests/quality/test_invariant_support.py).

Initial direct `ExitStack.enter_context(open(...))` behavior passed focused tests but actual Ruff
still reported two SIM115 diagnostics. The final pair-context implementation fixes that without
changing configuration or suppressing a rule. The genuine failed Ruff run remains evidence.
Existing files were rewritten as bytes preserving their working-file newline convention.

## Red/green and weakest point

Seven initial tests ran before implementation. The first red run had five assertion failures
and two errors; one error was a test injection signature that failed to forward read_text's
encoding arguments. That fixture was corrected before implementation. Confirmed red then had
five assertion failures (two subcases in main cleanup) and one intended incomplete-stop error:
leaked first/both logs, partial failed stdout accepted, main process survived query failure/timeout,
and stop dereferenced a missing process/stderr. Live-log and successful-query preservation already
passed. First green passed all seven tests.

Weakest point: a failed observation containing a plausible unrelated PID must neither authorize
that PID's termination nor leave the known main process alive. The final native Windows test
starts two real Python processes, supplies the unrelated process as partial failed CIM output,
and proves the known process exits, the unrelated sentinel remains alive, and the query error
propagates. A second case injects TimeoutExpired. An eighth test proves acquired logs and their
directory are released even when stop reports process cleanup failure. All eight final tests
passed, with no skips. The lifecycle test also exercises repeated stop through test cleanup.
Limits: CIM and readiness failures are injected; actual npm/HTTP integration is the real invariant
suite, not inferred from the fixture. Native fallback integration is Windows-specific and will
explicitly skip on other operating systems; no real POSIX failure-injection run occurred here.
Failed enumeration cannot establish the full set of detached descendants of an already-exited
root; that observation failure remains visible rather than being reported as successful cleanup.

## Sharpness and self-review

The changed helper is shared test mechanics: a cleanup error can leak a local child/port or make
an invariant run unreliable. The part map records no build-tools failure modes; this does not
establish low risk. Keep unknown criticality for that part, alongside deployment's existing high
failure modes even though its sole edit is a removed unused import. No network trust boundary,
player data, screen, server deployment or irreversible product effect changes. Native tests kill
only child processes they start and separately prove an unrelated child stays running.

Self-review read all three final changed files and every diff hunk against the accepted findings.
The support file is preexisting and large; untouched deployment readers/parsers stay byte-stable
apart from line displacement. Test expectations come from owned resource/process effects, not
from the helper's expected-value computation. No frozen invariant check or expectation changed.
Screenshots are not applicable: no UI file or intended visible behavior changed. Independent
review remains separate and has not occurred at this author boundary.

## Captured checks

All commands run from the task worktree. Each linked `.txt` holds complete combined stdout/stderr;
its adjacent `.txt.json` holds exact argv, actual exit and duration. Earlier failures remain.

| Command / evidence | Exit | Outcome |
|---|---:|---|
| `python -m unittest discover -s tests/quality -p test_invariant_support.py` — [s3-red.txt](s3-red.txt) | 1 | initial red; injection signature corrected |
| same — [s3-red-confirmed.txt](s3-red-confirmed.txt) | 1 | confirmed pre-implementation failures |
| same — [s3-green-first.txt](s3-green-first.txt) | 0 | seven tests |
| same — [s3-green.txt](s3-green.txt) | 0 | eight tests including weakest point |
| `python -B scripts/check_ruff.py --record .runs/s3-ruff.jsonl` — [s3-ruff.txt](s3-ruff.txt) | 1 | two remaining direct-enter_context SIM115 reports |
| `python -m unittest discover -s tests/quality -p test_invariant_support.py` — [s3-green-final.txt](s3-green-final.txt) | 0 | eight tests, final pair-context implementation |
| `python -B scripts/check_ruff.py --record .runs/s3-ruff-final.jsonl` — [s3-ruff-final.txt](s3-ruff-final.txt) | 0 | live whole Python scope, named invariant pass |
| `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariants-after-support.jsonl` — [s3-invariants.txt](s3-invariants.txt) | 1 | 141 tests: 139 pass, 2 Docker skips; gate correctly refuses a pass |
| `python -B .the-way/gate/run_tests.py tests/deploy --record .runs/deploy-after-support.jsonl` — [s3-deploy.txt](s3-deploy.txt) | 0 | 64 tests: 63 pass, 1 Docker skip remains unchecked |
| `npm.cmd test` — [s3-npm-test.txt](s3-npm-test.txt) | 0 | build plus 173 Node tests pass, no skips |
| `python -B -m unittest discover -s tests/deploy -p test_loop2_image_icons.py -v` — [s3-deploy-skip.txt](s3-deploy-skip.txt) | 0 | focused rerun to expose actual deployment skip reason; 1 skipped, no executed test |
| `git diff --cached --check` — [s3-diffcheck.txt](s3-diffcheck.txt) | 0 | no whitespace errors |
| `git commit -m "fix: clean up test-server resources after initialization failures"` — [s3-commit.txt](s3-commit.txt) | 0 | explicit three-path author commit |

The three Docker-dependent tests stay unchecked because no Docker daemon answers:

- `tests/invariants/test_loop2_container_icons.py::ContainerServesIcons.test_container_serves_each_icon_with_the_file_bytes`;
- `tests/invariants/test_loop2_one_serving_process_container.py::RunningContainerHasOneServingProcess.test_running_container_has_one_listening_node_process`;
- `tests/deploy/test_loop2_image_icons.py::ImageServesIcons.test_built_image_serves_every_icon_and_the_page`.

The first two gate records are fail with null invariant, explicitly saying no verdict and naming
the Docker skip. Deployment's non-invariant skip leaves gate exit 0; that exit is not claimed as
verification of the image. Real npm/HTTP/process checks passed. Deployment fixture tests do not
deploy anything and do not establish live server health. No final whole-product gate or future
slice acceptance is claimed. No unresolved in-scope source failure was found.

## Change size and temporary output

Staged `git diff --cached --numstat`, after adding exactly the three assigned paths:

| File | Added | Removed |
|---|---:|---:|
| `tests/invariants/loop2_invariant_support.py` | 43 | 24 |
| `tests/deploy/test_loop2_deploy_build.py` | 0 | 1 |
| `tests/quality/test_invariant_support.py` | 175 | 0 |
| Total, three files | 218 | 25 |

The exact planned unittest command lacks `-B` and generated two untracked bytecode files absent
from the incoming clean status. Parent explicitly authorized removing only these files and their
then-empty directories. A read-only exact inventory confirmed them inside this task worktree:

- `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/tests/invariants/__pycache__/loop2_invariant_support.cpython-314.pyc`;
- `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/tests/quality/__pycache__/test_invariant_support.cpython-314.pyc`.

Automatic approval review rejected both the validated PowerShell cleanup and a second attempt
using only those exact literal absolute paths, stating only **blocked by policy**. Neither command
executed. The two files and their `__pycache__` directories remain untracked and are excluded from
the explicit-path commit. No alternate deletion tool or shell was used. Root has been notified;
this is a remaining cleanup concern, not a source-code change. No cleanup-log file was created
because the first command never executed. `.runs` and `.superpowers` artifacts are not committed.
Final git status contains only these two untracked directories; no assigned source remains dirty.
The commit's configured private author address was verified, and the branch's upstream is the
same-named `origin/task/coding-guidelines`, with no upstream mismatch warning.
