---
name: the-way-record-glossary-term
description: Use when a product's glossary, foundations/glossary.md, has to gain or change an entry — a word a binding sentence or a template's rule uses in two meanings or in a meaning a reader of the field would not give it, a word a task's return step or a search of the foundation found, a sentence that defines a word, a reworded definition, a renamed term, a second meaning moved to another word, a word added to Avoid, or a term a project definition projects. Use this product's pinned the-way commit.
---

# the-way-record-glossary-term

The process for this repository is pinned as the Git submodule `.the-way`. Its commit is `7cfeb4c2349b181d251d1a03cb2005b980acbe9e`.

If `.the-way/elements/glossary/skill/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show `7cfeb4c2349b181d251d1a03cb2005b980acbe9e`. If initialization fails or either commit differs, stop.

Read `.the-way/elements/glossary/skill/SKILL.md` in full and follow it. Read the files it references inside `.the-way`. Its paragraph about resolving a global skill link applies only to a global install; here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map`, `record-environment-fact`, `find-foundation-entries`, `define-project`, `settle-technology`, `refine-task`, `implement-task` or `critique` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
