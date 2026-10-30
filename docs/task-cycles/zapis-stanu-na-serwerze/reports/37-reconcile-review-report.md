FAIL f7d8234

# Review — reconciliation with the target branch, task `zapis-stanu-na-serwerze`

Range `a2d89bf..f7d8234`: `a20e1d4` (renumbering), `765fb3b` (merge of `origin/main` `e5025f6`),
`932da64`, `3f64a7b`, `f7d8234`. The worktree's `HEAD` is `776acbc`, one commit past the head given;
the dispatch names `f7d8234..776acbc` as another reviewer's range, so this review judges
`f7d8234`, checked out in a scratch worktree for every run.

## Findings

### Critical

None.

### Important

**I-1 — A trip count the game accepts from the player makes the whole saved game load as damaged.**
(blocking; from `932da64`)

- Place: `src/browser/sim/saved-game.ts:246-247` (`program`: `identity(entry.count)` over both trip
  lists) and `src/browser/sim/saved-game.ts:270-280` (`tripList`: `identity(read.count)`, used for
  `bringPlan` at `:859` and `deposited`); the comment at `:240-241` and the guideline
  `guidelines/coding-saved-game.md:137-138` state the same rule and cite D-181 for it.
- What the player sees: a player types a very large count into a trip-plan field, such as
  `99999999999999999999` or `1e20`. The game keeps it and saves it. On the next load the page says
  „Zapis był uszkodzony i nie dał się wczytać. Zaczynasz od nowa.” and the player loses every
  program, character, rank and chest piece; the next save overwrites the server's copy.
- Why: the game admits any integer from 1 up as a trip count —
  `src/browser/view/trip-editor.ts:10-12` (`Number.isInteger(count) && count >= 1`) and
  `src/browser/sim/programs.ts:203-208` (`checkTripList`: `Number.isInteger`, `count < 1`) — while
  the load demands a safe integer. D-181 says only "an integer from 1 up, with its upper range
  currently left to reality's clipping"; it does not hold the safe-integer bound the guideline and
  the comment cite it for. The author saw the gap ("`checkProgram` alone takes `1e300`", report
  § What the strict load now covers) and closed it on the load's side only. The spec allows the load
  to refuse more (`spec.md:202`, `:208`), but a load that refuses a state the game itself makes from
  the player's input breaks the task's purpose — a saved game comes back — and the stated aim of the
  test "the load admits what the game plays".
- Evidence: a probe on the built `f7d8234` (`newGame` → `editProgram` with a take count of
  `Number("99999999999999999999")` → `savedGame` → JSON round trip → `loadSavedGame`) printed
  `game accepted edit: true` and `load: {"ok":false,"reason":"shape"}`; the same probe with count 5
  loaded (`control load: true`). The crafted cases "a trip count beyond the safe integers" and
  "a frozen bring count beyond the safe integers" (`tests/sim/saved-game.test.mjs`) pin the refusal,
  and no case checks that the game cannot produce such a count.
- Fix, two ways:
  - (a) the game refuses an unsafe trip count where it takes one: `tripCount` in
    `trip-editor.ts` and `checkTripList` in `programs.ts` use `Number.isSafeInteger`, so the field
    shows its existing warning „Wpisz liczbę całkowitą od 1.”; the load stays as written. Cost: it
    changes task 13's code in the merge, and a test of the editor and of `checkProgram` must pin
    the bound; whether D-181 then needs a qualification through `the-way-record-decision` is the
    orchestrator's call.
  - (b) the load admits for trip counts what `checkProgram` admits (any finite integer from 1 up,
    which JSON carries exactly). Cost: the load departs for this one field from the spec's "safe
    integers where the type is … a count" (`spec.md:202`), and non-safe numbers stay in the game
    state.
  - Recommendation: (a). It keeps the spec's rule whole and keeps numbers that integer arithmetic
    cannot handle exactly out of the game state.
  - If nothing is done: a player who enters such a count loses the whole saved game with no warning
    at the moment of entry.

### Minor

**m-1 — Two boundaries of the new checks have no test, though both are states the game makes.**
(from `932da64`)

- `src/browser/sim/saved-game.ts:361` — Stryker's `pieceCount(held) >= BALANCE.chestCapacity`
  survived. A chest filled to exactly 60 (a deposit that uses the last free room, D-179) would then
  be refused as `shape`.
- `src/browser/sim/saved-game.ts:752` — Stryker's `entry.count >= bringPlan[at].count` survived. A
  completion that brings out exactly the planned count of a row would then be refused.
- Both are real gaps by the testing guidelines' classification (`guidelines/testing.md:251-255`):
  the behaviour is required, and each wrong change would discard a player's save. One crafted
  admitted case each (a chest of 60, a deposit equal to its plan), or a state of the "game state the
  simulation made" table, would kill them.

**m-2 — The comment on `SAVED_GAME_VERSION` no longer says what the guideline says.**
(from `f7d8234`)

- `src/browser/sim/saved-game.ts:65-68` says "Raise it with every change of the shape". The range
  changed the shape and kept the version at 1, under the exception that `f7d8234` wrote into
  `guidelines/coding-saved-game.md:104-107` and the test's header comment
  (`tests/sim/saved-game.test.mjs:30-32`). The next agent reading only the source sees an unraised
  version after a shape change. It costs nothing today. The exception itself has no decision behind
  it, which the author already put to the human (report § Amendments, meaning 3).

## What the review checked and found in order

- **Renumbering (`a20e1d4`).** For each of the 17 files, the `a2d89bf` text with every whole
  `D-179`…`D-190` raised by 23 equals the `a20e1d4` text. No file outside `.runs/` and `docs/` at
  `a2d89bf` names any of them that the commit leaves out. At `f7d8234`, numbers D-179 – D-201
  appear outside `foundations/decisions.md` only in `foundations/invariants.md` (main's own
  sections, unchanged), `guidelines/coding-saved-game.md`, `src/browser/sim/saved-game.ts` and
  `tests/sim/saved-game.test.mjs`; each of the last three cites a decision of task 13 or 10 for what
  that decision says (D-179, D-181, D-189, D-191, D-193, D-195, D-197, D-200), except I-1's citation
  of D-181. The deploy skill in both copies names no decision of the range (only D-12 and D-15).
- **Merge resolutions (`765fb3b`).**
  - `foundations/decisions.md`, `invariants.md`, `glossary.md`, `environment_facts.md`,
    `part_map.md`: every section of the merge equals the same section of one parent. No section of
    either parent is lost. No heading stands twice. No section was changed by both sides. Every
    section one side changed from `dce2970` keeps that side's text. Decisions run on to D-213.
  - `stryker.config.json` lists both `saved-game.test.mjs` and `main`'s `skills.test.mjs` and
    `trip.test.mjs`, in order.
  - `styles.css`, `game-view.ts`, `program-panel.ts` and `glossary.md` equal a fresh
    `git merge-tree a20e1d4 e5025f6`. Every file only one side changed equals that side.
    `program-panel.ts` holds `main`'s `editor.update(…, value)` and this branch's `nextShown` change
    once each. `game-view.ts` holds `main`'s trip lines, practice line and `buy` once each.
- **`src/server/**`, schema step 4 and the deploy skill.** `main` changed nothing under
  `src/server`, `.claude`, `.agents` or `deploy`. The range changes `src/server/database.ts` only in
  two comments (D-186/D-187 to D-209/D-210, this branch's). The skill's version-4 and merge-window
  text stays true. H1 has not run (`reports/34-blocked-request-body.md:103`), so no saved game state
  of version 1 exists, and keeping `SAVED_GAME_VERSION` at 1 is sound.
- **The strict load (`932da64`) against hostile input.** `loadSavedGame` still catches every
  throw inside `game`, the `TypeError`s included. Each new reader works on values it builds and
  writes nothing to the document. Each new key list is exact. Each new identifier goes through
  `oneOf`, an own-key check (`__proto__` refused). Each set is unique. Practice and ranks are safe
  integers. Ranks stay within prices and the points the thresholds give, in a known tree of the
  character's own skill. The chest stays within 60. The deposit is null exactly without a
  completion and a subsequence of the frozen plan. Patrol goes through `checkProgram`. For each
  field `main` brought, the simulation writes only what the load admits, except I-1: trees grow only
  by `discover`, practice only by +1 (`practiced`, `sumPractice`), ranks only by `buyBranch`, which
  is refused during a map run (D-200), and deposits only through `clipTrip`.
- **Saving at the player's acts (D-207).** Among `main`'s new view callbacks, only `buy` changes
  the game state outside the program editor. It now goes through `act`. The trip editor commits
  through the program editor to `editProgram`/`editCopy`, which already go through `act`. With
  `buy` reverted to `store.apply`, the ACTS table fails on "buying a branch rank". D-207's amended
  list and its new complying example say what the code does.
- **The three meanings for the human** (report § Amendments): the purchase as a moment of saving
  (`3f64a7b`), the extended data list (`guidelines/coding-saved-game.md:109-118`) and the exception
  (`:104-107`) are what the commits carry.

## Mutation analysis

`stryker.js run --mutate` over the changed line ranges of `src/browser/sim/saved-game.ts`. The
ranges overlapped a few unchanged lines. Result: 214 killed, 14 survived, 3 without coverage.
Each one classified:

| Line | Mutant | Class |
|---|---|---|
| 258 | group name `""` → other text | equivalent: the helper reads only the rule's action |
| 361 | `>` → `>=` (chest) | real gap — m-1 |
| 388 | predisposition check removed (survived and no coverage) | unreachable with today's data: the one archetype predisposes all eight skills |
| 496 | `ids.add(id)` removed | unchanged line, outside the range — Declined to judge |
| 752 | `at < 0 \|\|` → `false \|\|` | equivalent: `bringPlan[-1].count` throws, the load catches it as `shape` |
| 752 | `>` → `>=` (deposit) | real gap — m-1 |
| 811 | archetype-undefined check removed (2 mutants) | equivalent: `ARCHETYPES[undefined]` throws, caught as `shape` |
| 851, 853, 858 | death-and-completion, activity and cooldown/streak checks (7 mutants, 2 of them without coverage) | unchanged lines, outside the range — Declined to judge |

## Declined to judge

- `src/browser/sim/saved-game.ts:496`, `:851`, `:853`, `:858`: surviving mutants on lines the range
  did not change (`ids.add`, refused as well through `pickedPrograms`' character 2; a death together
  with a completion; an activity missing while the run goes on; a cooldown or streak beyond the
  minute) — an older coverage gap of this branch's load, outside the reconciliation.
- Whether `bringPlan` must equal the copy's base bring list: no decision makes it a reference the
  simulation follows, so the spec does not require the load to check it.
- The run character's skills checked on their own rather than against the team character's (the
  author's choice): a restart after a completion reuses the pre-payment snapshot in `main`'s
  simulation, so equality would refuse states the game makes.
- `main`'s own code, tests and Python invariant fixtures that the merge took unchanged: task 13's
  and 10's reviews.

## Checks

| Check | Result |
|---|---|
| `git worktree add --detach <scratchpad>/wt-rr f7d8234` (node_modules joined by a junction) | 0; removed afterwards (`git worktree remove`, `prune`), the reviewed worktree clean at `776acbc` |
| Section comparison script over the five foundation files: merge vs both parents and `dce2970` | 0; no section differs from both parents, none lost, none doubled, none changed on both sides |
| Renumbering script: each file of `a20e1d4` vs `a2d89bf` with D-179 – D-190 raised by 23 | 0; 17 of 17 equal, no file left out |
| `git merge-tree --write-tree a20e1d4 e5025f6`, then diff with `765fb3b` | 0; differs only in the three conflicted files |
| `npm run typecheck` (scratch, `f7d8234`) | 0 |
| `npm test -- tests/sim/saved-game.test.mjs` | 0 (13 pass) |
| `npm test -- tests/view/account-screen.test.mjs` | 0 (35 pass) |
| `npm test -- tests/view/game-saver.test.mjs` | 0 |
| `npm test -- tests/sim/skills.test.mjs` | 0 |
| `npm test -- tests/sim/trip.test.mjs` | 0 |
| `buy` reverted to `store.apply` in `game-view.ts`, then `npm test -- tests/view/account-screen.test.mjs` | 1, `AssertionError: buying a branch rank` (expected); file restored |
| `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/saved-game.ts:243-275,…:914-935"` | 0; 214 killed, 14 survived, 3 no coverage (table above) |
| Probe `<scratchpad>/probe/big-count.mjs` on the built `f7d8234` | 0; shows I-1 |
| `python -B .the-way/elements/common/foundation_check.py` in the reviewed worktree | 0 (0 errors); it ran at `776acbc`, which differs from `f7d8234` only in comments of `game-saver.ts` |

Not run:
- The whole gate (`npm test` with no argument): forbidden by the dispatch; it is the cycle's own
  run.
- The other test files, including `main`'s and the Python invariant tests: the range changes no
  code they cover beyond what the files above run.

## Reaches beyond the dispatch

- `src/browser/view/trip-editor.ts:8-12`, `src/browser/view/controls/number-field.ts`,
  `src/browser/sim/programs.ts:48-54`, `:195-256`: what trip counts and items the game admits (I-1).
- `src/browser/sim/skills.ts`, `trip.ts`, `understanding.ts:50-70`, `:260-340`,
  `game.ts:100-175`, `:500-580`, `data/skills.ts`, `data/archetypes.ts`, `data/balance.ts`: what the
  simulation writes into each field the load now checks.
- `foundations/decisions.md` D-179 – D-201, D-206, D-207, D-213 (each whole), invariant
  `save-version`: the foundation the commits after the merge are judged against.
- `task.md` (search for H1, H2 and the schema), `spec.md:113-142`, `:194-213`,
  `reports/34-blocked-request-body.md` (search for H1), `.github/workflows/deploy.yml`: whether any
  version-1 save exists and what "admit" covers.
- `guidelines/testing.md` § Mutation testing, `guidelines/coding-saved-game.md` (whole),
  `guidelines/coding.md` (index row), `.the-way/product-guidelines/reading.md` (selection).

## Searches not found or unclear

- `plan.md` was not read: the range has no slice of it, and the dispatch names no passage of it.
- The handoff of the reconciliation (`35-reconcile-handoff.md`) names "the deploy skill in both
  copies" among files naming D-179 – D-190. Neither copy names any of them, which confirms the
  author's report.
