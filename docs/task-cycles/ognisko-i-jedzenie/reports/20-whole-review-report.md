FAIL c8260e6f3cda1a22a7fc83adfdfba85df99f8b3b

# Review of the whole change — cycle `ognisko-i-jedzenie`

- Range: `a945cf1d4c62e8cdac222a7de47277c08a77b2c5..c8260e6f3cda1a22a7fc83adfdfba85df99f8b3b`
  (15 commits, 62 files, +5380 −301); `git rev-parse HEAD` in the worktree is the given head.
- Read whole: the frozen task, the spec, the plan, the handoff, the reports of the foundation
  entries and of Slices 1–13 (own-work checks, choices, concerns), the Slice 10 review, the diff of
  every file of the range.
- Parts the change touches: `simulation`, `browser-view`, `product-foundation`. Foundation read:
  D-04, D-18 to D-27 (D-18 to D-24 whole from the log; D-25, D-26 as changed), D-50 to D-65 whole
  (all new), the task's quotes of D-39, D-41, D-44; the invariants `action-in-progress`,
  `player-map-run-pace`, `simulation-randomness`, `map-run-repeatability`, `simulation-inputs`,
  `content-identifiers`, `program-rule-pick`, `map-run-tiles`, `restart-seed`, `icon-file-content`,
  `icon-credits`, `loop2-container-icons`, `terrain-drawing-numbers`, `program-closed-lists`,
  `walk-feasibility`, `walk-target`, `program-world-reference`, `map-run-layout` and the new
  `minute-span-split`; glossary `map run`, `map run restart`; the part map whole. Guidelines read
  whole: `guidelines/coding.md`, `coding-content-data.md`, `coding-simulation-module.md`,
  `coding-browser-module.md`, `styleguide-browser-view.md`, `src/browser/AGENTS.md`.

## Findings

### Critical

None.

### Important

**I-1 — A resource with no time to renew cannot be written in a game map's data, though the task
makes "no time meaning a resource that does not renew" true.** Slice: none — a gap of the plan (its
*Coverage* row "Projected entries the task makes true in part … renewal" carries the renewal but not
this clause); the code lies in Slice 3 (`7a273ae`, the data type) and Slice 6 (`cc0669d`,
`worldMinute`).

- Place: `src/browser/sim/data/maps.ts:9` — `renewMinutes: number;` (required);
  `src/browser/sim/world.ts:51` — `minute % resource.renewMinutes === 0`, no branch for a resource
  without a time.
- What the task requires: *Decisions in play*, "(new) — What is a map made of?" — „zadanie 4 czyni
  prawdziwym: “What is not on the map's list of resources cannot be gathered or revealed there.” i
  część o odnawianiu: “each resource with its density, stock per tile and time to renew one piece,
  no time meaning a resource that does not renew””. The handoff asks this review to check "the parts
  it makes true of those other tasks write".
- Why it matters: the change makes renewal real, but only for a resource that has a time. A game map
  with a resource that does not renew — which the projected entry allows and task 8 will write into
  the foundation — cannot be added by a change of data alone: `MapDef` refuses a resource without
  `renewMinutes` at the type check, so it takes a code change, against D-18 ("A game map … of a
  kind the simulation already handles is added by a change of data alone"). Today Las renews all
  four resources, so the player sees nothing; the gap shows the first time a map's data omits the
  time.
- Evidence: the two lines above; no test of `tests/sim/world.test.mjs` or `tests/sim/data.test.mjs`
  covers a resource without a time; `grep -n "no time\|does not renew"` over the spec, the plan and
  the slice reports finds nothing that settles it.
- Fix size: `renewMinutes` optional (or `null`) in `MapDef`, `worldMinute` skipping a resource
  without it, one test on a hand-made map whose resource has no time.

### Minor

**M-1 — The footer's list of things with an icon is written by hand** (Slice 10 review's Minor,
graded here). `src/browser/view/footer.ts:25` —
`const WITH_ICONS: readonly WithIcon[] = [...Object.values(RESOURCES), CAMPFIRE];`. A later data
file that names an icon (a creature, an item that is no resource) gets no footer line until someone
adds it here. `icon-credits` still holds for each icon file as long as one entry of the list names
it, so the invariant test does not catch a thing missing from the list. Minor: nothing is missing
today.

**M-2 — The editor shows no unit beside a condition's number.** `src/browser/view/program-editor.ts:424`
builds the number field from the kind's range; the unit in `src/browser/sim/data/conditions.ts`
(`°C`, `%`, `szt.`, `min`) is shown nowhere. The task names the conditions with their units
(*To do* 12: „Temperatura poniżej N °C”, „Zostało mniej niż N min — ognisko”). The player reads
„Zostało mniej niż — ognisko [20]” without „min”. The base did the same for „Tu leży mniej niż”
(`szt.` unshown), and Slice 9's report names it; Minor, since every label reads sensibly and the
range fixes the scale.

**M-3 — A campfire that was never lit reads „ognisko — wygasłe”.** `src/browser/view/tile-list.ts:49`;
the state holds 0 minutes for both (`src/browser/sim/types.ts`, `Campfire.minutesLeft`). „Wygasłe”
says to a Polish reader that it burned and went out. The task gives only the two texts, and the
behaviour is the same for both (lighting needs 0 minutes; conditions read 0), so this is wording the
human may want to see in the request. Slices 6 and 12 name it.

**M-4 — The death texts hard-code „Mag”.** `src/browser/view/status-row.ts:9-11` —
`cold: "Mag zamarzł", hunger: "Mag umarł z głodu"`. The task's example text and spec Decision 5
give these words; with one archetype nothing is wrong today, but a second archetype would read
„Mag zamarzł”. `content-identifiers` does not flag it (the archetype's name is „Mag żywiołów”).
Slice 11's report names the cost.

**M-5 — The new column of the list of revealed tiles has no heading.**
`src/browser/view/tile-list.ts:136` appends an empty `th`. A screen reader announces the
campfire's state with no column name. Slice 12's report names it; Minor.

**M-6 — Keyboard focus on „Pauza” is lost at death.** `src/browser/view/status-row.ts:88` hides the
focused button; focus falls to the page. Minor: one keyboard user, one moment.

**M-7 — Two stale texts.** `src/browser/sim/data/actions.ts:3` — "Status text; for walkTo the
resource name follows it" (it now follows for every action with a resource, gather included);
`tests/invariants/test_terrain_drawing_numbers.py:33` — "since the simulation does not reach a
stock of 0 today" (gathering now reaches it; the test still sets the stock to 0 itself, so it keeps
proving its sentence).

**M-8 — On a tile with all four resources and a campfire the icons are drawn a third smaller.**
`src/browser/view/terrain-picture.ts:59` (`box / Math.max(2, rows)`): five icons take three rows.
Checked in code by `tests/view/terrain-picture.test.mjs` (no overlap, within the tile); never seen
in a browser (below). Minor.

### Out of scope

**O-1 (Important, for the reconciliation with `main`, not this range) — the decision numbers
D-50 to D-56 collide with `main`, and spec Decision 2's join with task 11 is now due.** `main`
(`d11dd0f`, the merge of `task/siedziba-i-druzyna`) holds D-50 „Whose is the chest?” to D-56 „How
does the game state tell one character from another?” (`git show main:foundations/decisions.md`,
lines 949–1076), and the invariant `character-team`; this branch writes D-50 to D-65. Bringing the
branch up to date renumbers D-50 to D-65 and every reference to them: code comments (`run.ts`,
`world.ts`, `status-row.ts`, `terrain-panel.ts`, `terrain-picture.ts`, `tile-list.ts`, `styles.css`,
`test_walk_feasibility.py`), *Relations* and *Derives from* (`minute-span-split` → D-64). `main`'s
D-53 („where „Zakończ” leads”) also bears on this branch's D-55. Task 11 has merged into `main`, so
spec Decision 2's join (the team's character holding traits made by `newTraits`, the send copying
them, a test of both) falls to this cycle, as the plan's *Choices* last-but-one row gives. Out of
scope here: it is the reconciliation's work and review, not a defect of the reviewed commits.

## Coverage of the task

| Item | Met by | Judgment |
|---|---|---|
| *To do* 1 — 37.0 °C start and cap, 0.002/°C below ambient, Las 25 °C (0.024), chilled below 35.0 | `balance.ts`, `maps.ts`, `body.ts`; `body.test.mjs` (34.984 at minute 84) | met |
| *To do* 2 — satiety 100, −0.6, starving below 30; health −0.35/−0.35, +0.05, cap 100 | `body.ts`; `body.test.mjs` | met |
| *To do* 3 — death in its minute, also mid-action, cause; time stops; „Minuta 312 · Mag zamarzł”; no „Pauza”; „Restart”, „Zakończ” | `run.ts` `stepMinute`, `game.ts`, `status-row.ts` | met |
| *To do* 4 — empty backpack, 15 in all, carrying capacity a trait in data | `traits.ts`, `character.ts`, `types.ts` | met |
| *To do* 5 — „Zbierz” 10 min, 1 piece, 7/10, own generator, infeasible hidden / no resource / full | `program.ts`, `run.ts` `finishGathering`, `random.ts` | met |
| *To do* 6 — renewal one piece per time, up to the starting stock | `world.ts` (multiples of the time from minute 0, spec Decision 1) | met (see I-1 for the no-time case) |
| *To do* 7 — „Wytwórz — ognisko” 20 min, 6 sticks, unlit, one per tile, warms its tile alone | `program.ts`, `run.ts` `finishUse`, `world.ts` `warmthAt` | met |
| *To do* 8 — „Zapal — ognisko” 5 min, 2 sticks, 60 min, +0.5 to 37.0, extinguished stays | same | met |
| *To do* 9 — „Zasil — ognisko” 5 min, +20 per stick, fuel chosen by the simulation, no cap | `itemFor`, `finishUse` | met |
| *To do* 10 — „Zapal — patyk” 5 min, burns 3 min at 0.15, then gone | `finishUse`, `worldMinute` | met |
| *To do* 11 — „Zjedz — jagoda” 5 min, +25 to 100, infeasible without | `eatenBody`, `itemFor` | met |
| *To do* 12 — the seven actions and five conditions | `actions.ts`, `conditions.ts`, `game.ts`, `program.ts`, editor | met (M-2) |
| *To do* 13 — temperature takes tenths | `checkNumber`, `onStep`, `readNumberField` | met |
| *To do* 14 — body and backpack row, `danger` below a threshold | `body-row.ts` | met |
| *To do* 15 — campfire icon from game-icons.net with credit; state and burning stick in the row | `campfire.svg`, `credits.ts`, `footer.ts`, `terrain-picture.ts`, `tile-list.ts` | met (M-3, M-5, M-8) |
| Acceptance — a program lives 480 min on a named seed (1760000800000 → 1946377216), the empty one dies | `tests/sim/acceptance.test.mjs`; reading 1 of the spec for "akcji i warunków tego zadania" | met |
| Settlements rows 1–6, 8–15 | D-50 to D-63 | met; each binding sentence matches its row and opens "In the MVP" |
| Settlements row 7 | glossary `map run restart` | met |
| Projected entries the task writes | D-25 (gathering), D-26 (campfire sentence) | met, verbatim |
| Projected parts the task makes true | fuel by the simulation (`itemFor`); the gathering draw (`gather` stream); gathering only what the map lists (`checkResource`, `stockHere`); carrying capacity as a trait; closed lists widened | met, except the no-time clause of renewal (I-1) |
| Spec Decisions 1–5 | D-64, D-65, `minute-span-split`; Decision 2 now, its join outstanding (O-1); Decision 3 table in `conditions.ts`; Decision 5 texts | met in the range |

Fidelity to the sources: the numbers in the data match *To do* 1–11 and spec Decision 3's table
(checked line by line against `balance.ts`, `maps.ts`, `items.ts`, `campfire.ts`, `traits.ts`,
`conditions.ts`, `actions.ts`); the texts of *To do* 14 and 15 match by code point (Slice 12's
check, re-read here); D-25 and D-26 carry the projected sentences as written; nothing invented in the
foundation entries beyond the *Rationale*/*Rejected* the writer worded from the rows (its report,
choices 2–3) — not a fidelity defect, but text the human reads at the merge.

## Slices judged here (none had a review of its own except Slice 10)

- **Foundation entries (F1–F20, `47483c1`, `3789fa4`)** — faithful to rows 1–15 and the spec;
  MVP wording kept. `minute-span-split` reading `Method: test` before its test is now moot: Slice 13
  wrote the test and the part map claims it. `action-in-progress` against death: Declined to judge.
  No blocking finding.
- **Slices 1, 2 (`d15aeb3`, `6a443ee`)** — every changed test still proves its sentence; the
  exploring control's threshold lowered from >10 to >5 still requires several explorings over 240
  minutes; the hidden-tab cases shrink from an hour to 200–240 s (accepted by the plan's *Choices*).
  Docstrings updated except M-7. Own-work checks (reading every span) fit the risk.
- **Slice 3 (`7a273ae`)** — data as the task gives it; I-1's type lies here.
- **Slice 4 (`46ec64d`)** — body, death and span stops as Decision 1 gives; the decimal rounding is
  shown by the mutation in its own-work check; the body on `MapRun.body` and `realMsCarry` 0 at death
  are sound.
- **Slice 5 (`dfe814a`)** — traits, backpack, one maker function; restart keeps traits.
- **Slice 6 (`cc0669d`)** — what burns and renewal in order; its breaking of
  `test_walk_feasibility.py` is mended in Slice 13 (d), which skips the renewal minutes and passes.
  I-1's second line lies here.
- **Slice 7 (`006616f`)** — gathering, its own stream, a re-check at the end; tests compute the draw
  apart from `random.ts`.
- **Slice 8 (`612404f`)** — six actions; `eatenBody` added to `body.ts` outside its *Change*, which
  keeps the six-place rounding in one module (fine). Feeding landing on a burnt-out campfire as the
  spec gives.
- **Slice 9 (`ab1558b`)** — conditions and the step grid; M-2.
- **Slice 10 (`6981b7f`, reviewed `PASS`)** — trust boundary re-checked at the head: `campfire.svg`
  holds one `svg` and one `path`, attributes `xmlns`, `viewBox`, `fill`, `d` only; no script,
  `foreignObject`, `on*`, `href`, `url(`, `style` or `data:`; `test_icon_file_content.py` and
  `icons.test.mjs` pass. M-1.
- **Slice 11 (`eca1fb1`)** — status row at death and the body row; M-4, M-6, M-7 (comment).
- **Slice 12 (`8c7db07`)** — campfire on the drawing, state in the row; M-3, M-5, M-8.
- **Slice 13 (`c8260e6`)** — acceptance, `minute-span-split`, three invariant tests on every kind,
  `test_walk_feasibility.py` (d). Its own-work check (a split ending a call at every minute; the
  `simulation-inputs` driver reaching the new modules) fits the risk.

Changed invariant tests, each still proving its sentence: `test_exploring_reveal.py`,
`test_icon_credits.py`, `test_map_run_layout.py`, `test_map_run_repeatability.py`,
`test_move_reach.py`, `test_player_map_run_pace.py`, `test_program_closed_lists.py`,
`test_program_rule_pick.py`, `test_simulation_inputs.py`, `test_simulation_isolation.py`,
`test_simulation_randomness.py`, `test_terrain_drawing_numbers.py`, `test_walk_feasibility.py`,
`test_walk_target.py`; new: `test_minute_span_split.py`.

## Declined to judge

- `action-in-progress` read literally ("lasts its full duration") against an action cut by death —
  the task's *Context* reads it as holding while the map run goes on, D-54 states the exception, and
  the spec gives the wording to the return step.
- Whether D-21 and `player-map-run-pace` need "until the map run ends", whether D-22's list of kinds
  of draw names gathering, whether D-23's *Verification* gets an example with tenths — the spec gives
  these to the return step; D-22's own list is written by task 18.
- Rows for the new modules (`body.ts`, `character.ts`, `world.ts`, `items.ts`, `campfire.ts`,
  `traits.ts`, `body-row.ts`) in the guidelines' *Files of this kind* — a file added after the audit
  takes no row until the guidelines are refreshed (WAY-200).
- A kitchen-sink sample of a tile with a campfire — the campfire is an icon like a resource's, with
  no new role or state of a tile.
- The acceptance program living on a seed where the mage stays on one tile from minute 25 — Q12
  accepted one seed; balance across seeds is task 7's.
- Renewal at whole multiples of the time from minute 0 rather than a timer per tile — chosen by spec
  Decision 1 with its weak point named.

## Checks

Run in a separate detached worktree of `c8260e6` (scratchpad, `node_modules` linked, removed after):

| Command | Exit |
|---|---|
| `npm run build` | 0 |
| `npm run typecheck` | 0 |
| `node --test "tests/sim/*.test.mjs" "tests/view/*.test.mjs"` | 0 (292 pass) |
| `python -B -m unittest discover -s tests/invariants -p <file>` for `test_minute_span_split.py`, `test_walk_feasibility.py`, `test_walk_target.py`, `test_map_run_repeatability.py`, `test_simulation_inputs.py`, `test_simulation_randomness.py`, `test_program_closed_lists.py`, `test_content_identifiers.py`, `test_icon_credits.py`, `test_icon_file_content.py`, `test_terrain_drawing_numbers.py`, `test_action_in_progress.py`, `test_restart_seed.py`, `test_player_map_run_pace.py`, `test_simulation_isolation.py`, `test_program_rule_pick.py`, `test_exploring_reveal.py`, `test_move_reach.py`, `test_map_run_layout.py`, `test_map_run_tiles.py`, `test_program_world_reference.py`, `test_browser_view_token_values.py` | 0 each |
| `python -B -m unittest discover -s tests/quality -p test_quality_invariants.py -k eslint -k prettier` | 0 |
| mutation: the death guards of `stepMinute` and `advanceMinutes` removed, `test_minute_span_split.py` run, sources restored | 1 — `test_a_dead_character_stays_dead_and_gives_no_events` fails in both dying scenarios: the test catches a dead map run that goes on |
| `python -B .the-way/elements/common/foundation_check.py` (reviewed worktree, read only) | 0 — 0 errors |
| `git -C .the-way rev-parse HEAD` against `git ls-files --stage -- .the-way` | equal (`86b78ad`) |
| manual: a node loop over every tenth 0.0–100.0 and every whole 0–100 | the body row's cut-down never falls a tenth or a unit short |

Not run:

- `npm test` and the full suite — the cycle's run before the request.
- `test_ruff_source_rules`, `test_shellcheck_source_rules` — Ruff and ShellCheck are not installed.
- `test_loop2_container_icons.py`, `tests/deploy` — Docker's daemon does not run here.
- A screenshot or any look in a real browser at the body row, the death state, the campfire on the
  drawing, the five-icon tile and the new column — the foundation settles no route to a screenshot;
  Slices 11 and 12 name theirs unchecked, and neither did I drive a browser. Unverified.

## Reaches beyond the dispatch

- `git show main:foundations/decisions.md` (headings `### D-5*`) and `main:foundations/invariants.md`
  (`character-team`) — the gitStatus showed task 11 merged into `main`; to see whether the numbers
  this branch writes collide (O-1).
- `.the-way/product-guidelines/coding/template.md` § *Files of this kind* — whether a new module
  needs a row (WAY-200; Declined to judge).
- `src/browser/sim/layout.ts` — that a tile's starting stock is the map's stock per tile, which
  `worldMinute`'s bound reads.
- `src/browser/sim/hex.ts` `nearestTile`, `src/browser/sim/data/archetypes.ts`,
  `tests/invariants/test_content_identifiers.py` (docstring and ENTRIES) — for „Idź — ognisko”'s
  target and M-4.
