PASS 145959e89453384e24868f48a188b4d24f258bdc

# Review of the return step — testy-padajace-losowo

Range: `f2253fc5..145959e8` (one commit, `145959e8`, one file `tests/flaky-tests.md`, 1 line changed, 1 insertion and 1 deletion). `git rev-parse HEAD` = `145959e89453384e24868f48a188b4d24f258bdc`, the head given. `.the-way` at `bfb2e109735b5fff98802b8be0ff3c43c799262a`, the commit the gitlink records. Working tree clean before and after the review.

## Findings

### Critical

none

### Important

none

### Minor

none

Counts: blocking 0, Minor 0, out of scope 0.

## What was checked, and what it showed

- **The correction is exact.** `tests/flaky-tests.md:6-7` now reads „Zasadę rejestru podaje `guidelines/testing.md`, reguła „Register of flaky tests”.” The heading in the guidelines is `### Register of flaky tests` (`guidelines/testing.md:314`), spelled the same, same case. The quotes are U+201E and U+201D (bytes `342 200 236` and `342 200 235`), the same pair the line used before and the register uses elsewhere (`tests/flaky-tests.md:17`); the file stays UTF-8 with LF line endings. The pointer leads to the rule that holds the register's sentence (`guidelines/testing.md:321-323`, *Decision* D-432), and *Flaky tests* (`guidelines/testing.md:304-312`) no longer mentions the register, so the old pointer was wrong and the new one is right.
- **„reguła” rather than „rozdział”.** The review of the fix (N-1, `reports/review-fix-report.md:59-65`) proposed „rozdział „Register of flaky tests””; the step wrote „reguła”. The heading stands under `## Rules` (`guidelines/testing.md:45`), so each `###` there is a rule, and the word is the more accurate one; the reader still finds the heading by its quoted name. No finding.
- **Polish prose, names verbatim.** The sentence stays Polish; the only English is the heading quoted verbatim, as D-432's register sentence and the task (point 3: names written word for word) allow. Nothing else in the file changed.
- **The return step's report holds the comparison it claims.** `reports/return-step-report.md` names each compared entry (D-432 whole, the two rules of the testing guidelines and *Where in code*, D-73, D-77, D-356, the part map of agent-workflow, deployment, account-server and product-foundation), what it showed and why nothing else changed, and names the one correction. I checked its verifiable claims:
  - D-432 (`foundations/decisions.md:1100-1113`): its sentence agrees with the rule `guidelines/testing.md:321-323` and with the register's opening (`tests/flaky-tests.md:3-6`). No test holds a part of its sentence (the register is prose; no test reads it), so the pair of examples stays whole and no `tests:` clause is due, as `.the-way/task-cycle/skill/return_step.md:16-18` gives.
  - `git diff main..145959e8 -- foundations/decisions.md` adds only D-432; D-73's list of departures is untouched by the change, as the task's *Decisions in play* requires.
  - The part map lists `tests/flaky-tests.md` among the files of agent-workflow (`foundations/part_map.md:148`).
  - The search for other places naming the chapter or the register: my own `git grep -n -i flaky` over the tracked files gives the same set the step lists (`foundations/decisions.md`, `foundations/part_map.md:148`, `guidelines/testing.md:304,314,322,470`, `tests/flaky-tests.md:7`, and the two unrelated „no flaky test” strings in `tests/view/memory-limit.mjs:22` and `tests/view/memory-limit.test.mjs:45`). No other pointer to the old chapter remains.
  - `check_instructions.py` reports `0 error, 145 warn, 7 info`, the same totals the step reports; none of its output names `tests/flaky-tests.md`.
  - The step writes no entry and defers none; the one row of *Settlements to record* is D-432, written earlier in the change. That fits `return_step.md:22-24`.
- **Against the guidelines.** `guidelines/testing.md` read whole. The range changes no test and no code; the rule it points to is the one D-432 adopts. No rule of the file is departed from.
- **Trust boundary, irreversible operation:** none touched, as the handoff says; the range is one line of prose.

## Declined to judge

- `tests/flaky-tests.md:5-6` „Wpis znika, gdy przyczyna się wyjaśni” compared with D-432's „it leaves the register in the change that explains the cause”: the step compared this and left it. I see no difference of meaning that a reader would act on, but the line lies outside this range and was reviewed with the whole change and its fix (`reports/review-whole-report.md`, `reports/review-fix-report.md`), so I make no finding on it.
- `guidelines/testing.md:10-11` (eleven departures of D-73, with D-422) against the task's quotation of D-73 with ten: outside the range and outside what the return step changed; the task's quotation predates D-422 and the guidelines line was not changed by this change.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`.
- `python -B .the-way/instruction-files/check_instructions.py` — exit 0, `0 error, 145 warn, 7 info`.
- Byte check of the corrected lines: `sed -n '6,7p' tests/flaky-tests.md | od -c` — showed U+201E / U+201D quotes and LF endings.
- `file tests/flaky-tests.md` at `145959e8` and at `f2253fc5` — both `Unicode text, UTF-8 text`.
- `git diff f2253fc5..145959e8 --stat` — 1 file, 1 insertion, 1 deletion.
- Not run: the product's full gate (`npm test`), by the handoff; it is the cycle's own run before the request.

## Reaches beyond the dispatch

- `foundations/decisions.md:1100-1113` (D-432 whole) — the entry the correction must agree with.
- `foundations/part_map.md`, the entry of agent-workflow (its sentence and the first lines of *Files*, up to line 148) — to confirm the register's file belongs to the part and the guidelines that apply to it.
- `guidelines/*.md`, the *Applies to* lines — to select the guidelines of agent-workflow.
- `reports/review-fix-report.md:59-65` (N-1) and the lines found by searching `Flaky tests` in `reports/review-whole-report.md` — to see what the correction was meant to fix.
- `git grep -n -i flaky` over the tracked files — to verify the step's search.

## Working copies

None made as a working copy. While running the foundation check I first redirected its standard error to `.runs/fc.err` in the reviewed worktree (an ignored path, but outside `.runs/review-return/`); I removed it at once with `rm -f`, and `git status --short` was empty afterwards. `.runs/review-return/` was not created.

## Unread material

- `guidelines/coding.md` (applies to agent-workflow) not read: the range changes no code, only one line of a prose register, so no rule of the coding guidelines reaches it.
- `foundations/part_map.md` read only for the agent-workflow entry, not whole.
- D-73, D-77 and D-356 read only as the task quotes them, not whole in `foundations/decisions.md`; the range does not touch them.
- `reports/review-whole-report.md` and `reports/review-fix-report.md` read only at the lines named above.

## Searches not found or unclear

none
