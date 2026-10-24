# Report — reconciliation with `main`, cycle `ognisko-i-jedzenie`

- **Status:** done
- **Commits:** `ddc587f` (renumbering on the branch, before the merge) · `55818a4` (merge of `main`
  d11dd0f into `task/ognisko-i-jedzenie`, parents ddc587f and d11dd0f; no rebase, no force, not
  pushed)

## How the work went

1. Renumbering first, as its own commit on the branch, while every `D-5x`/`D-6x` in the tree was
   still this branch's own (base a945cf1 ends at D-49; `main` cited its D-50–D-56 only in
   `foundations/` and nowhere in code or tests outside `foundations/invariants.md`). A byte-wise
   script replaced `D-50`…`D-65` by `D-57`…`D-72` (+7), 47 replacements in 15 files.
2. `git merge --no-ff --no-commit main`, conflicts resolved by hand, `git add` by explicit paths,
   `git commit`.

## The renumbering — every reference moved (commit ddc587f)

- `foundations/decisions.md`: the 16 headings D-50…D-65 → D-57…D-72, order kept. None of these
  entries cited another D-5x/D-6x in *Relations*, *Based on* or *Verification* (their relations are
  D-04, D-19, D-23, D-24, D-25).
- `foundations/invariants.md`: `minute-span-split` *Derives from* D-04 · D-64 → D-04 · D-71.
- `foundations/glossary.md`, `foundations/environment_facts.md`, `foundations/part_map.md`,
  guidelines: no reference on this branch's side.
- `src/browser/sim/run.ts`: D-64 → D-71 (×4), D-59 → D-66, D-62 → D-69, D-52 → D-59.
- `src/browser/sim/world.ts`: D-64 → D-71.
- `src/browser/styles.css`: D-63 → D-70.
- `src/browser/view/status-row.ts`: D-54, D-55 → D-61, D-62; D-55 → D-62.
- `src/browser/view/terrain-panel.ts`: D-63 → D-70 (×2).
- `src/browser/view/terrain-picture.ts`: D-63 → D-70; D-65 → D-72.
- `tests/invariants/test_walk_feasibility.py`: D-60, D-64 → D-67, D-71.
- `tests/sim/campfire.test.mjs`: D-56, D-61, D-62, D-64, D-65 → D-63, D-68, D-69, D-71, D-72.
- `tests/sim/conditions.test.mjs`: D-50 → D-57.
- `tests/sim/gather.test.mjs`: „D-57 to D-59, D-64” → „D-64 to D-66, D-71”.
- `tests/sim/traits.test.mjs`: D-57 → D-64.
- `tests/view/terrain-picture.test.mjs`, `tests/view/tile-list.test.mjs`: D-63 → D-70.

References on `main`'s side to its own D-50–D-56 stay: `character-team` *Derives from* D-50, D-56
*Relations* derives from D-52. After the merge `git grep -nE "D-(5[0-9]|6[0-9]|7[0-9])\b"` outside
`decisions.md` shows only these and the moved ones, plus one new reference I wrote (D-53, D-62 in
`tests/sim/body.test.mjs`, below); `decisions.md` holds 72 headings, D-50–D-56 (`main`) then
D-57–D-72 (this branch). Not touched: the cycle's own records under `.runs/` (task, spec, plan,
reports) still name the old numbers; they are ignored by git and outside this merge.

## Conflicts and how each was resolved (commit 55818a4)

- `foundations/decisions.md`: `main`'s D-50–D-56 inserted before this branch's D-57. Checked by
  diff: the merged file differs from `main` by exactly the branch's changes (base → ddc587f), and
  from ddc587f by exactly `main`'s changes.
- `foundations/invariants.md`: both kept — `character-team` (main) then `minute-span-split`.
- `foundations/part_map.md`: both test files kept in `simulation`'s list.
- `foundations/glossary.md` (auto-merged): `extinguished campfire` and `headquarters` both stand.
- `src/browser/sim/types.ts`: both sides named a type `Character`. `main`'s `Character` (the team's
  character: id, name, archetype) keeps its name; this branch's map-run character became
  `RunCharacter` = `{ id: CharacterId; at; traits; backpack }`. It holds the team character's id
  (D-56: the map run names its character by number, no copy of archetype) and its own copy of the
  traits (spec Decision 2). `archetypeId` is gone from the map run's character. `character.ts`
  (`backpackCap`) and `view/body-row.ts` (`backpackText`) take `RunCharacter`.
- `src/browser/sim/run.ts`: `newMapRun(map, seed, program, { mapId, characterId }, traits =
  newTraits())`.
- `src/browser/sim/game.ts`: `startRun(state, mapId, characterId, seed, traits)`; `send` validates
  the team's character (main) and passes `newTraits()` (as today, until the next slice);
  `restart` passes `run.character.id` and `run.character.traits`. `send`'s doc comment says the map
  run's character carries the traits of a new character.
- `src/browser/view/app.ts`: the headquarters (main) in place of the send panel; the body row stays
  between the status row and the terrain panel during a map run.
- `tests/invariants/test_simulation_inputs.py`, `test_simulation_isolation.py`,
  `test_simulation_randomness.py`: `main`'s character creation (`CREATE`, `NAMES`, `characterId`
  in `SENT`) combined with this branch's programs, minutes (240/150) and real time T
  1760000800000; docstrings name both.

Adapted outside the conflicts, because `send` now needs a character of the team: this branch's
`tests/invariants/test_minute_span_split.py` (driver creates „Ala”, `SENT` by `characterId: 1`,
docstring) and `tests/sim/{acceptance,body,campfire,conditions,gather,traits,world}.test.mjs`
(`characterId = 1`, `createCharacter(…, "Ala")` before each `send`, `{ mapId, characterId }` for
`newMapRun`, the unused `ARCHETYPES` import dropped; Prettier run on them);
`tests/view/body-row.test.mjs` (hand-made map-run character carries `id: 1` instead of
`archetypeId`). Creating a character does not change `lastSeed`, so every seed and real time the
branch's tests chose gives the same map run as before.

## „Zakończ” after death (main's D-53, this branch's D-62)

D-62 says „Zakończ” returns to the screen from which the player sends the character; D-53 makes
that the headquarters. In code they already agree: `end` clears a map run ended in death
(`run: null`), and `app.ts` shows the headquarters whenever `state.run` is null. I added to the
existing test „restart and end take a map run ended in death as one in progress”
(`tests/sim/body.test.mjs`) that after `end` of a dead run the team stands as it was and the same
character is sent again from there (a fresh run, no death). The break it catches: `end` leaving
the dead run in place, or death taking the character out of the team. No foundation text changed
for it.

## Trust boundary

`assets/icons/campfire.svg`, `src/browser/view/credits.ts` and `src/browser/view/footer.ts` are
byte-identical to 2c6b28b (`git diff 2c6b28b -- assets/ src/browser/view/credits.ts
src/browser/view/footer.ts` empty).

## Checks

| Command | Exit |
|---|---|
| `npm run build` | 0 |
| `npm run typecheck` | 0 |
| `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"` | 0 (303 pass) |
| `node --test tests/http.test.mjs tests/startup.test.mjs` | 0 (11 pass) |
| `python -B -m unittest discover -s tests/invariants -p test_simulation_inputs.py` | 0 |
| `… -p test_simulation_isolation.py` | 0 |
| `… -p test_simulation_randomness.py` | 0 |
| `… -p test_character_team.py` | 0 |
| `… -p test_minute_span_split.py` | 0 |
| `… -p test_walk_feasibility.py` | 0 |
| `… -p` each of the auto-merged invariant tests both sides changed: `test_action_in_progress`, `test_exploring_reveal`, `test_map_run_layout`, `test_map_run_repeatability`, `test_move_reach`, `test_player_map_run_pace`, `test_program_closed_lists`, `test_program_rule_pick`, `test_terrain_drawing_numbers`, `test_walk_target`, `test_map_run_tiles`, `test_restart_seed`, `test_program_world_reference`, `test_icon_credits` | see below |
| `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier` | 0 |
| `npx eslint --max-warnings 0 src/browser tests/sim tests/view` | 0 |
| `python -B .the-way/elements/common/foundation_check.py` (after the merge commit) | 0, „0 errors” |

Each of the 14 auto-merged invariant tests: exit 0, OK. All invariant runs above used the working
tree as committed in 55818a4 (the tree did not change between them and the commit).

Not run: the full suite `npm test` (the cycle's run before the request); Ruff, ShellCheck and the
Docker test (absent on this machine); `test_loop2_one_serving_process.py` (fails on the base, per
the handoff). Screenshot of the running product: unchecked — the foundation settles no route for
one; the states were checked in code (headquarters hidden while `state.run` is set, run panel with
the body row during a map run and after death, headquarters again after „Zakończ”).

## Own-work check

Requirement most likely missed: the map run's character after the merge — that it is the team's
character by number and still gets its traits from `newTraits` at a send, keeps them at a restart,
and that „Zakończ” after death leaves a team from which the character can be sent. Check: a Node
script on the built `dist/public/sim/game.js` — two characters created, the second sent, then a
restart with traits forced to 4, 600 minutes to death, `end`, and a `send` while the dead run
stands. It showed: map-run character keys `id,at,traits,backpack`, id 2, traits
`{"carryingCapacity":15}`; after restart id 2, traits `{"carryingCapacity":4}`; death at minute
243 of cold; after `end` `run` null and 2 characters in the team; `send` during the dead run
refused („send: a map run is in progress”, D-55).

## Reach beyond the dispatch

- `src/browser/AGENTS.md` and `guidelines/styleguide-browser-view.md`, whole — required by the
  repository's instructions before changing a `browser-view` file (`app.ts`, `body-row.ts`). No
  token, role or style value was added.
- `main`'s test diffs (`tests/sim/{data,flow,purity,time}.test.mjs`, `tests/view/status-row.test.mjs`)
  — to copy the pattern `main` uses to create a character before a send.

## Choices, with the way rejected and the cost if wrong

- **Renumbering as a commit before the merge**, not inside the merge commit. Rejected: renumbering
  after the merge, where `main`'s D-50–D-56 and the branch's would share numbers in one tree and a
  search could not tell them apart. Cost if wrong: one more commit for the reviewer to read.
- **`RunCharacter` for the map run's character**, `Character` left to `main`'s team character.
  Rejected: renaming `main`'s type (touches more of `main`'s code and tests). Cost if wrong: a
  rename in `types.ts`, `character.ts`, `body-row.ts`.
- **No `archetypeId` on the map run's character.** Nothing on this branch reads it beyond
  `restart`, and `main`'s D-56 lists „a map run holding a copy of the character's … archetype in
  place of its number” as a violation. Cost if wrong: the next slice reads the archetype from the
  team by id.
- **`newMapRun`'s `traits` parameter kept with the default `newTraits()`**, as on the branch; the
  next slice's join can pass the team character's traits through it.

## Problems observed

- `body-row.ts`, a browser module this branch added, is not in the table of
  `guidelines/coding-browser-module.md` (neither before nor after the merge); `foundation_check.py`
  does not flag it. Left as it stands — outside this merge.
