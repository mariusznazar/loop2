PASS 4c892df965e7d4e74276afc09ca5c1831316dcea

# Review 20 — slice 5: light icons and their credit

- **Range:** `74ec73214e0f45df6d1902b5a99ea0018226a032..4c892df965e7d4e74276afc09ca5c1831316dcea` (one commit,
  `4c892df` "feat: draw the icons light (#f4f4f5) on the grey revealed tiles and say so in their credit")
- **Method:** project skill `the-way-review-change` → `.the-way/task-cycle/review/SKILL.md` at `f0b2130`
  (gitlink and `git -C .the-way rev-parse HEAD` both `f0b21309a837273a1540f9a704c2dfde6083ec00`)
- **Reviewed worktree:** `C:\Storage\repos\loop2-wt\styleguide-loop2`, `git rev-parse HEAD` = the given head;
  left untouched (clean before and after). Checks that write files ran in a temporary detached worktree
  of `4c892df` in the session scratchpad, removed afterwards.
- **Counts:** blocking 0 · Minor 1 · out of scope 0 (Declined to judge: 4 lines)

## Read

Handoff 20 whole; frozen `task.md` whole; `spec.md` whole (Decisions 1–9, 8a); `plan.md` whole (slice 5 and
the pattern table); `cycle.md` with its questions table; executor's report `19-slice5-report.md`.
Foundation by "Reading the foundation" for the touched parts `browser-view` (icons, `credits.ts`,
`tests/view/**`) and `build-tools` (`README.md`): part map entries of both; decisions D-27 to D-47 whole
(D-27, D-41, D-42, D-43 bear on the change); invariants `icon-file-content`, `icon-credits`,
`loop2-container-icons`, `browser-view-token-values`, `design-token-contrast`, `browser-view-framework`,
`content-identifiers`, `prettier-source-format`. Guidelines by `.the-way/product-guidelines/reading.md`:
`guidelines/styleguide-browser-view.md`, `guidelines/coding.md`, `guidelines/coding-browser-module.md`
(`credits.ts` is a listed copy), each whole. Screenshots `reports/shots/slice5/s5-01..03`.

## What the change does, against the task

| Requirement (task To do 5, spec Decision 9, plan slice 5) | Where | Met |
|---|---|---|
| Icons in `assets/icons/*.svg` filled `#f4f4f5`, nothing else new (D-27, `icon-file-content`) | four `.svg` | yes — each file is byte-identical to its base with the one `fill="#2b2b2b"` replaced (check 1) |
| Change text in `credits.ts:12` „zmienione (bez tła, jasny kolor)”, comment above it matching | `src/browser/view/credits.ts:11-12` | yes |
| `tests/view/icons.test.mjs` expects the colour and the text | `:86-88`, `:90`, `:110-111`, `:116` | yes; fails when either is wrong (checks 4, 5) |
| `README.md` footer and icon passages | `README.md:53`, `:59` | yes |
| Icon colour equals `text-strong` (D-43: „changed by hand when the value of `text-strong` changes”) | `src/browser/tokens.css:21` `--text-strong: #f4f4f5` | yes |
| Footer shows the new text (D-27, `icon-credits`) | `footer.ts` reads `credit.changes` | yes (checks 3, 6; screenshot s5-01) |

Nothing added beyond the slice: `git diff --stat` shows exactly the seven files of the slice's *Change*.
A search of the tree at the head for `2b2b2b`, „ciemn”, "drawn dark", "dark shape" leaves only
`README.md:52` („nieodsłonięte ciemne” — the unrevealed tiles, still true) and
`tests/invariants/test_icon_file_content.py:132` (a made-up sample; see Declined to judge).

Trust boundary `assets/icons/**`: each new file holds one `<svg>` with `xmlns` and `viewBox` and one `<path>`
with `fill` and `d`; the only `http` in any file is the SVG namespace declaration; no `href`, `url(`,
`script`, `foreignObject`, event attribute, entity or style. The `d` data is unchanged byte for byte, so
the recolouring brings in nothing that runs or refers outside. Line endings unchanged (`i/none w/none`,
2734 bytes before and after for `fern.svg`).

Styleguide: the icons are content of `tile-revealed` tiles (D-41 „whose icons say what lies there”) and
the list header on `panel`; light icons read on both in s5-01. Q10 settled the icon colour and its 4.4:1
on `tile-revealed`; D-42 lists no pair for icons. The depleted state (`depleted`, 35% opacity) is shown
only forced (s5-03); the simulation never lowers a tile's stock (`src/browser/sim/layout.ts:39`, `:48` are
the only writes, and every stock in `src/browser/sim/data/maps.ts:31-34` is above zero), so the
executor's reading holds. The CSS that dims (`src/browser/styles.css:168-169`) is slice 4's and unchanged.
`styles.css` holds no `filter` or other rule that would recolour the icons, so the file colour is what the
player sees.

Own-work check of the author: it names the weakest requirement correctly (path data must not change; the
node test does not see `d`), and its check (base file with the fill replaced, `cmp` against the new file)
would catch a changed `d`. I repeated it independently (check 1).

## Findings

### Critical

none

### Important

none

### Minor

- **m1 — `tests/view/icons.test.mjs:86-87`: the expected icon colour is a literal, not the value of
  `--text-strong`.** D-43 and the styleguide's rule "No value in place of a design token"
  (`guidelines/styleguide-browser-view.md:102-103`) say the icon colour is changed by hand when the value
  of `text-strong` changes. The test pins `LIGHT = "#f4f4f5"` itself, so a later change of
  `--text-strong` in `src/browser/tokens.css:21` leaves the icons in the old colour with every test
  green — the drift D-43 warns of goes unseen until someone looks. Reading `--text-strong`'s `#rrggbb`
  from `tokens.css` as text (as `test_design_token_contrast.py` already does) would make the test fail on
  that drift. Today the two values agree (`tokens.css:21`), so nothing is wrong now; this is broader
  coverage, not a defect. Evidence: `grep -n "text-strong" src/browser/tokens.css` → `#f4f4f5`; the test
  has no read of `tokens.css`.

## Declined to judge

- `README.md:52` „gruby bursztynowy obrys” — the line is unchanged in this range and describes slice 4's
  look; `character` is `#ffd230`, an amber yellow, and the word comes from koncepcja_projektowa §5 as the
  task quotes it. Left to the whole-change review as the executor proposed.
- `tests/invariants/test_icon_file_content.py:132` `fill="#2b2b2b"` — a made-up control sample whose colour
  plays no part in what it tests; outside the range, an invariant test the slice need not touch.
- A depleted icon is unreachable in play today (no function of the simulation lowers stock) — behaviour of
  `simulation`, outside this task; the kitchen-sink samples (Slice 7) are where the state is shown.
- Contrast of the light icons on `tile-revealed` (about 4.4:1) — settled by Q10 and outside D-42's pairs.

## Checks run

All in a temporary detached worktree of `4c892df` with `.the-way` initialised at `f0b2130` and
`node_modules` linked read-only from the reviewed worktree; logs in the session scratchpad (removed with
the worktree).

| # | Command or manual check | Exit | Result |
|---|---|---|---|
| 1 | for each icon: `MSYS_NO_PATHCONV=1 git show 74ec732:assets/icons/<f>.svg \| sed 's/fill="#2b2b2b"/fill="#f4f4f5"/' \| cmp - assets/icons/<f>.svg` | 0 ×4 | all four identical apart from the fill; one `fill` per file; only `http` is the `xmlns` value |
| 2 | `npm run build` | 0 | `cmp dist/public/icons/fern.svg assets/icons/fern.svg` exit 0 |
| 3 | `node --test tests/view/icons.test.mjs` | 0 | 24 pass, 0 fail |
| 4 | mutation: `flax.svg` fill set back to `#2b2b2b`, then check 3 | 1 | fails "flax.svg: a path not filled #f4f4f5"; file restored |
| 5 | mutation: `credits.ts` text set back to „ciemny kolor”, `npm run build`, check 3 | 1 | 2 tests fail (credit text, footer line); restored, rebuilt, check 3 exit 0 |
| 6 | `node --test "tests/view/*.test.mjs"` | 0 | 59 pass, 0 fail |
| 7 | `python -B -m unittest discover -s tests/invariants -p "test_icon_*.py"` | 0 | 5 tests OK (`icon-file-content`, `icon-credits`) |
| 8 | `python -B -m unittest discover -s tests/invariants -p "test_browser_view_token_values.py"` | 0 | 4 tests OK |
| 9 | `python -B -m unittest discover -s tests/invariants -p "test_loop2_container_icons.py" -v` | 0 | Docker 29.7.2 answered; 1 test ran, `ok`, not skipped |
| 10 | `node node_modules/prettier/bin/prettier.cjs --no-config --no-editorconfig --check src/browser/view/credits.ts tests/view/icons.test.mjs` | 0 | formatted |
| 11 | `npx eslint --max-warnings 0 src/browser/view/credits.ts tests/view/icons.test.mjs` | 0 | no report (repository configuration; not the gate's run with its empty suppressions file) |
| 12 | `python -B .the-way/elements/common/foundation_check.py` | 1 | 5 errors, exactly the plan's patterns left after Slice 4: `src/browser/kitchen-sink/**`, `tsconfig.kitchen-sink.json`, `tests/invariants/test_application_build_kitchen_sink.py`, `scripts/kitchen-sink.mjs` (trust boundary), `src/browser/AGENTS.md` |
| 13 | manual: screenshots `s5-01`, `s5-02`, `s5-03` | — | light icons on grey revealed tiles and on the list header; footer reads „zmienione (bez tła, jasny kolor)”; s5-03 is a forced state, as the report says |
| 14 | manual: `git status --short` and `git rev-parse HEAD` in the reviewed worktree before and after | — | clean; `4c892df` |

Not run: `python -B .the-way/gate/run_tests.py tests/quality` and `tests/deploy` — checks 10 and 11 cover
the two changed code files, and the executor's runs (exit 0, logs in `reports/slice5-logs/`) stand
unrepeated; the full `npm test` is the cycle's run before the request.
