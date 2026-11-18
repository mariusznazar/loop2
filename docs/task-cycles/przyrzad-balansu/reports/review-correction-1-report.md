PASS f3bc5fdf86865d035cd27c568980e58602921406

# Review of correction 1 (the human's items 1 and 2) - `review-change` with `fix.md`

- Range: `2fe4fde09044d4508afd0520c6d7fbb7067a85c9..f3bc5fdf86865d035cd27c568980e58602921406`, two commits: `3abba636` (item 1), `f3bc5fdf` (item 2). `git rev-parse f3bc5fdf` and `git rev-parse HEAD` of the worktree both give `f3bc5fdf86865d035cd27c568980e58602921406`.
- Diff computed with `git diff 2fe4fde0 f3bc5fdf` and `git log 2fe4fde0..f3bc5fdf`.
- Changed files (added/removed lines; lines in the file at base -> head):
  - `.claude/skills/loop2-balance/SKILL.md`: +6 -5 (144 -> 145)
  - `.agents/skills/loop2-balance/SKILL.md`: +6 -5 (144 -> 145)
  - `tests/quality/test_function_and_file_size.py`: +5 -1 (167 -> 171)

Counts: 0 blocking, 1 Minor, 0 out of scope.

## The remarks, each as made or not

- **Item 1 - made.** In both copies, step 3 of "Checking a map before a package is defined" (`.claude/skills/loop2-balance/SKILL.md:108-114`, the same lines in `.agents/skills/loop2-balance/SKILL.md`), the sentence that named the program `P22`, the branch „Czysty płomień”, the counts 0 of 50 and 47 of 50 and `--ranks cleanFlame=1` is gone. The new text tells the agent to "tell the person only that the row was measured with the skills the program needs. Name no branch, no skill and no rank to the person, who is not to learn which of the character's skills passes a map." That is the human's wording of item 1 and the closing N-1 of `review-fix-report.md` asked for. The smaller point of N-1 is closed too: the example row now reads `P<n>`, not `P22`. Evidence:
  - `cmp` of the two copies: identical.
  - A grep of both copies and of `tests/agent_workflow/test_loop2_balance_skill.py` for `p22|czyst|cleanflame|clean flame|płomie|plomie` (case-insensitive) finds nothing. The words `branch` and `rank` appear only in the instruction itself, in the flag description at lines 48-49 (`smallItemGathering=80`, `keenEye=3`, unchanged by this range) and in the overlay table key `BRANCHES` (line 64, unchanged).
  - A grep of the added lines of the diff and of the two commit messages for the same words, plus `pustkow|wasteland|keenEye|smallItem`, finds nothing.
  - The table the agent forwards carries no rank: `balance/check-map.mjs` and `balance/cli.mjs` print neither `--ranks` nor `--practice` into the table (grep `rank|practice` in `check-map.mjs`: no hit). So a row the agent measures again with `--ranks` reaches the person without the rank.
  - The instruction can be followed. `tests/sim/reference-programs.mjs:626-631` (the comment of `wastelandCleanFlame`) and `:377-380` (the patrol groups, "A character needs the branch to run it") are the comments the new text points the agent to.
  - D-428 ("The table holds no condition, action or rule of any program"; *Rationale*: "the programs stay with the agent") is kept. The new text adds that what the agent says beside the table must not name the skills either.
- **Item 2 - made.** `tests/quality/test_function_and_file_size.py:101` adds `"balance/over-function.mjs": function_source("overBalanceFunction", 201)` to `CONTROL_FILES`, and `:129-130` adds its report to `CONTROL_REPORTS`. The comment at `:98-99` names the balance instrument. D-425's *Verification* `tests:` clause names "the limit on a function reaching ... the balance instrument". A planted function of 201 lines under `balance/` that the size run must report now holds that clause. Evidence (checks 2-4 below):
  - the test passes on the head;
  - it fails once `balance` is removed from `eslint.config.mjs`;
  - the base version of the test passes against the same mutant, so the new control file is what catches it.
  - The control file is written only into a `tempfile.TemporaryDirectory()` (`:159-163`), never into the repository. `git ls-files balance` holds no `over-function` file (the only `over` hits are `overlay.mjs` and `overlays/*.json`), and `git status --short` of the reviewed worktree was empty after the runs.

Items 3, 4 and 5 are outside this review: item 3 belongs to the return step, and items 4 and 5 were let through.

## Findings

### Critical

none

### Important

none

### Minor

**m-1. The skill now leaves it to the agent to work out which pairs to give `--ranks`.** Place: `.claude/skills/loop2-balance/SKILL.md:110-111`, the same in `.agents/skills/loop2-balance/SKILL.md`.

What is wrong: the text says "run it again with `--ranks` and `--programs <identifier>`", but not how the agent gets the pairs. The agent has to go from the branch's Polish name in a program's comment (for example „Czysty płomień” in `tests/sim/reference-programs.mjs:627`) to the branch's key in the game's data, and pick a rank. The old text gave a worked example of this: `--ranks cleanFlame=1`.

Why it matters: an agent that guesses the key or the rank wrong gets a row near zero again. It may then report that row as "measured with the skills the program needs".

Why the grade is Minor: the key can be found in the game's data (`src/browser/sim/program.ts:50` reads `cleanFlame`), and the CLI refuses an unknown key with a usage error (`balance/cli.mjs:262-264`). So a wrong guess fails loudly rather than silently, and nothing the person reads leaks.

Possible polish, if wanted: one sentence in the skill saying that the key and rank come from `BRANCHES` in the game's data for the branch the comment names. That sentence goes to the agent, not the person. This blocks nothing.

## Declined to judge

- The flag examples `smallItemGathering=80` and `keenEye=3` (`SKILL.md:48-49`). They are outside the range, and they name no program or map.
- Whether the public repository lets a player read the reference programs and their comments. The task settled this (task-frozen, Question 4, "ten koszt padł w pytaniu").
- The limit on a file reaching `balance/`. D-425's body says the file limit covers the same files outside `tests/`, but its *Verification* `tests:` clause claims a test only for the function limit reaching the instrument. The clause is the one item 2 and N-2 concern. The size run takes its file patterns from the same `eslint.config.mjs` list for both rules, so the planted function already shows the instrument's directory is in the run's scope. Whether to add a test for the file limit is not asked by the remarks.

## Checks

| # | Check | Command or method | Exit / result |
|---|---|---|---|
| 1 | Head | `git rev-parse f3bc5fdf`; `git rev-parse HEAD` | 0; both `f3bc5fdf86865d035cd27c568980e58602921406` |
| 2 | Size test on the head, in the reviewed worktree | `npm test -- tests/quality/test_function_and_file_size.py` | 0, "Ran 2 tests ... OK (expected failures=1)" (`reports/review-correction-1-size-head.log`) |
| 3 | Mutant: `balance` removed from `eslint.config.mjs` at its three places (the `directories` list, `"balance/**/*"` in the TypeScript program's files, `` `balance/**/*.${extensions}` `` in the Node globals entry; no `balance` left in the file), in a worktree of the head | `python -B tests/quality/test_function_and_file_size.py FunctionAndFileSize.test_control_the_script_reports_what_stands_over_a_threshold_and_nothing_else` | 1, FAIL "Lists differ", missing `('balance/over-function.mjs', "Function 'ov...")` (`reports/review-correction-1-mutant.log`) |
| 3a | The same case, same worktree, before the mutant | same command | 0, OK |
| 4 | Base version of the test (`git show 2fe4fde0:tests/quality/test_function_and_file_size.py`) against the same mutant | same command | 0, OK: without the new control file the mutant survives (`reports/review-correction-1-mutant-basetest.log`) |
| 5 | Skill copies | `cmp .claude/skills/loop2-balance/SKILL.md .agents/skills/loop2-balance/SKILL.md` | 0, identical |
| 6 | Skill test | `npm test -- tests/agent_workflow/test_loop2_balance_skill.py` | 0, "Ran 3 tests ... OK" |
| 7 | Search for the hint, method: grep (case-insensitive) of both copies and the skill's test for `p22`, `czyst`, `cleanflame`, `clean flame`, `płomie`, `plomie`, `branch`, `gałę`, `rank`, `keenEye`, `smallItem`; of the added diff lines and the two commit messages for `czyst`, `cleanflame`, `płomie`, `p22`, `pustkow`, `wasteland`, `keenEye`, `smallItem` | grep | no hit of the branch's name, its key, `P22` or the counts; `branch`/`rank` only as shown under item 1 |
| 8 | No control file left tracked | `git ls-files balance`, `ls balance`, `git status --short` | no `over-function`; status empty |

Not run: the full gate (`npm test`), as the handoff says. I did not run Ruff on the test file or `foundation_check.py`; the correction report says both ended 0, and that is unverified by me.

## Reaches beyond the dispatch

- `guidelines/testing.md`, read whole: AGENTS.md asks for it before reviewing a test.
- `foundations/decisions.md`, the entry `### D-425` whole at `f3bc5fdf`: to check what the decision's sentence and its `tests:` clause claim for item 2.
- `tests/quality/eslint-size-rules.mjs:1-60` and `eslint.config.mjs` (the `balance` lines 10-20, 80-86, 108-116): to know what the size run reads and to make the mutant.
- `tests/sim/reference-programs.mjs:374-384` and `:620-640`: to check that the comments the new skill text points to exist.
- `balance/cli.mjs` and `balance/check-map.mjs` (grep for `rank|practice|programs`): to check that the table carries no rank.
- `src/browser/sim/program.ts:50` (grep for `cleanFlame|keenEye`): for m-1.
- `balance/overlays/wasteland.json` (grep): to check that the overlay's description names no branch.

## Working copies

- `.runs/review-correction-1/` under the task's worktree held:
  - a detached worktree of `f3bc5fdf` at `.runs/review-correction-1/wt`, with a directory junction `wt/node_modules` to the reviewed worktree's `node_modules`;
  - the logs of the runs.
- What happened to them:
  - The junction was removed first with `rmdir`, so that removing the worktree could not reach the real `node_modules`. Afterwards `node_modules/eslint` was still there in the reviewed worktree.
  - Then `git worktree remove --force .runs/review-correction-1/wt` and `git worktree prune`, then `rm -rf .runs/review-correction-1`. `git worktree list` no longer shows the worktree, and `ls .runs` shows no `review-correction-1`.
- Kept beside this report in `reports/`: `review-correction-1-size-head.log`, `review-correction-1-mutant.log`, `review-correction-1-mutant-basetest.log`.

## Unread material

- `.runs/task-cycles/przyrzad-balansu/reports/review-fix-report.md`: read lines 29-69 (the section "New findings in the fix diff" and its checks), as the handoff names; the earlier sections not read.
- Everything else the dispatch names was read whole:
  - the method files `.the-way/task-cycle/review/SKILL.md` and `fix.md`;
  - `correction-1-remarks.md`, `correction-1-report.md`, `plan.md`, `task-frozen.md`;
  - D-428;
  - both skill copies at lines 60-140, the changed section with its context, plus the grep of the whole files. Lines 1-59 and 141-145 were covered only by the grep.

## Searches not found or unclear

- The phrase "says it depends on a branch" (`SKILL.md:110-111`). No comment in `tests/sim/reference-programs.mjs` uses the words "depends on". The two comments that tie a program to a branch say "with the branch „Czysty płomień” lives on its nature energy" and "A character needs the branch to run it". I read this as matching the instruction's intent, not as a defect.
