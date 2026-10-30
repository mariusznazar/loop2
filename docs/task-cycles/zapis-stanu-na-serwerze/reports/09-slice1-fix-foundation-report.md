# Fix report — Slice 1 review finding I2 (foundation), task `zapis-stanu-na-serwerze`

- **Status:** done
- **Variant:** the fix of a review's findings (`.the-way/task-cycle/change/SKILL.md`, `fix.md`), from
  head `b4c3687`
- **Commit:** `59cd18a` docs: :memo: show the update sentence after logout also for a tab that
  already stopped saving (parent `b4c3687`, author address the private author address)
- **Files changed:** `foundations/decisions.md`, 3 added, 3 removed (`git show --numstat 59cd18a`)

## I2 — fixed

The finding holds: D-97 gave „Gra została zaktualizowana. Odśwież stronę.” above the forms only
"when it refuses it as of a lower version (D-187)", that is when the save at logout is refused,
while Settlements row 6 (`task.md:295`) and question 17, way C (`task.md:144-149`), keep the
sentence also for the tab that already stopped saving after that refusal and logs out without a
save — the usual case.

Change, through `the-way-record-decision` (a change of a decision edited in place; the skill and
template already read for `fb1ef9d`), in D-97 only:

- Binding sentence, from "…or as too large (D-185), logout goes on, when it refuses it as of a lower
  version (D-187), logout goes on and the account forms show „Gra została zaktualizowana. Odśwież
  stronę.” in `warning` above them, and when it answers…" to "…or as too large (D-185), logout goes
  on; when it refuses it as of a lower version (D-187), and when the tab had already stopped saving
  after that refusal, logout goes on and the account forms show „Gra została zaktualizowana. Odśwież
  stronę.” in `warning` above them; and when it answers…". The first sentence's "a tab that stopped
  saving after the refusal of D-187 ends it without saving" stays.
- *Verification*: complies gains "a tab that stopped saving after the refusal of D-187 logging out
  with no save request and showing „Gra została zaktualizowana. Odśwież stronę.” above the forms";
  violates gains "a tab that stopped saving after the refusal of D-187 logging out to the forms with
  no sentence above them".

Meaning (pl): Karta, która już przestała zapisywać po odmowie starszej wersji, wylogowuje się bez
próby zapisu i też zostawia nad formularzami „Gra została zaktualizowana. Odśwież stronę.”.

Nothing else follows (step 4.4): no decision derives from D-97 in a way this touches (D-101 derives
from it for sessions only; D-109 for the logout route), no invariant names D-97 in *Derives from*,
and the meaning now equals row 6 and spec decision 8 (`spec.md:340-341`), so no question for the
human (WAY-30). Nothing outside D-97 was touched.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors` (after the binding
  edit, and again after the *Verification* edit before the commit).
- Not run: `npm test` (the cycle's run; no code changed).

## Searches not found or unclear

none
