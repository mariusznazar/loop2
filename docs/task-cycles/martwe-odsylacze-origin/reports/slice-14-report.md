# Slice 14 report — reasoning of D-259 to D-279 into the entries

**Status:** done

**Base:** HEAD was `95a29574f221434265b0c56f1d8c2db77b95d03c` at start, worktree clean.

**Commits:** `45d3bdd7` (the entries), `f3194047` (D-264 states the jsdom answer first). Changed file: `foundations/decisions.md` only (about 125 lines added, 75 removed in the first commit; one sentence in the second).

**Steps of `the-way-record-decision` done per entry:** 1 Read (`read.md`, template, `rules.md`, `way_of_working.md`, `examples.md`, WAY-03, WAY-27, `foundation_step.md`; the nineteen entries and the neighbours they name read whole); 2 Decide the entry (existing entries edited in place; no new question, no binding sentence touched, no collision found); 3 Draft (only *Rationale*, *Rejected*, *Origin*); 4 Write by editor tool, then `foundation_check.py`. No question for the human arose.

## Checks

| Check | Command | Result |
|---|---|---|
| foundation check | `python -B .the-way/elements/common/foundation_check.py` (no `--skip-test-citations`) | exit 0, "0 errors" (run twice, after each commit) |
| private names | `git grep -nIE 'in the vault\|_loop2\.md\|koncepcja_\|rozpoznanie_\|technologia_\|zadanie_\|Notes/Projects\|_zadania' -- foundations/decisions.md`, lines 5730-6420 | 0 lines in the slice's range (hits remain only in decisions of other slices, e.g. D-280 onward) |
| diff from base | `git diff 95a29574 -- foundations/decisions.md`, read whole | every changed line is a *Rationale*, *Rejected* or *Origin* line (or continuation) of D-259 to D-279; D-268 and D-270 untouched |
| Origin | `awk` over lines 5730-6420 for `- **Origin:**` | all of D-259..D-267, D-269, D-271..D-279 read `none` (D-268, D-270 were already `none`) |

Not run: the product gate (`npm test`), as the handoff says.

## Own-work check

Requirement most likely missed: "a reason a note does not give is not added, and one it gives is not lost". Check: re-read each note passage against each entry, and each added clause against a named passage (list below). Found and removed while checking: an invented sentence in D-272 ("the game stays within the pictures…"), "the credits they ask for are the cost" in D-271 (the note puts the credit cost on the wolf and icons, not on Pixel Crawler), the claim "as the invariants of the other boundaries do" in D-273, the D-33 audit clause in D-263, and a redundant sentence in D-261. Second requirement: nothing in the entries names a note, task, path or private fact — the grep above shows none. Past states of the product are written in the past tense (D-263 lockfile and image systems, D-264 test counts and stand-ins, D-265 guideline status, D-266 output location, D-273 copying function).

## One line per decision (what moved, from which passage)

- **D-259**: nothing added; Question 1 and S1 (switch only in two states, headings, one way out, trio of costs) were already in *Rationale*/*Rejected*. Origin set to `none`.
- **D-260**: nothing added; Question 2 and S2 already carried (rejected ways, accepted retyping). Origin `none`.
- **D-261**: added "(D-272)" to the rejected "sentence above the card" (Question 3 cites the rule on text and pictures). Rest already carried. Origin `none`.
- **D-262**: from napis_o_awarii Q6 and row 5: the case of the card taken down is written in D-262 so the rule does not look contradictory to D-323; rejected: leaving D-262 without it (looks like a collision, an agent may ask, a reader of D-262 alone misses the case); from Q3 (onward, referred to by Q6): sentence stands alone outside React because React takes the card root down with the sentence. From logowanie_w_react Q4 and its cited D-96/D-27: rejected "header and footer beside the card" now names D-27's refusal of a footer on every screen. Origin `none`.
- **D-263**: from Question "Którym narzędziem…", S6 and Context: rejected tool named as Vite; lockfile premise (Windows lockfile, Linux image, past tense). Origin `none`.
- **D-264**: from Questions carried to cycle (question 1), Context and the technology report's "Konsekwencje / Testy": the answer jsdom stated first (what replaces the hand-made model); tried in plain Node, React drew a row on jsdom and happy-dom and failed on the hand-made model; counts 37 / 44 / 41 / 13 of 67 cases (approximate, counted over blocks, premise in past tense); whole-page cases also build the screens still in DOM; other tests keep own stand-ins; accepted cost: new development dependency jsdom with its packages. Origin `none`.
- **D-265**: from the technology report line on shared controls and hierarchy Q5/To do 10: controls return finished elements and change them in place; the library makes them components or wrapped elements; guidelines had marked DOM modules as ones to copy from. Q5b and row 7 already carried. Origin `none`.
- **D-266**: from Context: before the bundle the per-module output stood among the served files, tests imported it one file at a time, the browser loaded it the same way (past tense). Origin `none`.
- **D-267**: nothing added: the passage gives the question and the premise (D-29 keeps the rule set), both already in the entry. Origin `none`.
- **D-269**: from Context and the question: the page took one constant (the sentence of the answer to a request for a reset link) from the module of the account screen; moving it to a module with no React lets the page stand unchanged, not tried when the question was put. Origin `none`.
- **D-271**: from rozpoznanie_frajda part 7 (and its line on the old figure being a rogue) and the projected entry: the pack needs only frame cutting; the mage has idle, run and death frames only, no gathering pose; ready cloud in a flat style without outline like the pack's smoke; generated frames only where hand work is weak; makers of generation tools name frame drift as their main problem and the pixels need hand correction; another pack means wider choice but another palette and scale, licences and credits. zakres "Postać w scenie" and scena To do item 2 give only the question and the mage-versus-hooded-figure choice, already carried. Origin `none`.
- **D-272**: from rozpoznanie_frajda part 7: picture beside text never under it, so D-42 thresholds stay; the pattern on the page background is the least valuable because panels stand still and the form still shows. rozpoznanie_projektant C.2 and the projected entry otherwise already carried (the Siedziba band of C.2 is not in the binding sentence and was not written). Origin `none`.
- **D-273**: from logowanie_na_tle_gry Q3/Q4/C1 and plan Open questions: rule on trust boundaries asks a permanent test, sprite-file-content has method review; the deferral ends only with a change of principle (another kind of file, way in, recipient); one function copied static files for both builds so a sprite file would also have reached the preview server (past tense). Origin `none`.
- **D-274**: from hierarchia Q1a and karty Q6: states of the main button (rest, hover, waiting); reason for "Wejdź" (entering is the main action of the screen Mapy per a design review; in loop it had a green frame beside the grey frame of the earning loop button); rejected "plain Wejdź" now says the rules would stay unchanged. Origin `none`.
- **D-275**: from Q1a: states of a secondary action (no frame, no side spacing so it starts level with the fields, hover `text`, disabled `text-disabled`). Origin `none`.
- **D-276**: from Q2/Q2c: states of a tab (chosen, others in `text-label` as in loop, hover, waiting, divider line). Rest already carried. Origin `none`.
- **D-277**: nothing added; Q2b and row 4 (one mark, NN/g cost, rejected: the bar's task deciding alone) already carried. Origin `none`.
- **D-278**: from Q4: measurement at a 1280 × 800 window (credits title 96 px, tabs 8 px with a centred card; none with a fixed edge; card with credits unfolded ends at 682 px). Origin `none`.
- **D-279**: from Q3b: D-40's sentence that each role stands as text stays true; the bar takes the colour of its sentence, not `text-secondary`; secondary-action text in `text-secondary` is a note like "Autorzy grafiki". Origin `none`.

## Onward passages read (lesson 6)

- logowanie_w_react: whole note, including Context and *Decisions in play*; the technology report `technologia_budowanie_ekranow` sections "Konsekwencje" (shared cost, Testy, Budowanie, comparison table) and the measurement summary; plan_mvp2 Open questions and Change log (2026-11-01 lines on the document model, the split of the login task, `assets/sprites/`).
- napis_o_awarii: whole of Description to *Settlements to record*.
- hierarchia: whole note.
- karty_i_katalog_map: Question 6 (lines 110-116) only.
- logowanie_na_tle_gry: whole note. scena_z_ludzikiem: To do and Questions 1-13, Context lines about the figure. zakres_mvp2: whole. rozpoznanie_frajda: part 7 and section 8 proposal 1 and the "Stoi tam łotrzyk" bullet. rozpoznanie_projektant: C.2. definicja_mvp2: the projected entries D-271 and D-272, the Technology bullets, and the `esbuild`/bundler hits.
- D-323 and D-27, D-76, D-73, D-39, D-40 in the foundation, to check the added text against them.

## Unread material

- Not read: `koncepcja_projektowa.md` (no Origin of the slice names it); the rest of `plan_mvp2_loop2.md` and `definicja_mvp2_loop2.md` outside the passages listed; `karty_i_katalog_map_loop2.md` outside Question 6; `scena_z_ludzikiem_loop2.md` Decisions in play; the rest of `rozpoznanie_frajda.md` and `rozpoznanie_projektant.md`; `.the-way/elements/decisions/skill/projected.md`/`projected_mode.md` (projected mode not used).
- Handoff-named files read: all of the *Read* list except `task.md` (its passages are copied in the handoff, so the file was not opened) and the *Foundation entries row 2 (D-362)* (not needed; no D-362 text touched). `.the-way` WAY-03 and WAY-27 read by passage as named.

## Searches not found or unclear

- The answers of D-264 to D-267 and D-269 are not in the note: it holds the question, Context facts and the technology report; the existing *Rationale* and *Rejected* of those entries (cycle reasoning) were kept, and only what the note gives was added. Nothing is missing from the note that I could name.
- D-271 *Rejected* about the dust cloud does not come from any note named in the Origin (the earlier writer carried it); not changed.
- Counts: the added 37/44/41/13 of 67 are a measurement the choice rests on, written with its conditions; if the reviewer reads the template's "no count" rule as covering it, delete the figures from D-264 and keep "most cases".
- I ran one throw-away read-only Python count before reading `.ai/rules/scripts.md`; it wrote no file.
- No note contradicted a binding sentence; no question for the orchestrator.
- Mismatch: the handoff's "Foundation entries row 2" and the plan's line numbers differ from the head; I used the head.
