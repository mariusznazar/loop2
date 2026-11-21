# Handoff — executor of slice 9 (`make-change`, a slice)

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; nothing it answers is that person's approval. You ask no human; a question goes back to the orchestrator in your return as `questions`.

## Where you work

- Worktree (your working directory): `the root of the task's worktree` — branch `task/model-czynnosci-i-przedmiotow`. **Your base** (the head of the branch when you start): `1351e3a1e9392852085ecc40949d04f07ebe6804`; commit only on this branch; never reset it, never rebase, never touch another worktree. The pinned the-way is the worktree's `.the-way` (`19e5774aed6d1d628042e23deccc110ed9f112c0`).
- Your method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole; your variant is **"a slice, or the retry of a slice"**: read `.the-way/task-cycle/change/slice.md` whole as that row gives. Read `.the-way/task-cycle/change/ui_check.md` only if the slice changes a user interface (the slices that touch `src/browser/view/` do not need a screenshot unless their section says so) — a state check by code and tests is what the plan asks. Do not call a skill; read the files.
- Your stage and its boundary: make **only this slice** (its section below), run its focused checks, commit, and return. Nothing of another slice; no foundation entry beyond what this section names; no change of the plan or the spec (a disagreement of the plan and the code is `slice.md`'s case).
- Your directory for working copies: `.runs/executor-9/` (directly under the ignored `.runs/` of the worktree).
- Report path (full report; the file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it): `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/executor-9-report.md`; its first line is yours (status). It holds what `make-change` section 6 gives: the checks with their command and exit code, the own-work check, the reaches beyond this handoff, **Unread material**, **Searches not found or unclear** (each `none` where nothing), and the line on the working copies.
- `cycle.md` and the other files of `.runs/task-cycles/model-czynnosci-i-przedmiotow/` — other agents' handoffs, reports and findings — are not yours to read, except those this handoff names.
- Answers of step 4: trust boundary **yes** (`src/browser/sim/saved-game.ts`, `src/browser/sim/previous-programs.ts`, `assets/icons/**`, `src/browser/view/judging-cache.ts`); irreversible operation **no**. This slice's risk: none.
- **The gate.** Never run `npm test` with no argument and never run the whole of the tests or `node --test` over a folder of tests: that is the full gate, and its run waits for a signal the orchestrator holds. The focused checks named in the section's *Checks* are `npm test -- <one file>` (it runs exactly one Node or Python test file); run only those and the typecheck, ESLint and Prettier on the files you change. Never skip a hook or a check. Commit by path (`git add <path> …`), never `git add -A`, `git add .` or `git commit -a`; the message in English, the first line in the style of the repository's commits (type, emoji, what and why).
- Where the slice leaves a test failing that a later slice owns (the section says which), do not change that test and do not make it pass by code of this slice that the section does not give; name it in your report.
- The size rule of D-425 (200 lines of code for a function, 800 for a file, comments and blank lines not counted) binds every file you change: run `node tests/quality/eslint-size-rules.mjs` on the tree before you return, and name the result.

Working copies (the first paragraph of "Working copies" of the cycle's skill, word for word):

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Your slice (the plan's section, copied word for word)

### Slice 9 — The tests of the data and of the trip take the bandage and the two verbs

- **Goal:** the tests of the simulation that write the data's lists out by hand take what the data gained, with
  the data's change as the reason of each changed expectation, and test what the data must hold. In
  `tests/sim/data.test.mjs`: the items are the four resources and the bandage, the bandage no resource and on no
  map; the groups of the action pick are five, „Opatrz” after „Zjedz — jagoda” and „Wytwórz” in „Wytwarzanie”
  (D-290 as row 3 changes it); the first gathered moss reveals the bandage and „Wytwórz”, the first crafted bandage
  reveals „Opatrz”, and every action and condition stands in one revealing row (D-121 as row 4 changes it); every
  recipe of the items' rows uses at least one piece of items of the data and every healing property is a positive
  number (spec Decision 2); the cases of the actions free of every character skill hold the two verbs. In
  `tests/sim/trip.test.mjs` the backpacks expected hold the bandage at 0. The foundation step wrote D-290 with „five named groups”; a `decision:` line of `tests/sim/data.test.mjs` quotes the sentence of D-290 (`tests/sim/data.test.mjs:206`, around the line named) and the foundation check, `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`, reports it until the line quotes the sentence as the log now holds it: this slice changes that line to the sentence as D-290 reads now (the log is the source, never from memory). `tests/invariants/test_content_identifiers.py` fails after Slice 7: its tripwire reports that the data now hold the
  item `bandage` named `opatrunek`, which the `ENTRIES` list of the test does not hold; the list takes the item and its
  name as the invariant's sentence (as Foundation entries row 13 words it) and the data give them, and nothing else of
  the test changes. No product code changes. The report sorts
  each changed file as one-time for the model or for the bandage alone (*To do* 14).
- **Change:** `tests/sim/data.test.mjs` · `tests/sim/trip.test.mjs` · `tests/invariants/test_content_identifiers.py`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-content-data.md` ·
  `src/browser/sim/data/items.ts` · `src/browser/sim/data/actions.ts` · `src/browser/sim/data/revelations.ts` ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:30-34` To do, items 1–5 ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:42-44` To do, items 8–10 ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:166-191` Decision 2 — Where the recipe and the healing
  property stand · `foundations/decisions.md:7450-7488` D-121, as row 4 changes it ·
  `foundations/decisions.md:7651-7690` D-128 · `foundations/decisions.md:9576-9597` D-290, as row 3 changes it ·
  `foundations/decisions.md:7426-7448` D-120 · `foundations/decisions.md:1044-1057` D-82 ·
  `foundations/invariants.md:236-246` content-identifiers · `foundations/part_map.md:34-65` simulation
- **Model:** cheaper
- **Risk:** none
- **Checks:** first the failing case of a recipe that uses no piece; then the foundation check no longer reports the citation of `tests/sim/data.test.mjs` (the two others of D-290 stay until Slices 13 and 15) · `npm test -- tests/invariants/test_content_identifiers.py` · `npm test -- tests/sim/data.test.mjs` ·
  `npm test -- tests/sim/trip.test.mjs`
- **Depends on:** Slice 7 · Foundation entries rows 3, 4

## Passages the slice's *Read* names (copied word for word; the file and the lines stand in the heading)

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:30-34` To do, items 1–5

```text
1. Dane gry mają przedmiot „opatrunek”, który się wytwarza i nie leży na żadnej mapie; jak dane odróżniają taki przedmiot od tego, co leży na mapach, wybiera cykl (zob. *Questions carried to cycle*).
2. Dane gry mają przepis na opatrunek: 2 × mech daje 1 opatrunek w 10 minut gry. Liczby są wstępne: mierzy je zadanie 6 na mapie z watahą i może je poprawić (pytanie 3). Liczby stoją tylko w danych gry: D-387 ich nie dostaje, a testy biorą je z danych, nie wpisują ich na sztywno (D-82), więc zadanie 6 poprawia je samą zmianą danych.
3. Postać wykonuje czynność „Wytwórz” z celem: celem może być każdy przedmiot, który ma w danych przepis, i tylko taki, a zbiór celów wynika z danych, nie z listy w kodzie. „Wytwórz — Opatrunek” po czasie przepisu zabiera z plecaka składniki przepisu i wkłada do niego opatrunek, razem (D-71); przerwana napaścią nie zabiera nic (D-142) (pytanie 8). Bez składników program pomija regułę, jak każdą czynność, której nie da się wykonać (D-23).
4. Postać wykonuje czynność „Opatrz” z celem: celem może być każdy przedmiot, któremu dane dają własność leczenia, i tylko taki. „Opatrz — Opatrunek” trwa 10 minut gry i na jej końcu, razem, zużywa jedną sztukę opatrunku z plecaka i przywraca 25 zdrowia, nie ponad pełne zdrowie (D-387), bez względu na to, co zdrowie zabrało — zimno, głód czy cios w walce (pytanie 2; D-60 zostaje bez zmian); przerwana napaścią nie zabiera nic (pytanie 8). Liczby są wstępne, jak w punkcie 2 (pytanie 3).
5. Przy pełnym zdrowiu — równym 100, pułapowi zdrowia z D-387 — „Opatrz” nie da się wykonać: program pomija regułę z powodem „zdrowie pełne”, tak jak pomija „Zapal — ognisko”, gdy ognisko już płonie; przy 99,95 da się. Koniec czynności sprawdza to samo co jej początek: gdy zdrowie wróciło samo do pełna w trakcie tych 10 minut, opatrunek zostaje w plecaku, a czynność kończy się bez skutku, jak zapalanie, które na końcu zastaje ognisko już płonące (pytanie 10). W walce „Opatrz” się nie wykonuje, bo w walce działają tylko czynności walki (D-140); opatrzenie w trakcie starcia to gałąź Ucisk z zadania 6 (pytanie 2).
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:42-44` To do, items 8–10

```text
8. Opatrunek, „Wytwórz” i „Opatrz” wchodzą do Zrozumienia przez zdarzenia zapisane w danych przy każdej z tych rzeczy (D-128): pierwsza zebrana sztuka mchu odsłania opatrunek i „Wytwórz”, a pierwsza wytworzona sztuka opatrunku odsłania „Opatrz”. „Pierwsza wytworzona sztuka przedmiotu” to nowy rodzaj zdarzenia odsłaniającego, który symulacja zaczyna obsługiwać; potem następny przedmiot z przepisu dostaje takie odsłonięcie samą zmianą danych. Warunek „Zdrowie poniżej” zostaje przy pierwszej napaści wilka (D-143) (pytanie 4).
9. Opatrunek jest przedmiotem wszędzie tam, gdzie gra liczy i pokazuje przedmioty: zajmuje miejsce w plecaku i w skrzynce (D-64, D-50), stoi na listach „Zabierz” i „Wynieś” planu wyprawy (D-179, D-181), w warunku „Zapas poniżej”, w wierszu plecaka i na ekranie Wiedza (D-416). Nie staje wśród celów „Idź”, „Zbierz” i „Obchód” ani w warunku „Tu leży mniej niż” — ani w przejściu mapy, ani poza nim — bo nie leży na żadnej mapie (pytanie 1).
10. Do zadania 6 czynności „Wytwórz — Opatrunek” i „Opatrz — Opatrunek” nie rozwijają żadnej umiejętności postaci: są otwarte dla każdej postaci i nie dają wprawy (D-120, D-193); drzewo leczenia opatrunkiem z gałęzią Ucisk wnosi zadanie 6 (plan, wiersz 6: „Leczenie opatrunkiem ma w grze własne drzewo umiejętności z gałęzią Ucisk”).
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:166-191` Decision 2 — Where the recipe and the healing
  property stand

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

## Foundation entries to read, each whole, by their address in the worktree as it stands now

The foundation step moved `foundations/decisions.md` and `foundations/invariants.md`; the ranges below are the current ones and hold where they differ from the plan's. An entry runs from its heading to the next heading. The decisions and invariants the plan names:

- `foundations/decisions.md:7464-7521` D-121
- `foundations/decisions.md:7683-7723` D-128
- `foundations/decisions.md:9665-9691` D-290
- `foundations/decisions.md:7440-7463` D-120
- `foundations/decisions.md:1044-1058` D-82
- `foundations/invariants.md:236-247` content-identifiers
- the entries the plan's *Foundation entries* rows name that your section names as changed ("as row N changes it") are written already by the foundation step (commit `ed70970a`); read them as they stand. The new decision „How does an action name what it acts on?” is **D-443**.

- `foundations/part_map.md:34-65` simulation

## Guideline files and instruction files to read, each whole

- `guidelines/coding.md`
- `guidelines/testing.md`
- `guidelines/coding-content-data.md`
- `guidelines/coding.md` is the general coding guideline (it holds the kinds index); `guidelines/testing.md` is read whole before you write or change a test.

## Files you change (the slice's *Change*; read each whole before you change it; a file that does not exist yet you create)

- `tests/sim/data.test.mjs`
- `tests/sim/trip.test.mjs`
- `tests/invariants/test_content_identifiers.py`

## Other files of code and tests to read (whole, or in the range named)

- `src/browser/sim/data/items.ts`
- `src/browser/sim/data/actions.ts`
- `src/browser/sim/data/revelations.ts`


## What you return

Status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. Commit everything of the slice before you return; leave the worktree clean.
