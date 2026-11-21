# Handoff — executor of slice 5 (`make-change`, a slice)

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; nothing it answers is that person's approval. You ask no human; a question goes back to the orchestrator in your return as `questions`.

## Where you work

- Worktree (your working directory): `the root of the task's worktree` — branch `task/model-czynnosci-i-przedmiotow`. **Your base** (the head of the branch when you start): `9976d7366ec6f72ea22500771d395ddaf53f5245`; commit only on this branch; never reset it, never rebase, never touch another worktree. The pinned the-way is the worktree's `.the-way` (`19e5774aed6d1d628042e23deccc110ed9f112c0`).
- Your method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole; your variant is **"a slice, or the retry of a slice"**: read `.the-way/task-cycle/change/slice.md` whole as that row gives. Read `.the-way/task-cycle/change/ui_check.md` only if the slice changes a user interface (the slices that touch `src/browser/view/` do not need a screenshot unless their section says so) — a state check by code and tests is what the plan asks. Do not call a skill; read the files.
- Your stage and its boundary: make **only this slice** (its section below), run its focused checks, commit, and return. Nothing of another slice; no foundation entry beyond what this section names; no change of the plan or the spec (a disagreement of the plan and the code is `slice.md`'s case).
- Your directory for working copies: `.runs/executor-5/` (directly under the ignored `.runs/` of the worktree).
- Report path (full report; the file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it): `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/executor-5-report.md`; its first line is yours (status). It holds what `make-change` section 6 gives: the checks with their command and exit code, the own-work check, the reaches beyond this handoff, **Unread material**, **Searches not found or unclear** (each `none` where nothing), and the line on the working copies.
- `cycle.md` and the other files of `.runs/task-cycles/model-czynnosci-i-przedmiotow/` — other agents' handoffs, reports and findings — are not yours to read, except those this handoff names.
- Answers of step 4: trust boundary **yes** (`src/browser/sim/saved-game.ts`, `src/browser/sim/previous-programs.ts`, `assets/icons/**`, `src/browser/view/judging-cache.ts`); irreversible operation **no**. This slice's risk: none.
- **The gate.** Never run `npm test` with no argument and never run the whole of the tests or `node --test` over a folder of tests: that is the full gate, and its run waits for a signal the orchestrator holds. The focused checks named in the section's *Checks* are `npm test -- <one file>` (it runs exactly one Node or Python test file); run only those and the typecheck, ESLint and Prettier on the files you change. Never skip a hook or a check. Commit by path (`git add <path> …`), never `git add -A`, `git add .` or `git commit -a`; the message in English, the first line in the style of the repository's commits (type, emoji, what and why).
- Where the slice leaves a test failing that a later slice owns (the section says which), do not change that test and do not make it pass by code of this slice that the section does not give; name it in your report.
- The size rule of D-425 (200 lines of code for a function, 800 for a file, comments and blank lines not counted) binds every file you change: run `node tests/quality/eslint-size-rules.mjs` on the tree before you return, and name the result.

Working copies (the first paragraph of "Working copies" of the cycle's skill, word for word):

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Your slice (the plan's section, copied word for word)

### Slice 5 — Every item of the data has its own words, in the simulation

- **Goal:** spec Decision 1, its simulation side, with no item added yet. The row of an item in
  `src/browser/sim/data/items.ts` holds its name, the plural forms of its name, its icon and the icon's title; the
  four items that are resources (stick, berry, moss, fibre) take these from their resource rows by reference, as
  the name is taken today, so no word stands twice. `ItemId` is a key of `ITEMS`, `ResourceId` a key of
  `RESOURCES`, which keeps its rows, and the type checker holds that every resource identifier is an item
  identifier (how is the maker's); the comment that says the items are the resources of Las goes. In
  `src/browser/sim/program.ts` a reason that names an item — „brakuje {ile} × {rzecz}”, „brak opału: {rzecz}” —
  reads the item's row, and a reason that names a resource on a map — „tu nie leży {rzecz}”, „nie znasz miejsca,
  gdzie leży {rzecz}”, „{rzecz} leży już tutaj” — keeps reading the resource's row. Nothing the player reads
  changes. `tests/invariants/test_content_identifiers.py` reaches the identifiers and names the data give items,
  as Foundation entries row 13 words the invariant, with its control case showing a view file that names an item
  flagged. The report sorts each changed file as one-time for the model (*To do* 14).
- **Change:** `src/browser/sim/data/items.ts` · `src/browser/sim/program.ts` ·
  `tests/invariants/test_content_identifiers.py`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-content-data.md` ·
  `guidelines/coding-simulation-module.md` · `src/browser/AGENTS.md` · `foundations/decisions.md:841-858` D-425 · `foundations/invariants.md:1428-1436` function-and-file-size · `src/browser/sim/data/resources.ts` · `src/browser/sim/data/revelations.ts` ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:145-151` Questions carried to cycle ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:93-111` Constraints ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:115-164` Decision 1 — An item no map holds, and what a
  resource is · `foundations/decisions.md:306-330` D-18 · `foundations/decisions.md:540-553` D-34 ·
  `foundations/decisions.md:9833-9867` D-310 · `foundations/invariants.md:236-246` content-identifiers, as row 13
  changes it · `foundations/part_map.md:34-65` simulation
- **Model:** same — a change of the type relation between items and resources that every later slice builds on
- **Risk:** none
- **Checks:** first the failing control case of the invariant's check for an item; then `npm run typecheck` ·
  `npm test -- tests/invariants/test_content_identifiers.py` · `npm test -- tests/sim/rule-signs.test.mjs` ·
  `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/sim/campfire.test.mjs`
- **Depends on:** Foundation entries row 13

## Passages the slice's *Read* names (copied word for word; the file and the lines stand in the heading)

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:145-151` Questions carried to cycle

```text
## Questions carried to cycle

- „Czy przedmiot w plecaku przestaje być tym samym co zasób mapy?” (pytanie otwarte definicji, plan: zadanie 5) — w części o sposobie zapisu danych gry. To, co widzi gracz, rozstrzyga pytanie 1 w *Questions to settle*; jak dane gry odróżniają przedmiot, który powstaje z przepisu, od tego, co leży na mapach, wybiera cykl przy próbie, jak mówi notatka zakresu (the project's scope note, „Kierunek”, punkt 7: „Przy próbie rozstrzyga się, czy przedmiot w plecaku przestaje być tym samym co zasób mapy.”).
- Co cykl zastaje: dane gry mają dziś osobną tabelę przedmiotów i osobną tabelę zasobów map o tych samych identyfikatorach (`src/browser/sim/data/items.ts`, `ITEMS` i linia „export type ItemId = ResourceId;”; `src/browser/sim/data/resources.ts`, `RESOURCES`), a edytor programu buduje cele „Idź”, „Zbierz”, „Obchód” i „Tu leży mniej niż” z tabeli zasobów, a cele „Zapas poniżej” z tabeli przedmiotów (`src/browser/view/program-editor.ts`, funkcje `resourcePick` i `conditionTargetPick`).
- Dwie drogi, które doprecyzowanie znalazło, bez wyboru między nimi: przedmioty dostają własne identyfikatory, a zasób mapy mówi, jaki przedmiot daje jego zebranie — jednorazowa zmiana wszędzie tam, gdzie kod traktuje dziś obie rzeczy jako jedną; albo opatrunek zostaje wpisany między zasoby jako taki, którego żadna mapa nie ma — mniej zmian dziś, ale każda lista tego, co leży na kafelkach, musi go odsiewać, także przy sznurze i tłuku.
- Co wiąże wybór cyklu: odpowiedź na pytanie 1, kryterium akceptacji (następny przedmiot z przepisu albo z własnością leczenia jest samą zmianą danych) i punkt 14 *To do*, według którego prośba o scalenie mówi, którą drogę cykl wybrał i ile kosztowała.
- Gdzie w danych stoi przepis i własność leczenia — przy wierszu przedmiotu, jak dziś `fuel`, `food` i `lightable` w `src/browser/sim/data/items.ts`, czy w osobnej tabeli przepisów, jak w starej grze (`recipes.ts`) — wybiera cykl; osobna tabela dochodzi do `OVERLAY_TABLES` w `balance/overlay.mjs` i do tabeli „Files of this kind” w `guidelines/coding-content-data.md`. Przepis daje jedną sztukę przedmiotu, jak w starej grze, więc wytworzenie nigdy nie zwiększa liczby sztuk w plecaku: „Wytwórz” nie dostaje powodu „plecak pełny”, a D-380 nie zmienia się o to.
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:93-111` Constraints

```text
From the code as it stands (read at `aff09e98`):

- `ItemId` is `ResourceId` (`src/browser/sim/data/items.ts`, „export type ItemId = ResourceId;”);
  the item rows take their names from the resource rows; the gathering puts a piece of „the item of
  the same identifier” into the backpack (`src/browser/sim/run.ts`, `finishGathering`). Neither
  commit `7a273aef` nor pull request #25 that merged it gives a reason for making the two identifiers
  one type; this spec keeps that equality for every resource and gives no reason of its own for it.
- `src/browser/sim/data/resources.ts` is the exemplar of the kind `content-data` (D-34,
  `guidelines/coding-content-data.md`).
- Many readers enumerate the items' table at the moment they are called (`newBackpack`, `itemFor`,
  the program check, the revelations, the editor's picks, the instrument's `fullUnderstanding`), so a
  row an overlay or a test lays on the built `ITEMS` reaches them; a few capture it at module load
  (`ITEM_IDS` in `saved-game.ts`, `ITEM_ORDER` in `judging-cache.ts`).
- The function and file size limit of D-425 (200 and 800 lines of code) binds every file this change
  grows; `program.ts`, `programs.ts`, `run.ts`, `program-editor.ts` and `rule-panel.tsx` are large.
- Lists of action kinds written out by hand in the view: `goalOf` and `USES_BACKPACK` in
  `src/browser/view/scene-picture.ts`.
- The invariant test `tests/invariants/test_program_closed_lists.py` writes out `ACTION_KINDS` and a
  `VALID` program and lists made-up kinds that include `"craft"`.
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

## Foundation entries to read, each whole, by their address in the worktree as it stands now

The foundation step moved `foundations/decisions.md` and `foundations/invariants.md`; the ranges below are the current ones and hold where they differ from the plan's. An entry runs from its heading to the next heading. The decisions and invariants the plan names:

- `foundations/decisions.md:841-859` D-425
- `foundations/decisions.md:306-331` D-18
- `foundations/decisions.md:540-554` D-34
- `foundations/decisions.md:9926-9961` D-310
- `foundations/invariants.md:1428-1437` function-and-file-size
- `foundations/invariants.md:236-247` content-identifiers
- the entries the plan's *Foundation entries* rows name that your section names as changed ("as row N changes it") are written already by the foundation step (commit `ed70970a`); read them as they stand. The new decision „How does an action name what it acts on?” is **D-443**.

- `foundations/part_map.md:34-65` simulation

## Guideline files and instruction files to read, each whole

- `guidelines/coding.md`
- `guidelines/testing.md`
- `guidelines/coding-content-data.md`
- `guidelines/coding-simulation-module.md`
- `src/browser/AGENTS.md`
- `guidelines/coding.md` is the general coding guideline (it holds the kinds index); `guidelines/testing.md` is read whole before you write or change a test.

## Files you change (the slice's *Change*; read each whole before you change it; a file that does not exist yet you create)

- `src/browser/sim/data/items.ts`
- `src/browser/sim/program.ts`
- `tests/invariants/test_content_identifiers.py`

## Other files of code and tests to read (whole, or in the range named)

- `src/browser/sim/data/resources.ts`
- `src/browser/sim/data/revelations.ts`


## What you return

Status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. Commit everything of the slice before you return; leave the worktree clean.
