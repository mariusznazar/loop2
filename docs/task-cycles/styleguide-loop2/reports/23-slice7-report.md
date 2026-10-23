# Report 23 — slice 7: the kitchen-sink page and its compilation, outside the game's build

- **Status:** done with concerns
- **Branch and commit:** `task/styleguide-loop2`, one commit
  `7d6b39f16b1febe382088bb7497857f9e57286c8` ("feat: show every shared control state, every role
  and the tile samples on a kitchen-sink page compiled apart from the game's build") on the base
  `b4658ac701f58692e96df944468b50a478f0a6c0`. Not pushed. Author `<private address>`.
- **Method:** `.the-way/task-cycle/change/SKILL.md` (pinned `f0b2130`), executor of a planned slice.
- **Read whole:** handoff 23, `task.md`, `spec.md` (8a included), `plan.md`, `cycle.md`,
  `reports/07-foundation-report.md`; `guidelines/coding.md`, `guidelines/coding-browser-module.md`,
  `guidelines/styleguide-browser-view.md` (by `.the-way/product-guidelines/reading.md`: parts
  `browser-view` and `build-tools`); decisions D-03, D-04, D-06, D-18, D-19, D-27, D-29, D-32,
  D-38–D-47; invariants `browser-view-framework`, `application-build-output`,
  `application-package-layout`, `application-build-layout`, `content-identifiers`,
  `browser-view-token-values`, `browser-view-focus-outline`, `design-token-contrast`,
  `design-token-sources`, `application-build-kitchen-sink`; part map `browser-view`, `simulation`,
  `build-tools`, `agent-workflow`; every changed file and the code the page imports
  (`controls/*.ts`, `terrain-panel.ts`, `terrain-picture.ts`, `tile-list.ts`, `send-panel.ts`,
  `sim/hex.ts`, `sim/data/*.ts`, `styles.css`, `tokens.css`, `index.html`, `scripts/build.mjs`,
  `eslint.config.mjs`, the five invariant tests named in the plan's *Read*).

## Files changed

| File | Added | Removed |
|---|---|---|
| `src/browser/kitchen-sink/index.html` | 15 | 0 |
| `src/browser/kitchen-sink/kitchen-sink.ts` | 455 | 0 |
| `src/browser/kitchen-sink/kitchen-sink.css` | 127 | 0 |
| `tsconfig.browser.json` | 2 | 1 |
| `tsconfig.kitchen-sink.json` | 8 | 0 |
| `tests/invariants/test_application_build_output.py` | 13 | 4 |

Exactly the slice's *Change*; `src/browser/kitchen-sink/` holds exactly three files (plan C4).

## What the page holds

- **Controls** (in a `panel` block): a table of the six shared controls of D-44 — button
  („Wyślij”), destructive button („Zakończ”), button selected in its group („Wybrany”), select
  list, number field, text field — against the seven states of styleguide rule "States of shared
  controls". Disabled, error (`Field.setError`) and empty (no positions; empty field with its hint)
  are the controls' real states; hover and focus, which a page cannot hold, are forced by the
  classes `sample-hover` and `sample-focus`. Reasons where a state does not apply, in the
  styleguide's words: error and empty for the three buttons, error for the select list, loading
  for all six (D-44).
- **Roles:** all 23 roles of the table Roles in its order with their kind: each background with
  `text` on it; each text role on `page`, `panel` and `highlight`; `depleted` as an icon at full
  and at `var(--depleted)` opacity; every other role as a swatch of its colour.
- **Tile samples**, drawn as SVG with `hexCorners`/`hexCenter` of `sim/hex.ts` under the game's
  classes, so `styles.css` colours them from the roles: unrevealed tile; revealed tile with icons;
  the edge between an unrevealed and a revealed tile; the character's outline (on a revealed tile);
  the step target on an unrevealed and on a revealed tile; the link highlight on a revealed tile
  with a marked row of the `tile-list` table (never on an unrevealed tile — slice 4 review m1);
  depleted — the first icon dimmed, with a note that the state is seen only there. Icons come from
  `Object.values(RESOURCES)` (D-18), never by name; no game state is built (D-04, D-45).
- **Marker:** `loop2-kitchen-sink-page` — in `index.html` as `<meta name="loop2-page" content=…>`
  and in `kitchen-sink.ts` as the exported constant written into `document.body.dataset.page`
  (so it survives compilation). `grep -rl` over `src` finds it in those two files only.
- **Addresses the page uses** (for Slice 8's assembly of `dist/kitchen-sink/`): `/tokens.css`,
  `/styles.css`, `/kitchen-sink.css` at the root beside `index.html`; the entry at
  `/kitchen-sink/kitchen-sink.js` (where `tsconfig.kitchen-sink.json` emits it, root
  `src/browser`); `/icons/<file>.svg` and, through `tokens.css`, `/fonts/<file>`.
- **`kitchen-sink.css`:** its only `outline` is the rule `:focus-visible, .sample-focus`
  drawing from `var(--focus)` with the focus width and offset (row 12, styleguide rule 4); the
  hover sample repeats the game's hover background `var(--highlight)`; the rest is layout from
  tokens. No literal value D-43 counts; `width`/`height`/`max-width` are layout dimensions.
- **`tsconfig.browser.json`** gains `"exclude": ["src/browser/kitchen-sink/**"]`.
  **`tsconfig.kitchen-sink.json`** extends it (same compiler options and libraries), sets
  `outDir` `dist/kitchen-sink`, its own `include` `src/browser/kitchen-sink/*.ts` and
  `"exclude": []`, so it does not inherit the browser's exclude (spec Decision 5).
- **`test_application_build_output.py`:** a literal `LEFT_OUT` takes `src/browser/kitchen-sink/`
  out of the browser configuration's source; the docstring says so and names the kitchen-sink
  under *Does NOT cover* (row 15's invariant `application-build-kitchen-sink` keeps it out of the
  output). The invariant's sentence is unchanged.

## Checks

| Command | Exit | Result |
|---|---|---|
| `node node_modules/typescript-compiler/bin/tsc -p tsconfig.kitchen-sink.json` | 0 | emits `dist/kitchen-sink/kitchen-sink/kitchen-sink.js` and the nine game modules it imports |
| `python -B -m unittest discover -s tests/invariants -p "test_application_build_output.py"` — after the `exclude`, before the literal change (the failing run) | 1 | `FAIL … (configuration='browser')`: "the build emitted no dist/public/kitchen-sink/kitchen-sink.js" — the expected reason |
| same, after the literal change | 0 | 3 tests OK |
| `npm run build` (in a fresh `dist`), then `grep -rl "loop2-kitchen-sink-page" dist/public` | 0, then 1 | no file of `dist/public` holds the marker; `dist/` holds only `public/` and `server/` |
| `python -B -m unittest discover -s tests/invariants -p "test_browser_view_*.py"` (framework, token values, focus outline) | 0 | 13 tests OK; run again after the last CSS edit: 0 |
| `python -B -m unittest discover -s tests/invariants -p "test_content_identifiers.py"` | 0 | 4 tests OK; again after the last edit: 0 |
| `python -B .the-way/gate/run_tests.py tests/quality` | 0 | 27 tests OK (ESLint, Prettier, Ruff, ShellCheck); again after the last edit: 0 |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 --format json src/browser/kitchen-sink/kitchen-sink.ts` | 0 | the file is linted (not ignored), 0 errors, 0 warnings |
| `prettier --check src/browser/kitchen-sink/ tsconfig.kitchen-sink.json tsconfig.browser.json` (pinned, `--no-config --no-editorconfig --ignore-path .gitignore`) | 1 | only `tsconfig.browser.json`, for the CRLF the working tree holds under `core.autocrlf=true` (git stores LF, `i/lf w/crlf`); an LF copy of it checks 0. JSON is outside D-32's scope and the quality test's patterns |
| `python -B .the-way/elements/common/foundation_check.py`, after the commit | 1 | 3 errors, exactly those the plan's table leaves after Slice 7: `tests/invariants/test_application_build_kitchen_sink.py` and `scripts/kitchen-sink.mjs` (Slice 8), `src/browser/AGENTS.md` (Slice 9). Before the commit it showed 5 (the two Slice-7 patterns, files untracked then) |

Probe that the invariant tests reach the page (made in the worktree, reverted before the commit;
`git status` clean of it): `.x { color: #fff; outline: 0; }` appended to `kitchen-sink.css`,
`export const probe = "red";` to `kitchen-sink.ts`, `style="margin: 4px"` on `<body>` of
`index.html` → `… -p "test_browser_view_*.py"` exit 1, flagging all four: the outline in rule `.x`
of `kitchen-sink.css`, `#fff` there, `red` in a literal of `kitchen-sink.ts`, `4px` in the style
attribute of `index.html`.

Not run, with reason: `npm test` — the cycle runs the full suite before the request (make-change
§3). The test of row 15 does not exist yet (Slice 8).

## Own-work check (section 3)

- **Requirement most likely missed:** "beyond its entry the page imports only modules the game
  itself uses" (spec 8a) — a page-only helper slipping into a game directory would be compiled into
  `dist/public` or, missing there, mean the page imports code the game does not ship.
  **Check:** after `npm run build` and `tsc -p tsconfig.kitchen-sink.json`, every `.js` under
  `dist/kitchen-sink/` outside `kitchen-sink/` compared with `dist/public/` (`cmp`).
  **Result:** all nine (`sim/data/archetypes.js`, `maps.js`, `resources.js`, `sim/hex.js`,
  `sim/types.js`, `view/controls/button.js`, `number-field.js`, `select-list.js`, `text-field.js`)
  exist in `dist/public` and are byte-identical; none missing.
- **Second requirement:** every role of the table Roles on the page. **Check:** a scratch script
  comparing the role names of `guidelines/styleguide-browser-view.md`'s table with the page's
  `ROLES` list. **Result:** 23 = 23, same order.
- **Styleguide states (WAY-219):** the foundation settles no route to see the page before Slice 8's
  command; as the handoff asks, I compiled `tsconfig.kitchen-sink.json`, assembled the output with
  `index.html`, `kitchen-sink.css`, `tokens.css`, `styles.css`, `fonts/` and `icons/` in a
  scratchpad directory outside the repository, served it with a throwaway Express static server on
  `127.0.0.1:38719` (not committed; stopped after), and opened it with Playwright (Chromium):
  - `reports/shots/slice7/s7-01-kitchen-sink-1440.png` — full page at 1440 px;
  - `reports/shots/slice7/s7-02-kitchen-sink-390.png` — full page at 390 px.
  Console: one error, the `favicon.ico` 404. Read in the page: `document.body.dataset.page` =
  `loop2-kitchen-sink-page`; the focus sample's outline `rgb(244, 244, 245)` 2 px; the hover
  sample's background `rgb(39, 39, 42)` (`highlight`); body font `Geist, sans-serif`, Geist 400 and
  500 loaded (Geist Mono not used by the page, so not loaded); at 390 px the document is 390 px wide
  (no page scroll) while the controls table scrolls inside its panel (1146 px in 357 px).
  The first 1440 px shot showed the controls panel pushed past the page and the loading reasons
  squeezed to one word a line; fixed in `kitchen-sink.css` (`min-width: 0` on the section, one
  input width in the table, narrower reasons) before the commit; the shots are after the fix.

## Choices, with the way rejected and the cost if wrong

1. **Tile samples drawn in the entry module** from `hexCorners`/`hexCenter` and the game's CSS
   classes, rather than through `terrainPicture`/`createTerrainPanel`, which take a game state
   (D-04, D-45). The two-per-row icon placement of `terrain-picture.ts` is repeated in the entry,
   since that function is not exported. Cost if wrong: the samples drift from the game's placement
   when the game's changes; review sees it on the page.
2. **Forced hover repeated in `kitchen-sink.css`** (`.button.sample-hover, .select-list.sample-hover,
   .input-field input.sample-hover { background: var(--highlight) }`). Rejected: a sample class in
   `styles.css` — outside the slice's *Change*, and it would ship page-only CSS in `dist/public`.
   Cost: if the game's hover look changes, the sample does not follow until someone changes both.
3. **Role colours set from TypeScript** as `style.backgroundColor = \`var(--${name})\`` (and
   `style.color` for text roles), one loop over the role list instead of 23 CSS rules. No colour
   stands in the text; the token test passes. Cost if wrong (a reviewer reads "styles only in
   stylesheets" into D-43): 23 short rules in `kitchen-sink.css`.
4. **Kinds shown in Polish** („tło”, „tekst”, „inne”): the English word `background` in a TS string
   is the deprecated system colour `Background`, which the token test flags as a whole word.
5. **`tsconfig.kitchen-sink.json` extends `tsconfig.browser.json`** with `"exclude": []` and its
   own `include` (spec Decision 5 allows it), so the page compiles with the browser's options as
   they change. Cost if wrong: one file to rewrite with its own options.
6. **Stylesheet address `/kitchen-sink.css`** at the root, beside the other stylesheets, as spec
   Decision 6 lists the page's stylesheet among the root files; Slice 8's assembly must copy it
   there and the entry to `/kitchen-sink/kitchen-sink.js` (where the compiler puts it).
7. **Field width 120 px in the controls table** — a layout dimension (D-43 exempt); it differs from
   the program editor's `4em` number field, so the field samples are wider than in play.
8. **The selected button shown alone**, not in a group of two; its look is the class alone.

## Adaptations (section 4)

None: the plan's file names, paths and interfaces held. One small note: the plan's *Checks* name
`grep -rl "<marker>" dist/public` exit 1 — ran as written.

## Concerns the next dispatch depends on

1. **Slice 8's assembly addresses** (choice 6): `index.html` at the root of `dist/kitchen-sink/`,
   `tokens.css`, `styles.css`, `kitchen-sink.css` at the root, `fonts/`, `icons/`, and the compiled
   modules where `tsc -p tsconfig.kitchen-sink.json` writes them (`kitchen-sink/kitchen-sink.js`,
   `sim/…`, `view/controls/…`). Slice 8's `--build-only` must not overwrite the root
   `index.html` with the game's, and `scripts/static-files.mjs` copies `src/browser/*.css` only —
   the page's `kitchen-sink.css` lies in `src/browser/kitchen-sink/` and needs its own copy line.
2. **The marker** for row 15's test is `loop2-kitchen-sink-page`; in the HTML it stands in a
   `<meta>` `content`, in the compiled entry as a string constant.
3. **The depleted note on the page** says „w grze zapas zasobu nie spada dziś do zera” — taken
   from the slice 5 review's confirmation the handoff cites, not checked again by me. If a later
   task makes stock reach zero, the sentence becomes false; it is page text, not a test.
4. **Known looks carried over from slice 6, visible on the page and not mine to change** (Minor
   m1, m3 of `22-slice6-review.md`): the disabled selected button keeps its `selected` frame and
   the disabled controls keep `control-border` — the page now shows them side by side, which may
   prompt the whole-change review.
5. **ESLint's program for the kitchen-sink:** `eslint.config.mjs` types `src/browser/kitchen-sink/`
   with `tsconfig.browser.json`'s options through its `src/browser/**/*` program, independent of the
   new `exclude` — no change was needed (spec Decision 9 confirmed by the quality tests and the
   direct ESLint run).
6. **Untracked leftover outside the commit:** `dist/kitchen-sink/` from my compile stands in the
   worktree (ignored by `.gitignore`); my harness refused its deletion outside the session's
   directory. It does not affect `npm run build` or the tests (each test builds in a `TreeCopy`,
   which leaves `dist` out).
