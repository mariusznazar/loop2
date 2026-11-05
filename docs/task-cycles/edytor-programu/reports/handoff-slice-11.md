# Handoff — slice 11 of the task `edytor-programu`

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator of
`implement-task`. You never ask the human. A question goes back to the orchestrator in your report
with status `questions`; a fact or permission nobody supplies makes you `blocked`. Nothing here is the human's approval.

## Where you work

- Worktree (work from its root): `C:/Storage/repos/loop2-wt/edytor-programu`, branch `task/edytor-programu`.
  Your base (the head when you start): `ee9cab2`. Commit your work on this branch; push nothing.
- Pinned process: the worktree's `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
- You make: **a slice, or the retry of a slice** — slice 11. Read in full `.the-way/task-cycle/change/SKILL.md` (project skill
  `the-way-make-change`) and `.the-way/task-cycle/change/slice.md`; read `.the-way/task-cycle/change/ui_check.md` when the slice changes a user interface (the step that names it comes).
- Report: `docs/task-cycles/edytor-programu/reports/report-slice-11.md` (if your tool refuses the file, return the whole report as text).
- Commit by paths with `git add <paths>` only (never `-A`, `.`, `-a`); messages in English in the repository's form (see `git log --oneline -8`, e.g. `feat: :sparkles: …`, `docs: :memo: …`). Do not run the product's gate (`npm test` with no argument); run the focused checks your section names, each with command and exit code in the report.

## Answers of the start

- Trust boundary: the change touches `assets/icons/**` (files from game-icons.net) in slices 3 and 4 only; the review of those slices checks crafted input there.
- Irreversible operation: none. Open design choice: none; a choice of how to make what the task and the foundation settle is yours to make and name in the report; a real open design choice makes you return `returned` with no code.
- The foundation step has run: the entries D-288 to D-307 and the changed ones (D-03, D-27, D-39, D-43, D-44, D-91, D-93, D-124, D-166, D-180, D-196, D-245, D-255, D-282, icon-credits, the icon title facts, game-icons-licence) are written. Entry ranges below are current ones; they hold where they differ from the plan's.
- The base gate already fails on `tests/quality/test_quality_invariants.py::test_ruff_source_rules` and `::test_shellcheck_source_rules` (`FileNotFoundError`: ruff and shellcheck are not installed on this computer). That is the base's state: report any other failure of that file as yours.
- Two of the 11 icons are not by Delapouite or Lorc (see the foundation step's report): `logging` is by Skoll (https://game-icons.net/1x1/skoll/logging.html) and `dodge` by Felbrigg (https://game-icons.net/1x1/felbrigg/dodge.html); the foundation names them in `game-icons-licence`. Relevant only to slices 3 and 4.
- This is the second dispatch of slice 11: the first attempt returned with no code and nothing was committed (branch at `ee9cab2`, nothing to reset). Its report is `docs/task-cycles/edytor-programu/reports/report-slice-11-returned.md` — read it. It is not a retry for a failed slice.
- Orchestrator's answer to the question it raised (autonomous choice Q9, recorded in the cycle record, not the human's): **option A.** The orchestrator read D-181 and `readNumberField` and confirms the mismatch. D-181 and D-44 settle *what* is to hold; *how* is yours to make and name: add an opt-in prop to `ReactNumberField` (`src/browser/view/controls/react-number-field.tsx`) that applies the trip count rule instead of `readNumberField`'s — text that is not a safe integer from 1 (`tripCount` of `trip-editor.ts` gives the rule) commits nothing, keeps the previous count, keeps the draft visible and lets the parent show the message „Wpisz liczbę całkowitą od 1.” through the field's `error` prop (the frame and message in the `warning` role, as the DOM trip editor draws them). **The default behaviour of `ReactNumberField` must stay as slice 7 made it** (slice 10's rule panel uses it, and its cases must keep passing).
- **Your *Change* list is widened** by `src/browser/view/controls/react-number-field.tsx` and `tests/view/react-controls.test.mjs` (add cases for the opt-in rule, test first). The mechanical check of this slice counts these two files as part of its *Change*. If the opt-in needs an attribute to stand in the DOM form too, `src/browser/view/controls/number-field.ts` is also yours; report it.
- The unfold of the folded line: your own choice stands (a wrapper whose click toggles folding, holding a shared `ReactButton`); name it in the report.

## Your section of the plan, word for word (`docs/task-cycles/edytor-programu/plan.md`)

### Slice 11 — The trip plan of Programy in React

- **Goal:** a new `src/browser/view/trip-plan.tsx` holds „Plan wyprawy” as a React component the program panel of Programy will hold between the program's name and its rules (Slice 12; row E14, question 11): folded, one line with „Zabierz” and „Wynieś”, each position's item icon — the item's resource icon as an image, its colour in its file, as the terrain draws it — and its count, or „Plan wyprawy: pusty” when both lists are empty (row E36); unfolded by a click on the line, or by Enter on it, each list's positions with an item select list and a number field in their React forms (Slice 7), „↑”, „↓”, the destructive „Usuń”, and „Dodaj przedmiot” below each list, as D-180 and D-181 give them and as `createTripEditor` of `trip-editor.ts` does today, from its pure `tripCount` and `tripChoices`; each edit committing a whole new program through a callback; the folding a state of the component, folded at the start. The look stands in `src/browser/styles.css`, in the roles the styleguide gives a line of text and the shared controls. The new test `tests/view/trip-plan.test.mjs` runs on jsdom (D-264) and holds the empty line, the folded line with positions, unfolding and folding, each edit of a position — add, count, item, „↑”, „↓”, „Usuń” — committing the program it gives (the DOM trip editor has no unit cases today; the case „an edit of a program's trip plan” of `tests/view/account-screen.test.mjs` reaches it through the page), and the items the list offers as `tripChoices` gives them.
- **Change:** `src/browser/view/trip-plan.tsx` · `tests/view/trip-plan.test.mjs` · `src/browser/styles.css`
- **Read:** `docs/task-cycles/edytor-programu/task.frozen.md:39-39` To do · `docs/task-cycles/edytor-programu/task.frozen.md:135-139` Questions to settle · `docs/task-cycles/edytor-programu/task.frozen.md:209-210` Context · `docs/task-cycles/edytor-programu/task.frozen.md:245-245` Wpisy projektowane, które zadanie urzeczywistnia w części · `docs/task-cycles/edytor-programu/task.frozen.md:318-318` Settlements to record
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  `foundations/part_map.md:3-28` browser-view
  `foundations/decisions.md:39-50` D-03 · `foundations/decisions.md:792-805` D-36 · `foundations/decisions.md:912-925` D-44 · `foundations/decisions.md:3236-3249` D-179 · `foundations/decisions.md:3251-3262` D-180 · `foundations/decisions.md:3264-3275` D-181 · `foundations/decisions.md:3329-3340` D-186 · `foundations/decisions.md:3342-3353` D-187 · `foundations/decisions.md:5360-5390` D-264 · `foundations/decisions.md:5392-5432` D-265 · `foundations/decisions.md:5462-5489` D-267 · `foundations/decisions.md:5491-5534` D-268
  Foundation entries rows E7, E14, E36, E38
  `foundations/invariants.md:35-43` browser-view-framework · `foundations/invariants.md:236-246` content-identifiers · `foundations/invariants.md:459-467` browser-view-token-values · `foundations/invariants.md:979-987` trip-plan-progress · `foundations/invariants.md:1189-1197` document-test-memory-limit
  `foundations/glossary.md:199-203` trip plan
  `src/browser/view/trip-editor.ts` · `tests/view/trip.test.mjs` · `tests/view/account-screen.test.mjs:2155-2260` · `src/browser/view/terrain-picture.ts` · `src/browser/sim/data/items.ts` · `src/browser/sim/data/resources.ts` · `src/browser/view/controls/react-button.tsx` · `tests/view/page-document.mjs`
  made by an earlier slice, named without backticks as they do not exist at the base: src/browser/view/controls/react-select-list.tsx and src/browser/view/controls/react-number-field.tsx (Slice 7)
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from the failing case of „Plan wyprawy: pusty”; `npm test -- tests/view/trip-plan.test.mjs`; `npm test -- tests/view/trip.test.mjs`; `npm run typecheck`; `npm test -- tests/invariants/test_browser_view_framework.py`; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_content_identifiers.py`; `npm test -- tests/quality/test_quality_invariants.py`; screenshots: none yet — the plan stands on no screen until Slice 12, so the report marks them unchecked with that reason and the states checked in its test
- **Depends on:** Slice 10 · Slice 7 · E14 · E36

## Passages of the task named in your *Read*, word for word (`docs/task-cycles/edytor-programu/task.frozen.md`)

### task.frozen.md:39-39

11. Ekran Programy pokazuje „Plan wyprawy” zwinięty do linii ikon między nazwą programu a jego regułami, z listami „Zabierz” i „Wynieś”, a gdy obie listy są puste, linia mówi „Plan wyprawy: pusty”. Ekran przejścia sekcji planu nie pokazuje, także przy programie zapisanym otwartym w przejściu (pytanie 11).

### task.frozen.md:135-139

- Pytanie 11. Czy plan wyprawy znika z ekranu przejścia i co mówi jego pusta linia?
  - Answer: Plan wyprawy nie stoi na ekranie przejścia, co rozstrzyga cytat z definicji przy D-180: „The screen Programy shows a section „Plan wyprawy” folded to a line of icons between the program's name and its rules”, „Accepted with it: the plan of the copy is not changed during a map run.”, *Rejected*: „the section under the rule groups on the screen of a map run — it takes the space of what the player watches”, a przy układzie ekranu przejścia *Rejected*: „the trip plan under the editor during a map run.” Pusta linia: „Plan wyprawy: pusty”.
  - Not chosen:
    - sam nagłówek — „pusty plan wygląda jak niezaładowany”
  - Source: definicja_mvp2_loop2.md@efc19197, D-180 i wpis „How is the screen of a map run laid out?”; human, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, A13 nieskreślone i T28; human, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami”, drugi pakiet rundy, pytanie kontrolne E5: wybór T28 nie zmieniony.

### task.frozen.md:209-210

- Projektowany D-180 przyjmuje, że plan kopii nie zmienia się w trakcie przejścia, a D-131, D-186, uzasadnienie D-179 i niezmiennik trip-plan-progress mówią o takiej zmianie jak o możliwej; nie stają się fałszywe, bo funkcje symulacji zostają, więc to rzecz do przeszukania fundamentu w cyklu.
- Stan gry nie zmienia kształtu, bo zwinięcie grup zostaje poza zapisem, więc zadanie nie podbija wersji zapisu.

### task.frozen.md:245-245

- D-180 — Where does the player arrange the trip plan? (pisze zadanie 13): „The screen Programy shows a section „Plan wyprawy” folded to a line of icons between the program's name and its rules, with the lists „Zabierz” and „Wynieś”, and the card of a map shows what of it enters. Each position holds an item select list, a number field, „↑”, „↓” and „Usuń”, and „Dodaj przedmiot” stands below each list.” Zadanie daje część o ekranie Programy; kartę mapy daje zadanie 13.

### task.frozen.md:318-318

| 19 | Pusta linia planu wyprawy mówi „Plan wyprawy: pusty”. | decision | Pytanie 11 | sam nagłówek przy pustym planie |

## Foundation entries of your *Read*: current ranges in the worktree

The identifier is the address; the range is its size now. Read each whole, with its rationale and rejected options.

- `foundations/part_map.md:3-28` browser-view
- `foundations/decisions.md:39-50` D-03
- `foundations/decisions.md:792-805` D-36
- `foundations/decisions.md:912-925` D-44
- `foundations/decisions.md:3250-3263` D-179
- `foundations/decisions.md:3265-3276` D-180
- `foundations/decisions.md:3278-3289` D-181
- `foundations/decisions.md:3343-3354` D-186
- `foundations/decisions.md:3356-3367` D-187
- `foundations/decisions.md:5379-5409` D-264
- `foundations/decisions.md:5411-5451` D-265
- `foundations/decisions.md:5481-5508` D-267
- `foundations/decisions.md:5510-5553` D-268
- `foundations/invariants.md:35-43` browser-view-framework
- `foundations/invariants.md:236-246` content-identifiers
- `foundations/invariants.md:459-467` browser-view-token-values
- `foundations/invariants.md:979-987` trip-plan-progress
- `foundations/invariants.md:1189-1197` document-test-memory-limit
- `foundations/glossary.md:199-203` trip plan
- `foundations/decisions.md:6471-6485` D-307

Where the plan's *Read* names a guideline file, a source file, a test or a file made by an earlier slice, open it by that path (whole, as *Read* says) — the paths in your section above are relative to the worktree root. Files made by earlier slices exist now in the worktree.

## Report

Write the full report: status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), your commits, what each check showed with command and exit code, your own-work check (the weakest point of your slice, how you checked it and what it showed), for a user-interface slice the states and screenshot evidence as `ui_check.md` gives (or a screenshot unchecked, with its reason), each reach beyond this handoff, **Searches not found or unclear:** each thing looked for and not found or unclear, or `none`, and concerns. Return only: status, commits, a one-line check result naming what failed or did not run, and the report path.
