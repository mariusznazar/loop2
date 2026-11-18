FAIL 73d19b044ff42d325a2dae01ad2b8e229c87198d

# Review of the fix of the whole-change review's findings — task `przyrzad-balansu`

- Range: `4caa290f732a83e8154b192a6673d6d97ac27448..73d19b044ff42d325a2dae01ad2b8e229c87198d`, three commits (`a53f0f22`, `314deced`, `73d19b04`); `git rev-parse HEAD` gave the head named in the handoff.
- Read: `.the-way/task-cycle/review/SKILL.md` and `fix.md` whole, the handoff, the findings file `reports/whole-review-findings.md` whole, the fix report `reports/fix-whole-report.md` whole, the whole fix diff and its commit messages.
- Result: the seven findings (I-1 and M-1 to M-6) are all fixed. The fix brings two new findings I grade Important: N-1, which comes from the fix of M-5, and N-2, which comes from the fix of M-2. Under `fix.md` a new Important finding in the fix counts as one that remains, so the review fails. Each is a one-sentence or one-line change.

## The findings of the findings file

**I-1 — fixed.** The column "Program" now holds `P<n>`, the program's place in the whole list of `REFERENCE_PROGRAMS` (`balance/describe.mjs`, `programLabels`). `measureRow` takes `programLabel` and holds no identifier any more (`balance/check-map.mjs:39`, `:66`, `:115`). `runCheckMap` takes the label from the whole list (`balance/cli.mjs:432-437`), so `--programs` does not renumber. The key from label to identifier is what `programs` prints (`**P4 forestBest**`). Evidence: my real run `npm run --silent balance -- check-map --overlay balance/overlays/wasteland.json --programs wastelandCleanFlame,forestBest` (exit 0) printed the rows `| Pustkowie | P22 | …` and `| Pustkowie | P4 | …`, with no identifier anywhere in the table (`reports/review-fix-check-map-wasteland.md`). The test asserts that no identifier of the 23 appears, both on `renderTable` (`tests/balance/check-map.test.mjs:137-138`) and through the real command (`:281-295`, the literal `P10`).

The handoff asked whether the table, its test, the skill's description of the table and D-428 agree. They agree. D-428 still says "the table holds no condition, action or rule of any program". The table now holds neither rules nor identifiers. The test checks both, and the skill's step 3 says the same and gives the reason. D-428 was not changed and needs no change for the table to agree with it. Its *Rationale* does not mention the identifier, and the fix report leaves that point to the cycle; I see no defect in it.

**M-1 — fixed.** The case now runs `forestDeepBest` on `forestDeep` with the literal chest `{ stick: 8, berry: 7 }` and ties that chest to the program's take list (`assert.deepEqual(chestOf(forestDeepBest), chest)`, `tests/balance/check-map.test.mjs:183`). I ran my earlier mutant again: the row's sweep given `chest: {}`. This time 1 of 7 cases fails, exit 1 (`reports/review-fix-mutant-chest.log`). I then restored the file and `git diff` showed it clean.

**M-2 — fixed as worded, but see N-2 (new).** "the balance instrument" now stands in the list of D-425's binding sentence (`foundations/decisions.md:824`). That is what the finding asked. The fix also added the same words to the *Verification* clause `tests:`, and that addition is N-2.

The handoff also asked whether the form of the edit is a defect, since the fix agent did not go through the decisions skill. The template's "Changing a decision" asks for the entry to be edited in place, and the edit does that. The new words of the sentence agree with the code. However, `AGENTS.md` says "Write foundation entries only through the project skills `the-way-record-decision`, …", and the edit bypassed that skill. I grade the bypass Minor (N-3). The sentence the edit gives the entry is the right one, and the human accepts the changed meaning by merging the request (template, "Changing a decision"). The point that does matter, the *Verification* clause, I grade separately as N-2.

**M-3 — fixed.** `startOf` is exported from `balance/engine.mjs:103-129` and now also returns the events of the start. `balance/trace.mjs:92-93` starts through it, and the copy and its five imports are gone (`balance/trace.mjs` went from 145 to 125 lines). The trace still notes the start's events (`noteEvents(started.events)`). The trace, agreement and engine tests pass (3, 6 and 7 cases).

**M-4 — fixed.** `balance/overlay.mjs:5` now cites "glossary term overlay; D-18". `balance/loop.mjs:5` and `balance/campaign.mjs:1-6` cite no entry for "copies no number". `engine.mjs` and `trace.mjs` keep the citation of `instrument-game-agreement`, which is correct there.

**M-5 — fixed as asked, but its new sentence is N-1.** The skill, step 3 (`.claude/skills/loop2-balance/SKILL.md:108-113`), now says that every row runs with a new character's skills. It says that a program needing a branch reads near zero without it, and it tells the agent to rerun such a program with `--ranks`.

**M-6 — fixed.** The skill, step 4 (`:125-129`), now sends the person each attempt's results as a row like the table's, under a neutral label of its own (`A1`, `A2`…) and never under a word of what the attempt does.

## New findings in the fix diff

### Important

**N-1. The skill now tells the agent to give the person the very hint that I-1 took out of the table.** `.claude/skills/loop2-balance/SKILL.md:108-113`, the same text in `.agents/skills/loop2-balance/SKILL.md` (commit `a53f0f22`, the fix of M-5). The new text reads: "`P22` lives on the branch „Czysty płomień” and on Pustkowie solved 0 of 50 seeds without it and 47 of 50 with `--ranks cleanFlame=1`. Run such a program again with `--ranks` and `--programs <identifier>` and tell the person that its row was measured with the branch".

What the person gets: when the agent follows this, the person learns that a reference program solves Pustkowie once the branch „Czysty płomień” is bought. That is the hint I-1 named in the identifier `wastelandCleanFlame` ("says that Pustkowie is held with the branch „Czysty płomień”"). It now reaches the person in the agent's own words instead of through the table, so the leak of I-1 is back, and To do 5 / D-428 ("żeby nie znać rozwiązań") is again broken by the instrument's own instructions.

What would close it: the agent tells the person only that the row was measured with the skills the program needs, naming no branch, no skill and no rank.

What each choice costs: leaving the text as it is costs a hint about the solution to the person at every check of Pustkowie, and on any later map where a reference program depends on a branch. Changing it costs one sentence in both byte-identical copies of the skill.

A smaller point in the same place (no grade of its own): the label `P22` is written into the skill as a fixed number. If a program is inserted earlier in the list, the number points at another program, while the skill elsewhere says to read the key from `programs` at the time of the check.

**N-2. D-425's *Verification* clause now names a test that does not exist.** `foundations/decisions.md:833` (commit `73d19b04`, the fix of M-2). The `tests:` clause now reads "the limit on a function reaching the application, the scripts, the tests, the balance instrument and the agent-workflow directories the linter of D-29 reaches". The template says that this clause names "the tests that hold its sentences". The control case of the size rule, `tests/quality/test_function_and_file_size.py:72-130` (`CONTROL_FILES` and `CONTROL_REPORTS`), plants a file over the threshold for each place the clause lists: `src/browser/…`, `scripts/over-file.mjs`, `tests/over-function.test.mjs` and `.claude/hooks/over-hook.js`. It plants none under `balance/`.

The rule does reach `balance/` today. The size run takes its patterns from `eslint.config.mjs`, `test_source_tool_scope.py` keeps `balance-tools` in that scope, and my run read 314 files. But no test shows the size rule reporting a function of the instrument. The entry the fix changed therefore states its check more broadly than the tests hold it, and WAY-263 makes that Important.

What would close it, either one: (a) one entry in `CONTROL_FILES` (for example `balance/over-function.mjs` with a function of 201 lines) and its line in `CONTROL_REPORTS`; or (b) take "the balance instrument" back out of the `tests:` clause and leave it in the sentence alone, where M-2 asked for it.

What each choice costs: leaving it lets a reader of D-425 believe a test proves the instrument is under the limit when only the configuration says so. Changing it costs one line of an entry, or two lines of a test.

### Minor

**N-3. D-425 was edited without the project skill `the-way-record-decision`.** `foundations/decisions.md:824` and `:833` (commit `73d19b04`). `AGENTS.md` asks that foundation entries be written only through the project skills, and the fix report says the edit was made directly. The content of the sentence is right. The defect in the *Verification* clause is N-2, which a run through the skill's comparison with the tests might have caught. Recommendation: the return step, which goes through the foundation anyway, takes D-425 through the skill.

## Other checks of the handoff

- Private names: a search of the fix diff and of its three commit messages for `przyrzad`, `symulator`, `krytyk`, `analiz`, `nakladk`, `nakładk`, `polityk`, `The Brain` and `D-80` found nothing. `tests/agent_workflow/test_tracked_file_private_paths.py` passes.
- The two copies of the skill are byte identical (`cmp`), and `test_loop2_balance_skill.py` passes.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Head | `git rev-parse HEAD` | 0 | `73d19b04…` |
| Sizes of the changed files | `python -B .the-way/task-cycle/change_file_sizes.py 4caa290f… 73d19b04…` | 0 | 13 files modified; 14832 → 14896 lines |
| Focused tests, in a worktree of the head | `npm test -- tests/balance/<file>` for check-map (7), cli (20), trace (3), agreement (6), engine (7), overlay (5), loop (5), campaign (11) | 0 each | all pass (`reports/review-fix-focused.txt`) |
| Python tests | `npm test -- tests/agent_workflow/test_loop2_balance_skill.py`, `tests/agent_workflow/test_tracked_file_private_paths.py`, `tests/quality/test_function_and_file_size.py`, `tests/quality/test_quality_invariants.py` | 0 each | OK (3; 1; 2 with the one expected failure; 5) |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |
| Size rule | `node tests/quality/eslint-size-rules.mjs` | 0 | the same four places outside `balance/` as at the base, 314 files (`reports/review-fix-size.log`) |
| Mutant of M-1 | row sweep with `chest: {}`, `npm test -- tests/balance/check-map.test.mjs` | 1 | 1 of 7 fails; file restored, diff clean (`reports/review-fix-mutant-chest.log`) |
| Real table | `npm run --silent balance -- check-map --overlay balance/overlays/wasteland.json --programs wastelandCleanFlame,forestBest` | 0 | labels `P22` and `P4`, no identifier; standard error empty; `git status` clean after it |
| Private names | search of the fix diff and its commit messages | — | none |
| Not run | the full gate, as the handoff says; `check_instructions.py` (the fix changes no instruction file other than the skill, which its own test covers) | — | unverified by me |

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md`, the section "Changing a decision" and the lines on *Verification* (found by search), to judge the in-place edit of D-425 (N-2, N-3).
- `tests/quality/test_function_and_file_size.py:72-175` and `tests/quality/test_source_tool_scope.py` (a search for `balance`), to check what the new `tests:` clause of D-425 claims (N-2).

## Working copies

The working copies stood under `.runs/review-fix/` of the task's worktree. They were a worktree of the head (`.runs/review-fix/head`) with junctions to the worktree's `node_modules` and `.the-way`, the logs, and a saved copy of `balance/check-map.mjs` for the mutant. I removed them in this order: the junctions first (their targets checked intact), then the worktree with `git worktree remove --force` and `git worktree prune`, then the directory. `git status --porcelain` of the task's worktree is empty. Kept beside this report: `review-fix-focused.txt`, `review-fix-mutant-chest.log`, `review-fix-check-map-wasteland.md` and `review-fix-size.log`. Nothing remains.

## Unread material

- `tests/balance/cli.test.mjs`: only the changed lines and their context were read.
- `.the-way/elements/decisions/skill/SKILL.md` and the files it names were not opened. N-3 rests on `AGENTS.md` and the template.
- No decision was opened whole in this review. D-425 was read in the diff and at lines 824-835, and D-428 in my earlier review.

## Searches not found or unclear

- A control file of the size test under `balance/`: not found (N-2).
- Whether the cycle wants D-428's *Rationale* to say that an identifier can carry rules: this is left open by the fix report. It is not a defect, since the binding sentence and the code agree.
