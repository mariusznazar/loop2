# Slice 16 report — reasoning of D-292 to D-307 into the entries

**Status:** done with concerns (concerns are listed under "Questions and concerns"; none blocks).

**Slice base:** `a732d90d92d31b8389f43d1be2c986b2fc6d85c9` — HEAD was still it at the start, worktree clean.

**Commit:** `3ba0db45` docs: :memo: move the reasoning of D-292 to D-307 into the entries and drop their private origins

**File changed:** `foundations/decisions.md` (+32 / -22 lines, only *Rationale*, *Rejected* and *Origin* lines of D-292 to D-307).

## Steps of `the-way-record-decision` done

Per entry (edits in place of existing decisions): step 1 read — `SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `examples.md`, `rules.md`, `way_of_working.md`, `foundation_step.md`, the project-skill wrapper; each decision whole (D-292 to D-308), and the entries cited by their *Relations* or text (D-288 whole, D-289 to D-291, D-275, D-124, D-131, D-93, D-180) whole; step 2 decide — each decision keeps its question (no new question, no plan-test case); search of the foundation by grep for `folded`, `unfolded`, `scroll`, `search field`, `recent`, `Teraz`, `project 2` and for the other decisions cited (no collision found, no glossary term, D-308 is the neighbour D-305 now cites); step 3 draft — fields filled from the note; step 4 — no question to the human (the cycle's orchestrator is the only asker), edit with the editor tool, `foundation_check.py` run. Step 4.4 (neighbours): none changed — no binding sentence changed. Critique step not applicable (foundation entries of a change are reviewed with the change).

## Checks

- `python -B .the-way/elements/common/foundation_check.py` — "0 errors", exit 0.
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md`, filtered to lines 6835-7132 — no line (empty).
- `git diff a732d90d -- foundations/decisions.md` read whole — every changed line is a *Rationale*, *Rejected* or *Origin* line (or continuation) of D-292 to D-307.
- Did not run `npm test`.

## Own-work check

Requirement most likely missed: "a reason a note does not give is not added; one it gives is not lost". Check: after the edits I compared each *Not chosen* line of question 6 and 17 (and 7, 11) against the *Rejected* of the decision that carries it (list below), and each added clause against a passage. All Not chosen lines that belong to D-292 to D-307 are present; added clauses are traced below.

## One line per decision: what moved, from which passage

(Note = the Origin note, `edytor_programu_loop2.md` in the snapshot; Q = *Questions to settle*, S = *Settlements to record*.)

- **D-292:** Origin -> `none`. Added "the row under the scene of a map run" to Rationale (what „Teraz” is; checked against D-291/D-334 of the foundation). Reasoning itself (Q6 Not chosen "bez numerów", S row 4) was already in the entry.
- **D-293:** Origin -> `none`. Rationale and Rejected already held Q6 "bez czasu" and Q17 a (time only in the row; not seen in the panel); nothing added.
- **D-294:** Origin -> `none`. Added to Rationale: shape/version of the saved game state stays as it was (note *Context*, last-but-one line on the game state keeping its shape) and all groups unfolded at the start (Q17 b, To do 6); added to Rejected: groups folded at the start — a new player does not see their rules (Q17 b Not chosen).
- **D-295:** Origin -> `none`. Q6 Not chosen "rozwijanie grupy przy upuszczeniu" was already carried; nothing added.
- **D-296:** Origin -> `none`. Q6 Not chosen "listy w nagłówku grupy" was already carried; nothing added.
- **D-297:** Origin -> `none`. Q6 "strzałki tylko w grupie" and Q17 d "lądowanie na końcu następnej grupy" were already carried; nothing added.
- **D-298:** Origin -> `none`. Rationale now says the button neither opens nor leaves a state of a form and the rest of the game keeps plain buttons (Q6 Answer, last sentence, quoting the rule on secondary actions; onward passage: the sibling note on buttons, Q1b, same sentence and its Not chosen — already in D-275). Rejected: "the button standing beside every program — no cost was kept beside it" (Q17 c Not chosen: "pakiet nie podał kosztu").
- **D-299:** Origin -> `none`. Premise written in the past ("when this was settled every cell of the pick fitted without scrolling") from Q6 / S row 11; accepted cost reworded to the note's "return with the content of Project 2" -> "with the content of a later project" (S row 11; the project definition's scope line says Project 2 is a separate project after this one). Rejected unchanged (Q6 Not chosen "szukajka", "ostatnio").
- **D-300:** Origin -> `none`. Rejected now says "teraz 3" is shown only by a design sketch and not by loop's editor (Q6 Answer: "która jest tylko w szkicu"); the cost clause was already carried.
- **D-301:** Origin -> `none`. Q6 Not chosen "bez Pusta grupa" already carried; nothing added.
- **D-302:** Origin -> `none`. Q6 Not chosen "bez Zmiana zeruje passę" already carried; nothing added.
- **D-303:** Origin -> `none`. Q6 Not chosen "pytanie przy kasowaniu" already carried; nothing added.
- **D-304:** Origin -> `none` (the Origin also named the human's decision of 2026-11-05 on where the button stands; its reasoning — Q6 *Revision* — was already in Rationale and Rejected: two notations side by side; two buttons on one line, a folded last group hides its „+ reguła”).
- **D-305:** Origin -> `none`. Rationale and Rejected now say the state is given by D-308 (backgrounds and bar) instead of the note's task reference (Q6 Answer "bo stan reguły daje zadanie 11"; S row 17 "obok paska z zadania 11").
- **D-306:** Origin -> `none`. Rationale: "a few acts" made concrete as the six acts of the one rule „Zapas poniżej 8 · Patyk → Zbierz — Patyk” (*Acceptance criteria*, 3rd bullet, which the Origin named); Rejected: greyed cells out of the keyboard's reach — no cost was kept beside it (Q17 e Not chosen: "pakiet nie podał kosztu poza samą drogą"). Q7 Not chosen B was already carried.
- **D-307:** Origin -> `none`. Q11 Not chosen "sam nagłówek" already carried; the other half of Q11 (the plan not on the screen of a map run) belongs to D-180, which holds it.

## Onward passages read (lesson 6)

- Question 6 Source: the sibling note on buttons (`zadanie_hierarchia_przyciskow_i_karta_logowania.md`), Q1 / Q1a / Q1b — read; its sentence on secondary actions is in D-275 already and the note's Not chosen concerns "Usuń"/"Zakończ" looking like links — not needed in D-298.
- The project definition (`definicja_mvp2_loop2.md`), the entry on writing a program rule (lines 257-268), D-93 (606-616), the screen-layout entry (229), D-180 (887), the line on Project 2 (63) — read; their reasoning is already in D-288, D-93 and D-180 of the foundation.
- `round-4-7-package-2.md` (C9) and `round-4-7-package.md` (rows T9-T26) in `the main checkout of the repository: .runs\project-refinement\` — not in the snapshot, in loop2's gitignored `.runs`; read-only, nothing beyond the note's own quotes; nothing taken from them (T16 says "the definition wants arrows across the edge, the old Loop had none" — a provenance remark, not added).
- `ekrany-i-menu.md` (turn 28) — not read; the note only cites it for the same package answer.

## Unread material

- `.runs/.../task.md` passages: read from the handoff copy only.
- `.the-way/foundations/decisions.md` WAY-03 and WAY-27, `.the-way/elements/common/rules.md` was read, WAY-03/WAY-27 were not opened (the handoff's copied text of the task and the template's Origin section carry the rules).
- Foundation entries of the "Foundation entries row 2 (D-362 as changed)" — not read; D-362 does not bear on these entries.
- Read in part: the note's *Decisions in play* (only skimmed for D-288 quoted text, D-93, D-180, D-275, D-131, D-124), the definition (passages above only).
- Everything else the handoff names: read.

## Searches not found or unclear

- Q6 Not chosen "nagłówek kopii według szkicu — zmiana dwóch decyzji poza tym zadaniem" (copy header and three buttons stay as they are) has no row in *Settlements to record* and fits none of D-292 to D-307; I did not place it. Nobody among these entries holds it.
- Q6 Not chosen "bez sumy w nagłówku grupy — zwinięta grupa nic nie mówi" belongs to D-93 (already there).
- No note passage gives a reason for: the exact content of a folded group (name, condition, count), "lands at its end", the position of „✕” in the header, the arrows being disabled only at the edges of the program, the wording of the sentences of D-301/D-302; I added none.

## Questions and concerns

1. Clauses already in the entries that I did not find in the note, left as they are: D-293 Rationale "Outside a map run no map gives a movement its step" (follows from "poza przejściem nic" and "krok mapy"); D-294 "folding arranges the player's view ... changes nothing the program does"; D-297 "the rule lands next to where it stood"; D-296 "so the header stays a line to read, as a rule's row does (D-288)" (supported by D-288). Recommendation: leave (they follow from the note's passages and the foundation) unless the reviewer wants only note-given clauses.
2. D-299 premise: "every cell of the pick fitted without scrolling" is in the past tense; its *Verification* ("the pick of a game with every action discovered standing whole without scrolling") still reads as a present check — I left Verification as the slice forbids changing it.
3. The Q6 Not chosen about the copy header (above) is unplaced; recommend the orchestrator decide whether D-171/D-172 (header and buttons of the copy) should carry "according to the sketch — a change of two decisions outside the work" in a later slice.
4. Cites of the sibling note's reasoning not needed; no contradiction of a binding sentence found.
