---
name: the-way-record-invariant
description: Use when a product's invariants file, foundations/invariants.md, has to gain or change an entry — a rule the product must keep, from conversation, a task's return step, the behaviour of the critical flows and the parts they run through or an invariant a decision's verification calls for; a changed, split, merged or withdrawn invariant; or a row on the list of violated or quarantined invariants. Use this product's pinned the-way commit.
---

# the-way-record-invariant

The process for this repository is pinned as the Git submodule `.the-way`. Its commit is `3b2a0cb5c88bcf86a8fec1b7b1fdc6acaa29951b`.

If `.the-way/elements/invariants/skill/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show `3b2a0cb5c88bcf86a8fec1b7b1fdc6acaa29951b`. If initialization fails or either commit differs, stop.

Read `.the-way/elements/invariants/skill/SKILL.md` in full and follow it. Read its referenced template and `elements/common/` files inside `.the-way`. Its paragraph about resolving a global skill link applies only to a global install; here the process root is `.the-way`. Do not substitute a global skill.
