PASS 7d6b39f16b1febe382088bb7497857f9e57286c8

# Review 24 — slice 7: the kitchen-sink page and its compilation, outside the game's build

- **Range:** `b4658ac701f58692e96df944468b50a478f0a6c0..7d6b39f16b1febe382088bb7497857f9e57286c8`,
  one commit; `git rev-parse HEAD` in the worktree = the given head.
- **Method:** `.the-way/task-cycle/review/SKILL.md` (pinned `f0b2130`, gitlink and checkout agree).
- **Read:** handoff 24; `task.md`, `spec.md` (8a included), `plan.md` (foundation entries, slice 7,
  slice 8, coverage, choices); executor's handoff 23 and report 23; guidelines selected by
  `.the-way/product-guidelines/reading.md` for `browser-view` and `build-tools`:
  `guidelines/styleguide-browser-view.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`
  (read whole; it applies to `src/browser/view/`, the page's entry stands outside it — an entry point,
  a kind D-28 defers); decisions D-04, D-06, D-18, D-19, D-38–D-47 whole; invariant
  `application-build-output`; the game code the page imports or copies from
  (`controls/*.ts`, `terrain-picture.ts`, `terrain-panel.ts`, `tile-list.ts`, `sim/hex.ts`,
  `sim/data/resources.ts`, `styles.css`, `tokens.css`), `eslint.config.mjs`,
  `tests/invariants/loop2_invariant_support.py` (`files_under`, `TreeCopy`).
- **Counts:** blocking 0 · Minor 3 · out of scope 0.

## Findings

### Critical

None.

### Important

None.

### Minor

**m1 — `src/browser/kitchen-sink/kitchen-sink.ts:350-362`, the row of the link-highlight sample.**
The row's cells are the fixed strings `["12", "8", "6", "6"].slice(0, ICONS.length)` and the table
has no header row. With a fifth resource in `RESOURCES` the row keeps four cells, one short of the
icons drawn on the tile beside it; and the numbers stand without the icon-and-name column heads the
game's list gives them (`tile-list.ts:96-107`), so a reader of the page sees bare numbers. Effect:
the developer's reference page only; the sample's purpose — the line at the row's left edge in
`link-highlight` — is shown correctly (screenshot `s7-01`, my own render). Evidence: the code lines
above; `tile-list.ts` draws a `thead` per column.

**m2 — `kitchen-sink.ts:311-326`, icon placement repeated from `terrain-picture.ts:55-62`.**
The two-per-row centring is copied, since `terrainPicture` needs a game state (D-04, D-45) and the
placement is not exported. When the game's placement changes, the samples keep the old one and the
page no longer shows what the game draws — the page's reason to exist. A pure helper exported from
`terrain-picture.ts` (a module the game uses, so spec 8a allows the import) would keep one copy, but
that file lies outside slice 7's *Change*. Executor's report, choice 1, names the same cost.

**m3 — `kitchen-sink.ts:420`, the note „w grze zapas zasobu nie spada dziś do zera”.**
True at this head: the only writes to `tile.stock` are in `src/browser/sim/layout.ts:39,48`, which
set full stock; nothing decrements it. The sentence states game behaviour on a page that no test
ties to the simulation, so it becomes false silently on the task that adds gathering. Nothing the
task requires depends on it.

## Against the task, spec and foundation

- **Three files, nothing else** (spec Decision 4, plan C4): `index.html`, `kitchen-sink.ts`,
  `kitchen-sink.css`. Holds.
- **Imports beyond the entry only modules the game uses** (8a): the compiled set under
  `dist/kitchen-sink/` outside `kitchen-sink/` is nine modules (`sim/data/archetypes|maps|resources`,
  `sim/hex`, `sim/types`, `view/controls/button|number-field|select-list|text-field`); `cmp` against
  `dist/public/` of `npm run build` — all present and byte-identical.
- **Every shared control in seven states or a reason** (To do 7, D-45, styleguide "States of shared
  controls"): 6 controls × 7 states; reasons for error/empty of the three buttons, error of the
  select list, loading for all six — the styleguide's exceptions exactly. Error uses the real
  `Field.setError`; empty uses no positions / an empty field with its hint; hover and focus are
  forced by `sample-hover` / `sample-focus`. Rendered: hover background `rgb(39, 39, 42)`
  (`highlight`), focus outline `rgb(244, 244, 245) solid 2px`, two fields in `.error`.
- **Every role**: the 23 names of the page's `ROLES` each exist as `--<role>` in `tokens.css`, same
  order as the styleguide's table; backgrounds carry `text` (rule "Every background with its text");
  each text role on `page`, `panel`, `highlight`; `depleted` as an icon at full and dimmed opacity.
- **Tile samples drawn with the roles, never from a game state** (D-04, D-45, Q19 A): SVG built
  with `hexCorners`/`hexCenter` under the game's classes (`tile`, `tile revealed`, `icon dimmed`,
  `outline character|step-target|link-highlight`), so `styles.css` colours them; no `GameState` is
  built; link highlight is shown on a revealed tile only (slice 4 m1); icons from
  `Object.values(RESOURCES)` (D-18).
- **No value in place of a token** (D-43): role colours are set from TypeScript as
  `var(--<role>)` — a reference to the token, no colour in the text; `width`/`height`/`max-width`
  in `kitchen-sink.css` are layout dimensions; `img` `width`/`height` attributes and SVG geometry
  are exempt. Every `var(--…)` in `kitchen-sink.css` names a property `tokens.css` defines (checked
  by script), so none silently falls back.
- **Focus** (D-47, row 12): the stylesheet's only `outline` is `:focus-visible, .sample-focus` from
  `var(--focus)` with width and offset tokens; no outline from TypeScript.
- **Marker** (spec Decision 4): `loop2-kitchen-sink-page` stands in exactly `index.html` and
  `kitchen-sink.ts` of `src/` (`grep -rl` over `src`).
- **Build separation** (D-06, D-45, spec Decision 5): `tsconfig.browser.json` excludes
  `src/browser/kitchen-sink/**`; `tsconfig.kitchen-sink.json` extends it with its own `include` and
  `"exclude": []`, outDir `dist/kitchen-sink`; `npm run build` writes no `dist/public/kitchen-sink/`
  and no file with the marker. ESLint still types the page through its `src/browser/**/*` program,
  independent of the tsconfig's `exclude` (`eslint.config.mjs:38-78`).
- **`test_application_build_output.py`**: `LEFT_OUT` drops only paths starting with
  `src/browser/kitchen-sink/` (`files_under` returns `/`-separated relative paths;
  `str.startswith(())` is False for the server). Docstring updated; the invariant's sentence is
  unchanged. The test fails without the filter (probe below), so it still protects the behaviour.
  No invariant test was weakened beyond that carve-out, which the spec mandates.
- **User interface evidence (WAY-219)**: screenshots at 1440 and 390 px present. I rendered the page
  myself (below): at 1440 the controls panel ends 16 px inside the page edge; at 390 the document is
  375 px wide with no page scroll and the controls table scrolls inside its panel
  (1146 in 341 px). The disabled selected button keeps its `selected` frame
  (`rgb(212, 212, 216)`) — slice 6's Minor, now visible side by side on the page; not this range's.
- **Own-work check**: the executor named spec 8a as weakest and checked it by `cmp`; it fits and
  would catch a page-only module in `view/` (missing from `dist/public`) — I repeated it.
- **Trust boundaries** of step 4 (`assets/icons/**`, `assets/fonts/**`, `scripts/kitchen-sink.mjs`):
  the range touches none of them; nothing to probe. No irreversible operation.

### Considered, no finding

- Kinds shown in Polish („tło”, „tekst”, „inne”) while the styleguide's table writes `background`,
  `text`, `other`: a label on a developer's page, mapping obvious; the English `background` in a TS
  string would be the system colour `Background` for the token test.
- Forced hover repeated in `kitchen-sink.css` rather than a sample class in `styles.css`: keeps
  page-only CSS out of `dist/public`; drift cost named by the executor.
- Selected button shown alone, not in a group of two: its look is its class; the plain button stands
  in the row above.

## Declined to judge

None.

## Checks

All run in a temporary detached worktree of `7d6b39f` under the session scratchpad, with
`node_modules` and `.runs/quality-venv` linked as junctions to the reviewed worktree's (read only);
junctions removed first, then the worktree removed (`git worktree remove --force`, `prune`); the
reviewed worktree's `git status --short` empty afterwards.

| Command | Exit | Result |
|---|---|---|
| `node node_modules/typescript-compiler/bin/tsc -p tsconfig.kitchen-sink.json` | 0 | emits `kitchen-sink/kitchen-sink.js` and nine game modules |
| `npm run build` | 0 | `dist/public` holds no `kitchen-sink/` |
| `grep -rl "loop2-kitchen-sink-page" dist/public` | 1 | no file |
| `grep -rl "loop2-kitchen-sink-page" src/` | 0 | `index.html`, `kitchen-sink.ts` only |
| `cmp` of each `.js` under `dist/kitchen-sink/{sim,view}` with `dist/public/` | — | all identical, none missing |
| `python -B -m unittest discover -s tests/invariants -p test_application_build_output.py` | 0 | 3 tests OK |
| same, with the `LEFT_OUT` filter removed (scratch edit, reverted) | 1 | "the build emitted no dist/public/kitchen-sink/kitchen-sink.js" |
| `… -p "test_browser_view_*.py"` | 0 | 13 tests OK |
| `… -p test_content_identifiers.py` | 0 | 4 tests OK |
| `… -p "test_design_token_*.py"` | 0 | 5 tests OK |
| `… -p test_terrain_drawing_numbers.py` | 0 | 3 tests OK |
| `node --test "tests/view/*.test.mjs"` (after the build) | 0 | pass |
| `python -B .the-way/gate/run_tests.py tests/quality` | 0 | 27 tests OK |
| `node node_modules/eslint/bin/eslint.js --max-warnings 0 --format json src/browser/kitchen-sink/kitchen-sink.ts` | 0 | linted, 0 errors, 0 warnings |
| pinned Prettier `--check --no-config --no-editorconfig --ignore-path .gitignore src/browser/kitchen-sink/` | 0 | all formatted |
| `git ls-files --eol src/browser/kitchen-sink/` | — | `i/lf`, `eol=lf` |
| `python -B .the-way/elements/common/foundation_check.py` | 1 | 3 errors, exactly the plan's table after Slice 7: `tests/invariants/test_application_build_kitchen_sink.py`, `scripts/kitchen-sink.mjs` (Slice 8), `src/browser/AGENTS.md` (Slice 9) |
| Manual: page assembled in the scratchpad as report 23 lists the addresses (`index.html`, `tokens.css`, `styles.css`, `kitchen-sink.css` at root, `fonts/`, `icons/`, compiled modules), served by a throwaway `express.static` on `127.0.0.1` (stopped after), read with Playwright at 1440×900 and 390×844 | — | marker in `body[data-page]`; body font `Geist, sans-serif`; no page scroll at either width; panel inside the 16 px gutter; one console error, `favicon.ico` 404 |

Not run: `npm test` — the cycle's own run before the request. The test of row 15 does not exist
until Slice 8.

## For the next dispatch (Slice 8)

- Until Slice 8, nothing in `npm test` type-checks `kitchen-sink.ts`: `npm run typecheck` is
  `scripts/build.mjs --check` over the two configurations, and ESLint's typed rules report no type
  errors. Slice 8's positive control (`npm run kitchen-sink -- --build-only` in a `TreeCopy`) is the
  only compile of the page in `npm test`; it must exit non-zero on a compile error (the inherited
  `noEmitOnError: true` makes `tsc` do so) and the test must assert that exit.
- Assembly addresses the page relies on (verified by my render): `index.html` (the page's, not the
  game's), `tokens.css`, `styles.css`, `kitchen-sink.css` at the root of `dist/kitchen-sink/`; the
  entry at `/kitchen-sink/kitchen-sink.js` where `tsc` emits it; `fonts/`, `icons/`. The page's
  `kitchen-sink.css` lies in `src/browser/kitchen-sink/`, outside a `src/browser/*.css` copy.
- Marker for row 15: `loop2-kitchen-sink-page`.
- `dist/kitchen-sink/` from the executor's compile is still in the reviewed worktree (ignored);
  harmless to `TreeCopy` tests, which leave `dist` out.
