# Report — the plan's *Foundation entries* — task `paski-parametrow`

**Status:** done with concerns

## Files changed and commits

- `foundations/decisions.md` — +212 −49
- `foundations/invariants.md` — +1 −1
- Commit `7308e0bd` on `task/paski-parametrow`, on the base `51667231eafb32db53eaaf662f07e728323aa2ba`:
  "docs: :memo: write the cells with bars, the scale of temperature, the alarm and the frame into
  D-337, the explanation and the blow into the new D-450, and the roles, pairs, kind and events they
  need into D-39, D-40, D-42, D-44, D-04, D-311, D-178 and design-token-contrast".

No line of a test changed: every sentence a `decision:` line quotes still begins as quoted (the
foundation check, which compares each quotation, reports no citation).

## Checks

| Command | Exit | Result |
|---|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (before the commit, files tracked) | 0 | 0 errors; one listed line: `design-token-contrast` reads `test` and its sentence is changed while no file citing it changed (`tests/invariants/test_design_token_contrast.py`) — Slice 1 writes its pairs; the request names it |
| `python -B .the-way/elements/common/foundation_check.py` (after the commit) | 0 | the same: 0 errors, the same listed line |
| `python -B .the-way/instruction-files/check_instructions.py` | 0 | 0 error, 0 warn, 129 info |

- `--skip-test-citations` was not needed: the plain run reports no citation.
- No focused test was run: no quotation line was changed, so no test file changed.
- `npm test` not run, as the handoff gives; the full gate is the orchestrator's.
- Word counts of the binding sentences of each changed decision (counted with `wc -w`, the check's
  measure; the check reports no paragraph over 3 sentences or 300 words): D-04 456 (4 paragraphs),
  D-39 537 (7), D-40 529 (3), D-42 321 (2), D-44 418 (3), D-178 83 (1), D-311 398 (3), D-337 568 (4),
  D-450 293 (2).

## The entries

Role names the later slices take (D-48, named by what each means): `satiety-fill`, `chill-zone`,
`safe-zone`, `scale-marker`, `warming-frame`.

1. **D-337 — changed** (heading now "What does the body row show of each value of the body, and of
   how long each need lasts?"). Mark: **row 1, 2, 4, 5, 6, 7, 10, 11**.
   - EN: Each of the four values stands in a cell as in loop — name left, number right, bar under
     them, note under the bar, the backpack a line with no bar — temperature on a scale from 30 to
     41 °C with three zones and a marker; below its threshold (temperature 35 °C, satiety 30, health
     35, the last of the look alone) the number is red and the fill pulses, the pulse going on while
     game time stands; the frame of the temperature cell is amber at a fire, bluish while nothing
     warms and the map is colder, plain otherwise; three cells are buttons opening explanations and
     the health cell shows blows, as D-450 gives; open and hovered cells have the name in
     `text-strong`.
   - PL: Każda z czterech wartości stoi w komórce jak w starym Loopie — nazwa po lewej, liczba po
     prawej, pasek pod nimi, dopisek pod paskiem, plecak bez paska — temperatura na skali 30–41 °C ze
     strefami i kreską; poniżej progu liczba jest czerwona, a wypełnienie pulsuje, także gdy czas gry
     stoi; ramka komórki temperatury jest bursztynowa przy ogniu, niebieskawa, gdy nic nie grzeje,
     a mapa jest zimniejsza; trzy komórki są przyciskami z objaśnieniem, komórka zdrowia pokazuje cios
     (D-450); otwarta i najechana komórka ma nazwę w `text-strong`.
   - The rejection of the cells with bars and the sentence „a value with no bar is the same number
     a bar only draws” are gone. *Rejected* holds the ways the sources of rows 1, 4, 5, 6, 7, 10, 11
     keep (Pytania 1 b c; 7 cz. 1 a b; 2 b; 13 default; 8 cz. 1 a b c; 14 cz. 2; 8 cz. 2 e; 10 b c;
     14 cz. 1; 12 b; 14 cz. 3), each with its cost. *Rationale* holds the weak points the questions
     showed.
   - Three clauses come from the task's *To do*, not from a row's own words, written so that a row
     can hold: the marker at the left end below 30 °C (To do 2; temperature falls far below 30 °C, so
     row 4's „kreska w miejscu temperatury teraz” cannot hold without it); the plain frame on a map
     that does not cool (To do 3, the third case of row 5's outline); the health cell holding the
     place of the frame (To do 4). I kept the row mark; the orchestrator may judge them as
     `the cycle's`.
2. **D-450 — new**, "What do the cells of the body row show on a click and at a creature's blow?",
   section "Screen of a map run and the end-of-run window", after D-385. Mark: **the cycle's**
   (ruling 2: D-337 with the explanation and the blow marker came to about 800 words; this decision
   derives from D-337 and carries rows 2, 9 and 11 in the part of the explanation and the blow).
   - EN: A click on the cell of temperature, satiety or nature energy opens its explanation right
     under the cells, above the backpack, with the threshold, what happens below it and the rate from
     the game's data; a second click closes it, another cell switches, one at a time; at a creature's
     blow the health cell shakes and shows the fading „−{n} · {stworzenie}”, from the simulation's
     events, never at a first draw, reload or load, one marker per combat with the sum where it is at
     least 2, a killing blow included, at 1×, 2× and 4× only, a new blow replacing the old; while game
     time stands it stands where it reached (a marker that comes then, as at a killing blow, at its
     first frame) and goes on with time; under reduced motion no shake, the text still.
   - PL: Kliknięcie komórki temperatury, sytości albo energii natury otwiera pod komórkami, nad
     plecakiem, objaśnienie wartości z progiem, skutkiem i tempem z danych gry; drugie kliknięcie
     zamyka, inna komórka przełącza, otwarte najwyżej jedno; przy ciosie stworzenia komórka zdrowia
     drga i pokazuje znikający napis „−{n} · {stworzenie}” ze zdarzeń symulacji, nigdy przy pierwszym
     rysowaniu, przeładowaniu ani wczytaniu, jeden na starcie z sumą od 2, także przy ciosie, który
     zabija, tylko przy 1×, 2× i 4×; gdy czas gry stoi, znacznik stoi (przyszły w tym czasie — w
     pierwszej klatce) i rusza z czasem; przy ograniczeniu animacji komórka nie drga, a napis stoi.
   - *Rejected*, as a decision marked `the cycle's` takes it, holds the ways the human weighed
     (Pytanie 4 a, b, c; Pytanie 11 b, c), each with the cost the source keeps.
   - Its *Verification* is a pair of examples kept until the tests of Slices 5, 7 and 8 hold it; the
     return step removes the parts the tests hold.
3. **D-311 — changed**: the sentence of the world now reads „… the body row with a bar under each of
   its values and the minutes each need lasts, the explanation of a value right under its cells
   while the player has one open (D-450), the backpack and the lines below them …”. Mark: **row 1, 2**.
   - EN: The world holds, from the top, the scene, „Teraz” and „Potem”, the body row with its bars,
     the open explanation right under its cells, the backpack and the lines below, the map and the
     line of a tile.
   - PL: Świat ma od góry scenę, „Teraz” i „Potem”, wiersz ciała z paskami, otwarte objaśnienie tuż
     pod jego komórkami, plecak i wiersze pod nim, rysunek mapy i wiersz kafelka.
   - The quoted beginning „The world holds, from the top, the scene, „Teraz” and „Potem”, the body
     row” is kept. The share of this sentence with task 8 of the project plan (the row of equipment
     under the backpack) stays for whichever cycle goes second, as the task's *Context* says.
4. **D-178 — changed**: a second sentence. Mark: **row 1, 2, 3**.
   - EN: The cell of nature energy stands as the other cells do — „Energia natury” left, the number
     right, a white bar full at the energy's cap (D-40), and its explanation on a click (D-450).
   - PL: Komórka energii natury stoi jak pozostałe — nazwa po lewej, liczba po prawej, biały pasek
     pełny przy maksimum energii i objaśnienie po kliknięciu.
   - *Relations* gains `derives from D-337`.
5. **D-39 — changed**: two paragraphs. Mark: **the cycle's** (rows 3, 5, 7, with one clause no row
   carries — see below).
   - EN: `positive` fills the bar of health and `danger` stands as the number below a threshold,
     health below 35 included, and as the zone of overheating; `warning` stands in no bar of the
     body row, the orange fill of satiety taking the role `satiety-fill`; the frame of the
     temperature cell takes `warming-frame`, amber, meaning that something warms the character, or
     `chill-zone` while nothing warms and the map is colder, each at least 3:1 against `panel`; that
     frame is no frame at a text in the sense of D-279.
   - PL: Zieleń `positive` wypełnia pasek zdrowia, `danger` to liczba poniżej progu i strefa
     przegrzania; `warning` nie stoi w żadnym pasku wiersza, pomarańcz sytości ma rolę `satiety-fill`;
     ramka komórki temperatury bierze `warming-frame` (bursztyn: coś grzeje postać) albo `chill-zone`;
     ta ramka nie jest ramką przy tekście w rozumieniu D-279.
   - The clause on D-279 is the cycle's: D-279 has a frame drawn at a text take that text's colour,
     and its first example is the frame of a button; the amber or bluish frame of a button does not.
     What the human accepted gives the outcome — row 5: „Ramka komórki temperatury jest bursztynowa,
     dopóki na polu postaci coś się pali — także gdy temperatura stoi już na 37,0 °C — a niebieskawa,
     dopóki nic postaci nie grzeje, a mapa jest od niej zimniejsza; to ramka przycisku komórki
     w innym kolorze, bez pulsowania.” — so I wrote it in the form D-39 already uses for the state bar
     of a rule („is no frame or bar at a text in the sense of D-279”), with no `narrows` in
     *Relations*, as that sentence has none.
   - *Rejected* gains Pytanie 3 a and b (grey fills), with their costs.
6. **D-40 — changed**: a paragraph. Mark: **row 3, 8, 10**.
   - EN: The bars of satiety, health and nature energy have their track in `highlight`; the fill of
     nature energy stands in `text-strong`; on the scale the chill zone is `chill-zone`, the safe zone
     `safe-zone`, a neutral grey, and the marker `scale-marker`, dark, each zone at least 3:1 against
     `panel` and the marker against each zone; the button of a cell takes no `highlight` under the
     pointer and its name stands in `text-strong` under the pointer and while open.
   - PL: Tor pasków sytości, zdrowia i energii natury stoi w `highlight`; białe wypełnienie energii
     w `text-strong`; strefy skali w rolach `chill-zone` i `safe-zone`, kreska w `scale-marker`;
     przycisk komórki nie dostaje pod kursorem tła `highlight`, a jego nazwa jaśnieje do `text-strong`
     pod kursorem i gdy jest otwarty.
   - *Rejected* gains Pytanie 9 b (the track in `text-disabled`), with its cost.
7. **D-42 — changed**: a second paragraph. Mark: **row 3, 5, 6, 8**.
   - EN: In the body row each fill has at least 3:1 against `highlight` at full opacity, each zone at
     least 3:1 against `panel`, the marker against each zone, the frame in `warming-frame` or
     `chill-zone` against `panel`; no pair of two zones, since a gap in `panel` stands between them;
     the alarm's pulse, full to 40 % and back in 1.1 s, smoothly and with no end, is exempt in its dim
     phase, and the pulse and the blow marker are judged by 2.3.1.
   - PL: W wierszu ciała każde wypełnienie ma co najmniej 3:1 wobec toru przy pełnym kryciu, każda
     strefa wobec `panel`, kreska wobec każdej strefy, ramka wobec `panel`; pary strefa–strefa nie ma,
     bo dzieli je przerwa; przygaszona faza pulsowania (100 → 40 → 100 % w 1,1 s) jest wyjątkiem,
     a pulsowanie i znacznik ciosu ocenia kryterium błysków.
   - The numbers of the pulse (row 6) stand here, by ruling 2, not in D-337.
8. **design-token-contrast — changed** sentence. Mark: **row 3, 5, 8** (through D-42).
   - EN: Besides its pairs, `positive`, `satiety-fill` and `text-strong` have at least 3:1 against
     `highlight`; `chill-zone`, `safe-zone`, `danger` and `warming-frame` at least 3:1 against
     `panel`; `scale-marker` at least 3:1 against each of `chill-zone`, `safe-zone` and `danger`.
   - PL: Do par niezmiennika dochodzą: wypełnienia pasków wobec `highlight`, strefy skali i bursztyn
     ramki wobec `panel` oraz kreska wobec każdej strefy, każda para co najmniej 3:1.
   - At `{fork-point}` the sentence ended „…, and `text-disabled`, the track of the bar of practice of
     a tree on the screen Postać, has at least 2:1 against `panel`, the background of the area it
     stands in, each ratio computed from the values of those roles as WCAG 2.2 defines the contrast
     ratio.”; the new one adds the three clauses before „each ratio computed”. Its one citing test,
     `tests/invariants/test_design_token_contrast.py`, still checks only the old pairs and passes;
     Slice 1 adds the new ones and sees them fail first. The request names this invariant test.
   - `Derives from` (D-39 · D-40 · D-41 · D-42) unchanged; each of those decisions already names it.
9. **D-04 — changed**: a new third paragraph (the second stands at 299 words). Mark: **row 9**.
   - EN: For the blow marker of the health cell the browser view also draws from the events the
     simulation returned, as for the scene, and which explanation of the body row stands open is the
     state of the own component of the screen of a map run (D-407).
   - PL: Do znacznika ciosu w komórce zdrowia widok czyta też zdarzenia zwrócone przez symulację, jak
     dla sceny, a otwarte objaśnienie jest stanem komponentu ekranu przejścia.
10. **D-44 — changed**: a new third paragraph. Mark: **the cycle's** (task *To do* 4 and *Decisions in
    play* D-44, the plan's *Choices*; no row).
    - EN: Besides the kinds above, the button has the kind of the button of a cell of the body row:
      name left and number right on one line, a bar under them and a note under the bar, saying
      whether its explanation stands open; its frame in `control-border`, its background and the
      role of its name under the pointer and while open as D-40 gives.
    - PL: Wspólny przycisk ma nowy rodzaj — przycisk komórki wiersza ciała: nazwa i liczba w jednej
      linii, pasek i dopisek pod nimi, informacja, czy objaśnienie jest otwarte; ramka
      w `control-border`, wygląd pod kursorem i po otwarciu według D-40.
    - *Rejected* left as it stood: no statement of the human names ways weighed for the kind (the
      rejected way of the plan's *Choices*, a plain button with a class of the screen, is the
      planner's, so it stands in no *Rejected*).

The pairs of examples added to D-337, D-450, D-311, D-178, D-39, D-40, D-42, D-04 and D-44 each say
they hold "until the tests of the change that brought them hold them": they are pairs kept only until
a test of the same change holds the sentence, which marks nothing `the cycle's`; the return step
removes the part the tests hold. No other pair was added.

## Own-work check (section 3 of `make-change`)

- Requirement most likely missed: that every row of *Settlements to record* is written whole in the
  place its *Goes to* names, the values of the look kept out of D-337, all within the limits.
- Check: I went through rows 1–11 against the entries: 1 → D-337 P2, D-311, D-178; 2 → D-337 P4,
  D-450 P1–P2, D-311; 3 → D-39 P6, D-40 P3; 4 → D-337 P2; 5 → D-337 P3, D-39 P7, D-42 P2;
  6 → D-337 P3, D-42 P2 (numbers); 7 → D-337 P3, D-39 P6; 8 → D-40 P3; 9 → D-450 P2, D-04 P3;
  10 → D-337 P4, D-40 P3; 11 → D-337 P3 (pulse), D-450 P2 (marker). Then the foundation check for the
  limits and the quotations (exit 0, 0 errors).
- Shown: every row has its place; no number of the look (colour, thickness, time) stands in D-337;
  the pulse numbers stand in D-42.
- This change alters no behaviour a user sees: it writes foundation entries only.

## Choices, with the way rejected and the cost if wrong

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| D-450, a new decision for the explanation and the blow marker (ruling 2) | all of it in D-337 — about 800 words, over 600 | one more decision to read; folding it back means moving two paragraphs |
| The amber frame's role named `warming-frame`, not "warming outline" | `warming-outline` — „outline” is the CSS property D-47 and `browser-view-focus-outline` keep for focus alone, while this is the button's `border` | a rename in the token file, the styleguide, the test and the kitchen-sink page |
| The new kind of D-44 in a paragraph of its own | inserting it into the list of kinds of paragraph 1 — that sentence is quoted past the list of kinds by 12 lines in 10 test files, all of which would change | none to the meaning; a reader finds the kinds in two paragraphs |
| The smooth change of a fill's length, its time, the thickness of the bars and the gap's width in no decision | writing them into D-337 — values of the look, which ruling 2 keeps out of D-337; the styleguide's rule of Slice 9 and the code carry them | a later change could drop the smooth change unchecked by a decision; review of Slice 9's rule holds it |
| The bars' standing from minute zero and on the stopped minute left to D-125 and D-337's sentence 3 | a sentence of its own in D-337 — words D-337 lacks, and D-125 already binds what the row shows | none known |
| The D-279 clause in D-39 written as D-39's existing state-bar clause, with no `narrows` | `narrows D-279` in *Relations* | if the orchestrator reads it as a precedence, *Relations* gains `narrows D-279` |

## Questions and concerns for the orchestrator

1. **D-04 and reduced motion.** D-04 lets the view read the system's setting for reduced motion
   „for the scene (D-317)”. The body row's pulse, the smooth fill and the blow marker also follow
   that setting. Done in CSS (`@media (prefers-reduced-motion: reduce)`) this reads nothing in the
   view's code; read in TypeScript (as the scene does) it falls outside D-04's list. Recommended:
   Slices 6 and 8 hold it in CSS alone; should one of them need TypeScript, add „and for the body row
   (D-450)” to that clause of D-04 then. I did not write it, since no row gives it.
2. **Marks.** Three clauses of D-337 come from the task's *To do* (listed under entry 1) and the D-279
   clause of D-39 is the cycle's; please confirm the marks `row …` for D-337 and `the cycle's` for
   D-39, D-44 and D-450, or change them in the request.
3. **Step 4.4 of `record-decision`** (decisions that derive from or narrow a changed one): I listed
   them by their *Relations* lines (about 40 derive from D-04, D-39, D-40, D-42, D-44 or D-311; D-323
   narrows D-311) and did not read them whole. Every change here adds a paragraph or extends a list
   and rewords no sentence another decision rests on, so I judged none of them touched; the
   invariants deriving from D-04 and D-42 (`simulation-isolation`, `simulation-inputs`,
   `minute-span-split`, `browser-view-focus-outline`) are not touched either — the frame of the
   temperature cell is a `border`, not an `outline`.
4. The request names `design-token-contrast` as an invariant test changed by Slice 1, with its new
   sentence (listed line of the check).

## Reaches beyond the dispatch

- `.the-way/elements/common/way_of_working.md`, `rules.md`, `elements/decisions/template.md`,
  `skill/read.md`, `skill/decide_entry.md`, `elements/invariants/template.md`, `skill/write.md`,
  `skill/draft.md`, `skill/decide_entry.md` — the files the element skills name at their steps.
- `.the-way/elements/common/foundation_check.py`, lines 70–114 — how sentences, words, holding and
  quotations are counted, to keep within the limits.
- `foundations/decisions.md`: the `## ` section headings and the highest number (D-449) to place and
  number D-450; the end of the section "Screen of a map run and the end-of-run window" (D-385's
  last lines); the *Relations* lines of the whole log naming the changed decisions (step 4.4 search);
  D-279, D-322 and D-317 for the collision search and consistency (D-279 by its index lines, D-322 and
  D-317 to their *Verification*).
- `foundations/glossary.md`, entries around „loop” (lines 140–239) — that „loop” names the predecessor.
- `foundations/invariants.md`, the *Derives from* lines naming the changed decisions.

## Working copies

- `.runs/foundation/` in the worktree held drafts of D-337's paragraphs for a word count, the check
  outputs and extracts of D-322/D-317; removed with `rm -rf` by its full path before return. No
  remainder.

## Unread material

- D-125, D-133, D-265, D-395, D-396, D-407, D-421, D-57: read their binding sentences and *Scope*
  in the orchestrator's index, not whole (no field, rationale or *Rejected*).
- D-322 and D-317: read to the end of their *Verification*, not their *Rationale* and *Rejected*.
- `foundations/decisions.md`, the ~40 decisions that derive from a changed one: only their
  *Relations* lines (question 3 above).
- `.runs/task-cycles/paski-parametrow/foundation-index.md`: lines 1–586 of 969 read; the rest not.
- `guidelines/testing.md`: searched for `decision:` (no match); not read otherwise, as the handoff
  limits it to the quotation lines.
- `.the-way/elements/decisions/examples.md` and `.the-way/elements/invariants/examples.md` and the
  entries they name: not read.

## Searches not found or unclear

- `guidelines/testing.md` holds no passage on `decision:` quotation lines (search for `decision:`
  found none); the rule stands in `.the-way/elements/decisions/template.md`, "Verification".
- Unclear: whether the dim phase of the pulse should name the token of its opacity — the plan's
  Slice 1 makes the 40 % a token; D-42 names the number, not the token.
