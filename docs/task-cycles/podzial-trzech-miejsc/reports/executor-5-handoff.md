# Handoff - executor of slice 5 (executor-5), task `podzial-trzech-miejsc`

The orchestrator of the cycle delegated every intermediate choice to itself; the person who requested the cycle is not asked during the cycle. Nothing you write is the human's approval.

## Where and what

- Worktree (work only from its root): `the worktree's root`, branch `task/podzial-trzech-miejsc`. The slice's base is `d0c29c43`; the commits between it and your start are other agents' work, which you keep. `git rev-parse HEAD` when this handoff was written: `d0c29c43`.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`) in that worktree. Your variant: "a slice, or the retry of a slice". Read that `SKILL.md` whole; a file it names, one beside it included, only when the step or variant that names the file comes.
- Frozen task (the passages your slice's *Read* names, from this file): `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md`. Plan: `.runs/task-cycles/podzial-trzech-miejsc/plan.md` (your slice's section is copied below word for word; where the plan's ranges of a foundation entry differ from the current ones given below, the current ones hold). No spec.
- Answers of step 4 of the cycle: trust boundary - yes, in a limited sense (the call sites in `startApp` of `src/browser/view/screen-address.ts`, `src/browser/view/email-confirmation.ts` and `src/browser/view/password-reset.ts`; the files themselves are not changed); irreversible operation - no.
- Your directory for working copies: `.runs/executor-5/` (directly under the ignored `.runs/` of the worktree). Report path: `.runs/task-cycles/podzial-trzech-miejsc/reports/executor-5-report.md`.
- You run the slice's focused checks (its *Checks*), never the product's full gate (`npm test` with no path): the gate is the orchestrator's, run after a signal of the human's adviser. Your own-work check, the commands and exit codes of every check, **Unread material**, **Searches not found or unclear** and the line on your working copies stand in the report as the method gives them. Commit your work on the branch with a message in English in the style of the repository's history, adding files by path (never `git add -A`, `git add .` or `git commit -a`).
- Code in English (identifiers, comments); Polish only in what the code shows to the player or matches on.

Working copies (word for word from the cycle's rule): An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## Current state of the foundation (the foundation entries moved)

The agent of the plan's *Foundation entries* committed `8ca21555`, which changes D-323 in `foundations/decisions.md` (it adds a paragraph and lines to *Relations*, *Verification*, *Rationale* and *Rejected*: from line 4616 on, `foundations/decisions.md` stands 2 lines lower than the plan's ranges say). Find a decision by its heading `### D-<n>` and read it whole; the ranges of the plan were measured on `fc6e0046`. `foundations/invariants.md`, the part map and the guidelines are unchanged since the base unless your slice's own text says otherwise.

## Extra notes of the orchestrator for this slice

- Slice 4 (commit `d0c29c43`, your starting point) cleared the last place: `node tests/quality/eslint-size-rules.mjs` prints `0 functions and files over a threshold`, and `test_no_function_and_no_file_is_over_a_threshold` no longer carries `@unittest.expectedFailure`. Confirm both yourself before you write, as your goal says.
- The invariant's *Violated* line is the only change you make: do not touch `guidelines/coding.md` (its rule "Size of a function and a file" says what the mark was for and stays true as a rule), the tests or any code. Write it through the skill of the element as your goal says; the skill reads as files where you have no skill tool, and its steps name what to read when they come.
- Run `python -B .the-way/elements/common/foundation_check.py` (without the skip switch; it runs the test citations) before and after, with exit codes.
- Your commit message in English, in the style of the repository's history (`docs: :card_file_box: ...`).


## Your slice's section of the plan (copied word for word)

### Slice 5 — the invariant of the size rule no longer violated

- **Goal:** The invariant `function-and-file-size` in `foundations/invariants.md` reads `Violated: no`, written through the skill `the-way-record-invariant` — its `SKILL.md` and the files it names read as files when their steps come — as `.the-way/task-cycle/skill/foundation_step.md` gives (To do 6; row 2 of *Foundation entries*). Before writing, the agent confirms that the invariant holds on the slice's base: `node tests/quality/eslint-size-rules.mjs` prints no line, and `test_no_function_and_no_file_is_over_a_threshold` in `tests/quality/test_function_and_file_size.py` carries no expected-failure mark and passes; where either fails, it writes nothing and returns. Nothing else of the entry changes: its sentence, *Method*, *Rests on*, *Derives from* and *Part* stay. No code, test or guideline changes in this slice; the sentence of `guidelines/coding.md` "Size of a function and a file" on the mark and the violated invariant stays true as it stands.
- **Change:** `foundations/invariants.md`
- **Read:** `.runs/task-cycles/podzial-trzech-miejsc/task-frozen.md:24-33` To do ·
  `foundations/decisions.md:822-840` D-425 ·
  `foundations/part_map.md:90-125` build-tools · `foundations/part_map.md:155-162` product-foundation ·
  `guidelines/coding.md` · `tests/quality/test_function_and_file_size.py` · `tests/quality/eslint-size-rules.mjs` ·
  `.the-way/elements/invariants/skill/SKILL.md` · `.the-way/elements/invariants/skill/decide_entry.md` ·
  `.the-way/elements/invariants/skill/draft.md` · `.the-way/elements/invariants/skill/write.md` ·
  `.the-way/elements/invariants/template.md` · `.the-way/elements/common/way_of_working.md` ·
  `.the-way/elements/common/rules.md` · `.the-way/task-cycle/skill/foundation_step.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `node tests/quality/eslint-size-rules.mjs` prints no line ·
  `npm test -- tests/quality/test_function_and_file_size.py` passes both cases, with no expected failure ·
  `python -B .the-way/elements/common/foundation_check.py`
- **Depends on:** Slice 4 · function-and-file-size, row 2 of *Foundation entries*, written in this slice


## Return

Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`, as the method gives them), your commits, a one-line check result naming what failed or did not run, and the report path. The report holds, besides what the method asks, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`) and the line on your working copies.
