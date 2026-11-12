# Slice 17 report — reasoning of D-308 to D-322 into the entries

**Status:** done with concerns (questions listed below; none blocks the slice)

**Slice base:** `3ba0db45f94f9400ab1942b6b18d25f63b33f4bf` (HEAD at start; worktree clean).
**Commit:** `769f5e244db91bb8f120746e6d5327426958fcd7` — `docs: :memo: move the reasoning of D-308 to D-322 into the entries and drop their private origins`
**File changed:** `foundations\decisions.md` (+127 / -46 lines; only *Rationale*, *Rejected* and *Origin* lines of D-308 to D-322).

## Skill steps done (the-way-record-decision, for each of the 15 entries)

1. Read: `elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `examples.md` (WAY-03), `elements/common/rules.md`, `way_of_working.md`, `task-cycle/skill/foundation_step.md`, WAY-27; each entry read whole at the head (not from the plan).
2. Decide what the entry is: each entry is an existing decision whose binding sentences stay; the change is an in-place edit of *Rationale* / *Rejected* / *Origin* ("Changing a decision", WAY-07). No new number, no neighbour edited. The search of the foundation was limited to the decisions each passage names (D-03, D-39, D-40, D-43, D-122, D-132, D-141, D-173, D-279, D-288, D-317, D-349, D-368) so that no reasoning was duplicated against a wrong claim.
3. Draft: reasoning taken from the snapshot passages; nothing outside them.
4. Write: edits with the editor tool; `foundation_check.py` run after (below). No `record-invariant` follow-up was needed (no binding sentence, no *Verification* changed).

## Checks

| Check | Command | Exit / result |
|---|---|---|
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | exit 0, "0 errors" |
| Private names in the slice's range (D-308 at line 7139 to D-323 at 7756) | `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md`, filtered to lines 7139-7755 | no line |
| Diff read whole | `git diff -U1 -- foundations/decisions.md` | every hunk (old lines 7168-7667) is an *Origin*, *Rationale* or *Rejected* line, or a continuation of one, of D-308..D-322 |
| Product gate | not run (handoff) | — |

Own-work check (section 3): the requirement most likely not met is "a clause I add is traceable to a passage" and "no binding sentence changed". I re-read the whole diff against the notes line by line (per decision, below) and confirmed with the hunk positions that nothing before *Rationale* but the *Origin* line changed.

## Onward passages read (lesson 6)

- D-308: `definicja_mvp2_loop2.md` entry "What state does a program rule show during a map run?" (its *Origin*: `zakres_mvp2_loop2.md` row P4/NG4 — read; `research_edytor_programu_wow.md` "Rozumienie" lines 101-145 — read; `rozpoznanie_projektant.md` proposal 4 — read).
- D-311: `definicja_mvp2_loop2.md` entry (read); `zakres_mvp2_loop2.md` whole; `rozpoznanie_projektant.md` A.1-A.4, B.1-B.3 and the proposals list (lines 23-203, 400-490).
- D-316, D-317: `rozpoznanie_frajda.md` lines 15-50, 131-216, 247-396; `koncepcja_projektowa.md` §7 (lines 1151-1177); `zakres_mvp2_loop2.md` rows F1-F9.
- D-312 to D-315, D-318 to D-322: no onward passage beyond the task note (their notes' sources are the plan/definition/package files, see Unread).

## One line per decision (what moved, from which passage)

- **D-308** (stan_i_powod_przy_regule: Need, To do 6-7, Q A/C/D/E/F/5/7/8; zakres P4; research "Rozumienie"; projektant P4): added that loop showed these signs and they carried its legibility (Need; Context), signs only at the copy as in loop (Q A, To do 7), signs from the picking function because an explanation counted apart can lie (projektant P4 "Dowód", research "Rozumienie"), the state after a death in cold/hunger vs combat (Q 5, with the code fact checked at `src/browser/sim/run.ts:765`), "as in loop" for the open row (Q 7). *Origin* none.
- **D-309** (To do 6, Q 3, row 3; Context on M+5; row 3 "what the cycle would otherwise guess"): added that turns resolve together with the program of that moment (D-141) and that fixing the count once keeps "Potem" and other signs from counting those minutes differently. *Origin* none.
- **D-310** (To do 4-5, Q 4, row 4): added that the reasons cover every refusal of the feasibility check, combat refusals come from D-309, a missing stick at "Uderz — patyk" in combat gives "brakuje" (Q 4), and that fixing form and order keeps later actions from using another (row 4). *Origin* none.
- **D-311** (ekran_przejscia Need/Q3/Q4; teraz_i_potem Q10/Q13; kronika Q5/Q6; proporcje Need/Q1/Q2/Q6; koniec_przejscia Q1/Q2/Q9/Q10 and detail d-f; projektant A.2/B.1/B.2; zakres Kierunek): added the layout principle (loop as minimum, "never worse"), the premise state (one column, the complaint), the aim of a program as wide as in loop and the measured wrap at 1280 px, the accepted cost that tile hover links to the table only while the table is picked (kronika Q6), why the window covers the header (one set of buttons) and that the scene keeps the solved-map light (koniec Q1), the question closing the window and the window staying closed after "Wróć" (koniec Q10), the accepted costs (end out of sight while the question stands; keyboard, Escape and return to build; koniec Q1); *Rejected* gained koniec Q1 A, A2, B, C, D, Q9 B, Q10 A2 and B, and proporcje Q1 A. *Origin* none.
- **D-312** (ekran_przejscia To do 7, Q6, row 5): nothing to add — the entry already carried the whole of Q6 (three ways, cost, reasons). *Origin* none.
- **D-313** (ekran_przejscia To do 7, Q5, Q10, row 4; koniec To do 1, 9, Q1 f, Q5, Q12, row 6): added to *Rejected* the band left standing beside the window (koniec Q5 A2, Q12 C) and the band under a silent window after a death (koniec Q12 B). *Origin* none.
- **D-314** (To do 6, Q2, row 2): nothing to add — entry already carried the whole of Q2. *Origin* none.
- **D-315** (To do 6, Q2, row 3): added that the night is a layer over the picture and the scene has no night until the layer is built (Q2; no night/dawn code at the head, `grep -ri "dawn|night" src/browser` empty). *Origin* none.
- **D-316** (scena To do 4, 5, 7, Q3, row 3; zakres F1/F3/F4/F6/F9; frajda 8, 9; koncepcja §7): added the concept's "no engine, CSS not a render loop" (koncepcja §7, frajda 9), CSS because the clock reads every 200 ms (scena Context), the React risk of D-03 that this scene meets (scena Context), the accepted cost of misleading a "Tu leży mniej niż" reading (frajda proposal 7 "Bez tego"). *Origin* none.
- **D-317** (scena To do 10; zakres F2/F5; frajda 5): added the flash threshold with its numbers from the public criterion (frajda 5), that the reduced-motion setting alone does not answer flashes (frajda 5), the measured 1.8 actions a second at 16× with its conditions (frajda 4, referenced by 5/1), why overdue effects are dropped (step down from 16×, background tab; frajda 5), and that the three moments of stopped time are no ordinary events (frajda 5, scena Context). *Rejected* stays `none considered` (no note passage gives a rejected way for this decision). *Origin* none.
- **D-318** (To do 3, Q2, row 2): added "as in loop" and that every action's place is fixed so later work does not rearrange (row 2). *Origin* none.
- **D-319** (To do 5, 10, Q4, row 4): added "as in loop" (Q4) and that the 300 ms of D-317 does not reach the walk (row 4; Context). *Origin* none.
- **D-320** (To do 6, 10, Q4, 5, 6, 12, 13, rows 5, 6, 9): added the meaning of `positive` for the bar and smooth CSS fill between 200 ms readings (Q13, Context), and the reasoning of the icon colour (Q12: no text beside the icon, D-43/D-40 widened, differs from the unchosen cell). *Origin* none.
- **D-321** (To do 11, Q8, row 7): nothing to add — whole of Q8 already in the entry. *Origin* none.
- **D-322** (To do 8, 9, Q1, Q7, rows 1, 8): added that the grey is the one loop gave a paused scene (Q1). *Origin* none.

## Questions and concerns (none blocks)

1. **Table of reasons of D-310.** Q4 of the note carries a table of 18 refusals with the exact wording of each reason; D-310 holds five examples in its binding sentence and *Verification*. I did not add the table (it would be binding content in prose; WAY-05). The wording is in the code (`src/browser/sim/program.ts`) and `tests/sim/rule-signs.test.mjs`. Recommend: leave. If the orchestrator wants it in the foundation, it belongs in the binding sentence, which is not mine to change.
2. **Two rejected ways in D-312 not in the note.** "a name the screen holds from the moment of the discovery" and "the copy's first rule group as it stands" are in the entry's *Rejected* but not in the note's *Not chosen* (the note has three ways; the entry carries all three). Per the template a way the writer derives never enters *Rejected*. I left them (an earlier writer's, and removing is outside "carry reasoning"); recommend the orchestrator decide whether to strike them.
3. **Rejected way not placeable (carried as a question).** ekran_przejscia Q4: "the end lines in the right area already in that piece of work — a larger piece of work before its time". The right area no longer exists in D-311 and the reason is about scheduling, so I did not add it. Likewise kronika Q5 D2 (every attack stays in the chronicle with its paragraph) belongs to D-147, not D-311.
4. **D-308 first-reasons not added on purpose.** Q1/Q2/G (values of the two backgrounds, the dark bar, the D-279 reading) are already carried by D-39, D-40 and D-42 from the earlier slice; I did not duplicate them.
5. **Figures to check by the orchestrator against the head.** D-311: the narrow column and three-line break at 1280 px are given as past premises (note Need, from a screenshot at that time), without the pixel widths. D-317: 87,296 and 204,288 px come from the note's citation of the public WCAG criterion and from 672 × 304 (D-349); I recomputed 672 × 304 = 204,288.
6. **"Unclear" passages.** D-308's zakres row cites NG4, whose source `rozpoznanie_nowy_gracz.md` is not in the snapshot (two steps beyond the *Origin*); nothing is pointed at it.

## Unread material

- `.the-way/elements/decisions/examples.md` names WAY-03; read. WAY-27 read.
- The round packages, the plan and the project-refinement files that the notes quote as sources of answers (`round-4-7-package-*.md`, `plan_mvp2_loop2.md`, `ekrany-i-menu.md`, `rozpoznanie_nowy_gracz.md`) are not in the snapshot and were not read; the notes quote the answers in the passages I used.
- `definicja_mvp2_loop2.md` read only at the two entries it holds for D-308 and D-311 (lines 227-296); `koncepcja_projektowa.md` only §7; `rozpoznanie_frajda.md` parts 1, 4, 5, 8, 9, 10; `rozpoznanie_projektant.md` A-B and the proposals, not C-E; `research_edytor_programu_wow.md` only "Rozumienie"; `kronika_z_filtrami_loop2.md`, `teraz_i_potem_loop2.md`, `koniec_przejscia_loop2.md` read at the passages the *Origin* names plus Need and Settlements; `ekran_przejscia_loop2.md`, `scena_z_ludzikiem_loop2.md`, `stan_i_powod_przy_regule_loop2.md`, `zadanie_proporcje_sceny_i_programu_loop2.md`, `zakres_mvp2_loop2.md` read whole.
- The task passages and the foundation entries D-82, D-362, D-368, D-80, D-73 and the invariants named in "Current ranges" were not needed for these entries; D-368 read only for its *Rejected*.

## Searches not found or unclear

- `rozpoznanie_nowy_gracz.md` (NG4): not in the snapshot; not needed.
- A decision for the night/dawn layer in the foundation: none (grep "dawn|night" over `foundations/decisions.md` finds only backups).
- Whether "Programy" in D-308 should be quoted: the entry's own *Verification* uses the bare word, so I did the same.

## Choices with the rejected way and its cost if wrong

- Added no reasoning for dark-bar/background values in D-308 (duplicates D-40/D-42). Cost if wrong: a reader of D-308 alone does not see the value reasoning; one added clause fixes it.
- Kept D-317 *Rejected* `none considered`. Cost if wrong: a rejected way existed in a source I was not pointed to.
- Put WCAG numbers in D-317 *Rationale* as the public criterion's definition, not as a count of the product's foundation (template rule on counts). Cost if wrong: a reviewer reads them as a count; strike the two numbers.
