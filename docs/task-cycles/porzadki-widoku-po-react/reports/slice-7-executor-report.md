# Report — slice 7 (slice-7-executor): the stylesheet split, part 2

**Status:** done with concerns (the concerns are the choices below that the plan did not settle; none blocks the slice).

**Commit:** `deed67af` `refactor: :recycle: split the rules of Siedziba, Postać, Mapy, Wiedza, the login card, the waiting screen, the list of accounts and the credits out of styles.css` (base `581d09bb`, one commit, nothing pushed).

**Files changed** (`git diff --minimal --numstat 581d09bb HEAD`):

| File | Added | Removed |
|---|---|---|
| `src/browser/styles.css` | 7 (its head comment, longer by 7 lines) | 828 |
| `src/browser/waiting-screen.css` (new) | 18 | 0 |
| `src/browser/account-card.css` (new) | 92 | 0 |
| `src/browser/credits.css` (new) | 45 | 0 |
| `src/browser/accounts-screen.css` (new) | 105 | 0 |
| `src/browser/headquarters.css` (new) | 193 | 0 |
| `src/browser/maps-screen.css` (new) | 220 | 0 |
| `src/browser/character-screen.css` (new) | 99 | 0 |
| `src/browser/knowledge-screen.css` (new) | 102 | 0 |
| `src/browser/index.html` | 8 (eight `<link>`s) | 0 |

`styles.css` went from 1438 to 617 lines. The files were written by a script (`split7.mjs`, in the evidence directory) that moves each top-level unit whole with the comment standing over it, in its order; nothing was typed by hand except the nine head comments.

**Link order** in `index.html`, after `/tokens.css`: `styles.css`, `run-screen.css`, `waiting-screen.css`, `account-card.css`, `credits.css`, `program-panel.css`, `programs-screen.css`, `accounts-screen.css`, `headquarters.css`, `maps-screen.css`, `character-screen.css`, `knowledge-screen.css`. It is the order of the first rule of each file in the base `styles.css` of the task (`7ba7a116`): run-screen 273, `.session-check` 652, `.account-card-screen` 678, `.account-card details` 754, program-panel 780, programs-screen 800, `.accounts-heading` 823, `.camp` 1423, `.rehearsal-mark` 1594 (the first rule of maps-screen.css, see choice 3), `.character-screen` 3019, `.knowledge-heading` 3322. The three files of Slice 6 keep their places in that order.

## Rules and selectors per file; nothing lost or duplicated

Counted by the order script (a nested rule of an `@media` counts as one rule; the `@media` itself is no extra count):

| File | Rules | Selectors |
|---|---|---|
| `styles.css` | 78 | 96 |
| `waiting-screen.css` | 2 | 2 |
| `account-card.css` | 9 | 11 |
| `credits.css` | 6 | 10 |
| `accounts-screen.css` | 14 | 17 |
| `headquarters.css` | 28 | 33 |
| `maps-screen.css` | 33 | 39 |
| `character-screen.css` | 15 | 16 |
| `knowledge-screen.css` | 15 | 18 |
| **Sum after** | **200** | **242** |
| `styles.css` before (the base of this slice) | 200 | 242 |

The files of Slice 6 stand unchanged (`run-screen.css` 168 / 201, `program-panel.css` 70 / 89, `programs-screen.css` 6 / 6, before and after). The order script compared the four files of the base commit, concatenated in `<link>` order, with the twelve files the page links now, as a multiset of the rules and at-rules with their conditions, white space normalised, comments aside: **444 and 444, 0 in one and not the other.** A second script (`comments-check.mjs`) compared the comments as a multiset: 134 before and 142 after, the only differences the old head comment of `styles.css`, its new head and the eight new head comments — every comment over a moved rule moved with it.

## Checks (command, exit code)

| Check | Result |
|---|---|
| `node .runs/slice-7-executor/order-check7.mjs …` (kept as `reports/slice-7-executor-evidence/order-check7.mjs`; output `order-report.txt`) | exit 0, see below |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | exit 0, 3 OK |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | exit 0, 4 OK |
| `npm test -- tests/invariants/test_application_build_output.py` | exit 0, 7 OK |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | exit 0, 3 OK |
| `npm test -- tests/view/world-area.test.mjs` | exit 0, 22 pass |
| `npm test -- tests/view/scene.test.mjs` | exit 0, 71 pass |
| `npx --no-install prettier --check --no-config --no-editorconfig --ignore-path .gitignore src/browser/*.css src/browser/index.html` | exit 0 (run before the commit; the tree committed is the tree checked) |
| `python -B .the-way/elements/common/foundation_check.py` (not in the slice's checks, run for the new files) | exit 1, 1 error, the known one at `tests/view/run-screen-state.test.mjs:309`; no new error, so the eight new files are claimed by the part `browser-view` |
| the comparison in the real game, below | 0 differences but the new `<link>` elements |

No test is new or changed, so no failing-first run applies; the tests of the invariants read every `.css` directly in `src/browser/` and still hold. I did not run the product's gate (`npm test` without a file). No `outline` and no value in place of a token was added (the token test passes; `grep outline` finds none in the new files).

### The order script (`order-check7.mjs`; before = the four files at `581d09bb`, after = the files read through `gameStylesheetNames()` of `tests/view/game-stylesheets.mjs`, so in `<link>` order)

1. **Rules in one and not the other: 0** (444 / 444).
2. **Pairs whose order changed, with the same specificity and a common property: 6919.** By the stylesheets, the rules of: `account-card.css` that stood before rules of `run-screen.css` (228) and of `styles.css` (9); `accounts-screen.css` before `credits.css` (7), `program-panel.css` (374), `programs-screen.css` (40), `run-screen.css` (494), `styles.css` (16); `character-screen.css` before `maps-screen.css` (235), `program-panel.css` (433), `programs-screen.css` (44), `run-screen.css` (483); `credits.css` before `run-screen.css` (35), `styles.css` (1); `headquarters.css` before `credits.css` (13), `program-panel.css` (610), `programs-screen.css` (62), `run-screen.css` (819), `styles.css` (7); `knowledge-screen.css` before `program-panel.css` (429), `programs-screen.css` (46), `run-screen.css` (508); `maps-screen.css` before `credits.css` (1), `headquarters.css` (1), `program-panel.css` (845), `programs-screen.css` (90), `run-screen.css` (1014); `waiting-screen.css` before `run-screen.css` (73), `styles.css` (2). Judgement, each pair by the first reason that applies:
   - **19 pairs**: the subjects (the rightmost compounds) name different element types, so no element carries both.
   - **6900 pairs**: no `.ts` or `.tsx` file of `src/browser/` gives an element the classes of both selectors (a quoted token on a line that speaks of a class; for a subject with no class — `.account-card details`, `.credits li + li` — the classes of its ancestors count). I ran the same test a second time over every string literal of every file, not only the lines that speak of a class, because the first search misses a class set in a ternary (`danger ? "away-report-line danger" : "away-report-line"`, 1558 distinct pairs hold such a class): **0 pairs** have a file that holds the classes of both selectors in any literal. The two selectors of each pair belong to different parts (screens).
   - **0 pairs left for a hand judgement** (Slice 6 had 8).
   - **The 38 pairs in which one rule stays in `styles.css`** (listed as `SHAREDPAIR` in `order-report.txt`): the stay-behind rules are `.trip-warning` (a `p`), `.terrain-drawing`, `.terrain-drawing .icon` and `.tile-list`, `.tile-list th, td`, and the screen rules `.session-check*`, `.account-card*`, `.accounts-*`, `.camp*`, `.away-report-line*`, `.team-member*` now stand after them. Each pair is of two rules of two parts: `.trip-warning` is the warning sentence of Przejście and Mapy, `.terrain-drawing*` the drawing of the map in the world area (and the kitchen-sink page), `.tile-list` the table of tiles of Przejście; no `.ts`/`.tsx` file gives one element the classes of both sides (pair by pair, the script's judgement), and no element of the 24 recorded pages matches both.
   - **Dynamic evidence for all 6919 (2c): 0.** The pages of the 24 recorded states (13 of this slice, 11 of Przejście and Programy recorded for the purpose, the kitchen-sink page shared) were loaded into jsdom, state pseudo-classes and pseudo-elements left out of the selectors so the match is a superset; no element in any of them matches both selectors of any listed pair. (The hidden screens stand in the DOM, so Siedziba, Mapy and the rest are in every signed-in page; the screen Przejście stands only in its own states, which is why I recorded them too.)
3. **Moved rules and the kitchen-sink page: 0 selectors of the 442 selectors of the files moved so far (Slice 6's 296 and this slice's 146) match an element of the kitchen-sink page** (DOM recorded from the real page), and **0 have every class given an element by `kitchen-sink.tsx` or `kitchen-sink.css`.**
4. **What the recorded game pages do not exercise:** 127 of the 442 selectors match no element of any recorded game page (`UNMATCHED` lines of `order-report.txt`); 35 of them are of this slice's files: `.account-card-failure` (the failure panel, built when React has taken the card down), `.accounts-loading`, `.accounts-empty`, `.accounts-retry`, `.accounts-state.accounts-state-blocked` (no account blocked), the report on earning loops (`.away-report-list`, `.away-report-line`, `.away-report-line.danger`, `.away-report-full`), `.chest-list`, `.team-member-generation`, `.team-member-resurrection.danger`, `.team-member-loop`, `.team-member-stopped`, `.rehearsal-mark`, `.maps-list-solved`, `.maps-card-solved`, `.maps-card-sep`, `.maps-card-opened-by`, `.maps-card-note`, `.maps-card-warning`, `.maps-who-empty`, `.maps-who-run-note`, `.maps-who-resurrection.danger`, `.maps-who-loop`, `.maps-who-loop-start`, `.maps-who-loop-line`, `.maps-who-empty-loop`, `.character-screen-generation`, `.character-screen-resurrection.danger`, `.character-screen-loop`, `.character-screen-loop-line`, `.character-screen-stopped`, `.character-screen-skills-note`. They are covered by the script alone, not by the game.

### The real-game comparison

Before changing any file I started the game at the slice's base (`npm run local`, built at `581d09bb`) and recorded with Playwright CLI (not MCP) the computed style (all properties) of every element of the page and of its `::before` and `::after` that has content, keyed by the element's place in the tree with its classes (the recorder of Slice 6, `gen-driver7.mjs`). After the commit's tree I rebuilt, started again and recorded the same states. Viewport 1280 × 720; the account `compare@example.test` and a second, `other@example.test`, were made through the ordinary request; the document of the signed-in states was composed with the functions of the built simulation (`compose7.mjs`: one character, „Agent”, the verbs of combat in the Understanding, the branch „patrol” bought, a fixed save time) and sent by the ordinary save request.

- **Noise:** two recordings at the base, one after the other, differ in **0** values (`noise.txt`).
- **States (13 new, recorded):** the login card in „Zaloguj się” (`login-in`), „Załóż konto” (`login-register`) and „Nie pamiętam hasła” (`login-forgot`), each with its credits opened; Siedziba with a character, its camp and its credits opened (`headquarters`); Postać (`character`, `#/postac/1`); Mapy before a pick (`maps`) and with the card of „Skraj lasu” and its section „Kto idzie” (`maps-card`); Wiedza with a tree opened (`knowledge`); the list of accounts with the owner role given to the account by `node dist/server/account-role.js owner` (`accounts`) and with the confirmation of „Zablokuj” standing under a row (`accounts-confirm`, nothing sent); the waiting screen held by a request left pending (`waiting-held`) and refused by an aborted request, with „Spróbuj ponownie” (`waiting-refused`); the kitchen-sink page. In addition the 11 states of Slice 6 (Przejście ×7 and Programy ×4, composed with its `compose.mjs` and `gen-driver.mjs`), to see that moving rules out of `styles.css` leaves those screens as they were.
- **Result:** in each of the 12 game states of this slice, **8 differences, the same eight**: the eight new `<link>` elements of `html > head` (`link:9` … `link:16`) exist after and not before. In the 11 states of Slice 6, again exactly those eight links. **Every other element, every property, every `::before` and `::after` is identical** (one normalisation: the icon masks carry the address of their start, so `127.0.0.1:<port>` is read as the same). **In the kitchen-sink page: 0 differences.** The summaries are `diff-new-states.txt` and `diff-run6.txt` in the evidence directory.
- **States the local start did not reach in the game** (their rules covered by the script alone, as item 4 above): a blocked account, the failure panel of the card, an earning loop with its lines and the report on earning loops in Siedziba, a solved map, a character in a loop on Postać and Mapy, the generation line, the resurrection line not ready, the hover and focus states of the moved controls (the recording takes the page at rest; state pseudo-classes are not entered), and motion.

The kitchen-sink page was recorded from `node scripts/kitchen-sink.mjs --build-only` served by a small static server of mine (`serve-ks.mjs`, port 8765), because `npm run kitchen-sink` opens the default browser; it serves the same files.

### Own-work check (requirement most likely unmet)

*The requirement:* „the player sees each screen as before the split”, most at risk through the cascade (two rules of one element whose order flipped) and through a missing link. *The checks:* (a) the multiset and the comments (nothing lost), (b) the order pairs with static and DOM evidence, (c) the 24-state comparison in the real game, and (d) a break test of the comparison itself: with the `<link>` of `credits.css` taken out of the built `dist/public/index.html`, the recording of `login-in` and of `headquarters` differed from the good one in 1462 and 1476 values (the card's credits lose their rules), so the comparison would have noticed a missing file; the built `index.html` was then restored from a copy (`cmp` equal). *What it showed:* nothing is missing and no listed pair is carried by one element; the comparison is sensitive.

## Mismatches between the plan and the code, and choices the plan did not settle

1. **The camp's frames.** As the orchestrator's note says, the block `@media (prefers-reduced-motion: no-preference) { … }` in `run-screen.css`, whose selector list holds the scene's `.scene-mage-sprite img` and `.scene-fire[data-burning="true"] img` with the camp's `.camp-member img` and `.camp-fire img`, stays whole where Slice 6 put it. `headquarters.css` says so in its head comment (the camp's frames animation stands in the block of motion of `run-screen.css`; every stylesheet is linked on every page, so the camp moves as before). Verified in the real game by the identical computed styles of the camp's elements (the animation properties of `headquarters`).
2. **`.trip-warning` stays in `styles.css`.** A search of the class gives `end-window.tsx` and `run-header.tsx` (Przejście) and `maps-screen.tsx` (Mapy): two screens, no one part, so the shared file. The head comment of `styles.css` names it.
3. **`.rehearsal-mark` goes to `maps-screen.css`.** It stood among the rules of Siedziba (base line 1594, between `.team-member-stopped` and `.character-creation-label`), but `maps-screen.tsx:340` alone draws it (under „Wejdź” in „Kto idzie”; the `trip-lines.ts` function only builds its text). A rule goes to the file of the screen that draws it. **Consequence:** the first rule of `maps-screen.css` stood at base line 1594, before `.character-screen` (3019), so by the plan's rule of the order the file is linked before `character-screen.css`; the rules of Mapy and Postać changed their order (235 pairs of the list, judged above). Rejected: leaving `.rehearsal-mark` in `headquarters.css` (a rule of Mapy in the file of Siedziba, against D-421), and linking `maps-screen.css` after `character-screen.css` (departs from the plan's order). Cost if wrong: one rule moves, or one `<link>` swaps.
4. **The credits.** `credits.css` holds the six rules of the folded credits: the four naming `.account-card` and `.headquarters` (base lines 754–781) and `.credits`, `.credits a` (base lines 3002–3010, which stood after the table of tiles). The first rule of the file stood at base line 754, so it is linked after `account-card.css`, which holds the card's own rules, and the `.credits` rules moved up from line 3002 to follow the four; order inside the file is the base order.
5. **Rules whose classes no file draws: none.** A search of `src/browser/` for the class tokens first showed `accounts-state`, `accounts-state-blocked`, `away-report-line`, `team-member-resurrection`, `maps-who-resurrection`, `character-screen-resurrection` as drawn by no file; each is given to an element by a ternary string on a line that does not say „class” (`accounts-screen.tsx:187`, `headquarters.tsx:136,192`, `maps-screen.tsx:294`, `character-screen.tsx:103`), so the file of their screen draws them. `.account-card-failure` is drawn by `account-card.tsx:676` (`element.className`). Nothing is left without a drawer.
6. **Rules that reach shared controls under a screen's ancestor** (`.account-form .input-field`, `.account-form .form > .button`, `.account-form .input-field input`, `.account-card .credits li + li`): they name classes of the shared controls and of the card, and their subject is inside the card; they went to `account-card.css` (and `credits.css`). They do not reach an element of the kitchen-sink page (item 3 above, 0 selectors).
7. **Where the classes of two screens meet in one rule:** only `.screen.programs-screen, .screen.maps-screen, .screen.knowledge-areas` and its `@media`, which the plan keeps in `styles.css`. Nothing else reaches the classes of two screens and no shared part.
8. **The pointers inside comments are not updated** ("the rule above", "below", "(above)"): rules move whole with their comments, and Slice 8 holds the comments. Examples now pointing at a rule in another file: „Focus is the one :focus-visible rule above” (the Mapy and Wiedza comments), „as the columns of Programy (above)” and „as the columns of Mapy (above)” (the Mapy and Wiedza comments, whose columns stand in `styles.css`). The styleguide's sentences naming `src/browser/styles.css` for the scene's rules, the window's rules, the sizes and the times are Slice 8's too.
9. **The head comment of `styles.css`** now says what it holds: the base rules, the one `:focus-visible` rule, the header with the menu bar and the menu „Konto”, the rows of sentences, the place of the screens and their common layout, the shared controls with the icon mask and the forms, the rules of what the kitchen-sink page draws, `trip-warning`, and that the rules of each screen stand in its file, linked after. The head comments of the new files say what each holds and that the page links it after `styles.css`.
10. **The handoff's ranges of the decisions** (D-47 `4758-4772`, D-43 `4698-4712`, D-45 `4728-4742`) were used as the handoff gives them; the plan's older ranges differ. Nothing else in the plan differed from the code.

## Problems seen

- The first recording of `accounts-confirm` failed (`TimeoutError`): the button „Zablokuj” has the accessible name „Zablokuj: other@example.test” (an `aria-label`), not „Zablokuj”. I corrected the driver and recorded the two list-of-accounts states again against the same base; the second base recording was complete and equal to the first (0 differences).
- My first search for the classes a file draws missed the ones set in ternaries (see choice 5); the second search over every string literal found none missed that would make a pair open.
- Killing the static server of the kitchen-sink page with `pkill` did not work on Windows; I ended it by the process number found with `netstat` and `taskkill`.

## Reaches beyond the handoff

- `src/browser/view/*.tsx`, `src/browser/kitchen-sink/kitchen-sink.tsx`: read by search and by lines to find which file draws a class (the plan's rule for the place). Why: placement.
- `src/server/account-role.ts` (head of the file), `src/browser/account-api.ts` (the paths of the requests), `src/browser/view/screen-address.ts`, `src/browser/view/knowledge-screen.tsx`, `src/browser/view/account-card.tsx`, `src/browser/view/waiting-screen.tsx`: read in part by search, to drive the states (the owner role command, the request the waiting screen holds, the addresses of the screens, the names of the buttons). Why: the real-game comparison.
- `.claude/skills/loop2-play/compose-state.mjs`: read whole, adapted as `compose7.mjs` with a fixed save time so the two recordings agree.
- `tests/view/*.mjs` by `grep` for the files that read `styles.css` (none besides the helper reads a rule I moved). Why: the break risk of tests.
- `~/.claude` rules `the author's rules for writing scripts` and `git.md` (the user's instructions, hook-named), read before writing the scripts and before the commit.
- `guidelines/coding.md` and `guidelines/styleguide-browser-view.md` whole (the handoff names them).

## Unread material

- `.the-way/task-cycle/change/ui_check.md`: not read; the slice changes no look (the comparison shows none), so the step that names it did not come.
- `.runs/task-cycles/porzadki-widoku-po-react/task.md` itself: not opened; its passages were read as the handoff carries them word for word.
- Every other file, entry or passage the handoff names was read whole: `.the-way/task-cycle/change/SKILL.md` and `slice.md`; the Slice 6 report whole; D-265, D-47, D-43, D-28, D-45, D-32, D-417, D-420, D-421 at the handoff's ranges; the four invariants (`prettier-source-format`, `browser-view-token-values`, `browser-view-focus-outline`, `application-build-kitchen-sink`) and `part_map.md:3-28`; `guidelines/coding.md`, `guidelines/styleguide-browser-view.md`, `src/browser/AGENTS.md`, `.claude/skills/loop2-play/SKILL.md`; `scripts/static-files.mjs`, `src/browser/kitchen-sink/index.html`; `tests/view/game-stylesheets.mjs`; `src/browser/styles.css`, `index.html` and the head of each of the three Slice 6 files before the change.

## Searches not found or unclear

- A comment that names the part of a rule I had to place without a drawer: **none needed**, every rule has a drawer (choice 5).
- Whether the order of the files should follow the first rule of each file when one rule (`.rehearsal-mark`) stood far from its screen's other rules (choice 3): the plan's wording „the order in which their first rule stood” was followed to the letter; unclear whether the author meant the first rule of the screen proper. The cost is one swapped `<link>`.
- Where `.trip-warning` should live if a later screen draws it too: stays shared.

## Working copies

- `.runs\slice-7-executor\` (scripts, composed documents, recordings of about 15 MB each, logs, the copies of the four base stylesheets): **removed** before I returned. What the report needs stays in `.runs\task-cycles\porzadki-widoku-po-react\reports\slice-7-executor-evidence\` (ignored by git; scripts are not part of the change): `order-check7.mjs`, `split7.mjs`, `heads7.json.mjs`, `compose7.mjs`, `gen-driver7.mjs`, `gen-driver-run6.mjs` (the driver of Slice 6's states, copied), `record-all7.sh`, `record-accounts.sh`, `serve-ks.mjs`, `compare-styles.mjs`, `place.mjs`, `comments-check.mjs`, `sanity.mjs`, `before/` (the four stylesheets at `581d09bb`), `order-report.txt` (the full output of the order script with the 38 shared pairs and the 127 unmatched selectors), `diff-new-states.txt`, `diff-run6.txt`, `noise.txt`, `diff-break.txt`, `place-*.txt` (each unit of the new files and of the old `styles.css` with the files that draw its classes), `foundation-check.log`.
- `.playwright-cli\` (the CLI's own session files): **removed**.
- The local start (`npm run local:stop`, "Local starts stopped: 1") and the static server of the kitchen-sink page were stopped. `dist/` and `.runs/local-start/` are products of the game's own tools and stay. `git status` is clean.
