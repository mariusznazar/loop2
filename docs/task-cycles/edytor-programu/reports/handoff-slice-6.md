# Handoff — slice 6 of the task `edytor-programu`

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator of
`implement-task`. You never ask the human. A question goes back to the orchestrator in your report
with status `questions`; a fact or permission nobody supplies makes you `blocked`. Nothing here is the human's approval.

## Where you work

- Worktree (work from its root): `C:/Storage/repos/loop2-wt/edytor-programu`, branch `task/edytor-programu`.
  Your base (the head when you start): `23ad6bf`. Commit your work on this branch; push nothing.
- Pinned process: the worktree's `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
- You make: **a slice, or the retry of a slice** — slice 6. Read in full `.the-way/task-cycle/change/SKILL.md` (project skill
  `the-way-make-change`) and `.the-way/task-cycle/change/slice.md`; read `.the-way/task-cycle/change/ui_check.md` when the slice changes a user interface (the step that names it comes).
- Report: `docs/task-cycles/edytor-programu/reports/report-slice-6.md` (if your tool refuses the file, return the whole report as text).
- Commit by paths with `git add <paths>` only (never `-A`, `.`, `-a`); messages in English in the repository's form (see `git log --oneline -8`, e.g. `feat: :sparkles: …`, `docs: :memo: …`). Do not run the product's gate (`npm test` with no argument); run the focused checks your section names, each with command and exit code in the report.

## Answers of the start

- Trust boundary: the change touches `assets/icons/**` (files from game-icons.net) in slices 3 and 4 only; the review of those slices checks crafted input there.
- Irreversible operation: none. Open design choice: none; a choice of how to make what the task and the foundation settle is yours to make and name in the report; a real open design choice makes you return `returned` with no code.
- The foundation step has run: the entries D-288 to D-307 and the changed ones (D-03, D-27, D-39, D-43, D-44, D-91, D-93, D-124, D-166, D-180, D-196, D-245, D-255, D-282, icon-credits, the icon title facts, game-icons-licence) are written. Entry ranges below are current ones; they hold where they differ from the plan's.
- The base gate already fails on `tests/quality/test_quality_invariants.py::test_ruff_source_rules` and `::test_shellcheck_source_rules` (`FileNotFoundError`: ruff and shellcheck are not installed on this computer). That is the base's state: report any other failure of that file as yours.
- Two of the 11 icons are not by Delapouite or Lorc (see the foundation step's report): `logging` is by Skoll (https://game-icons.net/1x1/skoll/logging.html) and `dodge` by Felbrigg (https://game-icons.net/1x1/felbrigg/dodge.html); the foundation names them in `game-icons-licence`. Relevant only to slices 3 and 4.

## Your section of the plan, word for word (`docs/task-cycles/edytor-programu/plan.md`)

### Slice 6 — The pick cell, the eighth shared control

- **Goal:** the pick cell stands in both forms (D-265): a DOM function in `src/browser/view/controls/pick-cell.ts` and a React component in `src/browser/view/controls/react-pick-cell.tsx`, drawing one tree of elements with the same classes and attributes — a button element carrying its name, an optional icon of an action, and, when greyed, its reason inside it; the chosen cell marked as the button selected in its group; a greyed cell marked `aria-disabled`, never `disabled`, so the keyboard reaches it and reads the reason, a click or Enter on it reaching no handler; an update in place in the DOM form, as `setButtonSelected` does for the button. The icon is drawn as a mask from `/icons/{file}.svg` with the background in the colour of the text around it, through one class of `src/browser/styles.css` that the row of Slice 9 reuses, so the icon greys with a greyed cell (row E10). The look follows the styleguide's entry of Slice 1, in `src/browser/styles.css` alone. `tests/view/react-controls.test.mjs` gets cases comparing both forms for a cell available, chosen, greyed with its reason, with and without an icon. The kitchen-sink page shows the DOM form in each state the styleguide gives — default, under the pointer, with focus, chosen, greyed with a reason — and the reason each other state does not apply (D-45, D-269).
- **Change:** `src/browser/view/controls/pick-cell.ts` · `src/browser/view/controls/react-pick-cell.tsx` · `tests/view/react-controls.test.mjs` · `src/browser/styles.css` · `src/browser/kitchen-sink/kitchen-sink.ts` · `src/browser/kitchen-sink/kitchen-sink.css`
- **Read:** `docs/task-cycles/edytor-programu/task.frozen.md:32-33` To do · `docs/task-cycles/edytor-programu/task.frozen.md:40-43` To do · `docs/task-cycles/edytor-programu/task.frozen.md:229-229` Wpisy projektowane, które zadanie urzeczywistnia i pisze · `docs/task-cycles/edytor-programu/task.frozen.md:241-241` Wpisy projektowane, które zadanie urzeczywistnia w części · `docs/task-cycles/edytor-programu/task.frozen.md:260-263` Obecne wpisy, które zadanie stosuje bez zmiany · `docs/task-cycles/edytor-programu/task.frozen.md:283-287` Obecne wpisy, które zadanie stosuje bez zmiany
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md`
  `foundations/part_map.md:3-28` browser-view
  `foundations/decisions.md:852-865` D-40 · `foundations/decisions.md:882-895` D-42 · `foundations/decisions.md:897-910` D-43 · `foundations/decisions.md:912-925` D-44 · `foundations/decisions.md:927-940` D-45 · `foundations/decisions.md:957-970` D-47 · `foundations/decisions.md:5360-5390` D-264 · `foundations/decisions.md:5392-5432` D-265 · `foundations/decisions.md:5491-5534` D-268 · `foundations/decisions.md:5536-5560` D-269 · `foundations/decisions.md:5817-5839` D-279
  Foundation entries rows E1, E3, E10, E39
  `foundations/invariants.md:35-43` browser-view-framework · `foundations/invariants.md:459-467` browser-view-token-values · `foundations/invariants.md:469-477` browser-view-focus-outline · `foundations/invariants.md:499-507` application-build-kitchen-sink · `foundations/invariants.md:1189-1197` document-test-memory-limit
  `src/browser/view/controls/button.ts` · `src/browser/view/controls/react-button.tsx` · `tests/view/page-document.mjs` · `src/browser/tokens.css`
- **Model:** cheaper
- **Risk:** none
- **Checks:** start from the failing case comparing a greyed cell with its reason in both forms; `npm test -- tests/view/react-controls.test.mjs`; `npm run kitchen-sink` builds (or `node scripts/kitchen-sink.mjs --build-only`); `npm test -- tests/invariants/test_application_build_kitchen_sink.py`; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_browser_view_focus_outline.py`; `npm run typecheck`; `npm test -- tests/quality/test_quality_invariants.py`; screenshots of the kitchen-sink page's samples of the pick cell in each state, opened locally as `npm run kitchen-sink` gives, through Playwright as `.claude/skills/loop2-play/SKILL.md` gives
- **Depends on:** Slice 1 · Slice 4 · E3 · E10

## Passages of the task named in your *Read*, word for word (`docs/task-cycles/edytor-programu/task.frozen.md`)

### task.frozen.md:32-33

4. Warunki, czynności i cele stoją w panelu jako komórki w grupach, do których dochodzi klawiatura, warunki w dwóch kolumnach. Czynności stoją w grupach Ruch (Eksploruj, Wędruj, Idź, Idź — ognisko), Zbieranie (Zbierz, Obchód), Ogień (Wytwórz — ognisko, Zapal — ognisko, Zapal — patyk, Zasil — ognisko) oraz Żywność i walka (Zjedz — jagoda, Uderz — patyk, Kopnij, Odskocz); warunki bez nazw grup, rozdzielone kreską: Zawsze; Temperatura, Sytość, Zdrowie, Energia natury; Zapas, Tu leży, Zostało mniej niż — ognisko, Z dala od — ognisko; Przeciwnik ma poniżej (pytanie 2). Klik wiersza otwiera panel na warunku, kolejne pola to warunek, liczba, cel warunku, czynność i cel czynności, każdy wybór od razu zmienia regułę i przechodzi do następnego pola, a po ostatnim polu panel zostaje otwarty, a zamyka go „✕”, Esc albo otwarcie innej reguły (pytanie 7). W siatce klawisze strzałek chodzą po komórkach, a Enter wybiera; strzałki dochodzą też do komórki wyszarzonej, żeby dało się przeczytać powód, a Enter nic na niej nie robi. Wybór wartości już wybranej też przechodzi do następnego pola, liczbę zatwierdza Enter albo wyjście z pola, a pole liczby i pole celu stoją tylko wtedy, gdy warunek albo czynność je ma (pytanie 17).
5. Rzecz nieodkryta w ogóle nie stoi w wyborze. To, czego nie wolno wybrać, stoi wyszarzone z powodem przy komórce: czynność gałęzi poznana, której postać w przejściu nie kupiła — „gałąź niewykupiona”; ta sama czynność, gdy w grze nie ma przejścia — „wybierzesz w przejściu postaci, która ją kupiła”; „Idź”, „Zbierz”, „Obchód”, „Tu leży mniej niż” i „Zapas poniżej” bez celu do wskazania — „nie znasz jeszcze celu”; cel poznany, którego nie ma na mapie przejścia — „nie ma go na tej mapie”. Gdy w grze nie ma przejścia, do wyboru są wszystkie poznane cele; czynności walki zostają do wyboru także poza walką. Reguła, która trzyma wartość spoza tego, co wolno wybrać, pokazuje ją w panelu jako wybraną i wyszarzoną, z powodem, i da się ją zmienić (pytania 1 i 16). Oferta czynności w edytorze Programów idzie za postacią w przejściu, dopóki ręczne przejście trwa, czeka albo po końcu czeka na „Restart” albo „Zakończ”, jak dziś (pytania 13 i 18).

### task.frozen.md:40-43

12. Komórka wyboru jest nową, ósmą wspólną kontrolką. Lista wyboru i pole liczby, których potrzebują panel reguły, lista z „Kopia w przejściu” i plan wyprawy, dostają postać React obok postaci DOM. Każda z tych kontrolek stoi w obu postaciach (D-265), ma przypadki w teście porównującym obie i swoje stany na stronie wszystkich stanów w postaci DOM (D-269), a komórka wyboru dostaje wpis w `guidelines/styleguide-browser-view.md`, wprowadzony przez `the-way-maintain-styleguide`.
13. Wygląd edytora nie dokłada żadnej nowej barwy, roli ani wartości (pytanie 8), a części biorą role tak (pytanie 17): komórka w spoczynku ma ramkę `control-border` i tekst `text`, pod kursorem tło `highlight`, wybrana wygląda jak przycisk wybrany w grupie, z ramką `selected` i tekstem `text-strong`, a wyszarzona ma ramkę przerywaną, nazwę w `text-disabled` i powód w `text-secondary`; fokus rysuje wspólna obwódka (D-47). W wierszu warunek stoi w `text-secondary`, czynność w `text-strong`, a numer, czas i licznik w `text-label`; wiersz otwarty i wiersz pod kursorem stoją na tle `highlight`. W nagłówku grupy nazwa stoi w `text-strong`, warunek w `text-secondary`, a liczba reguł i suma „Wykonano” w `text-label`. Panel stoi na tle `panel` z ramką `divider`, a podpisy jego pól są w `text-label`. Linia upuszczenia ma napis „tu wyląduje” w `text-strong`, a sama linia bierze kolor tego napisu (D-279). Ten opis idzie do `guidelines/styleguide-browser-view.md` przez `the-way-maintain-styleguide`.
14. W całej grze przyciski niszczące są szare w spoczynku, a czerwienieją pod kursorem i przy fokusie, w obu postaciach przycisku; dotyczy to także „Zakończ”, „Restart”, „Zatrzymaj”, „Porzuć zmiany” i „Przełącz postać na ten program”. Zdanie „Przycisk niszczący ma tekst w `danger`” przewodnika stylu zmienia się z tym, a strona wszystkich stanów pokazuje przycisk niszczący w spoczynku, pod kursorem i przy fokusie (pytanie 9).
15. Do `assets/icons/` dochodzi 11 ikon czynności z game-icons.net, tych samych co w starym Loop: `binoculars`, `hiking`, `direction-sign`, `grab`, `claw-hammer`, `match-tip`, `logging`, `meal`, `deadly-strike`, `boot-kick`, `dodge`; przypisanie do czynności idzie za starym Loop (`C:\Storage\repos\loop\src\sim\data\activities.ts:30-53`), więc „Idź” i „Idź — ognisko”, „Zbierz” i „Obchód” oraz oba „Zapal” dzielą ikonę. Dane czynności dostają pole ikony. Ikona stoi w wierszu reguły i w komórkach, rysowana maską, więc bierze kolor tekstu obok i gaśnie razem z wyszarzoną komórką. Każda nowa ikona ma wzmiankę według `icon-credits` i fakt środowiska z tytułem ze swojej strony na game-icons.net, zapisany przez `the-way-record-environment-fact`, bo `icon-credits` opiera się na takich faktach. Zdanie D-43 o pliku ikony i wiersz 102 przewodnika stylu („Kolor ikon stoi w samych plikach ikon”) mówią po zmianie prawdę o obu sposobach rysowania, które stoją obok siebie do zadania 24 (pytanie 5).

### task.frozen.md:229-229

- D-44 — Which controls do the screens of the browser view build on?: „The screens of the browser view build every button, select list, number field, text field and cell of a pick from the eight shared controls of `src/browser/view/controls/` — the button, the destructive button, the button selected in its group, the secondary action (D-275), the select list, the number field, the text field and the pick cell — and the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program” and „Zatrzymaj” are destructive buttons, neutral until the pointer or the focus reaches them and then in `danger`.” Reszta wpisu stoi w definicji; „Wyślij ponownie” bez słowa o nagłówku czyni prawdziwym zadanie 4, a zadanie 5 zapisuje wpis w całości (pytanie 15).

### task.frozen.md:241-241

- D-43 — What counts in the browser view as a value written in place of a design token? (pisze zadanie 24): „or the content of an icon file in `assets/icons/`, which is drawn as a mask and takes its colour from the text beside it.” Zadanie rysuje maską 11 ikon czynności; pozostałe ikony zostają przy kolorze w pliku do zadania 24.

### task.frozen.md:260-263

- D-40 — What do the neutral roles of the browser view mean?: „`control-border` that something can be clicked or typed into, and `selected` that this is the one chosen in its group”; „`text-disabled` that this cannot be used now”.
- D-42 — Which accessibility requirements does the browser view keep?: „keeps three success criteria of WCAG 2.2, the W3C Recommendation of 12 December 2024 — 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast and 2.4.7 Focus Visible — and no other requirement of WCAG”.
- D-45 — Where does the browser view's kitchen-sink page stand?: „The page shows every shared control in each of its states or the reason a state does not apply, every role, and samples of tiles in each state drawn with the roles, never a drawing of the game from a game state.”
- D-47 — Which elements of the browser view are controls, and how does their focus show?: „One `:focus-visible` rule of the game's stylesheet draws the focus of every control from the role `focus`”.

### task.frozen.md:283-287

- D-264 — What does a test of a screen built with React run on?: „A test of a screen built with React runs on jsdom, a development dependency pinned exactly, and only the test files of such screens leave their stand-ins for the document.”
- D-265 — How does a shared control stand in a screen built with React while other screens stay in DOM?: „a shared control that a React screen uses has two forms in `src/browser/view/controls/`, a React component and a DOM function, drawing one tree of DOM elements with the same classes and attributes”.
- D-267 — What keeps the rules of hooks and of effects in the browser view's code?: „No tool guards the rules of hooks and of effects: `guidelines/coding-browser-module.md` holds them, review keeps them”.
- D-268 — What keeps a test on a document imitation from taking the machine's memory?: „More than ten test files on a document imitation, or memory running away in a test on none, reopens how the limit is held.”
- D-269 — Does the kitchen-sink page hold React?: „it shows each shared control in its DOM form”.

## Foundation entries of your *Read*: current ranges in the worktree

The identifier is the address; the range is its size now. Read each whole, with its rationale and rejected options.

- `foundations/part_map.md:3-28` browser-view
- `foundations/decisions.md:852-865` D-40
- `foundations/decisions.md:882-895` D-42
- `foundations/decisions.md:897-910` D-43
- `foundations/decisions.md:912-925` D-44
- `foundations/decisions.md:927-940` D-45
- `foundations/decisions.md:957-970` D-47
- `foundations/decisions.md:5379-5409` D-264
- `foundations/decisions.md:5411-5451` D-265
- `foundations/decisions.md:5510-5553` D-268
- `foundations/decisions.md:5555-5579` D-269
- `foundations/decisions.md:5836-5858` D-279
- `foundations/invariants.md:35-43` browser-view-framework
- `foundations/invariants.md:459-467` browser-view-token-values
- `foundations/invariants.md:469-477` browser-view-focus-outline
- `foundations/invariants.md:499-507` application-build-kitchen-sink
- `foundations/invariants.md:1189-1197` document-test-memory-limit
- `foundations/decisions.md:6072-6106` D-288

Where the plan's *Read* names a guideline file, a source file, a test or a file made by an earlier slice, open it by that path (whole, as *Read* says) — the paths in your section above are relative to the worktree root. Files made by earlier slices exist now in the worktree.

## Report

Write the full report: status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), your commits, what each check showed with command and exit code, your own-work check (the weakest point of your slice, how you checked it and what it showed), for a user-interface slice the states and screenshot evidence as `ui_check.md` gives (or a screenshot unchecked, with its reason), each reach beyond this handoff, **Searches not found or unclear:** each thing looked for and not found or unclear, or `none`, and concerns. Return only: status, commits, a one-line check result naming what failed or did not run, and the report path.
