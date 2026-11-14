# Correction report — the human's remarks (via the day's adviser)

**Status:** done.

**Commit:** `39f3daa7` (`docs: :card_file_box:`), on `task/zmiany-decyzji-gry-z-przegladu`, after `4d597574`; the correction's range runs from `c9365b7e`. One file: `foundations/decisions.md` (+5 / −4). Nothing pushed.

## Checks

| Command | Exit code |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`) |
| `git diff --check` | 0 |

Not run: `npm test`.

## Each remark, as made and how

**Remark 1 — name D-349 and D-370 in the new decision (made).**
D-396's third binding sentence now reads "A decision that defines how the game looks in a narrower or a lower window — D-280, D-282, D-311, D-349, D-370 and D-389 — keeps its meaning there; a fault of the look in a window below the smallest, where no decision defines it, is not fixed." Only the list changed; the rest of the sentence, *Relations* (`none`), *Verification* and *Rationale* stand as they were. I read D-349 and D-370 whole in the fix stage (`reports/fix-report.md` says why they were first left out) and they say what the remark says: D-349 — "The scene has one size, 672 × 304 px … the game keeps no second scale of it", and its *Rejected* weighs "a large scene in a wide window and a small one in a narrower window"; D-370 — the end-of-run window stands "as wide as the content column of the screens (D-280) and as tall as its content up to a part of the height of the browser window". The new names make neither the *Verification* pair nor the *Rationale* clause false: neither lists the decisions (the *Rationale* says "the decisions that already define the look of a narrower or a lower window" in general), so no change there. D-349 and D-370 are not changed.

**Remark 2 — D-136 narrowed to a map run that has not ended (made).**
D-136's binding sentence now reads: "… and every change, in a map run that has not ended, of the program rules or rule groups the map run carries out, and every switch of the character to another program during that map run, sets it to zero, on every map, while a change of the trip plan alone leaves it." It says what the invariant `streak-program-change` says (its sentence: "A change, in a map run that has not ended, of the program rules or rule groups of the copy it carries out, and every switch of the character to another program during that map run, … sets the streak of that map run to zero, on every map") and what D-131 says ("of the map run in progress"), no more. I read D-136 whole, the invariant as it stands in the branch and D-131 (read whole in the first stage). The rest of D-136 is unchanged: what solves a map, wounds, the data, the earning-loop word of the first stage (`keeping the earning loop going`). Its *Verification* and *Rejected* contain no clause that contradicts the narrowing: the *Verification* line "a switch of the character to another program leaving the streak as it stood" concerns a switch, which only a map run that has not ended allows (`switchProgram` throws on an ended map run), and the *Rationale* sentence "a change of the program's rules or rule groups starts the streak again" explains the rule in general and is not a binding sentence. No entry that follows from D-136 needed a change: the invariants naming it (`streak-program-change`, `trip-plan-progress`) already carry or do not touch the narrowing; D-131 is unchanged.

**Remark 3 — one task for the three leftovers: needs nothing from me.** I touched none of them: the opening comment of `tests/invariants/test_streak_program_change.py`, the code comments that call the earning loop "loop", the Firefox/WebKit reason without a fact (D-396 *Rejected* stays).

**Remark 4 — let the bare gap in `cross-part-imports` through: needs nothing from me.** `foundations/invariants.md` `cross-part-imports` is untouched.

**Remarks 5–12:** accepted by the human; nothing for me.

## Meaning of each entry changed

- **D-396** — marked **the cycle's** for this change (row 1 wrote it; the remark widens the list of decisions its third sentence names).
  - EN: the decisions that define the look of a narrower or a lower window keep their meaning there, now including the scene of one size (D-349) and the height of the end-of-run window (D-370).
  - PL: decyzje, które określają wygląd gry w węższym albo niższym oknie, zachowują tam swoje znaczenie, teraz także decyzja o jednym rozmiarze sceny (D-349) i o wysokości okna końca przejścia (D-370).
- **D-136** — marked **the cycle's** (remark 2 of the human's adviser; the same narrowing as row 3's invariant).
  - EN: a change of the program rules or rule groups, and a switch of the character to another program, set the streak to zero in a map run that has not ended.
  - PL: zmiana reguł albo grup reguł programu i przełączenie postaci na inny program zerują passę w przejściu, które się nie skończyło.

## Unread material

- D-349 and D-370 were not re-read for this correction; I read them whole in the fix stage and rely on that reading (their text is in this session and was not changed).
- D-131 was read whole in the first stage and not re-read.
- Nothing else of the handoff stayed unread: the handoff, the remarks file, D-136 and D-396 (whole, by their range of lines) and the invariant `streak-program-change` were read whole for this correction.

## Searches not found or unclear

none
