from pathlib import Path
import re

root = Path('.the-way/foundations')
for name, heads in {
    'decisions.md': ['WAY-03'],
    'invariants.md': ['log-entry-field-presence', 'decision-guard-overdue-review', 'file-part-assignment', 'fingerprint-definition', 'return-step-record'],
    'part_map.md': ['part-map', 'task-cycle', 'wording-reaches-dependants', 'content-fingerprint', 'entry-format'],
}.items():
    text = (root/name).read_text(encoding='utf-8')
    for block in re.split(r'(?=^#{2,3} )', text, flags=re.M):
        if any(re.match(r'#{2,3} '+re.escape(head)+r'(?:/| |$)',block) for head in heads):
            print(block)
