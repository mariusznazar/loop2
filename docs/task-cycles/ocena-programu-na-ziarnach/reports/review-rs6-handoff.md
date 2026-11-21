# Handoff — review `rs6`, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Questions go to the orchestrator, never to the human.

## What is reviewed

- Worktree: `.` (branch `task/ocena-programu-na-ziarnach`); you are read-only there and make no commit. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`). Read it whole, and a file it names only when the step or variant that names the file comes.
- Review: a group of the cycle's slices, in the plan's order — slice(s) 6. **Range to review: `3218a620..7fc40efc`** (base exclusive, head inclusive; head `7fc40efc`). Check the head with `git rev-parse` first; on a mismatch ask the orchestrator which range to review.
- The change is a member of a plan; the plan's sections for what you review are copied below word for word, and the passages of the frozen task that those sections' *Read* name (the frozen task is `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; open it if a passage points you to more). You judge the work against those passages and the foundation entries the sections name, not against the plan's wording.
- Two answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; check crafted input at that boundary wherever the range touches it (say so in the report if the range does not). Irreversible operation **no**: confirm that the change only prepares what it prepares.
- Executors' and writer's reports (each in `.runs/task-cycles/ocena-programu-na-ziarnach/reports/`): `slice-06-executor-report.md`. Read each; they hold the own-work checks, reaches, concerns and unread material. A check an author reports is evidence of what the author ran, never of the result.
- Mechanical checks the orchestrator ran: clean worktree, non-empty range, changed files equal the slices' *Change*. Any mismatch is given below under notes.
- No agent of the cycle runs the product's full gate; **you do not run `npm test` without a file argument or the whole `tests/`**. Run the focused checks of the slices you review, and probes of your own, from a worktree of the head commit in your own directory.
- Your directory for working copies: `.runs/review-rs6/` (directly under the ignored `.runs/` of the worktree) — make a detached worktree of `7fc40efc` there (`git worktree add --detach .runs/review-rs6/wt 7fc40efc`), run `npm ci` in it if you run Node tests, and run checks there, not in the cycle's worktree (another agent may be writing there). Remove it before you return, as the paragraph below gives.
- Your report path (its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/review-rs6-report.md`; its first line is `PASS 7fc40efc` or `FAIL 7fc40efc` (or `questions`).
- `cycle.md` and the other files of the record directory not named above are not yours to read.
- Settle each blocking finding's contradiction mark, and for the range's slices the slice it comes from, as `review-change` gives.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Passages of the frozen task

### lines 36-37

6. Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa: dwanaście wyników ziaren i to, co ocena wzięła ze skrzynki na wejście; przyczynę i minutę wiersza widać tylko zaraz po ocenie. Odznakę szczelności ma program, którego ostatnia ocena rozwiązała wszystkie dwanaście ziaren; stoi przy liście „Program:” tej postaci na tej mapie, a przy niższym wyniku stoi tam sama liczba „{n} z 12”. Gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie; gdy w skrzynce jest tego więcej, wynik stoi jak był. Zmiana reguł, grup albo planu wyprawy programu kasuje zapamiętaną ocenę, a następna ocena ją zastępuje; limitu czasu nie ma (pytanie 2). Przy liście „Program:” stoi zapamiętany wynik programu, który lista pokazuje, i zmienia się razem z wyborem; inne programy listy nie mają znaku. Gdy ocena 12 z 12 straciła zapas, stoi tam „12 z 12” z dopiskiem, bez odznaki. Odznaka i liczba stoją tylko w „Kto idzie”, nie na innych ekranach. Kasuje zapisanie programu, po którym jego reguły, grupy (z ich kolejnością) albo plan wyprawy są inne; zmiana nazwy niczego nie kasuje. Usunięcie programu usuwa jego zapamiętane oceny, a wczytanie zapisu odrzuca cały zapis, gdy zapamiętana ocena nazywa postać, program albo mapę, których gra nie dała (D-165, D-206). Zmiana pułapu albo danych mapy zapamiętanych ocen nie kasuje. Śmierć postaci, która zabiera jej wprawę i wykupione stopnie, bo żadne wskrzeszenie nie jest gotowe (D-190), w przejściu ręcznym albo w pętli, kasuje wszystkie zapamiętane oceny tej postaci, na każdej mapie (pytanie 15); śmierć pokryta wskrzeszeniem i wykupienie stopnia ocen nie kasują. Cykl sprawdza, ile miejsca zajmują zapamiętane oceny w zapisie z wieloma postaciami, programami i mapami, wobec limitu zapisu 64 KiB.
7. Rekord pętli: stan pętli zarobkowej liczy od jej startu ciąg kolejnych domkniętych przejść bez śmierci i najdłuższy taki ciąg. Śmierć pokryta wskrzeszeniem zaczyna ciąg od nowa, tak samo jak śmierć postaci bez wprawy, po której pętla też trwa (D-190), a zatrzymanie pętli kończy liczenie; liczba znika razem z pętlą. Wiersz postaci w raporcie „Gdy cię nie było” dostaje na końcu najdłuższy ciąg zwykłym tekstem, bez wyróżnienia i bez porównania z czymkolwiek (pytanie 7). Liczbę wiersz czyta z pętli przy każdym rysowaniu sekcji, jak wprawę do odebrania (D-246); przy zerze jej nie ma, a wiersz pętli zatrzymanej śmiercią jej nie niesie.

### lines 158-159

- Każda zmiana kształtu zapisu podnosi wersję zapisu (`src/browser/sim/saved-game.ts`, `SAVED_GAME_VERSION`, dziś 7; `guidelines/coding-saved-game.md`, reguła „Wersja podnoszona razem z kształtem”), a gra odrzuca wtedy dzisiejsze zapisy (D-206); definicja przyjmuje to dla całego projektu: „każda zmiana kształtu stanu w tym projekcie kasuje zapis”. Pamięć oceny (pytanie 2) i rekord pętli (pytanie 7) zmieniają kształt zapisu.
- Zapis gry mieści się w 64 KiB (`src/server/account-routes.ts`, `savedGameLimit`).

### lines 226-226

| 4 | Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa — dwanaście wyników i to, co ocena wzięła; przy liście „Program:” stoi „szczelny: 12 z 12” w `positive`, gdy ostatnia ocena rozwiązała wszystkie dwanaście ziaren, a inaczej „{n} z 12” w `text`; gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie; zmiana reguł, grup albo planu wyprawy programu kasuje ocenę, a śmierć, która zabiera postaci wprawę i wykupione stopnie, kasuje wszystkie oceny tej postaci, na każdej mapie. | decision | Pytanie 2; Pytanie 15; Pytanie 8 (wybory Mariusza) | co trafia do zapisu, od ilu ziaren jest odznaka, czy zmiana skrzynki gasi odznakę albo kasuje wynik, czy odznaka zostaje przy postaci, która straciła wprawę, i jak brzmią napisy przy programie |

### lines 230-230

| 8 | Stan pętli zarobkowej trzyma bieżący ciąg domkniętych przejść bez śmierci i najdłuższy taki ciąg od jej startu; śmierć pokryta wskrzeszeniem zaczyna ciąg od nowa. | sentence of D-241 | Pytanie 7 (wybór Mariusza) | czy rekord liczyć z liczby domkniętych przejść, którą stan już ma, i co robi z nim pokryta śmierć |


## The plan's sections for what you review (word for word)

### Slice 6 — the saved document of the new version, and the room the judgings take

- **Goal:** `SAVED_GAME_VERSION` rises by one, once, for both changes of the shape (Slices 4 and
  5), together with the document of `tests/sim/saved-game.test.mjs`
  (`guidelines/coding-saved-game.md`, "Wersja podnoszona razem z kształtem"): the document of the
  current version is rewritten in the new shape and fills each new branch — remembered judgings of
  more than one character, program and map, with a take list and each kind of result, and an
  earning loop whose two counts stand above 0 with the run below the longest — and loads into the
  game state it describes; the document of the version before is kept and refused as another
  version, as the documents before it are; the cases of the trust boundary that file holds
  (`guidelines/testing.md`, "Trust boundaries", the row of `src/browser/sim/saved-game.ts`) reach
  the new places through the document, and a crafted remembered judging and crafted counts are
  refused whole as `shape`. Then the room: with a script in the directory for working copies the
  handoff names (removed before return), measure the length of the saved document of a game state
  with remembered judgings for every triple of 5 characters, 20 programs and 3 maps, and of 5, 20
  and 10 maps, against the limit of 64 KiB (65 536, D-104, D-207); write in the report the bytes of
  one remembered judging, the totals and the share of the limit, for the request. The measure changes
  no code; where it shows the limit within reach, the report says so as a finding.
- **Change:** `src/browser/sim/saved-game.ts` · `tests/sim/saved-game.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:36-37` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:158-159` Context ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:226-226` Settlements to record ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:230-230` Settlements to record ·
  Foundation entries row 2 · Foundation entries row 6 · `foundations/decisions.md:3889-3933` D-206
  · `foundations/decisions.md:659-703` D-213 · `foundations/decisions.md:4232-4248` D-386 ·
  `foundations/decisions.md:3934-4013` D-207 · `foundations/decisions.md:2707-2729` D-104 ·
  `foundations/invariants.md:1048-1057` save-version · `guidelines/coding.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md` · `src/browser/sim/types.ts`
- **Model:** cheaper
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/saved-game.test.mjs` · `npm test -- tests/sim/previous-programs.test.mjs`
  · `npm test -- tests/sim/saved-game-judgings.test.mjs` ·
  `npm test -- tests/sim/loop-record.test.mjs` · the measuring script, by its command in the report.
- **Depends on:** Slice 4 · Slice 5

## Notes of the orchestrator

- This is the review of slice 6 alone (risk: trust boundary `src/browser/sim/saved-game.ts`): the version rises from 8 to 9 once, for the two changes of shape of slices 4 and 5, together with the rewritten document of `tests/sim/saved-game.test.mjs` (`guidelines/coding-saved-game.md`, "Wersja podnoszona razem z kształtem"). Check that the three stand together: the version constant, the document of version 9 filling each new branch (remembered judgings for more than one character, program and map, with a take list and every kind of result; an earning loop with the two counts above 0 and the run below the longest), the document of version 8 kept and refused as of another version, and the crafted documents of the cases of the trust boundary reaching the new places through the document (`guidelines/testing.md`, "Trust boundaries", the row for `saved-game.ts`). Attack the load with crafted documents of version 9 yourself (probes in your directory): wrong types, non-integers, negatives, huge numbers, run above the longest, missing/foreign keys, `__proto__`, unknown character/program/map names, 12-vs-other result counts — each must be refused whole as `shape` without a throw, and the game's own saves must load.
- The executor edited one file outside the slice's *Change*: `tests/sim/previous-programs.test.mjs` (a precondition failed after the raise; a document of version 9 added there). Judge that edit.
- The measurement of room (64 KiB, `savedGameLimit` in `src/server/account-routes.ts`): the script `reports/slice-06-measure.mjs` and the report's figures (212–297 bytes per remembered judging; 300 judgings = 107.6% of the limit with empty programs, 128% with programs of 10 rules; the 10-map case measured on synthetic map keys since the data has 3 maps). Re-run it or an independent probe and say whether the figures are right; the finding that the limit is within reach is a finding for the human at the request, not a defect of this slice — but say if the measurement is wrong or misleading.
- Quotations: run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` at the head: expected errors are only the five D-243 quotations of `tests/view/account-screen.test.mjs` and `tests/view/maps-screen.test.mjs`; any error in a file of the range is a finding.
