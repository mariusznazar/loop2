# Handoff — review `rs5`, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Questions go to the orchestrator, never to the human.

## What is reviewed

- Worktree: `.` (branch `task/ocena-programu-na-ziarnach`); you are read-only there and make no commit. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`). Read it whole, and a file it names only when the step or variant that names the file comes.
- Review: a group of the cycle's slices, in the plan's order — slice(s) 5. **Range to review: `f93df2f6..9efb8a8a`** (base exclusive, head inclusive; head `9efb8a8a`). Check the head with `git rev-parse` first; on a mismatch ask the orchestrator which range to review.
- The change is a member of a plan; the plan's sections for what you review are copied below word for word, and the passages of the frozen task that those sections' *Read* name (the frozen task is `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; open it if a passage points you to more). You judge the work against those passages and the foundation entries the sections name, not against the plan's wording.
- Two answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; check crafted input at that boundary wherever the range touches it (say so in the report if the range does not). Irreversible operation **no**: confirm that the change only prepares what it prepares.
- Executors' and writer's reports (each in `.runs/task-cycles/ocena-programu-na-ziarnach/reports/`): `slice-05-executor-report.md`. Read each; they hold the own-work checks, reaches, concerns and unread material. A check an author reports is evidence of what the author ran, never of the result.
- Mechanical checks the orchestrator ran: clean worktree, non-empty range, changed files equal the slices' *Change*. Any mismatch is given below under notes.
- No agent of the cycle runs the product's full gate; **you do not run `npm test` without a file argument or the whole `tests/`**. Run the focused checks of the slices you review, and probes of your own, from a worktree of the head commit in your own directory.
- Your directory for working copies: `.runs/review-rs5/` (directly under the ignored `.runs/` of the worktree) — make a detached worktree of `9efb8a8a` there (`git worktree add --detach .runs/review-rs5/wt 9efb8a8a`), run `npm ci` in it if you run Node tests, and run checks there, not in the cycle's worktree (another agent may be writing there). Remove it before you return, as the paragraph below gives.
- Your report path (its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/review-rs5-report.md`; its first line is `PASS 9efb8a8a` or `FAIL 9efb8a8a` (or `questions`).
- `cycle.md` and the other files of the record directory not named above are not yours to read.
- Settle each blocking finding's contradiction mark, and for the range's slices the slice it comes from, as `review-change` gives.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Passages of the frozen task

### lines 37-37

7. Rekord pętli: stan pętli zarobkowej liczy od jej startu ciąg kolejnych domkniętych przejść bez śmierci i najdłuższy taki ciąg. Śmierć pokryta wskrzeszeniem zaczyna ciąg od nowa, tak samo jak śmierć postaci bez wprawy, po której pętla też trwa (D-190), a zatrzymanie pętli kończy liczenie; liczba znika razem z pętlą. Wiersz postaci w raporcie „Gdy cię nie było” dostaje na końcu najdłuższy ciąg zwykłym tekstem, bez wyróżnienia i bez porównania z czymkolwiek (pytanie 7). Liczbę wiersz czyta z pętli przy każdym rysowaniu sekcji, jak wprawę do odebrania (D-246); przy zerze jej nie ma, a wiersz pętli zatrzymanej śmiercią jej nie niesie.

### lines 95-101

- Pytanie 7. Co liczy „rekord pętli” i jak stoi w raporcie „Gdy cię nie było”?
  - Answer: wariant a — ciąg w obrębie jednej pętli: najdłuższy ciąg kolejnych domkniętych przejść bez śmierci od startu tej pętli. Śmierć pokryta wskrzeszeniem zaczyna ciąg od nowa, a zatrzymanie pętli kończy liczenie. Wiersz postaci w raporcie dostaje na końcu tę liczbę zwykłym tekstem, bez wyróżnienia i bez porównania z czymkolwiek. Zmienia D-241 (stan pętli dostaje dwa liczniki) i D-246 (wiersz raportu). Koszt pokazany przy wyborze: zmiana kształtu zapisu, która przy odpowiedzi na pytanie 2 i tak następuje; liczba znika razem z pętlą; dwa liczniki i ich testy dla liczby, która z założenia nie jest celem.
  - Not chosen:
    - b — bez nowego stanu, liczba domkniętych przejść pętli: „dopóki żadnej śmierci nie pokryło wskrzeszenie, to ta sama liczba co w a; po takiej śmierci liczba rośnie dalej i przestaje być ciągiem bez śmierci, a dopisek „wskrzeszenie zużyte” znika z raportu po jego zamknięciu”
    - c — rekord trwały, najlepszy ciąg postaci na mapie: „więcej stanu i liczba do pobijania, która rośnie od samego czekania — przed tym ostrzega przytoczona krytyka”
    - d — rekord wspólny dla konta, na mapę: „Koszt jak c, a do tego miesza postacie o różnych wykupionych stopniach.”
  - Source: human, 2026-11-20 — przy pytaniu pokazanym jako 10: „do pozostałych nie mam uwag”, a na prośbę o potwierdzenie, że to przyjęcie rekomendacji (wśród nich „10 a”): „3. dobrze zrozumiałeś” (rozmowa doprecyzowania, tury 13 i 14; pytanie w brzmieniu tury 10).

### lines 157-158

- Raport z nieobecności składa `src/browser/view/away-report.ts` z wierszy typu `AwayReportLine`; pętla w stanie gry ma numer przejścia i liczbę domkniętych przejść (`src/browser/sim/types.ts`, typ `EarningLoop`, pola `runNumber` i `completed`), a ciągu przejść bez śmierci stan nie trzyma.
- Każda zmiana kształtu zapisu podnosi wersję zapisu (`src/browser/sim/saved-game.ts`, `SAVED_GAME_VERSION`, dziś 7; `guidelines/coding-saved-game.md`, reguła „Wersja podnoszona razem z kształtem”), a gra odrzuca wtedy dzisiejsze zapisy (D-206); definicja przyjmuje to dla całego projektu: „każda zmiana kształtu stanu w tym projekcie kasuje zapis”. Pamięć oceny (pytanie 2) i rekord pętli (pytanie 7) zmieniają kształt zapisu.

### lines 230-230

| 8 | Stan pętli zarobkowej trzyma bieżący ciąg domkniętych przejść bez śmierci i najdłuższy taki ciąg od jej startu; śmierć pokryta wskrzeszeniem zaczyna ciąg od nowa. | sentence of D-241 | Pytanie 7 (wybór Mariusza) | czy rekord liczyć z liczby domkniętych przejść, którą stan już ma, i co robi z nim pokryta śmierć |

### lines 235-235

| 13 | „Loop record” (rekord pętli) to najdłuższy ciąg domkniętych przejść bez śmierci od startu jednej pętli zarobkowej; znika razem z nią. | glossary term | Pytanie 7; przyjęty: jak wiersz 10 | czy „record” w D-246 czytać jako najlepszy wynik postaci pamiętany po zatrzymaniu pętli |


## The plan's sections for what you review (word for word)

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

## Notes of the orchestrator

- This is the review of slice 5 alone; it touches the trust boundary `src/browser/sim/saved-game.ts` (risk marked by the plan): attack the load of the earning loop's two new counts with crafted saved documents of the current version, built from a real save and changed at one place — non-integers, negatives, floats, huge numbers beyond safe integers, the current run above the longest, missing or foreign keys, `__proto__` keys, wrong types — and confirm each is refused whole as `shape` without a throw, and that the game's own saves load into the same state. Write your own probes in your directory and run them against the head.
- By the plan (choice 6) `tests/sim/saved-game.test.mjs` is not run and not changed in this slice: it stays red until slice 6 raises the version and gives its document the two new keys. Do not grade that. The executor added `stryker.config.json` (one line) beyond the slice's *Change*; `tests/quality/test_mutation_test_selection.py` requires it.
- Quotations: every `// decision:` comment line of the slice's test files must quote word for word, from the beginning of a sentence, a binding sentence (the check stops at the first field line of an entry; `Verification` lists are not binding): run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` at the head in your worktree and report each error that is in a file of the range; the remaining expected errors are the D-243 quotations of `tests/view/account-screen.test.mjs` and `tests/view/maps-screen.test.mjs` (owned by slices 10 and 12). The two lines of `tests/sim/loop.test.mjs` that quoted D-243's old first sentence were this slice's to shorten.
- Judge the counting against D-241 as the foundation step changed it (read D-241 whole, and D-190, D-221, D-240 for the deaths that leave the loop going), including: a completion adds one to the run and raises the longest; a death covered by the resurrection and the death of a character with no practice (the loop goes on) start the run anew; a stop ends the counting; the open game and the catch-up count alike. The executor ran four hand-made mutants; run your own mutation on the counting if you can.
- The orchestrator ran, at the head, the focused tests of earning-loop literals in other files: `tests/balance/campaign.test.mjs`, `tests/balance/loop.test.mjs`, `tests/view/{camp-picture,character-screen,chronicle,clock,headquarters-screen,team-lines}.test.mjs`, `tests/invariants/test_character_team.py`: all exit 0.
