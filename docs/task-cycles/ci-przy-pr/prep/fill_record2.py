import re
p = 'cycle.md'
with open(p, encoding='utf-8', newline='') as f:
    s = f.read()
nl = '\r\n' if '\r\n' in s else '\n'
def rep(old, new):
    global s
    assert old in s, old[:50]
    s = s.replace(old, new, 1)

# events
rows = [
 '| 2026-11-16 00:0x | review of correction 1 returned | the-way-stage (fresh), Opus | `reports/review-correction-1-handoff.md` | `reports/review-correction-1-report.md`: PASS 7da06c4fe0fe; 0 blocking, 3 Minor (m1 the comment and the README do not say that Docker is installed nor that the runs show the daemon answering, which the human asked for; m2 D-413 *Rejected* overstates ("the tests of containers are made for" Linux, while the local gate runs them on Windows by Docker Desktop) and D-263 rests on a remark about a past moment while the Dockerfile image is the present source; m3 both commit subjects say more than their diffs); r1, r2 partly, r3 and n2 done; checks exit 0 | Minor findings not fixed (no second correction); they go to the request; commit subjects not reworded (history of a pushed branch stays) |',
 '| 2026-11-16 00:0x | gate on the corrected tree | orchestrator | `gate_times.py … -- npm.cmd test` after the advisor\'s `start` (run 3, started 2026-11-15 23:29 UTC) | `reports/gate-correction-1-run.log`, `gate_times.md` | exit 0, 823 s, 607 tests in 4 directories |',
]
marker = nl + nl + '## Questions and autonomous choices'
i = s.index(marker)
s = s[:i].rstrip('\r\n') + nl + nl.join(rows) + s[i:]

# verification row
vrow = '| `python -B .the-way/task-cycle/gate_times.py --output .runs/task-cycles/ci-przy-pr/gate_times.md -- npm.cmd test` on the tree after correction 1 (7da06c4f; run 3 of 3, started 2026-11-15 23:29 UTC on the advisor\'s signal `start`, no other gate of loop2 running, 823.0 s; log `reports/gate-correction-1-run.log`) | orchestrator, Windows, worktree | 0; 607 tests in 4 directories, every directory passed; foundation check `0 errors`; check of the instruction files `0 error, 140 warn, 7 info` | none |'
marker = nl + nl + '## Return step'
i = s.index(marker)
s = s[:i].rstrip('\r\n') + nl + vrow + s[i:]

# return step addition
rs = ('- Return step repeated for correction 1: done by the author inside the correction (`reports/correction-1-report.md`, section Return step): D-412, D-413 and the corrected places compared with the code; one change, commit 7da06c4f (the sentence on a skipped test of containers narrowed to D-390); reviewed with the correction by `reports/review-correction-1-report.md`: PASS 7da06c4fe0fe. New environment fact: `github-secret-scanning-public-repository`.' )
marker = nl + nl + '## Request handoff'
i = s.index(marker)
s = s[:i].rstrip('\r\n') + nl + rs + s[i:]

# review rounds
rr = ('  - findings `reports/correction-1-remarks.md` (correction 1, the remarks bind in place of a findings file): the four small remarks of item 2 of the human\'s answers, made by the author resumed in commits 5ae669e8 and 7da06c4f (range 4923dd0e..7da06c4f, report `reports/correction-1-report.md`); reviewed once by a fresh the-way-stage on Opus: PASS 7da06c4fe0fe, 3 new Minor findings, no blocking finding.')
rep('No blocking finding remained; no revert.', 'No blocking finding remained; no revert.' + nl + rr)

# remarks
names = {'correction-1-report': 'correction 1 (one author, with the return step)', 'review-correction-1-report': 'review of correction 1'}
lines = open('prep/remarks_run2.txt', encoding='utf-8').read().splitlines()
entries = []
for ln in lines:
    m = re.match(r'^(\.runs/task-cycles/ci-przy-pr/reports/([a-z0-9-]+)\.md): (.*)$', ln)
    if m:
        entries.append('  - ' + names[m.group(2)] + ', ' + m.group(1) + ': ' + m.group(3))
assert len(entries) == 7, len(entries)
s = s.rstrip('\r\n') + nl + nl.join(entries) + nl
with open(p, 'w', encoding='utf-8', newline='') as f:
    f.write(s)
print('ok')
