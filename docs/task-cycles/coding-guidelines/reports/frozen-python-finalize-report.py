from pathlib import Path
import subprocess
path = Path('.runs/task-cycles/coding-guidelines/reports/frozen-python-live-report.md')
head = subprocess.run(['git', 'rev-parse', 'HEAD'], capture_output=True, text=True,
                      check=True).stdout.strip()
source = path.read_bytes().decode('utf-8')
source = source.replace('COMMIT_PENDING', '`' + head + '` (range `a9080ce..' + head[:7] + '`)')
source += ('\n## Commit evidence\n\nExplicit-path commit succeeded, exit 0: '
           '[frozen-python-commit.txt](frozen-python-commit.txt), exact argv and exit in '
           '[frozen-python-commit.txt.json](frozen-python-commit.txt.json). '
           'Subject: `fix: make quality methods comply with adopted Ruff rules`.\n')
path.write_bytes(source.encode('utf-8'))
assert 'COMMIT_PENDING' not in path.read_text(encoding='utf-8')
print(head)
