# Return report — task wilk-wbiega

**Status: done**

**Commits:** `f20b21b7` (docs: D-316, D-317, D-367). Nothing else changed; no code, CSS, sprite or test touched.

## Foundation compared with code (at `66b814d1`)

Compared: D-271, D-148, D-316, D-317, D-322 (the entries the change wrote), `lpc-wolf-licence`,
`sprite-credits`, the part map row; D-147, D-141, D-27, D-272, D-273, D-318 to D-321, D-349 (the task's
*Decisions in play*); D-311, D-365, D-366, D-367 (found by search for the effects of a gathering, the end
window and the scene's stops); the part map for `browser-view`.

What no longer matched, and the correction (all in `foundations/decisions.md`):
1. **D-367** said "an effect that comes while another still runs takes its place". After the fix the scene keeps
   the wolf's effects in a slot of their own, so a gathering's effect and the wolf's do not take each other's
   place. Now: "an effect of a gathering that comes while another still runs takes its place, while the effects
   of the wolf (D-316), which belong to another part of the scene, are neither taken by it nor take it."
2. **D-317**: said nothing of one reading carrying two effects. *Rationale* gains: effects of different parts of
   the scene, such as the flight of an icon and the run of the wolf, play together where one reading carries both
   events, since a game minute can end a gathering and bring an attack; *Verification* complies gains the reading
   that carries the end of a gathering and an attack showing the flight or the dust and the wolf's run in.
3. **D-316**: the run in does not hold once the scene is dead or complete. Binding sentence gains "a death of the
   character or the solving of the map within the run leaves it standing beside the mage"; *Verification* violates
   gains a wolf held on its way by a death within the 300 ms of its run; *Rationale* gains why (at 16× the combat
   is decided 312 ms after the attack) and that the creature stands on the side where its frame lies inside the
   picture, which at every place but the right edge is the right (the rule the test now reads from the data).

No longer matching: none else. D-322 (the stop at the first attack, no run in, motion stands still) agrees with the
code, also for a run in paused by the player; D-311 (the window opens after the effect of a death or completion)
is untouched since the wolf's effects are not moments' effects; D-318 (the mage stays in a fight; it turns, it
does not move), D-319, D-320 (no icon in combat), D-321, D-349, D-147, D-141, D-148, D-271, D-272, D-273, D-365,
D-366 agree with the code. D-27 speaks of icons only; the credits of the packs are carried by D-271 and
`sprite-credits`, as before.

## Entries

- Decisions changed: D-316, D-317, D-367 (above), in this commit; D-271, D-148, D-316, D-317, D-322 written earlier
  by the foundation step.
- Invariants: none written (no rule set by the task, a decision or the human that lacks one; `sprite-credits`
  already carries the credit rule with `lpc-wolf-licence` in *Rests on*).
- Environment facts: none new (`lpc-wolf-licence` written earlier; no further source outside the product).
- Glossary terms: none. "Effect of an ordinary event" and "the three moments in which time stands still" are
  defined in D-317 and used in its meaning; "scuffle" and "run in" are plain words used as they read.
- Part map: no change in this step (the External context row for the LPC Wolf pack written earlier).
- Projected entries written whole or in part (earlier, foundation step): "What does the scene show, and from what
  does it draw?" (D-316, whole, with its earlier sentences kept; the clause "the moment of the map run" restored
  by the fix), "How long do the scene's effects last?" (D-317, whole with the three planned additions), D-271
  (whole), D-148 (whole), `sprite-credits` (Rests on), `lpc-wolf-licence` (whole).

## Rows of *Settlements to record* (frozen task, rows 1–9)

1. LPC Wolf on CC BY 3.0 — D-271 (binding sentence, *Based on* `lpc-wolf-licence`, *Rationale*, *Rejected*)
2. run in from the right edge, beside the mage, the mage turns — D-316
3. what an effect of an ordinary event is and is not — D-317
4. reduced motion, whole rule — D-317
5. scuffle with the cloud of dust, no flash — D-316 (no flash also D-317)
6. the four outcomes; the defeated or departing wolf leaves the scene — D-316
7. the stop at the first attack — D-322
8. the page of the pack: licences, link, credit asked — environment fact `lpc-wolf-licence`
9. the credit line of each pack — invariant `sprite-credits` (written by task 17 in the row-9 form; this task added
   the fact the wolf's licence rests on)
All nine are carried; none was missed.

## Choices that bind after the merge (WAY-36)

Written as binding: the wolf's effects play beside a gathering's (D-317, D-367) and the run in not holding once the
scene is dead or complete (D-316); the side by room (D-316 *Rationale*); the picture standing in the game's data
(already D-316); the cloud reusing the dust's file (already D-271: the cloud of a scuffle is a sprite of the
same pack, recoloured); the layer order and the overlap of the falling mage (styleguide and D-316 *Rationale*,
earlier).

Left as rows of the questions table (the orchestrator enters them):
- which of the six sheets (sheet 1, brown) and the cut (pack's left-facing set, frames 64×32 moved unchanged,
  idle = the walk row's first frame, no mirrored file), rejected: the right-facing set mirrored;
- the gap of 2 px and the cloud's height of 3 px (the human's to judge at the request, per the handoff);
- the cloud reusing `dust.png` as a loop of its eight frames, rejected: a new recoloured file or a reversed order;
- the run in as an attribute on the state-derived wolf, rejected: a separate overlay;
- the mage turning only when it stands still and keeping its facing after the fight;
- the run's frames played once through the 300 ms (5, 4 and 5 frames), not at the 160 ms beat.
Not an entry: N-1 (the `paused` half of the guard has no test).

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors" (run after the edit and again after
  rewording one sentence)
- `npm test -- tests/quality/test_quality_invariants.py` — exit 0 (prettier covers the Markdown)
- Not run: the full `npm test` (the orchestrator's).

## Unread material

- Entries of the handoff's list read in full this round: D-311, D-365, D-366, D-367. D-27, D-147, D-141, D-318 to
  D-321, D-349, D-272, D-273 re-read only where they touch the change (they were read in the earlier rounds); the
  glossary read by its headings and the entries for "beaten attack", "combat turn", "completion", "solved map"
  (not every entry whole).
- `.the-way` skills for the element entries: `the-way-record-decision` read in the first round; the edits are
  in-place changes of binding sentences, *Verification* and *Rationale* of three decisions.
- `reports/review-2-report.md`: not read.

## Searches not found or unclear

none
