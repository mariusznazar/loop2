# Handoff — Slice 2 of the task cycle `ekran-przejscia`

## Delegation and boundary

The human asked the orchestrator to take this task through the-way's task cycle to a reviewable
pull request and delegated the intermediate choices to it. You are the executor of Slice 2; your
variant of `make-change` is **a slice, or the retry of a slice**. You make this slice alone and return before any other
slice, review or gate run. Questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\ekran-przejscia`
- Branch `task/ekran-przejscia`; the slice's base is `e35e91d` (the current head). Commit on the
  branch; never push; never reset below the slice's base.
- Method: read whole `.the-way/task-cycle/change/SKILL.md` and follow it; read a file it names only
  when the step or variant that names it comes. Where it names another the-way skill, use the
  project skill with the `the-way-` prefix.
- Frozen task: `.runs/task-cycles/ekran-przejscia/task.md` (accepted 2026-11-03). The passages your
  slice needs are copied below; the plan is `.runs/task-cycles/ekran-przejscia/plan.md` and no spec
  was written.
- Report: `.runs/task-cycles/ekran-przejscia/reports/report-slice-2.md`. If the harness refuses
  that write, return the whole report as text in your final message instead.
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

- Your section of the plan was revised by the orchestrator after review 1 (finding I1) and the human's correction: the function returns the name of the copy's first rule group, in the editor's order, that holds a program rule „Zawsze → Eksploruj”, where the held discovery is the one at which the game wrote that rule — D-312 as it stands at the current head is binding; read it whole, its *Verification* examples included (drag, rename, deletion, another group holding its own „Zawsze → Eksploruj”), and write cases for them.
- „+ reguła” adds exactly the rule „Zawsze → Eksploruj” (D-124), and rules move between groups (D-288): the function keys on any such rule, as D-312 says.

## The slice's section of the plan, word for word (`plan.md`)

### Slice 2 — The simulation names the group of the rule it wrote at the held discovery

- **Goal:** (revised by the orchestrator after review 1, finding I1; D-312 as rewritten holds) `src/browser/sim/understanding.ts` exports, beside `withFirstChillRule`, a pure function that takes a game state and returns the name of the first rule group of the copy the map run carries out, in the copy's order, that holds a program rule „Zawsze → Eksploruj” — the group where the rule the game wrote at the held discovery stands now — or null where the state holds no discovery or no map run, where the held discovery is not the one at which the game wrote that rule, or where no group of the copy holds such a rule any more. The game writes that rule at the first chill (D-123), so whether the held discovery wrote it is read from what the state already holds: the held discovery holds an action the data reveals by the chill (`revealedBy` of kind `chilled`), which the Understanding gains once. Inputs are not changed. No type of `GameState`, no saved document and no constant of `src/browser/sim/saved-game.ts` changes, so `SAVED_GAME_VERSION` stays (the plan's rule raises the version only with a change of shape; carried question 4). Write the cases first in `tests/sim/discovery.test.mjs`: a new game's first chill names „Program”; a copy whose first group the player renamed before the first chill names that name; a copy with no rule group gets „Program” (D-123); after the first chill, another group dragged above the one holding the rule still gives the group holding it; the rule deleted gives null; the rule's group deleted gives null; the first finished exploration, a discovery that wrote no rule, gives null; a state holding no discovery gives null, after „Wznów” too; a saved document of the paused state loaded again gives the same name, showing that the shape needs no change.
- **Change:** `src/browser/sim/understanding.ts` · `tests/sim/discovery.test.mjs`
- **Read:** `.runs/task-cycles/ekran-przejscia/task.md:43-52` To do · `.runs/task-cycles/ekran-przejscia/task.md:90-96` Questions to settle · `.runs/task-cycles/ekran-przejscia/task.md:143-148` Questions carried to cycle ·
  `foundations/decisions.md:2203-2238` D-122 · `foundations/decisions.md:2239-2271` D-123 · `foundations/decisions.md:2095-2118` D-118 · `foundations/decisions.md:52-113` D-04 · `foundations/decisions.md:777-791` D-35 · `foundations/decisions.md:3668-3693` D-206 · `foundations/invariants.md:198-213` player-map-run-pace · `foundations/invariants.md:214-235` simulation-isolation and simulation-inputs · `foundations/invariants.md:1029-1038` save-version · `foundations/part_map.md:30-61` simulation ·
  Foundation entries E9, E10 ·
  `guidelines/coding.md` · `guidelines/coding-simulation-module.md` · `guidelines/testing.md` ·
  `src/browser/sim/game.ts:614-773` · `src/browser/sim/types.ts:400-434` · `src/browser/sim/data/actions.ts` · `tests/sim/understanding-fixture.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/sim/discovery.test.mjs`, its new cases seen failing before the function exists; `npm test -- tests/sim/saved-game.test.mjs` passing unchanged; `npm test -- tests/invariants/test_simulation_isolation.py`; `npm test -- tests/invariants/test_simulation_inputs.py`; `npm run typecheck`
- **Depends on:** Foundation entries E9, E10

## What you read

The ranges below are current at e35e91d; where they differ from the plan's, these hold.

### Foundation entries, each whole

- D-122 — `foundations/decisions.md:2205-2244`
- D-123 — `foundations/decisions.md:2245-2277`
- D-118 — `foundations/decisions.md:2097-2120`
- D-04 — `foundations/decisions.md:52-113`
- D-35 — `foundations/decisions.md:779-793`
- D-206 — `foundations/decisions.md:3677-3702`
- player-map-run-pace — `foundations/invariants.md:198-213`
- simulation-isolation — `foundations/invariants.md:214-225`
- simulation-inputs — `foundations/invariants.md:226-235`
- save-version — `foundations/invariants.md:1029-1038`
- part `simulation` — `foundations/part_map.md:30-61`

### Entries written by the cycle's foundation step

- E9 — D-122 (part rewritten: the band) — read it whole — `foundations/decisions.md:2205-2244`
- E10 — D-312 — new, „How does the band of a discovery name the program rule the game wrote?”, read it whole — `foundations/decisions.md:6655-6695`

### Files (whole unless a range is given)

- `guidelines/coding.md`
- `guidelines/coding-simulation-module.md`
- `guidelines/testing.md`
- `src/browser/sim/game.ts:614-773`
- `src/browser/sim/types.ts:400-434`
- `src/browser/sim/data/actions.ts`
- `tests/sim/understanding-fixture.mjs`

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

#### task.md:90-96 — Questions to settle

- Pytanie 6. Jak pas odkrycia mówi o regule, którą dopisała gra?
  - Answer: „Gra dopisała regułę w grupie „{nazwa grupy}”: Zawsze → Eksploruj.”, bez numeru reguły. Słaby punkt przyjęty z tą drogą: dłuższe zdanie w pasie.
  - Not chosen:
    - zdanie bez grupy, „Gra dopisała regułę: Zawsze → Eksploruj.”, wybrane w pierwszym pakiecie i zmienione pytaniem kontrolnym — gracz sam szuka reguły w programie
    - z numerem „1.1” — zależność od numeracji
    - bez zdania do zadania 10 — odejście od definicji
  - Source: Mariusz, 2026-11-03: najpierw „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, wiersz T31 (zdanie bez grupy); potem „wszystko przyjmuję zgodnie z rekomendacjami”, drugi pakiet rundy, pytanie kontrolne E4, droga B, które zmieniło tamten wybór. Definicja_mvp2_loop2.md (odcisk 9641f804), D-122, wiersz 631: „names what was discovered and the program rule the game wrote”; D-123, wiersz 646: „where either holds no rule group, the game adds the rule group „Program” with the condition „Zawsze” and writes the rule into it”.

#### task.md:143-148 — Questions carried to cycle

## Questions carried to cycle

- Jak złożyć kadr z kawałków paczki i czy skrypt składający wchodzi do repozytorium?
- Jaką szerokość mają obszary świata i prawy, skoro program bierze resztę?
- Od jakiej szerokości okna trzy obszary stoją obok siebie, skoro dziś kolumny składają się dopiero poniżej 720 px?
- Jak symulacja mówi widokowi o regule, którą dopisała, i o grupie, do której ją wpisała, i czy zmienia to kształt zapisu gry? Plan: „każde zadanie, które zmienia kształt stanu gry, podbija wersję raz w swojej zmianie”.
