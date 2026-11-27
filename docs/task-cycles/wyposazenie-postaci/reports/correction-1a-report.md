done with concerns

# Report — correction-1a (the human's remarks 2 and 3), task `wyposazenie-postaci`

Worktree `the task's worktree`, branch `task/wyposazenie-postaci`, started at head `215cc5065f5bb5ed4e0d46e2ad01773bf1ff9c72`.

## Commits

- `55b0ee9b` — remark 3: the name of a filled tile for a reader of the screen (files: `src/browser/view/character-gear.tsx` +27/-6, `src/browser/view/controls/react-button.tsx` +5/-5, `src/browser/kitchen-sink/control-samples.tsx` +4/-1, `tests/view/character-gear.test.mjs`, `tests/view/character-gear-pick.test.mjs`, `guidelines/styleguide-browser-view.md`).
- `18ad4c8e` — remark 2: the refill line of the chronicle (files: `src/browser/view/chronicle-entries.ts`, `src/browser/sim/data/gear.ts` (a comment only), `tests/view/chronicle.test.mjs`, `tests/view/gear-words.test.mjs`, `foundations/decisions.md` (D-340 and D-147)).

## Concern the orchestrator and the human should see

The remark 3 says the heading of the pick "already reads „Kieszeń 1: opatrunek”", and the handoff repeats that the pockets are numbered there. They were not: the heading read „Kieszeń: opatrunek” for every pocket, and `tests/view/character-gear-pick.test.mjs` held that on purpose ("the pockets by the one name of their place"; no decision of the foundation asks for it: D-456 only says "the three pockets of the place „Kieszeń”"). I took the remark's own examples ("Kieszeń 1: opatrunek", "Ręka główna: patyk") and its reason ("trzy jednakowe „opatrunek” to luka") as binding, and numbered the pockets in both the tile's name and the heading, so that the two stay "tak samo". The human may not know the heading changed. Cost if wrong: the heading wanted to stay „Kieszeń: …” — one line of `slotLine` in `character-gear.tsx` and the three assertions of `character-gear-pick.test.mjs` go back; the tile's name would then read „Kieszeń: opatrunek” three times, which the remark calls a gap. The empty pocket tile keeps its visible, unnumbered „Kieszeń” (the remark: "puste miejsce bez zmian"), so three empty pockets still read alike for a reader; that is the remark's own scope.

## What I did for each remark

### Remark 2 — a chronicle line for the refill

Before: the refill was written only inside the paragraph of the encounter, with the actor („Mag bierze patyk z plecaka do ręki”); no code wrote a line of it. The simulation already returns it: each turn of a resolved encounter comes as a `combatExchange` event whose `characterAction.refill` is true for the strike that took the stick.

Now: `eventEntry` in `src/browser/view/chronicle-entries.ts` gives, for a `combatExchange` event whose character action has `refill`, the entry `{ kind: "action", minute: event.minute, text: "Bierze patyk z plecaka do ręki", role: "text" }`, the text being the data's words `GEAR_PLACES.mainHand.refill` (`src/browser/sim/data/gear.ts`) with the first letter capitalized, so the words stay in the data and the paragraph and the line cannot drift. `chronicle.ts` needed no change: its default branch already adds what `eventEntry` returns. The combat line (`combat-line.ts`) is untouched; „Mag bierze patyk z plecaka do ręki” stays in the paragraph.

Where the line stands: kind „Czynności” (filter „Wszystko” and „Czynności”; the filter „Walka” shows the paragraph alone, as D-343 and the chronicle's code have it), role `text`, at the game minute of the `combatExchange` event, which is the minute the encounter's turns resolve (the result is recorded at that minute), so it stands after the paragraph (which stands at the attack minute) and above it in the newest-first list; one line for each turn that refilled.

Foundation entries:
- D-340 (corrected): a paragraph of binding words for the refill line, the relation `derives from D-457`, the clause of tests, and in *Rationale* and *Rejected* the reason and the way rejected (the refill only in the paragraph with its actor — the chronicle then shows no line of it among the actions, though the start of „Załóż” has one) and the accepted cost (the refill stands twice).
- D-147 (corrected, *Verification* wording only): "no entry for an exchange" became "no entry for an exchange of blows", because the refill's line comes from an exchange; the binding sentences are untouched.
- Foundation step report (per entry; marking `the cycle's`, since no row of *Settlements to record* carries a rule of this wording whole — row 25 sends the words to data or code — and the rule comes from the human's remark): D-340 — English: "The refill of an empty slot of the gear gives one chronicle entry of its own, without an actor, at the minute the turns of the encounter resolve." Polski: „Uzupełnienie pustego miejsca wyposażenia ma w kronice własną linię, bez aktora, w minucie, w której rozstrzygają się tury starcia.” D-147 — English: "An exchange of blows gives no entry; the refill's entry is no such entry." Polski: „Wymiana ciosów nie daje wpisu; wpis o uzupełnieniu nim nie jest.” The part added beyond a row is the paragraph and the *Rejected* way, for the description to quote under the entries.

### Remark 3 — the name of a filled tile

Before: `faceOf` in `character-gear.tsx` gave the tile `{ icon, name: ITEMS[piece].name }`, and `ReactButton` made it the `aria-label` — „patyk”, „opatrunek”.

Now: `faceOf` gives `name: slotLine(slot, piece)` = „{miejsce}: {rzecz}”: „Ręka główna: patyk”, „Kieszeń 1: opatrunek”, „Kieszeń 3: opatrunek”. `slotName(slot)` (new, in `character-gear.tsx`) is the name of the slot's place, with the slot's number from 1 after it where the place holds several slots (derived from `GEAR_SLOTS`, no string parsing); `slotLine` also writes the heading of the pick („{miejsce}: {rzecz}” or „{miejsce}: nic”), so the two are one function. An empty tile is unchanged (its visible pale name is its name, no `aria-label`). `ReactButton`'s code is unchanged (it passes `tile.name` on); only its comments say that the screen writes the name „{miejsce}: {rzecz}”. The kitchen-sink sample of the tile with an icon got a name in that form.

What a screen shows, by state: nothing visible changes on a tile. The heading of the pick of a pocket changes from „Kieszeń: …” to „Kieszeń 1: …”, „Kieszeń 2: …”, „Kieszeń 3: …” (held and empty alike); the heads of the other slots are as before. The chronicle shows one more line „Bierze patyk z plecaka do ręki” after an encounter in which a strike refilled the empty hand (filters „Wszystko”, „Czynności”; also in „Ostatnie minuty” of the end window where it is among the last entries). The next agent should look at both when it looks at the screens.

No foundation decision changed for remark 3: D-44 and D-461 say nothing of the tile's name for a reader.

## Foundation search (words: „nazwa”, `aria-label`, "accessible name", „czytnik”, „kronika”, the refill words, „Zakłada”, „Bierze”)

Corrected: D-340, D-147 (above); `guidelines/styleguide-browser-view.md`: the sentence on the tile of a held slot ("nazwę przedmiotu czyta czytnik ekranu" → the reader reads „{miejsce}: {rzecz}”, the pockets numbered), the bullet on the heading of the pick (pockets numbered), and the *Bad* line of the rule "The screen Postać" (a tile read by the item's name alone).

Left, with the reason:
- D-457, D-458: they say when and how the refill and „Załóż” act, not how the chronicle writes them; D-340 now holds that.
- D-44, D-461, D-445, D-462 and the kitchen-sink rule in the styleguide (lines 388–404): no sentence on the tile's name; they stay true.
- `tests/view/shared-controls.test.mjs` (tile with icon, `name: "Patyk"`): the control passes the screen's name to `aria-label` and still does; the assertion holds the control, not the screen's format, so it did not change.
- The frozen task, item 10 ("jego nazwę czyta czytnik ekranu") and row 25: the task is frozen and binds as the history of the request; "nazwę" is still read by a reader, with the place added. Not edited.
- In-combat „Załóż”: a „Załóż” turn inside an encounter gives no chronicle line (only the paragraph's „Mag zakłada …”), though the remark says the chronicle "already writes „Zakłada {rzecz}”"; that holds for „Załóż” as an action outside combat. Not in the remarks, so left; named here for the human.

## Tests: first red, then green; changed tests and why

Written first, seen failing for the expected reason (assertion, not a missing module):
- `tests/view/gear-words.test.mjs` "the chronicle writes the refill of an empty main hand as a line of its own with no actor, at the minute the turns resolve" — `npm test -- tests/view/gear-words.test.mjs`: 1 fail (`null` where the entry was expected), 5 pass; after the change fail 0, pass 6.
- `tests/view/chronicle.test.mjs` "an encounter whose strike refilled the main hand gives one line of it after its paragraph, among the actions, and a strike that did not refill gives none" — red: 1 fail, 28 pass; green: pass 29.
- `tests/view/chronicle.test.mjs` "a real encounter in which the strike takes a stick into the empty hand gives the line of it among the entries, once, after its paragraph" — added after the code, on real events of the simulation (`newMapRun`, `stepMinute`, map `forestDeep`, first seed that gives an encounter, empty gear and three sticks); not seen red (the code already stood); its handwritten twin above was. Final: pass 30, fail 0.
- Both chronicle tests carry `decision: D-340 "The refill of an empty slot of the gear (D-457) gives one entry of its own"`, which the foundation check finds in the new paragraph.
- Existing tests changed (testing.md "Changing an existing test"; the cause lies in the remarks, which bind):
  - `tests/view/character-gear.test.mjs`, the case on a filled tile: `aria-label` „patyk” → „Ręka główna: patyk”, „opatrunek” → „Kieszeń 1: opatrunek” and „Kieszeń 3: opatrunek” (remark 3, the name for a reader); title and comment say so.
  - `tests/view/character-gear-pick.test.mjs`: the headings „Kieszeń: nic” → „Kieszeń 2: nic” (the first pick case) and „Kieszeń 1: nic” (the case of the second touch), the heading case „Kieszeń: opatrunek / nic / opatrunek” → „Kieszeń 1: opatrunek / Kieszeń 2: nic / Kieszeń 3: opatrunek”, its title ("by the one name of their place" → "by their numbers") and comment, and the `aria-label` after a put-on „opatrunek” → „Kieszeń 2: opatrunek” (remark 3; the old assertions held the unnumbered heading on purpose, and the remark's examples number it).
- Prettier made two layout changes in `tests/view/character-gear.test.mjs` and `tests/view/chronicle.test.mjs` (formatting only).

## Checks (each as command and result; focused, not the gate)

- ESLint as `test_eslint_source_rules` runs it: `node node_modules/eslint/bin/eslint.js --max-warnings 0 --suppressions-location .runs/correction-1a/eslint-suppressions.json .` — exit 0 (suppressions file with `{}`, as the test makes).
- Prettier as `test_prettier_source_format` runs it (`--check --no-config --no-editorconfig --ignore-path .gitignore`) on every changed `.ts`, `.tsx`, `.mjs` — first run exit 123 on the two test files (layout), after `--write` exit 0.
- `npm run typecheck` — exit 0.
- `node tests/quality/eslint-size-rules.mjs` (D-425) — exit 0, "0 functions and files over a threshold in 382 files".
- `python -B .the-way/elements/common/foundation_check.py` — exit 0, "0 errors" (run before the commits; the tree had every change).
- `python -B .the-way/instruction-files/check_instructions.py` — exit 0, 0 errors, 0 warns.
- Focused tests, `npm test -- <file>` (output filtered to the summary lines, so the process's own exit code was not read; the lines say fail 0): `tests/view/gear-words.test.mjs` 6/6, `chronicle.test.mjs` 30/30, `character-gear.test.mjs` 7/7, `character-gear-pick.test.mjs` 11/11, `chronicle-entries.test.mjs` 15/15, `chronicle-game.test.mjs` 4/4, `combat-line.test.mjs` 2/2, `end-window-game.test.mjs` 27/27, `end-window.test.mjs` 14/14, `run-screen.test.mjs` 25/25, `world-area.test.mjs` 20/20, `tabs-area.test.mjs` 14/14, `shared-controls.test.mjs` 69/69, `character-screen.test.mjs` 16/16, `state-store.test.mjs` 12/12, `scene.test.mjs` 75/75, `tests/sim/content-revision.test.mjs` 39/39, `tests/sim/gear-state.test.mjs` 12/12, `tests/invariants/test_application_build_kitchen_sink.py` OK (3 tests).
- Not run: `npm test` (the gate; not mine), the browser check of the screens (not asked; the next agent), `ui_check.md` and `walkthrough.md` (the correction reports no walk; `ui_check.md` was not read, because the handoff leaves the look of the screens to the next agent).

## Own-work check

The requirement most likely not met: the chronicle line shows in a real game flow, not only for events written by hand. The check: a probe over the real simulation (`.runs/correction-1a/probe.mjs`, kept as `reports/correction-1a-probe.mjs`; run from the worktree root as `node .runs/correction-1a/probe.mjs` after `npm run build`; the original is removed with the directory) — a character with an empty gear and three sticks, program „Zawsze → Uderz — patyk”, map `forestDeep`, seed 1, until the encounter ended. It showed the window of the chronicle newest first: „Mag zginął w walce” at 211, **„Bierze patyk z plecaka do ręki” at 211**, the paragraph at 206, the loss of the streak at 34, „Czeka — żadna reguła nie pasuje” at 1: one line, after the paragraph, at the resolve minute. The permanent test above holds the same on a first seed that gives an encounter. Second requirement checked: the tile's name equals the heading's wording for each slot — both come from `slotLine`; the tests assert the strings for the main hand and for pockets 1, 2 and 3.

Mutation in the head: a missing `refill` check would give a line for every strike (the handwritten tests catch it: a turn with `refill: false` gives none); a wrong minute (the attack's) would put the line before the paragraph (both chronicle tests catch it); the pocket number off by one or no number (the tests assert „Kieszeń 1” and „Kieszeń 3”); a place with one slot numbered (the test asserts „Ręka główna: patyk”). A test of the second hand or head heading is already in the existing pick test („Głowa: nic”).

## Choices, with the way rejected and its cost if wrong

1. Pockets numbered in the tile's name and in the heading (above). Rejected: the tile named like today's heading („Kieszeń: opatrunek”, no numbers) — three alike names, which the remark calls a gap; and numbering the tile only — then the tile and the heading would not read "tak samo". Cost if wrong: see the concern.
2. `slotName` and `slotLine` live in `character-gear.tsx` (the view), not in `data/gear.ts`. Rejected: a function in the data file (a content-data file holds data; the numbering is a view's way of naming). Cost: another screen that names a slot has to import them from the screen's module, or move them.
3. The refill's entry takes the kind „Czynności”, the role `text`, the minute of the `combatExchange` event. Rejected: kind „Walka” (its filter shows only the paragraph, so the line would vanish there and appear in „Wszystko” alone), and the attack minute (the line would stand before entries the player made on the copy in the minutes of the encounter, breaking the order of the minutes). Cost if wrong: one `kind` or `minute` in `eventEntry`.
4. The words of the line are the capitalized words of the data (`GEAR_PLACES.mainHand.refill`), the line fixed to the main hand's row. Rejected: a second literal in the chronicle's module (two places for one sentence). Cost: the row names the stick in its words (as before), so a later weapon in the main hand needs the row made per item, together with the paragraph.
5. D-340 is edited and D-147's *Verification* wording is changed, though row 25 sends the words to data or code. Rejected: no foundation change — then the tests would hold a requirement the foundation does not carry (testing.md: "Wymaganie, którego test potrzebuje, a którego fundament jeszcze nie niesie, trafia najpierw do fundamentu"), and D-147's "no entry for an exchange" would read as broken by the new line. Cost if wrong: the human merges the request with a changed D-340 they did not mean; the paragraph is one sentence, easy to take out with the tests' two `decision:` lines.
6. `shared-controls.test.mjs` left as it is (see "Left").

## Reaches beyond the dispatch

- `.the-way/elements/decisions/skill/SKILL.md` with `read.md`, `decide_entry.md`, `elements/common/way_of_working.md`, `elements/decisions/template.md`, `elements/common/rules.md`, `elements/decisions/examples.md` (head) — to write the changes of D-340 and D-147 as the dispatch's step "foundation_step.md" gives.
- `.the-way/product-guidelines/styleguide/SKILL.md` and the first 140 lines of its `template.md` — to change the styleguide's sentences in its form.
- D-343, D-344, D-345 and D-456 whole (and D-147 whole) — to place the line among the kinds of the chronicle and to see that no decision asks for the unnumbered pockets.
- `the user's rule file on git` — before the commits (hook).
- The probe and the size script `tests/quality/eslint-size-rules.mjs` (to check D-425 on my files).

## Unread material

- `guidelines/styleguide-browser-view.md` (1979 lines): read lines 376–410 (the kitchen-sink list entry for the tile), 1119–1200 (the rule "The screen Postać", the tile and the pick) and what a search for „czytnik” and „Wyposażenie” hit; the rest unread (the chronicle's own rule was not opened: no sentence of it concerns the refill line by the search for „kronika”/„Czynności”).
- `.the-way/product-guidelines/styleguide/template.md`: lines 1–140 of 190.
- `.the-way/elements/common/critique/SKILL.md`, `elements/common/reaching_another_skill.md`, `task-cycle/change/ui_check.md`, `task-cycle/change/walkthrough.md`: not read (no set of proposals to critique, no hand-over to another skill, and the screens' look is the next agent's).
- `guidelines/testing.md`: read whole; the table of trust boundaries (lines 173–192) read for what it concerns (the three files of the boundaries are untouched), not for each case.
- Of the decisions D-44, D-340, D-348, D-457, D-458, D-461, D-462: each read whole (D-44 by its own heading, the first awk run having matched D-445 to D-447 as well).

## Searches not found or unclear

- The handoff's and the remark's statement that the heading of the pick already numbers the pockets: not found in the code or the tests (the opposite was asserted on purpose); handled as in the concern above.
- The text of the remark 2 that the chronicle "already writes „Zakłada {rzecz}”": true outside combat only; in an encounter „Załóż” has no chronicle line (see "Left").
- No sentence of a decision or of the glossary says what the chronicle writes for a refill (it needed D-340's new paragraph); none says the tile's name for a reader (nothing to correct).

## Working copies

`.runs/correction-1a/` in the worktree (the ESLint suppressions file, the outputs of the foundation check, the instruction check and the size script, two probe scripts) — kept from it: `reports/correction-1a-probe.mjs`. The directory is removed before I return (`.runs/correction-1a`); no worktree or clone was made.

## Repair of the checks

The focused tests of "Checks" were rerun at head `18ad4c8e` (tree clean), each as `npm test -- <file> > .runs/correction-1a/<name>.txt 2>&1; echo "exit=$?"`, the summary read from the file. Every run ended with exit 0; none failed, so the first line of this report stands. `npm test` without a file was not run. The outputs lived in `.runs/correction-1a/`, which is removed (`.runs/correction-1a`).

| Command (`npm test -- <file>`) | Exit | Pass / fail |
|---|---|---|
| `tests/view/gear-words.test.mjs` | 0 | 6 / 0 |
| `tests/view/chronicle.test.mjs` | 0 | 30 / 0 |
| `tests/view/character-gear.test.mjs` | 0 | 7 / 0 |
| `tests/view/character-gear-pick.test.mjs` | 0 | 11 / 0 |
| `tests/view/chronicle-entries.test.mjs` | 0 | 15 / 0 |
| `tests/view/chronicle-game.test.mjs` | 0 | 4 / 0 |
| `tests/view/combat-line.test.mjs` | 0 | 2 / 0 |
| `tests/view/end-window-game.test.mjs` | 0 | 27 / 0 |
| `tests/view/end-window.test.mjs` | 0 | 14 / 0 |
| `tests/view/run-screen.test.mjs` | 0 | 25 / 0 |
| `tests/view/world-area.test.mjs` | 0 | 20 / 0 |
| `tests/view/tabs-area.test.mjs` | 0 | 14 / 0 |
| `tests/view/shared-controls.test.mjs` | 0 | 69 / 0 |
| `tests/view/character-screen.test.mjs` | 0 | 16 / 0 |
| `tests/view/state-store.test.mjs` | 0 | 12 / 0 |
| `tests/view/scene.test.mjs` | 0 | 75 / 0 |
| `tests/sim/content-revision.test.mjs` | 0 | 39 / 0 |
| `tests/sim/gear-state.test.mjs` | 0 | 12 / 0 |
| `tests/invariants/test_application_build_kitchen_sink.py` | 0 | 3 tests, OK |
