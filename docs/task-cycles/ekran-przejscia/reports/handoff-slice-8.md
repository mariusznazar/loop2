# Handoff — Slice 8 of the task cycle `ekran-przejscia`

## Delegation and boundary

The human asked the orchestrator to take this task through the-way's task cycle to a reviewable
pull request and delegated the intermediate choices to it. You are the executor of Slice 8; your
variant of `make-change` is **a slice, or the retry of a slice**. You make this slice alone and return before any other
slice, review or gate run. Questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\ekran-przejscia`
- Branch `task/ekran-przejscia`; the slice's base is `5389bf4` (the current head). Commit on the
  branch; never push; never reset below the slice's base.
- Method: read whole `.the-way/task-cycle/change/SKILL.md` and follow it; read a file it names only
  when the step or variant that names it comes. Where it names another the-way skill, use the
  project skill with the `the-way-` prefix.
- Frozen task: `.runs/task-cycles/ekran-przejscia/task.md` (accepted 2026-11-03). The passages your
  slice needs are copied below; the plan is `.runs/task-cycles/ekran-przejscia/plan.md` and no spec
  was written.
- Report: `.runs/task-cycles/ekran-przejscia/reports/report-slice-8.md`. If the harness refuses
  that write, return the whole report as text in your final message instead.
- Read every guideline file your handoff names **whole**: where a file is too large for one read, read it in parts until its end (`guidelines/testing.md` is about 66 kB). A guideline read in part is a gap your report must name.
- Do not run the whole gate (`npm test` with no argument); your checks are the slice's *Checks*.
  The tools of `tests/quality` are installed in `.runs/quality-venv`.

## Answers of step 4 (binding)

- Trust boundary: yes for the cycle — `assets/sprites/**` of the part `browser-view` (Slice 1 adds
  the PNG of the forest frame there; its review checks, as D-273 gives, that the file holds pixels
  alone and that the build copies from `assets/sprites/` only PNG files, only into what
  `npm run build` writes). A slice whose *Risk* is none touches no trust boundary; if yours comes to
  touch one, or `src/browser/sim/saved-game.ts`, say so in your report.
- Irreversible operation: no. Open design choice: none. Reserved choice: none.
- Answers the orchestrator gave (cycle record, questions table): the saved game state keeps its
  shape and `SAVED_GAME_VERSION` stays 3; „Dodaj regułę z tym” is disabled where the copy holds no
  rule group; the committed scene size is 672 × 304 (scale constant 2) until the human picks, the
  other size reached only locally; new rows of `guidelines/coding-browser-module.md` take the status
  `copy`.

## Environment

Windows 11; shells: Git Bash and PowerShell. Python's console output uses the ANSI code page: write
Polish text a script produces to a UTF-8 file rather than printing it, use forward slashes in paths
inside Python literals, and keep line endings when a script rewrites an existing file
(`newline=''`). Commit messages in English in the repository's style (`feat: :sparkles: …`,
`test: :white_check_mark: …`, `refactor: :recycle: …`, `docs: :memo: …`), files added by path —
never `git add -A`, `git add .` or `git commit -a`.

## Return

Return your status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or
`blocked`), your commits, a one-line check result naming what failed or did not run, and the
report's path (or that the report is in your message). The report holds every check you ran with
its command and exit code, your own-work check, your questions and concerns, each reach beyond this
handoff, and **Searches not found or unclear** — each thing looked for and not found or unclear, or
`none`.

## Orchestrator's notes for this slice

- Earlier slices: Slice 2 `chillRuleGroupName(state)` in `src/browser/sim/understanding.ts` (the group name or null — D-312 at the current head, read it whole); Slice 3 `discoveryRule(state)` in `src/browser/view/discovery-rule.ts` (null greys the button, D-313).
- Use the shared React button `ReactButton` of `src/browser/view/controls/react-button.tsx`, as Slice 5's `run-header.tsx` does.
- Long lines of `guidelines/testing.md` can be cut by your reading tool; read them another way (e.g. `sed -n`) so the file is read whole.

## The slice's section of the plan, word for word (`plan.md`)

### Slice 8 — The band of a discovery

- **Goal:** a new React component in `src/browser/view/discovery-band.tsx`, which the screen of Slice 9 renders above the program, draws the band of a discovery in the role `discovery` (D-39) while the game state holds a discovery, and nothing otherwise: the text `discoveryText` of `status-row.ts` unchanged; where the function of Slice 2 names a group, the sentence „Gra dopisała regułę w grupie „{nazwa grupy}”: Zawsze → Eksploruj.”, with no number of the rule (row 5); then „Dodaj regułę z tym” and „Wznów”, each the shared plain React button (D-44). „Wznów” does what „Wznów” of the header does, one resumption (D-122), through a callback; it is absent where the map run has ended, as after a completion in the game minute of a discovery, where the band stands until „Restart” or „Zakończ”. „Dodaj regułę z tym” calls its callback and is disabled where the function of Slice 3 gives null. A frame or a bar the band draws at its text takes that text's colour (D-279); its rules in `src/browser/styles.css` read existing tokens only, and a value the token file lacks is named in the report, never chosen. Write the cases first in a new `tests/view/discovery-band.test.mjs` on the harness: the text of the first finished exploration of a tile with sticks and berries; at the first chill the band with „Gra dopisała regułę w grupie „Program”: Zawsze → Eksploruj.”, with a renamed first group its name, and after another group dragged above it still the group holding the rule; no band without a discovery and none once the player goes on (carrying the DOM case of `tests/view/status-row.test.mjs` at line 442 at the base); a discovery held at a completion standing with no „Wznów” (carrying the DOM case at line 582); each button calling its callback; „Dodaj regułę z tym” disabled where the copy holds no rule group.
- **Change:** `src/browser/view/discovery-band.tsx` · `src/browser/styles.css` · `tests/view/discovery-band.test.mjs`
- **Read:** `.runs/task-cycles/ekran-przejscia/task.md:43-52` To do · `.runs/task-cycles/ekran-przejscia/task.md:84-96` Questions to settle · `.runs/task-cycles/ekran-przejscia/task.md:231-241` Settlements to record ·
  `foundations/decisions.md:2203-2238` D-122 · `foundations/decisions.md:2239-2271` D-123 · `foundations/decisions.md:2272-2296` D-124 · `foundations/decisions.md:443-476` D-21 · `foundations/decisions.md:5031-5053` D-250 · `foundations/decisions.md:837-851` D-39 · `foundations/decisions.md:5836-5859` D-279 · `foundations/decisions.md:912-926` D-44 · `foundations/decisions.md:5411-5452` D-265 · `foundations/decisions.md:5379-5410` D-264 · `foundations/invariants.md:198-213` player-map-run-pace ·
  Foundation entries E9, E10, E11 ·
  `src/browser/AGENTS.md` · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `tests/view/page-document.mjs` · `src/browser/view/status-row.ts` · `tests/view/status-row.test.mjs` · `src/browser/view/controls/react-button.tsx`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/discovery-band.test.mjs`, its cases seen failing first; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_browser_view_focus_outline.py`; `npm test -- tests/quality/test_node_test_selection.py`; `npm run typecheck`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 2 · Slice 3 · Foundation entries E9, E10, E11

## What you read

The ranges below are current at 5389bf4; where they differ from the plan's, these hold.

### Foundation entries, each whole

- D-122 — `foundations/decisions.md:2205-2244`
- D-123 — `foundations/decisions.md:2245-2277`
- D-124 — `foundations/decisions.md:2278-2302`
- D-21 — `foundations/decisions.md:445-478`
- D-250 — `foundations/decisions.md:5039-5061`
- D-39 — `foundations/decisions.md:839-853`
- D-279 — `foundations/decisions.md:5846-5869`
- D-44 — `foundations/decisions.md:914-928`
- D-265 — `foundations/decisions.md:5419-5460`
- D-264 — `foundations/decisions.md:5387-5418`
- player-map-run-pace — `foundations/invariants.md:198-213`

### Entries written by the cycle's foundation step

- E9 — D-122 (part rewritten: the band) — read it whole — `foundations/decisions.md:2205-2244`
- E10 — D-312 — new, „How does the band of a discovery name the program rule the game wrote?”, read it whole — `foundations/decisions.md:6655-6695`
- E11 — D-313 — new, „What does „Dodaj regułę z tym” do?”, read it whole — `foundations/decisions.md:6696-6732`

### Files (whole unless a range is given)

- `src/browser/AGENTS.md`
- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `tests/view/page-document.mjs`
- `src/browser/view/status-row.ts`
- `tests/view/status-row.test.mjs`
- `src/browser/view/controls/react-button.tsx`

### Passages of the frozen task, word for word (`.runs/task-cycles/ekran-przejscia/task.md`)

#### task.md:43-52 — To do

7. Linia odkrycia staje się pasem w roli `discovery` nad programem, z tym samym tekstem o odkryciu, z „Dodaj regułę z tym” i z „Wznów”.
   - Pas stoi do „Wznów”, a gdy przejście kończy się rozwiązaniem mapy w minucie odkrycia, do „Restart” albo „Zakończ”.
   - „Dodaj regułę z tym” dodaje regułę na końcu pierwszej grupy kopii i otwiera jej panel z pierwszą odkrytą czynnością, a gdy żadnej czynności nie odkryto, z pierwszym odkrytym warunkiem; gdy odkryto sam przedmiot albo stworzenie, działa jak „+ reguła” (pytanie 5).
   - Przy odkrytej czynności reguła ma warunek „Zawsze”, a gdy czynność potrzebuje celu, celem jest pierwszy pasujący przedmiot z tego samego odkrycia, a bez takiego pierwszy cel z siatki; „Odkryto: Zbierz, Patyk.” daje „Zawsze → Zbierz — patyk” (pytanie 10).
   - Przy samym warunku reguła to „{warunek} → Eksploruj”, a liczba i cel tego warunku są takie, jakie daje wybór tego warunku w panelu reguły z zadania 5 (odczytanie z pytania 10).
   - Panel otwiera się na polu, które przycisk wypełnił z odkrycia; gdy wypełnił z niego czynność i jej cel, otwiera się na polu czynności, pierwszym z nich w kolejności pól panelu, jak mówi pytanie 5 (odczytanie z pytań 5 i 10).
   - Dodanie reguły tym przyciskiem zeruje passę, jak każda zmiana reguł kopii (D-131).
   - Gdy w tej minucie gra dopisała regułę, pas mówi „Gra dopisała regułę w grupie „{nazwa grupy}”: Zawsze → Eksploruj.”, bez numeru reguły (pytanie 6).
   - „{nazwa grupy}” to nazwa grupy kopii, do której gra wpisała regułę, bo pas stoi nad programem przejścia, czyli nad kopią; gdy kopia nie miała grupy, to „Program” (D-123 w definicji; odczytanie z pytania 6).
   - „Wznów” w nagłówku działa dalej obok „Wznów” w pasie, bo oba robią to samo jedno wznowienie (D-122).

#### task.md:84-96 — Questions to settle

- Pytanie 5. Co robi „Dodaj regułę z tym”?
  - Answer: Dodaje regułę na końcu pierwszej grupy kopii i otwiera panel z pierwszą odkrytą czynnością, a bez czynności z pierwszym warunkiem; przy samym przedmiocie albo stworzeniu działa jak „+ reguła”. Koszt przyjęty z tą drogą: reguła działania na liście odkryć, a dodanie zeruje passę jak każda zmiana kopii.
  - Not chosen:
    - działa jak „+ reguła” — napis „z tym” obiecuje więcej
    - przycisk później — odejście od zatwierdzonego brzmienia i wskazanie zadania
  - Source: Mariusz, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, punkt B13, rekomendacja A. Przycisk nazywa definicja_mvp2_loop2.md (odcisk 9641f804), D-122, wiersz 631: „with „Dodaj regułę z tym” and „Wznów””.
- Pytanie 6. Jak pas odkrycia mówi o regule, którą dopisała gra?
  - Answer: „Gra dopisała regułę w grupie „{nazwa grupy}”: Zawsze → Eksploruj.”, bez numeru reguły. Słaby punkt przyjęty z tą drogą: dłuższe zdanie w pasie.
  - Not chosen:
    - zdanie bez grupy, „Gra dopisała regułę: Zawsze → Eksploruj.”, wybrane w pierwszym pakiecie i zmienione pytaniem kontrolnym — gracz sam szuka reguły w programie
    - z numerem „1.1” — zależność od numeracji
    - bez zdania do zadania 10 — odejście od definicji
  - Source: Mariusz, 2026-11-03: najpierw „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, wiersz T31 (zdanie bez grupy); potem „wszystko przyjmuję zgodnie z rekomendacjami”, drugi pakiet rundy, pytanie kontrolne E4, droga B, które zmieniło tamten wybór. Definicja_mvp2_loop2.md (odcisk 9641f804), D-122, wiersz 631: „names what was discovered and the program rule the game wrote”; D-123, wiersz 646: „where either holds no rule group, the game adds the rule group „Program” with the condition „Zawsze” and writes the rule into it”.

#### task.md:231-241 — Settlements to record

## Settlements to record

Candidates: 9 shown, 5 accepted — 2026-11-03

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | Do zadania 14 cały wiersz stanu stoi w nagłówku ekranu przejścia bez zmiany brzmienia, za imieniem postaci i mapą, a „Restart”, ostrzeżenie o przyciętym planie i „Zakończ” stoją w nim jak dziś. | decision | pytanie 3 | Czy „Restart” i „Zakończ”, których projektowany wpis o układzie nie wymienia w nagłówku, zapisać przy nagłówku, czy pominąć ich miejsce w fundamencie. |
| 2 | Kadr sceny to las w śniegu, z gotowych obrazków starego Loop. | decision | pytanie 2 | Jaki las złożyć, na którym zadanie 7 postawi maga, a zadanie 18 szron. |
| 3 | Kadr sceny jest w pełnym świetle, a noc to warstwa nad kadrem. | decision | pytanie 2 | Czy przyciemnić plik kadru, jak obraz za kartą logowania. |
| 4 | „Dodaj regułę z tym” dodaje regułę na końcu pierwszej grupy kopii: przy odkrytej czynności „Zawsze → {pierwsza odkryta czynność}”, z celem z pierwszego pasującego przedmiotu tego odkrycia, a bez takiego z pierwszym celem siatki; bez czynności „{pierwszy odkryty warunek} → Eksploruj”; przy samym przedmiocie albo stworzeniu działa jak „+ reguła”; panel otwiera się na polu, które przycisk wypełnił z odkrycia. | decision | pytania 5 i 10 | Co robi przycisk, który definicja tylko nazywa, i co wpisuje w pola reguły. |
| 5 | Pas odkrycia mówi o regule dopisanej przez grę „Gra dopisała regułę w grupie „{nazwa grupy}”: Zawsze → Eksploruj.”, bez numeru reguły. | decision | pytanie 6 | Brzmienie zdania, czy dać numer reguły i czy nazwać grupę. |
