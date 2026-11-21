# Handoff — the executor of slice 13, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `21499c5d`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 13 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-13/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-13-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- Quotations of decisions in tests: every comment line `// decision: D-n "…"` of a test you write or change must quote, word for word and from the beginning of a sentence, text that stands in a binding sentence of that decision as it stands now (`foundations/decisions.md`; a quotation is no paraphrase). Run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` after your change and your files must show no error; errors in files you did not change are not yours (known: the D-243 quotations named below, until their slices). Slices 3 and 4 shipped such errors; do not repeat it.
- The foundation step has written the entries of the plan (commit `a65b8fa4`, on this branch): the decisions D-439 and D-440 are new, D-243, D-329, D-325, D-241, D-246 and D-22 are changed and D-190's rationale is corrected. D-251 is **withdrawn** (task 24): do not cite it as a decision you rest on.
- The seven quotations `decision: D-243` of the old first sentence of D-243 (in `tests/sim/loop.test.mjs:237` and `:304`, `tests/view/maps-screen.test.mjs:494` and `:700`, `tests/view/account-screen.test.mjs:2683`, `:2807` and `:2975`) no longer stand in D-243; the slice that changes the file shortens its quotation to a passage that stands in D-243 now (slice 5: loop.test.mjs; slice 10: maps-screen.test.mjs; slice 12: account-screen.test.mjs). Where your slice does not change the file, leave it.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `same`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- `foundations/decisions.md:8899-8991` D-246 (the plan's *Foundation entries* row 7, as the foundation step wrote it)
- `foundations/glossary.md:314-319` term loop record (row 11)
- `foundations/decisions.md:8899-8991` D-246 (plan: 8829-8904)
- `foundations/decisions.md:8661-8719` D-241 (plan: 8651-8689)
- `foundations/part_map.md:3-31` browser-view
- `guidelines/coding.md`
- `guidelines/coding-browser-module.md`
- `guidelines/styleguide-browser-view.md`
- `guidelines/testing.md`
- `src/browser/AGENTS.md`
- `src/browser/view/counted-name.ts`
- `src/browser/view/headquarters.tsx`
- `src/browser/sim/types.ts`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 37-37 (To do)

7. Rekord pętli: stan pętli zarobkowej liczy od jej startu ciąg kolejnych domkniętych przejść bez śmierci i najdłuższy taki ciąg. Śmierć pokryta wskrzeszeniem zaczyna ciąg od nowa, tak samo jak śmierć postaci bez wprawy, po której pętla też trwa (D-190), a zatrzymanie pętli kończy liczenie; liczba znika razem z pętlą. Wiersz postaci w raporcie „Gdy cię nie było” dostaje na końcu najdłuższy ciąg zwykłym tekstem, bez wyróżnienia i bez porównania z czymkolwiek (pytanie 7). Liczbę wiersz czyta z pętli przy każdym rysowaniu sekcji, jak wprawę do odebrania (D-246); przy zerze jej nie ma, a wiersz pętli zatrzymanej śmiercią jej nie niesie.

### lines 45-45 (To do)

   - na końcu wiersza postaci w „Gdy cię nie było”: „ · najdłużej bez śmierci: {n} przejść z rzędu”, z odmianą „1 przejście”, „3 przejścia”, „5 przejść”.

### lines 95-101 (Questions to settle)

- Pytanie 7. Co liczy „rekord pętli” i jak stoi w raporcie „Gdy cię nie było”?
  - Answer: wariant a — ciąg w obrębie jednej pętli: najdłuższy ciąg kolejnych domkniętych przejść bez śmierci od startu tej pętli. Śmierć pokryta wskrzeszeniem zaczyna ciąg od nowa, a zatrzymanie pętli kończy liczenie. Wiersz postaci w raporcie dostaje na końcu tę liczbę zwykłym tekstem, bez wyróżnienia i bez porównania z czymkolwiek. Zmienia D-241 (stan pętli dostaje dwa liczniki) i D-246 (wiersz raportu). Koszt pokazany przy wyborze: zmiana kształtu zapisu, która przy odpowiedzi na pytanie 2 i tak następuje; liczba znika razem z pętlą; dwa liczniki i ich testy dla liczby, która z założenia nie jest celem.
  - Not chosen:
    - b — bez nowego stanu, liczba domkniętych przejść pętli: „dopóki żadnej śmierci nie pokryło wskrzeszenie, to ta sama liczba co w a; po takiej śmierci liczba rośnie dalej i przestaje być ciągiem bez śmierci, a dopisek „wskrzeszenie zużyte” znika z raportu po jego zamknięciu”
    - c — rekord trwały, najlepszy ciąg postaci na mapie: „więcej stanu i liczba do pobijania, która rośnie od samego czekania — przed tym ostrzega przytoczona krytyka”
    - d — rekord wspólny dla konta, na mapę: „Koszt jak c, a do tego miesza postacie o różnych wykupionych stopniach.”
  - Source: human, 2026-11-20 — przy pytaniu pokazanym jako 10: „do pozostałych nie mam uwag”, a na prośbę o potwierdzenie, że to przyjęcie rekomendacji (wśród nich „10 a”): „3. dobrze zrozumiałeś” (rozmowa doprecyzowania, tury 13 i 14; pytanie w brzmieniu tury 10).

### lines 231-231 (Settlements to record)

| 9 | Wiersz postaci w raporcie „Gdy cię nie było” kończy się najdłuższym ciągiem bez śmierci tej pętli, zwykłym tekstem, bez wyróżnienia i bez porównania: „ · najdłużej bez śmierci: {n} przejść z rzędu”, z odmianą „1 przejście”, „3 przejścia”, „5 przejść”. | sentence of D-246 | Pytanie 7; Pytanie 8 (wybory Mariusza) | czy rekord stoi w raporcie jako cel, z wyróżnieniem albo porównaniem z poprzednim, i jak brzmi |

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 13 — the loop record in the report „Gdy cię nie było”

- **Goal:** the line of a character in the report „Gdy cię nie było” whose earning loop went on ends
  with „ · najdłużej bez śmierci: {n} przejść z rzędu” in plain text, in the line's own role, with no
  mark and no comparison, the noun declined by `countedName` („1 przejście”, „3 przejścia”, „5
  przejść”); {n} is the longest run of the character's earning loop (Slice 5), read from the earning
  loop whenever the section is drawn, as the practice waiting is (D-246); at 0, on a line an earning
  loop a death stopped holds, and where the character has no earning loop, the line has none. The
  failing tests come first, in `tests/view/away-report.test.mjs`; a line `decision:` quoting a
  passage of D-246 the Foundation entries changed follows the new passage.
- **Change:** `src/browser/view/away-report.ts` · `tests/view/away-report.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:37-37` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:45-45` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:95-101` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:231-231` Settlements to record ·
  Foundation entries row 7 · Foundation entries row 11 · `foundations/decisions.md:8829-8904` D-246
  · `foundations/decisions.md:8651-8689` D-241 · `foundations/part_map.md:3-31` browser-view ·
  `guidelines/coding.md` · `guidelines/coding-browser-module.md` ·
  `guidelines/styleguide-browser-view.md` · `guidelines/testing.md` · `src/browser/AGENTS.md` ·
  `src/browser/view/counted-name.ts` · `src/browser/view/headquarters.tsx` ·
  `src/browser/sim/types.ts`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/view/away-report.test.mjs` (its new cases written first, failing) ·
  `npm test -- tests/view/headquarters-screen.test.mjs` · `npm test -- tests/view/counted-name.test.mjs`
- **Depends on:** Slice 5 · Foundation entries row 7

## Notes of the orchestrator for this slice

- Slice 5 is made: `EarningLoop` in `src/browser/sim/types.ts` holds the run of completed map runs without a death and the longest such run (read the field names there); the away report's line takes the longest run from the earning loop whenever the section is drawn, as the practice waiting is (D-246). At 0, on a line whose earning loop a death stopped, and where the character has no earning loop, the line has no such ending.
- The text is „ · najdłużej bez śmierci: {n} przejść z rzędu” with the noun declined by `countedName` („1 przejście”, „3 przejścia”, „5 przejść”) — check the declension's three forms against `countedName` and the task's *Settlements to record* row 9 text exactly; plain text, no mark and no comparison, in the line's own role.
- Quote every new `// decision:` line word for word from the beginning of a sentence of a binding sentence of the decision (the foundation check stops at the first field line of an entry) and run `python -B .the-way/elements/common/foundation_check.py --skip-test-citations` (exit 0 is expected now, all seven old D-243 errors being repaired by slices 5, 10, 12; your files show no error).
- Write the failing cases first in `tests/view/away-report.test.mjs` and show them red.
- Screenshots as in slices 10 and 11 (inspect, push none, keep none, say so); the report line is on Siedziba („Gdy cię nie było”).

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
