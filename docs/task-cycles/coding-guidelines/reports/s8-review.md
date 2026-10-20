# S8 independent task review

## Spec compliance

**Spec compliance: PASS.** Reviewed range `1efd0c87134064ec960bb73cc1c461004a482bdc..6bdc613d5fe8a0eb7fbdc51501d956009ea8eb9d`, using the complete supplied `s8-review-package.txt`. Every brief path has its corresponding formatting hunk: `src/server/app.ts:1`, `src/server/main.ts:1`, `tests/http.test.mjs:1`, `tests/startup.test.mjs:1`. No extra product path or behavior was introduced in this range.

The four files preserve route handling, startup diagnostics, inputs and assertions. Exact pinned-formatter output comparison and normalized parsed syntax evidence cover all four, rather than only implementation code. The brief's typecheck, build, formatting and HTTP/startup checks have captured successful results.

## Strengths

- `src/server/app.ts:13`: the `/api` middleware remains before static serving, with status 404 and the same JSON body. The static root remains relative to the compiled module, not the working directory (`src/server/app.ts:7`).
- `src/server/main.ts:3`: host/port defaults, whole-number validation, range limits, readiness event and startup-error handling retain their original expressions and messages. The wrapping at `src/server/main.ts:21` preserves the nullish error-code fallback inside the template literal.
- `tests/http.test.mjs:46`: raw `node:http` request paths remain intact, so adversarial traversal cases are not silently normalized away. Exact response-body comparisons, HEAD handling and non-HTML controls remain substantive assertions (`tests/http.test.mjs:77`, `tests/http.test.mjs:94`, `tests/http.test.mjs:123`).
- `tests/startup.test.mjs:7`: occupied-port failure, configured-address readiness and five invalid port values remain real process tests. Parentheses added to close callbacks retain their conditional resolve/reject behavior.

## Findings

### Critical

None.

### Important

None.

### Minor

None. No new review thread or follow-up correction is requested.

## Scope and source selection

Read the task brief, frozen task and accepted npm-pin amendment, author report, reviewer prompt, code-review playbook, pinned guideline-reading procedure, complete part map, complete invariants and product glossary. Read applicable current decision entries D-01/1, D-02/1, D-05/3, D-06/3, D-07/1, D-28/1 through D-33/1 and D-37/1, together with their relevant linked D-08/1 and D-27/1 context and Node/ESLint/TypeScript-eslint environment facts. D-33 uses the accepted 12.2.1 pin; the original audit fork remains c379207bfd8bd148d3589ea75604ba5165915d01.

All four paths belong to account-server. The source files touch its trust boundary; no interface screen or simulation code changes. `app.ts` is the adopted HTTP-application exemplar; the main entry point and existing tests are deferred exemplar kinds under D-28. `guidelines/` is currently absent, matching the task's creation of those files in S11. Consequently no applicable existing guideline file can be selected; this is an expected later deliverable, not a waiver or an S8 omission. No new kind, new foundation meaning or expanded selection is required by these formatting hunks.

## Concrete risks checked and evidence

1. **Coordinated implementation/test changes could conceal a behavior change.** Read the whole diff once and inspected `reports/s8-preservation.mjs` in full. Its comparison reads each original file at the exact base commit, parses TS/JS with diagnostics checked, compares child structures and literal/identifier values while ignoring expression parentheses, then requires exact equality with Prettier 3.9.10 formatting of the original and absence of CR. The explicit configuration is empty (`prettier.config.mjs:1`), so its default-format call agrees with that configuration. `s8-preservation-final.log` and its command/exit metadata report all four files passing and two positive controls detecting changed error text and status. AST comparison alone is not a semantic proof; exact formatter equality, manual inspection and runtime evidence complement it.
2. **API/static precedence or untrusted path handling could regress.** Compared all routing and HTTP assertion hunks; read the full existing `test_loop2_api_error_route.py`. Captured `s8-http-startup.log` records 11 passed, zero failed/skipped/cancelled tests, covering 28 API path/method combinations, three ordinary misses and eleven traversal/private-file/malformed-encoding paths. `s8-api-invariant.log` records two successful tests; its unchanged source supplies 54 unmatched API combinations and a built-page positive control. Exact command arrays and zero exit codes are retained in their adjacent JSON files.
3. **Startup wrapping or callback parentheses could alter failure handling.** Compared all startup hunks; read the full existing `test_account_server_occupied_address.py`. The Node test log covers occupied port, configured listening address and five invalid strings. `s8-occupied-invariant.log` records its single passing test; its source verifies successful launch before and after blocked launch and nonzero failure without readiness while the blocker remains live. Its adjacent JSON records the exact command and exit 0.
4. **Formatting could break compilation or drift from the adopted pin.** Read `package.json`, empty formatter configuration, version evidence, captured typecheck/build/format-check logs and command/exit JSON. `npm.cmd run typecheck`, `npm.cmd run build` and the explicit four-path local Prettier check all exit 0. Version evidence gives Node 24.17.0, Prettier 3.9.10, API TS 6.0.2, compiler 7.0.2, npm 12.2.1 and Express 5.2.1. `s8-diff-check.log` is empty with exit 0.

The retained initial preservation-helper failure includes raw SourceFile text and therefore objects to quote changes; the final helper excludes only that raw-source field while keeping parsed content checks. This is a corrected evidence-helper defect, not a product regression or weakened product rule. The failed inline version command is also disclosed and superseded by file-based version evidence. Neither is presented as a successful run.

## Declined and out-of-scope items

No routine checks were rerun: the existing captured runs answer the concrete risks raised by this diff. No subagents, fixes, product writes, branch/index changes or later-stage work were performed. Existing test architecture and potential broader coverage are not redesigned in a format-only slice. No invariant or guideline-case definition changes occur in this range; final deliberate-break acceptance, S11 guideline creation, complete standing-format check, full gate and whole-branch review remain later controller work. Container deployment and the public route are not established by these local-process tests.

## Assessment

**Task quality: APPROVED.** The diff contains only expected formatter transformations and preserves the server/test responsibilities and observable behavior. The evidence is appropriate for this narrow trust-boundary formatting slice; no unresolved S8 concern was found.
