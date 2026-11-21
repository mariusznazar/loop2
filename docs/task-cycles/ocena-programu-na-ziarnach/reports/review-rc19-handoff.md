# Handoff — review `rc19`, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Questions go to the orchestrator, never to the human.

## What is reviewed

- Worktree: `.` (branch `task/ocena-programu-na-ziarnach`); you are read-only there and make no commit. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`). Read it whole, and a file it names only when the step or variant that names the file comes.
- Review: a group of the cycle's slices, in the plan's order — slice(s) 9. **Range to review: `387cd8ca..3966b24e`** (base exclusive, head inclusive; head `3966b24e`). Check the head with `git rev-parse` first; on a mismatch ask the orchestrator which range to review.
- The change is a member of a plan; the plan's sections for what you review are copied below word for word, and the passages of the frozen task that those sections' *Read* name (the frozen task is `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; open it if a passage points you to more). You judge the work against those passages and the foundation entries the sections name, not against the plan's wording.
- Two answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; check crafted input at that boundary wherever the range touches it (say so in the report if the range does not). Irreversible operation **no**: confirm that the change only prepares what it prepares.
- Executors' and writer's reports (each in `.runs/task-cycles/ocena-programu-na-ziarnach/reports/`): `slice-c1-09-executor-report.md`. Read each; they hold the own-work checks, reaches, concerns and unread material. A check an author reports is evidence of what the author ran, never of the result.
- Mechanical checks the orchestrator ran: clean worktree, non-empty range, changed files equal the slices' *Change*. Any mismatch is given below under notes.
- No agent of the cycle runs the product's full gate; **you do not run `npm test` without a file argument or the whole `tests/`**. Run the focused checks of the slices you review, and probes of your own, from a worktree of the head commit in your own directory.
- Your directory for working copies: `.runs/review-rc19/` (directly under the ignored `.runs/` of the worktree) — make a detached worktree of `3966b24e` there (`git worktree add --detach .runs/review-rc19/wt 3966b24e`), run `npm ci` in it if you run Node tests, and run checks there, not in the cycle's worktree (another agent may be writing there). Remove it before you return, as the paragraph below gives.
- Your report path (its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/review-rc19-report.md`; its first line is `PASS 3966b24e` or `FAIL 3966b24e` (or `questions`).
- `cycle.md` and the other files of the record directory not named above are not yours to read.
- Settle each blocking finding's contradiction mark, and for the range's slices the slice it comes from, as `review-change` gives.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Passages of the frozen task


## The plan's sections for what you review (word for word)

### Slice 9 — the first run's remembered judgings leave the game state, the simulation and the save

- **Goal:** what commits `bae893e2` and `3218a620` added for judgings remembered in the game state
  goes, as spec Decision 6, „Goes away”, lists it: `GameState.judgings` and `judgings: {}` of `newGame`;
  the types `RememberedJudging` and `RememberedJudgings`; `rememberedOf`, `withRememberedJudging`, the
  first run's `judgingMark`, `judgingsWithoutProgram`, `judgingsWithoutCharacter`, `judgingsAfterSave`
  and `judgingsAfterDeath` of `judging-record.ts`; `judgeAndRemember` of `judging.ts`; the judgings half
  of `withProgramSaved`, which gives the list of programs alone again, its callers (`editProgram`,
  `saveCopyIntoProgram`, `setProgram`, the first-chill write of `advanceMinutes`) taking the list as
  before `3218a620`, the revision of Slice 1 kept; the removal of judgings in `deleteProgram`; the
  erasing in `settleDeath` and in `takeEnd` of `loop.ts`; and in `saved-game.ts` the reading of
  `judgings` (`rememberedJudging`, `rememberedJudgings`, `"judgings"` among the game's keys, and the
  seed kinds there if nothing else reads them). The death functions and `deleteProgram` go back to
  what they did before `3218a620` (`git show 3218a620`), keeping every other change made since; the
  record, the mark and the act of Slice 4 stay. `tests/sim/saved-game-judgings.test.mjs` loses its
  reason and goes, with its entry in `stryker.config.json`; the cases of
  `tests/sim/judging-record.test.mjs` that cover what goes are removed, with remark 1 of the human as
  their reason, and those of Slice 4 stay. No file of the view still reads what goes (Slices 6 and 7
  took it out); a search of `src/` and `tests/` for each removed name finds none outside
  `tests/sim/saved-game.test.mjs`. `tests/sim/saved-game.test.mjs` turns red here, since its document
  holds `judgings`: do not change or run it; Slice 10, made next, rewrites it.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/game.ts` · `src/browser/sim/programs.ts`
  · `src/browser/sim/loop.ts` · `src/browser/sim/judging.ts` · `src/browser/sim/judging-record.ts` ·
  `src/browser/sim/saved-game.ts` · `tests/sim/judging-record.test.mjs` ·
  `tests/sim/saved-game-judgings.test.mjs` · `stryker.config.json`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:126-136` Decision 6 (simulation) ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:37-37` Constraints ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:45-45` Constraints · Foundation entries row 1
  · Foundation entries row 3 · Foundation entries row 6 · `foundations/decisions.md:6218-6249` D-190 ·
  `foundations/decisions.md:659-702` D-213 ·
  `foundations/invariants.md:1048-1056` save-version · `foundations/invariants.md:226-234`
  simulation-inputs · `foundations/invariants.md:1078-1086` death-settled-once ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — removal across five files of the simulation and the strict load, which must give
  back the behaviour from before `3218a620` while keeping every later change.
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/judging-record.test.mjs` · `npm test -- tests/sim/judging.test.mjs`
  · `npm test -- tests/sim/content-revision.test.mjs` · `npm test -- tests/sim/program-list.test.mjs`
  · `npm test -- tests/sim/copy.test.mjs` · `npm test -- tests/sim/copy-actions.test.mjs` ·
  `npm test -- tests/sim/death.test.mjs` · `npm test -- tests/sim/loop.test.mjs` ·
  `npm test -- tests/sim/catch-up.test.mjs` · `npm test -- tests/sim/loop-record.test.mjs` ·
  `npm test -- tests/view/maps-screen.test.mjs` ·
  `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_saved_program_edit.py` ·
  `npm test -- tests/invariants/test_copy_save.py`
- **Depends on:** Slice 1 · Slice 4 · Slice 6 · Slice 7 · Slice 8 · Foundation entries row 1 · row 3

## Notes of the orchestrator

- A review in **correction 1** of the open request (the human's remarks `reports/correction-1-remarks.md`; the reviewed spec `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md` — read it whole, *Decisions* 2 and 6; the foundation entries of the correction at `4d813606`: D-441, D-442, D-440, D-386, D-206, D-165: read the ones your range realizes whole).
- Slice 9 of the correction's plan (risk: trust boundary `src/browser/sim/saved-game.ts`): the first run's remembered judgings leave the game state, the simulation and the save (the judgings now live only in the browser's cache). Judge: nothing else of the strict load changed (diff `saved-game.ts` line by line); the game's own saves load into the same state; a document of version 9 that carries a `judgings` key or a foreign key is refused as `shape` without a throw (the executor's refusal case lives in `tests/sim/judging-record.test.mjs` — run it against the code before the slice by a mutation to see it fail, and mutate the key list of the strict load to see it catch the key); **every place the first run erased a judging is gone or replaced** — the four content writes still raise the content revision (the executor removed `withProgramSaved` and made the four callers call `withProgramContent`, which holds the revision raise: verify no content write of a listed program misses the raise, that nothing was lost at the copy's save, `setProgram`, `editProgram`, and the first-chill rule), the two death settlements and the deleting of a program need nothing; nothing in `src`, `tests`, `scripts` or `balance` reads a removed name (`git grep` for `judgings`, `RememberedJudging`, `judgeAndRemember`, `rememberedJudging`, `withProgramSaved`); the cases of the new record, mark and validity (Slice 4) and of the content revision (Slice 1) still stand; the size of `game.ts` (D-425, ESLint size rules) holds.
- Unread material carried to you from the executor: it did not read the foundation entries or the guideline files whole; it worked from the handoff's copied passages and `git show` of `bae893e2` and `3218a620`. Read the guidelines of the part whole (`guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-saved-game.md`, `guidelines/testing.md`) and judge the range against them.
- `tests/sim/saved-game.test.mjs` fails (21 of 45 cases, the executor says, in a throw-away copy) until Slice 10 rewrites its document: expected, not a finding; the foundation check should show no error at all (the file that carried the last five errors is removed).
- The executor's note: the plan and the spec name `withProgramSaved`; the reviewer may judge whether the removal of that name (its work moved into `withProgramContent`) is a departure that matters (a name in a decision or a guideline?) — search `foundations/` and `guidelines/` for `withProgramSaved`.
