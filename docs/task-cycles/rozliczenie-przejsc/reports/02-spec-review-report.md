FAIL

# Report — spec reviewer, task `rozliczenie-przejsc`

Reviewed: `.runs/task-cycles/rozliczenie-przejsc/spec.md`, against the frozen task, the entries the
handoff names, the guidelines, the code and loop at `cdc7c0d`. Read-only: this report is the one
file written. No gate run. `.the-way` matches its gitlink, `a8dfe8a`.
`python -B .the-way/elements/common/foundation_check.py` on the untouched worktree: 0 errors, which
says nothing of the spec, since its entries are not written yet.

The design itself holds: all five findings stand in the table *Foundation entries*, which the
foundation step writes from. Each is a contradiction with the foundation or within the spec, and
each is fixed by a row, or a clause of a row.

## Findings

### 1. The D-04 row marks the spec's own field, and task 18's, as a violation

Kind: contradiction with itself and with the task.

`spec.md:284`: “its *Verification* gains the headquarters line as complying and a moment kept in
the game state as violating”.

- Decision 3 (`spec.md:85`) puts `resurrectionReadyAtMs` in the game state, and decision 7
  (`spec.md:170`) says the renewal runs “because the state holds a moment, not a countdown”.
- The frozen task, Q11, ties this clock to “chwilę zapisu” of task 18, and task 18 keeps that moment
  in the game state: `_zadania/petla_zarobkowa_loop2.md:166` (“chwila leży w stanie gry”) and `:365`,
  row 13 (“a leży ona w stanie gry”).

Why it changes the build: written as it stands, *Verification* calls `Character.resurrectionReadyAtMs`
a violation, so every later agent comparing a change with D-04 has to fail this change or task 18.
What decision 7 rejects is narrower: the clock's current reading written into the game state on
each reading. The row should name that, and leave a stored moment of an event alone.

### 2. The change of D-04 does not reach D-03, which repeats the sentence

Kind: contradiction with the foundation.

`foundations/decisions.md:51`–`53`, D-03, *Rationale*: “The browser view draws the game only from
the game state and the game's content data and changes the game state only through functions of the
simulation (D-04)”.

The spec's row changes this sentence in D-04 alone, and D-03 stands neither in the table nor in the
list “Unchanged, read and still true” (`spec.md:296`). After the foundation step D-03 cites D-04 for
what D-04 no longer says. The table needs a row for D-03, to the wording D-04 takes.

### 3. The D-194 row leaves the sentence To do 11 makes false

Kind: contradiction with the foundation.

`foundations/decisions.md:3406`, the entry's body: “A death, or a run cut short by „Restart” or
„Zakończ” before completion, currently leaves the character’s practice and bought ranks as they
were.”

The task quotes this sentence under *Decisions in play*. `spec.md:287` gives what D-194 takes
(payment at the completion that first solves the map, the cost of row 2) and turns *Rationale*,
*Rejected* and *Verification*, and says nothing of it. To do 11 makes it false for a death without a
ready resurrection. A foundation author held to the row keeps it, beside a D-190 that says the
opposite. The row should say what happens to the sentence: the death part goes to D-190, the rest
stays.

### 4. The D-189 row names its sentences, and leaves a *Rationale* that says the opposite

Kind: contradiction with the foundation.

`foundations/decisions.md:3343`, D-189, *Rationale*: “The current run lifecycle spends equipment and
deposits completed loot alike for solved and unsolved maps; repeated manual completions therefore
pay too.”

`spec.md:285` speaks only of “the sentences of »What pays, and what takes from the chest?«”. The
D-194 row turns its *Rationale* in the open; this one is silent, and the old text is exactly what
the change undoes. The row should take the *Rationale* of the approved entry (the task's definition
passage, or `definicja_mvp_loop2.md:1452`–`1462` and what follows it) in place of the old one.

### 5. D-179 is listed as still true, and its *Verification* calls To do 5 a violation

Kind: contradiction with the foundation, and with the spec's own list.

`spec.md:296` lists D-179 under “Unchanged, read and still true”.
`foundations/decisions.md:3210`, D-179, *Verification*, violates: “a backpack filled beyond what the
chest held”.

On a marked run `takeFromNowhere` does that, as To do 5 requires and loop's test „wnosi także to,
czego w skrzynce nie ma” (`src/sim/chest.test.ts`) pins. The entry's body already carries the
exception; its *Verification* does not, so a review comparing this change with D-179 has grounds to
fail it. D-179 should move to the table, its example narrowed to a run that is no manual run of a
solved map.

## Answers to what the designer asked

- To do 16, „w minucie śmierci”, read as “in the step of the clock that reached that minute”:
  accepted. The store, the saver and the screen get one result, so nothing observes the death
  unsettled, and `minute-span-split` is left as it stands.
- The change of D-04 as a design: not a finding; the ways are weighed and the cost stated. It still
  has to be named in the request, as the designer's report says.
- Assumptions 1–4 of the designer's report fit the task's answers.

For the maker, not a finding: `tests/sim/trip.test.mjs:361`, marker `trip-run-end`, also changes
under To do 3 and 5, as its restart follows a completion. The spec's „among them” covers it; its
new expectation needs the requirement named, as `guidelines/testing.md`, *Changing an existing
test*, asks.

## Reaches beyond the dispatch

| What | Where | Why |
|---|---|---|
| D-03 | `foundations/decisions.md:39`–`55` | a search for D-04's sentence found it repeated there (finding 2) |
| D-180–D-182, D-184, D-193, D-195–D-198, D-202, D-209, D-210 | `foundations/decisions.md` | came with the ranges around the named entries |
| Searches of the decisions for „death”, „headquarters”, „from the chest”, „resurrect”, „generation” | `foundations/decisions.md` | an entry the change makes false that the handoff did not name |
| Search of the invariants for practice, rank, skill, clock, real time; `player-map-run-pace`, `action-in-progress`, `simulation-randomness`, `trip-plan-progress` by the ranges | `foundations/invariants.md` | the same |
| Whole file | `guidelines/coding-content-data.md` | the spec's claim that it holds no check for the number |
| `src/browser/AGENTS.md`; `src/browser/sim/types.ts:250`–`357`; `src/browser/sim/skills.ts:1`–`60`; `src/browser/styles.css:360`–`510`; `body-row.ts`, `status-row.ts` by search | worktree | the design's claims on keys, `newSkills`, roles and the place of the backpack |
| `tests/view/clock.test.mjs`, lines 1–140; `tests/view/account-screen.test.mjs:1170`–`1200`, `:1535`–`1590`; `tests/sim/skills.test.mjs:280`–`305`, `:525`–`575`; `tests/sim/trip.test.mjs:90`–`130`, `:173`–`200`, `:325`–`386`; `tests/sim/team.test.mjs:45`–`75`; `tests/sim/saved-game.test.mjs`, parts; `tests/invariants/test_simulation_inputs.py`, parts; docstring of `tests/invariants/test_minute_span_split.py`; `tests/sim/rules.test.mjs`, `completion.test.mjs`, `data.test.mjs`, `tests/view/headquarters.test.mjs`, `stryker.config.json` by search | worktree | the spec's claims on which tests change and which stay |
| `.the-way/elements/common/foundation_check.py`, by search, and one run of it | worktree | the fields and the `every` of *Part* the spec relies on; read-only |
| `.runs/task-cycles/rozliczenie-przejsc/reports/01-spec-design-handoff.md`, lines 1–60 | worktree | whether changing D-04 was left to the designer |
| `src/sim/death.ts`, `src/sim/death.test.ts`, `src/sim/data/balance.ts:118`–`130`, `src/sim/chest.test.ts:300`–`425`, `src/sim/skills.test.ts:445`–`490` | loop at `cdc7c0d` | W1 binds these; the task cites them |
| `_zadania/petla_zarobkowa_loop2.md`, by search, lines 57–66, 165–166, 279, 365–367; `definicja_mvp_loop2.md`, by search | vault | where task 18 keeps the moment it reads from this clock (finding 1) |

**Searches not found or unclear:**

- Whether `tests/invariants/test_simulation_inputs.py` fails on a new export it has no table entry
  for: `report.unknown` is filled and I found no assertion on it, so `settleDeath` and
  `resurrectionReady` should fall to the pool of values. Not run.
- No test the spec plans reaches from the clock's call after a flush to the rewritten line of the
  headquarters: `tests/view/headquarters.test.mjs` tests pure functions and `createHeadquarters` needs
  a DOM. The wiring is left to the maker, so this is no finding; `tests/view/account-screen.test.mjs`
  is where such a case could stand.
- `settleDeath` admits any safe integer, and that integer plus 28 800 000 can leave the safe integers,
  which the load refuses. `Date.now()` stops at 8.64e15, so the clock cannot reach it. No finding.
- The spec gives no Origin for the new decisions, and the frozen task does not name its vault file;
  the designer left this to the foundation step, and so do I.

During this review one read-only Python one-off printed foundation entries before I had read
`C:\Storage\The Brain\The Brain\.ai\rules\scripts.md`; it wrote nothing.
