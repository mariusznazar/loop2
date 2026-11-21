# Handoff — the executor of slice 9, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `387cd8ca`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 9 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-9/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-c1-09-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- Quotations of decisions in tests: every comment line `// decision: D-n "…"` of a test you write or change must quote, word for word and from the beginning of a sentence, text that stands in a binding sentence of that decision as it stands now (`foundations/decisions.md`; a quotation is no paraphrase). Run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after your change and your files must show no error; errors in files you did not change are not yours . Slices 3 and 4 shipped such errors; do not repeat it.
- This is the work of **correction 1** of the open request (the human's remarks, `reports/correction-1-remarks.md`, answered by the reviewed spec `spec.md`; the plan's slices are yours; the first run's plan no longer binds). The foundation step of the correction writes the plan's *Foundation entries* before slice 1: read what it wrote where your *Read* names it. A test that quotes a decision by a comment line `decision:` quotes it word for word from the beginning of a sentence of a binding sentence of the entry as it stands (the foundation check stops at the first field line of an entry); where a decision's sentence the correction changed was quoted by a test your slice changes, the quotation follows the new wording.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- the plan's *Foundation entries* row 1, as the foundation step wrote it — find it in `foundations/` by its heading: (new) — Where does the game keep the last judging of each character, program and map? (the judgings remembered in the browser's lasting storage, one entry per triple under the account and the game; the kinds of the twelve results, the equipment, the program's content revision and the character's gen
- the plan's *Foundation entries* row 3, as the foundation step wrote it — find it in `foundations/` by its heading: D-440 — What does the game remember of a judging, and what stands beside the list „Program:”?
- the plan's *Foundation entries* row 6, as the foundation step wrote it — find it in `foundations/` by its heading: D-165 — How does the game state tell one program from another? (the judging the browser remembers names its program by its number; and the content revision, if the foundation step places it here)
- `foundations/decisions.md:6243-6275` D-190 (plan: 6218-6249)
- `foundations/decisions.md:671-715` D-213 (plan: 659-702)
- `foundations/invariants.md:1048-1056` save-version
- `foundations/invariants.md:226-234` simulation-inputs
- `foundations/invariants.md:1078-1086` death-settled-once
- `guidelines/coding.md`
- `guidelines/coding-simulation-module.md`
- `guidelines/coding-saved-game.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 126-136 (spec: Decision 6 (simulation))

### 6. Where the code lives

Simulation (`src/browser/sim/`, pure, no storage, held by `simulation-isolation` and `simulation-inputs`):

- **S1 — the content revision of a saved program**: a field of `SavedProgram` (Decision 2), 0 in `newGame`, `createProgram`, `saveCopyAsNewProgram` and `appendPrograms`, raised by one in `withProgramSaved` where `sameData` finds the groups or the trip plan different, kept as it is by `renameProgram` and every other function that copies a saved program. `withProgramSaved` goes back to giving the list of programs alone (as before `3218a620`, when its callers used `withProgramContent`), now with the revision raised; its callers take the list as before slice 7. The save writes the field; the strict load reads it as a safe integer from 0, the item of the list holding exactly `id`, `name`, `program` and the revision, built from new values (`guidelines/coding-saved-game.md`, „Ścisłe wczytanie”); nothing compares it with anything at the load. The previous-save reader (`previous-programs.ts`) reads an item of a document of version 9 or above only where its keys are exactly `id`, `name`, `program` and the revision, and one of a version from 1 to 8 only where they are exactly `id`, `name` and `program`; the revision's value, like `id`'s, is neither read nor checked, since the pull makes a new program of revision 0.
- **S2 — the record of a judging**: takes the game state the judging read, the triple and the judging, gives what the cache stores — the kinds of the twelve results, the equipment, the content revision of the triple's program in that state, the character's generation in that state. It replaces `rememberedOf`.
- **S3 — the mark**: takes the game state, the triple and a record or none, gives the mark beside „Program:” — the count solved, all twelve, the note on the stock (less of an item in the chest than the record took), the badge — or none where no record is given or it does not stand (Decision 2). It replaces today's `judgingMark`, whose result type `JudgingMark` stays.
- **The act of a judging**: gives the judging and its record, made from the one state it read, and leaves the game state as it was (the very state). It replaces `judgeAndRemember`; whether it still answers as a `GameResult` is the maker's.
- **The moment the game was made**: a field of `GameState`, given to the function that makes a new game, written by the save and read by the load (Decision 3).
- **Goes away**: `GameState.judgings`; the types `RememberedJudging` and `RememberedJudgings`; `withRememberedJudging`, `judgingsWithoutProgram`, `judgingsWithoutCharacter`, `judgingsAfterSave`, `judgingsAfterDeath`; the judgings half of `withProgramSaved`; the removal of judgings in `deleteProgram`; the erasing in `settleDeath` and in `takeEnd`; the reading and writing of `judgings` in `saved-game.ts` (`rememberedJudging`, `rememberedJudgings`, `"judgings"` among the game's keys, and the seed kinds there if nothing else reads them). Of the five places slice 7 hooked for a change of content, the four that write content now raise the revision through `withProgramSaved`, and the deletion needs nothing (D-165); of the two places hooked for a death, both need nothing (the generation grows there already). The death functions and `deleteProgram` go back to what they did before `3218a620`, keeping every other change made since.
- **Stays**: `judgeOnSeeds`, the types `SeedResult` and `Judging`, the mark's meaning, the loop record.

### lines 37-37 (spec: Constraints)

- Every place the simulation writes content into a listed program goes through `withProgramSaved` (`src/browser/sim/programs.ts:391-403`): `editProgram`, `saveCopyIntoProgram`, `setProgram` (`game.ts:426-445`) and the first-chill write of `advanceMinutes` (`game.ts:880-895`, D-123); `withProgramContent` is called nowhere else (slice 7 report, own-work check). New programs are made by `newGame`, `createProgram`, `saveCopyAsNewProgram` and `appendPrograms` (D-401), each with a new number. `sameData` (`programs.ts:311`) compares plain data by keys and values whatever the order the keys were made in.

### lines 45-45 (spec: Constraints)

- The code of the first run this correction rebuilds came from commits `bae893e2` („hold the last judging of each character, program and map in the game state, … and write and read it strictly in the saved game … (D-440, D-206, D-213)”) and `3218a620` („… erase the remembered judgings where a save makes the rules, groups or trip plan of a program different, where a program is deleted and where a death takes a character's practice and ranks, in a manual map run, an earning loop and the catch-up alike (D-440, D-439, D-165, D-190, D-123)”). Their reason is D-440's first sentence, „The saved game state holds the last judging of each character, program and map”, from *To do* 6 of the task („Gra pamięta w zapisie…”), which the human's remark 1 replaces.

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

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

## Notes of the orchestrator for this slice

- Slices 1–8 of the correction are made: the judgings are remembered in the browser (the cache module and the screen use it; D-441), the game state's `madeAtMs` and the programs' content revision exist; **everything of the first run that remembered judgings in the game state is still there and unused**, and your slice removes it: `RememberedJudging` and its field in `GameState` (`types.ts`), its initialisation in `newGame` and the erasing hooks of the first run in `game.ts`, `programs.ts` and `loop.ts` (the erasing at the four content writes — now the content revision is raised there instead, keep that; the erasing at deleting a program and at the two death settlements — remove; the cache needs none), the first run's act/`judgeAndRemember`/old mark functions in `judging.ts` / `judging-record.ts` that nothing calls now (keep `judgeOnSeeds`, `recordOfJudging`, `markOfRecord`, `judgeAndRecord` and the validity), and the reading and writing of `judgings` in `saved-game.ts` (the document of version 9 holds no judging: a document that carries the key is refused as `shape` like any foreign key — the strict load's rule). Remove the first run's test file `tests/sim/saved-game-judgings.test.mjs` (git rm) and its line in `stryker.config.json` (and any listing of it in the test selection); change `tests/sim/judging-record.test.mjs` and the other test files only where they test the removed code (delete those cases; keep the cases of the new record, mark and validity). Search the whole repository (`git grep` for `judgings`, `RememberedJudging`, `judgeAndRemember`, `withProgramSaved`'s erasing calls, `rememberedJudging`) for every remaining reader: the screens (view) and the balance instrument must not use the removed things — report what you find.
- Trust boundary: this slice changes `src/browser/sim/saved-game.ts` (a trust boundary): the strict load stays strict and the game's own saves load into the same state; the first run's crafted-document cases for judgings go with the file; add the one case that matters here: a document of version 9 that carries a `judgings` key (or a loop with a foreign key) is refused as `shape`, no throw (in `tests/sim/saved-game.test.mjs`'s ownership: Slice 10 rewrites that file's document and holds the direct refusal case; to avoid doing the same twice, write your refusal check in the file you change (`tests/sim/judging-record.test.mjs`? no: put it where the plan's *Change* lets you) — say in the report where it stands and Slice 10 will not duplicate it).
- `tests/sim/saved-game.test.mjs` will fail between this slice and Slice 10 where its document still holds the first run's judgings (say how many cases); Slice 10 rewrites the document. Do not edit that file here.
- Quote every `// decision:` line word for word from the beginning of a sentence of a binding sentence; the foundation check should show **no error at all** after your slice (the file with the last five errors is removed). No full gate; focused checks as named; ESLint, Prettier, typecheck, size rules (the size of `game.ts` D-425).

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
