---
name: the-way-refine-task
description: Use to define or refine one product task before its the-way implementation cycle, whether independent, in a project plan, or based on a project's settlements without belonging to it. Not for defining a project or writing the implementation plan. Use this product's pinned the-way commit.
---

# the-way-refine-task

The process for this repository is pinned as the Git submodule `.the-way`. Its commit is `7cfeb4c2349b181d251d1a03cb2005b980acbe9e`.

If `.the-way/project-level/task/skill/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show `7cfeb4c2349b181d251d1a03cb2005b980acbe9e`. If initialization fails or either commit differs, stop.

Read `.the-way/project-level/task/skill/SKILL.md` in full and follow it. Read the files it references inside `.the-way`. Its paragraph about resolving a global skill link applies only to a global install; here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map`, `record-environment-fact`, `find-foundation-entries`, `define-project`, `settle-technology`, `refine-task`, `implement-task` or `critique` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
