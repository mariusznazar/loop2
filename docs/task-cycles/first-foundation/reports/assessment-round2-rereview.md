# Assessment correction scoped re-review

**Spec compliance: approved. Task quality: approved.**

Range: `daecde3b54f4a80cd23a4883f81d3c145775ff95..26661cd6a934a797062d096d856feec4548caffb`. The one-line fix at `tests/invariants/test_public_file_boundary.py:57` changes canonical-root equality to canonical path containment. This is the entire reviewed product diff.

## Important finding — ADDRESSED

The previously rejected valid static mount at `dist/public/assets` now passes. Both the observed path and the expected public root are resolved before `is_relative_to` compares them. This permits the public root itself and its descendants, without admitting ancestors or siblings by textual-prefix coincidence. No additional product behavior or foundation rule was introduced.

Independently reran the reviewer-authored harness from the preceding review; all mutations stayed in disposable copies beneath ignored `.runs/task-cycles/first-foundation/review-round2/`. No product files were edited.

| Command mode | Independent application evidence | Focused test outcome |
|---|---|---|
| `subdirectory` | Build exit 0; `/assets/probe.txt` returned HTTP 200 and the exact synthetic public asset bytes | GREEN: one test, zero failures, zero errors. This also executes the original public-page/script and outside-file HTTP probes with the additional valid mount. |
| `leak` | Build exit 0; `/leak/package.json` returned HTTP 200 and exactly the repository manifest bytes | RED: one test, one assertion failure at line 57, zero errors. The change still rejects the repository-root static mount. |

Commands: `python -B .runs/task-cycles/first-foundation/review-round2/check.py subdirectory` and the same command with `leak`. The harness captures expected failed unittest results and exits normally; the test outcomes above come from unittest, not the harness exit status.

Full logs: `.runs/task-cycles/first-foundation/review-round2/subdirectory-26661cd.log` and `leak-26661cd.log`. The old leak log was retained as `leak-daecde3.log`. The reusable harness overwrites its unsuffixed logs; consequently the preceding report's original subdirectory RED outcome is preserved in that report and the tool transcript, while the current unsuffixed subdirectory log reflects this GREEN rerun.

## Scope and remaining limits

No new regression found in this one-line correction. The earlier report's instrumentation limits remain: observation occurs during built-app import/createApp, not arbitrary future serving architectures or internal symlinks. The compiler checks and their deliberate-break evidence were not rerun because this commit does not touch them. No full suite, foundation guards or whole-branch review was run in this scoped re-review.

HEAD matched the requested immutable head; `git status --short` remained empty. No product edits or commits. Port 3000 is released after the experiments.
