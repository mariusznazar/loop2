---
name: the-way-record-environment-fact
description: Use when a product's environment facts file, foundations/environment_facts.md, has to gain or change an entry — a fact an invariant's Rests on or a decision's Based on needs, a citation whose change would send its decision to review, a fact a task's return step found, a failed run of a fact's method, a fact shown false or left with nothing resting on it, or a fact a project definition projects. Use this product's pinned the-way commit.
---

# the-way-record-environment-fact

The process for this repository is pinned as the Git submodule `.the-way`. Its commit is `db77ba549cb9ece7d3e62bf29e1256973f62deab`.

If `.the-way/elements/environment-facts/skill/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show `db77ba549cb9ece7d3e62bf29e1256973f62deab`. If initialization fails or either commit differs, stop.

Read `.the-way/elements/environment-facts/skill/SKILL.md` in full and follow it. Read the files it references inside `.the-way`. Where it says where the-way lies, the product's case applies: here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map`, `record-environment-fact`, `find-foundation-entries`, `define-project`, `plan-project`, `settle-technology`, `refine-task`, `implement-task`, `plan-task` or `critique` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
