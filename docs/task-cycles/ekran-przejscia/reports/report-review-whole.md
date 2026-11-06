PASS 1057f7dbd729a307202a796e28c8b9d5a9774013

(Saved by the orchestrator from the reviewer's returned text: the harness refused the reviewer's own write.)

# Review of the whole change — task cycle `ekran-przejscia`

- Range: `d50158a..1057f7d`, 21 commits, 39 files (+4026 −1531). `git rev-parse HEAD` = `1057f7dbd729a307202a796e28c8b9d5a9774013`.
- Method: `.the-way/task-cycle/review/SKILL.md` and `whole_change.md` at the pinned `61c72fb`.
- Counts: blocking 0 (Critical 0, Important 0); Minor 9 (m1–m5 of this review, M1–M4 carried from the slice reviews); out of scope 10 (the lines of *Declined to judge*; no finding goes beyond the task).

## Findings

### Critical
none

### Important
none

### Minor

**m1 — A surviving mutant in `chillRuleGroupName`: no case covers a discovery holding no action after the first chill (Slice 2, `1f899ec`).**
- Place: `src/browser/sim/understanding.ts:471-473`, `state.discovery.actions.some((kind) => ACTIONS[kind].revealedBy.kind === "chilled")`.
- What is wrong: StrykerJS on the new function kept the mutant `some` → `every`. They differ for a discovery holding no action: `[].every(...)` is `true`. So a later discovery of only an item, a creature or a condition, made after the first chill while the copy holds „Zawsze → Eksploruj”, would get the sentence „Gra dopisała regułę w grupie …” under the mutant; D-312 lists that case under *violates* („the sentence in the band of a discovery at which the game wrote no rule”). They also differ for a chill in the same game minute as a discovery of an action not revealed by the chill. The one „wrote no rule” case in `tests/sim/discovery.test.mjs`, the first finished exploration, holds actions („Idź”, „Zbierz”), so it does not separate them.
- Classification: a real gap in the behaviour D-312 requires; the code is correct today.
- Why it matters: a later change of this line could put a false sentence into the band of every non-action discovery, and the gate would pass.
- Evidence: `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/understanding.ts:461-482"`, exit 0: 26 killed, 1 survived (`understanding.ts:471:19`, MethodExpression).
- Fix: one case in `tests/sim/discovery.test.mjs` — after the first chill, with the copy still holding „Zawsze → Eksploruj”, a held discovery of an item or a condition alone gives `null`.

**m2 — „Dodaj regułę z tym” with the copy's first group folded: the panel opens on a rule whose row is hidden, and „✕” has no row to give the focus back to (Slice 4, `64a2fcf`).**
- Place: `src/browser/view/program-panel.tsx`, `addDiscoveredRule()` (around lines 772-784), and the view's handling of `opening`; nothing unfolds the group.
- What is wrong: the player who folded group 1 (a memory of the page, D-295) and presses the band's button sees the rule panel in the right area but not the new rule in the program; after „✕” the focus has no row. Reported by the executor, left as made by the orchestrator (Q10); the task is silent; a player expects to see the rule just added.
- Why Minor: the panel names the rule („Reguła 1.2”), and the state needs a folded first group. Fix: unfold that group in the same call.

**m3 — The stylesheet comment over `.rule-panel-host` describes a layout this change removed (Slice 12, `1057f7d`, by its amendment).**
- Place: `src/browser/styles.css:1422`: „The rule panel in the place of the table of revealed tiles, beside the drawing (D-282).”
- What is wrong: the host with that class was the terrain panel's, now gone; the class is set only by `createRulePanel` (`rule-panel.tsx:594`), which only `tests/view/rule-editor.test.mjs` calls. On the screen of a map run the panel stands in `.run-rule-host` in the right area, away from the drawing. The amendment kept the rule but not its comment.
- Why it matters (small): a reader is told the rule panel stands beside the drawing.

**m4 — `world-area.tsx` cites D-314 for a rule D-314 does not hold (Slice 6, `eca76c8`).**
- Place: `src/browser/view/world-area.tsx:21`: „The scene's picture is 336 × 152 pixels, and the screen shows it at a whole multiple (D-314).”
- What is wrong: D-314 says only that the background is a still forest in snow from loop's cut Pixel Crawler pictures; no entry says „whole multiple” (the task's *Context* quotes the old Loop's `Scene.tsx`). Also `.scene { max-width: 100%; height: auto }` lets the picture shrink by a fraction where the world area is narrower than the scene — only in windows narrower than about 740 px (the phone layout the task leaves out).
- Why it matters (small): a citation that sends the reader to an entry that does not say it.

**m5 — D-313 is silent on a case the code decides: a first discovered action or condition that needs a target no pick can name (Slice 3, `476b12a`; entry from the plan's *Foundation entries*).**
- Place: `src/browser/view/discovery-rule.ts:56-75`, where such an action or condition „gives way to the next one of the discovery”, then the conditions, then „Zawsze → Eksploruj”. D-313: „where the discovery holds an action, the rule is „Zawsze → {its first action}””.
- What is wrong: in that state the code writes a rule other than the one D-313's sentence names. Settled by the orchestrator (Q9) but not recorded in D-313. Tested with a hand-built Understanding (`tests/view/discovery-rule.test.mjs:132`, `:236`); unreachable on today's data.
- Why Minor: what D-313 literally asks is impossible there (the types allow no action of that kind without a target); the code fills a gap. The foundation should still say what the code does: one clause in D-313, or the answer left in the cycle record for the request.

**M1 (carried from review 1) — D-313's *Rejected* holds a way the row's source does not keep (WAY-134).** Graded Minor. The last item, adding the group „Program” where the copy holds no group, is the cycle's choice (plan *Choices*, Q7), not a way questions 5 and 10 weighed. Full wording: `report-review-1.md`.

**M2 (carried from review 1) — D-147 and D-185 keep *Rejected* reasons about an order the entries no longer have.** Graded Minor. „above discovery” and „below the status” refer to a removed layout.

**M3 (carried from the review of correction 1) — D-312's *complies* drag example is not qualified.** Graded Minor. Its *violates* twin says „Głód” holds no rule „Zawsze → Eksploruj”; the *complies* one does not. The code follows the binding sentence (the drag case with a player's own rule in „Głód” is tested and names „Głód”).

**M4 (carried from the review of correction 1) — D-312's „further cost” lists two of the three ways another group comes first.** Graded Minor. The third: the game's rule moved into a later group while a player's own „Zawsze → Eksploruj” stays in the first; the general clause covers it.

## Each slice that had no review of its own

| Slice | Commits | Judgment | Own-work check |
|---|---|---|---|
| 2 | `1f899ec` | `chillRuleGroupName` follows D-312; no type, saved document or constant changed; `SAVED_GAME_VERSION` stays 3. One mutant survives: m1. The executor read part of `guidelines/testing.md`; the reviewer read it whole and found no rule the 14 cases break. | Fits (the group as it stands now; drag, move, rename, delete cases); does not catch m1. |
| 3 | `476b12a` | `discoveryRule` follows D-313 and questions 5 and 10; pure, built on the editor's own functions; expected rules written out; the greyed action (Q9) the orchestrator's binding reading. Finding m5. | Fits the grid's „offers”; the „no matching item” case checks it. |
| 4 | `64a2fcf` | `addDiscoveredRule()` through `editCopy`, so `setProgram` zeroes the streak (D-131); shows the copy and opens the rule once through a request compared during render (React's pattern of keeping a value from the last render; no Effect; one new top-level `useState`, D-267); typed text committed first. Finding m2. | Fits (uncommitted text); checked by mutation M6. |
| 5 | `05cef64` | `RunHeader` follows D-311 and row 1 (name, map, `statusText`, „Pauza”/„Wznów”, five paces selected in their group D-130 D-276, „Restart”, the warning D-188, „Zakończ”, the last two destructive D-44); pause and paces gone after a death or completion (D-62, D-132); `positive` only after completion; clock in Geist Mono (D-46). Look seen in Slice 9's screenshots: one line at 1920 and 1280. | Fits; order and mono cases. |
| 6 | `eca76c8` | `WorldArea`, `TerrainDrawing`, `TileTable`, `tileLine` keep the old classes and show and hide as the DOM modules did; order per To do 4; no number on the drawing; campfire state in the table alone (D-70); the scene an `img` of `/sprites/forest-scene.png`, no text, sized by `SCENE_SCALE` = 2. Tile line wording recorded for the request (Q11). Finding m4. | Fits (one hovered key across two areas); the `Screen` host case. |
| 7 | `5389bf4` | The invariant test reads the React component through `renderToStaticMarkup` and a strict reader; no jsdom; states, reading and controls kept, a hovered drawing and a render check added; names D-19, quotes E18. A changed invariant test, named below. | Fits (the scan), checked on broken copies of the built `world-area.js`. |
| 8 | `8bac89d` | `DiscoveryBand`: text in `discovery` (D-39) with a bar in `currentColor` (D-279); the sentence from data labels; plain shared buttons (D-44); „Wznów” absent after the end (completion, and death — D-122 names only the completion; nothing left to go on to after a death); „Dodaj regułę z tym” greyed where `discoveryRule` gives null. | Fits; cases 6, 9 and their mutations. |
| 9 | `6c2f520` | `createRunScreen` keeps the boundary of `character-screen.tsx`, map run a parameter (D-281); header over three `screen-area`s (D-282); the panel's element placed by a layout effect with full dependencies and cleanup (D-267); right area the table or the rule host; layout sizes named in the stylesheet (D-43). `game-view.ts` outside *Change* justified, not a finding. Choice 5 against D-267: `onOpen` from the panel's layout effect keeps the screen's external store in sync — a system outside the screen's tree, which D-267 allows; no `update` from an Effect. Not a finding. | Fits: the focus in the right area after the button, checked in a real browser. |
| 10 | `b8bd52d`, `65f03ce`, `0f8a3e8`, `0f96357` | Only the DOM builders go; pure functions stay; each removed case names its carrier, each carrier read; removals carry the cause *Changing an existing test* asks (task item 8, D-265). | Fits; grep and carriers. |
| 11 | `ebce3d3` | `terrain-panel.ts` and `createTileListView` go; the DOM campfire case carried by `world-area.test.mjs`; the token-values control names `terrain-drawing.tsx` (a changed invariant test, below); docstring edit justified; the grep now exits 1 at the head. | Fits. |
| 12 | `1057f7d` | New rows in order with `copy`/`—`; old rows gone; table matches `git ls-files -- src/browser/view`; example moved to `headquarters.ts`, its claims hold (`headquarters.ts:237`, `:386-396`, `:457`, `:538-540`); dead rules removed, no class in use removed. The reviewer read D-265 and D-267 whole: nothing against the rewritten paragraph. `coding/kinds.md:15-16` gives `copy` to every file of the kind that breaks no rule; none of the seven new files breaks one, so Q4's `copy` follows the rule. Finding m3. | Fits; table script and grep. |

No blocking finding, so none has a slice to name.

## Coverage of the task

| Task item | Met by | Judgment |
|---|---|---|
| Outcome — one header with the goal in numbers; world, program, right area; a still forest frame; the scene size chosen | Slices 1, 5, 6, 9; D-311 | Met in code; size committed as 672 × 304 until the human picks at the request (question 1); screenshots of both exist |
| To do 1 — header: name, map, whole status row unchanged, the goal's numbers in order | `run-header.tsx`; `statusText` unchanged | Met |
| To do 2 — three separate areas a narrower layout can rearrange | `run-screen.tsx`, `.run-screen-areas` | Met; seen below the threshold |
| To do 3 — right area: rule panel while editing, else the table; the end not there | `run-screen.tsx:139-144` | Met |
| To do 4 — world area order; end lines under the encounter; three lines between backpack and drawing | `world-area.tsx:66-109`; `world-area.test.mjs:177` | Met |
| To do 5 — line of a tile; no numbers on the drawing; hovering links tile and row | `tileLine`, `terrain-drawing.tsx`, `tile-table.tsx`; invariant test | Met |
| To do 6 — still frame in snow, full light, Pixel Crawler PNG directly in `assets/sprites/`, no text; both sizes on the real screen | Slice 1 (reviewed), Slice 9 screenshots | Met; the human's pick to come |
| To do 7 — the band: text, buttons, how long, what the button adds, where the panel opens, streak to 0, the sentence with the copy's group, one resumption | Slices 2, 3, 4, 8, 9 | Met; m1, m2, m5 Minor |
| To do 8 — React screen; map run a parameter; shared React controls; destructive React button | Slices 5, 8, 9, 10, 11 | Met; fallback not needed |
| To do 9 — guideline rows and the example on a module still in DOM | Slice 12 | Met |
| To do 10 — every entry *Decisions in play* assigns, D-46 example, sentences of place in D-147, D-185, D-216 | `cd8ff84`, `9defb90`, `e35e91d` | Met; M1–M4 Minor |
| Questions 1–10 | as the plan's *Coverage* | Met; question 8: no permanent refusal test, none added |
| Carried questions 1–4 | Slice 1 recipe (in `.runs`); Slice 9 layout (Q12); Slice 2 (no change of shape) | Met; layout sizes material for the request |

Settlements to record: row 1 → D-311; row 2 → D-314; row 3 → D-315; row 4 → D-313; row 5 → D-312; each in the foundation and the code does what each says (D-312 and D-313 within m1 and m5).

Projected entries: D-130 and D-19 whole in the projected wording, D-19 with the projected *Rationale* sentence word for word; layout → D-311 (part); D-133 part, in the header; D-147, D-185, D-216 sentences of place only; D-281 unchanged and true of `run-screen.tsx:195`; D-282 Verification example names the three areas; D-122 part; D-272 „as the scene” added, stale example replaced; D-271 unchanged; `loop2-container-sprites` left to task 20; D-03 unchanged, screen now `.tsx`; D-46 example corrected. The code matches each.

Trust boundary: `assets/sprites/forest-scene.png` holds only `IHDR`, `IDAT`, `IEND` at 336 × 152, no bytes after `IEND`; nothing later changes `assets/`, `scripts/`, `Dockerfile` or `.dockerignore`; `src/browser/sim/saved-game.ts` not changed.

The pin commit: `44317eb` holds only the gitlink `.the-way` (`git show --name-only`), at `61c72fb`.

Source fidelity: the band's sentence, the header's order, D-19's added sentence and the D-130 wording match the task word for word. Nothing invented in place of a source: the tile line's wording and the layout sizes had no source and were named and recorded (Q11, Q12); D-313's give-way rule is m5.

## Real-browser evidence

Viewed in `.runs/task-cycles/ekran-przejscia/screenshots/`: `scene-672x304-window-1920.png`, `band-first-chill-scale2-1920.png`, `scene-672x304-window-1280-rule-panel.png`, `scene-672x304-window-1200-narrower.png`, `hover-row-scale2-1920.png`. They show: the header on one line, status in the mono face; the three areas side by side, one under another below the threshold; the band above the program in `discovery` with its bar and both buttons; the rule panel in the right area in place of the table; after a death the settlement line under the scene; a hovered row giving the tile line with numbers; no text on the scene. At scale 2 in a 1280 window the program column is 174 px and its buttons wrap — material for the human's choice of size, not a defect. Other screenshots not viewed.

## Declined to judge

- Which scene size to keep: the human's choice (question 1).
- The layout sizes (336 px right column, 170 px program minimum, thresholds 940 and 1276 px): the human's material (Q12).
- The wording of the tile line: no source (Q11).
- Fractional scaling of the scene below about 740 px: phone layout out of scope.
- A discovered action the character cannot use yet written greyed (Q9): the orchestrator's binding reading.
- „terrain panel” / „panel terenu” in D-19, D-70, D-125, D-45 and the styleguide's *Bad* example: projected or foundation wording, outside this task.
- D-130's *Rejected* without reasons: the projected wording written whole.
- The no-op case of `account-screen.test.mjs` clicking the hidden screen's „Wznów” after „Zakończ”: cause named (task item 8); Slice 9's mutation shows it still catches a save of an unchanged state.
- The comments over `StatusRowControls` and over the pure discovery cases in `status-row.test.mjs`: roughly true, polish below a finding.
- The form of the request and its description: not part of this range.

## Checks run

| Check | Command or method | Exit | Result |
|---|---|---|---|
| head | `git rev-parse HEAD` | 0 | `1057f7d…` |
| range | `git log --oneline d50158a..1057f7d`; `git diff --stat d50158a..1057f7d`; `git diff` of `foundations/`, `README.md`, `src/`, `tests/view/account-screen.test.mjs`, `tests/invariants/test_browser_view_token_values.py` | 0 | 21 commits, 39 files |
| pin commit | `git show --name-only 44317eb`; `git ls-files --stage -- .the-way`; `git -C .the-way rev-parse HEAD` | 0 | only `.the-way`, at `61c72fb` |
| record commits | `git diff --stat 9defb90 3c4291d`; `git diff --stat d50158a..1057f7d -- docs` | 0 | both empty |
| boundary | `git diff --stat d50158a..1057f7d -- scripts Dockerfile .dockerignore src/browser/sim/saved-game.ts assets` | 0 | only `assets/sprites/forest-scene.png` |
| PNG chunks | `python -I -c` with a chunk reader | 0 | 336 152 `['IDAT','IEND','IHDR']`, ends at `IEND` |
| focused tests | `npm test -- <file>` for `tests/sim/discovery.test.mjs`, `tests/view/discovery-rule`, `program-panel`, `run-header`, `world-area`, `tile-list`, `discovery-band`, `run-screen`, `account-screen`, `status-row`, `combat-line`, `body-row`, `trip`, `react-controls` (`.test.mjs`) | 0 each | pass |
| invariant tests | `npm test -- tests/invariants/test_terrain_drawing_numbers.py`; `…/test_browser_view_token_values.py`; `…/test_browser_view_focus_outline.py`; `…/test_browser_view_framework.py`; `…/test_application_build_kitchen_sink.py` | 0 each | 3, 4, 3, 9, 3 OK |
| quality | `npm test -- tests/quality/test_quality_invariants.py` (venv on `PATH`); `npm test -- tests/quality/test_node_test_selection.py` | 0, 0 | 5 OK, 1 OK |
| types | `npm run typecheck` | 0 | — |
| foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 | „0 errors” |
| mutation | `node node_modules/@stryker-mutator/core/bin/stryker.js run --mutate "src/browser/sim/understanding.ts:461-482"` | 0 | 26 killed, 1 survived → m1 |
| removed names | `git grep -n -E "createStatusRow\|createBodyRow\|createCombatLine\|createTripLines\|createTerrainPanel\|createTileListView\|terrain-panel" -- src tests` | 1 | no match |
| dead classes | `git grep -n -E "status-row\"\|discovery-text\|terrain-panel\|map-column\|run-panel\|\.columns" -- src tests scripts` | 0 | only `list.columns` and a test fixture string |
| screenshots | five PNGs viewed | — | as described |
| worktree | `git status --short` after all runs | 0 | clean; only ignored `dist/`, `.runs/stryker/`, `.stryker-tmp/` written |

Changed invariant tests: `tests/invariants/test_terrain_drawing_numbers.py` (Slice 7; docstring also Slice 11); `tests/invariants/test_browser_view_token_values.py`, control `test_control_the_population_is_the_part_less_the_token_file` (Slice 11).

Not run: the full `npm test` (the cycle's); a real-browser walk of its own (Slice 9's walk and screenshots inspected).

## Reaches beyond the dispatch

- `foundations/part_map.md` whole (browser-view, simulation, build-tools, agent-workflow, product-foundation).
- `foundations/decisions.md`, each whole: D-267, D-265, D-281, D-282, D-124, D-306, D-166, D-280, D-188; D-311 to D-315 and the changed D-19, D-46, D-122, D-130, D-133, D-147, D-185, D-216, D-272, D-282 through the diff. Not read whole: the other decisions whose *Scope* names browser-view or simulation (selected by what the diff reaches).
- Guidelines whole: `guidelines/coding.md`, `coding-browser-module.md`, `coding-simulation-module.md`, `styleguide-browser-view.md`, `testing.md` (all 454 lines; line 169 in folded pieces), `src/browser/AGENTS.md`.
- `.the-way/product-guidelines/reading.md`, `.the-way/elements/common/way_of_working.md` („Reading the foundation”), `.the-way/product-guidelines/coding/template.md:214-240, 300-320`, `.the-way/product-guidelines/coding/kinds.md:15-21`.
- `report-review-1.md`, `report-review-correction-1.md`.
- Code: base `run-screen.ts`, `terrain-panel.ts`, `trip-lines.ts:100-140`; `understanding.ts:400-482`; `rule-panel.tsx:575-615`; `headquarters.ts` (grep).

## Searches not found or unclear

- „whole multiple” in D-314 or any entry: not found (m4).
- An entry or guideline giving the width the rule panel of task 5 takes: not found; the 336 px column rests on the browser's measurement.
- What D-313 asks when the first discovered action needs a target none can name: not found (m5).
- Whether the band's „Dodaj regułę z tym” should stay usable after a death or a completion: nothing either way; D-166 lets the copy be edited after the end, so not raised.
