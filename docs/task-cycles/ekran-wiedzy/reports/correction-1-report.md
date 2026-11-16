# Correction 1 report — task `ekran-wiedzy`

**Status:** `done`. One commit, `ceeec9aa` (`mariusznn@gmail.com`), on the head `47f446e0`. No push, no full gate.

## Item 1 — done

`foundations/decisions.md`, D-280 *Verification*, the first clause of `tests:`.
- **Old:** „the game opening the screens Siedziba, Postać, Mapy, Programy and Przejście at their addresses”
- **New:** „the game opening the screens Siedziba, Postać, Mapy, Programy, Wiedza and Przejście at their addresses”

The line break of the wrapped text moved with the word; nothing else in D-280 or any other entry changed (the diff is one line). The entry's change is the human's decision (item 1 of the remarks, which overrides the task's instruction to keep that field), so it is marked **`the cycle's`**: it comes from a remark, not from the task, a row or a projected entry. It is the phrase I proposed in the fix-1 report (m2), used as the handoff says, in the order of the binding sentence („Siedziba, Postać, Mapy, Programy, Wiedza and Przejście”).

The rest of that *Verification* still agrees with what the tests open: the test „a reload at each of the eight addresses opens its screen and leaves the address as it is” (`tests/view/account-screen.test.mjs`) opens Siedziba, Postać, Mapy, Programy, Wiedza and Przejście (and the map and program addresses); the four-item bar, the return entry „Wróć do przejścia” on Siedziba, Postać, Programy and Mapy (the tests that hold it do not open Wiedza, so the list is true as it stands), the mark of the places, and the owner's link are as the tests hold them. No `decision:` line quotes the *Verification* field, so no test citation changed.

## Items 2 to 10

Items 2 and 3 are let through, and 4 to 10 accepted: I touched nothing for them (D-416's first paragraph, the decisions about the scene and everything else are as at the head).

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py` — 0 (0 errors, test citations on).
- `python -B .the-way/instruction-files/check_instructions.py` — 0 (0 errors).
- No code or test changed, so I ran no test file. Not run: the full gate (the orchestrator's, after the review).

## Unread material

`correction-1-handoff.md` and `correction-1-remarks.md` read whole. `.the-way/task-cycle/change/SKILL.md` and `foundation_step.md` not re-opened (read earlier in the task; the handoff's rows sufficed for one phrase). The rest of D-280 was read only from its *Verification* (lines 4156 to 4170), not whole again.

## Searches not found or unclear

none.

## Working copies

`.runs/author-correction-1/` was made (it held nothing) and removed with `rm -rf` before returning.
