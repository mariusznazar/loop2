# Task 2 fix round 4 re-review

## Finding verdict

1. **Unrelated tooling HTML page causes a false application classification** — **ADDRESSED**. `tests/invariants/test_application_package_layout.py:48–74,107–111` parses actual `<script src>` values and resolves each against the page and its first `<base href>`, then compares the local path with the package's compiled browser entry. A tracked page that merely exists or mentions the entry in a comment no longer satisfies the application condition. The appended report records the exact focused command `python -B -m unittest discover -s tests/invariants -p test_application_package_layout.py -v`: unchanged product `Ran 1 test`, `OK`; copied and independently written `apps/frontend` packages each fail with `apps/frontend/package.json defines a separate application package`; browser tooling with no page, with an unrelated page, and with its own `dist/public` output each reports `Ran 1 test`, `OK`. The unchanged compiler check is also reported red on both `dist/public` and `./dist/public` merged-output mutations, each at `browser and server outDir must differ`.

## New breakage in the fix diff

None at Critical or Important severity. The changed parser reads script attributes rather than comments or text, resolves relative URL segments and query/fragment suffixes, and leaves copied-source recognition intact. The reported independent frontend has a page script linked to its compiled entry; the unrelated tooling page does not.

## Out-of-scope observations

None. Dynamic imports and server-specific URL rewrites are outside this static check; the author states that limit in the implementation report.

## Verdict

**Fix round: All findings addressed, no new Critical/Important breakage.** The author's focused unchanged-product run and seven disposable trials give the covering outputs above. I did not rerun the suites or run an additional check.
