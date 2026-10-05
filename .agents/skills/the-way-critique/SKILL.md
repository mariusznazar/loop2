---
name: the-way-critique
description: Use when an agent's proposal needs an independent critical reading, or when a complete set of proposals will be reviewed together by a human. Checks purpose, evidence, cost, source fidelity and contradictions before the author gives a verdict. Use this product's pinned the-way commit.
---

# the-way-critique

The process for this repository is pinned as the Git submodule `.the-way`. Its commit is `96c52488752701ffa321ca69c0c2aa2dd3e46d2d`.

If `.the-way/elements/common/critique/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show `96c52488752701ffa321ca69c0c2aa2dd3e46d2d`. If initialization fails or either commit differs, stop.

Read `.the-way/elements/common/critique/SKILL.md` in full and follow it. Read the files it references inside `.the-way`. Its paragraph about resolving a global skill link applies only to a global install; here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map`, `record-environment-fact`, `find-foundation-entries`, `define-project`, `settle-technology`, `refine-task`, `implement-task` or `critique` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
