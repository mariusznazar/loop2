# Return report — task trzy-chwile-gdy-czas-stoi

**Status: done.** Commit: `66c9d371` (foundation only; code at `4e87b0d7` unchanged). Nothing pushed.

## For the record's *Return step* section

- **Foundation compared with code** (code at `4e87b0d7`): D-322, D-311, D-271, D-39, D-42, D-315, D-371 and the fact `wcag-three-flashes` (the change's own entries); D-04, D-62, D-122, D-132, D-272, D-314–D-321, D-349, D-365, D-367–D-373, D-43 and the glossary entries `completion`, `map run restart`, `manual map run`, `Understanding` (named by the task or found by searching the foundation for the scene, the window, the plaques, the specks, the tint and the effects), plus the invariants `sprite-file-content`, `loop2-container-sprites`, `design-token-contrast` and the fact `pixel-crawler-terms`. What no longer matched, and the correction (all in D-322, `66c9d371`):
  - the binding text said the icon of "each thing" has a plaque; the code shows each icon once (shared icons: „Idź”/„Idź — ognisko”, „Zbierz”/„Obchód”) — now "each icon once", and the Verification of D-322 already has the plaque rows;
  - the entry did not say which way the dead mage falls; the code turns it toward the middle of the frame (at the right edge the fallen mage would be cut off and lie under the frost) — now in the binding text and in *Verification* (complies: a mage that died in the right half falls to the left);
  - the entry did not say how a moment is told from a redraw; the code reads the events of the simulation call (D-04) — now in the binding text, with `derives from D-04` added to *Relations*.
  Everything else matched: D-311 (window after the effect, at once at an entry, a reload, a load and under reduced motion — checked in the real game), D-371 (header button during the wait), D-315 (tint under plaques, specks, frost; cold layer over the tint, under the frost), D-39/D-42 (plaque frame, four criteria), D-271 (specks without a ratio, frost 3:1), D-122/D-62/D-132/D-368/D-370 (no wording contradicts the effects or the delayed window; D-370's rationale already expects the effect before the window). D-317 stays as it is (the task: "Bez zmiany"; the sentence on the three moments is written by task 20).
- **Decisions written or changed:** D-322 changed in this step (above). Written by the foundation step and the fix and not changed here: D-322 (rewritten), D-311, D-271, D-39, D-42, D-315, D-371.
- **Invariants:** none written. D-42's 2.3.1 and the plaque pair are already tied to `design-token-contrast` and the tests run in the review; no rule of the task, a decision or the human asks for a new one, and none is written for behaviour only because none covers it.
- **Environment facts:** `wcag-three-flashes` (foundation step). No source outside the product is missing: the pack files were read from the local clone of `loop` and only the pixels' addresses are cited in the token comments, which the product's own rule for token sources keeps; the W3C page is the fact's source.
- **Glossary terms:** none. Under WAY-95 a word takes an entry only where a reader who knows the field would read a sentence wrongly: "moment", "effect", "last image", "plaque", "specks", "cold layer" and "tint" are used as the field uses them (D-322 says what each is where it is used), and no sentence of the foundation reads differently for them. No term was used against its entry.
- **Part-map changes:** none. `browser-view` already holds `assets/sprites/**` (files and trust boundary), `src/browser/view/**`, `tests/view/**`; the one data file is in `simulation` (`src/browser/sim/**`); no part, dependency or boundary changed.
- **Projected entries written whole or in part:** D-42 (the projected wording, written whole by the foundation step; `Verification` names `design-token-contrast` and `browser-view-focus-outline`). Of „(new) — How long do the scene's effects last?” (D-317) nothing is written: the task assigns the sentence to task 20.
- **Rows of *Settlements to record* and their identifiers:**
  - 1 (effect plays once, last image, „Wznów” cuts, redraw shows last image) — D-322;
  - 2 (plaques with the frame in `discovery`) — D-322 and D-39 (frame), D-42 (the 3:1 pair);
  - 3 (fall, cold layer only after cold) — D-322, its *Rejected* changed as the row says;
  - 4 (specks over the full gold, mage in colour) — D-322 (and D-271 for the specks as a layer of CSS squares);
  - 5 (end in the minute of a discovery shows the end alone) — D-322;
  - 6 (only the effect moves; the fire stands, the mage too at a discovery and a completion) — D-322;
  - 7 (window after the effect, at once at the last image) — D-311 (and D-371 for the button during the wait).
  No row was missed.

## Choices that bind after the merge (WAY-36) and the rest

Written (they bind later work: task 20's wolf stands beside the lying mage; any new moment):
- Choice 1, what tells a moment from a redraw — the events of the call (in D-322).
- Choice 4, the same icon once — in D-322.
- Choice 7, the dead mage falls toward the middle of the frame — in D-322 (the sheet offset itself is a file detail, not written).
- Choice 5, plaques over the tint — already in D-315 and D-322 (foundation step).

Left as rows of the questions table for the orchestrator (no entry, no deferral):
- Choice 2, the durations in CSS (960 ms fall, 600 ms plaques 150 ms apart, 1800 ms + up to 900 ms specks): the human judges them at the request, and the styleguide already says where durations stand.
- Choice 3, the cold layer comes in with the fall rather than at once: the human may ask for the other.
- Choice 6, reduced motion read by the game view (`matchMedia`) for the window, the scene relying on CSS: a mechanism; the behaviour is in D-311.
- Choice 8, the window gated in the game view (`effectPending`): a mechanism; the behaviour is in D-311/D-371.
- The death sheet's offset (+13 columns, +32 rows) and the choice of the speck/cold colours: the colours are the human's at the request.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors` (run before and after the edit).
- Prettier does not format `foundations/decisions.md`; no other file changed in this step.

## Unread material

none beyond the author report's list; this step read `return_step.md`, `foundation_step.md`, `return-handoff.md` and WAY-95 whole, and the glossary entries `completion`, `map run restart`, `manual map run`, `Understanding`.

## Searches not found or unclear

none
