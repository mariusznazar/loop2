# Findings to fix — Slice 1 review (`FAIL b4c3687`), task `zapis-stanu-na-serwerze`

Copied word for word from `reports/08-slice1-review-report.md`, § Findings › Important. The review's Minor findings are not fixed (they go to the whole-change review).

This file holds the finding about the foundation entries (`fb1ef9d`).

**I2. D-97 drops, for a tab that has already stopped saving, the update sentence that Settlements
row 6 keeps above the forms** (`foundations/decisions.md:1762`, commit `fb1ef9d`).
Row 6 (`task.md:295`): "gdy odrzuci zapis karty ze starszym kodem gry, wylogowanie też idzie
dalej — karta, która już przestała zapisywać, wylogowuje się bez próby zapisu — a nad formularzami
konta zostaje w roli `warning` „Gra została zaktualizowana. Odśwież stronę.”". D-97 writes: "…and
then ends only this browser's server-side session; a tab that stopped saving after the refusal of
D-187 ends it without saving. … when it refuses it as of a lower version (D-187), logout goes on and
the account forms show „Gra została zaktualizowana. Odśwież stronę.” in `warning` above them". The
sentence is tied to "when it refuses it" — the save at logout — and a tab that stopped saving makes
no save, so D-97 gives that tab no sentence. That tab is the usual case (the outdated answer came
during play, D-187), and the sentence is what question 17 chose way C for: without it the player
signs in in the same tab and meets the false alarm „Zapis pochodził z innej wersji gry…”
(`task.md:145-147`). Spec decision 8 (`spec.md:340-341`) says it right; the decision, the lasting
binding text, does not. Grade: the entry restates its row more narrowly, without the row's
qualification (WAY-263). Fix: through `the-way-record-decision`, e.g. "a tab that stopped saving
after the refusal of D-187 ends it without saving, and the account forms then show „Gra została
zaktualizowana. Odśwież stronę.” in `warning` above them". The other rows 1–10 and the projected
entries I compared (list under Checks) say what their sources say.
