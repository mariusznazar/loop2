# Handoff — slice 6 of the task `scena-z-ludzikiem`: the guidelines know the scene

You make **a slice, or the retry of a slice** (the row of the table of `make-change` that names this). The person who requested the cycle has delegated intermediate choices to the orchestrator; you never ask the human. Send questions back in your return with the status `questions`.

- Worktree (work from its root): `C:/Storage/repos/loop2-wt/scena-z-ludzikiem`; branch `task/scena-z-ludzikiem`; pinned the-way `61c72fb` in `.the-way`. The branch holds the foundation entries already (commit `0d11c97` and earlier); your commits go on top of the head you find. The slice's base for its review: `d2851be`.
- Method: read `.the-way/task-cycle/change/SKILL.md` whole (project skill `the-way-make-change`); read `.the-way/task-cycle/change/slice.md` as the table's row says; read `.the-way/task-cycle/change/ui_check.md` only if the slice changes a user interface and its step names it. Read no file of the-way that your method does not name for the step you are at.
- Class of model for this slice: cheaper (harness model: the cheapest, `haiku`). Risk of this slice (plan): none.
- Answers of the orchestrator at the start: trust boundary **yes** (`assets/sprites/**`); irreversible operation **no**. Settled: the grey of a dead mage and of an extinguished fire is `grayscale(1) brightness(0.55)`; the pause's grey is `grayscale(1) brightness(0.5)`; `SCENE_SCALE` stays 2 (672 × 304).
- You do not run the product's gate (`npm test` without arguments); you run the focused checks of the slice. The orchestrator runs the gate.
- Commits: English messages in the form of the repository's existing commits (`feat: :sparkles: …`, `test: :white_check_mark: …`, `docs: :memo: …`); `git add <path> …` by path — never `git add -A`, `git add .`, `git commit -a`. Commit your work; leave the worktree clean.
- Report: write it to `docs/task-cycles/scena-z-ludzikiem/reports/slice-6-report.md` as `make-change` gives it; return the status, your commits, a one-line check result (naming what failed or did not run) and the report path. Every check you report carries its command and its exit code. The report holds **Searches not found or unclear:** (each thing you looked for and did not find or that was unclear, or `none`) and each reach beyond this handoff.
- Scripts: before writing any script, even a one-off, read `C:/Storage/The Brain/The Brain/.ai/rules/scripts.md`.
- Personal data: none is involved; do not put secrets or personal data in the report.

## Your slice, copied word for word from the plan

### Slice 6 — the guidelines know the scene

- **Goal:** through `the-way-maintain-styleguide`, `guidelines/styleguide-browser-view.md` says how
  the scene uses roles and values (To do 14): a rule for the scene — the badge on `panel`, its
  icon in `text-strong` with no text beside it, the bar with its fill in `positive` on a track in
  `highlight`, the grey of the player's pause and its source, the colours kept at a discovery and
  after a completion, the grey of the dead mage and of the extinguished fire and its source, the
  scene with no text, no control and no flash; the table *Roles* follows E7 and E8 where their
  meanings grow; and the rule „No value in place of a design token” lists the exemptions of E6 —
  the geometry of the scene computed in TypeScript, the frames and positions of a sprite and the
  icon with no text beside it — and says that `browser-view-token-values` lets them through
  because they stand in TypeScript, as Slices 4 and 5 made them. Through
  `the-way-maintain-coding-guidelines`, the table *Files of this kind* of
  `guidelines/coding-browser-module.md` gains rows for `src/browser/view/scene.tsx` and
  `src/browser/view/scene-picture.ts`, and that of `guidelines/coding-content-data.md` a row for
  `src/browser/sim/data/scene.ts` (To do 15), each with the status the table gives a file of its
  kind (`copy`, as for the React modules and the pure modules and as for the data files). The text
  says what the code of Slices 3-5 does, read from that code — the files Slices 3-5 made,
  `src/browser/view/scene.tsx`, `src/browser/view/scene-picture.ts` and
  `src/browser/sim/data/scene.ts`, read whole besides *Read* — and words no decision.
- **Change:** `guidelines/styleguide-browser-view.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/coding-content-data.md`
- **Read:** `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:29-43` To do ·
  `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:80-85` Questions to settle, question 6 ·
  `docs/task-cycles/scena-z-ludzikiem/task.frozen.md:114-124` Questions to settle, questions 12-13 ·
  E6 · E7 · E8 · Row 1 · Row 6 · Row 8 · Row 9 · `foundations/decisions.md:824-912` D-38 to D-43 ·
  `foundations/invariants.md:459-467` browser-view-token-values ·
  `.claude/skills/the-way-maintain-styleguide/SKILL.md` ·
  `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md` · `src/browser/styles.css`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py`;
  `npm test -- tests/invariants/test_browser_view_token_values.py`
- **Depends on:** Slice 3 · Slice 4 · Slice 5 · E6 · E7 · E8

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

### Questions to settle, question 6 (`task.frozen.md:80-85`)

- Pytanie 6. Jak wyglądają ikona i pasek na obrazie lasu?
  - Answer: Mała plakietka na pełnym tle `panel` (rola „osobny, wydzielony blok”), w niej ikona, a pod nią pasek: wypełnienie w `positive` („jest teraz aktywne”) na torze `highlight`, bez nowych ról. Plakietka zasłania kawałek lasu nad głową. Rozmiar plakietki wybiera cykl, oglądając scenę.
  - Not chosen:
    - To samo, ale pasek w kolorze mocnego tekstu (`text-strong`) — pasek nie odróżnia się od ikony.
    - Ikona i pasek wprost na obrazie — na jasnym drzewie ikona może zniknąć, a żaden test tego nie złapie.
  - Source: człowiek, 2026-11-03, pakiet rundy, B14: „poza tym nie mam zastrzeżeń do rekomendacji”.

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

## Foundation entries to read, each whole, at the range they have now in the worktree

The plan's names E1–E10 and Rows 1–9 are written now: E1 = D-316 (with row 3); E2 = D-317; E3 = the mage clause of D-271; E4 = D-272 (stood at the base); E5 = D-04; E6 = D-43; E7 = D-39; E8 = D-40; E9 = D-122; E10 = the invariant `loop2-container-sprites`; row 1 = D-322 and D-122; row 2 = D-318; row 4 = D-319; rows 5, 6, 9 = D-320 (and D-39, D-40, D-43); row 7 = D-321; row 8 = D-322.

- `foundations/decisions.md:831-844` D-38
- `foundations/decisions.md:846-859` D-39
- `foundations/decisions.md:861-874` D-40
- `foundations/decisions.md:876-889` D-41
- `foundations/decisions.md:891-904` D-42
- `foundations/decisions.md:906-919` D-43
- `foundations/decisions.md:6793-6827` D-316
- `foundations/decisions.md:6876-6901` D-319
- `foundations/decisions.md:6903-6936` D-320
- `foundations/decisions.md:6959-6988` D-322
- `foundations/invariants.md:459-467` browser-view-token-values

## Guideline files and instruction files, each whole

- `guidelines/coding.md`
- `guidelines/styleguide-browser-view.md`
- `guidelines/coding-browser-module.md`
- `guidelines/coding-content-data.md`
- `.claude/skills/the-way-maintain-styleguide/SKILL.md`
- `.claude/skills/the-way-maintain-coding-guidelines/SKILL.md`

## Code and tests to read

- `src/browser/view/scene.tsx`, `src/browser/view/scene-picture.ts` and `src/browser/sim/data/scene.ts`, each whole — the text you write says what this code does, read from the code
- `src/browser/styles.css` (the scene's rules: the badge, the bar, the two greys, the beats of 160, 640 and 200 ms)
- `docs/task-cycles/scena-z-ludzikiem/reports/slice-4-report.md` and `slice-5-report.md` (choices)

## Orchestrator's notes beyond the plan's section

1. Edit the three guideline files only through the two project skills named in your slice; read each `SKILL.md`, which sends you to the pinned `.the-way`. You lead no refinement with a human here: where a skill would ask the human, take the answer from this handoff, the task passages, the foundation entries or the code, and where none gives it, write nothing invented and name the question in your report.
2. What the code does that the styleguide may need to say, from the plan's concerns: the scene's motion durations (160 ms frames, 640 ms walk, 200 ms bar) and its two filters (`grayscale(1) brightness(0.5)` for the pause and `grayscale(1) brightness(0.55)` for a dead mage and an extinguished fire) stand as values of the scene's rules in `src/browser/styles.css`, with their sources in comments; neither is a kind of value the styleguide's list of token values holds, and D-43 counts neither — say what the code does and that the styleguide's list does not name them; do not decide that they become tokens. The bar at scale 2 is `calc(var(--bar-width) * 2)`; say so as what the code does. The track of the bar (`highlight`) holds no text; the rule "Every background with its text" does not say whether a track needs a text role — describe what the code does and name the uncertainty in your report.
3. The grey of the dead mage and of the extinguished fire is `grayscale(1) brightness(0.55)`, settled by the orchestrator from the old Loop; the pause's is `grayscale(1) brightness(0.5)`.
4. The new rows of the two *Files of this kind* tables take the status the table gives a file of its kind (`copy`) unless the skill tells you otherwise.
5. Run `python -B .the-way/elements/common/foundation_check.py` at the end and the other focused check of your slice; report each with command and exit code.
