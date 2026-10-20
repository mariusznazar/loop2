# F5 real-installation correction — alias peers and authentic Bulk schema

Status: DONE_WITH_CONCERNS at the independent check-author boundary. Method corrections and focused verification are complete. The actual original-fork audit now gives a genuine **named invariant failure, exit 1**, for introduced vulnerable versions inside pinned npm 11.13.0. It is no longer unavailable on these inputs. Root owns the resulting task/pin/threshold conflict and independent review; product work remains paused. No pin, threshold, manifest, lock, shared mechanics, configuration or foundation was changed here, and no installation or audit fix was attempted.

## Inputs and scope

- Worktree `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines`, branch `task/coding-guidelines`, assigned start `34e7d2a7c9d67845a983eb626029d92f3cf5cf36`. Original fork remains `c379207bfd8bd148d3589ea75604ba5165915d01`. Final range `34e7d2a7c9d67845a983eb626029d92f3cf5cf36..403c446f5b90c408e013f176516ebc16e8a30a0c`; commit `fix: audit aliased peers and authentic bulk advisories`. Exact commit command/output/exit 0 are captured in f5-integration1-commit.txt and its sidecar. Private author identity was verified; post-commit index is empty and status contains only the two original unstaged product-author inputs.
- Read the whole integration handoff and author contract; resumed the original final-sentence dependencies and reread whole introduced-npm-vulnerabilities/1 and D-33/1. Read the complete current adapter (retrieval truncation recovered separately), affected test fixtures, actual root manifest and relevant lock records, installed npm implementation and root's actual audit error. No plan, frozen task or product-author reasoning/report was read. No subagent or next stage was invoked.
- Refreshed whole part map and guideline-reading procedure. Only build-tools is affected. No product guidelines exist yet; the previously recorded creation gap remains and the selected set stays empty. Earlier whole-read coding template/common foundation procedure and D-28 deferral still apply; no selection expansion or new foundation meaning is introduced. No UI route/visible change exists, so screenshot checks are unchecked for that reason. Verified the-way checkout and gitlink both `d829e3aa6242a9b8901274531dd82fd5c7d87628`.
- Local product tool is now npm **11.13.0**, installed by the paused product stage, with its real npm-registry-fetch and semver. Previous runtime version evidence is Python 3.14.3 and Node v24.17.0. Tests use real Git/Node/semver and replace only the external response; live audit uses the real installed client and current database, without fixture substitution.

## Mechanism and corrections

1. **Valid alias resolution.** Root's observed failure was independently verified using the pinned product npm's Arborist.loadVirtual, without network/installation. `node_modules/typescript` has installation name `typescript`, actual package name `@typescript/typescript6`, version `6.0.2`; all **nine** incoming peers are valid according to npm. Complete evidence is f5-integration1-state-before.txt. Read installed `node_modules/npm/node_modules/@npmcli/arborist/lib/edge.js:105` (installation-name check), `dep-valid.js` whole (ordinary version/range validation against the child's version), and actual alias/peer declarations. The previous collector incorrectly required a normal peer's installation name to equal its provider's real package name.

   Normal range references now resolve by the requested installation path and still validate the provider version against the range. Only an explicit `npm:<real-name>@<range>` specification asserts the real package name and retains that equality check. The same npm semantics apply to ordinary references; no artificial peer-only policy is added. Actual package pairs still come from the lock's real identity, with unchanged complete canonical source validation, and are audited under that actual name. Alternative peer-only bypass would accept the current example but reject npm's equivalent ordinary range reference; replacing the real name with the install name would audit the wrong package. Neither alternative was used.

2. **Authentic Bulk advisory shape.** After the alias correction the real original-fork method reached the registry and returned exit 2/null because actual advisory objects omit nested `name`; the validated outer map key supplies the package identity. Preserved complete raw request/response in f5-integration1-node.jsonl and printed every object in f5-integration1-live-evidence.txt. This was reported to root before any parser edit. Root independently confirmed and explicitly approved bounded support: omitted nested name uses the already-validated submitted outer key; if name is present it must match exactly, so null/empty/conflicting/nonstring values remain unavailable.

   Installed npm source confirms this shape: `@npmcli/arborist/lib/audit-report.js:117–120` passes outer `name` separately to calculate(name, advisory), and `@npmcli/metavuln-calculator/lib/advisory.js:25` fills a missing source.name from that name. The duplicate-name requirement was an extra adapter constraint rejecting authentic data, not a foundation policy. The correction changes only missing-key fallback; submitted-name membership, concrete advisory mandatory fields, ids, severities, strict JSON, ranges and complete matching remain enforced. Cost: support for both authentic omitted-name output and explicit matching names adds a small schema branch; present malformed/conflicting names cannot silently fall back. No threshold or acceptance-policy change occurred.

## Files and review

| File | Added | Removed |
|---|---:|---:|
| scripts/check_dependencies.py | 4 | 2 |
| tests/quality/test_dependency_audit.py | 92 | 0 |

Reviewed the complete diff and explicit staged set. New tests exercise valid/known-vulnerable alias peers, explicit alias conflict, unsatisfied version range, conflicting tarball version, a present optional peer provider, equivalent ordinary range references, omitted advisory name with matching/nonmatching/info outcomes, malformed present names, invalid ranges and unsubmitted groups. All earlier identity, historical/current pin, duplicate JSON, prerelease, source traversal, no-new-pair and missing-data tests remain in the final 35-test run.

The weakest related boundary is mistaking an optional present alias provider for an excluded dependency or accepting a conflicting explicit alias after relaxing ordinary reference names. Dedicated tests prove the actual alias package is still audited and a matching high advisory blocks, while explicit mismatch returns unavailable before a request. Authentic omitted-name response is also tested independently of peer resolution, preserving malformed-name/range/group rejection. No unresolved method limitation was found after these corrections; the separate live product invariant violation is recorded below.

Sharpness: build-tools at both lock identity and untrusted registry response boundaries. Wrong identity or schema acceptance could create a false success; over-rejection prevented valid graphs from reaching a database verdict. The fix retains exact actual pairs, explicit alias/source checks, full graph/range validation and complete supported-response validation. No runtime/product state or irreversible action changed. The database verdict is time-sensitive, and this report does not claim a future registry result or tarball-content verification.

## Focused check evidence

All named output/evidence files live in `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/`. Complete sanitized stdout/stderr is in each `.txt`; exact argv, actual child exit and duration are in its adjacent `.txt.json`. All network content is public advisory data; no credentials/customer data are present.

| Exact command | Exit | Complete output | Meaning |
|---|---:|---|---|
| `python -B .runs/task-cycles/coding-guidelines/reports/f5-integration1-state.py` | 0 | f5-integration1-state-before.txt | Real npm alias/peer validity and untouched-input starting hashes; initial index empty. |
| `python -B -m unittest discover -s tests/quality -p test_dependency_audit.py -k alias_peer` | 1 | f5-integration1-red.txt | Seven tests, four RED failures: valid/low-vulnerable/optional-provider/ordinary alias references wrongly unavailable. Adversarial controls already reject. |
| same exact focused alias command | 0 | f5-integration1-alias-green.txt | Seven alias tests pass. |
| `python -B scripts/check_dependencies.py --fork-point c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/f5-integration1-audit.jsonl` | 2 | f5-integration1-live.txt | Real first run after alias fix exposes authentic Bulk schema issue, invariant null. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f5-integration1-live-evidence.py` (initial version) | 2 | f5-integration1-live-evidence.txt | Same real main method, observer calls the actual Node bridge and returns its result unchanged; complete original exchange preserved in f5-integration1-node.jsonl. |
| `python -B -m unittest discover -s tests/quality -p test_dependency_audit.py` | 0 | f5-integration1-green.txt | All 32 tests pass before the evidenced schema correction. |
| `python -B -m unittest discover -s tests/quality -p test_dependency_audit.py -k bulk_` | 1 | f5-integration1-schema-red.txt | Three tests, three expected subcase failures for authentic omitted-name advisories; present bad names/ranges/groups still reject. |
| same exact focused Bulk command | 0 | f5-integration1-schema-green.txt | All three Bulk tests pass after bounded root-approved support. |
| `python -B scripts/check_dependencies.py --fork-point c379207bfd8bd148d3589ea75604ba5165915d01 --record .runs/f5-integration1-audit-final.jsonl` | **1** | f5-integration1-live-final.txt | Genuine named **introduced-npm-vulnerabilities/1 fail** on the real current product inputs and current database. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f5-integration1-live-evidence.py` (final observer) | **1** | f5-integration1-live-evidence-final.txt | Separate real main-method run; complete raw Bulk body, matching request and actual booleans in f5-integration1-node-final.jsonl. Exact matched pairs/ids/ranges/urls separately in f5-integration1-matches-final.json. No result substitution. |
| `python -B -m unittest discover -s tests/quality -p test_dependency_audit.py` | 0 | f5-integration1-green-final.txt | Final **35 tests pass**, no skips; only affected dependency-audit suite, no application/broad suites. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f5-integration1-state.py` | 0 | f5-integration1-state-after.txt | Product input hashes unchanged and nine valid peers retained. |
| `python -B .runs/task-cycles/coding-guidelines/reports/f5-integration1-sources.py` | 0 | f5-integration1-sources.txt | Exact matched pair locations and inBundle flags read from the current unchanged lock. |
| `git diff --cached --check` | 0 | f5-integration1-diffcheck.txt | Final staged whitespace check. Earlier unstaged check also exited 0 with only known future LF-to-CRLF checkout warnings. |

No foundation file changed, so no foundation guard was required. Full product/guideline gates and independent review remain root-owned and unchecked by this stage. Root's earlier `s1-root-audit` exit 2/null is retained as initial integration-failure evidence; no aggregate npm installation warning is used as an invariant verdict.

## Actual introduced-pair result and installation conflict

The final evidence run submitted **236** introduced actual name/version pairs and received **35** concrete advisories. Matching the complete response against those exact versions produced **35** blocking matches across these **10** actual pairs. These are measured point-in-time figures from the live method, not an npm ci count:

| Actual package | Version | Exact current lock location |
|---|---|---|
| @sigstore/core | 3.2.0 | node_modules/npm/node_modules/@sigstore/core |
| @sigstore/verify | 3.1.0 | node_modules/npm/node_modules/@sigstore/verify |
| brace-expansion | 5.0.5 | node_modules/npm/node_modules/brace-expansion |
| http-cache-semantics | 4.2.0 | node_modules/npm/node_modules/http-cache-semantics |
| ip-address | 10.1.0 | node_modules/npm/node_modules/ip-address |
| pacote | 21.5.0 | node_modules/npm/node_modules/pacote |
| postcss-selector-parser | 7.1.1 | node_modules/npm/node_modules/postcss-selector-parser |
| sigstore | 4.1.0 | node_modules/npm/node_modules/sigstore |
| tar | 7.5.13 | node_modules/npm/node_modules/tar |
| undici | 6.25.0 | node_modules/npm/node_modules/undici |

Every location is marked `inBundle: true`. All exact 35 package/version/advisory-id/severity/range/url matches are preserved separately, without truncation, in `f5-integration1-matches-final.json`; complete original response remains in `f5-integration1-node-final.jsonl`. For a concrete highest-severity example, tar@7.5.13 matches critical advisory **1123940**, range **<=7.5.18**, [GHSA-23hp-3jrh-7fpw](https://github.com/advisories/GHSA-23hp-3jrh-7fpw). The method's failure follows the adopted low-or-higher threshold; no package-wide aggregate substituted for these range matches.

Root independently confirmed the bundled locations and concluded that installing the pinned npm 11.13.0 conflicts with D-33's threshold. This is a genuine product/task settlement issue, not a reason to suppress a report, change the comparison base, exclude tool dependencies or weaken the method. Root explicitly required finishing this correction then returning before independent review; root will prepare the blocked-draft route with a concrete alternative. No policy, tool version or lock repair was attempted here.

## Untouched product files and return boundary

Starting and ending SHA-256 values are identical in the two state evidence files:

- package.json: `1853e14c659d6ec59f97a2759881fc2eaa5db89714141b94002809becda84625`
- package-lock.json: `997d60665cee25c8094d6d8719fb2c5d82e9e578857bc3ec71da11582fb2b2c0`

Both product-author files remain unstaged and outside this correction commit. Only scripts/check_dependencies.py and tests/quality/test_dependency_audit.py were staged explicitly. Report artifacts stay ignored. Remaining concern affecting next dispatch: the real named invariant failure for npm's bundled introduced dependencies requires root/human resolution before paused product work can pass. This author returns before re-review, installation changes, merge or next stage.
