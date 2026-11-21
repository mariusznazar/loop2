# Planner report — ocena-programu-na-ziarnach

- **Status:** questions
- **Plan:** `.runs/task-cycles/ocena-programu-na-ziarnach/plan.md`
- **Size report:** `.runs/task-cycles/ocena-programu-na-ziarnach/plan-size.md` (last run of
  `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/ocena-programu-na-ziarnach/plan.md`,
  exit 1)
- **Check result:** 12 of 13 slices fit; Slice 12 (`tests/view/account-screen.test.mjs`) is too
  large, about 219 000 estimated tokens against 150 000, and cannot be split (question 1).
- **Base:** `c36e2739883002af2b959b787eb0880b748fd7e5`; `.the-way` at
  `19e5774aed6d1d628042e23deccc110ed9f112c0`, the commit the gitlink records.

## The plan in short

Foundation entries (11 rows: the two new decisions, the changes of D-243, D-329, D-325, D-241,
D-246, the sentence of D-22, D-190's rationale, the glossary terms „judging” and „loop record”),
then 13 slices:

1. the local start's test takes a port that cannot collide (*To do* 13) — Python, no game file;
2. one cutting of source text in `test-helpers`, part map following (*To do* 12) — Python, no game file;
3. the simulation judges a program on the twelve seeds (data, `types.ts`, new `judging.ts`);
4. the remembered judgings in `GameState` and the save — trust boundary;
5. the loop record counted in an earning loop and saved — trust boundary;
6. one raise of the saved game's version with the new document of `tests/sim/saved-game.test.mjs`,
   and the measured room of the remembered judgings against 64 KiB — trust boundary;
7. the act of a judging, the mark at the list „Program:” and what erases a remembered judging
   (new `judging-record.ts`, `game.ts`, `programs.ts`, `loop.ts`);
8. the balance instrument's default cap from the built game (*To do* 11);
9. the styleguide (*To do* 10), through `the-way-maintain-styleguide`;
10. the button of a judging and its result in „Kto idzie”;
11. „Puść w pętlę” judges first, the second click, the same-result rule;
12. the page tests of `tests/view/account-screen.test.mjs` follow 10 and 11;
13. the loop record in the report „Gdy cię nie było”.

The orchestrator's remarks: (a) *To do* 13 is Slice 1; (b) the 64 KiB check is a measurement in
Slice 6, reported with bytes per remembered judging and totals for 5 characters × 20 programs × 3
and × 10 maps; (c) Slices 1 and 2 touch only `build-tools`, `test-helpers`, `simulation`'s and
`balance-tools`' Python tests and the part map, and depend on no game slice. The trust boundary
`src/browser/sim/saved-game.ts` is in Slices 4, 5 and 6, each marked; no slice touches
`src/browser/sim/previous-programs.ts`.

## Open design choice

None found. Reading the code showed no entry the change needs beyond the 13 rows, the projected
entry and the styleguide, and no reserved choice (no language, library, store, login or place to
run).

## Questions still open, with proposed answers

1. **Slice 12 cannot fit the size limit.** `tests/view/account-screen.test.mjs` is about 352 000
   characters, so the script counts about 141 000 tokens for it alone, and with the guidelines a
   test of `browser-view` must read (`guidelines/coding.md`, `guidelines/styleguide-browser-view.md`,
   `guidelines/testing.md`) the slice reads about 219 000. The file must change: its cases click
   „Puść w pętlę” on a program that does not solve Las (`solvedAla()` builds on `twoPrograms()`),
   e.g. the case „„Puść w pętlę” puts the character into an earning loop at once …” at
   `tests/view/account-screen.test.mjs:2972`, and after Slice 11 such a click judges first and waits
   for „Puść mimo to”. A split does not help: a slice that moved those cases into a new file would
   change the same file and count it whole too.
   - Proposed answer: accept Slice 12 above the limit, as the plan sets it — one file changed, the
     smallest reading the guidelines allow, model `same`, the agent told to reach the cases by search
     rather than read the file whole.
   - What it costs: one slice whose executor may run long; if refused, the plan has no other route,
     since any slice that edits that file reads over the limit by the script's count.
2. **A red test file across three slices** (a choice, written under *Choices*, for the review of the
   plan): `tests/sim/saved-game.test.mjs` fails from Slice 4 until Slice 6, because one slice holding
   the whole new shape reads about 185 000 tokens. Slices 4 and 5 test their load in new files
   (`tests/sim/saved-game-judgings.test.mjs`, `tests/sim/loop-record.test.mjs`), and Slice 6 raises
   the version together with the document, the pair `guidelines/coding-saved-game.md` asks for.
   - Proposed answer: keep it; no slice's check runs that file in between.

## Concerns

- Slices 10 and 11 stand near the limit (about 141 000 and 146 000 tokens), and their executors also
  read `src/browser/sim/judging.ts` and `src/browser/sim/judging-record.ts`, which Slices 3 and 7
  create. *Read* cannot name a file that does not exist yet (the script would leave the slice
  `unchecked`), so the plan names those files in the *Goal*. The same holds for Slice 7, which reads
  Slice 3's `judging.ts`. The real reading is a few thousand tokens above the measure.
- The Foundation entries carry a constraint written under their table: each changed decision keeps
  word for word every passage a test quotes, where the new meaning allows. About 20 test files quote
  D-241, D-246, D-22, D-329 and D-243 in lines `decision:`. Where a writer cannot keep a passage, the
  slices that change the quoting files follow it (5, 10, 11, 12, 13). A quoting file outside every
  *Change* would surface only at the foundation check of the gate.
- D-251 is withdrawn (`foundations/decisions.md:11716`, by task 24), though the task and the handoff
  name it as standing. *To do* 10 compares the note of the stock with „the warning of D-251”; Slice
  9's goal says the rule must not name D-251 as a decision it rests on.
- `game.ts` stands at about 725 lines of code by my count (the limit of D-425 is 800). Slices 4 and 7
  add only calls, and the judging's code goes to new modules. The worktree has no `node_modules`, so
  I could not run `tests/quality/eslint-size-rules.mjs`. I counted lines without blanks and comments
  myself, which is close to but not exactly the ESLint count.

## Guidelines found missing or uncertain

- `guidelines/testing.md`, "integration test", *Time and randomness*: "Porty procesów serwera
  wybieraj zgodnie z D-49". D-49 covers a test that starts the loop2 server. Its case of the local
  start, where `scripts/local-start.mjs` picks the ports itself, is not stated. That is why Slice 1
  stops and returns if the fix would need a change of that trust boundary.
- `guidelines/coding-simulation-module.md`, *Files of this kind*: the new modules `judging.ts` and
  `judging-record.ts` will have no row. The browser-module guidelines say a file added after the last
  audit of the table has no row and is no exemplar. The simulation-module file does not say so, so
  whether a row is owed is uncertain.
- `guidelines/styleguide-browser-view.md`, "States of shared controls": loading is defined only for
  a wait for the server. *To do* 10 changes that, and it is Slice 9's work, not a gap left open.

## Order against the styleguide's example

The example ("Plan of a user-interface change": environment and library, values in their source,
one screen, then its states) is followed only in part. No environment, library or token value
changes. The styleguide's roles come first (Slice 9), then the one screen (Slice 10), then its
further states (Slice 11), with the simulation before all of them, since the screen draws from it.

## Reaches beyond the dispatch

- `.the-way/task-cycle/skill/foundation_step.md` whole, `.the-way/task-cycle/skill/SKILL.md:430-469`
  and `.the-way/task-cycle/skill/planning.md` whole: to learn who writes the plan's *Foundation
  entries*. They showed that one agent writes them before Slice 1, which led to the constraint on
  quoted passages.
- `.the-way/product-guidelines/reading.md` whole: which guideline files a slice's *Read* must carry,
  for example the styleguide for a test file of `browser-view`.
- `.the-way/task-cycle/slice_size.py:1-70` (docstring and limits): how the size is counted.
- Decisions beyond those the handoff named, by `decision_index.py` and by range: D-425, D-49, D-431,
  D-256, D-432, D-56, D-221, D-240, D-245, D-207, D-208, D-104, D-386, D-407, D-44, D-274, D-287,
  D-38, D-39, D-40, D-167, D-168, D-427, D-428 (located and their binding sentences read in the
  index; whole only where noted below), for the *Read* of the slices that touch them.

## Working copies

- `.runs/planner/` held the
  section list and the decision index `decision_index.py` wrote (`sections.md`, `index.md`). I
  removed it before return. No worktree, clone or screenshot was made.

## Unread material

- Decisions the task names, read in the index (binding sentences only, no rationale or
  *Rejected*): D-239, D-189, D-179, D-249, D-170, D-409, D-165, D-206, D-07, D-18, D-437. Read whole:
  D-243, D-329, D-325, D-241, D-246, D-22, D-190, D-326, D-327, D-328, D-242, D-244, D-245. D-251 is
  withdrawn.
- Invariants the task lists. Read whole: trip-transfer, save-version, catch-up-state,
  loop-run-knowledge, instrument-game-agreement, local-start-access, cross-part-imports. Known only
  from the task's quotation or by heading: map-run-repeatability, simulation-randomness,
  simulation-inputs, simulation-isolation, content-identifiers, balance-instrument-repeatability,
  balance-instrument-file-writes.
- Code, read in part for slicing:
  - `src/browser/sim/game.ts:420-729`;
  - `src/browser/sim/loop.ts:1-420`;
  - `src/browser/sim/types.ts:300-501`;
  - `src/browser/view/away-report.ts:1-60`;
  - `balance/engine.mjs:1-35` and searches;
  - `tests/invariants/test_local_start_access.py:490-559` and searches;
  - `tests/sim/loop.test.mjs:232-253`;
  - `tests/sim/saved-game.test.mjs:68-87`;
  - `tests/view/account-screen.test.mjs:2960-3008`;
  - lines of `tests/view/headquarters-screen.test.mjs` and `tests/view/uncaught-failure.test.mjs`.
- Code known only from their exports or searches: `run.ts`, `trip.ts`, `saved-game.ts`,
  `programs.ts`, `state-store.ts`, `balance/trace.mjs`, `balance/campaign.mjs`, and the four lexer
  copies of *To do* 12 (their functions and constants located).
- Code read whole: `src/browser/view/maps-screen.tsx`, `src/browser/view/maps-entry.ts`,
  `src/browser/view/counted-name.ts`, `src/browser/sim/data/balance.ts`.
- Not opened: `src/browser/view/trip-lines.ts`, `src/browser/view/now-lines.ts`. Their roles are
  given by the task's *Context*.
- Guideline files the handoff names: all read whole (`coding.md`, `coding-simulation-module.md`,
  `coding-saved-game.md`, `coding-browser-module.md`, `coding-content-data.md`,
  `coding-balance-instrument.md`, `styleguide-browser-view.md`, `testing.md`,
  `src/browser/AGENTS.md`).
- Also read whole: the part map and the glossary.

## Searches not found or unclear

- D-251 as a current decision: not found; withdrawn (`foundations/decisions.md:11716`).
- `decision_index.py --decision 243` gives "no decision 243"; the switch needs the form `D-243`.
- Whether `foundation_check.py` holds a `decision:` quotation as a passage that must stand word for
  word in its entry: unclear from what I read; the plan assumes so.
- The ESLint count of lines of code of `game.ts`: not obtainable, since the worktree has no
  `node_modules`; counted by hand instead.
- Whether the case of `tests/invariants/test_local_start_access.py` can take its port without a
  change of `scripts/local-start.mjs`: unclear without diagnosis; left to Slice 1, which returns if
  not.
