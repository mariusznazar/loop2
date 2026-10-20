# Finding verdicts

**Machine-local attributes can produce a pass without repository LF protection — ADDRESSED.** The revised [scripts/check_format.py:91](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/scripts/check_format.py#L91) retains the ordinary effective attribute check and additionally evaluates the current repository attribute files using isolated Git metadata. Both must preserve LF (`scripts/check_format.py:117`).

Reviewed fix range: `eb94bd41d4ec2b4d222baf6bd4ea090551697a16..e0a4699be13e0e9efef4eefc1de6f3bd584d115c`, two files +72/-6. Scope is the original Important finding and new breakage introduced by this fix. Read the exact Superpowers 6.4.1 `re-review-prompt.md`, operational reviewer contract, fix handoff/report, original finding and complete fix diff once. Rechecked final D-32 and prettier-source-format/1. Existing whole-read guideline selection remains build-tools; `Test-Path guidelines` still returns False. This overall task creates those guidelines, and the existing D-28 building/test exemplar deferrals still apply. No new guideline selection or scope expansion. No changed product documents need a separate document pass.

## Verification of the original finding

Original finding, preserved verbatim:

> The LF check accepts attributes contributed only by `.git/info/attributes` or `core.attributesFile`, so it can record `prettier-source-format/1` as passed when the repository has no LF attributes for its covered files. In an isolated fixture, emptying `.gitattributes` correctly failed, but adding only a local or user attribute file changed the result to a named pass. Verify repository-provided LF attributes independently of local/global/system contributions, while still checking that effective local attributes do not override them, and retain regression tests for both masking cases.

Independent source inspection: [scripts/check_format.py:98](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/scripts/check_format.py#L98) removes inherited `GIT_*` settings for the isolated evaluation and explicitly disables system attributes and system/global config. The temporary Git directory starts from an explicitly empty template; `--work-tree` names the actual current checkout, while `core.attributesFile=` removes the user attribute source. Its own empty metadata cannot supply the product's `.git/info/attributes` or index. The source-level mechanism therefore closes both reported masking routes rather than merely changing the fixture expectation. The original effective query remains at line 95, so a local CRLF override still causes failure. The temporary metadata is cleaned by its context manager without relocating or rewriting product Git metadata or attribute files.

The added tests verify missing-repository negative controls plus local-info/global-file masking at [tests/quality/test_format_check.py:141](https://github.com/mariusznazar/loop2/blob/712117b84b20dca607c160964c7b85440759f74b/tests/quality/test_format_check.py#L141) and line 147; local weakening of valid repository rules at line 155; and current nested/new attribute precedence, product index/config byte preservation and temporary cleanup at line 159. Changing the fixture's ownership pattern to `/.gitattributes` correctly removes unintended nested ownership overlap and does not change product discovery policy. No concern found in the extracted complete-output parser at `scripts/check_format.py:69`; the completeness/duplicate checks are preserved.

The author's captured rerun of the same independent probe now reports adapter exits **0, 1, 1, 1** for repository control, missing-policy control, local-info masking and user-file masking respectively. Both formerly reproduced named false passes are now named failures. This exercises real Git semantics with the miniature formatter allowing the adapter to reach its attribute boundary; it is not real Prettier acceptance.

## New breakage in the fix diff

None. The two-query conjunction preserves current-machine enforcement while adding repository provenance. Nested current attribute files are evaluated using Git rather than a custom pattern parser. Error propagation remains no named verdict through the existing runner; the fix adds no product/index/config mutation. No Critical, Important or Minor issue found in this fix diff.

## Evidence inspected, without rerunning tests

All output paths below are under `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/`. Full outputs and adjacent `.txt.json` exact-command/exit metadata were read, including failures. No routine suite or probe was rerun by the reviewer.

| Exact command | Actual exit | Complete output | Observed result |
|---|---:|---|---|
| `python -m unittest discover -s tests/quality -p test_format_check.py` | 1 | `f4-fix1-red.txt` | 17 tests, three failures: two masking false passes and nested-fixture ownership failure. |
| Same focused test command | 1 | `f4-fix1-red-confirmed.txt` | Corrected fixture leaves exactly two masking failures before implementation. |
| Same focused test command | 0 | `f4-fix1-green.txt` | 17 tests pass. |
| Same focused test command | 0 | `f4-fix1-final-green.txt` | 17 tests pass with preservation/cleanup assertions. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f4-review-attributes-probe.py` | 0 | `f4-fix1-probe.txt` | Adapter control/masking codes 0, 1, 1, 1. |
| `python -B scripts/check_format.py --record .runs/format.jsonl` | 2 | `f4-fix1-live.txt` | Exact Prettier pin absent; invariant remains null, no product success. |
| `git diff --cached --check` | 0 | `f4-fix1-diffcheck.txt` | No whitespace errors. |

Manual reviewer method: inspect complete fix diff against the previously reproduced mechanism and read complete covering outputs; actor is the independent F4 reviewer, command fields not applicable to source judgment. A line-anchor extraction attempt was rejected by PowerShell parsing before Python ran, then corrected using PowerShell against the diff package; it was not a test or product execution and changed no files.

## Out-of-scope observations

None newly observed. Preserve the earlier acceptance limits: actual Prettier 3.9.10 API/default metadata, genuine formatting and native ignore semantics, real editor/nested configuration, installed/configured full product method and one-time scope formatting remain unchecked. Final guideline good/bad pairs, deliberate break/restoration, broad product/invariant suites and applicable final guards also remain unchecked. The captured live method exit 2 is a genuine non-pass; miniature formatter tests do not replace these checks. This fix intentionally supplies no repository LF configuration or tool installation.

## Verdict

**Fix round: All findings addressed, no new Critical/Important breakage.** Original Important finding closed; no unresolved finding in this fix scope. Scoped spec compliance: compliant. Scoped task quality: Approved. Actual formatter/final acceptance remains unchecked. Only this ignored report was written; no product edits, Git/index changes, subagents, external comments or next-stage invocation.
