# Handoff - reviewer of Slice 2 (2), task `katalog-map`

You review one range of a task cycle of the-way as an agent that did not make it. The person who requested the cycle
has delegated intermediate choices to the orchestrator; nothing you are told is the human's approval. Questions go to
the orchestrator, never to the human. You are read-only on the product: you change no tracked file and make no commit.

- Worktree (work from its root): `the task's worktree`, branch `task/katalog-map`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole; read a file it names only when its step comes.
- Range to review: `a0949dec..5766c306` (compute the diff yourself: `git diff a0949dec..5766c306`, `git log a0949dec..5766c306`;
  confirm `git rev-parse HEAD` is `5766c306`). Slice number: 2.
- Author's report (claims to verify, not evidence): `.runs/task-cycles/katalog-map/reports/executor-2-report.md`.
- Trust boundary: yes where the slice's *Risk* below says so - then check crafted/untrusted input at that boundary
  (files from outside, lasting-storage values). No irreversible operation.
- Judge the slice against the passages of the task copied below and the slice's *Goal*, *Change* and *Checks*. Guidelines
  (each whole): the ones the slice's *Read* names. Foundation: the entries the slice's *Read* names, by heading
  (`### D-nnn -`, `## <invariant-id>`; line numbers in the *Read* were counted at the base and moved). New decisions are
  D-448 and D-449. Foundation entries were written in commit `612476a6` (outside this range; part of the foundation you read).
- The full gate is not run by agents; you may run focused checks (a single test file, typecheck, eslint, prettier) and the
  foundation check `python -B .the-way/elements/common/foundation_check.py` (14 known citation errors with owners in
  Slices 8 and 9 stand until those slices; report any other).
- Your directory for working copies: `.runs/review-2/`.
- Report path: `.runs/task-cycles/katalog-map/reports/review-2-report.md` (the file is the input of the cycle's
  scripts, the case Claude Code's refusal of files named `report...` leaves open). Its first line is `PASS <sha>` or
  `FAIL <sha>` (or `questions`). It holds checks with commands and exit codes, **Unread material** and
  **Searches not found or unclear** (each `none` or the items). Return the first line, the checks, the report path.
- `cycle.md` and other files of `.runs/task-cycles/katalog-map/` are not yours to read unless named here.
- The range holds three commits: `7a132107` (the slice's code), `23d8c7bb` (the environment fact `game-icons-bear-head-title`
  and the `Rests on` of `icon-credits`, written by the agent of foundation entries on the orchestrator's answer to the
  executor's blocked question) and `5766c306` (the title line in `tests/invariants/test_icon_credits.py`, which the plan's
  *Change* list did not name and the orchestrator added to the slice). Judge all three; the icon file is a trust-boundary file:
  check it is the game-icons.net `bear-head` of Delapouite prepared exactly as `wolf-head.svg` is (the executor says the file
  equals the old repository's copy and the pinned source commit byte for byte; verify what you can, e.g. against the
  `ICON_SOURCE_COMMIT` named in `src/browser/view/credits.ts`), contains no script or external reference, and that the credit
  line is true. The executor reports that the scene code places a creature by its frame's bottom edge (`scene.tsx`) and the
  bear's feet stand about 3 rows above it; that is Slice 4's to judge in the running game, not a defect here.

## The slice, copied word for word from the plan

### Slice 2 — The bear creature, its icon and its place in the scene's data

- **Goal:** `bear` is in `CREATURES` of `src/browser/sim/data/creatures.ts` with the numbers of the old game's entry (120
  health, a blow of 20, the one rule "always → strike", revealed by being attacked by it, name „niedźwiedź”), an icon
  `bear-head` and its icon title, and `CreatureDef` gets a field with the form of the name after „z” („wilkiem”,
  „niedźwiedziem”; Slice 2b makes `now-lines.ts` read it), which the wolf's entry and its test in
  `tests/sim/data.test.mjs` hold too. The file `assets/icons/bear-head.svg` is the game-icons.net icon `bear-head`
  (author Delapouite) prepared as the other icons of `assets/icons/` are (the old game's repository holds the source
  file; the executor compares it with the icon source commit `ICON_SOURCE_COMMIT` of `credits.ts` and with how
  `wolf-head.svg` differs from its source, and prepares the file the same way); `ICON_CREDITS` of
  `src/browser/view/credits.ts` credits it. `SCENE_CREATURES` of `src/browser/sim/data/scene.ts` holds `bear`
  with the four sheets of Slice 1 and their frame sizes and counts. The section of credits lists the bear's icon after
  the wolf's (the tests of the section say so). No map attacks with the bear yet.
- **Change:** `src/browser/sim/data/creatures.ts` · `src/browser/sim/data/scene.ts` · `assets/icons/bear-head.svg` · `src/browser/view/credits.ts` · `tests/sim/data.test.mjs` · `tests/view/icons.test.mjs`
- **Read:** `.runs/task-cycles/katalog-map/task.md:30-30` To do 3 · `.runs/task-cycles/katalog-map/task.md:128-129` Context (the old game's lair and the bear) · `.runs/task-cycles/katalog-map/task.md:182-182` D-27 in *Decisions in play* · `foundations/decisions.md:4932-4983` D-27 · `foundations/decisions.md:5160-5267` D-271 · `foundations/part_map.md:1-66` browser-view and simulation · `guidelines/coding.md` · `guidelines/coding-content-data.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `assets/icons/wolf-head.svg`. Outside the repository, read-only, not counted by the size script (about 2.4 KB and 0.7 KB): the file src/sim/data/creatures.ts (the bear entry) and the file assets/game-icons/delapouite/bear-head.svg of the old game's repository the old game's repository, branch feat/archetypes, read with git -C the old game's repository show feat/archetypes:<path>, never checked out.
- **Model:** cheaper — the entry, the credit and the sheets' mapping follow the wolf's, and the icon is prepared as the existing ones
- **Risk:** trust boundary — `assets/icons/**`, one icon file from game-icons.net (part map, `browser-view`)
- **Checks:** `npm test -- tests/sim/data.test.mjs` · `npm test -- tests/view/icons.test.mjs` · `npm test -- tests/view/scene-picture.test.mjs` · `npm test -- tests/sim/discovery.test.mjs` · `npm test -- tests/invariants/test_icon_file_content.py` · `npm test -- tests/invariants/test_icon_credits.py` · `npm run --silent typecheck` · `npx eslint --max-warnings 0 src/browser/sim/data/creatures.ts src/browser/sim/data/scene.ts src/browser/view/credits.ts` · `npx prettier --check src/browser/sim/data/creatures.ts src/browser/sim/data/scene.ts src/browser/view/credits.ts`
- **Depends on:** Slice 1 · Foundation entries (D-271)

## Passages of the task the slice's Read names (word for word, address given)

### .runs/task-cycles/katalog-map/task.md:128-129
```
- Las — matecznik w starej grze: wnoszenie 0 („Wejdź bez niczego”) jest tam celowe — komentarz w danych mówi, że obieg ma stanąć na własnych nogach od pierwszej minuty; program niedźwiedzia to sam cios, bo jedyną dźwignią przeciwnika są liczby.
- Gra loop2 nie ma dziś niedźwiedzia: w danych stworzeń stoi sam wilk, a obrazki sceny pochodzą z paczek Pixel Crawler i LPC Wolf (D-271).
```

### .runs/task-cycles/katalog-map/task.md:182-182
```
- D-27 — Where do the game's icons come from?, zdanie: „The game's icons are SVG files from game-icons.net, kept in `assets/icons/` outside the directory the account and save server serves and copied into that directory when the application is built.” Bez zmiany; ikona niedźwiedzia dostaje swój wiersz w napisach.
```

### .runs/task-cycles/katalog-map/task.md:30-30
```
3. Niedźwiedź wchodzi do danych stworzeń: 120 zdrowia, cios 20, program „sam cios” jak w starej grze (wpis `bear` w `src/sim/data/creatures.ts` tamtego repozytorium), z ikoną z game-icons.net (D-27; stara gra używa `bear-head`). Na scenie stoi niedźwiedź z paczki „[LPC] bears, deer, lions and more” (pytanie Q2, część 2), a zmiana wnosi wszystko, co dla nowej paczki wymienia krok 5 „A new pack” skilla `.claude/skills/loop2-scene-art/SKILL.md`: zmianę D-271, fakt licencji paczki, wiersz w napisach o autorach grafiki i wiersz w mapie części; postać stojąca w miejscu powstaje z klatki chodu, bo paczka nie ma animacji stania, a skalę niedźwiedzia obok maga i wilka cykl sprawdza pierwszym sprawdzeniem tego skilla i pokazuje na zrzucie w prośbie.
```

## Working copies (the first paragraph of the cycle's rule, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a
clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own
directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never
in the system's temporary directory, in the scratch directory of a session or in the main checkout
of the repository. In a product, a worktree or checkout made to run checks gets its `.the-way`
populated, and the dependencies those checks need installed as the product's own rules give,
before they run; otherwise they fail for that reason. The screenshot that a screenshot tool, such as the Playwright server, saves by
itself under its session's directory is moved into the agent's directory and the original removed,
except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md`
says, to the place the product's foundation settles for screenshots, and into the agent's directory
only where no such place is settled. The files that a product's own tools and tests make by
themselves are no working copy of the agent and stay outside this rule. Before the agent returns,
each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then
`git worktree prune` — keeps in `reports/` beside its report what the report needs, the input and
command of a probe that shows a finding among them, and states in
the report where each copy stood and that it was removed. Where a removal fails, the agent finishes
all the same and names in the report the remainder, with its full path and the reason it stayed. It
removes a copy, as any directory, by its path written out in full in the command, never through a
shell variable: an empty variable turns the removal on the directory the shell stands in.
