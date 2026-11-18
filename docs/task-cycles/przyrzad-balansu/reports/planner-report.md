# Planner report — przyrzad-balansu

Status: done with concerns

- Plan: `.runs/task-cycles/przyrzad-balansu/plan.md` — 10 slices, nine foundation entries (eight
  for the foundation step before Slice 1, the part map in Slice 2).
- Size report: `.runs/task-cycles/przyrzad-balansu/plan-size.md` — every slice `fits` (exit 0);
  the largest reading is Slice 2, about 89 000 estimated tokens, the most files Slice 3, 6.
- Check result: `slice_size.py` passed; nothing else ran — the planner changed no file of the
  product, so no test and no foundation check was run.

## Open design choice and reserved choice

None. The new part, its place and the reference programs' place are choices of how to make what
the task settles (Questions 1 and 3), written under *Choices* 1 and 2. The changes of D-29, D-32,
D-425 and of `eslint-source-rules`, `prettier-source-format` and `function-and-file-size` are no
choice: the task's *Context* puts the new `.mjs` files under ESLint and Prettier (handoff fact 4),
and those entries name the parts they reach, so the new part has to enter them. They are the
cycle's entries — no row carries them — so the request puts them before the human. No rule set,
option or threshold changes; D-29's clause that a change of its rule set needs the human's
acceptance is not touched. No library, store or place to run is added.

## How the handoff's facts were placed

1. D-80: read as the rule "Where the expected value comes from"; no slice cites D-80, and Slice 1
   says so.
2. The one-time comparison with the notes' instrument stands in Slice 8's *Checks*, run on the
   same commit with the notes' instrument pointed at the worktree's `dist/browser/sim`; the task's
   359 of 500 and median 754 come from an earlier commit and are reported beside it, not required.
3. Placing (*Choices* 1, 2): `balance-tools` claims `balance/**` and `tests/balance/**`, which no
   other pattern covers (`build-tools`: `scripts/**`, `tests/quality/**`; `simulation`:
   `tests/sim/**`, `src/browser/sim/**`). The reference programs stand in
   `tests/sim/reference-programs.mjs`, a file of `simulation`: the tests of `simulation` import it
   inside their own part, and the instrument imports it because `balance-tools` depends on
   `simulation`. No forbidden import results. `npm test` gets a new pattern, `tests/balance/*.test.mjs`,
   in `scripts/test.py`, because its patterns today select only `tests/`, `tests/sim/` and
   `tests/view/` (D-83, `node-test-selection`).
4. ESLint, Prettier and LF: Slice 3. Size: every slice of the part runs the size rule; Slices 2
   and 7 are told the notes' engine and campaign code must be divided where D-425 asks (the
   campaign function grows past 200 lines once Prettier wraps it).
5. Guidelines: Slice 4, through the two maintain skills read as files, the pinned procedures and
   their orchestrated mode named in *Read*. Foundation entries: the section *Foundation entries*.
6. No slice names the gate; the checks are `npm test -- <one file>`, the linter, the formatter, the
   size run and the foundation check.

## Concerns

1. **Known reports of the foundation check between the entries and the slices.** Every decision,
   invariant and glossary entry goes to the foundation step before Slice 1, because a slice that
   changes `foundations/decisions.md` must read the whole 1.27 MB file and is too large by
   `slice_size.py` (I tried it: Slices with that file in *Change* came out at 555 000 to 590 000
   tokens). The part map cannot come before Slice 2: its patterns must match a file git tracks.
   So for a while `foundation_check.py --skip-test-citations` reports: each *Scope* or *Part*
   naming `balance-tools` (until Slice 2), the `decision:` lines of D-378 in
   `tests/sim/acceptance.test.mjs` (until Slice 1), and the reworded `eslint-source-rules` and
   `prettier-source-format` with no citing file changed (until Slice 3). The plan names them under
   *Foundation entries*, and each slice's checks expect them. Proposed answer: accept; the review of
   Slice 1's range covers the entries with it. The other way, ordering a slice before the entries,
   is not one the cycle's dispatch allows (entries first, then slice 1).
2. **The plan names files of the author's notes by their relative names** (for example
   `przyrzad/silnik.mjs`, `programy/zrodla.mjs`, `polityki/skraj_dobowa_najlepsze.json`), never the
   absolute path. Each slice's *Read* says that the path stands only in the slice's handoff, which
   the orchestrator must add to Slices 1, 2, 5, 6, 7 and 8. The record's cleaning before it is
   committed has to turn those names into descriptions as well.
3. **Player descriptions:** only the three whose first map is Skraj lasu come (*Choices* 9). The
   notes' campaign sends its first map run to `loopMap`, by default Las, and the game refuses a send
   to Las before Skraj lasu is solved (`canSendMap`, `src/browser/sim/game.ts:88-96`), so the other
   eight describe a road the game no longer has. To do 2 names the player descriptions without a
   number; the carried question names only `skraj_*`.
4. **The acceptance test's case of every kind** (*Choices* 10): the best program of Las holds
   neither `hereBelow`, `campfireLeftBelow`, `awayFromCampfire` nor `feedCampfire` and `lightItem`,
   so the old list and the check that the program feeds cannot stand. The plan turns the case into
   a check that every kind of the program is on the closed lists, and drops feeding from the check
   of finished kinds. The new *Verification* of D-378 must therefore not name feeding; the
   foundation step words it.
5. **Map check runtime:** about 23 programs on each of three maps, 500 seeds each plus 100 loops of
   24 hours, an estimated few minutes per overlay from the notes' 1.3 s per 500 seeds on Las. Slice
   9 reports the time measured.

## Guidelines found missing or uncertain

- No kind of code fits the instrument. Its command line is an entry point, a kind D-28 defers; its
  measuring modules are like the scripts of `build-tools`, which have no kind either. Proposed: no
  new kind, the general `guidelines/coding.md` applies; Slice 4's coding skill judges it and says
  why in its report.
- `guidelines/coding.md`, "Linter": counts "pięciu części" — five parts — which becomes six.
- `guidelines/testing.md`: its table of parts has no row for the new part (To do 10), and the
  unit-test recipe's *Files* names only `tests/sim/` and `tests/view/`.
- `guidelines/coding.md` does not say how a tool that prints for a human names the things of the
  game. The task's rule — game words from the data — stands only in the handoff; the death causes
  have no words in the simulation's data (a search of `src/browser/sim/data/` for labels of cold,
  hunger and combat found none), so the table prints the identifiers the game state carries.
- The styleguide is not read: no slice touches a user interface, so its order-of-work example does
  not apply.

## Reaches beyond the handoff

- Decisions D-63, D-177, D-387, D-60, D-61, D-397, D-23 and D-121: located by heading, to name
  them in Slice 1's *Read*. Their ranges run to the next heading. I did not read their text.
- Invariants `first-map-balance` and `new-account-first-pass`: read, since Slice 1 changes their
  tests. `prettier-source-format`, `node-test-selection`, `catch-up-state` and `loop-run-knowledge`:
  located by heading for the *Read* of Slices 2, 3 and 6, not read.
- Tests: `tests/sim/new-account-first-pass.test.mjs`, `tests/sim/program-fixture.mjs`,
  `tests/sim/understanding-fixture.mjs` (programs to move, and the fixtures); `scripts/test.py`
  (Node test patterns); `tests/quality/eslint-size-rules.mjs` (head, how the size run takes its
  files); `tests/quality/test_quality_invariants.py` (Prettier patterns, by search);
  `tests/agent_workflow/test_loop2_play_skill.py` and `test_loop2_deploy_skill.py` (heads, the
  pattern of a skill's test); `.gitattributes`.
- Code: `src/browser/sim/data/maps.ts` whole; `src/browser/sim/game.ts:85-130`, `:440-505`
  (`canSendMap`, `send`); `src/browser/sim/types.ts:60-92`; `src/browser/sim/run.ts:340-360`;
  exported function names of `game.ts`, `loop.ts`, `run.ts`, `skills.ts` and `trip.ts`, by search.
- the-way: `task-cycle/skill/foundation_step.md`; the header of
  `elements/common/foundation_check.py` (what it reports: unknown parts, unmatched patterns,
  quotations of decisions); `task-cycle/skill/SKILL.md:380-459` (how the plan's entries and slices
  are dispatched) and `:684-733` (cleaning of the record); `product-guidelines/reading.md`; the
  header of `task-cycle/slice_size.py`; `task-cycle/record_template.md`, by search.
- The author's notes, at the path the handoff gives: the instrument's `README.md`,
  `przyrzad/balans.mjs`, `przyrzad/silnik.mjs`, `przyrzad/sprawdzenie_zgodnosci.mjs`,
  `przyrzad/programy.mjs`, `przyrzad/slad.mjs`, `programy/zrodla.mjs` whole,
  `przyrzad/kampania.mjs:1-140` and its function list, two player descriptions; the critique's
  `README.md` (first 80 lines), its three overlays, the names of its programs and the exports of
  `przyrzad/wspolne.mjs`.

**Unread material:**

- From `src/browser/sim/`, I read the signatures of the functions the notes' instrument calls
  (`newMapRun`, `stepMinute`, `send`, `advanceMinutes`, `settleDeath`, `startLoop`, `catchUp`,
  `stopLoop`, `buyBranch`) and the body of `send` and `canSendMap`. I did not read the bodies of the
  others, or `loop.ts`, `skills.ts` and `trip.ts` beyond their export lists.
- `src/browser/sim/data/`: only `maps.ts` was read whole. `balance.ts` and `scene.ts` were not
  read, and the other data files only by search.
- `.claude/skills/loop2-play/SKILL.md`: lines 1–60 of 294.
- Everything else the handoff names was read whole: the decisions named, as whole entries; the
  invariants named; `foundations/part_map.md`; `foundations/glossary.md`; `guidelines/coding.md`;
  `guidelines/coding-simulation-module.md`; `guidelines/testing.md`, in two parts;
  `tests/sim/acceptance.test.mjs`; `tests/sim/first-map-balance.test.mjs`; `scripts/build.mjs`;
  `scripts/test-node-file.mjs`; `package.json`; `eslint.config.mjs`;
  `tests/quality/test_source_tool_scope.py`; `AGENTS.md`.

**Searches not found or unclear:**

- Whether npm prints its banner to standard output on `npm run`: not checked. Slice 8 runs the
  command with `--silent` and checks that the output reads as JSON.
- Whether a module of the simulation reads a data table once, when it loads, so that an overlay
  could not reach it: not searched. *Choices* 6 and the skill name this limit, and Slice 5's test
  shows that a changed number reaches a map run.
- Words for the death causes in the simulation's data: none found (see above).
- That the foundation check reports a *Scope* naming a part the map does not have, and a pattern
  that matches no file: taken from the script's docstring, not run.
- The program `BEST_PROGRAM` of `tests/sim/new-account-first-pass.test.mjs` has the same rules
  and groups as the best program of Las in the notes. The first-map test's naive and decent
  programs have the same rules as the notes' naive and decent programs of Las. Only the trip plans
  differ: the notes' decent and best programs bring everything out, and the tests' programs bring
  nothing. I found this by comparing the text by eye, not with a script; Slice 1's one-time count
  checks it.

## Working copies

- `.runs/planner/` of the worktree held two extracts of foundation entries made for reading
  (`dec2.txt`, `inv.txt`). `.runs/planner_headings.txt` held a list of the decision log's heading
  lines, written by a stray redirect directly under `.runs/`, outside my directory. Both were
  removed; `.runs/` now holds only `orchestrator/` and `task-cycles/`.
- `.runs-npm-ci.log` at the worktree's root is untracked and not mine: it stood there before this
  stage.
</content>
</invoke>
