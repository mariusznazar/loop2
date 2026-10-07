---
name: the-way-record-decision
description: Use when a decision has to be written into a product's decision log, foundations/decisions.md — a choice just settled in conversation that binds later work, a new answer to a question the log already holds, a decision recovered from existing code, a due review of a decision whose review-when date has come, or a decision a project definition projects. Use this product's pinned the-way commit.
---

# the-way-record-decision

The process for this repository is pinned as the Git submodule `.the-way`. Its commit is `c64a6071384fb57cdb9d7e9db4560ddc43e3b355`.

If `.the-way/elements/decisions/skill/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show `c64a6071384fb57cdb9d7e9db4560ddc43e3b355`. If initialization fails or either commit differs, stop.

Read `.the-way/elements/decisions/skill/SKILL.md` in full and follow it. Read the files it references inside `.the-way`. Its paragraph about resolving a global skill link applies only to a global install; here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map`, `record-environment-fact`, `find-foundation-entries`, `define-project`, `settle-technology`, `refine-task`, `implement-task` or `critique` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
