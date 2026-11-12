# Handoff — the fix of a review's findings (`make-change`, "the fix of a review's findings")

The human who asked for this cycle delegated intermediate choices to the orchestrator; you ask the human nothing. Questions go to the orchestrator in your report (status `questions`).

- Worktree (work from its root): `the repository root`, branch `task/martwe-odsylacze-origin`. Base of your fix: `git rev-parse HEAD` when you start (write it in your report); the worktree must be clean.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole, and the file it names for a fix when the variant comes.
- What you fix: the blocking finding (I1) of `docs/task-cycles/martwe-odsylacze-origin/reports/findings-35.md` (copied from `reports/review-35-report.md`, `FAIL d07c5537`; copied at the end of this handoff). It concerns D-185 and D-216.
  Check each against the code, the foundation and the notes (the notes are in the snapshot `the private snapshot of the notes (not committed)/vault/`) before you fix it; where a sentence is about the state of the product today, write only what you verified at the head or date it as the premise of the choice.
  Minor findings of that review are not yours to fix (they go to the request's list).
- Touch only D-185 and D-216 (*Rationale*, *Rejected*, *Origin* lines and their continuation lines); the part before *Rationale* stays as it is — "Through the project skill `the-way-record-decision`" means doing the skill's steps (its `read.md` reading, deciding what the entry is, drafting, writing — an edit with your editor tool, not a script — and the check); say in the report which steps you did.
- Nothing an entry gains names a note, a task, a question number or a decision number of the concept, a path on a disk or a copy of a task document; do not write "the MVP", "the definition", "the scope of the project" or "the concept of the game" as an authority, "the task" or "the change" as a reason. A reason a note does not give is not added.
  Never open, commit, stash or check out anything in the vault `the author's notes` or in `the local clone of the old game's repository`.
- Answer with evidence a finding you hold wrong, instead of fixing it.
- Checks, each with command and exit code: `python -B .the-way/elements/common/foundation_check.py` (exit 0) and `git grep -nIE 'in the vault|_loop2\.md|koncepcja_|rozpoznanie_|technologia_|zadanie_|Notes/Projects|_zadania' -- foundations/decisions.md` (no line inside the two decisions). Do not run the product's gate.
- Commit on the task branch (`git add foundations/decisions.md`; English message `docs: :memo: …`); do not push.
- Report to `docs/task-cycles/martwe-odsylacze-origin/reports/fix-35-report.md` with the checks, the own-work check, **Unread material** (or `none`) and **Searches not found or unclear** (or `none`). Return: status, commits, one-line check result, report path.

## The findings (copied word for word from the reviewer)
## Findings

### Important (blocking, within the task)

**I1 — D-185 and D-216 carry the reasoning of a placement the decision no longer has, as a narrative of
the change, in an area the screen no longer has.**

- Place: D-185 *Rationale*, second sentence, and two clauses of its *Rejected*; D-216 *Rationale*, the
  sentence beginning "Before the end had a window".
- Entry's words:
  - D-185 *Rationale*: "Before the end had a window of its own the line stood in the world area, between the
    scene and the body row, since the right area did not take over the end of a map run: the paragraph of
    the last encounter had moved from under the scene into the chronicle (D-147), and the line stood below
    the discovery line and that paragraph where they stood, so after a completion in the game minute of a
    discovery or after a fight it stood one row, or a long paragraph, lower than the status row „…
    rozwiązany”."
  - D-185 *Rejected*: "…and the discovery line and the paragraph of the last encounter, which then stood
    below the status row, would have gone lower; placing it under the backpack, in the place of the line
    „Wyniesie” — it changed the placement accepted below the status row;"
  - D-216 *Rationale*: "Before the end had a window of its own the lines stood in the world area, where the
    line „Do skrzynki: …” stood (D-185), since the right area did not take over the end of a map run."
- Note passages: `plan_wyprawy_loop2.md` Q12: „Słaby punkt nazwany w pytaniu: po domknięciu w minucie
  odkrycia albo po walce linia stoi o jeden wiersz albo długi akapit niżej od wiersza stanu „… rozwiązany”.
  Odrzucone: B — tuż pod wierszem stanu, nad linią odkrycia (linia odkrycia i akapit spotkania schodzą
  niżej, zmienia się wygląd, który ustaliły D-122 i D-147); C — w miejscu linii „Wyniesie”, pod plecakiem
  (zmieniałoby „pod wierszem stanu” z odpowiedzi na Q8).”; `ekran_przejscia_loop2.md` Q4: „W obszarze
  świata, między kadrem a wierszem ciała; prawy obszar nie przejmuje końca przed zadaniem 16.”; and the
  note that replaced that placement, `koniec_przejscia_loop2.md` To do 3: „Linie „Do skrzynki: …” i zdanie o
  wskrzeszeniu schodzą z obszaru świata do okna końca przejścia”.
- What is wrong: the passages are the reasons for the world-area placement, which the current binding
  sentences (the line in the section of the end-of-run window saying what the end gave / cost) replaced.
  They are no reason for the current decision; the sentences tell the road ("Before the end had a window
  of its own…", "which then stood…", "it changed the placement accepted below the status row"). The
  template says *Rationale* and *Rejected* "describe the decision as it then stands, never the change"
  (WAY-07, WAY-19) and "do not tell how the decision was reached" (WAY-05, WAY-29). The sentences also
  speak of "the right area" and "the status row", parts of a layout that main has changed (D-311 at the
  head: two columns, no right area; the header holds the clock), which is one of the defect kinds the
  handoff lists. The rejected "under the backpack" has lost its object exactly as the D-43 rejected way
  the executor dropped ("colouring every icon from a token") lost its: its only reason is a placement
  that no longer stands. Task To do 1 asks for the reasoning a note carries *for that decision*; a reason
  for a superseded binding sentence is not one, and the executor dropped the "ahead of its time" reasons
  of the same passages on that ground.
- Fix: delete the D-185 *Rationale* sentence quoted, the clause "and the discovery line … would have gone
  lower" and the rejected "placing it under the backpack … below the status row"; delete the D-216
  sentence quoted. Main's "a line directly under the status row — a win opens with what did not come"
  and D-216's "the same in the status row, which the header then held — …" can stay (the second is the
  earlier slices' carry of `rozliczenie_przejsc_loop2.md` Q7 B and still names an option a reader could
  propose, the header).
- Executor's question 1 (keep or drop): I hold drop, for the reasons above.

