# Handoff — review `rcg`, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Questions go to the orchestrator, never to the human.

## What is reviewed

- Worktree: `.` (branch `task/ocena-programu-na-ziarnach`); you are read-only there and make no commit. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`). Read it whole, and a file it names only when the step or variant that names the file comes.
- Review: a group of the cycle's slices, in the plan's order — slice(s) 2, 4, 6, 7, 8, 10, 11, 12. **Range to review: `4d813606..c43c8ad7`** (base exclusive, head inclusive; head `c43c8ad7`). Check the head with `git rev-parse` first; on a mismatch ask the orchestrator which range to review.
- The change is a member of a plan; the plan's sections for what you review are copied below word for word, and the passages of the frozen task that those sections' *Read* name (the frozen task is `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; open it if a passage points you to more). You judge the work against those passages and the foundation entries the sections name, not against the plan's wording.
- Two answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; check crafted input at that boundary wherever the range touches it (say so in the report if the range does not). Irreversible operation **no**: confirm that the change only prepares what it prepares.
- Executors' and writer's reports (each in `.runs/task-cycles/ocena-programu-na-ziarnach/reports/`): `slice-c1-02-executor-report.md`, `slice-c1-04-executor-report.md`, `slice-c1-06-executor-report.md`, `slice-c1-07-executor-report.md`, `slice-c1-08-executor-report.md`, `slice-c1-10-executor-report.md`, `slice-c1-11-executor-report.md`, `slice-c1-12-executor-report.md`. Read each; they hold the own-work checks, reaches, concerns and unread material. A check an author reports is evidence of what the author ran, never of the result.
- Mechanical checks the orchestrator ran: clean worktree, non-empty range, changed files equal the slices' *Change*. Any mismatch is given below under notes.
- No agent of the cycle runs the product's full gate; **you do not run `npm test` without a file argument or the whole `tests/`**. Run the focused checks of the slices you review, and probes of your own, from a worktree of the head commit in your own directory.
- Your directory for working copies: `.runs/review-rcg/` (directly under the ignored `.runs/` of the worktree) — make a detached worktree of `c43c8ad7` there (`git worktree add --detach .runs/review-rcg/wt c43c8ad7`), run `npm ci` in it if you run Node tests, and run checks there, not in the cycle's worktree (another agent may be writing there). Remove it before you return, as the paragraph below gives.
- Your report path (its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/review-rcg-report.md`; its first line is `PASS c43c8ad7` or `FAIL c43c8ad7` (or `questions`).
- `cycle.md` and the other files of the record directory not named above are not yours to read.
- Settle each blocking finding's contradiction mark, and for the range's slices the slice it comes from, as `review-change` gives.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Passages of the frozen task

### lines 36-36

6. Gra pamięta w zapisie ostatnią ocenę każdej trójki postać, program i mapa: dwanaście wyników ziaren i to, co ocena wzięła ze skrzynki na wejście; przyczynę i minutę wiersza widać tylko zaraz po ocenie. Odznakę szczelności ma program, którego ostatnia ocena rozwiązała wszystkie dwanaście ziaren; stoi przy liście „Program:” tej postaci na tej mapie, a przy niższym wyniku stoi tam sama liczba „{n} z 12”. Gdy skrzynka nie ma już tego, co ocena wzięła, wynik zostaje z dopiskiem „oceniono z zapasem, którego dziś nie ma w skrzynce”, a odznaka gaśnie; gdy w skrzynce jest tego więcej, wynik stoi jak był. Zmiana reguł, grup albo planu wyprawy programu kasuje zapamiętaną ocenę, a następna ocena ją zastępuje; limitu czasu nie ma (pytanie 2). Przy liście „Program:” stoi zapamiętany wynik programu, który lista pokazuje, i zmienia się razem z wyborem; inne programy listy nie mają znaku. Gdy ocena 12 z 12 straciła zapas, stoi tam „12 z 12” z dopiskiem, bez odznaki. Odznaka i liczba stoją tylko w „Kto idzie”, nie na innych ekranach. Kasuje zapisanie programu, po którym jego reguły, grupy (z ich kolejnością) albo plan wyprawy są inne; zmiana nazwy niczego nie kasuje. Usunięcie programu usuwa jego zapamiętane oceny, a wczytanie zapisu odrzuca cały zapis, gdy zapamiętana ocena nazywa postać, program albo mapę, których gra nie dała (D-165, D-206). Zmiana pułapu albo danych mapy zapamiętanych ocen nie kasuje. Śmierć postaci, która zabiera jej wprawę i wykupione stopnie, bo żadne wskrzeszenie nie jest gotowe (D-190), w przejściu ręcznym albo w pętli, kasuje wszystkie zapamiętane oceny tej postaci, na każdej mapie (pytanie 15); śmierć pokryta wskrzeszeniem i wykupienie stopnia ocen nie kasują. Cykl sprawdza, ile miejsca zajmują zapamiętane oceny w zapisie z wieloma postaciami, programami i mapami, wobec limitu zapisu 64 KiB.

### lines 119-124

- Pytanie 15. Czy zapamiętane oceny postaci zostają, gdy jej śmierć przy braku gotowego wskrzeszenia zabiera całą wprawę i wykupione stopnie?
  - Answer: wariant b — taka śmierć kasuje wszystkie zapamiętane oceny tej postaci, na każdej mapie. Powód pełnomocnika: „odznaka nie może kłamać po utracie wprawy”. Koszt pokazany przy wyborze: gracz traci informację, jak programy radziły sobie z postacią sprzed śmierci; jedno miejsce więcej w kodzie, które kasuje oceny; cofnięcie później małe. Słabe miejsce pokazane przy wyborze: wykupiony stopień dalej postarza wynik po cichu, więc reguła nie jest symetryczna.
  - Not chosen:
    - a — oceny zostają, jak przy wykupieniu stopnia: „przy postaci, która właśnie straciła wszystko, dalej może stać „szczelny: 12 z 12” aż do następnej oceny — odznaka kłamie w najgorszej chwili”
    - c — oceny zostają z dopiskiem, na przykład „oceniono przed utratą wprawy”, a odznaki gasną: „drugi dopisek i jeszcze jeden stan wyniku na ekranie; jego napis trzeba by ustalić razem z pozostałymi napisami”
  - Source: human, 2026-11-20, przez pełnomocnika — wiadomość „doradcy dnia”, jak przy pytaniu 8: „2: 1a, dopiski ok, 14b, 15b, reszta ok” i uzasadnienie „2.15 b, bo odznaka nie może kłamać po utracie wprawy” (rozmowa doprecyzowania, tura 27; pytanie pokazane jako 15, w brzmieniu tury 26).


## The plan's sections for what you review (word for word)

### Slice 2 — the document of version 9 holds the revision and the moment

- **Goal:** the document of the current version in `tests/sim/saved-game.test.mjs` holds the content
  revision of each program — programs of revision 0 and above — and the moment the game was made,
  and loads whole into the game state it describes; it is rewritten without a raise of the version,
  with the comment over it that `guidelines/coding-saved-game.md`, „Wersja podnoszona razem z
  kształtem”, asks for (no saved game state of version 9 exists anywhere, since the change has not
  reached a server). The document of version 8 is still refused as version. New cases of the trust
  boundary `save-version`, built from the document changed at one place: a program's revision
  refused as shape where it is missing, below 0, not a whole number and beyond the safe integers;
  the moment admitted at zero, below zero and far ahead, and refused as shape where it is missing,
  no integer and beyond the safe integers (spec Decision 10, third item). The first run's judgings
  stay in the document for now (Slice 10 takes them out). Every line `decision:` of the file that
  quotes a passage the Foundation entries changed — D-440's first sentence among them — follows the
  new passage. The code of the load is Slice 1's: read `src/browser/sim/saved-game.ts` as it stands
  after Slice 1; where a case fails because of the load, stop and report it rather than change the
  load.
- **Change:** `tests/sim/saved-game.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:66-70` Decision 2 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:95-99` Decision 3 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:172-172` Decision 10 · Foundation entries
  row 2 · Foundation entries row 3 · Foundation entries row 5 · Foundation entries row 8 ·
  `foundations/decisions.md:659-702` D-213 · `foundations/decisions.md:10703-10724` D-369 ·
  `foundations/invariants.md:1048-1056` save-version · `guidelines/coding.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md` · `src/browser/sim/saved-game.ts` ·
  `src/browser/sim/types.ts:85-100` · `src/browser/sim/types.ts:480-546`
- **Model:** same — the slice writes the direct refusal cases of the trust boundary `save-version`
  for the two new fields.
- **Risk:** none
- **Checks:** `npm test -- tests/sim/saved-game.test.mjs` (the new refusal cases seen failing once
  with the reading of each field taken out of a scratch copy of the load) ·
  `npm test -- tests/sim/saved-game-judgings.test.mjs` ·
  `python -B .the-way/elements/common/foundation_check.py` (its report names no stale quotation of
  `tests/sim/saved-game.test.mjs`)
- **Depends on:** Slice 1 · Foundation entries row 3 · row 5

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

### Slice 6 — the screen Mapy reads the marks from the cache and the judging is remembered there

- **Goal:** the entry of the screen Mapy, `src/browser/view/maps-entry.ts`, takes a judging cache of
  Slice 5 as an option — optional until Slice 8 makes the game view give it; with none, nothing is
  remembered and no mark stands. Its `judge` control runs Slice 4's act through `store.act`, which
  catches up time first (D-409), and inside the same act body, before the screen's one draw after the
  act, gives the record to the cache, unless the store has halted (`store.halted()`, D-323), when
  nothing is remembered; the act takes no result into the store, so a judging saves nothing of its
  own (spec Decision 9). „Puść w pętlę” judges through the same control, so its judging replaces the
  cached one too (D-440). The entry gives the screen a way to read the record of a triple from the
  cache. The screen, `src/browser/view/maps-screen.tsx`, draws in each row of „Kto idzie” the mark
  Slice 4's function gives from the state it is drawn with and the record of its character, the
  program its list shows and the card's map, read at each draw (a tab shows another tab's judging at
  its next draw, spec Decision 7); what stands under the character — the result of a judging, the
  waiting second click — is unchanged, and the first run's `judgingMark` and `state.judgings` are no
  longer read. The failing tests come first, in `tests/view/maps-screen.test.mjs`, with the cache built
  on a stand-in storage the case gives (spec Decision 10, sixth item): the cases that stand today for
  the badge, „{n} z 12”, the note on the stock and the mark following the list's pick keep their
  expectations; a judging remembered and shown again by a screen built anew on the same storage; no
  mark on an empty storage until a judging; no mark for the same triple under another account or
  another game's moment; no mark after an edit that changes the program's content, also after the
  content is changed back; nothing remembered after the store halted. The cases that build
  `judgings` into the game state or use `judgeAndRemember` follow this change, with the remark 1 of
  the human and the new decision as their reason (`guidelines/testing.md`, „Changing an existing
  test”); a line `decision:` quoting a passage of D-440 the Foundation entries changed follows it.
  `tests/view/account-screen.test.mjs` turns red here where it counts the save of a judging: do not
  change or run it; Slice 7, made next, follows it. Read `src/browser/sim/judging-record.ts`,
  `src/browser/sim/judging.ts` and `src/browser/view/judging-cache.ts` as Slices 4 and 5 left them.
- **Change:** `src/browser/view/maps-entry.ts` · `src/browser/view/maps-screen.tsx` ·
  `tests/view/maps-screen.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:138-145` Decision 6 (view) ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:149-154` Decision 7 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:162-164` Decision 9 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:175-175` Decision 10 · Foundation entries
  row 1 · Foundation entries row 3 · `foundations/decisions.md:9115-9128` D-409 ·
  `foundations/decisions.md:4710-4727` D-323 · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `src/browser/view/state-store.ts:56-104`
- **Model:** same — the switch of the screen from the game state to the cache, inside the act and the
  one draw after it, is the correction's view at its core.
- **Risk:** none
- **Checks:** `npm test -- tests/view/maps-screen.test.mjs` (the new cases written first, failing) ·
  `npm test -- tests/view/judging-lines.test.mjs` · `npm test -- tests/view/uncaught-failure.test.mjs` ·
  `npm test -- tests/invariants/test_content_identifiers.py` ·
  `npm test -- tests/invariants/test_cross_part_imports.py` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py`
- **Depends on:** Slice 4 · Slice 5 · Foundation entries row 1 · row 3

### Slice 7 — the page tests of the account screen follow a judging that saves nothing

- **Goal:** the cases of `tests/view/account-screen.test.mjs` that expect a save of a judging — the
  act of „Puść w pętlę” at its first click, its second click „Puść mimo to” waiting behind the save of
  the first, the helper `startLoopOf` — follow spec Decision 9: a judging changes no game state, so
  the store saves nothing for it; the saves a case expects are the ones of the catch-up its reading
  makes, where it makes one, and of the start of the earning loop; the import of `judgeAndRemember`
  and the expected states built with it go, the expected state after a judging being the state before
  it. The reason of each change is remark 1 of the human and the new decision (`guidelines/testing.md`,
  „Changing an existing test”). What else a case checks stays; a line `decision:` quoting a passage
  the Foundation entries changed follows it. The file is about 360 KB: find its cases by search
  („judgeAndRemember”, „Puść w pętlę”, „Puść mimo to”, `startLoopOf`, „saveGame”) rather than
  reading it whole.
- **Change:** `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:162-164` Decision 9 · Foundation
  entries row 1 · `foundations/decisions.md:3934-4012` D-207 · `foundations/decisions.md:8769-8833`
  D-243 · `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/AGENTS.md`
- **Model:** same — the cases stand in a file of 360 KB that the agent reaches by search, and each
  changed expectation needs its reason.
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs`
- **Depends on:** Slice 6

### Slice 8 — the page makes each new game at the clock's moment and gives the game view the cache

- **Goal:** every path of the page that makes a new game passes the clock's moment to `newGame`
  (spec Decision 3): an account with no saved game state (`app.ts`, `loadGame`), a load refused as
  another version, as an archetype the data lack or as shape (`startFrom` in `app.ts`) and the reset
  of D-402 (`page-game-acts.ts`); the conflict reload that finds no save goes through the first. A
  loaded game keeps its moment. The page gives the game view the signed-in account's id beside the
  role and the previous-save privilege it gives today. `createGameView` in `game-view.ts` reaches
  `window.localStorage` inside a guard, since reaching it can throw, and opens the judging cache of
  Slice 5 with that storage or none, the account's id, the moment of the game it is built with, that
  game state and its `afterConflict`; it gives the cache to the entry of the screen Mapy, whose option
  becomes required. No other file of the page reaches the browser's storage. The failing tests come
  first, in a new file `tests/view/judging-cache-page.test.mjs`, built on the page as
  `tests/view/uncaught-failure.test.mjs` and `tests/view/previous-save.test.mjs` build it: a new game
  made by each path above carrying the clock's moment, also the reset; a reload of a saved game naming
  the same game; a game built after a refused save showing no mark its browser had cached for it; a
  mark cached under another account or another game's moment not shown. In
  `tests/view/uncaught-failure.test.mjs` the press of „Oceń na 12 ziarnach” after an error nothing
  handled leaves the browser's storage as it was. The other callers of `createGameView` in the tests
  (`chronicle-game`, `end-question`, `end-window-game`, `previous-save`, `account-screen`) run
  unchanged. Read `src/browser/view/judging-cache.ts` and `src/browser/view/maps-entry.ts` as Slices 5
  and 6 left them.
- **Change:** `src/browser/view/app.ts` · `src/browser/view/page-game-acts.ts` ·
  `src/browser/view/game-view.ts` · `src/browser/view/maps-entry.ts` ·
  `tests/view/judging-cache-page.test.mjs` · `tests/view/uncaught-failure.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:95-107` Decision 3 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:138-145` Decision 6 (view) ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:149-154` Decision 7 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:174-175` Decision 10 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:179-184` Decision 11 · Foundation entries
  row 1 · Foundation entries row 4 · Foundation entries row 8 · `foundations/decisions.md:4046-4091`
  D-209 · `foundations/decisions.md:4296-4311` D-402 · `foundations/decisions.md:4710-4727` D-323 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `tests/view/previous-save.test.mjs:37-160`
- **Model:** same — four paths of the page make games, and the one reach of the browser's storage
  stands here.
- **Risk:** none
- **Checks:** `npm test -- tests/view/judging-cache-page.test.mjs` (written first, failing) ·
  `npm test -- tests/view/uncaught-failure.test.mjs` · `npm test -- tests/view/maps-screen.test.mjs`
  · `npm test -- tests/view/previous-save.test.mjs` · `npm test -- tests/view/chronicle-game.test.mjs`
  · `npm test -- tests/view/end-question.test.mjs` · `npm test -- tests/view/end-window-game.test.mjs`
  · `npm test -- tests/invariants/test_cross_part_imports.py`
- **Depends on:** Slice 1 · Slice 5 · Slice 6 · Foundation entries row 4 · row 8

### Slice 10 — the document of version 9 holds no judging

- **Goal:** the document of the current version in `tests/sim/saved-game.test.mjs` holds no
  `judgings` and loads whole into the game state it describes, still with the content revisions and
  the moment Slice 2 gave it, rewritten without a raise of the version under the comment Slice 2
  wrote; the cases of the first run that built remembered judgings through the document go, with
  remark 1 of the human as their reason; a document holding a `judgings` key is refused as shape (spec
  Decision 10, third item). A line `decision:` of the file that quotes a passage the Foundation
  entries changed follows it. The code of the load is Slice 9's: where a case fails because of the
  load, stop and report it rather than change the load.
- **Change:** `tests/sim/saved-game.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:172-172` Decision 10 · Foundation
  entries row 1 · Foundation entries row 3 · `foundations/decisions.md:659-702` D-213 ·
  `foundations/invariants.md:1048-1056` save-version · `guidelines/coding.md` ·
  `guidelines/coding-saved-game.md` · `guidelines/testing.md` · `src/browser/sim/saved-game.ts` ·
  `src/browser/sim/types.ts:480-546`
- **Model:** same — the slice writes a direct refusal case of the trust boundary `save-version`.
- **Risk:** none
- **Checks:** `npm test -- tests/sim/saved-game.test.mjs` (the case of the refused `judgings` key seen
  failing once against a scratch copy of the load that still reads it) ·
  `python -B .the-way/elements/common/foundation_check.py` (its report names no stale quotation)
- **Depends on:** Slice 2 · Slice 9

### Slice 11 — the sentence of an open manual map run leads back to it

- **Goal:** first check the base of the first run: `git show c36e2739:src/browser/view/maps-screen.tsx`
  — whether the row of a character in „Kto idzie” held a link to the screen of its open manual map
  run, near the sentence of `runWaitingSentence`. The planner found none in the row there (the sentence
  stood in a plain paragraph, `maps-who-run-note`), while the menu bar held „Wróć do przejścia · {mapa}
  · minuta {m}” to that screen (D-280); the orchestrator keeps this slice only where it settles that
  the remark's link is the one in the row. Where the check finds such a link in the row, change
  nothing, and report that it stood before the change and the walk did not find it. Where it finds
  none: in every row of the card where the sentence stands (the one open manual map run has one screen, so the target is the same in each row; the orchestrator's answer to the planner's question 2), the sentence
  „Przejście na mapie {mapa} jest niezakończone. Wróć do niego i je zakończ, żeby wysłać postać.” is a
  link to the screen of that map run, the address `screenAddress` of `screen-address.ts` gives for
  `{ kind: "run", characterId }` (`#/postac/{n}/przejscie`, D-281); its text stays `runWaitingSentence`'s (D-287, as the
  Foundation entries changed it). The link keeps the sentence's role, `text-secondary`, and takes
  the look the styleguide gives a link of the screen (the name of a character in „Kto idzie” is
  one); in `guidelines/styleguide-browser-view.md`, rule „The screen Mapy”, the line of the sentence
  of D-287 says that it is a link to the screen of that map run, in the
  same role — no role, value or meaning of a role changes. The failing case comes first in
  `tests/view/maps-screen.test.mjs`: while a manual map run waits and after it ended, every row that holds the sentence
  holds it as a link to that screen, and after
  „Zakończ” none. Read `src/browser/view/maps-screen.tsx` as Slice 6 left it.
- **Change:** `src/browser/view/maps-screen.tsx` · `tests/view/maps-screen.test.mjs` ·
  `guidelines/styleguide-browser-view.md`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/reports/correction-1-remarks.md:5-5`
  remark 3 · `.runs/task-cycles/ocena-programu-na-ziarnach/reports/walk-report.md:65-65` side
  observation 2 · Foundation entries row 13 · `foundations/decisions.md:4497-4567` D-280 ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/screen-address.ts:141-162` · `src/browser/view/team-lines.ts:15-22`
- **Model:** same — raised from `cheaper` by the orchestrator: the first run's `cheaper` executor read little of what its handoff named
- **Risk:** none
- **Checks:** `npm test -- tests/view/maps-screen.test.mjs` (the new case written first, failing) ·
  `npm test -- tests/view/team-lines.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py`
- **Depends on:** Slice 6 · Foundation entries row 13

### Slice 12 — the balance instrument makes its games at a fixed moment

- **Goal:** `balance/engine.mjs` (line 94 at the base) and `balance/campaign.mjs` (line 169) pass a
  fixed number, 0, as the moment the game was made where they call `newGame`, never the clock
  (`balance-instrument-repeatability`); no measurement reads it, and every case of `tests/balance/`
  runs unchanged. The number stands where each file makes its game; whether it is one named constant
  shared through the engine is decided by `guidelines/coding-balance-instrument.md`, „Jedno miejsce
  wspólnej rzeczy”.
- **Change:** `balance/engine.mjs` · `balance/campaign.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:95-99` Decision 3 ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md:147-147` Decision 6 (balance) · Foundation
  entries row 4 · `foundations/decisions.md:889-902` D-437 · `foundations/invariants.md:1458-1466`
  balance-instrument-repeatability · `foundations/part_map.md:127-137` balance-tools ·
  `guidelines/coding.md` · `guidelines/coding-balance-instrument.md` · `guidelines/testing.md`
- **Model:** same — raised from `cheaper` by the orchestrator: the first run's `cheaper` executor read little of what its handoff named
- **Risk:** none
- **Checks:** `npm test -- tests/balance/engine.test.mjs` · `npm test -- tests/balance/campaign.test.mjs`
  · `npm test -- tests/balance/agreement.test.mjs` ·
  `npm test -- tests/invariants/test_balance_instrument_repeatability.py`
- **Depends on:** Slice 1 · Foundation entries row 4

## Notes of the orchestrator

- A review in **correction 1** of the open request (the human's remarks `reports/correction-1-remarks.md`, answered by the reviewed spec `.runs/task-cycles/ocena-programu-na-ziarnach/spec.md` — read whole, with its *Decisions* 1–11; the foundation entries of the correction at `4d813606`: D-441, D-442 (new), D-440, D-04, D-386, D-165, D-401, D-206, D-287 (changed), the invariants `previous-save-programs-reader` (changed) and `judging-cache-reading` (new), the glossary term `content revision`: read the ones your range realizes whole).
- **You judge eight commits of the range `4d813606..c43c8ad7`** (the plan's slices 2, 4, 6, 7, 8, 10, 11, 12 of the correction, which had no review of their own): slice 2 `bc386205` (the document of version 9 in `tests/sim/saved-game.test.mjs`), slice 4 `614c7559` (the record, mark and act in the simulation), slice 6 `d0cf581b` (the screen Mapy reads the mark from the cache), slice 7 `7ba9d74e` (account-screen cases), slice 8 `387cd8ca` (the page makes each game at the clock's moment and opens the cache), slice 10 `57ed451a` (the document without judgings), slice 11 `969d4c60` (the link in the sentence of an open manual map run; it also changed `src/browser/maps-screen.css` and the styleguide) and slice 12 `c43c8ad7` (the instrument's fixed moment `GAME_MADE_AT_MS`, `contentRevision: 0` in the campaign's saved programs). The other commits of the range were reviewed apart (PASS): slice 1 `056c2545`, `730863c3` and its fix `7b1779fd` (`rc11`, `rc11f`), slice 3 `aaef0873` (`rc13`), slice 5 `d84a5958` (`rc15`), slice 9 `3966b24e` (`rc19`). Use `git show <sha>`; read the rest as the context they stand on.
- This is a user-interface change (slices 6, 8, 11): judge the appearance and states against `guidelines/styleguide-browser-view.md`, **read whole**, and the rule of the sentence of an open manual map run that slice 11 changed; the texts word for word against the task's *To do* 4, 8 (`task-frozen.md`) where they bear; the cycle's walk through the running game follows after your review.
- Choices the executors made where no source settled them (judge them, say if one contradicts a settled answer): slice 6/8 — the entry's `judging cache` option is not required (a Slice 6 case has none); slice 8 — three cases of `account-screen.test.mjs` now expect `newGame(CLOCK_MS)`; slice 7 — removed the table's `afterwards` step used by one case; slice 10 — two extra refusal entries of a `judgings` key beside Slice 9's case; slice 11 — one CSS rule for the link's role; slice 12 — the instrument's fixed moment `GAME_MADE_AT_MS = 0` exported by `balance/engine.mjs` and imported by `balance/campaign.mjs`: judge it against `guidelines/coding-balance-instrument.md` ("Liczba gra", "Jedno miejsce wspólnej rzeczy") and the invariants on the instrument.
- Unread material carried to you from the executors (read what bears on the range): slice 7 did not read `guidelines/coding.md`, the styleguide, `src/browser/AGENTS.md` nor the new foundation entry on where judgings are kept, and `guidelines/testing.md` only up to line 359; slice 10 did not read `guidelines/coding.md` and `guidelines/testing.md`; slice 12 did not read `guidelines/testing.md` lines 210–510; slice 3's and slice 9's executors read little of the guidelines (their slices were reviewed).
- Minor findings of the slice reviews of this correction are kept for the whole-change review; you are not asked to re-grade them.
