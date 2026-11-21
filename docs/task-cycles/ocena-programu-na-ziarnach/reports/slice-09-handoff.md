# Handoff — the executor of slice 9, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `b1a49f87`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 9 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-9/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-09-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- The foundation step has written the entries of the plan (commit `a65b8fa4`, on this branch): the decisions D-439 and D-440 are new, D-243, D-329, D-325, D-241, D-246 and D-22 are changed and D-190's rationale is corrected. D-251 is **withdrawn** (task 24): do not cite it as a decision you rest on.
- The seven quotations `decision: D-243` of the old first sentence of D-243 (in `tests/sim/loop.test.mjs:237` and `:304`, `tests/view/maps-screen.test.mjs:494` and `:700`, `tests/view/account-screen.test.mjs:2683`, `:2807` and `:2975`) no longer stand in D-243; the slice that changes the file shortens its quotation to a passage that stands in D-243 now (slice 5: loop.test.mjs; slice 10: maps-screen.test.mjs; slice 12: account-screen.test.mjs). Where your slice does not change the file, leave it.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- `foundations/decisions.md:11814-11839` D-439 (the plan's *Foundation entries* row 1, as the foundation step wrote it)
- `foundations/decisions.md:11840-11866` D-440 (the plan's *Foundation entries* row 2, as the foundation step wrote it)
- `foundations/decisions.md:8771-8838` D-243 (the plan's *Foundation entries* row 3, as the foundation step wrote it)
- `foundations/decisions.md:9975-10004` D-329 (the plan's *Foundation entries* row 4, as the foundation step wrote it)
- `.the-way/product-guidelines/styleguide/SKILL.md`
- `foundations/decisions.md:4895-4909` D-38 (plan: 4895-4909)
- `foundations/decisions.md:4910-4930` D-39 (plan: 4910-4930)
- `foundations/decisions.md:4931-4947` D-40 (plan: 4931-4947)
- `foundations/decisions.md:4993-5009` D-44 (plan: 4993-5009)
- `foundations/decisions.md:5237-5282` D-274 (plan: 5237-5282)
- `foundations/decisions.md:9909-9927` D-326 (plan: 9819-9837)
- `foundations/part_map.md:3-31` browser-view
- `foundations/part_map.md:139-157` agent-workflow

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 38-45 (To do)

8. Napisy, które gracz czyta przy ocenie, odznace, drugim kliknięciu „Puść w pętlę” i rekordzie pętli, słowo w słowo (pytanie 8); {i} to numer ziarna, {n}, {k} i {m} to liczby, {pułap} to pułap minut z danych gry:
   - przycisk oceny przy postaci: „Oceń na 12 ziarnach”; w trakcie liczenia: „Oceniam…”;
   - nagłówek wyniku: „Ocena na 12 ziarnach: {n} z 12 rozwiązanych”;
   - wiersze: „Ziarno {i}: rozwiązane”, „Ziarno {i}: mag zamarzł w {m}. minucie”, „Ziarno {i}: mag umarł z głodu w {m}. minucie”, „Ziarno {i}: mag zginął w walce w {m}. minucie”, „Ziarno {i}: bez rozstrzygnięcia po {pułap} minutach”;
   - pod wierszami, w `text-secondary`: „Ocena nic nie kosztuje: nie bierze ze skrzynki, nic nie płaci, a śmierć w niej nie zabiera wprawy ani wskrzeszenia.”;
   - przy liście „Program:”: „szczelny: 12 z 12” w `positive`, a przy niższym wyniku „{n} z 12” w `text`; dopisek, gdy skrzynka nie ma już tego, co ocena wzięła: „oceniono z zapasem, którego dziś nie ma w skrzynce” (pytanie 2);
   - po pierwszym kliknięciu „Puść w pętlę”, gdy któreś ziarno nie jest rozwiązane: nad przyciskiem, w `warning`, „Na {k} z 12 ziaren program mapy nie rozwiązuje.”, a przycisk zmienia napis na „Puść mimo to”;
   - na końcu wiersza postaci w „Gdy cię nie było”: „ · najdłużej bez śmierci: {n} przejść z rzędu”, z odmianą „1 przejście”, „3 przejścia”, „5 przejść”.

### lines 49-49 (To do)

10. Styleguide widoku (`guidelines/styleguide-browser-view.md`) idzie za zmianą: reguła „The screen Mapy”, albo nowa reguła obok niej, podaje role części wyniku oceny, odznaki, dopisku o zapasie i tego, co stoi przed drugim kliknięciem „Puść w pętlę”: nagłówek wyniku w `text-strong` (wartość, na którą patrzy się najpierw), wiersz rozwiązany w `positive`, wiersz śmierci w `danger` (w pętli taka śmierć grozi utratą postaci), wiersz bez rozstrzygnięcia w `warning` (mapa nie zostanie rozwiązana), zdanie pod wierszami w `text-secondary`, odznaka „szczelny: 12 z 12” w `positive`, „{n} z 12” w `text`, dopisek o zapasie w `warning`, jak ostrzeżenie D-251, zdanie przed drugim kliknięciem w `warning`; przycisk oceny i „Puść w pętlę” (także jako „Puść mimo to”) to zwykłe wspólne przyciski. Każda z tych ról stoi w znaczeniu z tabeli Roles styleguide'u, więc żadna nie wymaga nowej decyzji o roli. Reguła „States of shared controls” mówi dziś, że stan loading dotyczy przycisku, który czeka na odpowiedź serwera; dostaje przycisk oceny, który na czas liczenia oceny jest wyłączony i zmienia napis na „Oceniam…”, choć na serwer nie czeka.

### lines 102-107 (Questions to settle)

- Pytanie 8. Jak brzmią napisy oceny, odznaki, drugiego kliknięcia „Puść w pętlę” i rekordu pętli?
  - Answer: wariant a — przyjmuję propozycję w całości: przycisk „Oceń na 12 ziarnach”, w trakcie liczenia „Oceniam…”; nagłówek „Ocena na 12 ziarnach: {n} z 12 rozwiązanych”; wiersze „Ziarno {i}: rozwiązane”, „Ziarno {i}: mag zamarzł w {m}. minucie”, „Ziarno {i}: mag umarł z głodu w {m}. minucie”, „Ziarno {i}: mag zginął w walce w {m}. minucie”, „Ziarno {i}: bez rozstrzygnięcia po {pułap} minutach”; pod wierszami, szarym tekstem, „Ocena nic nie kosztuje: nie bierze ze skrzynki, nic nie płaci, a śmierć w niej nie zabiera wprawy ani wskrzeszenia.”; przy liście „Program:” „szczelny: 12 z 12” w kolorze powodzenia, a przy niższym wyniku „{n} z 12” zwykłym tekstem; po pierwszym kliknięciu „Puść w pętlę”, gdy któreś ziarno nie jest rozwiązane, nad przyciskiem w kolorze ostrzeżenia „Na {k} z 12 ziaren program mapy nie rozwiązuje.”, a przycisk zmienia napis na „Puść mimo to”; na końcu wiersza postaci w „Gdy cię nie było” „ · najdłużej bez śmierci: {n} przejść z rzędu”, z odmianą „1 przejście”, „3 przejścia”, „5 przejść”. Dopisek „oceniono z zapasem, którego dziś nie ma w skrzynce” był już wybrany w pytaniu 2. Koszt pokazany przy wyborze: słowo „ziarno” gracz zobaczy w grze pierwszy raz tu i nic mu go nie wyjaśnia, dopóki nie zrobi tego samouczek (zadanie 22); cofnięcie później to małe osobne zadanie — napisy staną w kodzie ekranu, w testach i w cytatach wpisów fundamentu. Słabe miejsce pokazane przy wyborze: „12 prób” zrozumiałby każdy gracz bez samouczka, ale „próba” w grze znaczy już ręczne przejście (ostrzeżenie pod „Wejdź”: „Próba weźmie zapas, którego nie ma w skrzynce — pętla zarobkowa go nie dostanie.”).
  - Not chosen:
    - b — przyjmuję z poprawkami, które wskażę: „jeden obieg poprawki przed dalszym krokiem”
    - c — zostawiam napisy agentom, którzy zrobią zadanie: „zobaczysz je dopiero w prośbie o scalenie, a poprawka będzie wtedy poprawką kodu, testów i wpisów fundamentu”
  - Source: human, 2026-11-20, przez pełnomocnika, którego wskazał — wiadomość „doradcy dnia” (sesji doradcy dnia Mariusza), która mówi, że Mariusz o 16:32 przekazał mu dokończenie decyzji tej rundy i że odpowiada w jego imieniu; słowa dla tego zadania: „2: 1a, dopiski ok, 14b, 15b, reszta ok” — „1a” to pytanie pokazane jako 1, czyli to (rozmowa doprecyzowania `.runs/project-refinement/ocena-programu-na-ziarnach.md`, tura 27; pytanie w brzmieniu tury 24).

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 9 — the styleguide gives the roles of the judging on the screen Mapy

- **Goal:** `guidelines/styleguide-browser-view.md` follows the change through the project skill
  `the-way-maintain-styleguide` (read as the file named in *Read*, in its orchestrated mode, asking
  no human): the rule "The screen Mapy", or a new rule beside it, gives the roles of the parts of a
  judging — the heading of the result in `text-strong`, a solved row in `positive`, a row of a death
  in `danger`, an undecided row in `warning`, the sentence under the rows in `text-secondary`, the
  badge „szczelny: 12 z 12” in `positive`, „{n} z 12” in `text`, the note of the stock in `warning`
  as the warning of D-251 stood (task 24 withdrew D-251, so the rule names it as no decision it rests
  on), the sentence before the second click of „Puść w pętlę” in
  `warning`; the button of a judging and „Puść w pętlę”, also as „Puść mimo to”, are plain shared
  buttons — and the rule's *Decision* names the new decisions and the changed ones it rests on. The
  rule "States of shared controls" gives loading also to the button of a judging, disabled with
  „Oceniam…” while it computes, though it waits for no server. Every role stands in its meaning of
  the table Roles, so no decision of a role changes and the table stays; the kitchen-sink page needs
  no new sample, since the plain button's loading state stands there.
- **Change:** `guidelines/styleguide-browser-view.md`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:38-45` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:49-49` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:102-107` Questions to settle ·
  Foundation entries row 1 · Foundation entries row 2 · Foundation entries row 3 · Foundation
  entries row 4 · `.the-way/product-guidelines/styleguide/SKILL.md` ·
  `foundations/decisions.md:4895-4909` D-38 · `foundations/decisions.md:4910-4930` D-39 ·
  `foundations/decisions.md:4931-4947` D-40 · `foundations/decisions.md:4993-5009` D-44 ·
  `foundations/decisions.md:5237-5282` D-274 · `foundations/decisions.md:9819-9837` D-326 ·
  `foundations/part_map.md:3-31` browser-view · `foundations/part_map.md:139-157` agent-workflow
- **Model:** cheaper
- **Risk:** none
- **Checks:** `python -B .the-way/elements/common/foundation_check.py` (the form of the guidelines
  and the decisions their rules name).
- **Depends on:** Foundation entries row 1 · row 2 · row 3 · row 4

## Notes of the orchestrator for this slice

- The styleguide's rules are written through the-way's styleguide method named in your *Read* (`.the-way/product-guidelines/styleguide/SKILL.md`), in its orchestrated mode: you ask no human; where it asks a question of decision, take the smallest reversible reading the task and the settled decisions give, and name it in your report with the way rejected. Read the styleguide file whole before you change it (`guidelines/styleguide-browser-view.md`, about 94 KB).
- D-251 is withdrawn (task 24): the task's words „jak ostrzeżenie D-251" refer to the warning role of the stock note; the rule must name `warning` and rest on no D-251. Find what the styleguide says now about the warning under „Wejdź" for a rehearsal that takes a stock the chest lacks (task 24 rewrote it) and use that wording for the note „oceniono z zapasem, którego dziś nie ma w skrzynce".
- Quote the roles word for word from the task's *To do* 10 (copied above) and write each in the rule's own form; the decisions the rule names are D-439, D-440, D-243, D-329, D-325 (current ranges above). The foundation check (`python -B .the-way/elements/common/foundation_check.py --skip-test-citations`) must show no new error beyond the 7 known D-243 quotations of test files (slices 5, 10, 12).
- No code, no test, no kitchen-sink sample changes in this slice. Test files that quote a sentence of the styleguide (tests under `tests/view/` or `tests/invariants/` may read it): run `grep -rl "styleguide-browser-view" tests` and run the focused tests found (e.g. `tests/invariants/test_browser_view_token_values.py`, `tests/invariants/test_browser_view_framework.py`) after your edit; report their exit codes.

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
