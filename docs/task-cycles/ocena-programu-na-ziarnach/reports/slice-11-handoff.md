# Handoff — the executor of slice 11, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `47111517`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 11 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-11/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-11-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- Quotations of decisions in tests: every comment line `// decision: D-n "…"` of a test you write or change must quote, word for word and from the beginning of a sentence, text that stands in a binding sentence of that decision as it stands now (`foundations/decisions.md`; a quotation is no paraphrase). Run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after your change and your files must show no error; errors in files you did not change are not yours (known: the D-243 quotations named below, until their slices). Slices 3 and 4 shipped such errors; do not repeat it.
- The foundation step has written the entries of the plan (commit `a65b8fa4`, on this branch): the decisions D-439 and D-440 are new, D-243, D-329, D-325, D-241, D-246 and D-22 are changed and D-190's rationale is corrected. D-251 is **withdrawn** (task 24): do not cite it as a decision you rest on.
- The seven quotations `decision: D-243` of the old first sentence of D-243 (in `tests/sim/loop.test.mjs:237` and `:304`, `tests/view/maps-screen.test.mjs:494` and `:700`, `tests/view/account-screen.test.mjs:2683`, `:2807` and `:2975`) no longer stand in D-243; the slice that changes the file shortens its quotation to a passage that stands in D-243 now (slice 5: loop.test.mjs; slice 10: maps-screen.test.mjs; slice 12: account-screen.test.mjs). Where your slice does not change the file, leave it.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- `foundations/decisions.md:11814-11839` D-439 (the plan's *Foundation entries* row 1, as the foundation step wrote it)
- `foundations/decisions.md:8771-8838` D-243 (the plan's *Foundation entries* row 3, as the foundation step wrote it)
- `foundations/decisions.md:8771-8838` D-243 (plan: 8741-8768)
- `foundations/decisions.md:9909-9927` D-326 (plan: 9819-9837)
- `foundations/decisions.md:8600-8629` D-239 (plan: 8590-8619)
- `foundations/decisions.md:8214-8231` D-170 (plan: 8204-8221)
- `foundations/decisions.md:9119-9133` D-409 (plan: 9032-9046)
- `foundations/decisions.md:3934-4013` D-207 (plan: 3934-4013)
- `foundations/part_map.md:3-31` browser-view
- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`
- `src/browser/view/state-store.ts`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 34-35 (To do)

4. W części „Kto idzie” karty mapy, przy każdej postaci, stoi przycisk oceny — na każdej mapie, na którą gracz może wejść, także nierozwiązanej, gdzie stoi obok „Wejdź”. Ocenia program z listy „Program:” tej postaci na mapie tej karty. Wynik rozwija się pod tą postacią i stoi, dopóki gracz nie wybierze innego programu, nie oceni ponownie albo nie wyjdzie z karty. Ocenić można też program postaci, która jest w pętli albo której przejście ręczne trwa, bo ocena niczego w nich nie rusza (pytania 1 i 3). Wyjście z karty to wybór innej mapy z listy, przejście na inny ekran albo przeładowanie strony; przyczyna i minuta wierszy żyją tylko w widoku, nie w zapisie. Ocena nie jest wysłaniem postaci: nie zmienia programu „użytego ostatnio” i nie czyści wyboru na liście „Program:” (D-170, D-243). Ocena idzie przez magazyn stanu gry, który przed nią dolicza czas (D-409), a dwanaście przejść liczy jedno wywołanie symulacji. Przycisk oceny od kliknięcia do wyniku jest wyłączony i ma napis „Oceniam…” (pytanie 8), więc ekran rysuje ten stan, zanim to wywołanie ruszy; „Puść w pętlę” na czas swojej oceny napisu nie zmienia.
5. „Puść w pętlę” zawsze najpierw ocenia program od nowa, z tym, co pętla dostanie ze skrzynki w tej chwili. Gdy wszystkie dwanaście ziaren jest rozwiązanych, pętla rusza od razu. Gdy któreś nie jest, wynik staje pod postacią, nad przyciskiem staje zdanie o liczbie ziaren nierozwiązanych, przycisk zmienia napis na „Puść mimo to”, a pętlę puszcza dopiero drugie kliknięcie. Nowa ocena zastępuje zapamiętaną (pytanie 1). Gdy pod postacią stoi już wynik z porażką, pokazany wcześniej osobnym przyciskiem oceny, „Puść w pętlę” też ocenia od nowa: gdy nowy wynik jest taki sam jak ten, który stoi — każde z dwunastu ziaren z tym samym wierszem — pętla rusza od razu; gdy jest inny, bo od tamtej oceny zmieniła się skrzynka albo postać, nowy wynik zastępuje stary i czeka na drugie kliknięcie (pytanie 14).

### lines 44-44 (To do)

   - po pierwszym kliknięciu „Puść w pętlę”, gdy któreś ziarno nie jest rozwiązane: nad przyciskiem, w `warning`, „Na {k} z 12 ziaren program mapy nie rozwiązuje.”, a przycisk zmienia napis na „Puść mimo to”;

### lines 56-62 (Questions to settle)

- Pytanie 1. Gdzie gracz uruchamia ocenę, gdzie czyta jej wynik i jak ocena ma się do przycisku „Puść w pętlę”, który dziś działa od razu po kliknięciu (D-243)?
  - Answer: wariant b. Przycisk oceny stoi w „Kto idzie” przy każdej postaci, na każdej mapie, także nierozwiązanej, gdzie stoi obok „Wejdź”; ocenia program z listy „Program:” tej postaci na mapie tej karty, z tym, co pętla dostałaby teraz ze skrzynki; wynik rozwija się pod tą postacią i stoi, dopóki gracz nie wybierze innego programu, nie oceni ponownie albo nie wyjdzie z karty; zapamiętany wynik — odznaka albo „{n} z 12” — stoi przy liście „Program:”; ocenić można też program postaci, która jest w pętli albo której przejście ręczne trwa. „Puść w pętlę” zawsze najpierw ocenia program od nowa, z tym, co pętla dostanie ze skrzynki w tej chwili; przy dwunastu rozwiązanych ziarnach pętla rusza od razu, a gdy któreś nie jest rozwiązane, przycisk pokazuje wynik pod postacią i czeka na drugie kliknięcie, którym gracz puszcza pętlę mimo to; nowa ocena zastępuje zapamiętaną. Zmienia D-243 (przycisk przestaje działać od razu przy programie, który gdzieś przegrywa) oraz opis tego, co stoi przy postaci i na karcie mapy (D-329, D-325). Koszt pokazany przy wyborze: jedno kliknięcie więcej przy każdym programie, który gdzieś przegrywa, także gdy gracz wie, co robi; chwila liczenia przy każdym puszczeniu; dla programu z porażką „Puść w pętlę” przestaje być jednym kliknięciem, a D-243 ceniło właśnie jedno kliknięcie.
  - Not chosen:
    - a — „Puść w pętlę” działa jak dziś, od razu, a przy programie bez zapamiętanej oceny obok stoi ostrzeżenie: „ostrzeżenie da się pominąć, czyli w przypadku z notatki gra dalej pozwala stracić dorobek jednym kliknięciem; ostrzeżenie mówi tylko o braku oceny, a nie o ocenie, która się zestarzała, bo skrzynka od tamtej pory się zmieniła”
    - c — „Puść w pętlę” nieaktywny, dopóki program nie ma zapamiętanej oceny: „Zmienia D-243 i idzie w stronę tego, co D-239 odrzuciło. Koszt: każdy program trzeba najpierw ocenić osobnym kliknięciem; ocena, która się zestarzała, odblokowuje przycisk tak samo jak świeża.”
    - d — ocena na ekranie przejścia, jak w starym Loopie, jako porównanie kopii z programem z listy: „żeby ocenić, trzeba najpierw wejść w przejście ręczne, które po zmianie z zadania 24 bierze zapas ze skrzynki, a na mapie nierozwiązanej ryzykuje postać; pętlę puszcza się z karty mapy; daje porównanie dwóch programów, którego definicja nie wymaga”
  - Source: human, 2026-11-20 — przy pytaniu pokazanym jako 9: „do pozostałych nie mam uwag”, a na prośbę o potwierdzenie, że to przyjęcie rekomendacji (wśród nich „9 b”): „3. dobrze zrozumiałeś” (`.runs/project-refinement/ocena-programu-na-ziarnach.md`, tury 13 i 14; pytanie w brzmieniu tury 10).

### lines 113-118 (Questions to settle)

- Pytanie 14. Co robi „Puść w pętlę”, gdy pod postacią stoi już wynik z porażką, który gracz zobaczył po kliknięciu osobnego przycisku oceny: ocenia od nowa i czeka na drugie kliknięcie, czy puszcza pętlę od razu?
  - Answer: wariant b — przycisk ocenia od nowa; gdy nowy wynik jest taki sam jak ten, który już stoi pod postacią, pętla rusza od razu; gdy jest inny — bo od tamtej oceny zmieniła się skrzynka albo postać — nowy wynik zastępuje stary i czeka na drugie kliknięcie. Koszt pokazany przy wyborze: trochę więcej logiki ekranu; gracz, który ocenił program wcześniej, nie dostaje przy puszczeniu drugiej przestrogi; cofnięcie później małe. Słabe miejsce pokazane przy wyborze: gracz, który kliknął ocenę dawno i o wyniku zapomniał, puści pętlę jednym kliknięciem — wynik stoi jednak pod postacią, dopóki gracz nie wyjdzie z karty mapy.
  - Not chosen:
    - a — zawsze tak samo, ocena od nowa, wynik i czekanie na drugie kliknięcie, także gdy ten sam wynik już stoi: „gracz, który świadomie ocenił program i chce go puścić mimo porażek, klika „Puść w pętlę” dwa razy, choć wynik już widział”
    - c — wynik, który stoi, liczy się jako pokazany, bez nowej oceny, pętla rusza od razu: „gdy od oceny zmieniła się skrzynka, pętla rusza na podstawie nieaktualnego wyniku — a właśnie przed tym chroni „zawsze najpierw ocenia””
  - Source: human, 2026-11-20, przez pełnomocnika — wiadomość „doradcy dnia”, jak przy pytaniu 8: „2: 1a, dopiski ok, 14b, 15b, reszta ok” (rozmowa doprecyzowania, tura 27; pytanie pokazane jako 14, w brzmieniu tury 26).

### lines 227-227 (Settlements to record)

| 5 | „Puść w pętlę” najpierw ocenia program od nowa z tym, co pętla dostanie ze skrzynki; przy dwunastu rozwiązanych ziarnach pętla rusza od razu, a gdy któreś nie jest rozwiązane, wynik staje pod postacią, nad przyciskiem staje w `warning` „Na {k} z 12 ziaren program mapy nie rozwiązuje.”, przycisk zmienia napis na „Puść mimo to”, a pętlę puszcza drugie kliknięcie; gdy pod postacią stoi już ten sam wynik z osobnego przycisku oceny, pętla rusza od razu. | sentence of D-243 | Pytanie 1; Pytanie 14; Pytanie 8 (wybory Mariusza) | czy przycisk działa od razu z ostrzeżeniem, czy jest nieaktywny bez oceny, czy po ocenie osobnym przyciskiem gracz klika dwa razy, i jak brzmi przestroga |

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

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

## Notes of the orchestrator for this slice

- Slice 10 is made (commits `159eca79`, `47111517`): the texts module `src/browser/view/judging-lines.ts`, the result under the character `src/browser/view/judging-result.tsx`, the button and the mark in `maps-screen.tsx` / `maps-entry.ts`, the cases in `tests/view/maps-screen.test.mjs`. Read them as they stand and extend them; do not rewrite what slice 10 settled.
- What the second click does, where no source settles it (the orchestrator's answer, to be named in your report): the second click starts the earning loop as any start does (D-243: the start counts as a send; the earning loop takes what the chest holds at that moment) and does not judge again; picking another program on the character's list or a new judging removes the waiting second click (the button goes back to „Puść w pętlę” and the sentence goes); a change of the chest alone does not remove it.
- „Puść w pętlę” judges first through the same act of a judging and the store as the button of slice 10 does; while it computes the button keeps its own text („Puść w pętlę”). A result with a failure that already stands under the character from the button of a judging: „Puść w pętlę” judges anew; the same result (each of the twelve seeds with the same row — compare what the screen shows: the kinds, causes and minutes of the twelve rows) starts the earning loop at once; a different result replaces the standing one and waits for the second click (task Q14).
- Every case of `tests/view/maps-screen.test.mjs` and `tests/view/uncaught-failure.test.mjs` that clicks „Puść w pętlę” follows the new behaviour with its reason (the change of D-243); nothing else of the case changes (`guidelines/testing.md`, "Changing an existing test"). The D-243 quotations of `tests/view/account-screen.test.mjs` (lines 2683, 2807, 2975) are slice 12's — leave that file. Quote every new `// decision:` line word for word from the beginning of a sentence of a binding sentence (the foundation check stops at the first field line of an entry) and run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` (your files show no error; the three account-screen D-243 errors remain).
- Screenshots as in slice 10: inspect your own, push none, keep none, remove it with your directory, say so in the report; close the browser (WAY-319). Do not touch `src/browser/kitchen-sink/` (a separate step of the orchestrator).
- A new test file needs no `stryker.config.json` entry unless `tests/quality/test_mutation_test_selection.py` says so; run it once at the end.

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
