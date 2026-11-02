PASS 2bfd6b6ee3a7fed8cd99cf544c41d07b031ee5d2

# Review of the fix of I1 to I4 — task `logowanie-w-react`

Range `c033758..2bfd6b6`, one commit, four files: `foundations/decisions.md`, `foundations/environment_facts.md`, `tests/invariants/test_browser_view_framework.py`, `tests/invariants/test_icon_credits.py`. Bounded by `reports/return-review-findings.md`, as `.the-way/task-cycle/review/fix.md` gives. `git rev-parse HEAD` is the head given, and the reviewed worktree stayed clean. Crafted runs took place in a separate worktree of 2bfd6b6, removed afterwards.

Counts: 0 blocking, 2 Minor, 0 out of scope. Invariant tests changed in this range: `test_browser_view_framework.py` by code, `test_icon_credits.py` by its docstring alone; `fix-2.md` names both for the request.

## Findings of the review

| Finding | State | Contested |
|---|---|---|
| I1 | **fixed** | no |
| I2 | **fixed** | no |
| I3 | **closed by the route the finding named**, on the condition below | no |
| I4 | **fixed** | no |

### I1 — fixed

The docstring's sentence equals the entry `icon-credits` word for word, whitespace aside, read by a script from both files. `:19-20` now says the card is held by D-27 and `tests/view/account-screen.test.mjs`, not by this check, which agrees with *Does NOT cover* at `:53`. A search of the file finds no „login card's section” and no „no card does so yet”. The five tests pass; nothing but the docstring changed.

### I2 — fixed

The defect was that D-270's own violating example passed the guard. It no longer does.

| Tree | Exit | Result |
|---|---|---|
| The tree as it stands | 0 | passes, so nothing the tree needs is refused |
| Dev lock entry with a peer on `react`, written by hand, imported by `src/browser/zz-temp.tsx` | 1 | refused by the source case, `('src/browser/zz-temp.tsx', '@mui/material/Button')`; the same tree exited 0 at c033758 |
| `@mui/material@7.0.0` in a lock npm wrote with `--save-dev`, its entry `dev` with a peer on `react`, imported the same way | 1 | refused by the source case |
| The dev entry written by hand, imported by nothing | 0 | passes, which is what D-270 says: such a package stands neither in the code nor in the runtime dependencies |
| The condition put back, the control alone | 1 | the new assertion holds the fix |

The code, the docstring at `:17-21`, `react_libraries` at `:138` and D-270's sentence and second violating example now give one class. *Does NOT cover* needs no word: it names the one limit left, a library with no peer on `react`. The real lock holds one entry of any mark with a peer on `react`, `react-dom`, which is excepted.

### I3 — closed by the route the finding named

**Judgment.** Holding D-270 under *Questions* of a request opened as a blocked draft is what the finding asked and what `.the-way/task-cycle/skill/foundation_step.md` and `.the-way/task-cycle/skill/SKILL.md:414` give, and it asks no change of code. WAY-30 fits: the entry stays proposed on the branch and the merge waits for the human. `fix-2.md:38` takes back the two places of `reports/return.md` that sent it elsewhere.

**The text.** `fix-2.md:42-50` holds the question, both ways, each with its cost, and a recommendation, as `SKILL.md:414` asks. Each claim of it checks against the code and the runs but one, see N1, and that one changes neither way's cost.

**The condition.** No request exists yet: `gh pr list --state all --head task/logowanie-w-react` gives `[]`, while the same command without `--head` finds #51 of another branch. So I judged the route and the text, not a request. Nothing on the head can show more, as the request opens after this review. It closes when the draft stands marked `blocked` with D-270 under *Questions* and not among what the request settles; the first line of this report counts it so.

### I4 — fixed

`npm-lock-peer-dependencies` stands in `foundations/environment_facts.md`, named by D-270's *Based on*. All 5 passages found in `workspaces/arborist/lib/shrinkwrap.js` at `v12.2.1`, and `metaFromNode` is the place they stand at (`:251`, `:260-263`). The sentence says no more than that code: `metaFieldFromPkg` returns the field from the package's own data and skips it only when empty. The extra passages over the two I named are right, since the list alone does not show that a key reaches an entry.

Beyond the fact, the control I left to the fix's choice was taken: `test_control_the_lock_holds_the_field_the_library_check_reads`, on the real lock. With the peer taken out of `node_modules/react-dom` in a copy of the lock: exit 1, `'react' not found in {}`. So a silent loss of the field now fails. *Rests on* of `browser-view-framework` stays `none`, as the template gives for a fact that is a reason for a decision.

## What the fix itself broke

Nothing Critical or Important. The fix adds a test case and changes one condition; the file's 9 tests, the 5 of `icon-credits` and the 5 of quality pass. `refused_names` and its callers read as their docstrings say. `runtime_names` keeps its own `dev` reading, so a dev entry is still no runtime dependency, and the line of `test_control_…` that says so still holds.

## Minor notes

None reopens the review.

**N1. One sentence of the question overstates what the guard refuses, since I2.** `fix-2.md:44`: „oblewa każdy pakiet, który w pliku blokady deklaruje, że współpracuje z zainstalowanym obok Reactem”. A dev package imported by nothing passes (row 4 of I2's table), and D-270 allows it. The human could read it as refusing test tools too. Worth correcting before the draft opens: „każdy taki pakiet, który jest zależnością uruchomieniową albo który importuje kod gry”. In the same passage, „wpis D-270” stands with no word on what it is; the human has not seen that number, so one clause saying it is the new decision this request adds helps.

**N2. The docstring's new sentence at `tests/invariants/test_browser_view_framework.py:17-21` reads hard.** „nor is a library built on React …, neither as a runtime dependency, which an entry marked `dev` is not, nor as an import” stacks three negatives. It is accurate. Polish only.

## Declined to judge

- M1 to M6 of `reports/return-review.md`: Minor, not fixed by design, and the findings file bounds this review.
- `reports/return.md` still holding the claims `fix-2.md` replaces: a report, left as written, and `fix-2.md:38` names the places.
- The recommendation of way 1 in the question: the human's to weigh; I judged that it is stated with its cost.

## Checks

| Command | Exit | Result |
|---|---:|---|
| `python -B .the-way/elements/common/foundation_check.py`, in the reviewed worktree | 0 | `0 errors` |
| `python -B <scratchpad>/check_fix.py`: the docstring's sentence against the entry; each passage of the fact in the file downloaded from its address | 0 | equal; 5 of 5 |
| `python -B -m unittest test_browser_view_framework.NoUiFramework.test_no_ui_framework_in_runtime_dependencies test_browser_view_framework.NoUiFramework.test_browser_source_imports_no_ui_framework`, from `tests/invariants` of the separate worktree, on the trees of I2's table | as in the table | |
| `npm install --package-lock-only --ignore-scripts --save-dev --save-exact @mui/material@7.0.0` | 0 | the lock for I2's third row |
| `python -B -m unittest test_browser_view_framework.NoUiFramework.test_control_the_dependency_check_reads_what_an_entry_really_is`, the condition put back | 1 | the control fails, as it must |
| `python -B -m unittest test_browser_view_framework.NoUiFramework.test_control_the_lock_holds_the_field_the_library_check_reads`, the peer taken out of a copy of the lock | 1 | the control fails, as it must |
| `npm test -- tests/invariants/test_browser_view_framework.py` | 0 | 9 tests |
| `npm test -- tests/invariants/test_icon_credits.py` | 0 | 5 tests |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | 5 tests, with a link to the worktree's `.runs/quality-venv`, removed after |
| `gh pr list --state all --head task/logowanie-w-react --json number,title,state,isDraft,url` | 0 | `[]`, see I3 |
| `gh pr list --state all --limit 1 --json number,headRefName` | 0 | #51, the control of the line above |
| `git status --short` in the reviewed worktree, after the runs | 0 | empty |

### Did not run

- `npm test` without arguments and the whole gate: forbidden by the dispatch, the orchestrator's run.
- H1, with mail: the human's.
- Any test on jsdom, and so the cases of `tests/view/account-screen.test.mjs` that `:19-20` of the docstring names: the fix touches none, and nothing here loaded an imitation.
- A build with `@mui/material` really installed: the lock was written with `--package-lock-only`, so that esbuild carries a dev dependency into the bundle stays reasoned, not seen.
- The state of the draft request: it does not exist yet.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| `.the-way/task-cycle/review/fix.md` | whole | the variant the dispatch names |
| `.the-way/task-cycle/skill/SKILL.md:414`, `.the-way/task-cycle/skill/foundation_step.md`, WAY-30 | read in my last review | what I3's closure needs |
| `workspaces/arborist/lib/shrinkwrap.js` at `v12.2.1` | the copy downloaded for the review of c033758, same address and date as the fact's | I4 |
| The public npm registry | `npm install --package-lock-only`, package names and versions only | to test a real lock entry, not my hand-written one |
| GitHub, `gh pr list` | read only | whether the request stands |

## Searches not found or unclear

- **The draft request:** not found, as it opens after this review. See I3.
