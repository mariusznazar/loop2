PASS 216b8bf92c2a3784acadd6ba66cb3c88d39184b2

# Review of the whole change — task szkielet-progresji

- Range: base `fec2ae7ed5b374a43a44803a296c4deb507696e4`, head `216b8bf92c2a3784acadd6ba66cb3c88d39184b2` (`git rev-parse HEAD` in the worktree gives the head; one commit, `216b8bf9`).
- `.the-way` at `19e5774aed6d1d628042e23deccc110ed9f112c0`, the commit the gitlink records.
- No spec, no plan, no slices: every finding comes from none of them (one author's commit).
- Files changed: `foundations/glossary.md`, 300 -> 306 lines (+6, -0).

## Against the task

- *To do* 1 — the entry `## wall` at the end of `foundations/glossary.md`, after `## overlay`, with the projected definition and `- **Not:** none`, and no *Meaning (pl)* line: met. The definition at `foundations/glossary.md:304` is, character for character, the projected sentence the task's *Decisions in play* quotes from the definition of the project ("A map that asks for something new — an item, a spell or another idea of a program — and without it is solved rarely."), with the same em dashes; the *Not* line reads `none` as projected; the Polish meaning sentence is absent.
- *Settlements to record*: `none` — nothing to meet.
- Nothing added beyond the task: the commit touches one file, six added lines, no other entry changed.
- D-362 (the decision the task names): the entry names no place outside the repository, no note and no path; the invariants `tracked-file-private-paths` and `tracked-file-private-names` (method `review`) hold for it.
- The projected entries of other tasks that rest on the term (the map entry for task 3, the wall difficulty entry for task 6) were compared with the definition: "asks for something new", "solved rarely" agree with them; nothing in the entry pre-empts their content (no 20–30% figure, no rule that a wall never refuses entry).

## Against the foundation

- The word `wall` in the English text of the files git tracks (besides the glossary): `git grep -n -i -w -E "walls?"` gives two hits, `foundations/decisions.md:743` ("wall with no added protection", an obstacle) and `foundations/decisions.md:2186` (a quotation from the journald manual, "forwarding to syslog and wall"). Both are meanings a reader who knows the field gives the word, so *Not* reading `none` is right (template, "Form of an entry"). The author's report puts the second hit at `foundations/invariants.md` line 2186; it is `foundations/decisions.md:2186` (`foundations/invariants.md` has 1476 lines). A slip in the report, not in the change.
- The words the definition uses — map, item, spell, program — are used in the decisions in the same sense (spell: D-175 and the Płomyk decision at `foundations/decisions.md:6412`); none of them, nor `wall`, is a heading of the-way's glossary at the pinned commit, so no qualifier is needed (WAY-104).
- The decisions of the selection (index below) and the invariants of the part `product-foundation` and of `every` say nothing the entry contradicts. D-136's rationale ("a later map is to teach another mechanic or to set a challenge that the means so far do not close") is consistent with the entry.

## Findings

### Critical

none

### Important

none

### Minor

1. `foundations/glossary.md:304` — within the task; the wording is mandated by the task. The definition is a noun phrase with no main verb ("A map that asks for something new … and without it is solved rarely."), where the glossary template's form asks for "one sentence: the definition" (`.the-way/elements/glossary/template.md`, "Form of an entry") and every other entry of the file is a sentence of the form "A <term> is …" / "The <term> is …". The content agrees with the foundation and no reader would read it wrongly — the heading supplies the subject, and "without it" can only be the "something new" — so by WAY-364 it is Minor. A second reading note in the same sentence: "an item, a spell or another idea of a program" classes items and spells as kinds of "idea of a program", which the projected entry for task 11 lists as a separate third kind ("one for a spell, one for an idea of a program"); no sentence of the files yet uses the term, so no reader is misled today. Both points are the approved projected wording, which the task requires word for word and the author deliberately restored after first writing "A wall is a map that …"; changing it means departing from the meaning approved at the readiness approval, so it belongs to the human, not to a fix of this cycle. If left as is: the entry stays the only fragment-form definition, at no cost to its meaning. If changed to "A wall is a map that …": the file reads uniformly, at the cost of a wording the human did not approve.

## Declined to judge

- That the glossary file's header says it holds "Terms used by this product's foundation" while no sentence of the foundation uses `wall` yet: the plan sets the entries that use it in tasks 3, 6, 9, 13 and 14, and this task carries only the term; outside this task.
- The 149 warnings of `check_instructions.py` the author reports: the change touches no instruction file; outside this task.

## Checks

| Check | Command | Exit code | Result |
|---|---|---|---|
| Head and pin | `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0 | head `216b8bf9…`, pin `19e5774a…` both ways |
| Diff of the range | `git diff fec2ae7e..216b8bf9`; `git log --oneline fec2ae7e..216b8bf9` | 0 | one commit, one file, +6 |
| File sizes | `python -B .the-way/task-cycle/change_file_sizes.py fec2ae7e 216b8bf9` | 0 | `foundations/glossary.md` 300 -> 306 |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| Whitespace | `git diff --check fec2ae7e 216b8bf9` | 0 | clean |
| Word search | `git grep -n -i -w -E "walls?" -- . ':!foundations/glossary.md'` | 0 | two hits, both field meanings (above) |
| Decision index | `python -B .the-way/elements/common/decision_index.py --output .runs/review-whole/index.md --section "Maps: their content, time and solving" --part product-foundation --decision D-362 --decision D-136 --decision D-189 --decision D-190 --decision D-194 --decision D-239` | 0 | 25 decisions listed in full, 0 by heading alone (the first try with `--decision 362` ended with exit 2, "no decision 362"; the switch takes `D-362`) |

Not run:

- The size test `tests/quality/test_function_and_file_size.py` in worktrees of the base and the head (rule `### Size of a function and a file`, D-425): the change touches only a Markdown file, and the ESLint run that test makes reads only the files `eslint.config.mjs` gives (`*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}` under the listed directories, `eslint.config.mjs:8–20`); the run on the head would equal the run on the base. Unverified by a run, for that reason.
- `python -B .the-way/instruction-files/check_instructions.py`: the change touches no instruction file; the author ran it (0 errors).
- The product's gate `npm test`: not run, as the handoff says.

## Selection

- Parts touched: `product-foundation` (the file `foundations/glossary.md`, by `foundations/part_map.md`, read whole). The entry names no part.
- Guidelines: no guideline file's *Applies to* names `product-foundation` (headers of all 15 files under `guidelines/` inspected); none read, and the change writes no code and no test. I agree with the orchestrator's reading.
- Decisions: the index above (topic section "Maps: their content, time and solving", part `product-foundation`, and the decisions the task's *Decisions in play* names).
- Invariants: the 17 entries whose *Part* is `every` (none names `product-foundation`), each read whole.
- Glossary: the product's glossary read whole; the-way's glossary at the pinned commit by its headings.
- Method files read whole: `.the-way/task-cycle/review/SKILL.md`, `.the-way/task-cycle/review/whole_change.md`, `.the-way/product-guidelines/reading.md`, `.the-way/elements/glossary/template.md`, `.the-way/elements/common/projected_mode.md`; `.the-way/elements/common/way_of_working.md` from "1. Read" to its end.

## Reach beyond the dispatch

- `guidelines/coding.md`, the passage `### Size of a function and a file`, and `tests/quality/eslint-size-rules.mjs` with `eslint.config.mjs` (the `files` patterns): to judge whether the size test could tell this change apart from the base.
- `foundations/decisions.md:743` and `:2186`, and the Płomyk and D-175 passages (`foundations/decisions.md:6412`, `:6873`): the hits of the word searches, to judge the *Not* line and the word "spell".

## Working copies

- `.runs/review-whole/` held `sections.md` and `index.md`, the outputs of `decision_index.py`. No worktree or clone was made. Removed after this report was written; nothing of it is kept beside the report.

## Unread material

- Decisions read whole: 6 of the 25 of the index (D-362, D-136, D-189, D-190, D-194, D-239). The other 19 were read by their index lines (binding sentence and *Scope*); none bears on the entry.
- `.the-way/elements/common/way_of_working.md` lines 1–54 (the critique and asking sections), not needed for selection.
- the-way's `foundations/glossary.md` at the pinned commit: headings only; no heading is a word the entry uses.
- `.the-way/elements/glossary/examples.md`: not read; the form was judged against the template and the neighbouring entries.

## Searches not found or unclear

- `decision_index.py --decision 362` found no decision; the switch takes the identifier with its prefix, `D-362`.
- The author's report places the second `wall` hit in `foundations/invariants.md` at line 2186; it is in `foundations/decisions.md` at line 2186.
