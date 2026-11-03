# Handoff — slice 6 of the task `ekrany-i-menu`

You make **slice 6** of a planned change, as a the-way task cycle's executor. The person who
requested this cycle (Mariusz, the product's owner) has delegated every intermediate choice to the
orchestrator, who has delegated this slice to you. You ask no human anything; a question goes back
to the orchestrator in your report with the status `questions`, `returned` or `blocked`, as the
method gives.

## Where you work

- Worktree (start every command from its root): `C:/Storage/repos/loop2-wt/ekrany-i-menu`
  (Git Bash `/c/Storage/repos/loop2-wt/ekrany-i-menu`). Branch `task/ekrany-i-menu`; the branch head
  you start from is `edb2862`. Process pin `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
  Task base commit `20d804b04ba564b578551c687cde78baadf78878`.
- Your class of model: cheaper than the orchestrator's (Haiku 5.5), the default class of the plan
- Report path: `docs/task-cycles/ekrany-i-menu/reports/slice6.md`.

## Your stage

- You make: **a slice, or the retry of a slice** (the row of the `make-change` table). Read
  `.the-way/task-cycle/change/SKILL.md` whole, and `.the-way/task-cycle/change/slice.md` for how to
  read the plan and the task; read `ui_check.md` of the same directory where your slice changes what
  a screen shows (the screenshot of the running product has a settled route in `.claude/skills/loop2-play/SKILL.md`;
  where the component is not reachable on the page yet, state the check in code and mark the
  screenshot unchecked with that reason — the orchestrator's walk through the real browser covers
  the finished screens). Use no personal or global skill; project skills carry the `the-way-` prefix.
- Boundary: make only this slice; change only the files its *Change* names (a path pattern covers
  every file it matches). Commit on the task branch in English, in the style of the repository's
  recent commits (`git log --oneline`), `git add <paths>` explicitly (never `git add -A`, `git add .`
  or `git commit -a`), messages with several lines through `git commit -F <file>` placed outside the
  repository. Do not push. Leave no uncommitted tracked change.
- Run the focused checks your slice's *Checks* names, each as command and exit code. Do **not** run
  `npm test` without a file argument (the full gate) and do not run `foundation_check.py` unless the
  slice's *Checks* names it; the gate is the orchestrator's.
- If the plan and the code disagree structurally, or you meet an open design choice the task and the
  foundation leave open, return without code (`returned`) as the method gives.

## The answers of step 4

- Trust boundary: no (the part map names none of these files). The address fragment is player input:
  where your slice reads or writes it, test crafted fragments as your section says.
- Irreversible operation: no. Open design choice: none, no spec. Route: planned slices.

## Foundation entries the foundation step has written

The plan names its foundation rows by row number (`E…`); the foundation step wrote them under these
identifiers. Read each entry named in your *Read*, whole (an entry runs from its heading to the
next heading), and cite identifiers as they stand in `foundations/`. The line ranges in your section
below were recomputed at the head `f694d86` of the foundation step.

| Plan row | Identifier written by the foundation step | Commit |
|---|---|---|
| E17 | D-166 (part) | 5020b76 |
| E20 | D-03 — tied, no change | — |

## Passages of the frozen task your *Read* names (word for word; the file is the address)

#### `docs/task-cycles/ekrany-i-menu/task.md:45-49`

```
  45	5. Ekran Programy ma po lewej listę programów gracza z „Nowy program”, „Zmień nazwę” i „Usuń”, a obok dzisiejszy panel programu z edytorem i „Plan wyprawy”, bez jego listy wyboru „Program:” (pytanie 5); nowy edytor robi zadanie 5.
  46	   - Wybór programu na liście zmienia adres na `#/programy/{n}`, a adres wybiera program na liście.
  47	   - Panel pokazuje zawsze zapisany program wybrany na liście, nigdy kopię (pytanie 15).
  48	   - Gdy ręczne przejście trwa albo skończyło się i czeka na „Restart” albo „Zakończ”, nad edytorem stoi „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.”, a „Przełącz postać na ten program” stoi tylko na ekranie przejścia (pytanie 15).
  49	   - Oferta czynności w edytorze Programów idzie za postacią w przejściu, także czekającym (pytanie 15) i skończonym, do „Restart” albo „Zakończ” (pytanie 17), jak dziś.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:69-70`

```
  69	14. W React powstają pasek menu, ekran Postać i lista programów; Siedziba, panel programu i ekran przejścia zostają w DOM (pytanie 4).
  70	   - Przycisk niszczący dostaje postać React z przypadkiem w teście porównującym obie postacie (D-265), bo „Zatrzymaj” na ekranie Postać i „Usuń” na liście programów stoją w React (odczyt nieskreślony przez Mariusza 2026-11-03, drugi pakiet rundy, część F).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:102-107`

```
 102	- Pytanie 5. Czy ekran Programy dostaje listę programów po lewej już w tym zadaniu?
 103	  - Answer: Tak, listę po lewej z „Nowy program”, „Zmień nazwę” i „Usuń” buduje zadanie 4, a obok stoi dzisiejszy panel w trybie przejściowym; zadanie 5 wymienia już tylko edytor. Gracz ma układ docelowy od razu, a największe zadanie maleje. Ta sama odpowiedź obowiązuje zadanie 5 (edytor-programu, pytanie o listę programów).
 104	  - Not chosen:
 105	    - Listę robi zadanie 5, od razu w nowym edytorze — do tego czasu ekran wygląda jak wycięty panel, a `#/programy/{n}` niczego nie wybiera na liście; zysk: lista powstaje raz.
 106	    - Bez decyzji — oba dokumenty mogą założyć, że listę robi drugie zadanie.
 107	  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B5 (A) pakietu rundy.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:160-166`

```
 160	- Pytanie 15. Co pokazuje ekran Programy, gdy przejście czeka albo się skończyło?
 161	  - Answer: Programy pokazują zawsze zapisany program, nigdy kopię, a nad edytorem stoi zdanie „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.”; „Przełącz postać na ten program” zostaje na ekranie przejścia. W edytorze czekające przejście liczy się jak trwające, czyli oferta czynności idzie za postacią w przejściu, jak dziś w kodzie. Koszt: poprawka zrobiona w Programach nie dochodzi do czekającego przejścia, chyba że gracz przełączy postać, co zeruje passę; zysk: adres zawsze nazywa zapisany program.
 162	  - Not chosen:
 163	    - Na liście po lewej staje też „Kopia w przejściu” — lista i adres muszą obsłużyć kopię, więcej pracy w zadaniach 4 i 5, zmiana projektowanego wpisu o programach; zysk: poprawka działa z każdego miejsca.
 164	    - Gdy przejście czeka, „Programy” prowadzą na ekran przejścia — gracz nie napisze zapisanego programu przy czekającym przejściu.
 165	    - Bez decyzji — cykl zgadnie, a to, czy poprawka dojdzie do przejścia, gracz odkryje po fakcie.
 166	  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B2 (A) pakietu rundy; ta sama treść stoi w zatwierdzonym D-166 (definicja, odcisk 9641f804, wiersz 811). Fakt z kodu przy 20d804b: `editorRepertoire` bierze repertuar postaci z przejścia, dopóki przejście stoi w stanie gry, także skończone (`src/browser/sim/understanding.ts:138-150`).
```

#### `docs/task-cycles/ekrany-i-menu/task.md:237-239`

```
 237	- D-166 — Where does the player see the player's programs and pick the one to edit? (definicja, wpis zmieniony; pisze zadanie 5): „The screen Programy holds on the left the list of the player's programs and in the middle the program editor with the program picked there. That program is always a saved one, never the copy: while a manual map run goes on, or has ended and waits for „Restart” or „Zakończ”, „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.” stands above the editor, and „Przełącz postać na ten program” stands on the screen of a map run alone. On the screen of a map run the program panel shows the copy, and its select list holds „Kopia w przejściu” at its top and the player's saved programs below it.”
 238	  - Część tego zadania: cały wpis poza nowym edytorem, który robi zadanie 5 (pytania 5 i 15).
 239	  - Obecny D-166 uznaje za błąd „a section of the headquarters or a screen of its own listing the programs”, więc to zdanie musi odejść w tym zadaniu.
```

## Your section of the plan (word for word; file `docs/task-cycles/ekrany-i-menu/plan.md`)

### Slice 6 — The list of programs in React

- **Goal:** a new `src/browser/view/program-list.tsx` holds the list of programs and its boundary `createProgramList`, built as Slice 4's boundary is (To do item 5, question 5): the player's programs in the list's order, each a link to `#/programy/{n}` (D-165), the program the page gives marked as chosen with `aria-current="page"` and the look the styleguide gives; „Nowy program” (D-167); „Zmień nazwę”, opening for the chosen program the field „Nazwa programu” (`ReactTextField`) with „Zapisz”, its message under the field in `warning` from the name rule (`programName` of `src/browser/sim/programs.ts`) in the words of the messages `program-panel.ts` holds, which that module exports for this list (D-169); and „Usuń” of the chosen program, the destructive React button of Slice 2, inactive while the list holds one program (D-167). Its acts go to the page through its controls. The new test `tests/view/program-list.test.mjs` runs on the jsdom harness. Its look stands in `src/browser/styles.css`.
- **Change:** `src/browser/view/program-list.tsx` · `tests/view/program-list.test.mjs` · `src/browser/view/program-panel.ts` · `src/browser/styles.css`
- **Read:** `docs/task-cycles/ekrany-i-menu/task.md:45-49` To do · `docs/task-cycles/ekrany-i-menu/task.md:69-70` To do · `docs/task-cycles/ekrany-i-menu/task.md:102-107` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:160-166` Questions to settle · `docs/task-cycles/ekrany-i-menu/task.md:237-239` Zadanie urzeczywistnia część, a resztę pisze inne zadanie
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  `foundations/part_map.md:3-28` browser-view
  `foundations/decisions.md:39-50` D-03 · `foundations/decisions.md:792-805` D-36 · `foundations/decisions.md:912-925` D-44 · `foundations/decisions.md:2982-2995` D-164 · `foundations/decisions.md:2997-3010` D-165 · `foundations/decisions.md:3012-3030` D-166 · `foundations/decisions.md:3032-3045` D-167 · `foundations/decisions.md:3047-3060` D-168 · `foundations/decisions.md:3062-3075` D-169 · `foundations/decisions.md:5360-5390` D-264 · `foundations/decisions.md:5392-5432` D-265 · `foundations/decisions.md:5462-5489` D-267 · `foundations/decisions.md:5491-5534` D-268
  Foundation entries rows E17, E20
  `foundations/invariants.md:35-43` browser-view-framework · `foundations/invariants.md:459-467` browser-view-token-values · `foundations/invariants.md:1189-1197` document-test-memory-limit
  `foundations/glossary.md:25-30` program
  `src/browser/view/account-card.tsx` · `src/browser/view/controls/react-button.tsx` · `src/browser/view/controls/react-text-field.tsx` · `src/browser/sim/programs.ts` · `tests/view/page-document.mjs`
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from the failing case of „Usuń” inactive beside one program; `npm test -- tests/view/program-list.test.mjs`; `npm test -- tests/view/program-panel.test.mjs`; `npm run typecheck`; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** Slice 2 · Slice 5 · E17

## What earlier slices delivered (orchestrator's note; the files are the source)

- Slice 2 (commit `893d26c`): `ReactButton` takes the kind `destructive` (use it for „Usuń”, D-167) and `expanded`.
- Slice 4 (commit `240d639`): `src/browser/view/menu-bar.tsx` and Slice 5 (commit `edb2862`):
  `src/browser/view/character-screen.tsx` are the newest boundaries built after `createAccountCard`
  (`createX({ …handlers, props })` with `update(props)` and `dispose()`); their tests
  `tests/view/menu-bar.test.mjs` and `tests/view/character-screen.test.mjs` show how a React part
  is tested on the jsdom harness. Build the boundary of the list the same way. Look in
  `src/browser/styles.css` with tokens only (`src/browser/AGENTS.md`); the rule for the list's items
  stands in `guidelines/styleguide-browser-view.md`, *Menu bar, the menu „Konto” and the list of programs*.
- The list is not placed on the page by this slice (Slice 10 does it); check its states in code and
  mark the screenshot unchecked with that reason, as `ui_check.md` gives.

## Your report

Write the full report to `docs/task-cycles/ekrany-i-menu/reports/slice6.md` as `make-change`
gives it: what you changed and why, commits, each check as command and exit code, the own-work check
(the requirement most likely missed and the check you made for it), your reaches beyond this handoff
(what you read that it did not name, where and why), mismatches of plan and code, and
**Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
Return only: status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`),
your commits, a one-line check result naming what failed or did not run, and the report path.
