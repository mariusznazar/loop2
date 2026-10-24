# Planner report — cycle `ognisko-i-jedzenie`

- **Status:** done with concerns
- **Plan:** `.runs/task-cycles/ognisko-i-jedzenie/plan.md`
- **Size report:** `.runs/task-cycles/ognisko-i-jedzenie/plan-size.md` — the last run of
  `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/ognisko-i-jedzenie/plan.md`, exit 0:
  13 slices, every one `fits` (largest read: Slice 10, about 75 000 estimated tokens; most files:
  Slice 7, 10 — at the limit, not over it).
- **Check result:** the size script passed; nothing git tracks was changed (`git status --short`
  empty). Product tests were not run — no code was written; two read-only runs confirmed the check
  commands the slices name (below).

## Open design choice (section 2)

None found. Reading the code showed no entry the change needs beyond the task's rows, the projected
entries and the spec, and no way the code makes costly to turn back. Two entries follow from the
change rather than from a choice, and the plan places them in their slices: the part-map change
for the new invariant test (F24), and — only where the campfire icon's author is not Delapouite — a
change to the fact `game-icons-licence` (F23), which today names Delapouite alone
(`foundations/environment_facts.md:57-62`), while `icon-credits` rests on it.

## Order and the styleguide's example

The styleguide's example (`guidelines/styleguide-browser-view.md:277-284`, *Plan of a
user-interface change*): environment and library, values in their source, one screen, its states.
The plan follows it where the change touches the interface: the values in their source come first
(Slice 3, the content data — the screens read names and numbers from it), the asset next (Slice 10,
the icon, as the example puts the fonts before the screens), then one screen element at a time
(Slice 11 the status row and the body row, Slice 12 the drawing and the tile list), each with its
states (alive, dead; burning, extinguished; below a threshold). Departure: the simulation slices
(4–9) stand between the values and the icon, because the screens show state that only those slices
make; and no slice of tokens or shared controls exists, since the spec adds no token, role or
control.

## Guidelines found missing or uncertain

1. **Kitchen-sink page and a tile with a campfire — uncertain.** The styleguide's rule *The
   kitchen-sink page* (`guidelines/styleguide-browser-view.md:246-265`) asks for "próbki wyglądu
   kafelków w każdym stanie" and that "nowy stan albo nowa rola trafia na stronę w tej samej
   zmianie". Whether a tile holding a campfire's icon is a new state of a tile is not settled. The
   plan reads it as not new — the icon stands among the resource icons, in no new role — and does
   not change the page (last row of *Choices*). Proposed answer: keep it so; if you read it
   otherwise, Slice 12 gains `src/browser/kitchen-sink/kitchen-sink.ts` (7 files, still fits).
2. **New data files take no row in `guidelines/coding-content-data.md` — not a gap.** Its table
   *Files of this kind* lists today's six data files; the pinned template says a file added after
   the audit "takes no row until the guidelines are refreshed or extended"
   (`.the-way/product-guidelines/coding/template.md:164-174`). Named so the review does not take it
   for a miss.
3. **No guideline kind for tests** — `guidelines/coding.md:221-232` defers patterns of Node and
   Python tests; the slices that change only tests read `guidelines/coding.md` alone.

## Concerns

1. **The plan names the new files, where the spec leaves names of files to the maker** (spec,
   *Left to the maker*, first item). Without names, a later slice's *Change* and *Read* and your
   mechanical check could not name them: `src/browser/sim/data/items.ts`, `campfire.ts`,
   `traits.ts`; `src/browser/sim/body.ts`, `world.ts`, `character.ts`;
   `src/browser/view/body-row.ts`; and the new test files. Names of types, functions, fields and
   events stay the makers'. Listed under *Choices*.
2. **Files made by an earlier slice are named in the *Goal*, not in *Read*.** The size script
   reports a slice `unchecked` when *Read* names a file absent at the base, so the data files of
   Slice 3 appear in the goals of Slices 4–12 in backticks, not in their *Read*. When you build a
   slice's handoff, add those files to it as they stand then: Slice 4 — `data/balance.ts`,
   `data/maps.ts` (already in *Read*); Slice 5 — `data/traits.ts`, `data/items.ts`; Slice 6 —
   `data/campfire.ts`, `data/items.ts`, `sim/body.ts`; Slices 7–9 — `data/items.ts`,
   `data/campfire.ts`, `data/balance.ts`, `sim/character.ts`, `sim/world.ts`; Slice 11 —
   `sim/character.ts`, `data/items.ts`; Slice 12 — `data/campfire.ts`, `data/items.ts`; Slice 13 —
   the test files of Slices 4–9 as patterns.
3. **Two tests run past the mage's death that the spec's list misses.**
   `tests/invariants/test_simulation_isolation.py` asserts minute 400
   (`tests/invariants/test_simulation_isolation.py:642`) and
   `tests/invariants/test_terrain_drawing_numbers.py` drives 600 minutes (`:66`). Both are in
   Slice 2. Every program of today's closed list dies on Las in minute 243 by the task's numbers
   (worked out in the goals of Slices 1 and 2); the slices cut to 240.
4. **Three invariant tests claim "every kind"** — `test_map_run_repeatability.py:73`,
   `test_simulation_inputs.py:17-18`, `test_simulation_randomness.py:22` — and become untrue to their
   docstrings once the closed list grows; Slice 13 brings them up to the new list (the gathering
   stream included, which `simulation-randomness` should exercise).
5. **The join with task 11 is not a slice.** Task 11 had not merged at the base (`main` and
   `origin/main` at a945cf1; no fetch was made). If it has when you bring the branch up to date
   before the request, the join of spec Decision 2 needs a slice then.
6. **Slice 10 needs network access** to github.com/game-icons/icons and game-icons.net (and an
   archive copy of the page, as the four title facts have); the slice returns `blocked` without it,
   rather than take an icon elsewhere.
7. **Signatures kept for the tests.** `newMapRun` is called directly by eight test files
   (`tests/sim/actions.test.mjs`, `data`, `hex`, `layout`, `program`, `tests/view/tile-list.test.mjs`,
   `tests/invariants/test_simulation_inputs.py`, `test_walk_target.py`); Slice 5 keeps its arguments,
   a new one optional (in *Choices*).

## Reaches beyond the dispatch

- `.the-way/task-cycle/skill/SKILL.md:108-130, 195-306` — what a slice's handoff carries, how the
  foundation step and the plan's *Foundation entries* run, so the plan places F21–F24 rightly.
- `.the-way/task-cycle/change/SKILL.md` whole — what a slice's executor reads and may write
  (foundation entries through skills), so goals and *Read* fit it.
- `.the-way/task-cycle/slice_size.py:1-60` — the plan's parsed form and limits (10 files, 250 000
  tokens); a *Read* path must exist at the base.
- `.the-way/elements/common/foundation_check.py:1-54, 485-566` — a part-map pattern matching no
  tracked file is an error (why F24 is in Slice 13); new guideline rows are not checked.
- `.the-way/elements/common/way_of_working.md:58-95` *Reading the foundation* and
  `.the-way/product-guidelines/reading.md` whole — the selection method for *Read*.
- `.the-way/elements/invariants/template.md:60-80`, `.the-way/elements/invariants/skill/SKILL.md:70-76`
  and the-way's WAY-69 (`.the-way/foundations/decisions.md:1551-1569`) — an invariant's test may come
  with a later part of the same change.
- `.the-way/product-guidelines/coding/template.md:160-180` — rows of *Files of this kind*.
- `.the-way/gate/run_tests.py:1-60` — how one invariant test runs on its own.
- Decisions of the touched parts beyond the dispatch's list, by their *Scope*: D-03, D-38, D-40, D-42,
  D-47, D-48 (browser-view) — in the *Read* of Slices 11 and 12. D-06 and D-28–D-32 also name the
  parts; their content reaches the agents through `guidelines/coding.md`, so they are left out.
- Invariants `map-run-tiles`, `exploring-reveal`, `move-reach`, `browser-view-focus-outline`,
  `design-token-contrast`, `design-token-sources`, `browser-view-framework` — reached by tests the
  slices change or by the parts they touch.
- Code and tests read to cut slices: `src/browser/sim/*.ts`, `src/browser/sim/data/*.ts`,
  `src/browser/view/{app,status-row,tile-list,terrain-picture,terrain-panel,credits,footer,program-editor}.ts`,
  `src/browser/view/controls/number-field.ts`, `src/browser/kitchen-sink/kitchen-sink.ts` (imports),
  `package.json`, and the spans and lists of the tests under `tests/sim`, `tests/view`,
  `tests/invariants` (the closed-list tripwire `test_program_closed_lists.py:51-82`; the icon
  tables `test_icon_credits.py:63-78`; `rules.test.mjs:230-250` and
  `test_content_identifiers.py:1-40` for what counts as naming content).
- `.runs/task-cycles/ognisko-i-jedzenie/reports/base-npm-test.log` — the failures already on the base.

## Commands run

- `python -B -m unittest discover -s tests/invariants -p test_restart_seed.py` — exit 0 (2 tests):
  confirms the form the slices use to run one invariant test.
- `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier`
  — exit 0 (2 tests): ESLint and Prettier run alone; Ruff and ShellCheck, not installed here, are
  named in each slice that changes Python as checks that cannot run.
- `python -B .the-way/task-cycle/slice_size.py .runs/task-cycles/ognisko-i-jedzenie/plan.md` — exit 0,
  written to `plan-size.md`.

## Questions still open

None blocks the plan. For your review: concern 1 (file names) and guideline finding 1 (kitchen-sink),
each with the answer proposed above.
