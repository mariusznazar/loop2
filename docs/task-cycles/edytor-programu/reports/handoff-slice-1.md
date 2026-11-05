# Handoff — slice 1 of the task `edytor-programu`

## Delegation

The person who requested this cycle delegated every intermediate choice to the orchestrator of
`implement-task`. You never ask the human. A question goes back to the orchestrator in your report
with status `questions`; a fact or permission nobody supplies makes you `blocked`. Nothing here is the human's approval.

## Where you work

- Worktree (work from its root): `C:/Storage/repos/loop2-wt/edytor-programu`, branch `task/edytor-programu`.
  Your base (the head when you start): `083b347`. Commit your work on this branch; push nothing.
- Pinned process: the worktree's `.the-way` at `f45ca40724251a46965aed69f733d0a35c430048`.
- You make: **a slice, or the retry of a slice** — slice 1. Read in full `.the-way/task-cycle/change/SKILL.md` (project skill
  `the-way-make-change`) and `.the-way/task-cycle/change/slice.md`; read `.the-way/task-cycle/change/ui_check.md` when the slice changes a user interface (the step that names it comes).
- Report: `docs/task-cycles/edytor-programu/reports/report-slice-1.md` (if your tool refuses the file, return the whole report as text).
- Commit by paths with `git add <paths>` only (never `-A`, `.`, `-a`); messages in English in the repository's form (see `git log --oneline -8`, e.g. `feat: :sparkles: …`, `docs: :memo: …`). Do not run the product's gate (`npm test` with no argument); run the focused checks your section names, each with command and exit code in the report.

## Answers of the start

- Trust boundary: the change touches `assets/icons/**` (files from game-icons.net) in slices 3 and 4 only; the review of those slices checks crafted input there.
- Irreversible operation: none. Open design choice: none; a choice of how to make what the task and the foundation settle is yours to make and name in the report; a real open design choice makes you return `returned` with no code.
- The foundation step has run: the entries D-288 to D-307 and the changed ones (D-03, D-27, D-39, D-43, D-44, D-91, D-93, D-124, D-166, D-180, D-196, D-245, D-255, D-282, icon-credits, the icon title facts, game-icons-licence) are written. Entry ranges below are current ones; they hold where they differ from the plan's.
- The base gate already fails on `tests/quality/test_quality_invariants.py::test_ruff_source_rules` and `::test_shellcheck_source_rules` (`FileNotFoundError`: ruff and shellcheck are not installed on this computer). That is the base's state: report any other failure of that file as yours.
- Two of the 11 icons are not by Delapouite or Lorc (see the foundation step's report): `logging` is by Skoll (https://game-icons.net/1x1/skoll/logging.html) and `dodge` by Felbrigg (https://game-icons.net/1x1/felbrigg/dodge.html); the foundation names them in `game-icons-licence`. Relevant only to slices 3 and 4.

## Your section of the plan, word for word (`docs/task-cycles/edytor-programu/plan.md`)

### Slice 1 — The styleguide of the pick cell, the editor, the destructive button and the icons

- **Goal:** `guidelines/styleguide-browser-view.md` carries, citing the decisions the foundation step wrote (rows E1, E3, E10, E11, E39 of the plan, by the identifiers it gave), what To do items 12–15 settle, and no meaning more. (a) The pick cell (To do item 12) stands among the shared controls of the rule *States of shared controls*, with its path `src/browser/view/controls/pick-cell.ts`, as a control that departs from the list of states: default — frame in `control-border`, text in `text`; hover — background `highlight`; visible focus — the one obwódka (D-47); chosen — as the button selected in its group, frame in `selected`, text in `text-strong`; greyed — a dashed frame (the keyword `dashed`, no new value), its name in `text-disabled` and its reason in `text-secondary`, reachable by the keyboard to read the reason, a choice of it doing nothing; error, empty and loading not applying, each with its reason; its icon of an action drawn as a mask in the colour of the text beside it, so it greys with a greyed cell. (b) A new rule for the program editor (To do item 13): in a row the condition in `text-secondary`, the action in `text-strong`, the number, the time and the count in `text-label`; the open row and the row under the pointer on `highlight`; in a group's header the name in `text-strong`, the condition in `text-secondary`, the number of rules and the sum „Wykonano” in `text-label`; the rule panel on `panel` with a frame in `divider`, the labels of its fields in `text-label`; the drop line with the words „tu wyląduje” in `text-strong` and the line itself in the colour of those words (D-279), and the rule *A line at a text takes the colour of that text* names the drop line among its examples. (c) The destructive button (To do item 14): the sentence „Przycisk niszczący ma tekst w `danger`” becomes: neutral at rest, its text in `text`, and in `danger` under the pointer and at the focus, in both forms, the six buttons named as today; the rule *Every background with its text* stays true of it under the pointer; the rule *The kitchen-sink page* says the page shows the destructive button at rest, under the pointer and at the focus. (d) The icons (To do item 15): the sentence at lines 102–103 („Kolor ikon stoi w samych plikach ikon…”) says both ways that stand side by side until task 24 — the icons of actions drawn as a mask take their colour from the text beside them; every other icon keeps the colour in its file, changed by hand when `text-strong` changes. The task names `the-way-maintain-styleguide` for (a) and (b); that skill's table gives the writing of the styleguide's file in the task cycle to the cycle's author, from `product-guidelines/template.md` and `product-guidelines/styleguide/template.md`, with no meaning the task did not settle (WAY-172): write the file so, and run no refinement. A look that would need a role, value or meaning the task and the decisions do not carry stays out of the file and goes to the report as a question.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `docs/task-cycles/edytor-programu/task.frozen.md:40-43` To do · `docs/task-cycles/edytor-programu/task.frozen.md:81-89` Questions to settle · `docs/task-cycles/edytor-programu/task.frozen.md:118-128` Questions to settle · `docs/task-cycles/edytor-programu/task.frozen.md:165-176` Questions to settle · `docs/task-cycles/edytor-programu/task.frozen.md:225-292` Decisions in play
  `.the-way/product-guidelines/template.md` · `.the-way/product-guidelines/styleguide/template.md` · `.the-way/product-guidelines/styleguide/SKILL.md:25-42` Where the skill works
  `foundations/part_map.md:3-28` browser-view · `foundations/part_map.md:118-133` agent-workflow
  `foundations/decisions.md:639-674` D-27 · `foundations/decisions.md:822-835` D-38 · `foundations/decisions.md:837-850` D-39 · `foundations/decisions.md:852-865` D-40 · `foundations/decisions.md:867-880` D-41 · `foundations/decisions.md:882-895` D-42 · `foundations/decisions.md:897-910` D-43 · `foundations/decisions.md:912-925` D-44 · `foundations/decisions.md:927-940` D-45 · `foundations/decisions.md:957-970` D-47 · `foundations/decisions.md:972-985` D-48 · `foundations/decisions.md:4847-4873` D-245 · `foundations/decisions.md:5392-5432` D-265 · `foundations/decisions.md:5536-5560` D-269 · `foundations/decisions.md:5674-5707` D-274 · `foundations/decisions.md:5709-5734` D-275 · `foundations/decisions.md:5736-5772` D-276 · `foundations/decisions.md:5817-5839` D-279
  Foundation entries rows E1, E3, E10, E11, E39
  `foundations/invariants.md:459-467` browser-view-token-values · `foundations/invariants.md:469-477` browser-view-focus-outline · `foundations/invariants.md:479-487` design-token-contrast · `foundations/invariants.md:489-497` design-token-sources · `foundations/invariants.md:499-507` application-build-kitchen-sink
  `foundations/glossary.md:53-57` program rule · `foundations/glossary.md:59-63` rule group
- **Model:** same — the file binds every later slice of the controls and the editor, and its text weaves a dozen decisions into looks that no single decision gives whole.
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` reports nothing the change caused; `npm test -- tests/invariants/test_browser_view_token_values.py`; `npm test -- tests/invariants/test_browser_view_focus_outline.py`
- **Depends on:** E1 · E3 · E10 · E11 · E39

## Passages of the task named in your *Read*, word for word (`docs/task-cycles/edytor-programu/task.frozen.md`)

### task.frozen.md:40-43

12. Komórka wyboru jest nową, ósmą wspólną kontrolką. Lista wyboru i pole liczby, których potrzebują panel reguły, lista z „Kopia w przejściu” i plan wyprawy, dostają postać React obok postaci DOM. Każda z tych kontrolek stoi w obu postaciach (D-265), ma przypadki w teście porównującym obie i swoje stany na stronie wszystkich stanów w postaci DOM (D-269), a komórka wyboru dostaje wpis w `guidelines/styleguide-browser-view.md`, wprowadzony przez `the-way-maintain-styleguide`.
13. Wygląd edytora nie dokłada żadnej nowej barwy, roli ani wartości (pytanie 8), a części biorą role tak (pytanie 17): komórka w spoczynku ma ramkę `control-border` i tekst `text`, pod kursorem tło `highlight`, wybrana wygląda jak przycisk wybrany w grupie, z ramką `selected` i tekstem `text-strong`, a wyszarzona ma ramkę przerywaną, nazwę w `text-disabled` i powód w `text-secondary`; fokus rysuje wspólna obwódka (D-47). W wierszu warunek stoi w `text-secondary`, czynność w `text-strong`, a numer, czas i licznik w `text-label`; wiersz otwarty i wiersz pod kursorem stoją na tle `highlight`. W nagłówku grupy nazwa stoi w `text-strong`, warunek w `text-secondary`, a liczba reguł i suma „Wykonano” w `text-label`. Panel stoi na tle `panel` z ramką `divider`, a podpisy jego pól są w `text-label`. Linia upuszczenia ma napis „tu wyląduje” w `text-strong`, a sama linia bierze kolor tego napisu (D-279). Ten opis idzie do `guidelines/styleguide-browser-view.md` przez `the-way-maintain-styleguide`.
14. W całej grze przyciski niszczące są szare w spoczynku, a czerwienieją pod kursorem i przy fokusie, w obu postaciach przycisku; dotyczy to także „Zakończ”, „Restart”, „Zatrzymaj”, „Porzuć zmiany” i „Przełącz postać na ten program”. Zdanie „Przycisk niszczący ma tekst w `danger`” przewodnika stylu zmienia się z tym, a strona wszystkich stanów pokazuje przycisk niszczący w spoczynku, pod kursorem i przy fokusie (pytanie 9).
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

### task.frozen.md:118-128

- Pytanie 8. Czy wygląd edytora idzie z istniejących ról, czy z podglądu wariantów?
  - Answer: A — opis bez żadnej nowej barwy ani znaczenia idzie do wytycznych, a Mariusz ocenia gotowy edytor: „komórka w spoczynku ma zwykłą ramkę, wybrana wygląda jak przycisk wybrany w grupie, wyszarzona ma ramkę przerywaną i czytelny powód, a wiersz stoi hierarchią jak w starym Loop”. Koszt przyjęty: uwagi przychodzą dopiero na działającym edytorze.
  - Not chosen:
    - B, podgląd wariantów jak w zadaniu 27 — „jedna runda i praca agenta przed cyklem”
  - Source: human, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, B11, rekomendacja A.
- Pytanie 9. Czy czerwone kasowanie w każdym wierszu zostaje do zadania 24?
  - Answer: B — wszystkie przyciski niszczące szarzeją już w tym zadaniu, a czerwienieją pod kursorem i przy fokusie. Koszt przyjęty: jedna reguła wyglądu, przewodnik stylu, strona wszystkich stanów i dwa pliki testów, a z zadania 24 przechodzą części trzech decyzji o kolorze; dotyka też „Zakończ”, „Restart” i „Zatrzymaj”. Plan przeniósł to z zadania 24 do tego zadania (dziennik planu, 2026-11-03).
  - Not chosen:
    - A, zostaje czerwone do zadania 24 — „edytor pokazany przy zgłoszeniu ma czerwony znak w każdym wierszu, gorzej niż stary Loop”
    - C, szary tylko przycisk w wierszu — „dwa wyglądy jednej kontrolki”
  - Source: human, 2026-11-03, „poza tym nie mam zastrzeżeń do rekomendacji”, pakiet rundy, B10, rekomendacja B; plan_mvp2_loop2.md@54d8d854, cel zadania 5.

### task.frozen.md:165-176

- Pytanie 17. Czy wchodzą szczegóły pisania, których pierwszy pakiet rundy nie pokazał: czas w panelu, grupy na starcie, warunek pokazania „zwiń wszystkie”, lądowanie reguły przeniesionej strzałką przez granicę grupy, klawisze w siatce i wygląd edytora?
  - Answer: A — wszystkie, w brzmieniu drugiego pakietu: „a. Czas jednego wykonania stoi w wierszu i w panelu, przy czynności.” „b. Na starcie wszystkie grupy są rozwinięte.” „c. „zwiń wszystkie” / „rozwiń wszystkie” stoi tylko przy więcej niż jednej grupie.” „d. „↓” na ostatniej regule grupy przenosi ją na początek następnej grupy, a „↑” na pierwszej na koniec poprzedniej; strzałki są wyłączone tylko na skrajach programu.” „e. W siatce strzałki chodzą po komórkach, Enter wybiera; strzałki dochodzą też do komórki wyszarzonej, żeby przeczytać powód, a Enter nic na niej nie robi; wybór już wybranej wartości przechodzi dalej; liczbę zatwierdza Enter albo wyjście z pola; pole liczby i celu stoją tylko, gdy warunek albo czynność je ma.” „f. Wygląd: komórka w spoczynku ma zwykłą ramkę i tekst, pod kursorem podświetlenie, wybrana wygląda jak przycisk wybrany w grupie, wyszarzona ma ramkę przerywaną z nazwą wyszarzoną i czytelnym powodem. W wierszu warunek jest drugoplanowy, czynność mocna, a numer, czas i licznik w kolorze podpisów; otwarty wiersz ma tło podświetlenia. Panel stoi na tle panelu. Linia upuszczenia ma napis „tu wyląduje” i kolor tego napisu.” Nazwy ról w *To do* 13 przekładają te słowa według znaczeń ról z przewodnika stylu (D-40); role wiersza pod kursorem, powodu, nagłówka grupy, ramki i podpisów panelu oraz napisu „tu wyląduje” stoją tylko w tym dokumencie, który Mariusz przyjmuje w całości.
  - Not chosen:
    - B, żaden, szczegóły zostają cyklowi — pakiet nie podał kosztu poza tym, że wybiera wtedy cykl
    - C, skreślić albo zmienić wybrane wiersze — pakiet nie podał kosztu
    - a, czas tylko w wierszu — „w panelu przy wyborze czasu nie widać”
    - b, grupy zwinięte na starcie — „nowy gracz nie widzi swoich reguł”
    - c, „zwiń wszystkie” zawsze — pakiet nie podał kosztu
    - d, lądowanie na końcu następnej grupy — „reguła przeskakuje całą grupę”
    - e, komórki wyszarzone poza zasięgiem klawiatury — pakiet nie podał kosztu poza samą drogą
    - f, role wybiera cykl — pakiet nie podał kosztu poza samą drogą
  - Source: round-4-7-package-2.md, C9; human, 2026-11-03, „wszystko przyjmuję zgodnie z rekomendacjami” (C:\Storage\repos\loop2\.runs\project-refinement\ekrany-i-menu.md, tura 28).

### task.frozen.md:225-292

### Wpisy projektowane, które zadanie urzeczywistnia i pisze

- (new) — How does the player write a program rule?: „One program editor stands on Programy and on the screen of a map run. A rule's row reads as a sentence and a rule panel beside the rows changes it: each pick moves on to the next field, conditions, actions and targets stand as cells in groups that the keyboard can reach, the conditions in two columns, and what the player may not pick stands greyed with its reason. Rules move by a handle with a line showing where they land, by arrows, and between groups, and whole rule groups move by a handle with such a line, with no arrows in the header of a rule group.”
- (new) — What do the screens leave room for from the start?: „Each column of a screen is an area of its own that a narrower layout can rearrange, Siedziba draws the team as a section with a heading, and the rule panel offers its pick in steps, the action first and its target after it.” Zadanie czyni prawdziwą część o panelu reguły i o obszarach ekranu Programy; Siedzibę daje zadanie 4, a pozostałe ekrany zadania 6, 13 i 22.
- D-44 — Which controls do the screens of the browser view build on?: „The screens of the browser view build every button, select list, number field, text field and cell of a pick from the eight shared controls of `src/browser/view/controls/` — the button, the destructive button, the button selected in its group, the secondary action (D-275), the select list, the number field, the text field and the pick cell — and the buttons „Zakończ”, „Usuń”, „Restart”, „Porzuć zmiany”, „Przełącz postać na ten program” and „Zatrzymaj” are destructive buttons, neutral until the pointer or the focus reaches them and then in `danger`.” Reszta wpisu stoi w definicji; „Wyślij ponownie” bez słowa o nagłówku czyni prawdziwym zadanie 4, a zadanie 5 zapisuje wpis w całości (pytanie 15).
- D-93 — What does a program rule show the player?: „On Programy and on the screen of a map run the list of rules stands under the heading „sprawdzane od góry”, and during a manual map run every program rule of the copy the map run carries out shows how many times it fired in that map run, written as „Wykonano {n}×”, such as „Wykonano 3×”, wherever rules show counts the header of their rule group shows their sum in the same form, such as „Wykonano 21×”, and the rules of a saved program the program editor shows then show no count. The count starts from zero at the start of each manual map run, a map run restart included, at a switch of the character to another program, and when the program rule's condition or action changes; it survives reordering the rule, moving it to another rule group, changing its group's condition or name, and a save of the copy. Before the game's first manual map run the rules show no counts; after a manual map run ends in death or in a completion its counts remain beside the copy's rules, and after „Zakończ” beside the rules of the program the copy belongs to, each rule there showing the count of the same rule of the copy where the two have the same condition and action and „Wykonano 0×” otherwise, and beside the rules of no other program, until the next send or map run restart, subject to the same reset on a change of a rule's content.”
- D-166 — Where does the player see the player's programs and pick the one to edit?: „The screen Programy holds on the left the list of the player's programs and in the middle the program editor with the program picked there. That program is always a saved one, never the copy: while a manual map run goes on, or has ended and waits for „Restart” or „Zakończ”, „Zmiany tutaj nie dotykają przejścia na mapie {mapa}.” stands above the editor, and „Przełącz postać na ten program” stands on the screen of a map run alone. On the screen of a map run the program panel shows the copy, and its select list holds „Kopia w przejściu” at its top and the player's saved programs below it.” Listę po lewej stawia zadanie 4 (pytanie 4).
- D-255 — Where does the data an agent checks the game on come from?: „An agent builds the game state a check needs with functions of the simulation and sends it by the ordinary save request to a local server with a database made for that check, and it reaches early states by playing. One command of the repository starts the game locally over HTTPS, and a check touches neither the test server nor a player's save.” W fundamencie stoi część o graniu, napisana przez zadanie 1, więc zadanie zmienia D-255.

### Wpisy projektowane, które zadanie urzeczywistnia w części, a pisze inne zadanie

Część, którą kod tego zadania czyni prawdziwą, cykl tego zadania zapisuje sam (WAY-126).

- D-03 — How is the browser view built? (zapisany, zadanie 2): „The browser view is built in TypeScript with React, its screens written as `.tsx` components that draw from the game state, and no other UI framework stands in its code or its runtime dependencies.”
- D-27 — Where do the game's icons come from? (pisze zadanie 24): „The game's icons are SVG files from game-icons.net, kept in `assets/icons/` outside the directory the account and save server serves and copied into that directory when the application is built.” Zadanie stosuje to do 11 nowych ikon; zwinięte wzmianki w Siedzibie daje zadanie 24.
- icon-credits (pisze zadanie 24): „For each SVG icon file directly in `assets/icons/`, the game's section of credits holds a credit that names the icon's title as its page on game-icons.net gives it, the icon's author, that page and the licence CC BY 3.0, and says how the icon file differs from its source.”
- D-43 — What counts in the browser view as a value written in place of a design token? (pisze zadanie 24): „or the content of an icon file in `assets/icons/`, which is drawn as a mask and takes its colour from the text beside it.” Zadanie rysuje maską 11 ikon czynności; pozostałe ikony zostają przy kolorze w pliku do zadania 24.
- D-39 — What do the signal colours of the browser view mean? (pisze zadanie 11): *Verification*: „the text of the button „Zakończ” in `danger` under the pointer”. Zadanie czyni prawdziwym ten przykład; tła przy regule daje zadanie 11.
- D-245 — What does „Zatrzymaj” do? (pisze zadanie 25): „„Zatrzymaj” is a destructive button that acts at once on the click”. Zadanie czyni prawdziwym to, że „Zatrzymaj” traci tekst w `danger` w spoczynku.
- D-124 — What does „+ reguła” do? (pisze zadanie 10): „„+ reguła” adds a program rule at the end of its rule group and opens its rule panel on the condition, „Zawsze → Eksploruj” standing there until the player picks otherwise, and it is never disabled.” Zadanie daje napis, dodawanie i otwieranie panelu; „never disabled” daje zadanie 10 (pytanie 12).
- D-180 — Where does the player arrange the trip plan? (pisze zadanie 13): „The screen Programy shows a section „Plan wyprawy” folded to a line of icons between the program's name and its rules, with the lists „Zabierz” and „Wynieś”, and the card of a map shows what of it enters. Each position holds an item select list, a number field, „↑”, „↓” and „Usuń”, and „Dodaj przedmiot” stands below each list.” Zadanie daje część o ekranie Programy; kartę mapy daje zadanie 13.

### Obecne wpisy, które zadanie zmienia

- D-91 — What program does a new game start with? (*Verification*): „complies: a new game showing the empty „Program” group with its „Dodaj regułę” control and the condition „Zawsze””; odpowiedź z planu: „D-91 w zadaniu 5”.
- D-43 (zmieniana część): „or the content of an icon file in `assets/icons/`, whose colour stands in the file and is changed by hand when the value of `text-strong` changes”.
- D-44 (dziś): „from the seven shared controls of `src/browser/view/controls/` — the button, the destructive button, the button selected in its group, the secondary action (D-275), the select list, the number field and the text field”.
- D-39 (*Verification*, dziś): „the text of the button „Zakończ” in `danger`”.
- D-245 (dziś): „„Zatrzymaj” is a destructive button with its text in the role `danger`”.
- D-255 (dziś): „An agent reaches the early states a check needs by playing, on a local server with a database made for that check. One command of the repository starts the game locally over HTTPS, and a check touches neither the test server nor a player's save.”

### Obecne wpisy, które zadanie stosuje bez zmiany

- D-18 — Where does the game's content live?: „The game's content — game maps, items, creatures, character skills and their numbers — stands in data files.”
- D-23 — How does a character act by its program?: „Conditions are chosen from a closed list, never written as expressions, rule groups stand one level deep, and the player has no way to carry out a character's action by hand.”
- D-40 — What do the neutral roles of the browser view mean?: „`control-border` that something can be clicked or typed into, and `selected` that this is the one chosen in its group”; „`text-disabled` that this cannot be used now”.
- D-42 — Which accessibility requirements does the browser view keep?: „keeps three success criteria of WCAG 2.2, the W3C Recommendation of 12 December 2024 — 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast and 2.4.7 Focus Visible — and no other requirement of WCAG”.
- D-45 — Where does the browser view's kitchen-sink page stand?: „The page shows every shared control in each of its states or the reason a state does not apply, every role, and samples of tiles in each state drawn with the roles, never a drawing of the game from a game state.”
- D-47 — Which elements of the browser view are controls, and how does their focus show?: „One `:focus-visible` rule of the game's stylesheet draws the focus of every control from the role `focus`”.
- D-75 — When are complete player journeys tested in a real browser?: „Permanent tests of complete player journeys in a real browser are deferred, and a changed journey is checked manually.”
- D-88 — How are real browser events, focus and SVG checked?: „Real browser events, focus and SVG rendering are checked manually after a change and are not automated”.
- D-90 — Where do the program rules of a program belong?: „A program holds an ordered list of rule groups, and every program rule belongs to exactly one of those groups”.
- D-92 — What counts as one firing of a program rule?: „One firing of a program rule is the start of its action”.
- D-118 — When does the player learn what the world holds?: „every other action, item, condition, creature and branch enters the Understanding only when discovered in play”; *Verification*: „violates: a program editor listing every condition from the first game minute”.
- D-119 — Whose is the knowledge of the world, and what may a character use of it?: „That one computation is at once what the program editor offers and what the simulation lets the character carry out.”
- D-126 — What does the simulation do with a program rule outside the character's repertoire?: „The simulation passes over a program rule whose condition, action or the target of either lies outside the character's repertoire to the next program rule”.
- D-127 — What does the simulation do with a rule group whose condition lies outside the character's repertoire?: „The simulation passes over a rule group whose condition, or the target of that condition, lies outside the character's repertoire”.
- D-131 — Which changes of the program a map run carries out reset its solving progress?: „an edit after which the copy's rules or rule groups differ from those before it, the discard of the copy's unsaved changes included, sets the streak and the number of beaten attacks of the map run in progress to zero”.
- D-164 — Who owns a program?: „A change made during a map run goes into the copy and reaches the program only when the player saves it there or as a new program”.
- D-167 — What can the player do with the list of programs?: „The list of programs offers „Nowy program”, „Zmień nazwę” and „Usuń””; listę stawia zadanie 4 (pytanie 4).
- D-168 — What becomes of a map run whose copy's program the player deletes?: „Deleting the program the copy of the map run belongs to leaves the map run going on with the copy”.
- D-171 — How does the program panel show the copy and its unsaved changes?: „During a map run the program panel shows the copy under the heading „Kopia: {program name}”.”
- D-172 — How does the game announce a save of the copy over a program that changed?: „„Zapisz w programie” then saves at once, in one click, and after the save the line is gone”.
- D-173 — What can the player do with the copy after a map run ends?: „On the screens after a character's death and after a completion, editing the copy, „Zapisz w programie”, „Zapisz jako nowy program” and „Porzuć zmiany” act as during the map run until the player picks „Restart” or „Zakończ”.”
- D-174 — How does the player switch the character to another program during a map run?: „During a map run, picking a saved program on the program panel's list opens it for editing”.
- D-196 — Which branch actions does the program editor offer outside a map run?: „Outside a map run the program editor currently offers the repertoire computed from the Understanding through the archetype’s predispositions; bought branches currently contribute no actions to that editor's offer. During a map run, both the copy editor and the saved-program editor use the running character’s repertoire, including its bought branches.” Stan po końcu przejścia nazywa przy tym wpisie zadanie 4 (dziennik planu, 2026-11-03): oferta postaci z przejścia do „Restart” albo „Zakończ” (pytanie 18).
- D-244 — What does the player see of an earning loop?: „what the map-run view and the program panel show during a map run stands for a manual map run”.
- D-254 — How does an agent operate the game as a player does?: „This inspection adds to the checks D-75 and D-88 leave with a person and replaces none of them.”
- D-264 — What does a test of a screen built with React run on?: „A test of a screen built with React runs on jsdom, a development dependency pinned exactly, and only the test files of such screens leave their stand-ins for the document.”
- D-265 — How does a shared control stand in a screen built with React while other screens stay in DOM?: „a shared control that a React screen uses has two forms in `src/browser/view/controls/`, a React component and a DOM function, drawing one tree of DOM elements with the same classes and attributes”.
- D-267 — What keeps the rules of hooks and of effects in the browser view's code?: „No tool guards the rules of hooks and of effects: `guidelines/coding-browser-module.md` holds them, review keeps them”.
- D-268 — What keeps a test on a document imitation from taking the machine's memory?: „More than ten test files on a document imitation, or memory running away in a test on none, reopens how the limit is held.”
- D-269 — Does the kitchen-sink page hold React?: „it shows each shared control in its DOM form”.
- D-270 — Which libraries built on React may the browser view take?: „A library built on React — a package other than `react` and `react-dom` whose entry in `package-lock.json` declares a peer dependency on `react` — counts as another UI framework under D-03”.
- D-275 — Which actions of the browser view stand as text rather than as buttons?: „Every other action of the browser view keeps the button D-44 gives it.”; *Verification*, naruszenie: „„Usuń” of a program rule drawn as underlined text”.
- D-279 — What colour does a frame or a bar that sets a text apart take?: „A frame or a bar drawn at a text to set it apart”, „takes the colour of that text and is part of it, so the text's role keeps the meaning D-39 and D-40 give it.”; linia upuszczenia przy napisie bierze więc jego kolor.
- Fakt środowiska game-icons-licence: „The game-icons/icons repository provides the icons of its contributors Delapouite and Lorc under Creative Commons 3.0 BY.”
- Niezmienniki, których zadanie dotyka bez zmiany: streak-program-change, saved-program-edit, copy-save, trip-plan-progress, program-rule-pick, program-closed-lists, content-identifiers, browser-view-framework, browser-view-token-values, browser-view-focus-outline, design-token-contrast, design-token-sources, icon-file-content, icon-credits, loop2-container-icons, document-test-memory-limit, local-start-access.

## Foundation entries of your *Read*: current ranges in the worktree

The identifier is the address; the range is its size now. Read each whole, with its rationale and rejected options.

- `foundations/part_map.md:3-28` browser-view
- `foundations/part_map.md:118-133` agent-workflow
- `foundations/decisions.md:639-674` D-27
- `foundations/decisions.md:822-835` D-38
- `foundations/decisions.md:837-850` D-39
- `foundations/decisions.md:852-865` D-40
- `foundations/decisions.md:867-880` D-41
- `foundations/decisions.md:882-895` D-42
- `foundations/decisions.md:897-910` D-43
- `foundations/decisions.md:912-925` D-44
- `foundations/decisions.md:927-940` D-45
- `foundations/decisions.md:957-970` D-47
- `foundations/decisions.md:972-985` D-48
- `foundations/decisions.md:4861-4887` D-245
- `foundations/decisions.md:5411-5451` D-265
- `foundations/decisions.md:5555-5579` D-269
- `foundations/decisions.md:5693-5726` D-274
- `foundations/decisions.md:5728-5753` D-275
- `foundations/decisions.md:5755-5791` D-276
- `foundations/decisions.md:5836-5858` D-279
- `foundations/invariants.md:459-467` browser-view-token-values
- `foundations/invariants.md:469-477` browser-view-focus-outline
- `foundations/invariants.md:479-487` design-token-contrast
- `foundations/invariants.md:489-497` design-token-sources
- `foundations/invariants.md:499-507` application-build-kitchen-sink
- `foundations/glossary.md:53-57` program rule
- `foundations/glossary.md:59-63` rule group
- `foundations/decisions.md:6072-6106` D-288

Where the plan's *Read* names a guideline file, a source file, a test or a file made by an earlier slice, open it by that path (whole, as *Read* says) — the paths in your section above are relative to the worktree root. Files made by earlier slices exist now in the worktree.

## Report

Write the full report: status (`done`, `done with concerns`, `questions`, `returned`, `reserved`, `blocked`), your commits, what each check showed with command and exit code, your own-work check (the weakest point of your slice, how you checked it and what it showed), for a user-interface slice the states and screenshot evidence as `ui_check.md` gives (or a screenshot unchecked, with its reason), each reach beyond this handoff, **Searches not found or unclear:** each thing looked for and not found or unclear, or `none`, and concerns. Return only: status, commits, a one-line check result naming what failed or did not run, and the report path.
