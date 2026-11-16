FAIL 5b3dac418ed9d744c4e9854b068909b96944be57

# Review of the whole change, pass 1 (code and tests) — cycle `drobne-bledy-ekranow`

- Range: `bd82d394e8ea08c77c8c8afb695bd931706f1644..5b3dac418ed9d744c4e9854b068909b96944be57` (27 commits; `git rev-parse HEAD` confirmed `5b3dac41…`; `.the-way` at `bfb2e109…`, equal to the gitlink).
- Scope: every changed file under `src/**` and `tests/**` and the comments of `src/browser/*.css`, against the frozen task, each slice of the plan and the foundation of `browser-view` and `simulation`. `foundations/decisions.md`, `guidelines/styleguide-browser-view.md` and the re-quoted `decision:` lines of commit `dddbc7d5` are pass 2's; I read them only as the standard.
- Counts: blocking 1 (Important); Minor within the task 4; out of scope 3 (all Minor).

## Blocking findings

### B1 (Important) — twelve `decision:` lines the slices wrote quote no binding sentence, so the foundation check fails and the one command `npm test` fails at the head

Anchors (each line as `foundation_check.py` reports it, with its slice):

- `tests/view/shared-controls.test.mjs:787` — slice 2 (`f4489d36`): `// decision: D-267 "that an Effect serves to synchronize with such a system, never to transform data for rendering or to handle a user event"` — "the quotation does not begin a sentence of `D-267`".
- `tests/view/program-panel.test.mjs:1993` — slice 8 (`85e379de`): `// decision: D-306 "moving the rule to another group, by an arrow or by the handle, closes nothing, and the panel stays open on the same field and goes with the rule to its new group"` — "does not begin a sentence of `D-306`".
- `tests/view/program-panel.test.mjs:617` — slice 9 (`eb8986aa`): `// decision: D-174 "During a map run ... its click switches the character to that program at once, and the panel shows „Kopia w przejściu” again"` — "stands in no binding sentence of `D-174`" (the `...` is an elision that is not in the decision).
- `tests/view/program-panel.test.mjs:647` — slice 9 (`eb8986aa`): `// decision: D-164 "a map run restart carries on the copy of the map run it replaces as it is, its unsaved changes included"` — "does not begin a sentence of `D-164`".
- `tests/view/login-card-focus.test.mjs:218`, `:233`, `:249`, `:303` — slice 15 (`0f269e61`, `dc787331`): `// decision: D-381 "…after an emailed link the server refused and after „Anuluj” of the form „Ustaw nowe hasło” — and the card closes from its own handlers of an answer and of a click, never while it is being drawn."` — "stands in no binding sentence of `D-381`" (the leading `…` is not in the decision).
- `tests/view/login-card-focus.test.mjs:269` — slice 15 (`0f269e61`): `// decision: D-381 "Where the session check leads to the game instead, nothing changes."` — "stands in no binding sentence of `D-381`". This sentence is not in D-381 at all: it is a sentence of the plan's Slice 15 *Goal* (`plan.md`, "Where the session check leads to the game instead, nothing changes."), quoted as if it were the decision.
- `tests/view/login-card-focus.test.mjs:318` — slice 15 (`dc787331`): `// decision: D-381 "The card takes no focus when it opens — the page moves focus to it only after a confirmed logout, after a logout the server answers with no session, after a password was set, after an emailed link the server refused and after „Anuluj” of the form „Ustaw nowe hasło”."` — "stands in no binding sentence of `D-381`" (the sentence is cut and given a full stop where D-381 goes on with "— and the card closes …").
- `tests/view/game-saver.test.mjs:527`, `:561` — slice 16 (`1130a9be`): `// decision: D-208 "each time with the game state of that moment and at once at a moment of saving of D-207, until a save succeeds and the sentence goes"` — "does not begin a sentence of `D-208`".

Why it exists and the mechanism: a `decision:` line ties a test to the sentence of the foundation that is the source of its expected value (`guidelines/testing.md`, "Where the expected value comes from"), and `foundation_check.py` holds each such line to begin a binding sentence of the decision it names, word for word. The foundation agent left the check green at `fecbea47` (its report: "exit 0, `0 errors`"); every slice after it ran only focused `npm test -- <file>` runs, which by `guidelines/testing.md` ("Test files in the gate") run no foundation check, and none of the five slices ran `foundation_check.py`. So the lines they wrote with a mid-sentence start, an ellipsis, a truncation or a sentence from the plan were never checked. At the head the one command runs the foundation check and stops red, so the request cannot pass the gate (AGENTS.md: "Before a merge, run every test … which runs `python -B .the-way/elements/common/foundation_check.py` too"). Line 269 is worse than a form fault: it presents a sentence of the plan as the decision, which `guidelines/testing.md` forbids ("Komentarz testu nie wskazuje dokumentu spoza fundamentu"), and a later reader looking for it in D-381 finds nothing.

Example with concrete values: `python -B .the-way/elements/common/foundation_check.py` at `5b3dac41` exits 1 with "12 errors"; at `fecbea47` it exited 0.

Fix: re-quote each line to the start of a binding sentence the test still holds — for D-306 `"After the last field the panel stays open, and „✕”, Escape or opening another rule closes it, as does deleting the rule; moving the rule to another group, by an arrow or by the handle, closes nothing, and the panel stays open on the same field and goes with the rule to its new group"`; for D-381 the whole second sentence `"The card takes no focus when it opens — the page moves focus to it only after … after an emailed link the server refused and after „Anuluj” of the form „Ustaw nowe hasło” — and the card closes from its own handlers of an answer and of a click, never while it is being drawn."` (and drop line 269's quotation or replace it by that same sentence); for D-208 the second sentence from "When one fails, …"; for D-164 the first sentence from "Programs belong to the player, …"; for D-174 the second sentence without the elision; for D-267 the whole binding sentence from "No tool guards the rules of hooks and of effects: …". Then run the foundation check and see `0 errors`.

Slices: spans 2, 8, 9, 15 and 16 (commits named above). Pass 2 reads the `decision:` lines of `dddbc7d5`; these twelve are new lines of the slices and are not among them.

## Minor findings within the task's scope

### M1 — `tests/view/menu-bar.test.mjs:318` and `:325`: the test „a click on an item of the bar, which stands outside the menu, closes it” asserts that focus lands on „Konto”, which a real browser does not do under the changed D-285

The test exists to show that a click on a bar item closes the menu (D-285). It presses „Mapy” with `press`, which fires a click without moving focus, so the focus is on the body and the new rule sends it to „Konto”; line 325 then asserts `active()` is „Konto”. In a real browser a link takes focus on mousedown and D-285 now leaves it there. I checked it in the running game (Chromium, 1280 × 720): menu open, a real click on „Mapy” → menu closed, `document.activeElement` = `A`, text „Mapy”, address `#/mapy`. The assertion therefore pins a jsdom artifact that contradicts the decision the test quotes, and it would fail a correct change that, for example, models the browser's focus in `press`. Fix: focus the link before the press, as the rewritten neighbour test does with `field.focus()`, and assert the focus stays on the link; or drop the focus assertion and keep the closing. Slice 17 (`2d62c5d2`; its executor raised this as question 1 and left it).

### M2 — `src/browser/view/rule-list.tsx:168`, `:182`, `:190`–`:207`: `focusAfter` moved with its branches `up`, `down` and `add`, which nothing calls, and the type members only those branches use

To do 13 asks the program editor's module to lose the focus types of the old editor. Slice 6 moved `FocusTarget`, `StructuralEdit` and `focusAfter` whole into `rule-list.tsx`; the list calls `focusAfter` only with `"remove"` (its moves and its „+ reguła” build their own keys), and the one test of the other branches was deleted with the move. After the change three branches and the `"condition" | "up" | "down"` members exist only for `keysOf`'s matching branches and have no caller and no test — code that has no user, which `whole_change.md` asks to name. Cost if left: a reader takes the arrow branches for the live path of the focus after „↑”/„↓” and changes the wrong code. Fix: narrow `focusAfter` to the removal (its two results) and drop the dead members and `keysOf` branches. The cycle lists this as deliberate decision 5; I grade it Minor, no size rule applies (`guidelines/coding.md` has no `### Size of a function and a file`). Slice 6 (`23aa5440`).

### M3 — `tests/view/program-panel.test.mjs:590`, `:613`, `:1989`: test comments point to the task document („(To do 7)”, „To do 15”)

`guidelines/testing.md`, "Where the expected value comes from": „Komentarz testu nie wskazuje dokumentu spoza fundamentu.” „To do 7” and „To do 15” name points of `.runs/task-cycles/drobne-bledy-ekranow/task.md`, a file that lives only in the ignored record of this cycle, so after the merge the reference leads nowhere. The decisions named beside them (D-294, D-306) already carry the requirement. Fix: delete „(To do 7)” and „, To do 15”. Slices 9 (`eb8986aa`) and 8 (`85e379de`).

### M4 — `src/browser/view/tile-table.tsx:78` (`<Fragment key={text}>`) and `src/browser/view/terrain-drawing.tsx:95` (`classes.push("hovered")`): a key built from the visible text, and a class that no longer means what it says

The fire cell keys its spans by their text. Two equal texts in one row would give React duplicate keys, which it reports and which can drop or duplicate a child on update. With today's data I found no way to two equal texts on one tile — one campfire per tile (`run.ts:263`, `if (here …) return state`) and lit sticks a lighting of 5 game minutes apart (`actions.ts:141`), so their minutes left differ — so this is fragility, not a defect: the index (`key={index}`) is the stable key of a list that is only rebuilt. Second, a hovered unrevealed tile keeps the class `hovered` on its `g`, though after slice 12 such a tile is by D-41 not „the same place” as any row; no rule reads `.tile.hovered` (searched `src/browser/*.css` and the `.tsx` files), so nothing is drawn, but the class name says hover-linking where there is none. Fix: `key={index}`; push `hovered` only for a revealed tile, or leave it with a comment. Slice 12 (`798c278a`).

## Minor findings outside the task's scope

### O1 — `src/browser/view/scene.tsx:742`, `:749`, `:759`: the effects of an ordinary event and the return of the tint end only on `animationend`, so a scene hidden while one runs plays it again on the return

Out of the task's scope: To do 10 names the mage's walk only. Slice 19 found that hiding the screen of a map run makes the browser cancel every animation (`animationcancel`), and made the walk end on that cancel (`scene.tsx:784`). `effectEnded`, `creatureEnded` and `tintReturned` still end only on `animationend`, and the cancel listener (`watchCancel`, `scene.tsx:779`–`790`) handles only the walk and a moment's effect. By the code, a flight, a dust cloud or a wolf's run (≤ 300 ms) or a 2-second tint return cut by leaving the screen keeps its element and its animation, and the browser starts it again from the beginning when the screen shows — an overdue effect played, which D-317 drops („an effect overdue when its turn comes is dropped”). Not verified in the browser (slice 19's concern 1; I did not reproduce it). Fix, when taken up: call the same end from the `animationcancel` listener for those elements.

### O2 — the decimal separator differs between the sentence of a rule and the rest of the screen

Out of scope (pre-existing; the task is about the unit). In the running game the row reads „Temperatura poniżej 36.5 °C”, while the number field beside it shows „36,5” and the body row „Temperatura 36,8 °C”. Now that the unit stands next to the number, the dot reads even more as a foreign format beside the comma of the body row. Source: `conditionSentence` (`src/browser/view/program-editor.ts:796`–`799`) writes `${condition.value}` as JavaScript prints it.

### O3 — Prettier fails on the two Markdown files the change touches (pass 2's files)

Out of my scope, named for pass 2: `npx prettier --check` on every changed file exits 1 on `foundations/decisions.md` and `guidelines/styleguide-browser-view.md`; the same two files at the base pass (exit 0). The invariant `prettier-source-format` does not cover Markdown (`PRETTIER_PATTERNS` in `tests/quality/test_quality_invariants.py`), so the gate does not fail on it.

## Declined to judge

- The rule panel that stays open on a rule of the same number in the next copy (a panel open in one map run, „Zakończ”, a new send): pre-existing (the copy's key is always `copy`), raised by slice 8 and touched by no point of the task.
- A drop onto the middle of an empty rule group's body that does not land the rule (first real-browser drag below): drag-and-drop targets are not in the task; the drop onto the group's header worked.
- Earning loops and D-294: deliberate decision 4 of the cycle; the task names a send and a switch.
- The wording of every decision and of the styleguide at the head: pass 2.

## The task, point by point (code and tests)

| To do | Where | Judgement |
|---|---|---|
| 1 | `terrain-drawing.tsx:73`–`75`, test `world-area.test.mjs` | met; slice 12 checked the hover in a real browser; M4 on the class |
| 2 | `headquarters.css:152`–`157` | met (slice 13 measured it; the fault shows only below the smallest window of D-396, the styleguide rule is general) |
| 3 | `program-editor.ts:790`–`799`, `rule-panel.tsx:466`–`497`, `combat-line.ts:12`–`20`, test `data.test.mjs` | met; I saw „Temperatura poniżej 36.5 °C” in the row and „°C” beside the field, on the field's line (unit box 858–872 px, input 768–850 px, same height) in the running game; the wolf's sentence not seen in a browser (needs a fight), held by five text tests |
| 4 | `app.ts:306`, `541`, `599`–`602`, `803`, `824`; `email-confirmation.ts` | met; B1 on the test lines |
| 5 | `headquarters.tsx`, `character-screen.tsx` | met (relies on the stop being drawn synchronously, as `takePractice` does; checked by slice 14 in a browser) |
| 6 | `program-panel.tsx:426`–`440` | met |
| 7 | `program-panel.tsx:262`–`272`, `798`–`817` | met (send, switch; restart keeps folds) |
| 8, 9 | `styles.css:425`–`443`, `react-pick-cell.tsx` | met; specificity 0,4,0 over 0,3,0; base background is `transparent` (`styles.css:280`), so the greyed hover looks as at rest |
| 10 | `scene.tsx:732`–`741`, `779`–`790` | met; O1 outside |
| 11 | `styles.css:631`–`643`, `tile-table.tsx` | met (slice 12 measured 704/704 at 1280 × 720) |
| 12 | no commit | the argument holds: D-194 pays only at the completion that first solves the map and leaves practice as it was at „Zakończ”; D-201 shows practice gathered, and its *Rationale* accepts that the line does not say a „Zakończ” loses it |
| 13 | `rule-panel.tsx:444`; `program-editor.ts` (no focus type, no comment of the DOM editor left — searched `DOM|select|focus|dropdown`, none; positive control `conditionSentence` found 3); `credit-lines.ts` (`ActionDef` requires `icon` and `iconTitle`); `scene-picture.test.mjs` (really loads) | met; M2 |
| 14, 16, 23, 24 | documents only | pass 2 |
| 15 | `program-panel.tsx:311`–`323`, `475`–`478`; `rule-panel.tsx:228`–`233` | met; rule numbers are unique in a program (`nextRuleId` program-wide, `programs.ts:242`–`264`); I saw the drag across a group border in a real browser: the panel stays under the row, heading „Reguła 2.1”, field „Czynność” |
| 17 | `game-saver.ts:226`–`230` | met; `sendNow` cancels the planned retry (`:148`), `check` returns during a request; too-large sets `failures = 0`, so it is not resent |
| 18 | `menu-bar.tsx:154`–`169` | met in the code (checked in a real browser: a click on „Mapy” leaves focus on the link); M1 on the test |
| 19 | `end-question.tsx:22`–`26`, `program-panel.tsx:657` | met; seen in the running game: „Program Program ma zmiany, których nie ma w tej kopii.” with „Zapisz w programie” disabled, and the full sentence once the copy had unsaved changes |
| 20 | `scene.tsx:519`–`526`, `593`–`600` | met; a death or a completion mid-walk also freezes the mage where it is (`goalOf` returns STAYS there), which agrees with D-322 (nothing but the moment's effect moves) |
| 21 | `chronicle-entries.ts:294` | met; seen in the running game: „Zmieniono regułę 1.1: „Zawsze → Eksploruj” na „Temperatura poniżej 36.5 °C → Eksploruj”” |
| 22, 25 | `run-screen.css:742`–`746`; seven „above” comments and `styles.css:13`–`16` | met; comments only |

Settlements 1–17 as far as code and tests carry them: rows 2, 5, 6, 8, 9, 15, 17 have their code (slices 8, 16, 17, 10, 11, 9, 15); row 10 its comment; row 12 its CSS; row 13 its CSS; row 14 its code in slices 8, 14, 15; row 16 its test (`data.test.mjs`) and the three places. Rows 1, 3, 4, 7, 11 change no code. No behaviour beyond the task and its answers found.

## Checks

| Check | Command | Exit | Result |
|---|---|---|---|
| Head and pin | `git rev-parse HEAD`; `git -C .the-way rev-parse HEAD`; `git ls-files --stage -- .the-way` | 0 | `5b3dac41…`; `bfb2e109…` = gitlink |
| Lint | `npx eslint` on the changed `.ts`, `.tsx`, `.mjs` files | 0 | clean |
| Format | `npx prettier --check` on every changed file | 1 | only `foundations/decisions.md` and `guidelines/styleguide-browser-view.md` (O3); the same two at the base: exit 0 |
| Foundation check | `python -B .the-way/elements/common/foundation_check.py` | 1 | 12 errors (B1) |
| Instruction check | `python -B .the-way/instruction-files/check_instructions.py` | 0 | 0 errors, 142 warnings (dead paths of unchanged lines) |
| File sizes | `python -B .the-way/task-cycle/change_file_sizes.py bd82d394… 5b3dac41…` | 0 | largest code growth `rule-list.tsx` +41 (793), `program-panel.tsx` +40 (861); no size rule in the guidelines, so no threshold test to run |
| Focused tests | `npm test -- <file>` for each of 25 files: `menu-bar`, `program-panel`, `game-saver`, `login-card-focus`, `scene`, `run-screen`, `world-area`, `rule-editor`, `shared-controls`, `headquarters-screen`, `character-screen`, `program-editor`, `chronicle-entries`, `combat-line`, `scene-picture`, `email-confirmation`, `end-question`, `chronicle-game`, `end-window`, `tabs-area`, `account-screen` (under `tests/view/`), `tests/sim/data.test.mjs`, `tests/sim/copy-actions.test.mjs`, `tests/sim/trip.test.mjs`, `tests/account-api.test.mjs` | 0 each | log kept: `reports/review-whole-focused-tests.log` |
| Real browser | `npm run local` (game at `https://127.0.0.1:51092`), Playwright CLI 0.1.22, 1280 × 720, a made-up account at `example.test`, the state of `.claude/skills/loop2-play/compose-state.mjs` | — | (1) menu „Konto” open, real click on „Mapy”: closed, focus on the link „Mapy”; (2) rule „Temperatura poniżej”: row „Temperatura poniżej 36.5 °C”, „°C” beside the number field on its line, colour `rgb(212, 212, 216)`; (3) chronicle entry of a changed rule in the new form; (4) short and full line of D-172 as To do 19 gives; (5) drag of a rule's handle onto the header of the next group: rule in group 2, panel open under its row on „Czynność”, heading „Reguła 2.1”; a first drop onto the middle of the empty group did not land (declined); console 0 errors. Wolf's sentence not seen (needs a fight). One screenshot looked at, not shown, deleted; nothing pushed |
| Mutation testing | not run | — | no file of `simulation` changed (only `tests/sim/*`), so `guidelines/testing.md` "Mutation testing" asks no run |
| Full suite | not run | — | the orchestrator's, as the handoff gives |

## Reaches beyond the handoff

- `src/browser/sim/run.ts:240`–`310` and `src/browser/sim/data/actions.ts:137`–`141`: whether two equal fire texts can stand on one tile (M4).
- `src/browser/sim/game.ts:499`–`548`: the events of `restart` and `end` (slice 9's new-copy rule).
- `src/browser/view/run-entry.ts:200`–`277`: that the run panel is `always` and receives the events of a send.
- `src/browser/view/scene-picture.ts:150`–`200` (`goalOf`): which goals stay (slice 18, death and completion).
- `src/browser/sim/programs.ts` and `program-editor.ts` by search for `nextRuleId`: uniqueness of rule numbers (carried item of slice 8).
- `src/browser/sim/understanding.ts:195`–`214`: whether another place writes a condition's number without unit (it does not).
- `a note in the author's private notes`: required before any script by the user's rules.

## Working copies

- `.runs/review-whole/` held the diffs of the range, the decision index, base copies of two Markdown files for the Prettier comparison, and the logs of the local start and of the focused tests; the focused-test log was copied to `reports/review-whole-focused-tests.log`, and the directory was removed.
- `.playwright-cli/` (the CLI's own folder, with the composed state, the run-code scripts and one screenshot): removed; the browser closed; the local start stopped (`npm run local:stop`: "Local starts stopped: 1").
- Left by the product's own tools, no copy of mine: `dist/` (build) and `.runs/local-start/` (the start's database, which the next start removes).

## Unread material

17 decisions of the index of my selection read whole: D-84, D-85, D-87, D-88, D-89, D-194, D-201, D-285, D-294, D-295, D-296, D-297, D-306, D-318, D-319, D-350, D-381. Read in part: D-04 (statement and *Verification*, not *Rationale*/*Rejected*), D-207 (to the middle of *Rejected*). The other decisions bearing on the change were read by their binding sentences in the index only: D-172, D-342, D-164, D-174, D-208, D-245, D-313, D-316, D-317, D-322, D-396, D-41, D-19, D-70, D-385, D-421, D-43, D-267, D-376, D-151. No invariant entry was read whole (the invariant tests the change reaches were run by the slices; none was changed). The glossary was not read. Guidelines read whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/testing.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`, and `guidelines/coding-browser-api-client.md` (to judge it does not apply). Not read: `guidelines/coding-content-data.md` and `guidelines/coding-simulation-module.md` (no file of those kinds changed). Reports read whole: the foundation agent's and slices 1–21; the planner's report not read. Of the plan, the whole was read.

## Searches not found or unclear

- `### Size of a function and a file` in `guidelines/`: not found, so there is no size invariant test to run in base and head worktrees.
- A way the game puts two equal texts in one fire cell: none found (M4).
- A test that deleting a rule closes its open panel (D-306): none in `tests/view/program-panel.test.mjs`; D-306 leaves it to an agent's comparison, and the code does it (`program-panel.tsx:478`).
- Comments of the old DOM editor left in `program-editor.ts`: none found (search `DOM|select\b|createElement|old editor|dropdown|<select|focus`, case-insensitive; positive control `conditionSentence` found 3 times).
- Whether `.button.pick-cell` without an icon leaves an empty second grid column with its gap: not measured; the condition cells looked as before in the screenshot of the running game.
