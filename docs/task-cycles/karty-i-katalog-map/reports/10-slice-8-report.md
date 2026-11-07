# Report - slice 8 (Sending moves to the screen Mapy)

**Status:** done with concerns (the concerns are in the last section; none blocks the slice)

**Commit** on `task/karty-i-katalog-map` (base `ee2d0a2`), worktree clean after it (`.runs/` and `.playwright-cli/` are ignored; the latter was deleted):

- `df293aa` `feat: :sparkles: send characters from the screen Mapy and take the sending out of Siedziba`

One commit, since the code, the page cases and the bar cases only hold together: an intermediate commit with the bar item but not the wiring would leave `account-screen.test.mjs` red.

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/game-view.ts` | 207 (net, with removed lines) | |
| `src/browser/view/headquarters.ts` | | 202 (net) |
| `src/browser/view/menu-bar.tsx` | 7 (net) | |
| `tests/view/account-screen.test.mjs` | 478 (net) | |
| `tests/view/menu-bar.test.mjs` | 21 (net) | |
| `tests/view/headquarters.test.mjs` | | deleted, 16 lines |

(`git diff --stat ee2d0a2..HEAD`: 6 files, 560 insertions, 371 deletions.)

What each does:

- `game-view.ts`: `mapsScreen` is built on entering `#/mapy` or `#/mapy/{map}` (`openMapsScreen`) and disposed on leaving (`closeMapsScreen`, also in `dispose()`), as Postać is. Both addresses are one screen: a pick of another map changes its `mapId` and `update`s it, and builds nothing again. The screen gets `{ state, nowMs: clock.moment(), mapId }` at each change of the state (`renderScreens`) and at each reading of the clock (the `startClock` callback). `mapsControls`: `pick` = `clock.flush()` + `act(pickProgram)`; `enter` = the send the headquarters made (`clock.send`, `saver.moment()` where the state changed, then `show(run, "go")` and `runScreen.focus()`); `startLoop` = `clock.startLoop` + `saver.moment()`, the player stays; `stop` = `clock.flush()` + `act(stopLoop)`. `shownElement()` returns the screen's element for both Mapy kinds, so the address listener's `focusShownScreen()` gives it the focus. The headquarters' controls shrink to `create`, `stop`, `closeReport`.
- `menu-bar.tsx`: item „Mapy” between „Siedziba” and „Programy”, `href="#/mapy"`; `markedMenuItem` (slice 3) already marks it under both addresses.
- `headquarters.ts`: loses `mapLabel`, the list „Program:”, the lines „Mapa: …”, the sentences of the conditions, „Wyślij”, „Puść w pętlę”, the clipped-plan and rehearsal lines and the run sentence, with their imports and the keys of the row rebuild that depended on solved maps and programs (the rows now rebuild on a change of the team alone). Rows keep name link, generation, archetype, resurrection line, loop line with „Zatrzymaj” and the line of a stopped loop.
- Tests: see Checks.

## Checks

All from the worktree root.

| Command | Exit | Result |
|---|---|---|
| `npm test -- tests/view/menu-bar.test.mjs` (cases changed first, code not yet) | 1 | 4 of 28 fail on assertions: the bar holds two links where three are expected (`expected [["Siedziba","#/"],["Mapy","#/mapy"],["Programy","#/programy"]], got [["Siedziba","#/"],["Programy","#/programy"]]`), `{"kind":"maps"}: expected [ ["Mapy","page"] ], got []` |
| `npm test -- tests/view/account-screen.test.mjs` (cases changed and written first, code not yet) | 1 | 19 of 128 fail, each on an assertion or on reading an element the page does not build yet: `expected "maps", got null`, `a button „Wejdź: Ala, mapa Las” stands: expected a true value, got undefined`, `a block of Ala stands in „Kto idzie”`, `the bar holds „Mapy”`, `expected "LoopSiedzibaMapyProgramyKonto", got "LoopSiedzibaProgramyKonto"`, `expected 1, got 0` (hosts of Mapy). No failure is a missing module or a syntax error. See the note below on what did not fail. |
| `npm test -- tests/view/account-screen.test.mjs` (after the wiring, first run) | 1 | 2 of 128 fail: the test's own filter (hidden buttons of Siedziba counted), and the focus after „Puść w pętlę” (`expected <button class="button destructive">, got <body>`) - a real fault of the page, fixed (see Own-work check) |
| `npm test -- tests/view/account-screen.test.mjs` (final, after commit) | 0 | 128 tests, 128 pass |
| `npm test -- tests/view/menu-bar.test.mjs` | 0 | 28 pass (one more case needed the new item: the Tab-order case; fixed) |
| `npm test -- tests/view/maps-screen.test.mjs` | 0 | 20 pass |
| `npm test -- tests/view/screen-address.test.mjs` | 0 | 57 pass |
| `npm test -- tests/view/uncaught-failure.test.mjs` | 0 | 13 pass |
| `npm test -- tests/view/character-screen.test.mjs` | 0 | 7 pass |
| `npm test -- tests/invariants/test_content_identifiers.py` | 0 | Ran 4 tests, OK |
| `npm run typecheck` | 0 | passed |
| `npm test -- tests/quality/test_quality_invariants.py` | 0 | Ran 5 tests, OK (ESLint, Ruff, Prettier, ShellCheck) |
| the browser check of the Goal through `npm run local` | performed | see "State check in a real browser" |

Also run, beyond the list (code or test files I touched): `npm test -- tests/view/end-question.test.mjs` exit 0 (17 pass); `npm test -- tests/quality/test_node_test_selection.py` exit 0; `npm test -- tests/invariants/test_browser_view_framework.py` exit 0; `npm test -- tests/invariants/test_browser_view_token_values.py` exit 0; `npx eslint --max-warnings 0` on the five changed files, exit 0; `npx prettier --check` (the repository's flags) clean after `--write` on `game-view.ts` and `account-screen.test.mjs`.

Not run: the full `npm test` (the orchestrator's gate), `python -B .the-way/elements/common/foundation_check.py` (not in this slice's Checks), a mutation tool (browser-view uses the in-head check).

**What did not fail in the first run of `account-screen.test.mjs`:** the three cases of the addresses `#/mapy/forestDeep` before Las is solved and `#/mapy/nowhere` (rows in the crafted-address table) passed before any wiring, since slice 3's `resolveScreen` already gives Siedziba for them and the old DOM Siedziba stood in the page. They are guards of D-281, not red cases. The ACTS rows „the pick at a character” and „Puść w pętlę” also passed before the wiring for the same reason: the old Siedziba, hidden but in the page, still held the list and the button the cases found by label. They went red only after the old rows were removed (the removal of the controls was in the same commit, so their failing run was not seen apart; the case „Wejdź” of the same table did fail first).

### Cases changed in `tests/view/account-screen.test.mjs` (Changing an existing test)

The cause of each change is the requirement (To do 8, D-53, D-329: Siedziba sends nobody, the card does) and its source is the task passages in the handoff; expectations stay where the behaviour stands.

- `ACTS` (the table of acts saved at once): „the pick on a headquarters row” -> „the pick at a character in „Kto idzie””, „Puść w pętlę” and „sending” (-> „Wejdź”) run at `#/mapy/forest` and keep their `expected`/`check` unchanged; „Zatrzymaj” stands twice, in Siedziba and at a character on Mapy.
- „a character in a loop shows its line and „Zatrzymaj”…”: Siedziba keeps the line and the button, and now also asserts that no row holds a list or a button of sending; „Wejdź”/„Puść w pętlę” of both characters are asserted on Mapy under both maps, with the same disabled/enabled values as the old „Wyślij”/„Puść w pętlę”, and the list „Program:” stays active.
- „after the end of a map run every character's „Wejdź” is inactive under the sentence why…”: moved to Mapy (one sentence per character, under the button); Siedziba holds none; after „Zakończ” and a walk to Mapy the sentences are gone and „Wejdź” is active.
- „„Puść w pętlę” puts the character into a loop…”: on Mapy; asserts the player stays on Mapy with no new entry, the loop line, both buttons inactive, the focus on „Zatrzymaj”, Siedziba's line, one save.
- „„Zatrzymaj” stops at once…”: the stop is in Siedziba as before; the next start is made on Mapy and Siedziba is then reached to see the line gone.
- „a change of the chest redraws the chest alone…”: the start of Ola is made on Mapy; the assertions that the rows and the lists stay the same elements stay (Siedziba's rows, and Ala's block on Mapy). **The assertion that the focus stays on Ala's „Zatrzymaj” is dropped**: nothing on Siedziba changes the chest any more, and a start on Mapy owes the focus to the starting character's own „Zatrzymaj” by design, so “stays” has no case left. The loss: the focus guard of the rows of Siedziba against a chest change; Siedziba's rows are rebuilt on a change of the team alone now, which the case `the row is the same element` still checks.
- „the mark of a rehearsal…”: under „Wejdź” on Mapy, for the map named by the address (the old case counted a mark per map; the card holds one map), none at a map not yet solved, none where the chest holds enough.
- „a send leads to the screen of the map run…”: the send is „Wejdź” on Mapy; entries, focus, bar marks ([null, null, null]), Postać after „Zakończ”, the back button - unchanged in meaning.
- The bar's expectations (`barItems`, `barText`, the items case): „Mapy” in third place.
- The tick case now has a third address, `#/mapy/forest`.

### Cases added

- „a player with one character, who has picked nothing, goes from Siedziba through „Mapy”, the row of Las and „Wejdź” to the screen of the map run in three clicks” (acceptance criterion): reads the `href` of the bar's item and of the row, presses „Wejdź”, checks entries `["#/", "#/mapy", "#/mapy/forest", RUN]`, the map run's screen and the saved run.
- „a reload at #/mapy/forest stays on Mapy with Las picked, #/mapy picks none, and the name of a character is a link to its screen Postać”.
- In the bar case: the item „Mapy” leads to `#/mapy`, marks Mapy there and at `#/mapy/forest`, back and forward walk Mapy, the screen takes the focus.
- „a reload at each of the seven addresses…” (two rows added); crafted addresses `#/mapy/forestDeep` and `#/mapy/nowhere` (reload and link: Siedziba, fragment replaced, no new entry).
- „the screens Postać and Mapy are built on entering them and gone on leaving…”: one host, the same host between `#/mapy` and `#/mapy/forest`, none after leaving.
- In `menu-bar.test.mjs`: the order and the hrefs, the mark of `maps` and `map`, the update to Mapy, the Tab order, the return entry after „Programy”.

`tests/view/headquarters.test.mjs` is deleted as the plan says: its two cases held `mapLabel`; the case that importing the headquarters touches no DOM lost its point with it (the module exports only `createHeadquarters` and `EMPTY_NAME_MESSAGE`, and the page cases import it).

## State check in a real browser (method and evidence)

Method: `.claude/skills/loop2-play/SKILL.md` - `npm run local` (background; `Local game: https://127.0.0.1:57890`), Playwright CLI 0.1.22 at 1280×720, an account made through the login card, one character made in Siedziba, then a composed state sent through `PUT /api/saved-game` as the skill gives (`200 {"revision":4}`; the script was a copy of `compose-state.mjs` with two characters, the forest solved, a second program, the chest holding 2 sticks, a take list of 3 sticks, Ala's resurrection 3 hours away), reload at `#/mapy/forest`. Screenshots at 1280 wide (Siedziba, `#/mapy`, `#/mapy/forest` before and after „Puść w pętlę”) were viewed; `playwright-cli console error` listed 0 messages; the game was stopped (`npm run local:stop`: one start stopped), the session closed, `.playwright-cli/` deleted.

Components checked: the bar, the list of maps, the card, „Kto idzie” (name link, resurrection line, loop line with „Zatrzymaj”, list „Program:”, „Wejdzie: …”, „Wejdź”, „Puść w pętlę”, the two warnings), Siedziba's rows.

| What | Evidence |
|---|---|
| The bar holds Siedziba, Mapy, Programy; „Mapy” is marked under both addresses | snapshot after the first click: links `#/`, `#/mapy`, `#/programy`; screenshots at `#/mapy/forest` show „Mapy” in `text-strong` with the line below it |
| The three clicks | a player with one character and no pick: click „Mapy” (URL `#/mapy`, right area „Wybierz mapę z listy.”) -> click row „Las” (URL `#/mapy/forest`, the card and „Kto idzie”) -> click „Wejdź” (URL `#/postac/1/przejscie`, the map run's screen, line „Minuta 2 · Czeka — żadna reguła nie pasuje · Passa 2/480”) |
| The focus after each button | after „Mapy” and after the row: on the link pressed (the bar's / the list's link; a followed link keeps the focus, as at Programy); after „Wejdź”: `activeElement` is `section.screen.run-screen`; after „Zakończ”: `div.character-screen-host`; after „Puść w pętlę”: `button` „Zatrzymaj: Ala”; after „Zatrzymaj”: `button` „Wejdź: Ala, mapa Las”; after the link of the name: `character-screen-host` |
| The link of the name | in the snapshot `link "Ala"` `/url: "#/postac/1"`; clicking it opens `#/postac/1` |
| „Puść w pętlę” leaves the player on Mapy | URL stays `#/mapy/forest`; the block shows „Pętla: Las · przejście 1 · minuta 0 · domknięte 0” with „Zatrzymaj”, „Wejdź” and „Puść w pętlę” inactive; Siedziba later shows „Pętla zatrzymana” for Ala after the stop |
| The two areas side by side and one under the other | at 1280: list rect `[16, 40, 306×146]`, card rect `[346, 40, 918×637]` (side by side); at 680: list `[16, 40, 648×146]`, card `[16, 210, 648×691]` (one under the other, below the 720 px rule) |
| Resurrection line moves with real time (D-217) | at Mapy, „za 3 godz. 0 min” -> 62 s later „za 2 godz. 59 min” with no change of the state |
| Reload at `#/mapy/forest` stays | after `reload` the screen is Mapy with Las picked (snapshot) |
| Siedziba | no list, no „Wyślij”; „Załóż” kept the focus after making a character |

States not reachable in this run, covered by jsdom only: a clipped plan (no map has an entry cap), a stopped loop on Mapy (none by design), the sentence of a map run that waits (not run in the browser: the screen of a map run was left with „Zakończ”).

## Own-work check (section 3)

- **Requirement most likely unmet:** the focus after „Puść w pętlę” and „Zatrzymaj” on the screen Mapy (To do 7 and the plan's Choices, carried from slice 7): the screen records the move it owes on the click and moves the focus on the next commit, while the page makes a reading of the clock first. Slice 7 named this as page wiring ("the page calls `update` synchronously from the control").
- **Check:** the case „„Puść w pętlę” puts the character into a loop at once…” reads `document.activeElement` after a click through the page. It failed on the first wiring (`got <body>`): `clock.startLoop` and `clock.flush` call the clock's callback, which drew the screen with the state that did not hold the loop yet, and the screen's layout effect, which runs on every commit, spent the owed move on that draw and found no „Zatrzymaj”. Fix in `game-view.ts`: an act of the screen (`mapsAct`) holds the page's draws of the screen while it runs and draws it once at its end (`drawMapsScreen`). The browser check confirmed the focus on both buttons.
- **Mutations** (each run against `tests/view/account-screen.test.mjs`, then reverted; the committed file is the unmutated one, checked by `diff`):
  - M1 (the hold never set): 3 failures listed, the „Puść w pętlę” case among them (exit 1);
  - M2 (the clock callback no longer draws Mapy): 3 failures listed, the tick case among them (exit 1);
  - M3 („Puść w pętlę” no longer a moment of saving): 5 failures listed, the „Puść w pętlę” case and the ACTS case among them (exit 1).
  The unmutated file passes 128 of 128 (exit 0). Mutations in my head, no case needed: `enter` that does not call `show` fails the send case; a Mapy screen built twice fails the host-identity case; a bar item that does not mark fails the bar cases.
- **Screenshot (ui_check.md):** performed, as above (screenshots at 1280 and the geometry at 680).

## Choices (the way rejected, and the cost if wrong)

- **Hold the draws of Mapy during its acts, in the page** (`mapsAct`). Rejected: changing the screen's layout effect to keep the owed focus until a commit finds the target - `maps-screen.tsx` is slice 7's file, not in this slice's *Change*, and a move kept for ever would pull the focus on a later draw, which slice 7's case forbids. Cost if wrong: if a later change makes the page draw Mapy from another place during an act, the focus is lost again; the hold is one flag and one function.
- **One screen for both Mapy addresses** (the pick of a map updates it, the host is the same). Rejected: building a new screen at each address, which would drop the open list „Program:” and any focus. Cost if wrong: one `if`.
- **The bar's „Mapy” case in `account-screen.test.mjs` takes the `href` from the element and calls `follow`**, since `fakeAddress` does not hear an anchor's click; so "a click" on a link is the address changing, as the neighbouring cases do.
- **Not moved to the bar test file:** the three-clicks case stays in `account-screen.test.mjs`, where the page and the game are.
- **No change in `styles.css`** (outside *Change*): see concern 2.

## Reaches beyond the handoff

- `.the-way/task-cycle/change/ui_check.md`: read, since the method names it for a change that alters what a screen shows.
- `docs/task-cycles/karty-i-katalog-map/reports/09-slice-7-report.md`: read, for the concerns slice 7 handed to this one (the synchronous `update`).
- `src/browser/styles.css` lines 190-260 and 1190-1380: read, to see which rules of Siedziba became dead (concern 2); not changed.
- `src/browser/view/app.ts` (grep for `onScreen`, `createGameView`) and `tests/view/maps-screen.test.mjs` lines 1-152 (helpers): read, for how the page uses the game view and how the screen is built in its own test.
- `.claude/skills/loop2-play/compose-state.mjs`: read and copied to `.playwright-cli/` (deleted) for the composed state; the skill names it.
- `a private note in the author's vault` and `git.md`: read before the scripts and the commit.
- `foundations/decisions.md` entries read whole beyond the handoff's list: none. Entries of the handoff read whole: D-36, D-53, D-55, D-165, D-170, D-171, D-207, D-217, D-243, D-251, D-264, D-267, D-277, D-280, D-281, D-283, D-284, D-287, D-323, D-324 (it sat between D-323 and D-325 in the range read), D-325 to D-332; the invariants and the part map entry as named. D-264, D-267 and D-323 shaped the tests (page harness, hooks, the halted game).

## Searches not found or unclear

- Unclear: the handoff says „Zatrzymaj” stands in „Kto idzie”, and the plan says the stop goes to `stopLoop`; both screens (Siedziba and Mapy) hold a „Zatrzymaj” for the same character, so a case that finds the button by its text finds Siedziba's hidden one first. The ACTS row for Mapy looks inside `.maps-screen`; the `aria-label`s of both buttons are the same (`Zatrzymaj: Ala`), which makes a label search ambiguous too. No decision needed; the cases take the scope.
- Not found: a case of the foundation or the task for the page's `halt()` with the screen Mapy; `uncaught-failure.test.mjs` (in the checks) holds none for Mapy and is not in this slice's *Change*. The code path is the page's `act`/`store`, which refuses after `halt()`, and `mapsAct` draws the screen from the state the store holds; I did not add a case.
- Unclear: whether „the cases of the addresses written first, failing” (the plan's Checks) should fail before the wiring for `#/mapy/forestDeep` and `#/mapy/nowhere`: they cannot, since slice 3 resolves them (see Checks).
- Stale words found and left, as the plan's Choices give them to later slices: `.claude/skills/loop2-play/SKILL.md` lines 63 and 132 say „Click „Wyślij” at the character”; the way into a map run is now „Mapy”, the row of Las, „Wejdź” (I followed it in the browser). `src/browser/styles.css` carries a comment „under „Wyślij”” at `.rehearsal-mark` (line 1309).

## Questions and concerns

1. **The screen's focus plumbing depends on how the page calls it** (concern for the reviewer and slice 10's guideline text). `maps-screen.tsx`'s layout effect spends the owed focus on the first commit after the click, so any other draw between the click and the answer takes it. The page now holds its draws during an act (`mapsAct`). Recommendation: leave as is; if the review prefers the screen to be robust by itself, that is a change of `maps-screen.tsx` in a later slice (the move kept until the target exists, dropped on the next click of anything else). If nothing is done, the page's hold keeps the focus right today.
2. **Dead rules in `src/browser/styles.css`**: `.team-member-run-note`, `.team-member-program-label` and `.map-label.solved` style elements no code builds any more, and the comment of `.rehearsal-mark` says „under „Wyślij””. `styles.css` is not in this slice's *Change*; slice 9 draws Siedziba in React and is the place to remove them with the other rules of the headquarters. Recommendation: remove them in slice 9. If left, nothing breaks (no element carries the classes).
3. **A layout observation, no verdict**: at 1280×720 „Puść w pętlę” and its warning stand at the right edge of the card, far from „Wejdź” at the left (the actions row spreads its two parts); the rehearsal mark stands under „Wejdź” only. These are slice 7's rules. If the human finds the gap too wide, it is a rule of `.maps-who-actions`.
4. **The chest case lost its focus assertion** (see Cases changed). Recommendation: accept; the invariant it guarded (the rows stay on a change of the chest) still has its identity assertions.
5. **The skill `loop2-play` is stale** (see Searches). An agent following it to a map run cannot find „Wyślij”. Recommendation: the slice that owns the skill corrects lines 63 and 132; until then a reviewer using it gets lost.
