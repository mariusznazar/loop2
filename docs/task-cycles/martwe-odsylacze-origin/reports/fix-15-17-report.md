# Report: fix of the blocking findings I1-I6 (D-311, D-312, D-313, D-316)

**Status:** done

- Base of the fix: `0f13b944` (clean worktree). Commit: `0822d4b2` `docs: :memo: fix the blocking findings of the review of D-311, D-312, D-313 and D-316`.
- File changed: `foundations/decisions.md` (+14 -11), only *Rationale* and *Rejected* of D-311, D-312, D-313, D-316. The *Origin* lines of the four are already `none`; nothing before *Rationale* touched. D-349 untouched.
- `the-way-record-decision` steps done: 1 Read (`read.md`; the four entries read whole, D-122, D-132, D-180, D-349, D-370 read whole), 2 Decide entry (`decide_entry.md`: no new question, each is an in-place edit of an existing entry), 3 Draft, 4 Write (editor tool, no script) and the check. Step 4.4: no neighbour edit and no new invariant follow, since no binding sentence changed.

## Findings

- **I1 fixed** (D-311 *Rejected*, last way). Confirmed against `zadanie_proporcje_sceny_i_programu_loop2.md` Q1 (Not chosen A gives 510/606 px against the chosen 526/622; Need: "celem jest szerokość programu"; Source: "nie musimy zmniejszać sceny"). New text: the way "would give the program about as much width (510 px in a window 1280 px wide, 606 px at 1344 px; computed from the layout, not measured) only by halving the scene, while the aim was a program as wide as in loop with the scene kept at its size (D-349)". I added "computed from the layout, not measured" because the note says "rachunek", as D-349 does.
- **I2 fixed** (D-311 *Rationale*). Confirmed: D-132 at the head says nothing of light (read whole), and `git grep -inE 'night|dawn|noc\b|świt' -- src/browser` prints nothing. The clause is dropped; the sentence now ends "and „✕” uncovers the screen." (the wording of the binding sentence, instead of "the scene", so that the sentence still follows from "one set of buttons at a time").
- **I3 fixed** (D-311 *Rationale*). Confirmed: the binding sentence already holds the close, Escape and re-open behaviour (D-370). Now states the lasting cost: "the window needs keyboard handling of its own, Escape included, and a way back to it (D-370)".
- **I4 fixed** (D-311 *Rejected*). Figures from `rozpoznanie_projektant.md` A.2 (rows about the old loop: 320 px, 590 px, 650 px, 4 px bar) and A.3 (150 px of the trip plan under the editor); the trip-plan reason is tied to D-180 ("it takes the space of what the player watches"). New text keeps the reviewer's wording. The 150 px is a note's measurement of loop2 at an earlier time; I wrote it in the past tense ("it took") and did not re-measure at the head.
- **I5 fixed** (D-312 and D-313 *Rejected*). Confirmed against `ekran_przejscia_loop2.md` (Q6 and Q5 Not chosen) and D-122 at the head (its binding sentence names the program rule the game wrote and gives the band „Dodaj regułę z tym” and „Wznów”). D-312: "no sentence about the rule — the band would not name the program rule the game wrote, which D-122 has it name". D-313: "the button left for later — the band would lack the button D-122 gives it".
- **I6 fixed** (D-316 *Rationale*). The sentence "The concept of the game has drawn the scene ..." deleted; the first sentence keeps the reason (a few objects).
- No finding contested.

## D-349 at the head (not touched)

D-349 (`foundations/decisions.md:8463`, already rewritten at `0f13b944`) in its *Rejected* says: "the scene at 336 × 152 px with the split of widths unchanged — the program would have 510 px in a window 1280 px wide and 606 px at the full width of the content, hardly less than the 526 and 622 px that the large scene gives with the panel in place (computed from the layout, not measured; D-288), and the owner judged that it does not solve what the owner wanted solved". The invented "too narrow" reason is gone; what remains is a reference to "the owner" as the judge, which the next reviewer may see as a process reference. Its *Rationale* gives the aim: the width of loop's program, not the scene-to-program ratio.

## Checks

- `python -B .the-way/elements/common/foundation_check.py`: exit 0, "0 errors" (run before and after the commit).
- `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md`, filtered to lines 7269-7570 (the four decisions): no line (exit 0 of the pipeline, empty output).
- Product gate: not run, as instructed.

## Own-work check

Requirement most likely missed: no reason or reference to a note, task, definition or concept left in the four entries, and no present-tense claim about the product not verified at the head. Check: grep above for note and path markers, plus `git grep` of night/dawn at the head for I2 (empty). Read the final diff: the only remaining statements about the product are the binding-sentence ones and D-370/D-122/D-180/D-349 references that exist at the head. Result: none found.

## Reach beyond the dispatch

D-122, D-132, D-180, D-349, D-370 read whole to verify the references the findings rely on; the notes `zadanie_proporcje_sceny_i_programu_loop2.md` (whole to line 95), `koniec_przejscia_loop2.md` (grep of the passages), `ekran_przejscia_loop2.md` (grep), `rozpoznanie_projektant.md` (A.2-A.3).

## Unread material

- The design report `rozpoznanie_projektant.md` was read in parts A.2 and A.3 (lines 28-70), as the handoff named; the rest not read.
- `koniec_przejscia_loop2.md` and `ekran_przejscia_loop2.md` read by grep and the passages around the lines cited, not whole.
- The old Loop clone and the loop screenshots not opened; the figures come from the notes.

## Searches not found or unclear

none
