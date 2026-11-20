# Planner report — zapas-i-wskrzeszenie

Status: done with concerns

- Plan: `.runs/task-cycles/zapas-i-wskrzeszenie/plan.md`
- Size report: `.runs/task-cycles/zapas-i-wskrzeszenie/plan-size.md` (last run of
  `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/zapas-i-wskrzeszenie/plan.md`,
  exit 1)
- Check result: 17 of 18 slices fit; Slice 18 is reported `too large` (227 718 estimated tokens),
  which no split can mend, since its one file, `tests/view/account-screen.test.mjs`, alone counts
  about 143 500. No code check ran: this stage writes no code.

## What the plan does

18 slices, in this order: two foundation slices (Slice 1 for the rules, Slice 11 for what the
screens say); the rule of the manual run of a solved map in the load (Slice 2, trust boundary) and
in the simulation (Slice 3); the measurement of To do item 6 at once after it (Slice 4), so that the
stop rule halts the cycle before the bulk of the work; the uses of the resurrection — a decoupling of
the view from the field (Slice 5), the shape and the rules with the load (Slice 6, trust boundary),
the tests of the load (Slice 7, trust boundary), the tests of death and completion (Slice 8), the
catch-up (Slice 9); the instrument (Slice 10); the view — the line at characters (12), the clock's
tests (13), the end window (14), the card of a map and the styleguide (15); the removal of the take
from nowhere (16); the screen of a run of a solved map (17); the page test (18).

No open design choice was found: every entry the change needs is a row of *Settlements to record*,
a projected entry or a decision the task names. No reserved choice: no language, library, store or
place to run changes.

The two questions the task carries to the cycle are placed where a slice's author makes them and
names them: the *Verification* of the new decision in Slice 1 (bounded by question 7 and the carried
question's text: no test pinning 20% for later maps, no 500-seed run of three maps in the gate), and
how the instrument builds the state of question 13 in Slice 4.

Where the slices cannot leave the tests of the touched parts passing, the plan says so in the slice:
after Slice 3 view tests that expect the old rule of a solved map's run (until Slices 14, 15, 17);
after Slice 6 every test that sets `resurrectionReadyAtMs` or expects one resurrection — in
`tests/sim/` until Slices 7, 8, 9, in `tests/balance/` until Slice 10, in `tests/view/` until
Slices 12–15, 17, 18. The foundation check reports, from Slice 1 until Slice 18, the `decision:`
lines that quote rewritten sentences and the references to the withdrawn D-251, each in a file a
later slice changes. No slice's *Checks* runs `npm test` without a file.

## Questions

1. **Slice 18 is too large by the script and cannot be split.** `tests/view/account-screen.test.mjs`
   counts whole (358 864 characters, about 143 500 tokens) in any slice that changes it, and the
   guidelines a change of a `browser-view` file requires (the styleguide, the browser-module, coding
   and testing guidelines) add about 88 000 more. Its changes are local: the version constants 7/6
   (lines 1893–1896), the state `renewing` (3238–3250), two tests of the resurrection line
   (3256–3330, 5144–5190), the settlement at 3229–3231, the test of the rehearsal mark
   (3126–3200) and `decision:` lines of D-189, D-217, D-240 and D-251.
   Proposed answer: accept Slice 18 as it stands — its goal tells its agent to edit by search, not
   to read the file whole — or make it yourself as the orchestrator. Evidence: `plan-size.md`, row 18.

## Concerns

- *Read* names, of the decisions that the altered tests quote by `decision:` lines, those the change
  rewrites and those that bear on each slice; it does not name every unchanged decision a large test
  file quotes (for example `tests/sim/death.test.mjs` and `tests/sim/catch-up.test.mjs` quote many),
  which step 2 of "Reading the foundation" asks for. Adding them all would push Slices 8, 9, 12 and
  14 over the limit; the orchestrator may add those it judges needed.
- `foundations/decisions.md` D-386 says "the moment the account's resurrection is ready" and the
  glossary term `generation number` says "because no resurrection is ready"; after the change the
  moment is that of the next use's return and "ready" means "with a use left". The task does not
  carry those entries, so the plan leaves them (*Choices*); Slice 1's author may name them as a
  question if it finds them stale.
- `game.ts` has 681 lines of code at the base against the 800 of D-425 (no function or file is over a
  threshold at the base: the run of `tests/quality/eslint-size-rules.mjs` printed "0 functions and
  files over a threshold in 323 files"; `advanceMinutes` has 143 lines of code). Slices 3, 5 and 6
  add to it; the plan keeps the rules there (*Choices*), with a move as the remedy if it crosses 800.
- Slice 4's measurement may take minutes (23 reference programs × 500 seeds × 3 maps, plus the
  building of each state); the slice commits no result.

## Guidelines found missing or uncertain

- No guideline says how a change touches a test file larger than one agent's reading: the root
  `AGENTS.md` asks for the whole styleguide before any `browser-view` file, `tests/view/**`
  included, so even a change of fixtures in `account-screen.test.mjs` cannot fit (Question 1), and
  every test-only view slice reads about 37 600 tokens of styleguide.
- `guidelines/testing.md`, "Trust boundaries", names the refusal cases of `saved-game.ts` one by one;
  it is uncertain whether the new refusals of Slice 7 must be named in that row. The plan does not
  add them; the review of Slice 7 may ask.
- The skills `the-way-maintain-styleguide` and `the-way-maintain-coding-guidelines` lead refinement
  with the human; nothing says outright that the cycle edits a guideline the task settles (the
  styleguide's Mapy and end-window sentences, the data bounds of `coding-saved-game.md`, the table of
  `coding-balance-instrument.md`) without them. The plan edits them in the slices of their subject,
  keeping each file's form (*Choices*).

## Order and the styleguide's example

The styleguide's "Plan of a user-interface change" orders environment and library, then values in
their source, then one screen, then its states. This change adds no environment, library, token or
screen; it changes texts and one mark of existing screens, so the view slices come after the rules of
the simulation they show and after the foundation slice of their texts, one screen's part per slice.

## Reaches beyond the dispatch

- `foundations/decisions.md`: D-425 (824–842), for the rule of size the method asks about; D-185–D-188, D-50, D-180–D-184 and D-307 (inside the ranges 8301–8546 read for D-179, D-183,
  D-189), D-241, D-243–D-250, D-409 (inside 8551–9039 read for D-239, D-240, D-242, D-246, D-251);
  D-212, D-218, D-221, D-326, D-327, D-368 located by heading and partly read, to name them in *Read*.
- `foundations/invariants.md`: save-version, catch-up-minutes, catch-up-death-moment,
  simulation-type-check, first-map-stock, first-map-balance, player-save-isolation and their
  neighbours (978–1087, 1148–1177, 1328–1367, 1438–1476), for tests the change alters.
- `foundations/glossary.md:130-306`, for the terms the slices use.
- `.the-way/elements/common/way_of_working.md` "Reading the foundation",
  `.the-way/product-guidelines/reading.md`, the docstrings of `foundation_check.py`,
  `slice_size.py` and `decision_index.py`, `.the-way/elements/decisions/skill/SKILL.md` and the head
  of `.the-way/product-guidelines/coding/SKILL.md`: to know what *Read* must carry, how quotations
  of decisions are checked and whether the maintain-skills apply in a cycle.
- `stryker.config.json` and `tests/quality/test_mutation_test_selection.py` (a new file of
  `tests/sim/` needs a row, which is why Slice 6 tests in `team.test.mjs`); `scripts/build.mjs` and
  the tsconfigs (the build checks types, so a change of `Team` must keep the view compiling);
  `scripts/test.py`, `scripts/test-node-file.mjs`, `package.json` scripts;
  `tests/quality/eslint-size-rules.mjs`; `tests/agent_workflow/test_loop2_balance_skill.py`.
- Code beyond the named files: `src/browser/sim/loop.ts` (370–610), `src/browser/view/maps-screen.tsx`
  (250–365), `src/browser/maps-screen.css`, and searches of `src/`, `tests/`, `balance/` for the
  identifiers, the `decision:` lines of the changed decisions and the `invariant:` lines of the
  changed invariants, to assign each altered test file to a slice.

## Working copies

- `.runs/planner/` held the decision
  index and its section list, line ranges of the decisions and invariants, the lists of quotations
  by file, the output of the size rule, an ESLint probe script that counted lines of code of the
  touched files, and two earlier size reports. Removed before return; nothing of it is needed beside
  this report.
- The rule of size was run in the task's worktree itself, which stands on the base `46cfec71` with no
  change of a tracked file, rather than in a separate worktree of the base; the run only reads and
  prints.

**Unread material:**
- `src/browser/sim/game.ts` — read lines 1–120, 250–360 and 560–896; not 121–249 and 361–559.
- `src/browser/sim/types.ts` — read lines 280–440 only.
- `src/browser/sim/saved-game.ts` — read lines 480–550, 764–890 and 1040–1090, and searched; the rest
  not read.
- `src/browser/view/end-window-lines.ts` — read lines 80–140 only.
- `src/browser/view/away-report.ts` — not read; searched only (its line `wskrzeszenie zużyte` at 86).
- `balance/*.mjs` — searched for the resurrection, `solvedMapRun` and the shared constants; read
  `balance/campaign.mjs:1-30` and `balance/loop.mjs:40-85`; the rest not read.
- The tests under `tests/sim/`, `tests/view/`, `tests/balance/`, `tests/invariants/` that name the
  resurrection, `resurrectionReadyAtMs`, `solvedMapRun`, D-251, `needResurrection` or
  `--no-resurrection` — found by search and sized; read only `tests/view/account-screen.test.mjs`
  lines 1880–1919 and 3215–3324, and the `decision:` and `invariant:` lines of all of them.
- The invariants that a test the change alters cites by `invariant:` — read those listed under
  "Reaches"; not every invariant cited in the large altered test files (for example
  `map-run-repeatability`, `minute-span-split`, `loop-run-knowledge`).

**Searches not found or unclear:**
- A precedent plan in this repository that changed `tests/view/account-screen.test.mjs` — the three
  earlier records under `the .runs/task-cycles/ directory of the main checkout, ` hold reports only, no plan.
- Whether `foundation_check.py` accepts a `decision:` quotation that is a prefix of a sentence: its
  docstring says the quotation must "begin one of its sentences" and "stand in" a binding sentence,
  read here as a prefix is enough; not tried.
