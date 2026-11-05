PASS 16309a93bb54b752c60d15fd4a4379157d64ba36

# Review of correction 1, task edytor-programu

Range 52797e5f7ab8..16309a9 (one commit, HEAD confirmed, foundations/decisions.md only, 22+/14-).

## Remarks
1. D-289 (held value no listed reason fits): MADE. Binding sentence now reads "with its reason where one of those above fits and with none otherwise" (decisions.md:6117-6118). The "violates" example now reads "a greyed cell with no reason where one of the listed reasons fits"; a "complies" example for the no-reason held value was added (6128-6129). Code agrees at head: src/browser/view/program-editor.ts:543-545 (reason is null on a held value no reason of PICK_REASONS fits; "the editor makes none up"; chosen and greyed), :654-656, :697-699, :720-722. No reason sentence invented.
2. D-304 (where "+ dodaj grupę" stands): MADE. Binding sentence: "stands under the rule groups, in the notation of „+ reguła”, at the foot of the list" (6417); no "beside"/"obok" left in the entry; Verification, Rationale agree. Code agrees: src/browser/view/rule-list.tsx:636-643 (button in the list footer "rule-list-actions" after the groups).

## Diff review (section 2)
- Only D-289 and D-304 changed; no other entry touched. Relations and Scope unchanged. Origin of both extended with the human's decision, 2026-11-05. Rationale/Rejected agree with the binding sentences.
- Repeat search in foundations/ for "obok", "beside „+", "no reason", "dodaj grup": no repeat of the old rule elsewhere (other "beside" hits are unrelated; hits at 3394, 3469, 6068 are other meanings of "reason"/"no reason"). D-306's "a greyed cell stays within the keyboard's reach so that its reason can be read" is not contradicted.
- Entries well formed: foundation_check.py -> "0 errors", exit 0.

## Findings
- Minor: foundations/decisions.md:6417-6418 — D-304 binding sentence is on one overlong line followed by a short wrapped line (rest of the file wraps near 100 columns); cosmetic.
- Minor: the added Rejected clauses ("a reason sentence for a held value ... — wording not yet set ... only a composed state or an old save reaches it" in D-289; "the two buttons on one line — when the last group is folded its „+ reguła” is hidden" in D-304) are not in the remarks; they are derived from the recommended options' reasons and the correction report names them as choices. The claim "only a composed state or an old save reaches it" is not verified against code in this review. No rule is invented by them; not blocking.

## Checks run
- git rev-parse HEAD; git log; git diff 52797e5f7ab8..16309a9 — read.
- python -B .the-way/elements/common/foundation_check.py — "0 errors", exit 0.
- grep over foundations/*.md for obok/beside/no reason/dodaj grup — see above.
- git status clean of my changes (read-only). Full gate not run (as instructed).

**Searches not found or unclear:** none
