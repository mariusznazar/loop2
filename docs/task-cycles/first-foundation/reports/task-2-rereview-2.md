# Task 2 fix round 2 re-review

## Finding verdict

1. **Browser-facing independent tooling is falsely rejected** — **ADDRESSED**. `tests/invariants/test_application_package_layout.py:45–69,119–125` now requires a locally built package's entry to fall under its TypeScript output and at least one corresponding source file to match the application's source bytes; `browser`, DOM typings, and a generic build alone do not trigger rejection. The appended author report names `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py -v`: the browser tooling control passes with `1 test, OK`, while the copied `apps/frontend` break fails with `apps/frontend/package.json defines a separate application package`. The unchanged package and compiler focused checks also pass, each with `1 test, OK`.

## New breakage in the fix diff

### Important — A separate browser application with its own source is accepted

**Anchor:** `tests/invariants/test_application_package_layout.py:66–69,119–125` — **NEW THREAD**.

**Do wklejenia:** The new byte-equality requirement rejects a copied application source but accepts an independently written `apps/frontend` application with its own TypeScript config, browser entry, build script, and HTML page. That is still a separate application package. Please recognize application-specific entry and page relationships without requiring its source bytes to match the current application.

**Dlaczego to zgłaszam:** The package check is meant to prevent a second browser/server application package outside the current source roots while allowing independent tooling. The prior round's false positive shows that `browser` plus DOM typings is insufficient by itself; exact source equality is now too restrictive in the other direction. The `copies_application_source` helper returns true only if a source file has a same-path counterpart under `src/browser` or `src/server` *and* identical bytes. A second browser application can compile its own `src/main.ts` to `dist/main.js`, expose that file through `browser`, and include an application HTML page while sharing no source bytes with the root application. The previous classifier at least considered owned HTML; the fix removes that signal entirely. In one focused check, I used a temporary root with copied root manifest, lock and application configs, minimal root browser/server sources, and a staged-equivalent `apps/frontend` package containing its own different `src/main.ts`, `index.html`, `browser: ./dist/main.js`, `build: tsc -p tsconfig.json`, and local DOM-enabled config. Invoking the exact `ApplicationPackageLayout.test_application_uses_only_the_root_package` assertion returned `ACCEPTED`. The temporary directory was removed automatically and the reviewed checkout was untouched. The author's copied-source break does not cover independently written application source. Relate the package entry to its HTML application page or another application-specific entry point; preserve the browser tooling control whose package has no application page.

## Out-of-scope observations

None.

## Verdict

**Fix round: Findings remain open** — the previous false positive is addressed, but the fix introduces the Important missed-application case at `tests/invariants/test_application_package_layout.py:66–69,119–125`. The author ran the two focused unchanged-product checks and both relevant disposable trials; I did not rerun either suite.
