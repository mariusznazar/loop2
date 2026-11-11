PASS c7f2aa7b931e3aa1931b86b964e68c2cd08c19cb

# Review of the whole change — spokojniejszy-wyglad

Range `3b7e4930..c7f2aa7b` (four commits: `9e1bc608`, `4e0c06b2`, `80bd62d1`, `c7f2aa7b`), one author
without a plan, no spec, no slices. `git rev-parse HEAD` in the worktree gave `c7f2aa7b931e…`, the head
of the handoff. Method: `.the-way/task-cycle/review/SKILL.md` and `whole_change.md` at the pinned
`52f8164a`.

## Findings

### Critical

none

### Important

none

No blocking finding, so no slice to name; the change is the one author's work.

### Minor (all within the task; for the findings file of the fix)

**M1. The colour of the map's icons has no test, though one is cheap — and the author's reason for
leaving it is wrong.**
Place: `src/browser/styles.css:1896` (`.terrain-drawing .icon { color: var(--text-strong) }`),
`tests/view/world-area.test.mjs:719`.
What is wrong: settlement row 1, D-40 and D-43 put the icons of the drawing of the map in
`text-strong`; only this one stylesheet rule makes that true. Removing it makes the icons inherit the
colour of the panel around the drawing, `text` — exactly the variant D-40's *Verification* lists under
*violates* ("an icon of the drawing of the map written in `text`") — and no test fails (the author's
own mutation list says so). The author says it cannot be tested because "jsdom applies no
stylesheet"; that is not so here: `tests/view/scene.test.mjs:330` (`computed`) already lays the real
`src/browser/styles.css` on the jsdom page and reads computed values from it.
Evidence: a scratch script (outside the repository, with `startMemoryLimit` first, as
`guidelines/testing.md` "Tests on a document imitation" asks) built the drawing's markup on jsdom with
the real stylesheet and read `color: "var(--text-strong)"` on the `foreignObject` and on its
`.icon-mask`, and `opacity: "var(--depleted)"` on the dimmed one. A case in `world-area.test.mjs`
using the same helper would fail when the rule goes.
Why it matters: a later stylesheet edit can darken the map's icons, against a settled decision, with
no signal. Grade Minor: the effect on the player would be icons at 3.27:1 instead of 4.39:1, still
legible (D-40's own words), and D-88 keeps rendering under manual checks.

**M2. D-27's *Rationale* gives no reason for the place chosen on Siedziba.**
Place: `foundations/decisions.md:683-689` (D-27 *Rationale*).
What is wrong: row 3 of *Settlements to record* and the answer to question 3 put the section "na samym
dole Siedziby, jako ostatnia część ekranu, … tak jak w starej Loop". The entry carries the place in its
binding sentence and the two rejected placements, and as accepted cost the scroll down Siedziba, but
nowhere says why the bottom — as in the predecessor game, loop, which the definition takes as the
starting point and minimum of the views.
Why it matters: a reader weighing a move of the section (task 21 brings the camp to the top of
Siedziba) sees what was rejected but not the reason the bottom won. Source fidelity: a reason the
source gives is dropped, nothing invented.

**M3. D-27 *Rejected* keeps half of the reason the source gives for "under the heading".**
Place: `foundations/decisions.md:693-694`.
What is wrong: the entry reads "the section on Siedziba under its heading — the first thing on the main
screen of the game would be the credits". The task's question 3, *Not chosen* B, reads: "pierwszą
rzeczą na głównym ekranie gry staje się podpis wzmianek, a ekran odchodzi od starej Loop bez zysku dla
gracza." The second half is dropped. The decision template asks that each way not chosen keep "the
cost or the reason kept beside it" (`.the-way/elements/decisions/template.md:69-74`). Goes with M2: the
same missing reason (the predecessor game).

**M4. D-262's first sentence changed beyond row 2 — name it in the request.**
Place: `foundations/decisions.md:5428`.
What is wrong: row 2 and *Decisions in play* change "with the header and the footer" to "with the
header" and take the footer out of the rationale, the rejection and the *Verification* example. The
change also rewrites the first binding sentence, "neither header nor footer" → "not even the header".
The meaning is the same (nothing but the card stands), and the footer no longer exists, so the edit is
sound; but it is not carried whole by an accepted row, so the human accepts it at the merge (template:
"A human accepts the changed meaning by merging the request …, unless the change was written whole from
an accepted row"). Fix: the request's description names this sentence as the cycle's edit beyond row 2
(the author's report, choice 6, already does).

**M5. The kitchen-sink page puts a `div` inside a `span`.**
Place: `src/browser/kitchen-sink/kitchen-sink.ts:582` (`iconMask` creates a `div`) and `:612`, appended
into the `span` of `roleSample` (`:590`).
What is wrong: a block element inside a phrasing element; the game itself draws a mask beside text as a
`span` (`maps-screen.tsx`, `tile-table.tsx`, `trip-plan.tsx`) and as a `div` only inside the
`foreignObject` of the drawing. Browsers render it (the author saw the page), so this is polish: a
`span` here, or the helper taking the tag, matches the game.

### Out of scope

none

## The task, item by item

- To do 1 — no footer anywhere: `app.ts` builds header and main only; no `footer` remains in `src/`,
  `tests/`, `guidelines/`, `README.md`, `.claude/` (git grep at the head). Waiting screens have the
  header alone and no `details`: `tests/view/account-screen.test.mjs:4930` asserts it at the check,
  after sign-in and over the game. Met.
- To do 2 — folded „Autorzy grafiki” last on Siedziba, the login card's content: `headquarters.tsx`
  renders `CreditsSection` last in `.headquarters`, which is the whole Siedziba screen
  (`game-view.ts:408-411`); `tests/view/headquarters-screen.test.mjs:510` asserts last child, one
  section, folded, kept open across updates. No pack rows were in the footer at the base (`footer.ts`
  took its lines from `WITH_ICONS` alone), so nothing to move. Met.
- To do 3 — card's section unchanged: `credits-section.tsx` changes only its import and comment; the
  card's CSS values unchanged (selectors joined). Met.
- To do 4 — card of a map, headings of the table of revealed tiles, trip-plan line drawn as masks in
  the colour of the text beside them: `maps-screen.tsx`, `tile-table.tsx`, `trip-plan.tsx`; tests in
  `maps-screen.test.mjs`, `world-area.test.mjs`, `trip-plan.test.mjs`. Met.
- To do 5 — drawing of the map (resources, campfire burning and extinguished) as masks in
  `text-strong`, stock 0 dimmed by `depleted`: `terrain-drawing.tsx` `Icon` serves both;
  `styles.css:1896-1908`. Met; colour unprotected by a test (M1).
- To do 6 — badge unchanged apart from the class name. Met.
- To do 7 — kitchen-sink samples drawn as the game draws them, depleted sample included. Met (M5).
- To do 8 — D-27, D-43, `icon-credits` in the projected wording, D-27 with row 3, D-43 with question 1,
  D-40 and D-262 with questions 1 and 2; invariant test no longer looks for the footer. Met; checked
  against the task's quotations word for word: D-27's binding sentence and the projected rationale and
  rejection, D-43's projected binding clause, rationale and rejection, `icon-credits` verbatim, D-40's
  added sentence and accepted cost, D-262's three edits. Fidelity gaps M2, M3; extra edit M4.
- To do 9 — D-47's example and rejection speak of the links of the folded section. Met.
- To do 10 — the styleguide's three edits (token rule, Visible focus Good, `text-strong` row). Met.
- Settlement rows 1–3 — written into D-43 and D-40 (row 1), D-262 (row 2), D-27 (row 3), each *Rejected*
  holding the ways not chosen that its source keeps (row 1: B in D-40 and D-43, C in D-43; row 2: B in
  D-262; row 3: under the heading, under the chest), no derived way added. *Origin* rightly not given
  the task document (template § Origin).

## Judged on the handoff's points

- **`foreignObject` holding the mask — a choice the foundation should hold?** No. D-43 settles that every
  icon is a mask and which colour it takes; how the SVG drawing hosts that mask is a way of making it.
  D-19 (the drawing is a picture, hover only) holds: the hover test dispatches on the mask
  (`world-area.test.mjs`) and `closest("[data-tile]")` crosses the `foreignObject`. D-88 keeps SVG
  rendering under manual checks. The foundation declares no set of browsers (D-19's *Verification*
  says the repository declares no real browser), so cross-browser rendering is no settled requirement
  either; I checked it anyway (see Checks): Chromium and Firefox draw the masks in place, scaled and
  unscaled; WebKit could not be run.
- **Rename `footer.ts` → `credit-lines.ts`, row `copy`:** sound. A module named after a footer that no
  longer exists would mislead; the module is now a pure function like other `copy` rows
  (`now-lines.ts`, `map-lines.ts`); the part map's glob covers it (`foundation_check.py` 0 errors).
- **Rename `action-icon` → `icon-mask`:** sound and complete — no `action-icon` remains in the tree;
  both forms of the pick cell change together and `react-controls.test.mjs` compares them (D-265).
- **Comment edits in `src/browser/sim/data/*.ts` and `README.md`:** accurate; comments only.
- **D-262's first sentence and *Verification*:** M4.
- **Entries written whole:** see To do 8.
- **Changed tests:** each removal reads the footer, which the task removes (`guidelines/testing.md`
  "Changing an existing test": the reason is the requirement). The footer's link test has its twin for
  the section (`icons.test.mjs:299`). The narrowing in `headquarters-screen.test.mjs` (links and words
  outside the `details`) states its reason; the section's own tests cover what it holds. Changed
  invariant test: `tests/invariants/test_icon_credits.py` (invariant `icon-credits`), its controls
  still flag each missing part; it passes at the head.
- **Own-work claim (map icon colour unprotected):** the claim that it is unprotected is true; the
  reason given is not (M1).

## Declined to judge

none

## Checks run

| Check | Result |
|---|---|
| `git rev-parse HEAD` | `c7f2aa7b931e3aa1931b86b964e68c2cd08c19cb`, as the handoff gives |
| `git -C .the-way rev-parse HEAD` vs `git ls-files --stage -- .the-way` | both `52f8164a…` |
| `git diff --numstat` of the range: no file under `assets/icons/**`, `assets/fonts/**`, `assets/sprites/**`; no screenshot file | confirmed |
| `npm run typecheck` | exit 0 |
| `npm run build` | exit 0 |
| `node --test` on `tests/view/{icons,headquarters-screen,account-screen,world-area,maps-screen,trip-plan,react-controls,rule-editor,scene}.test.mjs` | exit 0, 380 tests, 380 pass |
| `npm test -- tests/invariants/test_icon_credits.py` | exit 0 |
| `npm test -- tests/invariants/test_terrain_drawing_numbers.py` | exit 0 |
| `npm test -- tests/invariants/test_browser_view_token_values.py` | exit 0 |
| `npm test -- tests/invariants/test_browser_view_focus_outline.py` | exit 0 |
| `npm test -- tests/invariants/test_application_build_kitchen_sink.py` | exit 0 |
| `npm test -- tests/invariants/test_content_identifiers.py` | exit 0 |
| `npm test -- tests/invariants/test_cross_part_imports.py` | exit 0 |
| `npm test -- tests/invariants/test_icon_file_content.py` | exit 0 |
| `python -B .the-way/elements/common/foundation_check.py` | exit 0, "0 errors" |
| `npx --no-install prettier --no-config --no-editorconfig --check` on the changed `.ts/.tsx/.mjs/.css` | exit 0 |
| `npx --no-install eslint` on the changed `.ts/.tsx/.mjs` | exit 0 |
| `git status --short` after all checks | empty (only ignored `dist/` rebuilt) |
| Manual: a scratch page (outside the repository) reproducing the drawing — `svg` with a negative `viewBox` origin, `foreignObject` per icon holding a `div.icon-mask` with the game's mask rules, one dimmed, a red reference square at each place — rendered at full size and scaled down, through Playwright | Chromium 156 and Firefox 151: each mask fills its reference square, dimmed one at the opacity, at both sizes |
| Manual: the same page in WebKit | not run — the installed WebKit build (2311) refuses the installed Playwright (needs 2368): "Unknown setting: PushAPIEnabled"; WebKit (Safari) rendering of HTML with a CSS mask inside a scaled `foreignObject` stays unverified |
| Manual: jsdom with the real stylesheet (M1) | computed `color` of the map icon `var(--text-strong)`, dimmed `opacity` `var(--depleted)` |

Not run: the full `npm test` (the orchestrator's run, handoff); `tests/quality/test_quality_invariants.py`
as a whole (prettier and eslint run on the changed files instead); the running game in a browser (the
author's check covers Chromium; mine covers the drawing's markup in Chromium and Firefox, not the
whole screens).

## Reaches beyond the dispatch

- `.the-way/elements/decisions/template.md` (whole): to judge *Origin* (no task document) and the
  rule for *Rejected* from a settlement row (M3).
- `.the-way/project-level/technology/reserved_choices.md` (whole): section 2 of the method; no reserved
  choice taken.
- `.the-way/task-cycle/change/ui_check.md` (whole) and a search of `request_template.md` for
  "screenshot": to judge the author's screenshot evidence; the author inspected screens and kept none,
  which the method allows; whether the request shows any is the cycle's choice (question 1).
- `tests/view/scene.test.mjs:320-345` and `tests/view/memory-limit.mjs`: for M1.
- `src/browser/view/game-view.ts:400-411`: that `.headquarters` is the whole Siedziba screen.
- Glossary entries `headquarters`, `extinguished campfire`, `trip plan`.

## Unread material

Decisions of my selection: 333 found by *Scope* (browser-view, simulation, build-tools, agent-workflow,
product-foundation); read whole 40 — D-19, D-27, D-32, D-36, D-38, D-39, D-40, D-41, D-42, D-43, D-45,
D-46, D-47, D-48, D-70, D-72, D-87, D-88, D-96, D-125, D-148, D-180, D-184, D-262, D-265, D-269, D-271,
D-275, D-278, D-279, D-280, D-282, D-287, D-291, D-320, D-323, D-327, D-334, D-335, D-357; by title only
293. Every decision of the selection was run through by title; a search of the log for "footer",
"credit", "icon", "mask", "foreignObject" and "Siedziba|headquarters" located the ones above. Decisions
that bear on the change and stayed unread: none known.

- Invariants: of those whose *Part* names a touched part or `every` (about ninety), read whole 16 —
  `browser-view-framework`, `content-identifiers`, `icon-file-content`, `icon-credits`,
  `loop2-container-icons`, `terrain-drawing-numbers`, `eslint-source-rules`, `prettier-source-format`,
  `browser-view-token-values`, `browser-view-focus-outline`, `design-token-contrast`,
  `design-token-sources`, `application-build-kitchen-sink`, `uncaught-failure-game-state`,
  `cross-part-imports`, `tracked-file-private-paths`; the rest by title only (account server,
  simulation rules, deployment), none reached by the change.
- Part map: read whole. Glossary of the product: the three entries above; the glossary of the-way at
  the pinned commit: not read.
- Guidelines read whole: `guidelines/coding.md`, `guidelines/coding-browser-module.md`,
  `guidelines/coding-content-data.md`, `guidelines/styleguide-browser-view.md`, `guidelines/testing.md`.
  Not opened: `.the-way/product-guidelines/template.md` and the styleguide and coding templates for
  WAY-170 — the change edits prose inside existing rules and one table row and leaves every rule's
  fields and order as they were.
- `definicja_mvp2_loop2.md` (outside the repository): not read; fidelity of D-27, D-40, D-43 and
  `icon-credits` was checked against the passages the task quotes.

## Searches not found or unclear

- A declared set of browsers the game must render in: not found in the foundation (D-19 says the
  repository declares none); so WebKit rendering is unverified rather than required.
- A Playwright build matching the installed WebKit: not found (installed WebKit 2311, Playwright needs
  2368).

## Questions

1. The change alters what Siedziba, the card of a map, the table of revealed tiles, the trip-plan line
   and the drawing of the map show, and D-357 settles a place for screenshots; the author kept none and
   so did I (I push nothing). Should the request show screenshots of Siedziba with the folded section
   and of the drawing of the map? Recommended: yes, one of each, taken by the orchestrator's route of
   D-357, since the human accepts the look from the description.
2. Should the fix of M1 add the colour case, or should M1 be left for review under D-88? Recommended:
   add it — one case with the existing `computed` helper, and a settled colour gets a check.
