# Handoff — the one author, `make-change`, "the whole change as the one author"

You are the one author of the change of task `wzorzec-kodu-przyrzadu` of loop2. The person who requested this cycle has delegated intermediate choices to the orchestrator; no answer you get is that person's approval.

## Where and what

- Worktree (your working directory for everything, the root of the product): `the root of the task's worktree`, branch `task/wzorzec-kodu-przyrzadu`, base `4ee41c5f1d54172f646172da9b3f248dcaf5755e` (origin/main). Run the-way's scripts from that root as `.the-way/<path>`. `.the-way` is initialized at `19e5774a`, equal to the gitlink.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole, your variant is "the whole change as the one author"; read a file it names only when the step or variant that names it comes. The foundation step is `.the-way/task-cycle/skill/foundation_step.md` — read it whole; it names the element skill files you follow for each entry you write (`elements/decisions/skill/SKILL.md`, `elements/invariants/skill/SKILL.md`, `elements/part-map/skill/SKILL.md`, each from `.the-way/`). You have no skill tool: read each as a file.
- Stage and boundary: you write the foundation entries of the task together with its code and tests, commit them on the task branch, and return before any review. You do not run the product's gate (`npm test`): its run is the orchestrator's or CI's. Run only focused checks (see below). No spec and no plan exist: the task settles every row; you make the choices of how to make it and name them in your report.
- The frozen task, in full, is `.runs/task-cycles/wzorzec-kodu-przyrzadu/task.md` (original path outside the repository; it is the only source of requirements — requirements stay in that file, read it whole). Its *Questions to settle* are answered; its *Settlements to record* has five rows, all accepted; *Questions carried to cycle* is `none`; *Human actions* is `none`.
- Answers of the two questions at start: touches a trust boundary — no; holds an operation that cannot be undone — no. No open design choice was found; the task's *Context* says the cycle chooses which file of the instrument holds each of the four shared things (the cap, the result expression, the mean, milliseconds per minute): choose by what the importing files already import so that no new import cycle appears and every file keeps its part (`balance-tools` depends only on `simulation`); name each choice in your report.
- Your directory for working copies: `.runs/author/` of the worktree.
- Report path: `.runs/task-cycles/wzorzec-kodu-przyrzadu/reports/author-report.md`. This file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it), the case Claude Code's note on files named `report…` leaves open. If your write is refused all the same, return the report whole as your answer.
- The files of the cycle's record directory (`cycle.md`, other agents' handoffs, reports and findings) are not yours to read unless this handoff names them.

## Working copies (word for word from the cycle's method)

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
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.

The outputs of the measuring commands below, which the task forbids to bring into the repository, go into `.runs/author/` too and are removed before you return; keep in your report the commands, their flags and seeds, and the result of each comparison.

## What to read first (the orchestrator's selection)

Guideline files, each whole:
- `guidelines/coding.md` (the kind index, the rules) and `guidelines/testing.md` (you write two tests);
- `guidelines/coding-simulation-module.md` and `guidelines/coding-saved-game.md`, as two files of the kind form the product already holds — read their vocabulary, but write the new file by `.the-way/product-guidelines/coding/template.md`, sections "Required form of a kind" and "Writing the files", and by the task. The existing guideline files are written in Polish; follow the language of the product's existing `guidelines/coding-*.md` for the new one;
- `.claude/skills/loop2-balance/SKILL.md` — the commands and flags of the instrument, and how to run it.

Foundation entries (use `python -B .the-way/elements/common/decision_index.py --output .runs/author/decisions-index.md --part balance-tools --part agent-workflow --decision 28 --decision 427 --decision 429 --decision 351 --decision 18 ...` and `--sections` as `.the-way/elements/common/way_of_working.md` "Reading the foundation" gives; the task's *Decisions in play* are D-28, D-427, D-429, D-351):
- decisions D-28, D-427, D-429, D-351 whole; D-18, D-22, D-425 (size limits), and the decisions that select an exemplar for a kind — D-35 and D-162 — as models for the decision of row 1;
- invariants `instrument-game-agreement`, `cross-part-imports`, `simulation-randomness`, `simulation-isolation` whole, and `.the-way/elements/invariants/template.md` section "Links" (the paragraph that starts "An entry a human chose from what the product already did") for *Derives from* of the invariant of row 5;
- the part-map entries of `balance-tools`, `agent-workflow`, `product-foundation` and `test-helpers`, and `.the-way/elements/part-map/template.md` ("Tests belong to the part they test.");
- glossary entries of the terms you use.

Code and tests: the eight files `balance/*.mjs`; `tests/balance/*.test.mjs`; `tests/invariants/test_simulation_randomness.py` and `tests/invariants/test_simulation_isolation.py` (the patterns the task says the new test may take); the tests that today check D-429 and name its *Verification*; `tests/sim/reference-programs.mjs`. Read `.the-way/product-guidelines/coding/recognize.md` only if the template sends you to it.

## The task, in short — the task document is the requirement; this list only routes

1. The guidelines file `guidelines/coding-balance-instrument.md` (kind `balance-instrument`), the row in the kind index of `guidelines/coding.md` (To do 1–5).
2. Foundation entries: one decision (row 1 — the exemplar `balance/engine.mjs` and the boundary of the kind; wording yours, meaning the row's), two invariants (rows 4 and 5), the `Verification` field of D-429 extended with the invariant of row 4 (its sentences unchanged), the part-map line of the new test file(s) in `balance-tools` through `update-part-map` (To do 6). Rows 2 and 3 go to the guidelines file only (*Decision* `none`, *Invariant* `none`).
3. Two tests, one for each new invariant, each seen once as a failure before it passes (record the failing run and the passing run with commands and exit codes in your report) — the failure is seen against a temporary copy or a temporary edit of a file of `balance/` that you revert, or by whichever method `guidelines/testing.md` gives for the first test of an invariant.
4. Remove the four repeats in `balance/` (To do 7). The acceptance criteria require output equality before and after: build the game once from the base, run `sweep`, `trace`, `loop`, `campaign` and `check-map` at least once each without `--cap`, plus `sweep` and `trace` with a small `--cap` (for example 30), and `campaign` with a player description outside the repository (in `.runs/author/`) with a small `capMinutes` so that its `cap` branch runs, on the base commit's code and again on your head; compare outputs byte for byte; give flags and seeds in the report. Where you cannot cover a branch, name it as unchecked. Do not bring any output into the repository (D-429). Set up the worktree's dependencies and build as `.claude/skills/loop2-balance/SKILL.md` and `AGENTS.md` give; those files are the product's own tools' files and not a working copy.

## Checks you run

Focused checks only: the tests of `tests/balance/` and the two new tests; ESLint and Prettier on the files you change as the product's scripts give them; `python -B .the-way/elements/common/foundation_check.py` (the whole check, without `--skip-test-citations`); `python -B .the-way/instruction-files/check_instructions.py`. Report each with its command and exit code. The own-work check of `make-change` is yours too: name the weakest point of your work and the check that tested it.

## Commits

By path (`git add <path>…`, never `git add -A`, `.`, or `commit -a`), messages in English in the form of the repository's recent commits (`git log -15`), e.g. `docs: :card_file_box: …` for foundation and guidelines, `refactor: …` for code. One commit for each coherent part is fine: the foundation entries, the code, the tests. The email of the commits must be the private one (`git log --format='%h %ae'` after the first commit). Do not push, do not merge, do not open a request.

## Report contents

As `make-change` gives, with these headings present: **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`), your own-work check, each check with its command and exit code, for each foundation entry one sentence of its meaning in English and one in Polish and its mark (`row <n>`, `projected` or `the cycle's`), the choices you made (where each of the four shared things now stands and why), each reach beyond this handoff, working copies (where each stood and that it was removed).
