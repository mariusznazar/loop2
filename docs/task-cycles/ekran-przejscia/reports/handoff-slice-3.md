# Handoff — Slice 3 of the task cycle `ekran-przejscia`

## Delegation and boundary

The human asked the orchestrator to take this task through the-way's task cycle to a reviewable
pull request and delegated the intermediate choices to it. You are the executor of Slice 3; your
variant of `make-change` is **a slice, or the retry of a slice**. You make this slice alone and return before any other
slice, review or gate run. Questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\ekran-przejscia`
- Branch `task/ekran-przejscia`; the slice's base is `1f899ec` (the current head). Commit on the
  branch; never push; never reset below the slice's base.
- Method: read whole `.the-way/task-cycle/change/SKILL.md` and follow it; read a file it names only
  when the step or variant that names it comes. Where it names another the-way skill, use the
  project skill with the `the-way-` prefix.
- Frozen task: `.runs/task-cycles/ekran-przejscia/task.md` (accepted 2026-11-03). The passages your
  slice needs are copied below; the plan is `.runs/task-cycles/ekran-przejscia/plan.md` and no spec
  was written.
- Report: `.runs/task-cycles/ekran-przejscia/reports/report-slice-3.md`. If the harness refuses
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

- D-313 at the current head is binding for what the button adds, where the panel opens and that it gives null (the button greyed out) where the copy holds no rule group; read it whole.
- Slice 2 (commit `1f899ec`) added `chillRuleGroupName` to `src/browser/sim/understanding.ts`; your module does not need it.

## The slice's section of the plan, word for word (`plan.md`)

### Slice 3 — The rule „Dodaj regułę z tym” adds

- **Goal:** a new pure module `src/browser/view/discovery-rule.ts` exports a function that, from a game state holding a map run and a held discovery, returns the copy's program with one rule added at the end of the copy's first rule group, together with where the rule panel opens on it — the group, the new rule and the field, in the shape `RulePanelOpen` of `rule-panel.tsx` (a type-only import) — or null where the state holds no map run or no discovery, or the copy holds no rule group. The rule, as row 4 gives: where the discovery holds an action, „Zawsze → {its first action}”, and where that action takes a target, the first target that matches an item of the same discovery, else the first target the rule panel's grid offers for it, the panel opening on the action field, the first of the fields the button filled in the panel's order; where it holds no action but a condition, „{its first condition} → Eksploruj”, the condition's number and target being those a pick of that condition in the rule panel gives, the panel opening on the condition field; where it holds only items, creatures or trees, the rule „+ reguła” adds, „Zawsze → Eksploruj”, with the panel on the condition (D-124). „First” is the order the discovery holds, which is the order of the data. The new rule takes the copy's next rule identity. Build it from the pure functions of `program-editor.ts` (`addRule`, `withActionKind`, `withConditionKind` and the targets they offer), so a pick in the panel and the button give the same values. The module draws nothing and holds no DOM. Write the cases first in a new `tests/view/discovery-rule.test.mjs`, the expected rules written out: „Odkryto: Zbierz, Patyk.” gives „Zawsze → Zbierz — patyk” opening on the action (question 10); the first chill (Eksploruj, Wędruj, Temperatura poniżej) gives „Zawsze → Eksploruj” on the action; a discovery of conditions alone gives „{first condition} → Eksploruj” with the pick's number and target, on the condition; an item or a creature alone gives „Zawsze → Eksploruj” on the condition; an action that takes a target with no matching item in the discovery takes the grid's first target; the rule stands last in the first group and every other group and rule stays; no rule group, no discovery or no map run gives null.
- **Change:** `src/browser/view/discovery-rule.ts` · `tests/view/discovery-rule.test.mjs`
- **Read:** `.runs/task-cycles/ekran-przejscia/task.md:43-52` To do · `.runs/task-cycles/ekran-przejscia/task.md:84-89` Questions to settle · `.runs/task-cycles/ekran-przejscia/task.md:109-113` Questions to settle · `.runs/task-cycles/ekran-przejscia/task.md:231-241` Settlements to record ·
  `foundations/decisions.md:2272-2296` D-124 · `foundations/decisions.md:2443-2476` D-131 · `foundations/decisions.md:6072-6107` D-288 · `foundations/decisions.md:6108-6146` D-289 · `foundations/decisions.md:6451-6478` D-306 · `foundations/decisions.md:2095-2118` D-118 · `foundations/decisions.md:383-401` D-18 · `foundations/invariants.md:236-247` content-identifiers ·
  Foundation entry E11 ·
  `src/browser/AGENTS.md` · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `src/browser/view/program-editor.ts` · `src/browser/view/rule-panel.tsx:55-112` · `src/browser/view/rule-panel.tsx:225-370` · `src/browser/view/status-row.ts:118-160` · `src/browser/sim/types.ts` · `src/browser/sim/data/actions.ts` · `tests/sim/understanding-fixture.mjs` · `tests/sim/program-fixture.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/discovery-rule.test.mjs`, its cases seen failing before the module exists; `npm run typecheck`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Foundation entry E11

## What you read

The ranges below are current at 1f899ec; where they differ from the plan's, these hold.

### Foundation entries, each whole

- D-124 — `foundations/decisions.md:2278-2302`
- D-131 — `foundations/decisions.md:2450-2483`
- D-288 — `foundations/decisions.md:6082-6117`
- D-289 — `foundations/decisions.md:6118-6156`
- D-306 — `foundations/decisions.md:6461-6488`
- D-118 — `foundations/decisions.md:2097-2120`
- D-18 — `foundations/decisions.md:383-401`
- content-identifiers — `foundations/invariants.md:236-247`

### Entries written by the cycle's foundation step

- E11 — D-313 — new, „What does „Dodaj regułę z tym” do?”, read it whole — `foundations/decisions.md:6696-6732`

### Files (whole unless a range is given)

- `src/browser/AGENTS.md`
- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `src/browser/view/program-editor.ts`
- `src/browser/view/rule-panel.tsx:55-112`
- `src/browser/view/rule-panel.tsx:225-370`
- `src/browser/view/status-row.ts:118-160`
- `src/browser/sim/types.ts`
- `src/browser/sim/data/actions.ts`
- `tests/sim/understanding-fixture.mjs`
- `tests/sim/program-fixture.mjs`

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
