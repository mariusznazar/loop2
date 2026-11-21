# Spec — Model czynności i przedmiotów — czasownik z celem z własności przedmiotu, sprawdzony na opatrunku

- Task: `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md`
- Open choice: the task's section *Questions carried to cycle* and what *To do* leaves there, as five
  choices: (1) how the game's data tell an item that is made from what lies on maps, the item's
  identifier and the map-side word for what gathering gives; (2) where the recipe and the healing
  property stand in the data and what the overlay of the balance instrument must know; (3) the
  shape of an action that is a verb with a target, in the types and the data, and how the check,
  the load, the repertoire, the revelations, the editor and the instrument read it; (4) how a
  program written with today's actions stays the same; (5) *To do* 15 — how the identity of a
  program's content a remembered judging is checked against is kept from repeating for different
  content, and what the comment of `isAboveLoaded` in `src/browser/view/judging-cache.ts` says.

## Intent

The game gets its first action that is a verb with a target taken from the properties of items:
„Wytwórz” takes every item whose data hold a recipe, „Opatrz” every item whose data hold a healing
property. The bandage („opatrunek”) is made from 2 moss in 10 game minutes and restores 25 health in
10 game minutes. A second item of the same sort must then be a row of data alone. The trial shows
what the model cost before task 6 (rana i opatrunek) and task 8 build on it. Beside it, as *To do* 15
asks, a judging the browser remembers stops standing beside a program whose content it did not
judge.

## Goals and non-goals

Goals:

- An item no map holds can stand in the data (the bandage), and it is an item wherever the game
  counts and shows items, and no target of „Idź”, „Zbierz”, „Obchód” or „Tu leży mniej niż”
  (*To do* 1, 9; Question 1).
- Two new ordinary actions, „Wytwórz” and „Opatrz”, each a verb with an item as its target, the
  targets following from the items' data (*To do* 3–6), shown and edited as *To do* 7 gives, revealed
  as *To do* 8 gives, growing no character skill (*To do* 10).
- Every action the game has today keeps its own kind and means what it meant (*To do* 11).
- The balance instrument runs, traces and describes programs with the new actions, and an overlay
  can add or change an item and its recipe in memory (*To do* 12).
- A judging the browser remembers stands only beside the content it judged (*To do* 15), and the
  comment of `isAboveLoaded` tells the truth.
- The acceptance criterion: a second item with a recipe and a healing property, laid in a test or an
  overlay alone, becomes a target of „Wytwórz” and „Opatrz” in the simulation, the editor and the
  instrument with no change of code, and moss becomes the target of neither.

Non-goals (each stated by the task or left out because the task does not need it):

- No rewrite of the seven actions with an item in their name, nor of any other action of today
  (*Out of scope*).
- No healing skill tree, no Ucisk branch, no dressing in combat, no measurement of the pack map
  (task 6); no rope, no pestle, no weapon wear (task 9).
- No resource that gives an item of another identifier, no second recipe for an item, no recipe that
  yields more than one piece, no recipe tables apart from the items (the ways rejected in Decision 1
  and Decision 2 below).
- No change to how the content revision is counted in the game state, to the saved game state's
  holding of it, or to the server (Decision 5).
- No new scene picture or effect (*To do* 7, „Scena”).

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

## Decisions

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

### Decision 4 — A program of today's actions stays the same

**Chosen.** No kind of action of today changes its shape, its check, its refusals, its effect, its words
or its place in the pick other than the group order D-290 gives; the new kinds are added beside them.
The program check accepts every program it accepted before, so a program of a previous save of each
version from 1 to 9 is read and appended as before (D-401), and a reference program runs as before. The
saved game state's version rises to 10, which the load refuses for earlier versions as D-206 gives; the
reader of a previous save reads a document of version 10 as one of version 9 or above. The second
sentence of the new decision is held by a test that a program holding every kind of action of today,
as a version-9 previous save holds it, is read, checked and appended with exactly that content, and by
the tests of each kind of today, which keep their expectations.

Ways weighed: rewriting the kinds of today as verbs with targets — excluded by the task (*Out of
scope*). Reading old programs through a translation — nothing needs translating while no kind changes.

### Decision 5 — A remembered judging stands only beside the content it judged (*To do* 15)

**Chosen.** The content revision stays the count D-442 gives, unchanged in the game state, the save,
the load and the server. A judging the browser remembers holds, besides the content revision and the
generation number, a fingerprint of the content of the program it judged; it stands beside „Program:”
only while the program's content revision and the fingerprint of the content the program holds both
equal those it holds. Two different contents never share the pair: the count tells a content changed
and changed back (D-440), and the fingerprint tells a different content that reached the same count
after a change lost with a refused or unsent save (D-442's accepted case). The requirement of *To do*
15, that the revision a remembered judging is checked against does not repeat for different content, is
met by that pair; the count alone may still repeat, and nothing reads it alone to decide whether a
judging stands.

Units:

1. **The fingerprint of a content** (in `src/browser/sim/judging-record.ts`, beside the record it
   serves, or next to `contentDiffers` in `programs.ts` if the maker finds that cleaner within D-425).
   A pure function of a program's content to a short text: the same for two contents `contentDiffers`
   calls equal — the rule groups in their order with their rules and identities, and the trip plan,
   the order of an object's keys and the identity counters counting for nothing (D-442) — and different
   for any change D-442 lists, with a chance of a collision of at most one in 2^52. No clock, no random
   number (D-04, invariant `simulation-isolation`).
2. **The record and the mark** (`recordOfJudging`, `markOfRecord`, `JudgingRecord`). The record takes
   the fingerprint of the content of the triple's program in the state it read; the mark stands only
   where it equals the fingerprint of that program's content at hand, besides the conditions of today.
3. **The stored value** (`src/browser/view/judging-cache.ts`). The value holds the fingerprint as one
   more field; the stored form is version 2, the key naming it, so a value of version 1 is neither read,
   written nor removed (D-441 as it stands). A value whose fingerprint is no text of the function's form
   is a value of another form and reads as none (invariant `judging-cache-reading`). The tidying at
   opening is unchanged: it compares numbers, as D-441 gives.
4. **The comment of `isAboveLoaded`.** It is rewritten to say what the function does: it removes a triple
   whose program number or character number the loaded game has not yet given; where the loaded game
   holds the triple's character, one whose generation stands above that character's; and where it holds
   the triple's program, one whose content revision stands above that program's; each of the two last
   checks reads only what the loaded game holds, so a triple whose program the loaded game no longer
   holds is still removed by its character's generation, and only a triple neither of whose character
   and program the loaded game holds, both once given, is left by them. The sentence of today, that „a
   triple whose program or character the loaded game once gave and no longer holds is left alone”, is
   what is wrong, and it goes. No behaviour of the function changes.

Ways weighed:

- The moment of the change as the content revision, read from the clock (the way D-442 rejected). Cost
  now: every function that writes a program's content — `setProgram` (`game.ts`), `editProgram` and
  `saveCopyIntoProgram` (`programs.ts`), and the rule written at the first chill inside the passing of
  game minutes (`advanceMinutes` in `game.ts`), whose path from the store's reading of the clock runs
  through the functions that pass real time — takes a moment argument, with every test that calls
  them; the glossary's „content revision”, D-442 and D-401's „starts at 0” change meaning; the moments
  of two devices' clocks can stand in any order, so „never goes down” stops holding. Cost later: none.
  Rejected for the cost now, as D-442 rejected it, now that a way exists that costs three files.
- A fingerprint alone in place of the count (D-442's first rejected way). Rejected for D-442's reason: a
  change made back to the content judged would show the judging again, which D-440 erases.
- Judgings written to the lasting storage only after the server confirms the save of the state they
  read. Cost now: a link from the saver to the cache, a pending state of a judging, and a change of
  D-441; a judging made while a save fails is lost at a reload. Rejected.
- Leaving it as it is. Cost: D-442's accepted case stays — a judging can stand beside another content
  until the next judging of its triple or the next change of its program. Rejected: *To do* 15 asks for
  the fix.

Cost if wrong: where a collision of the fingerprint ever met two contents at one count, a judging would
stand beside a content it did not judge until the next judging or change, which is today's behaviour at
far lower odds.

### Trust boundary — crafted input

- `src/browser/sim/saved-game.ts`: a program, a copy, a base or an earning loop's program holding
  „Wytwórz” or „Opatrz” with a target the data do not give the verb (moss, a resource of no recipe, an
  identifier the data lack, no `item`, an extra field), an activity holding such an action, a backpack,
  chest, trip list, burning item or Understanding naming an item the data lack, a backpack whose keys are
  not exactly the data's items (the bandage missing included), a tile whose stock names the bandage —
  each refused whole as `shape`; a document of version 9 refused as `version`. Nothing throws for a
  value a document can hold.
- `src/browser/sim/previous-programs.ts`: an item whose program holds such an action is skipped and
  named; the reading goes on.
- `assets/icons/**`: `bandage-roll` and `first-aid-kit` come from game-icons.net, untrusted, and pass the
  checks every icon passes (invariants `icon-file-content`, `icon-credits`, `loop2-container-icons`);
  their titles are read from their pages at download and recorded as facts.
- `src/browser/view/judging-cache.ts`: a stored value under version 1 is not read; a value of version 2
  whose fingerprint is missing, no text, too long or of another form reads as none and throws nothing; a
  value whose fingerprint differs from the content at hand gives no mark; nothing of a stored value
  enters the game state.

### Irreversible operation

None in this cycle. The raised version clears the players' saved games once deployed, which the task
accepts (*Context*, D-206) and the cycle does not do.

## Foundation entries

Written by the foundation step or the return step; each named with its kind and meaning.

- Decision (new), „How does an action name what it acts on?” — the approved two sentences. Meaning: an
  action is a verb with a target whose targets follow from the items' properties in the data; the
  actions made before keep their own kinds. Its *Verification* fills the `TODO`: tests with `decision:`
  lines — for the first sentence, the targets of „Wytwórz” and „Opatrz” following the recipe and the
  healing property in the simulation, the editor and the instrument, a second item laid in a test or an
  overlay alone becoming a target of each and moss of neither, and the check refusing either verb with
  a target the data do not give (*To do* 6); for the second, a program of every kind of today read from
  a version-9 previous save and appended unchanged. Its *Relations* fill the `TODO` (derives from D-18
  and D-26 at least; the foundation step settles).
- D-145 (changed): the game has „Opatrz”, which restores health whatever took it, is not carried out in
  combat, cannot be carried out at full health, and leaves the bandage where health is full at its end;
  the part on the stick stays.
- D-290 (changed): five groups, „Opatrz” in Żywność i walka, „Wytwórz” in Wytwarzanie.
- D-121 (changed): the first gathered moss brings the bandage and „Wytwórz”; the first crafted bandage
  brings „Opatrz”.
- D-318 (changed): the mage stays where it stands at „Wytwórz” and „Opatrz”.
- D-363 (changed): the price of an action with an item target stands at each target of its pick and at
  the chosen action; the cell „Wytwórz” has none.
- D-293 (changed): the cell „Wytwórz” shows no time; „Opatrz” its own; an action whose time its target
  gives shows it at each target of its pick, beside the price.
- D-380 (changed): the reasons of „Wytwórz — {rzecz}” and „Opatrz — {rzecz}”, and „zdrowie pełne” before
  „brakuje …”.
- D-142 (sentence added): „Wytwórz” and „Opatrz” take what they use at their end, so an attack takes
  nothing.
- D-289 (sentences added): a thing that lies on no map is no target of „Idź”, „Zbierz”, „Obchód” or „Tu
  leży mniej niż”, in a map run or outside one (settlement 1); and „Wytwórz” and „Opatrz” with no known
  target stand greyed with „nie znasz jeszcze celu”, as the five actions and conditions it names do
  (from Decision 3, unit 7, to keep the decision's list whole).
- D-441 (changed): a remembered judging holds the fingerprint of the content it judged and stands only
  while the program holds that content at that content revision; the stored form is version 2; the
  accepted case of a judging beside other content after a lost change goes from its rationale.
- D-442 (changed): its rationale and its accepted cost lose the case the fingerprint closes; its rejected
  fingerprint way is named as rejected alone, not beside the count; the content revision itself stays.
- Invariant `content-identifiers` (changed): the sentence names an item as well as a game map, a resource
  and an archetype, since the bandage is an item that is no resource.
- Invariant `icon-credits` (changed in *Rests on*): two new environment facts.
- Environment facts (new): the titles of `bandage-roll` and `first-aid-kit` as their pages on
  game-icons.net give them, read at download.
- Guidelines: `guidelines/coding-simulation-module.md` gains the row of the new module of the targets of a
  verb; `guidelines/coding-saved-game.md` needs no change, since its rule already covers the raised
  version.

The settlements of the task's table *Settlements to record* that go to data (rows 4 and 7) go to
`src/browser/sim/data/` and `assets/icons/`, not to the foundation.

## Left to the maker

- The names of the new module, of the field naming a verb's target property, of the recipe and healing
  fields, of the new action group's identifier and of the revealing event's kind; the `status` texts of
  the two new actions; the order of the new rows in `ACTIONS` beyond „Opatrz” right after „Zjedz —
  jagoda”.
- The hash of the fingerprint and its text form, within Decision 5's bounds.
- How the editor composes the action field's value and the target cells' times; how `actionPrice` and
  `actionTime` take the action's target.
- How the type checker is made to hold that every resource identifier is an item identifier.
- The form of the acceptance proof: tests laying the second item on the built tables in each of the
  three places, an overlay file under `balance/overlays/`, or both; the second item never in the game's
  data.
- The case of a program with „Wytwórz” and „Opatrz” for the invariant `instrument-game-agreement`.
- The changes of the invariant tests that write identifiers or kinds out by hand
  (`test_program_closed_lists.py`: `ACTION_KINDS`, `VALID`, and `"craft"` out of the made-up kinds;
  `test_program_world_reference.py` and `test_content_identifiers.py`: the items).
- The split into slices, and where code moves out of a file near the limit of D-425 before it grows.
- The cost table of *To do* 14, counted as the task says.
