PASS 6a02418f22c483aec7659ef4c355f985d3e74d51

# Review of the return step — Pytanie „Zapisać, odrzucić, wrócić?” przy „Zakończ”

Range `cb9d5e7..6a02418` (one commit, `6a02418`), computed myself with `git log` and `git diff`; `git rev-parse HEAD` in the worktree is `6a02418f22c483aec7659ef4c355f985d3e74d51`, the head I was given. The worktree was clean before and after my work. `.the-way` gitlink `52889bc7…` equals `git -C .the-way rev-parse HEAD`.

Blocking: 0. Minor: 0. Out of scope: 0.

## Findings

### Critical

none

### Important

none

### Minor

none

## What I judged

1. D-173 correction ("or, while the panel shows another program, where that heading would stand"). True to the final code. `src/browser/view/program-panel.tsx:567-569` draws `<EndQuestion>` after the `program-actions` row and before the `copyShown && run` block that holds the `copy-heading` (`:570-573`), so while another saved program is shown (no copy section) the question stands where the heading would. The test "the question stays in its place while the panel shows another program, and never stands on Programy" passes. The rest of D-173 matches `game-view.ts` (`end` `:395-410`, `saveAndEnd` `:413-431`, `discardAndEnd` `:433-437`, `back` `:439-449`, `endRun` `:367-375`) and `end-question.tsx` (three answers in order, „Odrzuć" `kind="destructive"`, the D-172 line under the sentence via `programHasChangesCopyLacks`). It matches rows 1-4 and 8 of *Settlements to record*; the ordering under a discovery band is held by the unchanged panel/run-screen placement and its test. The added clause restates nothing more broadly than the code does.
2. D-324 correction ("the copy no longer differs from its program as D-171 gives"). True: `store.apply` (`game-view.ts:271-272`) drops the question when `!copyHasUnsavedChanges(state)`, and D-171 defines the difference as against the copy as taken or last saved. It is consistent with task row 7 ("po edycji, po której kopia nie różni się już od swojego programu"). The earlier "equals its program" was the imprecise word; the new one is not broader. The other D-324 sentences (pause as „Pauza"; `resume` only when the run went on; „Wznów" of header and band both go through `togglePause` → `closeQuestion`; „Restart" → `closeQuestion`; leaving the screen → `closeQuestion` then `pauseOnLeaving` in `show`; memory of the view only) match `game-view.ts:171-175, 357-361, 378-392, 604-607, 656` and `run-screen.tsx:155, 175`.
3. The added test assertion is sound. It follows `#/programy` after „Zapisz" of a copy whose program was deleted and requires the `aria-current="page"` list item to read "Program 2". `programShownOn` (`game-view.ts:490-498`) takes `state.countsProgram ?? state.programs[0].id`, and `sim/game.ts:461` sets `countsProgram` to the copy's owner at `end`. The first program of the list is "Program" (id 1), the new one is id 3, so the assertion tells the right behaviour from the default. I checked that it fails for the break it names (below).
4. Entries the return step might have missed, compared with the final code: D-62 and D-132 ("`Zakończ` returns to the screen D-53 gives") stay true, since the return follows the answer; D-53 same; D-171 (first free name, new program becomes last used) matches `saveAndEnd`; D-172 matches the line in the question; D-212 (question not in a save, run returns paused) matches the memory-only `question` variable; D-44 (list and *Verification*) already has „Odrzuć" and the styleguide line 233 names it, both unchanged in this range and correct; D-122 (band of a discovery above, „Wznów" of the band is the header's) matches; D-283 matches. The part map is untouched and `foundation_check.py` reports `0 errors`; the glossary needs no entry (no sentence of D-173 or D-324 uses a word that a reader would take wrongly). No invariant is owed (`copy-save` is untouched; the task and the decisions set no new rule). I found no entry the final code contradicts.

## Declined to judge

none

## Checks run (command, exit code)

- `git rev-parse HEAD` → `6a02418f22c483aec7659ef4c355f985d3e74d51` (matches the dispatch).
- `git diff cb9d5e7..6a02418` and `git log cb9d5e7..6a02418` → read whole; two files, `foundations/decisions.md` and `tests/view/end-question.test.mjs`.
- `npm test -- tests/view/end-question.test.mjs` → exit 0; 17 tests, 17 pass, 0 fail.
- `python -B .the-way/elements/common/foundation_check.py` → exit 0, `0 errors`.
- Scratch mutation, in a separate detached worktree of `6a02418` (made outside the reviewed worktree, since removed): `src/browser/sim/game.ts:461` changed from `countsProgram: owner ? owner.id : null` to `countsProgram: null`, then `npm test -- tests/view/end-question.test.mjs` → fails 1 of 17: the test "„Zapisz" of a copy whose program was deleted … Programy shows the new program" with `Programy shows the new one: expected "Program 2", got "Program"`. So the new assertion fails for the break it names. The other tests of the file stayed green with the mutation (the earlier existing-program case shows "Program" either way), so the new assertion is the only one that guards this clause of D-173 for the new program.
- Not run, as told: `npm test` without an argument.

## Reaches beyond the dispatch

- `src/browser/view/program-panel.tsx:520-630` and `src/browser/view/run-screen.tsx` (what and where: the place of `<EndQuestion>`, the `setQuestion` path, the „Wznów" wiring) — to check the D-173 "another program shown" clause and D-324 against the final code, as the dispatch asks.
- `src/browser/view/end-question.tsx` whole, `src/browser/view/game-view.ts:165-460, 480-500, 596-665`, `src/browser/sim/game.ts:446-470` and `grep countsProgram src/browser/sim` — same purpose, and to see how Programy picks the program for `#/programy`.
- `foundations/decisions.md` D-171, D-44 (each whole), to compare the wording of the two corrections; D-172 read as a quotation in the task and in code.
- `guidelines/styleguide-browser-view.md` line 233 by grep, to confirm „Odrzuć" is in the destructive list.

## Searches not found or unclear

none. (The skill file `.claude/skills/the-way-review-change/SKILL.md` and `.the-way/task-cycle/review/SKILL.md` were both present and read; the method says to read `.the-way/task-cycle/skill/return_step.md` only through the handoff's summary, which I used as given, and the author's report, which I treated as claims and verified above.)
