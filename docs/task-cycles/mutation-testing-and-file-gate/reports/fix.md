# Fix report

**Status:** done with concerns

**Base:** `85c6e6404b4a05e6bfad6cae8098fad3d80e6e89`.
**Commit:** `3bca186aaa955d85dea818017e02deb75ff3965c` — `fix: reject early Python exits and ignore mutation sandboxes`.
Tracked working tree clean after commit. Both Important findings are fixed, neither contested or regraded. The remaining concern is the previously supplied baseline Windows listener limitation; it is untouched.

## Findings and evidence

1. **Successful Python exit before a test result — fixed.** `scripts/test.py` catches `SystemExit` across module execution, unittest collection and runner completion and returns failure. A success still requires an actual returned result, at least one non-skipped test and `wasSuccessful()`. The new `focused-test-execution` case in `tests/quality/test_test_gate.py` executes four real npm selections: `SystemExit(0)` and `SystemExit()` during import, and the same two exits from `load_tests` during collection. Before the code fix all four assertions failed on actual exit 0; after the fix all seven gate test methods pass. The existing positive Python test still checks `Ran 1 test`, sibling imports and no build or neighboring execution. No protection against arbitrary malicious test code or `os._exit` is claimed.

2. **Retained mutation sandbox breaks lint — fixed.** `eslint.config.mjs` adds only `.stryker-tmp/**` to the shared temporary-output exclusions. No source directory, lint rule, warning threshold or dependency audit changed. The real `.stryker-tmp/sandbox-5PAEpl` from the author's mutation run remains in place; the five quality tests now pass with that instrumented tree present. The review's observed red result was exit 1 with 368 ESLint errors, reported in `review.md`; this fix uses that supplied failure evidence rather than repeating it. Sandbox location, compiler path and Stryker configuration are unchanged.

## Files

| File | Added | Removed |
|---|---:|---:|
| `eslint.config.mjs` | 1 | 0 |
| `scripts/test.py` | 7 | 3 |
| `tests/quality/test_test_gate.py` | 17 | 0 |

## Checks performed

All commands ran from `C:/Storage/repos/loop2/.runs/worktrees/mutation-gate`. Logs below are beside this report. PowerShell renders stderr from unittest as `NativeCommandError`; the listed exits are the separately captured native exit codes.

| Command | Exit | Result |
|---|---:|---|
| `npm test -- tests/quality/test_test_gate.py` before loader fix | 1 | `fix-python-red.log`: four expected assertion failures for import/collection exits; seven test methods ran. |
| `npm test -- tests/quality/test_test_gate.py` after loader fix | 0 | `fix-python-green.log`: seven methods pass, including the four regression variants. |
| `Test-Path -LiteralPath '.stryker-tmp/sandbox-5PAEpl/src/browser/sim/game.ts'` | n/a | PowerShell inspection returned `True` immediately before the quality run; the sandbox was not deleted or edited. |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | `fix-quality.log`: all five checks pass with the actual retained sandbox present, including ESLint, Ruff, Prettier, ShellCheck and the unchanged audit. |
| `git diff --check` | 0 | No whitespace error. |
| `git diff --cached --check` | 0 | No staged whitespace error. |
| `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0 each | Both show `574a37b9ab9572f876298f4cc10754581222d3f0`. |
| `git status --short` after commit | 0 | Empty tracked status. |

Own-work check: the likeliest incomplete fix would catch only `exec_module` while leaving the same successful exit possible during collection. The new test invokes both stages through the real npm entry. The red run shows all four formerly escaped with exit 0, and the green run shows all four are rejected while the positive test continues passing. Mentally removing the catch or moving collection outside it is detected by these variants.

## Choices and scope

- Chose one `SystemExit` handler around execution, collection and result production. Catching only import would leave `load_tests` uncovered; broad `BaseException` handling would also swallow interrupts and other behavior outside the finding. Returning failure for a handled early exit follows D-77 regardless of its requested exit code; preserving exit 0 would recreate the defect.
- Chose an explicit ESLint exclusion for the existing sandbox path. D-29 already excludes temporary generated results, so this applies its scope without changing a rule set or adding a foundation decision. Moving the sandbox under `.runs` would also work but would require changing and revalidating the relative compiler path and documentation. Deleting the current sandbox would merely hide the issue until a later failed tool run. The chosen line keeps future retained sandboxes outside source linting while retaining them for diagnosis.
- No new product file, dependency, foundation entry or contract was introduced. The changed invariant test is `focused-test-execution` in `tests/quality/test_test_gate.py`; its source is the existing D-77 and the review's concrete reproductions. Full-run stages and Node selection did not change.
- Required reads covered the fix dispatch, full findings and review, frozen task, current coding/testing guidelines, the existing author evidence and relevant foundation entries. `eslint.config.mjs` is newly edited in this fix range but was already read during authoring and again in full here; `tests/quality/test_quality_invariants.py` was read to verify the actual lint invocation and remaining quality scope. No further reach beyond the dispatch, external research, subagent or user question was needed.

Unchecked in this fix stage: the full gate (reserved for the orchestrator after accepted review), a new Stryker runtime (no sandbox/build path or tool configuration changed; the actual retained output is the test input), unrelated previously passing invariant tests, and a repeated foundation check (no foundation or ownership change). No UI changed. The baseline listener failure and the twelve deferred test findings remain outside this fix.
