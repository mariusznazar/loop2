# Handoff — slice 11 of the task `ekrany-i-menu`

You make **slice 11** of a planned change, as a the-way task cycle's executor. The person who
requested this cycle (Mariusz, the product's owner) has delegated every intermediate choice to the
orchestrator, who has delegated this slice to you. You ask no human anything; a question goes back
to the orchestrator in your report with the status `questions`, `returned` or `blocked`, as the
method gives.

## Where you work

- Worktree (start every command from its root): `C:/Storage/repos/loop2-wt/ekrany-i-menu`
  (Git Bash `/c/Storage/repos/loop2-wt/ekrany-i-menu`). Branch `task/ekrany-i-menu`; the branch head
  you start from is `0aa9ce5`. Process pin `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
  Task base commit `20d804b04ba564b578551c687cde78baadf78878`.
- Your class of model: cheaper than the orchestrator's (Haiku 5.5), the default class of the plan
- Report path: `docs/task-cycles/ekrany-i-menu/reports/slice11.md`.

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
| E2 | D-96 (changed, projected whole) | a3ec192 |
| E3 | D-97 (changed, projected whole) | 5d5075f |
| E7 | D-208 (changed, projected whole) | 5d5075f |
| E12 | D-280 (new, part) | 4ba1483 |
| E13 | D-281 (new, part) | 4ba1483 |

## Passages of the frozen task your *Read* names (word for word; the file is the address)

#### `docs/task-cycles/ekrany-i-menu/task.md:69-72`

```
  69	14. W React powstają pasek menu, ekran Postać i lista programów; Siedziba, panel programu i ekran przejścia zostają w DOM (pytanie 4).
  70	   - Przycisk niszczący dostaje postać React z przypadkiem w teście porównującym obie postacie (D-265), bo „Zatrzymaj” na ekranie Postać i „Usuń” na liście programów stoją w React (odczyt nieskreślony przez Mariusza 2026-11-03, drugi pakiet rundy, część F).
  71	15. `guidelines/styleguide-browser-view.md` dostaje wygląd i stany pozycji menu, menu „Konto” i pozycji listy programów, przycisk „Wyślij ponownie” przestaje tam stać „z nagłówka”, a przykład „„Wyloguj” w nagłówku” i wiersz nagłówka na stronie wszystkich stanów idą za menu „Konto”; zmiany idą przez `the-way-maintain-styleguide`.
  72	16. `guidelines/coding-browser-module.md` dostaje przykład ekranu w React rysującego z bieżącego stanu gry i z adresu oraz wiersze nowych plików; zmiany idą przez `the-way-maintain-coding-guidelines`.
```

#### `docs/task-cycles/ekrany-i-menu/task.md:97-101`

```
  97	- Pytanie 4. Które ekrany tego zadania powstają w React?
  98	  - Answer: Pasek menu, ekran Postać i lista programów powstają w React; Siedziba zostaje w DOM, traci tylko umiejętności, a przenosi ją zadanie 13; dzisiejszy panel programu i ekran przejścia zostają w DOM do zadań 5 i 6. Zadanie 4 przenosi umiejętności (`src/browser/view/character-skills.ts`, 123 wiersze, z 138 wierszami testu), a lista wyboru i pole liczby w React należą do zadania 5.
  99	  - Not chosen:
 100	    - Siedziba przechodzi na React w tym zadaniu — 552 wiersze i 18 przypadków testu, a wiersze wysyłania, które zadanie 13 usunie, trzeba napisać dwa razy; zysk: kolejne zadania zastają ją gotową.
 101	  - Source: Mariusz, 2026-11-03: „poza tym nie mam zastrzeżeń do rekomendacji” — przyjęta rekomendacja B4 (A) pakietu rundy; reguła z zadania 27: „Reguła dotyczy tylko nowych ekranów: dokładka do starego ekranu może powstać w DOM, a przenosi ją dopiero zadanie tego ekranu.” (zadanie_hierarchia_przyciskow_i_karta_logowania.md, pytanie 5b).
```

## Your section of the plan (word for word; file `docs/task-cycles/ekrany-i-menu/plan.md`)

### Slice 11 — The coding guidelines of browser modules

- **Goal:** `guidelines/coding-browser-module.md`, written as `.the-way/product-guidelines/template.md` and `.the-way/product-guidelines/coding/template.md` give a file of coding guidelines in the task cycle, gets under *Examples* an example of a screen in React that draws from the current game state and from the address — the screen Postać (`character-screen.tsx`), given the character's number the address names, created and disposed by the game view at a change of screen and updated from the store and from each reading of the clock through its `create…` boundary — and of the menu bar as a React element the DOM page holds in its header (To do item 16); and in *Files of this kind* a row for each new file — `character-screen.tsx`, `menu-bar.tsx`, `program-list.tsx`, `screen-address.ts`, `run-screen.ts` — with the status the template gives (the new DOM module `run-screen.ts` as `do not copy`). The example „Gra na stronie i odpowiedzi serwera” follows the code: the line of saving stands under the menu bar, „Wyloguj” in the menu „Konto”. No rule is added and no status of an existing row changes; a status or a rule that seems wrong goes to the report.
- **Change:** `guidelines/coding-browser-module.md`
- **Read:** `docs/task-cycles/ekrany-i-menu/task.md:69-72` To do · `docs/task-cycles/ekrany-i-menu/task.md:97-101` Questions to settle
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/coding/template.md` · `guidelines/coding.md`
  `foundations/part_map.md:3-28` browser-view · `foundations/part_map.md:118-133` agent-workflow
  `foundations/decisions.md:39-50` D-03 · `foundations/decisions.md:792-805` D-36 · `foundations/decisions.md:3906-3940` D-213 · `foundations/decisions.md:5360-5390` D-264 · `foundations/decisions.md:5392-5432` D-265 · `foundations/decisions.md:5462-5489` D-267 · `foundations/decisions.md:5536-5560` D-269 · `foundations/decisions.md:5562-5589` D-270
  Foundation entries rows E2, E3, E7, E12, E13
  `src/browser/view/game-view.ts` · `src/browser/view/app.ts`
  made by earlier slices, named without backticks as they do not exist at the base: src/browser/view/character-screen.tsx (Slice 5) · src/browser/view/menu-bar.tsx (Slice 4) · src/browser/view/program-list.tsx (Slice 6) · src/browser/view/screen-address.ts (Slice 3) · src/browser/view/run-screen.ts (Slice 8)
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` reports nothing the change caused; `npm test -- tests/invariants/test_browser_view_framework.py`
- **Depends on:** Slice 11b

## What earlier slices delivered (orchestrator's note; the files are the source)

- Slices 1–11b and the repair are made (head `0aa9ce5`). The code your examples describe now exists:
  `src/browser/view/character-screen.tsx` (the screen Postać, `createCharacterScreen({ onBuy, onStop,
  props })` with `update(props)`, `dispose()`, `focus()`), `src/browser/view/menu-bar.tsx`
  (`createMenuBar({ client, onLogout, props })`), `src/browser/view/program-list.tsx`,
  `src/browser/view/screen-address.ts` (pure) and `src/browser/view/run-screen.ts` (DOM).
  `game-view.ts` creates Postać on entering it and disposes it on leaving, and updates it from the store
  and from each reading of the clock; it reads and writes the address through `PageAddress`
  (`email-confirmation.ts`). `app.ts` holds the one menu bar in the page's header; the line of saving
  stands under it, and „Wyloguj” is in the menu „Konto”.
- `src/browser/view/email-status.ts` now holds only pure sentences, yet its row in *Files of this kind*
  reads `do not copy`; your section says no existing row's status changes — keep it and put it in
  your report as a question (record Q16).
- The table *Files of this kind* is alphabetical by path; place the new rows in order.

## Orchestrator's rulings that bind this slice

- Add no rule and change no status of an existing row; a status or rule that seems wrong goes to the
  report with its place.
- Write the new examples from the code as it stands (read the files), never from this note alone.
- Name every choice beyond the plan in your report under *Choices made*.

## Your report

Write the full report to `docs/task-cycles/ekrany-i-menu/reports/slice11.md` as `make-change`
gives it: what you changed and why, commits, each check as command and exit code, the own-work check
(the requirement most likely missed and the check you made for it), your reaches beyond this handoff
(what you read that it did not name, where and why), mismatches of plan and code, and
**Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
Return only: status (`done`, `done with concerns`, `questions`, `returned`, `reserved` or `blocked`),
your commits, a one-line check result naming what failed or did not run, and the report path.
