# Report — executor of slice 21 (body, needs and gathering decisions)

**Status:** done with concerns

The concerns are the judgment calls the orchestrator and the reviewer should see (section
"Choices"), one remark under R3 (D-61's „walka”), and two files of the slice's *Change* list that
hold none of the slice's sentences and so got no line: `tests/invariants/test_walk_feasibility.py`
and `tests/sim/death.test.mjs`.

## Commits

- `0bfc0e62` test: :white_check_mark: mark the tests that hold the sentences of the decisions … with lines decision: (20 test files)
- `3be04132` docs: :memo: name the tests of D-57 … D-387, drop the pair of nine, rewrite the pair of D-64 and D-67 (`foundations/decisions.md`)
- Author address checked after the first commit: `git log -1 --format=%ae` gives the private address the earlier commits of the branch carry.

## Files changed (against the base `d1d58bb9`)

| Added | Removed | File |
|---|---|---|
| 57 | 33 | `foundations/decisions.md` |
| 4 | 0 | `tests/sim/acceptance.test.mjs` |
| 26 | 0 | `tests/sim/body.test.mjs` |
| 10 | 0 | `tests/sim/campfire.test.mjs` |
| 20 | 0 | `tests/sim/conditions.test.mjs` |
| 13 | 0 | `tests/sim/data.test.mjs` |
| 3 | 0 | `tests/sim/encounters.test.mjs` |
| 10 | 0 | `tests/sim/gather.test.mjs` |
| 7 | 0 | `tests/sim/map-card.test.mjs` |
| 4 | 0 | `tests/sim/program.test.mjs` |
| 1 | 0 | `tests/sim/run-record.test.mjs` |
| 3 | 0 | `tests/sim/skills.test.mjs` |
| 9 | 0 | `tests/sim/traits.test.mjs` |
| 4 | 0 | `tests/sim/trip.test.mjs` |
| 9 | 0 | `tests/sim/world.test.mjs` |
| 4 | 0 | `tests/view/body-row.test.mjs` |
| 1 | 0 | `tests/view/discovery-rule.test.mjs` |
| 1 | 0 | `tests/view/map-lines.test.mjs` |
| 3 | 0 | `tests/view/program-editor.test.mjs` |
| 2 | 0 | `tests/view/rule-editor.test.mjs` |
| 1 | 0 | `tests/view/world-area.test.mjs` |

Files beyond the slice's *Change* (item 5 of "Work of every slice"), one line each:

- `tests/sim/campfire.test.mjs` — D-59 and D-387 lines; part `simulation`; focused test run below.
- `tests/sim/world.test.mjs` — D-59, D-67 and D-387 lines; part `simulation`; focused test run below.
- `tests/sim/encounters.test.mjs` — D-60, D-61 and D-67 lines; part `simulation`; focused test run below.
- `tests/sim/run-record.test.mjs` — a D-61 line; part `simulation`; focused test run below.
- `tests/sim/skills.test.mjs` — D-64 and D-65 lines; part `simulation`; focused test run below.
- `tests/sim/map-card.test.mjs` — D-58 and D-387 lines; part `simulation`; focused test run below.
- `tests/sim/program.test.mjs` — D-376 lines; part `simulation`; focused test run below.
- `tests/view/body-row.test.mjs` — D-57, D-58 and D-64 lines; part `browser-view`;
  `guidelines/styleguide-browser-view.md` read whole first; focused test run below.
- `tests/view/program-editor.test.mjs` — D-376 lines; part `browser-view`; styleguide read; focused test run below.
- `tests/view/rule-editor.test.mjs` — D-376 lines; part `browser-view`; styleguide read; focused test run below.
- `tests/view/discovery-rule.test.mjs` — a D-376 line; part `browser-view`; styleguide read; focused test run below.
- `tests/view/map-lines.test.mjs` — a D-58 line; part `browser-view`; styleguide read; focused test run below.
- `tests/view/world-area.test.mjs` — a D-64 line; part `browser-view`; styleguide read; focused test run below.

Files of the *Change* list that got no line: `tests/sim/death.test.mjs` (its cases hold the
resurrection and the settling of a death, D-190 and its neighbours; D-61 stands only in a comment of
"a death ends the map run, pays nothing and takes what it carried…", `tests/sim/death.test.mjs:258`,
where the death itself is a precondition of the helper `died`), and
`tests/invariants/test_walk_feasibility.py` (its docstring cites D-67 only to explain why its ZERO
cases avoid the minutes of renewal; no case would fail on a broken renewal rule). Neither file is
changed.

## Checks

| Command | Exit |
|---|---|
| `python -B .the-way/elements/common/foundation_check.py` (base, before any edit) | 0 — `0 errors`, 11 decisions listed `held by nothing`, none of the slice's |
| `python -B .the-way/elements/common/foundation_check.py` (end, run again after the commits: exit 0) | 0 — `0 errors`, the same 11 listed `held by nothing` (D-73 … D-220, none of D-57, D-58, D-59, D-60, D-61, D-64, D-65, D-66, D-67, D-376, D-387) |
| control: one D-376 quotation changed by a word in `tests/sim/program.test.mjs`, check run, file restored | 1 — `3 errors`, "the quotation stands in no binding sentence of `D-376`" at the three changed lines; restored file shows the slice's 4 added lines only |
| `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore <the 20 changed .mjs files>` (run again after the last pass) | 0 |
| `git diff -U0 d1d58bb9 -- foundations/decisions.md`, read | 11 hunks, each starting at the line `- **Verification:**` of one of D-57, D-58, D-59, D-60, D-61, D-64, D-65, D-66, D-67, D-376, D-387 and ending inside that field; no other line changed |
| `npm test -- tests/sim/body.test.mjs` | 0 |
| `npm test -- tests/sim/gather.test.mjs` | 0 |
| `npm test -- tests/sim/conditions.test.mjs` | 0 |
| `npm test -- tests/sim/death.test.mjs` | 0 |
| `npm test -- tests/sim/trip.test.mjs` | 0 |
| `npm test -- tests/sim/acceptance.test.mjs` | 0 |
| `npm test -- tests/sim/data.test.mjs` | 0 |
| `npm test -- tests/sim/traits.test.mjs` | 0 |
| `npm test -- tests/invariants/test_walk_feasibility.py` | 0 |
| `npm test -- tests/sim/campfire.test.mjs` | 0 |
| `npm test -- tests/sim/world.test.mjs` | 0 |
| `npm test -- tests/sim/encounters.test.mjs` | 0 |
| `npm test -- tests/sim/run-record.test.mjs` | 0 |
| `npm test -- tests/sim/skills.test.mjs` | 0 |
| `npm test -- tests/sim/map-card.test.mjs` | 0 |
| `npm test -- tests/sim/program.test.mjs` | 0 |
| `npm test -- tests/view/body-row.test.mjs` | 0 |
| `npm test -- tests/view/program-editor.test.mjs` | 0 |
| `npm test -- tests/view/map-lines.test.mjs` | 0 |
| `npm test -- tests/view/world-area.test.mjs` | 0 |
| `npm test -- tests/view/rule-editor.test.mjs` | 0 |
| `npm test -- tests/view/discovery-rule.test.mjs` | 0 |
| the same focused runs before the second and third pass of lines, for the first 11 files of the list above (`reports/executor-21-tests.txt` keeps the final runs) | 0 each |

Not run: the full gate `npm test` without a file — the cycle's run before the request (method,
section 3). `test_ruff_source_rules` and `test_shellcheck_source_rules` were not run by the slice;
the handoff reports them failing at the base.

## Own-work check

- Requirement most likely not met: "every test that holds a sentence carries a line" — a test that
  holds a sentence by its content but cites nothing is easy to miss.
- Check: a script (`.runs/executor-21/unmarked.py`, removed before return; its output kept as
  `reports/executor-21-unmarked.txt`) listed every test case under `tests/` that touches the content
  of the slice's sentences — the backpack's cap and carrying capacity, the causes of death, renewal,
  the ambient temperature, the gathering's draw, the numbered conditions, the body's step and the
  satiety cap — and carries no line of the slice's decisions: 247 cases at first.
- What it showed: I read every case of that list outside the bare uses of conditions in programs
  and the bare uses of the gathering stream, and the cases among the condition uses whose names
  speak of a range, a step, a refusal, a default, a decimal or holding below. It found 18 cases I
  had missed that hold a sentence: `tests/sim/map-card.test.mjs` (4), `tests/sim/data.test.mjs`
  (Skraj lasu and Las — głębiej data rows, and the two `setProgram` range cases), `tests/sim/world.test.mjs:52`,
  `tests/sim/program.test.mjs` (4), `tests/view/body-row.test.mjs:221`, `tests/view/map-lines.test.mjs:100`,
  `tests/view/world-area.test.mjs:516`, `tests/view/rule-editor.test.mjs:1132`,
  `tests/view/discovery-rule.test.mjs:172`; their lines are added. The rest I judged as not holding
  (see "Choices" for the bar used).

## Rows of the decisions

Tests as `path:line` of the line `test(` at the end of the slice, with the case's name.
None of the eleven decisions names an invariant after `invariants:`, so the part held by
invariants is "none" in every row; R1 applied nowhere.

### D-57 — warmth's unit (one sentence)

- Held in whole by tests together:
  - `tests/sim/conditions.test.mjs:273` "the check takes a temperature with tenths and holds it as the decimal the player reads"
  - `tests/sim/conditions.test.mjs:292` "the check refuses a temperature off the step of 0.1 or outside 30.0–37.0"
  - `tests/view/body-row.test.mjs:82` "temperature is cut down to tenths, never rounded up" (degrees Celsius, tenths, on the screen)
- Held by nothing: nothing. *Verification:* pair removed, clause `tests:` added.

### D-58 — what cools the body (one sentence)

- "cools in each game minute outside combat": `tests/sim/body.test.mjs:82` "on Las the body at named minutes is the one worked out by hand" (part, one map).
- "by more, the further … below the starting temperature": `tests/sim/body.test.mjs:476` (83 minutes on Las, 33 on Las — głębiej), `:497` "a map that does not cool the body below the threshold gives no minutes until chilled", `:595` "a map at the body's starting temperature gives not cooling…"; `tests/sim/map-card.test.mjs:18`, `:28`, `:37`, `:46` (the card's minutes without fire on Las, Las — głębiej, a map at 36 °C and at 37/40 °C); `tests/view/body-row.test.mjs:221` "on a map that does not cool the body the note … reads „nie stygnie”"; `tests/view/map-lines.test.mjs:100` "… and a map that does not cool leaves the minutes out".
- "the ambient temperature stands in the game map's data": `tests/sim/data.test.mjs:274` "Las has an ambient temperature of 25 degrees in its map data" (every map has a number), `:35` (Skraj lasu's row, 25), `:60` (Las — głębiej's row, 7).
- Held in whole together; held by nothing: nothing. *Verification:* pair removed, clause `tests:` added.

### D-59 — how far warming and eating go (one sentence)

- Warming to the starting temperature: `tests/sim/body.test.mjs:191` "the warmth on the tile warms the body, capped at 37.0 °C on the sum"; `tests/sim/world.test.mjs:108` "a character at a burning campfire stays at 37.0 °C"; `tests/sim/world.test.mjs:118` "the cap of 37.0 °C applies to the warmth of a campfire and a stick together".
- Eating to the starting satiety: `tests/sim/campfire.test.mjs:419` "eating adds 25 satiety at its end, not above 100, and uses a berry".
- Held in whole; held by nothing: nothing. *Verification:* pair removed, clause `tests:` added.

### D-60 — losing and regaining health (two sentences)

- Sentence 1 (losses outside combat, regain up to full): `tests/sim/body.test.mjs:82` (losses from minute 84 and 117), `:152` "a map run that is warm but hungry dies of hunger" (part: hunger), `:165` "a map run both chilled and starving loses both and dies of cold", `:174` "health rises by 0.05 where neither chilled nor starving, not above 100" (whole sentence), `:208` "a value the decimal arithmetic puts exactly on a threshold does not cross it" (below the threshold, not at it), `:311` "the body step reports a loss only when the character is chilled or starving after it", `:329` "the body step names the cause of its loss…: cold, hunger, both, or none"; `tests/sim/acceptance.test.mjs:172` "on the same seed the empty program dies in game minute 243, of cold".
- Sentence 2 (combat freezes needs and health): `tests/sim/encounters.test.mjs:185` "five combat minutes freeze needs and recovery while fire, renewal and streak advance once each" (whole).
- Held in whole; held by nothing: nothing. *Verification:* pair removed, clause `tests:` added.

### D-61 — when and of what a character dies (three sentences)

- Sentence 1: `tests/sim/body.test.mjs:104` "on Las a program of today's closed list is alive in minute 242 and dies of cold in minute 243" (during an action in progress), `:130` "death falls during an action in progress, which gives no activityFinished", `:152`, `:276` "a map run ended in death passes no minute"; `tests/sim/acceptance.test.mjs:172`.
- Sentence 2: `tests/sim/body.test.mjs:104`, `:130`, `:152` (hunger), `:165` (both → cold); `tests/sim/acceptance.test.mjs:172` (chilled and starving → cold).
- Sentence 3: `tests/sim/encounters.test.mjs:286` "combat death in M+5 wins over completion and keeps the streak"; `tests/sim/run-record.test.mjs:214` "the minutes of a fight count to the fight, … and the last minute of a death in the fight too" (death at attack minute + 5).
- Held in whole; held by nothing: nothing (see the R3 remark on „walka”). *Verification:* pair removed, clause `tests:` added.

### D-64 — the backpack's cap (two sentences)

- Sentence 1 (counts all items together; height is carrying capacity):
  - counting together: `tests/sim/traits.test.mjs:111` "the count of a hand-made backpack is the pieces of all items together"; `tests/sim/gather.test.mjs:109` (14 berries leave room), `:140` "„Zbierz” is not feasible with a full backpack of 15 pieces of any items", `:263` "a gathering takes no more than lies on the tile, nor beyond the backpack's cap, at its end"; `tests/sim/skills.test.mjs:338` (Pełna garść with 14 and 15 berries), `:377` (Obchód with 13 and 15 berries); `tests/sim/trip.test.mjs:587` "takeFromNowhere clips the take list by capacity…", `:783` "the backpack of a solved map's run is the entries sendTake gives from nowhere"; `tests/view/body-row.test.mjs:124` „Plecak 7/15: patyk 5, jagoda 2”; `tests/view/world-area.test.mjs:516` (the same text on the screen);
  - whole sentence: `tests/sim/traits.test.mjs:46`, `:79` "a restart keeps the traits of a character that carries other traits" (cap 4), `:119` "the cap of a hand-made character is its carrying capacity", `:159` (a sent character's capacity 4); `tests/sim/trip.test.mjs:124` "entry spends one budget in order…" (8 + 7 = 15), `:555` "a manual run of a solved map … cut by capacity…"; `tests/view/body-row.test.mjs:136` "the cap is the character's carrying capacity" (2/20).
- Sentence 2, "Carrying capacity is 15 pieces": `tests/sim/data.test.mjs:310` "a new character's traits hold carrying capacity 15, apart from the archetype"; `tests/sim/traits.test.mjs:46`, `:64`, `:125`, `:136`.
- Held by nothing: "the character skill trees have no branch that raises it". *Verification:* pair rewritten for that part, clause `tests:` added.

### D-65 — a full backpack and gathering (one sentence)

- `tests/sim/gather.test.mjs:109` "„Zbierz” is feasible on a revealed tile holding the resource, with room in the backpack" (part: feasible below the cap); `:140` (not feasible when full); `:285` "the wander stream gives the same draws with and without gathering" (the gathering rule passed over once full, the next rule, „Wędruj”, carried out); `tests/sim/skills.test.mjs:377` (Obchód passed over with 15 pieces, part).
- Held in whole; held by nothing: nothing. *Verification:* pair removed, clause `tests:` added.

### D-66 — a missed gathering (one sentence)

- `tests/sim/gather.test.mjs:196` "a miss takes no piece and leaves the backpack as it was" (whole); `:230` "each gathering hits exactly where its draw lies below 0.7" (misses occur; the stock stays at 5).
- Held in whole; held by nothing: nothing. *Verification:* pair removed, clause `tests:` added.

### D-67 — a tile's renewal (one sentence)

- `tests/sim/world.test.mjs:200` "a tile below its stock of sticks gains one piece at minute 30 and none above its stock; a tile at 0 keeps its resource" (multiples of 30 and 40 from the data, up to the stock, none at the stock); `:238` "a resource whose map data gives no time to renew does not renew, while the others renew"; `:314` "an exploring that ends in a minute of renewal reveals its tile and keeps the renewal" (part); `tests/sim/encounters.test.mjs:185` (a renewal in minute 240, during combat; part).
- Held by nothing: "counted from the map run's game minute zero" for a tile that falls below its stock after minute zero (every case sets the stock at minute 0 or by hand; see "Choices" 3). *Verification:* pair rewritten for that part, clause `tests:` added.

### D-376 — the numbers of a condition (three sentences)

- Sentence 1, holding below and not at: `tests/sim/conditions.test.mjs:98`, `:107`, `:116`, `:127`, `:149`, `:155`, `:165`, `:194` (each kind); `tests/sim/program.test.mjs:72` "hereBelow compares the true stock of a revealed tile", `:88` "hereBelow with N = 0 never holds".
- Sentence 1, ranges, steps, both ends included: `tests/sim/conditions.test.mjs:273`, `:292`, `:301`, `:311`; `tests/sim/data.test.mjs:232` (hereBelow 0–50 by 1, from 1), `:606` "setProgram accepts … the ends of the range"; `tests/sim/program.test.mjs:262` (group conditions take the same numbers); `tests/view/rule-editor.test.mjs:1132` "the number field of the panel takes the range and the step of the condition kind".
- Sentence 1, the starting numbers 36.5, 50, 8, 1, 20, 30: `tests/view/program-editor.test.mjs:162`, `:459`, `:477`; `tests/view/discovery-rule.test.mjs:172` (36.5); `tests/sim/data.test.mjs:232` (1).
- Sentence 2: `tests/sim/conditions.test.mjs:273` (36.60000000000001 kept as 36.6; whole), `:292`, `:301`, `:311`, `:335` "the check refuses a number that is no finite number, for every kind that takes one"; `tests/sim/data.test.mjs:661` "setProgram rejects … values outside the data range"; `tests/sim/program.test.mjs:285` "group conditions refuse unknown kinds and invalid fields…".
- Sentence 3: `tests/sim/data.test.mjs:248` "health conditions use the approved thresholds and are revealed by an attack"; `tests/sim/conditions.test.mjs:311`; `tests/view/rule-editor.test.mjs:1132`.
- Held in whole; held by nothing: nothing. *Verification:* pair removed, clause `tests:` added.

### D-387 — the numbers of the body, the gathering, the campfire and eating (three sentences)

- Sentence 1 (the body): `tests/sim/data.test.mjs:284` "the body starts at its caps, with the rates and thresholds of D-387" (every number), `:302` "the cooling in Las is 0.024 degrees a minute…"; `tests/sim/body.test.mjs:74` "a map run starts at 37.0 °C, satiety 100, health 100, alive", `:82`, `:174`, `:191` (the temperature cap), `:208`, `:476`; `tests/sim/map-card.test.mjs:18`, `:28`, `:37` (0.002 °C for each degree, on three maps); `tests/sim/campfire.test.mjs:419` (the satiety cap); `tests/sim/acceptance.test.mjs:172`.
- Sentence 2 (the gathering): `tests/sim/gather.test.mjs:152` "a gathering lasts 10 game minutes…", `:230` (chance 0.7); `tests/sim/data.test.mjs:284` (`gatherChance` 0.7).
- Sentence 3 (campfire, stick, eating): `tests/sim/campfire.test.mjs:150` "the six actions are on the closed list with their labels and minutes" (20, 5, 5, 5, 5), `:291` "each action lasts its minutes…", `:318` "crafting … uses 6 sticks", `:330` "a campfire lit in minute m warms … for 60 minutes and uses 2 sticks" (and 0.5 °C), `:379` "a stick lit in minute m burns …, warms in minutes m + 1 to m + 3 and is used", `:391` "feeding a burning campfire adds 20 minutes … and uses one stick", `:419` (25 satiety, one berry), `:718` "the price of an action names the pieces it uses up…"; `tests/sim/data.test.mjs:320` "the items are the four resources of Las, with their uses", `:346` "the campfire holds its name, costs, burning minutes, warmth and icon"; `tests/sim/world.test.mjs:52`, `:81` (0.5 °C a minute for 60 minutes), `:118` (0.5 + 0.15), `:136` "a stick lit with 3 minutes warms in 3 minutes and is gone" (0.15 °C).
- Held in whole; held by nothing: nothing. *Verification:* pair removed, clause `tests:` added.

## Pairs added or rewritten (for the human to accept at the merge)

- **D-64**, pair rewritten — now only for "the character skill trees have no branch that raises it":
  - complies: a branch of the gathering tree that shortens a gathering, carrying capacity staying 15
  - violates: „Mocne plecy”, a branch of the gathering tree that raises carrying capacity by 5 pieces for each rank
- **D-67**, pair rewritten — now only for a tile that falls below its starting stock after game minute zero:
  - complies: a tile of Las missing a stick of its starting stock since game minute 45 gaining it in game minute 60
  - violates: a tile whose sticks fall below its starting stock in game minute 45 waiting for its own 30 game minutes and gaining its first stick in game minute 75

Pairs removed (the decision held whole by tests): D-57, D-58, D-59, D-60, D-61, D-65, D-66, D-376,
D-387. No pair added.

## Remarks on the log's wording (R3; nothing changed)

- **D-61**, third sentence: it names the cause of a death through combat „walka”. The simulation's
  cause is `combat` (`src/browser/sim/types.ts:232`, `DeathCause`), and the screens say „Mag zginął w
  walce” (`src/browser/view/now-lines.ts:23`) and „Walka” as the chronicle filter. The tests that
  hold the sentence assert `cause: "combat"`. The sentence reads as if „walka” were the cause's
  value; the human may want it to say "with the cause of combat".
- **D-376**, first sentence: „Zapas poniżej” and „Tu leży mniej niż” "from 0 to 50 pieces" — matches
  the code and tests; no remark. **D-64**, second sentence: "the character skill trees have no
  branch that raises it" — true of the data today (no branch touches carrying capacity), checked by
  no test; kept as the pair's part, no remark beyond that.

## Choices, with the way rejected and its cost if wrong

1. **The bar for "holds".** A case carries a line where its subject — its name or the assertions it
   is about — is the sentence's content, and it would fail if the code broke that sentence. A case of
   another subject that asserts the sentence's outcome only as a precondition or as a side check
   (e.g. `tests/sim/rule-signs.test.mjs:894` and `:925`, which assert the cause of death with the
   message "precondition"; `tests/view/status-row.test.mjs:193`, whose subject is the clock;
   `tests/view/account-screen.test.mjs:3085`, whose subject is the save; `tests/sim/trip.test.mjs:703`
   and `tests/sim/death.test.mjs:258`, which cite D-61 in a comment but are about what a death takes)
   got none. One line I first added under the looser bar I removed again:
   `tests/sim/encounters.test.mjs:790` (restart replay; the cause `combat` is a consequence check).
   Rejected: marking every case that would fail — it would put D-387 on nearly every case of the
   simulation that works out a number, which says nothing to the reviewer. Cost if wrong: a few
   cases that do hold a sentence carry no line; the clause `tests:` stays true.
2. **Tests that work D-387's numbers into another decision's expectation** (the notes of D-337 in
   `tests/sim/body.test.mjs` — 83/79/116/86 minutes —, the acceptance minute 243 aside) carry no
   D-387 line unless their subject is the body's rate itself (`body.test.mjs:476`, the cooling on
   two maps; `map-card.test.mjs:18/28/37`, the card's minutes from the cooling per degree). Cost if
   wrong: as in 1.
3. **D-67 kept a pair.** `tests/sim/encounters.test.mjs:185` shows a tile at 0 in a state of game
   minute 235 gaining a piece in minute 240, which no per-tile clock started at the loss would give;
   but the state is written by hand and carries no record of when the tile fell, so I did not count
   it as holding "counted from the map run's game minute zero". Rejected: dropping the pair. Cost if
   wrong: one pair more than the template needs.
4. **Quotations stopping early.** A case that holds the start of a sentence gets a quotation that
   stops where its part ends (e.g. D-58 "…outside combat" for the one-map case); a case that holds a
   later part of the same sentence gets the whole sentence or the shortest start the line needs. For
   D-387's long third sentence every holder carries its first clause, "Making a campfire lasts 20
   game minutes and uses 6 sticks"; the clause `tests:` says which numbers the tests hold.
5. **Lines in the view part** (`tests/view/**`): the decisions D-57, D-58, D-64 and D-376 have the
   scope `browser-view`, and the view cases there read the data (the body row's tenths and its
   „Plecak n/15”, the rule panel's range, the editor's starting numbers); I added lines there after
   reading the styleguide. The cases of the editor's number field (`program-editor.test.mjs:287–406`)
   take their range as an argument the test writes, not from the data, so they got none.
6. The script that inserted the lines (`.runs/executor-21/add_lines.py`, run in three passes, each
   with a dry run, line endings kept, quotations taken word for word from the binding sentences)
   is removed; its quotation table is kept as `reports/executor-21-quotes.txt`.

## Reaches beyond the dispatch

- `foundations/decisions.md`, D-151 (searched by its number, read its binding sentences): to judge
  whether the D-376 sentence "„Zdrowie poniżej” and „Przeciwnik ma poniżej” take the numbers D-151
  gives" is held by cases that assert 0–100 by 1 from 50 and 10.
- `src/browser/sim/body.ts:66–162` (`bodyMinute`, `minutesUntilChilled`): to judge whether the
  minutes-until-chilled cases hold D-58 — they do, since `minutesUntilChilled` steps `bodyMinute`.
- `src/browser/sim/types.ts`, `src/browser/view/now-lines.ts` (grep for the cause of combat): for the
  remark on D-61.
- `the author's rules on writing scripts, outside the repository` (the user's rule before writing a script).
- Test files beyond the plan's *Change*, read by case: `tests/sim/campfire.test.mjs`,
  `tests/sim/world.test.mjs`, `tests/sim/encounters.test.mjs`, `tests/sim/run-record.test.mjs`,
  `tests/sim/skills.test.mjs`, `tests/sim/map-card.test.mjs`, `tests/sim/program.test.mjs`,
  `tests/sim/rule-signs.test.mjs` (two cases), `tests/sim/saved-game.test.mjs` (one assertion),
  `tests/view/body-row.test.mjs`, `tests/view/program-editor.test.mjs`, `tests/view/rule-editor.test.mjs`,
  `tests/view/discovery-rule.test.mjs`, `tests/view/map-lines.test.mjs`, `tests/view/world-area.test.mjs`,
  `tests/view/status-row.test.mjs` (one case), `tests/view/account-screen.test.mjs` (one case),
  `tests/view/chronicle.test.mjs` (one case).

## Working copies

- `.runs/executor-21/` under the worktree (`.runs/executor-21`) held the scripts `add_lines.py` (and its copies of the
  three passes), `unmarked.py`, the outputs of the foundation check, the logs of the focused tests and
  a backup of `tests/sim/program.test.mjs` for the control run (restored and removed at once).
  The directory is removed (`rm -rf`, checked gone); kept beside this report: `executor-21-quotes.txt`,
  `executor-21-lines.tsv` (every line of the slice's decisions with its case), `executor-21-unmarked.txt`
  and `executor-21-tests.txt` (the focused runs and their exit codes).
- The first base run of the foundation check was written for a moment to `.runs/executor-21-fc-base.txt`
  (directly under `.runs/`) and moved into `.runs/executor-21/` right after.

## Unread material

- `guidelines/testing.md`, `guidelines/coding.md`, `foundations/part_map.md`, `foundations/glossary.md`,
  `guidelines/styleguide-browser-view.md`: read whole.
- The test files of the *Change* list: read by case, not whole — `tests/sim/body.test.mjs` 1–612 (as
  numbered at the end of the slice) and the names of the cases after it, which are the notes of
  D-337; `tests/sim/gather.test.mjs` 14–382; `tests/sim/conditions.test.mjs` 18–355;
  `tests/sim/traits.test.mjs` 18–182; `tests/sim/acceptance.test.mjs` 18–180;
  `tests/sim/trip.test.mjs` 1–69, 120–279, 554–628, 700–787 (the other cases by name only);
  `tests/sim/data.test.mjs` 1–16, 100–139, 187–423, 604–690 (the rest by name); `tests/sim/death.test.mjs`
  40–91, 256–295 and the names of all cases; `tests/invariants/test_walk_feasibility.py` 1–80 and
  286–392, lines 80–230 by grep for renewal and stock.
- Foundation entries D-57 … D-387, D-73, D-82: read whole (their binding sentences, fields, rationale).

## Searches not found or unclear

- No test holds D-64's "the character skill trees have no branch that raises it" — searched the tests
  for `carryingCapacity`, "carrying capacity" and „Mocne plecy”, and read the case listing the skills'
  actions (`tests/sim/data.test.mjs:394`) and the case names of `tests/sim/skills.test.mjs`.
- No test makes a tile fall below its stock after game minute zero and watches its first renewal
  (D-67) — searched `renew` across `tests/` (sim, invariants, catch-up, loop, completion).
- Unclear: whether the handoff meant `tests/invariants/test_walk_feasibility.py` and
  `tests/sim/death.test.mjs` to hold a sentence; I found that they do not (above).
