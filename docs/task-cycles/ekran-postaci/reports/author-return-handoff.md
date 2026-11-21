# Handoff — the return step, task `ekran-postaci` (you resume as the one author)

## Who you are working for

As before: the person who requested this cycle has delegated intermediate choices to the orchestrator; nothing you
decide is the human's approval; you never ask the human anything.

## Where and what

- The same worktree `.runs/worktrees/ekran-postaci`, branch `task/ekran-postaci`, head
  `7a10eaf074825de3b7177bb281ff348d8e186059` (the code the review of the whole change and the review of the fix
  both passed). Your directory for working copies is `.runs/author-return/`.
- The stage: the return step (step 11 of the cycle). Read `.the-way/task-cycle/skill/return_step.md` whole; it
  names what you do. It is the stage of `make-change` (`.the-way/task-cycle/change/SKILL.md`) that writes as the
  foundation step writes, so read `.the-way/task-cycle/skill/foundation_step.md` whole as well, and the `SKILL.md` of an
  element at the path it gives when you write an entry of that element.
- What you compare with the code at the head: the entries the change writes or changes (D-445, D-446, D-447,
  D-199, D-40, D-271, D-272, D-418, D-201, D-215), those the task's *Decisions in play* names, the entries the
  search of the foundation finds for the words and the places the change touches (the practice bar and its
  colours, the figure, the status frame, the archetype's icon and its credit, the screenshots, the line of
  practice on the run screen of a solved map), the invariants whose *Part* is `browser-view` or `simulation`
  that the change reaches (among them `icon-file-content`, `icon-credits`, `content-identifiers`,
  `browser-view-token-values`, `function-and-file-size`), the glossary entries of the words the change uses
  („wprawa”, „ludzik”/figure, „ramka”/frame if they have entries), and the part map's entries of `browser-view`,
  `simulation`, `product-foundation` and `agent-workflow` — whether the files the change added
  (`src/browser/view/character-figure.tsx`, `character-status.ts`, `character-trees.tsx`,
  `assets/icons/cultist.svg`) fall under the part map's patterns and whether any entry no longer matches the code
  after the fix (the track of the practice bar is now in `text-disabled`; D-40 and the styleguide say so).
- Correct in this same change whatever no longer matches. Write the environment fact, the glossary term, the
  invariant or the decision the step gives you where the rules of the step require it, and nothing else: no
  entry is deferred, and the findings of the two reviews (the new use of `text-disabled` for a track awaiting the
  human's approval; no contrast threshold for `text-disabled`) are no foundation entries — do not write an
  invariant or a threshold for them.
- Your result is the record's *Return step* as `task-cycle/record_template.md` gives it (in your report: foundation
  compared with code, decisions written or changed, invariants written or changed, environment facts, glossary
  terms, part-map changes, projected entries written, rows of *Settlements to record* written). If you write
  nothing, say `none` for each, with what you compared.
- Where you commit, commit by explicit path with an English message in the repository's form; run only focused
  checks (`python -B .the-way/elements/common/foundation_check.py` after a foundation change, the tests of a file
  you touch, each with command and exit code). **Run no full gate** — the user's instruction for this cycle.
- The other files of the record directory (`cycle.md`, other reports) are not yours to read.

## Working copies

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Your report

Write it to `.runs/task-cycles/ekran-postaci/reports/author-return-report.md` (the name begins with the role; the file is
the input of `task-cycle/remarks_check.py`). First line: your status. Then the record's *Return step* items, the
commits (or `none`) with their range, each check with command and exit code, **Unread material**, **Searches not
found or unclear** (each `none` where nothing), and the line on your working copies. Return the status, the commits,
a one-line check result and the report's path.
