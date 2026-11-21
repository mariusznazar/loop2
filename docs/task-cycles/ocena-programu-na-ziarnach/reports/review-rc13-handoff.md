# Handoff — review `rc13`, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Questions go to the orchestrator, never to the human.

## What is reviewed

- Worktree: `.` (branch `task/ocena-programu-na-ziarnach`); you are read-only there and make no commit. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`). Read it whole, and a file it names only when the step or variant that names the file comes.
- Review: a group of the cycle's slices, in the plan's order — slice(s) 3. **Range to review: `bc386205..aaef0873`** (base exclusive, head inclusive; head `aaef0873`). Check the head with `git rev-parse` first; on a mismatch ask the orchestrator which range to review.
- The change is a member of a plan; the plan's sections for what you review are copied below word for word, and the passages of the frozen task that those sections' *Read* name (the frozen task is `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; open it if a passage points you to more). You judge the work against those passages and the foundation entries the sections name, not against the plan's wording.
- Two answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; check crafted input at that boundary wherever the range touches it (say so in the report if the range does not). Irreversible operation **no**: confirm that the change only prepares what it prepares.
- Executors' and writer's reports (each in `.runs/task-cycles/ocena-programu-na-ziarnach/reports/`): `slice-c1-03-executor-report.md`. Read each; they hold the own-work checks, reaches, concerns and unread material. A check an author reports is evidence of what the author ran, never of the result.
- Mechanical checks the orchestrator ran: clean worktree, non-empty range, changed files equal the slices' *Change*. Any mismatch is given below under notes.
- No agent of the cycle runs the product's full gate; **you do not run `npm test` without a file argument or the whole `tests/`**. Run the focused checks of the slices you review, and probes of your own, from a worktree of the head commit in your own directory.
- Your directory for working copies: `.runs/review-rc13/` (directly under the ignored `.runs/` of the worktree) — make a detached worktree of `aaef0873` there (`git worktree add --detach .runs/review-rc13/wt aaef0873`), run `npm ci` in it if you run Node tests, and run checks there, not in the cycle's worktree (another agent may be writing there). Remove it before you return, as the paragraph below gives.
- Your report path (its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/review-rc13-report.md`; its first line is `PASS aaef0873` or `FAIL aaef0873` (or `questions`).
- `cycle.md` and the other files of the record directory not named above are not yours to read.
- Settle each blocking finding's contradiction mark, and for the range's slices the slice it comes from, as `review-change` gives.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Passages of the frozen task


## The plan's sections for what you review (word for word)

### Slice 3 — the reader of a previous save knows the revision, and the guideline names no highest version

- **Goal:** the previous-save reader `src/browser/sim/previous-programs.ts` (trust boundary
  `previous-save-programs-reader`) reads an item of a document of version 9 or above only where its
  keys are exactly `id`, `name`, `program` and the content revision Slice 1 named, and one of a
  version from 1 to 8 only where they are exactly `id`, `name` and `program`; the revision's value,
  like the id's, is neither read nor checked, since the pull makes a new program of revision 0
  (`appendPrograms`, Slice 1); every other item is skipped and named, and the reading still throws for
  no value a document can hold (D-401 as the Foundation entries changed it, the changed invariant).
  The failing cases come first in `tests/sim/previous-programs.test.mjs`: a version-9 document's
  programs read with their revision key and pulled at revision 0; an item of a version-9 document
  without the revision key, and one of a version from 1 to 8 with it, skipped and named; the case
  „an item with a key besides id, name and program is skipped and named, and the others go on”
  follows the changed invariant. The title of the case that today reads „a document of each version
  from 1 to 9, the current one included, gives its programs in order, a program without a trip plan
  skipped and named” names no highest version number, so that it does not go stale at the next raise
  (remark 4, `reports/correction-1-remarks.md:6`), and what the case checks stays. In
  `guidelines/testing.md`, rule „Trust boundaries”, the row of `src/browser/sim/previous-programs.ts`
  (line 177 at the base) names the renamed case and the new cases by their titles, with no highest
  version number, written as `.the-way/product-guidelines/testing/template.md` gives the rule. The
  lines `decision:` of `tests/sim/previous-programs.test.mjs` and `tests/view/previous-save.test.mjs`
  that quote D-401's sentence on the keys of an item follow its new wording; nothing else of
  `tests/view/previous-save.test.mjs` changes.
- **Change:** `src/browser/sim/previous-programs.ts` · `tests/sim/previous-programs.test.mjs` ·
  `tests/view/previous-save.test.mjs` · `guidelines/testing.md`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/reports/correction-1-remarks.md:6-6`
  remark 4 · `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:130-130` Decision 6 (S1) ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:173-173` Decision 10 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:179-183` Decision 11 · Foundation entries
  row 2 · Foundation entries row 7 · Foundation entries row 9 · `foundations/invariants.md:1048-1056`
  save-version · `foundations/part_map.md:33-64` simulation ·
  `.the-way/product-guidelines/testing/template.md:180-200` · `guidelines/coding.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/AGENTS.md` · `src/browser/sim/types.ts:85-100`
- **Model:** same — the slice changes a reader at a trust boundary and its direct refusal cases.
- **Risk:** trust boundary — `src/browser/sim/previous-programs.ts`
- **Checks:** `npm test -- tests/sim/previous-programs.test.mjs` (the new cases written first,
  failing) · `npm test -- tests/view/previous-save.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `python -B .the-way/elements/common/foundation_check.py` (its report names no stale quotation of
  the two test files and no fault of `guidelines/testing.md`)
- **Depends on:** Slice 1 · Foundation entries row 7 · row 9

## Notes of the orchestrator

- A review in **correction 1** of the open request (the human's remarks `reports/correction-1-remarks.md`, the reviewed spec `spec.md` — read it whole, especially *Decisions* 2 and 11; the foundation entries of the correction written at commit `4d813606`: D-401 (changed: the keys of an item of a previous save and its *Rejected* clause), D-442 (new: the content revision of a program), the invariant `previous-save-programs-reader` (changed): read them whole).
- Slice 3 of the correction's plan (risk: trust boundary `src/browser/sim/previous-programs.ts`, the reader of the saved game of an account's previous save, which takes in a document from the server): attack it with crafted documents of every version it reads (your probes in your directory): version 9 items missing the revision, with a non-integer / negative / unsafe / string revision, with extra or foreign keys, `__proto__`; items of earlier versions with four keys (refused) and three keys (taken; the pulled program starting at revision 0); mixed items; wrong types; confirm each is refused as the reader refuses and none throws. Check the three lines `decision:` of `tests/sim/previous-programs.test.mjs` and the ones of `tests/view/previous-save.test.mjs` quote D-401's new key sentence word for word.
- Remark 4 (binding): the title of the trust-boundary case of `tests/sim/previous-programs.test.mjs` and the line of `guidelines/testing.md` (about 177) that names it must not name the highest version number, and they must stay equal to each other (the guideline names the case by its title): judge the new title and the guideline line, and whether a test that reads the guideline still agrees (search `tests/agent_workflow/` and `tests/invariants/` for readers of `guidelines/testing.md`).
- Unread material carried to you from the executor (read what bears on the range, the guidelines whole): `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/styleguide-browser-view.md` (a slice of `simulation` code and tests; the styleguide is not needed here — say if you disagree), `src/browser/AGENTS.md`, `foundations/part_map.md` simulation, the invariant `save-version`.
- `guidelines/testing.md` fails Prettier at the base too (noted by the executor); not a finding of the range. The foundation check shows errors owned by later slices (quotations in `tests/sim/judging-record.test.mjs`, `tests/sim/saved-game-judgings.test.mjs`) and an invariant with no test yet.
- Another executor (the fix of review `rc11`, slice 1) may be writing in the cycle's worktree while you review; you work in your own detached worktree of the head.
