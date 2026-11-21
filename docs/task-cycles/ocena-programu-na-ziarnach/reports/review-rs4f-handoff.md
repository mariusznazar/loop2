# Handoff — review `rs4f`, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Questions go to the orchestrator, never to the human.

## What is reviewed

- Worktree: `.` (branch `task/ocena-programu-na-ziarnach`); you are read-only there and make no commit. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`). Read it whole, and a file it names only when the step or variant that names the file comes.
- Review: a group of the cycle's slices, in the plan's order — slice(s) 4. **Range to review: `23e0fa01..f93df2f6`** (base exclusive, head inclusive; head `f93df2f6`). Check the head with `git rev-parse` first; on a mismatch ask the orchestrator which range to review.
- The change is a member of a plan; the plan's sections for what you review are copied below word for word, and the passages of the frozen task that those sections' *Read* name (the frozen task is `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; open it if a passage points you to more). You judge the work against those passages and the foundation entries the sections name, not against the plan's wording.
- Two answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; check crafted input at that boundary wherever the range touches it (say so in the report if the range does not). Irreversible operation **no**: confirm that the change only prepares what it prepares.
- Executors' and writer's reports (each in `.runs/task-cycles/ocena-programu-na-ziarnach/reports/`): `repair-q-executor-report.md`, `rs4-findings.md`. Read each; they hold the own-work checks, reaches, concerns and unread material. A check an author reports is evidence of what the author ran, never of the result.
- Mechanical checks the orchestrator ran: clean worktree, non-empty range, changed files equal the slices' *Change*. Any mismatch is given below under notes.
- No agent of the cycle runs the product's full gate; **you do not run `npm test` without a file argument or the whole `tests/`**. Run the focused checks of the slices you review, and probes of your own, from a worktree of the head commit in your own directory.
- Your directory for working copies: `.runs/review-rs4f/` (directly under the ignored `.runs/` of the worktree) — make a detached worktree of `f93df2f6` there (`git worktree add --detach .runs/review-rs4f/wt f93df2f6`), run `npm ci` in it if you run Node tests, and run checks there, not in the cycle's worktree (another agent may be writing there). Remove it before you return, as the paragraph below gives.
- Your report path (its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/review-rs4f-report.md`; its first line is `PASS f93df2f6` or `FAIL f93df2f6` (or `questions`).
- `cycle.md` and the other files of the record directory not named above are not yours to read.
- Settle each blocking finding's contradiction mark, and for the range's slices the slice it comes from, as `review-change` gives.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Passages of the frozen task

### lines 36-36

6. Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa: dwanaście wyników ziaren i to, co ocena wzięła ze skrzynki na wejście; przyczynę i minutę wiersza widać tylko zaraz po ocenie. Odznakę szczelności ma program, którego ostatnia ocena rozwiązała wszystkie dwanaście ziaren; stoi przy liście „Program:” tej postaci na tej mapie, a przy niższym wyniku stoi tam sama liczba „{n} z 12”. Gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie; gdy w skrzynce jest tego więcej, wynik stoi jak był. Zmiana reguł, grup albo planu wyprawy programu kasuje zapamiętaną ocenę, a następna ocena ją zastępuje; limitu czasu nie ma (pytanie 2). Przy liście „Program:” stoi zapamiętany wynik programu, który lista pokazuje, i zmienia się razem z wyborem; inne programy listy nie mają znaku. Gdy ocena 12 z 12 straciła zapas, stoi tam „12 z 12” z dopiskiem, bez odznaki. Odznaka i liczba stoją tylko w „Kto idzie”, nie na innych ekranach. Kasuje zapisanie programu, po którym jego reguły, grupy (z ich kolejnością) albo plan wyprawy są inne; zmiana nazwy niczego nie kasuje. Usunięcie programu usuwa jego zapamiętane oceny, a wczytanie zapisu odrzuca cały zapis, gdy zapamiętana ocena nazywa postać, program albo mapę, których gra nie dała (D-165, D-206). Zmiana pułapu albo danych mapy zapamiętanych ocen nie kasuje. Śmierć postaci, która zabiera jej wprawę i wykupione stopnie, bo żadne wskrzeszenie nie jest gotowe (D-190), w przejściu ręcznym albo w pętli, kasuje wszystkie zapamiętane oceny tej postaci, na każdej mapie (pytanie 15); śmierć pokryta wskrzeszeniem i wykupienie stopnia ocen nie kasują. Cykl sprawdza, ile miejsca zajmują zapamiętane oceny w zapisie z wieloma postaciami, programami i mapami, wobec limitu zapisu 64 KiB.

### lines 63-71

- Pytanie 2. Co gra pamięta z oceny i kiedy daje odznakę szczelności — przy jakim wyniku na dwunastu ziarnach, przy czym odznaka stoi i co ją kasuje?
  - Answer: wariant a, z dopytaniem o zmianę skrzynki rozstrzygniętym wariantem b. Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa (wiersz w „Kto idzie” to taka trójka) jako dwanaście wyników ziaren, razem z tym, co ocena wzięła ze skrzynki; przyczynę, minuty i resztę wiersza widać tylko zaraz po ocenie. Odznakę ma program, którego ostatnia ocena rozwiązała wszystkie dwanaście ziaren; stoi przy liście „Program:” tej postaci na tej mapie, a przy niższym wyniku stoi tam sama liczba „{n} z 12”. Zmiana reguł, grup albo planu wyprawy programu kasuje zapamiętaną ocenę. Gdy w skrzynce jest więcej tego, co ocena wzięła, wynik stoi; gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie. Limitu czasu nie ma: następna ocena nadpisuje wynik. Koszt pokazany przy wyborze: dzisiejsze zapisy przepadają przy wdrożeniu (definicja przyjmuje to dla całego projektu); zapamiętany wynik starzeje się po cichu, gdy postać wykupi stopień; jeden dodatkowy stan wyniku na ekranie (dopisek o zapasie); dla zadania 3 karta mapy ma zapamiętany wynik każdej ocenionej postaci i programu.
  - Not chosen:
    - b — gra pamięta ocenę pary program i mapa, bez postaci: „mniej stanu, ale odznaka przy jednej postaci może pochodzić z oceny inną postacią, z innymi wykupionymi stopniami”
    - c — odznaka już od 11 z 12: „odznakę ma program, który na jednym z dwunastu ziaren mapy nie rozwiązuje; pętla losuje kolejne ziarna, więc na podobne trafi; liczbę 11 propozycja sama oznacza jako zgadywaną”
    - d — gra niczego nie pamięta: „gra nie wie, który program był oceniany, więc […] nie ma ani ostrzeżenia „program bez oceny”, ani pamięci, że program już przeszedł, i po każdym powrocie na kartę ocenia się od nowa; karta mapy w zadaniu 3 nie ma zapamiętanego wyniku do pokazania”
    - dopytanie, a — wynik znika, gdy skrzynka nie da już tego, co ocena wzięła: „tracisz informację, jak program radził sobie z tamtym zapasem”
    - pomysł Mariusza z dopytania — trzymać zapisaną konfigurację „x czasu”: nieprzyjęty, bo następna ocena i tak nadpisuje wynik, a zmiana programu go kasuje (pytanie zamykające prowadzącego projekt, wariant b: „Bez limitu czasu”)
  - Source: human, 2026-11-20, „3. niech będzie a - tu rozumiem to będzie po prostu służyć jako cache, żeby nie przeliczać wszystkiego jeśli mamy już wartości policzone, czy czemuś innemu to miałoby służyć?” (pytanie pokazane jako 3, rozmowa doprecyzowania, tura 7); na dopytanie o zmianę skrzynki: „3. jeśli w skrzynce będzie więcej tego co już tam było wymagane to czemu miałaby znikać / ale jeśli nagle ze skrzynki zniknie wszystko, to chyba tak, niech znika / chyba, że zapisywać daną konfigurację do odczytania i trzymać x czasu a nóż się przyda, nie wiem” (tura 11); na pytanie zamykające: „2b” (tura 12).

### lines 158-159

- Każda zmiana kształtu zapisu podnosi wersję zapisu (`src/browser/sim/saved-game.ts`, `SAVED_GAME_VERSION`, dziś 7; `guidelines/coding-saved-game.md`, reguła „Wersja podnoszona razem z kształtem”), a gra odrzuca wtedy dzisiejsze zapisy (D-206); definicja przyjmuje to dla całego projektu: „każda zmiana kształtu stanu w tym projekcie kasuje zapis”. Pamięć oceny (pytanie 2) i rekord pętli (pytanie 7) zmieniają kształt zapisu.
- Zapis gry mieści się w 64 KiB (`src/server/account-routes.ts`, `savedGameLimit`).

### lines 226-226

| 4 | Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa — dwanaście wyników i to, co ocena wzięła; przy liście „Program:” stoi „szczelny: 12 z 12” w `positive`, gdy ostatnia ocena rozwiązała wszystkie dwanaście ziaren, a inaczej „{n} z 12” w `text`; gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie; zmiana reguł, grup albo planu wyprawy programu kasuje ocenę, a śmierć, która zabiera postaci wprawę i wykupione stopnie, kasuje wszystkie oceny tej postaci, na każdej mapie. | decision | Pytanie 2; Pytanie 15; Pytanie 8 (wybory Mariusza) | co trafia do zapisu, od ilu ziaren jest odznaka, czy zmiana skrzynki gasi odznakę albo kasuje wynik, czy odznaka zostaje przy postaci, która straciła wprawę, i jak brzmią napisy przy programie |


## The plan's sections for what you review (word for word)

### Slice 4 — the game state holds the remembered judgings and the save carries them

- **Goal:** `GameState` holds the last judging of each triple of a character, a program and a map,
  as the decision of Foundation entries row 2 gives: the twelve results of the seeds, each solved, a
  death or undecided, with no cause and no minute, and what the judging took from the chest on
  entry; a new game holds none (`newGame` in `game.ts`, the only change there). The save writes them
  and the load reads them strictly (`guidelines/coding-saved-game.md`): it refuses as `shape` a
  remembered judging that names a character, a program or a map the game state or the data does
  not hold (D-56, D-165, D-206), holds other than twelve results or a result of another kind, an
  item the data lacks or a count that is no safe integer from 1, a missing or foreign key, and
  throws for no value a document can hold. The cap of the data and the map's data are not compared:
  their change erases no remembered judging (task, *To do* 6). The version is not raised here:
  Slice 6 raises it together with the document of `tests/sim/saved-game.test.mjs`, which until then
  is refused as of another shape (`guidelines/coding-saved-game.md`, "Wersja podnoszona razem z
  kształtem"); that file is not run here. The failing tests come first, in a new file
  `tests/sim/saved-game-judgings.test.mjs`: a game state with remembered judgings goes through the
  save and the load whole, and crafted documents of the current version, built from such a save and
  changed at one place, are refused whole as `shape` without a throw. `game.ts` takes one line; the
  rest stands in `saved-game.ts` (D-425 excepts that file whole).
- **Change:** `src/browser/sim/types.ts` · `src/browser/sim/game.ts` ·
  `src/browser/sim/saved-game.ts` · `tests/sim/saved-game-judgings.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:36-36` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:63-71` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:158-159` Context ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:226-226` Settlements to record ·
  Foundation entries row 1 · Foundation entries row 2 · `foundations/decisions.md:3889-3933` D-206
  · `foundations/decisions.md:4232-4248` D-386 · `foundations/decisions.md:659-703` D-213 ·
  `foundations/decisions.md:8111-8127` D-165 · `foundations/decisions.md:6083-6108` D-56 ·
  `foundations/decisions.md:825-843` D-425 · `foundations/invariants.md:1048-1057` save-version ·
  `foundations/invariants.md:226-235` simulation-inputs · `foundations/part_map.md:33-64`
  simulation · `guidelines/coding.md` · `guidelines/coding-simulation-module.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md` ·
  `tests/sim/saved-game.test.mjs:1-120`
- **Model:** same — the strict load at a trust boundary must refuse every crafted form of the new
  record and admit every one the game makes (D-386).
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`
- **Checks:** `npm test -- tests/sim/saved-game-judgings.test.mjs` (written first, failing) ·
  `npm test -- tests/sim/judging.test.mjs` · `npm test -- tests/sim/previous-programs.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_inputs.py`
- **Depends on:** Slice 3 · Foundation entries row 2

## Notes of the orchestrator

- This is the review of the one fix of review `rs4`'s blocking finding: the findings file is `reports/rs4-findings.md` (the reviewer's words: Important I-1, eight `decision:` quotations of `tests/sim/saved-game-judgings.test.mjs` failing the foundation check). The fix is the commit `f93df2f6` alone (range `23e0fa01..f93df2f6`); it was made by an agent dispatched before the findings file existed, with a handoff for the same lines, and it also repairs six quotations of `tests/sim/judging.test.mjs` (slice 3) that review `rs4` listed as out of scope. Its report: `repair-q-executor-report.md`.
- Check: (1) that the eight quotations of I-1 now stand and each still belongs to the case it marks (the decision's sentence is what the case checks, not a sentence picked only to pass); (2) that no line other than comment lines `// decision:` changed — no assertion, expected value, test title or code; (3) `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` in your worktree shows no error for these two files, and the remaining errors are exactly the seven quotations of D-243's old first sentence (owned by slices 5, 10, 12); (4) the two test files pass (`npm test -- tests/sim/judging.test.mjs`, `npm test -- tests/sim/saved-game-judgings.test.mjs`). A new Critical or Important finding in the fix counts as one that remains. Minor findings of review `rs4` (M-1, M-2) are not part of this fix and are not yours to re-grade.
