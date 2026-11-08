FAIL 434f32bbbf74695181ab5de5add4137d989aaac2

# Report 13 — review of the whole change (review-change)

Range `381588fbd31838b9c0075707a6588213cf6e5eaa..434f32bbbf74695181ab5de5add4137d989aaac2`, branch `task/teraz-i-potem`; `git rev-parse HEAD` in the worktree gave the head named by the handoff. Pinned the-way `294af7fde45323ac1851c014a03071a97fc38d96` (`git -C .the-way rev-parse HEAD`). Eleven commits: the foundation entries (`bd44c39`) and slices 1 to 10.

Counts: blocking 1 (Important), Minor 5, out of scope 0.

## Findings

### Critical

none

### Important (blocking)

**I-1. The numbers of the bar of the solving condition are set in Geist Mono, which D-46 forbids** — slice 8, commit `cb0212e`.

- Place: `src/browser/styles.css`, rule `.run-header-requirement-text`:
  ```css
  .run-header-requirement-text {
    margin: 0;
    font-family: var(--font-family-mono);
    font-variant-numeric: tabular-nums;
    color: inherit;
  }
  ```
- What is wrong: D-46 (`foundations/decisions.md:953`) sets "the chronicle and the clock of the map run in Geist Mono and every other text in Geist". The styleguide repeats it (`guidelines/styleguide-browser-view.md:117-118`: „tekst gry idzie stosem Geist, kronika i zegar przejścia stosem Geist Mono”). After this change the header holds the clock and, as a separate thing, the bar of the solving condition with its numbers (D-311, D-133 as rewritten here). „Passa 120/480” and „Pokonane napaści 1/2” are not the clock, yet they are set in Geist Mono. Before the change they were part of the one status row, which D-46's *Verification* named as the clock's place; this change itself split them off and rewrote D-46's *Verification* to "the clock of the map run in the header of the screen of a map run set in Geist Mono", so the entry the change edits now forbids what slice 8 wrote.
- Why it matters: WAY-263 — the change's files do what a foundation entry it changes forbids. For the player the effect is small (the numbers read in the clock's face instead of the face of all other text), but the code and the decision disagree, and the next reader of D-46 or the styleguide cannot trust either. The plan's slice 8 *Goal* names no face; the executor chose it (report 10, *Choices*: „Name and numbers are one paragraph with a mono face and tabular figures (as the clock), so the numbers do not jitter … Rejected: the proportional face; the task does not say”).
- Evidence: the CSS rule above (diff of `cb0212e`); D-46's binding sentence; no test pins the face of the bar's text (`tests/view/run-header.test.mjs:336-341` checks only the clock's face), so a fix changes no test.
- Fix in the code: drop `font-family` from `.run-header-requirement-text` and keep `font-variant-numeric: tabular-nums`, which keeps the figures from jittering in Geist too. Keeping the mono face would instead need a change of D-46 settled with the human.

### Minor

**M-1. A stale "status row" in the header comment of a file this change touched** — slice 6 (`92f6860`) touched the file; within the task.
`src/browser/view/run-screen.tsx:3-4` still says „one header — the character's name, the map's name and the status row — over three areas”. After slice 7 the header has no status row (D-311 as rewritten: clock, bar of the solving condition, buttons). A reader of the module is told of a part the screen no longer has.

**M-2. A stale "status row" in a code comment the change made false** — no slice touched the file; the change made it false; within the task.
`src/browser/view/screen-address.ts:154`: „The minute is the one the status row writes”. The foundation step corrected the same sentence of D-280 to „as the clock in the header of that screen writes it”; the code comment that cites it was left.

**M-3. The styleguide's example still names the status row** — within the task (To do 5 changes the styleguide; the example became stale with To do 3).
`guidelines/styleguide-browser-view.md:293-294`, rule "A fault of one screen is fixed in its component": *Good* „Za ciasny wiersz stanu poprawiony w regułach tego wiersza …”, *Bad* „… żeby zmieścił się wiersz stanu”. The rule still holds; its example names a row the screen no longer has. Slice 1's *Goal* said "Nothing else of the file changes", so the slice kept it on purpose; the cost is an example a reader cannot find on the screen.

**M-4. D-216 *Rejected* still weighs „the same in the status row”** — Foundation entries (`bd44c39`, left as the handoff notes); within the task.
`foundations/decisions.md:4048`: „*Rejected:* the same in the status row — a very long row and a change of its accepted wording”. As a record of a rejected way it is not false, but its reason („a very long row”) no longer has an object; a reader may look for a status row. A clause such as „in the status row of the header, which the header then had” would keep it true.

**M-5. „Teraz” and „Potem” stay controls that do nothing while the program panel shows a saved program** — slice 6 (`92f6860`); within the task.
`src/browser/view/now-rows.tsx` (`RuleRow`) makes a row a tab stop with a pointer cursor and the `highlight` hover whenever the copy holds the rule; `src/browser/view/program-panel.tsx` (`scrollToRule`) returns at once unless the panel shows the copy (`shown.kind !== "copy"`). So with a saved program shown during a map run the player can focus and click a row that looks clickable and nothing happens. The plan's *Choices* accepted this cost („A player who shows a saved program during a map run clicks and sees nothing happen”), and D-336 is silent on it; a reasonable player would expect either the copy to come back with the rule centred or the row not to look clickable. Rare state, no damage; graded Minor. Test `tests/view/run-screen.test.mjs` "while the program panel shows a saved program a click on Teraz scrolls nothing" pins the current behaviour.

### Out of scope

none

## Declined to judge

none — every behaviour I considered I judged within the task.

## The task, item by item

- Required outcome (now, next, minutes of the needs, bar of the condition): met by slices 2–9; focused tests below pass.
- To do 1 — rows under the scene, „Teraz” of one height (`height: 1lh`, `white-space: nowrap`, ellipsis), its words for an action, a wait, combat, death and completion, no progress bar: `src/browser/sim/game.ts` (`nowAndNext`, `nowLine`), `src/browser/view/now-lines.ts`, `now-rows.tsx`, `styles.css`. „Potem” with the label, the winner of the one `ruleSigns` judgement, the combat rule in an attack, the `warning` line with no winner, kept after the end: met. Click/Enter/Space scrolls once to the row or the folded group's header, a row with no rule is no tab stop: met (`program-panel.tsx` `scrollToRule`, `tests/view/run-screen.test.mjs`). `rule-state-from-pick`: „Potem” is `ruleSigns(state).judgement.winner`, no second pick; „Teraz” of an action is `run.current`, set by the pick that started it; the D-147 exceptions are the only other sources. Met.
  - „Teraz” has no label word of its own (handoff's point): the task gives a label only to „Potem” (To do 1, Pytanie 2) and old Loop's row „Teraz” had none either (`old Loop, src/components/probe/NowLine.tsx:66-82` at `cdc7c0d`, only the idle text „Teraz: nic nie robi”). Not a finding.
  - „Potem” in the resolution minute names the ordinary winner (handoff's point from slice 3): that is what `rule-winning` shows in that minute, and D-335 makes „Potem” and `rule-winning` agree; a combat rule there would need a second judgement, which `rule-state-from-pick` forbids. Not a finding.
- To do 2 — order scene, „Teraz”, „Potem”, encounter paragraph, end lines, body row: `world-area.tsx`; test "the world area stands from the top …". Met.
- To do 3 — header order with no action; clock „Minuta {m}” / „ (pauza)” at every pause / stopped at the end in `text`; bar per requirement in order, fill in `text` on `highlight`, met in `positive` with name and numbers, after the end with the current streak: met, apart from I-1 (the face of the numbers).
- To do 4 — cells, notes under temperature and satiety in `text-secondary` at `--font-size-detail`, order „marznie” / „przy ogniu” / „nie stygnie” / „bez ognia {n} min”, „głoduje” / „bez jedzenia {n} min”, whole minutes rounded down by counting `bodyMinute`, from minute zero and after the end, whatever the Understanding holds: met (`src/browser/sim/body.ts` `minutesUntilChilled`, `minutesUntilStarving`, `needNotes`; `src/browser/view/body-row.ts`). Values 83/33/116/79/86 checked by the tests and by my own reckoning (Las cooling 0.024 °C/min: (37−35)/0.024 = 83.3; Las — głębiej 0.06: 33.3; satiety 70/0.6 = 116.7; 1.9/0.024 = 79.2; 52/0.6 = 86.7).
- To do 5 — rows of `now-lines.ts` and `now-rows.tsx` with `copy` (neither builds elements through the DOM API — read both); Roles table rows for the bar, `warning` in „Potem”, `danger` for „marznie”/„głoduje”, `text-secondary` for the notes; the template's table shape kept (WAY-170). Met.
- To do 6 — D-311 binding wording and its *Rejected* clause removed; D-122 and D-132 transitional sentences and *Verification*; `rule-state-from-pick` wording; D-39 and D-40 sentences; examples of D-62, D-135, D-178, D-57; plus the cycle's D-46, D-324, D-280 and D-291: each compared word for word with To do 6 and the projected wordings — met. D-133 is the projected wording with Settlements rows 5 and 6 added as one middle sentence; it says what the code does.
- *Settlements to record* rows 1–8: rows 1, 4 and 8 in D-334; row 2 in D-335; row 3 in D-336; rows 5 and 6 in D-133; row 7 in D-337. Each says what the code does.
- Context: the shape of the saved game does not change — `src/browser/sim/saved-game.ts`, `src/browser/sim/types.ts` and `assets/**` are untouched (`git diff --stat`). Trust boundary: none touched. Irreversible operation: none. Both hold.
- Reserved choices: none taken (no language, framework, library, store, login or place to run).

## Each slice without a review of its own

- Foundation entries (`bd44c39`): wordings as above; M-4.
- Slice 1 (`02e41f3`): roles match D-39/D-40 meanings; `danger` and `text-secondary` taken from meanings the log carries; M-3 left as the slice ordered.
- Slice 2 (`35f53cd`): one count of cooling (`minutesWithoutFire` now reads `minutesUntilChilled`); no loop without end (non-number and non-cooling guards). Own-work check holds; mutation run kills all 45 mutants of the new code in `body.ts`.
- Slice 3 (`e7e8a95`): see To do 1. The moved check in `tests/sim/encounters.test.mjs` is stronger (names the action of the next minute). Two surviving mutants, both equivalent (below).
- Slice 4 (`c60bd5e`): `solvingRequirements` in order, `meetsSolving` reads it (empty condition still true); 23 mutants killed. The executor's unopened reads do not show in the code.
- Slice 5 (`46e0ed9`): words and roles as the task gives; fixed height by CSS, guarded by the executor's browser look (D-88 puts layout in the browser).
- Slice 6 (`92f6860`): control built as rule-list rows (the orchestrator's ruling on D-44 matches the precedent of `rule-list.tsx:436-450`); scroll from the event handler, never an effect; focus by the one `:focus-visible` rule. M-1, M-5.
- Slice 7 (`0727fac`): every removed case of `tests/view/status-row.test.mjs` has its requirement moved: progress words to slice 8's cases and `tests/sim/completion.test.mjs`, combat through the resolution minute to `tests/sim/rule-signs.test.mjs` and `encounters.test.mjs`, the wait, causes and action words to `tests/view/now-lines.test.mjs`; changed expectations in `end-question`, `account-screen` and `run-screen` tests are equal or stronger (`assert.match` to `assert.equal`). Completion at „Minuta 480” is checked in jsdom only, which suffices for text.
- Slice 8 (`cb0212e`): I-1. Track length `8em` is a layout dimension (D-43); `--bar-width` thickness as the plan gave.
- Slice 9 (`730bc50`): notes and danger classes on the screen tested through the real stylesheet classes; the red reached by a composed state rather than by play is enough for a colour.
- Slice 10 (`434f32b`): two rows, table order kept.

## Checks

| Check | Command or method | Exit / result |
|---|---|---|
| Head | `git rev-parse HEAD` | `434f32bbbf74695181ab5de5add4137d989aaac2` |
| Build | `npm run build` | 0 |
| Focused tests (each after the build) | `node scripts/test-node-file.mjs <file>` for `tests/sim/body.test.mjs`, `rule-signs`, `completion`, `encounters`, `map-card`, `streak`, `tests/view/now-lines.test.mjs`, `world-area`, `run-screen`, `status-row`, `run-header`, `body-row`, `end-question`, `account-screen`, `program-panel` | 0 for each of the 15 |
| Invariants | `python -B scripts/test.py tests/invariants/<file>` for `test_browser_view_token_values.py`, `test_browser_view_framework.py`, `test_browser_view_focus_outline.py`, `test_design_token_contrast.py`, `test_design_token_sources.py`, `test_content_identifiers.py`, `test_simulation_inputs.py`, `test_simulation_isolation.py` | 0 for each of the 8 |
| Types | `npm run typecheck` | 0 |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 ("0 errors") |
| Formatter | `npx prettier --no-config --no-editorconfig --check` on the 25 changed `.ts`/`.tsx`/`.mjs`/`.css` files | 0 |
| Linter | `npx eslint --max-warnings 0` on the changed `.ts`/`.tsx`/`.mjs` files | 0 |
| Mutation (testing.md, "Mutation testing") | in a separate worktree of the head (scratchpad, removed after): `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/body.ts:107-187,src/browser/sim/game.ts:192-260,src/browser/sim/run.ts:401-447,src/browser/sim/map-card.ts:1-12"` | 0; 112 mutants, 110 killed (13 by timeout), 2 survived, score 98.43 % |
| Survivor 1 | `game.ts:232` `!run \|\| !signs` → `!run && !signs` | equivalent: `ruleSigns` returns null exactly when `state.run` is null |
| Survivor 2 | `game.ts:252` `current?.activity` → `current.activity` | equivalent in reachable states: outside combat and the end a map run always holds `current` (slice 3 report; `run.ts` `finishMinute` starts the next action in the minute the last ends); only hand-made view states set it null |
| Whole gate | `npm test` with no argument | not run, by the handoff: the orchestrator runs it after the review |
| Browser look | not run by me | the UI slices' executors looked (reports 07–11: action, wait, no winner, death, focus outline, scroll to the middle, header after death, Las — głębiej both requirements, body notes); I-1 is a static CSS fact the look would not change; M-5 is read from code and test |

The build wrote only `dist/`, which `.gitignore` ignores; the reviewed worktree's tracked files, index and branch are unchanged (`git status --short` empty).

## Reaches beyond the dispatch

- Foundation and guidelines selected for the whole change (parts browser-view, simulation, and agent-workflow for the guideline files): read whole `guidelines/styleguide-browser-view.md`, `guidelines/coding-browser-module.md`, `guidelines/coding-simulation-module.md`, `guidelines/coding.md`, `src/browser/AGENTS.md`; `guidelines/testing.md` lines 1-150 and 239-398 (the rest is the trust-boundary table and *AI in tests*, which this change, touching no boundary, does not reach). Every entry the change writes or changes read through its whole diff; D-43, D-44, D-46, D-47 read at their binding sentences; D-216 *Rejected* read; the task's *Decisions in play* read from the task.
- `old Loop, src/components/probe/NowLine.tsx` at `cdc7c0d` — to judge whether „Teraz” needs a label word and how old Loop's rows scrolled.
- `src/browser/view/rule-list.tsx:425-620` and `program-panel.tsx:370-395, 700-760` — to check `data-rule`/`data-group`, the folded group's undrawn rows and `shown` in `scrollToRule`.
- `src/browser/sim/world.ts` (`warmthAt`, imports) — no import cycle with `body.ts`.
- `src/browser/tokens.css` font-size and colour lines — size of the note and the bar's colours.
- Search of `foundations/`, `guidelines/`, `src/browser/` for „status row” / „wiersz stanu” / `statusText` / `run-header-status` — found M-1 to M-4; no code still calls `statusText`.

## Searches not found or unclear

- I did not read every decision whose *Scope* names browser-view or simulation whole: that is 282 of the 337 entries of `foundations/decisions.md`. I read the entries the task, the plan and the change name, and searched the log for „status row” and the touched words; an entry outside that selection that the change contradicts would not be caught by this review.
- `guidelines/testing.md` lines 151-238 not read (see above).
- No browser look of my own (see Checks).
