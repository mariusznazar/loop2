done with concerns

# Executor 8 report — slice 8, the card draws the icons in its heading

Branch `task/mechanizm-drabiny`, base `8951b363`. One commit: `d7136c57`.

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/view/map-card.tsx` | 37 | 18 |
| `src/browser/maps-screen.css` | 25 | 1 |
| `tests/view/maps-screen.test.mjs` | 78 | 3 |

(from `git diff --stat HEAD~1`: 140 insertions, 22 deletions in all.)

What the change does:

- `map-card.tsx`: `CardIcon` takes an optional `className` (default `maps-card-icon`, so the card's other icons are drawn as before). The heading draws `heading.icons` (Slice 7) as `CardIcon` with the class `maps-card-heading-icon`, between the name and the tag of the state. The tag, the separator and the opener are now inside one new item of the heading, `span.maps-card-tags` (cause in "Choices" below).
- `maps-screen.css`: `.maps-card-heading-icon` (`align-self: center`, `font-size: var(--font-size-map-card-title)`, `color: var(--text-strong)`; the height is the `1lh` that `.icon-mask` already gives) and `.maps-card-tags` (flex, wrap, baseline, the same gaps as the heading). Every value is a token or a keyword. The card block's comment names the icon.
- `tests/view/maps-screen.test.mjs`: a new case, and a changed expectation in the existing case of Las (below).

## Tokens: no value missing

The icon needs a size and the tokens give it: it is as tall as one line of the title (`1lh` of `--font-size-map-card-title`), about 31 px at 1280 and at 360. No new token value was chosen and none is missing (`src/browser/AGENTS.md`). The colour is `--text-strong`, the colour of the name beside it (D-43). Where the human wants the icon smaller than a title line, that is a choice for a token that does not exist yet.

## Checks (command and exit code)

| Check | Command | Exit |
|---|---|---|
| New case written first, failing | `npm test -- tests/view/maps-screen.test.mjs` before the code | 1, assertion "the name, the wolf's icon, the tag, the opener: expected [... icon url(\"/icons/wolf-head.svg\") ...], got [name, tag, sep, opener]" (log: `reports/executor-8-files/test-first-fail-heading-icon.log`) |
| Tags-item expectation written first, failing | `npm test -- tests/view/maps-screen.test.mjs` before the `maps-card-tags` item | 1, "expected anything but <div class=\"maps-card-heading\">" (log: `reports/executor-8-files/test-first-fail-tags-item.log`) |
| Slice check: the screen's test | `npm test -- tests/view/maps-screen.test.mjs` | 0 (52 tests, 52 pass; log `reports/executor-8-files/final-maps-screen.log`) |
| Slice check: the token invariant | `npm test -- tests/invariants/test_browser_view_token_values.py` | 0 (4 tests OK) |
| Slice check: typecheck | `npm run typecheck` | 0 |
| Prettier | `npx prettier --check src/browser/view/map-card.tsx src/browser/maps-screen.css tests/view/maps-screen.test.mjs` | 0 (after `--write` on the test file, which it had flagged once) |
| ESLint | `npx eslint src/browser/view/map-card.tsx tests/view/maps-screen.test.mjs` | 0 |
| The screen Mapy at `#/mapy/forestDeep`, both layouts, phone measurement | see "Walk" | lists empty |

Not run (by the handoff): `npm test` without a file, the foundation check, the instruction-files check. Not run as a check of mine: `tests/quality/test_function_and_file_size.py` (the function and file thresholds, 200 and 800 lines; `MapCard` is about 115 lines and the file about 245, so well under; my try to run `eslint-size-rules.mjs` by hand gave "No files matching the pattern", which is my misuse of the script, so this is read by size, not run).

Tests failing on the base: none. Every test of the file passed on the base before I wrote mine; the only failures I saw are my two test-first runs above.

## Test changes

- New case "the heading of the card of Las — głębiej holds the wolf's icon between the name and the tag in the colour of the name, and the headings of Skraj lasu and of Las hold none". It shows, on the drawn card with the real stylesheet: the leaves of the heading in document order are name, `icon url("/icons/wolf-head.svg")`, tag, separator, opener; the icon is `aria-hidden` and no picture; its computed colour equals the name's and is `var(--text-strong)`; at `forest` (Las) and `forestEdge` the heading holds no icon mask. It carries `decision:` lines for D-327 and D-43.
- The existing case of Las ("the card of Las — głębiej names its opener ..."): its assertion of the heading's children changed form. Handoff mismatch, one line: the handoff said its expected value gains the icon, but that case checks the heading of Las (`forest`), which has no attacker, so no icon enters its expected value. It changed for another cause: the tag, the separator and the opener now stand in one item (`maps-card-tags`), so `heading.children` no longer lists them. The assertion now reads the same four leaves in document order with the same class names as before (the content is the same, not weaker), and two assertions are added: the tag and the opener have the same parent, and that parent is not the heading itself.
- Name of the break each catches: the new case fails when the icon is left out, drawn after the tag, drawn as a picture, drawn without `--text-strong` (colour test), or given to a map that has no attacker. The tags-item assertion fails when the tag and the opener go back to separate items of the heading; a deliberate decision could also change it, which is why its comment says what it is for (the layout that it protects, no separator at the end of a line, jsdom cannot show).

## Own-work check

Requirement most likely unmet: "every value read from the tokens" and "drawn as the card's icons are drawn, as a mask in the colour of the text beside it" together with the phone layout. Check: the token invariant test (exit 0); the colour test through the real stylesheet; and the browser walk below, where the computed colour of the icon is `rgb(244, 244, 245)`, the same as the name's, and the mask image is the wolf's file. What the walk showed that no test did: at 360 px the wolf's heading wrapped, leaving the separator "·" alone at the end of a line (screenshot taken before the fix, not kept). That is the one fault found and fixed (Choices 1).

Mutations in my head, after the change: the colour line removed (the colour test fails); `icons` replaced with `[]` (the new case fails); the icon placed after the tag (the order assertion fails); the `maps-card-tags` item removed (the parent assertion fails); the key of the icon list repeated for two creatures of the same icon (not drawn by any map's data today; the key has the index, so no collision).

## Walk (the screen Mapy, in the running game)

The game: `npm run local` in the worktree, `https://127.0.0.1:53106` (the start's own address), a local test account made through the login card with an address at `example.test`. The states: composed with the simulation (`reports/executor-8-files/make-state.mjs`, sent with the skill's request, `make-send.sh`): one character "Agent", Las solved (forestDeep open) and the second state with forestDeep solved too. The state of the card open and solved at the wolf's map was reached by composing, not by playing: the saved game was sent by `PUT /api/saved-game`, as the skill's section "Compose a game state" gives.

| Case | Where | Verdict |
|---|---|---|
| `#/mapy/forestDeep`, open, 1280 × 720 px, no touch (`innerWidth` 1280, `maxTouchPoints` 0) | Chromium by Playwright CLI at the address above | The wolf's icon between "Las — głębiej" and "otwarta · odsłania ją Las", 30.8 px, white as the name; the tag and the opener on the same baseline as before |
| the same, solved | same | The icon and "rozwiązana" in `positive`, "odsłania ją Las" in `text-secondary`; heading children as expected |
| `#/mapy/forest` (Las, no attacker), 1280 × 720 px | same | No icon; the heading as before |
| `#/mapy/forestDeep`, open, 360 × 740, touch and `isMobile` (`touch` 1, `phone` true), page opened with `.playwright/cli.phone.config.json`, reached by taps (`page.tap`) | same | The wolf's icon in the heading, all on one line; "Wejdź — wybierz postać" under it as before; measurement: `scrollsToTheSide` false, `contentWiderThanItsBox` [], `outsideTheWindow` [], `controlsSmallerThan48` [] |
| the same, solved | same | The tag and the opener pass together to the second line of the heading (the tag item does not fit beside name and icon: 318 px of room, name 134 + icon 31 + tag item 150 + gaps); no separator at the end of a line; the four lists as above, empty |
| `#/mapy/forest` at 360 × 740, solved, by taps | same | No icon, the tag beside the name as before; the four lists empty |

Console: `playwright-cli console error` showed 0 errors and 0 warnings on the phone session.

Walk: what the change alters, in the user's words: the heading of a map's card shows the small icon of each creature that attacks there beside the title, white as the title; on the phone, the tag and the opener of a solved wolf's map pass to a second line of the heading. Shared code touched: `CardIcon`, which also draws the icons of "Żąda", "Czyha" and "Leży tu"; its default class is unchanged, and those icons look as before on every screenshot above (and the tests of the card, 52 of the file, pass). Last row of the plan, side observation: on some 1280 px screenshots a white frame stands round the whole screen area; I reached the card by setting the address fragment from a script, which probably left the keyboard focus ring on the area (a guess, not verified; it stands on the screenshot of the open wolf's map at 1280 and is not in the heading). It is outside the task.

Walk: what I did not check: another page area (1100 px), Firefox and Edge, a real phone, a card reached by real play to Las — głębiej (composed instead), a heading with two icons (I did not look whether any map of the data has two attackers; the test and the screenshots show one icon only), and the card of a map whose character is in a map run.

Not checked: another page area (1100 px; no fault seen near it, since the heading is the same flex item), Firefox and Edge (the human's, D-396), a real phone. The state of the card "open" with a real play-through to Las — głębiej was not played, only composed.

Screenshots shown to the human, pushed by me (D-418, D-419) to the public repository `mariusznazar/screenshots`, directory `loop2/mechanizm-drabiny/`, branch `loop2/mechanizm-drabiny`, commit `851f47f318c95a08c139348a678e577b9e8c3da7`. Each was looked at before the push: only the made-up account, no address or password on a screen (the menu shows "Konto" only).

- ![Las — głębiej, open, 1280 px: the wolf's icon beside the title](https://github.com/mariusznazar/screenshots/blob/851f47f318c95a08c139348a678e577b9e8c3da7/loop2/mechanizm-drabiny/forestdeep-card-1280-open.png?raw=true)
- ![Las — głębiej, solved, 1280 px](https://github.com/mariusznazar/screenshots/blob/851f47f318c95a08c139348a678e577b9e8c3da7/loop2/mechanizm-drabiny/forestdeep-card-1280-solved.png?raw=true)
- ![Las, no attacker, 1280 px: no icon](https://github.com/mariusznazar/screenshots/blob/851f47f318c95a08c139348a678e577b9e8c3da7/loop2/mechanizm-drabiny/forest-card-1280-no-icon.png?raw=true)
- ![Las — głębiej, open, 360 px phone layout](https://github.com/mariusznazar/screenshots/blob/851f47f318c95a08c139348a678e577b9e8c3da7/loop2/mechanizm-drabiny/forestdeep-card-360-open.png?raw=true)
- ![Las — głębiej, solved, 360 px: the tag and the opener on the second line](https://github.com/mariusznazar/screenshots/blob/851f47f318c95a08c139348a678e577b9e8c3da7/loop2/mechanizm-drabiny/forestdeep-card-360-solved.png?raw=true)
- ![Las, no attacker, 360 px: no icon](https://github.com/mariusznazar/screenshots/blob/851f47f318c95a08c139348a678e577b9e8c3da7/loop2/mechanizm-drabiny/forest-card-360-no-icon.png?raw=true)

The push is an outside action: the repository is public and holds history; the commit author address in it is the owner's private address (the owner's setting for this account, `git log --format='%h %ae'` shows it). Where the orchestrator wants the commit author otherwise, the branch can be cleared with the repository.

## Choices

1. **The tag, the separator and the opener in one item (`maps-card-tags`).** The first browser look at 360 px showed the wolf's icon pushing the heading to two lines in a way that left "·" alone at the end of the first line ("rozwiązana ·" / "odsłania ją Las"). Chosen: one flex item for the three, which passes to the second line whole. Rejected: (a) a smaller icon, which fits only at 18 px or less (the room left is 13 px short at 31 px), too small beside a 22 px title and needing a size no token holds; (b) hiding the separator and drawing it with `::before` on the opener, which leaves a dot at the start of the second line and dead markup; (c) leaving the dot and reporting it, which hands the human a visible fault. Cost if wrong: one more nested element in the heading and a changed expectation in one existing test; reverted by removing the item and the one rule.
2. **The icon's size is `1lh` of the title's token.** Rejected: a size in px (not allowed), the label's size (an icon too small beside the title). Cost if wrong: only the one rule `.maps-card-heading-icon`.
3. **Order name, icon, tag.** The styleguide's Good example of the screen Mapy gives "nazwa ... obok niej wilcza głowa ... i obok nich „otwarta”", and D-327's text says "beside the name and the tag".

## Where my code makes a foundation entry less exact (nothing written)

- D-327 and the styleguide say that on the phone "the tag of the state and „odsłania ją {mapa}” stay beside the name". At 360 px, for the solved wolf's map, they now stand on the second line of the heading, under the name and its icon, above "Wejdź — wybierz postać"; for the open map they stand on the first line beside the name. They stay at the top of the card and in the heading, so the entry is true if "beside" is read as "in the heading", and loosely true otherwise. The orchestrator can judge. Before my change "Wejdź — wybierz postać" already stood on its own line below the heading at 360 px (measured with the icon hidden: heading 292 px wide, button below it at y 679), so that part of the entry is as it was.
- The styleguide's description of the card heading does not mention the single item that holds the tag, the separator and the opener; nothing it says is untrue.

## Reaches beyond the handoff

None. I read, beyond the *Read* list, nothing of the foundation; `tests/view/game-stylesheets.mjs` and `src/browser/styles.css` lines around `.icon-mask` I opened (for how the icon mask takes its height, `1lh`), and `src/browser/tokens.css` for the title token.

## Trust boundary and irreversible operations

The change touches no trust boundary (a stylesheet class, a component, a test) and holds no operation that cannot be undone. The push to the public screenshots repository is the route D-418 and D-419 give.

## Working copies and processes

- `.runs/executor-8/` of the worktree (logs of the runs, the composed-state script, the screenshot clone `.runs/executor-8/screenshots`): removed with `rm -rf` by its full path. Kept in `.runs/task-cycles/mechanizm-drabiny/reports/executor-8-files/`: `make-state.mjs`, `make-send.sh` (the input and command that composed the states), `phone-measure.js` (the skill's measurement as I ran it), the two test-first logs and the final log of the screen's test.
- `.playwright-cli/` of the worktree (made by the CLI: snapshots, console logs, my screenshots, the state files and send scripts): removed by its full path. The six screenshots live only in the public repository now.
- Processes: `npm run local` stopped with `npm run local:stop` ("Local starts stopped: 1"; the address no longer answers); the browser closed with `playwright-cli close` (`playwright-cli list` shows no browsers). Nothing runs in the background. `.runs/local-start/` stays: the local start's own files, which its tool makes and cleans by itself.
- Not removed: nothing else.

## Unread material

- `guidelines/styleguide-browser-view.md` (1980 lines, about 290k tokens; the tool cap allows 25k per read): not read whole. Read: lines 1-538 (Roles, the rules up to The kitchen-sink page's start), 561-740 (Two layouts, no side scroll, touch targets, "A change is checked in both layouts"), 787-808 (A line at a text takes the colour of that text), 926-1082 (The screen Mapy, whole), 1958-1980 (Mockups, Plan, Where in code). Unread: 539-560, 741-786 (Main button, secondary action and tab), 809-925 (name typed by the player, focus, menu bar), 1083-1957 (the other screens). Reason: size; the unread parts are the rules of other screens and controls.
- `guidelines/testing.md`: read whole (lines 1-509) in two reads.
- `guidelines/coding.md`, `guidelines/coding-browser-module.md`, `src/browser/AGENTS.md`, `.the-way/task-cycle/change/SKILL.md` and `slice.md`: read whole.
- `.claude/skills/loop2-play/SKILL.md`: read lines 1-430 (the start of the game, the CLI, the phone layout whole, the console, composing a state, motion, the screenshot section whole, the start of the MCP section); the rest (MCP way) not read: the CLI worked.
- `foundations/decisions.md` D-327, D-43, D-418, D-419 and `foundations/invariants.md` `browser-view-token-values`: read whole. `foundations/part_map.md:3-32`: not opened (the files I changed are named in the slice's *Change*; the part is `browser-view`). `src/browser/view/map-lines.ts`: read lines 30-120 (CardHeading, cardHeading) only. `src/browser/maps-screen.css`: read lines 200-390 (the card's rules) and the grep of every `maps-card` rule; the rest of the file not read whole. `tests/view/maps-screen.test.mjs`: read lines 1-60, 290-612 and the greps; the rest not read.
- `task_frozen.md`: read To do 8 (line 35) only, as the slice names.
- `.the-way/task-cycle/change/ui_check.md` and `walkthrough.md`: read whole, after the walk and before the return (I had meant them for the end and read them late); the walk follows them as shown in "Walk" and "Walk: what I did not check".

## Searches not found or unclear

- `python3` is not on the PATH of this computer's Git Bash (the script rule in the user's instructions names `python`); I made the one edit that wanted a script with the Edit tool instead. Not a gap of the product.
- The handoff says the test of the heading's children gains the icon in its expected value; the case that checks the heading's children is for Las, which has no attacker (see "Test changes"). Unclear which case the plan meant; the new case holds the wolf's heading.
- `eslint -c tests/quality/eslint-size-rules.mjs <file>` is not the way to run the size run (it takes none or a directory); I did not find another one-file way and did not run it.

## Concerns

- "done with concerns" for: the second-line wrap of the tag and the opener at 360 px on the solved wolf's map (a visible change of that heading, which looks right to me but departs from "beside" in the entry's words); the styleguide read in part.
