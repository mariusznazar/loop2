# Handoff — Slice 5 of the task cycle `ekran-przejscia`

## Delegation and boundary

The human asked the orchestrator to take this task through the-way's task cycle to a reviewable
pull request and delegated the intermediate choices to it. You are the executor of Slice 5; your
variant of `make-change` is **a slice, or the retry of a slice**. You make this slice alone and return before any other
slice, review or gate run. Questions go to the orchestrator, never to the human.

- Worktree (work from its root): `C:\Storage\repos\loop2-wt\ekran-przejscia`
- Branch `task/ekran-przejscia`; the slice's base is `64a2fcf` (the current head). Commit on the
  branch; never push; never reset below the slice's base.
- Method: read whole `.the-way/task-cycle/change/SKILL.md` and follow it; read a file it names only
  when the step or variant that names it comes. Where it names another the-way skill, use the
  project skill with the `the-way-` prefix.
- Frozen task: `.runs/task-cycles/ekran-przejscia/task.md` (accepted 2026-11-03). The passages your
  slice needs are copied below; the plan is `.runs/task-cycles/ekran-przejscia/plan.md` and no spec
  was written.
- Report: `.runs/task-cycles/ekran-przejscia/reports/report-slice-5.md`. If the harness refuses
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

- Earlier slices: Slice 2 `chillRuleGroupName` in `src/browser/sim/understanding.ts`; Slice 3 `discoveryRule` in `src/browser/view/discovery-rule.ts`; Slice 4 `addDiscoveredRule()` on `ProgramPanel` in `src/browser/view/program-panel.tsx`. Your header does not need them.
- D-311 (the layout, with row 1 in it) and D-130 at the current head are binding for the header; read them whole.
- `tests/quality/test_quality_invariants.py` finds its tools in `.runs/quality-venv/Scripts`; it also runs Prettier on the files you change — format them with the local Prettier before committing.

## The slice's section of the plan, word for word (`plan.md`)

### Slice 5 — The header of the screen of a map run

- **Goal:** a new React component in `src/browser/view/run-header.tsx`, with no boundary of its own (the screen of Slice 9 renders it), draws the header of the screen of a map run from a game state holding the map run the screen was given and from the controls `StatusRowControls` of `status-row.ts`: the character's name (from the team, by the map run's character), the map's name from the data, then the whole status row of today with its wording unchanged and in today's order — the text `statusText`, „Pauza” or „Wznów” by `pauseLabel`, the five pace buttons of `BALANCE.paces` as the shared React button selected in its group (D-130, D-276), „Restart” as the destructive React button, the warning of a cut trip plan by `tripWarning` of `trip-lines.ts` (D-188), „Zakończ” as the destructive React button (D-44). The status text carries the class `positive` after a completion and only then (D-132); after a death and after a completion „Pauza” and the pace buttons are absent (D-62, D-132); the clock stays in Geist Mono as the status text has it today (D-46). It imports only the pure functions of the DOM modules (D-265) and builds no element after their pattern; the program, the band and the areas are not its. Its rules in `src/browser/styles.css` read existing tokens only; a value the token file lacks is named in the report, never chosen (`src/browser/AGENTS.md`). Write the cases first in a new `tests/view/run-header.test.mjs` on the harness, carrying the behaviours of the DOM cases of `tests/view/status-row.test.mjs` that Slice 10 removes (at lines 338, 495, 516, 550 and 607 at the base): the name and the map stand before the status text; the pause button gone after a death while „Restart” and „Zakończ” stay; five pace buttons with the state's pace selected; a click on a pace asks for that pace, the buttons staying while paused and going with a death; the text positive after a completion only, the pace and pause buttons gone and „Restart” and „Zakończ” staying; the warning following the current copy's take list; a focused pace button keeping the focus across updates.
- **Change:** `src/browser/view/run-header.tsx` · `src/browser/styles.css` · `tests/view/run-header.test.mjs`
- **Read:** `.runs/task-cycles/ekran-przejscia/task.md:28-30` To do · `.runs/task-cycles/ekran-przejscia/task.md:53-55` To do · `.runs/task-cycles/ekran-przejscia/task.md:72-78` Questions to settle · `.runs/task-cycles/ekran-przejscia/task.md:231-241` Settlements to record ·
  `foundations/decisions.md:2421-2442` D-130 · `foundations/decisions.md:2503-2522` D-133 · `foundations/decisions.md:1227-1241` D-62 · `foundations/decisions.md:2477-2502` D-132 · `foundations/decisions.md:3369-3381` D-188 · `foundations/decisions.md:443-476` D-21 · `foundations/decisions.md:2397-2420` D-129 · `foundations/decisions.md:912-926` D-44 · `foundations/decisions.md:5411-5452` D-265 · `foundations/decisions.md:5755-5792` D-276 · `foundations/decisions.md:942-956` D-46 · `foundations/decisions.md:897-911` D-43 · `foundations/decisions.md:5379-5410` D-264 · `foundations/invariants.md:35-44` browser-view-framework · `foundations/invariants.md:459-468` browser-view-token-values ·
  Foundation entries E1, E3, E4, E5, E17 ·
  `src/browser/AGENTS.md` · `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/testing.md` · `guidelines/styleguide-browser-view.md` ·
  `tests/view/page-document.mjs` · `src/browser/view/status-row.ts` · `tests/view/status-row.test.mjs` · `src/browser/view/trip-lines.ts` · `src/browser/view/controls/react-button.tsx` · `src/browser/view/character-screen.tsx` · `tests/view/character-screen.test.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/run-header.test.mjs`, its cases seen failing before the component exists; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_browser_view_focus_outline.py`; `npm test -- tests/quality/test_node_test_selection.py`; `npm run typecheck`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Foundation entries E1, E3, E4, E5, E17

## What you read

The ranges below are current at 64a2fcf; where they differ from the plan's, these hold.

### Foundation entries, each whole

- D-130 — `foundations/decisions.md:2427-2449`
- D-133 — `foundations/decisions.md:2510-2531`
- D-62 — `foundations/decisions.md:1229-1243`
- D-132 — `foundations/decisions.md:2484-2509`
- D-188 — `foundations/decisions.md:3378-3390`
- D-21 — `foundations/decisions.md:445-478`
- D-129 — `foundations/decisions.md:2403-2426`
- D-44 — `foundations/decisions.md:914-928`
- D-265 — `foundations/decisions.md:5419-5460`
- D-276 — `foundations/decisions.md:5765-5802`
- D-46 — `foundations/decisions.md:944-958`
- D-43 — `foundations/decisions.md:899-913`
- D-264 — `foundations/decisions.md:5387-5418`
- browser-view-framework — `foundations/invariants.md:35-44`
- browser-view-token-values — `foundations/invariants.md:459-468`

### Entries written by the cycle's foundation step

- E1 — D-130 (rewritten whole in the projected wording) — read it whole in `foundations/decisions.md` — `foundations/decisions.md:2427-2449`
- E3 — D-311 — new, „How is the screen of a map run laid out?”, read it whole — `foundations/decisions.md:6619-6654`
- E4 — D-311 — row 1 written into the same entry, read it whole — `foundations/decisions.md:6619-6654`
- E5 — D-133 (part rewritten) — read it whole — `foundations/decisions.md:2510-2531`
- E17 — D-46 (Verification example) — read it whole — `foundations/decisions.md:944-958`

### Files (whole unless a range is given)

- `src/browser/AGENTS.md`
- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/testing.md`
- `guidelines/styleguide-browser-view.md`
- `tests/view/page-document.mjs`
- `src/browser/view/status-row.ts`
- `tests/view/status-row.test.mjs`
- `src/browser/view/trip-lines.ts`
- `src/browser/view/controls/react-button.tsx`
- `src/browser/view/character-screen.tsx`
- `tests/view/character-screen.test.mjs`

### Passages of the frozen task, word for word (`.runs/task-cycles/ekran-przejscia/task.md`)

#### task.md:28-30 — To do

1. Nad obszarami ekranu przejścia stoi jeden nagłówek: imię postaci, nazwa mapy, a za nimi cały dzisiejszy wiersz stanu bez zmiany brzmienia (pytanie 3).
   - Wiersz stanu to tekst „Minuta {minuta} · {czynność} · Passa {streak}/{required}”, z „ (pauza)” na końcu w pauzie, oraz „Pauza” albo „Wznów”, pięć przycisków tempa, „Restart”, ostrzeżenie o przyciętym planie i „Zakończ”, w dzisiejszej kolejności.
   - Cel w liczbach to „Passa {streak}/{required}” i „Pokonane napaści {count}/{required}”, w tej kolejności, gdy warunek mapy ma oba wymagania.

#### task.md:53-55 — To do

8. Ekran przejścia jest ekranem w React i dalej dostaje przejście jako parametr, zamiast sam czytać je ze stanu gry.
   - Przyciski nagłówka i pasa są wspólnymi kontrolkami w postaci React (D-265).
   - „Restart” i „Zakończ” biorą postać React przycisku niszczącego, którą dokłada zadanie 4; gdyby jej przy starcie cyklu nie było, dokłada ją to zadanie z przypadkiem w teście porównującym obie postaci.

#### task.md:72-78 — Questions to settle

- Pytanie 3. Gdzie do zadania 14 stoi to, co postać robi, i gdzie stoją „Restart”, ostrzeżenie o przyciętym planie i „Zakończ”?
  - Answer: Cały wiersz stanu przechodzi do nagłówka bez zmiany brzmienia, a przed nim stają imię postaci i mapa; „Restart” i „Zakończ” stoją w nim jak dziś. Zegar czyta się dalej „Minuta 212”. Pozycja „Wróć do przejścia” stoi w menu tylko poza ekranem przejścia, więc w nagłówku jej nie ma. Słaby punkt przyjęty z tą drogą: długi nagłówek do zadania 14.
  - Not chosen:
    - nagłówek bez czynności, a pod kadrem osobny wiersz z tym, co postać robi — część pracy zadania 14 i zmiana planu
    - zegar w zapisie „03:32” — nowy zapis czasu
    - „Wróć do przejścia” także na ekranie przejścia — odnośnik do miejsca, w którym gracz już jest
  - Source: Mariusz, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, punkt B16, rekomendacja „A, C, E, czyli „Wróć do przejścia · Las · minuta 212””; pytanie wspólne z zadaniem 4.

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
