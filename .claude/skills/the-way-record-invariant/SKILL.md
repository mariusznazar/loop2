---
name: the-way-record-invariant
description: Use when a product's invariants file, foundations/invariants.md, has to gain or change an entry — a rule the product must keep, from conversation, a task's return step, the behaviour of the critical flows and the parts they run through or an invariant a decision's verification calls for; a changed, split, merged or withdrawn invariant; a row on the list of violated or quarantined invariants; or an invariant a project definition projects. Use this product's pinned the-way commit.
---

# the-way-record-invariant

The process for this repository is pinned as the Git submodule `.the-way`. Its commit is `d04c3feb1a47e0ffc9a3b2354c23aacafe25c74b`.

If `.the-way/elements/invariants/skill/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show `d04c3feb1a47e0ffc9a3b2354c23aacafe25c74b`. If initialization fails or either commit differs, stop.

Read `.the-way/elements/invariants/skill/SKILL.md` in full and follow it. Read the files it references inside `.the-way`. Where it says where the-way lies, the product's case applies: here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map`, `record-environment-fact`, `find-foundation-entries`, `define-project`, `plan-project`, `settle-technology`, `refine-task`, `implement-task`, `plan-task` or `critique` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
