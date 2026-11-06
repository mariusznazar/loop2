# Handoff — slice 4 of the task `scena-z-ludzikiem`: the scene drawn still

You make **a slice, or the retry of a slice** (the row of the table of `make-change` that names this). The person who requested the cycle has delegated intermediate choices to the orchestrator; you never ask the human. Send questions back in your return with the status `questions`.

- Worktree (work from its root): `C:/Storage/repos/loop2-wt/scena-z-ludzikiem`; branch `task/scena-z-ludzikiem`; pinned the-way `61c72fb` in `.the-way`. The branch holds the foundation entries already (commit `0d11c97` and earlier); your commits go on top of the head you find. The slice's base for its review: `73564b5`.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole (project skill `the-way-make-change`); read `.the-way/task-cycle/change/slice.md` as the table's row says; read `.the-way/task-cycle/change/ui_check.md` only if the slice changes a user interface and its step names it. Read no file of the-way that your method does not name for the step you are at.
- Class of model for this slice: same (harness model `sonnet`) — it lays the sprites out at two scales under the token rule and picks the badge's size by viewing the running game. Risk of this slice (plan): none.
- Answers of the orchestrator at the start: trust boundary **yes** (`assets/sprites/**`); irreversible operation **no**. Settled: the grey of a dead mage and of an extinguished fire is `grayscale(1) brightness(0.55)`; the pause's grey is `grayscale(1) brightness(0.5)`; `SCENE_SCALE` stays 2 (672 × 304).
- You do not run the product's gate (`npm test` without arguments); you run the focused checks of the slice. The orchestrator runs the gate.
- Commits: English messages in the form of the repository's existing commits (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`); `git add <path> …` by path — never `git add -A`, `git add .`, `git commit -a`. Commit your work; leave the worktree clean.
- Report: write it to `docs/task-cycles/scena-z-ludzikiem/reports/slice-4-report.md` as `make-change` gives it; return the status, your commits, a one-line check result (naming what failed or did not run) and the report path. Every check you report carries its command and its exit code. The report holds **Searches not found or unclear:** (each thing you looked for and did not find or that was unclear, or `none`) and each reach beyond this handoff.
- Scripts: before writing any script, even a one-off, read `C:/Storage/The Brain/The Brain/.ai/rules/scripts.md`.
- Personal data: none is involved; do not put secrets or personal data in the report.

## Your slice, copied word for word from the plan

### Slice 4 — the scene drawn still

- **Goal:** a new React component `src/browser/view/scene.tsx` draws the scene from what the pure
  module of Slice 3 gives, still — motion comes in Slice 5; read the two files Slice 3 made,
  `src/browser/view/scene-picture.ts` and `src/browser/sim/data/scene.ts`, whole, besides *Read*.
  It draws the background; the props; the
  fire, burning, or extinguished as the same picture without colour and on its first frame (To do
  4); the mage at its place, on the first frame of its idle sheet; over its head the badge on a
  solid `panel` (row 6, E8, D-272), in it the action's icon drawn as a mask (the class
  `action-icon` of the stylesheet, its file in `--icon`, as the rule's row draws it) in
  `text-strong` (row 9, E6, E8), and under the icon the bar, a track in `highlight` with a fill in
  `positive` as long as the progress (E7). Stopped by the player's pause, the whole scene takes
  `grayscale(1) brightness(0.5)` (To do 8, row 1); at a discovery it keeps its colours (E9); after a
  death the mage is grey and the badge gone, after a completion the badge is gone and the mage in
  colour (To do 9, row 8); the grey of the dead mage and of the extinguished fire is one value, the old Loop's
  `grayscale(1) brightness(0.55)`, settled by the orchestrator as an autonomous choice (the old Loop
  draws both with it) (C:\Storage\repos\loop\src\components\probe\sprites.tsx line 64,
  cdc7c0d). The scene is drawn at the size of `SCENE_SCALE`, pixel-sharp; the places, frames and
  sizes of the sprites come from TypeScript as percentages of the frame or as custom properties set
  on the element, so that the stylesheet holds no length in `px` for a sprite beyond the layout
  dimensions D-43 leaves out, and `browser-view-token-values` stays as it is (E6). The scene is a
  picture (To do 11, row 7): nothing in it is reached by the keyboard, a click on it does nothing,
  no pause sign and no text stands on it or over it (D-272, D-44, D-47), and it is hidden from
  assistive technology as the picture with an empty `alt` is today. `src/browser/view/world-area.tsx`
  draws the scene in the place of the picture of the forest; the background's file comes from the
  data of Slice 3. In `src/browser/styles.css` the rules of the scene read existing tokens alone —
  no new token, colour or role (`src/browser/AGENTS.md`); the badge's size is chosen by viewing the
  scene at both scales (carried question 5), its icon's side a layout dimension, its padding a
  stage of the spacing scale and the bar's thickness an existing token; the two greys stand in the
  scene's rules, each with a comment naming its source. Write the cases first in a new
  `tests/view/scene.test.mjs` on the harness of `tests/view/page-document.mjs`: the parts drawn in
  each way the scene stands; the badge with its icon file and a fill as long as the progress; no
  badge while waiting, in combat, after a death and after a completion; the fire absent, burning
  and extinguished; no element of the scene the keyboard reaches, and a click on it leaving the
  game state as it was. The case of `tests/view/world-area.test.mjs` „the scene is the picture of
  the forest at the size of the scale, with no text inside or over it” follows the scene that is no
  longer one `img`, the changed case naming its cause, To do 1 and 7, and keeping its check of the
  size and of no text. Then operate the built game in a real browser as
  `.claude/skills/loop2-play/SKILL.md` gives (D-254, D-88) and take screenshots into
  `docs/task-cycles/scena-z-ludzikiem/screenshots/` at the committed scale, and at the other scale
  reached by changing the constant locally, never committed: the mage gathering a stick with the
  badge, at the fire, paused, at a discovery, after a death and after a completion; name each file in
  the report, with the badge's size and why.
- **Change:** `src/browser/view/scene.tsx` · `src/browser/styles.css` ·
  `src/browser/view/world-area.tsx` · `tests/view/scene.test.mjs` · `tests/view/world-area.test.mjs`
- **Read:** `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:29-47` To do and Acceptance
  criteria · `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:51-55` Questions to settle,
  question 1 · `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:80-97` Questions to settle,
  questions 6-8 · `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:114-124` Questions to settle,
  questions 12-13 · `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:126-160` Context and
  Questions carried to cycle · `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:220-234`
  Settlements to record · E1 · E4 · E6 · E7 · E8 · E9 · Row 1 · Row 3 · Row 5 · Row 6 · Row 7 ·
  Row 8 · Row 9 · `foundations/decisions.md:39-50` D-03 · `foundations/decisions.md:824-942` D-38 to
  D-45 · `foundations/decisions.md:959-973` D-47 · `foundations/decisions.md:1229-1242` D-62 · `foundations/decisions.md:1334-1347` D-68 · `foundations/decisions.md:2205-2243` D-122 · `foundations/decisions.md:2486-2510` D-132 · `foundations/decisions.md:1593-1617` D-87 and
  D-88 · `foundations/decisions.md:5150-5177` D-254 · `foundations/decisions.md:5491-5563` D-267
  and D-268 · `foundations/decisions.md:5620-5672` D-271 and D-272 ·
  `foundations/decisions.md:5848-5870` D-279 · `foundations/decisions.md:6184-6207` D-291 ·
  `foundations/decisions.md:6621-6655` D-311 · `foundations/decisions.md:6737-6774` D-314 and D-315 ·
  `foundations/invariants.md:35-43` browser-view-framework · `foundations/invariants.md:236-246`
  content-identifiers · `foundations/invariants.md:459-497` browser-view-token-values,
  browser-view-focus-outline, design-token-contrast and design-token-sources ·
  `foundations/invariants.md:1189-1197` document-test-memory-limit ·
  `foundations/glossary.md:80-85` extinguished campfire · `foundations/glossary.md:136-140`
  completion · `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `.claude/skills/loop2-play/SKILL.md` · `src/browser/tokens.css` · `src/browser/view/rule-list.tsx:476-487` ·
  `src/browser/view/run-screen.tsx` · `tests/view/page-document.mjs`
- **Model:** same — it lays the sprites out at two scales under the token rule and picks the
  badge's size by viewing the running game, the look the human judges first
- **Risk:** none
- **Checks:** `npm test -- tests/view/scene.test.mjs`, seen failing before the component exists;
  `npm test -- tests/view/world-area.test.mjs`;
  `npm test -- tests/invariants/test_browser_view_token_values.py`;
  `npm test -- tests/invariants/test_browser_view_focus_outline.py`;
  `npm test -- tests/invariants/test_content_identifiers.py`;
  `npm test -- tests/invariants/test_browser_view_framework.py`;
  `npm test -- tests/quality/test_quality_invariants.py`; the screenshots above
- **Depends on:** Slice 3 · E1 · E4 · E6 · E7 · E8 · E9 · Row 1 · Row 3 · Row 5 · Row 6 · Row 7 ·
  Row 8 · Row 9

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

### Questions to settle, questions 6-8 (`task.frozen.md:80-97`)

- Pytanie 6. Jak wyglądają ikona i pasek na obrazie lasu?
  - Answer: Mała plakietka na pełnym tle `panel` (rola „osobny, wydzielony blok”), w niej ikona, a pod nią pasek: wypełnienie w `positive` („jest teraz aktywne”) na torze `highlight`, bez nowych ról. Plakietka zasłania kawałek lasu nad głową. Rozmiar plakietki wybiera cykl, oglądając scenę.
  - Not chosen:
    - To samo, ale pasek w kolorze mocnego tekstu (`text-strong`) — pasek nie odróżnia się od ikony.
    - Ikona i pasek wprost na obrazie — na jasnym drzewie ikona może zniknąć, a żaden test tego nie złapie.
  - Source: człowiek, 2026-11-03, pakiet rundy, B14: „poza tym nie mam zastrzeżeń do rekomendacji”.
- Pytanie 7. Co pokazuje scena po śmierci postaci i po rozwiązaniu mapy, zanim efekty tych chwil przyjdą w zadaniach 18 i 19?
  - Answer: Ruch sceny stoi, ikona i pasek znikają, po śmierci mag jest szary, a po rozwiązaniu stoi w kolorze. Rozwiązanie mapy nie różni się w scenie od zatrzymania.
  - Not chosen:
    - Gotowy arkusz śmierci maga — część zadania 19 przechodzi tutaj.
    - Scena jak przy pauzie gracza — koniec gry wygląda jak pauza.
  - Source: człowiek, 2026-11-03, pakiet rundy, T35: „poza tym nie mam zastrzeżeń do rekomendacji”.
- Pytanie 8. Czy kliknięcie w scenę pauzuje grę, jak w starym Loop, i czy na scenie stoi znak pauzy?
  - Answer: Scena jest obrazem, bez kliknięcia i bez znaku pauzy. To odejście od starego Loop: gracz traci skrót, choć „Pauza” stoi w tym samym widoku, a szarość mówi, że gra stoi.
  - Not chosen:
    - Kliknięcie jak w starym Loop — nowy rodzaj wspólnej kontrolki i zmiana decyzji o kontrolkach (D-44).
    - Sam znak pauzy — mówi to samo co szarość i „Wznów”.
  - Source: człowiek, 2026-11-03, pakiet rundy, B15: „poza tym nie mam zastrzeżeń do rekomendacji”; stary Loop `C:\Storage\repos\loop\src\components\probe\Scene.tsx:240` i `:260`, cdc7c0d.

### Questions to settle, questions 12-13 (`task.frozen.md:114-124`)

- Pytanie 12. Jaki kolor ma ikona w plakietce nad głową?
  - Answer: `text-strong`, mocny tekst, ten sam co czynność w wierszu reguły edytora („W wierszu warunek jest drugoplanowy, czynność mocna”, pakiet 2, C9, wiersz f). Plakietka nie ma tekstu, więc żadna zasada tego nie rozstrzygała: zatwierdzony D-43 daje ikonie maski kolor „from the text beside it”, a obok ikony w plakietce tekstu nie ma. Wynik przyjęty: ikona nad głową wygląda jak ta sama ikona przy czynności w działającym wierszu reguły i jak ikony na rysunku mapy, które też nie stoją przy tekście; jest jaśniejsza niż ta sama ikona w niewybranej komórce panelu wyboru reguły, gdzie stoi przy zwykłym tekście. D-40 pozwala kolorom tekstu stać tylko jako tekst, więc każda droga go poszerza, a różni się tylko kolorem; tę część D-40 i D-43 zapisuje to zadanie (wiersz 9 *Settlements to record*).
  - Not chosen:
    - `text`, zwykły tekst — ikona nad głową ciemniejsza niż w wierszu reguły obok i niż ikony na mapie; obie wartości dobrze czytelne (11,99:1 i 16,12:1 wobec tła plakietki).
  - Source: człowiek, 2026-11-03, pakiet 2, C8, droga b: „wszystko przyjmuję zgodnie z rekomendacjami”; pytanie przeciw temu wyborowi, pakiet 3, G1, droga A, wybór utrzymany: „przyjmuję zgodnie z rekomendacjami” (człowiek, 2026-11-03); plan_mvp2_loop2.md@a4be7015, dziennik zmian, linie z 2026-11-03 o D-40 i D-43 (zadanie 7 dołącza do wiersza D-40; ikona wychodzi poza D-43). Wcześniejsza odpowiedź cytatem (D-40, reguła „Every background with its text”, D-43) wycofana po niezależnej krytyce, bo krok od „the text beside it” do koloru tekstu plakietki był wnioskiem agenta, a nie cytatem.
- Pytanie 13. Jaką rolę bierze zielony pasek postępu w plakietce, skoro D-39 mówi, że `positive` stoi tylko jako tekst?
  - Answer: Pasek postępu w plakietce bierze `positive` w znaczeniu, jakie ta rola ma w tekście: wypełnienie w `positive` na torze `highlight`, w plakietce na tle `panel`, z co najmniej 3:1 wobec tła, na którym stoi. D-39 dopisuje, że `positive` i `warning` stoją też jako pasek stanu reguły, co zapisuje zadanie 11, a `positive` także jako wypełnienie paska postępu nad głową maga, co zapisuje to zadanie; `warning` nie stoi w pasku postępu. Ciemny pasek przy regule (#27272a, bez progu, prawie niewidoczny na każdym wierszu) to sprawa zadania 11, nie tej plakietki.
  - Not chosen:
    - Ciemny pasek przy regule w wartości widocznej wszędzie, z co najmniej 3:1 wobec każdego tła wiersza — wyraźny szary pasek przy większości reguł, program bardziej pstrokaty, odejście od Loop.
    - Trzy nowe role, po jednej na kolor paska, dwie równe kolorom tekstu — pary ról o równych wartościach, które przy zmianie jednej się rozjadą.
  - Source: człowiek, 2026-11-03, pakiet 2, C4, droga A: „wszystko przyjmuję zgodnie z rekomendacjami”; pytanie przeciw temu wyborowi, pakiet 3, G2, droga A, wybór utrzymany: „przyjmuję zgodnie z rekomendacjami” (człowiek, 2026-11-03); pytanie kanoniczne: `C:\Storage\repos\loop2\.runs\project-refinement\stan-i-powod-przy-regule.md`, Q2 (zadanie 11); plan_mvp2_loop2.md@a4be7015, wiersz D-39 w *Projected entries* (realizują zadania 5, 7 i 11, pisze zadanie 11) i linia dziennika z 2026-11-03 „zadanie 7 dołącza do wiersza D-39”; foundations/decisions.md@20d804b, D-39: „Each of the five is a role of the kind text and stands as text on the backgrounds `page`, `panel` and `highlight`.”

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
- `foundations/decisions.md:6903-6936` D-320
- `foundations/decisions.md:6938-6957` D-321
- `foundations/decisions.md:6959-6988` D-322
- `foundations/decisions.md:846-859` D-39
- `foundations/decisions.md:861-874` D-40
- `foundations/decisions.md:906-919` D-43
- `foundations/decisions.md:2212-2254` D-122
- `foundations/decisions.md:5664-5689` D-272
- `foundations/decisions.md:6638-6672` D-311
- `foundations/decisions.md:39-50` D-03
- `foundations/decisions.md:831-844` D-38
- `foundations/decisions.md:876-889` D-41
- `foundations/decisions.md:891-904` D-42
- `foundations/decisions.md:921-934` D-44
- `foundations/decisions.md:936-949` D-45
- `foundations/decisions.md:966-979` D-47
- `foundations/decisions.md:1236-1249` D-62
- `foundations/decisions.md:1341-1354` D-68
- `foundations/decisions.md:1600-1611` D-87
- `foundations/decisions.md:1613-1624` D-88
- `foundations/decisions.md:2497-2521` D-132
- `foundations/decisions.md:5161-5188` D-254
- `foundations/decisions.md:5502-5529` D-267
- `foundations/decisions.md:5531-5574` D-268
- `foundations/decisions.md:5631-5662` D-271
- `foundations/decisions.md:5865-5887` D-279
- `foundations/decisions.md:6201-6224` D-291
- `foundations/decisions.md:6754-6771` D-314
- `foundations/decisions.md:6773-6791` D-315
- `foundations/invariants.md:35-43` browser-view-framework
- `foundations/invariants.md:236-246` content-identifiers
- `foundations/invariants.md:459-467` browser-view-token-values
- `foundations/invariants.md:469-477` browser-view-focus-outline
- `foundations/invariants.md:479-487` design-token-contrast
- `foundations/invariants.md:489-497` design-token-sources
- `foundations/invariants.md:1189-1197` document-test-memory-limit
- `foundations/glossary.md:80-85` extinguished campfire
- `foundations/glossary.md:136-140` completion

## Guideline files and instruction files, each whole

- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`
- `.claude/skills/loop2-play/SKILL.md`

## Code and tests to read

- `src/browser/sim/data/scene.ts` and `src/browser/view/scene-picture.ts` (made by slice 3), whole, and `docs/task-cycles/scena-z-ludzikiem/reports/slice-3-report.md` for its choices
- `src/browser/tokens.css`
- `src/browser/view/rule-list.tsx` (where a rule row draws an action's icon)
- `src/browser/view/run-screen.tsx`
- `src/browser/view/world-area.tsx`
- `src/browser/styles.css` (the scene's rules and the `.action-icon` rule)
- `tests/view/page-document.mjs`
- `tests/view/world-area.test.mjs`

## Two things from the orchestrator beyond the plan's section

1. **The right place of the mage.** Slice 3's report says that with the right edge at 292 the mage's right-most column lies at 336, one column outside the 336-wide frame, in both sheets (read from slice 1's figure boxes, not measured on the screen). Check it on your screenshots and in the data. If the figure is clipped or touches the border, move the place to 291 in `src/browser/sim/data/scene.ts` and change the expected value of the case in `tests/view/scene-picture.test.mjs` that names it. For this correction alone, those two files are added to your slice's *Change*; no other change to slice 3's files.
2. **Where the props and the fire stand.** Slice 3 took the bottom lines of the old Loop for the props and the fire (moss 128, sticks 132, berry bush 122, fire 132) and the ground line 136 for the mage. If the screenshots show a prop floating over or sunk into the snow of task 6's background, say so in your report and correct the place the same way (same two files); name each corrected value and why.
3. The grey value for a dead mage and for an extinguished fire is `grayscale(1) brightness(0.55)` and the pause's is `grayscale(1) brightness(0.5)`; each stands in the scene's rules in `src/browser/styles.css` with a comment naming its source (the old Loop's `sprites.tsx` line 64 and `Scene.tsx` at cdc7c0d; D-322 and D-316).
4. Screenshots: take them as the plan's slice says, into `docs/task-cycles/scena-z-ludzikiem/screenshots/`; name every file in the report. Operating the game in a real browser is described in `.claude/skills/loop2-play/SKILL.md`; follow it. A screenshot you could not take, or a state you could not reach, is reported as unchecked with the reason.
