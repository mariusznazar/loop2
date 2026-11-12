FAIL d07c5537

# Review of slice 35 — range 9d6316c3..d07c5537 (one commit, d07c5537)

Reviewed from `git show d07c5537:foundations/decisions.md` and `git diff 9d6316c3..d07c5537`, never from the
working tree (its HEAD had moved to a18acf22 by another agent, as the handoff warned). Compared against the
snapshot `the private snapshot of the notes (not committed)/` and against the earlier slices' carry. Note: the
earlier slices' versions of all fourteen older decisions, D-173 to D-216 included, are in `f72e08aa`;
`95a29574` holds main's text for them (it follows the merge `5dea4e7c`), not slice 9–11's carry, so
`f72e08aa` was the comparison for all fourteen.

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

### Minor

**M1 — D-62: "does not cover the whole screen" contradicts, in wording, the entry's binding sentence and
D-370.**
- Entry's words (added): "Accepted with it: the window hides the scene while it stands, and does not cover
  the whole screen as the end of loop does." Binding sentence of the same entry: "the end-of-run window
  D-368 gives opens of itself over the screen, its header included and the menu bar not". D-370
  *Rationale*: "The window covers the whole screen, so there is nothing to dim", and its accepted cost
  "the window does not cover the whole page as the end of the old Loop does".
- Note: `koniec_przejscia_loop2.md` Q9: „Koszt przyjęty: okno nie zasłania całego ekranu jak w starym Loop.”
- What is wrong: in this foundation "screen" is the screen of a map run (D-280's screens); the window
  covers it whole. The note's „ekran” means the page, as D-370 renders it. Write "does not cover the whole
  page, as the end of loop does". (Main's D-311 and D-368 hold the same wording — see O1, out of scope.)

**M2 — D-368: "in the minutes of the game that are hardest" reads as game minutes and drops the figure.**
- Entry's words: "a lost map run teaches only when the game says why it was lost — without it the player
  guesses, in the minutes of the game that are hardest —".
- Note: `rozpoznanie_weteran.md`, proposal 8: „przegrana niczego nie uczy, więc gracz zgaduje, a gra
  najtrudniejsza w minutach 5–30 jest wtedy najmniej pomocna.”
- What is wrong: the report means minutes 5 to 30 of a player's play, real time; "game minute" is a
  glossary term (the unit of the simulation's time), so a reader takes "the minutes of the game" as minutes
  of a map run. The figure 5–30 is lost. Suggest "in the first half hour of play, minutes 5 to 30, where
  the game is hardest".

**M3 — D-369: the accepted cost is written as a stance of the time, and clashes with D-147's rejected way.**
- Entry's words (added): "…and a save lost at a rise of the version was not counted as a cost when the
  choice was made."
- Note: `koniec_przejscia_loop2.md` Q6: „utratą zapisu przy podbiciu projekt na razie się nie przejmuje”.
- What is wrong: the clause tells how the choice was made (WAY-05) instead of the cost the product pays
  (saved games of the older version, the players' programs with them, are discarded, D-206), which D-135
  of the same slice states plainly ("which discards a saved game state of the older version (D-206)").
  Written as "not counted as a cost", it also reads against D-147's *Rejected* ("the version of the saved
  game would rise at once, and by D-206 the saved games that hold the players' programs would be
  discarded"), where the same loss is a reason. Suggest D-135's wording.

**M4 — Narrations of the time of the choice where a present statement says the same.**
- D-122 *Rejected*: "…the loss of the textual mark of the pause the game had when the choice was made."
  The earlier slice had "the game has today", which is still true: the binding sentence says the clock
  reads „Minuta {game minute} (pauza)”. Note `teraz_i_potem_loop2.md` Q5: „p1 — „ (pauza)” stoi za
  zegarem …; zostaje dzisiejszy tekstowy znak pauzy.” Restore "the game has".
- D-216 *Rationale*: "…so the practice of this map run is gone though the earlier wording said that
  practice stays." The reason (from `koniec_przejscia_loop2.md` Need 2) is right; the tail narrates the
  change, and the *Rejected* „wprawa i wykupione stopnie zostają” … "the player sees it gone and takes the
  game for a liar" already carries it. Drop the tail.
- D-368 *Rationale*: "Before the window the end of a manual map run was one line below „Teraz” and „Potem”
  in the world area, and the screen did not say …". Source `koniec_przejscia_loop2.md` Need 1. The content
  is a reason (what the window gives); write it in the present, e.g. "One line of the end does not say how
  near …", or leave it to the *Rejected* "one line above the terrain…".
- D-369 *Rationale*: "When the choice was made the game state held the counters …(D-93) … and held none of
  the three." Source `koniec_przejscia_loop2.md` Context („Liczniki „Wykonano {n}×” stoją w stanie gry …
  najdłuższej passy … stan przejścia dziś nie trzyma”). Present form: "The game state holds the counters
  (D-93) that the window reads for „Nie zadziałały ani razu”, so the record adds only the three."

**M5 — D-173 lost "it hides the screen" for the question in a window over the screen.**
- Entry's words (main's, kept): "the question in a window over the screen, or in the end-of-run window
  above its buttons — a second place of the question, far from the copy it concerns, to build and check
  with what D-324 gives while the question stands".
- Earlier slice (`f72e08aa`): "a window over the screen — it hides the screen, which the foundation avoided,
  and is a new kind of element to build and describe"; note `pytanie_przy_zakoncz_loop2.md` Q4 C: „Okno nad
  ekranem — zasłania ekran, czego fundament dotąd unikał …”.
- What is lost: "which the foundation avoided" and "a new kind of element" are no longer true (D-368 is a
  window), but "it hides the screen" — the copy the question asks about — still holds for a separate
  window and is gone. Add "it hides the screen, the copy included".

**M6 — D-122 lacks a cost the discovery note gives (carried over from the earlier slice).**
- Note: `odkrywanie_loop2.md` Q3: „Wspólne dla wszystkich dróg pytania: reszta czasu realnego przekazanego
  w chwili odkrycia przepada”.
- Entry: nothing in *Rationale* or *Rejected*; the behaviour stands only in invariant `player-map-run-pace`
  ("the real time passed in the same call beyond that game minute moving it on by no game minute"). The
  earlier slice missed it too. Add to the accepted costs: "the real time passed beyond the game minute of
  a discovery moves the map run by nothing".

**M7 — D-368 lost one of the two reasons the human gave for a window.**
- Note: `koniec_przejscia_loop2.md` Q1 Source: „a nie lepiej to zrobić jakimś modalem nad ekranem gry po
  prostu? no będzie zasłaniać, ale tam jest sporo informacji / … jakoś nie kupuję tego, żeby to miało
  wskoczyć gdzieś w jakieś miejsce w którym do tej pory było coś innego”.
- Entry carries the second reason ("A window over the screen puts the end where nothing that stood there
  before has to move") but not the first: the end holds much to read, so it takes a window and accepts
  hiding the screen. Add "the end holds much to read, which a window gives room for, at the cost of
  hiding the screen".

### Out of scope

- **O1 (Minor, main's text):** D-311 *Rationale* and D-368 *Rationale* (main's, unchanged by this slice)
  say "does not cover the whole screen as the end of loop does", against D-370's "covers the whole screen"
  / "does not cover the whole page". Same fix as M1, outside the slice's added text.
- **O2 (handoff):** the handoff names `95a29574` as holding D-173, D-185, D-212 and D-216 "after slice 9–10 /
  11"; at `95a29574` those entries equal main's (`4660e14a`). The earlier carry is in `f72e08aa`.

### Declined to judge

- main's own reasoning for D-27, D-40, D-43, D-47 (credits in Siedziba, map icons in `text-strong`, contrast
  3.27:1 against 4.39:1): its note (the calmer-look task) is not in the snapshot and no old *Origin* names it.
- The binding sentences, *Relations* and *Verification* of the range: unchanged (mechanical check below),
  outside this slice.

## Every decision of the range against its note passages (18 of 18)

| Decision | Passages compared | Result |
|---|---|---|
| D-27 | concept §7 "Grafika"; `mag_w_lesie_loop2.md` carried question on icons; definition D-27 | added sentence faithful ("footer" rightly dropped); nothing lost |
| D-40 | `styleguide_loop2.md` Q4, Q12, Q19 C; `teraz_i_potem_loop2.md` Q5; earlier carry `f72e08aa` | all of the earlier carry back; Q5 rejected "fill always green" stands in D-39 and D-133; nothing lost |
| D-43 | `edytor_programu_loop2.md` To do 15, Q5; `styleguide_loop2.md` Q15, Q19 D | Q5 gain and rejected B, C, D carried; obsolete accepted cost and rejected way rightly dropped |
| D-47 | `styleguide_loop2.md` Q21, Q22 | carried |
| D-53 | `koniec_przejscia_loop2.md` To do 8, Q3; `siedziba_i_druzyna_loop2.md` Q4; `ekrany_i_menu_loop2.md` Q6; `karty_i_katalog_map_loop2.md` To do 7; definition D-53 | Q3 B, C, D and cost carried; the rest task order or obsolete |
| D-62 | `koniec_przejscia_loop2.md` To do 1, Q1, Q9; `ognisko_i_jedzenie_loop2.md` Q10; `rozwiazanie_lasu_loop2.md` Q12; definition D-62 | carried; M1 |
| D-122 | `koniec_przejscia_loop2.md` Q5, Q12, Context; `rozwiazanie_lasu_loop2.md` Q15; `odkrywanie_loop2.md` Q3; `kronika_z_filtrami_loop2.md` Q9; `teraz_i_potem_loop2.md` Q5, Q12; definition D-122 | campfire estimate faithful to Q15; M4, M6 |
| D-132 | `koniec_przejscia_loop2.md` To do 4, 8, Q1, Q3, Q9; `rozwiazanie_lasu_loop2.md` Q6; `teraz_i_potem_loop2.md` Q9; definition D-132 | carried; past premise in *Rejected* accepted (executor's point 3) |
| D-135 | `koniec_przejscia_loop2.md` To do 5, 10, Q4, Q6, Context; `rozwiazanie_lasu_loop2.md` Q5; definition D-135 | carried |
| D-147 | `koniec_przejscia_loop2.md` Q8; `kronika_z_filtrami_loop2.md` Q1, Q5; `teraz_i_potem_loop2.md` Q8, Q14, Q15; `ekran_przejscia_loop2.md` Q4, Q7; definition D-147 | all of the earlier carry back; nothing lost |
| D-173 | `koniec_przejscia_loop2.md` To do 8, Q3, Q10; `pytanie_przy_zakoncz_loop2.md` Q4 (with its C) and Q8 costs; definition D-173 | M5 |
| D-185 | `koniec_przejscia_loop2.md` To do 3, 6; `plan_wyprawy_loop2.md` Q8, Q12; `ekran_przejscia_loop2.md` Q4; definition D-185 | I1 |
| D-212 | `koniec_przejscia_loop2.md` To do 2, 10, Q1, Q4; `zapis_stanu_na_serwerze_loop2.md` Q8 (Q15 in part) | carried |
| D-216 | `koniec_przejscia_loop2.md` Need 2, 3, To do 3, 6; `rozliczenie_przejsc_loop2.md` Q7; `rozpoznanie_nowy_gracz.md` proposal 9 | I1, M4 |
| D-368 | `koniec_przejscia_loop2.md` whole; `zakres_mvp2_loop2.md` row P5/NG10/W8; `rozpoznanie_projektant.md` B.2, proposal 5, table of problems; `rozpoznanie_weteran.md` proposal 8 and "Co tracimy"; `rozpoznanie_nowy_gracz.md` 9, 10; definition "(new) — What does the end of a map run explain?" | M2, M4, M7 |
| D-369 | `koniec_przejscia_loop2.md` To do 5, 7, 10, Q4, Q6, Q7, Context | M3, M4 |
| D-370 | `koniec_przejscia_loop2.md` To do 1, 2, Q1, Q9, carried questions | carried; no note gives width or height (executor's point agreed) |
| D-371 | `koniec_przejscia_loop2.md` To do 2, 8, Q1, Q10 | carried |

Executor's points: 1 — drop (I1). 2 — the pointer from D-62 to D-368 is a reference to a foundation entry,
which WAY-27 allows; keep. 3 — the "while the end had no place of its own" premises in D-132 and D-147 sit in
*Rejected* beside ways a reader could still propose (no „Teraz”, „Teraz” on the last action) and tell that
reader what has changed since, which is what *Rejected* is read for; keep. 4 — agreed: main's wording for the
calmer-look changes cannot be checked here (Declined to judge). 5 — agreed.

No invented reason found: every added clause traces to a passage named above or to the earlier carry.
Pointers and leaks: no note, task, question number, "the definition", "the task", disk place, host, account,
e-mail or personal fact in the eighteen entries (searches below). Shape: every *Origin* reads `none`.

## Checks run

| Check | Command | Exit / result |
|---|---|---|
| Head given vs worktree | `git rev-parse HEAD d07c5537 9d6316c3` | 0; worktree HEAD a18acf22 (moved by the other agent); reviewed d07c5537 as the handoff orders |
| Range | `git log --oneline 9d6316c3..d07c5537`; `git diff --stat …`; `git diff --word-diff=plain …` | 0; one commit, `foundations/decisions.md` only |
| Earlier versions | `git show <c>:foundations/decisions.md` for 4660e14a, 9d6316c3, d07c5537, f72e08aa, 95a29574, 01418389; entries extracted by a scratch script | 0; base = main = 95a29574 for the eighteen |
| Mechanical | scratch `cmp.py 9d6316c3 d07c5537` (per entry, the part before *Rationale* without *Origin*) | 0; 372 entries both sides, only the eighteen differ, none in its head part, every *Origin* `none` |
| No vault Origin | `git show d07c5537:foundations/decisions.md \| grep -c "in the vault"` | exit 1 (0 matches) |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` in a scratch tree of d07c5537 (`git archive d07c5537`, `.the-way` from e9a0f926, the gitlink of d07c5537, both indexed in a scratch git) | 0, "0 errors"; 458 files tracked, same count as `git ls-tree -r d07c5537` |
| Pointers in added text | grep of the eighteen entries for `.md`, task, definition, MVP, vault, `C:`, URL, `@`, note, Q-numbers, plan, refiner, human, names, "when the choice was made", "earlier wording", "then held", "Before the" | hits only in M4 and I1 places and in earlier or main wording; no pointer or leak |
| Glossary | `git show d07c5537:foundations/glossary.md \| grep -n -i "game minute"` | 0; "game minute" is an entry (M2) |

No test suite run: the change is text of the foundation only; the full suite is the cycle's run.

## Reach beyond the dispatch

- `git show d07c5537:foundations/glossary.md` ("game minute") — for M2.
- `git show d07c5537:foundations/invariants.md`, `player-map-run-pace` — for M6.
- D-311, D-39 and D-133 at d07c5537 (grep and the passages found) — for M1/O1 and the D-40 check.
- `.the-way/task-cycle/review/SKILL.md`, `.the-way/elements/decisions/template.md` whole; WAY-27 in
  `.the-way/foundations/decisions.md`.

## Unread material

- `.the-way/elements/common/rules.md`: lines 1–52 read; the rest (withdrawn identifiers, `{fork-point}`,
  no version) by heading only.
- Notes read only in part: `zapis_stanu_na_serwerze_loop2.md` (Q8 whole, Q15 in its first lines, Q23 and
  settlement row 8 not opened — relied on the earlier carry, all of it present at the head);
  `pytanie_przy_zakoncz_loop2.md` (Q4 with its ways and the Q4/Q8 costs; Q1–Q3 and rows not opened);
  `ognisko_i_jedzenie_loop2.md` (Q10 only); `odkrywanie_loop2.md` (Q3 only); `definicja_mvp2_loop2.md`
  (projected D-27, D-53, D-62, D-122, D-132, D-135, D-147, D-173, D-185 and the new end entry; projected
  D-212 and D-216 not opened); `koncepcja_projektowa.md` (§7 "Grafika" only; §5 "Postacie i drużyny" not
  opened).
- Notes named by old *Origin*s and not opened: `zadanie_hierarchia_przyciskow_i_karta_logowania.md` (To do 11,
  Q2c, Q3b), `stan_i_powod_przy_regule_loop2.md` (To do 1, 2, 8, 10, Q1, Q2), `scena_z_ludzikiem_loop2.md`
  (To do 6, 8, Q1, Q6, Q12, rows 1, 9), `petla_zarobkowa_loop2.md` (Q17, row 20), `programy_gracza_loop2.md`
  (Q9). For these I compared the earlier slices' carry (`f72e08aa`) with the head and found all of it kept;
  their passages themselves I did not reread.

## Searches not found or unclear

- The note behind main's changes to D-27, D-40, D-43, D-47 (credits in Siedziba, icons as masks): not in the
  snapshot (as the executor says).
- `95a29574` as the holder of the earlier carry of D-173 to D-216: not so; it equals main (O2).
- A reason for the width or height of the end-of-run window in any note: none (carried questions only).
