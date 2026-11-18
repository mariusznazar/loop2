# Handoff - reviewer of the whole change (`review-change`)

You review the whole change of one task of a task cycle of the-way, as an agent that made none of it.
The orchestrator dispatches you on behalf of the person who requested this cycle. Grade and scope of
every finding are yours.

- Worktree (read-only; work from its root): `.runs/ of the main checkout/worktrees/przyrzad-balansu`, branch `task/przyrzad-balansu`.
- Method: `.the-way/task-cycle/review/SKILL.md`, whole; then `.the-way/task-cycle/review/whole_change.md`, as the method says. Read a further file the method names only when its step comes.
- Range to review: base `6a7b0acb4510084877e21579eaa0ab18232c9c19` (`origin/main`) to head `4caa290f732a83e8154b192a6673d6d97ac27448`. Confirm `git rev-parse HEAD` is `4caa290f732a83e8154b192a6673d6d97ac27448`; on a mismatch ask a question first. Compute the diff yourself (`git diff 6a7b0acb..4caa290f732a83e8154b192a6673d6d97ac27448`, `git log 6a7b0acb..4caa290f732a83e8154b192a6673d6d97ac27448`).
- Your directory for working copies: `.runs/review-whole/`. Report: `.runs/task-cycles/przyrzad-balansu/reports/review-whole-report.md` (its first line `PASS <sha>` or `FAIL <sha>`). Write the findings in the reviewer's words with a place `file:line` and the grade, and for each blocking finding the slice it comes from (or that it comes from none).
- Task, read whole: `.runs/task-cycles/przyrzad-balansu/task-frozen.md`. Plan, read whole: `.runs/task-cycles/przyrzad-balansu/plan.md` (it holds the cycle's changes of the *Model* of slices 1, 7 and 8, with reasons). No spec.
- Answers of step 4: trust boundary no; irreversible operation no. The part map names no file of this change as a trust boundary; check anyway that no tool of the change writes into the repository or reads a file outside it without a flag naming it.
- The pin of the-way did not move.

## What the cycle did

Foundation step before slice 1 (commit `333b945b`, report `.runs/task-cycles/przyrzad-balansu/reports/foundation-entries-report.md`): D-427, D-428, D-429, the glossary term `overlay`, the invariant `instrument-game-agreement`, the change of D-378, and `balance-tools` added to the *Scope* of D-29, D-32, D-425 and the *Part* of `eslint-source-rules`, `prettier-source-format` and `function-and-file-size` (the cycle's own entries, not carried by a row of the task: check them with care). Then ten slices, made one after another, **none with a review of its own** (risk none): so you judge every slice. Commits and the executors' reports (`reports/executor-<n>-report.md`, each with a handoff `executor-<n>-handoff.md`):

| Slice | Range | What |
|---|---|---|
| Foundation entries | `6a7b0acb..333b945b` | the entries above |
| 1 | `333b945b..62b73c35` | `tests/sim/reference-programs.mjs`, the first-map, first-pass and acceptance tests |
| 2 | `62b73c35..f6b096e1` (part map in `0d48e760`) | the part `balance-tools`, `balance/engine.mjs`, the agreement and engine tests, `scripts/test.py` |
| 3 | `f6b096e1..d4675de8` | ESLint, `.gitattributes`, two quality tests |
| 4 | `d4675de8..5dcd4781` | `guidelines/coding.md`, `guidelines/testing.md` |
| 5 | `5dcd4781..5d548b8b` | `balance/overlay.mjs`, the three overlays, the overlay test |
| 6 | `5d548b8b..690156e1` | `balance/loop.mjs`, `balance/trace.mjs`, their tests |
| 7 | `690156e1..d78071df` | `balance/campaign.mjs`, three player descriptions, the campaign test |
| 8 | `d78071df..a09d0945` | `balance/cli.mjs`, `balance/describe.mjs`, `package.json` script, the cli test |
| 9 | `a09d0945..c2ead6ec` | `balance/check-map.mjs`, `balance/cli.mjs`, the check-map test |
| 10 | `c2ead6ec..4caa290f` | the skill `loop2-balance` (two byte-identical copies), its test, a line in `AGENTS.md` |

Mismatches the mechanical checks passed on, for your judgment: slice 2 added `tests/balance/engine.test.mjs` beyond its *Change*; slice 7 changed `balance/loop.mjs` (one `export`) beyond its *Change*; slice 7's campaigns differ from the author's notes in six cases by one point of final points (the executor says because the game's combat-tree thresholds changed since); the wording of the plan's slice 10 said programs go "outside the repository, under `.runs/`", while `.runs/` lies in the worktree and is ignored by git - the skill says so as it is.

Gaps of reading the executors reported, which the cycle carries to you (it recorded no judgment of them): D-177, D-23, `src/browser/sim/types.ts:1-92` (slice 1); D-22, D-351, D-362, D-266, D-18, D-81 to D-85, D-136 and six invariants read by their binding sentences only (slice 2); guidelines, part map, D-28 and the slice 2 report (slice 3); parts of the glossary and of `guidelines/testing.md` (several). Your own selection of the foundation covers them.

The one-time comparison of the acceptance criteria was made by slice 8's executor (report `executor-8-report.md`): the instrument of the repository and the author's instrument give identical summaries for the best program of Las on seeds 1-500, 359 of 500 solved, median 754 (summaries compared, not per-seed rows); a fresh clone, `npm ci` and the one command gave the same. Verify what you can from the report and by running the sweep yourself once.

Known to the cycle and not yet done (the cycle does them after your review, do not report them as defects): the full gate of the product, the return step (foundation compared with code, including the *Scope* of D-28, D-73, D-81, D-85 and other decisions that bind every code part and do not name `balance-tools`, and the `build-tools` *Depends on* line, which does not list `balance-tools` though its npm script runs `balance/cli.mjs`), the record, the request. Do not run the full gate (`npm test` with no file argument); focused checks are yours to run.

## Rules that bind this task (verify the change against them)

- D-80 is withdrawn: no new text may cite it. No tracked file, comment, test, entry or commit message of the change may name a note or a folder or a file of the author's private notes, or the old game's private repository (D-362, invariants `tracked-file-private-paths` and `tracked-file-private-names`): search the whole diff and the commit messages for such names (for example `przyrzad`, `symulator`, `krytyka`, `analizy`, `nakladki`, `polityki`).
- The new code is English (identifiers, comments, flags), under ESLint, Prettier and the size rule (D-425); the part `balance-tools` depends only on `simulation`; the tests of `simulation` must not import the new part (D-351, `cross-part-imports`).
- The tool changes the game's data only in memory (D-18, glossary `overlay`); results stay out of the repository (D-429); the table of the map check shows no program content (D-428); one place of the reference programs (D-427).

## Working copies (word for word, WAY-148)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Report

At the path above, as the method gives it: first line `PASS <sha>` or `FAIL <sha>`; graded findings with `file:line` anchors and an expanded justification for each, in the reviewer's words; each check you ran with its command and exit code; the number of decisions you read whole; **Unread material** (what this handoff names or your own selection left unread or part-read, or `none`); **Searches not found or unclear** (or `none`); your reaches beyond the handoff; your working copies. Return: the report's first line, the changed files with their line counts, a one-line check result, the report's path.
