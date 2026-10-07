---
name: the-way-implement-task
description: Use to take one ready the-way task through autonomous design, planning, implementation, testing, review and a pull or merge request, or to apply review corrections to its open request. Requires subagents and the Superpowers skills named by this process. The human reviews the request, not intermediate steps. Use this product's pinned the-way commit.
---

# the-way-implement-task

The process for this repository is pinned as the Git submodule `.the-way`. Its commit is `c64a6071384fb57cdb9d7e9db4560ddc43e3b355`.

If `.the-way/task-cycle/skill/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show `c64a6071384fb57cdb9d7e9db4560ddc43e3b355`. If initialization fails or either commit differs, stop.

Read `.the-way/task-cycle/skill/SKILL.md` in full and follow it. Read the files it references inside `.the-way`. Its paragraph about resolving a global skill link applies only to a global install; here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map`, `record-environment-fact`, `find-foundation-entries`, `define-project`, `settle-technology`, `refine-task`, `implement-task` or `critique` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
