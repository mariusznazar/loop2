# Report — slice 5 (the right area shows the chronicle under its tabs; the paragraph leaves the world area)

**Status:** done with concerns (the concerns are small and listed at the end; nothing blocks).

**Commits** (branch `task/kronika-z-filtrami`, slice base `5ed6c6b`, head `2b74988`; range `5ed6c6b..2b74988`):

- `2b74988` feat: :sparkles: show the chronicle under the tabs Kronika and Teren in the right area of the screen of a map run, and take the paragraph of the last encounter out of the world area

One commit holds the code, the styles and the tests; the working tree is clean after it.

## Files changed (added / removed lines)

| File | Added / removed lines |
|---|---|
| `src/browser/view/right-area.tsx` (new) | 223 / 0 |
| `src/browser/view/run-screen.tsx` | 30 changed (tabs and chronicle in place of the table, `createRunScreen` takes the chronicle memory) |
| `src/browser/view/world-area.tsx` | 12 changed (the paragraph and its import removed, header comment follows) |
| `src/browser/view/game-view.ts` | 149 changed, but only one line of meaning: the call `createRunScreen({...}, chronicle)`; Prettier re-indented the whole object of controls |
| `src/browser/view/chronicle.ts` | 33 changed (`subscribe`, see Choices) |
| `src/browser/styles.css` | 92 changed (`.combat-line` removed; `.right-tabs`, `.chronicle*` added) |
| `tests/view/right-area.test.mjs` (new) | 541 / 0 |
| `tests/view/chronicle-game.test.mjs` (new) | 281 / 0 |
| `tests/view/run-screen.test.mjs` | 131 changed |
| `tests/view/world-area.test.mjs` | 66 changed |
| `tests/view/chronicle.test.mjs` | 30 added |
| `tests/view/scene.test.mjs` | 11 changed |

Total: 12 files, 1423 insertions, 176 deletions.

## Checks (command, exit code)

All run from the worktree root after `npm run build` (exit 0).

| Check | Command | Exit | Result |
|---|---|---|---|
| right area | `npm test -- tests/view/right-area.test.mjs` | 0 | 11 pass |
| game view | `npm test -- tests/view/chronicle-game.test.mjs` | 0 | 4 pass |
| run screen | `npm test -- tests/view/run-screen.test.mjs` | 0 | 13 pass |
| world area | `npm test -- tests/view/world-area.test.mjs` | 0 | 21 pass |
| end question | `npm test -- tests/view/end-question.test.mjs` | 0 | 17 pass |
| account screen | `npm test -- tests/view/account-screen.test.mjs` | 0 | 128 pass |
| tile list | `npm test -- tests/view/tile-list.test.mjs` | 0 | 15 pass |
| combat line | `npm test -- tests/view/combat-line.test.mjs` | 0 | 2 pass |
| react controls | `npm test -- tests/view/react-controls.test.mjs` | 0 | 55 pass |
| scene (touched) | `npm test -- tests/view/scene.test.mjs` | 0 | 19 pass |
| chronicle (touched) | `npm test -- tests/view/chronicle.test.mjs` | 0 | 24 pass |
| program panel (reads `createFolding`, same game view) | `npm test -- tests/view/program-panel.test.mjs` | 0 | 51 pass |
| token values | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 | 4 OK |
| focus outline | `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 | 3 OK |
| framework | `npm test -- tests/invariants/test_browser_view_framework.py` | 0 | 9 OK |
| content identifiers (after build) | `npm test -- tests/invariants/test_content_identifiers.py` | 0 | 4 OK |
| typecheck | `npm run typecheck` | 0 | |
| quality | `npm test -- tests/quality/test_quality_invariants.py` | 0 (second run) | 5 OK |
| foundation check (not asked; cheap) | `python -B .the-way/elements/common/foundation_check.py` | 0 | 0 errors |

The quality check **failed once** (exit 1, `test_eslint_source_rules`: `@typescript-eslint/unbound-method` on `chronicle.subscribe` and `chronicle.snapshot` passed bare to `useSyncExternalStore` in `right-area.tsx`). Fix: `subscribe` and `snapshot` are now declared in the `Chronicle` type as function-valued properties, not methods (`chronicle.ts`). Rerun: exit 0 (after `npm run build` and `npm run typecheck`, both 0). Prettier (`--no-config --no-editorconfig --ignore-path .gitignore`) was applied to every changed file.

I ran no full gate (`npm test` with no file).

### Seen failing first

- `tests/view/right-area.test.mjs`: written against a stub `RightArea` returning null; `npm test -- tests/view/right-area.test.mjs` exited non-zero with 0 pass, 11 fail. After the component: 11 pass, exit 0. (The stub failed on TypeErrors reading the missing tabs, not on an assertion text; the point of the first run was that nothing passed without the component.)
- `tests/view/chronicle-game.test.mjs`: before the right area existed, `npm test -- tests/view/chronicle-game.test.mjs` exited non-zero, 0 pass, 4 fail (the loaded-game case failed on `expected [ [212, …] ], got []`, the others on missing rows/buttons). After: 4 pass.
- The new case in `tests/view/chronicle.test.mjs` (the subscription) was **not** seen failing: I wrote the code first, then the case, and it passed on its first run. I did not break the code to see it fail.
- `tests/view/run-screen.test.mjs` and `tests/view/world-area.test.mjs`: their changed expectations were edited with the code; I did not run them against the old code.

## What was made

- `right-area.tsx`: `RightArea` = the tabs in a container of class `right-tabs tabs` (`ReactButton kind="tab"`, „Kronika” then „Teren”) over either `ChronicleView` or `TileTable`. `ChronicleView` = the filter row (seven `ReactButton` with `selected`, container `chronicle-filters`) and `ChronicleList` (`ul.chronicle-list`, `li.chronicle-row` with `span.chronicle-minute` and `span.chronicle-text` plus the role as a second class when the role is not `text`; an empty list is `p.chronicle-empty` „Nic tu jeszcze nie ma.”). The pick of the tab and filter is only a click that tells the chronicle memory; the area reads the memory with `useSyncExternalStore`.
- The paragraph row is composed in the list: `useMemo(() => combatText(lastCombat), [lastCombat])`, drawn where the window's row of kind `paragraph` stands; the world area draws none.
- Window: `WINDOW_SIZE = 60` rows, grown by 60 by `onScroll` of the list when fewer than `NEAR_END = 160` pixels of scroll remain and `more` is true; the list is keyed by the filter, so picking a filter starts the window anew. The window is read with `useMemo` on [memory, snapshot, size]; rows are `memo`-ised on (minute, text, role).
- `run-screen.tsx`: `createRunScreen(panel, controls, chronicle)`; the rule panel still takes the whole right area while open (`open ? null : <RightArea …/>`), and „✕” brings back the tab the memory holds.
- Hover link: a tab click that changes the tab calls `onHover(null)` first, so a tile marked by a row of the table is not left marked when the table leaves.
- `styles.css`: only tokens (`--panel`, `--text`, `--text-label`, `--text-secondary`, `--discovery`, `--player-change`, `--danger`, `--positive`, `--font-family-mono`, `--font-size-detail`, spacing tokens); layout dimensions `max-height: 70vh`, `grid-template-columns: 5ch minmax(0, 1fr)`.

## Tests, by the break each catches

- `right-area.test.mjs`: tabs and „Kronika” first, pick tells the memory and shows one content; a pick made in the memory outside the screen is shown; hover link only under „Teren” and the hover cleared at a tab click; seven filters in order, „Wszystko” first, one pressed at a time, look of the pace buttons (`button selected`, no `tab`), memory told; newest first, minute alone in its column and not in a role colour, text in its role (`positive`, `danger`, plain), filter shows one kind; discovery in `discovery`, change in `player-change`; empty chronicle, empty filter („Walka” before any attack, „Passa”) and the sentence leaving when an entry arrives; the paragraph among the entries at its minute, under „Walka” alone, growing when the turns resolve (hand-written expected text from `combat-line.test.mjs`), absent when the state has no `lastCombat`; a chronicle built from a loaded state draws the paragraph alone; window bounded, grows only on a scroll near the end, every entry reachable, window anew with a filter; a draw with nothing changed reads no window again and one recorded entry reads it once.
- `chronicle-game.test.mjs` (set up as `end-question.test.mjs`): chronicle and tab survive Przejście → Siedziba → Przejście; „Restart” clears the entries and keeps tab and filter; „Zakończ” then a new send gives „Kronika” and „Wszystko” and no old entries; a loaded game with `lastCombat` shows the paragraph alone in the chronicle and none in the world area.
- `run-screen.test.mjs`: three areas hold the tabs and the chronicle in the right one (To do 8 as source); an open rule panel takes the place of the tabs and their content and „✕” brings back the tab picked, tried with „Kronika” and with „Teren”; the hover link test now picks „Teren” first.
- `world-area.test.mjs`: the class lists and indices no longer hold `combat-line`; the paragraph test is now "no paragraph, with a record of an encounter or without" (To do 6 as source).

## Browser check (real browser, `.claude/skills/loop2-play/SKILL.md`)

Method: `npm run local` (HTTPS), Playwright CLI 0.1.22 at viewport 1440×900, account `agent5@example.test` made through the login card, character „Ala”, map „Las”. Screenshots are in `docs/task-cycles/kronika-z-filtrami/screenshots` (all paths below are relative to it). For the longer 16× runs and the encounter I composed saved states (scripts in the session scratchpad, not in the repo) and sent them through the ordinary `PUT /api/saved-game`; both documents load with `loadSavedGame`. The „Las” state ran a program of six rules over a new game that knows every action (seed 19); the „Las — głębiej” state is the same program plus „Zdrowie poniżej 40 → Odskocz” and „Zawsze → Uderz — patyk” (seed 1), with „Las” marked solved, because the wolf attacks only on „Las — głębiej” (`maps.ts`, `attackers`), so no attack can be reached on „Las”.

| # | File | Pace | Minute | Tab / filter | What it shows |
|---|---|---|---|---|---|
| 1 | `01-1x-m0-kronika-wszystko-wait.png` | 1× | 12 (name says m0: the entry is at 0) | Kronika / Wszystko | first minutes, entry „0  Czeka — żadna reguła nie pasuje”, tabs with Kronika selected, 7 filters with Wszystko selected |
| 2 | `02-1x-m84-kronika-wszystko-discovery.png` | 1× | 84 (paused at the first chill) | Kronika / Wszystko | „84 Eksploruj” (action), the band's full text as the discovery entry in yellow with „Gra dopisała regułę…”, „84 Passa 83 przerwana: zdrowie spadło od zimna” in red, minute column right-aligned in `text-label` |
| 3 | `03-1x-m84-kronika-passa.png` | 1× | 84 | Kronika / Passa | the one loss of the streak alone |
| 4 | `04-1x-m84-kronika-walka-empty.png` | 1× | 84 | Kronika / Walka | empty filter: „Nic tu jeszcze nie ma.” in `text-secondary` |
| 5 | `05-1x-m84-teren-table.png` | 1× | 84 | Teren | the table of revealed tiles under the tab; headings patyk, jagoda, mech, włókno, no rows yet |
| 6 | `06-16x-m243-kronika-wszystko-death.png` | 16× | 243 | Kronika / Wszystko | a real new-game run to death by cold: „243 Mag zamarzł” in plain text, discoveries at 84 and 104, actions, wait entries |
| 7 | `07-16x-m58-kronika-wszystko-actions.png` | 16× | 58 | Kronika / Wszystko | composed state; actions „Zbierz — Patyk” at 20, 30, 40, 50 |
| 8 | `08-16x-m58-rule-panel-open.png` | 16× | 58 | rule panel open | the rule panel takes the whole right area (no tabs) after „+ reguła” |
| 9 | `09-16x-m58-kronika-wszystko-change-and-streak-same-minute.png` | 16× | 58 | Kronika / Wszystko | after „✕”: „58 Passa 58 przerwana: zmiana programu” (red) above „58 Dodano regułę 1.7: Zawsze → Eksploruj” (lilac), the tab brought back is Kronika |
| 10 | `10-16x-m58-kronika-moje-zmiany.png` | 16× | 58 | Kronika / Moje zmiany | the change entry alone |
| 11 | `11-16x-m440-kronika-wszystko-long-run.png` | 16× | 440 | Kronika / Wszystko | longer run, entries of several kinds, list scrolls inside its own height |
| 12 | `12-16x-m440-kronika-swiat.png` | 16× | 440 | Kronika / Świat | „375 Ognisko wygasło” |
| 13 | `13-16x-m440-kronika-passa.png` | 16× | 440 | Kronika / Passa | „84 Passa 25 przerwana: zdrowie spadło od zimna” and „58 Passa 58 przerwana: zmiana programu” (text read by script; the image shows the filter) |
| 14 | `14-16x-m806-kronika-wszystko-end-top-window60.png` | 16× | 806 | Kronika / Wszystko | the map run completed: „806 Las rozwiązany” in green (`positive`); world area shows „Las rozwiązany” and no paragraph; window of 60 rows |
| 15 | `15-16x-m806-teren-table.png` | 16× | 806 | Teren | the table with the tile row and its campfire cell (cut at the right edge, see Concerns) |
| 16 | `16-16x-m806-teren-kept-after-siedziba-and-back.png` | 16× | 806 | Teren | after Siedziba and „Wróć do przejścia”: „Teren” still picked (read: `pressed: Teren`, one `.tile-list`) |
| 17 | `17-16x-m806-kronika-kept-after-siedziba-and-back.png` | 16× | 806 | Kronika / Wszystko | the chronicle after the same trip: newest entry „806 Las rozwiązany” still first |
| 18 | `18-16x-m189-kronika-wszystko-attack-paragraph-and-death.png` | 16× | 189 | Kronika / Wszystko | „Las — głębiej”: „184 Napada wilk (24/24)…” paragraph with the turns, „189 Mag zginął w walce”, „34 Passa 33 przerwana…”; the world area shows „Mag zginął w walce” in „Teraz” and **no paragraph** (DOM read: `.world-area .combat-line` count 0) |
| 19 | `19-16x-m189-after-reload-kronika-wszystko-paragraph-alone.png` | 16× | 189 | Kronika / Wszystko | after `reload` of the saved state with `lastCombat`: the chronicle holds the paragraph alone at minute 184, none in the world area |
| 20 | `20-16x-m189-kronika-passa-empty.png` | 16× | 189 | Kronika / Passa | empty filter, „Nic tu jeszcze nie ma.” |
| 21 | `21-16x-m0-after-restart-kronika-swiat-kept.png` | 16× | about 37 at reading (name says m0, the restart point) | Kronika / Świat | after picking „Świat” and „Teren”, then „Restart”: tab still „Teren” (read), after „Kronika”: filter still „Świat” with no entry yet |

The paragraph screenshots (18, 19) answer „an attack with its paragraph in the chronicle and none in the world area" and „after a reload with a `lastCombat`". The window: in the run of screenshot 14 the list drew 60 rows at first; setting `scrollTop` to the end made it 98 (all the entries; the last row read „20 Zbierz — Patyk”, the oldest) — the growth works in a real browser.

**Console:** `playwright-cli console` and `console error` read the log of the open page. The only lines of the whole session were the two ordinary ones at the first open: `Failed to load resource … 401 (Unauthorized)` at `/api/account` (before sign-in) and `… 404 (Not Found)` at `/favicon.ico`. No line beginning `uncaught` or `saved-game-load`. (After each later `reload` the counter starts again; I read it at the end, after the last reload and a „Restart”: 0 messages. I did not read it after each of the earlier reloads.)

Cleanup: `playwright-cli close`, `npm run local:stop` ("Local starts stopped: 1"), `.playwright-cli/` deleted. The game's own database stays under `.runs/local-start/` as the skill says. No fault of an earlier slice's code showed.

## Own-work check

The requirement I was most likely to miss: "the list draws a bounded window and **draws no row again where nothing changed**" (spec D7), together with "the paragraph composed again only when `lastCombat` changed".

- Check made: a test that wraps the memory and counts `window()` reads — a draw with a new props object and nothing changed reads zero times, one recorded entry reads once (`right-area.test.mjs`, last case); the bounded window and its growth in jsdom, and in the real browser (60 rows, then 98 after a scroll at 16×).
- What it did not show: that a **row** is not drawn again. `Row` is `memo`-ised and `ChronicleView`/`ChronicleList` depend on stable props, but jsdom's DOM output is the same whether a row renders again or not, and I added no render counter. A mutation that removes `memo` from `Row`, or the `useMemo` of the paragraph, passes every test. I name it as unprotected by a test; the protection is by reading the code.

Mutations I considered and that tests catch: wrong order of rows (the oldest first), the minute with a word, a role class on the wrong kind, window growing far from the end, the window not reset by a filter, the tab/filter reset at „Restart”, the table under „Kronika”, the paragraph still in the world area.
Not caught: the value of `WINDOW_SIZE` and `NEAR_END` (the tests only need bounded and growing), the font and colours of the CSS (checked only in the screenshots), `onHover(null)` for a tab click only where the tab changes.

## Choices

- **How the screen reads the memory:** `useSyncExternalStore`, as `RuleOpen` is read. The memory had no `subscribe`, so **I added `subscribe(listener)` to `chronicle.ts`** (called once per recorded result that changed anything, once per pick that changed anything, never after the listener stopped) and a case to `tests/view/chronicle.test.mjs`. Way rejected: handing the snapshot with `update`; a click would then need its own redraw of the whole screen. Cost if wrong: a listener called during `record`, before the game view draws, schedules one extra React render that the game view's `flushSync` draw absorbs; no stale draw was seen in the browser.
- **`createRunScreen` takes the memory as a required third parameter** (not optional with a default memory): a default would need a game state inside the screen. Cost: the two call sites in `tests/view/scene.test.mjs` changed.
- **`subscribe` and `snapshot` are function-valued properties of `Chronicle`**, not methods, so they can be passed to React without `this` (lint rule `unbound-method`).
- **Window 60 rows, +60 per scroll, near the end = 160 scroll pixels:** my tuning (the spec leaves it to the maker). Rejected: all entries (the draw grows with the chronicle, spec D7). If too small, a player scrolls in more steps.
- **A grown window is the list component's own state, keyed by the filter.** Consequences: it starts anew at a filter change and when the player leaves „Kronika” for „Teren” and comes back; it does **not** start anew at a send or „Restart” while the same filter stays picked (the larger window stays; entries are bounded by it, nothing breaks). Not tested.
- **A tab click calls `onHover(null)` only when the tab changes.** Rejected: leaving the hovered key, where a tile of the drawing would stay marked after its row is gone.
- **Layout:** `max-height: 70vh` scroll container for the list, minute column `5ch` (up to five digits), the filter row wraps (`flex-wrap`). The shared tab and button look is not changed.
- **No new design token, role, library or shared control;** `.combat-line` rule deleted with its only user.

## Reaches beyond the handoff

- None to the foundation or the task beyond what the handoff names. I **did not read whole** these entries from the handoff's list: D-39, D-40, D-43, D-44, D-46, D-75, D-88, D-122, D-130, D-132, D-147, D-185, D-212, D-216, D-254, D-255, D-265, D-267, D-272 (read whole), D-283, D-331, D-334; the invariant entries `browser-view-framework`, `browser-view-focus-outline`, `browser-view-token-values` (their tests passed), `content-identifiers`, `document-test-memory-limit`, `local-start-access`. I read whole: D-338, D-343, D-344, D-346, D-347, D-311, D-276, D-272 and the glossary term `chronicle`. For the rest I relied on the spec's and the plan's use of them, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, and the parts of `guidelines/styleguide-browser-view.md` that name roles, tokens, states of shared controls, the tab, and lines at text; `guidelines/testing.md` I read for levels, where expected values come from, changing a test and behaviour-not-implementation, not its whole length.
- `.claude/skills/loop2-play/SKILL.md` read whole. `src/browser/view/tile-table.tsx`, `combat-line.ts` (tests), `run-header.tsx`, `account-card.tsx:600-650`, `controls/react-button.tsx`, `tokens.css`, `tests/view/end-question.test.mjs`, `tests/view/page-document.mjs` read.

## Files changed beyond the slice's Change

- `src/browser/view/chronicle.ts`: `subscribe` and the function-valued properties (the handoff allows the subscription).
- `tests/view/chronicle.test.mjs`: one case for the subscription.
- `tests/view/scene.test.mjs`: the two calls of `createRunScreen` take a chronicle (`createChronicle(state)`), nothing else.

## Concerns

1. The table of revealed tiles is clipped at its right edge in screenshot 15: the campfire cell „ognisko — płonie, zostało 34 min" is wider than the right area's column, and `.screen-area.run-right` has `overflow-x: auto`, so it scrolls. That rule and the column width (336 px) were there before this slice; I did not change them. It was also true when the table stood alone in the area. Not something this slice made worse, but a player on „Teren” sees a cut cell until the area is scrolled.
2. `src/browser/view/right-area.tsx` has no row in the table `Files of this kind` of `guidelines/coding-browser-module.md` (it lists each file of the view and a status). `foundation_check.py` reports 0 errors and the quality test passes, so nothing fails on it; the table is kept through `the-way-maintain-coding-guidelines`, not edited by me.
3. The row-level "no row drawn again" is protected by code (memo, stable keys, `useMemo`), not by a test (see Own-work check).
4. Screenshot 21 is named `m0` but was taken about minute 37 of the restarted run (it keeps running at 16× after „Restart”); screenshot 01 is named `m0` and was taken at minute 12. The minute in the table above is the one read.
5. The jsdom scroll test sets `scrollTop`, `scrollHeight` and `clientHeight` by hand; the real browser growth was seen once (60 → 98 rows), not for the exact `NEAR_END` distance.

## Searches not found or unclear

- A way to reach an attack of the wolf on „Las”: none exists (only „Las — głębiej” has an attacker). I used „Las — głębiej" as a composed state, so screenshots 18 and 19 are not from a state a player reaches in the first minutes; I did not check that a player reaches it by playing (the skill's last section says the same of composed states). The attack in that state ended in the character's death in combat, so no screenshot shows a surviving encounter's paragraph.
- A way for a plain test to see which components rendered (render counts): none in `tests/view/page-document.mjs`.
- None else.
