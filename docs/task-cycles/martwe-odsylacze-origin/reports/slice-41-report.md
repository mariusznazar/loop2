# Report — slice 41 (reasoning of D-132, D-271, D-315 and D-316 after the second merge)

**Status:** done with concerns (concerns below; none blocks).

Slice base checked: `git rev-parse HEAD` at start = `e3bfa3a389a808405d30bfc102030951b5852b71`, worktree clean.

## Commits

- `b1af8dd4fee111444c5157992a53874211645462` `docs: :memo: carry again the reasoning of D-132, D-271 and D-316 that the second merge dropped`

File changed: `foundations/decisions.md` (64 insertions, 30 deletions; only *Rationale* / *Rejected* lines of D-132, D-271, D-316).

## Method (the-way-record-decision, steps done)

Step 1 read: `.claude/skills/the-way-record-decision/SKILL.md`, `.the-way/elements/decisions/skill/SKILL.md`, `read.md`, `decide_entry.md`, `template.md`, `elements/common/rules.md`, `way_of_working.md` (the reading of the foundation: D-368, D-369, D-370, D-371, D-53, D-173, D-149, D-314, D-03 read at the head as the entries each touches). Step 2: each entry is an existing one changed in place (no new entry, no neighbour edit, no glossary term); the search of the foundation found D-368 (carries the window layout reasoning, so D-132 got only a short premise and the rejected places the binding sentence relies on). Step 3 draft from the three versions (`9c65ad24`, `4660e14a`, `origin/main`) and the notes. Step 4: written on my recommendation with the editor tool (Edit), `foundation_check.py` run. No human question (delegated).

## One line per decision

- **D-132** — moved/added from `koniec_przejscia` Q1 (window, accepted costs: hides scene, not the whole screen as old Loop, "no jump into a place where something else stood"; not-chosen A/A2/B/C/D compressed to "a place where something else stood", "in the place of the scene"), Q3 (accepted cost: "Otwarte" at repeated completion; "Otwarte" ends the run like "Zakończ", D-53/D-173 take a second place; source line naming D-149 rationale), Q9 (menu bar stays so a failed save D-208 and a broken game D-323 are seen; not-chosen B); `teraz_i_potem` Q9 ("Teraz" gives the outcome; accepted cost: same completion sentence a second time as the window's title; not-chosen B/C already in main's *Rejected*, the "no place of its own" item written as the premise of the choice); `petla_zarobkowa` Q17 and row 20 ("time stands still" read of that map run alone, loops of other characters go on as in a pause); `rozwiazanie_lasu` Q6 (both ends alike, already in main's text). *Origin* stays `none`. Onward passages read: `definicja_mvp2_loop2` D-132 and D-149 (Q3's cited material), `koniec_przejscia` Decisions in play and Settlements rows 1, 3.
- **D-271** — from `rozpoznanie_frajda` part 7 (pack table: "ready, frames to be cut"; "clothed characters have no gathering pose"; AI generation "only on 2–3 bending frames if hand work is weak", makers name frame drift as main problem, pixels corrected by hand; new packs "wider choice but other palette and scale, new licences, more credits"), `definicja_mvp2_loop2` D-271 (cloud "ready, flat style without outline, like the smoke of Pixel Crawler"; rogue sheet), `scena_z_ludzikiem` Context (char_idle/char_walk are the rogue), `zakres_mvp2` "Postać w scenie". Main's rationale and Rejected kept whole. The smaller-flame cost: see concern 1. *Origin* `none`. Onward read: `swit_rosnacy_z_passa` Q8, Q13, Q14 and its D-271 rows (main's frost/specks reasoning, kept as main wrote it).
- **D-315** — no change. Read `ekran_przejscia` To do 6, Q2, row 3, and `definicja_mvp2_loop2` D-315, `swit_rosnacy_z_passa` D-315 passage. What Q2 holds that is true at the head is already in main's text (darkened file rejected, tint is a layer; "snow also at 25 °C, frost weaker on white" is carried in D-314); the night/dawn wording is superseded by main's tint and, as told, not restored. *Origin* already `none`.
- **D-316** — from `scena_z_ludzikiem` Context (clock reads every 200 ms; D-03 risk "a rebuilt node may restart a CSS animation"; walk is a motion of the character, not an effect under D-317's 300 ms), To do 5 and Q4 (walk 640 ms at every pace; accepted cost "at 16× the mage is often still walking when the action ends"; not-chosen: shorter of 640 ms and the action's time, 300 ms, time by distance), `rozpoznanie_frajda` part 2 and prop 7 ("Bez tego": the scene shows what the tile lacks, which harms reading "Tu leży mniej niż", as loop's scene did not show the tile). Main's tint reasoning and *Rejected* kept whole. *Origin* `none`. Onward read: `koncepcja_projektowa` §7 (drawn from run state, no engine, positions and animations are CSS — used only to confirm the existing "a few objects do not call for an engine"; not named in the entry), `zakres_mvp2` F1, F3, F4, F6, F9 (table rows pointing to frajda props 1, 3, 4, 6, 9), `rozpoznanie_frajda` props 1, 3, 4, 6, 7, 9 and part 9.

## Checks (command, exit code)

- `python -B .the-way/elements/common/foundation_check.py` — exit 0, `0 errors`.
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md` — prints nothing (exit 1).
- `git diff e3bfa3a3 -- foundations/decisions.md` read whole: every changed line is a *Rationale* or *Rejected* line (or continuation) of D-132, D-271 or D-316; no *Origin* line changed (all four already `none`).
- Not run: the product gate (`npm test` with no argument), as told.

## Own-work check

Requirement most likely not met: "a reason no source gives is not added". Check: for each added clause I named the note passage above; the two weakest were re-read: (a) D-132 "the end of a map run that opens a map names (D-149)" rests on the quoted D-149 rationale in `definicja_mvp2_loop2` and the Q3 *Source*; (b) D-316 "640 ms at every pace" re-checked against `src/browser/styles.css:2191-2235` (still 640 ms) and the 200 ms clock against `src/browser/view/clock.ts:60`. Mechanical check of "the part before *Rationale* unchanged" done by reading the diff (all hunks lie after the *Origin* line).

## Concerns and questions for the orchestrator

1. **D-271, smaller flame.** Main's *Rationale* said "frames of a bending mage and a smaller flame made by hand or generated". The note (`swit_rosnacy_z_passa` Q8, answer A′) says the smaller flame is cut down **by hand** from the frames of `fire.png`, a cost whose look is judged at the request; "generated" is given only for the few bending frames of the mage (`rozpoznanie_frajda` part 7, `definicja_mvp2_loop2` D-271). I wrote it as the notes say (flame by hand; mage frames by hand or, where weak, generated). This narrows main's wording; if main's "or generated" for the flame was intended, no source in the snapshot gives it.
2. **D-315 unchanged.** The slice expected re-carrying; nothing more is given by the notes that is still true and missing. If the orchestrator expected a text change here, say which sentence.
3. **D-132 Rejected, the places of the end.** I carried the rejected places of the end in compressed form (the D-368 *Rejected* holds the full account with the layout of the time). The wording "in a column or in a third tab under the world" is my summary of Q1 ways A, A2, B, C; the "two columns" layout is not named (past state).
4. No note contradicts a binding sentence of the four decisions; no question to report on that.

**Unread material:** `task.md` passages named in the handoff were read in the handoff's copy only (not opened in the file); `guidelines/testing.md`, `guidelines/coding.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`, `.claude/skills/the-way-record-environment-fact/SKILL.md`, `cycle.md` Q9, D-80, D-82, D-362 and the invariant `tracked-file-private-names` — not opened (the slice changes only decision prose; they bear on other slices). `koniec_przejscia_loop2.md` lines 197–213 (Decisions in play, D-122…) read only in part; `koncepcja_projektowa.md` read only §7. `rozpoznanie_frajda.md` read parts 2 (partly), 7, 8 (props 1, 3, 4, 6, 7, 9), 9, 10.

**Searches not found or unclear:** the old *Origin* of D-316 names "koncepcja_projektowa §7" and "zakres F1, F3, F4, F6, F9": the F-labels resolve to `rozpoznanie_frajda` part 8 propositions by the table in `zakres_mvp2` (rows 46–53), not to a section of their own. Nothing else unclear.
