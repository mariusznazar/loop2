# Foundation step 1 — report

- Agent: foundation agent (general-purpose subagent, claude-opus-5-5)
- Skills: the-way-record-decision, the-way-record-glossary-term, the-way-record-invariant (pin d04c3feb1a47e0ffc9a3b2354c23aacafe25c74b verified: gitlink and checkout agree)
- Commit: 3c2a5d90585ffec32171b9b337db7e99af3a5a72 on task/mag-w-lesie (not pushed), files foundations/decisions.md, foundations/glossary.md, foundations/invariants.md

## Entries written

| Entry | Meaning (pl, for the request only) |
|---|---|
| D-04/3 "What is the game built with?" (new wording; Scope browser-view, build-tools, simulation; Approved by Mariusz, 2026-10-13) | Gra jest w TypeScripcie w przeglądarce; symulacja to czyste funkcje (stan gry + odcinek minut gry → następny stan i zdarzenia, czas realny tylko jako argument), a widok rysuje wyłącznie ze stanu gry i zmienia go wyłącznie przez funkcje symulacji. |
| D-03/2 "How is the browser view built?" (unchanged sentences; Relations derives from D-04@ecd038e3) | Widok w przeglądarce dalej powstaje w TypeScripcie na interfejsach DOM bez biblioteki widoku; zmienia się tylko odcisk powiązania z nowym D-04. |
| D-08/1 "Where does the game's content live?" (Scope simulation, browser-view; Approved by Mariusz, 2026-10-13) | Treść gry (mapy, przedmioty, stworzenia, umiejętności postaci i ich liczby) stoi w plikach danych; nową rzecz znanego rodzaju dodaje się samą zmianą danych. |
| D-09/1 "How does the player interact with the terrain panel's drawing of the game map?" (row 1; Scope browser-view) | Rysunek mapy w panelu terenu jest obrazem, nie sterowaniem: jedyną interakcją jest najechanie łączące kafelek z wierszem listy, a liczby zapasów stoją w liście, nie na rysunku. |
| D-10/1 "What interrupts an action the character is carrying out?" (row 3; Scope simulation) | Trwającej akcji postaci nie przerywa ani zmiana programu, ani warunek innej reguły; program wybiera regułę dopiero po jej końcu. |
| D-11/1 "How does time pass in a map run the player starts?" (row 4; Scope simulation, browser-view) | Przejście uruchomione przez gracza płynie minutą gry na sekundę realną, a gracz może je zatrzymać i wznowić. |
| term `restart` (row 2) | Restart to nowe przejście tej samej postaci na tej samej mapie, które gracz uruchamia w miejsce przejścia w toku. |
| term `program rule` | Reguła programu to para warunku i akcji, którą zawiera program. |
| term `map run` | Przejście to jedna próba jednej postaci na jednej mapie, od wejścia do domknięcia, śmierci postaci albo zatrzymania przez gracza. |
| term `game minute` | Minuta gry to jednostka czasu symulacji. |
| `map-run-repeatability/1` | Dwie symulacje jednego programu z jednego stanu startowego i jednego ziarna, przy tych samych wejściach czasu realnego, dają to samo przejście minuta po minucie. |
| `simulation-randomness/1` | Żaden plik symulacji nie losuje z innego źródła niż generator zasiany ze stanu przejścia. |

Review when for rows 1, 3, 4: `none` (none rests on a prediction). Rows 1, 3, 4 verified at level 2.

## Guards (base = merge-onto = 1701186)

decisions: 4 errors, 4 warnings, 0 unchecked — all `*Approved by* is the placeholder merge of <request link>` (D-03/2, D-09/1, D-10/1, D-11/1). Expected by construction: the cycle swaps the placeholder. No relation-fingerprint error, so D-04@ecd038e3 is current.

glossary: 0 errors, 0 warnings, 0 unchecked.

invariants: 2 errors, 2 warnings, 0 unchecked — `map-run-repeatability/1` and `simulation-randomness/1`: *Derives from* holds `TODO`, which a merge onto the main branch does not take. This is NOT one of the expected interim states (see questions). No complaint about `browser-view-framework/1`'s `D-03@fb5aa3b0`: D-03's binding part is unchanged.

## Collisions found

1. WAY-104 (pinned the-way): a domain word that is the last word of a term of the-way's glossary takes a qualifier in `foundations/`. "map" (part map), "action" (human action), "choice" (open design choice). The approved projected wording, written verbatim, uses bare "map" (`map run` definition; D-08/1) and "action" (`program rule`), and "the player's choices" (D-04/3). The row wording says "game map" and "an action the character is carrying out". No guard checks this; it is level 2.
2. D-04/3: the projected *Rationale* and *Rejected* were written whole under *Rationale for change*. WAY-19 says that *Rationale for change* describes only this change. The parts that do not are the sentence "text code and tests…" and "Godot — …".
3. D-11/1 "a map run the player starts" also covers the first map run of an earning loop, if the player starts it. The projected "How fast does the earning loop go?" (one game minute per real minute) will collide with it when it is written. Fast-forwarding of manual map runs collides with it too. Both are later work. Nothing collides today.
4. `simulation-randomness/1` says "the generator" (singular), while the projected randomness decision says there is one generator per kind of draw. That is the approved wording, but a check author may read it narrowly.

## Questions

- Q-A: The TODO in *Derives from* blocks the merge. The options: (a) write the randomness decision now, outside item 3; (b) name D-04@ecd038e3 in *Derives from*: pure functions give repeatability, but the change to the approved wording needs re-gating; (c) accept that the request cannot merge until task 18.
- Q-B: WAY-104 wording (collision 1): accept it as approved, or make a qualified editorial correction with re-approval?
- Q-C: D-04/3 *Rationale for change* (collision 2): keep it whole, or cut it to this change?
- Q-D: The rows' *Rationale* are my wording of the task answers. That applies most to D-10/1, where the source gives no explicit reason. Please check them.
- Q-E: Invariants are derivable for rows 3 and 4 (the template allows level 2 only when none can be derived). Should the cycle add them?
- The critique of the full set (way_of_working) was not run: it is outside the allowed skills.

# Round 2 — after rulings R-A to R-E

- Commit: e7770cb4114bd5897ea09ea2c20ee01cca8882e9 (new commit on top of 3c2a5d9, not pushed), files foundations/decisions.md, foundations/invariants.md

## Changes

- R-C: D-04/3 *Rationale for change* and *Rejected* are cut to this change. Dropped: "text code and tests give the most leverage…" and the Godot rejection. Binding part unchanged (ecd038e3).
- R-A: parts of projected decisions, each *Approved by* `Mariusz, merge of <request link>`, *Origin* adds the full approved entry in the definition:
  - D-12/1 "Where does the simulation's randomness come from?" (Scope simulation; level 1 map-run-repeatability · simulation-randomness, level 2 for the seed; fingerprint 4e289de6). pl: Każde losowanie symulacji pochodzi z generatorów zasianych ziarnem ze stanu przejścia, po jednym na rodzaj losowania (m.in. układ mapy i wędrówka); układ mapy losuje się na starcie, przed pierwszą minutą gry, w ustalonej kolejności; restart zachowuje ziarno, każde inne przejście bierze nowe. Dropped: attacks, gathering, the earning-loop clause; Verification's wolf and earning-loop examples; Rationale on attacks, catch-up, combat; Rejected's firing counter and attacks (rewritten without them).
  - D-13/1 "How does a character act by its program?" (Scope simulation, browser-view; level 2; 70d1cb2d). pl: Postać działa wyłącznie według programu: w każdej wolnej minucie gry wykonuje pierwszą regułę programu, której warunek zachodzi, a akcja jest wykonalna; warunki z zamkniętej listy, nigdy wyrażenia; gracz nie wykona akcji ręcznie. Dropped: rule groups, one level deep, the item-piece sentence; repertoire, rule-group and eating examples (examples adapted: closed list, "explore now"); the rule-group rationale; rejected combat editor and nested groups.
  - D-14/1 "What is a map made of?" (Scope simulation; derives from D-12@4e289de6; level 2; fingerprint not needed). pl: Mapa to siatka sześciokątnych kafelków, której wymiary, wejście, koszt ruchu i zasoby (gęstość, zapas na kafelek, czas odnowienia sztuki) stoją w danych mapy; czego nie ma na liście zasobów, nie da się tam odsłonić; co leży na którym kafelku, losuje przejście ze swojego ziarna w granicach mapy. Dropped: "fixed, or drawn by the map run", attacking creatures, "no time meaning a resource that does not renew", "gathered"; the Las — głębiej example; the rationale sentence on a resource running out.
  - D-15/1 "How does a character move?" (Scope simulation; derives from D-13@70d1cb2d; level 2). pl: Ruch na sąsiedni kafelek jest zwykłą akcją, po której program wybiera regułę od nowa; eksploracja odsłania kafelek postaci, nie da się jej powtórzyć na odsłoniętym i nie przynosi przedmiotu. Dropped: the gathering clause; "backpack" in the violates example; the rationale's attack and practice clauses.
  - D-16/1 "How does a program point at things of the world?" (Scope simulation, browser-view; level 2). pl: Program wskazuje rzecz świata wyłącznie jako najbliższą znaną swojego rodzaju, liczoną w minutach gry drogi, nigdy numerem. Dropped: the campfire sentence; campfire examples, rationale and rejection (rewritten for tiles: my wording).
- Invariants `map-run-repeatability/1` and `simulation-randomness/1`: *Derives from* D-12@4e289de6.
- R-E: D-10/1 level 1 — action-in-progress (fingerprint d3085ad5); D-11/1 level 1 — player-map-run-pace, plus level 2 for the player's pause control (6032a520).
  - `action-in-progress/1` (Part simulation; Derives from D-10@d3085ad5): "An action the character is carrying out lasts its full duration, even where the program changes or the condition of another program rule comes to hold before it ends." pl: Akcja, którą postać wykonuje, trwa pełny czas, nawet gdy program się zmieni albo warunek innej reguły zacznie zachodzić przed jej końcem.
  - `player-map-run-pace/1` (Part simulation; Derives from D-11@6032a520): "Real time passed to the simulation for a map run the player starts moves the map run on by one game minute for each whole real second passed while it is not paused, and by no game minute for real time passed while it is paused." pl: Czas realny przekazany symulacji dla przejścia uruchomionego przez gracza przesuwa je o minutę gry na każdą pełną sekundę przekazaną, gdy nie jest wstrzymane, a o żadną, gdy jest wstrzymane.

## Guards (base = merge-onto = 1701186)

- decisions: 9 errors and 9 warnings, all the `<request link>` placeholder (D-03/2, D-09/1–D-16/1). Expected.
- glossary: 0/0/0.
- invariants: 2 errors — "action-in-progress/1: *Part* names `simulation`, which is not a part of the part map" and the same for player-map-run-pace/1. They are of the same class as the Scopes naming `simulation`, and foundation step 2 clears them. This time they come from the invariants guard. Part `every` would avoid them.

## WAY-104: bare domain words (entry — word — the-way term)

Approved wording, or a part of it:
- D-04/3 binding — "the player's choices" — open design choice
- D-08/1 binding "maps", "A map"; rationale "map" — part map
- D-12/1 binding "the map's layout", "its map's layout"; verification "layout of the map", "the map's layout" — part map
- D-13/1 binding "whose action", "an action by hand"; rationale "an action by hand", "order of actions" — human action; rationale "end a map" — part map
- D-14/1 heading and binding "A map", "the map's data", "the map's list", "the map sets"; verification "a new map", "the maps' data", "a map with", "a map of"; rationale "the map's settings", "first map"; rejected "per map" — part map
- D-15/1 binding "ordinary action", "any action" — human action
- `map run` definition "one map" — part map
- `program rule` definition "an action" — human action

My wording uses qualifiers: "game map" in D-09/1, `restart` and D-16/1; "an action the character is carrying out" and "the character's action" in D-10/1 and `action-in-progress/1`. "map run" is the term itself and was not counted.

## Questions

- Q-F: Should the two new invariants keep Part `simulation`, which leaves the invariants guard failing until step 2, or use `every`?
- Q-G: D-16/1's rationale and rejection, and the examples in D-12/1, D-13/1 and D-15/1, are my adaptations. The approved ones name things that are not in the game yet. The assessment should read them.
