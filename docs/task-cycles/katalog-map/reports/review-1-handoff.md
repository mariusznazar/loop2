# Handoff - reviewer of Slice 1 (1), task `katalog-map`

You review one range of a task cycle of the-way as an agent that did not make it. The person who requested the cycle
has delegated intermediate choices to the orchestrator; nothing you are told is the human's approval. Questions go to
the orchestrator, never to the human. You are read-only on the product: you change no tracked file and make no commit.

- Worktree (work from its root): `the task's worktree`, branch `task/katalog-map`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`), read whole; read a file it names only when its step comes.
- Range to review: `612476a6..a0949dec` (compute the diff yourself: `git diff 612476a6..a0949dec`, `git log 612476a6..a0949dec`;
  confirm `git rev-parse HEAD` is `a0949dec`). Slice number: 1.
- Author's report (claims to verify, not evidence): `.runs/task-cycles/katalog-map/reports/executor-1-report.md`.
- Trust boundary: yes where the slice's *Risk* below says so - then check crafted/untrusted input at that boundary
  (files from outside, lasting-storage values). No irreversible operation.
- Judge the slice against the passages of the task copied below and the slice's *Goal*, *Change* and *Checks*. Guidelines
  (each whole): the ones the slice's *Read* names. Foundation: the entries the slice's *Read* names, by heading
  (`### D-nnn -`, `## <invariant-id>`; line numbers in the *Read* were counted at the base and moved). New decisions are
  D-448 and D-449. Foundation entries were written in commit `612476a6` (outside this range; part of the foundation you read).
- The full gate is not run by agents; you may run focused checks (a single test file, typecheck, eslint, prettier) and the
  foundation check `python -B .the-way/elements/common/foundation_check.py` (14 known citation errors with owners in
  Slices 8 and 9 stand until those slices; report any other).
- Your directory for working copies: `.runs/review-1/`.
- Report path: `.runs/task-cycles/katalog-map/reports/review-1-report.md` (the file is the input of the cycle's
  scripts, the case Claude Code's refusal of files named `report...` leaves open). Its first line is `PASS <sha>` or
  `FAIL <sha>` (or `questions`). It holds checks with commands and exit codes, **Unread material** and
  **Searches not found or unclear** (each `none` or the items). Return the first line, the checks, the report path.
- `cycle.md` and other files of `.runs/task-cycles/katalog-map/` are not yours to read unless named here.
- For this slice the executor reports that the pack's zip holds only PNG files (no licence text) and that the page's
  licence field says CC BY 4.0 while also allowing CC0 for non-Sevarihk work; judge whether the credit line, README
  and tests are faithful to the fact `lpc-bears-deer-lions-licence` in `foundations/environment_facts.md` and to the task
  (CC BY 4.0, credited), whether the four files are the unmodified frames of the pack (the executor's probes are in
  `.runs/task-cycles/katalog-map/reports/executor-1-probes/`), and whether `sprite-file-content` and `sprite-credits`
  hold. The executor flags that the bear's feet stand at different rows in its sheets; that is for Slice 2/4, not a defect here.

## The slice, copied word for word from the plan

### Slice 1 — The bear's pictures from the new pack, with the pack's credit

- **Goal:** Four PNG files of the bear stand in `assets/sprites/`: `bear-idle.png`, `bear-run.png`, `bear-bite.png`
  and `bear-death.png`, each a strip of 64 × 64 frames cut with `sheet-frames.mjs cut` from the pack's sheets of one
  bear (a bear of the pack seen from the side, facing left as the wolf's sheets face, the brown one rather than the
  polar one, which would vanish in the snow of the scene — the executor looks at the sheets and says which it took),
  each cut compared with its sheet down to `differing pixels: 0`. The roles are those of the wolf's sheets
  (`SCENE_CREATURES` of `src/browser/sim/data/scene.ts`): the idle sheet is one standing frame made from a frame of
  the walk, because the pack has no standing animation; the run sheet is the walk, the bite sheet is the attack, the
  death sheet is the fall. The executor fetches the pack's download from its page into a directory of its own under
  `.runs/`, treats it as untrusted (no script is run from inside it), reads the pack's own licence and attribution
  text there and compares it with the environment fact written before this slice. `README.md`, point 2, now names
  four packs, names this one with its four files and says, as for the wolf, how they were made; `PACK_CREDITS` of
  `src/browser/view/credits.ts` holds the pack's line (what it is for — the bear —, title, author, page with a link,
  CC BY 4.0 with its link, and how the files differ from the source); `tests/view/icons.test.mjs` assigns the four
  files to the new pack, holds the pack's line and page link, and counts the lines of the section anew. The first check
  of `loop2-scene-art` is made with the numbers of the bear's figure beside the mage's and the wolf's, and the numbers
  go into the report for the request. Nothing in the game's data names the files yet (Slice 2 does).
- **Change:** `assets/sprites/bear-idle.png` · `assets/sprites/bear-run.png` · `assets/sprites/bear-bite.png` · `assets/sprites/bear-death.png` · `README.md` · `src/browser/view/credits.ts` · `tests/view/icons.test.mjs`
- **Read:** `.runs/task-cycles/katalog-map/task.md:30-30` To do 3 · `.runs/task-cycles/katalog-map/task.md:56-64` Q2 · `.runs/task-cycles/katalog-map/task.md:130-130` the pack, in Context · `.runs/task-cycles/katalog-map/task.md:177-177` D-271 in *Decisions in play* · `.runs/task-cycles/katalog-map/task.md:201-201` Settlement row 5 · `foundations/decisions.md:5160-5267` D-271 · `foundations/invariants.md:1208-1216` sprite-file-content · `foundations/invariants.md:1218-1226` loop2-container-sprites · `foundations/invariants.md:1308-1316` sprite-credits · `foundations/environment_facts.md:840-844` lpc-wolf-licence · the new environment fact (row "Environment fact: the licence of the pack …" of *Foundation entries*) · `foundations/part_map.md:1-33` browser-view · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` · `.claude/skills/loop2-scene-art/SKILL.md` · `.claude/skills/loop2-scene-art/sheet-frames.mjs` · `src/browser/sim/data/scene.ts:86-125` SCENE_CREATURES · `README.md:30-36` · `tests/invariants/test_icon_credits.py`
- **Model:** same — chooses a bear, frames and a standing frame by looking at sheets it has not seen, which the scripts support and do not decide
- **Risk:** trust boundary — `assets/sprites/**`, four files cut from a pack that comes from outside (part map, `browser-view`)
- **Checks:** `node .claude/skills/loop2-scene-art/sheet-frames.mjs compare` on each of the four files against the sheet (`differing pixels: 0`) · `node .claude/skills/loop2-scene-art/sheet-frames.mjs measure assets/sprites/mage-idle.png#64 assets/sprites/wolf-idle.png#64 assets/sprites/bear-idle.png#64` (numbers for the report) · `npm test -- tests/view/icons.test.mjs` · `npm run --silent typecheck` · `npx eslint --max-warnings 0 src/browser/view/credits.ts` · `npx prettier --check src/browser/view/credits.ts tests/view/icons.test.mjs`
- **Depends on:** Foundation entries (D-271, the environment fact, `sprite-credits`, the part map row)

## Passages of the task the slice's Read names (word for word, address given)

### .runs/task-cycles/katalog-map/task.md:130-130
```
- Paczka z niedźwiedziem: „[LPC] bears, deer, lions and more” (tapatilorenzo, OpenGameArt, `https://opengameart.org/content/lpc-bears-deer-lions-and-more`, CC-BY 4.0, odczytane 2026-11-25) — grizzly, czarny i polarny, klatki 64 × 64, chód, atak i śmierć w czterech kierunkach, bez stania w miejscu; niedźwiedź z boku zajmuje 59 × 52 piksele obrazka sceny wobec 63 × 31 wilka i 25 × 32 maga (pomiar skryptem `sheet-frames.mjs measure` ze skilla `loop2-scene-art`); sam autor pisze, że niedźwiedź wyszedł mu „a little jankier than the others”, a komentarz pod paczką, że nogi są za długie wobec tułowia.
```

### .runs/task-cycles/katalog-map/task.md:177-177
```
- D-271 — Where do the scene's pictures come from?, zdanie: „A sprite file holds pixels alone, the game credits each pack whose licence asks for a credit, the game takes the pack LPC Wolf under its licence CC BY 3.0, and the character of the scene is the mage of Pixel Crawler.” Zmiana (Q2 x): obrazki niedźwiedzia z paczki „[LPC] bears, deer, lions and more”, którą gra bierze na licencji CC-BY 4.0 i podpisuje.
```

### .runs/task-cycles/katalog-map/task.md:201-201
```
| 5 | Niedźwiedź na scenie pochodzi z paczki „[LPC] bears, deer, lions and more”, którą gra bierze na licencji CC-BY 4.0 i podpisuje. | sentence of D-271 | Q2, część 2 (wariant x; *Not chosen* tam) — wybór Mariusza | skąd wziąć obrazek niedźwiedzia — przeróbka wilka albo inna paczka |
```

### .runs/task-cycles/katalog-map/task.md:30-30
```
3. Niedźwiedź wchodzi do danych stworzeń: 120 zdrowia, cios 20, program „sam cios” jak w starej grze (wpis `bear` w `src/sim/data/creatures.ts` tamtego repozytorium), z ikoną z game-icons.net (D-27; stara gra używa `bear-head`). Na scenie stoi niedźwiedź z paczki „[LPC] bears, deer, lions and more” (pytanie Q2, część 2), a zmiana wnosi wszystko, co dla nowej paczki wymienia krok 5 „A new pack” skilla `.claude/skills/loop2-scene-art/SKILL.md`: zmianę D-271, fakt licencji paczki, wiersz w napisach o autorach grafiki i wiersz w mapie części; postać stojąca w miejscu powstaje z klatki chodu, bo paczka nie ma animacji stania, a skalę niedźwiedzia obok maga i wilka cykl sprawdza pierwszym sprawdzeniem tego skilla i pokazuje na zrzucie w prośbie.
```

### .runs/task-cycles/katalog-map/task.md:56-64
```
- Q2. O co pyta Las — matecznik, czy w tym projekcie ma się dać go rozwiązać, od kiedy da się na niego wejść, jaka liczba przy nim stoi i kto w nim walczy?
  - Answer: Część 1 — wariant b: Matecznik jak w starej grze i do rozwiązania pod koniec projektu; pyta o to, co projekt daje po drodze, „wszystkiego naraz” — opatrunki z gałęzią Ucisk (zadanie 6), tłuk (zadanie 9) i czary maga (zadanie 12); w tym zadaniu wchodzi do gry, z wejściem, z liczbami starej gry — także z pułapem wejścia 0, czyli „Wejdź bez niczego” — i z liczbą jak w wariancie a: najwięcej zdrowia niedźwiedzia, jakie program zdjął w ocenie na 12 ziarnach, na przykład „niedźwiedź: 24 ze 120”; jego liczby, pułap wejścia też, przestawia później zadanie 14. Koszt podany w pytaniu: do zadania 14 Matecznika nie da się rozwiązać tym, co dały mapy przed nim, co łamało D-438, więc zmiana definicji z ponownym zatwierdzeniem i zmiana planu; przejście gracza, który na niego wejdzie, kończy się porażką; ocena programu musi pamiętać obrażenia (D-439–D-441). Definicję zmieniono i zatwierdzono 2026-11-25 (wyjątek dla Las — matecznik w D-438), a plan sprawdzono od nowa (zadanie 14 ustawia liczby Matecznika tak, żeby dało się go rozwiązać). Część 2 — wariant x: niedźwiedź jak w starej grze (120 zdrowia, cios 20), na scenie z darmowej paczki „[LPC] bears, deer, lions and more” (tapatilorenzo, OpenGameArt, CC-BY 4.0), z czterema wpisami nowej paczki (zmiana D-271, licencja w fundamencie, wiersz w napisach o autorach grafiki, wiersz źródła zewnętrznego) i postacią stojącą z klatki chodu.
  - Not chosen:
    - a) Matecznik nie do rozwiązania do końca projektu — miara, nie poziom, z liczbą zdrowia niedźwiedzia — przeczy hasłu „wall”, wpisowi definicji o trudności ściany i D-438, czyli ponowne zatwierdzenie definicji ze zmianą tych trzech wpisów; ocena musi pamiętać obrażenia; cofnięcie drogie.
    - c) jak b, ale liczbą jest ocena, którą gra już ma — „0 z 12” — przez większość projektu liczba, która nie rośnie z postępem, a zatwierdzony wpis o ocenie programu odrzucił samą liczbę rozwiązanych ziaren („it stays the same through most changes”); wobec D-438 jak b.
    - d) jak b, ale do zadania 14 Matecznik stoi w katalogu z nazwą i liczbą, bez „Wejdź” i bez „Puść w pętlę”, z samą oceną programu (polecany) — gracz widzi daleki cel i nie może spróbować; zmiana D-325 i D-149; ściana, która odmawia wejścia.
    - e) Matecznik wchodzi do gry dopiero w zadaniu 14 — wbrew zdaniu z zadania 1 „staje w katalogu map z liczbą od zadania 3” i celowi zadania 3 w planie; zmiana planu.
    - y) w Mateczniku walczy nowe stworzenie z liczbami niedźwiedzia, np. basior, z przerobionych obrazków wilka, bez nowej paczki — Matecznik odchodzi od starej gry, a po watasze gracz spotyka znowu wilka, tylko większego.
  - Source: human, 2026-11-25, „1.1 b / 1.2 x / 2. a / 3. a” (rozmowa doprecyzowania `.runs/project-refinement/katalog-map.md`, tura 12; pytanie w brzmieniu tury 2, poprawionym do tury 8); zmiana definicji: `.runs/project-refinement/zmiana-definicji-2026-11-25.md`, tura 7 („1. jak polecasz / 2. zatwierdzam”); definicja zatwierdzona 2026-11-25, odcisk 6cdc85ab
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
