# Report 02 — the plan's Foundation entries

**Status:** done with concerns

## Files and commits

- `foundations/decisions.md` — +234 / −69
- `foundations/invariants.md` — +2 / −2
- Commit `bd44c39` on `task/teraz-i-potem` (base `381588f`): "docs: :memo: write D-334 to D-337 for Teraz, Potem, their click and the minutes of the needs, rewrite D-311 and D-133, carry Teraz into D-147, D-122, D-132 and rule-state-from-pick, and correct the entries that named the status row"

No other foundation file changed: no glossary term, environment fact or part-map entry was needed.

## Checks

| Command | Exit | Result |
|---|---|---|
| `git ls-files --stage -- .the-way` / `git -C .the-way rev-parse HEAD` | 0 / 0 | both `294af7fde45323ac1851c014a03071a97fc38d96` |
| `python -B .the-way/elements/common/foundation_check.py` (before any edit) | 0 | `0 errors` |
| `python -B .the-way/elements/common/foundation_check.py` (after all edits, before the commit) | 0 | `0 errors` |
| own-work check script (below), output in the scratchpad | 0 | every row's meaning present, every link both ways |

Not run: `npm test`, the product's full gate — the handoff and `change/SKILL.md` §3 leave it to the cycle; this change touches no code and no test. No test cites `rule-state-from-pick` (searched `.py`, `.mjs`, `.ts`, `.tsx` outside `.the-way`); its *Method* stays `review`.

## Own-work check

- Requirement most likely missed: that each row 1–8 is written **whole** (the foundation step's "each row of *Settlements to record* whole"), since rows 1, 4 and 8 share one entry and rows 5 and 6 went into D-133; and that `rule-state-from-pick`'s new *Derives from* is matched by `invariants: rule-state-from-pick` in each decision's *Verification* (the template's "each of them names the decision in *Derives from*"), which I could not confirm `foundation_check.py` enforces.
- Check: a Python script reading `foundations/decisions.md` that (a) for D-308, D-309, D-310, D-147, D-334, D-335 tests that *Verification* names `rule-state-from-pick`, and (b) for each row tests that the binding sentences of the entry holding it contain each element of the row (row 1: „Zbierz — Patyk”, „reguła 2.1 · zostało 3 z 5 min”, „Czeka — żadna reguła nie pasuje”, no progress bar, one height; row 2: „Potem”, „reguła 2.1”, the combat rule the turn would choose, „żadna reguła nie pasuje — postać stanie”, `warning`, stopped game minute; row 3: mouse or keyboard, once, middle, folded group, a row with no rule scrolls nothing; row 4: the three causes, `text`, „Minuta 312”; row 5: name, numbers and fill in `positive`; row 6: after the end, stopped minute, „Passa 0/480”; row 7: cells, smaller grey text, the four temperature notes and their order, the two satiety notes, rounding down, from minute zero, after the end, no note for health and energy; row 8: „Walczy z wilkiem” alone, no icon, number or minutes).
- Result: exit 0; all six *Verification* lines name the invariant; every row element present.
- Also checked: the binding wordings To do 6 gives (D-311, D-122, D-132, D-147, D-39, D-40, `rule-state-from-pick`, the examples of D-62, D-135, D-178, D-57) match word for word after whitespace normalisation — all `True`. `grep -n "status row" foundations/*.md` leaves one hit, D-216 *Rejected* (see Concerns).

## Entries written

Marks: `row <n>`, `projected`, `the cycle's` (foundation step); "whole / in part / corrected" as the handoff asks.

### D-334 — What does „Teraz” say on the screen of a map run? (new) — `row 1`, `row 4`, `row 8`; written whole

- EN: Under the scene, „Teraz” keeps one height and shows the action's icon and the action as its rule's row writes it, with „reguła 2.1 · zostało 3 z 5 min” and no progress bar, „Czeka — żadna reguła nie pasuje” while waiting, „Walczy z wilkiem” alone in combat, the completion text D-132 gives, and after a death its cause in `text` with the clock at the minute of death.
- PL: Pod sceną „Teraz” ma stałą wysokość i pokazuje ikonę i czynność tak jak w wierszu reguły, z „reguła 2.1 · zostało 3 z 5 min” i bez paska postępu, przy czekaniu „Czeka — żadna reguła nie pasuje”, w walce sam napis „Walczy z wilkiem”, po rozwiązaniu zdanie z D-132, a po śmierci jej przyczynę w `text`, z zegarem na minucie śmierci.
- *Rejected*: Q1 A and C, Q14 B, Q9 B and C, with their costs from the task. *Relations*, *Verification* examples and *Rationale* wording: the cycle's (from the rows' *What the cycle would otherwise guess* and the questions' answers).

### D-335 — What does „Potem” say on the screen of a map run? (new) — `row 2`; written whole

- EN: Under „Teraz”, „Potem” names the rule that wins now with its icon, action and number; in combat the combat rule the turn would choose; „żadna reguła nie pasuje — postać stanie” in `warning` when none wins; it is the state of this minute, and after the end it names the rule that wins at the stopped minute.
- PL: Pod „Teraz” wiersz „Potem” nazywa regułę, która wygrywa teraz, z ikoną, czynnością i numerem; w walce regułę walki, którą wybrałaby tura; gdy żadna nie wygrywa, „żadna reguła nie pasuje — postać stanie” w `warning`; to stan tej minuty, a po końcu nazywa regułę wygrywającą w zatrzymanej minucie.
- *Rejected*: Q2 B and C.

### D-336 — What does a click on „Teraz” or „Potem” do? (new) — `row 3`; written whole

- EN: Clicking „Teraz” or „Potem”, by mouse or keyboard, scrolls the program once to put its rule (or its folded group's header) in the middle, and a row naming no rule scrolls nothing.
- PL: Kliknięcie „Teraz” albo „Potem”, myszą albo klawiaturą, raz przewija program tak, że jego reguła (albo nagłówek zwiniętej grupy) staje na środku, a wiersz bez reguły niczego nie przewija.
- *Rejected*: Q3 B.

### D-337 — What does the body row show of how long each need lasts? (new) — `row 7`; written whole

- EN: The body row has a cell per value, and under temperature and satiety a smaller grey note — „marznie” (red), „przy ogniu”, „nie stygnie”, „bez ognia {n} min”; „głoduje” (red), „bez jedzenia {n} min” — with {n} whole minutes rounded down, from minute zero and after the end; health and energy have no note.
- PL: Wiersz ciała ma każdą wartość w komórce, a pod temperaturą i sytością drobniejszy szary dopisek — „marznie” (czerwone), „przy ogniu”, „nie stygnie”, „bez ognia {n} min”; „głoduje” (czerwone), „bez jedzenia {n} min” — z {n} w całych minutach w dół, od minuty zero i po końcu; zdrowie i energia bez dopisku.
- *Rejected*: Q6 A, C and D.

### D-133 — Where does the player see a map run's streak and a map's solving condition? — `projected` (whole), `row 5`, `row 6`; rewritten whole

- EN: The header shows a bar with numbers per requirement of the map's condition, a met requirement's name, numbers and fill stand in `positive`, the bar stays after the end at the stopped minute with the current streak, and each open map's card shows its condition sentence.
- PL: Nagłówek ma pasek z liczbami dla każdego wymagania warunku, spełnione wymaganie ma nazwę, liczby i wypełnienie w `positive`, pasek zostaje po końcu na zatrzymanej minucie z bieżącą passą, a karta mapy ma zdanie warunku.
- Binding sentences: the projected two, word for word, with rows 5 and 6 as a sentence between them. The projected wording drops the Las — głębiej example of the card sentence; I moved that example into *Verification* (the cycle's). *Rejected*: the projected two plus Q5 part 1 b and part 2 y (the latter with the cost the task names "do *Rejected* wpisu"). *Verification*: the cycle's.

### D-311 — How is the screen of a map run laid out? — `projected`, in part; binding wording of To do 6

- EN: The world holds the scene, „Teraz” and „Potem”, the encounter paragraph, the end line, the body row with each need's minutes and the rest; the header holds name, map, clock, the bar of the solving condition with numbers, „Pauza”/„Wznów”, pace, „Restart”, the warning and „Zakończ”.
- PL: Świat ma scenę, „Teraz” i „Potem”, akapit starcia, linię końca, wiersz ciała z minutami potrzeb i resztę; nagłówek ma imię, mapę, zegar, pasek warunku z liczbami, „Pauza”/„Wznów”, tempo, „Restart”, ostrzeżenie i „Zakończ”.
- *Rejected* loses the clause To do 6 names, and gains Q10 B and Q13 B with their costs. *Rationale* gains the projected sentence on needs and goal, the reasons of Q10 and Q13 and their accepted costs. *Verification* examples rewritten for the header without the status row: the cycle's. *Origin* gains the task note.

### `rule-state-from-pick` (invariant) — `projected`, corrected to the wording of To do 6

- EN: Rule backgrounds, bars, reasons and what „Teraz” and „Potem” name come from the simulation's rule-picking function, except „Walczy z wilkiem” in combat, the death cause and the completion text in „Teraz”, as D-147 gives.
- PL: Tło, pasek i powód przy regule oraz to, co nazywają „Teraz” i „Potem”, liczy funkcja symulacji wybierająca regułę, poza „Walczy z wilkiem” w walce, przyczyną śmierci i zdaniem rozwiązania w „Teraz”, jak każe D-147.
- Wording on `{fork-point}`: "The background, the bar and the reason a program rule or rule group shows come from the function of the simulation that picks the rule a character carries out." No test cites it. *Method* stays `review`; *Part* unchanged. *Derives from* gains D-147 · D-334 · D-335 (the cycle's), and D-147 *Verification* gains `invariants: rule-state-from-pick.`

### D-147 — What record of an encounter does the player read? — `projected`, in part

- EN: „Teraz” reads „Walczy z wilkiem” through the combat minutes, the resolution minute included, death or completion taking precedence and a combat death reading „Mag zginął w walce”.
- PL: „Teraz” mówi „Walczy z wilkiem” przez minuty walki, także w minucie rozstrzygnięcia, przy pierwszeństwie śmierci i rozwiązania, a śmierć w walce to „Mag zginął w walce”.
- Only the last sentence changed; the rest of the entry is unchanged. *Origin* gains the definition and the task note.

### D-122 — discovery — `projected`, in part (transitional sentence of To do 6); examples corrected

- EN: At a discovery the map run pauses as after „Pauza”, the header's clock reading „Minuta {game minute} (pauza)”, and the player goes on with „Wznów”.
- PL: Przy odkryciu przejście staje jak po „Pauza”, zegar w nagłówku mówi „Minuta {minuta gry} (pauza)”, a gracz idzie dalej „Wznów”.
- The two *Verification* examples To do 6 gives are written as given. The violating example "the band standing under the status row in the world area" became "the band standing in the world area": the cycle's.

### D-132 — after a completion — `projected`, in part (transitional sentence of To do 6); example corrected

- EN: After a completion „Teraz” reads the map's completion text in `positive` and the header's clock stands at the completion minute, with „Pauza” and pace gone and „Restart” and „Zakończ” left.
- PL: Po rozwiązaniu „Teraz” mówi zdanie rozwiązania mapy w `positive`, zegar w nagłówku stoi na minucie rozwiązania, „Pauza” i tempo znikają, zostają „Restart” i „Zakończ”.
- The complying example („Teraz” „Las rozwiązany” and the clock „Minuta 480”): the cycle's.

### D-39 and D-40 — `projected` (the sentences To do 6 adds)

- D-39 EN: `positive` also fills the bar of a met requirement in the header, on a `highlight` track, at 3:1 contrast. PL: `positive` wypełnia też pasek spełnionego wymagania w nagłówku, na torze `highlight`, z kontrastem 3:1.
- D-40 EN: That bar's track is `highlight` and, while unmet, its fill is `text`, though it is no text. PL: Tor tego paska to `highlight`, a wypełnienie niespełnionego wymagania to `text`, choć to nie tekst.
- One example pair and one *Rationale* sentence in each: the cycle's.

### Examples and references corrected — `the cycle's` (To do 6, last bullet and the plan's answer „wszystkie, każdy w zadaniu, którego zmiana go unieważnia”)

- D-62: complying example as To do 6 gives. EN/PL: after a death of cold „Teraz” reads „Mag zamarzł” and the clock „Minuta 312” / po śmierci z zimna „Teraz” mówi „Mag zamarzł”, a zegar „Minuta 312”.
- D-135: complying example as To do 6 gives; *Rationale* "the one the status row shows" → "the one the bar of the solving condition in the header shows" (a reach beyond the plan list, under the same answer, which covers "uzasadnienia"). EN/PL: the screen after death shows the current streak, never the longest / ekran po śmierci pokazuje bieżącą passę, nigdy najdłuższej.
- D-178: complying example as To do 6 gives (cells with notes „bez ognia 79 min” and „bez jedzenia 86 min”). I checked the numbers myself: (36.9 − 35) / 0.024 = 79.2 → 79; (82 − 30) / 0.6 = 86.7 → 86.
- D-57: "the cell of temperature of the body row reading „Temperatura 36,8 °C”".
- D-46: "the clock of the map run in the header of the screen of a map run set in Geist Mono".
- D-324: "the clock in the header ending in „ (pauza)”".
- D-280: binding "as the status row writes it" → "as the clock in the header of that screen writes it"; *Rationale* "as the status row does" → "as the clock in the header of the screen of the map run does". The meaning stays the same: the same game minute in the same notation ("minuta 212" / „Minuta 212”), and only the place that writes it is renamed, as the orchestrator ruled.
- D-291: its list of places extended with "in the rows „Teraz” and „Potem” under the scene", plus a complying example and the task note in *Origin*. Extending it rather than only linking it: the binding sentence lists where the one icon stands, and an agent reading it alone would otherwise not know the rule binds „Teraz” and „Potem”. D-334 and D-335 derive from D-291.

## Choices made, with the way rejected and its cost if wrong

- **Rows 1, 4 and 8 in one new decision (D-334), not row 4 in D-62.** Rejected: row 4 as a sentence of D-62, which would mirror D-132. Cost if wrong: one decision holds both the death case and the ordinary cases. Reason: D-62's projected wording, which task 16 writes, says nothing of „Teraz”, so a sentence there would be lost then.
- **D-334 points to D-147 for the combat words and to D-132 for the completion text instead of restating them.** Rejected: moving those sentences into D-334 ("Changing a decision"), which would go against the wordings To do 6 binds for D-147 and D-132. Cost: see Concerns.
- **Rows 5 and 6 in D-133, not a new decision.** D-133 answers where the bar stands and what it shows. Rejected: a new decision "How does the bar show a met requirement?". Cost if wrong: D-133 has three binding sentences.
- **Row 3 as its own decision (D-336)**, deriving from D-334 and D-335. Rejected: joining it to D-334 or D-335, which would answer two questions in one entry.
- **„nie stygnie” is "on a map that does not cool the body"**, read from loop at `cdc7c0d` (`minutesToChill` returns null where `coolingRateOn(map) <= 0`). Rejected: D-333's "does not cool the body below the threshold of chill". The two differ only for an ambient temperature between 35 and 37 °C. With D-58's constant per-minute cooling, such a map still chills the body in the end, so there the note reads „bez ognia {n} min”.
- **Row 7's red and grey are written as "red" and "smaller grey text", with no role**, as the orchestrator ruled; slice 1 sets the roles in the styleguide.
- **Scope `browser-view · simulation`** for D-334, D-335 and D-337, since slices 2 and 3 change `src/browser/sim/**`; `browser-view` alone for D-336.

## Reaches beyond the handoff

- `the old Loop repository`, commit `cdc7c0d`: `src/components/probe/RunWorld.tsx:405-430` and `src/sim/data/maps.ts:380-404`, read to settle what „nie stygnie” („na mapie, która nie wychładza”) covers in row 7.
- `definicja_mvp2_loop2.md`, the projected D-62 (lines 554–568), read to decide where row 4 goes.
- Decisions the search of the foundation found and read whole: D-292 (its *Rationale* already names „reguła 2.1” beside „Teraz”; it is consistent, unchanged); D-244 (it narrows D-133; still compatible, unchanged); D-148 and D-322 (derive from D-147 and D-132; unaffected); D-216 (see Concerns); D-58 (cooling, for the „nie stygnie” reading).
- The plan's slice *Change* lines (`plan.md` lines 104, 153, 251, 315), read to choose the *Scope* of the new decisions.
- the-way's own `foundations/decisions.md` WAY-03 and `foundations/invariants.md` `return-step-record`, read as the elements' examples (the skills' step 1).

## Concerns

1. **D-334's pointer to D-132 is only as stable as D-132's transitional sentence.** The definition's projected D-132 (task 18) and D-62 (task 16) do not mention „Teraz”. When task 18 writes D-132 whole, "the completion text D-132 gives" in D-334 loses what it points to. The task's question 9 says the completion text stays in „Teraz” after task 16. Recommendation: tasks 16 and 18 move the completion text into D-334 when they write D-132.
2. **D-216 *Rejected* still reads "the same in the status row — a very long row and a change of its accepted wording".** It records an option weighed at the time, so I left it. Changing it would change what the entry says was weighed.
3. **D-122 *Rejected* does not gain Q5 part 3's ways p2 and p3.** The task records no cost for either, and D-122's part here is transitional until task 16, whose projected wording drops „ (pauza)”.
4. **The *Verification* examples and *Rationale* sentences of D-334–D-337, D-133, D-311, D-39 and D-40 are mine.** I wrote them from the questions' answers, costs and the rows' last column. The human sees them only at the merge.

## Questions

none

## Searches not found or unclear

- Whether `foundation_check.py` checks that an invariant's *Derives from* and its decisions' *Verification* name each other: not confirmed. I checked it myself instead (own-work check).
- "from the keyboard" in row 3 does not say which key. D-336's example uses Enter on a row reached with Tab. Its binding sentence says only "from the keyboard".
- `way_of_working.md` step 4.2 ("show the whole entry … to the human") has no human in the cycle. The meaning sentences above stand in for it, as `foundation_step.md` gives.
