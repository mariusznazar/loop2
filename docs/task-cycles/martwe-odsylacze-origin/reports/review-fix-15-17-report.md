PASS 0822d4b2

# Review of the fix of the findings of the review of slices 15-17

- Reviewed: the fix of the blocking findings I1-I6 (`reports/findings-15-17.md`, first review `FAIL 769f5e24`), range `0f13b944..0822d4b2`, one commit `0822d4b2` `docs: :memo: fix the blocking findings of the review of D-311, D-312, D-313 and D-316`, one file `foundations/decisions.md` (+14 -11).
- `git rev-parse HEAD` in the worktree: `0822d4b2b7dece7124da144844a5c0cd744e6611`, the head given; `git status --porcelain` empty. Everything below was read from the commit (`git show 0822d4b2:foundations/decisions.md`, `git diff 0f13b944..0822d4b2`), not from the working tree.
- Method: `.the-way/task-cycle/review/SKILL.md` and `fix.md` beside it, read whole.

## Findings of the findings file

### I1 — D-311 *Rejected*, the scene shrunk to its size in loop: **fixed**

At `0822d4b2` `foundations/decisions.md:7390-7393`: „the scene shrunk to its size in loop with the split of the widths unchanged — it would give the program about as much width (510 px in a window 1280 px wide, 606 px at 1344 px; computed from the layout, not measured) only by halving the scene, while the aim was a program as wide as in loop with the scene kept at its size (D-349).”

- The invented reason („a program too narrow to write in”) and the process reason („what the change is for”) are gone.
- True and traceable: `zadanie_proporcje_sceny_i_programu_loop2.md:41` (Not chosen A: „Scena 336 × 152, reszta podziału bez zmian (program 510 px w oknie 1280 px, 606 px przy treści 1344 px)”); halving: 672 × 304 against 336 × 152 (`:19`, `:22`, and D-349's binding sentence, `:8468`); the aim with the scene kept: `:22` („celem jest szerokość programu … a tu zostaje dwa razy większa”) and `:45` („nie musimy zmniejszać sceny”). „computed from the layout, not measured” is what D-349 *Rejected* (`:8491-8494`) already says of the same figures. D-349 rejects the same way with the same figures, so no contradiction with the linked entry. Two wording points are listed as M1.

### I2 — D-311 *Rationale*, the light D-132 gives: **fixed**

`:7339-7340` now ends „and „✕” uncovers the screen.” The light and D-132 are gone; `grep -nE 'D-132|light|dawn|definition|MVP|the task|concept'` over D-311 at the head (`:7269-7393`) prints nothing. The new wording is the binding sentence's (`:7284`: „„✕” in it and Escape pressed in it (D-370) close it and uncover the screen”) and the note's (`koniec_przejscia_loop2.md:51`, (d): „„✕” albo Escape zamyka okno i odsłania ekran”), and the code's (`src/browser/view/end-window.tsx:37` at `0822d4b2`: „„✕” and Escape: the window closes and the screen of the map run stands uncovered.”).

### I3 — D-311 accepted cost written as still to build: **fixed**

`:7345-7346`: „the window needs keyboard handling of its own, Escape included, and a way back to it (D-370).” A lasting cost, no longer „to build”. True at the head: D-370 (`:8890`) gives the window the focus and Escape read in the window, and the code has it (`end-window.tsx:89-92`, `onKeyDown` with `Escape` → `controls.close()`); the way back is „Koniec przejścia” (D-311 binding `:7281`, D-371 `:8905`). Traceable to `koniec_przejscia_loop2.md:51` („klawiatura, Escape i powrót do okna”). A pointer point is listed as M2.

### I4 — D-311 *Rejected*, two ways without their reasons: **fixed**

`:7353-7356`: „the needs below two drawings of one place, as in loop — there the scene and the grid took about 320 px before the first number, and the needs began about 590 px down and the streak about 650 px, in small print with a 4 px bar; the trip plan under the editor during a map run — it took about 150 px of what the player watches (D-180)”.

- Figures match `rozpoznanie_projektant.md` A.2 (rows „Potrzeby i cel stoją nisko”: 590 px, 650 px, drobny druk, pasek 4 px; „Dwa rysunki tego samego miejsca”: about 320 px) and A.3 (about 150 px under the editor).
- The past tense of the 150 px is right at the head: the trip plan is drawn only in the mode `programs` (`src/browser/view/program-panel.tsx:635-642` at `0822d4b2`, `mode === "programs" ? <TripPlanView …/> : null`), so not on the screen of a map run. „of what the player watches” is D-180's reason (`:3540`: „it takes the space of what the player watches”) and fits its *Rationale* (`:3539`); no contradiction.

### I5 — D-312 and D-313 reasons resting on the definition: **fixed**

- D-312 `:7431-7432`: „no sentence about the rule — the band would not name the program rule the game wrote, which D-122 has it name”.
- D-313 `:7480`: „the button left for later — the band would lack the button D-122 gives it”.

Both true at the head: D-122's binding sentence (`:2376-2377`) „names what was discovered and the program rule the game wrote … with „Dodaj regułę z tym” and „Wznów””. Both entries derive from D-122 (`:7405`, `:7454`). No contradiction with D-312's own sentence that the band leaves the sentence out where no group holds the rule (`:7400-7401`): the rejected way is no sentence ever. Traceable to `ekran_przejscia_loop2.md:95` and `:88`. No word of the definition is left.

### I6 — D-316 *Rationale*, the concept as authority: **fixed**

The sentence „The concept of the game has drawn the scene …” is deleted; `:7553-7558` reads on without a break („… legible at the fastest pace. The clock of the view reads the time every 200 ms …”). The binding sentence (`:7530-7535`) still holds that the scene draws from the game state with motion from CSS and no loop of drawing, and the first sentence of *Rationale* keeps the reason (a few objects).

## Findings in the fix diff

### Critical

none

### Important

none

### Minor

- **M1 — D-311 *Rejected*, `:7390-7393`: the comparison has no second term in the entry, and the tense of „the aim”.** „would give the program about as much width” — as much as what? The figures it compares with, 526 and 622 px, stand only in D-349 (`:8492-8493`); D-311 names D-349 at the end, so a reader can find them, but D-311 alone reads as a comparison with nothing. With it, „the split of the widths unchanged” (kept text, not written by this fix) now stands in an entry whose binding sentence gives two columns, while 510/606 px hold only for the former three-column split; a reader of D-311 alone could take „unchanged” as the two columns of the binding sentence. And „the aim was” is past while the entry's *Rationale* says it in the present (`:7322-7324`, „The program is to be as wide as in loop … the aim is the width of the program”). Nothing a change of code would do wrongly follows from it, so Minor. Possible wording: „it would give the program 510 px in a window 1280 px wide and 606 px at 1344 px, about the 526 and 622 px of this layout (computed from the layout, not measured), only by halving the scene, while the aim is a program as wide as in loop with the scene kept at its size (D-349)”.
- **M2 — D-311 *Rationale*, `:7346`: „(D-370)” after „a way back to it”.** D-370 gives the keyboard handling and Escape and moves the focus to „Koniec przejścia”; the way back itself, „Koniec przejścia” opening the window, is in D-311's own binding sentence (`:7281`) and D-371 (`:8905`). Not false, a pointer slightly short of its whole clause; „(D-370, D-371)” would cover it.
- **M3 — D-311 *Rejected*, `:7355-7356`: whose 150 px.** „the trip plan under the editor during a map run — it took about 150 px” follows directly after a way marked „as in loop — there …”; by the source the 150 px were loop2's, and loop kept the plan in Programy (`rozpoznanie_projektant.md` A.3). A reader may carry „there” (loop) over to the trip plan. No change of code follows from it.

## Declined to judge

- D-349 *Rejected* (`:8494`): „the owner judged that it does not solve what the owner wanted solved”, which the fix report flags as a possible process reference — outside the fix diff (D-349 was not touched by `0822d4b2`) and not in the findings file.
- The *Origin* lines of D-122 (`:2403`), D-132 (`:2705`), D-370 (`:8898`) and D-371 (`:8913`) still name notes in the vault — outside the fix diff and outside the four entries the findings concern; presumably for the cycle's other slices.
- D-311 *Rejected* „the end in the place of the scene — it hides the scene, in which the solving is shown” (`:7383-7384`), a claim about the scene that D-315 says has no night yet — kept text, outside the fix diff, not in the findings file.

## Checks

- `git rev-parse HEAD` — exit 0, `0822d4b2b7dece7124da144844a5c0cd744e6611`, the head given; `git status --porcelain` — exit 0, empty, before and after the next check.
- `git -C .the-way rev-parse HEAD` and `git ls-files --stage -- .the-way` — exit 0, both `e9a0f926dc9758f6554e8c0a30925d3e4d68cfed`.
- `python -B .the-way/elements/common/foundation_check.py` (run in the worktree while clean at `0822d4b2`, read-only) — exit 0, „0 errors”.
- `git diff -U0 0f13b944..0822d4b2 | grep '^@@'` — exit 0; seven hunks, at old lines 7340, 7346, 7354, 7390 (D-311 *Rationale* and *Rejected*), 7428 (D-312 *Rejected*), 7476 (D-313 *Rejected*), 7550 (D-316 *Rationale*); no line before *Rationale* of any entry changed, D-349 untouched.
- `git diff -U0 0f13b944..0822d4b2 | grep '^+' | grep -inE 'mvp|definition|the task|concept|note|vault|question [0-9]|row [0-9]|owner|human|\.md|https?:|<IPv4>|token|password|secret|Mariusz|change is for'` — only the `+++ b/foundations/decisions.md` header matched; no pointer to a note, task, question, the MVP, the definition, a secret or a host address in the added lines.
- D-311 at the head (`:7269-7393`) grepped for `D-132|light|dawn|definition|MVP|the task|concept` — exit 1, nothing.
- `git grep -n "Plan wyprawy" 0822d4b2 -- src/browser` and `git grep -nE "trip-plan|TripPlan" 0822d4b2 -- src/browser`, then `program-panel.tsx:620-650` — the trip plan is drawn only in the mode `programs` (I4).
- `git grep` of Escape and „Koniec przejścia” in `src/browser/view` at `0822d4b2`, `end-window.tsx:80-100` read — Escape read in the window, „✕”/Escape close it (I2, I3).
- Manual: D-311, D-312, D-313, D-316 read whole at `0822d4b2`; D-122, D-132, D-180, D-349, D-370, D-371 read whole; the note passages compared as above.
- Product tests: not run; the fix changes only `foundations/decisions.md`, no code or test, and the full suite is the cycle's own run.

## Reach beyond the dispatch

- D-371 (`foundations/decisions.md:8903-8916` at `0822d4b2`), read whole — where the way back to the window („Koniec przejścia”) stands, for I3 and M2.
- D-315 (`:7507-7526`), read whole — whether the scene has a night or dawn at the head, for I2.
- `src/browser/view/end-window.tsx` and `src/browser/view/program-panel.tsx` at `0822d4b2`, the lines named above — to check the sentences of I2, I3 and I4 against the code.

## Unread material

- `rozpoznanie_projektant.md`: lines 1-80 read (A.1-A.3, the passages I4 rests on); the rest not read.
- `koniec_przejscia_loop2.md` and `ekran_przejscia_loop2.md`: read by grep of the passages the findings cite (`koniec_przejscia_loop2.md:51`, `:186`, `:232`; `ekran_przejscia_loop2.md:64`, `:88`, `:95`), not whole.
- `zadanie_proporcje_sceny_i_programu_loop2.md`: read whole.
- The first review report `reports/review-15-17-report.md`: not read; the findings file carries its blocking findings word for word, and `fix.md` bounds the review by that file.

## Searches not found or unclear

- `zadanie_proporcje_sceny_i_programu_loop2.md:41` gives 510/606 px for way A without saying „rachunek” beside them; „computed from the layout, not measured” in D-311 rests on D-349 and on the note's other figures being computed (`:19`, `:39`, `:79`). Unclear rather than wrong.
