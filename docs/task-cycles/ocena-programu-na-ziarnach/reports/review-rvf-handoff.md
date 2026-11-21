# Handoff — review `rvf`, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Questions go to the orchestrator, never to the human.

## What is reviewed

- Worktree: `.` (branch `task/ocena-programu-na-ziarnach`); you are read-only there and make no commit. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`.
- Method: `.the-way/task-cycle/review/SKILL.md` (`review-change`). Read it whole, and a file it names only when the step or variant that names the file comes.
- Review: a group of the cycle's slices, in the plan's order — slice(s) 11. **Range to review: `25d1494d..f2d28489`** (base exclusive, head inclusive; head `f2d28489`). Check the head with `git rev-parse` first; on a mismatch ask the orchestrator which range to review.
- The change is a member of a plan; the plan's sections for what you review are copied below word for word, and the passages of the frozen task that those sections' *Read* name (the frozen task is `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; open it if a passage points you to more). You judge the work against those passages and the foundation entries the sections name, not against the plan's wording.
- Two answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; check crafted input at that boundary wherever the range touches it (say so in the report if the range does not). Irreversible operation **no**: confirm that the change only prepares what it prepares.
- Executors' and writer's reports (each in `.runs/task-cycles/ocena-programu-na-ziarnach/reports/`): `slice-11-executor-report.md`, `rv-findings.md`. Read each; they hold the own-work checks, reaches, concerns and unread material. A check an author reports is evidence of what the author ran, never of the result.
- Mechanical checks the orchestrator ran: clean worktree, non-empty range, changed files equal the slices' *Change*. Any mismatch is given below under notes.
- No agent of the cycle runs the product's full gate; **you do not run `npm test` without a file argument or the whole `tests/`**. Run the focused checks of the slices you review, and probes of your own, from a worktree of the head commit in your own directory.
- Your directory for working copies: `.runs/review-rvf/` (directly under the ignored `.runs/` of the worktree) — make a detached worktree of `f2d28489` there (`git worktree add --detach .runs/review-rvf/wt f2d28489`), run `npm ci` in it if you run Node tests, and run checks there, not in the cycle's worktree (another agent may be writing there). Remove it before you return, as the paragraph below gives.
- Your report path (its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/review-rvf-report.md`; its first line is `PASS f2d28489` or `FAIL f2d28489` (or `questions`).
- `cycle.md` and the other files of the record directory not named above are not yours to read.
- Settle each blocking finding's contradiction mark, and for the range's slices the slice it comes from, as `review-change` gives.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Passages of the frozen task

### lines 34-35

4. W części „Kto idzie” karty mapy, przy każdej postaci, stoi przycisk oceny — na każdej mapie, na którą gracz może wejść, także nierozwiązanej, gdzie stoi obok „Wejdź”. Ocenia program z listy „Program:” tej postaci na mapie tej karty. Wynik rozwija się pod tą postacią i stoi, dopóki gracz nie wybierze innego programu, nie oceni ponownie albo nie wyjdzie z karty. Ocenić można też program postaci, która jest w pętli albo której przejście ręczne trwa, bo ocena niczego w nich nie rusza (pytania 1 i 3). Wyjście z karty to wybór innej mapy z listy, przejście na inny ekran albo przeładowanie strony; przyczyna i minuta wierszy żyją tylko w widoku, nie w zapisie. Ocena nie jest wysłaniem postaci: nie zmienia programu „użytego ostatnio” i nie czyści wyboru na liście „Program:” (D-170, D-243). Ocena idzie przez magazyn stanu gry, który przed nią dolicza czas (D-409), a dwanaście przejść liczy jedno wywołanie symulacji. Przycisk oceny od kliknięcia do wyniku jest wyłączony i ma napis „Oceniam…” (pytanie 8), więc ekran rysuje ten stan, zanim to wywołanie ruszy; „Puść w pętlę” na czas swojej oceny napisu nie zmienia.
5. „Puść w pętlę” zawsze najpierw ocenia program od nowa, z tym, co pętla dostanie ze skrzynki w tej chwili. Gdy wszystkie dwanaście ziaren jest rozwiązanych, pętla rusza od razu. Gdy któreś nie jest, wynik staje pod postacią, nad przyciskiem staje zdanie o liczbie ziaren nierozwiązanych, przycisk zmienia napis na „Puść mimo to”, a pętlę puszcza dopiero drugie kliknięcie. Nowa ocena zastępuje zapamiętaną (pytanie 1). Gdy pod postacią stoi już wynik z porażką, pokazany wcześniej osobnym przyciskiem oceny, „Puść w pętlę” też ocenia od nowa: gdy nowy wynik jest taki sam jak ten, który stoi — każde z dwunastu ziaren z tym samym wierszem — pętla rusza od razu; gdy jest inny, bo od tamtej oceny zmieniła się skrzynka albo postać, nowy wynik zastępuje stary i czeka na drugie kliknięcie (pytanie 14).

### lines 44-44

   - po pierwszym kliknięciu „Puść w pętlę”, gdy któreś ziarno nie jest rozwiązane: nad przyciskiem, w `warning`, „Na {k} z 12 ziaren program mapy nie rozwiązuje.”, a przycisk zmienia napis na „Puść mimo to”;

### lines 56-62

- Pytanie 1. Gdzie gracz uruchamia ocenę, gdzie czyta jej wynik i jak ocena ma się do przycisku „Puść w pętlę”, który dziś działa od razu po kliknięciu (D-243)?
  - Answer: wariant b. Przycisk oceny stoi w „Kto idzie” przy każdej postaci, na każdej mapie, także nierozwiązanej, gdzie stoi obok „Wejdź”; ocenia program z listy „Program:” tej postaci na mapie tej karty, z tym, co pętla dostałaby teraz ze skrzynki; wynik rozwija się pod tą postacią i stoi, dopóki gracz nie wybierze innego programu, nie oceni ponownie albo nie wyjdzie z karty; zapamiętany wynik — odznaka albo „{n} z 12” — stoi przy liście „Program:”; ocenić można też program postaci, która jest w pętli albo której przejście ręczne trwa. „Puść w pętlę” zawsze najpierw ocenia program od nowa, z tym, co pętla dostanie ze skrzynki w tej chwili; przy dwunastu rozwiązanych ziarnach pętla rusza od razu, a gdy któreś nie jest rozwiązane, przycisk pokazuje wynik pod postacią i czeka na drugie kliknięcie, którym gracz puszcza pętlę mimo to; nowa ocena zastępuje zapamiętaną. Zmienia D-243 (przycisk przestaje działać od razu przy programie, który gdzieś przegrywa) oraz opis tego, co stoi przy postaci i na karcie mapy (D-329, D-325). Koszt pokazany przy wyborze: jedno kliknięcie więcej przy każdym programie, który gdzieś przegrywa, także gdy gracz wie, co robi; chwila liczenia przy każdym puszczeniu; dla programu z porażką „Puść w pętlę” przestaje być jednym kliknięciem, a D-243 ceniło właśnie jedno kliknięcie.
  - Not chosen:
    - a — „Puść w pętlę” działa jak dziś, od razu, a przy programie bez zapamiętanej oceny obok stoi ostrzeżenie: „ostrzeżenie da się pominąć, czyli w przypadku z notatki gra dalej pozwala stracić dorobek jednym kliknięciem; ostrzeżenie mówi tylko o braku oceny, a nie o ocenie, która się zestarzała, bo skrzynka od tamtej pory się zmieniła”
    - c — „Puść w pętlę” nieaktywny, dopóki program nie ma zapamiętanej oceny: „Zmienia D-243 i idzie w stronę tego, co D-239 odrzuciło. Koszt: każdy program trzeba najpierw ocenić osobnym kliknięciem; ocena, która się zestarzała, odblokowuje przycisk tak samo jak świeża.”
    - d — ocena na ekranie przejścia, jak w starym Loopie, jako porównanie kopii z programem z listy: „żeby ocenić, trzeba najpierw wejść w przejście ręczne, które po zmianie z zadania 24 bierze zapas ze skrzynki, a na mapie nierozwiązanej ryzykuje postać; pętlę puszcza się z karty mapy; daje porównanie dwóch programów, którego definicja nie wymaga”
  - Source: human, 2026-11-20 — przy pytaniu pokazanym jako 9: „do pozostałych nie mam uwag”, a na prośbę o potwierdzenie, że to przyjęcie rekomendacji (wśród nich „9 b”): „3. dobrze zrozumiałeś” (`.runs/project-refinement/ocena-programu-na-ziarnach.md`, tury 13 i 14; pytanie w brzmieniu tury 10).

### lines 113-118

- Pytanie 14. Co robi „Puść w pętlę”, gdy pod postacią stoi już wynik z porażką, który gracz zobaczył po kliknięciu osobnego przycisku oceny: ocenia od nowa i czeka na drugie kliknięcie, czy puszcza pętlę od razu?
  - Answer: wariant b — przycisk ocenia od nowa; gdy nowy wynik jest taki sam jak ten, który już stoi pod postacią, pętla rusza od razu; gdy jest inny — bo od tamtej oceny zmieniła się skrzynka albo postać — nowy wynik zastępuje stary i czeka na drugie kliknięcie. Koszt pokazany przy wyborze: trochę więcej logiki ekranu; gracz, który ocenił program wcześniej, nie dostaje przy puszczeniu drugiej przestrogi; cofnięcie później małe. Słabe miejsce pokazane przy wyborze: gracz, który kliknął ocenę dawno i o wyniku zapomniał, puści pętlę jednym kliknięciem — wynik stoi jednak pod postacią, dopóki gracz nie wyjdzie z karty mapy.
  - Not chosen:
    - a — zawsze tak samo, ocena od nowa, wynik i czekanie na drugie kliknięcie, także gdy ten sam wynik już stoi: „gracz, który świadomie ocenił program i chce go puścić mimo porażek, klika „Puść w pętlę” dwa razy, choć wynik już widział”
    - c — wynik, który stoi, liczy się jako pokazany, bez nowej oceny, pętla rusza od razu: „gdy od oceny zmieniła się skrzynka, pętla rusza na podstawie nieaktualnego wyniku — a właśnie przed tym chroni „zawsze najpierw ocenia””
  - Source: human, 2026-11-20, przez pełnomocnika — wiadomość „doradcy dnia”, jak przy pytaniu 8: „2: 1a, dopiski ok, 14b, 15b, reszta ok” (rozmowa doprecyzowania, tura 27; pytanie pokazane jako 14, w brzmieniu tury 26).

### lines 227-227

| 5 | „Puść w pętlę” najpierw ocenia program od nowa z tym, co pętla dostanie ze skrzynki; przy dwunastu rozwiązanych ziarnach pętla rusza od razu, a gdy któreś nie jest rozwiązane, wynik staje pod postacią, nad przyciskiem staje w `warning` „Na {k} z 12 ziaren program mapy nie rozwiązuje.”, przycisk zmienia napis na „Puść mimo to”, a pętlę puszcza drugie kliknięcie; gdy pod postacią stoi już ten sam wynik z osobnego przycisku oceny, pętla rusza od razu. | sentence of D-243 | Pytanie 1; Pytanie 14; Pytanie 8 (wybory Mariusza) | czy przycisk działa od razu z ostrzeżeniem, czy jest nieaktywny bez oceny, czy po ocenie osobnym przyciskiem gracz klika dwa razy, i jak brzmi przestroga |


## The plan's sections for what you review (word for word)

### Slice 11 — „Puść w pętlę” judges the program anew first

- **Goal:** „Puść w pętlę”, at each character of the card of a solved map, first judges the program
  of the list anew through the same act of a judging and the store (Slice 10's way), with what the
  earning loop would get from the chest at that moment, keeping its own text while it computes. With
  all twelve seeds solved the earning loop starts at once, as today (the start counts as a send,
  D-243). Otherwise the result stands under the character, above the button stands „Na {k} z 12
  ziaren program mapy nie rozwiązuje.” in `warning`, the button reads „Puść mimo to”, and only its
  second click starts the earning loop. The new judging replaces the remembered one. Where a result
  with a failure stands already under the character from the button of a judging, „Puść w pętlę”
  judges anew too: a result the same as the one standing — each of the twelve seeds with the same row
  — starts the earning loop at once; a different one replaces it and waits for the second click
  (task Q14). The waiting second click goes with what makes the result go (another program, a new
  judging, leaving the card). „Pętla nic nie zarobi do skrzynki” stays beside the button and the
  button still acts (D-326). The failing tests come first, in `tests/view/maps-screen.test.mjs` and
  `tests/view/judging-lines.test.mjs`; each case of `tests/view/maps-screen.test.mjs` and
  `tests/view/uncaught-failure.test.mjs` that clicks „Puść w pętlę” follows the new behaviour with its
  reason, the change of D-243, and nothing else of it changes; a line `decision:` quoting a passage of
  D-243 the Foundation entries changed follows the new passage.
- **Change:** `src/browser/view/maps-screen.tsx` · `src/browser/view/maps-entry.ts` ·
  `src/browser/view/judging-lines.ts` · `src/browser/view/judging-result.tsx` ·
  `src/browser/maps-screen.css` · `tests/view/maps-screen.test.mjs` ·
  `tests/view/judging-lines.test.mjs` · `tests/view/uncaught-failure.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:34-35` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:44-44` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:56-62` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:113-118` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:227-227` Settlements to record ·
  Foundation entries row 1 · Foundation entries row 3 · `foundations/decisions.md:8741-8768` D-243
  · `foundations/decisions.md:9819-9837` D-326 · `foundations/decisions.md:8590-8619` D-239 ·
  `foundations/decisions.md:8204-8221` D-170 · `foundations/decisions.md:9032-9046` D-409 · `foundations/decisions.md:3934-4013` D-207 ·
  `foundations/part_map.md:3-31` browser-view · `guidelines/coding.md` ·
  `guidelines/coding-browser-module.md` · `guidelines/styleguide-browser-view.md` ·
  `guidelines/testing.md` · `src/browser/AGENTS.md` · `src/browser/view/state-store.ts`
- **Model:** same — the two clicks, the comparison with a result that stands and what clears the
  waiting second click make a small state machine across clicks and readings of the clock.
- **Risk:** none
- **Checks:** `npm test -- tests/view/maps-screen.test.mjs` (its new cases written first, failing) ·
  `npm test -- tests/view/judging-lines.test.mjs` · `npm test -- tests/view/uncaught-failure.test.mjs`
  · `npm test -- tests/view/state-store.test.mjs` ·
  `npm test -- tests/invariants/test_browser_view_token_values.py`
- **Depends on:** Slice 10 · Foundation entries row 3

## Notes of the orchestrator

- This is the review of the one fix of review `rv`'s blocking finding I-1: the findings file is `reports/rv-findings.md` (the reviewer's words; read it whole, and the probe `reports/review-rv-probe.test.mjs.txt` and its output `reports/review-rv-probe-output.txt`). The fix is the commit `f2d28489` alone (range `25d1494d..f2d28489`), made by slice 11's executor, resumed: each shown result now records which click made it, and only a result of the button „Oceń na 12 ziarnach” (or one kept at an at-once start that equalled such a result) is passed as `standing`; a case of the path was added to `tests/view/maps-screen.test.mjs`. Its report: `slice-11-executor-report.md`.
- Check: (1) the blocking finding is gone — run the reviewer's probe (kept file) against the head and show the calls now wait for „Puść mimo to”; (2) the at-once start still works for a result from the button of a judging (task Q14, *To do* 5, row 5) and after an at-once start the standing result is kept only if the new rows equal it; (3) the new case is red against `25d1494d`'s `maps-screen.tsx` and green at the head (a mutation); (4) nothing else of the behaviour changed; the Minor findings M-1..M-4 of review `rv` are not part of this fix and are not yours to re-grade (a new Critical or Important finding in the fix counts as one that remains); (5) the focused view tests and `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` (use the cycle worktree's `.the-way`), ESLint, Prettier. Not the full gate.
