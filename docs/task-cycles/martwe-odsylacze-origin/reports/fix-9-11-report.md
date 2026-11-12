# Report — fix of findings 9-11 (Important 1 and 3)

**Status:** done (Important 2 left, as the handoff says).

Base: `5dea4e7cc675a1735da5eef04d5dfd9b67548f13` (worktree clean at the start). Commit: `95a29574` on `task/martwe-odsylacze-origin`. File changed: `foundations/decisions.md` (+7 -7), only *Rationale* and *Rejected* of D-179, D-187, D-189, D-190, D-191, D-192; *Origin* of all six stays `none`.

## Steps of `the-way-record-decision` done

Read (`read.md`: template, `rules.md`, `way_of_working.md`, the six entries whole, D-65, D-120, D-129, D-239, D-220); decide what the entry is (existing entries, binding sentences unchanged; search of the foundation limited to the cited decisions); draft; write (edit); check (`foundation_check.py`). No critique (no new entry set), no question to the human (handoff).

## Findings

- **Important 1 — fixed**, each passage checked against the code and the foundation before it went in:
  - D-179: accepted cost of a „Restart” taking from the chest (true at head: D-189 carve-out only for a manual run of a solved map); reason of the backpack cap guarding carrying in (true: D-65, full backpack passes over a gathering rule).
  - D-189: the measured 41 s at 16× against 11 h, dated "measured when every completion still paid". The factor ~960 is verified at head as the loop's 1 game minute per real minute (D-239) times 16 game minutes per real second at 16× (D-129; `paces` up to 16 and `loopMinuteRealSeconds: 60` in `src/browser/sim/data/balance.ts`). The 41 s / 11 h themselves are not reproducible at head: D-129 gives Las as 480 game minutes (8 h in the loop, half a minute at 16×), so they stay dated, not asserted as today's. Also "the loop need not be closed to take the day's pay" (the entry's binding text already says it; the clause makes the reason explicit).
  - D-190: sweeping — the sentence "the game had no sweeping" became "has no" (checked: no sweeping in `src` or tests, only the word in D-xx text); sweep result promises no safety on every seed; the reset as penalty with one archetype (D-190 binding: archetype unchanged) and the design's later direction, marked not built; reasons beside two rejected ways ("one event would be two different deaths", "the characters of a team would fight over the one"; D-54 holds a team of several characters); the resurrection as an item "set aside, not refused for good", comes back with a chain that could make it.
  - D-191: the accepted cost of D25 in conditional form ("where there are none, a finer split makes empty trees"), not as a claim about today's trees, which I did not verify; the reason "the program is an investment in a character".
  - D-192: the reason "mechanism for a second archetype and a branching of archetypes". Worded "archetypes", not "classes", because the foundation uses "class" for a class of weapon; `src/browser/sim/data/archetypes.ts` holds one archetype today, so the clause is conditional ("would require").
- **Important 3 — fixed.** D-187 *Rejected* now names the ways as the game has them: a cap set on one of the current maps (reason kept: a new balance number outside the predecessor game's data); no cap of a map at all; the cap stated with no code built for it. The last two have no reason because the note gives only the process for one and nothing for the other. The words "the definition", "readiness", "review of the plan" are gone. Checked: no current map sets a cap (`maps.ts` has only the optional fields; `trip.ts` reads them).
- **Important 2 — not touched.** D-185 and D-216 left as they are (now `main`'s text), per the handoff. D-185 still holds a *Origin* naming a note (line 3602 hit of the grep below is that one, outside the six).

## Not added, on purpose

- The concept's remark that the run records what the character entered with; the sweep as "fair comparing instrument" (no sweeping at head); the open question the resurrection item would close; the premise that the four maps were one forest with six items. None is in the finding, and each is either a claim about a past state or a pointer into the private document.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — exit 0 (`0 errors`).
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md` — exit 0 with hits elsewhere in the log; the lines of D-179, D-187, D-189 to D-192 (3512 to 3705): no hit. The one hit in that range is D-185 (line 3602), left.
- A grep of the six decisions for "the definition", "the MVP", "the task", "readiness", `§`, concept decision numbers (D2x to D4x without hyphen) — no match.
- The product's gate not run (handoff).

## Own-work check

Requirement most likely missed: a present-tense claim about the product that is false at head. Check: every added claim traced to a foundation entry or code (listed above); where it could not be traced (41 s / 11 h, trees of weaker skills) it is dated or conditional.

## Reach beyond the dispatch

Read the concept document (§4, §5, D21, D24-D26, D29, D31) and the definition's five projected entries and `plan_wyprawy` Q1 and Q10 from the snapshot; searched the foundation for D-65, D-120, D-129, D-220, D-239, D-54; read `balance.ts`, `maps.ts`, `archetypes.ts`, `trip.ts` heads. All to check the claims.

## Choices

- D-190: kept the later direction ("design points to a later direction, not built") because the finding lists it as lost; cost if wrong: a reviewer may read it as prose that forces later work (template: that stands in a binding sentence). Alternative, a purely conditional sentence, drops the direction.
- D-189: kept the old numbers dated instead of replacing them with the head's Las numbers; cost if wrong: a reader sees 11 h next to D-129's 8 h.

## Unread material

none (the concept document was read in the passages the finding names and the entries they refer to: §4 both "Kierunek" sections, §5 "Rozwój postaci" and "Pętla zarobkowa", D21, D24 first part only for D26's reference, D25, D26, D29, D30 and D31; the rest of the document not read).

## Searches not found or unclear

- The source of the 41 s / 11 h measurement (the map length then) — not in the snapshot; unclear.
- Whether the character skill trees at head hold weaker skills that stay at the first level — not verified, hence the conditional wording.
