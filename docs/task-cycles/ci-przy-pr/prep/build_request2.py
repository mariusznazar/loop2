import re, sys, json
t = open('prep/request_template2.md', encoding='utf-8', newline='').read().replace('\r\n', '\n')
rep = open('reports/review-correction-1-report.md', encoding='utf-8').read()
m = re.search(r'### Minor\n\n(.*?)(?=\n## Declined)', rep, re.S)
body = m.group(1).strip()
parts = re.split(r'\n\n(?=\*\*m[23] )', body)
assert len(parts) == 3, len(parts)
def ind(x):
    return x.replace('\n\n', '\n\n   ')
minor = ('The Minor findings that no fix made, in the reviewers\' words, kept whole: the three of the review of correction 1. Before the correction there were four more (finding n2 of the review of the fix, and r1, r2 and r3 of the review of the return step); the correction made n2, r1 and r3 and part of r2, and what is left of r2 is the first finding below. The five Minor findings of the review of the whole change (m1 to m5) were fixed and finding n1 was closed by the return step.\n\n'
 + '1. ' + ind(parts[0].replace('**m1 — ', '**m1 — ', 1)) + '\n\n'
 + '2. ' + ind(parts[1]) + '\n\n'
 + '3. ' + ind(parts[2]))
t = t.replace('__MINOR__', minor)
mode = sys.argv[1]
if mode == 'draft':
    t = t.replace('__CI__', '*to be filled with the run on the last head.*').replace('__CHECKS__', '*to be filled when the record is committed.*').replace('__RECORD__', '*to be filled with the link by the SHA of the commit that adds the record.*')
else:
    d = json.load(open('prep/final_fill2.json', encoding='utf-8'))
    t = t.replace('__CI__', d['ci']).replace('__CHECKS__', d['checks']).replace('__RECORD__', d['record'])
assert '__' not in t.replace('__init__', ''), re.findall(r'__\w+__', t)
open('request.md', 'w', encoding='utf-8', newline='').write(t)
print('ok', len(t))
