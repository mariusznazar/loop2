PASS 50bb46a2ddb25bca8e3a7fd8cd6324ab25b8ece8

# Review of the merge of origin/main into task/testy-same-wlaczaja-dockera

Reviewed: merge commit `50bb46a2ddb25bca8e3a7fd8cd6324ab25b8ece8` (`git rev-parse HEAD` confirmed it). Parents: `33944bea` (reviewed task tree) and `fc00c406` (origin/main with #88). Merge base `1b0c8ad4466fdd6d067da7bbc27b10458d81012b`. Method: `review-change`, read-only.

Answer to the dispatch's question: yes, the two sides still hold together.

## Findings

### Critical
none

### Important
none

### Minor
none

## How the merge was judged

1. **The merge result is exactly main plus the task, nothing else.** I compared both directions.
   - `git diff fc00c406 50bb46a2` (what the merge adds to main) lists 18 files. They are the task's own files: `scripts/docker_gate.py`, `scripts/test.py`, `tests/quality/{docker_standin,gate_fixture,test_docker_gate}.py`, eight Docker test files, `guidelines/testing.md`, `foundations/{decisions,environment_facts,invariants,part_map}.md`.
   - `git diff 33944bea 50bb46a2` (what the merge adds to the task) lists 21 files. They are main's files: `src/browser/**`, `tests/view/**`, `tests/sim/**`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `foundations/decisions.md`, `foundations/invariants.md`.
   - The files both sides changed since the merge base are only `foundations/decisions.md` and `foundations/invariants.md`. No code, test or guideline file was changed by both sides, so there is no semantic overlap in code.
   - `foundations/environment_facts.md` is changed by the task only (6 lines) and was not named in the handoff; it is the task's own change and unaffected by main.
2. **`foundations/invariants.md`, entry by entry.** The two entries stand at the end of the list, before the table `Withdrawn identifiers` (lines 1308-1326):
   - `gate-docker-start-waits-once` (line 1308): statement, Method `test`, Rests on `none`, Derives from `D-390`, Part `build-tools · deployment`, Violated `no`. Whole, all six fields its own. The `Violated: no` line the cycle restored is there.
   - `loop-practice-payment` (line 1318): statement, Method `test`, Rests on `none`, Derives from `D-189 · D-241 · D-245 · D-246`, Part `simulation`, Violated `no`. Whole, identical to main's text.
   - Each is separated by one blank line; no conflict markers in the file (`grep` count 0). The added lines of the merge result against main (`gate-docker-start-waits-once` only) and against the task (`loop-practice-payment` only) are exactly the 10 lines of the other side's entry: the sets of changed lines of both diffs equal those of the side they came from.
3. **`foundations/decisions.md`.** No conflict markers. The lines the merge changed against main equal, line for line, the task's changes against the merge base (the same 53-line diff on both sides); the lines it changed against the task equal main's. So the automatic merge lost nothing of either side. Numbering: main added no decision heading (it edited seven existing decisions: D-39, D-44, D-189, D-207, D-241, D-245, D-246); the task added D-390, D-391, D-392 after D-389. No duplicate heading (`grep '^### D-' | sort | uniq -d` is empty); highest number D-392.
4. **Bearing of the merged foundation entries on build-tools, deployment, test-helpers.** `Scope` lines of the seven decisions main edited: D-39 browser-view, D-44 browser-view, D-189 simulation, D-207 browser-view, D-241 simulation, D-245 browser-view · simulation, D-246 browser-view · simulation. The one invariant main added, `loop-practice-payment`, has Part `simulation`. Main changed no part-map, glossary or environment-fact entry. None names build-tools, deployment or test-helpers, so none had to be read whole for the task's parts. This confirms the cycle's reading.
5. **Checks (below)** show the gate's own tests and the part-import invariant still pass on the merged tree and the foundation is consistent.
6. The one invariant that touches both sides' tests: `loop-practice-payment` is tagged in `tests/sim/loop.test.mjs` (main), `gate-docker-start-waits-once` in `tests/quality/test_docker_gate.py` (task). Each tag stays in its own file.

## Declined to judge

- The correctness of main's change to the browser view and simulation (`src/browser/**`, `tests/view/**`, `tests/sim/**`): reviewed and merged in request #88, not part of this question.
- The task's own change: reviewed earlier (whole change PASS, fix PASS, return step PASS); I did not review it again, only whether the merge altered it. It did not: the 18 files above equal the task's changes.

## Checks run

- `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors".
- `python -B scripts/test.py tests/invariants/test_cross_part_imports.py`: exit 0, 10 tests OK.
- `python -B scripts/test.py tests/quality/test_docker_gate.py`: exit 0, 11 tests OK (26.8 s).
- Diff-comparison checks (manual): `git diff` of the merge against each parent compared with the diff of that side against the merge base, for `foundations/decisions.md` and `foundations/invariants.md` (changed lines equal); a search for conflict markers (`<<<<<<<`, `>>>>>>>`, `=======`) in both files (0); a search for duplicate decision headings (none).

Checks not run:
- The full `npm test`, as the handoff forbids it.
- Main's Node tests (`tests/sim/loop.test.mjs`, `tests/view/away-report.test.mjs`) through `python -B scripts/test.py <file>`: I tried; the script stops at its build step with `KeyError: 'npm_execpath'` because it must be started by `npm`, not directly (exit 1; a way the script is built, not a defect of the merge). I did not start `npm`, which would build into the worktree. These tests belong to main's side and no file of them is touched by the task, so the merge cannot have changed them. Unverified by me.

## Reaches beyond the dispatch

- `git merge-base`, `git show 1b0c8ad4…:foundations/decisions.md`, `git show fc00c406:foundations/decisions.md`: to compute what each side changed since the common ancestor (the dispatch said to compute the conflict's resolution myself).
- `foundations/decisions.md` read by the line ranges main changed, with the Scope/Based on/Relations/Verification lines of each of those seven decisions, to check Scope. Not read whole: the seven decisions are about browser-view and simulation, outside the task's parts.
- `foundations/invariants.md` lines 1278-1335, to judge the two entries and the table that follows.

## Unread material

The review of a merge: no whole-change selection was made. Not read whole: the seven decisions main edited (read by their changed lines and metadata only, as they do not concern the task's parts); the two guidelines main changed (`guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`) and the sources of main's change — not read, they concern only the browser view; `foundations/environment_facts.md` and the task's own files — read only as diffs and only as far as needed to establish that the merge did not alter them.

## Searches not found or unclear

none
