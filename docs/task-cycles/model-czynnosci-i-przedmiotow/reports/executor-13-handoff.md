# Handoff — executor of slice 13 (`make-change`, a slice)

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; nothing it answers is that person's approval. You ask no human; a question goes back to the orchestrator in your return as `questions`.

## Where you work

- Worktree (your working directory): `the root of the task's worktree` — branch `task/model-czynnosci-i-przedmiotow`. **Your base** (the head of the branch when you start): `ef87d9e66db01e0dbbec639b5f9851e0897e27c8`; commit only on this branch; never reset it, never rebase, never touch another worktree. The pinned the-way is the worktree's `.the-way` (`19e5774aed6d1d628042e23deccc110ed9f112c0`).
- Your method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole; your variant is **"a slice, or the retry of a slice"**: read `.the-way/task-cycle/change/slice.md` whole as that row gives. Read `.the-way/task-cycle/change/ui_check.md` only if the slice changes a user interface (the slices that touch `src/browser/view/` do not need a screenshot unless their section says so) — a state check by code and tests is what the plan asks. Do not call a skill; read the files.
- Your stage and its boundary: make **only this slice** (its section below), run its focused checks, commit, and return. Nothing of another slice; no foundation entry beyond what this section names; no change of the plan or the spec (a disagreement of the plan and the code is `slice.md`'s case).
- Your directory for working copies: `.runs/executor-13/` (directly under the ignored `.runs/` of the worktree).
- Report path (full report; the file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it): `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/executor-13-report.md`; its first line is yours (status). It holds what `make-change` section 6 gives: the checks with their command and exit code, the own-work check, the reaches beyond this handoff, **Unread material**, **Searches not found or unclear** (each `none` where nothing), and the line on the working copies.
- `cycle.md` and the other files of `.runs/task-cycles/model-czynnosci-i-przedmiotow/` — other agents' handoffs, reports and findings — are not yours to read, except those this handoff names.
- Answers of step 4: trust boundary **yes** (`src/browser/sim/saved-game.ts`, `src/browser/sim/previous-programs.ts`, `assets/icons/**`, `src/browser/view/judging-cache.ts`); irreversible operation **no**. This slice's risk: none.
- **The gate.** Never run `npm test` with no argument and never run the whole of the tests or `node --test` over a folder of tests: that is the full gate, and its run waits for a signal the orchestrator holds. The focused checks named in the section's *Checks* are `npm test -- <one file>` (it runs exactly one Node or Python test file); run only those and the typecheck, ESLint and Prettier on the files you change. Never skip a hook or a check. Commit by path (`git add <path> …`), never `git add -A`, `git add .` or `git commit -a`; the message in English, the first line in the style of the repository's commits (type, emoji, what and why).
- Where the slice leaves a test failing that a later slice owns (the section says which), do not change that test and do not make it pass by code of this slice that the section does not give; name it in your report.
- **Sorting of the changed files (the task's *To do* 14; your section may say 'the report sorts each changed file').** The request's cost table counts files of code and of tests the trial changed, in two parts: (1) **one-time for the model of actions and items** -- a file changed so that any later item of the same sort can be a row of data (types, the module of targets, the program check, the repertoire, the editor's logic and its panel, the scene's branches, the instrument's description and trace, the invariant tests that write kinds or lists out by hand, the saved game's version) and the tests of that shape; (2) **the bandage alone** -- a file changed for the bandage itself (its row, words, recipe and healing numbers, its tests, its revelation). A file changed for both counts in (1). Icons, foundation entries and guideline files stand beside and are outside the count. In your report give a table of each file you changed with its added/removed lines and its part, (1) or (2), with one sentence of the reason where it is not obvious.
- The size rule of D-425 (200 lines of code for a function, 800 for a file, comments and blank lines not counted) binds every file you change: run `node tests/quality/eslint-size-rules.mjs` on the tree before you return, and name the result.

Working copies (the first paragraph of "Working copies" of the cycle's skill, word for word):

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Your slice (the plan's section, copied word for word)

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

## Passages the slice's *Read* names (copied word for word; the file and the lines stand in the heading)

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:36-43` To do, items 7–9

```text
7. Edytor programu oferuje „Wytwórz” i „Opatrz” w wyborze czynności i po wyborze prowadzi do pola celu, jak przy „Zbierz” (D-306); przy czynności stoją jej czas i cena (D-293, D-363), a reguła, której nie da się wykonać, podaje powód (D-310). Szczegóły (pytanie 6):
   - Grupa w wyborze czynności: „Opatrz” staje w grupie „Żywność i walka”, obok „Zjedz — jagoda”; „Wytwórz” staje w nowej, piątej grupie „Wytwarzanie”; „Wytwórz — ognisko” zostaje w grupie „Ogień”.
   - Ikony: „Wytwórz” ma ikonę młotka, tę samą co „Wytwórz — ognisko” (`claw-hammer`); „Opatrz” dostaje ikonę zwoju bandaża (`bandage-roll`), a przedmiot opatrunek ikonę apteczki (`first-aid-kit`) — obie z game-icons.net, ze wzmianką w sekcji „Autorzy grafiki” (D-27).
   - Cena i czas: cena czynności z celem stoi przy każdym celu w wyborze celu i przy wybranej czynności: „Wytwórz — Opatrunek (2 mchy)”, „Opatrz — Opatrunek (1 opatrunek)”. Czynność, której czas daje cel, pokazuje go przy każdym celu w wyborze celu, obok ceny: „Opatrunek (2 mchy)” i obok „10 min” (pytanie 9). Komórka „Wytwórz” w wyborze czynności nie ma ani ceny, ani czasu, bo oba daje przepis celu; komórka „Opatrz” ma swój czas, bez ceny.
   - Słowa: wiersz reguły, wiersz „Teraz” i kronika piszą „Wytwórz — Opatrunek” i „Opatrz — Opatrunek”, jak „Zbierz — Patyk” (D-334, D-340). Powody, gdy reguły nie da się wykonać: „brakuje 2 × mech” przy „Wytwórz — Opatrunek”, „brakuje 1 × opatrunek” i „zdrowie pełne” przy „Opatrz — Opatrunek”, a gdy prawdziwe są oba, reguła podaje „zdrowie pełne”, tak jak „ognisko już płonie” stoi przed „brakuje 2 × patyk” (pytanie 11); w minutach napaści reguła z którąkolwiek z nich jest zwykłą regułą z powodem „trwa walka” (D-309).
   - Scena: przy obu czynnościach mag stoi tam, gdzie stał, jak przy „Zjedz — jagoda”; scena nie dostaje nowego obrazka ani efektu.
8. Opatrunek, „Wytwórz” i „Opatrz” wchodzą do Zrozumienia przez zdarzenia zapisane w danych przy każdej z tych rzeczy (D-128): pierwsza zebrana sztuka mchu odsłania opatrunek i „Wytwórz”, a pierwsza wytworzona sztuka opatrunku odsłania „Opatrz”. „Pierwsza wytworzona sztuka przedmiotu” to nowy rodzaj zdarzenia odsłaniającego, który symulacja zaczyna obsługiwać; potem następny przedmiot z przepisu dostaje takie odsłonięcie samą zmianą danych. Warunek „Zdrowie poniżej” zostaje przy pierwszej napaści wilka (D-143) (pytanie 4).
9. Opatrunek jest przedmiotem wszędzie tam, gdzie gra liczy i pokazuje przedmioty: zajmuje miejsce w plecaku i w skrzynce (D-64, D-50), stoi na listach „Zabierz” i „Wynieś” planu wyprawy (D-179, D-181), w warunku „Zapas poniżej”, w wierszu plecaka i na ekranie Wiedza (D-416). Nie staje wśród celów „Idź”, „Zbierz” i „Obchód” ani w warunku „Tu leży mniej niż” — ani w przejściu mapy, ani poza nim — bo nie leży na żadnej mapie (pytanie 1).
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:51-53` Acceptance criteria

```text
### Acceptance criteria

- Przedmiot, któremu same dane dają własność leczenia, staje się celem „Opatrz”, a przedmiot, któremu same dane dają przepis, celem „Wytwórz” — w symulacji, w edytorze programu i w przyrządzie balansu — bez zmiany kodu poza danymi gry; pokazuje to test albo nakładka z drugim takim przedmiotem (projektowany wpis: „the targets a verb takes follow from the properties of the items in the game's data”; D-18: „an item […] of a kind the simulation already handles is added by a change of data alone”). Drugi taki przedmiot stoi tylko w teście albo w nakładce, nigdy w danych, które gra daje graczowi; ten sam dowód pokazuje, że przedmiot bez przepisu i bez własności leczenia, jak mech, nie staje się celem żadnej z dwóch czynności.
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:128-137` Decision 1 — An item no map holds, and what a
  resource is

```text
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
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:244-257` Decision 3 — The verb with a
  target, unit 7

```text
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
```

## Foundation entries to read, each whole, by their address in the worktree as it stands now

The foundation step moved `foundations/decisions.md` and `foundations/invariants.md`; the ranges below are the current ones and hold where they differ from the plan's. An entry runs from its heading to the next heading. The decisions and invariants the plan names:

- `foundations/decisions.md:9665-9691` D-290
- `foundations/decisions.md:9347-9380` D-293
- `foundations/decisions.md:9987-10003` D-363
- `foundations/decisions.md:9610-9664` D-289
- `foundations/decisions.md:9765-9809` D-306
- `foundations/decisions.md:9692-9725` D-291
- the entries the plan's *Foundation entries* rows name that your section names as changed ("as row N changes it") are written already by the foundation step (commit `ed70970a`); read them as they stand. The new decision „How does an action name what it acts on?” is **D-443**.

- `foundations/part_map.md:3-32` browser-view

## Guideline files and instruction files to read, each whole

- `guidelines/coding.md`
- `guidelines/testing.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/AGENTS.md`
- `guidelines/coding.md` is the general coding guideline (it holds the kinds index); `guidelines/testing.md` is read whole before you write or change a test.

## Files you change (the slice's *Change*; read each whole before you change it; a file that does not exist yet you create)

- `src/browser/view/program-editor.ts`
- `src/browser/view/item-target-pick.ts`
- `tests/view/program-editor.test.mjs`

## Other files of code and tests to read (whole, or in the range named)

- `src/browser/sim/program.ts`
- `src/browser/sim/data/items.ts`
- `src/browser/sim/data/actions.ts`
- Ranges the plan names (find them again by the name beside them where the file changed): `src/browser/sim/program.ts:53-99`
  actionPrice, as Slice 12 left it

## What you return

Status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. Commit everything of the slice before you return; leave the worktree clean.
