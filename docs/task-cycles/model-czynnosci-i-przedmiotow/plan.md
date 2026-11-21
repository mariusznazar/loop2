# Plan — Model czynności i przedmiotów — czasownik z celem z własności przedmiotu, sprawdzony na opatrunku

- Task: `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md`
- Spec: `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md`
- Base: aff09e987e3b64801f9011b2f8ad69c4723b4521

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| 1 — the new decision „How does an action name what it acts on?”, its two sentences word for word, its *Relations* and *Verification* filled | decision (new) | projected entry of the approved definition (task, *Decisions in play*, „Zadanie zapisuje”; *To do* 13); spec, *Foundation entries* | Slices 7, 10, 13, 17; its *Verification* names the tests of Slices 10 (the targets, the check, the second sentence through the previous-save reader), 13 (the editor) and 17 (the instrument) |
| 2 — D-145 changed | decision | *Settlements to record* rows 2, 3 and 14; spec | Slices 7, 12 |
| 3 — D-290 changed | decision | row 6 | Slices 7, 9, 13, 15 |
| 4 — D-121 changed | decision | row 5 | Slices 7, 9, 12 |
| 5 — D-318 changed | decision | row 11 | Slices 7, 16 |
| 6 — D-363 changed | decision | row 8 | Slices 12, 13, 14, 15 |
| 7 — D-293 changed | decision | rows 9 and 13 | Slices 13, 14, 15 |
| 8 — D-380 changed | decision | rows 10 and 15 | Slices 7, 12 |
| 9 — D-142, a sentence added | decision | row 12 | Slice 12 |
| 10 — D-289, sentences added | decision | row 1; spec, *Decisions*, Decision 3, unit 7 | Slices 10, 13 |
| 11 — D-441 changed | decision | spec, Decision 5 | Slice 1 |
| 12 — D-442 changed | decision | spec, Decision 5 | Slice 1 |
| 13 — invariant `content-identifiers` changed; check `tests/invariants/test_content_identifiers.py` | invariant | spec | Slice 5, which brings the check to items |
| 14 — invariant `icon-credits`, its *Rests on* gaining the facts of rows 15 and 16; check `tests/invariants/test_icon_credits.py` | invariant | spec | Slice 8 |
| 15 — environment fact: the title of `bandage-roll` as its page on game-icons.net gives it, read from that page | environment fact | spec; row 7 | Slice 8 |
| 16 — environment fact: the title of `first-aid-kit` as its page on game-icons.net gives it, read from that page | environment fact | spec; row 7 | Slice 8 |

Rows 4 and 7 of *Settlements to record* go to data, not to the foundation: row 4 to the bandage's row and the
rows of the two verbs in `src/browser/sim/data/` (Slice 7), row 7 to the same rows and to the icon files in
`assets/icons/` (Slices 7 and 8). Two guideline files change beside the foundation: the table "Files of this
kind" of `guidelines/coding-simulation-module.md` gains the module of the targets of a verb (Slice 7), and the
row of `src/browser/view/judging-cache.ts` in the table "Trust boundaries" of `guidelines/testing.md` follows
the cases of the cache's stored form 2 (Slice 1).

## Slices

### Slice 1 — The remembered judging holds the fingerprint of the content it judged

- **Goal:** *To do* 15, as spec Decision 5 settles it. `src/browser/sim/judging-record.ts` gains a pure
  function that gives the fingerprint of a program's content as a short text: the same for two contents that
  `contentDiffers` in `src/browser/sim/programs.ts` calls equal — the rule groups in their order with their
  rules and identities, and the trip plan, the order of an object's keys and the identity counters counting for
  nothing — and different for every change D-442 lists, with a chance of a collision of at most one in 2^52, no
  clock and no random number. `JudgingRecord` holds that fingerprint of the triple's program content in the state
  the judging read (`recordOfJudging`), and `markOfRecord` gives a mark only where the fingerprint of the
  program's content at hand equals it, besides the conditions of today. `src/browser/view/judging-cache.ts` keeps
  the fingerprint as one more field of the stored value under the stored form version 2, the key naming 2; a key
  of version 1 is neither read, written nor removed; a value whose fingerprint is missing, no text, too long or
  of another form than the function gives reads as none and throws nothing; the tidying at opening stays as it
  is. The comment of `isAboveLoaded` says what the function does, as spec Decision 5 unit 4 words it, and no
  behaviour of the function changes. The row of `src/browser/view/judging-cache.ts` in the table "Trust
  boundaries" of `guidelines/testing.md` names the cases of the stored value as the test file then holds them
  (the fields are five), and nothing else of that file changes. A test of the fingerprint takes its expectation
  from a relation the code does not compute — whether a save raises the content revision (D-442) — never from
  the function's own output. After this slice two test files fail until the slices that bring them to the
  record: `tests/view/maps-screen.test.mjs` (Slice 2) and `tests/sim/judging.test.mjs` (Slice 3); this slice
  leaves both as they are.
- **Change:** `src/browser/sim/judging-record.ts` · `src/browser/view/judging-cache.ts` ·
  `tests/sim/judging-record.test.mjs` · `tests/view/judging-cache.test.mjs` · `guidelines/testing.md`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `src/browser/sim/programs.ts:309-320` sameData · `src/browser/sim/programs.ts:374-386` contentDiffers ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:49-49` To do, item 15 ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:296-357` Decision 5 — A remembered judging stands
  only beside the content it judged ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:376-379` Trust boundary — crafted input ·
  `foundations/decisions.md:11934-11975` D-441, as Foundation entries row 11 changes it ·
  `foundations/decisions.md:8378-8406` D-442, as row 12 changes it · `foundations/decisions.md:11903-11932` D-440 ·
  `foundations/invariants.md:1468-1476` judging-cache-reading · `foundations/invariants.md:214-224`
  simulation-isolation · `foundations/glossary.md:308-312` judging · `foundations/glossary.md:320-324` content
  revision · `foundations/part_map.md:3-32` browser-view · `foundations/part_map.md:34-65` simulation
- **Model:** same — a fingerprint that must tell every change D-442 lists and nothing else, in a trust-boundary file; a failure costs a reset
- **Risk:** trust boundary — `src/browser/view/judging-cache.ts`
- **Checks:** first the failing cases: the fingerprint equal and different as D-442 lists, a record whose
  fingerprint differs giving no mark, and a stored value of version 2 with a fingerprint missing or of another
  form reading as none (marked `judging-cache-reading`); then `npm test -- tests/sim/judging-record.test.mjs` ·
  `npm test -- tests/view/judging-cache.test.mjs` · `npm test -- tests/view/judging-cache-page.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_isolation.py`
- **Depends on:** Foundation entries rows 11, 12

### Slice 2 — The records of the test of the screen Mapy hold the fingerprint

- **Goal:** the helper `recordIn` of `tests/view/maps-screen.test.mjs`, which builds a remembered judging by
  hand, gives it the fingerprint of the program's content as Slice 1's `recordOfJudging` takes it, so every case
  of the badge, the count and the note on the stock stands as before; no expectation of the file changes. A case
  that still fails for any other reason is named in the report, not changed.
- **Change:** `tests/view/maps-screen.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `src/browser/sim/judging-record.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/maps-screen.test.mjs`
- **Depends on:** Slice 1

### Slice 3 — The test of the judging takes the record with its fingerprint

- **Goal:** the cases of `tests/sim/judging.test.mjs` that compare the record of a judging whole expect the
  fingerprint of the judged program's content beside its other fields, as Slice 1's `recordOfJudging` gives it,
  the expectation built from the program the case judged; nothing else of the file changes.
- **Change:** `tests/sim/judging.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `src/browser/sim/judging-record.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/judging.test.mjs`
- **Depends on:** Slice 1

### Slice 4 — The row of one field of the rule panel moves out of `RulePanelView`

- **Goal:** `RulePanelView` in `src/browser/view/rule-panel.tsx` stands at 200 lines of code, the limit on a
  function of D-425, and Slice 14 adds to what it draws. The function that draws one field of the panel,
  `renderField`, nested in `RulePanelView`, moves out of it into a component or function of its own in the same
  file, taking what it reads as arguments; `RulePanelView` falls well under the limit, and nothing the panel
  draws, focuses or commits changes. No test changes. The report names the size of `RulePanelView` after the
  move and sorts the changed file as one-time for the model of actions and items (*To do* 14).
- **Change:** `src/browser/view/rule-panel.tsx`
- **Read:** `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/AGENTS.md` · `foundations/decisions.md:841-858` D-425 · `foundations/invariants.md:1428-1436`
  function-and-file-size
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/rule-editor.test.mjs` · `npm test -- tests/view/program-panel.test.mjs` ·
  `npm test -- tests/quality/test_function_and_file_size.py`
- **Depends on:** none

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

### Slice 6 — The view reads an item's words from the item's row

- **Goal:** spec Decision 1, its view side. Every reader of the view that names or draws an item reads the item's
  row of `ITEMS` as Slice 5 left it: the price of an action in `src/browser/view/program-editor.ts`
  (`actionPriceText`, name and plural forms), the icon of an item on the screen Wiedza
  (`src/browser/view/knowledge-lines.ts`), the icon of a discovered item on a plaque of the scene
  (`src/browser/view/scene-picture.ts`; the icon of a gathered resource flying to the mage keeps the resource's
  row), the icon of an entry of the trip plan (`src/browser/view/trip-plan.tsx`) and the list of what the credits
  name (`src/browser/view/credit-lines.ts`: the items from `ITEMS` in place of `RESOURCES`, so an item no map
  holds gets its credit). Every reader of what lies on tiles — the tiles, the map's card, the scene's props,
  „Tu leży mniej niż”, „Idź”, „Zbierz”, „Obchód” — keeps the resource's row. Nothing the player sees changes, and
  the tests of today hold it. `TripPlanView` stands at 199 lines of code of the 200 D-425 allows: the change in it
  replaces an expression and adds no line. The report sorts each changed file as one-time for the model
  (*To do* 14).
- **Change:** `src/browser/view/program-editor.ts` · `src/browser/view/knowledge-lines.ts` ·
  `src/browser/view/scene-picture.ts` · `src/browser/view/trip-plan.tsx` · `src/browser/view/credit-lines.ts`
- **Read:** `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/AGENTS.md` · `src/browser/sim/data/items.ts` · `src/browser/sim/data/resources.ts` ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:128-137` Decision 1 — An item no map holds, and what a
  resource is · `foundations/decisions.md:4817-4849` D-416 · `foundations/decisions.md:4870-4921` D-27 ·
  `foundations/decisions.md:9894-9905` D-363 · `foundations/decisions.md:841-858` D-425 ·
  `foundations/invariants.md:236-246` content-identifiers · `foundations/part_map.md:3-32` browser-view
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm run typecheck` · `npm test -- tests/view/knowledge-lines.test.mjs` ·
  `npm test -- tests/view/scene-picture.test.mjs` · `npm test -- tests/view/trip-plan.test.mjs` ·
  `npm test -- tests/view/icons.test.mjs` · `npm test -- tests/view/program-editor.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py` ·
  `npm test -- tests/quality/test_function_and_file_size.py`
- **Depends on:** Slice 5

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

### Slice 8 — The icons of „Opatrz” and of the bandage, with their credits

- **Goal:** `assets/icons/bandage-roll.svg` and `assets/icons/first-aid-kit.svg` come from game-icons.net as the
  other icons came — from the source repository at the commit `ICON_SOURCE_COMMIT` of
  `src/browser/view/credits.ts` names where they stand there, otherwise from their pages — changed as the others
  were (no background, a light shape), each title and page confirmed at download against Foundation entries rows
  15 and 16, and each file passing the checks of `icon-file-content`. `ICON_CREDITS` holds a credit of each: the
  author as the source names the contributor, the page, and the change made. `tests/invariants/test_icon_credits.py`
  writes out the two titles (and authors, where it writes authors out), and `tests/view/icons.test.mjs` takes the
  order of the section as the data now give it: the items, the bandage among them, then the two campfires, the
  actions' icons one line each, „Opatrz” bringing `bandage-roll`, then the wolf and the packs. The files are
  untrusted input. After this slice the tests of the credits and of the screens that draw them pass again. The
  report sorts each changed file as one-time for the model or for the bandage alone (*To do* 14; icons stand
  beside the count).
- **Change:** `assets/icons/bandage-roll.svg` · `assets/icons/first-aid-kit.svg` · `src/browser/view/credits.ts` ·
  `tests/invariants/test_icon_credits.py` · `tests/view/icons.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-scene-art/SKILL.md` ·
  `src/browser/view/credit-lines.ts` · `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:36-41` To do,
  item 7 · `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:258-262` Decision 3 — The verb with a target,
  unit 8 · `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:373-375` Trust boundary — crafted input ·
  `foundations/decisions.md:4870-4921` D-27 · `foundations/invariants.md:319-352` icon-file-content, icon-credits
  as row 14 changes it, loop2-container-icons · Foundation entries rows 15, 16 · `foundations/part_map.md:3-32`
  browser-view
- **Model:** same — two untrusted files from outside and their credits, which a failure of the icon checks would force to be redone
- **Risk:** trust boundary — `assets/icons/**`
- **Checks:** `npm test -- tests/view/icons.test.mjs` · `npm test -- tests/invariants/test_icon_credits.py` ·
  `npm test -- tests/invariants/test_icon_file_content.py` · `npm test -- tests/view/account-screen.test.mjs` ·
  `npm test -- tests/view/headquarters-screen.test.mjs`
- **Depends on:** Slice 7 · Foundation entries rows 14, 15, 16

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

### Slice 10 — The program check, the repertoire and the targets of the two verbs

- **Goal:** spec Decision 3 units 2 and 3, and the first proof of the acceptance criterion.
  `checkAction` in `src/browser/sim/programs.ts` accepts `craft` and `tend` only with an `item` among the verb's
  targets that `src/browser/sim/action-targets.ts` (written by Slice 7) gives, builds the action from `kind` and
  `item` alone, and refuses any other `item` — moss, an identifier the data lack, none — with a
  `ProgramCheckError` naming the value; through that check the editor's program, the load of a saved game state
  and the reader of a previous save refuse it. In `src/browser/sim/understanding.ts` an action with an item target
  lies in the repertoire where its kind and its item lie there, and the reason of a rule outside it names the item
  by its row; no character skill grows either verb, so both are open to every character and add no practice.
  A new test file `tests/sim/action-targets.test.mjs`, listed in the `tap.testFiles` of `stryker.config.json`:
  the targets follow the data — the bandage a target of both verbs, moss of neither; a second item with a recipe
  and a healing property laid on the built `ITEMS` in the test and removed after it becomes a target of both with
  no change of code, and never stands in the game's data (the acceptance criterion, its simulation part, with a
  `decision:` line quoting the first sentence of Foundation entries row 1); the check refusing either verb with a
  target the data do not give it (*To do* 6, the same `decision:` line); a rule whose target lies outside the
  repertoire passed over (D-126); the bandage never accepted as the resource of „Idź”, „Zbierz”, „Obchód” or „Tu
  leży mniej niż”, in a map run or outside one (row 1 of *Settlements to record*, D-289 as row 10 changes it).
  `tests/sim/previous-programs.test.mjs`: an item whose program holds „Wytwórz” or „Opatrz” with a target the data
  do not give, or with none, is skipped and named while the reading goes on; a field of such an action beyond
  `kind` and `item` is dropped and the program appended without it; a program holding every kind of action of
  today, as a document of version 9 holds it, is read, checked and appended with exactly that content (a
  `decision:` line quoting the second sentence of row 1). `tests/invariants/test_program_closed_lists.py`:
  `ACTION_KINDS` gains `craft` and `tend`, `VALID` holds both with the bandage, and `"craft"` leaves the made-up
  kinds. `tests/invariants/test_program_world_reference.py`: programs holding the two verbs name the item by its
  kind alone. The report sorts each changed file as one-time for the model or for the bandage alone (*To do* 14).
- **Change:** `src/browser/sim/programs.ts` · `src/browser/sim/understanding.ts` ·
  `tests/sim/action-targets.test.mjs` · `stryker.config.json` · `tests/sim/previous-programs.test.mjs` ·
  `tests/invariants/test_program_closed_lists.py` · `tests/invariants/test_program_world_reference.py`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-simulation-module.md` · `src/browser/AGENTS.md` ·
  `foundations/decisions.md:841-858` D-425 · `foundations/invariants.md:1428-1436` function-and-file-size · `src/browser/sim/previous-programs.ts` · `src/browser/sim/data/items.ts` · `src/browser/sim/data/actions.ts` ·
  `src/browser/sim/types.ts:41-61` Action · `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:32-35`
  To do, items 3–6 · `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:43-45` To do, items 9–11 ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:51-53` Acceptance criteria ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:204-221` Decision 3 — The verb with a target, units 1–3 ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:281-294` Decision 4 — A program of today's actions stays
  the same · `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:359-372` Trust boundary — crafted input ·
  Foundation entries row 1 · `foundations/decisions.md:7815-7857` D-23 · `foundations/decisions.md:7885-7914` D-26 ·
  `foundations/decisions.md:8034-8052` D-126 · `foundations/decisions.md:7426-7448` D-120 ·
  `foundations/decisions.md:7099-7118` D-193 · `foundations/decisions.md:4307-4322` D-401 ·
  `foundations/decisions.md:9535-9574` D-289, as row 10 changes it · `foundations/invariants.md:364-373`
  program-closed-lists · `foundations/invariants.md:386-395` program-world-reference ·
  `foundations/invariants.md:248-262` program-rule-pick · `foundations/invariants.md:1378-1386`
  previous-save-programs-reader · `foundations/glossary.md:123-134` Understanding, repertoire ·
  `foundations/part_map.md:34-65` simulation · `foundations/part_map.md:91-126` build-tools
- **Model:** same — the check every boundary of the simulation passes through, and the first proof of the acceptance criterion
- **Risk:** trust boundary — `src/browser/sim/previous-programs.ts` and `src/browser/sim/saved-game.ts`, whose
  refusals pass through the check this slice changes; the previous-save reader's refusal tests change here
- **Checks:** first the failing cases of the targets, of the check's refusal and of the previous-save reader; then
  `npm test -- tests/sim/action-targets.test.mjs` · `npm test -- tests/sim/previous-programs.test.mjs` ·
  `npm test -- tests/invariants/test_program_closed_lists.py` ·
  `npm test -- tests/invariants/test_program_world_reference.py` · `npm test -- tests/sim/repertoire.test.mjs` ·
  `npm test -- tests/sim/program.test.mjs` · `npm test -- tests/quality/test_mutation_test_selection.py`
- **Depends on:** Slice 7 · Foundation entries rows 1, 10

### Slice 11 — The saved game state's shape at version 10

- **Goal:** `SAVED_GAME_VERSION` in `src/browser/sim/saved-game.ts` rises to 10, since a new item changes
  `Backpack` and two new ordinary actions change the keys of `minutesByAction` (`guidelines/coding-saved-game.md`,
  „Wersja podnoszona razem z kształtem”). In `tests/sim/saved-game.test.mjs` the document of the current version is
  written anew at version 10, filling every optional branch with the new shape — backpacks and the chest holding
  the bandage, `minutesByAction` holding `craft` and `tend`, programs, a copy and an earning loop's program holding
  rules of both verbs with the bandage as their target, an activity of each — and loads into the state it
  describes; the document of version 9 stays in the test, refused as `version` as the earlier ones are. Crafted
  documents of version 10 are refused whole as `shape`: „Wytwórz” or „Opatrz” with a target the data do not give
  the verb (moss, a resource of no recipe, an identifier the data lack, no `item`, a field beyond `kind` and
  `item`) in a program, a copy, a base, an earning loop's program or an activity; a backpack whose keys are not
  exactly the data's items, the bandage missing included; a tile whose stock names the bandage; the cases of
  today kept. No value a document can hold throws, the new fields included. The report sorts each changed file as
  one-time for the model (*To do* 14).
- **Change:** `src/browser/sim/saved-game.ts` · `tests/sim/saved-game.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-saved-game.md` ·
  `guidelines/coding-simulation-module.md` · `src/browser/AGENTS.md` · `src/browser/sim/data/items.ts` · `src/browser/sim/data/actions.ts` ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:138-139` Context ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:85-87` Constraints ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:359-367` Trust boundary — crafted input ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:381-384` Irreversible operation ·
  `foundations/decisions.md:3905-3956` D-206 · `foundations/decisions.md:675-718` D-213 ·
  `foundations/invariants.md:1048-1056` save-version · `foundations/part_map.md:34-65` simulation
- **Model:** same — the saved game's shape and its crafted-input refusals, against a test file of 157 000 characters
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** first the failing case of the current version's document at version 10; then
  `npm test -- tests/sim/saved-game.test.mjs` · `npm test -- tests/sim/previous-programs.test.mjs`
- **Depends on:** Slice 10

### Slice 12 — „Wytwórz” and „Opatrz” carried out, and the first crafted piece revealed

- **Goal:** spec Decision 3 units 4–6. In `src/browser/sim/run.ts` „Wytwórz” lasts its target's recipe minutes and
  „Opatrz” the minutes of its own row, each through `actionMinutes` as every action. At its end, together:
  „Wytwórz”, where the backpack still holds the recipe's pieces, takes them out and puts one piece of the target
  in; „Opatrz”, where health stands below its cap and the backpack holds a piece of the target, takes the piece out
  and raises health by the target's healing, not above the cap, through a new function of the body in
  `src/browser/sim/body.ts`; where either does not hold, nothing changes and nothing is paid. Nothing leaves the
  backpack at the start, and an attack before the end takes nothing (D-142 as row 9 changes it). „Opatrz” heals
  whatever took health and is never carried out in combat, where its rule gives „trwa walka” (D-145 as row 2
  changes it, D-140, D-309). `actionPrice` in `src/browser/sim/program.ts` gives, for an action with a target, the
  recipe's pieces of the target for „Wytwórz” and one piece of the target for „Opatrz”, and none for a bare verb
  with no target; the target is an argument its callers of today may leave out, so they compile unchanged. In
  `src/browser/sim/understanding.ts` (`happened`) the minute in which a „Wytwórz” ends with its effect gives the
  revealing event of the first crafted piece of its target, so the first crafted bandage reveals „Opatrz”, and the
  first gathered moss reveals the bandage and „Wytwórz” through the data (D-121 as row 4 changes it, D-128).
  Neither verb adds practice. A new test file `tests/sim/craft-and-tend.test.mjs`, listed in the `tap.testFiles`
  of `stryker.config.json`, holds the durations, the effects, the interruption, the refusals written in Slice 7
  and their order („brakuje 2 × mech”; „zdrowie pełne” at 100 and before „brakuje 1 × opatrunek”; none at 99.95;
  the bandage kept where health came back to full by the end), the healing of health lost to cold, hunger and
  combat, the prices, the revelations and the absence of practice, each number read from the data (D-82), with
  `decision:` lines of D-145, D-142, D-380 and D-121 as rows 2, 9, 8 and 4 change them. The report sorts each
  changed file as one-time for the model or for the bandage alone (*To do* 14).
- **Change:** `src/browser/sim/run.ts` · `src/browser/sim/body.ts` · `src/browser/sim/program.ts` ·
  `src/browser/sim/understanding.ts` · `tests/sim/craft-and-tend.test.mjs` · `stryker.config.json`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-simulation-module.md` · `src/browser/AGENTS.md` ·
  `foundations/decisions.md:841-858` D-425 · `foundations/invariants.md:1428-1436` function-and-file-size · `src/browser/sim/skills.ts` · `src/browser/sim/data/items.ts` · `src/browser/sim/data/actions.ts` ·
  `src/browser/sim/data/revelations.ts` · `src/browser/sim/data/balance.ts` · `tests/sim/campfire.test.mjs:1-149`
  helpers · `tests/sim/campfire.test.mjs:296-334` the end of an action · `tests/sim/encounters.test.mjs:1-75` an
  attack interrupting an action · `tests/sim/discovery.test.mjs:1-127` helpers ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:32-34` To do, items 3–5 ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:42-44` To do, items 8–10 ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:58-72` Constraints ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:222-243` Decision 3 — The verb with a target, units 4–6 ·
  `foundations/decisions.md:5616-5627` D-71 · `foundations/decisions.md:6486-6518` D-63 ·
  `foundations/decisions.md:6760-6777` D-142, as row 9 changes it · `foundations/decisions.md:6823-6839` D-145, as
  row 2 changes it · `foundations/decisions.md:6463-6480` D-387 · `foundations/decisions.md:6191-6205` D-60 ·
  `foundations/decisions.md:6701-6739` D-140 · `foundations/decisions.md:7099-7118` D-193 ·
  `foundations/decisions.md:8106-8119` D-380, as row 8 changes it · `foundations/decisions.md:9796-9831` D-309 ·
  `foundations/decisions.md:7450-7488` D-121, as row 4 changes it · `foundations/decisions.md:7651-7690` D-128 ·
  `foundations/decisions.md:9894-9905` D-363, as row 6 changes it · `foundations/decisions.md:1044-1057` D-82 ·
  `foundations/invariants.md:248-262` program-rule-pick · `foundations/invariants.md:214-234` simulation-isolation,
  simulation-inputs · `foundations/part_map.md:34-65` simulation · `foundations/part_map.md:91-126` build-tools
- **Model:** same — the effect, the end and the revelation of both verbs in the passing of game minutes
- **Risk:** none
- **Checks:** first the failing cases of the end of each verb and of the revelation; then
  `npm test -- tests/sim/craft-and-tend.test.mjs` · `npm test -- tests/sim/campfire.test.mjs` ·
  `npm test -- tests/sim/encounters.test.mjs` · `npm test -- tests/sim/discovery.test.mjs` ·
  `npm test -- tests/sim/rule-signs.test.mjs` · `npm test -- tests/sim/body.test.mjs` ·
  `npm test -- tests/quality/test_mutation_test_selection.py` ·
  `npm test -- tests/quality/test_function_and_file_size.py`
- **Depends on:** Slice 10 · Foundation entries rows 2, 4, 6, 8, 9

### Slice 13 — The program editor offers the two verbs and their targets

- **Goal:** spec Decision 3 unit 7, the editor's logic, and the proof of the acceptance criterion in the editor.
  `src/browser/view/program-editor.ts` stands at 680 lines of code of the 800 D-425 allows: the pick of an item
  target and the words of its cells go to a new module, `src/browser/view/item-target-pick.ts`, and
  `program-editor.ts` grows by its branches alone. The action pick holds „Wytwórz” in „Wytwarzanie” and „Opatrz”
  in „Żywność i walka” right after „Zjedz — jagoda” (D-290 as row 3 changes it); a verb none of whose targets the
  Understanding holds stands greyed with „nie znasz jeszcze celu” (D-289 as row 10 changes it); the cell
  „Wytwórz” has no price and no time, the cell „Opatrz” its time and no price (D-363, D-293 as rows 6 and 7 change
  them). A pick of either verb moves on to the field of its target (`ruleFields`), whose pick holds the verb's
  targets the Understanding holds, the held target included where it does not, each named by the item's name,
  capitalised, with its price in brackets — „Opatrunek (2 mchy)” for „Wytwórz”, „Opatrunek (1 opatrunek)” for
  „Opatrz” — and, where the verb's time comes from its target, the time of each target, „10 min”, given by a
  function the panel calls per cell (rows 8, 9 and 13). A pick of a target changes the rule's target. The rule's
  sentence reads „Wytwórz — Opatrunek”, „Opatrz — Opatrunek” (`actionSentence`). `actionTime` and
  `actionPriceText` take the action's target as an argument their callers of today may leave out, so
  `src/browser/view/rule-panel.tsx` and `src/browser/view/rule-list.tsx` compile unchanged; the value the action
  field shows — the verb, its target and its price, „Wytwórz — Opatrunek (2 mchy)” — comes from a function this
  slice adds and Slice 14 draws. The bandage never stands in the pick of „Idź”, „Zbierz”, „Obchód” or „Tu leży
  mniej niż” (row 1). The foundation step wrote D-290 with „five named groups”; a `decision:` line of `tests/view/program-editor.test.mjs` quotes the sentence of D-290 (`tests/view/program-editor.test.mjs:1058`, around the line named) and the foundation check, `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`, reports it until the line quotes the sentence as the log now holds it: this slice changes that line to the sentence as D-290 reads now (the log is the source, never from memory). In `tests/view/program-editor.test.mjs` the cases that write out the kinds and groups take
  the two verbs and the fifth group; „every program the editor builds passes setProgram” builds rules of both
  verbs; and a second item with a recipe and a healing property laid on the built `ITEMS` in the test and removed
  after it stands as a target cell of both verbs, moss of neither (the acceptance criterion, its editor part, with
  a `decision:` line quoting the first sentence of Foundation entries row 1). The report sorts each changed file
  as one-time for the model or for the bandage alone (*To do* 14).
- **Change:** `src/browser/view/program-editor.ts` · `src/browser/view/item-target-pick.ts` ·
  `tests/view/program-editor.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `src/browser/sim/program.ts:53-99`
  actionPrice, as Slice 12 left it · `src/browser/sim/data/items.ts` · `src/browser/sim/data/actions.ts` ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:36-43` To do, items 7–9 ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:51-53` Acceptance criteria ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:128-137` Decision 1 — An item no map holds, and what a
  resource is · `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:244-257` Decision 3 — The verb with a
  target, unit 7 · Foundation entries row 1 · `foundations/decisions.md:9576-9597` D-290, as row 3 changes it ·
  `foundations/decisions.md:9286-9304` D-293, as row 7 changes it · `foundations/decisions.md:9894-9905` D-363, as
  row 6 changes it · `foundations/decisions.md:9535-9574` D-289, as row 10 changes it ·
  `foundations/decisions.md:9672-9715` D-306 · `foundations/decisions.md:9599-9631` D-291 ·
  `foundations/part_map.md:3-32` browser-view
- **Model:** same — a new module of the editor and the proof of the acceptance criterion in it
- **Risk:** none
- **Checks:** first the failing cases of the target pick and of the second item; then the foundation check no longer reports the citation of `tests/view/program-editor.test.mjs` · `npm run typecheck` ·
  `npm test -- tests/view/program-editor.test.mjs` · `npm test -- tests/quality/test_function_and_file_size.py`
- **Depends on:** Slices 10, 12 · Foundation entries rows 1, 3, 6, 7, 10

### Slice 14 — The rule panel, the rule's row, „Teraz” and the chronicle show the verb with its target

- **Goal:** spec Decision 3 unit 7, what the panel and the row draw. In `src/browser/view/rule-panel.tsx` a pick
  in the target field of an item verb changes the rule's target through the function Slice 13 added; the action
  field, closed, shows „Wytwórz — Opatrunek (2 mchy)” or „Opatrz — Opatrunek (1 opatrunek)” with the time of one
  carrying out beside it; the cells of the target pick of „Wytwórz” show the time of each target beside it,
  „10 min” (D-293, D-363 as rows 7 and 6 change them). In `src/browser/view/rule-list.tsx` the row of the rule shows
  „Wytwórz — Opatrunek” and its time, taken from the target, and no price. `RulePanelView` and the function Slice 4
  moved out stay under the limit of D-425. A new test file `tests/view/item-verb-panel.test.mjs`, written on the
  document imitation as `tests/view/rule-editor.test.mjs` is, holds these. `tests/view/now-lines.test.mjs` and
  `tests/view/chronicle-entries.test.mjs` show „Teraz” and the chronicle writing „Wytwórz — Opatrunek” and „Opatrz
  — Opatrunek” in the row's words (D-334, D-340). The report sorts each changed file as one-time for the model or
  for the bandage alone (*To do* 14).
- **Change:** `src/browser/view/rule-panel.tsx` · `src/browser/view/rule-list.tsx` ·
  `tests/view/item-verb-panel.test.mjs` · `tests/view/now-lines.test.mjs` · `tests/view/chronicle-entries.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `tests/view/rule-editor.test.mjs:1-168`
  helpers · `tests/view/rule-editor.test.mjs:1527-1660` the pick's groups, prices and the action field's value ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:36-41` To do, item 7 ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:244-257` Decision 3 — The verb with a target, unit 7 ·
  `foundations/decisions.md:9286-9304` D-293, as row 7 changes it · `foundations/decisions.md:9894-9905` D-363, as
  row 6 changes it · `foundations/decisions.md:9672-9715` D-306 · `foundations/decisions.md:10498-10552` D-334 ·
  `foundations/decisions.md:10937-10964` D-340 · `foundations/decisions.md:841-858` D-425 ·
  `foundations/part_map.md:3-32` browser-view
- **Model:** same — the panel's focus and commit behaviour with a verb whose target and price change
- **Risk:** none
- **Checks:** first the failing cases of the action field's value and of the target cells' times; then
  `npm test -- tests/view/item-verb-panel.test.mjs` · `npm test -- tests/view/now-lines.test.mjs` ·
  `npm test -- tests/view/chronicle-entries.test.mjs` · `npm test -- tests/quality/test_function_and_file_size.py`
- **Depends on:** Slices 4, 13 · Foundation entries rows 6, 7

### Slice 15 — The test of the rule editor takes the fifth group

- **Goal:** the case „the actions stand in the groups Ruch, Zbieranie, Ogień, Żywność i walka, each with its icon
  and the time of one execution beside it” of `tests/view/rule-editor.test.mjs` takes the five groups of D-290 as
  row 3 changes it — „Opatrz” after „Zjedz — jagoda” with its time, „Wytwórz” alone in „Wytwarzanie” with no time
  (D-293 as row 7 changes it) — and its title names the five groups; any other case of the file that writes out
  the actions of the pick takes the two verbs, the cell „Wytwórz” with no price and „Opatrz” with none (D-363 as
  row 6 changes it). The foundation step wrote D-290 with „five named groups”; a `decision:` line of `tests/view/rule-editor.test.mjs` quotes the sentence of D-290 (`tests/view/rule-editor.test.mjs:1528`, around the line named) and the foundation check, `python -B .the-way/elements/common/foundation_check.py --skip-test-citations`, reports it until the line quotes the sentence as the log now holds it: this slice changes that line to the sentence as D-290 reads now (the log is the source, never from memory). No product code changes; a case that fails for another reason is named in the report.
- **Change:** `tests/view/rule-editor.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `foundations/decisions.md:9576-9597` D-290,
  as row 3 changes it · `foundations/decisions.md:9286-9304` D-293, as row 7 changes it ·
  `foundations/decisions.md:9894-9905` D-363, as row 6 changes it
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` (exit 0 from this slice on, the last citation of D-290 changed) · `npm test -- tests/view/rule-editor.test.mjs`
- **Depends on:** Slice 14 · Foundation entries rows 3, 6, 7

### Slice 16 — The scene at „Wytwórz” and „Opatrz”

- **Goal:** `tests/view/scene-picture.test.mjs` shows what Slice 7 wrote in `src/browser/view/scene-picture.ts`:
  at „Wytwórz — Opatrunek” and „Opatrz — Opatrunek” the mage stays where it stands (D-318 as row 5 changes it),
  the plaque over its head shows the icon of the verb, and the end of either in a reading starts no effect of a
  gathering there, since both take pieces out of the backpack (D-317, D-367); the plaque of a discovery of the
  bandage shows the bandage's icon from its row. The scene gets no new picture or effect. `scene-picture.ts`
  changes only where these cases show the two verbs handled otherwise than those decisions give. The report sorts
  each changed file as one-time for the model or for the bandage alone (*To do* 14).
- **Change:** `tests/view/scene-picture.test.mjs` · `src/browser/view/scene-picture.ts`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:41-41` To do, item 7, the scene ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:258-262` Decision 3 — The verb with a target, unit 8 ·
  `foundations/decisions.md:11507-11534` D-318, as row 5 changes it · `foundations/decisions.md:11416-11505` D-317 ·
  `foundations/decisions.md:11756-11767` D-367 ·
  `foundations/part_map.md:3-32` browser-view
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/scene-picture.test.mjs`
- **Depends on:** Slices 7, 12 · Foundation entries row 5

### Slice 17 — The balance instrument runs, traces and describes the two verbs

- **Goal:** *To do* 12 and spec Decision 3 unit 9. `balance/describe.mjs` describes an action with an item target
  as the game words it, „Wytwórz — Opatrunek”, with the item's name from the built game's data, and refuses an
  item the data lack with an error naming it; `balance/trace.mjs` names the item of a started action with an item
  target, as it names a resource; `balance/engine.mjs` stays as it is, since its full Understanding and the game's
  functions read the tables at call time. Tests: `tests/balance/cli.test.mjs` (a program with both verbs described,
  an unknown item refused); `tests/balance/trace.test.mjs` (the trace names the item); `tests/balance/agreement.test.mjs`
  (a program that gathers moss, crafts the bandage and dresses with it, standing in the test, on Las — głębiej,
  ends each seed in the instrument as in the game: `instrument-game-agreement`); `tests/balance/overlay.test.mjs`
  (a second item with a recipe and a healing property laid through `applyOverlay` with the content an overlay file
  would hold, standing in the test, becomes a target of both verbs that the instrument describes and runs, moss of
  neither, and the restore removes it: the acceptance criterion, its instrument part, with a `decision:` line
  quoting the first sentence of Foundation entries row 1). No number of the game in the instrument's code, no file
  written outside `balance/cli.mjs`, no clock read. The report sorts each changed file as one-time for the model or
  for the bandage alone (*To do* 14).
- **Change:** `balance/describe.mjs` · `balance/trace.mjs` · `tests/balance/cli.test.mjs` ·
  `tests/balance/trace.test.mjs` · `tests/balance/agreement.test.mjs` · `tests/balance/overlay.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-balance-instrument.md` ·
  `balance/engine.mjs` · `balance/overlay.mjs` · `src/browser/sim/data/items.ts` · `src/browser/sim/data/actions.ts` ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:46-46` To do, item 12 ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:51-53` Acceptance criteria ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:98-101` Questions to settle, question 7 ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:88-91` Constraints ·
  `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:263-266` Decision 3 — The verb with a target, unit 9 ·
  Foundation entries row 1 · `foundations/decisions.md:905-918` D-437 · `foundations/decisions.md:11825-11838` D-427 ·
  `foundations/decisions.md:306-330` D-18 · `foundations/invariants.md:1438-1466` instrument-game-agreement,
  balance-instrument-file-writes, balance-instrument-repeatability · `foundations/glossary.md:296-300` overlay ·
  `foundations/part_map.md:128-138` balance-tools
- **Model:** same — the instrument's agreement with the game, a program run in both
- **Risk:** none
- **Checks:** first the failing cases of the description and of the second item; then
  `npm test -- tests/balance/cli.test.mjs` · `npm test -- tests/balance/trace.test.mjs` ·
  `npm test -- tests/balance/agreement.test.mjs` · `npm test -- tests/balance/overlay.test.mjs` ·
  `npm test -- tests/invariants/test_balance_instrument_file_writes.py` ·
  `npm test -- tests/invariants/test_balance_instrument_repeatability.py`
- **Depends on:** Slices 10, 12 · Foundation entries row 1

## Coverage

| What the task requires | Slices or entries |
|---|---|
| Outcome: a crafted bandage dresses a wound by an action written as a verb with a target from the item's data, and the cost of the trial shown | Slices 5–17; row 1; *To do* 14 below |
| *To do* 1 — the bandage crafted, on no map; how the data tell it from what lies on maps | Slices 5, 6 (the items' own words), 7 (the row), 9 (the data's test) |
| *To do* 2 — the recipe 2 moss → 1 bandage in 10 minutes, numbers in the data alone, tests reading them | Slice 7 (data), 9 (recipe uses a piece), 12 (tests take the numbers from the data) |
| *To do* 3 — „Wytwórz” with targets from the recipes; its end; interruption; skipped without pieces | Slices 7, 10, 12 |
| *To do* 4 — „Opatrz” with targets from the healing property; its end; 25 health up to the cap whatever took it; interruption | Slices 7, 10, 12 |
| *To do* 5 — „zdrowie pełne” at 100, not at 99.95; the end checks the start; not in combat | Slices 7 (refusal), 12 (end and tests) |
| *To do* 6 — kind and item kind in the program; the check refuses a target the data do not give; pass-over outside the repertoire | Slices 7, 10; row 1 |
| *To do* 7 — the editor: groups, icons, price and time, words, reasons, the scene | Slices 4, 6, 7, 8, 13, 14, 15, 16; rows 3, 5, 6, 7, 8 |
| *To do* 8 — revelations: moss reveals the bandage and „Wytwórz”, the first crafted bandage reveals „Opatrz”; the new kind of event | Slices 7 (data, kind), 9 (data's test), 12 (the event); row 4 |
| *To do* 9 — the bandage an item everywhere items are counted and shown, and no target of what lies on tiles | Slices 5, 6, 10, 11, 13; row 10 |
| *To do* 10 — no character skill, no practice | Slices 10, 12 |
| *To do* 11 — the actions of today keep their kinds; a program of a previous save means the same | Slices 10 (the second sentence of row 1 through the previous-save reader), 11 |
| *To do* 12 — the balance instrument with the new verbs; an overlay adds or changes an item and its recipe; agreement | Slice 17 |
| *To do* 13 — the foundation entries | Foundation entries rows 1–16 |
| *To do* 14 — the cost table in the request's description | the orchestrator, from the *Change* of Slices 4–17 and the sorting each of their reports gives (one-time for the model, or the bandage alone); the second item shown by data alone in Slices 10, 13, 17; the count of today's seven actions with `git grep -l -w` at the end of the cycle |
| *To do* 15 — the content revision a remembered judging is checked against does not repeat for different content; the comment of `isAboveLoaded` | Slices 1, 2, 3; rows 11, 12 |
| Acceptance criterion — a second item, in a test or an overlay alone, a target of both verbs in the simulation, the editor and the instrument; moss of neither | Slices 10, 13, 17 |
| Projected entry „(new) — How does an action name what it acts on?” | row 1; Slices 7, 10, 13, 17 |
| *Questions carried to cycle* — how the data write an item that lies on no map | spec Decision 1; Slices 5, 6, 7 |
| Settlement row 1 | row 10; Slices 10, 13 |
| Settlement row 2 | row 2; Slice 12 |
| Settlement row 3 | row 2; Slices 7, 12 |
| Settlement row 4 | data: Slice 7; tests: Slices 9, 12 |
| Settlement row 5 | row 4; Slices 7, 9, 12 |
| Settlement row 6 | row 3; Slices 7, 9, 13, 15 |
| Settlement row 7 | data: Slice 7 (icon names), Slice 8 (icon files and credits); rows 14–16 |
| Settlement row 8 | row 6; Slices 12, 13, 14 |
| Settlement row 9 | row 7; Slices 13, 14, 15 |
| Settlement row 10 | row 8; Slices 7, 12 |
| Settlement row 11 | row 5; Slices 7, 16 |
| Settlement row 12 | row 9; Slice 12 |
| Settlement row 13 | row 7; Slices 13, 14 |
| Settlement row 14 | row 2; Slice 12 |
| Settlement row 15 | row 8; Slices 7, 12 |
| Guidelines: the module of the targets in the table of `coding-simulation-module`; the cache's row in `testing.md` | Slices 7, 1 |

## Choices

| Choice | Way rejected | Cost if wrong |
|---|---|---|
| The names the spec leaves to the maker that later slices must name: `src/browser/sim/action-targets.ts`, `src/browser/view/item-target-pick.ts`, `tests/sim/action-targets.test.mjs`, `tests/sim/craft-and-tend.test.mjs`, `tests/view/item-verb-panel.test.mjs`; the kinds `craft` and `tend` and the group „Wytwarzanie” as the spec names them | each slice's agent naming its own files — a later slice's handoff could not name what an earlier slice writes | a rename in a later change |
| Slice 4 moves the row of one field out of `RulePanelView`, which stands at the 200 lines D-425 allows, before Slice 14 adds to it | growing the function in Slice 14 and splitting it there — the first added line fails the size test, and a split inside a change of behaviour is harder to review | one cheap slice more |
| `program-editor.ts` (680 of 800 lines of code) is not split first; Slice 13 puts the pick of an item target in a new module | a move of the words of a rule out of `program-editor.ts` first — nine files and seven importers changed for a file 120 lines under the limit | if later work brings the file near 800, the move comes then |
| Slice 7 carries the data, the types and every branch the compiler requires across simulation and view, with no test of its own; the tests come in Slices 9, 10, 12, 13, 16, and a named set of tests fails from Slice 7 until the slice that owns each (a probe on the base, the new rows laid on the built data, found 41 failing cases in seven files, all named in Slice 7) | one slice holding data, types, the version and their tests — more than one agent reads (the style guide, the testing guidelines and the 157 000 characters of the test of the saved game); code written only to keep each slice green, to be removed after | the gate is red between Slices 7 and 15; a slice's reviewer meets failures of later slices, which Slice 7's report names |
| The icons and their credits (Slice 8) right after the data that name them (Slice 7) | the icons first — the test of the credits fails from that slice until the data name the icons, and the order of the section in `icons.test.mjs` changes only with the data | between Slices 7 and 8 the screens that draw the credits fail at import |
| The version of the saved game rises in Slice 11, after the check accepts the two verbs (Slice 10) | the version raised right after Slice 7 — its document could not hold the new actions yet, and the test file would be read twice | the test of the saved game fails from Slice 7 to Slice 11 |
| The acceptance criterion's second item laid in the tests of each place: on the built `ITEMS` in Slices 10 and 13, through `applyOverlay` with an overlay's content in Slice 17; no file under `balance/overlays/` | an overlay file in `balance/overlays/` — measurement data holding an item no measurement needs, and its test still needed | none of the game's data holds it, as the criterion asks |
| `actionPrice`, `actionTime` and `actionPriceText` take the action's target as an argument their callers may leave out | the whole action as their argument — every caller changes in the slice that changes the function, past what that slice can read | a caller that forgets the target shows no price or time; Slice 14's tests show the target reaching the row and the panel |
| The fingerprint stands in `judging-record.ts`, its tests taking their expectation from whether a save raises the content revision | the fingerprint beside `contentDiffers` in `programs.ts` — that file changes in Slice 10 too, and its rule would still be tested the same way | two definitions of the same content to keep agreeing; the tests hold them together |
| The sentences of `guidelines/coding-simulation-module.md` (Slice 7) and `guidelines/testing.md` (Slice 1) change in the slice whose code makes them true | a run of `the-way-maintain-coding-guidelines` or `the-way-maintain-testing-guidelines` for one row each | a guideline changed outside its skill; the review of the whole change reads both rows |
| The program of the agreement test with the two verbs stands in the test, not in `tests/sim/reference-programs.mjs` | a reference program — it would enter every description and campaign of the reference programs and their tests | none for the game; a measurement wanting it adds it later |
| The slices of *To do* 15 (1–3) come first, since nothing else of the task touches them | after the model's slices — no gain, and a stop of the cycle late would leave them unmade | none |
