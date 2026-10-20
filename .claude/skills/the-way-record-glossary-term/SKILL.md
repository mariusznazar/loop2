---
name: the-way-record-glossary-term
description: Use when a product's glossary, foundations/glossary.md, has to gain or change an entry — a word a binding sentence or a template's rule uses in two meanings or in a meaning a reader of the field would not give it, a word a task's return step or a search of the foundation found, a sentence that defines a word, a reworded definition, a renamed term, a second meaning moved to another word, a word added to Avoid, or a term a project definition projects. Use this product's pinned the-way commit.
---

# the-way-record-glossary-term

The process for this repository is pinned as the Git submodule `.the-way`. Its commit is `f0b5eb131de5d681ee3fcdeb264e9f88778af2ec`.

If `.the-way/elements/glossary/skill/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show `f0b5eb131de5d681ee3fcdeb264e9f88778af2ec`. If initialization fails or either commit differs, stop.

Read `.the-way/elements/glossary/skill/SKILL.md` in full and follow it. Read the files it references inside `.the-way`. Where it says where the-way lies, the product's case applies: here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map`, `record-environment-fact`, `find-foundation-entries`, `define-project`, `plan-project`, `lead-project`, `settle-technology`, `refine-task`, `implement-task`, `plan-task`, `critique`, `maintain-styleguide` or `maintain-coding-guidelines` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
