# Slice 2 independent review

## Spec compliance

**Verdict: Spec compliant for the scoped installation slice.**

Range: `3a769e67dcdeada5481df0e93b37f2d8f5a1eedf..a9080ceb95a070078950763fbd9e0d18336cd4d0`.
Review package: `.superpowers/sdd/plan/s2-review-package.txt`, read once in full; three files, 57 additions, no removals. No changed product file was reread separately. No Git command, check rerun, subagent, source change or fix was performed by this reviewer. Only this authorized ignored report was written.

Task-2 brief requires exactly `requirements-quality.in`, `requirements-quality.txt` and README installation instructions. Each has its requested hunk: the input pins Ruff 0.17.1 and shellcheck-py 0.11.0.1 (input:1-4); the lock pins and hashes both distributions and enforces wheel-only installation (lock:1-29); README gives the local ignored venv, Windows and Unix executable locations, installation commands and expected native versions (README.md:23-43). README.md:47-48 gives the two required standing methods. The wrapper version is explained separately from the required ShellCheck binary version.

Cannot verify from this diff alone: installation and adapter execution. Captured author evidence, inspected below, supports Windows installation and actual native-tool execution. Unix execution, other architectures and the final whole-product gate remain unchecked; Linux wheel resolution alone is not a Unix execution pass.

## Strengths

- `requirements-quality.txt:4-29`: exact versions, SHA-256 hashes and wheel-only mode constrain what gets installed, with no source-build fallback or undeclared bootstrap dependency. The matching input remains short and readable.
- `README.md:23-43`: both platform paths agree with the unchanged adapters' OS-specific executable selection; expected native ShellCheck 0.11.0 is distinguished from Python wrapper 0.11.0.1.
- `requirements-quality.txt:6,25`: inspected lock-probe code and its captured result establish 17 Ruff and four wrapper wheel hashes matching captured release metadata, and empty Requires-Dist for the actual Windows and Linux wheels. A separate offline installation and deliberate wrong-hash rejection provide stronger evidence than a successful online install alone.
- `.runs/task-cycles/coding-guidelines/reports/s2-live-ruff.txt:8`: the real failing Ruff invariant remains a failure; no suppression or policy weakening was added to make the installation look compliant.

## Issues

### Critical

None in this slice.

### Important

None introduced by the three-file installation diff. The unresolved Ruff failure below still prevents final full-compliance acceptance under D-28; this scoped approval does not waive it.

### Minor — installation output contains a pip update notice (new observation)

**Anchor:** `.runs/task-cycles/coding-guidelines/reports/s2-install.txt:10`.

**Do wklejenia:** The successful installation output includes pip's update notice. For quieter future captured installations, `--disable-pip-version-check` can suppress that notice without changing the pinned tool versions.

**Dlaczego to zglaszam:** The review contract asks that reported output noise be recorded. Installation is successful and the notice concerns pip 25.3 versus 26.2.1, not Ruff or ShellCheck; it does not undermine a test or version result and is not a reason to update pip or block this slice. The offline installation evidence already uses the flag and is quiet. Leaving this as-is costs only incidental output; using the flag costs one installation option. No product change is required for approval.

## Foundation and guideline selection

Read product AGENTS.md and CLAUDE.md, the complete current part map and glossary, all current invariants, the complete latest decision entries whose Scope names build-tools, and the complete Ruff/ShellCheck environment facts. Latest build-tools decisions selected: D-01/1, D-02/1, D-03/2, D-04/3, D-05/3, D-06/3, D-27/1, D-28/1, D-29/1, D-30/1, D-31/1, D-32/1, D-33/1. Selection used latest versions rather than accepting obsolete entries with the same number. D-30/1 and D-31/1 directly bind the native tool versions; D-28/1 requires full compliance before merge. D-33/1 uses npm 12.2.1 and excludes non-npm dependencies from its vulnerability audit; it does not require an extra Python audit here.

The complete part map assigns README and both requirements files to build-tools (`foundations/part_map.md:62-84`). Scope is installation declarations and prose, with no product screen or application behavior change. Applied `.the-way/product-guidelines/reading.md` and read its named coding template. An exact root-directory inventory found no `guidelines/` directory. The containing task creates the missing guidelines, so the D-28/task creation route applies; no existing applicable guideline was skipped and no UI styleguide is selected. S2 introduces no code kind or exemplar and does not change a foundation entry or invariant method.

## Named risks checked and evidence

1. **A wrapper package could supply the wrong native version or missing dependencies.** Inspected `s2-install.txt`, `s2-ruff-version.txt`, `s2-shellcheck-version.txt`, `s2-lock-probe.py`, `s2-lock-probe.txt` and `s2-offline-install.txt`. The exact planned online install exits 0; accepted native versions execute, including after a separate offline Windows installation. Lock-probe output reports no Requires-Dist for either downloaded Windows or Linux artifact. Its source actually compares the lock hashes with every non-yanked published wheel in the captured metadata and inspects wheel METADATA.
2. **Hashes could be decorative or the lock platform-specific.** Inspected `s2-hash-rejection.txt` and `s2-download-linux-corrected.txt`. Pip rejects the zeroed ignored test lock with an expected/got hash mismatch (exit 1); the corrected Linux Python-3.9 wheel-download probe resolves both locked artifacts (exit 0). The first failed cross-platform download was an invalid probe command requiring --only-binary on its command line; it is retained and is not counted as a product installation failure or pass.
3. **Documented paths could differ from what standing checks execute, or trigger a fresh install.** One focused inspection of unchanged `scripts/check_ruff.py` and `scripts/check_shellcheck.py` showed OS-specific `.runs/quality-venv/Scripts/*.exe` versus `bin/*`, local file existence and version checks, followed by direct `run_tool` calls. The inspected adapters contain no package installation command. This is code evidence, not packet-level proof of network silence.
4. **The newly installed versions could be incompatible with the adapters or produce a misleading pass.** Inspected `s2-live-probes.txt`, `s2-fixtures.txt`, `s2-live-ruff.txt` and `s2-live-shellcheck.txt`, and captured command metadata for the actual standing checks. The probe reports 26 cases with no mismatches, including defect/suppression rejection and process errors; existing fixtures report 18 tests OK. The actual product ShellCheck method exits 0 with a named pass. The actual product Ruff method exits 1 with a named fail. No reviewer tests were needed or run; all commands/results here are author evidence, not new executions.

## Unresolved concerns and boundaries

- Ruff remains failing with 11 observed diagnostics: `tests/deploy/test_loop2_deploy_build.py:16:8` F401; `tests/invariants/loop2_invariant_support.py:20:8` F401 and `:239:24`, `:240:24` SIM115; `scripts/check_eslint.py:17:12`, `:83:16`, `:132:15` SIM905; `scripts/check_ruff.py:19:12` SIM905; `scripts/check_shellcheck.py:39:9` SIM103; `scripts/quality_support.py:182:17` BLE001; `tests/quality/test_format_check.py:211:68` B023. These are observed blocking-rule violations in unchanged files, not findings introduced by this diff. Root must route the planned source repairs and independently authored method corrections and obtain a real final pass; no rule weakening is authorized.
- Native execution is evidenced on Windows x86-64/Python 3.14.3. Linux x86-64 artifacts and Python 3.9 metadata resolve; Linux/macOS execution, all other architectures and actual minimum-Python execution are untested. Wheel absence deliberately causes installation failure, as README says.
- Existing S1 minimum-Node README concern is untouched context and remains with root; S2's three-file diff supplies no evidence that closes it.
- Full npm/application tests, the whole gate, guideline creation/form/reference checks and merge verification remain later integration work, not S2 passes. Final deliberate-break and guideline-case acceptance also remain later on complete product code.
- Unsupported platforms, a lock regeneration framework, Python/Bash automatic formatting, application changes, deployment and extra foundation meanings are outside this slice. No finding demands them. No UI screenshots are necessary for this installation-only change.

## Task quality

**Verdict: Approved for scoped Slice 2.**

The declarations are small, the documented commands match the local adapter contract, and captured installation, artifact integrity and real binary evidence substantiate the work. Approval covers this diff only; the known failing Ruff invariant and unexecuted platform checks remain explicit and must not be promoted to a whole-branch pass.
