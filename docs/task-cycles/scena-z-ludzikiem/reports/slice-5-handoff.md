# Handoff — slice 5 of the task `scena-z-ludzikiem`: the scene moves

You make **a slice, or the retry of a slice** (the row of the table of `make-change` that names this). The person who requested the cycle has delegated intermediate choices to the orchestrator; you never ask the human. Send questions back in your return with the status `questions`.

- Worktree (work from its root): `C:/Storage/repos/loop2-wt/scena-z-ludzikiem`; branch `task/scena-z-ludzikiem`; pinned the-way `61c72fb` in `.the-way`. The branch holds the foundation entries already (commit `0d11c97` and earlier); your commits go on top of the head you find. The slice's base for its review: `5d12eea`.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole (project skill `the-way-make-change`); read `.the-way/task-cycle/change/slice.md` as the table's row says; read `.the-way/task-cycle/change/ui_check.md` only if the slice changes a user interface and its step names it. Read no file of the-way that your method does not name for the step you are at.
- Class of model for this slice: strongest (harness model `opus`) — motion that freezes where it is at four kinds of stop, turns on its way and survives a redraw five times a second, from CSS alone, is a design of its own. Risk of this slice (plan): none.
- Answers of the orchestrator at the start: trust boundary **yes** (`assets/sprites/**`); irreversible operation **no**. Settled: the grey of a dead mage and of an extinguished fire is `grayscale(1) brightness(0.55)`; the pause's grey is `grayscale(1) brightness(0.5)`; `SCENE_SCALE` stays 2 (672 × 304).
- You do not run the product's gate (`npm test` without arguments); you run the focused checks of the slice. The orchestrator runs the gate.
- Commits: English messages in the form of the repository's existing commits (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`); `git add <path> …` by path — never `git add -A`, `git add .`, `git commit -a`. Commit your work; leave the worktree clean.
- Report: write it to `docs/task-cycles/scena-z-ludzikiem/reports/slice-5-report.md` as `make-change` gives it; return the status, your commits, a one-line check result (naming what failed or did not run) and the report path. Every check you report carries its command and its exit code. The report holds **Searches not found or unclear:** (each thing you looked for and did not find or that was unclear, or `none`) and each reach beyond this handoff.
- Scripts: before writing any script, even a one-off, read `C:/Storage/The Brain/The Brain/.ai/rules/scripts.md`.
- Personal data: none is involved; do not put secrets or personal data in the report.

## Your slice, copied word for word from the plan

### Slice 5 — the scene moves

- **Goal:** read `src/browser/view/scene-picture.ts` of Slice 3 whole besides *Read*. The scene of
  Slice 4 moves by CSS alone, at a fixed beat that does not depend on the
  pace, with no loop of drawing — no interval, timer or animation frame of its own (E1, row 4,
  To do 5): the frames of the mage's sheets and of the burning fire change every 160 ms; the mage
  walks to its place in 640 ms on its run sheet, facing the way it walks, and stands on its idle
  sheet once there; a target changed on the way turns it from where it is; at the start of a map run
  and after „Restart” — the event `mapRunStarted` the simulation returned — and at the scene's first
  draw, after a load included, it stands at once at its place, crossing nothing; where Slice 3 says
  it stays, it keeps the place of the scene's previous reading (E5). The bar fills smoothly between
  the readings of the clock (every 200 ms, `src/browser/view/clock.ts`): its length follows each
  reading over the reading's interval, and a new action's bar starts empty without running back
  (carried question 4). Every stop — the player's pause, a discovery, a death, a completion —
  stops all motion where it is: the frames, the fire and the mage on its way (To do 8, 9; rows 1,
  8). Under the system's setting for reduced motion the frames do not change, the mage stands at its
  place at once and the bar jumps at each reading (E2, To do 10); the scene shows no flash of its
  whole area, and its grey comes at the pause with no animation. The game redraws the screen five
  times a second, so a redraw must restart no animation of the scene (D-03's accepted risk).
  `src/browser/view/run-screen.tsx` hands the events of `update` to the world area, and
  `src/browser/view/world-area.tsx` hands them to the scene; nothing new enters the game state (E5,
  D-04). Write the cases first in `tests/view/scene.test.mjs`, of what jsdom can show: a scene that
  stands at once at `mapRunStarted` and at its first draw, and walks at an ordinary change of
  activity; a place kept from the previous reading where the mage stays; a stopped scene in each of
  the four stops; a new action's bar starting empty. Then operate the built game as
  `.claude/skills/loop2-play/SKILL.md` gives and read motion from a stream of frames
  (D-254): at 1×, 4× and 16×; a pause and a discovery during a walk; a target changed during a
  walk; „Restart”; a load; and the same with reduced motion emulated in the browser. Name in the
  report what the frames show, with each file of `docs/task-cycles/scena-z-ludzikiem/frames/`
  used, and that the human's own viewing at 1×, 4× and 16× before the merge stays (Acceptance
  criteria; D-254).
- **Change:** `src/browser/view/scene.tsx` · `src/browser/styles.css` ·
  `src/browser/view/world-area.tsx` · `src/browser/view/run-screen.tsx` · `tests/view/scene.test.mjs`
- **Read:** `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:29-47` To do and Acceptance
  criteria · `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:51-55` Questions to settle,
  question 1 · `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:67-73` Questions to settle,
  question 4 · `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:86-91` Questions to settle,
  question 7 · `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:126-160` Context and Questions
  carried to cycle · `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:220-234` Settlements to
  record · E1 · E2 · E5 · E6 · Row 1 · Row 4 · Row 8 · `foundations/decisions.md:39-112` D-03 and
  D-04 · `foundations/decisions.md:899-912` D-43 · `foundations/decisions.md:1435-1446` D-75 ·
  `foundations/decisions.md:1606-1617` D-88 · `foundations/decisions.md:2205-2243` D-122 ·
  `foundations/decisions.md:1229-1242` D-62 · `foundations/decisions.md:1334-1347` D-68 · `foundations/decisions.md:2486-2510` D-132 ·
  `foundations/decisions.md:3891-3929` D-212 · `foundations/decisions.md:5150-5177` D-254 ·
  `foundations/decisions.md:5491-5563` D-267 and D-268 · `foundations/invariants.md:35-43`
  browser-view-framework · `foundations/invariants.md:459-467` browser-view-token-values ·
  `foundations/invariants.md:1189-1197` document-test-memory-limit ·
  `foundations/glossary.md:65-71` map run restart · `foundations/glossary.md:130-134` manual map run ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `src/browser/view/clock.ts` · `src/browser/sim/run.ts:62-82` · `src/browser/sim/game.ts:425-443` ·
  `src/browser/view/game-view.ts:540-556` · `tests/view/run-screen.test.mjs` ·
  `tests/view/page-document.mjs`
- **Model:** strongest — motion that freezes where it is at four kinds of stop, turns on its way and
  survives a redraw five times a second, from CSS alone, is a design of its own
- **Risk:** none
- **Checks:** `npm test -- tests/view/scene.test.mjs`, the new cases seen failing first;
  `npm test -- tests/view/run-screen.test.mjs`; `npm test -- tests/view/world-area.test.mjs`;
  `npm test -- tests/invariants/test_browser_view_token_values.py`;
  `npm test -- tests/quality/test_quality_invariants.py`; the stream of frames above
- **Depends on:** Slice 4 · E1 · E2 · E5 · E6 · Row 1 · Row 4 · Row 8

## Passages of the task your slice reads, copied word for word (file: `docs/task-cycles/scena-z-ludzikiem/task.frozen.md`)

### To do and Acceptance criteria (`task.frozen.md:29-47`)

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

### Acceptance criteria

- Przed scaleniem Mariusz ogląda scenę uruchomioną z gałęzi zadania przez `npm run local` przy 1×, 4× i 16× (pytanie 10).

### Questions to settle, question 1 (`task.frozen.md:51-55`)

- Pytanie 1. Co dzieje się ze sceną, gdy gracz sam wciśnie „Pauza”, i czym różni się to od zatrzymania przy odkryciu?
  - Answer: Pauza gracza szarzeje scenę tą samą wartością co w starym Loop i zatrzymuje cały jej ruch. Przy zatrzymaniu na odkryciu kolor zostaje, a ruch też stoi; do zadania 19 chwila odkrycia to kolorowy, nieruchomy obraz.
  - Not chosen:
    - Ogień i mag ruszają się dalej przy odkryciu — świat się rusza, choć czas gry stoi, a stary Loop celowo tego unikał.
  - Source: szarość przy pauzie i kolor przy odkryciu — cytaty, których człowiek nie skreślił (pakiet rundy, A7, 2026-11-03): „the scene greyed at a stop at a discovery, as at a pause — it would dim the moment of the reward” (definicja_mvp2_loop2.md@efc19197, wiersz 640, D-122, *Rejected*); „kolorowa pauza przy odkryciu” (tamże, wiersz 38); stary Loop: `filter: paused ? 'grayscale(1) brightness(0.5)' : undefined` (`C:\Storage\repos\loop\src\components\probe\Scene.tsx:169`, cdc7c0d). Pauza bez szarości odpadła na tych cytatach, nie z wyboru. Ruch przy odkryciu — człowiek, 2026-11-03, pakiet rundy, T30: „poza tym nie mam zastrzeżeń do rekomendacji”.

### Questions to settle, question 4 (`task.frozen.md:67-73`)

- Pytanie 4. Jak długo mag idzie na miejsce, co robi, gdy cel zmieni się w drodze, i co się dzieje przy systemowym ograniczeniu ruchu?
  - Answer: Dojście trwa zawsze 640 ms, jak w starym Loop, a klatki zmieniają się co 160 ms; przy zmianie celu mag skręca z miejsca, w którym jest; na starcie, po „Restart” i po wczytaniu stoi od razu na miejscu; przy ograniczeniu ruchu w systemie staje od razu, a pasek skacze. Koszt przyjęty: przy 16× mag często idzie jeszcze, gdy czynność się kończy.
  - Not chosen:
    - Krótszy z dwóch czasów, 640 ms albo czas czynności — długość zależy od tempa, a definicja chce rytmu niezależnego od tempa.
    - 300 ms — mag przeskakuje przez kadr.
    - Czas zależny od odległości — nie mieści się przy 16×.
  - Source: człowiek, 2026-11-03, pakiet rundy, T34: „poza tym nie mam zastrzeżeń do rekomendacji”; stary Loop `C:\Storage\repos\loop\src\components\probe\Scene.tsx:65-67` i `:121`, cdc7c0d.

### Questions to settle, question 7 (`task.frozen.md:86-91`)

- Pytanie 7. Co pokazuje scena po śmierci postaci i po rozwiązaniu mapy, zanim efekty tych chwil przyjdą w zadaniach 18 i 19?
  - Answer: Ruch sceny stoi, ikona i pasek znikają, po śmierci mag jest szary, a po rozwiązaniu stoi w kolorze. Rozwiązanie mapy nie różni się w scenie od zatrzymania.
  - Not chosen:
    - Gotowy arkusz śmierci maga — część zadania 19 przechodzi tutaj.
    - Scena jak przy pauzie gracza — koniec gry wygląda jak pauza.
  - Source: człowiek, 2026-11-03, pakiet rundy, T35: „poza tym nie mam zastrzeżeń do rekomendacji”.

### Context and Questions carried to cycle (`task.frozen.md:126-160`)

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

## Questions carried to cycle

- Czy kadr z zadania 6 zostaje tłem sceny, czy scena składa tło z osobnych plików?
- Jak pociąć arkusze maga, ognia i rekwizytów do wspólnej ramki i czy skrypt tnący wchodzi do repozytorium?
- W których plikach danych stoją miejsca rekwizytów i obraz maga?
- Jak pasek napełnia się płynnie przy odczytach co 200 ms?
- Jaki rozmiar ma plakietka nad głową? Wybiera go cykl, oglądając scenę w wybranym rozmiarze (pytanie 6); raport frajdy zaznacza, że ikona przy 16× jest czytelna, „jeśli jest duża”.

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
- `foundations/decisions.md:6829-6845` D-317
- `foundations/decisions.md:6876-6901` D-319
- `foundations/decisions.md:6959-6988` D-322
- `foundations/decisions.md:52-119` D-04
- `foundations/decisions.md:39-50` D-03
- `foundations/decisions.md:906-919` D-43
- `foundations/decisions.md:1442-1453` D-75
- `foundations/decisions.md:1613-1624` D-88
- `foundations/decisions.md:2212-2254` D-122
- `foundations/decisions.md:1236-1249` D-62
- `foundations/decisions.md:1341-1354` D-68
- `foundations/decisions.md:2497-2521` D-132
- `foundations/decisions.md:3902-3940` D-212
- `foundations/decisions.md:5161-5188` D-254
- `foundations/decisions.md:5502-5529` D-267
- `foundations/decisions.md:5531-5574` D-268
- `foundations/invariants.md:35-43` browser-view-framework
- `foundations/invariants.md:459-467` browser-view-token-values
- `foundations/invariants.md:1189-1197` document-test-memory-limit
- `foundations/glossary.md:65-71` map run restart
- `foundations/glossary.md:130-134` manual map run

## Guideline files and instruction files, each whole

- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`
- `.claude/skills/loop2-play/SKILL.md`

## Code and tests to read

- `src/browser/view/scene-picture.ts` and `src/browser/view/scene.tsx` (slices 3 and 4), whole; `src/browser/sim/data/scene.ts`; the reports `docs/task-cycles/scena-z-ludzikiem/reports/slice-3-report.md` and `slice-4-report.md` for their choices
- `src/browser/view/clock.ts`
- `src/browser/sim/run.ts:62-82` and `src/browser/sim/game.ts` where `restart` and the events are made (`mapRunStarted`)
- `src/browser/view/game-view.ts` where the screens are rendered and updated
- `src/browser/view/run-screen.tsx`, `src/browser/view/world-area.tsx`, `src/browser/styles.css` (the scene's rules)
- `tests/view/run-screen.test.mjs`, `tests/view/scene.test.mjs`, `tests/view/page-document.mjs`

## Orchestrator's notes beyond the plan's section

1. The scene of slice 4 is drawn still: the mage on the first frame of its idle sheet; the badge's bar is 4 px (twice `--bar-width`) at scale 2 and 2 px at scale 1 (slice 4 choice 4; a reviewer may question it — keep it as it is unless motion needs otherwise); the mage's places (left edge of its 64-px frame): moss 32, sticks 42, berry bush 224, fire 80, clearing 144, right edge 275 (slice 4 report, *Right edge … and mage's places*). Where the scene "stays" with no previous reading (first draw after death or in combat) slice 4 puts the mage in the clearing; this slice keeps the previous place where it has one (plan).
2. Motion is verified by an agent from a stream of frames (D-254, `loop2-play`): read that skill and follow it. A state or speed you could not reach is reported as unchecked with the reason; do not claim from a few frames that a jerk at 16× is absent — D-254 says frames can miss it. The human's own viewing at 1×, 4× and 16× before the merge stays (Acceptance criteria).
3. The scene must restart no animation at the screen's five redraws a second (D-03's accepted risk); show in the report how you checked this (a frame stream across several readings of the clock, with the CSS animation time or the element identity kept).
4. Reduced motion: emulate it in the real browser (`prefers-reduced-motion: reduce`) and report what the frames show; the jsdom tests show only classes and places.
