# Task 2 fix round 1 re-review

## Finding verdicts

1. **Separate `apps/frontend` application package passes** — **ADDRESSED**. `tests/invariants/test_application_package_layout.py:86–103` follows the local `tsc -p tsconfig.json`, reads its DOM config, and combines that evidence with the `browser` entry, build script, and owned TypeScript. The appended fix report records the same staged `apps/frontend` break failing with `apps/frontend/package.json defines a separate application package`; the unchanged package check passes.
2. **Equivalent output spellings count as distinct** — **ADDRESSED**. `tests/invariants/test_application_build_layout.py:32–43` resolves both `rootDir` and `outDir` relative to their config files before comparing paths. The appended fix report records the `./dist/public` server mutation failing with `browser and server outDir must differ`; the unchanged compiler check passes.
3. **Hardcoded application output names misclassify tooling** — **ADDRESSED**. `tests/invariants/test_application_package_layout.py:17–25,60–62,88–91` derives the current application paths from configs and resolves script references relative to each package. The appended fix report records the unrelated `scripts/tooling` package using its own `dist/public` passing; no fixed output spelling remains in the classifier.

## New breakage in the fix diff

### Important — Browser tooling with a `browser` entry is rejected

**Anchor:** `tests/invariants/test_application_package_layout.py:96–105` — **NEW THREAD**.

**Do wklejenia:** A browser-facing tooling or library package with its own TypeScript, `browser` entry, `build: tsc -p tsconfig.json`, and DOM typings is rejected as a separate application package. Those fields show that it builds browser code, but do not establish that it owns this application's browser source. Please require an application-specific link or entry before rejecting such a package.

**Dlaczego to zgłaszam:** This classifier exists to catch a second application package while allowing unrelated tooling. The new `builds_own_application` condition accepts `browser` plus a DOM-enabled compiler config as proof of application ownership. A package at `scripts/tooling` that builds a browser test helper or reusable browser library can have exactly those fields, with its config, source and output entirely below `scripts/tooling`; it does not share or take over either application source tree. The original tooling control lacks the `browser` field and therefore does not cover this case. A focused check against the corrected assertion, using a temporary directory with copied root manifest, lockfile and configs, two minimal application source files, and that tooling package, returned `False is not false : scripts/tooling/package.json defines a separate application package`. The temporary directory was removed automatically; the reviewed checkout was untouched. Determine application ownership from its entry/config/source relationship to the application, rather than treating every browser-targeted package as an application. The analogous `main` plus Express heuristic at lines 97–103 may also classify a server-side tooling package as an application; this was not separately tested.

## Out-of-scope observations

None.

## Verdict

**Fix round: Findings remain open** — all three previous findings are addressed, but the new Important false rejection at `tests/invariants/test_application_package_layout.py:96–105` needs correction. The appended report provides the two focused green runs and the three reproduced break/control results; those suites were not rerun in this re-review.
