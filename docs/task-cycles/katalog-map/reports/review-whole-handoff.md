# Handoff - reviewer of the whole change, task `katalog-map`

You review the whole change of a planned task cycle of the-way as an agent that made none of it. The person who requested the
cycle has delegated intermediate choices to the orchestrator; nothing you are told is the human's approval. Questions go to the
orchestrator, never to the human. You are read-only on the product: no tracked file changes, no commit.

- Worktree (work from its root): `the task's worktree`, branch `task/katalog-map`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole, and `.the-way/task-cycle/review/whole_change.md`, which it
  sends you to. You select your own foundation and guidelines (by "Reading the foundation" in `.the-way/elements/common/way_of_working.md`
  and `.the-way/product-guidelines/reading.md`), write the index of your decisions with the script it names and state how many
  decisions you read whole. Your directory for working copies: `.runs/review-whole/`.
- Range: base `97936c245cecfc11778fcf3d10feb075436d17fc` to head `cf6be29e` (compute `git diff 97936c24..cf6be29e` and `git log`
  yourself; confirm `git rev-parse HEAD`). 51 files, 18 commits. No move of the process pin; no spec.
- Frozen task (read whole): `.runs/task-cycles/katalog-map/task.md`. Plan (read whole): `.runs/task-cycles/katalog-map/plan.md` - its last
  section holds the orchestrator's answers and additions, which the executors were bound by.
- Trust boundary: yes, as the plan says - `src/browser/view/judging-cache.ts` (lasting storage; Slice 7 had its own review) and new
  files under `assets/sprites/**` and `assets/icons/**` (Slices 1 and 2 had their own reviews). Irreversible operation: none.
- The full gate is not run by agents. You may run focused checks and run the check of the product's instruction files as whole_change.md
  says (`python -B .the-way/instruction-files/check_instructions.py` from the root; see `.the-way/installation/README.md`); a warning there is a
  finding. `python -B .the-way/elements/common/foundation_check.py` is allowed (it exited 0 on the head before the last slice and the
  last slice's author reports 0).
- Report path: `.runs/task-cycles/katalog-map/reports/review-whole-report.md` (the report file is the input of the cycle's scripts, the case
  Claude Code's refusal of files named `report...` leaves open). First line `PASS <sha>` or `FAIL <sha>` (or `questions`). Name for each
  blocking finding the slice it comes from (number and commit), or that it comes from none/spans slices; list each Minor finding with its
  place in the code and its own words, and say where one lies outside the task. State the number of decisions you read whole, the checks with
  commands and exit codes, **Unread material** and **Searches not found or unclear**. Return the first line, the checks, the report path.
- `cycle.md` and the handoffs/reports not named here are not yours to read.

## The slices and their ranges (in the plan's order), and who judged each

| Slice | Range | Reviewed on its own? | Executor report (read the ones of slices with no review of their own) |
|---|---|---|---|
| Foundation entries | `97936c24..612476a6`, plus `23d8c7bb` (fact of the bear icon's title, in Slice 2's range) | no — judged by you | `.runs/task-cycles/katalog-map/reports/foundation-report.md` (with its addition section) |
| 1 bear's pictures | `612476a6..a0949dec` | yes, PASS (`review-1-report.md`) | `executor-1-report.md` |
| 2 bear creature, icon | `a0949dec..5766c306` | yes, PASS (`review-2-report.md`) | `executor-2-report.md` |
| 2b name after "z" | `5766c306..b41798ba` | no | `executor-2b-report.md` |
| 3 region, two maps, measurement | `b41798ba..e0342c5d` | no | `executor-3-report.md` |
| 4 bear in the scene | `e0342c5d..ce585649` | no | `executor-4-report.md` |
| 5 overlay, tests, skill | `ce585649..351845ad` | no | `executor-5-report.md` |
| 6 judging reports damage | `351845ad..6b3d86a8` | no | `executor-6-report.md` |
| 7 record in the cache | `6b3d86a8..3e3c38a8` | yes, PASS (`review-7-report.md`) | `executor-7-report.md` |
| 8 catalog pure lines | `3e3c38a8..bf37e4ca` | no | `executor-8-report.md` |
| 9 catalog component | `bf37e4ca..eed49524` | no | `executor-9-report.md` |
| 10 catalog look | `eed49524..00b772a0` | no | `executor-10-report.md` |
| 11 number at Matecznik | `00b772a0..8ae831a9` | no | `executor-11-report.md` |
| 12 styleguide section | `8ae831a9..cf6be29e` | no | `executor-12-report.md` |

(All report paths are in `.runs/task-cycles/katalog-map/reports/`.) Mechanical checks the orchestrator passed on with mismatches: Slice 2
(`tests/invariants/test_icon_credits.py` added to its files), Slice 3 (`tests/invariants/test_content_identifiers.py`), Slice 4
(`scene-picture.ts`, `scene.tsx`, `scene.test.mjs` beyond the plan's list; a per-creature `sink` of the bear's drawing, plan Q-03 in the
orchestrator's answers), Slice 6 (`tests/sim/saved-game.test.mjs`), Slice 9 (end-window and account-screen tests), Slice 11
(`maps-screen.css` one rule, one line in `tests/view/maps-screen.test.mjs`). Settled by the orchestrator's autonomous choices, which you
judge too: the plan's departure from the styleguide's order of work; classes of models (`cheaper` executors ran on haiku; Slice 11 was raised
to `same`; Slice 10 on `strongest`).

## Minor findings of the slice reviews (to grade as findings of this review)

From `review-7-report.md` (Slice 7, PASS): M1 - the record is left in storage at a refused write; D-441's sentence on removal names the
judging's triple only; the reviewer recommends a one-clause amendment of D-441 (the cycle's return step will decide); M2 - a hand-written `-0`
or `2.4e1` reads as a number, as the judgings' reading does (`src/browser/view/judging-cache.ts`); M3 (outside the slice) - the trust-boundary
row of `guidelines/testing.md` for `judging-cache.ts` does not name the new test file `tests/view/judging-cache-record.test.mjs`.
Slice reviews 1 and 2 had none.

## Gaps the orchestrator carries to you (read the executors' Unread material)

- Executor 5 (haiku) did not read `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/coding-balance-instrument.md` nor the decisions and
  invariants of its *Read* before editing `tests/balance/overlay.test.mjs` and the skill (both copies). Check them against those guidelines. One
  sentence in the skill's timing line may state the history of a measurement ("92 seconds in the measurement of this change, with the tests
  running beside it"): judge it against `.runs`-free state-not-history conventions of the product's guidelines for skills/instruction files.
- Executors 8 and 9 (haiku, then same) wrote `catalog-lines.ts` and `map-catalog.tsx` before their tests (a mutation check stands in for a first
  failing run); the module takes optional data parameters for tests; the old game's "counted" rule was assumed to equal loop2's `countedName`.
- Executor 6: no test covers a fight cut off by the completion (the executor found no reference program that completes inside a fight); D-440
  names no cut-off case.
- Executor 10: the card on the right of the screen Mapy reads better in the old Loop (outside the task's *To do*; the acceptance criterion is
  judged by the human on the screenshots); the fold row is dim and disabled while a search or a pick holds a group open.
- Executor 11: the preposition „ze" in „niedźwiedź: {n} ze {zdrowie}" is fixed; the number stands in the rows of „Dokąd" and „Postęp" and on the card,
  not in „Co daje"; no reference program takes exactly 24 of the bear's health.
- Foundation entries: D-448 and D-449 (new decisions) have *Rationale* from the task's Q5, Q6 and *Context* and *Rejected* `unknown`, marked
  `the cycle's`; D-04 and the part map's `browser-view` sentence were also corrected as `the cycle's`; D-136's rationale still holds the sentence
  removed from D-18 (task 9 writes D-136). Check the entries against the task's quoted wording in *Decisions in play*, *Settlements to record* and To do 7.
- `balance/progression.mjs` keeps `SOLVABLE_SHARE = 20` and a `solvable` flag, as the plan's *Choices* allow; the skill no longer reads that share.
- To do 8's screenshots: made by Slices 4, 10 and 11 and pushed (D-418, D-419) to the repository `mariusznazar/screenshots`, branch
  `loop2/katalog-map`; their links are in the executors' reports. You may open the images at those links if you can; judging the acceptance
  criterion is the human's, not yours.
## Working copies (the first paragraph of the cycle's rule, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.
