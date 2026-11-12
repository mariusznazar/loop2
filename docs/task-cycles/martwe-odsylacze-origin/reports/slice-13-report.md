# Slice 13 report — reasoning of D-241 to D-258 into the entries

**Status:** done with concerns (concerns listed under "Questions and flags"; none blocks the slice)

**Base:** HEAD was `303c16dd14d2013a91282e01dbc8e0973f7a85f9` at the start; worktree clean.
**Commit:** `f72e08aa` (`docs: :memo: move the reasoning of D-241 to D-258 into the entries and drop their private origins`)
**Files changed:** `foundations/decisions.md` (172 added, 63 removed lines; only Rationale, Rejected and Origin lines of D-241 to D-258).

## Skill steps done (the-way-record-decision, per entry)

Read (`read.md`: template, rules, way of working, examples WAY-03, WAY-27 and the foundation step; each entry read whole), decide-entry (every entry already exists; the question is unchanged, so each is an in-place edit; collision search limited to the decisions the added clauses name: D-75, D-88, D-93, D-111, D-183, D-207, D-212, D-239, D-240, D-287), draft, write (edits of `foundations/decisions.md` with the editor tool), check (foundation_check). No step 4.4 follow-up: no binding sentence, field or neighbour changed. Questions to the human: none (this slice asks none).

## Checks

| Check | Command | Result |
|---|---|---|
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | exit 0, "0 errors" |
| No private names in the slice | `git grep -nIE 'in the vault\|_loop2\\.md\|koncepcja_\|rozpoznanie_\|technologia_\|zadanie_\|Notes/Projects\|_zadania' -- foundations/decisions.md` | exit 0; first hit at line 5710, the slice's decisions span lines 5025 (D-241) to 5695 (D-259 starts at 5696 after the edit): no hit inside the slice |
| Diff read whole | `git diff 303c16dd -U0 -- foundations/decisions.md` | every hunk is a Rationale, Rejected or Origin line (or its continuation) of D-241 to D-258; no Scope, Based on, Relations, Verification or binding line differs |

Also: grep over the added lines for "the task", "the MVP", "the definition", "vault", ".md", "src/", "tests/", names: no hit.

## Own-work check

Requirement most likely missed: "a reason a note does not give is not added, and one it gives is not lost" (lessons 4 and 5: a clause I add must be traceable). Check: every added clause was re-read against the passage below; the three figures I carried (243 game minutes / 15 s at 16×, 0.0068 ms per game minute, a 300 ms effect / frame every tenth of a second) were rechecked against the notes' tables; the claim about the saved-game-load console line was checked against the code (`git grep saved-game-load` finds it in `src/browser/view/app.ts`). Showed: all traceable; the clause on Siedziba not being on view during a map run is stale in the product (D-287 keeps Siedziba on view) and is therefore written as a premise in the past tense.

## One line per decision: what moved, from which passage

Notes are named by file (snapshot `vault/`), passages by their headings. No note name enters the entries.

- **D-241** — from `petla_zarobkowa_loop2.md`, To do 6 and 7 (practice kept with the loop outside skills, taken by a death without resurrection), Questions carried to cycle first question (the game state held one map run; characters not in parallel was an accepted cost until map runs are per character; D-56 numbers). Origin set to `none`. Rejected unchanged (the note keeps no ways for this decision).
- **D-242** — To do 14 (death settled at its own game minute's moment lets a resurrection used during absence renew from it and cover a further death the same night; D-04 "one footing"). Origin `none`. Items 2, 11, 12 and the third carried question were already carried by the entry.
- **D-243** — Q1 (weak point: one more button in a long row; Not chosen B: "several times more view"), Q3 (weak point: one click more; Not chosen B: "as in loop" sending stops the loop). The definition's projected entry and the map-card To do 5 hold only the wording and the placement the binding sentence already states. Origin `none`.
- **D-244** — Q2 and Q20 (named departure from the predecessor game: no watching a loop; checking a program only by a manual map run), row 4 (counts stay as D-93 holds them until the next send or restart), map-card Q5 (same line as in the headquarters with "Zatrzymaj", buttons inactive; accepted cost: a destructive button on the sending screen; Not chosen B a sentence instead of "Zatrzymaj", C inactive buttons only, the latter refused by D-287). Origin `none`.
- **D-245** — Q5 (the quoted rationale of what pays: loot leaves in the backpack, practice paid at the stop keeps the player fixing the program; D-183 for the carried items), Q18 (one condition in the view, same principle as the report). Origin `none`.
- **D-246** — To do 16 and Q19 ({m} = minutes the catch-up passed, not time since the save), row 23 (section opens for a loop that stopped at any number of minutes), Q19 title E weak point (second title, one condition), Q21 and Q6 (closing per character departs from the predecessor game; Q19 A departs too), row 26 plus Context (Siedziba not on view while a map run stood in the game state, written as a past premise). The concept document §5 passage ("only they need the player's hand") was already in the entry. Origin `none`.
- **D-247** — Q7 (departure from the predecessor game's bound; Context measurement 0.0068 ms per game minute on short map runs ended by death, lower estimate), To do 13 (the catch-up starts from the loaded state; D-212 manual map run paused / ended screen stays), Q7 "bound can be added later when the project definition changes for another reason". Origin `none`.
- **D-248** — Q8 ("browser clock, as in loop"), row 13 (the name `save time` apart from "moment of saving" of D-207 = the occasion to send). The rest was already in the entry. Origin `none`.
- **D-249** — row 16 (nothing discovered, so time does not stop and the D-123 rule is not written). Q9 costs and ways were already in the entry. Origin `none`.
- **D-250** — Context (one `paused` field for the whole game state, real time moved nothing while paused), row 20, P1 (written as a past premise). Q17 was already in the entry. Origin `none`.
- **D-251** — Q14 (Answer B reasoning: the mark comes with the loop and can use its name; weak point: until then a trial took stock silently though nothing was yet to foresee). Origin `none`.
- **D-252** — nothing to add: reguly Q1, Q9 and row 1, and teksty Q7 (A and B ways, owner sees a code instead of a description) were already carried in full. Origin `none`.
- **D-253** — napis Q4 (place name in the line; recurring error leaves the line once; agent knows kind but not where or about what; reproduces with a state built as D-255 or in Node) and row 2. reguly Q4 and napis Not chosen were already in Rejected. Origin `none`.
- **D-254** — whole report `technologia_obsluga_gry_przez_agenta.md`: part 1 (point 2 and 5: D-75/D-88 reading, agents already used the MCP), part 3 (motion measurements, three limits, token costs), part 5 (the per-option costs), part 7 (collision table), part 8 (omitted options), "what if left as today", and the critique result (collision is the report author's reading; clock and frames "not found" and not "absent"; Desktop route on Windows never tried; Claude in Chrome unchecked). Rationale gained the reasons for the stream of frames and the reading of D-75/D-88; Rejected now names every option the report weighs, each with its cost. Origin `none`.
- **D-255** — whole report `technologia_dane_do_sprawdzania.md`: sections 2 to 5 and 7 to 9 (costs of options A to L, observations, omitted options), edytor note To do 16 and Context (the agent does not reach by playing the states with combat verbs and a bought branch). Rationale gained the reach of playing, the real sign-in/save covered, the registration limit going around, and the maintenance cost; Rejected gained the cost beside each of the report's other options. Origin `none`.
- **D-256** — lokalny_start Q1 and row 1: already carried in full. Origin `none`.
- **D-257** — Q2: added the code fact (running server gave its mail sender no extra certificate; only tests passed one) beside the receiver's cost, and the way the note quotes from D-111 (mail switched off by a branch of the server). Origin `none`.
- **D-258** — Q3 and row 3: already carried in full. Origin `none`.

## Reach beyond the dispatch

Quick reads of `foundations/decisions.md` for D-93, D-111, D-239, D-240, D-287 (whole entries) and a grep of the glossary and log for "predecessor game", to check the claims I added against later decisions. The code grep for `saved-game-load` (above). No other.

## Unread material

- Notes were read by the passages the Origin fields name and by what they refer to, not whole: `petla_zarobkowa_loop2.md` read whole; `definicja_mvp2_loop2.md` only lines 990 to 1100 (the three projected entries D-243, D-244, D-251 and their neighbours) and the grep for D-243/D-244/D-251; `karty_i_katalog_map_loop2.md` lines 27 to 151 (To do and Q1 to Q12; Context beyond line 151 unread); `koncepcja_projektowa.md` §5 lines 321 to 552 only; `reguly_awarii_i_logow_loop2.md`, `zadanie_loop2_teksty_rozjechane_z_kodem.md`, `napis_o_awarii_loop2.md`, `lokalny_start_loop2.md`, `technologia_obsluga_gry_przez_agenta.md` and `technologia_dane_do_sprawdzania.md` whole; `edytor_programu_loop2.md` lines 18 to 26, 44 to 45 and 225 to 262 (found by grep for D-255 and the verbs of combat).
- Handoff Read list: task.md passages are copied in the handoff and were not opened from the file; `.the-way/foundations/decisions.md` WAY-03 and WAY-27 read; `.claude/skills/the-way-record-decision/SKILL.md`, the decisions element's `SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `examples.md`, `common/rules.md`, `common/way_of_working.md`, `task-cycle/skill/foundation_step.md` read whole. "Foundation entries row 2 (D-362 as changed)" was not opened: this slice does not touch D-362.

## Searches not found or unclear

- The "Questions carried to cycle" of `petla_zarobkowa_loop2.md` hold questions only, no answers (first and third question, named by D-241 and D-242): the answers are the binding sentences; I carried only the premises the questions state.
- `definicja_mvp2_loop2.md` was grepped only for D-243/D-244/D-251; the Technology section's "Lacks"/"Risks taken" for D-254 and D-255 (the entries already hold them) was not looked for, because the Origin names the research reports and not the definition. The source of those lacks/risks in the entries is therefore unverified by me.

## Questions and flags (none blocks)

1. **Reasoning in the entries that no named note gives** (present before my slice, not added by me, kept): D-241 Rejected (three ways), D-252 Rationale "a list written by hand can drift from the code ... the review of each change holds both", D-254 Rejected "a command sent at each tab", D-255 Lacks/Risks and the Rejected "a developer screen like the old probe — a new entry for a game state". Setting Origin to `none` asserts the whole reasoning is in the entry; these lines are extra to the notes. Recommendation: leave (they are the cycle's own, and removing them loses reasoning).
2. **"no clock" of D-254** — the old wording said Chrome DevTools MCP and agent-browser have "no clock"; the report's critique says the clock does not differentiate options for map paces and that "not found in the descriptions" is not "absent". I rewrote it as "no clock found in their descriptions, which only a return after an absence needs". If the orchestrator wants the old wording, it loses the critique.
3. **Past premise of D-246** — "Siedziba was not on view while a map run stood in the game state" is a note premise that D-287 has since overtaken; written in the past tense as the premise of the choice. The binding sentence ("on reaching Siedziba") is unchanged and still true.
4. **Note vs binding sentences** — no contradiction found, so no question for the binding sentences. One mismatch to note: D-243 in the note says the button stood in the headquarters row; the binding sentence says the section "Kto idzie" of the map card. I carried the cost ("one more button in a long row of buttons") without naming the place.
5. **Check wording** — the handoff's second check prints "no line inside the slice's decisions"; the command prints later decisions' lines (outside the slice); none lies between lines 5025 and 5695.
