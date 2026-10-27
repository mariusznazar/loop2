# Handoff — executor of slice 1, task cycle odkrywanie

## Delegation

The human (Mariusz) started this the-way task cycle and delegated every intermediate choice to the
cycle's orchestrator. You answer to the orchestrator, never to the human; send questions back in
your report with the status `questions` and do not start any other stage or slice.

## Your stage

- Method: the project skill `the-way-make-change` (pinned the-way at `.the-way`, commit 574a37b),
  as the executor of planned slice 1. Read it and what it names whole.
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
- Report: write your full report to `.runs/task-cycles/odkrywanie/reports/slice-1-report.md`,
  as your method gives: each check with its exact command and exit code, the own-work check, every
  reach beyond this handoff, questions and concerns. Return only: your status (`done`,
  `done with concerns`, `questions`, `returned` or `blocked`), your commits, a one-line check
  result naming what failed or did not run, and the report's path.


## Your slice — `.runs/task-cycles/odkrywanie/plan.md`, copied word for word

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

## Foundation entries to read, each whole, at their current ranges in the worktree

Where a range differs from the plan's, the current one holds.

- D-18 — `foundations/decisions.md:356-374` (plan gave `foundations/decisions.md:356-374`)
- D-34 — `foundations/decisions.md:705-719` (plan gave `foundations/decisions.md:705-719`)
- D-63 — `foundations/decisions.md:1187-1201` (plan gave `foundations/decisions.md:1187-1201`)
- D-82 — `foundations/decisions.md:1456-1468` (plan gave `foundations/decisions.md:1456-1468`)
- simulation-isolation — `foundations/invariants.md:212-223` (plan gave `foundations/invariants.md:210-221`)
- content-identifiers — `foundations/invariants.md:234-245` (plan gave `foundations/invariants.md:232-243`)
- character skill — `foundations/glossary.md:5-11` (plan gave `foundations/glossary.md:5-11`)
- O9 → D-121 — `foundations/decisions.md:2064-2093`
- When does the player learn what the world holds? → D-118 — `foundations/decisions.md:1990-2013`
- What does an archetype open to a character? → D-120 — `foundations/decisions.md:2040-2063`
- predisposition — `foundations/glossary.md:106-111`
- archetype — `foundations/glossary.md:112-117`

## Guidelines and code to read

Guideline files whole. A range of code or tests that an earlier slice changed: find the place again by its name.

- `guidelines/coding.md`
- `guidelines/coding-content-data.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`
- `src/browser/sim/types.ts`
- `src/browser/sim/data/resources.ts`
- `tests/sim/rules.test.mjs:225-250`

## Passages of the task, the plan and the orchestrator's answers its *Read* names, copied word for word

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
#### `.runs/task-cycles/odkrywanie/task.md:41-44` — Questions to settle, 1

```text
- 1. Co odsłania co — które zdarzenie gry wprowadza do Zrozumienia które akcje, przedmioty i warunki Lasu, i co gracz zna od startu nowej gry?
  - Answer: A — łańcuch odsłonięć z tabeli przedstawionej człowiekowi, w tym wiersz „pierwsze wytworzone ognisko” jako propozycja: start nowej gry — warunek „Zawsze”; pierwsze wychłodzenie — „Eksploruj”, „Wędruj”, „Temperatura poniżej”; pierwsza zakończona eksploracja — „Idź”, „Zbierz”, „Tu leży mniej niż”, „Zapas poniżej” i przedmioty leżące na odsłoniętym kafelku, każdy kolejny kafelek dokłada swoje; pierwszy zebrany patyk — „Wytwórz — ognisko”, „Zapal — ognisko”, „Zapal — patyk”, ognisko; pierwsze wytworzone ognisko — „Idź — ognisko”, „Zostało mniej niż — ognisko”, „Z dala od — ognisko”; pierwsze zakończone „Zapal” (ogniska albo patyka) — „Zasil — ognisko”; pierwsza zebrana jagoda — „Zjedz — jagoda”, „Sytość poniżej”. Przyjęte z kosztem drogi A podanym w pytaniu: mech i włókno wchodzą do Zrozumienia razem z eksploracją, choć nie mają jeszcze użycia; „Zasil” odsłania też zapalenie samego patyka; wiersz „pierwsze wytworzone ognisko” przesuwa warunki ogniska później niż w loop, a „Idź — ognisko” nie ma źródła. Wiersz „start nowej gry” przeczył zatwierdzonemu wtedy brzmieniu definicji; rozstrzyga go pytanie 12 (A: zostaje, zmieniła się definicja).
  - Source: Mariusz, 2026-10-25, „wszystko zgodnie z rekomendacjami” — odpowiedź na pakiet pytań zadania 6, który orkiestrator projektu przedstawił w rozmowie refinementu (`.runs/project-refinement/odkrywanie.md` w loop2, Turn 8), czytana wobec rekomendacji A. Materiał pytania (nie uprawnienie): koncepcja `koncepcja_projektowa.md`, §5 „Odkrywanie idzie dwiema osiami” — „Kolejność: wychłodzenie odsłania Eksploruj, Wędruj i Otul, pierwsza eksploracja odsłania Zbierz, Idź, Wyczuj, to, co leży na odsłoniętych kafelkach, i warunek „Tu leży mniej niż", pierwsze zebrane patyki odsłaniają Wytwórz, Zapal i ognisko, a z ogniskiem warunki o nim („Zostało mniej niż", „Z dala od"), pierwsze rozpalenie odsłania Zasil […], pierwsze zebrane jagody odsłaniają Zjedz i miarę sytości”; dane loop `cdc7c0d` (`src/sim/data/activities.ts:29`, `:34`, `:36`–`37`, `:41`, `:43`–`45`; `conditions.ts:29`, `:36`, `:53`, `:84`, `:101`, `:118`, `:130`; `items.ts:155`).
  - Fakt z kodu, osobno: dane loop2 wymieniają dziś dziesięć akcji (`src/browser/sim/data/actions.ts:15`–`40`), siedem warunków (`src/browser/sim/data/conditions.ts:20`–`61`) i cztery przedmioty plecaka — patyk, jagoda, mech, włókno (`src/browser/sim/data/items.ts:28`–`37`); tabela stawia każdą akcję i każdy warunek w dokładnie jednym wierszu; loop2 `9a5f360`.
```
#### `.runs/task-cycles/odkrywanie/task.md:57-59` — Questions to settle, 5

```text
- 5. Które umiejętności postaci stoją w danych gry po tym zadaniu, które pary czasownik × cel hoduje każda z nich i jakie predyspozycje ma mag żywiołów?
  - Answer: A — Eksploracja — „Eksploruj”; Zbieranie małych przedmiotów — „Zbierz” (każdy cel); Wytwarzanie ogniska — „Wytwórz — ognisko” i „Zasil — ognisko”; Jedzenie — „Zjedz” (każdy cel); Rzucanie czaru Płomyk (umiejętność własna maga) — „Zapal” (każdy cel); „Wędruj”, „Idź” i „Idź — ognisko” nie hoduje żadna umiejętność, więc są otwarte dla każdej postaci; predyspozycje maga żywiołów: wszystkie pięć. Przyjęte z kosztem: „Zapal” należy do umiejętności czaru, choć do zadania 9 jest zwykłą akcją (D-63); „Wytwarzanie ogniska” musi trafić do predyspozycji każdego przyszłego archetypu (albo do wspólnego rdzenia, jak w loop).
  - Source: Mariusz, 2026-10-25, „wszystko zgodnie z rekomendacjami” (Turn 8 rozmowy refinementu), czytana wobec rekomendacji A. Materiał: dane loop `src/sim/data/skills.ts`, `archetypes.ts:84`, `:128` (`cdc7c0d`); definicja (odcisk 7692b28a), Verification wpisu „What does an archetype open to a character?”, linie 1095–1096: “"Make — campfire" open to every archetype, while making an archetype's own goods is open only to that archetype”.
```
#### `.runs/task-cycles/odkrywanie/task.md:80-82` — Questions to settle, 12

```text
- 12. Czy warunek „Zawsze” jest w Zrozumieniu od startu nowej gry, skoro wpis projektowany mówi, że warunki wchodzą do Zrozumienia dopiero przez odkrycie?
  - Answer: A — warunek „Zawsze” jest w Zrozumieniu od startu nowej gry, a zmieniła się definicja: wpis projektowany i pojęcie `Understanding` dostały zdanie o warunku „Zawsze”, a Verification i *Rejected* wpisu zostały bez zmian. Przyjęte z kosztem: definicja przeszła ponownie bramkę gotowości, a jej odcisk zmienił się. Brzmienie zatwierdzone przez człowieka, definicja `definicja_mvp_loop2.md` (zatwierdzona 2026-10-26, odcisk 7692b28a, sha256 8dad9717784d): wpis „(new) — When does the player learn what the world holds?”, linie 1118–1120: “The condition "Always" is in the Understanding from the start of a new game; every other action, item and condition enters the Understanding only when discovered in play, each by the need, action, item or encounter that reveals it. When something is discovered, game time stops by itself.”, a w *Rationale*, linie 1134–1135: “The condition "Always" says nothing about the world, so its discovery would tell the player nothing.”; pojęcie `Understanding`, linie 2304–2306: “The Understanding is the record of the game's actions, items, conditions and branches that the player has discovered, together with the condition "Always", which it holds from the start of a new game.”
  - Source: wybór drogi — Mariusz, 2026-10-26, „wszystko zgodnie z rekomendacjami” (Turn 14 rozmowy refinementu zadania 6), czytana wobec rekomendacji A; zatwierdzenie znaczenia obu zmienionych wpisów w bramce gotowości, z dodanym zdaniem *Rationale* — Mariusz, 2026-10-26, „zgodnie z rekomendacjami” (Turn 17); zapis bramki definicji: „Approved by: Mariusz, 2026-10-26”, „Definition fingerprint: 7692b28a” (odcisk po drugiej bramce tego dnia, która zmieniła tylko § Touched parts and decisions — Mariusz, 2026-10-26, „zatwierdzam, zgodnie z rekomendacją”, Turn 26; plan `plan_mvp_loop2.md`, nagłówek i dziennik zmian 2026-10-26). Zderzenie, od którego wyszło pytanie: odpowiedź na pytanie 1 (wiersz „start nowej gry — warunek „Zawsze””) wobec tekstu definicji zatwierdzonego 2026-10-13 (odcisk 9e480247, commit vaultu c58966eb): wpis „(new) — When does the player learn what the world holds?”, linie 1104–1105: “Actions, items and conditions enter the Understanding only when discovered in play, each by the need, action, item or encounter that reveals it.”, i pojęcie `Understanding`, linie 2292–2293: “The Understanding is the record of the game's actions, items, conditions and branches that the player has discovered.”
```
#### `.runs/task-cycles/odkrywanie/task.md:84-102` — Context

```text
## Context

- Cel z planu: „Czynności, przedmioty i warunki pojawiają się w edytorze programu dopiero wtedy, gdy postać je odkryje w grze, a w chwili odkrycia czas gry sam staje.”
- Punkt 9 „In scope” definicji `definicja_mvp_loop2.md`, który zadanie realizuje według planu: „Odkrywanie kaskadowe: czynności, przedmioty i warunki odsłaniają się w trakcie gry; wiedza o nich (Zrozumienie) należy do gracza, a repertuar postaci wylicza się z niej (D13, D38).”
- Zadanie zależy według planu od zadania 4 ognisko-i-jedzenie (done, PR #25) i od zadania 5 grupy-regul-i-liczniki (w cyklu; pytanie 9); od zadania 6 zależą zadanie 7 rozwiazanie-lasu (pytanie 10), zadania 8 walka-w-glebi-lasu i 9 plomyk, które dopisują do mechanizmu odkrywania własne odsłonięcia (pierwsza napaść wilka — czasowniki walki; pierwsze rozpalenie — warunek „Energia natury poniżej”), oraz zadanie 10 wprawa-i-drzewa, które dokłada gałęzie drzew do repertuaru.
- Koncepcja (`koncepcja_projektowa.md`, §5 „Odkrywanie idzie dwiema osiami”): „Kolejność: wychłodzenie odsłania Eksploruj, Wędruj i Otul, pierwsza eksploracja odsłania Zbierz, Idź, Wyczuj, to, co leży na odsłoniętych kafelkach, i warunek „Tu leży mniej niż", pierwsze zebrane patyki odsłaniają Wytwórz, Zapal i ognisko, a z ogniskiem warunki o nim („Zostało mniej niż", „Z dala od"), pierwsze rozpalenie odsłania Zasil i — postaci z energią — warunek „Energia natury poniżej", pierwsze zebrane jagody odsłaniają Zjedz i miarę sytości, pierwszy wilk odsłania czasowniki walki, Iskrę, Podmuch, Napraw i warunki o zdrowiu. […] Gdy coś się odsłoni, zegar gry staje sam.”
- Koncepcja (`koncepcja_projektowa.md`, D13): „pierwszy run jest z natury liniowym samouczkiem — łańcuch ma jedną poprawną sekwencję i nie ma w nim wyboru. Strojenie zaczyna się dopiero w drugim runie”.
- Czary Otul, Wyczuj, Iskra, Podmuch i Napraw są poza MVP (definicja, § Out of scope: „Czary maga poza Płomykiem: Otul, Wyczuj, Napraw, Iskra, Podmuch, Zawierucha.”), więc łańcuch z punktu 2 „To do” ich nie ma.
- Definicja pozwala zadaniom czytać z kodu loop (`C:\Storage\repos\loop`) wyłącznie pliki danych (`src/sim/data/`) i testy.
- Dane loop (commit `cdc7c0d`): każda czynność, przedmiot i warunek ma pole `revealedBy` — zdarzenie, które go odsłania (`src/sim/data/activities.ts:14`, `src/sim/data/conditions.ts:19`, `src/sim/data/items.ts:34`); wyzwalaczem jest pierwsze wychłodzenie, pierwszy głód, czynność, przedmiot albo stworzenie (`src/sim/types.ts:71`); warunek „Zawsze” nie ma wyzwalacza i jest znany od startu (`src/sim/data/conditions.ts:29`); warunki ogniska odsłania w loop ognisko jako przedmiot (`revealedBy: 'fireplace'`, `conditions.ts:101`, `:130`), które odsłania pierwszy patyk (`items.ts:155`).
- Testy loop (`src/sim/sim.test.ts`, commit `cdc7c0d`): nic nie jest odsłonięte, dopóki postać nie zmarznie (`:586`); pierwsze wychłodzenie odsłania eksplorację i zostawia regułę-samouczek „Zawsze → Eksploruj” w grupie „Program” (`:592`); lista warunków nie zdradza ogniska, zanim gracz o nim wie (`:607`); razem ze zbieraniem i surowcami przychodzi warunek o zapasie (`:625`); kronika nazywa odkrycie słowami „Odkryto: Idź, Zbierz, Wyczuj, Patyk, Jagoda, Mech, Włókno” i „W regułach można teraz sprawdzić: Zapas poniżej … szt., Tu leży mniej niż … szt.” (`:633`); miara sytości przychodzi z pierwszymi jagodami, nie z pierwszym głodem (`:652`); dopiero zebranie patyków odsłania wytwarzanie, zapalanie i ognisko (`:659`).
- Testy loop (commit `cdc7c0d`): pierwsze rozejrzenie się odsłania to, co leży na tym kafelku, nie na mapie, a kolejny odsłonięty kafelek dokłada swoje przedmioty (`src/sim/resources.test.ts:158`, `:172`); repertuar maga to cała wiedza gracza poza tym, czego nie wykupił (`src/sim/focus.test.ts:30`).
- Kod loop2 (`9a5f360`): edytor programu buduje listy warunków, akcji i przedmiotów z całych katalogów danych `CONDITIONS`, `ACTIONS` i `OFFERED_ITEMS` (`src/browser/view/program-editor.ts:382`–`391`); „Dodaj regułę” dokłada „Zawsze → Eksploruj” (`src/browser/view/program-editor.ts:126`–`133`).
- Kod loop2 (`9a5f360`): nowa gra zaczyna z programem bez reguł (`src/browser/sim/game.ts:222`–`232`); pauza to pole `paused` stanu gry, a „Pauza”/„Wznów” w wierszu stanu je przełącza (`src/browser/sim/game.ts:335`–`338`, `src/browser/view/status-row.ts:41`–`44`); wiersz stanu pisze „Minuta {minuta} · {czynność}”, z „ (pauza)” w czasie pauzy (`src/browser/view/status-row.ts:31`–`35`); czas realny wchodzi do przejścia jedną funkcją `passRealTime` (`src/browser/sim/game.ts:346`–`357`).
- Kod loop2 (`9a5f360`): archetyp w danych ma dziś samą nazwę, a każda zakładana postać jest magiem żywiołów (`src/browser/sim/data/archetypes.ts:6`, `:12`); umiejętności postaci w kodzie jeszcze nie ma; ognisko nie jest przedmiotem plecaka, tylko osobnym obiektem kafelka (`src/browser/sim/data/items.ts:28`–`37`, `src/browser/sim/types.ts:86`).
- Kod loop2 (`9a5f360`): ciało stygnie na Lesie o 0,024 °C na minutę (0,002 × (37,0 − 25)) i jest wychłodzone poniżej 35,0 °C (`src/browser/sim/data/balance.ts:9`, `:13`, `:16`; `src/browser/sim/data/maps.ts:32`), więc mag bez ognia jest wychłodzony w 84. minucie gry (minuta 83: 35,008 °C; minuta 84: 34,984 °C) i od tej minuty traci zdrowie (D-60); pierwsze przejście nowej gry zaczyna się więc od 84 sekund przy tempie 1×, w których mag stoi, bo żadna akcja nie jest znana.
- Zadanie 5 grupy-regul-i-liczniki jest w cyklu; jego dokument (`_zadania/grupy_regul_i_liczniki_loop2.md`, ready for cycle 2026-10-24) przebudowuje program na grupy reguł, ustala, że nowa gra zaczyna z jedną pustą grupą „Program” z warunkiem „Zawsze”, a „Dodaj regułę” w każdej grupie dokłada „Zawsze → Eksploruj”, i wyłącza ze swojego zakresu „Odkrywanie warunków i czynności, w tym reguła wpisywana graczowi przy odkryciu — zadanie 6.”
- Styleguide (`guidelines/styleguide-browser-view.md:30`, § Roles) opisuje rolę tekstu `discovery` znaczeniem „Odkryto coś nowego.” (D-39), a stan nieaktywnej kontrolki tekstem w `text-disabled` (`:26`, `:172`).
- Zadanie 7 rozwiazanie-lasu wnosi przewijanie czasu ręcznego przejścia w tej samej funkcji `passRealTime`; idzie w cykl po tym zadaniu i pisze ostateczne brzmienie `player-map-run-pace` z obiema zmianami (pytanie 10).
```
#### `.runs/task-cycles/odkrywanie/task.md:136-147` — Decisions in play, projected entries

```text
Wpisy projektowane definicji `definicja_mvp_loop2.md` (zatwierdzona 2026-10-26, odcisk 7692b28a; § Projected foundation changes i § Glossary); przydział według planu `plan_mvp_loop2.md`, § Projected entries, zadanie 6.

Zadanie zapisuje:

- „(new) — When does the player learn what the world holds?” (urzeczywistniają zadania 6, 8, 9 i 10, zapisuje zadanie 6): “The condition "Always" is in the Understanding from the start of a new game; every other action, item and condition enters the Understanding only when discovered in play, each by the need, action, item or encounter that reveals it. When something is discovered, game time stops by itself.” — zadania 8, 9 i 10 dopisują własne odsłonięcia; zdanie o warunku „Zawsze” to odpowiedź A na pytanie 12.
- „(new) — What does an archetype open to a character?” (urzeczywistnia i zapisuje zadanie 6): “An archetype opens character skills, not actions: an action is open to a character when the character skill that its pair of verb and target grows is among the predispositions of the character's archetype. An action that no character skill grows, such as a move onto a neighbouring tile, is open to every character, and an archetype never filters items.”
- Pojęcia: `predisposition` — “A predisposition is a character skill that a character's archetype lets the character learn.”; `archetype` — “An archetype is the kind of character that sets its predispositions.”; `repertoire` — “A character's repertoire is the subset of the Understanding that the character can use in a program.”

Zadanie urzeczywistnia część i zapisuje tę część, a resztę zapisuje zadanie 10 (WAY-126):

- Pojęcie `Understanding` (urzeczywistniają zadania 6 i 10, zapisuje zadanie 10): “The Understanding is the record of the game's actions, items, conditions and branches that the player has discovered, together with the condition "Always", which it holds from the start of a new game.” — prawdziwe po tym zadaniu: zapis akcji, przedmiotów i warunków, które gracz odkrył, razem z warunkiem „Zawsze” od startu nowej gry; gałęzie wnosi i dopisuje zadanie 10 (plan, dziennik zmian 2026-10-26: „zadanie 6 zapisuje część, którą prawdziwą czyni jego kod (akcje, przedmioty i warunki oraz warunek „Zawsze” od startu nowej gry), a zadanie 10 dopisuje resztę (WAY-126)”; decyzja człowieka 2026-10-26, odpowiedź A na pytanie Q13 rozmowy refinementu zadania 6).
- „(new) — Whose is the knowledge of the world, and what may a character use of it?” (urzeczywistniają zadania 6 i 10, zapisuje zadanie 10): “The Understanding belongs to the player and is saved once for all characters, and what any character discovers enters it for every character. A character's repertoire is computed from the Understanding through its archetype's predispositions and the branches the character has bought, and is never saved; an action or item of a bought branch is open only to the character that bought it. That one computation is at once what the program editor offers and what the simulation lets the character carry out.” — prawdziwe po tym zadaniu: Zrozumienie należy do gracza, jedno dla wszystkich postaci, a odkrycie którejkolwiek postaci wchodzi do niego dla wszystkich; repertuar wylicza się ze Zrozumienia przez predyspozycje archetypu i nie jest zapisywany; jedno wyliczenie służy edytorowi i symulacji. Gałęzie wykupione przez postać wnosi zadanie 10, a zapis stanu gry na serwerze zadanie 16.
```
#### `.runs/task-cycles/odkrywanie/task.md:149-165` — Settlements to record

```text
## Settlements to record

Candidates: 10 shown, 9 accepted — 2026-10-26

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| O1 | Przy pierwszym wychłodzeniu gra dopisuje regułę „Zawsze → Eksploruj” do pierwszej grupy programu, a gdy program nie ma żadnej grupy, zakłada grupę „Program” z warunkiem „Zawsze” i dopisuje regułę do niej. | decision | pytanie 2 (A; Mariusz, 2026-10-25); „Zawsze” to nazwa warunku z zamkniętej listy, nie słowo wykluczające; „program” znaczy tu jeden program gry, jaki gra ma dziś (`GameState.program`, `src/browser/sim/types.ts:148`, loop2 `9a5f360`) — do którego programu reguła trafia, gdy zadanie 12 wniesie kopię programu wykonywaną przez przejście, rozstrzyga zadanie 12: plan stawia mu pytanie „Do którego programu gra wpisuje regułę przy odkryciu, gdy przejście wykonuje kopię programu — do kopii, do zapisanego programu czy do obu?” (plan_mvp_loop2.md, § Open questions, i wpis § Change log z 2026-10-25; decyzja człowieka 2026-10-25) | czy gra zmienia program gracza przy odkryciu i do której grupy wpisuje regułę — także w zadaniach 8 i 9, które dopisują własne odsłonięcia |
| O2 | Odkrycie zatrzymuje przejście tą samą pauzą co „Pauza” — wiersz stanu dopisuje „ (pauza)”, a gracz rusza dalej przyciskiem „Wznów” — a pod wierszem stanu stoi do wznowienia linia w roli `discovery` z tym, co odsłonięto. | decision | pytanie 3, wybory (1) P i (2) A (Mariusz, 2026-10-25) | czy zatrzymanie przy odkryciu jest osobnym stanem gry z własnym przyciskiem i jak długo stoi komunikat — także w zadaniu 7, które ustala tempo po pauzie (rozmowa rozwiazanie-lasu, Q4), i w zadaniach 8 i 9, których odkrycia zatrzymują czas |
| O3 | Odkrycie zapada w kroku minuty gry, który je wywołał — wychłodzenie przy ciele, zakończona akcja przy jej skutku — reszta minuty dzieje się do końca, wybór reguły na końcu tej minuty widzi już to, co odkryto, i regułę wpisaną przy odkryciu, a czas staje po całej minucie. | decision | pytanie 11 (A; Mariusz, 2026-10-25), z kosztem drogi A: „kolejność D-71 dostaje zdanie o odkryciu” | czy dopisać odkrycie do D-71 i czy reguła wpisana przy pierwszym wychłodzeniu rusza w tej samej minucie — także dla odkryć walki zadania 8 |
| O4 | Czas realny przekazany symulacji dla przejścia mapy rozpoczętego przez gracza przesuwa je, aż się skończy, o minutę gry na każdą pełną sekundę realną poza pauzą, a w pauzie przejście stoi; po minucie gry, w której coś odkryto, przejście staje w pauzie, a reszta czasu realnego przekazanego w tym samym wywołaniu przepada. | invariant | pytanie 3, część wspólna wszystkich dróg („reszta czasu realnego przekazanego w chwili odkrycia przepada, a niezmiennik `player-map-run-pace` […] trzeba przepisać”), z (1) P, i pytanie 11 (A) (Mariusz, 2026-10-25) | nowe brzmienie `player-map-run-pace` i jego test, na którym zadanie 7 buduje brzmienie z przewijaniem (pytanie 10) |
| O5 | Przejście przesuwane odcinkiem minut gry dochodzi do tego samego stanu, z tymi samymi zdarzeniami w tej samej kolejności, w każdej minucie gry, jakkolwiek podzielić odcinek na wywołania symulacji, aż do minuty śmierci postaci albo minuty odkrycia włącznie. | invariant | pytanie 11 (A; Mariusz, 2026-10-25), z materiału: „`minute-span-split` może zostać przy brzmieniu o całych minutach (nowe brzmienie dopisze tylko, że odcinek kończy się także na minucie odkrycia)” | czy `minute-span-split` i jego test obejmują odcinek przerwany odkryciem |
| O6 | Do odkrycia pierwszej akcji przycisk „Dodaj regułę” jest nieaktywny, a od niego dokłada regułę „Zawsze → Eksploruj” na końcu grupy. | decision | pytanie 4 (A; Mariusz, 2026-10-25) | co robi „Dodaj regułę”, gdy gracz nie zna żadnej akcji — także w zadaniu 12, które wnosi programy gracza |
| O7 | Wiersz ciała, plecak, lista odsłoniętych kafelków i rysunek mapy pokazują to, co pokazywały przed odkrywaniem. | decision | pytanie 6 (A; Mariusz, 2026-10-25); to, że odkrywanie decyduje o listach edytora programu i o tym, co symulacja pozwala postaci wykonać, mówi już wpis projektowany „Whose is the knowledge of the world, and what may a character use of it?” (“That one computation is at once what the program editor offers and what the simulation lets the character carry out.”), więc wiersz tego nie powtarza | czy wiersz ciała ukrywa sytość przed odkryciem „Sytość poniżej”, a plecak albo mapa nieodkryte przedmioty — także w zadaniach 8–10, które dokładają miary i przedmioty |
| O8 | Symulacja przechodzi nad regułą programu, której warunek, akcja albo cel nie należy do repertuaru postaci, do następnej reguły, jak nad akcją niewykonalną w tej minucie, a reguła zostaje w programie. | decision | pytanie 8 (A; Mariusz, 2026-10-25); obok `program-closed-lists`, który dotyczy rodzaju spoza danych | czy symulacja odrzuca cały program z regułą spoza repertuaru — także przy programach przenoszonych między postaciami w zadaniu 12 i przy drugim archetypie |
| O9 | Akcje, przedmioty i warunki Lasu wchodzą do Zrozumienia przez odkrycia z tabeli punktu 2 „To do”. | decision | pytanie 1 (A; Mariusz, 2026-10-25) | czy łańcuch Lasu wiąże po scaleniu i gdzie stoi to, co co odsłania: wpis projektowany „When does the player learn what the world holds?” niesie samą zasadę, a D-18 wymienia jako treść w plikach danych “game maps, items, creatures, character skills and their numbers”, a nie odsłonięcia, więc bez wiersza łańcuch nie ma miejsca w fundamencie, a cykl sam wybiera, czy odsłonięcia stoją w plikach danych przy akcjach, przedmiotach i warunkach (jak pole `revealedBy` w danych loop), czy w kodzie symulacji — a od tego zależy, czy zadania 8 i 9 dopiszą swoje odsłonięcia samą zmianą danych |

Cięcie: Mariusz, 2026-10-26, „wszystko zgodnie z rekomendacjami” (Turn 14 rozmowy refinementu zadania 6) — wiersze O1–O9 przyjęte; odrzucony, zgodnie z propozycją, wiersz „Pięć umiejętności postaci z parami czasownik × cel i predyspozycje maga żywiołów z punktu 3 „To do””: jego treść stoi w punkcie 3 „To do” i w plikach danych gry (D-18), a zasadę niesie wpis projektowany „What does an archetype open to a character?”. Brzmienie wierszy według odpowiedzi na pytanie 7 (B).
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

This slice starts at the head `dcd529d` (the foundation entries). Its range for review runs from `d9a237435f22c29b7d37430054f6fa7ed0a81323`, shared with the foundation entries.
