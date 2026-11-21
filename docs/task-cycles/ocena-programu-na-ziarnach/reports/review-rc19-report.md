PASS 3966b24e

# Review rc19 — slice 9 of correction 1, task `ocena-programu-na-ziarnach`

- Range: `387cd8ca..3966b24e` (one commit, `3966b24e`); `git rev-parse HEAD` in the cycle's worktree gave `3966b24e1c548582c25d3bd713661298f74c26ea`, the head given. Pinned the-way `19e5774a` in the worktree and in the review copy.
- Method: `.the-way/task-cycle/review/SKILL.md` (review-change) and `task-cycle/review/fix.md` (review of a correction).
- Changed files equal the slice's *Change*: `src/browser/sim/{types,game,programs,loop,judging,judging-record,saved-game}.ts`, `tests/sim/judging-record.test.mjs`, `tests/sim/saved-game-judgings.test.mjs` (removed), `stryker.config.json`.

## Blocking findings

None.

## Minor findings

### M1 — the refusal case for a `judgings` key is in the record-and-mark test file, not the saved-game test file, and cites D-213 instead of D-206's sentence

- Place: `tests/sim/judging-record.test.mjs:519-554` (the case "the saved game holds no judging: a game's own save loads back into the same state, and a document with a `judgings` key, however it is filled, is refused as shape and throws nothing"), its `decision:` line at `:520`.
- What: the case checks the strict load of `src/browser/sim/saved-game.ts`, a trust boundary. `guidelines/coding-saved-game.md` ("Where in code") and the row of `src/browser/sim/saved-game.ts` in `guidelines/testing.md` ("Trust boundaries") send a reader to `tests/sim/saved-game.test.mjs` for the load's refusals. This case sits in a file whose header (`:1-7`) is about the record and the mark. It quotes the first sentence of D-213 (a general rule of the load), while the requirement it proves is in D-206's paragraph "The judgings the browser remembers (D-441) are no part of the saved game state" and its Verification "the saved document holding no judging, and a document of the current version holding one refused whole", and in D-441 "The saved game state holds no judging".
- Why it matters: someone looking for proof that the load refuses a `judgings` key reads `saved-game.test.mjs` and the trust-boundary row, and finds nothing there. The proof still exists, so nothing is unprotected. The executor names the placement as forced by the slice's *Change* list (it could not write `saved-game.test.mjs`) and leaves the move to Slice 10.
- Evidence: the case is correct and catches the fault. I checked it three ways in the review copy:
  - with `"judgings"` added to `GAME_KEYS`, it fails;
  - with `fields` changed to ignore a `judgings` key, it fails at the crafted documents (`actual: { ok: true, … }`, `expected: { ok: false, reason: 'shape' }`);
  - with all of `src/` taken from `387cd8ca`, it fails.
- Suggested: Slice 10 moves the case into `tests/sim/saved-game.test.mjs` when it rewrites that file, or keeps it here and adds it to the trust-boundary row, and quotes D-206 in the `decision:` line.

## Out-of-scope findings

None.

## Points the dispatch asked me to judge

- **The strict load: nothing else changed.** I read the diff of `saved-game.ts` line by line. Removed: the imports of `RememberedJudging`, `RememberedJudgings` and `SeedResult`; `SEED_KINDS`, `rememberedJudging` and `rememberedJudgings`; `"judgings"` in `GAME_KEYS`; the `judgings:` read in `game()`. That is exactly what `bae893e2` added to this file (`git show bae893e2 -- src/browser/sim/saved-game.ts`), reversed. Nothing else in the file changed. The helpers those functions used (`entries`, `identityKey`, `listedProgram`, `characterKey`, `tripList`, `oneOf`) are still used elsewhere: ESLint and the typecheck pass.
- **Trust boundary (`saved-game.ts`), hostile input.** `fields` requires exactly the keys of `GAME_KEYS`, so a version-9 document with a `judgings` key is now refused as `shape` from the key count alone, before its value is read. That covers `{}`, a filled record, `null`, `[]`, `7` and a `__proto__` key, all of which the new case checks without a throw. The game's own save, written by `savedGame` from a `GameState` that no longer has the field, has no `judgings` key and loads back into the very state (same case). The three checks under M1 show the case fails when the load accepts the key.
- **Irreversible operation.** None. The change only removes code. A version-9 document carrying `judgings` exists only from this branch's earlier slices: version 9 is not deployed (spec, Constraints, line 46). Slice 10 rewrites the test document without a raise under the exception in `guidelines/coding-saved-game.md`, „Wersja podnoszona razem z kształtem”.
- **Every place the first run erased a judging is gone or replaced.** I compared the range's hunks in `game.ts`, `loop.ts` and `programs.ts` with `git show 3218a620` for the same files. Each hunk is the exact inverse of its `3218a620` hunk: `setProgram`, `settleDeath`, the first-chill write of `advanceMinutes`, `takeEnd`, `endLoopRun`'s comment, `deleteProgram`, `editProgram`, `saveCopyIntoProgram` and the import lines. The later changes stay: `madeAtMs` in `newGame`, and `contentRevision`/`contentDiffers` in `withProgramContent`.
  - The four content writes now call `withProgramContent` (`game.ts:452`, `game.ts:899`, `programs.ts:586`, `programs.ts:718`). It raises the revision where `contentDiffers` finds the groups or the trip plan changed (`programs.ts:390-406`).
  - `git grep withProgramContent -- src` shows these four calls and nothing else. `git grep "programs: "` shows no other write of a listed program's content: the other writes are a new list in `newGame`, an append, a rename, a filter in `deleteProgram`, and a new program from a copy.
  - `content-revision.test.mjs` passes. It covers the raise by each of the four writers, A→B→A, the cases with no raise and the first chill.
  - The two death settlements and `deleteProgram` need nothing (D-440, third paragraph; D-165).
- **No reader of a removed name.** I ran `git grep` in `src tests scripts balance foundations guidelines .claude stryker.config.json` for `RememberedJudging`, `judgeAndRemember`, `rememberedJudging`, `rememberedOf`, `withRememberedJudging`, `withProgramSaved`, `judgingsWithout…`, `judgingsAfter…`, `judgingMark(`, `SEED_KINDS`, `.judgings` and `judgings:`. Hits appear only in `tests/sim/saved-game.test.mjs` (Slice 10's) and in the new refusal case (`crafted.game.judgings`).
- **`withProgramSaved` removed instead of kept as a wrapper.** Not a departure that matters. No foundation entry and no guideline names it (searched `foundations/`, `guidelines/`). D-442 requires only that "the count rises where every write of a program's content passes", and `withProgramContent` is that place. A `withProgramSaved` that returns the list alone would be an identity wrapper around it. The plan asks for the callers to "take the list as before `3218a620`", and they do, call for call. The spec's Decision 2, Decision 6 (S1) and Constraints line 37 still say `withProgramSaved` and now describe a name that does not exist. They are working documents of the cycle, not the foundation, so this is no finding; the request may say so.
- **The Slice 4 and Slice 1 cases still stand.** The Slice 4 section of `judging-record.test.mjs` is the same before and after the range, apart from `plainGame` (it no longer passes an empty `held`, which no longer exists) and one blank line. I extracted the section and ran `diff`. `content-revision.test.mjs` and `judging.test.mjs` are untouched and pass.
- **Removed tests.** Removed: the 22 first-run cases of `judging-record.test.mjs` (the remembered judging, its replacement, the old mark, the pure erasing functions, the hooks at saves, deletion, first chill and deaths, the act `judgeAndRemember`) and all of `saved-game-judgings.test.mjs`. Each tested only the removed field and functions. The reason is remark 1 of the human and D-441 "The saved game state holds no judging", as "Changing an existing test" asks.
  - Their requirements that survive have replacements: erasing by a change of content is the content-revision cases plus the Slice 4 mark cases; erasing by a death is the Slice 4 death cases; "the act changes nothing of the game" is `judging.test.mjs` "the act of a judging … leaves the game state the very state it got" (two cases).
  - `stryker.config.json` drops its one line for the removed file. `test_mutation_test_selection.py` passes.
- **Size of `game.ts` (D-425).** `tests/quality/test_function_and_file_size.py` passes. The range removes more from `game.ts` than it adds; the one added line in `advanceMinutes` restores the shape from before `3218a620`.

## The human's remarks (correction 1)

- Remark 1: made for this slice's share. The game state, the simulation and the saved game hold no judging any more, and the first run's erasing is gone where the content revision and the generation now do its work. The cache and the rest of the remark are other slices and outside this range.
- Remarks 2–5: not in this range.

## Against the guidelines

- `guidelines/coding.md`: ESLint, Prettier and the size rules pass on the changed files; no suppression comment was added.
- `guidelines/coding-simulation-module.md` and `guidelines/coding-saved-game.md`: isolation unchanged. No function now changes a value passed to it: `test_simulation_inputs.py` passes, and the new case loads a `structuredClone`. The strict reading stays strict (above). The version stays 9 under the not-deployed exception, with the comment over the test document left to Slice 10.
- `guidelines/testing.md`: the new case's expectation comes from the foundation, not from the code's output. It was seen failing (M1's evidence). The trust-boundary placement is M1.

## Author's own-work check and walk

- The executor names the weakest place correctly: the strict load and the reversal of the death and delete functions. Its case would catch a load that accepted the key, as my mutations show. It did not run that mutation itself; I did.
- Walk: "no behaviour a user sees changes". This agrees with the diff: the view stopped reading `state.judgings` in Slices 6–8, and no removed name remains in `src/browser/view/`.

## Declined to judge

- `tests/sim/saved-game.test.mjs` is red at this head because its document holds `judgings` (21 of 45 cases, by the executor's count). The plan has Slice 10 rewrite it, and the dispatch forbids running or changing it here.
- The comment over the test document required by the exception in „Wersja podnoszona razem z kształtem”: Slice 10 writes the document.

## Checks run

All in a detached worktree of `3966b24e` at `.runs/review-rc19/wt` (after `git submodule update --init -- .the-way` and `npm ci`, exit 0):

- `npm test -- tests/sim/judging-record.test.mjs` → 0
- `npm test -- tests/sim/judging.test.mjs` → 0
- `npm test -- tests/sim/content-revision.test.mjs` → 0
- `npm test -- tests/sim/program-list.test.mjs` → 0
- `npm test -- tests/sim/copy.test.mjs` → 0
- `npm test -- tests/sim/copy-actions.test.mjs` → 0
- `npm test -- tests/sim/death.test.mjs` → 0
- `npm test -- tests/sim/loop.test.mjs` → 0
- `npm test -- tests/sim/catch-up.test.mjs` → 0
- `npm test -- tests/sim/loop-record.test.mjs` → 0
- `npm test -- tests/view/maps-screen.test.mjs` → 0
- `npm test -- tests/quality/test_mutation_test_selection.py` → 0
- `npm test -- tests/invariants/test_simulation_inputs.py` → 0
- `npm test -- tests/invariants/test_saved_program_edit.py` → 0
- `npm test -- tests/invariants/test_copy_save.py` → 0
- `npm test -- tests/quality/test_function_and_file_size.py` → 0
- `npx eslint src/browser/sim tests/sim/judging-record.test.mjs` → 0
- `npx prettier --check src/browser/sim tests/sim/judging-record.test.mjs stryker.config.json` → 0
- `npm run typecheck` → 0
- `python -B .the-way/elements/common/foundation_check.py` (with test citations) → 0, "0 errors"
- Mutation A, by hand: `"judgings"` added to `GAME_KEYS` → `npm test -- tests/sim/judging-record.test.mjs` → 1 (the refusal case fails, 9 pass). Restored.
- Mutation B, by hand: `fields` changed to drop a `judgings` key from the key count → same command → 1 (the case fails at the crafted documents). Restored.
- Pre-slice code: `git checkout 387cd8ca -- src`, same command → 1 (the case fails). Restored to `3966b24e`; `git diff --quiet 3966b24e` was clean afterwards.
- StrykerJS: `node node_modules/@stryker-mutator/core/bin/stryker.js run stryker.review.json --mutate` over the changed lines of `game.ts` (448-460, 714-722, 895-906), `loop.ts` (326-333), `programs.ts` (582-592, 714-722) and `saved-game.ts` (1258-1282, 1376-1382) → 0. 38 killed, 2 survived, score 95 %.
  - `stryker.review.json` was a working copy of `stryker.config.json` without `tests/sim/saved-game.test.mjs`, which is red here and would fail Stryker's first run with no mutants, and with its own incremental file.
  - Both survivors are `events: []` → `events: ["Stryker was here"]`, at `game.ts:457` (`setProgram`) and `game.ts:721` (`settleDeath`). Both lines are unchanged by the range. Classified as behaviour not worth fixing in this slice: neither function's events are part of the slice's requirement.
  - The `saved-game.ts` ranges produced no row in Stryker's table. The key list there was covered by mutations A and B instead.
- Not run: `npm test -- tests/sim/saved-game.test.mjs` (forbidden by the dispatch; expected red until Slice 10) and the full `npm test` (the cycle's own run).

## Reaches beyond the dispatch

- `.the-way/task-cycle/review/fix.md`, read from `.the-way/` (the main checkout's submodule, also at `19e5774a`), because section 1 of the method names it for a correction.
- `git show bae893e2` and `git show 3218a620` (src parts) and `git show 387cd8ca:tests/sim/saved-game-judgings.test.mjs` (case titles), to judge "back to what it was before `3218a620`" and the removed tests.
- `tests/sim/content-revision.test.mjs` and `tests/sim/judging.test.mjs` (case titles and the writer table), to confirm the removed cases' surviving requirements are covered.

## Working copies

- `.runs/review-rc19/wt`: a detached worktree of `3966b24e`, with `stryker.review.json` and the Stryker output under its `.runs/`. Removed with `git worktree remove --force`, then `git worktree prune`.
- `.runs/review-rc19/` (logs of the runs, two extracted text files of the test diff): removed whole.
- No remainder. Nothing was kept in `reports/` beside this report.
- The cycle's worktree shows uncommitted changes to `src/browser/maps-screen.css`, `src/browser/view/maps-screen.tsx` and `tests/view/maps-screen.test.mjs`. They are not mine: another agent's directory `.runs/executor-c1-11/` stands beside them, and I wrote nothing in that worktree but this report.

## Unread material

- D-213 and D-206: read their decision text and Verification whole, their *Rationale* in part, their *Rejected* not.
- `guidelines/testing.md`: read whole, in two parts; the "Trust boundaries" table rows for HTTP routes only skimmed.
- Read whole: D-440, D-441, D-442, D-165, D-190, D-386; the invariants `simulation-inputs`, `save-version` and `death-settled-once`; `guidelines/coding.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding-saved-game.md`, `src/browser/AGENTS.md`; the spec.
- The section "Passages of the frozen task" in the handoff is empty, so no passage of `task-frozen.md` was given or read.

## Searches not found or unclear

- `withProgramSaved` in `foundations/` and `guidelines/`: not found (expected; see above).
- The handoff's "Passages of the frozen task" section is empty: unclear whether a passage was meant to be copied there. The plan's *Read* names spec passages and foundation entries only, so I judged against those.
