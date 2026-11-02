# Report — Slice 2, task `logowanie-w-react`

**Status:** done

**Commit:** 35371e0 `feat: :package: add React, esbuild and jsdom, and let the framework guard allow React` (base 7c2faf8).

**Files changed:** `package.json` (+7 -1), `package-lock.json` (66 package entries added, root entry changed), `tests/invariants/test_browser_view_framework.py` (docstring, `UI_FRAMEWORKS` without `react`/`react-dom`, `FRAMEWORK_MARKERS` without the two React markers, `.tsx` moved from `FOREIGN_CODE_EXTENSIONS` to `TYPESCRIPT_EXTENSIONS`; `BUILT_PAGE` and every other name and marker untouched).

## Packages (exact pins)
- dependencies: `react` 19.3.1, `react-dom` 19.3.1.
- devDependencies: `esbuild` 0.28.2, `jsdom` 30.1.3, `@types/react` 19.3.0, `@types/react-dom` 19.3.0.
- `happy-dom` absent (0 hits in the lockfile before and after).
- Written with the local npm 12.2.1 (`node node_modules/npm/bin/npm-cli.js install --save-exact --ignore-scripts ...`), the version D-33 audits with.

## Per package: what it brings, install scripts, registry
All 66 new lock entries resolve from `https://registry.npmjs.org/` only.
- `react` 19.3.1: no deps of its own; no install script.
- `react-dom` 19.3.1: brings `scheduler` 0.28.0 (runtime, not dev); no install script.
- `@types/react` 19.3.0: brings `csstype` 3.2.3 (dev); no install script. `@types/react-dom` 19.3.0: no new deps; no install script.
- `esbuild` 0.28.2: brings 26 `@esbuild/<platform>` optional packages (dev, optional), including `@esbuild/win32-x64` and `@esbuild/linux-x64`. The only new package with an install script (`hasInstallScript`: esbuild itself). I installed with `--ignore-scripts`; `npm ci` later ran scripts normally and finished with exit 0.
- `jsdom` 30.1.3: brings 29 dev packages (`@asamuzakjp/css-color`, `@asamuzakjp/dom-selector`, `@bramus/specificity`, `@csstools/*` x6, `@exodus/bytes`, `bidi-js`, `css-tree`, `data-urls`, `decimal.js`, `entities`, `html-encoding-sniffer`, `is-potential-custom-element-name`, `mdn-data`, `parse5`, `saxes`, `source-map-js`, `tldts`, `tldts-core`, `tough-cookie`, `tr46`, `undici`, `w3c-xmlserializer`, `webidl-conversions`, `whatwg-mimetype`, `whatwg-url`, `xml-name-validator`, `xmlchars`); none has an install script.
- Audit under D-33 for all of the above: `python -B scripts/audit_dependencies.py`, exit 0, no new advisory against the fork point (it prints nothing on success).

## Checks (command, exit code)
- Test first / failing run: after the packages and before the test edit, `npm test -- tests/invariants/test_browser_view_framework.py` exit 1: `test_no_ui_framework_in_runtime_dependencies` failed with `['react', 'react-dom'] != []`.
- After the edit: same command, exit 0 (6 tests OK).
- Seen failing on another library, once each, with a made-up use of `preact` put in for a moment and restored:
  - in the code (a temporary `src/browser/zz-temp.ts` importing `preact`): same command, exit 1; `test_browser_source_imports_no_ui_framework` failed with `[('src/browser/zz-temp.ts', 'preact')] != []` (the built-page test failed too, since the build could not resolve `preact`). File deleted.
  - in the runtime dependencies (`"preact": "10.0.0"` added to `dependencies` in `package.json`): same command, exit 1; `test_no_ui_framework_in_runtime_dependencies` failed with `['preact'] != []`. `package.json` restored from a copy before the commit.
  - after both restores: same command, exit 0.
- `python -B scripts/audit_dependencies.py`: exit 0.
- `git grep -c "node_modules/@esbuild/linux-x64" -- package-lock.json`: `package-lock.json:1`, exit 0 (26 `node_modules/@esbuild/` entries in all).
- `npm ci` (global npm 11.13.0): exit 0. Only `@esbuild/win32-x64` lands on disk here, as expected for this machine.
- `npm test -- tests/invariants/test_application_package_layout.py`: exit 0.
- `npm test -- tests/quality/test_quality_invariants.py`: exit 0 (5 tests; covers the ESLint, Prettier and Ruff gates over the changed test file).
- Not run: the full `npm test` (the orchestrator's run); any run on jsdom (nothing imports it; safety rule kept); a Docker-needing test (none in this slice's checks).

## Own-work check
Requirement most likely missed: "the test still fails on another library in the code and in the runtime dependencies" while React itself no longer fails. Check: the two preact runs above (both exit 1 with the named assertion) and the final green run with React in `dependencies` and the lock. A `.tsx` file under `src/browser` was not exercised (none exists yet); `.tsx` now counts as TypeScript and as a text file, so a `.tsx` importing `preact` is read the same way as a `.ts`.

## Choices
- Reflowed the docstring to say "renders its screens with React and browser APIs, with no other UI framework" (the wording of row F4 and the invariant entry); noted in it that React is not on the list and that the bundle holds React's markers. Rejected: leaving the invariant sentence as before (would contradict the invariants file). Cost if wrong: docstring only.
- `--ignore-scripts` on the two `npm install` runs to write the lock without running esbuild's postinstall during the install; no effect on the lock content.
- Used the local npm 12.2.1 to write the lockfile (D-33 audits with it) and the global npm 11.13.0 for `npm ci`, as the check says `npm ci`. If the Linux image build uses npm 12, it reads the same lock.

## Reaches beyond the dispatch
- `foundations/invariants.md:35-44` (the browser-view-framework entry), to word the docstring as the entry reads. Already in the handoff's current ranges.
- `.runs/.../plan.md` grep for F4 only, to find the row; no other plan text read.

## Plan against the code
No mismatch. One observation: `npm install` printed "48 vulnerabilities (46 moderate, 2 high)" for the tree; the D-33 audit compares with the fork point and passed, so these were not introduced by this slice (guessed from the audit result, not itemised).

**Searches not found or unclear:** none
