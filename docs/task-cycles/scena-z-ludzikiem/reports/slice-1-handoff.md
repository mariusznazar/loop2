# Handoff — slice 1 of the task `scena-z-ludzikiem`: the scene's sprite files

You make **a slice, or the retry of a slice** (the row of the table of `make-change` that names this). The person who requested the cycle has delegated intermediate choices to the orchestrator; you never ask the human. Send questions back in your return with the status `questions`.

- Worktree (work from its root): `C:/Storage/repos/loop2-wt/scena-z-ludzikiem`; branch `task/scena-z-ludzikiem`; pinned the-way `61c72fb` in `.the-way`. The branch holds the foundation entries already (commit `0d11c97` and earlier); your commits go on top of the head you find. The slice's base for its review: `8f9e713 (shared with the foundation entries; the review of this slice covers them)`.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole (project skill `the-way-make-change`); read `.the-way/task-cycle/change/slice.md` as the table's row says; read `.the-way/task-cycle/change/ui_check.md` only if the slice changes a user interface and its step names it. Read no file of the-way that your method does not name for the step you are at.
- Class of model for this slice: cheaper (harness model: the cheapest, `haiku`). Risk of this slice (plan): trust boundary — `assets/sprites/**`.
- Answers of the orchestrator at the start: trust boundary **yes** (`assets/sprites/**`); irreversible operation **no**. Settled: the grey of a dead mage and of an extinguished fire is `grayscale(1) brightness(0.55)`; the pause's grey is `grayscale(1) brightness(0.5)`; `SCENE_SCALE` stays 2 (672 × 304).
- You do not run the product's gate (`npm test` without arguments); you run the focused checks of the slice. The orchestrator runs the gate.
- Commits: English messages in the form of the repository's existing commits (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`); `git add <path> …` by path — never `git add -A`, `git add .`, `git commit -a`. Commit your work; leave the worktree clean.
- Report: write it to `docs/task-cycles/scena-z-ludzikiem/reports/slice-1-report.md` as `make-change` gives it; return the status, your commits, a one-line check result (naming what failed or did not run) and the report path. Every check you report carries its command and its exit code. The report holds **Searches not found or unclear:** (each thing you looked for and did not find or that was unclear, or `none`) and each reach beyond this handoff.
- Scripts: before writing any script, even a one-off, read `C:/Storage/The Brain/The Brain/.ai/rules/scripts.md`.
- Personal data: none is involved; do not put secrets or personal data in the report.

## Your slice, copied word for word from the plan

### Slice 1 — the scene's sprite files

- **Goal:** `assets/sprites/` holds six new PNG files of the pack Pixel Crawler, each holding pixels
  alone — no chunk but `IHDR`, `PLTE` and `tRNS` where the pixels need them, `IDAT` and `IEND`, so no
  text, time, gamma, colour-profile or physical-size chunk (D-271, sprite-file-content):
  `mage-idle.png` and `mage-run.png`, the pack's mage, cut from
  C:\Storage\repos\loop\assets\pixel-crawler\Entities\Npc's\Wizzard\Idle\Idle-Sheet.png (128 × 32,
  four frames of 32 × 32) and ...\Wizzard\Run\Run-Sheet.png (384 × 64, six frames of 64 × 64), each
  into one row of its frames, both sheets in one common frame size, the figure aligned to the bottom
  and centred in it, so that it does not jump when the scene switches between the two (task
  *Context*, the line on the pack's different frames), the mage facing as the pack draws it; and
  `fire.png`, `sticks.png`, `berry-bush.png` and `moss.png`, taken from the old Loop's cut pictures
  C:\Storage\repos\loop\public\sprites\fire.png (128 × 32, four frames of 32 × 32), sticks.png,
  bush.png and moss.png, which today hold `IHDR`, `IDAT` and `IEND` alone: copy them unchanged where
  their chunks still show that. Confirm that each picture is of Pixel Crawler — the fire likely from
  the pack's Environment\Structures\Stations\Bonfire, the props from its environment pictures under
  C:\Storage\repos\loop\assets\pixel-crawler\ — and name the source of each in the report; a picture
  not traced to the pack stays out and is named there (D-271: a picture drawn from another pack
  violates it). Cut with a one-off Python script using Pillow, kept in
  `docs/task-cycles/scena-z-ludzikiem/sprites/`, which git ignores; no script, image library or
  dependency enters the repository. Before writing the script read
  C:\Storage\The Brain\The Brain\.ai\rules\scripts.md. The build is not changed: it copies every
  PNG file directly in `assets/sprites/` (`copySpriteFiles`), so the files stand directly there, in
  no subdirectory. In `README.md`, where the sentence of `npm run build` names
  `assets/sprites/login-backdrop.png` and `assets/sprites/forest-scene.png` as composed from
  pictures of Pixel Crawler by Anokolisa whose terms ask for no credit, name the new pictures the
  same way. View each file. The report names, for each file, its source, its frame size and number
  of frames, the chunks it holds, and the script's path and the command that ran it.
- **Change:** `assets/sprites/mage-idle.png` · `assets/sprites/mage-run.png` ·
  `assets/sprites/fire.png` · `assets/sprites/sticks.png` · `assets/sprites/berry-bush.png` ·
  `assets/sprites/moss.png` · `README.md`
- **Read:** `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:29-43` To do ·
  `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:126-152` Context ·
  `foundations/decisions.md:5620-5645` D-271 · `foundations/decisions.md:5674-5703` D-273 ·
  `foundations/decisions.md:6737-6774` D-314 and D-315 · `foundations/invariants.md:1199-1207`
  sprite-file-content · `foundations/part_map.md:3-28` browser-view · E3 ·
  `scripts/static-files.mjs` · `guidelines/styleguide-browser-view.md`
- **Model:** cheaper
- **Risk:** trust boundary — `assets/sprites/**`
- **Checks:** the one-off script of `docs/task-cycles/scena-z-ludzikiem/sprites/` run with
  `python -I`, listing the chunk types and the size of each new file; `npm run build`, then
  `git diff --no-index --stat assets/sprites dist/public/sprites` exiting 0, each file copied
  unchanged
- **Depends on:** E3

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

### Context (`task.frozen.md:126-152`)

## Context

- Numery wierszy kodu loop2 są z 20d804b; pliki symulacji, zegara i danych nie zmieniły się od 799d1ff, a przesuną się po zadaniach 4, 5 i 6.
- Bieżąca czynność, jej początek i koniec stoją w `run.current` (`src/browser/sim/types.ts:184`), więc ani ikona, ani pasek nie wymagają zmiany stanu gry.
- W walce `run.current` jest puste (`src/browser/sim/types.ts:260`).
- Zatrzymanie przy odkryciu różni się od pauzy gracza polem `state.discovery`, ustawianym razem z pauzą i czyszczonym przy pójściu dalej (`src/browser/sim/types.ts:414`, `src/browser/sim/game.ts:422`, `:693`), a pole to przechodzi przez zapis gry (`src/browser/sim/saved-game.ts:1209`).
- Zatwierdzona definicja mówi przy D-122: „Accepted with it: a stop at a discovery cannot be told apart in the game state from the player's pause.” Kod przeczy temu zdaniu przez pole `state.discovery`, a scena opiera na tym polu *To do* 8; zdanie poprawia zadanie 16, które zapisuje D-122 (dziennik planu, uwaga dla zadania 16 z 2026-11-03).
- Zegar widoku czyta czas co 200 ms (`src/browser/view/clock.ts:60`), więc płynność ruchu i paska musi dać CSS.
- Styl gry nie ma dziś żadnej animacji ani przejścia.
- Kontrast według wzoru WCAG przy wartościach `src/browser/tokens.css` z 20d804b: `positive` (#00bc7d) wobec `panel` (#18181b) 7,16:1 i wobec `highlight` (#27272a) 6,02:1, a `text-strong` (#f4f4f5) wobec `panel` 16,12:1, więc pasek mieści się w progu 3:1 z pytania 13, a ikona stoi na plakietce z dużym zapasem.
- Ikony gry mają dziś w plikach kolor #f4f4f5, wartość `text-strong` (`assets/icons/*.svg`, `src/browser/tokens.css:21`), a na rysunku mapy stoją bez tekstu obok (`src/browser/view/terrain-picture.ts:110-115`).
- Czasy czynności stoją w `src/browser/sim/data/actions.ts`: zbieranie 10 minut gry, eksploracja i wytwarzanie ogniska 20, zapalanie, zasilanie i jedzenie 5, obchód 40.
- Dojście maga to ruch postaci, nie efekt zwykłego zdarzenia: ruch daje zdanie „Motion comes from CSS at a fixed beat that does not depend on the pace, with no loop of drawing.” wpisu o tym, co pokazuje scena, a limit 300 ms ze zdania „An effect of an ordinary event lasts at most 300 ms” wpisu o efektach go nie obejmuje (pytanie 4; uwaga niezależnej krytyki planu, obserwacja 8).
- Scena starego Loop to `C:\Storage\repos\loop\src\components\probe\Scene.tsx`, a jej arkusze `C:\Storage\repos\loop\src\components\probe\sprites.tsx`; zakaz czytania kodu interfejsu Loop z definicji MVP w tym projekcie nie obowiązuje (definicja, Inputs and constraints).
- Widoki starego Loop są „punktem wyjścia i minimum”, a projekt odchodzi od nich „tylko wtedy, gdy wychodzi lepiej, nigdy gorzej” (definicja, Inputs and constraints); odejścia tego zadania przyjął człowiek: „Zapal — patyk” bez dojścia (pytanie 2) i scena bez kliknięcia (pytanie 8).
- Mag leży w `C:\Storage\repos\loop\assets\pixel-crawler\Entities\Npc's\Wizzard\`: `Idle-Sheet.png` ma 128 × 32, `Run-Sheet.png` 384 × 64, `Death-Sheet.png` 384 × 32 (odczytane 2026-11-03).
- Bezczynność i bieg mają w paczce różne ramki, więc bez wspólnej ramki postać podskakuje przy przełączeniu (`C:\Storage\repos\loop\assets\README.md`, „Zanim czegokolwiek użyjesz”).
- Arkusze paczki mają w pliku kawałek `sRGB`, a D-271 dopuszcza tylko same piksele, więc plik sceny powstaje na nowo, a nie jako kopia arkusza.
- Wycięte obrazki starego Loop leżą w `C:\Storage\repos\loop\public\sprites\` i mają same piksele, wśród nich las w śniegu (`tree_snow.png`, `sap_snow.png`), ale `char_idle.png` i `char_walk.png` to łotrzyk, a nie mag (`rozpoznanie_mvp2\rozpoznanie_frajda.md`, wiersz 92).
- `rozpoznanie_mvp2\rozpoznanie_frajda.md` jest materiałem, a nie zatwierdzonym wymaganiem.
- Drogę plików do obrazu serwera otworzyło zadanie 3: `copySpriteFiles` w `scripts/static-files.mjs:35` i `.dockerignore`; kolejny plik PNG nie kończy czasowego odstępstwa D-273, więc zadanie nie dodaje testu odmowy.
- Paczka Pixel Crawler nie wymaga wzmianki (`pixel-crawler-terms`).
- Wszystkie 11 ikon czynności, pole ikony w danych czynności i rysowanie ikon maską przynosi zadanie 5; to zadanie nie dodaje plików do `assets/icons/` i wyszło z wierszy D-27 i `icon-credits` planu (dziennik zmian planu, linia z 2026-11-03 o D-43).
- Niezmiennik `content-identifiers` zabrania nazywać zasoby i archetypy w kodzie widoku, więc miejsca rekwizytów i obrazy stoją w plikach `src/browser/sim/data/`.
- Scena nie staje na stronie wszystkich stanów, bo ta nie rysuje gry ze stanu gry (D-45).
- Definicja notuje ryzyko przyjęte przy React: „a rebuilt node may restart a CSS animation and make the figure shake” (D-03, definicja), a zegar odświeża ekran 5 razy na sekundę, więc to ryzyko sprawdza się na tej scenie.
- Ruch agent czyta ze strumienia klatek (D-254, `.claude/skills/loop2-play/SKILL.md`), a D-254 notuje, że „an agent judging motion from a few frames may report that a scene works while a person sees it jerk at 16×”.

## Foundation entries to read, each whole, at the range they have now in the worktree

The plan's names E1–E10 and Rows 1–9 are written now: E1 = D-316 (with row 3); E2 = D-317; E3 = the mage clause of D-271; E4 = D-272 (stood at the base); E5 = D-04; E6 = D-43; E7 = D-39; E8 = D-40; E9 = D-122; E10 = the invariant `loop2-container-sprites`; row 1 = D-322 and D-122; row 2 = D-318; row 4 = D-319; rows 5, 6, 9 = D-320 (and D-39, D-40, D-43); row 7 = D-321; row 8 = D-322.

- `foundations/decisions.md:5631-5662` D-271
- `foundations/decisions.md:5691-5720` D-273
- `foundations/decisions.md:6754-6771` D-314
- `foundations/decisions.md:6773-6791` D-315
- `foundations/invariants.md:1199-1207` sprite-file-content

## Guideline files and instruction files, each whole

- `guidelines/styleguide-browser-view.md`

## Code and tests to read

- `scripts/static-files.mjs`
- `foundations/part_map.md:3-28` browser-view
- `README.md` (the sentence of `npm run build` that names the two existing sprite files)

The one-off script and its outputs for inspection live under `docs/task-cycles/scena-z-ludzikiem/sprites/`, which git ignores; the Python interpreter for the script is invoked as `python -I`. Python with Pillow: if `import PIL` fails, report it and install nothing into the repository; Pillow may be installed into `.runs/quality-venv` or another ignored place and the report must say what you ran.
