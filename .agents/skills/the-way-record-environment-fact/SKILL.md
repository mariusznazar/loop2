---
name: the-way-record-environment-fact
description: Use when a product's environment facts file, foundations/environment_facts.md, has to gain or change an entry — a fact an invariant's Rests on or a decision's Based on needs, a citation whose change would send its decision to review, a fact a task's return step found, a failed run of a fact's method, or a fact shown false or left with nothing resting on it. Use this product's pinned the-way commit.
---

# the-way-record-environment-fact

The process for this repository is pinned as the Git submodule `.the-way`. Its commit is `f51acb3deb078be6073932059a23d488e1c41210`.

If `.the-way/elements/environment-facts/skill/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show `f51acb3deb078be6073932059a23d488e1c41210`. If initialization fails or either commit differs, stop.

Read `.the-way/elements/environment-facts/skill/SKILL.md` in full and follow it. Read its referenced template and `elements/common/` files inside `.the-way`. Its paragraph about resolving a global skill link applies only to a global install; here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map` or `record-environment-fact` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
