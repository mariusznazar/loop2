FAIL c254ba21a6c126e849d998d7e3e20a966b3cfeeb

# Review of the return step - loop2: uklad na telefon dla wszystkich ekranow gry

Range: `83acc083729000e6c4c6dd093adef997dfad4b0c..c254ba21a6c126e849d998d7e3e20a966b3cfeeb` (`5bb7ad56` foundation, `c254ba21` skill `loop2-play`). `git rev-parse HEAD` = `c254ba21a6c126e849d998d7e3e20a966b3cfeeb`, the head given. `.the-way` at `80006b25feb4c5a6ffdb8f75d993051eecbc745d`, the commit the gitlink records.

Changed files (`git diff --numstat`):

| File | + | - |
|---|---|---|
| `.agents/skills/loop2-play/SKILL.md` | 39 | 0 |
| `.claude/skills/loop2-play/SKILL.md` | 39 | 0 |
| `foundations/decisions.md` | 38 | 32 |
| `foundations/environment_facts.md` | 6 | 0 |
| `foundations/glossary.md` | 12 | 0 |

Counts: blocking 1 (Important), Minor 4, out of scope 0.

## Findings

### Important

**1. D-325 (and D-331) left saying "on the left / on the right" for Mapy, the very contradiction the step corrected in D-166** - `foundations/decisions.md:10130` (D-325), `foundations/decisions.md:10141-10142` (its pair), `foundations/decisions.md:10264` (D-331).

What is wrong: D-325's binding sentence reads "The screen Mapy holds on the left the list of the maps open to the player, and on the right a card of the picked map ..."; its pair's complies example is "the screen Mapy at `#/mapy/forest` with the list of the open maps on the left, and on the right the card of Las". D-331 reads "Under `#/mapy`, before the player picks a map, „Wybierz mapę z listy.” stands on the right in `text-secondary`." In the phone layout the code stacks Mapy into one column: `src/browser/styles.css:258-264` gives `.screen.maps-screen` `grid-template-columns: 1fr` under `@media (width < 1280px)`, and `src/browser/view/maps-screen.tsx:691-695` puts `maps-list-area` before `maps-card-area`, so at 360 px the card and the sentence stand under the list, not on its right. D-325's sentence is false in the phone layout exactly as D-166's was.

Why it matters: the return step "compares with the code ... those its own search finds ... and corrects in the same change whatever no longer matches (WAY-11)" (`.the-way/task-cycle/skill/return_step.md`). The step itself judged that this kind of sentence must be corrected: its report says of D-166 "its binding sentence contradicted the code" and "the cost of leaving it is a decision that reads false at 360 px". The same holds for D-325, a screen the task names in item 2 ("Mapy z listą map i kartą mapy"). The step's search used words such as "narrow", "720", "1074", "hover" and did not reach "on the left"; D-325 and D-331 are not in its list of entries read. A later task that designs Mapy in both layouts (task items 12 and 17-21 of the plan wait on this one) reads D-325 as binding a two-column Mapy at every width.

Evidence: `grep -n -i "holds on the left\|on the left the\|stands on the right" foundations/decisions.md` finds 8317 (D-166, corrected) and 10130 (D-325) and 10264 (D-331), not corrected; the CSS and markup lines above. D-416 (Wiedza, "left area"/"right area") already has its phone-layout complies example ("in the phone layout the two areas of the screen standing one under the other") and needs nothing. D-311 (line 10548) already says "in the computer layout".

Fix: give D-325 the clause D-166 got (the card standing under the list in the phone layout, D-282, D-396) and its pair the computer-layout / phone-layout split; give D-331's "on the right" the same qualification (or "in the card's area"). Check that the lines `decision:` quoting D-325 and D-331 still quote a prefix.

Contradiction: yes - D-325 (and D-331): the code of the change at a page area under 1280 px stands the list and the card one under the other, against D-325's "on the left ... on the right" and D-331's "stands on the right".

### Minor

**2. D-166's first clause stays unqualified** - `foundations/decisions.md:8317`. "The screen Programy holds on the left the list ... and on the right the program editor ..., the editor standing under the list in the phone layout" states left/right for every width and then takes it back for the phone layout. A reader gets the meaning from the second clause and the pair, so no reading goes wrong; "in the computer layout" after "holds" would say it at once.

**3. D-166's *Rationale* still says "Programy keeps two columns"** - `foundations/decisions.md:8336`. The sentence "Programy keeps two columns, the list and the editor, and the panel of a rule opens in place under its row (D-288)" is true of the computer layout only now. The rationale binds nothing, and the reason it gives (one way of opening the panel on both screens) still holds.

**4. Recipe (c) does not say that `startLoop` returns a result, not a state, and refuses silently** - `.claude/skills/loop2-play/SKILL.md:340-348` (and the copy in `.agents/`). The recipe says "start the loop with `startLoop(state, { mapId, characterId }, realMs)` ..., which refuses a map not among the solved ones", then `savedGame(withSaveTime(state, ...))`. `src/browser/sim/loop.ts:101-113` returns a `GameResult` `{ state, events }`, and on a refusal returns the state unchanged with no error. An agent that passes the return value on as the state, or that does not notice a refusal, sends a wrong or loop-less document; naming `.state` and "a refusal leaves the state unchanged, so check `state.loops` holds the character" would close it. The rules of `earningLoop` it states agree with `src/browser/sim/saved-game.ts:1136-1172`.

**5. The fact's place names the section by number and the feature name, not its heading** - `foundations/environment_facts.md` entry `media-query-width-and-scrollbar`: "§ 4.1 width"; the page's heading is "4.1. Width: the width feature". The passage is found at once from it; no reading goes wrong.

## What was checked and agrees

- **Glossary "phone layout" and "computer layout"** (the cycle's): form as `.the-way/elements/glossary/template.md` gives (heading, one-sentence definition, `- **Not:** none`). Meaning agrees with D-396 (`foundations/decisions.md:5510`) word for word in substance: 1280 px threshold, page area, phone or computer, 360 px upright, smallest window 1280 × 720. The case for an entry (WAY-95) holds: a reader of the field takes "phone layout" as the layout a phone shows, and D-280's "360 px or 1000 px wide" in the phone layout reads wrongly by that meaning. Not writing "page area" (defined inline in D-396, one meaning) and "touch target" (the field's meaning) is within the template. No English use of either term in another meaning found in the files I read.
- **D-39** (`:5013`): "in `danger` at rest and under the pointer" agrees with D-44 and the shared button.
- **D-346** (`:10887`): "under the pointer or tapped" agrees with `terrain-drawing.tsx` (`onPointerUp` for touch) and D-311.
- **D-166**: the phone-layout clause agrees with `styles.css:258-264` (`.screen.programs-screen` one column) and the order of the markup; correcting it is within the step (WAY-11: what its own search finds), though the plan listed it unchanged.
- **D-19 `tests:` moved from the pair**: each part named is held by a test in `tests/view/run-screen.test.mjs:614-712` (tap marks row and tile, line gives numbers, stays after lift and pointer leave, moves to another tile; taken off on header, table cell, page body, drawing beside tiles; resting finger and `pointercancel` mark nothing; tap on a tile not revealed marks no row and draws no `link-highlight`; mouse click marks nothing, mouse hover marks as before). What left the pair ("a tap on another tile moving the mark", "a click of a mouse ... marking nothing", "a tap on a tile not revealed that marks a row", "the line ... still giving the character's tile") is each held there. The pair keeps the tap "as a real browser delivers them", which jsdom's hand-made events do not show.
- **D-44 `tests:`**: `tests/view/shared-controls.test.mjs:161-196` holds `var(--danger)` at rest for a destructive button, `var(--text)` for a plain one and `var(--text-disabled)` for a disabled destructive one, through `gameStylesheetText()`. "Neutral at rest" left the violates example and is held there; the hover state and "a look of its own in the phone layout" stay in the pair, which no test holds.
- **D-288 `tests:`**: `tests/view/group-arrows.test.mjs` (one place down/up, rules and name kept, off on first/last, single group) and the new cases of `tests/view/rule-editor.test.mjs` (header arrows, off on first/last "folded or not", arrow keys on a header committing nothing) hold each part moved. What left the pair ("„↓” moving the group one place down ...", "a rule group that only a drag with a handle moves") is held there; the pair keeps the phone layout at 360 px, which jsdom does not lay out.
- **D-349**: *Based on* names the new fact; the `tests:` clause's "standing alone in a place that gives it no size" is held by `tests/view/world-area.test.mjs:525-531` (`.scene-place`, one child, no `style`). The binding sentence's "a classic scrollbar counted in the width of the window" is what the fact supports (`run-screen.css` `@media (width < 707px)`).
- **Fact `media-query-width-and-scrollbar`**: fetched the page with `curl` (HTTP 200, 409,001 bytes). Section 4.1 reads, markup dropped and whitespace collapsed: "For continuous media, this is the width of the viewport (as described by CSS2, section 9.1.1 [CSS2]) including the size of a rendered scroll bar (if any)." The entry's passage agrees word for word; the join the author made is right. The sentence says no more than the passage. Form agrees with `.the-way/elements/environment-facts/template.md` (one sentence, one source, edition address, passage, date read); the identifier names the subject, not the edition.
- **Recipe (a), forced tap**: `src/browser/view/terrain-drawing.tsx` finds the tile by `closest("[data-tile]")` on a touch `pointerup`; the tile is `<g data-tile="x,y">` with its icons inside; the timeout of a plain `tap` is reported in `reports/slice-14-report.md:143` ("`<div class="icon-mask">` from `foreignobject` subtree intercepts pointer events"). The selector matches the one the tests use.
- **Recipe (b), owner role**: `src/server/account-role.ts` (usage `owner|player <email>`, exit 0 on success, `LOOP2_DATABASE_PATH` must name an existing account database); `scripts/local-start.mjs:402-405, 379, 428` (directory `${process.pid}-${proxyPort}-${mark}`, the database `accounts.sqlite` in it, the proxy port being the port of `Local game:`); `src/browser/account-api.ts:561-565` (`email`, `password`, `passwordConfirmation`); the Origin header and the ASCII password from `reports/slice-16-report.md:64-66` and `slice-16-evidence/setup.sh:10`; „Panel właściciela” in `src/browser/view/menu-bar.tsx:252`.
- **Recipe (c), earning loop and return report**: `startLoop` refuses a map not in `solvedMaps` (`loop.ts:108-113`); `earningLoop`'s rules (`saved-game.ts:1151-1162`); `solvedMaps` read as unique map ids (`saved-game.ts:1305`); `withSaveTime` (`game.ts:779`); `savedGame` (`saved-game.ts:98`); slice 20 reached the report the same way (`reports/slice-20-report.md:77, 82`).
- **Two copies of the skill**: `cmp` identical; SHA-256 `7F0FFA64...BC50` both.
- **Nothing written that should not be**: no invariant, no deferred entry, no review finding written as an entry; the two Minor notes of the earlier review stayed out.

## Declined to judge

- D-44's *Rationale* sentence "one look more of the shared button to keep and two decisions changed, this one and the one that gives `positive` its meaning" tells how the decision was reached, against `.the-way/elements/decisions/template.md` (*Rationale* "does not tell how the decision was reached"); it was written by the cycle before this range (`0a2254cd..83acc083`, already reviewed), not by the return step.
- The two Minor notes of the earlier review (D-396's *Rejected*, the sticky highlight), as the handoff gives.

## Checks run

- `python -B .the-way/elements/common/foundation_check.py` - exit 0, "0 errors".
- `python -B .the-way/instruction-files/check_instructions.py` - exit 0, "0 error, 144 warn, 7 info"; no warning on a line the range added to `loop2-play` (its warnings stand on lines 14, 80, 146, 294, 297, 359 and later, all older text).
- `python -B -m unittest tests.agent_workflow.test_loop2_play_skill` - exit 0, 8 tests OK.
- `cmp .claude/skills/loop2-play/SKILL.md .agents/skills/loop2-play/SKILL.md` - identical.
- Manual: the W3C passage against the page (`curl -sSL https://www.w3.org/TR/2026/CRD-mediaqueries-4-20260219/`), as above.
- Manual: grep of `foundations/decisions.md` for stale layout wording ("neutral at rest", "only interaction is hover", "no arrows in the header", "one size, 672", "1074", "narrower layout", "narrow window", "on the left", "on the right", "stands on the right"), which found D-325 and D-331.
- Not run: the product's full gate (the handoff leaves it to the cycle); the recipes in a running game (I read the code and the slice reports they rest on; no browser was started).

## Reaches beyond the dispatch

- `foundations/decisions.md` D-39, D-44, D-396, D-166, D-288, D-19, D-346, D-349 whole (the entries the step changed or rests on); D-325 and D-331 whole and D-416's *Verification* (found by my search for "on the left / on the right", to judge WAY-11).
- `.the-way/elements/decisions/template.md`, `.the-way/elements/glossary/template.md`, `.the-way/elements/environment-facts/template.md`, `.the-way/elements/common/rules.md` whole (named by the handoff).
- `tests/view/run-screen.test.mjs:560-712`, `tests/view/world-area.test.mjs:488-532`, the test names of `tests/view/group-arrows.test.mjs`, `tile-list.test.mjs`, `world-area.test.mjs`, and the cycle's diff of `tests/view/shared-controls.test.mjs` and of the D-288 lines of `tests/view/rule-editor.test.mjs`: to check that each test the `tests:` clauses name exists and holds its part.
- `src/browser/view/terrain-drawing.tsx` (lines 25-45, 90-150), `src/browser/styles.css:250-300`, `src/browser/programs-screen.css:55-75`, `src/browser/run-screen.css:670-720, 1200-1215`, `src/browser/maps-screen.css:315-335`, `src/browser/view/maps-screen.tsx:691-695`: the code the corrected entries and the recipes describe.
- `src/server/account-role.ts:1-80`, `scripts/local-start.mjs` (grep and 395-430), `src/browser/account-api.ts` (grep), `src/browser/sim/loop.ts:101-131`, `src/browser/sim/saved-game.ts:1136-1172` and greps, `src/browser/sim/game.ts:775-790`, `src/browser/view/menu-bar.tsx` (grep): the recipes against the code.
- `reports/slice-14-report.md:143`, `reports/slice-16-report.md` (grep, lines 62-66, 94), `reports/slice-16-evidence/setup.sh:10`, `reports/slice-20-report.md` (grep, lines 75-82): the reports the recipes rest on, as the handoff allows.

## Working copies

- `.runs/review-return` held `mq4.html` (the W3C page), `fc.txt` and `ci.txt` (the outputs of the two checks). Removed before returning; nothing of it is kept in `reports/` (the passage is quoted above).

## Unread material

- `.runs/task-cycles/uklad-na-telefon/task.md`: read whole.
- `reports/return-step-report.md`, `.the-way/task-cycle/skill/return_step.md`, `.the-way/task-cycle/review/SKILL.md`: read whole.
- The slice reports 14, 16 and 20: read only at the passages the recipes rest on (found by grep), not whole.
- The test files named by the `tests:` clauses: read at the cases those clauses name, not whole.
- The W3C page: section 4.1 only.
- `guidelines/styleguide-browser-view.md`, `guidelines/coding.md`, `guidelines/testing.md`: not read (no product code, test or styleguide changed in the range).

## Searches not found or unclear

- The return step's search list did not include placement words ("on the left", "on the right"), so D-325 and D-331 were not reached by it; found by my own grep.
- Whether D-331's "stands on the right" is a position or a name of the card's area is not settled by its text (its *Verification* says "the right area"); I read it as a position, as D-325's sentence is.
