# Handoff — the executor of slice 8, task `ocena-programu-na-ziarnach`

## Delegation

The person who requested this cycle has delegated intermediate choices to the orchestrator; the orchestrator's answers are never that person's approval. Ask the orchestrator, never the human.

## Where and how

- Worktree (work from its root): `.` (branch `task/ocena-programu-na-ziarnach`). The base of this slice is `bae893e2`; your range runs from it. Pinned the-way `19e5774aed6d1d628042e23deccc110ed9f112c0` in the worktree's `.the-way`; scripts run as `.the-way/<path>` from the worktree root. Dependencies are installed (`npm ci` has run); a focused test runs as `npm test -- <file>` from the root.
- Method of your stage: `.the-way/task-cycle/change/SKILL.md` (`make-change`); your variant is **"a slice, or the retry of a slice"**. Read that `SKILL.md` whole, and a file it names only when the step or variant that names it comes.
- Stage and boundary: slice 8 of the plan, and nothing else — the files named in its *Change*. Commit by path (`git add <file> <file>`, never `git add -A`, `git add .` or `git commit -a`); commit messages in English in the repository's style (`type: :emoji: text`, as `git log` shows). Run the focused checks of the slice's *Checks* and the own-work check as the method gives, each with its command and exit code in the report. **No agent of this cycle runs the product's full gate** (`npm test` with no file argument, or the whole `tests/`): it is the orchestrator's or CI's. A full gate is never needed for your work.
- Frozen task: `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`; the passages your slice's *Read* names are copied below. You read the rest of the task only if a passage points you to it. Plan: the section of your slice is copied below word for word; you do not open `plan.md`.
- Answers of step 4: trust boundary **yes** — `src/browser/sim/saved-game.ts` takes in a saved game from the server; a slice that touches it is reviewed against crafted input; irreversible operation **no**.
- Your directory for working copies: `.runs/executor-8/` (directly under the ignored `.runs/` of the worktree). Your report path (the input of the cycle's scripts; its name begins with the role): `.runs/task-cycles/ocena-programu-na-ziarnach/reports/slice-08-executor-report.md`.
- `cycle.md` and the other files of the record directory — other agents' handoffs, reports and findings — are not yours to read unless this handoff names them. It names the frozen task and your report path.
- The foundation step has written the entries of the plan (commit `a65b8fa4`, on this branch): the decisions D-439 and D-440 are new, D-243, D-329, D-325, D-241, D-246 and D-22 are changed and D-190's rationale is corrected. D-251 is **withdrawn** (task 24): do not cite it as a decision you rest on.
- The seven quotations `decision: D-243` of the old first sentence of D-243 (in `tests/sim/loop.test.mjs:237` and `:304`, `tests/view/maps-screen.test.mjs:494` and `:700`, `tests/view/account-screen.test.mjs:2683`, `:2807` and `:2975`) no longer stand in D-243; the slice that changes the file shortens its quotation to a passage that stands in D-243 now (slice 5: loop.test.mjs; slice 10: maps-screen.test.mjs; slice 12: account-screen.test.mjs). Where your slice does not change the file, leave it.

## Working copies (first paragraph of "Working copies" of the cycle's skill, word for word)

An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## Class of model

Your class is `cheaper`. Report in the report where the class proved too weak, if it did.

## Current ranges of what your *Read* names (the foundation moved by the foundation step; where these differ from the plan's, these hold)

- `foundations/decisions.md:889-903` D-437 (plan: 889-903)
- `foundations/decisions.md:11763-11777` D-427 (plan: 11664-11678)
- `foundations/decisions.md:11778-11794` D-428 (plan: 11679-11695)
- `foundations/decisions.md:290-315` D-18 (plan: 290-315)
- `foundations/invariants.md:1438-1447` instrument-game-agreement
- `foundations/invariants.md:1458-1467` balance-instrument-repeatability
- `foundations/part_map.md:127-137` balance-tools
- `guidelines/coding.md`
- `guidelines/coding-balance-instrument.md`
- `guidelines/testing.md`
- `balance/trace.mjs`
- `balance/campaign.mjs:1-140`
- `src/browser/sim/data/balance.ts`
- `tests/balance/agreement.test.mjs`
- `tests/balance/cli.test.mjs:100-140`

## Passages of the frozen task that your *Read* names (word for word; address `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md`)

### lines 50-50 (To do)

11. Przyrząd balansu bierze domyślny pułap minut przejścia ze zbudowanej gry, z danych, do których pułap wnosi *To do* 1, zamiast własnej liczby 4000. Liczba stoi w przyrządzie w jednym miejscu, w `balance/engine.mjs`: „/** A map run still open after this many game minutes ends as a run at the cap. */ export const DEFAULT_CAP_MINUTES = 4000;”, a `balance/trace.mjs` i `balance/campaign.mjs` importują ją stamtąd; zmiana stoi w tym pliku, a te dwa pliki dalej biorą pułap z jednego miejsca. Plik należy do rodzaju kodu `balance-instrument` i jest jego wzorcem (D-437); obowiązują go wytyczne `guidelines/coding-balance-instrument.md`, w tym reguły „Liczba gry” („Przyrząd nie trzyma własnej kopii liczby gry, tylko bierze ją ze zbudowanej gry.”) i „Jedno miejsce wspólnej rzeczy” (pytanie 16). Wynika to z odpowiedzi na pytanie 5 i z reguły zadania 23, że przyrząd nie trzyma własnej kopii liczby gry (zob. *Context*).

### lines 125-127 (Questions to settle)

- Pytanie 16. Jaki rodzaj kodu i jaki plik-wzorzec obowiązują plik przyrządu balansu w `balance/`, który to zadanie zmienia w *To do* 11, i w którym pliku stoi pułap 4000 po zadaniu 23? Testów w `tests/balance/` pytanie nie dotyczy: zasady testów stoją w `guidelines/testing.md`, które obejmuje część `balance-tools`.
  - Answer: rodzaj `balance-instrument`, wytyczne `guidelines/coding-balance-instrument.md`, wzorzec `balance/engine.mjs` (D-437); pułap stoi po zadaniu 23 tylko w `balance/engine.mjs`, jako eksportowana stała `DEFAULT_CAP_MINUTES`, z której biorą go `balance/trace.mjs` i `balance/campaign.mjs`, więc *To do* 11 zmienia `balance/engine.mjs`. Pytanie nie było wyborem człowieka, więc nie ma wariantów niewybranych.
  - Source: zadanie 23 planu, scalone 2026-11-20 (PR #164, commit scalenia `fec2ae7e` na `origin/main`), cytaty z tego commitu: `guidelines/coding.md`, „Kinds of code”: „| balance-instrument | `guidelines/coding-balance-instrument.md` | Przed dodaniem lub zmianą pliku kodu przyrządu balansu w `balance/`. |”; `guidelines/coding-balance-instrument.md`, „Files of this kind”: „| `balance/engine.mjs` | exemplar | D-437 |”; D-437: „The exemplar for kind `balance-instrument` is `balance/engine.mjs`, and its kind guidelines are read before adding or changing a file of that kind”. Fakt z kodu, osobno: `balance/engine.mjs:31` — `export const DEFAULT_CAP_MINUTES = 4000;`; `balance/trace.mjs:14` i `balance/campaign.mjs:56` importują `DEFAULT_CAP_MINUTES`; innego wystąpienia 4000 w `balance/` nie ma.

### lines 147-149 (Context)

- Przyrząd balansu kończy przejście jako `solved`, `death` albo `cap`, z przyczyną i minutą, a przejście, które po 4000 minut gry trwa dalej, kończy jako `cap` (`balance/engine.mjs`, `runOnce` i `DEFAULT_CAP_MINUTES`); przyrząd puszcza zbudowaną symulację gry, a niezmiennik `instrument-game-agreement` trzyma zgodność jego przejścia z przejściem gry.
- Pułap a przyrząd: zadanie 23 (wzorzec kodu przyrządu) przyjęło regułę, że przyrząd nie trzyma własnej kopii liczby gry (tamto pytanie 2, wariant a), i usunęło powtórzenia liczb między plikami przyrządu, w tym 4000 z trzech plików (tamto pytanie 3, wariant c) — Mariusz, 2026-11-20, „ok dla wszystkich dotychczas” (`.runs/project-refinement/wzorzec-kodu-przyrzadu.md`, tura 10; dokument `a note in the author's private notes`). Zadanie 23 jest scalone (PR #164, `fec2ae7e`): reguła stoi w `guidelines/coding-balance-instrument.md` jako „Liczba gry”, a 4000 tylko w `balance/engine.mjs`. Gdy to zadanie wnosi pułap do danych gry, 4000 w przyrządzie staje się kopią liczby gry, stąd *To do* 11.
- Ziarna 1–12 w danych gry: przyrząd balansu odtwarza wtedy ocenę z gry poleceniem `sweep` z `--seeds 1-12`, a symulacja nie potrzebuje drugiego miejsca, które wyprowadza ziarna z generatora (niezmiennik `simulation-randomness`).

## Your slice of the plan (word for word; the paths of its *Read* are those of the plan, the current ranges are above)

### Slice 8 — the balance instrument takes its default cap from the built game

- **Goal:** `DEFAULT_CAP_MINUTES` of `balance/engine.mjs` is the cap of a judging that Slice 3 put
  into the game's data, read from the built game (`dist/browser/sim/data/balance.js`), in place of the
  instrument's own 4000 (`guidelines/coding-balance-instrument.md`, "Liczba gry" and "Jedno
  miejsce wspólnej rzeczy"); `balance/trace.mjs` and `balance/campaign.mjs` go on importing it from
  the engine, unchanged. The file's opening comment stays true. The instrument's tests pass as they
  are; a test of `tests/balance/engine.test.mjs` that the change makes untrue follows only with its
  reason (`guidelines/testing.md`, "Changing an existing test").
- **Change:** `balance/engine.mjs` · `tests/balance/engine.test.mjs`
- **Read:** `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:50-50` To do ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:125-127` Questions to settle ·
  `.runs/task-cycles/ocena-programu-na-ziarnach/task-frozen.md:147-149` Context ·
  `foundations/decisions.md:889-903` D-437 · `foundations/decisions.md:11664-11678` D-427 ·
  `foundations/decisions.md:11679-11695` D-428 · `foundations/decisions.md:290-315` D-18 ·
  `foundations/invariants.md:1438-1447` instrument-game-agreement ·
  `foundations/invariants.md:1458-1467` balance-instrument-repeatability ·
  `foundations/part_map.md:127-137` balance-tools · `guidelines/coding.md` ·
  `guidelines/coding-balance-instrument.md` · `guidelines/testing.md` · `balance/trace.mjs` ·
  `balance/campaign.mjs:1-140` · `src/browser/sim/data/balance.ts` ·
  `tests/balance/agreement.test.mjs` · `tests/balance/cli.test.mjs:100-140`
- **Model:** cheaper
- **Risk:** none
- **Checks:** `npm test -- tests/balance/engine.test.mjs` · `npm test -- tests/balance/agreement.test.mjs`
  · `npm test -- tests/balance/trace.test.mjs` · `npm test -- tests/balance/campaign.test.mjs` ·
  `npm test -- tests/balance/cli.test.mjs` ·
  `npm test -- tests/invariants/test_balance_instrument_repeatability.py` ·
  `npm test -- tests/invariants/test_cross_part_imports.py`
- **Depends on:** Slice 3

## Notes of the orchestrator for this slice

- Slice 3 is made: the cap is `BALANCE.judgingCapMinutes` (4000) in `src/browser/sim/data/balance.ts`, exported from the built game as `dist/browser/sim/data/balance.js` after the build (`npm run build` or what the instrument's tests use; read how `balance/engine.mjs` imports other numbers of the built game, e.g. its other game-data imports, and follow that way). The instrument must not keep its own 4000. `DEFAULT_CAP_MINUTES` stays an exported name of `balance/engine.mjs` (trace.mjs and campaign.mjs import it) but its value comes from the game's data.
- Another executor's review runs in a separate worktree of an earlier commit; you are the only writer in this worktree. `guidelines/coding-balance-instrument.md` is binding: read it whole before you change the file.
- A new test or a changed test file under `tests/balance/` needs no `stryker.config.json` entry unless `tests/quality/test_mutation_test_selection.py` says so; run that check if you add a test file.

## Report

Write the report as `make-change` gives it, with the own-work check (the weakest point of your slice against its requirement, the check and its result), each check with its command and exit code, the commits, every reach beyond your handoff, **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (or `none`), the remainders of your working copies (or that none remain). Return your status, your commits, a one-line check result naming what failed or did not run, and the report's path.
