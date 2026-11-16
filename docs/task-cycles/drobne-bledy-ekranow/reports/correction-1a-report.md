# Report — correction 1, part A (code and tests), cycle `drobne-bledy-ekranow`

**Status:** done with concerns (the concerns are observations beyond the remarks, see "Problems as observed"; nothing blocks).

**Update after the orchestrator's message (extension of 1(c)):** the places this report first left open (`h2.program-title`, `copy-heading`) and every other element of the view that shows text the player typed are now done, in a commit of its own (`8b068a5b`); see the section "Extension of 1(c)" below. Where the text below says a place is left, read that section: it supersedes it.

## Commits (on top of `c015e4c6`; head `8b068a5b`)

| Commit | Remark |
|---|---|
| `4c6b4496` fix: end a flight, a dust cloud, a wolf's run and the return of the tint that leaving the screen cancelled, so the return does not play them again from their start | 1(a) |
| `63f615e7` fix: write a number with a fraction in the sentence of a rule with the decimal comma of the body row, so „36,5 °C” reads the same in the row, the group's header, the chronicle and the end-of-run window | 1(b) |
| `0c539660` test: bring the title and the comment that name the rule „Zapas poniżej 8 · Patyk” to the sentence as it reads now, with „szt.” | 4 |
| `786a4ca0` fix: break a long name with no space inside its row on the list of Programy, in „Kto idzie”, in the heading of Postać and in the header of a rule group, so the styleguide rule of a typed name holds there too | 1(c) |
| `8b068a5b` fix: break a long name or address with no space inside its row in the header of the run screen, the heading of the program, the lines that name a program, a group or a character and the account menu, so the styleguide rule of a typed name holds in every row that shows one | 1(c), extension (+40 lines of CSS in `accounts-screen.css`, `headquarters.css`, `program-panel.css`, `run-screen.css`, `styles.css`) |

Files (added / removed lines): `src/browser/view/scene.tsx` +29/−11; `tests/view/scene.test.mjs` +96; `src/browser/view/program-editor.ts` +9/−2; `src/browser/view/body-row.ts` +5/−2; `tests/view/program-editor.test.mjs` +28; `tests/view/rule-editor.test.mjs` +1/−1; `tests/view/program-panel.test.mjs` +1/−1; `src/browser/programs-screen.css` +3; `src/browser/maps-screen.css` +5; `src/browser/character-screen.css` +3; `src/browser/program-panel.css` +5. No file of `foundations/` or `guidelines/` is touched.

## Each remark, as the human made it, and how it was made

### 1(a) — „Call the same end from the `animationcancel` listener for those elements, as slice 19 did for the walk, and check it in the running game”

Made. In `src/browser/view/scene.tsx` the three ends are now one function each — `effectOver(serial)` (flight, dust), `creatureOver(serial)` (the wolf's run in, fall and run off), `tintOver()` (the return of the tint) — called by the `onEnd`/`onAnimationEnd` handlers as before (still only where the event's target is the element itself) and by the scene's native `animationcancel` listener (`watchCancel`, the one that already ends the walk and a moment's effect). The listener ends, by the target of the cancel: `.scene-creature-effect` → `creatureOver`; `.scene-effect` → `effectOver`; `.scene-creature[data-entering]` → `creatureOver`; `.scene-tint[data-returning]` → `tintOver`. The cancels of the children (the plaque, the sheets) are ignored, as the walk's are. The header comment of the module says it in two sentences.

Test: `tests/view/scene.test.mjs`, next to the case of the moment's cancel (the case that holds `cancelAnimation`): „an effect or a return of the tint cut by leaving the screen is over as its animation's end makes it, and a scene shown again does not play it”. It covers the flight, the dust, the wolf's run in, the fall of a defeated wolf, the run off of a departing wolf and the return of the tint: each is made, cut (the cancel is fired on the element and everything under it, as the browser does), seen over, and still over after the same state is drawn again.
- Failing first: `npm.cmd test -- tests/view/scene.test.mjs` exit 1; the case fails on „the flight of an icon: over when cut: expected a true value, got false” (log `reports/correction-1a-scene-red.log`). The loop stops at the first case, so I also broke each of the four branches of the listener in turn (replaced its selector with one that matches nothing), restored the file and ran the file each time: each of the four breaks fails its own case (the fall of a defeated wolf, the flight, the wolf's run in, the return of the tint); all four runs exit 1; the file was restored byte for byte (`cmp`) before I committed.
- Passing after: `npm.cmd test -- tests/view/scene.test.mjs` exit 0 (73 of 73).

In the running game (Playwright CLI at 1280 × 720, `npm run local`, states composed with the simulation and sent by the page's save request, as `loop2-play` gives): an effect is cut 100 ms into its life by leaving the screen of the run (the hash to `#/mapy`; the registry hides the screen, so the browser cancels the animations), the screen is shown again after 1.2 s and the effect is looked for. **All five effects could be triggered**: the flight of an icon (a hit of „Zbierz”), the cloud of dust (a miss), the wolf's run in, the outcome of a combat (the fall of a defeated wolf: `data-kind=down`; the run off of a departing wolf was not seen separately, it shares the element, the class and the end with the fall) and the return of the tint (a loss of the streak by „+ reguła” on a run with streak 300).
- Before the fix (scene.tsx of `4c6b4496~1`, the build rebuilt): in all five the element is still there on the return and stands at animation time 0 (`reports/correction-1a-browser-cut-before-fix.txt`): the run comes back paused, so it would play from its start at „Wznów” (I did not press „Wznów” after the return; the frozen start is the same sign as slice 19's „after Wznów running from 0”).
- After the fix: in all five the element is gone on the return (`reports/correction-1a-browser-cut-after-fix.txt`): the flight, the dust and the outcome's element is not drawn, the wolf has no `data-entering`, the layer of the tint has no `data-returning`.
- Not cut, after the fix (`reports/correction-1a-browser-uncut-after-fix.txt`): flight 310 ms, dust 312 ms, wolf's run in 308 ms, the outcome 306 ms, the return of the tint 1998 ms from the frame the element appeared to the one it was gone: the listener does not end an effect early.
- Not triggered: the run off of a departing wolf alone (above). Reduced motion (`prefers-reduced-motion`) not tried in the browser: the effect's own life animation (`.scene-effect`) stands outside the `no-preference` block, so it would be cancelled too, but I did not check it.

### 1(b) — „Write the number in the sentence the way the rest of the screen writes it”

Made. `conditionSentence` (`src/browser/view/program-editor.ts`) writes a number with a fraction through `tenths` of `src/browser/view/body-row.ts` — the function that writes the temperature of the body row with a decimal comma („36,9”); it is now exported, its comment says so — and a whole number as before: `Temperatura poniżej 36,5 °C`, `Temperatura poniżej 36 °C`, `Sytość poniżej 50 %`. The row, the header of a group, the chronicle (`chronicle-entries.ts`), the end-of-run window's „Nie zadziałały ani razu” (`end-window-lines.ts`) all take the sentence from `ruleSentence`/`groupSummary`, so they follow; I changed none of them.

Tests: no test held the dotted form (a search of `tests/` for `[0-9]\.[0-9] °C` and „Temperatura poniżej” found none in the sentence), so no expectation was updated. New case in `tests/view/program-editor.test.mjs`: „a number with a fraction stands in the sentence of a rule and of a group with a decimal comma, a whole one without it” (36.5 and 30.1 with a comma, 36 whole, in `conditionSentence`, `ruleSentence` and `groupSummary`). Failing first: `npm.cmd test -- tests/view/program-editor.test.mjs` exit 1, `actual: 'Temperatura poniżej 36.5 °C'`, `expected: 'Temperatura poniżej 36,5 °C'` (`reports/correction-1a-program-editor-red.log`); after: exit 0.

What the other two write for a fractional number:
- The rule panel's number field (`controls/react-number-field.tsx`) is an `<input type="number">` that shows `String(value)`, so the value attribute holds „36.5”; which separator the player sees is the browser's, by its locale — no function of the view writes a comma there. I changed nothing.
- The wolf's sentence (`combat-line.ts:15`) writes `${condition.value}`; the wolf's rules hold `healthBelow` 8 and `always` only (`src/browser/sim/data/creatures.ts:34`), a whole number, so it can show no fraction today. Unchanged, as the remark says.

### 1(c) — „Make the other places the finding names do it, so that the rule is true”

Made, in CSS, with the pair of slice 13 and no more, each rule with a short comment that names the styleguide rule:
- `src/browser/programs-screen.css`, `.program-list-item` (the name of a program on the list of Programy): `overflow-wrap: anywhere` (a block link in a list item, not a flex or grid child).
- `src/browser/maps-screen.css`, `.maps-who-name` (the name in „Kto idzie”, a child of the column flex `.maps-who-member`): `min-width: 0` and `overflow-wrap: anywhere`.
- `src/browser/character-screen.css`, `.character-screen h2` (the heading of Postać, a block): `overflow-wrap: anywhere`.
- `src/browser/program-panel.css`, `.rule-list-name` (the name of a rule group in its header, a child of the flex `.rule-list-header`): `min-width: 0` and `overflow-wrap: anywhere`.

In the running game at 1280 × 720, rule neutralised by an injected style (`overflow-wrap: normal; min-width: auto`) against the rule in place, measured by `getBoundingClientRect` and `scrollWidth` of the element and its box:
- **40 letters, no space** (the case the remark gives): only the list of Programy shows the fault. Before: the name's text is 298 px wide in a row 270 px wide (`scrollWidth` 298 > `clientWidth` 270) and stands on one line (22 px high); after: two lines (40 px high), `scrollWidth` = `clientWidth`. The group's name (316 px in a header 1214 px wide), the name in „Kto idzie” (297 px in 1214) and the heading of Postać (1248 px box) fit at 1280 with 40 letters either way, as slice 13 found for the team row.
- **200 letters, no space** (to see the rule work at 1280): before, the group's name runs to 1950 px against its header's edge at 1247, the name in „Kto idzie” to 1845 against 1247, the program's name overflows its row (`scrollWidth` 1457 in 270) and the page behind Postać scrolls to 1612; after, each stays inside its box (group name right edge 1243 of 1247 and two lines; „Kto idzie” 1247 of 1247 and two lines; heading 1264 of 1264 and two lines; the program's name five lines).
- At 320 px wide (below the 1280 × 720 the foundation supports, only to look): the heading and the group's name break and the page behind the heading no longer scrolls; „Kto idzie” is held wide by the program select (below).

Screenshot, one, D-418 and D-419: the screen Programy at 1280 × 720 after the change, with a 40-letter program name (the list item breaks into two lines inside its row) and a 40-letter group name in its header; only made-up names are on it. Pushed with the owner's `gh` account to `mariusznazar/screenshots`, branch `loop2/drobne-bledy-ekranow`, commit `3551cb54d6f275920dae67406ea3e129e773d8d6`, `loop2/drobne-bledy-ekranow/correction-1a-programy-1280.png`:

```text
![Programy at 1280 x 720: a 40-letter program name breaks into two lines inside its row of the list, and a 40-letter group name stands in its header](https://github.com/mariusznazar/screenshots/blob/3551cb54d6f275920dae67406ea3e129e773d8d6/loop2/drobne-bledy-ekranow/correction-1a-programy-1280.png?raw=true)
```

Test: none written. Nothing holds slice 13's rule (no test names `overflow-wrap` or `.team-member-name`); the tests that read a style (`computed` of `scene.test.mjs` and `world-area.test.mjs`) read what jsdom cascades of the page, and jsdom lays nothing out, so a case here would hold only that the declaration is in the stylesheet, not that a name breaks; `guidelines/testing.md` leaves the look to the check in the browser (D-87, D-88) and I did that above. Cost if the human wants one: four small cases, one per screen file, each with a copy of the `computed` helper (or one shared in `tests/view/game-stylesheets.mjs`); they would catch a deleted line, not a layout.

### 4 — „bring them to the new form”

Made. `tests/view/rule-editor.test.mjs:1127` (the title) and `tests/view/program-panel.test.mjs:1044` (the comment) now read „Zapas poniżej 8 szt. · Patyk”. No document cites the title of the case (a search of `foundations/`, `guidelines/`, `tests/`, `src/`, `.claude/` for the old text found only these two lines).

## Checks (command, exit code)

| Check | Command | Exit |
|---|---|---|
| New case of (a), before the fix | `npm.cmd test -- tests/view/scene.test.mjs` | 1 (fails at „the flight of an icon: over when cut”) |
| Each of the four branches broken in turn | the same command, four times | 1, 1, 1, 1 (each at its own case) |
| New case of (b), before the fix | `npm.cmd test -- tests/view/program-editor.test.mjs` | 1 (`36.5` against `36,5`) |
| Focused tests, after the last commit | `npm.cmd test -- tests/view/<file>.test.mjs` for `run-screen`, `scene`, `program-editor`, `rule-editor`, `chronicle-entries`, `end-window-lines`, `combat-line`, `rule-signs`, `world-area`, `run-header`, `body-row`, `program-panel` | 0 each (`reports/correction-1a-focused-exits.txt`) |
| More focused tests, after the last commit | the same for `chronicle-game`, `end-window-game`, `status-row`, `discovery-band` | 0 each |
| Earlier focused runs, after (c)'s CSS | `program-list`, `maps-screen`, `character-screen`, `headquarters-screen`, `tests/invariants/test_browser_view_token_values.py` | 0 each |
| ESLint | `npx eslint src/browser/view/scene.tsx src/browser/view/program-editor.ts src/browser/view/body-row.ts tests/view/scene.test.mjs tests/view/program-editor.test.mjs tests/view/rule-editor.test.mjs tests/view/program-panel.test.mjs` | 0 |
| Prettier | `npx prettier --check` on the three `.ts`/`.tsx`, the four `.mjs` and the four `.css` files changed | 0 |
| Foundation | `python -B .the-way/elements/common/foundation_check.py` | 0 (`0 errors`; `reports/correction-1a-foundation-check.log`) |
| Real browser | Playwright CLI at 1280 × 720 and 320 px, `npm run local`, `npm run local:stop` | see above |

Not run: the full suite (`npm test` without a file), as the handoff says; `check_instructions.py` (not named). Every `npm.cmd test -- <file>` builds the game first, so each run also builds.

## Own-work check

Requirement most likely not met: „an effect cut by leaving the screen is not played again on the return” **in the running game** — and its mirror, that an effect nobody cut still lasts its whole time (a cancel the browser fires for another reason would end an effect early). jsdom fires no animation and cancels none, so the new case fires the cancels by hand.
Check: the cut-and-return in the real game for each effect, before and after the fix, and the uncut run after it (above). Result: before the fix all five effects were on the return, standing at their first frame; after it none was, and uncut they ran 306–312 ms (the effects) and 1998 ms (the return of the tint), the lengths the stylesheet gives (300 ms, 2 s).
The check that would catch the second kind of fault in the tests, not only in the browser, is absent: no case fires a cancel on an effect that ends otherwise (the cancel the browser fires when `data-entering` or `data-returning` is taken off an element whose animation has ended) and sees it do nothing; the listener's selectors `.scene-creature[data-entering]` and `.scene-tint[data-returning]` are written to be out of that case and I did not add a test for it.

## Choices (with the way rejected, and its cost if wrong)

1. (a) The cancel is read by the target's own class and attribute, as the walk's is. Rejected: ending the effect on any cancel inside the scene, whatever its target — it would also end it on the cancel of a child. Cost if wrong: an effect whose own element is not cancelled while a child's is stays set.
2. (a) The tint's return is covered although D-316 calls it a change of state, not an effect, because the remark names it and its 2 s play again from the start on the return. After a cut the layer stands at its end tint, which is where the return was going.
3. (b) `tenths` is reused and exported, for a number with a fraction only; a whole number is written as before. Rejected: `String(value).replace(".", ",")` (a second formatter; the handoff says not to), and `tenths` for every number (it always writes one decimal, so „8 szt.” would read „8,0 szt.”). Cost if wrong: `tenths` cuts down to tenths (`Math.floor`), made for the body's six-decimal temperature; for the one condition with a fraction, whose step is 0.1 (`temperatureBelow`), the value of the program is a tenth exactly (checked for 30.0 to 37.0: none is cut short), but a condition with a finer step added later would be cut down in its sentence. The way out then is a formatter that keeps every decimal of the value.
4. (c) No `min-width: 0` on the two block elements (the list item, the heading), as the handoff says „where the element is a flex or grid child”. Cost if wrong: none seen at 1280 × 720 and 320 px.
5. (c) No test (reason above).
6. The screenshot is the Programy screen, the one place of the four where the fault shows at 1280 × 720 with 40 letters; the other three places are given by the measures above, not by a picture.

## Extension of 1(c) — every element of the view that shows text the player typed

Asked by the orchestrator (from the human's „so that the rule is true”): search the view for every element that shows a name or other text the player types, and give each the same pair (`overflow-wrap: anywhere`, plus `min-width: 0` where it is a flex or grid child), no more.

**The search.** Typed text reaches the screen from four sources: a character's name, a program's name (also `deletedName` of a copy), a rule group's name, and the account's e-mail address. I searched `src/browser/view/*.tsx` and `*.ts` for each (`character.name`, `saved.name`, `owner.name`, `group.name`, `copy.deletedName`, `account.email`, and every template literal that interpolates a name or an e-mail) and followed each to the element and its rule in `src/browser/*.css`. Native `<select>` options and `<input>` values are no rows of text and were not touched.

**Changed in this extension** (each: element — what typed text — flex/grid child? — rule added), all in commit `8b068a5b`:

| Element | File of the rule | Shows | Pair added |
|---|---|---|---|
| `.run-header-name` | `run-screen.css` | the character's name, h2 of the run header | `min-width: 0` + `overflow-wrap: anywhere` (flex child of `.run-header`) |
| `.copy-heading` | `program-panel.css` | „Kopia: {program name}” | `overflow-wrap: anywhere` (a block) |
| `.program-title` | `program-panel.css` | the program's name above its editor | `overflow-wrap: anywhere` (a block) |
| `.copy-line` | `program-panel.css` | „Program {name} ma zmiany, których nie ma w tej kopii.” | pair (flex child of `.copy-save`) |
| `.end-question-note` | `run-screen.css` | the same sentence under the question of „Zakończ” | pair (flex child of `.end-question`) |
| `.discovery-band-text`, `.end-window-discovery-text` | `run-screen.css` | „Gra dopisała regułę w grupie „{group name}”…” | pair (flex children of the band and of the window's copy of it) |
| `.away-report-text` | `headquarters.css` (new rule) | the report line that begins with the character's name | pair (flex child of `.away-report-line`) |
| `.account-menu-address`, `.account-menu-sentence` | `styles.css` | the account's address; the sentence „Wysłaliśmy odnośnik … na {address}.” | pair (flex children of the menu) |
| `.form-warning`, `.form-note` | `styles.css` | the line of the pull of the previous save that names the programs it skipped; the two shared sentences, in a comment | pair |
| `.accounts-email` | `accounts-screen.css` | the address that names a row of the list of accounts | pair (flex child of `.accounts-summary`) |

**Looked at and left, because they already hold or cannot take the pair:**
- `.chronicle-text` (the chronicle and the „Ostatnie minuty” of the end-of-run window, which reuse it; texts such as „Dodano grupę „{name}””): already `overflow-wrap: anywhere` in a `minmax(0, 1fr)` column. Probe row with a 200-letter name: with the rule, three lines, the word broken; with the rule taken away, two lines, the word runs out of its line. Holds.
- `.end-window-paragraph`, `.end-window-rule` (the window's last combat and rule lines): already `anywhere` / `minmax(0, 1fr)`; they show text of the game's data only, no typed text.
- The native `<select>` that lists programs (`select.select-list`: „Program:” of a character on Mapy and on the run screen, the list of the program panel): its width is its longest option's, so with a 200-letter program name the page scrolls to 1842 px on Mapy and to 2234 px on the run screen (`select.select-list` is what stands past the window's edge, found by listing the elements beyond it). A native control takes no `overflow-wrap`; making it hold means another control or a cut text, which is a design choice, so **not changed**.
- `<input>` fields (rename of a program or a group, the name of a new character, the address fields): the value scrolls inside its field; no row to break.
- `aria-label`s that carry names (`Zatrzymaj: {name}`, `Kup: …`): not drawn.
- `.confirmation-notice`, `.page-notice`: their text is fixed or from the server's refusal; no typed text.
- Rows I found already done in the first part: team row (slice 13), program list, „Kto idzie”, heading of Postać, `.rule-list-name`.

**In the running game, 1280 × 720** (rule neutralised by an injected style against the rule in place; `reports/correction-1a-ext-browser.txt` holds every line). Real elements: the run screen (character, program and group names of 40 and of 200 letters, a copy that lacks a change of its program, the question of „Zakończ” opened), the band of a discovery at the first chill (group name of 40 and 200 letters), the screen Programy, and the account menu (the account's address has a 200-letter local part; for 40 letters the text of the address was set by the script). The line that names an address in the menu, the report line of an earning loop, the row of the list of accounts and the lines of the pull were **probes**: the markup of the view, with its real classes, put into its real parent in the running page, because no state of this start reaches them (an owner role, a loop that ended away, a previous save).
- **200 letters, before → after:** run-header-name 1612 px (right edge; box 1612, one 20 px line, text 1596 px wide in a box narrower than the page) → 1264 of 1264, two lines; `copy-heading` text 1597 px in a 840 px box (one line) → within 492 px, five lines; `end-question-note` 1459 px of text in 840 px → within 492 px, five lines; `.copy-line` of the program's name (278 letters, read in a second run, see the end of `correction-1a-ext-browser.txt`) right edge 2204 against a box 1247, 1449 px of text → 1247 of 1247, five lines; `discovery-band-text` right edge 2327 against its band's 1595 → 1247 of 1247, five lines; `program-title` one line, text 1597 px in 884 → two lines inside 884; `account-menu-address` right edge 1457 against the menu's 1264 (page scrolls to 1573) → 1247, two lines; the menu's sentence 1573 → 1247; `away-report-text` 1622 against 1247 → 1247; `accounts-email` 1614 against 1622 (page 1639) → 1239 of 1247; `form-note`/`form-warning` right edge 1504/1494 against a 305 px box → 305 of 305.
- **40 letters, before → after:** only two places differ at 1280 × 720: the lines of the pull on the list of Programy (right edge 345 and 335 against a box 305 px wide → 305, two lines) and, from the first part, the program list item (298 px text in a 270 px row → two lines). The run header, `copy-heading`, `program-title`, the group name, the band, the menu, the report line and the account row fit with 40 letters either way.
- After the change, with 200 letters the run screen still scrolls to 2234 px and Mapy to 1842 px, both from the native select above and an `img` of the scene (a sprite sheet laid out wider than the window, clipped by the scene; it has nothing to do with names); Programy, Siedziba and Postać no longer scroll.

**The extension's checks.** `npx prettier --check` on the five changed stylesheets: exit 0. `npx eslint`: nothing to run, no `.ts` or `.tsx` file changed. Focused view tests that read these stylesheets or draw these screens, `npm.cmd test -- tests/view/<file>.test.mjs`: `run-header`, `program-panel`, `headquarters-screen`, `accounts-screen`, `account-screen`, `menu-bar`, `program-list`, `maps-screen`, `character-screen`, `end-question`, `discovery-band`, `run-screen`, `rule-signs`, `world-area`, `scene`, `owner-panel`: exit 0 each (`reports/correction-1a-ext-focused-exits.txt`); `npm.cmd test -- tests/invariants/test_browser_view_token_values.py`: exit 0. `python -B .the-way/elements/common/foundation_check.py`: exit 0, `0 errors` (`reports/correction-1a-ext-foundation-check.log`). No test written, for the reason given under 1(c). The full suite was not run.

**Working copies of the extension:** scripts, composed states and logs stood in `.runs/correction-1a/` and `.playwright-cli/`; the Playwright session was closed and `npm run local:stop` ended the start (one start). Removed: `.playwright-cli/`, the composed states and scripts. A second start (`npm run local`, one start, stopped) was made for the `.copy-line` re-check. Everything in `.runs/correction-1a/` and `.playwright-cli/` is removed, none remains. No screenshot was made for the extension, none is shown.

## Problems as observed (evidence; no cause beyond what is said)

- **The styleguide rule holds now in every row of the view that shows typed text, with two exceptions that are not rows of text**: the native `<select>` of programs (see the extension) and the `img` of the scene that is wider than the window (no name). The first stays open as a design question: a program name of 200 letters widens the select and the page scrolls sideways on Mapy and on the run screen. Recommendation: leave, or settle in the styleguide what a select does with a long option (cut with an ellipsis, or a width cap).
- Slice 13's note stands: at 1280 × 720 a 40-letter name fits the team row, the group header, „Kto idzie” and the heading; the fault shows there with names of about 130 letters or more, or in windows narrower than the foundation supports.
- When the run is shown again after a return it is paused (known from slice 19); the check read the effects at that moment, not after „Wznów”.

## What the documents need from you (sentences my changes make untrue or incomplete; I did not edit them)

- `foundations/decisions.md`, D-367 (the sentence „an effect already running finishes, standing still while the scene does, unless the map run is left or a new one starts”): an effect running when the player leaves the **screen** of the run, which the browser cancels, is now dropped too, not finished on the return. D-317's own sentence („an effect overdue when its turn comes is dropped”) is what the change keeps, so it needs no change, but its **Verification** (the list of tests, `foundations/decisions.md` D-317 `- **Verification:**`) does not name the new case; it carries the markers D-317 „An effect of an ordinary event is a short sign of one event” and D-316 „A loss of the streak while the map run goes on takes the tint back to the cool one”. D-316's **Verification** names the return of the tint on its own element but not its end by a cut; D-319's names the walk cut by leaving (the model of this change) and nothing of the effects.
- `guidelines/styleguide-browser-view.md`, section „The scene of a map run”: the paragraph at 824–829 („kończy się i stoi razem ze sceną przy zatrzymaniu, a nowy zajmuje jego miejsce (D-367)”) and the sentence at 872–874 („scena schowana w czasie efektu, której przeglądarka animacje anuluje, stoi na ostatnim obrazie”, said of the effect of a moment alone) say nothing of an ordinary effect, the wolf's run and the return of the tint cut by hiding; lines 775–777 give the return of the tint (a new element, started where the scene goes on) without its end by a cut.
- `guidelines/styleguide-browser-view.md:529–540` („A name typed by the player breaks in its row”): now kept in every row of the view that shows typed text (the table of the extension): its **Good** names only the team row of Siedziba and could name the kinds of text it covers (a character's, a program's and a group's name and the account's address). Its sentence „Reguła dotyczy każdego wiersza z takim tekstem” is true except for the native select of programs, which a long name widens; if the rule should say what a select does, that is a decision for the human.
- Nothing in `foundations/` or `guidelines/` states how a number with a fraction is written in the sentence of a rule; the body row's comma is D-178's (the temperature, „Temperatura 36,9 °C”). If a place should say it, the styleguide's „Program editor” (the row of a rule, 708–713) is it.

## Questions and concerns

No question. Concerns: the choice 3 above (`tenths` cuts down; fine as it is, noted only), and the native select of programs that a long name widens (see the extension).

## Reaches beyond the handoff (what, where, why)

- `tests/sim/understanding-fixture.mjs`, `tests/sim/program-fixture.mjs`: imported by my one-off scripts that composed the states of the browser check (the tests of the scene already import them).
- `src/browser/sim/programs.ts` (`createProgram`, `renameProgram`, `programName`), `src/browser/sim/game.ts` (`createCharacter`, `send`, `advanceMinutes` heads), `src/browser/sim/saved-game.ts` (`loadSavedGame` head), `src/browser/sim/run.ts` (event kinds), `src/browser/sim/data/{maps,creatures,conditions}.ts`: to compose the states and to see which conditions take a fraction and which rules the wolf has.
- `src/browser/view/screen-address.ts` (address of the run screen), `src/browser/view/map-lines.ts` (`percentText`), `src/browser/view/controls/react-number-field.tsx`, `src/browser/view/combat-line.ts`, `src/browser/view/rule-list.tsx` (header of a group), `src/browser/view/maps-screen.tsx`, `src/browser/view/character-screen.tsx`, `src/browser/view/program-list.tsx` (classes of the elements): to find the elements of (c) and the comma writers of (b).
- For the extension: `src/browser/view/*.tsx` and `*.ts` by search (names, e-mail, template literals) and the rules of the elements found in `src/browser/{run-screen,program-panel,headquarters,styles,accounts-screen}.css` (read at the rules, not whole), `src/browser/view/{end-question,page-sentences,accounts-screen,headquarters,run-header,email-status}.ts(x)` at the places that draw typed text.
- `src/browser/run-screen.css` (835–905, 1100–1440), `src/browser/programs-screen.css`, `src/browser/maps-screen.css`, `src/browser/character-screen.css`, `src/browser/program-panel.css` (parts), `src/browser/headquarters.css` (140–165), `tests/view/game-stylesheets.mjs`, `tests/view/world-area.test.mjs` (the `computed` helper): the animations of the scene, the places of the new rules, how a test holds a style.
- `reports/slice-13-report.md`, `reports/slice-19-report.md` (the second named by the handoff; the first to see how slice 13 checked and what it found).

## Working copies

All stood in `.runs/correction-1a/` of the worktree (scripts that composed the states, the composed saved documents, the logs of the runs, the one-off check scripts) and `.playwright-cli/` in the worktree root (session files, the screenshot file the tool wrote), and the clone of `mariusznazar/screenshots` inside `.runs/correction-1a/screenshots`. **All removed** (`rm -rf`; `ls` shows none). The Playwright session was closed (`playwright-cli close`) and the local starts stopped (`npm run local:stop`, one start each time). The screenshot shown to the human is in the screenshots repository (above), not in this repository or in the record. Kept beside this report in `reports/`: `correction-1a-scene-red.log`, `correction-1a-program-editor-red.log`, `correction-1a-focused-exits.txt`, `correction-1a-foundation-check.log`, `correction-1a-browser-cut-before-fix.txt`, `correction-1a-browser-cut-after-fix.txt` (written from the output of the runs, its figures are those printed), `correction-1a-browser-uncut-after-fix.txt`. No worktree or other clone was made.

## Unread material

- `.the-way/task-cycle/change/SKILL.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`, `src/browser/AGENTS.md`, `.the-way/task-cycle/change/ui_check.md`, `.claude/skills/loop2-play/SKILL.md`: read whole.
- `foundations/decisions.md` D-316, D-317, D-319, D-367: read whole (each to its next heading). D-418, D-419 (named in the handoff for the screenshot): **not opened**; I followed what `loop2-play/SKILL.md` gives of them. D-421 (named in the handoff for where a rule belongs): not opened; the styleguide's rule „A stylesheet of its own for each screen and each shared part” was read whole.
- `.runs/task-cycles/drobne-bledy-ekranow/task.md`: not opened (the handoff and the remarks carry the passages).
- `src/browser/view/scene.tsx`, `src/browser/view/program-editor.ts`, `src/browser/view/body-row.ts`: read whole before changing. `tests/view/run-screen.test.mjs`: read whole. `tests/view/scene.test.mjs`: read in part (lines 1–130, 336–361, 480–540, 850–1135, 1195–1325, 1465–1500, 1580–1705, 1800–2020, 2320–2380, 2445–2500, 2585–2792 and the end where I added the case), **not whole** though I changed it. `tests/view/program-editor.test.mjs`: read in part (1515–1590 and searches) before adding a case, not whole. `tests/view/rule-editor.test.mjs`, `tests/view/program-panel.test.mjs`: only lines 1120–1135 and 1038–1050, not whole, for a one-line change each.
- The four stylesheets I changed: `programs-screen.css` and `character-screen.css` read whole; `maps-screen.css` and `program-panel.css` read in the parts that hold the changed rules (maps-screen 60–140 and 150–220; program-panel 225–440), not whole.

## Searches not found or unclear

- „The function that writes the comma” of the number field and the body row: for the number field there is none (an `<input type="number">`, the browser formats it); for the body row it is `tenths` in `body-row.ts` (private until this change); the only other comma writer in the view is `percentText` in `map-lines.ts`, for a chance in percent, no use here. The handoff's sentence that „the number field … write a comma” holds only as the browser's own display.
- Tests holding the dotted form of the temperature sentence: none found; so none was updated.
- Tests or a stylesheet check holding slice 13's rule: none found.
- „The test file that holds slice 19's cancel case”: it is `tests/view/run-screen.test.mjs` (the walk); the cancel of a moment's effect is in `tests/view/scene.test.mjs`, where I put the new case.
