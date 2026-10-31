PASS 8949515fb5d138ab284c7e2b152458a375ba4819

# Review — Slice 2, A character has a generation and a resurrection, task `rozliczenie-przejsc`

Range `de432c6..8949515`, one commit. `git rev-parse HEAD` in the worktree is the given head. The
changed files are exactly the slice's *Change*.

Blocking findings: 0. Minor: 1. Out of scope: 1.

## Findings

### Critical

None.

### Important

None.

### Minor

**M1 — The comment over the test document names a moment it does not hold.**
`tests/sim/saved-game.test.mjs:442` says Ala "used her resurrection at a real moment of 2025", and
`tests/sim/saved-game.test.mjs:454` holds `resurrectionReadyAtMs: 1760000028800000`. As milliseconds
that is the year 57742 (`new Date(1760000028800000).getUTCFullYear()`). The value that fits the
comment, and the `T` of 1760000000000 the other tests use, is 1760028800000 (2025-10-09), the moment
plus 480 real minutes: the number was written with three extra zeros. It matters little today: the
value is a safe integer and the load admits it as spec decision 9 gives, so no check is weakened.
The cost is one wrong sentence in the document the guidelines name as the reader's example of the
current shape, and a later slice that adds a death to this document may take the number as it stands.

### Out of scope

**O1 — The case "two characters of one number" passes for a reason other than its name (Minor;
goes beyond this task, an unchanged line of commit `2923c3c`).** Place:
`tests/sim/saved-game.test.mjs:946`, guarding `src/browser/sim/saved-game.ts:499`. StrykerJS leaves
the removal of `ids.add(id)` alive. In a scratch worktree, with that line and its twin among the
programs removed, a document made by `savedGame` with two characters of number 1 loaded, and the
table's first failure was "two programs of one number", which stands after the characters' case, so
the characters' case stayed refused. Read from the code, not run on its own, the refusal comes from
`src/browser/sim/saved-game.ts:455`: the document's `pickedPrograms: { 2: 3 }`
(`tests/sim/saved-game.test.mjs:208`) names character 2, which the case's change removes. The product
refuses such a document today; only the protection of that refusal is thin. The line is neither the
slice's nor the task's.

## Declined to judge

- `src/browser/sim/saved-game.ts:507` admits a generation up to 2^53 − 1. A later growth by one would
  make a state its own load refuses. Nothing in this slice grows the generation, and such a value is
  forged, costing its own player alone (spec decision 9, D-07). It belongs to the slice that writes
  the settlement of a death.
- `resurrectionReady(character, NaN)` answers false. `src/browser/view/clock.ts` is the one reader of
  a clock and does not yet call the function; a later slice wires it.
- The renewal of the moment at a death, the growth of the generation and the link of
  `deathSettlement.generation` to it: later slices of the plan, not this one.
- Whether the examples in `guidelines/coding-saved-game.md` should name the new keys: outside the
  slice's *Change*.

## Against the task, the spec and the foundation

- To do 8, D-220: `createCharacter` gives generation 1 and moment 0, at `src/browser/sim/game.ts:279`
  and `:280`. `RunCharacter` is unchanged, and no code spreads a character into a run: the only
  literals are `game.ts:273` and `saved-game.ts:825`.
- To do 9, D-18: `resurrectionRenewalRealMinutes: 480` stands in `balance.ts`. The loop citations are
  right: read at `cdc7c0d`, `src/sim/data/balance.ts:125` is `revivalCooldownMinutes: 480`,
  `src/sim/death.test.ts:77`–`81` the equal moment, `src/sim/sim.test.ts:2002`–`2003` and
  `src/sim/roster.test.ts:18` the new character.
- To do 12, `resurrection-renewal`: `resurrectionReady` is `<=`, the moment included, with `nowMs` as
  an argument (D-04). This is the only comparison in the tree at this head. The invariant's other two
  clauses belong to later slices.
- `simulation-isolation`, `simulation-inputs`: no clock and no import added; the function changes
  nothing. `test_simulation_inputs.py` passes, and it calls a new export from its pool.
- `save-version`: the version stays 2. `main` holds 1, and no commit of `main` ever held 2
  (`git log main -G"SAVED_GAME_VERSION = 2"` empty), so the exception of `coding-saved-game.md` for
  rewriting the document holds, and the comment over the document says so. `DOCUMENT_V1` keeps its
  characters without the keys.
- `mutation-test-selection`, D-94: the new test file is listed, in order.

No invariant test was changed. No foundation entry is written or changed in this range.

## Trust boundary

`src/browser/sim/saved-game.ts:494`–`495`, `:507`, `:509`. Both keys are required through `fields`,
`generation` is read as `identity`, the moment as `integer`, and neither is filled in. I fed the
built load crafted values, as JSON text and as objects (see *Checks*):

- refused as `shape`: generation 0, −1, 1.5, `1e400`, `"1"`, null, true, `[1]`, `{}`, 2^53; a moment
  of 0.5, `±1e400`, `"0"`, null, false, `[]`, `{}`, ±2^53; a generation inherited from a prototype, a
  throwing getter, a bigint, a `Number` object as the moment;
- admitted, as spec decision 9 gives: a generation up to 2^53 − 1, a moment of any sign up to
  ±(2^53 − 1). A moment of −1500 saves and loads back. `-0` is admitted and costs nothing, since
  `<=` treats it as 0 and JSON writes it as 0.

## Irreversible operation

Nothing is performed on a server. The range touches no file under `deploy/`, `.github/`, nor
`compose.yaml` or `Dockerfile`, and `SAVED_GAME_VERSION` is not in the diff.

## Tests and the author's own-work check

The own-work check names the requirement where the slice is weakest, the boundary, and its check
catches it. I repeated it more widely in a scratch worktree: `generation` read as `count`, as
`finite(…, 1)`, and with `?? 1` filling in; the moment read as `finite`, as `count`, and not read at
all. Each turned `tests/sim/saved-game.test.mjs` red on the row its name gives.

Changed expectations have their cause: `tests/sim/team.test.mjs` names To do 8.

## Checks

All of these ran in a detached scratch worktree of the head, removed afterwards, except the three
marked `reviewed worktree`, which write nothing. The product's gate was not run: it is the
orchestrator's.

| Command | Exit | Result |
|---|---|---|
| `npm run typecheck` | 0 | |
| `npm run build` | 0 | |
| `node --test tests/sim/*.test.mjs tests/view/*.test.mjs` | 0 | 756 pass, 0 fail |
| `node --test tests/sim/death.test.mjs` | 0 | |
| `node --test tests/sim/data.test.mjs` | 0 | |
| `node --test tests/sim/team.test.mjs` | 0 | |
| `node --test tests/sim/saved-game.test.mjs` | 0 | |
| `npm test -- tests/quality/test_mutation_test_selection.py` | 0 | |
| `npm test -- tests/quality/test_node_test_selection.py` | 0 | |
| `npm test -- tests/invariants/test_simulation_inputs.py` | 0 | |
| `npm test -- tests/invariants/test_character_team.py` | 0 | |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree) | 0 | 0 errors |
| Prettier `--no-config --no-editorconfig --ignore-path .gitignore --check` on the nine changed files (reviewed worktree) | 0 | |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/game.ts:61-71,src/browser/sim/game.ts:273-282,src/browser/sim/saved-game.ts:166-181,src/browser/sim/saved-game.ts:484-513,src/browser/sim/data/balance.ts:32-37"` | 0 | 44 killed, 2 survived, 0 no coverage; `game.ts` 100% |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0` on the eight changed source and test files (reviewed worktree) | 0 | |
| Scratch script of crafted values against `dist/public/sim/saved-game.js` | 0 | as under *Trust boundary* |
| Six scratch mutations of the load, each followed by a build and `node --test tests/sim/saved-game.test.mjs` | 1 each, as intended | as under *Tests* |

The two StrykerJS survivors:

- `saved-game.ts:168`, `typeof value !== "number"` → `false`: equivalent, `Number.isSafeInteger` is
  false for every non-number. An unchanged line.
- `saved-game.ts:499`, `ids.add(id)` removed: a real gap on an unchanged line, finding O1.

`balance.ts` yields no mutant, as StrykerJS does not change numbers; `tests/sim/data.test.mjs` pins
the 480. StrykerJS ran on the changed lines and their helpers, not on whole files, which the guideline
allows.

Not run, and left unverified here: `npm test -- tests/invariants/test_simulation_isolation.py` and
`tests/invariants/test_minute_span_split.py`. The slice adds no import and no clock read and leaves
the passing of time alone, so neither tells this change apart from a broken one; both run in the
orchestrator's gate. The ad hoc StrykerJS scope also leaves the rest of `game.ts` and `saved-game.ts`
unmutated.

## Reaches beyond the dispatch

- `.runs/task-cycles/rozliczenie-przejsc/spec.md:161-183`, decision 7: why the moment admits any sign.
- `.runs/task-cycles/rozliczenie-przejsc/reports/08-slice1-review-report.md:202`: how Slice 1's
  review scoped StrykerJS, to scope mine the same way.
- `.runs/task-cycles/rozliczenie-przejsc/plan.md`, a search for `guidelines/`: whether a guideline
  change belongs to this slice; it does not.
- `tests/invariants/test_simulation_inputs.py` and `tests/invariants/test_character_team.py`: how they
  treat a new export and a character.
- `foundations/glossary.md`, `foundations/decisions.md`, `foundations/invariants.md`: only the
  ranges the selection names.

## Searches not found or unclear

- The check that refuses "two characters of one number" under the mutation of O1 was established by
  reading (`src/browser/sim/saved-game.ts:455`), not by a run of its own.
