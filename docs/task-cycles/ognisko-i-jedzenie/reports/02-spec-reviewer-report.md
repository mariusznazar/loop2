FAIL

# Report — spec reviewer, cycle `ognisko-i-jedzenie`

- Spec reviewed: `.runs/task-cycles/ognisko-i-jedzenie/spec.md`
- Method: project skill `the-way-write-spec`, review role (`.the-way/task-cycle/spec/SKILL.md`, § 4),
  pin 86b78ad
- Read against: the frozen task `task.md` whole; the designer's report; the foundation entries the
  handoff names, each whole (D-04, D-18–D-27, D-39, D-41, D-44; the 18 invariants; the glossary
  terms; part map `simulation`, `browser-view`, `product-foundation`); the guideline files the
  handoff names, each whole; the code at a945cf1 the spec cites.
- Grades: the spec method sets no scale, so findings take the scale of `review-change`
  (Critical / Important / Minor). Findings: Critical 0, Important 2, Minor 0.

## Findings

### 1. Important — a campfire or a burning stick on an unrevealed tile: *To do* 15 cannot be met, and the spec leaves the case to the maker

- Where: spec, *Left to the maker*, bullet "How a campfire or a burning stick on a tile not yet
  revealed is drawn and listed; the tile list has rows for revealed tiles only"; *Decisions*,
  Decision 1 step 5 (crafting and lighting a stick have no condition on the tile being revealed);
  *Constraints*, readings 4 and 5.
- What is wrong: the task's *To do* 7 and 10 put no condition of a revealed tile on "Wytwórz —
  ognisko" or "Zapal — patyk", and the character does stand on unrevealed tiles ("Wędruj" prefers
  them; a walk passes over them). *To do* 15 requires the campfire's icon "na swoim kafelku" and its
  state "w wierszu kafelka w liście odsłoniętych kafelków", and a burning stick seen "tylko w tym
  wierszu". In the code at a945cf1 the list has rows only for revealed tiles
  (`src/browser/view/tile-list.ts:42`, `.filter((tile) => tile.revealed)`) and the drawing puts
  icons only on revealed tiles (`src/browser/view/terrain-picture.ts:62`). So for a campfire built on
  an unrevealed tile no reading of the spec meets *To do* 15 as written, and the maker has to choose
  among ways that differ in kind, not in detail:
  - (a) crafting and lighting a stick infeasible on an unrevealed tile, as gathering is (*To do* 5) —
    a rule of the simulation the task does not state, which changes program outcomes and the
    acceptance program;
  - (b) a row in the list and an icon on the drawing for an unrevealed tile that holds a campfire or
    a burning stick — the list stops being the list of revealed tiles (D-19's wording), the row's
    stock columns for an unknown tile must be blank or would show what the player has not
    discovered, and the drawing's `tile-hidden` ("Tego miejsca jeszcze nie znasz", D-41) would carry
    an icon;
  - (c) nothing shown until the tile is revealed — *To do* 15 dropped for that case: the player does
    not see a fire the mage built and stands at.
  The bullet places the choice with the maker under "drawn and listed", which steers toward (b) or
  (c) and rules out (a) silently; (a) is a choice of the simulation, which the spec, not the maker,
  must make.
- Why it matters: the three ways give different products; (a) changes what a program can do on
  every seed, (b) changes the meaning of a view element that D-19 and D-41 name, (c) leaves a task
  requirement unmet. The designer saw it (report, point 5) but the spec does not settle it.
- Question for the orchestrator, with my recommendation: which of (a), (b), (c)? I recommend (a) as
  the smallest reversible reading that fulfils *To do* 15 in every case it can arise: it keeps the
  list and the drawing as D-19 and D-41 define them and mirrors the gathering rule the task already
  has, at the cost of one feasibility condition per action that the request must name to the human
  as a choice of the cycle. Cost of a wrong answer: under (a), a program that crafted after wandering
  passes to its next rule instead; under (b) or (c), a view change or an unmet requirement found at
  the human's review of the request.

### 2. Important — a feeding started at a burning campfire can be carried out and add nothing: behaviour the task does not ask for

- Where: spec, Decision 1 step 5 ("An effect takes hold where what made its action feasible at its
  start still holds. … where its campfire has burnt out by step 3 of the minute feeding ends, the
  feeding uses nothing and adds nothing"); Ways weighed, way A, "Weak point".
- What is wrong: the task says "„Zasil — ognisko” trwa 5 minut i dokłada 20 minut palenia za 1
  patyk; da się je wykonać tylko przy płonącym ognisku na kafelku postaci" (*To do* 9), and row 14
  says "każde zasilenie płonącego ogniska dokłada minuty palenia do tych, które mu zostały, ile by
  ich było". Under the spec, a feeding the program picks while the campfire has 5 minutes of burning
  left or fewer is feasible (the campfire burns), lasts its 5 minutes and adds nothing: with r
  minutes left at its start, step 3 of the 5th minute leaves r − 5, so every feeding with r ≤ 5 is
  void. A natural program rule "Zostało mniej niż 5 min — ognisko → Zasil — ognisko" therefore never
  feeds at all; "mniej niż 6" feeds only by luck of which free minute it holds in. That is an
  outcome the task's text does not foresee, and its ground in the spec — that the other way would be
  a cheaper lighting than "Zapal" — is the spec's own concern, not one the task or row 8 raises (row 8
  sets the price of "Zapal", not of feeding).
- Ways the spec did not weigh, each keeping the task's sentence: (i) the feeding lands on the
  campfire it started on whatever its state at the end, adding 20 to the minutes left, 0 included
  ("ile by ich było") — the campfire can stand cold for up to 4 minutes and then burn again for one
  stick; (ii) the fuel goes in when the feeding starts and the 5 minutes are the time it takes — the
  one action whose effect lands at its start, against the spec's general rule that pieces leave the
  backpack at the end.
- Why it matters: the rule decides whether ordinary programs keep a fire alive, which the
  acceptance test and task 7's resolution of Las rest on, and the player meets it as an action that
  silently does nothing. A wrong guess here is cheap in code but reaches the human only at the
  request, unnamed.
- Question for the orchestrator, with my recommendation: keep the spec's rule, or take (i) or (ii)?
  I recommend (i): it reads the task's two sentences as written, needs no rule beyond "the feeding
  adds its minutes to its campfire", and leaves the price of lighting from cold to "Zapal" in every
  case but a fire that went out during the feeding itself. If the spec's rule is kept, the ruling
  and its weak point go into the cycle record and the request names the behaviour to the human.

## Checked and found sound

- The three open choices are each settled with ways weighed and costs: the minute's order
  (Decision 1), carrying capacity and the join with task 11 (Decision 2), the numbers of the
  conditions (Decision 3).
- *To do* 1–15, the acceptance criterion, Q6–Q12, Q15, Q16, the 15 rows of *Settlements to record*
  and the two projected entries the task writes (D-25 with gathering, D-26 with the campfire
  sentence) are kept, not redesigned; each row reappears in *Foundation entries* with its kind.
- The order reproduces the task's numbers: chilled from minute 84, starving from 117, death of cold
  at 243 for an empty program on Las (recomputed); a campfire lit with 60 minutes warms 60 minutes;
  a stick warms 3 minutes; death cuts an action short and is not a free game minute, so
  `program-rule-pick`, D-20 and `action-in-progress` hold as the task's *Context* reads them.
- Reading 1 (acceptance program draws on the whole closed list) holds: the entrance is not
  revealed at the start (`src/browser/sim/layout.ts:30`), so without "Eksploruj" no tile can be
  gathered from.
- Renewal at multiples of the renewal time matches loop's tests (`movement.test.ts:189`–`:230`,
  `renewResources` over a span of minutes).
- Decision 2 agrees with task 11's frozen task (*To do* 6: "cechę dołącza do postaci w drużynie
  cykl zadania 4, który scali się drugi") and its cycle record (Q1), and covers the other order of
  merges.
- Decision 3 fits the shared number field (`src/browser/view/controls/number-field.ts` takes `min`,
  `max`, `step`) and replaces the editor's single range (`program-editor.ts:34`, `:59`) and the
  check's whole-number test (`game.ts:67`).
- The proposed decision wording follows the human's rule for MVP candidates (opens "In the MVP", no
  excluding word); the trust boundary (`assets/icons/**`) and the icon's credit and environment
  fact are covered; no new token, role or shared control.

## Reaches beyond the dispatch

- `.the-way/task-cycle/review/SKILL.md`, § 3 Grade (lines 86–99) — for the names of the grades, which
  the spec method does not give and the orchestrator asked for.
- `C:\Storage\repos\loop2-wt\siedziba-i-druzyna\.runs\task-cycles\siedziba-i-druzyna\task.md` and
  `cycle.md`, searched for "udźwig", "carrying", "trait", "cech" — to check Decision 2's claims about
  task 11's *To do* 6 and its Q1.
- `C:\Storage\repos\loop\src\sim\movement.test.ts:185`–`:232` and a search of loop's
  `src/sim/data/` for "renew" (tests and data files the definition lets tasks read) — to check the
  spec's claim that loop renews at multiples of the renewal time.
- `src/browser/sim/layout.ts`, `src/browser/sim/hex.ts` (`nearestTile`),
  `src/browser/view/program-editor.ts:25`–`:184`, `src/browser/view/controls/number-field.ts`, and a
  search of `src/browser/view/tile-list.ts`, `src/browser/view/terrain-picture.ts` for "revealed" and
  of `tests/invariants/test_simulation_inputs.py` for the stream names — code the choices depend on,
  for readings 1 and 7, finding 1 and Decision 3.
- `.runs/task-cycles/ognisko-i-jedzenie/cycle.md` — to see whether the orchestrator had already ruled
  on the designer's five points (it had not).

## Checks

No product command was run: the spec review is read-only and the spec stage has no code.
`npm test` and `python -B .the-way/elements/common/foundation_check.py` did not run in this review;
the base results are the orchestrator's (`reports/base-npm-test.log`, cycle record *Verification*).
