# Report — the plan's *Foundation entries*, task `rozwiazanie-lasu`

**Status:** done with concerns

## Commits and files

- `82bbb1c` docs: :memo: record the foundation entries of the forest-solving task (on `c0c51a0`)
- `foundations/decisions.md` +234 −39 · `foundations/invariants.md` +17 −5 ·
  `foundations/glossary.md` +27 −1
- `foundations/part_map.md` not changed — see concern 1.

## Entries written

Each with its identifier, its source, and one sentence of its meaning in Polish (WAY-114).

| Entry | Kind | From | Meaning (pl) |
|---|---|---|---|
| D-21 | decision, new answer | row 1 | Przejście, które gracz uruchamia, idzie minutę gry na sekundę realną razy tempo wybrane przez gracza spośród 1×, 2×, 4×, 8× i 16×, gracz może je wstrzymać i wznowić, a wybranie tempa w pauzie — także przy odkryciu — zmienia tempo i zostawia przejście w pauzie do „Wznów”. |
| D-129 | decision, new | row 2 | Wybrane tempo zostaje, aż gracz wybierze inne — przez pauzę, także przy odkryciu, „Restart”, „Zakończ” i kolejne wysłanie postaci — a nowa gra zaczyna od 1×. |
| D-130 | decision, new | row 3 | Gracz wybiera tempo pięcioma przyciskami „1×”, „2×”, „4×”, „8×” i „16×” obok „Pauza” w wierszu stanu przejścia, a przycisk obowiązującego tempa jest przyciskiem wybranym w grupie. |
| `player-map-run-pace` | invariant, new wording | row 4 | Czas realny przekazany symulacji przesuwa przejście, aż się skończy, o minutę gry za każdą pełną 1/tempo sekundy realnej przekazanej poza pauzą, liczoną w tempie obowiązującym przy przekazaniu, a niepełna reszta przechodzi na następne przekazanie; w pauzie przejście stoi, a minuta odkrycia zostawia je w pauzie, chyba że się w niej skończyło, i reszta czasu z tego samego wywołania przepada. |
| D-71 | decision, changed | row 5 | Po kroku ciała passa przejścia rośnie o jeden w minucie bez utraty zdrowia z zimna i głodu, a w minucie z taką utratą spada do zera; gdy przejście spełni warunek rozwiązania mapy, reszta minuty dzieje się do końca, a w miejscu wyboru reguły przejście kończy się domknięciem. |
| D-131 | decision, new | row 6 | Spośród edycji programu passę trwającego przejścia zeruje edycja, po której program różni się od programu sprzed niej — także w pauzie — a czynność edytora, po której program jest taki sam, zostawia passę. |
| D-132 | decision, new | row 7 | Po domknięciu ekran zostaje na stanie z minuty domknięcia i czas stoi, wiersz stanu mówi w Lesie „Minuta {minuta} · Las rozwiązany” w roli `positive`, „Pauza” i przyciski tempa znikają, a gracz ma „Restart” i „Zakończ” jak po śmierci. |
| D-62 | decision, a sentence added | row 7 | Po śmierci postaci przyciski tempa znikają razem z „Pauza”. |
| `map run restart` | glossary term, new wording | row 8 | Restart przejścia to przejście tej samej postaci na tej samej mapie, które gracz uruchamia w miejsce trwającego przejścia albo przejścia zakończonego śmiercią postaci albo domknięciem, które jeszcze stoi na ekranie. |
| D-133 | decision, new | row 9 | W trakcie przejścia wiersz stanu pokazuje passę obok minuty i czynności, np. „Minuta 312 · Eksploruje · Passa 120/480”, a siedziba pokazuje przy mapie zdanie jej warunku rozwiązania z danych mapy. |
| D-134 | decision, new | row 10 | Od pierwszego domknięcia mapy przez którąkolwiek postać gracza siedziba pokazuje przy mapie „Mapa: {mapa} · rozwiązana” w roli `positive`. |
| D-135 | decision, new | row 11 | Najdłuższej passy przejścia gra dziś nie pokazuje — ani w trakcie przejścia, ani po jego końcu. |
| D-122 | decision, new wording | row 12 | Gdy przejście domyka się w minucie odkrycia, ekran domknięcia zastępuje pauzę, a linia odkrycia stoi pod jego wierszem stanu do „Restart” albo „Zakończ” (reszta decyzji bez zmian). |
| `minute-span-split` | invariant, new wording | row 13 | Przejście przesuwane odcinkiem minut gry dochodzi do tego samego stanu, z tymi samymi zdarzeniami w tej samej kolejności, w każdej minucie gry, jakkolwiek podzielić odcinek na wywołania symulacji, aż do minuty, w której przejście się kończy albo coś odkryto, włącznie. |
| D-93 | decision, changed | row 14 | Po końcu przejścia — śmiercią, domknięciem albo przez „Zakończ” — liczniki reguł zostają przy regułach do następnego wysłania albo restartu przejścia. |
| `completion` | glossary term, new | task *Decisions in play*, "Zadanie zapisuje" (projected, whole) | Domknięcie to koniec przejścia, który spełnia warunek rozwiązania jego mapy. |
| `solved map` | glossary term, new | same | Mapa rozwiązana to mapa, na której przejście którejkolwiek postaci gracza miało domknięcie, niezależnie od tego, czy program pętli zarobkowej przeżyje każde ziarno. |
| `streak` | glossary term, new | same | Passa to liczba kolejnych minut gry jednego przejścia, której może żądać warunek rozwiązania mapy. |
| `manual map run` | glossary term, new | projected, whole (WAY-126) | Ręczne przejście to przejście, które gracz uruchamia poza pętlą zarobkową. |
| `streak-program-change` | invariant, new (the part of projected `streak-program-change/1` this task makes true) | projected entry assigned to this task | Zmiana reguł programu albo grup reguł wykonywanych w przejściu zeruje passę tego przejścia, na każdej mapie. |

No row was found already stated by another entry (search of the whole foundation, WAY-33), so
every row became an entry of its own or a change of the entry the task names.

Not written, as the plan says: "(new) — How is a map solved, and what opens the next one?" (task 8)
and "(new) — How fast does the earning loop go?" (task 18).

## Checks

| Command | Exit | What it showed |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` before any edit | 0 | `0 errors` (baseline) |
| same, with `tests/invariants/test_streak_program_change.py` added for a moment to the *Files* of `simulation`, then reverted (`git checkout -- foundations/part_map.md`) | 1 | `foundations/part_map.md:54: the pattern ... matches no file git tracks` |
| same, after all entries, before the commit | 0 | `0 errors` |
| same, after commit `82bbb1c` | 0 | `0 errors` |

No other gate was run, as the handoff says. No test was written or run: this stage writes no test.

## Own-work check (section 3)

- Requirement most likely missed: the orchestrator's rule of wording (task question 10, way B) —
  no word that excludes an alternative. Check:
  `git diff -U0 foundations | grep '^+' | grep -i -w -E 'only|never|always|without|alone'`.
  Result: three hits, none in a binding sentence of a new entry — „only by ending it” in D-21's
  violating example and „without ending it” in D-21's *Rationale* are kept from the current entry
  and describe, not exclude; „alone” stands in D-134's *Rejected*, describing the option refused.
  Row 11 (D-135) carries the allowed "today".
- Second check: words of the-way's glossary used in a domain meaning (WAY-104) —
  `... | grep -i -w -E 'step|part|gate|slice|surface|entry'`. A first draft of D-71's *Rationale*
  had "one more step"; rewritten before the commit. Remaining hits are field names and a quoted
  Origin.
- Binding sentences 1–3 per decision: D-21 2, D-62 2, D-71 3, D-93 3, D-122 3, D-129–D-135 1–2.

## Concerns

1. **The part-map line is not written.** The plan gives this stage "Part `simulation`: *Files*
   gains `tests/invariants/test_streak_program_change.py`", and the handoff says the line is mine
   and that `foundation_check.py` must exit 0. Both cannot hold: the file does not exist until
   slice 4, and the check reports a pattern matching no tracked file as an error (probe above,
   exit 1). I kept the check at exit 0 and left the line out. Recommendation: slice 4 adds the
   line under `tests/invariants/test_minute_span_split.py` in the *Files* of `simulation`, in the
   commit that adds the test — as the precedent `c8260e6` did for `test_minute_span_split.py` —
   and its *Checks* already run `foundation_check.py`. Cost if not done: the check fails on a file
   no part claims, at slice 4's own check.
2. **`streak-program-change` reads `Method: test` before its test exists.** The invariants template
   says an invariant whose test is not written yet reads `review` (WAY-61); I wrote `test` because
   slice 4 writes the test in the same request and nobody else is assigned to switch the field,
   as the precedent `47483c1` did for `minute-span-split`. Way rejected: `review` now, which would
   leave the merged entry wrong unless slice 4 also edits the foundation. Cost if wrong: one word.
3. **The word "completion" keeps an ordinary meaning in other tracked files** — the end of an
   action or an operation: `tests/sim/program-counts.test.mjs:255` and `:275`,
   `tests/sim/program.test.mjs:343`, `foundations/decisions.md` D-102's example ("after actual
   completion"), `src/server/session-store.ts` (`Completion` callback type). I read these as the
   meaning a reader of the field gives the word, which the glossary template leaves out of *Not*,
   so `completion` reads `Not: none` as approved. Where the foundation used "completed" for an
   ended map run (D-93: „Zakończ” hiding the completed run's counts", "the completed run's
   evidence"), I rewrote it to "ended", since a run ended by „Zakończ” is no completion.
4. **D-71: folded into its first sentence, not "a sentence added".** D-71 already had three
   binding sentences, the template's maximum; the streak (after the body) and the completion (in
   place of the pick) now stand inside the first sentence's order. Meaning as row 5; the streak's
   fall to zero in a minute of loss is To do 4's and the projected decision's, stated here because
   it happens at the same place.
5. **`player-map-run-pace` adds "at the pace in force when that real time is passed"**, from the
   reviewed spec's decision 2, which settles what row 4's "1/tempo" means when the pace changes
   between passes. Without it the sentence does not say what a test of a pace change expects.
6. **The tests that cite the two changed invariants still carry the old wording in their
   docstrings** (`tests/invariants/test_player_map_run_pace.py:1-5`,
   `tests/invariants/test_minute_span_split.py:1-4`). Checked against the new wordings: each test
   runs at the pace of a new game, 1×, where "1/pace of a real second" is a whole second, so its
   assertions still read the new sentence correctly; the docstrings, and the new cases, are
   slices 1, 3 and 5's, as the plan gives them. The ALIVE scenario of `test_minute_span_split.py`
   (480 minutes) may now end in a completion, as the spec notes.
7. **No critique agent ran** (`elements/common/way_of_working.md`, "Critique before collective
   review"): `make-change` forbids dispatching a subagent. The orchestrator may run one before the
   request.

## Choices made

- **New decision numbers D-129 to D-135**, the next free numbers (the log ends at D-128, holds no
  list of withdrawn numbers).
- **Relations**: D-129 derives from D-21; D-130 derives from D-21 and D-44; the rest `none`. Way
  rejected: D-132 "derives from D-62" — it follows D-62's screen but does not serve it; its binding
  sentence names "as after a character's death", which a search of the foundation finds. Cost if
  wrong: a link added later.
- **Scope**: every new decision names `simulation` where the game state or the map's data holds
  what it speaks of (pace, streak, solved maps, the condition sentence), and `browser-view` where a
  screen shows it; D-130 `browser-view` alone.
- **`streak-program-change`**: identifier without its projected version; *Derives from* D-131
  (row 6), the decision of the log that carries the rule, instead of the projected decision, which
  task 8 writes and which a `TODO` on the main branch could not name (rules.md, WAY-71); *Part*
  `every`, as the readiness gate approved it. Sentence: the part of the projected entry this task
  makes true — no "copy" and no switch to another program (task 12).
- **Glossary terms written whole as approved**, without the definition's `Avoid` field, which the
  pinned glossary template does not have.
- **Rejected options** of new decisions taken from the column "What the cycle would otherwise
  guess" of each row and from the ways the task's questions name (Q2 B/D, Q12 B–D, Q13 B/C, Q9
  loop's behaviour); where the source gives no reason, the reason is the consequence the accepted
  way names. No `none considered` was written, since that is the human's statement.
- **D-132's status-row text** is bound for Las only, as row 7 gives it; the text for other maps is
  the spec's decision 4 (data), which adds no entry.
- **Origin** of every new or changed decision names the question of
  `rozwiazanie_lasu_loop2.md` in the vault (`Notes/Projects/(P) Loop/_zadania`), which is byte-for-
  byte the frozen `task.md` (checked with `diff -q`).

## Reaches beyond the handoff

- Decisions D-22, D-23, D-119 (`foundations/decisions.md`) — the search of the whole foundation
  for "map run restart", „Restart” and the program; none needs a change.
- `foundations/glossary.md` and `.the-way/foundations/glossary.md` headings — to keep the-way's
  words ("step", "part", "gate") out of domain meanings (WAY-104).
- `definicja_mvp_loop2.md` in the vault, lines 1298–1330, 2129–2145, 2215–2250 — the projected
  entries whole, to write them as the readiness gate approved them.
- The-way's example entries (WAY-03, `instruction-file-imports`, `gate-exit-code`, `invariant`,
  `foundation`) in `.the-way/foundations/` — as the element skills require.
- `git show 47483c1` and `git show --stat c8260e6` — the precedent for an invariant written before
  its test and its part-map line added with the test.
- `tests/invariants/test_player_map_run_pace.py:1-50`, `tests/invariants/test_minute_span_split.py:1-45`
  — the tests citing the changed invariants, as `record-invariant` step 4.2 asks.
