# Slice 9 report — reasoning of D-152 to D-175 into the entries

**Status:** done with concerns (questions under "Questions / observations"; none blocks)

**Slice base:** `7ec7966b8c5b6f3bb771bf9372de97c23e771c41` (HEAD matched at start, worktree clean).
**Commit:** `bc7367e8` (`docs: :memo: move the reasoning of D-152 to D-175 into the entries and drop their private origins`).
**Files changed:** `foundations/decisions.md` (22 Origin lines read `none`; Rationale/Rejected lines extended in 14 entries).

## Steps of `the-way-record-decision` done (per entry)
Read (`read.md`, template, rules, way of working, examples WAY-03 / WAY-27, `foundation_step.md`, the entries whole, D-104/105/109/131/196/225/288 for cross-checks); decide-entry (each is an existing entry edited in place; no question changed, no new number, no plan-test case); draft (only *Rationale*, *Rejected*, *Origin*); write (editor-tool edits, plus one Python replacement of exact strings for D-164 to D-174 with asserts that each old string occurs once); check (`foundation_check.py`). No invariant, relation or neighbour edit followed, binding sentences untouched.

## Checks
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors".
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md` — first hit at line 3422 (D-176); D-152..D-175 occupy 3047-3407; no hit inside the slice.
- Mechanical check (inline Python, base `7ec7966b` vs worktree): exactly the 22 slice decisions differ (D-152..160, 163..175); for each the part before *Rationale*, *Origin* line excluded, is identical; 368 entries in both.
- Diff read whole: every changed line is a *Rationale*, *Rejected* or *Origin* line of a slice decision.

## Own-work check
Requirement most likely missed: a cost of the chosen option is dropped, a premise of a past state is written as a present fact, or a reason the note does not give is added. For each entry I compared the passage the *Origin* names, and what it refers to, against the existing *Rationale* and *Rejected*; added only what was absent; checked each added claim against the later decisions (D-104, D-105, D-109, D-131, D-196, D-288, D-44). Costs in the notes tied to a past state (header row on every screen, task order, the cost of rewriting a text and its tests) were not written as present facts; they are listed below. No note name, path, host address, account or personal fact entered an entry. "Outsider" is not named in the additions.

## One line per decision: what moved, from which passage
- **D-152, D-153, D-154** — nothing to add: the *Rationale* and *Rejected* are word for word those of the projected entries in definicja_mvp ("the MVP" already read "the game" in D-153). Origin none.
- **D-155** — Rationale: the sources give a single use and a time limit but no number of hours, so 24 h / 1 h are the choice of the decision (potwierdzenie_adresu Context, OWASP line). The accepted costs of Q1 (older message, a day without reading) and the transaction reasoning (reset_hasla row 10 quoting D-112) were already there; Q1 and Q4 name no ways not chosen. Origin none.
- **D-156** — Rationale: the link alone, with no session, authorizes the confirmation (D-109) and the request meets D-104 with no exception (Q2 accepted cost: "D-109 changes"). Rest of Q2/K2 already present. Origin none.
- **D-157** — Rationale: D-105 covers the sending at registration; the answer to a registration carries the outcome; accepted costs: the answer waits (a few seconds, up to the sending's time limit), a new state-changing route under D-104 with the session authorizing it (D-109), „Wysyłanie…” on the shared button (D-44), the sentence in the closed menu „Konto” with no mark so even a failure is unseen until „Konto” is opened (Q8 first part and cost, Q3 accepted costs, ekrany_i_menu Q11 point 4). Rejected: reasons added to B ("reads that the message went out when it did not"), C ("takes away the sentence after a registration") and to the background sending ("adds a state and a route") (Q8). Origin none.
- **D-158** — Rejected: the omitted sentence also leaves the player not knowing why to confirm the address (reset_hasla row 17 / Q8 B). Replies cost already present. Origin none.
- **D-159** — Rationale: a reset link may rely on the confirmed address staying the account's address; changing an address is an operation loop2 does not have (K9, "what the cycle would otherwise guess"). Origin none.
- **D-160** — Rationale: accepted cost, the block must stop links as well as sessions and a link's check must read the block (Q10 A cost). Rest of Q10, reset_hasla Q4/Q14/row 10 already present (placement of the refusal sentence belongs to D-225, outside the slice). Origin none.
- **D-163** — nothing to add (To do 13 holds no reasoning beyond the entry). Origin none.
- **D-164** — Rationale: a character's death does not touch programs; a fix in the copy zeroes the streak of that character alone (koncepcja D39). Rest equals the projected entry. Origin none.
- **D-165** — nothing to add; equals the projected entry of definicja_mvp2. Origin none.
- **D-166** — Rationale: a saved change of a program does not reach the running copy, so editing a saved program touches neither copy, streak nor counters (programy_gracza Q6); Programy keeps two columns and the rule panel opens in place under its row (D-288) (zadanie_proporcje To do 3, Q3 P1). Rejected: panel beside the editor on Programy with its three costs (Q3 P2). Origin none.
- **D-167, D-168, D-169** — nothing to add (programy_gracza Q2, Q3 fully present, costs included). Origin none.
- **D-170** — Rationale: a character switched during a map run used that program last, so the next send offers it (Q13). Origin none.
- **D-171** — nothing to add (Q5 gives answer only). Origin none.
- **D-172** — Rationale: an edit of a saved program touches neither copy, streak nor counters (Q6); the `warning` role means "something will not be carried out or is not saved" (Q14, Context). Rest already present. Origin none.
- **D-173** — Rationale: accepted cost of Q8 B: at a pause on a discovery two bands stand at once, the question one band farther from „Zakończ”. Q1 to Q4 otherwise already present with their ways not chosen. Origin none.
- **D-174** — Rationale: a switch takes a fresh copy, so the old copy's unsaved changes are lost without a question after the line's warning, and the streak is zeroed (D-131); the button is gone after a death or a completion because the map run has ended (Q10, Q12). Rest present. Origin none.
- **D-175** — nothing to add; equals koncepcja D52 and the projected entry. Origin none.

## Questions / observations (for the orchestrator)
1. *"Review when" lines of definicja_mvp* (D-152, D-153, D-154: "email delivery repeatedly prevents account recovery or the password method no longer fits", "Outsider delivery from the intended container fails, its limits prevent account recovery, or the service stops being available…", "Outsider cannot establish STARTTLS… or Nodemailer no longer supports the chosen Node.js line") are triggers for revisiting, not reasons; the decisions template has no field for them. Not carried. Recommend: leave out, or decide whether such a trigger belongs in *Rationale*.
2. *Costs and reasons tied to a past state or to task order, not carried:* potwierdzenie_adresu Q3 (a status row in the header on every screen until confirmed — placement replaced by the menu „Konto”); ekrany_i_menu Q5 and edytor_programu Q4 (build the list of programs in this task rather than the next — sequencing); potwierdzenie_adresu Q8 A and reset_hasla Q8 (the cost of changing one text and its tests); Q1 (the panel at the top-left with a select list — superseded layout); the costs about re-approving the definition in pytanie_przy_zakoncz Q2 C, Q3 C, Q4 A, Q7 B. Recommend: leave out.
3. *Ways in existing *Rejected* the named passages do not give,* left as they were: D-155 both ways; D-156 token in a query or path, token in clear, salted hash; D-157 the line in the header of every screen (comes from the definition) and `positive`; D-160 beyond Q10 B and C none; D-163 both; D-166, D-167, D-168, D-171, D-172 (the confirmation window, the message after the save), D-174 beyond the notes. Probably from the definitions or earlier cycles; recommend leave.
4. *D-157 and the answer waiting:* Q8 leaves "waits for the answer" or "browser asks separately" to the cycle; the foundation (the entry's *Verification*: "the answer to a registration carries the outcome of its sending") settles the first, so the accepted cost is written for it. Check this reading if the code does otherwise.
5. *D-172:* the Q14 text of the line and the Q6 text it replaces agree with the entry's binding sentence; no contradiction found. *D-166:* the definition says the editor stands "in the middle", the entry says "on the right"; the entry is later and stays.
6. *D-160 Origin names reset_hasla Q14* (placement of the refusal sentence above the forms or the game); its reasoning is carried by D-225 (outside the slice), not repeated here.
7. No note contradicted a binding sentence of the slice's decisions.

## Reach beyond the dispatch
- `foundations/decisions.md`: D-104, D-105, D-109 (whole), D-131 (binding sentence), D-196 (whole), D-225 (whole), D-44 (binding paragraph), D-288 (rationale lines), to check what the added claims refer to.
- Notes beyond the named passages: potwierdzenie_adresu Context and Questions 1 to 10 and Settlements rows K1 to K10; reset_hasla Questions 4, 7, 8, 9, 10, 14 and Settlements; programy_gracza Q1 to Q17 and Context; ekrany_i_menu Q1 to Q3 (headings only); edytor_programu Q4, Q13, Q18; zadanie_proporcje Q1 to Q4; karty_i_katalog_map To do 1 to 5 and the list of questions; pytanie_przy_zakoncz Q1 to Q8.

## Unread material
- `.claude/skills/the-way-record-decision/SKILL.md`, `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `examples.md`, WAY-03, WAY-27, `rules.md`, `way_of_working.md`, `foundation_step.md`, `slice.md`: read whole.
- `task.md` passages came copied in the handoff; the file itself not opened. "Foundation entries row 2 (D-362 as changed)" not opened.
- `guidelines/*` and `src/browser/AGENTS.md`: not read (only `foundations/decisions.md` changed).
- Notes read by passage, not whole: definicja_mvp (the five projected entries and the Review-when lines), definicja_mvp2 (entries D-157, D-165, D-166, D-170, D-173 and neighbours), koncepcja_projektowa (D39, D52), potwierdzenie_adresu (all but Questions carried to cycle, Human actions and Decisions in play), reset_hasla (selected questions, Settlements), programy_gracza (Questions, Context; Decisions in play and Settlements not read), ekrany_i_menu (Q5, Q11, Q15 whole; others by title), edytor_programu (To do 1, Q4, Q13, Q18), zadanie_proporcje (To do, Q1 to Q4), karty_i_katalog_map (To do 1 to 5), pytanie_przy_zakoncz (Questions to settle whole).
- `old-loop/` snapshot (policy.test.ts etc.): not opened; the Origins do not name it.

## Searches not found or unclear
- The `Origin` of D-166 names "edytor_programu, To do item 1, Questions 4 and 13" and of D-173 "pytanie_przy_zakoncz, rows 1, 2, 3, 4, 8 of Settlements"; the rows add nothing beyond the questions (the Settlements table of pytanie_przy_zakoncz was not read, only its questions).
- "programy_gracza Q5" is named for D-171 and gives the answer only; no reason to carry.
