# Report 03 — designer, revision of the spec for F1

- Status: **done**
- Spec: `docs/task-cycles/kronika-z-filtrami/spec.md` (revised in place; `spec-reviewed.md` untouched)
- No tracked file changed; no plan, code, foundation entry, test or check of the product.

## What changed

Only the "to check" bullet of *Foundation entries* grew. After D-185 and D-276 it now names, each
with the sentence the change makes untrue, for the foundation step to word:

- D-122 *Rationale* (`foundations/decisions.md:2250-2252`): "a player who goes on at once loses the
  list of discoveries, since the game keeps no record of them" — confirmed. The next sentence, "the
  screen after a completion can keep both the band and the encounter's paragraph" (`:2252-2253`),
  is named as staying true, since the paragraph stands in the chronicle on that screen.
- D-272 *Verification*, complies example (`:5710-5712`): "the paragraph of the last encounter on the
  solid background under it" — confirmed.
- D-311 *Rationale* (`:6719-6724`): the two sentences F1 quotes — confirmed. Added beyond F1, found
  by the search: D-311 *Rejected* (`:6732-6733`), "„Teraz” and „Potem” under the paragraph of the
  last encounter … — they move down at each attack as the paragraph grows", whose reason no longer
  holds as written.

Nothing else in the design changed; the readings of D5/D9 are as reviewed.

## Reaches beyond the message

- `docs/task-cycles/kronika-z-filtrami/reports/02-spec-review-report.md`, whole.
- `foundations/decisions.md` lines 2243-2254 (D-122 *Rationale*), 5700-5726 (D-272 whole) and
  2940-2952 (to rule out a match of the search at `:2949`, which is D-157/D-158, "paragraphs" of an
  email — not relevant).
- Search over `foundations/` (decisions, invariants, glossary, part map, environment facts) for
  `paragraph|last encounter|last-encounter|encounter line|combat line`, and over
  `foundations/*.md` for "world area".

## Searches not found or unclear

- Another entry, beyond D-122, D-147, D-185, D-272, D-276 and D-311, that puts the paragraph of the
  last encounter in the world area: none found. D-148's "the wolf named in the encounter line"
  (`:2809`) and D-147's *Rationale* "at the cost of space for a long paragraph" (`:2798`) stay true,
  the paragraph only moving to the chronicle. No invariant or glossary term mentions the paragraph.
