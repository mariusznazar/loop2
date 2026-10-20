"""Prepare transient review packages and append cycle events."""
from pathlib import Path
import subprocess
import sys
from datetime import datetime, timezone
root=Path.cwd()
cycle=root/'.runs/task-cycles/coding-guidelines'
reports=cycle/'reports'
mode=sys.argv[1]
if mode=='event':
    event=sys.argv[2]
    stamp=datetime.now(timezone.utc).isoformat()
    for file in [cycle/'cycle.md', root/'.superpowers/sdd/plan/progress.md']:
        with file.open('a',encoding='utf-8',newline='') as stream:
            stream.write('\n'+stamp+' '+event+'\n')
    print('recorded')
elif mode=='review':
    name,base,head,brief,report=sys.argv[2:7]
    package=root/'.superpowers/sdd/plan'/f'{name}-review-package.txt'
    with package.open('wb') as stream:
        for args in [['git','log','--oneline',f'{base}..{head}'],['git','diff','--stat',base,head],['git','diff','-U10',base,head]]:
            subprocess.run(args,stdout=stream,stderr=subprocess.STDOUT,check=True)
    handoff=reports/f'{name}-review-handoff.md'
    skill='C:/Users/Mariusz/.claude/plugins/cache/claude-plugins-official/superpowers/6.4.1/skills/subagent-driven-development/task-reviewer-prompt.md'
    handoff.write_text(f"""# Independent scoped review: {name}

Read C:/Storage/The Brain/The Brain/Notes/Areas/(A) Claude code/playbook_code_review.md first; follow {skill} in full. This is a task-scoped review, not the final whole-branch review. No subagents. Product checkout is read-only; write only the named ignored review/evidence files. Worktree: {root.as_posix()}.

Requirements brief: {brief}
Author report: {report}
Base: {base}
Head: {head}
Review package: {package.as_posix()}

Read requirements and full diff, verify claims against code and evidence. Read the whole current applicable foundation; use .the-way/product-guidelines/reading.md and verify selection against scope. Guidelines now exist. Select and read guidelines/coding.md plus all four indexed coding-kind files for the S11 guideline slice; for S12 instruction pointer work read coding.md and inspect all metadata/index conditions, expanding only where applicable. Verify this selection against the actual review scope and report differences before relying on it. Every check-author stage is independent from covered configuration authors. Current accepted npm pin is 12.2.1 (D-33); original audit fork remains c379207bfd8bd148d3589ea75604ba5165915d01. No rule weakening or silent failure passes. Do not use 10x branches or loop2-10x/loop-10x directories.

Grade appearance findings by concrete user effect in Critical/Important/Minor. Departure from a guideline example or script-unchecked exemplar alone does not justify blocking: name user/correctness consequences; binding rules retain force. Grade/scope independently, no findings are preclassified. Preserve reviewer words and locations. Do not rerun reported checks just to confirm; investigate specific unanswered risks. Tests you run require full captured output, exact command and exit code. No next-stage work or fixes.

Write full review to {reports.as_posix()}/{name}-review.md including Spec compliance and Task quality verdicts, range, strengths, severity/location/rationale for findings, declined/out-of-scope items, concrete risks checked and evidence limits. For invariant changes, final deliberate-break and guideline-case acceptance remains later on complete product code, unless this handoff explicitly assigns it. Return under 15 lines with verdict, report path and every unresolved concern.
""",encoding='utf-8')
    print(handoff.as_posix())
