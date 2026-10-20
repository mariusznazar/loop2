# Spec compliance: Issues found

Task quality: Needs fixes.

Reviewed range: `8cd65938261045398c2d9059a0ba2c05c9a254b7..eb94bd41d4ec2b4d222baf6bd4ea090551697a16` (2 added files, +342/-0). This is the independent F4 task review, not whole-branch acceptance. One Important in-scope issue remains. No Critical or Minor findings.

## Scope and authoritative reading

Read the operational reviewer contract, complete code-review playbook and exact Superpowers 6.4.1 `subagent-driven-development/task-reviewer-prompt.md`. Read F4 handoff and author report, the complete assigned diff once, whole current invariants and part map, complete guideline reading procedure and coding template, complete D-28 through D-33 entries, current `.gitattributes`, shared quality-support implementation and F1 mechanics report. No changed file was reread separately. Outside-diff source inspection was limited to the required policy/selection inputs and the named risks of discovery/record mechanics and LF attribute provenance.

Changed files are owned by build-tools: the map assigns `scripts/**` and `tests/quality/**` and explicitly gives that part responsibility for code-quality checks. The method additionally reads the source parts and deployment-owned `.gitattributes`, as the invariant requires. `guidelines/` is absent (`Test-Path guidelines` returned False); this overall task creates it. There is no existing guideline selection to read or expansion to make. D-28 explicitly defers separate building/test exemplars. No UI change is present, so screenshots remain unchecked and are not a relevant F4 acceptance claim. Only Python implementation and tests change; the document pass found no changed product documentation to assess.

The binding invariant is: “Every file in the scope adopted by D-32 has the formatting produced by the adopted Prettier 3.9.10 configuration and LF line endings on every platform.” D-32 explicitly adds: “The editor and check share one explicit configuration, and narrow repository attributes preserve LF for that scope on Windows.” D-32 has no linked decision or environment-fact dependency.

## Strengths and checks with no concern

- `scripts/check_format.py:100`: scope comes from shared ownership discovery, with every selected file passed individually to the API. New owned files are not silently hidden by Prettier CLI ignore files; suffix selection includes the TypeScript/JavaScript variants. `tests/quality/test_format_check.py:88` exercises new paths in every adopted source part.
- `scripts/check_format.py:104`: byte-level UTF-8 readability is established before Node replacement decoding can hide corruption. `scripts/check_format.py:60` compares exact source output and separately rejects CR. The retained UTF-8 RED/GREEN evidence demonstrates an actual false-pass correction, rather than only a nominal test addition.
- `scripts/check_format.py:29`: the six explicitly adopted defaults are independent literal expectations; additional resolved options are compared with the pinned formatter's defaults. Version, config, complete result population, exact booleans and duplicate records are checked before a named verdict (`scripts/check_format.py:112`, `scripts/check_format.py:128`). Diagnostics and inability do not become named successes. No concern found in these boundaries by inspection; real-tool compatibility remains unchecked below.
- `scripts/check_format.py:51`: both explicit-root and normal editor resolution must retain the adopted defaults. The actual nested/EditorConfig interpretation is simulated by the fixture, so this is adapter evidence rather than proof about the real library.
- C16: treating browser HTML/CSS as browser-view plus simulation is consistent with this map: browser simulation files run in the browser, while account-server CSS fixtures are not automatically browser code. No contrary authoritative requirement was found. `tests/quality/test_format_check.py:97` supplies controls for both browser parts.
- C17: I independently read D-32 and the formatter rule in the coding template. They require files to stand as the adopted formatter leaves them, and reject historic per-file exclusions. They do not impose the linters' separately stated prohibition of inline suppression directives. Passing every file through native Prettier while retaining its native inline-ignore behavior is therefore not a demonstrated spec violation. No general source-marker prohibition should be inferred here. Actual pinned-library behavior has not been exercised by this review or the author.

## Important — new thread, in F4 scope

### 1. Machine-local attributes can produce a pass without repository LF protection

**Anchor:** [scripts/check_format.py:78](C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/scripts/check_format.py:78). Related result check: [scripts/check_format.py:95](C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/scripts/check_format.py:95).

**Do wklejenia:** The LF check accepts attributes contributed only by `.git/info/attributes` or `core.attributesFile`, so it can record `prettier-source-format/1` as passed when the repository has no LF attributes for its covered files. In an isolated fixture, emptying `.gitattributes` correctly failed, but adding only a local or user attribute file changed the result to a named pass. Verify repository-provided LF attributes independently of local/global/system contributions, while still checking that effective local attributes do not override them, and retain regression tests for both masking cases.

**Dlaczego to zgłaszam:** This function exists to establish the cross-platform part of the invariant, rather than only to observe LF bytes on the current machine. D-32 specifically makes repository attributes the mechanism that preserves LF in another Windows checkout. The plain `git check-attr` invocation combines repository attributes with Git's other attribute sources and returns only final values; `_attributes` accepts those values without establishing that another clone receives them. For a concrete reproduction, keep a formatted `browser-view/good.ts` with LF, empty the scratch repository's `.gitattributes`, and put `*.ts text eol=lf` only in `.git/info/attributes`, or configure an external user attributes file containing that line. The adapter returns exit 0 with a named pass in both cases, even though a fresh clone does not receive either source and can check out CRLF with normal Windows conversion settings. The control with the same empty repository attributes and no masking source returns exit 1. This is an actual false success for a binding platform promise, so Important, not a coverage suggestion. No application runtime failure or irreversible effect is implied.

The focused probe uses the existing miniature formatter solely to let the complete adapter reach its real Git attribute boundary; it does not claim real Prettier acceptance. The result is independent of formatter parsing. Fix the provenance check without mutating user/global Git configuration or the product checkout; an isolated evaluation of repository-owned attribute files is one possible approach. Also retain the ordinary effective check so a local CRLF override cannot be ignored. Add positive controls and the two missing-provenance regression cases. Simply clearing `core.attributesFile` is insufficient because `.git/info/attributes` still has highest local precedence.

**Evidence:** Exact command `python -B .runs/task-cycles/coding-guidelines/reports/f4-review-attributes-probe.py`, actual process exit 0. Complete sanitized combined stdout/stderr and metadata: [probe output](f4-review-attributes-probe.txt), [command metadata](f4-review-attributes-probe.txt.json). Results: repository control adapter exit 0; missing-repository control exit 1; local-info masking exit 0; user-file masking exit 0. All temporary fixture repositories were cleaned through their fixture cleanup. Product files, index and Git configuration were not changed.

## Preserved author evidence and limitations

The evidence files and their adjacent `.txt.json` metadata were inspected; no suite was rerun. These are author runs, not reviewer-produced acceptance results. All paths below are under `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/`.

| Command | Actual exit | Complete output | Meaning |
|---|---:|---|---|
| `python -m unittest discover -s tests/quality -p test_format_check.py` | 1 | `f4-red.txt` | Expected initial RED: absent method, 11 tests / 23 assertion failures. |
| Same focused test command | 1 | `f4-green-first.txt` | Initial implementation did not reach successful checks; 11 tests / 19 failures. Retained, not presented as a pass. |
| Same focused test command | 0 | `f4-green.txt` | Initial GREEN: 11 tests. |
| `python -B scripts/check_format.py --record .runs/format.jsonl` | 2 | `f4-live.txt` | Exact manifest/lockfile pin absent; named invariant null. Actual product formatting remains unchecked. |
| Focused test command above | 1 | `f4-weakest-red.txt` | 12 tests / one failure; editor mismatch incorrectly passed. |
| Focused test command above | 0 | `f4-weakest-green.txt` | 12 tests pass after correction. |
| Focused test command above | 1 | `f4-utf8-red.txt` | 13 tests / one failure; unreadable UTF-8 incorrectly passed. |
| Focused test command above | 0 | `f4-final-green.txt` | 13 tests pass after correction. |
| `git diff --cached --check` | 0 | `f4-diffcheck.txt` | No staged whitespace errors. |

Unresolved acceptance work is not an additional F4 defect merely because dispatch intentionally forbids installation/configuration changes. The controller must retain all of it: real Prettier 3.9.10 API/default-metadata compatibility; genuine parser formatting and native inline-ignore behavior; genuine editor/nested config behavior; installed/configured actual product method; one-time complete-scope formatting; final guideline good/bad pairs; independently derived deliberate break and restoration; broad product/invariant suites and applicable foundation/guideline guards. None is passed by the 13 miniature-module fixture tests. Current `.gitattributes` only covers `deploy/**`, so the later configuration stage must supply repository LF rules as well as the exact pin and root configuration.

## Assessment

Spec compliance: Issues found — the cross-platform repository-attribute requirement is not established by the current method (`scripts/check_format.py:78`). Task quality: Needs fixes — one reproduced named false-pass path remains. Everything else inspected is consistent with the assigned scope, with real-tool integration and final acceptance explicitly unchecked rather than waived. No external comments, subagents, product edits or next-stage invocation were performed.
