import importlib.util
import json
from pathlib import Path
import re
import subprocess

reports = Path(__file__).parent
entries = json.loads((reports/'foundation-entries.json').read_text(encoding='utf-8'))
verification = json.loads((reports/'foundation-verification.json').read_text(encoding='utf-8'))
commit = subprocess.check_output(['git','rev-parse','HEAD']).decode().strip()
base = verification['base']
spec = importlib.util.spec_from_file_location('report_fingerprint',Path('.the-way/relation-model/fingerprint.py'))
fingerprints = importlib.util.module_from_spec(spec)
spec.loader.exec_module(fingerprints)
map_text=Path('foundations/part_map.md').read_text(encoding='utf-8')
map_fingerprints={identifier:fingerprints.fingerprint(re.search(r'^## '+identifier+r'\n\n(.*?)\n\n',map_text,re.S|re.M).group(1)) for identifier in ['build-tools','agent-workflow']}
lines = [
    '# Foundation step — committed boundary',
    '',
    'Actor: foundation_author. Status: completed within the named boundary; no check implementation, covered code, configuration, guideline or instruction-file change. Independent critique remains with the orchestrator after the whole change. No subagents, host access or deployment work.',
    '',
    f'Worktree: C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines. Base and current origin/main: {base}. Result commit: {commit}. Gitlink and actual .the-way checkout: d829e3aa6242a9b8901274531dd82fd5c7d87628, verified equal before use. Active branch: task/coding-guidelines, no configured upstream.',
    '',
    'Authoritative inputs: foundation-handoff.md; whole frozen task.md; plan.md Foundation entries and Choices; pinned task-cycle skill and the four project element wrappers, pinned element skills/templates/common rules/way_of_working and their examples; pinned product-guidelines/reading.md and both general/coding templates. Source-only MVP contributes no projected entry here.',
    '',
    'Input SHA-256:',
]
for path, digest in verification['input_sha256'].items():
    lines.append(f'- `{path}`: `{digest}`')
lines += [
    '',
    '## Foundation and guideline selection',
    '',
    'All seven parts were read whole from foundations/part_map.md: browser-view, simulation, account-server, build-tools, deployment, agent-workflow and product-foundation. Six hold covered code; the seventh holds the changed foundation. Existing full current invariant file, linked environment facts and product glossary were read, as was the pinned process glossary. No glossary addition is required.',
    '',
    'Exhaustive latest-Scope inspection of the base log selected all D-01 through D-27; every selected entry was read whole, including rationale/rejected and linked entries. The independent direct Scope comparison in foundation-verify.py found exactly the same 27 identifiers; source lines and current versions are in foundation-verification.json under scope_selection. Current versions are D-03/2, D-04/3, D-05/3, D-06/3 and /1 for the others. No selected current version is missing.',
    '',
    'The entire five-element foundation was searched before writing with `rg -n` for linter, eslint, ruff, shellcheck, prettier, formatting, exemplar, recommended, vulnerabilities, guidelines, rule set and audit; no existing adoption, conflicting choice or duplicate was found. Whole-entry reading also checked broader consequences: compiler/package boundary, view/simulation isolation, content identifiers, HTTP errors, tool ownership, deployment boundaries and future new paths. Existing D-01–D-27 meanings are unchanged. The source/preservation audit confirms every preexisting decision, invariant and fact block remains present unchanged modulo normal repository LF normalization.',
    '',
    'Guidelines directory is absent. The task itself creates coding.md plus content-data, simulation-module, browser-module and http-application kind files, so it does not wait for its own output. There is no visible-behavior or styleguide change here. Future general/kind selection remains exactly the handed-over selection; no discrepancy was found.',
    '',
    '## Accepted settlement mapping and meaning',
    '',
    '| Row | Entry / fingerprint | Polish meaning |',
    '|---|---|---|',
]
for row in range(1,23):
    identifier = verification['row_mapping'][str(row)]
    entry = next(item for group in ['decisions','facts','invariants'] for item in entries[group] if item['id']==identifier)
    lines.append(f"| {row} | {identifier}/1 @{entry['fingerprint']} | {entry['meaning']} |")
lines += [
    '',
    'Rows 21–22 copy the exact identifiers and sentences of the pinned general template. Their Derives from is none, as that template requires. They are not falsely attributed to D-28. New decisions D-28–D-37 use `Approved by: Mariusz, merge of <request link>`; root explicitly confirmed the placeholder until the draft PR exists, followed by placeholder-only substitution before ready-for-review. No agent go-ahead is labelled human approval.',
    '',
    'D-28 carries the explicit departure and accepted deferrals. D-29 keeps the compiler/API distinction, all JS/TS rules, new-path coverage and configuration/suppression protection. D-30 keeps the exact fourteen Ruff example rules and explicit isolated blocking selection. D-31 keeps default nonoptional Bash checks, all levels and standalone-script scope. D-32 keeps the full formatter scope, exclusions, shared explicit defaults and LF. D-33 keeps exact actual package-name/version pairs, all dependency classes/manifests/lockfiles, advisory-range matching, live database semantics, valid offline empty-set comparison and no successful verdict on unavailable/incomplete/unsupported input. D-34–D-37 preserve the distinction between examples and existing architectural rules; no new factory, universal return type, mandatory update method or catalogue-shape rule was added.',
    '',
    '## Membership and source evidence',
    '',
    'foundation-source-evidence.json records every unauthenticated publisher URL and HTTP 200 response. foundation-source-* files hold the exact upstream edition read. The release-existence check independently reopened four public release endpoints and confirmed @eslint/js 10.0.1, typescript-eslint 8.71.2, Ruff 0.17.1 and ShellCheck v0.11.0. Requests contained no user account names, owner names, email addresses or local paths.',
    '',
    'The ESLint fact lists all 64 rule names and error levels with no configured options. The TypeScript fact includes every added error and disabled core rule plus complete source composition through flat base, compatibility overrides and recommended-type-checked; combining them with ESLint resolves to 92 active rules. Ruff records all 407 individually named defaults from DEFAULT_SELECTORS and the nonpreview selection expression; the exact fourteen adopted exclusions leave 393. ShellCheck publishes compositional membership, so its fact quotes the complete default pipeline, all default Analytics tree/node and Commands lists including declaration expansions, ControlFlow composition, empty Custom checker, shell-conditioned ShellSupport list and inclusion/default-option logic; parser diagnostics are included. Optional lists remain separately gated. No invented one-to-one SC-code list substitutes for that composition.',
    '',
    'The four facts have Method: TODO, explicitly authorized by root and permitted by the element template. No fact watch/probe was assigned by task or plan, and inventing one would expand scope. Source validation is evidence for these entries, not a standing fact-method verdict. Each remains unchecked by name: eslint-recommended-rules/1, typescript-eslint-typechecked-rules/1, ruff-default-rules/1, shellcheck-default-bash-checks/1. Whether WAY-08 deliberate-break acceptance applies to a future fact method remains the pinned template’s pending question; this change settles neither answer.',
    '',
    '## Methods and remaining independent authors',
    '',
    '| Invariant | Exact method | Check acceptance at this boundary |',
    '|---|---|---|',
]
for entry in entries['invariants']:
    state = 'Existing pinned checker; future guideline cases and whole-branch deliberate-break acceptance still pending' if entry['id'].startswith('guidelines-') else 'New independent check author and deliberate-break reviewer still pending; script is not produced yet'
    lines.append(f"| {entry['id']}/1 | `{entry['method']}` | {state} |")
lines += [
    '',
    'All six source/configuration/format/audit methods are command-shaped interfaces, not TODO: Python may name future scripts under WAY-105. None was accepted merely because a sentence exists; their methods were not invoked against missing files and have no successful verdict. Root dispatches F1 mechanics and F2–F5 independent method authors next, preserving three distinct identities for sentence, check and covered code. Existing invariant checks remain unedited; planned F6 is still pending through its separate foundation route.',
    '',
    'ESLint Parts include browser-view, simulation, account-server and build-tools: covered code and configurations/lockfile can break them. Ruff and ShellCheck Parts include all six code parts because newly owned Python/Bash there can break them, plus build-tools configuration/tool versions. Prettier additionally includes deployment because .gitattributes can break LF. Audit includes build-tools, which owns the audited manifests and lockfiles. Guidelines form names every; guideline references name agent-workflow and product-foundation, including the pin owner. These are reach choices, not claims about current script availability.',
    '',
    '## Part-map consequences',
    '',
    '- build-tools responsibility now includes quality checks and introduced-version audits; its old sentence is replaced, with no incoming fingerprint links found. Its meaning: narzędzia budowania odpowiadają także za kontrolę jakości kodu i audyt nowych wersji zależności.',
    '- scripts/build.mjs expands to nonoverlapping scripts/**; tests/quality/**, eslint.config.mjs, prettier.config.mjs, requirements-quality.in and requirements-quality.txt belong to build-tools. No file is taken from another part. scripts/** currently claims the preexisting build script; new explicit patterns await their planned files.',
    '- guidelines/** belongs to agent-workflow. Znaczenie: część kierująca pracą agentów obejmuje także wytyczne produktu. Existing invariant-test ownership and .gitattributes in deployment are retained.',
    '- scripts/check_dependencies.py joins the build-tools trust boundary because it reads untrusted advisory responses; this future path is currently an expected map error. npm registry direction is both because auditing transmits package-name/version data. Python Package Index is recorded as an incoming untrusted tool-distribution partner, as the accepted local Python-tool installation requires.',
    '- No new part, critical flow, surface, severity or failure mode was invented. Existing unknown failure modes continue to imply high criticality; no lowering occurs.',
    f"- Current binding-part fingerprints: build-tools@{map_fingerprints['build-tools']} (changed responsibility); agent-workflow@{map_fingerprints['agent-workflow']} (responsibility unchanged; Files extended).",
    '',
    '## Autonomous choices and costs',
    '',
    '| Choice | Alternative / cost of leaving otherwise | Chosen cost and boundary |',
    '|---|---|---|',
    '| New stable identifiers D-28–D-37 and descriptive rule-set/invariant names | Reusing unrelated existing questions would silently change architectural meanings | Additional entries, with exact incoming fingerprints and row mapping; all old meanings preserved |',
    '| One coherent foundation commit in facts→decisions→invariants→map dependency writing order | Separate commits could temporarily contain dangling links without improving review | One linked boundary is reviewable; no code or configuration is mixed into it |',
    '| Review when: none on each new decision | Invented prediction/date would falsely add an agreed review trigger | No prediction is relied on; audit threshold has explicitly no scheduled automatic review; later product experience can motivate a human decision |',
    '| Fact Method: TODO | A new watch framework expands the accepted task; a human-only path misstates an automatable route | Four facts honestly remain unchecked; exact current source evidence is still captured |',
    '| Full source-defined ShellCheck composition | Counting codes from comments or diagnostic emissions does not identify the complete Bash set | Longer precise source citation, with no invented rule-number catalogue |',
    '| Add audit trust boundary and package-index partner, update npm direction | Omitting these would leave a new untrusted input/distribution exchange unrecorded | Small necessary map consequence; future trust-boundary path stays an interim error until code exists |',
    '| Preserve CRLF by newline-empty reads/writes | Rewriting existing bytes risks unrelated blame churn | No line-ending-only change; committed repository content remains LF as before |',
    '',
    '## Verification and full command evidence',
    '',
    'The report helper captures raw combined stdout and stderr without PowerShell decoration; each log’s adjacent .json gives the exact argv, exit code and duration. Paths below are relative to this report directory; there is no separate stderr file because stderr is redirected into the same complete log.',
    '',
    '| Evidence log | Exit | Result |',
    '|---|---|---|',
]
for stem, note in [
    ('foundation-guard-decisions','Initial: only ten request-link errors and ten matching warnings'),
    ('foundation-guard-environment-facts','Initial: three source-quote delimiter errors, corrected without changing meaning'),
    ('foundation-guard-invariants','Initial: zero errors/warnings/unchecked'),
    ('foundation-guard-part-map','Initial: five Scope-separator errors corrected, plus expected future-file errors'),
    ('foundation-guard-decisions-final','Final: ten expected request-link placeholder errors and ten warnings; no other errors'),
    ('foundation-guard-environment-facts-final','Final: zero errors/warnings/unchecked; this is form, not a fact-method pass'),
    ('foundation-guard-invariants-final','Final: zero errors/warnings/unchecked; this is form, not an invariant-method pass'),
    ('foundation-guard-part-map-final','Final: seven expected not-yet-tracked patterns/boundary errors, two preexisting dependency-criticality warnings, one unchecked dependency graph'),
    ('foundation-guidelines-form','Existing checker exits zero with no guidelines directory; actual future guideline acceptance is still pending'),
    ('foundation-guidelines-reference','Existing checker exits zero with no guidelines directory; no future-reference fidelity is claimed'),
    ('foundation-verification','35 source/preservation assertions passed, four release endpoints read; see JSON for the full set'),
    ('foundation-diff-check','Committed range whitespace check passes'),
]:
    metadata_path=reports/(stem+'.log.json')
    if metadata_path.exists():
        metadata=json.loads(metadata_path.read_text(encoding='utf-8'))
        lines.append(f"| {stem}.log + .log.json | {metadata['exit_code']} | {note} |")
lines += ['', 'Exact executed check commands (each matching log and sidecar above):', '']
for metadata_path in sorted(reports.glob('foundation-*.log.json')):
    metadata=json.loads(metadata_path.read_text(encoding='utf-8'))
    lines.append('- `'+ ' '.join(metadata['command'])+'` — exit '+str(metadata['exit_code'])+'; combined stdout/stderr: `'+str(metadata['output']).replace(chr(92),'/')+'`.')
lines += [
    '',
    'The full guard argv in their sidecars names each repository foundation file, --base c379207bfd8bd148d3589ea75604ba5165915d01, and --merge-onto with that same current main commit for all except part map, which accepts no merge-onto. All records are under ignored .runs/. No `none` option masks a comparison. The exact one unchecked map result is: `the dependencies between parts, and new or stale violations — no command of the product reports the dependency graph`. The two map warnings are existing unseparated build-tools→account-server and deployment→account-server dependencies, making account-server high. The seven map errors are tests/quality/**, eslint.config.mjs, prettier.config.mjs, requirements-quality.in, requirements-quality.txt, scripts/check_dependencies.py and guidelines/** not matching tracked files yet.',
    '',
    'Weakest-point check: rule membership can look correct by count while silently replacing an inherited rule. I independently parsed the publisher files, compared exact named sets to the newly written sentences, composed every TS override and used positive controls (`no-undef` off; `@typescript-eslint/no-unnecessary-type-assertion` error). I checked all 22 row targets, exact pinned guideline sentences and every old entry’s preservation. Observed result: 35 assertions pass, including exact 64 JS membership, 92 active TS membership, full 407 Ruff equality and the fourteen-member subtraction to 393. The source quotes all match the downloaded edition byte content after whitespace collapse. This audit is my own check, not independent acceptance of an invariant checker. Manual fidelity comparison of Q2–Q8 and rows 1–22 found no altered accepted meaning; command-execution fields for this final semantic reread are not applicable.',
    '',
    'Sharpness from actual diff: four foundation files; no irreversible operation; no current code trust boundary is edited. The added future audit boundary is recorded for later covered-code review. All seven parts are affected through changed entries, including every on guidelines form, hence high under the existing map’s unknown-failure-mode policy. No product tests were run because this boundary changes no executable code and the relevant form/source checks are complete.',
    '',
    '## Commit and changed counts',
    '',
    f'Commit: {commit} — docs: establish coding quality foundation.',
    '',
    '| File | Added | Removed |',
    '|---|---:|---:|',
]
for line in subprocess.check_output(['git','diff','--numstat',base,commit]).decode().splitlines():
    added,removed,path=line.split('\t')
    lines.append(f'| {path} | {added} | {removed} |')
lines += [
    '',
    'Total: 293 additions, 3 removals. Report/evidence scripts and upstream source evidence are ignored and not committed. Working tree is clean at return. Private repository author email was checked after the commit and matches the configured private identity; no email is copied into this report.',
    '',
    'Boundary reached: committed foundation entries only. Root can dispatch independent check authors from the whole invariant sentences/methods and permitted methodological sources. Remaining expected issues do not change any accepted settlement: replace request placeholder when the draft PR exists; create the planned mapped files; implement/independently accept the six new methods and good/bad cases; leave four fact TODO methods and unavailable dependency graph explicitly unchecked; finish full-change critique/assessment and final guards later. There is no unresolved question requiring a changed product decision.',
]
(reports/'foundation.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
print('foundation report written')
