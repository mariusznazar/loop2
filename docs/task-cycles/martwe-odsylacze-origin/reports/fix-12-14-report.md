# Report — fix of the blocking findings I-1 and I-2 (review of slices 12–14)

**Status:** done

Base of the fix: `cdf5ee153e660ea674cf89b54f1803ca0cea374b` (worktree clean at start, branch `task/martwe-odsylacze-origin`).
Commit: `a732d90d92d31b8389f43d1be2c986b2fc6d85c9` — `docs: :memo: drop the process reasons from D-247 and the stale button row from D-243`.
File changed: `foundations/decisions.md` (+4 -8): D-243 *Rationale* (lines ~5162-5165) and D-247 *Rationale* last sentence plus *Rejected* (lines ~5310-5313). The part before *Rationale*, *Origin* (`none`) and every other entry are untouched.

## Findings

### I-1 (D-247) — fixed
Checked: the note (Q7) gives the process reason only (change of the approved definition, readiness gate, plan check); the entry has `Origin: none`, so those words point to documents no reader can open. Confirmed.
Fix: *Rationale* ends "A bound can be added later, once the game has matured."; *Rejected* now reads "a bound of 7 days, the rest lost; a bound of another number." — without a reason, as the review asked (same fix as D-187's rejected ways).

### I-2 (D-243) — fixed
Checked at the head: `src/browser/view/maps-screen.tsx:243` ("its program and the two sending buttons (D-329)"), „Wejdź" at `:321` and „Puść w pętlę" at `:335` inside `.maps-who-actions` (`:318`) on the card of a map; D-329 (`foundations/decisions.md`) puts both at each character in „Kto idzie"; D-330 says no button at a character in Siedziba leads to Mapy; the note's Q1 "long row" was the character's row in Siedziba with „Wyślij" (`karty_i_katalog_map_loop2.md` To do 8, in the snapshot, moves sending off Siedziba). So "one more button in a long row of buttons" describes a layout the product no longer has. Confirmed.
Fix: dropped that clause; the cost reads "Accepted with it: one click more where the predecessor game stopped the earning loop when a character was sent." The *Rejected* "several times more to draw" is unchanged. I wrote no new statement about the present layout.

## Steps of `the-way-record-decision` done
1. Read: `read.md`, `decide_entry.md`, `elements/common/way_of_working.md` (sections How a skill asks, 1 Read, Reading the foundation, 2 Search — read to its first 120 lines); D-243, D-247, D-187 and D-329/D-330 whole.
2. Decide the entry: both entries exist and keep their question; edit in place, no new number, no neighbour edit.
3. Draft and write: done with the editor tool (Edit) on the two passages. No question to the human (delegated), no new invariant, glossary term or relation.
4. Check: below. The critique-before-collective-review step does not apply (a fix of a review's findings, not a set shown to the human).

## Checks
- `python -B .the-way/elements/common/foundation_check.py` — exit 0 ("0 errors").
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md` piped through a line-range filter for D-243 and D-247 (lines 5142-5320) — no line inside either entry (the grep itself finds hits elsewhere in the file, in other entries not mine).
- Product gate (`npm test`): not run, as the handoff says.

## Own-work check
Requirement most likely unmet: no remaining text in D-243/D-247 pointing to a private document or to the author's process. Check: read both entries after the edit and ran the grep above plus a search of the two entries for "definition", "readiness", "plan checked", "task" — none left in the added or kept sentences (D-247's remaining "the plan" occurrences: none in the *Rationale*/*Rejected*). Result: clean.

## Reaches beyond the dispatch
- `.the-way/task-cycle/change/fix.md`, `.the-way/elements/decisions/skill/{read,decide_entry}.md`, `.the-way/elements/common/way_of_working.md` (skill steps); `foundations/decisions.md` D-187 (model of the rejected-ways fix), D-329 and D-330 (placement at the head); `maps-screen.tsx` lines 236-340; snapshot `vault/petla_zarobkowa_loop2.md` (Q1, Q7) and `vault/karty_i_katalog_map_loop2.md` (To do 8). Reason: verifying the findings at the head.

**Unread material:** `elements/decisions/template.md` and `elements/common/rules.md` (named by `way_of_working.md` step 1) were not read whole; the edit only removes words and adds none beyond the reviewer's fix text, so no template rule was applied from memory. `way_of_working.md` was read in part (first ~120 lines).

**Searches not found or unclear:** none. (HEAD at start was `cdf5ee15`, later than the reviewed `f3194047`; the two entries were unchanged in the passages the findings quote.)
