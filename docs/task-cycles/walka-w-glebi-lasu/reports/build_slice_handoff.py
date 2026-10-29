"""Copy a reviewed slice and its selected source passages into a dispatch."""

from pathlib import Path
import re
import subprocess
import sys

root = Path.cwd()
cycle = root / '.runs/task-cycles/walka-w-glebi-lasu'
number = int(sys.argv[1])
base = sys.argv[2]
model = sys.argv[3]
head = subprocess.check_output(['git', 'rev-parse', 'HEAD'], text=True).strip()
plan = (cycle / 'plan.md').read_text(encoding='utf-8-sig')
match = re.search(r'(?ms)^### Slice ' + str(number) + r' —.*?(?=^### Slice |^## Coverage)', plan)
if not match:
    raise ValueError(f'Slice {number} missing')
section = match.group(0).rstrip()
handoff = cycle / f'reports/20-slice-{number:02d}-handoff.md'
report = cycle / f'reports/21-slice-{number:02d}-report.md'
text = f'''# Slice {number} implementation

Worktree `{root.as_posix()}`, branch `task/walka-w-glebi-lasu`. Task base and slice1 base `7a633a7ab44868427c9c824948b99d4400a631ca`; this slice review base `{base}`; current implementation starting HEAD `{head}`. Process pin `3aee7d958835cc19b95519f4d21b37538b78e3e1`. User invoked implement-task and delegated intermediate choices. Trust boundary no; irreversible operation no. Model class/model for this dispatch: {model}.

Read project `.agents/skills/the-way-make-change/SKILL.md` and pinned `.the-way/task-cycle/change/SKILL.md` whole. Variant: "a slice, or the retry of a slice". Read its variant files as the applicable step requires. You are a fresh executor of this one slice; do not perform later slices or whole review, do not read cycle.md. Questions to orchestrator, never human. Follow global instructions, including scripts.md before scripts and git.md before commits. Read src/browser/AGENTS.md and every guideline named in the copied Read whole.

The frozen task and reviewed spec are in `{cycle.as_posix()}`; only their selected passages are copied below, verbatim. The current selected foundation entries are named with full current ranges in Read. The foundation step has already written task-authorized entries; its report `reports/14-foundation-report.md` maps F identifiers to actual entries. Read the mappings needed by your slice, not an unrelated implementation source. Current ranges in this dispatch take precedence over earlier handoffs. Source status reconciliation: task7 is delivered through merged PR35 and D-129–D-136; stale source context saying otherwise changes no requirement.

Implement exactly this slice and its focused checks. Every product test runs with `npm test -- <one file>`. Do not run the whole npm test gate. Local pinned quality tools are in `.runs/quality-venv/Scripts`; prepend only to your process PATH where needed. Full baseline npm test exited1 because existing test_loop2_one_serving_process setUpClass could not enumerate Listen objects via Get-NetTCPConnection; 565 Node tests passed, Python300 included five skips, quality40 passed. Separate foundation checker passed. Do not repair unrelated server/environment behavior or weaken tests.

Use source expectations and meaningful failing tests before implementation as the stage/guidelines require, and preserve existing behavior. If new public simulation functions are introduced, make their successful immutable-input calls available to the later invariant coverage; report names and signatures. New simulation suites must enter Stryker selection as planned. The independent reviewer, not you, runs mutation tooling. Browser evidence and seed measurement belong to the slice Checks that explicitly assign them; do not claim they passed before execution. For browser work read `C:/Storage/The Brain/The Brain/.ai/skills/playwright-mcp/SKILL.md` and its applicable references before tools. Use local app and controlled test account response, not a live account. Artifacts under reports stay ignored, never force-add them in implementation commits.

Commit only this slice's explicit product/test paths after own-work checks, with no empty commit, and return before next slice. Preserve unrelated files. Write full report `{report.as_posix()}`: status, base/head and commits, changed paths, checks with exact command/exit status, expected initial red versus final result, skipped checks and evidence limitations, own-work findings, autonomous choices with rejected option/cost, and reaches beyond the handoff. Evidence required by Checks belongs under the specified reports paths. Return short status, commits, one-line check outcome and report path. No PR, merge, deployment or task-source edits.

## Reviewed plan section — verbatim

{section}

## Selected task and spec passages — verbatim
'''
references = re.findall(r'`(\.runs/task-cycles/walka-w-glebi-lasu/(?:task|spec)\.md):(\d+)-(\d+)`', section)
for path, first, last in dict.fromkeys(references):
    lines = (root / path).read_text(encoding='utf-8').splitlines()
    passage = '\n'.join(lines[int(first) - 1:int(last)])
    text += f'\n### {path}:{first}–{last}\n\n{passage}\n'
handoff.write_text(text, encoding='utf-8', newline='\n')
print(handoff.as_posix())
print(report.as_posix())
