"""Apply the controller's bounded documentation settlements, preserving line endings."""
from pathlib import Path
import re
import sys

sys.path.insert(0, str(Path('.the-way/relation-model').resolve()))
from fingerprint import fingerprint

def rewrite(path, replacements):
    target = Path(path)
    text = target.read_bytes().decode('utf-8')
    for before, after in replacements:
        if text.count(before) != 1:
            raise AssertionError(f'unique replacement not found in {path}')
        text = text.replace(before, after)
    target.write_bytes(text.encode('utf-8'))

old_sentence = ('The introduction of the adopted linters uses full compliance before merge instead of '
                'the transitional per-file no-regression invariant, and a repair exceeding the accepted '
                'scope returns to a decision rather than leaving a violation or weakening the rule set.')
new_sentence = ('For the adopted linters, full-compliance source invariants apply without a '
                'transitional per-file no-regression invariant.')
rewrite('foundations/decisions.md', [
    (old_sentence, new_sentence),
    ('retain the stated deferrals and test example, and introduce linters with no blocking violations',
     'retain the stated deferrals and test example, and use full-compliance source invariants without a transitional per-file no-regression invariant'),
    ('The accepted scope gives current code common checks and a small set of useful exemplars before further product work;',
     'The selected discipline gives code common checks and a small set of useful exemplars;'),
    ('transitional lint debt — an extra mechanism where the introduction removes all blocking violations.',
     'transitional lint debt — an extra mechanism where full-compliance source invariants already apply.'),
])
rewrite('foundations/part_map.md', [
    ('- **Depends on:** browser-view · simulation · account-server\r\n',
     '- **Depends on:** browser-view · simulation · account-server · product-foundation\r\n'),
])
text = Path('foundations/decisions.md').read_text(encoding='utf-8')
entry = re.search(r'(?m)^### D-28/1 .*?\n\n(.*?)\n\n- \*\*Change:', text, re.S).group(1)
new_fingerprint = fingerprint(entry)
rewrite('guidelines/coding.md', [
    ('D-28@719c9a67', 'D-28@' + new_fingerprint),
    ('Ogólne kontrole nadal obejmują cały przyjęty zakres kodu. Wprowadzenie linterów\n'
     'wymaga pełnej zgodności przed scaleniem; nie ma przejściowej kontroli\n'
     '„nie pogarszaj starego kodu”. Naprawa przekraczająca przyjęty zakres wraca do\n'
     'decyzji, zamiast pozostawiać naruszenie lub osłabiać zestaw.',
     'Ogólne kontrole nadal obejmują cały przyjęty zakres kodu. Dla przyjętych linterów\n'
     'obowiązują niezmienniki pełnej zgodności kodu, bez przejściowej kontroli\n'
     '„nie pogarszaj starego kodu”.'),
])
path = Path('.runs/task-cycles/coding-guidelines/plan.md')
text = path.read_bytes().decode('utf-8')
newline = '\r\n' if '\r\n' in text else '\n'
paragraph = (
    '## Accepted introduction requirements' + newline + newline +
    'For this task, original Q8 and settlement 1 remain binding: every adopted blocking violation '
    'is removed before PR16 merges. If a repair exceeds the accepted task scope, return to a decision '
    'rather than weakening the rule set or leaving a violation. Settlement 1 is split by destination: '
    'D-28 records the lasting selected discipline and full-compliance source invariants without a '
    'transitional per-file no-regression invariant; this plan records only the introduction and '
    'repair-scope conditions of this execution. No unit, dependency, invariant meaning or accepted '
    'settlement is removed or changed.' + newline + newline)
marker = '## Foundation entries' + newline
assert text.count(marker) == 1
path.write_bytes(text.replace(marker, paragraph + marker).encode('utf-8'))
print('D-28 fingerprint: ' + new_fingerprint)
