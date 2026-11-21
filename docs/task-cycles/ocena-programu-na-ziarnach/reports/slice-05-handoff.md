# Handoff — the executor of slice 5, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `f93df2f6`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 5 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-5/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-05-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- Quotations of decisions in tests: every comment line `// decision: D-n "…"` of a test you write or change must quote, word for word and from the beginning of a sentence, text that stands in a binding sentence of that decision as it stands now (`foundations/decisions.md`; a quotation is no paraphrase). Run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after your change and your files must show no error; errors in files you did not change are not yours (known: the D-243 quotations named below, until their slices). Slices 3 and 4 shipped such errors; do not repeat it.
- The foundation step has written the entries of the plan (commit `a65b8fa4`, on this branch): the decisions D-439 and D-440 are new, D-243, D-329, D-325, D-241, D-246 and D-22 are changed and D-190's rationale is corrected. D-251 is **withdrawn** (task 24): do not cite it as a decision you rest on.
- The seven quotations `decision: D-243` of the old first sentence of D-243 (in `tests/sim/loop.test.mjs:237` and `:304`, `tests/view/maps-screen.test.mjs:494` and `:700`, `tests/view/account-screen.test.mjs:2683`, `:2807` and `:2975`) no longer stand in D-243; the slice that changes the file shortens its quotation to a passage that stands in D-243 now (slice 5: loop.test.mjs; slice 10: maps-screen.test.mjs; slice 12: account-screen.test.mjs). Where your slice does not change the file, leave it.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- `foundations/decisions.md:8661-8719` D-241 (the plan's *Foundation entries* row 6, as the foundation step wrote it)
- `foundations/glossary.md:314-319` term loop record (row 11)
- `foundations/decisions.md:8771-8838` D-243 (the plan's *Foundation entries* row 3, as the foundation step wrote it)
- `foundations/decisions.md:8661-8719` D-241 (plan: 8651-8689)
- `foundations/decisions.md:6220-6252` D-190 (plan: 6210-6242)
- `foundations/decisions.md:6399-6436` D-221 (plan: 6389-6426)
- `foundations/decisions.md:8630-8660` D-240 (plan: 8620-8650)
- `foundations/decisions.md:8861-8898` D-245 (plan: 8791-8828)
- `foundations/decisions.md:3889-3933` D-206 (plan: 3889-3933)
- `foundations/decisions.md:4232-4248` D-386 (plan: 4232-4248)
- `foundations/invariants.md:1048-1057` save-version
- `foundations/invariants.md:1148-1157` catch-up-state
- `foundations/invariants.md:1328-1337` loop-practice-payment
- `foundations/invariants.md:1078-1087` death-settled-once
- `foundations/glossary.md:223-228` earning loop (plan: 223-228)
- `foundations/glossary.md:142-147` completion (plan: 142-147)
- `foundations/glossary.md:211-216` resurrection (plan: 211-216)
- `guidelines/coding.md`
- `guidelines/coding-simulation-module.md`
- `guidelines/coding-saved-game.md`
- `guidelines/testing.md`
- `tests/sim/saved-game.test.mjs:1-120`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 37-37 (To do)

7. Rekord pętli: stan pętli zarobkowej liczy od jej startu ciąg kolejnych domkniętych przejść bez śmierci i najdłuższy taki ciąg. Śmierć pokryta wskrzeszeniem zaczyna ciąg od nowa, tak samo jak śmierć postaci bez wprawy, po której pętla też trwa (D-190), a zatrzymanie pętli kończy liczenie; liczba znika razem z pętlą. Wiersz postaci w raporcie „Gdy cię nie było” dostaje na końcu najdłuższy ciąg zwykłym tekstem, bez wyróżnienia i bez porównania z czymkolwiek (pytanie 7). Liczbę wiersz czyta z pętli przy każdym rysowaniu sekcji, jak wprawę do odebrania (D-246); przy zerze jej nie ma, a wiersz pętli zatrzymanej śmiercią jej nie niesie.

### lines 95-101 (Questions to settle)

- Pytanie 7. Co liczy „rekord pętli” i jak stoi w raporcie „Gdy cię nie było”?
  - Answer: wariant a — ciąg w obrębie jednej pętli: najdłuższy ciąg kolejnych domkniętych przejść bez śmierci od startu tej pętli. Śmierć pokryta wskrzeszeniem zaczyna ciąg od nowa, a zatrzymanie pętli kończy liczenie. Wiersz postaci w raporcie dostaje na końcu tę liczbę zwykłym tekstem, bez wyróżnienia i bez porównania z czymkolwiek. Zmienia D-241 (stan pętli dostaje dwa liczniki) i D-246 (wiersz raportu). Koszt pokazany przy wyborze: zmiana kształtu zapisu, która przy odpowiedzi na pytanie 2 i tak następuje; liczba znika razem z pętlą; dwa liczniki i ich testy dla liczby, która z założenia nie jest celem.
  - Not chosen:
    - b — bez nowego stanu, liczba domkniętych przejść pętli: „dopóki żadnej śmierci nie pokryło wskrzeszenie, to ta sama liczba co w a; po takiej śmierci liczba rośnie dalej i przestaje być ciągiem bez śmierci, a dopisek „wskrzeszenie zużyte” znika z raportu po jego zamknięciu”
    - c — rekord trwały, najlepszy ciąg postaci na mapie: „więcej stanu i liczba do pobijania, która rośnie od samego czekania — przed tym ostrzega przytoczona krytyka”
    - d — rekord wspólny dla konta, na mapę: „Koszt jak c, a do tego miesza postacie o różnych wykupionych stopniach.”
  - Source: human, 2026-11-20 — przy pytaniu pokazanym jako 10: „do pozostałych nie mam uwag”, a na prośbę o potwierdzenie, że to przyjęcie rekomendacji (wśród nich „10 a”): „3. dobrze zrozumiałeś” (rozmowa doprecyzowania, tury 13 i 14; pytanie w brzmieniu tury 10).

### lines 157-158 (Context)

- Raport z nieobecności składa `src/browser/view/away-report.ts` z wierszy typu `AwayReportLine`; pętla w stanie gry ma numer przejścia i liczbę domkniętych przejść (`src/browser/sim/types.ts`, typ `EarningLoop`, pola `runNumber` i `completed`), a ciągu przejść bez śmierci stan nie trzyma.
- Każda zmiana kształtu zapisu podnosi wersję zapisu (`src/browser/sim/saved-game.ts`, `SAVED_GAME_VERSION`, dziś 7; `guidelines/coding-saved-game.md`, reguła „Wersja podnoszona razem z kształtem”), a gra odrzuca wtedy dzisiejsze zapisy (D-206); definicja przyjmuje to dla całego projektu: „każda zmiana kształtu stanu w tym projekcie kasuje zapis”. Pamięć oceny (pytanie 2) i rekord pętli (pytanie 7) zmieniają kształt zapisu.

### lines 230-230 (Settlements to record)

| 8 | Stan pętli zarobkowej trzyma bieżący ciąg domkniętych przejść bez śmierci i najdłuższy taki ciąg od jej startu; śmierć pokryta wskrzeszeniem zaczyna ciąg od nowa. | sentence of D-241 | Pytanie 7 (wybór Mariusza) | czy rekord liczyć z liczby domkniętych przejść, którą stan już ma, i co robi z nim pokryta śmierć |

### lines 235-235 (Settlements to record)

| 13 | „Loop record” (rekord pętli) to najdłuższy ciąg domkniętych przejść bez śmierci od startu jednej pętli zarobkowej; znika razem z nią. | glossary term | Pytanie 7; przyjęty: jak wiersz 10 | czy „record” w D-246 czytać jako najlepszy wynik postaci pamiętany po zatrzymaniu pętli |

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 5 — an earning loop counts its loop record, and the save carries it

- **Goal:** each earning loop holds, as the change of D-241 (Foundation entries row 6) gives, the
  run of successive completed map runs without a death since its start and the longest such run:
  both 0 at the start of the earning loop; a completion adds one to the run and raises the longest
  to it where it is greater; a death covered by the resurrection and the death of a character with
  no practice, after which the earning loop goes on (D-190), start the run anew; a stop ends the
  counting, and the counts go with the earning loop. The counting stands where `takeEnd` of
  `loop.ts` deals with an end, so the open game and the catch-up count alike. The save writes both
  counts and the load reads them strictly: whole numbers from 0, the run not above the longest, a
  missing or foreign key refused as `shape`; the version is not raised here (Slice 6). The failing
  tests come first, in a new file `tests/sim/loop-record.test.mjs`, the save's part of them built
  from a save of a game state as Slice 4's `tests/sim/saved-game-judgings.test.mjs` builds its
  documents; `tests/sim/loop.test.mjs` follows where it lists the keys of an earning loop (its case
  "the first map run of an earning loop goes on the program of its row …") and where a line
  `decision:` of it quotes a passage of D-241 or D-243 the Foundation entries changed; no other case
  of it changes. `tests/sim/saved-game.test.mjs` is not run here; it waits for Slice 6.
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/loop.ts` ·
  `src/browser/sim/saved-game.ts` · `tests/sim/loop.test.mjs` · `tests/sim/loop-record.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:37-37` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:95-101` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:157-158` Context ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:230-230` Settlements to record ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:235-235` Settlements to record ·
  Foundation entries row 6 · Foundation entries row 11 · Foundation entries row 3 ·
  `foundations/decisions.md:8651-8689` D-241 · `foundations/decisions.md:6210-6242` D-190 ·
  `foundations/decisions.md:6389-6426` D-221 · `foundations/decisions.md:8620-8650` D-240 ·
  `foundations/decisions.md:8791-8828` D-245 · `foundations/decisions.md:3889-3933` D-206 ·
  `foundations/decisions.md:4232-4248` D-386 · `foundations/invariants.md:1048-1057` save-version
  · `foundations/invariants.md:1148-1157` catch-up-state · `foundations/invariants.md:1328-1337`
  loop-practice-payment · `foundations/invariants.md:1078-1087` death-settled-once ·
  `foundations/glossary.md:223-228` earning loop · `foundations/glossary.md:142-147` completion ·
  `foundations/glossary.md:211-216` resurrection · `guidelines/coding.md` ·
  `guidelines/coding-simulation-module.md` · `guidelines/coding-saved-game.md` ·
  `guidelines/testing.md` · `tests/sim/saved-game.test.mjs:1-120`
- **Model:** cheaper
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/loop-record.test.mjs` (written first, failing) ·
  `npm test -- tests/sim/loop.test.mjs` · `npm test -- tests/sim/catch-up.test.mjs` ·
  `npm test -- tests/sim/saved-game-judgings.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_inputs.py`
- **Depends on:** Slice 4 · Foundation entries row 6

## Notes of the orchestrator for this slice

- Slices 3, 4 are made (the judging; the remembered judgings and their save/load in `saved-game.ts`, `RememberedJudging` in `types.ts`) and slice 8, 9; read how slice 4 wrote the strict load (`entries`/`fields` helpers, the refusal as `shape`) and write the loop record's load the same way. Review `rs4` of slice 4 found one blocking item (quotations of decisions in tests) that has been repaired; do not touch `tests/sim/saved-game-judgings.test.mjs`.
- Trust boundary: this slice changes `src/browser/sim/saved-game.ts` too: crafted documents (non-integers, negatives, the run above the longest, missing or foreign keys, huge numbers, `__proto__`) are refused whole as `shape` without a throw; a reviewer attacks it with hostile documents. Write the crafted-document cases in `tests/sim/loop-record.test.mjs` first and run them red.
- A new test file under `tests/sim/` has to be listed in `stryker.config.json` (`tests/quality/test_mutation_test_selection.py`); list yours, and name it in the report as an addition to your slice's *Change*.
- The D-243 quotations in `tests/sim/loop.test.mjs` (lines 237 and 304) are yours: shorten each to a passage of D-243 that stands now (current range above), without changing the case.
- The two counts (current run of completions without a death, longest run) and the rules of when they start anew are given by D-241 as the foundation step changed it (current range above) and by the task's *To do* 7; the places where a death ends a map run of an earning loop (`takeEnd` in `loop.ts`) cover both the open game and the catch-up; read `D-190` and `D-221` for the deaths that leave the earning loop going.
- `tests/sim/saved-game.test.mjs` is NOT run and NOT changed here (it waits for slice 6).

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
