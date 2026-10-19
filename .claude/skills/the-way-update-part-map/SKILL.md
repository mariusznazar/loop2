---
name: the-way-update-part-map
description: Use when a product's part map, foundations/part_map.md, has to gain or change an entry — a part whose responsibility or files change, a part split or merged, a new critical flow or a new surface, failure modes or a trust boundary recorded at a part, a file no part claims, the first map written for a product, or a change a project definition projects. Use this product's pinned the-way commit.
---

# the-way-update-part-map

The process for this repository is pinned as the Git submodule `.the-way`. Its commit is `d829e3aa6242a9b8901274531dd82fd5c7d87628`.

If `.the-way/elements/part-map/skill/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show `d829e3aa6242a9b8901274531dd82fd5c7d87628`. If initialization fails or either commit differs, stop.

Read `.the-way/elements/part-map/skill/SKILL.md` in full and follow it. Read the files it references inside `.the-way`. Where it says where the-way lies, the product's case applies: here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map`, `record-environment-fact`, `find-foundation-entries`, `define-project`, `plan-project`, `lead-project`, `settle-technology`, `refine-task`, `implement-task`, `plan-task`, `critique`, `maintain-styleguide` or `maintain-coding-guidelines` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
