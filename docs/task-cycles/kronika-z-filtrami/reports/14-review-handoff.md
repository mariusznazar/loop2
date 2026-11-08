# Handoff 14 — review of the whole change (stage: review-change, the whole change)

You review the whole change of one task of a the-way cycle, as an agent that made none of it. You are
read-only: you change no tracked file; you write only your report. You may run focused checks and the
product's checks that do not modify tracked files, as `review-change` and `whole_change.md` give.

## Where you work

- Worktree (work from its root): `the worktree root`, branch
  `task/kronika-z-filtrami`. Pinned the-way: `.the-way` at `294af7f`; use no personal skill of the same
  name without the `the-way-` prefix.
- Method: `.the-way/task-cycle/review/SKILL.md`; for the whole change read
  `.the-way/task-cycle/review/whole_change.md` and follow it. You select your own foundation entries
  and guidelines, by "Reading the foundation" in `.the-way/elements/common/way_of_working.md` and by
  `.the-way/product-guidelines/reading.md`, each whole.
- Range to review: base `6f36c7ab998ceaf996afb617ca95881b3f007b2d` (the task's base, `main` after PR #65)
  to head `1880393` (check `git rev-parse HEAD` first; it must read `1880393…`). Compute the diff
  yourself: `git diff 6f36c7a..1880393` and `git log 6f36c7a..1880393`.
- Your report: `docs/task-cycles/kronika-z-filtrami/reports/14-review-report.md`; its first line is
  `PASS 1880393` or `FAIL 1880393`, as `review-change` gives.

## What is reviewed

- The frozen task, read whole: `docs/task-cycles/kronika-z-filtrami/task.md` (Polish, sha256 prefix
  cd12745e0f8566f7). Coverage of every To do item, every accepted row of *Settlements to record*
  (1, 2, 3, 4, 7, 8, 9, 10, 14), every projected entry the task carries and the acceptance
  criterion is yours to check, and source fidelity (the texts the task fixes, word for word).
- The reviewed spec: `docs/task-cycles/kronika-z-filtrami/spec.md` (the review of it passed after one
  revision; `spec-reviewed.md` beside it is the version before). The plan:
  `docs/task-cycles/kronika-z-filtrami/plan.md` (the orchestrator raised the *Model* of slices 1 and 4
  from `cheaper` to `same`; the plan's review is in `cycle.md`, which only the orchestrator reads).
- Step 4 answers: trust boundary no; irreversible operation no. No slice was marked with a risk, so
  **no slice had a review of its own: you judge every slice.**

## The slices of the planned route, each range and whether it had a review of its own

| Part | Range | Report | Review of its own |
|---|---|---|---|
| Foundation entries (F1–F19) | `6f36c7a..3ea46e8` | `reports/06-foundation-report.md` | no |
| Slice 1 — loss of the streak, simulation | `3ea46e8..734b2dd` | `reports/07-slice1-report.md` | no |
| Slice 2 — campfire going out, simulation | `734b2dd..6392714` | `reports/08-slice2-report.md` | no |
| Slice 3 — chronicle memory and composing of entries | `6392714..416c10d` | `reports/09-slice3-report.md` | no |
| Slice 4 — the game view records; hints of moves | `416c10d..5ed6c6b` | `reports/10-slice4-report.md` | no |
| Slice 5 — right area, tabs, list, paragraph out of the world area, browser check | `5ed6c6b..2b74988` | `reports/11-slice5-report.md` | no |
| Slice 6 — styleguide | `2b74988..2ca73e1` | `reports/12-slice6-report.md` | no |
| Slice 7 — coding guidelines' tables | `2ca73e1..1880393` | `reports/13-slice7-report.md` | no |

All reports live in `docs/task-cycles/kronika-z-filtrami/reports/`. Read each as a set of claims to
verify, not as evidence. Minor and out-of-scope findings of earlier reviews: none exist (no slice review
ran).

## What the orchestrator's mechanical checks passed on, as information for you

These are facts of the executors' own reports, each passed to the review that judges the slice
(they are not findings, and they bind you to nothing):

- Slice 4: the executor says it did not read `guidelines/styleguide-browser-view.md` and did not open
  one by one the foundation entries of its *Read*; its recording is in `take(result, copyAct?)`, which
  `store.apply` and `act` both call, while the spec's D2 says "in `store.apply`"; no permanent test
  of the recording through the game view stood in slice 4 (the game-view test is slice 5's).
- Slice 5: the executor names as beyond its *Change* `src/browser/view/chronicle.ts` (a `subscribe`
  was added), `tests/view/chronicle.test.mjs` and `tests/view/scene.test.mjs`; says it did not read
  whole many entries of its *Read* (D-39, D-40, D-43, D-44, D-46, D-75, D-88, D-122, D-130, D-132,
  D-147, D-185, D-212, D-216, D-254, D-255, D-265, D-267, D-283, D-331, D-334 and six invariants); the
  subscription test was written after the code and not seen failing; no test sees a row drawn again
  (`memo`); the grown window does not start anew at a send or "Restart" while the same filter stays
  picked, untested; the wolf attacks only on "Las — głębiej", so its attack screenshots are of a
  composed state; the table under „Teren" is cut at its right edge by a width and `overflow-x` that
  predate the slice.
- Slice 6: the executor says the plan's check `tests/invariants/test_browser_view_token_values.py`
  reads code, not the guideline.
- Slice 2: `world.ts` is in *Change* and unchanged (the finding sits in `minuteBeforePick`).
- The foundation agent changed D-19 (not in the plan, marked `the cycle's`) and D-185 and D-272
  (marked `the cycle's`); D-276 left unchanged; D-347 holds only the first sentence of the projected
  entry, the second being stated already by D-323 and D-253.

## The acceptance criterion

The task asks for a check in a real browser at 1× and 16× with screenshots attached to the request.
Slice 5's executor did it: 21 screenshots in `docs/task-cycles/kronika-z-filtrami/screenshots/`
(listed in `reports/11-slice5-report.md`, "Browser check"). Judge whether the report covers what the
criterion asks and look at the screenshots you need with an image reader. You do not repeat the
browser check unless a finding needs it.

## What the report holds

As `review-change` and `whole_change.md` give: the first line, graded findings (Critical, Important,
Minor), each with its place in the code, why it matters and, for a blocking finding, the slice it
comes from or that it comes from no slice (a gap of the plan, or the plan's *Foundation entries*);
which findings are outside the task's scope; the checks you ran, each with its command and exit
code; the coverage of every task item, settlement row and carried projected entry; source fidelity;
every reach beyond your own selection; and **Searches not found or unclear**. Do not run the product's
full gate (`npm test` with no file); the orchestrator runs it. Return the report's first line and its
path in one short message.
