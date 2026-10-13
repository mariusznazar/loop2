# Final-review fix wave — report

Status: DONE. Branch `task/mag-w-lesie`, base b319b5f. Not pushed. Skill used: `superpowers:test-driven-development`.

Commits (explicit paths only):
- a9e5fee `fix(view): draw icons as dark shapes without background and credit the change` — F1, F2, F6
- 60c53bb `fix(view): order tile icons by the run's map resources, as the tile list does` — F4
- 0972d29 `fix(sim): finish a zero-minute activity and require durations of at least one minute` — F3, F5
- e7159a7 `test(sim): pin golden values of the generator, seed mixing and layout; scan main.ts for S2` — F7, F8

RED/GREEN runs below use `node --test --test-reporter=tap <file>` after `npm run build`.

## F1 — icons drawn as black squares

Changed:
- `assets/icons/{berry-bush,fern,flax,wood-stick}.svg`: removed `<path d="M0 0h512v512H0z"/>`; `fill="#fff"` → `fill="#2b2b2b"`. Byte-level edit; each file still has exactly `svg` + one `path`, attributes `xmlns`, `viewBox`, `fill`, `d`; no trailing newline, as before.
- `src/browser/view/credits.ts`: `IconCredit` gains `changes: string`; every credit has `changes: 'zmienione (bez tła, ciemny kolor)'` (one private constant `CHANGES`).
- `src/browser/view/footer.ts`: `FooterCredit` gains `changes`; each footer line is now „{zasób}: {autor}, game-icons.net, CC BY 3.0, zmienione (bez tła, ciemny kolor)”.
- `README.md`: the icon section gains the sentence „Ikony są zmienione względem źródła: usunięte czarne tło, kształt w ciemnym kolorze.” The footer description higher up (line 23) quotes the footer line, so it now quotes the new text too; otherwise it would describe a line the page no longer shows.

Covering tests (`tests/view/icons.test.mjs`):
- `every icon file is a dark shape without a background: svg and path elements, allowed attributes only`: elements are only `svg`/`path`, attributes only `xmlns`/`viewBox`/`d`/`fill`, no background path, every path `fill="#2b2b2b"`.
- `each icon credit records that the file was changed from its source`.
- `each footer line says after the licence that the icon was changed`: runs `createFooter()` against a small stand-in for `document` defined in the test (records appended children), and compares the full text of each line.

RED: `not ok 19` (`'berry-bush.svg: background path'`), `not ok 20` (expected `'zmienione (bez tła, ciemny kolor)'`, got undefined), `not ok 21` (expected `'patyk: Delapouite, game-icons.net, CC BY 3.0, zmienione (bez tła, ciemny kolor)'`, actual `'patyk: Delapouite, game-icons.net, CC BY 3.0'`).
GREEN: `# pass 24 # fail 0`.

After `npm run build`, `dist/public/icons/*.svg` (all four): background path 0, `#fff` 0, `fill="#2b2b2b"` 1, paths 1; `cmp` against `assets/icons` identical.

## F2 — credit links in the same tab

Changed: `src/browser/view/footer.ts` `link()` sets `anchor.target = '_blank'`; `rel = 'noopener noreferrer'` kept.
Test: `the footer links open in a new tab, without opener or referrer` (same stand-in document; two links per line, each `target === '_blank'` and `rel === 'noopener noreferrer'`).
RED: `not ok 22` (expected `'_blank'`). GREEN: in the 24/24 run above.

## F3 — a 0-minute activity never finished

Changed: `src/browser/sim/run.ts` `stepMinute`: `if (minute !== run.current.endMinute)` → `if (minute < run.current.endMinute)`, with a comment. For a duration ≥ 1 the activity starts at `startMinute` and `minute` rises by one per step, so the first minute with `minute >= endMinute` is the one with `minute === endMinute`: no behaviour change. A 0-minute activity now finishes in the next minute.
Tests (`tests/sim/data.test.mjs`):
- `every map step and every fixed action duration is a whole number of minutes, at least 1` — every `MAPS[*].stepMinutes`, every non-null `ACTIONS[*].minutes`, and also `BALANCE.waitMinutes` (the wait is an activity too; a 0 there would freeze the run the same way). This is a guard on today's data (5, 20, 1), so it passed when written.
- `an activity of 0 minutes from faulty data still finishes in the next minute` — `newMapRun` on `{ ...firstMap, stepMinutes: 0 }` with a Wędruj program, then `stepMinute`.
RED: `not ok 13`, `error: '[]'` (no events at minute 1). GREEN: `# pass 13 # fail 0`.
The four read-only invariant checks pass (gate below).

## F4 — icons in the global resource order

Changed: `src/browser/view/terrain-picture.ts`: the module constant `RESOURCE_ORDER` (from `RESOURCES`) is replaced by `MAPS[run.mapId].resources.map(({ id }) => id)` per call; imports `MAPS`.
Test (`tests/view/terrain-picture.test.mjs`): `a tile's icons follow the order of the resources in the run's map data` — reverses the run's map `resources` array in place for the test only (restored in `finally`), checks that this order differs from the resource data's order, and that every tile with 2+ icons lists them in the map's order.
RED: `not ok 9`, actual `['stick','fiber']`, expected `['fiber','stick']`. GREEN: `# pass 9 # fail 0`.

## F5 — unused `DIRECTIONS`

Changed: `src/browser/sim/hex.ts`: removed the constant and its doc comment. No behaviour change; covered by `npm run typecheck` (clean) and the whole suite.

## F6 — gaps in the untrusted-input check

Changed (`tests/view/icons.test.mjs`, `violations()`): rejects `<!DOCTYPE`, `<!ENTITY`, `<?xml-stylesheet`, `<style`, `@import` (all case-insensitive) and an unquoted `href=`/`xlink:href=` (`/(?:xlink:)?href\s*=(?!\s*["'])/i`; the lookahead sits after `=` so spaces before a quote are not taken for an unquoted value).
Crafted cases added, each placed after a valid `<svg …>` opening so that only the new rule can catch it: `${OPEN}<!DOCTYPE svg></svg>`, `${OPEN}<!ENTITY x SYSTEM "file.txt"></svg>`, `${OPEN}<?xml-stylesheet type="text/css" href="#s"?></svg>`, `${OPEN}<style>path{fill:red}</style></svg>`, `${OPEN}<path style="@import 'a.css'"/></svg>`, `${OPEN}<use href=other.svg#a /></svg>`, `${OPEN}<use xlink:href=other.svg#a /></svg>`.
RED: `not ok 11`–`not ok 17` (all seven, each passed the old check). GREEN: in the 24/24 run; the real icon files and the "two allowed namespace declarations" control still pass.

## F7 — golden values

Test (`tests/sim/layout.test.mjs`): `golden values: the layout stream of seed 1, mixSeed(1, 1000) and the stocks of Las for seed 1`, values computed once from the code at b319b5f:
- first three values of `streamState(1, 'layout')`: `0.044911144534125924, 0.7811651250813156, 0.3564910045824945`
- `mixSeed(1, 1000)`: `2244977679`
- stocks of `drawLayout(MAPS.forest, 1)`, tiles 0–15: `{stick,moss} {stick,berry,fiber} {} {stick,berry} {berry} {stick} {stick,berry,moss} {stick} {stick,berry,fiber} {stick,fiber} {stick,berry,moss} {stick} {stick,fiber} {stick,berry,moss} {stick} {stick,moss}` (stick 12, berry 8, moss 6, fiber 6).
This pins existing behaviour, so it passed when written. To show it fails on a change, the built `dist/public/sim/*.js` was edited temporarily, one change at a time, and restored (then rebuilt): layout stream constant `0x4c41594f→…4e`, `mixSeed` constant `0x9e3779b9→…b8`, per-tile resource order reversed in `layout.js`, mulberry32 increment `0x6d2b79f5→…f4`. Each gave `not ok 9`; after restoring, `ok 9`.

## F8 — S2 scan omitted `main.ts`

Changed (`tests/sim/rules.test.mjs`): `MAIN = src/browser/main.ts` added to `s2Files`; the S2 test name mentions main.ts. New test `S2 scans the simulation outside sim/data, the view and the entry module main.ts` checks the file set (main.ts in, view files in, sim files outside data in, no sim/data file).
RED: `not ok 3`, `error: 'main.ts is not scanned'`. GREEN: `# pass 6 # fail 0`.

## Whole verification (worktree root, after the last change)

- `npm run typecheck` — exit 0, no output beyond the script header.
- `npm test` — exit 0: `tests 166, pass 166, fail 0` (was 150; +16: icons 11, data 2, terrain picture 1, rules 1, layout 1).
- `npm run build` — exit 0; the four icons in `dist/public/icons/` have no background path and no white fill (see F1).
- `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl` — exit 0: `Ran 44 tests in 60.123s  OK` (port 3000 was free; no rerun needed).
- No file under `tests/invariants/` touched. No browser automation.
- Foundation guards were not run: no foundation file changed.

## Concerns

- The footer tests use a stand-in for `document` (only `createElement`/`append` and plain properties). They check the text and the link attributes `createFooter` sets, not how a real browser lays them out; the browser check of task items 1–8 is still not done (final review Important 2) and must be reported as unchecked in the request.
- Two small additions beyond the literal wording, both inside the findings' purpose: F3's data test also covers `BALANCE.waitMinutes`; F1 also updated README line 23, which quotes the footer line.
- The dark fill `#2b2b2b` on the revealed tile colour (#dfe7cf) and dimmed icons at opacity 0.3 were not seen in a browser.
