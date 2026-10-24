PASS d5b29601b4cb4aa685a442883642c1857110d1bd

# Review — reconciliation with `main` and Slice 14, cycle `ognisko-i-jedzenie`

- **Range:** `2c6b28b8727f4f52e0b6ee06430f0392b6a54c7e..d5b29601b4cb4aa685a442883642c1857110d1bd`
  (`git rev-parse HEAD` in the worktree = d5b2960, as given): ddc587f renumbering, 55818a4 merge
  of `main` d11dd0f, d5b2960 Slice 14.
- **Verdict:** no blocking finding. 0 Critical, 0 Important, 1 Minor, 1 out of scope.

## Findings

### Critical

None.

### Important

None.

### Minor

**M-1 — `newMapRun` still makes traits of its own when none are passed** (Slice 14, d5b2960;
the default predates it). `src/browser/sim/run.ts:264-270`: `traits: Traits = newTraits()`.
After the join every production caller passes the character's traits (`startRun`,
`src/browser/sim/game.ts:200-213`, from `send` and `restart`), so nothing goes wrong today. But
spec Decision 2 makes `newTraits` "the one place both a send now and task 11's character
creation make traits", and after the join the only place a map run should take traits from is
its character. The default leaves a second, silent path: a later caller that omits the argument
gets a map run whose carrying capacity is a new character's, not the sent character's, with no
error and no failing test (`tests/sim/traits.test.mjs` "newMapRun takes the traits it is given,
and a new character's without them" even pins the default). Making the parameter required would
close it; the cost is touching the tests that call `newMapRun` without traits
(`tests/sim/world.test.mjs`, `tests/sim/traits.test.mjs`). Polish, not a defect today.

### Out of scope

**O-1 — the cycle's records under `.runs/` cite the pre-renumbering numbers.** `task.md` (via
the vault), `spec.md`, `plan.md`, the reports and `reports/foundation-map.md` name this branch's
decisions as D-50–D-65; in the repository those numbers now belong to `main`'s D-50–D-56 and
this branch's to D-57–D-72. Outside the range (`.runs/` is ignored by git). It matters only if
the cycle record is later committed, as task 11's was (d1d35ac): a reader of that record would
take „D-55” for `main`'s "How many manual map runs go on at a time?" instead of the death screen
(now D-62). A one-line note of the mapping D-50…D-65 → D-57…D-72 in the record would prevent it.

## Points of the dispatch

- **D-56 against the map run's copy of the traits.** D-56 (`foundations/decisions.md:1087-1112`)
  marks as violating "a map run holding a copy of the character's name or archetype in place of
  its number". `RunCharacter` (`src/browser/sim/types.ts:75-84`) holds `id` (the team character's
  number), `at`, `traits`, `backpack`: the number stands, no name, no archetype (the merge dropped
  the branch's `archetypeId` from the map run's character). The traits copy stands beside the
  number, not in its place, and is what spec Decision 2 *The join* asks for ("keeps the map run's
  character holding a copy of the traits for the map run rather than reading them from the team",
  `spec.md:271-273`). Complies with D-56 and the spec. Shown by `tests/sim/traits.test.mjs`
  "the map run holds its own copy of the traits…" (team's traits changed to 9, restart keeps 4,
  id kept) and by `test_character_team.py` (map run's id stands once in the team).
- **`main`'s D-53 against this branch's death screen (D-62).** D-62
  (`decisions.md:1189-1202`) says „Zakończ” "returns to the screen from which the player sends
  the character", neutrally; D-53 (`:1025-1045`) names that screen the headquarters. In code they
  agree: `end` clears a map run ended in death (`game.ts:326-332`, `run: null`) and `app.ts` shows
  the headquarters whenever `state.run` is null (`src/browser/view/app.ts:100-105`), while a dead
  run keeps the run panel with „Restart” and „Zakończ”. The test added at the merge
  (`tests/sim/body.test.mjs:273-278`) checks the team stands as it was after „Zakończ” from death
  and the same character is sent again. No foundation text needed to change: D-62's wording
  already leaves the target to the decision that names it.
- **Old numbers under `.runs/`:** O-1 above.

## The renumbering (ddc587f)

Checked by script, not by eye: every one of the 38 changed lines of `git diff -U0 2c6b28b ddc587f`
equals its old line with each `D-50`…`D-65` raised by 7 and nothing else changed (0 mismatches).
At ddc587f no reference to D-50–D-56 remains outside `decisions.md`, so none of the branch's was
left behind; at d5b2960 the only references to D-50–D-56 outside `decisions.md` are `main`'s
`character-team` *Derives from* D-50 (`invariants.md:506`) and the new D-53 in
`tests/sim/body.test.mjs:273`; nothing cites D-73 or above. Spot-read meanings: `run.ts` D-66
(missed gathering), D-69/D-71 (feeding, minute order), D-59 (caps); `status-row.ts` D-61/D-62
(death, screen after death); `minute-span-split` *Derives from* D-71; tests cite D-63, D-64–D-66,
D-67, D-68, D-70, D-72 in their own meanings. Correct.

## The merge (55818a4)

- **Which files were resolved by hand.** For every file changed between the merge base a945cf1
  and 55818a4, I re-ran a three-way `git merge-file` of ddc587f / a945cf1 / d11dd0f and compared
  it with the committed file. Exactly the files the reconcile report names differ: the ten
  conflicted ones and the adapted `character.ts`, `body-row.ts`, `test_minute_span_split.py`,
  `tests/sim/{acceptance,body,campfire,conditions,gather,traits,world}.test.mjs`,
  `tests/view/body-row.test.mjs`. Every other file is the automatic merge, unchanged.
- **Foundation survives on both sides.** `decisions.md`: the merged file is `main`'s file plus
  exactly the branch's edits of earlier entries (the same 57 diff lines base → ddc587f) and then
  the branch's D-57–D-72 byte for byte. `invariants.md`: likewise, `character-team` then
  `minute-span-split`. `glossary.md` and `environment_facts.md`: automatic merge, both terms
  (`extinguished campfire`, `headquarters`) stand. `part_map.md`: both test files in `simulation`.
- **Code survives on both sides.** `game.ts`: `main`'s `createCharacter`, `characterName`, team,
  `nextCharacterId`, `send` validating the team's character and refusing during a map run (D-55);
  the branch's closed list with item/body/campfire conditions and actions, `checkNumber`, death
  stopping time in `passRealTime`/`advanceMinutes`, traits through `startRun`. `types.ts`: `main`'s
  `Character`/`Team`/`Chest`/`GameState`, the branch's body, backpack, campfires, burning items,
  death, gathering stream; the map run's character became `RunCharacter`. `app.ts`: the
  headquarters in place of the send panel, the body row between status row and terrain panel.
  The three conflicted invariant tests keep `main`'s `CREATE`, `NAMES`, `SENT` with
  `characterId` and the branch's programs, minutes and real time T, docstrings naming both.
- **Adapted tests are not weakened.** The branch's tests only gained `createCharacter(…, "Ala")`
  before each `send`, `characterId = 1` in place of the archetype, `{ mapId, characterId }` for
  `newMapRun`; no assertion was dropped or loosened. Creating a character leaves `lastSeed` as it
  was, so seeds and real times chosen by the branch give the same map runs (the acceptance test
  still asserts seed 1946377216 for its real time and passes).
- **Trust boundary `assets/icons/**`.** `git diff 2c6b28b d5b2960 -- assets/
  src/browser/view/credits.ts src/browser/view/footer.ts foundations/environment_facts.md` is
  empty: `campfire.svg`, its credit and the licence and title facts (`game-icons-campfire-title`,
  `environment_facts.md:106-110`) stand as the branch had them. `test_icon_file_content.py` and
  `test_icon_credits.py` pass.

## Slice 14 (d5b2960)

Against the plan's *Goal* (handoff `20-slice-14-handoff.md`, word for word) and spec Decision 2
*The join*:

- A created character carries its traits from `newTraits()` (`game.ts:262-267`; `Character`
  gains `traits`, `types.ts:133-139`): met; test "a created character carries carrying capacity
  15 in the team" with 15 written by hand and distinct objects per character.
- `send` copies the sent character's traits into the map run in place of `newTraits()`
  (`game.ts:295-303`): met; "the map run of a sent character carries that character's traits,
  also where they differ…" uses a hand-made character of capacity 4 and checks `backpackCap` 4.
- „Restart” keeps the map run's traits (`game.ts:310-318`, unchanged): met; the 9-vs-4 test.
- The map run keeps the number (D-56) and its own copy: met (above).
- `character-team` still holds: `test_character_team.py` passes on the head.
- Task 11's *To do* 6 ("Postać założona w siedzibie niesie udźwig plecaka jako swoją cechę…
  cechę dołącza do postaci w drużynie cykl zadania 4, który scali się drugi"): met by the above.
- The mismatch the mechanical check passed on — `tests/sim/team.test.mjs` outside *Change*: its
  `deepEqual` on created characters gained `traits: { carryingCapacity: 15 }`. Forced by the new
  field, and it tightens rather than loosens `main`'s test. Accepted.
- "A saved game state holds them with the character": no save exists in `src/`; the traits are a
  plain field of `GameState.team.characters`, so whatever later saves the state saves them.
- Tests fail when the behaviour breaks — checked by mutation (below). The executor's own-work
  check (the run holds its own copy) is partly moot, since `newMapRun` copies the traits anyway
  (`run.ts:280`); the requirement weakest in fact — the send taking the sent character's traits —
  is caught by the capacity-4 test, which fails under the mutation.

## Declined to judge

- `task 11`'s own code and foundation (headquarters, team, chest, D-50–D-56 content): reviewed in
  task 11's request, per the dispatch; judged here only for surviving the merge.
- The missing rows for this branch's new modules (`body-row.ts`, `character.ts`, `world.ts`,
  `traits.ts`, …) in the guidelines' *Files of this kind*: predates the range and was set aside in
  the whole-change review (`reports/20-whole-review-report.md:201-202`).
- The hard-coded „Mag” in the death texts of `status-row.ts`: predates the range, untouched by it.

## Checks

Run in a scratch copy of d5b2960 (`git archive`, own `git init`, `node_modules` junctioned from the
worktree, `.the-way` copied at 86b78ad, the pinned commit), so the reviewed worktree, index and
branch stayed untouched (`git status --short` empty after).

| Command | Exit |
|---|---|
| `npm run build` | 0 |
| `npm run typecheck` | 0 |
| `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"` | 0 (307 pass) |
| `python -B -m unittest discover -s tests/invariants -p <f>` for `test_character_team.py`, `test_restart_seed.py`, `test_map_run_repeatability.py`, `test_simulation_inputs.py`, `test_simulation_isolation.py`, `test_simulation_randomness.py`, `test_minute_span_split.py`, `test_icon_credits.py`, `test_icon_file_content.py`, `test_content_identifiers.py` | 0 each |
| same for `test_action_in_progress.py`, `test_exploring_reveal.py`, `test_map_run_layout.py`, `test_move_reach.py`, `test_player_map_run_pace.py`, `test_program_closed_lists.py`, `test_program_rule_pick.py`, `test_terrain_drawing_numbers.py`, `test_walk_target.py`, `test_map_run_tiles.py`, `test_program_world_reference.py`, `test_walk_feasibility.py` | 0 each |
| `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` (in the worktree, read only) | 0, „0 errors” |

The first run of the invariant tests in the copy failed only because the copy was not yet a git
repository (`git ls-files failed`); after `git init` they ran as above.

Manual checks:

- Renumbering: script comparing each changed line with its old line raised by 7 — 38/38 match.
- Merge: three-way `git merge-file` per file against the committed merge — differences only in
  the files the reconcile report names; foundation files compared section by section (above).
- Mutation, in the copy: `send` giving `...newTraits()` again → 2 tests of `traits.test.mjs` fail;
  `restart` reading traits from the team → 2 fail ("a restart keeps the traits…", "the map run
  holds its own copy…"). Code restored and rebuilt after each.

Not run: the full `npm test` (the cycle's run after this review); `tests/http.test.mjs`,
`tests/startup.test.mjs` (account-server untouched by the range); Ruff, ShellCheck and the Docker
test (absent on this machine); `test_loop2_one_serving_process.py` (fails on the base). A
screenshot of the running game after the merge: unchecked — the states (headquarters without a
run, run panel with the body row during a run and after death, headquarters after „Zakończ”) were
read in `app.ts` and covered by the view and sim tests, not seen on screen.

## Selection and reaches

- Parts touched: `simulation`, `browser-view`, `product-foundation`, `agent-workflow`
  (`guidelines/coding-browser-module.md`, `main`'s change). Read whole: D-50–D-72; the invariants
  file; `part_map.md`; guidelines `coding.md`, `coding-simulation-module.md`,
  `coding-browser-module.md`, `coding-content-data.md`, `styleguide-browser-view.md`. The other
  decisions whose *Scope* names these parts (D-03–D-49) were not read whole: the range changes
  them only by the branch's earlier edits, which I compared mechanically as surviving the merge,
  and the range's browser-view code (body row placement in `app.ts`, a type name in
  `body-row.ts`, comment numbers) touches no role, token, control or framework rule.
- Reach: `reports/20-whole-review-report.md`, searched for `body-row`/`Files of this kind` — to
  learn whether the guidelines' table gap the reconcile report raises was already judged (it was).
- Reach: `spec.md:230-299` and `plan.md` searched for "join" (lines 392-408, 449, 468) — to judge
  Slice 14 against Decision 2 and the plan's *Choices*.
- Reach: `foundations/environment_facts.md`, searched for "campfire" — the trust boundary's title
  fact.
