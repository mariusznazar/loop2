---
name: the-way-plan-project
description: Use when an approved project definition of a product that uses the-way has to be broken into tasks — the breakdown that writes the project plan, a plan to resume from its status line, or a plan to check again after its definition passed the readiness gate anew. Not for a task's plan of slices, and never refines a task. Use this product's pinned the-way commit.
---

# the-way-plan-project

The process for this repository is pinned as the Git submodule `.the-way`. Its commit is `d04c3feb1a47e0ffc9a3b2354c23aacafe25c74b`.

If `.the-way/project-level/plan/skill/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show `d04c3feb1a47e0ffc9a3b2354c23aacafe25c74b`. If initialization fails or either commit differs, stop.

Read `.the-way/project-level/plan/skill/SKILL.md` in full and follow it. Read the files it references inside `.the-way`. Where it says where the-way lies, the product's case applies: here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map`, `record-environment-fact`, `find-foundation-entries`, `define-project`, `plan-project`, `settle-technology`, `refine-task`, `implement-task`, `plan-task` or `critique` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
