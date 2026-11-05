# Report — correction 1, task `edytor-programu`

**Status:** done. **Commit:** see below (one commit on `task/edytor-programu`, `foundations/decisions.md` only, nothing pushed).

## Remarks as made, and how
1. D-289, option (a) accepted. Done: binding sentence now "with its reason where one of those above fits and with none otherwise"; Verification: the "violates" example "a greyed cell with no reason" now reads "... where one of the listed reasons fits", a "complies" example added for the held value no reason fits; Rationale gives the accepted consequence (no reason sentence set; only a composed state or an old save reaches it); Rejected gives the reason sentence for that case with its price; Origin names the human's decision at the request, 2026-11-05.
2. D-304, option (a) accepted. Done: binding sentence "stands under the rule groups, in the notation of „+ reguła”, at the foot of the list"; no "beside" left; Verification examples agree; Rationale agrees; Rejected adds the two buttons on one line (when the last group is folded its „+ reguła” is hidden, nothing stands beside); Origin as above.

## Entries changed (one sentence each, Polish)
- D-289: Wartość trzymana przez regułę, której nie ma w wyborze, widać w panelu jako wybraną i wyszarzoną, z powodem tylko tam, gdzie pasuje któryś z wymienionych, a bez powodu w pozostałych przypadkach.
- D-304: Przycisk „+ dodaj grupę” stoi pod grupami reguł, w zapisie „+ reguła”, na dole listy.

## Search for repeats
`foundations/decisions.md`, `invariants.md`, `glossary.md` searched for "beside „+ reguła”", "obok", "a greyed cell with no reason", "dodaj grup", D-289, D-304. Hits: only D-304 and D-289 themselves (fixed). D-306 (decisions.md:~6466) says "A greyed cell stays within the keyboard's reach so that its reason can be read"; true for cells with a reason, no contradiction, left untouched. Nothing in invariants or glossary.

## Check
`python -B .the-way/elements/common/foundation_check.py` -> "0 errors", exit code 0 (not piped). Full gate, tests not run (as instructed).

## Reach beyond the handoff
Read `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md` (the skill's and its named files). Added no invariant, no code.

## Choices
- Wording of the Rejected for D-289 names its price as "wording not yet set, for a case that only a composed state or an old save reaches" (from the question's recommendation). Alternative: leave Rejected without a price; cost if wrong: template expects a cost beside each way.
- Did not carry "as in the predecessor game" into D-304's Rationale (not in the remarks).

**Searches not found or unclear:** none
