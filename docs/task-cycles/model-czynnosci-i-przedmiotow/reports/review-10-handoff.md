# Handoff -- reviewer of slice 10 (`review-change`)

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; nothing it answers is that person's approval. You ask no human; a question goes back to the orchestrator in your return as `questions`.

## Where you work

- Worktree (your working directory): `the root of the task's worktree` -- branch `task/model-czynnosci-i-przedmiotow`. The pinned the-way is the worktree's `.the-way` (`19e5774aed6d1d628042e23deccc110ed9f112c0`). You are READ-ONLY: you change no file of the worktree except your report; you commit nothing.
- Your method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole; this is the review of a slice (not the whole change, not a fix): you read what this handoff names. Do not call a skill; read the files.
- What you review: **slice 10**, the range `9e867128d33b47d432ede8448124c03a62875fb4..856fa86063c3b23533ee75ce556c5db47c475d61` (base..head); compute the diff yourself with `git diff 9e867128d33b47d432ede8448124c03a62875fb4..856fa86063c3b23533ee75ce556c5db47c475d61` and `git log 9e867128d33b47d432ede8448124c03a62875fb4..856fa86063c3b23533ee75ce556c5db47c475d61`, and confirm that `git rev-parse HEAD` is `856fa86063c3b23533ee75ce556c5db47c475d61` before you go on.
- The author's report (a set of claims to verify, not evidence): `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/executor-10-report.md`.
- Your directory for working copies: `.runs/review-10/` (directly under the ignored `.runs/` of the worktree).
- Report path (full report; the file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it): `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/review-10-report.md`; its FIRST line is `PASS <sha>` or `FAIL <sha>` (the head you reviewed) or `questions`. It holds the review's graded findings, the checks you ran with command and exit code, the reaches beyond this handoff, **Unread material**, **Searches not found or unclear** (each `none` where nothing) and the line on the working copies.
- `cycle.md` and the other files of `.runs/task-cycles/model-czynnosci-i-przedmiotow/` -- other agents' handoffs, reports and findings -- are not yours to read, except those this handoff names.
- Answers of step 4: trust boundary **yes** (`src/browser/sim/saved-game.ts`, `src/browser/sim/previous-programs.ts`, `assets/icons/**`, `src/browser/view/judging-cache.ts`): check crafted input at the boundary files this slice touches. Irreversible operation **no**. This slice's risk: trust boundary — `src/browser/sim/previous-programs.ts` and `src/browser/sim/saved-game.ts`, whose
  refusals pass through the check this slice changes; the previous-save reader's refusal tests change here.
- **The gate.** Never run `npm test` with no argument and never run the whole of the tests or `node --test` over a folder of tests: that is the full gate, and its run waits for a signal the orchestrator holds. The focused checks of the slice's *Checks* are `npm test -- <one file>` (it runs exactly one Node or Python test file); you may run those and other single files, the typecheck, ESLint and Prettier on the changed files, but nothing of the whole gate.
- Where the slice leaves a test failing that a later slice owns (its section says which), that is no finding of this slice; a failure the section does not name is.
- You judge the slice against the passages of the task the handoff gives, not the plan alone; the grades and the scope are yours.


Working copies (the first paragraph of "Working copies" of the cycle's skill, word for word):

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## The slice (the plan's section, copied word for word)

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

## Passages the slice's *Read* names (copied word for word; the file and the lines stand in the heading)

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:32-35` To do, items 3–6

```text
3. Postać wykonuje czynność „Wytwórz” z celem: celem może być każdy przedmiot, który ma w danych przepis, i tylko taki, a zbiór celów wynika z danych, nie z listy w kodzie. „Wytwórz — Opatrunek” po czasie przepisu zabiera z plecaka składniki przepisu i wkłada do niego opatrunek, razem (D-71); przerwana napaścią nie zabiera nic (D-142) (pytanie 8). Bez składników program pomija regułę, jak każdą czynność, której nie da się wykonać (D-23).
4. Postać wykonuje czynność „Opatrz” z celem: celem może być każdy przedmiot, któremu dane dają własność leczenia, i tylko taki. „Opatrz — Opatrunek” trwa 10 minut gry i na jej końcu, razem, zużywa jedną sztukę opatrunku z plecaka i przywraca 25 zdrowia, nie ponad pełne zdrowie (D-387), bez względu na to, co zdrowie zabrało — zimno, głód czy cios w walce (pytanie 2; D-60 zostaje bez zmian); przerwana napaścią nie zabiera nic (pytanie 8). Liczby są wstępne, jak w punkcie 2 (pytanie 3).
5. Przy pełnym zdrowiu — równym 100, pułapowi zdrowia z D-387 — „Opatrz” nie da się wykonać: program pomija regułę z powodem „zdrowie pełne”, tak jak pomija „Zapal — ognisko”, gdy ognisko już płonie; przy 99,95 da się. Koniec czynności sprawdza to samo co jej początek: gdy zdrowie wróciło samo do pełna w trakcie tych 10 minut, opatrunek zostaje w plecaku, a czynność kończy się bez skutku, jak zapalanie, które na końcu zastaje ognisko już płonące (pytanie 10). W walce „Opatrz” się nie wykonuje, bo w walce działają tylko czynności walki (D-140); opatrzenie w trakcie starcia to gałąź Ucisk z zadania 6 (pytanie 2).
6. Program zapisuje obie czynności jako rodzaj czynności i cel będący rodzajem przedmiotu, nigdy sztuką (D-23, D-26, niezmiennik `program-world-reference`); sprawdzenie programu odrzuca „Wytwórz” albo „Opatrz” z celem, którego dane tej czynności nie dają — to zdanie nowej decyzji trzyma test z linią `decision:` w jej *Verification*, bo niezmiennik `program-closed-lists` mówi o rodzajach czynności, nie o celach, i zostaje bez zmian; a regułę z celem spoza repertuaru postaci symulacja pomija, jak dziś regułę „Zbierz” z takim celem (D-126).
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:43-45` To do, items 9–11

```text
9. Opatrunek jest przedmiotem wszędzie tam, gdzie gra liczy i pokazuje przedmioty: zajmuje miejsce w plecaku i w skrzynce (D-64, D-50), stoi na listach „Zabierz” i „Wynieś” planu wyprawy (D-179, D-181), w warunku „Zapas poniżej”, w wierszu plecaka i na ekranie Wiedza (D-416). Nie staje wśród celów „Idź”, „Zbierz” i „Obchód” ani w warunku „Tu leży mniej niż” — ani w przejściu mapy, ani poza nim — bo nie leży na żadnej mapie (pytanie 1).
10. Do zadania 6 czynności „Wytwórz — Opatrunek” i „Opatrz — Opatrunek” nie rozwijają żadnej umiejętności postaci: są otwarte dla każdej postaci i nie dają wprawy (D-120, D-193); drzewo leczenia opatrunkiem z gałęzią Ucisk wnosi zadanie 6 (plan, wiersz 6: „Leczenie opatrunkiem ma w grze własne drzewo umiejętności z gałęzią Ucisk”).
11. Czynności, które gra ma dziś, zostają osobnymi rodzajami i działają jak przed zmianą: program z tymi czynnościami, także wciągnięty z poprzedniego zapisu (D-401), znaczy to samo co przed zmianą (projektowany wpis: „An action made before this rule keeps a kind of its own until a change rewrites it.”).
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:51-53` Acceptance criteria

```text
### Acceptance criteria

- Przedmiot, któremu same dane dają własność leczenia, staje się celem „Opatrz”, a przedmiot, któremu same dane dają przepis, celem „Wytwórz” — w symulacji, w edytorze programu i w przyrządzie balansu — bez zmiany kodu poza danymi gry; pokazuje to test albo nakładka z drugim takim przedmiotem (projektowany wpis: „the targets a verb takes follow from the properties of the items in the game's data”; D-18: „an item […] of a kind the simulation already handles is added by a change of data alone”). Drugi taki przedmiot stoi tylko w teście albo w nakładce, nigdy w danych, które gra daje graczowi; ten sam dowód pokazuje, że przedmiot bez przepisu i bez własności leczenia, jak mech, nie staje się celem żadnej z dwóch czynności.
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:204-221` Decision 3 — The verb with a target, units 1–3

```text
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
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:281-294` Decision 4 — A program of today's actions stays
  the same

```text
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
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:359-372` Trust boundary — crafted input

```text
### Trust boundary — crafted input

- `src/browser/sim/saved-game.ts`: a program, a copy, a base or an earning loop's program holding
  „Wytwórz” or „Opatrz” with a target the data do not give the verb (moss, a resource of no recipe, an
  identifier the data lack, no `item`, an extra field), an activity holding such an action, a backpack,
  chest, trip list, burning item or Understanding naming an item the data lack, a backpack whose keys are
  not exactly the data's items (the bandage missing included), a tile whose stock names the bandage —
  each refused whole as `shape`; a document of version 9 refused as `version`. Nothing throws for a
  value a document can hold.
- `src/browser/sim/previous-programs.ts`: an item whose program holds „Wytwórz” or „Opatrz” with a
  target the data do not give the verb, or with no `item`, is skipped and named; the reading goes on.
  A field of such an action beyond `kind` and `item` is dropped by the check, which builds the action
  from its known fields, and the program is appended without it, as for every action today (the reader
  calls only the check; the comparison with what the check built belongs to the load alone).
```

## Foundation entries to read, each whole, by their address in the worktree as it stands now

The foundation step moved `foundations/decisions.md` and `foundations/invariants.md`; the ranges below are the current ones and hold where they differ from the plan's. An entry runs from its heading to the next heading. The decisions and invariants the plan names:

- `foundations/decisions.md:841-859` D-425
- `foundations/decisions.md:7847-7890` D-23
- `foundations/decisions.md:7917-7947` D-26
- `foundations/decisions.md:8066-8085` D-126
- `foundations/decisions.md:7440-7463` D-120
- `foundations/decisions.md:7113-7133` D-193
- `foundations/decisions.md:4307-4323` D-401
- `foundations/decisions.md:9610-9664` D-289
- `foundations/invariants.md:1428-1437` function-and-file-size
- `foundations/invariants.md:364-374` program-closed-lists
- `foundations/invariants.md:386-396` program-world-reference
- `foundations/invariants.md:248-263` program-rule-pick
- `foundations/invariants.md:1378-1387` previous-save-programs-reader
- the entries the plan's *Foundation entries* rows name that your section names as changed ("as row N changes it") are written already by the foundation step (commit `ed70970a`); read them as they stand. The new decision „How does an action name what it acts on?” is **D-443**.

- `foundations/glossary.md:123-134` Understanding, repertoire
- `foundations/part_map.md:34-65` simulation
- `foundations/part_map.md:91-126` build-tools

## Guideline files and instruction files to read, each whole

- `guidelines/coding.md`
- `guidelines/testing.md`
- `guidelines/coding-simulation-module.md`
- `src/browser/AGENTS.md`
- `guidelines/coding.md` is the general coding guideline (it holds the kinds index); `guidelines/testing.md` is read whole before you write or change a test.

## Files the slice changes (read the diff and each changed file as far as the review needs)

- `src/browser/sim/programs.ts`
- `src/browser/sim/understanding.ts`
- `tests/sim/action-targets.test.mjs`
- `stryker.config.json`
- `tests/sim/previous-programs.test.mjs`
- `tests/invariants/test_program_closed_lists.py`
- `tests/invariants/test_program_world_reference.py`

## Other files of code and tests to read (whole, or in the range named)

- `src/browser/sim/previous-programs.ts`
- `src/browser/sim/data/items.ts`
- `src/browser/sim/data/actions.ts`
- `src/browser/sim/types.ts`
- Ranges the plan names (find them again by the name beside them where the file changed): `src/browser/sim/types.ts:41-61` Action

## What you return

The first line of your report (`PASS <sha>`, `FAIL <sha>` or `questions`), the report path; no check result beyond the checks you ran, named in the report.
