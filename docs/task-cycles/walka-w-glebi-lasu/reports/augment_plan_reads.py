"""Supplement the reviewed slice reading with whole scoped foundation entries."""

from pathlib import Path
import re

ROOT = Path.cwd()
PLAN = ROOT / '.runs/task-cycles/walka-w-glebi-lasu/plan.md'


def entries(path, heading, field):
    lines = (ROOT / path).read_text(encoding='utf-8').splitlines()
    starts = [i for i, line in enumerate(lines) if re.match(heading, line)]
    result = []
    for position, start in enumerate(starts):
        end = starts[position + 1] if position + 1 < len(starts) else len(lines)
        body = '\n'.join(lines[start:end])
        metadata = re.search(r'^- \*\*' + field + r':\*\* (.*(?:\n  [^\n]*)*)', body, re.M)
        scopes = set(re.split(r'\s*[,·]\s*', metadata.group(1).replace('\n', ' ').strip())) if metadata else set()
        identifier = lines[start].split(' — ')[0].lstrip('# ')
        result.append((identifier, start + 1, end, scopes))
    return result


catalogs = {
    'foundations/decisions.md': entries('foundations/decisions.md', r'^### D-', 'Scope'),
    'foundations/invariants.md': entries('foundations/invariants.md', r'^## ', 'Part'),
}
parts_by_slice = {
    1: {'simulation', 'browser-view'},
    2: {'simulation'},
    3: {'simulation', 'build-tools'},
    4: {'simulation', 'browser-view'},
    5: {'simulation', 'browser-view'},
    6: {'simulation', 'browser-view', 'build-tools'},
    7: {'simulation'},
    8: {'browser-view'},
}
text = PLAN.read_text(encoding='utf-8')
sections = re.split(r'(?m)(?=^### Slice \d+ —)', text)
counts = []
for index, section in enumerate(sections):
    match = re.match(r'^### Slice (\d+) —', section)
    if not match:
        continue
    number = int(match.group(1))
    read = re.search(r'^- \*\*Read:\*\* (.*)$', section, re.M)
    if not read:
        raise ValueError(f'Slice {number} has no Read')
    value = read.group(1)
    additions = []
    for path, catalog in catalogs.items():
        for identifier, start, end, scopes in catalog:
            if not (scopes & parts_by_slice[number] or 'every' in scopes):
                continue
            existing = re.compile(r'`' + re.escape(path) + r':\d+-\d+` ' + re.escape(identifier) + r'(?= ·|$)')
            reference = f'`{path}:{start}-{end}` {identifier}'
            if existing.search(value):
                value = existing.sub(reference, value)
            else:
                additions.append(reference)
    if additions:
        value += ' · ' + ' · '.join(additions)
    sections[index] = section[:read.start(1)] + value + section[read.end(1):]
    counts.append((number, len(additions)))
PLAN.write_text(''.join(sections), encoding='utf-8', newline='\n')
for number, count in counts:
    print(f'Slice {number}: added {count} full scoped entries')
