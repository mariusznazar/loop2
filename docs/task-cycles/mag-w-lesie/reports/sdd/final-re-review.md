### Finding Verdicts

- **F1 icons drawn as black squares** — ADDRESSED. I read all four `assets/icons/*.svg` in full. Each is one line: `<svg xmlns viewBox>` with a single `<path fill="#2b2b2b" d="...">`. The only attributes are `xmlns`, `viewBox`, `fill`, `d`. There are no other elements, no script, no style, no href, no DOCTYPE and no ENTITY. I took each file as it was at b319b5f, deleted `<path d="M0 0h512v512H0z"/>` and changed `fill="#fff"` to `fill="#2b2b2b"`. Running that through `cmp` against the current file was byte-identical for berry-bush, fern, flax and wood-stick, so the path data `d` is unchanged. Credit: `src/browser/view/credits.ts:138-143` (field `changes`, constant `CHANGES`) and every entry at `credits.ts:156-159`. Footer: `footer.ts:225` appends `, zmienione (bez tła, ciemny kolor)` after the CC BY 3.0 link, which gives the exact required line. README: new sentence in the icon section (README diff, "Ikony są zmienione względem źródła…"); the footer description on README line 23 also quotes the new text. Tests in `tests/view/icons.test.mjs`: dark-shape/allowed-attributes check, credit check, and a footer text check using a stand-in for `document`.
- **F2 credit links open in the same tab** — ADDRESSED. `footer.ts:203` sets `anchor.target = '_blank'` and `rel = 'noopener noreferrer'` stays on the next line. The test "the footer links open in a new tab…" checks both attributes on both links of every line.
- **F3 0-minute activity never finishes** — ADDRESSED. `run.ts:114-116` changed `!==` to `<`. For a duration of 1 or more the minute rises by 1 per step from the start, so the first step where `minute >= endMinute` is the one where `minute === endMinute`, and behaviour is the same. A 0-minute activity now finishes at minute 1. Tests in `data.test.mjs`: a data guard over every map `stepMinutes`, every non-null action `minutes`, and `BALANCE.waitMinutes` (integer ≥ 1); and a faulty-data case with `stepMinutes: 0` that must finish.
- **F4 icon order differs from tile list order** — ADDRESSED. `terrain-picture.ts:50-51` builds the order from `MAPS[run.mapId].resources`. This is the same source `tile-list.ts:36` uses. The test reverses the map's resource array in place, checks that the order differs from the global one, and restores it in `finally`.
- **F5 unused `DIRECTIONS`** — ADDRESSED. Constant and comment removed from `hex.ts`. The report shows clean typecheck.
- **F6 gaps in untrusted-input check** — ADDRESSED. `icons.test.mjs` `violations()` now rejects `<!DOCTYPE`, `<!ENTITY`, `<?xml-stylesheet`, `<style`, `@import` and an unquoted `href=`/`xlink:href=`. The regex is `(?:xlink:)?href\s*=(?!\s*["'])`, so a quoted href with spaces before the quote is not flagged. There are seven crafted cases, one per rule plus the xlink variant, each placed after a valid `<svg>` opening. The report shows each failing before the change (not ok 11–17), and the real icons and the namespace control still pass.
- **F7 golden-value test** — ADDRESSED. `layout.test.mjs` pins three stream values for seed 1, `mixSeed(1,1000)=2244977679`, and all 16 tile stocks of `drawLayout(MAPS.forest, 1)` as literals. The report says the test fails when the generator constant, the mix constant, the draw order or the increment is edited in `dist` (four mutations, each failing).
- **F8 S2 scan omitted `main.ts`** — ADDRESSED. `rules.test.mjs` defines `MAIN` and adds it to `s2Files`; a new test asserts the file set (main.ts in, view and sim files in, `sim/data` out).

Test evidence: the report names the covering tests, shows RED then GREEN output for each finding, and gives a whole run of 166/166 pass, typecheck clean, and 44 invariant tests OK. The code and test changes in the diff match those claims. I did not re-run the suite.

### New Breakage in the Fix Diff

None. Checks made:
- `git diff --stat b319b5f..e7159a7` lists nothing under `tests/invariants/`, so the four read-only checks are untouched.
- The only SVG changes are the four icons, and only as described above.
- `credits.ts` and `footer.ts` type changes are consistent with each other.
- The F4 test mutates shared `MAPS` data in place and restores it in `finally`. This is safe as long as tests in the same file run sequentially (Node's default within a file).

### Out-of-Scope Observations

- The dark fill `#2b2b2b` on the light revealed tile and dimmed icons at opacity 0.3 have not been seen in a browser (the fixer says so too). No browser automation was allowed in this review. The browser check of the task items stays unchecked and must be reported as unchecked in the request.

### Verdict

**Fix round:** All findings addressed (F1–F8), no new Critical/Important breakage.
