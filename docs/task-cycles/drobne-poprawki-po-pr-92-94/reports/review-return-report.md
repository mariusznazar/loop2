PASS c4a9aaf5c58938eba4a9c2cdc90d63e84a39becf

# Review of the commits of the return step — task `drobne-poprawki-po-pr-92-94`

Range `a203324ddefffcd393a1b4eb2f6a819c727a2622..c4a9aaf5c58938eba4a9c2cdc90d63e84a39becf`, one commit
(`c4a9aaf5 docs: :memo: name in the verification of D-424 the tool that does not run, which the new
test case holds`), one file, `foundations/decisions.md`, one line (the *Verification* of D-424).
`git rev-parse HEAD` in the worktree is `c4a9aaf5c58938eba4a9c2cdc90d63e84a39becf`, the head given.

## Findings

- Critical: none.
- Important: none.
- Minor: none.

## What was judged

1. **The new clause says what a test holds.** The changed clause,
   `foundations/decisions.md:816`, now reads "an environment half made, at another version than the
   pinned one, or with a tool that does not run, made again before the first check". The added part
   is held by `tests/quality/test_quality_environment.py:103-108`
   (`test_a_tool_at_the_pinned_version_that_does_not_run_is_made_again`), which stands at a line
   `decision: D-424` and asserts that a scenario where ShellCheck is at the pinned version but its
   `--version` exits 1 runs `venv` once and `pip install` once. The code it holds is
   `tests/quality/quality_environment.py:90-92` (`problem` returns "%s does not run" when
   `--version` of a tool exits non-zero), and `ensure_quality_environment`
   (`tests/quality/quality_environment.py:119-127`) then makes the environment again. "Before the
   first check" is held by `tests/quality/test_quality_invariants.py:36-43` (`setUpClass` with its
   line `decision: D-424`), unchanged in this range.
2. **No over-claim.** The clause adds no part that no test holds: the mutation check below shows the
   case fails when the code stops treating a non-running tool as not ready. The added part sits
   within the binding sentences' "half made" as D-424's own *Rationale* reads it ("judged by the
   versions it holds and by whether each tool runs", `foundations/decisions.md:819`), so the clause
   names a part of the sentences and not a new rule.
3. **Template form.** The clause keeps the form `tests: <the parts of the sentences they hold, in
   words>` of `.the-way/elements/decisions/template.md:241-244`: no path, no test name, no number.
4. **The return step's claim that nothing else no longer matches**
   (`.runs/task-cycles/drobne-poprawki-po-pr-92-94/reports/return-step-report.md:5-30`), checked in
   one pass at the head:
   - D-423 (`foundations/decisions.md:9173-9185`) against `src/browser/sim/data/conditions.ts:100`
     (`defaultItem: "stick"`) and `src/browser/view/program-editor.ts:347-350` (the preferred item
     where offered, else `items[0]`): matches.
   - D-376 (`foundations/decisions.md:7820-7834`): states the numbers 8 and 1 and nothing of the
     item; matches `defaultValue: 8` at `src/browser/sim/data/conditions.ts:99`.
   - D-396 (`foundations/decisions.md:5218-5231`) and D-153 (`foundations/decisions.md:3194-3207`):
     *Based on* names facts the foundation holds (`foundation_check.py` reports a fact the
     foundation does not hold, and reported 0 errors); no code bears on them.
   - D-207 (`foundations/decisions.md:3764`): its binding sentences are untouched in the change;
     not re-read against the code (no change of code in this range reaches it).
   - Part map: `tests/quality/quality_environment.py` and `tests/quality/test_quality_environment.py`
     claimed by a part — `foundation_check.py` reports a file claimed by no part and reported 0 errors.
   No mismatch found.

## Declined to judge

none

## Checks run

- `python -B .the-way/elements/common/foundation_check.py` in the worktree at the head → `0 errors`,
  exit 0.
- `python -B -m unittest discover -s tests/quality -p test_quality_environment.py` at the head → 7
  tests, OK, exit 0.
- Mutation check in a working copy: the two files of `tests/quality/` copied to `.runs/review-return/`,
  the line `return "%s does not run" % name` in the copy of `quality_environment.py` replaced by
  `pass`, the copied tests run → `FAILED (failures=1)`, the failing case
  `test_a_tool_at_the_pinned_version_that_does_not_run_is_made_again` (`0 != 1` for the count of
  `venv`). The new clause's case fails when the behaviour it holds breaks.
- `git -C .the-way rev-parse HEAD` = `git ls-files --stage -- .the-way` =
  `bfb2e109735b5fff98802b8be0ff3c43c799262a`.
- Not run: the full gate (`npm test`) — the orchestrator's run, as the handoff gives;
  `check_instructions.py` — no instruction file or skill changed in the range.

## Reaches beyond the dispatch

- D-423, D-376, D-396, D-153 whole and the first lines of D-207, in `foundations/decisions.md` — to
  check the return step's claim that nothing else no longer matches, as the handoff asks.
- `src/browser/sim/data/conditions.ts` and `src/browser/view/program-editor.ts`, by search for
  `defaultItem` — the code D-423 and D-376 describe.
- `tests/quality/test_quality_invariants.py`, by search for `setUpClass` and `decision:` — the test
  that holds "before the first check" of the clause.

## Working copies

`.runs/review-return/` (copies of
the two files of `tests/quality/` for the mutation check) — removed before return; `Test-Path`
afterwards gave `False`, and `git status --short` was empty.

## Unread material

- D-207 was not read whole (its heading and binding sentences only); it is unchanged in this range
  and in the return step, and no code of the range reaches it.
- The two environment facts (`playwright-firefox-webkit-releases`,
  `loop2-app-log-confirmation-mail-events`) were not opened; they are unchanged in this range, and
  only their existence was checked, through `foundation_check.py`.
- `foundations/part_map.md` was not opened; the claim of the two files was checked through
  `foundation_check.py`.

## Searches not found or unclear

none
