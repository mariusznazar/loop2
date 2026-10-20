# F3 — Python and Bash invariant methods

Status: DONE_WITH_CONCERNS at the F3 author boundary. The three assigned files are implemented and focused fixtures pass. Both actual methods were executed and returned exit 2 with null invariant because the repository-local tools do not yet exist. Independent review, installation, product remediation, next-stage work, merge, deployment and push remain outside this author's boundary.

## Inputs and reading selection

- Worktree: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`; branch `task/coding-guidelines`; start `e85670a467de02ec0c46d1fb17777f54ad70ec9e`.
- Verified the-way checkout and gitlink both `d829e3aa6242a9b8901274531dd82fd5c7d87628`.
- Read author-contract.md first, then the F3 handoff, product AGENTS.md/CLAUDE.md, Superpowers 6.4.1 test-driven-development plus its writing-good-tests reference and implementer-prompt.md. No plan, frozen task, configuration-author or foundation-author reasoning, excluded branch or other checkout was read.
- Whole-read governing entries: `ruff-source-rules/1`, `shellcheck-source-rules/1`, D-30/1, D-31/1, `ruff-default-rules/1`, `shellcheck-default-bash-checks/1`; also whole D-28/1 and D-29/1 for adjacent scope/deferral context. Membership follows the final environment facts and adopting decisions, not tool configurations or product-author explanations.
- Read the complete current part map, `.the-way/product-guidelines/reading.md`, `.the-way/product-guidelines/coding/template.md`, its referenced general `template.md`, and `.the-way/elements/common/way_of_working.md`. Read the shared mechanics and F1 report for API behavior only.
- Actual changed ownership is build-tools: `scripts/**` and `tests/quality/**`. The methods read Python/Bash in browser-view, simulation, account-server, build-tools, deployment and agent-workflow, matching the final invariant Part fields. `deploy/loop2-deploy` was inspected as an actual extensionless `#!/bin/bash` script. No UI behavior or screen changes; screenshot verification is unchecked because there is no intended visible change.
- Selected product guideline paths: none exist yet. The absent `guidelines/coding.md` is the task's announced creation gap, not a passed guideline check. D-28 defers separate build/test/deployment exemplar files. No selection expansion or contradiction was found or used to add new work.
- Supporting primary documentation read: [pinned ShellCheck manual](https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/shellcheck.1.md), [pinned Parser.hs](https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Parser.hs), [pinned Analytics.hs](https://raw.githubusercontent.com/koalaman/shellcheck/v0.11.0/src/ShellCheck/Analytics.hs), [pinned Ruff configuration](https://raw.githubusercontent.com/astral-sh/ruff/0.17.1/docs/configuration.md) and [pinned noqa parser](https://raw.githubusercontent.com/astral-sh/ruff/0.17.1/crates/ruff_linter/src/noqa.rs). Public research used generic unauthenticated HTTPS. No secret or customer data was encountered.

## Change and installation interface

Commit range: `e85670a467de02ec0c46d1fb17777f54ad70ec9e..49a37059c637027880955d31199d4bbbcf99eda1`.
Commit: `49a3705 feat: add independent Python and Bash quality checks`.
Verified private author email `mariusznn@gmail.com` and clean tracked working tree after commit.

| File | Added | Removed |
|---|---:|---:|
| scripts/check_ruff.py | 155 | 0 |
| scripts/check_shellcheck.py | 177 | 0 |
| tests/quality/test_python_shell_checks.py | 259 | 0 |

Only these explicit paths were staged. No existing source, foundation sentence, tool configuration or shared mechanics changed. The ignored evidence files are outside the commit.

The later installer must create real, directly launchable local binaries at these exact paths, relative to the repository root:

| OS | Ruff | ShellCheck |
|---|---|---|
| Windows | `.runs/quality-venv/Scripts/ruff.exe` | `.runs/quality-venv/Scripts/shellcheck.exe` |
| Unix | `.runs/quality-venv/bin/ruff` | `.runs/quality-venv/bin/shellcheck` |

Ruff must report exactly `ruff 0.17.1` from `--version`. ShellCheck's banner must contain exactly one version line, `version: 0.11.0`; LF and CRLF banners are accepted. No PATH fallback, installation, download, command shell, alternate remote binary or automatic version substitution occurs inside either method. Unix launchers must already be executable. The Python interpreter executing the adapter need not be the quality venv's interpreter; the actual tool path is absolute and fixed.

Both modules expose `check(root) -> bool` and a `--record <path.jsonl>` CLI using F1's `run_check`. Exit 0 is a complete named pass, exit 1 a complete named violation, exit 2 inability with `invariant: null`. Stderr warnings, unavailable/wrong-version tools, malformed UTF-8/JSON/schema, unexpected exit codes and inconsistent success/diagnostics cannot become passes. Reports identify affected paths and diagnostics without modifying sources.

Ruff discovers Python suffixes `.py`, `.pyi`, `.pyw` and Python shebang files within the six adopted parts. The frozen explicit list contains all 393 rules obtained from the final 407-member fact minus the fourteen D-30 examples. Every invocation is isolated, nonpreview, nonfixing, cache-free, ignores noqa, and passes that list directly. `RUFF_*` variables are removed. Tokenized Python comments independently reject blanket or blocking-code suppression, including prefix selectors, while `# noqa: E402` and directive-like string literals remain neutral.

ShellCheck discovers `.sh`/`.bash` files without another declared interpreter and Bash shebang files, including extensionless paths and `env -S bash`. YAML commands and test literals are excluded. Every source invocation explicitly uses `--norc --shell=bash --severity=style --format=json1 --extended-analysis=true`; `SHELLCHECK_*` variables are removed and UTF-8 locale variables are supplied. Every default diagnostic severity blocks.

### ShellCheck source directive contract for later guidelines

The check does not ban comments or known keys wholesale. Its exact distinction is:

- Proven changes to the adopted set or suppressions produce a named failure: `disable=all`, ranges including a known default code, `disable=SC2086`/`SC1107`, enabling a named default-excluded optional check, `shell=sh`, or `extended-analysis=false`.
- Proven redundant or nonblocking directives allow ordinary checking to continue: `shell=bash`, `extended-analysis=true`, and disabling known optional-only SC2248/SC2250. The pinned Analytics source separately establishes those optional codes and SC2086's default origin.
- A disable selector whose membership is not established (e.g. SC9999 or another unclassified code), or a source/source-path override whose effect is not established, yields inability, null invariant and exit 2. It is neither a pass nor an invented policy violation. Root explicitly selected this conservative uncertainty treatment instead of a heuristic second inventory of all default codes.

The directive parser probe is performed only when directive-like keys occur and the original source has no diagnostic. It changes key letters to an unknown sentinel in stdin, retaining quotes, whitespace, line endings and shell delimiters. A matching pinned-parser SC1107 at that source line identifies an actual directive; strings and heredoc contents do not produce that parser diagnostic. A probe parse error gives inability. Source files remain untouched. This uses the actual parser rather than an incomplete new Bash lexer, at the cost of one extra subprocess for candidate-bearing clean sources and dependence on the pinned parser diagnostic. Its real-tool integration is still unchecked until installation; fixtures model that external parser boundary and do not prove upstream parsing.

## Choices and costs

1. Reused F1 discovery/invocation/record behavior, with policy wholly in these independent adapters. This keeps ownership discovery authoritative and includes new untracked owned sources. An unowned unrelated file can stop discovery by F1 design; silently excluding it would risk hiding source.
2. Frozen the Ruff rule list from the authoritative fact rather than reading mutable repo configuration at runtime. Using a changing config or whatever upstream defaults happen to select could silently weaken the gate. The explicit list costs maintenance when the adopting decision changes; it is not a second new foundation claim.
3. Checks run per file, avoiding platform command-line length limits and making path/report validation exact. A single multi-file run is faster but harder to attribute on malformed output; per-file execution costs extra local processes. Shared discovery completes before filtering, and no partial success is recorded.
4. Python tokenization distinguishes comments from strings with no new parser dependency. Ignoring noqa in Ruff prevents suppression from hiding diagnostics, while the independent comment test also catches suppression on otherwise clean code. A raw regex over source would falsely reject literal examples.
5. Shell directives use the three outcomes above, as root clarified from D-31. Treating all directives as violations would introduce an unapproved broader policy; treating unknown disabled codes as neutral could admit a suppression. The selected inability result can require clarification for a harmless directive, but never silently weakens the adopted set. A full independently maintained code inventory was rejected as disproportionate and difficult to verify.
6. The sentinel probe avoids recreating Bash quoting/heredoc grammar. It relies on pinned Parser.hs's unknown-key SC1107 rather than an English summary guessed from a fixture. Keeping a raw textual prohibition would be cheaper but incorrectly reject script data; a full Bash parser dependency would enlarge the stage. Real pinned-parser probes remain required after installation.
7. At 591 added lines (including the frozen rule list and 259 fixture lines), the stage remains three cohesive assigned files. No extra library, generalized catalog, installer or shared framework was added. Broader project/application tests were not rerun: the stage handoff and root explicitly constrain this independent check preparation to focused verification.

## TDD and command evidence

Every output path below is relative to `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/`. Each named `.txt` contains complete combined sanitized stdout/stderr; its adjacent `.txt.json` records exact argv, actual child exit and elapsed time. Commands were captured via `python -B .runs/task-cycles/coding-guidelines/reports/capture.py <output> <command...>`; the table names the exact captured child command. `PYTHONDONTWRITEBYTECODE=1` prevents incidental bytecode.

| Exact child command | Actual exit | Complete output | Meaning |
|---|---:|---|---|
| `python -B -m unittest discover -s tests/quality -p test_python_shell_checks.py` | 1 | f3-red.txt | Initial RED: 11 tests, 36 assertion failures because both methods were absent. |
| `python -B -m unittest discover -s tests/quality -p test_python_shell_checks.py` | 1 | f3-shell-red.txt | Ruff cases pass after its implementation; 25 assertions still fail because ShellCheck method is absent. Includes new directive cases before its implementation. |
| `python -B -m unittest discover -s tests/quality -p test_python_shell_checks.py` | 0 | f3-green-first.txt | First GREEN: 13 tests pass. |
| `python -B scripts/check_ruff.py --record .runs/ruff.jsonl` | 2 | f3-live-ruff.txt | Actual Ruff non-pass: local tool missing; record has null invariant. |
| `python -B scripts/check_shellcheck.py --record .runs/shellcheck.jsonl` | 2 | f3-live-shellcheck.txt | Actual ShellCheck non-pass: local tool missing; record has null invariant. |
| `python -B -m unittest discover -s tests/quality -p test_python_shell_checks.py` | 1 | f3-weakest-red.txt | Adversarial RED: malformed Ruff report without a code was incorrectly recorded as a named violation (1 instead of 2). |
| `python -B -m unittest discover -s tests/quality -p test_python_shell_checks.py` | 0 | f3-weakest-green.txt | Corrected GREEN: 15 tests pass; explicit diagnostic-code presence now required. |
| `python -B -m unittest discover -s tests/quality -p test_python_shell_checks.py` | 1 | f3-banner-red.txt | Platform RED: full CRLF ShellCheck banner wrongly rejected (2 instead of 0). |
| `python -m unittest discover -s tests/quality -p test_python_shell_checks.py` | 0 | f3-final-green.txt | Final GREEN: all 16 tests pass with pristine unittest output. |
| `git diff --cached --check` | 0 | f3-diffcheck.txt | Final staged files have no whitespace errors. |
| `git show --stat --format=fuller HEAD` | 0 | f3-commit.txt | Confirms committed three-file set, range endpoint and author. |
| `git status --short` | 0 | f3-status.txt | Clean working tree after commit; ignored reports stay outside it. |

The disposable fixtures use real Git repositories, actual discovery, actual Python subprocesses, environment propagation, byte output, exit handling, parser validation and real record creation. Only the absent linter executable boundary is replaced, preserving the shared run_tool process implementation. Fake tools reject weakened selector/options/environment contracts and supply complete representative diagnostic structures. They are not live evidence that Ruff or ShellCheck accepts all current product source.

## Self-review, weakest point and sharpness

Read the complete staged diff for all three assigned files. Confirmed exact staged path set and line counts, no writes outside the task worktree, no source/config/foundation edits and no dependency additions. Relevant realistic mutations are caught: omitting any adopted part, skipping new paths or extensionless Bash, dropping isolation/selector/ignore-noqa/norc/severity flags, inheriting disabling environment options, accepting an unavailable/wrong-version tool, trusting malformed output, mismatching process exit to diagnostics, and treating unknown disabled-code membership as a pass.

The chosen weakest point was translating external output into an asserted invariant result. The additional incomplete-diagnostic test caught a genuine missing-key issue before the fix, and now requires null invariant/exit 2. The full CRLF banner check also caught and fixed a real platform limitation. These checks prove the adapter distinctions for controlled external results, not live upstream schemas or all diagnostic forms.

Sharpness: the actual diff touches only build-tools and adds local read-only checking. It changes no game logic, server route, deployment action, manifest or lockfile. It does not cross the map's deployment or dependency-audit trust boundary and has no irreversible effect. Its relevant input boundary is untrusted local source and external tool reports being converted into a gate verdict; false success could admit a defective later change. Validating output before the shared runner names an invariant, rejecting unknown directive effects and never installing during checking reduce that risk.

## Unresolved and unchecked

- **Actual ruff-source-rules and shellcheck-source-rules: non-pass, exit 2.** Neither local executable exists yet. The actual current source has not been declared compliant.
- **Real pinned-parser sentinel behavior and real Ruff/ShellCheck output compatibility: unchecked.** After installation, exercise clean/defective new files, extensionless Bash, ordinary directive comments, redundant directives, optional-only suppression, unknown suppression membership, directive-looking quoted/heredoc data, and actual process errors against the real binaries. Fixture results are not a substitute.
- The known-membership limit for ShellCheck disabling directives is intentional and must be disclosed in the later guideline interface. Unknown membership and source overrides require resolution, rather than a blanket ban or assumed neutrality.
- Final full project tests, product-source repairs, guideline form checks and merge-time gates remain root's later responsibility. No foundation format guard is needed for this stage because no foundation file changed.
- Independent review is the next action owned by root. This author does not invoke it or continue to the next stage.
