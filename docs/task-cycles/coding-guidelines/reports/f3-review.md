# F3 task review: Python and Bash methods

## Spec Compliance

- **Issues found.** The methods and assigned fixtures are present, but the Python method misses valid blocking-rule suppression forms: `scripts/check_ruff.py:71`. F3-1 below is Important.
- **Cannot verify from this diff:** real Ruff/ShellCheck integration, the pinned-parser sentinel behavior, final product compliance, independently derived deliberate-break acceptance and final guideline good/bad pairs. Both actual methods currently return 2 with null invariant because installation belongs to a later stage. This review does not convert that result into acceptance.
- **Reviewed range:** `e85670a467de02ec0c46d1fb17777f54ad70ec9e..49a37059c637027880955d31199d4bbbcf99eda1`.
- **Full report:** `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/f3-review.md`.

## Strengths

- The frozen Ruff selector list is exactly the final fact's 407 members minus D-30's fourteen examples: 393 distinct codes, no omissions or additions. Independent mechanical comparison is in `f3-review-source-check.txt`; implementation anchors are `scripts/check_ruff.py:20` and `scripts/check_ruff.py:128`.
- The methods use fixed repository-local executable paths, verify the pinned version, remove the tool-specific environment variables and pass explicit isolated options. They cannot quietly substitute a PATH executable or install during checking: `scripts/check_ruff.py:108`, `scripts/check_shellcheck.py:134`.
- Output validation distinguishes diagnosed violations from malformed reports and inconsistent exits. The latter reach shared inability handling rather than a named success: `scripts/check_ruff.py:90`, `scripts/check_shellcheck.py:45`. The author's actual weakest-point RED and subsequent pristine GREEN evidence exists and was read.
- Ownership discovery is shared, while language classification remains in each adapter. Extensionless Bash and new paths are explicitly exercised by the fixtures: `scripts/check_shellcheck.py:30`, `tests/quality/test_python_shell_checks.py:73`, `tests/quality/test_python_shell_checks.py:108`.
- Tokenized Python comments avoid treating strings as directives. Shell directive uncertainty is explicit instead of silently neutral: `scripts/check_ruff.py:68`, `scripts/check_shellcheck.py:106`.

## Issues

### Critical

None found in the assigned scope.

### Important

#### F3-1. Recognize all pinned Ruff suppression forms before naming a pass

**Thread:** new.

**Anchor:** `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/scripts/check_ruff.py:71`.

**Copyable comment:** The suppression check only recognizes `noqa`, but pinned Ruff 0.17.1 also supports `ruff: ignore[...]`, `ruff: file-ignore[...]` and `ruff: disable[...]`/`ruff: enable[...]`. A clean file containing one of these directives for blocking F821 currently receives a named pass, so the method does not enforce the invariant's prohibition of blocking-rule suppressions. Handle these supported forms and add clean-source regression cases, preserving the allowance for nonblocking E402 and directive-like string data.

**Why this is reported:** This method implements the whole `ruff-source-rules/1` sentence, including the separate source-directive prohibition. Passing the explicit rule list with `--ignore-noqa` protects ordinary tool diagnostics but does not prove the absence of prohibited comments; the existing clean-source noqa fixtures correctly recognize that distinction. `suppresses_blocking` searches Python COMMENT tokens for a regex ending in `noqa`, so every other recognized Ruff suppression syntax is skipped. On otherwise clean code, the diagnostic list is empty and the adapter therefore returns True and writes a named pass.

Concrete new owned source cases used by the reviewer:

```python
value = 1  # ruff: ignore[F821]
```

```python
# ruff: file-ignore[F821]
value = 1
```

```python
# ruff: disable[F821]
value = 1
# ruff: enable[F821]
```

All three returned `suppresses_blocking: false`, adapter exit 0 and a `pass` record for `ruff-source-rules/1` under the existing discovery/subprocess fixture. The positive control `value = 1  # noqa: F821` returned True, exit 1 and a named fail. Thus the probe is checking the correct population (actual source comments in a newly owned Python file), not finding the spelling merely inside test data.

The [pinned Ruff suppression implementation](https://raw.githubusercontent.com/astral-sh/ruff/0.17.1/crates/ruff_linter/src/suppression.rs) defines all four suppression actions, parses them from comments and resolves numeric rule codes without requiring preview; its tests include ignore and disable/enable forms. The [pinned linter](https://raw.githubusercontent.com/astral-sh/ruff/0.17.1/crates/ruff_linter/src/linter.rs) applies the noqa flag when removing suppressed diagnostics. These sources establish supported syntax; no claim is made that a real local Ruff run occurred.

The consequence is an incorrect named acceptance of the independent directive clause, allowing forbidden suppressions into later changes even if ordinary diagnostics remain unsuppressed by this invocation. This is Important because a successful invariant result is materially untrustworthy for a required condition; it is not a suggestion to broaden incidental coverage. The author fixtures at `tests/quality/test_python_shell_checks.py:97` cover noqa only and cannot catch the omission.

**Fix direction:** Extend the token-based policy recognition to the code-based suppression actions supported by the pinned version, interpreting the requested codes against the adopted blocking set. Add clean-source cases for each form, corresponding nonblocking-code cases and literal-data controls; exercise their actual pinned-tool compatibility after installation. Keep ordinary rule selection, token/data separation and inability handling intact. The change belongs in the owned adapter and focused fixture files; it needs no new foundation meaning or diagnostic inventory.

**Evidence and practical limit:** `f3-review-probe.py`, `f3-review-probe.txt` and adjacent command metadata provide the complete four-case probe. Only the absent linter boundary is simulated, exactly as in the existing author fixtures. This proves the adapter's false pass under a valid empty report and the scanner omission; real-tool acceptance is still unchecked and must not be inferred from it.

### Minor

None retained. The live integration limitations below are explicit unchecked work, not downgraded code defects.

## Scope, selection and separate documentation pass

Read the review handoff, reviewer operational contract, exact Superpowers 6.4.1 task-reviewer template, F3 source brief, author report, full assigned three-file diff and complete code-review playbook. The diff package was the view of changed code; changed source files were not reopened. The first combined display cut off some diff output, so the unread shell/fixture portion was retrieved in bounded chunks, including the final fake-tool boundary.

Read the whole current part map, guideline reading procedure, coding template and its referenced general template. The changed scripts and `tests/quality/**` belong to build-tools. Runtime source scope covers the six code parts named by the invariant. No UI work occurs. There is no `guidelines/` directory yet, independently confirmed, so selected current product guideline paths are empty because the task creates them. D-28's deferred build/test/deployment exemplars were read as an explicit scoped settlement; their absence is not treated as proof of compliance or as an unrelated prerequisite.

Read the complete final `ruff-source-rules/1`, `shellcheck-source-rules/1`, D-30/1, D-31/1, their membership facts and the relevant D-28 entry. The long Ruff fact source line was fetched separately after an earlier combined output truncated it. Verified the-way checkout and gitlink both record `d829e3aa6242a9b8901274531dd82fd5c7d87628`.

The separate documentation/evidence pass checked the installation interface, explicit non-pass descriptions and limitations in the author report against code and actual logs. No additional documentary inconsistency was found. The author's claim to enforce blocking Python suppressions is limited by F3-1; the reported 16 passing fixtures remain true, but do not establish that broader claim.

## Named outside-diff checks

- **Risk: shared mechanics could turn malformed external results into named success.** Read `scripts/quality_support.py` and F1 API evidence. The helper records named results only after an actual bool; exceptions become exit 2 with null invariant. No concern found in that integration contract. This was one focused dependency inspection, not a new whole-branch review.
- **Risk: hand-copied Ruff membership could differ from final sources.** Independently compared the added BLOCKING constant extracted from the diff package with the final fact minus D-30 examples. Exact agreement; no concern found.
- **Risk: source directives may be real tool syntax that the adapters do not recognize.** Inspected pinned upstream Ruff noqa/suppression/linter sources and ShellCheck Parser/manual. This produced F3-1. Source links are pinned and public; no external write or account context was used.

## ShellCheck policy assessment and retained limits

No Important defect was established in the bounded three-outcome policy itself. The final sentence requires establishing that no blocking suppression or set change exists; an unclassified selector or unresolved `source`/`source-path` effect cannot support a named pass. The code correctly turns these cases into inability, while known optional-only suppressions and redundant settings proceed to normal checking. It is not necessary to add a heuristic inventory of all default diagnostic codes merely to replace explicit inability.

The line-preserving sentinel probe uses the pinned parser's SC1107 warning to distinguish comments from quoted/heredoc data: `scripts/check_shellcheck.py:106`. The [pinned parser](https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Parser.hs) contains that unknown-key diagnostic and separate annotation parsing; the [pinned manual](https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/shellcheck.1.md) describes source directives and all-severity checking. This supports the intended mechanism but does not replace execution against the actual binary.

The fixtures provide concrete modeled cases for quoted text, heredocs, neutral settings, optional-only suppression and unresolved source/source-path directives. Their fake parser checks simple prefixes; it does not establish the real parser's behavior on nested or mixed constructs. Real sentinel compatibility and source-path effects remain live acceptance obligations after installation. The method must keep inability on unresolved effects; neither the author's rationale nor root's acceptance of this implementation choice is evidence of real parsing correctness.

## Verification evidence

Evidence directory: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/`. Output filenames below are relative to that directory; every `.txt` has adjacent `.txt.json` with exact argv and actual process exit.

Reviewer executions:

| Exact captured child command | Actual exit | Full sanitized combined stdout/stderr | Result |
|---|---:|---|---|
| `python -B .runs/task-cycles/coding-guidelines/reports/f3-review-probe.py` | 0 | `f3-review-probe.txt` | Four focused adapter cases; noqa positive control fails, three supported alternative forms incorrectly pass. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f3-review-source-check.py` | 0 | `f3-review-source-check.txt` | Exact 393-rule membership, diff anchors, guideline absence. |

Both commands were invoked using `python -B .runs/task-cycles/coding-guidelines/reports/capture.py <output> <child argv...>`. No product changes, installations, branch/index changes, commits, subagents, external comments or server actions occurred. An initial inline read-only anchor-extraction command failed at Python command parsing; the standalone source-check script replaced it and is the successful evidence above. No routine test suite was repeated.

Author evidence inspected rather than rerun:

| Exact captured child command | Actual exit | Full output | Review conclusion |
|---|---:|---|---|
| `python -m unittest discover -s tests/quality -p test_python_shell_checks.py` | 0 | `f3-final-green.txt` | Pristine 16-test GREEN, consistent with metadata. |
| `python -B -m unittest discover -s tests/quality -p test_python_shell_checks.py` | 1 | `f3-weakest-red.txt` | Genuine pre-fix malformed-diagnostic regression, not synthetic failure. |
| `python -B scripts/check_ruff.py --record .runs/ruff.jsonl` | 2 | `f3-live-ruff.txt` | Missing local executable; null invariant, not enforcement acceptance. |
| `python -B scripts/check_shellcheck.py --record .runs/shellcheck.jsonl` | 2 | `f3-live-shellcheck.txt` | Missing local executable; null invariant, not enforcement acceptance. |

Sharpness: the assigned change affects build-tools and turns untrusted source/tool reports into gate results. It has no application-state, dependency-installation, deployment or irreversible action. F3-1 occurs exactly at that evidence boundary: a policy clause can receive a false named pass. The adversarial probe targets that clause independently of tool diagnostics.

## Assessment

**Task quality: Needs fixes.**

The explicit selectors, local-only tools, strict reports and fixture boundaries are sound, but the Python suppression scanner does not cover the pinned tool's supported syntax. Fix F3-1 and review its correction before accepting this task stage; actual tool and invariant acceptance remain later work.

Every unresolved concern:

1. **Important F3-1:** incomplete Ruff suppression syntax at `scripts/check_ruff.py:71`; three demonstrated false named passes.
2. **Live non-pass:** Ruff and ShellCheck methods both exit 2 until their exact local pinned executables are installed.
3. **Unchecked integration:** real Ruff/ShellCheck report compatibility and real ShellCheck sentinel/literal/source/source-path behavior.
4. **Unchecked final acceptance:** product-source compliance, independent deliberate breaks and restorations, each final guideline good/bad pair, final full project/merge checks. This F3 review does not claim any of those passed.
