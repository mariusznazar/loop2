Status: done

# Author report — task szkielet-progresji (whole change, one author)

## Status

`done`. The change writes the one glossary entry the task carries, `wall`, and nothing else.

## Commits

- `216b8bf9` — docs: :card_file_box: add the glossary term wall, a map that asks for something new, as projected in the definition of the project (1 file, +6 / -0)

## Files changed

- `foundations/glossary.md` — +6 lines, -0 lines: the new entry `## wall` after `## overlay`, at the end of the file.

## The entry written (whole)

```markdown
## wall

A map that asks for something new — an item, a spell or another idea of a program — and without it is solved rarely.

- **Not:** none
```

Meaning, written by the foundation step: the entry is the projected sentence of the definition (row of the task's *Decisions in play*), word for word; its meaning in English: a wall is a map that asks for something new and is solved rarely without it. Marked `projected`. No sentence of the task's *Meaning (pl)* was written, as the To-do item says.

## Checks

| Check | Command | Exit code | Result |
|---|---|---|---|
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| Instruction files | `python -B .the-way/instruction-files/check_instructions.py` | 0 | `0 error, 149 warn, 7 info`; no error. The 149 warnings were not compared with a baseline. |
| Whitespace | `git diff --check` | 0 | clean |

Check of the one command: not run (no product test was run, as the handoff says; the orchestrator runs `npm test`).

## Own-work check

- Requirement: the To-do item — new `## wall` entry after `## overlay`, at the end of the file; the sentence of the definition word for word; the line `- **Not:** none`; no *Meaning (pl)* line.
- Check: `git diff` of `foundations/glossary.md` read against the handoff's projected text; the diff is the six added lines above, with the sentence beginning "A map that asks...", not "A wall is...". I first wrote "A wall is a map that asks...", found the mismatch against the projected text, and corrected it before the commit. The corrected text is the one committed.
- Result: matches. Foundation check and whitespace check show no fault.

## Choices

- Placement: the entry goes at the end of the file, after `## overlay`, with one blank line before the heading, as the file's other entries do.
- Heading form: `## wall` in lower case, as the task's To-do item commands and as the other glossary headings are written.
- Glossary search: the English text of every git-tracked file (except the glossary) was searched for the word `wall` (`git grep -i -w wall`): 2 hits, both outside the product's meaning of the term. `foundations/decisions.md` line 743 uses it in the ordinary sense of an obstacle ("wall with no added protection"), and `foundations/invariants.md` line 2186 quotes a journald term (broadcast to users). A field reader gives both meanings, so neither takes a different entry, and the new entry does not collide with them.
- No change to the part map: the glossary file is already assigned to a part, and `foundation_check.py` reports no error.

## Reach beyond the dispatch

- Read the glossary element's `SKILL.md` and its files `read.md`, `decide_entry.md`, `write.md`, `projected.md`, plus `template.md`, `elements/common/way_of_working.md`, `elements/common/rules.md` (whole, 95 lines) and `elements/common/projected_mode.md`. The glossary skill sent me to projected mode (the entry is projected); the handoff allowed this.
- Read D-362 whole in `foundations/decisions.md` (from its heading to the next `###` heading, D-393). Its binding sentence is not in the entry written, which names no path or note.

## Working copies

- `.runs/author/fc.txt` and `.runs/author/ci.txt` — the saved outputs of `foundation_check.py` and `check_instructions.py`, made to read their results. Removed after the report was written (see below). No worktree or clone was made.
- Removal: performed in the final step of this run.

## Unread material

- `.the-way/elements/glossary/examples.md` — read whole; it names two entries of the-way's own glossary (`invariant`, `foundation`). Those two entries were not read: they are in the-way's `foundations/glossary.md`, which is not in this worktree's product glossary and was not opened. The form I followed is the neighbouring entries of this product's glossary (`overlay`, whose *Not* reads `none`), as the handoff directs.
- `foundations/part_map.md` — not read. Its rules for assigning files were not needed: the glossary file keeps its part, and the foundation check reports no error.
- `.the-way/elements/common/way_of_working.md` and `rules.md` — read whole.

## Searches not found or unclear

- None unresolved. The `wall` search found only the two non-glossary uses above, neither in the projected meaning.
- The 149 warnings of `check_instructions.py` were not read one by one and not compared with the pre-change tree; the script's error count is 0, so they do not stop the tests. The change touches only the glossary file, which the script's visible output does not name.

## Problems observed

- A commit hook (`rules-on-demand`) blocked the first commit command once and printed the git rules; the commit was repeated unchanged afterward, as the rules directed. No change to the command was needed.
