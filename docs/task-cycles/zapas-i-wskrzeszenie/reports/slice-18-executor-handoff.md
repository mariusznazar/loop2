# Handoff - executor of slice(s) 18 of the task `zapas-i-wskrzeszenie`

The person who requested the cycle has delegated intermediate choices to the orchestrator; no answer you get is that person's approval. Your reply goes to the orchestrator only.

## Where and what

- Worktree (work from its root, never from the main checkout): `the root of the task's worktree`, branch `task/zapas-i-wskrzeszenie`. The pinned the-way stands in `.the-way` there. Dependencies are installed (`npm ci` ran).
- Your method: `.the-way/task-cycle/change/SKILL.md` by its path in the worktree's `.the-way`; read it whole, and a file it names only when the step or variant that names it comes. Do not call a skill. Your variant: "a slice, or the retry of a slice".
- Your stage and its boundary: Make the slice below, commit it by path (`git add <file> ...`, never `git add -A`; commit messages in English, like the commits of the repository, with its `type: :emoji:` form), run the focused checks of its *Checks* and return. Make no other slice and no change outside the slice's *Change*, and run **no full gate** (`npm test` without a file): the gate is the orchestrator's or CI's.
- Base of your slice: `0419a56e`.
- Frozen task: `.runs/task-cycles/zapas-i-wskrzeszenie/task.md` (the passages your section needs are copied below; read the rest of it only if a passage sends you to it). Plan: `.runs/task-cycles/zapas-i-wskrzeszenie/plan.md` (its other slices are not yours). Spec: none.
- Answers of step 4 of the cycle: trust boundary - **yes** (`src/browser/sim/saved-game.ts`: the saved shape of the team's resurrection and the load's checks; check crafted input there: counts above the data's, negative or non-finite numbers, a moment standing with no use spent or missing with some spent, wrong types); irreversible operation - **no**. No open design choice; no reserved choice. The pin of the-way is not moved.
- Your directory for working copies: `.runs/slice-18-executor/` (directly under the ignored `.runs/` of the worktree).
- Your report: `.runs/task-cycles/zapas-i-wskrzeszenie/reports/slice-18-executor-report.md`. The report file is the input of the cycle's scripts (`task-cycle/remarks_check.py` reads it), the case the harness's note about files named `report...` leaves open. Where you are refused the write all the same, return the report whole as your answer. Its first line is yours as your method gives it; it holds besides what your method gives **Unread material** (what this handoff names that stayed unread or was read in part, or `none`) and **Searches not found or unclear** (each thing looked for and not found or unclear, or `none`).
- `cycle.md` and the other files of the cycle's record directory - other agents' handoffs, reports and findings - are not yours to read unless this handoff names them.
- Other tools of the cycle: the product's guidelines say tests run as `npm test -- <one test file>`; never run `npm test` bare.

Working copies - copied word for word from the cycle:

> An agent of the cycle that makes a working copy to check something — a worktree of a commit, a clone, a script, a screenshot, a prepared input of a test — makes it in a directory of its own directly under the ignored `.runs/` of the task's worktree, the directory its handoff names; never in the system's temporary directory, in the scratch directory of a session or in the main checkout of the repository. The screenshot that a screenshot tool, such as the Playwright server, saves by itself under its session's directory is moved into the agent's directory and the original removed, except a screenshot that is shown to the human: that one goes where `task-cycle/change/ui_check.md` says, to the place the product's foundation settles for screenshots, and into the agent's directory only where no such place is settled. The files that a product's own tools and tests make by themselves are no working copy of the agent and stay outside this rule. Before the agent returns, each time it returns, it removes its copy — a worktree with `git worktree remove --force`, then `git worktree prune` — keeps in `reports/` beside its report what the report needs, and states in the report where each copy stood and that it was removed. Where a removal fails, the agent finishes all the same and names in the report the remainder, with its full path and the reason it stayed. It removes a copy, as any directory, by its path written out in full in the command, never through a shell variable: an empty variable turns the removal on the directory the shell stands in.

## The slice (copied word for word from the plan)

### Slice 18 — The test of the page holds the change

- **Goal:** In `tests/view/account-screen.test.mjs` the version of the saved shape is 8 and the one
  before it 7 (Slice 6); the states it builds set the team's uses, not the old field; the cases of
  the resurrection line expect the lines of question 6; the settlement of a death that spent a use
  holds its uses left; the case of the mark of a rehearsal goes with its reason (D-251 withdrawn) and
  the comment naming D-251 is rewritten; a case that expects a run of a solved map to leave the chest
  as it was expects what Slice 3 made; and each `decision:` line of D-189, D-217, D-240 and D-251
  quotes a sentence as it stands now, none of D-251 left. Edit the file by searching it, not by
  reading it whole: it holds about 359 000 characters. Then the foundation check reports nothing.
- **Change:** `tests/view/account-screen.test.mjs`
- **Read:** `guidelines/coding.md` · `guidelines/testing.md` · `guidelines/coding-browser-module.md`
  · `guidelines/styleguide-browser-view.md` · `src/browser/AGENTS.md` ·
  `.runs/task-cycles/zapas-i-wskrzeszenie/task.md:73-81` Questions to settle (question 6) ·
  Foundation entries row D-189 · row D-217 · row D-240 · row D-251 · `foundations/part_map.md:3-31`
  browser-view
- **Model:** same - the orchestrator raised it from `cheaper` at the plan's review: the executor edits a file of about 143 000 tokens by search, with 20 or so local edits, and a slip there fails a gate nobody runs per slice.
- **Risk:** none
- **Checks:** `npm test -- tests/view/account-screen.test.mjs` ·
  `python -B .the-way/elements/common/foundation_check.py`, which reports nothing
- **Depends on:** Slice 6 · Slice 11 · Slice 15 · Slice 17

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

### task.md lines 73-81

- Pytanie 6. Jakie brzmienia mają napisy z pozycji 4 listy „To do”?
  - Answer: Jedno słowo w napisach: drużyna ma jedno „wskrzeszenie drużyny”, które ma „użycia”. Liczby 3 i 4 w napisach pochodzą z danych gry.
    - Wiersz przy postaci — na karcie w Siedzibie, na ekranie Postać i w „Kto idzie” na karcie mapy: przy pełnym zapasie „Wskrzeszenie drużyny: użycia 3 z 3” w `text-secondary`; przy części „Wskrzeszenie drużyny: użycia 1 z 3, następne za 3 godz. 10 min czasu realnego” w `text-secondary`; przy zerze „Wskrzeszenie drużyny: użycia 0 z 3, następne za 3 godz. 10 min czasu realnego — śmierć zabierze wprawę i wykupione stopnie” w `danger`. Czas poniżej godziny i zaokrąglanie minut — jak dziś w D-217.
    - Okno końca przejścia, po śmierci, która zużyła użycie, w `text-secondary`: „Zużyte jedno użycie wskrzeszenia drużyny: wprawa z tego przejścia przepada, wcześniejsza i wykupione stopnie zostają. Po tej śmierci zostały użycia 2 z 3; zużyte wracają po kolei, jedno co 4 godziny czasu realnego, a jedno od razu przy pierwszym rozwiązaniu nowej mapy.” Liczba użyć mówi o chwili śmierci, a nie o chwili czytania, bo okno stoi do „Restart” albo „Zakończ”, także po ponownym wczytaniu gry; bieżącą liczbę pokazuje wiersz przy postaci.
    - Okno końca, po śmierci, gdy żadne użycie nie było gotowe, w `danger`: „Wskrzeszenie drużyny nie miało żadnego użycia: postać straciła całą wprawę i wykupione stopnie. Teraz to pokolenie {n}.”
    - Okno końca, po śmierci postaci bez wprawy, w `text-secondary`: „Postać nie miała jeszcze wprawy, więc śmierć nie zabrała drużynie żadnego użycia wskrzeszenia.”
    - Okno końca, po pierwszym rozwiązaniu, które przywróciło użycie, w `text-secondary`: „Wróciło jedno użycie wskrzeszenia drużyny: pierwsze rozwiązanie tej mapy.”; rozwiązanie, które zastaje pełny zapas, nie pokazuje żadnego wiersza.
    - Ekran ręcznego przejścia mapy już rozwiązanej, w miejscu dzisiejszego wiersza D-215: „Mapa jest już rozwiązana: to przejście nie płaci wprawy; zapas bierze ze skrzynki i wynosi do niej jak każde inne.”
    - Ostrzeżenie pod „Wejdź” na mapie rozwiązanej, „Próba weźmie zapas, którego nie ma w skrzynce — pętla zarobkowa go nie dostanie.”, znika (pokazane Mariuszowi do wiadomości, bez weta).

## Foundation, guidelines and code named in *Read*

Read each guideline file named whole. Each foundation entry named by its identifier or its heading is read whole by the range from its heading to the next heading of any level. The line ranges in the plan's *Read* are those of the base commit `46cfec71`; earlier slices and the foundation step may have moved them, so find each entry by its identifier or heading, and where the numbers differ the entry you find holds.

## Extra from the orchestrator

- Slices 1-17 are made and fixes are in (code up to `0419a56e`). Since the plan: (a) the settlement of a death that spent a use stores `usesSpent` (uses spent after the death, 1..the data's count), not the uses left; the window's uses left is computed when it is drawn as the data's count minus it (a human's decision on request 166; slice 14 did it in `end-window-lines.ts`); (b) the fix agent already changed the save-version lines of this file (`SAVED_GAME_VERSION` and the first version above it taken from the game's constant): check before you edit them; (c) slices 15 and 17 already did for `tests/view/maps-screen.test.mjs`, `trip.test.mjs`, `world-area.test.mjs` what this file needs in its own cases — read their commits (`0f810761`, `0419a56e`) for the wordings (D-217 lines at the characters, the solved-run line, `Wyniesie: patyk 3` at a marked run).
- Your *Goal* tells you what to change in `tests/view/account-screen.test.mjs`; at this base `npm test -- tests/view/account-screen.test.mjs` fails 3 cases and the foundation check reports 6 errors, all in this file (the case of the mark of a rehearsal at about lines 3129-3173 which asserts the withdrawn D-251 mark, the states `renewing` at ~3250 that set the old field, the resurrection line cases) — find every occurrence of `resurrectionReadyAtMs`, `usesLeft`, `D-251` and the old lines by searching, edit by searching and reading ranges, never read the file whole (about 359 000 characters).
- Done when `npm test -- tests/view/account-screen.test.mjs` passes and `python -B .the-way/elements/common/foundation_check.py` (WITHOUT the skip switch) reports no error at all in the repository. Quote decisions word for word from the start of a sentence as they stand in `foundations/decisions.md` now (D-251 is withdrawn: no `decision: D-251` line may remain). `decision_index.py` takes `--decision D-217`, with the `D-` prefix. A test comment must not point outside the foundation. The walk through the running game is a dedicated step after this slice — say so in your report.
