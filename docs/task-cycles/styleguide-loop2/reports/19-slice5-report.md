# Report 19 — slice 5: light icons and their credit

- **Status:** done
- **Base:** `74ec73214e0f45df6d1902b5a99ea0018226a032`
- **Commit:** `4c892df965e7d4e74276afc09ca5c1831316dcea` — "feat: draw the icons light (#f4f4f5) on the grey
  revealed tiles and say so in their credit" (author `<private address>`), not pushed
- **Method:** project skill `the-way-make-change` → `.the-way/task-cycle/change/SKILL.md` at `f0b2130`
  (gitlink and `git -C .the-way rev-parse HEAD` agree)

## Read

Handoff 19; frozen `task.md` whole; `spec.md` whole (Decision 8a included); `plan.md` whole (slice 5,
its *Read* list, *Foundation entries*); `cycle.md` with its questions table. Foundation: D-27 whole,
invariants `icon-file-content`, `icon-credits`, `loop2-container-icons`, `browser-view-token-values`;
part map `browser-view`. Guidelines selected by `.the-way/product-guidelines/reading.md` for files of
`browser-view` (icons, `credits.ts`, `tests/view/`): `guidelines/styleguide-browser-view.md`,
`guidelines/coding.md`, `guidelines/coding-browser-module.md` (`credits.ts` is a listed copy) — each
whole. `README.md` (build-tools) is prose; no further guideline file names it. Every changed file
read whole before the change, plus `src/browser/view/footer.ts`,
`tests/invariants/test_icon_file_content.py`, `tests/invariants/test_icon_credits.py`.

## Files changed (`git diff --numstat 74ec732..4c892df`)

| File | + | − |
|---|---|---|
| `assets/icons/berry-bush.svg` | 1 | 1 |
| `assets/icons/fern.svg` | 1 | 1 |
| `assets/icons/flax.svg` | 1 | 1 |
| `assets/icons/wood-stick.svg` | 1 | 1 |
| `src/browser/view/credits.ts` | 2 | 2 |
| `tests/view/icons.test.mjs` | 6 | 6 |
| `README.md` | 2 | 2 |

Exactly the slice's *Change* list.

- Icons: the one `fill="#2b2b2b"` of each file became `fill="#f4f4f5"` (byte replace; files keep no
  trailing newline, `i/none`).
- `credits.ts:11-12`: comment "…the shape drawn light."; `CHANGES = "zmienione (bez tła, jasny kolor)"`.
- `tests/view/icons.test.mjs`: `DARK = "#2b2b2b"` → `LIGHT = "#f4f4f5"` with its comment ("light on
  the grey revealed tile"), the test name "is a light shape", and `CHANGES` with the new text.
- `README.md:53` footer passage „…zmienione (bez tła, jasny kolor)”; `README.md:59` „kształt
  w jasnym kolorze”. CRLF of the working tree kept (byte replace).

## Checks (logs in `reports/slice5-logs/`)

| Command | Exit | Result |
|---|---|---|
| `npm run build` (test changed, code not yet) | 0 | `build-before.log` |
| `node --test tests/view/icons.test.mjs` — failing run, before icons and credit | 1 | 24 tests, 21 pass, 3 fail, each on its assertion: "berry-bush.svg: a path not filled #f4f4f5" (actual `fill="#2b2b2b"`); credit `'zmienione (bez tła, ciemny kolor)'` ≠ expected `'… jasny kolor)'`; footer line likewise (`icons-test-before.log`) |
| `npm run build` (after) | 0 | `build-after.log` |
| `node --test tests/view/icons.test.mjs` — passing run | 0 | 24 pass, 0 fail (`icons-test-after.log`) |
| `node --test "tests/view/*.test.mjs"` | 0 | 59 pass, 0 fail (`view-tests.log`) |
| `python -B -m unittest discover -s tests/invariants -p "test_icon_*.py"` | 0 | 5 tests OK (`test_icon.log`) |
| `python -B -m unittest discover -s tests/invariants -p "test_browser_view_token_values.py"` | 0 | 4 tests OK (`token_values.log`) |
| `python -B -m unittest discover -s tests/invariants -p "test_loop2_container_icons.py" -v` | 0 | Docker 29.7.2 answered; 1 test ran, `ok`, not skipped — the container serves the new bytes (`container_icons.log`) |
| `python -B .the-way/gate/run_tests.py tests/deploy` | 0 | 64 tests OK, no skip (`deploy.log`) |
| `python -B .the-way/gate/run_tests.py tests/quality` | 0 | 27 tests OK — Prettier, ESLint on `credits.ts` and the test (`quality.log`) |
| `python -B .the-way/elements/common/foundation_check.py` | 1 | 5 errors, exactly the expected pattern errors after Slice 4: `src/browser/kitchen-sink/**`, `tsconfig.kitchen-sink.json`, `tests/invariants/test_application_build_kitchen_sink.py`, `scripts/kitchen-sink.mjs` (trust boundary), `src/browser/AGENTS.md` (`foundation.log`) |
| `cmp dist/public/icons/flax.svg assets/icons/flax.svg` after build | 0 | build copies the new file |

Not run: the full `npm test` (the cycle's run before the request, per the method).

## Own-work check (section 3)

- **Requirement most likely missed:** "each icon … filled `#f4f4f5` instead of `#2b2b2b`, holding
  nothing else new" (D-27, `icon-file-content`; trust boundary `assets/icons/**`). The node test checks
  the fill and allowed elements/attributes, but not that nothing else in the path data changed.
- **Check:** for each icon, `MSYS_NO_PATHCONV=1 git show HEAD:<file>` (run before the commit, so
  `HEAD` was the base `74ec732`) with the fill replaced by `sed`, compared with `cmp` to the new
  file — exit 0, all four "identical
  apart from fill" (`own-check.log`). A grep of the tree outside `node_modules`, `.the-way`, `.runs`,
  `dist`, `.git` for `2b2b2b`, „ciemny kolor”, „ciemnym kolorze” leaves only
  `tests/invariants/test_icon_file_content.py:132`, a made-up control SVG of that test whose colour
  plays no part (outside the slice's *Change*; left as is).
- **Mutations in mind:** a second colour on a path, an extra attribute or element, a background path,
  an old credit text in `credits.ts` or the footer — each is caught by a test in `icons.test.mjs`.
  A changed `d` would pass the tests; it is caught only by review (and by the check above for this
  slice).

## Screenshot of the running product (WAY-219)

Route: the one Slice 4 used — `npm run build`, the built server (`node dist/server/main.js` on
127.0.0.1:38517), Playwright (the harness's MCP browser), 1440×900. To reach revealed tiles quickly an
init script ran `performance.now()` 20× faster (the clock reads it, `src/browser/view/clock.ts:25-27`);
program „Zawsze → Eksploruj”, „Zawsze → Wędruj”, paused at minute 1576 with 7 revealed tiles.
Files in `reports/shots/slice5/`:

- `s5-01-run-light-icons.png` — whole page: light icons on the grey revealed tiles, readable; the
  list-header icons now light on the dark panel; footer reads „zmienione (bez tła, jasny kolor)”.
  The served `/icons/flax.svg` holds `fill="#f4f4f5"` (read by `fetch` in the page).
- `s5-02-terrain-zoom.png` — the drawing alone.
- `s5-03-depleted-forced.png` — **forced state**: three icons given the class `dimmed` in the DOM,
  computed opacity 0.35. A depleted icon cannot be reached by play: no function of the simulation
  lowers a tile's stock (`grep` of `src/browser/sim/*.ts` finds stock written only in `layout.ts:39`
  and `:48`), so `stock === 0` (`terrain-picture.ts:74`) never occurs in the running game today. The
  screenshot shows the CSS rendering of the dimmed state, not the game reaching it.

Server stopped (PID killed), browser closed, the MCP's copies of the shots in
`C:\Storage\repos\loop2\.playwright-mcp\` removed (ignored by git there).

## Choices and adaptations

- Comment in `credits.ts:11` reads "the black background removed, the shape drawn light" (spec
  Decision 9: the comment changes with the text). Rejected: leaving "drawn dark" — it would contradict
  the value below it.
- Test constant renamed `DARK` → `LIGHT` with the test title; rejected: keeping the old name for a
  smaller diff — the name would say the opposite of its value. Cost if wrong: none in behaviour.
- No change to a test of an invariant; `test_icon_file_content.py` is untouched.
- Plan vs code: none.

## Observations for the orchestrator (not changed, outside the slice)

- `README.md:52` still describes the character outline as „gruby bursztynowy obrys”; the
  `character` role is `#ffd230` (yellow of discovery, Q9). Whether that word still fits is Slice 4's
  look / the whole-change review's to judge; this slice changes only the footer and icon passages the
  plan names.
- The depleted state is unreachable in the game today (above); the kitchen-sink's tile samples
  (Slice 7) remain the only place it is seen without forcing the DOM.
