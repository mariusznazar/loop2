# Fix of the findings I-1 to I-4 (slices 6-8)

**Status:** done
**Base of the fix:** 59b06238 (worktree clean at start; branch task/martwe-odsylacze-origin). The review reviewed 7e3aa5e8; the head had moved on to 59b06238, the five entries were unchanged in the passages concerned.
**Commit:** see `git log -1` on the branch (one commit, `foundations/decisions.md` only, 5 lines changed in Rationale and Rejected of D-79, D-84, D-85, D-96, D-144).

## Each finding

All four checked against code, foundation and the private notes before fixing; all four hold.

- **I-1 (D-84, D-85) fixed.** At the head `tests/http.test.mjs:39-42` (`listen()`, 5000 ms readiness deadline) and `:88-91` (`send()`, absolute 5000 ms deadline that destroys the request) bound both the wait for the start and the whole exchange. The note (przewodnik_testow, Q7 and Q5i, 2026-10-25) states the earlier state. Both clauses now say what the helper was when the rules were adopted / the case was chosen (past tense) and what the rules did as a result. No claim about the helper today is written.
- **I-2 (D-79) fixed.** D-163 and D-235 both narrow D-73 on the same template row and are named in D-73's binding sentence. The sentence is now dated: "When this was decided, the npm registry ... was the only service ... was met only there"; the rest (tests of the audit substitute its result, the gate runs the real audit) is kept.
- **I-3 (D-96) fixed.** D-96's own binding sentence and Rationale, D-280 (menu item "Wróć do przejścia" on Siedziba, Postać, Programy) and D-287 show the state, the button and the rule exist. The rejected way now reads in the past ("when it was weighed, it took the player to the headquarters in place of the map run that waits for him and needed a state ... the code did not know, ... a new button, and ... a rule for what the player may do in Siedziba while the map run waits"). The landing clause is the note's own (Not chosen C: after signing in the player lands in the headquarters, the map run waits behind the button); no reason the note does not give was added.
- **I-4 (D-144) fixed.** Confirmed: D-82 (as rewritten on this branch) takes expectations only from the foundation; the branch numbers (what a rank adds) stand in no entry (grep for Mocniejszy / Cięższy / Zwinny in `foundations/`: no hit; in code only `src/browser/sim/data/skills.ts`; no test names them). Dropped "so the tests of this game may expect them"; kept "taken as the requirement". Not done, because outside what I may touch (binding sentence): entering the rank numbers into D-144's binding sentence or a branch decision, which the reviewer ties to the step that handles To do 5.

## Steps of `the-way-record-decision` done

1. Read: `read.md`; the entries changed whole (D-79, D-84, D-85, D-96, D-144) and D-82, D-73, D-163, D-235, D-280, D-287 whole; template and rules read.
2. Decide the entry: edits in place of existing entries, no new question; the search for collisions is the findings' own (D-163/D-235 vs D-79; D-280/D-287 vs D-96; D-82 vs D-144).
3. Draft: Rationale and Rejected only, in English, tense dated, no file name added, no count.
4. Write: edit of `foundations/decisions.md` by a script that kept line endings (LF), then the check below. No neighbour edit followed (binding sentences untouched).

## Checks

- `python -B .the-way/elements/common/foundation_check.py` -> exit 0 ("0 errors").
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md` -> hits only from line 3825 on; none inside D-79 (1619), D-84 (1686), D-85 (1699), D-96 (1918), D-144 (2927). (Command exit 0 because of hits elsewhere; the Origin lines of later entries are other slices'.)
- Product gate: not run, as instructed.

## Own-work check

Requirement most likely not met: no sentence still states as present fact what the foundation or code now contradicts, and no new unsupported claim. Check: word diff of the commit (only tense and the dropped clause changed) plus re-reading each rewritten sentence against the head (`tests/http.test.mjs`, D-163, D-235, D-280, D-287, D-82). It showed no remaining present-tense claim.

## Concerns for the orchestrator (not mine to fix)

- D-84 binding sentence still ends "The HTTP helper in `tests/http.test.mjs` takes these waiting and cleanup rules when that helper changes." The helper has already taken them, so the sentence is stale at the head. It is a binding sentence, outside what I may touch.
- D-85 binding sentence says the integration exemplar is chosen "not the whole file or its timeout and cleanup helpers"; with the helper now bounded this may be worth a look in the same pass.
- D-144: the rank numbers of the branches are not in the foundation (see I-4).

## Unread material
none

## Searches not found or unclear
none
