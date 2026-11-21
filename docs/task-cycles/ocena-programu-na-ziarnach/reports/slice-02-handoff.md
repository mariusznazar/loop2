# Handoff — the executor of slice 2, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `b2114894`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 2 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-2/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-02-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- The foundation step has written the entries of the plan (commit `a65b8fa4`, on this branch): the decisions D-439 and D-440 are new, D-243, D-329, D-325, D-241, D-246 and D-22 are changed and D-190's rationale is corrected. D-251 is **withdrawn** (task 24): do not cite it as a decision you rest on.
- The seven quotations `decision: D-243` of the old first sentence of D-243 (in `tests/sim/loop.test.mjs:237` and `:304`, `tests/view/maps-screen.test.mjs:494` and `:700`, `tests/view/account-screen.test.mjs:2683`, `:2807` and `:2975`) no longer stand in D-243; the slice that changes the file shortens its quotation to a passage that stands in D-243 now (slice 5: loop.test.mjs; slice 10: maps-screen.test.mjs; slice 12: account-screen.test.mjs). Where your slice does not change the file, leave it.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- `guidelines/coding.md`
- `guidelines/testing.md`
- `foundations/part_map.md:204-212` test-helpers
- `foundations/part_map.md:33-64` simulation
- `foundations/part_map.md:127-137` balance-tools
- `foundations/decisions.md:704-753` D-351 (plan: 704-753)
- `foundations/invariants.md:1248-1257` cross-part-imports
- `foundations/invariants.md:214-225` simulation-isolation
- `foundations/invariants.md:176-186` simulation-randomness
- `foundations/invariants.md:236-247` content-identifiers
- `foundations/invariants.md:1448-1457` balance-instrument-file-writes
- `foundations/invariants.md:1458-1467` balance-instrument-repeatability
- `.the-way/elements/part-map/skill/SKILL.md`
- `tests/invariants/test_balance_instrument_file_writes.py`
- `tests/invariants/test_balance_instrument_repeatability.py`
- `tests/invariants/loop2_invariant_support.py`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 51-51 (To do)

12. Porządek w testach, bez zmiany gry (pytanie 17): cztery kopie kodu, który tnie tekst źródłowy TypeScriptu i JavaScriptu na kod, komentarze, napisy, tekst szablonów i wyrażenia regularne, stają się jednym kodem w części `test-helpers`. Kopie to: `segments`, `without_comments` i `code_only` w `tests/invariants/test_simulation_isolation.py`; `split_source` w `tests/invariants/test_simulation_randomness.py`; `without_comments` w `tests/invariants/test_content_identifiers.py`; `segments`, `code_only` i `string_values` w `tests/invariants/balance_source_scan.py` — każda ze stałymi `REGEX_AFTER` i `REGEX_AFTER_WORDS`. Po zmianie żaden z tych czterech plików nie trzyma własnego cięcia, tylko bierze je z tego jednego kodu. Testy, które dziś używają którejś kopii — `test_simulation_isolation.py`, `test_simulation_randomness.py`, `test_content_identifiers.py`, `test_balance_instrument_file_writes.py` i `test_balance_instrument_repeatability.py` (dwa ostatnie przez `balance_source_scan.py`) — przechodzą bez zmiany żadnego przypadku kontrolnego ani oczekiwanej wartości (`guidelines/testing.md`, reguła „Changing an existing test”). Kopie różnią się dziś szczegółami — `split_source` zdejmuje znak ucieczki w napisie, `string_values` oddaje napis surowy, a `without_comments` z `test_content_identifiers.py` zostawia napisy w tekście — więc wspólny kod daje każdemu z tych testów to, co daje mu dziś jego kopia, albo więcej: żaden test nie przestaje widzieć formy, którą widzi dziś, a gdzie któryś widzi więcej, prośba o scalenie to nazywa. Mapa części idzie za zmianą przez `the-way-update-part-map`: opis części `test-helpers` („The part holds the helpers that serve the tests of several parts — running the product's commands in a copy of the working tree, reading the repository's files and giving each file its part of the part map — which the tests of every part may import and code that is no test may not.”) mówi też o cięciu tekstu źródłowego, a gdy kod staje w nowym pliku, plik wchodzi do *Files* tej części.

### lines 164-168 (Context)

- Cztery kopie z *To do* 12 mają przy `fec2ae7e` te same stałe i ten sam przebieg: komentarz, napis, szablon z podstawieniami `${…}` i wyrażenie regularne rozpoznane po ostatnim znaku kodu przed `/`; `balance_source_scan.py` mówi o sobie: „The cut is a lexer of the forms TypeScript and JavaScript share, written for the scan of names only, like the one the check of `simulation-isolation` holds.”
- Pełnomocnik prosił o połączenie trzech kopii (rozmowa doprecyzowania, tura 30); czwartą, w `test_content_identifiers.py`, wskazała krytyka zmiany planu (`.runs/project-refinement/critique-plan-change-2.md`, uwaga 3), a ten sam kod potwierdziło czytanie pliku przy doprecyzowaniu.
- Cięcia tekstu źródłowego innego kształtu zostają, jak są: `code_only` w `tests/invariants/test_browser_view_framework.py` (prostsze, bez wyrażeń regularnych i podstawień w szablonach), `literal_texts` w `tests/invariants/test_browser_view_token_values.py` (czyta JSX i podaje wiersz każdego napisu), `script_tokens` w `tests/invariants/test_cross_part_imports.py` (dzieli kod na słowa i znaki z numerem wiersza) oraz cięcia CSS: `without_comments` w `test_browser_view_token_values.py` i `scan_to` w `tests/invariants/test_design_token_sources.py`; zastąpienie ich wspólnym kodem zmieniłoby to, co widzą ich testy.
- `splitSource` w `tests/sim/rules.test.mjs` to ta sama kopia napisana w JavaScripcie; część `test-helpers` ma tylko kod w Pythonie (`tests/invariants/loop2_invariant_support.py`), więc ta kopia z *To do* 12 się nie łączy.
- Test każdej części może importować plik części `test-helpers` (niezmiennik `cross-part-imports`), a z pliku testu symulacji test przyrządu importować nie może — dlatego zadanie 23 cięcie skopiowało (przegląd zadania 23, „Minor 5”: „importing from the simulation's test file would break `cross-part-imports`, so the copy is the cheap way inside this task”).

### lines 237-241 (Out of scope)

## Out of scope

- Katalog map, pierwsze mapy z samych danych i Matecznik pokazany z liczbą — zadanie 3 planu.
- Plon na przejście w raporcie z nieobecności, o którym mówi notatka źródłowa propozycji progresji — definicja go nie niesie.
- Cięcia tekstu źródłowego w testach poza czterema kopiami z *To do* 12, także kopia w `tests/sim/rules.test.mjs` (zob. *Context*).

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 2 — one cutting of source text in the part test-helpers

- **Goal:** the four copies of the code that cuts TypeScript and JavaScript source into code,
  comments, strings, template text and regular expressions — `segments`, `without_comments` and
  `code_only` in `tests/invariants/test_simulation_isolation.py`; `split_source` in
  `tests/invariants/test_simulation_randomness.py`; `without_comments` in
  `tests/invariants/test_content_identifiers.py`; `segments`, `code_only` and `string_values` in
  `tests/invariants/balance_source_scan.py`, each with `REGEX_AFTER` and `REGEX_AFTER_WORDS` —
  become one code in a new file of the part `test-helpers`, `tests/invariants/source_lexer.py`,
  and none of the four files keeps a cutting of its own. The shared code gives each of the five
  tests that use a copy today (`test_simulation_isolation.py`, `test_simulation_randomness.py`,
  `test_content_identifiers.py`, and through `balance_source_scan.py`
  `test_balance_instrument_file_writes.py` and `test_balance_instrument_repeatability.py`) what its
  copy gives it today or more — `split_source` takes the escape off a string, `string_values` gives
  a string raw, and the `without_comments` of `test_content_identifiers.py` leaves the strings in
  the text — so no test stops seeing a form it sees today; where one sees more, the report says
  which and what, for the request. No control case and no expected value of the five tests changes
  (`guidelines/testing.md`, "Changing an existing test"). The cuttings of another shape stay as they
  are (task, *Context*: `code_only` of `test_browser_view_framework.py`, `literal_texts` and the CSS
  cutting of `test_browser_view_token_values.py`, `script_tokens` of `test_cross_part_imports.py`,
  `scan_to` of `test_design_token_sources.py`, `splitSource` of `tests/sim/rules.test.mjs`). The
  part map follows through the project skill `the-way-update-part-map` (read as the file named in
  *Read*): the description of `test-helpers` says it also cuts source text, and its *Files* list the
  new file. No file of the game changes.
- **Change:** `tests/invariants/source_lexer.py` · `tests/invariants/test_simulation_isolation.py` ·
  `tests/invariants/test_simulation_randomness.py` · `tests/invariants/test_content_identifiers.py` ·
  `tests/invariants/balance_source_scan.py` · `foundations/part_map.md`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:51-51` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:164-168` Context ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:237-241` Out of scope ·
  `guidelines/coding.md` · `guidelines/testing.md` · `foundations/part_map.md:204-212` test-helpers ·
  `foundations/part_map.md:33-64` simulation · `foundations/part_map.md:127-137` balance-tools ·
  `foundations/decisions.md:704-753` D-351 · `foundations/invariants.md:1248-1257`
  cross-part-imports · `foundations/invariants.md:214-225` simulation-isolation ·
  `foundations/invariants.md:176-186` simulation-randomness · `foundations/invariants.md:236-247`
  content-identifiers · `foundations/invariants.md:1448-1457` balance-instrument-file-writes ·
  `foundations/invariants.md:1458-1467` balance-instrument-repeatability ·
  `.the-way/elements/part-map/skill/SKILL.md` ·
  `tests/invariants/test_balance_instrument_file_writes.py` ·
  `tests/invariants/test_balance_instrument_repeatability.py` ·
  `tests/invariants/loop2_invariant_support.py`
- **Model:** same — four copies that differ in details have to become one code without any of five
  tests seeing less, which needs a careful comparison rather than a pattern.
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_simulation_isolation.py` ·
  `npm test -- tests/invariants/test_simulation_randomness.py` ·
  `npm test -- tests/invariants/test_content_identifiers.py` ·
  `npm test -- tests/invariants/test_balance_instrument_file_writes.py` ·
  `npm test -- tests/invariants/test_balance_instrument_repeatability.py` ·
  `npm test -- tests/invariants/test_cross_part_imports.py` ·
  `python -B .the-way/elements/common/foundation_check.py` (the new file claimed by
  `test-helpers`).
- **Depends on:** none

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
