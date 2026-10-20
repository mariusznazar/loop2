# F5 npm 12.2.1 correction

Status: DONE_WITH_CONCERNS at the committed independent-author boundary. Return before independent review. The adapter and focused fixtures are complete; the real product invariant remains unavailable until the accepted npm pin is installed by the product author. No installation, review, merge, push or deployment was performed.

## Inputs and selection

- Worktree: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`; branch `task/coding-guidelines`, upstream `origin/task/coding-guidelines` (matching names).
- Start: `42125f5dd4cf91d50406ccb6415610c5179a837b`. Final: `95667855d9e8be3616b1dbb545c8bcdc35de4d09`.
- Read the whole `f5-npm12-handoff.md`, `author-contract.md` and `f5-handoff.md` first; product AGENTS.md/CLAUDE.md, Superpowers 6.4.1 TDD and writing-good-tests.md, implementer-prompt.md, current method and its complete focused tests, quality_support.py and f1-report.md. No product-author reasoning, plan, frozen task or excluded branches were read. No subagents were used.
- The gitlink and checked-out `.the-way` both equal `d829e3aa6242a9b8901274531dd82fd5c7d87628`.
- Read D-33/1 whole and introduced-npm-vulnerabilities/1 whole. D-33 now adopts local npm 12.2.1; invariant citation is `D-33@f820c28f`; it has no Rests on dependency and D-33 has no Based on or Relations dependency. The original fork remains `c379207bfd8bd148d3589ea75604ba5165915d01`.
- Read the whole current part map and refreshed selection by `.the-way/product-guidelines/reading.md` and `.the-way/elements/common/way_of_working.md`; read the coding template. These two files belong to build-tools. The relevant external boundary is untrusted public registry data entering scripts/check_dependencies.py. No UI or critical flow is changed.
- Inspected the complete current decision Scope fields. Current build-tools matches are D-01, D-02, D-03/2, D-04/3, D-05/3, D-06/3, D-27 and D-28 through D-33; these entries were read whole. Only D-33 defines this adapter's audit policy; D-28 explains deferred build/test exemplars. Linked facts about unrelated linter sets/icon licensing were discovered rather than treated as audit inputs. Read the product glossary and the pinned process glossary terms used here; whole-foundation search for npm, audit, registry, dependency and vulnerability located no additional audit policy.
- Selected whole-read product guidelines: none. `guidelines/` and `guidelines/coding.md` are absent, as announced; this task creates them. No selection expansion or new discrepancy was found. No separate build/test-kind guideline is required by D-28.
- Read package.json and inspected actual package-lock v3 input: 342 package-table entries, root declaration and locked npm both 11.13.0. Installed npm is also 11.13.0, with semver 7.7.4. These files and covered dependencies were not modified. Exact input observations are in `f5-npm12-inputs.txt`.

## Changed files and commit

Commit: `9566785 fix: align dependency audit with npm 12.2.1`.

| File | Added | Removed |
|---|---:|---:|
| scripts/check_dependencies.py | 13 | 12 |
| tests/quality/test_dependency_audit.py | 24 | 10 |

Only these explicit paths were staged and committed. Reports remain ignored and previous reports were preserved. Final `git status --short` was empty. Existing file bytes were preserved during scripted substitutions; the existing LF/CRLF Git conversion notices were not repaired as unrelated work.

The adapter requires npm 12.2.1 consistently in the current root declaration, current root lock, installed npm manifest, Node bridge and bridge result. The fixture's accepted pin follows the decision independently. Historical snapshots remain compared with their historical dependency data, without requiring the current tool pin there. Pair collection, aliases, original-fork comparison, concrete advisory ranges, low/moderate/high/critical blocking, info exclusion and fail-unavailable records are unchanged.

## Pinned source and implementation choices

Official source research used unauthenticated HTTPS and a generic header. Full source files are saved under this report directory; `f5-npm12-source.py`, `f5-npm12-source.txt` and its JSON evidence record the exact URLs, byte counts and successful retrieval. No fetched code was installed or executed. An additional read of the official npm 12.2.1 package-lock.json confirms exact bundled versions: semver 7.8.5, make-fetch-happen 16.0.1, npm-registry-fetch 20.0.1 and metavuln-calculator 10.0.0; those are the versioned sources above, not versions inferred only from dependency ranges. Full lock source: `npm12-lock.txt`; retrieval and extracted versions: `f5-npm12-source-lock.txt` and adjacent JSON. Source URL: https://raw.githubusercontent.com/npm/cli/v12.2.1/package-lock.json.

1. **Accept the settled npm version at every existing boundary.** Keeping 11.13.0 would make the accepted product configuration unavailable indefinitely; accepting arbitrary versions would weaken the local pin. The change replaces the former exact pin throughout the method and its miniature product fixtures. Cost: a later accepted npm upgrade must change these expectations again.
2. **Keep npm's concrete advisory matching semantics.** The npm 12.2.1 Arborist source still submits actual package names and concrete versions to the Bulk endpoint. Its metavuln-calculator v10.0.0 source still matches concrete advisories with semver `includePrerelease:true, loose:true`. No range-policy rewrite was needed. The npm package source lists/bundles semver and make-fetch-happen. Sources: https://raw.githubusercontent.com/npm/cli/v12.2.1/package.json (`npm12-package.txt`), https://raw.githubusercontent.com/npm/cli/v12.2.1/workspaces/arborist/lib/audit-report.js (`npm12-audit.txt`), https://raw.githubusercontent.com/npm/metavuln-calculator/v10.0.0/lib/advisory.js (`npm12-advisory.txt`). The fixture run uses installed semver 7.7.4; it is not a runtime test of npm 12.2.1's bundled semver. That integration remains explicitly unchecked.
3. **Use the HTTP client already bundled with npm for explicit request mechanics.** npm-registry-fetch v20.0.1 does not forward `redirect` to its HTTP client. Keeping the wrapper would leave the existing redirect setting ineffective. Its underlying make-fetch-happen v16.0.1 directly supports redirect control, TLS verification, retry settings and cache control. The adapter now invokes that already-installed bundled client, serializes the same introduced name/version map as JSON and supplies HTTP headers explicitly. It reads no npm configuration, sends no application code or credentials, and adds no fallback endpoint. Source: https://raw.githubusercontent.com/npm/npm-registry-fetch/v20.0.1/lib/index.js (`npm12-registry-fetch.txt`); https://raw.githubusercontent.com/npm/make-fetch-happen/v16.0.1/lib/options.js (`npm12-http-options.txt`); https://raw.githubusercontent.com/npm/make-fetch-happen/v16.0.1/lib/fetch.js (`npm12-http-fetch.txt`). Cost: the adapter owns JSON serialization and HTTP-status checking that the wrapper formerly supplied, and a future internal API change may make it unavailable until adapted.
4. **Treat redirects/error statuses as an unsupported exchange, not a vulnerability finding.** `redirect:'error'` now takes effect, retry remains explicitly zero, and `cache:'no-store'` makes the current-database request explicit. No product prohibition or foundation meaning is added: a successful verdict requires the supported complete response from the fixed public Bulk endpoint; other transport behavior gives exit 2 and invariant:null. A newly introduced version may thus remain unchecked during an endpoint redirect or outage until the adapter/environment is repaired. Automatically following arbitrary endpoints would broaden the transport being trusted. The method requires HTTP 200 before interpreting the body. The direct client does not automatically reject all HTTP errors, so omitting this guard would let an error body shaped as `{}` masquerade as no advisories.
5. **Keep installations with the product author.** Installing npm 12.2.1 here would alter covered packages/manifests outside this author's write set. Leaving the product installation untouched preserves independent checking and honestly leaves the live invariant unavailable. The next installation must declare and lock root npm exactly 12.2.1 and install its bundled semver and make-fetch-happen; the adapter never obtains a tool during checking. Node 24.17.0 meets the npm source's Node 24 range beginning at 24.15.0. The compiler-path installation issue belongs to the product stage, as root confirmed.

## Check evidence and counts

All evidence paths below are relative to `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/`. Each `.txt` contains complete combined stdout/stderr, with the exact argv, actual exit and elapsed time in its adjacent `.txt.json`. Commands in the table are the captured inner commands; each was run through `python -B .runs/task-cycles/coding-guidelines/reports/capture.py <output> <command...>`.

| Exact command | Exit | Full output | Verdict |
|---|---:|---|---|
| `python -B -m unittest discover -s tests/quality -p test_dependency_audit.py` | 1 | f5-npm12-pin-red.txt | Pin RED: 35 tests, 28 expected assertion failures while fixtures accepted 12.2.1 and the method still required 11.13.0. |
| `python -B -m unittest discover -s tests/quality -p test_dependency_audit.py` | 0 | f5-npm12-pin-green.txt | Pin GREEN: 35 tests pass after changing the method pin. |
| `python -B -m unittest discover -s tests/quality -p test_dependency_audit.py -k unsuccessful_http` | 1 | f5-npm12-http-red.txt | HTTP RED: one test with six failing subcases (301,307,401,429,500,503); each miniature raw response carried `{}` and the adapter returned 0 rather than unavailable. |
| `python -B -m unittest discover -s tests/quality -p test_dependency_audit.py -k unsuccessful_http` | 0 | f5-npm12-http-green.txt | HTTP GREEN: all six error-status subcases are unavailable with invariant:null. |
| `python -B -m unittest discover -s tests/quality -p test_dependency_audit.py` | 0 | f5-npm12-final-focused.txt | Final: all 36 tests pass, no skips; 79.630 seconds unittest time. |
| `python -B scripts/check_dependencies.py --fork-point c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/dependency-audit.jsonl` | 2 | f5-npm12-live.txt | Intermediate live check unavailable: npm 12.2.1 must be declared and locked locally. |
| `python -B scripts/check_dependencies.py --fork-point c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/dependency-audit.jsonl` | 2 | f5-npm12-live-final.txt | Final live check remains unavailable with invariant:null for the same declared/locked-pin mismatch. No named verdict and no registry request. |
| `npm.cmd test` | 1 | f5-npm12-npm-test.txt | Application suite stopped during build: MODULE_NOT_FOUND for node_modules/typescript/bin/tsc; no application tests ran. Root confirmed this as the unfinished product installation and instructed no repeated broad suite. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f5-npm12-source.py` | 0 | f5-npm12-source.txt | Six official versioned source resources retrieved, no installation or execution. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f5-npm12-source-lock.py` | 0 | f5-npm12-source-lock.txt | Official pinned npm source lock confirms the exact bundled API versions used for research. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f5-npm12-inputs.py` | 0 | f5-npm12-inputs.txt | Read-only actual pin, lock-format/entry-count and installed semver observations. |
| `git diff --check` | 0 | f5-npm12-diffcheck.txt | No whitespace errors; existing line-ending conversion notices only. |
| `git diff --cached --check` | 0 | f5-npm12-staged-diffcheck.txt | No staged whitespace errors. |

The HTTP RED is evidence that the adapter itself did not inspect raw response status. It does not show that the old real npm-registry-fetch wrapper would accept a real HTTP 500: that wrapper performs its own error checking. The added guard is necessary when using its underlying client directly, and the miniature remote fixture now models that client's status/text response boundary. Existing literal payload assertions establish that serialization still sends only the expected introduced real identities and versions.

## Self-review, weakest point and sharpness

Read the complete diff before commit and verified the committed file set and clean status afterward. No foundation sentence, manifest, lock, configuration, shared mechanics or other author's check changed. The existing alias, scoped identity, tarball-identity ambiguity, nested manifests, multiple versions, optional/dev/peer dependencies, prerelease/range, malformed advisory, duplicate-key, network, missing-tool, missing-base/lock, stale-record and valid offline-comparison cases all continue to pass.

Weakest point chosen: an unsuccessful remote response with syntactically valid empty JSON. The six-status adversarial test proves that it cannot produce a successful or named vulnerability verdict, including redirect, authentication, rate-limit and server-error shapes. A wrong or removed HTTP status guard makes this new test fail. Existing successful-response fixtures and unchanged-pair offline coverage exercise the positive branches. Practical limit: the test replaces the remote exchange, so it does not prove real npm 12.2.1 installation, live TLS/network availability or redirect behavior of an installed pinned client. Source inspection supports the selected API; the live installed integration is still required later.

Sharpness: actual diff affects build-tools only, at the registry/tool-output trust boundary. A false success could admit an introduced vulnerable package, so malformed/unavailable data must retain no named verdict. The diff performs no irreversible action and changes no deployment or runtime product behavior. The map lists no build-tools failure-mode criticality; no new criticality label is invented. UI/screenshot evidence is unchecked because this change has no intended visible UI behavior.

## Unresolved work for next dispatch

- Independent review is next; this author does not invoke it.
- Live introduced-npm-vulnerabilities/1 is unavailable (exit 2), not passed: product manifest/lock and installed npm are still 11.13.0. After product installation of the accepted pin, root must run the original-fork method and assess the current registry result.
- npm 12.2.1's real bundled client/semver integration is not executed in this correction. Focused tests used real Git/Node/parsers and installed semver 7.7.4, with miniature npm package metadata and a remote-exchange double.
- Application `npm.cmd test` failed at the missing TypeScript compiler path before tests; root owns the established product-installation correction. No repeat application/broad suite was run.
- Whole-cycle checks, guideline form, other methods and any remaining foundation work belong to root. No new foundation/design question was found.
