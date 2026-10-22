---
name: the-way-write-spec
description: Use to write the spec of a the-way task whose cycle found an open design choice, or to review such a spec as an agent that did not write it — before any plan or code. Questions go to the cycle's orchestrator, never to the human. Use this product's pinned the-way commit.
---

# the-way-write-spec

The process for this repository is pinned as the Git submodule `.the-way`, at the commit its gitlink records.

If `.the-way/task-cycle/spec/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show the same commit. If initialization fails or the commits differ, stop.

Read `.the-way/task-cycle/spec/SKILL.md` in full and follow it. Read the files it references inside `.the-way`. Where it says where the-way lies, the product's case applies: here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map`, `record-environment-fact`, `find-foundation-entries`, `define-project`, `plan-project`, `lead-project`, `settle-technology`, `refine-task`, `implement-task`, `plan-task`, `write-spec`, `make-change`, `review-change`, `critique`, `maintain-styleguide` or `maintain-coding-guidelines` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
