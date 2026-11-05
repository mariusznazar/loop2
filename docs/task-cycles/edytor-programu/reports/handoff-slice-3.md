# Handoff — slice 3 of the task `edytor-programu`

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator of
`implement-task`. You never ask the human. A question goes back to the orchestrator in your report
with status `questions`; a fact or permission nobody supplies makes you `blocked`. Nothing here is the human's approval.

## Where you work

- Worktree (work from its root): `C:/Storage/repos/loop2-wt/edytor-programu`, branch `task/edytor-programu`.
  Your base (the head when you start): `fccc084`. Commit your work on this branch; push nothing.
- Pinned process: the worktree's `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
- You make: **a slice, or the retry of a slice** — slice 3. Read in full `.the-way/task-cycle/change/SKILL.md` (project skill
  `the-way-make-change`) and `.the-way/task-cycle/change/slice.md`; read `.the-way/task-cycle/change/ui_check.md` when the slice changes a user interface (the step that names it comes).
- Report: `docs/task-cycles/edytor-programu/reports/report-slice-3.md` (if your tool refuses the file, return the whole report as text).
- Commit by paths with `git add <paths>` only (never `-A`, `.`, `-a`); messages in English in the repository's form (see `git log --oneline -8`, e.g. `feat: :sparkles: …`, `docs: :memo: …`). Do not run the product's gate (`npm test` with no argument); run the focused checks your section names, each with command and exit code in the report.

## Answers of the start

- Trust boundary: the change touches `assets/icons/**` (files from game-icons.net) in slices 3 and 4 only; the review of those slices checks crafted input there.
- Irreversible operation: none. Open design choice: none; a choice of how to make what the task and the foundation settle is yours to make and name in the report; a real open design choice makes you return `returned` with no code.
- The foundation step has run: the entries D-288 to D-307 and the changed ones (D-03, D-27, D-39, D-43, D-44, D-91, D-93, D-124, D-166, D-180, D-196, D-245, D-255, D-282, icon-credits, the icon title facts, game-icons-licence) are written. Entry ranges below are current ones; they hold where they differ from the plan's.
- The base gate already fails on `tests/quality/test_quality_invariants.py::test_ruff_source_rules` and `::test_shellcheck_source_rules` (`FileNotFoundError`: ruff and shellcheck are not installed on this computer). That is the base's state: report any other failure of that file as yours.
- Two of the 11 icons are not by Delapouite or Lorc (see the foundation step's report): `logging` is by Skoll (https://game-icons.net/1x1/skoll/logging.html) and `dodge` by Felbrigg (https://game-icons.net/1x1/felbrigg/dodge.html); the foundation names them in `game-icons-licence`. Relevant only to slices 3 and 4.

## Your section of the plan, word for word (`docs/task-cycles/edytor-programu/plan.md`)

### Slice 3 — Six icons of actions, with their credits

- **Goal:** the icon files `binoculars.svg`, `hiking.svg`, `direction-sign.svg`, `grab.svg`, `claw-hammer.svg` and `match-tip.svg` stand in `assets/icons/`, taken from https://github.com/game-icons/icons at the commit `ICON_SOURCE_COMMIT` of `credits.ts` and prepared as the five present files are — background removed, the shape drawn light, svg and path elements and the allowed attributes only — so that the statement of change of the credits stays true; a file missing at that commit, or a source that cannot be reached, stops the slice with a report, and no file is taken from the old Loop. The data of actions gets an icon field and the title of the icon's page, as `resources.ts` and `campfire.ts` give theirs, for the nine actions these files serve, following the old Loop (To do item 15; `C:\Storage\repos\loop\src\sim\data\activities.ts:30-53` at cdc7c0d): „Eksploruj” binoculars, „Wędruj” hiking, „Idź” and „Idź — ognisko” direction-sign, „Zbierz” and „Obchód” grab, „Wytwórz — ognisko” claw-hammer, „Zapal — ognisko” and „Zapal — patyk” match-tip; the field stays optional in the type until Slice 4 gives the remaining five. The footer's credits and the folded section (`footerCredits` of `footer.ts`) credit each icon file once, after the campfire's, naming the actions that use it; `credits.ts` gets each file's author and page, the authors as game-icons.net and the licence file of game-icons/icons give them (row E17). `tests/invariants/test_icon_credits.py` writes out the six titles in `TITLES`, as the facts of row E16 quote them, and their authors in `AUTHORS`. Nothing draws the icons yet.
- **Change:** `assets/icons/binoculars.svg` · `assets/icons/hiking.svg` · `assets/icons/direction-sign.svg` · `assets/icons/grab.svg` · `assets/icons/claw-hammer.svg` · `assets/icons/match-tip.svg` · `src/browser/sim/data/actions.ts` · `src/browser/view/footer.ts` · `src/browser/view/credits.ts` · `tests/invariants/test_icon_credits.py`
- **Read:** `docs/task-cycles/edytor-programu/task.frozen.md:43-43` To do · `docs/task-cycles/edytor-programu/task.frozen.md:81-89` Questions to settle · `docs/task-cycles/edytor-programu/task.frozen.md:199-199` Context · `docs/task-cycles/edytor-programu/task.frozen.md:238-241` Wpisy projektowane, które zadanie urzeczywistnia w części · `docs/task-cycles/edytor-programu/task.frozen.md:291-291` Obecne wpisy, które zadanie stosuje bez zmiany · `docs/task-cycles/edytor-programu/task.frozen.md:296-302` Settlements to record
  `guidelines/coding.md` · `guidelines/coding-content-data.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  `foundations/part_map.md:3-28` browser-view · `foundations/part_map.md:30-60` simulation
  `foundations/decisions.md:383-400` D-18 · `foundations/decisions.md:639-674` D-27 · `foundations/decisions.md:762-775` D-34 · `foundations/decisions.md:897-910` D-43
  Foundation entries rows E8, E9, E10, E16, E17, E20
  `foundations/invariants.md:236-246` content-identifiers · `foundations/invariants.md:319-329` icon-file-content · `foundations/invariants.md:331-342` icon-credits · `foundations/invariants.md:344-353` loop2-container-icons
  `foundations/environment_facts.md:39-92` game-icons-licence, cc-by-3-adaptation-credit, cc-by-3-licence-copy and the five title facts
  `src/browser/sim/data/resources.ts` · `src/browser/sim/data/campfire.ts` · `src/browser/view/credits-section.tsx` · `tests/view/icons.test.mjs` · `tests/invariants/test_icon_file_content.py` · `assets/icons/campfire.svg`
  outside the repository, named without backticks: C:\Storage\repos\loop\src\sim\data\activities.ts lines 30-53
- **Model:** cheaper
- **Risk:** trust boundary — assets/icons/** (six SVG files from game-icons.net)
- **Checks:** start from `TITLES` and `AUTHORS` naming the six files, failing until each has its credit; `npm test -- tests/invariants/test_icon_credits.py`; `npm test -- tests/invariants/test_icon_file_content.py`; `npm test -- tests/view/icons.test.mjs`; `npm test -- tests/invariants/test_loop2_container_icons.py` (where Docker is unavailable, report it unchecked); `npm test -- tests/invariants/test_content_identifiers.py`; `npm test -- tests/sim/data.test.mjs`; `npm test -- tests/sim/rules.test.mjs`; `npm run typecheck`; `npm test -- tests/quality/test_quality_invariants.py`
- **Depends on:** E8 · E9 · E16 · E17 · E20

## Passages of the task named in your *Read*, word for word (`docs/task-cycles/edytor-programu/task.frozen.md`)

### task.frozen.md:43-43

15. Do `assets/icons/` dochodzi 11 ikon czynności z game-icons.net, tych samych co w starym Loop: `binoculars`, `hiking`, `direction-sign`, `grab`, `claw-hammer`, `match-tip`, `logging`, `meal`, `deadly-strike`, `boot-kick`, `dodge`; przypisanie do czynności idzie za starym Loop (`C:\Storage\repos\loop\src\sim\data\activities.ts:30-53`), więc „Idź” i „Idź — ognisko”, „Zbierz” i „Obchód” oraz oba „Zapal” dzielą ikonę. Dane czynności dostają pole ikony. Ikona stoi w wierszu reguły i w komórkach, rysowana maską, więc bierze kolor tekstu obok i gaśnie razem z wyszarzoną komórką. Każda nowa ikona ma wzmiankę według `icon-credits` i fakt środowiska z tytułem ze swojej strony na game-icons.net, zapisany przez `the-way-record-environment-fact`, bo `icon-credits` opiera się na takich faktach. Zdanie D-43 o pliku ikony i wiersz 102 przewodnika stylu („Kolor ikon stoi w samych plikach ikon”) mówią po zmianie prawdę o obu sposobach rysowania, które stoją obok siebie do zadania 24 (pytanie 5).

### task.frozen.md:81-89

- Pytanie 5. Które ikony dochodzą, gdzie stoją i jak są rysowane?
  - Answer: Nowe ikony wiersza reguły należą do tego zadania, co rozstrzyga cytat z planu: „nowe ikony przypisane zadaniom 5, 7 i 23, a zadanie 23 zależy od 7, zadanie 24 od 23 — w repozytorium jest 5 ikon, dane czynności nie mają pola ikony, a wiersz reguły, ikona zajęcia i ognisko wygasłe ich potrzebują”. Reszta: droga A — 11 ikon w wierszu i w komórkach, rysowane maską, czyli kolor biorą z tekstu obok. Koszt przyjęty: do zadania 24 stoją dwa sposoby rysowania ikon, plan przy tej decyzji dostaje zadanie 5, zmieniają się dwa zdania fundamentu i przewodnika stylu, a zadanie 5 bierze na siebie 11 zapisanych tytułów ikon; zysk: siatka jak w starym Loop, a zadanie 7 nie dokłada już ikon czynności. Nad głową maga w zadaniu 7 stoi ta sama ikona czynności, przy czekaniu bez ikony i bez paska, a w walce bez ikony do zadania 20.
  - Not chosen:
    - B, ikony tylko w wierszu, komórki sam tekst — „siatka uboższa niż w starym Loop”
    - C, dzisiejsze obrazy gaszone kryciem — „nowa wartość do Twojego wyboru i drugi sposób do skasowania w zadaniu 24”
    - D, ikony w komórkach aktywnych, wyszarzona komórka bez ikony — „wyszarzona wygląda inaczej niż aktywna”
    - nad głową b, ikona rzeczy, gdy czynność ma cel — „„Idź — patyk” i „Zbierz — patyk” wyglądają tak samo”
    - nad głową d, w walce ikona walki z paskiem — „ikona, której zadanie 20 może nie zostawić”
  - Source: plan_mvp2_loop2.md@54d8d854, dziennik, 2026-11-01, wpis o nowych ikonach; human, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, B9, rekomendacja A oraz a, bez ikony przy czekaniu, c.

### task.frozen.md:199-199

- Ikony starego Loop leżą w `C:\Storage\repos\loop\public\icons\` przy commicie cdc7c0d.

### task.frozen.md:238-241

- D-03 — How is the browser view built? (zapisany, zadanie 2): „The browser view is built in TypeScript with React, its screens written as `.tsx` components that draw from the game state, and no other UI framework stands in its code or its runtime dependencies.”
- D-27 — Where do the game's icons come from? (pisze zadanie 24): „The game's icons are SVG files from game-icons.net, kept in `assets/icons/` outside the directory the account and save server serves and copied into that directory when the application is built.” Zadanie stosuje to do 11 nowych ikon; zwinięte wzmianki w Siedzibie daje zadanie 24.
- icon-credits (pisze zadanie 24): „For each SVG icon file directly in `assets/icons/`, the game's section of credits holds a credit that names the icon's title as its page on game-icons.net gives it, the icon's author, that page and the licence CC BY 3.0, and says how the icon file differs from its source.”
- D-43 — What counts in the browser view as a value written in place of a design token? (pisze zadanie 24): „or the content of an icon file in `assets/icons/`, which is drawn as a mask and takes its colour from the text beside it.” Zadanie rysuje maską 11 ikon czynności; pozostałe ikony zostają przy kolorze w pliku do zadania 24.

### task.frozen.md:291-291

- Fakt środowiska game-icons-licence: „The game-icons/icons repository provides the icons of its contributors Delapouite and Lorc under Creative Commons 3.0 BY.”

### task.frozen.md:296-302

Candidates: 23 shown, 19 accepted — 2026-11-03

| # | Settlement | Kind | Source | What the cycle would otherwise guess |
|---|---|---|---|---|
| 1 | W panelu reguły wyszarzone z powodem stoją: czynność gałęzi poznana, której postać w przejściu nie kupiła — „gałąź niewykupiona”; ta sama czynność, gdy w grze nie ma przejścia — „wybierzesz w przejściu postaci, która ją kupiła”; „Idź”, „Zbierz”, „Obchód”, „Tu leży mniej niż”, „Zapas poniżej” bez celu do wskazania — „nie znasz jeszcze celu”; cel poznany, którego nie ma na mapie przejścia — „nie ma go na tej mapie”; gdy w grze nie ma przejścia, do wyboru są wszystkie poznane cele, czynności walki zostają do wyboru poza walką, a reguła z wartością spoza wyboru pokazuje ją jako wybraną i wyszarzoną, z powodem, i da się ją zmienić. | decision | Pytanie 1; „Obchód” według pytania 16 | które przypadki ukryć, a które wyszarzyć, i jakie zdania powodów napisać |
| 2 | Czynności stoją w siatce w grupach Ruch, Zbieranie, Ogień oraz Żywność i walka, a warunki bez nazw grup, rozdzielone kreską: Zawsze; Temperatura, Sytość, Zdrowie, Energia natury; Zapas, Tu leży, Zostało mniej niż — ognisko, Z dala od — ognisko; Przeciwnik ma poniżej. | decision | Pytanie 2 | grupy i kolejność komórek, także dla czynności dodanych później |
| 3 | Jedna czynność ma w grze jedną ikonę: tę samą w wierszu reguły, w komórce i nad głową maga. | decision | Pytanie 5 | czy komórka i wiersz biorą ikonę czynności, czy rzeczy, którą czynność wskazuje |

## Foundation entries of your *Read*: current ranges in the worktree

The identifier is the address; the range is its size now. Read each whole, with its rationale and rejected options.

- `foundations/part_map.md:3-28` browser-view
- `foundations/part_map.md:30-60` simulation
- `foundations/decisions.md:383-400` D-18
- `foundations/decisions.md:639-674` D-27
- `foundations/decisions.md:762-775` D-34
- `foundations/decisions.md:897-910` D-43
- `foundations/invariants.md:236-246` content-identifiers
- `foundations/invariants.md:319-329` icon-file-content
- `foundations/invariants.md:331-342` icon-credits
- `foundations/invariants.md:344-353` loop2-container-icons
- the title facts `game-icons-<file>-title` in `foundations/environment_facts.md` from line 94
- `foundations/environment_facts.md:39-44` game-icons-licence
- `foundations/decisions.md:6167-6190` D-291
- `foundations/environment_facts.md`: the facts `game-icons-licence`, `cc-by-3-adaptation-credit`, `cc-by-3-licence-copy` and every `game-icons-<file>-title` (11 now), from `## game-icons-licence` at line 39 to the end of the last of them

Where the plan's *Read* names a guideline file, a source file, a test or a file made by an earlier slice, open it by that path (whole, as *Read* says) — the paths in your section above are relative to the worktree root. Files made by earlier slices exist now in the worktree.

## Report

Write the full report: status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), your commits, what each check showed with command and exit code, your own-work check (the weakest point of your slice, how you checked it and what it showed), for a user-interface slice the states and screenshot evidence as `ui_check.md` gives (or a screenshot unchecked, with its reason), each reach beyond this handoff, **Searches not found or unclear:** each thing looked for and not found or unclear, or `none`, and concerns. Return only: status, commits, a one-line check result naming what failed or did not run, and the report path.
