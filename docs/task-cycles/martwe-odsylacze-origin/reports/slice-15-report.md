# Slice 15 report — reasoning of D-280 to D-291

**Status:** done with concerns (see Questions 1 and 2)

**Slice base:** f3194047455e22a6780abd2c604e1aa30f6f5500 (HEAD at start, worktree clean).
**Commits:** `1f8e1bb2` `docs: :memo: move the reasoning of D-280 to D-291 into the entries and drop their private origins`; then a second commit (research on writing rules into D-288, Origin none), after the coordinator added the missing note.
**File changed:** `foundations/decisions.md` (+112 / -44 in total from the base). Only *Rationale*, *Rejected* and *Origin* lines (and continuations) of D-280..D-291.

## Skill steps done (the-way-record-decision, per entry, edit in place)
Read `SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `examples.md`, `rules.md`, `way_of_working.md`, `foundation_step.md`; decided each entry is an existing one changed in place (no binding change); searched the foundation for neighbours (D-349, D-332, D-297, D-320, D-306, D-118, D-122, D-200, D-277, D-156, D-96) and checked my added statements against them; drafted; wrote with the editor tool; ran `foundation_check.py`.
Process note: the first D-288 edit (Rationale, Rejected, Origin) was applied with a one-off Python script, not the editor tool; the other eleven decisions and the whole second D-288 edit were made with the editor tool.

## One line per decision (what moved, from which passage; onward passages read)
- D-280 — Origin none. Added: name on card -> Postać, bar marks Siedziba "as in loop" (ekrany Q7); first click is the menu item Mapy, accepted cost no button at a character (karty Q7); no item marked on run screen because D-277 marks the place and none names it (ekrany Decisions in play, D-277 reading); Rejected: two "Wejdź" and the "eyes" bar (definicja entry Rejected), the extra "Wybierz mapę" button (karty Q7 B). Onward: definicja entry, projektant A.2/A.3/A.4, zakres "Kierunek", D-277.
- D-281 — Origin none. Added: map off the open list -> Siedziba, reasons and accepted cost, Rejected `#/mapy` (karty Q10; "reveals the map before it opens" is quoted in Q10's Source from the Mapy-screen entry); pointer to D-332 for Q9 (already carried there). Onward: karty Q9/Q10 sources, definicja entry.
- D-282 — Origin none. Added: which conditions make phone layout, teams, run look-in, run per character, crafting/targets additions (projektant D.1, zakres "Decyzje o układzie"). To do 2-3 / Decisions in play of the proporcje note hold no reasoning for this entry beyond its Verification.
- D-283 — Origin none. Added: the existing pause serves, no new state (projektant A.4 rule 2).
- D-284 — Origin none. Added: D-122 reference and that the answer follows from two sentences (ekrany Q10 "Krok"). Already present: Rejected.
- D-285 — Origin none. Nothing to add: Rationale/Rejected already hold Q11 points 2-3 (ways and accepted cost).
- D-286 — Origin none. Added D-156/D-96 as the quoted sources (ekrany Q12 Source).
- D-287 — Origin none. Added: what the simulation refuses (ekrany Q3 code facts, checked at head: `send` refuses with any run, buying is a no-op with a run, loop start only for that run's character) and accepted cost "sentence repeats at each character" (karty Q3).
- D-288 — Origin none (second commit). Carried from the first pass: Factorio/Gladiabots one place; widths 174/270 vs 526/622 as a premise, labelled computed (proporcje Need/Q1; confirmed in the `src/browser/styles.css` comment at head); narrow-window and phone argument (Q1 D); complaints concern mechanics (edytor Context); drag was invisible (projektant A.1.3); 6 actions (B.3 rule 3); D-42 not asking for keyboard on groups (edytor Q6); Rejected: lists in group header (Q6), smaller scene -> D-349 (Q1 A). Added from the research passage „Pisanie” (lines 39-97, incl. the pattern table and its closing paragraph; onward passages on undo/tinkering research left out as they concern other features): Factorio 2.0 one place (FFF #384), Factorio greys instead of hiding because its old interface had things popping out of thin air, Unreal users asked for greyed instead of hidden after missing nodes, Outlook's three ways to move a rule and that dragging needs a drop preview, mouse-only editors draw complaints (Autonauts, Opus Magnum), the 8-interaction figure is an estimate (research marks it HIPOTEZA) and no source measured time or clicks to write a rule; transfers to this game are inference. Sibling `research_ux_ui_programow.md` read: input brief only, holds no reasoning for D-288.
- D-289 — Origin none. Added: D-118 violation example, "Obchód" greyed like the four (Q16), archetype case as past premise (Q1 row h). Rejected already complete.
- D-290 — Origin none. Nothing to add (Q2 ways and cost already present).
- D-291 — Origin none. Added: icon assignment as in loop (To do 15; head `actions.ts` confirms shared icons), Teraz/Potem write the action as the rule row with icon (teraz Q1/Q2), mask/fade in greyed cell, accepted cost of credit line and title; Rejected: dimmed old images (Q5 C).

## Checks
- `python -B .the-way/elements/common/foundation_check.py` — exit 0 ("0 errors"), run after each commit.
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md` restricted to lines 6407-6830, with `research_` added to the pattern — no line after the second commit.
- `git diff f3194047 -- foundations/decisions.md` read whole by hunk after the second commit (112 insertions, 44 deletions): every changed line is Rationale, Rejected or Origin (or continuation) of D-280..D-291; no Scope/Based on/Relations/Verification/binding line changed.

## Own-work check
Requirement most likely missed: a clause added that no note passage supports, or a stale present-tense fact. Check: each added clause traced above; figures (526/622/706/16, 174/270) rechecked against the note and the stylesheet comment at head; code facts (send/buy/loop refusals, shared icons, single archetype) rechecked at head.

## Reach beyond the dispatch
Read D-349, D-332, D-297, D-320, D-118, D-122, D-200, D-277, D-156, D-96 (selective, to avoid duplicating or contradicting them); `src/browser/styles.css` comment, `sim/game.ts`, `sim/skills.ts`, `sim/loop.ts`, `sim/data/actions.ts` for head facts.

## Unread material
- `research_edytor_programu_wow.md`: read lines 15-97 (summary, source markers, whole „Pisanie” with its pattern table); sections on understanding, watching, debugging, studies and multi-function patterns (lines 101 onward) unread because the passage does not send D-288 there.
- `research_ux_ui_programow.md`: read whole.
- Other notes were read by the passages the Origins name plus what they refer to: definicja_mvp2 (projected entries and a heading scan), karty_i_katalog_map (To do 1, 2, 5, Q3, Q7-Q10, settlements), teraz_i_potem (Q1, Q2, Q14, settlements), edytor_programu (Need, To do, Q1-Q7, Q16, Q17, Context, settlements), rozpoznanie_projektant (A, B.3, D and D.1); ekrany_i_menu, zadanie_proporcje and zakres_mvp2 whole.

## Searches not found or unclear
- Reason for "menu items without icons, unlike loop" (ekrany Q7/row 4): the note gives none and the way is only what "the cycle would otherwise guess" (WAY-134), so it is not in D-280's Rejected.
- Pixel figures of the rejected smaller scene (510 px / 606 px in the proporcje note): I could not reproduce them from the code, so they are not carried; D-349 untouched.

## Questions for the orchestrator
1. D-288 Rejected "smaller scene (336 x 152)": the note's figures give that route 510 px / 606 px against 526 / 622 for the chosen one, nearly the same; its stated reason is only the human's quote that it "does not solve what I want" and that the aim is program width as in loop. I carried that reason as stated. D-349 (outside this slice) words it as "a program too narrow to write in", which the figures do not support. Recommended: have D-349's slice check its wording.
2. Not carried because they describe a superseded interim or the working process, listed so they are not lost: edytor Q3 ways (panel in place of the tile table, third column 344 px, three areas at once, panel under the row — the last is now the chosen way); "no decision — the cycle would invent/guess" ways (Q1, Q4, karty Q3); edytor Q5 costs about two ways of drawing icons until a later change (no longer true at head) and plan/foundation edits; over-the-head details of Q5 (held by D-320). Recommended: leave out.
