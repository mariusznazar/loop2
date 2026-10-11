---
name: the-way-plan-task
description: Use when a ready the-way task's change has to be divided into slices before it is made — the plan a task cycle writes for every task, from the frozen task, its spec where one exists, the foundation and the code, or writes again after a spec or after a slice proved too large. Not for a project's plan of tasks, and never writes code. Use this product's pinned the-way commit.
---

# the-way-plan-task

The process for this repository is pinned as the Git submodule `.the-way`. Its commit is `d04c3feb1a47e0ffc9a3b2354c23aacafe25c74b`.

If `.the-way/task-cycle/plan/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show `d04c3feb1a47e0ffc9a3b2354c23aacafe25c74b`. If initialization fails or either commit differs, stop.

Read `.the-way/task-cycle/plan/SKILL.md` in full and follow it. Read the files it references inside `.the-way`. Where it says where the-way lies, the product's case applies: here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map`, `record-environment-fact`, `find-foundation-entries`, `define-project`, `plan-project`, `settle-technology`, `refine-task`, `implement-task`, `plan-task` or `critique` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
