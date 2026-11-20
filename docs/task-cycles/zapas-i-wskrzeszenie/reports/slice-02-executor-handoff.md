# Handoff - executor of slice(s) 2 of the task `zapas-i-wskrzeszenie`

The person who requested the cycle has delegated intermediate choices to the orchestrator; no answer you get is that person's approval. Your reply goes to the orchestrator only.

## Where and what

- Worktree (work from its root, never from the main checkout): `the root of the task's worktree`, branch `task/zapas-i-wskrzeszenie`. The pinned the-way stands in `.the-way` there. Dependencies are installed (`npm ci` ran).
- Your method: `.the-way/task-cycle/change/SKILL.md` by its path in the worktree's `.the-way`; read it whole, and a file it names only when the step or variant that names it comes. Do not call a skill. Your variant: "a slice, or the retry of a slice".
- Your stage and its boundary: Make the slice below, commit it by path (`git add <file> ...`, never `git add -A`; commit messages in English, like the commits of the repository, with its `type: :emoji:` form), run the focused checks of its *Checks* and return. Make no other slice and no change outside the slice's *Change*, and run **no full gate** (`npm test` without a file): the gate is the orchestrator's or CI's.
- Base of your slice: `f30dffb7`.
- Frozen task: `.runs/task-cycles/zapas-i-wskrzeszenie/task.md` (the passages your section needs are copied below; read the rest of it only if a passage sends you to it). Plan: `.runs/task-cycles/zapas-i-wskrzeszenie/plan.md` (its other slices are not yours). Spec: none.
- Answers of step 4 of the cycle: trust boundary - **yes** (`src/browser/sim/saved-game.ts`: the saved shape of the team's resurrection and the load's checks; check crafted input there: counts above the data's, negative or non-finite numbers, a moment standing with no use spent or missing with some spent, wrong types); irreversible operation - **no**. No open design choice; no reserved choice. The pin of the-way is not moved.
- Your directory for working copies: `.runs/slice-02-executor/` (directly under the ignored `.runs/` of the worktree).
- Your report: `.runs/task-cycles/zapas-i-wskrzeszenie/reports/slice-02-executor-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it), the case the harness's note about files named `report...` leaves open. Where you are refused the write all the same, return the report whole as your answer. Its first line is yours as your method gives it; it holds besides what your method gives **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
- `cycle.md` and the other files of the cycle's record directory - other agents' handoffs, reports and findings - are not yours to read unless this handoff names them.
- Other tools of the cycle: the product's guidelines say tests run as `npm test -- <one test file>`; never run `npm test` bare.

Working copies - copied word for word from the cycle:

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## The slice (copied word for word from the plan)

### Slice 2 — The load admits what a completed run of a solved map brought out

- **Goal:** `loadSavedGame` admits a document whose manual map run of a solved map (the mark
  `solvedMapRun`) has completed with a deposit, by the same rule as any other completion — entries
  of the frozen bring plan in its order, each at most its planned count — so that the load admits
  every game state the game makes once Slice 3 lets such a run bring items out (D-386); it refuses
  everything else it refuses today. `SAVED_GAME_VERSION` stays 7: the shape does not change here,
  and Slice 6 raises it once for the whole change. The case of `tests/sim/saved-game.test.mjs`
  that refuses such a deposit today changes, with its reason (Foundation entries row D-189,
  invariant `solved-map-manual-run`), and the comments of `saved-game.ts` on the marked run say what
  holds now.
- **Change:** `src/browser/sim/saved-game.ts` · `tests/sim/saved-game.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-saved-game.md` ·
  `src/browser/sim/types.ts` · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:27-30` To do (items
  1, 2) · `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:39-44` Questions to settle (question 1) ·
  Foundation entries row D-189 · row D-214 · row solved-map-manual-run · row trip-run-end ·
  `foundations/decisions.md:4231-4245` D-386 · `foundations/decisions.md:3888-3932` D-206 ·
  `foundations/invariants.md:1048-1057` save-version · `foundations/invariants.md:214-235`
  simulation-isolation · simulation-inputs · `foundations/part_map.md:33-64` simulation
- **Model:** cheaper
- **Risk:** trust boundary — `src/browser/sim/saved-game.ts`, the load's check of a deposit on a
  completed run of a solved map
- **Checks:** first a case of `tests/sim/saved-game.test.mjs` that loads a completed run of a
  solved map holding a deposit from its bring plan and fails on the base; then
  `npm test -- tests/sim/saved-game.test.mjs`.
- **Depends on:** Slice 1

## The plan's table of foundation entries (copied; 'Foundation entries row X' in the slice means this table's row X)

## Foundation entries

| Entry | Kind | From | What depends on it |
|---|---|---|---|
| (new) — May the progression require the player's absence? | decision, new | projected entry of the definition carried by the task ("Decisions in play", "Zadanie zapisuje"); To do 7; plan item `zapas-i-wskrzeszenie` | written by Slice 1; Slices 3, 4 realize it; D-189 and D-190 derive from it |
| D-189 — What pays, and what takes from the chest? | decision, changed | Settlements row 1; To do 1, 2, 7 | written by Slice 1; Slices 2, 3, 15, 16, 18 |
| D-179 — How do items go into a map run and out of it? | decision, changed | "Decisions in play" (D-179); To do 1 | written by Slice 1; Slice 3 |
| D-214 — When is a map run a manual run of a solved map? | decision, changed | Settlements row 1; To do 1 | written by Slice 1; Slices 2, 3, 8 |
| D-190 — What does a character's death take? | decision, changed | Settlements rows 2, 3, 4; To do 3 | written by Slice 1; Slices 5, 6, 7, 8, 9, 13 |
| D-220 — What generation number and resurrection does a new character have? | decision, changed | Settlements row 5; To do 3 | written by Slice 1; Slices 6, 8 |
| D-240 — When and how is the time away computed? | decision, changed | "Decisions in play" (D-240); To do 3 | written by Slice 1; Slices 9, 18 |
| D-242 — Which clock drives an earning loop? | decision, changed | "Decisions in play" (D-242); To do 3 | written by Slice 1; Slices 9, 13 |
| D-428 — What does the map check of the balance instrument print? (*Verification*) | decision, changed | Settlements row 10; To do 5 | written by Slice 1; Slice 10 |
| `solved-map-manual-run` | invariant, changed; its check: the cases of `tests/sim/trip.test.mjs` and `tests/sim/saved-game.test.mjs` that cite it | "Decisions in play"; To do 1, 2 | written by Slice 1; Slices 2, 3 |
| `trip-transfer` | invariant, changed; its check: the cases of `tests/sim/trip.test.mjs`, `tests/sim/catch-up.test.mjs` and `tests/sim/loop.test.mjs` that cite it | "Decisions in play"; To do 1 | written by Slice 1; Slices 3, 9 |
| `trip-run-end` | invariant, changed; its check: the cases of the same three files that cite it | "Decisions in play"; To do 2 | written by Slice 1; Slices 3, 9 |
| `resurrection-renewal` | invariant, changed; its check: the cases of `tests/sim/team.test.mjs`, `death.test.mjs`, `completion.test.mjs`, `catch-up.test.mjs`, `loop.test.mjs` and of `tests/view/team-lines.test.mjs`, `character-screen.test.mjs`, `clock.test.mjs` that cite it | Settlements rows 3, 4; To do 3 | written by Slice 1; Slices 6, 8, 9, 12, 13 |
| `resurrection` | glossary term, changed | Settlements row 9 | written by Slice 1; Slices 6, 12, 14 |
| D-215 — Where does the player read that a manual run of a solved map pays and takes nothing? | decision, changed | Settlements row 8; To do 4 | written by Slice 11; Slice 17 |
| D-216 — Where does the player read what a death took and what a completion renewed? | decision, changed | Settlements row 7; To do 4 | written by Slice 11; Slices 14, 15 |
| D-217 — What does the game show of a character's resurrection? | decision, changed | Settlements row 6; To do 4 | written by Slice 11; Slices 12, 15, 18 |
| D-329 — What stands at each character in the section „Kto idzie”? (*Verification*, rationale) | decision, changed | "Decisions in play" (D-329); To do 4, 7 | written by Slice 11; Slice 15 |
| D-251 — How does the card of a map mark a rehearsal the earning loop cannot repeat? | decision, withdrawn, no successor | To do 7 | withdrawn by Slice 11; its references rewritten by Slices 1 (D-189), 11 (D-329), 15, 16, 18 |

## Reading note added by the orchestrator at the plan's review

Every slice that changes a test file reads, besides its *Read*, each decision its altered cases quote by a `decision:` line and each invariant they cite by an `invariant:` line, where that entry is not already named in its *Read*: find them by searching the file, write the index with `python -B .the-way/elements/common/decision_index.py --output <working directory>/index.md --decision N` and open whole those whose sentence the case holds (step 2 of 'Reading the foundation'). Slices 8, 9, 12 and 14 in particular, whose files quote many unchanged decisions. A slice that edits a file larger than it can read edits it by searching and reading ranges, not whole.

## Passages of the frozen task named in the slice's *Read* (copied word for word, line numbers of `task.md`)

### task.md lines 27-30

### To do

1. Ręczne przejście mapy już rozwiązanej bierze zapas ze skrzynki jak każde inne wejście na mapę: listę „Zabierz” programu przyciętą tym, co leży w skrzynce, udźwigiem postaci i pułapem wejścia mapy, zdjętą ze skrzynki przy starcie przejścia, także przy „Restart”.
2. Przy domknięciu takie przejście wynosi do skrzynki to, co nazywa zamrożona lista „Wynieś”, przycięte jak przy każdym innym domknięciu, a wprawy dalej nie płaci; okno końca pokazuje po takim domknięciu wiersz D-185 z tym, co trafiło do skrzynki, jak po każdym domknięciu; śmierć, „Zakończ” i „Restart” zabierają to, co postać niosła, jak w każdym przejściu.

### task.md lines 39-44

- Pytanie 1. Co kosztuje nieudana próba ściany gracza, który nie chce czekać — skąd bierze on drugi raz rzecz, o którą ściana pyta?
  - Answer: Zapas zdobywany grą. Ręczne przejście mapy już rozwiązanej bierze zapas ze skrzynki i wynosi przedmioty do skrzynki, a wprawy dalej nie płaci. Nieudana próba ściany kosztuje wniesiony zapas, a po następny gracz idzie sam na rozwiązaną mapę albo czeka na pętlę.
  - Not chosen:
    - Rzecz zawsze na samej ścianie: to, o co ściana pyta, albo jego składniki da się zebrać i zrobić w jej własnym przejściu, a skrzynka tylko ułatwia — bez zmiany reguł gry, ale nieudana próba nie kosztuje wtedy nic poza pół minuty, więc ściana pada po kilku ponowieniach bez rzeczy, o którą pyta, a ściany starego Loopa oparte na „przynieś z innej mapy” trzeba ułożyć inaczej.
    - Czas, jak dziś: zapas ponad jednorazową wypłatę daje tylko pętla, a zasada o nieobecności dotyczy pierwszej próby, nie powtórek — po każdej porażce ze stratą zapasu gracz czeka godziny, a zastrzeżenie trzeba dopisać do zatwierdzonego wpisu definicji, czyli wrócić do definicji i ją ponownie zatwierdzić.
  - Source: human, 2026-11-20, „1a” (pytanie pokazane Mariuszowi jako 1 w doprecyzowaniu zadania 1 planu; zapis w dokumencie zadania `zadanie_szkielet_progresji_loop2.md`, pytanie 3)

## Foundation, guidelines and code named in *Read*

Read each guideline file named whole. Each foundation entry named by its identifier or its heading is read whole by the range from its heading to the next heading of any level. The line ranges in the plan's *Read* are those of the base commit `46cfec71`; earlier slices and the foundation step may have moved them, so find each entry by its identifier or heading, and where the numbers differ the entry you find holds.
