# Report 11 — fix of slice 1 (finding I1 with M4)

- **Status:** done
- **Commit:** `d190e10dbe46b0fb1c7df83325c79665e4e4bf59` ("docs: let highlight mark a control under the
  pointer and keep a control's text role on hover") on `5ef77fc`. Not pushed. Author
  `<private address>`.
- **Method:** `.the-way/task-cycle/change/SKILL.md` as the agent fixing a review's findings; the D-40
  change through `.the-way/elements/decisions/skill/SKILL.md` with `elements/decisions/template.md`,
  `elements/common/rules.md` and step 4 of `elements/common/way_of_working.md`.
- **Read:** `reports/10-slice1-findings.md` whole (the orchestrator's settlement S1-I1, I1 and M4 in
  the reviewer's words); `reports/09-slice1-review.md` at the finding; D-40 and every entry naming
  D-40 or `highlight` (`grep` over `foundations/`: D-39, D-42, D-43's rationale,
  `design-token-contrast`).

## Files changed

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 3 | 3 |
| `guidelines/styleguide-browser-view.md` | 9 | 6 |

## Each blocking finding

**I1 — fixed**, by the orchestrator's first way:

- D-40, binding sentence: `highlight` now means "that this row or track is marked or that this
  control is under the pointer". *Verification* gains the complies example "a button under the
  pointer on the background `highlight`, its frame and its text role unchanged"; the violates example
  (the button chosen in a group shown by `highlight` alone) stays and stays true, since selection is
  `selected`. *Origin* gains "Q12. Jakie są wspólne kontrolki i ich stany?". *Rationale* and
  *Rejected* unchanged: Q12 gives no reason of its own for the hover background, and a rationale I
  wrote would be my motive, not Mariusz's.
- Meaning in Polish, for *What this request settles*: tło `highlight` znaczy „ten wiersz albo tor
  jest zaznaczony albo ta kontrolka jest pod kursorem”.
- Styleguide: the Roles row of `highlight` reads „Ten wiersz albo tor jest zaznaczony albo ta
  kontrolka jest pod kursorem.”; rule 6's hover line reads „tło `highlight` (D-40), ramka i rola
  tekstu bez zmiany”.
- What follows from the change (step 4.4): no decision derives from or narrows D-40; the one
  invariant deriving from it, `design-token-contrast`, keeps its sentence — `highlight` is still a
  background, and the pairs a hovered control makes (each text role and `control-border` on
  `highlight`) are already among its pairs. D-39 and D-42 name `highlight` only as a background.
  Nothing else changes.

**M4 — fixed with I1:** rule 2 now says an element given `page`, `panel` or `highlight` takes `text`
unless it already has another text role, and an element or a part of it with another text role keeps
it on each of the three backgrounds (D-39, D-40), with the two cases of the finding: a destructive
button under the pointer keeps `danger`, the selected button keeps `text-strong`.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (changes staged, and at `d190e10`) | 1 | the same 12 pattern errors as at `19d0116` and `5ef77fc` (`diff` of the outputs empty); no other error |
| `python -B .the-way/instruction-files/check_instructions.py .` | 0 | `0 error, 14 warn, 3 info`, as before |
| `python -B .the-way/instruction-files/check_instructions.py . --file guidelines/styleguide-browser-view.md` | 0 | `0 error, 25 warn, 4 info`, as before (the 11 dead paths of later slices) |
| scratch `check_form.py guidelines/styleguide-browser-view.md` (report 08) | 0 | `0 problems` — form, roles, invariants and no values still hold |
| `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py` | — | `OK` (exit not captured: the command ran piped through `tail`); not needed by the fix, run as a spot check of the foundation's one reader test |

Not run: `npm test` — the cycle's run before the request; only Markdown changed.

## Concerns

- D-40's *Rationale* says nothing of the hover use; the reviewer may want a reason there, which would
  have to come from Mariusz, not from me.
- The other Minor findings of `09-slice1-review.md` are not fixed, as the dispatch says.
