---
name: the-way-review-foundation
description: Use when a product's foundation has to be reviewed against the product — a request's description says the foundation waits for a review, or the human asks for one — reading the whole foundation and the unfixed remarks of the repository's merged requests, listing what to change, and marking the review done with a tag. Use this product's pinned the-way commit.
---

# the-way-review-foundation

The process for this repository is pinned as the Git submodule `.the-way`, at the commit its gitlink records.

If `.the-way/foundation-review/SKILL.md` is absent, run `git submodule update --init -- .the-way` from the product root. Check `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD`: both must show the same commit. If initialization fails or the commits differ, stop.

Read `.the-way/foundation-review/SKILL.md` in full and follow it, and read a file it names inside `.the-way` when the step or variant that names it comes, not all of them at the start. Where it says where the-way lies, the product's case applies: here the process root is `.the-way`. Do not substitute a global skill.

Where this skill or a file it reads names another the-way skill — `record-decision`, `record-invariant`, `record-glossary-term`, `update-part-map`, `record-environment-fact`, `find-foundation-entries`, `define-project`, `plan-project`, `lead-project`, `settle-technology`, `refine-task`, `implement-task`, `plan-task`, `write-spec`, `make-change`, `review-change`, `critique`, `review-foundation`, `maintain-styleguide`, `maintain-coding-guidelines` or `maintain-testing-guidelines` — use this product's project skill of the same name with the `the-way-` prefix, never an unprefixed one.
