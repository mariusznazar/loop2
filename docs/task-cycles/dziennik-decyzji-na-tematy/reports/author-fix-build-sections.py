import re
TASK = '.runs/task-cycles/dziennik-decyzji-na-tematy/task.md'
LOG = 'foundations/decisions.md'
BASE = '.runs/author/before-decisions.md'
task = open(TASK, encoding='utf-8', newline='').read()
sections = {}
for m in re.finditer(r'(?m)^\s*\| (\d+) \| (.+?) \| (.+?) \| (\d+) \|$', task):
    sections[int(m.group(1))] = [m.group(2), m.group(3), int(m.group(4)), []]
assert sorted(sections) == list(range(1, 29))
for m in re.finditer(r'(?m)^  - (\d+)\. (.+?): ((?:D-\d+(?:, )?)+)$', task):
    n = int(m.group(1))
    assert sections[n][0] == m.group(2), (n, m.group(2))
    ids = [int(x) for x in re.findall(r'D-(\d+)', m.group(3))]
    assert len(ids) == sections[n][2], (n, len(ids))
    sections[n][3] = ids
extra = {7: [410], 11: [411], 2: [412], 4: [413, 414]}
for n, l in extra.items():
    sections[n][3] += l
assign = {}
for n, s in sections.items():
    for i in s[3]:
        assert i not in assign, i
        assign[i] = n
text = open(BASE, encoding='utf-8', newline='').read()
assert '\r' not in text
i0 = text.index('### D-')
iw = text.index('## Withdrawn identifiers')
head = text[:i0]
withdrawn = text[iw:]
assert head == '# Decision log\n\n', repr(head)
body = text[i0:iw]
chunks = [c for c in re.split(r'(?m)^(?=### D-)', body) if c]
entries = []
for c in chunks:
    m = re.match(r'### D-(\d+) ', c)
    assert m
    assert c.endswith('\n\n')
    # the block keeps its own trailing blank lines exactly as in the base
    entries.append((int(m.group(1)), c))
nums = [n for n, _ in entries]
assert len(nums) == len(set(nums)) == 408
assert set(nums) == set(assign), set(nums) ^ set(assign)
out = head
for n in range(1, 29):
    h, sent, _, _ = sections[n]
    out += '## %s\n\n%s\n\n' % (h, sent)
    for num, e in entries:
        if assign[num] == n:
            out += e
out += withdrawn
open(LOG, 'w', encoding='utf-8', newline='').write(out)
with open('.runs/author/counts2.txt', 'w', encoding='utf-8') as f:
    for n in range(1, 29):
        f.write('%d\t%s\t%d\n' % (n, sections[n][0], sum(1 for v in assign.values() if v == n)))
print(len(nums), len(assign))
