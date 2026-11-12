# Slice 7 report — reasoning of D-93 to D-126 into the entries

**Status:** done with concerns (concerns listed under Questions / observations; none blocks)

**Slice base:** `c0e12bc56c80b53a15dd55f8654ecdf4cda22aa9` (HEAD matched at start, worktree clean).
**Commit:** `e08574f9` (`docs: :memo: move the reasoning of D-93 to D-126 into the entries and drop their private origins`).
**Files changed:** `foundations/decisions.md` (65 insertions, 44 deletions).

## Steps of `the-way-record-decision` done (per entry)
Read (`read.md`, template, rules, way of working, examples WAY-03 / WAY-27, the entry whole); decide-entry (each is an
existing entry, edited in place; no question changed, no new number, no plan-test case); draft (only Rationale,
Rejected, Origin); write (editor-tool edits, plus a small script that set the `Origin` line to `none`); check
(`foundation_check.py`). No invariant, relation or neighbour edit followed (binding sentences untouched).
The orchestrator's mechanical check was repeated by me: the part of each of the 34 entries before *Rationale*
(Origin excluded) is identical to the base; only D-93, D-96, D-97, D-98, D-102, D-104, D-105, D-109, D-112, D-118,
D-119, D-120, D-121, D-122, D-123, D-124, D-125, D-126 differ.

## Checks
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors".
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md` —
  hits start at line 2554 (D-128 onwards, later slices); none in lines 1823-2508 (the slice's range).
- Diff read whole: every changed line is a *Rationale*, *Rejected* or *Origin* line or a continuation of one of the slice's decisions.

## Own-work check
Requirement most likely missed: a reason a note gives is lost, or one it does not give is added. I compared each
note passage the *Origin* named against the entry's existing *Rationale* and *Rejected* (many already carried the
reasoning from earlier cycles) and added only what was absent; every added clause below is traceable to the
named passage. Check on additions: no note, task, To do item, question number, path, host, address, account or personal fact entered
(the grep above, plus reading the diff). Decisions named in additions (D-62, D-132, D-173, D-211, D-126, D-131, D-119, D-118)
exist in the log (grep of headings).

## One line per decision: what moved, from which passage
- **D-93** — Rationale: the game's diagnostics rests on the same program giving the same result (koncepcja D14); the loop's cost: player sees neither what the character does nor why it died, preview can come later (petla_zarobkowa Q2). Rejected: preview of an earning loop with a map and counts, second kind of map run screen (petla_zarobkowa Q2, Not chosen B). Rest (Q17 of rozwiazanie_lasu, programy_gracza Q9/Q10, edytor_programu Q6/Q14, definicja entries) was already in the entry.
- **D-96** — Rationale: third state costs two buttons (reset_hasla Q1); map run returns paused at the saved minute, time away does not move it, "Wznów", one-click cost (zapis_stanu Q8, ekrany_i_menu Q1); reset-link form shown to a signed-in player too, the link itself entitles (reset_hasla Q4/row 6); own sentence for a wrong-shape saved state, one message more (zapis_stanu Q21). Rejected: reasons for third form (reset_hasla Q1 B), headquarters-with-way-back (zapis_stanu Q20 C), silent discard (Q7 B), download failure -> new game (Q7 C), same sentence for wrong shape (Q21 A), error of code left as before (reguly_awarii Q16), map run running on load and time-away shifting it (zapis_stanu Q8 B, C), closing an ended map run at load (Q23 B, D-62/D-132/D-173).
- **D-97** — Rationale: accepted costs of the old-code refusal: one more state of the forms, false alarm still possible (zapis_stanu Q17). The rest was already present.
- **D-98** — nothing to add (reset_hasla Q4/row 7 reasoning already in the entry); Origin none.
- **D-102** — nothing to add (reset_hasla Q6 reasoning already in the entry); Origin none.
- **D-104** — Rationale: copies of the database hold about three copies of 65 MB (zapis_stanu Q9 B cost). Rejected: A and C rewritten with the capacity figures of the note (Q9 A, C).
- **D-105** — nothing to add: Q2 reasoning sits in D-222, Q3 reasoning in D-223 (both already carry the note's text, both outside this slice); the entry's Rationale and Rejected already carry Q2 C. Origin none.
- **D-109** — nothing to add (reset_hasla Q1/Q4/row 2 already in the entry); Origin none.
- **D-112** — Rationale: a reset removes all sessions in the same transaction, signs nobody in, accepted cost of "Sesja wygasła" in the second browser (reset_hasla Q5 A). Rejected: signing in at once after a reset, leaving sessions (Q5 B, C).
- **D-118** — Rationale: first meeting, death as information, three gains, same rule for actions, two axes and gated conditions, list survives a reset, exploration reveals the tile under the character, chill reveals two verbs together (koncepcja D13, §5, D32/D33 clarification).
- **D-119** — Rationale: an encounter counts for the player, not the character; a branch of another tree reads "nie dla tej postaci", fresh character has not paid (koncepcja D38, D50). Rejected: reasons for per-character Understanding, editor-only/simulation-only filter (D38, D41).
- **D-120** — Rationale: archetype is a set of learnable skills, common actions; only filter on items is the branch gate; an action of a bought branch open only to its buyer, editor behaviour, weak point (koncepcja D40, D49, D50; wprawa_i_drzewa Q3 A). Rejected: editor offering the action when any team character bought the branch, action entering the Understanding at the first purchase (wprawa_i_drzewa Q3 B, C).
- **D-121** — Rationale: condition arrives in one discovery line with "Zasil — ognisko", weak point named (plomyk Q6); "Idź — ognisko" has no source in loop (odkrywanie Q1).
- **D-122** — Rationale: scene pause behaviour, motion stands at a discovery (scena_z_ludzikiem Q1); chronicle entry per band, long-entry cost (kronika Q9 A); completion-in-discovery-minute cost and rarity (rozwiazanie_lasu Q15). Rejected: enters Understanding anyway (Q15 B), moving fire and mage (scena Q1), per-thing chronicle entries (kronika Q9 B), "(pauza)" placements (teraz_i_potem Q5 p2, p3 — no cost kept in the note, stated so).
- **D-123** — nothing to add (odkrywanie Q2, programy_gracza Q7 reasoning already in the entry); Origin none.
- **D-124** — nothing to add (odkrywanie Q4, edytor_programu Q12 already in the entry); Origin none.
- **D-125** — nothing to add (odkrywanie Q6 already in the entry); Origin none.
- **D-126** — nothing to add (odkrywanie Q8 already in the entry); Origin none.

## Reach beyond the dispatch
- `foundations/decisions.md`: D-62, D-132, D-173, D-155, D-211, D-222, D-223, D-138, D-131 headings/bodies, to check that named decisions exist and that D-105's Q2/Q3 reasoning is already carried (D-222, D-223). Reason: avoid duplicating or citing a missing entry.
- Notes of the snapshot beyond the named passages: `wprawa_i_drzewa_loop2.md` lines 160-193 (the accepted resolution under Settlements to record, as the *Origin* names it), `definicja_mvp_loop2.md` entries for D-118/D-119/D-120 and `koncepcja_projektowa.md` D13/D38-D42/D49/D50 (the passages the *Origin* names).

## Unread material
- Not read: `guidelines/coding.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md` (the change touches no code or test file, only `foundations/decisions.md`); `.the-way/foundations/decisions.md` WAY-03 and WAY-27 read via `examples.md` (their text), `foundation_step.md` read in its opening paragraphs only; "Foundation entries row 2 (D-362 as changed)" of the plan was not opened (irrelevant to this slice's entries).
- Read in part: the notes, by the passages their *Origin* names (as the slice instructs); `task.md` passages came copied in the handoff, the file itself not opened.

## Searches not found or unclear
- The handoff's `.runs/.../task.md` and `plan.md` were not opened; the copied passages sufficed.
- D-124: the notes disagree on the length of the first period with a disabled button ("84 seconds" in odkrywanie Q4, "84 game minutes" in edytor_programu Q12, "game minute 84" in the entry's Verification); the entry says "the first game minutes" and I added no number.
- The notes' old-Loop file paths named as material (e.g. policy tests, Scene) were not needed; none of their content moved.

## Questions / observations for the orchestrator (none changes a binding sentence)
1. D-105 and D-98/D-102/D-109/D-123-D-126 got only `Origin: none` because their note passages were already fully carried; D-105's Q2 and Q3 passages are carried by D-222 and D-223, whose *Origin* lines still name the same note (a later slice's, presumably).
2. D-122: the *Rejected* ways "(pauza)" after the bar of the solving condition and no "(pauza)" at all come from teraz_i_potem Q5 with no cost kept; I wrote them with that stated. If the template's wish for a cost beside each way matters more than carrying them, drop that clause.
3. D-120 Rationale now says the program editor offers a branch action "outside a map run" not at all, per wprawa_i_drzewa Q3; the binding sentence of D-120 does not mention the editor. No contradiction, but a later reader may want it in D-119's sentence ("what the program editor offers").
4. Wording judgment: "the game this one follows" stands for the older Loop game in D-120 and D-122 (note says "jak w loop"); D-121 already says "in loop" unqualified, which I left.
