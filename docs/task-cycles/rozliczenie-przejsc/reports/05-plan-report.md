# Plan report — task `rozliczenie-przejsc`

**Status: `done with concerns`**

- Plan: `.runs/task-cycles/rozliczenie-przejsc/plan.md`
- Final size report: `.runs/task-cycles/rozliczenie-przejsc/plan-size.md`
- Check: `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/rozliczenie-przejsc/plan.md`
  exit 0, all five slices `fits`. Nothing else ran: no slice's *Checks*, no gate. No code, test or
  foundation entry was written and nothing was committed.

## The cut

| Slice | Goal | Files | Estimated tokens | Risk | Model |
|---|---|---|---|---|---|
| 1 | A manual run of a solved map neither pays nor takes; version 2 | 7 | 109001 | trust boundary · cannot be undone | cheaper |
| 2 | A character has a generation and a resurrection | 9 | 94178 | trust boundary | cheaper |
| 3 | A death is settled once, on the browser's clock | 8 | 153495 | trust boundary | same |
| 4 | The map-run screen's lines | 4 | 65662 | none | cheaper |
| 5 | The headquarters' lines, the clock's moment and call | 7 | 96934 | none | cheaper |

The foundation is no slice: the method gives its entries to an agent of their own before Slice 1
(`.the-way/task-cycle/skill/SKILL.md:256`–`:258`), so the plan lists them under *Foundation entries*.

How the handoff's constraint is met: each rule of the load lands in the slice that makes it true, so
at every head the game saves only what its load admits. `deposited` at a marked completion comes with
the payment in Slice 1. The refusal of an unsettled death comes in Slice 3 with `settleDeath` and the
clock's composition, which cannot stand apart: a state between them would play a death its next load
refuses. Slices 2 and 3 rewrite the test document at version 2 under the exception the comment at
`tests/sim/saved-game.test.mjs:36`–`:38` already states.

## Step 2: open design choice

None. Reading the code found no entry beyond the task, the projected entries and the spec, and no
way that is costly to turn back. The spec's citations were checked against the code and tests at the
base and hold: `tests/sim/skills.test.mjs:284`, `:537`; `tests/sim/trip.test.mjs:95`, `:109`, `:333`,
`:361`; `tests/sim/team.test.mjs:53`; `tests/view/account-screen.test.mjs:1179`, `:1546`.
`foundation_check.py` requires a marker to name an entry and does not require an entry of *Method*
`test` to have a marker, so entries written first pass it.

## Concerns

1. **The foundation settles no route for the screenshot.** `.the-way/task-cycle/change/ui_check.md`
   asks for a screenshot of the running product "by the route its foundation settles", and with none
   settled for the states checked in code and the screenshot marked unchecked. D-87 says a changed
   appearance "is inspected in a browser" and D-88 that real browser checks are manual; neither names
   a way there, and an unconfigured server answers account routes with 503 (D-111), so the game does
   not start locally without a full account configuration.
   - Taken in the plan: the harness route of the cycle `plan-wyprawy` (commit 1b09f80,
     `docs/task-cycles/plan-wyprawy/cycle.md`, row Q12, and `reports/author-report.md:104`–`:117`): an
     ignored harness over the real `createGameView`, served from `dist/public/`.
   - Left as it is, that is, with the screenshot marked unchecked: the two screens of this change
     reach review unseen, and D-87 is not met.
   - Cost of the harness: a file under `.runs/` per slice, and the way through an account stays
     unobserved, which each view slice has to say in its report.
   - Proposed answer: keep the harness. It is the orchestrator's to overrule in the plan's review.
2. **Expected values the spec does not name also change**, each with its requirement in the slice's
   *Checks*. Slice 1: `tests/sim/saved-game.test.mjs:555` and the crafted completions at `:914`–`:945`,
   whose map run is on `forestDeep` and `solvedMaps` lacks it, so the new rule would refuse them for
   the wrong reason; and `:496`, `:603`, `:611`–`:618`, which use 2 as "another version". Slice 3: `:547`,
   `:766`, `:865` and „a death in combat” at `:1271`. Spec section 10 says "among them", so this is no
   departure; a crafted case refused for a reason other than its name would stop protecting anything,
   which is why the *Checks* say so.
3. **Three slices touch the trust boundary, so three get a review of their own.** The rejected single
   shape slice would not save one: its load rules would either refuse what the branch still saves or
   stand loose across slices, and a further slice would touch `saved-game.ts` anyway. Each review is
   short: the first brings two keys' rows, the second two, the third one.
4. **Slice 3 is the widest.** It holds class `same` with its reason. Should it prove too large, its
   natural seam is `restart` (spec decision 6), which needs `deathSettlement` to exist and could stand
   as a slice after it.

## Guidelines found missing or uncertain

- `guidelines/coding-content-data.md`: no rule for validating a number of `BALANCE`; a data test pins
  it, as the handoff says and the spec settles.
- `guidelines/coding-browser-module.md`, *Files of this kind*, omits `src/browser/view/game-view.ts`
  and `src/browser/view/trip-lines.ts`, which this change touches; its *Examples* speak of the first.
- `guidelines/coding-simulation-module.md`, *Files of this kind*, omits `src/browser/sim/trip.ts`.
  Neither omission changes what is read, since *When to read* goes by directory.
- `guidelines/testing.md`, *Not tested on purpose*, says a changed appearance is looked at in a browser
  without a route; see concern 1.
- `guidelines/coding-saved-game.md`: nothing missing. The plan leaves it unchanged (*Choices*), the
  choice the spec left to the maker.

## Order and the styleguide's example

The example (`guidelines/styleguide-browser-view.md`, *Plan of a user-interface change*) goes
environment and library, values at their source, one screen, its states. The plan departs from its
first steps because this change has none of them: no font, token, shared control or role (spec,
non-goals). It starts instead with the simulation the screens read, since the lines of Slices 4 and 5
have nothing to draw before Slices 1–3. From there it follows the example: one screen, then the next,
each with its states checked in that slice.

## Reaches beyond the dispatch

- `.the-way/product-guidelines/reading.md` and `.the-way/elements/common/way_of_working.md:50`–`:87`:
  the method names them for *Read*; read to select entries and guideline files.
- `.the-way/task-cycle/skill/SKILL.md:236`–`:275`, `.the-way/task-cycle/skill/planning.md`: how the
  plan's entries and slices are dispatched, to place the foundation before Slice 1.
- `.the-way/task-cycle/change/ui_check.md`: what a view slice has to show. Named in Slices 4 and 5.
- `.the-way/elements/common/foundation_check.py`, searched for its marker rule.
- `src/browser/AGENTS.md`: repository instruction for `src/browser/`. Named in every slice.
- `foundations/decisions.md`: D-87, D-88 read whole, the opening of D-111, for the view route. Named by
  heading for slices, from the task's quotations and the log's headings, not read whole here: D-56,
  D-94, D-147, D-183, D-196; `foundations/invariants.md`: `player-map-run-pace`,
  `mutation-test-selection`, `browser-view-token-values`, `browser-view-focus-outline`.
- Commit 1b09f80, `docs/task-cycles/plan-wyprawy/cycle.md` and `reports/author-report.md`, for the route.
- `README.md`, `.gitignore`, `scripts/test.py`, `package.json`, for commands and ignored paths.
- Tests read to name what changes: `tests/sim/saved-game.test.mjs`, `tests/sim/trip.test.mjs`,
  `tests/sim/skills.test.mjs`, `tests/sim/completion.test.mjs`, `tests/view/account-screen.test.mjs`,
  `tests/view/clock.test.mjs`, `tests/view/trip.test.mjs`, `tests/view/headquarters.test.mjs`,
  `tests/invariants/test_simulation_inputs.py`, in part.
- `C:\Storage\repos\loop` at `cdc7c0d`: only that the commit and three test files exist. The slices name
  these sources without backticks, so the size script does not count them: their *Read* is that much
  larger than `plan-size.md` shows.

## Searches not found or unclear

- A route for the screenshot in the foundation and guidelines: not found (concern 1).
- `screenshot|zrzut|playwright` in `C:\Storage\repos\loop2\.runs\task-cycles`, the two local older
  cycles: no match. Found instead in the archived cycle at commit 1b09f80.
- The spec's report, which the handoff says names the natural cuts: not opened; the handoff's sentence
  was taken as it stands, and the cut matches it but for the split of Slice 2 from Slice 3, which the
  limit of 10 files forces.
- Tests beyond those named that complete a map twice, or send to a solved map and assert the chest, the
  backpack or practice: a search of `solvedMaps` and `restart(` found only those in the slices. That is
  a search, not a run: a further test may fail in Slice 1, which would be a change outside its *Change*.
- `test_simulation_inputs.py` calls an exported function its table does not name with a pool of values,
  so the new exports need no change there. Read in part; Slices 1–3 run it.

## Questions

None waits. Concern 1 holds the one point for the orchestrator's review, with its proposed answer.
