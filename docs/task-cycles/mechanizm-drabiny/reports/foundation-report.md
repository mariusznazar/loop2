**Status:** done with concerns

# Report — the foundation entries of the plan (task cycle `mechanizm-drabiny`)

## Commits and files

Range `e84a73ce..1d14b6eb` on `task/mechanizm-drabiny`, both commits with `mariusznn@gmail.com` (`git log --format='%h %ae' -2`).

- `5a0b6ccf` — glossary term `rung`, decisions D-464, D-465, D-466. `foundations/decisions.md` +45, `foundations/glossary.md` +6.
- `1d14b6eb` — change of D-327. `foundations/decisions.md` +15 −9.

Total: `foundations/decisions.md` +60 −9, `foundations/glossary.md` +6 −0. The three new decisions stand at the end of the section "Maps: their content, time and solving", after D-449. No new topical section. The term stands at the end of `foundations/glossary.md`. Numbers: the highest decision was D-463 and the highest withdrawn number D-361, so the next free ones are 464–466.

## Checks

- `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`, after `git add` of the term and the three decisions — exit 0, "0 errors".
- The same command after `git add` of the D-327 change — exit 0, "0 errors". This also checks the 22 lines `decision: D-327 "…"` in `tests/view/*.test.mjs`. They still quote sentences of D-327's binding sentences.
- `python -B .the-way/elements/common/foundation_check.py`, without the switch, on the same tree — exit 0, "0 errors". The switch skips only the report of an invariant whose *Method* is `test` and that no test cites. This change adds no invariant, so the two runs check the same things.
- Word counts of D-327, counted by splitting on spaces as the check does: paragraph 1 has 299 words, paragraph 2 has 269 words and 3 sentences, 568 in all. The limits are 300 a paragraph and 600 together. The check found no excess in D-464, D-465 or D-466.
- Not run: the product's tests (`npm test`) and `python -B .the-way/instruction-files/check_instructions.py`. The handoff leaves the tests out, and this change edits no instruction file.

## The `tests:` clauses cite tests that do not exist yet

The *Verification* of D-464, D-465, D-466, and the new part of D-327's, describes in words what the planned tests will hold. The template allows no path and no test name in that clause. None of these tests exists yet. Until they stand, each decision is held by its pair of examples. The tests the plan's slices create:

- D-464: Slice 1, `tests/sim/data.test.mjs`. The new cases of the mechanism on a made-up opener and row, and on the game's rungs (the same resources in the same order, the same attackers and kinds of condition, the completion text naming the composed name). Also the refusal of a row that adds a resource, an attacker or a kind of condition, or the type error that stands in for it.
- D-465: Slice 1. The composed names in `tests/sim/data.test.mjs`, and the list `ENTRIES` of `tests/invariants/test_content_identifiers.py` with the three names.
- D-466: Slice 1, `tests/sim/data.test.mjs`: the case that replaces "the maps stand in the order of the chain, each one opened by the one before it" with the order of row 5 and each opener standing before its map. Slice 2: the catalog case in `tests/view/catalog-lines.test.mjs`, `tests/view/map-catalog.test.mjs` or `tests/view/maps-screen.test.mjs`, with the rungs after Las — wataha and before Las — matecznik. Slice 3: `tests/view/end-window-lines.test.mjs`, with „Otwarte: Las — wataha →” and under it „Otwarte: Las — głębiej II →”.
- D-327: Slice 7, `tests/view/map-lines.test.mjs`, the icons in `cardHeading`. Slice 8, `tests/view/maps-screen.test.mjs`, the wolf's icon in the drawn heading of Las — głębiej and none in that of Las.

The return step brings these clauses in line with the finished tests and trims each pair to the part that no test holds.

## The entries

### Glossary `rung` — row 4

Text: "A rung is a game map that differs from the map that opens it by its numbers alone and is made by the ladder mechanism, from a row of the game maps' data that names the map that opens it and gives only the numbers in which the rung differs from that map (D-464)." *Not*: `none`.

- EN: The foundation's word for a rung of the ladder — a map made from a row of data that names its opener and gives only the numbers that differ.
- PL: „Rung” to słowo fundamentu na stopień drabiny: mapę, która różni się od mapy, która ją otwiera, samymi liczbami i powstaje mechanizmem drabiny z wiersza danych, który nazywa tamtą mapę i podaje tylko różniące się liczby.

What the definition adds to row 4: it names "the ladder mechanism" by what D-464 says it is, and refers to D-464. It does not widen or narrow the row's meaning.

Uses read again, as Q5 asks (`git grep -n -i -w -E "rungs?"`): the only uses are in the *Rationale* of D-448 (`foundations/decisions.md:6209`): "a long ladder whose first rungs are made of data alone (D-18), so a rung that differs from the map before it by its numbers costs no code … so it is neither a wall nor a rung of numbers alone".

- No sentence changes truth under the narrower meaning:
  - Rungs are made of data alone: each one is a row of data.
  - Each rung costs no code beyond the mechanism.
  - A map that brings combat into its solving condition is no rung.
  - "a rung of numbers alone" becomes redundant, but stays true.
- One thing to note (no change made): "the map before it" in that rationale means the opener. Under D-466 the map before a rung in the order of the data may be another map. For Las — głębiej II it is Las — wataha. The rationale binds nothing. If the orchestrator wants it plain, the cheap fix is "the map that opens it" in place of "the map before it".

No other entry uses "rung", and the-way's glossary does not hold the word.

### D-464 — How does a rung stand in the game's data? — the cycle's

The first two sentences are row 2 whole. The third adds the short sentence of the demand (`goalText`, D-327) beside the sentence of the condition and the completion text, as the orchestrator's correction in the handoff gives. I mark it `the cycle's` for that addition, so that the request puts it before the human.

I hold that the addition does not change the row's meaning beyond what the human accepted:

- Row 2 says the sentences a player reads are written by hand, not composed by code. Q2's rejected way b) is the one in which "zdanie warunku i tekst po rozwiązaniu składa kod".
- `goalText` came into the data after the task was refined, and the row's author did not know it.
- A rung that took `goalText` from its opener would show the opener's hours and attacks under its heading (the plan's *Choices*).

So I did not return `questions`.

- EN: A rung is a row of its own in the maps' data that names its opener, gives only the numbers that differ (never creatures), keeps the opener's resources in order, its attackers and its kinds of solving condition, sets density 0 for a resource it is not to give, and writes its three player-facing sentences by hand.
- PL: Stopień stoi w danych map własnym wierszem, który nazywa mapę, która go otwiera, i podaje tylko różniące się liczby, nigdy stworzenia; ma te same zasoby w tej samej kolejności, tych samych napastników i te same rodzaje warunku co ona; zasób, którego ma nie dawać, dostaje gęstość 0; zdanie warunku, krótkie zdanie żądania i tekst po rozwiązaniu pisze się w jego wierszu ręcznie.

*Rejected*: the ways not chosen in Q2 and in the question „Czy stopień ma te same zasoby…”. These are: a row per stretch of the ladder; vetoing the setting, so that a rung changes creatures or has a creature of its own; and dropping the sentence. Task numbers are left out and the costs are rewritten without them.

The pair of examples, word for word. It holds the decision until Slice 1's tests stand. Its last violating item, about the short sentence of the demand, may stay after Slice 1, since no planned test holds it.

- complies: "Las — głębiej II as a row naming Las — głębiej as the map that opens it and giving a longer streak and more beaten attacks, with the resources of Las — głębiej in their order and its wolf, and its sentence of the solving condition, its short sentence of what it demands and its completion text written in its row"
- violates: "a rung's row that adds stone to the resources of the map that opens it or names the bear among its attackers; a rung that changes the wolf's health or strike; a rung whose short sentence of what it demands is taken from the map that opens it"

### D-465 — What is a rung named? — row 3

Row 3 whole. The sentence that defines a line of rungs comes from Q6's answer ("„Linia stopni” to stopnie, z których każdy otwiera następny, razem z mapą, od której wyrastają") and from *To do* 2. The path `src/browser/sim/data/maps.ts` is the handoff's and *To do* 2's.

- EN: The game composes a rung's name in the code of the maps' data from the first map of its line of rungs that is no rung and the Roman numeral of its place from II ("Las — głębiej II", "III", "IV", never "II II"); no data writes it.
- PL: Nazwę stopnia składa gra w kodzie danych map z nazwy pierwszej mapy jego linii stopni, która sama stopniem nie jest, i rzymskiego numeru jego miejsca w linii od II („Las — głębiej II”, „III”, „IV”, nigdy „II II”); żadne dane jej nie piszą.

*Rejected*: Q3's b) and c). Ways the cycle would otherwise guess are left out (WAY-134).

The pair, word for word, temporary until Slice 1. If its violating item "the view composing a rung's name from the map that opens it" stays after the return step, because no test holds it, the entry becomes `the cycle's`.

- complies: "a rung that „Las — głębiej IV” opens named „Las — głębiej V” by the code of the maps' data, its row holding no name"
- violates: "a rung's row that writes its name; the view composing a rung's name from the map that opens it; the rung that „Las — głębiej II” opens named „Las — głębiej II II” or „Las — głębiej 3”"

### D-466 — Where does a new map stand in the order of the game maps' data? — the cycle's

The first two sentences are row 5 whole, with the example order the task gives. The third sentence says that the catalog of the screen Mapy and the end-of-run window show the maps in the data's order, the buttons „Otwarte: {mapa} →” included. It binds the view, and the row itself does not carry it: it comes from the handoff, from *To do* 3 ("w tej kolejności gracz widzi mapy w katalogu map i w oknie końca przejścia") and from Q6's question. Hence `the cycle's`. Scope: `simulation · browser-view`.

- EN: A new map stands in the data right after the last map its opener already opens and that map's line of rungs, or right after its opener when it opens none yet; maps of one opener stand in the order added, each followed by its line of rungs; the catalog and the end-of-run window show the maps in that order.
- PL: Nowa mapa staje w danych zaraz za ostatnią mapą, którą jej mapa otwierająca już otwiera, i za linią stopni tamtej mapy, a gdy mapa otwierająca nic jeszcze nie otwiera — zaraz za nią; mapy jednej mapy otwierającej stoją w kolejności dopisywania, każda ze swoją linią stopni; katalog i okno końca przejścia pokazują mapy w tej kolejności.

*Rejected*: Q6's a) and b). The weak point of c) stands in *Rationale* as "Accepted with it".

The pair, word for word. Its first complying item, the map that Las — głębiej opens after the rungs, is Q6's own example of Zbocze. It holds the rule for maps added later, which no test of this change holds, so it likely stays.

- complies: "a new map that Las — głębiej opens standing after Las — głębiej IV and before Las — matecznik; a rung that Las — głębiej IV opens standing right after it"
- violates: "a rung put right after the map that opens it, before a map that map already opened; a new map put at the end of the maps of its region; the catalog ordering the maps by their names"

### D-327 — What does the card of a map hold? (changed) — the cycle's

The number stays D-327, and the entry is edited in place.

What changed:

- **Paragraph 2 starts with a new sentence:** "Beside the name and the tag of its state the heading holds the small icon of each creature that attacks on the map, and a map without an attacker has none there." I wrote "each creature" because `attackers` in the data is a list, and Slice 7 writes "each creature".
- **The departures sentence:** it now reads "in six things only in both layouts and in one more in the phone layout", and ends with "; and in the phone layout the tag of the state and „odsłania ją {mapa}” stay beside the name and „Wejdź — wybierz postać” at the top of the card, where the predecessor's card on a phone puts the tag and the opener in a bar above the card, beside a link back to the list of maps, and its button in a bar pinned at the bottom of the screen."
- ***Verification*:** its `tests:` clause names the icon of the heading. Its pair gains:
  - the phone placement, word for word — complies "…, and the tag „otwarta” beside the name and „Wejdź — wybierz postać” at the top of the card"; violates "„Wejdź — wybierz postać” moved into a bar pinned at the bottom of the screen at a page area 360 px wide";
  - a temporary icon part until the tests of Slices 7 and 8 stand — complies "the wolf's icon in the heading of Las — głębiej and no icon in the heading of Las"; violates "the heading of Las — głębiej with no icon of the wolf".
- ***Rationale*:** two sentences, about the icon and the phone placement.
- ***Rejected*:** gains ways (a) and (b) of R1.

- EN: The card's heading shows the small icon of each creature that attacks on the map (none without an attacker), and the list of departures from the old Loop's card adds the phone layout, where the old card puts the tag in a bar above it and its button in a bar pinned at the bottom, while this card keeps both at its top.
- PL: Nagłówek karty mapy pokazuje małą ikonę każdego stworzenia, które napada na mapie (bez napastnika — bez ikony), a lista odstępstw od karty starego Loopa dopisuje układ telefonu: stara karta trzyma tam znacznik stanu w pasku nad kartą i przycisk w pasku przypiętym na dole ekranu, a ta karta oba u góry.

**Something added beyond R1.** R1 named only the icon and the bottom bar. The old card's code (`src/components/probe/MapPage.tsx of the old game's local code:129-134, 144`) also shows that on a phone the tag of the state („otwarta · odsłania ją …”) stands in a bar above the card, beside „← Mapy”, and not beside the title. Without that, "only" would stay untrue, so I named it in the same phone item.

**Choice of wording:**

- **Way chosen:** keep the quoted words "…in six things only" and add the phone item as "one more in the phone layout".
- **Way rejected:** "in seven things only".
- **Cost of the rejected way:** it breaks 7 lines `decision: D-327 "It departs … in six things only"` in `tests/view/map-lines.test.mjs`, `tests/view/maps-screen.test.mjs` and `tests/view/maps-record.test.mjs`. Changing tests is outside my boundary, and `maps-record.test.mjs` is in no slice.
- **Cost if my choice is wrong:** one sentence of D-327 and those 7 lines change together later.

***Rejected* of D-327**, the two ways added:

- Source: the description of request 177 before correction 2, read from its edit history (`gh api graphql`, `userContentEdits` of pull request 177), item 1 of "Needed from you". Its ways were (a) name the icon and the bottom bar among the departures, the card as it is; (b) narrow the rule to what the parts hold; (c) put the icon in the heading, which was chosen; (d) keep the code and the rule.
- I left (d) out. In that request it put the decision off ("d w tym PR-ze"), which is a choice of the process, and it leaves a rule that says more than the game does.
- The human's choice is in `docs/task-cycles/katalog-map/reports/correction-2-remarks.md` at commit `3f48f79c`: "Ikonę napastnika w nagłówku karty (wariant c) i D-327 wyliczające odstępstwa zgodnie ze stanem (także pasek na dole na telefonie)".

## Own-work check

- **The requirement most likely unmet:** *To do* 8, "D-327 lists the departures from the card of the old Loop as the game stands". A departure I did not see would leave "only" untrue.
- **The check:** a side-by-side reading of the old card's code (`src/components/probe/MapPage.tsx of the old game's local code:103-278`) against this card (`src/browser/view/map-card.tsx:100-148`, `src/browser/maps-screen.css:234-248, 569-586`), part by part.
- **Matches:**
  - heading: the title, the status, the icon (`MapPage.tsx:142-151`);
  - the short sentence (`:152`);
  - „Żąda” with the icon at the beaten attacks (`:157-183`);
  - „Teren” with "bez ognia: nie stygnie" (`:186-204`), which is departure 3;
  - „Czyha” with "potem … karencji — średnio …" (`:207-220`), which is departure 1;
  - „Leży tu” (`:221-246`);
  - „Odbiera” with "gasi:" (`:247-257`), which is departure 2;
  - the picker with its character sections (`:185, 266-275`), which is departure 6.
- **Found:** the phone bar above the card holding the status and „← Mapy” (`:129-134`), which is the added part above, and the bar pinned at the bottom (`:261-264`).
- **Not compared:** the deployed old Loop. Its local code may differ from it.

A second check: the foundation check validates every line `decision: D-327 "…"` against the new binding sentences, and found 0 errors. The quoted sentence starts "At the right of the heading stands …" and "It departs … in six things only" still stand.

## Reaches beyond the dispatch

- **D-368** (`foundations/decisions.md:11364-11371`), found by the search of the whole foundation for the order of maps. Its „Otwarte: {mapa} →” is singular, as in D-132 and D-53, and reads as "each map it opened" (Q-D). No sentence is untrue: the window already shows one button for each map opened (`end-window-lines.ts`, as the task's *Context* says).
- **D-144, D-416 and D-287**, cited in D-464 and D-465 from the task's text. I checked only that each sentence cited stands in the entry: the wolf's numbers in D-144; „{n} stopni” and "steps" in D-416; ranks bought in D-287.
- **Code read:** `src/browser/sim/data/maps.ts:1-120` (`MapDef` with `goalText`, `recordCreature`), `src/browser/view/map-card.tsx:95-148`, `src/browser/maps-screen.css:234-248, 565-586`. I read these to write where the button and the tag stand in the phone layout.
- **The old game's repository**, `src/components/probe/MapPage.tsx of the old game's local code` (the place R1 compared against).
- **Request 177:** its description, its comments and the edit history of its description. The handoff names `gh pr view 177`; the edit history was needed for R1's ways (a) and (b).
- **The record of the task 3 cycle at commit `3f48f79c`:** `docs/task-cycles/katalog-map/reports/correction-2-remarks.md` whole, and lines of `cycle.md` that mention R1.
- **Examples the method requires:** the-way's `foundations/decisions.md` WAY-03, and the glossary entries `invariant` and `foundation`.
- **Search of the whole foundation for each settlement (WAY-33):**
  - Search terms: "order" near maps and the catalog; "opener", "map that opens it", "Roman", "numeral", "composed"; the name and sentence fields; "rung" and "ladder".
  - Result: no entry already states rows 2, 3 or 5, so no row was tied to an existing entry.
  - D-449's "the order of maps that the decision on how a map may differ … gives" is the order of difficulty of D-448, not the order of the data. D-466's heading says "order of the game maps' data" so that the two are not read as one.

## Working copies

- `.runs/foundation/` held:
  - the text of request 177: its description, its comments and its edit history;
  - the outputs of the searches and of the foundation check;
  - the extract of `correction-2-remarks.md`.
- I removed it with `Remove-Item -Recurse -Force` on its full path, and `Test-Path` then read `False`.
- Nothing kept in `reports/`: the passages the report needs are quoted above.

## Concerns

1. **A resource of density 0 shows in the view.**
   - D-464 lets a rung give a resource density 0. D-327 and D-325 then still treat that resource as one the map has:
     - „Leży tu” writes every resource of the map with its approximate number of tiles, here ≈ 0;
     - the search of the catalog finds the map by that resource's name;
     - „Co daje” lists the map under that resource.
   - So a rung that gives no moss would show moss on its card and in „Co daje”.
   - None of this task's rungs uses density 0: the plan's *Choices* keep the resources of Las — głębiej. So nothing is wrong today.
   - The first rung with density 0, probably in task 16, needs the view to leave such a resource out, or a sentence in D-327 and D-325. This is an observation of what the decisions say; I did not run it.
2. **Two marks are `the cycle's` although each comes from a row.** D-464 and D-466 carry a part their row does not: the short sentence of the demand in D-464, the order of the view in D-466. The request's description has to put them before the human, with the pairs above quoted.
3. **D-327 names one departure beyond R1:** the tag of the state above the card on a phone. It comes from the old game's code, not from the deployed page.

## Unread material

- D-24, D-136, D-142, D-149, D-132, D-133, D-53, D-325, D-327, D-331, D-332, D-333, D-388, D-398, D-448, D-449, D-438, D-18 and D-34: read whole, from heading to the next heading.
- The glossary and the part map: read whole. The invariants `content-identifiers` and `first-exploration-discovery`: read whole.
- The task's passages the handoff names: the whole frozen task (lines 1–175).
- The plan: whole.
- `.runs/orchestrator/index.md`: not read. It is a locator, and I found each decision by its heading instead.

## Searches not found or unclear

- R1's ways (a), (b) and (d) are not in the current description of request 177, which keeps only the outcome. I found them in the description's edit history (GraphQL `userContentEdits`).
- I did not open the old Loop at https://kantarion.bieda.it/. The departure sentence could be written from D-327, R1, this card's code and the old game's code in `the old game's local repository`. Whether the deployed old Loop matches that code was not checked. R1's reviewer also noted that no map with an attacker can be opened on a fresh game there.
- Unclear: whether R1's way (d) belongs in D-327's *Rejected*. I left it out as a deferral of the process.
