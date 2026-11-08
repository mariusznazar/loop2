# Report 02 — Foundation entries (stage: foundation step)

## Status
done

## Commits
- `189d589` — `docs: :memo: change D-311, D-288 and related decisions to two columns of the screen of a map run with the rule panel opened in place, and add D-349 on the one size of the scene` (one commit; branch `task/proporcje-sceny-i-programu`, base `01b26d5`; not pushed).

## Files changed
- `foundations/decisions.md` — +139 / −73 lines (git diff --stat). Nothing else touched.

## Entries

Method: `the-way-record-decision` (`.the-way/elements/decisions/skill/SKILL.md`, `decide_entry.md`, `read.md`, `template.md`, `common/rules.md`, `common/way_of_working.md`), `foundation_step.md`, `make-change/SKILL.md`. The search of the whole foundation (WAY-33) was a grep of `foundations/*.md` for "right area", "beside the rows", "three columns/areas", "column", "world area", "672", "336", "scaled up", "scale", and the reading of every hit whole.

| Entry | Kind | Marked | Meaning (EN) | Znaczenie (PL) |
|---|---|---|---|---|
| D-288 (changed) | decision | row 1 | The rule panel opens in place on the list, under the row of the rule or the header of the rule group it changes, on Programy and on the screen of a map run, and takes no column of its own. | Panel reguły otwiera się w miejscu na liście, pod wierszem reguły albo nagłówkiem grupy, którą zmienia, na Programach i na ekranie przejścia, i nie zajmuje własnej kolumny. |
| D-311 (changed) | decision | row 2 | The screen of a map run has two columns under the header: on the left the world with, under the drawing of the map and the line of a tile, the area with the tabs „Kronika” and „Teren”; on the right the program. | Ekran przejścia ma pod nagłówkiem dwie kolumny: po lewej świat, a pod rysunkiem mapy i linią kafelka obszar z zakładkami „Kronika” i „Teren”; po prawej program. |
| D-349 (new) | decision | row 3 | The scene has one size, 672 × 304 px, twice the size of its picture, with no second scale, and what it draws is drawn for that size alone. | Scena ma jeden rozmiar, 672 × 304 px, dwukrotność swojego obrazu, bez drugiej skali, a to, co rysuje, jest rysowane tylko pod ten rozmiar. |
| D-282 (changed) | decision | the cycle's (consequence of rows 1, 2) | The examples of areas now name the world, the program and the area with the tabs on the screen of a map run, and the list of programs and the editor on Programy with the panel opening in place; the binding sentence is unchanged. | Przykłady obszarów to teraz świat, program i obszar z zakładkami na ekranie przejścia oraz lista programów i edytor na Programach, z panelem otwieranym w miejscu; zdanie wiążące bez zmian. |
| D-19 (changed) | decision | the cycle's | The list of revealed tiles stands under the tab „Teren” of the area under the world, which may show the chronicle instead, so the line under the drawing keeps the numbers beside the program. | Lista odsłoniętych kafelków stoi pod zakładką „Teren” obszaru pod światem, który może pokazywać kronikę, więc linia pod rysunkiem trzyma liczby obok programu. |
| D-338 (changed) | decision | the cycle's (wording) | The player filters the chronicle in the area with the tabs under the world. | Gracz filtruje kronikę w obszarze z zakładkami pod światem. |
| D-343 (changed) | decision | the cycle's (wording) | Only its question names the place now: „…in the area with the tabs…” instead of „…in the right area…”; the binding body had no such word and is unchanged. | W pytaniu wpisu jest teraz „obszar z zakładkami” zamiast „prawy obszar”; treść wiążąca nie miała tego słowa i jest bez zmian. |
| D-345 (changed) | decision | the cycle's (wording) | The accepted cost, a long entry that wraps, is said of the area with the tabs. | Przyjęty koszt, długi wpis zawijany w wielu wierszach, dotyczy obszaru z zakładkami. |
| D-346 (changed) | decision | the cycle's | The tab picked is kept in the area under the world, and a rule panel opened or closed in the program leaves it as it was; a closed panel gives nothing back. | Wybrana zakładka trzyma się w obszarze pod światem, a panel reguły otwarty lub zamknięty w programie jej nie zmienia; zamknięty panel niczego nie oddaje. |
| D-334 (changed) | decision | the cycle's (wording) | Only its *Rejected* changes: the end of the map run is said to "stand on the screen", leaving its place open. | Zmienia się tylko jego *Rejected*: koniec przejścia „stoi na ekranie”, a jego miejsce zostaje otwarte. |

`Origin` of each changed decision gets `zadanie_proporcje_sceny_i_programu_loop2.md in the vault (Notes/Projects/(P) Loop/_zadania), …` with the relevant To do items, questions and rows (D-334, D-282, D-19, D-338, D-343, D-345, D-346 with "Decisions in play"). Every identifier is kept; none withdrawn.

## Choices made (with the way rejected and its cost if wrong)

1. **Rows 1 and 2 are tied to D-288 and D-311, not written as separate new decisions** (the orchestrator's note and `foundation_step.md`: a row whose settlement an entry states becomes no second entry). The plan lists "Row 1" and "Row 2" as entries beside the changed D-288 and D-311, but a separate decision would hold the same binding sentence as D-288 and D-311 (the question "where does the rule panel open" is answered by D-288 in passing; "how is the screen laid out" is D-311's own question), which WAY-19 forbids. Rejected: two new decisions with D-288/D-311 pointing at them — duplicate binding sentences, or hollowed older entries. Cost if wrong: the request must name the tie (D-288 for row 1, D-311 for row 2); a reviewer who wants separate entries must split them.
2. **Row 3 is a new decision, D-349, not a clause of D-311.** The question "what size is the scene" is a different question from "how is the screen laid out": D-311 would hold the same layout with any scene size, and D-316 (what the scene shows) and D-317 (effects) do not name a size (the only hit was D-317's rationale "pictures scaled up"). Rejected: a clause of D-311 (already three long sentences; mixes two questions). Cost if wrong: one extra entry; tasks 3 and 6 may cite D-349 instead of D-311.
3. **D-349 second binding sentence** ("Whatever the scene draws is drawn for this size alone.") — follows from row 3's "what the cycle would otherwise guess" (for what size tasks 17–20 do the effects). If the human reads this as an addition beyond the row, delete the sentence; the first sentence stands alone.
4. **D-349 binding sentence does not say "at every width of the window".** The row says "one size"; the claim for windows narrower than the scene is not in the task, so it stays in *Rejected* (a small scene in a narrower window) only.
5. **D-19 rationale rewritten** instead of just swapping "right area": the old reason ("the right area, which the editing of a rule takes") no longer holds, since the editing opens in the program; the new reason is that the list stands behind a tab that may show the chronicle, so the line under the drawing keeps the numbers beside the program. Rejected: keeping the old sentence with a new place name — it would state a false reason.
6. **D-346 binding sentence gained "a rule panel opened or closed in the program leaves it as it was"** (the plan: "a closed panel gives nothing back"); its old *Verification* example "a rule panel closed with „✕” giving back „Teren”" is replaced and the old behaviour is made a *violates* example.
7. **The narrow-window order** (world, program, "Kronika" and "Teren") is carried by D-282's *Verification* (To do 2 names D-282), not by a binding sentence of D-311; D-311's binding sentence says nothing about narrower windows.
8. **End of the map run (question 6, E1)** — no entry says where it stands. D-311 keeps its sentence about "the line of the end of the map run (D-185, D-216)" in the world as it was, D-311's rationale says "while the end of the map run does not carry it", D-334's *Rejected* says "until the end of the map run stands on the screen". D-311's old *Rejected* about the end of a map run below an open editor "as in loop" is kept as it is (it describes loop). The new E2 way is added to D-311's *Rejected* from question 6.
9. **No figure the task calls arithmetic** (174, 270, 526, 622, 706, 342, 510, 606 px) enters any entry. The figures that enter: 672 × 304 and 336 × 152 (question 1, To do 4), 1344 px (D-280's own limit, quoted in *Rejected* of D-349 from question 1), the window sizes 1280 and 1920 px as examples in D-349's *Verification*, and "1280 × 720" as the example of a low window in D-311's accepted cost (question 2's own words).

## Rejected ways added (sources)
- D-288 (row 1: questions 1 and 3): panel in a column beside the rows with the split unchanged (Q1 B); panel beside the editor on Programy alone (Q3 P2); right column wrapped under the world with the panel under the whole world area (the panel part of Q1 C).
- D-311 (row 2: questions 1, 2 and 6): three columns kept (Q1 B); tabs under the program (Q2 W2); tabs „Program | Kronika | Teren” (Q2 W3); end of the map run first in the area under the world (Q6 E2).
- D-349 (row 3: question 1): scene 336 × 152 with the split unchanged (Q1 A); scene at 3/4 or 4/5 with wider content (Q1 C); large scene in a wide window only (Q1, omitted from the comparison). The question-1 way D ("scene stays 672 × 304, panel in place") is the way chosen.

## Checks
- `python -B .the-way/elements/common/foundation_check.py` at the base, before any edit — exit 0, `0 errors`.
- `python -B .the-way/elements/common/foundation_check.py` after the edits and before the commit — exit 0, `0 errors` (it printed nothing about files claimed by no part; the output was the single line `0 errors`).
- `grep -n -i 'right area' foundations/decisions.md` after the edits: the only remaining hits are D-331's lines about the screen Mapy ("the right area empty before a pick"), another screen, not touched.
- Not run: `npm test` and any product test (outside this stage's boundary); no reviewer ran on these entries (the review of the change reads them).

## Own-work check (section 3)
- Requirement the work most likely misses: that no changed entry still says the rule panel stands beside the rows, or the tabs stand in a right area. Check: `grep -n -i -E 'right area|beside the rows' foundations/decisions.md`. Showed: only D-331's unrelated Mapy hits remain; D-288's text "beside the rows" survives only in *Rejected* and *violates* as the way refused.
- The foundation check reports a missing field, a bad scope or a missing reference; it reported `0 errors` after the commit-ready edit.

## Reach beyond the handoff
- Read whole: D-311, D-288, D-282, D-19, D-338, D-343, D-345, D-346, D-334, D-280 (the handoff names them), plus D-166 (Programy: list on the left, editor in the middle; says nothing of the panel's place, so unchanged), D-296 and D-306 (open the rule panel from a header or a row; they say "opens" without a place, so unchanged and consistent with D-288), D-316 and D-317 (search for a scene size), D-308/D-309/D-310 (hits for "narrow column", wording about a column of text, unchanged). Why: WAY-33 search for entries that name or are named by the changed ones.
- Read `scripts.md` and `git.md` of the vault's rules (global instructions) before editing/committing.

## Searches not found or unclear
- No decision of the log names the scene's size or scale (D-316 and D-317 do not); no invariant, glossary entry or environment fact names the scene's size, the right area or the rule panel's place (grep of `foundations/invariants.md`, `glossary.md`, `environment_facts.md`: nothing relevant).
- The handoff says D-343's "title and body speak of a right area"; only its title does (the body has no such word). The title is changed.
- D-336 and D-43 (named by the plan as bearing on the change) were not read whole; the plan says they need no change and my grep found no hit in them.
- Whether the picture of the scene is 336 × 152 px: the task states it ("twice its picture" with 672 × 304, and To do 4 "336 × 152"); I did not read the code (outside this stage). D-349 *Verification* uses 336 × 152 only as the example of a forbidden second size.

## Questions
none.

## Problems observed
none.
