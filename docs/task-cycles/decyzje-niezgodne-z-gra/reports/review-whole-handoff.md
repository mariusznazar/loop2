# Handoff — review of the whole change (stage: `review-change`, the whole change)

You are a fresh reviewer, an agent that did not make this change. This file is your whole handoff.

## Delegation

The human delegated the intermediate choices of this cycle to the orchestrator; the human reviews the request only. You grade and scope your findings alone: nobody has told you any finding is wrong, Minor or outside the scope. Do not run the product's gate (the whole `npm test` / `scripts/test.py`): it is the orchestrator's. You may run focused checks (a test file, the foundation check, the comparison script, `git diff`).

## Where you work

- Worktree (your working directory): `the root of the task's worktree`, branch `task/decyzje-niezgodne-z-gra`. Read-only for you: change no tracked file. Work from the worktree's root.
- Range to review: base `5327f55a6440ebd656fd88e9a53e65768f8fb109` to head `6be2ec6c` (three commits: `6999c168`, `dc26dd83`, `6be2ec6c`; 49 files, +234 −232). Read the full diff of the range.
- The pinned the-way is `.the-way` in the worktree (commit `bfb2e109735b5fff98802b8be0ff3c43c799262a`, equal to the gitlink). Read the process from there.
- Your directory for working copies: `.runs/review-whole/`.
- Your report: `.runs/task-cycles/decyzje-niezgodne-z-gra/reports/review-whole-report.md`; its first line `PASS <sha>` or `FAIL <sha>` (or `questions`).

## Method

Read whole `.the-way/task-cycle/review/SKILL.md` (the method `review-change`), your variant is **the whole change**; read the files it names (for instance `whole_change.md`) when the step comes. You select your own foundation and guidelines by the parts of the change, as `.the-way/elements/common/way_of_working.md` ("Reading the foundation") and `.the-way/product-guidelines/reading.md` give, and state in the report how many decisions you read whole and how many by title only.

## What is reviewed

- The frozen task: `.runs/task-cycles/decyzje-niezgodne-z-gra/task.md` — read whole. Judge every item of *To do* (1–8), the acceptance criterion, each of the 15 rows of *Settlements to record*, the answers of *Questions to settle*, and source fidelity (the new wording of each sentence where the task quotes it; the settlements are the only authority).
- The author's report: `.runs/task-cycles/decyzje-niezgodne-z-gra/reports/author-report.md` and its classification table of item 7: `.runs/task-cycles/decyzje-niezgodne-z-gra/reports/author-owner-classification.md`. Treat the report as the author's claim, not as evidence.
- Comparison script of the acceptance criterion: `.runs/task-cycles/decyzje-niezgodne-z-gra/reports/inv-names-check.py` (run from the worktree's root: `python -B <that path> <output file under .runs/review-whole/>`; the base lists six decisions).

## Answers of the orchestrator at start

- Trust boundary: **yes, formally**. The change is meant to edit only comments, names and texts, but it touches files of the parts' trust boundaries: `deploy/loop2-watch`, four files of `src/server/` (`account-backup.ts`, `account-block.ts`, `account-previous-save.ts`, `database.ts`) and (per the author) not `src/browser/sim/saved-game.ts`. Check that in those files only comments changed and no executable line, identifier, string or behaviour (crafted input has nothing to hit if so; say how you checked: the diff and, where cheap, the compiled output or a token-level comparison).
- Irreversible operation: no.
- Open design choice: none; reserved choice: none; route: one author without a plan (no plan, no slices, no spec).
- The pin was not moved by this task.
- Checks failing on the base (from the earlier cycle's final gate): `test_built_image_serves_every_icon_and_the_page` (flaky, part `deployment`). The author could not run `ruff-source-rules` and `shellcheck-source-rules` in the worktree (tools not installed there; the orchestrator installs them before the gate).

## Things the orchestrator asks you to judge in particular (do not treat them as settled)

1. **Item 7** (“owner” → “operator”): the author changed 176 occurrences on 151 lines and kept 12 doubtful cases unchanged (listed in the author's report and table). Judge: (a) is any changed occurrence actually the account *role* `owner`, an identifier, a string the program prints or matches, a Unix file owner, or the GitHub owner of the repository (a wrong change); (b) is any kept occurrence clearly the person who runs the server in a place the task names (a decision of `foundations/decisions.md`, the deploy skill and its references, a code comment, a title of a test); (c) are the twin copies `.claude/skills/loop2-deploy` and `.agents/skills/loop2-deploy` still identical; (d) a quotation of a changed sentence elsewhere (tests' `decision:` lines, the foundation) still matches.
2. **Item 8**: the author wrote the environment fact `git-path-patterns` (copied from the-way's own foundation, source the gitattributes page of Git 2.55.0, re-read 2026-11-16) and put it in *Rests on* of `cross-part-imports`. The task says: the cycle looks for the source of that fact in the foundation and in the process of the-way; where found, writes the fact with the source; where not, leaves `TODO`. Judge whether this is the fact the `TODO` waited for, whether its text is true to the source it names (you may open the page), and whether it is written in the form of the element (`.the-way/elements/environment-facts/`).
3. **Item 6**: each of the 19 comments/names — is the new text true of its case (open the case), does it cite the decision that states it, no line numbers of the log, no document outside the foundation (D-82), and was the one added assertion (`tests/view/rule-editor.test.mjs`) needed and correct.
4. **Items 1–5 and 15 rows**: the sentences exactly as the task gives, the lists, *Derives from* fields, the acceptance script's result; no sentence changed that the task did not name.
5. Gaps the author's report names as unread: `guidelines/styleguide-browser-view.md` (not read; the author says it changed no TSX/CSS/style in `browser-view`, only tests), `foundations/part_map.md` (read in part), the invariants `account-client-requests`, `trip-run-end`, `catch-up-state` (not read; only decision lists changed). Read what you need to judge that nothing there is broken. Also: `tests/sim/encounters.test.mjs:872` carries a second line-number pointer the task does not list — you decide whether it is within the task's scope.

Out of scope (the task's own list, *Out of scope*): the rules-of-process remarks, the 32 remarks where the decision is true and tests check less, the 39 stale remarks, D-397/D-398 and their invariants. Findings of those kinds are outside the task's scope.

## Working copies (word for word from the process)

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

## What you return

Your report in the file above, as your method gives it (graded findings with place in code, reasoning, and whether a finding is outside the task's scope; the checks you ran with command and exit code; **Unread material**; **Searches not found or unclear**; working copies). Return to me: status line, the list of Minor findings within the task if any, a one-line check result, and the report's path.
