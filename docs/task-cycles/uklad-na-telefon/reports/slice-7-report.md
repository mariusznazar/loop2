done with concerns

# Report of slice 7 - the touch target of the shared controls

Worktree `the task's worktree`, branch `task/uklad-na-telefon`, base `ebe00ef2575f3f8e4137d8c8ac9f5470cba9c660`.

## Commit

- `9cb58f9f79579a50a7cf8d21e8b53afc6c1e6b95` - `style: :lipstick: hold every shared control and every control whose rule stands in styles.css to the touch target of 48 px in the phone layout ... (D-396)`. Not pushed.

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/tokens.css` | 3 | 0 |
| `src/browser/styles.css` | 37 | 1 |

What the change is:

- `tokens.css`: a new group `/* Touch target */` with `--touch-target-min: 48px;`, named for what it is for (D-48). Its `Source:` comment names the environment fact `android-touch-target-size`, quotes the passage "For touch interfaces, we recommend that each interactive UI element have a focusable area, or touch target size, of at least 48dpx48dp. Larger is even better." with the address, the section and the date read (2026-11-21), and says the dp is read as the px of the page, as D-396 reads it.
- `styles.css`: one block `@media (width < 1280px)` after the rules of the shared controls (before `.form`), with a comment that names D-396 as the source of the 1280 px and of the minimum. In it `.button`, `.select-list`, `.input-field input`, `.menu-bar-item` and `.account-menu-panel-link` get `min-width` and `min-height` from `var(--touch-target-min)`. `.input-field input`, `.menu-bar-item` and `.account-menu-panel-link` get `box-sizing: border-box` (they are `content-box` by default, so the minimum would otherwise come on top of padding and frame: measured 52 px on the link before I added it), and the item of the bar and the link of the menu are `display: flex` with the text centred in the target, so the line of the current item stays at the text. One sentence in the header comment of the file says where the phone layout's blocks stand.
- The `@media (max-width: 720px)` rule of the columns is untouched (it is Slice 9's).

## Checks (command and exit code)

| Check | Exit code |
|---|---|
| `npm test -- tests/invariants/test_design_token_sources.py` | 0 (2 tests OK) |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 (4 tests OK) |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 (3 tests OK) |
| `npm test -- tests/view/shared-controls.test.mjs` | 0 (50 pass, 0 fail) |
| `node scripts/test-node-file.mjs tests/view/{character-screen,maps-screen,rule-signs,run-header,scene,world-area}.test.mjs` (the users of the real stylesheets, run after the build of the last `npm test`) | 0 each (15, 50, 6, 24, 74, 24 pass; 0 fail) |
| the measurement in the running game at 360 px (below) | see the table |
| the screenshots and the sizes at 1280 x 720 px, before and after (below) | identical |

Not run: `npm test` with no argument (not mine, as the handoff says); `foundation_check.py` and `check_instructions.py` (the slice changes no foundation entry and no instruction file). No invariant's test was seen failing first: no invariant is new or changed, and the three existing ones only had to keep passing; no automated test of the floor was written (see Concerns 1).

## Note 3 of the handoff: does jsdom apply `@media (width < 1280px)`?

No. A throwaway case in `.runs/slice-7/` (removed): a stylesheet with `.a { min-height: 10px }` and `@media (width < 1280px) { .a { min-height: 48px } }`, in `new JSDOM(..., { pretendToBeVisual: true })` (jsdom 30.1.3, `innerWidth` 1024, `matchMedia` undefined): `getComputedStyle(.a).minHeight` was `10px`; `@media (max-width: 720px) { .b {...} }` gave `auto` (also not applied); `@media screen { .c {...} }` gave `48px` (applied). So jsdom applies a media block only when its media list holds the word `screen`; a rule inside `(width < 1280px)` is invisible to every test of the repository that reads real stylesheets. The six users of `game-stylesheets.mjs` that I ran still pass. The plan's belief is right, with this edge for slices 5 and 15: a block written as `@media screen and (width < 1280px)` would be applied by jsdom regardless of the width (the list holds `screen`), so write the blocks without `screen`.

## Own-work check (section 3)

Requirement my work most likely does not meet: "every control ... whose rule stands in that file is at least that minimum high and wide at 360 px" and "nothing outside the phone layout changes, so at 1280 x 720 every screen looks as before".

Check 1, at 360 px (loop2-play, section "Check the phone layout": `npm run local`, Chromium by `playwright-cli open --config=.playwright/cli.phone.config.json`, `matchMedia('(width < 1280px)')` true, 360 x 740, touch 1, taps by `page.tap`; the measurement of that section, `const min = 48`). States measured, after the change: login card („Zaloguj się”, „Załóż konto”, „Nie pamiętam hasła”), Siedziba, Mapy (list and card with „Wejdź”, „Puść w pętlę”, „Oceń na 12 ziarnach”), Programy, Wiedza, Postać, screen of a map run (paused, with the rule panel open and the pick of „Czynność” open), menu „Konto” open. `scrollsToTheSide` false everywhere.

| Control | Before (360 px) | After (360 px) |
|---|---|---|
| `button.button` of every kind (menu „Konto”, „Wznów”, 1×..16×, „Restart”, „Zakończ”, „Nowy program”, „Zapisz...”, „Porzuć zmiany”, „Zwiń grupę”, „Usuń grupę”, „+ reguła”, „+ dodaj grupę”, „Kronika”, „Teren”, filters, login-card buttons and tabs) | 22.8-24.2 high, 27.8-160.9 wide: every one on the list of the run screen | 48 high, all at least 48 wide; none on the list |
| `select.select-list` „Program:” | 134 x 25 | 134 x 48 |
| `input` of the text field | 278 x 24.2 (login card) | not on the list any more on the card; 195 x 48 in the field „Imię” of Siedziba |
| `.pick-cell` „Eksploruj” | not measured before | 64 x 48 (and 132 x 48 selected) |
| `a.menu-bar-item` (4 items) | 48.8-73.2 x 24.2 | 48.8-73.2 x 48 |
| `a.account-menu-panel-link` | not reachable (account with the owner role needed); the link was put into the open menu by a script in the page | 118.2 x 48 after `box-sizing`; 118.2 x 52 before it |
| `button.button.secondary` „Wróć do logowania” | 22.8 high | 104 x 48; its text is wider than 48, so it still begins level with the fields |

The measurement's list of controls smaller than 48 px is empty for every shared control (the classes `button`, `select-list`, `input`, `pick-cell`, `menu-bar-item`) on every screen on the way into a map run. What stays on the list is outside this slice, since its rule stands in another stylesheet or the element has none (Concerns 2): `a.team-member-name` 36.3 x 18.2 (Siedziba), `a.maps-list-item` 294 x 22.2, `a.maps-who-name` 36.3 x 18.2, `a.program-list-item` 294 x 22.2, `div.next-row` and `div.now-row` 302 x 18.2 (the rule rows, focusable divs), `summary` „Autorzy grafiki” 278 or 294 x 16.8 and the links of the credits. The two lists `contentWiderThanItsBox` and `outsideTheWindow` hold what the phone layout of Slices 9-19 still has to fix (`div.world-area`, `div.scene-sheet`, `div.camp`, `div.rule-panel-cell` and its button „Eksploruj” 80 > 62, `div.character-figure`): all were there before my change, none is caused by it.

Check 2, at 1280 x 720 px (ordinary session, no touch, `reducedMotion: reduce`, one account and one paused run at minute 18, `playwright-cli reload` before each series): Siedziba, Programy and the screen of a map run, each screenshot and a dump of every element of the page (tag, class, position, size, `min-width`, `min-height`), with the built `dist/public/styles.css` replaced by the version of `HEAD` ("before"), by mine ("after"), and by mine again. Same state, same code except the stylesheet.

| Screen | sha256 of the screenshot before / after / after again | the dump of the elements before and after |
|---|---|---|
| Siedziba | `45fa5de23146...` all three | byte for byte equal |
| Programy | `3dfc4f062272...` all three | byte for byte equal |
| screen of a map run | `c8ec7c3a9a2d...` all three | byte for byte equal |

(A series taken earlier, with the first state of the account, also gave two identical screenshots of the run screen on one stylesheet, so the screenshots are deterministic with `reducedMotion`.) Positive control of the screenshot comparison was not made; the dumps, which hold positions and sizes of all elements, agree in the same way. Reading the diff: every added rule stands inside the one block `@media (width < 1280px)`.

## Walk (walkthrough.md)

The change alters what a user sees in the running product (the phone layout's controls), so the walk was made, in Chromium by Playwright CLI against `npm run local` of the worktree at `https://127.0.0.1:61665` (Windows 11, the CLI `playwright-cli` 0.1.22), at 360 x 740 with touch and at 1280 x 720 without.

| Case | By what | Verdict |
|---|---|---|
| Every shared control of the screens on the way into a map run (login card, Siedziba, Mapy, the card of a map, the screen of a map run with the rule panel and the pick, the menu „Konto”) is at least 48 x 48 at 360 px (task item 9) | the measurement of loop2-play in the open page after taps | passes; the shared controls' lines are gone from the list, sizes exactly 48 high |
| The same controls keep a usable look: the secondary action keeps its text level with the fields, the item of the bar keeps its line at the text, the open menu is not broken | screenshots of the card „Nie pamiętam hasła” and of Siedziba with the menu open at 360 px, looked at by me | passes; the menu bar of Siedziba wraps onto two lines (Slice 9's matter) |
| A tap on a control still works (taps on „Konto”, „Wyloguj”, „Zaloguj się”, links of the bar, „+ reguła”, the pick, „Odrzuć”, „Wejdź”, „Oceń”) | `page.tap` in the phone session | passes |
| At 1280 x 720 px nothing changes (acceptance: every screen as before) | screenshots and dumps, three screens, before and after | passes, identical |
| The link „Panel właściciela” | a copy of the element put into the open menu by a script; no owner account was made | the size is right (48); the screen as a whole is **not checked**: no account with the owner role on this start |
| The number field at 360 px | not reached in a state; its rule is the one of the text field (`.input-field input`), measured on the text field | **not checked directly** |
| Side observation | - | the screens still scroll or overflow in places that Slices 9-19 handle, as listed above; the credits `summary` and links (rule in `credits.css`) and the rows of the editor stay under 48 px |

What I did not check: the Firefox and Edge of D-396 (the daily check is Chromium); a real phone; the screens that need an account with the owner role (`#/konta`), and a state with a failed save, the end-of-run window (`end-window`, not opened: its buttons are the shared ones), the forms of the reset and of the new password (they come from a mail link, not reachable); a screenshot to show the human (none required of this slice, the plan shows a set in Slice 20 only).

## Choices (with the way rejected and the cost if wrong)

1. One block `@media (width < 1280px)` in the middle of the file, after the rules of the shared controls, not a block after each rule. Rejected: one block per control group (six small blocks). Cost if wrong: a later slice that wants the rules by each control finds them in one place.
2. `min-width`/`min-height` on the rules' class lists with `box-sizing: border-box` for the three `content-box` elements, so the floor is exact, 48. Rejected: leaving `content-box` (52-54 px, a larger layout than asked). Cost if wrong: none known; in an input `border-box` also makes the declared `width` count the frame in the phone layout, and no rule sets such a width in this file.
3. The item of the bar and the menu link become `display: flex` with the text centred in the target. Rejected: leaving the text at the top of a 48 px box with the line of the current item 40 px below it. Cost if wrong: a later slice's menu layout (Slice 9) may want a different alignment.
4. The links inside a sentence were left as they are, as the plan's *Choices* give; the source read says nothing of them. Links left: `a.team-member-name` (the names in „Drużyna” of Siedziba), `a.maps-who-name` (the name of a character in „Kto idzie”), the link „Wróć do niego i je zakończ” in a sentence of the card of a map, and the lists' links which are rows, not sentences (see Concerns 2). Cost if wrong: one link a little small to tap.
5. No automated test of the floor: a rule inside `@media (width < 1280px)` is invisible to jsdom's `getComputedStyle` (above), and a test of the stylesheet's text would test a constant, not behaviour; the floor is held by the measurement in the browser (the slice's *Checks*). Cost if wrong: a later change can remove the block without a test failing; the invariant-level guard would be a decision for the plan (see Concerns 1).

## Reaches beyond the dispatch

- `foundations/decisions.md` D-48 (the naming of tokens): to name the token; D-48 is cited in the slice's *Goal* but its range is not in *Read*. Read whole.
- `.the-way/task-cycle/change/slice.md` and `walkthrough.md`: named by `SKILL.md`, not by the handoff; read whole.
- `src/browser/view/controls/react-button.tsx` (whole), and a grep of `className` in the other controls: to learn the classes the arrows, „✕”, the pick cell and the fields carry (they are all `.button`, `.select-list`, `.pick-cell`, `.input-field input`).
- `tests/view/game-stylesheets.mjs` (whole) and `tests/view/page-document.mjs` (the lines naming jsdom) and `scripts/test.py`: for note 3 and for how a focused test runs.
- `tests/invariants/test_browser_view_token_values.py` (the docstring): to know which properties are layout dimensions exempt from the check of `px` (`min-width`, `min-height` among them).

## Working copies

- `.runs/slice-7` (throwaway jsdom case, measurement and screenshot scripts, screenshots, dumps, logs) - removed.
- `.playwright-cli` (the session's working files, the measurement script) - removed. Both Playwright sessions closed; `npm run local:stop` ran (`Local starts stopped: 1`).
- `dist/` of the worktree was rebuilt several times and in one step briefly held the version of `HEAD` of `styles.css`, which I put back; it is the product's own ignored build output and holds the new version now. `.runs/local-start/` (the start's database) is the product's own file and stays.
- Nothing remains.

## Concerns

1. No automated guard of the floor. The only checks are the browser measurement of the plan and the visual look; an automated test cannot see a rule in a `(width < 1280px)` block in jsdom (above). Nothing in the repository fails if the block is removed. The orchestrator may judge whether Slice 8 (the styleguide's rules) or a later slice should hold such a guard.
2. Controls whose rule stands outside `styles.css` stay under 48 px at 360 px and belong to later slices of the plan (the task's item 9 says "every control"): `a.team-member-name`, `a.maps-who-name` (links in a row of text), `a.maps-list-item` and `a.program-list-item` (the rows of the lists, 294 x 22.2: these are the navigation of the screens, links that are whole rows, not links inside a sentence, so the cited source does not exempt them), the focusable rule rows `div.now-row` / `div.next-row` (302 x 18.2) in the editor, the `summary` „Autorzy grafiki” and the links of the credits (`credits.css`). I did not change them: the slice's *Change* names only `tokens.css` and `styles.css`.
3. The arrows of a rule group „↑” and „↓” of the header do not exist yet (Slice 12/13); the arrows of the rule rows and „✕” are `.button` and are covered (28 px „Zwiń grupę”/„Usuń grupę” became 48 wide). When Slice 12 adds the group's arrows as shared buttons, they get the floor without a rule of their own; if it draws them with a class of its own, it has to hold the floor itself.
4. The pick cell's name still crosses its frame at 360 px (`button.button` „Eksploruj” content 80 > box 62): present before my change, task item 4 (the reverted `8591aa82`), Slice 4's.
5. The tab buttons now 48 high make the tab strips of the run screen and of the card taller at 360 px; D-396 asks for it, and the screens' space is for Slices 9 and 19.

## Unread material

- `foundations/decisions.md`: D-396, D-44, D-43, D-47, D-42, D-38 read whole (and D-48, beyond the handoff); the ranges named in the handoff differ from the current numbers and I found each entry by its heading.
- `foundations/invariants.md:478-517`: the four invariants read whole. `foundations/part_map.md:3-33`: read in part, only the `browser-view` entry (its *Files* and the *Trust boundary*), which is what the range holds.
- `.runs/task-cycles/uklad-na-telefon/task.md:28-45` and `:74-79`: read (items 1-12, the acceptance criteria and Question 7 in the form the file holds them).
- `guidelines/testing.md`: not read; I wrote no test (Choice 5).
- `guidelines/styleguide-browser-view.md`, `guidelines/coding.md`, `src/browser/AGENTS.md`, `.claude/skills/loop2-play/SKILL.md`, `.the-way/task-cycle/change/ui_check.md`, `.the-way/task-cycle/change/SKILL.md`, `slice.md`, `walkthrough.md`, `foundations/environment_facts.md` (the entry `android-touch-target-size`): read whole.
- `guidelines/coding-browser-module.md`: not read (no module of the view is changed).

## Searches not found or unclear

- The entry 2 of the plan (the fact of the touch target) stands in `foundations/environment_facts.md` as `android-touch-target-size`; found by grep, as the orchestrator's note says.
- The styleguide holds no rule yet for the phone layout (Slice 8 writes it), so I followed the plan's *Choices* and the decision D-396 for how a phone rule is written; nothing contradicts them in the files read.
- On this computer `python3` does not run (the Windows stub); `python` does. A hook of the session blocks a `rm` with a wildcard and gives each rules file once per session, repeating the call after the file is read; neither touched the work.
- Not found: a state to reach `#/konta` (the list of accounts) and an account with the owner role on the local start; the link „Panel właściciela” was therefore measured on a copy of the element.
