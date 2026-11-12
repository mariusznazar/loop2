# Handoff — the fix of a review's findings (`make-change`, "the fix of a review's findings")

The human who asked for this cycle delegated intermediate choices to the orchestrator; you ask the human nothing. Questions go to the orchestrator in your report (status `questions`).

- Worktree (work from its root): `the repository root`, branch `task/martwe-odsylacze-origin`. Base of your fix: `git rev-parse HEAD` when you start (write it in your report); the worktree must be clean.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole, and the file it names for a fix when the variant comes.
- What you fix: the six blocking findings (I1–I6) of `docs/task-cycles/martwe-odsylacze-origin/reports/findings-15-17.md` (copied from `reports/review-15-17-report.md`, `FAIL 769f5e24`; copied at the end of this handoff). They concern D-311, D-312, D-313 and D-316.
  Check each against the code, the foundation and the notes before you fix it (the design report the finding names for D-311 is among the notes in the snapshot `the private snapshot of the notes (not committed)/vault/`; read its parts A.2 and A.3 and the passage on the smaller scene with its figures); where a sentence is about the state of the product today, write only what you verified at the head.
  The reviewer also reports that D-349 (another slice, which is being rewritten now by another executor and is not yours) carries the same "too narrow" reason; do not touch D-349, but tell me in the report what D-349 says at the head.
  Minor findings of that review are not yours to fix (they go to the request's list).
- Touch only D-311, D-312, D-313 and D-316 (*Rationale*, *Rejected*, *Origin* lines and their continuation lines); the part before *Rationale* stays as it is. "Through the project skill `the-way-record-decision`" means doing the skill's steps (its `read.md` reading, deciding what the entry is, drafting, writing — an edit with your editor tool, not a script — and the check); say in the report which steps you did.
- Nothing an entry gains names a note, a task, a question number or a decision number of the concept, a path on a disk or a copy of a task document; do not write "the MVP", "the definition", "the project's definition", "the concept of the game" as an authority, "the task" or "the change" as a reason. A reason a note does not give is not added; a rejected way with no reason in the notes stays with no reason.
  Never open, commit, stash or check out anything in the vault `the author's notes` or in `the local clone of the old game's repository`.
- Answer with evidence a finding you hold wrong, instead of fixing it.
- Checks, each with command and exit code: `python -B .the-way/elements/common/foundation_check.py` (exit 0) and `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md` (no line inside the four decisions). Do not run the product's gate.
- Commit on the task branch (`git add foundations/decisions.md`; English message `docs: :memo: …`); do not push.
- Report to `docs/task-cycles/martwe-odsylacze-origin/reports/fix-15-17-report.md` with the checks, the own-work check, **Unread material** (or `none`) and **Searches not found or unclear** (or `none`). Return: status, commits, one-line check result, report path.

## The findings (copied word for word from the reviewer)

## Important

### I1 — D-311 *Rejected*: an invented reason, contradicted by the note's own numbers, and "the change" as a reason (slice 17)

Place: `foundations/decisions.md:7389-7390`.

Entry: „the scene shrunk to its size in loop with the split of the widths unchanged — it does not solve what the change is for, a program too narrow to write in (D-349).”

Note (`zadanie_proporcje_sceny_i_programu_loop2.md`, Q1, Not chosen A): „Scena 336 × 152, reszta podziału bez zmian (program 510 px w oknie 1280 px, 606 px przy treści 1344 px) — „A teraz to też jest zadanie, które nie rozwiązuje tego co chcę rozwiązać”.” Chosen D gives „526 px w oknie 1280 px i 622 px przy treści 1344 px”; Need: „celem jest szerokość programu, nie sam stosunek sceny do programu, bo w oryginalnym Loop scena ma 336 × 152 px, a tu zostaje dwa razy większa”; row 3: „nie musimy zmniejszać sceny”.

What is wrong: the way was not rejected for leaving the program narrow — by the note it gives the program 510/606 px, within 16 px of the chosen 526/622 (and wider than loop's ~470 px at 1280, Context). The note's reason is that the human wanted the program wide *without* shrinking the scene. „a program too narrow to write in” is invented (copied from D-349, which carries the same error, see Out of scope), and „what the change is for” is a process reference to the task. Fix: „…unchanged — it would give the program about as much width (510 px in a window 1280 px wide, 606 px at 1344 px) only by halving the scene, while the aim was a program as wide as in loop with the scene kept at its size (D-349)”, or drop the way here and leave it to D-288/D-349, which already reject it.

### I2 — D-311 *Rationale*: a light the scene does not have, attributed to D-132, which does not give it (slice 17)

Place: `foundations/decisions.md:7339-7341`.

Entry: „„✕” uncovers the scene, which keeps under the window the light that D-132 gives a solved map.”

Note (`koniec_przejscia_loop2.md`, Q1 Answer): „Pod oknem scena zostaje ze światłem w pełnym złocie po rozwiązaniu, które D-132 w definicji każe pokazać, a „✕” ją odsłania, więc droga nie zmienia definicji.” Same note, *Out of scope*: „Światło sceny w pełnym złocie po rozwiązaniu i efekty śmierci i rozwiązania w scenie — zadania 18 i 19”.

What is wrong: the light belongs to the project definition's D-132, not the foundation's. D-132 at `769f5e24` says nothing of light or dawn (read whole), and no code at `769f5e24` draws a night or a dawn (`git grep -i "night|dawn|noc|świt" 769f5e24 -- src/browser` prints nothing; D-315 itself now says „the scene has no night until that layer is built”). The sentence states as present a light that neither the linked entry nor the game has, and the note's reason behind it („więc droga nie zmienia definicji”) is process. Fix: drop the clause after „„✕” uncovers the scene”, or, if the reason is wanted, say „so the scene, where a solving is to be shown (D-315), is one click away”.

### I3 — D-311 accepted cost written as present though it has been built (slice 17)

Place: `foundations/decisions.md:7346-7347`.

Entry: „…until the player opens it with „Koniec przejścia”; the keyboard handling, Escape and the return to the window are to build.”

Note (`koniec_przejscia_loop2.md`, Q1): „Koszty, które człowiek przyjął: okno zasłania scenę, D-311 dostaje zdanie o oknie, a klawiatura, Escape i powrót do okna są do zbudowania.”

What is wrong: this was the cost of work to be done when the task was refined; D-311's own binding sentence at `:7284` says „„✕” in it and Escape pressed in it (D-370) close it and uncover the screen, it opens again at every entry on the screen of an ended map run”. A note's statement about a past state written as a present fact of the log — the kind the handoff names. Fix: either drop it or state the lasting cost: „the window needs keyboard handling of its own, Escape included, and a way back to it (D-370)”.

### I4 — D-311 *Rejected*: two ways kept without the reasons the named passage gives (slice 17)

Place: `foundations/decisions.md:7354-7355`.

Entry: „the needs below two drawings of one place, as in loop; the trip plan under the editor during a map run;” — no reason after either.

Note (`rozpoznanie_projektant.md`, A.2, which D-311's old *Origin* named): „Potrzeby i cel stoją nisko | Ciepło i sytość zaczynają się na wysokości około 590 px, passa na 650 px, drobnym drukiem i z paskiem 4 px” and „Dwa rysunki tego samego miejsca | Scena i siatka zajmują razem około 320 px, zanim padnie pierwsza liczba”. For the trip plan, A.3 (same report): „Plan wyprawy stoi w Programach i jako podsumowanie na karcie mapy, nie na ekranie przejścia: tak było w starym Loop, a dziś w loop2 zajmuje około 150 px pod edytorem w trakcie gry”; the foundation's D-180 already rejects it with „it takes the space of what the player watches”.

What is lost: the reasons and the measured figures for two rejected ways — the failure this task exists to remove. Fix: „the needs below two drawings of one place, as in loop — the scene and the grid took about 320 px before the first number, the needs began about 590 px down and the streak about 650 px, in small print with a 4 px bar; the trip plan under the editor during a map run — it took about 150 px of what the player watches (D-180)”.

### I5 — D-312 and D-313 keep reasons that rest on "the definition" (slice 17, kept text)

Places: `foundations/decisions.md:7428` and `:7475-7476`.

Entries: D-312 „no sentence about the rule — a departure from the project's definition”; D-313 „the button left for later — a departure from the approved wording”.

Note (`ekran_przejscia_loop2.md`): Q6 Not chosen „bez zdania do zadania 10 — odejście od definicji”; Q5 Not chosen „przycisk później — odejście od zatwierdzonego brzmienia i wskazanie zadania”. The definition's sentence is quoted in the same sources: D-122 „names what was discovered and the program rule the game wrote” (Q6) and „with „Dodaj regułę z tym” and „Wznów”” (Q5).

What is wrong: both reasons point to a document no reader can open (WAY-27, *violates*: „a rationale rests on „as in our other product” without saying what was seen”), which this task removes elsewhere. The slices changed both entries and left these clauses. Fix: say what the departure would lose, from the foundation: D-312 „no sentence about the rule — the band would not name the program rule the game wrote, which D-122 has it name”; D-313 „the button left for later — the band would lack the button D-122 gives it”.

### I6 — D-316 *Rationale*: "the concept of the game" as the authority (slice 17)

Place: `foundations/decisions.md:7550-7551`.

Entry: „The concept of the game has drawn the scene from the state of the run alone, with positions and animations in CSS and no loop of rendering.”

Notes: `koncepcja_projektowa.md` §7: „scena 2D ze sprite'ów, rysowana wyłącznie ze stanu runu. Bez silnika graficznego — pozycje i animacje to CSS, nie pętla renderowania.”; `rozpoznanie_frajda.md` §9: „Kilkanaście obiektów nie uzasadnia pętli, a koncepcja wprost mówi „pozycje i animacje to CSS, nie pętla renderowania””.

What is wrong: the sentence gives no reason beyond the binding sentence, which already says the same; it only adds that an unreachable document said so — a pointer by name to the project concept (handoff, point 4). The reason the concept points to (few objects, frajda §9) is already in the first sentence. Fix: delete the sentence.

