# Handoff — executor of slice 7 (`make-change`, a slice)

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; nothing it answers is that person's approval. You ask no human; a question goes back to the orchestrator in your return as `questions`.

## Where you work

- Worktree (your working directory): `the root of the task's worktree` — branch `task/model-czynnosci-i-przedmiotow`. **Your base** (the head of the branch when you start): `19903a2929ca198981adfd0759555f28580cae80`; commit only on this branch; never reset it, never rebase, never touch another worktree. The pinned the-way is the worktree's `.the-way` (`19e5774aed6d1d628042e23deccc110ed9f112c0`).
- Your method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole; your variant is **"a slice, or the retry of a slice"**: read `.the-way/task-cycle/change/slice.md` whole as that row gives. Read `.the-way/task-cycle/change/ui_check.md` only if the slice changes a user interface (the slices that touch `src/browser/view/` do not need a screenshot unless their section says so) — a state check by code and tests is what the plan asks. Do not call a skill; read the files.
- Your stage and its boundary: make **only this slice** (its section below), run its focused checks, commit, and return. Nothing of another slice; no foundation entry beyond what this section names; no change of the plan or the spec (a disagreement of the plan and the code is `slice.md`'s case).
- Your directory for working copies: `.runs/executor-7/` (directly under the ignored `.runs/` of the worktree).
- Report path (full report; the file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it): `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/executor-7-report.md`; its first line is yours (status). It holds what `make-change` section 6 gives: the checks with their command and exit code, the own-work check, the reaches beyond this handoff, **Unread material**, **Searches not found or unclear** (each `none` where nothing), and the line on the working copies.
- `cycle.md` and the other files of `.runs/task-cycles/model-czynnosci-i-przedmiotow/` — other agents' handoffs, reports and findings — are not yours to read, except those this handoff names.
- Answers of step 4: trust boundary **yes** (`src/browser/sim/saved-game.ts`, `src/browser/sim/previous-programs.ts`, `assets/icons/**`, `src/browser/view/judging-cache.ts`); irreversible operation **no**. This slice's risk: none.
- **The gate.** Never run `npm test` with no argument and never run the whole of the tests or `node --test` over a folder of tests: that is the full gate, and its run waits for a signal the orchestrator holds. The focused checks named in the section's *Checks* are `npm test -- <one file>` (it runs exactly one Node or Python test file); run only those and the typecheck, ESLint and Prettier on the files you change. Never skip a hook or a check. Commit by path (`git add <path> …`), never `git add -A`, `git add .` or `git commit -a`; the message in English, the first line in the style of the repository's commits (type, emoji, what and why).
- Where the slice leaves a test failing that a later slice owns (the section says which), do not change that test and do not make it pass by code of this slice that the section does not give; name it in your report.
- The size rule of D-425 (200 lines of code for a function, 800 for a file, comments and blank lines not counted) binds every file you change: run `node tests/quality/eslint-size-rules.mjs` on the tree before you return, and name the result.

Working copies (the first paragraph of "Working copies" of the cycle's skill, word for word):

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Your slice (the plan's section, copied word for word)

### Slice 7 — The bandage, „Wytwórz” and „Opatrz” enter the data and the types

- **Goal:** the shape every later slice builds on (spec Decisions 1–3), with no test of its own: the two verbs
  stay unreachable in the game until Slice 10, since the program check refuses both kinds until then, and their
  tests come in Slices 9, 10, 12, 13 and 16.
  - `src/browser/sim/data/items.ts`: an item row may hold a recipe — the pieces it uses, as a list of item and
    count, at least one piece, in the order of the reasons, and the game minutes it takes; it gives one piece —
    and a healing property, the health one piece restores. The bandage's row: the name „opatrunek” with its
    plural forms, the icon `first-aid-kit` with its title as Foundation entries row 16 records it, revealed by the
    first gathered moss, the recipe of 2 moss in 10 game minutes and the healing of 25 (row 4 of *Settlements to
    record*; the numbers stand only here).
  - `src/browser/sim/data/actions.ts`: a fifth group „Wytwarzanie” after „Żywność i walka”; the row „Wytwórz”
    (kind `craft`) in it, with the icon `claw-hammer` and its title, revealed by the first gathered moss, its time
    taken from its target's recipe; the row „Opatrz” (kind `tend`) in „Żywność i walka” right after „Zjedz —
    jagoda”, with the icon `bandage-roll` and its title as row 15 records it, 10 game minutes of its own, revealed
    by the first crafted bandage. Each of the two rows names the property of the items' rows that gives the verb
    its targets — the recipe, the healing property — and says where its time comes from; `minutes: null` keeps
    meaning the step of a tile, for the movements alone. The status texts are the maker's.
  - `src/browser/sim/data/revelations.ts`: a new kind of revealing event, the first crafted piece of an item,
    naming the item; the simulation starts to give it in Slice 12.
  - `src/browser/sim/types.ts`: `Action` gains the kind `craft` and the kind `tend`, each naming its target by
    the field `item`.
  - A new module `src/browser/sim/action-targets.ts` (spec Decision 3, unit 1): for a kind of action, whether it
    takes an item as its target and the items it takes — the items of the data, in the data's order, whose row
    holds the property the verb's row names — read from the tables at each call, never kept from the load,
    depending on the data of actions and items alone. Its row, status `copy`, joins the table "Files of this kind"
    of `guidelines/coding-simulation-module.md`.
  - `src/browser/sim/program.ts`, `worldRefusal`: „Wytwórz” with a target is refused with „brakuje {ile} ×
    {rzecz}” for the first piece of the recipe, in the recipe's order, that the backpack lacks, and needs no
    revealed tile and no room; „Opatrz” with a target is refused with „zdrowie pełne” where health stands at the
    data's starting health, its cap, else with „brakuje 1 × {rzecz}” where the backpack holds no piece of the
    target (rows 10 and 15).
  - `src/browser/view/program-editor.ts`, `withActionKind`: a change of the action to a verb with an item target
    takes the first of the verb's targets the editor offers, in the data's order, and does nothing where none is
    offered, as today for a resource; `changedProgram` in `src/browser/view/rule-panel.tsx` hands it the offered
    items.
  - `src/browser/view/scene-picture.ts`: at both verbs the mage stays where it stands (`goalOf`, row 11), and
    both join `USES_BACKPACK`.

  After this slice these tests fail, each until the slice named, and this slice changes none of them:
  `tests/sim/data.test.mjs` and `tests/sim/trip.test.mjs` (Slice 9); `tests/invariants/test_program_closed_lists.py`
  (Slice 10); `tests/sim/saved-game.test.mjs` (Slice 11); `tests/view/icons.test.mjs`,
  `tests/invariants/test_icon_credits.py` and the tests of the screens that draw the credits, the login card and
  Siedziba, since `bandage-roll` and `first-aid-kit` have no file and no credit yet (Slice 8);
  `tests/view/program-editor.test.mjs` (Slice 13); the case of the groups of the action pick in
  `tests/view/rule-editor.test.mjs` (Slice 15). The report names every other test file that fails after the slice.
  The report sorts each changed file as one-time for the model or for the bandage alone (*To do* 14).
- **Change:** `src/browser/sim/data/items.ts` · `src/browser/sim/data/actions.ts` ·
  `src/browser/sim/data/revelations.ts` · `src/browser/sim/types.ts` · `src/browser/sim/action-targets.ts` ·
  `src/browser/sim/program.ts` · `src/browser/view/program-editor.ts` · `src/browser/view/rule-panel.tsx` ·
  `src/browser/view/scene-picture.ts` · `guidelines/coding-simulation-module.md`
- **Read:** `guidelines/coding.md` · `guidelines/coding-content-data.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `src/browser/sim/data/resources.ts` ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:30-43` To do, items 1–9 ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:145-151` Questions carried to cycle ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:56-91` Constraints ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:115-164` Decision 1 — An item no map holds, and what a
  resource is · `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:166-191` Decision 2 — Where the recipe
  and the healing property stand · `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:193-279` Decision 3 —
  The verb with a target · Foundation entries row 1 · `foundations/decisions.md:841-858` D-425 · `foundations/invariants.md:1428-1436` function-and-file-size · `foundations/decisions.md:306-330` D-18 ·
  `foundations/decisions.md:7815-7857` D-23 · `foundations/decisions.md:7885-7914` D-26 ·
  `foundations/decisions.md:7450-7488` D-121, as row 4 changes it · `foundations/decisions.md:7651-7690` D-128 ·
  `foundations/decisions.md:9576-9597` D-290, as row 3 changes it · `foundations/decisions.md:11507-11534` D-318,
  as row 5 changes it · `foundations/decisions.md:8106-8119` D-380, as row 8 changes it ·
  `foundations/decisions.md:9833-9867` D-310 · `foundations/decisions.md:6823-6839` D-145, as row 2 changes it ·
  `foundations/decisions.md:6701-6739` D-140 · `foundations/decisions.md:9672-9715` D-306 ·
  `foundations/invariants.md:364-373` program-closed-lists ·
  `foundations/invariants.md:386-395` program-world-reference · `foundations/invariants.md:226-234`
  simulation-inputs · `foundations/glossary.md:123-128` Understanding · `foundations/part_map.md:3-65`
  browser-view, simulation · `foundations/part_map.md:140-158` agent-workflow
- **Model:** same — a change across the simulation and the browser view, in ten files, whose shape every later slice
  builds on
- **Risk:** none
- **Checks:** `npm run typecheck` · `npm test -- tests/sim/rule-signs.test.mjs` ·
  `npm test -- tests/sim/program.test.mjs` · `npm test -- tests/sim/repertoire.test.mjs` ·
  `npm test -- tests/view/scene-picture.test.mjs` · `npm test -- tests/quality/test_function_and_file_size.py`
- **Depends on:** Slices 4, 6 · Foundation entries rows 1, 2, 3, 4, 5, 8, 15, 16

## Passages the slice's *Read* names (copied word for word; the file and the lines stand in the heading)

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:30-43` To do, items 1–9

```text
1. Dane gry mają przedmiot „opatrunek”, który się wytwarza i nie leży na żadnej mapie; jak dane odróżniają taki przedmiot od tego, co leży na mapach, wybiera cykl (zob. *Questions carried to cycle*).
2. Dane gry mają przepis na opatrunek: 2 × mech daje 1 opatrunek w 10 minut gry. Liczby są wstępne: mierzy je zadanie 6 na mapie z watahą i może je poprawić (pytanie 3). Liczby stoją tylko w danych gry: D-387 ich nie dostaje, a testy biorą je z danych, nie wpisują ich na sztywno (D-82), więc zadanie 6 poprawia je samą zmianą danych.
3. Postać wykonuje czynność „Wytwórz” z celem: celem może być każdy przedmiot, który ma w danych przepis, i tylko taki, a zbiór celów wynika z danych, nie z listy w kodzie. „Wytwórz — Opatrunek” po czasie przepisu zabiera z plecaka składniki przepisu i wkłada do niego opatrunek, razem (D-71); przerwana napaścią nie zabiera nic (D-142) (pytanie 8). Bez składników program pomija regułę, jak każdą czynność, której nie da się wykonać (D-23).
4. Postać wykonuje czynność „Opatrz” z celem: celem może być każdy przedmiot, któremu dane dają własność leczenia, i tylko taki. „Opatrz — Opatrunek” trwa 10 minut gry i na jej końcu, razem, zużywa jedną sztukę opatrunku z plecaka i przywraca 25 zdrowia, nie ponad pełne zdrowie (D-387), bez względu na to, co zdrowie zabrało — zimno, głód czy cios w walce (pytanie 2; D-60 zostaje bez zmian); przerwana napaścią nie zabiera nic (pytanie 8). Liczby są wstępne, jak w punkcie 2 (pytanie 3).
5. Przy pełnym zdrowiu — równym 100, pułapowi zdrowia z D-387 — „Opatrz” nie da się wykonać: program pomija regułę z powodem „zdrowie pełne”, tak jak pomija „Zapal — ognisko”, gdy ognisko już płonie; przy 99,95 da się. Koniec czynności sprawdza to samo co jej początek: gdy zdrowie wróciło samo do pełna w trakcie tych 10 minut, opatrunek zostaje w plecaku, a czynność kończy się bez skutku, jak zapalanie, które na końcu zastaje ognisko już płonące (pytanie 10). W walce „Opatrz” się nie wykonuje, bo w walce działają tylko czynności walki (D-140); opatrzenie w trakcie starcia to gałąź Ucisk z zadania 6 (pytanie 2).
6. Program zapisuje obie czynności jako rodzaj czynności i cel będący rodzajem przedmiotu, nigdy sztuką (D-23, D-26, niezmiennik `program-world-reference`); sprawdzenie programu odrzuca „Wytwórz” albo „Opatrz” z celem, którego dane tej czynności nie dają — to zdanie nowej decyzji trzyma test z linią `decision:` w jej *Verification*, bo niezmiennik `program-closed-lists` mówi o rodzajach czynności, nie o celach, i zostaje bez zmian; a regułę z celem spoza repertuaru postaci symulacja pomija, jak dziś regułę „Zbierz” z takim celem (D-126).
7. Edytor programu oferuje „Wytwórz” i „Opatrz” w wyborze czynności i po wyborze prowadzi do pola celu, jak przy „Zbierz” (D-306); przy czynności stoją jej czas i cena (D-293, D-363), a reguła, której nie da się wykonać, podaje powód (D-310). Szczegóły (pytanie 6):
   - Grupa w wyborze czynności: „Opatrz” staje w grupie „Żywność i walka”, obok „Zjedz — jagoda”; „Wytwórz” staje w nowej, piątej grupie „Wytwarzanie”; „Wytwórz — ognisko” zostaje w grupie „Ogień”.
   - Ikony: „Wytwórz” ma ikonę młotka, tę samą co „Wytwórz — ognisko” (`claw-hammer`); „Opatrz” dostaje ikonę zwoju bandaża (`bandage-roll`), a przedmiot opatrunek ikonę apteczki (`first-aid-kit`) — obie z game-icons.net, ze wzmianką w sekcji „Autorzy grafiki” (D-27).
   - Cena i czas: cena czynności z celem stoi przy każdym celu w wyborze celu i przy wybranej czynności: „Wytwórz — Opatrunek (2 mchy)”, „Opatrz — Opatrunek (1 opatrunek)”. Czynność, której czas daje cel, pokazuje go przy każdym celu w wyborze celu, obok ceny: „Opatrunek (2 mchy)” i obok „10 min” (pytanie 9). Komórka „Wytwórz” w wyborze czynności nie ma ani ceny, ani czasu, bo oba daje przepis celu; komórka „Opatrz” ma swój czas, bez ceny.
   - Słowa: wiersz reguły, wiersz „Teraz” i kronika piszą „Wytwórz — Opatrunek” i „Opatrz — Opatrunek”, jak „Zbierz — Patyk” (D-334, D-340). Powody, gdy reguły nie da się wykonać: „brakuje 2 × mech” przy „Wytwórz — Opatrunek”, „brakuje 1 × opatrunek” i „zdrowie pełne” przy „Opatrz — Opatrunek”, a gdy prawdziwe są oba, reguła podaje „zdrowie pełne”, tak jak „ognisko już płonie” stoi przed „brakuje 2 × patyk” (pytanie 11); w minutach napaści reguła z którąkolwiek z nich jest zwykłą regułą z powodem „trwa walka” (D-309).
   - Scena: przy obu czynnościach mag stoi tam, gdzie stał, jak przy „Zjedz — jagoda”; scena nie dostaje nowego obrazka ani efektu.
8. Opatrunek, „Wytwórz” i „Opatrz” wchodzą do Zrozumienia przez zdarzenia zapisane w danych przy każdej z tych rzeczy (D-128): pierwsza zebrana sztuka mchu odsłania opatrunek i „Wytwórz”, a pierwsza wytworzona sztuka opatrunku odsłania „Opatrz”. „Pierwsza wytworzona sztuka przedmiotu” to nowy rodzaj zdarzenia odsłaniającego, który symulacja zaczyna obsługiwać; potem następny przedmiot z przepisu dostaje takie odsłonięcie samą zmianą danych. Warunek „Zdrowie poniżej” zostaje przy pierwszej napaści wilka (D-143) (pytanie 4).
9. Opatrunek jest przedmiotem wszędzie tam, gdzie gra liczy i pokazuje przedmioty: zajmuje miejsce w plecaku i w skrzynce (D-64, D-50), stoi na listach „Zabierz” i „Wynieś” planu wyprawy (D-179, D-181), w warunku „Zapas poniżej”, w wierszu plecaka i na ekranie Wiedza (D-416). Nie staje wśród celów „Idź”, „Zbierz” i „Obchód” ani w warunku „Tu leży mniej niż” — ani w przejściu mapy, ani poza nim — bo nie leży na żadnej mapie (pytanie 1).
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:145-151` Questions carried to cycle

```text
## Questions carried to cycle

- „Czy przedmiot w plecaku przestaje być tym samym co zasób mapy?” (pytanie otwarte definicji, plan: zadanie 5) — w części o sposobie zapisu danych gry. To, co widzi gracz, rozstrzyga pytanie 1 w *Questions to settle*; jak dane gry odróżniają przedmiot, który powstaje z przepisu, od tego, co leży na mapach, wybiera cykl przy próbie, jak mówi notatka zakresu (the project's scope note, „Kierunek”, punkt 7: „Przy próbie rozstrzyga się, czy przedmiot w plecaku przestaje być tym samym co zasób mapy.”).
- Co cykl zastaje: dane gry mają dziś osobną tabelę przedmiotów i osobną tabelę zasobów map o tych samych identyfikatorach (`src/browser/sim/data/items.ts`, `ITEMS` i linia „export type ItemId = ResourceId;”; `src/browser/sim/data/resources.ts`, `RESOURCES`), a edytor programu buduje cele „Idź”, „Zbierz”, „Obchód” i „Tu leży mniej niż” z tabeli zasobów, a cele „Zapas poniżej” z tabeli przedmiotów (`src/browser/view/program-editor.ts`, funkcje `resourcePick` i `conditionTargetPick`).
- Dwie drogi, które doprecyzowanie znalazło, bez wyboru między nimi: przedmioty dostają własne identyfikatory, a zasób mapy mówi, jaki przedmiot daje jego zebranie — jednorazowa zmiana wszędzie tam, gdzie kod traktuje dziś obie rzeczy jako jedną; albo opatrunek zostaje wpisany między zasoby jako taki, którego żadna mapa nie ma — mniej zmian dziś, ale każda lista tego, co leży na kafelkach, musi go odsiewać, także przy sznurze i tłuku.
- Co wiąże wybór cyklu: odpowiedź na pytanie 1, kryterium akceptacji (następny przedmiot z przepisu albo z własnością leczenia jest samą zmianą danych) i punkt 14 *To do*, według którego prośba o scalenie mówi, którą drogę cykl wybrał i ile kosztowała.
- Gdzie w danych stoi przepis i własność leczenia — przy wierszu przedmiotu, jak dziś `fuel`, `food` i `lightable` w `src/browser/sim/data/items.ts`, czy w osobnej tabeli przepisów, jak w starej grze (`recipes.ts`) — wybiera cykl; osobna tabela dochodzi do `OVERLAY_TABLES` w `balance/overlay.mjs` i do tabeli „Files of this kind” w `guidelines/coding-content-data.md`. Przepis daje jedną sztukę przedmiotu, jak w starej grze, więc wytworzenie nigdy nie zwiększa liczby sztuk w plecaku: „Wytwórz” nie dostaje powodu „plecak pełny”, a D-380 nie zmienia się o to.
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:56-91` Constraints

```text
## Constraints

From the task (quoted where the task settles it, so the spec does not settle it again):

- The numbers 2 moss, 10 minutes of the recipe, 10 minutes of „Opatrz” and 25 health are preliminary,
  stand only in the game's data, are not given to D-387, and tests take them from the data
  (*To do* 2, 4; Question 3).
- „Wytwórz” and „Opatrz” take what they use only at their end, together with their effect, and an
  attack that interrupts them takes nothing (*To do* 3, 4; Question 8; D-63, D-71, D-142).
- „Opatrz” cannot be carried out at full health, 100, the cap of D-387, and can at 99.95; its end
  checks what its start checks, so a bandage stays in the backpack where health came back to full
  meanwhile (*To do* 5; Question 10). It is no combat verb (D-140), so in the minutes of an attack its
  rule is an ordinary rule with „trwa walka” (D-309).
- Reasons: „brakuje 2 × mech” at „Wytwórz — Opatrunek”; „zdrowie pełne” and „brakuje 1 × opatrunek”
  at „Opatrz — Opatrunek”, „zdrowie pełne” first where both hold (*To do* 7; Questions 2, 11; D-380,
  D-310). „Wytwórz” gets no reason „plecak pełny”: a recipe gives one piece (*Questions carried to
  cycle*, last paragraph).
- The view: „Opatrz” in the group „Żywność i walka” beside „Zjedz — jagoda”; „Wytwórz” in a new, fifth
  group „Wytwarzanie”; „Wytwórz — ognisko” stays in „Ogień”; icons `claw-hammer` for „Wytwórz”,
  `bandage-roll` for „Opatrz”, `first-aid-kit` for the bandage; prices and times as *To do* 7 and
  Question 9 give; the mage stays where it stands (*To do* 7; Question 6).
- Revelations: the first gathered moss reveals the bandage and „Wytwórz”; the first crafted bandage
  reveals „Opatrz”; „Zdrowie poniżej” stays with the first wolf attack (*To do* 8; Question 4; D-143).
- The program names a kind of item as the target, never a piece (D-23, D-26, invariant
  `program-world-reference`); the check refuses a target the data do not give the verb; a rule whose
  target lies outside the repertoire is passed over (D-126) (*To do* 6). The invariant
  `program-closed-lists` stays as it is.
- The new decision's two sentences are the approved definition's, word for word (*Decisions in play*,
  „Zadanie zapisuje”).
- The saved game state's version rises: a new item changes `Backpack`, and two new ordinary actions
  change the keys of `minutesByAction` (`guidelines/coding-saved-game.md`, „Wersja podnoszona razem
  z kształtem”; D-206; *Context*).
- The instrument takes the game's numbers from the built game and refuses an identifier the data lack
  with an error naming it (`guidelines/coding-balance-instrument.md`, „Liczba gry”, „Odmowa
  nieznanego identyfikatora”; D-437); it writes no file outside `balance/cli.mjs` and reads no clock
  (invariants `balance-instrument-file-writes`, `balance-instrument-repeatability`).
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:115-164` Decision 1 — An item no map holds, and what a
  resource is

```text
### Decision 1 — An item no map holds, and what a resource is

**Chosen.** Every item of the game stands as a row of `ITEMS` and has its own words there: its name,
the plural forms of its name, its icon and the icon's title. A resource is an item that lies on the
maps: `RESOURCES` keeps one row for each item some game map holds on its tiles, under that item's
identifier, and an item no map holds, as the bandage, has no resource row. The identifier of an item
is a key of `ITEMS` (`ItemId`); the identifier of a resource is a key of `RESOURCES` (`ResourceId`),
and every resource identifier is an item identifier, which the type checker holds. The map-side word
for what gathering gives stays „resource”: gathering a resource gives pieces of the item of the same
identifier, as today. The four items that are resources (stick, berry, moss, fibre) take their words
from their resource rows by reference, as the name is taken today, so no word stands twice; the
bandage has its own words in its item row.

Every reader that names or draws an item — the reason „brakuje {ile} × {rzecz}”, the price of an
action, the icon on the screen Wiedza, the icon of a trip-plan position, the credits — reads the
item's row; every reader that names or draws a resource on a map — the tiles, the map's card, the
scene's props, „Tu leży mniej niż”, „Idź — {rzecz}”, „Zbierz — {rzecz}” — keeps reading the resource's
row. The lists of what lies on tiles (`offeredResources`, `knownResources`, `resourcePick`, the
check's `allowedResources`) are built from `RESOURCES` and the maps as today, so the bandage never
stands among the targets of „Idź”, „Zbierz”, „Obchód” and „Tu leży mniej niż”, in a map run or
outside one, with no filter (Question 1, settlement 1). The lists of items (`offeredItems`, the trip
plan's lists, the backpack row, the chest, Wiedza) are built from `ITEMS`, so the bandage stands in
them (*To do* 9).

Ways weighed:

- (A) Items with identifiers of their own and a field on each resource row naming the item its
  gathering gives, so a resource may give an item of another identifier. It is the first way the
  task names in full. Cost now: every place that reads a resource as an item — the gathering, the
  revelation of a tile that holds an item, the repertoire's check of a resource target, the editor's
  pick, which today carries `ItemId` for a resource — changes to go through the field, with tests;
  nothing the task asks needs a resource that gives an item of another identifier. Cost later: none
  more. Rejected: the cost buys a case no source asks for; it can be added the day one does, by a
  field on the resource row.
- (B) The bandage written among the resources as a resource no map has (the second way the task
  names). Cost now: smaller in the types, but every list of what lies on tiles must filter it out —
  `knownResources` and `resourcePick` of the editor iterate `RESOURCES` — and the load would admit a
  tile holding bandages, since it reads a tile's stock against `RESOURCES`. Cost later: the same
  filter for every crafted item (rope, pestle). Rejected for that recurring cost and the wrong
  admission at the load.
- (C) No `RESOURCES` table: a resource is any item some map lists. Cost now: every reader of
  `RESOURCES` (about sixteen files) changes, and `resources.ts` is the exemplar of `content-data`
  (D-34), whose removal is a change of that decision. Rejected.
- Chosen (D): the items' table widened to items that are no resource, the resource table unchanged
  in its keys and kept as the exemplar. Cost now: the item row gains plural, icon and title; the
  readers that name an item switch from the resource row to the item row (a handful of files); the
  content-identifiers invariant extends to items (Foundation entries). Cost later: an item no map
  holds is one row of `ITEMS`; an item that lies on maps is a row of `ITEMS`, a row of `RESOURCES`
  and its place in the maps, as today. Cost if wrong: where a later item must be gathered as another
  item, way (A) is added then; nothing of this way is undone by it.
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:166-191` Decision 2 — Where the recipe
  and the healing property stand

```text
### Decision 2 — Where the recipe and the healing property stand

**Chosen.** In the row of the item, as `fuel`, `food` and `lightable` stand today: an item made by
„Wytwórz” holds a recipe — the pieces it uses, as a list of item and count in an order that is the
order of the reasons, and the game minutes it takes — and gives one piece; an item that „Opatrz”
uses holds a healing property — the health one piece restores. The bandage holds the recipe of 2
moss in 10 game minutes and the healing of 25 health. „Opatrz” takes its own 10 game minutes from
its action row, not from the item (*To do* 7: „komórka „Opatrz” ma swój czas”). A recipe uses at
least one piece, so crafting never raises the count of the backpack and never needs room; the data
are checked for that by a test of the data, not by the effect.

The overlay of the balance instrument needs nothing new: `ITEMS` already stands in `OVERLAY_TABLES`
(`balance/overlay.mjs`), and an overlay that lays an item row with its words, its recipe and its
healing property, or changes the recipe of the bandage, reaches every reader that reads the table at
call time. No new data file comes, so the table „Files of this kind” of
`guidelines/coding-content-data.md` keeps its rows.

Ways weighed:

- A table of recipes apart from the items, as in loop (`recipes.ts`). Cost now: a new data file, a
  row in the content-data guidelines, a new entry of `OVERLAY_TABLES`, and a join wherever the targets
  of „Wytwórz” are read. Gain: several recipes for one item, or a recipe that makes a thing that is no
  item. Neither is asked; the campfire, the one made thing that is no item, keeps its own action.
  Rejected.
- Chosen: the row. Cost later: a second recipe for one item changes the field into a list, one change
  of the data's shape and of its readers.
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:193-279` Decision 3 —
  The verb with a target

```text
### Decision 3 — The verb with a target

**Chosen.** Two new kinds of action join the closed list of `ACTIONS` and the type `Action`, each
naming its target by the field `item`, as the condition „Zapas poniżej” does:
`{ kind: "craft", item }` („Wytwórz”) and `{ kind: "tend", item }` („Opatrz”). The kinds of today keep
their shapes. The row of each new verb in `ACTIONS` names the property of the items' rows that gives
the verb its targets — the recipe for „Wytwórz”, the healing property for „Opatrz” — so the targets
are data.

Units the design adds or changes, each behind one interface:

1. **The targets of a verb** — a new small module of the simulation (its name is the maker's; it
   joins the table „Files of this kind” of `guidelines/coding-simulation-module.md` as `copy`). It
   gives, for a kind of action, whether the kind takes an item as its target and the items it takes:
   the items of the data, in the data's order, whose row holds the property the verb's row names,
   read from the tables at each call, never captured at load. It depends on the data of actions and
   items only. Every other unit asks it; none writes its own list.
2. **The check of a program** (`checkAction`, `src/browser/sim/programs.ts`). A kind that takes an
   item is accepted only with an `item` among the verb's targets, and the action is built from `kind`
   and `item` alone, as an action with a resource is built from `kind` and `resource` today (the load
   refuses a field beyond them, as it does today by comparing the document with what the check built);
   any other `item` is the check's refusal (`ProgramCheckError`) naming the value. Through the check this holds
   for the editor's program, for the load of a saved game state (refusal `shape`) and for the reader of
   a previous save (the item skipped and named) (D-401, D-213).
3. **The repertoire** (`src/browser/sim/understanding.ts`). The Understanding records „Wytwórz” and
   „Opatrz” by kind; an action with an item target lies in the repertoire where its kind and its item
   lie there (`actionInRepertoire`); the reason of a rule outside it names the item as the data name it
   (`undiscoveredPart`). Neither kind is grown by a character skill, so both are open to every
   character and add no practice (D-120, D-193; *To do* 10).
4. **The revelations** (`src/browser/sim/data/revelations.ts`, `happened` in `understanding.ts`). A new
   kind of revealing event, the first crafted piece of an item, naming the item; the minute in which a
   „Wytwórz” ends with its effect gives it for its target. The data: the bandage and „Wytwórz” revealed
   by the first gathered moss; „Opatrz” by the first crafted bandage (*To do* 8). A later item made by
   a recipe is revealed by a change of data alone (D-128).
5. **Refusal, price and time** (`src/browser/sim/program.ts`, `src/browser/sim/run.ts`). „Wytwórz” with
   a target: refused with „brakuje {ile} × {rzecz}” for the first piece of the recipe, in the recipe's
   order, the backpack lacks; needs no revealed tile and no room. „Opatrz” with a target: refused with
   „zdrowie pełne” where health stands at the data's starting health, its cap, else with „brakuje 1 ×
   {rzecz}” where the backpack holds no piece of the target. In combat both give „trwa walka”, as every
   ordinary action. The price of an action is read for the action with its target: „Wytwórz” the
   recipe's pieces of its target, „Opatrz” one piece of its target; the price of the bare verb, with no
   target, is none. The time: „Wytwórz” the recipe's minutes of its target, „Opatrz” the minutes of its
   own row, each through the branches' duration rule as every action (`actionMinutes`), none of which
   touches them today. The data of the verb's row say where its time comes from; `minutes: null` keeps
   meaning the step of a tile, for the movements alone.
6. **The effect** (`landUse` in `run.ts`, a function of the body in `body.ts`). „Wytwórz” at its end,
   where the backpack still holds the recipe's pieces: they leave and one piece of the target enters,
   together. „Opatrz” at its end, where health stands below its cap and the backpack holds a piece of the
   target: the piece leaves and health rises by the target's healing, not above the cap, together; where
   either does not hold, nothing changes and nothing is paid (`finishUse`). An attack before the end
   takes nothing (D-142).
7. **The editor** (`src/browser/view/program-editor.ts`, `rule-panel.tsx`, `rule-list.tsx`). The action
   pick holds „Wytwórz” in the group „Wytwarzanie” and „Opatrz” in „Żywność i walka” right after
   „Zjedz — jagoda”; a pick of either moves on to the field of the action's target (D-306), whose pick
   holds the verb's targets the Understanding holds, the held target included where it does not, each
   cell named by the item's name, capitalised, with its price in brackets, „Opatrunek (2 mchy)”,
   „Opatrunek (1 opatrunek)”, and, for „Wytwórz”, its time beside it, „10 min”. The cell „Wytwórz” of
   the action pick shows no price and no time; the cell „Opatrz” shows its time and no price. The value
   of the action field shows the verb, its target and the price, „Wytwórz — Opatrunek (2 mchy)”,
   „Opatrz — Opatrunek (1 opatrunek)”, with the time beside it; the rule's row shows „Wytwórz —
   Opatrunek” and „Opatrz — Opatrunek” and the time, no price (D-363), and „Teraz” and the chronicle
   take the row's words (D-334, D-340). A verb none of whose targets the Understanding holds stands
   greyed in the pick with „nie znasz jeszcze celu”, as „Idź” does (D-289). Changing the action to a
   verb with an item target takes the first of its known targets in the data's order, and does nothing
   where none is known, as today for a resource.
8. **The scene and the credits** (`src/browser/view/scene-picture.ts`, `credit-lines.ts`,
   `credits.ts`). The mage stays where it stands at both verbs (D-318); both kinds join the hand-written
   set of the actions whose end takes pieces out of the backpack (`USES_BACKPACK`), so the effect of a
   gathering is not read from a net change. The credits name the two new icons once each; the items'
   icons come from the items' rows.
9. **The balance instrument** (`balance/describe.mjs`, `balance/trace.mjs`). An action with an item
   target is described and traced with the item's name from the data, as an action with a resource
   is, and an item the data lack is an error naming it. The engine needs no change: its full
   Understanding and the game's functions read the tables at call time.

Ways weighed:

- One action kind for every verb with a target, `{ kind: "verb", verb, target }`, with the verbs in a
  table of their own. Cost now: the Understanding, the record's `minutesByAction`, the skills and the
  practice key on the kind of action today, and each would need the verb besides the kind; a second
  closed list beside `ACTIONS`. Gain: none the task asks, since a new verb takes code for its effect
  either way. Rejected.
- The target named `resource` on the new kinds, as on „Zbierz”. Rejected: a target of „Wytwórz” is an
  item no map holds; `item` is the field „Zapas poniżej” uses for an item.
- Chosen: two kinds with an `item`, their targets from a property the verb's data row names. Cost later:
  a new verb with an item target is a new kind with its effect in code (D-128's rationale says the same
  of a new revealing event); a new target of an existing verb is a row of data.
```

## Foundation entries to read, each whole, by their address in the worktree as it stands now

The foundation step moved `foundations/decisions.md` and `foundations/invariants.md`; the ranges below are the current ones and hold where they differ from the plan's. An entry runs from its heading to the next heading. The decisions and invariants the plan names:

- `foundations/decisions.md:841-859` D-425
- `foundations/decisions.md:306-331` D-18
- `foundations/decisions.md:7847-7890` D-23
- `foundations/decisions.md:7917-7947` D-26
- `foundations/decisions.md:7464-7521` D-121
- `foundations/decisions.md:7683-7723` D-128
- `foundations/decisions.md:9665-9691` D-290
- `foundations/decisions.md:11604-11642` D-318
- `foundations/decisions.md:8138-8154` D-380
- `foundations/decisions.md:9926-9961` D-310
- `foundations/decisions.md:6831-6854` D-145
- `foundations/decisions.md:6701-6740` D-140
- `foundations/decisions.md:9765-9809` D-306
- `foundations/invariants.md:1428-1437` function-and-file-size
- `foundations/invariants.md:364-374` program-closed-lists
- `foundations/invariants.md:386-396` program-world-reference
- `foundations/invariants.md:226-235` simulation-inputs
- the entries the plan's *Foundation entries* rows name that your section names as changed ("as row N changes it") are written already by the foundation step (commit `ed70970a`); read them as they stand. The new decision „How does an action name what it acts on?” is **D-443**.

- `foundations/glossary.md:123-128` Understanding
- `foundations/part_map.md:3-65`
  browser-view, simulation
- `foundations/part_map.md:140-158` agent-workflow

## Guideline files and instruction files to read, each whole

- `guidelines/coding.md`
- `guidelines/coding-content-data.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/AGENTS.md`
- `guidelines/coding.md` is the general coding guideline (it holds the kinds index); `guidelines/testing.md` is read whole before you write or change a test.

## Files you change (the slice's *Change*; read each whole before you change it; a file that does not exist yet you create)

- `src/browser/sim/data/items.ts`
- `src/browser/sim/data/actions.ts`
- `src/browser/sim/data/revelations.ts`
- `src/browser/sim/types.ts`
- `src/browser/sim/action-targets.ts`
- `src/browser/sim/program.ts`
- `src/browser/view/program-editor.ts`
- `src/browser/view/rule-panel.tsx`
- `src/browser/view/scene-picture.ts`
- `guidelines/coding-simulation-module.md`

## Other files of code and tests to read (whole, or in the range named)

- `src/browser/sim/data/resources.ts`


## What you return

Status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. Commit everything of the slice before you return; leave the worktree clean.
