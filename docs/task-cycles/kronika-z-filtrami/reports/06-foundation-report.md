# Report 06 — the foundation step (plan's *Foundation entries*, F1–F19)

## Status

**done with concerns** — every row F1–F19 is written, tied or decided; the concerns are listed under
*Notes for the orchestrator* (none blocks a slice, none is a question for the human).

## Commits (branch `task/kronika-z-filtrami`, range `6f36c7a..3ea46e8`)

| Commit | What |
|---|---|
| `0bb4be9` | glossary term `chronicle` (F1) |
| `894f9d5` | D-338 (F2), D-339 (F3) |
| `822d512` | D-340 (F4), D-341 (F5), D-342 (F6), D-343 (F7 + F8), D-344 (F9), D-345 (F10) |
| `36c7b3e` | D-346 (F11), D-347 (F13) |
| `d4b546f` | D-04 change (F12) |
| `16b6dc5` | D-122 change (F14) |
| `0bd3995` | D-147 change (F15) |
| `3ea46e8` | D-311 change (F16), D-185 (F17), D-272 (F18), D-19 (search finding) |

Files changed: `foundations/decisions.md` +366 −46; `foundations/glossary.md` +6 −0. Files added
by path only (`git add foundations/…`). The author address of the commits is `mariusznn@gmail.com`,
the one this repository's earlier task commits carry and the worktree's git configuration gives
(the git configuration of the main checkout); the handoff said a noreply address was configured — it is
not, and only the GitHub merge commit `6f36c7a` carries the noreply address. Nothing was changed.

## Entries as they stand at `3ea46e8` (for the executors of the slices)

Ranges are lines of `foundations/decisions.md` (or `foundations/glossary.md`) at `3ea46e8`.

| Row | Entry | Range | Mark |
|---|---|---|---|
| F1 | glossary `chronicle` (new) | glossary.md 248–252 | `projected` |
| F2 | D-338 — What does the chronicle of a map run hold? (new) | 7380–7401 | `projected` |
| F3 | D-339 — Where does the chronicle of a map run live, and what of it stands after a load? (new) | 7402–7442 | `row 1` |
| F4 | D-340 — Which actions of the character give an entry of the chronicle, and how does it read? (new) | 7443–7472 | `row 2` |
| F5 | D-341 — When does a loss of the streak give an entry of the chronicle, and how does it read? (new) | 7473–7502 | `row 3` |
| F6 | D-342 — Which changes of the program give an entry of the chronicle, and how does it read? (new) | 7503–7536 | `row 4` |
| F7, F8 | D-343 — How does the chronicle stand in the right area, and how does the player filter it? (new) | 7537–7570 | `row 7`, `row 8` |
| F9 | D-344 — What does the kind „Świat” of the chronicle hold, and how do its entries read? (new) | 7571–7604 | `row 9` |
| F10 | D-345 — What does the entry of a discovery say in the chronicle? (new) | 7605–7629 | `row 10` |
| F11 | D-346 — How long does the pick of „Kronika” or „Teren” hold on the screen of a map run? (new) | 7630–7654 | `row 14` |
| F12 | D-04 (change) | 52–125 | `projected` |
| F13 | D-347 — How does an agent learn what went wrong in the running game? (new) | 7655–7682 | `projected` (the part this task makes true; the rest tied, below) |
| F14 | D-122 (change) | 2220–2264 | `projected` |
| F15 | D-147 (change) | 2792–2806 | `projected` (transitional wording) |
| F16 | D-311 (change) | 6696–6750 | `projected` (transitional wording) |
| F17 | D-185 (change) | 3376–3388 | `the cycle's` |
| F18 | D-272 (change of a *Verification* example) | 5706–5732 | `the cycle's` |
| F19 | D-276 — not changed | — | — |
| — | D-19 (change of a *Verification* example; search finding) | 414–442 | `the cycle's` |

The beyond-the-row parts of the projected and row entries that I worded from the work — the
*Verification* examples of every new decision, the *Relations*, and the added *Rationale* and
*Rejected* sentences of D-04, D-147 and D-311 — are listed under *Choices*; the request should put
them before the human with the entries.

## Meaning of each entry

- **F1 `chronicle`.** EN: the chronicle is the record a manual map run keeps for the player to read,
  each entry with its game minute, not the events a simulation function returns. PL: kronika to
  zapis przejścia ręcznego dla gracza, każdy wpis z minutą gry, a nie zdarzenia zwracane przez
  funkcję symulacji.
- **D-338 (F2).** EN: a manual map run keeps a chronicle of discoveries, actions, combat, the
  player's changes and each loss of the streak with its cause, each entry with its game minute,
  which the player filters by kind in the right area. PL: przejście ręczne prowadzi kronikę odkryć,
  czynności, walki, zmian gracza i utrat passy z przyczyną, każdy wpis z minutą gry, a gracz filtruje
  ją według rodzajów w prawym obszarze.
- **D-339 (F3).** EN: the chronicle lives in the memory of the page, never in the game state or the
  save, survives leaving the screen, and after a load starts from the paragraph of the last
  encounter alone, every other earlier entry lost. PL: kronika żyje w pamięci strony, nie w stanie
  gry ani w zapisie, przetrwa wyjście z ekranu, a po wczytaniu gry zaczyna się od samego akapitu
  ostatniego starcia, a reszta wpisów przepada.
- **D-340 (F4).** EN: the start of each action gives an entry in the words of „Teraz” (the rule's
  row), with no rule number and no outcome, and a wait gives one entry when it starts. PL: start każdej
  czynności daje wpis słowami „Teraz” (wiersza reguły), bez numeru reguły i wyniku, a czekanie daje
  jeden wpis, gdy się zaczyna.
- **D-341 (F5).** EN: a loss of the streak gives an entry only when a streak above zero falls to
  zero, „Passa {passa} przerwana: {przyczyna}” in `danger`, with five causes, two entries in the
  minute of a change of the program, none for lost health at a streak of zero. PL: utrata passy daje
  wpis tylko przy spadku passy większej od zera do zera, „Passa {passa} przerwana: {przyczyna}” w
  `danger`, z pięcioma przyczynami; przy zmianie programu dwa wpisy w tej samej minucie, przy passie
  zero żadnego.
- **D-342 (F6).** EN: each change of the copy gives an entry in `player-change` with the rule's
  number and sentence or the group's name, also after the end until „Restart” or „Zakończ”, and an
  edit of a saved program gives none. PL: każda zmiana kopii daje wpis w `player-change` z numerem i
  zdaniem reguły albo nazwą grupy, także po końcu przejścia do „Restart” albo „Zakończ”, a edycja
  zapisanego programu wpisu nie daje.
- **D-343 (F7, F8).** EN: a row of seven filter buttons in the look of the pace buttons, one picked,
  „Wszystko” at a send; entries newest on top, the minute alone in a `text-label` column, on
  `panel`, coloured by kind; an empty list reads „Nic tu jeszcze nie ma.”. PL: rząd siedmiu
  przycisków filtra w wyglądzie przycisków tempa, jeden wybrany, „Wszystko” przy wysłaniu postaci;
  najnowszy wpis u góry, minuta w kolumnie `text-label`, tło `panel`, kolor według rodzaju; pusta
  lista mówi „Nic tu jeszcze nie ma.”.
- **D-344 (F9).** EN: a sixth kind „Świat” with its own filter holds „Ognisko wygasło”, the death
  and the completion in the words of „Teraz”, the completion in `positive`, the others in `text`.
  PL: szósty rodzaj „Świat” z własnym filtrem: „Ognisko wygasło”, śmierć i rozwiązanie słowami
  „Teraz”, rozwiązanie w `positive`, reszta zwykłym tekstem.
- **D-345 (F10).** EN: the discoveries of one game minute give one entry with the whole text of the
  band, without its buttons, the sentence of the rule the game wrote included. PL: odkrycia jednej
  minuty dają jeden wpis z całym tekstem pasa bez przycisków, ze zdaniem o regule dopisanej przez
  grę.
- **D-346 (F11).** EN: the tab „Kronika” or „Teren” the player picks stays picked through the whole
  map run, leaving the screen and „Restart” included. PL: wybór zakładki „Kronika” albo „Teren”
  trzyma się przez całe przejście, także po wyjściu z ekranu i po „Restart”.
- **D-04 (F12).** EN: the browser view may draw the chronicle, as the scene, also from its previous
  reading of the game state and the events the simulation returned. PL: widok może rysować kronikę,
  tak jak scenę, także z poprzedniego odczytu stanu gry i zdarzeń zwróconych przez symulację.
- **D-347 (F13).** EN: an agent learns what went wrong from what a player reads — the screen and the
  chronicle — and from the browser's console, through the browser it operates, with no outside
  service. PL: agent dowiaduje się, co poszło nie tak, z tego, co czyta gracz — ekranu i kroniki — i
  z konsoli przeglądarki, przez przeglądarkę, którą obsługuje, bez zewnętrznej usługi.
- **D-122 (F14).** EN: what the band of a discovery named enters the chronicle, which keeps it after
  the player goes on. PL: to, co nazwał pas odkrycia, trafia do kroniki, która trzyma to po
  wznowieniu.
- **D-147 (F15).** EN: the paragraph of the last encounter stands as an entry of the chronicle at
  the game minute of the attack, adding the turns as they come, through a load too. PL: akapit
  ostatniego starcia stoi jako wpis kroniki w minucie napaści, dopisuje tury i stoi także po
  wczytaniu gry.
- **D-311 (F16).** EN: the right area holds the chronicle or the table under the tabs „Kronika” and
  „Teren”, „Kronika” picked at a send, and the world area holds no paragraph of the last encounter.
  PL: prawy obszar trzyma kronikę albo tabelę pod zakładkami „Kronika” i „Teren”, „Kronika” wybrana
  przy wysłaniu postaci, a obszar świata nie ma akapitu ostatniego starcia.
- **D-185 (F17).** EN: the line of what a completion deposited stands under the scene and above the
  body row, with no mention of the paragraph. PL: linia „Do skrzynki” stoi pod sceną i nad wierszem
  ciała, bez wzmianki o akapicie starcia.
- **D-272 (F18).** EN: the example of text on a solid background under the scene is now „Teraz” and
  „Potem”, not the paragraph. PL: przykład tekstu na pełnym tle pod sceną to teraz „Teraz” i
  „Potem”, nie akapit starcia.
- **D-19 (search finding).** EN: the example of hovering linking a tile and its row of the table
  holds while „Teren” is picked. PL: przykład podświetlenia kafelka i wiersza tabeli obowiązuje,
  gdy wybrana jest zakładka „Teren”.

## How F2–F11 were divided (the orchestrator's note)

By the decisions' template — one decision answers one question, in one to three binding sentences —
the rows stand in decisions of their own, not in F2: the approved sentence of F2 alone already takes
two sentences, and rows 2, 3, 4, 9 and 10 each answer a question a person would ask on its own
(„which actions give an entry”, „when does a loss of the streak give one”, …). Rows 7 and 8 answer
one question, how the chronicle stands and is filtered, so they share D-343. F2's approved
sentence, *Rationale* and *Rejected* stand in D-338 whole and unchanged. Each row decision is written
whole from its accepted row, its *Rejected* from the *Not chosen* of the question its row names.

## F13 — the part tied, not written again

The search of the whole foundation found no entry with the heading of F13. Its second binding
sentence, „An exception in the game shows on the screen as a sentence that something broke and goes
to the console.”, is already stated, more exactly, by D-323 (the sentence „Coś w grze się zepsuło —
odśwież stronę.” and the last whole state saved) and D-253 (the page's last-resort handler writing
one line of the error to the console), with `guidelines/coding.md` („Recording a failure”). It gets
no second entry: D-347 holds the first sentence whole, now true with this task's chronicle, and its
*Rationale* names D-323 and D-253 for how an exception shows. From the approved *Rationale* I left
out two parts that are D-323's: „Today an exception stops the game without a word, for a person as
for an agent.” (no longer true since D-323) and the risk „the sentence may show with no fault or
blink” (D-323's *Rationale* holds it). The request should name D-347 together with D-323 and D-253.

## F17–F19 — what the writer decided

- **F17, D-185:** changed. The clause „and the last-encounter paragraph when present” goes, since
  the paragraph is never present in the world area after D-147 and D-311; the *Rationale* loses
  „even when a long encounter places it further below the scene”, and *Relations* loses `derives
  from D-147`, which no longer bears on where the line stands. Kept: changing it costs nothing and
  stops Slice 5 reading the clause as a paragraph that may still stand in the world area.
- **F18, D-272:** the *Verification* example now reads „„Teraz” and „Potem” on the solid background
  under it” in place of the paragraph.
- **F19, D-276:** left unchanged. D-311's new sentence uses the word „tabs” in D-276's sense, so the
  second place of tabs is stated there; D-276's „The switch of the login card stands as tabs” stays
  true. Slice 6 records the second place in the styleguide, as the plan gives for this case.

## Foundation check

- `python -B .the-way/elements/common/foundation_check.py` from the worktree root, before any entry:
  exit 0, `0 errors`.
- The same after each entry or group, and after the last commit `3ea46e8`: exit 0, `0 errors`.

No test of the product was run (the handoff gives none to this step).

## Own-work check

- Requirement I was most likely to miss: a row's meaning written incompletely or reworded away —
  a word of the task (a cause, a button, a wording) missing from its entry.
- Check: each literal the rows carry, searched in the added lines of
  `git diff 6f36c7a..HEAD -- foundations/decisions.md`, and the wrapped ones in the file with line
  breaks read as spaces: „Czeka — żadna reguła nie pasuje”, „Passa {passa}”, „zdrowie spadło od
  zimna i głodu”, „przełączenie na inny program”, „Porzucono zmiany kopii”, „Przełączono postać na
  program”, „Zapisano kopię jako nowy program”, „Zmieniono plan wyprawy”, „Nic tu jeszcze nie ma.”,
  the seven filter names, „Ognisko wygasło”, „Las — głębiej rozwiązany”, „Gra dopisała regułę w
  grupie „{nazwa grupy}””, „through „Restart””, „for the scene and the chronicle”, „what it named
  enters the chronicle”, „a load of the saved game state”, „„Kronika” picked when the character is
  sent”. Result: every one found (the first pass showed 0 for three of them, which were wrapped
  across lines; the second pass on the file with line breaks read as spaces found each once).
- Also checked: no `should`, `will` or RFC 2119 keyword in an added line (none found); no binding
  part longer than three sentences.

## Reaches beyond the handoff

- `.the-way/foundations/decisions.md`, WAY-03 — the decisions' example the element's `examples.md`
  names (step 1 of the element skill).
- `.the-way/foundations/glossary.md`, the list of terms and `entry` — the-way's glossary (WAY-226),
  to see whether a word of the new entries is a word of the process; „entry” is, so in sentences of
  my own I wrote „an entry of the chronicle” where the bare word could be read as a foundation
  entry, and kept the approved sentences of D-338 and `chronicle` as approved, where the context
  reads only one way.
- `foundations/decisions.md`, D-252, D-253, D-254 — the search for F13 (WAY-33).
- `foundations/decisions.md`, D-19 and D-282 — found by the search for „right area” and „table of
  revealed tiles”; D-19 changed (above), D-282 stays true.
- `the project definition in the author's notes` (sha256 efc19197…,
  matches the task), lines 224–237, 284–297, 449–462, 629–642, 749–762, 1109–1122, 1426–1432 — the
  projected entries whole, since the task quotes D-04, D-122, D-147 and F13's *Rationale* only in
  part and *Scope* and *Origin* of F2 and F13 only there.
- `a research note on saving the game's state, in the author's notes`,
  its headings, cited addresses and § 4 „Konsola przeglądarki” — to fill F13's *Based on*, which
  the definition leaves `TODO`.
- `the folder of task notes in the author's backlog` — only to confirm the vault
  file name of the task, `kronika_z_filtrami_loop2.md`, which the new entries' *Origin* name.

## Choices made, with the way rejected and its cost if wrong

- **One decision per row, rows 7 and 8 together** (above). Rejected: rows 2–10 inside D-338 — the
  binding part would run far over three sentences and mix several questions. Cost if wrong: entries
  merged later; nothing in code depends on the split.
- **D-342 (row 4): „an edit of a saved program, which changes no map run, gives none”.** The row
  says „edycja innego zapisanego programu niż ten od kopii”; I wrote the reading the reviewed spec
  writes down (D5) and the plan's F6 gives, which follows from the row's own „Każda zmiana kopii” and
  from the reason in question 4 („bo przejścia nie zmienia”). Rejected: the row's narrower words
  alone — a reader could take an edit of the copy's own saved program as giving an entry. Cost if
  wrong: one clause of D-342.
- **D-343 (row 7): „„Wszystko” picked when the character is sent to the map”** for „na starcie” — the
  same wording D-311 gives „Kronika”. That the filter, too, is kept through „Restart” is the spec's
  reading (D9), not the task's, so no entry says it; the code may keep it as the spec gives. Rejected:
  writing that the filter holds through „Restart” — a meaning the task did not settle (WAY-172).
- **D-340 (row 2): the wait „gives one entry of the same kind”** — the task's question 2 counts the
  wait among the actions („wychodzi szerzej niż „the character's actions””), so it stands under
  „Czynności”.
- **D-341 (row 3): the causes written whole** („zdrowie spadło od głodu”, „zdrowie spadło od zimna i
  głodu”), as the spec's D3 reads the task's „… od głodu”.
- **`chronicle`, *Not*:** the approved meaning kept whole, with ` — "events"` added as what carries it,
  which the glossary template asks of every *Not* item and the approved text lacked.
- **D-347 *Based on*: `none`.** The definition left it `TODO`; the report behind it rests the console
  reading on Playwright's `browser_console_messages` and `consoleMessages`, behaviour of a tool the
  process uses, which by the template would be an environment fact. I did not write one: the plan
  writes no environment fact, and D-347 reaches the browser through D-254 (*Relations*: derives from
  D-254), whose own *Based on* holds the Playwright facts. Cost if wrong: a later change to how
  Playwright reads the console would not find D-347 by its *Based on*; the return step can add an
  environment fact (source: `technologia_zapis_dzialania_gry.md` § 4) and name it.
- ***Relations* of the new decisions** (the source had `TODO` or nothing): each row decision derives
  from D-338, plus the decision whose words or roles it reuses (D-334, D-39, D-40, D-130, D-131,
  D-132, D-173, D-292, D-122, D-312); D-346 derives from D-311; D-347 from D-254; D-147 gains
  `derives from D-338`. No `narrows`: no collision found.
- ***Verification* of the new decisions**: pairs of examples I wrote from the task's own examples;
  no invariant is named (none derives from them; the plan writes none).
- **D-04**: one *Rationale* sentence on why the chronicle, like the scene, reads the previous reading
  and the events and stays out of the save; one complies and one violates example widened to the
  chronicle; *Origin* gains the task.
- **D-122**: the binding clause and the *Rationale* sentence as the projected entry words them; the
  *Accepted with it* clause „a player who goes on at once loses the list of discoveries, since the
  game keeps no record of them” removed, since this change makes it untrue (spec, to check). The
  rest of D-122 (the completion case, „Wznów”) stays as task 14 left it.
- **D-147**: the two first sentences exactly as the task gives them; the third („Teraz” in combat)
  unchanged. Added: a *Rationale* sentence („Facts the game state keeps stand after a load, so the
  paragraph does too”), the accepted cost of question 5 (on Las — głębiej the first encounter is not
  in the chronicle), three ways not chosen from question 5 in *Rejected*, and examples. The
  apostrophes of the replaced sentences are now straight, as in the task's wording.
- **D-311**: the two first sentences exactly as the task gives them; the header sentence unchanged.
  The *Verification* examples rewritten for the tabs, the chronicle and „✕” bringing back the tab
  picked. *Rationale*: „so they do not move as the paragraph of the last encounter grows with each
  turn” and „the paragraph of the last encounter two rows further from the scene” removed as no
  longer true, and the reasons and costs of questions 5 and 6 added. *Rejected*: the item „„Teraz”
  and „Potem” under the paragraph of the last encounter … — they move down at each attack as the
  paragraph grows” kept, since it describes a weighed layout whose cost holds for that layout;
  questions 6 (B, C) and 5 (part 1, B) added.
- **D-19** (not in the plan): the search found that hovering links a tile and its row of the table
  only while „Teren” is picked, the cost the task accepted in question 6; the binding sentence stays
  true, so only its complies example gains „while the tab „Teren” … is picked (D-311)”.

## Notes for the orchestrator

1. The candidate for the return step the plan names stands: whether the two new events of the
   simulation (Slices 1 and 2) bind later work enough for an entry. A second candidate: an
   environment fact for Playwright's reading of the console, named in D-347's *Based on* (above).
2. The plan's slices name entries by the base's ranges; the ranges at `3ea46e8` are in the table
   above (for example D-147 is now 2792–2806, D-311 6696–6750, D-185 3376–3388, D-272 5706–5732).
3. The handoff's address of the author (noreply) does not match the configuration; the commits carry
   `mariusznn@gmail.com`, as the repository's earlier task commits do. Nothing was rewritten.

## Searches not found or unclear

- An entry with the heading or the question of F13 — not found; its second sentence found stated by
  D-323 and D-253 (tied above).
- An environment fact for Playwright reading the browser's console — not found among the facts of
  `foundations/environment_facts.md`.
- A withdrawn-numbers list in `foundations/decisions.md` — none; D-338 was the next free number.
- The rationale of row 14 (why the tab holds through „Restart”) — not given by the task beyond the
  costs of question 6; D-346's *Rationale* first sentence is my wording of what the rule does for
  the player, not a quoted reason.
- Which filter the wait's entry stands under — the task says it only through question 2's „wychodzi
  szerzej niż „the character's actions””; read as the actions kind (above).
