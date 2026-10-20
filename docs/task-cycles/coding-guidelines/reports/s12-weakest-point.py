from pathlib import Path
import subprocess
base = 'a98222d9306d1011290e7092251cbf30764a1384'
old = subprocess.check_output(['git', 'show', base + ':AGENTS.md'])
current = subprocess.check_output(['git', 'show', 'HEAD:AGENTS.md'])
pointer = b'Before changing product code, including scripts and tests, read `guidelines/coding.md`.'
assert current.count(pointer) == 1
assert current.replace(pointer + b'\n\n', b'', 1) == old
assert current.index(pointer) < current.index(b'<!-- the-way:begin -->')
assert subprocess.check_output(['git', 'show', 'HEAD:CLAUDE.md']) == subprocess.check_output(['git', 'show', base + ':CLAUDE.md'])
assert Path('CLAUDE.md').read_text(encoding='utf-8').strip() == '@AGENTS.md'
assert Path('guidelines/coding.md').is_file()
print('PASS: one conditional pointer; removing it and its blank line restores base Git blob bytes; installer/backlog/CLAUDE preserved; target exists.')
