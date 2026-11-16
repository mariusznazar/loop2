# Handoff to the one author — the return step

You are the one author of this change, resumed for the return step. The person who requested this cycle has delegated every intermediate choice to the orchestrator; nothing you are told is that person's approval. Do not ask the human.

## Where you work

- Worktree `the root of the task's worktree`, branch `task/skill-scen-pikselowych`. The change is reviewed: the whole change `FAIL 9459331b`, the fix of its findings `PASS af282831` (`reports/review-fix-1-report.md`). Your range for this step starts at `af282831`. Commit with explicit paths only, in English.
- Your directory for working copies: `.runs/author/`. Your report: `docs/task-cycles/skill-scen-pikselowych/reports/return-step-report.md`.

## Method

Read `.the-way/task-cycle/skill/return_step.md` whole and follow it, and `.the-way/task-cycle/skill/foundation_step.md` whole, since the return step writes as the foundation step writes; the `SKILL.md` of an element (`elements/<element>/skill/SKILL.md`) whole when you write an entry of that element. The method file of your stage remains `.the-way/task-cycle/change/SKILL.md`.

## What to compare, and what the orchestrator hands you

- Compare with the code: D-415 and the entries it names (D-271, D-317, D-42, D-396, D-349, D-82), the part map of `agent-workflow` (and of `browser-view`, since D-415's scope is `browser-view`), and the entries the search of the foundation finds on the colour of an effect, the flash measure and the way an agent checks scene pictures. The code is now final; its numbers (the field 341 × 256 and the threshold 21,824 scaled by `--scale`) stand in the scripts and in `SKILL.md`.
- The reviewer's note outside the task (O1, `reports/review-whole-report.md`, "Minor — outside the task"): the styleguide's rule "The scene of a map run" in `guidelines/styleguide-browser-view.md` lists the decisions it rests on and does not list D-415, though the rule states nothing D-415 governs (it speaks of the dust against the ground, never against a prop). Judge it by the return step's rule: where an entry no longer matches the code or the foundation, correct it in this change; where it still matches, leave it. A file of the styleguide changes only through `.the-way/elements/styleguide/skill/SKILL.md` or `the-way-maintain-styleguide`'s method; if the correction needs that method and you judge the rule still matches, say so and leave it.
- The reviewer's new Minor note of the fix review (`reports/review-fix-1-report.md`): `SKILL.md` points to "a full-size PNG screenshot" for colour samples and does not say how to take one. It is a Minor finding of a review of a fix: it is not fixed in this change and goes to the request's list; do not change the skill for it unless the return step's comparison finds the text contradicts the foundation.
- Entries the task and the settlement row 1 carry are written (D-415). No environment fact is needed unless the change rests on a source outside the product that the foundation lacks (the Playwright screencast's scale of at most 800 px stands in the skill; judge whether it is such a source, by `elements/environment-facts/skill/SKILL.md`).

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed.

## What you return

Status, commits (or `none` where the comparison finds nothing to correct), a one-line check result and the report path. The report holds, in the form of the record's *Return step*: the foundation compared with the code (what no longer matched and its correction, or none), decisions, invariants, environment facts, glossary terms, part-map changes written or changed, projected entries written, and for the row of *Settlements to record* the place it went to; and **Unread material** and **Searches not found or unclear** (each `none` or the items), your own-work check where you changed anything, and working copies. If you commit, run `python -B .the-way/elements/common/foundation_check.py` and report its exit code.
