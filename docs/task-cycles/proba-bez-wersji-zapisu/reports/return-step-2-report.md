# Return step report 2 (after correction 1) — proba-bez-wersji-zapisu

**Status:** done. Nothing no longer matches; no commit made (head stays `18835d28`).

## Foundation compared with code

- **D-234** against the instruction as it stands: its binding sentence says the operator repeats the trial every month and after each change of the database's schema version; the instruction (both copies, "Trying a backup on the operator's computer") says the same, and its hint on `SAVED_GAME_VERSION` stands outside the condition. Step 5 of the trial names "the marker name written down last, as in the install step 8", and step 7 of "Restoring over the server's database" now says the marker is the name "written down last"; the two agree. D-234 says nothing of the marker or of the steps; its sentence on restoring over the server's database being a human's documented procedure is true.
- **D-96** against the paragraph on the version of the saved game in "Restoring" (untouched): its sentence on a discarded saved game state of another version starting a new game, with the sentence of another version above it, matches the paragraph.
- **D-360** (derives from D-234): its restore procedure ends by saying whoever reset a password resets it again; step 8 of the procedure holds that; the correction touches only step 7.

## Search of the foundation (once more)

`git grep` over `foundations/`, `guidelines/` and `AGENTS.md` for "marker", "step 7" and "restoring over". The only hit outside the instruction is `foundations/decisions.md:2200` (D-234, the sentence just named). No decision, invariant, environment fact, glossary entry or guideline names the marker of the restore over the server, nor step 7 of that procedure.

## What was written or changed

None: no decision, invariant, environment fact, glossary term, part-map change or projected entry. Row 1 of *Settlements to record* stays written as before (D-234, commits `9d8cfce3` and `509961a1`).

The two Minor findings of the review of the correction that no fix takes (C1, O1) were not fixed and no entry is written for them, as the handoff gives.

## Checks

None run; nothing changed.

## Unread material

none of what the handoff names: the review of the correction (`reports/review-correction-1-report.md`) was not read, as the handoff names only its outcome; the return step's files were read whole in the first return step.

## Searches not found or unclear

none

## Working copies

None made; `.runs/author/` does not exist.
