# Handoff — executor of slice 17 (`make-change`, a slice)

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator; nothing it answers is that person's approval. You ask no human; a question goes back to the orchestrator in your return as `questions`.

## Where you work

- Worktree (your working directory): `the root of the task's worktree` — branch `task/model-czynnosci-i-przedmiotow`. **Your base** (the head of the branch when you start): `82d478babde3a28c3494a7850e41a07b4e6e20f6`; commit only on this branch; never reset it, never rebase, never touch another worktree. The pinned the-way is the worktree's `.the-way` (`19e5774aed6d1d628042e23deccc110ed9f112c0`).
- Your method: `.the-way/task-cycle/change/SKILL.md` (`make-change`), read whole; your variant is **"a slice, or the retry of a slice"**: read `.the-way/task-cycle/change/slice.md` whole as that row gives. Read `.the-way/task-cycle/change/ui_check.md` only if the slice changes a user interface (the slices that touch `src/browser/view/` do not need a screenshot unless their section says so) — a state check by code and tests is what the plan asks. Do not call a skill; read the files.
- Your stage and its boundary: make **only this slice** (its section below), run its focused checks, commit, and return. Nothing of another slice; no foundation entry beyond what this section names; no change of the plan or the spec (a disagreement of the plan and the code is `slice.md`'s case).
- Your directory for working copies: `.runs/executor-17/` (directly under the ignored `.runs/` of the worktree).
- Report path (full report; the file is the input of the cycle's scripts, `task-cycle/remarks_check.py` reads it): `.runs/task-cycles/model-czynnosci-i-przedmiotow/reports/executor-17-report.md`; its first line is yours (status). It holds what `make-change` section 6 gives: the checks with their command and exit code, the own-work check, the reaches beyond this handoff, **Unread material**, **Searches not found or unclear** (each `none` where nothing), and the line on the working copies.
- `cycle.md` and the other files of `.runs/task-cycles/model-czynnosci-i-przedmiotow/` — other agents' handoffs, reports and findings — are not yours to read, except those this handoff names.
- Answers of step 4: trust boundary **yes** (`src/browser/sim/saved-game.ts`, `src/browser/sim/previous-programs.ts`, `assets/icons/**`, `src/browser/view/judging-cache.ts`); irreversible operation **no**. This slice's risk: none.
- **The gate.** Never run `npm test` with no argument and never run the whole of the tests or `node --test` over a folder of tests: that is the full gate, and its run waits for a signal the orchestrator holds. The focused checks named in the section's *Checks* are `npm test -- <one file>` (it runs exactly one Node or Python test file); run only those and the typecheck, ESLint and Prettier on the files you change. Before you return also run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` and make sure that no error it lists comes from a file you changed (a `decision:` or `invariant:` line in a test must quote exact words that begin a binding sentence of the entry as the log holds it now; the listed errors of other files and the one of `tests/view/rule-editor.test.mjs` for Slice 15 are not yours). Never skip a hook or a check. Commit by path (`git add <path> …`), never `git add -A`, `git add .` or `git commit -a`; the message in English, the first line in the style of the repository's commits (type, emoji, what and why).
- Where the slice leaves a test failing that a later slice owns (the section says which), do not change that test and do not make it pass by code of this slice that the section does not give; name it in your report.
- **Sorting of the changed files (the task's *To do* 14; your section may say 'the report sorts each changed file').** The request's cost table counts files of code and of tests the trial changed, in two parts: (1) **one-time for the model of actions and items** -- a file changed so that any later item of the same sort can be a row of data (types, the module of targets, the program check, the repertoire, the editor's logic and its panel, the scene's branches, the instrument's description and trace, the invariant tests that write kinds or lists out by hand, the saved game's version) and the tests of that shape; (2) **the bandage alone** -- a file changed for the bandage itself (its row, words, recipe and healing numbers, its tests, its revelation). A file changed for both counts in (1). Icons, foundation entries and guideline files stand beside and are outside the count. In your report give a table of each file you changed with its added/removed lines and its part, (1) or (2), with one sentence of the reason where it is not obvious.
- The size rule of D-425 (200 lines of code for a function, 800 for a file, comments and blank lines not counted) binds every file you change: run `node tests/quality/eslint-size-rules.mjs` on the tree before you return, and name the result.

Working copies (the first paragraph of "Working copies" of the cycle's skill, word for word):

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Your slice (the plan's section, copied word for word)

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

## Passages the slice's *Read* names (copied word for word; the file and the lines stand in the heading)

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:46-46` To do, item 12

```text
12. Przyrząd balansu wykonuje, śledzi i opisuje program z nowymi czynnościami tak, jak pokazuje je gra, a nakładka może dodać albo zmienić w pamięci przedmiot i przepis; przejście jednego ziarna kończy się tak samo w grze i w przyrządzie (niezmiennik `instrument-game-agreement`).
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:51-53` Acceptance criteria

```text
### Acceptance criteria

- Przedmiot, któremu same dane dają własność leczenia, staje się celem „Opatrz”, a przedmiot, któremu same dane dają przepis, celem „Wytwórz” — w symulacji, w edytorze programu i w przyrządzie balansu — bez zmiany kodu poza danymi gry; pokazuje to test albo nakładka z drugim takim przedmiotem (projektowany wpis: „the targets a verb takes follow from the properties of the items in the game's data”; D-18: „an item […] of a kind the simulation already handles is added by a change of data alone”). Drugi taki przedmiot stoi tylko w teście albo w nakładce, nigdy w danych, które gra daje graczowi; ten sam dowód pokazuje, że przedmiot bez przepisu i bez własności leczenia, jak mech, nie staje się celem żadnej z dwóch czynności.
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/task-frozen.md:98-101` Questions to settle, question 7

```text
- Pytanie 7. Jaki rodzaj kodu i jaki plik-wzorzec obowiązują pliki przyrządu balansu w `balance/`, które to zadanie zmienia? (pytanie czekało na wynik zadania 23 planu, `wzorzec-kodu-przyrzadu`, scalonego 2026-11-20; testów w `tests/balance/` nie dotyczy: rodzaj kodu to kod produktu poza testami, a zasady testów stoją w `guidelines/testing.md`)
  - Answer: rodzaj `balance-instrument`, plik-wzorzec `balance/engine.mjs` (D-437). Pliki `balance/`, które zadanie zmienia według *Context* — `balance/overlay.mjs`, `balance/describe.mjs`, `balance/trace.mjs` i `balance/engine.mjs` — stoją w tabeli „Files of this kind” wytycznych `guidelines/coding-balance-instrument.md`, więc wykonawca czyta te wytyczne przed zmianą każdego z nich; nowy plik kodu przyrządu, jeśli cykl go doda, dochodzi do tej tabeli (D-437, *Verification*: „list each file of code of the instrument in the table of the kind”). Pliki JSON nakładek i opisów graczy w `balance/overlays/` i `balance/players/` są danymi, które przyrząd czyta, i do rodzaju nie należą — także nakładka z drugim przedmiotem, jeśli dowód z *Acceptance criteria* pójdzie przez nakładkę. Reguły rodzaju, które dotyczą tej pracy wprost: „Liczba gry” — przyrząd bierze liczby opatrunku ze zbudowanej gry i nie wpisuje ich u siebie (zgodnie z punktem 2 *To do*); „Przejście mapy jak w grze” — punkt 12 *To do*; przykład „Odmowa nieznanego identyfikatora” — opis czynności, której celem jest przedmiot, odmawia identyfikatora, którego dane gry nie mają, błędem, który nazywa brak.
  - Not chosen: none w tym zadaniu — to pytanie o to, jak jest; drogi, których człowiek nie wybrał przy rodzaju i wzorcu, stoją w opisie zadania 23 i w D-437, *Rejected*.
  - Source: `guidelines/coding.md`, tabela „Kinds of code”, wiersz „| balance-instrument | `guidelines/coding-balance-instrument.md` | Przed dodaniem lub zmianą pliku kodu przyrządu balansu w `balance/`. |”, oraz `guidelines/coding-balance-instrument.md`, sekcje „When to read”, „Files of this kind” (`balance/engine.mjs` — exemplar, D-437; `campaign.mjs`, `check-map.mjs`, `cli.mjs`, `describe.mjs`, `loop.mjs`, `overlay.mjs`, `trace.mjs` — copy) i „Rules”, przy fec2ae7e (scalenie prośby 164, zadanie 23). D-437, `foundations/decisions.md` przy fec2ae7e: „The exemplar for kind `balance-instrument` is `balance/engine.mjs`, and its kind guidelines are read before adding or changing a file of that kind; the kind is the files of code of the balance instrument in `balance/`, and the overlay files and the player descriptions that the instrument reads are data and stand outside it.” Wybór rodzaju i wzorca: human, 2026-11-20, „ok dla wszystkich dotychczas”, rozmowa `a conversation file of the task's refinement (outside the repository)`, tura 10 (Q1 a, Q5 a). Testy poza rodzajem: `.the-way/product-guidelines/coding/template.md`, „A kind is code of the product other than its tests; the rules of the tests stand in the product's testing guidelines (WAY-231).”
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:88-91` Constraints

```text
- The instrument takes the game's numbers from the built game and refuses an identifier the data lack
  with an error naming it (`guidelines/coding-balance-instrument.md`, „Liczba gry”, „Odmowa
  nieznanego identyfikatora”; D-437); it writes no file outside `balance/cli.mjs` and reads no clock
  (invariants `balance-instrument-file-writes`, `balance-instrument-repeatability`).
```

### `.runs/task-cycles/model-czynnosci-i-przedmiotow/spec.md:263-266` Decision 3 — The verb with a target, unit 9

```text
9. **The balance instrument** (`balance/describe.mjs`, `balance/trace.mjs`). An action with an item
   target is described and traced with the item's name from the data, as an action with a resource
   is, and an item the data lack is an error naming it. The engine needs no change: its full
   Understanding and the game's functions read the tables at call time.
```

## Foundation entries to read, each whole, by their address in the worktree as it stands now

The foundation step moved `foundations/decisions.md` and `foundations/invariants.md`; the ranges below are the current ones and hold where they differ from the plan's. An entry runs from its heading to the next heading. The decisions and invariants the plan names:

- `foundations/decisions.md:905-919` D-437
- `foundations/decisions.md:11932-11946` D-427
- `foundations/decisions.md:306-331` D-18
- `foundations/invariants.md:1438-1447` instrument-game-agreement
- `foundations/invariants.md:1448-1457` balance-instrument-file-writes
- `foundations/invariants.md:1458-1467` balance-instrument-repeatability
- the entries the plan's *Foundation entries* rows name that your section names as changed ("as row N changes it") are written already by the foundation step (commit `ed70970a`); read them as they stand. The new decision „How does an action name what it acts on?” is **D-443**.

- `foundations/glossary.md:296-300` overlay
- `foundations/part_map.md:128-138` balance-tools

## Guideline files and instruction files to read, each whole

- `guidelines/coding.md`
- `guidelines/testing.md`
- `guidelines/coding-balance-instrument.md`
- `guidelines/coding.md` is the general coding guideline (it holds the kinds index); `guidelines/testing.md` is read whole before you write or change a test.

## Files you change (the slice's *Change*; read each whole before you change it; a file that does not exist yet you create)

- `balance/describe.mjs`
- `balance/trace.mjs`
- `tests/balance/cli.test.mjs`
- `tests/balance/trace.test.mjs`
- `tests/balance/agreement.test.mjs`
- `tests/balance/overlay.test.mjs`

## Other files of code and tests to read (whole, or in the range named)

- `balance/engine.mjs`
- `balance/overlay.mjs`
- `src/browser/sim/data/items.ts`
- `src/browser/sim/data/actions.ts`


## What you return

Status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`), your commits, a one-line check result naming what failed or did not run, and the report path. Commit everything of the slice before you return; leave the worktree clean.
