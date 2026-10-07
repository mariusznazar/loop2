# Scoped re-review of candidate output mapping

Range: `a4e7d032f187a444f732e65e89b2879c99acd2e5..bba696959ba721b50d0d2884df0fdbf45e5579bc`.

**SDD spec compliance: APPROVED. Task quality: APPROVED.**

**Prior Important regression: ADDRESSED. No new Critical or Important finding. The whole-branch final review is approved with these scoped fixes.** This is code-review approval to proceed through the already required assessment and request handoff, not a claim that unrun final gates or the three request-link substitutions have completed.

## Finding disposition

The finding anchored at `C:/Storage/repos/loop2-first-foundation/tests/invariants/test_application_package_layout.py:137` in the previous revision is closed. Candidate packages no longer call the helper that requires declared rootDir/outDir. Instead, `config_outputs` asks the installed TypeScript API for configured inputs and their output names. Both independently reproduced valid unrelated-tooling cases now pass, and actual extra browser packages using those same defaults still fail at the intended package-boundary assertion.

The original inheritance correction also remains effective: root application configurations with relocated bases and extends-only leaf files still build and pass, and their canonical source/output paths are unchanged.

## Independent verification

All scenarios used fresh `support.TreeCopy` instances with a local Git repository for actual `check-attr` evaluation. Test support ROOT and file enumeration were redirected only to each disposable copy; the new files were included in the enumerated set. The same unchanged package test ran in each case. Temporary copies were removed in `finally`. No product files, index or commits were changed and no HTTP server was started.

| Scenario | Independent compilation | Package check |
|---|---|---|
| Unchanged assessed product | `npm run build` exit 0 | PASS, 1 test |
| Both root configs extend bases under `config bases/`, with correctly rebased declared directories and includes | `npm run build` exit 0; helper returned all four expected canonical source/output directories | PASS, 1 test |
| Unrelated tooling with root-level main.ts and outDir, omitted rootDir | Nested TypeScript compile exit 0 | PASS, 1 test |
| Unrelated tooling with rootDir '.', omitted outDir, output beside source | Nested TypeScript compile exit 0 | PASS, 1 test |
| Unrelated tooling with noEmit:true, browser field and build script | Nested TypeScript compile exit 0 | PASS, 1 test |
| Separate browser package with copied application source and inherited options from nested base | Nested TypeScript compile exit 0 | Expected RED: one assertion naming the separate package |
| Separate browser package with omitted rootDir and declared outDir | Nested TypeScript compile exit 0 | Expected RED: one assertion naming the separate package |
| Separate browser package with rootDir '.', omitted outDir | Nested TypeScript compile exit 0 | Expected RED: one assertion naming the separate package |

Tooling source was `export const report = 42;`, with no application page and no application part ownership. Browser-package breaks used actual copied browser application source. The nested packages were under `tools/report entry` and `packages/browser entry`, so subprocess arguments and JSON mapping were also exercised with spaces in paths. Each of the three deliberate breaks failed at the final assertion on line 261 with `packages/browser entry/package.json defines a separate application package`; none relied on configuration, compilation or setup failure.

## API and path inspection

- The subprocess invokes Node with an argument list, passes the installed TypeScript module and selected config as separate arguments, and uses no shell. The constant JavaScript program cannot reinterpret a package path as source code.
- `getParsedCommandLineOfConfigFile` resolves inherited declarations using TypeScript itself. Parsing errors are surfaced with compiler diagnostics rather than counted as a successful application classification.
- `getOutputFileNames` supplies the mapping for omitted directory options instead of reproducing compiler inference in Python. The observed output names resolve to the declared entry for each real second-package break. JSON serializes paths safely; the Python comparison uses canonical filesystem paths.
- Candidate inputs must belong to the enumerated product files and match a declared browser entry output before copied-source/page evidence can classify them as application. Unrelated tooling with the same directory arrangement passes.
- For the explicit noEmit control, `getOutputFileNames` returned the potential `dist/main.js` output rather than an empty list or an exception. This API describes output names, not proof that files were emitted. The unrelated-tooling check still passed because neither copied application source nor an application page matched. No false positive was reproduced by that bounded control; the report does not claim noEmit returns an empty mapping.

## Findings

Critical: none. Important: none. Minor: none. No further stylistic or speculative changes requested.

## Scope and gate limits

HEAD matched `bba696959ba721b50d0d2884df0fdbf45e5579bc`; `git status --short` was empty and `git diff --check a4e7d03..bba6969` passed. This review covered the complete one-file correction and the prior finding's affected behavior. It preserves the earlier whole-branch review rather than reopening unchanged areas.

Full invariant gate, ordinary npm suite, HTTP suite and foundation guards were not rerun here; no pass for those is claimed. No additional out-of-scope behavior was set aside. The original whole-branch finding and its scoped regression are both now closed by independent positive controls and deliberate-break evidence.
