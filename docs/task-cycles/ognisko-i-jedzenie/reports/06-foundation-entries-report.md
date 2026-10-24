# Report — foundation entries F1–F20, cycle `ognisko-i-jedzenie`

- **Status:** `done with concerns` (concerns: section "Concerns for the orchestrator")
- **Branch:** `task/ognisko-i-jedzenie`, base a945cf1d4c62e8cdac222a7de47277c08a77b2c5
- **Commits:** `47483c1` (all entries), `3789fa4` (wording: the process words "action" and "part"
  qualified or avoided in D-51, D-54, D-56, D-58)

## Files changed (against the base)

| File | Added | Removed |
|---|---|---|
| `foundations/decisions.md` | 265 | 15 |
| `foundations/glossary.md` | 3 | 2 |
| `foundations/invariants.md` | 10 | 0 |

No code, test, data, part map or environment fact changed; none of F21–F24 written.

## Entries written

| Plan row | Entry | Kind |
|---|---|---|
| F1 | D-50 — In what unit does a character's warmth stand? | decision (new) |
| F2 | D-51 — What cools a character's body? | decision (new) |
| F3 | D-52 — How far do warming and eating raise a character's warmth and satiety? | decision (new) |
| F4 | D-53 — When does a character lose and regain health? | decision (new) |
| F5 | D-54 — When does a character die, and of what? | decision (new) |
| F6 | D-55 — What does the screen show, and what can the player do, after a character's death? | decision (new) |
| F7 | glossary `map run restart` | glossary term (changed) |
| F8 | D-56 — How does a character light a campfire or a stick? | decision (new) |
| F9 | D-57 — What does the backpack's cap count, and what sets its height? | decision (new) |
| F10 | D-58 — What does a full backpack do to gathering? | decision (new) |
| F11 | D-59 — What does a missed gathering do? | decision (new) |
| F12 | D-60 — How does a tile's stock renew? | decision (new) |
| F13 | D-61 — What becomes of a campfire that burns out? | decision (new) |
| F14 | D-62 — How much does feeding add to a burning campfire? | decision (new) |
| F15 | D-63 — How does the browser view show a campfire? | decision (new) |
| F16 | D-25 — How does a character move? (gathering clause added) | decision (changed) |
| F17 | D-26 — How does a program point at things of the world? (campfire sentence added) | decision (changed) |
| F18 | D-64 — In what order does a game minute of a map run take effect? | decision (new) |
| F19 | invariant `minute-span-split` | invariant (new) |
| F20 | D-65 — Where does a character craft a campfire and light a stick? | decision (new) |

No row's settlement was already stated in the foundation (search below), so no row was tied to an
existing entry instead of a new one.

## Meaning of each entry, in Polish (for the request)

- **D-50 (F1):** W MVP ciepło postaci jest temperaturą jej ciała w stopniach Celsjusza, liczoną z dziesiątymi.
- **D-51 (F2):** W MVP ciało postaci stygnie w każdej minucie gry tym mocniej, im niżej poniżej startowej temperatury ciała leży temperatura otoczenia mapy, a temperatura otoczenia stoi w danych mapy.
- **D-52 (F3):** W MVP grzanie podnosi temperaturę ciała postaci najwyżej do temperatury startowej, a jedzenie podnosi sytość najwyżej do sytości startowej.
- **D-53 (F4):** W MVP postać traci zdrowie w każdej minucie gry, w której jest wychłodzona, i osobno w każdej, w której głoduje, a w minucie, w której nie jest ani jednym, ani drugim, zdrowie wraca samo, najwyżej do pełni.
- **D-54 (F5):** W MVP postać ginie w tej minucie gry, w której jej zdrowie dochodzi do zera, także w trakcie trwającej akcji, a przejście kończy się wtedy śmiercią z przyczyną: zimno, gdy ciało jest w tej minucie wychłodzone, inaczej głód.
- **D-55 (F6):** W MVP po śmierci postaci ekran zostaje na stanie z minuty śmierci, czas stoi, a gracz ma „Restart” z tym samym ziarnem od minuty zero i „Zakończ”, które wraca do ekranu, z którego wysyła postać.
- **`map run restart` (F7):** W MVP restart przejścia to przejście tej samej postaci na tej samej mapie, które gracz uruchamia w miejsce przejścia w toku albo przejścia zakończonego śmiercią postaci, które stoi jeszcze na ekranie.
- **D-56 (F8):** W MVP postać zapala ognisko i patyk zwykłą akcją „Zapal”, której ceną są zużywane patyki, dopóki zadanie 9 planu MVP (plomyk) nie zrobi z zapalania czaru Płomyk płaconego energią natury.
- **D-57 (F9):** W MVP pułap plecaka liczy razem sztuki wszystkich przedmiotów, a jego wysokością jest udźwig postaci.
- **D-58 (F10):** W MVP postać zbiera, dopóki plecak mieści mniej sztuk niż jego pułap; przy pełnym plecaku program pomija regułę zbierania i wybiera dalszą, jak przy każdej niewykonalnej akcji.
- **D-59 (F11):** W MVP zbiór może chybić, a chybiony zbiór zostawia zapas kafelka nietknięty i nie wkłada sztuki do plecaka.
- **D-60 (F12):** W MVP kafelek, który ma mniej sztuk zasobu niż zapas startowy, odzyskuje jedną sztukę za każdym upływem czasu odnowienia z danych mapy, najwyżej do zapasu startowego.
- **D-61 (F13):** W MVP ognisko, które się wypaliło, zostaje na swoim kafelku jako wygasłe i da się je zapalić ponownie.
- **D-62 (F14):** W MVP każde zasilenie płonącego ogniska dokłada jego minuty palenia do tych, które ognisku zostały, ile by ich było.
- **D-63 (F15):** W MVP ognisko ma na rysunku mapy ikonę na swoim kafelku, a jego stan — płonie i ile minut zostało albo wygasło — stoi w wierszu kafelka w liście odsłoniętych kafelków.
- **D-25 (F16):** Do decyzji o ruchu dochodzi: zbiera się tylko z kafelka odsłoniętego, najwyżej tyle, ile na nim leży.
- **D-26 (F17):** Do decyzji o wskazywaniu rzeczy świata dochodzi: kafelek mieści najwyżej jedno ognisko, które grzeje tylko na nim.
- **D-64 (F18):** W MVP minuta gry przejścia działa w kolejności: najpierw ciało postaci (stygnięcie i grzanie, spadek sytości, utrata albo powrót zdrowia), potem — gdy zdrowie doszło do zera — śmierć w tej minucie i koniec przejścia; inaczej to, co płonie, traci minutę palenia, kafelki odnawiają zapas, akcja kończąca się w tej minucie daje skutek, a program wybiera regułę ze stanu, który ta minuta zrobiła.
- **`minute-span-split` (F19):** Przejście posuwane o odcinek minut gry dochodzi do tego samego stanu gry, z tymi samymi zdarzeniami w tej samej kolejności, w każdej minucie gry, jakkolwiek odcinek podzielić na wywołania symulacji, aż do śmierci postaci włącznie.
- **D-65 (F20):** W MVP postać wytwarza ognisko i zapala patyk na kafelku odsłoniętym, tak jak zbiera; na kafelku jeszcze nieodsłoniętym program pomija regułę, która wytwarza ognisko albo zapala patyk.

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (base, before the entries) | 0 | 0 errors |
| `python -B .the-way/elements/common/foundation_check.py` (after `47483c1`'s entries) | 0 | 0 errors |
| positive control: D-64 *Verification* changed for a moment to `minute-span-splitx`, check run, file restored | 1 | `foundations/decisions.md:1176: \`minute-span-splitx\` names no invariant` — the check reads the new entries |
| `python -B .the-way/elements/common/foundation_check.py` (after `3789fa4`) | 0 | 0 errors |
| scripted scan of the binding sentences of D-50–D-65 for "In the MVP" at the start and for only/never/always/without/alone/nothing/cannot | — | every one opens with "In the MVP"; no such word in any |
| scan of the added lines for bare process words of the-way's glossary (step, part, check, gate, slice, entry, element, surface, flow, debt, interface, action) | — | four bare uses found in prose and fixed in `3789fa4`; remaining hits are "action of the character" / "the character's action" and the field name *Part* |

Not run: `npm test` and the full suite — the cycle's run before the request (make-change § 3); no
code changed.

### F19 before its test file

`foundation_check.py` gives **no error** for `minute-span-split` reading `Method: test` with no test
citing it: the script checks identifiers, references, fields and the part map's files, and does not
look for a citing test (its docstring, lines 11–50). How the element's rules treat a test written
later in the same change:

- `.the-way/elements/invariants/skill/SKILL.md`, § 4: "Where *Method* reads `test`, the test is
  written in the change that brings the entry and seen failing once" — the change is the whole
  request, so a test written in Slice 13 of the same request keeps this rule.
- `.the-way/elements/invariants/template.md`, § Method and test: "An invariant whose test is not
  written yet reads `review` (WAY-61)." Read on each commit, this is not met between this commit and
  Slice 13. I wrote `test`, as the plan's F19 row and the spec give it; see concern 1.
- F24 (the part map claiming `tests/invariants/test_minute_span_split.py`) waits for Slice 13, as
  the plan gives: a *Files* pattern naming an untracked file would fail the check now.

## Own-work check

- Requirement most likely missed: the human's rule for candidates built from MVP choices (opens
  with "In the MVP", holds no word that excludes an alternative) across 16 binding sentences and the
  glossary definition. Check: the scripted scan above. Result: met in every binding sentence; the
  glossary definition opens with "In the MVP" too. The scan also found "never" and "without" in two
  prose fields (D-53 *Rationale*, D-64 *Rejected*); I reworded them before the first commit.
- Second: the-way's glossary words used bare in a domain sense (WAY-104). Check: the scan above;
  four fixes in `3789fa4`.

## Search of the whole foundation (WAY-33) — what it found

- No entry states any row's settlement already. Nearest: D-24 already holds "time to renew one
  piece" in a game map's data (D-60 adds one piece per that time and the upper bound, and derives
  from D-24); D-24's list of a game map's data does not name an ambient temperature and does not rule
  it out (D-51 derives from D-24; task 8 writes the projected "What is a map made of?").
- D-19 (numbers of stock in the list, never on the drawing): D-63 keeps to it and derives from it.
- D-41 (`tile-hidden`, `tile-revealed`, `depleted`): D-65 keeps their meanings; its *Rejected* names
  `tile-hidden`.
- D-44 („Zakończ”, „Restart” destructive buttons): D-55 agrees.
- D-20 / invariant `action-in-progress`: D-54's death during an action. D-20 names a change of the
  program and another rule's condition as what does not interrupt an action; death is neither, so
  no collision with D-20. `action-in-progress` ("lasts its full duration, even where …") is read by
  the task (*Context*) as holding within a map run in progress; I followed that reading and wrote
  it into D-54's *Rationale*. See concern 3.
- D-21 / `player-map-run-pace` and D-22's list of kinds of draw: left to the return step, as the
  spec says; not changed.
- D-23 *Verification* example "the whole number it takes": not changed; D-50's *Verification* gives
  the tenths example (35.5) instead of adding a second example to D-23.
- `map-run-repeatability` is the nearest invariant to `minute-span-split`; it compares two
  simulations with the same inputs, the new one compares splits of one span, so a new identifier.
- Step 4.4 for the changed D-25 and D-26: decisions deriving from them — D-65 (new) from D-25;
  none from D-26. Invariants whose *Derives from* names them — `exploring-reveal`, `move-reach`
  (D-25); `walk-target`, `walk-feasibility`, `program-world-reference` (D-26): each read against the
  added sentence; none changes, since the additions bind gathering and campfires, not what those
  sentences say about exploring, moves and walking to resources.
- Glossary step 4.4 for `map run restart`: uses in tracked files (multi-line search) —
  `foundations/decisions.md:87, 443, 469, 475`, `foundations/invariants.md:293`,
  `tests/invariants/test_map_run_layout.py:17`, `tests/invariants/test_restart_seed.py:1`. The
  widened definition keeps each use true; no use's meaning moves, so none was rewritten.

## Reaches beyond the dispatch

- `definicja_mvp_loop2.md` in the vault, lines 1203–1263 (the projected entries "How does a
  character move?" and "How does a program point at things of the world?"), to keep D-25 and D-26
  whole: the task quotes only their binding sentences. Taken from there into D-26: the complying
  example "Go — campfire", the violating examples "campfire 2" and "a second campfire made on a tile
  that has one", the *Rationale* sentences on campfires and the rejected "numbering the campfires".
  D-25's projected *Rationale* adds nothing on gathering, so D-25's *Rationale* is unchanged.
- `ognisko_i_jedzenie_loop2.md` in the vault (`_zadania/`): its headings only, to point *Origin*
  at a document that lasts after the cycle (`.runs/` is removed when the task closes).
- `.the-way/foundations/glossary.md` headings, to know which words of the process take a qualifier.
- A search of the vault and of `.runs/` for the ways the human was shown under Q8–Q11 (only "way A"
  is recorded): nothing found.

## Choices made, with the way rejected and the cost if wrong

1. **`Method: test` for `minute-span-split` now**, rather than `review` until Slice 13. Cost if
   wrong: the branch holds, between this commit and Slice 13, an invariant whose method names a test
   that does not exist; if Slice 13 is dropped or returned, the entry must turn to `review`.
2. **Rejected fields written from each row's column "What the cycle would otherwise guess"**: the
   task records the chosen way of each question ("way A") but not the others, and `none considered`
   is the human's statement alone. Each *Rejected* names the alternative the row settles against
   (for example D-52: a reserve above the starting value; D-62: a ceiling on burning minutes).
   D-50's *Rejected* (a scale of its own; whole degrees) is my reading of Q8 and its cost note, not
   a recorded option. Cost if wrong: the human strikes or rewords those at the merge.
3. **Rationales are mine**, drawn from the Q answers' stated pros and weak points (Q6, Q10, Q11,
   Q15) and from the rows' columns; where a row gives no reason (for example why cold goes before
   hunger as a cause), the *Rationale* states none.
4. **Relations:** D-51 and D-60 derive from D-24; D-58 from D-23; D-63 from D-19; D-64 from D-04 ·
   D-23 (spec); D-65 from D-25 (spec); others `none`.
5. **D-56 names "task 9 of the MVP plan, plomyk"** in its binding sentence, since the row's meaning
   holds "until task 9". Rejected: moving the task reference to *Rationale* — it would drop part of
   the row's meaning.
6. **Glossary `map run restart` opens with "In the MVP"**, as row 7's wording does and the handoff
   applies the rule to every entry from a row. Cost if wrong: a definition scoped to the MVP, which
   the human may prefer unscoped.
7. **D-53 defines "chilled" and "starving" inline** (below the threshold of chill / of hunger)
   rather than as glossary entries: a reader of survival games gives them that meaning.
8. **Origin of D-65 is `none`**, its whole reasoning standing in the entry: its source, the spec's
   Decision 4, is removed with `.runs/`. D-64's *Origin* points at the task's carried question, its
   reasoning written into *Rationale* and *Rejected*.
9. **Layout:** the new decisions keep one paragraph per line, as D-39–D-49 do; the edits of D-25
   and D-26 keep their wrapped lines.

## Concerns for the orchestrator

1. **F19's method** (choice 1): the template's WAY-61 sentence and the skill's "written in the change
   that brings the entry" pull apart on intermediate commits. Recommended: keep `test`, and have
   Slice 13's executor confirm the method when it writes the test and F24; if Slice 13 does not land
   the test, turn the entry to `review` through `the-way-record-invariant`.
2. **D-25 now reads "gathering takes only from a revealed tile"** (approved projected wording, with
   "only"), beside D-58 and D-65 in the MVP form. Not a collision; noted because the MVP wording
   rule does not reach approved projected wording (handoff, *What binds the wording*).
3. **`action-in-progress`** read literally ("lasts its full duration") is false for an action cut by
   death. The task's *Context* reads it as holding within a map run in progress, and D-54 states the
   exception. Recommended for the return step: judge whether the sentence gains "while the map run
   goes on", alongside its judgment of D-21 and `player-map-run-pace`.

No question needs the human; nothing returned as `blocked`.
