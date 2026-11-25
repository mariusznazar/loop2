done with concerns

# Executor report - Slice 9 (the catalog on the screen Mapy: structure and behaviour), task `katalog-map`

Worktree `the task's worktree`, branch `task/katalog-map`, base `bf37e4ca`. Nothing pushed. The full gate (`npm test` with no file) was not run.

## Commits

- `eed49524` feat: draw the catalog of maps on the screen Mapy as a component ... Files (lines added / removed):
  - `src/browser/view/map-catalog.tsx` +281 (new)
  - `src/browser/view/maps-screen.tsx` +4 / -25 (the list `MapList` goes, `MapCatalog` is drawn in its place, two comments)
  - `tests/view/map-catalog.test.mjs` +434 (new, 12 cases)
  - `tests/view/maps-screen.test.mjs`, `tests/view/account-screen.test.mjs`, `tests/view/end-window-lines.test.mjs`, `tests/view/end-window.test.mjs`

## What was made

- `MapCatalog({ solvedMaps, selected })` calls `catalogLines` of Slice 8 with the game's data and draws: the shared text field (`ReactTextField`, label „Szukaj mapy albo zasobu”), the three views as `ReactButton kind="tab"` in a container of the classes `maps-catalog-views tabs` („Dokąd” picked at the start), the counter, and per view:
  - „Dokąd”: per region a header and a list of rows; the solved maps folded under one `ReactButton` with `expanded` („▸ 3 rozwiązane”), which unfolds them.
  - „Co daje”: per resource a header (icon mask, name, count) and rows.
  - „Postęp”: per region the rows and one `aria-hidden` empty place without text per map not yet opened.
  - the sentence `lines.none` („Nic nie pasuje do „{zapytanie}”.”) where the view has no row.
- A row is `<a class="maps-list-item maps-catalog-row" href="#/mapy/{id}" aria-current="page">` (class of the old list), with the state circle (`●`/`○`, `role="img"`, `aria-label` „Rozwiązana”/„Otwarta”), the name, the facts joined by „ · ” (the `warning` ones in `maps-card-warning`, the class of the card) and the icon masks of the attackers.
- The view, the typed text and the unfolded regions are `useState` of the component; `maps-screen.tsx` draws it in the left area with `solvedMaps` and the map the address names (`open`, the one the card draws). The group of the picked map is unfolded by the lines (drawing only), and stored nowhere.
- `maps-screen.tsx` otherwise unchanged: the card, „Kto idzie” and the judging stand as they were. No CSS was changed (the look is Slice 10).

## Checks (command - exit code)

All in the worktree root; logs in `.runs/executor-9/` (ignored).

1. `npm test -- tests/view/map-catalog.test.mjs` - 0 (12 of 12).
2. `npm test -- tests/view/maps-screen.test.mjs` - 0.
3. `npm test -- tests/view/catalog-lines.test.mjs` - 0.
4. `npm test -- tests/view/screen-registry.test.mjs` - 0.
5. `npm test -- tests/invariants/test_content_identifiers.py` - 0.
6. `npm test -- tests/invariants/test_browser_view_framework.py` - 0.
7. `npm run --silent typecheck` - 0.
8. `npx eslint --max-warnings 0 src/browser/view/map-catalog.tsx src/browser/view/maps-screen.tsx` - 0 (first run 1: `@typescript-eslint/unbound-method` on `onToggle(name): void` in a props type; changed to `onToggle: (name) => void`, then 0). Also on the five test files - 0.
9. `npx prettier --check` on both source files and all `tests/view/*.mjs` - 0.
10. `python -B .the-way/elements/common/foundation_check.py` (no flag, after `git add` of the new files) - 0, "0 errors". First run after my new test: 1 error (my quotation of D-331 `tests/view/map-catalog.test.mjs:329` did not begin a sentence); re-quoted from the sentence's start, then 0. The 12 citations of the handoff are brought to D-325 "The screen Mapy holds on the left the catalog of the game's maps" and D-327 "It departs from the card of the predecessor game in five things only".
11. Also run, exit 0: `npm test -- tests/view/account-screen.test.mjs`, `.../end-window.test.mjs`, `.../end-window-lines.test.mjs`, `npm test -- tests/quality/test_function_and_file_size.py`.
12. `node --test` on every file of `tests/view/` that names a map or the screen Mapy (47 files, list in `.runs/executor-9/mapfiles.txt`), run after `node scripts/build.mjs`. Before my test changes four failed, all only because the data hold five maps or because the list is gone: `maps-screen.test.mjs` (2 cases: the list rows, `.maps-list-solved`), `account-screen.test.mjs` (2 cases: the reload at `#/mapy/forest`, the three clicks from Siedziba), `end-window.test.mjs` (1), `end-window-lines.test.mjs` (1: the end window after Las — głębiej offers „Otwarte: Las — wataha →”). After: all 47 pass. No other file of `tests/view/` failed. The one failing-at-base test the handoff lists for Slice 9, `tests/view/maps-screen.test.mjs`, passed at the base (50 of 50, log `.runs/executor-9/base-maps.log`) because its list cases still held for the maps then open; they broke only with my change.
13. Mutation (own work): in `map-catalog.tsx` the first view changed to „Postęp” and the `searching` force of the fold to false: `map-catalog.test.mjs` 7 of 12 failed; module restored from a copy (`diff -q` silent), 12 of 12 pass again.

Not run: the full gate, `check_instructions.py`.

## Own-work check

- Requirement most likely unmet: the picked row is seen (the group of the picked map unfolded, not stored), the view/text/unfolded state ends with the screen, and the component names no map. Checks: cases "the group of the picked map is unfolded ... stays folded for the player once the pick goes", "the unfolded region survives a change of view and ends with the component", `test_content_identifiers.py` - all pass.
- Walkthrough (`walkthrough.md`), real game: `npm run local` at `https://127.0.0.1:50666`, Playwright CLI at 1280 x 720 without touch, a made-up account `agent9@example.test`, a composed state (my script `.runs/executor-9/compose.mjs`: three maps solved; accepted by `loadSavedGame`) sent by the save request. The change alters what a user sees (the left area of Mapy).

| Case | By what | Verdict |
|---|---|---|
| `#/mapy` opens on „Dokąd”, search above, counter „4 poznanych · 3 rozwiązane”, region „Las · 3 z 5”, one open row „Las — wataha” with facts „9 h · 6 do pokonania · bez ognia 33 min”, one fold row „▸ 3 rozwiązane”, the right area „Wybierz mapę z listy.” | snapshot of the page | right |
| The fold unfolds the three solved maps under the open one | click, read names | right (Las — wataha, Skraj lasu, Las, Las — głębiej) |
| „Postęp”: counter „3 rozwiązane z 4 poznanych”, one empty place, header „Las · 3 z 5”; „Co daje”: 4 groups, rarest first (mech, włókno 3 maps; patyk, jagoda 4) | click, read | right |
| Search „ WATA ” finds the wolf-pack map; „qqq” gives „Nic nie pasuje do „qqq”.”; clearing brings the list | fill, read | right |
| A click on a row opens `#/mapy/forestDeep`, the card of that map, one row marked `aria-current`, the view and unfolded state kept across the pick | click, read | right |
| Leaving to Siedziba and back builds the catalog anew (view „Dokąd”, empty field) | links, read | right |
| Console | `console error` | 0 errors |
| side observation | - | the accessible name of a row ran the name and the facts together („wataha9 h”); I put a space between them (`{" "}`) after the walk and re-ran the checks 1-12 (the walk itself was not repeated for that edit). |

Not checked: the phone layout (360 px, touch, the measurement of `loop2-play`) and the look - the rows have no rules of their own until Slice 10 (the screenshot read at 1280 x 720 shows the circle above the name and the facts, unstyled); the keyboard order in a real browser; the screenshot was taken for my own reading and not kept or pushed (Slice 10 owns the screenshots of the look).

## Choices (way rejected, cost if wrong)

1. The fold row of a region is `disabled` while the lines hold the group unfolded (a search typed, or the picked map in that region). Rejected: an enabled fold that changes nothing, a dead control. Cost: low; a disabled button shows in `text-disabled`, and Slice 10 may want another sign.
2. The region name for the toggle is read from the header of the lines (`REGIONS.find(name => header.startsWith(name + " · "))`), since `DokadRegion` carries only the header. Rejected: adding a `region` field to `catalog-lines.ts` (a file of Slice 8, outside my *Change*). Cost: low, fragile where a region name were to hold „ · ” or be a prefix of another; recommendation: add `region: RegionName` to `DokadRegion` in a later change.
3. „Co daje” rows keep the same class `maps-list-item` and the circle and name, with `spread · renewal` as their facts. Rejected: a second row class. Cost: none until Slice 10.
4. The search field is the shared `ReactTextField` (type text), with the visible hint in lower case as the old game had. Rejected: `type="search"` (no shared control of that kind). Cost: none.
5. The tab group has no `role="tab"` (the styleguide's rule, `aria-pressed` kept).
6. Tests rewritten for the catalog: the two list cases of `maps-screen.test.mjs` got new titles and assertions through `.maps-catalog-name`, `.maps-catalog-state` and the fold; the same classes in two cases of `account-screen.test.mjs`. The cause is in the requirement (D-325, D-331: the list is now the catalog; a solved row has a circle, no „rozwiązana”). The end-window cases got the text the code gives for Las — głębiej („Otwarte: Las — wataha →”) and a new check that the last map of the data (`forestLair`) opens none; this keeps the old intent (a completion that opens nothing gives no button) on the one map that now opens nothing.
7. The state circle is text (`●`/`○`) with `role="img"` and an `aria-label`, as the old game had it (it had a `title`). Rejected: a CSS-drawn circle (Slice 10's look; the text stands in tests).

## Concerns for the orchestrator

- The old rule `.maps-list-solved` in `src/browser/maps-screen.css` is no longer used by any code (the „rozwiązana” after the name is gone, D-331). Slice 10 owns the CSS; remove it there.
- The styleguide text of "The screen Mapy" (`guidelines/styleguide-browser-view.md`, "Lista: ... po nazwie stoi „rozwiązana” w `positive`") still describes the old list; this is the plan's later slice (not mine to change).
- Test-first was not followed for the component: the component was written before `map-catalog.test.mjs`; the mutation (item 13) stands in for a first failing run. The tests of the screen that changed were seen failing at base only as the four listed in item 12 (run before I edited the tests).

## Reaches beyond the dispatch

- `.the-way/task-cycle/change/slice.md`, `ui_check.md`, `walkthrough.md` (named by SKILL.md steps), `.claude/skills/loop2-play/SKILL.md` and `compose-state.mjs` (the walk), `src/browser/view/maps-entry.ts` (first 60 lines: to learn that one screen holds both addresses), `src/browser/view/controls/react-button.tsx` and `react-text-field.tsx` (named), `src/browser/maps-screen.css` (first 60 lines), `src/browser/styles.css` (the `.tabs`, `.icon-mask` rules), `src/browser/view/tabs-area.tsx` (head: the pattern of tabs), `src/browser/sim/data/maps.ts` and `resources.ts` (names and order, for hand-derived expectations), D-326 and D-333 not read.

## Working copies

- `.runs/executor-9/` holds logs and `compose.mjs` (script that composes the walk's state), `mapfiles.txt`; ignored by git, kept as the record. A screenshot taken for my reading was deleted; `.playwright-cli/` (state.json, send-state.js) was deleted. The local start was ended with `npm run local:stop` ("Local starts stopped: 1") and the Playwright session closed; its database under `.runs/local-start/` is the start's own and stays by the skill's rule. No worktree or clone was made.

## Unread material

- `guidelines/testing.md` was read whole (in three pages); `guidelines/styleguide-browser-view.md` whole in four pages; `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md` whole.
- `foundations/decisions.md`: D-325, D-327, D-331, D-134 (to the end of its verification, tail cut at 1800 chars), D-149 (first 1500 chars) read; D-282, D-276, D-333, D-24, D-276 and the other entries of the *Read* not read beyond what the styleguide quotes. `foundations/part_map.md:1-33` not read (the foundation check passes with the new file).
- `task.md` passages (To do 5, Q1, Context, Decisions in play): not opened; I worked from the handoff's copy of the slice, the plan's choices and the decisions.
- The old game's `MapCatalog.tsx`: read whole. `mapFacts.ts`, `plural.ts`, `Icon.tsx`: not read.
- `tests/view/maps-screen.test.mjs:240-330` read; the rest of the file read only where I changed it.

## Searches not found or unclear

- The handoff says `tests/view/maps-screen.test.mjs` fails at the base; at base it passed (50 of 50). Not found as a failure (explained in item 12).
- „The short demand” of D-331: the module of Slice 8 gives it as the first facts of a row (the streak in hours, „N do pokonania”); I drew it as the start of the facts line, after the name. Unclear whether D-331 meant a shorter text on the name's line; the plan's Goal reads „the name and the short demand, the facts”.
- Where the `region` of a `DokadRegion` is named: not in the type (see Choice 2).
