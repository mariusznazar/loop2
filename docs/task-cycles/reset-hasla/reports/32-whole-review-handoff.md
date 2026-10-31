# Handoff — reviewer of the whole change, task `reset-hasla`

## Delegation and stage

The person who requested this cycle (the product's owner) delegated the cycle's intermediate
choices to the orchestrator of `implement-task`. You review the whole change, a fresh agent that
made none of it. Your questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\reset-hasla`, branch `task/reset-hasla`.
  Process pin `.the-way` at `a8dfe8a`, not moved by this task.
- Method: `.the-way/task-cycle/review/SKILL.md` (project skill `the-way-review-change`). Read it
  whole, and `whole_change.md` beside it when the step that names it comes. You select your own
  foundation and guidelines by the parts of the change.
- What is reviewed: the whole change, the range `95de83b..2e5d694`. Confirm `git rev-parse HEAD` first.
- Frozen task: `.runs/task-cycles/reset-hasla/task.md`, whole.
- Spec: `.runs/task-cycles/reset-hasla/spec.md`, reviewed, one revision.
- Plan: `.runs/task-cycles/reset-hasla/plan.md`. Size report beside it.
- Report path: `.runs/task-cycles/reset-hasla/reports/32-whole-review-report.md`; its first line is
  `PASS <sha>`, `FAIL <sha>` or `questions`. For each blocking finding name the slice it comes from
  by number and commit, or that it spans slices, or that it comes from none: a gap of the plan or the
  plan's *Foundation entries*.
- Do not change any file in the reviewed worktree. Do not run the product's gate (`npm test` with no
  argument); it is the orchestrator's. Focused checks in a separate worktree or export are yours. A
  fresh worktree has no `.runs/quality-venv`, so run the Ruff and ShellCheck cases here, read-only, or
  mark them not run.

## Answers of step 4

- Trust boundary: **yes**, `src/server/**`. Two new routes take data from the network without a
  session. Check crafted input at that boundary: token forms, origin and body guards, account
  enumeration through content or time, tokens and links never reaching logs, a link of another kind,
  a blocked account, a login in progress.
- Irreversible operation: **no**. The design has no schema step; check that the range adds none. No
  agent deploys, sends real mail through Outsider or changes anything on the server (D-12).

## Slices

| Slice | Range | Own review |
|---|---|---|
| Foundation entries | `95de83b..e8755e8`, with the fix `b9efe52` | judged with Slice 1: `PASS b9efe52`. Writer's report `06-foundation-report.md`, concerns 1 to 8 |
| 1 | `e8755e8..25345f1`, fix `b9efe52` | `FAIL 25345f1` then `PASS b9efe52`, reports 08, 10 |
| 2 | `b9efe52..0fdaffe`, fix `08df410` | `FAIL 0fdaffe` then `PASS 08df410`, reports 12, 14 |
| 3 | `08df410..0af565f`, fix `7b0a391` | `FAIL 0af565f` then `PASS 7b0a391`, reports 16, 18 |
| 4 | `7b0a391..aa9ff04` | `PASS aa9ff04`, report 20 |
| 5 | `aa9ff04..b966a74`, fix `8fe869d` | `FAIL b966a74` then `PASS 8fe869d`, reports 22, 24 |
| 6 | `8fe869d..5fcea3b` | `PASS 5fcea3b`, report 26 |
| 7 | `5fcea3b..c21a4a7` | none: judge it here. Executor's report `27-slice7-report.md` |
| 8 | `c21a4a7..931f578` | none: judge it here. Executor's report `28-slice8-report.md` |
| 9 | `931f578..34a7197` | none: judge it here. Executor's report `29-slice9-report.md` |
| 10 | `34a7197..f89bdbc` | none: judge it here. Executor's report `30-slice10-report.md` |
| 11 | `f89bdbc..2e5d694` | none: judge it here. Executor's report `31-slice11-report.md` |

All reports stand in `.runs/task-cycles/reset-hasla/reports/`.

Mismatches the mechanical checks passed on:

- Slice 9's *Change* names `src/browser/styles.css`; the slice did not change it.
- Slice 10 changed `src/browser/view/account-screen.ts` beyond its *Change*: the export of the
  sentence for the kitchen-sink page.
- Slice 11 changed the two copies of the deploy skill and four coding guideline files as the
  orchestrator's review of the plan added them (the record's choices A3, A4).

## Minor and out-of-scope findings of the slice reviews, to grade as findings of this review

- `08-slice1-review-report.md`: M-1 to M-4.
- `12-slice2-review-report.md`: Minor 2 and 3; its *Searches* item on D-100's wording.
- `14-slice2-fix-review-report.md`: the out-of-scope note.
- `16-slice3-review-report.md`: Minor 2 to 6.
- `20-slice4-review-report.md`: Minor 1 and the five lines of *Declined to judge*, which the report
  counts as out of scope.
- `22-slice5-review-report.md`: Minor 3 and 4, and the out-of-scope item on the shared limit.
- `26-slice6-review-report.md`: Minor and out-of-scope findings, five of each by its own count.

## Known from the reports

- Slice 11's report names a comment near `src/server/account-routes.ts:53` saying "the six small
  routes".
- The foundation writer's concern 3: `Method: test` on invariants written before their tests. Check
  that every such invariant now has a test citing it.
- H1, the delivery trial, is the human's and has not run. The rendered look of the one form in place
  of two has been seen by no agent. D-153 and task item 13 stay open on H1; do not count them as met
  by commits, and do not count their absence as a defect.

## Return

Write your report to its path as the method gives. Return its first line and the path.
