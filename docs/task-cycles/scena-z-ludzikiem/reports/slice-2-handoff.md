# Handoff — slice 2 of the task `scena-z-ludzikiem`: the container holds the scene's sprites

You make **a slice, or the retry of a slice** (the row of the table of `make-change` that names this). The person who requested the cycle has delegated intermediate choices to the orchestrator; you never ask the human. Send questions back in your return with the status `questions`.

- Worktree (work from its root): `C:/Storage/repos/loop2-wt/scena-z-ludzikiem`; branch `task/scena-z-ludzikiem`; pinned the-way `61c72fb` in `.the-way`. The branch holds the foundation entries already (commit `0d11c97` and earlier); your commits go on top of the head you find. The slice's base for its review: `d3a04f3`.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole (project skill `the-way-make-change`); read `.the-way/task-cycle/change/slice.md` as the table's row says; read `.the-way/task-cycle/change/ui_check.md` only if the slice changes a user interface and its step names it. Read no file of the-way that your method does not name for the step you are at.
- Class of model for this slice: cheaper (harness model: the cheapest, `haiku`). Risk of this slice (plan): none.
- Answers of the orchestrator at the start: trust boundary **yes** (`assets/sprites/**`); irreversible operation **no**. Settled: the grey of a dead mage and of an extinguished fire is `grayscale(1) brightness(0.55)`; the pause's grey is `grayscale(1) brightness(0.5)`; `SCENE_SCALE` stays 2 (672 × 304).
- You do not run the product's gate (`npm test` without arguments); you run the focused checks of the slice. The orchestrator runs the gate.
- Commits: English messages in the form of the repository's existing commits (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`); `git add <path> …` by path — never `git add -A`, `git add .`, `git commit -a`. Commit your work; leave the worktree clean.
- Report: write it to `docs/task-cycles/scena-z-ludzikiem/reports/slice-2-report.md` as `make-change` gives it; return the status, your commits, a one-line check result (naming what failed or did not run) and the report path. Every check you report carries its command and its exit code. The report holds **Searches not found or unclear:** (each thing you looked for and did not find or that was unclear, or `none`) and each reach beyond this handoff.
- Scripts: before writing any script, even a one-off, read `C:/Storage/The Brain/The Brain/.ai/rules/scripts.md`.
- Personal data: none is involved; do not put secrets or personal data in the report.

## Your slice, copied word for word from the plan

### Slice 2 — the container holds the scene's sprites

- **Goal:** a new test `tests/invariants/test_loop2_container_sprites.py` is the check of
  `loop2-container-sprites` (E10) on the image's side, on the model of
  `tests/invariants/test_loop2_container_icons.py`: the image `docker build` builds from the working
  tree serves each file directly in `assets/sprites/` whose name ends in `.png` at
  `/sprites/<file name>` with the same bytes as the file in the working tree; an empty set fails
  the check; where no Docker daemon answers the test is skipped, so the invariant stays unchecked,
  never passed. Its docstring reads the invariant's sentence as E10 words it, as the icons test reads
  its own, and says that the files the scene's drawing asks for are tied to these files by the case
  of Slice 3. Through `the-way-update-part-map`, the part map's entry `deployment` claims the new
  file, as it claims the icons test. See the test fail once against a wrong expectation made only
  locally, never committed, and name that run in the report.
- **Change:** `tests/invariants/test_loop2_container_sprites.py` · `foundations/part_map.md`
- **Read:** E10 · `foundations/invariants.md:344-353` loop2-container-icons ·
  `foundations/part_map.md:143-168` deployment · `tests/invariants/test_loop2_container_icons.py` ·
  `tests/invariants/account_container_support.py` · `Dockerfile` · `.dockerignore` ·
  `scripts/static-files.mjs` · `guidelines/coding.md` · `guidelines/testing.md`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/invariants/test_loop2_container_sprites.py` (a skip without a
  Docker daemon is reported as unchecked); `python -B .the-way/elements/common/foundation_check.py`
  for the claim of the new file
- **Depends on:** Slice 1 · E10

## Passages of the task your slice reads, copied word for word (file: `docs/task-cycles/scena-z-ludzikiem/task.frozen.md`)

### To do (`task.frozen.md:29-43`)

1. W miejscu nieruchomego kadru z zadania 6 stoi ruchoma scena pikselowego lasu w śniegu, w pełnym świetle, w rozmiarze wybranym w zadaniu 6 (pytania 9 i 11).
2. Postacią sceny jest mag z paczki Pixel Crawler, a nie postać w kapturze ze starego Loop.
3. Mag idzie tam, dokąd prowadzi go bieżąca czynność (pytanie 2): przy „Zbierz” i „Obchód” do patyków, do krzaka jagód albo do mchu, zależnie od celu, a przy włóknie zostaje, gdzie stoi; przy „Wytwórz — ognisko”, „Zapal — ognisko” i „Zasil — ognisko” na miejsce ogniska; przy „Zapal — patyk” i „Zjedz” zostaje, gdzie stoi; przy „Eksploruj”, „Wędruj”, „Idź” i „Idź — ognisko” do prawego brzegu kadru, zawsze w to samo miejsce; przy czekaniu, gdy żadna reguła nie pasuje, wraca na środek polany; w walce zostaje, gdzie stoi.
4. Patyki, krzak jagód i mech stoją w kadrze zawsze, także gdy na kafelku postaci ich nie ma; ognisko stoi tylko wtedy, gdy stoi na kafelku postaci: płonące z ruchomym ogniem albo wygasłe, tym samym obrazkiem bez koloru i bez ruchu (pytanie 3).
5. Ruch sceny daje CSS, w stałym takcie niezależnym od tempa gry i bez pętli rysowania: klatki zmieniają się co 160 ms, a dojście maga na miejsce trwa zawsze 640 ms; gdy cel zmieni się w drodze, mag skręca z miejsca, w którym jest; na starcie przejścia, po „Restart” i po wczytaniu gry stoi od razu na miejscu, bez przechodzenia przez kadr (pytanie 4).
6. Nad głową maga stoi mała plakietka na pełnym tle `panel`: w niej ikona bieżącej czynności, ta sama co przy regule w edytorze z zadania 5, a pod ikoną pasek postępu tej czynności, z wypełnieniem w `positive` na torze w `highlight` (pytania 6 i 13); ikona ma kolor `text-strong`, ten sam co czynność w wierszu reguły (pytanie 12). Przy czekaniu i w walce plakietki nie ma (pytania 5 i 6).
7. Obraz postaci i obraz każdego zasobu, który stoi w scenie, zapisane są w danych gry, a nie w kodzie widoku.
8. Gdy gracz wciśnie „Pauza”, scena szarzeje tą samą wartością co w starym Loop (`grayscale(1) brightness(0.5)`), a cały jej ruch, ogień i mag razem, stoi; przy zatrzymaniu na odkryciu scena zostaje kolorowa, a ruch też stoi (pytanie 1).
9. Po śmierci postaci i po rozwiązaniu mapy ruch sceny stoi, a plakietka znika; po śmierci mag jest szary, a po rozwiązaniu stoi w kolorze (pytanie 7).
10. Scena nie ma błysku całej swojej powierzchni i idzie za systemowym ustawieniem ograniczenia ruchu: wtedy klatki nie chodzą, mag staje na miejscu od razu, a pasek postępu skacze przy odczytach zamiast płynąć (pytanie 4).
11. Scena jest obrazem: kliknięcie w nią niczego nie robi i nie stoi na niej znak pauzy (pytanie 8).
12. Nowe pliki obrazków leżą w `assets/sprites/`, są obrazami PNG z samymi pikselami, a `npm run build` i obraz serwera mają każdy plik, o który prosi rysunek sceny.
13. Fundament dostaje to, co *Decisions in play* oznacza do zapisania w tym zadaniu, czyli część wpisów, którą kod zadania czyni prawdziwą, oraz wpisy z przyjętych wierszy *Settlements to record*.
14. Przewodnik stylu (`guidelines/styleguide-browser-view.md`) mówi, jak scena używa ról i wartości wyglądu: plakietka, kolor ikony w niej, pasek, szarość przy pauzie i szary mag po śmierci; jego reguła „No value in place of a design token” i strażnik `browser-view-token-values` przepuszczają klatki i pozycje obrazka; zmiany idą przez `the-way-maintain-styleguide`.
15. Tabela plików w `guidelines/coding-browser-module.md` zna nowe pliki sceny, a tabela w `guidelines/coding-content-data.md` nowe pliki danych; zmiany idą przez `the-way-maintain-coding-guidelines`.

## Foundation entries to read, each whole, at the range they have now in the worktree

The plan's names E1–E10 and Rows 1–9 are written now: E1 = D-316 (with row 3); E2 = D-317; E3 = the mage clause of D-271; E4 = D-272 (stood at the base); E5 = D-04; E6 = D-43; E7 = D-39; E8 = D-40; E9 = D-122; E10 = the invariant `loop2-container-sprites`; row 1 = D-322 and D-122; row 2 = D-318; row 4 = D-319; rows 5, 6, 9 = D-320 (and D-39, D-40, D-43); row 7 = D-321; row 8 = D-322.

- `foundations/invariants.md:1209-1217` loop2-container-sprites
- `foundations/invariants.md:344-353` loop2-container-icons
- `foundations/decisions.md:5631-5662` D-271
- `foundations/decisions.md:648-683` D-27

## Guideline files and instruction files, each whole

- `guidelines/coding.md`
- `guidelines/testing.md`

## Code and tests to read

- `foundations/part_map.md` section `deployment` (and, through the project skill `the-way-update-part-map`, the entry you change)
- `tests/invariants/test_loop2_container_icons.py`
- `tests/invariants/account_container_support.py`
- `Dockerfile`
- `.dockerignore`
- `scripts/static-files.mjs`

Edit the part map only through the project skill `the-way-update-part-map` (read `.claude/skills/the-way-update-part-map/SKILL.md`, which sends you to the pinned `.the-way`). Docker is available on this machine for the test; if the daemon does not answer, report that the invariant stayed unchecked.
