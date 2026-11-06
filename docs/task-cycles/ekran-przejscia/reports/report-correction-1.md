# Report: correction 1, N1 in D-312

(Saved by the orchestrator from the agent's returned text: the harness refused the agent's own write.)

- **Status:** done
- **Commit:** `e35e91d` on top of `3c4291d`; changes only D-312 in `foundations/decisions.md` (+9 −7).
- **Check:** `python -B .the-way/elements/common/foundation_check.py` exit 0, „0 errors”, before and after the commit. Nothing failed; no other check run.

## The remark and how it is met
The human answered „tak, popraw proszę” (fix it as the finding says), so N1 is fixed as the reviewer described. D-312's binding sentence, its mark `the cycle's` and M1, M2 unchanged.

- The *violates* example about deletion is qualified: „the sentence still standing after the rule or its group was deleted while no other group holds „Zawsze → Eksploruj””; it agrees with the binding sentence.
- The further cost in *Rationale* covers both cases: where a rule „Zawsze → Eksploruj” of the player's own, such as one „+ reguła” adds, stands in another group that comes first — dragged above the one the game wrote into, or left standing after the game's rule or its group is deleted — the band names that group. Not attributed to the human.

## Two edits the remark did not name
The same fix, carried to examples the binding sentence would otherwise contradict:
- The drag example under *violates* forbids naming „Głód” after the drag; if „Głód” holds its own „Zawsze → Eksploruj”, the binding sentence names „Głód”; the example adds „while „Głód” holds no rule „Zawsze → Eksploruj””.
- The deletion example under *complies*: „the rule deleted while the band stands and no other group holding „Zawsze → Eksploruj””.

## Searches not found or unclear
None.
