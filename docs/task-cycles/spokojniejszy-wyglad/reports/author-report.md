# Author report — spokojniejszy-wyglad (the whole change, one author)

**Status:** `done with concerns` — the change is made and committed; the concerns are the choices and the unprotected spots named under "Choices" and "Problems". No questions.

Worktree `the worktree's root`, branch `task/spokojniejszy-wyglad`, base `3b7e4930`. Nothing pushed, nothing under `.runs/` committed, `npm test` not run (the orchestrator's).

## Commits

| Commit | What |
|---|---|
| `9e1bc608` | feat: footer of credits off every screen; folded section of credits last on Siedziba; `footer.ts` renamed `credit-lines.ts`; tests of the card/waiting screens, of Siedziba, of the credits and of the invariant `icon-credits` |
| `4e0c06b2` | feat: every icon of `assets/icons/` drawn as a mask (card of a map, headings of the table of revealed tiles, trip-plan line, drawing of the map, kitchen-sink page); class `action-icon` renamed `icon-mask`; tests |
| `80bd62d1` | docs: foundation entries D-27, D-40, D-43, D-47, D-262 and invariant `icon-credits` |
| `c7f2aa7b` | docs: styleguide of the view, table of browser modules, README |

## Files changed

34 files, +440 / -563 (`git diff --stat -M 3b7e4930..HEAD`). Product code: `src/browser/view/{app.ts, credit-lines.ts (was footer.ts), credits-section.tsx, headquarters.tsx, maps-screen.tsx, tile-table.tsx, trip-plan.tsx, terrain-drawing.tsx, scene.tsx, now-rows.tsx, rule-list.tsx, controls/pick-cell.ts, controls/react-pick-cell.tsx}`, `src/browser/styles.css`, `src/browser/kitchen-sink/{kitchen-sink.ts, kitchen-sink.css}`, comments in `src/browser/sim/data/{actions,campfire,resources}.ts`. Tests: `tests/view/{account-screen, headquarters-screen, icons, maps-screen, trip-plan, world-area, react-controls, rule-editor, scene}.test.mjs`, `tests/invariants/test_icon_credits.py`. Foundation and docs: `foundations/decisions.md`, `foundations/invariants.md`, `guidelines/styleguide-browser-view.md`, `guidelines/coding-browser-module.md`, `README.md`. No file in `assets/icons/**`, `assets/fonts/**`, `assets/sprites/**` changed (trust boundary untouched).

## What was found in the footer when I started (*Not yours* item)

The footer held exactly the lines `footerCredits()` returns and the section draws: the four resources, the campfire, the extinguished campfire and the actions' icons, 17 files. It held no row for the wolf pack (task 20) and none for Smoke & Fire (task 17), so I moved no pack row; the rows of those tasks go to the one function `creditLines()` that both the section on the card and the section on Siedziba read, and need no second place.

## Checks run (command → exit code)

| Command | Exit |
|---|---|
| `npm run typecheck` (at HEAD) | 0 |
| `python -B .the-way/elements/common/foundation_check.py` (at HEAD) | 0, "0 errors" |
| `npm run build` (at HEAD) | 0 |
| `node --test "tests/view/**/*.test.mjs" "tests/sim/**/*.test.mjs"` (at HEAD) | 0, 1807 tests, 1807 pass |
| `npm test -- tests/invariants/test_icon_credits.py` | 0 (3 tests) |
| `npm test -- tests/invariants/test_terrain_drawing_numbers.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | 0 |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | 0 |
| `npm test -- tests/invariants/test_content_identifiers.py`, `…/test_cross_part_imports.py` | 0, 0 |
| `npm test -- tests/quality/test_quality_invariants.py` (eslint, prettier, ruff, shellcheck on the tree) | 0 |
| `npx prettier --check` on the changed `.ts/.tsx/.mjs/.css` | pass (the `.md` files are outside the gate and were not formatted) |

Not run, with the reason: the full `npm test` and `.the-way/gate/run_tests.py` (the orchestrator's run; handoff); tests of `tests/http`, `tests/deploy`, `tests/agent_workflow` (nothing I changed reaches them).

### Failing runs seen first

- Test of the invariant `icon-credits`: with the extinguished campfire's credit taken out of `WITH_ICONS` for a moment, `npm test -- tests/invariants/test_icon_credits.py` → exit 1 (`test_credits_section_credits_each_icon_file`: "wood-pile.svg: the section shows no credit with its page on game-icons.net"); restored, the same command → exit 0. The code was restored before the commit (`git diff` of `credit-lines.ts` holds only the planned edit).
- Page tests: with a bare `<footer>` appended to the page's body in `app.ts` for a moment, `npm test -- tests/view/account-screen.test.mjs` → exit 1 ("no footer on a waiting screen: expected 0, got 1"); restored → exit 0.
- Siedziba test: before the section was added, `npm test -- tests/view/headquarters-screen.test.mjs` → exit 1 ("expected "details", got "section""); after → exit 0.
- The icon tests (world-area, maps-screen, trip-plan) were adapted with the code, not written first: they assert on markup that did not exist before.

## Own-work check

- **Requirement most likely unmet:** To do 5 and the settlement of question 1 — "the map looks exactly as today", because the file colour `#f4f4f5` equals `text-strong` and the icon of stock 0 keeps the opacity of `depleted`. A mask drawn in a foreign object could differ in colour, size, dimming or in what a hover on the icon does.
- **Check:** ran the game (`npm run local`), composed a map run with 16 revealed tiles, one stock set to 0 and a burning campfire (state composed with the game's own functions, checked with `loadSavedGame`), and read the browser: every icon of the drawing has computed `background-color` `rgb(244, 244, 245)` (= `text-strong`), the dimmed one has opacity `0.35` (= `depleted`), the mask file loads (`https://127.0.0.1:…/icons/wood-stick.svg`), a real mouse hover over an icon marks its tile (`hovered: 1,1`, one `link-highlight` outline). Then I drew the old markup (`<image href>`) beside the new in the same page and compared the two crops of the drawing: identical positions, size and colour to the eye at 3× (`side.png`, not kept); 3103 of 32340 pixels differ, all at edges of the shapes (anti-aliasing of an image against a mask).
- **Other states looked at** (screenshots kept nowhere in the repository; none shown to the human, so no push to the screenshots repository): login card with its folded section; waiting screen with the response of `/api/account` delayed (body holds `header`, `main`; no `footer`, no `details`; text "Sprawdzanie logowania…"); Siedziba folded and opened, the opening still held after six seconds of the clock's readings, `lastElementChild` of the screen is the `details`; card of the map Las (icons in the colour of the text beside them); table of revealed tiles (heading icons 16×16 in the heading's `text-label`, `rgb(141, 141, 151)`); Programy with the trip-plan line (icons in the colour of the text); the kitchen-sink page (24 icons in foreign objects and the two icons of the role `depleted`, 1 and 0.35 opacity, in `text-strong`, 0 pictures `<image>`). The browser and both servers were closed and `.playwright-cli/` deleted.
- **Not protected by a test:** the stylesheet rule `.terrain-drawing .icon { color: var(--text-strong) }` — jsdom applies no stylesheet and no token test reads colour of an element; only the browser check above shows it. Named so the reviewer weighs it.

## Foundation entries written (WAY-134: one sentence in English, one in Polish; kind of source)

| Entry | Kind | Meaning |
|---|---|---|
| D-27 | row 3 + projected | EN: a folded section of credits stands on the login card and as the last part of Siedziba; no footer. PL: Zwinięta sekcja wzmianek stoi na karcie logowania i jako ostatnia część Siedziby; stopki nie ma. |
| `icon-credits` | projected | EN: only the section of credits must hold the credit of each icon file. PL: Wzmiankę o każdej ikonie musi mieć sama sekcja wzmianek. |
| D-43 | row 1 + projected | EN: an icon file is drawn as a mask in the colour of the text beside it, or in `text-strong` where no text stands beside it (badge, map); one way of drawing. PL: Ikona jest rysowana maską w kolorze tekstu obok, a bez tekstu obok (plakietka, mapa) w `text-strong`; jeden sposób rysowania. |
| D-40 | row 1 | EN: the icons of the drawing of the map stand in `text-strong` on `tile-revealed` though no text is beside them. PL: Ikony rysunku mapy stoją w `text-strong` na `tile-revealed`, choć obok nich nie ma tekstu. |
| D-262 | row 2 | EN: the waiting screens stand with the header alone, no footer, no credits. PL: Ekrany oczekiwania stoją z samym nagłówkiem, bez stopki i bez wzmianek. |
| D-47 | task item 9 (plan, *Open questions*) | EN: the example and the rejection speak of the links of the folded section of credits. PL: Przykład i odrzucenie mówią o linkach zwiniętej sekcji wzmianek. |

Every entry above is a row of *Settlements to record*, a projected entry the task assigns or the task's item 9; none is `the cycle's` (an entry no row or projected entry carries whole). I put the accepted costs of rows 1 and 3 and the not-chosen ways the task keeps into *Rationale* / *Rejected* as the template gives (D-27: long list on the card, scroll on Siedziba, footer on every screen, section under the heading, section under the chest; D-40: `tile-revealed` outside the five backgrounds the contrast holds, the map's icons in `text` at 3.27:1; D-43: map icons left as pictures, map icons in `text`, two ways of drawing; D-262: a section in the place of the footer). The two contrasts 4.39:1 and 3.27:1 I recomputed from `src/browser/tokens.css` (`#f4f4f5`, `#d4d4d8` against `#71717b`): both agree with the task.

The part map, the glossary and the environment facts needed no change: the part map names globs, not `footer.ts`; no word of the glossary named the footer. No skill of the foundation was invoked as a separate agent step; I followed `the-way-record-decision` / `the-way-record-invariant` (read `SKILL.md`, `decide_entry.md`, `read.md`, `template.md`, `common/rules.md`, `common/way_of_working.md`, invariants `skill/*.md`) and ran `foundation_check.py` after writing (exit 0).

## Reaches beyond the handoff

- `the project definition note in the author's notes` lines 486–560 and 1418–1432 (projected D-27, D-40, D-43, `icon-credits`): to write the projected wording whole, as the foundation step asks; the task quoted them but the handoff did not name the file.
- `the author's global rules for git` (global instructions: before a commit).
- `.the-way/elements/decisions/template.md`, `elements/common/rules.md`, `way_of_working.md`, `decisions/skill/*`, `invariants/skill/*`, `.the-way/task-cycle/skill/foundation_step.md`, `change/ui_check.md`: named by the handoff or by the skills it names.
- `guidelines/styleguide-browser-view.md` edited directly as the handoff says; `the-way-maintain-styleguide` not read (its method was not needed).
- Decisions found by grepping "footer" in `foundations/`: D-27, D-47, D-262 (read whole); D-96, D-323 are only linked from D-262 and were not read whole.
- `README.md` (lines 64, 78) and four comments in `src/browser/sim/data/*.ts` named the footer; I changed them so no text says a footer stands anywhere (comments only in the `simulation` part).

## Unread material

- The part-map entries of `product-foundation` and `agent-workflow` (handoff list): read the part-map head only (the `browser-view` and `simulation` entries, lines 1–60); the other two entries not opened, since no file of those parts changed.
- Decisions D-45, D-70, D-291 (handoff list) read through the task's quotation and by grepping the lines the change touches (D-45 line, D-70 not at all beyond the title); the decision log's D-45 and D-70 entries were not read whole.
- Invariants `icon-file-content`, `browser-view-token-values`, `browser-view-focus-outline` (handoff list): `icon-file-content` read whole; the other two I ran the tests of and read their test docstrings, but not their `foundations/invariants.md` entries.
- `foundations/decisions.md` D-41: read whole. D-70 and D-45 as above. D-27, D-40, D-43, D-47, D-262, `icon-credits` read whole.

## Searches not found or unclear

- None found missing. Unclear: the task says, in its *Context*, that `guidelines/coding-browser-module.md:43` lists `footer.ts`; the status of the renamed file in that table (`copy`, because it no longer builds elements) is my decision, not a source's.

## Choices (with the way rejected and the cost if wrong)

1. **`footer.ts` renamed `credit-lines.ts`, `footerCredits` → `creditLines`, `FooterCredit` → `CreditLine`; table row `copy`.** Rejected: leave the file as `footer.ts` with only the pure function. Cost if wrong: a rename the human did not ask for — three imports and the table line; reverting is mechanical. Reason: a module named footer where no footer stands misleads the next reader, and its `do not copy` status was only for `createFooter`.
2. **An icon in the SVG drawing of the map is a `foreignObject` holding the same `.icon-mask` element that draws the badge's icon**, coloured by `.terrain-drawing .icon { color: var(--text-strong) }`. Rejected: an SVG `<mask>` with an `<image>` inside and a `<rect>` filled in `text-strong` (needs one unique `id` per file, which collides across the several drawings of the kitchen-sink page); CSS `mask` on an SVG `<rect>` (uncertain support across browsers). Cost if wrong: `foreignObject` is heavier for the browser than `<image>` (34 icons on this map; no slowdown seen) and its rendering differs at the pixel edge from the picture (anti-aliasing only). The kitchen-sink page builds the same structure by DOM, since it cannot import `.tsx` (D-269).
3. **Class `action-icon` renamed `icon-mask`** in styles, five modules and five test files (mechanical `sed`). Rejected: keep the name for resource icons too. Cost if wrong: a wider diff for the reviewer (about 15 lines in files unrelated to the three icon sites); the name `action-icon` on a resource would mislead.
4. **No shared helper for the style `{ "--icon": url(...) }`**: it stands inline at the four new sites, as it already does at five old ones. Rejected: a new `icon-mask.tsx` component (would need a row in the module table and would leave the five old sites unconverted). Cost if wrong: the nine places repeat one line; a later task can collapse them.
5. **Accessible names:** the trip plan's icon had `alt={name}`; the mask has `role="img"` and `aria-label={name}`; the other new sites are decorative (`aria-hidden`), as their `alt=""` was. The test asserts the first.
6. **D-262's first sentence** reads "not even the header" in place of "neither header nor footer", and its *Verification* example "alone, with no header" — the task asks to change "with the header and the footer" and the footer in the rationale, rejection and the *Verification* example; the footer sentence stood in two more places and I dropped the footer there too so no entry mentions a footer that no longer exists. Cost if wrong: the human wanted the first sentence untouched; revert is one clause.
7. **D-27 *Rejected* holds the two not-chosen placements of row 3** (under the heading; under the chest), each with its cost taken from the task's question 3.
8. **Test changes** (named per `guidelines/testing.md` "Changing an existing test"): the footer cases of `icons.test.mjs` became cases on the section's markup with the same literals (the footer's four cases that read a built footer module are gone with the footer; the section's two existing cases stay); the footer-oriented controls of `test_icon_credits.py` (stand-in document, made-up footer) went with the footer; the made-up credits of the comparison control are wrapped in `<section>` in place of `<footer>`; the existing case "nothing on the screen sends a character or leads to the screen Mapy" in `headquarters-screen.test.mjs` now excludes the folded section's links (they lead to game-icons.net), with a comment saying so. No assertion was weakened: each removed assertion read the footer.
9. **Changed invariant test:** `tests/invariants/test_icon_credits.py` (invariant `icon-credits`), as the task asks: no longer searches the footer; three tests remain (section credits each file; the section script renders what a section means; the comparison flags each missing part). Seen failing once, as above.

## Problems as observed

- The white frame around the whole content in my screenshots appears to be the `:focus-visible` outline on the screen's element after a hash change (the code focuses it); seen on base screens too in the same way; not caused by this change (a guess, not verified on the base).
- The stylesheet rule colouring the map's icons has no test (above).
- The icon of the table's heading is 16×16 px as before (`width: 16px; height: 16px`, layout dimensions D-43 leaves out); the other icons are `1lh` tall as before, so the resource icon in the card of a map and in the trip-plan line is unchanged in size.

## Mutation check in the head (section 2 of the skill)

Siedziba section moved above the chest or dropped → `lastElementChild` case fails. Footer put back → page case fails. A map icon back to `<image>` → `querySelector("image") === null` fails. Dimmed class lost on stock 0 → `["…berry-bush…", "icon dimmed"]` case fails. A credit lost → invariant test fails (seen). Colour of the map's mask changed in the stylesheet → no test fails (named above).
