# F4 fix round 1 - repository LF attribute provenance

Status: author fix complete, stopped before independent re-review. The Important finding in `f4-review.md` was accepted and reproduced; no finding was dismissed. Only the two assigned files change. No product configuration, covered source, shared helper, foundation, installation, merge, push or deployment was changed.

## Inputs and selection

Start `eb94bd41d4ec2b4d222baf6bd4ea090551697a16`, task worktree `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`, branch `task/coding-guidelines`. Both pinned gitlink and the-way checkout remain `d829e3aa6242a9b8901274531dd82fd5c7d87628`. Read the whole fix handoff, operational contract, original F4 handoff, full F4 review, isolated reviewer probe source and its complete output. Authoritative D-32 and prettier-source-format/1 remain the unchanged whole-read sources from F4; the probe proves the implementation failed their repository-LF requirement. The finding requires no new policy meaning.

Guideline selection stays build-tools; both paths are assigned there. No guidelines exist yet, as the overall task is creating them. The prior whole-read part map, guideline reading procedure, coding template, D-28 deferral of building/test exemplars and source-scope interpretation remain applicable. There is no expansion, new kind, UI change or screenshot route. Screenshots remain unchecked because there is no intended visible change.

## Change and alternatives

The existing complete `check-attr` output parser is reused in `_attribute_values`. `_attributes` now requires two successful evaluations:

1. The ordinary effective Git attributes for this checkout must preserve LF. Local info/global rules therefore cannot override valid repository LF rules with CRLF and still pass.
2. A separate empty temporary bare Git directory evaluates the real current worktree's `.gitattributes` files using `--work-tree <root>` and `core.bare=false`. It has no product index and no product info/attributes. Its template is explicitly empty, all inherited `GIT_*` variables are removed, global/system configuration is directed to the null device, system attributes are disabled, and `core.attributesFile` is empty. This evaluation can receive LF policy only from current repository attribute files, including new nested files and unstaged edits. A local/global/system contribution cannot manufacture repository provenance.

Temporary state lives under the ignored task worktree `.runs/format-attributes-*` and is cleaned with its context manager. The real worktree, index, `.git/config`, user configuration and attribute source files are read but never edited by the method. No stash, checkout, index-writing command or attribute relocation is used.

The simpler alternative of clearing `core.attributesFile` leaves `.git/info/attributes` at higher precedence and does not fix the reproduced case. Copying or temporarily hiding attributes in the product Git directory would introduce writes and restoration hazards. Copying a hand-parsed attribute rule set into a custom matcher would duplicate Git semantics and could mishandle nested rules. The chosen approach costs one temporary Git initialization and a second attribute query per invocation, and uses Git's own current-worktree rule precedence while keeping metadata isolated.

The fixture's root-only part-map pattern became `/.gitattributes`, because a bare `.gitattributes` Git pattern also matches nested paths and made the new nested fixture ambiguously owned by both foundation and browser-view. That initial fixture problem is retained in the first RED output and was corrected before production code. No product map or shared discovery semantics were changed; any real new nested file must still have unambiguous ownership under the product's current map.

## TDD and exact evidence

All paths below are relative to `.runs/task-cycles/coding-guidelines/reports/`. Each `.txt` is complete sanitized combined stdout/stderr; its adjacent `.txt.json` stores the exact command, actual child exit and duration. Outputs contain no secrets or customer/user records.

| Exact command | Actual exit | Complete output | Meaning |
|---|---:|---|---|
| `python -m unittest discover -s tests/quality -p test_format_check.py` | 1 | `f4-fix1-red.txt` | 17 tests; local/global masking gave false pass, plus one fixture ownership error in nested case. |
| `python -m unittest discover -s tests/quality -p test_format_check.py` | 1 | `f4-fix1-red-confirmed.txt` | Corrected fixture: exactly two expected failures, local/global mask returned 0 instead of 1. Repository positive, missing-policy negative, local CRLF override and current nested edits controls behave as intended. |
| `python -m unittest discover -s tests/quality -p test_format_check.py` | 0 | `f4-fix1-green.txt` | 17 tests pass after provenance isolation. |
| `python -m unittest discover -s tests/quality -p test_format_check.py` | 0 | `f4-fix1-final-green.txt` | Final 17 tests pass with additional byte-preservation/configuration/temporary-cleanup assertions. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f4-review-attributes-probe.py` | 0 | `f4-fix1-probe.txt` | Same independent probe now yields adapter codes: repository 0, absent 1, local-info 1, global-file 1. |
| `python -B scripts/check_format.py --record .runs/format.jsonl` | 2 | `f4-fix1-live.txt` | Genuine product no-verdict retained: exact Prettier manifest/lock pin absent; invariant null. |
| `git diff --cached --check` | 0 | `f4-fix1-diffcheck.txt` | No whitespace errors. |

One uncaptured short diagnostic recreated the initial nested fixture and printed its record, identifying ambiguous `.gitattributes` ownership; its same failure is present in f4-fix1-red.txt. The corrected fixture's behavior is captured in all subsequent runs. Only affected focused checks were run; broad/application suites were intentionally not rerun.

## Weakest point and self-review

Most likely missed requirement: evaluating current worktree rules rather than the staged index or only root attributes. The added fixture stages CRLF in a nested attribute file, changes its working tree value to LF, empties root attributes and proves a pass from the current nested rule. It then adds a new untracked deeper attribute file with `-text` and a formatted new source, proving a failure from the new override. The fixture compares the real fixture index and Git config bytes before and after both results, verifies attribute contents and checks that temporary Git directories are gone. It proves current nested precedence, index/config preservation and cleanup, not arbitrary future ownership assignments.

Read the complete actual diff for self-review. The parser's existing completeness, duplicate and schema validation remain intact. Both effective and repository-only evaluations run before the combined result. Raw LF, source scope, default configuration, version and record behavior are unchanged. Independent reviewer probe results now directly contradict the formerly reproduced false-pass path. Inherited Git configuration cannot leak into the isolated run because its Git environment is cleared and both configuration sources and template are explicit. No real tool/configuration or covered source is installed/edited to obtain a pass.

Sharpness: this changes only build-tools gate mechanics and their fixtures. It makes no network request or irreversible product action. The trust boundary is external/local Git attributes turning into an assertion that another platform is protected. The important failure was a false successful gate; requiring repository provenance closes the demonstrated path while the retained effective query still catches local weakening. Isolated metadata is disposable ignored state, not product state.

## Remaining unchecked work

- Actual Prettier 3.9.10 parsing, option-metadata compatibility, EditorConfig/nested configuration semantics and full source-format compliance remain unchecked until the later authorized exact pin/install/configuration/reformatting stage. The live command still gives no named verdict.
- Current repository LF rules for all covered paths are still owed by the later configuration stage. This round intentionally does not create them.
- Native inline-ignore handling remains the pinned formatter's behavior, as the independent review found no contrary prohibition. No additional directive ban was introduced.
- No broad product/invariant suite or guideline/foundation guard is claimed passed by this fix; there are no foundation or guideline edits. No UI/screenshot validation applies. Independent re-review is the controller's next action.

## Files and commit

`scripts/check_format.py`: +32/-5. `tests/quality/test_format_check.py`: +40/-1. Only these explicit paths were staged; report/evidence stays ignored. Range: `eb94bd41d4ec2b4d222baf6bd4ea090551697a16..e0a4699be13e0e9efef4eefc1de6f3bd584d115c`. Commit `e0a4699be13e0e9efef4eefc1de6f3bd584d115c` uses the expected private author address; post-commit working tree is clean. Author stops before re-review.
