Status: done

# Return-step report — task szkielet-progresji

## Status

`done`. The comparison found nothing to correct. No commit.

## Commits

None. Head stays `216b8bf9`, the one commit of the change.

## What the foundation was compared with the code

The change touches only `foundations/glossary.md`, and the change makes no code change, so the comparison is with the task, the part map and the other foundation entries that use the word:

- The new entry `## wall` (projected sentence, `- **Not:** none`) against the task's *To do* item 1 and *Decisions in play*: the sentence matches the projected wording word for word. Nothing to correct.
- The word `wall` in the rest of the tracked files: two hits only, `foundations/decisions.md:743` ("wall with no added protection", an obstacle) and `foundations/invariants.md` (the journald term "wall", a broadcast, in a quoted source). Neither uses the term in the projected sense; nothing to correct.
- The part map: the glossary file falls under part `product-foundation` (`foundations/**`, `foundations/part_map.md`, section `## product-foundation`). The file is assigned, and the foundation check reports no error. No part-map change.
- D-362 (the one decision the task names for `product-foundation`): compared, not changed. The entry `wall` names no path, note or place outside the repository, so D-362 holds.
- The other decisions of the task's *Decisions in play* (the projected entries of tasks 3, 6, 9, 24, 2 and D-136, D-189, D-190, D-194, D-239): this task changes none of them; they are compared only and no entry is written for them. The task's *Out of scope* writes none of them.
- Settlements to record of the task: `none`. Nothing to write from it.
- Environment facts: this change rests on no source outside the product, so none is written.
- Invariants and decisions: none written, none changed.

## Entries the task carries, and where they went

- Projected entry `wall` (task's *Decisions in play*, the projected entry assigned to this task by the plan): written whole, in `foundations/glossary.md`, commit `216b8bf9`. Marked `projected`. Its meaning in English: a map that asks for something new and is solved rarely without it. Its meaning in the task's language is the task's *Meaning (pl)* sentence, which the To-do item keeps out of the file.
- Rows of *Settlements to record*: `none`; none written.
- Decisions written or changed: none.
- Part-map changes: none.

## The question for the glossary (WAY-95)

The change adds one term, `wall`. The other words of its entry:

- `map`: no entry owed. The word is the game's map, a place of play, which a reader of the field takes the same way. The product's own term `map run` is already an entry; `map` alone is used in its plain sense in five foundation files, with no sentence that a field reader would read differently.
- `item`: no entry owed. It is an ordinary game object, used in 94 places in the foundation, each in the field's sense.
- `spell`: no entry owed. It is an ordinary game ability, used in 18 places, in the field's sense.
- `program`: already has its own entry, `## program` in `foundations/glossary.md`.
- `something new`, `solved`, `idea of a program`: ordinary English; the word `solved` is used in the product's sense of "solved map", which is covered by the existing `## solved map` entry.

## Checks

| Check | Command | Exit code | Result |
|---|---|---|---|
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0 | no error printed (output discarded) |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 | exit 0 (output discarded; earlier run: 0 errors, 149 warnings) |
| Whitespace | `git diff --check` | 0 | clean |

The product's gate (`npm test`) was not run, as the handoff directs; the whole test set is the orchestrator's or CI's. The pinned the-way: `.the-way` is at `19e5774aed6d1d628042e23deccc110ed9f112c0`, which matches the gitlink.

## Own-work check

- Requirement: the foundation does not contradict the new entry, and no use of `wall`, `map`, `item`, `spell` needs a correction or an entry.
- Check: the searches above, read against the entry.
- Result: no contradiction; no correction; no entry owed.

## Unread material

- `.the-way/task-cycle/change/SKILL.md`, `.the-way/task-cycle/skill/return_step.md`: read whole (this step).
- `.the-way/task-cycle/skill/foundation_step.md`: read in the first run; not re-read here.
- `reports/fix-findings.md` and the whole-change review: not read, as the handoff directs.
- `foundations/part_map.md`: read only the `product-foundation` section and the `glossary` lines; the rest not read, not needed.
- `foundations/decisions.md`, `foundations/invariants.md`: read only at the lines the search found; the decisions named by the task were read earlier (D-362 whole in the first run); the other named decisions were not reopened, since nothing is changed in them.

## Searches not found or unclear

- `git grep -i -w` for `wall`, `spell`, `item`, `map`, `program` in `foundations/`: as above.
- None unclear.

## Working copies

None made in this step. `.runs/author/` does not exist; nothing to remove.
