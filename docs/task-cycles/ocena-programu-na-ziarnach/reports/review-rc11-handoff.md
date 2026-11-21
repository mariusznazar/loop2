# Handoff — review `rc11`, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Questions go to the orchestrator, never to the human.

## What is reviewed

- Worktree: `.` (branch `task/ocena-programu-na-ziarnach`); you are read-only there and make no commit. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`). Read it whole, and a file it names only when the step or variant that names the file comes.
- Review: a group of the cycle's slices, in the plan's order — slice(s) 1. **Range to review: `4d813606..730863c3`** (base exclusive, head inclusive; head `730863c3`). Check the head with `git rev-parse` first; on a mismatch ask the orchestrator which range to review.
- The change is a member of a plan; the plan's sections for what you review are copied below word for word, and the passages of the frozen task that those sections' *Read* name (the frozen task is `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; open it if a passage points you to more). You judge the work against those passages and the foundation entries the sections name, not against the plan's wording.
- Two answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; check crafted input at that boundary wherever the range touches it (say so in the report if the range does not). Irreversible operation **no**: confirm that the change only prepares what it prepares.
- Executors' and writer's reports (each in `.runs/task-cycles/ocena-programu-na-ziarnach/reports/`): `slice-c1-01-executor-report.md`. Read each; they hold the own-work checks, reaches, concerns and unread material. A check an author reports is evidence of what the author ran, never of the result.
- Mechanical checks the orchestrator ran: clean worktree, non-empty range, changed files equal the slices' *Change*. Any mismatch is given below under notes.
- No agent of the cycle runs the product's full gate; **you do not run `npm test` without a file argument or the whole `tests/`**. Run the focused checks of the slices you review, and probes of your own, from a worktree of the head commit in your own directory.
- Your directory for working copies: `.runs/review-rc11/` (directly under the ignored `.runs/` of the worktree) — make a detached worktree of `730863c3` there (`git worktree add --detach .runs/review-rc11/wt 730863c3`), run `npm ci` in it if you run Node tests, and run checks there, not in the cycle's worktree (another agent may be writing there). Remove it before you return, as the paragraph below gives.
- Your report path (its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/review-rc11-report.md`; its first line is `PASS 730863c3` or `FAIL 730863c3` (or `questions`).
- `cycle.md` and the other files of the record directory not named above are not yours to read.
- Settle each blocking finding's contradiction mark, and for the range's slices the slice it comes from, as `review-change` gives.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Passages of the frozen task


## The plan's sections for what you review (word for word)

### Slice 1 — a content revision for each saved program and the moment the game was made, in the simulation and its load

- **Goal:** each program of the player's list carries a content revision, a whole number from 0, as
  a field of the saved program (`SavedProgram` in `types.ts`) beside its number, name and content, not
  of the content (`Program`), named apart from the revision of a save of D-209 (the name is yours,
  e.g. `contentRevision`). It is 0 for the first program of `newGame`, for a program `createProgram`
  makes, for a copy `saveCopyAsNewProgram` saves as new and for each program `appendPrograms` appends
  (D-401). It rises by one in `withProgramSaved` of `programs.ts` — the one function every write of
  content into a listed program passes through, so `editProgram`, `saveCopyIntoProgram`, `setProgram`
  of `game.ts` and the first-chill rule of `advanceMinutes` (D-123) raise it with no code of their
  own — at a save after which the program's rule groups with their order or its trip plan differ
  from before, compared as plain data by `sameData` of `programs.ts` (so the order in which an
  object's keys were made changes nothing), the counters `nextGroupId` and `nextRuleId` left out; it
  never rises at a rename, at a save that changes none of them, at a pick, a switch, a send, a
  deletion of another program or the start of an earning loop, and `renameProgram` and every other
  function that copies a saved program keep it as it is. `withProgramSaved` keeps giving the programs
  and the first run's judgings as today (Slice 9 takes the judgings out). The game state also holds
  the real moment the game was made (a field of `GameState`, name yours, e.g. `madeAtMs`):
  `newGame` takes it as an optional argument and stores it, 0 where none is given (the tests and the
  balance instrument; the page passes the clock's reading in Slice 8); no function of the simulation
  reads it or reads a clock (D-04, `simulation-isolation`). The save writes both fields, and the
  strict load of `saved-game.ts` (`guidelines/coding-saved-game.md`, „Ścisłe wczytanie”) reads an
  item of the list as exactly `id`, `name`, `program` and the revision, the revision a safe integer
  from 0, and the moment as a safe integer of any sign compared with no clock (D-386), built from new
  values; nothing at the load compares the revision with anything. The version is not raised: it is
  9 and not deployed (spec Goal 1). The failing tests come first, in a new file
  `tests/sim/content-revision.test.mjs`, which `stryker.config.json` lists: the cases of spec
  Decision 10, first item — 0 for each made program; one rise for an edit, a save of the copy into
  its program and `setProgram` that change a rule, add or remove one, swap two rules or two groups,
  change a group's condition or change the take or bring list; one rise for the first-chill rule;
  two for A→B→A; none for a rename, an edit or a save of the copy that changes none of the three (also
  with the keys of the objects made in another order), a change of the identity counters alone and a
  deletion of another program — and a new game holding the moment it is made with. The cases of
  `tests/sim/program-list.test.mjs`, `tests/sim/copy.test.mjs` and `tests/sim/copy-actions.test.mjs`
  that expect a saved program as exactly a number, a name and a content follow with the revision,
  with this change as their reason (`guidelines/testing.md`, „Changing an existing test”); a trial on
  the base found these cases: copy-actions.test.mjs:213, copy.test.mjs:62 and :241,
  program-list.test.mjs:89, :264, :510 and :527. A line `decision:` of these files that quotes a
  passage of D-165 or D-386 the Foundation entries changed follows the new passage.
  `tests/sim/saved-game.test.mjs` turns red here, since its document of version 9 lacks the two
  fields: do not change or run it; Slice 2, made next, rewrites it.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/programs.ts` · `src/browser/sim/game.ts` ·
  `src/browser/sim/saved-game.ts` · `tests/sim/content-revision.test.mjs` ·
  `tests/sim/program-list.test.mjs` · `tests/sim/copy.test.mjs` · `tests/sim/copy-actions.test.mjs` ·
  `stryker.config.json`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:11-28` Goals and non-goals ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:66-107` Decisions 2 and 3 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:126-136` Decision 6 (simulation) ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:170-172` Decision 10 ·
  Foundation entries row 2 · Foundation entries row 4 · Foundation entries row 5 · Foundation
  entries row 6 · Foundation entries row 12 · `foundations/decisions.md:7533-7571` D-123 ·
  `foundations/decisions.md:659-702` D-213 ·
  `foundations/invariants.md:1048-1056` save-version · `foundations/invariants.md:214-224`
  simulation-isolation · `foundations/invariants.md:226-234` simulation-inputs ·
  `foundations/invariants.md:858-866` saved-program-edit · `foundations/glossary.md:25-30` program ·
  `foundations/glossary.md:180-184` copy · `foundations/part_map.md:33-64` simulation ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
- **Model:** same — the content revision is the core of the correction's check, and the slice
  changes the strict load at a trust boundary.
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/content-revision.test.mjs` (written first, failing) ·
  `npm test -- tests/sim/program-list.test.mjs` · `npm test -- tests/sim/copy.test.mjs` ·
  `npm test -- tests/sim/copy-actions.test.mjs` · `npm test -- tests/sim/death.test.mjs` ·
  `npm test -- tests/sim/loop.test.mjs` · `npm test -- tests/sim/catch-up.test.mjs` ·
  `npm test -- tests/sim/loop-record.test.mjs` · `npm test -- tests/sim/discovery.test.mjs` ·
  `npm test -- tests/sim/previous-programs.test.mjs` ·
  `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/invariants/test_saved_program_edit.py` ·
  `npm test -- tests/invariants/test_copy_save.py`
- **Depends on:** Foundation entries row 2 · row 4 · row 5 · row 6

## Notes of the orchestrator

- This is a review in **correction 1** of the open request: the human's remarks (`reports/correction-1-remarks.md`) answered by the reviewed spec (`.runs/task-cycles/ocena-programu-na-ziarnach/spec.md` — read it whole, with its *Decisions* 1–11) and the plan's slice (copied below). The entries the foundation step wrote for the correction (commit `4d813606`): D-441, D-442 (new), D-440, D-04, D-386, D-165, D-401, D-206, D-287 (changed), the invariants `previous-save-programs-reader` (changed) and `judging-cache-reading` (new), the glossary term `content revision`: read the ones your range realizes whole (D-442, D-386, D-165, D-04, D-441, the invariant `save-version`).
- Review of slice 1 of the correction's plan (risk: trust boundary `src/browser/sim/saved-game.ts`): the content revision of each saved program and the moment the game was made, in the simulation and in the strict load. Attack the load with crafted documents of version 9 (your own probes in your directory): a program item with the revision missing, null, a string, negative, a float, `NaN`-like, beyond the safe integers, as `__proto__`/extra keys; the moment missing, null, a string, an infinite or non-finite value, a very large or negative moment (D-386 gives the moment „of any sign” — read the exact sentence), an extra key; refused as `shape` without a throw; the game's own saves loading to the same state, the revision and the moment surviving a save and a load. Judge that the revision rises exactly where the spec says (in `withProgramSaved`, at every change of rules, groups with their order or plan of the trip, via `editProgram`, `saveCopyIntoProgram`, `setProgram` and the first-chill rule — verify there is no other place the simulation writes content into a listed program) and never at a rename, that new programs (first of a new game, „Nowy program”, a copy saved as new, a pulled previous-save program) start at 0, and that `newGame` keeps a default moment.
- The executor reports the previous-save reader (`src/browser/sim/previous-programs.ts`) left as it was (outside this slice; Slice 3 changes it) and that load tests for both fields stand in `tests/sim/content-revision.test.mjs` (Slice 2 may fold them): not findings unless the range breaks something. `tests/sim/saved-game.test.mjs` is red by design until Slice 2 rewrites it; the foundation check shows quotation errors owned by later slices and an invariant with no test yet (`judging-cache-reading`, Slice 5).
- Quote check: every `// decision:` line the range adds quotes word for word from the beginning of a sentence of a binding sentence (the executor corrected two in `730863c3`).
