# Return-step citation completion

Status: DONE. Author boundary reached; fresh scoped review/assessment and whole-branch reconciliation belong to root. No helper agents, product behavior/configuration edits, foundation rewrite, process/port/container operation, live dependency audit, external write, cleanup or push performed.

## Authority and input versions

- Worktree: C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines; branch task/coding-guidelines.
- Start: ef057111b09f0b081e1c9c1dd61678bb29040a07.
- Original fork point/current merge target: c379207bfd8bd148d3589ea75604ba5165915d01.
- Pinned process: d829e3aa6242a9b8901274531dd82fd5c7d87628; gitlink and checked-out submodule match.
- Read complete reports/return-citations-handoff.md and reports/author-contract.md first; read product AGENTS.md/CLAUDE.md, task.md and amendment-npm12.md. The amendment makes npm 12.2.1 authoritative over the frozen task's original pin.
- Read pinned elements/common/way_of_working.md, elements/common/rules.md, elements/invariants/template.md, elements/invariants/examples.md and elements/invariants/skill/SKILL.md (through the product entry point). The initially attempted elements/invariants/SKILL.md does not exist; the product entry point supplied the correct skill/ path. Full WAY-65/1, including verification/rationale/rejected options, read from pinned foundations/decisions.md.
- Read the five pinned example invariants: log-entry-field-presence, decision-guard-overdue-review, file-part-assignment, fingerprint-definition, return-step-record. Read the Superpowers 6.4.1 implementer-prompt.md; no behavior change means no new TDD suite is appropriate.

## Foundation and guideline refresh

The entire product part map assigns all seven changed scripts to build-tools. No application part's behavior, failure mode, surface, integration or boundary changes. The complete product decision Scope inspection yields these latest build-tools matches: D-01/1, D-02/1, D-03/2, D-04/3, D-05/3, D-06/3, D-27/1, D-28/1, D-29/1, D-30/1, D-31/1, D-32/1, D-33/1. All were read as complete entries; D-07/1 and D-08/1 were expanded as linked context. Product invariants were read whole, including the six final standing entries. Their four rule-membership environment facts were read; runtime/library/application facts discovered through other decisions are context rather than authority for new executable rules. The product glossary headings/Avoid spellings and pinned process glossary were inspected; relevant process entries (invariant, invariant test, verdict, standing check, return step and part map) were read whole. Searches across product foundation using linter/tool/format/dependency/citation/data vocabulary found the existing entries; no new meaning is proposed.

Read product-guidelines/reading.md whole. Read guidelines/coding.md whole and inspected every guideline header/reading condition and the entire kind index. Only general coding guidelines apply: these existing Python check adapters, discovery helper and JavaScript tool bridge are none of the four content/simulation/view/HTTP kinds. D-28 explicitly defers separate build/test/entry-point exemplars; this metadata completion does not reopen that decision. No guideline selection expansion or unresolved metadata gap.

## Change and exact inserted lines

Each invariant citation stands immediately before its run_check call: the smallest operation with its own recorded verdict. ESLint's two mutually exclusive alternatives share that one dispatch; placing two citations there avoids an executable refactor. Shared discovery and the ESLint bridge do not record independent verdicts and receive data lines only.

| File | Added | Removed |
|---|---:|---:|
| scripts/check_dependencies.py | 4 | 0 |
| scripts/check_eslint.py | 2 | 0 |
| scripts/check_format.py | 5 | 0 |
| scripts/check_ruff.py | 1 | 0 |
| scripts/check_shellcheck.py | 1 | 0 |
| scripts/inspect_eslint.mjs | 3 | 0 |
| scripts/quality_support.py | 1 | 0 |


### scripts/check_eslint.py

- `scripts/check_eslint.py:229` (absolute root above): `# invariant: eslint-source-rules/1`
- `scripts/check_eslint.py:230` (absolute root above): `# invariant: eslint-configuration-rules/1`

### scripts/check_ruff.py

- `scripts/check_ruff.py:190` (absolute root above): `# invariant: ruff-source-rules/1`

### scripts/check_shellcheck.py

- `scripts/check_shellcheck.py:170` (absolute root above): `# invariant: shellcheck-source-rules/1`

### scripts/check_format.py

- `scripts/check_format.py:113` (absolute root above): `# data: .gitattributes`
- `scripts/check_format.py:135` (absolute root above): `# data: package.json`
- `scripts/check_format.py:137` (absolute root above): `# data: package-lock.json`
- `scripts/check_format.py:151` (absolute root above): `# data: prettier.config.mjs`
- `scripts/check_format.py:186` (absolute root above): `# invariant: prettier-source-format/1`

### scripts/check_dependencies.py

- `scripts/check_dependencies.py:119` (absolute root above): `# data: foundations/part_map.md`
- `scripts/check_dependencies.py:292` (absolute root above): `# data: package.json`
- `scripts/check_dependencies.py:293` (absolute root above): `# data: package-lock.json`
- `scripts/check_dependencies.py:337` (absolute root above): `# invariant: introduced-npm-vulnerabilities/1`

### scripts/quality_support.py

- `scripts/quality_support.py:71` (absolute root above): `# data: foundations/part_map.md`

### scripts/inspect_eslint.mjs

- `scripts/inspect_eslint.mjs:19` (absolute root above): `// data: eslint.config.mjs`
- `scripts/inspect_eslint.mjs:164` (absolute root above): `// data: package.json`
- `scripts/inspect_eslint.mjs:168` (absolute root above): `// data: package-lock.json`

## Data completeness: consumption and limits

- quality_support.py: foundations/part_map.md is read at _part_patterns, which is shared by the five methods.
- inspect_eslint.mjs: eslint.config.mjs is consumed through configured ESLint; root package.json and package-lock.json are directly read in loadTools. These data lines live at their actual consumers, not the Python launcher's file top.
- check_format.py: package.json and package-lock.json are directly parsed; .gitattributes is consumed by the isolated Git attributes call; prettier.config.mjs is consumed by the embedded bridge invocation immediately below its Python data comment. Keeping that comment beside the invocation preserves the complete Python literal and its embedded JavaScript unchanged. Both explicit/editor configuration reads are within the same invoked bridge.
- check_dependencies.py: the base snapshot explicitly includes foundations/part_map.md and reads it with git show at its comment; root package.json and package-lock.json are among the current discovered-and-read manifests and are statically used again for tool pin checks. Each path is cited once in this file, at its actual consumption, rather than repeated for every lookup.
- Ruff and ShellCheck have no additional statically named tracked product configuration/data input; source files are discovered from current ownership and read dynamically. No files are frozen into an enumerated source list.
- Dynamic discovered sources/manifests, arbitrary base manifest paths, optional root npm-shrinkwrap.json (currently absent/untracked), generated temporary ownership attributes, installed node_modules/tool metadata and tool executables are not fabricated as static tracked data targets. The manifest basename selectors still support new paths and npm-shrinkwrap.json without changing behavior. requirements-quality.in/.txt are installation declarations, not files these checks read. TypeScript configuration reads are inside the covered ESLint product configuration, not separately named static reads by these seven method files.

There are six invariant lines and eleven data lines naming six distinct tracked targets: foundations/part_map.md, package.json, package-lock.json, .gitattributes, prettier.config.mjs, eslint.config.mjs. The pinned guard checks data-line existence only in files that also contain an invariant citation. Therefore its clean result alone does not validate data comments in quality_support.py/inspect_eslint.mjs. The bounded manual probe additionally applies the real pinned CITATION regex to all seven files and confirms all eleven paths are currently tracked and exist. This distinction is explicit rather than claiming broader guard coverage.

## Executable preservation and check results

All six Python files have identical full ASTs (source positions excluded) and identical noncomment executable token type/spelling sequences against the start commit. The comparison normalizes NEWLINE token spelling only, because the existing ESLint checkout has mixed LF/CRLF while its Git blob has LF. It does not normalize literal values; full AST equality includes every BRIDGE string unchanged. inspect_eslint.mjs has identical full Espree ASTs and tokens with only source-position fields removed. The final committed patch has 17 comment additions and zero deletions. Byte-based insertion retained existing worktree content and line endings outside the inserted comment bytes.

Actual check verdicts:

- Python preservation: PASS, exit 0. Initial probe exit 1 is retained: it compared checkout CRLF NEWLINE spelling with the LF Git blob; the executable-preservation instrument was corrected, not product code.
- JavaScript preservation: PASS, exit 0. Initial probe exit 1 is retained: AST equality had passed but token comparison still included shifted start/end positions. Removing positions from both comparisons gave the executable comparison intended.
- Bounded pinned-regex citation/data/dispatched-unit check: PASS, exit 0. This is the weakest-point check: helper data lines could otherwise be omitted while the general guard stayed green. It proves the explicitly reviewed static dependency set is present, targets are tracked, and each Python citation is adjacent to run_check; it cannot discover unnamed transitive file reads or prove semantic sufficiency of the standing methods.
- Ruff standing source method: PASS, exit 0, named ruff-source-rules/1 verdict.
- ESLint standing source method: PASS, exit 0, named eslint-source-rules/1 verdict.
- ESLint standing configuration method: PASS, exit 0, named eslint-configuration-rules/1 verdict.
- Pinned invariant format guard with original base and merge target: PASS, exit 0; 0 errors, 0 warnings, 0 unchecked. Notes: no violated_invariants.md (empty list) and no human_verdicts.md (no human verdict).
- Working diff whitespace check: PASS, exit 0. It printed existing autocrlf checkout notices for Python files; these are not invariant warnings.
- Staged diff whitespace check: initial exit 2, then PASS exit 0. The first explicit-path staging command unnecessarily used core.autocrlf=false, which staged existing mixed ESLint line endings as apparent changes. Re-adding only scripts/check_eslint.py with git add --renormalize restored normal index normalization without modifying worktree bytes; final staged numstat is exactly 17 additions/0 deletions. The initial failed staged check and correction are preserved below.

No application tests, broad suites, service/port/container operations, live dependency audit, formatter or ShellCheck method rerun were performed in this bounded dispatch. Those three standing methods retain the prior accepted behavior evidence only as unchanged methods; this dispatch does not claim a fresh verdict for them. Root owns fresh complete gate/reconciliation and review. No new behavior tests or deliberate-break mutations were warranted by comments-only executable identity; independent acceptance assessment remains root's next dispatch.

## Choices, alternatives and cost

- Leave runtime names without formal citations: no implementation cost, but formal invariant-test discovery misses the six standing verdicts and protection of their dependencies. Add comments: 17 maintained metadata lines, formally discoverable checks with unchanged execution. Recommendation implemented under the handoff.
- Cite only oracle fixtures: shorter metadata, but omits actual statically named product inputs under pinned wording and existing package-layout practice. Cite actual tracked static inputs at consumers: explicit dependencies to maintain when these readers change. Enumerate every discovered source: large volatile list that would undermine discovery/new-file coverage; rejected.
- Add comments inside the Python JavaScript literals: readable at inner consumption, but changes Python constant/AST and needs another equivalence argument. Adjacent Python data comments at the invoking bridge call: exact full AST preservation, with the invoked named config read explained above; chosen.
- Refactor ESLint into branches merely to separate comments: more executable change and testing cost without another recorded operation. Two comments beside its one dispatch preserve the existing alternatives; chosen with root concurrence.

## Self-review, sharpness and boundary

Self-review of the actual normalized diff found only the named 17 inserted metadata comments across the authorized seven build-tools files. No script tokens, BRIDGE literals, adopted rule membership, product configuration, invariant sentence/version/fingerprint, source scope, recorded runtime name, exception behavior or audit request changed. No UI change, so screenshot evidence is inapplicable. The part map marks check_dependencies.py as a trust-boundary file, but this patch adds no executable path through that boundary. It adds formal metadata to files whose checks govern all six code parts; a wrong citation could conceal protection, addressed by actual pinned guard/discovery plus independent assessment next. There is no irreversible effect, new input parser, resource lifecycle or new adversarial input boundary; no mutation tests were added.

The pre-existing untracked tests/invariants/__pycache__/ and tests/quality/__pycache__/ remain untouched and uncommitted. Worktree tracked files are clean after the commit. No unresolved product/design question. Next dispatch must review citation placement and static-data completeness independently, refresh root gate evidence for this commit, and assess return-step method completion. The four deferred Minors from final whole-branch review were not revisited.

Commit range: `ef057111b09f0b081e1c9c1dd61678bb29040a07..52bd7f7f1608774113cdc3039a9e49b51e87bc97`.

Commit: `52bd7f7f1608774113cdc3039a9e49b51e87bc97` - fix: cite standing quality invariants and tracked data inputs.

## Exact commands and complete evidence

Commands below are exact argument arrays from capture.py; inline programs retain their actual newlines. stdout/stderr is combined unabridged in the named UTF-8 output file. No output includes secrets or customer/user personal data. Each JSON file beside it records command, actual exit code and elapsed time.

### return-citations-commit-final.txt.json

- Actual exit: 0. Full stdout/stderr: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-commit-final.txt`.
- Structured evidence: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-commit-final.txt.json`.

```json
[
  "git",
  "commit",
  "-m",
  "fix: cite standing quality invariants and tracked data inputs"
]
```

### return-citations-commit.txt.json

- Actual exit: 0. Full stdout/stderr: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-commit.txt`.
- Structured evidence: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-commit.txt.json`.

```json
[
  "git",
  "-c",
  "core.autocrlf=false",
  "add",
  "--",
  "scripts/check_eslint.py",
  "scripts/check_ruff.py",
  "scripts/check_shellcheck.py",
  "scripts/check_format.py",
  "scripts/check_dependencies.py",
  "scripts/quality_support.py",
  "scripts/inspect_eslint.mjs"
]
```

### return-citations-diff-check.txt.json

- Actual exit: 0. Full stdout/stderr: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-diff-check.txt`.
- Structured evidence: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-diff-check.txt.json`.

```json
[
  "git",
  "diff",
  "--check"
]
```

### return-citations-discovery.txt.json

- Actual exit: 0. Full stdout/stderr: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-discovery.txt`.
- Structured evidence: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-discovery.txt.json`.

```json
[
  "python",
  "-B",
  "-c",
  "from pathlib import Path\nimport ast\nimport runpy\nimport subprocess\nexpected = {\n    'scripts/check_eslint.py': {'invariant': {'eslint-source-rules/1', 'eslint-configuration-rules/1'}, 'data': set()},\n    'scripts/check_ruff.py': {'invariant': {'ruff-source-rules/1'}, 'data': set()},\n    'scripts/check_shellcheck.py': {'invariant': {'shellcheck-source-rules/1'}, 'data': set()},\n    'scripts/check_format.py': {'invariant': {'prettier-source-format/1'}, 'data': {'.gitattributes', 'package.json', 'package-lock.json', 'prettier.config.mjs'}},\n    'scripts/check_dependencies.py': {'invariant': {'introduced-npm-vulnerabilities/1'}, 'data': {'foundations/part_map.md', 'package.json', 'package-lock.json'}},\n    'scripts/quality_support.py': {'invariant': set(), 'data': {'foundations/part_map.md'}},\n    'scripts/inspect_eslint.mjs': {'invariant': set(), 'data': {'eslint.config.mjs', 'package.json', 'package-lock.json'}},\n}\npattern = runpy.run_path('.the-way/elements/invariants/format_guard.py')['CITATION']\ntracked = set(subprocess.check_output(['git', 'ls-files', '-z']).decode().split(chr(0)))\nfor name, wanted in expected.items():\n    text = Path(name).read_text(encoding='utf-8')\n    found = {'invariant': set(), 'data': set()}\n    for number, line in enumerate(text.splitlines(), 1):\n        match = pattern.fullmatch(line)\n        if match:\n            kind, value = match.groups()\n            found[kind].add(value)\n            if kind == 'data':\n                assert value in tracked and Path(value).is_file(), (name, number, value)\n            print(f'{name}:{number}: {kind}: {value}')\n    assert found == wanted, (name, found, wanted)\n    if name.endswith('.py'):\n        tree = ast.parse(text)\n        citations = wanted['invariant']\n        if citations:\n            main = next(node for node in tree.body if isinstance(node, ast.FunctionDef) and node.name == 'main')\n            call = next(node for node in ast.walk(main) if isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id == 'run_check')\n            prior = text.splitlines()[call.lineno - len(citations) - 1:call.lineno - 1]\n            assert {pattern.fullmatch(line).group(2) for line in prior} == citations\nprint('PASS: 6 invariant citations at recorded dispatch; 11 data lines; all targets tracked')\nprint('PASS: Python bridge literals unchanged; shared/helper data checked explicitly beyond guard file selection')"
]
```

### return-citations-eslint-configuration.txt.json

- Actual exit: 0. Full stdout/stderr: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-eslint-configuration.txt`.
- Structured evidence: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-eslint-configuration.txt.json`.

```json
[
  "python",
  "-B",
  "scripts/check_eslint.py",
  "--configuration",
  "--record",
  ".runs/task-cycles/coding-guidelines/reports/return-citations-eslint-configuration.jsonl"
]
```

### return-citations-eslint.txt.json

- Actual exit: 0. Full stdout/stderr: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-eslint.txt`.
- Structured evidence: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-eslint.txt.json`.

```json
[
  "python",
  "-B",
  "scripts/check_eslint.py",
  "--record",
  ".runs/task-cycles/coding-guidelines/reports/return-citations-eslint.jsonl"
]
```

### return-citations-invariant-guard.txt.json

- Actual exit: 0. Full stdout/stderr: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-invariant-guard.txt`.
- Structured evidence: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-invariant-guard.txt.json`.

```json
[
  "python",
  "-B",
  ".the-way/elements/invariants/format_guard.py",
  "foundations/invariants.md",
  "--base",
  "c379207bfd8bd148d3589ea75604ba5165915d01",
  "--merge-onto",
  "c379207bfd8bd148d3589ea75604ba5165915d01",
  "--record",
  ".runs/task-cycles/coding-guidelines/reports/return-citations-invariant-guard.jsonl"
]
```

### return-citations-js-preservation-green.txt.json

- Actual exit: 0. Full stdout/stderr: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-js-preservation-green.txt`.
- Structured evidence: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-js-preservation-green.txt.json`.

```json
[
  "node",
  "-e",
  "const assert = require('node:assert/strict');\nconst fs = require('node:fs');\nconst {execFileSync} = require('node:child_process');\nconst espree = require('espree');\nconst name = 'scripts/inspect_eslint.mjs';\nconst before = execFileSync('git', ['show', 'ef057111b09f0b081e1c9c1dd61678bb29040a07:' + name], {encoding:'utf8'});\nconst after = fs.readFileSync(name, 'utf8');\nconst options = {ecmaVersion:'latest', sourceType:'module'};\nconst strip = (key, value) => ['start','end','range','loc'].includes(key) ? undefined : value;\nassert.equal(JSON.stringify(espree.parse(before, options), strip), JSON.stringify(espree.parse(after, options), strip));\nassert.equal(JSON.stringify(espree.tokenize(before, options), strip), JSON.stringify(espree.tokenize(after, options), strip));\nconsole.log(name + ': complete JavaScript AST and token equality PASS (source positions excluded)');"
]
```

### return-citations-js-preservation.txt.json

- Actual exit: 1. Full stdout/stderr: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-js-preservation.txt`.
- Structured evidence: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-js-preservation.txt.json`.

```json
[
  "node",
  "-e",
  "const assert = require('node:assert/strict');\nconst fs = require('node:fs');\nconst {execFileSync} = require('node:child_process');\nconst espree = require('espree');\nconst name = 'scripts/inspect_eslint.mjs';\nconst before = execFileSync('git', ['show', 'ef057111b09f0b081e1c9c1dd61678bb29040a07:' + name], {encoding:'utf8'});\nconst after = fs.readFileSync(name, 'utf8');\nconst options = {ecmaVersion:'latest', sourceType:'module'};\nconst strip = (key, value) => ['start','end','range','loc'].includes(key) ? undefined : value;\nassert.equal(JSON.stringify(espree.parse(before, options), strip), JSON.stringify(espree.parse(after, options), strip));\nassert.deepEqual(espree.tokenize(before, options), espree.tokenize(after, options));\nconsole.log(name + ': complete JavaScript AST and token equality PASS');"
]
```

### return-citations-preservation-green.txt.json

- Actual exit: 0. Full stdout/stderr: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-preservation-green.txt`.
- Structured evidence: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-preservation-green.txt.json`.

```json
[
  "python",
  "-B",
  "-c",
  "import ast, io, pathlib, subprocess, tokenize; names=['scripts/check_eslint.py','scripts/check_ruff.py','scripts/check_shellcheck.py','scripts/check_format.py','scripts/check_dependencies.py','scripts/quality_support.py']; ignored={tokenize.COMMENT,tokenize.NL}; base='ef057111b09f0b081e1c9c1dd61678bb29040a07'; tokens=lambda data:[(t.type,chr(10) if t.type==tokenize.NEWLINE else t.string) for t in tokenize.tokenize(io.BytesIO(data).readline) if t.type not in ignored]; before=lambda name:subprocess.check_output(['git','show',base+':'+name]); [(print(name+': token and AST equality PASS') if tokens(before(name))==tokens(pathlib.Path(name).read_bytes()) and ast.dump(ast.parse(before(name)),include_attributes=False)==ast.dump(ast.parse(pathlib.Path(name).read_bytes()),include_attributes=False) else (_ for _ in ()).throw(AssertionError(name))) for name in names]; print('Embedded BRIDGE literals unchanged through full AST equality'); print('Six Python files verified')"
]
```

### return-citations-preservation.txt.json

- Actual exit: 1. Full stdout/stderr: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-preservation.txt`.
- Structured evidence: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-preservation.txt.json`.

```json
[
  "python",
  "-B",
  "-c",
  "import ast, io, pathlib, subprocess, tokenize; names=['scripts/check_eslint.py','scripts/check_ruff.py','scripts/check_shellcheck.py','scripts/check_format.py','scripts/check_dependencies.py','scripts/quality_support.py']; ignored={tokenize.COMMENT,tokenize.NL}; base='ef057111b09f0b081e1c9c1dd61678bb29040a07'; tokens=lambda data:[(t.type,t.string) for t in tokenize.tokenize(io.BytesIO(data).readline) if t.type not in ignored]; before=lambda name:subprocess.check_output(['git','show',base+':'+name]); [(print(name+': token and AST equality PASS') if tokens(before(name))==tokens(pathlib.Path(name).read_bytes()) and ast.dump(ast.parse(before(name)),include_attributes=False)==ast.dump(ast.parse(pathlib.Path(name).read_bytes()),include_attributes=False) else (_ for _ in ()).throw(AssertionError(name))) for name in names]; print('Embedded BRIDGE literals unchanged through full AST equality'); print('Six Python files verified')"
]
```

### return-citations-ruff.txt.json

- Actual exit: 0. Full stdout/stderr: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-ruff.txt`.
- Structured evidence: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-ruff.txt.json`.

```json
[
  "python",
  "-B",
  "scripts/check_ruff.py",
  "--record",
  ".runs/task-cycles/coding-guidelines/reports/return-citations-ruff.jsonl"
]
```

### return-citations-stage-check-initial.txt.json

- Actual exit: 2. Full stdout/stderr: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-stage-check-initial.txt`.
- Structured evidence: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-stage-check-initial.txt.json`.

```json
[
  "git",
  "diff",
  "--cached",
  "--check"
]
```

### return-citations-stage-check.txt.json

- Actual exit: 0. Full stdout/stderr: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-stage-check.txt`.
- Structured evidence: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-stage-check.txt.json`.

```json
[
  "git",
  "diff",
  "--cached",
  "--check"
]
```

### return-citations-stage-correction.txt.json

- Actual exit: 0. Full stdout/stderr: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-stage-correction.txt`.
- Structured evidence: `C:/Storage/repos/loop2/.runs/worktrees/coding-guidelines/.runs/task-cycles/coding-guidelines/reports/return-citations-stage-correction.txt.json`.

```json
[
  "git",
  "add",
  "--renormalize",
  "--",
  "scripts/check_eslint.py"
]
```
