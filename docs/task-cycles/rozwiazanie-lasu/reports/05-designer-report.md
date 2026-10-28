# Designer report — spec of `rozwiazanie-lasu`

- Status: done
- Spec: `.runs/task-cycles/rozwiazanie-lasu/spec.md`
- Method: `.the-way/task-cycle/spec/SKILL.md` and `design.md` (pinned the-way `3aee7d9`)

## Questions sent and their answers

None. Each of the five carried questions had a way that the task, the foundation and the code as
it stands settle without an assumption that changes the design; the spec weighs the ways and
records the choice. Two readings the spec had to fix are written down in it rather than asked
(check 4 below): what "the program differs" means for the zeroing of the streak, and at which pace
carried real time counts after a change of pace.

## The carried questions and the ways weighed

1. **Where the chosen pace stands** — spec decision 1. Chosen: a field `pace` of the game state,
   set by a simulation function `setPace`, applied by `passRealTime`; the list of paces in
   `balance.ts`. Rejected: the view scaling real time before `passRealTime` (the simulation would
   take scaled time for real time, D-04's verification ties compliance to the view passing the real
   time elapsed, `player-map-run-pace` could not be tested on the simulation, and task 18's earning
   loop would get the same scaled time); the pace held by the view and passed as an argument (the
   view would draw the selected button from a value outside the game state, against D-04, and task
   16 would not save it).
2. **Shape of the solving condition** — spec decision 3. Chosen: a field `solving` of the map's row,
   an object of named requirements, today `streak: 480`, met when every requirement it holds is met;
   task 8 adds a requirement of beaten attacks as a field, and the opener as a field of the row
   beside it. Rejected: a list of `{ kind, … }` requirements (admits duplicates and a meaningless
   order, one more level for no named case); flat fields like loop's `survivalMinutes` (no single
   place for "the condition").
3. **The text after a completion** — spec decision 4. Chosen: the whole `completionText` in the
   map's data („Las rozwiązany”), since its ending agrees with the name in gender and form; the
   condition sentence stored without the name and shown as „{name} — {solvingText}”; „Mapa: {name}
   · rozwiązana” composed by the view, since „rozwiązana” agrees with „Mapa”. Rejected: a pattern
   „{name} rozwiązany” (wrong for feminine and neuter names); a gender field (more machinery, still
   awkward for multi-word names such as „Las — głębiej”); the sentence with the name in data (the
   name twice in a row).
4. **How the run holds streak and completion, the game state solved maps** — spec decision 5.
   Chosen: `MapRun.streak` and `MapRun.completion` (beside `death`), one predicate of an ended map
   run, the completion checked in the minute loop of `advanceMinutes` at the place of the pick after
   the minute's discovery, an event `mapRunCompleted`, `GameState.solvedMaps` as a list; the body
   step reports a loss to cold or hunger so that combat wounds (task 8) can leave the streak.
   Rejected: one `end` field replacing `death` (churn in every reader of `death` for no needed
   behaviour); the completion inside `minuteBeforePick` (its event would precede the minute's
   `discovered`, against D-71's place of the pick); the streak in the game state (it belongs to a
   map run); solved maps as a keyed record (same meaning, loses the order loop kept).
5. **Whether a discovery drops carry from earlier passes** — spec decision 2. Answer: yes, the whole
   carry is dropped, as the code already does; and it is the same quantity as "the rest of the real
   time passed in the same call" of row 4, because the earlier carry is under one game minute, is
   used up in the first minute the call makes, and a call that reaches a discovery has made at
   least that minute. The existing test's expectation of a carry of zero after a discovery holds
   under both readings. The spec also settles that the carry is a fraction of a game minute, so real
   time counts at the pace in force when it was passed; the rejected way, converting unscaled carry
   at the next call's pace, would turn half a second spent at 1× into eight game minutes after a
   switch to 16×.

## The four checks

1. Placeholders, `TBD`, empty sections: none found.
2. Contradictions: none found between sections. Checked against the foundation: `program-rule-pick`
   speaks of free game minutes, and the glossary's free game minute is one at which the map run goes
   on, so a completion that picks nothing breaks it no more than death does; `action-in-progress`
   already allows the map run to end first; D-04 holds with the pace in the game state.
3. Scope: the task joins two largely independent changes — the fast-forward (pace in the game
   state, `passRealTime`, the pace buttons) and the solving of Las (streak, completion, solved maps,
   their texts). They meet in the new wording of `player-map-run-pace` (row 4: "unless it ended in
   it") and in the status row. A plan can make them as two slices, the fast-forward first; the task
   settles them together and the spec does not split the task.
4. Requirements readable two ways, and the reading picked:
   - "a program after which it differs" (row 6): deep inequality of the program as the game state
     holds it, identities and counters included — „↑” on the first rule leaves the streak, swapping
     two rules of the same content zeroes it;
   - the streak of a map run that has ended: an edit leaves it, since the screen stands on the state
     of the last minute (D-62);
   - the streak in the game minute of death: 0, since that minute's body step reports a loss to
     cold or hunger (To do 4; revised after the spec review, see `07-designer-revision-report.md`);
   - `setPace` without a map run or on an ended one: it sets the pace and nothing else;
   - real time across a change of pace: counted at the pace in force when passed;
   - where the condition sentence stands in the headquarters: with the map in each character's row,
     solved or not.

## Reaches beyond the dispatch

- `src/browser/styles.css` (grep for `positive`, `status-text`, `discovery-text`, `selected`) and
  `src/browser/tokens.css` (grep for `positive`) — to confirm that the role `positive` already has a
  token and that the selected button already has a rule, so the spec adds no token, role or control.
  They are files of `browser-view` outside `src/browser/view/**`.
- `src/browser/view/game-view.ts` and `src/browser/view/controls/button.ts` — read under the
  dispatch's `src/browser/view/**`, named here because the dispatch named other files of it: the
  wiring of the status row to the clock and `setButtonSelected`.
- `src/browser/sim/run.ts`, `src/browser/sim/body.ts`, `src/browser/sim/understanding.ts`
  (lines 150–175) — under `src/browser/sim/**`: the minute order, the body's loss and the discovery's
  reading of death.
- `tests/sim/acceptance.test.mjs` (head) and `tests/sim/time.test.mjs` (head) — to see which
  existing scenarios run 480 minutes and how time tests build their state; the spec names them in
  *Left to the maker*.
- The definition `definicja_mvp_loop2.md` and the loop repository: not read; the task quotes every
  passage the spec relies on.
