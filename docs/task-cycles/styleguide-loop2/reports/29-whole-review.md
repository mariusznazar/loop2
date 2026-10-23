PASS b33aa2761e00fef538c569dc5860ecef4dd28e62

# Review 29 — the whole change of "Styleguide loop2"

- **Reviewed:** the whole change, range `00e53aee5bd21692ddd3b2f7c7541625a3114a3f..b33aa2761e00fef538c569dc5860ecef4dd28e62`
  (11 commits: foundation entries `19d0116`, slice 1 `5ef77fc` and its fix `d190e10`, slices 2–9
  `396895f`, `fc4fc91`, `74ec732`, `4c892df`, `b4658ac`, `7d6b39f`, `73b0563`, `b33aa27`; 49 files,
  +3363/−261). `git rev-parse HEAD` in the worktree = the head given; worktree clean before and after.
- **Method:** project skill `the-way-review-change` → `.the-way/task-cycle/review/SKILL.md` at the pin
  `f0b2130` (gitlink and `git -C .the-way rev-parse HEAD` agree), sections 1–3, 5 and 6.
- **Reviewer:** fresh agent, claude-opus-5-5; made none of the change; no subagent.
- **Counts:** blocking 0 · Minor 30 · out of scope 2 · fixed since their slice review 3 (S1-M4, S1-M5,
  S2-M1).

## Read

Handoff 29 whole; frozen `task.md`; `spec.md` (Decision 8a included); `plan.md`; `plan-size.md` not
needed beyond the record; `cycle.md` whole (questions table QA-1..QA-4, R1, R-n1, R-n2, Q-P1..Q-P4,
FE-1..FE-5, S1-I1, S2-1..S2-3; *Slices*; *Events*); the slice reviews 09, 12, 14, 16, 18, 20, 22, 24,
26, 28 whole. `AGENTS.md`, `src/browser/AGENTS.md`; `.the-way/product-guidelines/reading.md`;
"Reading the foundation" of `.the-way/elements/common/way_of_working.md`;
`.the-way/product-guidelines/styleguide/template.md` whole. Guidelines selected for the parts the
range touches (browser-view, build-tools, deployment, product-foundation, agent-workflow):
`guidelines/styleguide-browser-view.md` whole, `guidelines/coding.md` (its changed section and kind
index), `guidelines/coding-browser-module.md` (the controls and the three screens are of that kind).
Foundation: the whole foundation diff of the range (D-28 changed, D-38..D-47, five invariants, six
facts, part map lines), invariants `application-build-output`, `content-identifiers`,
`browser-view-framework`. Code: every changed file of the range at the head — `tokens.css`,
`styles.css`, `index.html`, the four control modules, the three screens' diffs, `terrain-panel.ts`
whole, `terrain-picture.ts` (head), the three kitchen-sink files whole, `scripts/kitchen-sink.mjs`,
`scripts/static-files.mjs`, `scripts/build.mjs`, the configuration and Docker lines, `README.md`
diff, the five new invariant tests (token values, focus outline, kitchen-sink build whole; contrast
and sources in their readings and controls), the diffs of `test_application_build_output.py` and
`tests/view/icons.test.mjs`. Screenshots viewed: `reports/shots/slice8/s8-01-kitchen-sink-1440.png`
(the head's page — slice 9 changed no file of it), `reports/shots/slice6/s6-07-run-status-row.png`.

## Against the whole task

| Task requires | Where at the head | Met |
|---|---|---|
| To do 1 — styleguide from the template, 23 roles with Q18 kinds and Q3/Q4/Q7/Q19 meanings, `text` on the three backgrounds, no test cases of rules | `guidelines/styleguide-browser-view.md` — nine required rules and two examples in the template's order, each rule with *Decision*, *Invariant*, *Good*, *Bad*; Roles table 23 rows, kinds = Q18 + Q19 C; no value, no fenced code | yes |
| To do 2 — token file, every value with its source | `src/browser/tokens.css` — 23 roles + 25 values + four `@font-face`; each value compared by me with Q9, Q10, Q11, Q19 C: all equal; sources as To do 2 and spec Decision 1 give them | yes |
| To do 3 — every style on the roles, dark theme on loop2's layout, no value in place of a token | `src/browser/styles.css`; `index.html` without `<style>`; test of row 11 passes and fails on a planted `#ff6467` (check 7) | yes |
| To do 4 — six controls in `src/browser/view/controls/`, three screens moved, three destructive buttons | four modules (C5); `program-editor.ts:343`, `status-row.ts:48-49` `kind: "destructive"`; no button, select or input made outside `controls/` (slice-6 grep, unchanged since) | yes |
| To do 5 — terrain per Q10, icon colour `#f4f4f5`, credit text | `styles.css:206-241`, `terrain-panel.ts` hover line; icons and `credits.ts:12`; row line renders 1.33 px (Minor S4-m2) | yes |
| To do 6 — Geist and Geist Mono with OFL 1.1, copied as icons, Geist Mono for the clock | `assets/fonts/` (release v1.8.2 bytes, slice 2), `scripts/static-files.mjs`, `styles.css:185-190`; the image built from the head serves all five files byte-identical (check 9) | yes |
| To do 7 — kitchen-sink: every control × 7 states or reason, every colour role, tile samples drawn with roles, own command, not in `npm run build` | `src/browser/kitchen-sink/`, `npm run kitchen-sink`; screenshot s8-01; test of row 15 passes | yes |
| To do 8 — five invariant tests in `npm test`, text search or token-file read | `tests/invariants/test_browser_view_token_values.py`, `…_focus_outline.py`, `test_design_token_contrast.py`, `test_design_token_sources.py`, `test_application_build_kitchen_sink.py`; each passes on the head and fails on a planted break (check 7) | yes |
| To do 9 — part map: new files to their parts, font trust boundary, External context row | `foundations/part_map.md` lines; `foundation_check.py` 0 errors | yes |
| To do 10 — pointer outside the installer block; the rule where the skill places it, guarded by the invariant, no command | `AGENTS.md:8`, `:10`; `src/browser/AGENTS.md` | yes |
| *Settlements to record* rows 1–20 | D-38 (1), D-39 (2), D-40 (3), D-41 (4), D-42 (5), D-43 (6), D-44 (7), D-45 (8), D-46 (9), D-28 changed in place (10), invariants `browser-view-token-values`, `browser-view-focus-outline`, `design-token-contrast`, `design-token-sources`, `application-build-kitchen-sink` (11–15), facts `wcag-text-contrast`, `wcag-non-text-contrast`, `wcag-focus-visible` (16–18), `geist-licence` (19), D-47 (20) | yes — wording points under Minor |
| Spec and plan additions: QA-4 fact, `css-colour-values` (FE-2), part-map lines | `wcag-contrast-ratio`, `css-colour-values`; browser-view, build-tools, agent-workflow lines and the External context row | yes |
| Fidelity to the task's sources | values and sources of `tokens.css` against Q9–Q11, Q19 C; meanings of D-39..D-41 and the Roles table against Q3, Q4, Q7, Q12, Q19; WCAG passages verified by the slice-1 review against the downloaded text; nothing invented that a source does not carry, except the wording points S1-M3 and S4-m3 below | yes |

The changed invariant test `tests/invariants/test_application_build_output.py` (invariant
`application-build-output`) is named here: it leaves `src/browser/kitchen-sink/` out of the browser
configuration's source (`LEFT_OUT`), as spec Decision 4 mandates; the invariant's sentence is
unchanged, and the slice-7 review showed the test still fails without the filter.

Trust boundaries (step-4 answers): `assets/icons/**` and `assets/fonts/**` are unchanged since their
slice reviews (`git diff --stat 4c892df b33aa27 -- assets/` and `396895f b33aa27 -- assets/fonts …`
empty); each icon holds only the SVG namespace URL, no `href`, `script` or `url(`.
`scripts/kitchen-sink.mjs` is unchanged since slice 8; I probed it again at the head (check 8):
listening on `127.0.0.1` only, path climbing in eight encodings and `/.git/HEAD` 404. No irreversible
operation.

## Findings

### Critical

None.

### Important

None.

### Minor

Each finding carried from a slice review keeps its id; its grade here is mine. "Open" means the
defect stands at the head.

Foundation and styleguide text (all for the return step, cycle step 11):

1. **S1-M1 — open.** `foundations/decisions.md`, D-39 binding sentence: "`warning` means caution,
   that something will not be carried out or is not saved". The decisions template forbids *will*
   in binding sentences (WAY-05). Meaning is clear; wording only. Fix: "is not carried out".
2. **S1-M2 — open.** `foundations/invariants.md`, `browser-view-focus-outline`: "declared only in
   rules whose selector is `:focus-visible`" and then "only the rule of …kitchen-sink.css has one
   more selector beside `:focus-visible`" — read literally the first clause forbids the kitchen-sink
   rule the last one allows. The test follows spec Decision 8 row 12 (the clean form), so code and
   test agree; the sentence does not. Fix: the spec's wording.
3. **S1-M3 — open.** `guidelines/styleguide-browser-view.md:84-87` (each other value a property
   "nazwaną po tym, do czego służy") and `:105-106` (Geist for game text, Geist Mono for the
   chronicle and clock) are choices no decision carries; D-46 names the fonts, not where each is
   used. A later screen that departs breaks a styleguide sentence with no decision to change.
   Also "krycie" at `:86` has no member besides the role `depleted`. Fix: Geist Mono placement into
   D-46 (Q11 carries it) or the sentences under *Examples*.
4. **S1-M6 — open.** `design-token-sources` says the comment follows "on the line of the `;`"; the
   spec and the styleguide (`:220`) say *directly* after it. The test (`tests/invariants/test_design_token_sources.py`)
   requires "directly" (its control "text between the `;` and the comment" is flagged); the sentence
   is looser than its test.
5. **S1-M7 — open.** D-43 *Verification*, complies: "a gap of the stylesheet written as
   `var(--space-8)`" — no such token exists; the spacing steps are `--space-2xs` … `--space-2xl`
   (`src/browser/tokens.css:60-66`). A reader looking for the example finds nothing.
6. **S4-m6 — open.** `tests/invariants/test_browser_view_token_values.py:122-126` decides what is a
   font name from the generic families of CSS Fonts 4 § 2.1.5 and the CSS-wide keywords of CSS
   Cascade 5 § 7.3, cited with URL and date in the test only; the invariant *Rests on* names only
   `css-colour-values`. By cycle step 11 a source outside the product that a check rests on is an
   environment fact. Return step: one fact for both lists, cited in *Rests on*.

User interface:

7. **S4-m1 — open.** `src/browser/view/terrain-panel.ts:80-82` keeps the points of every tile, hidden
   ones included, so hovering an unrevealed tile draws the white `link-highlight` line although that
   tile has no row (`tile-list.ts` lists revealed tiles only). D-41 gives the role one meaning — this
   tile and this row are the same place — so the line on a hidden tile promises a link that does not
   exist. Graded Minor by effect: transient, nothing wrong is done, and the base also marked hidden
   tiles on hover. One-line fix: keep only revealed tiles in `tilePoints`.
8. **S4-m2 — open.** The row's line renders 1.33 px (`styles.css:268`, table-cell border rounding),
   the tile's 1.5 px. Same colour, same link; a third of a pixel.
9. **S4-m3 — partly fixed.** Buttons now take `--font-size-detail` (12 px, slice 6). Still: the
   column heads of the tile list in `text-label` at the body's 13 px (`styles.css:255-259`), where
   Q11 and the token's own source give 11 px for labels — while the kitchen-sink's column heads use
   11 px (`kitchen-sink.css:57-62`), so the page and the game differ; the character's name
   (`.send-character`, `styles.css:172-175`) at 13 px where Q11 gives 14 px for names.
   `--font-size-map-title` and `--bar-width` are unused (loop2 has neither yet).
10. **S4-m4 — open.** The 1.5 px hover line drawn last over the 2 px dashed step target hides the
    yellow dashes while that tile is hovered (`terrain-panel.ts:65-71`). Transient.
11. **S6-m1 — open, now visible on the kitchen-sink.** A disabled empty field keeps its hint in
    `text-label` and its `control-border` frame (`styles.css:108-113`, `:128-130`), and a disabled
    selected button keeps its `selected` frame (`styles.css:97-100`): both look usable. No screen
    disables a control today (1.4.11 exempts inactive components, so no WCAG point).
12. **S6-m2 — open.** `.input-field` is an `inline-flex` column (`styles.css:121-125`): an error
    message widens its field and reflows a rule row. No screen sets an error today.
13. **S6-m3 — open.** A disabled control keeps `control-border`, whose meaning (D-40) is "this can be
    clicked or typed into". Tension between D-40's wording and Q12's state list ("wyłączony (tekst
    wyłączony)"); for the return step or the human.
14. **S6-m4 — open.** The program editor's number field has no hint (`program-editor.ts:331-336`), so
    its empty state (Q12: "puste pole z podpowiedzią") shows a blank field for the moment before
    `change` reverts it.
15. **S5 declined, graded here — `README.md:52` „gruby bursztynowy obrys na kafelku postaci”.** The
    word came from the base, when the outline was the orange `#e3a008`; the change made it
    `--character` `#ffd230`, which Q3 and Q9 call yellow (the colour of `discovery`). The README
    paragraph describes the look the change redrew; a reader expects orange. Fix: „żółty”.

Tests:

16. **S2-M2 — open.** No test of `npm test` fails if the build stops copying the fonts
    (`scripts/static-files.mjs:13-20`); D-46 *Verification* is review-only and the spec makes a
    container font check a non-goal. I checked by hand that the head's image serves them (check 9).
17. **S3-m1 — open.** `test_design_token_contrast.py` builds its pairs and its controls from the same
    tuples, so dropping a role from `TEXT_ROLES` passes everything; no control pins the 36 pairs.
18. **S3-m2 — open.** `test_design_token_sources.py:130` checks `startswith("Source:")`, but no
    control has a comment holding `Source:` later in its text, so a mutation to `in` survives.
19. **S4-m5 — open.** The population control of the row-11 test
    (`test_browser_view_token_values.py:536-544`) does not name `src/browser/styles.css`, the file
    holding nearly every value it guards (the focus test's control does cover `src/browser/*.css`).
20. **S4-m7 — open.** Known gaps, documented in the docstrings: SVG presentation attributes in HTML,
    `color-mix()`, `outline-width: 0` inside the one allowed rule, an outline from TypeScript.
21. **S5-m1 — open.** `tests/view/icons.test.mjs:86-87` pins `#f4f4f5` as a literal; a later change of
    `--text-strong` leaves the icons stale with every test green — the drift D-43 asks to fix by hand.
22. **S8-M1 — open.** `kitchen-sink.css` carries no marker, so a build copying it into `dist/public/`
    passes the row-15 test; `README.md`'s sentence that it stays out is kept by review alone.
23. **S8-M2 — open.** The row-15 test's "writes nothing outside `dist/kitchen-sink/`" sees files only,
    not empty directories or writes through the `node_modules` junction.
24. **New — the row-11 test flags the Polish word „Menu” in any TypeScript string.**
    `test_browser_view_token_values.py:111-119` counts the deprecated system colour `Menu` as a whole
    word in every string literal (FE-2). Evidence: a kitchen-sink select list labelled `"Menu"` in a
    scratch worktree — test exit 1 (check 7). Q11 already names loop's menu, so a later screen's
    label or `aria-label` „Menu” fails `npm test` with no colour in sight; the author must rename the
    label or change the test. Friction for later tasks, not a defect today.

Kitchen-sink page:

25. **S7-m1 — open.** `kitchen-sink.ts:350-362`: the linked-row sample has fixed numbers
    `["12", "8", "6", "6"]` cut to the icon count and no column heads; a fifth resource leaves it one
    cell short.
26. **S7-m2 — open, widened.** `kitchen-sink.ts:311-326` copies the icon placement of
    `terrain-picture.ts:55-62`, and `kitchen-sink.ts:22` copies its tile radius (`TILE_SIZE = 24`,
    the default `size = 24` of `terrainPicture`). When the game's drawing changes, the samples keep
    the old one silently.
27. **S7-m3 — open.** `kitchen-sink.ts:420` states game behaviour („w grze zapas zasobu nie spada
    dziś do zera”) that becomes false unseen when gathering lands.

Instruction files:

28. **S9-m1 — open.** `src/browser/AGENTS.md:5` names only `src/browser/styles.css` as the place for a
    class; for the kitchen-sink page it is `kitchen-sink.css` (spec Decision 4, R-n2), so the rule
    taken literally puts page-only CSS into what ships.
29. **S9-m2 — open.** `src/browser/AGENTS.md:5` restates D-43's list; three texts to change together
    when D-43 changes (To do 10 mandates some restating).
30. **S9-m3 — open.** `src/browser/AGENTS.md:9` covers a new value only; the styleguide's "Every value
    with its source" binds a changed one too.

### Fixed since their slice review

- **S1-M4** — fixed with I1 in `d190e10` (review 12).
- **S1-M5** — the five invariants read `Method: test`; each now has its test in the range, and each
  test cites its invariant (`# invariant: <id>`) and runs in `npm test`.
- **S2-M1** — `README.md:11` now says „arkuszy stylów leżących bezpośrednio w `src/browser/`”
  (slice 8).

### Out of scope

- **S3-o1** — six roles in no pair (`divider`, `selected`, `text-disabled`, `tile-edge`,
  `link-highlight`, `depleted`) are not required by any test to be declared; an undeclared one makes
  `var(--…)` fall back silently. Beyond the task: the five invariants of Q16/Q22 do not ask it. All 23
  are declared today. Minor in grade.
- **S8, whole-change note — `scripts/kitchen-sink.mjs:36` answers any `Host` header** (DNS
  rebinding). Beyond the task: spec Decision 6 and QA-3 bound the boundary to loopback and
  `dist/kitchen-sink/`, both held (check 8); the server runs only on the developer's demand and serves
  only the repository's public page, styles, fonts, icons and compiled modules, nothing secret and
  nothing writable. Minor in grade.

## Declined to judge

- Unrevealed tiles filled `tile-hidden` `#18181b` on the panel's `#18181b`, told apart only by the
  `tile-edge` line (screenshot s6-07) — values Mariusz chose in Q9/Q10; D-42's pairs do not include
  them.
- Whether the row-11 test's lexical scan of CSS declarations and TypeScript literals is the
  "rozbiór kodu" Q22 excludes — spec Decision 8 and 8a (reviewed) require reading only declaration
  values and literals, which needs that scan; the test traces no value and computes no cascade.
- Q-P2 — the product has no project skill `the-way-maintain-instruction-files`, so slice 9 followed the
  pinned `.the-way/instruction-files/SKILL.md`; a process remark for the request, not code.
- The truth of the loop element readings behind the values — the task's Q9–Q11 bind; I compared the
  file with the task, not with https://kantarion.bieda.it/.
- S1-I1's widened meaning of `highlight` (D-40, "or that this control is under the pointer") — the
  orchestrator's settlement within the task; the request names it for the human.

## Checks

Checks that write files ran in a temporary detached worktree of `b33aa27` in the session scratchpad
(`node_modules`, `.runs/quality-venv` and `.the-way` as junctions to the reviewed worktree's), removed
afterwards with its junctions; `foundation_check.py` and `check_instructions.py` ran read-only in the
reviewed worktree. After: `git status --short` empty, HEAD `b33aa27`, `.the-way` at `f0b2130`.

| # | Command or manual check | Exit | Result |
|---|---|---|---|
| 1 | `git log` / `git diff --stat 00e53ae..b33aa27` | 0 | 11 commits, 49 files |
| 2 | `npm run build` | 0 | |
| 3 | `node --test tests/http.test.mjs tests/startup.test.mjs "tests/sim/*.test.mjs" "tests/view/*.test.mjs"` | 0 | 173 pass, 0 fail |
| 4 | `python -B -m unittest discover -s tests/invariants -p <p>` for `test_browser_view_token_values.py`, `test_browser_view_focus_outline.py`, `test_design_token_contrast.py`, `test_design_token_sources.py`, `test_application_build_kitchen_sink.py`, `test_application_build_output.py`, `test_content_identifiers.py`, `test_browser_view_framework.py`, `test_terrain_drawing_numbers.py`, `test_icon_*.py`, `test_application_package_layout.py` | 0 each | OK |
| 5 | `python -B .the-way/gate/run_tests.py tests/quality` | 0 | 27 tests OK (ESLint, Prettier, Ruff, ShellCheck …) |
| 6 | `python -B .the-way/elements/common/foundation_check.py`; `python -B .the-way/instruction-files/check_instructions.py .` (reviewed worktree) | 0; 0 | `0 errors`; `0 error, 14 warn, 6 info` (the base's 14) |
| 7 | Mutations in the scratch worktree, each restored: hex colour in `kitchen-sink.ts`; `outline: none` in `kitchen-sink.css`; `#ff6467` for `var(--danger)` in `styles.css`; `--warning: #b06a00`; `--bar-width` without its `Source:`; a select list labelled `"Menu"` in `kitchen-sink.ts` | 1 each | each test fails as its invariant asks; the last is finding 24. After restoring, the four tests exit 0 |
| 8 | Scratch copy of `scripts/kitchen-sink.mjs` with the Windows launcher replaced by a non-existent program (no tab opened); `curl` | — | printed `http://127.0.0.1:61174/`; `netstat`: listening on `127.0.0.1` only; `/`, `/tokens.css`, `/kitchen-sink/kitchen-sink.js`, `/fonts/OFL.txt` 200; `/../package.json`, `/%2e%2e/package.json`, `/..%2fpackage.json`, `/..%5c..%5cpackage.json`, `/fonts/..%2f..%2f..%2fpackage.json`, `/.git/HEAD`, `/%2e%2e/%2e%2e/scripts/kitchen-sink.mjs` 404; process stopped |
| 9 | `python -B -m unittest discover -s tests/invariants -p "test_loop2_container_icons.py" -v` (Docker 29.7.2 answered); `docker build` of the head, `fetch` inside the container | 0; 0 | container icons test ran, not skipped; `/tokens.css`, `/styles.css`, the four woff2 and `OFL.txt` 200 with SHA-256 equal to the repository files; `/kitchen-sink.css`, `/kitchen-sink/kitchen-sink.js` 404. Container and image removed |
| 10 | Python: population of the row-11 test | 0 | 20 files, `styles.css` and the three kitchen-sink files among them, not `tokens.css` |
| 11 | `git diff --stat` of `assets/` since `4c892df`, of fonts/Docker/attributes since `396895f`, of `scripts/` since `73b0563`; grep of the icons for `href`, `script`, `url(` | 0 / 1 | unchanged since their slice reviews; no reference in any icon |
| 12 | Manual: values and sources of `tokens.css` against Q9–Q11, Q19 C; Roles table and D-39..D-41 against Q3, Q4, Q7, Q12, Q19; rows 1–20 and spec additions against the foundation diff; screenshots s8-01, s6-07 | — | as above |

Not run:

- `npm test` as a whole — the cycle's own run before the request (method §2). The executor's run at
  the head (`reports/slice9-npm-test.log`) shows build, 173 node tests, gate 5 + 64 + 156 + 27 tests
  OK, `foundation_check.py` `0 errors`.
- An agent loading and following `src/browser/AGENTS.md` in a fresh session — needs fresh headless
  sessions per tool; not asked by the plan.
- A browser render of my own — the head's UI files are unchanged since slice 8 (`73b0563..b33aa27`
  touches only `AGENTS.md` and `src/browser/AGENTS.md`), and slices 4, 6, 7 had reviewers' own renders;
  the native drop-down of an opened `<select>` remains unverified by anyone.
- Ctrl+C of the served command — not sent; Node's default ends the process.
