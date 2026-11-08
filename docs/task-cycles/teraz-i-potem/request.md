**State: ready** — the change is complete, reviewed and the full tests pass; six things below wait for your yes.

## What you will see

On the screen of a map run, right under the scene, two new rows say what the character does and what it will do.

- The upper row shows the icon and the action as the program's rule writes it, such as "Zbierz — Patyk", and at its right the rule's number and the minutes, such as "reguła 2.1 · zostało 3 z 5 min". While the mage waits it reads "Czeka — żadna reguła nie pasuje". During an attack it reads "Walczy z wilkiem" alone. After a death it gives the cause ("Mag zamarzł", "Mag umarł z głodu", "Mag zginął w walce"), and after a solved map it gives the map's sentence ("Las rozwiązany") in green. The row keeps one height, so nothing under it jumps.
- The lower row starts with "Potem" and names the rule that wins right now, with its icon, action and number. During an attack it names the combat rule the turn would choose. When no rule wins it reads "żadna reguła nie pasuje — postać stanie" in orange. It stays after the end of the run.
- A row that names a rule can be clicked, or reached with Tab and pressed with Enter or Space. The program then scrolls once so that the rule stands in the middle, or the header of its group if the group is folded. A row that names no rule does nothing.

The header loses the long status line. It now holds the character, the map, the clock "Minuta 312" ("Minuta 312 (pauza)" at every pause, including the stop at a discovery), and right after the clock a bar for each requirement of the map's goal, such as "Passa 120/480" with a bar beside it. A requirement not yet met has a white fill on a dark track; a met one turns green with its name and numbers. The bar stays after the end, so after a death of cold it reads "Passa 0/480". "Pauza", the speeds, "Restart", the warning about a cut trip plan and "Zakończ" stay where they were.

The body row now puts each value in its own cell. Under the temperature, in smaller grey text, it says how long the body lasts: "bez ognia 79 min", "przy ogniu" when something burns on the mage's tile, "nie stygnie" on a map that does not cool, or "marznie" in red below 35 °C. Under satiety it says "bez jedzenia 86 min", or "głoduje" in red below 30. These notes stand from minute zero and after the end. Health and nature energy have no note.

The agents checked these screens in a real browser while making them: a running action, a wait, a pause, a stop at a discovery, a death of cold, both maps' bars, the scroll by click and by key, and the focus outline. The screenshots were taken during those checks and are not attached here.

### Underneath

The minutes each need lasts, what the two rows name and each requirement of the map's goal are counted by the game's simulation and only written out by the screen. The upper and lower rows take what they name from the same choice of rule that colours the program's rules, so the rows and the program cannot disagree.

## For you to decide

1. Some checks in a real browser were not made: the two rows during an attack were seen only in the automatic tests; the end of a solved map ("Minuta 480", "Las rozwiązany") was seen only in the automatic tests, because the agents' mage could not reach it; and the red "marznie" was forced by hand rather than reached by playing. Merge without them? (Checks, 3.)
2. Choices the cycle made that you will see on the screen: the upper row has no word "Teraz" of its own (only the lower row has its "Potem"); a row too long for its width is cut on one line; the goal's bar is a short thin line beside its numbers, and the numbers are in the ordinary game font; the notes in the body row use the small size of descriptions; a clickable row lights up under the pointer the way the program's rules do. Accept them? (Course of the cycle, Choices.)
3. While the program panel shows a saved program instead of the run's copy, the two rows still look clickable but a click does nothing. The review left this open because each fix is a behaviour no settled decision gives: either the click brings the run's copy back into the panel and scrolls to the rule, or the rows look like plain text in that state. Fix it in this request (which way?), or make a task of it? (Minor findings, 1.)
4. Decisions the cycle wrote that you have not seen in the task: that a click on the rows does nothing while a saved program is shown; that the upper row carries no word of its own; and corrections of older decisions so they no longer speak of the status line — the minute beside "Wróć do przejścia" is now the minute the clock writes, the list of places where an action's icon stands now names the two rows, and examples of the font, the pause question and a rejected way now name the clock and the header. The cycle also wrote the examples and the reasons of the new decisions, which the task gave only as answers. Accept them? (Foundation entries, the cycle's.)
5. One new decision says the upper row gives the solved map's sentence "as the decision about a solved map gives". That decision will be rewritten by later tasks of the project, which move that sentence to the right area of the screen; those tasks will have to carry the sentence over. Merge as it stands?
6. The note of how to play the game on this computer, which agents follow, still enters a map run through the old way ("Wyślij" at the character) instead of "Mapy", the map and "Wejdź". It is outside this task. Make a task of it? (Findings outside the task's scope, 1.)

## Cost

About 2 h 12 min of working time over the stages in the table of stages (linked once the record is committed): 20 subagent turns — the planner, the foundation entries, the first slice, the reviews and the return step on the strongest model; nine slices and the fix of the review on the middle one. About 154 million tokens counted, nearly all of them cached input. Two review rounds failed once each — the review of the whole change (one blocking finding) and the review of the return step (one blocking finding); each had one fix and one review of the fix, which passed.

## How to merge

Merge with "Create a merge commit": the link to the record of the cycle survives only if the commits are kept. The foundation has waited for a review through 62 merges since the start of the history (no review tag yet; the limit is 30); the review is the skill `the-way-review-foundation`, started in a session in this repository. Nothing in this request waits for it.

<details>
<summary>W języku zadania (po polsku)</summary>

**Stan: gotowe** — zmiana jest kompletna, przejrzana, a pełne testy przechodzą; sześć rzeczy poniżej czeka na Twoje „tak”.

**Co zobaczysz.** Na ekranie przejścia, zaraz pod sceną, stoją dwa nowe wiersze: co postać robi i co zrobi.

- Górny wiersz pokazuje ikonę i czynność tak, jak pisze ją reguła programu, np. „Zbierz — Patyk”, a po prawej numer reguły i minuty, np. „reguła 2.1 · zostało 3 z 5 min”. Gdy mag czeka: „Czeka — żadna reguła nie pasuje”. W czasie napaści sam napis „Walczy z wilkiem”. Po śmierci przyczyna („Mag zamarzł”, „Mag umarł z głodu”, „Mag zginął w walce”), po rozwiązaniu mapy jej zdanie („Las rozwiązany”) na zielono. Wiersz ma stałą wysokość, więc nic pod nim nie skacze.
- Dolny wiersz zaczyna się od „Potem” i nazywa regułę, która wygrywa teraz, z ikoną, czynnością i numerem. W czasie napaści — regułę walki, którą wybrałaby tura. Gdy żadna reguła nie wygrywa: „żadna reguła nie pasuje — postać stanie” na pomarańczowo. Zostaje też po końcu przejścia.
- Wiersz, który nazywa regułę, można kliknąć albo dojść do niego Tabem i nacisnąć Enter lub Spację. Program przewija się wtedy raz, tak że reguła staje na środku, a w zwiniętej grupie — jej nagłówek. Wiersz bez reguły nic nie robi.

Nagłówek traci długi wiersz stanu. Ma teraz postać, mapę, zegar „Minuta 312” („Minuta 312 (pauza)” przy każdej pauzie, także po odkryciu), a zaraz za zegarem pasek dla każdego wymagania celu mapy, np. „Passa 120/480” z paskiem obok. Niespełnione wymaganie ma białe wypełnienie na ciemnym torze, spełnione zielenieje razem z nazwą i liczbami. Pasek zostaje po końcu, więc po śmierci z zimna mówi „Passa 0/480”. „Pauza”, tempo, „Restart”, ostrzeżenie o przyciętym planie i „Zakończ” zostają na swoich miejscach.

Wiersz ciała ma każdą wartość w osobnej komórce. Pod temperaturą drobniejszym szarym tekstem stoi, ile ciało wytrzyma: „bez ognia 79 min”, „przy ogniu”, gdy coś pali się na kafelku maga, „nie stygnie” na mapie, która nie wychładza, albo „marznie” na czerwono poniżej 35 °C. Pod sytością „bez jedzenia 86 min” albo „głoduje” na czerwono poniżej 30. Dopiski stoją od minuty zero i po końcu. Zdrowie i energia natury są bez dopisku.

Agenci sprawdzali te ekrany w prawdziwej przeglądarce w trakcie pracy: trwająca czynność, czekanie, pauza, zatrzymanie po odkryciu, śmierć z zimna, paski obu map, przewijanie kliknięciem i klawiszem oraz obrys fokusu. Zrzuty ekranu powstały przy tych sprawdzeniach i nie są tu dołączone.

**Pod spodem.** Minuty potrzeb, to, co nazywają oba wiersze, i każde wymaganie celu mapy liczy symulacja gry, a ekran tylko je wypisuje. Górny i dolny wiersz biorą to, co nazywają, z tego samego wyboru reguły, który koloruje reguły programu, więc wiersze i program nie mogą się rozjechać.

**Do Twojej decyzji.**

1. Kilku sprawdzeń w prawdziwej przeglądarce nie zrobiono: oba wiersze w czasie napaści widziały tylko testy automatyczne; koniec rozwiązanej mapy („Minuta 480”, „Las rozwiązany”) też tylko testy automatyczne, bo mag agentów do niego nie doszedł; czerwone „marznie” wymuszono ręcznie, a nie dograno. Scalić bez nich? (Checks, 3.)
2. Wybory cyklu, które zobaczysz na ekranie: górny wiersz nie ma własnego słowa „Teraz” (tylko dolny ma swoje „Potem”); za długi tekst wiersza jest ucinany w jednej linii; pasek celu to krótka cienka kreska obok liczb, a liczby są zwykłym krojem gry; dopiski wiersza ciała mają mały rozmiar opisów; klikalny wiersz podświetla się pod kursorem tak jak reguły programu. Przyjmujesz? (Course of the cycle, Choices.)
3. Gdy panel programu pokazuje zapisany program zamiast kopii przejścia, oba wiersze dalej wyglądają na klikalne, ale kliknięcie nic nie robi. Przegląd zostawił to otwarte, bo każda poprawka to zachowanie, którego żadna decyzja nie daje: albo kliknięcie przywraca do panelu kopię przejścia i przewija do reguły, albo wiersze w tym stanie wyglądają jak zwykły tekst. Poprawić w tej prośbie (którą drogą?), czy zrobić z tego zadanie? (Minor findings, 1.)
4. Decyzje zapisane przez cykl, których nie widziałeś w zadaniu: że kliknięcie wierszy nic nie robi, gdy widać zapisany program; że górny wiersz nie ma własnego słowa; oraz poprawki starszych decyzji, żeby nie mówiły już o wierszu stanu — minuta przy „Wróć do przejścia” to teraz minuta, którą pisze zegar, lista miejsc ikony czynności wymienia oba wiersze, a przykłady kroju pisma, pytania przy pauzie i jednej odrzuconej drogi mówią o zegarze i nagłówku. Cykl napisał też przykłady i uzasadnienia nowych decyzji, które zadanie podało tylko jako odpowiedzi. Przyjmujesz? (Foundation entries, the cycle's.)
5. Jedna nowa decyzja mówi, że górny wiersz podaje zdanie rozwiązania mapy „tak, jak daje je decyzja o rozwiązaniu”. Tę decyzję przepiszą późniejsze zadania projektu, które przenoszą to zdanie do prawego obszaru ekranu; będą musiały to zdanie przenieść. Scalić tak, jak jest?
6. Notatka o tym, jak grać w grę na tym komputerze, z której korzystają agenci, wchodzi do przejścia starą drogą („Wyślij” przy postaci) zamiast „Mapy”, mapa i „Wejdź”. To poza tym zadaniem. Zrobić z tego zadanie? (Findings outside the task's scope, 1.)

**Koszt.** Około 2 h 12 min pracy na etapach z tabeli etapów: 20 tur subagentów — planista, wpisy fundamentu, pierwszy kawałek, recenzje i krok powrotny na najmocniejszym modelu; dziewięć kawałków i poprawka po recenzji na średnim. Około 154 mln tokenów, prawie wszystkie z pamięci podręcznej. Dwie recenzje za pierwszym razem nie przeszły — recenzja całej zmiany (jedno znalezisko blokujące) i recenzja kroku powrotnego (jedno znalezisko blokujące); każda dostała jedną poprawkę i jedną recenzję poprawki, które przeszły.

**Jak scalić.** „Create a merge commit”: link do zapisu cyklu przetrwa tylko wtedy, gdy commity zostaną. Fundament czeka na przegląd od 62 scaleń od początku historii (bez znacznika przeglądu; próg to 30); przegląd to skill `the-way-review-foundation`, uruchamiany w sesji w tym repozytorium. Nic w tej prośbie na niego nie czeka.

</details>

## Technical changes

Each item: what it concerns, then the commits and places.

- Foundation entries before any code (`bd44c39`): four new decisions D-334 („Teraz”), D-335 („Potem”), D-336 (the click), D-337 (the minutes of the needs); D-133 rewritten; D-311, D-147, D-122, D-132, D-39, D-40 and the invariant `rule-state-from-pick` in the wording the task binds; examples and references corrected in D-62, D-135, D-178, D-57, D-46, D-324, D-280, D-291.
- The styleguide's table of roles names the new uses: the bar's track `highlight`, fill `text` and, once met, `positive`; `warning` for no winning rule; `danger` for „marznie”/„głoduje”; `text-secondary` for the notes (`02e41f3`, `guidelines/styleguide-browser-view.md`).
- The simulation counts the minutes each need lasts and the note of each need; the map card's „bez ognia” reads the same count (`35f53cd`: `minutesUntilChilled`, `minutesUntilStarving`, `needNotes` in `src/browser/sim/body.ts`; `src/browser/sim/map-card.ts`).
- The simulation gives what „Teraz” and „Potem” name from the one judgement of the program, with the death, completion and combat exceptions (`e7e8a95`: `nowAndNext` in `src/browser/sim/game.ts`).
- The simulation gives each requirement of the solving condition, which `meetsSolving` now reads (`c60bd5e`: `solvingRequirements` in `src/browser/sim/run.ts`).
- The rows under the scene (`46e0ed9`: new `src/browser/view/now-lines.ts`, `src/browser/view/now-rows.tsx`; `world-area.tsx`; `styles.css`).
- The click and key on a row scroll the program to its rule (`92f6860`: `now-rows.tsx`, `program-panel.tsx` `scrollToRule`, `run-screen.tsx`, `world-area.tsx`).
- The header holds the clock alone in place of the status row (`0727fac`: `clockText` in `src/browser/view/status-row.ts`, `run-header.tsx`, class `run-header-clock`).
- The bar of the solving condition in the header (`cb0212e`: `run-header.tsx`, `status-row.ts`, `styles.css`).
- The body row in cells with the notes (`730bc50`: `body-row.ts`, `world-area.tsx`, `styles.css`).
- Rows of the two new view files in the coding guidelines, both `copy` (`434f32b`, `guidelines/coding-browser-module.md`).
- Fix of the whole-change review: the bar's numbers in Geist, not Geist Mono (blocking); stale "status row" comments in `run-screen.tsx` and `screen-address.ts`, the styleguide's example and D-216 *Rejected* (Minor) (`52367a9`).
- Return step: D-336 and D-334 corrected (`0a8c6a8`), D-336 widened after its review (`1fd54fd`).

## Checks

1. The full tests on the final tree pass: `npm test` exit 0 on `1fd54fd` — `412 tests in 4 directories; every directory passed`, `foundation_check.py` `0 errors`. The same command passed on the reviewed change `52367a9` and on the base `381588f`; nothing fails on the base. A first run on the base stopped on two quality tests because the new worktree had no `.runs/quality-venv`; after setting it up as the README gives, the base passed (environment, not code).
2. Each slice wrote its new test cases first and saw them fail on their assertions (exit 1) before the code; the reviewer of the whole change ran a mutation run on the changed simulation code: 98.43 %, two surviving mutants judged equivalent.
3. The screens were looked at in a real browser by the slices' executors: the rows during a running action, a wait and after a death and a completion (slice 5); the scroll by click, Enter and Space, a folded group and the whole focus outline (slice 6); the clock running, paused, at a discovery and after a cold death (slice 7); the bar on Las, after a cold death („Passa 0/480”) and on Las — głębiej with one requirement met (slice 8; and after the fix, the bar's words in Geist); the body row on Las at 12 px in `text-secondary` (slice 9). Not seen in a browser: the rows during an attack; the completion at „Minuta 480” (jsdom only); the red „marznie” reached by play (forced by hand). Screenshots were taken during the checks and are not attached.
4. Own-work checks: each slice's report holds its own; among them the task's numbers recomputed by hand (83 and 33 minutes from 37 °C, 116 from full satiety, 79 and 86 for D-178's example), a search for DOM-API calls in the two new view files (none), and the token-value invariant seen failing under a temporary mutation.
5. Description form check: `python -B .the-way/task-cycle/request_check.py .runs/task-cycles/teraz-i-potem/request.md --task .runs/task-cycles/teraz-i-potem/task.md` — see the record.
6. Private paths in the description: `python -B .the-way/task-cycle/private_paths_check.py .runs/task-cycles/teraz-i-potem/request.md` — see the record.
7. The record's copy: filled in once the copy is committed.
8. Process remarks check on the original record: `python -B .the-way/task-cycle/remarks_check.py .runs/task-cycles/teraz-i-potem` exit 0, nothing listed.

## Foundation entries

- D-334 — `row 1`, `row 4`, `row 8`: under the scene „Teraz” keeps one height and shows the action's icon and the action as its rule's row writes it with „reguła 2.1 · zostało 3 z 5 min”, the wait, „Walczy z wilkiem” alone in combat, the completion text, and after a death its cause in `text`; its *Verification* example of the word „Teraz” in the row is the cycle's (return step).
- D-335 — `row 2`: „Potem” names the rule that wins now, the combat rule the turn would choose during an attack, „żadna reguła nie pasuje — postać stanie” in `warning`, and after the end the rule that wins at the stopped minute.
- D-336 — `row 3`, and the cycle's: a click or key on „Teraz” or „Potem” scrolls the program once to its rule or its folded group's header, a row naming no rule scrolls nothing, and while the panel shows a saved program in place of the copy the click scrolls nothing (the cycle's, return step).
- D-337 — `row 7`: the body row has a cell per value and under temperature and satiety a smaller grey note with the minutes the need lasts, rounded down, from minute zero and after the end.
- D-133 — `projected` (whole), `row 5`, `row 6`: the header shows a bar with numbers for each requirement, a met one's name, numbers and fill in `positive`, the bar staying after the end with the current streak.
- D-311 — `projected`, in part: the world holds the scene, „Teraz” and „Potem”, the encounter paragraph, the end line and the body row with the minutes; the header holds the clock and the bar of the solving condition, no status row.
- `rule-state-from-pick` (invariant) — `projected`: the rule signs and what „Teraz” and „Potem” name come from the function that picks the rule, save the three D-147 exceptions; *Derives from* gains D-147, D-334, D-335 (the cycle's). No invariant test changed; no surface and no *Violated* mark changed.
- D-147, D-122, D-132 — `projected`, in part: „Teraz” in combat; the clock „Minuta {m} (pauza)” at a discovery; the completion text in „Teraz” and the clock at the completion minute.
- D-39, D-40 — `projected`: `positive` fills a met requirement's bar on a `highlight` track; an unmet requirement's fill is `text`.
- D-62, D-135, D-178, D-57 — examples as the task gives.
- D-46, D-324, D-280, D-291, D-216 — the cycle's: examples, a reference in D-280's binding sentence (the minute „as the clock in the header writes it”), D-291's list of the icon's places extended with the two rows, D-216's *Rejected* read as a way weighed while the header held a status row.

## Minor findings

1. Review of the whole change, M-5 (slice 6), left by its fix as a choice no settled decision gives: „„Teraz” and „Potem” stay controls that do nothing while the program panel shows a saved program … So with a saved program shown during a map run the player can focus and click a row that looks clickable and nothing happens. … a reasonable player would expect either the copy to come back with the rule centred or the row not to look clickable. Rare state, no damage; graded Minor.” — `src/browser/view/now-rows.tsx` (`RuleRow`), `src/browser/view/program-panel.tsx` (`scrollToRule`).
2. Review of the return step, M-1: „One *Rationale* line of D-336 is not wrapped as the rest of the entry.” — `foundations/decisions.md` (D-336 *Rationale*).

## Findings outside the task's scope

1. Not a reviewer's finding — noted by the executor of slice 9: the agents' note on running the game, `.claude/skills/loop2-play/SKILL.md`, describes an old way into a map run; today it is „Mapy”, the map, „Wejdź”, with no „Wyślij” at the character.

## Course of the cycle

- **Task and sources:** task 14 `teraz-i-potem` of the plan `plan_mvp2_loop2.md` (definition approved 2026-11-03), accepted 2026-11-07; dependencies 11 and 13 delivered by their merged requests #57 and #64; frozen copy in the record.
- **Process pin:** `294af7fde45323ac1851c014a03071a97fc38d96`, unchanged.
- **Spec:** none — the two questions the task carried to the cycle were settled by D-04, D-333 and the invariant `rule-state-from-pick`.
- **Route:** planned slices — the change spans the header, the world area, the body row, the simulation, two guideline files and about twenty foundation entries.
- **Plan:** the plan in the record (linked once the record is committed) — the foundation entries, then ten slices (styleguide roles; three simulation slices; the rows, their click, the clock, the bar, the body row; the coding guideline rows).
- **Choices:** 25 rows of the cycle's questions and choices, in the record (linked once the record is committed).
- **Blocking findings left:** none.
- **Record:** linked once the record is committed, by the SHA of the commit that adds it
