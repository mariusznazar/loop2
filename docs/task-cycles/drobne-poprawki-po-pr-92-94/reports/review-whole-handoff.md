# Handoff to the reviewer of the whole change — task `drobne-poprawki-po-pr-92-94`

## Who you are and what you review

You review the whole change of this task, in the cycle `implement-task` of the-way, as an agent that did not make it. The method of your stage is `.the-way/task-cycle/review/SKILL.md` (`review-change`); read it whole, and `whole_change.md` beside it, as it says. Your review is: **the whole change**. You are read-only: change no tracked file, commit nothing. You do not run the full gate (`npm test`); that is the orchestrator's. You may run focused checks (a changed test file, `python -B .the-way/elements/common/foundation_check.py`, `python -B .the-way/instruction-files/check_instructions.py`).

The user's delegation to this cycle: the person who requested it has delegated intermediate choices to the orchestrator; no answer you get is the human's approval. The strongest model allowed in this cycle is `opus`.

Worktree (work from its root the root of the task's worktree): branch `task/drobne-poprawki-po-pr-92-94`. Range to review: base `d8e318c3437f73952b3bd8b1c8284b49d771848e` to head `9a778cdb` (8 commits by one author, 46 files). Do not touch the files while you review.

The frozen task: `.runs/task-cycles/drobne-poprawki-po-pr-92-94/task.md` (Polish; twelve items in *To do*, *Acceptance criteria*, *Questions to settle* with answers, *Out of scope*). No spec and no plan (one author). The author's report: `.runs/task-cycles/drobne-poprawki-po-pr-92-94/reports/author-report.md`.

Your directory for working copies: `.runs/review-whole/`. Your report path: `.runs/task-cycles/drobne-poprawki-po-pr-92-94/reports/review-whole-report.md`.

## Answers of step 4 (they aim your review)

- **Trust boundary: yes.** (1) Item 6 rewrites English comments, docstrings and test-case names ("loop" → "earning loop") in many files; the part map names boundary files among them (`src/server/**`, `src/browser/sim/saved-game.ts`, `src/browser/sim/previous-programs.ts`, `src/browser/view/screen-address.ts`, `email-confirmation.ts`, `password-reset.ts`, `deploy/**`, `compose.yaml`, `Dockerfile`, `.github/workflows/*.yml`, `scripts/audit_dependencies.py`, `scripts/kitchen-sink.mjs`, `scripts/local-start.mjs`, `assets/**`, `/package-lock.json`). Check, by reading the diff of each such file, that it changes in comment, docstring or test-case-name text only. (2) Item 8 makes the quality test install from the Python Package Index at test time. Check with crafted conditions that the install always uses `--require-hashes` with `requirements-quality.txt`, never an unpinned source, nothing on the network when the environment is complete, and that a half-made or other-version environment is never taken for ready.
- **Irreversible operation: no.** Item 11 read the game's log on the test server (read only); the change prepares nothing irreversible. Check that no address and no account identifier entered any file, report or commit.
- No open design choice; no reserved choice.

## Two passes, kept apart

A change that touches both documents and code is reviewed in two separate passes, each with its own scope, because a review that sees both at once gives its remarks almost only on the code. Make **pass A** over the code and tests (items 4, 5, 6 in code and tests, 8, and the Python/JS files of the range) and **pass B** over the foundation, the documents and the skills (items 1–3, 7, 9, 10, 11, 12; `foundations/**`, `README.md`, `AGENTS.md`, `.claude/skills/**`, `.agents/skills/**`, comment text of item 6 in `foundations`). Write the findings of each pass under its own heading in your report. Pass B includes: does each sentence the author wrote say what its source says (the task's quoted statements, the measurement in the task's *Context*, the reading of the computer in the fact, the log lines); is any number or date unfounded; does the wording follow the element's template; are the two copies of the `loop2-deploy` skill equal; do the new decisions D-423 and D-424 and the changed D-207, D-396, D-153 keep the form the template gives; does the glossary or another entry now say what is no longer true (WAY-97).

## Form of your findings

For each finding: the anchor `file:line` (or the number of an existing place), the full wording of the remark, and the expanded reason — what the code or text is for, the mechanism of the fault, an example with concrete values, and the fix. No finding without an anchor. In your report keep the findings in full, never shortened. Grade and scope them as `review-change` gives; the findings that bear on data ("this field is often empty") need a source outside the code, or say that you have none.

## Decisions taken knowingly in the change (do not report them as faults; report a fault in the code that carries them)

1. **No lock** against two runs of the quality test at once in one directory (the author's reason: a lock left by a killed run would block every later run). It is named in D-424 as an accepted cost. Judge whether the cost is named correctly and whether the failure of two concurrent runs is a message or a silent wrong result.
2. **D-423** (the default item of „Zapas poniżej”) and **D-424** (the quality environment made by the quality test) are new decisions, written by the foundation step; the human accepts them by merging. Judge their form and whether their *Rejected* lists hold the task's answers 4, 8 and 9.
3. **Item 8 in `setUpClass`**: the whole class fails once with one message when the environment cannot be made, so ESLint, Prettier and audit checks of the same class do not run in that run either. The task's answer 9 asks for one message instead of a `ruff` or `shellcheck` error.
4. **`venv --clear`** to repair, and **`pip list`** to read the versions (not `--version` of each tool).
5. **README is English** in the sections the change touches (the orchestrator's earlier handoff to the author said Polish, which was wrong); the quoted Polish words of the task are the task's own.
6. **Item 11**: D-153 already held the password-reset observation of 2026-11-14; the task says the operator's test of that day was the confirmation message, with no hour or sender; the log showed two confirmation messages handed over on 2026-11-14 with an `email-confirmed` event each and no mail failure. The author did not state "external mailbox" as established; D-153 keeps the delivery as the operator's observation. Judge that the wording of D-153 and the fact `loop2-app-log-confirmation-mail-events` follow the sources and over-claim nothing; the log itself you cannot read, and you are not asked to.
7. **Item 12**: the table rows of the deploy skill name the search in words and point to the section "How an agent reads it" (no pipe inside a table cell).
8. **Left outside the task, on purpose:** the decision on the pace (about line 5438 of `foundations/decisions.md`: "at 1× the 480 game minutes of Las take 8 real minutes", "a whole map run of Las … pass unseen") says something of the same kind as items 2–3; the task lists only D-207. Say whether it is a fault in the same sense; the cycle does not fix it (outside the task), it goes to the request's list.

## What the orchestrator carries from the author's report (gaps the author named — judge them yourself)

- The author did not read `guidelines/styleguide-browser-view.md` whole, nor `guidelines/coding-simulation-module.md`, and read D-18, D-23 and D-175 as index lines only. You select your own foundation and guidelines by "Reading the foundation" and `product-guidelines/reading.md` and read each guideline file of the touched parts whole: the change touches the parts `product-foundation`, `simulation`, `browser-view`, `build-tools` and `agent-workflow`. Item 4 changes `src/browser/view/program-editor.ts` and `src/browser/sim/data/conditions.ts`; item 6 changes comments in view, CSS and test files.
- Item 6's author counted 345 uses replaced in 34 files and left alone: „loop clock” (36), the predecessor game's name, event loops, animation loops, programming loops. Check a sample of the lines that stayed „loop” and of those changed, in both directions (a changed „loop” that is no earning loop, and an earning loop left as „loop”), in files of all the parts; a changed test-case name that a test or a document quotes by name.
- Item 4: the test must choose by identifier, never by place in the data (`guidelines/testing.md`, „Test inputs and expected values”); check that nothing the player sees changed.
- Item 8's evidence: the author shows a failing run (no network, environment absent) and passing runs; judge whether the test of the logic (`tests/quality/test_quality_environment.py`) would fail for the faults the author lists.

## Report

Return as `review-change` gives: first line `PASS <sha>` or `FAIL <sha>`, findings by grade, the checks you ran with command and exit code, how many decisions of your index you read whole, your **Unread material** and **Searches not found or unclear**, and the working copies. Give the full path of your report in your short return.

## First paragraph of "Working copies" of the cycle, word for word

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed.
