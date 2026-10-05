---
name: the-way-define-project
description: Use when a project of a product that uses the-way has to be defined before it is broken into tasks — an idea, a concept or a note to turn into a project definition, a definition to resume from its status line, or a definition to take through the readiness gate. Use this product's pinned the-way commit.
---

# the-way-define-project

The process for this repository is pinned as the Git submodule `.the-way`. Its commit is `271222203981b5cedd2fcbf3451b60362cc3e4d4`.

If `.the-way/project-level/skill/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show `271222203981b5cedd2fcbf3451b60362cc3e4d4`. If initialization fails or either commit differs, stop.

Read `.the-way/project-level/skill/SKILL.md` in full and follow it. Read the files it references inside `.the-way`. Its paragraph about resolving a global skill link applies only to a global install; here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map`, `record-environment-fact`, `find-foundation-entries`, `define-project`, `settle-technology`, `refine-task`, `implement-task` or `critique` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
