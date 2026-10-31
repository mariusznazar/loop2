# Process remarks: searches not found or unclear

### spec, designer — `reports/01-spec-design-report.md`

- Whether `performance.now()` counts during system sleep: not looked up, and the design rests on no
  claim about it (spec section 6), so no environment fact is proposed.
- `python -B .the-way/elements/common/foundation_check.py --help` answered "git cannot run:
  [WinError 267]" from my shell. It was a look at the tool's options, not a run of the check; the
  check stays the orchestrator's gate.
- The content of the definition beyond what the frozen task quotes: not read, as the handoff allows.
- Handoff "Line numbers it cites in loop2 code are at `95de83b`": corrected in the spec's *Constraints*
  against `4ed8fcd`.

### spec, review — `reports/02-spec-review-report.md`

- The handoff says the spec has 423 lines; the file has 520 (`wc -l`). I reviewed the 520 lines
  whole, and they match the design report. Please confirm this is the spec meant.
- The handoff says the task has 385 lines; `wc -l` gives 384 and the Read tool 384 plus an empty
  last line. No text is missing.
- Whether loop counts a death's own minute in `minutes`: unclear, since its engine may not be read.
  `sim.test.ts:1812` only bounds the number. Section 11 counts it; to do 16 says "tyle, ile pętla
  przerobiła". Nothing visible rests on the difference of one.
- "The one-line check result" in the dispatch is not defined. I gave the review's result with the
  foundation check's line.
- The definition's full text: not read, as the handoff names only what the task quotes.

### plan — `reports/03-plan-report.md`

- `.the-way/task-cycle/implement/SKILL.md`, a path I guessed, does not exist; the cycle's skill is
  `.the-way/task-cycle/skill/SKILL.md`.
- A settled way to reach a solved map in a running game for a browser check: not found (concern 7).
- Whether a new module has to join a guideline's *Files of this kind*: unclear.
- The spec's words "the gain in the loop's `practice`" on a stopped line: unclear, settled as a choice.
- `tests/sim/saved-game.test.mjs:1687`, which the first note names, is the JSON round trip of the
  largest trip count; it uses `savedGame` on a state that needs stamping too, so it stays in the list.

### foundation entries — `reports/04-foundation-report.md`

- The handoff says "13 changed decisions" and lists 14 numbers; the plan's rows hold the same 14. I wrote all 14.
- The decision log has no list of withdrawn numbers, and D-222 was free.
- The word "save time" had no use in tracked files before this change.
- `moment of saving` stands in D-207 and D-208 only in the meaning the glossary's *Not* gives.

### slice 1 — `reports/05-slice1-report.md`

- A skill in the data that the one archetype lacks: there is none, so „skills by `characterSkills` for
  that archetype” cannot be tested with another archetype; the reading passes the owner's archetype as
  the manual run's does.

### slice 1, review — `reports/06-slice1-review-report.md`

- A test of a negative moment at the writer: not found, see I-1.
- Any path writing a document besides `sendNow` and `keep()`: not found.
- Another user of the old heading of D-189 ("Which current runs take equipment and pay loot?"): not
  found outside `.runs/`.
- A test outside `tests/sim` and `tests/view` that depends on the raise: not found.
  `tests/account-storage.test.mjs` and `tests/http.test.mjs` hold `version: 2` as data of the server,
  which reads no game.
- Spec section 13 is unclear on its own terms: `spec.md:302` gives "from 0 up" and `spec.md:318` gives
  "as it reads `resurrectionReadyAtMs`", which is any safe integer.

### slice 2 — `reports/09-slice2-report.md`

- none. (Unclear: the dispatch says the tests of loop bind where they cover a case; the engine of loop is
  not read, so only the cases listed in the dispatch were taken from their tests.)

### slice 3 — `reports/10-slice3-report.md`

- `tests/sim/rules.test.mjs` is not in `stryker.config.json`'s test list (not my slice's file; left alone).
- Spec section 14 is cut off in the handoff at "(source:"; I took the entry's value (60) and test from the plan's wording.

### slice 4 — `reports/11-slice4-report.md`

- none. Note: the handoff says the saver's `moment` option and `withSaveTime` were still to do; they were already in the code (earlier slice), so only the predicate and the sentence were added.

### slice 6 — `reports/13-slice6-report.md`

- Plan's *Read* mentions `status-row.ts`/`trip-lines.ts` as models; no pattern for moving focus after a removed control exists in the view besides `email-status.ts` (`button.focus()`); none for a heading target.
- Playwright screenshots can only be written under `C:\Storage\repos\loop2` (allowed roots); I moved them from there into the worktree's `.runs`.

### whole-change review — `reports/14-whole-review-report.md`

- A test of a second death covered in one catch-up: not found, M-4.
- A course with a second covered death under the real renewal of 480 minutes: 4,000 starts on Las —
  głębiej gave none, so M-4's evidence shortens the renewal in the data for that process.
- Slice 5's screenshots: not found, M-7.
- `guidelines/coding-browser-module.md` and `coding-simulation-module.md` do not list `away-report.ts`
  and `loop.ts` in their tables; those tables leave out other files too (`game-view.ts`, `trip.ts`), so
  this is no gap of this change.
- The word "stopped" in D-229 and the spec's section 11: unclear on its own, M-8.

### return step — `reports/16-return-step-report.md`

- `catch-up` against D-230: see *Concerns*, item 1.
- D-21, D-122 and `player-map-run-pace` say "a map run the player starts", and the player starts an
  earning loop's first map run with „Puść w pętlę”. The task keeps D-21 and D-122 as they stand, and the
  glossary's `manual map run`, D-222 and D-233 settle the reading, so no correction.
- A word for "the open game" (D-225, D-229): plain English here; it takes no entry.

### return step, review — `reports/17-return-review-report.md`

- Whether "count" in WAY-05 takes in a measured capacity estimate: unclear, see m-2.
- The human's conditions behind Q12's 10 and 8 (which program, which minute): not found in the task; the
  whole review says only that they were measured with a copy in the save.
