# Handoff — slice 3 of the task `scena-z-ludzikiem`: what the scene draws, from the data and the game state

You make **a slice, or the retry of a slice** (the row of the table of `make-change` that names this). The person who requested the cycle has delegated intermediate choices to the orchestrator; you never ask the human. Send questions back in your return with the status `questions`.

- Worktree (work from its root): `C:/Storage/repos/loop2-wt/scena-z-ludzikiem`; branch `task/scena-z-ludzikiem`; pinned the-way `61c72fb` in `.the-way`. The branch holds the foundation entries already (commit `0d11c97` and earlier); your commits go on top of the head you find. The slice's base for its review: `bd7216b`.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole (project skill `the-way-make-change`); read `.the-way/task-cycle/change/slice.md` as the table's row says; read `.the-way/task-cycle/change/ui_check.md` only if the slice changes a user interface and its step names it. Read no file of the-way that your method does not name for the step you are at.
- Class of model for this slice: cheaper (harness model: the cheapest, `haiku`). Risk of this slice (plan): none.
- Answers of the orchestrator at the start: trust boundary **yes** (`assets/sprites/**`); irreversible operation **no**. Settled: the grey of a dead mage and of an extinguished fire is `grayscale(1) brightness(0.55)`; the pause's grey is `grayscale(1) brightness(0.5)`; `SCENE_SCALE` stays 2 (672 × 304).
- You do not run the product's gate (`npm test` without arguments); you run the focused checks of the slice. The orchestrator runs the gate.
- Commits: English messages in the form of the repository's existing commits (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`); `git add <path> …` by path — never `git add -A`, `git add .`, `git commit -a`. Commit your work; leave the worktree clean.
- Report: write it to `docs/task-cycles/scena-z-ludzikiem/reports/slice-3-report.md` as `make-change` gives it; return the status, your commits, a one-line check result (naming what failed or did not run) and the report path. Every check you report carries its command and its exit code. The report holds **Searches not found or unclear:** (each thing you looked for and did not find or that was unclear, or `none`) and each reach beyond this handoff.
- Scripts: before writing any script, even a one-off, read `C:/Storage/The Brain/The Brain/.ai/rules/scripts.md`.
- Personal data: none is involved; do not put secrets or personal data in the report.

## Your slice, copied word for word from the plan

### Slice 3 — what the scene draws, from the data and the game state

- **Goal:** a new data file `src/browser/sim/data/scene.ts` holds the scene's pictures and places
  (D-18, E1; content-identifiers keeps them out of the view): the background, `forest-scene.png`
  of D-314, and the frame of 336 × 152 pixels in which every place is given; the mage's idle and run
  sheets keyed by `ArchetypeId` — file, frame size and number of frames (4 and 6), as the files of
  Slice 1 give them; the fire's sheet (4 frames) with its place and the place the mage stands at it;
  a prop for each of the stick, the berry and the moss, keyed by `ResourceId`, with its file, size,
  place and the place the mage stands at it — the fibre has none, so at it the mage stays (To do 3);
  the clearing and the right edge, one place each. The places carry the layout of the old Loop's
  scene, C:\Storage\repos\loop\src\components\probe\Scene.tsx lines 44-58 at cdc7c0d (in pixels of
  the frame: moss at 40, the mage at 26; sticks at 80, the mage at 58; bush at 252, the mage at 240;
  fire at 124, the mage at 96; clearing 160; right edge 292; ground line 136), which the background
  of task 6 follows; a place found not to fit that background is moved and named in the report. The
  file follows the exemplar `src/browser/sim/data/resources.ts` (`satisfies`, identifiers from
  `keyof typeof`) and imports simulation files alone.
  A new pure module `src/browser/view/scene-picture.ts`, on the model of
  `src/browser/view/terrain-picture.ts`, gives from a game state holding its map run plain data for
  drawing, with no DOM:
  - where the mage goes (To do 3, row 2): „Zbierz” and „Obchód” to the place at the prop of their
    target resource, and stays for a target with no prop; „Wytwórz — ognisko”, „Zapal — ognisko”
    and „Zasil — ognisko” to the place at the fire; „Zapal — patyk” and „Zjedz” stays; „Eksploruj”,
    „Wędruj”, „Idź” and „Idź — ognisko” to the right edge, always the same place; waiting to the
    clearing; in combat (no current activity) and after a death or a completion it stays. „Stays”
    is a value of its own: the place is left to the scene's previous reading (Slice 5), the
    clearing where there is none;
  - the mage's sheets, from the data by the archetype of the map run's character in the team;
  - the props, always (To do 4, row 3), and the fire only while a campfire stands on the
    character's tile, burning while it has minutes left and extinguished otherwise (D-68);
  - the badge: the icon file of the current action, the one the row of the rule shows
    (`ACTIONS[kind].icon`, D-291), and the progress of the action, the game minutes passed since its
    start with the fraction `realMsCarry` holds over its length in game minutes, from 0 to 1; no
    badge while waiting, in combat, after a death and after a completion (To do 6, 9; rows 5, 8);
  - how the scene stands: going; stopped by the player's pause (`paused` with no `discovery`),
    grey; stopped at a discovery (`discovery` held), in colour (E9); after a death, stopped with the
    mage grey; after a completion, stopped in colour (To do 8, 9; rows 1, 8). A loaded map run comes
    back paused (D-212), so grey.
  Every URL of a sprite is built from the data under `/sprites/`. No identifier or name of a map, a
  resource or an archetype stands in the module (content-identifiers).
  Write the cases first in a new `tests/view/scene-picture.test.mjs`, unit tests with the expected
  values written out: a case for each line of the table of To do 3, the place expected written as
  the prop of the target the task names; the props in a map run with none on the character's tile;
  the fire absent, burning and extinguished; the badge's icon the file of the rule's row for each
  action; the progress at the start, midway with a carry and at the end; no badge while waiting, in
  combat, after a death and after a completion; each way the scene stands; and a case marked with
  `loop2-container-sprites` that every file the scene's data names stands directly in
  `assets/sprites/` as a `.png` file, as `tests/view/icons.test.mjs` checks that each icon the data
  names exists as a file.
- **Change:** `src/browser/sim/data/scene.ts` · `src/browser/view/scene-picture.ts` ·
  `tests/view/scene-picture.test.mjs`
- **Read:** `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:29-43` To do ·
  `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:51-66` Questions to settle, questions 1-3 ·
  `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:74-79` Questions to settle, question 5 ·
  `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:86-91` Questions to settle, question 7 ·
  `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:126-152` Context ·
  `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:220-234` Settlements to record ·
  E1 · E9 · E10 · Row 1 · Row 2 · Row 3 · Row 5 · Row 8 ·
  `foundations/decisions.md:52-112` D-04 · `foundations/decisions.md:383-400` D-18 ·
  `foundations/decisions.md:1229-1242` D-62 · `foundations/decisions.md:1334-1347` D-68 ·
  `foundations/decisions.md:2205-2243` D-122 · `foundations/decisions.md:2486-2510` D-132 ·
  `foundations/decisions.md:3891-3929` D-212 · `foundations/decisions.md:5620-5645` D-271 ·
  `foundations/decisions.md:6184-6207` D-291 · `foundations/decisions.md:6737-6754` D-314 ·
  `foundations/invariants.md:214-246` simulation-isolation, simulation-inputs and
  content-identifiers · `foundations/glossary.md:18-23` map run ·
  `foundations/glossary.md:80-85` extinguished campfire · `foundations/glossary.md:111-115`
  archetype · `foundations/glossary.md:136-140` completion · `foundations/part_map.md:3-60`
  browser-view and simulation · `guidelines/coding.md` · `guidelines/coding-content-data.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `src/browser/view/terrain-picture.ts` ·
  `src/browser/sim/data/resources.ts` · `src/browser/sim/data/campfire.ts` ·
  `src/browser/sim/data/archetypes.ts` · `src/browser/sim/data/actions.ts` ·
  `src/browser/sim/types.ts:150-284` · `src/browser/sim/types.ts:352-434` ·
  `src/browser/view/rule-list.tsx:476-487` · `tests/view/terrain-picture.test.mjs` ·
  `tests/view/icons.test.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/scene-picture.test.mjs`, seen failing before the modules
  exist; `npm test -- tests/invariants/test_content_identifiers.py`;
  `npm test -- tests/invariants/test_simulation_isolation.py`;
  `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 1 · E1 · E9 · E10 · Row 1 · Row 2 · Row 3 · Row 5 · Row 8

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

### Questions to settle, questions 1-3 (`task.frozen.md:51-66`)

- Pytanie 1. Co dzieje się ze sceną, gdy gracz sam wciśnie „Pauza”, i czym różni się to od zatrzymania przy odkryciu?
  - Answer: Pauza gracza szarzeje scenę tą samą wartością co w starym Loop i zatrzymuje cały jej ruch. Przy zatrzymaniu na odkryciu kolor zostaje, a ruch też stoi; do zadania 19 chwila odkrycia to kolorowy, nieruchomy obraz.
  - Not chosen:
    - Ogień i mag ruszają się dalej przy odkryciu — świat się rusza, choć czas gry stoi, a stary Loop celowo tego unikał.
  - Source: szarość przy pauzie i kolor przy odkryciu — cytaty, których człowiek nie skreślił (pakiet rundy, A7, 2026-11-03): „the scene greyed at a stop at a discovery, as at a pause — it would dim the moment of the reward” (definicja_mvp2_loop2.md@efc19197, wiersz 640, D-122, *Rejected*); „kolorowa pauza przy odkryciu” (tamże, wiersz 38); stary Loop: `filter: paused ? 'grayscale(1) brightness(0.5)' : undefined` (`C:\Storage\repos\loop\src\components\probe\Scene.tsx:169`, cdc7c0d). Pauza bez szarości odpadła na tych cytatach, nie z wyboru. Ruch przy odkryciu — człowiek, 2026-11-03, pakiet rundy, T30: „poza tym nie mam zastrzeżeń do rekomendacji”.
- Pytanie 2. Dokąd w scenie idzie mag przy każdej czynności?
  - Answer: Jak w *To do* 3: Zbierz i Obchód do patyków, krzaka albo mchu, przy włóknie stoi; Wytwórz, Zapal i Zasil ognisko do ogniska; Zapal patyk stoi, wbrew staremu Loop, w którym szedł do ogniska; Eksploruj, Wędruj, Idź i Idź — ognisko do prawego brzegu kadru; Zjedz stoi; czekanie na środek polany; walka stoi do zadania 20. Prawy brzeg nie mówi, w którą stronę mag idzie naprawdę po mapie.
  - Not chosen:
    - Tylko patyki i ognisko, a przy reszcie mag stoi — mniej niż w starym Loop, a „Eksploruj” nie daje ruchu.
  - Source: człowiek, 2026-11-03, pakiet rundy, T32: „poza tym nie mam zastrzeżeń do rekomendacji”; plan_mvp2_loop2.md@54d8d854, wiersz 18: „mag chodzi do patyków i ogniska”; stary Loop `C:\Storage\repos\loop\src\components\probe\Scene.tsx:77-95`, cdc7c0d.
- Pytanie 3. Co stoi w kadrze poza drzewami: czy patyki, krzak i mech stoją zawsze, także gdy na kafelku postaci ich nie ma, i kiedy stoi ognisko?
  - Answer: Patyki, krzak i mech stoją zawsze, a ognisko tylko wtedy, gdy stoi na kafelku postaci, płonące albo wygasłe. W Lesie scena pokazuje więc rzeczy, których na kafelku nie ma; liczby dalej podają tabela i linia pod mapą.
  - Not chosen:
    - Rekwizyt tylko wtedy, gdy zasób leży na kafelku postaci — kawałek wyłączonej pozycji F7 (scena pokazująca kafelek postaci) wchodzi do projektu, a kadr zmienia się przy „Eksploruj” bez przejścia.
    - Bez rekwizytów — mag nie chodzi do patyków.
  - Source: człowiek, 2026-11-03, pakiet rundy, T33: „poza tym nie mam zastrzeżeń do rekomendacji”; wygasłe ognisko jako ten sam obrazek bez koloru: stary Loop, `C:\Storage\repos\loop\src\components\probe\Scene.tsx:210`, cdc7c0d („wygaszone jest tym samym sprite'em bez koloru”).

### Questions to settle, question 5 (`task.frozen.md:74-79`)

- Pytanie 5. Co pokazuje ikona nad głową: czynność czy rzecz, której czynność dotyczy, i co stoi nad głową przy czekaniu i w walce?
  - Answer: Ikonę czynności, tę samą co przy regule, bo jedna czynność ma w grze jedną ikonę; zbieranie patyka i jagody wygląda nad głową tak samo, a różnicę widać po tym, dokąd mag poszedł. Przy czekaniu nie ma ikony ani paska, bo przy 16× czekanie trwa 0,06 s. W walce nie ma ikony do zadania 20, więc przez 5 minut gry mag stoi bez znaku. Wszystkie 11 ikon czynności przynosi zadanie 5, więc to zadanie nie dokłada plików ikon.
  - Not chosen:
    - Ikona rzeczy, gdy czynność ma cel — „Idź — patyk” i „Zbierz — patyk” wyglądają tak samo.
    - Ikona walki z paskiem do minuty rozstrzygnięcia — ikona, której zadanie 20 może nie zostawić.
  - Source: człowiek, 2026-11-03, pakiet rundy, B9, ikona nad głową a, c i bez ikony przy czekaniu: „poza tym nie mam zastrzeżeń do rekomendacji”; plan_mvp2_loop2.md@54d8d854, dziennik zmian, linia z 2026-11-03 o D-43.

### Questions to settle, question 7 (`task.frozen.md:86-91`)

- Pytanie 7. Co pokazuje scena po śmierci postaci i po rozwiązaniu mapy, zanim efekty tych chwil przyjdą w zadaniach 18 i 19?
  - Answer: Ruch sceny stoi, ikona i pasek znikają, po śmierci mag jest szary, a po rozwiązaniu stoi w kolorze. Rozwiązanie mapy nie różni się w scenie od zatrzymania.
  - Not chosen:
    - Gotowy arkusz śmierci maga — część zadania 19 przechodzi tutaj.
    - Scena jak przy pauzie gracza — koniec gry wygląda jak pauza.
  - Source: człowiek, 2026-11-03, pakiet rundy, T35: „poza tym nie mam zastrzeżeń do rekomendacji”.

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

### Settlements to record (`task.frozen.md:220-234`)

## Settlements to record

Candidates: 11 shown, 9 accepted — 2026-11-03

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Pauza gracza szarzeje scenę (`grayscale(1) brightness(0.5)`, jak stary Loop) i zatrzymuje cały jej ruch; przy zatrzymaniu na odkryciu scena zostaje kolorowa, a ruch też stoi. | decision | pytanie 1 | czy przy odkryciu ogień i mag dalej się ruszają, i czy pauza gracza w ogóle szarzeje scenę, skoro wiążące zdanie D-122 mówi tylko o kolorze przy odkryciu |
| 2 | Mag idzie tam, dokąd prowadzi go bieżąca czynność, według przypisania z *To do* 3: do patyków, krzaka albo mchu przy zbieraniu, do ogniska przy jego czynnościach, do prawego brzegu kadru przy ruchu po mapie, na środek polany przy czekaniu, a przy włóknie, „Zapal — patyk”, „Zjedz” i w walce zostaje, gdzie stoi. | decision | pytanie 2 | dokąd mag idzie przy czynnościach, których plan nie nazywa; bez wiersza zadania 17 i 20 mogą je przestawić, a „Zapal — patyk” wróci do ogniska jak w starym Loop |
| 3 | Patyki, krzak i mech stoją w kadrze zawsze, także gdy na kafelku postaci ich nie ma, a ognisko tylko wtedy, gdy stoi na kafelku postaci, płonące albo wygasłe. | decision | pytanie 3 | czy rekwizyt znika, gdy zasobu nie ma na kafelku, czyli kawałek wyłączonej pozycji F7 |
| 4 | Dojście maga trwa zawsze 640 ms, a klatki zmieniają się co 160 ms, przy każdym tempie; to ruch postaci, a nie efekt zwykłego zdarzenia, więc limit 300 ms go nie obejmuje; przy zmianie celu mag skręca z miejsca, a na starcie, po „Restart”, po wczytaniu i przy systemowym ograniczeniu ruchu staje na miejscu od razu. | decision | pytanie 4 | czy dojście dłuższe niż 300 ms łamie wpis o efektach — recenzent zmiany albo zadania 17 i 19 skróciłyby je do 300 ms albo uzależniły od tempa |
| 5 | Przy czekaniu nad głową maga nie ma ani ikony, ani paska, a w walce ikony nie ma do zadania 20. | decision | pytanie 5; zasadę, że nad głową stoi ta sama ikona czynności co przy regule, niesie wiersz 3 tabeli zadania 5 (`edytor_programu_loop2.md`), który zapisuje cykl zadania 5 | czy przy czekaniu i w walce stoi nad głową jakiś znak — ikona czekania, która przy 16× miga, albo ikona walki postawiona przed zadaniem 20 |
| 6 | Ikona i pasek nad głową stoją na plakietce z pełnym tłem `panel`, nigdy wprost na obrazie lasu, a pasek ma wypełnienie w `positive` na torze w `highlight`. | decision | pytanie 6; rola paska wobec D-39 według pytania 13 | czy ikona i pasek mogą stać wprost na obrazie, skoro D-272 mówi o pełnym tle tylko dla tekstu, i jakie role bierze pasek |
| 7 | Scena jest obrazem: kliknięcie w nią niczego nie robi i nie stoi na niej znak pauzy, choć w starym Loop cała scena była przyciskiem pauzy. | decision | pytanie 8 | czy przenieść ze starego Loop pauzę kliknięciem w scenę i znak pauzy, skoro stary Loop jest minimum |
| 8 | Do zadań 18 i 19 po śmierci postaci i po rozwiązaniu mapy ruch sceny stoi, a ikona i pasek znikają; po śmierci mag jest szary, a po rozwiązaniu stoi w kolorze. | decision | pytanie 7; pytanie kontrolne E5 (pakiet 2, 2026-11-03): człowiek nie zmienił wyboru | co scena pokazuje po końcu przejścia, na przykład żywego maga z paskiem niedokończonej czynności, i czy użyć arkusza śmierci z zadania 19 |
| 9 | Ikona czynności w plakietce nad głową maga ma mocny kolor `text-strong`, choć obok niej nie stoi tekst, więc wygląda jak ta sama ikona w działającym wierszu reguły i jak ikony na rysunku mapy. | decision | pytanie 12; pytanie przeciw wyborowi, pakiet 3, G1, droga A (2026-11-03) | jaki kolor dać ikonie bez tekstu obok: D-40 pozwala rolom tekstu stać tylko „as text”, a D-43 daje ikonie maski kolor „from the text beside it”, więc cykl albo zadanie 24, które zapisuje D-43, mogłoby przestawić ją na `text` jak w niewybranej komórce panelu albo zostawić bez zasady |

## Foundation entries to read, each whole, at the range they have now in the worktree

The plan's names E1–E10 and Rows 1–9 are written now: E1 = D-316 (with row 3); E2 = D-317; E3 = the mage clause of D-271; E4 = D-272 (stood at the base); E5 = D-04; E6 = D-43; E7 = D-39; E8 = D-40; E9 = D-122; E10 = the invariant `loop2-container-sprites`; row 1 = D-322 and D-122; row 2 = D-318; row 4 = D-319; rows 5, 6, 9 = D-320 (and D-39, D-40, D-43); row 7 = D-321; row 8 = D-322.

- `foundations/decisions.md:6793-6827` D-316
- `foundations/decisions.md:6847-6874` D-318
- `foundations/decisions.md:6903-6936` D-320
- `foundations/decisions.md:6959-6988` D-322
- `foundations/decisions.md:2212-2254` D-122
- `foundations/invariants.md:1209-1217` loop2-container-sprites
- `foundations/decisions.md:52-119` D-04
- `foundations/decisions.md:390-407` D-18
- `foundations/decisions.md:1236-1249` D-62
- `foundations/decisions.md:1341-1354` D-68
- `foundations/decisions.md:2497-2521` D-132
- `foundations/decisions.md:3902-3940` D-212
- `foundations/decisions.md:5631-5662` D-271
- `foundations/decisions.md:6201-6224` D-291
- `foundations/decisions.md:6754-6771` D-314
- `foundations/invariants.md:214-224` simulation-isolation
- `foundations/invariants.md:226-234` simulation-inputs
- `foundations/invariants.md:236-246` content-identifiers
- `foundations/glossary.md:18-23` map run
- `foundations/glossary.md:80-85` extinguished campfire
- `foundations/glossary.md:111-115` archetype
- `foundations/glossary.md:136-140` completion

## Guideline files and instruction files, each whole

- `guidelines/coding.md`
- `guidelines/coding-content-data.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`

## Code and tests to read

- `foundations/part_map.md:3-60` browser-view and simulation
- `src/browser/view/terrain-picture.ts`
- `src/browser/sim/data/resources.ts`
- `src/browser/sim/data/campfire.ts`
- `src/browser/sim/data/archetypes.ts`
- `src/browser/sim/data/actions.ts`
- `src/browser/sim/types.ts` (the run, `run.current`, `state.discovery`, the map run, its events)
- `src/browser/view/rule-list.tsx` around where a rule row draws its action's icon
- `tests/view/terrain-picture.test.mjs`
- `tests/view/icons.test.mjs`
- the six sprite files in `assets/sprites/` (their sizes and frame counts are in `docs/task-cycles/scena-z-ludzikiem/reports/slice-1-report.md`)

The sprite files exist already (slice 1); the container test (slice 2) ties `assets/sprites/*.png` to the served path. Take the frame sizes and counts from slice 1's report, not from memory: mage idle sheet `mage-idle.png` is 256 × 64 (four 64 × 64 frames), run sheet `mage-run.png` 384 × 64 (six 64 × 64 frames), `fire.png` 128 × 32 (four 32 × 32 frames), `sticks.png` 22 × 13, `berry-bush.png` 29 × 27, `moss.png` 12 × 9.
