# Handoff — the executor of slice 4, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `7b1779fd`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 4 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-4/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-c1-04-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- Quotations of decisions in tests: every comment line `// decision: D-n "…"` of a test you write or change must quote, word for word and from the beginning of a sentence, text that stands in a binding sentence of that decision as it stands now (`foundations/decisions.md`; a quotation is no paraphrase). Run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after your change and your files must show no error; errors in files you did not change are not yours . Slices 3 and 4 shipped such errors; do not repeat it.
- This is the work of **correction 1** of the open request (the human's remarks, `reports/correction-1-remarks.md`, answered by the reviewed spec `spec.md`; the plan's slices are yours; the first run's plan no longer binds). The foundation step of the correction writes the plan's *Foundation entries* before slice 1: read what it wrote where your *Read* names it. A test that quotes a decision by a comment line `decision:` quotes it word for word from the beginning of a sentence of a binding sentence of the entry as it stands (the foundation check stops at the first field line of an entry); where a decision's sentence the correction changed was quoted by a test your slice changes, the quotation follows the new wording.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- the plan's *Foundation entries* row 1, as the foundation step wrote it — find it in `foundations/` by its heading: (new) — Where does the game keep the last judging of each character, program and map? (the judgings remembered in the browser's lasting storage, one entry per triple under the account and the game; the kinds of the twelve results, the equipment, the program's content revision and the character's gen
- the plan's *Foundation entries* row 2, as the foundation step wrote it — find it in `foundations/` by its heading: The content revision of a program (0 when a program is made — created, saved from a copy as new, pulled from a previous save, the first program of a new game — and one higher at each save after which its rules, rule groups with their order or trip plan differ, never at a rename); the foundation step
- the plan's *Foundation entries* row 3, as the foundation step wrote it — find it in `foundations/` by its heading: D-440 — What does the game remember of a judging, and what stands beside the list „Program:”?
- the plan's *Foundation entries* row 6, as the foundation step wrote it — find it in `foundations/` by its heading: D-165 — How does the game state tell one program from another? (the judging the browser remembers names its program by its number; and the content revision, if the foundation step places it here)
- `foundations/decisions.md:11866-11892` D-439 (plan: 11809-11834)
- `foundations/decisions.md:6243-6275` D-190 (plan: 6218-6249)
- `foundations/decisions.md:6359-6380` D-218 (plan: 6334-6354)
- `foundations/decisions.md:9164-9178` D-409 (plan: 9115-9128)
- `foundations/invariants.md:226-234` simulation-inputs
- `foundations/invariants.md:214-224` simulation-isolation
- `foundations/glossary.md:308-313` judging (plan: 308-312)
- `foundations/glossary.md:217-222` generation number (plan: 217-221)
- `foundations/part_map.md:33-64` simulation
- `guidelines/coding.md`
- `guidelines/coding-simulation-module.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`
- `src/browser/sim/types.ts`
- `src/browser/sim/game.ts:640-724`
- `src/browser/sim/loop.ts:295-411`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 36-36 (To do)

6. Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa: dwanaście wyników ziaren i to, co ocena wzięła ze skrzynki na wejście; przyczynę i minutę wiersza widać tylko zaraz po ocenie. Odznakę szczelności ma program, którego ostatnia ocena rozwiązała wszystkie dwanaście ziaren; stoi przy liście „Program:” tej postaci na tej mapie, a przy niższym wyniku stoi tam sama liczba „{n} z 12”. Gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie; gdy w skrzynce jest tego więcej, wynik stoi jak był. Zmiana reguł, grup albo planu wyprawy programu kasuje zapamiętaną ocenę, a następna ocena ją zastępuje; limitu czasu nie ma (pytanie 2). Przy liście „Program:” stoi zapamiętany wynik programu, który lista pokazuje, i zmienia się razem z wyborem; inne programy listy nie mają znaku. Gdy ocena 12 z 12 straciła zapas, stoi tam „12 z 12” z dopiskiem, bez odznaki. Odznaka i liczba stoją tylko w „Kto idzie”, nie na innych ekranach. Kasuje zapisanie programu, po którym jego reguły, grupy (z ich kolejnością) albo plan wyprawy są inne; zmiana nazwy niczego nie kasuje. Usunięcie programu usuwa jego zapamiętane oceny, a wczytanie zapisu odrzuca cały zapis, gdy zapamiętana ocena nazywa postać, program albo mapę, których gra nie dała (D-165, D-206). Zmiana pułapu albo danych mapy zapamiętanych ocen nie kasuje. Śmierć postaci, która zabiera jej wprawę i wykupione stopnie, bo żadne wskrzeszenie nie jest gotowe (D-190), w przejściu ręcznym albo w pętli, kasuje wszystkie zapamiętane oceny tej postaci, na każdej mapie (pytanie 15); śmierć pokryta wskrzeszeniem i wykupienie stopnia ocen nie kasują. Cykl sprawdza, ile miejsca zajmują zapamiętane oceny w zapisie z wieloma postaciami, programami i mapami, wobec limitu zapisu 64 KiB.

### lines 119-124 (Questions to settle)

- Pytanie 15. Czy zapamiętane oceny postaci zostają, gdy jej śmierć przy braku gotowego wskrzeszenia zabiera całą wprawę i wykupione stopnie?
  - Answer: wariant b — taka śmierć kasuje wszystkie zapamiętane oceny tej postaci, na każdej mapie. Powód pełnomocnika: „odznaka nie może kłamać po utracie wprawy”. Koszt pokazany przy wyborze: gracz traci informację, jak programy radziły sobie z postacią sprzed śmierci; jedno miejsce więcej w kodzie, które kasuje oceny; cofnięcie później małe. Słabe miejsce pokazane przy wyborze: wykupiony stopień dalej postarza wynik po cichu, więc reguła nie jest symetryczna.
  - Not chosen:
    - a — oceny zostają, jak przy wykupieniu stopnia: „przy postaci, która właśnie straciła wszystko, dalej może stać „szczelny: 12 z 12” aż do następnej oceny — odznaka kłamie w najgorszej chwili”
    - c — oceny zostają z dopiskiem, na przykład „oceniono przed utratą wprawy”, a odznaki gasną: „drugi dopisek i jeszcze jeden stan wyniku na ekranie; jego napis trzeba by ustalić razem z pozostałymi napisami”
  - Source: human, 2026-11-20, przez pełnomocnika — wiadomość „doradcy dnia”, jak przy pytaniu 8: „2: 1a, dopiski ok, 14b, 15b, reszta ok” i uzasadnienie „2.15 b, bo odznaka nie może kłamać po utracie wprawy” (rozmowa doprecyzowania, tura 27; pytanie pokazane jako 15, w brzmieniu tury 26).

### lines 36-36 (task-frozen: To do)

6. Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa: dwanaście wyników ziaren i to, co ocena wzięła ze skrzynki na wejście; przyczynę i minutę wiersza widać tylko zaraz po ocenie. Odznakę szczelności ma program, którego ostatnia ocena rozwiązała wszystkie dwanaście ziaren; stoi przy liście „Program:” tej postaci na tej mapie, a przy niższym wyniku stoi tam sama liczba „{n} z 12”. Gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie; gdy w skrzynce jest tego więcej, wynik stoi jak był. Zmiana reguł, grup albo planu wyprawy programu kasuje zapamiętaną ocenę, a następna ocena ją zastępuje; limitu czasu nie ma (pytanie 2). Przy liście „Program:” stoi zapamiętany wynik programu, który lista pokazuje, i zmienia się razem z wyborem; inne programy listy nie mają znaku. Gdy ocena 12 z 12 straciła zapas, stoi tam „12 z 12” z dopiskiem, bez odznaki. Odznaka i liczba stoją tylko w „Kto idzie”, nie na innych ekranach. Kasuje zapisanie programu, po którym jego reguły, grupy (z ich kolejnością) albo plan wyprawy są inne; zmiana nazwy niczego nie kasuje. Usunięcie programu usuwa jego zapamiętane oceny, a wczytanie zapisu odrzuca cały zapis, gdy zapamiętana ocena nazywa postać, program albo mapę, których gra nie dała (D-165, D-206). Zmiana pułapu albo danych mapy zapamiętanych ocen nie kasuje. Śmierć postaci, która zabiera jej wprawę i wykupione stopnie, bo żadne wskrzeszenie nie jest gotowe (D-190), w przejściu ręcznym albo w pętli, kasuje wszystkie zapamiętane oceny tej postaci, na każdej mapie (pytanie 15); śmierć pokryta wskrzeszeniem i wykupienie stopnia ocen nie kasują. Cykl sprawdza, ile miejsca zajmują zapamiętane oceny w zapisie z wieloma postaciami, programami i mapami, wobec limitu zapisu 64 KiB.

### lines 119-124 (task-frozen: Questions to settle)

- Pytanie 15. Czy zapamiętane oceny postaci zostają, gdy jej śmierć przy braku gotowego wskrzeszenia zabiera całą wprawę i wykupione stopnie?
  - Answer: wariant b — taka śmierć kasuje wszystkie zapamiętane oceny tej postaci, na każdej mapie. Powód pełnomocnika: „odznaka nie może kłamać po utracie wprawy”. Koszt pokazany przy wyborze: gracz traci informację, jak programy radziły sobie z postacią sprzed śmierci; jedno miejsce więcej w kodzie, które kasuje oceny; cofnięcie później małe. Słabe miejsce pokazane przy wyborze: wykupiony stopień dalej postarza wynik po cichu, więc reguła nie jest symetryczna.
  - Not chosen:
    - a — oceny zostają, jak przy wykupieniu stopnia: „przy postaci, która właśnie straciła wszystko, dalej może stać „szczelny: 12 z 12” aż do następnej oceny — odznaka kłamie w najgorszej chwili”
    - c — oceny zostają z dopiskiem, na przykład „oceniono przed utratą wprawy”, a odznaki gasną: „drugi dopisek i jeszcze jeden stan wyniku na ekranie; jego napis trzeba by ustalić razem z pozostałymi napisami”
  - Source: human, 2026-11-20, przez pełnomocnika — wiadomość „doradcy dnia”, jak przy pytaniu 8: „2: 1a, dopiski ok, 14b, 15b, reszta ok” i uzasadnienie „2.15 b, bo odznaka nie może kłamać po utracie wprawy” (rozmowa doprecyzowania, tura 27; pytanie pokazane jako 15, w brzmieniu tury 26).

### lines 66-93 (spec: Decision 2)

### 2. What validates a cached judging: the program's content revision and the character's generation, compared at reading

**The content revision.** Each program of the player's list carries a content revision: a whole number from 0, part of the saved program beside its number, name and content (`SavedProgram`), not part of the content (`Program`). It is 0 for every new program — the first program of a new game, one made by „Nowy program” (`createProgram`), a copy saved as a new program (`saveCopyAsNewProgram`) and each program the previous-save pull appends (`appendPrograms`, D-401). It rises by one at every save into a listed program after which the program's rules, rule groups with their order or trip plan differ from before — compared as plain data by `sameData` over the groups and the trip plan, the identity counters `nextGroupId` and `nextRuleId` left out, as the first run's `judgingsAfterSave` compared — and nowhere else: not at a rename, not at a save that changes none of the three, not at a pick, a switch, a send, a deletion of another program or the start of an earning loop. The one place that raises it is the function every content write passes through, `withProgramSaved`, so `editProgram`, `saveCopyIntoProgram`, `setProgram` and the first-chill rule the game writes (D-123) raise it with no code of their own. The map run's copy (`ProgramCopy`) and the earning loop hold content only and carry no revision: a copy saved into its program raises the program's revision where the content differs; a copy saved as a new program makes a program of revision 0.

**The check.** A cached judging is stored with the content revision of the program it judged and the generation number of the character it judged for. At reading, against the game state at hand, it stands only where all hold: the character of the triple is on the team with the stored generation; the program of the triple is on the player's list with the stored content revision; the stored results number as many as the data's seeds of a judging. Otherwise it shows nothing, as where nothing is cached.

What each erasing of the task becomes:

| Task, *To do* 6 / D-440 | With the cache |
|---|---|
| a save after which the rules, the groups with their order or the trip plan differ, the first-chill rule (D-123) included, A→B→A included | the revision rose; it never comes back down |
| a rename, a save that changes none of them | the revision is the same |
| a program deleted | its number is on no program of the list and is never given again (D-165) |
| a death that takes practice and ranks (`progressLost`), in a manual map run, an earning loop or the catch-up | the generation grew |
| a death covered by the resurrection, a death of a character with no practice, a bought rank | the generation is the same |
| a change of the cap or of the map's data | not compared, as today |

Because the revision travels in the saved game, the check gives the same answer on every device and after every reload.

**The revision is a counter, not a hash; no hash function remains.** The limit of a counter, named and accepted: a revision or a generation that went back. Where a change whose save never reached the server is lost — the page closed with the save failing (D-208), or a save refused for another browser's (D-209) — a judging this browser made after that change is cached with a revision (or generation) the server's game never had; if the program later reaches the same revision with other content, with no judging of the triple between, that judging would stand beside it. Two things narrow it: the page removes this game's cached judgings in this browser when it builds the game after a refused save (Decision 7), which covers the case of D-209; the case of a page closed with an unsaved change stays, and it needs the change's save to fail, a judging in that window, and later edits reaching exactly the same count with no judging between; the wrong mark lasts until the next judging of the triple or the next change of the program. Rejected way to close it: the revision as the real moment of each change, passed from the clock to every function that writes content (`editProgram`, `saveCopyIntoProgram`, `setProgram`, and the passing of game time for the first-chill rule) — never repeats, but a clock argument on four functions and their tests for a case of a failed save.

Ways weighed:

- **A content revision of each saved program, compared at reading (chosen).** Exact to *To do* 6 and the human's remark on every device, A→B→A included; no hash; costs one field of the saved program at the version 9 already raised, its strict load, and the previous-save reader's knowing of the field (Decision 6).
- **A fingerprint (hash) of the program's content, compared at reading.** Rejected after the review: a program changed A→B→A shows A's judging again, while the task and the remark say the change to B erases it (`reports/spec-review-report.md`, Finding 1).
- **Hooks kept in the view: the store hands the cache each new state with the one before it, and the cache erases what changed.** Rejected: a second path beside the check at reading, which is still needed for a reload, another tab and another device, and a write to storage on edits.

Where the validity lives: in the simulation, as pure functions (Decision 6, units S1–S3), so the cases are tested at the lowest level with no page.

### lines 126-136 (spec: Decision 6 (simulation))

### 6. Where the code lives

Simulation (`src/browser/sim/`, pure, no storage, held by `simulation-isolation` and `simulation-inputs`):

- **S1 — the content revision of a saved program**: a field of `SavedProgram` (Decision 2), 0 in `newGame`, `createProgram`, `saveCopyAsNewProgram` and `appendPrograms`, raised by one in `withProgramSaved` where `sameData` finds the groups or the trip plan different, kept as it is by `renameProgram` and every other function that copies a saved program. `withProgramSaved` goes back to giving the list of programs alone (as before `3218a620`, when its callers used `withProgramContent`), now with the revision raised; its callers take the list as before slice 7. The save writes the field; the strict load reads it as a safe integer from 0, the item of the list holding exactly `id`, `name`, `program` and the revision, built from new values (`guidelines/coding-saved-game.md`, „Ścisłe wczytanie”); nothing compares it with anything at the load. The previous-save reader (`previous-programs.ts`) reads an item of a document of version 9 or above only where its keys are exactly `id`, `name`, `program` and the revision, and one of a version from 1 to 8 only where they are exactly `id`, `name` and `program`; the revision's value, like `id`'s, is neither read nor checked, since the pull makes a new program of revision 0.
- **S2 — the record of a judging**: takes the game state the judging read, the triple and the judging, gives what the cache stores — the kinds of the twelve results, the equipment, the content revision of the triple's program in that state, the character's generation in that state. It replaces `rememberedOf`.
- **S3 — the mark**: takes the game state, the triple and a record or none, gives the mark beside „Program:” — the count solved, all twelve, the note on the stock (less of an item in the chest than the record took), the badge — or none where no record is given or it does not stand (Decision 2). It replaces today's `judgingMark`, whose result type `JudgingMark` stays.
- **The act of a judging**: gives the judging and its record, made from the one state it read, and leaves the game state as it was (the very state). It replaces `judgeAndRemember`; whether it still answers as a `GameResult` is the maker's.
- **The moment the game was made**: a field of `GameState`, given to the function that makes a new game, written by the save and read by the load (Decision 3).
- **Goes away**: `GameState.judgings`; the types `RememberedJudging` and `RememberedJudgings`; `withRememberedJudging`, `judgingsWithoutProgram`, `judgingsWithoutCharacter`, `judgingsAfterSave`, `judgingsAfterDeath`; the judgings half of `withProgramSaved`; the removal of judgings in `deleteProgram`; the erasing in `settleDeath` and in `takeEnd`; the reading and writing of `judgings` in `saved-game.ts` (`rememberedJudging`, `rememberedJudgings`, `"judgings"` among the game's keys, and the seed kinds there if nothing else reads them). Of the five places slice 7 hooked for a change of content, the four that write content now raise the revision through `withProgramSaved`, and the deletion needs nothing (D-165); of the two places hooked for a death, both need nothing (the generation grows there already). The death functions and `deleteProgram` go back to what they did before `3218a620`, keeping every other change made since.
- **Stays**: `judgeOnSeeds`, the types `SeedResult` and `Judging`, the mark's meaning, the loop record.

### lines 162-164 (spec: Decision 9)

### 9. Concurrency with the act and with the store

The judging changes no game state, so the store takes no result from it and saves nothing for it (it may still take and save the catch-up its reading makes first, as any act). The tests that count saves around a judging follow that (Decision 10).

### lines 171-171 (spec: Decision 10)

- **Simulation, unit — the record and the mark** (rewriting `tests/sim/judging-record.test.mjs`; `tests/sim/judging.test.mjs` for the act): the record holding the revision and the generation of the state the judging read; the mark none for no record; none for a record whose program is deleted, whose character is not on the team, whose generation is below the character's after a death with `progressLost` — in a manual map run, an earning loop and the catch-up — and whose revision differs, the A→B→A case included; standing after a covered death, a death with no practice, a bought rank and a rename; the stock cases as today (less in the chest gives the note and no badge, more leaves the mark); the act leaving the game state the very state it got.

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 4 — the record of a judging, the mark from it, and an act that leaves the game state as it was

- **Goal:** three pure functions of the simulation, beside the first run's, which stay until Slice 9.
  In `src/browser/sim/judging-record.ts`, which imports neither `game.ts` nor `judging.ts`: the record
  of a judging (spec Decision 6, S2) — from the game state the judging read, the triple of a character,
  a program and a map, and the judging, what the cache stores: the kind of each of the twelve results,
  the equipment as the judging took it, the content revision of the triple's program in that state
  and the character's generation number in that state; its type stands in this module beside
  `JudgingMark` and `JudgingIds`. The mark from a record (S3) — from the game state at hand, the triple
  and a record or none: the mark beside „Program:” as `JudgingMark` gives it (the count solved, all
  twelve, the note on the stock where the chest holds less of an item than the record took, the
  badge), or none where no record is given or it does not stand: it stands only where the character of
  the triple is on the team with the stored generation, the program of the triple is on the list with
  the stored revision, and the stored results number as many as the data's judging seeds (spec
  Decision 2, „The check”). Its name is your own while the first run's `judgingMark` still stands. In
  `src/browser/sim/judging.ts`: the act of a judging — the judging `judgeOnSeeds` gives and its record,
  both from the one state it read, the game state left the very state it got; whether it answers as a
  `GameResult` is yours. The failing tests come first: in `tests/sim/judging-record.test.mjs` the
  cases of spec Decision 10, second item — the record holding the revision and the generation of the
  state the judging read; the mark none for no record; none for a record whose program is deleted,
  whose character is not on the team, whose generation is below the character's after a death with
  `progressLost` in a manual map run, an earning loop and the catch-up, and whose revision differs,
  A→B→A included; standing after a covered death, a death with no practice, a bought rank and a
  rename; the stock cases (less in the chest gives the note and no badge, more leaves the mark) — and
  in `tests/sim/judging.test.mjs` the act leaving the game state the very state it got, with its
  judging the one `judgeOnSeeds` gives. The first run's cases of the file stay until Slice 9 removes
  what they cover; a line `decision:` of either file that quotes a passage of D-440 or D-165 the
  Foundation entries changed follows the new passage. Read `src/browser/sim/types.ts` as Slice 1 left
  it (the revision of a saved program).
- **Change:** `src/browser/sim/judging-record.ts` · `src/browser/sim/judging.ts` ·
  `tests/sim/judging-record.test.mjs` · `tests/sim/judging.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:36-36` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:119-124` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:66-93` Decision 2 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:126-136` Decision 6 (simulation) ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:162-164` Decision 9 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:171-171` Decision 10 · Foundation entries
  row 1 · Foundation entries row 2 · Foundation entries row 3 · Foundation entries row 6 ·
  `foundations/decisions.md:11809-11834` D-439 · `foundations/decisions.md:6218-6249` D-190 ·
  `foundations/decisions.md:6334-6354` D-218 · `foundations/decisions.md:9115-9128` D-409 ·
  `foundations/invariants.md:226-234` simulation-inputs · `foundations/invariants.md:214-224`
  simulation-isolation · `foundations/glossary.md:308-312` judging ·
  `foundations/glossary.md:217-221` generation number · `foundations/part_map.md:33-64` simulation ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/AGENTS.md` · `src/browser/sim/types.ts` · `src/browser/sim/game.ts:640-724` · `src/browser/sim/loop.ts:295-411`
- **Model:** same — the check at reading is the core of the correction: every erasing of the task
  becomes a comparison here, and a wrong one shows a badge that lies.
- **Risk:** none
- **Checks:** `npm test -- tests/sim/judging-record.test.mjs` (the new cases written first, failing) ·
  `npm test -- tests/sim/judging.test.mjs` · `npm test -- tests/sim/death.test.mjs` ·
  `npm test -- tests/invariants/test_simulation_inputs.py` ·
  `npm test -- tests/invariants/test_simulation_isolation.py`
- **Depends on:** Slice 1 · Foundation entries row 1 · row 2 · row 3

## Notes of the orchestrator for this slice

- Slices 1–3 of the correction are made (the content revision per saved program, the moment the game was made, the document of version 9, the reader of a previous save); the fix of slice 1's `newGame` check is `7b1779fd`. The foundation entries of the correction are at `4d813606`: D-441 (where the judgings lie: the browser's `localStorage`), D-442 (the content revision), D-440 (changed: what the game remembers and when a judging stands, now through the revision and the generation), D-04, D-165; the invariant `judging-cache-reading`; read the ones your *Read* names whole, and the spec's *Decisions* 2, 6 (simulation) and 10 as copied below.
- Your slice (the simulation only; no storage, no page, no clock — D-04, `simulation-isolation`): the record of a judging (twelve results kept as the kind of each — one letter each in the stored form is the cache module's business, Slice 5; here the pure record type and functions), the mark of a program at a character on a map (the count solved, all twelve, whether the chest still holds each item at the count the judging took — more in the chest leaves the mark as it is, less makes the note stand and the badge go), the validity of a recorded judging against the game state at hand (the program's content revision and the character's generation equal to those recorded; the character on the team, the program on the list, the map the game gives), and an act of a judging that **leaves the game state as it was** (it returns the twelve results with cause and minute and the record to be remembered; nothing is replaced in the game state, as the first run's act did). The first run's code stays in the game state until Slice 9 removes it (`RememberedJudging`, its erasing hooks in `game.ts`, `programs.ts`, `loop.ts`, its strict load): do not remove it here, and keep both worlds compiling and their tests passing. Read the first run's `judging-record.ts`, `judging.ts` and their tests as they stand and change what the spec says.
- A new test file under `tests/sim/` has to be listed in `stryker.config.json` if `tests/quality/test_mutation_test_selection.py` says so; name any addition in the report. Quote every `// decision:` line word for word; the foundation check shows errors owned by later slices (quotations of D-440's first sentence in `tests/sim/judging-record.test.mjs` are yours where you change that file; those in `saved-game-judgings.test.mjs` are Slice 9's, which removes the file) and the uncited invariant `judging-cache-reading` (Slice 5).
- No full gate; focused checks as your *Checks* name; ESLint, Prettier, `npx tsc` through `npm run typecheck`, `node tests/quality/eslint-size-rules.mjs`.

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
