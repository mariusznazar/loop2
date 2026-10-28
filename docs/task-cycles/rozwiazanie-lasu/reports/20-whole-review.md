FAIL 7bc8746

# Review of the whole change — task `rozwiazanie-lasu`

- Range: `6540e4c..7bc8746` (target `main` at `6540e4c`); `git rev-parse HEAD` in the worktree is
  `7bc874606f6a1bb59f964186c029d7dc3ff9f42e`, the head given.
- Reviewer: did not make any of this change. Method: `.the-way/task-cycle/review/SKILL.md` and
  `whole_change.md` at the pinned `3aee7d9`.
- Counts: blocking 1 (Important), Minor 4, out of scope 1.

## Findings

### Important (blocking)

**I-1. The full gate fails: the mutation runner's list of simulation tests lacks the two new test
files.**

- Place: `stryker.config.json`, `tap.testFiles` (unchanged by the range), against the new files
  `tests/sim/streak.test.mjs` and `tests/sim/completion.test.mjs`.
- What is wrong: the invariant `mutation-test-selection`, checked by
  `tests/quality/test_mutation_test_selection.py`, requires `tap.testFiles` to list every
  `tests/sim/*.test.mjs` except `rules.test.mjs`. The change added two such files and did not
  register them.
- Evidence: in a separate worktree of `7bc8746`,
  `npm test -- tests/quality/test_mutation_test_selection.py` exits 1:
  `AssertionError: Items in the second set but not the first: 'tests/sim/completion.test.mjs'
  'tests/sim/streak.test.mjs'`. The gate on the base and on `c0c51a0`
  (`reports/03-pin-gate.log`) failed only the three environment checks, so this is a new failure
  that the full `npm test` before the request will show.
- Why it matters: the product's one command fails, so the request cannot be opened as passing;
  and the mutation tool, which `guidelines/testing.md` ("Mutation testing") has the reviewer run on
  changed simulation files, silently leaves out the two files that carry the streak and completion
  cases — exactly the drift the invariant exists to stop.
- Fix: add `tests/sim/completion.test.mjs` and `tests/sim/streak.test.mjs` to `tap.testFiles`
  (I did so in my scratch worktree for the Stryker run below; the test then passes).
- Comes from: spans slices 3 (`635ac25`, `tests/sim/streak.test.mjs`) and 5 (`68cfa84`,
  `tests/sim/completion.test.mjs`); the root is a gap of the plan — neither slice's *Change* lists
  `stryker.config.json` and neither slice's *Checks* runs
  `tests/quality/test_mutation_test_selection.py` (plan *Choices* row 3 chose new files in
  `tests/sim/` without the registration it implies).

### Minor

**M-1. The clause "unless the map run ends in it" of `player-map-run-pace` is not exercised by the
test that cites the invariant.** `tests/invariants/test_player_map_run_pace.py`,
`COMPLETION_SCENARIO`: the completing minute (minute 1 of a knowing game) discovers nothing, so its
"not paused" holds whether or not the code keeps the discovery pause off at a completion. Reverting
`paused: !completed` to `paused: true` in `advanceMinutes` (`src/browser/sim/game.ts:638`) would
leave every invariant-marked test green; only the unit case "the completion in the minute of a
discovery leaves the state holding the discovery, not paused" in `tests/sim/completion.test.mjs`
catches it. The behaviour is protected in the gate, but the invariant's own check does not reach
the one words it gained for completions. Slice 5 (`68cfa84`).

**M-2. `streak-program-change`'s test leaves out some edits of rule groups that row 6 names
("zmiana grupy").** `tests/invariants/test_streak_program_change.py`, `DIFFERING` covers a rule
added, deleted, reordered, twin rules swapped, a rule's condition and action, a group renamed and a
group's condition; it has no rule moved to another group, group added, group removed or groups
reordered. The deep comparison `sameData` (`src/browser/sim/game.ts:375`) treats them like the
covered cases, so no defect is shown; the test would not catch a future special-casing of groups.
Slice 4 (`9dd8306`).

**M-3. Doc comments run past the 80 columns of the files' layout.** Prettier does not wrap
comments, so `--check` passes, but these lines break the files' style:
`src/browser/sim/run.ts:342` ("…passes no minute. The streak follows the body step, in the death
branch too. Inputs are not"), `src/browser/view/status-row.ts:130` ("`positive`, and then only. The
elements are made once …"), `src/browser/view/headquarters.ts:24` and `:29` (the one-line docs of
`mapLabel` and `solvingSentence`), `src/browser/sim/game.ts:471`–`473` (the `restart` doc broken
after "same map," with a stray short line). Slices 5 (`68cfa84`) and 6 (`7bc8746`).

**M-4. The headquarters' re-render on a change of `solvedMaps` has no test on the hand-made
document.** `src/browser/view/headquarters.ts:184` (`state.solvedMaps !== shownSolved`) is view
logic the fake document could check (row rebuilt, class `map-label solved`); the slice tests only
the pure `mapLabel` and `solvingSentence`. My browser check shows it works (below). Slice 6
(`7bc8746`).

### Out of scope

**O-1. `passRealTime` with no map run.** Stryker's surviving mutant `game.ts:540` (the guard
`!state.run || mapRunEnded(state.run)` replaced by `false`) survives the `tests/sim` suite: with no
map run, the mutant would store a carry in `realMsCarry`. For an ended map run the mutant is
equivalent (the stop sets the carry to zero again). The no-run half of the guard predates the task
(`!state.run` stood there at `6540e4c`) and no requirement of the task touches it.

## The move of the pin

`c0c51a0` changes the gitlink `.the-way` alone, `574a37b…` → `3aee7d958835cc19b95519f4d21b37538b78e3e1`
(`git diff 6540e4c c0c51a0`), and `git -C .the-way rev-parse HEAD` shows `3aee7d9…`.
`reports/02-pin-move-apply.log` keeps every installer file (`KEEP` lines only); no other file of the
range is the installer's. `reports/03-pin-gate.log` fails the same three environment checks as the
base. Holds.

## The whole task against the commits

- To do 1 — five buttons „1×”–„16×” beside „Pauza”, selected as the button selected in its group
  (`aria-pressed`, class `selected`); one game minute per real second × pace; a pace picked in a
  pause (also the discovery stop) leaves the run paused: met (`setPace`, `passRealTime`,
  `status-row.ts`; browser check).
- To do 2 — the pace survives pause, discovery stop, „Restart”, „Zakończ”, next send; new game at
  1×: met (`tests/sim/flow.test.mjs`, `PACE_SCENARIO`; browser: „Restart” after death went on at
  16×).
- To do 3 — Las's row holds `solving: { streak: 480 }` and `solvingText`: met.
- To do 4 — streak after the body step, a loss zeroes it, a differing edit zeroes it also in a
  pause, an identical edit leaves it, no action interrupted, 0 at send and restart: met (`run.ts`
  `streakAfter`, `setProgram`; browser: „↑” on the only rule left 21, „Dodaj regułę” set 0 in a
  pause). See M-2.
- To do 5 — completion at the place of the pick after the rest of the minute; screen stays, time
  stands, „Minuta {m} · Las rozwiązany” in `positive`, „Pauza” and pace buttons gone, „Restart”
  (same seed) and „Zakończ” stay; counts stay; discovery line under the completion row: met
  (`advanceMinutes`, `completion.test.mjs`, `status-row.test.mjs`; browser for all but the
  discovery case).
- To do 6 — after death the pace buttons go with „Pauza”, „Restart” at the chosen pace: met.
- To do 7 — first completion solves the map for good; „Mapa: Las · rozwiązana” in `positive`: met.
- To do 8 — „Minuta 312 · Eksploruje · Passa 120/480”, „ (pauza)” at the end; the condition
  sentence in the headquarters: met.
- Settlements rows 1–14: each in the foundation — D-21 (1), D-129 (2), D-130 (3),
  `player-map-run-pace` (4), D-71 (5; folded into its first sentence rather than added as a
  sentence, since D-71 already had three binding sentences — meaning as row 5), D-131 (6), D-132
  and D-62 (7), `map run restart` (8), D-133 (9), D-134 (10), D-135 (11), D-122 (12),
  `minute-span-split` (13), D-93 (14). Compared with the rows' wording: no meaning altered or
  invented; the added "at the pace in force when that real time is passed" of
  `player-map-run-pace` is the reviewed spec's decision 2.
- Projected entries: `completion`, `solved map`, `streak`, `manual map run` written verbatim;
  `streak-program-change` written as the part this task makes true (no copy, no switch — task 12),
  *Method: test* with its test in slice 4 and the part-map line in the same commit; the two
  projected decisions assigned to tasks 8 and 18 not written. As the task gives.
- Questions carried to cycle 1–5: settled by spec decisions 1–5, as built.

## Declined to judge

- The rule counts and the pace buttons both written as „{n}×” on one screen (a rule's „1×” beside
  the pace „1×”): both forms were settled by the human (D-93, D-130); whether they confuse is not a
  question of this task.
- After the first chill the mage on Las stands „Czeka — żadna reguła nie pasuje” while the rule
  „Zawsze → Eksploruj” exists (seen in the browser at minutes 104 and 21): behaviour of
  exploration and of task 6, untouched by this range.
- Several characters each showing the same condition sentence in their own row, and no sentence
  while the team is empty: the spec's accepted placement (spec decision 6, way rejected), within
  To do 8's "przy mapie".

## Checks run

| Check | Result |
|---|---|
| `git rev-parse HEAD` in the worktree | `7bc8746…`, the head given |
| `git diff 6540e4c c0c51a0`; `git -C .the-way rev-parse HEAD` | gitlink only, `3aee7d9…` |
| Separate worktree of `7bc8746` (scratch, `node_modules` by junction), `npm run build` | exit 0 |
| `node --test` on `tests/sim/{completion,streak,time,flow,body,data,discovery,program-counts,acceptance,purity}.test.mjs` and `tests/view/{status-row,headquarters}.test.mjs`, each | exit 0 each |
| `npm test -- tests/invariants/test_{player_map_run_pace,minute_span_split,streak_program_change,content_identifiers,map_run_repeatability,restart_seed,simulation_inputs}.py`, each | exit 0 each |
| `npm test -- tests/quality/test_mutation_test_selection.py` | **exit 1** — I-1 |
| Prettier `--check --no-config --no-editorconfig --ignore-path .gitignore` on the changed TS/MJS/CSS | exit 0 |
| ESLint `--max-warnings 0` on the changed TS/MJS | exit 0 |
| Ruff 0.17.1 (`.runs/quality-venv` of the main checkout) `check --config ruff.toml --ignore-noqa` on the three changed invariant tests | exit 0 |
| `python -B .the-way/elements/common/foundation_check.py` in the reviewed worktree | exit 0, `0 errors` |
| StrykerJS, scratch worktree with the two files added to `tap.testFiles`, `--mutate` on the changed ranges of `game.ts` (375–410, 520–570, 590–650), `run.ts` (315–345, 355–430), `body.ts` (60–81) | exit 0; `body.ts` 100 %, `run.ts` 100 %, `game.ts` 38 survivors |
| Survivor classification | `sameData` and the zeroing in `setProgram` (`game.ts:376`–`403`, 30 mutants): not a gap — the Python invariant test, outside Stryker's run, protects them; checked for one: `if (a === b) return true` → `if (false)` makes `test_streak_program_change.py` fail (exit 1, 4 control subtests) · `game.ts:405` `events` and `:526` error text: not worth fixing · `:540` guard: equivalent for an ended run, pre-existing for no run (O-1) · `:543`, `:545`: pre-existing guards outside the task · `:550` `/` for `*` by `gameMinutesPerRealSecond` (= 1) and `:555`–`556` optional chaining: equivalent |
| Full gate `npm test` without a file | not run, as the handoff assigns it to the orchestrator; I-1 shows it will fail |

### The check in a browser (D-75, D-87, D-88)

Method: the built server of the scratch worktree (`node dist/server/main.js`, port 3917, no account
settings), Chromium through Playwright MCP at 1600 × 1000, `/api/account` answered 200 by a
`page.route`. Screenshots in `.runs/task-cycles/rozwiazanie-lasu/reports/`.

| State | What it showed | Screenshot |
|---|---|---|
| Headquarters before any completion | „Mapa: Las” in `text` (rgb 212,212,216), then „Las — 480 minut bez utraty zdrowia od zimna i głodu i bez zmiany programu” | `browser-hq-condition.png` |
| Running map run | „Minuta 2 · Czeka — żadna reguła nie pasuje · Passa 2/480”; „1×” `aria-pressed=true`, class `selected`, the other four false | — |
| 16× picked while running | 30 game minutes in 2.01 s (≈15/s at the 200 ms tick); „16×” the selected one | — |
| Pause at the discovery of minute 84, then „4×” picked | „Minuta 84 · Eksploruje · Passa 0/480 (pauza)”, line „Odkryto: …” shown; after „4×” the minute stayed 84 for 1.5 s, „4×” selected, all pace buttons shown | `browser-pace-in-discovery-pause.png` |
| After death | „Minuta 243 · Mag zamarzł” in `text`; „Pauza” and the five pace buttons hidden; „Restart”, „Zakończ” shown | `browser-after-death.png` |
| „Restart” after death | 17 game minutes in 1.0 s (16× kept), then paused: „16×” selected | `browser-restart-keeps-16x-paused.png` |
| Edits in the pause | „↑” on the only rule: „Passa 21/480” stays; „Dodaj regułę”: „Passa 0/480” | — |
| Completion | Reached by a `page.route` that served `dist/public/sim/data/maps.js` with `solving: { streak: 5 }` instead of 480 (1 hit; the run showed „Passa 0/5”), since 480 game minutes without a loss cannot be steered: „Minuta 5 · Las rozwiązany”, class `status-text positive`, colour rgb(0,188,125) = `--positive` #00bc7d; minute stayed 5; „Pauza” and pace buttons hidden; „Restart”, „Zakończ” shown; rule counts kept | `browser-completion-patched-streak-5.png` |
| „Zakończ” after the completion | „Mapa: Las · rozwiązana”, class `map-label solved`, rgb(0,188,125); the condition sentence still in `text` | `browser-hq-solved-mark.png` |

Unchecked in a browser: a completion at a streak of 480 of the real data (480 game minutes without
a loss cannot be steered — the completion was reached with the served data patched as above); a
completion in the game minute of a discovery (not steerable; covered by
`tests/view/status-row.test.mjs` "a discovery held at a completion stands under the completion's
row" and `tests/sim/completion.test.mjs`).

## Slices judged (none had a review of its own)

- *Foundation entries* (`c0c51a0..82bbb1c`): entries as above; the part-map line moved to slice 4
  rightly (the check refuses a pattern with no tracked file) and is there. Executor's own-work
  check (no excluding words) re-read: holds.
- Slice 1 (`aa75130`): pace in state, `setPace`, scaling, carry at the pace passed — correct and
  tested at every pace; own-work check (carry across a pace change) fits the weakest point and
  would catch it.
- Slice 2 (`9ad0e5b`): buttons built once from `BALANCE.paces`, flush before `setPace`; own-work
  check fits.
- Slice 3 (`635ac25`): `lostHealth` from chilled/starving, not from health; streak in all three
  branches of `minuteBeforePick`; source of I-1 together with slice 5.
- Slice 4 (`9dd8306`): deep comparison, ended runs keep the streak; own-work check (identical
  program, other key order) fits; M-2.
- Slice 5 (`68cfa84`): completion after the discovery and before the pick, carry dropped, solved
  maps once; the changed existing case of `tests/sim/streak.test.mjs` ("grows past 480" → stops
  at 480) was written in slice 3 of this task and changed for To do 5 — a cause in the requirement,
  named in the test; acceptable. M-1; source of I-1 together with slice 3.
- Slice 6 (`7bc8746`): texts, role `positive` toggled, hiding through `mapRunEnded`; M-3, M-4.

## Reaches beyond the dispatch

- `guidelines/coding.md`, `coding-simulation-module.md`, `coding-content-data.md`,
  `coding-browser-module.md`, `styleguide-browser-view.md`, `testing.md` — read whole, my own
  selection by `.the-way/product-guidelines/reading.md`.
- Foundation: the decisions with *Scope* `simulation` or `browser-view` number 106; I read whole the
  ones the task's *Decisions in play* names and the changed and new ones (D-04, D-18, D-20–D-24,
  D-39, D-44, D-53, D-55, D-60–D-62, D-71, D-73, D-75, D-80, D-82, D-84, D-88, D-90, D-93, D-118,
  D-122, D-123, D-129–D-135) plus D-23, D-35, D-36, D-42, D-47; the others of the 106 were not read
  whole — a narrower selection than "Reading the foundation" step 2 gives.
- `src/browser/view/program-editor.ts:150`–`260` — whether „↑” and the number field hand back an
  unchanged program (they do: `readNumberField` commits only a differing value).
- `stryker.config.json`, `tests/quality/test_mutation_test_selection.py` — the guideline's
  mutation-testing step led there; found I-1.
- `src/server/main.ts`, `src/server/configuration.ts`, `src/browser/account-api.ts`,
  `src/browser/view/app.ts` — to start the server without account settings and answer
  `/api/account` for the browser check.
- The personal skill `playwright-mcp` (session setup, route mocking, false positives, timing) — the
  user's instruction before a check in a browser.
