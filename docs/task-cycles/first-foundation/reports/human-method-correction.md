# Public file boundary Method correction

Input product head: `ce55c6cda70aea18f8f4ec647776abad45574058`; pinned the-way checkout and gitlink: `7cfeb4c2349b181d251d1a03cb2005b980acbe9e`. The frozen task is ready and independent. The reassessment demonstrated two ordinary outside-file responses for which the finite route probe returned green. The follow-up reproduced an outside-file response selected by an HTTP header on an enumerated literal route; that probe also returned green. A command Method therefore gave the broad sentence an unearned pass.

Product correction commit: `d366b8e` (`Use human assessment for public file boundary`).

## Settlement and scope

- The binding sentence of `public-file-boundary/1` is byte-for-byte unchanged. Its Method is now the path `foundations/public_file_boundary_assessment.md`, a supported human-assessed form under the pinned invariant template (WAY-61, WAY-63, WAY-83). The new assessment document names the commit, source/build/dependency/route closure and filesystem-to-response flows that the assessor must inspect, the finite checks to use as evidence, and the exact `foundations/human_verdicts.md` row to write only after an actual assessment.
- `tests/invariants/test_public_file_boundary.py` remains executable as supporting evidence. Its `# invariant: public-file-boundary/1` citation was removed because the pinned `run_tests.py` records `pass` for every passing cited test without considering that invariant's Method. The test's assertions and observed routes were not changed. Prior independent deliberate breaks of extra static roots and direct outside `sendFile` failed this same assertion body (see `final-code-review-post-assessment.md` and `assessment-public-fix-2.md`); no new passing claim is drawn from those samples.
- Interpretation of the frozen task's “test and deliberate break” clause: the finite test and its breaks remain, while the broad foundation result now requires a human verdict. The cost is recurring human assessment for serving changes, and this request cannot claim a `pass` for the broad invariant before one is recorded. No verdict was invented here.

## Verification

| Check | Exit | Result |
|---|---:|---|
| Invariants format guard, `--base` and `--merge-onto` `44294da228ab8c27dfd1683f931f59f8d7f8d29d` | 0 | 0 errors, 0 warnings, 0 unchecked; note: no `human_verdicts.md` |
| `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/human-method-invariant-tests.jsonl` | 0 | 34 tests passed in 67.957s; 35 pass records, 0 fail, 0 null, **0 rows for `public-file-boundary/1`** |
| `npm test` | 0 | 5 tests passed, 0 failed |
| Part-map format guard, `--base` above | 0 | 0 errors, 0 warnings, 1 unchecked dependency graph (no product command) |
| Decisions format guard, `--base` and `--merge-onto` above | 1 | 3 errors and 3 warnings, all existing `merge of <request link>` placeholders pending PR URL; 0 unchecked |
| `git diff --check` | 0 | clean |

The pinned the-way checkout has `gate/run_tests.py`, which runs cited tests, but no all-Method gate program. `gate/method_script.py` explicitly states that running methods and reporting their results are the gate's work and that gate does not exist yet. Consequently no actual gate command reported this path Method as `unchecked`. Under the pinned invariant template's result rule, a path Method without an in-force human verdict is **unchecked**; the runnable format guard only validates its form. This distinction must remain visible in the PR.

Line endings of the existing invariants file remain CRLF in the worktree; the single Method line is the only change in that file. The existing test remains LF in the worktree.
