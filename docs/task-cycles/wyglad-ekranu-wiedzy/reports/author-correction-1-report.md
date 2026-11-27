# Author report — correction 1 of wyglad-ekranu-wiedzy (a correction for the human's remarks)

**Status:** done

## Commit

- `8877c742a75a3853be0ce7d5bc337858ab1f6273` — docs: D-280's *Rejected* says that the same rows on Postać and in Wiedza it rejects are those with their level, practice, points and buying, not the layout of the row of a tree the two screens share, as D-416 says. Its parent is `265d41cfbaf9589ffd854a542afbdf0993cb8b93`, the head I found. One file, committed by explicit path; not pushed.

## Remarks

- **Item 2 — made.** In D-280's *Rejected*, the way „the skill trees shown on two screens, as in loop — the same rows on Postać and in Wiedza” now goes on: „with their level, practice, points and buying, which is what this rejects, not the layout of the row of a tree that the two screens share (D-416)”. The wording follows D-416's *Rejected*.
- Nothing else in D-280 changed: its binding sentences, *Verification*, *Rationale* and every other *Rejected* way stand as they were. `foundations/decisions.md` is the only file changed (+2 −1).
- Items 1 and 3 were let through, item 4 was done by the orchestrator, and items 5–7 were accepted, as the handoff gives. None of them is mine.
- **Tests:** no test holds a sentence of D-280 that this touches. The clause is in *Rejected*, which binds nothing, and a search of `tests/` for a line `decision: D-280` quoting these words found none.

## Entry changed (foundation step)

| Entry | Mark | Meaning (EN) | Znaczenie (PL) |
|---|---|---|---|
| D-280, one clause of *Rejected* | the human's remark (correction 1, item 2) | D-280 rejects showing the same rows of skills with their level, practice, points and buying on both Postać and Wiedza, not the layout of the row of a tree that the two screens share. | D-280 odrzuca pokazywanie na Postaci i w Wiedzy tych samych wierszy umiejętności z poziomem, wprawą, punktami i kupnem, a nie wspólny układ wiersza drzewa na obu ekranach. |

## Checks (command — exit code)

- `python -B .the-way/elements/common/foundation_check.py` (full, with no switch that skips test citations) — 0, „0 errors”.
- Not run: the full gate, as the handoff gives.

## Working copies

None made; `.runs/author-correction-1/` was not created.

## Left running

Nothing.

## Unread material

- `.claude/skills/the-way-record-decision/SKILL.md`: read whole.
- `.the-way/elements/decisions/skill/SKILL.md`, `template.md` and `elements/common/way_of_working.md`: not reread in this resume. I read them whole earlier in this session, for D-416.

## Searches not found or unclear

none
