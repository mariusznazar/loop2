PASS 18ad4c8e66ebd24c9f4c2ce7d20c3f993d24c3f6

# Review of the correction after the human's remarks (review-correction-1), task `wyposazenie-postaci`

Range `215cc5065f5bb5ed4e0d46e2ad01773bf1ff9c72..18ad4c8e66ebd24c9f4c2ce7d20c3f993d24c3f6` (two commits, 11 files), worktree `the task's worktree`, branch `task/wyposazenie-postaci`. `git rev-parse HEAD` = `18ad4c8e66ebd24c9f4c2ce7d20c3f993d24c3f6`, the head given. `.the-way` at `6ed3cb364adedacea214d2a0df690cea32f2e72f`, the commit `git ls-files --stage -- .the-way` records. Method: `.the-way/task-cycle/review/SKILL.md` with `fix.md` (review of a correction). Diff and log computed with `git diff`/`git log` over the range.

## Findings

### Critical

None.

### Important

None.

### Minor (within the task; block nothing)

1. **`src/browser/view/controls/react-button.tsx:163-164` — a comment the change left untrue.** The comment of `ReactTileButtonProps` still reads "It names itself, by the piece's name or by the slot's, so it takes no `label`". After `55b0ee9b` the screen gives a filled tile the name „{miejsce}: {rzecz}” (`character-gear.tsx:86`, `faceOf` at `:93-98`), not the piece's name. The author corrected the two other comments of the same file (`:92-95`, `:138-142`) and missed this one. Consequence: a reader of the shared control is told the tile's name is the item's name, the very reading remark 3 removed. No behaviour changes. Fix: "by the name the screen gives it, or by the slot's".
2. **`tests/view/shared-controls.test.mjs:965-972` — the made-up faces described as "as a screen gives them".** The comment says "Made-up faces, as a screen gives them: the icon of a piece with the piece's name", and the case's title says "names the button by the item's name". The assertions stay true: the control passes on whatever `name` it is given, and `{ name: "Patyk" }` reaches `aria-label` as "Patyk". The handoff's claim that the test "stays true" holds for its assertions. Its words about what a screen gives are no longer what the one screen gives. Consequence: a later author may take "the piece's name" for the contract of the tile. Fix: say "a name the screen writes", or use a face such as `{ icon: "stick", name: "Ręka główna: patyk" }`, as the kitchen-sink sample now does (`src/browser/kitchen-sink/control-samples.tsx:224-227`).

### Outside the task's scope (block nothing)

3. **„Załóż” in a fight gives no line of its own in the chronicle, though the new *Rationale* of D-340 compares the refill to it.** D-340's *Rationale* (`foundations/decisions.md`, the paragraph added at about 11622-11627) gives the refill its own entry "since a piece taken into the hand is a change of the gear that the player follows among the actions, as the start of „Załóż” is (D-458)". The *Rejected* adds "though the start of „Załóż” has one". That holds outside a fight. Inside a fight, a „Załóż” turn is a `combatExchange` with `action.kind === "equip"`. `eventEntry` (`src/browser/view/chronicle-entries.ts:411-420`) gives that turn no entry, so only the paragraph's „Mag zakłada patyk” stands. Both reports name this, and the walk (`correction-1b-report.md`, observation 2) confirms it.

   What a player sees: two turns of one fight both put a stick into the hand. The refill at a strike gets a line among the actions, and a „Załóż — patyk” rule firing in the fight gets none. Remark 2 asks only for the refill line, and row 25 of *Settlements to record* is met by the paragraph for an in-fight „Załóż”. So this is outside the remarks and outside the task. The binding paragraph of D-340 ("The refill … gives one entry of its own") agrees with the code; only the *Rationale*'s comparison is broader than the code. I name it for the description, so the human can decide whether an in-fight „Załóż” should get a line too. Cost of leaving it: an asymmetry a careful player may notice, and a *Rationale* sentence that reads as if every „Załóż” start has a line.
4. **The 1b report's question 1 ("1 min" beside „Załóż” in a fight) is already settled by the frozen task.** `task_frozen.md:35` (To do 5) says "W wierszu reguły i w panelu reguły przy „Załóż” stoi „1 min” (D-293): po słowach Mariusza „reguła Załóż ma sens przed walką” jej zwykłe miejsce jest poza walką.", and the code does exactly that (`src/browser/view/program-editor.ts:861-876`: „tura” only for `def.combat`; `equip` has `minutes: 1` and no `combat` effect). The walk's question is not a fault, and it need not go to the human as an open question. If it goes into the description at all, it should cite that settlement.

## Remarks of the human — made or not

| Remark | Verdict | Evidence |
|---|---|---|
| 1. Walk the screens in a running game at 1280 px and 360 px | **made as the remark says** | `correction-1b-report.md`, cases a–h. Covered: „Teraz” with „Zakłada patyk” (a, both widths); a program with „Załóż” among the combat rules, out of a fight (b1) and in it (b2), both widths; the rule window of „Załóż” with the picks of the action and of the target open (c, both widths); the refusals „już założone: patyk” and „kieszenie pełne” in amber, arising by play (d1, d2, both widths); the rule „Puste — Kieszeń” → „Załóż — opatrunek” as it runs, pocket by pocket, stopping when the pockets are full, with „Zakłada opatrunek” in the chronicle (e; minutes 1–5 at 1280, minute 5 at 360). The phone measurement in every phone state (h): `scrollsToTheSide` false, `controlsSmallerThan48` empty. 14 screenshots as links to commit `8989a93b` of the screenshots repository (D-418). No fault found, so nothing was corrected. Its own-work check and its account of the patched states it dropped are sound. Left unchecked, with a reason: Firefox, Edge, a real phone; „Zakłada opatrunek” and the window on `fightC` at 360 (same code paths). Its question 1 is settled by the task (finding 4). |
| 2. A chronicle line for the refill, without the actor | **made as the remark says** | `chronicle-entries.ts:411-420`: a `combatExchange` whose `characterAction?.refill` is truthy gives `{ kind: "action", minute: event.minute, text: capitalized(GEAR_PLACES.mainHand.refill), role: "text" }`, which reads „Bierze patyk z plecaka do ręki”. Any other turn gives `null`, including one with `characterAction: null`. The combat line is untouched (`combat-line.ts:53-54` still writes „Mag bierze patyk z plecaka do ręki”; the file is not in the range). Placement: the events of the turns carry `run.minute` at the resolution (`src/browser/sim/run.ts:773-778`), after the `attacked` event that set the paragraph's `seq` (`chronicle.ts:186-190`). So the line stands after the paragraph in time and above it in the newest-first list, under „Wszystko” and „Czynności”, and „Walka” shows the paragraph alone (`chronicle.ts:215-221`). This agrees with D-343's filters and D-348 (learned from the simulation's events). The words come from the data, one literal for paragraph and line, so they cannot drift. The walk (case f) shows it in a running game. |
| 3. The name of a filled tile for a reader „{miejsce}: {rzecz}”, the empty tile unchanged | **made as the remark says**, with the visible pocket headings numbered as the remark's own example | `character-gear.tsx:71-98,127`: `slotName` numbers a slot only where its place has several slots (from `GEAR_SLOTS`), `slotLine` writes both the tile's name and the pick's heading, and the empty tile keeps `{ slotName }` (no `aria-label`, visible name „Kieszeń”). The walk read the accessibility tree: `button "Ręka główna: patyk"`, `button "Kieszeń 1: opatrunek"`, `button "Kieszeń 3: opatrunek"`, empty `button "Kieszeń"`, and the pick's group label equals its heading. The pockets were numbered in the heading for the first time (it read „Kieszeń: …”, which a test held on purpose). That follows from the remark's example „Kieszeń 1: opatrunek”, its reason („Trzy jednakowe „opatrunek” to luka”) and its "tak samo jak nagłówek wyboru". No decision forbids it: D-456 names the three pockets of the place „Kieszeń”; D-459 and the invariant `program-world-reference` concern a program; the frozen To do 1 counts each pocket as a place („osiem miejsc … trzy kieszenie”). The heading's numbering is a visible change the human may not expect; the description must name it (handoff item 6). |
| 4. The three layout shifts: measure on the base `f2263d05`, then fix or describe | **made as the remark says**: measured, cause and place described, nothing to fix | I checked the numbers against `reports/correction-1b-walk/measure-{base,head}-{1280,360}.json`. At 1280: `.world-area` client 672, scroll 676 on both; `.now-row`/`.next-row` x 29, w 680 on both; page 1280/1280/1280. At 360: `.world-area` x 21, client 318, scroll 330 on both; `.scene-place` x 9, w 342; `.scene` and `img.scene-background` x 12, w 336; `.now-row` x 17, w 326 on both; page 360/360/360. The base and head files differ only in the head's added gear row (`p.backpack-text`) and a temperature digit. The cited CSS is exact: `src/browser/run-screen.css:561-565` (`.now-row, .next-row { padding-inline: var(--space-xs); margin-inline: calc(-1 * var(--space-xs)); }`, comment 555-560, D-336) and `:975-979` (`@media (width < 1280px) { .scene-place { margin-inline: calc(-1 * var(--space-m)); } }`, comment 967-974, D-349 / D-396). `git diff f2263d05..HEAD -- src/browser/run-screen.css` is empty. "Describe, correct nothing" is fair: the change did not cause the shifts, and they are no defect — boxes widened on purpose, nothing cut, nothing scrolls. A "few lines of CSS" that removed them would undo D-336's room round the text and D-349's place of the scene. The remark's third branch ("opisz przyczynę i miejsce w opisie") is what applies, and it is done only once the description carries the two causes and places. |
| 5. Depth of the first whole review | let through by the human; nothing to judge | — |
| 6. `TODO` in D-451 | let through by the human; nothing to judge | — |
| 7–14 | accepted by the human | — |

## Review of the diff (section 2)

- **Crafted or odd input where the range takes in data.** `eventEntry` reads only events the simulation returns in memory. The chronicle is not saved (D-339), and `createChronicle` reads `lastCombat` only for the paragraph's minute. So no saved or outside document reaches the new branch. A `combatExchange` with `characterAction: null` gives `null` (optional chaining; also asserted, `tests/view/gear-words.test.mjs:170`). `refill: false` gives `null`. A non-boolean `refill` cannot come from `resolveCombat` (`src/browser/sim/combat.ts:128-157`) and is typed `boolean` (`src/browser/sim/types.ts:159`). An event with no `exchange` would throw, but no producer makes one (`run.ts:773-778` is the only producer). The trust-boundary files (`saved-game.ts`, `judging-cache.ts`, `assets/icons/**`) are untouched by the range.
- **Twice per encounter?** A refill happens only at a strike with an empty main hand and a stick in the backpack (`combat.ts:48-62`). The stick stays in the hand (D-145), and no combat action empties the hand („Załóż — patyk” fills it). So in today's data an encounter gives at most one line, and D-340's "one entry of its own" holds.
- **The minute and the order.** The line's minute is the resolution minute, as D-340 says. Entries made during the fight's minutes (a campfire going out, a player's change) stand between the paragraph and the line in minute order. A death in the fight follows the line (`run.ts:785-791`), so „Ostatnie minuty” (D-368: the last four entries other than the paragraph, ending with the death) may now hold the line. That is consistent with D-368's words.
- **Foundation entries the change writes.** D-340's new binding paragraph, relation `derives from D-457` and Verification clause agree with the code and the tests (a turn with no refill: none; at the resolve minute; after the paragraph; no actor). Its *Rationale* and *Rejected* go beyond the code only in the comparison with „Załóż” (finding 3, outside the scope). D-147 changes only in *Verification* ("an exchange" → "an exchange of blows"). Its binding text never said the chronicle gives no other entry, and its *Rejected* ("an entry of the chronicle for each exchange of blows, as in loop („Wilk gryzie: −7”)") is not contradicted: the refill line is no blow. No invariant test changed.
- **Other entries and guideline sentences made false.** I searched `foundations` and `guidelines` for "no entry for", "gives no entry", "named by the item", "nazwę przedmiotu czyta", „czytnik”, `aria-label`, „Kieszeń”, „kronik”, „Czynności”, „Bierze patyk”, „plecaka do ręki”. I found nothing made false beyond the two comments of findings 1 and 2. The styleguide's chronicle rule (lines 1764-1791) gives an action `text`, which the line has. D-44, D-461 and D-462 say nothing of the tile's accessible name. The frozen task's To do 10 ("jego nazwę czyta czytnik ekranu") still holds, since the name is read with the place added.
- **Styleguide sentences** (`guidelines/styleguide-browser-view.md:1121,1162-1165,1177-1179`). They state what the code does: the filled tile read „{miejsce}: {rzecz}”, pockets numbered, the heading numbered for pockets, and a *Bad* item for a tile read by the item alone. They state no more than that. They stay inside the rule's fields, and the foundation check, which checks guideline form, passes.
- **Tests.** The changed assertions are the remark's (`character-gear.test.mjs:232,238-239`; `character-gear-pick.test.mjs:144,171-173,281,467`): each equality stays an equality, with a longer string. The empty pocket's `aria-label` is still asserted `null` (`character-gear.test.mjs:240`), and the single-slot places are asserted unnumbered („Ręka główna: patyk”, „Głowa: nic”, „Ręka główna: nic”). No assertion is weakened. The two new chronicle tests fail for a missing check of `refill` (a turn with `refill: false` would add a line), for a wrong kind („Czynności” filter asserted) and for the attack minute (order asserted). The real-encounter test runs the simulation itself and asserts one line, before the paragraph in the newest-first list, at the resolve minute. The new test in `gear-words.test.mjs` covers the null turn. No product code holds a branch or value made for a test's input.
- **Guidelines compared.** `coding.md`, `coding-browser-module.md` (content identifiers: the words come through `GEAR_PLACES`, as `combat-line.ts` already does; hooks and effects untouched), `coding-content-data.md` (`gear.ts`: a comment only), `testing.md` (expected values from D-340 and the remark; data by identifier, `MAPS.forestDeep`; changing an existing test with its cause, the remark; mutation testing — see Checks), `src/browser/AGENTS.md` (no token values touched), and the styleguide (states of the shared tile unchanged; kitchen-sample name in the new form). No rule without an invariant is broken.
- **Reserved choices.** None taken.
- **Screenshots among the commits.** None. Both commits touch only source, tests, the decisions file and the styleguide.

## Declined to judge

- An in-fight „Załóż” line in the chronicle — not asked by the remarks; met by the paragraph for row 25 (finding 3).
- The time label „1 min” of „Załóż” in a fight — settled by the frozen task, To do 5 (finding 4).
- „Teraz” reading „Walczy z wilkiem” with „Potem: Zjedz — jagoda” at the resolution minute (1b observation 3) — older behaviour that D-147 holds, outside this correction.
- Whether the measurement script of the `loop2-play` skill should name the intended overflow entries — an edit of a skill, not of this task.

## Checks

All ran in the reviewed worktree at head `18ad4c8e`, with no tracked file changed. Outputs are in `.runs/review-correction-1/`, removed at the end.

| Check | Command | Exit / result |
|---|---|---|
| ESLint over the whole repository, as `test_eslint_source_rules` (`tests/quality/test_quality_invariants.py:71-88`) runs it | `node node_modules/eslint/bin/eslint.js --max-warnings 0 --suppressions-location .runs/review-correction-1/eslint-suppressions.json .` (suppressions file `{}`) | 0 |
| Prettier on every changed `.ts`/`.tsx`/`.mjs`, with the flags of `test_prettier_source_format` (`PRETTIER_FLAGS`, line 28) | `node node_modules/prettier/bin/prettier.cjs --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/kitchen-sink/control-samples.tsx src/browser/view/character-gear.tsx src/browser/view/controls/react-button.tsx tests/view/character-gear-pick.test.mjs tests/view/character-gear.test.mjs src/browser/sim/data/gear.ts src/browser/view/chronicle-entries.ts tests/view/chronicle.test.mjs tests/view/gear-words.test.mjs` | 0, "All matched files use Prettier code style!" |
| Typecheck | `npm run typecheck` | 0 |
| Size rules (D-425) | `node tests/quality/eslint-size-rules.mjs` | 0, "0 functions and files over a threshold in 382 files" |
| Foundation check (it compares the quoted `decision:` lines with the entries) | `python -B .the-way/elements/common/foundation_check.py` | 0, "0 errors" |
| Focused tests | `npm test -- tests/view/gear-words.test.mjs` | 0, pass 6, fail 0 |
| | `npm test -- tests/view/chronicle.test.mjs` | 0, pass 30, fail 0 |
| | `npm test -- tests/view/character-gear.test.mjs` | 0, pass 7, fail 0 |
| | `npm test -- tests/view/character-gear-pick.test.mjs` | 0, pass 11, fail 0 |
| | `npm test -- tests/view/chronicle-entries.test.mjs` | 0, pass 15, fail 0 |
| | `npm test -- tests/view/chronicle-game.test.mjs` | 0, pass 4, fail 0 |
| | `npm test -- tests/view/combat-line.test.mjs` | 0, pass 2, fail 0 |
| | `npm test -- tests/view/end-window-game.test.mjs` | 0, pass 27, fail 0 |
| | `npm test -- tests/view/end-window.test.mjs` | 0, pass 14, fail 0 |
| | `npm test -- tests/view/shared-controls.test.mjs` | 0, pass 69, fail 0 |
| | `npm test -- tests/view/character-screen.test.mjs` | 0, pass 16, fail 0 |
| | `npm test -- tests/view/tabs-area.test.mjs` | 0, pass 14, fail 0 |
| Kitchen-sink build (the sample changed) | `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0, 3 tests OK |
| Measurement of remark 4 (manual) | the four JSON files read and compared field by field for the elements the remark names; the CSS lines read; `git diff f2263d05..HEAD -- src/browser/run-screen.css` | numbers equal on base and head; CSS unchanged since the base |

Not run, with the reason:
- The product's gate, `npm test` without a file — not mine, by the handoff and the method.
- `python -B .the-way/instruction-files/check_instructions.py` — the range touches no instruction file; it is the gate's.
- StrykerJS on the changed simulation file — `src/browser/sim/data/gear.ts` changed in a comment only, so there is no mutable code to mutate.
- The walk and screenshots — not repeated (handoff); no doubt needed a probe.

## Reaches beyond the dispatch

- `foundations/decisions.md`, read whole: D-338, D-345, D-456, D-459, D-460, D-463 — to place the line among the chronicle's kinds and to check that no decision forbids numbered pockets or a tile's accessible name.
- Partly read: D-336 and D-349 (body and verification) and D-368 (its first three paragraphs) — for remark 4 and for „Ostatnie minuty”. D-140 by search (lines 6900-6940) for the time of „Załóż”.
- `foundations/invariants.md`, the entry `program-world-reference` — to judge the pocket numbering.
- `task_frozen.md`, To do 1, 3, 5 (line 35), 10 and row 25, and a search for „Kieszeń” — the remarks touch them, and To do 5 settles the „1 min” question.
- Code beyond the diff: `chronicle.ts` (`record`, `window`), `run.ts:740-800`, `combat.ts:40-175`, `types.ts:140-175`, `combat-line.ts:40-70`, `game.ts:155-180`, `body-blow.ts:30-60`, `program-editor.ts:850-876`, `sim/data/actions.ts` (`equip`) — callers and producers of the changed contract.
- `.the-way/product-guidelines/reading.md` — for my own selection of guidelines.

## Working copies

One directory, `.runs/review-correction-1/`, holding the empty ESLint suppressions file and the outputs of the checks. It held no worktree, clone or probe script, and no screenshot was taken. Nothing in it shows a finding, so nothing was kept in `reports/`. It is removed by its full path before I return. The `dist/` the focused tests built is the product's own output and stays, as the working-copies rule gives.

## Unread material

- **Decisions read whole: 16** — D-44, D-147, D-338, D-340, D-343, D-344, D-345, D-348, D-456, D-457, D-458, D-459, D-460, D-461, D-462, D-463. Of the handoff's core, every one was read whole. Partly read: D-336 (body and verification, not its rationale), D-349 (first paragraph, scope and the start of verification), D-368 (first three paragraphs), D-140 (by search). None of the unread parts bears on the range.
- **Guidelines read whole:** `guidelines/styleguide-browser-view.md` (all 1979 lines), `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/coding-content-data.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`.
- Not read: `.the-way/product-guidelines/template.md` and the styleguide's discipline template. The change rewrites sentences inside existing fields of one rule and adds one *Bad* item, with no new rule or field. The foundation check, which checks guideline form, passed.
- `task_frozen.md` was read only in the passages named under "Reaches", not whole.
- `reports/correction-1a-probe.mjs` and the scripts of `reports/correction-1b-walk/` (`compose.mjs`, `layout.js`, `show.mjs`, `read.js`, `scene-over.js`, `send.sh`, `resume-until.sh`) were not read; only the four measurement files were. The walk was judged as reported, not repeated.

## Searches not found or unclear

- The remark's premise that the pick's heading already numbered the pockets („Kieszeń 1: opatrunek”): not found at the base. The heading read „Kieszeń: …”, and `character-gear-pick.test.mjs` held that until `55b0ee9b` (as the author reports).
- The remark's premise that "Kronika zapisuje już „Zakłada {rzecz}”": true outside a fight only (finding 3).
- No decision or guideline sentence says what a tile's accessible name is, apart from the styleguide sentence this change rewrote.
