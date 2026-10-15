---
name: the-way-lead-project
description: Use to lead a handed-over project plan through human-confirmed rounds of task refinement and evidence-backed state upkeep, or resume that work from its files. Not for defining or breaking down a project, refining one task directly, running task cycles or closing a project. Requires child agents. Use this product's pinned the-way commit.
---

# the-way-lead-project

The process for this repository is pinned as the Git submodule `.the-way`. Its commit is `dc433059ffc7f94f9aaa43588dfe94ac869fb635`.

If `.the-way/project-level/lead/skill/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show `dc433059ffc7f94f9aaa43588dfe94ac869fb635`. If initialization fails or either commit differs, stop.

Read `.the-way/project-level/lead/skill/SKILL.md` in full and follow it. Read the files it references inside `.the-way`. Where it says where the-way lies, the product's case applies: here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map`, `record-environment-fact`, `find-foundation-entries`, `define-project`, `plan-project`, `lead-project`, `settle-technology`, `refine-task`, `implement-task`, `plan-task` or `critique` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
