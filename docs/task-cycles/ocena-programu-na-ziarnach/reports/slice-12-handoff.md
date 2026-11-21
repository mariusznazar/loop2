# Handoff — the executor of slice 12, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `0095c910`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 12 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-12/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-12-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- Quotations of decisions in tests: every comment line `// decision: D-n "…"` of a test you write or change must quote, word for word and from the beginning of a sentence, text that stands in a binding sentence of that decision as it stands now (`foundations/decisions.md`; a quotation is no paraphrase). Run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after your change and your files must show no error; errors in files you did not change are not yours (known: the D-243 quotations named below, until their slices). Slices 3 and 4 shipped such errors; do not repeat it.
- The foundation step has written the entries of the plan (commit `a65b8fa4`, on this branch): the decisions D-439 and D-440 are new, D-243, D-329, D-325, D-241, D-246 and D-22 are changed and D-190's rationale is corrected. D-251 is **withdrawn** (task 24): do not cite it as a decision you rest on.
- The seven quotations `decision: D-243` of the old first sentence of D-243 (in `tests/sim/loop.test.mjs:237` and `:304`, `tests/view/maps-screen.test.mjs:494` and `:700`, `tests/view/account-screen.test.mjs:2683`, `:2807` and `:2975`) no longer stand in D-243; the slice that changes the file shortens its quotation to a passage that stands in D-243 now (slice 5: loop.test.mjs; slice 10: maps-screen.test.mjs; slice 12: account-screen.test.mjs). Where your slice does not change the file, leave it.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- `foundations/decisions.md:8771-8838` D-243 (the plan's *Foundation entries* row 3, as the foundation step wrote it)
- `foundations/decisions.md:9975-10004` D-329 (the plan's *Foundation entries* row 4, as the foundation step wrote it)
- `foundations/decisions.md:8771-8838` D-243 (plan: 8741-8768)
- `foundations/decisions.md:3934-4013` D-207 (plan: 3934-4013)
- `guidelines/coding.md`
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 34-35 (To do)

4. W części „Kto idzie” karty mapy, przy każdej postaci, stoi przycisk oceny — na każdej mapie, na którą gracz może wejść, także nierozwiązanej, gdzie stoi obok „Wejdź”. Ocenia program z listy „Program:” tej postaci na mapie tej karty. Wynik rozwija się pod tą postacią i stoi, dopóki gracz nie wybierze innego programu, nie oceni ponownie albo nie wyjdzie z karty. Ocenić można też program postaci, która jest w pętli albo której przejście ręczne trwa, bo ocena niczego w nich nie rusza (pytania 1 i 3). Wyjście z karty to wybór innej mapy z listy, przejście na inny ekran albo przeładowanie strony; przyczyna i minuta wierszy żyją tylko w widoku, nie w zapisie. Ocena nie jest wysłaniem postaci: nie zmienia programu „użytego ostatnio” i nie czyści wyboru na liście „Program:” (D-170, D-243). Ocena idzie przez magazyn stanu gry, który przed nią dolicza czas (D-409), a dwanaście przejść liczy jedno wywołanie symulacji. Przycisk oceny od kliknięcia do wyniku jest wyłączony i ma napis „Oceniam…” (pytanie 8), więc ekran rysuje ten stan, zanim to wywołanie ruszy; „Puść w pętlę” na czas swojej oceny napisu nie zmienia.
5. „Puść w pętlę” zawsze najpierw ocenia program od nowa, z tym, co pętla dostanie ze skrzynki w tej chwili. Gdy wszystkie dwanaście ziaren jest rozwiązanych, pętla rusza od razu. Gdy któreś nie jest, wynik staje pod postacią, nad przyciskiem staje zdanie o liczbie ziaren nierozwiązanych, przycisk zmienia napis na „Puść mimo to”, a pętlę puszcza dopiero drugie kliknięcie. Nowa ocena zastępuje zapamiętaną (pytanie 1). Gdy pod postacią stoi już wynik z porażką, pokazany wcześniej osobnym przyciskiem oceny, „Puść w pętlę” też ocenia od nowa: gdy nowy wynik jest taki sam jak ten, który stoi — każde z dwunastu ziaren z tym samym wierszem — pętla rusza od razu; gdy jest inny, bo od tamtej oceny zmieniła się skrzynka albo postać, nowy wynik zastępuje stary i czeka na drugie kliknięcie (pytanie 14).

### lines 227-228 (Settlements to record)

| 5 | „Puść w pętlę” najpierw ocenia program od nowa z tym, co pętla dostanie ze skrzynki; przy dwunastu rozwiązanych ziarnach pętla rusza od razu, a gdy któreś nie jest rozwiązane, wynik staje pod postacią, nad przyciskiem staje w `warning` „Na {k} z 12 ziaren program mapy nie rozwiązuje.”, przycisk zmienia napis na „Puść mimo to”, a pętlę puszcza drugie kliknięcie; gdy pod postacią stoi już ten sam wynik z osobnego przycisku oceny, pętla rusza od razu. | sentence of D-243 | Pytanie 1; Pytanie 14; Pytanie 8 (wybory Mariusza) | czy przycisk działa od razu z ostrzeżeniem, czy jest nieaktywny bez oceny, czy po ocenie osobnym przyciskiem gracz klika dwa razy, i jak brzmi przestroga |
| 6 | Przy każdej postaci w „Kto idzie” stoi przycisk „Oceń na 12 ziarnach” („Oceniam…” w trakcie liczenia), pod postacią rozwija się wynik — nagłówek „Ocena na 12 ziarnach: {n} z 12 rozwiązanych”, dwanaście wierszy „Ziarno {i}: …” i zdanie „Ocena nic nie kosztuje: nie bierze ze skrzynki, nic nie płaci, a śmierć w niej nie zabiera wprawy ani wskrzeszenia.” — i stoi do zmiany programu, ponownej oceny albo wyjścia z karty, a przy liście „Program:” stoi odznaka albo „{n} z 12”. | sentence of D-329 | Pytanie 1; Pytanie 2; Pytanie 8 (wybory Mariusza) | gdzie na karcie stoi przycisk, wynik i odznaka, jak długo wynik zostaje na ekranie i jak brzmią jego napisy |

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 12 — the page tests of the account screen follow the judging

- **Goal:** the cases of `tests/view/account-screen.test.mjs` that click „Puść w pętlę” or count the
  controls of a character in „Kto idzie” follow the button of a judging (Slice 10) and the judging
  first of „Puść w pętlę” (Slice 11): a case that expects the earning loop to start at once gives the
  character a program that solves all twelve seeds of the map, or clicks „Puść mimo to”, whichever
  keeps what the case checks, with the change of D-243 as the reason (`guidelines/testing.md`,
  "Changing an existing test"); the saves a case expects follow the save that a judging, a change of
  the game state, makes (D-207); a line `decision:` quoting a passage of D-243, D-329 or D-325 that
  the Foundation entries changed follows the new passage. Nothing else of the file changes. The file
  is about 350 KB: find its cases by search ("Puść w pętlę", "Kto idzie", `whoOf`, `solvedAla`)
  rather than reading it whole.
- **Change:** `tests/view/account-screen.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:34-35` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:227-228` Settlements to record ·
  Foundation entries row 3 · Foundation entries row 4 · `foundations/decisions.md:8741-8768` D-243
  · `foundations/decisions.md:3934-4013` D-207 · `guidelines/coding.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md`
- **Model:** same — the cases stand in a file of 350 KB that the agent reaches by search, and each
  change of an existing case needs its reason.
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` ·
  `python -B .the-way/elements/common/foundation_check.py` (the quotations of the tests)
- **Depends on:** Slice 11

## Notes of the orchestrator for this slice

- Slices 10 and 11 are made: the button of a judging beside „Wejdź" and the judging-first „Puść w pętlę" (with „Puść mimo to") in `src/browser/view/maps-screen.tsx`; read what they changed in `tests/view/maps-screen.test.mjs` to follow the same way in `tests/view/account-screen.test.mjs`. In the browser, a click of „Puść w pętlę" on a program that does not solve the map now judges first and waits for a second click („Puść mimo to"); the cases of the account screen that expect the loop to start at once give the character a program that solves all twelve seeds of that map (or click „Puść mimo to"), whichever keeps what the case checks.
- The file is about 350 KB: do NOT read it whole. Find the cases by search (`Puść w pętlę`, `Kto idzie`, `whoOf`, `solvedAla`, `decision: D-243`, `decision: D-329`, `decision: D-325`) and read ranges. The three quotations `decision: D-243` at lines 2683, 2807 and 2975 no longer stand in D-243: shorten each to a passage that stands now without changing the case; every other `// decision:` line you add or change quotes word for word from the beginning of a sentence of a binding sentence (the foundation check stops at the first field line of an entry). After your change `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` must exit 0 — it is the last of the seven known errors.
- The saves a case expects follow what a judging does to the game state (D-207: a judging is a change of the game state, so the game saves after it); a case that counts saves after a click of the button of a judging or of „Puść w pętlę" follows.
- Run `npm test -- tests/view/account-screen.test.mjs` before you begin (to see which cases already fail — they are the ones to follow) and after; report both with exit codes.

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
