# Author report — locations-key-wording

**Status:** done

## Files changed and commits

Base `ba67f04503afc56dc965bd197897b0a8f2adbeae`, branch `task/locations-key-wording`; nothing pushed.

| Commit | Files | Added / removed lines |
|---|---|---|
| `aacbbf16` docs: :pencil2: say key, not entry, for a name under loop2 in the locations file in the backlog section of AGENTS.md | `AGENTS.md` | 3 / 3 |
| `68745036` docs: :card_file_box: say key, not entry, for a name under loop2 in the locations file in D-362, its meaning unchanged | `foundations/decisions.md` | 3 / 3 |
| `02526a59` docs: :card_file_box: say key, not entry, for a name under loop2 in the locations file in tracked-file-private-names, its meaning unchanged | `foundations/invariants.md` | 1 / 1 |

## Checks

- `python -B .the-way/elements/common/foundation_check.py` from the worktree root: exit 0, `0 errors`.
- `python -B .the-way/instruction-files/check_instructions.py` from the worktree root: exit 0, `0 error, 149 warn, 7 info`. The warnings are not from this change (for instance `dead-path AGENTS.md:21 .runs/quality-venv does not exist`, `dead-path AGENTS.md:34 foundation_check.py does not exist`); none concerns a word changed here. I did not run this check on the base commit, so "not from this change" rests on the warning texts, not on a comparison.
- `.the-way` pin: `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD` both show `19e5774aed6d1d628042e23deccc110ed9f112c0`.
- Not run: `npm test` (the handoff says not to; the worktree has no `node_modules`). No test cites D-362 by a line `decision:` and `tracked-file-private-names` has *Method* `review` (task *Context*), so no test is affected.

## Own-work check

Requirement most likely to be missed: every "entry" that means a name in the locations file changes, and no "entry" that means an entry of the foundation changes.

Check: `git diff --word-diff=porcelain -U0` before committing. The diff shows exactly 18 word swaps and nothing else:
- `AGENTS.md` lines 3-5: 10 × `entry` → `key` (line 3: "the entry `projects`", "the entry names", "the entry is missing", "add the entry"; line 4: the same four; line 5: "the entry `task-rules`", "A missing entry or file").
- D-362 binding sentence: `the entry that stands for it` → `the key that stands for it`, `the entries` → `the keys` (2).
- D-362 *Rationale*: `The name of an entry` → `The name of a key`, `the value of the entry` → `the value of the key` (2).
- D-362 *Rejected*: `by an entry` → `by a key`, `the entries `projects` and `tasks`` → `the keys …`, `for an entry outside` → `for a key outside` (3).
- Invariant: `naming the entry` → `naming the key` (1).

Unchanged on purpose (entry of the foundation): D-362 *Rationale* "finds the reasoning where it stands in the entry"; *Verification* "a comment, an entry or a guideline" and "an entry or a comment that leaves out…". Each is still in the file (the three changed paragraphs of D-362 are the only ones in the diff). Article swaps (`an` → `a`) are the only changes beyond the word.

Binding-sentence length of D-362 is not changed (word-for-word swap, `foundation_check.py` 0 errors).

Weakest point: the meaning of the *Rationale* sentence "The name of a key carries the pointer without the path, and the value of the key lies in the user's own file of places" now says the key's value lies in the user's file, which matches how the locations file works (a key has a value). I read no source beyond the task for this; the task gives the wording itself.

## Meaning sentences of the foundation entries

- **D-362 — `row 1`** (changed in place, as the method of `record-decision` gives for an existing decision; no new entry, number kept)
  - English: loop2 points to a place outside the repository by the key that stands for it under `loop2` in the locations file (`projects`, `tasks`, `task-rules`), and "entry" in D-362 means only an entry of the foundation.
  - Polski: loop2 wskazuje miejsce poza repozytorium przez klucz, który je oznacza pod `loop2` w pliku lokalizacji (`projects`, `tasks`, `task-rules`), a słowo „entry" w D-362 znaczy już tylko wpis fundamentu.
  - Marked `row 1` (Settlements to record row 1: "sentence of D-362"); the row's meaning is the whole of what I wrote, no part added.
- **Invariant `tracked-file-private-names` — `the cycle's`** (changed in place, identifier kept)
  - English: a tracked file points to a place the author keeps outside the repository only by naming the key `projects`, `tasks` or `task-rules` under `loop2` in the locations file, or by referring to the private note of secrets without its name and path, and names no note, folder of notes, path on the author's disk or file of the private repository of the old loop game; the meaning is unchanged.
  - Polski: plik śledzony przez git wskazuje miejsce, które autor trzyma poza repozytorium, tylko przez nazwanie klucza `projects`, `tasks` albo `task-rules` pod `loop2` w pliku lokalizacji albo przez odwołanie do prywatnej notatki z sekretami bez jej nazwy i ścieżki, i nie nazywa notatki, folderu notatek, ścieżki na dysku autora ani pliku prywatnego repozytorium starej gry; sens bez zmian.
  - Why `the cycle's` and not `row 1`: the one row of *Settlements to record* goes to "sentence of D-362" only; the invariant's change comes from the task's question 2 and *To do* item 3, which are no row, so the mark `row 1` does not fit it. It adds no pair of examples and no part beyond the swap, so nothing needs quoting under it.

## Choices

- Three commits, one per logical part (instruction file, decision, invariant). Way rejected: one commit for all three; cost if wrong: nil, they are one merge request.
- The invariant keeps *Method* `review`, *Derives from* `D-362 · D-13` and its identifier; no test written (none needed: wording only, *Method* `review`). No pair of examples added to D-362.
- No history of the rename was written into any entry or instruction file (no "formerly entry", no dates).
- No move of code (the rule of size does not apply: no code changed).

## Other places that say "entry" about a name in the locations file

Search: `git grep` over the tracked files except `.the-way` for `locations.json`, `locations file`, `file of places`, `task-rules`, `private notes`, `entry that stands`, `the entry` with a backtick, `entries` with `projects`/`tasks`/`task-rules`, and for `D-362` and `tracked-file-private-names`. Result: no other place. The remaining hits are the three places changed; `foundations/decisions.md:1145` (the word "private notes" in another decision, about the place of a note), `security-notes.md:12` (cites D-362 about paths, no "entry" of the locations file) and `src/browser/view/chronicle.ts:112`, `tests/invariants/test_browser_view_framework.py:375,379` ("entry" of a chronicle and of a lock file) are other meanings and stay, as *Out of scope* says. `README.md`, `guidelines/` and `.claude/skills/` hold none.

## Reach beyond the dispatch

- Read `the author's global rule file on git, which lies outside the repository` before the commit (the global instruction's rule for commits; the first Bash commit call was refused once by a hook that supplies it, and I repeated the call).
- Read, as the handoff names: `.the-way/task-cycle/change/SKILL.md`, `foundation_step.md`, the `SKILL.md` of the decisions and invariants elements and the files they name (`read.md`, `decide_entry.md`, `write.md`, `draft.md`, both templates, `elements/common/way_of_working.md`, `elements/common/rules.md`). Of D-362 I read the whole entry (lines 753-766), of the invariant the whole entry (1298-1306).
- Not done, because the change is a swap of one word inside existing entries: the full search of the foundation of `way_of_working.md` step 2 beyond the `git grep` above, the critique, and the question against the answer (the answer is the human's accepted question 2).

## Unread material

- The glossary of the pinned the-way, `.the-way/foundations/glossary.md`: I found by search only the heading `## entry` (line 49) and no heading for "key"; I did not read the entry whole (the task quotes its sentence). The invariant `tracked-file-private-paths` I read whole (lines 1288-1296); D-13 not read (named only as a link; the sentence is not changed). `foundations/part_map.md` not read (the handoff gives the parts; `foundation_check.py` passed with 0 errors, which checks the parts of the files). The `examples.md` of the two elements not read (the change writes no new entry of a new form).

## Searches not found or unclear

- A glossary entry for "key" in the pinned the-way glossary: not found by heading search (`^## key`), so the meaning of "key" used here (a name in the locations file, which the pinned the-way itself uses: "the key `tasks` under `the-way`") rests on the-way's own `AGENTS.md`, not on a glossary entry.

## Working copies

None made beyond two temporary output files of the checks in `.runs/author/` of the worktree; I removed them and the directory.
