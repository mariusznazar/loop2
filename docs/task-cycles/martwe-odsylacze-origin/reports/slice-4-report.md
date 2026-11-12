# Slice 4 report

**Status:** done with concerns (questions listed below; none blocks the slice)

**Base:** `43f74d26236fa1acddde116dcfd5d125746edcee` (HEAD at start, worktree clean).

**Files changed:** `foundations/decisions.md` (+57 / -42), commit `cc0c6eec` (`docs: :memo: move the reasoning of D-38 to D-55 into the entries and drop their private origins`).

## Steps of `the-way-record-decision` done, per entry

Read (`read.md`, template, rules, way of working, examples WAY-03, the 18 entries whole), decide-entry (every entry is an in-place edit of an existing question; the log searched for a collision: none, no binding sentence touched), draft, write (editor tool on `foundations/decisions.md`; a small Python replace was used for a few multi-line edits and for the `Origin: none` lines), check (`foundation_check.py`). No new entry, no number, no invariant, glossary or fact was needed.

## Checks

- `python -B .the-way/elements/common/foundation_check.py` -> `0 errors`, exit 0.
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md` restricted to lines 935-1260 (D-38 to D-55): no line. (Later lines, e.g. D-57, still match; outside the slice.)
- Mechanical comparison of all 368 decisions before and after (own script, heading to `*Rationale:*` with the `Origin` line excluded): no entry differs there; the entries that differ are exactly D-38 to D-55.
- `git diff 43f74d2 -- foundations/decisions.md` read whole: every changed line is an `Origin`, `Rationale` or `Rejected` line or a continuation of one of D-38 to D-55.
- Own-work check (requirement most likely not met: "a reason a note does not give is not added, one it gives is not lost"): for each added clause I re-read the note passage it comes from (listed below); the clauses most at risk of being mine, not the note's, are marked in "Choices" below.

## One line per decision: what moved, from which passage

- D-38: Origin -> `none`; nothing to move, the note's answer (no deliberate exception, template adopted whole; styleguide note Q18, Q19 H) was already in Rationale and Rejected.
- D-39: Origin -> `none`. Moved: the character's outline may share the value of the yellow of `discovery` and meanings fixed "for now" because it is not known what will change (styleguide Q3 and its control question); the 4.5:1 of `positive`/`warning` is more than the 3:1 of the bar so the bar adds no pair, and the D-279 reading that the rule bar speaks of state (rule-state note Q2, Q-G); Rejected: bar of a solving-condition requirement always green (header-bar note Q5 part 1, b).
- D-40: Origin -> `none`. Moved: derivation of the text roles from the greys of loop (styleguide Q4); controls with no background of their own, text `text`, `highlight` under pointer (styleguide Q12); `selected` instead of green for a chosen button or tab (button-hierarchy note Q2, Q2c); line at a text is part of the text (button-hierarchy Q3b, row 8); costs of the rule backgrounds and the dark bar: lowered opacity, small margin, new value later, same value as `highlight`/`divider`/`tile-edge`, bar looks absent on a marked row (rule-state Q1, Q2); badge icon lighter than the one in an unchosen picker cell (scene note Q12). Rejected: icon and bar straight on the forest picture (scene Q6); tab line in `positive` (button-hierarchy Q2); changing this decision for frames and bars / writing nothing (button-hierarchy Q3b).
- D-41: Origin -> `none`. Moved: grey known tiles with light icons, depleted icon has no threshold because zero stands in the list, focus ring differs from the chosen-button frame (styleguide Q10); Rejected: light tiles with dark icons, outline 1.1:1 (styleguide Q10, Source).
- D-42: Origin -> `none`. Moved: "for now", not known when the rest will be taken up (styleguide Q6); Rejected: whole WCAG 2.2 AA gets "about fifty requirements" (styleguide Q6, Source).
- D-43: Origin -> `none`. Moved: gain of the grid of cells as in loop (action-icon question of the program-editor note, Q5); Rejected: colouring every icon from a token (styleguide Q15, no cost recorded in the note), icons in the row only, icons in active cells only (program-editor Q5, Not chosen B and D).
- D-44: Origin -> `none`. Moved: which buttons are destructive and why (program-players note Q5, Q16), "Zatrzymaj" acts at once and the interrupted run cannot be looked at (earning-loop note Q5), main button not a new control and text only for actions that open or leave a form state (button-hierarchy Q1, Q1b), the answer sits under the form where refusals sit with the address field emptied and its costs (password-reset note Q13), doubt about "Przełącz postać na ten program" as destructive (program-players Q16). Rejected: red at rest also in every editor row (program-editor Q9, Not chosen A), text for every secondary action (button-hierarchy Q1b), interrupted earning-loop run kept to look at (earning-loop Q5, B), form gone after sending (password-reset Q13, B).
- D-45: Origin -> `none`. Moved: account server and deployment stay as they are (styleguide Q13).
- D-46: Origin -> `none`. Moved: Geist Mono for chronicle and clock, SIL Open Font License 1.1 (styleguide Q11).
- D-47: Origin -> `none`. Moved: the decision holds no value, thickness and offset stand with the tokens (styleguide Q22).
- D-48: Origin keeps only the pointer to the spec at `b0c4d44` (reworded: it names the tokens other than the roles); Rationale gains that the role names are those of the styleguide's table of roles with no deliberate exception (styleguide Q18). The spec itself was not opened.
- D-49: Origin -> `none`. Nothing to move: the note's reasoning (parallel runs colliding, the window after naming a free port, the single default-address test, the three ways) was already in Rationale and Rejected.
- D-50: Origin -> `none`. Moved: the chest of a character is its team's chest, one rule of capacity for backpack and chest, a team of one equals the single chest before teams (concept D37 and section "items circulate between maps"); Rejected: the player's chest makes a team a drawer (concept D37).
- D-51: Origin -> `none`. Moved: the choice is for the needs of the MVP, expected to change, entry holds what is true today (headquarters note Q1 answer).
- D-52: Origin -> `none`. Moved: name is no key of a character, costs (one field, one trimming, no name starting with a space), renaming not part of it, choice for the MVP (headquarters Q2, Q10, settlement row 2).
- D-53: Origin -> `none`. No Rationale/Rejected change: the sources' Rationale and Rejected are the entry's own (checked: the MVP2 definition's projected D-53 and the card-and-catalogue and screens notes add nothing the entry lacks; the older headquarters Q4 wording ("Zakończ" to the headquarters) is replaced by the binding sentence and has no reasoning beyond what Rejected carries).
- D-54: Origin -> `none`. Moved: the order is the order later calculations go through the characters (time away, sharing loot when the chest lacks room) (headquarters Q4, settlement row 4); choice for the MVP. Rejected stays `unknown`: the note keeps no other way for the order.
- D-55: Origin -> `none`. Moved: the rule holds for the whole MVP, cost (no parallel manual runs until map runs are rebuilt around the character), changed openly if earning loops later call for parallel manual runs (headquarters Q5, Q12).

## Choices and clauses to look at (could be read as mine)

- D-40 Rejected "writing nothing about frames and bars" / "changing this decision": the note states these as ways not chosen with process-side costs ("the cycle may stop", "another entry in the plan"); I carried them in product terms ("could stop the review of a change", "another departure from the entries approved before it"). If the orchestrator thinks they are process, not product, reasoning, they can be dropped.
- D-51/D-52/D-54/D-55: "a choice for the needs of the MVP, open to a change" comes from the human's reservation on the whole answer package; not added to D-53, whose current wording descends from later notes.
- D-52 "a name is no key of a character": from the settlement row's stated concern, consistent with the existing Verification "violates" line.
- D-39 "more than the 3:1 the bar needs": from the note's numbers (5.99 to 9.32 against five backgrounds); the numbers themselves are not carried.

## Questions for the orchestrator

1. Not carried because they belong to other decisions' binding sentences: the Not chosen of the password-reset note Q1 (third form always on screen) and Q4 (checking the link with a separate request) belong to the sign-in/reset decisions, not to D-44's question; the button-hierarchy Not chosen about the tab look (green underline carried to D-40; fused tab, no tabs, nouns not carried), keyboard handling, card position, coding-guideline statuses belong to other decisions or to guidelines. Recommended answer: leave out; say if you want them in D-44.
2. Notes conflicting with a binding sentence: none found. The older headquarters wording (sending from the headquarters, "Zakończ" back to it) differs from the current D-53 but is the way D-53 already rejects; nothing changed in the binding sentence.
3. Value check: the plan's "D-38 to D-55" range holds; the handoff's current range `935-1239` is right for the base.

## Reach beyond the dispatch

- None of the guideline or part-map files; nothing outside `foundations/decisions.md` was read except the handoff's list, `.the-way/task-cycle/change/slice.md`, `the author's notes\.ai\rules\scripts.md` and `...\knowledge_artifacts.md` (named by the user's global instructions).

## Unread material

- `guidelines/coding.md`, `guidelines/testing.md`, `.the-way/foundations/decisions.md:68-94` and `:718-752` were read (WAY-03, WAY-27); `.the-way/task-cycle/skill/foundation_step.md` read to line 80 (its whole length shown); Foundation entries row 2 (D-362 as changed) not read, it does not bear on D-38 to D-55 wording.
- Notes were read by passage, as the slice says: styleguide (questions, context, settlements), stan_i_powod (To do, questions G, 1, 2, settlements), scena_z_ludzikiem (questions 6, 12, 13, To do 6, row 9), teraz_i_potem (To do 3, 6, question 5, decisions in play), zadanie_hierarchia (all questions, settlements), edytor_programu (To do 12, 14, 15, questions 5, 9, 15), programy_gracza (Q5, Q16), potwierdzenie_adresu (question 3, row K4), reset_hasla (To do 11, questions 1, 4, 13, rows 1, 3, 8), petla_zarobkowa (Q5, row 7), pytanie_przy_zakoncz (question 5), testy_bez_portu_3000 (whole), siedziba_i_druzyna (whole questions and settlements), ekrany_i_menu (needs, question 6, settlements), karty_i_katalog_map (To do 7, decisions in play D-53), koncepcja_projektowa (section 5 "Postacie i drużyny", section 4 "items circulate", D37), definicja_mvp_loop2 (projected "Whose is the chest?"), definicja_mvp2_loop2 (projected D-44 and D-53 only). `guidelines/*` and `src/browser/AGENTS.md` not read (no code or guideline file touched).

## Searches not found or unclear

- The vault note `zadanie_hierarchia_przyciskow_i_karta_logowania.md` has question numbers 1, 1a, 1b, 2, 2a-c, 3, 3a, 3b; the entry's Origin named "questions 1, 1b and 3" and "2c and 3b": all found.
- The "karty_i_katalog_map" To do item 7 concerns sending from the card (old/new wording) and carries no reasoning of its own.
- The spec at `b0c4d44` (D-48) was not opened; the slice keeps only its pointer.
