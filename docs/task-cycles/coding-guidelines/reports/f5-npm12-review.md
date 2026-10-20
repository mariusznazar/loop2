# F5 npm 12.2.1 — independent scoped review

## Spec compliance

**Verdict: Spec compliant for the assigned correction.** The supplied range `42125f5..9566785` changes only `scripts/check_dependencies.py` and `tests/quality/test_dependency_audit.py`, with 37 additions and 22 deletions. The exact npm pin is consistently advanced to 12.2.1 at the method, installed-package, bridge-response and fixture boundaries. The switch to the bundled HTTP client preserves the fixed public Bulk endpoint and introduced-pair JSON payload and supplies the response-status rejection that the lower-level client needs. No covered manifest, lockfile, foundation sentence or other author's method is changed.

**Cannot verify from this diff:** successful operation against an actually installed npm 12.2.1 distribution and the current registry. The supplied live run is an honest unavailable result, not an invariant pass. Unchanged pair discovery, historical-snapshot handling, advisory validation, severity selection and record-writing internals are outside this correction's diff; this review does not repeat their earlier review or infer whole-method acceptance from this small range.

## Strengths

- `scripts/check_dependencies.py:14`, `:30`, `:303` and `:306`: the accepted pin is enforced at the existing independent boundaries rather than accepting any local npm or installing one during a check. Historical comparison data is not rewritten to the new pin.
- `scripts/check_dependencies.py:44`: using npm's bundled `make-fetch-happen` makes the redirect option effective. The supplied official npm-registry-fetch 20.0.1 source enumerates forwarded fetch options and omits `redirect`; the supplied make-fetch-happen 16.0.1 source expressly rejects redirects in error mode. The implementation owns serialization and status validation explicitly after removing that wrapper.
- `scripts/check_dependencies.py:46` and `:50`: serialization sends the same introduced map, and an HTTP error with an empty valid JSON body cannot be interpreted as a clean advisory database. TLS verification, zero retries, explicit no-store caching and a fixed endpoint remain visible at the trust boundary.
- `tests/quality/test_dependency_audit.py:57` and `:308`: the remote double checks transport arguments and serializable body shape while Git, Node and semver matching remain real. The new adversarial case checks both exit 2 and `invariant: null` for six redirect/authentication/rate-limit/server statuses. Captured RED shows all six falsely passed without the adapter's status guard; captured GREEN shows that specific defect is rejected.
- `.runs/task-cycles/coding-guidelines/reports/f5-npm12-report.md`: the author distinguishes fixture success, static source evidence, unavailable live evidence and the failed application build without promoting any of those into a broader successful verdict.

## Issues

### Critical

None found in this range.

### Important

None found in this range.

### Minor — evidence noise, no product-code correction requested

**New observation; location:** `.runs/task-cycles/coding-guidelines/reports/f5-npm12-diffcheck.txt:1`.

**Do wklejenia:** The captured whitespace check includes Git's LF-to-CRLF conversion warnings for the two reviewed Python files. Its exit code is zero, but the output should be described as containing warnings rather than pristine.

**Dlaczego to zgłaszam:** Whitespace evidence should reveal its actual output, including environmental notices. Git says a later checkout/index operation may convert LF working-tree bytes to CRLF; it does not report whitespace errors, Python behavior changes or a failed check. The report already discloses those notices. Repairing repository line-ending policy in this independent adapter correction would expand scope without establishing a correctness benefit, so no code change or blocking action is requested. This observation is resolved by the existing disclosure and remains here to preserve the warning faithfully.

## Foundation and guideline selection

Read the complete product part map and invariants, product glossary, the current build-tools-scoped decision entries and the pinned process's foundation-reading procedure and relevant glossary terms. Complete Scope inspection selected D-01, D-02, D-03/2, D-04/3, D-05/3, D-06/3, D-27 and D-28 through D-33. Earlier versions were not substituted for current entries. The current audit rule is D-33/1 at `foundations/decisions.md:905`; the complete invariant is `introduced-npm-vulnerabilities/1` at `foundations/invariants.md:440`. D-33 has no Based on or Relations dependencies and the invariant has no Rests on dependency. Sources linked by unrelated deployment, icon, application or linter policies are not additional npm-audit policy. Whole-foundation topic search across all five elements found no second npm-audit policy to reconcile.

The complete `build-tools` entry assigns both changed paths and identifies `scripts/check_dependencies.py` as a trust boundary (`foundations/part_map.md:64`, `:88`), with the npm registry explicitly untrusted (`:158`). There is no affected user interface, declared critical flow or irreversible operation; the map declares no build-tools failure-mode criticality to inherit. A false pass could nevertheless admit an introduced vulnerable package, so unavailable transport must never become a clean database result.

Applied `.the-way/product-guidelines/reading.md` to this actual diff and read the coding template. A direct directory check confirms `guidelines/` is absent. Selected product guideline files: none; this enclosing task creates them. The missing general coding guidelines are an acknowledged task output, not a silent waiver. D-28 expressly defers separate build/test exemplars. No scope expansion or new selection discrepancy arose.

## Concrete risks checked

1. **Mixed pin expectations could leave the accepted configuration unavailable indefinitely.** The complete supplied diff was checked for all changed pin boundaries and fixture expectations. The declarations/locks/installed distribution are deliberately outside this author's write scope; their old version is reported in the captured input evidence. The captured live failure uses the new declared-and-locked diagnostic, consistent with the new guard.
2. **The wrapper replacement could change request serialization, redirect rejection or TLS behavior.** Checked the supplied official versioned source files `npm12-registry-fetch.txt`, `npm12-http-options.txt` and `npm12-http-fetch.txt`, and the npm package's declared bundled dependencies in `npm12-package.txt`. The registry wrapper serializes object bodies itself and omits redirect forwarding; the new adapter serializes that map explicitly. The lower-level client's options normalize zero retries and explicit strictSSL, and its fetch path throws on redirect mode error. The source-lock evidence identifies the same bundled versions. This is source verification, not an installed-client execution.
3. **HTTP errors carrying `{}` could give a false pass after removing wrapper error handling.** Checked the new status guard, six-status test and full captured HTTP RED/GREEN outputs. The status rejection occurs before the response text is accepted. The remote double models a raw response boundary and does not prove actual redirect/TLS behavior.
4. **The npm upgrade could silently alter concrete-advisory range matching.** Checked the pinned metavuln-calculator source's `includePrerelease:true, loose:true` and concrete `semver.satisfies` call against the unchanged bridge matching options in the diff. npm's source package/lock evidence names bundled semver 7.8.5; the fixture suite actually uses installed semver 7.7.4, so matching against the new bundled implementation remains an integration limit rather than a proven pass.
5. **The report could conceal a non-pass or noisy final test run.** Read complete final focused, HTTP RED/GREEN, live-final, failed application-build, source, source-lock, input and whitespace outputs with the relevant command metadata. Final focused output is clean: 36 tests, no skips, exit 0. The live check and application build are explicitly unsuccessful as below.

No suite, invariant method or network exchange was rerun by this reviewer: the supplied evidence answers the scoped code risks without duplicating the author's checks. Read-only inspection commands were not tests and made no product changes. No changed file was independently re-read beyond the supplied diff; a small metadata pass derived exact new-line anchors from that same package. No broader codebase crawl, next-stage work, fixes or subagents were used.

## Evidence and its limits

All paths in this section are below `.runs/task-cycles/coding-guidelines/reports/`; each captured output has adjacent `.txt.json` argv/exit metadata.

| Exact author command | Exit | Evidence read | What it establishes |
|---|---:|---|---|
| `python -B -m unittest discover -s tests/quality -p test_dependency_audit.py` | 0 | `f5-npm12-final-focused.txt` and metadata | All 36 focused tests pass; remote exchange is doubled, npm package metadata is miniature, semver is installed 7.7.4. |
| `python -B -m unittest discover -s tests/quality -p test_dependency_audit.py -k unsuccessful_http` | 1 then 0 | `f5-npm12-http-red.txt`, `f5-npm12-http-green.txt` and GREEN metadata | Six failing RED subcases, then a passing focused case; rejects error statuses instead of treating empty JSON as clean. |
| `python -B scripts/check_dependencies.py --fork-point c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/dependency-audit.jsonl` | 2 | `f5-npm12-live-final.txt` and metadata | Unavailable with `invariant:null` because root npm is not declared/locked at 12.2.1. No live vulnerability verdict. |
| `npm.cmd test` | 1 | `f5-npm12-npm-test.txt` | Build fails before application tests at missing `node_modules/typescript/bin/tsc`; application regression is unchecked. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f5-npm12-source.py` | 0 | `f5-npm12-source.txt` and saved source files | Static inspection of versioned official sources; no fetched code installed or executed. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f5-npm12-source-lock.py` | 0 | `f5-npm12-source-lock.txt` | Pinned npm source lock names semver 7.8.5, make-fetch-happen 16.0.1, npm-registry-fetch 20.0.1 and metavuln-calculator 10.0.0. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f5-npm12-inputs.py` | 0 | `f5-npm12-inputs.txt` | Observed manifest, root lock and installed npm were 11.13.0 at author verification. |
| `git diff --check` | 0 | `f5-npm12-diffcheck.txt` | No whitespace error; disclosed LF-to-CRLF notices remain. |
| `git diff --cached --check` | 0 | `f5-npm12-staged-diffcheck.txt` | No staged whitespace error. |

## Declined and out-of-scope items

- Installing or changing package.json/package-lock.json would violate this independent check author's boundary. The live failure is retained for the owning product stage, not fixed here.
- Replacing the remote double with networked unit tests would make transport availability govern the focused suite; actual installed-client/registry integration belongs to the required later live run. No fresh coverage-only objection is raised.
- This scoped review neither reopens accepted npm 12.2.1/D-33 nor repeats earlier whole-method review. It finds no rule weakening, suppression, silent success or unrequested fallback in this correction.
- Final deliberate-break checks and guideline good/bad-case acceptance on complete product code remain later. Guideline form, other methods, whole-branch review, complete regression and merge readiness are not accepted by this report.

## Assessment

**Task quality: Approved for this scoped range.** The small change implements the accepted pin consistently and supplies the necessary fail-unavailable guard at the newly explicit HTTP boundary. No blocking implementation finding remains.

**Unresolved concerns for the controller:** (1) install/declare/lock the accepted product npm and run the original-fork live invariant against the real npm 12.2.1 bundled client and semver/current database; (2) repair the incomplete product installation and obtain application-test evidence, whose supplied run stopped at missing TypeScript before tests; (3) retain the later complete-product deliberate-break, guideline-case and whole-cycle acceptance boundaries. This approval does not resolve those concerns or convert their current results into passes.
