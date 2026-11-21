# Handoff — executor of slice 12 (`make-change`, a slice)

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; nothing it answers is that person's approval. You ask no human; a question goes back to the orchestrator in your return as `questions`.

## Where you work

- Worktree (your working directory): `the root of the task's worktree` — branch `task/model-czynnosci-i-przedmiotow`. **Your base** (the head of the branch when you start): `c791f75539c44dc866f1bd9c603fc5ba40867a65`; commit only on this branch; never reset it, never rebase, never touch another worktree. The pinned the-way is the worktree's `.the-way` (`19e5774aed6d1d628042e23deccc110ed9f112c0`).
- Your method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole; your variant is **"a slice, or the retry of a slice"**: read `.the-way/task-cycle/change/slice.md` whole as that row gives. Read `.the-way/task-cycle/change/ui_check.md` only if the slice changes a user interface (the slices that touch `src/browser/view/` do not need a screenshot unless their section says so) — a state check by code and tests is what the plan asks. Do not call a skill; read the files.
- Your stage and its boundary: make **only this slice** (its section below), run its focused checks, commit, and return. Nothing of another slice; no foundation entry beyond what this section names; no change of the plan or the spec (a disagreement of the plan and the code is `slice.md`'s case).
- Your directory for working copies: `.runs/executor-12/` (directly under the ignored `.runs/` of the worktree).
- Report path (full report; the file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it): `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/executor-12-report.md`; its first line is yours (status). It holds what `make-change` section 6 gives: the checks with their command and exit code, the own-work check, the reaches beyond this handoff, **Unread material**, **Searches not found or unclear** (each `none` where nothing), and the line on the working copies.
- `cycle.md` and the other files of `.runs/task-cycles/model-czynnosci-i-przedmiotow/` — other agents' handoffs, reports and findings — are not yours to read, except those this handoff names.
- Answers of step 4: trust boundary **yes** (`src/browser/sim/saved-game.ts`, `src/browser/sim/previous-programs.ts`, `assets/icons/**`, `src/browser/view/judging-cache.ts`); irreversible operation **no**. This slice's risk: none.
- **The gate.** Never run `npm test` with no argument and never run the whole of the tests or `node --test` over a folder of tests: that is the full gate, and its run waits for a signal the orchestrator holds. The focused checks named in the section's *Checks* are `npm test -- <one file>` (it runs exactly one Node or Python test file); run only those and the typecheck, ESLint and Prettier on the files you change. Never skip a hook or a check. Commit by path (`git add <path> …`), never `git add -A`, `git add .` or `git commit -a`; the message in English, the first line in the style of the repository's commits (type, emoji, what and why).
- Where the slice leaves a test failing that a later slice owns (the section says which), do not change that test and do not make it pass by code of this slice that the section does not give; name it in your report.
- **Sorting of the changed files (the task's *To do* 14; your section may say 'the report sorts each changed file').** The request's cost table counts files of code and of tests the trial changed, in two parts: (1) **one-time for the model of actions and items** -- a file changed so that any later item of the same sort can be a row of data (types, the module of targets, the program check, the repertoire, the editor's logic and its panel, the scene's branches, the instrument's description and trace, the invariant tests that write kinds or lists out by hand, the saved game's version) and the tests of that shape; (2) **the bandage alone** -- a file changed for the bandage itself (its row, words, recipe and healing numbers, its tests, its revelation). A file changed for both counts in (1). Icons, foundation entries and guideline files stand beside and are outside the count. In your report give a table of each file you changed with its added/removed lines and its part, (1) or (2), with one sentence of the reason where it is not obvious.
- The size rule of D-425 (200 lines of code for a function, 800 for a file, comments and blank lines not counted) binds every file you change: run `node tests/quality/eslint-size-rules.mjs` on the tree before you return, and name the result.

Working copies (the first paragraph of "Working copies" of the cycle's skill, word for word):

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Your slice (the plan's section, copied word for word)

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

## Passages the slice's *Read* names (copied word for word; the file and the lines stand in the heading)

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:32-34` To do, items 3–5

```text
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

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:58-72` Constraints

```text
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
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:222-243` Decision 3 — The verb with a target, units 4–6

```text
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
```

## Foundation entries to read, each whole, by their address in the worktree as it stands now

The foundation step moved `foundations/decisions.md` and `foundations/invariants.md`; the ranges below are the current ones and hold where they differ from the plan's. An entry runs from its heading to the next heading. The decisions and invariants the plan names:

- `foundations/decisions.md:841-859` D-425
- `foundations/decisions.md:5616-5628` D-71
- `foundations/decisions.md:6486-6519` D-63
- `foundations/decisions.md:6760-6786` D-142
- `foundations/decisions.md:6831-6854` D-145
- `foundations/decisions.md:6463-6481` D-387
- `foundations/decisions.md:6191-6206` D-60
- `foundations/decisions.md:6701-6740` D-140
- `foundations/decisions.md:7113-7133` D-193
- `foundations/decisions.md:8138-8154` D-380
- `foundations/decisions.md:9889-9925` D-309
- `foundations/decisions.md:7464-7521` D-121
- `foundations/decisions.md:7683-7723` D-128
- `foundations/decisions.md:9987-10003` D-363
- `foundations/decisions.md:1044-1058` D-82
- `foundations/invariants.md:1428-1437` function-and-file-size
- `foundations/invariants.md:248-263` program-rule-pick
- `foundations/invariants.md:214-225` simulation-isolation
- `foundations/invariants.md:226-235` simulation-inputs
- the entries the plan's *Foundation entries* rows name that your section names as changed ("as row N changes it") are written already by the foundation step (commit `ed70970a`); read them as they stand. The new decision „How does an action name what it acts on?” is **D-443**.

- `foundations/part_map.md:34-65` simulation
- `foundations/part_map.md:91-126` build-tools

## Guideline files and instruction files to read, each whole

- `guidelines/coding.md`
- `guidelines/testing.md`
- `guidelines/coding-simulation-module.md`
- `src/browser/AGENTS.md`
- `guidelines/coding.md` is the general coding guideline (it holds the kinds index); `guidelines/testing.md` is read whole before you write or change a test.

## Files you change (the slice's *Change*; read each whole before you change it; a file that does not exist yet you create)

- `src/browser/sim/run.ts`
- `src/browser/sim/body.ts`
- `src/browser/sim/program.ts`
- `src/browser/sim/understanding.ts`
- `tests/sim/craft-and-tend.test.mjs`
- `stryker.config.json`

## Other files of code and tests to read (whole, or in the range named)

- `src/browser/sim/skills.ts`
- `src/browser/sim/data/items.ts`
- `src/browser/sim/data/actions.ts`
- `src/browser/sim/data/revelations.ts`
- `src/browser/sim/data/balance.ts`
- `tests/sim/campfire.test.mjs`
- `tests/sim/encounters.test.mjs`
- `tests/sim/discovery.test.mjs`
- Ranges the plan names (find them again by the name beside them where the file changed): `tests/sim/campfire.test.mjs:1-149`
  helpers; `tests/sim/campfire.test.mjs:296-334` the end of an action; `tests/sim/encounters.test.mjs:1-75` an
  attack interrupting an action; `tests/sim/discovery.test.mjs:1-127` helpers

## What you return

Status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. Commit everything of the slice before you return; leave the worktree clean.
