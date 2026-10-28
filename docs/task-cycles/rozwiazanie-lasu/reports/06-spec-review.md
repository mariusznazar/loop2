FAIL

# Spec review — `rozwiazanie-lasu`

- Spec: `.runs/task-cycles/rozwiazanie-lasu/spec.md`
- Task: `.runs/task-cycles/rozwiazanie-lasu/task.md` (read whole)
- Method: `.the-way/task-cycle/spec/SKILL.md`, step 3, and `review.md` beside it (pinned the-way `3aee7d9`)
- Worktree head: `c0c51a0`, code read as it stands

One finding. Everything else in the spec I could build from without guessing. The five carried
questions are each answered, and the answers agree with the task, the named foundation entries
and the code.

## Findings

### 1. The streak in the game minute of death: the spec changes the task's rule

Spec, decision 5, `MapRun.streak`: "In the game minute of death it is left as it stood; nothing
reads it there."

The task says otherwise. To do 4 says: „po kroku ciała minuty gry, w której postać nie traci
zdrowia z zimna ani z głodu, passa rośnie o jeden, a minuta z taką utratą ją zeruje”. The game
minute of death is always a minute with such a loss. Health falls only for being chilled or
starving (D-60; `src/browser/sim/body.ts:65`–`69`), so health reaches zero (D-61) only in a minute
of loss. By the task, the streak is 0 in that minute. The task's *Context* also cites loop's test
for exactly this case (`src/sim/sim.test.ts:555`, `cdc7c0d`): „w chwili śmierci z zimna albo głodu
bieżąca passa jest zerem”.

Why it matters for the build. Test expectations come from the accepted task (D-80, D-82). A maker
who writes the case "a minute with a loss to cold or hunger sets the streak to zero" from To do 4,
and lets that minute be the minute of death, gets a test that contradicts the spec. The maker then
has to choose between the spec and the task. The value also stays in the game state that task 16
will save, and task 14 or 18 may read it. A run ended in death would then hold a non-zero streak,
which would claim successive minutes without a loss that the last minute broke.

What would resolve it: in the game minute of death, the streak also becomes 0, since that minute's
body step reports a loss. In `minuteBeforePick` the death branch already has the body step's
result. Alternatively, if the spec keeps its reading, it must say why it departs from To do 4. As
it stands, the task does not allow that reading.

## Checked and found sound (no finding)

- Pace in the game state (decision 1): agrees with D-04 (the view still passes real elapsed time,
  and the selected button is drawn from the game state). It survives `send`, `restart`, `end` and
  `setPaused`, as row 2 requires, and `newGame` gives 1×. `setPace` leaves the pause and the
  discovery alone, as To do 1 and question 13 require. The clock is flushed before a change, as for
  the pause and the editor (`src/browser/view/game-view.ts:53`–`56`, `:91`–`94`).
- Carry (decision 2): the claim that the carry from earlier passes is used up in the first minute
  of a call is right. It holds because the carry is under 1000 scaled ms, and `passRealTime`
  turns every 1000 scaled ms into a minute (`src/browser/sim/game.ts:509`–`511`). So "drop the
  whole carry" and row 4's "rest of the real time passed in the same call" are the same amount. The
  reading across a change of pace is stated, with its worked example (500 ms at 1× + 31.25 ms at
  16× = 1000 scaled ms).
- Solving condition (decision 3) and texts (decision 4): the opener is kept outside `solving`, and
  a requirement of beaten attacks can be added as a field, which meets the carried question for
  task 8. The whole `completionText` in the data covers names of any grammatical gender.
  `content-identifiers` holds, because no map name or identifier is written outside
  `src/browser/sim/data/`.
- Completion placement (decision 5): the check comes after `minuteBeforePick` and after the
  minute's discovery, at the place of the pick, with no pick even in a free minute. This agrees
  with To do 5, row 5 and D-71. It also agrees with `program-rule-pick` (by the glossary, a free
  game minute is one at which the map run goes on) and with `action-in-progress` (the map run
  ends first). Every present reader of `run.death` that means "the run has ended" is on the
  spec's list (`game.ts:501`, `:514`, `:539`, `:580`; `run.ts:324`; `status-row.ts:41`, `:51`).
  `understanding.ts:168` reads `death` itself and runs before the completion check, so the
  predicate does not change it.
- A completion in the minute of a discovery: the discovery is kept and the game is not paused, and
  `restart`/`end` clear the discovery (`game.ts:338`, `:472`). This agrees with row 4 ("chyba że
  się w niej skończyło"), row 12 and To do 5.
- Zeroing on an edit: the spec compares the whole program, rule and group identities included, so
  „↑” on the first rule (no commit) and a no-op drop leave the streak, while moving a rule zeroes
  it. This agrees with row 6. The identity counters change only together with an added rule or
  group (`src/browser/view/program-editor.ts:40`, `:295`), so including them zeroes no edit that
  leaves the program the same. The D-123 rule written at the first chill falls in a chilled
  minute, where the streak is already 0.
- Counts after a completion (row 14): no code clears them at the end of a run (`game.ts:254`–`294`,
  `:335`), so a completion keeps them without new code, as the spec says.
- `minute-span-split` (row 13) and `map-run-repeatability`: the streak, the completion and the
  solved maps change only inside the minute loop, from the run, the map's data and the program, so
  any split of a span gives the same state.
- Screens (decision 6): match To do 1, 5, 6, 7 and 8 and questions 12, 13 and 16. The shared
  selected button exists (`src/browser/view/controls/button.ts:41`–`47`), and `--positive` is
  already a token (`src/browser/tokens.css:28`).
- Foundation entries: the list covers rows 1–14, the three glossary terms the task writes,
  `manual map run` (which the task brings in by WAY-126) and the part of `streak-program-change/1`
  that this task makes true. It leaves the entries for task 8 and task 18 to those tasks.
- Existing tests: `tests/sim/data.test.mjs:177` stays valid, because `gameMinutesPerRealSecond`
  stays 1. The spec's rule for scenarios that reach 480 minutes without a loss is general. Other
  long scenarios (for example `tests/sim/discovery.test.mjs:94`, `tests/sim/program-counts.test.mjs:289`,
  `:300`) fall under the same rule, so the spec's "may" list needs no extension.

## Reaches beyond the dispatch

- `.the-way/task-cycle/spec/review.md`: the reviewer's instructions, which step 3 of the method
  names.
- `src/browser/styles.css` and `src/browser/tokens.css` (grep for `positive`, `status-text` and
  `discovery-text`): files of `browser-view` outside `src/browser/view/**`. I searched them to
  confirm the spec's claim that no new token or role is needed.
- `src/browser/sim/run.ts` and `src/browser/sim/body.ts`, plus a grep of `src/` for `.death`: all
  under the dispatch's `src/browser/sim/**`. I name them because they show which readers of `death`
  the ended-run predicate must replace, and that health falls only through cold or hunger
  (finding 1).
- `src/browser/view/controls/button.ts` and `src/browser/view/program-editor.ts` (lines 30–50,
  270–300 and 610–720): under `src/browser/view/**`. I read them for `setButtonSelected` and to
  check which editor acts change the identity counters.
- `tests/sim/data.test.mjs:170`–`180`, `tests/sim/acceptance.test.mjs:1`–`130`, and a grep of
  `tests/sim`, `tests/invariants` and `tests/view` for long spans: I read them to check the spec's
  claims about existing tests.
- Not read: the definition `definicja_mvp_loop2.md`, the loop repository, and the-way's glossary.
  The task quotes every passage this review relied on, and no the-way term needed a definition.
