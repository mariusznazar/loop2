### Slice 6 — icon files, their credits and the build copy

- **Goal:** the four game-icons.net SVGs named in `resources.ts` (`wood-stick`, `berry-bush`,
  `fern`, `flax`) stand in `assets/icons/`, taken from the game-icons source repository at a
  pinned commit; `src/browser/view/credits.ts` holds each icon's author and that commit, taken
  from the source; `scripts/build.mjs` copies `assets/icons/*.svg` to `dist/public/icons/`; the
  icon test of spec § 9.2 checks the files as untrusted input and can fail; `npm test` runs
  `tests/view/*.test.mjs`.
- **Change:** `assets/icons/wood-stick.svg` · `assets/icons/berry-bush.svg` ·
  `assets/icons/fern.svg` · `assets/icons/flax.svg` · `src/browser/view/credits.ts` ·
  `scripts/build.mjs` · `tests/view/icons.test.mjs` · `package.json`
- **Read:** `.runs/task-cycles/mag-w-lesie/spec.md` · `tests/invariants/test_browser_view_framework.py`
- **Also reads (made by earlier slices, not measured):** `src/browser/sim/data/resources.ts`
- **Reads outside the repository:** the game-icons source repository at one commit the agent pins
  and records (fetched or cloned into the scratchpad, read only), the four SVG files and the
  record of their authors and licence there. Nothing outside this repository is changed; authors
  and the commit come from the source, never from memory.
- **Checks:** the failing test first: `tests/view/icons.test.mjs` (every icon passes spec § 6's
  rules with only the two exact namespace declarations allowed; each made-up SVG holding one
  forbidden form is rejected; each icon named in `resources.ts` exists; each has a credit); then
  `npm run typecheck`; `npm test` (count grew by the view tests);
  `npm run build` followed by a listing of `dist/public/icons/` showing the four files;
  the invariant tests as in Slice 5 (`test_browser_view_framework.py` passes with SVGs in
  `dist/public`).
- **Depends on:** Slice 1 · "Where does the game's content live?"

