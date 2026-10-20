---
name: the-way-find-foundation-entries
description: Use when a source has to be searched for what should become entries of a product's foundation — decisions, invariants, glossary terms, environment facts, changes to the part map — before any is written; for now, a project definition whose settlements are to be projected before the project is broken into tasks, or a task whose refinement's settlements are to be kept for its cycle. Use this product's pinned the-way commit.
---

# the-way-find-foundation-entries

The process for this repository is pinned as the Git submodule `.the-way`. Its commit is `f0b5eb131de5d681ee3fcdeb264e9f88778af2ec`.

If `.the-way/elements/common/skill/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show `f0b5eb131de5d681ee3fcdeb264e9f88778af2ec`. If initialization fails or either commit differs, stop.

Read `.the-way/elements/common/skill/SKILL.md` in full and follow it. Read the files it references inside `.the-way`. Where it says where the-way lies, the product's case applies: here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map`, `record-environment-fact`, `find-foundation-entries`, `define-project`, `plan-project`, `lead-project`, `settle-technology`, `refine-task`, `implement-task`, `plan-task`, `critique`, `maintain-styleguide` or `maintain-coding-guidelines` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
