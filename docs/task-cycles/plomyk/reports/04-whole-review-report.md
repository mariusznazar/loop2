PASS c12faa379d42644ed15565c07371f3605de6151d

# Review of the whole change — task `plomyk`

- Range: `b8ac134a1157dae687a2ba97b58a5d4e9feec121..c12faa379d42644ed15565c07371f3605de6151d`
  (`1d25143` pin move, `bf99953` code and tests, `c12faa3` foundation entries). `git rev-parse HEAD`
  in the worktree = `c12faa3…`, as dispatched. No plan, no spec: one author, so this review is the
  only one the change gets (WAY-136), the author's own-work check included.
- Counts: blocking 0 · Minor 1 · out of scope 0.

## Findings

### Critical

none

### Important

none

### Minor

1. **`src/browser/sim/data/conditions.ts:55` — the condition's unit „pkt” is an author's choice
   the task does not settle, and the player sees it.** What: `natureEnergyBelow` carries
   `unit: "pkt"`; the program editor shows it beside the number and the discovery line names the
   condition as „Energia natury poniżej … pkt” (`src/browser/view/status-row.ts:105`–`110` appends
   „ … ” and the unit for every condition that has one). Why it matters: To do 5 and Q2 settle the
   label, range, step and default only; loop gives no unit (author's reach to loop `cdc7c0d`). The
   choice follows the health conditions („Zdrowie poniżej … pkt”, `conditions.ts:80`), so it is
   consistent and a change of data alone (D-18), but it is visible text nobody approved. Evidence:
   the author names it as choice 6 and in *Searches not found*. Recommendation: list it in the
   request beside the other choices so the human sees it; no change needed for the merge.

## The pin move (`1d25143`)

Holds only what the dispatch allows: the gitlink `.the-way` 3aee7d9 → `a8dfe8ac62885e88bc8f463e93ab16b621d48e92`
(`git ls-files --stage -- .the-way` and `git -C .the-way rev-parse HEAD` both show it) and the
40 installer entry points in `.claude/skills/the-way-*/SKILL.md` and `.agents/skills/the-way-*/SKILL.md`,
each changing one line to the text `.the-way/installation/install.py:136` writes („…when the step or
variant that names it comes, not all of them at the start”). `AGENTS.md` unchanged (empty diff). No
later commit touches these paths.

## Against the task (`.runs/task-cycles/plomyk/task.md`)

| To do | Met by | Evidence |
|---|---|---|
| 1 cap 100, full at every map run incl. „Restart” | `BALANCE.natureEnergy.max` (`data/balance.ts`), `startingNatureEnergy()` in `newMapRun` (`run.ts:319`), the only place a `MapRun` is created (grep of `newMapRun(`/`startingBody()`) | `tests/sim/body.test.mjs` „every map run starts with full nature energy…” (send, restart after 12, send after „Zakończ”) |
| 2 same names/statuses; 2/1 sticks + 10 energy; paid together at finish; interrupted pays nothing | labels/statuses unchanged in `data/actions.ts`; `natureEnergy: 10` on both; `finishUse` (`run.ts:284`–`293`) pays only where `landUse` took hold | `campfire.test.mjs` payment, „taken when it finishes” (50,50,50,50,50,40), no-hold; `encounters.test.mjs` interrupted lighting in its third minute keeps 2 sticks and 50 energy |
| 3 feasible at ≥ price, else passed over, rule stays | `actionFeasible` first line (`program.ts:200`) | `campfire.test.mjs` 100/10 true, 9.5/0 false; pass-over picks rule 2, with 10 picks rule 1 |
| 4 +0.5 when satiety after fall ≥ 60, capped, in the body step before the ending action; stands in combat | `regainedNatureEnergy` after `bodyMinute`, before `finishUse` (`run.ts:402`–`416`, `442`–`447`); combat branch (`run.ts:391`–`401`) leaves the field as it was | `body.test.mjs` 60.6→well fed, 60.5→not; cap 99.75→100; Q10: full mage finishing a lighting → 90, half → 40.5; `encounters.test.mjs` 50 through M+1…M+5, 50.5 in the next minute |
| 5 condition 0–100 step 1 default 30; revealed by first finished „Zapal” with „Zasil — ognisko” | `data/conditions.ts:52`–`60` with `revealedBy: { kind: "lit" }` — data alone (D-128); `conditionHolds`, `checkCondition`, editor `newCondition` gain the kind | `conditions.test.mjs`, `data.test.mjs` row `lit`, `discovery.test.mjs` both „Zapal” rows, `program-editor.test.mjs` default/range; one line per minute is D-122's existing behaviour |
| 6 body row ends „Energia natury {n}”, floored, `text` always | `bodyValues(body, natureEnergy)` fourth value `danger: false`; four spans | `tests/view/body-row.test.mjs` To do 6's example string, 89.5→89, 0 and 100 never `danger` |
| 7 acceptance program still survives Las 480 min | program unchanged; one added assertion that the price was paid (`natureEnergy < 100`) | `tests/sim/acceptance.test.mjs` passes (my run below) |
| 8 task-8 measurement repeated, per seed result/minute/energy/passes, no threshold | `.runs/task-cycles/plomyk/reports/measurement-20-seeds.md` and `.json`, script `measurement.mjs` | I re-ran the script on a clean copy of `c12faa3`: output byte-identical to the author's `.md` and `.json`; „before” column matches `1933a3f:…/measurement-20-seeds.md:232`–`251` row for row; the script differs from the task-8 script only by formatting, the D-164 copy, the counters and the control switch (`diff` of the two) |

*Settlements to record*, rows 1–9, each carried by the entry the author's table names (D-63, D-176,
D-177, glossary „well fed”, D-71, D-141 + D-71, D-121, D-178, `nature-energy-range`); I compared each
binding sentence with its row and with the Q-answer it cites, and each says the row's meaning with
no broadening or dropped qualification. The projected entry is D-175, its approved binding sentences,
*Verification*, *Rationale* and *Rejected* verbatim with the task's *Decisions in play*; *Scope* set to
`simulation` (the task's carried question 2 gives the cycle that wording). Q8: no new or changed
binding sentence uses an excluding word; D-175 keeps its approved „only” and no other sentence
repeats it. *Rejected* fields holding a way with no cost (D-121, D-141, D-176, D-177, D-178) list only
ways their source keeps, which the decision template allows where the source keeps no cost
(`.the-way/elements/decisions/template.md`, rule from WAY-134); nothing derived was added.

Carried question 3 (save format): task 16 is not merged; no game state is persisted anywhere
(grep of `localStorage`/`sessionStorage`/`JSON.parse` in `src/`), and the server does not know
condition kinds (grep of `satietyBelow` outside `src/browser/sim`, `src/browser/view` and tests: none).

## Against the foundation

- D-71: the code orders body → energy regain → death → world → ending action, as the new sentence
  gives; energy regains in the minute of death too, which the sentence's order implies (author's
  choice 4). Combat minutes leave energy as D-71 and D-141 give.
- D-23 / D-65 / D-177: feasibility in `actionFeasible`, so the ordinary pick passes on; combat picks
  (`chooseCombatRule`) skip any action without a `combat` effect, so Płomyk stays out of combat turns
  (D-140, D-63's new „outside combat”).
- D-18 / D-128: every number is in data; the reveal is a data field of an event kind already handled.
- D-125 / D-178 / D-39: the energy shows from minute 0 whatever the Understanding holds, in the
  inherited `text` colour (`styles.css` colours only `.body-value.danger`).
- D-164: „Restart” carries on the copy but creates a new run through `newMapRun`, so the energy is
  full again; a program switch keeps the run and its energy — neither collides.
- Invariant `nature-energy-range`: new, Method `test`, cited by `tests/sim/body.test.mjs`
  („nature energy stays between 0 and its cap of 100 at every game minute”), with controls proving
  the cap and zero were both reached and a pick made at zero; each decision it derives from names it
  in *Verification*.
- **Changed invariant tests (name them in the request):** `tests/invariants/test_program_closed_lists.py`
  (`program-closed-lists`: kind list, a valid rule and group of the new kind, fixture counter
  `nextGroupId` 10 → 11 for the added group, docstring nine → ten) and
  `tests/invariants/test_simulation_inputs.py` (`simulation-inputs`: input pool gains the kind and
  three values). Both changes follow from the data adding a kind; neither weakens a check.

## Tests

Every new or changed expectation names its source in the task (lines checked against the frozen
task: To do 1 l.18, 2 l.19, 3 l.20, 4 l.21, 5 l.22, 6 l.23, 7 l.24, Q3 answer l.36, Q10 answer l.58).
Values are written out by hand, not computed by product code. The changed body-row example (36,8 →
36,9 and the fourth value) is To do 6's example. StrykerJS on the changed lines (below): 44 killed,
2 survived, both classified:

- `run.ts:286` `if (state.natureEnergy < cost) return state;` → `if (false)`: equivalent in every
  reachable state — the pick already required energy ≥ price and energy never falls while an action
  runs (one action at a time; the only fall is this payment). A defensive guard, not a gap.
- `run.ts:288` `cost === 0` → `false`: equivalent — paying 0 returns the same energy.

## Own-work check

The author named the To do 8 pass counter (0 on every seed could be a counting fault) and checked it
by starting every run at 0 energy. That is where this change is weakest as evidence (the
measurement's only non-trivial column), and the control would catch a counter stuck at 0. I re-ran
it: `START_ENERGY=0` gives seed 17 four passes and death at 484, the others regain to 33 and light as
before — as reported.

## UI evidence (WAY-219)

Screenshot unchecked by the author, with the reason that the foundation settles no way to the running
product (grep of `foundations/*.md` for screenshot/Playwright: none); states inspected in code. That
is what WAY-219 asks when no way is settled; the request has to say the screenshot is unchecked.

## Declined to judge

- Whether Las — głębiej can be completed with the price in force — Q9 gives a measurement without a
  threshold; the result (0/20, same minutes) goes to the human at the request.
- Whether the Q2 numbers make Las too easy (the acceptance program regains nothing after minute 66
  yet ends with 70) — numbers settled by the human; balance is outside the review.
- The author's report says `c12faa3` touched „the foundation and a citation comment”; it touched only
  `foundations/` (the citing comment is in `bf99953`) — an inaccuracy of the report, no effect on the
  change.

## Checks run

All in a separate detached worktree of `c12faa3` (removed afterwards; the reviewed worktree, its
index and branch untouched — `git status --short` empty before and after) unless marked.

- `npm run build` → 0; `npm run typecheck` → 0
- `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` → 0 (654 pass, 0 fail)
- `python -B -m unittest test_program_closed_lists test_simulation_inputs test_minute_span_split test_map_run_repeatability test_restart_seed test_action_in_progress test_program_rule_pick test_simulation_isolation test_content_identifiers test_streak_program_change` (in `tests/invariants`) → 0 (43 tests OK)
- `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "<changed line ranges of body.ts, program.ts, run.ts, data/actions.ts, data/balance.ts, data/conditions.ts>"` → 0; 44 killed, 2 survived (classified above); no mutants generated in the data files
- `node node_modules/eslint/bin/eslint.js --max-warnings 0 --suppressions-location <empty {}> <changed .ts/.mjs>` → 0
- `node node_modules/prettier/bin/prettier.cjs --no-config --no-editorconfig --ignore-path .gitignore --check <changed .ts/.mjs>` → 0
- `.runs/quality-venv/Scripts/ruff.exe check --config ruff.toml --ignore-noqa --no-fix --no-cache <the two changed .py>` → 0
- `node .runs/task-cycles/plomyk/reports/measurement.mjs` (copy of the author's script) → 0, output identical to the author's `.md` and `.json`; with `START_ENERGY=0` → 0, as reported
- In the reviewed worktree (reads only): `python -B .the-way/elements/common/foundation_check.py` → 0 (`0 errors`)
- Manual: diff of `1d25143` against its parent (pin move), diff of the task-8 and plomyk measurement scripts, reading of the whole diff of `src/` and `tests/` and of `foundations/`.

Not run: `npm test` (the cycle's own run before the request, per method and dispatch);
`tests/quality`, `tests/deploy`, `tests/agent_workflow` and the other invariant tests (no file of
theirs changed; the quality rules ran on the changed files directly); a screenshot (no settled way).

## Reaches beyond the dispatch

- Selection (my own, by `way_of_working.md` "Reading the foundation"): parts `simulation`,
  `browser-view`, `product-foundation`; the *Scope* search gives 87 decisions for `simulation` and 91
  for `browser-view`. Read whole: every entry the change writes or changes (D-63, D-71, D-121, D-141,
  D-175–D-178), D-18, D-23, D-39, D-62, D-65, D-72, D-125, D-128, D-164, and D-123, D-143, D-147 (they
  name changed decisions in *Relations*); the other entries of *Decisions in play* through their full
  binding sentences quoted in the task. The remaining scope hits (design tokens, controls, account
  screens, build, the testing decisions D-73–D-95 that `guidelines/testing.md` carries) were located
  by heading and not read whole, as no file of the change reaches them — a narrower reading than the
  method's "each whole".
- Invariants read whole: `program-closed-lists`, `simulation-inputs`, `map-run-repeatability`,
  `action-in-progress`, `restart-seed`, `minute-span-split`, `nature-energy-range`.
- Guidelines read whole: `guidelines/coding.md`, `coding-content-data.md`,
  `coding-simulation-module.md`, `coding-browser-module.md`, `testing.md`, `src/browser/AGENTS.md`;
  `styleguide-browser-view.md` read in its roles and rules on role meanings and searched for the body
  row, states and the kitchen-sink page — not read whole.
- the-way at the pin: `task-cycle/review/SKILL.md`, `whole_change.md`, "Reading the foundation" in
  `elements/common/way_of_working.md`, `product-guidelines/reading.md`, WAY-219 in
  `.the-way/foundations/decisions.md`, `elements/decisions/template.md` (lines 1–140) for the
  *Rejected* rule.
- Product code read for callers: `src/browser/sim/program.ts` (`chooseActivity`,
  `chooseCombatRule`), `run.ts` (`landUse`, `minuteBeforePick`), `understanding.ts` (`lit` and
  `newlyRevealed`), `programs.ts` (`checkCondition`), `view/status-row.ts:105`–`110`,
  `styles.css` body-row rules, `stryker.config.json`, `.gitignore`.
- `git show 1933a3f:docs/task-cycles/walka-w-glebi-lasu/reports/measurement-20-seeds.md` and
  `measurement.mjs`, to check the „before” column and the script's fidelity.

## Searches not found or unclear

- A settled way to a screenshot of the running product in `foundations/`: not found (as the author).
- A unit for „Energia natury poniżej” in the task, the foundation or loop: not found (Minor 1).
- `foundations/decisions.md` shows the em dash and Polish letters as `�` in a Windows `python`
  print without UTF-8 output; read through git and the editor they are correct — a console artefact,
  not a file fault.
