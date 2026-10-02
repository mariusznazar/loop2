---
name: the-way-update-part-map
description: Use when a product's part map, foundations/part_map.md, has to gain or change an entry — a part whose responsibility or files change, a part split or merged, a new critical flow or a new surface, failure modes or a trust boundary recorded at a part, a file no part claims, or the first map written for a product. Use this product's pinned the-way commit.
---

# the-way-update-part-map

The process for this repository is pinned as the Git submodule `.the-way`. Its commit is `a3badc952213008551e7668983caa1b3d565db3a`.

If `.the-way/elements/part-map/skill/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show `a3badc952213008551e7668983caa1b3d565db3a`. If initialization fails or either commit differs, stop.

Read `.the-way/elements/part-map/skill/SKILL.md` in full and follow it. Read its referenced template and `elements/common/` files inside `.the-way`. Its paragraph about resolving a global skill link applies only to a global install; here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map` or `record-environment-fact` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
