# Report: fix of review 1, finding I1 (D-312)

(Saved by the orchestrator from the agent's returned text: the harness refused the agent's own write.)

- **Status:** done
- **Commit:** `9defb90` on top of `be3f408`; changes only D-312 in `foundations/decisions.md` (+25 −13).
- **Check:** `python -B .the-way/elements/common/foundation_check.py` exit 0, „0 errors”, before and after the commit.

## I1: fixed, not contested
The old wording named the copy's first rule group as it stands; a drag of another group above it, or a deletion of that group, made the band name the wrong group.

## How D-312 now reads
- Binding sentences, following the orchestrator's answer: the sentence about the rule appears only in the band of the discovery at which the game wrote the rule (D-123); {nazwa grupy} is the name of the copy's first rule group, in the program editor's order, that holds the rule „Zawsze → Eksploruj”; the rule gets no number; where no group of the copy holds that rule, the band leaves the sentence out.
- *Verification*, complies: at the first chill of a new game the band names „Program”; the game writes the rule into „Ogień”, the player drags „Głód” above it, the band still says „Ogień”; renaming „Ogień” to „Ciepło” makes the band say „Ciepło”; deleting the rule removes the sentence and keeps the rest of the band.
- *Verification*, violates: „Głód” named after that drag; the sentence still standing after the rule or its group is deleted; the sentence at a discovery where the game wrote no rule; „1.1” as the rule's number; the group taken from the saved program instead of the copy.
- *Rationale*: „Accepted with it” holds only the weak point the human accepted in question 6 (a longer sentence in the band). The orchestrator's cost is written as „Its further cost”, not attributed to the human: where the player keeps their own „Zawsze → Eksploruj” in a group dragged above the one the game wrote into, the band names that earlier group. The entry does not say "the cycle accepted this" (the template forbids prose about how a decision was reached); the `the cycle's` mark and the request carry that.
- *Rejected*: question 6's three ways, plus the orchestrator's two rejected ways with their reasons: (a) a group name the screen holds from the moment of the discovery — lost when a paused game is loaded, stale after a rename; (b) the first group as it stands — false after a drag or a deletion.

## Scope of the fix
- Mark `the cycle's` kept. M1 and M2 not touched. No other foundation entry names D-312 or quotes its sentence.

## Searches not found or unclear
None.
