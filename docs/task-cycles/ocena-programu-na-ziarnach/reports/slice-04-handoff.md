# Handoff — the executor of slice 4, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `93dd78b3`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 4 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-4/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-04-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- The foundation step has written the entries of the plan (commit `a65b8fa4`, on this branch): the decisions D-439 and D-440 are new, D-243, D-329, D-325, D-241, D-246 and D-22 are changed and D-190's rationale is corrected. D-251 is **withdrawn** (task 24): do not cite it as a decision you rest on.
- The seven quotations `decision: D-243` of the old first sentence of D-243 (in `tests/sim/loop.test.mjs:237` and `:304`, `tests/view/maps-screen.test.mjs:494` and `:700`, `tests/view/account-screen.test.mjs:2683`, `:2807` and `:2975`) no longer stand in D-243; the slice that changes the file shortens its quotation to a passage that stands in D-243 now (slice 5: loop.test.mjs; slice 10: maps-screen.test.mjs; slice 12: account-screen.test.mjs). Where your slice does not change the file, leave it.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- `foundations/decisions.md:11814-11839` D-439 (the plan's *Foundation entries* row 1, as the foundation step wrote it)
- `foundations/decisions.md:11840-11866` D-440 (the plan's *Foundation entries* row 2, as the foundation step wrote it)
- `foundations/decisions.md:3889-3933` D-206 (plan: 3889-3933)
- `foundations/decisions.md:4232-4248` D-386 (plan: 4232-4248)
- `foundations/decisions.md:659-703` D-213 (plan: 659-703)
- `foundations/decisions.md:8121-8137` D-165 (plan: 8111-8127)
- `foundations/decisions.md:6093-6118` D-56 (plan: 6083-6108)
- `foundations/decisions.md:825-843` D-425 (plan: 825-843)
- `foundations/invariants.md:1048-1057` save-version
- `foundations/invariants.md:226-235` simulation-inputs
- `foundations/part_map.md:33-64` simulation
- `guidelines/coding.md`
- `guidelines/coding-simulation-module.md`
- `guidelines/coding-saved-game.md`
- `guidelines/testing.md`
- `tests/sim/saved-game.test.mjs:1-120`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 36-36 (To do)

6. Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa: dwanaście wyników ziaren i to, co ocena wzięła ze skrzynki na wejście; przyczynę i minutę wiersza widać tylko zaraz po ocenie. Odznakę szczelności ma program, którego ostatnia ocena rozwiązała wszystkie dwanaście ziaren; stoi przy liście „Program:” tej postaci na tej mapie, a przy niższym wyniku stoi tam sama liczba „{n} z 12”. Gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie; gdy w skrzynce jest tego więcej, wynik stoi jak był. Zmiana reguł, grup albo planu wyprawy programu kasuje zapamiętaną ocenę, a następna ocena ją zastępuje; limitu czasu nie ma (pytanie 2). Przy liście „Program:” stoi zapamiętany wynik programu, który lista pokazuje, i zmienia się razem z wyborem; inne programy listy nie mają znaku. Gdy ocena 12 z 12 straciła zapas, stoi tam „12 z 12” z dopiskiem, bez odznaki. Odznaka i liczba stoją tylko w „Kto idzie”, nie na innych ekranach. Kasuje zapisanie programu, po którym jego reguły, grupy (z ich kolejnością) albo plan wyprawy są inne; zmiana nazwy niczego nie kasuje. Usunięcie programu usuwa jego zapamiętane oceny, a wczytanie zapisu odrzuca cały zapis, gdy zapamiętana ocena nazywa postać, program albo mapę, których gra nie dała (D-165, D-206). Zmiana pułapu albo danych mapy zapamiętanych ocen nie kasuje. Śmierć postaci, która zabiera jej wprawę i wykupione stopnie, bo żadne wskrzeszenie nie jest gotowe (D-190), w przejściu ręcznym albo w pętli, kasuje wszystkie zapamiętane oceny tej postaci, na każdej mapie (pytanie 15); śmierć pokryta wskrzeszeniem i wykupienie stopnia ocen nie kasują. Cykl sprawdza, ile miejsca zajmują zapamiętane oceny w zapisie z wieloma postaciami, programami i mapami, wobec limitu zapisu 64 KiB.

### lines 63-71 (Questions to settle)

- Pytanie 2. Co gra pamięta z oceny i kiedy daje odznakę szczelności — przy jakim wyniku na dwunastu ziarnach, przy czym odznaka stoi i co ją kasuje?
  - Answer: wariant a, z dopytaniem o zmianę skrzynki rozstrzygniętym wariantem b. Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa (wiersz w „Kto idzie” to taka trójka) jako dwanaście wyników ziaren, razem z tym, co ocena wzięła ze skrzynki; przyczynę, minuty i resztę wiersza widać tylko zaraz po ocenie. Odznakę ma program, którego ostatnia ocena rozwiązała wszystkie dwanaście ziaren; stoi przy liście „Program:” tej postaci na tej mapie, a przy niższym wyniku stoi tam sama liczba „{n} z 12”. Zmiana reguł, grup albo planu wyprawy programu kasuje zapamiętaną ocenę. Gdy w skrzynce jest więcej tego, co ocena wzięła, wynik stoi; gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie. Limitu czasu nie ma: następna ocena nadpisuje wynik. Koszt pokazany przy wyborze: dzisiejsze zapisy przepadają przy wdrożeniu (definicja przyjmuje to dla całego projektu); zapamiętany wynik starzeje się po cichu, gdy postać wykupi stopień; jeden dodatkowy stan wyniku na ekranie (dopisek o zapasie); dla zadania 3 karta mapy ma zapamiętany wynik każdej ocenionej postaci i programu.
  - Not chosen:
    - b — gra pamięta ocenę pary program i mapa, bez postaci: „mniej stanu, ale odznaka przy jednej postaci może pochodzić z oceny inną postacią, z innymi wykupionymi stopniami”
    - c — odznaka już od 11 z 12: „odznakę ma program, który na jednym z dwunastu ziaren mapy nie rozwiązuje; pętla losuje kolejne ziarna, więc na podobne trafi; liczbę 11 propozycja sama oznacza jako zgadywaną”
    - d — gra niczego nie pamięta: „gra nie wie, który program był oceniany, więc […] nie ma ani ostrzeżenia „program bez oceny”, ani pamięci, że program już przeszedł, i po każdym powrocie na kartę ocenia się od nowa; karta mapy w zadaniu 3 nie ma zapamiętanego wyniku do pokazania”
    - dopytanie, a — wynik znika, gdy skrzynka nie da już tego, co ocena wzięła: „tracisz informację, jak program radził sobie z tamtym zapasem”
    - pomysł Mariusza z dopytania — trzymać zapisaną konfigurację „x czasu”: nieprzyjęty, bo następna ocena i tak nadpisuje wynik, a zmiana programu go kasuje (pytanie zamykające prowadzącego projekt, wariant b: „Bez limitu czasu”)
  - Source: human, 2026-11-20, „3. niech będzie a - tu rozumiem to będzie po prostu służyć jako cache, żeby nie przeliczać wszystkiego jeśli mamy już wartości policzone, czy czemuś innemu to miałoby służyć?” (pytanie pokazane jako 3, rozmowa doprecyzowania, tura 7); na dopytanie o zmianę skrzynki: „3. jeśli w skrzynce będzie więcej tego co już tam było wymagane to czemu miałaby znikać / ale jeśli nagle ze skrzynki zniknie wszystko, to chyba tak, niech znika / chyba, że zapisywać daną konfigurację do odczytania i trzymać x czasu a nóż się przyda, nie wiem” (tura 11); na pytanie zamykające: „2b” (tura 12).

### lines 158-159 (Context)

- Każda zmiana kształtu zapisu podnosi wersję zapisu (`src/browser/sim/saved-game.ts`, `SAVED_GAME_VERSION`, dziś 7; `guidelines/coding-saved-game.md`, reguła „Wersja podnoszona razem z kształtem”), a gra odrzuca wtedy dzisiejsze zapisy (D-206); definicja przyjmuje to dla całego projektu: „każda zmiana kształtu stanu w tym projekcie kasuje zapis”. Pamięć oceny (pytanie 2) i rekord pętli (pytanie 7) zmieniają kształt zapisu.
- Zapis gry mieści się w 64 KiB (`src/server/account-routes.ts`, `savedGameLimit`).

### lines 226-226 (Settlements to record)

| 4 | Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa — dwanaście wyników i to, co ocena wzięła; przy liście „Program:” stoi „szczelny: 12 z 12” w `positive`, gdy ostatnia ocena rozwiązała wszystkie dwanaście ziaren, a inaczej „{n} z 12” w `text`; gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie; zmiana reguł, grup albo planu wyprawy programu kasuje ocenę, a śmierć, która zabiera postaci wprawę i wykupione stopnie, kasuje wszystkie oceny tej postaci, na każdej mapie. | decision | Pytanie 2; Pytanie 15; Pytanie 8 (wybory Mariusza) | co trafia do zapisu, od ilu ziaren jest odznaka, czy zmiana skrzynki gasi odznakę albo kasuje wynik, czy odznaka zostaje przy postaci, która straciła wprawę, i jak brzmią napisy przy programie |

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

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

## Notes of the orchestrator for this slice

- Slice 3 is made (commit `93dd78b3`): `src/browser/sim/judging.ts` exports `judgeOnSeeds(state, { mapId, characterId, programId })` returning `Judging = { results: SeedResult[]; equipment: TripEntry[] }`; `SeedResult` is `{ kind: "solved" } | { kind: "death"; cause: DeathCause; minute: number } | { kind: "undecided" }`; the cap and seeds are `BALANCE.judgingCapMinutes` and `BALANCE.judgingSeeds` in `src/browser/sim/data/balance.ts`. Read them where they stand.
- What the game remembers is given by D-440 (current range above) — the shape of the remembered judging is yours to choose within it: per the plan a seed keeps its kind only (solved, death or undecided; no cause, no minute) and the clipped take list. Name the new type in `types.ts` and where `GameState` holds the remembered judgings.
- A new test file under `tests/sim/` has to be listed in `stryker.config.json` (the check `tests/quality/test_mutation_test_selection.py` fails otherwise; slice 3 met it): list yours there, and say in the report that the file is an addition to your slice's *Change*.
- Trust boundary: this slice changes `src/browser/sim/saved-game.ts`. The load takes the document from the server: every crafted form must be refused whole as `shape` without a throw, and the game's own saves must load. Write the crafted-document cases first and run them red. A reviewer will attack the load with hostile documents (wrong types, non-integers, huge numbers, `__proto__` keys, duplicate or foreign keys, names of characters, programs or maps the state lacks, items the data lacks, counts that are not safe integers from 1).
- `tests/sim/saved-game.test.mjs` is NOT run and NOT changed here (plan, choice 6): until slice 6 raises the version, it fails or is refused as of another shape; do not "fix" it.

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
