# Package ownership parser correction

Input: independent reviewer report assessment-package-review.md, findings on optional list markers and overlapping application/tool owners. Author is the same fresh invariant-check author; no product source or foundation authoring.

Commit: 237c137e6769569631f2e1252d3bc960633816be, `test: preserve part map list syntax and overlapping owners`.
Changed and staged only tests/invariants/test_application_package_layout.py. Existing line endings preserved with newline-empty reads/writes. No other product changes. Working tree clean after commit.

## Changes

The optional `- ` list marker is stripped, followed by whitespace stripping, exactly as the pinned guard's valid pattern normalization does. Both an initial `Files: - pattern` and a continuation `  - pattern` now work.

Every part writes its own Git attribute; Git no longer overwrites an application owner with a later tooling owner. The parser rejects a file matched by multiple parts before any tooling exemption. Multiple matching patterns within the same part retain that same owner; the full map guard remains responsible for invalid map formatting and all its other constraints.

## Evidence

- Focused package test: 1 passed, 0.072 seconds.
- Repeated all 8 original rewrite controls: each matched its expected outcome, including tests/package.json, known tooling, inherited TypeScript configuration, Vite application/new part, nested server, unknown tooling classification and root lock mismatch.
- Reused the reviewer's retained known-tool fixture read-only: the first-line dashed Files pattern now passes.
- Reused the reviewer's overlapping-owner fixture read-only: now fails with an overlapping-owner diagnostic.
- Reused the reviewer's Vite-browser and nested-server fixtures read-only: both still fail.
- New disposable copy of the valid known-tool fixture with `  - tools/review/**` on a continuation line: focused invariant passes.
- Pinned part-map guard on that new disposable valid-map fixture: exit 0, 0 errors, 0 warnings, 4 unchecked. The unchecked items are dependency comparison (no product graph command), known-violation comparison, identifier comparison, and lowered criticality comparison (the latter three because the disposable fixture has no base commit).
- git diff --check: passed.

Executable controls: package-fix-controls.py beside this report. Logs: package-fix-known-tool.log, package-fix-overlap.log, package-fix-vite-browser.log, package-fix-nested-server.log, package-fix-dashed-continuation.log and package-fix-dashed-map-guard.log. Original reviewer evidence was not overwritten. The original rewrite control script was repeated and its author-owned logs refreshed.

The conservative classification limits in assessment-package-rewrite.md remain. This local correction does not rerun the full gate or replace the required independent review.
