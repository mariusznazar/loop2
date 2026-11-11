PASS 9bbed2f8e6110e2c3c02f8d04591a7999783a6ab

# Review of the whole change — zasady-linii-zadan

Range: base `01418389` to head `9bbed2f8` (`git rev-parse HEAD` = `9bbed2f8e6110e2c3c02f8d04591a7999783a6ab`, matches the dispatch). Commits: `8a2b3f2c` (pin move), `59d3f8fd`, `a46e02fc`, `9bbed2f8`. Route: one author, no spec, no plan, no slices; I judged the whole change.

Changed files (`git diff 01418389 HEAD --numstat`):

| File | Added | Removed |
|---|---|---|
| `.the-way` (gitlink) | 1 | 1 |
| `AGENTS.md` | 1 | 1 |
| `foundations/decisions.md` | 4 | 4 |

Blocking findings: 0. Minor findings within the task: 2. Out-of-scope findings: 2.

## The task, item by item

1. **Item 1, pin move.** `8a2b3f2c` changes only `.the-way`: `git show 8a2b3f2c --name-status` shows `M .the-way` and nothing else; the gitlink goes from `52f8164a` to `e9a0f926dc9758f6554e8c0a30925d3e4d68cfed`, the commit the task names. `git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD` both show `e9a0f926...`. It is the first commit of the branch. The installer's preview (`python -B .the-way/installation/install.py .`, no `--apply`) shows every other path as `KEEP` (all `.claude/skills/the-way-*`, `.agents/skills/the-way-*`, `AGENTS.md`, `.gitignore`, `CLAUDE.md`), so the installer owns nothing else that should have been rewritten. `git diff 01418389 HEAD -- .claude .agents .gitmodules` is empty. Met.
2. **Item 2, the `Task rules` line.** I rebuilt the-way's line from `git -C .the-way show e9a0f92:AGENTS.md` (lines 25-27, joined), replaced `under \`the-way\`` with `under \`loop2\``, and compared it with the line of `AGENTS.md:5`: identical (script printed `True`). The line sits in the place of the removed bullet about moving a line to Ready; the `Projects` and `Tasks` lines (`AGENTS.md:3`, `:4`) are byte-unchanged. Compared with `.the-way/project-level/backlog_place.md` (a `Task rules` line names the entry `task-rules` of the locations file under the product's name) and `task_line.md` (the rules of a line belong to the task place, never to text written at the product, WAY-107): the line does what they state, and the removed bullet was the text written at the product that WAY-107 forbids. Met.
3. **Item 3 and settlement row 1, D-362.** The binding sentence now lists the rules of a task's line among the places and the entries `projects`, `tasks` and `task-rules`; the "no absolute path" clause and the allowed note-and-folder clause are unchanged. The decision keeps its number and is edited in place. No separate decision of loop2 was added (`git diff` touches only D-362). *Origin* at the head is byte-identical to the base (`01418389`, line 8113 of the file at both commits; I compared with `git show <rev>:foundations/decisions.md | grep`), so the task document is not named, as the decisions template section *Origin* (WAY-27) requires; the earlier `a46e02fc` added a clause naming it and `9bbed2f8` removed it. Met.
4. **Questions to settle.** Question 1 answered by item 1 (pin as the first commit). Question 2: *Rejected* of D-362 gained the two ways of the task's *Not chosen* for question 2, with the same costs: "leaving this decision unchanged — it would list only `projects` and `tasks`, so an agent reading it would take `task-rules` for an entry outside the rules of loop2, and the next review of the foundation would have to find and fix the mismatch" matches the task's first line (the mismatch "decyzja mówi po zadaniu nieprawdę", the agent taking `task-rules` for an entry outside loop2's rules, the next review finding the mismatch); "a separate decision of loop2 that the rules of a task's line come from the author's notes — it repeats a rule the-way keeps for its own tasks, so the rule would be held in two places that both need upkeep" matches the second. The earlier rejected alternatives are kept as they were. Met.
5. **Out of scope.** `Projects` and `Tasks` lines unchanged; the vault rulebook is outside the repository and untouched. Respected.
6. **Human action.** The task lists the entry `task-rules` under `loop2` in the locations file as done before the cycle. I read only the key names and whether each path exists, never a value: `~/.the-way/locations.json` holds under `loop2` the keys `projects`, `repository`, `task-rules`, `tasks`, and every entry's path exists. No value or path from that file appears in the change or in this report.

## Against the foundation

- D-362 as changed says what the change does. Its *Verification* names the invariant `tracked-file-private-paths`; the invariant's text ("No file git tracks contains an absolute path on a disk or ... a link to a note") is unchanged and still matches. The test of the invariant is not changed by this change; the check ran (below), exit 0.
- WAY-107 of the-way (read whole at `e9a0f92:foundations/decisions.md`): the section names beside the place of tasks the entry `task-rules`, and the rules of a line are never text written at the product. The new `AGENTS.md` matches it.
- The entry text of D-362 respects the entry rules I read in `.the-way/elements/decisions/template.md` (prose names no file, script or count in what the author newly wrote; binding sentence in present tense; *Rejected* items separated as in the other entries).

## Findings

### Critical
none

### Important
none

### Minor (within the task)

1. `foundations/decisions.md:8115`, the sentence added to D-362 *Rationale* ("The rules of a task's line sit with the author's other rules for tasks, so a change to them reaches loop2 without an edit to the agent instructions."). Question 2 and row 1 settle that D-362 lists `task-rules` and that loop2 gets no separate decision; they give no rationale of this kind. The sentence is derived from the task's *Need* (a rule repeated in `AGENTS.md` drifts from the rulebook), which is a fair reading, but it is the author's reasoning in a decision, not something the human settled, and it states the reason for the `Task rules` line of `AGENTS.md` rather than for D-362's pointer-by-entry rule. Effect: low; if the human disagrees with the reason, the entry carries a rationale nobody approved. Fix if wanted: delete the sentence or have the human confirm it.
2. `foundations/decisions.md:8111`, the *Verification* `complies` example was widened from "the entry `projects`" to "an entry under `loop2` ... such as `projects`, `tasks` or `task-rules`". Item 3 of the task asks only that D-362 list the entry. The widened example is coherent with the binding sentence and harmless, but it is an unasked edit of a part of the entry. Effect: low; the example still tells a complying line from the `violates` one.

### Out of scope (say so in their own words)

3. (out of scope) `foundations/decisions.md:8113`, D-362 *Origin* names a task document, which the template (section *Origin*, WAY-27) forbids; it was so at the base. The author correctly left it. The same *Origin* also points to question numbers of an earlier task that no longer describe the whole entry, since the entry now also rests on this task's question 2. A foundation review can decide whether to turn it to `none`.
4. (out of scope) The locations file holds a fourth entry under `loop2`, `repository`, which D-362's "which are the entries `projects`, `tasks` and `task-rules`" does not list (the base sentence did not list it either; the `violates` example speaks of "an old copy of the repository"). The task asked only for `task-rules`. A later foundation review may reconcile the list.

## Declined to judge

- The text and content of the author's vault rulebook that `task-rules` points to: outside the repository and out of scope by the task.
- Whether the gate (`npm test`) passes on the pin-move commit `8a2b3f2c`: the result was not available to me and no finding of mine needs it; the change touches no product code, tests or user interface.
- The base `Origin` convention of D-362 and the content of other decisions that name task documents in *Origin*: pre-existing, listed as finding 3.
- `guidelines/testing.md:92`, which mentions the locations file and the folder of tasks: not changed by this change, so not judged.

## Checks run (all from the worktree root)

| Check | Command | Exit code | Result |
|---|---|---|---|
| Head and range | `git rev-parse HEAD`; `git log --oneline 01418389..HEAD`; `git diff --stat 01418389..HEAD` | 0 | head `9bbed2f8...`; 4 commits; 3 files |
| Pin | `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD`; `git show 8a2b3f2c --name-status` | 0 | both `e9a0f926dc9758f6554e8c0a30925d3e4d68cfed`; the commit changes only `.the-way` |
| AGENTS.md line against the-way's | a small Python script (`python -B -I`) joining lines 25-27 of `git -C .the-way show e9a0f92:AGENTS.md`, replacing `the-way` with `loop2` in the entry phrase, comparing with `AGENTS.md:5` | 0 | `True` |
| Installer preview | `python -B .the-way/installation/install.py .` (no `--apply`) | 0 | every path `KEEP`; "Preview only"; `git status --short` empty afterwards |
| Whitespace | `git diff 01418389..HEAD --check` | 0 | none |
| Origin at head against base | `git show <rev>:foundations/decisions.md \| grep -n "^- \*\*Origin:\*\* zadanie_loop2_lokalizacje"` for `01418389`, `a46e02fc`, `9bbed2f8` | 0 | the head line equals the base line; `a46e02fc` had the extra clause |
| Tracked private paths | `python -B .the-way/task-cycle/tracked_private_paths_check.py tracked-file-private-paths` | 0 | `checked: 436 files, 0 listed, 14 binary files not read` |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 0 | `0 errors` |
| Locations file (key names and path existence only) | `python -B -I -c ...` reading `~/.the-way/locations.json` | 0 | keys `projects`, `repository`, `task-rules`, `tasks`; all paths exist; no value shown |

Not run: `npm test` (the orchestrator's gate, per the handoff). The gate on `8a2b3f2c` was not available to me; no finding depends on it.

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md`, section *Origin* and the field rules: to judge whether the *Origin* restore and the new *Rationale* and *Rejected* text follow the template (WAY-27, WAY-05, WAY-29).
- `e9a0f92:foundations/decisions.md`, WAY-107 (read whole), and the WAY-320, WAY-140 mentions by search: to compare the new line and D-362 with the decision on the place of the backlog.
- Decisions D-13, D-83, D-357, D-358 (whole), beyond D-362 and D-82: found by title as possibly bearing on places outside the repository or on agent workflow; none bears on this change.
- `git grep` for `locations.json`, `locations file`, `[/]` and `rules for agent tasks` over tracked files outside `.the-way`, `.claude`, `.agents`: to find any other statement of the removed rule; none.

## Unread material

Decisions of my selection (those whose *Scope* names `agent-workflow` or `product-foundation`): 49. Read whole: 6 (D-362, D-82, D-13, D-83, D-357, D-358). Run through by title only: 43 (D-12, D-15, D-28, D-30, D-31, D-38, D-73 to D-81, D-84, D-85, D-87 to D-89, D-137, D-213, D-228, D-230 to D-234, D-238, D-252, D-254 to D-258, D-268, D-347, D-351, D-355, D-356, D-359 to D-361). The titles of these 43 do not point to a bearing on the backlog section, the agent instructions or the locations file; I opened none further. Decisions that bear on the change and stayed unread: none.

Foundation entries read whole: the invariant `tracked-file-private-paths`; the part-map entries `agent-workflow` and `product-foundation`. Glossary: I did not read the glossary; I grepped `foundations/` for `backlog`, `locations` and `task-rules` and found no glossary hit. Not read whole: the frozen task, author report, handoff and method files I read whole; of `.the-way/elements/decisions/template.md` I read the field rules and the *Origin* section, not every section; `.the-way/project-level/task_line.md` and `backlog_place.md` were read whole. Guideline files: none selected (no product code, test or user interface changed); none read.

## Searches not found or unclear

- A glossary entry for the words of the change (`task rules`, `locations file`): not found; no sentence of the change would be read wrongly for lack of one.
- A statement in `foundations/` or `guidelines/` of the rule about moving a task's line to Ready, other than the removed bullet: not found, so nothing else needed to change.
- Unclear: the author's report says "about 45" decisions in the scope search; the count I found is 49.
- Unclear, out of scope: whether D-362 should list the `repository` entry of the locations file (finding 4).
