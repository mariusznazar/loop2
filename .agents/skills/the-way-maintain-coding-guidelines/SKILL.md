---
name: the-way-maintain-coding-guidelines
description: Use when a product's code needs coding guidelines written before its first code, its existing code audited for them, an exemplar settled for a kind of code, or its coding guidelines refreshed or extended — leading those matters of a coding-guidelines task's refinement with the human. Use this product's pinned the-way commit.
---

# the-way-maintain-coding-guidelines

The process for this repository is pinned as the Git submodule `.the-way`, at the commit its gitlink records.

If `.the-way/product-guidelines/coding/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show the same commit. If initialization fails or the commits differ, stop.

Read `.the-way/product-guidelines/coding/SKILL.md` in full and follow it, and read a file it names inside `.the-way` when the step or variant that names it comes, not all of them at the start. Where it says where the-way lies, the product's case applies: here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map`, `record-environment-fact`, `find-foundation-entries`, `define-project`, `plan-project`, `lead-project`, `settle-technology`, `refine-task`, `implement-task`, `plan-task`, `write-spec`, `make-change`, `review-change`, `critique`, `maintain-styleguide`, `maintain-coding-guidelines` or `maintain-testing-guidelines` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
