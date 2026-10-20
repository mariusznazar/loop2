"""Assemble the controller's verification report from captured results."""
import json
from pathlib import Path
root=Path.cwd()
reports=root/'.runs/task-cycles/coding-guidelines/reports'
results=json.loads((reports/'final-gate-results.json').read_text(encoding='utf-8'))
notes={
'final-invariants':'133 tests; 150 failing assertions/subtests and 3 setup errors. Missing old typescript/bin/tsc path in scripts/build.mjs:6 prevents build-backed checks; TS7 invocation is an unperformed part of S1.',
'final-deploy':'64 tests; 1 failure: ImageServesIcons Docker build cannot run typecheck because the same compiler path is missing. Baseline HTTP500 was not the final failure.',
'final-agent_workflow':'5 tests passed.',
'final-quality':'111 tests passed. Fixture results do not establish live linter/formatter acceptance.',
'final-npm-typecheck':'Failed before type checking: old compiler path missing.',
'final-npm-build':'Failed before application build: old compiler path missing.',
'final-npm-test':'Failed in prerequisite build; application test bodies did not run.',
'final-eslint':'Unavailable/null invariant: loader rejects installed TypeScript API alias; known independent-method correction pending.',
'final-eslint-configuration':'Unavailable/null invariant: same loader defect; configuration file also remains unimplemented.',
'final-ruff':'Unavailable/null invariant: pinned local binary not installed (S2 unperformed).',
'final-shellcheck':'Unavailable/null invariant: pinned local binary not installed (S2 unperformed).',
'final-format':'Unavailable/null invariant: prettier.config.mjs not implemented.',
'final-dependency-audit':'Named introduced-npm-vulnerabilities/1 failure. Exact current-vs-original-fork comparison; independent evidence35 advisory matches in10 introduced npm11.13.0 bundled pairs.',
'final-guard-decisions':'10 errors and10 warnings: request-link placeholders. Expected before draft URL; a separate post-link guard will replace this result, with complete output retained.',
'final-guard-invariants':'0 errors/warnings/unchecked; form check only, not invariant acceptance.',
'final-guard-environment-facts':'0 errors/warnings/unchecked; format pass does not perform four Method:TODO fact checks.',
'final-guard-part-map':'5 errors: missing eslint.config.mjs, prettier.config.mjs, requirements-quality.in, requirements-quality.txt and guidelines/**. Two dependency-criticality warnings; dependency graph/new or stale violations unchecked because no product command reports that graph.',
'final-guidelines-form':'Exit0 because no guidelines directory exists. Required guideline output is unperformed; this is not an acceptance of missing output. Merge references are not checked in this invocation.',
'final-guidelines-reference':'Exit0 because no guidelines directory exists. Required guideline output remains unperformed.',
'final-instructions':'0 errors,11 warnings,2 info:10 server-only path warnings in two deploy skill copies and1 missing-guidelines warning; instructions pointer change unperformed.',
'final-diff-check':'No whitespace errors in committed range.',
}
lines=['# Controller full gate on the blocked change','','Actor: root. Commit3781ff9d421d6bc1f73b017bbe02dc70b2943996; original fork and last-fetched target c379207bfd8bd148d3589ea75604ba5165915d01. Windows, Python3.14.3, Node24.17.0, npm11.13.0. Pinned process d829e3aa6242a9b8901274531dd82fd5c7d87628. Docker build used Node24.22.0. No final branch reconciliation is claimed.','','Commands executed sequentially by root using run-final-gate.py. Every output below is complete sanitized stdout/stderr; its adjacent .txt.json records exact argv, actual child exit and timing. Aggregate gate exit1.','','| Check / exact command | Exit | Outcome and practical limits | Full output |','|---|---:|---|---|']
for result in results:
    command=' '.join(result['command']).replace('|','\\|')
    name=Path(result['output']).name
    lines.append(f"| `{command}` | {result['exit_code']} | {notes[result['label']]} | [{name}]({name}) |")
lines += ['', '## Explicitly unperformed', '',
'S1 remaining configuration/build/README/attributes and its independent slice review; S2-S12; final whole-branch review; final deliberate-break acceptance of new/changed invariant methods; every guideline good/bad pair (guidelines do not exist); return step; independent foundation assessment; reconciliation with current target branch. Four environment fact methods: eslint-recommended-rules/1, typescript-eslint-typechecked-rules/1, ruff-default-rules/1, shellcheck-default-bash-checks/1. Live Unix process tools remain unverified; Windows and Unix failure-injection fixtures passed before this partial installation. No UI code changed, screenshot work is unperformed and no rendered-appearance claim is made.', '',
'Earlier F6 live tests and173 application tests passed before S1 changed installation; those superseded checks are not presented as a pass for the blocked current tree. The final source/configuration checks did not reach verdicts, except the audit which reached a genuine named failure. Four fact format guards passing do not make TODO methods pass.', '',
'## Candidate evidence, separate from the product gate', '',
'Root installed the same direct tool pins with only npm12.2.1 in ignored .runs/npm-candidate-12.2.1. Actual version12.2.1, installation0, audit0; reportVersion2 vulnerabilities empty and all severities0. No product source/configuration or pinned method was revised. Full candidate-install.txt, candidate-version.txt, candidate-audit.txt and sidecars; exact candidate-package.json/lock snapshots. This is an actionable alternative, not final product verification.', '',
'## Baseline', '',
'At c379207: npm173 tests passed, invariant141 tests passed, agent-workflow5 tests passed. Deploy64 tests had one Docker BuildKit HTTP500 failure. Current deploy failure instead reaches compiler invocation and fails on the incomplete S1 build path. Preserve both observations; do not call a current code failure an unchanged environment limitation.', '']
(reports/'final-verification.md').write_text('\n'.join(lines),encoding='utf-8')
print('Recorded',len(results),'controller checks')
