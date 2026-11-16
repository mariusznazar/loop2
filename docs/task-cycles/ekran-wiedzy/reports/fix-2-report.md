# Fix 2 report — task `ekran-wiedzy`

**Status:** `done`. One commit, `45a7caf4` (`mariusznn@gmail.com`), on the reviewed head `42e15a5d`. No push, no full gate. m2 and n1 are untouched.

## Finding I1 — fixed

`foundations/decisions.md`, D-280 *Rejected*: „*Rejected:* a fourth item „Konta” on the menu bar, only for an account with the owner role — …” became „*Rejected:* one more item „Konta” on the menu bar, only for an account with the owner role — …”. Only the ordinal changed (the reviewer's preferred wording, which needs no correcting at the next screen); the rest of the sentence and of D-280 is as it was. The commit is a one-line diff (`1 insertion, 1 deletion`).

## Search of `foundations/` and `guidelines/` for other counts of the bar's items or screens

Searched, with `grep -n -i`, `foundations/*.md`, `guidelines/*.md` and `README.md` for: fourth, third item, three items, first three, fifth, fourth screen, five/four/six/three screens, third of, two items, three clicks, at most three; and `guidelines/*.md` for the Polish forms (czwart, trzy pozycj, trzech pozycj, trzy ekran, pięć ekran, pięciu ekran, trzeci, piąt). Each hit that is about the bar or the screens:

- `decisions.md:4188` (D-280 *Rejected*, „a fourth item „Konta””) — untrue for a bar of four; corrected as above.
- `decisions.md:4149`, `:4180` (D-280) and `:9440`, `:9442` (D-330): „the three clicks” to a first map run (the choice of the map, its row, „Wejdź”) — they count clicks, not items; the way is still three clicks, so true.
- `decisions.md:4199` (D-280 *Rejected*): „Mapy and Wiedza standing on the menu bar at once, inactive — two items with no content” — a way weighed and rejected (two inactive items); it says nothing about how many items the bar holds, so true as a rejected way.
- `decisions.md:4156`–`:4163` (D-280 *Verification*, five screens and the return entry on four screens): true, as the tests hold them; it is m2's family and stays for the request's list.
- Other hits (`:13`, `:910`, `:2398`, `:2983`, `:3002`, `:3237`, `:4405`, `:5072`, `:5077`, `:6846`, `:6858`, `:6934`, `:10091`, `:10132`, `invariants.md:800`, `testing.md:176`) are ordinals and counts of other things (versions, limits, requests, ranks, moves, fractions), not of the bar or the screens. `guidelines/` and `README.md` give no hit about the bar's items or screens in either language.

No other sentence of the same kind was found, so nothing else was corrected.

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py` — 0 (0 errors, test citations on), after the edit.
- `python -B .the-way/instruction-files/check_instructions.py` — 0 (0 errors).
- No code or test changed, so I ran no test file. Not run: the full gate.

## Own-work check

The requirement this fix could break: a test citation of D-280 (`decision:` lines quote its binding sentences). The edit lies in *Rejected*, which no citation quotes, and `foundation_check.py` with test citations stays at 0 errors.

## Unread material

`fix-2-handoff.md`, `review-return-findings.md` and `.the-way/task-cycle/change/fix.md` read whole. `review-return-report.md` **not read** (the handoff says the findings file is enough). The hits of the search were read as lines (the surrounding sentence for the ones about the bar), not each entry whole.

## Searches not found or unclear

none.

## Working copies

`.runs/author-fix-2/` was made (it held nothing) and removed with `rm -rf` before returning.
