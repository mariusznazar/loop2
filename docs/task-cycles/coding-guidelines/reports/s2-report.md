# S2 - Local Python-distributed quality tools

Status: DONE_WITH_CONCERNS at the product Slice 2 author boundary. The assigned installation and documentation work is complete. Both pinned binaries execute locally; the current ShellCheck method passes and the Ruff method reaches a named violation. Existing Python source repairs and newly discovered reports in independently authored methods remain for their owners, as root confirmed. No independent review, next slice, push, merge, deployment or external write was performed.

## Inputs and selection

- Worktree: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`; branch `task/coding-guidelines`; start `3a769e67dcdeada5481df0e93b37f2d8f5a1eedf`. Upstream is `origin/task/coding-guidelines`, matching the branch name.
- Product AGENTS.md and CLAUDE.md read. Gitlink and checkout of the-way both verified as `d829e3aa6242a9b8901274531dd82fd5c7d87628`.
- Read author-contract.md, S2 handoff, extracted whole task-2 brief, whole frozen task and npm12 amendment, authoritative plan's S2 section, foundation dependencies and execution constraints, F3 report, existing README and .gitignore. The amendment adopts npm 12.2.1; S2 changes no npm dependency.
- Read Superpowers 6.4.1 test-driven-development, its writing-good-tests.md reference and the implementer prompt. This slice changes dependency configuration and prose, with no new product function. It uses actual before-install non-pass evidence, installation and real-tool probes rather than a permanent test mirroring configuration text. The probes are ignored evidence, not changes to frozen invariant checks.
- Whole-read process sources: `.the-way/product-guidelines/reading.md`, `.the-way/elements/common/way_of_working.md`, coding template and general guideline template. Whole part map establishes all three changed files as build-tools at part_map.md:62-84. The changed work installs tools rather than changing game or server behavior.
- Complete current decision Scope inspection selected and whole-read the thirteen build-tools matches: D-01/1, D-02/1, D-03/2, D-04/3, D-05/3, D-06/3, D-27/1, D-28/1, D-29/1, D-30/1, D-31/1, D-32/1, D-33/1 (decisions.md:3,20,509,467,240,767,787,823,841,857,873,889,905 respectively). No match was treated as absent because an older version had the same identifier. Direct governing entries are D-28, D-30 and D-31.
- Whole-read `ruff-source-rules/1` and `shellcheck-source-rules/1`, with their methods, parts and dependencies (invariants.md:400,410), and whole `ruff-default-rules/1` and `shellcheck-default-bash-checks/1` (environment_facts.md:154,162). Inspected current invariant Part fields, including every, and build-tools standing-check entries. Whole relevant existing application invariants were read as context; S2 does not claim the whole gate passed. Searched all product foundation elements for tool/install/Python/guideline terms; findings agree with these existing assignments and choices. Product and pinned the-way glossary terms/Avoid fields were inspected; S2 introduces no foundation term.
- Guideline selection at dispatch and author return: no product guideline file exists yet. This is the task creating missing guidelines; D-28's creation exception and deferred test/build/deployment kinds still apply. No kind guideline is added by S2, and no selection expansion or policy departure is required. No UI files change; screenshot verification is unchecked because this slice has no intended visible screen change and no settled UI test route is involved.
- Public primary sources: [Ruff 0.17.1 release metadata](https://pypi.org/pypi/ruff/0.17.1/json) and [shellcheck-py 0.11.0.1 release metadata](https://pypi.org/pypi/shellcheck-py/0.11.0.1/json). Metadata captured under this report directory as s2-ruff-metadata.json and s2-shellcheck-py-metadata.json, fetched using unauthenticated HTTPS and a generic User-Agent. No secrets or customer/user data were encountered.

## Implementation, choices and costs

`requirements-quality.in` declares exactly Ruff 0.17.1 and shellcheck-py 0.11.0.1. `requirements-quality.txt` pins those packages and every non-yanked published wheel SHA-256 for the selected releases: 17 Ruff wheels and 4 shellcheck-py wheels. Both input and lock require wheels only. The installed wrapper supplies the native ShellCheck 0.11.0 executable, which was independently executed and version checked; package version `.1` is not a substituted ShellCheck version.

The quality environment is ignored at `.runs/quality-venv`. Its Windows binaries are `.runs/quality-venv/Scripts/ruff.exe` and `.runs/quality-venv/Scripts/shellcheck.exe`, satisfying F3's fixed interface. README describes the corresponding Unix `bin/` locations, both installation sequences, required Python minimum, expected binary versions and existing check commands. It preserves the existing Polish documentation convention.

1. Used shellcheck-py 0.11.0.1, the available wheel distribution for the accepted binary. An archive installer would add cross-platform download/extraction code and its own lock machinery. The wrapper adds one distribution dependency; its executed native version and dependency closure were checked rather than assumed from the package name.
2. Locked all published wheel hashes, not only the local Windows artifact, to permit the same lock on supported platforms. Limiting the lock to Windows would be shorter but prevent the documented Unix installation. The 21 hashes cost lock-review space and deliberate refresh when upgrading.
3. Excluded source distributions with `--only-binary=:all:`. Allowing sdists could introduce implicit build downloads or compile requirements outside the two-package lock. This choice intentionally fails on an unsupported wheel platform instead of installing a different version or inventing an archive fallback. It is installation mechanics, not a new source-rule policy.
4. No pip-tools/uv runtime dependency or lock regeneration framework was added. The packages have no Requires-Dist entries in release metadata and in the actual Windows/Linux wheel METADATA, so the two entries are the complete runtime closure. A future tool release with dependencies requires resolving and hashing that expanded closure; merely changing version text is insufficient.
5. README installation requires Python 3.9+, the larger of Ruff's >=3.7 and shellcheck-py's >=3.9 metadata. Current verification ran on Python 3.14.3 with pip 25.3 on Windows x86-64. Unix commands are documented and Linux artifacts resolve under Python 3.9 constraints; Unix execution is explicitly unchecked.
6. Frozen methods remained read-only. Their new Ruff findings were sent to root, who confirmed a separate correction route. Editing them here would breach independent authorship, and weakening the adopted rule set would change the accepted task meaning. Leaving them unresolved prevents a final passing gate until their owners correct them; this is explicit, not a compliance exception.

Changed files: three, 57 added lines, zero removed lines:

| File | Added | Removed |
|---|---:|---:|
| README.md | 24 | 0 |
| requirements-quality.in | 4 | 0 |
| requirements-quality.txt | 29 | 0 |

Commit range and final status evidence are appended after the commit. Only these explicit paths were staged. No reports, local environments, test probes, foundation entries or frozen check files enter the commit.

## Results and practical limits

Before installation, both exact planned methods returned exit 2 with null invariant because their local binary was absent. The prescribed venv creation and `pip install --require-hashes -r requirements-quality.txt` succeeded, then both expected versions executed. Real ShellCheck returned exit 0, named pass; real Ruff returned exit 1, named fail with the reports below. These are actual checks, not fixture substitutes.

Real adapter integration in s2-live-probes.py used a separate disposable Git repository inside `.runs/`, the actual imported frozen modules, real discovery/subprocess/output handling and copied installed native binaries. No method monkeypatch or fake tool was used. All 26 cases matched their literal expected results, covering new Python paths, real F821 findings, clean-source blocking suppression, nonblocking E402, directive-looking strings, Ruff ignore/disable variants, new extensionless Bash and env shebang, real SC2086, the ShellCheck unknown-key sentinel parser, prohibited changes, redundant directives, optional-only disable, unknown membership/source overrides, and quoted/heredoc data. Real invalid-option process errors were rejected by the shared runner: Ruff exit 2, ShellCheck exit 3. This resolves F3's named live parser/output compatibility gap for the exercised Windows cases; it is not an exhaustive upstream parser proof.

Existing F3 fixture tests remain unchanged: 18 tests passed with pristine unittest output. They supplement, rather than replace, the actual-tool evidence.

The weakest installation requirement is that the hashed lock really covers all runtime packages and rejects wrong artifacts. Downloaded Windows and Linux x86-64 wheels match the lock and have no Requires-Dist entries. A fresh second venv installed the Windows wheels offline using `--no-index --find-links` and the same `--require-hashes` lock, then both binaries executed at the accepted versions. A deliberately corrupted ignored lock with zeroed hashes was rejected by pip with exit 1 and the explicit expected/got SHA-256 mismatch. No product lock was altered for that test. `pip check` also passed. These checks establish complete wheel runtime closure for the actual inspected artifacts and meaningful hash enforcement; they do not authenticate PyPI against an independent publisher key or prove every other platform binary can run.

The first cross-platform pip download attempt returned exit 1 because pip validates platform options before reading `--only-binary` inside the requirements file. The corrected probe supplied the same flag on its command line and passed without `--no-deps`, retaining dependency resolution. This is a probe command correction, not a product installation failure; both outputs are retained.

## Remaining Ruff findings requiring later work

Full actual diagnostics, including complete tool JSON, are in s2-live-ruff.txt. Exact observed locations:

| Route | File and location | Rule | Count |
|---|---|---|---:|
| Existing accepted source repair | tests/deploy/test_loop2_deploy_build.py:16:8 | F401 unused os | 1 |
| Planned S3 resource/source repair | tests/invariants/loop2_invariant_support.py:20:8 | F401 unused sys | 1 |
| Planned S3 resource/source repair | tests/invariants/loop2_invariant_support.py:239:24 and :240:24 | SIM115 open-file-with-context-handler | 2 |
| Independent-method correction | scripts/check_eslint.py:17:12, :83:16, :132:15 | SIM905 split-static-string | 3 |
| Independent-method correction | scripts/check_ruff.py:19:12 | SIM905 split-static-string | 1 |
| Independent-method correction | scripts/check_shellcheck.py:39:9 | SIM103 needless-bool | 1 |
| Independent-method correction | scripts/quality_support.py:182:17 | BLE001 blind-except | 1 |
| Independent-method correction | tests/quality/test_format_check.py:211:68 | B023 function-uses-loop-variable | 1 |

Total actual current diagnostics: 11 (4 remaining accepted source diagnostics and 7 in independently authored method code/tests). The task's original unused import in test_loop2_api_error_route.py is no longer reported, following earlier independent work. Root owns assignment of the deploy import removal and the separate frozen-method corrections; S2 changed none of these sources.

## Self-review and sharpness

Read the complete three changed files and final diff, checked staged paths and line counts, literal backslash lock continuations, Polish characters after writing, and README instruction/executable alignment. An initial PowerShell-to-Python text transfer damaged newly inserted Polish characters; self-review caught this and the final patch restores them before staging. No original paragraph was rewritten, and git diff reports additions only. Staged whitespace check passed.

Actual diff scope is build-tools only: dependency declarations and README, with no gameplay/server logic, deployment, data migration, production runtime dependency or UI behavior change. It introduces no irreversible product action. Installation crosses the map's untrusted PyPI input boundary into local developer tools; pinned versions, explicit artifact hashes, wheel-only mode and live native version checks constrain that boundary. The installed quality tools do not perform a dependency install during standing checks; inspection confirms those methods invoke fixed local binaries directly. No network-blocking sandbox was applied to native tools, so this is not a packet-level claim that an executable made no connection.

Unresolved/unchecked: Ruff is still failing as listed; independent review is next and belongs to root; Linux/macOS execution and other architectures are unchecked; full npm/application tests, whole gate, guideline form/reference checks and merge checks remain later integration work by root. The handoff's deferred S1 README minimum-Node finding was not changed by this slice. No broader test suites were run, per the slice's focused installation contract.

## Exact command evidence

Each table row below gives the exact captured child command, actual child exit and complete combined stdout/stderr. Paths are relative to this report directory; each output has an adjacent `.txt.json` file containing exact argv and elapsed time. Capture runner invocation is `python -B .runs/task-cycles/coding-guidelines/reports/capture.py <output> <child command...>`. Exit 1 for the deliberately corrupted lock is expected evidence; the actual Ruff exit 1 is an unresolved non-pass. No unrun check is counted as passing.

| Exact child command | Exit | Full output |
|---|---:|---|
| `git show --stat --format=fuller HEAD` | 0 | s2-commit-show.txt |
| `git commit -m build: pin local Ruff and ShellCheck tools -- README.md requirements-quality.in requirements-quality.txt` | 0 | s2-commit.txt |
| `git diff --cached --check` | 0 | s2-diffcheck.txt |
| `.runs/quality-venv/Scripts/python.exe -m pip download --only-binary=:all: --require-hashes -r requirements-quality.txt --platform manylinux2014_x86_64 --python-version 3.9 --dest .runs/s2-wheelhouse-linux --disable-pip-version-check` | 0 | s2-download-linux-corrected.txt |
| `.runs/quality-venv/Scripts/python.exe -m pip download --require-hashes -r requirements-quality.txt --platform manylinux2014_x86_64 --python-version 3.9 --dest .runs/s2-wheelhouse-linux --disable-pip-version-check` | 1 | s2-download-linux.txt |
| `.runs/quality-venv/Scripts/python.exe -m pip download --require-hashes -r requirements-quality.txt --dest .runs/s2-wheelhouse-windows --disable-pip-version-check` | 0 | s2-download-windows.txt |
| `git diff 3a769e67dcdeada5481df0e93b37f2d8f5a1eedf HEAD --numstat` | 0 | s2-final-numstat.txt |
| `git status --short` | 0 | s2-final-status.txt |
| `python -B -m unittest discover -s tests/quality -p test_python_shell_checks.py` | 0 | s2-fixtures.txt |
| `.runs/quality-venv/Scripts/python.exe -m pip download --no-index --find-links .runs/s2-wheelhouse-windows --require-hashes -r .runs/s2-tampered-requirements.txt --dest .runs/s2-rejected-wheelhouse --disable-pip-version-check` | 1 | s2-hash-rejection.txt |
| `.runs/quality-venv/Scripts/python.exe -m pip install --require-hashes -r requirements-quality.txt` | 0 | s2-install.txt |
| `python -B .runs/task-cycles/coding-guidelines/reports/s2-live-probes.py` | 0 | s2-live-probes.txt |
| `python -B scripts/check_ruff.py --record .runs/ruff.jsonl` | 1 | s2-live-ruff.txt |
| `python -B scripts/check_shellcheck.py --record .runs/shellcheck.jsonl` | 0 | s2-live-shellcheck.txt |
| `python -B .runs/task-cycles/coding-guidelines/reports/s2-lock-probe.py` | 0 | s2-lock-probe.txt |
| `git diff --cached --numstat` | 0 | s2-numstat.txt |
| `.runs/s2-offline-venv/Scripts/python.exe -m pip install --no-index --find-links .runs/s2-wheelhouse-windows --require-hashes -r requirements-quality.txt --disable-pip-version-check` | 0 | s2-offline-install.txt |
| `python -m venv .runs/s2-offline-venv` | 0 | s2-offline-venv.txt |
| `.runs/quality-venv/Scripts/python.exe -m pip check` | 0 | s2-pip-check.txt |
| `python --version` | 0 | s2-python.txt |
| `python -B scripts/check_ruff.py --record .runs/ruff.jsonl` | 2 | s2-red-ruff.txt |
| `python -B scripts/check_shellcheck.py --record .runs/shellcheck.jsonl` | 2 | s2-red-shellcheck.txt |
| `.runs/quality-venv/Scripts/ruff.exe --version` | 0 | s2-ruff-version.txt |
| `.runs/quality-venv/Scripts/shellcheck.exe --version` | 0 | s2-shellcheck-version.txt |
| `python -m venv .runs/quality-venv` | 0 | s2-venv.txt |

## Final commit boundary

Commit range: `3a769e67dcdeada5481df0e93b37f2d8f5a1eedf..a9080ceb95a070078950763fbd9e0d18336cd4d0`. Commit `a9080ce build: pin local Ruff and ShellCheck tools` contains exactly the three assigned paths, 57 additions and no removals. Private author address verified as `mariusznn@gmail.com`; final tracked status is clean. Complete evidence is s2-commit-show.txt, s2-final-numstat.txt and s2-final-status.txt. Returning now before independent review.
