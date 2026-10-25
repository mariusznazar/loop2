---
name: the-way-make-change
description: Use to make the code of one change in a the-way task cycle — as the one author of a change without a plan, as the executor of a planned slice, as the agent fixing a review's findings, or for a correction after the human's remarks on the request. Covers reading, tests, the own-work check, when to return without code, commits and the report. Use this product's pinned the-way commit.
---

# the-way-make-change

The process for this repository is pinned as the Git submodule `.the-way`, at the commit its gitlink records.

If `.the-way/task-cycle/change/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show the same commit. If initialization fails or the commits differ, stop.

Read `.the-way/task-cycle/change/SKILL.md` in full and follow it. Read the files it references inside `.the-way`. Where it says where the-way lies, the product's case applies: here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map`, `record-environment-fact`, `find-foundation-entries`, `define-project`, `plan-project`, `lead-project`, `settle-technology`, `refine-task`, `implement-task`, `plan-task`, `write-spec`, `make-change`, `review-change`, `critique`, `maintain-styleguide`, `maintain-coding-guidelines` or `maintain-testing-guidelines` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
