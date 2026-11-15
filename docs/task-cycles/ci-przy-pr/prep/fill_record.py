import re
p = 'cycle.md'
with open(p, encoding='utf-8', newline='') as f:
    s = f.read()
nl = '\r\n' if '\r\n' in s else '\n'
def rep(old, new):
    global s
    assert old in s, old
    s = s.replace(old, new, 1)

rep('- Agent waiting: to fill',
    '- Agent waiting: background agents by the harness completion notification (the turn was yielded while an agent ran; no blocking wait, no timeout, no interruption); the full gate as a background command with a completion notification; limit: none reached.')
rep('- Whole-change review: to fill',
    '- Whole-change review: a fresh the-way-stage on Opus (strongest class available), range bdf0dbd7..51596257, report reports/review-whole-report.md, first line PASS 5159625748f3754ec90cefaa02b00838e69e4417; 16 files changed over the range (the pin move and the three commits of the author); 0 Critical, 0 Important, 5 Minor within the task (m1-m5); coverage of every item of the task and of rows 1-4 judged in its coverage table; the workflow checked as a trust boundary (pull_request, read-only token, no secret, actions pinned, public submodule); the review of the fix (same reviewer resumed) PASS 9912f0db9557, reports/review-fix-report.md; the review of the return step (fresh the-way-stage, Opus) PASS 1c0e49ebef3c, reports/review-return-report.md.')
rep('- Review rounds: none',
    '- Review rounds:' + nl +
    '  - findings `reports/fix-whole-findings.md`: the five Minor findings m1-m5 of the review of the whole change (`PASS`, no blocking finding), fixed by the author resumed in five commits 419b7d1e, 42bf3768, 02e112f5, fd89c408, 9912f0db (range 51596257..9912f0db, report reports/fix-whole-report.md); reviewed once by the same reviewer: PASS 9912f0db9557, m1-m5 fixed, two new Minor findings n1 and n2 (n1 was closed by the return step, n2 and the three Minor findings r1-r3 of the review of the return step stay unfixed and go to the request). No blocking finding remained; no revert.')
rep('- Weakest-point checks: to fill',
    '- Weakest-point checks: the author named acceptance criterion 1 and 2 (a green run on Linux with the Docker tests running) as the requirement most likely not met; checks made instead: the Linux install step in a python:3.14-slim container (pip exit 0, ruff 0.17.1, shellcheck 0.11.0), the stand-in daemon case with a mutation shown failing, nine mutations of the workflow caught by test_ci_workflow.py (reports/author-report.md, Own-work check); not shown by any check on this computer: that every other test passes on Linux; the first CI run is that check.')

ver_rows = [
 '| `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/ci-przy-pr/gate_times.md -- npm.cmd test` on the final tree 1c0e49eb (run 2 of 2, started 2026-11-15 22:36 UTC on the advisor\'s signal `start`, 1211.1 s; log `reports/gate-final-run1.log`; the script counted 1 other gate run at the same time in its registry, which the advisor did not report and the orchestrator did not identify) | orchestrator, Windows, worktree | 0; 607 tests in 4 directories, every directory passed; Node tests, the foundation check (0 errors) and the new fifth stage `check_instructions.py` (`0 error, 140 warn, 7 info`) ran and passed | none |',
 '| `python -B .the-way/task-cycle/cycle_stages.py 601c45f7-617f-4bd1-ae06-a4de79fc8267 --output .runs/task-cycles/ci-przy-pr/stages.md` and `cycle_measures.py` with the same session and `--output …/mechanism_measures.md` | orchestrator | 0 and 0 (run after the final gate; the orchestrator\'s later work is not in them) | none |',
 '| `python -B .the-way/task-cycle/review_reminder.py origin/main` after `git fetch origin --tags` | orchestrator | 0; `tag: foundation-review/2026-11-13`, `merges: 19`, `threshold: 60`, `reminder: no` | none |',
 '| `python -B .the-way/task-cycle/remarks_check.py .runs/task-cycles/ci-przy-pr` (original), run 1 | orchestrator | 1; 19 items from 6 reports not in the process remarks | appended word for word below |',
]
marker = nl + nl + '## Return step'
i = s.index(marker)
s = s[:i].rstrip('\r\n') + nl + nl.join(ver_rows) + s[i:]

ret = ('- Return step agent: the-way-author resumed (Sonnet), `reports/return-step-handoff.md`, report `reports/return-step-report.md`, status done, commit 1c0e49eb; `foundation_check.py` exit 0 (0 errors), `check_instructions.py` exit 0, focused tests exit 0; review of its range by a fresh the-way-stage on Opus, `reports/review-return-report.md`: PASS 1c0e49ebef3c (0 blocking, 3 Minor r1-r3).' + nl +
 '- Foundation compared with code: D-77, D-405, D-390, D-11, D-412, D-413, the part map (agent-workflow, build-tools), the rows of guidelines/testing.md, README.md, the invariants file (searched for the stages, docker, workflow, CI, gate, check_instructions) and the glossary matched; what no longer matched: D-412 Based on was TODO and its rationale claimed "every push"; D-413 Based on was none and its rationale said a daemon answers on GitHub machines and that GitHub does not run Linux containers on Windows (no page read holds either); D-390 rationale named what GitHub machines have. All corrected in commit 1c0e49eb. The comment of tests.yml lines 7-9 and README.md line 88 still say the daemon answers on the Linux machine (left by the handoff; judged by the review of the return step as r2).' + nl +
 '- Decisions written or changed: D-405, D-77, D-390 changed; D-412 and D-413 new (D-413 the cycle\'s own, no row).' + nl +
 '- Invariants written or changed: none.' + nl +
 '- Environment facts: four written, the cycle\'s, none carried by a row: github-secret-scanning-history, github-push-protection-blocks-push, loop2-secret-scanning-enabled (a reading of the repository settings by a read-only gh call), github-ubuntu-runner-docker.' + nl +
 '- Glossary terms: none.' + nl +
 '- Part-map changes: the workflow `.github/workflows/tests.yml` in agent-workflow (sentence, Files, Trust boundary); build-tools left as before the change.' + nl +
 '- Projected entries written whole or in part: none (the task carries none).' + nl +
 '- Rows of *Settlements to record* written: 1 -> D-412; 2 -> D-405 (sentences) and D-77; 3 -> the comment of `.github/workflows/tests.yml` and the rationale of D-413; 4 -> D-390.')
rep(nl + '## Return step' + nl + nl + 'to fill', nl + '## Return step' + nl + nl + ret)

art = [
 '| code commits | `5d6c57e5`, `5d70d505`, `51596257` (author, change); `419b7d1e`, `42bf3768`, `02e112f5`, `fd89c408`, `9912f0db` (fix of the Minor findings); `1c0e49eb` (return step) | the-way-author, Sonnet | PASS 5159625748f3 (whole change), PASS 9912f0db9557 (fix), PASS 1c0e49ebef3c (return step) |',
 '| reports | `reports/author-report.md`, `reports/fix-whole-report.md`, `reports/return-step-report.md`, `reports/review-whole-report.md`, `reports/review-fix-report.md`, `reports/review-return-report.md`; handoffs beside them | agents | see above |',
 '| gate logs | `reports/gate-pin-run1.log`, `reports/gate-final-run1.log`, `gate_times.md` | orchestrator | exit 0 and exit 0 |',
]
marker = nl + nl + '## Verification'
i = s.index(marker)
s = s[:i].rstrip('\r\n') + nl + nl.join(art) + s[i:]

# process remarks from the check listing
names = {'author-report': 'make the change (one author)', 'fix-whole-report': 'fix of the Minor findings',
         'return-step-report': 'return step', 'review-fix-report': 'review of the fix',
         'review-return-report': 'review of the return step', 'review-whole-report': 'review of the whole change'}
lines = open('prep/remarks_run1.txt', encoding='utf-8').read().splitlines()
entries = []
for ln in lines:
    m = re.match(r'^(\.runs/task-cycles/ci-przy-pr/reports/([a-z-]+)\.md): (.*)$', ln)
    if not m:
        continue
    entries.append('  - ' + names[m.group(2)] + ', ' + m.group(1) + ': ' + m.group(3))
assert len(entries) == 19, len(entries)
rep('- Process remarks on the-way: none', '- Process remarks on the-way:' + nl + nl.join(entries))
with open(p, 'w', encoding='utf-8', newline='') as f:
    f.write(s)
print('ok', len(entries))
