# Handoff — Slice 4 of the task cycle `ekran-przejscia`

## Delegation and boundary

The human asked the orchestrator to take this task through the-way's task cycle to a reviewable
pull request and delegated the intermediate choices to it. You are the executor of Slice 4; your
variant of `make-change` is **a slice, or the retry of a slice**. You make this slice alone and return before any other
slice, review or gate run. Questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\ekran-przejscia`
- Branch `task/ekran-przejscia`; the slice's base is `476b12a` (the current head). Commit on the
  branch; never push; never reset below the slice's base.
- Method: read whole `.the-way/task-cycle/change/SKILL.md` and follow it; read a file it names only
  when the step or variant that names it comes. Where it names another the-way skill, use the
  project skill with the `the-way-` prefix.
- Frozen task: `.runs/task-cycles/ekran-przejscia/task.md` (accepted 2026-11-03). The passages your
  slice needs are copied below; the plan is `.runs/task-cycles/ekran-przejscia/plan.md` and no spec
  was written.
- Report: `.runs/task-cycles/ekran-przejscia/reports/report-slice-4.md`. If the harness refuses
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

- Slice 3 (commit `476b12a`) wrote `src/browser/view/discovery-rule.ts`: `discoveryRule(state): DiscoveryRule | null`, with `DiscoveryRule = { program, open: RulePanelOpen }`. Use it as it is.
- The orchestrator's answers on Slice 3's concerns (binding): a discovered action the character cannot use yet is written as D-313 says and shown greyed by the panel (D-289); no guard is added.

## The slice's section of the plan, word for word (`plan.md`)

### Slice 4 — The program panel adds the discovered rule

- **Goal:** the boundary `ProgramPanel` of `src/browser/view/program-panel.tsx` gains `addDiscoveredRule()`, for the screen of a map run to call from an event handler: from the game state the panel last got it takes the result of the function of Slice 3 (in `src/browser/view/discovery-rule.ts`); where that is null it does nothing; otherwise it sends the program through `controls.editCopy`, as every edit of the copy goes (the simulation's `setProgram`, after which the streak and the beaten attacks are zero, D-131), shows the copy where the select list „Program:” showed a saved program, and opens the rule panel on the new rule and on the field the result names — in the host the screen placed (`placeRulePanel`) where it placed one, telling the screen through `onOpen` as any opening does — with the keyboard focus on that field as the panel gives it when it moves to a field. A panel of Programy (mode `programs`) does nothing. Nothing else of the panel changes. Write the cases first in `tests/view/program-panel.test.mjs`, with controls that apply each act to the game state as the existing cases of „+ reguła” do: at the first chill of a new game the call adds „Zawsze → Eksploruj” at the end of the copy's group „Program”, opens the panel on the action field in the host, and the streak of the map run is zero; with a saved program shown on the select list the call shows the copy and opens the rule there; with no discovery held, the call changes nothing and opens nothing.
- **Change:** `src/browser/view/program-panel.tsx` · `tests/view/program-panel.test.mjs`
- **Read:** `.runs/task-cycles/ekran-przejscia/task.md:43-52` To do · `.runs/task-cycles/ekran-przejscia/task.md:84-89` Questions to settle · `.runs/task-cycles/ekran-przejscia/task.md:109-113` Questions to settle ·
  `foundations/decisions.md:2272-2296` D-124 · `foundations/decisions.md:2443-2476` D-131 · `foundations/decisions.md:6072-6107` D-288 · `foundations/decisions.md:6451-6478` D-306 · `foundations/decisions.md:6381-6399` D-302 · `foundations/decisions.md:3026-3045` D-166 · `foundations/decisions.md:5481-5509` D-267 · `foundations/decisions.md:5379-5410` D-264 · `foundations/invariants.md:829-838` streak-program-change ·
  Foundation entry E11 ·
  `src/browser/AGENTS.md` · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `tests/view/page-document.mjs` · `src/browser/view/rule-panel.tsx:55-112` · `src/browser/view/rule-panel.tsx:225-320` · `src/browser/view/rule-list.tsx:375-400`
- **Model:** same — it changes the open-rule state and the focus of the largest React component of the view, whose order of hooks and effects only review guards (D-267)
- **Risk:** none
- **Checks:** `npm test -- tests/view/program-panel.test.mjs`, its new cases seen failing first; `npm test -- tests/view/account-screen.test.mjs`; `npm run typecheck`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 3

## What you read

The ranges below are current at 476b12a; where they differ from the plan's, these hold.

### Foundation entries, each whole

- D-124 — `foundations/decisions.md:2278-2302`
- D-131 — `foundations/decisions.md:2450-2483`
- D-288 — `foundations/decisions.md:6082-6117`
- D-306 — `foundations/decisions.md:6461-6488`
- D-302 — `foundations/decisions.md:6391-6409`
- D-166 — `foundations/decisions.md:3035-3054`
- D-267 — `foundations/decisions.md:5489-5517`
- D-264 — `foundations/decisions.md:5387-5418`
- streak-program-change — `foundations/invariants.md:829-838`

### Entries written by the cycle's foundation step

- E11 — D-313 — new, „What does „Dodaj regułę z tym” do?”, read it whole — `foundations/decisions.md:6696-6732`

### Files (whole unless a range is given)

- `src/browser/AGENTS.md`
- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `tests/view/page-document.mjs`
- `src/browser/view/rule-panel.tsx:55-112`
- `src/browser/view/rule-panel.tsx:225-320`
- `src/browser/view/rule-list.tsx:375-400`

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

#### task.md:84-89 — Questions to settle

- Pytanie 5. Co robi „Dodaj regułę z tym”?
  - Answer: Dodaje regułę na końcu pierwszej grupy kopii i otwiera panel z pierwszą odkrytą czynnością, a bez czynności z pierwszym warunkiem; przy samym przedmiocie albo stworzeniu działa jak „+ reguła”. Koszt przyjęty z tą drogą: reguła działania na liście odkryć, a dodanie zeruje passę jak każda zmiana kopii.
  - Not chosen:
    - działa jak „+ reguła” — napis „z tym” obiecuje więcej
    - przycisk później — odejście od zatwierdzonego brzmienia i wskazanie zadania
  - Source: Mariusz, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, punkt B13, rekomendacja A. Przycisk nazywa definicja_mvp2_loop2.md (odcisk 9641f804), D-122, wiersz 631: „with „Dodaj regułę z tym” and „Wznów””.

#### task.md:109-113 — Questions to settle

- Pytanie 10. Co jeszcze stoi w regule, którą dodaje „Dodaj regułę z tym”: jaki warunek przy odkrytej czynności, jaki cel, gdy czynność go potrzebuje, i na którym polu otwiera się panel?
  - Answer: Przy odkrytej czynności warunek „Zawsze”; gdy czynność potrzebuje celu, celem jest pierwszy pasujący przedmiot z tego samego odkrycia, a bez takiego pierwszy cel z siatki. Przy samym warunku reguła to „{warunek} → Eksploruj”. Panel otwiera się na polu, które przycisk wypełnił z odkrycia. Koszt przyjęty z tą drogą: jedno zdanie zasady; zysk: „Odkryto: Zbierz, Patyk.” daje od razu „Zawsze → Zbierz — patyk”.
  - Not chosen:
    - cel zawsze pierwszy w siatce, bez patrzenia na odkrycie — „Odkryto: Zbierz, Patyk.” może dać „Zbierz — jagoda”
  - Source: Mariusz, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami”, odpowiedź na drugi pakiet rundy zadań 4, 5, 6, 7 i 11, punkt C2, rekomendacja A; pytanie wspólne z zadaniem 5, którego panel przycisk otwiera. Dla porównania definicja_mvp2_loop2.md (odcisk 9641f804), D-124, wiersz 661: „„+ reguła” adds a program rule at the end of its rule group and opens its rule panel on the condition, „Zawsze → Eksploruj” standing there until the player picks otherwise”.
