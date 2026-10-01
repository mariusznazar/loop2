---
name: the-way-record-invariant
description: Use when a product's invariants file, foundations/invariants.md, has to gain or change an entry — a rule the product must keep, from conversation, a task's return step, the behaviour of the critical flows and the parts they run through or an invariant a decision's verification calls for; a changed, split, merged or withdrawn invariant; or a row on the list of violated or quarantined invariants. Use this product's pinned the-way commit.
---

# the-way-record-invariant

The process for this repository is pinned as the Git submodule `.the-way`. Its commit is `e1039b387d3499827d29c42f2e8a8132445f27cd`.

If `.the-way/elements/invariants/skill/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show `e1039b387d3499827d29c42f2e8a8132445f27cd`. If initialization fails or either commit differs, stop.

Read `.the-way/elements/invariants/skill/SKILL.md` in full and follow it. Read its referenced template and `elements/common/` files inside `.the-way`. Its paragraph about resolving a global skill link applies only to a global install; here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map` or `record-environment-fact` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
