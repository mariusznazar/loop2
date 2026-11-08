PASS

# Report 04 — reviewer of the revised spec

- Revised spec: `docs/task-cycles/kronika-z-filtrami/spec.md`
- Compared with: `docs/task-cycles/kronika-z-filtrami/spec-reviewed.md` (the spec as reviewed in
  report 02)
- No file changed but this report; no plan, no code, no test or check of the product run.

## What the revision changed

`diff spec-reviewed.md spec.md` shows a single hunk, at line 543 of the reviewed spec. The "to
check" bullet of *Foundation entries* gains one sentence and three sub-bullets: D-122 *Rationale*,
D-272 *Verification*, and D-311 *Rationale* with D-311 *Rejected*. No other line of the spec
changed. The design (D1–D11), *Constraints*, *Goals and non-goals*, the readings of D5 and D9, and
*Left to the maker* are exactly as reviewed. This matches what report 03 says it changed.

## The earlier finding

- **F1 — resolved.** Each place F1 named now stands in the "to check" bullet, quoted, with the
  reason it becomes untrue, and the wording is left to the foundation step. I checked each quotation
  against `foundations/decisions.md`:
  - D-122 *Rationale* — `:2250-2252`, quotation exact.
  - D-272 *Verification*, the "complies" example — `:5710-5712`, quotation exact.
  - D-311 *Rationale* — `:6719-6724`, both sentences exact.

## What the revision added beyond F1

Both additions hold:

- **D-311 *Rejected*** (`:6732-6733`): "„Teraz” and „Potem” under the paragraph of the last
  encounter and the line of the end of the map run — they move down at each attack as the paragraph
  grows". The quotation is exact. After To do 6 the paragraph does not stand in the world area, so
  the reason no longer holds as written. Naming it is right and contradicts nothing.
- **D-122, `:2252-2253`, named as staying true:** "the screen after a completion can keep both the
  band and the encounter's paragraph". This holds: after a completion the paragraph stands as an
  entry of the chronicle in the right area (D6, D9), and "can keep" does not require it in the world
  area. It is not a finding.

The revision introduced nothing new that would make the build go wrong.

## Reaches beyond the message

- `foundations/decisions.md`:
  - `:2801-2812` (D-148, whole), to check report 03's claim that "the encounter line" of its
    *Verification* stays true. It does: the wolf stays named in the encounter's text, which is now
    in the chronicle.
  - The lines quoted above, all already read in review 02.
- Grep over `foundations/` for `encounter line|combat line|combat-line`. The only match is D-148
  `:2809`. Review 02's grep for "paragraph" over `decisions.md` had already listed the other
  mentions.

## Searches not found or unclear

- Any change in the revised spec beyond the "to check" bullet: none (the diff has one hunk).
- Another foundation entry that places the paragraph of the last encounter in the world area,
  beyond those the revised spec names: none found.
- Unclear: none.
