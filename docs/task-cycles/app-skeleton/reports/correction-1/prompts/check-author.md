# Prompt — invariant check author C (correction 1)

Dispatched by the orchestrator (Claude Opus 5.5), fresh general-purpose agent, inherited model.

- Delegation: questions return to the orchestrator; never ask the human.
- Isolation (WAY-69, task-cycle step 11): must not read src/, tests/ (other than the new tests/invariants/), dist/, scripts/, docs/, .runs/ (other than writing its report), git history or diffs. May read README.md, package.json, package-lock.json (names/versions), tsconfig.browser.json, tsconfig.server.json, .gitignore, foundations/ (read-only), .the-way/. If a check cannot be written without seeing code, say so.
- Write boundary: new files in tests/invariants/ and its report; no commits.
- Stage boundary: checks exist and were run once.
- Read first: .the-way/gate/run_tests.py docstring; invariants template "Method" and "Test"; WAY-61, WAY-65, WAY-69.
- Invariants (version 1), method `python -B .the-way/gate/run_tests.py tests/invariants --record .runs/invariant-tests.jsonl`:
  1. account-server-runtime — The account and save server's TypeScript source and deployment use Node.js major version 24.
  2. account-server-typecheck — The account and save server's TypeScript types are checked before deployment.
  3. account-server-express-http — The account and save server handles its HTTP routes and responses through Express 5.
  4. browser-view-framework — The browser view uses TypeScript and browser APIs to render its screens, with no UI framework in its code or runtime dependencies.
  5. loop2-api-error-route — An unmatched `/api/` request receives an API error response, never the built game's HTML page.
  Context: skeleton, no deployment configuration yet; a check may cover deployment files where they exist and must say what it does when none exist.
- How: Python unittest `tests/invariants/test_*.py`, `# invariant: <id>/1` inside each citing test body; may run package.json commands (npm via shutil.which), start the built server, use stdlib HTTP, read files and scan sources at run time; deterministic, time-bounded, clean up processes, fail clearly on an occupied port; made-up input (e.g. a type error) as literals in a temporary copy; expected values as literals; module docstring on coverage and non-coverage.
- Run once; report exit code and verdicts; do not tune checks to unseen behaviour — report failures as they are.
- Report: reports/correction-1/check-author.md; reply ≤20 lines.
