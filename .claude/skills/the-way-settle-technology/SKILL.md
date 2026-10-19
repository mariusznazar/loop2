---
name: the-way-settle-technology
description: Use when a project definition of a product that uses the-way has to settle the technology and architecture choices its project needs before the readiness gate — a language, a framework, a library, a store of data, a way of logging in, a place to run — or to resume that step from the definition's Technology section. Use this product's pinned the-way commit.
---

# the-way-settle-technology

The process for this repository is pinned as the Git submodule `.the-way`. Its commit is `d829e3aa6242a9b8901274531dd82fd5c7d87628`.

If `.the-way/project-level/technology/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show `d829e3aa6242a9b8901274531dd82fd5c7d87628`. If initialization fails or either commit differs, stop.

Read `.the-way/project-level/technology/SKILL.md` in full and follow it. Read the files it references inside `.the-way`. Where it says where the-way lies, the product's case applies: here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map`, `record-environment-fact`, `find-foundation-entries`, `define-project`, `plan-project`, `lead-project`, `settle-technology`, `refine-task`, `implement-task`, `plan-task`, `critique`, `maintain-styleguide` or `maintain-coding-guidelines` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
