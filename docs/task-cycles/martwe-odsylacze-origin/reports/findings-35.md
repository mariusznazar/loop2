# Findings of the review of slice 35 (blocking, in the reviewer's words)

Source: `reports/review-35-report.md`, first line `FAIL d07c5537`. Reviewed range `9d6316c3..d07c5537`.

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

