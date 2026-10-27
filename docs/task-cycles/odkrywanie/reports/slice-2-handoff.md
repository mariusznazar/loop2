# Handoff — executor of slice 2, task cycle odkrywanie

## Delegation

The human (Mariusz) started this the-way task cycle and delegated every intermediate choice to the
cycle's orchestrator. You answer to the orchestrator, never to the human; send questions back in
your report with the status `questions` and do not start any other stage or slice.

## Your stage

- Method: the project skill `the-way-make-change` (pinned the-way at `.the-way`, commit 574a37b),
  as the executor of planned slice 2. Read it and what it names whole.
- Worktree (only place you write): `C:/Storage/repos/loop2/.runs/worktrees/odkrywanie`, branch
  `task/odkrywanie`. No other agent writes there while you work. Commit your work on that branch
  by explicit paths (`git add <path> …`, never `git add -A`, `git add .` or `git commit -a`),
  commit messages in English. Leave the worktree clean.
- Boundary: make only this slice, as its section below gives; change the files of its *Change*.
  Where the slice needs a file outside *Change*, an open design choice, or proves too large,
  return as your method gives (`returned`, no code for a design choice).
- Frozen task: `.runs/task-cycles/odkrywanie/task.md` (copy of the vault document
  `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/_zadania/odkrywanie_loop2.md`, accepted
  2026-10-26). A test comment locating a documentary expectation names the vault file
  `odkrywanie_loop2.md` and its line (D-82); the frozen copy has the same lines.
- No spec. Trust boundary: no. Irreversible operation: no.
- The foundation entries of this task are already written (commit dcd529d): the rows of
  *Settlements to record* stand as O1 → D-123, O2 → D-122, O3 → D-71 (changed), O4 →
  player-map-run-pace, O5 → minute-span-split, O6 → D-124, O7 → D-125, O8 → D-126, O9 → D-121;
  the projected entries as D-118 (when the player learns what the world holds), D-119 (whose is the
  knowledge), D-120 (what an archetype opens); terms predisposition, archetype, Understanding,
  repertoire in `foundations/glossary.md`; program-rule-pick's sentence changed. Write no
  foundation entry; a foundation entry that no longer matches the code goes into your report.
- Checks already failing on the base d9a2374 (`.runs/task-cycles/odkrywanie/reports/00-baseline-gate.log`),
  environment, not this task: `test_loop2_one_serving_process` setUpClass (Get-NetTCPConnection
  finds no Listen objects), `test_ruff_source_rules` and `test_shellcheck_source_rules`
  (FileNotFoundError: ruff and shellcheck are not installed on this machine). `npm test` stops
  at the Python stage because of them, so after `npm test` also run
  `python -B .the-way/elements/common/foundation_check.py` on its own. Name every check that
  failed or did not run; an unrun check is unchecked, never passed.
- Report: write your full report to `.runs/task-cycles/odkrywanie/reports/slice-2-report.md`,
  as your method gives: each check with its exact command and exit code, the own-work check, every
  reach beyond this handoff, questions and concerns. Return only: your status (`done`,
  `done with concerns`, `questions`, `returned` or `blocked`), your commits, a one-line check
  result naming what failed or did not run, and the report's path.


## Your slice — `.runs/task-cycles/odkrywanie/plan.md`, copied word for word

### Slice 2 — the Understanding in the game state and the repertoire computed from it

- **Goal:** The game state holds the Understanding, and the simulation computes from it the repertoire; nothing is gated by it yet. In detail:
  - `src/browser/sim/types.ts` gains the type of the Understanding — the discovered actions, conditions and items by their data identifiers, the campfire under the identifier Slice 1 gave it — and `GameState` a field `understanding`, one for the whole game and every character; `newGame()` gives an Understanding holding the condition "Zawsze" alone; `createCharacter`, `send`, `restart`, `end`, `setPaused`, `setProgram` and death leave it as it is;
  - a new simulation module `src/browser/sim/understanding.ts` exports: the Understanding of a new game; the repertoire computed from an Understanding and a list of predispositions — an action of the Understanding is in it where a skill among the predispositions grows it or no skill grows it; a condition and an item of the Understanding are in it whatever the predispositions; an action or a condition naming a resource or an item ("Idź", "Zbierz", "Tu leży mniej niż", "Zapas poniżej") is in it with each target the Understanding holds; the repertoire is never saved; whether a program rule — its condition, its action and their targets — lies in a repertoire; the program reduced to a repertoire: the same groups and rules, with their identities, less every rule outside the repertoire and every group whose condition lies outside it, which is passed over as a group whose condition does not hold; and the repertoire of the program the editor shows (Q-C1): the repertoire of the archetype of the character in the map run during one, otherwise of the archetype every created character takes (`CREATED_ARCHETYPE`), the archetype's predispositions read from its data;
  - `stryker.config.json` lists the new test file.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/understanding.ts` · `src/browser/sim/game.ts` · `tests/sim/repertoire.test.mjs` · `stryker.config.json`
- **Read:** `.runs/task-cycles/odkrywanie/plan.md:33-48` Slice 1 · `.runs/task-cycles/odkrywanie/task.md:14-37` To do · `.runs/task-cycles/odkrywanie/task.md:67-69` Questions to settle, 8 · `.runs/task-cycles/odkrywanie/task.md:80-82` Questions to settle, 12 · `.runs/task-cycles/odkrywanie/task.md:96-99` Context, loop2 code · `.runs/task-cycles/odkrywanie/task.md:113-147` Decisions in play · `.runs/task-cycles/odkrywanie/reports/01-planner-handoff.md:44-57` The orchestrator's answers at start ·
  `foundations/decisions.md:57-93` D-04 · `foundations/decisions.md:356-374` D-18 · `foundations/decisions.md:466-501` D-23 · `foundations/decisions.md:720-734` D-35 · `foundations/decisions.md:966-984` D-51 · `foundations/decisions.md:1070-1096` D-56 · `foundations/decisions.md:1560-1578` D-90 · `foundations/decisions.md:1579-1596` D-91 · `foundations/invariants.md:210-221` simulation-isolation · `foundations/invariants.md:222-231` simulation-inputs · `foundations/invariants.md:232-243` content-identifiers · `foundations/invariants.md:358-368` program-closed-lists · `foundations/invariants.md:592-601` mutation-test-selection · `foundations/glossary.md` · O8 · "When does the player learn what the world holds?" · "What does an archetype open to a character?" · "Whose is the knowledge of the world, and what may a character use of it?" · predisposition · archetype · repertoire · Understanding ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/program.ts` · `src/browser/sim/data/archetypes.ts` · `src/browser/sim/data/actions.ts` · `src/browser/sim/data/conditions.ts` · `src/browser/sim/data/items.ts` · `src/browser/sim/data/campfire.ts` · `tests/sim/program-fixture.mjs`
- **Model:** same — it decides the shape of the Understanding and of the repertoire that every later slice reads.
- **Risk:** none
- **Checks:** first the failing cases of `tests/sim/repertoire.test.mjs`: a new game's Understanding holds "Zawsze" alone; the mage's repertoire of an Understanding is that Understanding (all five skills); with a hand-written list of predispositions lacking a skill, the actions that skill grows leave the repertoire while "Wędruj", "Idź" and "Idź — ognisko" stay, and conditions and items stay; targets follow the items of the Understanding; a rule with a condition, an action or a target outside the repertoire lies outside it; the reduced program keeps identities and order and drops exactly those rules and groups; creating, sending, restarting and ending leave the Understanding unchanged. Then `npm test -- tests/sim/repertoire.test.mjs`, `npm test` (as Slice 1 gives for the base's three failures) and `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/understanding.ts"`, each surviving mutant classified in the report as `guidelines/testing.md` § Mutation testing gives.
- **Depends on:** Slice 1 · O8 · "When does the player learn what the world holds?" · "What does an archetype open to a character?" · "Whose is the knowledge of the world, and what may a character use of it?" · predisposition · archetype · repertoire · Understanding

## Foundation entries to read, each whole, at their current ranges in the worktree

Where a range differs from the plan's, the current one holds.

- D-04 — `foundations/decisions.md:57-93` (plan gave `foundations/decisions.md:57-93`)
- D-18 — `foundations/decisions.md:356-374` (plan gave `foundations/decisions.md:356-374`)
- D-23 — `foundations/decisions.md:466-501` (plan gave `foundations/decisions.md:466-501`)
- D-35 — `foundations/decisions.md:720-734` (plan gave `foundations/decisions.md:720-734`)
- D-51 — `foundations/decisions.md:966-984` (plan gave `foundations/decisions.md:966-984`)
- D-56 — `foundations/decisions.md:1070-1096` (plan gave `foundations/decisions.md:1070-1096`)
- D-90 — `foundations/decisions.md:1560-1578` (plan gave `foundations/decisions.md:1560-1578`)
- D-91 — `foundations/decisions.md:1579-1596` (plan gave `foundations/decisions.md:1579-1596`)
- simulation-isolation — `foundations/invariants.md:212-223` (plan gave `foundations/invariants.md:210-221`)
- simulation-inputs — `foundations/invariants.md:224-233` (plan gave `foundations/invariants.md:222-231`)
- content-identifiers — `foundations/invariants.md:234-245` (plan gave `foundations/invariants.md:232-243`)
- program-closed-lists — `foundations/invariants.md:361-371` (plan gave `foundations/invariants.md:358-368`)
- mutation-test-selection — `foundations/invariants.md:595-604` (plan gave `foundations/invariants.md:592-601`)
- O8 → D-126 — `foundations/decisions.md:2183-2207`
- When does the player learn what the world holds? → D-118 — `foundations/decisions.md:1990-2013`
- What does an archetype open to a character? → D-120 — `foundations/decisions.md:2040-2063`
- Whose is the knowledge of the world, and what may a character use of it? → D-119 — `foundations/decisions.md:2014-2039`
- predisposition — `foundations/glossary.md:106-111`
- archetype — `foundations/glossary.md:112-117`
- repertoire — `foundations/glossary.md:125-130`
- Understanding — `foundations/glossary.md:118-124`

## Guidelines and code to read

Guideline files whole. A range of code or tests that an earlier slice changed: find the place again by its name.

- `foundations/glossary.md`
- `guidelines/coding.md`
- `guidelines/coding-simulation-module.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`
- `src/browser/sim/program.ts`
- `src/browser/sim/data/archetypes.ts`
- `src/browser/sim/data/actions.ts`
- `src/browser/sim/data/conditions.ts`
- `src/browser/sim/data/items.ts`
- `src/browser/sim/data/campfire.ts`
- `tests/sim/program-fixture.mjs`

## Passages of the task, the plan and the orchestrator's answers its *Read* names, copied word for word

#### `.runs/task-cycles/odkrywanie/plan.md:33-48` — Slice 1

```text
### Slice 1 — skills, predispositions and the chain of revelations in data

- **Goal:** The data files of `src/browser/sim/data/` hold the five character skills of the task with the pairs of verb and target each grows, the predispositions of the elemental mage (all five), and for every action, condition and item of Las and for the campfire what reveals it, as the task's chain gives; nothing reads them yet. In detail:
  - a new data file `src/browser/sim/data/skills.ts` holds the catalogue of character skills — Eksploracja ("Eksploruj"), Zbieranie małych przedmiotów ("Zbierz", every target), Wytwarzanie ogniska ("Wytwórz — ognisko", "Zasil — ognisko"), Jedzenie ("Zjedz", every target), Rzucanie czaru Płomyk ("Zapal", every target: "Zapal — ognisko" and "Zapal — patyk") — each naming the actions of `ACTIONS` it grows; "Wędruj", "Idź" and "Idź — ognisko" stand in no skill;
  - the archetype's data in `archetypes.ts` gains its predispositions, a list of skills; the elemental mage has all five;
  - `actions.ts`, `conditions.ts`, `items.ts` and `campfire.ts` give each entry what reveals it, beside the entry, as one of the revealing events of the task's table: the first chill, the first finished exploration, a revealed tile holding the item (for the four items), the first gathered stick, the first crafted campfire, the first finished "Zapal" (of a campfire or a stick), the first gathered berry; "Zawsze" has none, since it is known from the start of a new game. The type of a revealing event stands in a new data file `src/browser/sim/data/revelations.ts`; the events name resources and items by their data identifiers, so no identifier of the content leaves the data (rule S2 of `tests/sim/rules.test.mjs`);
  - the campfire gets in `campfire.ts` the identifier under which the Understanding will record it as a discoverable thing, without becoming an item of the backpack (`ITEMS` and `Backpack` stay as they are).
- **Change:** `src/browser/sim/data/skills.ts` · `src/browser/sim/data/revelations.ts` · `src/browser/sim/data/archetypes.ts` · `src/browser/sim/data/actions.ts` · `src/browser/sim/data/conditions.ts` · `src/browser/sim/data/items.ts` · `src/browser/sim/data/campfire.ts` · `tests/sim/data.test.mjs`
- **Read:** `.runs/task-cycles/odkrywanie/task.md:14-37` To do · `.runs/task-cycles/odkrywanie/task.md:41-44` Questions to settle, 1 · `.runs/task-cycles/odkrywanie/task.md:57-59` Questions to settle, 5 · `.runs/task-cycles/odkrywanie/task.md:80-82` Questions to settle, 12 · `.runs/task-cycles/odkrywanie/task.md:84-102` Context · `.runs/task-cycles/odkrywanie/task.md:136-147` Decisions in play, projected entries · `.runs/task-cycles/odkrywanie/task.md:149-165` Settlements to record · `.runs/task-cycles/odkrywanie/reports/01-planner-handoff.md:44-57` The orchestrator's answers at start ·
  `foundations/decisions.md:356-374` D-18 · `foundations/decisions.md:705-719` D-34 · `foundations/decisions.md:1187-1201` D-63 · `foundations/decisions.md:1456-1468` D-82 · `foundations/invariants.md:210-221` simulation-isolation · `foundations/invariants.md:232-243` content-identifiers · `foundations/glossary.md:5-11` character skill · O9 · "When does the player learn what the world holds?" · "What does an archetype open to a character?" · predisposition · archetype ·
  `guidelines/coding.md` · `guidelines/coding-content-data.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/types.ts` · `src/browser/sim/data/resources.ts` · `tests/sim/rules.test.mjs:225-250`
- **Model:** same — it settles the shapes of the skills and of the revealing events that the repertoire, the discovery and tasks 8 and 9 read.
- **Risk:** none
- **Checks:** first the failing cases in `tests/sim/data.test.mjs`: the five skills with their actions and the mage's predispositions as To do 3 gives them; each revealing event of the table of To do 2 revealing exactly the actions, conditions and items of its row, every action and condition standing in exactly one row and "Zawsze" in none, and the campfire revealed by the first gathered stick; each expectation's comment naming `task.md` of the vault and its line (D-82). Then `npm test -- tests/sim/data.test.mjs` and `npm test`, failing nothing beyond the three failures of the base (`reports/00-baseline-gate.log`: `test_loop2_one_serving_process` setUpClass, `test_ruff_source_rules`, `test_shellcheck_source_rules`, tools missing on this machine).
- **Depends on:** O9 · "When does the player learn what the world holds?" · "What does an archetype open to a character?" · predisposition · archetype
```
#### `.runs/task-cycles/odkrywanie/task.md:14-37` — To do

```text
### To do

1. Gra trzyma Zrozumienie — zapis akcji, przedmiotów i warunków, które gracz odkrył — jako wiedzę gracza, jedną dla wszystkich postaci: to, co odkryje którakolwiek postać, wchodzi do niego dla wszystkich, a śmierć postaci, „Restart” i „Zakończ” go nie zmieniają. Nowa gra zaczyna Zrozumienie z warunkiem „Zawsze”; każda inna akcja, przedmiot i warunek wchodzi do niego przez odkrycie z punktu 2 (pytania 1 i 12).
2. Akcje, przedmioty i warunki Lasu wchodzą do Zrozumienia przez te odkrycia (pytanie 1):

   | Co odsłania | Co wchodzi do Zrozumienia |
   |---|---|
   | pierwsze wychłodzenie — pierwsza minuta gry, w której temperatura ciała jest poniżej progu wychłodzenia (35,0 °C, ten sam próg, od którego postać traci zdrowie, D-60) | akcje „Eksploruj”, „Wędruj”; warunek „Temperatura poniżej” |
   | pierwsza zakończona eksploracja | akcje „Idź” i „Zbierz”; warunki „Tu leży mniej niż” i „Zapas poniżej”; przedmioty leżące na odsłoniętym kafelku — każdy kolejny odsłonięty kafelek dokłada swoje |
   | pierwszy zebrany patyk | akcje „Wytwórz — ognisko”, „Zapal — ognisko”, „Zapal — patyk”; ognisko |
   | pierwsze wytworzone ognisko | akcja „Idź — ognisko”; warunki „Zostało mniej niż — ognisko” i „Z dala od — ognisko” |
   | pierwsze zakończone „Zapal” (ogniska albo patyka) | akcja „Zasil — ognisko” |
   | pierwsza zebrana jagoda | akcja „Zjedz — jagoda”; warunek „Sytość poniżej” |

   Mech i włókno wchodzą do Zrozumienia z eksploracją kafelka, na którym leżą, choć nie mają jeszcze użycia.
3. Repertuar postaci wylicza się ze Zrozumienia przez predyspozycje jej archetypu i nie jest zapisywany. W danych gry stoi pięć umiejętności postaci, każda z parami czasownik × cel, które hoduje (pytanie 5): Eksploracja — „Eksploruj”; Zbieranie małych przedmiotów — „Zbierz” (każdy cel); Wytwarzanie ogniska — „Wytwórz — ognisko” i „Zasil — ognisko”; Jedzenie — „Zjedz” (każdy cel); Rzucanie czaru Płomyk, umiejętność własna maga — „Zapal” (każdy cel). „Wędruj”, „Idź” i „Idź — ognisko” nie hoduje żadna umiejętność, więc są otwarte dla każdej postaci. Mag żywiołów ma w predyspozycjach wszystkie pięć umiejętności.
4. Edytor programu proponuje w listach warunków, akcji i ich celów repertuar postaci, a to samo wyliczenie rozstrzyga, co symulacja pozwala postaci wykonać. Regułę programu, której warunek, akcja albo cel nie należy do repertuaru postaci, symulacja pomija i przechodzi do następnej, jak akcję niewykonalną w tej minucie, a reguła zostaje w programie (pytanie 8). Wiersz ciała, plecak, lista odsłoniętych kafelków i rysunek mapy pokazują to, co pokazują dziś (pytanie 6).
5. Gdy coś się odsłoni, czas gry staje sam (pytania 3 i 11):
   - odkrycie zapada w kroku kolejności minuty gry (D-71), który je wywołał — wychłodzenie przy ciele, zakończona akcja przy jej skutku; reszta minuty dzieje się do końca, a wybór reguły na końcu tej minuty bierze już Zrozumienie i program po odkryciu, więc reguła wpisana przy odkryciu (punkt 6) może zadziałać jeszcze w tej minucie; w minucie śmierci skutek kończącej się akcji nie zapada (D-71), więc nie zapada też jej odkrycie;
   - czas staje po całej minucie, w tę samą pauzę co po „Pauza”: wiersz stanu dopisuje „ (pauza)”, a gracz rusza dalej przyciskiem „Wznów”; reszta czasu realnego przekazanego w chwili odkrycia przepada;
   - pod wierszem stanu staje linia tekstem w roli `discovery` z tym, co odsłonięto, słowami jak w kronice loop (`src/sim/sim.test.ts:633`, loop `cdc7c0d`) — przykład z materiału pytania 3: „Odkryto: Idź, Zbierz, Patyk, Jagoda. W regułach można teraz sprawdzić: Tu leży mniej niż … szt., Zapas poniżej … szt.”; kilka odsłonięć jednej minuty idzie w jednej linii; linia znika, gdy gracz ruszy dalej;
   - cykl przepisuje niezmiennik `player-map-run-pace` (odcinek czasu przerwany odkryciem nie przesuwa przejścia o każdą sekundę) i `minute-span-split` (odcinek minut kończy się także na minucie odkrycia), każdy z jego testem.
6. Przy pierwszym wychłodzeniu gra dopisuje regułę „Zawsze → Eksploruj” do pierwszej grupy programu, a gdy program nie ma żadnej grupy, zakłada grupę „Program” z warunkiem „Zawsze” i dopisuje regułę do niej (pytanie 2).
7. Do odkrycia pierwszej akcji przycisk „Dodaj regułę” jest nieaktywny, a potem dokłada „Zawsze → Eksploruj” jak w zadaniu 5 (pytanie 4).
```
#### `.runs/task-cycles/odkrywanie/task.md:67-69` — Questions to settle, 8

```text
- 8. Co symulacja robi z regułą programu, której warunek, akcja albo cel nie należy do repertuaru postaci?
  - Answer: A — symulacja przechodzi nad taką regułą do następnej, jak nad akcją niewykonalną w tej minucie, a reguła zostaje w programie. Przyjęte z kosztem: reguła, która nigdy nie zadziała, stoi w programie bez znaku (znak z powodem nie wchodzi w to zadanie).
  - Source: Mariusz, 2026-10-25, „wszystko zgodnie z rekomendacjami” (Turn 8 rozmowy refinementu), czytana wobec rekomendacji A. Stan dziś, z fundamentu: niezmiennik `program-closed-lists` — “The simulation refuses a program holding a condition or an action of the character whose kind the data files of `src/browser/sim/data/` do not list.” (dotyczy rodzaju spoza danych, nie repertuaru).
```
#### `.runs/task-cycles/odkrywanie/task.md:80-82` — Questions to settle, 12

```text
- 12. Czy warunek „Zawsze” jest w Zrozumieniu od startu nowej gry, skoro wpis projektowany mówi, że warunki wchodzą do Zrozumienia dopiero przez odkrycie?
  - Answer: A — warunek „Zawsze” jest w Zrozumieniu od startu nowej gry, a zmieniła się definicja: wpis projektowany i pojęcie `Understanding` dostały zdanie o warunku „Zawsze”, a Verification i *Rejected* wpisu zostały bez zmian. Przyjęte z kosztem: definicja przeszła ponownie bramkę gotowości, a jej odcisk zmienił się. Brzmienie zatwierdzone przez człowieka, definicja `definicja_mvp_loop2.md` (zatwierdzona 2026-10-26, odcisk 7692b28a, sha256 8dad9717784d): wpis „(new) — When does the player learn what the world holds?”, linie 1118–1120: “The condition "Always" is in the Understanding from the start of a new game; every other action, item and condition enters the Understanding only when discovered in play, each by the need, action, item or encounter that reveals it. When something is discovered, game time stops by itself.”, a w *Rationale*, linie 1134–1135: “The condition "Always" says nothing about the world, so its discovery would tell the player nothing.”; pojęcie `Understanding`, linie 2304–2306: “The Understanding is the record of the game's actions, items, conditions and branches that the player has discovered, together with the condition "Always", which it holds from the start of a new game.”
  - Source: wybór drogi — Mariusz, 2026-10-26, „wszystko zgodnie z rekomendacjami” (Turn 14 rozmowy refinementu zadania 6), czytana wobec rekomendacji A; zatwierdzenie znaczenia obu zmienionych wpisów w bramce gotowości, z dodanym zdaniem *Rationale* — Mariusz, 2026-10-26, „zgodnie z rekomendacjami” (Turn 17); zapis bramki definicji: „Approved by: Mariusz, 2026-10-26”, „Definition fingerprint: 7692b28a” (odcisk po drugiej bramce tego dnia, która zmieniła tylko § Touched parts and decisions — Mariusz, 2026-10-26, „zatwierdzam, zgodnie z rekomendacją”, Turn 26; plan `plan_mvp_loop2.md`, nagłówek i dziennik zmian 2026-10-26). Zderzenie, od którego wyszło pytanie: odpowiedź na pytanie 1 (wiersz „start nowej gry — warunek „Zawsze””) wobec tekstu definicji zatwierdzonego 2026-10-13 (odcisk 9e480247, commit vaultu c58966eb): wpis „(new) — When does the player learn what the world holds?”, linie 1104–1105: “Actions, items and conditions enter the Understanding only when discovered in play, each by the need, action, item or encounter that reveals it.”, i pojęcie `Understanding`, linie 2292–2293: “The Understanding is the record of the game's actions, items, conditions and branches that the player has discovered.”
```
#### `.runs/task-cycles/odkrywanie/task.md:96-99` — Context, loop2 code

```text
- Kod loop2 (`9a5f360`): edytor programu buduje listy warunków, akcji i przedmiotów z całych katalogów danych `CONDITIONS`, `ACTIONS` i `OFFERED_ITEMS` (`src/browser/view/program-editor.ts:382`–`391`); „Dodaj regułę” dokłada „Zawsze → Eksploruj” (`src/browser/view/program-editor.ts:126`–`133`).
- Kod loop2 (`9a5f360`): nowa gra zaczyna z programem bez reguł (`src/browser/sim/game.ts:222`–`232`); pauza to pole `paused` stanu gry, a „Pauza”/„Wznów” w wierszu stanu je przełącza (`src/browser/sim/game.ts:335`–`338`, `src/browser/view/status-row.ts:41`–`44`); wiersz stanu pisze „Minuta {minuta} · {czynność}”, z „ (pauza)” w czasie pauzy (`src/browser/view/status-row.ts:31`–`35`); czas realny wchodzi do przejścia jedną funkcją `passRealTime` (`src/browser/sim/game.ts:346`–`357`).
- Kod loop2 (`9a5f360`): archetyp w danych ma dziś samą nazwę, a każda zakładana postać jest magiem żywiołów (`src/browser/sim/data/archetypes.ts:6`, `:12`); umiejętności postaci w kodzie jeszcze nie ma; ognisko nie jest przedmiotem plecaka, tylko osobnym obiektem kafelka (`src/browser/sim/data/items.ts:28`–`37`, `src/browser/sim/types.ts:86`).
- Kod loop2 (`9a5f360`): ciało stygnie na Lesie o 0,024 °C na minutę (0,002 × (37,0 − 25)) i jest wychłodzone poniżej 35,0 °C (`src/browser/sim/data/balance.ts:9`, `:13`, `:16`; `src/browser/sim/data/maps.ts:32`), więc mag bez ognia jest wychłodzony w 84. minucie gry (minuta 83: 35,008 °C; minuta 84: 34,984 °C) i od tej minuty traci zdrowie (D-60); pierwsze przejście nowej gry zaczyna się więc od 84 sekund przy tempie 1×, w których mag stoi, bo żadna akcja nie jest znana.
```
#### `.runs/task-cycles/odkrywanie/task.md:113-147` — Decisions in play

```text
## Decisions in play

Obecny fundament loop2 (`9a5f360`):

- D-04 „What is the game built with?”: “The game is written in TypeScript and runs in the browser. Its simulation is a set of pure functions that take a game state and a span of game minutes and return the next game state together with the events it produced, and real time enters the simulation only as an argument. The browser view draws the game only from the game state and the game's content data, and changes the game state only through functions of the simulation, to which it passes the player's choices and the passing of real time.”
- D-18 „Where does the game's content live?”: “The game's content — game maps, items, creatures, character skills and their numbers — stands in data files. A game map, an item or a creature of a kind the simulation already handles is added by a change of data alone.”
- D-20 „What interrupts the character's action in progress?”: “Neither a change of the program nor the condition of another program rule interrupts the character's action in progress. The program picks a program rule again only once the character's action ends.”
- D-21 „How does time pass in a map run the player starts?”: “A map run the player starts passes at one game minute per real second, and the player can pause and resume it.”
- D-23 „How does a character act by its program?”: “A character acts only by its program: in each free game minute it carries out the first program rule whose condition holds and whose action of the character can be carried out then. Conditions are chosen from a closed list, never written as expressions, and the player has no way to carry out a character's action by hand.” — zadanie 5 zapisuje jego nowe brzmienie, którego przykład zgodności mówi: “a condition picker listing the conditions of the repertoire”.
- D-25 „How does a character move?”: “A move onto a neighbouring tile is an ordinary action of the character, after which the program picks a program rule anew, as after any action of the character. Exploring reveals the tile the character stands on, cannot be repeated on a revealed tile and brings no item, and gathering takes only from a revealed tile, as much as lies on it.”
- D-39 „What do the signal colours of the browser view mean?”: “[…] `discovery` means that something new was discovered; and `player-change` means that the player did it. […]”
- D-44 „Which controls do the screens of the browser view build on?”: “The screens of the browser view build every button, select list, number field and text field from the six shared controls of `src/browser/view/controls/` — the button, the destructive button, the button selected in its group, the select list, the number field and the text field — and the buttons „Zakończ”, „Usuń” and „Restart” are destructive buttons. The state of loading applies to no shared control while none of them waits for a server.” — nieaktywne „Dodaj regułę” (punkt 7 „To do”) to wspólny przycisk w stanie disabled.
- D-60 „When does a character lose and regain health?”: “A character loses health in each game minute in which it is chilled — its body temperature below the threshold of chill — […]”
- D-62 „What does the screen show, and what can the player do, after a character's death?”: “After a character's death the screen stays on the state of the game minute of death and time stands still, and the player has „Restart”, which starts the map run again with the same seed from game minute zero, and „Zakończ”, which returns to the screen from which the player sends the character.”
- D-63 „How does a character light a campfire or a stick?”: “A character lights a campfire and a stick with „Zapal”, an ordinary action of the character whose price is the sticks it uses.” — zadanie 9 robi z „Zapal” czar Płomyk.
- D-71 „In what order does a game minute of a map run take effect?”: “A game minute of a map run takes effect in this order: first the character's body — its temperature cools by the game map's ambient temperature and warms by what burns on its tile, its satiety falls, and its health is lost for being chilled or starving in that minute or regained for being neither; then, where its health has reached zero, the character dies in that minute and the map run ends there; otherwise what burns loses a minute of burning, tiles renew their stock, the action of the character ending in that minute takes effect, and the program picks a program rule from what that minute has made.” — odkrycie zapada w tej kolejności według pytania 11.
- D-82 „Which product documents supply test expectations?”: “Test expectations may come from the loop2 foundation, accepted task documents in `C:/Storage/The Brain/The Brain/Notes/Projects/(P) Loop/` and its `_zadania/` directory in state ready for cycle or completed, and the approved `definicja_mvp_loop2.md` there. The draft `koncepcja_projektowa.md` is a source only in a passage quoted by an accepted document; a test comment locating a documentary expectation names its file and line.” — łańcuch odsłonięć i umiejętności z punktów 2 i 3 „To do” są oczekiwaniami testów z tego dokumentu po jego przyjęciu. Pozostałe decyzje testowania (D-73–D-89) niesie `guidelines/testing.md`.
- `player-map-run-pace`: “Real time passed to the simulation for a map run the player starts moves the map run on, until it ends, by one game minute for each whole real second passed while it is not paused, and by no game minute for real time passed while it is paused.” — czas, który staje sam po minucie odkrycia w środku przekazanego odcinka czasu realnego, nie przesuwa przejścia o każdą sekundę tego odcinka, więc cykl zmienia ten niezmiennik i jego test (pytania 3 i 11); ostateczne brzmienie z przewijaniem pisze zadanie 7 (pytanie 10).
- `minute-span-split`: “A map run advanced by a span of game minutes reaches the same game state, with the same events in the same order, at every game minute, however the span is split into calls of the simulation, up to and including the character's death.” — odcinek kończy się także na minucie odkrycia, więc cykl dopisuje to do niezmiennika i jego testu (pytanie 11).
- `program-closed-lists`: “The simulation refuses a program holding a condition or an action of the character whose kind the data files of `src/browser/sim/data/` do not list.” — zostaje: dotyczy rodzaju spoza danych, a regułę spoza repertuaru symulacja pomija (pytanie 8).
- `content-identifiers`: “No TypeScript file under `src/browser/` outside `src/browser/sim/data/` names a game map, a resource or an archetype, outside its comments, by the identifier or the name that the files of `src/browser/sim/data/` give it.”
- Pojęcia: `character skill` — “A character skill is an area of what a character can do that grows apart from the character's other areas.”; `program rule` — “A program rule is a pair held by a program: a condition and an action of a character.”; `map run` — “A map run is one attempt of one character at one game map, from entering it until a completion, the character's death or the player stopping it.”

Wpisy projektowane definicji `definicja_mvp_loop2.md` (zatwierdzona 2026-10-26, odcisk 7692b28a; § Projected foundation changes i § Glossary); przydział według planu `plan_mvp_loop2.md`, § Projected entries, zadanie 6.

Zadanie zapisuje:

- „(new) — When does the player learn what the world holds?” (urzeczywistniają zadania 6, 8, 9 i 10, zapisuje zadanie 6): “The condition "Always" is in the Understanding from the start of a new game; every other action, item and condition enters the Understanding only when discovered in play, each by the need, action, item or encounter that reveals it. When something is discovered, game time stops by itself.” — zadania 8, 9 i 10 dopisują własne odsłonięcia; zdanie o warunku „Zawsze” to odpowiedź A na pytanie 12.
- „(new) — What does an archetype open to a character?” (urzeczywistnia i zapisuje zadanie 6): “An archetype opens character skills, not actions: an action is open to a character when the character skill that its pair of verb and target grows is among the predispositions of the character's archetype. An action that no character skill grows, such as a move onto a neighbouring tile, is open to every character, and an archetype never filters items.”
- Pojęcia: `predisposition` — “A predisposition is a character skill that a character's archetype lets the character learn.”; `archetype` — “An archetype is the kind of character that sets its predispositions.”; `repertoire` — “A character's repertoire is the subset of the Understanding that the character can use in a program.”

Zadanie urzeczywistnia część i zapisuje tę część, a resztę zapisuje zadanie 10 (WAY-126):

- Pojęcie `Understanding` (urzeczywistniają zadania 6 i 10, zapisuje zadanie 10): “The Understanding is the record of the game's actions, items, conditions and branches that the player has discovered, together with the condition "Always", which it holds from the start of a new game.” — prawdziwe po tym zadaniu: zapis akcji, przedmiotów i warunków, które gracz odkrył, razem z warunkiem „Zawsze” od startu nowej gry; gałęzie wnosi i dopisuje zadanie 10 (plan, dziennik zmian 2026-10-26: „zadanie 6 zapisuje część, którą prawdziwą czyni jego kod (akcje, przedmioty i warunki oraz warunek „Zawsze” od startu nowej gry), a zadanie 10 dopisuje resztę (WAY-126)”; decyzja człowieka 2026-10-26, odpowiedź A na pytanie Q13 rozmowy refinementu zadania 6).
- „(new) — Whose is the knowledge of the world, and what may a character use of it?” (urzeczywistniają zadania 6 i 10, zapisuje zadanie 10): “The Understanding belongs to the player and is saved once for all characters, and what any character discovers enters it for every character. A character's repertoire is computed from the Understanding through its archetype's predispositions and the branches the character has bought, and is never saved; an action or item of a bought branch is open only to the character that bought it. That one computation is at once what the program editor offers and what the simulation lets the character carry out.” — prawdziwe po tym zadaniu: Zrozumienie należy do gracza, jedno dla wszystkich postaci, a odkrycie którejkolwiek postaci wchodzi do niego dla wszystkich; repertuar wylicza się ze Zrozumienia przez predyspozycje archetypu i nie jest zapisywany; jedno wyliczenie służy edytorowi i symulacji. Gałęzie wykupione przez postać wnosi zadanie 10, a zapis stanu gry na serwerze zadanie 16.
```
#### `.runs/task-cycles/odkrywanie/reports/01-planner-handoff.md:44-57` — The orchestrator's answers at start

```text
  whole, or the part the code makes true where the task says so).
- Answers to the task's *Questions carried to cycle* and one further reading (bind your plan):
  - Q-C1 — The program editor offers the repertoire computed from the Understanding through the
    predispositions of the archetype of the character the program serves. With one program per game
    and every character an elemental mage today, the editor uses the elemental mage's repertoire,
    computed by the same function the simulation uses for the character in a map run.
  - Q-C2 — The Understanding records discovered actions, conditions and items by their data
    identifiers; the campfire enters it under an identifier the data files give it as a
    discoverable thing, without becoming a backpack item. The exact representation is a
    how-to-make choice inside that.
  - Q-C3 — The chain of revelations and the five character skills with their predispositions stand
    in data files of `src/browser/sim/data/`, beside the actions, items and conditions they concern
    (D-18; `guidelines/coding-content-data.md`). The decision written from row O9 carries the
    chain's meaning, not its location.
```

## Base

This slice starts at `4ddad1669e3476655f697328010dce284ecb3b0d` (slice 1 head). Slice 1 added `src/browser/sim/data/skills.ts` (`SKILLS`, `SkillId`) and `src/browser/sim/data/revelations.ts` (`Revelation`), `predispositions` on archetypes, `revealedBy` on actions, conditions, items, and `CAMPFIRE.id = "campfire"` with its `revealedBy`; see `.runs/task-cycles/odkrywanie/reports/slice-1-report.md` § Files.

Known flaky test outside this task: `tests/account-storage.test.mjs:357` once failed `5001 !== 5000` and passed alone; if it fails for you, rerun it alone and report both runs.
