# Task 2 fix round 3 re-review

## Finding verdict

1. **An independently written `apps/frontend` application is accepted** — **ADDRESSED**. `tests/invariants/test_application_package_layout.py:61–79,130–137` now matches the package's compiled `browser` entry to a TypeScript source and accepts a tracked `index.html` at the package or source root as application evidence without requiring identical source bytes. The appended author report names the focused command `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py -v`: the independent frontend and copied-source frontend trials both fail with `apps/frontend/package.json defines a separate application package`, while browser tooling without a page and the unchanged product each pass (`Ran 1 test`, `OK`).

## New breakage in the fix diff

### Important — An unrelated tooling HTML page is treated as an application page

**Anchor:** `tests/invariants/test_application_package_layout.py:75–79` — **NEW THREAD**.

**Do wklejenia:** Any tracked `index.html` at the package or source root now makes a browser-targeted tooling package look like a separate application, even when that page never references its compiled browser entry. A documentation or test fixture page beside `scripts/tooling` is enough to fail this invariant. Check the relationship between the page and the built entry before using the page as application evidence.

**Dlaczego to zgłaszam:** This check must reject separate application packages and preserve unrelated tooling. The new condition tests only `page.is_file()` and whether that path is tracked; it never reads the page or checks a script/module reference to `entry_path`. A browser utility package can legitimately have its own TypeScript source, DOM config, `browser: ./dist/main.js`, and generic build, plus an `index.html` fixture that contains documentation and does not load `dist/main.js`. The author's green tooling control has no page, so it does not cover this changed branch. One focused check used a temporary root with copied root manifest, lock and application configs, minimal root sources, and `scripts/tooling` with that browser utility structure and a tracked `index.html` containing only fixture text. Calling the exact `ApplicationPackageLayout.test_application_uses_only_the_root_package` assertion returned `REJECTED: True is not false : scripts/tooling/package.json defines a separate application package`. The temporary directory was removed automatically; the reviewed checkout was untouched. A page reference to the compiled entry, or equivalent application-specific linkage, would distinguish this case while retaining the author's independent-frontend break, whose page has a script entry.

## Out-of-scope observations

None.

## Verdict

**Fix round: Findings remain open** — the independently written frontend is now rejected, but the fix adds the Important tooling false positive at `tests/invariants/test_application_package_layout.py:75–79`. The author's focused suite and three disposable trials were not rerun; I ran only the stated targeted false-positive check.
