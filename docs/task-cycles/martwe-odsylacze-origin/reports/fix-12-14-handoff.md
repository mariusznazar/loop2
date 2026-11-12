# Handoff — the fix of a review's findings (`make-change`, "the fix of a review's findings")

The human who asked for this cycle delegated intermediate choices to the orchestrator; you ask the human nothing. Questions go to the orchestrator in your report (status `questions`).

- Worktree (work from its root): `the repository root`, branch `task/martwe-odsylacze-origin`. Base of your fix: `git rev-parse HEAD` when you start (write it in your report); the worktree must be clean.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole, and the file it names for a fix when the variant comes.
- What you fix: the two blocking findings (I-1 on D-247, I-2 on D-243) of `docs/task-cycles/martwe-odsylacze-origin/reports/findings-12-14.md` (copied from `reports/review-12-14-report.md`, `FAIL f3194047`; copied at the end of this handoff). Check each against the code,
  the foundation and the snapshot note before you fix it; where a sentence is about the state of the product today, write only what you verified at the head (for I-2: `src/browser/view/maps-screen.tsx` and the decisions about the map card). The Minor findings of that review are not yours to fix (they go to the request's list).
- Touch only D-247 and D-243 (*Rationale*, *Rejected*, *Origin* lines and their continuation lines); the part before *Rationale* stays as it is. "Through the project skill `the-way-record-decision`" means doing the skill's steps (its `read.md` reading, deciding what the entry is, drafting, writing — an edit with your editor tool — and the check); say in the report which steps you did.
- Nothing an entry gains names a note, a task, a question number or a decision number of the concept, a path on a disk or a copy of a task document; do not write "the MVP", "the definition" or "the task". A reason a note does not give is not added.
  Never open, commit, stash or check out anything in the vault `the author's notes` or in `the local clone of the old game's repository`; private sources: the snapshot `the private snapshot of the notes (not committed)/` (`MANIFEST.md`, `vault/`).
- Answer with evidence a finding you hold wrong, instead of fixing it.
- Checks, each with command and exit code: `python -B .the-way/elements/common/foundation_check.py` (exit 0) and `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md` (no line inside D-243 and D-247). Do not run the product's gate.
- Commit on the task branch (`git add foundations/decisions.md`; English message `docs: :memo: …`); do not push.
- Report to `docs/task-cycles/martwe-odsylacze-origin/reports/fix-12-14-report.md` with the checks, the own-work check, **Unread material** (or `none`) and **Searches not found or unclear** (or `none`). Return: status, commits, one-line check result, report path.

## The findings (copied word for word from the reviewer)

## Important (blocking)

### I-1 — D-247: added text points to "the approved project definition" and carries a process condition (slice 13)

Place: D-247 *Rationale*, last sentence (added), and *Rejected* (old, kept).

- Entry, added: "A bound can be added later, when the game has matured and the approved project definition has to change for another reason."
- Entry, kept: "*Rejected:* a bound of 7 days with the rest lost — a change of the approved project definition, with its readiness gate and the plan checked again, and no task going ahead until they end; another number — the same cost."
- Note (`petla_zarobkowa_loop2.md`, Q7): „Granicę można dodać później, gdy gra dojrzeje i będzie zmieniać definicję z innego powodu.” Not chosen A: „zmiana zatwierdzonej definicji, czyli bramka gotowości i ponowne sprawdzenie planu; do ich końca żadne zadanie nie stanie się gotowe i nie ruszy żaden cykl.”
- Wrong: with *Origin* `none`, "the approved project definition", "its readiness gate" and "the plan" point to private documents no reader can open (WAY-27, which this task applies; To do 1). The condition "has to change for another reason" and the whole cost of way A are steps of the author's process, not something the product gains or pays. Earlier reviews of this cycle graded the same defect Important (review of slices 9–11, Important 3, D-187). This slice added a new instance in its own text.
- Why it matters: the reader of the entry cannot weigh the rejected bound, and the entry's last sentence sends them to a document they cannot see.
- Fix: keep "A bound can be added later, once the game has matured."; write the rejected ways as the game would have them, "a bound of 7 days, the rest lost; a bound of another number", and leave them without a reason, because the note gives only the process reason (the same fix as D-187).

### I-2 — D-243: the accepted cost describes a placement the foundation no longer has (slice 13)

Place: D-243 *Rationale*, added "Accepted with it".

- Entry, added: "Accepted with it: one more button in a long row of buttons, and one click more where the predecessor game stopped the earning loop when a character was sent."
- Note (`petla_zarobkowa_loop2.md`, Q1): „przy każdej mapie rozwiązanej, obok „Wyślij”, stoi przycisk „Puść w pętlę” … Słaby punkt nazwany w pytaniu: kolejny przycisk w długim wierszu.” The row was the character's row in Siedziba, with one „Wyślij” per solved map.
- Wrong: the binding sentence of D-243 puts „Puść w pętlę” "at each character in the section „Kto idzie” of the card of each solved map, beside „Wejdź”". At `f3194047` that place holds two sending buttons per character: `src/browser/view/maps-screen.tsx:243` ("its program and the two sending buttons (D-329)") draws „Wejdź" (`:321`) and „Puść w pętlę" (`:335`). Siedziba no longer holds sending buttons (`karty_i_katalog_map_loop2.md`, To do 8). So "a long row of buttons" is a present-tense cost true only of a layout `main` has since changed. This is the kind of defect the dispatch names. The executor saw the mismatch (slice-13 report, flag 4) and kept the cost "without naming the place". That still states it as true today.
- Fix: drop "one more button in a long row of buttons" and keep "one click more where the predecessor game stopped the earning loop when a character was sent". The *Rejected* way's "several times more to draw" stays, since it concerns the rejected section.

