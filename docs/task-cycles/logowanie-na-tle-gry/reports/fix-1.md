# Fix report — findings-1, task `logowanie-na-tle-gry`

**Status:** done

## Commit (branch `claude/keen-curie-jazxic`, from `f8d8e52`, not pushed)

- `03ab360` docs: let D-273 say that any further PNG file of assets/sprites/ leaves its boundary as
  it is, as the task's settlement and the testing guidelines say

Files: `foundations/decisions.md` (+4 −4).

## I1 — fixed

The reviewer is right: the task's question 3 *Answer* ("Kolejny plik PNG nie kończy odstępstwa") and
row C1 ("kolejny plik PNG go nie kończy") carry no "of the pack", and D-273 names no pack, so the
words had no antecedent in the entry and narrowed the settlement.

How: in D-273 the binding sentence now reads "…what changes the boundary is read as D-76 reads it,
so a further PNG file does not." and the *complies* example "a task adding a further PNG picture to
`assets/sprites/` with no refusal test, its review checking that the file holds pixels alone". The
lines were rewrapped; nothing else of the entry changed. The meaning now matches
`guidelines/testing.md:178-180` ("kolejny plik PNG w `assets/sprites/` nie zmienia granicy
obrazków") and row C1. The edit follows `the-way-record-decision`: an in-place edit of an entry
written in this change, on the task's own settlement, so no question to the human.

Checks:
- `grep -n "of the pack" foundations/decisions.md` → only line 5617 (D-271, where the pack is named
  and the words are correct); before the fix also 5672 and 5679.
- `grep -rn "further PNG\|kolejny plik PNG" foundations guidelines` → D-273 :5671, :5679 and
  `guidelines/testing.md:179`, all without a qualification.
- `python -B .the-way/elements/common/foundation_check.py` → exit 0, "0 errors".
- Search of the foundation for other restatements of the deferral (step 2 of the skill): D-73, D-76
  and the testing guidelines' row `assets/sprites/` and paragraph — none names a pack.

No code changed, so no other check is affected. Not run: the full gate (the cycle's). Minor findings
M1–M3 are not mine to fix.

## Searches not found or unclear

none
