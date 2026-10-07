# Independent specification review — TypeScript 7

## Readiness verdict

Ready for planning, with one nonblocking source-fidelity correction below. No blocking finding. The proposed dependency-first attempt, Windows verification, invariant preservation and verified fallback cover the frozen task. This is the reviewer's readiness assessment, not human approval. Planning and implementation were not performed.

## Blockers

None found.

## Worth correcting

None beyond the small wording correction below.

## Nits

### 1. Narrow the statement that the configurations avoid changed defaults

**Status:** new observation; low priority, nonblocking.

**Anchor:** `.runs/task-cycles/typescript-7/spec.md:12`.

**Ready to paste:** The configurations explicitly retain the listed settings, but they do not avoid every TypeScript 7 default change: neither file sets `noUncheckedSideEffectImports` or `libReplacement`, and the announcement also describes mandatory `stableTypeOrdering`. Narrow this sentence to the defaults actually fixed by the configuration and retain the requirement to verify the remaining compiler changes through the real checks.

**Why this is reported:** The paragraph establishes what is known before installing the compiler. Both configuration files pin the root/output paths, language/module settings, type libraries and strictness, which supports keeping the existing configurations for the initial attempt. The official announcement also lists default changes outside those settings. For example, a bare unresolved side-effect import would encounter the new default even with these configuration files unchanged. The current source has no such import, so this review does not identify an application failure or call for extra configuration switches. Leaving the broad sentence would overstate the evidence; narrowing it costs one sentence and preserves the same implementation and validation scope.

Suggested replacement for the last sentence of that bullet:

> The explicit settings preserve the configured target, module mode, strictness, source root and global type selection; neither configuration uses an option that the official TypeScript 7.0 announcement lists as removed. Other compiler and default changes still require verification through the real build and tests.

Evidence: `tsconfig.browser.json:2`, `tsconfig.server.json:2`, and the changed-defaults section of the [official TypeScript 7.0 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/), independently read on 2026-10-07. The existing source was also read to distinguish a hypothetical exposure from a present failure.

## Checks with no concern

- **Task coverage and scope:** `task-frozen.md:11` requires an attempt at the latest 7.x and a documented 6.0.3 fallback if it fails. Spec lines 5, 25 and 37 cover both outcomes. The frozen answer at line 20 explicitly permits Windows-only verification; the spec consistently leaves Linux unchecked. No new Linux gate or Node upgrade is invented.
- **Current invocation and direct package path:** `scripts/build.mjs:6` resolves the filesystem path to `node_modules/typescript/bin/tsc`, and line 10 launches it using `process.execPath`. An independent in-memory download of the [published 7.0.2 tarball](https://registry.npmjs.org/typescript/-/typescript-7.0.2.tgz) confirmed that `package/bin/tsc` imports `../lib/tsc.js`; that module resolves the native executable and forwards CLI arguments. This supports structural compatibility, not an execution pass. The spec correctly preserves that distinction. Package exports do not invalidate this direct filesystem invocation.
- **Release and native dependencies:** The [npm latest metadata](https://registry.npmjs.org/typescript/latest), independently read on 2026-10-07, reports 7.0.2. Its optional dependencies include matching Windows x64 and arm64 packages, alongside other operating systems. The published package declares Node `>=16.20.0`, compatible with the product's Node 24 requirement. Spec lines 25 and 35 require clean installation, selected-package inspection and actual CLI execution; they do not infer native execution from metadata or Windows success from a generic compatibility claim.
- **Existing foundation:** `foundations/decisions.md:3` and `:178`, and the named entries in `foundations/invariants.md`, require Node 24, server type checking, one package/lockfile and separate configurations/output directories that both compile. None requires compiler 6.0.3, a fixed TypeScript patch release, or a JavaScript implementation of the compiler. Spec line 31 reasonably makes a new foundation decision unnecessary for the dependency change alone and explicitly revisits the judgment at return.
- **Existing invariant checks:** `tests/invariants/test_application_build_output.py:83` and `:184` establish the exact diagnostic strings and source-path checks described in the spec. `tests/invariants/test_account_server_typecheck.py` uses clean and deliberately invalid source copies and checks that a failed server build leaves no server entry point. The spec keeps real compilation, negative probes and output checks; it does not accept a launcher version check as proof of type checking.
- **Conditional invariant-test correction:** Spec line 29 requires the foundation step and separate check author, preserves the invariant sentence and both negative probes, and requires deliberate-break review. This is consistent with the inspected WAY-69 rule at `.the-way/foundations/decisions.md:1914`. No test modification is presently justified solely by speculation about changed wording.
- **Fallback:** Spec line 37 gives concrete failed gates and restricts corrective attempts to the compiler/build scope. It calls for reverting attempted product changes, restoring the exact 6.0.3 manifest/lockfile, verifying the restored Windows state and retaining failure evidence in the PR. Read literally, the restoration covers any attempted launcher/configuration changes too; it does not permit retaining an unverified hybrid state. These conditions are sufficient for the implementation plan to turn into commands.
- **Cost and alternatives:** Keeping the existing launcher first has the smallest change and directly exercises the published Node entry point. Replacing invocation only after a concrete failure and rejecting a second compiler without an API consumer avoid unnecessary dependencies. This is one explicitly requested migration attempt, not evidence of a recurring operational failure; no frequency claim or performance benefit is assumed.

## Evidence boundary and work performed

Read the frozen task, complete spec, product AGENTS instructions, relevant current source/configuration/tests and all five foundation files. Read the project critique adapter and pinned critique skill. The `.the-way` checkout and gitlink both matched `c64a6071384fb57cdb9d7e9db4560ddc43e3b355`. Independently inspected the registry metadata, published package entry points/manifest and official announcement using generic HTTP User-Agent headers, without sending owner or machine identifiers.

No dependency installation, compiler execution, build, product test, invariant test or Linux check was performed in this design review. These remain implementation-stage evidence to obtain; none is reported as passing. No product file was edited. The only written file is this report.
